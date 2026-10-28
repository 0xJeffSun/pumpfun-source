// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(263965),
    r = e.i(613677),
    i = e.i(342463),
    a = e.i(297865),
    s = e.i(866890),
    n = e.i(637782),
    o = e.i(418096),
    d = e.i(896545),
    l = e.i(926556),
    u = e.i(33508);
  let p = o.z
    .enum(["relay", "bridge"])
    .nullish()
    .catch(void 0);
  e.s(["f", 0, p], 589750);
  let _ = r.z.object({
      status: i.z.string(),
      terminal: a.z.boolean(),
      in_tx_hashes: s.z.array(i.z.string()),
      tx_hashes: s.z.array(i.z.string()),
      fail_reason: i.z.string().nullish(),
      account_exists: a.z.boolean(),
      withdrawable: i.z.string().nullish(),
      funded: a.z.boolean(),
      hl_time: n.z.number().nullish(),
      rail: p,
      payout_asset: o.z
        .enum(["sol", "stable"])
        .nullish()
        .catch(void 0),
      payout_amount: i.z.string().nullish(),
    }),
    c = /^\d+$/,
    m = async ({ request: e, signal: t, timeoutMs: r }) => {
      var i, a;
      let s,
        n = await (0, u.m)({
          path: u.b.relayStatus,
          json: e,
          retryLimit: 0,
          timeoutMs: r,
          signal: t,
          logLevel: "warn",
        }),
        o = (0, u.E)({ schema: _, body: n, label: "fetch perp relay status" });
      return {
        status: o.status,
        terminal: o.terminal,
        inTxHashes: o.in_tx_hashes,
        txHashes: o.tx_hashes,
        failReason: o.fail_reason ?? void 0,
        accountExists: o.account_exists,
        withdrawable: o.withdrawable ?? null,
        funded: o.funded,
        hlTime: o.hl_time ?? void 0,
        rail: o.rail ?? void 0,
        ...((i = o.payout_asset ?? void 0),
        (a = o.payout_amount),
        (s = a?.trim()),
        void 0 !== i && void 0 !== s && c.test(s)
          ? { payoutAsset: i, payoutAmount: s }
          : {}),
      };
    };
  e.s(
    [
      "i",
      0,
      m,
      "h",
      0,
      (e) => {
        if (void 0 !== e.payoutAsset && void 0 !== e.payoutAmount)
          return "sol" === e.payoutAsset
            ? {
                denominationOut: "sol",
                outAmount: (0, t.f)(BigInt(e.payoutAmount), l.f),
              }
            : {
                denominationOut: "usdc",
                outAmount: (0, t.f)(BigInt(e.payoutAmount), d.K),
              };
      },
    ],
    239867,
  );
};
