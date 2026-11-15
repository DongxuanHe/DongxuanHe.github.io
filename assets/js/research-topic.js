(() => {
  const page = document.querySelector(".research-topic-page[data-research-sections]");
  if (!page) return;

  const links = Array.from(document.querySelectorAll(".sidebar-page-sections [data-topic-section]"));
  const sections = Array.from(page.querySelectorAll("[data-topic-section-content]")).filter((section) =>
    links.some((link) => link.dataset.topicSection === section.id)
  );
  if (!sections.length) return;

  const sectionIds = new Set(sections.map((section) => section.id));
  let framePending = false;
  let anchorSelection = null;

  const currentHashSection = () => {
    const id = window.location.hash.slice(1);
    return sectionIds.has(id) ? id : null;
  };

  const setActiveSection = (id) => {
    if (!sectionIds.has(id)) return;
    links.forEach((link) => {
      if (link.dataset.topicSection === id) link.setAttribute("aria-current", "location");
      else link.removeAttribute("aria-current");
    });
  };

  const updateFromScroll = () => {
    framePending = false;
    const documentHeight = document.documentElement.scrollHeight;
    if (anchorSelection) {
      const target = sections.find((section) => section.id === anchorSelection);
      const margin = Number.parseFloat(window.getComputedStyle(target).scrollMarginTop) || 0;
      const destination = Math.max(0, Math.min(window.scrollY + target.getBoundingClientRect().top - margin, documentHeight - window.innerHeight));
      if (Math.abs(window.scrollY - destination) <= 3) {
        setActiveSection(anchorSelection);
        return;
      }
      anchorSelection = null;
    }
    if (documentHeight <= window.innerHeight + 2) {
      setActiveSection(currentHashSection() || sections[0].id);
      return;
    }

    if (window.scrollY > 1 && window.scrollY + window.innerHeight >= documentHeight - 3) {
      setActiveSection(sections[sections.length - 1].id);
      return;
    }

    const offset = window.matchMedia("(max-width: 991.98px)").matches ? 112 : 64;
    let current = sections[0];
    sections.forEach((section) => {
      if (section.getBoundingClientRect().top <= offset) current = section;
    });
    setActiveSection(current.id);
  };

  const requestScrollUpdate = () => {
    if (framePending) return;
    framePending = true;
    window.requestAnimationFrame(updateFromScroll);
  };

  links.forEach((link) => {
    if (!sectionIds.has(link.dataset.topicSection)) return;
    link.addEventListener("click", () => {
      anchorSelection = link.dataset.topicSection;
      setActiveSection(link.dataset.topicSection);
      if (!window.matchMedia("(max-width: 991.98px)").matches) return;
      const toggle = document.querySelector('.sidebar-toggle[data-target="#navbarNav"]');
      if (toggle && toggle.getAttribute("aria-expanded") === "true") toggle.click();
    });
  });

  window.addEventListener("scroll", requestScrollUpdate, { passive: true });
  window.addEventListener("resize", requestScrollUpdate);
  window.addEventListener("hashchange", () => {
    const id = currentHashSection();
    anchorSelection = id;
    if (id) setActiveSection(id);
    else requestScrollUpdate();
  });
  window.addEventListener("popstate", () => {
    anchorSelection = currentHashSection();
    requestScrollUpdate();
  });
  window.addEventListener("load", requestScrollUpdate, { once: true });

  const initialSection = currentHashSection();
  if (initialSection) {
    anchorSelection = initialSection;
    setActiveSection(initialSection);
  } else requestScrollUpdate();
})();
