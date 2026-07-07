// Pirgachha Shop & Delivery - free MVP web app
// Edit this section before using the site publicly.
const CONFIG = {
  companyName: "Pirgachha Shop & Delivery",
  // Bangladesh format examples:
  // whatsappNumber: "88017XXXXXXXX"  // no + sign
  // callNumber: "+88017XXXXXXXX"
  whatsappNumber: "8801XXXXXXXXX",
  callNumber: "+8801XXXXXXXXX",
  smsNumber: "+8801XXXXXXXXX",
  emailAddress: "yourbusiness@email.com",
  facebookMessengerUrl: "https://m.me/yourpage",
  restaurants: [
    "Select restaurant",
    "Restaurant 1 - edit name",
    "Restaurant 2 - edit name",
    "Fast Food Shop - edit name",
    "Sweet/Bakery Shop - edit name",
    "Other - write details in food items"
  ]
};

function qs(selector, root = document) { return root.querySelector(selector); }
function qsa(selector, root = document) { return [...root.querySelectorAll(selector)]; }
function orderId(prefix) {
  return `${prefix}-${Date.now().toString().slice(-6)}-${Math.floor(Math.random() * 90 + 10)}`;
}
function showToast(message) {
  const old = qs(".toast");
  if (old) old.remove();
  const toast = document.createElement("div");
  toast.className = "toast";
  toast.textContent = message;
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 2400);
}
function readableFileValue(value) {
  if (value instanceof File) return value.name ? value.name : "Not attached";
  return value;
}
function formDataObject(form) {
  const obj = {};
  const fd = new FormData(form);
  for (const [key, value] of fd.entries()) obj[key] = readableFileValue(value);
  return obj;
}
function clean(value) {
  if (value === undefined || value === null || value === "") return "-";
  return String(value).trim() || "-";
}
function line(label, value) {
  return `${label}: ${clean(value)}`;
}
function labelForType(type) {
  return {
    grocery: "🛒 New Grocery Order",
    restaurant: "🍛 New Restaurant Order",
    medicine: "💊 New Basic Medicine Order",
    partner: "🤝 New Partner Registration Request",
    rider: "🛵 Rider Status Update"
  }[type] || "📦 New Order";
}
function prefixForType(type) {
  return { grocery: "PSD-G", restaurant: "PSD-R", medicine: "PSD-M", partner: "PSD-P", rider: "PSD-U" }[type] || "PSD";
}

