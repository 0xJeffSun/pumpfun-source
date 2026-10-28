// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(732486),
    i = e.i(445242),
    a = e.i(745018);
  e.i(12692);
  var n = e.i(398902),
    r = e.i(116549),
    s = e.i(753192),
    l = e.i(441315),
    o = e.i(764844),
    c = e.i(45329);
  let d = [
    {
      headingKey: "web.screeners.style_frames",
      choices: [
        {
          labelKey: "web.screeners.style_framed",
          patch: { frame: "framed" },
          isActive: (e) => "framed" === e.frame,
        },
        {
          labelKey: "web.screeners.style_flat",
          patch: { frame: "flat" },
          isActive: (e) => "flat" === e.frame,
        },
      ],
    },
    {
      headingKey: "web.screeners.style_accents",
      choices: [
        {
          labelKey: "web.screeners.style_colored",
          patch: { accents: !0 },
          isActive: (e) => e.accents,
        },
        {
          labelKey: "web.screeners.style_monochrome",
          patch: { accents: !1 },
          isActive: (e) => !e.accents,
        },
      ],
    },
    {
      headingKey: "web.screeners.style_density",
      choices: [
        {
          labelKey: "web.screeners.style_comfy",
          patch: { density: "comfy" },
          isActive: (e) => "comfy" === e.density,
        },
        {
          labelKey: "web.screeners.style_compact",
          patch: { density: "compact" },
          isActive: (e) => "compact" === e.density,
        },
      ],
    },
    {
      headingKey: "web.screeners.style_width",
      choices: [
        {
          labelKey: "web.screeners.style_narrow",
          patch: { columnWidth: "narrow" },
          isActive: (e) => "narrow" === e.columnWidth,
        },
        {
          labelKey: "web.screeners.style_normal",
          patch: { columnWidth: "normal" },
          isActive: (e) => "normal" === e.columnWidth,
        },
        {
          labelKey: "web.screeners.style_wide",
          patch: { columnWidth: "wide" },
          isActive: (e) => "wide" === e.columnWidth,
        },
      ],
    },
  ];
  function m(e) {
    return e.style;
  }
  e.s([
    "U",
    0,
    d,
    "s",
    0,
    function () {
      let e,
        u,
        p,
        f,
        x,
        g,
        h,
        b,
        y = (0, i.c)(21),
        { t: v } = (0, n.f)(),
        w = (0, r.x)(),
        _ = (0, c.V)(m),
        { setStyle: k } = (0, s.f)();
      (y[0] !== v
        ? ((e = v("web.screeners.customize_board")), (y[0] = v), (y[1] = e))
        : (e = y[1]),
        y[2] === Symbol.for("react.memo_cache_sentinel")
          ? ((u = (0, t.jsx)(a.cL, { "aria-hidden": !0 })), (y[2] = u))
          : (u = y[2]),
        y[3] !== v
          ? ((p = v("web.screeners.customize")), (y[3] = v), (y[4] = p))
          : (p = y[4]),
        y[5] !== w || y[6] !== p
          ? ((f = (0, t.jsx)(l.p, {
              density: w,
              variant: "outlined",
              leading: u,
              trailing: !0,
              className:
                "data-[popup-open]:bg-bg-tertiary data-[popup-open]:text-text-primary",
              children: p,
            })),
            (y[5] = w),
            (y[6] = p),
            (y[7] = f))
          : (f = y[7]),
        y[8] !== e || y[9] !== f
          ? ((x = (0, t.jsx)(o.g, {
              "data-testid": "screeners-style-menu",
              "aria-label": e,
              render: f,
            })),
            (y[8] = e),
            (y[9] = f),
            (y[10] = x))
          : (x = y[10]));
      let j = "terminal" === w;
      return (
        y[11] !== k || y[12] !== _ || y[13] !== v
          ? ((g = d.map((e) =>
              (0, t.jsxs)(
                o.F,
                {
                  children: [
                    (0, t.jsx)(o.U, { children: v(e.headingKey) }),
                    e.choices.map((e) =>
                      (0, t.jsx)(
                        o.d,
                        {
                          closeOnClick: !1,
                          active: e.isActive(_),
                          onClick: () => k(e.patch),
                          children: v(e.labelKey),
                        },
                        e.labelKey,
                      ),
                    ),
                  ],
                },
                e.headingKey,
              ),
            )),
            (y[11] = k),
            (y[12] = _),
            (y[13] = v),
            (y[14] = g))
          : (g = y[14]),
        y[15] !== j || y[16] !== g
          ? ((h = (0, t.jsx)(o.A, {
              align: "end",
              dense: j,
              className: "min-w-52",
              children: g,
            })),
            (y[15] = j),
            (y[16] = g),
            (y[17] = h))
          : (h = y[17]),
        y[18] !== x || y[19] !== h
          ? ((b = (0, t.jsxs)(o.k, { modal: !1, children: [x, h] })),
            (y[18] = x),
            (y[19] = h),
            (y[20] = b))
          : (b = y[20]),
        b
      );
    },
  ]);
};
