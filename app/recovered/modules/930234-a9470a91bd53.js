// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(646908),
    r = e.i(605587);
  let l = { "eip155:196": 0 };
  e.s([
    "f",
    0,
    function (e) {
      let n = e.chain_id ?? null;
      if (!(0, r.g)(n) && !(0, t.L)(n) && !(0, t.B)(n)) return !0;
      let a = e.canonical_pool_liquidity_usd;
      return null == a || a >= (l[`eip155:${(0, r.w)(n)}`] ?? 4e3);
    },
  ]);
};
