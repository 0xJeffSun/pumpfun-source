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
        c,
        d,
        m,
        x,
        u,
        p,
        b,
        f = (0, i.c)(21),
        { data: h, sourceElement: g, className: y, iconClassName: v } = e,
        { t: _ } = (0, a.f)();
      f[0] !== h || f[1] !== g
        ? ((s = { data: h, sourceElement: g }),
          (f[0] = h),
          (f[1] = g),
          (f[2] = s))
        : (s = f[2]);
      let { open: w, dialog: N } = (0, l.I)(s);
      f[3] !== _
        ? ((c = _("web.share.pnl_card_action_label")), (f[3] = _), (f[4] = c))
        : (c = f[4]);
      let k = c;
      return (
        f[5] !== w
          ? ((d = (e) => {
              (e.preventDefault(), e.stopPropagation(), w());
            }),
            (f[5] = w),
            (f[6] = d))
          : (d = f[6]),
        f[7] !== y
          ? ((m = (0, n.c)(
              "relative z-10 shrink-0 rounded-md p-1 text-text-tertiary transition-colors hover:bg-bg-tertiary hover:text-text-primary",
              y,
            )),
            (f[7] = y),
            (f[8] = m))
          : (m = f[8]),
        f[9] !== v
          ? ((x = (0, n.c)("size-3.5", v)), (f[9] = v), (f[10] = x))
          : (x = f[10]),
        f[11] !== x
          ? ((u = (0, t.jsx)(r.AS, { className: x, "aria-hidden": !0 })),
            (f[11] = x),
            (f[12] = u))
          : (u = f[12]),
        f[13] !== k || f[14] !== d || f[15] !== m || f[16] !== u
          ? ((p = (0, t.jsx)("button", {
              type: "button",
              "aria-label": k,
              title: k,
              "data-testid": "position-pnl-share",
              onClick: d,
              className: m,
              children: u,
            })),
            (f[13] = k),
            (f[14] = d),
            (f[15] = m),
            (f[16] = u),
            (f[17] = p))
          : (p = f[17]),
        f[18] !== N || f[19] !== p
          ? ((b = (0, t.jsxs)("span", {
              role: "presentation",
              onClick: o,
              className: "contents",
              children: [p, N],
            })),
            (f[18] = N),
            (f[19] = p),
            (f[20] = b))
          : (b = f[20]),
        b
      );
    },
  ]);
};
