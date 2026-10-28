// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(702737),
    n = e.i(470083),
    i = e.i(612735);
  function r(e, n) {
    if ("number" == typeof n && n > 0 && n > (0, i.f)(e) - 1)
      throw new t.p({ offset: n, position: "start", size: (0, i.f)(e) });
  }
  function s(e, n, r) {
    if ("number" == typeof n && "number" == typeof r && (0, i.f)(e) !== r - n)
      throw new t.p({ offset: r, position: "end", size: (0, i.f)(e) });
  }
  function o(e, t, n, { strict: i } = {}) {
    r(e, t);
    let a = e.slice(t, n);
    return (i && s(a, t, n), a);
  }
  function a(e, t, n, { strict: i } = {}) {
    r(e, t);
    let o = `0x${e.replace("0x", "").slice((t ?? 0) * 2, (n ?? e.length) * 2)}`;
    return (i && s(o, t, n), o);
  }
  e.s([
    "M",
    0,
    function (e, t, i, { strict: r } = {}) {
      return (0, n.f)(e, { strict: !1 })
        ? a(e, t, i, { strict: r })
        : o(e, t, i, { strict: r });
    },
    "S",
    0,
    o,
    "n",
    0,
    a,
  ]);
};
