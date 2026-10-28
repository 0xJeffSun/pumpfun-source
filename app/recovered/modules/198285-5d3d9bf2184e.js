// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(616800);
  e.s(["f", () => t.R], 198285);
  var i = e.i(445242),
    n = e.i(582355),
    n = n,
    r = e.i(166984),
    s = e.i(965142);
  let o = "secp256k1_sign";
  class a extends Error {
    address;
    constructor(e) {
      (super(`Privy embedded EVM wallet ${e} is not loaded on this device`),
        (this.name = "EmbeddedEvmSignerUnavailableError"),
        (this.address = e));
    }
  }
  let l = (e, t) =>
      "string" != typeof t || 0 === t.length
        ? null
        : (e.find((e) => {
            let i;
            return (
              "privy" === e.walletClientType &&
              ((i = e.address), i.toLowerCase() === t.toLowerCase())
            );
          }) ?? null),
    u = (e, t, i) => {
      let n = l(e, t);
      return {
        listed: null !== n,
        connector: n?.connectorType ?? null,
        sdk_ready: i,
      };
    },
    d = /^0x[0-9a-fA-F]{130}$/,
    c = async (e, t) => {
      let i = await e.getEthereumProvider(),
        n = (0, s.f)({
          contractAddress: t.contractAddress,
          chainId: t.chainId,
          nonce: t.nonce,
        }),
        a = await i.request({ method: o, params: [n] });
      if ("string" != typeof a || !d.test(a))
        throw Error(`${o} returned no 65-byte signature for ${e.address}`);
      let { r: l, s: u, yParity: c } = (0, r.f)(a);
      return {
        address: t.contractAddress,
        chainId: t.chainId,
        nonce: t.nonce,
        r: l,
        s: u,
        yParity: c,
      };
    },
    p = async (e, t, i) => {
      let n = l(e, t);
      if (null === n) throw new a(t);
      return c(n, i);
    };
  (e.s(["L", 0, a, "o", 0, u, "n", 0, l, "V", 0, p], 495717),
    e.s(
      [
        "f",
        0,
        () => {
          let e,
            t,
            r,
            s,
            o = (0, i.c)(11),
            { wallets: a, ready: d } = (0, n.u)();
          return (
            o[0] !== a
              ? ((e = (e) => null !== l(a, e)), (o[0] = a), (o[1] = e))
              : (e = o[1]),
            o[2] !== d || o[3] !== a
              ? ((t = (e) => u(a, e, d)), (o[2] = d), (o[3] = a), (o[4] = t))
              : (t = o[4]),
            o[5] !== a
              ? ((r = (e, t) => {
                  let { address: i } = t;
                  return p(a, i, e);
                }),
                (o[5] = a),
                (o[6] = r))
              : (r = o[6]),
            o[7] !== e || o[8] !== t || o[9] !== r
              ? ((s = { isReadyFor: e, describe: t, signAuthorization: r }),
                (o[7] = e),
                (o[8] = t),
                (o[9] = r),
                (o[10] = s))
              : (s = o[10]),
            s
          );
        },
      ],
      130379,
    ));
};
