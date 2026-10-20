/* ATLAS Living Wall 0.1 — no accounts, cookies or external UI libraries. */
(() => {
  "use strict";
  const $ = id => document.getElementById(id);
  const feed = $("feed");
  const paths = $("paths");
  const search = $("search");
  const filter = $("filter");
  const notice = $("load-status");
  const dateLabel = $("last-update");
  const refresh = $("refresh");
  let data = null;

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
    const list = el("div", "links");
    for (const link of Array.isArray(links) ? links : []) {
      if (!safeLink(link.href)) continue;
      const a = el("a", "", link.text || "Approfondisci");
      a.href = link.href;
      if (link.href.startsWith("#")) {
        a.addEventListener("click", () => selectTab("novita"));
      }
      list.appendChild(a);
    }
    return list;
  }
  function formatDate(value) {
    const d = new Date(String(value) + "T12:00:00");
    return Number.isNaN(d.getTime()) ? String(value) :
      new Intl.DateTimeFormat("it-IT", { day:"numeric", month:"long", year:"numeric" }).format(d);
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
  document.querySelectorAll('[role="tab"][data-tab]').forEach(tab => {
    tab.addEventListener("click", () => selectTab(tab.dataset.tab));
  });

  function postCard(post) {
    const card = el("article", "post");
    card.id = post.id;
    const headingId = "heading-" + post.id;
    card.setAttribute("aria-labelledby", headingId);
    card.appendChild(el("div", "kicker", formatDate(post.date) + " · " + post.tag));
    const h = el("h2", "", post.title);
    h.id = headingId;
    card.appendChild(h);
    card.appendChild(el("p", "lead", post.lead));

    const button = el("button", "read", "Leggi il capitolo ↓");
    button.type = "button";
    button.setAttribute("aria-expanded", "false");
    button.setAttribute("aria-controls", "body-" + post.id);
    card.appendChild(button);
    const body = el("div", "body");
    body.id = "body-" + post.id;
    body.hidden = true;
    for (const p of Array.isArray(post.paragraphs) ? post.paragraphs : []) {
      body.appendChild(el("p", "", p));
    }
    if (Array.isArray(post.links) && post.links.length) {
      body.appendChild(el("h3", "", "Segui un bivio"));
      body.appendChild(createLinks(post.links));
    }
    button.addEventListener("click", () => {
      const opening = body.hidden;
      body.hidden = !opening;
      button.setAttribute("aria-expanded", String(opening));
      button.textContent = opening ? "Chiudi il capitolo ↑" : "Leggi il capitolo ↓";
    });
    card.appendChild(body);
    return card;
  }
  function showFeed() {
    if (!data) return;
    const q = search.value.trim().toLocaleLowerCase("it");
    const group = filter.value;
    const posts = (data.posts || []).filter(p =>
      (group === "Tutti" || p.tag === group) &&
      [p.title, p.lead, ...(p.paragraphs || [])].join(" ").toLocaleLowerCase("it").includes(q)
    );
    feed.replaceChildren();
    for (const post of posts) feed.appendChild(postCard(post));
    if (!posts.length) feed.appendChild(el("p", "emptystate", "Nessun aggiornamento trovato. Prova un'altra ricerca."));
    $("post-count").textContent = posts.length + (posts.length === 1 ? " pubblicazione" : " pubblicazioni");
  }
  function showPaths() {
    if (!data) return;
    paths.replaceChildren();
    for (const trail of Array.isArray(data.trails) ? data.trails : []) {
      const box = el("article", "trail");
      box.appendChild(el("h3", "", trail.name));
      box.appendChild(el("p", "", trail.description));
      const ol = el("ol");
      for (const link of Array.isArray(trail.links) ? trail.links : []) {
        if (!safeLink(link.href)) continue;
        const li = el("li");
        const a = el("a", "", link.text);
        a.href = link.href;
        if (link.href.startsWith("#")) a.addEventListener("click", () => selectTab("novita"));
        li.appendChild(a);
        ol.appendChild(li);
      }
      box.appendChild(ol);
      paths.appendChild(box);
    }
  }
  async function load() {
    refresh.disabled = true;
    notice.textContent = "Cerco gli ultimi aggiornamenti…";
    try {
      const response = await fetch("./wall.json?v=" + Date.now(), {cache:"no-store"});
      if (!response.ok) throw new Error("HTTP " + response.status);
      const received = await response.json();
      if (!received || !Array.isArray(received.posts) || !Array.isArray(received.trails)) {
        throw new Error("Formato dati non valido");
      }
      data = received;
      showFeed();
      showPaths();
      dateLabel.textContent = "Edizione aggiornata il " + formatDate(data.updated);
      notice.textContent = "Quadro aggiornato. " + data.posts.length + " pubblicazioni disponibili.";
      if (/^#n[0-9]{3}$/.test(location.hash)) {
        selectTab("novita");
        const selected = $(location.hash.slice(1));
        if (selected) {
          selected.scrollIntoView({behavior:"auto",block:"start"});
          const button = selected.querySelector("button.read");
          if (button && button.getAttribute("aria-expanded") === "false") button.click();
        }
      }
    } catch (error) {
      notice.textContent = "Non riesco a caricare il diario. Controlla la connessione e riprova. " +
        "Per l'anteprima locale avvia un piccolo server HTTP.";
      if (!data) feed.replaceChildren(el("p","emptystate","Diario temporaneamente non disponibile."));
    } finally {
      refresh.disabled = false;
    }
  }
  search.addEventListener("input", showFeed);
  filter.addEventListener("change", showFeed);
  refresh.addEventListener("click", load);
  window.addEventListener("hashchange", () => {
    if (/^#n[0-9]{3}$/.test(location.hash)) selectTab("novita");
  });
  load();
})();
