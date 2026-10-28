// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  e.s(["u", () => r, "K", () => a, "d", () => l, "T", () => u, "m", () => o]);
  var t = e.i(108270),
    n = e.i(612735),
    s = e.i(449985),
    i = e.i(590719);
  function r(e, { size: s }) {
    if ((0, n.f)(e) > s) throw new t.j({ givenSize: (0, n.f)(e), maxSize: s });
  }
  function a(e, t = {}) {
    let { signed: n } = t;
    t.size && r(e, { size: t.size });
    let s = BigInt(e);
    if (!n) return s;
    let i = (e.length - 2) / 2;
    return s <= (1n << (8n * BigInt(i) - 1n)) - 1n
      ? s
      : s - BigInt(`0x${"f".padStart(2 * i, "f")}`) - 1n;
  }
  function l(e, n = {}) {
    let i = e;
    if (
      (n.size && (r(i, { size: n.size }), (i = (0, s.f)(i))),
      "0x00" === (0, s.f)(i))
    )
      return !1;
    if ("0x01" === (0, s.f)(i)) return !0;
    throw new t.l(i);
  }
  function u(e, t = {}) {
    return Number(a(e, t));
  }
  function o(e, t = {}) {
    let n = (0, i.X)(e);
    return (
      t.size && (r(n, { size: t.size }), (n = (0, s.f)(n, { dir: "right" }))),
      new TextDecoder().decode(n)
    );
  }
};
