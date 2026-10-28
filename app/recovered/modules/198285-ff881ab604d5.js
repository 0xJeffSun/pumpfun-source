// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(616800);
  e.s(["f", () => t.R], 198285);
  var r = e.i(445242),
    n = e.i(582355),
    n = n,
    i = e.i(166984),
    a = e.i(965142);
  let o = "secp256k1_sign";
  class s extends Error {
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
            let r;
            return (
              "privy" === e.walletClientType &&
              ((r = e.address), r.toLowerCase() === t.toLowerCase())
            );
          }) ?? null),
    u = (e, t, r) => {
      let n = l(e, t);
      return {
        listed: null !== n,
        connector: n?.connectorType ?? null,
        sdk_ready: r,
      };
    },
    d = /^0x[0-9a-fA-F]{130}$/,
    c = async (e, t) => {
      let r = await e.getEthereumProvider(),
        n = (0, a.f)({
          contractAddress: t.contractAddress,
          chainId: t.chainId,
          nonce: t.nonce,
        }),
        s = await r.request({ method: o, params: [n] });
      if ("string" != typeof s || !d.test(s))
        throw Error(`${o} returned no 65-byte signature for ${e.address}`);
      let { r: l, s: u, yParity: c } = (0, i.f)(s);
      return {
        address: t.contractAddress,
        chainId: t.chainId,
        nonce: t.nonce,
        r: l,
        s: u,
        yParity: c,
      };
    },
    f = async (e, t, r) => {
      let n = l(e, t);
      if (null === n) throw new s(t);
      return c(n, r);
    };
  (e.s(["L", 0, s, "o", 0, u, "n", 0, l, "V", 0, f], 495717),
    e.s(
      [
        "f",
        0,
        () => {
          let e,
            t,
            i,
            a,
            o = (0, r.c)(11),
            { wallets: s, ready: d } = (0, n.u)();
          return (
            o[0] !== s
              ? ((e = (e) => null !== l(s, e)), (o[0] = s), (o[1] = e))
              : (e = o[1]),
            o[2] !== d || o[3] !== s
              ? ((t = (e) => u(s, e, d)), (o[2] = d), (o[3] = s), (o[4] = t))
              : (t = o[4]),
            o[5] !== s
              ? ((i = (e, t) => {
                  let { address: r } = t;
                  return f(s, r, e);
                }),
                (o[5] = s),
                (o[6] = i))
              : (i = o[6]),
            o[7] !== e || o[8] !== t || o[9] !== i
              ? ((a = { isReadyFor: e, describe: t, signAuthorization: i }),
                (o[7] = e),
                (o[8] = t),
                (o[9] = i),
                (o[10] = a))
              : (a = o[10]),
            a
          );
        },
      ],
      130379,
    ));
};
