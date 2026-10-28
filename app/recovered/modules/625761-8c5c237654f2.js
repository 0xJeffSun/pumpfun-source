// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(156732),
    n = e.i(748117),
    a = e.i(336291);
  let r = new Intl.NumberFormat(void 0, {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 2,
    }),
    i = (e, n = 6, a = !1) => {
      let r = parseFloat((0, t.f)(e))
        .toFixed(n)
        .replace(/0+$/, "")
        .replace(/\.$/, "");
      return a ? r : `${"0" === r ? "<0.001" : r}`;
    };
  e.s([
    "a",
    0,
    (e, n) => {
      let a,
        i = ((a = n * parseFloat((0, t.f)(e))), r.format(a));
      return "$0.00" === i ? "<$0.01" : i;
    },
    "b",
    0,
    (e, t) => {
      let { chains: r } = (0, n.u)(),
        i = `https://etherscan.io/address/${t}`,
        o = `${(0, a.n)(e, r)}/address/${t}`;
      try {
        new URL(o);
      } catch {
        return i;
      }
      return o;
    },
    "c",
    0,
    (e, t) => {
      let n,
        a = ((n = t * parseFloat(e)), r.format(n));
      return "$0.00" !== a ? a : "<$0.01";
    },
    "g",
    0,
    (e, t, n = 6, a = !1) => `${i(e, n, a)} ${t}`,
    "p",
    0,
    i,
    "s",
    0,
    (e) => e.reduce((e, t) => e + t, 0n),
  ]);
};
