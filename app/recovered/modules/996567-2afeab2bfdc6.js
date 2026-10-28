// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(445242),
    i = e.i(402732),
    a = e.i(778593);
  e.i(550675);
  var n = e.i(547562),
    r = e.i(53479);
  e.s([
    "f",
    0,
    function () {
      let e,
        s,
        l,
        o,
        c,
        d,
        m,
        u,
        p,
        f = (0, t.c)(32),
        x = (0, i.f)(),
        [g, h] = (0, n.l)("trading.quickBuy.useActivePreset"),
        [b, y] = (0, n.l)("trading.quickBuy.execution"),
        v = x && g,
        {
          activePreset: w,
          updateActivePreset: _,
          resetActivePreset: k,
        } = (0, a.f)();
      f[0] !== w || f[1] !== b || f[2] !== v
        ? ((e = v ? (0, r.$)(w) : b),
          (f[0] = w),
          (f[1] = b),
          (f[2] = v),
          (f[3] = e))
        : (e = f[3]);
      let j = e;
      f[4] !== y || f[5] !== _ || f[6] !== v
        ? ((s = (e) => {
            v ? _(e) : y((t) => (0, r.W)({ ...t, ...e }));
          }),
          (f[4] = y),
          (f[5] = _),
          (f[6] = v),
          (f[7] = s))
        : (s = f[7]);
      let C = s;
      f[8] !== C
        ? ((l = (e) => C({ slippage: e ?? 0 })), (f[8] = C), (f[9] = l))
        : (l = f[9]);
      let N = l;
      f[10] !== C
        ? ((o = (e) => C({ priorityFee: Math.max(e ?? 0, 0) })),
          (f[10] = C),
          (f[11] = o))
        : (o = f[11]);
      let S = o;
      f[12] !== C
        ? ((c = (e) => C({ tipAmount: Math.max(e ?? 0, 0) })),
          (f[12] = C),
          (f[13] = c))
        : (c = f[13]);
      let P = c;
      f[14] !== C
        ? ((d = (e) => C({ frontRunningProtection: e })),
          (f[14] = C),
          (f[15] = d))
        : (d = f[15]);
      let V = d;
      f[16] !== C
        ? ((m = (e) => C({ holdToConfirm: e })), (f[16] = C), (f[17] = m))
        : (m = f[17]);
      let A = m;
      f[18] !== k || f[19] !== y || f[20] !== v
        ? ((u = () => {
            v ? k() : y(r.d);
          }),
          (f[18] = k),
          (f[19] = y),
          (f[20] = v),
          (f[21] = u))
        : (u = f[21]);
      let T = u;
      return (
        f[22] !== T ||
        f[23] !== V ||
        f[24] !== A ||
        f[25] !== S ||
        f[26] !== N ||
        f[27] !== P ||
        f[28] !== h ||
        f[29] !== j ||
        f[30] !== v
          ? ((p = {
              ...j,
              setSlippage: N,
              setPriorityFee: S,
              setTipAmount: P,
              setFrontRunningProtection: V,
              setHoldToConfirm: A,
              reset: T,
              usesActivePreset: v,
              setUsesActivePreset: h,
            }),
            (f[22] = T),
            (f[23] = V),
            (f[24] = A),
            (f[25] = S),
            (f[26] = N),
            (f[27] = P),
            (f[28] = h),
            (f[29] = j),
            (f[30] = v),
            (f[31] = p))
          : (p = f[31]),
        p
      );
    },
  ]);
};
