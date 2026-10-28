// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(r) => {
  var e = r.i(352386),
    o = r.i(565530);
  let a = "0x0000000000000000000000000000000000000000",
    i = "https://api.relay.link",
    t = "https://api.testnets.relay.link",
    n = async ({ input: r, isTestnet: e }) => {
      let o = await fetch((e ? t : i) + "/quote", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(r),
        }),
        a = await o.json();
      if (
        !(
          o.ok ||
          ("string" == typeof a.message &&
            a.message.startsWith("Invalid address"))
        )
      )
        throw (
          console.error("Relay error:", a),
          Error(a.message ?? "Error fetching quote from relay")
        );
      return a;
    };
  async function l({ transactionHash: r, isTestnet: e }) {
    let o = await fetch((e ? t : i) + "/requests/v2?hash=" + r),
      a = await o.json();
    if (!o.ok) {
      if ("message" in a && "string" == typeof a.message)
        throw Error(a.message);
      throw Error("Error fetching request from relay");
    }
    return a.requests.at(0)?.status ?? "pending";
  }
  class c extends o.P {
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
    c,
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
    ({ appId: r, originCurrency: e, destinationCurrency: o, ...i }) => ({
      tradeType: "EXPECTED_OUTPUT",
      originCurrency: e ?? a,
      destinationCurrency: o ?? a,
      referrer: `privy|${r}`,
      ...i,
    }),
    "u",
    0,
    function ({
      transactionHash: r,
      isTestnet: o,
      bridgingStatus: a,
      setBridgingStatus: i,
      onSuccess: t,
      onFailure: n,
    }) {
      (0, e.useEffect)(() => {
        if (r && a) {
          if (["delayed", "waiting", "pending"].includes(a)) {
            let e = setInterval(async () => {
              try {
                let e = await l({ transactionHash: r, isTestnet: o });
                i(e);
              } catch (r) {
                console.error(r);
              }
            }, 1e3);
            return () => clearInterval(e);
          }
          "success" === a
            ? t({ transactionHash: r })
            : ["refund", "failure"].includes(a) && n({ error: new c(r, o) });
        }
      }, [a, r, o]);
    },
  ]);
};
