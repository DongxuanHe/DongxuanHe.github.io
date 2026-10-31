(() => {
  const section = document.querySelector("[data-notes-index]");
  if (!section) return;

  const cards = Array.from(section.querySelectorAll(".seminar-series-card[data-seminar-filter]"));
  const notes = Array.from(section.querySelectorAll("[data-seminar-categories]"));
  const heading = section.querySelector("[data-notes-heading]");
  const status = section.querySelector("[data-notes-status]");
  const showAll = section.querySelector('[data-seminar-filter="all"]');
  const search = section.querySelector("[data-notes-search]");
  const empty = section.querySelector("[data-notes-empty]");
  const normalize = (text) => text.normalize("NFKC").toLocaleLowerCase().replace(/\s+/g, " ").trim();
  // Index only each published article's title, description, and text, rendered by Jekyll.
  const textIndex = new Map(notes.map((note) => [note, normalize(note.dataset.noteSearch || "")]));
  const labels = new Map(cards.map((card) => [card.dataset.seminarFilter, card.dataset.seriesLabel]));
  let current = "all";

  function applyFilter(key) {
    current = labels.has(key) ? key : "all";
    const terms = normalize(search.value).split(" ").filter(Boolean);
    let count = 0;
    for (const note of notes) {
      const matchesSeries = current === "all" || note.dataset.seminarCategories.split(/\s+/).includes(current);
      const matchesSearch = terms.every((term) => textIndex.get(note).includes(term));
      note.hidden = !matchesSeries || !matchesSearch;
      if (!note.hidden) count += 1;
    }
    for (const card of cards) card.setAttribute("aria-pressed", String(card.dataset.seminarFilter === current));
    heading.textContent = current === "all" ? "All notes" : `${labels.get(current)} notes`;
    showAll.hidden = current === "all";
    status.textContent = `${count} ${count === 1 ? "note" : "notes"}${terms.length ? " found" : ""} · ${heading.textContent}`;
    empty.hidden = count !== 0;
    if (notes.length === 0) empty.textContent = section.dataset.emptyMessage || "No notes yet.";
    else if (terms.length) empty.textContent = "No matching notes. Try another keyword or select a different category.";
    else empty.textContent = "No notes in this category yet.";
  }

  section.addEventListener("click", (event) => {
    const control = event.target.closest("[data-seminar-filter]");
    if (!control || !section.contains(control)) return;
    const key = control.dataset.seminarFilter;
    // Clicking the selected series again restores the full list.
    const next = key === current ? "all" : key;
    const url = new URL(window.location.href);
    url.hash = next === "all" ? "" : next;
    window.history.pushState(null, "", url);
    applyFilter(next);
  });

  function searchNotes() {
    const url = new URL(window.location.href);
    const query = search.value.trim();
    if (query) url.searchParams.set("q", query);
    else url.searchParams.delete("q");
    window.history.replaceState(null, "", url);
    applyFilter(current);
  }

  search.addEventListener("input", searchNotes);
  search.addEventListener("search", searchNotes);
  search.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && search.value) {
      event.preventDefault();
      search.value = "";
      searchNotes();
    }
  });

  const restoreFilter = () => {
    search.value = new URL(window.location.href).searchParams.get("q") || "";
    applyFilter(window.location.hash.slice(1));
  };
  window.addEventListener("popstate", restoreFilter);
  window.addEventListener("hashchange", restoreFilter);
  restoreFilter();
})();
