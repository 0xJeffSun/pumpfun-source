// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  e.s(["f", () => i]);
  var t = e.i(971816),
    r = e.i(389238);
  let n = /^0x[a-fA-F0-9]{40}$/,
    s = new t.f(8192);
  function i(e, t) {
    let { strict: i = !0 } = t ?? {},
      o = `${e}.${i}`;
    if (s.has(o)) return s.get(o);
    let a = !!n.test(e) && (e.toLowerCase() === e || !i || (0, r.b)(e) === e);
    return (s.set(o, a), a);
  }
};
