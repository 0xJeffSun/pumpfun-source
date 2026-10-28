// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(837474),
    f = e.i(944445),
    r = e.i(365490),
    a = e.i(878660),
    i = e.i(288667);
  let n = BigInt(0),
    c = BigInt(1),
    s = BigInt(2),
    o = BigInt(8);
  class d {
    constructor(e) {
      this.ep = e;
    }
    static fromBytes(e) {
      (0, a.U)();
    }
    static fromHex(e) {
      (0, a.U)();
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
      return (0, f.w)(this.toBytes());
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
  let l = BigInt(0),
    m = BigInt(1),
    h = BigInt(2),
    B = BigInt(3),
    p = BigInt(5),
    b = BigInt(8),
    g = BigInt(
      "0x7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffed",
    ),
    y = {
      p: g,
      n: BigInt(
        "0x1000000000000000000000000000000014def9dea2f79cd65812631a5cf5d3ed",
      ),
      h: b,
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
    x = BigInt(
      "19681161376707505956807079304988542015446066515923890162744021073123829784752",
    );
  function E(e, t) {
    var f;
    let r,
      a,
      n,
      c,
      s,
      o,
      d,
      u,
      l,
      B,
      b,
      y,
      E,
      I,
      v = (0, i.K)(t * t * t, g),
      w = ((f = e * (0, i.K)(v * v * t, g)),
      (r = BigInt(10)),
      (a = BigInt(20)),
      (n = BigInt(40)),
      (c = BigInt(80)),
      (s = (((f * f) % g) * f) % g),
      (o = ((0, i.m)(s, h, g) * s) % g),
      (d = ((0, i.m)(o, m, g) * f) % g),
      (u = ((0, i.m)(d, p, g) * d) % g),
      (l = ((0, i.m)(u, r, g) * u) % g),
      (B = ((0, i.m)(l, a, g) * l) % g),
      (b = ((0, i.m)(B, n, g) * B) % g),
      (y = ((0, i.m)(b, c, g) * b) % g),
      (E = ((0, i.m)(y, c, g) * b) % g),
      (I = ((0, i.m)(E, r, g) * u) % g),
      { pow_p_5_8: ((0, i.m)(I, h, g) * f) % g, b2: s }).pow_p_5_8,
      S = (0, i.K)(e * v * w, g),
      O = (0, i.K)(t * S * S, g),
      R = S,
      T = (0, i.K)(S * x, g),
      _ = O === e,
      q = O === (0, i.K)(-e, g),
      A = O === (0, i.K)(-e * x, g);
    return (
      _ && (S = R),
      (q || A) && (S = T),
      (0, i.f)(S, g) && (S = (0, i.K)(-S, g)),
      { isValid: _ || q, value: S }
    );
  }
  let I = (0, i.N)(y.p, { isLE: !0 }),
    v = (0, i.N)(y.n, { isLE: !0 }),
    w = (function (e) {
      let t,
        d,
        u,
        l,
        {
          CURVE: m,
          curveOpts: h,
          hash: B,
          eddsaOpts: p,
        } = ((t = {
          a: e.a,
          d: e.d,
          p: e.Fp.ORDER,
          n: e.n,
          h: e.h,
          Gx: e.Gx,
          Gy: e.Gy,
        }),
        (d = {
          Fp: e.Fp,
          Fn: (0, i.N)(t.n, e.nBitLength, !0),
          uvRatio: e.uvRatio,
        }),
        (u = {
          randomBytes: e.randomBytes,
          adjustScalarBytes: e.adjustScalarBytes,
          domain: e.domain,
          prehash: e.prehash,
          mapToCurve: e.mapToCurve,
        }),
        { CURVE: t, curveOpts: d, hash: e.hash, eddsaOpts: u }),
        b = (function (e, t, r = {}) {
          if ("function" != typeof t)
            throw Error('"hash" function param is required');
          (0, a.S)(
            r,
            {},
            {
              adjustScalarBytes: "function",
              randomBytes: "function",
              domain: "function",
              prehash: "function",
              mapToCurve: "function",
            },
          );
          let { prehash: i } = r,
            { BASE: n, Fp: s, Fn: o } = e,
            d = r.randomBytes || f.a,
            u = r.adjustScalarBytes || ((e) => e),
            l =
              r.domain ||
              ((e, t, f) => {
                if (((0, a.Y)(f, "phflag"), t.length || f))
                  throw Error("Contexts/pre-hash are not supported");
                return e;
              });
          function m(e) {
            return o.create((0, a.F)(e));
          }
          function h(e) {
            var f;
            let r,
              i,
              c,
              s,
              o,
              {
                head: d,
                prefix: l,
                scalar: h,
              } = ((f = e),
              (r = y.secretKey),
              (f = (0, a.z)("private key", f, r)),
              (c = u(
                (i = (0, a.z)("hashed private key", t(f), 2 * r)).slice(0, r),
              )),
              (s = i.slice(r, 2 * r)),
              (o = m(c)),
              { head: c, prefix: s, scalar: o }),
              B = n.multiply(h),
              p = B.toBytes();
            return { head: d, prefix: l, scalar: h, point: B, pointBytes: p };
          }
          function B(e) {
            return h(e).pointBytes;
          }
          function p(e = Uint8Array.of(), ...r) {
            return m(t(l((0, f.t)(...r), (0, a.z)("context", e), !!i)));
          }
          let b = { zip215: !0 },
            g = s.BYTES,
            y = { secretKey: g, publicKey: g, signature: 2 * g, seed: g };
          function x(e = d(y.seed)) {
            return (0, a.G)(e, y.seed, "seed");
          }
          let E = {
            getExtendedPublicKey: h,
            randomSecretKey: x,
            isValidSecretKey: function (e) {
              return (0, f.g)(e) && e.length === o.BYTES;
            },
            isValidPublicKey: function (t, f) {
              try {
                return !!e.fromBytes(t, f);
              } catch (e) {
                return !1;
              }
            },
            toMontgomery(t) {
              let { y: f } = e.fromBytes(t),
                r = y.publicKey,
                a = 32 === r;
              if (!a && 57 !== r) throw Error("only defined for 25519 and 448");
              let i = a ? s.div(c + f, c - f) : s.div(f - c, f + c);
              return s.toBytes(i);
            },
            toMontgomerySecret(e) {
              let f = y.secretKey;
              return ((0, a.G)(e, f), u(t(e.subarray(0, f))).subarray(0, f));
            },
            randomPrivateKey: x,
            precompute: (t = 8, f = e.BASE) => f.precompute(t, !1),
          };
          return Object.freeze({
            keygen: function (e) {
              let t = E.randomSecretKey(e);
              return { secretKey: t, publicKey: B(t) };
            },
            getPublicKey: B,
            sign: function (e, t, r = {}) {
              ((e = (0, a.z)("message", e)), i && (e = i(e)));
              let { prefix: c, scalar: s, pointBytes: d } = h(t),
                u = p(r.context, c, e),
                l = n.multiply(u).toBytes(),
                m = p(r.context, l, d, e),
                B = o.create(u + m * s);
              if (!o.isValid(B)) throw Error("sign failed: invalid s");
              let b = (0, f.t)(l, o.toBytes(B));
              return (0, a.G)(b, y.signature, "result");
            },
            verify: function (t, f, r, c = b) {
              let s,
                o,
                d,
                { context: u, zip215: l } = c,
                m = y.signature;
              ((t = (0, a.z)("signature", t, m)),
                (f = (0, a.z)("message", f)),
                (r = (0, a.z)("publicKey", r, y.publicKey)),
                void 0 !== l && (0, a.Y)(l, "zip215"),
                i && (f = i(f)));
              let h = m / 2,
                B = t.subarray(0, h),
                g = (0, a.F)(t.subarray(h, m));
              try {
                ((s = e.fromBytes(r, l)),
                  (o = e.fromBytes(B, l)),
                  (d = n.multiplyUnsafe(g)));
              } catch (e) {
                return !1;
              }
              if (!l && s.isSmallOrder()) return !1;
              let x = p(u, o.toBytes(), s.toBytes(), f);
              return o
                .add(s.multiplyUnsafe(x))
                .subtract(d)
                .clearCofactor()
                .is0();
            },
            utils: E,
            Point: e,
            lengths: y,
          });
        })(
          (function (e, t = {}) {
            var i, d;
            let u,
              l,
              m,
              h,
              B,
              p = (0, r.o)("edwards", e, t, t.FpFnLE),
              { Fp: b, Fn: g } = p,
              y = p.CURVE,
              { h: x } = y;
            (0, a.S)(t, {}, { uvRatio: "function" });
            let E = s << (BigInt(8 * g.BYTES) - c),
              I =
                t.uvRatio ||
                ((e, t) => {
                  try {
                    return { isValid: !0, value: b.sqrt(b.div(e, t)) };
                  } catch (e) {
                    return { isValid: !1, value: n };
                  }
                });
            if (
              ((i = y.Gx),
              (d = y.Gy),
              (u = b.sqr(i)),
              (l = b.sqr(d)),
              (m = b.add(b.mul(y.a, u), l)),
              (h = b.add(b.ONE, b.mul(y.d, b.mul(u, l)))),
              !b.eql(m, h))
            )
              throw Error("bad curve params: generator point");
            function v(e, t, f = !1) {
              let r = f ? c : n;
              return ((0, a._)("coordinate " + e, t, r, E), t);
            }
            function w(e) {
              if (!(e instanceof R)) throw Error("ExtendedPoint expected");
            }
            let S = (0, a.W)((e, t) => {
                let f,
                  r,
                  { X: a, Y: i, Z: s } = e,
                  d = e.is0();
                null == t && (t = d ? o : b.inv(s));
                let u = ((f = a * t), b.create(f)),
                  l = ((r = i * t), b.create(r)),
                  m = b.mul(s, t);
                if (d) return { x: n, y: c };
                if (m !== c) throw Error("invZ was invalid");
                return { x: u, y: l };
              }),
              O = (0, a.W)((e) => {
                let t,
                  f,
                  r,
                  a,
                  i,
                  n,
                  c,
                  s,
                  o,
                  d,
                  u,
                  l,
                  { a: m, d: h } = y;
                if (e.is0()) throw Error("bad point: ZERO");
                let { X: B, Y: p, Z: g, T: x } = e,
                  E = ((t = B * B), b.create(t)),
                  I = ((f = p * p), b.create(f)),
                  v = ((r = g * g), b.create(r)),
                  w = ((a = v * v), b.create(a));
                if (
                  ((c = v * ((i = E * m), (n = b.create(i) + I), b.create(n))),
                  b.create(c) !==
                    ((d =
                      w + ((o = h * ((s = E * I), b.create(s))), b.create(o))),
                    b.create(d)))
                )
                  throw Error("bad point: equation left != right (1)");
                if (((u = B * p), b.create(u) !== ((l = g * x), b.create(l))))
                  throw Error("bad point: equation left != right (2)");
                return !0;
              });
            class R {
              constructor(e, t, f, r) {
                ((this.X = v("x", e)),
                  (this.Y = v("y", t)),
                  (this.Z = v("z", f, !0)),
                  (this.T = v("t", r)),
                  Object.freeze(this));
              }
              static CURVE() {
                return y;
              }
              static fromAffine(e) {
                let t;
                if (e instanceof R) throw Error("extended point not allowed");
                let { x: f, y: r } = e || {};
                return (
                  v("x", f),
                  v("y", r),
                  new R(f, r, c, ((t = f * r), b.create(t)))
                );
              }
              static fromBytes(e, t = !1) {
                let f,
                  r,
                  i,
                  s,
                  o = b.BYTES,
                  { a: d, d: u } = y;
                ((e = (0, a.t)((0, a.G)(e, o, "point"))),
                  (0, a.Y)(t, "zip215"));
                let l = (0, a.t)(e),
                  m = e[o - 1];
                l[o - 1] = -129 & m;
                let h = (0, a.F)(l),
                  B = t ? E : b.ORDER;
                (0, a._)("point.y", h, n, B);
                let p = ((f = h * h), b.create(f)),
                  { isValid: g, value: x } = I(
                    ((r = p - c), b.create(r)),
                    ((i = u * p - d), b.create(i)),
                  );
                if (!g) throw Error("bad point: invalid y coordinate");
                let v = (x & c) === c,
                  w = (128 & m) != 0;
                if (!t && x === n && w) throw Error("bad point: x=0 and x_0=1");
                return (
                  w !== v && ((s = -x), (x = b.create(s))),
                  R.fromAffine({ x, y: h })
                );
              }
              static fromHex(e, t = !1) {
                return R.fromBytes((0, a.z)("point", e), t);
              }
              get x() {
                return this.toAffine().x;
              }
              get y() {
                return this.toAffine().y;
              }
              precompute(e = 8, t = !0) {
                return (T.createCache(this, e), t || this.multiply(s), this);
              }
              assertValidity() {
                O(this);
              }
              equals(e) {
                let t, f, r, a;
                w(e);
                let { X: i, Y: n, Z: c } = this,
                  { X: s, Y: o, Z: d } = e,
                  u = ((t = i * d), b.create(t)),
                  l = ((f = s * c), b.create(f)),
                  m = ((r = n * d), b.create(r)),
                  h = ((a = o * c), b.create(a));
                return u === l && m === h;
              }
              is0() {
                return this.equals(R.ZERO);
              }
              negate() {
                let e, t;
                return new R(
                  ((e = -this.X), b.create(e)),
                  this.Y,
                  this.Z,
                  ((t = -this.T), b.create(t)),
                );
              }
              double() {
                let e,
                  t,
                  f,
                  r,
                  a,
                  i,
                  n,
                  c,
                  o,
                  d,
                  u,
                  { a: l } = y,
                  { X: m, Y: h, Z: B } = this,
                  p = ((e = m * m), b.create(e)),
                  g = ((t = h * h), b.create(t)),
                  x = ((r = s * ((f = B * B), b.create(f))), b.create(r)),
                  E = ((a = l * p), b.create(a)),
                  I = m + h,
                  v = ((i = I * I), (n = b.create(i) - p - g), b.create(n)),
                  w = E + g,
                  S = w - x,
                  O = E - g,
                  T = ((c = v * S), b.create(c)),
                  _ = ((o = w * O), b.create(o)),
                  q = ((d = v * O), b.create(d));
                return new R(T, _, ((u = S * w), b.create(u)), q);
              }
              add(e) {
                let t, f, r, a, i, n, c, s, o, d;
                w(e);
                let { a: u, d: l } = y,
                  { X: m, Y: h, Z: B, T: p } = this,
                  { X: g, Y: x, Z: E, T: I } = e,
                  v = ((t = m * g), b.create(t)),
                  S = ((f = h * x), b.create(f)),
                  O = ((r = p * l * I), b.create(r)),
                  T = ((a = B * E), b.create(a)),
                  _ = ((i = (m + h) * (g + x) - v - S), b.create(i)),
                  q = T - O,
                  A = T + O,
                  F = ((n = S - u * v), b.create(n)),
                  K = ((c = _ * q), b.create(c)),
                  Z = ((s = A * F), b.create(s)),
                  z = ((o = _ * F), b.create(o));
                return new R(K, Z, ((d = q * A), b.create(d)), z);
              }
              subtract(e) {
                return this.add(e.negate());
              }
              multiply(e) {
                if (!g.isValidNot0(e))
                  throw Error("invalid scalar: expected 1 <= sc < curve.n");
                let { p: t, f } = T.cached(this, e, (e) => (0, r.s)(R, e));
                return (0, r.s)(R, [t, f])[0];
              }
              multiplyUnsafe(e, t = R.ZERO) {
                if (!g.isValid(e))
                  throw Error("invalid scalar: expected 0 <= sc < curve.n");
                return e === n
                  ? R.ZERO
                  : this.is0() || e === c
                    ? this
                    : T.unsafe(this, e, (e) => (0, r.s)(R, e), t);
              }
              isSmallOrder() {
                return this.multiplyUnsafe(x).is0();
              }
              isTorsionFree() {
                return T.unsafe(this, y.n).is0();
              }
              toAffine(e) {
                return S(this, e);
              }
              clearCofactor() {
                return x === c ? this : this.multiplyUnsafe(x);
              }
              toBytes() {
                let { x: e, y: t } = this.toAffine(),
                  f = b.toBytes(t);
                return ((f[f.length - 1] |= e & c ? 128 : 0), f);
              }
              toHex() {
                return (0, f.w)(this.toBytes());
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
                return (0, r.s)(R, e);
              }
              static msm(e, t) {
                return (0, r.g)(R, g, e, t);
              }
              _setWindowSize(e) {
                this.precompute(e);
              }
              toRawBytes() {
                return this.toBytes();
              }
            }
            ((R.BASE = new R(y.Gx, y.Gy, c, ((B = y.Gx * y.Gy), b.create(B)))),
              (R.ZERO = new R(n, c, c, n)),
              (R.Fp = b),
              (R.Fn = g));
            let T = new r.p(R, g.BITS);
            return (R.BASE.precompute(8), R);
          })(m, h),
          B,
          p,
        );
      return (
        (l = b.Point),
        Object.assign({}, b, {
          ExtendedPoint: l,
          CURVE: e,
          nBitLength: l.Fn.BITS,
          nByteLength: l.Fn.BYTES,
        })
      );
    })({
      ...y,
      Fp: I,
      hash: t.s,
      adjustScalarBytes: function (e) {
        return ((e[0] &= 248), (e[31] &= 127), (e[31] |= 64), e);
      },
      uvRatio: E,
    }),
    S = (g + B) / b,
    O = I.pow(h, S),
    R = I.sqrt(I.neg(I.ONE)),
    T = (0, i.s)(I, I.neg(BigInt(486664)));
  (0, u.O)(
    w.Point,
    (e) =>
      (function (e) {
        let t,
          f,
          r,
          a,
          n,
          c,
          s,
          o,
          d,
          u,
          l,
          B,
          y,
          x,
          E,
          v,
          w,
          S,
          _,
          q,
          A,
          F,
          K,
          {
            xMn: Z,
            xMd: z,
            yMn: U,
            yMd: G,
          } = ((t = (g - p) / b),
          (f = BigInt(486662)),
          (r = I.sqr(e)),
          (r = I.mul(r, h)),
          (a = I.add(r, I.ONE)),
          (n = I.neg(f)),
          (c = I.sqr(a)),
          (s = I.mul(c, a)),
          (o = I.mul(r, f)),
          (o = I.mul(o, n)),
          (o = I.add(o, c)),
          (o = I.mul(o, n)),
          (d = I.sqr(s)),
          (c = I.sqr(d)),
          (d = I.mul(d, s)),
          (d = I.mul(d, o)),
          (c = I.mul(c, d)),
          (u = I.pow(c, t)),
          (u = I.mul(u, d)),
          (l = I.mul(u, R)),
          (c = I.sqr(u)),
          (c = I.mul(c, s)),
          (B = I.eql(c, o)),
          (y = I.cmov(l, u, B)),
          (x = I.mul(n, r)),
          (E = I.mul(u, e)),
          (E = I.mul(E, O)),
          (v = I.mul(E, R)),
          (w = I.mul(o, r)),
          (c = I.sqr(E)),
          (c = I.mul(c, s)),
          (S = I.eql(c, w)),
          (_ = I.cmov(v, E, S)),
          (c = I.sqr(y)),
          (c = I.mul(c, s)),
          (q = I.eql(c, o)),
          (A = I.cmov(x, n, q)),
          (F = I.cmov(_, y, q)),
          (K = I.isOdd(F)),
          { xMn: A, xMd: a, yMn: (F = I.cmov(F, I.neg(F), q !== K)), yMd: m }),
          P = I.mul(Z, G);
        P = I.mul(P, T);
        let C = I.mul(z, U),
          Y = I.sub(Z, z),
          V = I.add(Z, z),
          H = I.mul(C, V),
          N = I.eql(H, I.ZERO);
        ((P = I.cmov(P, I.ZERO, N)),
          (C = I.cmov(C, I.ONE, N)),
          (Y = I.cmov(Y, I.ONE, N)),
          (V = I.cmov(V, I.ONE, N)));
        let [X, D] = (0, i.R)(I, [C, V], !0);
        return { x: I.mul(P, X), y: I.mul(Y, D) };
      })(e[0]),
    {
      DST: "edwards25519_XMD:SHA-512_ELL2_RO_",
      encodeDST: "edwards25519_XMD:SHA-512_ELL2_NU_",
      p: g,
      m: 1,
      k: 128,
      expand: "xmd",
      hash: t.s,
    },
  );
  let _ = BigInt(
      "25063068953384623474111414158702152701244531502492656460079210482610430750235",
    ),
    q = BigInt(
      "54469307008909316920995813868745141605393597292927456921205312896311721017578",
    ),
    A = BigInt(
      "1159843021668779879193775521855586647937357759715417654439879720876111806838",
    ),
    F = BigInt(
      "40440834346308536858101042469323190826248399146238708352240133220865137265952",
    ),
    K = BigInt(
      "0x7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff",
    ),
    Z = (e) => w.Point.Fp.create((0, a.F)(e) & K);
  function z(e) {
    let t,
      f,
      r,
      a,
      n,
      c,
      s,
      o,
      d,
      u,
      l,
      h,
      B,
      p,
      b,
      { d: v } = y,
      S = ((t = x * e * e), I.create(t)),
      O = ((f = (S + m) * A), I.create(f)),
      R = BigInt(-1),
      T = ((a = (R - v * S) * ((r = S + v), I.create(r))), I.create(a)),
      { isValid: q, value: K } = E(O, T),
      Z = ((n = K * e), I.create(n));
    ((0, i.f)(Z, g) || ((c = -Z), (Z = I.create(c))),
      q || (K = Z),
      q || (R = S));
    let z = ((s = R * (S - m) * F - T), I.create(s)),
      U = K * K,
      G = ((o = (K + K) * T), I.create(o)),
      P = ((d = z * _), I.create(d)),
      C = ((u = m - U), I.create(u)),
      Y = ((l = m + U), I.create(l));
    return new w.Point(
      ((h = G * Y), I.create(h)),
      ((B = C * P), I.create(B)),
      ((p = P * Y), I.create(p)),
      ((b = G * C), I.create(b)),
    );
  }
  class U extends d {
    constructor(e) {
      super(e);
    }
    static fromAffine(e) {
      return new U(w.Point.fromAffine(e));
    }
    assertSame(e) {
      if (!(e instanceof U)) throw Error("RistrettoPoint expected");
    }
    init(e) {
      return new U(e);
    }
    static hashToCurve(e) {
      var t;
      let r, i;
      return (
        (t = (0, a.z)("ristrettoHash", e, 64)),
        (0, f.C)(t, 64),
        (r = z(Z(t.subarray(0, 32)))),
        (i = z(Z(t.subarray(32, 64)))),
        new U(r.add(i))
      );
    }
    static fromBytes(e) {
      let t, r, n, c, s, o, d, u, h, B, p, b, x;
      (0, f.C)(e, 32);
      let { a: v, d: S } = y,
        O = Z(e);
      if (!(0, a.v)(I.toBytes(O), e) || (0, i.f)(O, g))
        throw Error("invalid ristretto255 encoding 1");
      let R = ((t = O * O), I.create(t)),
        T = ((r = m + v * R), I.create(r)),
        _ = ((n = m - v * R), I.create(n)),
        q = ((c = T * T), I.create(c)),
        A = ((s = _ * _), I.create(s)),
        F = ((o = v * S * q - A), I.create(o)),
        { isValid: K, value: z } = ((d = F * A), E(m, I.create(d))),
        G = ((u = z * _), I.create(u)),
        P = ((h = z * G * F), I.create(h)),
        C = ((B = (O + O) * G), I.create(B));
      (0, i.f)(C, g) && ((p = -C), (C = I.create(p)));
      let Y = ((b = T * P), I.create(b)),
        V = ((x = C * Y), I.create(x));
      if (!K || (0, i.f)(V, g) || Y === l)
        throw Error("invalid ristretto255 encoding 2");
      return new U(new w.Point(C, Y, m, V));
    }
    static fromHex(e) {
      return U.fromBytes((0, a.z)("ristrettoHex", e, 32));
    }
    static msm(e, t) {
      return (0, r.g)(U, w.Point.Fn, e, t);
    }
    toBytes() {
      let e,
        t,
        f,
        r,
        a,
        n,
        c,
        s,
        o,
        d,
        u,
        l,
        h,
        { X: B, Y: p, Z: b, T: y } = this.ep,
        v =
          ((e = b + p),
          (f = I.create(e) * ((t = b - p), I.create(t))),
          I.create(f)),
        w = ((r = B * p), I.create(r)),
        { value: S } =
          ((n = v * ((a = w * w), I.create(a))), E(m, I.create(n))),
        O = ((c = S * v), I.create(c)),
        R = ((s = S * w), I.create(s)),
        T = ((o = O * R * y), I.create(o));
      if ((0, i.f)(y * T, g)) {
        let e,
          t,
          f = ((e = p * x), I.create(e)),
          r = ((t = B * x), I.create(t));
        ((B = f), (p = r), (h = I.create(O * q)));
      } else h = R;
      (0, i.f)(B * T, g) && ((d = -p), (p = I.create(d)));
      let _ = ((u = (b - p) * h), I.create(u));
      return ((0, i.f)(_, g) && ((l = -_), (_ = I.create(l))), I.toBytes(_));
    }
    equals(e) {
      let t, f, r, a;
      this.assertSame(e);
      let { X: i, Y: n } = this.ep,
        { X: c, Y: s } = e.ep,
        o = ((t = i * s), I.create(t) === ((f = n * c), I.create(f))),
        d = ((r = n * s), I.create(r) === ((a = i * c), I.create(a)));
      return o || d;
    }
    is0() {
      return this.equals(U.ZERO);
    }
  }
  ((U.BASE = new U(w.Point.BASE)),
    (U.ZERO = new U(w.Point.ZERO)),
    (U.Fp = I),
    (U.Fn = v),
    e.s(["f", 0, w], 430981));
};
