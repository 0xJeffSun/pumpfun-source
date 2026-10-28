// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(837474),
    r = e.i(944445),
    a = e.i(365490),
    f = e.i(878660),
    n = e.i(288667);
  let i = BigInt(0),
    s = BigInt(1),
    c = BigInt(2),
    o = BigInt(8);
  class l {
    constructor(e) {
      this.ep = e;
    }
    static fromBytes(e) {
      (0, f.U)();
    }
    static fromHex(e) {
      (0, f.U)();
    }
    get x() {
      return this.toAffine().x;
    }
    get y() {
      return this.toAffine().y;
    }
    clearCofactor() {
      return this;
    }
    assertValidity() {
      this.ep.assertValidity();
    }
    toAffine(e) {
      return this.ep.toAffine(e);
    }
    toHex() {
      return (0, r.w)(this.toBytes());
    }
    toString() {
      return this.toHex();
    }
    isTorsionFree() {
      return !0;
    }
    isSmallOrder() {
      return !1;
    }
    add(e) {
      return (this.assertSame(e), this.init(this.ep.add(e.ep)));
    }
    subtract(e) {
      return (this.assertSame(e), this.init(this.ep.subtract(e.ep)));
    }
    multiply(e) {
      return this.init(this.ep.multiply(e));
    }
    multiplyUnsafe(e) {
      return this.init(this.ep.multiplyUnsafe(e));
    }
    double() {
      return this.init(this.ep.double());
    }
    negate() {
      return this.init(this.ep.negate());
    }
    precompute(e, t) {
      return this.init(this.ep.precompute(e, t));
    }
    toRawBytes() {
      return this.toBytes();
    }
  }
  var u = e.i(79262);
  (BigInt(0), BigInt(1), BigInt(2));
  let d = BigInt(0),
    h = BigInt(1),
    p = BigInt(2),
    m = BigInt(3),
    g = BigInt(5),
    y = BigInt(8),
    B = BigInt(
      "0x7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffed",
    ),
    b = {
      p: B,
      n: BigInt(
        "0x1000000000000000000000000000000014def9dea2f79cd65812631a5cf5d3ed",
      ),
      h: y,
      a: BigInt(
        "0x7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffec",
      ),
      d: BigInt(
        "0x52036cee2b6ffe738cc740797779e89800700a4d4141d8ab75eb4dca135978a3",
      ),
      Gx: BigInt(
        "0x216936d3cd6e53fec0a4e231fdd6dc5c692cc7609525a7b2c9562d608f25d51a",
      ),
      Gy: BigInt(
        "0x6666666666666666666666666666666666666666666666666666666666666658",
      ),
    },
    w = BigInt(
      "19681161376707505956807079304988542015446066515923890162744021073123829784752",
    );
  function v(e, t) {
    var r;
    let a,
      f,
      i,
      s,
      c,
      o,
      l,
      u,
      d,
      m,
      y,
      b,
      v,
      x,
      E = (0, n.K)(t * t * t, B),
      I = ((r = e * (0, n.K)(E * E * t, B)),
      (a = BigInt(10)),
      (f = BigInt(20)),
      (i = BigInt(40)),
      (s = BigInt(80)),
      (c = (((r * r) % B) * r) % B),
      (o = ((0, n.m)(c, p, B) * c) % B),
      (l = ((0, n.m)(o, h, B) * r) % B),
      (u = ((0, n.m)(l, g, B) * l) % B),
      (d = ((0, n.m)(u, a, B) * u) % B),
      (m = ((0, n.m)(d, f, B) * d) % B),
      (y = ((0, n.m)(m, i, B) * m) % B),
      (b = ((0, n.m)(y, s, B) * y) % B),
      (v = ((0, n.m)(b, s, B) * y) % B),
      (x = ((0, n.m)(v, a, B) * u) % B),
      { pow_p_5_8: ((0, n.m)(x, p, B) * r) % B, b2: c }).pow_p_5_8,
      S = (0, n.K)(e * E * I, B),
      k = (0, n.K)(t * S * S, B),
      T = S,
      O = (0, n.K)(S * w, B),
      R = k === e,
      q = k === (0, n.K)(-e, B),
      P = k === (0, n.K)(-e * w, B);
    return (
      R && (S = T),
      (q || P) && (S = O),
      (0, n.f)(S, B) && (S = (0, n.K)(-S, B)),
      { isValid: R || q, value: S }
    );
  }
  let x = (0, n.N)(b.p, { isLE: !0 }),
    E = (0, n.N)(b.n, { isLE: !0 }),
    I = (function (e) {
      let t,
        l,
        u,
        d,
        {
          CURVE: h,
          curveOpts: p,
          hash: m,
          eddsaOpts: g,
        } = ((t = {
          a: e.a,
          d: e.d,
          p: e.Fp.ORDER,
          n: e.n,
          h: e.h,
          Gx: e.Gx,
          Gy: e.Gy,
        }),
        (l = {
          Fp: e.Fp,
          Fn: (0, n.N)(t.n, e.nBitLength, !0),
          uvRatio: e.uvRatio,
        }),
        (u = {
          randomBytes: e.randomBytes,
          adjustScalarBytes: e.adjustScalarBytes,
          domain: e.domain,
          prehash: e.prehash,
          mapToCurve: e.mapToCurve,
        }),
        { CURVE: t, curveOpts: l, hash: e.hash, eddsaOpts: u }),
        y = (function (e, t, a = {}) {
          if ("function" != typeof t)
            throw Error('"hash" function param is required');
          (0, f.S)(
            a,
            {},
            {
              adjustScalarBytes: "function",
              randomBytes: "function",
              domain: "function",
              prehash: "function",
              mapToCurve: "function",
            },
          );
          let { prehash: n } = a,
            { BASE: i, Fp: c, Fn: o } = e,
            l = a.randomBytes || r.a,
            u = a.adjustScalarBytes || ((e) => e),
            d =
              a.domain ||
              ((e, t, r) => {
                if (((0, f.Y)(r, "phflag"), t.length || r))
                  throw Error("Contexts/pre-hash are not supported");
                return e;
              });
          function h(e) {
            return o.create((0, f.F)(e));
          }
          function p(e) {
            var r;
            let a,
              n,
              s,
              c,
              o,
              {
                head: l,
                prefix: d,
                scalar: p,
              } = ((r = e),
              (a = b.secretKey),
              (r = (0, f.z)("private key", r, a)),
              (s = u(
                (n = (0, f.z)("hashed private key", t(r), 2 * a)).slice(0, a),
              )),
              (c = n.slice(a, 2 * a)),
              (o = h(s)),
              { head: s, prefix: c, scalar: o }),
              m = i.multiply(p),
              g = m.toBytes();
            return { head: l, prefix: d, scalar: p, point: m, pointBytes: g };
          }
          function m(e) {
            return p(e).pointBytes;
          }
          function g(e = Uint8Array.of(), ...a) {
            return h(t(d((0, r.t)(...a), (0, f.z)("context", e), !!n)));
          }
          let y = { zip215: !0 },
            B = c.BYTES,
            b = { secretKey: B, publicKey: B, signature: 2 * B, seed: B };
          function w(e = l(b.seed)) {
            return (0, f.G)(e, b.seed, "seed");
          }
          let v = {
            getExtendedPublicKey: p,
            randomSecretKey: w,
            isValidSecretKey: function (e) {
              return (0, r.g)(e) && e.length === o.BYTES;
            },
            isValidPublicKey: function (t, r) {
              try {
                return !!e.fromBytes(t, r);
              } catch (e) {
                return !1;
              }
            },
            toMontgomery(t) {
              let { y: r } = e.fromBytes(t),
                a = b.publicKey,
                f = 32 === a;
              if (!f && 57 !== a) throw Error("only defined for 25519 and 448");
              let n = f ? c.div(s + r, s - r) : c.div(r - s, r + s);
              return c.toBytes(n);
            },
            toMontgomerySecret(e) {
              let r = b.secretKey;
              return ((0, f.G)(e, r), u(t(e.subarray(0, r))).subarray(0, r));
            },
            randomPrivateKey: w,
            precompute: (t = 8, r = e.BASE) => r.precompute(t, !1),
          };
          return Object.freeze({
            keygen: function (e) {
              let t = v.randomSecretKey(e);
              return { secretKey: t, publicKey: m(t) };
            },
            getPublicKey: m,
            sign: function (e, t, a = {}) {
              ((e = (0, f.z)("message", e)), n && (e = n(e)));
              let { prefix: s, scalar: c, pointBytes: l } = p(t),
                u = g(a.context, s, e),
                d = i.multiply(u).toBytes(),
                h = g(a.context, d, l, e),
                m = o.create(u + h * c);
              if (!o.isValid(m)) throw Error("sign failed: invalid s");
              let y = (0, r.t)(d, o.toBytes(m));
              return (0, f.G)(y, b.signature, "result");
            },
            verify: function (t, r, a, s = y) {
              let c,
                o,
                l,
                { context: u, zip215: d } = s,
                h = b.signature;
              ((t = (0, f.z)("signature", t, h)),
                (r = (0, f.z)("message", r)),
                (a = (0, f.z)("publicKey", a, b.publicKey)),
                void 0 !== d && (0, f.Y)(d, "zip215"),
                n && (r = n(r)));
              let p = h / 2,
                m = t.subarray(0, p),
                B = (0, f.F)(t.subarray(p, h));
              try {
                ((c = e.fromBytes(a, d)),
                  (o = e.fromBytes(m, d)),
                  (l = i.multiplyUnsafe(B)));
              } catch (e) {
                return !1;
              }
              if (!d && c.isSmallOrder()) return !1;
              let w = g(u, o.toBytes(), c.toBytes(), r);
              return o
                .add(c.multiplyUnsafe(w))
                .subtract(l)
                .clearCofactor()
                .is0();
            },
            utils: v,
            Point: e,
            lengths: b,
          });
        })(
          (function (e, t = {}) {
            var n, l;
            let u,
              d,
              h,
              p,
              m,
              g = (0, a.o)("edwards", e, t, t.FpFnLE),
              { Fp: y, Fn: B } = g,
              b = g.CURVE,
              { h: w } = b;
            (0, f.S)(t, {}, { uvRatio: "function" });
            let v = c << (BigInt(8 * B.BYTES) - s),
              x =
                t.uvRatio ||
                ((e, t) => {
                  try {
                    return { isValid: !0, value: y.sqrt(y.div(e, t)) };
                  } catch (e) {
                    return { isValid: !1, value: i };
                  }
                });
            if (
              ((n = b.Gx),
              (l = b.Gy),
              (u = y.sqr(n)),
              (d = y.sqr(l)),
              (h = y.add(y.mul(b.a, u), d)),
              (p = y.add(y.ONE, y.mul(b.d, y.mul(u, d)))),
              !y.eql(h, p))
            )
              throw Error("bad curve params: generator point");
            function E(e, t, r = !1) {
              let a = r ? s : i;
              return ((0, f._)("coordinate " + e, t, a, v), t);
            }
            function I(e) {
              if (!(e instanceof T)) throw Error("ExtendedPoint expected");
            }
            let S = (0, f.W)((e, t) => {
                let r,
                  a,
                  { X: f, Y: n, Z: c } = e,
                  l = e.is0();
                null == t && (t = l ? o : y.inv(c));
                let u = ((r = f * t), y.create(r)),
                  d = ((a = n * t), y.create(a)),
                  h = y.mul(c, t);
                if (l) return { x: i, y: s };
                if (h !== s) throw Error("invZ was invalid");
                return { x: u, y: d };
              }),
              k = (0, f.W)((e) => {
                let t,
                  r,
                  a,
                  f,
                  n,
                  i,
                  s,
                  c,
                  o,
                  l,
                  u,
                  d,
                  { a: h, d: p } = b;
                if (e.is0()) throw Error("bad point: ZERO");
                let { X: m, Y: g, Z: B, T: w } = e,
                  v = ((t = m * m), y.create(t)),
                  x = ((r = g * g), y.create(r)),
                  E = ((a = B * B), y.create(a)),
                  I = ((f = E * E), y.create(f));
                if (
                  ((s = E * ((n = v * h), (i = y.create(n) + x), y.create(i))),
                  y.create(s) !==
                    ((l =
                      I + ((o = p * ((c = v * x), y.create(c))), y.create(o))),
                    y.create(l)))
                )
                  throw Error("bad point: equation left != right (1)");
                if (((u = m * g), y.create(u) !== ((d = B * w), y.create(d))))
                  throw Error("bad point: equation left != right (2)");
                return !0;
              });
            class T {
              constructor(e, t, r, a) {
                ((this.X = E("x", e)),
                  (this.Y = E("y", t)),
                  (this.Z = E("z", r, !0)),
                  (this.T = E("t", a)),
                  Object.freeze(this));
              }
              static CURVE() {
                return b;
              }
              static fromAffine(e) {
                let t;
                if (e instanceof T) throw Error("extended point not allowed");
                let { x: r, y: a } = e || {};
                return (
                  E("x", r),
                  E("y", a),
                  new T(r, a, s, ((t = r * a), y.create(t)))
                );
              }
              static fromBytes(e, t = !1) {
                let r,
                  a,
                  n,
                  c,
                  o = y.BYTES,
                  { a: l, d: u } = b;
                ((e = (0, f.t)((0, f.G)(e, o, "point"))),
                  (0, f.Y)(t, "zip215"));
                let d = (0, f.t)(e),
                  h = e[o - 1];
                d[o - 1] = -129 & h;
                let p = (0, f.F)(d),
                  m = t ? v : y.ORDER;
                (0, f._)("point.y", p, i, m);
                let g = ((r = p * p), y.create(r)),
                  { isValid: B, value: w } = x(
                    ((a = g - s), y.create(a)),
                    ((n = u * g - l), y.create(n)),
                  );
                if (!B) throw Error("bad point: invalid y coordinate");
                let E = (w & s) === s,
                  I = (128 & h) != 0;
                if (!t && w === i && I) throw Error("bad point: x=0 and x_0=1");
                return (
                  I !== E && ((c = -w), (w = y.create(c))),
                  T.fromAffine({ x: w, y: p })
                );
              }
              static fromHex(e, t = !1) {
                return T.fromBytes((0, f.z)("point", e), t);
              }
              get x() {
                return this.toAffine().x;
              }
              get y() {
                return this.toAffine().y;
              }
              precompute(e = 8, t = !0) {
                return (O.createCache(this, e), t || this.multiply(c), this);
              }
              assertValidity() {
                k(this);
              }
              equals(e) {
                let t, r, a, f;
                I(e);
                let { X: n, Y: i, Z: s } = this,
                  { X: c, Y: o, Z: l } = e,
                  u = ((t = n * l), y.create(t)),
                  d = ((r = c * s), y.create(r)),
                  h = ((a = i * l), y.create(a)),
                  p = ((f = o * s), y.create(f));
                return u === d && h === p;
              }
              is0() {
                return this.equals(T.ZERO);
              }
              negate() {
                let e, t;
                return new T(
                  ((e = -this.X), y.create(e)),
                  this.Y,
                  this.Z,
                  ((t = -this.T), y.create(t)),
                );
              }
              double() {
                let e,
                  t,
                  r,
                  a,
                  f,
                  n,
                  i,
                  s,
                  o,
                  l,
                  u,
                  { a: d } = b,
                  { X: h, Y: p, Z: m } = this,
                  g = ((e = h * h), y.create(e)),
                  B = ((t = p * p), y.create(t)),
                  w = ((a = c * ((r = m * m), y.create(r))), y.create(a)),
                  v = ((f = d * g), y.create(f)),
                  x = h + p,
                  E = ((n = x * x), (i = y.create(n) - g - B), y.create(i)),
                  I = v + B,
                  S = I - w,
                  k = v - B,
                  O = ((s = E * S), y.create(s)),
                  R = ((o = I * k), y.create(o)),
                  q = ((l = E * k), y.create(l));
                return new T(O, R, ((u = S * I), y.create(u)), q);
              }
              add(e) {
                let t, r, a, f, n, i, s, c, o, l;
                I(e);
                let { a: u, d } = b,
                  { X: h, Y: p, Z: m, T: g } = this,
                  { X: B, Y: w, Z: v, T: x } = e,
                  E = ((t = h * B), y.create(t)),
                  S = ((r = p * w), y.create(r)),
                  k = ((a = g * d * x), y.create(a)),
                  O = ((f = m * v), y.create(f)),
                  R = ((n = (h + p) * (B + w) - E - S), y.create(n)),
                  q = O - k,
                  P = O + k,
                  A = ((i = S - u * E), y.create(i)),
                  _ = ((s = R * q), y.create(s)),
                  C = ((c = P * A), y.create(c)),
                  G = ((o = R * A), y.create(o));
                return new T(_, C, ((l = q * P), y.create(l)), G);
              }
              subtract(e) {
                return this.add(e.negate());
              }
              multiply(e) {
                if (!B.isValidNot0(e))
                  throw Error("invalid scalar: expected 1 <= sc < curve.n");
                let { p: t, f: r } = O.cached(this, e, (e) => (0, a.s)(T, e));
                return (0, a.s)(T, [t, r])[0];
              }
              multiplyUnsafe(e, t = T.ZERO) {
                if (!B.isValid(e))
                  throw Error("invalid scalar: expected 0 <= sc < curve.n");
                return e === i
                  ? T.ZERO
                  : this.is0() || e === s
                    ? this
                    : O.unsafe(this, e, (e) => (0, a.s)(T, e), t);
              }
              isSmallOrder() {
                return this.multiplyUnsafe(w).is0();
              }
              isTorsionFree() {
                return O.unsafe(this, b.n).is0();
              }
              toAffine(e) {
                return S(this, e);
              }
              clearCofactor() {
                return w === s ? this : this.multiplyUnsafe(w);
              }
              toBytes() {
                let { x: e, y: t } = this.toAffine(),
                  r = y.toBytes(t);
                return ((r[r.length - 1] |= e & s ? 128 : 0), r);
              }
              toHex() {
                return (0, r.w)(this.toBytes());
              }
              toString() {
                return `<Point ${this.is0() ? "ZERO" : this.toHex()}>`;
              }
              get ex() {
                return this.X;
              }
              get ey() {
                return this.Y;
              }
              get ez() {
                return this.Z;
              }
              get et() {
                return this.T;
              }
              static normalizeZ(e) {
                return (0, a.s)(T, e);
              }
              static msm(e, t) {
                return (0, a.g)(T, B, e, t);
              }
              _setWindowSize(e) {
                this.precompute(e);
              }
              toRawBytes() {
                return this.toBytes();
              }
            }
            ((T.BASE = new T(b.Gx, b.Gy, s, ((m = b.Gx * b.Gy), y.create(m)))),
              (T.ZERO = new T(i, s, s, i)),
              (T.Fp = y),
              (T.Fn = B));
            let O = new a.p(T, B.BITS);
            return (T.BASE.precompute(8), T);
          })(h, p),
          m,
          g,
        );
      return (
        (d = y.Point),
        Object.assign({}, y, {
          ExtendedPoint: d,
          CURVE: e,
          nBitLength: d.Fn.BITS,
          nByteLength: d.Fn.BYTES,
        })
      );
    })({
      ...b,
      Fp: x,
      hash: t.s,
      adjustScalarBytes: function (e) {
        return ((e[0] &= 248), (e[31] &= 127), (e[31] |= 64), e);
      },
      uvRatio: v,
    }),
    S = (B + m) / y,
    k = x.pow(p, S),
    T = x.sqrt(x.neg(x.ONE)),
    O = (0, n.s)(x, x.neg(BigInt(486664)));
  (0, u.O)(
    I.Point,
    (e) =>
      (function (e) {
        let t,
          r,
          a,
          f,
          i,
          s,
          c,
          o,
          l,
          u,
          d,
          m,
          b,
          w,
          v,
          E,
          I,
          S,
          R,
          q,
          P,
          A,
          _,
          {
            xMn: C,
            xMd: G,
            yMn: F,
            yMd: z,
          } = ((t = (B - g) / y),
          (r = BigInt(486662)),
          (a = x.sqr(e)),
          (a = x.mul(a, p)),
          (f = x.add(a, x.ONE)),
          (i = x.neg(r)),
          (s = x.sqr(f)),
          (c = x.mul(s, f)),
          (o = x.mul(a, r)),
          (o = x.mul(o, i)),
          (o = x.add(o, s)),
          (o = x.mul(o, i)),
          (l = x.sqr(c)),
          (s = x.sqr(l)),
          (l = x.mul(l, c)),
          (l = x.mul(l, o)),
          (s = x.mul(s, l)),
          (u = x.pow(s, t)),
          (u = x.mul(u, l)),
          (d = x.mul(u, T)),
          (s = x.sqr(u)),
          (s = x.mul(s, c)),
          (m = x.eql(s, o)),
          (b = x.cmov(d, u, m)),
          (w = x.mul(i, a)),
          (v = x.mul(u, e)),
          (v = x.mul(v, k)),
          (E = x.mul(v, T)),
          (I = x.mul(o, a)),
          (s = x.sqr(v)),
          (s = x.mul(s, c)),
          (S = x.eql(s, I)),
          (R = x.cmov(E, v, S)),
          (s = x.sqr(b)),
          (s = x.mul(s, c)),
          (q = x.eql(s, o)),
          (P = x.cmov(w, i, q)),
          (A = x.cmov(R, b, q)),
          (_ = x.isOdd(A)),
          { xMn: P, xMd: f, yMn: (A = x.cmov(A, x.neg(A), q !== _)), yMd: h }),
          K = x.mul(C, z);
        K = x.mul(K, O);
        let U = x.mul(G, F),
          Z = x.sub(C, G),
          V = x.add(C, G),
          H = x.mul(U, V),
          Y = x.eql(H, x.ZERO);
        ((K = x.cmov(K, x.ZERO, Y)),
          (U = x.cmov(U, x.ONE, Y)),
          (Z = x.cmov(Z, x.ONE, Y)),
          (V = x.cmov(V, x.ONE, Y)));
        let [M, D] = (0, n.R)(x, [U, V], !0);
        return { x: x.mul(K, M), y: x.mul(Z, D) };
      })(e[0]),
    {
      DST: "edwards25519_XMD:SHA-512_ELL2_RO_",
      encodeDST: "edwards25519_XMD:SHA-512_ELL2_NU_",
      p: B,
      m: 1,
      k: 128,
      expand: "xmd",
      hash: t.s,
    },
  );
  let R = BigInt(
      "25063068953384623474111414158702152701244531502492656460079210482610430750235",
    ),
    q = BigInt(
      "54469307008909316920995813868745141605393597292927456921205312896311721017578",
    ),
    P = BigInt(
      "1159843021668779879193775521855586647937357759715417654439879720876111806838",
    ),
    A = BigInt(
      "40440834346308536858101042469323190826248399146238708352240133220865137265952",
    ),
    _ = BigInt(
      "0x7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff",
    ),
    C = (e) => I.Point.Fp.create((0, f.F)(e) & _);
  function G(e) {
    let t,
      r,
      a,
      f,
      i,
      s,
      c,
      o,
      l,
      u,
      d,
      p,
      m,
      g,
      y,
      { d: E } = b,
      S = ((t = w * e * e), x.create(t)),
      k = ((r = (S + h) * P), x.create(r)),
      T = BigInt(-1),
      O = ((f = (T - E * S) * ((a = S + E), x.create(a))), x.create(f)),
      { isValid: q, value: _ } = v(k, O),
      C = ((i = _ * e), x.create(i));
    ((0, n.f)(C, B) || ((s = -C), (C = x.create(s))),
      q || (_ = C),
      q || (T = S));
    let G = ((c = T * (S - h) * A - O), x.create(c)),
      F = _ * _,
      z = ((o = (_ + _) * O), x.create(o)),
      K = ((l = G * R), x.create(l)),
      U = ((u = h - F), x.create(u)),
      Z = ((d = h + F), x.create(d));
    return new I.Point(
      ((p = z * Z), x.create(p)),
      ((m = U * K), x.create(m)),
      ((g = K * Z), x.create(g)),
      ((y = z * U), x.create(y)),
    );
  }
  class F extends l {
    constructor(e) {
      super(e);
    }
    static fromAffine(e) {
      return new F(I.Point.fromAffine(e));
    }
    assertSame(e) {
      if (!(e instanceof F)) throw Error("RistrettoPoint expected");
    }
    init(e) {
      return new F(e);
    }
    static hashToCurve(e) {
      var t;
      let a, n;
      return (
        (t = (0, f.z)("ristrettoHash", e, 64)),
        (0, r.C)(t, 64),
        (a = G(C(t.subarray(0, 32)))),
        (n = G(C(t.subarray(32, 64)))),
        new F(a.add(n))
      );
    }
    static fromBytes(e) {
      let t, a, i, s, c, o, l, u, p, m, g, y, w;
      (0, r.C)(e, 32);
      let { a: E, d: S } = b,
        k = C(e);
      if (!(0, f.v)(x.toBytes(k), e) || (0, n.f)(k, B))
        throw Error("invalid ristretto255 encoding 1");
      let T = ((t = k * k), x.create(t)),
        O = ((a = h + E * T), x.create(a)),
        R = ((i = h - E * T), x.create(i)),
        q = ((s = O * O), x.create(s)),
        P = ((c = R * R), x.create(c)),
        A = ((o = E * S * q - P), x.create(o)),
        { isValid: _, value: G } = ((l = A * P), v(h, x.create(l))),
        z = ((u = G * R), x.create(u)),
        K = ((p = G * z * A), x.create(p)),
        U = ((m = (k + k) * z), x.create(m));
      (0, n.f)(U, B) && ((g = -U), (U = x.create(g)));
      let Z = ((y = O * K), x.create(y)),
        V = ((w = U * Z), x.create(w));
      if (!_ || (0, n.f)(V, B) || Z === d)
        throw Error("invalid ristretto255 encoding 2");
      return new F(new I.Point(U, Z, h, V));
    }
    static fromHex(e) {
      return F.fromBytes((0, f.z)("ristrettoHex", e, 32));
    }
    static msm(e, t) {
      return (0, a.g)(F, I.Point.Fn, e, t);
    }
    toBytes() {
      let e,
        t,
        r,
        a,
        f,
        i,
        s,
        c,
        o,
        l,
        u,
        d,
        p,
        { X: m, Y: g, Z: y, T: b } = this.ep,
        E =
          ((e = y + g),
          (r = x.create(e) * ((t = y - g), x.create(t))),
          x.create(r)),
        I = ((a = m * g), x.create(a)),
        { value: S } =
          ((i = E * ((f = I * I), x.create(f))), v(h, x.create(i))),
        k = ((s = S * E), x.create(s)),
        T = ((c = S * I), x.create(c)),
        O = ((o = k * T * b), x.create(o));
      if ((0, n.f)(b * O, B)) {
        let e,
          t,
          r = ((e = g * w), x.create(e)),
          a = ((t = m * w), x.create(t));
        ((m = r), (g = a), (p = x.create(k * q)));
      } else p = T;
      (0, n.f)(m * O, B) && ((l = -g), (g = x.create(l)));
      let R = ((u = (y - g) * p), x.create(u));
      return ((0, n.f)(R, B) && ((d = -R), (R = x.create(d))), x.toBytes(R));
    }
    equals(e) {
      let t, r, a, f;
      this.assertSame(e);
      let { X: n, Y: i } = this.ep,
        { X: s, Y: c } = e.ep,
        o = ((t = n * c), x.create(t) === ((r = i * s), x.create(r))),
        l = ((a = i * c), x.create(a) === ((f = n * s), x.create(f)));
      return o || l;
    }
    is0() {
      return this.equals(F.ZERO);
    }
  }
  ((F.BASE = new F(I.Point.BASE)),
    (F.ZERO = new F(I.Point.ZERO)),
    (F.Fp = x),
    (F.Fn = E),
    e.s(["f", 0, I], 430981));
};
