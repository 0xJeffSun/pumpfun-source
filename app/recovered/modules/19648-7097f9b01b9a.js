// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  e.s(["V", () => a, "v", () => l, "N", () => u, "B", () => d, "g", () => r]);
  var t = e.i(108270),
    n = e.i(417672),
    s = e.i(382772);
  let i = Array.from({ length: 256 }, (e, t) =>
    t.toString(16).padStart(2, "0"),
  );
  function r(e, t = {}) {
    return "number" == typeof e || "bigint" == typeof e
      ? u(e, t)
      : "string" == typeof e
        ? d(e, t)
        : "boolean" == typeof e
          ? a(e, t)
          : l(e, t);
  }
  function a(e, t = {}) {
    let i = `0x${Number(e)}`;
    return "number" == typeof t.size
      ? ((0, s.u)(i, { size: t.size }), (0, n.g)(i, { size: t.size }))
      : i;
  }
  function l(e, t = {}) {
    let r = "";
    for (let t = 0; t < e.length; t++) r += i[e[t]];
    let a = `0x${r}`;
    return "number" == typeof t.size
      ? ((0, s.u)(a, { size: t.size }),
        (0, n.g)(a, { dir: "right", size: t.size }))
      : a;
  }
  function u(e, s = {}) {
    let i,
      { signed: r, size: a } = s,
      l = BigInt(e);
    a
      ? (i = r
          ? (1n << (8n * BigInt(a) - 1n)) - 1n
          : 2n ** (8n * BigInt(a)) - 1n)
      : "number" == typeof e && (i = BigInt(Number.MAX_SAFE_INTEGER));
    let o = "bigint" == typeof i && r ? -i - 1n : 0;
    if ((i && l > i) || l < o) {
      let n = "bigint" == typeof e ? "n" : "";
      throw new t.d({
        max: i ? `${i}${n}` : void 0,
        min: `${o}${n}`,
        signed: r,
        size: a,
        value: `${e}${n}`,
      });
    }
    let d = `0x${(r && l < 0 ? (1n << BigInt(8 * a)) + BigInt(l) : l).toString(16)}`;
    return a ? (0, n.g)(d, { size: a }) : d;
  }
  let o = new TextEncoder();
  function d(e, t = {}) {
    return l(o.encode(e), t);
  }
};
