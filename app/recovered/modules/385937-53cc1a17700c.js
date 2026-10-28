// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var r = e.i(352386),
    t = e.i(565530);
  let i = "0x0000000000000000000000000000000000000000",
    o = "https://api.relay.link",
    n = "https://api.testnets.relay.link",
    a = async ({ input: e, isTestnet: r }) => {
      let t = await fetch((r ? n : o) + "/quote", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(e),
        }),
        i = await t.json();
      if (
        !(
          t.ok ||
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
  async function l({ transactionHash: e, isTestnet: r }) {
    let t = await fetch((r ? n : o) + "/requests/v2?hash=" + e),
      i = await t.json();
    if (!t.ok) {
      if ("message" in i && "string" == typeof i.message)
        throw Error(i.message);
      throw Error("Error fetching request from relay");
    }
    return i.requests.at(0)?.status ?? "pending";
  }
  class s extends t.P {
    constructor(e, r) {
      (super(
        "We were unable to complete the bridging transaction. Funds will be refunded on your wallet.",
        void 0,
        t.a.TRANSACTION_FAILURE,
      ),
        (this.relayLink = r
          ? `https://testnets.relay.link/transaction/${e}`
          : `https://relay.link/transaction/${e}`));
    }
  }
  e.s([
    "R",
    0,
    s,
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
    ({ appId: e, originCurrency: r, destinationCurrency: t, ...o }) => ({
      tradeType: "EXPECTED_OUTPUT",
      originCurrency: r ?? i,
      destinationCurrency: t ?? i,
      referrer: `privy|${e}`,
      ...o,
    }),
    "u",
    0,
    function ({
      transactionHash: e,
      isTestnet: t,
      bridgingStatus: i,
      setBridgingStatus: o,
      onSuccess: n,
      onFailure: a,
    }) {
      (0, r.useEffect)(() => {
        if (e && i) {
          if (["delayed", "waiting", "pending"].includes(i)) {
            let r = setInterval(async () => {
              try {
                let r = await l({ transactionHash: e, isTestnet: t });
                o(r);
              } catch (e) {
                console.error(e);
              }
            }, 1e3);
            return () => clearInterval(r);
          }
          "success" === i
            ? n({ transactionHash: e })
            : ["refund", "failure"].includes(i) && a({ error: new s(e, t) });
        }
      }, [i, e, t]);
    },
  ]);
};
