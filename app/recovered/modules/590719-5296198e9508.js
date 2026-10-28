// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  e.s(["X", () => u, "T", () => c, "D", () => a]);
  var t = e.i(532617),
    n = e.i(470083),
    r = e.i(417672),
    i = e.i(382772),
    o = e.i(19648);
  let s = new TextEncoder();
  function a(e, t = {}) {
    var s, l;
    return "number" == typeof e || "bigint" == typeof e
      ? ((s = e), (l = t), u((0, o.N)(s, l)))
      : "boolean" == typeof e
        ? (function (e, t = {}) {
            let n = new Uint8Array(1);
            return ((n[0] = Number(e)), "number" == typeof t.size)
              ? ((0, i.u)(n, { size: t.size }), (0, r.g)(n, { size: t.size }))
              : n;
          })(e, t)
        : (0, n.f)(e)
          ? u(e, t)
          : c(e, t);
  }
  function l(e) {
    return e >= 48 && e <= 57
      ? e - 48
      : e >= 65 && e <= 70
        ? e - 55
        : e >= 97 && e <= 102
          ? e - 87
          : void 0;
  }
  function u(e, n = {}) {
    let o = e;
    n.size &&
      ((0, i.u)(o, { size: n.size }),
      (o = (0, r.g)(o, { dir: "right", size: n.size })));
    let s = o.slice(2);
    s.length % 2 && (s = `0${s}`);
    let a = s.length / 2,
      c = new Uint8Array(a);
    for (let e = 0, n = 0; e < a; e++) {
      let r = l(s.charCodeAt(n++)),
        i = l(s.charCodeAt(n++));
      if (void 0 === r || void 0 === i)
        throw new t.f(
          `Invalid byte sequence ("${s[n - 2]}${s[n - 1]}" in "${s}").`,
        );
      c[e] = 16 * r + i;
    }
    return c;
  }
  function c(e, t = {}) {
    let n = s.encode(e);
    return "number" == typeof t.size
      ? ((0, i.u)(n, { size: t.size }),
        (0, r.g)(n, { dir: "right", size: t.size }))
      : n;
  }
};
