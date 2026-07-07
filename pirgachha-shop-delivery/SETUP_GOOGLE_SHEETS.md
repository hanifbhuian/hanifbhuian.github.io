# Google Sheets Database Setup

This version saves each order automatically to Google Sheets and keeps the current popup order methods.

## 1. Create the Google Sheet

1. Go to Google Sheets.
2. Create a blank sheet.
3. Rename it: `Pirgachha Shop Delivery Orders`.

## 2. Add the Apps Script backend

1. In the Google Sheet, click **Extensions > Apps Script**.
2. Delete any starter code.
3. Open `google-apps-script/Code.gs` from this package.
4. Copy all code and paste it into Apps Script.
5. Change this line if you want email notifications:

```js
const NOTIFICATION_EMAIL = "yourbusiness@email.com";
```

Example:

```js
const NOTIFICATION_EMAIL = "yourname@gmail.com";
```

Leave it unchanged if you do not want email alerts yet.

## 3. Deploy as Web App

1. Click **Deploy > New deployment**.
2. Select **Web app**.
3. Description: `PSD Order Backend`.
4. Execute as: **Me**.
5. Who has access: **Anyone**.
6. Click **Deploy**.
7. Allow permissions.
8. Copy the **Web App URL**.

## 4. Connect website to the database

Open `app.js` and find:

```js
googleScriptUrl: "",
```

Paste your Web App URL:

```js
googleScriptUrl: "https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec",
```

Then upload/replace `app.js` on GitHub.

## 5. How it works

Customer submits order:

1. Order is saved to Google Sheets.
2. The same popup appears with WhatsApp, SMS, email, Messenger, call, and copy options.
3. Customer can also use `track.html` to check status.
4. Rider can use `rider.html` to update status.

## 6. Important

The customer order is automatically saved only after `googleScriptUrl` is added in `app.js`.

Before that, the website still works with WhatsApp/SMS/email/call popup only.
