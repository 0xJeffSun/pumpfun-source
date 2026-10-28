// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  e.s(["f", () => o]);
  var t = e.i(533030),
    n = e.i(183249);
  let r = /^0x[a-fA-F0-9]{40}$/,
    i = new t.f(8192);
  function o(e, t) {
    let { strict: o = !0 } = t ?? {},
      s = `${e}.${o}`;
    if (i.has(s)) return i.get(s);
    let a = !!r.test(e) && (e.toLowerCase() === e || !o || (0, n.b)(e) === e);
    return (i.set(s, a), a);
  }
};
