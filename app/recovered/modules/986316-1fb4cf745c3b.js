// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  (e.s(
    [
      "d",
      () => Z,
      "h",
      () => et,
      "G",
      () => ei,
      "j",
      () => en,
      "p",
      () => er,
      "n",
      () => R,
      "w",
      () => C,
      "f",
      () => F,
      "U",
      () => S,
      "J",
      () => k,
      "u",
      () => L,
      "A",
      () => D,
      "V",
      () => U,
      "i",
      () => G,
      "W",
      () => V,
      "o",
      () => H,
      "M",
      () => q,
      "k",
      () => W,
      "D",
      () => Y,
      "L",
      () => J,
      "e",
      () => K,
      "q",
      () => _,
      "g",
      () => X,
    ],
    65177,
  ),
    e.s(
      [
        "G",
        () => j,
        "j",
        () => N,
        "p",
        () => B,
        "w",
        () => b,
        "f",
        () => l,
        "E",
        () => p,
        "A",
        () => h,
        "M",
        () => m,
        "W",
        () => y,
        "o",
        () => g,
        "N",
        () => v,
        "k",
        () => w,
        "K",
        () => x,
        "L",
        () => $,
        "e",
        () => P,
        "q",
        () => E,
        "O",
        () => M,
        "g",
        () => A,
      ],
      829833,
    ));
  var t = e.i(211916);
  function n() {
    return "0.1.1";
  }
  e.s(
    [
      "d",
      0,
      n,
      "P",
      0,
      function (e) {
        if (!e) return "";
        let t = Object.entries(e)
            .map(([e, t]) => (void 0 === t || !1 === t ? null : [e, t]))
            .filter(Boolean),
          n = t.reduce((e, [t]) => Math.max(e, t.length), 0);
        return t.map(([e, t]) => `  ${`${e}:`.padEnd(n + 1)}  ${t}`).join("\n");
      },
    ],
    367101,
  );
  class r extends Error {
    static setStaticOptions(e) {
      ((r.prototype.docsOrigin = e.docsOrigin),
        (r.prototype.showVersion = e.showVersion),
        (r.prototype.version = e.version));
    }
    constructor(e, t = {}) {
      let n = (() => {
          if (t.cause instanceof r) {
            if (t.cause.details) return t.cause.details;
            if (t.cause.shortMessage) return t.cause.shortMessage;
          }
          return t.cause &&
            "details" in t.cause &&
            "string" == typeof t.cause.details
            ? t.cause.details
            : t.cause?.message
              ? t.cause.message
              : t.details;
        })(),
        i = (t.cause instanceof r && t.cause.docsPath) || t.docsPath,
        a = t.docsOrigin ?? r.prototype.docsOrigin,
        s = `${a}${i ?? ""}`,
        o = !!(t.version ?? r.prototype.showVersion),
        f = t.version ?? r.prototype.version;
      (super(
        [
          e || "An error occurred.",
          ...(t.metaMessages ? ["", ...t.metaMessages] : []),
          ...(n || i || o
            ? [
                "",
                n ? `Details: ${n}` : void 0,
                i ? `See: ${s}` : void 0,
                o ? `Version: ${f}` : void 0,
              ]
            : []),
        ]
          .filter((e) => "string" == typeof e)
          .join("\n"),
        t.cause ? { cause: t.cause } : void 0,
      ),
        Object.defineProperty(this, "details", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: void 0,
        }),
        Object.defineProperty(this, "docs", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: void 0,
        }),
        Object.defineProperty(this, "docsOrigin", {
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
        Object.defineProperty(this, "shortMessage", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: void 0,
        }),
        Object.defineProperty(this, "showVersion", {
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
        Object.defineProperty(this, "cause", {
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
        (this.cause = t.cause),
        (this.details = n),
        (this.docs = s),
        (this.docsOrigin = a),
        (this.docsPath = i),
        (this.shortMessage = e),
        (this.showVersion = o),
        (this.version = f));
    }
    walk(e) {
      return (function e(t, n) {
        return n?.(t)
          ? t
          : t && "object" == typeof t && "cause" in t && t.cause
            ? e(t.cause, n)
            : n
              ? null
              : t;
      })(this, e);
    }
  }
  function i(e, t) {
    if (g(e) > t) throw new N({ givenSize: g(e), maxSize: t });
  }
  (Object.defineProperty(r, "defaultStaticOptions", {
    enumerable: !0,
    configurable: !0,
    writable: !0,
    value: {
      docsOrigin: "https://oxlib.sh",
      showVersion: !1,
      version: `ox@${n()}`,
    },
  }),
    r.setStaticOptions(r.defaultStaticOptions),
    e.s(["f", 0, r], 702133));
  function a(e) {
    return e >= 48 && e <= 57
      ? e - 48
      : e >= 65 && e <= 70
        ? e - 55
        : e >= 97 && e <= 102
          ? e - 87
          : void 0;
  }
  function s(e, t = {}) {
    let { dir: n = "left" } = t,
      r = e,
      i = 0;
    for (let e = 0; e < r.length - 1; e++)
      if ("0" === r["left" === n ? e : r.length - e - 1].toString()) i++;
      else break;
    return "left" === n ? r.slice(i) : r.slice(0, r.length - i);
  }
  function o(e, t) {
    if (H(e) > t) throw new en({ givenSize: H(e), maxSize: t });
  }
  function f(e, t = {}) {
    let { dir: n, size: r = 32 } = t;
    if (0 === r) return e;
    let i = e.replace("0x", "");
    if (i.length > 2 * r)
      throw new ei({
        size: Math.ceil(i.length / 2),
        targetSize: r,
        type: "Hex",
      });
    return `0x${i["right" === n ? "padEnd" : "padStart"](2 * r, "0")}`;
  }
  function c(e, t, n) {
    return JSON.stringify(
      e,
      (e, n) =>
        "function" == typeof t
          ? t(e, n)
          : "bigint" == typeof n
            ? n.toString() + "#__bigint"
            : n,
      n,
    );
  }
  e.s(["f", 0, c], 987439);
  let u = new TextDecoder(),
    d = new TextEncoder();
  function b(...e) {
    let t = 0;
    for (let n of e) t += n.length;
    let n = new Uint8Array(t);
    for (let t = 0, r = 0; t < e.length; t++) {
      let i = e[t];
      (n.set(i, r), (r += i.length));
    }
    return n;
  }
  function l(e) {
    var t;
    return e instanceof Uint8Array
      ? e
      : "string" == typeof e
        ? p(e)
        : (t = e) instanceof Uint8Array
          ? t
          : new Uint8Array(t);
  }
  function p(e, t = {}) {
    let { size: n } = t,
      i = e;
    n && (o(e, n), (i = G(e, n)));
    let s = i.slice(2);
    s.length % 2 && (s = `0${s}`);
    let f = s.length / 2,
      c = new Uint8Array(f);
    for (let e = 0, t = 0; e < f; e++) {
      let n = a(s.charCodeAt(t++)),
        i = a(s.charCodeAt(t++));
      if (void 0 === n || void 0 === i)
        throw new r(
          `Invalid byte sequence ("${s[t - 2]}${s[t - 1]}" in "${s}").`,
        );
      c[e] = (n << 4) | i;
    }
    return c;
  }
  function h(e, t = {}) {
    let { size: n } = t,
      r = d.encode(e);
    return "number" == typeof n
      ? (i(r, n),
        (function (e, t = {}) {
          let { dir: n, size: r = 32 } = t;
          if (0 === r) return e;
          if (e.length > r)
            throw new j({ size: e.length, targetSize: r, type: "Bytes" });
          let i = new Uint8Array(r);
          for (let t = 0; t < r; t++) {
            let a = "right" === n;
            i[a ? t : r - t - 1] = e[a ? t : e.length - t - 1];
          }
          return i;
        })(r, { dir: "right", size: n }))
      : r;
  }
  function m(e, n) {
    return (0, t.w)(e, n);
  }
  function y(e) {
    return crypto.getRandomValues(new Uint8Array(e));
  }
  function g(e) {
    return e.length;
  }
  function v(e, t, n, r = {}) {
    let { strict: i } = r;
    if ("number" == typeof t && t > 0 && t > g(e) - 1)
      throw new B({ offset: t, position: "start", size: g(e) });
    let a = e.slice(t, n);
    return (
      i &&
        (function (e, t, n) {
          if ("number" == typeof t && "number" == typeof n && g(e) !== n - t)
            throw new B({ offset: n, position: "end", size: g(e) });
        })(a, t, n),
      a
    );
  }
  function w(e, t = {}) {
    let { size: n } = t;
    return (void 0 !== n && i(e, n), W(k(e, t), t));
  }
  function x(e, t = {}) {
    let { size: n } = t,
      r = e;
    if ((void 0 !== n && (i(r, n), (r = E(r))), r.length > 1 || r[0] > 1))
      throw new O(r);
    return !!r[0];
  }
  function $(e, t = {}) {
    let { size: n } = t;
    return (void 0 !== n && i(e, n), J(k(e, t), t));
  }
  function P(e, t = {}) {
    let { size: n } = t,
      r = e;
    return (void 0 !== n && (i(r, n), (r = M(r))), u.decode(r));
  }
  function E(e) {
    return s(e, { dir: "left" });
  }
  function M(e) {
    return s(e, { dir: "right" });
  }
  function A(e) {
    try {
      if (
        !(e instanceof Uint8Array) &&
        (!e ||
          "object" != typeof e ||
          !("BYTES_PER_ELEMENT" in e) ||
          1 !== e.BYTES_PER_ELEMENT ||
          "Uint8Array" !== e.constructor.name)
      )
        throw new T(e);
      return !0;
    } catch {
      return !1;
    }
  }
  class O extends r {
    constructor(e) {
      (super(`Bytes value \`${e}\` is not a valid boolean.`, {
        metaMessages: [
          "The bytes array must contain a single byte of either a `0` or `1` value.",
        ],
      }),
        Object.defineProperty(this, "name", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: "Bytes.InvalidBytesBooleanError",
        }));
    }
  }
  class T extends r {
    constructor(e) {
      (super(
        `Value \`${"object" == typeof e ? c(e) : e}\` of type \`${typeof e}\` is an invalid Bytes value.`,
        { metaMessages: ["Bytes values must be of type `Bytes`."] },
      ),
        Object.defineProperty(this, "name", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: "Bytes.InvalidBytesTypeError",
        }));
    }
  }
  class N extends r {
    constructor({ givenSize: e, maxSize: t }) {
      (super(`Size cannot exceed \`${t}\` bytes. Given size: \`${e}\` bytes.`),
        Object.defineProperty(this, "name", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: "Bytes.SizeOverflowError",
        }));
    }
  }
  class B extends r {
    constructor({ offset: e, position: t, size: n }) {
      (super(
        `Slice ${"start" === t ? "starting" : "ending"} at offset \`${e}\` is out-of-bounds (size: \`${n}\`).`,
      ),
        Object.defineProperty(this, "name", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: "Bytes.SliceOffsetOutOfBoundsError",
        }));
    }
  }
  class j extends r {
    constructor({ size: e, targetSize: t, type: n }) {
      (super(
        `${n.charAt(0).toUpperCase()}${n.slice(1).toLowerCase()} size (\`${e}\`) exceeds padding size (\`${t}\`).`,
      ),
        Object.defineProperty(this, "name", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: "Bytes.SizeExceedsPaddingSizeError",
        }));
    }
  }
  let I = new TextEncoder(),
    z = Array.from({ length: 256 }, (e, t) => t.toString(16).padStart(2, "0"));
  function R(e, t = {}) {
    let { strict: n = !1 } = t;
    if (!e || "string" != typeof e) throw new Q(e);
    if ((n && !/^0x[0-9a-fA-F]*$/.test(e)) || !e.startsWith("0x"))
      throw new ee(e);
  }
  function C(...e) {
    return `0x${e.reduce((e, t) => e + t.replace("0x", ""), "")}`;
  }
  function F(e) {
    return e instanceof Uint8Array
      ? k(e)
      : Array.isArray(e)
        ? k(new Uint8Array(e))
        : e;
  }
  function S(e, t = {}) {
    let n = `0x${Number(e)}`;
    return "number" == typeof t.size ? (o(n, t.size), U(n, t.size)) : n;
  }
  function k(e, t = {}) {
    let n = "";
    for (let t = 0; t < e.length; t++) n += z[e[t]];
    let r = `0x${n}`;
    return "number" == typeof t.size ? (o(r, t.size), G(r, t.size)) : r;
  }
  function L(e, t = {}) {
    let n,
      { signed: r, size: i } = t,
      a = BigInt(e);
    i
      ? (n = r
          ? (1n << (8n * BigInt(i) - 1n)) - 1n
          : 2n ** (8n * BigInt(i)) - 1n)
      : "number" == typeof e && (n = BigInt(Number.MAX_SAFE_INTEGER));
    let s = "bigint" == typeof n && r ? -n - 1n : 0;
    if ((n && a > n) || a < s) {
      let t = "bigint" == typeof e ? "n" : "";
      throw new Z({
        max: n ? `${n}${t}` : void 0,
        min: `${s}${t}`,
        signed: r,
        size: i,
        value: `${e}${t}`,
      });
    }
    let o = (r && a < 0 ? BigInt.asUintN(8 * i, BigInt(a)) : a).toString(16),
      f = `0x${o}`;
    return i ? U(f, i) : f;
  }
  function D(e, t = {}) {
    return k(I.encode(e), t);
  }
  function U(e, t) {
    return f(e, { dir: "left", size: t });
  }
  function G(e, t) {
    return f(e, { dir: "right", size: t });
  }
  function V(e) {
    return k(y(e));
  }
  function q(e, t, n, r = {}) {
    let { strict: i } = r;
    if ("number" == typeof t && t > 0 && t > H(e) - 1)
      throw new er({ offset: t, position: "start", size: H(e) });
    let a = `0x${e.replace("0x", "").slice((t ?? 0) * 2, (n ?? e.length) * 2)}`;
    return (
      i &&
        (function (e, t, n) {
          if ("number" == typeof t && "number" == typeof n && H(e) !== n - t)
            throw new er({ offset: n, position: "end", size: H(e) });
        })(a, t, n),
      a
    );
  }
  function H(e) {
    return Math.ceil((e.length - 2) / 2);
  }
  function _(e) {
    return (function (e, t = {}) {
      let { dir: n = "left" } = t,
        r = e.replace("0x", ""),
        i = 0;
      for (let e = 0; e < r.length - 1; e++)
        if ("0" === r["left" === n ? e : r.length - e - 1].toString()) i++;
        else break;
      return "0" === (r = "left" === n ? r.slice(i) : r.slice(0, r.length - i))
        ? "0x"
        : "right" === n && r.length % 2 == 1
          ? `0x${r}0`
          : `0x${r}`;
    })(e, { dir: "left" });
  }
  function W(e, t = {}) {
    let { signed: n } = t;
    t.size && o(e, t.size);
    let r = BigInt(e);
    if (!n) return r;
    let i = (1n << (8n * BigInt((e.length - 2) / 2))) - 1n;
    return r <= i >> 1n ? r : r - i - 1n;
  }
  function Y(e, t = {}) {
    return p(e, t);
  }
  function J(e, t = {}) {
    let { signed: n, size: r } = t;
    return n || r ? Number(W(e, t)) : Number(e);
  }
  function K(e, t = {}) {
    let { size: n } = t,
      r = p(e);
    return (n && (i(r, n), (r = M(r))), new TextDecoder().decode(r));
  }
  function X(e, t = {}) {
    let { strict: n = !1 } = t;
    try {
      return (R(e, { strict: n }), !0);
    } catch {
      return !1;
    }
  }
  class Z extends r {
    constructor({ max: e, min: t, signed: n, size: r, value: i }) {
      (super(
        `Number \`${i}\` is not in safe${r ? ` ${8 * r}-bit` : ""}${n ? " signed" : " unsigned"} integer range ${e ? `(\`${t}\` to \`${e}\`)` : `(above \`${t}\`)`}`,
      ),
        Object.defineProperty(this, "name", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: "Hex.IntegerOutOfRangeError",
        }));
    }
  }
  class Q extends r {
    constructor(e) {
      (super(
        `Value \`${"object" == typeof e ? c(e) : e}\` of type \`${typeof e}\` is an invalid hex type.`,
        { metaMessages: ['Hex types must be represented as `"0x${string}"`.'] },
      ),
        Object.defineProperty(this, "name", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: "Hex.InvalidHexTypeError",
        }));
    }
  }
  class ee extends r {
    constructor(e) {
      (super(`Value \`${e}\` is an invalid hex value.`, {
        metaMessages: [
          'Hex values must start with `"0x"` and contain only hexadecimal characters (0-9, a-f, A-F).',
        ],
      }),
        Object.defineProperty(this, "name", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: "Hex.InvalidHexValueError",
        }));
    }
  }
  class et extends r {
    constructor(e) {
      (super(
        `Hex value \`"${e}"\` is an odd length (${e.length - 2} nibbles).`,
        { metaMessages: ["It must be an even length."] },
      ),
        Object.defineProperty(this, "name", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: "Hex.InvalidLengthError",
        }));
    }
  }
  class en extends r {
    constructor({ givenSize: e, maxSize: t }) {
      (super(`Size cannot exceed \`${t}\` bytes. Given size: \`${e}\` bytes.`),
        Object.defineProperty(this, "name", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: "Hex.SizeOverflowError",
        }));
    }
  }
  class er extends r {
    constructor({ offset: e, position: t, size: n }) {
      (super(
        `Slice ${"start" === t ? "starting" : "ending"} at offset \`${e}\` is out-of-bounds (size: \`${n}\`).`,
      ),
        Object.defineProperty(this, "name", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: "Hex.SliceOffsetOutOfBoundsError",
        }));
    }
  }
  class ei extends r {
    constructor({ size: e, targetSize: t, type: n }) {
      (super(
        `${n.charAt(0).toUpperCase()}${n.slice(1).toLowerCase()} size (\`${e}\`) exceeds padding size (\`${t}\`).`,
      ),
        Object.defineProperty(this, "name", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: "Hex.SizeExceedsPaddingSizeError",
        }));
    }
  }
  function ea(e) {
    return {
      address: e.address,
      amount: L(e.amount),
      index: L(e.index),
      validatorIndex: L(e.validatorIndex),
    };
  }
  e.s(
    [
      "f",
      0,
      function (e) {
        return {
          ...("bigint" == typeof e.baseFeePerGas && {
            baseFeePerGas: L(e.baseFeePerGas),
          }),
          ...("bigint" == typeof e.blobBaseFee && {
            blobBaseFee: L(e.blobBaseFee),
          }),
          ...("string" == typeof e.feeRecipient && {
            feeRecipient: e.feeRecipient,
          }),
          ...("bigint" == typeof e.gasLimit && { gasLimit: L(e.gasLimit) }),
          ...("bigint" == typeof e.number && { number: L(e.number) }),
          ...("bigint" == typeof e.prevRandao && {
            prevRandao: L(e.prevRandao),
          }),
          ...("bigint" == typeof e.time && { time: L(e.time) }),
          ...(e.withdrawals && { withdrawals: e.withdrawals.map(ea) }),
        };
      },
    ],
    986316,
  );
};
