// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(960892),
    n = e.i(470083),
    i = e.i(612735),
    r = e.i(382772),
    s = e.i(19648);
  async function o({ hash: t, signature: u }) {
    let c = (0, n.f)(t) ? t : (0, s.g)(t),
      { secp256k1: l } = await e.A(313886),
      d = (() => {
        if ("object" == typeof u && "r" in u && "s" in u) {
          let { r: e, s: t, v: n, yParity: i } = u,
            s = a(Number(i ?? n));
          return new l.Signature((0, r.K)(e), (0, r.K)(t)).addRecoveryBit(s);
        }
        let e = (0, n.f)(u) ? u : (0, s.g)(u);
        if (65 !== (0, i.f)(e)) throw Error("invalid signature length");
        let t = a((0, r.T)(`0x${e.slice(130)}`));
        return l.Signature.fromCompact(e.substring(2, 130)).addRecoveryBit(t);
      })()
        .recoverPublicKey(c.substring(2))
        .toHex(!1);
    return `0x${d}`;
  }
  function a(e) {
    if (0 === e || 1 === e) return e;
    if (27 === e) return 0;
    if (28 === e) return 1;
    throw Error("Invalid yParityOrV value");
  }
  async function u({ hash: e, signature: n }) {
    return (0, t.f)(await o({ hash: e, signature: n }));
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
