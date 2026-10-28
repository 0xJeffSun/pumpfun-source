// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  "use strict";
  var t = e.i(732486),
    s = e.i(445242),
    i = e.i(599077),
    a = e.i(352386),
    c = e.i(133244),
    l = e.i(944001),
    n = e.i(310766),
    m = e.i(314982);
  let u = (e) => {
    let i,
      c,
      l,
      u,
      r,
      o = (0, s.c)(10);
    o[0] !== e
      ? (({ isUnlocked: i, eager: l, ...c } = e),
        (o[0] = e),
        (o[1] = i),
        (o[2] = c),
        (o[3] = l))
      : ((i = o[1]), (c = o[2]), (l = o[3]));
    let h = void 0 !== l && l,
      b = (0, a.useRef)(null),
      j = i && !h;
    o[4] !== j ? ((u = { enabled: j }), (o[4] = j), (o[5] = u)) : (u = o[5]);
    let f = ((e, t, i) => {
      let c,
        l,
        n = (0, s.c)(6),
        [m, u] = (0, a.useState)(!1),
        r = i?.enabled ?? !0;
      return (
        n[0] !== r || n[1] !== m || n[2] !== e || n[3] !== t
          ? ((c = () => {
              if (!r || m || !e.current) return;
              let s = new IntersectionObserver(
                (e) => {
                  let [t] = e;
                  t.isIntersecting && (u(!0), s.disconnect());
                },
                { rootMargin: `${Math.floor(t / 2)}px` },
              );
              return (s.observe(e.current), () => s.disconnect());
            }),
            (l = [r, m, e, t]),
            (n[0] = r),
            (n[1] = m),
            (n[2] = e),
            (n[3] = t),
            (n[4] = c),
            (n[5] = l))
          : ((c = n[4]), (l = n[5])),
        (0, a.useEffect)(c, l),
        m
      );
    })(b, n.R, u);
    if (!i) return null;
    if (!h && !f) {
      let e;
      return (
        o[6] === Symbol.for("react.memo_cache_sentinel")
          ? ((e = (0, t.jsx)(m.SectionSkeleton, {
              ref: b,
              className: "opacity-0",
            })),
            (o[6] = e))
          : (e = o[6]),
        e
      );
    }
    return (
      o[7] !== h || o[8] !== c
        ? ((r = (0, t.jsx)(n.Z, { ...c, eager: h })),
          (o[7] = h),
          (o[8] = c),
          (o[9] = r))
        : (r = o[9]),
      r
    );
  };
  var r = e.i(327294),
    o = e.i(745018),
    h = e.i(574472),
    b = e.i(170450),
    j = e.i(554056);
  let f = () => {
    let e,
      i,
      c,
      l = (0, s.c)(4),
      { address: n } = (0, h.F)(),
      m = (0, b.f)(),
      [u, r] = (0, a.useState)(!1);
    l[0] === Symbol.for("react.memo_cache_sentinel")
      ? ((e = () => {
          r(!0);
        }),
        (l[0] = e))
      : (e = l[0]);
    let f = e;
    return m && n
      ? (l[1] === Symbol.for("react.memo_cache_sentinel")
          ? ((i = (0, t.jsx)("button", {
              onClick: f,
              className:
                "flex items-center justify-center gap-2 rounded-full bg-bg-accent text-text-inverse p-2 hover:scale-105 active:scale-95 transition-all duration-200 shadow hover:shadow-xl border border-text-accent-muted",
              type: "button",
              children: (0, t.jsx)(o.wP, {
                className: "h-6 w-6 text-text-accent-muted",
              }),
            })),
            (l[1] = i))
          : (i = l[1]),
        l[2] !== u
          ? ((c = (0, t.jsxs)("div", {
              className: "fixed bottom-5 right-6 z-50",
              children: [i, (0, t.jsx)(j.f, { isOpen: u, onOpenChange: r })],
            })),
            (l[2] = u),
            (l[3] = c))
          : (c = l[3]),
        c)
      : null;
  };
  var d = e.i(79472);
  function k() {
    return new Set();
  }
  e.s(
    [
      "LiveHomepage",
      0,
      (e) => {
        let n,
          m,
          o,
          h,
          b,
          j = (0, s.c)(12),
          { initialHeroData: x, initialSectionData: v } = e,
          g = (0, i.useRouter)(),
          p = (0, d.V)(),
          [y, _] = (0, a.useState)(k);
        j[0] === Symbol.for("react.memo_cache_sentinel")
          ? ((n = (e) => {
              _((t) => new Set(t).add(e));
            }),
            (j[0] = n))
          : (n = j[0]);
        let w = n;
        if (p) {
          let e;
          return (
            j[1] === Symbol.for("react.memo_cache_sentinel")
              ? ((e = (0, t.jsx)("div", {
                  className: "flex min-h-[50vh] items-center justify-center",
                  children: (0, t.jsx)(r.LivestreamBlockedMessage, {
                    className: "max-w-sm",
                  }),
                })),
                (j[1] = e))
              : (e = j[1]),
            e
          );
        }
        return (
          j[2] === Symbol.for("react.memo_cache_sentinel")
            ? ((m = (0, t.jsx)(f, {})), (j[2] = m))
            : (m = j[2]),
          j[3] !== x
            ? ((o = (0, t.jsx)(c._, { initialData: x })),
              (j[3] = x),
              (j[4] = o))
            : (o = j[4]),
          j[5] !== y || j[6] !== v || j[7] !== g
            ? ((h = l.Z.map((e, s) =>
                (0, t.jsx)(
                  u,
                  {
                    sectionId: e.id,
                    titleKey: e.titleKey,
                    subtitleKey: e.subtitleKey,
                    onShowAll: () => g.push(`/live/${e.id}`),
                    useFetch: e.useFetch,
                    isUnlocked: 0 === s || y.has(l.Z[s - 1].id),
                    onSectionComplete: w,
                    initialData: v?.[s],
                    eager: s < 2,
                  },
                  e.id,
                ),
              )),
              (j[5] = y),
              (j[6] = v),
              (j[7] = g),
              (j[8] = h))
            : (h = j[8]),
          j[9] !== o || j[10] !== h
            ? ((b = (0, t.jsxs)(t.Fragment, {
                children: [
                  m,
                  (0, t.jsxs)("div", {
                    className: "pb-8 flex flex-col gap-8",
                    children: [o, h],
                  }),
                ],
              })),
              (j[9] = o),
              (j[10] = h),
              (j[11] = b))
            : (b = j[11]),
          b
        );
      },
    ],
    31113,
  );
};
