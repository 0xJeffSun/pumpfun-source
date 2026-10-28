// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  e.s(["f", () => r]);
  var t = e.i(533030),
    n = e.i(183249);
  let s = /^0x[a-fA-F0-9]{40}$/,
    i = new t.f(8192);
  function r(e, t) {
    let { strict: r = !0 } = t ?? {},
      a = `${e}.${r}`;
    if (i.has(a)) return i.get(a);
    let l = !!s.test(e) && (e.toLowerCase() === e || !r || (0, n.b)(e) === e);
    return (i.set(a, l), l);
  }
};
