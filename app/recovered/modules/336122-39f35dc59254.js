// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  async function t(e, { filter: r }) {
    return r.request({ method: "eth_uninstallFilter", params: [r.id] });
  }
  e.s(["f", 0, t], 336122);
  var r = e.i(442903),
    n = e.i(702133),
    i = e.i(65177);
  let a = "0x6492649264926492649264926492649264926492649264926492649264926492";
  class s extends n.f {
    constructor(e) {
      (super(`Value \`${e}\` is an invalid ERC-6492 wrapped signature.`),
        Object.defineProperty(this, "name", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: "SignatureErc6492.InvalidWrappedSignatureError",
        }));
    }
  }
  e.s(
    [
      "validate",
      0,
      function (e) {
        try {
          if (i.M(e, -32) !== a) throw new s(e);
          return !0;
        } catch {
          return !1;
        }
      },
      "wrap",
      0,
      function (e) {
        let { data: t, signature: n, to: s } = e;
        return i.w(r.q(r.f("address, bytes, bytes"), [s, t, n]), a);
      },
    ],
    897553,
  );
  var o = e.i(897553),
    o = o,
    u = o,
    l = e.i(755805),
    c = e.i(829833),
    f = e.i(368245);
  function d(e, t, r) {
    if (128 === r && t < 128) return 1;
    if (t <= r + 55) return t - r;
    if (t === r + 55 + 1) return e.readUint8();
    if (t === r + 55 + 2) return e.readUint16();
    if (t === r + 55 + 3) return e.readUint24();
    if (t === r + 55 + 4) return e.readUint32();
    throw new n.f("Invalid RLP prefix");
  }
  function p(e, t = {}) {
    let { as: r = "Hex" } = t;
    return (function (e, t) {
      let { as: r } = t,
        n = (function e(t) {
          var r, n;
          let i, a, s, o;
          return Array.isArray(t)
            ? ((a = y(
                (i = (r = t.map((t) => e(t))).reduce(
                  (e, t) => e + t.length,
                  0,
                )),
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
            : ((o = y((s = "string" == typeof (n = t) ? c.E(n) : n).length)),
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
        a = f.f(new Uint8Array(n.length));
      return (n.encode(a), "Hex" === r) ? i.J(a.bytes) : a.bytes;
    })(e, { as: r });
  }
  function y(e) {
    if (e <= 255) return 1;
    if (e <= 65535) return 2;
    if (e <= 0xffffff) return 3;
    if (e <= 0xffffffff) return 4;
    throw new n.f("Length is too large.");
  }
  e.s(
    [
      "E",
      0,
      p,
      "g",
      0,
      function (e) {
        var t;
        let r, n;
        return (
          (t = e),
          (r = "Hex"),
          (n = (() => {
            if ("string" == typeof t) {
              if (t.length > 3 && t.length % 2 != 0) throw new i.h(t);
              return c.E(t);
            }
            return t;
          })()),
          (function e(t, r = "Hex") {
            if (0 === t.bytes.length)
              return "Hex" === r ? i.J(t.bytes) : t.bytes;
            let n = t.readByte();
            if ((n < 128 && t.decrementPosition(1), n < 192)) {
              let e = d(t, n, 128),
                a = t.readBytes(e);
              return "Hex" === r ? i.J(a) : a;
            }
            let a = d(t, n, 192);
            var s = t,
              o = a,
              u = r;
            let l = s.position,
              c = [];
            for (; s.position - l < o; ) c.push(e(s, u));
            return c;
          })(f.f(n, { recursiveReadLimit: 1 / 0 }), r)
        );
      },
    ],
    93398,
  );
  var h = n,
    m = e.i(987439),
    g = e.i(768093);
  function b(e, t = {}) {
    let { recovered: r } = t;
    if (void 0 === e.r || void 0 === e.s || (r && void 0 === e.yParity))
      throw new N({ signature: e });
    if (e.r < 0n || e.r > g._) throw new T({ value: e.r });
    if (e.s < 0n || e.s > g._) throw new S({ value: e.s });
    if ("number" == typeof e.yParity && 0 !== e.yParity && 1 !== e.yParity)
      throw new M({ value: e.yParity });
  }
  function w(e) {
    if (130 !== e.length && 132 !== e.length) throw new E({ signature: e });
    let t = BigInt(i.M(e, 0, 32)),
      r = BigInt(i.M(e, 32, 64)),
      n = (() => {
        let t = Number(`0x${e.slice(130)}`);
        if (!Number.isNaN(t))
          try {
            return I(t);
          } catch {
            throw new M({ value: t });
          }
      })();
    return void 0 === n ? { r: t, s: r } : { r: t, s: r, yParity: n };
  }
  function v(e) {
    if (void 0 !== e.r && void 0 !== e.s) return x(e);
  }
  function x(e) {
    let t = (() => {
      var t;
      if ("string" == typeof e) return w(e);
      if (e instanceof Uint8Array) return w(i.J(e));
      return "string" == typeof e.r
        ? P(e)
        : e.v
          ? { r: (t = e).r, s: t.s, yParity: I(t.v) }
          : {
              r: e.r,
              s: e.s,
              ...(void 0 !== e.yParity ? { yParity: e.yParity } : {}),
            };
    })();
    return (b(t), t);
  }
  function P(e) {
    let t = (() => {
      let t = e.v ? Number(e.v) : void 0,
        r = e.yParity ? Number(e.yParity) : void 0;
      if (
        ("number" == typeof t && "number" != typeof r && (r = I(t)),
        "number" != typeof r)
      )
        throw new M({ value: e.yParity });
      return r;
    })();
    return { r: BigInt(e.r), s: BigInt(e.s), yParity: t };
  }
  function k(e) {
    let { r: t, s: r, yParity: n } = e;
    return {
      r: i.u(t, { size: 32 }),
      s: i.u(r, { size: 32 }),
      yParity: 0 === n ? "0x0" : "0x1",
    };
  }
  function A(e) {
    let { r: t, s: r, yParity: n } = e;
    return [
      n ? "0x01" : "0x",
      0n === t ? "0x" : i.q(i.u(t)),
      0n === r ? "0x" : i.q(i.u(r)),
    ];
  }
  function I(e) {
    if (0 === e || 27 === e) return 0;
    if (1 === e || 28 === e) return 1;
    if (e >= 35) return +(e % 2 == 0);
    throw new z({ value: e });
  }
  function B(e) {
    if (0 === e) return 27;
    if (1 === e) return 28;
    throw new M({ value: e });
  }
  class E extends h.f {
    constructor({ signature: e }) {
      (super(`Value \`${e}\` is an invalid signature size.`, {
        metaMessages: [
          "Expected: 64 bytes or 65 bytes.",
          `Received ${i.o(i.f(e))} bytes.`,
        ],
      }),
        Object.defineProperty(this, "name", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: "Signature.InvalidSerializedSizeError",
        }));
    }
  }
  class N extends h.f {
    constructor({ signature: e }) {
      (super(
        `Signature \`${m.f(e)}\` is missing either an \`r\`, \`s\`, or \`yParity\` property.`,
      ),
        Object.defineProperty(this, "name", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: "Signature.MissingPropertiesError",
        }));
    }
  }
  class T extends h.f {
    constructor({ value: e }) {
      (super(
        `Value \`${e}\` is an invalid r value. r must be a positive integer less than 2^256.`,
      ),
        Object.defineProperty(this, "name", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: "Signature.InvalidRError",
        }));
    }
  }
  class S extends h.f {
    constructor({ value: e }) {
      (super(
        `Value \`${e}\` is an invalid s value. s must be a positive integer less than 2^256.`,
      ),
        Object.defineProperty(this, "name", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: "Signature.InvalidSError",
        }));
    }
  }
  class M extends h.f {
    constructor({ value: e }) {
      (super(
        `Value \`${e}\` is an invalid y-parity value. Y-parity must be 0 or 1.`,
      ),
        Object.defineProperty(this, "name", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: "Signature.InvalidYParityError",
        }));
    }
  }
  class z extends h.f {
    constructor({ value: e }) {
      (super(`Value \`${e}\` is an invalid v value. v must be 27, 28 or >=35.`),
        Object.defineProperty(this, "name", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: "Signature.InvalidVError",
        }));
    }
  }
  function U(e, t = {}) {
    return "string" == typeof e.chainId ? C(e) : { ...e, ...t.signature };
  }
  function C(e) {
    let { address: t, chainId: r, nonce: n } = e,
      i = v(e);
    return { address: t, chainId: Number(r), nonce: BigInt(n), ...i };
  }
  function R(e) {
    let { address: t, chainId: r, nonce: n, ...a } = e;
    return { address: t, chainId: i.u(r), nonce: i.u(n), ...k(a) };
  }
  (e.s(
    [
      "n",
      0,
      b,
      "X",
      0,
      v,
      "f",
      0,
      x,
      "E",
      0,
      w,
      "M",
      0,
      P,
      "K",
      0,
      function (e) {
        let [t, r, n] = e;
        return x({
          r: "0x" === r ? 0n : BigInt(r),
          s: "0x" === n ? 0n : BigInt(n),
          yParity: "0x" === t ? 0 : Number(t),
        });
      },
      "g",
      0,
      function (e) {
        b(e);
        let t = e.r,
          r = e.s;
        return i.w(
          i.u(t, { size: 32 }),
          i.u(r, { size: 32 }),
          "number" == typeof e.yParity ? i.u(B(e.yParity), { size: 1 }) : "0x",
        );
      },
      "F",
      0,
      k,
      "G",
      0,
      A,
      "H",
      0,
      B,
    ],
    425810,
  ),
    e.s(
      [
        "f",
        0,
        U,
        "o",
        0,
        function (e) {
          return e.map(C);
        },
        "k",
        0,
        function (e) {
          return (function (e, t = {}) {
            let { presign: r } = t;
            return l.y(
              i.w(
                "0x05",
                p(
                  (function (e) {
                    let { address: t, chainId: r, nonce: n } = e,
                      a = v(e);
                    return [
                      r ? i.u(r) : "0x",
                      t,
                      n ? i.u(n) : "0x",
                      ...(a ? A(a) : []),
                    ];
                  })(
                    r
                      ? {
                          address: e.address,
                          chainId: e.chainId,
                          nonce: e.nonce,
                        }
                      : e,
                  ),
                ),
              ),
            );
          })(e, { presign: !0 });
        },
        "J",
        0,
        function (e) {
          return e.map(R);
        },
      ],
      829090,
    ));
  var F = n;
  let O = r.f(
    "(uint256 chainId, address delegation, uint256 nonce, uint8 yParity, uint256 r, uint256 s), address to, bytes data",
  );
  function $(e) {
    if ("string" == typeof e) {
      if (
        "0x8010801080108010801080108010801080108010801080108010801080108010" !==
        i.M(e, -32)
      )
        throw new L(e);
    } else b(e.authorization);
  }
  class L extends F.f {
    constructor(e) {
      (super(`Value \`${e}\` is an invalid ERC-8010 wrapped signature.`),
        Object.defineProperty(this, "name", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: "SignatureErc8010.InvalidWrappedSignatureError",
        }));
    }
  }
  e.s(
    [
      "unwrap",
      0,
      function (e) {
        $(e);
        let t = i.L(i.M(e, -64, -32)),
          n = i.M(e, -t - 64, -64),
          a = i.M(e, 0, -t - 64),
          [s, o, u] = r.G(O, n);
        return {
          authorization: U({
            address: s.delegation,
            chainId: Number(s.chainId),
            nonce: s.nonce,
            yParity: s.yParity,
            r: s.r,
            s: s.s,
          }),
          signature: a,
          ...(u && "0x" !== u ? { data: u, to: o } : {}),
        };
      },
      "validate",
      0,
      function (e) {
        try {
          return ($(e), !0);
        } catch {
          return !1;
        }
      },
    ],
    791564,
  );
  var j = e.i(791564),
    j = j,
    K = j,
    G = e.i(440519),
    D = e.i(271948),
    q = e.i(815727),
    W = e.i(259140),
    _ = e.i(421957),
    V = e.i(389238),
    H = e.i(954982),
    J = e.i(459862);
  async function Z({ address: e, authorization: t, signature: r }) {
    return (0, H.f)(
      (0, V.A)(e),
      await (0, J.f)({ authorization: t, signature: r }),
    );
  }
  var X = e.i(850697),
    Y = e.i(520417),
    Q = e.i(339513),
    ee = e.i(703114),
    et = e.i(586844),
    er = e.i(78080),
    en = e.i(300059),
    ei = e.i(67223),
    ea = e.i(859095),
    es = e.i(285945),
    eo = e.i(559787);
  async function eu(e, t) {
    let r,
      {
        address: n,
        chain: i = e.chain,
        hash: a,
        erc6492VerifierAddress: s = t.universalSignatureVerifierAddress ??
          i?.contracts?.erc6492Verifier?.address,
        multicallAddress: o = t.multicallAddress ??
          i?.contracts?.multicall3?.address,
        mode: u = "auto",
      } = t;
    if (i?.verifyHash) return await i.verifyHash(e, t);
    let l =
      ((r = t.signature),
      (0, Y.f)(r)
        ? r
        : "object" == typeof r && "r" in r && "s" in r
          ? (function ({ r: e, s: t, to: r = "hex", v: n, yParity: i }) {
              let a = (() => {
                  if (0 === i || 1 === i) return i;
                  if (n && (27n === n || 28n === n || n >= 35n))
                    return +(n % 2n === 0n);
                  throw Error("Invalid `v` or `yParity` value");
                })(),
                s = `0x${new en.secp256k1.Signature((0, Q.K)(e), (0, Q.K)(t)).toCompactHex()}${0 === a ? "1b" : "1c"}`;
              return "hex" === r ? s : (0, ei.X)(s);
            })(r)
          : (0, ee.v)(r));
    try {
      if ("eoa" === u)
        try {
          if ((0, H.f)((0, V.A)(n), await (0, er.f)({ hash: a, signature: l })))
            return !0;
        } catch {}
      if (j.validate(l))
        return await el(e, { ...t, multicallAddress: o, signature: l });
      return await ec(e, { ...t, verifierAddress: s, signature: l });
    } catch (e) {
      if ("eoa" !== u)
        try {
          if ((0, H.f)((0, V.A)(n), await (0, er.f)({ hash: a, signature: l })))
            return !0;
        } catch {}
      if (e instanceof ed) return !1;
      throw e;
    }
  }
  async function el(e, t) {
    let {
        address: r,
        blockHash: n,
        blockNumber: i,
        blockTag: a,
        hash: s,
        multicallAddress: o,
        requireCanonical: u,
      } = t,
      {
        authorization: l,
        data: c,
        signature: f,
        to: d,
      } = K.unwrap(t.signature);
    if (
      (await (0, es.f)(e, {
        address: r,
        blockHash: n,
        blockNumber: i,
        blockTag: a,
        requireCanonical: u,
      })) === (0, X.s)(["0xef0100", l.address])
    )
      return await ef(e, { ...t, signature: f });
    let p = {
      address: l.address,
      chainId: Number(l.chainId),
      nonce: Number(l.nonce),
      r: (0, ee.N)(l.r, { size: 32 }),
      s: (0, ee.N)(l.s, { size: 32 }),
      yParity: l.yParity,
    };
    if (!(await Z({ address: r, authorization: p }))) throw new ed();
    let y = await (0, et.f)(
        e,
        eo.f,
        "readContract",
      )({
        ...(o ? { address: o } : { code: D.c }),
        authorizationList: [p],
        abi: G.v,
        blockHash: n,
        blockNumber: i,
        blockTag: "pending",
        functionName: "aggregate3",
        requireCanonical: u,
        args: [
          [
            ...(c ? [{ allowFailure: !0, target: d ?? r, callData: c }] : []),
            {
              allowFailure: !0,
              target: r,
              callData: (0, _.f)({
                abi: G.w,
                functionName: "isValidSignature",
                args: [s, f],
              }),
            },
          ],
        ],
      }),
      h = y[y.length - 1]?.returnData;
    if (h?.startsWith("0x1626ba7e")) return !0;
    throw new ed();
  }
  async function ec(e, t) {
    let {
        address: r,
        factory: n,
        factoryData: i,
        hash: a,
        signature: s,
        verifierAddress: l,
        ...c
      } = t,
      f = await (async () =>
        (!n && !i) || o.validate(s)
          ? s
          : u.wrap({ data: i, signature: s, to: n }))(),
      d = l
        ? {
            to: l,
            data: (0, _.f)({
              abi: G.m,
              functionName: "isValidSig",
              args: [r, a, f],
            }),
            ...c,
          }
        : {
            data: (0, W.f)({ abi: G.m, args: [r, a, f], bytecode: D.$ }),
            ...c,
          },
      { data: p } = await (0, et.f)(
        e,
        ea.f,
        "call",
      )(d).catch((e) => {
        if (e instanceof q.o) throw new ed();
        throw e;
      });
    if ((0, Q.d)(p ?? "0x0")) return !0;
    throw new ed();
  }
  async function ef(e, t) {
    let {
      address: r,
      blockHash: n,
      blockNumber: i,
      blockTag: a,
      hash: s,
      requireCanonical: o,
      signature: u,
    } = t;
    if (
      (
        await (0, et.f)(
          e,
          eo.f,
          "readContract",
        )({
          address: r,
          abi: G.w,
          args: [s, u],
          blockHash: n,
          blockNumber: i,
          blockTag: a,
          functionName: "isValidSignature",
          requireCanonical: o,
        }).catch((e) => {
          if (e instanceof q.h) throw new ed();
          throw e;
        })
      ).startsWith("0x1626ba7e")
    )
      return !0;
    throw new ed();
  }
  class ed extends Error {}
  e.s(["f", 0, eu], 278133);
  var ep = e.i(772488),
    ey = e.i(415415);
  function eh(e, t) {
    let r, n;
    return (0, ep.f)(
      ((r =
        "string" == typeof e
          ? (0, ee.B)(e)
          : "string" == typeof e.raw
            ? e.raw
            : (0, ee.v)(e.raw)),
      (n = (0, ee.B)(`\x19Ethereum Signed Message:
${(0, ey.f)(r)}`)),
      (0, X.w)([n, r])),
      t,
    );
  }
  async function em(
    e,
    { address: t, message: r, factory: n, factoryData: i, signature: a, ...s },
  ) {
    let o = eh(r);
    return (0, et.f)(
      e,
      eu,
      "verifyHash",
    )({ address: t, factory: n, factoryData: i, hash: o, signature: a, ...s });
  }
  (e.s(["f", 0, eh], 810186), e.s(["f", 0, em], 492550));
};
