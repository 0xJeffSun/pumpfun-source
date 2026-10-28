// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(402030),
    r = e.i(254667),
    n = e.i(528600),
    i = e.i(759257),
    a = e.i(503630),
    o = e.i(466931);
  let s = () =>
      "function" == typeof AbortSignal.timeout
        ? AbortSignal.timeout(1e4)
        : void 0,
    l = async (e) => {
      try {
        return (
          (
            await (0, n.e)({
              clientServerUrl: (0, a.R)(),
              userIdentifier: e,
              fetchOptions: { signal: s() },
            })
          ).canonical_evm_wallet ?? null
        );
      } catch (e) {
        if ((0, n.g)(e)) return null;
        throw e;
      }
    },
    u = "POST /wallet-mapping/link",
    d = "WALLET_LINK_SOL_ALREADY_LINKED",
    c = "WALLET_LINK_EVM_OWNED_ELSEWHERE";
  class p extends Error {
    status;
    code;
    constructor(e, t) {
      (super(`wallet mapping submit failed: ${e}`),
        (this.name = "WalletMappingSubmitError"),
        (this.status = e),
        (this.code = t));
    }
  }
  let f = async ({ solAddress: e, evmAddress: r, signature: n }) => {
      try {
        await (0, i.j)()(u, {
          body: {
            evmAddress: r.toLowerCase(),
            signature: n,
            messageVersion: 1,
            allowRebind: !1,
          },
          credentials: "include",
          signal: s(),
        });
      } catch (a) {
        if (!(0, t.isContractError)(a, u)) throw a;
        let { status: n, code: i } = a;
        throw (
          i !== d &&
            i !== c &&
            (0, o.l)({
              error: Error("Signed wallet mapping write was refused"),
              feature: "funding",
              operation: "evm-mapping-signed-write-refused",
              context: {
                solAddress: e,
                evmAddress: r,
                status: n,
                errorCode: i,
              },
            }),
          new p(n, i)
        );
      }
    },
    m = async ({ solAddress: e, evmWalletAddress: t }) => {
      try {
        let n = await l(e);
        if (null === n || n.toLowerCase() === t.toLowerCase()) return null;
        return (
          r.y.warn(
            "[walletMapping] mapping diverges from embedded wallet — web (Privy) session cannot adopt or rebind",
            { solAddress: e, evmWalletAddress: t, mappedEvmAddress: n },
          ),
          (0, o.l)({
            error: Error(
              "Account's canonical EVM mapping points at a wallet other than the embedded one",
            ),
            feature: "funding",
            operation: "evm-mapping-divergent-existing-wallet",
            context: {
              solAddress: e,
              evmWalletAddress: t,
              mappedEvmAddress: n,
            },
          }),
          n
        );
      } catch (n) {
        return (
          r.y.warn("[walletMapping] divergence lookup failed", {
            solAddress: e,
            evmWalletAddress: t,
            error: String(n),
          }),
          null
        );
      }
    },
    g = new Set(),
    y = (e, t) => `${e}:${t.toLowerCase()}`,
    h = ({
      solAddress: e,
      evmAddress: t,
      mappedEvmAddress: n,
      rereadFailed: i = !1,
    }) => {
      (r.y.warn(
        "[walletMapping] stale mapping detected — web (Privy) session cannot rebind",
        { solAddress: e, evmAddress: t, mappedEvmAddress: n, rereadFailed: i },
      ),
        (0, o.l)({
          error: Error(
            "Relay trade delivered to an EVM wallet different from the account's mapped wallet",
          ),
          feature: "funding",
          operation: "evm-mapping-stale-after-trade",
          context: {
            solAddress: e,
            evmAddress: t,
            mappedEvmAddress: n,
            rereadFailed: i,
          },
        }));
    },
    v = async ({ solAddress: e, evmAddress: t, signProof: n }) => {
      if (e && t && !g.has(y(e, t)))
        try {
          let i = await l(e);
          if (null === i) {
            let i = n ? await n({ solAddress: e, evmAddress: t }) : null;
            if (null === i)
              return void r.y.warn(
                "[walletMapping] mapping registration deferred to the next trade — EVM proof unavailable",
                { solAddress: e, evmAddress: t },
              );
            try {
              await f({ solAddress: e, evmAddress: t, signature: i });
            } catch (n) {
              if (!(n instanceof p)) throw n;
              if (n.code === c)
                return void r.y.warn(
                  "[walletMapping] evm address claimed by a different account",
                  { solAddress: e, evmAddress: t },
                );
              if (n.code === d) {
                let r = null,
                  n = !1;
                try {
                  r = await l(e);
                } catch {
                  n = !0;
                }
                if (r?.toLowerCase() === t.toLowerCase())
                  return void g.add(y(e, t));
                h({
                  solAddress: e,
                  evmAddress: t,
                  mappedEvmAddress: r,
                  rereadFailed: n,
                });
                return;
              }
              throw n;
            }
            (g.add(y(e, t)),
              r.y.info("[walletMapping] registered wallet mapping", {
                solAddress: e,
                evmAddress: t,
              }));
            return;
          }
          if (i.toLowerCase() === t.toLowerCase()) return void g.add(y(e, t));
          h({ solAddress: e, evmAddress: t, mappedEvmAddress: i });
        } catch (n) {
          r.y.warn("[walletMapping] post-trade mapping sync failed", {
            solAddress: e,
            evmAddress: t,
            error: String(n),
          });
        }
    };
  e.s(["E", 0, m, "h", 0, l, "i", 0, f, "B", 0, v]);
};
