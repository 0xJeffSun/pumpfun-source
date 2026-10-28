// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  e.s(["b", () => l, "A", () => u]);
  var t = e.i(296006),
    n = e.i(590719),
    s = e.i(497763),
    i = e.i(533030),
    r = e.i(4911);
  let a = new i.f(8192);
  function l(e, t) {
    if (a.has(`${e}.${t}`)) return a.get(`${e}.${t}`);
    let i = t ? `${t}${e.toLowerCase()}` : e.substring(2).toLowerCase(),
      r = (0, s.f)((0, n.T)(i), "bytes"),
      l = (t ? i.substring(`${t}0x`.length) : i).split("");
    for (let e = 0; e < 40; e += 2)
      (r[e >> 1] >> 4 >= 8 && l[e] && (l[e] = l[e].toUpperCase()),
        (15 & r[e >> 1]) >= 8 &&
          l[e + 1] &&
          (l[e + 1] = l[e + 1].toUpperCase()));
    let u = `0x${l.join("")}`;
    return (a.set(`${e}.${t}`, u), u);
  }
  function u(e, n) {
    if (!(0, r.f)(e, { strict: !1 })) throw new t.f({ address: e });
    return l(e, n);
  }
};
