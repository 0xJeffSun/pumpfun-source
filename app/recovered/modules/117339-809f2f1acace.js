// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(445242),
    r = e.i(536925),
    n = e.i(605587);
  let i = (e) =>
      "object" != typeof e || null === e || Array.isArray(e) ? {} : e,
    a = (e) => {
      if (!Array.isArray(e)) return [];
      let t = new Set();
      return e.filter((e) => {
        if ("object" != typeof e || null === e || "string" != typeof e.mint)
          return !1;
        let r = (0, n.c)(e.mint);
        return !t.has(r) && (t.add(r), !0);
      });
    },
    l = ({ times: e, mint: t }) => {
      let r = (0, n.c)(t),
        i = Object.entries(e).flatMap(([e, t]) =>
          (0, n.c)(e) === r && Number.isFinite(t) ? [t] : [],
        );
      return 0 === i.length ? void 0 : Math.max(...i);
    };
  e.s([
    "U",
    0,
    () => {
      let e,
        s,
        o,
        c,
        u,
        d,
        f,
        m = (0, t.c)(17);
      m[0] === Symbol.for("react.memo_cache_sentinel")
        ? ((e = []), (m[0] = e))
        : (e = m[0]);
      let [p, h] = (0, r.j)("recently-viewed-coins", e);
      m[1] === Symbol.for("react.memo_cache_sentinel")
        ? ((s = {}), (m[1] = s))
        : (s = m[1]);
      let [g, x] = (0, r.j)("recently-viewed-coin-times", s);
      m[2] !== p ? ((o = a(p)), (m[2] = p), (m[3] = o)) : (o = m[3]);
      let v = o;
      m[4] !== g ? ((c = i(g)), (m[4] = g), (m[5] = c)) : (c = m[5]);
      let y = c;
      m[6] !== h || m[7] !== x
        ? ((u = (e) => {
            let t = [];
            (h(
              (r) =>
                (t = (({ coins: e, coin: t }) => {
                  let r = (0, n.c)(t.mint);
                  return [
                    t,
                    ...a(e).filter((e) => (0, n.c)(e.mint) !== r),
                  ].slice(0, 10);
                })({ coins: r, coin: e })),
            ),
              x((r) =>
                (({ times: e, kept: t, viewed: r, now: a }) => {
                  let s = i(e);
                  return {
                    ...Object.fromEntries(
                      t.flatMap((e) => {
                        let t = l({ times: s, mint: e.mint });
                        return void 0 === t ? [] : [[(0, n.c)(e.mint), t]];
                      }),
                    ),
                    [(0, n.c)(r.mint)]: a,
                  };
                })({ times: r, kept: t, viewed: e, now: Date.now() }),
              ));
          }),
          (m[6] = h),
          (m[7] = x),
          (m[8] = u))
        : (u = m[8]);
      let b = u;
      m[9] !== h || m[10] !== x
        ? ((d = () => {
            (h([]), x({}));
          }),
          (m[9] = h),
          (m[10] = x),
          (m[11] = d))
        : (d = m[11]);
      let w = d;
      return (
        m[12] !== b || m[13] !== w || m[14] !== v || m[15] !== y
          ? ((f = [v, b, w, y]),
            (m[12] = b),
            (m[13] = w),
            (m[14] = v),
            (m[15] = y),
            (m[16] = f))
          : (f = m[16]),
        f
      );
    },
    "A",
    0,
    l,
  ]);
};
