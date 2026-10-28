// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(445242),
    r = e.i(352386),
    n = e.i(711902),
    a = e.i(462024),
    i = e.i(10355),
    o = e.i(279852),
    l = e.i(994598);
  function u(e) {
    return e.length >= o.f ? e : [...e, (0, i.r)("PUMP")];
  }
  e.s([
    "f",
    0,
    function () {
      let e,
        o,
        s,
        c,
        d,
        f,
        m,
        p = (0, t.c)(10);
      p[0] === Symbol.for("react.memo_cache_sentinel")
        ? ((e = [(0, i.r)("SOL")]), (p[0] = e))
        : (e = p[0]);
      let [h, b] = (0, r.useState)(e);
      p[1] === Symbol.for("react.memo_cache_sentinel")
        ? ((o = () => {
            b(u);
          }),
          (p[1] = o))
        : (o = p[1]);
      let v = o;
      p[2] === Symbol.for("react.memo_cache_sentinel")
        ? ((s = (e) => {
            b((t) => (t.length <= 1 ? t : t.filter((t) => t.id !== e)));
          }),
          (p[2] = s))
        : (s = p[2]);
      let g = s;
      p[3] === Symbol.for("react.memo_cache_sentinel")
        ? ((c = (e, t) => {
            b((r) => r.map((r) => (r.id === e ? { ...r, ...t } : r)));
          }),
          (p[3] = c))
        : (c = p[3]);
      let y = c;
      p[4] !== h
        ? ((d = (e) => {
            let {
              hasWallet: t,
              isPending: r,
              isPublished: i,
              getPoolMaxAmount: o,
            } = e;
            return (
              !r &&
              !!t &&
              !i &&
              0 !== h.length &&
              !((0, l.k)(h).size > 0) &&
              h.every((e) => {
                let t = Number(e.humanAmount || 0);
                if (
                  !(t > 0) ||
                  ("CUSTOM" === e.kind && !(0, n.l)(e.customMint)) ||
                  (0, a.j)((0, l.r)(e))
                )
                  return !1;
                let r = o?.(e);
                return null == r || !(t > r);
              })
            );
          }),
          (p[4] = h),
          (p[5] = d))
        : (d = p[5]);
      let x = d;
      p[6] === Symbol.for("react.memo_cache_sentinel")
        ? ((f = () => {
            b([(0, i.r)("SOL")]);
          }),
          (p[6] = f))
        : (f = p[6]);
      let w = f;
      return (
        p[7] !== x || p[8] !== h
          ? ((m = {
              pools: h,
              setPools: b,
              addPool: v,
              removePool: g,
              updatePool: y,
              canPublishWith: x,
              reset: w,
            }),
            (p[7] = x),
            (p[8] = h),
            (p[9] = m))
          : (m = p[9]),
        m
      );
    },
  ]);
};
