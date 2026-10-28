// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  e.s(["b", () => a, "A", () => u]);
  var t = e.i(411792),
    r = e.i(67223),
    n = e.i(772488),
    s = e.i(971816),
    i = e.i(858042);
  let o = new s.f(8192);
  function a(e, t) {
    if (o.has(`${e}.${t}`)) return o.get(`${e}.${t}`);
    let s = t ? `${t}${e.toLowerCase()}` : e.substring(2).toLowerCase(),
      i = (0, n.f)((0, r.T)(s), "bytes"),
      a = (t ? s.substring(`${t}0x`.length) : s).split("");
    for (let e = 0; e < 40; e += 2)
      (i[e >> 1] >> 4 >= 8 && a[e] && (a[e] = a[e].toUpperCase()),
        (15 & i[e >> 1]) >= 8 &&
          a[e + 1] &&
          (a[e + 1] = a[e + 1].toUpperCase()));
    let u = `0x${a.join("")}`;
    return (o.set(`${e}.${t}`, u), u);
  }
  function u(e, r) {
    if (!(0, i.f)(e, { strict: !1 })) throw new t.f({ address: e });
    return a(e, r);
  }
};
