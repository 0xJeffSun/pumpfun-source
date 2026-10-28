// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(t) => {
  t.s(["b", () => a, "A", () => u]);
  var e = t.i(296006),
    n = t.i(590719),
    i = t.i(497763),
    s = t.i(533030),
    r = t.i(4911);
  let o = new s.f(8192);
  function a(t, e) {
    if (o.has(`${t}.${e}`)) return o.get(`${t}.${e}`);
    let s = e ? `${e}${t.toLowerCase()}` : t.substring(2).toLowerCase(),
      r = (0, i.f)((0, n.T)(s), "bytes"),
      a = (e ? s.substring(`${e}0x`.length) : s).split("");
    for (let t = 0; t < 40; t += 2)
      (r[t >> 1] >> 4 >= 8 && a[t] && (a[t] = a[t].toUpperCase()),
        (15 & r[t >> 1]) >= 8 &&
          a[t + 1] &&
          (a[t + 1] = a[t + 1].toUpperCase()));
    let u = `0x${a.join("")}`;
    return (o.set(`${t}.${e}`, u), u);
  }
  function u(t, n) {
    if (!(0, r.f)(t, { strict: !1 })) throw new e.f({ address: t });
    return a(t, n);
  }
};
