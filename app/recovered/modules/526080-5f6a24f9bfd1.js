// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(958083);
  let r = 6,
    l = (e) => {
      if (!e) return null;
      let r = new t.U(e);
      return !r.isFinite() || r.lessThanOrEqualTo(0) ? null : r;
    },
    n = (e, r) => e.div(new t.U(10).pow(r)).toNumber(),
    a = (e, t) => {
      let r = l(e);
      return r
        ? r.isInteger() && r.greaterThanOrEqualTo(1e12)
          ? n(r, t)
          : r.toNumber()
        : 0;
    },
    i = (e, t) => {
      let i = e.base_decimals ?? r,
        s = a(t, i);
      if (s > 0) return s;
      let u = l(e.circulating_supply_str);
      if (u) return n(u, i);
      let o = l(e.total_supply_str);
      if (o) return n(o, i);
      let c = l(e.total_supply);
      return c ? n(c, i) : 1e9;
    },
    s = (e) => "number" == typeof e && Number.isFinite(e) && e > 0;
  e.s([
    "X",
    0,
    (e) => {
      let t = e.base_decimals ?? r,
        a = l(e.circulating_supply_str);
      return a ? n(a, t) : null;
    },
    "B",
    0,
    i,
    "M",
    0,
    (e, t = r) => a(e, t),
    "u",
    0,
    (e) =>
      !!(
        l(e.circulating_supply_str) ||
        l(e.total_supply_str) ||
        l(e.total_supply)
      ),
    "v",
    0,
    (e, t) => s(e) && s(t) && Math.abs(e / t - 1) > 0.001,
    "r",
    0,
    ({ coin: e, eventSupply: t, knownSupply: l }) => {
      let n = a(t, e.base_decimals ?? r);
      return n > 0 ? n : s(l) ? l : i(e);
    },
  ]);
};
