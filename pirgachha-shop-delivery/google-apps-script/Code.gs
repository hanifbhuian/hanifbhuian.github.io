/*
Pirgachha Shop & Delivery - Google Sheets backend
How to use:
1) Create a new Google Sheet named: Pirgachha Shop Delivery Orders
2) Open Extensions > Apps Script
3) Paste this full code into Code.gs
4) Change NOTIFICATION_EMAIL if you want email alerts
5) Deploy > New deployment > Web app
   - Execute as: Me
   - Who has access: Anyone
6) Copy the Web App URL and paste it into app.js as CONFIG.googleScriptUrl

Receipt upload note:
- Rider receipt files are saved in Google Drive folder: Pirgachha Shop Delivery Receipts
- The receipt file link is saved in the Orders sheet and Status Updates sheet
*/

const NOTIFICATION_EMAIL = "yourbusiness@email.com"; // Change or leave blank "" to disable email alert
const ORDERS_SHEET = "Orders";
const STATUS_SHEET = "Status Updates";
const RECEIPT_FOLDER_NAME = "Pirgachha Shop Delivery Receipts";

function doPost(e) {
  try {
    const payload = JSON.parse(e.postData && e.postData.contents ? e.postData.contents : "{}");
    if (payload.action === "updateStatus") {
      return jsonOutput_(updateStatus_(payload));
    }
    return jsonOutput_(createOrder_(payload));
  } catch (err) {
    return jsonOutput_({ ok: false, error: String(err) });
  }
}

function doGet(e) {
  const params = e.parameter || {};
  let result;
  if (params.action === "track") {
    result = trackOrder_(params.orderId, params.phone);
  } else {
    result = { ok: true, message: "Pirgachha Shop & Delivery backend is running." };
  }
  return jsonOutput_(result, params.callback);
}

function createOrder_(payload) {
  const sheet = getSheet_(ORDERS_SHEET, orderHeaders_());
  const now = new Date();
  const data = payload.rawData || {};
  const row = [
    payload.orderId || "",
    now,
    now,
    payload.type || "",
    payload.status || "Order Received",
    payload.customerName || data.name || "",
    payload.phone || data.phone || "",
    payload.area || data.area || "",
    payload.address || data.address || "",
    payload.landmark || data.landmark || "",
    payload.map || data.map || "",
    payload.items || data.items || "",
    payload.payment || data.payment || "",
    payload.deliveryTime || data.time || "",
    payload.rider || "",
    payload.source || "website",
    payload.fullMessage || "",
    JSON.stringify(payload),
    ""
  ];
  sheet.appendRow(row);
  appendStatus_(payload.orderId, payload.status || "Order Received", "", "Order received from website", now, "");
  sendEmailAlert_("New order: " + (payload.orderId || ""), payload.fullMessage || JSON.stringify(payload, null, 2));
  return { ok: true, orderId: payload.orderId || "", status: payload.status || "Order Received" };
}

function updateStatus_(payload) {
  const sheet = getSheet_(ORDERS_SHEET, orderHeaders_());
  const orderId = String(payload.orderId || "").trim();
  const status = payload.status || "Updated";
  const rider = payload.rider || "";
  const note = payload.note || "";
  const now = new Date();
  const receiptUrl = saveReceipt_(payload, orderId);
  const values = sheet.getDataRange().getValues();
  let found = false;

  for (let i = 1; i < values.length; i++) {
    if (String(values[i][0]).trim() === orderId) {
      sheet.getRange(i + 1, 3).setValue(now);      // Updated Time
      sheet.getRange(i + 1, 5).setValue(status);   // Status
      sheet.getRange(i + 1, 15).setValue(rider);   // Assigned Rider
      if (receiptUrl) sheet.getRange(i + 1, 19).setValue(receiptUrl); // Receipt File
      found = true;
      break;
    }
  }

  appendStatus_(orderId, status, rider, note, now, receiptUrl);
  const emailBody = (payload.fullMessage || JSON.stringify(payload, null, 2)) + (receiptUrl ? "\n\nReceipt file: " + receiptUrl : "");
  sendEmailAlert_("Status update: " + orderId, emailBody);
  return {
    ok: found,
    orderId,
    status,
    rider,
    receiptUrl,
    message: found ? "Status updated" : "Order ID not found, but status note was saved"
  };
}

