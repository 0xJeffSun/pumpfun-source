// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(732486),
    n = e.i(445242),
    r = e.i(157633),
    i = e.i(426091),
    o = e.i(574472);
  e.i(12692);
  var a = e.i(398902),
    u = e.i(425444),
    l = e.i(70527);
  e.s([
    "f",
    0,
    function (e) {
      let c,
        s,
        f,
        p,
        d = (0, n.c)(21),
        { value: m, onChange: v } = e,
        { t: g } = (0, a.f)(),
        { address: y } = (0, o.F)(),
        b = y || "";
      d[0] !== b
        ? ((c = { userAddress: b, limit: 50, offset: 0 }),
          (d[0] = b),
          (d[1] = c))
        : (c = d[1]);
      let { data: h, isLoading: w } = (0, l.f)(c);
      d[2] !== h?.coins
        ? ((s = h?.coins ?? []), (d[2] = h?.coins), (d[3] = s))
        : (s = d[3]);
      let x = s;
      if (w) {
        let e, n;
        return (
          d[4] !== g
            ? ((e = g("web.videos.loading_your_coins")), (d[4] = g), (d[5] = e))
            : (e = d[5]),
          d[6] !== e
            ? ((n = (0, t.jsx)("p", {
                className: "text-sm text-text-tertiary",
                children: e,
              })),
              (d[6] = e),
              (d[7] = n))
            : (n = d[7]),
          n
        );
      }
      if (0 === x.length) {
        let e, n;
        return (
          d[8] !== g
            ? ((e = g("web.videos.no_created_coins")), (d[8] = g), (d[9] = e))
            : (e = d[9]),
          d[10] !== e
            ? ((n = (0, t.jsx)("p", {
                className: "text-sm text-text-tertiary",
                children: e,
              })),
              (d[10] = e),
              (d[11] = n))
            : (n = d[11]),
          n
        );
      }
      if (d[12] !== x || d[13] !== v || d[14] !== m) {
        let e;
        (d[16] !== v || d[17] !== m
          ? ((e = (e) => {
              let n = m === e.mint;
              return (0, t.jsxs)(
                "button",
                {
                  type: "button",
                  "aria-pressed": n,
                  onClick: () => v(n ? null : e.mint),
                  className: (0, i.c)(
                    "flex w-full items-center gap-3 rounded-xl border p-2.5 text-left transition-colors",
                    n
                      ? "border-border-inverse/60 bg-bg-secondary"
                      : "border-border-tertiary bg-bg-muted hover:border-border-inverse/30",
                  ),
                  children: [
                    (0, t.jsx)("div", {
                      className:
                        "size-8 shrink-0 overflow-hidden rounded-full bg-bg-secondary",
                      children: e.image_uri
                        ? (0, t.jsx)(u.default, {
                            src: e.image_uri,
                            alt: e.symbol ?? e.mint,
                            width: 32,
                            height: 32,
                            className: "size-full object-cover",
                          })
                        : null,
                    }),
                    (0, t.jsxs)("div", {
                      className: "min-w-0 flex-1",
                      children: [
                        (0, t.jsx)("p", {
                          className:
                            "truncate text-sm font-semibold text-text-primary",
                          children: e.symbol,
                        }),
                        (0, t.jsx)("p", {
                          className: "truncate text-xs text-text-tertiary",
                          children: e.name,
                        }),
                      ],
                    }),
                    n
                      ? (0, t.jsx)(r.S7, {
                          className: "size-4 shrink-0 text-text-primary",
                          "aria-hidden": !0,
                        })
                      : null,
                  ],
                },
                e.mint,
              );
            }),
            (d[16] = v),
            (d[17] = m),
            (d[18] = e))
          : (e = d[18]),
          (f = x.map(e)),
          (d[12] = x),
          (d[13] = v),
          (d[14] = m),
          (d[15] = f));
      } else f = d[15];
      return (
        d[19] !== f
          ? ((p = (0, t.jsx)("div", {
              className: "flex max-h-52 flex-col gap-1.5 overflow-y-auto pr-1",
              children: f,
            })),
            (d[19] = f),
            (d[20] = p))
          : (p = d[20]),
        p
      );
    },
  ]);
};
