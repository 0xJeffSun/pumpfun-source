// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  e.s(["f", () => i]);
  var t = e.i(971816),
    a = e.i(389238);
  let r = /^0x[a-fA-F0-9]{40}$/,
    n = new t.f(8192);
  function i(e, t) {
    let { strict: i = !0 } = t ?? {},
      o = `${e}.${i}`;
    if (n.has(o)) return n.get(o);
    let l = !!r.test(e) && (e.toLowerCase() === e || !i || (0, a.b)(e) === e);
    return (n.set(o, l), l);
  }
};
