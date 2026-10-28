// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(389238),
    r = e.i(772488),
    n = e.i(520417),
    i = e.i(415415),
    a = e.i(339513),
    s = e.i(703114);
  async function o({ hash: t, signature: r }) {
    let l = (0, n.f)(t) ? t : (0, s.g)(t),
      { secp256k1: c } = await e.A(313886),
      f = (() => {
        if ("object" == typeof r && "r" in r && "s" in r) {
          let { r: e, s: t, v: n, yParity: i } = r,
            s = u(Number(i ?? n));
          return new c.Signature((0, a.K)(e), (0, a.K)(t)).addRecoveryBit(s);
        }
        let e = (0, n.f)(r) ? r : (0, s.g)(r);
        if (65 !== (0, i.f)(e)) throw Error("invalid signature length");
        let t = u((0, a.T)(`0x${e.slice(130)}`));
        return c.Signature.fromCompact(e.substring(2, 130)).addRecoveryBit(t);
      })()
        .recoverPublicKey(l.substring(2))
        .toHex(!1);
    return `0x${f}`;
  }
  function u(e) {
    if (0 === e || 1 === e) return e;
    if (27 === e) return 0;
    if (28 === e) return 1;
    throw Error("Invalid yParityOrV value");
  }
  async function l({ hash: e, signature: n }) {
    var i;
    let a;
    return (
      (i = await o({ hash: e, signature: n })),
      (a = (0, r.f)(`0x${i.substring(4)}`).substring(26)),
      (0, t.b)(`0x${a}`)
    );
  }
  e.s(["f", 0, l], 78080);
  var c = e.i(850697),
    f = e.i(67223),
    d = e.i(927974),
    p = e.i(173169);
  function y(e, t = "hex") {
    let r = (function e(t) {
        var r, n;
        let i, a, s, o;
        return Array.isArray(t)
          ? ((a = h(
              (i = (r = t.map((t) => e(t))).reduce((e, t) => e + t.length, 0)),
            )),
            {
              length: i <= 55 ? 1 + i : 1 + a + i,
              encode(e) {
                for (let { encode: t } of (i <= 55
                  ? e.pushByte(192 + i)
                  : (e.pushByte(247 + a),
                    1 === a
                      ? e.pushUint8(i)
                      : 2 === a
                        ? e.pushUint16(i)
                        : 3 === a
                          ? e.pushUint24(i)
                          : e.pushUint32(i)),
                r))
                  t(e);
              },
            })
          : ((o = h((s = "string" == typeof (n = t) ? (0, f.X)(n) : n).length)),
            {
              length:
                1 === s.length && s[0] < 128
                  ? 1
                  : s.length <= 55
                    ? 1 + s.length
                    : 1 + o + s.length,
              encode(e) {
                ((1 === s.length && s[0] < 128) ||
                  (s.length <= 55
                    ? e.pushByte(128 + s.length)
                    : (e.pushByte(183 + o),
                      1 === o
                        ? e.pushUint8(s.length)
                        : 2 === o
                          ? e.pushUint16(s.length)
                          : 3 === o
                            ? e.pushUint24(s.length)
                            : e.pushUint32(s.length))),
                  e.pushBytes(s));
              },
            });
      })(e),
      n = (0, p.f)(new Uint8Array(r.length));
    return (r.encode(n), "hex" === t) ? (0, s.v)(n.bytes) : n.bytes;
  }
  function h(e) {
    if (e < 256) return 1;
    if (e < 65536) return 2;
    if (e < 0x1000000) return 3;
    if (e < 0x100000000) return 4;
    throw new d.f("Length is too large.");
  }
  function m(e) {
    let { chainId: t, nonce: n, to: i } = e,
      a = e.contractAddress ?? e.address,
      o = (0, r.f)(
        (0, c.s)([
          "0x05",
          y([t ? (0, s.N)(t) : "0x", a, n ? (0, s.N)(n) : "0x"]),
        ]),
      );
    return "bytes" === i ? (0, f.X)(o) : o;
  }
  async function g(e) {
    let { authorization: t, signature: r } = e;
    return l({ hash: m(t), signature: r ?? t });
  }
  (e.s(["f", 0, y], 377510), e.s(["f", 0, m], 58574), e.s(["f", 0, g], 459862));
  var b = e.i(156732),
    w = e.i(393048),
    v = d,
    x = e.i(147864);
  class P extends v.f {
    constructor(
      e,
      {
        account: t,
        docsPath: r,
        chain: n,
        data: i,
        gas: a,
        gasPrice: s,
        maxFeePerGas: o,
        maxPriorityFeePerGas: u,
        nonce: l,
        to: c,
        value: f,
      },
    ) {
      let d = (0, x.P)({
        from: t?.address,
        to: c,
        value:
          void 0 !== f &&
          `${(0, b.f)(f)} ${n?.nativeCurrency?.symbol || "ETH"}`,
        data: i,
        gas: a,
        gasPrice: void 0 !== s && `${(0, w.f)(s)} gwei`,
        maxFeePerGas: void 0 !== o && `${(0, w.f)(o)} gwei`,
        maxPriorityFeePerGas: void 0 !== u && `${(0, w.f)(u)} gwei`,
        nonce: l,
      });
      (super(e.shortMessage, {
        cause: e,
        docsPath: r,
        metaMessages: [
          ...(e.metaMessages ? [...e.metaMessages, " "] : []),
          "Estimate Gas Arguments:",
          d,
        ].filter(Boolean),
        name: "EstimateGasExecutionError",
      }),
        Object.defineProperty(this, "cause", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: void 0,
        }),
        (this.cause = e));
    }
  }
  var k = e.i(790336),
    A = e.i(197820);
  e.s(
    [
      "f",
      0,
      function (e, { docsPath: t, ...r }) {
        let n;
        return new P((n = (0, A.f)(e, r)) instanceof k.b ? e : n, {
          docsPath: t,
          ...r,
        });
      },
    ],
    517662,
  );
};
