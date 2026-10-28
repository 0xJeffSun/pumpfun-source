// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(732486),
    r = e.i(445242),
    l = e.i(745018);
  e.i(12692);
  var o = e.i(398902),
    i = e.i(338319);
  e.s([
    "f",
    0,
    function (e) {
      let a,
        n,
        s,
        c,
        d,
        u,
        m,
        p,
        b,
        h,
        y,
        f = (0, r.c)(31),
        { symbol: g, variant: v, context: x, className: w } = e,
        C = void 0 === v ? "card" : v,
        k = void 0 === x ? "coin" : x,
        { t: S } = (0, o.f)();
      if (f[0] !== w || f[1] !== k || f[2] !== g || f[3] !== S || f[4] !== C) {
        p = Symbol.for("react.early_return_sentinel");
        e: {
          let e = g?.trim() || null,
            r =
              "profile" === k
                ? e
                  ? S("web.callouts.visibility_headline_not_listed", {
                      symbol: e,
                    })
                  : S("web.callouts.visibility_headline_not_listed_generic")
                : S("web.callouts.visibility_headline_only_you");
          if ("inline" === C) {
            let r, o;
            (f[13] !== w
              ? ((r = (0, i.c)(
                  "flex items-center gap-1.5 text-[11px] leading-4 text-text-tertiary",
                  w,
                )),
                (f[13] = w),
                (f[14] = r))
              : (r = f[14]),
              f[15] === Symbol.for("react.memo_cache_sentinel")
                ? ((o = (0, t.jsx)(l.cT, {
                    "aria-hidden": !0,
                    className: "size-3 shrink-0",
                  })),
                  (f[15] = o))
                : (o = f[15]),
              (p = (0, t.jsxs)("p", {
                "data-testid": "callout-visibility-notice",
                className: r,
                children: [
                  o,
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
            f[16] !== w
              ? ((u = (0, i.c)(
                  "flex w-full items-start gap-2 rounded-xl border border-dashed border-border-tertiary bg-bg-secondary px-3 py-2.5",
                  w,
                )),
                (f[16] = w),
                (f[17] = u))
              : (u = f[17]),
            f[18] === Symbol.for("react.memo_cache_sentinel")
              ? ((m = (0, t.jsx)(l.cT, {
                  "aria-hidden": !0,
                  className: "mt-0.5 size-4 shrink-0 text-text-tertiary",
                })),
                (f[18] = m))
              : (m = f[18]),
            (s = "flex flex-col gap-0.5"),
            (c = (0, t.jsx)("p", {
              className: "text-xs font-medium leading-4 text-text-primary",
              children: r,
            })),
            (a = "text-[11px] leading-4 text-text-secondary"),
            (n = e
              ? S("web.callouts.visibility_body", { symbol: e })
              : S("web.callouts.visibility_body_generic")));
        }
        ((f[0] = w),
          (f[1] = k),
          (f[2] = g),
          (f[3] = S),
          (f[4] = C),
          (f[5] = a),
          (f[6] = n),
          (f[7] = s),
          (f[8] = c),
          (f[9] = d),
          (f[10] = u),
          (f[11] = m),
          (f[12] = p));
      } else
        ((a = f[5]),
          (n = f[6]),
          (s = f[7]),
          (c = f[8]),
          (d = f[9]),
          (u = f[10]),
          (m = f[11]),
          (p = f[12]));
      return p !== Symbol.for("react.early_return_sentinel")
        ? p
        : (f[19] !== a || f[20] !== n
            ? ((b = (0, t.jsx)("p", { className: a, children: n })),
              (f[19] = a),
              (f[20] = n),
              (f[21] = b))
            : (b = f[21]),
          f[22] !== b || f[23] !== s || f[24] !== c
            ? ((h = (0, t.jsxs)("div", { className: s, children: [c, b] })),
              (f[22] = b),
              (f[23] = s),
              (f[24] = c),
              (f[25] = h))
            : (h = f[25]),
          f[26] !== h || f[27] !== d || f[28] !== u || f[29] !== m
            ? ((y = (0, t.jsxs)("div", {
                "data-testid": d,
                className: u,
                children: [m, h],
              })),
              (f[26] = h),
              (f[27] = d),
              (f[28] = u),
              (f[29] = m),
              (f[30] = y))
            : (y = f[30]),
          y);
    },
  ]);
};
