// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  let t = "2.23.2",
    i = {
      getDocsUrl: ({ docsBaseUrl: e, docsPath: t = "", docsSlug: i }) =>
        t ? `${e ?? "https://viem.sh"}${t}${i ? `#${i}` : ""}` : void 0,
      version: `viem@${t}`,
    };
  class s extends Error {
    constructor(e, r = {}) {
      let a =
          r.cause instanceof s
            ? r.cause.details
            : r.cause?.message
              ? r.cause.message
              : r.details,
        n = (r.cause instanceof s && r.cause.docsPath) || r.docsPath,
        o = i.getDocsUrl?.({ ...r, docsPath: n });
      (super(
        [
          e || "An error occurred.",
          "",
          ...(r.metaMessages ? [...r.metaMessages, ""] : []),
          ...(o ? [`Docs: ${o}`] : []),
          ...(a ? [`Details: ${a}`] : []),
          ...(i.version ? [`Version: ${i.version}`] : []),
        ].join("\n"),
        r.cause ? { cause: r.cause } : void 0,
      ),
        Object.defineProperty(this, "details", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: void 0,
        }),
        Object.defineProperty(this, "docsPath", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: void 0,
        }),
        Object.defineProperty(this, "metaMessages", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: void 0,
        }),
        Object.defineProperty(this, "shortMessage", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: void 0,
        }),
        Object.defineProperty(this, "version", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: void 0,
        }),
        Object.defineProperty(this, "name", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: "BaseError",
        }),
        (this.details = a),
        (this.docsPath = n),
        (this.metaMessages = r.metaMessages),
        (this.name = r.name ?? this.name),
        (this.shortMessage = e),
        (this.version = t));
    }
    walk(e) {
      return (function e(t, i) {
        return i?.(t)
          ? t
          : t && "object" == typeof t && "cause" in t && void 0 !== t.cause
            ? e(t.cause, i)
            : i
              ? null
              : t;
      })(this, e);
    }
  }
  function r(e, { strict: t = !0 } = {}) {
    return (
      !!e &&
      "string" == typeof e &&
      (t ? /^0x[0-9a-fA-F]*$/.test(e) : e.startsWith("0x"))
    );
  }
  class a extends s {
    constructor({ size: e, targetSize: t, type: i }) {
      super(
        `${i.charAt(0).toUpperCase()}${i.slice(1).toLowerCase()} size (${e}) exceeds padding size (${t}).`,
        { name: "SizeExceedsPaddingSizeError" },
      );
    }
  }
  function n(e, { dir: t, size: i = 32 } = {}) {
    return "string" == typeof e
      ? (function (e, { dir: t, size: i = 32 } = {}) {
          if (null === i) return e;
          let s = e.replace("0x", "");
          if (s.length > 2 * i)
            throw new a({
              size: Math.ceil(s.length / 2),
              targetSize: i,
              type: "hex",
            });
          return `0x${s["right" === t ? "padEnd" : "padStart"](2 * i, "0")}`;
        })(e, { dir: t, size: i })
      : (function (e, { dir: t, size: i = 32 } = {}) {
          if (null === i) return e;
          if (e.length > i)
            throw new a({ size: e.length, targetSize: i, type: "bytes" });
          let s = new Uint8Array(i);
          for (let r = 0; r < i; r++) {
            let a = "right" === t;
            s[a ? r : i - r - 1] = e[a ? r : e.length - r - 1];
          }
          return s;
        })(e, { dir: t, size: i });
  }
  class o extends s {
    constructor({ max: e, min: t, signed: i, size: s, value: r }) {
      super(
        `Number "${r}" is not in safe ${s ? `${8 * s}-bit ${i ? "signed" : "unsigned"} ` : ""}integer range ${e ? `(${t} to ${e})` : `(above ${t})`}`,
        { name: "IntegerOutOfRangeError" },
      );
    }
  }
  class c extends s {
    constructor({ givenSize: e, maxSize: t }) {
      super(`Size cannot exceed ${t} bytes. Given size: ${e} bytes.`, {
        name: "SizeOverflowError",
      });
    }
  }
  function l(e) {
    return r(e, { strict: !1 }) ? Math.ceil((e.length - 2) / 2) : e.length;
  }
  function h(e, { size: t }) {
    if (l(e) > t) throw new c({ givenSize: l(e), maxSize: t });
  }
  function u(e, t = {}) {
    let { signed: i } = t;
    t.size && h(e, { size: t.size });
    let s = BigInt(e);
    if (!i) return s;
    let r = (e.length - 2) / 2;
    return s <= (1n << (8n * BigInt(r) - 1n)) - 1n
      ? s
      : s - BigInt(`0x${"f".padStart(2 * r, "f")}`) - 1n;
  }
  let d = Array.from({ length: 256 }, (e, t) =>
    t.toString(16).padStart(2, "0"),
  );
  function p(e, t = {}) {
    return "number" == typeof e || "bigint" == typeof e
      ? f(e, t)
      : "string" == typeof e
        ? (function (e, t = {}) {
            return g(m.encode(e), t);
          })(e, t)
        : "boolean" == typeof e
          ? (function (e, t = {}) {
              let i = `0x${Number(e)}`;
              return "number" == typeof t.size
                ? (h(i, { size: t.size }), n(i, { size: t.size }))
                : i;
            })(e, t)
          : g(e, t);
  }
  function g(e, t = {}) {
    let i = "";
    for (let t = 0; t < e.length; t++) i += d[e[t]];
    let s = `0x${i}`;
    return "number" == typeof t.size
      ? (h(s, { size: t.size }), n(s, { dir: "right", size: t.size }))
      : s;
  }
  function f(e, t = {}) {
    let i,
      { signed: s, size: r } = t,
      a = BigInt(e);
    r
      ? (i = s
          ? (1n << (8n * BigInt(r) - 1n)) - 1n
          : 2n ** (8n * BigInt(r)) - 1n)
      : "number" == typeof e && (i = BigInt(Number.MAX_SAFE_INTEGER));
    let c = "bigint" == typeof i && s ? -i - 1n : 0;
    if ((i && a > i) || a < c) {
      let t = "bigint" == typeof e ? "n" : "";
      throw new o({
        max: i ? `${i}${t}` : void 0,
        min: `${c}${t}`,
        signed: s,
        size: r,
        value: `${e}${t}`,
      });
    }
    let l = `0x${(s && a < 0 ? (1n << BigInt(8 * r)) + BigInt(a) : a).toString(16)}`;
    return r ? n(l, { size: r }) : l;
  }
  let m = new TextEncoder(),
    w = new TextEncoder();
  function y(e) {
    return e >= 48 && e <= 57
      ? e - 48
      : e >= 65 && e <= 70
        ? e - 55
        : e >= 97 && e <= 102
          ? e - 87
          : void 0;
  }
  function b(e, t = {}) {
    let i = e;
    t.size &&
      (h(i, { size: t.size }), (i = n(i, { dir: "right", size: t.size })));
    let r = i.slice(2);
    r.length % 2 && (r = `0${r}`);
    let a = r.length / 2,
      o = new Uint8Array(a);
    for (let e = 0, t = 0; e < a; e++) {
      let i = y(r.charCodeAt(t++)),
        a = y(r.charCodeAt(t++));
      if (void 0 === i || void 0 === a)
        throw new s(
          `Invalid byte sequence ("${r[t - 2]}${r[t - 1]}" in "${r}").`,
        );
      o[e] = 16 * i + a;
    }
    return o;
  }
  function v(e, t = {}) {
    let i = w.encode(e);
    return "number" == typeof t.size
      ? (h(i, { size: t.size }), n(i, { dir: "right", size: t.size }))
      : i;
  }
  var I = e.i(356780);
  let E = BigInt(0xffffffff),
    C = BigInt(32);
  var S = e.i(8099);
  let A = [],
    P = [],
    N = [],
    _ = BigInt(0),
    x = BigInt(1),
    O = BigInt(2),
    T = BigInt(7),
    k = BigInt(256),
    R = BigInt(113);
  for (let e = 0, t = x, i = 1, s = 0; e < 24; e++) {
    (([i, s] = [s, (2 * i + 3 * s) % 5]),
      A.push(2 * (5 * s + i)),
      P.push((((e + 1) * (e + 2)) / 2) % 64));
    let r = _;
    for (let e = 0; e < 7; e++)
      (t = ((t << x) ^ ((t >> T) * R)) % k) & O &&
        (r ^= x << ((x << BigInt(e)) - x));
    N.push(r);
  }
  let [U, D] = (function (e, t = !1) {
      let i = new Uint32Array(e.length),
        s = new Uint32Array(e.length);
      for (let r = 0; r < e.length; r++) {
        let { h: a, l: n } = (function (e, t = !1) {
          return t
            ? { h: Number(e & E), l: Number((e >> C) & E) }
            : { h: 0 | Number((e >> C) & E), l: 0 | Number(e & E) };
        })(e[r], t);
        [i[r], s[r]] = [a, n];
      }
      return [i, s];
    })(N, !0),
    L = (e, t, i) =>
      i > 32 ? (t << (i - 32)) | (e >>> (64 - i)) : (e << i) | (t >>> (32 - i)),
    j = (e, t, i) =>
      i > 32 ? (e << (i - 32)) | (t >>> (64 - i)) : (t << i) | (e >>> (32 - i));
  class $ extends S.B {
    constructor(e, t, i, s = !1, r = 24) {
      if (
        (super(),
        (this.blockLen = e),
        (this.suffix = t),
        (this.outputLen = i),
        (this.enableXOF = s),
        (this.rounds = r),
        (this.pos = 0),
        (this.posOut = 0),
        (this.finished = !1),
        (this.destroyed = !1),
        (0, I.N)(i),
        0 >= this.blockLen || this.blockLen >= 200)
      )
        throw Error("Sha3 supports only keccak-f1600 function");
      ((this.state = new Uint8Array(200)),
        (this.state32 = (0, S.b)(this.state)));
    }
    keccak() {
      (S.o || (0, S.p)(this.state32),
        (function (e, t = 24) {
          let i = new Uint32Array(10);
          for (let s = 24 - t; s < 24; s++) {
            for (let t = 0; t < 10; t++)
              i[t] = e[t] ^ e[t + 10] ^ e[t + 20] ^ e[t + 30] ^ e[t + 40];
            for (let t = 0; t < 10; t += 2) {
              let s = (t + 8) % 10,
                r = (t + 2) % 10,
                a = i[r],
                n = i[r + 1],
                o = L(a, n, 1) ^ i[s],
                c = j(a, n, 1) ^ i[s + 1];
              for (let i = 0; i < 50; i += 10)
                ((e[t + i] ^= o), (e[t + i + 1] ^= c));
            }
            let t = e[2],
              r = e[3];
            for (let i = 0; i < 24; i++) {
              let s = P[i],
                a = L(t, r, s),
                n = j(t, r, s),
                o = A[i];
              ((t = e[o]), (r = e[o + 1]), (e[o] = a), (e[o + 1] = n));
            }
            for (let t = 0; t < 50; t += 10) {
              for (let s = 0; s < 10; s++) i[s] = e[t + s];
              for (let s = 0; s < 10; s++)
                e[t + s] ^= ~i[(s + 2) % 10] & i[(s + 4) % 10];
            }
            ((e[0] ^= U[s]), (e[1] ^= D[s]));
          }
          i.fill(0);
        })(this.state32, this.rounds),
        S.o || (0, S.p)(this.state32),
        (this.posOut = 0),
        (this.pos = 0));
    }
    update(e) {
      (0, I.s)(this);
      let { blockLen: t, state: i } = this,
        s = (e = (0, S.D)(e)).length;
      for (let r = 0; r < s; ) {
        let a = Math.min(t - this.pos, s - r);
        for (let t = 0; t < a; t++) i[this.pos++] ^= e[r++];
        this.pos === t && this.keccak();
      }
      return this;
    }
    finish() {
      if (this.finished) return;
      this.finished = !0;
      let { state: e, suffix: t, pos: i, blockLen: s } = this;
      ((e[i] ^= t),
        (128 & t) != 0 && i === s - 1 && this.keccak(),
        (e[s - 1] ^= 128),
        this.keccak());
    }
    writeInto(e) {
      ((0, I.s)(this, !1), (0, I.B)(e), this.finish());
      let t = this.state,
        { blockLen: i } = this;
      for (let s = 0, r = e.length; s < r; ) {
        this.posOut >= i && this.keccak();
        let a = Math.min(i - this.posOut, r - s);
        (e.set(t.subarray(this.posOut, this.posOut + a), s),
          (this.posOut += a),
          (s += a));
      }
      return e;
    }
    xofInto(e) {
      if (!this.enableXOF) throw Error("XOF is not possible for this instance");
      return this.writeInto(e);
    }
    xof(e) {
      return ((0, I.N)(e), this.xofInto(new Uint8Array(e)));
    }
    digestInto(e) {
      if (((0, I.W)(e, this), this.finished))
        throw Error("digest() was already called");
      return (this.writeInto(e), this.destroy(), e);
    }
    digest() {
      return this.digestInto(new Uint8Array(this.outputLen));
    }
    destroy() {
      ((this.destroyed = !0), this.state.fill(0));
    }
    _cloneInto(e) {
      let {
        blockLen: t,
        suffix: i,
        outputLen: s,
        rounds: r,
        enableXOF: a,
      } = this;
      return (
        e || (e = new $(t, i, s, a, r)),
        e.state32.set(this.state32),
        (e.pos = this.pos),
        (e.posOut = this.posOut),
        (e.finished = this.finished),
        (e.rounds = r),
        (e.suffix = i),
        (e.outputLen = s),
        (e.enableXOF = a),
        (e.destroyed = this.destroyed),
        e
      );
    }
  }
  let M = (0, S.k)(() => new $(136, 1, 32));
  function q(e, t) {
    let i = M(
      r(e, { strict: !1 })
        ? (function (e, t = {}) {
            return "number" == typeof e || "bigint" == typeof e
              ? b(f(e, t))
              : "boolean" == typeof e
                ? (function (e, t = {}) {
                    let i = new Uint8Array(1);
                    return ((i[0] = Number(e)), "number" == typeof t.size)
                      ? (h(i, { size: t.size }), n(i, { size: t.size }))
                      : i;
                  })(e, t)
                : r(e)
                  ? b(e, t)
                  : v(e, t);
          })(e)
        : e,
    );
    return "bytes" === (t || "hex") ? i : p(i);
  }
  class B extends Map {
    constructor(e) {
      (super(),
        Object.defineProperty(this, "maxSize", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: void 0,
        }),
        (this.maxSize = e));
    }
    get(e) {
      let t = super.get(e);
      return (
        super.has(e) && void 0 !== t && (this.delete(e), super.set(e, t)),
        t
      );
    }
    set(e, t) {
      if ((super.set(e, t), this.maxSize && this.size > this.maxSize)) {
        let e = this.keys().next().value;
        e && this.delete(e);
      }
      return this;
    }
  }
  let z = new B(8192);
  async function H({ hash: t, signature: i }) {
    let s = r(t) ? t : p(t),
      { secp256k1: a } = await e.A(817476),
      n = (() => {
        if ("object" == typeof i && "r" in i && "s" in i) {
          let { r: e, s: t, v: s, yParity: r } = i,
            n = V(Number(r ?? s));
          return new a.Signature(u(e), u(t)).addRecoveryBit(n);
        }
        let e = r(i) ? i : p(i),
          t = V(
            (function (e, t = {}) {
              return Number(u(e, t));
            })(`0x${e.slice(130)}`),
          );
        return a.Signature.fromCompact(e.substring(2, 130)).addRecoveryBit(t);
      })()
        .recoverPublicKey(s.substring(2))
        .toHex(!1);
    return `0x${n}`;
  }
  function V(e) {
    if (0 === e || 1 === e) return e;
    if (27 === e) return 0;
    if (28 === e) return 1;
    throw Error("Invalid yParityOrV value");
  }
  async function F({ hash: e, signature: t }) {
    var i;
    let s;
    return (
      (i = await H({ hash: e, signature: t })),
      (s = q(`0x${i.substring(4)}`).substring(26)),
      (function (e) {
        if (z.has(`${e}.undefined`)) return z.get(`${e}.undefined`);
        let t = e.substring(2).toLowerCase(),
          i = q(v(t), "bytes"),
          s = t.split("");
        for (let e = 0; e < 40; e += 2)
          (i[e >> 1] >> 4 >= 8 && s[e] && (s[e] = s[e].toUpperCase()),
            (15 & i[e >> 1]) >= 8 &&
              s[e + 1] &&
              (s[e + 1] = s[e + 1].toUpperCase()));
        let r = `0x${s.join("")}`;
        return (z.set(`${e}.undefined`, r), r);
      })(`0x${s}`)
    );
  }
  function K(e = 0) {
    return null != globalThis.Buffer && null != globalThis.Buffer.allocUnsafe
      ? globalThis.Buffer.allocUnsafe(e)
      : new Uint8Array(e);
  }
  (e.s(["f", 0, F], 971275),
    e.s(
      [
        "f",
        0,
        function (e, t) {
          t || (t = e.reduce((e, t) => e + t.length, 0));
          let i = K(t),
            s = 0;
          for (let t of e) (i.set(t, s), (s += t.length));
          return i;
        },
      ],
      913095,
    ));
  var W = e.i(957736);
  function G(e, t, i, s) {
    return {
      name: e,
      prefix: t,
      encoder: { name: e, prefix: t, encode: i },
      decoder: { decode: s },
    };
  }
  let Y = G(
      "utf8",
      "u",
      (e) => "u" + new TextDecoder("utf8").decode(e),
      (e) => new TextEncoder().encode(e.substring(1)),
    ),
    J = G(
      "ascii",
      "a",
      (e) => {
        let t = "a";
        for (let i = 0; i < e.length; i++) t += String.fromCharCode(e[i]);
        return t;
      },
      (e) => {
        let t = K((e = e.substring(1)).length);
        for (let i = 0; i < e.length; i++) t[i] = e.charCodeAt(i);
        return t;
      },
    ),
    X = {
      utf8: Y,
      "utf-8": Y,
      hex: W.f.base16,
      latin1: J,
      ascii: J,
      binary: J,
      ...W.f,
    };
  (e.s(
    [
      "f",
      0,
      function (e, t = "utf8") {
        let i = X[t];
        if (!i) throw Error(`Unsupported encoding "${t}"`);
        return ("utf8" === t || "utf-8" === t) &&
          null != globalThis.Buffer &&
          null != globalThis.Buffer.from
          ? globalThis.Buffer.from(e, "utf8")
          : i.decoder.decode(`${i.prefix}${e}`);
      },
    ],
    835230,
  ),
    e.s(
      [
        "f",
        0,
        function (e, t = "utf8") {
          let i = X[t];
          if (!i) throw Error(`Unsupported encoding "${t}"`);
          return ("utf8" === t || "utf-8" === t) &&
            null != globalThis.Buffer &&
            null != globalThis.Buffer.from
            ? globalThis.Buffer.from(
                e.buffer,
                e.byteOffset,
                e.byteLength,
              ).toString("utf8")
            : i.encoder.encode(e).substring(1);
        },
      ],
      266188,
    ),
    e.s([], 547762));
};
