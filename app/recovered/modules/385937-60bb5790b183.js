// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(r) => {
  var e = r.i(352386),
    i = r.i(565530);
  let o = "0x0000000000000000000000000000000000000000",
    t = "https://api.relay.link",
    a = "https://api.testnets.relay.link",
    n = async ({ input: r, isTestnet: e }) => {
      let i = await fetch((e ? a : t) + "/quote", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(r),
        }),
        o = await i.json();
      if (
        !(
          i.ok ||
          ("string" == typeof o.message &&
            o.message.startsWith("Invalid address"))
        )
      )
        throw (
          console.error("Relay error:", o),
          Error(o.message ?? "Error fetching quote from relay")
        );
      return o;
    };
  async function l({ transactionHash: r, isTestnet: e }) {
    let i = await fetch((e ? a : t) + "/requests/v2?hash=" + r),
      o = await i.json();
    if (!i.ok) {
      if ("message" in o && "string" == typeof o.message)
        throw Error(o.message);
      throw Error("Error fetching request from relay");
    }
    return o.requests.at(0)?.status ?? "pending";
  }
  class s extends i.P {
    constructor(r, e) {
      (super(
        "We were unable to complete the bridging transaction. Funds will be refunded on your wallet.",
        void 0,
        i.a.TRANSACTION_FAILURE,
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
    n,
    "t",
    0,
    ({ appId: r, originCurrency: e, destinationCurrency: i, ...t }) => ({
      tradeType: "EXPECTED_OUTPUT",
      originCurrency: e ?? o,
      destinationCurrency: i ?? o,
      referrer: `privy|${r}`,
      ...t,
    }),
    "u",
    0,
    function ({
      transactionHash: r,
      isTestnet: i,
      bridgingStatus: o,
      setBridgingStatus: t,
      onSuccess: a,
      onFailure: n,
    }) {
      (0, e.useEffect)(() => {
        if (r && o) {
          if (["delayed", "waiting", "pending"].includes(o)) {
            let e = setInterval(async () => {
              try {
                let e = await l({ transactionHash: r, isTestnet: i });
                t(e);
              } catch (r) {
                console.error(r);
              }
            }, 1e3);
            return () => clearInterval(e);
          }
          "success" === o
            ? a({ transactionHash: r })
            : ["refund", "failure"].includes(o) && n({ error: new s(r, i) });
        }
      }, [o, r, i]);
    },
  ]);
};
