// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(t) => {
  t.s(["V", () => o, "v", () => a, "N", () => u, "B", () => l, "g", () => r]);
  var e = t.i(108270),
    n = t.i(417672),
    i = t.i(382772);
  let s = Array.from({ length: 256 }, (t, e) =>
    e.toString(16).padStart(2, "0"),
  );
  function r(t, e = {}) {
    return "number" == typeof t || "bigint" == typeof t
      ? u(t, e)
      : "string" == typeof t
        ? l(t, e)
        : "boolean" == typeof t
          ? o(t, e)
          : a(t, e);
  }
  function o(t, e = {}) {
    let s = `0x${Number(t)}`;
    return "number" == typeof e.size
      ? ((0, i.u)(s, { size: e.size }), (0, n.g)(s, { size: e.size }))
      : s;
  }
  function a(t, e = {}) {
    let r = "";
    for (let e = 0; e < t.length; e++) r += s[t[e]];
    let o = `0x${r}`;
    return "number" == typeof e.size
      ? ((0, i.u)(o, { size: e.size }),
        (0, n.g)(o, { dir: "right", size: e.size }))
      : o;
  }
  function u(t, i = {}) {
    let s,
      { signed: r, size: o } = i,
      a = BigInt(t);
    o
      ? (s = r
          ? (1n << (8n * BigInt(o) - 1n)) - 1n
          : 2n ** (8n * BigInt(o)) - 1n)
      : "number" == typeof t && (s = BigInt(Number.MAX_SAFE_INTEGER));
    let p = "bigint" == typeof s && r ? -s - 1n : 0;
    if ((s && a > s) || a < p) {
      let n = "bigint" == typeof t ? "n" : "";
      throw new e.d({
        max: s ? `${s}${n}` : void 0,
        min: `${p}${n}`,
        signed: r,
        size: o,
        value: `${t}${n}`,
      });
    }
    let l = `0x${(r && a < 0 ? (1n << BigInt(8 * o)) + BigInt(a) : a).toString(16)}`;
    return o ? (0, n.g)(l, { size: o }) : l;
  }
  let p = new TextEncoder();
  function l(t, e = {}) {
    return a(p.encode(t), e);
  }
};
