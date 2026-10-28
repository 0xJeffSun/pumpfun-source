// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(402030),
    n = e.i(254667),
    r = e.i(528600),
    a = e.i(759257),
    i = e.i(503630),
    o = e.i(466931);
  let l = () =>
      "function" == typeof AbortSignal.timeout
        ? AbortSignal.timeout(1e4)
        : void 0,
    s = async (e) => {
      try {
        return (
          (
            await (0, r.e)({
              clientServerUrl: (0, i.R)(),
              userIdentifier: e,
              fetchOptions: { signal: l() },
            })
          ).canonical_evm_wallet ?? null
        );
      } catch (e) {
        if ((0, r.g)(e)) return null;
        throw e;
      }
    },
    d = "POST /wallet-mapping/link",
    u = "WALLET_LINK_SOL_ALREADY_LINKED",
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
  let f = async ({ solAddress: e, evmAddress: n, signature: r }) => {
      try {
        await (0, a.j)()(d, {
          body: {
            evmAddress: n.toLowerCase(),
            signature: r,
            messageVersion: 1,
            allowRebind: !1,
          },
          credentials: "include",
          signal: l(),
        });
      } catch (i) {
        if (!(0, t.isContractError)(i, d)) throw i;
        let { status: r, code: a } = i;
        throw (
          a !== u &&
            a !== c &&
            (0, o.l)({
              error: Error("Signed wallet mapping write was refused"),
              feature: "funding",
              operation: "evm-mapping-signed-write-refused",
              context: {
                solAddress: e,
                evmAddress: n,
                status: r,
                errorCode: a,
              },
            }),
          new p(r, a)
        );
      }
    },
    g = async ({ solAddress: e, evmWalletAddress: t }) => {
      try {
        let r = await s(e);
        if (null === r || r.toLowerCase() === t.toLowerCase()) return null;
        return (
          n.y.warn(
            "[walletMapping] mapping diverges from embedded wallet — web (Privy) session cannot adopt or rebind",
            { solAddress: e, evmWalletAddress: t, mappedEvmAddress: r },
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
              mappedEvmAddress: r,
            },
          }),
          r
        );
      } catch (r) {
        return (
          n.y.warn("[walletMapping] divergence lookup failed", {
            solAddress: e,
            evmWalletAddress: t,
            error: String(r),
          }),
          null
        );
      }
    },
    h = new Set(),
    m = (e, t) => `${e}:${t.toLowerCase()}`,
    v = ({
      solAddress: e,
      evmAddress: t,
      mappedEvmAddress: r,
      rereadFailed: a = !1,
    }) => {
      (n.y.warn(
        "[walletMapping] stale mapping detected — web (Privy) session cannot rebind",
        { solAddress: e, evmAddress: t, mappedEvmAddress: r, rereadFailed: a },
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
            mappedEvmAddress: r,
            rereadFailed: a,
          },
        }));
    },
    w = async ({ solAddress: e, evmAddress: t, signProof: r }) => {
      if (e && t && !h.has(m(e, t)))
        try {
          let a = await s(e);
          if (null === a) {
            let a = r ? await r({ solAddress: e, evmAddress: t }) : null;
            if (null === a)
              return void n.y.warn(
                "[walletMapping] mapping registration deferred to the next trade — EVM proof unavailable",
                { solAddress: e, evmAddress: t },
              );
            try {
              await f({ solAddress: e, evmAddress: t, signature: a });
            } catch (r) {
              if (!(r instanceof p)) throw r;
              if (r.code === c)
                return void n.y.warn(
                  "[walletMapping] evm address claimed by a different account",
                  { solAddress: e, evmAddress: t },
                );
              if (r.code === u) {
                let n = null,
                  r = !1;
                try {
                  n = await s(e);
                } catch {
                  r = !0;
                }
                if (n?.toLowerCase() === t.toLowerCase())
                  return void h.add(m(e, t));
                v({
                  solAddress: e,
                  evmAddress: t,
                  mappedEvmAddress: n,
                  rereadFailed: r,
                });
                return;
              }
              throw r;
            }
            (h.add(m(e, t)),
              n.y.info("[walletMapping] registered wallet mapping", {
                solAddress: e,
                evmAddress: t,
              }));
            return;
          }
          if (a.toLowerCase() === t.toLowerCase()) return void h.add(m(e, t));
          v({ solAddress: e, evmAddress: t, mappedEvmAddress: a });
        } catch (r) {
          n.y.warn("[walletMapping] post-trade mapping sync failed", {
            solAddress: e,
            evmAddress: t,
            error: String(r),
          });
        }
    };
  e.s(["E", 0, g, "h", 0, s, "i", 0, f, "B", 0, w]);
};
