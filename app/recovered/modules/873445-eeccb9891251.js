// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(445242),
    r = e.i(616800);
  e.s(["f", () => r.J], 399294);
  var r = r,
    n = e.i(254667),
    a = e.i(711085);
  let i = /^0x[a-fA-F0-9]{130}$/,
    o = ({ solAddress: e, evmAddress: t }) =>
      (0, a.buildEvmLinkMessageV1)(e, t),
    s = 6e3;
  class f extends Error {
    constructor() {
      (super("EVM link challenge timed out"),
        (this.name = "EvmLinkChallengeTimeoutError"));
    }
  }
  let l = (e, t) => {
      let r;
      return Promise.race([
        e,
        new Promise((e, n) => {
          r = setTimeout(() => {
            n(new f());
          }, t);
        }),
      ]).finally(() => {
        clearTimeout(r);
      });
    },
    c = async ({
      solAddress: e,
      resolveEvmAddress: t,
      signEvmMessage: r,
      signSolMessage: n,
      encode: a,
      onFailure: i,
      timeoutMs: f = s,
    }) => {
      let c = "resolve_evm_wallet",
        d = !1;
      try {
        return await l(
          (async () => {
            let i = await t();
            if (null === i || d) return null;
            let s = o({ solAddress: e, evmAddress: i });
            c = "sign_evm";
            let f = await r({ message: s, evmAddress: i });
            if (d) return null;
            c = "sign_sol";
            let l = a(await n(new TextEncoder().encode(s)));
            if (!f || !l) throw Error("incomplete EVM link challenge");
            return { evmAddress: i, evmSignature: f, solSignature: l };
          })(),
          f,
        );
      } catch (e) {
        return ((d = !0), i({ stage: c, error: e }), null);
      }
    },
    d = async ({
      solAddress: e,
      evmAddress: t,
      signEvmMessage: r,
      onFailure: n,
      timeoutMs: a = s,
    }) => {
      try {
        let n = await l(
          r({ message: o({ solAddress: e, evmAddress: t }), evmAddress: t }),
          a,
        );
        if (!i.test(n)) throw Error("malformed EVM link signature");
        return n;
      } catch (e) {
        return (n({ error: e }), null);
      }
    };
  e.s(["h", 0, s, "w", 0, c, "W", 0, d], 168534);
  var u = e.i(466931);
  e.s(
    [
      "f",
      0,
      function () {
        let e,
          a = (0, t.c)(2),
          { signMessage: i } = (0, r.J)();
        return (
          a[0] !== i
            ? ((e = (e) => {
                let { solAddress: t, evmAddress: r } = e;
                return d({
                  solAddress: t,
                  evmAddress: r,
                  signEvmMessage: async (e) => {
                    let { message: t, evmAddress: r } = e,
                      { signature: n } = await i(
                        { message: t },
                        { address: r, uiOptions: { showWalletUIs: !1 } },
                      );
                    return n;
                  },
                  timeoutMs: 15e3,
                  onFailure: (e) => {
                    let { error: a } = e;
                    (n.y.warn(
                      "[useSignEvmMappingProof] EVM mapping proof unavailable",
                      {
                        solAddress: t,
                        evmAddress: r,
                        reason: a instanceof Error ? a.message : String(a),
                      },
                    ),
                      (0, u.l)({
                        error: a,
                        feature: "funding",
                        operation: "evm-mapping-proof-unavailable",
                        context: { solAddress: t, evmAddress: r },
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
