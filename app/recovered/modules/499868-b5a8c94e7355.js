// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t,
    r = e.i(982405),
    n = e.i(69208),
    i = e.i(20655),
    a = e.i(958857),
    s = e.i(681777);
  let o = 0,
    u = new WeakMap();
  e.s(
    [
      "f",
      0,
      function (e, t = {}) {
        let {
          batch: l,
          fetchFn: c,
          fetchOptions: f,
          key: d = "http",
          maxResponseBodySize: p,
          methods: y,
          name: h = "HTTP JSON-RPC",
          onFetchRequest: m,
          onFetchResponse: g,
          retryDelay: b,
          raw: w,
        } = t;
        return ({ chain: v, retryCount: x, timeout: P }) => {
          let { batchSize: k = 1e3, wait: A = 0 } =
              "object" == typeof l ? l : {},
            I = t.retryCount ?? x,
            B = P ?? t.timeout ?? 1e4,
            E = e || v?.rpcUrls.default.http[0];
          if (!E) throw new n.f();
          let N = (0, a.f)(E, {
            fetchFn: c,
            fetchOptions: f,
            maxResponseBodySize: p,
            onRequest: m,
            onResponse: g,
            timeout: B,
          });
          return (0, s.f)(
            {
              key: d,
              methods: y,
              name: h,
              async request({ method: e, params: t }, n) {
                let a = { method: e, params: t },
                  s = n?.signal ? { signal: n.signal } : void 0,
                  { schedule: c } = (0, i.f)({
                    id: `${E}.${(function (e) {
                      if (!e) return "default";
                      let t = u.get(e);
                      if (void 0 !== t) return t;
                      let r = o++;
                      return (u.set(e, r), r);
                    })(n?.signal)}`,
                    wait: A,
                    shouldSplitBatch: (e) => e.length > k,
                    fn: (e) => N.request({ body: e, fetchOptions: s }),
                    sort: (e, t) => e.id - t.id,
                  }),
                  f = async (e) =>
                    l ? c(e) : [await N.request({ body: e, fetchOptions: s })],
                  [{ error: d, result: p }] = await f(a);
                if (w) return { error: d, result: p };
                if (d) throw new r.V({ body: a, error: d, url: E });
                return p;
              },
              retryCount: I,
              retryDelay: b,
              timeout: B,
              type: "http",
            },
            { fetchOptions: f, url: E },
          );
        };
      },
    ],
    499868,
  );
  var l = e.i(12550),
    c = e.i(702133),
    f = e.i(755805),
    d = e.i(65177);
  let p = "0x05",
    y = `0x${"00".repeat(32)}`;
  function h(e) {
    let t,
      { salt: r, threshold: n, owners: i } = e;
    if (void 0 !== r && 32 !== d.o(r))
      throw new x({ reason: "salt must be 32 bytes" });
    if (0 === i.length) throw new x({ reason: "owners cannot be empty" });
    if (i.length > 50) throw new x({ reason: "too many owners" });
    if (!Number.isInteger(Number(n)))
      throw new x({ reason: "threshold must be an integer" });
    if (1 > Number(n)) throw new x({ reason: "threshold cannot be zero" });
    if (Number(n) > 8)
      throw new x({ reason: "threshold exceeds max threshold" });
    let a = 0;
    for (let e of i) {
      if (!l.g(e.owner) || 0n === d.k(e.owner))
        throw new x({ reason: "owner cannot be zero" });
      if (!Number.isInteger(Number(e.weight)))
        throw new x({ reason: "owner weight must be an integer" });
      if (1 > Number(e.weight))
        throw new x({ reason: "owner weight cannot be zero" });
      let r = d.k(e.owner);
      if (void 0 !== t && t >= r)
        throw new x({ reason: "owners must be strictly ascending" });
      ((t = r), (a += Number(e.weight)));
    }
    if (a > 255) throw new x({ reason: "total owner weight exceeds u8 max" });
    if (Number(n) > a)
      throw new x({ reason: "threshold exceeds total owner weight" });
  }
  function m(e) {
    let t = [...e.owners].sort((e, t) =>
        d.k(e.owner) < d.k(t.owner) ? -1 : 1,
      ),
      r = {
        salt: e.salt ? d.V(e.salt, 32) : y,
        threshold: e.threshold,
        owners: t,
      };
    return (h(r), r);
  }
  function g(e) {
    let [t, r, n] = e;
    return {
      salt: t && "0x" !== t ? d.V(t, 32) : y,
      threshold: "0x" === r ? 0 : d.L(r),
      owners: n.map((e) => {
        let [t, r] = e;
        return { owner: t, weight: r && "0x" !== r ? d.L(r) : 0 };
      }),
    };
  }
  function b(e) {
    h(e);
    let t = f.y(
        d.w(
          d.A("tempo:multisig:account"),
          d.V(e.salt ?? y, 32),
          d.u(e.threshold, { size: 1 }),
          d.u(e.owners.length, { size: 1 }),
          ...e.owners.flatMap((e) => [e.owner, d.u(e.weight, { size: 1 })]),
        ),
      ),
      r = l.f(d.M(t, 12, 32));
    if (0n === d.k(r))
      throw new x({ reason: "derived account cannot be zero" });
    return r;
  }
  function w(e) {
    let { payload: t, version: r = 0n } = e,
      n = "account" in e && e.account ? e.account : b(e.initialConfig);
    return f.y(
      d.w(d.A("tempo:multisig:signature"), d.f(t), n, d.u(r, { size: 8 })),
    );
  }
  function v(e) {
    h(e);
    let t = e.owners.map((e) => [e.owner, d.u(e.weight)]);
    return [e.salt ? d.V(e.salt, 32) : y, d.u(e.threshold), t];
  }
  class x extends c.f {
    constructor({ reason: e }) {
      (super(`Invalid native multisig config: ${e}.`),
        Object.defineProperty(this, "name", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: "MultisigConfig.InvalidConfigError",
        }));
    }
  }
  e.s(
    [
      "assert",
      0,
      h,
      "from",
      0,
      m,
      "fromTuple",
      0,
      g,
      "getAddress",
      0,
      b,
      "getSignPayload",
      0,
      w,
      "maxNestingDepth",
      0,
      2,
      "maxOwnerSignatureBytes",
      0,
      2049,
      "maxSignatures",
      0,
      8,
      "signatureTypeByte",
      0,
      p,
      "toTuple",
      0,
      v,
      "zeroSalt",
      0,
      y,
    ],
    343462,
  );
  var P = e.i(343462);
  (e.s(["f", 0, P], 706426),
    e.s(["f", 0, P], 417451),
    e.s(["f", 0, P], 105072));
  var k = c,
    A = e.i(987439),
    I = e.i(837474),
    B = e.i(256591),
    E = e.i(708842),
    N = e.i(789694),
    T = e.i(132610);
  let S = (0, N.N)(
      BigInt(
        "0xffffffff00000001000000000000000000000000ffffffffffffffffffffffff",
      ),
    ),
    M = S.create(BigInt("-3")),
    z = BigInt(
      "0x5ac635d8aa3a93e7b3ebbd55769886bc651d06b0cc53b0f63bce3c3e27d2604b",
    ),
    U = (0, B.f)(
      {
        a: M,
        b: z,
        Fp: S,
        n: BigInt(
          "0xffffffff00000000ffffffffffffffffbce6faada7179e84f3b9cac2fc632551",
        ),
        Gx: BigInt(
          "0x6b17d1f2e12c4247f8bce6e563a440f277037d812deb33a0f4a13945d898c296",
        ),
        Gy: BigInt(
          "0x4fe342e2fe1a7f9b8ee7eb4a7c0f9e162bce33576b315ececbb6406837bf51f5",
        ),
        h: BigInt(1),
        lowS: !1,
      },
      I.E,
    ),
    C = (0, T.h)(S, { A: M, B: z, Z: S.create(BigInt("-10")) });
  (0, E.O)(U.ProjectivePoint, (e) => C(e[0]), {
    DST: "P256_XMD:SHA-256_SSWU_RO_",
    encodeDST: "P256_XMD:SHA-256_SSWU_NU_",
    p: S.ORDER,
    m: 1,
    k: 128,
    expand: "xmd",
    hash: I.E,
  });
  let R = (0, N.N)(
      BigInt(
        "0xfffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffeffffffff0000000000000000ffffffff",
      ),
    ),
    F = R.create(BigInt("-3")),
    O = BigInt(
      "0xb3312fa7e23ee7e4988e056be3f82d19181d9c6efe8141120314088f5013875ac656398d8a2ed19d2a85c8edd3ec2aef",
    );
  ((0, B.f)(
    {
      a: F,
      b: O,
      Fp: R,
      n: BigInt(
        "0xffffffffffffffffffffffffffffffffffffffffffffffffc7634d81f4372ddf581a0db248b0a77aecec196accc52973",
      ),
      Gx: BigInt(
        "0xaa87ca22be8b05378eb1c71ef320ad746e1d3b628ba79b9859f741e082542a385502f25dbf55296c3a545e3872760ab7",
      ),
      Gy: BigInt(
        "0x3617de4a96262c6f5d9e98bf9292dc29f8f41dbd289a147ce9da3113b5f0b8c00a60b1ce1d7e819d7a431d7c90ea0e5f",
      ),
      h: BigInt(1),
      lowS: !1,
    },
    I.u,
  ),
    (0, T.h)(R, { A: F, B: O, Z: R.create(BigInt("-12")) }));
  let $ = (0, N.N)(
      BigInt(
        "0x1ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff",
      ),
    ),
    L = $.create(BigInt("-3")),
    j = BigInt(
      "0x0051953eb9618e1c9a1f929a21a0b68540eea2da725b99b315f3b8b489918ef109e156193951ec7e937b1652c0bd3bb1bf073573df883d2c34f1ef451fd46b503f00",
    );
  ((0, B.f)(
    {
      a: L,
      b: j,
      Fp: $,
      n: BigInt(
        "0x01fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffa51868783bf2f966b7fcc0148f709a5d03bb5c9b8899c47aebb6fb71e91386409",
      ),
      Gx: BigInt(
        "0x00c6858e06b70404e9cd9e3ecb662395b4429c648139053fb521f828af606b4d3dbaa14b5e77efe75928fe1dc127a2ffa8de3348b3c1856a429bf97e7e31c2e5bd66",
      ),
      Gy: BigInt(
        "0x011839296a789a3bc0045c8a5fb42c7d1bd998f54449579b446817afbd17273e662c97ee72995ef42640c550b9013fad0761353c7086a272c24088be94769fd16650",
      ),
      h: BigInt(1),
      lowS: !1,
      allowedPrivateKeyLengths: [130, 131, 132],
    },
    I.s,
  ),
    (0, T.h)($, { A: L, B: j, Z: $.create(BigInt("-4")) }));
  var K = e.i(829833),
    G = e.i(987303);
  function D(e) {
    let { hash: t, payload: r, publicKey: n, signature: i } = e;
    return U.verify(
      i,
      r instanceof Uint8Array ? r : K.E(r),
      G.g(n).substring(2),
      { lowS: !0, ...(t ? { prehash: !0 } : {}) },
    );
  }
  var q = e.i(93398),
    W = e.i(300059);
  function _(e) {
    return l.E(V(e));
  }
  function V(e) {
    let { payload: t, signature: r } = e,
      { r: n, s: i, yParity: a } = r,
      s = new W.secp256k1.Signature(BigInt(n), BigInt(i))
        .addRecoveryBit(a)
        .recoverPublicKey(d.f(t).substring(2));
    return G.f(s);
  }
  function H(e) {
    let { hash: t, payload: r } = e;
    return e.address
      ? l.M(e.address, _({ payload: r, signature: e.signature }))
      : W.secp256k1.verify(
          e.signature,
          K.f(r),
          G.D(e.publicKey),
          ...(t ? [{ prehash: !0, lowS: !0 }] : []),
        );
  }
  (W.secp256k1, e.s(["R", 0, _, "d", 0, V, "X", 0, H], 847514));
  var J = e.i(425810);
  let Z = new TextEncoder();
  Array.from(
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",
  ).map((e, t) => [t, e.charCodeAt(0)]);
  let X = {
    ...Object.fromEntries(
      Array.from(
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",
      ).map((e, t) => [e.charCodeAt(0), t]),
    ),
    61: 0,
    45: 62,
    95: 63,
  };
  (Uint8Array.from([
    105, 171, 180, 181, 160, 222, 75, 198, 42, 42, 32, 31, 141, 37, 186, 233,
  ]),
    c.f,
    c.f);
  var Y = c;
  e.i(368245);
  class Q extends Y.f {
    constructor({ majorType: e }) {
      (super(`Invalid CBOR major type: ${e}`),
        Object.defineProperty(this, "name", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: "Cbor.InvalidMajorTypeError",
        }));
    }
  }
  class ee extends Y.f {
    constructor({ additionalInfo: e }) {
      (super(`Invalid CBOR additional info: ${e}`),
        Object.defineProperty(this, "name", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: "Cbor.InvalidAdditionalInfoError",
        }));
    }
  }
  class et extends Y.f {
    constructor() {
      (super("64-bit integers are not supported in CBOR decoding."),
        Object.defineProperty(this, "name", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: "Cbor.Unsupported64BitIntegerError",
        }));
    }
  }
  class er extends Y.f {
    constructor({ tag: e }) {
      (super(`CBOR tagged data (tag ${e}) is not yet supported.`),
        Object.defineProperty(this, "name", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: "Cbor.UnsupportedTagError",
        }));
    }
  }
  class en extends Y.f {
    constructor({ type: e }) {
      (super(`Invalid chunk type in indefinite-length ${e}`),
        Object.defineProperty(this, "name", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: "Cbor.InvalidIndefiniteLengthChunkError",
        }));
    }
  }
  class ei extends Y.f {
    constructor({ value: e }) {
      (super(`Invalid CBOR simple value: ${e}`),
        Object.defineProperty(this, "name", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: "Cbor.InvalidSimpleValueError",
        }));
    }
  }
  class ea extends Y.f {
    constructor() {
      (super("BigInt values are not supported in CBOR encoding."),
        Object.defineProperty(this, "name", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: "Cbor.UnsupportedBigIntError",
        }));
    }
  }
  class es extends Y.f {
    constructor({ token: e }) {
      (super(`Unexpected token: ${e}`),
        Object.defineProperty(this, "name", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: "Cbor.UnexpectedTokenError",
        }));
    }
  }
  class eo extends Y.f {
    constructor({ number: e }) {
      (super(
        `Number exceeds maximum safe integer (${Number.MAX_SAFE_INTEGER}): ${e}`,
      ),
        Object.defineProperty(this, "name", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: "Cbor.NumberTooLargeError",
        }));
    }
  }
  class eu extends Y.f {
    constructor({ size: e }) {
      (super(`String length exceeds maximum (4294967295): ${e}`),
        Object.defineProperty(this, "name", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: "Cbor.StringTooLargeError",
        }));
    }
  }
  class el extends Y.f {
    constructor({ size: e }) {
      (super(`Array length exceeds maximum (4294967295): ${e}`),
        Object.defineProperty(this, "name", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: "Cbor.ArrayTooLargeError",
        }));
    }
  }
  class ec extends Y.f {
    constructor({ size: e }) {
      (super(`Object size exceeds maximum (4294967295): ${e}`),
        Object.defineProperty(this, "name", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: "Cbor.ObjectTooLargeError",
        }));
    }
  }
  class ef extends Y.f {
    constructor({ size: e }) {
      (super(`Byte string length exceeds maximum (4294967295): ${e}`),
        Object.defineProperty(this, "name", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: "Cbor.ByteStringTooLargeError",
        }));
    }
  }
  function ed(e) {
    if (void 0 === e) return { length: 1, encode: (e) => e.pushUint8(247) };
    if (null === e) return { length: 1, encode: (e) => e.pushUint8(246) };
    if ("boolean" == typeof e)
      return { length: 1, encode: (t) => t.pushUint8(e ? 245 : 244) };
    if ("number" == typeof e) return ed.number(e);
    if ("bigint" == typeof e) throw new ea();
    if ("string" == typeof e) return ed.string(e);
    if (Array.isArray(e)) return ed.array(e);
    if (e instanceof Uint8Array) return ed.byteString(e);
    if (e instanceof ArrayBuffer) return ed.byteString(new Uint8Array(e));
    if (ArrayBuffer.isView(e))
      return ed.byteString(
        new Uint8Array(e.buffer, e.byteOffset, e.byteLength),
      );
    if (e instanceof Map) return ed.map(e);
    if ("object" == typeof e) return ed.object(e);
    throw new es({ token: String(e) });
  }
  function ep(e) {
    let t = e.readUint8(),
      r = t >> 5,
      n = 31 & t;
    switch (r) {
      case 0:
        return ep.readUnsignedInteger(e, n);
      case 1:
        return ep.readNegativeInteger(e, n);
      case 2:
        return ep.readByteString(e, n);
      case 3:
        return ep.readTextString(e, n);
      case 4:
        return ep.readArray(e, n);
      case 5:
        return ep.readMap(e, n);
      case 6:
        throw new er({ tag: n });
      case 7:
        return ep.readSimpleOrFloat(e, n);
      default:
        throw new Q({ majorType: r });
    }
  }
  (((t = ed || (ed = {})).number = function (e) {
    if (!Number.isSafeInteger(e)) {
      let t = Math.fround(e);
      return Number.isNaN(e) || e === t
        ? {
            length: 5,
            encode(t) {
              (t.pushUint8(250),
                t.dataView.setFloat32(t.position, e, !1),
                (t.position += 4));
            },
          }
        : {
            length: 9,
            encode(t) {
              (t.pushUint8(251),
                t.dataView.setFloat64(t.position, e, !1),
                (t.position += 8));
            },
          };
    }
    if (e >= 0) {
      if (e <= 23) return { length: 1, encode: (t) => t.pushUint8(e) };
      if (e <= 255)
        return {
          length: 2,
          encode: (t) => {
            (t.pushUint8(24), t.pushUint8(e));
          },
        };
      if (e <= 65535)
        return {
          length: 3,
          encode: (t) => {
            (t.pushUint8(25), t.pushUint16(e));
          },
        };
      if (e <= 0xffffffff)
        return {
          length: 5,
          encode: (t) => {
            (t.pushUint8(26), t.pushUint32(e));
          },
        };
      throw new eo({ number: e.toString(10) });
    }
    let t = -1 - e;
    if (e >= -24) return { length: 1, encode: (e) => e.pushUint8(32 + t) };
    if (t <= 255)
      return {
        length: 2,
        encode: (e) => {
          (e.pushUint8(56), e.pushUint8(t));
        },
      };
    if (t <= 65535)
      return {
        length: 3,
        encode: (e) => {
          (e.pushUint8(57), e.pushUint16(t));
        },
      };
    if (t <= 0xffffffff)
      return {
        length: 5,
        encode: (e) => {
          (e.pushUint8(58), e.pushUint32(t));
        },
      };
    throw new eo({ number: e.toString(10) });
  }),
    (t.string = function (e) {
      let t = K.A(e),
        r = t.length;
      if (r <= 23)
        return {
          length: 1 + r,
          encode(e) {
            (e.pushUint8(96 + r), r > 0 && e.pushBytes(t));
          },
        };
      if (r <= 255)
        return {
          length: 2 + r,
          encode(e) {
            (e.pushUint8(120), e.pushUint8(r), e.pushBytes(t));
          },
        };
      if (r <= 65535)
        return {
          length: 3 + r,
          encode(e) {
            (e.pushUint8(121), e.pushUint16(r), e.pushBytes(t));
          },
        };
      if (r <= 0xffffffff)
        return {
          length: 5 + r,
          encode(e) {
            (e.pushUint8(122), e.pushUint32(r), e.pushBytes(t));
          },
        };
      throw new eu({ size: r });
    }),
    (t.array = function (e) {
      let r = e.map((e) => t(e)),
        n = r.reduce((e, t) => e + t.length, 0),
        i = e.length;
      if (i <= 23)
        return {
          length: 1 + n,
          encode(e) {
            for (let t of (e.pushUint8(128 + i), r)) t.encode(e);
          },
        };
      if (i <= 255)
        return {
          length: 2 + n,
          encode(e) {
            for (let t of (e.pushUint8(152), e.pushUint8(i), r)) t.encode(e);
          },
        };
      if (i <= 65535)
        return {
          length: 3 + n,
          encode(e) {
            for (let t of (e.pushUint8(153), e.pushUint16(i), r)) t.encode(e);
          },
        };
      if (i <= 0xffffffff)
        return {
          length: 5 + n,
          encode(e) {
            for (let t of (e.pushUint8(154), e.pushUint32(i), r)) t.encode(e);
          },
        };
      throw new el({ size: i });
    }),
    (t.byteString = function (e) {
      let t = e.byteLength;
      if (t <= 23)
        return {
          length: 1 + t,
          encode(r) {
            (r.pushUint8(64 + t), r.pushBytes(e));
          },
        };
      if (t <= 255)
        return {
          length: 2 + t,
          encode(r) {
            (r.pushUint8(88), r.pushUint8(t), r.pushBytes(e));
          },
        };
      if (t <= 65535)
        return {
          length: 3 + t,
          encode(r) {
            (r.pushUint8(89), r.pushUint16(t), r.pushBytes(e));
          },
        };
      if (t <= 0xffffffff)
        return {
          length: 5 + t,
          encode(r) {
            (r.pushUint8(90), r.pushUint32(t), r.pushBytes(e));
          },
        };
      throw new ef({ size: t });
    }),
    (t.object = function (e) {
      let r = Object.keys(e),
        n = r.map((r) => ({ key: t(r), value: t(e[r]) })),
        i = n.reduce((e, t) => e + t.key.length + t.value.length, 0),
        a = r.length;
      if (a <= 23)
        return {
          length: 1 + i,
          encode(e) {
            for (let t of (e.pushUint8(160 + a), n))
              (t.key.encode(e), t.value.encode(e));
          },
        };
      if (a <= 255)
        return {
          length: 2 + i,
          encode(e) {
            for (let t of (e.pushUint8(184), e.pushUint8(a), n))
              (t.key.encode(e), t.value.encode(e));
          },
        };
      if (a <= 65535)
        return {
          length: 3 + i,
          encode(e) {
            for (let t of (e.pushUint8(185), e.pushUint16(a), n))
              (t.key.encode(e), t.value.encode(e));
          },
        };
      if (a <= 0xffffffff)
        return {
          length: 5 + i,
          encode(e) {
            for (let t of (e.pushUint8(186), e.pushUint32(a), n))
              (t.key.encode(e), t.value.encode(e));
          },
        };
      throw new ec({ size: a });
    }),
    (t.map = function (e) {
      let r = [];
      for (let [n, i] of e) r.push({ key: t(n), value: t(i) });
      let n = r.reduce((e, t) => e + t.key.length + t.value.length, 0),
        i = e.size;
      if (i <= 23)
        return {
          length: 1 + n,
          encode(e) {
            for (let t of (e.pushUint8(160 + i), r))
              (t.key.encode(e), t.value.encode(e));
          },
        };
      if (i <= 255)
        return {
          length: 2 + n,
          encode(e) {
            for (let t of (e.pushUint8(184), e.pushUint8(i), r))
              (t.key.encode(e), t.value.encode(e));
          },
        };
      if (i <= 65535)
        return {
          length: 3 + n,
          encode(e) {
            for (let t of (e.pushUint8(185), e.pushUint16(i), r))
              (t.key.encode(e), t.value.encode(e));
          },
        };
      if (i <= 0xffffffff)
        return {
          length: 5 + n,
          encode(e) {
            for (let t of (e.pushUint8(186), e.pushUint32(i), r))
              (t.key.encode(e), t.value.encode(e));
          },
        };
      throw new ec({ size: i });
    }));
  var ey = ep || (ep = {});
  function eh(e, t) {
    if (t < 24) return t;
    if (24 === t) return e.readUint8();
    if (25 === t) return e.readUint16();
    if (26 === t) return e.readUint32();
    if (27 === t) throw new et();
    throw new ee({ additionalInfo: t });
  }
  ((ey.readUnsignedInteger = function (e, t) {
    return eh(e, t);
  }),
    (ey.readNegativeInteger = function (e, t) {
      return -1 - eh(e, t);
    }),
    (ey.readByteString = function (e, t) {
      if (31 === t) {
        let t = [],
          r = 0;
        for (;;) {
          if (255 === e.inspectUint8()) {
            e.readUint8();
            break;
          }
          let n = ey(e);
          if (!(n instanceof Uint8Array)) throw new en({ type: "byte string" });
          (t.push(n), (r += n.length));
        }
        let n = new Uint8Array(r),
          i = 0;
        for (let e of t) (n.set(e, i), (i += e.length));
        return n;
      }
      let r = eh(e, t);
      return e.readBytes(r);
    }),
    (ey.readTextString = function (e, t) {
      if (31 === t) {
        let t = [];
        for (;;) {
          if (255 === e.inspectUint8()) {
            e.readUint8();
            break;
          }
          let r = ey(e);
          if ("string" != typeof r) throw new en({ type: "text string" });
          t.push(r);
        }
        return t.join("");
      }
      let r = eh(e, t),
        n = e.readBytes(r);
      return K.e(n);
    }),
    (ey.readArray = function (e, t) {
      if (31 === t) {
        let t = [];
        for (;;) {
          if (255 === e.inspectUint8()) {
            e.readUint8();
            break;
          }
          t.push(ey(e));
        }
        return t;
      }
      let r = eh(e, t),
        n = [];
      for (let t = 0; t < r; t++) n.push(ey(e));
      return n;
    }),
    (ey.readMap = function (e, t) {
      if (31 === t) {
        let t = {};
        for (;;) {
          if (255 === e.inspectUint8()) {
            e.readUint8();
            break;
          }
          let r = ey(e),
            n = "string" == typeof r ? r : String(r),
            i = ey(e);
          t[n] = i;
        }
        return t;
      }
      let r = eh(e, t),
        n = {};
      for (let t = 0; t < r; t++) {
        let t = ey(e),
          r = "string" == typeof t ? t : String(t),
          i = ey(e);
        n[r] = i;
      }
      return n;
    }),
    (ey.readSimpleOrFloat = function (e, t) {
      if (20 === t) return !1;
      if (21 === t) return !0;
      if (22 === t) return null;
      if (23 !== t) {
        if (25 === t)
          return (function (e) {
            let t = (e >> 15) & 1,
              r = (e >> 10) & 31,
              n = 1023 & e;
            if (0 === r) {
              if (0 === n) return t ? -0 : 0;
              let e = (n / 1024) * 6103515625e-14;
              return t ? -e : e;
            }
            if (31 === r) return 0 === n ? (t ? -1 / 0 : 1 / 0) : 0 / 0;
            let i = 2 ** (r - 15) * (1 + n / 1024);
            return t ? -i : i;
          })(e.readUint16());
        if (26 === t) {
          let t = e.dataView.getFloat32(e.position, !1);
          return ((e.position += 4), t);
        }
        if (27 === t) {
          let t = e.dataView.getFloat64(e.position, !1);
          return ((e.position += 8), t);
        }
        if (24 === t) {
          let t = e.readUint8();
          if (t < 32) throw new ei({ value: t });
          return;
        }
        throw new ee({ additionalInfo: t });
      }
    }));
  (c.f, c.f);
  let em = "0x01",
    eg = "0x02",
    eb = "0x03",
    ew = "0x04",
    ev = "0x05",
    ex = "0x7777777777777777777777777777777777777777777777777777777777777777";
  function eP(e) {
    let t = eE(e);
    if ("secp256k1" === t) return void J.n(e.signature);
    if ("p256" === t) {
      let t = [];
      if (
        ("bigint" != typeof e.signature?.r && t.push("signature.r"),
        "bigint" != typeof e.signature?.s && t.push("signature.s"),
        "boolean" != typeof e.prehash && t.push("prehash"),
        e.publicKey
          ? ("bigint" != typeof e.publicKey.x && t.push("publicKey.x"),
            "bigint" != typeof e.publicKey.y && t.push("publicKey.y"))
          : t.push("publicKey"),
        t.length > 0)
      )
        throw new eS({ envelope: e, missing: t, type: "p256" });
      return;
    }
    if ("webAuthn" === t) {
      let t = [];
      if (
        ("bigint" != typeof e.signature?.r && t.push("signature.r"),
        "bigint" != typeof e.signature?.s && t.push("signature.s"),
        e.metadata
          ? (e.metadata.authenticatorData ||
              t.push("metadata.authenticatorData"),
            e.metadata.clientDataJSON || t.push("metadata.clientDataJSON"))
          : t.push("metadata"),
        e.publicKey
          ? ("bigint" != typeof e.publicKey.x && t.push("publicKey.x"),
            "bigint" != typeof e.publicKey.y && t.push("publicKey.y"))
          : t.push("publicKey"),
        t.length > 0)
      )
        throw new eS({ envelope: e, missing: t, type: "webAuthn" });
      return;
    }
    "keychain" === t ? eP(e.inner) : "multisig" === t && ek(e, 1);
  }
  function ek(e, t) {
    let r = [];
    if (
      (e.account || r.push("account"),
      Array.isArray(e.signatures) || r.push("signatures"),
      r.length > 0)
    )
      throw new eS({ envelope: e, missing: r, type: "multisig" });
    if (t > 2) throw new ez({ reason: "multisig nesting depth exceeds 2" });
    if (!l.g(e.account))
      throw new ez({ reason: "multisig account is invalid" });
    if (0n === d.k(e.account))
      throw new ez({ reason: "multisig account cannot be zero" });
    if (0 === e.signatures.length)
      throw new ez({ reason: "multisig signatures cannot be empty" });
    if (e.signatures.length > 8)
      throw new ez({ reason: "multisig signatures exceed 8" });
    if (e.init && (h(e.init), !l.M(b(e.init), e.account)))
      throw new ez({ reason: "multisig init does not derive account" });
    for (let r of e.signatures) {
      let e = eE(r);
      if ("keychain" === e)
        throw new ez({ reason: "keychain owner approvals are not allowed" });
      if ("multisig" === e) {
        if (r.init)
          throw new ez({
            reason: "nested multisig owner approvals cannot carry `init`",
          });
        ek(r, t + 1);
      } else if ((eP(r), d.o(eN(r)) > 2049))
        throw new ez({ reason: "multisig owner signature exceeds 2049 bytes" });
    }
  }
  function eA(e) {
    let { signature: t, root: r } = e;
    return "keychain" === t.type
      ? r
        ? t.userAddress
        : eA({ ...e, signature: t.inner })
      : "multisig" === t.type
        ? t.account
        : l.E(
            (function e(t) {
              let { payload: r, signature: n } = t;
              switch (n.type) {
                case "secp256k1":
                  return V({ payload: r, signature: n.signature });
                case "p256":
                case "webAuthn":
                  return n.publicKey;
                case "keychain":
                  return e({ payload: r, signature: n.inner });
                case "multisig":
                  throw new eT({ envelope: n });
              }
            })(e),
          );
  }
  function eI(e) {
    return (function e(t, r) {
      let n = t.endsWith(ex.slice(2)) ? d.M(t, 0, -d.o(ex)) : t;
      if (65 === d.o(n)) {
        let e = J.E(n);
        return (J.n(e), { signature: e, type: "secp256k1" });
      }
      let i = d.M(n, 0, 1),
        a = d.M(n, 1),
        s = d.o(a);
      if (i === em) {
        if (129 !== s)
          throw new eM({
            reason: `Invalid P256 signature envelope size: expected 129 bytes, got ${s} bytes`,
            serialized: n,
          });
        return {
          publicKey: {
            prefix: 4,
            x: d.k(d.M(a, 64, 96)),
            y: d.k(d.M(a, 96, 128)),
          },
          prehash: 0 !== d.L(d.M(a, 128, 129)),
          signature: { r: d.k(d.M(a, 0, 32)), s: d.k(d.M(a, 32, 64)) },
          type: "p256",
        };
      }
      if (i === eg) {
        let e, t;
        if (s < 128)
          throw new eM({
            reason: `Invalid WebAuthn signature envelope size: expected at least 128 bytes, got ${s} bytes`,
            serialized: n,
          });
        let r = s - 128,
          i = d.M(a, 0, r);
        for (let n = 37; n < r; n++) {
          let r = d.e(d.M(i, n));
          if (r.startsWith("{") && r.endsWith("}"))
            try {
              (JSON.parse(r), (e = d.M(i, 0, n)), (t = r));
              break;
            } catch {}
        }
        if (!e || !t)
          throw new eM({
            reason:
              "Unable to parse WebAuthn metadata: could not extract valid authenticatorData and clientDataJSON",
            serialized: n,
          });
        return {
          publicKey: {
            prefix: 4,
            x: d.k(d.M(a, r + 64, r + 96)),
            y: d.k(d.M(a, r + 96, r + 128)),
          },
          metadata: { authenticatorData: e, clientDataJSON: t },
          signature: {
            r: d.k(d.M(a, r, r + 32)),
            s: d.k(d.M(a, r + 32, r + 64)),
          },
          type: "webAuthn",
        };
      }
      if (i === eb || i === ew)
        return {
          userAddress: d.M(a, 0, 20),
          inner: e(d.M(a, 20), r),
          type: "keychain",
          version: i === ew ? "v2" : "v1",
        };
      if (i === ev) {
        let t = r + 1;
        if (t > 2)
          throw new eM({
            reason: "multisig nesting depth exceeds 2",
            serialized: n,
          });
        let i = q.g(a);
        if (!Array.isArray(i) || 2 !== i.length)
          throw new eM({
            reason: "invalid multisig wire shape: expected exactly two fields",
            serialized: n,
          });
        let [s, o] = i;
        if (!Array.isArray(o) || o.some(Array.isArray))
          throw new eM({
            reason: "invalid multisig signatures list",
            serialized: n,
          });
        if (0 === o.length)
          throw new eM({
            reason: "multisig signatures cannot be empty",
            serialized: n,
          });
        if (o.length > 8)
          throw new eM({
            reason: "multisig signatures exceed 8",
            serialized: n,
          });
        for (let e of o)
          if (d.o(e) > 2049 && d.M(e, 0, 1) !== p)
            throw new eM({
              reason: "multisig owner signature exceeds 2049 bytes",
              serialized: n,
            });
        if (!Array.isArray(s) && !l.g(s))
          throw new eM({ reason: "invalid multisig account", serialized: n });
        if (Array.isArray(s)) {
          let [e, t, r] = s;
          if (
            3 !== s.length ||
            Array.isArray(e) ||
            32 !== d.o(e) ||
            Array.isArray(t) ||
            d.o(t) > 1 ||
            !Array.isArray(r) ||
            r.some(
              (e) =>
                !Array.isArray(e) ||
                2 !== e.length ||
                e.some(Array.isArray) ||
                d.o(e[1]) > 1,
            )
          )
            throw new eM({
              reason: "invalid multisig init config",
              serialized: n,
            });
        }
        let u = Array.isArray(s) ? g(s) : void 0,
          c = {
            type: "multisig",
            account: u ? b(u) : s,
            signatures: o.map((r) => e(r, t)),
            ...(u ? { init: u } : {}),
          };
        return (ek(c, t), c);
      }
      throw new eM({
        reason: `Unknown signature type identifier: ${i}. Expected ${em} (P256), ${eg} (WebAuthn), ${eb} (Keychain V1), ${ew} (Keychain V2), or ${ev} (Multisig)`,
        serialized: n,
      });
    })(e, 0);
  }
  function eB(e, t) {
    let r;
    if ("string" == typeof e) return eI(e);
    if (
      "object" == typeof e &&
      null !== e &&
      "r" in e &&
      "s" in e &&
      "yParity" in e
    )
      return { signature: e, type: "secp256k1" };
    let n = eE(e);
    if ("multisig" === n) {
      let { initialConfig: t, init: r, ...i } = e,
        a = i.account ? i.account : t ? b(t) : i.account,
        s = !0 === r ? t : r || void 0;
      return {
        ...i,
        account: a,
        signatures: i.signatures.map((e) => eB(e)),
        ...(s ? { init: m(s) } : {}),
        type: n,
      };
    }
    return {
      ...e,
      ...("p256" === n ? { prehash: e.prehash } : {}),
      ...("keychain" === n
        ? {
            ...(!(
              "object" == typeof e &&
              null !== e &&
              "version" in e &&
              e.version
            )
              ? { version: "v2" }
              : {}),
            ...(!("object" == typeof e && "keyId" in e && e.keyId)
              ? "p256" === (r = e.inner).type || "webAuthn" === r.type
                ? { keyId: l.E(r.publicKey) }
                : "secp256k1" === r.type && t?.payload
                  ? {
                      keyId: l.E(
                        V({ payload: t.payload, signature: r.signature }),
                      ),
                    }
                  : {}
              : {}),
          }
        : {}),
      type: n,
    };
  }
  function eE(e) {
    if ("object" != typeof e || null === e) throw new eT({ envelope: e });
    if ("type" in e && e.type) return e.type;
    if (
      ("signature" in e &&
        !("publicKey" in e) &&
        "object" == typeof e.signature &&
        null !== e.signature &&
        "r" in e.signature &&
        "s" in e.signature &&
        "yParity" in e.signature) ||
      ("r" in e && "s" in e && "yParity" in e)
    )
      return "secp256k1";
    if (
      "signature" in e &&
      "prehash" in e &&
      "publicKey" in e &&
      "boolean" == typeof e.prehash
    )
      return "p256";
    if ("signature" in e && "metadata" in e && "publicKey" in e)
      return "webAuthn";
    if ("userAddress" in e && "inner" in e) return "keychain";
    if (
      ("account" in e || "initialConfig" in e || "init" in e) &&
      "signatures" in e
    )
      return "multisig";
    throw new eT({ envelope: e });
  }
  function eN(e, t = {}) {
    let r = eE(e);
    if ("secp256k1" === r) return d.w(J.g(e.signature), t.magic ? ex : "0x");
    if ("p256" === r)
      return d.w(
        em,
        d.u(e.signature.r, { size: 32 }),
        d.u(e.signature.s, { size: 32 }),
        d.u(e.publicKey.x, { size: 32 }),
        d.u(e.publicKey.y, { size: 32 }),
        d.u(+!!e.prehash, { size: 1 }),
        t.magic ? ex : "0x",
      );
    if ("webAuthn" === r) {
      let r = d.w(e.metadata.authenticatorData, d.A(e.metadata.clientDataJSON));
      return d.w(
        eg,
        r,
        d.u(e.signature.r, { size: 32 }),
        d.u(e.signature.s, { size: 32 }),
        d.u(e.publicKey.x, { size: 32 }),
        d.u(e.publicKey.y, { size: 32 }),
        t.magic ? ex : "0x",
      );
    }
    if ("keychain" === r) {
      let r = "v1" === e.version ? eb : ew;
      return d.w(r, e.userAddress, eN(e.inner), t.magic ? ex : "0x");
    }
    if ("multisig" === r)
      return (
        eP(e),
        d.w(
          ev,
          q.E([e.init ? v(e.init) : e.account, e.signatures.map((e) => eN(e))]),
          t.magic ? ex : "0x",
        )
      );
    throw new eT({ envelope: e });
  }
  class eT extends k.f {
    constructor({ envelope: e }) {
      (super(
        `Unable to coerce value (\`${A.f(e)}\`) to a valid signature envelope.`,
      ),
        Object.defineProperty(this, "name", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: "SignatureEnvelope.CoercionError",
        }));
    }
  }
  class eS extends k.f {
    constructor({ envelope: e, missing: t, type: r }) {
      (super(`Signature envelope of type "${r}" is missing required properties: ${t.map((e) => `\`${e}\``).join(", ")}.

Provided: ${A.f(e)}`),
        Object.defineProperty(this, "name", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: "SignatureEnvelope.MissingPropertiesError",
        }));
    }
  }
  class eM extends k.f {
    constructor({ reason: e, serialized: t }) {
      (super(`Unable to deserialize signature envelope: ${e}`, {
        metaMessages: [`Serialized: ${t}`],
      }),
        Object.defineProperty(this, "name", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: "SignatureEnvelope.InvalidSerializedError",
        }));
    }
  }
  class ez extends k.f {
    constructor({ reason: e }) {
      (super(`Invalid native multisig owner approval: ${e}.`),
        Object.defineProperty(this, "name", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: "SignatureEnvelope.InvalidMultisigApprovalError",
        }));
    }
  }
  class eU extends k.f {
    constructor() {
      (super(...arguments),
        Object.defineProperty(this, "name", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: "SignatureEnvelope.VerificationError",
        }));
    }
  }
  e.s(
    [
      "deserialize",
      0,
      eI,
      "extractAddress",
      0,
      eA,
      "from",
      0,
      eB,
      "fromRpc",
      0,
      function e(t) {
        if ("secp256k1" === t.type)
          return { signature: J.M(t), type: "secp256k1" };
        if ("p256" === t.type)
          return {
            prehash: t.preHash,
            publicKey: { prefix: 4, x: d.k(t.pubKeyX), y: d.k(t.pubKeyY) },
            signature: { r: d.k(t.r), s: d.k(t.s) },
            type: "p256",
          };
        if ("webAuthn" === t.type) {
          let e,
            r,
            n = t.webauthnData,
            i = d.o(n);
          for (let t = 37; t < i; t++) {
            let i = d.e(d.M(n, t));
            if (i.startsWith("{") && i.endsWith("}"))
              try {
                (JSON.parse(i), (e = d.M(n, 0, t)), (r = i));
                break;
              } catch {}
          }
          if (!e || !r)
            throw new eM({
              reason:
                "Unable to parse WebAuthn metadata: could not extract valid authenticatorData and clientDataJSON",
              serialized: n,
            });
          return {
            metadata: { authenticatorData: e, clientDataJSON: r },
            publicKey: { prefix: 4, x: d.k(t.pubKeyX), y: d.k(t.pubKeyY) },
            signature: { r: d.k(t.r), s: d.k(t.s) },
            type: "webAuthn",
          };
        }
        if ("keychain" === t.type || ("userAddress" in t && "signature" in t))
          return {
            type: "keychain",
            userAddress: t.userAddress,
            inner: e(t.signature),
            ...(t.keyId ? { keyId: t.keyId } : {}),
            ...(t.version ? { version: t.version } : {}),
          };
        if (
          "multisig" === t.type ||
          ("signatures" in t && ("account" in t || "init" in t))
        ) {
          let r = void 0 !== t.account,
            n = void 0 !== t.init;
          if (r === n)
            throw new ez({
              reason:
                "RPC multisig must contain exactly one of `account` or `init`",
            });
          let i = n ? m(t.init) : void 0,
            a = {
              type: "multisig",
              account: i ? b(i) : t.account,
              signatures: t.signatures.map((t) => e(t)),
              ...(i ? { init: i } : {}),
            };
          return (eP(a), a);
        }
        throw new eT({ envelope: t });
      },
      "serialize",
      0,
      eN,
      "sortMultisigApprovals",
      0,
      function (e) {
        let { payload: t, signatures: r, version: n = 0n } = e,
          i = w(
            "initialConfig" in e && e.initialConfig
              ? { payload: t, initialConfig: e.initialConfig, version: n }
              : { payload: t, account: e.account, version: n },
          );
        return r
          .map((e) => ({
            key: d.k(eA({ payload: i, signature: e })),
            signature: e,
          }))
          .sort((e, t) => (e.key < t.key ? -1 : +(e.key > t.key)))
          .map((e) => e.signature);
      },
      "toRpc",
      0,
      function e(t) {
        let r = eE(t);
        if ("secp256k1" === r)
          return { ...J.F(t.signature), type: "secp256k1" };
        if ("p256" === r)
          return {
            preHash: t.prehash,
            pubKeyX: d.u(t.publicKey.x, { size: 32 }),
            pubKeyY: d.u(t.publicKey.y, { size: 32 }),
            r: d.u(t.signature.r, { size: 32 }),
            s: d.u(t.signature.s, { size: 32 }),
            type: "p256",
          };
        if ("webAuthn" === r) {
          let e = d.w(
            t.metadata.authenticatorData,
            d.A(t.metadata.clientDataJSON),
          );
          return {
            pubKeyX: d.u(t.publicKey.x, { size: 32 }),
            pubKeyY: d.u(t.publicKey.y, { size: 32 }),
            r: d.u(t.signature.r, { size: 32 }),
            s: d.u(t.signature.s, { size: 32 }),
            type: "webAuthn",
            webauthnData: e,
          };
        }
        if ("keychain" === r)
          return {
            type: "keychain",
            userAddress: t.userAddress,
            signature: e(t.inner),
            ...(t.keyId ? { keyId: t.keyId } : {}),
            ...(t.version ? { version: t.version } : {}),
          };
        if ("multisig" === r) {
          eP(t);
          let r = t.signatures.map((t) => e(t));
          return t.init
            ? {
                init: {
                  ...t.init,
                  salt: t.init.salt ?? y,
                  threshold: Number(t.init.threshold),
                  owners: t.init.owners.map((e) => ({
                    ...e,
                    weight: Number(e.weight),
                  })),
                },
                signatures: r,
              }
            : { account: t.account, signatures: r };
        }
        throw new eT({ envelope: t });
      },
      "verify",
      0,
      function (e, t) {
        let { payload: r } = t,
          n = t.address ? t.address : t.publicKey ? l.E(t.publicKey) : void 0;
        if (!n) return !1;
        let i = eB(e);
        if ("secp256k1" === i.type)
          return !!n && H({ address: n, payload: r, signature: i.signature });
        if ("p256" === i.type) {
          let e = l.E(i.publicKey);
          return (
            !!l.M(e, n) &&
            D({
              hash: i.prehash,
              publicKey: i.publicKey,
              payload: r,
              signature: i.signature,
            })
          );
        }
        if ("webAuthn" === i.type) {
          let e = l.E(i.publicKey);
          return (
            !!l.M(e, n) &&
            (function (e) {
              let {
                  challenge: t,
                  metadata: r,
                  origin: n,
                  publicKey: i,
                  rpId: a,
                  signature: s,
                } = e,
                {
                  authenticatorData: o,
                  clientDataJSON: u,
                  userVerificationRequired: l,
                } = r,
                c = K.E(o);
              if (c.length < 37) return !1;
              if (void 0 !== a) {
                let e = c.slice(0, 32),
                  t = f.E(d.A(a), { as: "Bytes" });
                if (!K.M(e, t)) return !1;
              }
              let p = c[32];
              if (
                (1 & p) != 1 ||
                (l && (4 & p) != 4) ||
                ((8 & p) != 8 && (16 & p) == 16)
              )
                return !1;
              let y = JSON.parse(u);
              if (
                "webauthn.get" !== y.type ||
                !y.challenge ||
                d.J(
                  (function (e) {
                    let t = e.replace(/=+$/, ""),
                      r = t.length,
                      n = new Uint8Array(r + 3);
                    Z.encodeInto(t + "===", n);
                    for (let e = 0, r = 0; e < t.length; e += 4, r += 3) {
                      let t =
                        (X[n[e]] << 18) +
                        (X[n[e + 1]] << 12) +
                        (X[n[e + 2]] << 6) +
                        X[n[e + 3]];
                      ((n[r] = t >> 16),
                        (n[r + 1] = (t >> 8) & 255),
                        (n[r + 2] = 255 & t));
                    }
                    return new Uint8Array(
                      n.buffer,
                      0,
                      (r >> 2) * 3 + (r % 4 && (r % 4) - 1),
                    );
                  })(y.challenge),
                ) !== t ||
                (void 0 !== n &&
                  !(Array.isArray(n) ? n : [n]).includes(y.origin))
              )
                return !1;
              let h = f.E(K.A(u), { as: "Bytes" });
              return D({
                hash: !0,
                payload: K.w(c, h),
                publicKey: i,
                signature: s,
              });
            })({
              challenge: d.f(r),
              metadata: i.metadata,
              publicKey: i.publicKey,
              signature: i.signature,
            })
          );
        }
        throw new eU(
          `Unable to verify signature envelope of type "${i.type}".`,
        );
      },
    ],
    379101,
  );
  var eC = e.i(379101);
  (e.s(["f", 0, eC], 673228),
    e.s(["f", 0, eC], 460366),
    e.s(["f", 0, eC], 722854),
    e.s(["f", 0, eC], 375804),
    e.s(
      [
        "l",
        0,
        function (e) {
          let t = {
            formatters: void 0,
            fees: void 0,
            serializers: void 0,
            ...e,
          };
          return Object.assign(t, {
            extend: (function e(t) {
              return (r) => {
                let n = "function" == typeof r ? r(t) : r,
                  i = { ...t, ...n };
                return Object.assign(i, { extend: e(i) });
              };
            })(t),
          });
        },
        "S",
        0,
        function () {
          return {};
        },
      ],
      920779,
    ),
    e.s(["f", 0, P], 184055));
};
