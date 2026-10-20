/* ATLAS: opt-in-by-site-owner, cookie-free hosted visit counts. */
(function () {
  "use strict";

  const code = String(window.ATLAS_GOATCOUNTER_CODE || "").trim().toLowerCase();
  // GoatCounter account codes are public subdomains, never passwords or API keys.
  if (!/^[a-z0-9](?:[a-z0-9-]{0,62}[a-z0-9])?$/.test(code)) return;
  if (location.protocol === "file:" ||
      /^(localhost|127\.0\.0\.1|::1)$/.test(location.hostname)) return;

  const script = document.createElement("script");
  script.async = true;
  script.src = "https://gc.zgo.at/count.v5.js";
  script.crossOrigin = "anonymous";
  script.integrity = "sha384-atnOLvQb9t+jTSipvd75X2yginT4PjVbqDdlJAmxMm+wYElFmeR6EmLP5bYeoRVQ";
  script.dataset.goatcounter = "https://" + code + ".goatcounter.com/count";
  document.head.appendChild(script);

  // Keep the notice truthful and in the selected language if counting is enabled.
  const english = new URLSearchParams(window.location.search).get("lang") === "en" ||
    (document.documentElement.lang === "en" && !window.location.search.includes("lang=it"));
  const pill = document.getElementById("analytics-pill");
  if (pill) pill.textContent = english
    ? "Cookie-free aggregate statistics" : "Statistiche aggregate senza cookie";
  const note = document.getElementById("analytics-note");
  if (note) note.textContent = english
    ? "When viewed online, this page uses GoatCounter for privacy-friendly aggregate visit statistics without tracking cookies."
    : "Quando è online, questa pagina usa GoatCounter per statistiche aggregate delle visite senza cookie di tracciamento.";
})();
