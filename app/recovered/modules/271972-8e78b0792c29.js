// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(732486),
    r = e.i(445242),
    i = e.i(745018);
  e.i(12692);
  var l = e.i(398902),
    a = e.i(338319);
  e.s([
    "f",
    0,
    function (e) {
      let n,
        o,
        s,
        c,
        d,
        u,
        m,
        p,
        h,
        f,
        y,
        b = (0, r.c)(31),
        { symbol: v, variant: g, context: x, className: C } = e,
        k = void 0 === g ? "card" : g,
        w = void 0 === x ? "coin" : x,
        { t: S } = (0, l.f)();
      if (b[0] !== C || b[1] !== w || b[2] !== v || b[3] !== S || b[4] !== k) {
        p = Symbol.for("react.early_return_sentinel");
        e: {
          let e = v?.trim() || null,
            r =
              "profile" === w
                ? e
                  ? S("web.callouts.visibility_headline_not_listed", {
                      symbol: e,
                    })
                  : S("web.callouts.visibility_headline_not_listed_generic")
                : S("web.callouts.visibility_headline_only_you");
          if ("inline" === k) {
            let r, l;
            (b[13] !== C
              ? ((r = (0, a.c)(
                  "flex items-center gap-1.5 text-[11px] leading-4 text-text-tertiary",
                  C,
                )),
                (b[13] = C),
                (b[14] = r))
              : (r = b[14]),
              b[15] === Symbol.for("react.memo_cache_sentinel")
                ? ((l = (0, t.jsx)(i.cT, {
                    "aria-hidden": !0,
                    className: "size-3 shrink-0",
                  })),
                  (b[15] = l))
                : (l = b[15]),
              (p = (0, t.jsxs)("p", {
                "data-testid": "callout-visibility-notice",
                className: r,
                children: [
                  l,
                  (0, t.jsx)("span", {
                    children: e
                      ? S("web.callouts.visibility_inline", { symbol: e })
                      : S("web.callouts.visibility_inline_generic"),
                  }),
                ],
              })));
            break e;
          }
          ((d = "callout-visibility-notice"),
            b[16] !== C
              ? ((u = (0, a.c)(
                  "flex w-full items-start gap-2 rounded-xl border border-dashed border-border-tertiary bg-bg-secondary px-3 py-2.5",
                  C,
                )),
                (b[16] = C),
                (b[17] = u))
              : (u = b[17]),
            b[18] === Symbol.for("react.memo_cache_sentinel")
              ? ((m = (0, t.jsx)(i.cT, {
                  "aria-hidden": !0,
                  className: "mt-0.5 size-4 shrink-0 text-text-tertiary",
                })),
                (b[18] = m))
              : (m = b[18]),
            (s = "flex flex-col gap-0.5"),
            (c = (0, t.jsx)("p", {
              className: "text-xs font-medium leading-4 text-text-primary",
              children: r,
            })),
            (n = "text-[11px] leading-4 text-text-secondary"),
            (o = e
              ? S("web.callouts.visibility_body", { symbol: e })
              : S("web.callouts.visibility_body_generic")));
        }
        ((b[0] = C),
          (b[1] = w),
          (b[2] = v),
          (b[3] = S),
          (b[4] = k),
          (b[5] = n),
          (b[6] = o),
          (b[7] = s),
          (b[8] = c),
          (b[9] = d),
          (b[10] = u),
          (b[11] = m),
          (b[12] = p));
      } else
        ((n = b[5]),
          (o = b[6]),
          (s = b[7]),
          (c = b[8]),
          (d = b[9]),
          (u = b[10]),
          (m = b[11]),
          (p = b[12]));
      return p !== Symbol.for("react.early_return_sentinel")
        ? p
        : (b[19] !== n || b[20] !== o
            ? ((h = (0, t.jsx)("p", { className: n, children: o })),
              (b[19] = n),
              (b[20] = o),
              (b[21] = h))
            : (h = b[21]),
          b[22] !== h || b[23] !== s || b[24] !== c
            ? ((f = (0, t.jsxs)("div", { className: s, children: [c, h] })),
              (b[22] = h),
              (b[23] = s),
              (b[24] = c),
              (b[25] = f))
            : (f = b[25]),
          b[26] !== f || b[27] !== d || b[28] !== u || b[29] !== m
            ? ((y = (0, t.jsxs)("div", {
                "data-testid": d,
                className: u,
                children: [m, f],
              })),
              (b[26] = f),
              (b[27] = d),
              (b[28] = u),
              (b[29] = m),
              (b[30] = y))
            : (y = b[30]),
          y);
    },
  ]);
};
