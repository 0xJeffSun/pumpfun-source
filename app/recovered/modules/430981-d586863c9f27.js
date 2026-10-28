// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(837474),
    r = e.i(944445),
    n = e.i(365490),
    a = e.i(878660),
    i = e.i(288667);
  let o = BigInt(0),
    s = BigInt(1),
    f = BigInt(2),
    l = BigInt(8);
  class c {
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
  var d = e.i(79262);
  (BigInt(0), BigInt(1), BigInt(2));
  let u = BigInt(0),
    p = BigInt(1),
    h = BigInt(2),
    g = BigInt(3),
    m = BigInt(5),
    y = BigInt(8),
    v = BigInt(
      "0x7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffed",
    ),
    E = {
      p: v,
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
  function b(e, t) {
    var r;
    let n,
      a,
      o,
      s,
      f,
      l,
      c,
      d,
      u,
      g,
      y,
      E,
      b,
      x,
      S = (0, i.K)(t * t * t, v),
      _ = ((r = e * (0, i.K)(S * S * t, v)),
      (n = BigInt(10)),
      (a = BigInt(20)),
      (o = BigInt(40)),
      (s = BigInt(80)),
      (f = (((r * r) % v) * r) % v),
      (l = ((0, i.m)(f, h, v) * f) % v),
      (c = ((0, i.m)(l, p, v) * r) % v),
      (d = ((0, i.m)(c, m, v) * c) % v),
      (u = ((0, i.m)(d, n, v) * d) % v),
      (g = ((0, i.m)(u, a, v) * u) % v),
      (y = ((0, i.m)(g, o, v) * g) % v),
      (E = ((0, i.m)(y, s, v) * y) % v),
      (b = ((0, i.m)(E, s, v) * y) % v),
      (x = ((0, i.m)(b, n, v) * d) % v),
      { pow_p_5_8: ((0, i.m)(x, h, v) * r) % v, b2: f }).pow_p_5_8,
      C = (0, i.K)(e * S * _, v),
      I = (0, i.K)(t * C * C, v),
      B = C,
      M = (0, i.K)(C * w, v),
      k = I === e,
      A = I === (0, i.K)(-e, v),
      T = I === (0, i.K)(-e * w, v);
    return (
      k && (C = B),
      (A || T) && (C = M),
      (0, i.f)(C, v) && (C = (0, i.K)(-C, v)),
      { isValid: k || A, value: C }
    );
  }
  let x = (0, i.N)(E.p, { isLE: !0 }),
    S = (0, i.N)(E.n, { isLE: !0 }),
    _ = (function (e) {
      let t,
        c,
        d,
        u,
        {
          CURVE: p,
          curveOpts: h,
          hash: g,
          eddsaOpts: m,
        } = ((t = {
          a: e.a,
          d: e.d,
          p: e.Fp.ORDER,
          n: e.n,
          h: e.h,
          Gx: e.Gx,
          Gy: e.Gy,
        }),
        (c = {
          Fp: e.Fp,
          Fn: (0, i.N)(t.n, e.nBitLength, !0),
          uvRatio: e.uvRatio,
        }),
        (d = {
          randomBytes: e.randomBytes,
          adjustScalarBytes: e.adjustScalarBytes,
          domain: e.domain,
          prehash: e.prehash,
          mapToCurve: e.mapToCurve,
        }),
        { CURVE: t, curveOpts: c, hash: e.hash, eddsaOpts: d }),
        y = (function (e, t, n = {}) {
          if ("function" != typeof t)
            throw Error('"hash" function param is required');
          (0, a.S)(
            n,
            {},
            {
              adjustScalarBytes: "function",
              randomBytes: "function",
              domain: "function",
              prehash: "function",
              mapToCurve: "function",
            },
          );
          let { prehash: i } = n,
            { BASE: o, Fp: f, Fn: l } = e,
            c = n.randomBytes || r.a,
            d = n.adjustScalarBytes || ((e) => e),
            u =
              n.domain ||
              ((e, t, r) => {
                if (((0, a.Y)(r, "phflag"), t.length || r))
                  throw Error("Contexts/pre-hash are not supported");
                return e;
              });
          function p(e) {
            return l.create((0, a.F)(e));
          }
          function h(e) {
            var r;
            let n,
              i,
              s,
              f,
              l,
              {
                head: c,
                prefix: u,
                scalar: h,
              } = ((r = e),
              (n = E.secretKey),
              (r = (0, a.z)("private key", r, n)),
              (s = d(
                (i = (0, a.z)("hashed private key", t(r), 2 * n)).slice(0, n),
              )),
              (f = i.slice(n, 2 * n)),
              (l = p(s)),
              { head: s, prefix: f, scalar: l }),
              g = o.multiply(h),
              m = g.toBytes();
            return { head: c, prefix: u, scalar: h, point: g, pointBytes: m };
          }
          function g(e) {
            return h(e).pointBytes;
          }
          function m(e = Uint8Array.of(), ...n) {
            return p(t(u((0, r.t)(...n), (0, a.z)("context", e), !!i)));
          }
          let y = { zip215: !0 },
            v = f.BYTES,
            E = { secretKey: v, publicKey: v, signature: 2 * v, seed: v };
          function w(e = c(E.seed)) {
            return (0, a.G)(e, E.seed, "seed");
          }
          let b = {
            getExtendedPublicKey: h,
            randomSecretKey: w,
            isValidSecretKey: function (e) {
              return (0, r.g)(e) && e.length === l.BYTES;
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
                n = E.publicKey,
                a = 32 === n;
              if (!a && 57 !== n) throw Error("only defined for 25519 and 448");
              let i = a ? f.div(s + r, s - r) : f.div(r - s, r + s);
              return f.toBytes(i);
            },
            toMontgomerySecret(e) {
              let r = E.secretKey;
              return ((0, a.G)(e, r), d(t(e.subarray(0, r))).subarray(0, r));
            },
            randomPrivateKey: w,
            precompute: (t = 8, r = e.BASE) => r.precompute(t, !1),
          };
          return Object.freeze({
            keygen: function (e) {
              let t = b.randomSecretKey(e);
              return { secretKey: t, publicKey: g(t) };
            },
            getPublicKey: g,
            sign: function (e, t, n = {}) {
              ((e = (0, a.z)("message", e)), i && (e = i(e)));
              let { prefix: s, scalar: f, pointBytes: c } = h(t),
                d = m(n.context, s, e),
                u = o.multiply(d).toBytes(),
                p = m(n.context, u, c, e),
                g = l.create(d + p * f);
              if (!l.isValid(g)) throw Error("sign failed: invalid s");
              let y = (0, r.t)(u, l.toBytes(g));
              return (0, a.G)(y, E.signature, "result");
            },
            verify: function (t, r, n, s = y) {
              let f,
                l,
                c,
                { context: d, zip215: u } = s,
                p = E.signature;
              ((t = (0, a.z)("signature", t, p)),
                (r = (0, a.z)("message", r)),
                (n = (0, a.z)("publicKey", n, E.publicKey)),
                void 0 !== u && (0, a.Y)(u, "zip215"),
                i && (r = i(r)));
              let h = p / 2,
                g = t.subarray(0, h),
                v = (0, a.F)(t.subarray(h, p));
              try {
                ((f = e.fromBytes(n, u)),
                  (l = e.fromBytes(g, u)),
                  (c = o.multiplyUnsafe(v)));
              } catch (e) {
                return !1;
              }
              if (!u && f.isSmallOrder()) return !1;
              let w = m(d, l.toBytes(), f.toBytes(), r);
              return l
                .add(f.multiplyUnsafe(w))
                .subtract(c)
                .clearCofactor()
                .is0();
            },
            utils: b,
            Point: e,
            lengths: E,
          });
        })(
          (function (e, t = {}) {
            var i, c;
            let d,
              u,
              p,
              h,
              g,
              m = (0, n.o)("edwards", e, t, t.FpFnLE),
              { Fp: y, Fn: v } = m,
              E = m.CURVE,
              { h: w } = E;
            (0, a.S)(t, {}, { uvRatio: "function" });
            let b = f << (BigInt(8 * v.BYTES) - s),
              x =
                t.uvRatio ||
                ((e, t) => {
                  try {
                    return { isValid: !0, value: y.sqrt(y.div(e, t)) };
                  } catch (e) {
                    return { isValid: !1, value: o };
                  }
                });
            if (
              ((i = E.Gx),
              (c = E.Gy),
              (d = y.sqr(i)),
              (u = y.sqr(c)),
              (p = y.add(y.mul(E.a, d), u)),
              (h = y.add(y.ONE, y.mul(E.d, y.mul(d, u)))),
              !y.eql(p, h))
            )
              throw Error("bad curve params: generator point");
            function S(e, t, r = !1) {
              let n = r ? s : o;
              return ((0, a._)("coordinate " + e, t, n, b), t);
            }
            function _(e) {
              if (!(e instanceof B)) throw Error("ExtendedPoint expected");
            }
            let C = (0, a.W)((e, t) => {
                let r,
                  n,
                  { X: a, Y: i, Z: f } = e,
                  c = e.is0();
                null == t && (t = c ? l : y.inv(f));
                let d = ((r = a * t), y.create(r)),
                  u = ((n = i * t), y.create(n)),
                  p = y.mul(f, t);
                if (c) return { x: o, y: s };
                if (p !== s) throw Error("invZ was invalid");
                return { x: d, y: u };
              }),
              I = (0, a.W)((e) => {
                let t,
                  r,
                  n,
                  a,
                  i,
                  o,
                  s,
                  f,
                  l,
                  c,
                  d,
                  u,
                  { a: p, d: h } = E;
                if (e.is0()) throw Error("bad point: ZERO");
                let { X: g, Y: m, Z: v, T: w } = e,
                  b = ((t = g * g), y.create(t)),
                  x = ((r = m * m), y.create(r)),
                  S = ((n = v * v), y.create(n)),
                  _ = ((a = S * S), y.create(a));
                if (
                  ((s = S * ((i = b * p), (o = y.create(i) + x), y.create(o))),
                  y.create(s) !==
                    ((c =
                      _ + ((l = h * ((f = b * x), y.create(f))), y.create(l))),
                    y.create(c)))
                )
                  throw Error("bad point: equation left != right (1)");
                if (((d = g * m), y.create(d) !== ((u = v * w), y.create(u))))
                  throw Error("bad point: equation left != right (2)");
                return !0;
              });
            class B {
              constructor(e, t, r, n) {
                ((this.X = S("x", e)),
                  (this.Y = S("y", t)),
                  (this.Z = S("z", r, !0)),
                  (this.T = S("t", n)),
                  Object.freeze(this));
              }
              static CURVE() {
                return E;
              }
              static fromAffine(e) {
                let t;
                if (e instanceof B) throw Error("extended point not allowed");
                let { x: r, y: n } = e || {};
                return (
                  S("x", r),
                  S("y", n),
                  new B(r, n, s, ((t = r * n), y.create(t)))
                );
              }
              static fromBytes(e, t = !1) {
                let r,
                  n,
                  i,
                  f,
                  l = y.BYTES,
                  { a: c, d } = E;
                ((e = (0, a.t)((0, a.G)(e, l, "point"))),
                  (0, a.Y)(t, "zip215"));
                let u = (0, a.t)(e),
                  p = e[l - 1];
                u[l - 1] = -129 & p;
                let h = (0, a.F)(u),
                  g = t ? b : y.ORDER;
                (0, a._)("point.y", h, o, g);
                let m = ((r = h * h), y.create(r)),
                  { isValid: v, value: w } = x(
                    ((n = m - s), y.create(n)),
                    ((i = d * m - c), y.create(i)),
                  );
                if (!v) throw Error("bad point: invalid y coordinate");
                let S = (w & s) === s,
                  _ = (128 & p) != 0;
                if (!t && w === o && _) throw Error("bad point: x=0 and x_0=1");
                return (
                  _ !== S && ((f = -w), (w = y.create(f))),
                  B.fromAffine({ x: w, y: h })
                );
              }
              static fromHex(e, t = !1) {
                return B.fromBytes((0, a.z)("point", e), t);
              }
              get x() {
                return this.toAffine().x;
              }
              get y() {
                return this.toAffine().y;
              }
              precompute(e = 8, t = !0) {
                return (M.createCache(this, e), t || this.multiply(f), this);
              }
              assertValidity() {
                I(this);
              }
              equals(e) {
                let t, r, n, a;
                _(e);
                let { X: i, Y: o, Z: s } = this,
                  { X: f, Y: l, Z: c } = e,
                  d = ((t = i * c), y.create(t)),
                  u = ((r = f * s), y.create(r)),
                  p = ((n = o * c), y.create(n)),
                  h = ((a = l * s), y.create(a));
                return d === u && p === h;
              }
              is0() {
                return this.equals(B.ZERO);
              }
              negate() {
                let e, t;
                return new B(
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
                  n,
                  a,
                  i,
                  o,
                  s,
                  l,
                  c,
                  d,
                  { a: u } = E,
                  { X: p, Y: h, Z: g } = this,
                  m = ((e = p * p), y.create(e)),
                  v = ((t = h * h), y.create(t)),
                  w = ((n = f * ((r = g * g), y.create(r))), y.create(n)),
                  b = ((a = u * m), y.create(a)),
                  x = p + h,
                  S = ((i = x * x), (o = y.create(i) - m - v), y.create(o)),
                  _ = b + v,
                  C = _ - w,
                  I = b - v,
                  M = ((s = S * C), y.create(s)),
                  k = ((l = _ * I), y.create(l)),
                  A = ((c = S * I), y.create(c));
                return new B(M, k, ((d = C * _), y.create(d)), A);
              }
              add(e) {
                let t, r, n, a, i, o, s, f, l, c;
                _(e);
                let { a: d, d: u } = E,
                  { X: p, Y: h, Z: g, T: m } = this,
                  { X: v, Y: w, Z: b, T: x } = e,
                  S = ((t = p * v), y.create(t)),
                  C = ((r = h * w), y.create(r)),
                  I = ((n = m * u * x), y.create(n)),
                  M = ((a = g * b), y.create(a)),
                  k = ((i = (p + h) * (v + w) - S - C), y.create(i)),
                  A = M - I,
                  T = M + I,
                  V = ((o = C - d * S), y.create(o)),
                  O = ((s = k * A), y.create(s)),
                  L = ((f = T * V), y.create(f)),
                  P = ((l = k * V), y.create(l));
                return new B(O, L, ((c = A * T), y.create(c)), P);
              }
              subtract(e) {
                return this.add(e.negate());
              }
              multiply(e) {
                if (!v.isValidNot0(e))
                  throw Error("invalid scalar: expected 1 <= sc < curve.n");
                let { p: t, f: r } = M.cached(this, e, (e) => (0, n.s)(B, e));
                return (0, n.s)(B, [t, r])[0];
              }
              multiplyUnsafe(e, t = B.ZERO) {
                if (!v.isValid(e))
                  throw Error("invalid scalar: expected 0 <= sc < curve.n");
                return e === o
                  ? B.ZERO
                  : this.is0() || e === s
                    ? this
                    : M.unsafe(this, e, (e) => (0, n.s)(B, e), t);
              }
              isSmallOrder() {
                return this.multiplyUnsafe(w).is0();
              }
              isTorsionFree() {
                return M.unsafe(this, E.n).is0();
              }
              toAffine(e) {
                return C(this, e);
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
                return (0, n.s)(B, e);
              }
              static msm(e, t) {
                return (0, n.g)(B, v, e, t);
              }
              _setWindowSize(e) {
                this.precompute(e);
              }
              toRawBytes() {
                return this.toBytes();
              }
            }
            ((B.BASE = new B(E.Gx, E.Gy, s, ((g = E.Gx * E.Gy), y.create(g)))),
              (B.ZERO = new B(o, s, s, o)),
              (B.Fp = y),
              (B.Fn = v));
            let M = new n.p(B, v.BITS);
            return (B.BASE.precompute(8), B);
          })(p, h),
          g,
          m,
        );
      return (
        (u = y.Point),
        Object.assign({}, y, {
          ExtendedPoint: u,
          CURVE: e,
          nBitLength: u.Fn.BITS,
          nByteLength: u.Fn.BYTES,
        })
      );
    })({
      ...E,
      Fp: x,
      hash: t.s,
      adjustScalarBytes: function (e) {
        return ((e[0] &= 248), (e[31] &= 127), (e[31] |= 64), e);
      },
      uvRatio: b,
    }),
    C = (v + g) / y,
    I = x.pow(h, C),
    B = x.sqrt(x.neg(x.ONE)),
    M = (0, i.s)(x, x.neg(BigInt(486664)));
  (0, d.O)(
    _.Point,
    (e) =>
      (function (e) {
        let t,
          r,
          n,
          a,
          o,
          s,
          f,
          l,
          c,
          d,
          u,
          g,
          E,
          w,
          b,
          S,
          _,
          C,
          k,
          A,
          T,
          V,
          O,
          {
            xMn: L,
            xMd: P,
            yMn: R,
            yMd: N,
          } = ((t = (v - m) / y),
          (r = BigInt(486662)),
          (n = x.sqr(e)),
          (n = x.mul(n, h)),
          (a = x.add(n, x.ONE)),
          (o = x.neg(r)),
          (s = x.sqr(a)),
          (f = x.mul(s, a)),
          (l = x.mul(n, r)),
          (l = x.mul(l, o)),
          (l = x.add(l, s)),
          (l = x.mul(l, o)),
          (c = x.sqr(f)),
          (s = x.sqr(c)),
          (c = x.mul(c, f)),
          (c = x.mul(c, l)),
          (s = x.mul(s, c)),
          (d = x.pow(s, t)),
          (d = x.mul(d, c)),
          (u = x.mul(d, B)),
          (s = x.sqr(d)),
          (s = x.mul(s, f)),
          (g = x.eql(s, l)),
          (E = x.cmov(u, d, g)),
          (w = x.mul(o, n)),
          (b = x.mul(d, e)),
          (b = x.mul(b, I)),
          (S = x.mul(b, B)),
          (_ = x.mul(l, n)),
          (s = x.sqr(b)),
          (s = x.mul(s, f)),
          (C = x.eql(s, _)),
          (k = x.cmov(S, b, C)),
          (s = x.sqr(E)),
          (s = x.mul(s, f)),
          (A = x.eql(s, l)),
          (T = x.cmov(w, o, A)),
          (V = x.cmov(k, E, A)),
          (O = x.isOdd(V)),
          { xMn: T, xMd: a, yMn: (V = x.cmov(V, x.neg(V), A !== O)), yMd: p }),
          U = x.mul(L, N);
        U = x.mul(U, M);
        let D = x.mul(P, R),
          F = x.sub(L, P),
          $ = x.add(L, P),
          K = x.mul(D, $),
          z = x.eql(K, x.ZERO);
        ((U = x.cmov(U, x.ZERO, z)),
          (D = x.cmov(D, x.ONE, z)),
          (F = x.cmov(F, x.ONE, z)),
          ($ = x.cmov($, x.ONE, z)));
        let [W, j] = (0, i.R)(x, [D, $], !0);
        return { x: x.mul(U, W), y: x.mul(F, j) };
      })(e[0]),
    {
      DST: "edwards25519_XMD:SHA-512_ELL2_RO_",
      encodeDST: "edwards25519_XMD:SHA-512_ELL2_NU_",
      p: v,
      m: 1,
      k: 128,
      expand: "xmd",
      hash: t.s,
    },
  );
  let k = BigInt(
      "25063068953384623474111414158702152701244531502492656460079210482610430750235",
    ),
    A = BigInt(
      "54469307008909316920995813868745141605393597292927456921205312896311721017578",
    ),
    T = BigInt(
      "1159843021668779879193775521855586647937357759715417654439879720876111806838",
    ),
    V = BigInt(
      "40440834346308536858101042469323190826248399146238708352240133220865137265952",
    ),
    O = BigInt(
      "0x7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff",
    ),
    L = (e) => _.Point.Fp.create((0, a.F)(e) & O);
  function P(e) {
    let t,
      r,
      n,
      a,
      o,
      s,
      f,
      l,
      c,
      d,
      u,
      h,
      g,
      m,
      y,
      { d: S } = E,
      C = ((t = w * e * e), x.create(t)),
      I = ((r = (C + p) * T), x.create(r)),
      B = BigInt(-1),
      M = ((a = (B - S * C) * ((n = C + S), x.create(n))), x.create(a)),
      { isValid: A, value: O } = b(I, M),
      L = ((o = O * e), x.create(o));
    ((0, i.f)(L, v) || ((s = -L), (L = x.create(s))),
      A || (O = L),
      A || (B = C));
    let P = ((f = B * (C - p) * V - M), x.create(f)),
      R = O * O,
      N = ((l = (O + O) * M), x.create(l)),
      U = ((c = P * k), x.create(c)),
      D = ((d = p - R), x.create(d)),
      F = ((u = p + R), x.create(u));
    return new _.Point(
      ((h = N * F), x.create(h)),
      ((g = D * U), x.create(g)),
      ((m = U * F), x.create(m)),
      ((y = N * D), x.create(y)),
    );
  }
  class R extends c {
    constructor(e) {
      super(e);
    }
    static fromAffine(e) {
      return new R(_.Point.fromAffine(e));
    }
    assertSame(e) {
      if (!(e instanceof R)) throw Error("RistrettoPoint expected");
    }
    init(e) {
      return new R(e);
    }
    static hashToCurve(e) {
      var t;
      let n, i;
      return (
        (t = (0, a.z)("ristrettoHash", e, 64)),
        (0, r.C)(t, 64),
        (n = P(L(t.subarray(0, 32)))),
        (i = P(L(t.subarray(32, 64)))),
        new R(n.add(i))
      );
    }
    static fromBytes(e) {
      let t, n, o, s, f, l, c, d, h, g, m, y, w;
      (0, r.C)(e, 32);
      let { a: S, d: C } = E,
        I = L(e);
      if (!(0, a.v)(x.toBytes(I), e) || (0, i.f)(I, v))
        throw Error("invalid ristretto255 encoding 1");
      let B = ((t = I * I), x.create(t)),
        M = ((n = p + S * B), x.create(n)),
        k = ((o = p - S * B), x.create(o)),
        A = ((s = M * M), x.create(s)),
        T = ((f = k * k), x.create(f)),
        V = ((l = S * C * A - T), x.create(l)),
        { isValid: O, value: P } = ((c = V * T), b(p, x.create(c))),
        N = ((d = P * k), x.create(d)),
        U = ((h = P * N * V), x.create(h)),
        D = ((g = (I + I) * N), x.create(g));
      (0, i.f)(D, v) && ((m = -D), (D = x.create(m)));
      let F = ((y = M * U), x.create(y)),
        $ = ((w = D * F), x.create(w));
      if (!O || (0, i.f)($, v) || F === u)
        throw Error("invalid ristretto255 encoding 2");
      return new R(new _.Point(D, F, p, $));
    }
    static fromHex(e) {
      return R.fromBytes((0, a.z)("ristrettoHex", e, 32));
    }
    static msm(e, t) {
      return (0, n.g)(R, _.Point.Fn, e, t);
    }
    toBytes() {
      let e,
        t,
        r,
        n,
        a,
        o,
        s,
        f,
        l,
        c,
        d,
        u,
        h,
        { X: g, Y: m, Z: y, T: E } = this.ep,
        S =
          ((e = y + m),
          (r = x.create(e) * ((t = y - m), x.create(t))),
          x.create(r)),
        _ = ((n = g * m), x.create(n)),
        { value: C } =
          ((o = S * ((a = _ * _), x.create(a))), b(p, x.create(o))),
        I = ((s = C * S), x.create(s)),
        B = ((f = C * _), x.create(f)),
        M = ((l = I * B * E), x.create(l));
      if ((0, i.f)(E * M, v)) {
        let e,
          t,
          r = ((e = m * w), x.create(e)),
          n = ((t = g * w), x.create(t));
        ((g = r), (m = n), (h = x.create(I * A)));
      } else h = B;
      (0, i.f)(g * M, v) && ((c = -m), (m = x.create(c)));
      let k = ((d = (y - m) * h), x.create(d));
      return ((0, i.f)(k, v) && ((u = -k), (k = x.create(u))), x.toBytes(k));
    }
    equals(e) {
      let t, r, n, a;
      this.assertSame(e);
      let { X: i, Y: o } = this.ep,
        { X: s, Y: f } = e.ep,
        l = ((t = i * f), x.create(t) === ((r = o * s), x.create(r))),
        c = ((n = o * f), x.create(n) === ((a = i * s), x.create(a)));
      return l || c;
    }
    is0() {
      return this.equals(R.ZERO);
    }
  }
  ((R.BASE = new R(_.Point.BASE)),
    (R.ZERO = new R(_.Point.ZERO)),
    (R.Fp = x),
    (R.Fn = S),
    e.s(["f", 0, _], 430981));
};
