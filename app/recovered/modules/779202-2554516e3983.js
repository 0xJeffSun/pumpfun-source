// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e, t, r) => {
  let n = e.r(750472);
  t.exports = function (e) {
    let t = (function (e) {
        let t = (function () {
            let e = {},
              t = Object.keys(n);
            for (let r = t.length, n = 0; n < r; n++)
              e[t[n]] = { distance: -1, parent: null };
            return e;
          })(),
          r = [e];
        for (t[e].distance = 0; r.length; ) {
          let e = r.pop(),
            i = Object.keys(n[e]);
          for (let n = i.length, o = 0; o < n; o++) {
            let n = i[o],
              a = t[n];
            -1 === a.distance &&
              ((a.distance = t[e].distance + 1), (a.parent = e), r.unshift(n));
          }
        }
        return t;
      })(e),
      r = {},
      i = Object.keys(t);
    for (let e = i.length, o = 0; o < e; o++) {
      let e = i[o];
      null !== t[e].parent &&
        (r[e] = (function (e, t) {
          let r = [t[e].parent, e],
            i = n[t[e].parent][e],
            o = t[e].parent;
          for (; t[o].parent; )
            (r.unshift(t[o].parent),
              (i = (function (e, t) {
                return function (r) {
                  return t(e(r));
                };
              })(n[t[o].parent][o], i)),
              (o = t[o].parent));
          return ((i.conversion = r), i);
        })(e, t));
    }
    return r;
  };
};
