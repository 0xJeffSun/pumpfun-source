// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(r) => {
  var e = r.i(156732),
    o = r.i(748117),
    i = r.i(336291);
  let a = new Intl.NumberFormat(void 0, {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 2,
    }),
    t = (r, o = 6, i = !1) => {
      let a = parseFloat((0, e.f)(r))
        .toFixed(o)
        .replace(/0+$/, "")
        .replace(/\.$/, "");
      return i ? a : `${"0" === a ? "<0.001" : a}`;
    };
  r.s([
    "a",
    0,
    (r, o) => {
      let i,
        t = ((i = o * parseFloat((0, e.f)(r))), a.format(i));
      return "$0.00" === t ? "<$0.01" : t;
    },
    "b",
    0,
    (r, e) => {
      let { chains: a } = (0, o.u)(),
        t = `https://etherscan.io/address/${e}`,
        n = `${(0, i.n)(r, a)}/address/${e}`;
      try {
        new URL(n);
      } catch {
        return t;
      }
      return n;
    },
    "c",
    0,
    (r, e) => {
      let o,
        i = ((o = e * parseFloat(r)), a.format(o));
      return "$0.00" !== i ? i : "<$0.01";
    },
    "g",
    0,
    (r, e, o = 6, i = !1) => `${t(r, o, i)} ${e}`,
    "p",
    0,
    t,
    "s",
    0,
    (r) => r.reduce((r, e) => r + e, 0n),
  ]);
};
