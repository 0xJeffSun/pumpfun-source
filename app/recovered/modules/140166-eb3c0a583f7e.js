// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(732486),
    i = e.i(445242),
    a = e.i(745018);
  e.i(12692);
  var n = e.i(398902),
    s = e.i(441315);
  e.s([
    "f",
    0,
    function (e) {
      let r,
        l,
        o,
        d = (0, i.c)(12),
        { testId: c, compact: u, pending: m } = e,
        f = void 0 === c ? "quote-summary-loading" : c,
        p = void 0 === m || m,
        { t: b } = (0, n.f)();
      if (void 0 !== u && u) {
        let e,
          i,
          n = p ? f : void 0;
        return (
          d[0] !== p || d[1] !== b
            ? ((e = p
                ? (0, t.jsxs)(t.Fragment, {
                    children: [
                      (0, t.jsx)(a.Wh, {
                        "aria-hidden": !0,
                        className: "size-3.5 animate-spin",
                      }),
                      (0, t.jsx)("span", {
                        className: "sr-only",
                        children: b("web.trade.fetching_quote"),
                      }),
                    ],
                  })
                : null),
              (d[0] = p),
              (d[1] = b),
              (d[2] = e))
            : (e = d[2]),
          d[3] !== n || d[4] !== e
            ? ((i = (0, t.jsx)("span", {
                role: "status",
                "data-testid": n,
                className: "flex shrink-0 items-center text-text-quaternary",
                children: e,
              })),
              (d[3] = n),
              (d[4] = e),
              (d[5] = i))
            : (i = d[5]),
          i
        );
      }
      return (
        d[6] === Symbol.for("react.memo_cache_sentinel")
          ? ((r = (0, t.jsx)(a.Wh, {
              "aria-hidden": !0,
              className: "animate-spin",
            })),
            (d[6] = r))
          : (r = d[6]),
        d[7] !== b
          ? ((l = b("web.trade.fetching_quote")), (d[7] = b), (d[8] = l))
          : (l = d[8]),
        d[9] !== l || d[10] !== f
          ? ((o = (0, t.jsx)(s.p, {
              as: "span",
              density: "terminal",
              variant: "raised",
              role: "status",
              "data-testid": f,
              leading: r,
              children: l,
            })),
            (d[9] = l),
            (d[10] = f),
            (d[11] = o))
          : (o = d[11]),
        o
      );
    },
  ]);
};
