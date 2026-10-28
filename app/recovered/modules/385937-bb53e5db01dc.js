// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var r = e.i(352386),
    i = e.i(565530);
  let o = "0x0000000000000000000000000000000000000000",
    n = "https://api.relay.link",
    t = "https://api.testnets.relay.link",
    a = async ({ input: e, isTestnet: r }) => {
      let i = await fetch((r ? t : n) + "/quote", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(e),
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
  async function s({ transactionHash: e, isTestnet: r }) {
    let i = await fetch((r ? t : n) + "/requests/v2?hash=" + e),
      o = await i.json();
    if (!i.ok) {
      if ("message" in o && "string" == typeof o.message)
        throw Error(o.message);
      throw Error("Error fetching request from relay");
    }
    return o.requests.at(0)?.status ?? "pending";
  }
  class l extends i.P {
    constructor(e, r) {
      (super(
        "We were unable to complete the bridging transaction. Funds will be refunded on your wallet.",
        void 0,
        i.a.TRANSACTION_FAILURE,
      ),
        (this.relayLink = r
          ? `https://testnets.relay.link/transaction/${e}`
          : `https://relay.link/transaction/${e}`));
    }
  }
  e.s([
    "R",
    0,
    l,
    "a",
    0,
    (e) => {
      let r = e.steps[0]?.items?.[0];
      if (r)
        return {
          from: r.data.from,
          to: r.data.to,
          value: Number(r.data.value),
          chainId: Number(r.data.chainId),
          data: r.data.data,
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
    (e) =>
      e.steps
        .flatMap((e) => e.items?.filter((e) => "incomplete" === e.status) ?? [])
        .map((e) => ({
          from: e.data.from,
          to: e.data.to,
          value: Number(e.data.value),
          chainId: Number(e.data.chainId),
          data: e.data.data,
        })),
    "e",
    0,
    "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
    "g",
    0,
    a,
    "t",
    0,
    ({ appId: e, originCurrency: r, destinationCurrency: i, ...n }) => ({
      tradeType: "EXPECTED_OUTPUT",
      originCurrency: r ?? o,
      destinationCurrency: i ?? o,
      referrer: `privy|${e}`,
      ...n,
    }),
    "u",
    0,
    function ({
      transactionHash: e,
      isTestnet: i,
      bridgingStatus: o,
      setBridgingStatus: n,
      onSuccess: t,
      onFailure: a,
    }) {
      (0, r.useEffect)(() => {
        if (e && o) {
          if (["delayed", "waiting", "pending"].includes(o)) {
            let r = setInterval(async () => {
              try {
                let r = await s({ transactionHash: e, isTestnet: i });
                n(r);
              } catch (e) {
                console.error(e);
              }
            }, 1e3);
            return () => clearInterval(r);
          }
          "success" === o
            ? t({ transactionHash: e })
            : ["refund", "failure"].includes(o) && a({ error: new l(e, i) });
        }
      }, [o, e, i]);
    },
  ]);
};
