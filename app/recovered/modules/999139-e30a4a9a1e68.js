// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(732486),
    i = e.i(445242),
    s = e.i(745018);
  e.i(12692);
  var a = e.i(398902),
    r = e.i(338319),
    n = e.i(711454);
  function l(e) {
    e.stopPropagation();
  }
  e.s([
    "f",
    0,
    function (e) {
      let o,
        c,
        d,
        x,
        h,
        u,
        f,
        b,
        p = (0, i.c)(21),
        { data: m, sourceElement: y, className: v, iconClassName: g } = e,
        { t: w } = (0, a.f)();
      p[0] !== m || p[1] !== y
        ? ((o = { data: m, sourceElement: y }),
          (p[0] = m),
          (p[1] = y),
          (p[2] = o))
        : (o = p[2]);
      let { open: _, dialog: N } = (0, n.I)(o);
      p[3] !== w
        ? ((c = w("web.share.pnl_card_action_label")), (p[3] = w), (p[4] = c))
        : (c = p[4]);
      let A = c;
      return (
        p[5] !== _
          ? ((d = (e) => {
              (e.preventDefault(), e.stopPropagation(), _());
            }),
            (p[5] = _),
            (p[6] = d))
          : (d = p[6]),
        p[7] !== v
          ? ((x = (0, r.c)(
              "relative z-10 shrink-0 rounded-md p-1 text-text-tertiary transition-colors hover:bg-bg-tertiary hover:text-text-primary",
              v,
            )),
            (p[7] = v),
            (p[8] = x))
          : (x = p[8]),
        p[9] !== g
          ? ((h = (0, r.c)("size-3.5", g)), (p[9] = g), (p[10] = h))
          : (h = p[10]),
        p[11] !== h
          ? ((u = (0, t.jsx)(s.AS, { className: h, "aria-hidden": !0 })),
            (p[11] = h),
            (p[12] = u))
          : (u = p[12]),
        p[13] !== A || p[14] !== d || p[15] !== x || p[16] !== u
          ? ((f = (0, t.jsx)("button", {
              type: "button",
              "aria-label": A,
              title: A,
              "data-testid": "position-pnl-share",
              onClick: d,
              className: x,
              children: u,
            })),
            (p[13] = A),
            (p[14] = d),
            (p[15] = x),
            (p[16] = u),
            (p[17] = f))
          : (f = p[17]),
        p[18] !== N || p[19] !== f
          ? ((b = (0, t.jsxs)("span", {
              role: "presentation",
              onClick: l,
              className: "contents",
              children: [f, N],
            })),
            (p[18] = N),
            (p[19] = f),
            (p[20] = b))
          : (b = p[20]),
        b
      );
    },
  ]);
};
