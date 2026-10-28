// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(732486),
    i = e.i(445242),
    r = e.i(745018);
  e.i(12692);
  var a = e.i(398902),
    n = e.i(338319);
  e.s([
    "f",
    0,
    function (e) {
      let l,
        o,
        s,
        c,
        d,
        m,
        x,
        u,
        p,
        b,
        f,
        h = (0, i.c)(31),
        { symbol: g, variant: y, context: v, className: _ } = e,
        w = void 0 === y ? "card" : y,
        N = void 0 === v ? "coin" : v,
        { t: k } = (0, a.f)();
      if (h[0] !== _ || h[1] !== N || h[2] !== g || h[3] !== k || h[4] !== w) {
        u = Symbol.for("react.early_return_sentinel");
        e: {
          let e = g?.trim() || null,
            i =
              "profile" === N
                ? e
                  ? k("web.callouts.visibility_headline_not_listed", {
                      symbol: e,
                    })
                  : k("web.callouts.visibility_headline_not_listed_generic")
                : k("web.callouts.visibility_headline_only_you");
          if ("inline" === w) {
            let i, a;
            (h[13] !== _
              ? ((i = (0, n.c)(
                  "flex items-center gap-1.5 text-[11px] leading-4 text-text-tertiary",
                  _,
                )),
                (h[13] = _),
                (h[14] = i))
              : (i = h[14]),
              h[15] === Symbol.for("react.memo_cache_sentinel")
                ? ((a = (0, t.jsx)(r.cT, {
                    "aria-hidden": !0,
                    className: "size-3 shrink-0",
                  })),
                  (h[15] = a))
                : (a = h[15]),
              (u = (0, t.jsxs)("p", {
                "data-testid": "callout-visibility-notice",
                className: i,
                children: [
                  a,
                  (0, t.jsx)("span", {
                    children: e
                      ? k("web.callouts.visibility_inline", { symbol: e })
                      : k("web.callouts.visibility_inline_generic"),
                  }),
                ],
              })));
            break e;
          }
          ((d = "callout-visibility-notice"),
            h[16] !== _
              ? ((m = (0, n.c)(
                  "flex w-full items-start gap-2 rounded-xl border border-dashed border-border-tertiary bg-bg-secondary px-3 py-2.5",
                  _,
                )),
                (h[16] = _),
                (h[17] = m))
              : (m = h[17]),
            h[18] === Symbol.for("react.memo_cache_sentinel")
              ? ((x = (0, t.jsx)(r.cT, {
                  "aria-hidden": !0,
                  className: "mt-0.5 size-4 shrink-0 text-text-tertiary",
                })),
                (h[18] = x))
              : (x = h[18]),
            (s = "flex flex-col gap-0.5"),
            (c = (0, t.jsx)("p", {
              className: "text-xs font-medium leading-4 text-text-primary",
              children: i,
            })),
            (l = "text-[11px] leading-4 text-text-secondary"),
            (o = e
              ? k("web.callouts.visibility_body", { symbol: e })
              : k("web.callouts.visibility_body_generic")));
        }
        ((h[0] = _),
          (h[1] = N),
          (h[2] = g),
          (h[3] = k),
          (h[4] = w),
          (h[5] = l),
          (h[6] = o),
          (h[7] = s),
          (h[8] = c),
          (h[9] = d),
          (h[10] = m),
          (h[11] = x),
          (h[12] = u));
      } else
        ((l = h[5]),
          (o = h[6]),
          (s = h[7]),
          (c = h[8]),
          (d = h[9]),
          (m = h[10]),
          (x = h[11]),
          (u = h[12]));
      return u !== Symbol.for("react.early_return_sentinel")
        ? u
        : (h[19] !== l || h[20] !== o
            ? ((p = (0, t.jsx)("p", { className: l, children: o })),
              (h[19] = l),
              (h[20] = o),
              (h[21] = p))
            : (p = h[21]),
          h[22] !== p || h[23] !== s || h[24] !== c
            ? ((b = (0, t.jsxs)("div", { className: s, children: [c, p] })),
              (h[22] = p),
              (h[23] = s),
              (h[24] = c),
              (h[25] = b))
            : (b = h[25]),
          h[26] !== b || h[27] !== d || h[28] !== m || h[29] !== x
            ? ((f = (0, t.jsxs)("div", {
                "data-testid": d,
                className: m,
                children: [x, b],
              })),
              (h[26] = b),
              (h[27] = d),
              (h[28] = m),
              (h[29] = x),
              (h[30] = f))
            : (f = h[30]),
          f);
    },
  ]);
};
