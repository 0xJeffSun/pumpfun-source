// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(837474),
    r = e.i(944445),
    n = e.i(365490),
    f = e.i(878660),
    i = e.i(288667);
  let a = BigInt(0),
    s = BigInt(1),
    o = BigInt(2),
    c = BigInt(8);
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
  let d = BigInt(0),
    h = BigInt(1),
    p = BigInt(2),
    m = BigInt(3),
    y = BigInt(5),
    v = BigInt(8),
    g = BigInt(
      "0x7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffed",
    ),
    b = {
      p: g,
      n: BigInt(
        "0x1000000000000000000000000000000014def9dea2f79cd65812631a5cf5d3ed",
      ),
      h: v,
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
  function x(e, t) {
    var r;
    let n,
      f,
      a,
      s,
      o,
      c,
      u,
      l,
      d,
      m,
      v,
      b,
      x,
      E,
      w = (0, i.K)(t * t * t, g),
      I = ((r = e * (0, i.K)(w * w * t, g)),
      (n = BigInt(10)),
      (f = BigInt(20)),
      (a = BigInt(40)),
      (s = BigInt(80)),
      (o = (((r * r) % g) * r) % g),
      (c = ((0, i.m)(o, p, g) * o) % g),
      (u = ((0, i.m)(c, h, g) * r) % g),
      (l = ((0, i.m)(u, y, g) * u) % g),
      (d = ((0, i.m)(l, n, g) * l) % g),
      (m = ((0, i.m)(d, f, g) * d) % g),
      (v = ((0, i.m)(m, a, g) * m) % g),
      (b = ((0, i.m)(v, s, g) * v) % g),
      (x = ((0, i.m)(b, s, g) * v) % g),
      (E = ((0, i.m)(x, n, g) * l) % g),
      { pow_p_5_8: ((0, i.m)(E, p, g) * r) % g, b2: o }).pow_p_5_8,
      _ = (0, i.K)(e * w * I, g),
      L = (0, i.K)(t * _ * _, g),
      O = _,
      S = (0, i.K)(_ * B, g),
      R = L === e,
      T = L === (0, i.K)(-e, g),
      A = L === (0, i.K)(-e * B, g);
    return (
      R && (_ = O),
      (T || A) && (_ = S),
      (0, i.f)(_, g) && (_ = (0, i.K)(-_, g)),
      { isValid: R || T, value: _ }
    );
  }
  let E = (0, i.N)(b.p, { isLE: !0 }),
    w = (0, i.N)(b.n, { isLE: !0 }),
    I = (function (e) {
      let t,
        u,
        l,
        d,
        {
          CURVE: h,
          curveOpts: p,
          hash: m,
          eddsaOpts: y,
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
        v = (function (e, t, n = {}) {
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
            { BASE: a, Fp: o, Fn: c } = e,
            u = n.randomBytes || r.a,
            l = n.adjustScalarBytes || ((e) => e),
            d =
              n.domain ||
              ((e, t, r) => {
                if (((0, f.Y)(r, "phflag"), t.length || r))
                  throw Error("Contexts/pre-hash are not supported");
                return e;
              });
          function h(e) {
            return c.create((0, f.F)(e));
          }
          function p(e) {
            var r;
            let n,
              i,
              s,
              o,
              c,
              {
                head: u,
                prefix: d,
                scalar: p,
              } = ((r = e),
              (n = b.secretKey),
              (r = (0, f.z)("private key", r, n)),
              (s = l(
                (i = (0, f.z)("hashed private key", t(r), 2 * n)).slice(0, n),
              )),
              (o = i.slice(n, 2 * n)),
              (c = h(s)),
              { head: s, prefix: o, scalar: c }),
              m = a.multiply(p),
              y = m.toBytes();
            return { head: u, prefix: d, scalar: p, point: m, pointBytes: y };
          }
          function m(e) {
            return p(e).pointBytes;
          }
          function y(e = Uint8Array.of(), ...n) {
            return h(t(d((0, r.t)(...n), (0, f.z)("context", e), !!i)));
          }
          let v = { zip215: !0 },
            g = o.BYTES,
            b = { secretKey: g, publicKey: g, signature: 2 * g, seed: g };
          function B(e = u(b.seed)) {
            return (0, f.G)(e, b.seed, "seed");
          }
          let x = {
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
                f = 32 === n;
              if (!f && 57 !== n) throw Error("only defined for 25519 and 448");
              let i = f ? o.div(s + r, s - r) : o.div(r - s, r + s);
              return o.toBytes(i);
            },
            toMontgomerySecret(e) {
              let r = b.secretKey;
              return ((0, f.G)(e, r), l(t(e.subarray(0, r))).subarray(0, r));
            },
            randomPrivateKey: B,
            precompute: (t = 8, r = e.BASE) => r.precompute(t, !1),
          };
          return Object.freeze({
            keygen: function (e) {
              let t = x.randomSecretKey(e);
              return { secretKey: t, publicKey: m(t) };
            },
            getPublicKey: m,
            sign: function (e, t, n = {}) {
              ((e = (0, f.z)("message", e)), i && (e = i(e)));
              let { prefix: s, scalar: o, pointBytes: u } = p(t),
                l = y(n.context, s, e),
                d = a.multiply(l).toBytes(),
                h = y(n.context, d, u, e),
                m = c.create(l + h * o);
              if (!c.isValid(m)) throw Error("sign failed: invalid s");
              let v = (0, r.t)(d, c.toBytes(m));
              return (0, f.G)(v, b.signature, "result");
            },
            verify: function (t, r, n, s = v) {
              let o,
                c,
                u,
                { context: l, zip215: d } = s,
                h = b.signature;
              ((t = (0, f.z)("signature", t, h)),
                (r = (0, f.z)("message", r)),
                (n = (0, f.z)("publicKey", n, b.publicKey)),
                void 0 !== d && (0, f.Y)(d, "zip215"),
                i && (r = i(r)));
              let p = h / 2,
                m = t.subarray(0, p),
                g = (0, f.F)(t.subarray(p, h));
              try {
                ((o = e.fromBytes(n, d)),
                  (c = e.fromBytes(m, d)),
                  (u = a.multiplyUnsafe(g)));
              } catch (e) {
                return !1;
              }
              if (!d && o.isSmallOrder()) return !1;
              let B = y(l, c.toBytes(), o.toBytes(), r);
              return c
                .add(o.multiplyUnsafe(B))
                .subtract(u)
                .clearCofactor()
                .is0();
            },
            utils: x,
            Point: e,
            lengths: b,
          });
        })(
          (function (e, t = {}) {
            var i, u;
            let l,
              d,
              h,
              p,
              m,
              y = (0, n.o)("edwards", e, t, t.FpFnLE),
              { Fp: v, Fn: g } = y,
              b = y.CURVE,
              { h: B } = b;
            (0, f.S)(t, {}, { uvRatio: "function" });
            let x = o << (BigInt(8 * g.BYTES) - s),
              E =
                t.uvRatio ||
                ((e, t) => {
                  try {
                    return { isValid: !0, value: v.sqrt(v.div(e, t)) };
                  } catch (e) {
                    return { isValid: !1, value: a };
                  }
                });
            if (
              ((i = b.Gx),
              (u = b.Gy),
              (l = v.sqr(i)),
              (d = v.sqr(u)),
              (h = v.add(v.mul(b.a, l), d)),
              (p = v.add(v.ONE, v.mul(b.d, v.mul(l, d)))),
              !v.eql(h, p))
            )
              throw Error("bad curve params: generator point");
            function w(e, t, r = !1) {
              let n = r ? s : a;
              return ((0, f._)("coordinate " + e, t, n, x), t);
            }
            function I(e) {
              if (!(e instanceof O)) throw Error("ExtendedPoint expected");
            }
            let _ = (0, f.W)((e, t) => {
                let r,
                  n,
                  { X: f, Y: i, Z: o } = e,
                  u = e.is0();
                null == t && (t = u ? c : v.inv(o));
                let l = ((r = f * t), v.create(r)),
                  d = ((n = i * t), v.create(n)),
                  h = v.mul(o, t);
                if (u) return { x: a, y: s };
                if (h !== s) throw Error("invZ was invalid");
                return { x: l, y: d };
              }),
              L = (0, f.W)((e) => {
                let t,
                  r,
                  n,
                  f,
                  i,
                  a,
                  s,
                  o,
                  c,
                  u,
                  l,
                  d,
                  { a: h, d: p } = b;
                if (e.is0()) throw Error("bad point: ZERO");
                let { X: m, Y: y, Z: g, T: B } = e,
                  x = ((t = m * m), v.create(t)),
                  E = ((r = y * y), v.create(r)),
                  w = ((n = g * g), v.create(n)),
                  I = ((f = w * w), v.create(f));
                if (
                  ((s = w * ((i = x * h), (a = v.create(i) + E), v.create(a))),
                  v.create(s) !==
                    ((u =
                      I + ((c = p * ((o = x * E), v.create(o))), v.create(c))),
                    v.create(u)))
                )
                  throw Error("bad point: equation left != right (1)");
                if (((l = m * y), v.create(l) !== ((d = g * B), v.create(d))))
                  throw Error("bad point: equation left != right (2)");
                return !0;
              });
            class O {
              constructor(e, t, r, n) {
                ((this.X = w("x", e)),
                  (this.Y = w("y", t)),
                  (this.Z = w("z", r, !0)),
                  (this.T = w("t", n)),
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
                  w("x", r),
                  w("y", n),
                  new O(r, n, s, ((t = r * n), v.create(t)))
                );
              }
              static fromBytes(e, t = !1) {
                let r,
                  n,
                  i,
                  o,
                  c = v.BYTES,
                  { a: u, d: l } = b;
                ((e = (0, f.t)((0, f.G)(e, c, "point"))),
                  (0, f.Y)(t, "zip215"));
                let d = (0, f.t)(e),
                  h = e[c - 1];
                d[c - 1] = -129 & h;
                let p = (0, f.F)(d),
                  m = t ? x : v.ORDER;
                (0, f._)("point.y", p, a, m);
                let y = ((r = p * p), v.create(r)),
                  { isValid: g, value: B } = E(
                    ((n = y - s), v.create(n)),
                    ((i = l * y - u), v.create(i)),
                  );
                if (!g) throw Error("bad point: invalid y coordinate");
                let w = (B & s) === s,
                  I = (128 & h) != 0;
                if (!t && B === a && I) throw Error("bad point: x=0 and x_0=1");
                return (
                  I !== w && ((o = -B), (B = v.create(o))),
                  O.fromAffine({ x: B, y: p })
                );
              }
              static fromHex(e, t = !1) {
                return O.fromBytes((0, f.z)("point", e), t);
              }
              get x() {
                return this.toAffine().x;
              }
              get y() {
                return this.toAffine().y;
              }
              precompute(e = 8, t = !0) {
                return (S.createCache(this, e), t || this.multiply(o), this);
              }
              assertValidity() {
                L(this);
              }
              equals(e) {
                let t, r, n, f;
                I(e);
                let { X: i, Y: a, Z: s } = this,
                  { X: o, Y: c, Z: u } = e,
                  l = ((t = i * u), v.create(t)),
                  d = ((r = o * s), v.create(r)),
                  h = ((n = a * u), v.create(n)),
                  p = ((f = c * s), v.create(f));
                return l === d && h === p;
              }
              is0() {
                return this.equals(O.ZERO);
              }
              negate() {
                let e, t;
                return new O(
                  ((e = -this.X), v.create(e)),
                  this.Y,
                  this.Z,
                  ((t = -this.T), v.create(t)),
                );
              }
              double() {
                let e,
                  t,
                  r,
                  n,
                  f,
                  i,
                  a,
                  s,
                  c,
                  u,
                  l,
                  { a: d } = b,
                  { X: h, Y: p, Z: m } = this,
                  y = ((e = h * h), v.create(e)),
                  g = ((t = p * p), v.create(t)),
                  B = ((n = o * ((r = m * m), v.create(r))), v.create(n)),
                  x = ((f = d * y), v.create(f)),
                  E = h + p,
                  w = ((i = E * E), (a = v.create(i) - y - g), v.create(a)),
                  I = x + g,
                  _ = I - B,
                  L = x - g,
                  S = ((s = w * _), v.create(s)),
                  R = ((c = I * L), v.create(c)),
                  T = ((u = w * L), v.create(u));
                return new O(S, R, ((l = _ * I), v.create(l)), T);
              }
              add(e) {
                let t, r, n, f, i, a, s, o, c, u;
                I(e);
                let { a: l, d } = b,
                  { X: h, Y: p, Z: m, T: y } = this,
                  { X: g, Y: B, Z: x, T: E } = e,
                  w = ((t = h * g), v.create(t)),
                  _ = ((r = p * B), v.create(r)),
                  L = ((n = y * d * E), v.create(n)),
                  S = ((f = m * x), v.create(f)),
                  R = ((i = (h + p) * (g + B) - w - _), v.create(i)),
                  T = S - L,
                  A = S + L,
                  C = ((a = _ - l * w), v.create(a)),
                  q = ((s = R * T), v.create(s)),
                  P = ((o = A * C), v.create(o)),
                  F = ((c = R * C), v.create(c));
                return new O(q, P, ((u = T * A), v.create(u)), F);
              }
              subtract(e) {
                return this.add(e.negate());
              }
              multiply(e) {
                if (!g.isValidNot0(e))
                  throw Error("invalid scalar: expected 1 <= sc < curve.n");
                let { p: t, f: r } = S.cached(this, e, (e) => (0, n.s)(O, e));
                return (0, n.s)(O, [t, r])[0];
              }
              multiplyUnsafe(e, t = O.ZERO) {
                if (!g.isValid(e))
                  throw Error("invalid scalar: expected 0 <= sc < curve.n");
                return e === a
                  ? O.ZERO
                  : this.is0() || e === s
                    ? this
                    : S.unsafe(this, e, (e) => (0, n.s)(O, e), t);
              }
              isSmallOrder() {
                return this.multiplyUnsafe(B).is0();
              }
              isTorsionFree() {
                return S.unsafe(this, b.n).is0();
              }
              toAffine(e) {
                return _(this, e);
              }
              clearCofactor() {
                return B === s ? this : this.multiplyUnsafe(B);
              }
              toBytes() {
                let { x: e, y: t } = this.toAffine(),
                  r = v.toBytes(t);
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
                return (0, n.s)(O, e);
              }
              static msm(e, t) {
                return (0, n.g)(O, g, e, t);
              }
              _setWindowSize(e) {
                this.precompute(e);
              }
              toRawBytes() {
                return this.toBytes();
              }
            }
            ((O.BASE = new O(b.Gx, b.Gy, s, ((m = b.Gx * b.Gy), v.create(m)))),
              (O.ZERO = new O(a, s, s, a)),
              (O.Fp = v),
              (O.Fn = g));
            let S = new n.p(O, g.BITS);
            return (O.BASE.precompute(8), O);
          })(h, p),
          m,
          y,
        );
      return (
        (d = v.Point),
        Object.assign({}, v, {
          ExtendedPoint: d,
          CURVE: e,
          nBitLength: d.Fn.BITS,
          nByteLength: d.Fn.BYTES,
        })
      );
    })({
      ...b,
      Fp: E,
      hash: t.s,
      adjustScalarBytes: function (e) {
        return ((e[0] &= 248), (e[31] &= 127), (e[31] |= 64), e);
      },
      uvRatio: x,
    }),
    _ = (g + m) / v,
    L = E.pow(p, _),
    O = E.sqrt(E.neg(E.ONE)),
    S = (0, i.s)(E, E.neg(BigInt(486664)));
  (0, l.O)(
    I.Point,
    (e) =>
      (function (e) {
        let t,
          r,
          n,
          f,
          a,
          s,
          o,
          c,
          u,
          l,
          d,
          m,
          b,
          B,
          x,
          w,
          I,
          _,
          R,
          T,
          A,
          C,
          q,
          {
            xMn: P,
            xMd: F,
            yMn: K,
            yMd: j,
          } = ((t = (g - y) / v),
          (r = BigInt(486662)),
          (n = E.sqr(e)),
          (n = E.mul(n, p)),
          (f = E.add(n, E.ONE)),
          (a = E.neg(r)),
          (s = E.sqr(f)),
          (o = E.mul(s, f)),
          (c = E.mul(n, r)),
          (c = E.mul(c, a)),
          (c = E.add(c, s)),
          (c = E.mul(c, a)),
          (u = E.sqr(o)),
          (s = E.sqr(u)),
          (u = E.mul(u, o)),
          (u = E.mul(u, c)),
          (s = E.mul(s, u)),
          (l = E.pow(s, t)),
          (l = E.mul(l, u)),
          (d = E.mul(l, O)),
          (s = E.sqr(l)),
          (s = E.mul(s, o)),
          (m = E.eql(s, c)),
          (b = E.cmov(d, l, m)),
          (B = E.mul(a, n)),
          (x = E.mul(l, e)),
          (x = E.mul(x, L)),
          (w = E.mul(x, O)),
          (I = E.mul(c, n)),
          (s = E.sqr(x)),
          (s = E.mul(s, o)),
          (_ = E.eql(s, I)),
          (R = E.cmov(w, x, _)),
          (s = E.sqr(b)),
          (s = E.mul(s, o)),
          (T = E.eql(s, c)),
          (A = E.cmov(B, a, T)),
          (C = E.cmov(R, b, T)),
          (q = E.isOdd(C)),
          { xMn: A, xMd: f, yMn: (C = E.cmov(C, E.neg(C), T !== q)), yMd: h }),
          Z = E.mul(P, j);
        Z = E.mul(Z, S);
        let U = E.mul(F, K),
          z = E.sub(P, F),
          N = E.add(P, F),
          G = E.mul(U, N),
          Y = E.eql(G, E.ZERO);
        ((Z = E.cmov(Z, E.ZERO, Y)),
          (U = E.cmov(U, E.ONE, Y)),
          (z = E.cmov(z, E.ONE, Y)),
          (N = E.cmov(N, E.ONE, Y)));
        let [M, V] = (0, i.R)(E, [U, N], !0);
        return { x: E.mul(Z, M), y: E.mul(z, V) };
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
  let R = BigInt(
      "25063068953384623474111414158702152701244531502492656460079210482610430750235",
    ),
    T = BigInt(
      "54469307008909316920995813868745141605393597292927456921205312896311721017578",
    ),
    A = BigInt(
      "1159843021668779879193775521855586647937357759715417654439879720876111806838",
    ),
    C = BigInt(
      "40440834346308536858101042469323190826248399146238708352240133220865137265952",
    ),
    q = BigInt(
      "0x7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff",
    ),
    P = (e) => I.Point.Fp.create((0, f.F)(e) & q);
  function F(e) {
    let t,
      r,
      n,
      f,
      a,
      s,
      o,
      c,
      u,
      l,
      d,
      p,
      m,
      y,
      v,
      { d: w } = b,
      _ = ((t = B * e * e), E.create(t)),
      L = ((r = (_ + h) * A), E.create(r)),
      O = BigInt(-1),
      S = ((f = (O - w * _) * ((n = _ + w), E.create(n))), E.create(f)),
      { isValid: T, value: q } = x(L, S),
      P = ((a = q * e), E.create(a));
    ((0, i.f)(P, g) || ((s = -P), (P = E.create(s))),
      T || (q = P),
      T || (O = _));
    let F = ((o = O * (_ - h) * C - S), E.create(o)),
      K = q * q,
      j = ((c = (q + q) * S), E.create(c)),
      Z = ((u = F * R), E.create(u)),
      U = ((l = h - K), E.create(l)),
      z = ((d = h + K), E.create(d));
    return new I.Point(
      ((p = j * z), E.create(p)),
      ((m = U * Z), E.create(m)),
      ((y = Z * z), E.create(y)),
      ((v = j * U), E.create(v)),
    );
  }
  class K extends u {
    constructor(e) {
      super(e);
    }
    static fromAffine(e) {
      return new K(I.Point.fromAffine(e));
    }
    assertSame(e) {
      if (!(e instanceof K)) throw Error("RistrettoPoint expected");
    }
    init(e) {
      return new K(e);
    }
    static hashToCurve(e) {
      var t;
      let n, i;
      return (
        (t = (0, f.z)("ristrettoHash", e, 64)),
        (0, r.C)(t, 64),
        (n = F(P(t.subarray(0, 32)))),
        (i = F(P(t.subarray(32, 64)))),
        new K(n.add(i))
      );
    }
    static fromBytes(e) {
      let t, n, a, s, o, c, u, l, p, m, y, v, B;
      (0, r.C)(e, 32);
      let { a: w, d: _ } = b,
        L = P(e);
      if (!(0, f.v)(E.toBytes(L), e) || (0, i.f)(L, g))
        throw Error("invalid ristretto255 encoding 1");
      let O = ((t = L * L), E.create(t)),
        S = ((n = h + w * O), E.create(n)),
        R = ((a = h - w * O), E.create(a)),
        T = ((s = S * S), E.create(s)),
        A = ((o = R * R), E.create(o)),
        C = ((c = w * _ * T - A), E.create(c)),
        { isValid: q, value: F } = ((u = C * A), x(h, E.create(u))),
        j = ((l = F * R), E.create(l)),
        Z = ((p = F * j * C), E.create(p)),
        U = ((m = (L + L) * j), E.create(m));
      (0, i.f)(U, g) && ((y = -U), (U = E.create(y)));
      let z = ((v = S * Z), E.create(v)),
        N = ((B = U * z), E.create(B));
      if (!q || (0, i.f)(N, g) || z === d)
        throw Error("invalid ristretto255 encoding 2");
      return new K(new I.Point(U, z, h, N));
    }
    static fromHex(e) {
      return K.fromBytes((0, f.z)("ristrettoHex", e, 32));
    }
    static msm(e, t) {
      return (0, n.g)(K, I.Point.Fn, e, t);
    }
    toBytes() {
      let e,
        t,
        r,
        n,
        f,
        a,
        s,
        o,
        c,
        u,
        l,
        d,
        p,
        { X: m, Y: y, Z: v, T: b } = this.ep,
        w =
          ((e = v + y),
          (r = E.create(e) * ((t = v - y), E.create(t))),
          E.create(r)),
        I = ((n = m * y), E.create(n)),
        { value: _ } =
          ((a = w * ((f = I * I), E.create(f))), x(h, E.create(a))),
        L = ((s = _ * w), E.create(s)),
        O = ((o = _ * I), E.create(o)),
        S = ((c = L * O * b), E.create(c));
      if ((0, i.f)(b * S, g)) {
        let e,
          t,
          r = ((e = y * B), E.create(e)),
          n = ((t = m * B), E.create(t));
        ((m = r), (y = n), (p = E.create(L * T)));
      } else p = O;
      (0, i.f)(m * S, g) && ((u = -y), (y = E.create(u)));
      let R = ((l = (v - y) * p), E.create(l));
      return ((0, i.f)(R, g) && ((d = -R), (R = E.create(d))), E.toBytes(R));
    }
    equals(e) {
      let t, r, n, f;
      this.assertSame(e);
      let { X: i, Y: a } = this.ep,
        { X: s, Y: o } = e.ep,
        c = ((t = i * o), E.create(t) === ((r = a * s), E.create(r))),
        u = ((n = a * o), E.create(n) === ((f = i * s), E.create(f)));
      return c || u;
    }
    is0() {
      return this.equals(K.ZERO);
    }
  }
  ((K.BASE = new K(I.Point.BASE)),
    (K.ZERO = new K(I.Point.ZERO)),
    (K.Fp = E),
    (K.Fn = w),
    e.s(["f", 0, I], 430981));
};
