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
        p = (0, t.c)(27),
        [f, g] = (0, n.l)("trading.presets"),
        _ = f.active,
        b = f.presets[_];
      p[0] !== g
        ? ((e = (e) => {
            g((t) => ({ ...t, active: (0, r.l)(e, t.presets.length) }));
          }),
          (p[0] = g),
          (p[1] = e))
        : (e = p[1]);
      let h = e;
      p[2] !== g
        ? ((i = (e) => {
            g((t) => ({
              ...t,
              presets: t.presets.map((n, s) =>
                s === t.active ? (0, r.C)({ ...n, ...e }, s) : n,
              ),
            }));
          }),
          (p[2] = g),
          (p[3] = i))
        : (i = p[3]);
      let w = i;
      p[4] !== g
        ? ((o = (e) => {
            let { index: t, name: n } = e;
            g((e) => {
              let s = (0, r.l)(t, e.presets.length);
              return {
                ...e,
                presets: e.presets.map((e, t) =>
                  t === s ? { ...e, name: (0, r.X)(n) } : e,
                ),
              };
            });
          }),
          (p[4] = g),
          (p[5] = o))
        : (o = p[5]);
      let y = o;
      p[6] !== g
        ? ((l = () => {
            g(a);
          }),
          (p[6] = g),
          (p[7] = l))
        : (l = p[7]);
      let j = l;
      p[8] !== g
        ? ((c = () => {
            g(s);
          }),
          (p[8] = g),
          (p[9] = c))
        : (c = p[9]);
      let v = c;
      p[10] !== g
        ? ((u = (e) => {
            g((t) => (0, r._)(t, e));
          }),
          (p[10] = g),
          (p[11] = u))
        : (u = p[11]);
      let x = u;
      p[12] !== g
        ? ((d = (e) => {
            g((t) => (0, r.L)(t, e));
          }),
          (p[12] = g),
          (p[13] = d))
        : (d = p[13]);
      let k = d,
        S = f.presets.length < r.P,
        z = f.presets.length > 1;
      return (
        p[14] !== _ ||
        p[15] !== b ||
        p[16] !== v ||
        p[17] !== k ||
        p[18] !== x ||
        p[19] !== y ||
        p[20] !== j ||
        p[21] !== h ||
        p[22] !== f.presets ||
        p[23] !== S ||
        p[24] !== z ||
        p[25] !== w
          ? ((m = {
              presets: f.presets,
              activeIndex: _,
              activePreset: b,
              canAddPreset: S,
              canDeletePreset: z,
              setActiveIndex: h,
              updateActivePreset: w,
              renamePreset: y,
              resetActivePreset: j,
              addPreset: v,
              duplicatePreset: x,
              deletePreset: k,
            }),
            (p[14] = _),
            (p[15] = b),
            (p[16] = v),
            (p[17] = k),
            (p[18] = x),
            (p[19] = y),
            (p[20] = j),
            (p[21] = h),
            (p[22] = f.presets),
            (p[23] = S),
            (p[24] = z),
            (p[25] = w),
            (p[26] = m))
          : (m = p[26]),
        m
      );
    },
  ]);
};
