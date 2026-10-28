// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(t) => {
  t.s(["f", () => r]);
  var e = t.i(533030),
    n = t.i(183249);
  let i = /^0x[a-fA-F0-9]{40}$/,
    s = new e.f(8192);
  function r(t, e) {
    let { strict: r = !0 } = e ?? {},
      o = `${t}.${r}`;
    if (s.has(o)) return s.get(o);
    let a = !!i.test(t) && (t.toLowerCase() === t || !r || (0, n.b)(t) === t);
    return (s.set(o, a), a);
  }
};