function buildMessage(type, data) {
  const id = data.orderId || orderId(prefixForType(type));
  const header = labelForType(type);
  const time = new Date().toLocaleString();

  if (type === "grocery") {
    return `${header}\nOrder ID: ${id}\nTime: ${time}\n\n${line("Name", data.name)}\n${line("Mobile", data.phone)}\n${line("Alternative Phone", data.altPhone)}\n${line("Product List", data.items)}\n${line("Preferred Shop", data.shop)}\n${line("Budget Limit", data.budget)}\n${line("List Photo", data.photoName)}\n${line("Village/Area", data.area)}\n${line("Full Address", data.address)}\n${line("Landmark", data.landmark)}\n${line("Map Location", data.map)}\n${line("Payment", data.payment)}\n${line("Delivery Time", data.time)}\n${line("Note", data.note)}\n\nPlease confirm availability, total price, delivery charge, and delivery time.`;
  }

  if (type === "restaurant") {
    return `${header}\nOrder ID: ${id}\nTime: ${time}\n\n${line("Name", data.name)}\n${line("Mobile", data.phone)}\n${line("Restaurant", data.restaurant)}\n${line("Food Items", data.items)}\n${line("Preparation", data.preparation)}\n${line("Need Cutlery", data.cutlery)}\n${line("Village/Area", data.area)}\n${line("Full Address", data.address)}\n${line("Landmark", data.landmark)}\n${line("Map Location", data.map)}\n${line("Payment", data.payment)}\n${line("Call Confirmation", data.confirm)}\n${line("Instruction", data.note)}\n\nPlease confirm food availability, total price, delivery charge, and delivery time.`;
  }

  if (type === "medicine") {
    return `${header}\nOrder ID: ${id}\nTime: ${time}\n\n${line("Name", data.name)}\n${line("Mobile", data.phone)}\n${line("For", data.patient)}\n${line("Medicine/Health Items", data.items)}\n${line("Preferred Pharmacy", data.pharmacy)}\n${line("Urgency", data.urgency)}\n${line("Prescription/Photo", data.photoName)}\n${line("Village/Area", data.area)}\n${line("Full Address", data.address)}\n${line("Landmark", data.landmark)}\n${line("Map Location", data.map)}\n${line("Payment", data.payment)}\n${line("Call Confirmation", data.confirm)}\n${line("Note", data.note)}\n\nPlease confirm item availability with a pharmacy, total price, delivery charge, and delivery time. This is a delivery request only, not medical advice.`;
  }

  if (type === "partner") {
    return `${header}\nTime: ${time}\n\n${line("Business", data.business)}\n${line("Owner/Manager", data.owner)}\n${line("Mobile", data.phone)}\n${line("Type", data.type)}\n${line("Address", data.address)}\n${line("Products/Menu", data.items)}\n\nPlease contact this partner.`;
  }

  if (type === "rider") {
    return `${header}\nTime: ${time}\n\n${line("Order ID", data.orderId)}\n${line("Rider", data.rider)}\n${line("Status", data.status)}\n${line("Note", data.note)}\n\nUpdated from rider form.`;
  }

  return `${header}\nTime: ${time}\n\n${JSON.stringify(data, null, 2)}`;
}

async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text);
    showToast("Order text copied");
  } catch {
    const temp = document.createElement("textarea");
    temp.value = text;
    document.body.appendChild(temp);
    temp.select();
    document.execCommand("copy");
    temp.remove();
    showToast("Order text copied");
  }
}

function openUrl(url) {
  window.open(url, "_blank", "noopener,noreferrer");
}

function showShareModal(type, message) {
  const modal = qs("#shareModal");
  if (!modal) return;

  const subject = `${CONFIG.companyName} - ${labelForType(type).replace(/^[^A-Za-z]+/, "")}`;
  const encodedMessage = encodeURIComponent(message);
  const whatsappUrl = `https://wa.me/${CONFIG.whatsappNumber}?text=${encodedMessage}`;
  const smsUrl = `sms:${CONFIG.smsNumber}?&body=${encodedMessage}`;
  const emailUrl = `mailto:${CONFIG.emailAddress}?subject=${encodeURIComponent(subject)}&body=${encodedMessage}`;
  const callUrl = `tel:${CONFIG.callNumber}`;

  modal.innerHTML = `
    <div class="modal-card">
      <div class="modal-head">
        <div>
          <p class="eyebrow">Choose sending option</p>
          <h2 id="modalTitle">Your order is ready</h2>
          <p class="copy-note">Select any option below. We will receive the order through the app/account you choose.</p>
        </div>
        <button class="close-btn" type="button" aria-label="Close">×</button>
      </div>
      <h3>Order Preview</h3>
      <div class="order-preview">${escapeHtml(message)}</div>
      <div class="share-grid">
        <button class="share-btn" type="button" data-action="native"><span>📲</span> Share to Any App</button>
        <button class="share-btn" type="button" data-action="whatsapp"><span>💬</span> WhatsApp</button>
        <button class="share-btn" type="button" data-action="sms"><span>✉️</span> Phone Text/SMS</button>
        <button class="share-btn" type="button" data-action="email"><span>📧</span> Gmail/Email</button>
        <button class="share-btn" type="button" data-action="facebook"><span>📘</span> Facebook/Messenger</button>
        <button class="share-btn" type="button" data-action="call"><span>📞</span> Call Company</button>
        <button class="share-btn" type="button" data-action="copy"><span>📋</span> Copy for IMO/Other</button>
      </div>
      <p class="copy-note">Tip: For IMO or another app, use “Share to Any App” if available. Otherwise use “Copy for IMO/Other” and paste the order text manually.</p>
    </div>`;

  modal.classList.remove("hidden");

  qs(".close-btn", modal).addEventListener("click", () => modal.classList.add("hidden"));
  modal.addEventListener("click", (event) => {
    if (event.target === modal) modal.classList.add("hidden");
  }, { once: true });

  qsa("[data-action]", modal).forEach((btn) => {
    btn.addEventListener("click", async () => {
      const action = btn.dataset.action;
      if (action === "native") {
        if (navigator.share) {
          try { await navigator.share({ title: subject, text: message }); }
          catch { /* User cancelled or sharing failed */ }
        } else {
          await copyText(message);
          alert("Your browser does not support direct app sharing. The order text was copied. Paste it into IMO, Facebook, Messenger, or any other app.");
        }
      }
      if (action === "whatsapp") openUrl(whatsappUrl);
      if (action === "sms") window.location.href = smsUrl;
      if (action === "email") window.location.href = emailUrl;
      if (action === "facebook") {
        await copyText(message);
        openUrl(CONFIG.facebookMessengerUrl);
      }
      if (action === "call") {
        await copyText(message);
        window.location.href = callUrl;
      }
      if (action === "copy") await copyText(message);
    });
  });
}

