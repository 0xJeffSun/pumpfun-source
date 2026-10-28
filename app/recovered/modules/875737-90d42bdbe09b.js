// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(732486),
    i = e.i(445242),
    r = e.i(745018),
    a = e.i(116549),
    n = e.i(813792),
    l = e.i(338319);
  function o(e) {
    return e.stopPropagation();
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
        p = (0, i.c)(19),
        { xUsername: b, twitterUrl: f, iconOnly: h, className: g } = e,
        y = void 0 !== h && h,
        v = (0, a.x)();
      if (p[0] !== f || p[1] !== b) {
        let e;
        (p[3] === Symbol.for("react.memo_cache_sentinel")
          ? ((e = /^@/), (p[3] = e))
          : (e = p[3]),
          (s = (
            b?.trim() ||
            (f
              ? (f
                  .trim()
                  .replace(/^https?:\/\/(www\.)?(x|twitter)\.com\//i, "")
                  .split(/[/?#]/)[0] ?? "")
              : "")
          ).replace(e, "")),
          (p[0] = f),
          (p[1] = b),
          (p[2] = s));
      } else s = p[2];
      let _ = s;
      if (!_) return null;
      let w = `@${_} on X`,
        N = `https://x.com/${encodeURIComponent(_)}`;
      return (
        p[4] !== g
          ? ((c = (0, l.c)(
              "relative z-[2] inline-flex shrink-0 items-center gap-1 text-text-tertiary transition-colors hover:text-text-primary",
              g,
            )),
            (p[4] = g),
            (p[5] = c))
          : (c = p[5]),
        p[6] === Symbol.for("react.memo_cache_sentinel")
          ? ((d = (0, t.jsx)(r.Tc, { className: "size-3 shrink-0" })),
            (p[6] = d))
          : (d = p[6]),
        p[7] !== _ || p[8] !== y
          ? ((m = y
              ? null
              : (0, t.jsxs)("span", {
                  className: "max-w-[96px] truncate text-xs leading-4",
                  children: ["@", _],
                })),
            (p[7] = _),
            (p[8] = y),
            (p[9] = m))
          : (m = p[9]),
        p[10] !== w || p[11] !== N || p[12] !== c || p[13] !== m
          ? ((x = (0, t.jsxs)("a", {
              href: N,
              target: "_blank",
              rel: "noreferrer",
              onClick: o,
              "aria-label": w,
              "data-testid": "user-x-badge",
              className: c,
              children: [d, m],
            })),
            (p[10] = w),
            (p[11] = N),
            (p[12] = c),
            (p[13] = m),
            (p[14] = x))
          : (x = p[14]),
        p[15] !== v || p[16] !== w || p[17] !== x
          ? ((u = (0, t.jsx)(n.f, { content: w, density: v, children: x })),
            (p[15] = v),
            (p[16] = w),
            (p[17] = x),
            (p[18] = u))
          : (u = p[18]),
        u
      );
    },
  ]);
};
