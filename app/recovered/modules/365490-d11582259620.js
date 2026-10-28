// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(t) => {
  var e = t.i(944445);
  let r = BigInt(0),
    n = BigInt(1);
  function i(t) {
    if ("string" != typeof t)
      throw Error("hex string expected, got " + typeof t);
    return "" === t ? r : BigInt("0x" + t);
  }
  function o(t) {
    return i((0, e.w)(t));
  }
  function l(t) {
    return ((0, e.C)(t), i((0, e.w)(Uint8Array.from(t).reverse())));
  }
  function s(t, r) {
    return (0, e.X)(t.toString(16).padStart(2 * r, "0"));
  }
  function u(t, e) {
    return s(t, e).reverse();
  }
  let a = (t) => "bigint" == typeof t && r <= t;
  function f(t, e, r) {
    return a(t) && a(e) && a(r) && e <= t && t < r;
  }
  function d(t) {
    let e;
    for (e = 0; t > r; t >>= n, e += 1);
    return e;
  }
  let c = (t) => (n << BigInt(t)) - n;
  function h(t, e, r = {}) {
    if (!t || "object" != typeof t)
      throw Error("expected valid options object");
    function n(e, r, n) {
      let i = t[e];
      if (n && void 0 === i) return;
      let o = typeof i;
      if (o !== r || null === i)
        throw Error(`param "${e}" is invalid: expected ${r}, got ${o}`);
    }
    (Object.entries(e).forEach(([t, e]) => n(t, e, !1)),
      Object.entries(r).forEach(([t, e]) => n(t, e, !0)));
  }
  t.s(
    [
      "Y",
      0,
      function (t, e = "") {
        if ("boolean" != typeof t)
          throw Error(
            (e && `"${e}"`) + "expected boolean, got type=" + typeof t,
          );
        return t;
      },
      "G",
      0,
      function (t, r, n = "") {
        let i = (0, e.g)(t),
          o = t?.length,
          l = void 0 !== r;
        if (!i || (l && o !== r))
          throw Error(
            (n && `"${n}" `) +
              "expected Uint8Array" +
              (l ? ` of length ${r}` : "") +
              ", got " +
              (i ? `length=${o}` : `type=${typeof t}`),
          );
        return t;
      },
      "S",
      0,
      h,
      "_",
      0,
      function (t, e, r, n) {
        if (!f(e, r, n))
          throw Error(
            "expected valid " + t + ": " + r + " <= n < " + n + ", got " + e,
          );
      },
      "y",
      0,
      d,
      "r",
      0,
      c,
      "s",
      0,
      o,
      "F",
      0,
      l,
      "t",
      0,
      function (t) {
        return Uint8Array.from(t);
      },
      "u",
      0,
      function (t, r, n) {
        if ("number" != typeof t || t < 2)
          throw Error("hashLen must be a number");
        if ("number" != typeof r || r < 2)
          throw Error("qByteLen must be a number");
        if ("function" != typeof n) throw Error("hmacFn must be a function");
        let i = (t) => new Uint8Array(t),
          o = i(t),
          l = i(t),
          s = 0,
          u = () => {
            (o.fill(1), l.fill(0), (s = 0));
          },
          a = (...t) => n(l, o, ...t),
          f = (t = i(0)) => {
            ((l = a(Uint8Array.of(0), t)),
              (o = a()),
              0 !== t.length && ((l = a(Uint8Array.of(1), t)), (o = a())));
          },
          d = () => {
            if (s++ >= 1e3) throw Error("drbg: tried 1000 values");
            let t = 0,
              n = [];
            for (; t < r; ) {
              let e = (o = a()).slice();
              (n.push(e), (t += o.length));
            }
            return (0, e.t)(...n);
          };
        return (t, e) => {
          let r;
          for (u(), f(t); !(r = e(d())); ) f();
          return (u(), r);
        };
      },
      "z",
      0,
      function (t, r, n) {
        let i;
        if ("string" == typeof r)
          try {
            i = (0, e.X)(r);
          } catch (e) {
            throw Error(t + " must be hex string or Uint8Array, cause: " + e);
          }
        else if ((0, e.g)(r)) i = Uint8Array.from(r);
        else throw Error(t + " must be hex string or Uint8Array");
        let o = i.length;
        if ("number" == typeof n && o !== n)
          throw Error(t + " of length " + n + " expected, got " + o);
        return i;
      },
      "v",
      0,
      function (t, e) {
        if (t.length !== e.length) return !1;
        let r = 0;
        for (let n = 0; n < t.length; n++) r |= t[n] ^ e[n];
        return 0 === r;
      },
      "q",
      0,
      f,
      "N",
      0,
      function (t) {
        return "function" == typeof t && Number.isSafeInteger(t.outputLen);
      },
      "W",
      0,
      function (t) {
        let e = new WeakMap();
        return (r, ...n) => {
          let i = e.get(r);
          if (void 0 !== i) return i;
          let o = t(r, ...n);
          return (e.set(r, o), o);
        };
      },
      "U",
      0,
      () => {
        throw Error("not implemented");
      },
      "m",
      0,
      s,
      "O",
      0,
      u,
      "Z",
      0,
      function (t) {
        let e = t.toString(16);
        return 1 & e.length ? "0" + e : e;
      },
    ],
    878660,
  );
  let m = BigInt(0),
    p = BigInt(1),
    g = BigInt(2),
    y = BigInt(3),
    w = BigInt(4),
    E = BigInt(5),
    b = BigInt(7),
    v = BigInt(8),
    B = BigInt(9),
    O = BigInt(16);
  function R(t, e) {
    let r = t % e;
    return r >= m ? r : e + r;
  }
  function S(t, e) {
    if (t === m) throw Error("invert: expected non-zero number");
    if (e <= m) throw Error("invert: expected positive modulus, got " + e);
    let r = R(t, e),
      n = e,
      i = m,
      o = p,
      l = p,
      s = m;
    for (; r !== m; ) {
      let t = n / r,
        e = n % r,
        u = i - l * t,
        a = o - s * t;
      ((n = r), (r = e), (i = l), (o = s), (l = u), (s = a));
    }
    if (n !== p) throw Error("invert: does not exist");
    return R(i, e);
  }
  function x(t, e, r) {
    if (!t.eql(t.sqr(e), r)) throw Error("Cannot find square root");
  }
  function A(t, e) {
    let r = (t.ORDER + p) / w,
      n = t.pow(e, r);
    return (x(t, n, e), n);
  }
  function q(t, e) {
    let r = (t.ORDER - E) / v,
      n = t.mul(e, g),
      i = t.pow(n, r),
      o = t.mul(e, i),
      l = t.mul(t.mul(o, g), i),
      s = t.mul(o, t.sub(l, t.ONE));
    return (x(t, s, e), s);
  }
  function N(t) {
    if (t < y) throw Error("sqrt is not defined for small field");
    let e = t - p,
      r = 0;
    for (; e % g === m; ) ((e /= g), r++);
    let n = g,
      i = T(t);
    for (; 1 === U(i, n); )
      if (n++ > 1e3)
        throw Error("Cannot find square root: probably non-prime P");
    if (1 === r) return A;
    let o = i.pow(n, e),
      l = (e + p) / g;
    return function (t, n) {
      if (t.is0(n)) return n;
      if (1 !== U(t, n)) throw Error("Cannot find square root");
      let i = r,
        s = t.mul(t.ONE, o),
        u = t.pow(n, e),
        a = t.pow(n, l);
      for (; !t.eql(u, t.ONE); ) {
        if (t.is0(u)) return t.ZERO;
        let e = 1,
          r = t.sqr(u);
        for (; !t.eql(r, t.ONE); )
          if ((e++, (r = t.sqr(r)), e === i))
            throw Error("Cannot find square root");
        let n = p << BigInt(i - e - 1),
          o = t.pow(s, n);
        ((i = e), (s = t.sqr(o)), (u = t.mul(u, s)), (a = t.mul(a, o)));
      }
      return a;
    };
  }
  let Z = [
    "create",
    "isValid",
    "is0",
    "neg",
    "inv",
    "sqrt",
    "sqr",
    "eql",
    "add",
    "sub",
    "mul",
    "pow",
    "div",
    "addN",
    "subN",
    "mulN",
    "sqrN",
  ];
  function I(t) {
    return (
      h(
        t,
        Z.reduce((t, e) => ((t[e] = "function"), t), {
          ORDER: "bigint",
          MASK: "bigint",
          BYTES: "number",
          BITS: "number",
        }),
      ),
      t
    );
  }
  function F(t, e, r = !1) {
    let n = Array(e.length).fill(r ? t.ZERO : void 0),
      i = e.reduce(
        (e, r, i) => (t.is0(r) ? e : ((n[i] = e), t.mul(e, r))),
        t.ONE,
      ),
      o = t.inv(i);
    return (
      e.reduceRight(
        (e, r, i) => (t.is0(r) ? e : ((n[i] = t.mul(e, n[i])), t.mul(e, r))),
        o,
      ),
      n
    );
  }
  function U(t, e) {
    let r = (t.ORDER - p) / g,
      n = t.pow(e, r),
      i = t.eql(n, t.ONE),
      o = t.eql(n, t.ZERO),
      l = t.eql(n, t.neg(t.ONE));
    if (!i && !o && !l) throw Error("invalid Legendre symbol result");
    return i ? 1 : o ? 0 : -1;
  }
  function V(t, r) {
    void 0 !== r && (0, e.N)(r);
    let n = void 0 !== r ? r : t.toString(2).length,
      i = Math.ceil(n / 8);
    return { nBitLength: n, nByteLength: i };
  }
  function T(t, e, r = !1, n = {}) {
    let i, a, f, d;
    if (t <= m) throw Error("invalid field: expected ORDER > 0, got " + t);
    let h = !1;
    if ("object" == typeof e && null != e) {
      if (n.sqrt || r) throw Error("cannot specify opts in two arguments");
      (e.BITS && (a = e.BITS),
        e.sqrt && (f = e.sqrt),
        "boolean" == typeof e.isLE && (r = e.isLE),
        "boolean" == typeof e.modFromBytes && (h = e.modFromBytes),
        (d = e.allowedLengths));
    } else ("number" == typeof e && (a = e), n.sqrt && (f = n.sqrt));
    let { nBitLength: g, nByteLength: Z } = V(t, a);
    if (Z > 2048) throw Error("invalid field: expected ORDER of <= 2048 bytes");
    let I = Object.freeze({
      ORDER: t,
      isLE: r,
      BITS: g,
      BYTES: Z,
      MASK: c(g),
      ZERO: m,
      ONE: p,
      allowedLengths: d,
      create: (e) => R(e, t),
      isValid: (e) => {
        if ("bigint" != typeof e)
          throw Error(
            "invalid field element: expected bigint, got " + typeof e,
          );
        return m <= e && e < t;
      },
      is0: (t) => t === m,
      isValidNot0: (t) => !I.is0(t) && I.isValid(t),
      isOdd: (t) => (t & p) === p,
      neg: (e) => R(-e, t),
      eql: (t, e) => t === e,
      sqr: (e) => R(e * e, t),
      add: (e, r) => R(e + r, t),
      sub: (e, r) => R(e - r, t),
      mul: (e, r) => R(e * r, t),
      pow: (t, e) =>
        (function (t, e, r) {
          if (r < m) throw Error("invalid exponent, negatives unsupported");
          if (r === m) return t.ONE;
          if (r === p) return e;
          let n = t.ONE,
            i = e;
          for (; r > m; )
            (r & p && (n = t.mul(n, i)), (i = t.sqr(i)), (r >>= p));
          return n;
        })(I, t, e),
      div: (e, r) => R(e * S(r, t), t),
      sqrN: (t) => t * t,
      addN: (t, e) => t + e,
      subN: (t, e) => t - e,
      mulN: (t, e) => t * e,
      inv: (e) => S(e, t),
      sqrt:
        f ||
        ((e) => (
          i ||
            (i = (function (t) {
              if (t % w === y) return A;
              if (t % v === E) return q;
              if (t % O === B) {
                let e, r, n, i, o, l;
                return (
                  (e = T(t)),
                  (n = (r = N(t))(e, e.neg(e.ONE))),
                  (i = r(e, n)),
                  (o = r(e, e.neg(n))),
                  (l = (t + b) / O),
                  (t, e) => {
                    let r = t.pow(e, l),
                      s = t.mul(r, n),
                      u = t.mul(r, i),
                      a = t.mul(r, o),
                      f = t.eql(t.sqr(s), e),
                      d = t.eql(t.sqr(u), e);
                    ((r = t.cmov(r, s, f)), (s = t.cmov(a, u, d)));
                    let c = t.eql(t.sqr(s), e),
                      h = t.cmov(r, s, c);
                    return (x(t, h, e), h);
                  }
                );
              }
              return N(t);
            })(t)),
          i(I, e)
        )),
      toBytes: (t) => (r ? u(t, Z) : s(t, Z)),
      fromBytes: (e, n = !0) => {
        if (d) {
          if (!d.includes(e.length) || e.length > Z)
            throw Error(
              "Field.fromBytes: expected " + d + " bytes, got " + e.length,
            );
          let t = new Uint8Array(Z);
          (t.set(e, r ? 0 : t.length - e.length), (e = t));
        }
        if (e.length !== Z)
          throw Error(
            "Field.fromBytes: expected " + Z + " bytes, got " + e.length,
          );
        let i = r ? l(e) : o(e);
        if ((h && (i = R(i, t)), !n && !I.isValid(i)))
          throw Error("invalid field element: outside of range 0..ORDER");
        return i;
      },
      invertBatch: (t) => F(I, t),
      cmov: (t, e, r) => (r ? e : t),
    });
    return Object.freeze(I);
  }
  function C(t) {
    if ("bigint" != typeof t) throw Error("field order must be bigint");
    return Math.ceil(t.toString(2).length / 8);
  }
  function P(t) {
    let e = C(t);
    return e + Math.ceil(e / 2);
  }
  t.s(
    [
      "N",
      0,
      T,
      "R",
      0,
      F,
      "s",
      0,
      function (t, e) {
        if (!t.isOdd) throw Error("Field doesn't have isOdd");
        let r = t.sqrt(e);
        return t.isOdd(r) ? t.neg(r) : r;
      },
      "M",
      0,
      P,
      "f",
      0,
      (t, e) => (R(t, e) & p) === p,
      "y",
      0,
      function (t, e, r = !1) {
        let n = t.length,
          i = C(e),
          a = P(e);
        if (n < 16 || n < a || n > 1024)
          throw Error("expected " + a + "-1024 bytes of input, got " + n);
        let f = R(r ? l(t) : o(t), e - p) + p;
        return r ? u(f, i) : s(f, i);
      },
      "K",
      0,
      R,
      "v",
      0,
      V,
      "m",
      0,
      function (t, e, r) {
        let n = t;
        for (; e-- > m; ) ((n *= n), (n %= r));
        return n;
      },
      "P",
      0,
      I,
    ],
    288667,
  );
  let z = BigInt(0),
    D = BigInt(1);
  function j(t, e) {
    let r = e.negate();
    return t ? r : e;
  }
  function K(t, e) {
    if (!Number.isSafeInteger(t) || t <= 0 || t > e)
      throw Error("invalid window size, expected [1.." + e + "], got W=" + t);
  }
  function Y(t, e) {
    K(t, e);
    let r = Math.ceil(e / t) + 1,
      n = 2 ** (t - 1),
      i = 2 ** t;
    return {
      windows: r,
      windowSize: n,
      mask: c(t),
      maxNumber: i,
      shiftBy: BigInt(t),
    };
  }
  function L(t, e, r) {
    let { windowSize: n, mask: i, maxNumber: o, shiftBy: l } = r,
      s = Number(t & i),
      u = t >> l;
    s > n && ((s -= o), (u += D));
    let a = e * n,
      f = a + Math.abs(s) - 1,
      d = 0 === s;
    return {
      nextN: u,
      offset: f,
      isZero: d,
      isNeg: s < 0,
      isNegF: e % 2 != 0,
      offsetF: a,
    };
  }
  let k = new WeakMap(),
    _ = new WeakMap();
  function $(t) {
    return _.get(t) || 1;
  }
  function M(t) {
    if (t !== z) throw Error("invalid wNAF");
  }
  function G(t, e, r) {
    if (!e) return T(t, { isLE: r });
    if (e.ORDER !== t)
      throw Error("Field.ORDER must match order: Fp == p, Fn == n");
    return (I(e), e);
  }
  t.s(
    [
      "o",
      0,
      function (t, e, r = {}, n) {
        if ((void 0 === n && (n = "edwards" === t), !e || "object" != typeof e))
          throw Error(`expected valid ${t} CURVE object`);
        for (let t of ["p", "n", "h"]) {
          let r = e[t];
          if (!("bigint" == typeof r && r > z))
            throw Error(`CURVE.${t} must be positive bigint`);
        }
        let i = G(e.p, r.Fp, n),
          o = G(e.n, r.Fn, n);
        for (let r of ["Gx", "Gy", "a", "weierstrass" === t ? "b" : "d"])
          if (!i.isValid(e[r]))
            throw Error(`CURVE.${r} must be valid field element of CURVE.Fp`);
        return {
          CURVE: (e = Object.freeze(Object.assign({}, e))),
          Fp: i,
          Fn: o,
        };
      },
      "c",
      0,
      function (t, e, r, n) {
        let i = e,
          o = t.ZERO,
          l = t.ZERO;
        for (; r > z || n > z; )
          (r & D && (o = o.add(i)),
            n & D && (l = l.add(i)),
            (i = i.double()),
            (r >>= D),
            (n >>= D));
        return { p1: o, p2: l };
      },
      "d",
      0,
      j,
      "s",
      0,
      function (t, e) {
        let r = F(
          t.Fp,
          e.map((t) => t.Z),
        );
        return e.map((e, n) => t.fromAffine(e.toAffine(r[n])));
      },
      "g",
      0,
      function (t, e, r, n) {
        if (!Array.isArray(r)) throw Error("array expected");
        r.forEach((e, r) => {
          if (!(e instanceof t)) throw Error("invalid point at index " + r);
        });
        if (!Array.isArray(n)) throw Error("array of scalars expected");
        n.forEach((t, r) => {
          if (!e.isValid(t)) throw Error("invalid scalar at index " + r);
        });
        let i = r.length,
          o = n.length;
        if (i !== o)
          throw Error("arrays of points and scalars must have equal length");
        let l = t.ZERO,
          s = d(BigInt(i)),
          u = 1;
        s > 12 ? (u = s - 3) : s > 4 ? (u = s - 2) : s > 0 && (u = 2);
        let a = c(u),
          f = Array(Number(a) + 1).fill(l),
          h = Math.floor((e.BITS - 1) / u) * u,
          m = l;
        for (let t = h; t >= 0; t -= u) {
          f.fill(l);
          for (let e = 0; e < o; e++) {
            let i = Number((n[e] >> BigInt(t)) & a);
            f[i] = f[i].add(r[e]);
          }
          let e = l;
          for (let t = f.length - 1, r = l; t > 0; t--)
            ((r = r.add(f[t])), (e = e.add(r)));
          if (((m = m.add(e)), 0 !== t))
            for (let t = 0; t < u; t++) m = m.double();
        }
        return m;
      },
      "p",
      0,
      class {
        constructor(t, e) {
          ((this.BASE = t.BASE),
            (this.ZERO = t.ZERO),
            (this.Fn = t.Fn),
            (this.bits = e));
        }
        _unsafeLadder(t, e, r = this.ZERO) {
          let n = t;
          for (; e > z; )
            (e & D && (r = r.add(n)), (n = n.double()), (e >>= D));
          return r;
        }
        precomputeWindow(t, e) {
          let { windows: r, windowSize: n } = Y(e, this.bits),
            i = [],
            o = t,
            l = o;
          for (let t = 0; t < r; t++) {
            ((l = o), i.push(l));
            for (let t = 1; t < n; t++) ((l = l.add(o)), i.push(l));
            o = l.double();
          }
          return i;
        }
        wNAF(t, e, r) {
          if (!this.Fn.isValid(r)) throw Error("invalid scalar");
          let n = this.ZERO,
            i = this.BASE,
            o = Y(t, this.bits);
          for (let t = 0; t < o.windows; t++) {
            let {
              nextN: l,
              offset: s,
              isZero: u,
              isNeg: a,
              isNegF: f,
              offsetF: d,
            } = L(r, t, o);
            ((r = l), u ? (i = i.add(j(f, e[d]))) : (n = n.add(j(a, e[s]))));
          }
          return (M(r), { p: n, f: i });
        }
        wNAFUnsafe(t, e, r, n = this.ZERO) {
          let i = Y(t, this.bits);
          for (let t = 0; t < i.windows && r !== z; t++) {
            let { nextN: o, offset: l, isZero: s, isNeg: u } = L(r, t, i);
            if (((r = o), !s)) {
              let t = e[l];
              n = n.add(u ? t.negate() : t);
            }
          }
          return (M(r), n);
        }
        getPrecomputes(t, e, r) {
          let n = k.get(e);
          return (
            n ||
              ((n = this.precomputeWindow(e, t)),
              1 !== t && ("function" == typeof r && (n = r(n)), k.set(e, n))),
            n
          );
        }
        cached(t, e, r) {
          let n = $(t);
          return this.wNAF(n, this.getPrecomputes(n, t, r), e);
        }
        unsafe(t, e, r, n) {
          let i = $(t);
          return 1 === i
            ? this._unsafeLadder(t, e, n)
            : this.wNAFUnsafe(i, this.getPrecomputes(i, t, r), e, n);
        }
        createCache(t, e) {
          (K(e, this.bits), _.set(t, e), k.delete(t));
        }
        hasCache(t) {
          return 1 !== $(t);
        }
      },
    ],
    365490,
  );
};
