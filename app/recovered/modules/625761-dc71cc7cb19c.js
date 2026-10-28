// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(156732),
    n = e.i(748117),
    a = e.i(336291);
  let i = new Intl.NumberFormat(void 0, {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 2,
    }),
    r = (e, n = 6, a = !1) => {
      let i = parseFloat((0, t.f)(e))
        .toFixed(n)
        .replace(/0+$/, "")
        .replace(/\.$/, "");
      return a ? i : `${"0" === i ? "<0.001" : i}`;
    };
  e.s([
    "a",
    0,
    (e, n) => {
      let a,
        r = ((a = n * parseFloat((0, t.f)(e))), i.format(a));
      return "$0.00" === r ? "<$0.01" : r;
    },
    "b",
    0,
    (e, t) => {
      let { chains: i } = (0, n.u)(),
        r = `https://etherscan.io/address/${t}`,
        o = `${(0, a.n)(e, i)}/address/${t}`;
      try {
        new URL(o);
      } catch {
        return r;
      }
      return o;
    },
    "c",
    0,
    (e, t) => {
      let n,
        a = ((n = t * parseFloat(e)), i.format(n));
      return "$0.00" !== a ? a : "<$0.01";
    },
    "g",
    0,
    (e, t, n = 6, a = !1) => `${r(e, n, a)} ${t}`,
    "p",
    0,
    r,
    "s",
    0,
    (e) => e.reduce((e, t) => e + t, 0n),
  ]);
};
