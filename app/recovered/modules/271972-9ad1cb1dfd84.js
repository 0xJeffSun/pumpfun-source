// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(732486),
    i = e.i(445242),
    l = e.i(745018);
  e.i(12692);
  var r = e.i(398902),
    a = e.i(338319);
  e.s([
    "f",
    0,
    function (e) {
      let n,
        o,
        s,
        d,
        c,
        u,
        m,
        f,
        y,
        h,
        p,
        x = (0, i.c)(31),
        { symbol: b, variant: v, context: g, className: C } = e,
        w = void 0 === v ? "card" : v,
        k = void 0 === g ? "coin" : g,
        { t: _ } = (0, r.f)();
      if (x[0] !== C || x[1] !== k || x[2] !== b || x[3] !== _ || x[4] !== w) {
        f = Symbol.for("react.early_return_sentinel");
        e: {
          let e = b?.trim() || null,
            i =
              "profile" === k
                ? e
                  ? _("web.callouts.visibility_headline_not_listed", {
                      symbol: e,
                    })
                  : _("web.callouts.visibility_headline_not_listed_generic")
                : _("web.callouts.visibility_headline_only_you");
          if ("inline" === w) {
            let i, r;
            (x[13] !== C
              ? ((i = (0, a.c)(
                  "flex items-center gap-1.5 text-[11px] leading-4 text-text-tertiary",
                  C,
                )),
                (x[13] = C),
                (x[14] = i))
              : (i = x[14]),
              x[15] === Symbol.for("react.memo_cache_sentinel")
                ? ((r = (0, t.jsx)(l.cT, {
                    "aria-hidden": !0,
                    className: "size-3 shrink-0",
                  })),
                  (x[15] = r))
                : (r = x[15]),
              (f = (0, t.jsxs)("p", {
                "data-testid": "callout-visibility-notice",
                className: i,
                children: [
                  r,
                  (0, t.jsx)("span", {
                    children: e
                      ? _("web.callouts.visibility_inline", { symbol: e })
                      : _("web.callouts.visibility_inline_generic"),
                  }),
                ],
              })));
            break e;
          }
          ((c = "callout-visibility-notice"),
            x[16] !== C
              ? ((u = (0, a.c)(
                  "flex w-full items-start gap-2 rounded-xl border border-dashed border-border-tertiary bg-bg-secondary px-3 py-2.5",
                  C,
                )),
                (x[16] = C),
                (x[17] = u))
              : (u = x[17]),
            x[18] === Symbol.for("react.memo_cache_sentinel")
              ? ((m = (0, t.jsx)(l.cT, {
                  "aria-hidden": !0,
                  className: "mt-0.5 size-4 shrink-0 text-text-tertiary",
                })),
                (x[18] = m))
              : (m = x[18]),
            (s = "flex flex-col gap-0.5"),
            (d = (0, t.jsx)("p", {
              className: "text-xs font-medium leading-4 text-text-primary",
              children: i,
            })),
            (n = "text-[11px] leading-4 text-text-secondary"),
            (o = e
              ? _("web.callouts.visibility_body", { symbol: e })
              : _("web.callouts.visibility_body_generic")));
        }
        ((x[0] = C),
          (x[1] = k),
          (x[2] = b),
          (x[3] = _),
          (x[4] = w),
          (x[5] = n),
          (x[6] = o),
          (x[7] = s),
          (x[8] = d),
          (x[9] = c),
          (x[10] = u),
          (x[11] = m),
          (x[12] = f));
      } else
        ((n = x[5]),
          (o = x[6]),
          (s = x[7]),
          (d = x[8]),
          (c = x[9]),
          (u = x[10]),
          (m = x[11]),
          (f = x[12]));
      return f !== Symbol.for("react.early_return_sentinel")
        ? f
        : (x[19] !== n || x[20] !== o
            ? ((y = (0, t.jsx)("p", { className: n, children: o })),
              (x[19] = n),
              (x[20] = o),
              (x[21] = y))
            : (y = x[21]),
          x[22] !== y || x[23] !== s || x[24] !== d
            ? ((h = (0, t.jsxs)("div", { className: s, children: [d, y] })),
              (x[22] = y),
              (x[23] = s),
              (x[24] = d),
              (x[25] = h))
            : (h = x[25]),
          x[26] !== h || x[27] !== c || x[28] !== u || x[29] !== m
            ? ((p = (0, t.jsxs)("div", {
                "data-testid": c,
                className: u,
                children: [m, h],
              })),
              (x[26] = h),
              (x[27] = c),
              (x[28] = u),
              (x[29] = m),
              (x[30] = p))
            : (p = x[30]),
          p);
    },
  ]);
};
