// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(445242);
  e.i(550675);
  var n = e.i(547562),
    r = e.i(53479);
  function s(e) {
    if (e.presets.length >= r.P) return e;
    let t = [...e.presets, (0, r.z)(e.presets.length)];
    return { active: t.length - 1, presets: t };
  }
  function a(e) {
    return {
      ...e,
      presets: e.presets.map((t, n) =>
        n === e.active ? { ...(0, r.z)(n), name: t.name } : t,
      ),
    };
  }
  e.s([
    "f",
    0,
    function () {
      let e,
        i,
        o,
        l,
        c,
        u,
        d,
        m,
        g = (0, t.c)(27),
        [p, f] = (0, n.l)("trading.presets"),
        h = p.active,
        b = p.presets[h];
      g[0] !== f
        ? ((e = (e) => {
            f((t) => ({ ...t, active: (0, r.l)(e, t.presets.length) }));
          }),
          (g[0] = f),
          (g[1] = e))
        : (e = g[1]);
      let _ = e;
      g[2] !== f
        ? ((i = (e) => {
            f((t) => ({
              ...t,
              presets: t.presets.map((n, s) =>
                s === t.active ? (0, r.C)({ ...n, ...e }, s) : n,
              ),
            }));
          }),
          (g[2] = f),
          (g[3] = i))
        : (i = g[3]);
      let y = i;
      g[4] !== f
        ? ((o = (e) => {
            let { index: t, name: n } = e;
            f((e) => {
              let s = (0, r.l)(t, e.presets.length);
              return {
                ...e,
                presets: e.presets.map((e, t) =>
                  t === s ? { ...e, name: (0, r.X)(n) } : e,
                ),
              };
            });
          }),
          (g[4] = f),
          (g[5] = o))
        : (o = g[5]);
      let w = o;
      g[6] !== f
        ? ((l = () => {
            f(a);
          }),
          (g[6] = f),
          (g[7] = l))
        : (l = g[7]);
      let v = l;
      g[8] !== f
        ? ((c = () => {
            f(s);
          }),
          (g[8] = f),
          (g[9] = c))
        : (c = g[9]);
      let j = c;
      g[10] !== f
        ? ((u = (e) => {
            f((t) => (0, r._)(t, e));
          }),
          (g[10] = f),
          (g[11] = u))
        : (u = g[11]);
      let x = u;
      g[12] !== f
        ? ((d = (e) => {
            f((t) => (0, r.L)(t, e));
          }),
          (g[12] = f),
          (g[13] = d))
        : (d = g[13]);
      let k = d,
        S = p.presets.length < r.P,
        $ = p.presets.length > 1;
      return (
        g[14] !== h ||
        g[15] !== b ||
        g[16] !== j ||
        g[17] !== k ||
        g[18] !== x ||
        g[19] !== w ||
        g[20] !== v ||
        g[21] !== _ ||
        g[22] !== p.presets ||
        g[23] !== S ||
        g[24] !== $ ||
        g[25] !== y
          ? ((m = {
              presets: p.presets,
              activeIndex: h,
              activePreset: b,
              canAddPreset: S,
              canDeletePreset: $,
              setActiveIndex: _,
              updateActivePreset: y,
              renamePreset: w,
              resetActivePreset: v,
              addPreset: j,
              duplicatePreset: x,
              deletePreset: k,
            }),
            (g[14] = h),
            (g[15] = b),
            (g[16] = j),
            (g[17] = k),
            (g[18] = x),
            (g[19] = w),
            (g[20] = v),
            (g[21] = _),
            (g[22] = p.presets),
            (g[23] = S),
            (g[24] = $),
            (g[25] = y),
            (g[26] = m))
          : (m = g[26]),
        m
      );
    },
  ]);
};
