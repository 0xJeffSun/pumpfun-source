// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var r = e.i(352386),
    n = e.i(565530);
  let i = "0x0000000000000000000000000000000000000000",
    t = "https://api.relay.link",
    s = "https://api.testnets.relay.link",
    a = async ({ input: e, isTestnet: r }) => {
      let n = await fetch((r ? s : t) + "/quote", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(e),
        }),
        i = await n.json();
      if (
        !(
          n.ok ||
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
  async function o({ transactionHash: e, isTestnet: r }) {
    let n = await fetch((r ? s : t) + "/requests/v2?hash=" + e),
      i = await n.json();
    if (!n.ok) {
      if ("message" in i && "string" == typeof i.message)
        throw Error(i.message);
      throw Error("Error fetching request from relay");
    }
    return i.requests.at(0)?.status ?? "pending";
  }
  class l extends n.P {
    constructor(e, r) {
      (super(
        "We were unable to complete the bridging transaction. Funds will be refunded on your wallet.",
        void 0,
        n.a.TRANSACTION_FAILURE,
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
    ({ appId: e, originCurrency: r, destinationCurrency: n, ...t }) => ({
      tradeType: "EXPECTED_OUTPUT",
      originCurrency: r ?? i,
      destinationCurrency: n ?? i,
      referrer: `privy|${e}`,
      ...t,
    }),
    "u",
    0,
    function ({
      transactionHash: e,
      isTestnet: n,
      bridgingStatus: i,
      setBridgingStatus: t,
      onSuccess: s,
      onFailure: a,
    }) {
      (0, r.useEffect)(() => {
        if (e && i) {
          if (["delayed", "waiting", "pending"].includes(i)) {
            let r = setInterval(async () => {
              try {
                let r = await o({ transactionHash: e, isTestnet: n });
                t(r);
              } catch (e) {
                console.error(e);
              }
            }, 1e3);
            return () => clearInterval(r);
          }
          "success" === i
            ? s({ transactionHash: e })
            : ["refund", "failure"].includes(i) && a({ error: new l(e, n) });
        }
      }, [i, e, n]);
    },
  ]);
};
