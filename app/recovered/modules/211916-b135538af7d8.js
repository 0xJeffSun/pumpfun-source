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
  function o(e) {
    if ("string" != typeof e)
      throw Error("hex string expected, got " + typeof e);
    return "" === e ? t : BigInt("0x" + e);
  }
  let f =
      "function" == typeof Uint8Array.from([]).toHex &&
      "function" == typeof Uint8Array.fromHex,
    l = Array.from({ length: 256 }, (e, t) => t.toString(16).padStart(2, "0"));
  function a(e) {
    if ((i(e), f)) return e.toHex();
    let t = "";
    for (let r = 0; r < e.length; r++) t += l[e[r]];
    return t;
  }
  function u(e) {
    return e >= 48 && e <= 57
      ? e - 48
      : e >= 65 && e <= 70
        ? e - 55
        : e >= 97 && e <= 102
          ? e - 87
          : void 0;
  }
  function s(e) {
    if ("string" != typeof e)
      throw Error("hex string expected, got " + typeof e);
    if (f) return Uint8Array.fromHex(e);
    let t = e.length,
      r = t / 2;
    if (t % 2)
      throw Error("hex string expected, got unpadded hex of length " + t);
    let n = new Uint8Array(r);
    for (let t = 0, i = 0; t < r; t++, i += 2) {
      let r = u(e.charCodeAt(i)),
        o = u(e.charCodeAt(i + 1));
      if (void 0 === r || void 0 === o)
        throw Error(
          'hex string expected, got non-hex character "' +
            (e[i] + e[i + 1]) +
            '" at index ' +
            i,
        );
      n[t] = 16 * r + o;
    }
    return n;
  }
  function d(e, t) {
    return s(e.toString(16).padStart(2 * t, "0"));
  }
  function c(...e) {
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
  function g(e, t, r) {
    return h(e) && h(t) && h(r) && t <= e && e < r;
  }
  let m = (e) => new Uint8Array(e),
    p = {
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
      if (!g(t, r, n))
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
    a,
    "s",
    0,
    function (e) {
      return o(a(e));
    },
    "F",
    0,
    function (e) {
      return (i(e), o(a(Uint8Array.from(e).reverse())));
    },
    "t",
    0,
    c,
    "u",
    0,
    function (e, t, r) {
      if ("number" != typeof e || e < 2)
        throw Error("hashLen must be a number");
      if ("number" != typeof t || t < 2)
        throw Error("qByteLen must be a number");
      if ("function" != typeof r) throw Error("hmacFn must be a function");
      let n = m(e),
        i = m(e),
        o = 0,
        f = () => {
          (n.fill(1), i.fill(0), (o = 0));
        },
        l = (...e) => r(i, n, ...e),
        a = (e = m(0)) => {
          let t;
          if (
            ((i = l(((t = [0]), Uint8Array.from(t)), e)),
            (n = l()),
            0 !== e.length)
          ) {
            let t;
            ((i = l(((t = [1]), Uint8Array.from(t)), e)), (n = l()));
          }
        },
        u = () => {
          if (o++ >= 1e3) throw Error("drbg: tried 1000 values");
          let e = 0,
            r = [];
          for (; e < t; ) {
            let t = (n = l()).slice();
            (r.push(t), (e += n.length));
          }
          return c(...r);
        };
      return (e, t) => {
        let r;
        for (f(), a(e); !(r = t(u())); ) a();
        return (f(), r);
      };
    },
    "z",
    0,
    function (e, t, r) {
      let i;
      if ("string" == typeof t)
        try {
          i = s(t);
        } catch (t) {
          throw Error(e + " must be hex string or Uint8Array, cause: " + t);
        }
      else if (n(t)) i = Uint8Array.from(t);
      else throw Error(e + " must be hex string or Uint8Array");
      let o = i.length;
      if ("number" == typeof r && o !== r)
        throw Error(e + " of length " + r + " expected, got " + o);
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
    s,
    "q",
    0,
    g,
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
        let o = e(r, ...n);
        return (t.set(r, o), o);
      };
    },
    "m",
    0,
    d,
    "N",
    0,
    function (e, t) {
      return d(e, t).reverse();
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
        let i = p[r];
        if ("function" != typeof i) throw Error("invalid validator function");
        let o = e[t];
        if ((!n || void 0 !== o) && !i(o, e))
          throw Error(
            "param " + String(t) + " is invalid. Expected " + r + ", got " + o,
          );
      };
      for (let [e, r] of Object.entries(t)) n(e, r, !1);
      for (let [e, t] of Object.entries(r)) n(e, t, !0);
      return e;
    },
  ]);
};
