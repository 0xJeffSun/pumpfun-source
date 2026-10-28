// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  let t = "http://www.w3.org/2000/svg",
    r = [
      ["width", "18"],
      ["height", "18"],
      ["viewBox", "0 0 18 18"],
      ["fill", "none"],
      ["stroke", "currentColor"],
      ["stroke-width", "1.5"],
      ["stroke-linecap", "round"],
      ["stroke-linejoin", "round"],
      ["aria-hidden", "true"],
    ];
  e.s([
    "B",
    0,
    (e, t) => {
      try {
        e.setCSSCustomProperty("--pf-chart-header-reserve", `${t ?? 0}px`);
      } catch {}
    },
    "n",
    0,
    (e) => [
      ["--pf-chart-header-button-text", e.textTertiary],
      ["--pf-chart-header-button-text-hover", e.textPrimary],
      ["--pf-chart-header-button-text-open", e.accent],
    ],
    "b",
    0,
    (e) => {
      let i = e.createElementNS(t, "svg");
      for (let [e, t] of r) i.setAttribute(e, t);
      let o = e.createElementNS(t, "path");
      return (
        o.setAttribute(
          "d",
          "M3.5 3.5v11M14.5 3.5v11M6.5 9h5M8 7.25 6.25 9 8 10.75M10 7.25 11.75 9 10 10.75",
        ),
        i.append(o),
        i
      );
    },
  ]);
};
