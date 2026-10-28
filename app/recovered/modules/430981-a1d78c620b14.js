// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(837474),
    r = e.i(944445),
    n = e.i(365490),
    a = e.i(878660),
    i = e.i(288667);
  let s = BigInt(0),
    f = BigInt(1),
    o = BigInt(2),
    c = BigInt(8);
  class l {
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
    h = BigInt(1),
    p = BigInt(2),
    m = BigInt(3),
    g = BigInt(5),
    y = BigInt(8),
    w = BigInt(
      "0x7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffed",
    ),
    b = {
      p: w,
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
    B = BigInt(
      "19681161376707505956807079304988542015446066515923890162744021073123829784752",
    );
  function v(e, t) {
    var r;
    let n,
      a,
      s,
      f,
      o,
      c,
      l,
      d,
      u,
      m,
      y,
      b,
      v,
      E,
      x = (0, i.K)(t * t * t, w),
      I = ((r = e * (0, i.K)(x * x * t, w)),
      (n = BigInt(10)),
      (a = BigInt(20)),
      (s = BigInt(40)),
      (f = BigInt(80)),
      (o = (((r * r) % w) * r) % w),
      (c = ((0, i.m)(o, p, w) * o) % w),
      (l = ((0, i.m)(c, h, w) * r) % w),
      (d = ((0, i.m)(l, g, w) * l) % w),
      (u = ((0, i.m)(d, n, w) * d) % w),
      (m = ((0, i.m)(u, a, w) * u) % w),
      (y = ((0, i.m)(m, s, w) * m) % w),
      (b = ((0, i.m)(y, f, w) * y) % w),
      (v = ((0, i.m)(b, f, w) * y) % w),
      (E = ((0, i.m)(v, n, w) * d) % w),
      { pow_p_5_8: ((0, i.m)(E, p, w) * r) % w, b2: o }).pow_p_5_8,
      S = (0, i.K)(e * x * I, w),
      T = (0, i.K)(t * S * S, w),
      O = S,
      A = (0, i.K)(S * B, w),
      R = T === e,
      C = T === (0, i.K)(-e, w),
      P = T === (0, i.K)(-e * B, w);
    return (
      R && (S = O),
      (C || P) && (S = A),
      (0, i.f)(S, w) && (S = (0, i.K)(-S, w)),
      { isValid: R || C, value: S }
    );
  }
  let E = (0, i.N)(b.p, { isLE: !0 }),
    x = (0, i.N)(b.n, { isLE: !0 }),
    I = (function (e) {
      let t,
        l,
        d,
        u,
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
        { CURVE: t, curveOpts: l, hash: e.hash, eddsaOpts: d }),
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
            { BASE: s, Fp: o, Fn: c } = e,
            l = n.randomBytes || r.a,
            d = n.adjustScalarBytes || ((e) => e),
            u =
              n.domain ||
              ((e, t, r) => {
                if (((0, a.Y)(r, "phflag"), t.length || r))
                  throw Error("Contexts/pre-hash are not supported");
                return e;
              });
          function h(e) {
            return c.create((0, a.F)(e));
          }
          function p(e) {
            var r;
            let n,
              i,
              f,
              o,
              c,
              {
                head: l,
                prefix: u,
                scalar: p,
              } = ((r = e),
              (n = b.secretKey),
              (r = (0, a.z)("private key", r, n)),
              (f = d(
                (i = (0, a.z)("hashed private key", t(r), 2 * n)).slice(0, n),
              )),
              (o = i.slice(n, 2 * n)),
              (c = h(f)),
              { head: f, prefix: o, scalar: c }),
              m = s.multiply(p),
              g = m.toBytes();
            return { head: l, prefix: u, scalar: p, point: m, pointBytes: g };
          }
          function m(e) {
            return p(e).pointBytes;
          }
          function g(e = Uint8Array.of(), ...n) {
            return h(t(u((0, r.t)(...n), (0, a.z)("context", e), !!i)));
          }
          let y = { zip215: !0 },
            w = o.BYTES,
            b = { secretKey: w, publicKey: w, signature: 2 * w, seed: w };
          function B(e = l(b.seed)) {
            return (0, a.G)(e, b.seed, "seed");
          }
          let v = {
            getExtendedPublicKey: p,
            randomSecretKey: B,
            isValidSecretKey: function (e) {
              return (0, r.g)(e) && e.length === c.BYTES;
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
                n = b.publicKey,
                a = 32 === n;
              if (!a && 57 !== n) throw Error("only defined for 25519 and 448");
              let i = a ? o.div(f + r, f - r) : o.div(r - f, r + f);
              return o.toBytes(i);
            },
            toMontgomerySecret(e) {
              let r = b.secretKey;
              return ((0, a.G)(e, r), d(t(e.subarray(0, r))).subarray(0, r));
            },
            randomPrivateKey: B,
            precompute: (t = 8, r = e.BASE) => r.precompute(t, !1),
          };
          return Object.freeze({
            keygen: function (e) {
              let t = v.randomSecretKey(e);
              return { secretKey: t, publicKey: m(t) };
            },
            getPublicKey: m,
            sign: function (e, t, n = {}) {
              ((e = (0, a.z)("message", e)), i && (e = i(e)));
              let { prefix: f, scalar: o, pointBytes: l } = p(t),
                d = g(n.context, f, e),
                u = s.multiply(d).toBytes(),
                h = g(n.context, u, l, e),
                m = c.create(d + h * o);
              if (!c.isValid(m)) throw Error("sign failed: invalid s");
              let y = (0, r.t)(u, c.toBytes(m));
              return (0, a.G)(y, b.signature, "result");
            },
            verify: function (t, r, n, f = y) {
              let o,
                c,
                l,
                { context: d, zip215: u } = f,
                h = b.signature;
              ((t = (0, a.z)("signature", t, h)),
                (r = (0, a.z)("message", r)),
                (n = (0, a.z)("publicKey", n, b.publicKey)),
                void 0 !== u && (0, a.Y)(u, "zip215"),
                i && (r = i(r)));
              let p = h / 2,
                m = t.subarray(0, p),
                w = (0, a.F)(t.subarray(p, h));
              try {
                ((o = e.fromBytes(n, u)),
                  (c = e.fromBytes(m, u)),
                  (l = s.multiplyUnsafe(w)));
              } catch (e) {
                return !1;
              }
              if (!u && o.isSmallOrder()) return !1;
              let B = g(d, c.toBytes(), o.toBytes(), r);
              return c
                .add(o.multiplyUnsafe(B))
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
            var i, l;
            let d,
              u,
              h,
              p,
              m,
              g = (0, n.o)("edwards", e, t, t.FpFnLE),
              { Fp: y, Fn: w } = g,
              b = g.CURVE,
              { h: B } = b;
            (0, a.S)(t, {}, { uvRatio: "function" });
            let v = o << (BigInt(8 * w.BYTES) - f),
              E =
                t.uvRatio ||
                ((e, t) => {
                  try {
                    return { isValid: !0, value: y.sqrt(y.div(e, t)) };
                  } catch (e) {
                    return { isValid: !1, value: s };
                  }
                });
            if (
              ((i = b.Gx),
              (l = b.Gy),
              (d = y.sqr(i)),
              (u = y.sqr(l)),
              (h = y.add(y.mul(b.a, d), u)),
              (p = y.add(y.ONE, y.mul(b.d, y.mul(d, u)))),
              !y.eql(h, p))
            )
              throw Error("bad curve params: generator point");
            function x(e, t, r = !1) {
              let n = r ? f : s;
              return ((0, a._)("coordinate " + e, t, n, v), t);
            }
            function I(e) {
              if (!(e instanceof O)) throw Error("ExtendedPoint expected");
            }
            let S = (0, a.W)((e, t) => {
                let r,
                  n,
                  { X: a, Y: i, Z: o } = e,
                  l = e.is0();
                null == t && (t = l ? c : y.inv(o));
                let d = ((r = a * t), y.create(r)),
                  u = ((n = i * t), y.create(n)),
                  h = y.mul(o, t);
                if (l) return { x: s, y: f };
                if (h !== f) throw Error("invZ was invalid");
                return { x: d, y: u };
              }),
              T = (0, a.W)((e) => {
                let t,
                  r,
                  n,
                  a,
                  i,
                  s,
                  f,
                  o,
                  c,
                  l,
                  d,
                  u,
                  { a: h, d: p } = b;
                if (e.is0()) throw Error("bad point: ZERO");
                let { X: m, Y: g, Z: w, T: B } = e,
                  v = ((t = m * m), y.create(t)),
                  E = ((r = g * g), y.create(r)),
                  x = ((n = w * w), y.create(n)),
                  I = ((a = x * x), y.create(a));
                if (
                  ((f = x * ((i = v * h), (s = y.create(i) + E), y.create(s))),
                  y.create(f) !==
                    ((l =
                      I + ((c = p * ((o = v * E), y.create(o))), y.create(c))),
                    y.create(l)))
                )
                  throw Error("bad point: equation left != right (1)");
                if (((d = m * g), y.create(d) !== ((u = w * B), y.create(u))))
                  throw Error("bad point: equation left != right (2)");
                return !0;
              });
            class O {
              constructor(e, t, r, n) {
                ((this.X = x("x", e)),
                  (this.Y = x("y", t)),
                  (this.Z = x("z", r, !0)),
                  (this.T = x("t", n)),
                  Object.freeze(this));
              }
              static CURVE() {
                return b;
              }
              static fromAffine(e) {
                let t;
                if (e instanceof O) throw Error("extended point not allowed");
                let { x: r, y: n } = e || {};
                return (
                  x("x", r),
                  x("y", n),
                  new O(r, n, f, ((t = r * n), y.create(t)))
                );
              }
              static fromBytes(e, t = !1) {
                let r,
                  n,
                  i,
                  o,
                  c = y.BYTES,
                  { a: l, d } = b;
                ((e = (0, a.t)((0, a.G)(e, c, "point"))),
                  (0, a.Y)(t, "zip215"));
                let u = (0, a.t)(e),
                  h = e[c - 1];
                u[c - 1] = -129 & h;
                let p = (0, a.F)(u),
                  m = t ? v : y.ORDER;
                (0, a._)("point.y", p, s, m);
                let g = ((r = p * p), y.create(r)),
                  { isValid: w, value: B } = E(
                    ((n = g - f), y.create(n)),
                    ((i = d * g - l), y.create(i)),
                  );
                if (!w) throw Error("bad point: invalid y coordinate");
                let x = (B & f) === f,
                  I = (128 & h) != 0;
                if (!t && B === s && I) throw Error("bad point: x=0 and x_0=1");
                return (
                  I !== x && ((o = -B), (B = y.create(o))),
                  O.fromAffine({ x: B, y: p })
                );
              }
              static fromHex(e, t = !1) {
                return O.fromBytes((0, a.z)("point", e), t);
              }
              get x() {
                return this.toAffine().x;
              }
              get y() {
                return this.toAffine().y;
              }
              precompute(e = 8, t = !0) {
                return (A.createCache(this, e), t || this.multiply(o), this);
              }
              assertValidity() {
                T(this);
              }
              equals(e) {
                let t, r, n, a;
                I(e);
                let { X: i, Y: s, Z: f } = this,
                  { X: o, Y: c, Z: l } = e,
                  d = ((t = i * l), y.create(t)),
                  u = ((r = o * f), y.create(r)),
                  h = ((n = s * l), y.create(n)),
                  p = ((a = c * f), y.create(a));
                return d === u && h === p;
              }
              is0() {
                return this.equals(O.ZERO);
              }
              negate() {
                let e, t;
                return new O(
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
                  s,
                  f,
                  c,
                  l,
                  d,
                  { a: u } = b,
                  { X: h, Y: p, Z: m } = this,
                  g = ((e = h * h), y.create(e)),
                  w = ((t = p * p), y.create(t)),
                  B = ((n = o * ((r = m * m), y.create(r))), y.create(n)),
                  v = ((a = u * g), y.create(a)),
                  E = h + p,
                  x = ((i = E * E), (s = y.create(i) - g - w), y.create(s)),
                  I = v + w,
                  S = I - B,
                  T = v - w,
                  A = ((f = x * S), y.create(f)),
                  R = ((c = I * T), y.create(c)),
                  C = ((l = x * T), y.create(l));
                return new O(A, R, ((d = S * I), y.create(d)), C);
              }
              add(e) {
                let t, r, n, a, i, s, f, o, c, l;
                I(e);
                let { a: d, d: u } = b,
                  { X: h, Y: p, Z: m, T: g } = this,
                  { X: w, Y: B, Z: v, T: E } = e,
                  x = ((t = h * w), y.create(t)),
                  S = ((r = p * B), y.create(r)),
                  T = ((n = g * u * E), y.create(n)),
                  A = ((a = m * v), y.create(a)),
                  R = ((i = (h + p) * (w + B) - x - S), y.create(i)),
                  C = A - T,
                  P = A + T,
                  q = ((s = S - d * x), y.create(s)),
                  K = ((f = R * C), y.create(f)),
                  _ = ((o = P * q), y.create(o)),
                  z = ((c = R * q), y.create(c));
                return new O(K, _, ((l = C * P), y.create(l)), z);
              }
              subtract(e) {
                return this.add(e.negate());
              }
              multiply(e) {
                if (!w.isValidNot0(e))
                  throw Error("invalid scalar: expected 1 <= sc < curve.n");
                let { p: t, f: r } = A.cached(this, e, (e) => (0, n.s)(O, e));
                return (0, n.s)(O, [t, r])[0];
              }
              multiplyUnsafe(e, t = O.ZERO) {
                if (!w.isValid(e))
                  throw Error("invalid scalar: expected 0 <= sc < curve.n");
                return e === s
                  ? O.ZERO
                  : this.is0() || e === f
                    ? this
                    : A.unsafe(this, e, (e) => (0, n.s)(O, e), t);
              }
              isSmallOrder() {
                return this.multiplyUnsafe(B).is0();
              }
              isTorsionFree() {
                return A.unsafe(this, b.n).is0();
              }
              toAffine(e) {
                return S(this, e);
              }
              clearCofactor() {
                return B === f ? this : this.multiplyUnsafe(B);
              }
              toBytes() {
                let { x: e, y: t } = this.toAffine(),
                  r = y.toBytes(t);
                return ((r[r.length - 1] |= e & f ? 128 : 0), r);
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
                return (0, n.s)(O, e);
              }
              static msm(e, t) {
                return (0, n.g)(O, w, e, t);
              }
              _setWindowSize(e) {
                this.precompute(e);
              }
              toRawBytes() {
                return this.toBytes();
              }
            }
            ((O.BASE = new O(b.Gx, b.Gy, f, ((m = b.Gx * b.Gy), y.create(m)))),
              (O.ZERO = new O(s, f, f, s)),
              (O.Fp = y),
              (O.Fn = w));
            let A = new n.p(O, w.BITS);
            return (O.BASE.precompute(8), O);
          })(h, p),
          m,
          g,
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
      ...b,
      Fp: E,
      hash: t.s,
      adjustScalarBytes: function (e) {
        return ((e[0] &= 248), (e[31] &= 127), (e[31] |= 64), e);
      },
      uvRatio: v,
    }),
    S = (w + m) / y,
    T = E.pow(p, S),
    O = E.sqrt(E.neg(E.ONE)),
    A = (0, i.s)(E, E.neg(BigInt(486664)));
  (0, d.O)(
    I.Point,
    (e) =>
      (function (e) {
        let t,
          r,
          n,
          a,
          s,
          f,
          o,
          c,
          l,
          d,
          u,
          m,
          b,
          B,
          v,
          x,
          I,
          S,
          R,
          C,
          P,
          q,
          K,
          {
            xMn: _,
            xMd: z,
            yMn: V,
            yMd: Z,
          } = ((t = (w - g) / y),
          (r = BigInt(486662)),
          (n = E.sqr(e)),
          (n = E.mul(n, p)),
          (a = E.add(n, E.ONE)),
          (s = E.neg(r)),
          (f = E.sqr(a)),
          (o = E.mul(f, a)),
          (c = E.mul(n, r)),
          (c = E.mul(c, s)),
          (c = E.add(c, f)),
          (c = E.mul(c, s)),
          (l = E.sqr(o)),
          (f = E.sqr(l)),
          (l = E.mul(l, o)),
          (l = E.mul(l, c)),
          (f = E.mul(f, l)),
          (d = E.pow(f, t)),
          (d = E.mul(d, l)),
          (u = E.mul(d, O)),
          (f = E.sqr(d)),
          (f = E.mul(f, o)),
          (m = E.eql(f, c)),
          (b = E.cmov(u, d, m)),
          (B = E.mul(s, n)),
          (v = E.mul(d, e)),
          (v = E.mul(v, T)),
          (x = E.mul(v, O)),
          (I = E.mul(c, n)),
          (f = E.sqr(v)),
          (f = E.mul(f, o)),
          (S = E.eql(f, I)),
          (R = E.cmov(x, v, S)),
          (f = E.sqr(b)),
          (f = E.mul(f, o)),
          (C = E.eql(f, c)),
          (P = E.cmov(B, s, C)),
          (q = E.cmov(R, b, C)),
          (K = E.isOdd(q)),
          { xMn: P, xMd: a, yMn: (q = E.cmov(q, E.neg(q), C !== K)), yMd: h }),
          L = E.mul(_, Z);
        L = E.mul(L, A);
        let F = E.mul(z, V),
          W = E.sub(_, z),
          G = E.add(_, z),
          U = E.mul(F, G),
          D = E.eql(U, E.ZERO);
        ((L = E.cmov(L, E.ZERO, D)),
          (F = E.cmov(F, E.ONE, D)),
          (W = E.cmov(W, E.ONE, D)),
          (G = E.cmov(G, E.ONE, D)));
        let [N, M] = (0, i.R)(E, [F, G], !0);
        return { x: E.mul(L, N), y: E.mul(W, M) };
      })(e[0]),
    {
      DST: "edwards25519_XMD:SHA-512_ELL2_RO_",
      encodeDST: "edwards25519_XMD:SHA-512_ELL2_NU_",
      p: w,
      m: 1,
      k: 128,
      expand: "xmd",
      hash: t.s,
    },
  );
  let R = BigInt(
      "25063068953384623474111414158702152701244531502492656460079210482610430750235",
    ),
    C = BigInt(
      "54469307008909316920995813868745141605393597292927456921205312896311721017578",
    ),
    P = BigInt(
      "1159843021668779879193775521855586647937357759715417654439879720876111806838",
    ),
    q = BigInt(
      "40440834346308536858101042469323190826248399146238708352240133220865137265952",
    ),
    K = BigInt(
      "0x7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff",
    ),
    _ = (e) => I.Point.Fp.create((0, a.F)(e) & K);
  function z(e) {
    let t,
      r,
      n,
      a,
      s,
      f,
      o,
      c,
      l,
      d,
      u,
      p,
      m,
      g,
      y,
      { d: x } = b,
      S = ((t = B * e * e), E.create(t)),
      T = ((r = (S + h) * P), E.create(r)),
      O = BigInt(-1),
      A = ((a = (O - x * S) * ((n = S + x), E.create(n))), E.create(a)),
      { isValid: C, value: K } = v(T, A),
      _ = ((s = K * e), E.create(s));
    ((0, i.f)(_, w) || ((f = -_), (_ = E.create(f))),
      C || (K = _),
      C || (O = S));
    let z = ((o = O * (S - h) * q - A), E.create(o)),
      V = K * K,
      Z = ((c = (K + K) * A), E.create(c)),
      L = ((l = z * R), E.create(l)),
      F = ((d = h - V), E.create(d)),
      W = ((u = h + V), E.create(u));
    return new I.Point(
      ((p = Z * W), E.create(p)),
      ((m = F * L), E.create(m)),
      ((g = L * W), E.create(g)),
      ((y = Z * F), E.create(y)),
    );
  }
  class V extends l {
    constructor(e) {
      super(e);
    }
    static fromAffine(e) {
      return new V(I.Point.fromAffine(e));
    }
    assertSame(e) {
      if (!(e instanceof V)) throw Error("RistrettoPoint expected");
    }
    init(e) {
      return new V(e);
    }
    static hashToCurve(e) {
      var t;
      let n, i;
      return (
        (t = (0, a.z)("ristrettoHash", e, 64)),
        (0, r.C)(t, 64),
        (n = z(_(t.subarray(0, 32)))),
        (i = z(_(t.subarray(32, 64)))),
        new V(n.add(i))
      );
    }
    static fromBytes(e) {
      let t, n, s, f, o, c, l, d, p, m, g, y, B;
      (0, r.C)(e, 32);
      let { a: x, d: S } = b,
        T = _(e);
      if (!(0, a.v)(E.toBytes(T), e) || (0, i.f)(T, w))
        throw Error("invalid ristretto255 encoding 1");
      let O = ((t = T * T), E.create(t)),
        A = ((n = h + x * O), E.create(n)),
        R = ((s = h - x * O), E.create(s)),
        C = ((f = A * A), E.create(f)),
        P = ((o = R * R), E.create(o)),
        q = ((c = x * S * C - P), E.create(c)),
        { isValid: K, value: z } = ((l = q * P), v(h, E.create(l))),
        Z = ((d = z * R), E.create(d)),
        L = ((p = z * Z * q), E.create(p)),
        F = ((m = (T + T) * Z), E.create(m));
      (0, i.f)(F, w) && ((g = -F), (F = E.create(g)));
      let W = ((y = A * L), E.create(y)),
        G = ((B = F * W), E.create(B));
      if (!K || (0, i.f)(G, w) || W === u)
        throw Error("invalid ristretto255 encoding 2");
      return new V(new I.Point(F, W, h, G));
    }
    static fromHex(e) {
      return V.fromBytes((0, a.z)("ristrettoHex", e, 32));
    }
    static msm(e, t) {
      return (0, n.g)(V, I.Point.Fn, e, t);
    }
    toBytes() {
      let e,
        t,
        r,
        n,
        a,
        s,
        f,
        o,
        c,
        l,
        d,
        u,
        p,
        { X: m, Y: g, Z: y, T: b } = this.ep,
        x =
          ((e = y + g),
          (r = E.create(e) * ((t = y - g), E.create(t))),
          E.create(r)),
        I = ((n = m * g), E.create(n)),
        { value: S } =
          ((s = x * ((a = I * I), E.create(a))), v(h, E.create(s))),
        T = ((f = S * x), E.create(f)),
        O = ((o = S * I), E.create(o)),
        A = ((c = T * O * b), E.create(c));
      if ((0, i.f)(b * A, w)) {
        let e,
          t,
          r = ((e = g * B), E.create(e)),
          n = ((t = m * B), E.create(t));
        ((m = r), (g = n), (p = E.create(T * C)));
      } else p = O;
      (0, i.f)(m * A, w) && ((l = -g), (g = E.create(l)));
      let R = ((d = (y - g) * p), E.create(d));
      return ((0, i.f)(R, w) && ((u = -R), (R = E.create(u))), E.toBytes(R));
    }
    equals(e) {
      let t, r, n, a;
      this.assertSame(e);
      let { X: i, Y: s } = this.ep,
        { X: f, Y: o } = e.ep,
        c = ((t = i * o), E.create(t) === ((r = s * f), E.create(r))),
        l = ((n = s * o), E.create(n) === ((a = i * f), E.create(a)));
      return c || l;
    }
    is0() {
      return this.equals(V.ZERO);
    }
  }
  ((V.BASE = new V(I.Point.BASE)),
    (V.ZERO = new V(I.Point.ZERO)),
    (V.Fp = E),
    (V.Fn = x),
    e.s(["f", 0, I], 430981));
};
