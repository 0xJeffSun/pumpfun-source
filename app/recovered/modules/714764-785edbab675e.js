// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(639825),
    r = e.i(45732),
    n = e.i(203765),
    a = e.i(892259);
  e.s(
    [
      "f",
      0,
      function (e) {
        let s;
        if ("string" == typeof e) s = (0, a.F)(e);
        else {
          let t = (0, n.f)(e),
            o = e.length;
          for (let n = 0; n < o; n++) {
            let o = e[n];
            if (!(0, r.J)(o)) {
              s = (0, a.F)(o, t);
              break;
            }
          }
        }
        if (!s) throw new t.s({ signature: e });
        return s;
      },
    ],
    714764,
  );
  var s = e.i(932826);
  e.s(
    [
      "f",
      0,
      function (e) {
        let t = [];
        if ("string" == typeof e) {
          let n = (0, a.Z)(e),
            s = n.length;
          for (let e = 0; e < s; e++)
            t.push((0, a.l)(n[e], { modifiers: r.m }));
        } else {
          let s = (0, n.f)(e),
            o = e.length;
          for (let n = 0; n < o; n++) {
            let o = e[n];
            if ((0, r.J)(o)) continue;
            let i = (0, a.Z)(o),
              l = i.length;
            for (let e = 0; e < l; e++)
              t.push((0, a.l)(i[e], { modifiers: r.m, structs: s }));
          }
        }
        if (0 === t.length) throw new s.N({ params: e });
        return t;
      },
    ],
    623846,
  );
};
