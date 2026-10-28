// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(445242),
    n = e.i(616800);
  e.s(["f", () => n.J], 399294);
  var n = n,
    r = e.i(254667),
    a = e.i(711085);
  let i = /^0x[a-fA-F0-9]{130}$/,
    o = ({ solAddress: e, evmAddress: t }) =>
      (0, a.buildEvmLinkMessageV1)(e, t),
    l = 6e3;
  class s extends Error {
    constructor() {
      (super("EVM link challenge timed out"),
        (this.name = "EvmLinkChallengeTimeoutError"));
    }
  }
  let d = (e, t) => {
      let n;
      return Promise.race([
        e,
        new Promise((e, r) => {
          n = setTimeout(() => {
            r(new s());
          }, t);
        }),
      ]).finally(() => {
        clearTimeout(n);
      });
    },
    u = async ({
      solAddress: e,
      resolveEvmAddress: t,
      signEvmMessage: n,
      signSolMessage: r,
      encode: a,
      onFailure: i,
      timeoutMs: s = l,
    }) => {
      let u = "resolve_evm_wallet",
        c = !1;
      try {
        return await d(
          (async () => {
            let i = await t();
            if (null === i || c) return null;
            let l = o({ solAddress: e, evmAddress: i });
            u = "sign_evm";
            let s = await n({ message: l, evmAddress: i });
            if (c) return null;
            u = "sign_sol";
            let d = a(await r(new TextEncoder().encode(l)));
            if (!s || !d) throw Error("incomplete EVM link challenge");
            return { evmAddress: i, evmSignature: s, solSignature: d };
          })(),
          s,
        );
      } catch (e) {
        return ((c = !0), i({ stage: u, error: e }), null);
      }
    },
    c = async ({
      solAddress: e,
      evmAddress: t,
      signEvmMessage: n,
      onFailure: r,
      timeoutMs: a = l,
    }) => {
      try {
        let r = await d(
          n({ message: o({ solAddress: e, evmAddress: t }), evmAddress: t }),
          a,
        );
        if (!i.test(r)) throw Error("malformed EVM link signature");
        return r;
      } catch (e) {
        return (r({ error: e }), null);
      }
    };
  e.s(["h", 0, l, "w", 0, u, "W", 0, c], 168534);
  var p = e.i(466931);
  e.s(
    [
      "f",
      0,
      function () {
        let e,
          a = (0, t.c)(2),
          { signMessage: i } = (0, n.J)();
        return (
          a[0] !== i
            ? ((e = (e) => {
                let { solAddress: t, evmAddress: n } = e;
                return c({
                  solAddress: t,
                  evmAddress: n,
                  signEvmMessage: async (e) => {
                    let { message: t, evmAddress: n } = e,
                      { signature: r } = await i(
                        { message: t },
                        { address: n, uiOptions: { showWalletUIs: !1 } },
                      );
                    return r;
                  },
                  timeoutMs: 15e3,
                  onFailure: (e) => {
                    let { error: a } = e;
                    (r.y.warn(
                      "[useSignEvmMappingProof] EVM mapping proof unavailable",
                      {
                        solAddress: t,
                        evmAddress: n,
                        reason: a instanceof Error ? a.message : String(a),
                      },
                    ),
                      (0, p.l)({
                        error: a,
                        feature: "funding",
                        operation: "evm-mapping-proof-unavailable",
                        context: { solAddress: t, evmAddress: n },
                      }));
                  },
                });
              }),
              (a[0] = i),
              (a[1] = e))
            : (e = a[1]),
          e
        );
      },
    ],
    873445,
  );
};
