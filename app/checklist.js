let crewSignaturePad = null;
let trainerSignaturePad = null;
let stationBands = [];
const APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxILS9dIusJWQs7WyT8z3cxMB-FvuUSnt9KUXyyRPih_ZganFxrCCATGdybs_aLTMCbRw/exec";
console.log("checklist.js loaded ✅");

function getLang() {
  const params = new URLSearchParams(window.location.search);
  return params.get("lang") === "en" ? "en" : "ar";
}

function t(obj, lang) {
  if (!obj) return "";
  if (typeof obj === "string") return obj;
  return obj[lang] || obj.ar || obj.en || "";
}


const UI = {
  ar: {
    pageTitle: "توثيق المحطة",
    back: " رجوع للرئيسية",
    badge: "Junior’s Training Department",
    subtitle: "نموذج توثيق المحطة",
    verificationData: "بيانات التوثيق",
    crewName: "اسم المتدرب",
    trainerName: "اسم المدرب",
    date: "التاريخ",
    checklistItems: "بنود التحقق",
    hint: "حدد السبب أدناه إذا لم يتحقق البند.",
    finalResult: "النتيجة النهائية",
    totalQ: "إجمالي البنود",
    correctA: "عدد البنود المحققة",
    score: "النتيجة",
    band: "قرار التوثيق",
    feedback: "ملاحظات",
    verified: "موثق؟",
    choose: "اختر",
    yes: "نعم",
    no: "لا",
    emailTo: "إرسال إلى",
    selectStore: "اختر الفرع",
    queenRania: "Queen Rania",
    marka: "Marka",
    corridorAbdoun: "Corridor Abdoun",
    meccaSt: "Mecca.st",
    trainingDept: "Training Department",
    traineeSig: "توقيع المتدرب",
    trainerSig: "توقيع المدرب",
    clearSig: "مسح التوقيع",
    emailBtn: "إرسال بالبريد",
    printBtn: "طباعة PDF",
    resetBtn: "إعادة ضبط",
    correct: "متحقق",
    incorrect: "غير متحقق",
    chooseReason: "اختر السبب",
    chooseEmailFirst: "اختر البريد المستلم أولاً",
    sending: "جاري الإرسال...",
    sendSuccess: "✅ تم إرسال البريد بنجاح",
    sendFail: "❌ فشل الإرسال: ",
    sendFailDetails: "❌ فشل الإرسال (تفاصيل): ",
    emailBody: "يرجى الاطلاع على قائمة التحقق المرفقة.",
    traineeLabel: "المتدرب",
    trainerLabel: "المدرب",
    dateLabel: "التاريخ",
    scoreLabel: "النتيجة",
    stationNotFound: "لم يتم العثور على ملف المحطة: ",
    stationNotSpecified: "لم يتم تحديد المحطة في الرابط."
  },
  en: {
    pageTitle: "Verification Checklist",
    back: " Back to Home",
    badge: "Junior’s Training Department",
    subtitle: "Trainee Station Verification Checklist",
    verificationData: "Verification Details",
    crewName: "Trainee Name",
    trainerName: "Trainer Name",
    date: "Date",
    checklistItems: "Checklist Items",
    hint: "Choose the reason below if the point is not achieved.",
    finalResult: "Final Result",
    totalQ: "Total Items",
    correctA: "Achieved Items",
    score: "Score",
    band: "Certification Decision",
    feedback: "Feedback",
    verified: "Verified?",
    choose: "Select",
    yes: "Yes",
    no: "No",
    emailTo: "Send To",
    selectStore: "Select your Store",
    queenRania: "Queen Rania",
    marka: "Marka",
    corridorAbdoun: "Corridor Abdoun",
    meccaSt: "Mecca.st",
    trainingDept: "Training Department",
    traineeSig: "Trainee Signature",
    trainerSig: "Trainer Signature",
    clearSig: "Clear Signature",
    emailBtn: "Send by Email",
    printBtn: "Export PDF",
    resetBtn: "Reset",
    correct: "Correct",
    incorrect: "Not Correct",
    chooseReason: "Select Reason",
    chooseEmailFirst: "Please select the recipient email first",
    sending: "Sending...",
    sendSuccess: "✅ Email sent successfully",
    sendFail: "❌ Sending failed: ",
    sendFailDetails: "❌ Sending failed (details): ",
    emailBody: "Please find the attached completed checklist.",
    traineeLabel: "Trainee",
    trainerLabel: "Trainer",
    dateLabel: "Date",
    scoreLabel: "Score",
    stationNotFound: "Station file not found: ",
    stationNotSpecified: "No station was specified in the URL."
  }
};


