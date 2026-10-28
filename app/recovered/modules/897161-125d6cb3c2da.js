// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(147864),
    r = e.i(703114),
    n = e.i(943343);
  async function i(
    e,
    {
      blockHash: a,
      blockNumber: s,
      blockTag: o,
      hash: u,
      index: l,
      sender: c,
      nonce: f,
    },
  ) {
    let d = o || "latest",
      p = void 0 !== s ? (0, r.N)(s) : void 0,
      y = null;
    if (
      (u
        ? (y = await e.request(
            { method: "eth_getTransactionByHash", params: [u] },
            { dedupe: !0 },
          ))
        : a
          ? (y = await e.request(
              {
                method: "eth_getTransactionByBlockHashAndIndex",
                params: [a, (0, r.N)(l)],
              },
              { dedupe: !0 },
            ))
          : (p || d) && "number" == typeof l
            ? (y = await e.request(
                {
                  method: "eth_getTransactionByBlockNumberAndIndex",
                  params: [p || d, (0, r.N)(l)],
                },
                { dedupe: !!p },
              ))
            : c &&
              "number" == typeof f &&
              (y = await e.request(
                {
                  method: "eth_getTransactionBySenderAndNonce",
                  params: [c, (0, r.N)(f)],
                },
                { dedupe: !0 },
              )),
      !y)
    )
      throw new t.z({
        blockHash: a,
        blockNumber: s,
        blockTag: d,
        hash: u,
        index: l,
      });
    return (e.chain?.formatters?.transaction?.format || n.F)(
      y,
      "getTransaction",
    );
  }
  e.s(["f", 0, i]);
};
