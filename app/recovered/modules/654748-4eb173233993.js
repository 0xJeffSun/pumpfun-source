// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(791898),
    a = e.i(994112);
  let i = (e) => !0 === e.auto,
    n = (e) => new Set(e.flatMap((e) => e.panes.map((e) => e.view)));
  e.s([
    "T",
    0,
    (e) => {
      if (!e.auto) return e;
      let { auto: t, ...a } = e;
      return a;
    },
    "O",
    0,
    ({
      columns: e,
      rowPx: i,
      candidates: r,
      pausedBelowPx: l,
      buildColumn: s = a.B,
    }) => {
      let o = e.filter((e) => !e.auto),
        d = e.filter((e) => e.auto),
        u = Math.max(
          0,
          ((e, a = t.b) =>
            !Number.isFinite(e) || e < 400
              ? 0
              : Math.min(a, Math.floor(e / 400)))(i) - o.length,
        ),
        c = void 0 !== l && i < l + 400 ? Math.min(d.length, u) : u,
        p = n(o),
        m = new Set(r),
        h = d
          .filter(
            (e) =>
              !e.panes.some((e) => p.has(e.view)) &&
              e.panes.every((e) => m.has(e.view)),
          )
          .slice(0, c),
        f = new Set(h.map((e) => e.id)),
        g = e.filter((e) => !e.auto || f.has(e.id));
      if (h.length < c) {
        let e = new Set([...p, ...n(h)]),
          t = c - h.length;
        for (let a of r) {
          if (0 === t) break;
          e.has(a) || (e.add(a), g.push({ ...s(a), auto: !0 }), (t -= 1));
        }
      }
      return g.length === e.length && g.every((t, a) => t === e[a]) ? e : g;
    },
    "U",
    0,
    (e) => (e.some(i) ? e.filter((e) => !e.auto) : e),
  ]);
};
