// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(445242),
    r = e.i(402732),
    a = e.i(778593);
  e.i(550675);
  var i = e.i(547562),
    l = e.i(53479);
  e.s([
    "f",
    0,
    function () {
      let e,
        n,
        o,
        s,
        d,
        c,
        u,
        f,
        m,
        p = (0, t.c)(32),
        b = (0, r.f)(),
        [h, v] = (0, i.l)("trading.quickBuy.useActivePreset"),
        [x, g] = (0, i.l)("trading.quickBuy.execution"),
        y = b && h,
        {
          activePreset: w,
          updateActivePreset: j,
          resetActivePreset: N,
        } = (0, a.f)();
      p[0] !== w || p[1] !== x || p[2] !== y
        ? ((e = y ? (0, l.$)(w) : x),
          (p[0] = w),
          (p[1] = x),
          (p[2] = y),
          (p[3] = e))
        : (e = p[3]);
      let R = e;
      p[4] !== g || p[5] !== j || p[6] !== y
        ? ((n = (e) => {
            y ? j(e) : g((t) => (0, l.W)({ ...t, ...e }));
          }),
          (p[4] = g),
          (p[5] = j),
          (p[6] = y),
          (p[7] = n))
        : (n = p[7]);
      let k = n;
      p[8] !== k
        ? ((o = (e) => k({ slippage: e ?? 0 })), (p[8] = k), (p[9] = o))
        : (o = p[9]);
      let _ = o;
      p[10] !== k
        ? ((s = (e) => k({ priorityFee: Math.max(e ?? 0, 0) })),
          (p[10] = k),
          (p[11] = s))
        : (s = p[11]);
      let A = s;
      p[12] !== k
        ? ((d = (e) => k({ tipAmount: Math.max(e ?? 0, 0) })),
          (p[12] = k),
          (p[13] = d))
        : (d = p[13]);
      let S = d;
      p[14] !== k
        ? ((c = (e) => k({ frontRunningProtection: e })),
          (p[14] = k),
          (p[15] = c))
        : (c = p[15]);
      let C = c;
      p[16] !== k
        ? ((u = (e) => k({ holdToConfirm: e })), (p[16] = k), (p[17] = u))
        : (u = p[17]);
      let I = u;
      p[18] !== N || p[19] !== g || p[20] !== y
        ? ((f = () => {
            y ? N() : g(l.d);
          }),
          (p[18] = N),
          (p[19] = g),
          (p[20] = y),
          (p[21] = f))
        : (f = p[21]);
      let T = f;
      return (
        p[22] !== T ||
        p[23] !== C ||
        p[24] !== I ||
        p[25] !== A ||
        p[26] !== _ ||
        p[27] !== S ||
        p[28] !== v ||
        p[29] !== R ||
        p[30] !== y
          ? ((m = {
              ...R,
              setSlippage: _,
              setPriorityFee: A,
              setTipAmount: S,
              setFrontRunningProtection: C,
              setHoldToConfirm: I,
              reset: T,
              usesActivePreset: y,
              setUsesActivePreset: v,
            }),
            (p[22] = T),
            (p[23] = C),
            (p[24] = I),
            (p[25] = A),
            (p[26] = _),
            (p[27] = S),
            (p[28] = v),
            (p[29] = R),
            (p[30] = y),
            (p[31] = m))
          : (m = p[31]),
        m
      );
    },
  ]);
};
