// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  let t = [100, 500, 1e3, 5e3];
  e.s(
    [
      "m",
      0,
      t,
      "e",
      0,
      500,
      "S",
      0,
      (e) => {
        let r = "string" == typeof e && "" !== e.trim() ? Number(e) : e;
        return "number" == typeof r && t.includes(r) ? r : 500;
      },
    ],
    212251,
  );
  let r = {},
    i = "linetool",
    s = new Set([
      "chart.favoriteDrawings",
      "chart.favoriteDrawingsPosition",
      "ChartDrawingToolbarWidget.visible",
      "ChartFavoriteDrawingToolbarWidget.visible",
    ]),
    n = (e) => e.length > i.length && e.startsWith(i),
    o = (e) => n(e) || s.has(e),
    a = (e) => "object" == typeof e && null !== e && !Array.isArray(e),
    l = ({ key: e, value: t }) =>
      t.length <= 32768 &&
      (!n(e) ||
        ((e) => {
          try {
            return a(JSON.parse(e));
          } catch {
            return !1;
          }
        })(t)),
    c = (e, t) => Object.entries(e).filter(([e]) => e !== t);
  e.s(
    [
      "T",
      0,
      "coinTradingView_drawingToolSettings",
      "$",
      0,
      r,
      "q",
      0,
      (e) => {
        if (!a(e)) return r;
        let t = [],
          i = 0;
        for (let [r, s] of Object.entries(e).reverse())
          if ("string" == typeof s && o(r) && l({ key: r, value: s })) {
            if (i + s.length > 262144) break;
            ((i += s.length), t.push([r, s]));
          }
        return Object.fromEntries(t.reverse());
      },
      "m",
      0,
      l,
      "Z",
      0,
      o,
      "P",
      0,
      ({ settings: e, key: t, value: r }) =>
        e[t] === r ? e : { ...Object.fromEntries(c(e, t)), [t]: r },
      "G",
      0,
      ({ settings: e, key: t }) => (t in e ? Object.fromEntries(c(e, t)) : e),
    ],
    638202,
  );
  let d = /^[0-9]{0,5}[SDWM]?$/,
    u = (e) => "string" == typeof e && e.length > 0 && d.test(e);
  e.s(
    [
      "x",
      0,
      "coinTradingView_favoriteIntervals",
      "M",
      0,
      ["1", "5", "60", "240", "1D"],
      "e",
      0,
      (e) => {
        if (Array.isArray(e)) return e.filter(u).slice(0, 20);
      },
    ],
    510632,
  );
  let p = [2, 3, 5, 10],
    f = [0, ...p];
  e.s(
    [
      "p",
      0,
      0,
      "N",
      0,
      p,
      "W",
      0,
      f,
      "l",
      0,
      0,
      "$",
      0,
      (e) => {
        let t = "string" == typeof e && "" !== e.trim() ? Number(e) : e;
        return "number" == typeof t && f.includes(t) ? t : 0;
      },
      "s",
      0,
      (e) => `${e}+`,
      "h",
      0,
      (e) => Number.isFinite(e) && e >= 2,
    ],
    911372,
  );
  let m = new Set([
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 13, 14, 15, 16, 19, 21,
  ]);
  e.s(["f", 0, (e) => "number" == typeof e && m.has(e)], 196498);
  let b = "MainSeries",
    h = (e) => "object" == typeof e && null !== e && !Array.isArray(e),
    y = (e) =>
      JSON.stringify({
        version: e.version,
        panes: e.panes.map((e) =>
          h(e) && Array.isArray(e.sources)
            ? {
                ...e,
                sources: e.sources.map((e) =>
                  h(e) && e.type === b ? { type: b } : e,
                ),
              }
            : e,
        ),
      });
  e.s(
    [
      "s",
      0,
      "coinTradingView_studyTemplate",
      "Q",
      0,
      null,
      "P",
      0,
      (e) =>
        e.panes.flatMap((e) =>
          h(e) && Array.isArray(e.sources)
            ? e.sources.flatMap((e) => {
                if (!h(e) || e.type === b) return [];
                let t = h(e.metaInfo) ? e.metaInfo : void 0,
                  r = t?.description;
                return [
                  "string" == typeof r && r ? r : String(e.type ?? "study"),
                ];
              })
            : [],
        ),
      "Y",
      0,
      (e, t) => e === t || (null !== e && null !== t && y(e) === y(t)),
      "C",
      0,
      (e) =>
        h(e) &&
        Array.isArray(e.panes) &&
        "number" == typeof e.version &&
        Number.isFinite(e.version)
          ? e
          : null,
    ],
    383840,
  );
  let g = "12-hours",
    w = "24-hours",
    _ = (e) => e === g;
  e.s(
    [
      "A",
      0,
      "coinTradingView_timeHoursFormat",
      "O",
      0,
      w,
      "y",
      0,
      (e) => (_(e) ? g : w),
      "H",
      0,
      _,
    ],
    379943,
  );
};
