// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  e.i(149502);
  var t = e.i(959719),
    n = e.i(971370),
    r = e.i(541710),
    o = e.i(646908),
    i = e.i(605587),
    u = e.i(449597);
  let a = new n.PublicKey(u.r),
    l = new n.PublicKey(u.j),
    c = (e) => e.toNumber() / n.LAMPORTS_PER_SOL,
    s = (e) => !!e && !!(e.equals(a) || e.equals(l)),
    f = (e) => (0, u.Q)(e?.toBase58()),
    d = (e) => !f(e) && !s(e),
    m = (e, t) => (0, u.x)(e?.toBase58(), t),
    h = (e) => (0, u.q)(e?.toBase58()),
    g = (e, t, n) => {
      if (void 0 === e || "" === e) return;
      let r = m(t, n);
      if (void 0 !== r) return (Number(String(e)) / 10 ** r).toFixed(r);
    };
  e.s([
    "a",
    0,
    g,
    "V",
    0,
    (e, t, n) => {
      let r = e.toString();
      if (s(t)) return `${r} (${(e.toNumber() / 1e6).toFixed(6)} USDC)`;
      if (d(t)) {
        let e = h(t);
        return null == n
          ? `${r} ${e} base units`
          : `${r} (${(Number(r) / 10 ** n).toFixed(n)} ${e})`;
      }
      return `${r} lamports (${c(e).toFixed(9)} SOL)`;
    },
    "n",
    0,
    (e, t, n) => {
      let r = String(e),
        o = g(r, t, n),
        i = h(t);
      return void 0 === o ? `${r} ${i} base units` : `${r} (${o} ${i})`;
    },
    "H",
    0,
    (e) => {
      if (
        !(
          !e?.quote_mint ||
          (0, i.N)({ mint: e.mint, chainId: e.chain_id }) ||
          (0, o.L)(e.chain_id)
        ) &&
        null == (0, r.T)(e.chain_id)
      )
        return new n.PublicKey(e.quote_mint);
    },
    "N",
    0,
    m,
    "k",
    0,
    (e) => (!e || e.equals(n.PublicKey.default) || e.equals(t.w) ? t.w : e),
    "W",
    0,
    h,
    "p",
    0,
    () => l,
    "Z",
    0,
    d,
    "i",
    0,
    f,
    "w",
    0,
    s,
    "h",
    0,
    c,
    "U",
    0,
    (e, t, n) => {
      let r = m(t, n);
      return void 0 === r ? void 0 : e.toNumber() / 10 ** r;
    },
  ]);
};
