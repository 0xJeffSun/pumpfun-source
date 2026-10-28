// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(702737),
    r = e.i(470083),
    n = e.i(612735);
  function s(e, r) {
    if ("number" == typeof r && r > 0 && r > (0, n.f)(e) - 1)
      throw new t.p({ offset: r, position: "start", size: (0, n.f)(e) });
  }
  function o(e, r, s) {
    if ("number" == typeof r && "number" == typeof s && (0, n.f)(e) !== s - r)
      throw new t.p({ offset: s, position: "end", size: (0, n.f)(e) });
  }
  function i(e, t, r, { strict: n } = {}) {
    s(e, t);
    let a = e.slice(t, r);
    return (n && o(a, t, r), a);
  }
  function a(e, t, r, { strict: n } = {}) {
    s(e, t);
    let i = `0x${e.replace("0x", "").slice((t ?? 0) * 2, (r ?? e.length) * 2)}`;
    return (n && o(i, t, r), i);
  }
  e.s([
    "M",
    0,
    function (e, t, n, { strict: s } = {}) {
      return (0, r.f)(e, { strict: !1 })
        ? a(e, t, n, { strict: s })
        : i(e, t, n, { strict: s });
    },
    "S",
    0,
    i,
    "n",
    0,
    a,
  ]);
};
