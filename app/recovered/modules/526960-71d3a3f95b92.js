// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(960892),
    r = e.i(470083),
    n = e.i(612735),
    i = e.i(382772),
    a = e.i(19648);
  async function o({ hash: t, signature: l }) {
    let u = (0, r.f)(t) ? t : (0, a.g)(t),
      { secp256k1: d } = await e.A(313886),
      c = (() => {
        if ("object" == typeof l && "r" in l && "s" in l) {
          let { r: e, s: t, v: r, yParity: n } = l,
            a = s(Number(n ?? r));
          return new d.Signature((0, i.K)(e), (0, i.K)(t)).addRecoveryBit(a);
        }
        let e = (0, r.f)(l) ? l : (0, a.g)(l);
        if (65 !== (0, n.f)(e)) throw Error("invalid signature length");
        let t = s((0, i.T)(`0x${e.slice(130)}`));
        return d.Signature.fromCompact(e.substring(2, 130)).addRecoveryBit(t);
      })()
        .recoverPublicKey(u.substring(2))
        .toHex(!1);
    return `0x${c}`;
  }
  function s(e) {
    if (0 === e || 1 === e) return e;
    if (27 === e) return 0;
    if (28 === e) return 1;
    throw Error("Invalid yParityOrV value");
  }
  async function l({ hash: e, signature: r }) {
    return (0, t.f)(await o({ hash: e, signature: r }));
  }
  (e.s(["f", 0, l], 526960),
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
