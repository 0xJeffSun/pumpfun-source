// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(960892),
    r = e.i(470083),
    n = e.i(612735),
    s = e.i(382772),
    o = e.i(19648);
  async function i({ hash: t, signature: c }) {
    let u = (0, r.f)(t) ? t : (0, o.g)(t),
      { secp256k1: l } = await e.A(313886),
      d = (() => {
        if ("object" == typeof c && "r" in c && "s" in c) {
          let { r: e, s: t, v: r, yParity: n } = c,
            o = a(Number(n ?? r));
          return new l.Signature((0, s.K)(e), (0, s.K)(t)).addRecoveryBit(o);
        }
        let e = (0, r.f)(c) ? c : (0, o.g)(c);
        if (65 !== (0, n.f)(e)) throw Error("invalid signature length");
        let t = a((0, s.T)(`0x${e.slice(130)}`));
        return l.Signature.fromCompact(e.substring(2, 130)).addRecoveryBit(t);
      })()
        .recoverPublicKey(u.substring(2))
        .toHex(!1);
    return `0x${d}`;
  }
  function a(e) {
    if (0 === e || 1 === e) return e;
    if (27 === e) return 0;
    if (28 === e) return 1;
    throw Error("Invalid yParityOrV value");
  }
  async function c({ hash: e, signature: r }) {
    return (0, t.f)(await i({ hash: e, signature: r }));
  }
  (e.s(["f", 0, c], 526960),
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
