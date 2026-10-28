// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(r) => {
  var e = r.i(352386),
    o = r.i(565530);
  let i = "0x0000000000000000000000000000000000000000",
    t = "https://api.relay.link",
    a = "https://api.testnets.relay.link",
    l = async ({ input: r, isTestnet: e }) => {
      let o = await fetch((e ? a : t) + "/quote", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(r),
        }),
        i = await o.json();
      if (
        !(
          o.ok ||
          ("string" == typeof i.message &&
            i.message.startsWith("Invalid address"))
        )
      )
        throw (
          console.error("Relay error:", i),
          Error(i.message ?? "Error fetching quote from relay")
        );
      return i;
    };
  async function n({ transactionHash: r, isTestnet: e }) {
    let o = await fetch((e ? a : t) + "/requests/v2?hash=" + r),
      i = await o.json();
    if (!o.ok) {
      if ("message" in i && "string" == typeof i.message)
        throw Error(i.message);
      throw Error("Error fetching request from relay");
    }
    return i.requests.at(0)?.status ?? "pending";
  }
  class s extends o.P {
    constructor(r, e) {
      (super(
        "We were unable to complete the bridging transaction. Funds will be refunded on your wallet.",
        void 0,
        o.a.TRANSACTION_FAILURE,
      ),
        (this.relayLink = e
          ? `https://testnets.relay.link/transaction/${r}`
          : `https://relay.link/transaction/${r}`));
    }
  }
  r.s([
    "R",
    0,
    s,
    "a",
    0,
    (r) => {
      let e = r.steps[0]?.items?.[0];
      if (e)
        return {
          from: e.data.from,
          to: e.data.to,
          value: Number(e.data.value),
          chainId: Number(e.data.chainId),
          data: e.data.data,
        };
    },
    "b",
    0,
    "11111111111111111111111111111111",
    "c",
    0,
    0x2f3fb341,
    "d",
    0,
    (r) =>
      r.steps
        .flatMap((r) => r.items?.filter((r) => "incomplete" === r.status) ?? [])
        .map((r) => ({
          from: r.data.from,
          to: r.data.to,
          value: Number(r.data.value),
          chainId: Number(r.data.chainId),
          data: r.data.data,
        })),
    "e",
    0,
    "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
    "g",
    0,
    l,
    "t",
    0,
    ({ appId: r, originCurrency: e, destinationCurrency: o, ...t }) => ({
      tradeType: "EXPECTED_OUTPUT",
      originCurrency: e ?? i,
      destinationCurrency: o ?? i,
      referrer: `privy|${r}`,
      ...t,
    }),
    "u",
    0,
    function ({
      transactionHash: r,
      isTestnet: o,
      bridgingStatus: i,
      setBridgingStatus: t,
      onSuccess: a,
      onFailure: l,
    }) {
      (0, e.useEffect)(() => {
        if (r && i) {
          if (["delayed", "waiting", "pending"].includes(i)) {
            let e = setInterval(async () => {
              try {
                let e = await n({ transactionHash: r, isTestnet: o });
                t(e);
              } catch (r) {
                console.error(r);
              }
            }, 1e3);
            return () => clearInterval(e);
          }
          "success" === i
            ? a({ transactionHash: r })
            : ["refund", "failure"].includes(i) && l({ error: new s(r, o) });
        }
      }, [i, r, o]);
    },
  ]);
};
