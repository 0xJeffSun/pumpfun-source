// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  e.s(["u", () => o, "K", () => s, "d", () => a, "T", () => l, "m", () => u]);
  var t = e.i(108270),
    n = e.i(612735),
    r = e.i(449985),
    i = e.i(590719);
  function o(e, { size: r }) {
    if ((0, n.f)(e) > r) throw new t.j({ givenSize: (0, n.f)(e), maxSize: r });
  }
  function s(e, t = {}) {
    let { signed: n } = t;
    t.size && o(e, { size: t.size });
    let r = BigInt(e);
    if (!n) return r;
    let i = (e.length - 2) / 2;
    return r <= (1n << (8n * BigInt(i) - 1n)) - 1n
      ? r
      : r - BigInt(`0x${"f".padStart(2 * i, "f")}`) - 1n;
  }
  function a(e, n = {}) {
    let i = e;
    if (
      (n.size && (o(i, { size: n.size }), (i = (0, r.f)(i))),
      "0x00" === (0, r.f)(i))
    )
      return !1;
    if ("0x01" === (0, r.f)(i)) return !0;
    throw new t.l(i);
  }
  function l(e, t = {}) {
    return Number(s(e, t));
  }
  function u(e, t = {}) {
    let n = (0, i.X)(e);
    return (
      t.size && (o(n, { size: t.size }), (n = (0, r.f)(n, { dir: "right" }))),
      new TextDecoder().decode(n)
    );
  }
};
