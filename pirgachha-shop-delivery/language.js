// EN/BN language switcher for Pirgachha Shop & Delivery
(function () {
  const STORAGE_KEY = "psd_language";
  const defaultLang = localStorage.getItem(STORAGE_KEY) || "en";

  const translations = {
    "Pirgachha Shop & Delivery": "পীরগাছা শপ অ্যান্ড ডেলিভারি",
    "Pirgachha Rider App": "পীরগাছা রাইডার অ্যাপ",
    "Grocery • Food • Basic Medicine • Local Delivery": "গ্রোসারি • খাবার • বেসিক মেডিসিন • লোকাল ডেলিভারি",
    "Status update • Receipt upload • Delivery proof": "স্ট্যাটাস আপডেট • রসিদ আপলোড • ডেলিভারি প্রমাণ",
    "Install App": "অ্যাপ ইনস্টল",
    "Install Rider App": "রাইডার অ্যাপ ইনস্টল",
    "Track Order": "অর্ডার ট্র্যাক",
    "Home": "হোম",

    "Start your order": "অর্ডার শুরু করুন",
    "Choose what you need today": "আজ আপনার প্রয়োজনীয় সেবা বেছে নিন",
    "Tap one option, fill the simple form, add address/location, and choose how to send the order.": "একটি অপশন বেছে নিন, সহজ ফর্ম পূরণ করুন, ঠিকানা/লোকেশন দিন, তারপর অর্ডার পাঠান।",
    "Order Grocery": "গ্রোসারি অর্ডার",
    "Order Restaurant Food": "রেস্টুরেন্ট খাবার",
    "Basic Medicine": "বেসিক মেডিসিন",
    "Write your product list, add address, and send list photo later if needed.": "পণ্যের তালিকা লিখুন, ঠিকানা দিন, প্রয়োজনে তালিকার ছবি পাঠান।",
    "Select a restaurant, write food items, and request call confirmation if needed.": "রেস্টুরেন্ট বেছে নিন, খাবারের নাম লিখুন, প্রয়োজনে কল কনফার্মেশন দিন।",
    "Request everyday health essentials through local pharmacies safely.": "লোকাল ফার্মেসি থেকে প্রয়োজনীয় স্বাস্থ্য পণ্য অর্ডার করুন।",
    "Order Grocery →": "গ্রোসারি অর্ডার →",
    "Order Food →": "খাবার অর্ডার →",
    "Order Medicine →": "মেডিসিন অর্ডার →",

    "Service Area": "সার্ভিস এলাকা",
    "Pirgachha Bazar and nearby areas. Village deliveries are available by scheduled batch.": "পীরগাছা বাজার এবং আশেপাশের এলাকা। গ্রামে ডেলিভারি নির্দিষ্ট সময়সূচি অনুযায়ী করা হবে।",
    "Call, SMS, WhatsApp, email, and other app sharing options": "কল, এসএমএস, হোয়াটসঅ্যাপ, ইমেইল এবং অন্যান্য অ্যাপে পাঠানোর সুবিধা",
    "Cash on Delivery accepted": "ক্যাশ অন ডেলিভারি গ্রহণযোগ্য",
    "bKash/Nagad accepted": "বিকাশ/নগদ গ্রহণযোগ্য",
    "Customer can add phone location": "কাস্টমার ফোন লোকেশন দিতে পারবেন",
    "Call to Order": "কল করে অর্ডার",
    "Talk directly with us": "সরাসরি আমাদের সাথে কথা বলুন",
    "Delivery Charge": "ডেলিভারি চার্জ",
    "See area-based fee": "এলাকা অনুযায়ী ফি দেখুন",
    "Partner Registration": "পার্টনার রেজিস্ট্রেশন",
    "For shops/restaurants/pharmacies": "দোকান/রেস্টুরেন্ট/ফার্মেসির জন্য",
    "Privacy Policy": "প্রাইভেসি পলিসি",
    "Local delivery service for Pirgachha.": "পীরগাছার লোকাল ডেলিভারি সার্ভিস।",

    "Customer Tracking": "কাস্টমার ট্র্যাকিং",
    "Track your order status.": "আপনার অর্ডার স্ট্যাটাস দেখুন।",
    "Enter your numeric Order ID only. No phone number is required.": "শুধু আপনার অর্ডার আইডি দিন। ফোন নম্বর প্রয়োজন নেই।",
    "Order ID": "অর্ডার আইডি",
    "Check Status": "স্ট্যাটাস দেখুন",
    "Order Status": "অর্ডার স্ট্যাটাস",
    "Order not found": "অর্ডার পাওয়া যায়নি",
    "Could not check status.": "স্ট্যাটাস দেখা যায়নি।",
    "Please try again or contact the company.": "আবার চেষ্টা করুন অথবা কোম্পানির সাথে যোগাযোগ করুন।",
    "Checking order status...": "অর্ডার স্ট্যাটাস দেখা হচ্ছে...",
    "Tracking is not connected yet.": "ট্র্যাকিং এখনো কানেক্ট করা হয়নি।",
    "Please add the Google Apps Script URL in app.js first.": "প্রথমে app.js ফাইলে Google Apps Script URL যোগ করুন।",
    "Tracking is prepared but not connected yet. Add the Google Apps Script Web App URL inside app.js first.": "ট্র্যাকিং প্রস্তুত আছে, তবে এখনো কানেক্ট করা হয়নি। প্রথমে app.js ফাইলে Google Apps Script Web App URL যোগ করুন।",
    "Type:": "ধরন:",
    "Updated:": "আপডেট:",
    "Rider:": "রাইডার:",
    "Not assigned yet": "এখনো নির্ধারণ করা হয়নি",
    "For urgent updates, call or message the company directly.": "জরুরি আপডেটের জন্য সরাসরি কোম্পানিকে কল বা মেসেজ করুন।",

    "Delivery Rider": "ডেলিভারি রাইডার",
    "Update order status quickly.": "দ্রুত অর্ডার স্ট্যাটাস আপডেট করুন।",
    "Riders can update delivery status and attach the shopping money receipt after purchasing items.": "রাইডার পণ্য কেনার পর ডেলিভারি স্ট্যাটাস আপডেট এবং রসিদ আপলোড করতে পারবেন।",
    "Rider Name": "রাইডারের নাম",
    "Status": "স্ট্যাটাস",
    "Accepted order": "অর্ডার গ্রহণ করা হয়েছে",
    "Collected from shop/restaurant/pharmacy": "দোকান/রেস্টুরেন্ট/ফার্মেসি থেকে সংগ্রহ করা হয়েছে",
    "On the way": "পথে আছে",
    "Delivered": "ডেলিভারি সম্পন্ন",
    "Cancelled/Problem": "বাতিল/সমস্যা",
    "Money Receipt Photo/File": "টাকার রসিদের ছবি/ফাইল",
    "optional": "ঐচ্ছিক",
    "Attach the shopping receipt after purchasing items. Image or PDF, maximum 5 MB.": "পণ্য কেনার পর রসিদ সংযুক্ত করুন। ছবি বা PDF, সর্বোচ্চ ৫ MB।",
    "Note": "নোট",
    "Send Rider Update": "রাইডার আপডেট পাঠান",

    "Name": "নাম",
    "Mobile": "মোবাইল",
    "Alternative Phone": "বিকল্প ফোন",
    "Product List": "পণ্যের তালিকা",
    "Preferred Shop": "পছন্দের দোকান",
    "Budget Limit": "বাজেট সীমা",
    "List Photo": "তালিকার ছবি",
    "Village/Area": "গ্রাম/এলাকা",
    "Full Address": "পূর্ণ ঠিকানা",
    "Landmark": "পরিচিত স্থান",
    "Map Location": "ম্যাপ লোকেশন",
    "Payment": "পেমেন্ট",
    "Delivery Time": "ডেলিভারি সময়",
    "Restaurant": "রেস্টুরেন্ট",
    "Food Items": "খাবারের আইটেম",
    "Preparation": "প্রস্তুতি",
    "Need Cutlery": "চামচ/প্লেট লাগবে?",
    "Call Confirmation": "কল কনফার্মেশন",
    "Instruction": "নির্দেশনা",
    "For": "কার জন্য",
    "Medicine/Health Items": "মেডিসিন/স্বাস্থ্য পণ্য",
    "Preferred Pharmacy": "পছন্দের ফার্মেসি",
    "Urgency": "জরুরি অবস্থা",
    "Prescription/Photo": "প্রেসক্রিপশন/ছবি",
    "Business": "ব্যবসার নাম",
    "Owner/Manager": "মালিক/ম্যানেজার",
    "Address": "ঠিকানা",
    "Products/Menu": "পণ্য/মেনু",
    "Submit": "জমা দিন",
    "Send Order": "অর্ডার পাঠান",
    "Place Order": "অর্ডার করুন",

    "Choose sending option": "পাঠানোর অপশন বেছে নিন",
    "Your update is ready": "আপনার আপডেট প্রস্তুত",
    "Select any option below. We will receive the order/update through the app/account you choose.": "নিচের যেকোনো অপশন বেছে নিন। আপনি যে অ্যাপ/অ্যাকাউন্ট বেছে নেবেন, সেখানে অর্ডার/আপডেট পাঠানো হবে।",
    "Preview": "প্রিভিউ",
    "Share to Any App": "যেকোনো অ্যাপে শেয়ার",
    "WhatsApp": "হোয়াটসঅ্যাপ",
    "Phone Text/SMS": "ফোন টেক্সট/SMS",
    "Gmail/Email": "জিমেইল/ইমেইল",
    "Facebook/Messenger": "ফেসবুক/মেসেঞ্জার",
    "Call Company": "কোম্পানিকে কল",
    "Copy for IMO/Other": "IMO/অন্যান্য অ্যাপের জন্য কপি",
    "Order text copied": "অর্ডার লেখা কপি হয়েছে",
    "Saved to database": "ডাটাবেসে সেভ হয়েছে",

    "Example: 1234567890": "উদাহরণ: 1234567890",
    "Rider name": "রাইডারের নাম",
    "Payment collected, total shopping cost, customer unavailable, delivery proof note, etc.": "পেমেন্ট নেওয়া হয়েছে, মোট বাজার খরচ, কাস্টমার পাওয়া যায়নি, ডেলিভারি প্রমাণ নোট ইত্যাদি।",
    "Example: product name, quantity, brand if any": "উদাহরণ: পণ্যের নাম, পরিমাণ, ব্র্যান্ড থাকলে লিখুন",
    "Example: Pirgachha Bazar / Other shop": "উদাহরণ: পীরগাছা বাজার / অন্য দোকান",
    "Example: Village, road, house details": "উদাহরণ: গ্রাম, রাস্তা, বাড়ির বিবরণ",
    "Example: Near mosque/school/market": "উদাহরণ: মসজিদ/স্কুল/বাজারের পাশে"
  };

  const reverseTranslations = {};
  Object.keys(translations).forEach((key) => {
    reverseTranslations[translations[key]] = key;
  });

  function translateText(value, lang) {
    if (!value) return value;
    const trimmed = value.trim();
    if (!trimmed) return value;
    const map = lang === "bn" ? translations : reverseTranslations;
    const translated = map[trimmed];
    if (!translated) return value;
    return value.replace(trimmed, translated);
  }

  function addLanguageStyles() {
    if (document.getElementById("psdLangStyles")) return;
    const style = document.createElement("style");
    style.id = "psdLangStyles";
    style.textContent = `
      .language-toggle { display: inline-flex; align-items: center; border: 1px solid var(--border); border-radius: 999px; background: #fff; padding: 3px; gap: 2px; box-shadow: 0 8px 18px rgba(15,118,110,.08); }
      .language-toggle button { border: 0; background: transparent; color: var(--brand); border-radius: 999px; padding: 7px 10px; font-weight: 900; cursor: pointer; font-size: 12px; line-height: 1; }
      .language-toggle button.active { background: var(--brand); color: #fff; }
      html[lang="bn"] body { font-family: Arial, Helvetica, sans-serif; }
      @media (max-width: 620px) { .language-toggle button { padding: 6px 8px; font-size: 11px; } }
    `;
    document.head.appendChild(style);
  }

  function createToggle() {
    if (document.getElementById("languageToggle")) return;
    const toggle = document.createElement("div");
    toggle.id = "languageToggle";
    toggle.className = "language-toggle";
    toggle.setAttribute("aria-label", "Language switcher");
    toggle.innerHTML = `<button type="button" data-lang="en">EN</button><button type="button" data-lang="bn">BN</button>`;

    const topActions = document.querySelector(".top-actions");
    const navWrap = document.querySelector(".nav-wrap");
    if (topActions) topActions.prepend(toggle);
    else if (navWrap) navWrap.appendChild(toggle);

    toggle.addEventListener("click", (event) => {
      const button = event.target.closest("button[data-lang]");
      if (!button) return;
      setLanguage(button.dataset.lang);
    });
  }

  function updateToggle(lang) {
    document.querySelectorAll("#languageToggle button[data-lang]").forEach((button) => {
      button.classList.toggle("active", button.dataset.lang === lang);
    });
  }

  function translateAttributes(lang) {
    document.querySelectorAll("input[placeholder], textarea[placeholder]").forEach((element) => {
      element.placeholder = translateText(element.placeholder, lang);
    });
    document.querySelectorAll("img[alt]").forEach((element) => {
      element.alt = translateText(element.alt, lang);
    });
    if (document.title) document.title = translateText(document.title, lang);
  }

  function translateTextNodes(lang) {
    const skipTags = new Set(["SCRIPT", "STYLE", "NOSCRIPT", "TEXTAREA"]);
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
      acceptNode(node) {
        const parent = node.parentElement;
        if (!parent || skipTags.has(parent.tagName)) return NodeFilter.FILTER_REJECT;
        if (parent.closest(".order-preview")) return NodeFilter.FILTER_REJECT;
        return NodeFilter.FILTER_ACCEPT;
      }
    });
    const nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);
    nodes.forEach((node) => {
      node.nodeValue = translateText(node.nodeValue, lang);
    });
  }

  function applyLanguage(lang) {
    document.documentElement.lang = lang === "bn" ? "bn" : "en";
    translateTextNodes(lang);
    translateAttributes(lang);
    updateToggle(lang);
  }

  function setLanguage(lang) {
    const safeLang = lang === "bn" ? "bn" : "en";
    localStorage.setItem(STORAGE_KEY, safeLang);
    applyLanguage(safeLang);
  }

  function observeDynamicText() {
    const target = document.getElementById("shareModal") || document.body;
    const observer = new MutationObserver(() => {
      const lang = localStorage.getItem(STORAGE_KEY) || "en";
      applyLanguage(lang);
    });
    observer.observe(target, { childList: true, subtree: true });
  }

  document.addEventListener("DOMContentLoaded", () => {
    addLanguageStyles();
    createToggle();
    setLanguage(defaultLang);
    observeDynamicText();
  });
})();
