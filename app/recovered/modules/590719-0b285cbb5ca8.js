// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(t) => {
  t.s(["X", () => p, "T", () => l, "D", () => a]);
  var e = t.i(532617),
    n = t.i(470083),
    i = t.i(417672),
    s = t.i(382772),
    r = t.i(19648);
  let o = new TextEncoder();
  function a(t, e = {}) {
    var o, u;
    return "number" == typeof t || "bigint" == typeof t
      ? ((o = t), (u = e), p((0, r.N)(o, u)))
      : "boolean" == typeof t
        ? (function (t, e = {}) {
            let n = new Uint8Array(1);
            return ((n[0] = Number(t)), "number" == typeof e.size)
              ? ((0, s.u)(n, { size: e.size }), (0, i.g)(n, { size: e.size }))
              : n;
          })(t, e)
        : (0, n.f)(t)
          ? p(t, e)
          : l(t, e);
  }
  function u(t) {
    return t >= 48 && t <= 57
      ? t - 48
      : t >= 65 && t <= 70
        ? t - 55
        : t >= 97 && t <= 102
          ? t - 87
          : void 0;
  }
  function p(t, n = {}) {
    let r = t;
    n.size &&
      ((0, s.u)(r, { size: n.size }),
      (r = (0, i.g)(r, { dir: "right", size: n.size })));
    let o = r.slice(2);
    o.length % 2 && (o = `0${o}`);
    let a = o.length / 2,
      l = new Uint8Array(a);
    for (let t = 0, n = 0; t < a; t++) {
      let i = u(o.charCodeAt(n++)),
        s = u(o.charCodeAt(n++));
      if (void 0 === i || void 0 === s)
        throw new e.f(
          `Invalid byte sequence ("${o[n - 2]}${o[n - 1]}" in "${o}").`,
        );
      l[t] = 16 * i + s;
    }
    return l;
  }
  function l(t, e = {}) {
    let n = o.encode(t);
    return "number" == typeof e.size
      ? ((0, s.u)(n, { size: e.size }),
        (0, i.g)(n, { dir: "right", size: e.size }))
      : n;
  }
};
