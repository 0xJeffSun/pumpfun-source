// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(445242),
    n = e.i(402732),
    l = e.i(778593);
  e.i(550675);
  var i = e.i(547562),
    a = e.i(53479);
  e.s([
    "f",
    0,
    function () {
      let e,
        r,
        s,
        o,
        u,
        c,
        d,
        m,
        b,
        f = (0, t.c)(32),
        y = (0, n.f)(),
        [h, v] = (0, i.l)("trading.quickBuy.useActivePreset"),
        [p, g] = (0, i.l)("trading.quickBuy.execution"),
        x = y && h,
        {
          activePreset: _,
          updateActivePreset: k,
          resetActivePreset: w,
        } = (0, l.f)();
      f[0] !== _ || f[1] !== p || f[2] !== x
        ? ((e = x ? (0, a.$)(_) : p),
          (f[0] = _),
          (f[1] = p),
          (f[2] = x),
          (f[3] = e))
        : (e = f[3]);
      let S = e;
      f[4] !== g || f[5] !== k || f[6] !== x
        ? ((r = (e) => {
            x ? k(e) : g((t) => (0, a.W)({ ...t, ...e }));
          }),
          (f[4] = g),
          (f[5] = k),
          (f[6] = x),
          (f[7] = r))
        : (r = f[7]);
      let N = r;
      f[8] !== N
        ? ((s = (e) => N({ slippage: e ?? 0 })), (f[8] = N), (f[9] = s))
        : (s = f[9]);
      let q = s;
      f[10] !== N
        ? ((o = (e) => N({ priorityFee: Math.max(e ?? 0, 0) })),
          (f[10] = N),
          (f[11] = o))
        : (o = f[11]);
      let C = o;
      f[12] !== N
        ? ((u = (e) => N({ tipAmount: Math.max(e ?? 0, 0) })),
          (f[12] = N),
          (f[13] = u))
        : (u = f[13]);
      let I = u;
      f[14] !== N
        ? ((c = (e) => N({ frontRunningProtection: e })),
          (f[14] = N),
          (f[15] = c))
        : (c = f[15]);
      let j = c;
      f[16] !== N
        ? ((d = (e) => N({ holdToConfirm: e })), (f[16] = N), (f[17] = d))
        : (d = f[17]);
      let $ = d;
      f[18] !== w || f[19] !== g || f[20] !== x
        ? ((m = () => {
            x ? w() : g(a.d);
          }),
          (f[18] = w),
          (f[19] = g),
          (f[20] = x),
          (f[21] = m))
        : (m = f[21]);
      let E = m;
      return (
        f[22] !== E ||
        f[23] !== j ||
        f[24] !== $ ||
        f[25] !== C ||
        f[26] !== q ||
        f[27] !== I ||
        f[28] !== v ||
        f[29] !== S ||
        f[30] !== x
          ? ((b = {
              ...S,
              setSlippage: q,
              setPriorityFee: C,
              setTipAmount: I,
              setFrontRunningProtection: j,
              setHoldToConfirm: $,
              reset: E,
              usesActivePreset: x,
              setUsesActivePreset: v,
            }),
            (f[22] = E),
            (f[23] = j),
            (f[24] = $),
            (f[25] = C),
            (f[26] = q),
            (f[27] = I),
            (f[28] = v),
            (f[29] = S),
            (f[30] = x),
            (f[31] = b))
          : (b = f[31]),
        b
      );
    },
  ]);
};
