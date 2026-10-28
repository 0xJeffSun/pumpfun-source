// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  (e.s(["X", () => h, "T", () => _, "D", () => y], 67223),
    e.s(
      ["V", () => u, "v", () => l, "N", () => c, "B", () => f, "g", () => a],
      703114,
    ));
  var t = e.i(927974),
    r = e.i(520417),
    n = e.i(160642),
    s = e.i(339513),
    i = e.i(501261);
  let o = Array.from({ length: 256 }, (e, t) =>
    t.toString(16).padStart(2, "0"),
  );
  function a(e, t = {}) {
    return "number" == typeof e || "bigint" == typeof e
      ? c(e, t)
      : "string" == typeof e
        ? f(e, t)
        : "boolean" == typeof e
          ? u(e, t)
          : l(e, t);
  }
  function u(e, t = {}) {
    let r = `0x${Number(e)}`;
    return "number" == typeof t.size
      ? ((0, s.u)(r, { size: t.size }), (0, n.g)(r, { size: t.size }))
      : r;
  }
  function l(e, t = {}) {
    let r = "";
    for (let t = 0; t < e.length; t++) r += o[e[t]];
    let i = `0x${r}`;
    return "number" == typeof t.size
      ? ((0, s.u)(i, { size: t.size }),
        (0, n.g)(i, { dir: "right", size: t.size }))
      : i;
  }
  function c(e, t = {}) {
    let r,
      { signed: s, size: o } = t,
      a = BigInt(e);
    o
      ? (r = s
          ? (1n << (8n * BigInt(o) - 1n)) - 1n
          : 2n ** (8n * BigInt(o)) - 1n)
      : "number" == typeof e && (r = BigInt(Number.MAX_SAFE_INTEGER));
    let u = "bigint" == typeof r && s ? -r - 1n : 0;
    if ((r && a > r) || a < u) {
      let t = "bigint" == typeof e ? "n" : "";
      throw new i.d({
        max: r ? `${r}${t}` : void 0,
        min: `${u}${t}`,
        signed: s,
        size: o,
        value: `${e}${t}`,
      });
    }
    let l = `0x${(s && a < 0 ? (1n << BigInt(8 * o)) + BigInt(a) : a).toString(16)}`;
    return o ? (0, n.g)(l, { size: o }) : l;
  }
  let p = new TextEncoder();
  function f(e, t = {}) {
    return l(p.encode(e), t);
  }
  let d = new TextEncoder();
  function y(e, t = {}) {
    return "number" == typeof e || "bigint" == typeof e
      ? h(c(e, t))
      : "boolean" == typeof e
        ? (function (e, t = {}) {
            let r = new Uint8Array(1);
            return ((r[0] = Number(e)), "number" == typeof t.size)
              ? ((0, s.u)(r, { size: t.size }), (0, n.g)(r, { size: t.size }))
              : r;
          })(e, t)
        : (0, r.f)(e)
          ? h(e, t)
          : _(e, t);
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
  function h(e, r = {}) {
    let i = e;
    r.size &&
      ((0, s.u)(i, { size: r.size }),
      (i = (0, n.g)(i, { dir: "right", size: r.size })));
    let o = i.slice(2);
    o.length % 2 && (o = `0${o}`);
    let a = o.length / 2,
      u = new Uint8Array(a);
    for (let e = 0, r = 0; e < a; e++) {
      let n = m(o.charCodeAt(r++)),
        s = m(o.charCodeAt(r++));
      if (void 0 === n || void 0 === s)
        throw new t.f(
          `Invalid byte sequence ("${o[r - 2]}${o[r - 1]}" in "${o}").`,
        );
      u[e] = 16 * n + s;
    }
    return u;
  }
  function _(e, t = {}) {
    let r = d.encode(e);
    return "number" == typeof t.size
      ? ((0, s.u)(r, { size: t.size }),
        (0, n.g)(r, { dir: "right", size: t.size }))
      : r;
  }
};
