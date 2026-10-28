// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(732486),
    r = e.i(445242);
  e.i(12692);
  var n = e.i(398902),
    i = e.i(574588),
    a = e.i(592209),
    l = e.i(338319);
  e.s([
    "f",
    0,
    function (e) {
      let s,
        o,
        c,
        u,
        d,
        f,
        m,
        p,
        h = (0, r.c)(27),
        { unreadCount: g, muted: x, className: v, testId: y, spoken: b } = e,
        w = void 0 === y ? "dm-unread-badge" : y,
        _ = void 0 === b || b,
        { t: C, i18n: S } = (0, n.f)();
      if (g <= 0) return null;
      if (
        h[0] !== v ||
        h[1] !== S.language ||
        h[2] !== x ||
        h[3] !== C ||
        h[4] !== w ||
        h[5] !== g
      ) {
        let e = (0, a.v)(S.language) ?? "en",
          t = x
            ? "bg-bg-secondary text-text-secondary"
            : "bg-bg-accent text-text-on-accent";
        (h[11] !== v || h[12] !== t
          ? ((c = (0, l.c)(
              "inline-flex shrink-0 items-center justify-center rounded-full px-1.5 py-0.5 text-xs font-bold leading-none",
              t,
              v,
            )),
            (h[11] = v),
            (h[12] = t),
            (h[13] = c))
          : (c = h[13]),
          (u = x || void 0),
          (d = w),
          (s = !0),
          (o = (0, i.a)({ count: g, locale: e, t: C })),
          (h[0] = v),
          (h[1] = S.language),
          (h[2] = x),
          (h[3] = C),
          (h[4] = w),
          (h[5] = g),
          (h[6] = s),
          (h[7] = o),
          (h[8] = c),
          (h[9] = u),
          (h[10] = d));
      } else ((s = h[6]), (o = h[7]), (c = h[8]), (u = h[9]), (d = h[10]));
      return (
        h[14] !== s || h[15] !== o
          ? ((f = (0, t.jsx)("span", { "aria-hidden": s, children: o })),
            (h[14] = s),
            (h[15] = o),
            (h[16] = f))
          : (f = h[16]),
        h[17] !== _ || h[18] !== C || h[19] !== g
          ? ((m = _
              ? (0, t.jsx)("span", {
                  className: "sr-only",
                  children: C("chat.dms.inbox.row_unread_a11y", { count: g }),
                })
              : null),
            (h[17] = _),
            (h[18] = C),
            (h[19] = g),
            (h[20] = m))
          : (m = h[20]),
        h[21] !== c || h[22] !== u || h[23] !== d || h[24] !== f || h[25] !== m
          ? ((p = (0, t.jsxs)("span", {
              className: c,
              "data-muted": u,
              "data-testid": d,
              children: [f, m],
            })),
            (h[21] = c),
            (h[22] = u),
            (h[23] = d),
            (h[24] = f),
            (h[25] = m),
            (h[26] = p))
          : (p = h[26]),
        p
      );
    },
  ]);
};
