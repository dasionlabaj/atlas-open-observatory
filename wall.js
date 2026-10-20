/* ATLAS Living Wall 0.2: public, bilingual IT/EN, with no cookies or login. */
(() => {
  "use strict";
  const $ = id => document.getElementById(id);
  const requested = new URLSearchParams(window.location.search).get("lang");
  const lang = requested === "en" ? "en" : "it";
  const locale = lang === "en" ? "en-GB" : "it-IT";

  // Only the visible interface lives here. Full chapter translations
  // are maintained separately in wall.json (IT) and wall.en.json (EN).
  const translations = {
    it: {
      pageTitle:"ATLAS — La tavolozza viva",
      description:"ATLAS: un diario interattivo di idee, capitoli e percorsi di lettura. Un quadro che cresce, una domanda alla volta.",
      navLabel:"Navigazione principale",
      brand:"◈ ATLAS / TAVOLOZZA VIVA",
      originalArchiveLink:"Observatory originale",
      repositoryLink:"Codice e versioni ↗",
      eyebrow:"Un libro aperto · un quadro in evoluzione",
      heroOne:"Ogni idea apre", heroTwo:"una nuova strada.",
      heroText:"ATLAS è un luogo dove tornare: una conversazione trasformata in capitoli, domande e percorsi che si collegano. Entra da dove preferisci. Il quadro non richiede un finale.",
      metaOne:"Una nuova pagina alla volta",
      metaTwo:"Dasion × ChatGPT · collaborazione editoriale",
      noTracking:"Nessun tracciamento",
      howTitle:"Come funziona il quadro?",
      howText:"Le pubblicazioni sono in ordine cronologico. Puoi leggere un capitolo, esplorarne i bivi e consultare l'archivio da cui nasce. Ogni aggiornamento viene conservato come parte della storia del progetto.",
      tabLabel:"Scegli una sezione",
      news:"Novità", trails:"Percorsi", archive:"Archivio", refresh:"↻ Aggiorna",
      loadingEdition:"Sto preparando l'ultima edizione…",
      searchPlaceholder:"Cerca tra capitoli e domande…",
      searchLabel:"Cerca negli aggiornamenti",
      filterLabel:"Filtra le pubblicazioni",
      allCategories:"Tutte le categorie",
      diary:"Diario", method:"Metodo",
      loadingFeed:"Caricamento del diario…",
      trailsTitle:"Scegli il filo da seguire",
      trailsDescription:"Tre strade per orientarsi tra le idee. Puoi tornare e cambiarle quando vuoi.",
      archiveTitle:"L'archivio originale",
      archiveText:"La prima versione dell'Open Observatory contiene otto idee organizzate per categoria, ciascuna con una domanda e un limite dichiarato. La conserviamo integralmente come prima tappa della nostra storia.",
      archiveCta:"Apri le prime otto idee ↗",
      archiveNote:"Le nuove pubblicazioni si aggiungono al diario; il materiale precedente resta navigabile.",
      footerHeading:"ATLAS — La tavolozza viva 0.1",
      footerText:"Un progetto ideato da Dasion, sviluppato in dialogo con ChatGPT. L'IA collabora alla scrittura e alla struttura, ma non è una persona che pubblica autonomamente. Le idee speculative e le metafore non sono prove scientifiche, né messaggi indirizzati a un lettore specifico.",
      privacy:"Il diario non utilizza cookie di tracciamento. Le statistiche aggregate sono disattivate finché non viene configurato un servizio dedicato.",
      read:"Leggi il capitolo ↓", close:"Chiudi il capitolo ↑", follow:"Segui un bivio",
      more:"Approfondisci", noResults:"Nessun aggiornamento trovato. Prova un'altra ricerca.",
      singular:" pubblicazione", plural:" pubblicazioni",
      loadingLatest:"Cerco gli ultimi aggiornamenti…",
      updated:"Edizione aggiornata il ",
      ready:"Quadro aggiornato. ", available:" pubblicazioni disponibili.",
      error:"Non riesco a caricare il diario. Controlla la connessione e riprova. Per l'anteprima locale avvia un piccolo server HTTP.",
      unavailable:"Diario temporaneamente non disponibile.",
      visitsConfigured:"Statistiche aggregate senza cookie"
    },
    en: {
      pageTitle:"ATLAS — The Living Canvas",
      description:"ATLAS: an interactive journal of ideas, chapters and reading trails. A living canvas that grows one question at a time.",
      navLabel:"Main navigation",
      brand:"◈ ATLAS / LIVING CANVAS",
      originalArchiveLink:"Original Observatory",
      repositoryLink:"Code and versions ↗",
      eyebrow:"An open book · an evolving canvas",
      heroOne:"Every idea opens",heroTwo:"a new path.",
      heroText:"ATLAS is a place to return to: a conversation transformed into chapters, questions and interconnected paths. Start wherever you like. This canvas doesn't demand an ending.",
      metaOne:"One new page at a time",
      metaTwo:"Dasion × ChatGPT · editorial collaboration",
      noTracking:"No tracking",
      howTitle:"How does the canvas work?",
      howText:"Posts appear in chronological order. Open a chapter, follow its branching paths, and explore the archive it grew from. Every update is preserved as part of the project's story.",
      tabLabel:"Choose a section",
      news:"What's new",trails:"Paths",archive:"Archive",refresh:"↻ Refresh",
      loadingEdition:"Preparing the latest edition…",
      searchPlaceholder:"Search chapters and questions…",
      searchLabel:"Search updates",
      filterLabel:"Filter posts",
      allCategories:"All categories",
      diary:"Journal",method:"Method",
      loadingFeed:"Loading the journal…",
      trailsTitle:"Choose a thread to follow",
      trailsDescription:"Three ways to navigate the ideas. You can always return and take a different path.",
      archiveTitle:"The original archive",
      archiveText:"The first Open Observatory edition holds eight ideas grouped by category, each with its own question and a clear statement of limits. We preserve it as the starting point of this story.",
      archiveCta:"Explore the first eight ideas ↗",
      archiveNote:"New posts join the journal; previous material stays available to explore.",
      footerHeading:"ATLAS — The Living Canvas 0.1",
      footerText:"An initiative conceived by Dasion and developed in dialogue with ChatGPT. AI assists with writing and structure; it is not a person publishing independently. Speculative ideas and metaphors are not scientific evidence or messages directed at any particular reader.",
      privacy:"The journal uses no tracking cookies. Aggregate analytics are disabled until a dedicated service is configured.",
      read:"Read chapter ↓",close:"Close chapter ↑",follow:"Follow a branch",
      more:"Explore further",noResults:"No matching updates. Try another search.",
      singular:" post",plural:" posts",
      loadingLatest:"Checking for updates…",
      updated:"Edition updated ",
      ready:"Canvas updated. ",available:" posts available.",
      error:"Couldn't load the journal. Check your connection and try again. For a local preview, start a small HTTP server.",
      unavailable:"The journal is temporarily unavailable.",
      visitsConfigured:"Cookie-free aggregate analytics"
    }
  };
  const T = translations[lang];
  const categories = {"Diario":T.diary,"Metodo":T.method,"Archivio":T.archive};
  const feed = $("feed"), paths = $("paths"), search = $("search"), filter = $("filter");
  const notice = $("load-status"), dateLabel = $("last-update"), refresh = $("refresh");
  let data = null;

  function localizeInterface() {
    document.documentElement.lang = lang;
    document.title = T.pageTitle;
    const description = document.querySelector('meta[name="description"]');
    if (description) description.content = T.description;
    for (const node of document.querySelectorAll("[data-i18n]")) {
      const value = T[node.dataset.i18n];
      if (value !== undefined) node.textContent = value;
    }
    for (const node of document.querySelectorAll("[data-i18n-placeholder]")) {
      const value = T[node.dataset.i18nPlaceholder];
      if (value !== undefined) node.setAttribute("placeholder", value);
    }
    for (const node of document.querySelectorAll("[data-i18n-aria]")) {
      const value = T[node.dataset.i18nAria];
      if (value !== undefined) node.setAttribute("aria-label", value);
    }
    for (const code of ["it","en"]) {
      const link = $("language-" + code);
      if (!link) continue;
      link.href = "?lang=" + code + (window.location.hash || "");
      if (code === lang) link.setAttribute("aria-current", "page");
      else link.removeAttribute("aria-current");
    }
  }
  function el(tag, className, value) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (value !== undefined) node.textContent = String(value);
    return node;
  }
  function safeLink(href) {
    return /^(?:observatory\.html(?:#A0[1-8])?|#n[0-9]{3})$/.test(href || "");
  }
  function createLinks(links) {
    const list = el("div","links");
    for (const link of Array.isArray(links) ? links : []) {
      if (!safeLink(link.href)) continue;
      const a = el("a","",link.text || T.more);
      a.href = link.href;
      if (link.href.startsWith("#")) a.addEventListener("click", () => selectTab("novita"));
      list.appendChild(a);
    }
    return list;
  }
  function formatDate(value) {
    const d = new Date(String(value) + "T12:00:00");
    return Number.isNaN(d.getTime()) ? String(value) :
      new Intl.DateTimeFormat(locale, {day:"numeric",month:"long",year:"numeric"}).format(d);
  }
  function selectTab(which) {
    document.querySelectorAll('[role="tab"][data-tab]').forEach(tab => {
      const active = tab.dataset.tab === which;
      tab.setAttribute("aria-selected", String(active));
      tab.tabIndex = active ? 0 : -1;
      const target = $(tab.getAttribute("aria-controls"));
      if (target) target.hidden = !active;
    });
  }
  document.querySelectorAll('[role="tab"][data-tab]').forEach(tab =>
    tab.addEventListener("click", () => selectTab(tab.dataset.tab))
  );
  function postCard(post) {
    const card = el("article","post");
    card.id = post.id;
    const headingId = "heading-" + post.id;
    card.setAttribute("aria-labelledby", headingId);
    card.appendChild(el("div","kicker",formatDate(post.date)+" · "+(categories[post.tag]||post.tag)));
    const h = el("h2","",post.title);
    h.id = headingId;
    card.appendChild(h);
    card.appendChild(el("p","lead",post.lead));
    const button = el("button","read",T.read);
    button.type = "button";
    button.setAttribute("aria-expanded","false");
    button.setAttribute("aria-controls","body-"+post.id);
    card.appendChild(button);
    const body = el("div","body");
    body.id = "body-"+post.id;
    body.hidden = true;
    for (const p of Array.isArray(post.paragraphs) ? post.paragraphs : []) {
      body.appendChild(el("p","",p));
    }
    if (Array.isArray(post.links) && post.links.length) {
      body.appendChild(el("h3","",T.follow));
      body.appendChild(createLinks(post.links));
    }
    button.addEventListener("click", () => {
      const opening = body.hidden;
      body.hidden = !opening;
      button.setAttribute("aria-expanded",String(opening));
      button.textContent = opening ? T.close : T.read;
    });
    card.appendChild(body);
    return card;
  }
  function showFeed() {
    if (!data) return;
    const q = search.value.trim().toLocaleLowerCase(locale);
    const group = filter.value;
    const posts = data.posts.filter(p =>
      (group === "Tutti" || p.tag === group) &&
      [p.title,p.lead,...(p.paragraphs||[])].join(" ").toLocaleLowerCase(locale).includes(q)
    );
    feed.replaceChildren();
    for (const post of posts) feed.appendChild(postCard(post));
    if (!posts.length) feed.appendChild(el("p","emptystate",T.noResults));
    $("post-count").textContent = posts.length + (posts.length === 1 ? T.singular : T.plural);
  }
  function showPaths() {
    if (!data) return;
    paths.replaceChildren();
    for (const trail of data.trails) {
      const box = el("article","trail");
      box.appendChild(el("h3","",trail.name));
      box.appendChild(el("p","",trail.description));
      const ol = el("ol");
      for (const link of Array.isArray(trail.links) ? trail.links : []) {
        if (!safeLink(link.href)) continue;
        const li = el("li"), a = el("a","",link.text);
        a.href = link.href;
        if (link.href.startsWith("#")) a.addEventListener("click", () => selectTab("novita"));
        li.appendChild(a);ol.appendChild(li);
      }
      box.appendChild(ol);paths.appendChild(box);
    }
  }
  function openAnchor() {
    if (!/^#n[0-9]{3}$/.test(window.location.hash)) return;
    selectTab("novita");
    const target = $(window.location.hash.slice(1));
    if (!target) return;
    const button = target.querySelector("button.read");
    if (button && button.getAttribute("aria-expanded")==="false") button.click();
    target.scrollIntoView({behavior:"auto",block:"start"});
  }
  async function load() {
    refresh.disabled = true;
    notice.textContent = T.loadingLatest;
    try {
      const file = lang==="en" ? "wall.en.json" : "wall.json";
      const response = await fetch("./"+file+"?v="+Date.now(),{cache:"no-store"});
      if (!response.ok) throw new Error("HTTP "+response.status);
      const received = await response.json();
      if (!received || !Array.isArray(received.posts) || !Array.isArray(received.trails)) {
        throw new Error("Invalid journal data");
      }
      data = received;
      showFeed();showPaths();
      dateLabel.textContent = T.updated + formatDate(data.updated);
      notice.textContent = T.ready + data.posts.length + T.available;
      openAnchor();
    } catch (error) {
      notice.textContent = T.error;
      if (!data) feed.replaceChildren(el("p","emptystate",T.unavailable));
    } finally {
      refresh.disabled = false;
    }
  }
  localizeInterface();
  search.addEventListener("input",showFeed);
  filter.addEventListener("change",showFeed);
  refresh.addEventListener("click",load);
  window.addEventListener("hashchange",openAnchor);
  load();
})();
