// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(732486),
    l = e.i(445242),
    n = e.i(745018);
  e.i(12692);
  var a = e.i(398902),
    s = e.i(116549),
    r = e.i(753192),
    i = e.i(441315),
    d = e.i(764844),
    c = e.i(45329);
  let o = [
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
  function u(e) {
    return e.style;
  }
  e.s([
    "U",
    0,
    o,
    "s",
    0,
    function () {
      let e,
        p,
        m,
        h,
        x,
        f,
        g,
        b,
        y = (0, l.c)(21),
        { t: v } = (0, a.f)(),
        w = (0, s.x)(),
        _ = (0, c.V)(u),
        { setStyle: j } = (0, r.f)();
      (y[0] !== v
        ? ((e = v("web.screeners.customize_board")), (y[0] = v), (y[1] = e))
        : (e = y[1]),
        y[2] === Symbol.for("react.memo_cache_sentinel")
          ? ((p = (0, t.jsx)(n.cL, { "aria-hidden": !0 })), (y[2] = p))
          : (p = y[2]),
        y[3] !== v
          ? ((m = v("web.screeners.customize")), (y[3] = v), (y[4] = m))
          : (m = y[4]),
        y[5] !== w || y[6] !== m
          ? ((h = (0, t.jsx)(i.p, {
              density: w,
              variant: "outlined",
              leading: p,
              trailing: !0,
              className:
                "data-[popup-open]:bg-bg-tertiary data-[popup-open]:text-text-primary",
              children: m,
            })),
            (y[5] = w),
            (y[6] = m),
            (y[7] = h))
          : (h = y[7]),
        y[8] !== e || y[9] !== h
          ? ((x = (0, t.jsx)(d.g, {
              "data-testid": "screeners-style-menu",
              "aria-label": e,
              render: h,
            })),
            (y[8] = e),
            (y[9] = h),
            (y[10] = x))
          : (x = y[10]));
      let C = "terminal" === w;
      return (
        y[11] !== j || y[12] !== _ || y[13] !== v
          ? ((f = o.map((e) =>
              (0, t.jsxs)(
                d.F,
                {
                  children: [
                    (0, t.jsx)(d.U, { children: v(e.headingKey) }),
                    e.choices.map((e) =>
                      (0, t.jsx)(
                        d.d,
                        {
                          closeOnClick: !1,
                          active: e.isActive(_),
                          onClick: () => j(e.patch),
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
            (y[11] = j),
            (y[12] = _),
            (y[13] = v),
            (y[14] = f))
          : (f = y[14]),
        y[15] !== C || y[16] !== f
          ? ((g = (0, t.jsx)(d.A, {
              align: "end",
              dense: C,
              className: "min-w-52",
              children: f,
            })),
            (y[15] = C),
            (y[16] = f),
            (y[17] = g))
          : (g = y[17]),
        y[18] !== x || y[19] !== g
          ? ((b = (0, t.jsxs)(d.k, { modal: !1, children: [x, g] })),
            (y[18] = x),
            (y[19] = g),
            (y[20] = b))
          : (b = y[20]),
        b
      );
    },
  ]);
};
