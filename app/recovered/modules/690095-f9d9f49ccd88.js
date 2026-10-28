// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  (e.s(
    [
      "d",
      () => O,
      "h",
      () => A,
      "G",
      () => E,
      "j",
      () => M,
      "p",
      () => F,
      "w",
      () => c,
      "f",
      () => d,
      "U",
      () => u,
      "J",
      () => l,
      "u",
      () => h,
      "A",
      () => p,
      "V",
      () => g,
      "i",
      () => m,
      "o",
      () => w,
      "M",
      () => y,
      "k",
      () => x,
      "L",
      () => $,
      "q",
      () => v,
      "g",
      () => P,
    ],
    289214,
  ),
    e.s(
      ["F", () => n, "u", () => f, "E", () => a, "g", () => r, "N", () => i],
      597753,
    ));
  class t extends Error {
    static setStaticOptions(e) {
      ((t.prototype.docsOrigin = e.docsOrigin),
        (t.prototype.showVersion = e.showVersion),
        (t.prototype.version = e.version));
    }
    constructor(e, f = {}) {
      let a = (() => {
          if (f.cause instanceof t) {
            if (f.cause.details) return f.cause.details;
            if (f.cause.shortMessage) return f.cause.shortMessage;
          }
          return f.cause &&
            "details" in f.cause &&
            "string" == typeof f.cause.details
            ? f.cause.details
            : f.cause?.message
              ? f.cause.message
              : f.details;
        })(),
        n = (f.cause instanceof t && f.cause.docsPath) || f.docsPath,
        r = f.docsOrigin ?? t.prototype.docsOrigin,
        i = `${r}${n ?? ""}`,
        b = !!(f.version ?? t.prototype.showVersion),
        s = f.version ?? t.prototype.version;
      (super(
        [
          e || "An error occurred.",
          ...(f.metaMessages ? ["", ...f.metaMessages] : []),
          ...(a || n || b
            ? [
                "",
                a ? `Details: ${a}` : void 0,
                n ? `See: ${i}` : void 0,
                b ? `Version: ${s}` : void 0,
              ]
            : []),
        ]
          .filter((e) => "string" == typeof e)
          .join("\n"),
        f.cause ? { cause: f.cause } : void 0,
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
        (this.cause = f.cause),
        (this.details = a),
        (this.docs = i),
        (this.docsOrigin = r),
        (this.docsPath = n),
        (this.shortMessage = e),
        (this.showVersion = b),
        (this.version = s));
    }
    walk(e) {
      return (function e(t, f) {
        return f?.(t)
          ? t
          : t && "object" == typeof t && "cause" in t && t.cause
            ? e(t.cause, f)
            : f
              ? null
              : t;
      })(this, e);
    }
  }
  function f(e, t) {
    if (w(e) > t) throw new M({ givenSize: w(e), maxSize: t });
  }
  function a(e, t) {
    if ("number" == typeof t && t > 0 && t > w(e) - 1)
      throw new F({ offset: t, position: "start", size: w(e) });
  }
  function n(e, t, f) {
    if ("number" == typeof t && "number" == typeof f && w(e) !== f - t)
      throw new F({ offset: f, position: "end", size: w(e) });
  }
  function r(e, t = {}) {
    let { dir: f, size: a = 32 } = t;
    if (0 === a) return e;
    let n = e.replace("0x", "");
    if (n.length > 2 * a)
      throw new E({
        size: Math.ceil(n.length / 2),
        targetSize: a,
        type: "Hex",
      });
    return `0x${n["right" === f ? "padEnd" : "padStart"](2 * a, "0")}`;
  }
  function i(e, t = {}) {
    let { dir: f = "left" } = t,
      a = e.replace("0x", ""),
      n = 0;
    for (let e = 0; e < a.length - 1; e++)
      if ("0" === a["left" === f ? e : a.length - e - 1].toString()) n++;
      else break;
    return "0" === (a = "left" === f ? a.slice(n) : a.slice(0, a.length - n))
      ? "0x"
      : "right" === f && a.length % 2 == 1
        ? `0x${a}0`
        : `0x${a}`;
  }
  function b(e, t, f) {
    return JSON.stringify(
      e,
      (e, f) =>
        "function" == typeof t
          ? t(e, f)
          : "bigint" == typeof f
            ? f.toString() + "#__bigint"
            : f,
      f,
    );
  }
  (Object.defineProperty(t, "defaultStaticOptions", {
    enumerable: !0,
    configurable: !0,
    writable: !0,
    value: {
      docsOrigin: "https://oxlib.sh",
      showVersion: !1,
      version: "ox@0.1.1",
    },
  }),
    t.setStaticOptions(t.defaultStaticOptions),
    e.s(["f", 0, t], 471418),
    e.s(["f", 0, b], 896421));
  let s = new TextEncoder(),
    o = Array.from({ length: 256 }, (e, t) => t.toString(16).padStart(2, "0"));
  function c(...e) {
    return `0x${e.reduce((e, t) => e + t.replace("0x", ""), "")}`;
  }
  function d(e) {
    return e instanceof Uint8Array
      ? l(e)
      : Array.isArray(e)
        ? l(new Uint8Array(e))
        : e;
  }
  function u(e, t = {}) {
    let a = `0x${Number(e)}`;
    return "number" == typeof t.size ? (f(a, t.size), g(a, t.size)) : a;
  }
  function l(e, t = {}) {
    let a = "";
    for (let t = 0; t < e.length; t++) a += o[e[t]];
    let n = `0x${a}`;
    return "number" == typeof t.size ? (f(n, t.size), m(n, t.size)) : n;
  }
  function h(e, t = {}) {
    let f,
      { signed: a, size: n } = t,
      r = BigInt(e);
    n
      ? (f = a
          ? (1n << (8n * BigInt(n) - 1n)) - 1n
          : 2n ** (8n * BigInt(n)) - 1n)
      : "number" == typeof e && (f = BigInt(Number.MAX_SAFE_INTEGER));
    let i = "bigint" == typeof f && a ? -f - 1n : 0;
    if ((f && r > f) || r < i) {
      let t = "bigint" == typeof e ? "n" : "";
      throw new O({
        max: f ? `${f}${t}` : void 0,
        min: `${i}${t}`,
        signed: a,
        size: n,
        value: `${e}${t}`,
      });
    }
    let b = (a && r < 0 ? BigInt.asUintN(8 * n, BigInt(r)) : r).toString(16),
      s = `0x${b}`;
    return n ? g(s, n) : s;
  }
  function p(e, t = {}) {
    return l(s.encode(e), t);
  }
  function g(e, t) {
    return r(e, { dir: "left", size: t });
  }
  function m(e, t) {
    return r(e, { dir: "right", size: t });
  }
  function y(e, t, f, r = {}) {
    let { strict: i } = r;
    a(e, t);
    let b = `0x${e.replace("0x", "").slice((t ?? 0) * 2, (f ?? e.length) * 2)}`;
    return (i && n(b, t, f), b);
  }
  function w(e) {
    return Math.ceil((e.length - 2) / 2);
  }
  function v(e) {
    return i(e, { dir: "left" });
  }
  function x(e, t = {}) {
    let { signed: a } = t;
    t.size && f(e, t.size);
    let n = BigInt(e);
    if (!a) return n;
    let r = (1n << (8n * BigInt((e.length - 2) / 2))) - 1n;
    return n <= r >> 1n ? n : n - r - 1n;
  }
  function $(e, t = {}) {
    let { signed: f, size: a } = t;
    return f || a ? Number(x(e, t)) : Number(e);
  }
  function P(e, t = {}) {
    let { strict: f = !1 } = t;
    try {
      return (
        !(function (e, t = {}) {
          let { strict: f = !1 } = t;
          if (!e || "string" != typeof e) throw new j(e);
          if ((f && !/^0x[0-9a-fA-F]*$/.test(e)) || !e.startsWith("0x"))
            throw new N(e);
        })(e, { strict: f }),
        !0
      );
    } catch {
      return !1;
    }
  }
  class O extends t {
    constructor({ max: e, min: t, signed: f, size: a, value: n }) {
      (super(
        `Number \`${n}\` is not in safe${a ? ` ${8 * a}-bit` : ""}${f ? " signed" : " unsigned"} integer range ${e ? `(\`${t}\` to \`${e}\`)` : `(above \`${t}\`)`}`,
      ),
        Object.defineProperty(this, "name", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: "Hex.IntegerOutOfRangeError",
        }));
    }
  }
  class j extends t {
    constructor(e) {
      (super(
        `Value \`${"object" == typeof e ? b(e) : e}\` of type \`${typeof e}\` is an invalid hex type.`,
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
  class N extends t {
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
  class A extends t {
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
  class M extends t {
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
  class F extends t {
    constructor({ offset: e, position: t, size: f }) {
      (super(
        `Slice ${"start" === t ? "starting" : "ending"} at offset \`${e}\` is out-of-bounds (size: \`${f}\`).`,
      ),
        Object.defineProperty(this, "name", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: "Hex.SliceOffsetOutOfBoundsError",
        }));
    }
  }
  class E extends t {
    constructor({ size: e, targetSize: t, type: f }) {
      (super(
        `${f.charAt(0).toUpperCase()}${f.slice(1).toLowerCase()} size (\`${e}\`) exceeds padding size (\`${t}\`).`,
      ),
        Object.defineProperty(this, "name", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: "Hex.SizeExceedsPaddingSizeError",
        }));
    }
  }
  function z(e) {
    return {
      address: e.address,
      amount: h(e.amount),
      index: h(e.index),
      validatorIndex: h(e.validatorIndex),
    };
  }
  e.s(
    [
      "f",
      0,
      function (e) {
        return {
          ...("bigint" == typeof e.baseFeePerGas && {
            baseFeePerGas: h(e.baseFeePerGas),
          }),
          ...("bigint" == typeof e.blobBaseFee && {
            blobBaseFee: h(e.blobBaseFee),
          }),
          ...("string" == typeof e.feeRecipient && {
            feeRecipient: e.feeRecipient,
          }),
          ...("bigint" == typeof e.gasLimit && { gasLimit: h(e.gasLimit) }),
          ...("bigint" == typeof e.number && { number: h(e.number) }),
          ...("bigint" == typeof e.prevRandao && {
            prevRandao: h(e.prevRandao),
          }),
          ...("bigint" == typeof e.time && { time: h(e.time) }),
          ...(e.withdrawals && { withdrawals: e.withdrawals.map(z) }),
        };
      },
    ],
    690095,
  );
};
