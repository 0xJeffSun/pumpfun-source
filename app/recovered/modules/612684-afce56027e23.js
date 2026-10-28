// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(920107),
    n = e.i(715928),
    r = e.i(539788);
  function a(e, n) {
    if ("number" == typeof n && n > 0 && n > (0, r.f)(e) - 1)
      throw new t.p({ offset: n, position: "start", size: (0, r.f)(e) });
  }
  function i(e, n, a) {
    if ("number" == typeof n && "number" == typeof a && (0, r.f)(e) !== a - n)
      throw new t.p({ offset: a, position: "end", size: (0, r.f)(e) });
  }
  function s(e, t, n, { strict: r } = {}) {
    a(e, t);
    let o = e.slice(t, n);
    return (r && i(o, t, n), o);
  }
  function o(e, t, n, { strict: r } = {}) {
    a(e, t);
    let s = `0x${e.replace("0x", "").slice((t ?? 0) * 2, (n ?? e.length) * 2)}`;
    return (r && i(s, t, n), s);
  }
  e.s([
    "M",
    0,
    function (e, t, r, { strict: a } = {}) {
      return (0, n.f)(e, { strict: !1 })
        ? o(e, t, r, { strict: a })
        : s(e, t, r, { strict: a });
    },
    "S",
    0,
    s,
    "n",
    0,
    o,
  ]);
};
