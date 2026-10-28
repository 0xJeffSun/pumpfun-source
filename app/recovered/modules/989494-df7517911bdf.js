// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(702737),
    n = e.i(470083),
    r = e.i(612735);
  function i(e, n) {
    if ("number" == typeof n && n > 0 && n > (0, r.f)(e) - 1)
      throw new t.p({ offset: n, position: "start", size: (0, r.f)(e) });
  }
  function s(e, n, i) {
    if ("number" == typeof n && "number" == typeof i && (0, r.f)(e) !== i - n)
      throw new t.p({ offset: i, position: "end", size: (0, r.f)(e) });
  }
  function o(e, t, n, { strict: r } = {}) {
    i(e, t);
    let a = e.slice(t, n);
    return (r && s(a, t, n), a);
  }
  function a(e, t, n, { strict: r } = {}) {
    i(e, t);
    let o = `0x${e.replace("0x", "").slice((t ?? 0) * 2, (n ?? e.length) * 2)}`;
    return (r && s(o, t, n), o);
  }
  e.s([
    "M",
    0,
    function (e, t, r, { strict: i } = {}) {
      return (0, n.f)(e, { strict: !1 })
        ? a(e, t, r, { strict: i })
        : o(e, t, r, { strict: i });
    },
    "S",
    0,
    o,
    "n",
    0,
    a,
  ]);
};
