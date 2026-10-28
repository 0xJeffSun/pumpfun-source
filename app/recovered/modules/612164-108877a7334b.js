// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(213090),
    n = e.i(520417),
    r = e.i(415415);
  function i(e, n) {
    if ("number" == typeof n && n > 0 && n > (0, r.f)(e) - 1)
      throw new t.p({ offset: n, position: "start", size: (0, r.f)(e) });
  }
  function a(e, n, i) {
    if ("number" == typeof n && "number" == typeof i && (0, r.f)(e) !== i - n)
      throw new t.p({ offset: i, position: "end", size: (0, r.f)(e) });
  }
  function s(e, t, n, { strict: r } = {}) {
    i(e, t);
    let o = e.slice(t, n);
    return (r && a(o, t, n), o);
  }
  function o(e, t, n, { strict: r } = {}) {
    i(e, t);
    let s = `0x${e.replace("0x", "").slice((t ?? 0) * 2, (n ?? e.length) * 2)}`;
    return (r && a(s, t, n), s);
  }
  e.s([
    "M",
    0,
    function (e, t, r, { strict: i } = {}) {
      return (0, n.f)(e, { strict: !1 })
        ? o(e, t, r, { strict: i })
        : s(e, t, r, { strict: i });
    },
    "S",
    0,
    s,
    "n",
    0,
    o,
  ]);
};
