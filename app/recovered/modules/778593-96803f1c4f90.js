// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(445242);
  e.i(550675);
  var i = e.i(547562),
    a = e.i(53479);
  function n(e) {
    if (e.presets.length >= a.P) return e;
    let t = [...e.presets, (0, a.z)(e.presets.length)];
    return { active: t.length - 1, presets: t };
  }
  function r(e) {
    return {
      ...e,
      presets: e.presets.map((t, i) =>
        i === e.active ? { ...(0, a.z)(i), name: t.name } : t,
      ),
    };
  }
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
        p = (0, t.c)(27),
        [f, x] = (0, i.l)("trading.presets"),
        g = f.active,
        h = f.presets[g];
      p[0] !== x
        ? ((e = (e) => {
            x((t) => ({ ...t, active: (0, a.l)(e, t.presets.length) }));
          }),
          (p[0] = x),
          (p[1] = e))
        : (e = p[1]);
      let b = e;
      p[2] !== x
        ? ((s = (e) => {
            x((t) => ({
              ...t,
              presets: t.presets.map((i, n) =>
                n === t.active ? (0, a.C)({ ...i, ...e }, n) : i,
              ),
            }));
          }),
          (p[2] = x),
          (p[3] = s))
        : (s = p[3]);
      let y = s;
      p[4] !== x
        ? ((l = (e) => {
            let { index: t, name: i } = e;
            x((e) => {
              let n = (0, a.l)(t, e.presets.length);
              return {
                ...e,
                presets: e.presets.map((e, t) =>
                  t === n ? { ...e, name: (0, a.X)(i) } : e,
                ),
              };
            });
          }),
          (p[4] = x),
          (p[5] = l))
        : (l = p[5]);
      let v = l;
      p[6] !== x
        ? ((o = () => {
            x(r);
          }),
          (p[6] = x),
          (p[7] = o))
        : (o = p[7]);
      let w = o;
      p[8] !== x
        ? ((c = () => {
            x(n);
          }),
          (p[8] = x),
          (p[9] = c))
        : (c = p[9]);
      let _ = c;
      p[10] !== x
        ? ((d = (e) => {
            x((t) => (0, a._)(t, e));
          }),
          (p[10] = x),
          (p[11] = d))
        : (d = p[11]);
      let k = d;
      p[12] !== x
        ? ((m = (e) => {
            x((t) => (0, a.L)(t, e));
          }),
          (p[12] = x),
          (p[13] = m))
        : (m = p[13]);
      let j = m,
        C = f.presets.length < a.P,
        N = f.presets.length > 1;
      return (
        p[14] !== g ||
        p[15] !== h ||
        p[16] !== _ ||
        p[17] !== j ||
        p[18] !== k ||
        p[19] !== v ||
        p[20] !== w ||
        p[21] !== b ||
        p[22] !== f.presets ||
        p[23] !== C ||
        p[24] !== N ||
        p[25] !== y
          ? ((u = {
              presets: f.presets,
              activeIndex: g,
              activePreset: h,
              canAddPreset: C,
              canDeletePreset: N,
              setActiveIndex: b,
              updateActivePreset: y,
              renamePreset: v,
              resetActivePreset: w,
              addPreset: _,
              duplicatePreset: k,
              deletePreset: j,
            }),
            (p[14] = g),
            (p[15] = h),
            (p[16] = _),
            (p[17] = j),
            (p[18] = k),
            (p[19] = v),
            (p[20] = w),
            (p[21] = b),
            (p[22] = f.presets),
            (p[23] = C),
            (p[24] = N),
            (p[25] = y),
            (p[26] = u))
          : (u = p[26]),
        u
      );
    },
  ]);
};
