// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(402030),
    r = e.i(254667),
    n = e.i(528600),
    a = e.i(759257),
    i = e.i(503630),
    o = e.i(466931);
  let s = () =>
      "function" == typeof AbortSignal.timeout
        ? AbortSignal.timeout(1e4)
        : void 0,
    f = async (e) => {
      try {
        return (
          (
            await (0, n.e)({
              clientServerUrl: (0, i.R)(),
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
    l = "POST /wallet-mapping/link",
    c = "WALLET_LINK_SOL_ALREADY_LINKED",
    d = "WALLET_LINK_EVM_OWNED_ELSEWHERE";
  class u extends Error {
    status;
    code;
    constructor(e, t) {
      (super(`wallet mapping submit failed: ${e}`),
        (this.name = "WalletMappingSubmitError"),
        (this.status = e),
        (this.code = t));
    }
  }
  let p = async ({ solAddress: e, evmAddress: r, signature: n }) => {
      try {
        await (0, a.j)()(l, {
          body: {
            evmAddress: r.toLowerCase(),
            signature: n,
            messageVersion: 1,
            allowRebind: !1,
          },
          credentials: "include",
          signal: s(),
        });
      } catch (i) {
        if (!(0, t.isContractError)(i, l)) throw i;
        let { status: n, code: a } = i;
        throw (
          a !== c &&
            a !== d &&
            (0, o.l)({
              error: Error("Signed wallet mapping write was refused"),
              feature: "funding",
              operation: "evm-mapping-signed-write-refused",
              context: {
                solAddress: e,
                evmAddress: r,
                status: n,
                errorCode: a,
              },
            }),
          new u(n, a)
        );
      }
    },
    h = async ({ solAddress: e, evmWalletAddress: t }) => {
      try {
        let n = await f(e);
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
    m = (e, t) => `${e}:${t.toLowerCase()}`,
    y = ({
      solAddress: e,
      evmAddress: t,
      mappedEvmAddress: n,
      rereadFailed: a = !1,
    }) => {
      (r.y.warn(
        "[walletMapping] stale mapping detected — web (Privy) session cannot rebind",
        { solAddress: e, evmAddress: t, mappedEvmAddress: n, rereadFailed: a },
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
            rereadFailed: a,
          },
        }));
    },
    v = async ({ solAddress: e, evmAddress: t, signProof: n }) => {
      if (e && t && !g.has(m(e, t)))
        try {
          let a = await f(e);
          if (null === a) {
            let a = n ? await n({ solAddress: e, evmAddress: t }) : null;
            if (null === a)
              return void r.y.warn(
                "[walletMapping] mapping registration deferred to the next trade — EVM proof unavailable",
                { solAddress: e, evmAddress: t },
              );
            try {
              await p({ solAddress: e, evmAddress: t, signature: a });
            } catch (n) {
              if (!(n instanceof u)) throw n;
              if (n.code === d)
                return void r.y.warn(
                  "[walletMapping] evm address claimed by a different account",
                  { solAddress: e, evmAddress: t },
                );
              if (n.code === c) {
                let r = null,
                  n = !1;
                try {
                  r = await f(e);
                } catch {
                  n = !0;
                }
                if (r?.toLowerCase() === t.toLowerCase())
                  return void g.add(m(e, t));
                y({
                  solAddress: e,
                  evmAddress: t,
                  mappedEvmAddress: r,
                  rereadFailed: n,
                });
                return;
              }
              throw n;
            }
            (g.add(m(e, t)),
              r.y.info("[walletMapping] registered wallet mapping", {
                solAddress: e,
                evmAddress: t,
              }));
            return;
          }
          if (a.toLowerCase() === t.toLowerCase()) return void g.add(m(e, t));
          y({ solAddress: e, evmAddress: t, mappedEvmAddress: a });
        } catch (n) {
          r.y.warn("[walletMapping] post-trade mapping sync failed", {
            solAddress: e,
            evmAddress: t,
            error: String(n),
          });
        }
    };
  e.s(["E", 0, h, "h", 0, f, "i", 0, p, "B", 0, v]);
};
