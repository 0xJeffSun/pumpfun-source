// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(837474),
    r = e.i(944445),
    f = e.i(365490),
    n = e.i(878660),
    i = e.i(288667);
  let a = BigInt(0),
    s = BigInt(1),
    c = BigInt(2),
    o = BigInt(8);
  class u {
    constructor(e) {
      this.ep = e;
    }
    static fromBytes(e) {
      (0, n.U)();
    }
    static fromHex(e) {
      (0, n.U)();
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
  let l = BigInt(0),
    h = BigInt(1),
    m = BigInt(2),
    g = BigInt(3),
    p = BigInt(5),
    B = BigInt(8),
    y = BigInt(
      "0x7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffed",
    ),
    b = {
      p: y,
      n: BigInt(
        "0x1000000000000000000000000000000014def9dea2f79cd65812631a5cf5d3ed",
      ),
      h: B,
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
  function w(e, t) {
    var r;
    let f,
      n,
      a,
      s,
      c,
      o,
      u,
      d,
      l,
      g,
      B,
      b,
      w,
      E,
      I = (0, i.K)(t * t * t, y),
      v = ((r = e * (0, i.K)(I * I * t, y)),
      (f = BigInt(10)),
      (n = BigInt(20)),
      (a = BigInt(40)),
      (s = BigInt(80)),
      (c = (((r * r) % y) * r) % y),
      (o = ((0, i.m)(c, m, y) * c) % y),
      (u = ((0, i.m)(o, h, y) * r) % y),
      (d = ((0, i.m)(u, p, y) * u) % y),
      (l = ((0, i.m)(d, f, y) * d) % y),
      (g = ((0, i.m)(l, n, y) * l) % y),
      (B = ((0, i.m)(g, a, y) * g) % y),
      (b = ((0, i.m)(B, s, y) * B) % y),
      (w = ((0, i.m)(b, s, y) * B) % y),
      (E = ((0, i.m)(w, f, y) * d) % y),
      { pow_p_5_8: ((0, i.m)(E, m, y) * r) % y, b2: c }).pow_p_5_8,
      A = (0, i.K)(e * I * v, y),
      S = (0, i.K)(t * A * A, y),
      z = A,
      O = (0, i.K)(A * x, y),
      P = S === e,
      T = S === (0, i.K)(-e, y),
      R = S === (0, i.K)(-e * x, y);
    return (
      P && (A = z),
      (T || R) && (A = O),
      (0, i.f)(A, y) && (A = (0, i.K)(-A, y)),
      { isValid: P || T, value: A }
    );
  }
  let E = (0, i.N)(b.p, { isLE: !0 }),
    I = (0, i.N)(b.n, { isLE: !0 }),
    v = (function (e) {
      let t,
        u,
        d,
        l,
        {
          CURVE: h,
          curveOpts: m,
          hash: g,
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
        (u = {
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
        { CURVE: t, curveOpts: u, hash: e.hash, eddsaOpts: d }),
        B = (function (e, t, f = {}) {
          if ("function" != typeof t)
            throw Error('"hash" function param is required');
          (0, n.S)(
            f,
            {},
            {
              adjustScalarBytes: "function",
              randomBytes: "function",
              domain: "function",
              prehash: "function",
              mapToCurve: "function",
            },
          );
          let { prehash: i } = f,
            { BASE: a, Fp: c, Fn: o } = e,
            u = f.randomBytes || r.a,
            d = f.adjustScalarBytes || ((e) => e),
            l =
              f.domain ||
              ((e, t, r) => {
                if (((0, n.Y)(r, "phflag"), t.length || r))
                  throw Error("Contexts/pre-hash are not supported");
                return e;
              });
          function h(e) {
            return o.create((0, n.F)(e));
          }
          function m(e) {
            var r;
            let f,
              i,
              s,
              c,
              o,
              {
                head: u,
                prefix: l,
                scalar: m,
              } = ((r = e),
              (f = b.secretKey),
              (r = (0, n.z)("private key", r, f)),
              (s = d(
                (i = (0, n.z)("hashed private key", t(r), 2 * f)).slice(0, f),
              )),
              (c = i.slice(f, 2 * f)),
              (o = h(s)),
              { head: s, prefix: c, scalar: o }),
              g = a.multiply(m),
              p = g.toBytes();
            return { head: u, prefix: l, scalar: m, point: g, pointBytes: p };
          }
          function g(e) {
            return m(e).pointBytes;
          }
          function p(e = Uint8Array.of(), ...f) {
            return h(t(l((0, r.t)(...f), (0, n.z)("context", e), !!i)));
          }
          let B = { zip215: !0 },
            y = c.BYTES,
            b = { secretKey: y, publicKey: y, signature: 2 * y, seed: y };
          function x(e = u(b.seed)) {
            return (0, n.G)(e, b.seed, "seed");
          }
          let w = {
            getExtendedPublicKey: m,
            randomSecretKey: x,
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
                f = b.publicKey,
                n = 32 === f;
              if (!n && 57 !== f) throw Error("only defined for 25519 and 448");
              let i = n ? c.div(s + r, s - r) : c.div(r - s, r + s);
              return c.toBytes(i);
            },
            toMontgomerySecret(e) {
              let r = b.secretKey;
              return ((0, n.G)(e, r), d(t(e.subarray(0, r))).subarray(0, r));
            },
            randomPrivateKey: x,
            precompute: (t = 8, r = e.BASE) => r.precompute(t, !1),
          };
          return Object.freeze({
            keygen: function (e) {
              let t = w.randomSecretKey(e);
              return { secretKey: t, publicKey: g(t) };
            },
            getPublicKey: g,
            sign: function (e, t, f = {}) {
              ((e = (0, n.z)("message", e)), i && (e = i(e)));
              let { prefix: s, scalar: c, pointBytes: u } = m(t),
                d = p(f.context, s, e),
                l = a.multiply(d).toBytes(),
                h = p(f.context, l, u, e),
                g = o.create(d + h * c);
              if (!o.isValid(g)) throw Error("sign failed: invalid s");
              let B = (0, r.t)(l, o.toBytes(g));
              return (0, n.G)(B, b.signature, "result");
            },
            verify: function (t, r, f, s = B) {
              let c,
                o,
                u,
                { context: d, zip215: l } = s,
                h = b.signature;
              ((t = (0, n.z)("signature", t, h)),
                (r = (0, n.z)("message", r)),
                (f = (0, n.z)("publicKey", f, b.publicKey)),
                void 0 !== l && (0, n.Y)(l, "zip215"),
                i && (r = i(r)));
              let m = h / 2,
                g = t.subarray(0, m),
                y = (0, n.F)(t.subarray(m, h));
              try {
                ((c = e.fromBytes(f, l)),
                  (o = e.fromBytes(g, l)),
                  (u = a.multiplyUnsafe(y)));
              } catch (e) {
                return !1;
              }
              if (!l && c.isSmallOrder()) return !1;
              let x = p(d, o.toBytes(), c.toBytes(), r);
              return o
                .add(c.multiplyUnsafe(x))
                .subtract(u)
                .clearCofactor()
                .is0();
            },
            utils: w,
            Point: e,
            lengths: b,
          });
        })(
          (function (e, t = {}) {
            var i, u;
            let d,
              l,
              h,
              m,
              g,
              p = (0, f.o)("edwards", e, t, t.FpFnLE),
              { Fp: B, Fn: y } = p,
              b = p.CURVE,
              { h: x } = b;
            (0, n.S)(t, {}, { uvRatio: "function" });
            let w = c << (BigInt(8 * y.BYTES) - s),
              E =
                t.uvRatio ||
                ((e, t) => {
                  try {
                    return { isValid: !0, value: B.sqrt(B.div(e, t)) };
                  } catch (e) {
                    return { isValid: !1, value: a };
                  }
                });
            if (
              ((i = b.Gx),
              (u = b.Gy),
              (d = B.sqr(i)),
              (l = B.sqr(u)),
              (h = B.add(B.mul(b.a, d), l)),
              (m = B.add(B.ONE, B.mul(b.d, B.mul(d, l)))),
              !B.eql(h, m))
            )
              throw Error("bad curve params: generator point");
            function I(e, t, r = !1) {
              let f = r ? s : a;
              return ((0, n._)("coordinate " + e, t, f, w), t);
            }
            function v(e) {
              if (!(e instanceof z)) throw Error("ExtendedPoint expected");
            }
            let A = (0, n.W)((e, t) => {
                let r,
                  f,
                  { X: n, Y: i, Z: c } = e,
                  u = e.is0();
                null == t && (t = u ? o : B.inv(c));
                let d = ((r = n * t), B.create(r)),
                  l = ((f = i * t), B.create(f)),
                  h = B.mul(c, t);
                if (u) return { x: a, y: s };
                if (h !== s) throw Error("invZ was invalid");
                return { x: d, y: l };
              }),
              S = (0, n.W)((e) => {
                let t,
                  r,
                  f,
                  n,
                  i,
                  a,
                  s,
                  c,
                  o,
                  u,
                  d,
                  l,
                  { a: h, d: m } = b;
                if (e.is0()) throw Error("bad point: ZERO");
                let { X: g, Y: p, Z: y, T: x } = e,
                  w = ((t = g * g), B.create(t)),
                  E = ((r = p * p), B.create(r)),
                  I = ((f = y * y), B.create(f)),
                  v = ((n = I * I), B.create(n));
                if (
                  ((s = I * ((i = w * h), (a = B.create(i) + E), B.create(a))),
                  B.create(s) !==
                    ((u =
                      v + ((o = m * ((c = w * E), B.create(c))), B.create(o))),
                    B.create(u)))
                )
                  throw Error("bad point: equation left != right (1)");
                if (((d = g * p), B.create(d) !== ((l = y * x), B.create(l))))
                  throw Error("bad point: equation left != right (2)");
                return !0;
              });
            class z {
              constructor(e, t, r, f) {
                ((this.X = I("x", e)),
                  (this.Y = I("y", t)),
                  (this.Z = I("z", r, !0)),
                  (this.T = I("t", f)),
                  Object.freeze(this));
              }
              static CURVE() {
                return b;
              }
              static fromAffine(e) {
                let t;
                if (e instanceof z) throw Error("extended point not allowed");
                let { x: r, y: f } = e || {};
                return (
                  I("x", r),
                  I("y", f),
                  new z(r, f, s, ((t = r * f), B.create(t)))
                );
              }
              static fromBytes(e, t = !1) {
                let r,
                  f,
                  i,
                  c,
                  o = B.BYTES,
                  { a: u, d } = b;
                ((e = (0, n.t)((0, n.G)(e, o, "point"))),
                  (0, n.Y)(t, "zip215"));
                let l = (0, n.t)(e),
                  h = e[o - 1];
                l[o - 1] = -129 & h;
                let m = (0, n.F)(l),
                  g = t ? w : B.ORDER;
                (0, n._)("point.y", m, a, g);
                let p = ((r = m * m), B.create(r)),
                  { isValid: y, value: x } = E(
                    ((f = p - s), B.create(f)),
                    ((i = d * p - u), B.create(i)),
                  );
                if (!y) throw Error("bad point: invalid y coordinate");
                let I = (x & s) === s,
                  v = (128 & h) != 0;
                if (!t && x === a && v) throw Error("bad point: x=0 and x_0=1");
                return (
                  v !== I && ((c = -x), (x = B.create(c))),
                  z.fromAffine({ x, y: m })
                );
              }
              static fromHex(e, t = !1) {
                return z.fromBytes((0, n.z)("point", e), t);
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
                S(this);
              }
              equals(e) {
                let t, r, f, n;
                v(e);
                let { X: i, Y: a, Z: s } = this,
                  { X: c, Y: o, Z: u } = e,
                  d = ((t = i * u), B.create(t)),
                  l = ((r = c * s), B.create(r)),
                  h = ((f = a * u), B.create(f)),
                  m = ((n = o * s), B.create(n));
                return d === l && h === m;
              }
              is0() {
                return this.equals(z.ZERO);
              }
              negate() {
                let e, t;
                return new z(
                  ((e = -this.X), B.create(e)),
                  this.Y,
                  this.Z,
                  ((t = -this.T), B.create(t)),
                );
              }
              double() {
                let e,
                  t,
                  r,
                  f,
                  n,
                  i,
                  a,
                  s,
                  o,
                  u,
                  d,
                  { a: l } = b,
                  { X: h, Y: m, Z: g } = this,
                  p = ((e = h * h), B.create(e)),
                  y = ((t = m * m), B.create(t)),
                  x = ((f = c * ((r = g * g), B.create(r))), B.create(f)),
                  w = ((n = l * p), B.create(n)),
                  E = h + m,
                  I = ((i = E * E), (a = B.create(i) - p - y), B.create(a)),
                  v = w + y,
                  A = v - x,
                  S = w - y,
                  O = ((s = I * A), B.create(s)),
                  P = ((o = v * S), B.create(o)),
                  T = ((u = I * S), B.create(u));
                return new z(O, P, ((d = A * v), B.create(d)), T);
              }
              add(e) {
                let t, r, f, n, i, a, s, c, o, u;
                v(e);
                let { a: d, d: l } = b,
                  { X: h, Y: m, Z: g, T: p } = this,
                  { X: y, Y: x, Z: w, T: E } = e,
                  I = ((t = h * y), B.create(t)),
                  A = ((r = m * x), B.create(r)),
                  S = ((f = p * l * E), B.create(f)),
                  O = ((n = g * w), B.create(n)),
                  P = ((i = (h + m) * (y + x) - I - A), B.create(i)),
                  T = O - S,
                  R = O + S,
                  q = ((a = A - d * I), B.create(a)),
                  K = ((s = P * T), B.create(s)),
                  _ = ((c = R * q), B.create(c)),
                  F = ((o = P * q), B.create(o));
                return new z(K, _, ((u = T * R), B.create(u)), F);
              }
              subtract(e) {
                return this.add(e.negate());
              }
              multiply(e) {
                if (!y.isValidNot0(e))
                  throw Error("invalid scalar: expected 1 <= sc < curve.n");
                let { p: t, f: r } = O.cached(this, e, (e) => (0, f.s)(z, e));
                return (0, f.s)(z, [t, r])[0];
              }
              multiplyUnsafe(e, t = z.ZERO) {
                if (!y.isValid(e))
                  throw Error("invalid scalar: expected 0 <= sc < curve.n");
                return e === a
                  ? z.ZERO
                  : this.is0() || e === s
                    ? this
                    : O.unsafe(this, e, (e) => (0, f.s)(z, e), t);
              }
              isSmallOrder() {
                return this.multiplyUnsafe(x).is0();
              }
              isTorsionFree() {
                return O.unsafe(this, b.n).is0();
              }
              toAffine(e) {
                return A(this, e);
              }
              clearCofactor() {
                return x === s ? this : this.multiplyUnsafe(x);
              }
              toBytes() {
                let { x: e, y: t } = this.toAffine(),
                  r = B.toBytes(t);
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
                return (0, f.s)(z, e);
              }
              static msm(e, t) {
                return (0, f.g)(z, y, e, t);
              }
              _setWindowSize(e) {
                this.precompute(e);
              }
              toRawBytes() {
                return this.toBytes();
              }
            }
            ((z.BASE = new z(b.Gx, b.Gy, s, ((g = b.Gx * b.Gy), B.create(g)))),
              (z.ZERO = new z(a, s, s, a)),
              (z.Fp = B),
              (z.Fn = y));
            let O = new f.p(z, y.BITS);
            return (z.BASE.precompute(8), z);
          })(h, m),
          g,
          p,
        );
      return (
        (l = B.Point),
        Object.assign({}, B, {
          ExtendedPoint: l,
          CURVE: e,
          nBitLength: l.Fn.BITS,
          nByteLength: l.Fn.BYTES,
        })
      );
    })({
      ...b,
      Fp: E,
      hash: t.s,
      adjustScalarBytes: function (e) {
        return ((e[0] &= 248), (e[31] &= 127), (e[31] |= 64), e);
      },
      uvRatio: w,
    }),
    A = (y + g) / B,
    S = E.pow(m, A),
    z = E.sqrt(E.neg(E.ONE)),
    O = (0, i.s)(E, E.neg(BigInt(486664)));
  (0, d.O)(
    v.Point,
    (e) =>
      (function (e) {
        let t,
          r,
          f,
          n,
          a,
          s,
          c,
          o,
          u,
          d,
          l,
          g,
          b,
          x,
          w,
          I,
          v,
          A,
          P,
          T,
          R,
          q,
          K,
          {
            xMn: _,
            xMd: F,
            yMn: N,
            yMd: U,
          } = ((t = (y - p) / B),
          (r = BigInt(486662)),
          (f = E.sqr(e)),
          (f = E.mul(f, m)),
          (n = E.add(f, E.ONE)),
          (a = E.neg(r)),
          (s = E.sqr(n)),
          (c = E.mul(s, n)),
          (o = E.mul(f, r)),
          (o = E.mul(o, a)),
          (o = E.add(o, s)),
          (o = E.mul(o, a)),
          (u = E.sqr(c)),
          (s = E.sqr(u)),
          (u = E.mul(u, c)),
          (u = E.mul(u, o)),
          (s = E.mul(s, u)),
          (d = E.pow(s, t)),
          (d = E.mul(d, u)),
          (l = E.mul(d, z)),
          (s = E.sqr(d)),
          (s = E.mul(s, c)),
          (g = E.eql(s, o)),
          (b = E.cmov(l, d, g)),
          (x = E.mul(a, f)),
          (w = E.mul(d, e)),
          (w = E.mul(w, S)),
          (I = E.mul(w, z)),
          (v = E.mul(o, f)),
          (s = E.sqr(w)),
          (s = E.mul(s, c)),
          (A = E.eql(s, v)),
          (P = E.cmov(I, w, A)),
          (s = E.sqr(b)),
          (s = E.mul(s, c)),
          (T = E.eql(s, o)),
          (R = E.cmov(x, a, T)),
          (q = E.cmov(P, b, T)),
          (K = E.isOdd(q)),
          { xMn: R, xMd: n, yMn: (q = E.cmov(q, E.neg(q), T !== K)), yMd: h }),
          C = E.mul(_, U);
        C = E.mul(C, O);
        let Z = E.mul(F, N),
          H = E.sub(_, F),
          G = E.add(_, F),
          k = E.mul(Z, G),
          V = E.eql(k, E.ZERO);
        ((C = E.cmov(C, E.ZERO, V)),
          (Z = E.cmov(Z, E.ONE, V)),
          (H = E.cmov(H, E.ONE, V)),
          (G = E.cmov(G, E.ONE, V)));
        let [L, X] = (0, i.R)(E, [Z, G], !0);
        return { x: E.mul(C, L), y: E.mul(H, X) };
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
  let P = BigInt(
      "25063068953384623474111414158702152701244531502492656460079210482610430750235",
    ),
    T = BigInt(
      "54469307008909316920995813868745141605393597292927456921205312896311721017578",
    ),
    R = BigInt(
      "1159843021668779879193775521855586647937357759715417654439879720876111806838",
    ),
    q = BigInt(
      "40440834346308536858101042469323190826248399146238708352240133220865137265952",
    ),
    K = BigInt(
      "0x7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff",
    ),
    _ = (e) => v.Point.Fp.create((0, n.F)(e) & K);
  function F(e) {
    let t,
      r,
      f,
      n,
      a,
      s,
      c,
      o,
      u,
      d,
      l,
      m,
      g,
      p,
      B,
      { d: I } = b,
      A = ((t = x * e * e), E.create(t)),
      S = ((r = (A + h) * R), E.create(r)),
      z = BigInt(-1),
      O = ((n = (z - I * A) * ((f = A + I), E.create(f))), E.create(n)),
      { isValid: T, value: K } = w(S, O),
      _ = ((a = K * e), E.create(a));
    ((0, i.f)(_, y) || ((s = -_), (_ = E.create(s))),
      T || (K = _),
      T || (z = A));
    let F = ((c = z * (A - h) * q - O), E.create(c)),
      N = K * K,
      U = ((o = (K + K) * O), E.create(o)),
      C = ((u = F * P), E.create(u)),
      Z = ((d = h - N), E.create(d)),
      H = ((l = h + N), E.create(l));
    return new v.Point(
      ((m = U * H), E.create(m)),
      ((g = Z * C), E.create(g)),
      ((p = C * H), E.create(p)),
      ((B = U * Z), E.create(B)),
    );
  }
  class N extends u {
    constructor(e) {
      super(e);
    }
    static fromAffine(e) {
      return new N(v.Point.fromAffine(e));
    }
    assertSame(e) {
      if (!(e instanceof N)) throw Error("RistrettoPoint expected");
    }
    init(e) {
      return new N(e);
    }
    static hashToCurve(e) {
      var t;
      let f, i;
      return (
        (t = (0, n.z)("ristrettoHash", e, 64)),
        (0, r.C)(t, 64),
        (f = F(_(t.subarray(0, 32)))),
        (i = F(_(t.subarray(32, 64)))),
        new N(f.add(i))
      );
    }
    static fromBytes(e) {
      let t, f, a, s, c, o, u, d, m, g, p, B, x;
      (0, r.C)(e, 32);
      let { a: I, d: A } = b,
        S = _(e);
      if (!(0, n.v)(E.toBytes(S), e) || (0, i.f)(S, y))
        throw Error("invalid ristretto255 encoding 1");
      let z = ((t = S * S), E.create(t)),
        O = ((f = h + I * z), E.create(f)),
        P = ((a = h - I * z), E.create(a)),
        T = ((s = O * O), E.create(s)),
        R = ((c = P * P), E.create(c)),
        q = ((o = I * A * T - R), E.create(o)),
        { isValid: K, value: F } = ((u = q * R), w(h, E.create(u))),
        U = ((d = F * P), E.create(d)),
        C = ((m = F * U * q), E.create(m)),
        Z = ((g = (S + S) * U), E.create(g));
      (0, i.f)(Z, y) && ((p = -Z), (Z = E.create(p)));
      let H = ((B = O * C), E.create(B)),
        G = ((x = Z * H), E.create(x));
      if (!K || (0, i.f)(G, y) || H === l)
        throw Error("invalid ristretto255 encoding 2");
      return new N(new v.Point(Z, H, h, G));
    }
    static fromHex(e) {
      return N.fromBytes((0, n.z)("ristrettoHex", e, 32));
    }
    static msm(e, t) {
      return (0, f.g)(N, v.Point.Fn, e, t);
    }
    toBytes() {
      let e,
        t,
        r,
        f,
        n,
        a,
        s,
        c,
        o,
        u,
        d,
        l,
        m,
        { X: g, Y: p, Z: B, T: b } = this.ep,
        I =
          ((e = B + p),
          (r = E.create(e) * ((t = B - p), E.create(t))),
          E.create(r)),
        v = ((f = g * p), E.create(f)),
        { value: A } =
          ((a = I * ((n = v * v), E.create(n))), w(h, E.create(a))),
        S = ((s = A * I), E.create(s)),
        z = ((c = A * v), E.create(c)),
        O = ((o = S * z * b), E.create(o));
      if ((0, i.f)(b * O, y)) {
        let e,
          t,
          r = ((e = p * x), E.create(e)),
          f = ((t = g * x), E.create(t));
        ((g = r), (p = f), (m = E.create(S * T)));
      } else m = z;
      (0, i.f)(g * O, y) && ((u = -p), (p = E.create(u)));
      let P = ((d = (B - p) * m), E.create(d));
      return ((0, i.f)(P, y) && ((l = -P), (P = E.create(l))), E.toBytes(P));
    }
    equals(e) {
      let t, r, f, n;
      this.assertSame(e);
      let { X: i, Y: a } = this.ep,
        { X: s, Y: c } = e.ep,
        o = ((t = i * c), E.create(t) === ((r = a * s), E.create(r))),
        u = ((f = a * c), E.create(f) === ((n = i * s), E.create(n)));
      return o || u;
    }
    is0() {
      return this.equals(N.ZERO);
    }
  }
  ((N.BASE = new N(v.Point.BASE)),
    (N.ZERO = new N(v.Point.ZERO)),
    (N.Fp = E),
    (N.Fn = I),
    e.s(["f", 0, v], 430981));
};
