// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(639825),
    r = e.i(45732),
    n = e.i(203765),
    i = e.i(892259);
  e.s(
    [
      "f",
      0,
      function (e) {
        let s;
        if ("string" == typeof e) s = (0, i.F)(e);
        else {
          let t = (0, n.f)(e),
            a = e.length;
          for (let n = 0; n < a; n++) {
            let a = e[n];
            if (!(0, r.J)(a)) {
              s = (0, i.F)(a, t);
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
          let n = (0, i.Z)(e),
            s = n.length;
          for (let e = 0; e < s; e++)
            t.push((0, i.l)(n[e], { modifiers: r.m }));
        } else {
          let s = (0, n.f)(e),
            a = e.length;
          for (let n = 0; n < a; n++) {
            let a = e[n];
            if ((0, r.J)(a)) continue;
            let o = (0, i.Z)(a),
              u = o.length;
            for (let e = 0; e < u; e++)
              t.push((0, i.l)(o[e], { modifiers: r.m, structs: s }));
          }
        }
        if (0 === t.length) throw new s.N({ params: e });
        return t;
      },
    ],
    623846,
  );
};
