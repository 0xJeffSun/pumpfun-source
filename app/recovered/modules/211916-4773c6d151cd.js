// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  let t = BigInt(0),
    r = BigInt(1);
  function n(e) {
    return (
      e instanceof Uint8Array ||
      (ArrayBuffer.isView(e) && "Uint8Array" === e.constructor.name)
    );
  }
  function s(e) {
    if (!n(e)) throw Error("Uint8Array expected");
  }
  function i(e) {
    if ("string" != typeof e)
      throw Error("hex string expected, got " + typeof e);
    return "" === e ? t : BigInt("0x" + e);
  }
  let o =
      "function" == typeof Uint8Array.from([]).toHex &&
      "function" == typeof Uint8Array.fromHex,
    a = Array.from({ length: 256 }, (e, t) => t.toString(16).padStart(2, "0"));
  function u(e) {
    if ((s(e), o)) return e.toHex();
    let t = "";
    for (let r = 0; r < e.length; r++) t += a[e[r]];
    return t;
  }
  function l(e) {
    return e >= 48 && e <= 57
      ? e - 48
      : e >= 65 && e <= 70
        ? e - 55
        : e >= 97 && e <= 102
          ? e - 87
          : void 0;
  }
  function c(e) {
    if ("string" != typeof e)
      throw Error("hex string expected, got " + typeof e);
    if (o) return Uint8Array.fromHex(e);
    let t = e.length,
      r = t / 2;
    if (t % 2)
      throw Error("hex string expected, got unpadded hex of length " + t);
    let n = new Uint8Array(r);
    for (let t = 0, s = 0; t < r; t++, s += 2) {
      let r = l(e.charCodeAt(s)),
        i = l(e.charCodeAt(s + 1));
      if (void 0 === r || void 0 === i)
        throw Error(
          'hex string expected, got non-hex character "' +
            (e[s] + e[s + 1]) +
            '" at index ' +
            s,
        );
      n[t] = 16 * r + i;
    }
    return n;
  }
  function p(e, t) {
    return c(e.toString(16).padStart(2 * t, "0"));
  }
  function f(...e) {
    let t = 0;
    for (let r = 0; r < e.length; r++) {
      let n = e[r];
      (s(n), (t += n.length));
    }
    let r = new Uint8Array(t);
    for (let t = 0, n = 0; t < e.length; t++) {
      let s = e[t];
      (r.set(s, n), (n += s.length));
    }
    return r;
  }
  let d = (e) => "bigint" == typeof e && t <= e;
  function y(e, t, r) {
    return d(e) && d(t) && d(r) && t <= e && e < r;
  }
  let m = (e) => new Uint8Array(e),
    h = {
      bigint: (e) => "bigint" == typeof e,
      function: (e) => "function" == typeof e,
      boolean: (e) => "boolean" == typeof e,
      string: (e) => "string" == typeof e,
      stringOrUint8Array: (e) => "string" == typeof e || n(e),
      isSafeInteger: (e) => Number.isSafeInteger(e),
      array: (e) => Array.isArray(e),
      field: (e, t) => t.Fp.isValid(e),
      hash: (e) => "function" == typeof e && Number.isSafeInteger(e.outputLen),
    };
  e.s([
    "_",
    0,
    function (e, t, r, n) {
      if (!y(t, r, n))
        throw Error(
          "expected valid " + e + ": " + r + " <= n < " + n + ", got " + t,
        );
    },
    "e",
    0,
    function (e, t) {
      if ("boolean" != typeof t) throw Error(e + " boolean expected, got " + t);
    },
    "B",
    0,
    s,
    "y",
    0,
    function (e) {
      let n;
      for (n = 0; e > t; e >>= r, n += 1);
      return n;
    },
    "r",
    0,
    (e) => (r << BigInt(e)) - r,
    "v",
    0,
    u,
    "s",
    0,
    function (e) {
      return i(u(e));
    },
    "F",
    0,
    function (e) {
      return (s(e), i(u(Uint8Array.from(e).reverse())));
    },
    "t",
    0,
    f,
    "u",
    0,
    function (e, t, r) {
      if ("number" != typeof e || e < 2)
        throw Error("hashLen must be a number");
      if ("number" != typeof t || t < 2)
        throw Error("qByteLen must be a number");
      if ("function" != typeof r) throw Error("hmacFn must be a function");
      let n = m(e),
        s = m(e),
        i = 0,
        o = () => {
          (n.fill(1), s.fill(0), (i = 0));
        },
        a = (...e) => r(s, n, ...e),
        u = (e = m(0)) => {
          let t;
          if (
            ((s = a(((t = [0]), Uint8Array.from(t)), e)),
            (n = a()),
            0 !== e.length)
          ) {
            let t;
            ((s = a(((t = [1]), Uint8Array.from(t)), e)), (n = a()));
          }
        },
        l = () => {
          if (i++ >= 1e3) throw Error("drbg: tried 1000 values");
          let e = 0,
            r = [];
          for (; e < t; ) {
            let t = (n = a()).slice();
            (r.push(t), (e += n.length));
          }
          return f(...r);
        };
      return (e, t) => {
        let r;
        for (o(), u(e); !(r = t(l())); ) u();
        return (o(), r);
      };
    },
    "z",
    0,
    function (e, t, r) {
      let s;
      if ("string" == typeof t)
        try {
          s = c(t);
        } catch (t) {
          throw Error(e + " must be hex string or Uint8Array, cause: " + t);
        }
      else if (n(t)) s = Uint8Array.from(t);
      else throw Error(e + " must be hex string or Uint8Array");
      let i = s.length;
      if ("number" == typeof r && i !== r)
        throw Error(e + " of length " + r + " expected, got " + i);
      return s;
    },
    "w",
    0,
    function (e, t) {
      if (e.length !== t.length) return !1;
      let r = 0;
      for (let n = 0; n < e.length; n++) r |= e[n] ^ t[n];
      return 0 === r;
    },
    "X",
    0,
    c,
    "q",
    0,
    y,
    "g",
    0,
    n,
    "W",
    0,
    function (e) {
      let t = new WeakMap();
      return (r, ...n) => {
        let s = t.get(r);
        if (void 0 !== s) return s;
        let i = e(r, ...n);
        return (t.set(r, i), i);
      };
    },
    "m",
    0,
    p,
    "N",
    0,
    function (e, t) {
      return p(e, t).reverse();
    },
    "Z",
    0,
    function (e) {
      let t = e.toString(16);
      return 1 & t.length ? "0" + t : t;
    },
    "k",
    0,
    function (e) {
      if ("string" != typeof e) throw Error("string expected");
      return new Uint8Array(new TextEncoder().encode(e));
    },
    "Q",
    0,
    function (e, t, r = {}) {
      let n = (t, r, n) => {
        let s = h[r];
        if ("function" != typeof s) throw Error("invalid validator function");
        let i = e[t];
        if ((!n || void 0 !== i) && !s(i, e))
          throw Error(
            "param " + String(t) + " is invalid. Expected " + r + ", got " + i,
          );
      };
      for (let [e, r] of Object.entries(t)) n(e, r, !1);
      for (let [e, t] of Object.entries(r)) n(e, t, !0);
      return e;
    },
  ]);
};
