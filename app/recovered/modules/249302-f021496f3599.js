// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(732486),
    r = e.i(445242),
    n = e.i(745018),
    i = e.i(426091),
    s = e.i(458310);
  e.i(12692);
  var a = e.i(398902),
    o = e.i(640821);
  let l = (e) => `/moderation/bounties/${encodeURIComponent(e)}`;
  e.s([
    "B",
    0,
    function (e) {
      let u,
        d,
        c,
        f,
        m,
        p,
        w,
        g,
        b,
        h,
        v = (0, r.c)(20);
      v[0] !== e
        ? (({ taskId: f, className: u, onClick: c, ...d } = e),
          (v[0] = e),
          (v[1] = u),
          (v[2] = d),
          (v[3] = c),
          (v[4] = f))
        : ((u = v[1]), (d = v[2]), (c = v[3]), (f = v[4]));
      let { t: y } = (0, a.f)();
      return (0, o.f)()
        ? (v[5] !== u
            ? ((m = (0, i.c)(
                "inline-flex w-auto items-center gap-1 rounded-full border border-bg-accent/35 bg-bg-accent/10 px-2 py-1 text-[11px] font-semibold text-text-primary transition-colors hover:bg-bg-accent/20",
                u,
              )),
              (v[5] = u),
              (v[6] = m))
            : (m = v[6]),
          v[7] !== f ? ((p = l(f)), (v[7] = f), (v[8] = p)) : (p = v[8]),
          v[9] !== c
            ? ((w = (e) => {
                (c?.(e), e.stopPropagation());
              }),
              (v[9] = c),
              (v[10] = w))
            : (w = v[10]),
          v[11] === Symbol.for("react.memo_cache_sentinel")
            ? ((g = (0, t.jsx)(n.Iv, { className: "size-3.5" })), (v[11] = g))
            : (g = v[11]),
          v[12] !== y
            ? ((b = y("web.bounties.moderation")), (v[12] = y), (v[13] = b))
            : (b = v[13]),
          v[14] !== d ||
          v[15] !== m ||
          v[16] !== p ||
          v[17] !== w ||
          v[18] !== b
            ? ((h = (0, t.jsxs)(s.default, {
                ...d,
                className: m,
                href: p,
                onClick: w,
                children: [g, b],
              })),
              (v[14] = d),
              (v[15] = m),
              (v[16] = p),
              (v[17] = w),
              (v[18] = b),
              (v[19] = h))
            : (h = v[19]),
          h)
        : null;
    },
    "L",
    0,
    l,
  ]);
};
