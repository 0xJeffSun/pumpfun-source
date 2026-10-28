// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  "use strict";
  var t = e.i(837474),
    r = e.i(944445),
    n = e.i(417896),
    i = e.i(211916);
  let o = BigInt(0),
    f = BigInt(1),
    l = BigInt(2),
    a = BigInt(3),
    d = BigInt(4),
    s = BigInt(5),
    u = BigInt(8);
  function c(e, t) {
    let r = e % t;
    return r >= o ? r : t + r;
  }
  function h(e, t, r) {
    let n = e;
    for (; t-- > o; ) ((n *= n), (n %= r));
    return n;
  }
  function m(e, t) {
    if (e === o) throw Error("invert: expected non-zero number");
    if (t <= o) throw Error("invert: expected positive modulus, got " + t);
    let r = c(e, t),
      n = t,
      i = o,
      l = f,
      a = f,
      d = o;
    for (; r !== o; ) {
      let e = n / r,
        t = n % r,
        o = i - a * e,
        f = l - d * e;
      ((n = r), (r = t), (i = a), (l = d), (a = o), (d = f));
    }
    if (n !== f) throw Error("invert: does not exist");
    return c(i, t);
  }
  function p(e, t) {
    let r = (e.ORDER + f) / d,
      n = e.pow(t, r);
    if (!e.eql(e.sqr(n), t)) throw Error("Cannot find square root");
    return n;
  }
  function g(e, t) {
    let r = (e.ORDER - s) / u,
      n = e.mul(t, l),
      i = e.pow(n, r),
      o = e.mul(t, i),
      f = e.mul(e.mul(o, l), i),
      a = e.mul(o, e.sub(f, e.ONE));
    if (!e.eql(e.sqr(a), t)) throw Error("Cannot find square root");
    return a;
  }
  let w = [
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
  function y(e) {
    let t = w.reduce((e, t) => ((e[t] = "function"), e), {
      ORDER: "bigint",
      MASK: "bigint",
      BYTES: "isSafeInteger",
      BITS: "isSafeInteger",
    });
    return (0, i.Q)(e, t);
  }
  function E(e, t, r = !1) {
    let n = Array(t.length).fill(r ? e.ZERO : void 0),
      i = t.reduce(
        (t, r, i) => (e.is0(r) ? t : ((n[i] = t), e.mul(t, r))),
        e.ONE,
      ),
      o = e.inv(i);
    return (
      t.reduceRight(
        (t, r, i) => (e.is0(r) ? t : ((n[i] = e.mul(t, n[i])), e.mul(t, r))),
        o,
      ),
      n
    );
  }
  function b(e, t) {
    let r = (e.ORDER - f) / l,
      n = e.pow(t, r),
      i = e.eql(n, e.ONE),
      o = e.eql(n, e.ZERO),
      a = e.eql(n, e.neg(e.ONE));
    if (!i && !o && !a) throw Error("invalid Legendre symbol result");
    return i ? 1 : o ? 0 : -1;
  }
  function v(e, t) {
    void 0 !== t && (0, r.N)(t);
    let n = void 0 !== t ? t : e.toString(2).length,
      i = Math.ceil(n / 8);
    return { nBitLength: n, nByteLength: i };
  }
  function B(e, t, r = !1, n = {}) {
    let h;
    if (e <= o) throw Error("invalid field: expected ORDER > 0, got " + e);
    let { nBitLength: w, nByteLength: y } = v(e, t);
    if (y > 2048) throw Error("invalid field: expected ORDER of <= 2048 bytes");
    let x = Object.freeze({
      ORDER: e,
      isLE: r,
      BITS: w,
      BYTES: y,
      MASK: (0, i.r)(w),
      ZERO: o,
      ONE: f,
      create: (t) => c(t, e),
      isValid: (t) => {
        if ("bigint" != typeof t)
          throw Error(
            "invalid field element: expected bigint, got " + typeof t,
          );
        return o <= t && t < e;
      },
      is0: (e) => e === o,
      isOdd: (e) => (e & f) === f,
      neg: (t) => c(-t, e),
      eql: (e, t) => e === t,
      sqr: (t) => c(t * t, e),
      add: (t, r) => c(t + r, e),
      sub: (t, r) => c(t - r, e),
      mul: (t, r) => c(t * r, e),
      pow: (e, t) =>
        (function (e, t, r) {
          if (r < o) throw Error("invalid exponent, negatives unsupported");
          if (r === o) return e.ONE;
          if (r === f) return t;
          let n = e.ONE,
            i = t;
          for (; r > o; )
            (r & f && (n = e.mul(n, i)), (i = e.sqr(i)), (r >>= f));
          return n;
        })(x, e, t),
      div: (t, r) => c(t * m(r, e), e),
      sqrN: (e) => e * e,
      addN: (e, t) => e + t,
      subN: (e, t) => e - t,
      mulN: (e, t) => e * t,
      inv: (t) => m(t, e),
      sqrt:
        n.sqrt ||
        ((t) => (
          h ||
            (h =
              e % d === a
                ? p
                : e % u === s
                  ? g
                  : (function (e) {
                      if (e < BigInt(3))
                        throw Error("sqrt is not defined for small field");
                      let t = e - f,
                        r = 0;
                      for (; t % l === o; ) ((t /= l), r++);
                      let n = l,
                        i = B(e);
                      for (; 1 === b(i, n); )
                        if (n++ > 1e3)
                          throw Error(
                            "Cannot find square root: probably non-prime P",
                          );
                      if (1 === r) return p;
                      let a = i.pow(n, t),
                        d = (t + f) / l;
                      return function (e, n) {
                        if (e.is0(n)) return n;
                        if (1 !== b(e, n))
                          throw Error("Cannot find square root");
                        let i = r,
                          o = e.mul(e.ONE, a),
                          l = e.pow(n, t),
                          s = e.pow(n, d);
                        for (; !e.eql(l, e.ONE); ) {
                          if (e.is0(l)) return e.ZERO;
                          let t = 1,
                            r = e.sqr(l);
                          for (; !e.eql(r, e.ONE); )
                            if ((t++, (r = e.sqr(r)), t === i))
                              throw Error("Cannot find square root");
                          let n = f << BigInt(i - t - 1),
                            a = e.pow(o, n);
                          ((i = t),
                            (o = e.sqr(a)),
                            (l = e.mul(l, o)),
                            (s = e.mul(s, a)));
                        }
                        return s;
                      };
                    })(e)),
          h(x, t)
        )),
      toBytes: (e) => (r ? (0, i.N)(e, y) : (0, i.m)(e, y)),
      fromBytes: (e) => {
        if (e.length !== y)
          throw Error(
            "Field.fromBytes: expected " + y + " bytes, got " + e.length,
          );
        return r ? (0, i.F)(e) : (0, i.s)(e);
      },
      invertBatch: (e) => E(x, e),
      cmov: (e, t, r) => (r ? t : e),
    });
    return Object.freeze(x);
  }
  function x(e) {
    if ("bigint" != typeof e) throw Error("field order must be bigint");
    return Math.ceil(e.toString(2).length / 8);
  }
  function S(e) {
    let t = x(e);
    return t + Math.ceil(t / 2);
  }
  function O(e, t, r = !1) {
    let n = e.length,
      o = x(t),
      l = S(t);
    if (n < 16 || n < l || n > 1024)
      throw Error("expected " + l + "-1024 bytes of input, got " + n);
    let a = c(r ? (0, i.F)(e) : (0, i.s)(e), t - f) + f;
    return r ? (0, i.N)(a, o) : (0, i.m)(a, o);
  }
  e.s(
    [
      "N",
      0,
      B,
      "R",
      0,
      E,
      "M",
      0,
      S,
      "i",
      0,
      m,
      "y",
      0,
      O,
      "K",
      0,
      c,
      "v",
      0,
      v,
      "m",
      0,
      h,
      "P",
      0,
      y,
    ],
    789694,
  );
  let R = BigInt(0),
    A = BigInt(1);
  function q(e, t) {
    let r = t.negate();
    return e ? r : t;
  }
  function I(e, t) {
    if (!Number.isSafeInteger(e) || e <= 0 || e > t)
      throw Error("invalid window size, expected [1.." + t + "], got W=" + e);
  }
  function N(e, t) {
    I(e, t);
    let r = Math.ceil(t / e) + 1,
      n = 2 ** (e - 1),
      o = 2 ** e;
    return {
      windows: r,
      windowSize: n,
      mask: (0, i.r)(e),
      maxNumber: o,
      shiftBy: BigInt(e),
    };
  }
  function z(e, t, r) {
    let { windowSize: n, mask: i, maxNumber: o, shiftBy: f } = r,
      l = Number(e & i),
      a = e >> f;
    l > n && ((l -= o), (a += A));
    let d = t * n,
      s = d + Math.abs(l) - 1,
      u = 0 === l;
    return {
      nextN: a,
      offset: s,
      isZero: u,
      isNeg: l < 0,
      isNegF: t % 2 != 0,
      offsetF: d,
    };
  }
  let Z = new WeakMap(),
    T = new WeakMap();
  function P(e) {
    return T.get(e) || 1;
  }
  function C(e) {
    return (
      y(e.Fp),
      (0, i.Q)(
        e,
        { n: "bigint", h: "bigint", Gx: "field", Gy: "field" },
        { nBitLength: "isSafeInteger", nByteLength: "isSafeInteger" },
      ),
      Object.freeze({ ...v(e.n, e.nBitLength), ...e, ...{ p: e.Fp.ORDER } })
    );
  }
  function D(e) {
    (void 0 !== e.lowS && (0, i.e)("lowS", e.lowS),
      void 0 !== e.prehash && (0, i.e)("prehash", e.prehash));
  }
  let _ = {
    Err: class extends Error {
      constructor(e = "") {
        super(e);
      }
    },
    _tlv: {
      encode: (e, t) => {
        let { Err: r } = _;
        if (e < 0 || e > 256) throw new r("tlv.encode: wrong tag");
        if (1 & t.length) throw new r("tlv.encode: unpadded data");
        let n = t.length / 2,
          o = (0, i.Z)(n);
        if ((o.length / 2) & 128)
          throw new r("tlv.encode: long form length too big");
        let f = n > 127 ? (0, i.Z)((o.length / 2) | 128) : "";
        return (0, i.Z)(e) + f + o + t;
      },
      decode(e, t) {
        let { Err: r } = _,
          n = 0;
        if (e < 0 || e > 256) throw new r("tlv.encode: wrong tag");
        if (t.length < 2 || t[n++] !== e) throw new r("tlv.decode: wrong tlv");
        let i = t[n++],
          o = 0;
        if (128 & i) {
          let e = 127 & i;
          if (!e)
            throw new r("tlv.decode(long): indefinite length not supported");
          if (e > 4) throw new r("tlv.decode(long): byte length is too big");
          let f = t.subarray(n, n + e);
          if (f.length !== e)
            throw new r("tlv.decode: length bytes not complete");
          if (0 === f[0]) throw new r("tlv.decode(long): zero leftmost byte");
          for (let e of f) o = (o << 8) | e;
          if (((n += e), o < 128))
            throw new r("tlv.decode(long): not minimal encoding");
        } else o = i;
        let f = t.subarray(n, n + o);
        if (f.length !== o) throw new r("tlv.decode: wrong value length");
        return { v: f, l: t.subarray(n + o) };
      },
    },
    _int: {
      encode(e) {
        let { Err: t } = _;
        if (e < V) throw new t("integer: negative integers are not allowed");
        let r = (0, i.Z)(e);
        if ((8 & Number.parseInt(r[0], 16) && (r = "00" + r), 1 & r.length))
          throw new t("unexpected DER parsing assertion: unpadded hex");
        return r;
      },
      decode(e) {
        let { Err: t } = _;
        if (128 & e[0]) throw new t("invalid signature integer: negative");
        if (0 === e[0] && !(128 & e[1]))
          throw new t("invalid signature integer: unnecessary leading zero");
        return (0, i.s)(e);
      },
    },
    toSig(e) {
      let { Err: t, _int: r, _tlv: n } = _,
        o = (0, i.z)("signature", e),
        { v: f, l: l } = n.decode(48, o);
      if (l.length) throw new t("invalid signature: left bytes after parsing");
      let { v: a, l: d } = n.decode(2, f),
        { v: s, l: u } = n.decode(2, d);
      if (u.length) throw new t("invalid signature: left bytes after parsing");
      return { r: r.decode(a), s: r.decode(s) };
    },
    hexFromSig(e) {
      let { _tlv: t, _int: r } = _,
        n = t.encode(2, r.encode(e.r)),
        i = t.encode(2, r.encode(e.s));
      return t.encode(48, n + i);
    },
  };
  function F(e, t) {
    return (0, i.v)((0, i.m)(e, t));
  }
  let V = BigInt(0),
    U = BigInt(1),
    k = BigInt(2),
    H = BigInt(3),
    L = BigInt(4);
  function j(e) {
    let t,
      r =
        ((t = C(e)),
        (0, i.Q)(
          t,
          { hash: "hash", hmac: "function", randomBytes: "function" },
          { bits2int: "function", bits2int_modN: "function", lowS: "boolean" },
        ),
        Object.freeze({ lowS: !0, ...t })),
      { Fp: n, n: o, nByteLength: f, nBitLength: l } = r,
      a = n.BYTES + 1,
      d = 2 * n.BYTES + 1;
    function s(e) {
      return c(e, o);
    }
    let {
        ProjectivePoint: u,
        normPrivateKeyToScalar: h,
        weierstrassEquation: p,
        isWithinCurveOrder: g,
      } = (function (e) {
        var t;
        let r = (function (e) {
            let t = C(e);
            (0, i.Q)(
              t,
              { a: "field", b: "field" },
              {
                allowInfinityPoint: "boolean",
                allowedPrivateKeyLengths: "array",
                clearCofactor: "function",
                fromBytes: "function",
                isTorsionFree: "function",
                toBytes: "function",
                wrapPrivateKey: "boolean",
              },
            );
            let { endo: r, Fp: n, a: o } = t;
            if (r) {
              if (!n.eql(o, n.ZERO))
                throw Error("invalid endo: CURVE.a must be 0");
              if (
                "object" != typeof r ||
                "bigint" != typeof r.beta ||
                "function" != typeof r.splitScalar
              )
                throw Error(
                  'invalid endo: expected "beta": bigint and "splitScalar": function',
                );
            }
            return Object.freeze({ ...t });
          })(e),
          { Fp: n } = r,
          o = B(r.n, r.nBitLength),
          f =
            r.toBytes ||
            ((e, t, r) => {
              let o = t.toAffine();
              return (0, i.t)(
                Uint8Array.from([4]),
                n.toBytes(o.x),
                n.toBytes(o.y),
              );
            }),
          l =
            r.fromBytes ||
            ((e) => {
              let t = e.subarray(1);
              return {
                x: n.fromBytes(t.subarray(0, n.BYTES)),
                y: n.fromBytes(t.subarray(n.BYTES, 2 * n.BYTES)),
              };
            });
        function a(e) {
          let { a: t, b: i } = r,
            o = n.sqr(e),
            f = n.mul(o, e);
          return n.add(n.add(f, n.mul(e, t)), i);
        }
        function d(e, t) {
          let r = n.sqr(t),
            i = a(e);
          return n.eql(r, i);
        }
        if (!d(r.Gx, r.Gy)) throw Error("bad curve params: generator point");
        let s = n.mul(n.pow(r.a, H), L),
          u = n.mul(n.sqr(r.b), BigInt(27));
        if (n.is0(n.add(s, u))) throw Error("bad curve params: a or b");
        function h(e) {
          let t,
            {
              allowedPrivateKeyLengths: n,
              nByteLength: o,
              wrapPrivateKey: f,
              n: l,
            } = r;
          if (n && "bigint" != typeof e) {
            if (
              ((0, i.g)(e) && (e = (0, i.v)(e)),
              "string" != typeof e || !n.includes(e.length))
            )
              throw Error("invalid private key");
            e = e.padStart(2 * o, "0");
          }
          try {
            t =
              "bigint" == typeof e
                ? e
                : (0, i.s)((0, i.z)("private key", e, o));
          } catch (t) {
            throw Error(
              "invalid private key, expected hex or " +
                o +
                " bytes, got " +
                typeof e,
            );
          }
          return (f && (t = c(t, l)), (0, i._)("private key", t, U, l), t);
        }
        function m(e) {
          if (!(e instanceof w)) throw Error("ProjectivePoint expected");
        }
        let p = (0, i.W)((e, t) => {
            let { px: r, py: i, pz: o } = e;
            if (n.eql(o, n.ONE)) return { x: r, y: i };
            let f = e.is0();
            null == t && (t = f ? n.ONE : n.inv(o));
            let l = n.mul(r, t),
              a = n.mul(i, t),
              d = n.mul(o, t);
            if (f) return { x: n.ZERO, y: n.ZERO };
            if (!n.eql(d, n.ONE)) throw Error("invZ was invalid");
            return { x: l, y: a };
          }),
          g = (0, i.W)((e) => {
            if (e.is0()) {
              if (r.allowInfinityPoint && !n.is0(e.py)) return;
              throw Error("bad point: ZERO");
            }
            let { x: t, y: i } = e.toAffine();
            if (!n.isValid(t) || !n.isValid(i))
              throw Error("bad point: x or y not FE");
            if (!d(t, i)) throw Error("bad point: equation left != right");
            if (!e.isTorsionFree())
              throw Error("bad point: not in prime-order subgroup");
            return !0;
          });
        class w {
          constructor(e, t, r) {
            if (null == e || !n.isValid(e)) throw Error("x required");
            if (null == t || !n.isValid(t) || n.is0(t))
              throw Error("y required");
            if (null == r || !n.isValid(r)) throw Error("z required");
            ((this.px = e), (this.py = t), (this.pz = r), Object.freeze(this));
          }
          static fromAffine(e) {
            let { x: t, y: r } = e || {};
            if (!e || !n.isValid(t) || !n.isValid(r))
              throw Error("invalid affine point");
            if (e instanceof w) throw Error("projective point not allowed");
            let i = (e) => n.eql(e, n.ZERO);
            return i(t) && i(r) ? w.ZERO : new w(t, r, n.ONE);
          }
          get x() {
            return this.toAffine().x;
          }
          get y() {
            return this.toAffine().y;
          }
          static normalizeZ(e) {
            let t = E(
              n,
              e.map((e) => e.pz),
            );
            return e.map((e, r) => e.toAffine(t[r])).map(w.fromAffine);
          }
          static fromHex(e) {
            let t = w.fromAffine(l((0, i.z)("pointHex", e)));
            return (t.assertValidity(), t);
          }
          static fromPrivateKey(e) {
            return w.BASE.multiply(h(e));
          }
          static msm(e, t) {
            return (function (e, t, r, n) {
              if (!Array.isArray(r)) throw Error("array expected");
              r.forEach((t, r) => {
                if (!(t instanceof e))
                  throw Error("invalid point at index " + r);
              });
              if (!Array.isArray(n)) throw Error("array of scalars expected");
              n.forEach((e, r) => {
                if (!t.isValid(e)) throw Error("invalid scalar at index " + r);
              });
              let o = r.length,
                f = n.length;
              if (o !== f)
                throw Error(
                  "arrays of points and scalars must have equal length",
                );
              let l = e.ZERO,
                a = (0, i.y)(BigInt(o)),
                d = 1;
              a > 12 ? (d = a - 3) : a > 4 ? (d = a - 2) : a > 0 && (d = 2);
              let s = (0, i.r)(d),
                u = Array(Number(s) + 1).fill(l),
                c = Math.floor((t.BITS - 1) / d) * d,
                h = l;
              for (let e = c; e >= 0; e -= d) {
                u.fill(l);
                for (let t = 0; t < f; t++) {
                  let i = Number((n[t] >> BigInt(e)) & s);
                  u[i] = u[i].add(r[t]);
                }
                let t = l;
                for (let e = u.length - 1, r = l; e > 0; e--)
                  ((r = r.add(u[e])), (t = t.add(r)));
                if (((h = h.add(t)), 0 !== e))
                  for (let e = 0; e < d; e++) h = h.double();
              }
              return h;
            })(w, o, e, t);
          }
          _setWindowSize(e) {
            v.setWindowSize(this, e);
          }
          assertValidity() {
            g(this);
          }
          hasEvenY() {
            let { y: e } = this.toAffine();
            if (n.isOdd) return !n.isOdd(e);
            throw Error("Field doesn't support isOdd");
          }
          equals(e) {
            m(e);
            let { px: t, py: r, pz: i } = this,
              { px: o, py: f, pz: l } = e,
              a = n.eql(n.mul(t, l), n.mul(o, i)),
              d = n.eql(n.mul(r, l), n.mul(f, i));
            return a && d;
          }
          negate() {
            return new w(this.px, n.neg(this.py), this.pz);
          }
          double() {
            let { a: e, b: t } = r,
              i = n.mul(t, H),
              { px: o, py: f, pz: l } = this,
              a = n.ZERO,
              d = n.ZERO,
              s = n.ZERO,
              u = n.mul(o, o),
              c = n.mul(f, f),
              h = n.mul(l, l),
              m = n.mul(o, f);
            return (
              (m = n.add(m, m)),
              (s = n.mul(o, l)),
              (s = n.add(s, s)),
              (a = n.mul(e, s)),
              (d = n.mul(i, h)),
              (d = n.add(a, d)),
              (a = n.sub(c, d)),
              (d = n.add(c, d)),
              (d = n.mul(a, d)),
              (a = n.mul(m, a)),
              (s = n.mul(i, s)),
              (h = n.mul(e, h)),
              (m = n.sub(u, h)),
              (m = n.mul(e, m)),
              (m = n.add(m, s)),
              (s = n.add(u, u)),
              (u = n.add(s, u)),
              (u = n.add(u, h)),
              (u = n.mul(u, m)),
              (d = n.add(d, u)),
              (h = n.mul(f, l)),
              (h = n.add(h, h)),
              (u = n.mul(h, m)),
              (a = n.sub(a, u)),
              (s = n.mul(h, c)),
              (s = n.add(s, s)),
              new w(a, d, (s = n.add(s, s)))
            );
          }
          add(e) {
            m(e);
            let { px: t, py: i, pz: o } = this,
              { px: f, py: l, pz: a } = e,
              d = n.ZERO,
              s = n.ZERO,
              u = n.ZERO,
              c = r.a,
              h = n.mul(r.b, H),
              p = n.mul(t, f),
              g = n.mul(i, l),
              y = n.mul(o, a),
              E = n.add(t, i),
              b = n.add(f, l);
            ((E = n.mul(E, b)),
              (b = n.add(p, g)),
              (E = n.sub(E, b)),
              (b = n.add(t, o)));
            let v = n.add(f, a);
            return (
              (b = n.mul(b, v)),
              (v = n.add(p, y)),
              (b = n.sub(b, v)),
              (v = n.add(i, o)),
              (d = n.add(l, a)),
              (v = n.mul(v, d)),
              (d = n.add(g, y)),
              (v = n.sub(v, d)),
              (u = n.mul(c, b)),
              (d = n.mul(h, y)),
              (u = n.add(d, u)),
              (d = n.sub(g, u)),
              (u = n.add(g, u)),
              (s = n.mul(d, u)),
              (g = n.add(p, p)),
              (g = n.add(g, p)),
              (y = n.mul(c, y)),
              (b = n.mul(h, b)),
              (g = n.add(g, y)),
              (y = n.sub(p, y)),
              (y = n.mul(c, y)),
              (b = n.add(b, y)),
              (p = n.mul(g, b)),
              (s = n.add(s, p)),
              (p = n.mul(v, b)),
              (d = n.mul(E, d)),
              (d = n.sub(d, p)),
              (p = n.mul(E, g)),
              (u = n.mul(v, u)),
              new w(d, s, (u = n.add(u, p)))
            );
          }
          subtract(e) {
            return this.add(e.negate());
          }
          is0() {
            return this.equals(w.ZERO);
          }
          wNAF(e) {
            return v.wNAFCached(this, e, w.normalizeZ);
          }
          multiplyUnsafe(e) {
            let { endo: t, n: o } = r;
            (0, i._)("scalar", e, V, o);
            let f = w.ZERO;
            if (e === V) return f;
            if (this.is0() || e === U) return this;
            if (!t || v.hasPrecomputes(this))
              return v.wNAFCachedUnsafe(this, e, w.normalizeZ);
            let { k1neg: l, k1: a, k2neg: d, k2: s } = t.splitScalar(e),
              u = f,
              c = f,
              h = this;
            for (; a > V || s > V; )
              (a & U && (u = u.add(h)),
                s & U && (c = c.add(h)),
                (h = h.double()),
                (a >>= U),
                (s >>= U));
            return (
              l && (u = u.negate()),
              d && (c = c.negate()),
              (c = new w(n.mul(c.px, t.beta), c.py, c.pz)),
              u.add(c)
            );
          }
          multiply(e) {
            let t,
              o,
              { endo: f, n: l } = r;
            if (((0, i._)("scalar", e, U, l), f)) {
              let { k1neg: r, k1: i, k2neg: l, k2: a } = f.splitScalar(e),
                { p: d, f: s } = this.wNAF(i),
                { p: u, f: c } = this.wNAF(a);
              ((d = v.constTimeNegate(r, d)),
                (u = v.constTimeNegate(l, u)),
                (u = new w(n.mul(u.px, f.beta), u.py, u.pz)),
                (t = d.add(u)),
                (o = s.add(c)));
            } else {
              let { p: r, f: n } = this.wNAF(e);
              ((t = r), (o = n));
            }
            return w.normalizeZ([t, o])[0];
          }
          multiplyAndAddUnsafe(e, t, r) {
            let n = w.BASE,
              i = (e, t) =>
                t !== V && t !== U && e.equals(n)
                  ? e.multiply(t)
                  : e.multiplyUnsafe(t),
              o = i(this, t).add(i(e, r));
            return o.is0() ? void 0 : o;
          }
          toAffine(e) {
            return p(this, e);
          }
          isTorsionFree() {
            let { h: e, isTorsionFree: t } = r;
            if (e === U) return !0;
            if (t) return t(w, this);
            throw Error(
              "isTorsionFree() has not been declared for the elliptic curve",
            );
          }
          clearCofactor() {
            let { h: e, clearCofactor: t } = r;
            return e === U ? this : t ? t(w, this) : this.multiplyUnsafe(r.h);
          }
          toRawBytes(e = !0) {
            return (
              (0, i.e)("isCompressed", e),
              this.assertValidity(),
              f(w, this, e)
            );
          }
          toHex(e = !0) {
            return ((0, i.e)("isCompressed", e), (0, i.v)(this.toRawBytes(e)));
          }
        }
        ((w.BASE = new w(r.Gx, r.Gy, n.ONE)),
          (w.ZERO = new w(n.ZERO, n.ONE, n.ZERO)));
        let { endo: y, nBitLength: b } = r,
          v =
            ((t = y ? Math.ceil(b / 2) : b),
            {
              constTimeNegate: q,
              hasPrecomputes: (e) => 1 !== P(e),
              unsafeLadder(e, t, r = w.ZERO) {
                let n = e;
                for (; t > R; )
                  (t & A && (r = r.add(n)), (n = n.double()), (t >>= A));
                return r;
              },
              precomputeWindow(e, r) {
                let { windows: n, windowSize: i } = N(r, t),
                  o = [],
                  f = e,
                  l = f;
                for (let e = 0; e < n; e++) {
                  ((l = f), o.push(l));
                  for (let e = 1; e < i; e++) ((l = l.add(f)), o.push(l));
                  f = l.double();
                }
                return o;
              },
              wNAF(e, r, n) {
                let i = w.ZERO,
                  o = w.BASE,
                  f = N(e, t);
                for (let e = 0; e < f.windows; e++) {
                  let {
                    nextN: t,
                    offset: l,
                    isZero: a,
                    isNeg: d,
                    isNegF: s,
                    offsetF: u,
                  } = z(n, e, f);
                  ((n = t),
                    a ? (o = o.add(q(s, r[u]))) : (i = i.add(q(d, r[l]))));
                }
                return { p: i, f: o };
              },
              wNAFUnsafe(e, r, n, i = w.ZERO) {
                let o = N(e, t);
                for (let e = 0; e < o.windows && n !== R; e++) {
                  let { nextN: t, offset: f, isZero: l, isNeg: a } = z(n, e, o);
                  if (((n = t), !l)) {
                    let e = r[f];
                    i = i.add(a ? e.negate() : e);
                  }
                }
                return i;
              },
              getPrecomputes(e, t, r) {
                let n = Z.get(t);
                return (
                  n ||
                    ((n = this.precomputeWindow(t, e)),
                    1 !== e && Z.set(t, r(n))),
                  n
                );
              },
              wNAFCached(e, t, r) {
                let n = P(e);
                return this.wNAF(n, this.getPrecomputes(n, e, r), t);
              },
              wNAFCachedUnsafe(e, t, r, n) {
                let i = P(e);
                return 1 === i
                  ? this.unsafeLadder(e, t, n)
                  : this.wNAFUnsafe(i, this.getPrecomputes(i, e, r), t, n);
              },
              setWindowSize(e, r) {
                (I(r, t), T.set(e, r), Z.delete(e));
              },
            });
        return {
          CURVE: r,
          ProjectivePoint: w,
          normPrivateKeyToScalar: h,
          weierstrassEquation: a,
          isWithinCurveOrder: function (e) {
            return (0, i.q)(e, U, r.n);
          },
        };
      })({
        ...r,
        toBytes(e, t, r) {
          let o = t.toAffine(),
            f = n.toBytes(o.x),
            l = i.t;
          return ((0, i.e)("isCompressed", r), r)
            ? l(Uint8Array.from([t.hasEvenY() ? 2 : 3]), f)
            : l(Uint8Array.from([4]), f, n.toBytes(o.y));
        },
        fromBytes(e) {
          let t = e.length,
            r = e[0],
            o = e.subarray(1);
          if (t === a && (2 === r || 3 === r)) {
            let e,
              t = (0, i.s)(o);
            if (!(0, i.q)(t, U, n.ORDER)) throw Error("Point is not on curve");
            let f = p(t);
            try {
              e = n.sqrt(f);
            } catch (e) {
              throw Error(
                "Point is not on curve" +
                  (e instanceof Error ? ": " + e.message : ""),
              );
            }
            return (
              ((1 & r) == 1) != ((e & U) === U) && (e = n.neg(e)),
              { x: t, y: e }
            );
          }
          if (t === d && 4 === r)
            return {
              x: n.fromBytes(o.subarray(0, n.BYTES)),
              y: n.fromBytes(o.subarray(n.BYTES, 2 * n.BYTES)),
            };
          throw Error(
            "invalid Point, expected length of " +
              a +
              ", or uncompressed " +
              d +
              ", got " +
              t,
          );
        },
      }),
      w = (e, t, r) => (0, i.s)(e.slice(t, r));
    class y {
      constructor(e, t, r) {
        ((0, i._)("r", e, U, o),
          (0, i._)("s", t, U, o),
          (this.r = e),
          (this.s = t),
          null != r && (this.recovery = r),
          Object.freeze(this));
      }
      static fromCompact(e) {
        return new y(
          w((e = (0, i.z)("compactSignature", e, 2 * f)), 0, f),
          w(e, f, 2 * f),
        );
      }
      static fromDER(e) {
        let { r: t, s: r } = _.toSig((0, i.z)("DER", e));
        return new y(t, r);
      }
      assertValidity() {}
      addRecoveryBit(e) {
        return new y(this.r, this.s, e);
      }
      recoverPublicKey(e) {
        let { r: t, s: f, recovery: l } = this,
          a = x((0, i.z)("msgHash", e));
        if (null == l || ![0, 1, 2, 3].includes(l))
          throw Error("recovery id invalid");
        let d = 2 === l || 3 === l ? t + r.n : t;
        if (d >= n.ORDER) throw Error("recovery id 2 or 3 invalid");
        let c = (1 & l) == 0 ? "02" : "03",
          h = u.fromHex(c + F(d, n.BYTES)),
          p = m(d, o),
          g = s(-a * p),
          w = s(f * p),
          y = u.BASE.multiplyAndAddUnsafe(h, g, w);
        if (!y) throw Error("point at infinify");
        return (y.assertValidity(), y);
      }
      hasHighS() {
        return this.s > o >> U;
      }
      normalizeS() {
        return this.hasHighS()
          ? new y(this.r, s(-this.s), this.recovery)
          : this;
      }
      toDERRawBytes() {
        return (0, i.X)(this.toDERHex());
      }
      toDERHex() {
        return _.hexFromSig(this);
      }
      toCompactRawBytes() {
        return (0, i.X)(this.toCompactHex());
      }
      toCompactHex() {
        return F(this.r, f) + F(this.s, f);
      }
    }
    function b(e) {
      if ("bigint" == typeof e) return !1;
      if (e instanceof u) return !0;
      let t = (0, i.z)("key", e).length,
        o = n.BYTES,
        l = o + 1;
      if (!r.allowedPrivateKeyLengths && f !== l)
        return t === l || t === 2 * o + 1;
    }
    let v =
        r.bits2int ||
        function (e) {
          if (e.length > 8192) throw Error("input is too large");
          let t = (0, i.s)(e),
            r = 8 * e.length - l;
          return r > 0 ? t >> BigInt(r) : t;
        },
      x =
        r.bits2int_modN ||
        function (e) {
          return s(v(e));
        },
      k = (0, i.r)(l);
    function j(e) {
      return ((0, i._)("num < 2^" + l, e, V, k), (0, i.m)(e, f));
    }
    let K = { lowS: r.lowS, prehash: !1 },
      M = { lowS: r.lowS, prehash: !1 };
    return (
      u.BASE._setWindowSize(8),
      {
        CURVE: r,
        getPublicKey: function (e, t = !0) {
          return u.fromPrivateKey(e).toRawBytes(t);
        },
        getSharedSecret: function (e, t, r = !0) {
          if (!0 === b(e)) throw Error("first arg must be private key");
          if (!1 === b(t)) throw Error("second arg must be public key");
          return u.fromHex(t).multiply(h(e)).toRawBytes(r);
        },
        sign: function (e, t, f = K) {
          let { seed: l, k2sig: a } = (function (e, t, f = K) {
            if (["recovered", "canonical"].some((e) => e in f))
              throw Error("sign() legacy options not supported");
            let { hash: l, randomBytes: a } = r,
              { lowS: d, prehash: c, extraEntropy: p } = f;
            (null == d && (d = !0),
              (e = (0, i.z)("msgHash", e)),
              D(f),
              c && (e = (0, i.z)("prehashed msgHash", l(e))));
            let w = x(e),
              E = h(t),
              b = [j(E), j(w)];
            if (null != p && !1 !== p) {
              let e = !0 === p ? a(n.BYTES) : p;
              b.push((0, i.z)("extraEntropy", e));
            }
            return {
              seed: (0, i.t)(...b),
              k2sig: function (e) {
                var t;
                let r = v(e);
                if (!g(r)) return;
                let n = m(r, o),
                  i = u.BASE.multiply(r).toAffine(),
                  f = s(i.x);
                if (f === V) return;
                let l = s(n * s(w + f * E));
                if (l === V) return;
                let a = (2 * (i.x !== f)) | Number(i.y & U),
                  c = l;
                return (
                  d &&
                    l > o >> U &&
                    ((c = (t = l) > o >> U ? s(-t) : t), (a ^= 1)),
                  new y(f, c, a)
                );
              },
            };
          })(e, t, f);
          return (0, i.u)(r.hash.outputLen, r.nByteLength, r.hmac)(l, a);
        },
        verify: function (e, t, n, f = M) {
          let l, a;
          ((t = (0, i.z)("msgHash", t)), (n = (0, i.z)("publicKey", n)));
          let { lowS: d, prehash: c, format: h } = f;
          if ((D(f), "strict" in f))
            throw Error("options.strict was renamed to lowS");
          if (void 0 !== h && "compact" !== h && "der" !== h)
            throw Error("format must be compact or der");
          let p = "string" == typeof e || (0, i.g)(e),
            g =
              !p &&
              !h &&
              "object" == typeof e &&
              null !== e &&
              "bigint" == typeof e.r &&
              "bigint" == typeof e.s;
          if (!p && !g)
            throw Error(
              "invalid signature, expected Uint8Array, hex string or Signature instance",
            );
          try {
            if ((g && (a = new y(e.r, e.s)), p)) {
              try {
                "compact" !== h && (a = y.fromDER(e));
              } catch (e) {
                if (!(e instanceof _.Err)) throw e;
              }
              a || "der" === h || (a = y.fromCompact(e));
            }
            l = u.fromHex(n);
          } catch (e) {
            return !1;
          }
          if (!a || (d && a.hasHighS())) return !1;
          c && (t = r.hash(t));
          let { r: w, s: E } = a,
            b = x(t),
            v = m(E, o),
            B = s(b * v),
            S = s(w * v),
            O = u.BASE.multiplyAndAddUnsafe(l, B, S)?.toAffine();
          return !!O && s(O.x) === w;
        },
        ProjectivePoint: u,
        Signature: y,
        utils: {
          isValidPrivateKey(e) {
            try {
              return (h(e), !0);
            } catch (e) {
              return !1;
            }
          },
          normPrivateKeyToScalar: h,
          randomPrivateKey: () => {
            let e = S(r.n);
            return O(r.randomBytes(e), r.n);
          },
          precompute: (e = 8, t = u.BASE) => (
            t._setWindowSize(e),
            t.multiply(BigInt(3)),
            t
          ),
        },
      }
    );
  }
  function K(e, t) {
    if ((y(e), !e.isValid(t.A) || !e.isValid(t.B) || !e.isValid(t.Z)))
      throw Error("mapToCurveSimpleSWU: invalid opts");
    let r = (function (e, t) {
      let r = e.ORDER,
        n = V;
      for (let e = r - U; e % k === V; e /= k) n += U;
      let i = n,
        o = k << (i - U - U),
        f = o * k,
        l = (r - U) / f,
        a = (l - U) / k,
        d = f - U,
        s = e.pow(t, l),
        u = e.pow(t, (l + U) / k),
        c = (t, r) => {
          let n = s,
            f = e.pow(r, d),
            l = e.sqr(f);
          l = e.mul(l, r);
          let c = e.mul(t, l);
          ((c = e.pow(c, a)),
            (c = e.mul(c, f)),
            (f = e.mul(c, r)),
            (l = e.mul(c, t)));
          let h = e.mul(l, f);
          c = e.pow(h, o);
          let m = e.eql(c, e.ONE);
          ((f = e.mul(l, u)),
            (c = e.mul(h, n)),
            (l = e.cmov(f, l, m)),
            (h = e.cmov(c, h, m)));
          for (let t = i; t > U; t--) {
            let r = t - k;
            r = k << (r - U);
            let i = e.pow(h, r),
              o = e.eql(i, e.ONE);
            ((f = e.mul(l, n)),
              (n = e.mul(n, n)),
              (i = e.mul(h, n)),
              (l = e.cmov(f, l, o)),
              (h = e.cmov(i, h, o)));
          }
          return { isValid: m, value: l };
        };
      if (e.ORDER % L === H) {
        let r = (e.ORDER - H) / L,
          n = e.sqrt(e.neg(t));
        c = (t, i) => {
          let o = e.sqr(i),
            f = e.mul(t, i);
          o = e.mul(o, f);
          let l = e.pow(o, r);
          l = e.mul(l, f);
          let a = e.mul(l, n),
            d = e.mul(e.sqr(l), i),
            s = e.eql(d, t),
            u = e.cmov(a, l, s);
          return { isValid: s, value: u };
        };
      }
      return c;
    })(e, t.Z);
    if (!e.isOdd) throw Error("Fp.isOdd is not implemented!");
    return (n) => {
      let i, o, f, l, a, d, s, u;
      ((i = e.sqr(n)),
        (i = e.mul(i, t.Z)),
        (o = e.sqr(i)),
        (o = e.add(o, i)),
        (f = e.add(o, e.ONE)),
        (f = e.mul(f, t.B)),
        (l = e.cmov(t.Z, e.neg(o), !e.eql(o, e.ZERO))),
        (l = e.mul(l, t.A)),
        (o = e.sqr(f)),
        (d = e.sqr(l)),
        (a = e.mul(d, t.A)),
        (o = e.add(o, a)),
        (o = e.mul(o, f)),
        (d = e.mul(d, l)),
        (a = e.mul(d, t.B)),
        (o = e.add(o, a)),
        (s = e.mul(i, f)));
      let { isValid: c, value: h } = r(o, d);
      ((u = e.mul(i, n)),
        (u = e.mul(u, h)),
        (s = e.cmov(s, f, c)),
        (u = e.cmov(u, h, c)));
      let m = e.isOdd(n) === e.isOdd(u);
      u = e.cmov(e.neg(u), u, m);
      let p = E(e, [l], !0)[0];
      return { x: (s = e.mul(s, p)), y: u };
    };
  }
  function M(e, t) {
    let i = (t) =>
      j({
        ...e,
        ...{
          hash: t,
          hmac: (e, ...i) => (0, n.f)(t, e, (0, r.t)(...i)),
          randomBytes: r.a,
        },
      });
    return { ...i(t), create: i };
  }
  (e.s(["h", 0, K, "f", 0, j], 132610), e.s(["f", 0, M], 256591));
  let W = i.s;
  function Y(e, t) {
    if ((G(e), G(t), e < 0 || e >= 1 << (8 * t)))
      throw Error("invalid I2OSP input: " + e);
    let r = Array.from({ length: t }).fill(0);
    for (let n = t - 1; n >= 0; n--) ((r[n] = 255 & e), (e >>>= 8));
    return new Uint8Array(r);
  }
  function G(e) {
    if (!Number.isSafeInteger(e)) throw Error("number expected");
  }
  function Q(e, t, r) {
    let n;
    (0, i.Q)(r, {
      DST: "stringOrUint8Array",
      p: "bigint",
      m: "isSafeInteger",
      k: "isSafeInteger",
      hash: "hash",
    });
    let { p: o, k: f, m: l, hash: a, expand: d, DST: s } = r;
    ((0, i.B)(e), G(t));
    let u = "string" == typeof s ? (0, i.k)(s) : s,
      h = Math.ceil((o.toString(2).length + f) / 8),
      m = t * l * h;
    if ("xmd" === d)
      n = (function (e, t, r, n) {
        ((0, i.B)(e),
          (0, i.B)(t),
          G(r),
          t.length > 255 &&
            (t = n((0, i.t)((0, i.k)("H2C-OVERSIZE-DST-"), t))));
        let { outputLen: o, blockLen: f } = n,
          l = Math.ceil(r / o);
        if (r > 65535 || l > 255)
          throw Error("expand_message_xmd: invalid lenInBytes");
        let a = (0, i.t)(t, Y(t.length, 1)),
          d = Y(0, f),
          s = Y(r, 2),
          u = Array(l),
          c = n((0, i.t)(d, e, s, Y(0, 1), a));
        u[0] = n((0, i.t)(c, Y(1, 1), a));
        for (let e = 1; e <= l; e++) {
          let t = [
            (function (e, t) {
              let r = new Uint8Array(e.length);
              for (let n = 0; n < e.length; n++) r[n] = e[n] ^ t[n];
              return r;
            })(c, u[e - 1]),
            Y(e + 1, 1),
            a,
          ];
          u[e] = n((0, i.t)(...t));
        }
        return (0, i.t)(...u).slice(0, r);
      })(e, u, m, a);
    else if ("xof" === d)
      n = (function (e, t, r, n, o) {
        if (((0, i.B)(e), (0, i.B)(t), G(r), t.length > 255)) {
          let e = Math.ceil((2 * n) / 8);
          t = o
            .create({ dkLen: e })
            .update((0, i.k)("H2C-OVERSIZE-DST-"))
            .update(t)
            .digest();
        }
        if (r > 65535 || t.length > 255)
          throw Error("expand_message_xof: invalid lenInBytes");
        return o
          .create({ dkLen: r })
          .update(e)
          .update(Y(r, 2))
          .update(t)
          .update(Y(t.length, 1))
          .digest();
      })(e, u, m, f, a);
    else if ("_internal_pass" === d) n = e;
    else throw Error('expand must be "xmd" or "xof"');
    let p = Array(t);
    for (let e = 0; e < t; e++) {
      let t = Array(l);
      for (let r = 0; r < l; r++) {
        let i = h * (r + e * l),
          f = n.subarray(i, i + h);
        t[r] = c(W(f), o);
      }
      p[e] = t;
    }
    return p;
  }
  function X(e, t) {
    let r = t.map((e) => Array.from(e).reverse());
    return (t, n) => {
      let [i, o, f, l] = r.map((r) =>
          r.reduce((r, n) => e.add(e.mul(r, t), n)),
        ),
        [a, d] = E(e, [o, l], !0);
      return ((t = e.mul(i, a)), (n = e.mul(n, e.mul(f, d))), { x: t, y: n });
    };
  }
  function J(e, t, r) {
    if ("function" != typeof t) throw Error("mapToCurve() must be defined");
    function n(r) {
      return e.fromAffine(t(r));
    }
    function i(t) {
      let r = t.clearCofactor();
      return r.equals(e.ZERO) ? e.ZERO : (r.assertValidity(), r);
    }
    return {
      defaults: r,
      hashToCurve(e, t) {
        let o = Q(e, 2, { ...r, DST: r.DST, ...t }),
          f = n(o[0]),
          l = n(o[1]);
        return i(f.add(l));
      },
      encodeToCurve: (e, t) =>
        i(n(Q(e, 1, { ...r, DST: r.encodeDST, ...t })[0])),
      mapToCurve(e) {
        if (!Array.isArray(e)) throw Error("expected array of bigints");
        for (let t of e)
          if ("bigint" != typeof t) throw Error("expected array of bigints");
        return i(n(e));
      },
    };
  }
  e.s(["O", 0, J, "J", 0, X], 708842);
  let $ = BigInt(
      "0xfffffffffffffffffffffffffffffffffffffffffffffffffffffffefffffc2f",
    ),
    ee = BigInt(
      "0xfffffffffffffffffffffffffffffffebaaedce6af48a03bbfd25e8cd0364141",
    ),
    et = BigInt(0),
    er = BigInt(1),
    en = BigInt(2),
    ei = (e, t) => (e + t / en) / t,
    eo = B($, void 0, void 0, {
      sqrt: function (e) {
        let t = BigInt(3),
          r = BigInt(6),
          n = BigInt(11),
          i = BigInt(22),
          o = BigInt(23),
          f = BigInt(44),
          l = BigInt(88),
          a = (e * e * e) % $,
          d = (a * a * e) % $,
          s = (h(d, t, $) * d) % $,
          u = (h(s, t, $) * d) % $,
          c = (h(u, en, $) * a) % $,
          m = (h(c, n, $) * c) % $,
          p = (h(m, i, $) * m) % $,
          g = (h(p, f, $) * p) % $,
          w = (h(g, l, $) * g) % $,
          y = (h(w, f, $) * p) % $,
          E = (h(y, t, $) * d) % $,
          b = (h(E, o, $) * m) % $,
          v = (h(b, r, $) * a) % $,
          B = h(v, en, $);
        if (!eo.eql(eo.sqr(B), e)) throw Error("Cannot find square root");
        return B;
      },
    }),
    ef = M(
      {
        a: et,
        b: BigInt(7),
        Fp: eo,
        n: ee,
        Gx: BigInt(
          "55066263022277343669578718895168534326250603453777594175500187360389116729240",
        ),
        Gy: BigInt(
          "32670510020758816978083085130507043184471273380659243275938904335757337482424",
        ),
        h: BigInt(1),
        lowS: !0,
        endo: {
          beta: BigInt(
            "0x7ae96a2b657c07106e64479eac3434e99cf0497512f58995c1396c28719501ee",
          ),
          splitScalar: (e) => {
            let t = BigInt("0x3086d221a7d46bcde86c90e49284eb15"),
              r = -er * BigInt("0xe4437ed6010e88286f547fa90abfe4c3"),
              n = BigInt("0x114ca50f7a8e2f3f657c1108d9d44cfd8"),
              i = BigInt("0x100000000000000000000000000000000"),
              o = ei(t * e, ee),
              f = ei(-r * e, ee),
              l = c(e - o * t - f * n, ee),
              a = c(-o * r - f * t, ee),
              d = l > i,
              s = a > i;
            if ((d && (l = ee - l), s && (a = ee - a), l > i || a > i))
              throw Error("splitScalar: Endomorphism failed, k=" + e);
            return { k1neg: d, k1: l, k2neg: s, k2: a };
          },
        },
      },
      t.E,
    );
  ef.ProjectivePoint;
  i.s;
  let el = X(
      eo,
      [
        [
          "0x8e38e38e38e38e38e38e38e38e38e38e38e38e38e38e38e38e38e38daaaaa8c7",
          "0x7d3d4c80bc321d5b9f315cea7fd44c5d595d2fc0bf63b92dfff1044f17c6581",
          "0x534c328d23f234e6e2a413deca25caece4506144037c40314ecbd0b53d9dd262",
          "0x8e38e38e38e38e38e38e38e38e38e38e38e38e38e38e38e38e38e38daaaaa88c",
        ],
        [
          "0xd35771193d94918a9ca34ccbb7b640dd86cd409542f8487d9fe6b745781eb49b",
          "0xedadc6f64383dc1df7c4b2d51b54225406d36b641f5e41bbc52a56612a8c6d14",
          "0x0000000000000000000000000000000000000000000000000000000000000001",
        ],
        [
          "0x4bda12f684bda12f684bda12f684bda12f684bda12f684bda12f684b8e38e23c",
          "0xc75e0c32d5cb7c0fa9d0a54b12a0a6d5647ab046d686da6fdffc90fc201d71a3",
          "0x29a6194691f91a73715209ef6512e576722830a201be2018a765e85a9ecee931",
          "0x2f684bda12f684bda12f684bda12f684bda12f684bda12f684bda12f38e38d84",
        ],
        [
          "0xfffffffffffffffffffffffffffffffffffffffffffffffffffffffefffff93b",
          "0x7a06534bb8bdb49fd5e9e6632722c2989467c1bfc8e8d978dfb425d2685c2573",
          "0x6484aa716545ca2cf3a70c3fa8fe337e0a3d21162f0d6299a7bf8192bfd2a76f",
          "0x0000000000000000000000000000000000000000000000000000000000000001",
        ],
      ].map((e) => e.map((e) => BigInt(e))),
    ),
    ea = K(eo, {
      A: BigInt(
        "0x3f8731abdd661adca08a5558f0f5d272e953d363cb6f0e5d405447c01a444533",
      ),
      B: BigInt("1771"),
      Z: eo.create(BigInt("-11")),
    });
  (J(
    ef.ProjectivePoint,
    (e) => {
      let { x: t, y: r } = ea(eo.create(e[0]));
      return el(t, r);
    },
    {
      DST: "secp256k1_XMD:SHA-256_SSWU_RO_",
      encodeDST: "secp256k1_XMD:SHA-256_SSWU_NU_",
      p: eo.ORDER,
      m: 1,
      k: 128,
      expand: "xmd",
      hash: t.E,
    },
  ),
    e.s(["secp256k1", 0, ef], 300059));
};
