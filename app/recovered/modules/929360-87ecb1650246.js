// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(732486),
    r = e.i(445242),
    l = e.i(352386);
  e.i(12692);
  var a = e.i(398902),
    n = e.i(618427),
    i = e.i(786147),
    s = e.i(375670),
    o = e.i(294707),
    c = e.i(338319),
    d = e.i(219266);
  let u = Array.from({ length: o.g }, (e, t) => `slot-${t + 1}`),
    m = (0, l.memo)((e) => {
      let l,
        n,
        s,
        o,
        c = (0, r.c)(8),
        { labelKey: m } = e,
        h = void 0 === m ? "web.home.movers_rail_label" : m,
        { t: p } = (0, a.f)();
      return (
        c[0] !== h || c[1] !== p
          ? ((l = (0, i.f)(p, h)), (c[0] = h), (c[1] = p), (c[2] = l))
          : (l = c[2]),
        c[3] !== l
          ? ((n = (0, t.jsx)("div", {
              className: d.n,
              children: (0, t.jsx)("span", { className: d.E, children: l }),
            })),
            (c[3] = l),
            (c[4] = n))
          : (n = c[4]),
        c[5] === Symbol.for("react.memo_cache_sentinel")
          ? ((s = (0, t.jsx)("div", { className: d.D, children: u.map(f) })),
            (c[5] = s))
          : (s = c[5]),
        c[6] !== n
          ? ((o = (0, t.jsx)("div", {
              className: d.U,
              children: (0, t.jsxs)("div", {
                "aria-hidden": !0,
                className: d.Q,
                "data-testid": "movers-card-rail-skeleton",
                children: [n, s],
              }),
            })),
            (c[6] = n),
            (c[7] = o))
          : (o = c[7]),
        o
      );
    });
  function f(e, r) {
    return (0, t.jsxs)(
      "div",
      {
        className: (0, c.c)(d.Y, (0, d.W)(r)),
        "data-testid": "movers-card-shell",
        children: [
          (0, t.jsxs)("div", {
            className: d.T,
            children: [
              (0, t.jsx)(s.f, { className: "size-16 shrink-0 rounded-xl" }),
              (0, t.jsxs)("div", {
                className: "flex min-w-0 flex-1 flex-col gap-1.5",
                children: [
                  (0, t.jsx)(s.f, { className: "h-3.5 w-24" }),
                  (0, t.jsx)(s.f, { className: "h-2.5 w-12" }),
                ],
              }),
              (0, t.jsxs)("div", {
                className: d.k,
                children: [
                  (0, t.jsx)(s.f, { className: "h-3.5 w-16" }),
                  (0, t.jsx)(s.f, { className: "h-3.5 w-14" }),
                ],
              }),
            ],
          }),
          (0, t.jsx)("div", {
            className: d.C,
            children: (0, t.jsx)("span", {
              className: (0, c.c)("block", d.o),
              children: (0, t.jsx)(n.f, {
                className: "h-full w-full",
                height: d.S.height,
                preserveAspectRatio: "none",
                width: d.S.width,
              }),
            }),
          }),
          (0, t.jsxs)("div", {
            className: d.a,
            children: [
              (0, t.jsx)(s.f, { className: "h-5 w-20 rounded-full" }),
              (0, t.jsx)(s.f, { className: "h-2.5 w-16" }),
            ],
          }),
        ],
      },
      e,
    );
  }
  ((m.displayName = "MoversCardSkeleton"), e.s(["MoversCardSkeleton", 0, m]));
};
