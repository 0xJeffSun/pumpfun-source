// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(t) => {
  var e = t.i(445242);
  t.i(550675);
  var n = t.i(547562),
    r = t.i(53479);
  function s(t) {
    if (t.presets.length >= r.P) return t;
    let e = [...t.presets, (0, r.z)(t.presets.length)];
    return { active: e.length - 1, presets: e };
  }
  function a(t) {
    return {
      ...t,
      presets: t.presets.map((e, n) =>
        n === t.active ? { ...(0, r.z)(n), name: e.name } : e,
      ),
    };
  }
  t.s([
    "f",
    0,
    function () {
      let t,
        i,
        o,
        c,
        l,
        u,
        d,
        m,
        f = (0, e.c)(27),
        [h, g] = (0, n.l)("trading.presets"),
        b = h.active,
        p = h.presets[b];
      f[0] !== g
        ? ((t = (t) => {
            g((e) => ({ ...e, active: (0, r.l)(t, e.presets.length) }));
          }),
          (f[0] = g),
          (f[1] = t))
        : (t = f[1]);
      let w = t;
      f[2] !== g
        ? ((i = (t) => {
            g((e) => ({
              ...e,
              presets: e.presets.map((n, s) =>
                s === e.active ? (0, r.C)({ ...n, ...t }, s) : n,
              ),
            }));
          }),
          (f[2] = g),
          (f[3] = i))
        : (i = f[3]);
      let y = i;
      f[4] !== g
        ? ((o = (t) => {
            let { index: e, name: n } = t;
            g((t) => {
              let s = (0, r.l)(e, t.presets.length);
              return {
                ...t,
                presets: t.presets.map((t, e) =>
                  e === s ? { ...t, name: (0, r.X)(n) } : t,
                ),
              };
            });
          }),
          (f[4] = g),
          (f[5] = o))
        : (o = f[5]);
      let _ = o;
      f[6] !== g
        ? ((c = () => {
            g(a);
          }),
          (f[6] = g),
          (f[7] = c))
        : (c = f[7]);
      let x = c;
      f[8] !== g
        ? ((l = () => {
            g(s);
          }),
          (f[8] = g),
          (f[9] = l))
        : (l = f[9]);
      let v = l;
      f[10] !== g
        ? ((u = (t) => {
            g((e) => (0, r._)(e, t));
          }),
          (f[10] = g),
          (f[11] = u))
        : (u = f[11]);
      let j = u;
      f[12] !== g
        ? ((d = (t) => {
            g((e) => (0, r.L)(e, t));
          }),
          (f[12] = g),
          (f[13] = d))
        : (d = f[13]);
      let k = d,
        $ = h.presets.length < r.P,
        S = h.presets.length > 1;
      return (
        f[14] !== b ||
        f[15] !== p ||
        f[16] !== v ||
        f[17] !== k ||
        f[18] !== j ||
        f[19] !== _ ||
        f[20] !== x ||
        f[21] !== w ||
        f[22] !== h.presets ||
        f[23] !== $ ||
        f[24] !== S ||
        f[25] !== y
          ? ((m = {
              presets: h.presets,
              activeIndex: b,
              activePreset: p,
              canAddPreset: $,
              canDeletePreset: S,
              setActiveIndex: w,
              updateActivePreset: y,
              renamePreset: _,
              resetActivePreset: x,
              addPreset: v,
              duplicatePreset: j,
              deletePreset: k,
            }),
            (f[14] = b),
            (f[15] = p),
            (f[16] = v),
            (f[17] = k),
            (f[18] = j),
            (f[19] = _),
            (f[20] = x),
            (f[21] = w),
            (f[22] = h.presets),
            (f[23] = $),
            (f[24] = S),
            (f[25] = y),
            (f[26] = m))
          : (m = f[26]),
        m
      );
    },
  ]);
};
