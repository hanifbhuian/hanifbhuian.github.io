# Pirgachha Shop & Delivery - Free MVP Web App v3

This is a revised free starter web app for a local delivery business in Pirgachha.

## What changed in v3
- Added all generated promotional images/posters to the web app.
- Homepage now opens with a large professional service banner.
- Added visual service cards for Grocery, Restaurant Food, and Basic Medicine.
- Added category banners on the Grocery, Restaurant, Medicine, and Delivery pages.
- Updated offline cache so images are included when the PWA is hosted and installed.

## What changed in v2
- Added Basic Medicine / pharmacy item order page.
- Homepage is simpler: customer first sees only the main landing area and service buttons.
- Grocery, Restaurant, and Medicine each open as separate pages.
- Order forms are more realistic and visual.
- Added “Add My Location” button using the phone/browser location permission.
- Order is no longer sent directly to WhatsApp after submit.
- After clicking “Send Order,” a popup shows options:
  - Share to any installed app
  - WhatsApp
  - Phone text/SMS
  - Gmail/Email
  - Facebook/Messenger
  - Call company
  - Copy for IMO/Other apps

## Important limitations
This free version does not use a paid database or backend. The company receives the order only when the customer sends/shares it through one of the popup options.

The location button works best after the site is hosted online using HTTPS. It may not work when opened directly from the computer as a local file.

File/photo upload fields do not upload automatically in the free version. The form records the file name only. Customers should send the actual grocery-list photo or prescription photo through their selected messaging app after submitting the order.

## Edit business contact details
Open `app.js` and replace these placeholders:

```js
whatsappNumber: "8801XXXXXXXXX",
callNumber: "+8801XXXXXXXXX",
smsNumber: "+8801XXXXXXXXX",
emailAddress: "yourbusiness@email.com",
facebookMessengerUrl: "https://m.me/yourpage",
```

Also edit the restaurant list in `app.js`:

```js
restaurants: [
  "Select restaurant",
  "Restaurant 1 - edit name",
  "Restaurant 2 - edit name"
]
```

## How to check locally
1. Unzip the folder.
2. Open `index.html` in Chrome.
3. Click Grocery, Restaurant Food, or Basic Medicine.
4. Fill the form.
5. Click `Send Order`.
6. Choose one popup option.

## Pages included
- `index.html` - simple home page
- `grocery.html` - grocery order form
- `restaurant.html` - restaurant order form
- `medicine.html` - basic medicine order form
- `delivery.html` - delivery charge page
- `partner.html` - partner registration form
- `rider.html` - rider update form
- `privacy.html` - privacy policy

## Free hosting options
You can host the folder for free using GitHub Pages, Netlify, or Cloudflare Pages.

## For Play Store later
This web app can be converted into an Android app later using PWA/TWA, but Google Play publishing requires a one-time Google Play developer account fee.
