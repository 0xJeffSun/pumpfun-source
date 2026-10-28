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
  function i(e) {
    if (!n(e)) throw Error("Uint8Array expected");
  }
  function s(e) {
    if ("string" != typeof e)
      throw Error("hex string expected, got " + typeof e);
    return "" === e ? t : BigInt("0x" + e);
  }
  let a =
      "function" == typeof Uint8Array.from([]).toHex &&
      "function" == typeof Uint8Array.fromHex,
    o = Array.from({ length: 256 }, (e, t) => t.toString(16).padStart(2, "0"));
  function u(e) {
    if ((i(e), a)) return e.toHex();
    let t = "";
    for (let r = 0; r < e.length; r++) t += o[e[r]];
    return t;
  }
  function c(e) {
    return e >= 48 && e <= 57
      ? e - 48
      : e >= 65 && e <= 70
        ? e - 55
        : e >= 97 && e <= 102
          ? e - 87
          : void 0;
  }
  function l(e) {
    if ("string" != typeof e)
      throw Error("hex string expected, got " + typeof e);
    if (a) return Uint8Array.fromHex(e);
    let t = e.length,
      r = t / 2;
    if (t % 2)
      throw Error("hex string expected, got unpadded hex of length " + t);
    let n = new Uint8Array(r);
    for (let t = 0, i = 0; t < r; t++, i += 2) {
      let r = c(e.charCodeAt(i)),
        s = c(e.charCodeAt(i + 1));
      if (void 0 === r || void 0 === s)
        throw Error(
          'hex string expected, got non-hex character "' +
            (e[i] + e[i + 1]) +
            '" at index ' +
            i,
        );
      n[t] = 16 * r + s;
    }
    return n;
  }
  function f(e, t) {
    return l(e.toString(16).padStart(2 * t, "0"));
  }
  function d(...e) {
    let t = 0;
    for (let r = 0; r < e.length; r++) {
      let n = e[r];
      (i(n), (t += n.length));
    }
    let r = new Uint8Array(t);
    for (let t = 0, n = 0; t < e.length; t++) {
      let i = e[t];
      (r.set(i, n), (n += i.length));
    }
    return r;
  }
  let h = (e) => "bigint" == typeof e && t <= e;
  function p(e, t, r) {
    return h(e) && h(t) && h(r) && t <= e && e < r;
  }
  let b = (e) => new Uint8Array(e),
    y = {
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
      if (!p(t, r, n))
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
    i,
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
      return s(u(e));
    },
    "F",
    0,
    function (e) {
      return (i(e), s(u(Uint8Array.from(e).reverse())));
    },
    "t",
    0,
    d,
    "u",
    0,
    function (e, t, r) {
      if ("number" != typeof e || e < 2)
        throw Error("hashLen must be a number");
      if ("number" != typeof t || t < 2)
        throw Error("qByteLen must be a number");
      if ("function" != typeof r) throw Error("hmacFn must be a function");
      let n = b(e),
        i = b(e),
        s = 0,
        a = () => {
          (n.fill(1), i.fill(0), (s = 0));
        },
        o = (...e) => r(i, n, ...e),
        u = (e = b(0)) => {
          let t;
          if (
            ((i = o(((t = [0]), Uint8Array.from(t)), e)),
            (n = o()),
            0 !== e.length)
          ) {
            let t;
            ((i = o(((t = [1]), Uint8Array.from(t)), e)), (n = o()));
          }
        },
        c = () => {
          if (s++ >= 1e3) throw Error("drbg: tried 1000 values");
          let e = 0,
            r = [];
          for (; e < t; ) {
            let t = (n = o()).slice();
            (r.push(t), (e += n.length));
          }
          return d(...r);
        };
      return (e, t) => {
        let r;
        for (a(), u(e); !(r = t(c())); ) u();
        return (a(), r);
      };
    },
    "z",
    0,
    function (e, t, r) {
      let i;
      if ("string" == typeof t)
        try {
          i = l(t);
        } catch (t) {
          throw Error(e + " must be hex string or Uint8Array, cause: " + t);
        }
      else if (n(t)) i = Uint8Array.from(t);
      else throw Error(e + " must be hex string or Uint8Array");
      let s = i.length;
      if ("number" == typeof r && s !== r)
        throw Error(e + " of length " + r + " expected, got " + s);
      return i;
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
    l,
    "q",
    0,
    p,
    "g",
    0,
    n,
    "W",
    0,
    function (e) {
      let t = new WeakMap();
      return (r, ...n) => {
        let i = t.get(r);
        if (void 0 !== i) return i;
        let s = e(r, ...n);
        return (t.set(r, s), s);
      };
    },
    "m",
    0,
    f,
    "N",
    0,
    function (e, t) {
      return f(e, t).reverse();
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
        let i = y[r];
        if ("function" != typeof i) throw Error("invalid validator function");
        let s = e[t];
        if ((!n || void 0 !== s) && !i(s, e))
          throw Error(
            "param " + String(t) + " is invalid. Expected " + r + ", got " + s,
          );
      };
      for (let [e, r] of Object.entries(t)) n(e, r, !1);
      for (let [e, t] of Object.entries(r)) n(e, t, !0);
      return e;
    },
  ]);
};
