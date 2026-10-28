// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(t) => {
  var e = t.i(417896),
    r = t.i(944445),
    n = t.i(878660),
    i = t.i(365490),
    o = t.i(288667);
  let l = (t, e) => (t + (t >= 0 ? e : -e) / c) / e;
  function s(t) {
    if (!["compact", "recovered", "der"].includes(t))
      throw Error('Signature format must be "compact", "recovered", or "der"');
    return t;
  }
  function u(t, e) {
    let r = {};
    for (let n of Object.keys(e)) r[n] = void 0 === t[n] ? e[n] : t[n];
    return (
      (0, n.Y)(r.lowS, "lowS"),
      (0, n.Y)(r.prehash, "prehash"),
      void 0 !== r.format && s(r.format),
      r
    );
  }
  let a = {
      Err: class extends Error {
        constructor(t = "") {
          super(t);
        }
      },
      _tlv: {
        encode: (t, e) => {
          let { Err: r } = a;
          if (t < 0 || t > 256) throw new r("tlv.encode: wrong tag");
          if (1 & e.length) throw new r("tlv.encode: unpadded data");
          let i = e.length / 2,
            o = (0, n.Z)(i);
          if ((o.length / 2) & 128)
            throw new r("tlv.encode: long form length too big");
          let l = i > 127 ? (0, n.Z)((o.length / 2) | 128) : "";
          return (0, n.Z)(t) + l + o + e;
        },
        decode(t, e) {
          let { Err: r } = a,
            n = 0;
          if (t < 0 || t > 256) throw new r("tlv.encode: wrong tag");
          if (e.length < 2 || e[n++] !== t)
            throw new r("tlv.decode: wrong tlv");
          let i = e[n++],
            o = 0;
          if (128 & i) {
            let t = 127 & i;
            if (!t)
              throw new r("tlv.decode(long): indefinite length not supported");
            if (t > 4) throw new r("tlv.decode(long): byte length is too big");
            let l = e.subarray(n, n + t);
            if (l.length !== t)
              throw new r("tlv.decode: length bytes not complete");
            if (0 === l[0]) throw new r("tlv.decode(long): zero leftmost byte");
            for (let t of l) o = (o << 8) | t;
            if (((n += t), o < 128))
              throw new r("tlv.decode(long): not minimal encoding");
          } else o = i;
          let l = e.subarray(n, n + o);
          if (l.length !== o) throw new r("tlv.decode: wrong value length");
          return { v: l, l: e.subarray(n + o) };
        },
      },
      _int: {
        encode(t) {
          let { Err: e } = a;
          if (t < f) throw new e("integer: negative integers are not allowed");
          let r = (0, n.Z)(t);
          if ((8 & Number.parseInt(r[0], 16) && (r = "00" + r), 1 & r.length))
            throw new e("unexpected DER parsing assertion: unpadded hex");
          return r;
        },
        decode(t) {
          let { Err: e } = a;
          if (128 & t[0]) throw new e("invalid signature integer: negative");
          if (0 === t[0] && !(128 & t[1]))
            throw new e("invalid signature integer: unnecessary leading zero");
          return (0, n.s)(t);
        },
      },
      toSig(t) {
        let { Err: e, _int: r, _tlv: i } = a,
          o = (0, n.z)("signature", t),
          { v: l, l: s } = i.decode(48, o);
        if (s.length)
          throw new e("invalid signature: left bytes after parsing");
        let { v: u, l: f } = i.decode(2, l),
          { v: d, l: c } = i.decode(2, f);
        if (c.length)
          throw new e("invalid signature: left bytes after parsing");
        return { r: r.decode(u), s: r.decode(d) };
      },
      hexFromSig(t) {
        let { _tlv: e, _int: r } = a,
          n = e.encode(2, r.encode(t.r)),
          i = e.encode(2, r.encode(t.s));
        return e.encode(48, n + i);
      },
    },
    f = BigInt(0),
    d = BigInt(1),
    c = BigInt(2),
    h = BigInt(3),
    m = BigInt(4);
  function p(t, e) {
    let r,
      { BYTES: i } = t;
    if ("bigint" == typeof e) r = e;
    else {
      let o = (0, n.z)("private key", e);
      try {
        r = t.fromBytes(o);
      } catch (t) {
        throw Error(
          `invalid private key: expected ui8a of size ${i}, got ${typeof e}`,
        );
      }
    }
    if (!t.isValidNot0(r))
      throw Error("invalid private key: out of range [1..N-1]");
    return r;
  }
  function g(t) {
    return Uint8Array.of(t ? 2 : 3);
  }
  function y(t, e) {
    return {
      secretKey: e.BYTES,
      publicKey: 1 + t.BYTES,
      publicKeyUncompressed: 1 + 2 * t.BYTES,
      publicKeyHasPrefix: !0,
      signature: 2 * e.BYTES,
    };
  }
  function w(t) {
    let w,
      {
        CURVE: E,
        curveOpts: b,
        hash: v,
        ecdsaOpts: B,
      } = (function (t) {
        let e,
          r,
          n,
          i,
          { CURVE: l, curveOpts: s } =
            ((e = {
              a: t.a,
              b: t.b,
              p: t.Fp.ORDER,
              n: t.n,
              h: t.h,
              Gx: t.Gx,
              Gy: t.Gy,
            }),
            (r = t.Fp),
            (n = t.allowedPrivateKeyLengths
              ? Array.from(
                  new Set(
                    t.allowedPrivateKeyLengths.map((t) => Math.ceil(t / 2)),
                  ),
                )
              : void 0),
            (i = {
              Fp: r,
              Fn: (0, o.N)(e.n, {
                BITS: t.nBitLength,
                allowedLengths: n,
                modFromBytes: t.wrapPrivateKey,
              }),
              allowInfinityPoint: t.allowInfinityPoint,
              endo: t.endo,
              isTorsionFree: t.isTorsionFree,
              clearCofactor: t.clearCofactor,
              fromBytes: t.fromBytes,
              toBytes: t.toBytes,
            }),
            { CURVE: e, curveOpts: i }),
          u = {
            hmac: t.hmac,
            randomBytes: t.randomBytes,
            lowS: t.lowS,
            bits2int: t.bits2int,
            bits2int_modN: t.bits2int_modN,
          };
        return { CURVE: l, curveOpts: s, hash: t.hash, ecdsaOpts: u };
      })(t),
      O = (function (t, i, l = {}) {
        ((0, r.v)(i),
          (0, n.S)(
            l,
            {},
            {
              hmac: "function",
              lowS: "boolean",
              randomBytes: "function",
              bits2int: "function",
              bits2int_modN: "function",
            },
          ));
        let h = l.randomBytes || r.a,
          m = l.hmac || ((t, ...n) => (0, e.f)(i, t, (0, r.t)(...n))),
          { Fp: w, Fn: E } = t,
          { ORDER: b, BITS: v } = E,
          {
            keygen: B,
            getPublicKey: O,
            getSharedSecret: R,
            utils: S,
            lengths: x,
          } = (function (t, e = {}) {
            let { Fn: i } = t,
              l = e.randomBytes || r.a,
              s = Object.assign(y(t.Fp, i), { seed: (0, o.M)(i.ORDER) });
            function u(t) {
              try {
                return !!p(i, t);
              } catch (t) {
                return !1;
              }
            }
            function a(t = l(s.seed)) {
              return (0, o.y)((0, n.G)(t, s.seed, "seed"), i.ORDER);
            }
            function f(e, r = !0) {
              return t.BASE.multiply(p(i, e)).toBytes(r);
            }
            function d(e) {
              if ("bigint" == typeof e) return !1;
              if (e instanceof t) return !0;
              let { secretKey: r, publicKey: o, publicKeyUncompressed: l } = s;
              if (i.allowedLengths || r === o) return;
              let u = (0, n.z)("key", e).length;
              return u === o || u === l;
            }
            return Object.freeze({
              getPublicKey: f,
              getSharedSecret: function (e, r, n = !0) {
                if (!0 === d(e)) throw Error("first arg must be private key");
                if (!1 === d(r)) throw Error("second arg must be public key");
                let o = p(i, e);
                return t.fromHex(r).multiply(o).toBytes(n);
              },
              keygen: function (t) {
                let e = a(t);
                return { secretKey: e, publicKey: f(e) };
              },
              Point: t,
              utils: {
                isValidSecretKey: u,
                isValidPublicKey: function (e, r) {
                  let { publicKey: n, publicKeyUncompressed: i } = s;
                  try {
                    let o = e.length;
                    if ((!0 === r && o !== n) || (!1 === r && o !== i))
                      return !1;
                    return !!t.fromBytes(e);
                  } catch (t) {
                    return !1;
                  }
                },
                randomSecretKey: a,
                isValidPrivateKey: u,
                randomPrivateKey: a,
                normPrivateKeyToScalar: (t) => p(i, t),
                precompute: (e = 8, r = t.BASE) => r.precompute(e, !1),
              },
              lengths: s,
            });
          })(t, l),
          A = {
            prehash: !1,
            lowS: "boolean" == typeof l.lowS && l.lowS,
            format: void 0,
            extraEntropy: !1,
          },
          q = "compact";
        function N(t, e) {
          if (!E.isValidNot0(e))
            throw Error(
              `invalid signature ${t}: out of range 1..Point.Fn.ORDER`,
            );
          return e;
        }
        class Z {
          constructor(t, e, r) {
            ((this.r = N("r", t)),
              (this.s = N("s", e)),
              null != r && (this.recovery = r),
              Object.freeze(this));
          }
          static fromBytes(t, e = q) {
            var r, i;
            let o, l;
            if (
              ((r = t),
              s((i = e)),
              (l = x.signature),
              (0, n.G)(
                r,
                "compact" === i ? l : "recovered" === i ? l + 1 : void 0,
                `${i} signature`,
              ),
              "der" === e)
            ) {
              let { r: e, s: r } = a.toSig((0, n.G)(t));
              return new Z(e, r);
            }
            "recovered" === e &&
              ((o = t[0]), (e = "compact"), (t = t.subarray(1)));
            let u = E.BYTES,
              f = t.subarray(0, u),
              d = t.subarray(u, 2 * u);
            return new Z(E.fromBytes(f), E.fromBytes(d), o);
          }
          static fromHex(t, e) {
            return this.fromBytes((0, r.X)(t), e);
          }
          addRecoveryBit(t) {
            return new Z(this.r, this.s, t);
          }
          recoverPublicKey(e) {
            let i = w.ORDER,
              { r: o, s: l, recovery: s } = this;
            if (null == s || ![0, 1, 2, 3].includes(s))
              throw Error("recovery id invalid");
            if (b * c < i && s > 1)
              throw Error("recovery id is ambiguous for h>1 curve");
            let u = 2 === s || 3 === s ? o + b : o;
            if (!w.isValid(u)) throw Error("recovery id 2 or 3 invalid");
            let a = w.toBytes(u),
              f = t.fromBytes((0, r.t)(g((1 & s) == 0), a)),
              d = E.inv(u),
              h = F((0, n.z)("msgHash", e)),
              m = E.create(-h * d),
              p = E.create(l * d),
              y = t.BASE.multiplyUnsafe(m).add(f.multiplyUnsafe(p));
            if (y.is0()) throw Error("point at infinify");
            return (y.assertValidity(), y);
          }
          hasHighS() {
            return this.s > b >> d;
          }
          toBytes(t = q) {
            if ((s(t), "der" === t)) return (0, r.X)(a.hexFromSig(this));
            let e = E.toBytes(this.r),
              n = E.toBytes(this.s);
            if ("recovered" === t) {
              if (null == this.recovery)
                throw Error("recovery bit must be present");
              return (0, r.t)(Uint8Array.of(this.recovery), e, n);
            }
            return (0, r.t)(e, n);
          }
          toHex(t) {
            return (0, r.w)(this.toBytes(t));
          }
          assertValidity() {}
          static fromCompact(t) {
            return Z.fromBytes((0, n.z)("sig", t), "compact");
          }
          static fromDER(t) {
            return Z.fromBytes((0, n.z)("sig", t), "der");
          }
          normalizeS() {
            return this.hasHighS()
              ? new Z(this.r, E.neg(this.s), this.recovery)
              : this;
          }
          toDERRawBytes() {
            return this.toBytes("der");
          }
          toDERHex() {
            return (0, r.w)(this.toBytes("der"));
          }
          toCompactRawBytes() {
            return this.toBytes("compact");
          }
          toCompactHex() {
            return (0, r.w)(this.toBytes("compact"));
          }
        }
        let I =
            l.bits2int ||
            function (t) {
              if (t.length > 8192) throw Error("input is too large");
              let e = (0, n.s)(t),
                r = 8 * t.length - v;
              return r > 0 ? e >> BigInt(r) : e;
            },
          F =
            l.bits2int_modN ||
            function (t) {
              return E.create(I(t));
            },
          U = (0, n.r)(v);
        function V(t) {
          return ((0, n._)("num < 2^" + v, t, f, U), E.toBytes(t));
        }
        function T(t, e) {
          return (
            (0, n.G)(t, void 0, "message"),
            e ? (0, n.G)(i(t), void 0, "prehashed message") : t
          );
        }
        return Object.freeze({
          keygen: B,
          getPublicKey: O,
          getSharedSecret: R,
          utils: S,
          lengths: x,
          Point: t,
          sign: function (e, o, l = {}) {
            let { seed: s, k2sig: a } = (function (e, i, o) {
              if (["recovered", "canonical"].some((t) => t in o))
                throw Error("sign() legacy options not supported");
              let { lowS: l, prehash: s, extraEntropy: a } = u(o, A),
                c = F((e = T(e, s))),
                m = p(E, i),
                g = [V(m), V(c)];
              if (null != a && !1 !== a) {
                let t = !0 === a ? h(x.secretKey) : a;
                g.push((0, n.z)("extraEntropy", t));
              }
              return {
                seed: (0, r.t)(...g),
                k2sig: function (e) {
                  let r = I(e);
                  if (!E.isValidNot0(r)) return;
                  let n = E.inv(r),
                    i = t.BASE.multiply(r).toAffine(),
                    o = E.create(i.x);
                  if (o === f) return;
                  let s = E.create(n * E.create(c + o * m));
                  if (s === f) return;
                  let u = (2 * (i.x !== o)) | Number(i.y & d),
                    a = s;
                  return (
                    l && s > b >> d && ((a = E.neg(s)), (u ^= 1)),
                    new Z(o, a, u)
                  );
                },
              };
            })((e = (0, n.z)("message", e)), o, l);
            return (0, n.u)(i.outputLen, E.BYTES, m)(s, a);
          },
          verify: function (e, i, o, l = {}) {
            let { lowS: s, prehash: f, format: d } = u(l, A);
            if (
              ((o = (0, n.z)("publicKey", o)),
              (i = T((0, n.z)("message", i), f)),
              "strict" in l)
            )
              throw Error("options.strict was renamed to lowS");
            let c =
              void 0 === d
                ? (function (t) {
                    let e,
                      i = "string" == typeof t || (0, r.g)(t),
                      o =
                        !i &&
                        null !== t &&
                        "object" == typeof t &&
                        "bigint" == typeof t.r &&
                        "bigint" == typeof t.s;
                    if (!i && !o)
                      throw Error(
                        "invalid signature, expected Uint8Array, hex string or Signature instance",
                      );
                    if (o) e = new Z(t.r, t.s);
                    else if (i) {
                      try {
                        e = Z.fromBytes((0, n.z)("sig", t), "der");
                      } catch (t) {
                        if (!(t instanceof a.Err)) throw t;
                      }
                      if (!e)
                        try {
                          e = Z.fromBytes((0, n.z)("sig", t), "compact");
                        } catch (t) {
                          return !1;
                        }
                    }
                    return !!e && e;
                  })(e)
                : Z.fromBytes((0, n.z)("sig", e), d);
            if (!1 === c) return !1;
            try {
              let e = t.fromBytes(o);
              if (s && c.hasHighS()) return !1;
              let { r, s: n } = c,
                l = F(i),
                u = E.inv(n),
                a = E.create(l * u),
                f = E.create(r * u),
                d = t.BASE.multiplyUnsafe(a).add(e.multiplyUnsafe(f));
              if (d.is0()) return !1;
              return E.create(d.x) === r;
            } catch (t) {
              return !1;
            }
          },
          recoverPublicKey: function (t, e, r = {}) {
            let { prehash: n } = u(r, A);
            return (
              (e = T(e, n)),
              Z.fromBytes(t, "recovered").recoverPublicKey(e).toBytes()
            );
          },
          Signature: Z,
          hash: i,
        });
      })(
        (function (t, e = {}) {
          let o = (0, i.o)("weierstrass", t, e),
            { Fp: s, Fn: u } = o,
            a = o.CURVE,
            { h: c, n: w } = a;
          (0, n.S)(
            e,
            {},
            {
              allowInfinityPoint: "boolean",
              clearCofactor: "function",
              isTorsionFree: "function",
              fromBytes: "function",
              toBytes: "function",
              endo: "object",
              wrapPrivateKey: "boolean",
            },
          );
          let { endo: E } = e;
          if (
            E &&
            (!s.is0(a.a) ||
              "bigint" != typeof E.beta ||
              !Array.isArray(E.basises))
          )
            throw Error(
              'invalid endo: expected "beta": bigint and "basises": array',
            );
          let b = y(s, u);
          function v() {
            if (!s.isOdd)
              throw Error(
                "compression is not supported: Field does not have .isOdd()",
              );
          }
          let B =
              e.toBytes ||
              function (t, e, i) {
                let { x: o, y: l } = e.toAffine(),
                  u = s.toBytes(o);
                if (((0, n.Y)(i, "isCompressed"), !i))
                  return (0, r.t)(Uint8Array.of(4), u, s.toBytes(l));
                {
                  v();
                  let t = !s.isOdd(l);
                  return (0, r.t)(g(t), u);
                }
              },
            O =
              e.fromBytes ||
              function (t) {
                (0, n.G)(t, void 0, "Point");
                let { publicKey: e, publicKeyUncompressed: r } = b,
                  i = t.length,
                  o = t[0],
                  l = t.subarray(1);
                if (i === e && (2 === o || 3 === o)) {
                  let t,
                    e = s.fromBytes(l);
                  if (!s.isValid(e))
                    throw Error("bad point: is not on curve, wrong x");
                  let r = R(e);
                  try {
                    t = s.sqrt(r);
                  } catch (t) {
                    throw Error(
                      "bad point: is not on curve, sqrt error" +
                        (t instanceof Error ? ": " + t.message : ""),
                    );
                  }
                  return (
                    v(),
                    ((1 & o) == 1) !== s.isOdd(t) && (t = s.neg(t)),
                    { x: e, y: t }
                  );
                }
                if (i === r && 4 === o) {
                  let t = s.BYTES,
                    e = s.fromBytes(l.subarray(0, t)),
                    r = s.fromBytes(l.subarray(t, 2 * t));
                  if (!S(e, r)) throw Error("bad point: is not on curve");
                  return { x: e, y: r };
                }
                throw Error(
                  `bad point: got length ${i}, expected compressed=${e} or uncompressed=${r}`,
                );
              };
          function R(t) {
            let e = s.sqr(t),
              r = s.mul(e, t);
            return s.add(s.add(r, s.mul(t, a.a)), a.b);
          }
          function S(t, e) {
            let r = s.sqr(e),
              n = R(t);
            return s.eql(r, n);
          }
          if (!S(a.Gx, a.Gy)) throw Error("bad curve params: generator point");
          let x = s.mul(s.pow(a.a, h), m),
            A = s.mul(s.sqr(a.b), BigInt(27));
          if (s.is0(s.add(x, A))) throw Error("bad curve params: a or b");
          function q(t, e, r = !1) {
            if (!s.isValid(e) || (r && s.is0(e)))
              throw Error(`bad point coordinate ${t}`);
            return e;
          }
          function N(t) {
            if (!(t instanceof V)) throw Error("ProjectivePoint expected");
          }
          function Z(t) {
            if (!E || !E.basises) throw Error("no endo");
            return (function (t, e, r) {
              let [[i, o], [s, u]] = e,
                a = l(u * t, r),
                c = l(-o * t, r),
                h = t - a * i - c * s,
                m = -a * o - c * u,
                p = h < f,
                g = m < f;
              (p && (h = -h), g && (m = -m));
              let y = (0, n.r)(Math.ceil((0, n.y)(r) / 2)) + d;
              if (h < f || h >= y || m < f || m >= y)
                throw Error("splitScalar (endomorphism): failed, k=" + t);
              return { k1neg: p, k1: h, k2neg: g, k2: m };
            })(t, E.basises, u.ORDER);
          }
          let I = (0, n.W)((t, e) => {
              let { X: r, Y: n, Z: i } = t;
              if (s.eql(i, s.ONE)) return { x: r, y: n };
              let o = t.is0();
              null == e && (e = o ? s.ONE : s.inv(i));
              let l = s.mul(r, e),
                u = s.mul(n, e),
                a = s.mul(i, e);
              if (o) return { x: s.ZERO, y: s.ZERO };
              if (!s.eql(a, s.ONE)) throw Error("invZ was invalid");
              return { x: l, y: u };
            }),
            F = (0, n.W)((t) => {
              if (t.is0()) {
                if (e.allowInfinityPoint && !s.is0(t.Y)) return;
                throw Error("bad point: ZERO");
              }
              let { x: r, y: n } = t.toAffine();
              if (!s.isValid(r) || !s.isValid(n))
                throw Error("bad point: x or y not field elements");
              if (!S(r, n)) throw Error("bad point: equation left != right");
              if (!t.isTorsionFree())
                throw Error("bad point: not in prime-order subgroup");
              return !0;
            });
          function U(t, e, r, n, o) {
            return (
              (r = new V(s.mul(r.X, t), r.Y, r.Z)),
              (e = (0, i.d)(n, e)),
              (r = (0, i.d)(o, r)),
              e.add(r)
            );
          }
          class V {
            constructor(t, e, r) {
              ((this.X = q("x", t)),
                (this.Y = q("y", e, !0)),
                (this.Z = q("z", r)),
                Object.freeze(this));
            }
            static CURVE() {
              return a;
            }
            static fromAffine(t) {
              let { x: e, y: r } = t || {};
              if (!t || !s.isValid(e) || !s.isValid(r))
                throw Error("invalid affine point");
              if (t instanceof V) throw Error("projective point not allowed");
              return s.is0(e) && s.is0(r) ? V.ZERO : new V(e, r, s.ONE);
            }
            static fromBytes(t) {
              let e = V.fromAffine(O((0, n.G)(t, void 0, "point")));
              return (e.assertValidity(), e);
            }
            static fromHex(t) {
              return V.fromBytes((0, n.z)("pointHex", t));
            }
            get x() {
              return this.toAffine().x;
            }
            get y() {
              return this.toAffine().y;
            }
            precompute(t = 8, e = !0) {
              return (C.createCache(this, t), e || this.multiply(h), this);
            }
            assertValidity() {
              F(this);
            }
            hasEvenY() {
              let { y: t } = this.toAffine();
              if (!s.isOdd) throw Error("Field doesn't support isOdd");
              return !s.isOdd(t);
            }
            equals(t) {
              N(t);
              let { X: e, Y: r, Z: n } = this,
                { X: i, Y: o, Z: l } = t,
                u = s.eql(s.mul(e, l), s.mul(i, n)),
                a = s.eql(s.mul(r, l), s.mul(o, n));
              return u && a;
            }
            negate() {
              return new V(this.X, s.neg(this.Y), this.Z);
            }
            double() {
              let { a: t, b: e } = a,
                r = s.mul(e, h),
                { X: n, Y: i, Z: o } = this,
                l = s.ZERO,
                u = s.ZERO,
                f = s.ZERO,
                d = s.mul(n, n),
                c = s.mul(i, i),
                m = s.mul(o, o),
                p = s.mul(n, i);
              return (
                (p = s.add(p, p)),
                (f = s.mul(n, o)),
                (f = s.add(f, f)),
                (l = s.mul(t, f)),
                (u = s.mul(r, m)),
                (u = s.add(l, u)),
                (l = s.sub(c, u)),
                (u = s.add(c, u)),
                (u = s.mul(l, u)),
                (l = s.mul(p, l)),
                (f = s.mul(r, f)),
                (m = s.mul(t, m)),
                (p = s.sub(d, m)),
                (p = s.mul(t, p)),
                (p = s.add(p, f)),
                (f = s.add(d, d)),
                (d = s.add(f, d)),
                (d = s.add(d, m)),
                (d = s.mul(d, p)),
                (u = s.add(u, d)),
                (m = s.mul(i, o)),
                (m = s.add(m, m)),
                (d = s.mul(m, p)),
                (l = s.sub(l, d)),
                (f = s.mul(m, c)),
                (f = s.add(f, f)),
                new V(l, u, (f = s.add(f, f)))
              );
            }
            add(t) {
              N(t);
              let { X: e, Y: r, Z: n } = this,
                { X: i, Y: o, Z: l } = t,
                u = s.ZERO,
                f = s.ZERO,
                d = s.ZERO,
                c = a.a,
                m = s.mul(a.b, h),
                p = s.mul(e, i),
                g = s.mul(r, o),
                y = s.mul(n, l),
                w = s.add(e, r),
                E = s.add(i, o);
              ((w = s.mul(w, E)),
                (E = s.add(p, g)),
                (w = s.sub(w, E)),
                (E = s.add(e, n)));
              let b = s.add(i, l);
              return (
                (E = s.mul(E, b)),
                (b = s.add(p, y)),
                (E = s.sub(E, b)),
                (b = s.add(r, n)),
                (u = s.add(o, l)),
                (b = s.mul(b, u)),
                (u = s.add(g, y)),
                (b = s.sub(b, u)),
                (d = s.mul(c, E)),
                (u = s.mul(m, y)),
                (d = s.add(u, d)),
                (u = s.sub(g, d)),
                (d = s.add(g, d)),
                (f = s.mul(u, d)),
                (g = s.add(p, p)),
                (g = s.add(g, p)),
                (y = s.mul(c, y)),
                (E = s.mul(m, E)),
                (g = s.add(g, y)),
                (y = s.sub(p, y)),
                (y = s.mul(c, y)),
                (E = s.add(E, y)),
                (p = s.mul(g, E)),
                (f = s.add(f, p)),
                (p = s.mul(b, E)),
                (u = s.mul(w, u)),
                (u = s.sub(u, p)),
                (p = s.mul(w, g)),
                (d = s.mul(b, d)),
                new V(u, f, (d = s.add(d, p)))
              );
            }
            subtract(t) {
              return this.add(t.negate());
            }
            is0() {
              return this.equals(V.ZERO);
            }
            multiply(t) {
              let r,
                n,
                { endo: o } = e;
              if (!u.isValidNot0(t))
                throw Error("invalid scalar: out of range");
              let l = (t) => C.cached(this, t, (t) => (0, i.s)(V, t));
              if (o) {
                let { k1neg: e, k1: i, k2neg: s, k2: u } = Z(t),
                  { p: a, f: f } = l(i),
                  { p: d, f: c } = l(u);
                ((n = f.add(c)), (r = U(o.beta, a, d, e, s)));
              } else {
                let { p: e, f: i } = l(t);
                ((r = e), (n = i));
              }
              return (0, i.s)(V, [r, n])[0];
            }
            multiplyUnsafe(t) {
              let { endo: r } = e;
              if (!u.isValid(t)) throw Error("invalid scalar: out of range");
              if (t === f || this.is0()) return V.ZERO;
              if (t === d) return this;
              if (C.hasCache(this)) return this.multiply(t);
              if (!r) return C.unsafe(this, t);
              {
                let { k1neg: e, k1: n, k2neg: o, k2: l } = Z(t),
                  { p1: s, p2: u } = (0, i.c)(V, this, n, l);
                return U(r.beta, s, u, e, o);
              }
            }
            multiplyAndAddUnsafe(t, e, r) {
              let n = this.multiplyUnsafe(e).add(t.multiplyUnsafe(r));
              return n.is0() ? void 0 : n;
            }
            toAffine(t) {
              return I(this, t);
            }
            isTorsionFree() {
              let { isTorsionFree: t } = e;
              return c === d || (t ? t(V, this) : C.unsafe(this, w).is0());
            }
            clearCofactor() {
              let { clearCofactor: t } = e;
              return c === d ? this : t ? t(V, this) : this.multiplyUnsafe(c);
            }
            isSmallOrder() {
              return this.multiplyUnsafe(c).is0();
            }
            toBytes(t = !0) {
              return (
                (0, n.Y)(t, "isCompressed"),
                this.assertValidity(),
                B(V, this, t)
              );
            }
            toHex(t = !0) {
              return (0, r.w)(this.toBytes(t));
            }
            toString() {
              return `<Point ${this.is0() ? "ZERO" : this.toHex()}>`;
            }
            get px() {
              return this.X;
            }
            get py() {
              return this.X;
            }
            get pz() {
              return this.Z;
            }
            toRawBytes(t = !0) {
              return this.toBytes(t);
            }
            _setWindowSize(t) {
              this.precompute(t);
            }
            static normalizeZ(t) {
              return (0, i.s)(V, t);
            }
            static msm(t, e) {
              return (0, i.g)(V, u, t, e);
            }
            static fromPrivateKey(t) {
              return V.BASE.multiply(p(u, t));
            }
          }
          ((V.BASE = new V(a.Gx, a.Gy, s.ONE)),
            (V.ZERO = new V(s.ZERO, s.ONE, s.ZERO)),
            (V.Fp = s),
            (V.Fn = u));
          let T = u.BITS,
            C = new i.p(V, e.endo ? Math.ceil(T / 2) : T);
          return (V.BASE.precompute(8), V);
        })(E, b),
        v,
        B,
      );
    return (
      (w = O.Point),
      Object.assign({}, O, {
        ProjectivePoint: w,
        CURVE: Object.assign({}, t, (0, o.v)(w.Fn.ORDER, w.Fn.BITS)),
      })
    );
  }
  (t.s(
    [
      "c",
      0,
      p,
      "h",
      0,
      function (t, e) {
        (0, o.P)(t);
        let { A: r, B: n, Z: i } = e;
        if (!t.isValid(r) || !t.isValid(n) || !t.isValid(i))
          throw Error("mapToCurveSimpleSWU: invalid opts");
        let l = (function (t, e) {
          let r = t.ORDER,
            n = f;
          for (let t = r - d; t % c === f; t /= c) n += d;
          let i = n,
            o = c << (i - d - d),
            l = o * c,
            s = (r - d) / l,
            u = (s - d) / c,
            a = l - d,
            p = t.pow(e, s),
            g = t.pow(e, (s + d) / c),
            y = (e, r) => {
              let n = p,
                l = t.pow(r, a),
                s = t.sqr(l);
              s = t.mul(s, r);
              let f = t.mul(e, s);
              ((f = t.pow(f, u)),
                (f = t.mul(f, l)),
                (l = t.mul(f, r)),
                (s = t.mul(f, e)));
              let h = t.mul(s, l);
              f = t.pow(h, o);
              let m = t.eql(f, t.ONE);
              ((l = t.mul(s, g)),
                (f = t.mul(h, n)),
                (s = t.cmov(l, s, m)),
                (h = t.cmov(f, h, m)));
              for (let e = i; e > d; e--) {
                let r = e - c;
                r = c << (r - d);
                let i = t.pow(h, r),
                  o = t.eql(i, t.ONE);
                ((l = t.mul(s, n)),
                  (n = t.mul(n, n)),
                  (i = t.mul(h, n)),
                  (s = t.cmov(l, s, o)),
                  (h = t.cmov(i, h, o)));
              }
              return { isValid: m, value: s };
            };
          if (t.ORDER % m === h) {
            let r = (t.ORDER - h) / m,
              n = t.sqrt(t.neg(e));
            y = (e, i) => {
              let o = t.sqr(i),
                l = t.mul(e, i);
              o = t.mul(o, l);
              let s = t.pow(o, r);
              s = t.mul(s, l);
              let u = t.mul(s, n),
                a = t.mul(t.sqr(s), i),
                f = t.eql(a, e),
                d = t.cmov(u, s, f);
              return { isValid: f, value: d };
            };
          }
          return y;
        })(t, i);
        if (!t.isOdd) throw Error("Field does not have .isOdd()");
        return (e) => {
          let s, u, a, f, d, c, h, m;
          ((s = t.sqr(e)),
            (s = t.mul(s, i)),
            (u = t.sqr(s)),
            (u = t.add(u, s)),
            (a = t.add(u, t.ONE)),
            (a = t.mul(a, n)),
            (f = t.cmov(i, t.neg(u), !t.eql(u, t.ZERO))),
            (f = t.mul(f, r)),
            (u = t.sqr(a)),
            (c = t.sqr(f)),
            (d = t.mul(c, r)),
            (u = t.add(u, d)),
            (u = t.mul(u, a)),
            (c = t.mul(c, f)),
            (d = t.mul(c, n)),
            (u = t.add(u, d)),
            (h = t.mul(s, a)));
          let { isValid: p, value: g } = l(u, c);
          ((m = t.mul(s, e)),
            (m = t.mul(m, g)),
            (h = t.cmov(h, a, p)),
            (m = t.cmov(m, g, p)));
          let y = t.isOdd(e) === t.isOdd(m);
          m = t.cmov(t.neg(m), m, y);
          let w = (0, o.R)(t, [f], !0)[0];
          return { x: (h = t.mul(h, w)), y: m };
        };
      },
      "f",
      0,
      w,
    ],
    856714,
  ),
    t.s(
      [
        "f",
        0,
        function (t, e) {
          let r = (e) => w({ ...t, hash: e });
          return { ...r(e), create: r };
        },
      ],
      515466,
    ));
};
