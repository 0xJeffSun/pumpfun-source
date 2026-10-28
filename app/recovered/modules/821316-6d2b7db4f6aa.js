// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(548801),
    n = e.i(715928),
    r = e.i(920107);
  function a(e, { dir: t, size: n = 32 } = {}) {
    return "string" == typeof e
      ? i(e, { dir: t, size: n })
      : (function (e, { dir: t, size: n = 32 } = {}) {
          if (null === n) return e;
          if (e.length > n)
            throw new r.G({ size: e.length, targetSize: n, type: "bytes" });
          let a = new Uint8Array(n);
          for (let r = 0; r < n; r++) {
            let i = "right" === t;
            a[i ? r : n - r - 1] = e[i ? r : e.length - r - 1];
          }
          return a;
        })(e, { dir: t, size: n });
  }
  function i(e, { dir: t, size: n = 32 } = {}) {
    if (null === n) return e;
    let a = e.replace("0x", "");
    if (a.length > 2 * n)
      throw new r.G({
        size: Math.ceil(a.length / 2),
        targetSize: n,
        type: "hex",
      });
    return `0x${a["right" === t ? "padEnd" : "padStart"](2 * n, "0")}`;
  }
  e.s(["g", 0, a, "n", 0, i], 237098);
  var s = t;
  class o extends s.f {
    constructor({ max: e, min: t, signed: n, size: r, value: a }) {
      super(
        `Number "${a}" is not in safe ${r ? `${8 * r}-bit ${n ? "signed" : "unsigned"} ` : ""}integer range ${e ? `(${t} to ${e})` : `(above ${t})`}`,
        { name: "IntegerOutOfRangeError" },
      );
    }
  }
  class f extends s.f {
    constructor(e) {
      super(
        `Bytes value "${e}" is not a valid boolean. The bytes array must contain a single byte of either a 0 or 1 value.`,
        { name: "InvalidBytesBooleanError" },
      );
    }
  }
  class c extends s.f {
    constructor(e) {
      super(
        `Hex value "${e}" is not a valid boolean. The hex value must be "0x0" (false) or "0x1" (true).`,
        { name: "InvalidHexBooleanError" },
      );
    }
  }
  s.f;
  class u extends s.f {
    constructor({ givenSize: e, maxSize: t }) {
      super(`Size cannot exceed ${t} bytes. Given size: ${e} bytes.`, {
        name: "SizeOverflowError",
      });
    }
  }
  e.s(["d", 0, o, "C", 0, f, "l", 0, c, "j", 0, u], 395255);
  var l = e.i(539788);
  function d(e, { dir: t = "left" } = {}) {
    let n = "string" == typeof e ? e.replace("0x", "") : e,
      r = 0;
    for (let e = 0; e < n.length - 1; e++)
      if ("0" === n["left" === t ? e : n.length - e - 1].toString()) r++;
      else break;
    return ((n = "left" === t ? n.slice(r) : n.slice(0, n.length - r)),
    "string" == typeof e)
      ? (1 === n.length && "right" === t && (n = `${n}0`),
        `0x${n.length % 2 == 1 ? `0${n}` : n}`)
      : n;
  }
  function b(e, { size: t }) {
    if ((0, l.f)(e) > t) throw new u({ givenSize: (0, l.f)(e), maxSize: t });
  }
  function p(e, t = {}) {
    let { signed: n } = t;
    t.size && b(e, { size: t.size });
    let r = BigInt(e);
    if (!n) return r;
    let a = (e.length - 2) / 2;
    return r <= (1n << (8n * BigInt(a) - 1n)) - 1n
      ? r
      : r - BigInt(`0x${"f".padStart(2 * a, "f")}`) - 1n;
  }
  (e.s(["f", 0, d], 31858),
    e.s(
      [
        "u",
        0,
        b,
        "K",
        0,
        p,
        "d",
        0,
        function (e, t = {}) {
          let n = e;
          if ((t.size && (b(n, { size: t.size }), (n = d(n))), "0x00" === d(n)))
            return !1;
          if ("0x01" === d(n)) return !0;
          throw new c(n);
        },
        "T",
        0,
        function (e, t = {}) {
          return Number(p(e, t));
        },
      ],
      932883,
    ));
  let h = Array.from({ length: 256 }, (e, t) =>
    t.toString(16).padStart(2, "0"),
  );
  function m(e, t = {}) {
    return "number" == typeof e || "bigint" == typeof e
      ? v(e, t)
      : "string" == typeof e
        ? $(e, t)
        : "boolean" == typeof e
          ? y(e, t)
          : g(e, t);
  }
  function y(e, t = {}) {
    let n = `0x${Number(e)}`;
    return "number" == typeof t.size
      ? (b(n, { size: t.size }), a(n, { size: t.size }))
      : n;
  }
  function g(e, t = {}) {
    let n = "";
    for (let t = 0; t < e.length; t++) n += h[e[t]];
    let r = `0x${n}`;
    return "number" == typeof t.size
      ? (b(r, { size: t.size }), a(r, { dir: "right", size: t.size }))
      : r;
  }
  function v(e, t = {}) {
    let n,
      { signed: r, size: i } = t,
      s = BigInt(e);
    i
      ? (n = r
          ? (1n << (8n * BigInt(i) - 1n)) - 1n
          : 2n ** (8n * BigInt(i)) - 1n)
      : "number" == typeof e && (n = BigInt(Number.MAX_SAFE_INTEGER));
    let f = "bigint" == typeof n && r ? -n - 1n : 0;
    if ((n && s > n) || s < f) {
      let t = "bigint" == typeof e ? "n" : "";
      throw new o({
        max: n ? `${n}${t}` : void 0,
        min: `${f}${t}`,
        signed: r,
        size: i,
        value: `${e}${t}`,
      });
    }
    let c = `0x${(r && s < 0 ? (1n << BigInt(8 * i)) + BigInt(s) : s).toString(16)}`;
    return i ? a(c, { size: i }) : c;
  }
  let w = new TextEncoder();
  function $(e, t = {}) {
    return g(w.encode(e), t);
  }
  e.s(["V", 0, y, "v", 0, g, "N", 0, v, "B", 0, $, "g", 0, m], 310191);
  let x = new TextEncoder();
  function P(e, t = {}) {
    return "number" == typeof e || "bigint" == typeof e
      ? M(v(e, t))
      : "boolean" == typeof e
        ? (function (e, t = {}) {
            let n = new Uint8Array(1);
            return ((n[0] = Number(e)), "number" == typeof t.size)
              ? (b(n, { size: t.size }), a(n, { size: t.size }))
              : n;
          })(e, t)
        : (0, n.f)(e)
          ? M(e, t)
          : E(e, t);
  }
  function A(e) {
    return e >= 48 && e <= 57
      ? e - 48
      : e >= 65 && e <= 70
        ? e - 55
        : e >= 97 && e <= 102
          ? e - 87
          : void 0;
  }
  function M(e, n = {}) {
    let r = e;
    n.size &&
      (b(r, { size: n.size }), (r = a(r, { dir: "right", size: n.size })));
    let i = r.slice(2);
    i.length % 2 && (i = `0${i}`);
    let s = i.length / 2,
      o = new Uint8Array(s);
    for (let e = 0, n = 0; e < s; e++) {
      let r = A(i.charCodeAt(n++)),
        a = A(i.charCodeAt(n++));
      if (void 0 === r || void 0 === a)
        throw new t.f(
          `Invalid byte sequence ("${i[n - 2]}${i[n - 1]}" in "${i}").`,
        );
      o[e] = 16 * r + a;
    }
    return o;
  }
  function E(e, t = {}) {
    let n = x.encode(e);
    return "number" == typeof t.size
      ? (b(n, { size: t.size }), a(n, { dir: "right", size: t.size }))
      : n;
  }
  e.s(["X", 0, M, "T", 0, E, "D", 0, P], 821316);
  var z = e.i(626014);
  e.s(
    [
      "f",
      0,
      function (e, t) {
        let r = (0, z.f)((0, n.f)(e, { strict: !1 }) ? P(e) : e);
        return "bytes" === (t || "hex") ? r : m(r);
      },
    ],
    78603,
  );
};
