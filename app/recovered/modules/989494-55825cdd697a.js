// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(t) => {
  var e = t.i(702737),
    n = t.i(470083),
    i = t.i(612735);
  function s(t, n) {
    if ("number" == typeof n && n > 0 && n > (0, i.f)(t) - 1)
      throw new e.p({ offset: n, position: "start", size: (0, i.f)(t) });
  }
  function r(t, n, s) {
    if ("number" == typeof n && "number" == typeof s && (0, i.f)(t) !== s - n)
      throw new e.p({ offset: s, position: "end", size: (0, i.f)(t) });
  }
  function o(t, e, n, { strict: i } = {}) {
    s(t, e);
    let a = t.slice(e, n);
    return (i && r(a, e, n), a);
  }
  function a(t, e, n, { strict: i } = {}) {
    s(t, e);
    let o = `0x${t.replace("0x", "").slice((e ?? 0) * 2, (n ?? t.length) * 2)}`;
    return (i && r(o, e, n), o);
  }
  t.s([
    "M",
    0,
    function (t, e, i, { strict: s } = {}) {
      return (0, n.f)(t, { strict: !1 })
        ? a(t, e, i, { strict: s })
        : o(t, e, i, { strict: s });
    },
    "S",
    0,
    o,
    "n",
    0,
    a,
  ]);
};