function trackOrder_(orderId, phone) {
  const sheet = getSheet_(ORDERS_SHEET, orderHeaders_());
  const values = sheet.getDataRange().getValues();
  const id = String(orderId || "").trim();
  const phoneDigits = onlyDigits_(phone);
  for (let i = 1; i < values.length; i++) {
    const row = values[i];
    const rowId = String(row[0]).trim();
    const rowPhone = onlyDigits_(row[6]);
    if (rowId === id && phoneMatches_(rowPhone, phoneDigits)) {
      return {
        ok: true,
        orderId: row[0],
        createdAt: dateText_(row[1]),
        updatedAt: dateText_(row[2]),
        type: row[3],
        status: row[4],
        customerName: row[5],
        phone: row[6],
        area: row[7],
        rider: row[14] || "Not assigned yet"
      };
    }
  }
  return { ok: false, message: "No matching order found. Check Order ID and phone number." };
}

function saveReceipt_(payload, orderId) {
  try {
    const file = payload.receiptFile;
    if (!file || !file.data) return "";

    const folder = getReceiptFolder_();
    const originalName = file.name || payload.receiptFileName || "receipt";
    const safeName = safeFileName_((orderId || "PSD") + "_" + originalName);
    const bytes = Utilities.base64Decode(file.data);
    const blob = Utilities.newBlob(bytes, file.type || "application/octet-stream", safeName);
    const savedFile = folder.createFile(blob);
    return savedFile.getUrl();
  } catch (err) {
    return "Receipt upload failed: " + String(err);
  }
}

function getReceiptFolder_() {
  const folders = DriveApp.getFoldersByName(RECEIPT_FOLDER_NAME);
  if (folders.hasNext()) return folders.next();
  return DriveApp.createFolder(RECEIPT_FOLDER_NAME);
}

function safeFileName_(name) {
  return String(name || "receipt")
    .replace(/[\\/:*?"<>|#%{}~&]/g, "-")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 120);
}

function appendStatus_(orderId, status, rider, note, when, receiptUrl) {
  const sheet = getSheet_(STATUS_SHEET, ["Time", "Order ID", "Status", "Rider", "Note", "Receipt File"]);
  sheet.appendRow([when || new Date(), orderId || "", status || "", rider || "", note || "", receiptUrl || ""]);
}

function getSheet_(name, headers) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(name);
  if (!sheet) sheet = ss.insertSheet(name);
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(headers);
  } else {
    ensureHeaders_(sheet, headers);
  }
  return sheet;
}

function ensureHeaders_(sheet, headers) {
  const lastColumn = Math.max(sheet.getLastColumn(), 1);
  const existing = sheet.getRange(1, 1, 1, lastColumn).getValues()[0].map(String);
  headers.forEach((header) => {
    if (existing.indexOf(header) === -1) {
      sheet.getRange(1, sheet.getLastColumn() + 1).setValue(header);
      existing.push(header);
    }
  });
}

function orderHeaders_() {
  return [
    "Order ID", "Created Time", "Updated Time", "Type", "Status", "Customer Name", "Phone",
    "Area", "Address", "Landmark", "Map", "Items", "Payment", "Delivery Time",
    "Assigned Rider", "Source", "Full Message", "Raw JSON", "Receipt File"
  ];
}

function sendEmailAlert_(subject, body) {
  if (!NOTIFICATION_EMAIL || NOTIFICATION_EMAIL === "yourbusiness@email.com") return;
  try {
    MailApp.sendEmail(NOTIFICATION_EMAIL, subject, body);
  } catch (err) {
    // Email alert failed, but order data is still saved.
  }
}

function jsonOutput_(data, callback) {
  const json = JSON.stringify(data);
  if (callback) {
    return ContentService.createTextOutput(callback + "(" + json + ");").setMimeType(ContentService.MimeType.JAVASCRIPT);
  }
  return ContentService.createTextOutput(json).setMimeType(ContentService.MimeType.JSON);
}

function onlyDigits_(value) {
  return String(value || "").replace(/\D/g, "");
}

function phoneMatches_(savedPhone, inputPhone) {
  if (!savedPhone || !inputPhone) return false;
  if (savedPhone === inputPhone) return true;
  return savedPhone.slice(-6) === inputPhone.slice(-6);
}

function dateText_(value) {
  if (!value) return "";
  return Utilities.formatDate(new Date(value), Session.getScriptTimeZone(), "yyyy-MM-dd HH:mm:ss");
}
