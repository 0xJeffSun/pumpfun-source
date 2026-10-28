// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  e.s(["u", () => i, "K", () => o, "d", () => l, "T", () => s, "m", () => c]);
  var t = e.i(501261),
    a = e.i(415415),
    r = e.i(990963),
    n = e.i(67223);
  function i(e, { size: r }) {
    if ((0, a.f)(e) > r) throw new t.j({ givenSize: (0, a.f)(e), maxSize: r });
  }
  function o(e, t = {}) {
    let { signed: a } = t;
    t.size && i(e, { size: t.size });
    let r = BigInt(e);
    if (!a) return r;
    let n = (e.length - 2) / 2;
    return r <= (1n << (8n * BigInt(n) - 1n)) - 1n
      ? r
      : r - BigInt(`0x${"f".padStart(2 * n, "f")}`) - 1n;
  }
  function l(e, a = {}) {
    let n = e;
    if (
      (a.size && (i(n, { size: a.size }), (n = (0, r.f)(n))),
      "0x00" === (0, r.f)(n))
    )
      return !1;
    if ("0x01" === (0, r.f)(n)) return !0;
    throw new t.l(n);
  }
  function s(e, a = {}) {
    let r = o(e, a),
      n = Number(r);
    if (!Number.isSafeInteger(n))
      throw new t.d({
        max: `${Number.MAX_SAFE_INTEGER}`,
        min: `${Number.MIN_SAFE_INTEGER}`,
        signed: a.signed,
        size: a.size,
        value: `${r}n`,
      });
    return n;
  }
  function c(e, t = {}) {
    let a = (0, n.X)(e);
    return (
      t.size && (i(a, { size: t.size }), (a = (0, r.f)(a, { dir: "right" }))),
      new TextDecoder().decode(a)
    );
  }
};
