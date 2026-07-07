const NOTIFICATION_EMAIL = "hbgadgetb@gmail.com";
const ORDERS_SHEET = "Orders";
const STATUS_SHEET = "Status Updates";
const RECEIPT_FOLDER_NAME = "Pirgachha Shop Delivery Receipts";

function doPost(e) {
  try {
    const payload = JSON.parse(e.postData && e.postData.contents ? e.postData.contents : "{}");
    if (payload.action === "updateStatus") return jsonOutput_(updateStatus_(payload));
    return jsonOutput_(createOrder_(payload));
  } catch (err) {
    return jsonOutput_({ ok: false, error: String(err) });
  }
}

function doGet(e) {
  const params = e.parameter || {};
  const result = params.action === "track" ? trackOrder_(params.orderId) : { ok: true, message: "Pirgachha Shop & Delivery backend is running." };
  return jsonOutput_(result, params.callback);
}

function createOrder_(payload) {
  const sheet = getSheet_(ORDERS_SHEET, orderHeaders_());
  const now = new Date();
  const data = payload.rawData || {};
  const orderId = normalizeOrderId_(payload.orderId || data.orderId || "");
  sheet.appendRow([
    orderId, now, now, payload.type || "", payload.status || "Order Received",
    payload.customerName || data.name || "", payload.phone || data.phone || "",
    payload.area || data.area || "", payload.address || data.address || "",
    payload.landmark || data.landmark || "", payload.map || data.map || "",
    payload.items || data.items || "", payload.payment || data.payment || "",
    payload.deliveryTime || data.time || "", payload.rider || "",
    payload.source || "website", payload.fullMessage || "", JSON.stringify(payload), ""
  ]);
  appendStatus_(orderId, payload.status || "Order Received", "", "Order received from website", now, "");
  sendEmailAlert_("New order: " + orderId, payload.fullMessage || JSON.stringify(payload, null, 2));
  return { ok: true, orderId: orderId, status: payload.status || "Order Received" };
}

function updateStatus_(payload) {
  const sheet = getSheet_(ORDERS_SHEET, orderHeaders_());
  const orderId = normalizeOrderId_(payload.orderId || "");
  const status = payload.status || "Updated";
  const rider = payload.rider || "";
  const note = payload.note || "";
  const now = new Date();
  const receiptUrl = saveReceipt_(payload, orderId);
  const values = sheet.getDataRange().getValues();
  let found = false;

  for (let i = 1; i < values.length; i++) {
    if (normalizeOrderId_(values[i][0]) === orderId) {
      sheet.getRange(i + 1, 3).setValue(now);
      sheet.getRange(i + 1, 5).setValue(status);
      sheet.getRange(i + 1, 15).setValue(rider);
      if (receiptUrl) sheet.getRange(i + 1, 19).setValue(receiptUrl);
      found = true;
      break;
    }
  }

  appendStatus_(orderId, status, rider, note, now, receiptUrl);
  const emailBody = (payload.fullMessage || JSON.stringify(payload, null, 2)) + (receiptUrl ? "\n\nReceipt file: " + receiptUrl : "");
  sendEmailAlert_("Status update: " + orderId, emailBody);
  return { ok: found, orderId: orderId, status: status, rider: rider, receiptUrl: receiptUrl, message: found ? "Customer order status updated" : "Order ID not found in Orders sheet, but status note was saved" };
}

function trackOrder_(orderId) {
  const sheet = getSheet_(ORDERS_SHEET, orderHeaders_());
  const values = sheet.getDataRange().getValues();
  const id = normalizeOrderId_(orderId);

  if (!id || id === "-") {
    return { ok: false, message: "Please enter a valid Order ID." };
  }

  for (let i = 1; i < values.length; i++) {
    const row = values[i];
    if (normalizeOrderId_(row[0]) === id) {
      const latest = latestStatusForOrder_(id);
      return {
        ok: true,
        orderId: row[0],
        createdAt: dateText_(row[1]),
        updatedAt: latest.updatedAt || dateText_(row[2]),
        type: row[3],
        status: latest.status || row[4] || "Order Received",
        customerName: row[5],
        area: row[7],
        rider: latest.rider || row[14] || "Not assigned yet"
      };
    }
  }
  return { ok: false, message: "No matching order found. Check the Order ID." };
}

