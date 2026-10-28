// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(960892),
    n = e.i(470083),
    r = e.i(612735),
    s = e.i(382772),
    i = e.i(19648);
  async function a({ hash: t, signature: u }) {
    let p = (0, n.f)(t) ? t : (0, i.g)(t),
      { secp256k1: y } = await e.A(313886),
      c = (() => {
        if ("object" == typeof u && "r" in u && "s" in u) {
          let { r: e, s: t, v: n, yParity: r } = u,
            i = o(Number(r ?? n));
          return new y.Signature((0, s.K)(e), (0, s.K)(t)).addRecoveryBit(i);
        }
        let e = (0, n.f)(u) ? u : (0, i.g)(u);
        if (65 !== (0, r.f)(e)) throw Error("invalid signature length");
        let t = o((0, s.T)(`0x${e.slice(130)}`));
        return y.Signature.fromCompact(e.substring(2, 130)).addRecoveryBit(t);
      })()
        .recoverPublicKey(p.substring(2))
        .toHex(!1);
    return `0x${c}`;
  }
  function o(e) {
    if (0 === e || 1 === e) return e;
    if (27 === e) return 0;
    if (28 === e) return 1;
    throw Error("Invalid yParityOrV value");
  }
  async function u({ hash: e, signature: n }) {
    return (0, t.f)(await a({ hash: e, signature: n }));
  }
  (e.s(["f", 0, u], 526960),
    e.s(
      [
        "l",
        0,
        "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",
        "B",
        0,
        "0x0000000000000000000000000000000000000000",
      ],
      790907,
    ));
};
