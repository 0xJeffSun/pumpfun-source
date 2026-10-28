// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var i = e.i(156732),
    t = e.i(748117),
    r = e.i(336291);
  let n = new Intl.NumberFormat(void 0, {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 2,
    }),
    o = (e, t = 6, r = !1) => {
      let n = parseFloat((0, i.f)(e))
        .toFixed(t)
        .replace(/0+$/, "")
        .replace(/\.$/, "");
      return r ? n : `${"0" === n ? "<0.001" : n}`;
    };
  e.s([
    "a",
    0,
    (e, t) => {
      let r,
        o = ((r = t * parseFloat((0, i.f)(e))), n.format(r));
      return "$0.00" === o ? "<$0.01" : o;
    },
    "b",
    0,
    (e, i) => {
      let { chains: n } = (0, t.u)(),
        o = `https://etherscan.io/address/${i}`,
        a = `${(0, r.n)(e, n)}/address/${i}`;
      try {
        new URL(a);
      } catch {
        return o;
      }
      return a;
    },
    "c",
    0,
    (e, i) => {
      let t,
        r = ((t = i * parseFloat(e)), n.format(t));
      return "$0.00" !== r ? r : "<$0.01";
    },
    "g",
    0,
    (e, i, t = 6, r = !1) => `${o(e, t, r)} ${i}`,
    "p",
    0,
    o,
    "s",
    0,
    (e) => e.reduce((e, i) => e + i, 0n),
  ]);
};
