// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(352386),
    r = e.i(565530);
  let i = "0x0000000000000000000000000000000000000000",
    n = "https://api.relay.link",
    o = "https://api.testnets.relay.link",
    a = async ({ input: e, isTestnet: t }) => {
      let r = await fetch((t ? o : n) + "/quote", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(e),
        }),
        i = await r.json();
      if (
        !(
          r.ok ||
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
  async function l({ transactionHash: e, isTestnet: t }) {
    let r = await fetch((t ? o : n) + "/requests/v2?hash=" + e),
      i = await r.json();
    if (!r.ok) {
      if ("message" in i && "string" == typeof i.message)
        throw Error(i.message);
      throw Error("Error fetching request from relay");
    }
    return i.requests.at(0)?.status ?? "pending";
  }
  class s extends r.P {
    constructor(e, t) {
      (super(
        "We were unable to complete the bridging transaction. Funds will be refunded on your wallet.",
        void 0,
        r.a.TRANSACTION_FAILURE,
      ),
        (this.relayLink = t
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
      let t = e.steps[0]?.items?.[0];
      if (t)
        return {
          from: t.data.from,
          to: t.data.to,
          value: Number(t.data.value),
          chainId: Number(t.data.chainId),
          data: t.data.data,
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
    ({ appId: e, originCurrency: t, destinationCurrency: r, ...n }) => ({
      tradeType: "EXPECTED_OUTPUT",
      originCurrency: t ?? i,
      destinationCurrency: r ?? i,
      referrer: `privy|${e}`,
      ...n,
    }),
    "u",
    0,
    function ({
      transactionHash: e,
      isTestnet: r,
      bridgingStatus: i,
      setBridgingStatus: n,
      onSuccess: o,
      onFailure: a,
    }) {
      (0, t.useEffect)(() => {
        if (e && i) {
          if (["delayed", "waiting", "pending"].includes(i)) {
            let t = setInterval(async () => {
              try {
                let t = await l({ transactionHash: e, isTestnet: r });
                n(t);
              } catch (e) {
                console.error(e);
              }
            }, 1e3);
            return () => clearInterval(t);
          }
          "success" === i
            ? o({ transactionHash: e })
            : ["refund", "failure"].includes(i) && a({ error: new s(e, r) });
        }
      }, [i, e, r]);
    },
  ]);
};
