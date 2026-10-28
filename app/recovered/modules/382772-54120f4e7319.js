// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(t) => {
  t.s(["u", () => r, "K", () => o, "d", () => a, "T", () => u, "m", () => p]);
  var e = t.i(108270),
    n = t.i(612735),
    i = t.i(449985),
    s = t.i(590719);
  function r(t, { size: i }) {
    if ((0, n.f)(t) > i) throw new e.j({ givenSize: (0, n.f)(t), maxSize: i });
  }
  function o(t, e = {}) {
    let { signed: n } = e;
    e.size && r(t, { size: e.size });
    let i = BigInt(t);
    if (!n) return i;
    let s = (t.length - 2) / 2;
    return i <= (1n << (8n * BigInt(s) - 1n)) - 1n
      ? i
      : i - BigInt(`0x${"f".padStart(2 * s, "f")}`) - 1n;
  }
  function a(t, n = {}) {
    let s = t;
    if (
      (n.size && (r(s, { size: n.size }), (s = (0, i.f)(s))),
      "0x00" === (0, i.f)(s))
    )
      return !1;
    if ("0x01" === (0, i.f)(s)) return !0;
    throw new e.l(s);
  }
  function u(t, e = {}) {
    return Number(o(t, e));
  }
  function p(t, e = {}) {
    let n = (0, s.X)(t);
    return (
      e.size && (r(n, { size: e.size }), (n = (0, i.f)(n, { dir: "right" }))),
      new TextDecoder().decode(n)
    );
  }
};
