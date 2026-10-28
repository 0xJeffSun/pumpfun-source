// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(732486),
    i = e.i(445242),
    r = e.i(745018);
  e.i(12692);
  var a = e.i(398902),
    n = e.i(338319),
    l = e.i(711454);
  function o(e) {
    e.stopPropagation();
  }
  e.s([
    "f",
    0,
    function (e) {
      let s,
        d,
        c,
        u,
        p,
        m,
        x,
        b,
        f = (0, i.c)(21),
        { data: h, sourceElement: v, className: y, iconClassName: g } = e,
        { t: _ } = (0, a.f)();
      f[0] !== h || f[1] !== v
        ? ((s = { data: h, sourceElement: v }),
          (f[0] = h),
          (f[1] = v),
          (f[2] = s))
        : (s = f[2]);
      let { open: w, dialog: k } = (0, l.I)(s);
      f[3] !== _
        ? ((d = _("web.share.pnl_card_action_label")), (f[3] = _), (f[4] = d))
        : (d = f[4]);
      let N = d;
      return (
        f[5] !== w
          ? ((c = (e) => {
              (e.preventDefault(), e.stopPropagation(), w());
            }),
            (f[5] = w),
            (f[6] = c))
          : (c = f[6]),
        f[7] !== y
          ? ((u = (0, n.c)(
              "relative z-10 shrink-0 rounded-md p-1 text-text-tertiary transition-colors hover:bg-bg-tertiary hover:text-text-primary",
              y,
            )),
            (f[7] = y),
            (f[8] = u))
          : (u = f[8]),
        f[9] !== g
          ? ((p = (0, n.c)("size-3.5", g)), (f[9] = g), (f[10] = p))
          : (p = f[10]),
        f[11] !== p
          ? ((m = (0, t.jsx)(r.AS, { className: p, "aria-hidden": !0 })),
            (f[11] = p),
            (f[12] = m))
          : (m = f[12]),
        f[13] !== N || f[14] !== c || f[15] !== u || f[16] !== m
          ? ((x = (0, t.jsx)("button", {
              type: "button",
              "aria-label": N,
              title: N,
              "data-testid": "position-pnl-share",
              onClick: c,
              className: u,
              children: m,
            })),
            (f[13] = N),
            (f[14] = c),
            (f[15] = u),
            (f[16] = m),
            (f[17] = x))
          : (x = f[17]),
        f[18] !== k || f[19] !== x
          ? ((b = (0, t.jsxs)("span", {
              role: "presentation",
              onClick: o,
              className: "contents",
              children: [x, k],
            })),
            (f[18] = k),
            (f[19] = x),
            (f[20] = b))
          : (b = f[20]),
        b
      );
    },
  ]);
};