function applyStaticUI() {
  const lang = getLang();
  const ui = UI[lang];

  document.documentElement.lang = lang;
  document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
  document.body.classList.toggle("lang-en", lang === "en");
  document.body.classList.toggle("lang-ar", lang === "ar");

  document.getElementById("pageTitle").textContent = ui.pageTitle;
  document.getElementById("backLink").textContent = ui.back;
  document.getElementById("paperBadge").textContent = ui.badge;
  document.getElementById("paperSubtitle").textContent = ui.subtitle;

  document.getElementById("sectionVerificationData").textContent = ui.verificationData;
  document.getElementById("labelCrewName").textContent = ui.crewName;
  document.getElementById("labelTrainerName").textContent = ui.trainerName;
  document.getElementById("labelDate").textContent = ui.date;

  document.getElementById("sectionChecklistItems").textContent = ui.checklistItems;
  document.getElementById("hintText").textContent = ui.hint;

  document.getElementById("sectionFinalResult").textContent = ui.finalResult;
  document.getElementById("labelTotalQ").textContent = ui.totalQ;
  document.getElementById("labelCorrectA").textContent = ui.correctA;
  document.getElementById("labelScoreText").textContent = ui.score;
  document.getElementById("labelBandText").textContent = ui.band;
  document.getElementById("labelFeedback").textContent = ui.feedback;
  document.getElementById("labelVerified").textContent = ui.verified;

  document.getElementById("verifiedOptionChoose").textContent = ui.choose;
  document.getElementById("verifiedOptionYes").textContent = ui.yes;
  document.getElementById("verifiedOptionNo").textContent = ui.no;

  document.getElementById("labelEmailTo").textContent = ui.emailTo;
  document.getElementById("emailDefaultOption").textContent = ui.selectStore;
  document.getElementById("storeQueenRania").textContent = ui.queenRania;
  document.getElementById("storeMarka").textContent = ui.marka;
  document.getElementById("storeCorridorAbdoun").textContent = ui.corridorAbdoun;
  document.getElementById("storeMeccaSt").textContent = ui.meccaSt;
  document.getElementById("storeTrainingDept").textContent = ui.trainingDept;

  document.getElementById("sigCrewTitle").textContent = ui.traineeSig;
  document.getElementById("sigTrainerTitle").textContent = ui.trainerSig;
  document.getElementById("btnClearCrewSig").textContent = ui.clearSig;
  document.getElementById("btnClearTrainerSig").textContent = ui.clearSig;

  document.getElementById("btnEmail").textContent = ui.emailBtn;
  document.getElementById("btnPrint").textContent = ui.printBtn;
  document.getElementById("btnReset").textContent = ui.resetBtn;
}










function resizeCanvasToCssSize(canvas) {
  // Make the canvas resolution match its CSS size (crisp signature)
  const ratio = Math.max(window.devicePixelRatio || 1, 1);
  const rect = canvas.getBoundingClientRect();

  canvas.width = Math.floor(rect.width * ratio);
  canvas.height = Math.floor(rect.height * ratio);

  const ctx = canvas.getContext("2d");
  ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
}




function initSignatures() {
  const crewCanvas = document.getElementById("crewSignature");
  const trainerCanvas = document.getElementById("trainerSignature");

  // Resize before creating pads
  resizeCanvasToCssSize(crewCanvas);
  resizeCanvasToCssSize(trainerCanvas);

  crewSignaturePad = new SignaturePad(crewCanvas);
  trainerSignaturePad = new SignaturePad(trainerCanvas);

  document.getElementById("btnClearCrewSig").addEventListener("click", () => {
    crewSignaturePad.clear();
  });

  document.getElementById("btnClearTrainerSig").addEventListener("click", () => {
    trainerSignaturePad.clear();
  });

  // If window resizes, keep canvas aligned (optional)
  window.addEventListener("resize", () => {
    // IMPORTANT: resizing clears drawings, so we only resize if empty
    if (crewSignaturePad && crewSignaturePad.isEmpty()) resizeCanvasToCssSize(crewCanvas);
    if (trainerSignaturePad && trainerSignaturePad.isEmpty()) resizeCanvasToCssSize(trainerCanvas);
  });
}

