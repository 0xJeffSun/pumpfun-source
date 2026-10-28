// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var r = e.i(156732),
    o = e.i(748117),
    i = e.i(336291);
  let a = new Intl.NumberFormat(void 0, {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 2,
    }),
    n = (e, o = 6, i = !1) => {
      let a = parseFloat((0, r.f)(e))
        .toFixed(o)
        .replace(/0+$/, "")
        .replace(/\.$/, "");
      return i ? a : `${"0" === a ? "<0.001" : a}`;
    };
  e.s([
    "a",
    0,
    (e, o) => {
      let i,
        n = ((i = o * parseFloat((0, r.f)(e))), a.format(i));
      return "$0.00" === n ? "<$0.01" : n;
    },
    "b",
    0,
    (e, r) => {
      let { chains: a } = (0, o.u)(),
        n = `https://etherscan.io/address/${r}`,
        t = `${(0, i.n)(e, a)}/address/${r}`;
      try {
        new URL(t);
      } catch {
        return n;
      }
      return t;
    },
    "c",
    0,
    (e, r) => {
      let o,
        i = ((o = r * parseFloat(e)), a.format(o));
      return "$0.00" !== i ? i : "<$0.01";
    },
    "g",
    0,
    (e, r, o = 6, i = !1) => `${n(e, o, i)} ${r}`,
    "p",
    0,
    n,
    "s",
    0,
    (e) => e.reduce((e, r) => e + r, 0n),
  ]);
};