function escapeHtml(str) {
  return String(str)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function setupRestaurantOptions() {
  const select = qs("#restaurantSelect");
  if (!select) return;
  CONFIG.restaurants.forEach((restaurant, index) => {
    const option = document.createElement("option");
    option.value = index === 0 ? "" : restaurant;
    option.textContent = restaurant;
    select.appendChild(option);
  });
}

function setupForms() {
  qsa("form[data-order-type]").forEach((form) => {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const type = form.dataset.orderType;
      const message = buildMessage(type, formDataObject(form));
      showShareModal(type, message);
    });
  });
}

function setupLocationButtons() {
  qsa(".location-btn").forEach((button) => {
    button.addEventListener("click", () => {
      const targetId = button.dataset.target;
      const input = document.getElementById(targetId);
      if (!input) return;
      if (!navigator.geolocation) {
        alert("Location is not supported on this device/browser. Please paste a Google Maps link manually.");
        return;
      }
      button.disabled = true;
      button.textContent = "📍 Getting location...";
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          input.value = `https://www.google.com/maps?q=${latitude.toFixed(6)},${longitude.toFixed(6)}`;
          button.disabled = false;
          button.textContent = "📍 Location Added";
          showToast("Location added successfully");
        },
        () => {
          button.disabled = false;
          button.textContent = "📍 Add My Location";
          alert("Location permission was denied or unavailable. Please paste a Google Maps link manually or write a clear landmark.");
        },
        { enableHighAccuracy: true, timeout: 12000, maximumAge: 60000 }
      );
    });
  });
}

function setupQuickActions() {
  const callNow = qs("#callNow");
  if (callNow) callNow.href = `tel:${CONFIG.callNumber}`;
}

// PWA install prompt. It works on supported Android browsers when hosted with HTTPS.
let deferredPrompt;
window.addEventListener("beforeinstallprompt", (event) => {
  event.preventDefault();
  deferredPrompt = event;
  const btn = qs("#installBtn");
  if (!btn) return;
  btn.classList.remove("hidden");
  btn.addEventListener("click", async () => {
    btn.classList.add("hidden");
    deferredPrompt.prompt();
    await deferredPrompt.userChoice;
    deferredPrompt = null;
  }, { once: true });
});

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("service-worker.js").catch(() => {});
  });
}

setupRestaurantOptions();
setupForms();
setupLocationButtons();
setupQuickActions();
