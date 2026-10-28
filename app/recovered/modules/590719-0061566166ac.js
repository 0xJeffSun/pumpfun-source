// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  e.s(["X", () => o, "T", () => d, "D", () => l]);
  var t = e.i(532617),
    n = e.i(470083),
    s = e.i(417672),
    i = e.i(382772),
    r = e.i(19648);
  let a = new TextEncoder();
  function l(e, t = {}) {
    var a, u;
    return "number" == typeof e || "bigint" == typeof e
      ? ((a = e), (u = t), o((0, r.N)(a, u)))
      : "boolean" == typeof e
        ? (function (e, t = {}) {
            let n = new Uint8Array(1);
            return ((n[0] = Number(e)), "number" == typeof t.size)
              ? ((0, i.u)(n, { size: t.size }), (0, s.g)(n, { size: t.size }))
              : n;
          })(e, t)
        : (0, n.f)(e)
          ? o(e, t)
          : d(e, t);
  }
  function u(e) {
    return e >= 48 && e <= 57
      ? e - 48
      : e >= 65 && e <= 70
        ? e - 55
        : e >= 97 && e <= 102
          ? e - 87
          : void 0;
  }
  function o(e, n = {}) {
    let r = e;
    n.size &&
      ((0, i.u)(r, { size: n.size }),
      (r = (0, s.g)(r, { dir: "right", size: n.size })));
    let a = r.slice(2);
    a.length % 2 && (a = `0${a}`);
    let l = a.length / 2,
      d = new Uint8Array(l);
    for (let e = 0, n = 0; e < l; e++) {
      let s = u(a.charCodeAt(n++)),
        i = u(a.charCodeAt(n++));
      if (void 0 === s || void 0 === i)
        throw new t.f(
          `Invalid byte sequence ("${a[n - 2]}${a[n - 1]}" in "${a}").`,
        );
      d[e] = 16 * s + i;
    }
    return d;
  }
  function d(e, t = {}) {
    let n = a.encode(e);
    return "number" == typeof t.size
      ? ((0, i.u)(n, { size: t.size }),
        (0, s.g)(n, { dir: "right", size: t.size }))
      : n;
  }
};
