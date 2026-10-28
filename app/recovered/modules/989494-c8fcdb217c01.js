// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(702737),
    s = e.i(470083),
    i = e.i(612735);
  function r(e, s) {
    if ("number" == typeof s && s > 0 && s > (0, i.f)(e) - 1)
      throw new t.p({ offset: s, position: "start", size: (0, i.f)(e) });
  }
  function n(e, s, r) {
    if ("number" == typeof s && "number" == typeof r && (0, i.f)(e) !== r - s)
      throw new t.p({ offset: r, position: "end", size: (0, i.f)(e) });
  }
  function a(e, t, s, { strict: i } = {}) {
    r(e, t);
    let o = e.slice(t, s);
    return (i && n(o, t, s), o);
  }
  function o(e, t, s, { strict: i } = {}) {
    r(e, t);
    let a = `0x${e.replace("0x", "").slice((t ?? 0) * 2, (s ?? e.length) * 2)}`;
    return (i && n(a, t, s), a);
  }
  e.s([
    "M",
    0,
    function (e, t, i, { strict: r } = {}) {
      return (0, s.f)(e, { strict: !1 })
        ? o(e, t, i, { strict: r })
        : a(e, t, i, { strict: r });
    },
    "S",
    0,
    a,
    "n",
    0,
    o,
  ]);
};
