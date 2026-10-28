// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(t) => {
  "use strict";
  let e, i, n;
  var r = t.i(753887),
    a = t.i(971370),
    o = t.i(353110),
    s = t.i(959719),
    u = t.i(575281),
    h = t.i(619290),
    m = t.i(574941),
    f = t.i(47446),
    l = t.i(648470),
    d = Object.create,
    c = Object.defineProperty,
    p = Object.getOwnPropertyDescriptor,
    y = Object.getOwnPropertyNames,
    g = Object.getPrototypeOf,
    v = Object.prototype.hasOwnProperty,
    M = t.z,
    b =
      ((e = (t, e) => {
        !(function (t, e) {
          function i(t, e) {
            if (!t) throw Error(e || "Assertion failed");
          }
          function n(t, e) {
            t.super_ = e;
            var i = function () {};
            ((i.prototype = e.prototype),
              (t.prototype = new i()),
              (t.prototype.constructor = t));
          }
          function r(t, e, i) {
            if (r.isBN(t)) return t;
            ((this.negative = 0),
              (this.words = null),
              (this.length = 0),
              (this.red = null),
              null !== t &&
                (("le" === e || "be" === e) && ((i = e), (e = 10)),
                this._init(t || 0, e || 10, i || "be")));
          }
          ("object" == typeof t ? (t.exports = r) : (e.BN = r),
            (r.BN = r),
            (r.wordSize = 26));
          try {
            m =
              "u" > typeof window && "u" > typeof window.Buffer
                ? window.Buffer
                : M("buffer").Buffer;
          } catch {}
          function a(t, e) {
            var n = t.charCodeAt(e);
            return n >= 48 && n <= 57
              ? n - 48
              : n >= 65 && n <= 70
                ? n - 55
                : n >= 97 && n <= 102
                  ? n - 87
                  : void i(!1, "Invalid character in " + t);
          }
          function o(t, e, i) {
            var n = a(t, i);
            return (i - 1 >= e && (n |= a(t, i - 1) << 4), n);
          }
          function s(t, e, n, r) {
            for (
              var a = 0, o = 0, s = Math.min(t.length, n), u = e;
              u < s;
              u++
            ) {
              var h = t.charCodeAt(u) - 48;
              ((a *= r),
                (o = h >= 49 ? h - 49 + 10 : h >= 17 ? h - 17 + 10 : h),
                i(h >= 0 && o < r, "Invalid character"),
                (a += o));
            }
            return a;
          }
          function u(t, e) {
            ((t.words = e.words),
              (t.length = e.length),
              (t.negative = e.negative),
              (t.red = e.red));
          }
          if (
            ((r.isBN = function (t) {
              return (
                t instanceof r ||
                (null !== t &&
                  "object" == typeof t &&
                  t.constructor.wordSize === r.wordSize &&
                  Array.isArray(t.words))
              );
            }),
            (r.max = function (t, e) {
              return t.cmp(e) > 0 ? t : e;
            }),
            (r.min = function (t, e) {
              return 0 > t.cmp(e) ? t : e;
            }),
            (r.prototype._init = function (t, e, n) {
              if ("number" == typeof t) return this._initNumber(t, e, n);
              if ("object" == typeof t) return this._initArray(t, e, n);
              ("hex" === e && (e = 16), i(e === (0 | e) && e >= 2 && e <= 36));
              var r = 0;
              ("-" === (t = t.toString().replace(/\s+/g, ""))[0] &&
                (r++, (this.negative = 1)),
                r < t.length &&
                  (16 === e
                    ? this._parseHex(t, r, n)
                    : (this._parseBase(t, e, r),
                      "le" === n && this._initArray(this.toArray(), e, n))));
            }),
            (r.prototype._initNumber = function (t, e, n) {
              (t < 0 && ((this.negative = 1), (t = -t)),
                t < 0x4000000
                  ? ((this.words = [0x3ffffff & t]), (this.length = 1))
                  : t < 0x10000000000000
                    ? ((this.words = [
                        0x3ffffff & t,
                        (t / 0x4000000) & 0x3ffffff,
                      ]),
                      (this.length = 2))
                    : (i(t < 0x20000000000000),
                      (this.words = [
                        0x3ffffff & t,
                        (t / 0x4000000) & 0x3ffffff,
                        1,
                      ]),
                      (this.length = 3)),
                "le" === n && this._initArray(this.toArray(), e, n));
            }),
            (r.prototype._initArray = function (t, e, n) {
              if ((i("number" == typeof t.length), t.length <= 0))
                return ((this.words = [0]), (this.length = 1), this);
              ((this.length = Math.ceil(t.length / 3)),
                (this.words = Array(this.length)));
              for (var r = 0; r < this.length; r++) this.words[r] = 0;
              var a,
                o,
                s = 0;
              if ("be" === n)
                for (r = t.length - 1, a = 0; r >= 0; r -= 3)
                  ((o = t[r] | (t[r - 1] << 8) | (t[r - 2] << 16)),
                    (this.words[a] |= (o << s) & 0x3ffffff),
                    (this.words[a + 1] = (o >>> (26 - s)) & 0x3ffffff),
                    (s += 24) >= 26 && ((s -= 26), a++));
              else if ("le" === n)
                for (r = 0, a = 0; r < t.length; r += 3)
                  ((o = t[r] | (t[r + 1] << 8) | (t[r + 2] << 16)),
                    (this.words[a] |= (o << s) & 0x3ffffff),
                    (this.words[a + 1] = (o >>> (26 - s)) & 0x3ffffff),
                    (s += 24) >= 26 && ((s -= 26), a++));
              return this._strip();
            }),
            (r.prototype._parseHex = function (t, e, i) {
              ((this.length = Math.ceil((t.length - e) / 6)),
                (this.words = Array(this.length)));
              for (var n = 0; n < this.length; n++) this.words[n] = 0;
              var r,
                a = 0,
                s = 0;
              if ("be" === i)
                for (n = t.length - 1; n >= e; n -= 2)
                  ((r = o(t, e, n) << a),
                    (this.words[s] |= 0x3ffffff & r),
                    a >= 18
                      ? ((a -= 18), (s += 1), (this.words[s] |= r >>> 26))
                      : (a += 8));
              else
                for (
                  n = (t.length - e) % 2 == 0 ? e + 1 : e;
                  n < t.length;
                  n += 2
                )
                  ((r = o(t, e, n) << a),
                    (this.words[s] |= 0x3ffffff & r),
                    a >= 18
                      ? ((a -= 18), (s += 1), (this.words[s] |= r >>> 26))
                      : (a += 8));
              this._strip();
            }),
            (r.prototype._parseBase = function (t, e, i) {
              ((this.words = [0]), (this.length = 1));
              for (var n = 0, r = 1; r <= 0x3ffffff; r *= e) n++;
              (n--, (r = (r / e) | 0));
              for (
                var a = t.length - i,
                  o = a % n,
                  u = Math.min(a, a - o) + i,
                  h = 0,
                  m = i;
                m < u;
                m += n
              )
                ((h = s(t, m, m + n, e)),
                  this.imuln(r),
                  this.words[0] + h < 0x4000000
                    ? (this.words[0] += h)
                    : this._iaddn(h));
              if (0 !== o) {
                var f = 1;
                for (h = s(t, m, t.length, e), m = 0; m < o; m++) f *= e;
                (this.imuln(f),
                  this.words[0] + h < 0x4000000
                    ? (this.words[0] += h)
                    : this._iaddn(h));
              }
              this._strip();
            }),
            (r.prototype.copy = function (t) {
              t.words = Array(this.length);
              for (var e = 0; e < this.length; e++) t.words[e] = this.words[e];
              ((t.length = this.length),
                (t.negative = this.negative),
                (t.red = this.red));
            }),
            (r.prototype._move = function (t) {
              u(t, this);
            }),
            (r.prototype.clone = function () {
              var t = new r(null);
              return (this.copy(t), t);
            }),
            (r.prototype._expand = function (t) {
              for (; this.length < t; ) this.words[this.length++] = 0;
              return this;
            }),
            (r.prototype._strip = function () {
              for (; this.length > 1 && 0 === this.words[this.length - 1]; )
                this.length--;
              return this._normSign();
            }),
            (r.prototype._normSign = function () {
              return (
                1 === this.length && 0 === this.words[0] && (this.negative = 0),
                this
              );
            }),
            "u" > typeof Symbol && "function" == typeof Symbol.for)
          )
            try {
              r.prototype[Symbol.for("nodejs.util.inspect.custom")] = h;
            } catch {
              r.prototype.inspect = h;
            }
          else r.prototype.inspect = h;
          function h() {
            return (this.red ? "<BN-R: " : "<BN: ") + this.toString(16) + ">";
          }
          var m,
            f = [
              "",
              "0",
              "00",
              "000",
              "0000",
              "00000",
              "000000",
              "0000000",
              "00000000",
              "000000000",
              "0000000000",
              "00000000000",
              "000000000000",
              "0000000000000",
              "00000000000000",
              "000000000000000",
              "0000000000000000",
              "00000000000000000",
              "000000000000000000",
              "0000000000000000000",
              "00000000000000000000",
              "000000000000000000000",
              "0000000000000000000000",
              "00000000000000000000000",
              "000000000000000000000000",
              "0000000000000000000000000",
            ],
            l = [
              0, 0, 25, 16, 12, 11, 10, 9, 8, 8, 7, 7, 7, 7, 6, 6, 6, 6, 6, 6,
              6, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5,
            ],
            d = [
              0, 0, 0x2000000, 0x290d741, 0x1000000, 0x2e90edd, 0x39aa400,
              0x267bf47, 0x1000000, 0x290d741, 1e7, 0x12959c3, 0x222c000,
              0x3bd7765, 7529536, 0xadcea1, 0x1000000, 0x1704f61, 0x206fc40,
              0x2cddcf9, 64e6, 4084101, 5153632, 6436343, 7962624, 9765625,
              0xb54ba0, 0xdaf26b, 0x1069c00, 0x138f9ad, 243e5, 0x1b4d89f,
              0x2000000, 0x25528a1, 0x2b54a20, 0x3216b93, 0x39aa400,
            ];
          function c(t, e, i) {
            i.negative = e.negative ^ t.negative;
            var n = (t.length + e.length) | 0;
            ((i.length = n), (n = (n - 1) | 0));
            var r = 0 | t.words[0],
              a = 0 | e.words[0],
              o = r * a,
              s = 0x3ffffff & o,
              u = (o / 0x4000000) | 0;
            i.words[0] = s;
            for (var h = 1; h < n; h++) {
              for (
                var m = u >>> 26,
                  f = 0x3ffffff & u,
                  l = Math.min(h, e.length - 1),
                  d = Math.max(0, h - t.length + 1);
                d <= l;
                d++
              ) {
                var c = (h - d) | 0;
                ((m +=
                  ((o = (r = 0 | t.words[c]) * (a = 0 | e.words[d]) + f) /
                    0x4000000) |
                  0),
                  (f = 0x3ffffff & o));
              }
              ((i.words[h] = 0 | f), (u = 0 | m));
            }
            return (0 !== u ? (i.words[h] = 0 | u) : i.length--, i._strip());
          }
          ((r.prototype.toString = function (t, e) {
            if (((e = 0 | e || 1), 16 === (t = t || 10) || "hex" === t)) {
              n = "";
              for (var n, r = 0, a = 0, o = 0; o < this.length; o++) {
                var s = this.words[o],
                  u = (((s << r) | a) & 0xffffff).toString(16);
                ((a = (s >>> (24 - r)) & 0xffffff),
                  (r += 2) >= 26 && ((r -= 26), o--),
                  (n =
                    0 !== a || o !== this.length - 1
                      ? f[6 - u.length] + u + n
                      : u + n));
              }
              for (0 !== a && (n = a.toString(16) + n); n.length % e != 0; )
                n = "0" + n;
              return (0 !== this.negative && (n = "-" + n), n);
            }
            if (t === (0 | t) && t >= 2 && t <= 36) {
              var h = l[t],
                m = d[t];
              n = "";
              var c = this.clone();
              for (c.negative = 0; !c.isZero(); ) {
                var p = c.modrn(m).toString(t);
                n = (c = c.idivn(m)).isZero() ? p + n : f[h - p.length] + p + n;
              }
              for (this.isZero() && (n = "0" + n); n.length % e != 0; )
                n = "0" + n;
              return (0 !== this.negative && (n = "-" + n), n);
            }
            i(!1, "Base should be between 2 and 36");
          }),
            (r.prototype.toNumber = function () {
              var t = this.words[0];
              return (
                2 === this.length
                  ? (t += 0x4000000 * this.words[1])
                  : 3 === this.length && 1 === this.words[2]
                    ? (t += 0x10000000000000 + 0x4000000 * this.words[1])
                    : this.length > 2 &&
                      i(!1, "Number can only safely store up to 53 bits"),
                0 !== this.negative ? -t : t
              );
            }),
            (r.prototype.toJSON = function () {
              return this.toString(16, 2);
            }),
            m &&
              (r.prototype.toBuffer = function (t, e) {
                return this.toArrayLike(m, t, e);
              }),
            (r.prototype.toArray = function (t, e) {
              return this.toArrayLike(Array, t, e);
            }),
            (r.prototype.toArrayLike = function (t, e, n) {
              this._strip();
              var r = this.byteLength(),
                a = n || Math.max(1, r);
              (i(r <= a, "byte array longer than desired length"),
                i(a > 0, "Requested array length <= 0"));
              var o = t.allocUnsafe ? t.allocUnsafe(a) : new t(a);
              return (
                this["_toArrayLike" + ("le" === e ? "LE" : "BE")](o, r),
                o
              );
            }),
            (r.prototype._toArrayLikeLE = function (t, e) {
              for (var i = 0, n = 0, r = 0, a = 0; r < this.length; r++) {
                var o = (this.words[r] << a) | n;
                ((t[i++] = 255 & o),
                  i < t.length && (t[i++] = (o >> 8) & 255),
                  i < t.length && (t[i++] = (o >> 16) & 255),
                  6 === a
                    ? (i < t.length && (t[i++] = (o >> 24) & 255),
                      (n = 0),
                      (a = 0))
                    : ((n = o >>> 24), (a += 2)));
              }
              if (i < t.length) for (t[i++] = n; i < t.length; ) t[i++] = 0;
            }),
            (r.prototype._toArrayLikeBE = function (t, e) {
              for (
                var i = t.length - 1, n = 0, r = 0, a = 0;
                r < this.length;
                r++
              ) {
                var o = (this.words[r] << a) | n;
                ((t[i--] = 255 & o),
                  i >= 0 && (t[i--] = (o >> 8) & 255),
                  i >= 0 && (t[i--] = (o >> 16) & 255),
                  6 === a
                    ? (i >= 0 && (t[i--] = (o >> 24) & 255), (n = 0), (a = 0))
                    : ((n = o >>> 24), (a += 2)));
              }
              if (i >= 0) for (t[i--] = n; i >= 0; ) t[i--] = 0;
            }),
            Math.clz32
              ? (r.prototype._countBits = function (t) {
                  return 32 - Math.clz32(t);
                })
              : (r.prototype._countBits = function (t) {
                  var e = t,
                    i = 0;
                  return (
                    e >= 4096 && ((i += 13), (e >>>= 13)),
                    e >= 64 && ((i += 7), (e >>>= 7)),
                    e >= 8 && ((i += 4), (e >>>= 4)),
                    e >= 2 && ((i += 2), (e >>>= 2)),
                    i + e
                  );
                }),
            (r.prototype._zeroBits = function (t) {
              if (0 === t) return 26;
              var e = t,
                i = 0;
              return (
                (8191 & e) == 0 && ((i += 13), (e >>>= 13)),
                (127 & e) == 0 && ((i += 7), (e >>>= 7)),
                (15 & e) == 0 && ((i += 4), (e >>>= 4)),
                (3 & e) == 0 && ((i += 2), (e >>>= 2)),
                (1 & e) == 0 && i++,
                i
              );
            }),
            (r.prototype.bitLength = function () {
              var t = this.words[this.length - 1],
                e = this._countBits(t);
              return (this.length - 1) * 26 + e;
            }),
            (r.prototype.zeroBits = function () {
              if (this.isZero()) return 0;
              for (var t = 0, e = 0; e < this.length; e++) {
                var i = this._zeroBits(this.words[e]);
                if (((t += i), 26 !== i)) break;
              }
              return t;
            }),
            (r.prototype.byteLength = function () {
              return Math.ceil(this.bitLength() / 8);
            }),
            (r.prototype.toTwos = function (t) {
              return 0 !== this.negative
                ? this.abs().inotn(t).iaddn(1)
                : this.clone();
            }),
            (r.prototype.fromTwos = function (t) {
              return this.testn(t - 1)
                ? this.notn(t).iaddn(1).ineg()
                : this.clone();
            }),
            (r.prototype.isNeg = function () {
              return 0 !== this.negative;
            }),
            (r.prototype.neg = function () {
              return this.clone().ineg();
            }),
            (r.prototype.ineg = function () {
              return (this.isZero() || (this.negative ^= 1), this);
            }),
            (r.prototype.iuor = function (t) {
              for (; this.length < t.length; ) this.words[this.length++] = 0;
              for (var e = 0; e < t.length; e++)
                this.words[e] = this.words[e] | t.words[e];
              return this._strip();
            }),
            (r.prototype.ior = function (t) {
              return (i((this.negative | t.negative) == 0), this.iuor(t));
            }),
            (r.prototype.or = function (t) {
              return this.length > t.length
                ? this.clone().ior(t)
                : t.clone().ior(this);
            }),
            (r.prototype.uor = function (t) {
              return this.length > t.length
                ? this.clone().iuor(t)
                : t.clone().iuor(this);
            }),
            (r.prototype.iuand = function (t) {
              var e;
              e = this.length > t.length ? t : this;
              for (var i = 0; i < e.length; i++)
                this.words[i] = this.words[i] & t.words[i];
              return ((this.length = e.length), this._strip());
            }),
            (r.prototype.iand = function (t) {
              return (i((this.negative | t.negative) == 0), this.iuand(t));
            }),
            (r.prototype.and = function (t) {
              return this.length > t.length
                ? this.clone().iand(t)
                : t.clone().iand(this);
            }),
            (r.prototype.uand = function (t) {
              return this.length > t.length
                ? this.clone().iuand(t)
                : t.clone().iuand(this);
            }),
            (r.prototype.iuxor = function (t) {
              var e, i;
              this.length > t.length
                ? ((e = this), (i = t))
                : ((e = t), (i = this));
              for (var n = 0; n < i.length; n++)
                this.words[n] = e.words[n] ^ i.words[n];
              if (this !== e)
                for (; n < e.length; n++) this.words[n] = e.words[n];
              return ((this.length = e.length), this._strip());
            }),
            (r.prototype.ixor = function (t) {
              return (i((this.negative | t.negative) == 0), this.iuxor(t));
            }),
            (r.prototype.xor = function (t) {
              return this.length > t.length
                ? this.clone().ixor(t)
                : t.clone().ixor(this);
            }),
            (r.prototype.uxor = function (t) {
              return this.length > t.length
                ? this.clone().iuxor(t)
                : t.clone().iuxor(this);
            }),
            (r.prototype.inotn = function (t) {
              i("number" == typeof t && t >= 0);
              var e = 0 | Math.ceil(t / 26),
                n = t % 26;
              (this._expand(e), n > 0 && e--);
              for (var r = 0; r < e; r++)
                this.words[r] = 0x3ffffff & ~this.words[r];
              return (
                n > 0 &&
                  (this.words[r] = ~this.words[r] & (0x3ffffff >> (26 - n))),
                this._strip()
              );
            }),
            (r.prototype.notn = function (t) {
              return this.clone().inotn(t);
            }),
            (r.prototype.setn = function (t, e) {
              i("number" == typeof t && t >= 0);
              var n = (t / 26) | 0,
                r = t % 26;
              return (
                this._expand(n + 1),
                e
                  ? (this.words[n] = this.words[n] | (1 << r))
                  : (this.words[n] = this.words[n] & ~(1 << r)),
                this._strip()
              );
            }),
            (r.prototype.iadd = function (t) {
              if (0 !== this.negative && 0 === t.negative)
                return (
                  (this.negative = 0),
                  (e = this.isub(t)),
                  (this.negative ^= 1),
                  this._normSign()
                );
              if (0 === this.negative && 0 !== t.negative)
                return (
                  (t.negative = 0),
                  (e = this.isub(t)),
                  (t.negative = 1),
                  e._normSign()
                );
              this.length > t.length
                ? ((i = this), (n = t))
                : ((i = t), (n = this));
              for (var e, i, n, r = 0, a = 0; a < n.length; a++)
                ((e = (0 | i.words[a]) + (0 | n.words[a]) + r),
                  (this.words[a] = 0x3ffffff & e),
                  (r = e >>> 26));
              for (; 0 !== r && a < i.length; a++)
                ((e = (0 | i.words[a]) + r),
                  (this.words[a] = 0x3ffffff & e),
                  (r = e >>> 26));
              if (((this.length = i.length), 0 !== r))
                ((this.words[this.length] = r), this.length++);
              else if (i !== this)
                for (; a < i.length; a++) this.words[a] = i.words[a];
              return this;
            }),
            (r.prototype.add = function (t) {
              var e;
              return 0 !== t.negative && 0 === this.negative
                ? ((t.negative = 0), (e = this.sub(t)), (t.negative ^= 1), e)
                : 0 === t.negative && 0 !== this.negative
                  ? ((this.negative = 0),
                    (e = t.sub(this)),
                    (this.negative = 1),
                    e)
                  : this.length > t.length
                    ? this.clone().iadd(t)
                    : t.clone().iadd(this);
            }),
            (r.prototype.isub = function (t) {
              if (0 !== t.negative) {
                t.negative = 0;
                var e,
                  i,
                  n = this.iadd(t);
                return ((t.negative = 1), n._normSign());
              }
              if (0 !== this.negative)
                return (
                  (this.negative = 0),
                  this.iadd(t),
                  (this.negative = 1),
                  this._normSign()
                );
              var r = this.cmp(t);
              if (0 === r)
                return (
                  (this.negative = 0),
                  (this.length = 1),
                  (this.words[0] = 0),
                  this
                );
              r > 0 ? ((e = this), (i = t)) : ((e = t), (i = this));
              for (var a = 0, o = 0; o < i.length; o++)
                ((a = (n = (0 | e.words[o]) - (0 | i.words[o]) + a) >> 26),
                  (this.words[o] = 0x3ffffff & n));
              for (; 0 !== a && o < e.length; o++)
                ((a = (n = (0 | e.words[o]) + a) >> 26),
                  (this.words[o] = 0x3ffffff & n));
              if (0 === a && o < e.length && e !== this)
                for (; o < e.length; o++) this.words[o] = e.words[o];
              return (
                (this.length = Math.max(this.length, o)),
                e !== this && (this.negative = 1),
                this._strip()
              );
            }),
            (r.prototype.sub = function (t) {
              return this.clone().isub(t);
            }));
          var p = function (t, e, i) {
            var n,
              r,
              a,
              o = t.words,
              s = e.words,
              u = i.words,
              h = 0,
              m = 0 | o[0],
              f = 8191 & m,
              l = m >>> 13,
              d = 0 | o[1],
              c = 8191 & d,
              p = d >>> 13,
              y = 0 | o[2],
              g = 8191 & y,
              v = y >>> 13,
              M = 0 | o[3],
              b = 8191 & M,
              w = M >>> 13,
              _ = 0 | o[4],
              k = 8191 & _,
              x = _ >>> 13,
              A = 0 | o[5],
              P = 8191 & A,
              T = A >>> 13,
              B = 0 | o[6],
              S = 8191 & B,
              E = B >>> 13,
              I = 0 | o[7],
              C = 8191 & I,
              L = I >>> 13,
              N = 0 | o[8],
              R = 8191 & N,
              q = N >>> 13,
              z = 0 | o[9],
              Z = 8191 & z,
              O = z >>> 13,
              U = 0 | s[0],
              G = 8191 & U,
              K = U >>> 13,
              j = 0 | s[1],
              F = 8191 & j,
              D = j >>> 13,
              W = 0 | s[2],
              H = 8191 & W,
              V = W >>> 13,
              J = 0 | s[3],
              Y = 8191 & J,
              Q = J >>> 13,
              X = 0 | s[4],
              $ = 8191 & X,
              tt = X >>> 13,
              te = 0 | s[5],
              ti = 8191 & te,
              tn = te >>> 13,
              tr = 0 | s[6],
              ta = 8191 & tr,
              to = tr >>> 13,
              ts = 0 | s[7],
              tu = 8191 & ts,
              th = ts >>> 13,
              tm = 0 | s[8],
              tf = 8191 & tm,
              tl = tm >>> 13,
              td = 0 | s[9],
              tc = 8191 & td,
              tp = td >>> 13;
            ((i.negative = t.negative ^ e.negative),
              (i.length = 19),
              (n = Math.imul(f, G)),
              (r = ((r = Math.imul(f, K)) + Math.imul(l, G)) | 0),
              (a = Math.imul(l, K)));
            var ty = (((h + n) | 0) + ((8191 & r) << 13)) | 0;
            ((h = (((a + (r >>> 13)) | 0) + (ty >>> 26)) | 0),
              (ty &= 0x3ffffff),
              (n = Math.imul(c, G)),
              (r = ((r = Math.imul(c, K)) + Math.imul(p, G)) | 0),
              (a = Math.imul(p, K)),
              (n = (n + Math.imul(f, F)) | 0),
              (r = ((r = (r + Math.imul(f, D)) | 0) + Math.imul(l, F)) | 0),
              (a = (a + Math.imul(l, D)) | 0));
            var tg = (((h + n) | 0) + ((8191 & r) << 13)) | 0;
            ((h = (((a + (r >>> 13)) | 0) + (tg >>> 26)) | 0),
              (tg &= 0x3ffffff),
              (n = Math.imul(g, G)),
              (r = ((r = Math.imul(g, K)) + Math.imul(v, G)) | 0),
              (a = Math.imul(v, K)),
              (n = (n + Math.imul(c, F)) | 0),
              (r = ((r = (r + Math.imul(c, D)) | 0) + Math.imul(p, F)) | 0),
              (a = (a + Math.imul(p, D)) | 0),
              (n = (n + Math.imul(f, H)) | 0),
              (r = ((r = (r + Math.imul(f, V)) | 0) + Math.imul(l, H)) | 0),
              (a = (a + Math.imul(l, V)) | 0));
            var tv = (((h + n) | 0) + ((8191 & r) << 13)) | 0;
            ((h = (((a + (r >>> 13)) | 0) + (tv >>> 26)) | 0),
              (tv &= 0x3ffffff),
              (n = Math.imul(b, G)),
              (r = ((r = Math.imul(b, K)) + Math.imul(w, G)) | 0),
              (a = Math.imul(w, K)),
              (n = (n + Math.imul(g, F)) | 0),
              (r = ((r = (r + Math.imul(g, D)) | 0) + Math.imul(v, F)) | 0),
              (a = (a + Math.imul(v, D)) | 0),
              (n = (n + Math.imul(c, H)) | 0),
              (r = ((r = (r + Math.imul(c, V)) | 0) + Math.imul(p, H)) | 0),
              (a = (a + Math.imul(p, V)) | 0),
              (n = (n + Math.imul(f, Y)) | 0),
              (r = ((r = (r + Math.imul(f, Q)) | 0) + Math.imul(l, Y)) | 0),
              (a = (a + Math.imul(l, Q)) | 0));
            var tM = (((h + n) | 0) + ((8191 & r) << 13)) | 0;
            ((h = (((a + (r >>> 13)) | 0) + (tM >>> 26)) | 0),
              (tM &= 0x3ffffff),
              (n = Math.imul(k, G)),
              (r = ((r = Math.imul(k, K)) + Math.imul(x, G)) | 0),
              (a = Math.imul(x, K)),
              (n = (n + Math.imul(b, F)) | 0),
              (r = ((r = (r + Math.imul(b, D)) | 0) + Math.imul(w, F)) | 0),
              (a = (a + Math.imul(w, D)) | 0),
              (n = (n + Math.imul(g, H)) | 0),
              (r = ((r = (r + Math.imul(g, V)) | 0) + Math.imul(v, H)) | 0),
              (a = (a + Math.imul(v, V)) | 0),
              (n = (n + Math.imul(c, Y)) | 0),
              (r = ((r = (r + Math.imul(c, Q)) | 0) + Math.imul(p, Y)) | 0),
              (a = (a + Math.imul(p, Q)) | 0),
              (n = (n + Math.imul(f, $)) | 0),
              (r = ((r = (r + Math.imul(f, tt)) | 0) + Math.imul(l, $)) | 0),
              (a = (a + Math.imul(l, tt)) | 0));
            var tb = (((h + n) | 0) + ((8191 & r) << 13)) | 0;
            ((h = (((a + (r >>> 13)) | 0) + (tb >>> 26)) | 0),
              (tb &= 0x3ffffff),
              (n = Math.imul(P, G)),
              (r = ((r = Math.imul(P, K)) + Math.imul(T, G)) | 0),
              (a = Math.imul(T, K)),
              (n = (n + Math.imul(k, F)) | 0),
              (r = ((r = (r + Math.imul(k, D)) | 0) + Math.imul(x, F)) | 0),
              (a = (a + Math.imul(x, D)) | 0),
              (n = (n + Math.imul(b, H)) | 0),
              (r = ((r = (r + Math.imul(b, V)) | 0) + Math.imul(w, H)) | 0),
              (a = (a + Math.imul(w, V)) | 0),
              (n = (n + Math.imul(g, Y)) | 0),
              (r = ((r = (r + Math.imul(g, Q)) | 0) + Math.imul(v, Y)) | 0),
              (a = (a + Math.imul(v, Q)) | 0),
              (n = (n + Math.imul(c, $)) | 0),
              (r = ((r = (r + Math.imul(c, tt)) | 0) + Math.imul(p, $)) | 0),
              (a = (a + Math.imul(p, tt)) | 0),
              (n = (n + Math.imul(f, ti)) | 0),
              (r = ((r = (r + Math.imul(f, tn)) | 0) + Math.imul(l, ti)) | 0),
              (a = (a + Math.imul(l, tn)) | 0));
            var tw = (((h + n) | 0) + ((8191 & r) << 13)) | 0;
            ((h = (((a + (r >>> 13)) | 0) + (tw >>> 26)) | 0),
              (tw &= 0x3ffffff),
              (n = Math.imul(S, G)),
              (r = ((r = Math.imul(S, K)) + Math.imul(E, G)) | 0),
              (a = Math.imul(E, K)),
              (n = (n + Math.imul(P, F)) | 0),
              (r = ((r = (r + Math.imul(P, D)) | 0) + Math.imul(T, F)) | 0),
              (a = (a + Math.imul(T, D)) | 0),
              (n = (n + Math.imul(k, H)) | 0),
              (r = ((r = (r + Math.imul(k, V)) | 0) + Math.imul(x, H)) | 0),
              (a = (a + Math.imul(x, V)) | 0),
              (n = (n + Math.imul(b, Y)) | 0),
              (r = ((r = (r + Math.imul(b, Q)) | 0) + Math.imul(w, Y)) | 0),
              (a = (a + Math.imul(w, Q)) | 0),
              (n = (n + Math.imul(g, $)) | 0),
              (r = ((r = (r + Math.imul(g, tt)) | 0) + Math.imul(v, $)) | 0),
              (a = (a + Math.imul(v, tt)) | 0),
              (n = (n + Math.imul(c, ti)) | 0),
              (r = ((r = (r + Math.imul(c, tn)) | 0) + Math.imul(p, ti)) | 0),
              (a = (a + Math.imul(p, tn)) | 0),
              (n = (n + Math.imul(f, ta)) | 0),
              (r = ((r = (r + Math.imul(f, to)) | 0) + Math.imul(l, ta)) | 0),
              (a = (a + Math.imul(l, to)) | 0));
            var t_ = (((h + n) | 0) + ((8191 & r) << 13)) | 0;
            ((h = (((a + (r >>> 13)) | 0) + (t_ >>> 26)) | 0),
              (t_ &= 0x3ffffff),
              (n = Math.imul(C, G)),
              (r = ((r = Math.imul(C, K)) + Math.imul(L, G)) | 0),
              (a = Math.imul(L, K)),
              (n = (n + Math.imul(S, F)) | 0),
              (r = ((r = (r + Math.imul(S, D)) | 0) + Math.imul(E, F)) | 0),
              (a = (a + Math.imul(E, D)) | 0),
              (n = (n + Math.imul(P, H)) | 0),
              (r = ((r = (r + Math.imul(P, V)) | 0) + Math.imul(T, H)) | 0),
              (a = (a + Math.imul(T, V)) | 0),
              (n = (n + Math.imul(k, Y)) | 0),
              (r = ((r = (r + Math.imul(k, Q)) | 0) + Math.imul(x, Y)) | 0),
              (a = (a + Math.imul(x, Q)) | 0),
              (n = (n + Math.imul(b, $)) | 0),
              (r = ((r = (r + Math.imul(b, tt)) | 0) + Math.imul(w, $)) | 0),
              (a = (a + Math.imul(w, tt)) | 0),
              (n = (n + Math.imul(g, ti)) | 0),
              (r = ((r = (r + Math.imul(g, tn)) | 0) + Math.imul(v, ti)) | 0),
              (a = (a + Math.imul(v, tn)) | 0),
              (n = (n + Math.imul(c, ta)) | 0),
              (r = ((r = (r + Math.imul(c, to)) | 0) + Math.imul(p, ta)) | 0),
              (a = (a + Math.imul(p, to)) | 0),
              (n = (n + Math.imul(f, tu)) | 0),
              (r = ((r = (r + Math.imul(f, th)) | 0) + Math.imul(l, tu)) | 0),
              (a = (a + Math.imul(l, th)) | 0));
            var tk = (((h + n) | 0) + ((8191 & r) << 13)) | 0;
            ((h = (((a + (r >>> 13)) | 0) + (tk >>> 26)) | 0),
              (tk &= 0x3ffffff),
              (n = Math.imul(R, G)),
              (r = ((r = Math.imul(R, K)) + Math.imul(q, G)) | 0),
              (a = Math.imul(q, K)),
              (n = (n + Math.imul(C, F)) | 0),
              (r = ((r = (r + Math.imul(C, D)) | 0) + Math.imul(L, F)) | 0),
              (a = (a + Math.imul(L, D)) | 0),
              (n = (n + Math.imul(S, H)) | 0),
              (r = ((r = (r + Math.imul(S, V)) | 0) + Math.imul(E, H)) | 0),
              (a = (a + Math.imul(E, V)) | 0),
              (n = (n + Math.imul(P, Y)) | 0),
              (r = ((r = (r + Math.imul(P, Q)) | 0) + Math.imul(T, Y)) | 0),
              (a = (a + Math.imul(T, Q)) | 0),
              (n = (n + Math.imul(k, $)) | 0),
              (r = ((r = (r + Math.imul(k, tt)) | 0) + Math.imul(x, $)) | 0),
              (a = (a + Math.imul(x, tt)) | 0),
              (n = (n + Math.imul(b, ti)) | 0),
              (r = ((r = (r + Math.imul(b, tn)) | 0) + Math.imul(w, ti)) | 0),
              (a = (a + Math.imul(w, tn)) | 0),
              (n = (n + Math.imul(g, ta)) | 0),
              (r = ((r = (r + Math.imul(g, to)) | 0) + Math.imul(v, ta)) | 0),
              (a = (a + Math.imul(v, to)) | 0),
              (n = (n + Math.imul(c, tu)) | 0),
              (r = ((r = (r + Math.imul(c, th)) | 0) + Math.imul(p, tu)) | 0),
              (a = (a + Math.imul(p, th)) | 0),
              (n = (n + Math.imul(f, tf)) | 0),
              (r = ((r = (r + Math.imul(f, tl)) | 0) + Math.imul(l, tf)) | 0),
              (a = (a + Math.imul(l, tl)) | 0));
            var tx = (((h + n) | 0) + ((8191 & r) << 13)) | 0;
            ((h = (((a + (r >>> 13)) | 0) + (tx >>> 26)) | 0),
              (tx &= 0x3ffffff),
              (n = Math.imul(Z, G)),
              (r = ((r = Math.imul(Z, K)) + Math.imul(O, G)) | 0),
              (a = Math.imul(O, K)),
              (n = (n + Math.imul(R, F)) | 0),
              (r = ((r = (r + Math.imul(R, D)) | 0) + Math.imul(q, F)) | 0),
              (a = (a + Math.imul(q, D)) | 0),
              (n = (n + Math.imul(C, H)) | 0),
              (r = ((r = (r + Math.imul(C, V)) | 0) + Math.imul(L, H)) | 0),
              (a = (a + Math.imul(L, V)) | 0),
              (n = (n + Math.imul(S, Y)) | 0),
              (r = ((r = (r + Math.imul(S, Q)) | 0) + Math.imul(E, Y)) | 0),
              (a = (a + Math.imul(E, Q)) | 0),
              (n = (n + Math.imul(P, $)) | 0),
              (r = ((r = (r + Math.imul(P, tt)) | 0) + Math.imul(T, $)) | 0),
              (a = (a + Math.imul(T, tt)) | 0),
              (n = (n + Math.imul(k, ti)) | 0),
              (r = ((r = (r + Math.imul(k, tn)) | 0) + Math.imul(x, ti)) | 0),
              (a = (a + Math.imul(x, tn)) | 0),
              (n = (n + Math.imul(b, ta)) | 0),
              (r = ((r = (r + Math.imul(b, to)) | 0) + Math.imul(w, ta)) | 0),
              (a = (a + Math.imul(w, to)) | 0),
              (n = (n + Math.imul(g, tu)) | 0),
              (r = ((r = (r + Math.imul(g, th)) | 0) + Math.imul(v, tu)) | 0),
              (a = (a + Math.imul(v, th)) | 0),
              (n = (n + Math.imul(c, tf)) | 0),
              (r = ((r = (r + Math.imul(c, tl)) | 0) + Math.imul(p, tf)) | 0),
              (a = (a + Math.imul(p, tl)) | 0),
              (n = (n + Math.imul(f, tc)) | 0),
              (r = ((r = (r + Math.imul(f, tp)) | 0) + Math.imul(l, tc)) | 0),
              (a = (a + Math.imul(l, tp)) | 0));
            var tA = (((h + n) | 0) + ((8191 & r) << 13)) | 0;
            ((h = (((a + (r >>> 13)) | 0) + (tA >>> 26)) | 0),
              (tA &= 0x3ffffff),
              (n = Math.imul(Z, F)),
              (r = ((r = Math.imul(Z, D)) + Math.imul(O, F)) | 0),
              (a = Math.imul(O, D)),
              (n = (n + Math.imul(R, H)) | 0),
              (r = ((r = (r + Math.imul(R, V)) | 0) + Math.imul(q, H)) | 0),
              (a = (a + Math.imul(q, V)) | 0),
              (n = (n + Math.imul(C, Y)) | 0),
              (r = ((r = (r + Math.imul(C, Q)) | 0) + Math.imul(L, Y)) | 0),
              (a = (a + Math.imul(L, Q)) | 0),
              (n = (n + Math.imul(S, $)) | 0),
              (r = ((r = (r + Math.imul(S, tt)) | 0) + Math.imul(E, $)) | 0),
              (a = (a + Math.imul(E, tt)) | 0),
              (n = (n + Math.imul(P, ti)) | 0),
              (r = ((r = (r + Math.imul(P, tn)) | 0) + Math.imul(T, ti)) | 0),
              (a = (a + Math.imul(T, tn)) | 0),
              (n = (n + Math.imul(k, ta)) | 0),
              (r = ((r = (r + Math.imul(k, to)) | 0) + Math.imul(x, ta)) | 0),
              (a = (a + Math.imul(x, to)) | 0),
              (n = (n + Math.imul(b, tu)) | 0),
              (r = ((r = (r + Math.imul(b, th)) | 0) + Math.imul(w, tu)) | 0),
              (a = (a + Math.imul(w, th)) | 0),
              (n = (n + Math.imul(g, tf)) | 0),
              (r = ((r = (r + Math.imul(g, tl)) | 0) + Math.imul(v, tf)) | 0),
              (a = (a + Math.imul(v, tl)) | 0),
              (n = (n + Math.imul(c, tc)) | 0),
              (r = ((r = (r + Math.imul(c, tp)) | 0) + Math.imul(p, tc)) | 0),
              (a = (a + Math.imul(p, tp)) | 0));
            var tP = (((h + n) | 0) + ((8191 & r) << 13)) | 0;
            ((h = (((a + (r >>> 13)) | 0) + (tP >>> 26)) | 0),
              (tP &= 0x3ffffff),
              (n = Math.imul(Z, H)),
              (r = ((r = Math.imul(Z, V)) + Math.imul(O, H)) | 0),
              (a = Math.imul(O, V)),
              (n = (n + Math.imul(R, Y)) | 0),
              (r = ((r = (r + Math.imul(R, Q)) | 0) + Math.imul(q, Y)) | 0),
              (a = (a + Math.imul(q, Q)) | 0),
              (n = (n + Math.imul(C, $)) | 0),
              (r = ((r = (r + Math.imul(C, tt)) | 0) + Math.imul(L, $)) | 0),
              (a = (a + Math.imul(L, tt)) | 0),
              (n = (n + Math.imul(S, ti)) | 0),
              (r = ((r = (r + Math.imul(S, tn)) | 0) + Math.imul(E, ti)) | 0),
              (a = (a + Math.imul(E, tn)) | 0),
              (n = (n + Math.imul(P, ta)) | 0),
              (r = ((r = (r + Math.imul(P, to)) | 0) + Math.imul(T, ta)) | 0),
              (a = (a + Math.imul(T, to)) | 0),
              (n = (n + Math.imul(k, tu)) | 0),
              (r = ((r = (r + Math.imul(k, th)) | 0) + Math.imul(x, tu)) | 0),
              (a = (a + Math.imul(x, th)) | 0),
              (n = (n + Math.imul(b, tf)) | 0),
              (r = ((r = (r + Math.imul(b, tl)) | 0) + Math.imul(w, tf)) | 0),
              (a = (a + Math.imul(w, tl)) | 0),
              (n = (n + Math.imul(g, tc)) | 0),
              (r = ((r = (r + Math.imul(g, tp)) | 0) + Math.imul(v, tc)) | 0),
              (a = (a + Math.imul(v, tp)) | 0));
            var tT = (((h + n) | 0) + ((8191 & r) << 13)) | 0;
            ((h = (((a + (r >>> 13)) | 0) + (tT >>> 26)) | 0),
              (tT &= 0x3ffffff),
              (n = Math.imul(Z, Y)),
              (r = ((r = Math.imul(Z, Q)) + Math.imul(O, Y)) | 0),
              (a = Math.imul(O, Q)),
              (n = (n + Math.imul(R, $)) | 0),
              (r = ((r = (r + Math.imul(R, tt)) | 0) + Math.imul(q, $)) | 0),
              (a = (a + Math.imul(q, tt)) | 0),
              (n = (n + Math.imul(C, ti)) | 0),
              (r = ((r = (r + Math.imul(C, tn)) | 0) + Math.imul(L, ti)) | 0),
              (a = (a + Math.imul(L, tn)) | 0),
              (n = (n + Math.imul(S, ta)) | 0),
              (r = ((r = (r + Math.imul(S, to)) | 0) + Math.imul(E, ta)) | 0),
              (a = (a + Math.imul(E, to)) | 0),
              (n = (n + Math.imul(P, tu)) | 0),
              (r = ((r = (r + Math.imul(P, th)) | 0) + Math.imul(T, tu)) | 0),
              (a = (a + Math.imul(T, th)) | 0),
              (n = (n + Math.imul(k, tf)) | 0),
              (r = ((r = (r + Math.imul(k, tl)) | 0) + Math.imul(x, tf)) | 0),
              (a = (a + Math.imul(x, tl)) | 0),
              (n = (n + Math.imul(b, tc)) | 0),
              (r = ((r = (r + Math.imul(b, tp)) | 0) + Math.imul(w, tc)) | 0),
              (a = (a + Math.imul(w, tp)) | 0));
            var tB = (((h + n) | 0) + ((8191 & r) << 13)) | 0;
            ((h = (((a + (r >>> 13)) | 0) + (tB >>> 26)) | 0),
              (tB &= 0x3ffffff),
              (n = Math.imul(Z, $)),
              (r = ((r = Math.imul(Z, tt)) + Math.imul(O, $)) | 0),
              (a = Math.imul(O, tt)),
              (n = (n + Math.imul(R, ti)) | 0),
              (r = ((r = (r + Math.imul(R, tn)) | 0) + Math.imul(q, ti)) | 0),
              (a = (a + Math.imul(q, tn)) | 0),
              (n = (n + Math.imul(C, ta)) | 0),
              (r = ((r = (r + Math.imul(C, to)) | 0) + Math.imul(L, ta)) | 0),
              (a = (a + Math.imul(L, to)) | 0),
              (n = (n + Math.imul(S, tu)) | 0),
              (r = ((r = (r + Math.imul(S, th)) | 0) + Math.imul(E, tu)) | 0),
              (a = (a + Math.imul(E, th)) | 0),
              (n = (n + Math.imul(P, tf)) | 0),
              (r = ((r = (r + Math.imul(P, tl)) | 0) + Math.imul(T, tf)) | 0),
              (a = (a + Math.imul(T, tl)) | 0),
              (n = (n + Math.imul(k, tc)) | 0),
              (r = ((r = (r + Math.imul(k, tp)) | 0) + Math.imul(x, tc)) | 0),
              (a = (a + Math.imul(x, tp)) | 0));
            var tS = (((h + n) | 0) + ((8191 & r) << 13)) | 0;
            ((h = (((a + (r >>> 13)) | 0) + (tS >>> 26)) | 0),
              (tS &= 0x3ffffff),
              (n = Math.imul(Z, ti)),
              (r = ((r = Math.imul(Z, tn)) + Math.imul(O, ti)) | 0),
              (a = Math.imul(O, tn)),
              (n = (n + Math.imul(R, ta)) | 0),
              (r = ((r = (r + Math.imul(R, to)) | 0) + Math.imul(q, ta)) | 0),
              (a = (a + Math.imul(q, to)) | 0),
              (n = (n + Math.imul(C, tu)) | 0),
              (r = ((r = (r + Math.imul(C, th)) | 0) + Math.imul(L, tu)) | 0),
              (a = (a + Math.imul(L, th)) | 0),
              (n = (n + Math.imul(S, tf)) | 0),
              (r = ((r = (r + Math.imul(S, tl)) | 0) + Math.imul(E, tf)) | 0),
              (a = (a + Math.imul(E, tl)) | 0),
              (n = (n + Math.imul(P, tc)) | 0),
              (r = ((r = (r + Math.imul(P, tp)) | 0) + Math.imul(T, tc)) | 0),
              (a = (a + Math.imul(T, tp)) | 0));
            var tE = (((h + n) | 0) + ((8191 & r) << 13)) | 0;
            ((h = (((a + (r >>> 13)) | 0) + (tE >>> 26)) | 0),
              (tE &= 0x3ffffff),
              (n = Math.imul(Z, ta)),
              (r = ((r = Math.imul(Z, to)) + Math.imul(O, ta)) | 0),
              (a = Math.imul(O, to)),
              (n = (n + Math.imul(R, tu)) | 0),
              (r = ((r = (r + Math.imul(R, th)) | 0) + Math.imul(q, tu)) | 0),
              (a = (a + Math.imul(q, th)) | 0),
              (n = (n + Math.imul(C, tf)) | 0),
              (r = ((r = (r + Math.imul(C, tl)) | 0) + Math.imul(L, tf)) | 0),
              (a = (a + Math.imul(L, tl)) | 0),
              (n = (n + Math.imul(S, tc)) | 0),
              (r = ((r = (r + Math.imul(S, tp)) | 0) + Math.imul(E, tc)) | 0),
              (a = (a + Math.imul(E, tp)) | 0));
            var tI = (((h + n) | 0) + ((8191 & r) << 13)) | 0;
            ((h = (((a + (r >>> 13)) | 0) + (tI >>> 26)) | 0),
              (tI &= 0x3ffffff),
              (n = Math.imul(Z, tu)),
              (r = ((r = Math.imul(Z, th)) + Math.imul(O, tu)) | 0),
              (a = Math.imul(O, th)),
              (n = (n + Math.imul(R, tf)) | 0),
              (r = ((r = (r + Math.imul(R, tl)) | 0) + Math.imul(q, tf)) | 0),
              (a = (a + Math.imul(q, tl)) | 0),
              (n = (n + Math.imul(C, tc)) | 0),
              (r = ((r = (r + Math.imul(C, tp)) | 0) + Math.imul(L, tc)) | 0),
              (a = (a + Math.imul(L, tp)) | 0));
            var tC = (((h + n) | 0) + ((8191 & r) << 13)) | 0;
            ((h = (((a + (r >>> 13)) | 0) + (tC >>> 26)) | 0),
              (tC &= 0x3ffffff),
              (n = Math.imul(Z, tf)),
              (r = ((r = Math.imul(Z, tl)) + Math.imul(O, tf)) | 0),
              (a = Math.imul(O, tl)),
              (n = (n + Math.imul(R, tc)) | 0),
              (r = ((r = (r + Math.imul(R, tp)) | 0) + Math.imul(q, tc)) | 0),
              (a = (a + Math.imul(q, tp)) | 0));
            var tL = (((h + n) | 0) + ((8191 & r) << 13)) | 0;
            ((h = (((a + (r >>> 13)) | 0) + (tL >>> 26)) | 0),
              (tL &= 0x3ffffff),
              (n = Math.imul(Z, tc)),
              (r = ((r = Math.imul(Z, tp)) + Math.imul(O, tc)) | 0),
              (a = Math.imul(O, tp)));
            var tN = (((h + n) | 0) + ((8191 & r) << 13)) | 0;
            return (
              (h = (((a + (r >>> 13)) | 0) + (tN >>> 26)) | 0),
              (tN &= 0x3ffffff),
              (u[0] = ty),
              (u[1] = tg),
              (u[2] = tv),
              (u[3] = tM),
              (u[4] = tb),
              (u[5] = tw),
              (u[6] = t_),
              (u[7] = tk),
              (u[8] = tx),
              (u[9] = tA),
              (u[10] = tP),
              (u[11] = tT),
              (u[12] = tB),
              (u[13] = tS),
              (u[14] = tE),
              (u[15] = tI),
              (u[16] = tC),
              (u[17] = tL),
              (u[18] = tN),
              0 !== h && ((u[19] = h), i.length++),
              i
            );
          };
          function y(t, e, i) {
            ((i.negative = e.negative ^ t.negative),
              (i.length = t.length + e.length));
            for (var n = 0, r = 0, a = 0; a < i.length - 1; a++) {
              var o = r;
              r = 0;
              for (
                var s = 0x3ffffff & n,
                  u = Math.min(a, e.length - 1),
                  h = Math.max(0, a - t.length + 1);
                h <= u;
                h++
              ) {
                var m = a - h,
                  f = (0 | t.words[m]) * (0 | e.words[h]),
                  l = 0x3ffffff & f;
                ((o = (o + ((f / 0x4000000) | 0)) | 0),
                  (s = 0x3ffffff & (l = (l + s) | 0)),
                  (r += (o = (o + (l >>> 26)) | 0) >>> 26),
                  (o &= 0x3ffffff));
              }
              ((i.words[a] = s), (n = o), (o = r));
            }
            return (0 !== n ? (i.words[a] = n) : i.length--, i._strip());
          }
          function g(t, e) {
            ((this.x = t), (this.y = e));
          }
          (Math.imul || (p = c),
            (r.prototype.mulTo = function (t, e) {
              var i,
                n = this.length + t.length;
              return (
                10 === this.length && 10 === t.length
                  ? (i = p(this, t, e))
                  : n < 63
                    ? (i = c(this, t, e))
                    : (n < 1024, (i = y(this, t, e))),
                i
              );
            }),
            (g.prototype.makeRBT = function (t) {
              for (
                var e = Array(t), i = r.prototype._countBits(t) - 1, n = 0;
                n < t;
                n++
              )
                e[n] = this.revBin(n, i, t);
              return e;
            }),
            (g.prototype.revBin = function (t, e, i) {
              if (0 === t || t === i - 1) return t;
              for (var n = 0, r = 0; r < e; r++)
                ((n |= (1 & t) << (e - r - 1)), (t >>= 1));
              return n;
            }),
            (g.prototype.permute = function (t, e, i, n, r, a) {
              for (var o = 0; o < a; o++) ((n[o] = e[t[o]]), (r[o] = i[t[o]]));
            }),
            (g.prototype.transform = function (t, e, i, n, r, a) {
              this.permute(a, t, e, i, n, r);
              for (var o = 1; o < r; o <<= 1)
                for (
                  var s = o << 1,
                    u = Math.cos((2 * Math.PI) / s),
                    h = Math.sin((2 * Math.PI) / s),
                    m = 0;
                  m < r;
                  m += s
                )
                  for (var f = u, l = h, d = 0; d < o; d++) {
                    var c = i[m + d],
                      p = n[m + d],
                      y = i[m + d + o],
                      g = n[m + d + o],
                      v = f * y - l * g;
                    ((g = f * g + l * y),
                      (y = v),
                      (i[m + d] = c + y),
                      (n[m + d] = p + g),
                      (i[m + d + o] = c - y),
                      (n[m + d + o] = p - g),
                      d !== s &&
                        ((v = u * f - h * l), (l = u * l + h * f), (f = v)));
                  }
            }),
            (g.prototype.guessLen13b = function (t, e) {
              var i = 1 | Math.max(e, t),
                n = 1 & i,
                r = 0;
              for (i = (i / 2) | 0; i; i >>>= 1) r++;
              return 1 << (r + 1 + n);
            }),
            (g.prototype.conjugate = function (t, e, i) {
              if (!(i <= 1))
                for (var n = 0; n < i / 2; n++) {
                  var r = t[n];
                  ((t[n] = t[i - n - 1]),
                    (t[i - n - 1] = r),
                    (r = e[n]),
                    (e[n] = -e[i - n - 1]),
                    (e[i - n - 1] = -r));
                }
            }),
            (g.prototype.normalize13b = function (t, e) {
              for (var i = 0, n = 0; n < e / 2; n++) {
                var r =
                  8192 * Math.round(t[2 * n + 1] / e) +
                  Math.round(t[2 * n] / e) +
                  i;
                ((t[n] = 0x3ffffff & r),
                  (i = r < 0x4000000 ? 0 : (r / 0x4000000) | 0));
              }
              return t;
            }),
            (g.prototype.convert13b = function (t, e, n, r) {
              for (var a = 0, o = 0; o < e; o++)
                ((a += 0 | t[o]),
                  (n[2 * o] = 8191 & a),
                  (a >>>= 13),
                  (n[2 * o + 1] = 8191 & a),
                  (a >>>= 13));
              for (o = 2 * e; o < r; ++o) n[o] = 0;
              (i(0 === a), i((-8192 & a) == 0));
            }),
            (g.prototype.stub = function (t) {
              for (var e = Array(t), i = 0; i < t; i++) e[i] = 0;
              return e;
            }),
            (g.prototype.mulp = function (t, e, i) {
              var n = 2 * this.guessLen13b(t.length, e.length),
                r = this.makeRBT(n),
                a = this.stub(n),
                o = Array(n),
                s = Array(n),
                u = Array(n),
                h = Array(n),
                m = Array(n),
                f = Array(n),
                l = i.words;
              ((l.length = n),
                this.convert13b(t.words, t.length, o, n),
                this.convert13b(e.words, e.length, h, n),
                this.transform(o, a, s, u, n, r),
                this.transform(h, a, m, f, n, r));
              for (var d = 0; d < n; d++) {
                var c = s[d] * m[d] - u[d] * f[d];
                ((u[d] = s[d] * f[d] + u[d] * m[d]), (s[d] = c));
              }
              return (
                this.conjugate(s, u, n),
                this.transform(s, u, l, a, n, r),
                this.conjugate(l, a, n),
                this.normalize13b(l, n),
                (i.negative = t.negative ^ e.negative),
                (i.length = t.length + e.length),
                i._strip()
              );
            }),
            (r.prototype.mul = function (t) {
              var e = new r(null);
              return (
                (e.words = Array(this.length + t.length)),
                this.mulTo(t, e)
              );
            }),
            (r.prototype.mulf = function (t) {
              var e = new r(null);
              return ((e.words = Array(this.length + t.length)), y(this, t, e));
            }),
            (r.prototype.imul = function (t) {
              return this.clone().mulTo(t, this);
            }),
            (r.prototype.imuln = function (t) {
              var e = t < 0;
              (e && (t = -t), i("number" == typeof t), i(t < 0x4000000));
              for (var n = 0, r = 0; r < this.length; r++) {
                var a = (0 | this.words[r]) * t,
                  o = (0x3ffffff & a) + (0x3ffffff & n);
                ((n >>= 26),
                  (n += ((a / 0x4000000) | 0) + (o >>> 26)),
                  (this.words[r] = 0x3ffffff & o));
              }
              return (
                0 !== n && ((this.words[r] = n), this.length++),
                (this.length = 0 === t ? 1 : this.length),
                e ? this.ineg() : this
              );
            }),
            (r.prototype.muln = function (t) {
              return this.clone().imuln(t);
            }),
            (r.prototype.sqr = function () {
              return this.mul(this);
            }),
            (r.prototype.isqr = function () {
              return this.imul(this.clone());
            }),
            (r.prototype.pow = function (t) {
              var e = (function (t) {
                for (var e = Array(t.bitLength()), i = 0; i < e.length; i++) {
                  var n = (i / 26) | 0,
                    r = i % 26;
                  e[i] = (t.words[n] >>> r) & 1;
                }
                return e;
              })(t);
              if (0 === e.length) return new r(1);
              for (
                var i = this, n = 0;
                n < e.length && 0 === e[n];
                n++, i = i.sqr()
              );
              if (++n < e.length)
                for (var a = i.sqr(); n < e.length; n++, a = a.sqr())
                  0 !== e[n] && (i = i.mul(a));
              return i;
            }),
            (r.prototype.iushln = function (t) {
              i("number" == typeof t && t >= 0);
              var e,
                n = t % 26,
                r = (t - n) / 26,
                a = (0x3ffffff >>> (26 - n)) << (26 - n);
              if (0 !== n) {
                var o = 0;
                for (e = 0; e < this.length; e++) {
                  var s = this.words[e] & a,
                    u = ((0 | this.words[e]) - s) << n;
                  ((this.words[e] = u | o), (o = s >>> (26 - n)));
                }
                o && ((this.words[e] = o), this.length++);
              }
              if (0 !== r) {
                for (e = this.length - 1; e >= 0; e--)
                  this.words[e + r] = this.words[e];
                for (e = 0; e < r; e++) this.words[e] = 0;
                this.length += r;
              }
              return this._strip();
            }),
            (r.prototype.ishln = function (t) {
              return (i(0 === this.negative), this.iushln(t));
            }),
            (r.prototype.iushrn = function (t, e, n) {
              i("number" == typeof t && t >= 0);
              var r = e ? (e - (e % 26)) / 26 : 0,
                a = t % 26,
                o = Math.min((t - a) / 26, this.length),
                s = 0x3ffffff ^ ((0x3ffffff >>> a) << a);
              if (((r -= o), (r = Math.max(0, r)), n)) {
                for (var u = 0; u < o; u++) n.words[u] = this.words[u];
                n.length = o;
              }
              if (0 !== o)
                if (this.length > o)
                  for (this.length -= o, u = 0; u < this.length; u++)
                    this.words[u] = this.words[u + o];
                else ((this.words[0] = 0), (this.length = 1));
              var h = 0;
              for (u = this.length - 1; u >= 0 && (0 !== h || u >= r); u--) {
                var m = 0 | this.words[u];
                ((this.words[u] = (h << (26 - a)) | (m >>> a)), (h = m & s));
              }
              return (
                n && 0 !== h && (n.words[n.length++] = h),
                0 === this.length && ((this.words[0] = 0), (this.length = 1)),
                this._strip()
              );
            }),
            (r.prototype.ishrn = function (t, e, n) {
              return (i(0 === this.negative), this.iushrn(t, e, n));
            }),
            (r.prototype.shln = function (t) {
              return this.clone().ishln(t);
            }),
            (r.prototype.ushln = function (t) {
              return this.clone().iushln(t);
            }),
            (r.prototype.shrn = function (t) {
              return this.clone().ishrn(t);
            }),
            (r.prototype.ushrn = function (t) {
              return this.clone().iushrn(t);
            }),
            (r.prototype.testn = function (t) {
              i("number" == typeof t && t >= 0);
              var e = t % 26,
                n = (t - e) / 26;
              return !(this.length <= n) && !!(this.words[n] & (1 << e));
            }),
            (r.prototype.imaskn = function (t) {
              i("number" == typeof t && t >= 0);
              var e = t % 26,
                n = (t - e) / 26;
              return (i(
                0 === this.negative,
                "imaskn works only with positive numbers",
              ),
              this.length <= n)
                ? this
                : (0 !== e && n++,
                  (this.length = Math.min(n, this.length)),
                  0 !== e &&
                    (this.words[this.length - 1] &=
                      0x3ffffff ^ ((0x3ffffff >>> e) << e)),
                  this._strip());
            }),
            (r.prototype.maskn = function (t) {
              return this.clone().imaskn(t);
            }),
            (r.prototype.iaddn = function (t) {
              return (
                i("number" == typeof t),
                i(t < 0x4000000),
                t < 0
                  ? this.isubn(-t)
                  : 0 !== this.negative
                    ? (1 === this.length && (0 | this.words[0]) <= t
                        ? ((this.words[0] = t - (0 | this.words[0])),
                          (this.negative = 0))
                        : ((this.negative = 0),
                          this.isubn(t),
                          (this.negative = 1)),
                      this)
                    : this._iaddn(t)
              );
            }),
            (r.prototype._iaddn = function (t) {
              this.words[0] += t;
              for (
                var e = 0;
                e < this.length && this.words[e] >= 0x4000000;
                e++
              )
                ((this.words[e] -= 0x4000000),
                  e === this.length - 1
                    ? (this.words[e + 1] = 1)
                    : this.words[e + 1]++);
              return ((this.length = Math.max(this.length, e + 1)), this);
            }),
            (r.prototype.isubn = function (t) {
              if ((i("number" == typeof t), i(t < 0x4000000), t < 0))
                return this.iaddn(-t);
              if (0 !== this.negative)
                return (
                  (this.negative = 0),
                  this.iaddn(t),
                  (this.negative = 1),
                  this
                );
              if (
                ((this.words[0] -= t), 1 === this.length && this.words[0] < 0)
              )
                ((this.words[0] = -this.words[0]), (this.negative = 1));
              else
                for (var e = 0; e < this.length && this.words[e] < 0; e++)
                  ((this.words[e] += 0x4000000), (this.words[e + 1] -= 1));
              return this._strip();
            }),
            (r.prototype.addn = function (t) {
              return this.clone().iaddn(t);
            }),
            (r.prototype.subn = function (t) {
              return this.clone().isubn(t);
            }),
            (r.prototype.iabs = function () {
              return ((this.negative = 0), this);
            }),
            (r.prototype.abs = function () {
              return this.clone().iabs();
            }),
            (r.prototype._ishlnsubmul = function (t, e, n) {
              var r,
                a = t.length + n;
              this._expand(a);
              var o,
                s = 0;
              for (r = 0; r < t.length; r++) {
                o = (0 | this.words[r + n]) + s;
                var u = (0 | t.words[r]) * e;
                ((o -= 0x3ffffff & u),
                  (s = (o >> 26) - ((u / 0x4000000) | 0)),
                  (this.words[r + n] = 0x3ffffff & o));
              }
              for (; r < this.length - n; r++)
                ((s = (o = (0 | this.words[r + n]) + s) >> 26),
                  (this.words[r + n] = 0x3ffffff & o));
              if (0 === s) return this._strip();
              for (i(-1 === s), s = 0, r = 0; r < this.length; r++)
                ((s = (o = -(0 | this.words[r]) + s) >> 26),
                  (this.words[r] = 0x3ffffff & o));
              return ((this.negative = 1), this._strip());
            }),
            (r.prototype._wordDiv = function (t, e) {
              var i = this.length - t.length,
                n = this.clone(),
                a = t,
                o = 0 | a.words[a.length - 1];
              0 != (i = 26 - this._countBits(o)) &&
                ((a = a.ushln(i)),
                n.iushln(i),
                (o = 0 | a.words[a.length - 1]));
              var s,
                u = n.length - a.length;
              if ("mod" !== e) {
                (((s = new r(null)).length = u + 1),
                  (s.words = Array(s.length)));
                for (var h = 0; h < s.length; h++) s.words[h] = 0;
              }
              var m = n.clone()._ishlnsubmul(a, 1, u);
              0 === m.negative && ((n = m), s && (s.words[u] = 1));
              for (var f = u - 1; f >= 0; f--) {
                var l =
                  (0 | n.words[a.length + f]) * 0x4000000 +
                  (0 | n.words[a.length + f - 1]);
                for (
                  l = Math.min((l / o) | 0, 0x3ffffff), n._ishlnsubmul(a, l, f);
                  0 !== n.negative;

                )
                  (l--,
                    (n.negative = 0),
                    n._ishlnsubmul(a, 1, f),
                    n.isZero() || (n.negative ^= 1));
                s && (s.words[f] = l);
              }
              return (
                s && s._strip(),
                n._strip(),
                "div" !== e && 0 !== i && n.iushrn(i),
                { div: s || null, mod: n }
              );
            }),
            (r.prototype.divmod = function (t, e, n) {
              var a, o, s;
              return (i(!t.isZero()), this.isZero())
                ? { div: new r(0), mod: new r(0) }
                : 0 !== this.negative && 0 === t.negative
                  ? ((s = this.neg().divmod(t, e)),
                    "mod" !== e && (a = s.div.neg()),
                    "div" !== e &&
                      ((o = s.mod.neg()), n && 0 !== o.negative && o.iadd(t)),
                    { div: a, mod: o })
                  : 0 === this.negative && 0 !== t.negative
                    ? ((s = this.divmod(t.neg(), e)),
                      "mod" !== e && (a = s.div.neg()),
                      { div: a, mod: s.mod })
                    : (this.negative & t.negative) != 0
                      ? ((s = this.neg().divmod(t.neg(), e)),
                        "div" !== e &&
                          ((o = s.mod.neg()),
                          n && 0 !== o.negative && o.isub(t)),
                        { div: s.div, mod: o })
                      : t.length > this.length || 0 > this.cmp(t)
                        ? { div: new r(0), mod: this }
                        : 1 === t.length
                          ? "div" === e
                            ? { div: this.divn(t.words[0]), mod: null }
                            : "mod" === e
                              ? {
                                  div: null,
                                  mod: new r(this.modrn(t.words[0])),
                                }
                              : {
                                  div: this.divn(t.words[0]),
                                  mod: new r(this.modrn(t.words[0])),
                                }
                          : this._wordDiv(t, e);
            }),
            (r.prototype.div = function (t) {
              return this.divmod(t, "div", !1).div;
            }),
            (r.prototype.mod = function (t) {
              return this.divmod(t, "mod", !1).mod;
            }),
            (r.prototype.umod = function (t) {
              return this.divmod(t, "mod", !0).mod;
            }),
            (r.prototype.divRound = function (t) {
              var e = this.divmod(t);
              if (e.mod.isZero()) return e.div;
              var i = 0 !== e.div.negative ? e.mod.isub(t) : e.mod,
                n = t.ushrn(1),
                r = t.andln(1),
                a = i.cmp(n);
              return a < 0 || (1 === r && 0 === a)
                ? e.div
                : 0 !== e.div.negative
                  ? e.div.isubn(1)
                  : e.div.iaddn(1);
            }),
            (r.prototype.modrn = function (t) {
              var e = t < 0;
              (e && (t = -t), i(t <= 0x3ffffff));
              for (
                var n = 0x4000000 % t, r = 0, a = this.length - 1;
                a >= 0;
                a--
              )
                r = (n * r + (0 | this.words[a])) % t;
              return e ? -r : r;
            }),
            (r.prototype.modn = function (t) {
              return this.modrn(t);
            }),
            (r.prototype.idivn = function (t) {
              var e = t < 0;
              (e && (t = -t), i(t <= 0x3ffffff));
              for (var n = 0, r = this.length - 1; r >= 0; r--) {
                var a = (0 | this.words[r]) + 0x4000000 * n;
                ((this.words[r] = (a / t) | 0), (n = a % t));
              }
              return (this._strip(), e ? this.ineg() : this);
            }),
            (r.prototype.divn = function (t) {
              return this.clone().idivn(t);
            }),
            (r.prototype.egcd = function (t) {
              (i(0 === t.negative), i(!t.isZero()));
              var e = this,
                n = t.clone();
              e = 0 !== e.negative ? e.umod(t) : e.clone();
              for (
                var a = new r(1),
                  o = new r(0),
                  s = new r(0),
                  u = new r(1),
                  h = 0;
                e.isEven() && n.isEven();

              )
                (e.iushrn(1), n.iushrn(1), ++h);
              for (var m = n.clone(), f = e.clone(); !e.isZero(); ) {
                for (
                  var l = 0, d = 1;
                  (e.words[0] & d) == 0 && l < 26;
                  ++l, d <<= 1
                );
                if (l > 0)
                  for (e.iushrn(l); l-- > 0; )
                    ((a.isOdd() || o.isOdd()) && (a.iadd(m), o.isub(f)),
                      a.iushrn(1),
                      o.iushrn(1));
                for (
                  var c = 0, p = 1;
                  (n.words[0] & p) == 0 && c < 26;
                  ++c, p <<= 1
                );
                if (c > 0)
                  for (n.iushrn(c); c-- > 0; )
                    ((s.isOdd() || u.isOdd()) && (s.iadd(m), u.isub(f)),
                      s.iushrn(1),
                      u.iushrn(1));
                e.cmp(n) >= 0
                  ? (e.isub(n), a.isub(s), o.isub(u))
                  : (n.isub(e), s.isub(a), u.isub(o));
              }
              return { a: s, b: u, gcd: n.iushln(h) };
            }),
            (r.prototype._invmp = function (t) {
              (i(0 === t.negative), i(!t.isZero()));
              var e,
                n = this,
                a = t.clone();
              n = 0 !== n.negative ? n.umod(t) : n.clone();
              for (
                var o = new r(1), s = new r(0), u = a.clone();
                n.cmpn(1) > 0 && a.cmpn(1) > 0;

              ) {
                for (
                  var h = 0, m = 1;
                  (n.words[0] & m) == 0 && h < 26;
                  ++h, m <<= 1
                );
                if (h > 0)
                  for (n.iushrn(h); h-- > 0; )
                    (o.isOdd() && o.iadd(u), o.iushrn(1));
                for (
                  var f = 0, l = 1;
                  (a.words[0] & l) == 0 && f < 26;
                  ++f, l <<= 1
                );
                if (f > 0)
                  for (a.iushrn(f); f-- > 0; )
                    (s.isOdd() && s.iadd(u), s.iushrn(1));
                n.cmp(a) >= 0 ? (n.isub(a), o.isub(s)) : (a.isub(n), s.isub(o));
              }
              return (
                0 > (e = 0 === n.cmpn(1) ? o : s).cmpn(0) && e.iadd(t),
                e
              );
            }),
            (r.prototype.gcd = function (t) {
              if (this.isZero()) return t.abs();
              if (t.isZero()) return this.abs();
              var e = this.clone(),
                i = t.clone();
              ((e.negative = 0), (i.negative = 0));
              for (var n = 0; e.isEven() && i.isEven(); n++)
                (e.iushrn(1), i.iushrn(1));
              for (;;) {
                for (; e.isEven(); ) e.iushrn(1);
                for (; i.isEven(); ) i.iushrn(1);
                var r = e.cmp(i);
                if (r < 0) {
                  var a = e;
                  ((e = i), (i = a));
                } else if (0 === r || 0 === i.cmpn(1)) break;
                e.isub(i);
              }
              return i.iushln(n);
            }),
            (r.prototype.invm = function (t) {
              return this.egcd(t).a.umod(t);
            }),
            (r.prototype.isEven = function () {
              return (1 & this.words[0]) == 0;
            }),
            (r.prototype.isOdd = function () {
              return (1 & this.words[0]) == 1;
            }),
            (r.prototype.andln = function (t) {
              return this.words[0] & t;
            }),
            (r.prototype.bincn = function (t) {
              i("number" == typeof t);
              var e = t % 26,
                n = (t - e) / 26,
                r = 1 << e;
              if (this.length <= n)
                return (this._expand(n + 1), (this.words[n] |= r), this);
              for (var a = r, o = n; 0 !== a && o < this.length; o++) {
                var s = 0 | this.words[o];
                ((s += a),
                  (a = s >>> 26),
                  (s &= 0x3ffffff),
                  (this.words[o] = s));
              }
              return (0 !== a && ((this.words[o] = a), this.length++), this);
            }),
            (r.prototype.isZero = function () {
              return 1 === this.length && 0 === this.words[0];
            }),
            (r.prototype.cmpn = function (t) {
              var e,
                n = t < 0;
              if (0 !== this.negative && !n) return -1;
              if (0 === this.negative && n) return 1;
              if ((this._strip(), this.length > 1)) e = 1;
              else {
                (n && (t = -t), i(t <= 0x3ffffff, "Number is too big"));
                var r = 0 | this.words[0];
                e = r === t ? 0 : r < t ? -1 : 1;
              }
              return 0 !== this.negative ? 0 | -e : e;
            }),
            (r.prototype.cmp = function (t) {
              if (0 !== this.negative && 0 === t.negative) return -1;
              if (0 === this.negative && 0 !== t.negative) return 1;
              var e = this.ucmp(t);
              return 0 !== this.negative ? 0 | -e : e;
            }),
            (r.prototype.ucmp = function (t) {
              if (this.length > t.length) return 1;
              if (this.length < t.length) return -1;
              for (var e = 0, i = this.length - 1; i >= 0; i--) {
                var n = 0 | this.words[i],
                  r = 0 | t.words[i];
                if (n !== r) {
                  n < r ? (e = -1) : n > r && (e = 1);
                  break;
                }
              }
              return e;
            }),
            (r.prototype.gtn = function (t) {
              return 1 === this.cmpn(t);
            }),
            (r.prototype.gt = function (t) {
              return 1 === this.cmp(t);
            }),
            (r.prototype.gten = function (t) {
              return this.cmpn(t) >= 0;
            }),
            (r.prototype.gte = function (t) {
              return this.cmp(t) >= 0;
            }),
            (r.prototype.ltn = function (t) {
              return -1 === this.cmpn(t);
            }),
            (r.prototype.lt = function (t) {
              return -1 === this.cmp(t);
            }),
            (r.prototype.lten = function (t) {
              return 0 >= this.cmpn(t);
            }),
            (r.prototype.lte = function (t) {
              return 0 >= this.cmp(t);
            }),
            (r.prototype.eqn = function (t) {
              return 0 === this.cmpn(t);
            }),
            (r.prototype.eq = function (t) {
              return 0 === this.cmp(t);
            }),
            (r.red = function (t) {
              return new A(t);
            }),
            (r.prototype.toRed = function (t) {
              return (
                i(!this.red, "Already a number in reduction context"),
                i(0 === this.negative, "red works only with positives"),
                t.convertTo(this)._forceRed(t)
              );
            }),
            (r.prototype.fromRed = function () {
              return (
                i(
                  this.red,
                  "fromRed works only with numbers in reduction context",
                ),
                this.red.convertFrom(this)
              );
            }),
            (r.prototype._forceRed = function (t) {
              return ((this.red = t), this);
            }),
            (r.prototype.forceRed = function (t) {
              return (
                i(!this.red, "Already a number in reduction context"),
                this._forceRed(t)
              );
            }),
            (r.prototype.redAdd = function (t) {
              return (
                i(this.red, "redAdd works only with red numbers"),
                this.red.add(this, t)
              );
            }),
            (r.prototype.redIAdd = function (t) {
              return (
                i(this.red, "redIAdd works only with red numbers"),
                this.red.iadd(this, t)
              );
            }),
            (r.prototype.redSub = function (t) {
              return (
                i(this.red, "redSub works only with red numbers"),
                this.red.sub(this, t)
              );
            }),
            (r.prototype.redISub = function (t) {
              return (
                i(this.red, "redISub works only with red numbers"),
                this.red.isub(this, t)
              );
            }),
            (r.prototype.redShl = function (t) {
              return (
                i(this.red, "redShl works only with red numbers"),
                this.red.shl(this, t)
              );
            }),
            (r.prototype.redMul = function (t) {
              return (
                i(this.red, "redMul works only with red numbers"),
                this.red._verify2(this, t),
                this.red.mul(this, t)
              );
            }),
            (r.prototype.redIMul = function (t) {
              return (
                i(this.red, "redMul works only with red numbers"),
                this.red._verify2(this, t),
                this.red.imul(this, t)
              );
            }),
            (r.prototype.redSqr = function () {
              return (
                i(this.red, "redSqr works only with red numbers"),
                this.red._verify1(this),
                this.red.sqr(this)
              );
            }),
            (r.prototype.redISqr = function () {
              return (
                i(this.red, "redISqr works only with red numbers"),
                this.red._verify1(this),
                this.red.isqr(this)
              );
            }),
            (r.prototype.redSqrt = function () {
              return (
                i(this.red, "redSqrt works only with red numbers"),
                this.red._verify1(this),
                this.red.sqrt(this)
              );
            }),
            (r.prototype.redInvm = function () {
              return (
                i(this.red, "redInvm works only with red numbers"),
                this.red._verify1(this),
                this.red.invm(this)
              );
            }),
            (r.prototype.redNeg = function () {
              return (
                i(this.red, "redNeg works only with red numbers"),
                this.red._verify1(this),
                this.red.neg(this)
              );
            }),
            (r.prototype.redPow = function (t) {
              return (
                i(this.red && !t.red, "redPow(normalNum)"),
                this.red._verify1(this),
                this.red.pow(this, t)
              );
            }));
          var v = { k256: null, p224: null, p192: null, p25519: null };
          function b(t, e) {
            ((this.name = t),
              (this.p = new r(e, 16)),
              (this.n = this.p.bitLength()),
              (this.k = new r(1).iushln(this.n).isub(this.p)),
              (this.tmp = this._tmp()));
          }
          function w() {
            b.call(
              this,
              "k256",
              "ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffe fffffc2f",
            );
          }
          function _() {
            b.call(
              this,
              "p224",
              "ffffffff ffffffff ffffffff ffffffff 00000000 00000000 00000001",
            );
          }
          function k() {
            b.call(
              this,
              "p192",
              "ffffffff ffffffff ffffffff fffffffe ffffffff ffffffff",
            );
          }
          function x() {
            b.call(
              this,
              "25519",
              "7fffffffffffffff ffffffffffffffff ffffffffffffffff ffffffffffffffed",
            );
          }
          function A(t) {
            if ("string" == typeof t) {
              var e = r._prime(t);
              ((this.m = e.p), (this.prime = e));
            } else
              (i(t.gtn(1), "modulus must be greater than 1"),
                (this.m = t),
                (this.prime = null));
          }
          function P(t) {
            (A.call(this, t),
              (this.shift = this.m.bitLength()),
              this.shift % 26 != 0 && (this.shift += 26 - (this.shift % 26)),
              (this.r = new r(1).iushln(this.shift)),
              (this.r2 = this.imod(this.r.sqr())),
              (this.rinv = this.r._invmp(this.m)),
              (this.minv = this.rinv.mul(this.r).isubn(1).div(this.m)),
              (this.minv = this.minv.umod(this.r)),
              (this.minv = this.r.sub(this.minv)));
          }
          ((b.prototype._tmp = function () {
            var t = new r(null);
            return ((t.words = Array(Math.ceil(this.n / 13))), t);
          }),
            (b.prototype.ireduce = function (t) {
              var e,
                i = t;
              do
                (this.split(i, this.tmp),
                  (e = (i = (i = this.imulK(i)).iadd(this.tmp)).bitLength()));
              while (e > this.n);
              var n = e < this.n ? -1 : i.ucmp(this.p);
              return (
                0 === n
                  ? ((i.words[0] = 0), (i.length = 1))
                  : n > 0
                    ? i.isub(this.p)
                    : void 0 !== i.strip
                      ? i.strip()
                      : i._strip(),
                i
              );
            }),
            (b.prototype.split = function (t, e) {
              t.iushrn(this.n, 0, e);
            }),
            (b.prototype.imulK = function (t) {
              return t.imul(this.k);
            }),
            n(w, b),
            (w.prototype.split = function (t, e) {
              for (var i = Math.min(t.length, 9), n = 0; n < i; n++)
                e.words[n] = t.words[n];
              if (((e.length = i), t.length <= 9)) {
                ((t.words[0] = 0), (t.length = 1));
                return;
              }
              var r = t.words[9];
              for (
                e.words[e.length++] = 4194303 & r, n = 10;
                n < t.length;
                n++
              ) {
                var a = 0 | t.words[n];
                ((t.words[n - 10] = ((4194303 & a) << 4) | (r >>> 22)),
                  (r = a));
              }
              ((r >>>= 22),
                (t.words[n - 10] = r),
                0 === r && t.length > 10 ? (t.length -= 10) : (t.length -= 9));
            }),
            (w.prototype.imulK = function (t) {
              ((t.words[t.length] = 0),
                (t.words[t.length + 1] = 0),
                (t.length += 2));
              for (var e = 0, i = 0; i < t.length; i++) {
                var n = 0 | t.words[i];
                ((e += 977 * n),
                  (t.words[i] = 0x3ffffff & e),
                  (e = 64 * n + ((e / 0x4000000) | 0)));
              }
              return (
                0 === t.words[t.length - 1] &&
                  (t.length--, 0 === t.words[t.length - 1] && t.length--),
                t
              );
            }),
            n(_, b),
            n(k, b),
            n(x, b),
            (x.prototype.imulK = function (t) {
              for (var e = 0, i = 0; i < t.length; i++) {
                var n = (0 | t.words[i]) * 19 + e,
                  r = 0x3ffffff & n;
                ((n >>>= 26), (t.words[i] = r), (e = n));
              }
              return (0 !== e && (t.words[t.length++] = e), t);
            }),
            (r._prime = function (t) {
              var e;
              if (v[t]) return v[t];
              if ("k256" === t) e = new w();
              else if ("p224" === t) e = new _();
              else if ("p192" === t) e = new k();
              else if ("p25519" === t) e = new x();
              else throw Error("Unknown prime " + t);
              return ((v[t] = e), e);
            }),
            (A.prototype._verify1 = function (t) {
              (i(0 === t.negative, "red works only with positives"),
                i(t.red, "red works only with red numbers"));
            }),
            (A.prototype._verify2 = function (t, e) {
              (i(
                (t.negative | e.negative) == 0,
                "red works only with positives",
              ),
                i(t.red && t.red === e.red, "red works only with red numbers"));
            }),
            (A.prototype.imod = function (t) {
              return this.prime
                ? this.prime.ireduce(t)._forceRed(this)
                : (u(t, t.umod(this.m)._forceRed(this)), t);
            }),
            (A.prototype.neg = function (t) {
              return t.isZero() ? t.clone() : this.m.sub(t)._forceRed(this);
            }),
            (A.prototype.add = function (t, e) {
              this._verify2(t, e);
              var i = t.add(e);
              return (i.cmp(this.m) >= 0 && i.isub(this.m), i._forceRed(this));
            }),
            (A.prototype.iadd = function (t, e) {
              this._verify2(t, e);
              var i = t.iadd(e);
              return (i.cmp(this.m) >= 0 && i.isub(this.m), i);
            }),
            (A.prototype.sub = function (t, e) {
              this._verify2(t, e);
              var i = t.sub(e);
              return (0 > i.cmpn(0) && i.iadd(this.m), i._forceRed(this));
            }),
            (A.prototype.isub = function (t, e) {
              this._verify2(t, e);
              var i = t.isub(e);
              return (0 > i.cmpn(0) && i.iadd(this.m), i);
            }),
            (A.prototype.shl = function (t, e) {
              return (this._verify1(t), this.imod(t.ushln(e)));
            }),
            (A.prototype.imul = function (t, e) {
              return (this._verify2(t, e), this.imod(t.imul(e)));
            }),
            (A.prototype.mul = function (t, e) {
              return (this._verify2(t, e), this.imod(t.mul(e)));
            }),
            (A.prototype.isqr = function (t) {
              return this.imul(t, t.clone());
            }),
            (A.prototype.sqr = function (t) {
              return this.mul(t, t);
            }),
            (A.prototype.sqrt = function (t) {
              if (t.isZero()) return t.clone();
              var e = this.m.andln(3);
              if ((i(e % 2 == 1), 3 === e)) {
                var n = this.m.add(new r(1)).iushrn(2);
                return this.pow(t, n);
              }
              for (
                var a = this.m.subn(1), o = 0;
                !a.isZero() && 0 === a.andln(1);

              )
                (o++, a.iushrn(1));
              i(!a.isZero());
              var s = new r(1).toRed(this),
                u = s.redNeg(),
                h = this.m.subn(1).iushrn(1),
                m = this.m.bitLength();
              for (
                m = new r(2 * m * m).toRed(this);
                0 !== this.pow(m, h).cmp(u);

              )
                m.redIAdd(u);
              for (
                var f = this.pow(m, a),
                  l = this.pow(t, a.addn(1).iushrn(1)),
                  d = this.pow(t, a),
                  c = o;
                0 !== d.cmp(s);

              ) {
                for (var p = d, y = 0; 0 !== p.cmp(s); y++) p = p.redSqr();
                i(y < c);
                var g = this.pow(f, new r(1).iushln(c - y - 1));
                ((l = l.redMul(g)),
                  (f = g.redSqr()),
                  (d = d.redMul(f)),
                  (c = y));
              }
              return l;
            }),
            (A.prototype.invm = function (t) {
              var e = t._invmp(this.m);
              return 0 !== e.negative
                ? ((e.negative = 0), this.imod(e).redNeg())
                : this.imod(e);
            }),
            (A.prototype.pow = function (t, e) {
              if (e.isZero()) return new r(1).toRed(this);
              if (0 === e.cmpn(1)) return t.clone();
              var i = Array(16);
              ((i[0] = new r(1).toRed(this)), (i[1] = t));
              for (var n = 2; n < i.length; n++) i[n] = this.mul(i[n - 1], t);
              var a = i[0],
                o = 0,
                s = 0,
                u = e.bitLength() % 26;
              for (0 === u && (u = 26), n = e.length - 1; n >= 0; n--) {
                for (var h = e.words[n], m = u - 1; m >= 0; m--) {
                  var f = (h >> m) & 1;
                  if ((a !== i[0] && (a = this.sqr(a)), 0 === f && 0 === o)) {
                    s = 0;
                    continue;
                  }
                  ((o <<= 1),
                    (o |= f),
                    (4 == ++s || (0 === n && 0 === m)) &&
                      ((a = this.mul(a, i[o])), (s = 0), (o = 0)));
                }
                u = 26;
              }
              return a;
            }),
            (A.prototype.convertTo = function (t) {
              var e = t.umod(this.m);
              return e === t ? e.clone() : e;
            }),
            (A.prototype.convertFrom = function (t) {
              var e = t.clone();
              return ((e.red = null), e);
            }),
            (r.mont = function (t) {
              return new P(t);
            }),
            n(P, A),
            (P.prototype.convertTo = function (t) {
              return this.imod(t.ushln(this.shift));
            }),
            (P.prototype.convertFrom = function (t) {
              var e = this.imod(t.mul(this.rinv));
              return ((e.red = null), e);
            }),
            (P.prototype.imul = function (t, e) {
              if (t.isZero() || e.isZero())
                return ((t.words[0] = 0), (t.length = 1), t);
              var i = t.imul(e),
                n = i
                  .maskn(this.shift)
                  .mul(this.minv)
                  .imaskn(this.shift)
                  .mul(this.m),
                r = i.isub(n).iushrn(this.shift),
                a = r;
              return (
                r.cmp(this.m) >= 0
                  ? (a = r.isub(this.m))
                  : 0 > r.cmpn(0) && (a = r.iadd(this.m)),
                a._forceRed(this)
              );
            }),
            (P.prototype.mul = function (t, e) {
              if (t.isZero() || e.isZero()) return new r(0)._forceRed(this);
              var i = t.mul(e),
                n = i
                  .maskn(this.shift)
                  .mul(this.minv)
                  .imaskn(this.shift)
                  .mul(this.m),
                a = i.isub(n).iushrn(this.shift),
                o = a;
              return (
                a.cmp(this.m) >= 0
                  ? (o = a.isub(this.m))
                  : 0 > a.cmpn(0) && (o = a.iadd(this.m)),
                o._forceRed(this)
              );
            }),
            (P.prototype.invm = function (t) {
              return this.imod(t._invmp(this.m).mul(this.r2))._forceRed(this);
            }));
        })(typeof e > "u" || e, t);
      }),
      () => (i || e((i = { exports: {} }).exports, i), i.exports)),
    w = {
      address: "AgenTMiC2hvxGebTsgmsD4HHBa8WEcqGFf87iwRRxLo7",
      metadata: {
        name: "pump_agent_payments",
        version: "0.1.0",
        spec: "0.1.0",
        description: "Created with Anchor",
      },
      instructions: [
        {
          name: "agent_accept_payment",
          discriminator: [34, 157, 64, 220, 74, 32, 48, 225],
          accounts: [
            { name: "user", writable: !0, signer: !0 },
            { name: "user_token_account", writable: !0 },
            { name: "token_agent_payments" },
            {
              name: "token_agent_associated_account",
              writable: !0,
              pda: {
                seeds: [
                  { kind: "account", path: "token_agent_payments" },
                  {
                    kind: "const",
                    value: [
                      6, 221, 246, 225, 215, 101, 161, 147, 217, 203, 225, 70,
                      206, 235, 121, 172, 28, 180, 133, 237, 95, 91, 55, 145,
                      58, 140, 245, 133, 126, 255, 0, 169,
                    ],
                  },
                  { kind: "account", path: "currency_mint" },
                ],
                program: {
                  kind: "const",
                  value: [
                    140, 151, 37, 143, 78, 36, 137, 241, 187, 61, 16, 41, 20,
                    142, 13, 131, 11, 90, 19, 153, 218, 255, 16, 132, 4, 142,
                    123, 216, 219, 233, 248, 89,
                  ],
                },
              },
            },
            {
              name: "token_agent_payment_in_currency",
              writable: !0,
              pda: {
                seeds: [
                  {
                    kind: "const",
                    value: [
                      112, 97, 121, 109, 101, 110, 116, 45, 105, 110, 45, 99,
                      117, 114, 114, 101, 110, 99, 121,
                    ],
                  },
                  {
                    kind: "account",
                    path: "token_agent_payments.mint",
                    account: "TokenAgentPayments",
                  },
                  { kind: "account", path: "currency_mint" },
                ],
              },
            },
            {
              name: "global_config",
              pda: {
                seeds: [
                  {
                    kind: "const",
                    value: [
                      103, 108, 111, 98, 97, 108, 45, 99, 111, 110, 102, 105,
                      103,
                    ],
                  },
                ],
              },
            },
            { name: "invoice_id" },
            { name: "currency_mint" },
            { name: "token_program" },
            {
              name: "associated_token_program",
              address: "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL",
            },
            {
              name: "system_program",
              address: "11111111111111111111111111111111",
            },
            {
              name: "event_authority",
              pda: {
                seeds: [
                  {
                    kind: "const",
                    value: [
                      95, 95, 101, 118, 101, 110, 116, 95, 97, 117, 116, 104,
                      111, 114, 105, 116, 121,
                    ],
                  },
                ],
              },
            },
            { name: "program" },
          ],
          args: [
            { name: "amount", type: "u64" },
            { name: "memo", type: "u64" },
            { name: "start_time", type: "i64" },
            { name: "end_time", type: "i64" },
          ],
        },
        {
          name: "agent_buyback_trigger",
          discriminator: [95, 231, 193, 2, 245, 75, 125, 155],
          accounts: [
            { name: "global_buyback_authority", writable: !0, signer: !0 },
            { name: "mint", writable: !0 },
            {
              name: "token_agent_payments",
              pda: {
                seeds: [
                  {
                    kind: "const",
                    value: [
                      116, 111, 107, 101, 110, 45, 97, 103, 101, 110, 116, 45,
                      112, 97, 121, 109, 101, 110, 116, 115,
                    ],
                  },
                  { kind: "account", path: "mint" },
                ],
              },
            },
            {
              name: "token_agent_payment_in_currency",
              writable: !0,
              pda: {
                seeds: [
                  {
                    kind: "const",
                    value: [
                      112, 97, 121, 109, 101, 110, 116, 45, 105, 110, 45, 99,
                      117, 114, 114, 101, 110, 99, 121,
                    ],
                  },
                  {
                    kind: "account",
                    path: "token_agent_payments.mint",
                    account: "TokenAgentPayments",
                  },
                  { kind: "account", path: "currency_mint" },
                ],
              },
            },
            { name: "currency_mint" },
            {
              name: "global_config",
              pda: {
                seeds: [
                  {
                    kind: "const",
                    value: [
                      103, 108, 111, 98, 97, 108, 45, 99, 111, 110, 102, 105,
                      103,
                    ],
                  },
                ],
              },
            },
            { name: "swap_program_to_invoke" },
            {
              name: "burn_authority",
              docs: [
                "Intentionally called burn_authority",
                "TO avoid any confusion with the global buyback authority.",
              ],
              writable: !0,
              pda: {
                seeds: [
                  {
                    kind: "const",
                    value: [
                      98, 117, 121, 98, 97, 99, 107, 45, 97, 117, 116, 104, 111,
                      114, 105, 116, 121,
                    ],
                  },
                  {
                    kind: "account",
                    path: "token_agent_payments.mint",
                    account: "TokenAgentPayments",
                  },
                ],
              },
            },
            {
              name: "burn_mint_vault",
              writable: !0,
              pda: {
                seeds: [
                  { kind: "account", path: "burn_authority" },
                  { kind: "account", path: "token_program" },
                  { kind: "account", path: "mint" },
                ],
                program: {
                  kind: "const",
                  value: [
                    140, 151, 37, 143, 78, 36, 137, 241, 187, 61, 16, 41, 20,
                    142, 13, 131, 11, 90, 19, 153, 218, 255, 16, 132, 4, 142,
                    123, 216, 219, 233, 248, 89,
                  ],
                },
              },
            },
            {
              name: "burn_currency_mint_vault",
              writable: !0,
              pda: {
                seeds: [
                  { kind: "account", path: "burn_authority" },
                  { kind: "account", path: "token_program_currency" },
                  { kind: "account", path: "currency_mint" },
                ],
                program: {
                  kind: "const",
                  value: [
                    140, 151, 37, 143, 78, 36, 137, 241, 187, 61, 16, 41, 20,
                    142, 13, 131, 11, 90, 19, 153, 218, 255, 16, 132, 4, 142,
                    123, 216, 219, 233, 248, 89,
                  ],
                },
              },
            },
            { name: "token_program" },
            { name: "token_program_currency" },
            {
              name: "associated_token_program",
              address: "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL",
            },
            {
              name: "system_program",
              address: "11111111111111111111111111111111",
            },
            {
              name: "event_authority",
              pda: {
                seeds: [
                  {
                    kind: "const",
                    value: [
                      95, 95, 101, 118, 101, 110, 116, 95, 97, 117, 116, 104,
                      111, 114, 105, 116, 121,
                    ],
                  },
                ],
              },
            },
            { name: "program" },
          ],
          args: [{ name: "swap_instruction_data", type: "bytes" }],
        },
        {
          name: "agent_distribute_payments",
          discriminator: [145, 44, 246, 47, 192, 204, 95, 32],
          accounts: [
            { name: "user", writable: !0, signer: !0 },
            {
              name: "global_config",
              pda: {
                seeds: [
                  {
                    kind: "const",
                    value: [
                      103, 108, 111, 98, 97, 108, 45, 99, 111, 110, 102, 105,
                      103,
                    ],
                  },
                ],
              },
            },
            { name: "currency_mint" },
            { name: "token_agent_payments", writable: !0 },
            {
              name: "token_agent_payment_in_currency",
              writable: !0,
              pda: {
                seeds: [
                  {
                    kind: "const",
                    value: [
                      112, 97, 121, 109, 101, 110, 116, 45, 105, 110, 45, 99,
                      117, 114, 114, 101, 110, 99, 121,
                    ],
                  },
                  {
                    kind: "account",
                    path: "token_agent_payments.mint",
                    account: "TokenAgentPayments",
                  },
                  { kind: "account", path: "currency_mint" },
                ],
              },
            },
            {
              name: "token_agent_associated_account",
              writable: !0,
              pda: {
                seeds: [
                  { kind: "account", path: "token_agent_payments" },
                  {
                    kind: "const",
                    value: [
                      6, 221, 246, 225, 215, 101, 161, 147, 217, 203, 225, 70,
                      206, 235, 121, 172, 28, 180, 133, 237, 95, 91, 55, 145,
                      58, 140, 245, 133, 126, 255, 0, 169,
                    ],
                  },
                  { kind: "account", path: "currency_mint" },
                ],
                program: {
                  kind: "const",
                  value: [
                    140, 151, 37, 143, 78, 36, 137, 241, 187, 61, 16, 41, 20,
                    142, 13, 131, 11, 90, 19, 153, 218, 255, 16, 132, 4, 142,
                    123, 216, 219, 233, 248, 89,
                  ],
                },
              },
            },
            {
              name: "buyback_authority",
              pda: {
                seeds: [
                  {
                    kind: "const",
                    value: [
                      98, 117, 121, 98, 97, 99, 107, 45, 97, 117, 116, 104, 111,
                      114, 105, 116, 121,
                    ],
                  },
                  {
                    kind: "account",
                    path: "token_agent_payments.mint",
                    account: "TokenAgentPayments",
                  },
                ],
              },
            },
            {
              name: "withdraw_authority",
              pda: {
                seeds: [
                  {
                    kind: "const",
                    value: [
                      119, 105, 116, 104, 100, 114, 97, 119, 45, 97, 117, 116,
                      104, 111, 114, 105, 116, 121,
                    ],
                  },
                  {
                    kind: "account",
                    path: "token_agent_payments.mint",
                    account: "TokenAgentPayments",
                  },
                ],
              },
            },
            {
              name: "buyback_vault",
              writable: !0,
              pda: {
                seeds: [
                  { kind: "account", path: "buyback_authority" },
                  {
                    kind: "const",
                    value: [
                      6, 221, 246, 225, 215, 101, 161, 147, 217, 203, 225, 70,
                      206, 235, 121, 172, 28, 180, 133, 237, 95, 91, 55, 145,
                      58, 140, 245, 133, 126, 255, 0, 169,
                    ],
                  },
                  { kind: "account", path: "currency_mint" },
                ],
                program: {
                  kind: "const",
                  value: [
                    140, 151, 37, 143, 78, 36, 137, 241, 187, 61, 16, 41, 20,
                    142, 13, 131, 11, 90, 19, 153, 218, 255, 16, 132, 4, 142,
                    123, 216, 219, 233, 248, 89,
                  ],
                },
              },
            },
            {
              name: "withdraw_vault",
              writable: !0,
              pda: {
                seeds: [
                  { kind: "account", path: "withdraw_authority" },
                  {
                    kind: "const",
                    value: [
                      6, 221, 246, 225, 215, 101, 161, 147, 217, 203, 225, 70,
                      206, 235, 121, 172, 28, 180, 133, 237, 95, 91, 55, 145,
                      58, 140, 245, 133, 126, 255, 0, 169,
                    ],
                  },
                  { kind: "account", path: "currency_mint" },
                ],
                program: {
                  kind: "const",
                  value: [
                    140, 151, 37, 143, 78, 36, 137, 241, 187, 61, 16, 41, 20,
                    142, 13, 131, 11, 90, 19, 153, 218, 255, 16, 132, 4, 142,
                    123, 216, 219, 233, 248, 89,
                  ],
                },
              },
            },
            { name: "token_program" },
            {
              name: "associated_token_program",
              address: "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL",
            },
            {
              name: "system_program",
              address: "11111111111111111111111111111111",
            },
            {
              name: "event_authority",
              pda: {
                seeds: [
                  {
                    kind: "const",
                    value: [
                      95, 95, 101, 118, 101, 110, 116, 95, 97, 117, 116, 104,
                      111, 114, 105, 116, 121,
                    ],
                  },
                ],
              },
            },
            { name: "program" },
          ],
          args: [],
        },
        {
          name: "agent_initialize",
          discriminator: [180, 248, 163, 8, 49, 94, 126, 96],
          accounts: [
            { name: "authority", writable: !0, signer: !0 },
            {
              name: "bonding_curve",
              pda: {
                seeds: [
                  {
                    kind: "const",
                    value: [
                      98, 111, 110, 100, 105, 110, 103, 45, 99, 117, 114, 118,
                      101,
                    ],
                  },
                  { kind: "account", path: "mint" },
                ],
                program: {
                  kind: "const",
                  value: [
                    1, 86, 224, 246, 147, 102, 90, 207, 68, 219, 21, 104, 191,
                    23, 91, 170, 81, 137, 203, 151, 245, 210, 255, 59, 101, 93,
                    43, 182, 253, 109, 24, 176,
                  ],
                },
              },
            },
            {
              name: "global_config",
              writable: !0,
              pda: {
                seeds: [
                  {
                    kind: "const",
                    value: [
                      103, 108, 111, 98, 97, 108, 45, 99, 111, 110, 102, 105,
                      103,
                    ],
                  },
                ],
              },
            },
            { name: "mint" },
            {
              name: "token_agent_payments",
              writable: !0,
              pda: {
                seeds: [
                  {
                    kind: "const",
                    value: [
                      116, 111, 107, 101, 110, 45, 97, 103, 101, 110, 116, 45,
                      112, 97, 121, 109, 101, 110, 116, 115,
                    ],
                  },
                  { kind: "account", path: "mint" },
                ],
              },
            },
            {
              name: "system_program",
              address: "11111111111111111111111111111111",
            },
            {
              name: "event_authority",
              pda: {
                seeds: [
                  {
                    kind: "const",
                    value: [
                      95, 95, 101, 118, 101, 110, 116, 95, 97, 117, 116, 104,
                      111, 114, 105, 116, 121,
                    ],
                  },
                ],
              },
            },
            { name: "program" },
            { name: "sharing_fee_config" },
          ],
          args: [
            { name: "authority", type: "pubkey" },
            { name: "buyback_bps", type: "u16" },
          ],
        },
        {
          name: "agent_transfer_extra_lamports",
          discriminator: [39, 206, 214, 167, 55, 44, 221, 81],
          accounts: [
            {
              name: "token_agent_payments",
              writable: !0,
              pda: {
                seeds: [
                  {
                    kind: "const",
                    value: [
                      116, 111, 107, 101, 110, 45, 97, 103, 101, 110, 116, 45,
                      112, 97, 121, 109, 101, 110, 116, 115,
                    ],
                  },
                  {
                    kind: "account",
                    path: "token_agent_payments.mint",
                    account: "TokenAgentPayments",
                  },
                ],
              },
            },
            {
              name: "token_agent_associated_account",
              writable: !0,
              pda: {
                seeds: [
                  { kind: "account", path: "token_agent_payments" },
                  {
                    kind: "const",
                    value: [
                      6, 221, 246, 225, 215, 101, 161, 147, 217, 203, 225, 70,
                      206, 235, 121, 172, 28, 180, 133, 237, 95, 91, 55, 145,
                      58, 140, 245, 133, 126, 255, 0, 169,
                    ],
                  },
                  {
                    kind: "const",
                    value: [
                      6, 155, 136, 87, 254, 171, 129, 132, 251, 104, 127, 99,
                      70, 24, 192, 53, 218, 196, 57, 220, 26, 235, 59, 85, 152,
                      160, 240, 0, 0, 0, 0, 1,
                    ],
                  },
                ],
                program: {
                  kind: "const",
                  value: [
                    140, 151, 37, 143, 78, 36, 137, 241, 187, 61, 16, 41, 20,
                    142, 13, 131, 11, 90, 19, 153, 218, 255, 16, 132, 4, 142,
                    123, 216, 219, 233, 248, 89,
                  ],
                },
              },
            },
          ],
          args: [],
        },
        {
          name: "agent_update_authority",
          discriminator: [237, 228, 227, 224, 226, 198, 167, 83],
          accounts: [
            { name: "authority", writable: !0, signer: !0 },
            {
              name: "global_config",
              pda: {
                seeds: [
                  {
                    kind: "const",
                    value: [
                      103, 108, 111, 98, 97, 108, 45, 99, 111, 110, 102, 105,
                      103,
                    ],
                  },
                ],
              },
            },
            { name: "token_agent_payments", writable: !0 },
            {
              name: "system_program",
              address: "11111111111111111111111111111111",
            },
            {
              name: "event_authority",
              pda: {
                seeds: [
                  {
                    kind: "const",
                    value: [
                      95, 95, 101, 118, 101, 110, 116, 95, 97, 117, 116, 104,
                      111, 114, 105, 116, 121,
                    ],
                  },
                ],
              },
            },
            { name: "program" },
          ],
          args: [{ name: "new_authority", type: "pubkey" }],
        },
        {
          name: "agent_update_buyback_bps",
          discriminator: [41, 28, 118, 90, 53, 24, 63, 160],
          accounts: [
            { name: "authority", writable: !0, signer: !0 },
            { name: "token_agent_payments", writable: !0 },
            {
              name: "global_config",
              pda: {
                seeds: [
                  {
                    kind: "const",
                    value: [
                      103, 108, 111, 98, 97, 108, 45, 99, 111, 110, 102, 105,
                      103,
                    ],
                  },
                ],
              },
            },
            {
              name: "event_authority",
              pda: {
                seeds: [
                  {
                    kind: "const",
                    value: [
                      95, 95, 101, 118, 101, 110, 116, 95, 97, 117, 116, 104,
                      111, 114, 105, 116, 121,
                    ],
                  },
                ],
              },
            },
            { name: "program" },
          ],
          args: [{ name: "buyback_bps", type: "u16" }],
        },
        {
          name: "agent_withdraw",
          discriminator: [13, 149, 99, 245, 171, 171, 185, 53],
          accounts: [
            { name: "authority", writable: !0, signer: !0 },
            { name: "token_agent_payments" },
            { name: "currency_mint" },
            {
              name: "withdraw_authority",
              pda: {
                seeds: [
                  {
                    kind: "const",
                    value: [
                      119, 105, 116, 104, 100, 114, 97, 119, 45, 97, 117, 116,
                      104, 111, 114, 105, 116, 121,
                    ],
                  },
                  {
                    kind: "account",
                    path: "token_agent_payments.mint",
                    account: "TokenAgentPayments",
                  },
                ],
              },
            },
            {
              name: "withdraw_vault",
              writable: !0,
              pda: {
                seeds: [
                  { kind: "account", path: "withdraw_authority" },
                  {
                    kind: "const",
                    value: [
                      6, 221, 246, 225, 215, 101, 161, 147, 217, 203, 225, 70,
                      206, 235, 121, 172, 28, 180, 133, 237, 95, 91, 55, 145,
                      58, 140, 245, 133, 126, 255, 0, 169,
                    ],
                  },
                  { kind: "account", path: "currency_mint" },
                ],
                program: {
                  kind: "const",
                  value: [
                    140, 151, 37, 143, 78, 36, 137, 241, 187, 61, 16, 41, 20,
                    142, 13, 131, 11, 90, 19, 153, 218, 255, 16, 132, 4, 142,
                    123, 216, 219, 233, 248, 89,
                  ],
                },
              },
            },
            { name: "receiver_ata", writable: !0 },
            { name: "token_program" },
            {
              name: "associated_token_program",
              address: "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL",
            },
            {
              name: "system_program",
              address: "11111111111111111111111111111111",
            },
            {
              name: "event_authority",
              pda: {
                seeds: [
                  {
                    kind: "const",
                    value: [
                      95, 95, 101, 118, 101, 110, 116, 95, 97, 117, 116, 104,
                      111, 114, 105, 116, 121,
                    ],
                  },
                ],
              },
            },
            { name: "program" },
          ],
          args: [],
        },
        {
          name: "close_account",
          discriminator: [125, 255, 149, 14, 110, 34, 72, 24],
          accounts: [
            { name: "account", writable: !0 },
            { name: "user", writable: !0, signer: !0 },
            {
              name: "global_config",
              pda: {
                seeds: [
                  {
                    kind: "const",
                    value: [
                      103, 108, 111, 98, 97, 108, 45, 99, 111, 110, 102, 105,
                      103,
                    ],
                  },
                ],
              },
            },
            {
              name: "system_program",
              address: "11111111111111111111111111111111",
            },
          ],
          args: [],
        },
        {
          name: "extend_account",
          discriminator: [234, 102, 194, 203, 150, 72, 62, 229],
          accounts: [
            { name: "account", writable: !0 },
            { name: "user", writable: !0, signer: !0 },
            {
              name: "system_program",
              address: "11111111111111111111111111111111",
            },
            {
              name: "event_authority",
              pda: {
                seeds: [
                  {
                    kind: "const",
                    value: [
                      95, 95, 101, 118, 101, 110, 116, 95, 97, 117, 116, 104,
                      111, 114, 105, 116, 121,
                    ],
                  },
                ],
              },
            },
            { name: "program" },
          ],
          args: [],
        },
        {
          name: "global_add_new_currency",
          discriminator: [46, 135, 47, 120, 118, 204, 177, 224],
          accounts: [
            { name: "authority", writable: !0, signer: !0 },
            {
              name: "global_config",
              writable: !0,
              pda: {
                seeds: [
                  {
                    kind: "const",
                    value: [
                      103, 108, 111, 98, 97, 108, 45, 99, 111, 110, 102, 105,
                      103,
                    ],
                  },
                ],
              },
            },
            { name: "mint" },
            {
              name: "event_authority",
              pda: {
                seeds: [
                  {
                    kind: "const",
                    value: [
                      95, 95, 101, 118, 101, 110, 116, 95, 97, 117, 116, 104,
                      111, 114, 105, 116, 121,
                    ],
                  },
                ],
              },
            },
            { name: "program" },
          ],
          args: [],
        },
        {
          name: "global_config_initialize",
          discriminator: [61, 23, 208, 192, 232, 52, 8, 66],
          accounts: [
            { name: "authority", writable: !0, signer: !0 },
            {
              name: "global_config",
              writable: !0,
              pda: {
                seeds: [
                  {
                    kind: "const",
                    value: [
                      103, 108, 111, 98, 97, 108, 45, 99, 111, 110, 102, 105,
                      103,
                    ],
                  },
                ],
              },
            },
            {
              name: "system_program",
              address: "11111111111111111111111111111111",
            },
            {
              name: "event_authority",
              pda: {
                seeds: [
                  {
                    kind: "const",
                    value: [
                      95, 95, 101, 118, 101, 110, 116, 95, 97, 117, 116, 104,
                      111, 114, 105, 116, 121,
                    ],
                  },
                ],
              },
            },
            { name: "program" },
          ],
          args: [
            { name: "protocol_authority", type: "pubkey" },
            { name: "buyback_authority", type: "pubkey" },
          ],
        },
        {
          name: "global_remove_currency",
          discriminator: [57, 226, 180, 140, 91, 14, 231, 196],
          accounts: [
            { name: "authority", writable: !0, signer: !0 },
            {
              name: "global_config",
              writable: !0,
              pda: {
                seeds: [
                  {
                    kind: "const",
                    value: [
                      103, 108, 111, 98, 97, 108, 45, 99, 111, 110, 102, 105,
                      103,
                    ],
                  },
                ],
              },
            },
            {
              name: "event_authority",
              pda: {
                seeds: [
                  {
                    kind: "const",
                    value: [
                      95, 95, 101, 118, 101, 110, 116, 95, 97, 117, 116, 104,
                      111, 114, 105, 116, 121,
                    ],
                  },
                ],
              },
            },
            { name: "program" },
          ],
          args: [{ name: "index", type: "u8" }],
        },
        {
          name: "global_update_authorities",
          discriminator: [91, 137, 72, 77, 183, 184, 168, 125],
          accounts: [
            { name: "authority", writable: !0, signer: !0 },
            {
              name: "global_config",
              writable: !0,
              pda: {
                seeds: [
                  {
                    kind: "const",
                    value: [
                      103, 108, 111, 98, 97, 108, 45, 99, 111, 110, 102, 105,
                      103,
                    ],
                  },
                ],
              },
            },
            {
              name: "event_authority",
              pda: {
                seeds: [
                  {
                    kind: "const",
                    value: [
                      95, 95, 101, 118, 101, 110, 116, 95, 97, 117, 116, 104,
                      111, 114, 105, 116, 121,
                    ],
                  },
                ],
              },
            },
            { name: "program" },
          ],
          args: [
            { name: "protocol_authority", type: { option: "pubkey" } },
            { name: "buyback_authority", type: { option: "pubkey" } },
          ],
        },
      ],
      accounts: [
        {
          name: "BondingCurve",
          discriminator: [23, 183, 248, 55, 96, 216, 172, 96],
        },
        {
          name: "GlobalConfig",
          discriminator: [149, 8, 156, 202, 160, 252, 176, 217],
        },
        {
          name: "TokenAgentPaymentInCurrency",
          discriminator: [225, 195, 81, 227, 115, 43, 25, 177],
        },
        {
          name: "TokenAgentPayments",
          discriminator: [136, 241, 242, 217, 173, 77, 112, 186],
        },
      ],
      events: [
        {
          name: "AgentAcceptPaymentEvent",
          discriminator: [114, 190, 188, 192, 105, 79, 41, 147],
        },
        {
          name: "AgentBuybackTriggerEvent",
          discriminator: [139, 240, 9, 225, 214, 63, 232, 165],
        },
        {
          name: "AgentDistributePaymentsEvent",
          discriminator: [137, 116, 114, 140, 54, 111, 230, 26],
        },
        {
          name: "AgentInitializeEvent",
          discriminator: [192, 5, 183, 151, 0, 64, 100, 207],
        },
        {
          name: "AgentUpdateAuthorityEvent",
          discriminator: [36, 212, 117, 235, 74, 166, 60, 16],
        },
        {
          name: "AgentUpdateBuybackBpsEvent",
          discriminator: [165, 251, 40, 19, 114, 26, 128, 232],
        },
        {
          name: "AgentWithdrawEvent",
          discriminator: [174, 231, 201, 69, 254, 183, 49, 85],
        },
        {
          name: "ExtendAccountEvent",
          discriminator: [97, 97, 215, 144, 93, 146, 22, 124],
        },
        {
          name: "GlobalAddNewCurrencyEvent",
          discriminator: [130, 202, 37, 248, 241, 182, 233, 35],
        },
        {
          name: "GlobalConfigInitializeEvent",
          discriminator: [241, 51, 222, 190, 142, 245, 176, 53],
        },
        {
          name: "GlobalUpdateAuthoritiesEvent",
          discriminator: [82, 27, 22, 232, 53, 66, 35, 207],
        },
      ],
      errors: [
        {
          code: 6e3,
          name: "UnauthorizedSigner",
          msg: "The given account is not authorized to execute this instruction.",
        },
        {
          code: 6001,
          name: "CurrencyAlreadySupported",
          msg: "The given currency is already supported.",
        },
        {
          code: 6002,
          name: "MaxCurrenciesReached",
          msg: "The maximum number of currencies has been reached.",
        },
        {
          code: 6003,
          name: "InvalidBuybackBps",
          msg: "The buyback basis points is greater than 10000.",
        },
        {
          code: 6004,
          name: "CurrencyNotSupported",
          msg: "The given currency is not supported.",
        },
        { code: 6005, name: "MathOverflow", msg: "Math overflow." },
        {
          code: 6006,
          name: "InvalidRemainingAccountAddress",
          msg: "The given remaining account address is invalid.",
        },
        {
          code: 6007,
          name: "PaymentVaultNotEmpty",
          msg: "The payment vault is not empty. Distribute the payments first.",
        },
        {
          code: 6008,
          name: "InvalidInvoiceAccount",
          msg: "The invoice account does not match the expected PDA seeds",
        },
        {
          code: 6009,
          name: "InvalidProgramToInvoke",
          msg: "The program to invoke is not allowed.",
        },
        {
          code: 6010,
          name: "InvalidCallbackProgram",
          msg: "The callback program is invalid.",
        },
        {
          code: 6011,
          name: "SwapFailedAmountDidNotIncrease",
          msg: "The swap failed and the amount did not increase.",
        },
        {
          code: 6012,
          name: "AccountTypeNotSupported",
          msg: "The account type is not supported for extension.",
        },
        { code: 6013, name: "InvalidIndex", msg: "The index is invalid." },
        {
          code: 6014,
          name: "InvalidSharingConfig",
          msg: "The sharing config is invalid.",
        },
      ],
      types: [
        {
          name: "AgentAcceptPaymentEvent",
          type: {
            kind: "struct",
            fields: [
              { name: "user", type: "pubkey" },
              { name: "tokenized_agent_mint", type: "pubkey" },
              { name: "token_agent_payments", type: "pubkey" },
              { name: "currency_mint", type: "pubkey" },
              { name: "amount", type: "u64" },
              { name: "memo", type: "u64" },
              { name: "start_time", type: "i64" },
              { name: "end_time", type: "i64" },
              { name: "invoice_id", type: "pubkey" },
              { name: "agent_post_balance", type: "u64" },
              { name: "timestamp", type: "i64" },
            ],
          },
        },
        {
          name: "AgentBuybackTriggerEvent",
          type: {
            kind: "struct",
            fields: [
              { name: "tokenized_agent_mint", type: "pubkey" },
              { name: "currency_mint", type: "pubkey" },
              { name: "amount_burned", type: "u64" },
              { name: "swap_program", type: "pubkey" },
              {
                name: "new_tokens_bought_and_burned_for_currency",
                type: "u64",
              },
              { name: "agent_post_balance", type: "u64" },
              { name: "timestamp", type: "i64" },
              { name: "currency_mint_amount_for_buyback", type: "u64" },
            ],
          },
        },
        {
          name: "AgentDistributePaymentsEvent",
          type: {
            kind: "struct",
            fields: [
              { name: "token_agent_payments", type: "pubkey" },
              { name: "currency_mint", type: "pubkey" },
              { name: "buyback_bps", type: "u16" },
              { name: "buyback_amount", type: "u64" },
              { name: "withdraw_amount", type: "u64" },
              { name: "timestamp", type: "i64" },
            ],
          },
        },
        {
          name: "AgentInitializeEvent",
          type: {
            kind: "struct",
            fields: [
              { name: "token_agent_payments", type: "pubkey" },
              { name: "mint", type: "pubkey" },
              { name: "authority", type: "pubkey" },
              { name: "buyback_bps", type: "u16" },
              { name: "timestamp", type: "i64" },
              { name: "tokenized_agent_sequence", type: "u64" },
            ],
          },
        },
        {
          name: "AgentUpdateAuthorityEvent",
          type: {
            kind: "struct",
            fields: [
              { name: "token_agent_payments", type: "pubkey" },
              { name: "old_authority", type: "pubkey" },
              { name: "new_authority", type: "pubkey" },
              { name: "timestamp", type: "i64" },
            ],
          },
        },
        {
          name: "AgentUpdateBuybackBpsEvent",
          type: {
            kind: "struct",
            fields: [
              { name: "token_agent_payments", type: "pubkey" },
              { name: "mint", type: "pubkey" },
              { name: "old_buyback_bps", type: "u16" },
              { name: "new_buyback_bps", type: "u16" },
              { name: "timestamp", type: "i64" },
            ],
          },
        },
        {
          name: "AgentWithdrawEvent",
          type: {
            kind: "struct",
            fields: [
              { name: "tokenized_agent_mint", type: "pubkey" },
              { name: "currency_mint", type: "pubkey" },
              { name: "amount", type: "u64" },
              { name: "receiver", type: "pubkey" },
              { name: "timestamp", type: "i64" },
            ],
          },
        },
        {
          name: "BondingCurve",
          type: {
            kind: "struct",
            fields: [
              { name: "virtual_token_reserves", type: "u64" },
              { name: "virtual_sol_reserves", type: "u64" },
              { name: "real_token_reserves", type: "u64" },
              { name: "real_sol_reserves", type: "u64" },
              { name: "token_total_supply", type: "u64" },
              { name: "complete", type: "bool" },
              { name: "creator", type: "pubkey" },
              { name: "is_mayhem_mode", type: "bool" },
            ],
          },
        },
        {
          name: "ExtendAccountEvent",
          type: {
            kind: "struct",
            fields: [
              { name: "account", type: "pubkey" },
              { name: "user", type: "pubkey" },
              { name: "current_size", type: "u64" },
              { name: "new_size", type: "u64" },
              { name: "timestamp", type: "i64" },
            ],
          },
        },
        {
          name: "GlobalAddNewCurrencyEvent",
          type: {
            kind: "struct",
            fields: [
              { name: "global_config", type: "pubkey" },
              { name: "currency_mint", type: "pubkey" },
              { name: "timestamp", type: "i64" },
            ],
          },
        },
        {
          name: "GlobalConfig",
          type: {
            kind: "struct",
            fields: [
              { name: "bump", type: "u8" },
              { name: "protocol_authority", type: "pubkey" },
              { name: "buyback_authority", type: "pubkey" },
              {
                name: "supported_currencies_mint",
                type: { array: ["pubkey", 10] },
              },
              { name: "tokenized_agent_sequence", type: "u64" },
            ],
          },
        },
        {
          name: "GlobalConfigInitializeEvent",
          type: {
            kind: "struct",
            fields: [
              { name: "global_config", type: "pubkey" },
              { name: "protocol_authority", type: "pubkey" },
              { name: "buyback_authority", type: "pubkey" },
              { name: "timestamp", type: "i64" },
            ],
          },
        },
        {
          name: "GlobalUpdateAuthoritiesEvent",
          type: {
            kind: "struct",
            fields: [
              { name: "global_config", type: "pubkey" },
              { name: "protocol_authority", type: { option: "pubkey" } },
              { name: "buyback_authority", type: { option: "pubkey" } },
              { name: "timestamp", type: "i64" },
            ],
          },
        },
        {
          name: "TokenAgentPaymentInCurrency",
          type: {
            kind: "struct",
            fields: [
              { name: "mint", type: "pubkey" },
              { name: "currency_mint", type: "pubkey" },
              { name: "total_invoice_payments_made", type: "u64" },
              { name: "total_buyback", type: "u64" },
              { name: "total_withdrawals", type: "u64" },
              { name: "tokens_bought_back_and_burned", type: "u64" },
            ],
          },
        },
        {
          name: "TokenAgentPayments",
          type: {
            kind: "struct",
            fields: [
              { name: "bump", type: "u8" },
              { name: "mint", type: "pubkey" },
              { name: "authority", type: "pubkey" },
              { name: "buyback_bps", type: "u16" },
            ],
          },
        },
      ],
    };
  function _(t) {
    let e = {
      publicKey: a.PublicKey.default,
      signTransaction: () => Promise.reject(),
      signAllTransactions: () => Promise.reject(),
    };
    return new o.v(w, new o.F(t, e, {}));
  }
  var k = _(null),
    x = ((t, e, i) => {
      if ((e && "object" == typeof e) || "function" == typeof e)
        for (let n of y(e))
          v.call(t, n) ||
            void 0 === n ||
            c(t, n, {
              get: () => e[n],
              enumerable: !(i = p(e, n)) || i.enumerable,
            });
      return t;
    })(
      c(null != (n = b()) ? d(g(n)) : {}, "default", {
        value: n,
        enumerable: !0,
      }),
      n,
    ),
    A = new a.PublicKey("AgenTMiC2hvxGebTsgmsD4HHBa8WEcqGFf87iwRRxLo7"),
    P = new a.PublicKey("6EF8rrecthR5Dkzon8Nwu78hRvfCKubJ14M5uBEwF6P"),
    T = new a.PublicKey("pfeeUxB6jkeY1Hxd7CsFCAjcbHA9rWtchMGdZ6VojVZ"),
    B = r.Buffer.from("global-config"),
    S = r.Buffer.from("token-agent-payments"),
    E = r.Buffer.from("payment-in-currency"),
    I = r.Buffer.from("invoice-id"),
    C = r.Buffer.from("buyback-authority"),
    L = r.Buffer.from("withdraw-authority"),
    N = r.Buffer.from("bonding-curve"),
    R = r.Buffer.from("sharing-config");
  function q() {
    return a.PublicKey.findProgramAddressSync([B], A);
  }
  function z(t) {
    return a.PublicKey.findProgramAddressSync([S, t.toBuffer()], A);
  }
  function Z(t, e) {
    return a.PublicKey.findProgramAddressSync(
      [E, t.toBuffer(), e.toBuffer()],
      A,
    );
  }
  function O(t) {
    return a.PublicKey.findProgramAddressSync([C, t.toBuffer()], A);
  }
  function U(t) {
    return a.PublicKey.findProgramAddressSync([L, t.toBuffer()], A);
  }
  function G(t) {
    return new l.BN(t.toString());
  }
  var K = class t {
    constructor(t, e = k) {
      ((this.mint = t), (this.program = e));
    }
    async create(t) {
      let { authority: e, mint: i, agentAuthority: n, buybackBps: r } = t,
        [o] = a.PublicKey.findProgramAddressSync([N, i.toBuffer()], P),
        [s] = z(i),
        [u] = a.PublicKey.findProgramAddressSync([R, i.toBuffer()], T);
      return this.program.methods
        .agentInitialize(n, r)
        .accountsPartial({
          authority: e,
          bondingCurve: o,
          mint: i,
          tokenAgentPayments: s,
          sharingFeeConfig: u,
        })
        .instruction();
    }
    static load(e, i) {
      return new t(e, i ? _(i) : k);
    }
    async withdraw(t) {
      let {
          authority: e,
          currencyMint: i,
          receiverAta: n,
          tokenProgram: r,
        } = t,
        a = r ?? s.z,
        [o] = z(this.mint),
        [h] = U(this.mint),
        m = (0, u.h)(i, h, !0, a);
      return this.program.methods
        .agentWithdraw()
        .accountsPartial({
          authority: e,
          tokenAgentPayments: o,
          currencyMint: i,
          withdrawAuthority: h,
          withdrawVault: m,
          receiverAta: n,
          tokenProgram: a,
        })
        .instruction();
    }
    async updateBuybackBps(t, e) {
      let { authority: i, buybackBps: n } = t,
        r = e.supportedCurrencies,
        [o] = z(this.mint),
        [s] = q(),
        h = [];
      for (let t of r) {
        if (t.mint.equals(a.PublicKey.default)) continue;
        let e = (0, u.h)(t.mint, o, !0, t.tokenProgram);
        h.push({ pubkey: e, isWritable: !1, isSigner: !1 });
      }
      return this.program.methods
        .agentUpdateBuybackBps(n)
        .accountsPartial({
          authority: i,
          tokenAgentPayments: o,
          globalConfig: s,
        })
        .remainingAccounts(h)
        .instruction();
    }
    async acceptPayment(t) {
      var e, i, n, o, h;
      let {
          user: m,
          userTokenAccount: f,
          currencyMint: l,
          amount: d,
          memo: c,
          startTime: p,
          endTime: y,
          tokenProgram: g,
        } = t,
        v = g ?? s.z,
        [M] = z(this.mint),
        [b] = q(),
        [w] = Z(this.mint, l),
        [_] =
          ((e = this.mint),
          (i = d.toNumber()),
          (n = c.toNumber()),
          (o = p.toNumber()),
          (h = y.toNumber()),
          a.PublicKey.findProgramAddressSync(
            [
              I,
              e.toBuffer(),
              l.toBuffer(),
              new x.default(i).toArrayLike(r.Buffer, "le", 8),
              new x.default(n).toArrayLike(r.Buffer, "le", 8),
              new x.default(o).toArrayLike(r.Buffer, "le", 8),
              new x.default(h).toArrayLike(r.Buffer, "le", 8),
            ],
            A,
          )),
        k = (0, u.h)(l, M, !0, v);
      return this.program.methods
        .agentAcceptPayment(d, c, p, y)
        .accountsPartial({
          user: m,
          userTokenAccount: f,
          tokenAgentPayments: M,
          tokenAgentAssociatedAccount: k,
          tokenAgentPaymentInCurrency: w,
          globalConfig: b,
          invoiceId: _,
          currencyMint: l,
          tokenProgram: v,
        })
        .instruction();
    }
    async buildAcceptPaymentInstructions(e) {
      let {
          user: i,
          currencyMint: n,
          amount: r,
          memo: o,
          startTime: l,
          endTime: d,
        } = e,
        c =
          e.computeUnitLimit ?? t.DEFAULT_COMPUTE_UNIT_LIMIT_FOR_AGENT_PAYMENTS,
        p = e.tokenProgram ?? s.z,
        y = (0, u.h)(n, i, !1, p),
        g = await this.acceptPayment({
          user: i,
          userTokenAccount: y,
          currencyMint: n,
          amount: G(r),
          memo: G(o),
          startTime: G(l),
          endTime: G(d),
          tokenProgram: e.tokenProgram,
        }),
        v = [a.ComputeBudgetProgram.setComputeUnitLimit({ units: c })];
      return (
        null != e.computeUnitPrice &&
          v.push(
            a.ComputeBudgetProgram.setComputeUnitPrice({
              microLamports: e.computeUnitPrice,
            }),
          ),
        n.equals(s.w)
          ? [
              ...v,
              (0, h.f)(i, y, i, s.w),
              a.SystemProgram.transfer({
                fromPubkey: i,
                toPubkey: y,
                lamports: BigInt(r.toString()),
              }),
              (0, m.f)(y),
              g,
              (0, f.f)(y, i, i),
            ]
          : [...v, g]
      );
    }
    async distributePayments(t) {
      let {
          user: e,
          currencyMint: i,
          tokenProgram: n,
          includeTransferExtraLamportsForNative: r = !1,
        } = t,
        a = n ?? s.z,
        [o] = z(this.mint),
        [h] = q(),
        [m] = Z(this.mint, i),
        [f] = O(this.mint),
        [l] = U(this.mint),
        d = (0, u.h)(i, o, !0, a),
        c = (0, u.h)(i, f, !0, a),
        p = (0, u.h)(i, l, !0, a),
        y = await this.program.methods
          .agentDistributePayments()
          .accountsPartial({
            user: e,
            globalConfig: h,
            currencyMint: i,
            tokenAgentPayments: o,
            tokenAgentPaymentInCurrency: m,
            tokenAgentAssociatedAccount: d,
            buybackAuthority: f,
            withdrawAuthority: l,
            buybackVault: c,
            withdrawVault: p,
            tokenProgram: a,
          })
          .instruction();
      return r && i.equals(s.w)
        ? [
            await this.program.methods
              .agentTransferExtraLamports()
              .accountsPartial({
                tokenAgentPayments: o,
                tokenAgentAssociatedAccount: d,
              })
              .instruction(),
            y,
          ]
        : [y];
    }
    async buybackTrigger(t) {
      let {
          globalBuybackAuthority: e,
          currencyMint: i,
          swapProgramToInvoke: n,
          swapInstructionData: r,
          remainingAccounts: a,
          tokenProgramCurrency: o,
          tokenProgram: h,
        } = t,
        [m] = z(this.mint),
        [f] = q(),
        [l] = O(this.mint),
        [d] = Z(this.mint, i),
        c = (0, u.h)(this.mint, l, !0, h),
        p = (0, u.h)(i, l, !0, o ?? s.z);
      return this.program.methods
        .agentBuybackTrigger(r)
        .accountsPartial({
          globalBuybackAuthority: e,
          mint: this.mint,
          tokenAgentPayments: m,
          tokenAgentPaymentInCurrency: d,
          currencyMint: i,
          globalConfig: f,
          swapProgramToInvoke: n,
          burnAuthority: l,
          burnMintVault: c,
          burnCurrencyMintVault: p,
          tokenProgram: h ?? s.z,
          tokenProgramCurrency: o ?? s.z,
        })
        .remainingAccounts(a)
        .instruction();
    }
    async extendAccount(t) {
      let { account: e, user: i } = t;
      return this.program.methods
        .extendAccount()
        .accountsPartial({ account: e, user: i })
        .instruction();
    }
    async updateAuthority(t) {
      let { authority: e, newAuthority: i } = t,
        [n] = z(this.mint);
      return this.program.methods
        .agentUpdateAuthority(i)
        .accountsPartial({ authority: e, tokenAgentPayments: n })
        .instruction();
    }
  };
  ((K.DEFAULT_COMPUTE_UNIT_LIMIT_FOR_AGENT_PAYMENTS = 1e5),
    (K.DEFAULT_PRIORITY_FEE_MICRO_LAMPORTS = 1e3),
    new a.PublicKey(w.address),
    t.s([
      "U",
      0,
      K,
      "L",
      0,
      1412880,
      "J",
      0,
      function (t) {
        return k.coder.accounts.decode("globalConfig", t);
      },
      "H",
      0,
      function (t) {
        return k.coder.accounts.decode("tokenAgentPaymentInCurrency", t);
      },
      "x",
      0,
      function (t) {
        return k.coder.accounts.decode("tokenAgentPayments", t);
      },
      "i",
      0,
      O,
      "m",
      0,
      q,
      "G",
      0,
      Z,
      "K",
      0,
      z,
      "j",
      0,
      U,
    ]));
};
