(function () {
  "use strict";
  const baseQuestions = [...(window.AP2_TRAINER_QUESTIONS || []), ...(window.AP2_EXTRA_QUESTIONS || []), ...(window.AP2_EXPANDED_QUESTIONS || [])];
  const state = { area: null, queue: [], position: 0, current: null, deferredInstall: null };
  const areas = {
    administration: { title: "Konzeption & Administration", description: "IT-Systeme planen, betreiben und absichern" },
    netzwerk: { title: "Netzwerke analysieren & entwickeln", description: "Netze planen, konfigurieren und Fehler beheben" },
    wiso: { title: "Wirtschafts- & Sozialkunde", description: "Berufs- und Arbeitswelt beurteilen" }
  };
  const $ = (id) => document.getElementById(id);
  const normalize = (text) => text.toLocaleLowerCase("de-DE").normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/ß/g, "ss");
  const saved = (key, fallback) => { try { return JSON.parse(localStorage.getItem(key)) ?? fallback; } catch { return fallback; } };
  const setSaved = (key, value) => localStorage.setItem(key, JSON.stringify(value));
  const questions = () => [...baseQuestions, ...saved("ap2-custom-questions", [])];
  const progress = () => saved("ap2-progress", {});
  const currentId = () => state.current && state.current.id;

  function renderTopics() {
    const all = questions();
    $("topic-list").innerHTML = Object.entries(areas).map(([id, area]) => {
      const total = all.filter((question) => question.area === id).length;
      return `<button class="topic-button" type="button" data-area="${id}"><strong>${area.title}</strong><span>${area.description}</span><span class="count-badge">${total} Aufgaben</span></button>`;
    }).join("");
    document.querySelectorAll("[data-area]").forEach((button) => button.addEventListener("click", () => start(button.dataset.area)));
  }

  function renderMastery() {
    const entries = Object.values(progress());
    const possible = entries.reduce((sum, entry) => sum + entry.max, 0);
    const scored = entries.reduce((sum, entry) => sum + entry.points, 0);
    const percent = possible ? Math.round((scored / possible) * 100) : 0;
    $("mastery-value").textContent = percent;
    $("mastery-bar").style.width = `${percent}%`;
    $("mastery-detail").textContent = entries.length ? `${entries.length} Aufgaben korrigiert • ${scored} von ${possible} Punkten` : "Noch keine Antwort bewertet.";
  }

  function show(view) {
    document.querySelectorAll(".view").forEach((element) => element.classList.remove("active"));
    $(view).classList.add("active");
    $("nav-home").classList.toggle("active", view === "home-view");
  }

  function start(area) {
    state.area = area;
    state.queue = questions().filter((question) => !area || question.area === area).sort(() => Math.random() - 0.5);
    state.position = 0;
    if (!state.queue.length) return;
    openQuestion(state.queue[0]);
  }

  function startCatalog2025() {
    state.area = "catalog2025";
    state.queue = questions().filter((question) => question.focus2025).sort(() => Math.random() - 0.5);
    state.position = 0;
    if (state.queue.length) openQuestion(state.queue[0]);
  }

  function openQuestion(question) {
    state.current = question;
    $("question-meta").textContent = `${areas[question.area]?.title || "Eigene Aufgabe"}${question.focus2025 ? " • Katalog 2025" : ""}`;
    $("question-number").textContent = `${state.position + 1} von ${state.queue.length} • ${question.points} Punkte`;
    $("question-title").textContent = question.title;
    $("question-prompt").textContent = question.prompt;
    $("question-hint").textContent = question.hint || "";
    $("question-hint").classList.add("hidden");
    $("hint-button").classList.toggle("hidden", !question.hint);
    $("answer-input").value = "";
    $("feedback-card").className = "feedback-card hidden";
    $("solution-details").open = false;
    show("quiz-view");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function evaluate(revealOnly = false) {
    const question = state.current;
    const answer = normalize($("answer-input").value.trim());
    if (!answer && !revealOnly) { $("answer-input").focus(); return; }
    const matches = question.criteria.map((criterion) => ({ ...criterion, met: !revealOnly && criterion.terms.some((term) => answer.includes(normalize(term))) }));
    const achieved = matches.filter((criterion) => criterion.met).length;
    const points = Math.round((achieved / matches.length) * question.points * 2) / 2;
    const percentage = Math.round((points / question.points) * 100);
    const tone = percentage >= 75 ? "good" : percentage >= 40 ? "partial" : "low";
    const label = revealOnly ? "Lösung zum Lernen" : percentage >= 75 ? "Sehr solide" : percentage >= 40 ? "Teilweise richtig" : "Noch ausbaufähig";
    const message = revealOnly ? "Sieh dir die Kriterien, Musterlösung und Erklärung an. Beim nächsten Durchgang kannst du die Aufgabe erneut beantworten." : percentage >= 75 ? "Du deckst die wesentlichen Bewertungskriterien ab." : percentage >= 40 ? "Ein Teil der erwarteten Aspekte fehlt noch. Vergleiche deine Antwort mit der Erklärung." : "Wichtige erwartete Aspekte fehlen noch. Nutze die Musterlösung als Lernhilfe und versuche es danach erneut.";
    $("feedback-label").textContent = `${points} / ${question.points} Punkte`;
    $("feedback-title").textContent = label;
    $("feedback-summary").textContent = message;
    $("criteria-list").innerHTML = matches.map((criterion) => `<div class="criterion ${criterion.met ? "met" : "missed"}"><span class="mark">${criterion.met ? "✓" : "!"}</span><div><strong>${criterion.label}</strong><small>${criterion.met ? "In deiner Antwort erkannt" : "In deiner Antwort nicht erkannt"}</small></div></div>`).join("");
    $("model-answer").textContent = question.model;
    $("solution-details").open = revealOnly;
    $("feedback-card").className = `feedback-card ${tone}`;
    const allProgress = progress();
    allProgress[question.id] = { points, max: question.points, updatedAt: new Date().toISOString() };
    setSaved("ap2-progress", allProgress);
    renderMastery();
    $("feedback-card").scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function next() {
    state.position = (state.position + 1) % state.queue.length;
    openQuestion(state.queue[state.position]);
  }

  function validQuestion(question) {
    return question && typeof question.id === "string" && typeof question.title === "string" && typeof question.prompt === "string" && typeof question.model === "string" && typeof question.points === "number" && Array.isArray(question.criteria) && question.criteria.every((criterion) => typeof criterion.label === "string" && Array.isArray(criterion.terms));
  }

  async function importQuestions(file) {
    const status = $("import-status");
    try {
      const parsed = JSON.parse(await file.text());
      const incoming = Array.isArray(parsed) ? parsed : parsed.questions;
      if (!Array.isArray(incoming) || incoming.some((question) => !validQuestion(question))) throw new Error("Das Format enthält keine gültigen Aufgaben.");
      const sanitized = incoming.map((question) => ({ ...question, area: areas[question.area] ? question.area : "administration" }));
      const existing = saved("ap2-custom-questions", []);
      const byId = new Map(existing.map((question) => [question.id, question]));
      sanitized.forEach((question) => byId.set(question.id, question));
      setSaved("ap2-custom-questions", [...byId.values()]);
      status.textContent = `${sanitized.length} Aufgaben importiert.`;
      renderTopics();
    } catch (error) { status.textContent = `Import fehlgeschlagen: ${error.message}`; }
  }

  function exportData() {
    const blob = new Blob([JSON.stringify({ questions: saved("ap2-custom-questions", []), progress: progress() }, null, 2)], { type: "application/json" });
    const link = document.createElement("a"); link.href = URL.createObjectURL(blob); link.download = "ap2-trainer-meine-daten.json"; link.click(); URL.revokeObjectURL(link.href);
  }

  $("check-button").addEventListener("click", evaluate);
  $("reveal-button").addEventListener("click", () => evaluate(true));
  $("next-button").addEventListener("click", next);
  $("retry-button").addEventListener("click", () => { $("feedback-card").classList.add("hidden"); $("answer-input").focus(); });
  $("back-button").addEventListener("click", () => { renderTopics(); renderMastery(); show("home-view"); });
  $("hint-button").addEventListener("click", () => $("question-hint").classList.toggle("hidden"));
  $("nav-home").addEventListener("click", () => { renderTopics(); renderMastery(); show("home-view"); });
  $("nav-random").addEventListener("click", () => start(null));
  $("catalog-2025-button").addEventListener("click", startCatalog2025);
  $("reset-progress").addEventListener("click", () => { if (confirm("Fortschritt wirklich zurücksetzen?")) { localStorage.removeItem("ap2-progress"); renderMastery(); } });
  $("import-file").addEventListener("change", (event) => event.target.files[0] && importQuestions(event.target.files[0]));
  $("export-button").addEventListener("click", exportData);
  window.addEventListener("beforeinstallprompt", (event) => { event.preventDefault(); state.deferredInstall = event; $("install-button").classList.remove("hidden"); });
  $("install-button").addEventListener("click", async () => { if (!state.deferredInstall) return; await state.deferredInstall.prompt(); state.deferredInstall = null; $("install-button").classList.add("hidden"); });
  if ("serviceWorker" in navigator) navigator.serviceWorker.register("sw.js");
  renderTopics(); renderMastery();
})();
