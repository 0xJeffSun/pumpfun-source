// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(732486),
    r = e.i(445242),
    n = e.i(745018);
  e.i(12692);
  var i = e.i(398902),
    l = e.i(338319);
  e.s([
    "f",
    0,
    function (e) {
      let a,
        s,
        o,
        c,
        u,
        d,
        m,
        f,
        h,
        p,
        g,
        b = (0, r.c)(31),
        { symbol: x, variant: v, context: y, className: w } = e,
        j = void 0 === v ? "card" : v,
        N = void 0 === y ? "coin" : y,
        { t: C } = (0, i.f)();
      if (b[0] !== w || b[1] !== N || b[2] !== x || b[3] !== C || b[4] !== j) {
        f = Symbol.for("react.early_return_sentinel");
        e: {
          let e = x?.trim() || null,
            r =
              "profile" === N
                ? e
                  ? C("web.callouts.visibility_headline_not_listed", {
                      symbol: e,
                    })
                  : C("web.callouts.visibility_headline_not_listed_generic")
                : C("web.callouts.visibility_headline_only_you");
          if ("inline" === j) {
            let r, i;
            (b[13] !== w
              ? ((r = (0, l.c)(
                  "flex items-center gap-1.5 text-[11px] leading-4 text-text-tertiary",
                  w,
                )),
                (b[13] = w),
                (b[14] = r))
              : (r = b[14]),
              b[15] === Symbol.for("react.memo_cache_sentinel")
                ? ((i = (0, t.jsx)(n.cT, {
                    "aria-hidden": !0,
                    className: "size-3 shrink-0",
                  })),
                  (b[15] = i))
                : (i = b[15]),
              (f = (0, t.jsxs)("p", {
                "data-testid": "callout-visibility-notice",
                className: r,
                children: [
                  i,
                  (0, t.jsx)("span", {
                    children: e
                      ? C("web.callouts.visibility_inline", { symbol: e })
                      : C("web.callouts.visibility_inline_generic"),
                  }),
                ],
              })));
            break e;
          }
          ((u = "callout-visibility-notice"),
            b[16] !== w
              ? ((d = (0, l.c)(
                  "flex w-full items-start gap-2 rounded-xl border border-dashed border-border-tertiary bg-bg-secondary px-3 py-2.5",
                  w,
                )),
                (b[16] = w),
                (b[17] = d))
              : (d = b[17]),
            b[18] === Symbol.for("react.memo_cache_sentinel")
              ? ((m = (0, t.jsx)(n.cT, {
                  "aria-hidden": !0,
                  className: "mt-0.5 size-4 shrink-0 text-text-tertiary",
                })),
                (b[18] = m))
              : (m = b[18]),
            (o = "flex flex-col gap-0.5"),
            (c = (0, t.jsx)("p", {
              className: "text-xs font-medium leading-4 text-text-primary",
              children: r,
            })),
            (a = "text-[11px] leading-4 text-text-secondary"),
            (s = e
              ? C("web.callouts.visibility_body", { symbol: e })
              : C("web.callouts.visibility_body_generic")));
        }
        ((b[0] = w),
          (b[1] = N),
          (b[2] = x),
          (b[3] = C),
          (b[4] = j),
          (b[5] = a),
          (b[6] = s),
          (b[7] = o),
          (b[8] = c),
          (b[9] = u),
          (b[10] = d),
          (b[11] = m),
          (b[12] = f));
      } else
        ((a = b[5]),
          (s = b[6]),
          (o = b[7]),
          (c = b[8]),
          (u = b[9]),
          (d = b[10]),
          (m = b[11]),
          (f = b[12]));
      return f !== Symbol.for("react.early_return_sentinel")
        ? f
        : (b[19] !== a || b[20] !== s
            ? ((h = (0, t.jsx)("p", { className: a, children: s })),
              (b[19] = a),
              (b[20] = s),
              (b[21] = h))
            : (h = b[21]),
          b[22] !== h || b[23] !== o || b[24] !== c
            ? ((p = (0, t.jsxs)("div", { className: o, children: [c, h] })),
              (b[22] = h),
              (b[23] = o),
              (b[24] = c),
              (b[25] = p))
            : (p = b[25]),
          b[26] !== p || b[27] !== u || b[28] !== d || b[29] !== m
            ? ((g = (0, t.jsxs)("div", {
                "data-testid": u,
                className: d,
                children: [m, p],
              })),
              (b[26] = p),
              (b[27] = u),
              (b[28] = d),
              (b[29] = m),
              (b[30] = g))
            : (g = b[30]),
          g);
    },
  ]);
};
