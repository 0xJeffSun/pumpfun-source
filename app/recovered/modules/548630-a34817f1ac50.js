// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(732486),
    r = e.i(445242),
    n = e.i(745018),
    i = e.i(439587),
    l = e.i(93074),
    a = e.i(426091);
  e.i(12692);
  var o = e.i(398902),
    s = e.i(402732),
    u = e.i(487832);
  function d(e) {
    let l,
      s,
      d,
      c,
      p,
      f = (0, r.c)(20),
      {
        section: m,
        settingId: g,
        onBeforeOpen: h,
        className: y,
        variant: _,
      } = e,
      { t: v } = (0, o.f)();
    f[0] !== h || f[1] !== m || f[2] !== g
      ? ((l = () => {
          (h?.(), (0, u.v)({ section: m, settingId: g }));
        }),
        (f[0] = h),
        (f[1] = m),
        (f[2] = g),
        (f[3] = l))
      : (l = f[3]);
    let w = l;
    if ("button" === (void 0 === _ ? "link" : _)) {
      let e, r, l;
      return (
        f[4] === Symbol.for("react.memo_cache_sentinel")
          ? ((e = (0, t.jsx)(n.kK, { className: "!size-3" })), (f[4] = e))
          : (e = f[4]),
        f[5] !== v
          ? ((r = v("web.settings.all_settings")), (f[5] = v), (f[6] = r))
          : (r = f[6]),
        f[7] !== y || f[8] !== w || f[9] !== r
          ? ((l = (0, t.jsx)(i.K, {
              variant: "ghost",
              size: 32,
              onClick: w,
              "data-testid": "all-settings-link",
              iconEnd: e,
              className: y,
              children: r,
            })),
            (f[7] = y),
            (f[8] = w),
            (f[9] = r),
            (f[10] = l))
          : (l = f[10]),
        l
      );
    }
    return (
      f[11] !== y
        ? ((s = (0, a.c)(
            "flex items-center gap-1 text-xs font-medium text-text-tertiary transition-colors hover:text-text-primary",
            y,
          )),
          (f[11] = y),
          (f[12] = s))
        : (s = f[12]),
      f[13] !== v
        ? ((d = v("web.settings.all_settings")), (f[13] = v), (f[14] = d))
        : (d = f[14]),
      f[15] === Symbol.for("react.memo_cache_sentinel")
        ? ((c = (0, t.jsx)(n.kK, { className: "size-3" })), (f[15] = c))
        : (c = f[15]),
      f[16] !== w || f[17] !== s || f[18] !== d
        ? ((p = (0, t.jsxs)("button", {
            type: "button",
            onClick: w,
            "data-testid": "all-settings-link",
            className: s,
            children: [d, c],
          })),
          (f[16] = w),
          (f[17] = s),
          (f[18] = d),
          (f[19] = p))
        : (p = f[19]),
      p
    );
  }
  function c(e) {
    let n,
      i,
      a = (0, r.c)(8),
      { section: o, settingId: s, onBeforeOpen: d, children: c } = e;
    return (
      a[0] !== d || a[1] !== o || a[2] !== s
        ? ((n = () => {
            (d?.(), (0, u.v)({ section: o, settingId: s }));
          }),
          (a[0] = d),
          (a[1] = o),
          (a[2] = s),
          (a[3] = n))
        : (n = a[3]),
      a[4] !== c || a[5] !== s || a[6] !== n
        ? ((i = (0, t.jsx)(l.M, {
            "data-testid": "settings-hub-trigger",
            "data-setting-target": s,
            onClick: n,
            children: c,
          })),
          (a[4] = c),
          (a[5] = s),
          (a[6] = n),
          (a[7] = i))
        : (i = a[7]),
      i
    );
  }
  e.s([
    "E",
    0,
    function (e) {
      let n,
        i = (0, r.c)(3),
        l = (0, s.f)();
      return (
        i[0] !== l || i[1] !== e
          ? ((n = l ? (0, t.jsx)(d, { ...e }) : null),
            (i[0] = l),
            (i[1] = e),
            (i[2] = n))
          : (n = i[2]),
        n
      );
    },
    "S",
    0,
    function (e) {
      let n,
        i = (0, r.c)(7),
        {
          section: l,
          settingId: a,
          trigger: o,
          children: u,
          onBeforeOpen: d,
        } = e,
        p = (0, s.f)();
      return (
        i[0] !== u ||
        i[1] !== p ||
        i[2] !== d ||
        i[3] !== l ||
        i[4] !== a ||
        i[5] !== o
          ? ((n = p
              ? (0, t.jsx)(c, {
                  section: l,
                  settingId: a,
                  onBeforeOpen: d,
                  children: o,
                })
              : (0, t.jsx)(t.Fragment, { children: u })),
            (i[0] = u),
            (i[1] = p),
            (i[2] = d),
            (i[3] = l),
            (i[4] = a),
            (i[5] = o),
            (i[6] = n))
          : (n = i[6]),
        n
      );
    },
  ]);
};
