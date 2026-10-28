// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(702737),
    i = e.i(470083),
    n = e.i(612735);
  function r(e, i) {
    if ("number" == typeof i && i > 0 && i > (0, n.f)(e) - 1)
      throw new t.p({ offset: i, position: "start", size: (0, n.f)(e) });
  }
  function s(e, i, r) {
    if ("number" == typeof i && "number" == typeof r && (0, n.f)(e) !== r - i)
      throw new t.p({ offset: r, position: "end", size: (0, n.f)(e) });
  }
  function o(e, t, i, { strict: n } = {}) {
    r(e, t);
    let a = e.slice(t, i);
    return (n && s(a, t, i), a);
  }
  function a(e, t, i, { strict: n } = {}) {
    r(e, t);
    let o = `0x${e.replace("0x", "").slice((t ?? 0) * 2, (i ?? e.length) * 2)}`;
    return (n && s(o, t, i), o);
  }
  e.s([
    "M",
    0,
    function (e, t, n, { strict: r } = {}) {
      return (0, i.f)(e, { strict: !1 })
        ? a(e, t, n, { strict: r })
        : o(e, t, n, { strict: r });
    },
    "S",
    0,
    o,
    "n",
    0,
    a,
  ]);
};
