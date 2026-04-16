// ==============================
// 🌍 HELPERS
// ==============================

function t(obj, lang) {
  if (!obj) return "";
  if (typeof obj === "string") return obj;
  return obj[lang] || obj.ar || obj.en || "";
}

function getLang() {
  const params = new URLSearchParams(window.location.search);
  return params.get("lang") || localStorage.getItem("lang") || "en";
}

// ==============================
// 🌍 LANGUAGE
// ==============================

const lang = getLang();

document.documentElement.lang = lang;
document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";

document.body.classList.toggle("lang-en", lang === "en");
document.body.classList.toggle("lang-ar", lang === "ar");

// ==============================
// 🌍 UI TEXT
// ==============================

const UI = {
  ar: {
    title: "قوائم التوثيق للمحطات",
    subtitle: "اختر المحطة لفتح قائمة التحقق الخاصة بها",
    availableStations: "المحطات المتاحة",
    openExam: "فتح القائمة",
    loading: "جاري تحميل المحطات...",
    error: "حدث خطأ أثناء تحميل المحطات"
  },
  en: {
    title: "Station Verification Checklists",
    subtitle: "Choose a station to open its verification checklist",
    availableStations: "Available Stations",
    openExam: "Open Checklist",
    loading: "Loading stations...",
    error: "Failed to load stations"
  }
};

const ui = UI[lang];

// ==============================
// 🌍 APPLY TEXT
// ==============================

document.getElementById("heroTitle").textContent = ui.title;
document.getElementById("heroSubtitle").textContent = ui.subtitle;
document.getElementById("sectionTitle").textContent = ui.availableStations;

// ==============================
// 🌍 LANGUAGE SWITCH
// ==============================

function setLang(newLang) {
  localStorage.setItem("lang", newLang);
  const params = new URLSearchParams(window.location.search);
  params.set("lang", newLang);
  window.location.search = params.toString();
}

const toggle = document.getElementById("langToggle");

// Set initial position
if (lang === "ar") {
  toggle.classList.add("active");
}

toggle.addEventListener("click", () => {
  const newLang = lang === "en" ? "ar" : "en";
  setLang(newLang);
});

// ==============================
// 📦 DATA
// ==============================

async function loadStations() {
  const res = await fetch("data/stations.json");
  if (!res.ok) throw new Error(ui.error);
  return res.json();
}

// ==============================
// 🧱 RENDER
// ==============================

function renderStations(stations) {
  const list = document.getElementById("list");

  list.innerHTML = stations.map(s => {
    const href = `checklist.html?station=${encodeURIComponent(s.id)}&lang=${lang}`;
    
    return `
      <a class="station" href="${href}">
        <span class="station-title">${t(s.name, lang)}</span>
        <span class="station-action">${ui.openExam}</span>
      </a>
    `;
  }).join("");
}

// ==============================
// 🚀 MAIN
// ==============================

async function main() {
  const list = document.getElementById("list");
  list.innerHTML = `<div class="hint">${ui.loading}</div>`;

  const stations = await loadStations();
  renderStations(stations);
}

main().catch(err => {
  document.getElementById("list").innerHTML =
    `<div class="error">${err.message}</div>`;
});

// ==============================
// 🚪 LOGOUT
// ==============================

function logout() {
  localStorage.removeItem("token");
  window.location.href = "login.html";
}