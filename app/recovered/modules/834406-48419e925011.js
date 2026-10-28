// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  "use strict";
  var i = e.i(732486),
    t = e.i(445242),
    a = e.i(745018),
    n = e.i(292686),
    l = e.i(322315),
    r = e.i(254010),
    s = e.i(426091),
    o = e.i(574472),
    u = e.i(458310),
    c = e.i(599077);
  e.i(12692);
  var f = e.i(398902),
    m = e.i(802630),
    d = e.i(409747),
    h = e.i(208912),
    g = e.i(468293),
    b = e.i(574588),
    p = e.i(592209);
  let v = (0, s.c)(m.q, "relative");
  e.s([
    "TopbarDmShortcut",
    0,
    function () {
      let e,
        s = (0, t.c)(13),
        { address: m } = (0, o.F)(),
        x = (0, r.k)(l.D.WEB_DIRECT_MESSAGES),
        S = (0, c.usePathname)(),
        { t: E, i18n: T } = (0, f.f)(),
        j = (0, d.f)();
      if (!x || !m) return null;
      if (s[0] !== T.language || s[1] !== S || s[2] !== E || s[3] !== j) {
        let t,
          l,
          r,
          o,
          c = (0, p.v)(T.language) ?? "en";
        s[5] !== S
          ? ((t = S === g.f || S.startsWith(`${g.f}/`)), (s[5] = S), (s[6] = t))
          : (t = s[6]);
        let f = t;
        (s[7] !== f
          ? ((l = f
              ? void 0
              : (0, h.L)({ pathname: g.f, entryPoint: n.z.UNSPECIFIED })),
            (s[7] = f),
            (s[8] = l))
          : (l = s[8]),
          s[9] !== E || s[10] !== j
            ? ((r =
                j > 0
                  ? E("web.nav.messages_unread", { count: j })
                  : E("web.nav.messages")),
              (s[9] = E),
              (s[10] = j),
              (s[11] = r))
            : (r = s[11]),
          s[12] === Symbol.for("react.memo_cache_sentinel")
            ? ((o = (0, i.jsx)(a.t7, { size: 16 })), (s[12] = o))
            : (o = s[12]),
          (e = (0, i.jsxs)(u.default, {
            href: g.f,
            onClick: l,
            "aria-label": r,
            "aria-current": f ? "page" : void 0,
            className: v,
            children: [
              o,
              j > 0
                ? (0, i.jsx)("span", {
                    "aria-hidden": !0,
                    className:
                      "absolute -right-1 -top-1 flex min-h-4 min-w-4 items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-semibold text-white",
                    children: (0, b.a)({ count: j, locale: c, t: E }),
                  })
                : null,
            ],
          })),
          (s[0] = T.language),
          (s[1] = S),
          (s[2] = E),
          (s[3] = j),
          (s[4] = e));
      } else e = s[4];
      return e;
    },
  ]);
};
