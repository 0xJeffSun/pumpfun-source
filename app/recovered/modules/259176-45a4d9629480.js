// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  (e.s(["f", () => s], 472560),
    e.s(
      [
        "f",
        0,
        {
          caipNetworkIdToNumber: (e) => (e ? Number(e.split(":")[1]) : void 0),
          parseEvmChainId(e) {
            return "string" == typeof e ? this.caipNetworkIdToNumber(e) : e;
          },
          getNetworksByNamespace: (e, t) =>
            e?.filter((e) => e.chainNamespace === t) || [],
          getFirstNetworkByNamespace(e, t) {
            return this.getNetworksByNamespace(e, t)[0];
          },
        },
      ],
      259176,
    ),
    e.s(
      [
        "f",
        0,
        function (e, t) {
          return "light" === t
            ? {
                "--w3m-accent":
                  e?.["--w3m-accent"] || "hsla(231, 100%, 70%, 1)",
                "--w3m-background": "#fff",
              }
            : {
                "--w3m-accent":
                  e?.["--w3m-accent"] || "hsla(230, 100%, 67%, 1)",
                "--w3m-background": "#121313",
              };
        },
      ],
      129086,
    ));
  var t = e.i(450314),
    i = e.i(8242);
  let s = {
    handleSolanaDeeplinkRedirect(e) {
      if (i.f.state.activeChain === t.f.CHAIN.SOLANA) {
        let t = window.location.href,
          i = encodeURIComponent(t);
        if ("Phantom" === e && !("phantom" in window)) {
          let e = t.startsWith("https") ? "https" : "http",
            s = t.split("/")[2],
            r = encodeURIComponent(`${e}://${s}`);
          window.location.href = `https://phantom.app/ul/browse/${i}?ref=${r}`;
        }
        "Coinbase Wallet" !== e ||
          "coinbaseSolana" in window ||
          (window.location.href = `https://go.cb-w.com/dapp?cb_url=${i}`);
      }
    },
  };
};
