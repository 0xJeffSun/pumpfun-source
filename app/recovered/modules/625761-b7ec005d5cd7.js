// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(156732),
    i = e.i(748117),
    a = e.i(336291);
  let n = new Intl.NumberFormat(void 0, {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 2,
    }),
    r = (e, i = 6, a = !1) => {
      let n = parseFloat((0, t.f)(e))
        .toFixed(i)
        .replace(/0+$/, "")
        .replace(/\.$/, "");
      return a ? n : `${"0" === n ? "<0.001" : n}`;
    };
  e.s([
    "a",
    0,
    (e, i) => {
      let a,
        r = ((a = i * parseFloat((0, t.f)(e))), n.format(a));
      return "$0.00" === r ? "<$0.01" : r;
    },
    "b",
    0,
    (e, t) => {
      let { chains: n } = (0, i.u)(),
        r = `https://etherscan.io/address/${t}`,
        o = `${(0, a.n)(e, n)}/address/${t}`;
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
      let i,
        a = ((i = t * parseFloat(e)), n.format(i));
      return "$0.00" !== a ? a : "<$0.01";
    },
    "g",
    0,
    (e, t, i = 6, a = !1) => `${r(e, i, a)} ${t}`,
    "p",
    0,
    r,
    "s",
    0,
    (e) => e.reduce((e, t) => e + t, 0n),
  ]);
};
