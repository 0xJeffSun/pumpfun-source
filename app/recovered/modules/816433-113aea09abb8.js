// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(717473),
    r = e.i(440519),
    n = e.i(590847),
    i = e.i(559787),
    a = e.i(410486);
  async function s(e, r) {
    let { account: o = e.account, decimals: u, token: l, ...c } = r;
    if (!o) throw new n.A();
    let f = (0, t.f)(o).address,
      [d, { decimals: p }] = await Promise.all([
        (0, i.f)(e, { ...c, ...s.call(e, { account: f, token: l }) }),
        (0, a.u)(e, { decimals: u, token: l }),
      ]);
    return (0, a.i)(d, p);
  }
  async function o(e, t) {
    let { decimals: r, token: n, ...s } = t,
      [u, { decimals: l }] = await Promise.all([
        (0, i.f)(e, { ...s, ...o.call(e, { token: n }) }),
        (0, a.u)(e, { decimals: r, token: n }),
      ]);
    return (0, a.i)(u, l);
  }
  (((s || (s = {})).call = function (e, i) {
    let s = i.account ?? e.account;
    if (!s) throw new n.A();
    let o = (0, t.f)(s).address;
    return (0, a.V)({
      address: (0, a.M)(e, i).address,
      abi: r.q,
      functionName: "balanceOf",
      args: [o],
    });
  }),
    e.s(["f", 0, s], 816433),
    ((o || (o = {})).call = function (e, t) {
      return (0, a.V)({
        address: (0, a.M)(e, t).address,
        abi: r.q,
        args: [],
        functionName: "totalSupply",
      });
    }),
    e.s(["f", 0, o], 892440));
};
