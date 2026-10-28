// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(732486),
    r = e.i(445242),
    i = e.i(745018),
    l = e.i(116549),
    o = e.i(813792),
    n = e.i(338319);
  function s(e) {
    return e.stopPropagation();
  }
  e.s([
    "f",
    0,
    function (e) {
      let a,
        c,
        d,
        u,
        f,
        p,
        m = (0, r.c)(19),
        { xUsername: h, twitterUrl: x, iconOnly: g, className: y } = e,
        w = void 0 !== g && g,
        b = (0, l.x)();
      if (m[0] !== x || m[1] !== h) {
        let e;
        (m[3] === Symbol.for("react.memo_cache_sentinel")
          ? ((e = /^@/), (m[3] = e))
          : (e = m[3]),
          (a = (
            h?.trim() ||
            (x
              ? (x
                  .trim()
                  .replace(/^https?:\/\/(www\.)?(x|twitter)\.com\//i, "")
                  .split(/[/?#]/)[0] ?? "")
              : "")
          ).replace(e, "")),
          (m[0] = x),
          (m[1] = h),
          (m[2] = a));
      } else a = m[2];
      let v = a;
      if (!v) return null;
      let j = `@${v} on X`,
        _ = `https://x.com/${encodeURIComponent(v)}`;
      return (
        m[4] !== y
          ? ((c = (0, n.c)(
              "relative z-[2] inline-flex shrink-0 items-center gap-1 text-text-tertiary transition-colors hover:text-text-primary",
              y,
            )),
            (m[4] = y),
            (m[5] = c))
          : (c = m[5]),
        m[6] === Symbol.for("react.memo_cache_sentinel")
          ? ((d = (0, t.jsx)(i.Tc, { className: "size-3 shrink-0" })),
            (m[6] = d))
          : (d = m[6]),
        m[7] !== v || m[8] !== w
          ? ((u = w
              ? null
              : (0, t.jsxs)("span", {
                  className: "max-w-[96px] truncate text-xs leading-4",
                  children: ["@", v],
                })),
            (m[7] = v),
            (m[8] = w),
            (m[9] = u))
          : (u = m[9]),
        m[10] !== j || m[11] !== _ || m[12] !== c || m[13] !== u
          ? ((f = (0, t.jsxs)("a", {
              href: _,
              target: "_blank",
              rel: "noreferrer",
              onClick: s,
              "aria-label": j,
              "data-testid": "user-x-badge",
              className: c,
              children: [d, u],
            })),
            (m[10] = j),
            (m[11] = _),
            (m[12] = c),
            (m[13] = u),
            (m[14] = f))
          : (f = m[14]),
        m[15] !== b || m[16] !== j || m[17] !== f
          ? ((p = (0, t.jsx)(o.f, { content: j, density: b, children: f })),
            (m[15] = b),
            (m[16] = j),
            (m[17] = f),
            (m[18] = p))
          : (p = m[18]),
        p
      );
    },
  ]);
};
