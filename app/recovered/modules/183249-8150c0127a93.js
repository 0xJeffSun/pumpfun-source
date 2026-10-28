// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  e.s(["b", () => a, "A", () => l]);
  var t = e.i(296006),
    n = e.i(590719),
    r = e.i(497763),
    i = e.i(533030),
    o = e.i(4911);
  let s = new i.f(8192);
  function a(e, t) {
    if (s.has(`${e}.${t}`)) return s.get(`${e}.${t}`);
    let i = t ? `${t}${e.toLowerCase()}` : e.substring(2).toLowerCase(),
      o = (0, r.f)((0, n.T)(i), "bytes"),
      a = (t ? i.substring(`${t}0x`.length) : i).split("");
    for (let e = 0; e < 40; e += 2)
      (o[e >> 1] >> 4 >= 8 && a[e] && (a[e] = a[e].toUpperCase()),
        (15 & o[e >> 1]) >= 8 &&
          a[e + 1] &&
          (a[e + 1] = a[e + 1].toUpperCase()));
    let l = `0x${a.join("")}`;
    return (s.set(`${e}.${t}`, l), l);
  }
  function l(e, n) {
    if (!(0, o.f)(e, { strict: !1 })) throw new t.f({ address: e });
    return a(e, n);
  }
};
