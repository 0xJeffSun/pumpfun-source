// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  e.s(["V", () => s, "v", () => a, "N", () => l, "B", () => c, "g", () => o]);
  var t = e.i(108270),
    n = e.i(417672),
    r = e.i(382772);
  let i = Array.from({ length: 256 }, (e, t) =>
    t.toString(16).padStart(2, "0"),
  );
  function o(e, t = {}) {
    return "number" == typeof e || "bigint" == typeof e
      ? l(e, t)
      : "string" == typeof e
        ? c(e, t)
        : "boolean" == typeof e
          ? s(e, t)
          : a(e, t);
  }
  function s(e, t = {}) {
    let i = `0x${Number(e)}`;
    return "number" == typeof t.size
      ? ((0, r.u)(i, { size: t.size }), (0, n.g)(i, { size: t.size }))
      : i;
  }
  function a(e, t = {}) {
    let o = "";
    for (let t = 0; t < e.length; t++) o += i[e[t]];
    let s = `0x${o}`;
    return "number" == typeof t.size
      ? ((0, r.u)(s, { size: t.size }),
        (0, n.g)(s, { dir: "right", size: t.size }))
      : s;
  }
  function l(e, r = {}) {
    let i,
      { signed: o, size: s } = r,
      a = BigInt(e);
    s
      ? (i = o
          ? (1n << (8n * BigInt(s) - 1n)) - 1n
          : 2n ** (8n * BigInt(s)) - 1n)
      : "number" == typeof e && (i = BigInt(Number.MAX_SAFE_INTEGER));
    let u = "bigint" == typeof i && o ? -i - 1n : 0;
    if ((i && a > i) || a < u) {
      let n = "bigint" == typeof e ? "n" : "";
      throw new t.d({
        max: i ? `${i}${n}` : void 0,
        min: `${u}${n}`,
        signed: o,
        size: s,
        value: `${e}${n}`,
      });
    }
    let c = `0x${(o && a < 0 ? (1n << BigInt(8 * s)) + BigInt(a) : a).toString(16)}`;
    return s ? (0, n.g)(c, { size: s }) : c;
  }
  let u = new TextEncoder();
  function c(e, t = {}) {
    return a(u.encode(e), t);
  }
};
