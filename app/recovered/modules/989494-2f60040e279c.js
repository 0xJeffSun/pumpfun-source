// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(702737),
    r = e.i(470083),
    s = e.i(612735);
  function n(e, r) {
    if ("number" == typeof r && r > 0 && r > (0, s.f)(e) - 1)
      throw new t.p({ offset: r, position: "start", size: (0, s.f)(e) });
  }
  function o(e, r, n) {
    if ("number" == typeof r && "number" == typeof n && (0, s.f)(e) !== n - r)
      throw new t.p({ offset: n, position: "end", size: (0, s.f)(e) });
  }
  function i(e, t, r, { strict: s } = {}) {
    n(e, t);
    let a = e.slice(t, r);
    return (s && o(a, t, r), a);
  }
  function a(e, t, r, { strict: s } = {}) {
    n(e, t);
    let i = `0x${e.replace("0x", "").slice((t ?? 0) * 2, (r ?? e.length) * 2)}`;
    return (s && o(i, t, r), i);
  }
  e.s([
    "M",
    0,
    function (e, t, s, { strict: n } = {}) {
      return (0, r.f)(e, { strict: !1 })
        ? a(e, t, s, { strict: n })
        : i(e, t, s, { strict: n });
    },
    "S",
    0,
    i,
    "n",
    0,
    a,
  ]);
};
