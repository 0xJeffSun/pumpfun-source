// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  e.s(["u", () => i, "K", () => o, "d", () => a, "T", () => u, "m", () => l]);
  var t = e.i(501261),
    r = e.i(415415),
    n = e.i(990963),
    s = e.i(67223);
  function i(e, { size: n }) {
    if ((0, r.f)(e) > n) throw new t.j({ givenSize: (0, r.f)(e), maxSize: n });
  }
  function o(e, t = {}) {
    let { signed: r } = t;
    t.size && i(e, { size: t.size });
    let n = BigInt(e);
    if (!r) return n;
    let s = (e.length - 2) / 2;
    return n <= (1n << (8n * BigInt(s) - 1n)) - 1n
      ? n
      : n - BigInt(`0x${"f".padStart(2 * s, "f")}`) - 1n;
  }
  function a(e, r = {}) {
    let s = e;
    if (
      (r.size && (i(s, { size: r.size }), (s = (0, n.f)(s))),
      "0x00" === (0, n.f)(s))
    )
      return !1;
    if ("0x01" === (0, n.f)(s)) return !0;
    throw new t.l(s);
  }
  function u(e, r = {}) {
    let n = o(e, r),
      s = Number(n);
    if (!Number.isSafeInteger(s))
      throw new t.d({
        max: `${Number.MAX_SAFE_INTEGER}`,
        min: `${Number.MIN_SAFE_INTEGER}`,
        signed: r.signed,
        size: r.size,
        value: `${n}n`,
      });
    return s;
  }
  function l(e, t = {}) {
    let r = (0, s.X)(e);
    return (
      t.size && (i(r, { size: t.size }), (r = (0, n.f)(r, { dir: "right" }))),
      new TextDecoder().decode(r)
    );
  }
};
