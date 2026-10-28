// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(445242);
  e.i(550675);
  var r = e.i(547562),
    a = e.i(53479);
  function i(e) {
    if (e.presets.length >= a.P) return e;
    let t = [...e.presets, (0, a.z)(e.presets.length)];
    return { active: t.length - 1, presets: t };
  }
  function l(e) {
    return {
      ...e,
      presets: e.presets.map((t, r) =>
        r === e.active ? { ...(0, a.z)(r), name: t.name } : t,
      ),
    };
  }
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
        m = (0, t.c)(27),
        [p, b] = (0, r.l)("trading.presets"),
        h = p.active,
        v = p.presets[h];
      m[0] !== b
        ? ((e = (e) => {
            b((t) => ({ ...t, active: (0, a.l)(e, t.presets.length) }));
          }),
          (m[0] = b),
          (m[1] = e))
        : (e = m[1]);
      let x = e;
      m[2] !== b
        ? ((n = (e) => {
            b((t) => ({
              ...t,
              presets: t.presets.map((r, i) =>
                i === t.active ? (0, a.C)({ ...r, ...e }, i) : r,
              ),
            }));
          }),
          (m[2] = b),
          (m[3] = n))
        : (n = m[3]);
      let g = n;
      m[4] !== b
        ? ((o = (e) => {
            let { index: t, name: r } = e;
            b((e) => {
              let i = (0, a.l)(t, e.presets.length);
              return {
                ...e,
                presets: e.presets.map((e, t) =>
                  t === i ? { ...e, name: (0, a.X)(r) } : e,
                ),
              };
            });
          }),
          (m[4] = b),
          (m[5] = o))
        : (o = m[5]);
      let y = o;
      m[6] !== b
        ? ((s = () => {
            b(l);
          }),
          (m[6] = b),
          (m[7] = s))
        : (s = m[7]);
      let w = s;
      m[8] !== b
        ? ((d = () => {
            b(i);
          }),
          (m[8] = b),
          (m[9] = d))
        : (d = m[9]);
      let j = d;
      m[10] !== b
        ? ((c = (e) => {
            b((t) => (0, a._)(t, e));
          }),
          (m[10] = b),
          (m[11] = c))
        : (c = m[11]);
      let N = c;
      m[12] !== b
        ? ((u = (e) => {
            b((t) => (0, a.L)(t, e));
          }),
          (m[12] = b),
          (m[13] = u))
        : (u = m[13]);
      let R = u,
        k = p.presets.length < a.P,
        _ = p.presets.length > 1;
      return (
        m[14] !== h ||
        m[15] !== v ||
        m[16] !== j ||
        m[17] !== R ||
        m[18] !== N ||
        m[19] !== y ||
        m[20] !== w ||
        m[21] !== x ||
        m[22] !== p.presets ||
        m[23] !== k ||
        m[24] !== _ ||
        m[25] !== g
          ? ((f = {
              presets: p.presets,
              activeIndex: h,
              activePreset: v,
              canAddPreset: k,
              canDeletePreset: _,
              setActiveIndex: x,
              updateActivePreset: g,
              renamePreset: y,
              resetActivePreset: w,
              addPreset: j,
              duplicatePreset: N,
              deletePreset: R,
            }),
            (m[14] = h),
            (m[15] = v),
            (m[16] = j),
            (m[17] = R),
            (m[18] = N),
            (m[19] = y),
            (m[20] = w),
            (m[21] = x),
            (m[22] = p.presets),
            (m[23] = k),
            (m[24] = _),
            (m[25] = g),
            (m[26] = f))
          : (f = m[26]),
        f
      );
    },
  ]);
};
