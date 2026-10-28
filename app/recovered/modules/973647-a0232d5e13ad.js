// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(440519),
    r = e.i(559787),
    n = e.i(410486);
  async function i(e, t) {
    let { account: a, decimals: s, spender: o, token: u, ...l } = t,
      [c, { decimals: f }] = await Promise.all([
        (0, r.f)(e, {
          ...l,
          ...i.call(e, { account: a, spender: o, token: u }),
        }),
        (0, n.u)(e, { decimals: s, token: u }),
      ]);
    return (0, n.i)(c, f);
  }
  async function a(e, i) {
    let { token: a, ...s } = i,
      { address: o } = (0, n.M)(e, { token: a }),
      u = (0, n.F)(e, a),
      [l, c, f] = await Promise.all([
        u?.decimals ??
          (0, r.f)(e, { ...s, abi: t.q, address: o, functionName: "decimals" }),
        u?.name ??
          (0, r.f)(e, { ...s, abi: t.q, address: o, functionName: "name" }),
        u?.symbol ??
          (0, r.f)(e, { ...s, abi: t.q, address: o, functionName: "symbol" }),
      ]);
    return { decimals: l, name: c, symbol: f };
  }
  (((i || (i = {})).call = function (e, r) {
    return (0, n.V)({
      address: (0, n.M)(e, r).address,
      abi: t.q,
      functionName: "allowance",
      args: [r.account, r.spender],
    });
  }),
    e.s(["f", 0, i], 973647),
    e.s(["f", 0, a], 5923));
};
