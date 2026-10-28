// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(445242),
    r = e.i(616800);
  e.s(["f", () => r.J], 399294);
  var r = r,
    n = e.i(254667),
    i = e.i(711085);
  let a = /^0x[a-fA-F0-9]{130}$/,
    o = ({ solAddress: e, evmAddress: t }) =>
      (0, i.buildEvmLinkMessageV1)(e, t),
    s = 6e3;
  class l extends Error {
    constructor() {
      (super("EVM link challenge timed out"),
        (this.name = "EvmLinkChallengeTimeoutError"));
    }
  }
  let u = (e, t) => {
      let r;
      return Promise.race([
        e,
        new Promise((e, n) => {
          r = setTimeout(() => {
            n(new l());
          }, t);
        }),
      ]).finally(() => {
        clearTimeout(r);
      });
    },
    d = async ({
      solAddress: e,
      resolveEvmAddress: t,
      signEvmMessage: r,
      signSolMessage: n,
      encode: i,
      onFailure: a,
      timeoutMs: l = s,
    }) => {
      let d = "resolve_evm_wallet",
        c = !1;
      try {
        return await u(
          (async () => {
            let a = await t();
            if (null === a || c) return null;
            let s = o({ solAddress: e, evmAddress: a });
            d = "sign_evm";
            let l = await r({ message: s, evmAddress: a });
            if (c) return null;
            d = "sign_sol";
            let u = i(await n(new TextEncoder().encode(s)));
            if (!l || !u) throw Error("incomplete EVM link challenge");
            return { evmAddress: a, evmSignature: l, solSignature: u };
          })(),
          l,
        );
      } catch (e) {
        return ((c = !0), a({ stage: d, error: e }), null);
      }
    },
    c = async ({
      solAddress: e,
      evmAddress: t,
      signEvmMessage: r,
      onFailure: n,
      timeoutMs: i = s,
    }) => {
      try {
        let n = await u(
          r({ message: o({ solAddress: e, evmAddress: t }), evmAddress: t }),
          i,
        );
        if (!a.test(n)) throw Error("malformed EVM link signature");
        return n;
      } catch (e) {
        return (n({ error: e }), null);
      }
    };
  e.s(["h", 0, s, "w", 0, d, "W", 0, c], 168534);
  var p = e.i(466931);
  e.s(
    [
      "f",
      0,
      function () {
        let e,
          i = (0, t.c)(2),
          { signMessage: a } = (0, r.J)();
        return (
          i[0] !== a
            ? ((e = (e) => {
                let { solAddress: t, evmAddress: r } = e;
                return c({
                  solAddress: t,
                  evmAddress: r,
                  signEvmMessage: async (e) => {
                    let { message: t, evmAddress: r } = e,
                      { signature: n } = await a(
                        { message: t },
                        { address: r, uiOptions: { showWalletUIs: !1 } },
                      );
                    return n;
                  },
                  timeoutMs: 15e3,
                  onFailure: (e) => {
                    let { error: i } = e;
                    (n.y.warn(
                      "[useSignEvmMappingProof] EVM mapping proof unavailable",
                      {
                        solAddress: t,
                        evmAddress: r,
                        reason: i instanceof Error ? i.message : String(i),
                      },
                    ),
                      (0, p.l)({
                        error: i,
                        feature: "funding",
                        operation: "evm-mapping-proof-unavailable",
                        context: { solAddress: t, evmAddress: r },
                      }));
                  },
                });
              }),
              (i[0] = a),
              (i[1] = e))
            : (e = i[1]),
          e
        );
      },
    ],
    873445,
  );
};
