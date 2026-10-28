// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(934429),
    r = e.i(703114),
    n = e.i(891487);
  async function i(
    e,
    {
      blockHash: a,
      blockNumber: s,
      blockTag: o = e.experimental_blockTag ?? "latest",
    } = {},
  ) {
    let u = void 0 !== s ? (0, r.N)(s) : void 0,
      l = await e.request(
        { method: "eth_getBlockReceipts", params: [a || u || o] },
        { dedupe: !!(a || u) },
      );
    if (!l) throw new t.f({ blockHash: a, blockNumber: s });
    let c = e.chain?.formatters?.transactionReceipt?.format || n.L;
    return l.map((e) => c(e, "getBlockReceipts"));
  }
  e.s(["f", 0, i], 679952);
  var a = e.i(339513);
  async function s(
    e,
    { blockHash: t, blockNumber: n, blockTag: i = "latest" } = {},
  ) {
    let o,
      u = void 0 !== n ? (0, r.N)(n) : void 0;
    return (
      (o = t
        ? await e.request(
            { method: "eth_getBlockTransactionCountByHash", params: [t] },
            { dedupe: !0 },
          )
        : await e.request(
            {
              method: "eth_getBlockTransactionCountByNumber",
              params: [u || i],
            },
            { dedupe: !!u },
          )),
      (0, a.T)(o)
    );
  }
  e.s(["f", 0, s], 83067);
  var o = e.i(698174);
  async function u(
    e,
    {
      address: t,
      blockHash: r,
      blockNumber: n,
      blockTag: i = "latest",
      requireCanonical: a,
    },
  ) {
    let s = (0, o.f)({
        blockHash: r,
        blockNumber: n,
        blockTag: i,
        requireCanonical: a,
      }),
      l = await e.request(
        { method: "eth_getCode", params: [t, s] },
        { dedupe: "bigint" == typeof n || void 0 !== r },
      );
    if ("0x" !== l) return l;
  }
  e.s(["f", 0, u], 285945);
};
