// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(837474),
    r = e.i(944445),
    n = e.i(365490),
    f = e.i(878660),
    i = e.i(288667);
  let s = BigInt(0),
    a = BigInt(1),
    c = BigInt(2),
    o = BigInt(8);
  class u {
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
  var l = e.i(79262);
  (BigInt(0), BigInt(1), BigInt(2));
  let h = BigInt(0),
    d = BigInt(1),
    p = BigInt(2),
    g = BigInt(3),
    m = BigInt(5),
    b = BigInt(8),
    y = BigInt(
      "0x7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffed",
    ),
    w = {
      p: y,
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
    B = BigInt(
      "19681161376707505956807079304988542015446066515923890162744021073123829784752",
    );
  function v(e, t) {
    var r;
    let n,
      f,
      s,
      a,
      c,
      o,
      u,
      l,
      h,
      g,
      b,
      w,
      v,
      E,
      x = (0, i.K)(t * t * t, y),
      O = ((r = e * (0, i.K)(x * x * t, y)),
      (n = BigInt(10)),
      (f = BigInt(20)),
      (s = BigInt(40)),
      (a = BigInt(80)),
      (c = (((r * r) % y) * r) % y),
      (o = ((0, i.m)(c, p, y) * c) % y),
      (u = ((0, i.m)(o, d, y) * r) % y),
      (l = ((0, i.m)(u, m, y) * u) % y),
      (h = ((0, i.m)(l, n, y) * l) % y),
      (g = ((0, i.m)(h, f, y) * h) % y),
      (b = ((0, i.m)(g, s, y) * g) % y),
      (w = ((0, i.m)(b, a, y) * b) % y),
      (v = ((0, i.m)(w, a, y) * b) % y),
      (E = ((0, i.m)(v, n, y) * l) % y),
      { pow_p_5_8: ((0, i.m)(E, p, y) * r) % y, b2: c }).pow_p_5_8,
      I = (0, i.K)(e * x * O, y),
      S = (0, i.K)(t * I * I, y),
      A = I,
      R = (0, i.K)(I * B, y),
      N = S === e,
      _ = S === (0, i.K)(-e, y),
      T = S === (0, i.K)(-e * B, y);
    return (
      N && (I = A),
      (_ || T) && (I = R),
      (0, i.f)(I, y) && (I = (0, i.K)(-I, y)),
      { isValid: N || _, value: I }
    );
  }
  let E = (0, i.N)(w.p, { isLE: !0 }),
    x = (0, i.N)(w.n, { isLE: !0 }),
    O = (function (e) {
      let t,
        u,
        l,
        h,
        {
          CURVE: d,
          curveOpts: p,
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
        (u = {
          Fp: e.Fp,
          Fn: (0, i.N)(t.n, e.nBitLength, !0),
          uvRatio: e.uvRatio,
        }),
        (l = {
          randomBytes: e.randomBytes,
          adjustScalarBytes: e.adjustScalarBytes,
          domain: e.domain,
          prehash: e.prehash,
          mapToCurve: e.mapToCurve,
        }),
        { CURVE: t, curveOpts: u, hash: e.hash, eddsaOpts: l }),
        b = (function (e, t, n = {}) {
          if ("function" != typeof t)
            throw Error('"hash" function param is required');
          (0, f.S)(
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
            { BASE: s, Fp: c, Fn: o } = e,
            u = n.randomBytes || r.a,
            l = n.adjustScalarBytes || ((e) => e),
            h =
              n.domain ||
              ((e, t, r) => {
                if (((0, f.Y)(r, "phflag"), t.length || r))
                  throw Error("Contexts/pre-hash are not supported");
                return e;
              });
          function d(e) {
            return o.create((0, f.F)(e));
          }
          function p(e) {
            var r;
            let n,
              i,
              a,
              c,
              o,
              {
                head: u,
                prefix: h,
                scalar: p,
              } = ((r = e),
              (n = w.secretKey),
              (r = (0, f.z)("private key", r, n)),
              (a = l(
                (i = (0, f.z)("hashed private key", t(r), 2 * n)).slice(0, n),
              )),
              (c = i.slice(n, 2 * n)),
              (o = d(a)),
              { head: a, prefix: c, scalar: o }),
              g = s.multiply(p),
              m = g.toBytes();
            return { head: u, prefix: h, scalar: p, point: g, pointBytes: m };
          }
          function g(e) {
            return p(e).pointBytes;
          }
          function m(e = Uint8Array.of(), ...n) {
            return d(t(h((0, r.t)(...n), (0, f.z)("context", e), !!i)));
          }
          let b = { zip215: !0 },
            y = c.BYTES,
            w = { secretKey: y, publicKey: y, signature: 2 * y, seed: y };
          function B(e = u(w.seed)) {
            return (0, f.G)(e, w.seed, "seed");
          }
          let v = {
            getExtendedPublicKey: p,
            randomSecretKey: B,
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
                n = w.publicKey,
                f = 32 === n;
              if (!f && 57 !== n) throw Error("only defined for 25519 and 448");
              let i = f ? c.div(a + r, a - r) : c.div(r - a, r + a);
              return c.toBytes(i);
            },
            toMontgomerySecret(e) {
              let r = w.secretKey;
              return ((0, f.G)(e, r), l(t(e.subarray(0, r))).subarray(0, r));
            },
            randomPrivateKey: B,
            precompute: (t = 8, r = e.BASE) => r.precompute(t, !1),
          };
          return Object.freeze({
            keygen: function (e) {
              let t = v.randomSecretKey(e);
              return { secretKey: t, publicKey: g(t) };
            },
            getPublicKey: g,
            sign: function (e, t, n = {}) {
              ((e = (0, f.z)("message", e)), i && (e = i(e)));
              let { prefix: a, scalar: c, pointBytes: u } = p(t),
                l = m(n.context, a, e),
                h = s.multiply(l).toBytes(),
                d = m(n.context, h, u, e),
                g = o.create(l + d * c);
              if (!o.isValid(g)) throw Error("sign failed: invalid s");
              let b = (0, r.t)(h, o.toBytes(g));
              return (0, f.G)(b, w.signature, "result");
            },
            verify: function (t, r, n, a = b) {
              let c,
                o,
                u,
                { context: l, zip215: h } = a,
                d = w.signature;
              ((t = (0, f.z)("signature", t, d)),
                (r = (0, f.z)("message", r)),
                (n = (0, f.z)("publicKey", n, w.publicKey)),
                void 0 !== h && (0, f.Y)(h, "zip215"),
                i && (r = i(r)));
              let p = d / 2,
                g = t.subarray(0, p),
                y = (0, f.F)(t.subarray(p, d));
              try {
                ((c = e.fromBytes(n, h)),
                  (o = e.fromBytes(g, h)),
                  (u = s.multiplyUnsafe(y)));
              } catch (e) {
                return !1;
              }
              if (!h && c.isSmallOrder()) return !1;
              let B = m(l, o.toBytes(), c.toBytes(), r);
              return o
                .add(c.multiplyUnsafe(B))
                .subtract(u)
                .clearCofactor()
                .is0();
            },
            utils: v,
            Point: e,
            lengths: w,
          });
        })(
          (function (e, t = {}) {
            var i, u;
            let l,
              h,
              d,
              p,
              g,
              m = (0, n.o)("edwards", e, t, t.FpFnLE),
              { Fp: b, Fn: y } = m,
              w = m.CURVE,
              { h: B } = w;
            (0, f.S)(t, {}, { uvRatio: "function" });
            let v = c << (BigInt(8 * y.BYTES) - a),
              E =
                t.uvRatio ||
                ((e, t) => {
                  try {
                    return { isValid: !0, value: b.sqrt(b.div(e, t)) };
                  } catch (e) {
                    return { isValid: !1, value: s };
                  }
                });
            if (
              ((i = w.Gx),
              (u = w.Gy),
              (l = b.sqr(i)),
              (h = b.sqr(u)),
              (d = b.add(b.mul(w.a, l), h)),
              (p = b.add(b.ONE, b.mul(w.d, b.mul(l, h)))),
              !b.eql(d, p))
            )
              throw Error("bad curve params: generator point");
            function x(e, t, r = !1) {
              let n = r ? a : s;
              return ((0, f._)("coordinate " + e, t, n, v), t);
            }
            function O(e) {
              if (!(e instanceof A)) throw Error("ExtendedPoint expected");
            }
            let I = (0, f.W)((e, t) => {
                let r,
                  n,
                  { X: f, Y: i, Z: c } = e,
                  u = e.is0();
                null == t && (t = u ? o : b.inv(c));
                let l = ((r = f * t), b.create(r)),
                  h = ((n = i * t), b.create(n)),
                  d = b.mul(c, t);
                if (u) return { x: s, y: a };
                if (d !== a) throw Error("invZ was invalid");
                return { x: l, y: h };
              }),
              S = (0, f.W)((e) => {
                let t,
                  r,
                  n,
                  f,
                  i,
                  s,
                  a,
                  c,
                  o,
                  u,
                  l,
                  h,
                  { a: d, d: p } = w;
                if (e.is0()) throw Error("bad point: ZERO");
                let { X: g, Y: m, Z: y, T: B } = e,
                  v = ((t = g * g), b.create(t)),
                  E = ((r = m * m), b.create(r)),
                  x = ((n = y * y), b.create(n)),
                  O = ((f = x * x), b.create(f));
                if (
                  ((a = x * ((i = v * d), (s = b.create(i) + E), b.create(s))),
                  b.create(a) !==
                    ((u =
                      O + ((o = p * ((c = v * E), b.create(c))), b.create(o))),
                    b.create(u)))
                )
                  throw Error("bad point: equation left != right (1)");
                if (((l = g * m), b.create(l) !== ((h = y * B), b.create(h))))
                  throw Error("bad point: equation left != right (2)");
                return !0;
              });
            class A {
              constructor(e, t, r, n) {
                ((this.X = x("x", e)),
                  (this.Y = x("y", t)),
                  (this.Z = x("z", r, !0)),
                  (this.T = x("t", n)),
                  Object.freeze(this));
              }
              static CURVE() {
                return w;
              }
              static fromAffine(e) {
                let t;
                if (e instanceof A) throw Error("extended point not allowed");
                let { x: r, y: n } = e || {};
                return (
                  x("x", r),
                  x("y", n),
                  new A(r, n, a, ((t = r * n), b.create(t)))
                );
              }
              static fromBytes(e, t = !1) {
                let r,
                  n,
                  i,
                  c,
                  o = b.BYTES,
                  { a: u, d: l } = w;
                ((e = (0, f.t)((0, f.G)(e, o, "point"))),
                  (0, f.Y)(t, "zip215"));
                let h = (0, f.t)(e),
                  d = e[o - 1];
                h[o - 1] = -129 & d;
                let p = (0, f.F)(h),
                  g = t ? v : b.ORDER;
                (0, f._)("point.y", p, s, g);
                let m = ((r = p * p), b.create(r)),
                  { isValid: y, value: B } = E(
                    ((n = m - a), b.create(n)),
                    ((i = l * m - u), b.create(i)),
                  );
                if (!y) throw Error("bad point: invalid y coordinate");
                let x = (B & a) === a,
                  O = (128 & d) != 0;
                if (!t && B === s && O) throw Error("bad point: x=0 and x_0=1");
                return (
                  O !== x && ((c = -B), (B = b.create(c))),
                  A.fromAffine({ x: B, y: p })
                );
              }
              static fromHex(e, t = !1) {
                return A.fromBytes((0, f.z)("point", e), t);
              }
              get x() {
                return this.toAffine().x;
              }
              get y() {
                return this.toAffine().y;
              }
              precompute(e = 8, t = !0) {
                return (R.createCache(this, e), t || this.multiply(c), this);
              }
              assertValidity() {
                S(this);
              }
              equals(e) {
                let t, r, n, f;
                O(e);
                let { X: i, Y: s, Z: a } = this,
                  { X: c, Y: o, Z: u } = e,
                  l = ((t = i * u), b.create(t)),
                  h = ((r = c * a), b.create(r)),
                  d = ((n = s * u), b.create(n)),
                  p = ((f = o * a), b.create(f));
                return l === h && d === p;
              }
              is0() {
                return this.equals(A.ZERO);
              }
              negate() {
                let e, t;
                return new A(
                  ((e = -this.X), b.create(e)),
                  this.Y,
                  this.Z,
                  ((t = -this.T), b.create(t)),
                );
              }
              double() {
                let e,
                  t,
                  r,
                  n,
                  f,
                  i,
                  s,
                  a,
                  o,
                  u,
                  l,
                  { a: h } = w,
                  { X: d, Y: p, Z: g } = this,
                  m = ((e = d * d), b.create(e)),
                  y = ((t = p * p), b.create(t)),
                  B = ((n = c * ((r = g * g), b.create(r))), b.create(n)),
                  v = ((f = h * m), b.create(f)),
                  E = d + p,
                  x = ((i = E * E), (s = b.create(i) - m - y), b.create(s)),
                  O = v + y,
                  I = O - B,
                  S = v - y,
                  R = ((a = x * I), b.create(a)),
                  N = ((o = O * S), b.create(o)),
                  _ = ((u = x * S), b.create(u));
                return new A(R, N, ((l = I * O), b.create(l)), _);
              }
              add(e) {
                let t, r, n, f, i, s, a, c, o, u;
                O(e);
                let { a: l, d: h } = w,
                  { X: d, Y: p, Z: g, T: m } = this,
                  { X: y, Y: B, Z: v, T: E } = e,
                  x = ((t = d * y), b.create(t)),
                  I = ((r = p * B), b.create(r)),
                  S = ((n = m * h * E), b.create(n)),
                  R = ((f = g * v), b.create(f)),
                  N = ((i = (d + p) * (y + B) - x - I), b.create(i)),
                  _ = R - S,
                  T = R + S,
                  P = ((s = I - l * x), b.create(s)),
                  U = ((a = N * _), b.create(a)),
                  q = ((c = T * P), b.create(c)),
                  C = ((o = N * P), b.create(o));
                return new A(U, q, ((u = _ * T), b.create(u)), C);
              }
              subtract(e) {
                return this.add(e.negate());
              }
              multiply(e) {
                if (!y.isValidNot0(e))
                  throw Error("invalid scalar: expected 1 <= sc < curve.n");
                let { p: t, f: r } = R.cached(this, e, (e) => (0, n.s)(A, e));
                return (0, n.s)(A, [t, r])[0];
              }
              multiplyUnsafe(e, t = A.ZERO) {
                if (!y.isValid(e))
                  throw Error("invalid scalar: expected 0 <= sc < curve.n");
                return e === s
                  ? A.ZERO
                  : this.is0() || e === a
                    ? this
                    : R.unsafe(this, e, (e) => (0, n.s)(A, e), t);
              }
              isSmallOrder() {
                return this.multiplyUnsafe(B).is0();
              }
              isTorsionFree() {
                return R.unsafe(this, w.n).is0();
              }
              toAffine(e) {
                return I(this, e);
              }
              clearCofactor() {
                return B === a ? this : this.multiplyUnsafe(B);
              }
              toBytes() {
                let { x: e, y: t } = this.toAffine(),
                  r = b.toBytes(t);
                return ((r[r.length - 1] |= e & a ? 128 : 0), r);
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
                return (0, n.s)(A, e);
              }
              static msm(e, t) {
                return (0, n.g)(A, y, e, t);
              }
              _setWindowSize(e) {
                this.precompute(e);
              }
              toRawBytes() {
                return this.toBytes();
              }
            }
            ((A.BASE = new A(w.Gx, w.Gy, a, ((g = w.Gx * w.Gy), b.create(g)))),
              (A.ZERO = new A(s, a, a, s)),
              (A.Fp = b),
              (A.Fn = y));
            let R = new n.p(A, y.BITS);
            return (A.BASE.precompute(8), A);
          })(d, p),
          g,
          m,
        );
      return (
        (h = b.Point),
        Object.assign({}, b, {
          ExtendedPoint: h,
          CURVE: e,
          nBitLength: h.Fn.BITS,
          nByteLength: h.Fn.BYTES,
        })
      );
    })({
      ...w,
      Fp: E,
      hash: t.s,
      adjustScalarBytes: function (e) {
        return ((e[0] &= 248), (e[31] &= 127), (e[31] |= 64), e);
      },
      uvRatio: v,
    }),
    I = (y + g) / b,
    S = E.pow(p, I),
    A = E.sqrt(E.neg(E.ONE)),
    R = (0, i.s)(E, E.neg(BigInt(486664)));
  (0, l.O)(
    O.Point,
    (e) =>
      (function (e) {
        let t,
          r,
          n,
          f,
          s,
          a,
          c,
          o,
          u,
          l,
          h,
          g,
          w,
          B,
          v,
          x,
          O,
          I,
          N,
          _,
          T,
          P,
          U,
          {
            xMn: q,
            xMd: C,
            yMn: D,
            yMd: F,
          } = ((t = (y - m) / b),
          (r = BigInt(486662)),
          (n = E.sqr(e)),
          (n = E.mul(n, p)),
          (f = E.add(n, E.ONE)),
          (s = E.neg(r)),
          (a = E.sqr(f)),
          (c = E.mul(a, f)),
          (o = E.mul(n, r)),
          (o = E.mul(o, s)),
          (o = E.add(o, a)),
          (o = E.mul(o, s)),
          (u = E.sqr(c)),
          (a = E.sqr(u)),
          (u = E.mul(u, c)),
          (u = E.mul(u, o)),
          (a = E.mul(a, u)),
          (l = E.pow(a, t)),
          (l = E.mul(l, u)),
          (h = E.mul(l, A)),
          (a = E.sqr(l)),
          (a = E.mul(a, c)),
          (g = E.eql(a, o)),
          (w = E.cmov(h, l, g)),
          (B = E.mul(s, n)),
          (v = E.mul(l, e)),
          (v = E.mul(v, S)),
          (x = E.mul(v, A)),
          (O = E.mul(o, n)),
          (a = E.sqr(v)),
          (a = E.mul(a, c)),
          (I = E.eql(a, O)),
          (N = E.cmov(x, v, I)),
          (a = E.sqr(w)),
          (a = E.mul(a, c)),
          (_ = E.eql(a, o)),
          (T = E.cmov(B, s, _)),
          (P = E.cmov(N, w, _)),
          (U = E.isOdd(P)),
          { xMn: T, xMd: f, yMn: (P = E.cmov(P, E.neg(P), _ !== U)), yMd: d }),
          L = E.mul(q, F);
        L = E.mul(L, R);
        let G = E.mul(C, D),
          M = E.sub(q, C),
          z = E.add(q, C),
          Z = E.mul(G, z),
          K = E.eql(Z, E.ZERO);
        ((L = E.cmov(L, E.ZERO, K)),
          (G = E.cmov(G, E.ONE, K)),
          (M = E.cmov(M, E.ONE, K)),
          (z = E.cmov(z, E.ONE, K)));
        let [V, j] = (0, i.R)(E, [G, z], !0);
        return { x: E.mul(L, V), y: E.mul(M, j) };
      })(e[0]),
    {
      DST: "edwards25519_XMD:SHA-512_ELL2_RO_",
      encodeDST: "edwards25519_XMD:SHA-512_ELL2_NU_",
      p: y,
      m: 1,
      k: 128,
      expand: "xmd",
      hash: t.s,
    },
  );
  let N = BigInt(
      "25063068953384623474111414158702152701244531502492656460079210482610430750235",
    ),
    _ = BigInt(
      "54469307008909316920995813868745141605393597292927456921205312896311721017578",
    ),
    T = BigInt(
      "1159843021668779879193775521855586647937357759715417654439879720876111806838",
    ),
    P = BigInt(
      "40440834346308536858101042469323190826248399146238708352240133220865137265952",
    ),
    U = BigInt(
      "0x7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff",
    ),
    q = (e) => O.Point.Fp.create((0, f.F)(e) & U);
  function C(e) {
    let t,
      r,
      n,
      f,
      s,
      a,
      c,
      o,
      u,
      l,
      h,
      p,
      g,
      m,
      b,
      { d: x } = w,
      I = ((t = B * e * e), E.create(t)),
      S = ((r = (I + d) * T), E.create(r)),
      A = BigInt(-1),
      R = ((f = (A - x * I) * ((n = I + x), E.create(n))), E.create(f)),
      { isValid: _, value: U } = v(S, R),
      q = ((s = U * e), E.create(s));
    ((0, i.f)(q, y) || ((a = -q), (q = E.create(a))),
      _ || (U = q),
      _ || (A = I));
    let C = ((c = A * (I - d) * P - R), E.create(c)),
      D = U * U,
      F = ((o = (U + U) * R), E.create(o)),
      L = ((u = C * N), E.create(u)),
      G = ((l = d - D), E.create(l)),
      M = ((h = d + D), E.create(h));
    return new O.Point(
      ((p = F * M), E.create(p)),
      ((g = G * L), E.create(g)),
      ((m = L * M), E.create(m)),
      ((b = F * G), E.create(b)),
    );
  }
  class D extends u {
    constructor(e) {
      super(e);
    }
    static fromAffine(e) {
      return new D(O.Point.fromAffine(e));
    }
    assertSame(e) {
      if (!(e instanceof D)) throw Error("RistrettoPoint expected");
    }
    init(e) {
      return new D(e);
    }
    static hashToCurve(e) {
      var t;
      let n, i;
      return (
        (t = (0, f.z)("ristrettoHash", e, 64)),
        (0, r.C)(t, 64),
        (n = C(q(t.subarray(0, 32)))),
        (i = C(q(t.subarray(32, 64)))),
        new D(n.add(i))
      );
    }
    static fromBytes(e) {
      let t, n, s, a, c, o, u, l, p, g, m, b, B;
      (0, r.C)(e, 32);
      let { a: x, d: I } = w,
        S = q(e);
      if (!(0, f.v)(E.toBytes(S), e) || (0, i.f)(S, y))
        throw Error("invalid ristretto255 encoding 1");
      let A = ((t = S * S), E.create(t)),
        R = ((n = d + x * A), E.create(n)),
        N = ((s = d - x * A), E.create(s)),
        _ = ((a = R * R), E.create(a)),
        T = ((c = N * N), E.create(c)),
        P = ((o = x * I * _ - T), E.create(o)),
        { isValid: U, value: C } = ((u = P * T), v(d, E.create(u))),
        F = ((l = C * N), E.create(l)),
        L = ((p = C * F * P), E.create(p)),
        G = ((g = (S + S) * F), E.create(g));
      (0, i.f)(G, y) && ((m = -G), (G = E.create(m)));
      let M = ((b = R * L), E.create(b)),
        z = ((B = G * M), E.create(B));
      if (!U || (0, i.f)(z, y) || M === h)
        throw Error("invalid ristretto255 encoding 2");
      return new D(new O.Point(G, M, d, z));
    }
    static fromHex(e) {
      return D.fromBytes((0, f.z)("ristrettoHex", e, 32));
    }
    static msm(e, t) {
      return (0, n.g)(D, O.Point.Fn, e, t);
    }
    toBytes() {
      let e,
        t,
        r,
        n,
        f,
        s,
        a,
        c,
        o,
        u,
        l,
        h,
        p,
        { X: g, Y: m, Z: b, T: w } = this.ep,
        x =
          ((e = b + m),
          (r = E.create(e) * ((t = b - m), E.create(t))),
          E.create(r)),
        O = ((n = g * m), E.create(n)),
        { value: I } =
          ((s = x * ((f = O * O), E.create(f))), v(d, E.create(s))),
        S = ((a = I * x), E.create(a)),
        A = ((c = I * O), E.create(c)),
        R = ((o = S * A * w), E.create(o));
      if ((0, i.f)(w * R, y)) {
        let e,
          t,
          r = ((e = m * B), E.create(e)),
          n = ((t = g * B), E.create(t));
        ((g = r), (m = n), (p = E.create(S * _)));
      } else p = A;
      (0, i.f)(g * R, y) && ((u = -m), (m = E.create(u)));
      let N = ((l = (b - m) * p), E.create(l));
      return ((0, i.f)(N, y) && ((h = -N), (N = E.create(h))), E.toBytes(N));
    }
    equals(e) {
      let t, r, n, f;
      this.assertSame(e);
      let { X: i, Y: s } = this.ep,
        { X: a, Y: c } = e.ep,
        o = ((t = i * c), E.create(t) === ((r = s * a), E.create(r))),
        u = ((n = s * c), E.create(n) === ((f = i * a), E.create(f)));
      return o || u;
    }
    is0() {
      return this.equals(D.ZERO);
    }
  }
  ((D.BASE = new D(O.Point.BASE)),
    (D.ZERO = new D(O.Point.ZERO)),
    (D.Fp = E),
    (D.Fn = x),
    e.s(["f", 0, O], 430981));
};