function getStationId() {
  const p = new URLSearchParams(location.search);
  return p.get("station");
}

function setCurrentDateTimeNoSeconds() {
  const now = new Date();
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric"
  };
  // English locale
  document.getElementById("dayDate").value = now.toLocaleString("en-US", options);
}

async function loadStation(stationId) {
  const lang = getLang();
  const ui = UI[lang];

  const res = await fetch(`data/${stationId}.json`);
  if (!res.ok) throw new Error(ui.stationNotFound + stationId);
  return res.json();
}



function renderQuestions(items) {
  const wrap = document.getElementById("questions");
  const lang = getLang();
  const ui = UI[lang];

  wrap.innerHTML = items.map((item, i) => {
    const text = typeof item === "string" ? item : t(item.text, lang);
    const reasons = Array.isArray(item.reasons) ? item.reasons : [];

    return `
      <div class="q" data-index="${i}">
        <div class="q-text"><span class="q-num">${i + 1}.</span>${text}</div>
        <div class="q-checks">
          <label><input type="checkbox" class="ok"> ${ui.correct}</label>
          <label><input type="checkbox" class="no"> ${ui.incorrect}</label>
        </div>
      </div>

      <div class="reason" data-reason="${i}" style="display:none;">
        <select class="reason-select">
          <option value="">${ui.chooseReason}</option>
          ${reasons.map(r => `<option value="${t(r, lang)}">${t(r, lang)}</option>`).join("")}
        </select>
      </div>
    `;
  }).join("");

  const rows = wrap.querySelectorAll(".q");

  rows.forEach(row => {
    const i = row.getAttribute("data-index");
    const ok = row.querySelector(".ok");
    const no = row.querySelector(".no");
    const reasonBox = wrap.querySelector(`.reason[data-reason="${i}"]`);
    const reasonSelect = reasonBox.querySelector(".reason-select");

    ok.addEventListener("change", () => {
      if (ok.checked) no.checked = false;
      reasonBox.style.display = "none";
      reasonSelect.value = "";
      updateScore();
    });

    no.addEventListener("change", () => {
      if (no.checked) ok.checked = false;
      reasonBox.style.display = no.checked ? "block" : "none";
      updateScore();
    });
  });

  updateScore();
}






function findBandText(score) {
  const lang = getLang();
  for (const b of stationBands) {
    if (score >= b.min && score <= b.max) return t(b.text, lang);
  }
  return "";
}

function updateScore() {
  const rows = document.querySelectorAll("#questions .q");
  const total = rows.length;
  let correct = 0;

  rows.forEach(r => {
    if (r.querySelector(".ok").checked) correct++;
  });

  document.getElementById("totalQ").value = total;
  document.getElementById("correctA").value = correct;
  document.getElementById("scoreText").value = `\u202A${correct} / ${total}\u202C`;

  // ✅ Certification decision text from JSON bands
  const bandTextEl = document.getElementById("bandText");
  if (bandTextEl) bandTextEl.value = findBandText(correct);
}

function resetAll() {
  document.querySelectorAll("input, textarea, select").forEach(el => {
    if (el.id === "dayDate") return;

    if (el.type === "checkbox") {
      el.checked = false;
    } else {
      el.value = "";
    }
  });

  if (crewSignaturePad) crewSignaturePad.clear();
  if (trainerSignaturePad) trainerSignaturePad.clear();

  document.querySelectorAll(".reason").forEach(r => {
    r.style.display = "none";
    const select = r.querySelector(".reason-select");
    if (select) select.value = "";
  });

  updateScore();
  setCurrentDateTimeNoSeconds();
}

