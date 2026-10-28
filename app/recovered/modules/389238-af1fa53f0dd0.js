// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  e.s(["b", () => l, "A", () => s]);
  var t = e.i(411792),
    a = e.i(67223),
    r = e.i(772488),
    n = e.i(971816),
    i = e.i(858042);
  let o = new n.f(8192);
  function l(e, t) {
    if (o.has(`${e}.${t}`)) return o.get(`${e}.${t}`);
    let n = t ? `${t}${e.toLowerCase()}` : e.substring(2).toLowerCase(),
      i = (0, r.f)((0, a.T)(n), "bytes"),
      l = (t ? n.substring(`${t}0x`.length) : n).split("");
    for (let e = 0; e < 40; e += 2)
      (i[e >> 1] >> 4 >= 8 && l[e] && (l[e] = l[e].toUpperCase()),
        (15 & i[e >> 1]) >= 8 &&
          l[e + 1] &&
          (l[e + 1] = l[e + 1].toUpperCase()));
    let s = `0x${l.join("")}`;
    return (o.set(`${e}.${t}`, s), s);
  }
  function s(e, a) {
    if (!(0, i.f)(e, { strict: !1 })) throw new t.f({ address: e });
    return l(e, a);
  }
};
