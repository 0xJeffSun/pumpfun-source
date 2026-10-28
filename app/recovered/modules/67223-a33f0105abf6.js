// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  (e.s(["X", () => b, "T", () => g, "D", () => f], 67223),
    e.s(
      ["V", () => s, "v", () => c, "N", () => u, "B", () => p, "g", () => l],
      703114,
    ));
  var t = e.i(927974),
    a = e.i(520417),
    r = e.i(160642),
    n = e.i(339513),
    i = e.i(501261);
  let o = Array.from({ length: 256 }, (e, t) =>
    t.toString(16).padStart(2, "0"),
  );
  function l(e, t = {}) {
    return "number" == typeof e || "bigint" == typeof e
      ? u(e, t)
      : "string" == typeof e
        ? p(e, t)
        : "boolean" == typeof e
          ? s(e, t)
          : c(e, t);
  }
  function s(e, t = {}) {
    let a = `0x${Number(e)}`;
    return "number" == typeof t.size
      ? ((0, n.u)(a, { size: t.size }), (0, r.g)(a, { size: t.size }))
      : a;
  }
  function c(e, t = {}) {
    let a = "";
    for (let t = 0; t < e.length; t++) a += o[e[t]];
    let i = `0x${a}`;
    return "number" == typeof t.size
      ? ((0, n.u)(i, { size: t.size }),
        (0, r.g)(i, { dir: "right", size: t.size }))
      : i;
  }
  function u(e, t = {}) {
    let a,
      { signed: n, size: o } = t,
      l = BigInt(e);
    o
      ? (a = n
          ? (1n << (8n * BigInt(o) - 1n)) - 1n
          : 2n ** (8n * BigInt(o)) - 1n)
      : "number" == typeof e && (a = BigInt(Number.MAX_SAFE_INTEGER));
    let s = "bigint" == typeof a && n ? -a - 1n : 0;
    if ((a && l > a) || l < s) {
      let t = "bigint" == typeof e ? "n" : "";
      throw new i.d({
        max: a ? `${a}${t}` : void 0,
        min: `${s}${t}`,
        signed: n,
        size: o,
        value: `${e}${t}`,
      });
    }
    let c = `0x${(n && l < 0 ? (1n << BigInt(8 * o)) + BigInt(l) : l).toString(16)}`;
    return o ? (0, r.g)(c, { size: o }) : c;
  }
  let d = new TextEncoder();
  function p(e, t = {}) {
    return c(d.encode(e), t);
  }
  let h = new TextEncoder();
  function f(e, t = {}) {
    return "number" == typeof e || "bigint" == typeof e
      ? b(u(e, t))
      : "boolean" == typeof e
        ? (function (e, t = {}) {
            let a = new Uint8Array(1);
            return ((a[0] = Number(e)), "number" == typeof t.size)
              ? ((0, n.u)(a, { size: t.size }), (0, r.g)(a, { size: t.size }))
              : a;
          })(e, t)
        : (0, a.f)(e)
          ? b(e, t)
          : g(e, t);
  }
  function m(e) {
    return e >= 48 && e <= 57
      ? e - 48
      : e >= 65 && e <= 70
        ? e - 55
        : e >= 97 && e <= 102
          ? e - 87
          : void 0;
  }
  function b(e, a = {}) {
    let i = e;
    a.size &&
      ((0, n.u)(i, { size: a.size }),
      (i = (0, r.g)(i, { dir: "right", size: a.size })));
    let o = i.slice(2);
    o.length % 2 && (o = `0${o}`);
    let l = o.length / 2,
      s = new Uint8Array(l);
    for (let e = 0, a = 0; e < l; e++) {
      let r = m(o.charCodeAt(a++)),
        n = m(o.charCodeAt(a++));
      if (void 0 === r || void 0 === n)
        throw new t.f(
          `Invalid byte sequence ("${o[a - 2]}${o[a - 1]}" in "${o}").`,
        );
      s[e] = 16 * r + n;
    }
    return s;
  }
  function g(e, t = {}) {
    let a = h.encode(e);
    return "number" == typeof t.size
      ? ((0, n.u)(a, { size: t.size }),
        (0, r.g)(a, { dir: "right", size: t.size }))
      : a;
  }
};