async function main() {
  const lang = getLang();
  document.documentElement.lang = lang;
  document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
  const ui = UI[lang];
  const stationId = getStationId();

  applyStaticUI();

  if (!stationId) throw new Error(ui.stationNotSpecified);

  setCurrentDateTimeNoSeconds();

  const data = await loadStation(stationId);

  stationBands = Array.isArray(data.bands) ? data.bands : [];

  document.getElementById("stationTitle").textContent = t(data.title, lang);

  renderQuestions(data.items || []);
  initSignatures();

  document.getElementById("btnPrint").addEventListener("click", () => window.print());
  document.getElementById("btnReset").addEventListener("click", resetAll);
  document.getElementById("btnEmail").addEventListener("click", sendPdfByEmail);

const email = getEmailFromUser();
const emailInput = document.getElementById("storeEmail");

if (email && emailInput) {
  emailInput.value = email; // pre-fill email if we can determine it

}

main().catch(err => {
  document.getElementById("paper").innerHTML = `<div class="error">${err.message}</div>`;
});



async function generatePdfBase64() {
  const element = document.getElementById("paper");

  // Generate PDF as data URI
  const dataUri = await html2pdf()
    .set({
      margin: 10,
      image: { type: "jpeg", quality: 0.95 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "mm", format: "a4", orientation: "portrait" }
    })
    .from(element)
    .outputPdf("datauristring");

  // data:application/pdf;base64,XXXX
  return dataUri.split(",")[1];
}

function safeFileName(text) {
  return String(text || "")
    .replace(/[^\w\u0600-\u06FF\-\.]+/g, "_")
    .slice(0, 80);
}

let lastSendTime = 0;

async function sendPdfByEmail() {

  const lang = getLang();
  const ui = UI[lang];

  const to = getEmailFromUser();
  if (!to) {
    alert("❌ Unable to determine store email");

  const crew = document.getElementById("crewName")?.value || "";
  const trainer = document.getElementById("trainerName")?.value || "";

  // ✅ INPUT VALIDATION
  if (crew.length < 2) {
    alert("Enter valid trainee name");
    return;
  }

  if (trainer.length < 2) {
    alert("Enter valid trainer name");
    return;
  }

  // ✅ SIGNATURE VALIDATION
  if (crewSignaturePad?.isEmpty() || trainerSignaturePad?.isEmpty()) {
    alert("Please sign before sending");
    return;
  }

  // ✅ ANTI-SPAM (10 seconds)
  const now = Date.now();
  if (now - lastSendTime < 10000) {
    alert("Please wait before sending again");
    return;
  }
  lastSendTime = now;

  const btn = document.getElementById("btnEmail");
  const oldText = btn ? btn.textContent : "";
  if (btn) {
    btn.textContent = ui.sending;
    btn.disabled = true;
  }

  try {

    // ✅ GENERATE PDF AFTER VALIDATION
    const pdfBase64 = await generatePdfBase64();

    const dayDate = document.getElementById("dayDate")?.value || "";
    const score = document.getElementById("scoreText")?.value || "";
    const stationTitle = document.getElementById("stationTitle")?.textContent || "Checklist";

    const subject = `SVC - ${stationTitle} - ${crew} - ${dayDate}`;

    const body =
`${ui.emailBody}

${ui.traineeLabel}: ${crew}
${ui.trainerLabel}: ${trainer}
${ui.dateLabel}: ${dayDate}
${ui.scoreLabel}: ${score}
`;

    const form = new URLSearchParams();
    form.append("to", to);
    form.append("subject", subject);
    form.append("body", body);

    const filename = safeFileName(`SVC_${stationTitle}_${crew}_${dayDate}`) + ".pdf";

    form.append("filename", filename);
    form.append("pdfBase64", pdfBase64);

    const res = await fetch(APPS_SCRIPT_URL, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8" },
      body: form.toString()
    });

    const text = await res.text();
    console.log("Response:", text);

    let json;
    try {
      json = JSON.parse(text);
    } catch {
      alert("❌ Server response error");
      return;
    }

    if (json.ok) {
      alert(ui.sendSuccess);
    } else {
      alert(ui.sendFail + (json.error || "Unknown error"));
    }

  } catch (e) {
    console.error("Send error:", e);
    alert(ui.sendFailDetails + (e?.message || String(e)));
  } finally {
    if (btn) {
      btn.textContent = oldText;
      btn.disabled = false;
    }
  }
}

// ==============================
// 🚪 LOGOUT
// ============================== 

function logout() {
  localStorage.removeItem("token");
  window.location.href = "login.html";
}



function getEmailFromUser() {
  const username = localStorage.getItem("username");

  // decide email based on username 

  if (username.startsWith("974")) { 
    return username + "@juniors.com.qa"; // QA
  } else if (username.startsWith("962")) {
    return username + "@juniorsjordan.com"; // JO
  }

  return null; // unknown format
}