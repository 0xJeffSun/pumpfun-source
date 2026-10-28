// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(732486),
    i = e.i(445242),
    s = e.i(745018);
  e.i(12692);
  var a = e.i(398902),
    r = e.i(338319);
  e.s([
    "f",
    0,
    function (e) {
      let n,
        l,
        o,
        c,
        d,
        x,
        h,
        u,
        f,
        b,
        p,
        m = (0, i.c)(31),
        { symbol: y, variant: v, context: g, className: w } = e,
        _ = void 0 === v ? "card" : v,
        N = void 0 === g ? "coin" : g,
        { t: A } = (0, a.f)();
      if (m[0] !== w || m[1] !== N || m[2] !== y || m[3] !== A || m[4] !== _) {
        u = Symbol.for("react.early_return_sentinel");
        e: {
          let e = y?.trim() || null,
            i =
              "profile" === N
                ? e
                  ? A("web.callouts.visibility_headline_not_listed", {
                      symbol: e,
                    })
                  : A("web.callouts.visibility_headline_not_listed_generic")
                : A("web.callouts.visibility_headline_only_you");
          if ("inline" === _) {
            let i, a;
            (m[13] !== w
              ? ((i = (0, r.c)(
                  "flex items-center gap-1.5 text-[11px] leading-4 text-text-tertiary",
                  w,
                )),
                (m[13] = w),
                (m[14] = i))
              : (i = m[14]),
              m[15] === Symbol.for("react.memo_cache_sentinel")
                ? ((a = (0, t.jsx)(s.cT, {
                    "aria-hidden": !0,
                    className: "size-3 shrink-0",
                  })),
                  (m[15] = a))
                : (a = m[15]),
              (u = (0, t.jsxs)("p", {
                "data-testid": "callout-visibility-notice",
                className: i,
                children: [
                  a,
                  (0, t.jsx)("span", {
                    children: e
                      ? A("web.callouts.visibility_inline", { symbol: e })
                      : A("web.callouts.visibility_inline_generic"),
                  }),
                ],
              })));
            break e;
          }
          ((d = "callout-visibility-notice"),
            m[16] !== w
              ? ((x = (0, r.c)(
                  "flex w-full items-start gap-2 rounded-xl border border-dashed border-border-tertiary bg-bg-secondary px-3 py-2.5",
                  w,
                )),
                (m[16] = w),
                (m[17] = x))
              : (x = m[17]),
            m[18] === Symbol.for("react.memo_cache_sentinel")
              ? ((h = (0, t.jsx)(s.cT, {
                  "aria-hidden": !0,
                  className: "mt-0.5 size-4 shrink-0 text-text-tertiary",
                })),
                (m[18] = h))
              : (h = m[18]),
            (o = "flex flex-col gap-0.5"),
            (c = (0, t.jsx)("p", {
              className: "text-xs font-medium leading-4 text-text-primary",
              children: i,
            })),
            (n = "text-[11px] leading-4 text-text-secondary"),
            (l = e
              ? A("web.callouts.visibility_body", { symbol: e })
              : A("web.callouts.visibility_body_generic")));
        }
        ((m[0] = w),
          (m[1] = N),
          (m[2] = y),
          (m[3] = A),
          (m[4] = _),
          (m[5] = n),
          (m[6] = l),
          (m[7] = o),
          (m[8] = c),
          (m[9] = d),
          (m[10] = x),
          (m[11] = h),
          (m[12] = u));
      } else
        ((n = m[5]),
          (l = m[6]),
          (o = m[7]),
          (c = m[8]),
          (d = m[9]),
          (x = m[10]),
          (h = m[11]),
          (u = m[12]));
      return u !== Symbol.for("react.early_return_sentinel")
        ? u
        : (m[19] !== n || m[20] !== l
            ? ((f = (0, t.jsx)("p", { className: n, children: l })),
              (m[19] = n),
              (m[20] = l),
              (m[21] = f))
            : (f = m[21]),
          m[22] !== f || m[23] !== o || m[24] !== c
            ? ((b = (0, t.jsxs)("div", { className: o, children: [c, f] })),
              (m[22] = f),
              (m[23] = o),
              (m[24] = c),
              (m[25] = b))
            : (b = m[25]),
          m[26] !== b || m[27] !== d || m[28] !== x || m[29] !== h
            ? ((p = (0, t.jsxs)("div", {
                "data-testid": d,
                className: x,
                children: [h, b],
              })),
              (m[26] = b),
              (m[27] = d),
              (m[28] = x),
              (m[29] = h),
              (m[30] = p))
            : (p = m[30]),
          p);
    },
  ]);
};
