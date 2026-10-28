// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(639825),
    r = e.i(45732),
    n = e.i(203765),
    s = e.i(892259);
  e.s(
    [
      "f",
      0,
      function (e) {
        let i;
        if ("string" == typeof e) i = (0, s.F)(e);
        else {
          let t = (0, n.f)(e),
            o = e.length;
          for (let n = 0; n < o; n++) {
            let o = e[n];
            if (!(0, r.J)(o)) {
              i = (0, s.F)(o, t);
              break;
            }
          }
        }
        if (!i) throw new t.s({ signature: e });
        return i;
      },
    ],
    714764,
  );
  var i = e.i(932826);
  e.s(
    [
      "f",
      0,
      function (e) {
        let t = [];
        if ("string" == typeof e) {
          let n = (0, s.Z)(e),
            i = n.length;
          for (let e = 0; e < i; e++)
            t.push((0, s.l)(n[e], { modifiers: r.m }));
        } else {
          let i = (0, n.f)(e),
            o = e.length;
          for (let n = 0; n < o; n++) {
            let o = e[n];
            if ((0, r.J)(o)) continue;
            let a = (0, s.Z)(o),
              u = a.length;
            for (let e = 0; e < u; e++)
              t.push((0, s.l)(a[e], { modifiers: r.m, structs: i }));
          }
        }
        if (0 === t.length) throw new i.N({ params: e });
        return t;
      },
    ],
    623846,
  );
};
