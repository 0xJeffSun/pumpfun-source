// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e, t, r) => {
  let n = e.r(750472),
    i = e.r(779202),
    o = {};
  (Object.keys(n).forEach((e) => {
    ((o[e] = {}),
      Object.defineProperty(o[e], "channels", { value: n[e].channels }),
      Object.defineProperty(o[e], "labels", { value: n[e].labels }));
    let t = i(e);
    Object.keys(t).forEach((r) => {
      let n,
        i,
        a = t[r];
      ((o[e][r] =
        ((n = function (...e) {
          let t = e[0];
          if (null == t) return t;
          t.length > 1 && (e = t);
          let r = a(e);
          if ("object" == typeof r)
            for (let e = r.length, t = 0; t < e; t++) r[t] = Math.round(r[t]);
          return r;
        }),
        "conversion" in a && (n.conversion = a.conversion),
        n)),
        (o[e][r].raw =
          ((i = function (...e) {
            let t = e[0];
            return null == t ? t : (t.length > 1 && (e = t), a(e));
          }),
          "conversion" in a && (i.conversion = a.conversion),
          i)));
    });
  }),
    (t.exports = o));
};
