// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(445242),
    r = e.i(148269),
    a = e.i(671722);
  e.i(550675);
  var i = e.i(547562);
  function n(e) {
    return (0, a.t)(e);
  }
  function l(e) {
    return (0, a.t)(e, r._);
  }
  e.s([
    "f",
    0,
    () => {
      let e,
        r,
        s,
        o,
        c,
        d,
        m,
        u,
        f = (0, t.c)(23),
        [h, p] = (0, i.l)("feed.exploreLenses");
      f[0] !== h ? ((e = h.filter(n)), (f[0] = h), (f[1] = e)) : (e = f[1]);
      let x = e;
      f[2] !== h
        ? ((r = (0, a.x)(h).filter(l)), (f[2] = h), (f[3] = r))
        : (r = f[3]);
      let g = r;
      f[4] !== p
        ? ((s = (e, t) => p((r) => (0, a.y)(r, e, t))), (f[4] = p), (f[5] = s))
        : (s = f[5]);
      let b = s;
      f[6] !== p
        ? ((o = (e, t) => p((r) => (0, a.n)(r, e, t))), (f[6] = p), (f[7] = o))
        : (o = f[7]);
      let v = o;
      f[8] !== p
        ? ((c = (e) => p((t) => (0, a.I)(t, e))), (f[8] = p), (f[9] = c))
        : (c = f[9]);
      let y = c;
      f[10] !== p
        ? ((d = (e) => p((t) => (0, a.N)(t, e))), (f[10] = p), (f[11] = d))
        : (d = f[11]);
      let j = d;
      f[12] !== p
        ? ((m = () => p([...a.X])), (f[12] = p), (f[13] = m))
        : (m = f[13]);
      let w = m;
      return (
        f[14] !== h ||
        f[15] !== y ||
        f[16] !== g ||
        f[17] !== b ||
        f[18] !== v ||
        f[19] !== w ||
        f[20] !== j ||
        f[21] !== x
          ? ((u = {
              box: h,
              visibleBox: x,
              moreLensIds: g,
              move: b,
              reorder: v,
              hide: y,
              show: j,
              reset: w,
            }),
            (f[14] = h),
            (f[15] = y),
            (f[16] = g),
            (f[17] = b),
            (f[18] = v),
            (f[19] = w),
            (f[20] = j),
            (f[21] = x),
            (f[22] = u))
          : (u = f[22]),
        u
      );
    },
  ]);
};