function latestStatusForOrder_(orderId) {
  const sheet = getSheet_(STATUS_SHEET, ["Time", "Order ID", "Status", "Rider", "Note", "Receipt File"]);
  const values = sheet.getDataRange().getValues();
  const id = normalizeOrderId_(orderId);
  let latest = { status: "", rider: "", updatedAt: "" };
  let latestTime = 0;
  for (let i = 1; i < values.length; i++) {
    if (normalizeOrderId_(values[i][1]) !== id) continue;
    const timeValue = values[i][0] ? new Date(values[i][0]).getTime() : 0;
    if (timeValue >= latestTime) {
      latestTime = timeValue;
      latest = { status: values[i][2] || "", rider: values[i][3] || "", updatedAt: dateText_(values[i][0]) };
    }
  }
  return latest;
}

function saveReceipt_(payload, orderId) {
  try {
    const file = payload.receiptFile;
    if (!file || !file.data) return "";
    const folder = getReceiptFolder_();
    const originalName = file.name || payload.receiptFileName || "receipt";
    const safeName = String((orderId || "PSD") + "_" + originalName).replace(/[^a-zA-Z0-9_. -]/g, "-").slice(0, 120);
    const bytes = Utilities.base64Decode(file.data);
    const blob = Utilities.newBlob(bytes, file.type || "application/octet-stream", safeName);
    return folder.createFile(blob).getUrl();
  } catch (err) {
    return "Receipt upload failed: " + String(err);
  }
}

function getReceiptFolder_() {
  const folders = DriveApp.getFoldersByName(RECEIPT_FOLDER_NAME);
  if (folders.hasNext()) return folders.next();
  return DriveApp.createFolder(RECEIPT_FOLDER_NAME);
}

function appendStatus_(orderId, status, rider, note, when, receiptUrl) {
  const sheet = getSheet_(STATUS_SHEET, ["Time", "Order ID", "Status", "Rider", "Note", "Receipt File"]);
  sheet.appendRow([when || new Date(), normalizeOrderId_(orderId), status || "", rider || "", note || "", receiptUrl || ""]);
}

function getSheet_(name, headers) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(name);
  if (!sheet) sheet = ss.insertSheet(name);
  if (sheet.getLastRow() === 0) sheet.appendRow(headers);
  else ensureHeaders_(sheet, headers);
  return sheet;
}

function ensureHeaders_(sheet, headers) {
  const lastColumn = Math.max(sheet.getLastColumn(), 1);
  const existing = sheet.getRange(1, 1, 1, lastColumn).getValues()[0].map(String);
  headers.forEach(function(header) {
    if (existing.indexOf(header) === -1) {
      sheet.getRange(1, sheet.getLastColumn() + 1).setValue(header);
      existing.push(header);
    }
  });
}

function orderHeaders_() {
  return ["Order ID", "Created Time", "Updated Time", "Type", "Status", "Customer Name", "Phone", "Area", "Address", "Landmark", "Map", "Items", "Payment", "Delivery Time", "Assigned Rider", "Source", "Full Message", "Raw JSON", "Receipt File"];
}

function sendEmailAlert_(subject, body) {
  if (!NOTIFICATION_EMAIL || NOTIFICATION_EMAIL === "yourbusiness@email.com") return;
  try { MailApp.sendEmail(NOTIFICATION_EMAIL, subject, body); } catch (err) {}
}

function jsonOutput_(data, callback) {
  const json = JSON.stringify(data);
  if (callback) return ContentService.createTextOutput(callback + "(" + json + ");").setMimeType(ContentService.MimeType.JAVASCRIPT);
  return ContentService.createTextOutput(json).setMimeType(ContentService.MimeType.JSON);
}

function normalizeOrderId_(value) {
  return String(value || "").trim().toUpperCase().replace(/\s+/g, "");
}

function dateText_(value) {
  if (!value) return "";
  return Utilities.formatDate(new Date(value), Session.getScriptTimeZone(), "yyyy-MM-dd HH:mm:ss");
}
