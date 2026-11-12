(() => {
  const initializeMap = (root) => {
    const canvas = root.querySelector(".research-map__canvas");
    const hub = root.querySelector(".research-map__hub");
    const connectors = root.querySelector(".research-map__connections");
    const topics = Array.from(root.querySelectorAll(".research-map__topic"));

    if (!canvas || !hub || !connectors || topics.length !== 3) return;

    let pendingFrame = 0;

    const draw = () => {
      pendingFrame = 0;
      const width = canvas.getBoundingClientRect().width;
      if (width <= 0) return;

      const compact = width < 580;
      const nodeWidth = compact ? Math.min(104, width * 0.31) : Math.min(236, Math.max(180, width * 0.29));
      const hubWidth = compact ? Math.min(90, width * 0.28) : 154;
      const hubHeight = compact ? 60 : 82;
      const margin = compact ? 6 : 14;
      const radius = Math.min(compact ? 140 : 260, (width / 2 - nodeWidth / 2 - margin) / Math.cos(Math.PI / 6));

      root.dataset.compact = String(compact);
      root.classList.add("is-radial");
      topics.forEach((topic) => {
        topic.style.width = `${nodeWidth}px`;
        topic.style.height = "auto";
      });

      const nodeHeight = Math.max(compact ? 76 : 0, ...topics.map((topic) => topic.getBoundingClientRect().height));
      const centerX = width / 2;
      const centerY = radius / 2 + nodeHeight / 2 + 12;
      const height = centerY + radius + nodeHeight / 2 + 12;

      canvas.style.height = `${height}px`;
      Object.assign(hub.style, {
        left: `${centerX}px`,
        top: `${centerY}px`,
        width: `${hubWidth}px`,
        height: `${hubHeight}px`,
      });
      connectors.setAttribute("viewBox", `0 0 ${width} ${height}`);

      const lines = [-150, -30, 90].map((angle, index) => {
        const radians = (angle * Math.PI) / 180;
        const dx = Math.cos(radians);
        const dy = Math.sin(radians);
        const x = centerX + radius * dx;
        const y = centerY + radius * dy;
        Object.assign(topics[index].style, {
          left: `${x}px`,
          top: `${y}px`,
          height: `${nodeHeight}px`,
        });

        const hubEdge = Math.min(hubWidth / 2 / Math.max(Math.abs(dx), 0.000001), hubHeight / 2 / Math.max(Math.abs(dy), 0.000001));
        const nodeEdge = Math.min(nodeWidth / 2 / Math.max(Math.abs(dx), 0.000001), nodeHeight / 2 / Math.max(Math.abs(dy), 0.000001));
        const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
        const endpoints = {
          x1: centerX + hubEdge * dx,
          y1: centerY + hubEdge * dy,
          x2: x - nodeEdge * dx,
          y2: y - nodeEdge * dy,
        };
        Object.entries(endpoints).forEach(([name, value]) => line.setAttribute(name, value));
        return line;
      });
      connectors.replaceChildren(...lines);
    };

    const scheduleDraw = () => {
      if (!pendingFrame) pendingFrame = window.requestAnimationFrame(draw);
    };

    if (typeof ResizeObserver !== "undefined") {
      let previousWidth = -1;
      const observer = new ResizeObserver((entries) => {
        const width = entries[0].contentRect.width;
        if (width !== previousWidth) {
          previousWidth = width;
          scheduleDraw();
        }
      });
      observer.observe(canvas);
    }

    window.addEventListener("resize", scheduleDraw, { passive: true });
    window.addEventListener("load", scheduleDraw, { once: true });
    document.addEventListener("visibilitychange", scheduleDraw);
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(scheduleDraw);
    scheduleDraw();
  };

  const initialize = () => document.querySelectorAll("[data-research-map]").forEach(initializeMap);
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", initialize, { once: true });
  else initialize();
})();
