// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(t, e, r) => {
  !(function (t, e) {
    "use strict";
    function r(t, e) {
      if (!t) throw Error(e || "Assertion failed");
    }
    function i(t, e) {
      t.super_ = e;
      var r = function () {};
      ((r.prototype = e.prototype),
        (t.prototype = new r()),
        (t.prototype.constructor = t));
    }
    function n(t, e, r) {
      if (n.isBN(t)) return t;
      ((this.negative = 0),
        (this.words = null),
        (this.length = 0),
        (this.red = null),
        null !== t &&
          (("le" === e || "be" === e) && ((r = e), (e = 10)),
          this._init(t || 0, e || 10, r || "be")));
    }
    ((t.exports = n), (n.BN = n), (n.wordSize = 26));
    try {
      l =
        "u" > typeof window && void 0 !== window.Buffer
          ? window.Buffer
          : void 0;
    } catch (t) {}
    function s(t, e) {
      var i = t.charCodeAt(e);
      return i >= 48 && i <= 57
        ? i - 48
        : i >= 65 && i <= 70
          ? i - 55
          : i >= 97 && i <= 102
            ? i - 87
            : void r(!1, "Invalid character in " + t);
    }
    function o(t, e, r) {
      var i = s(t, r);
      return (r - 1 >= e && (i |= s(t, r - 1) << 4), i);
    }
    function a(t, e, i, n) {
      for (var s = 0, o = 0, a = Math.min(t.length, i), u = e; u < a; u++) {
        var c = t.charCodeAt(u) - 48;
        ((s *= n),
          (o = c >= 49 ? c - 49 + 10 : c >= 17 ? c - 17 + 10 : c),
          r(c >= 0 && o < n, "Invalid character"),
          (s += o));
      }
      return s;
    }
    function u(t, e) {
      ((t.words = e.words),
        (t.length = e.length),
        (t.negative = e.negative),
        (t.red = e.red));
    }
    if (
      ((n.isBN = function (t) {
        return (
          t instanceof n ||
          (null !== t &&
            "object" == typeof t &&
            t.constructor.wordSize === n.wordSize &&
            Array.isArray(t.words))
        );
      }),
      (n.max = function (t, e) {
        return t.cmp(e) > 0 ? t : e;
      }),
      (n.min = function (t, e) {
        return 0 > t.cmp(e) ? t : e;
      }),
      (n.prototype._init = function (t, e, i) {
        if ("number" == typeof t) return this._initNumber(t, e, i);
        if ("object" == typeof t) return this._initArray(t, e, i);
        ("hex" === e && (e = 16), r(e === (0 | e) && e >= 2 && e <= 36));
        var n = 0;
        ("-" === (t = t.toString().replace(/\s+/g, ""))[0] &&
          (n++, (this.negative = 1)),
          n < t.length &&
            (16 === e
              ? this._parseHex(t, n, i)
              : (this._parseBase(t, e, n),
                "le" === i && this._initArray(this.toArray(), e, i))));
      }),
      (n.prototype._initNumber = function (t, e, i) {
        (t < 0 && ((this.negative = 1), (t = -t)),
          t < 0x4000000
            ? ((this.words = [0x3ffffff & t]), (this.length = 1))
            : t < 0x10000000000000
              ? ((this.words = [0x3ffffff & t, (t / 0x4000000) & 0x3ffffff]),
                (this.length = 2))
              : (r(t < 0x20000000000000),
                (this.words = [0x3ffffff & t, (t / 0x4000000) & 0x3ffffff, 1]),
                (this.length = 3)),
          "le" === i && this._initArray(this.toArray(), e, i));
      }),
      (n.prototype._initArray = function (t, e, i) {
        if ((r("number" == typeof t.length), t.length <= 0))
          return ((this.words = [0]), (this.length = 1), this);
        ((this.length = Math.ceil(t.length / 3)),
          (this.words = Array(this.length)));
        for (var n, s, o = 0; o < this.length; o++) this.words[o] = 0;
        var a = 0;
        if ("be" === i)
          for (o = t.length - 1, n = 0; o >= 0; o -= 3)
            ((s = t[o] | (t[o - 1] << 8) | (t[o - 2] << 16)),
              (this.words[n] |= (s << a) & 0x3ffffff),
              (this.words[n + 1] = (s >>> (26 - a)) & 0x3ffffff),
              (a += 24) >= 26 && ((a -= 26), n++));
        else if ("le" === i)
          for (o = 0, n = 0; o < t.length; o += 3)
            ((s = t[o] | (t[o + 1] << 8) | (t[o + 2] << 16)),
              (this.words[n] |= (s << a) & 0x3ffffff),
              (this.words[n + 1] = (s >>> (26 - a)) & 0x3ffffff),
              (a += 24) >= 26 && ((a -= 26), n++));
        return this._strip();
      }),
      (n.prototype._parseHex = function (t, e, r) {
        ((this.length = Math.ceil((t.length - e) / 6)),
          (this.words = Array(this.length)));
        for (var i, n = 0; n < this.length; n++) this.words[n] = 0;
        var s = 0,
          a = 0;
        if ("be" === r)
          for (n = t.length - 1; n >= e; n -= 2)
            ((i = o(t, e, n) << s),
              (this.words[a] |= 0x3ffffff & i),
              s >= 18
                ? ((s -= 18), (a += 1), (this.words[a] |= i >>> 26))
                : (s += 8));
        else
          for (n = (t.length - e) % 2 == 0 ? e + 1 : e; n < t.length; n += 2)
            ((i = o(t, e, n) << s),
              (this.words[a] |= 0x3ffffff & i),
              s >= 18
                ? ((s -= 18), (a += 1), (this.words[a] |= i >>> 26))
                : (s += 8));
        this._strip();
      }),
      (n.prototype._parseBase = function (t, e, r) {
        ((this.words = [0]), (this.length = 1));
        for (var i = 0, n = 1; n <= 0x3ffffff; n *= e) i++;
        (i--, (n = (n / e) | 0));
        for (
          var s = t.length - r,
            o = s % i,
            u = Math.min(s, s - o) + r,
            c = 0,
            l = r;
          l < u;
          l += i
        )
          ((c = a(t, l, l + i, e)),
            this.imuln(n),
            this.words[0] + c < 0x4000000
              ? (this.words[0] += c)
              : this._iaddn(c));
        if (0 !== o) {
          var h = 1;
          for (c = a(t, l, t.length, e), l = 0; l < o; l++) h *= e;
          (this.imuln(h),
            this.words[0] + c < 0x4000000
              ? (this.words[0] += c)
              : this._iaddn(c));
        }
        this._strip();
      }),
      (n.prototype.copy = function (t) {
        t.words = Array(this.length);
        for (var e = 0; e < this.length; e++) t.words[e] = this.words[e];
        ((t.length = this.length),
          (t.negative = this.negative),
          (t.red = this.red));
      }),
      (n.prototype._move = function (t) {
        u(t, this);
      }),
      (n.prototype.clone = function () {
        var t = new n(null);
        return (this.copy(t), t);
      }),
      (n.prototype._expand = function (t) {
        for (; this.length < t; ) this.words[this.length++] = 0;
        return this;
      }),
      (n.prototype._strip = function () {
        for (; this.length > 1 && 0 === this.words[this.length - 1]; )
          this.length--;
        return this._normSign();
      }),
      (n.prototype._normSign = function () {
        return (
          1 === this.length && 0 === this.words[0] && (this.negative = 0),
          this
        );
      }),
      "u" > typeof Symbol && "function" == typeof Symbol.for)
    )
      try {
        n.prototype[Symbol.for("nodejs.util.inspect.custom")] = c;
      } catch (t) {
        n.prototype.inspect = c;
      }
    else n.prototype.inspect = c;
    function c() {
      return (this.red ? "<BN-R: " : "<BN: ") + this.toString(16) + ">";
    }
    var l,
      h = [
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
      f = [
        0, 0, 25, 16, 12, 11, 10, 9, 8, 8, 7, 7, 7, 7, 6, 6, 6, 6, 6, 6, 6, 5,
        5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5,
      ],
      d = [
        0, 0, 0x2000000, 0x290d741, 0x1000000, 0x2e90edd, 0x39aa400, 0x267bf47,
        0x1000000, 0x290d741, 1e7, 0x12959c3, 0x222c000, 0x3bd7765, 7529536,
        0xadcea1, 0x1000000, 0x1704f61, 0x206fc40, 0x2cddcf9, 64e6, 4084101,
        5153632, 6436343, 7962624, 9765625, 0xb54ba0, 0xdaf26b, 0x1069c00,
        0x138f9ad, 243e5, 0x1b4d89f, 0x2000000, 0x25528a1, 0x2b54a20, 0x3216b93,
        0x39aa400,
      ];
    function p(t, e, r) {
      r.negative = e.negative ^ t.negative;
      var i = (t.length + e.length) | 0;
      ((r.length = i), (i = (i - 1) | 0));
      var n = 0 | t.words[0],
        s = 0 | e.words[0],
        o = n * s,
        a = 0x3ffffff & o,
        u = (o / 0x4000000) | 0;
      r.words[0] = a;
      for (var c = 1; c < i; c++) {
        for (
          var l = u >>> 26,
            h = 0x3ffffff & u,
            f = Math.min(c, e.length - 1),
            d = Math.max(0, c - t.length + 1);
          d <= f;
          d++
        ) {
          var p = (c - d) | 0;
          ((l +=
            ((o = (n = 0 | t.words[p]) * (s = 0 | e.words[d]) + h) /
              0x4000000) |
            0),
            (h = 0x3ffffff & o));
        }
        ((r.words[c] = 0 | h), (u = 0 | l));
      }
      return (0 !== u ? (r.words[c] = 0 | u) : r.length--, r._strip());
    }
    ((n.prototype.toString = function (t, e) {
      if (((e = 0 | e || 1), 16 === (t = t || 10) || "hex" === t)) {
        for (var i = "", n = 0, s = 0, o = 0; o < this.length; o++) {
          var a = this.words[o],
            u = (((a << n) | s) & 0xffffff).toString(16);
          ((s = (a >>> (24 - n)) & 0xffffff),
            (n += 2) >= 26 && ((n -= 26), o--),
            (i =
              0 !== s || o !== this.length - 1
                ? h[6 - u.length] + u + i
                : u + i));
        }
        for (0 !== s && (i = s.toString(16) + i); i.length % e != 0; )
          i = "0" + i;
        return (0 !== this.negative && (i = "-" + i), i);
      }
      if (t === (0 | t) && t >= 2 && t <= 36) {
        var c = f[t],
          l = d[t];
        i = "";
        var p = this.clone();
        for (p.negative = 0; !p.isZero(); ) {
          var g = p.modrn(l).toString(t);
          i = (p = p.idivn(l)).isZero() ? g + i : h[c - g.length] + g + i;
        }
        for (this.isZero() && (i = "0" + i); i.length % e != 0; ) i = "0" + i;
        return (0 !== this.negative && (i = "-" + i), i);
      }
      r(!1, "Base should be between 2 and 36");
    }),
      (n.prototype.toNumber = function () {
        var t = this.words[0];
        return (
          2 === this.length
            ? (t += 0x4000000 * this.words[1])
            : 3 === this.length && 1 === this.words[2]
              ? (t += 0x10000000000000 + 0x4000000 * this.words[1])
              : this.length > 2 &&
                r(!1, "Number can only safely store up to 53 bits"),
          0 !== this.negative ? -t : t
        );
      }),
      (n.prototype.toJSON = function () {
        return this.toString(16, 2);
      }),
      l &&
        (n.prototype.toBuffer = function (t, e) {
          return this.toArrayLike(l, t, e);
        }),
      (n.prototype.toArray = function (t, e) {
        return this.toArrayLike(Array, t, e);
      }),
      (n.prototype.toArrayLike = function (t, e, i) {
        this._strip();
        var n = this.byteLength(),
          s = i || Math.max(1, n);
        (r(n <= s, "byte array longer than desired length"),
          r(s > 0, "Requested array length <= 0"));
        var o = t.allocUnsafe ? t.allocUnsafe(s) : new t(s);
        return (this["_toArrayLike" + ("le" === e ? "LE" : "BE")](o, n), o);
      }),
      (n.prototype._toArrayLikeLE = function (t, e) {
        for (var r = 0, i = 0, n = 0, s = 0; n < this.length; n++) {
          var o = (this.words[n] << s) | i;
          ((t[r++] = 255 & o),
            r < t.length && (t[r++] = (o >> 8) & 255),
            r < t.length && (t[r++] = (o >> 16) & 255),
            6 === s
              ? (r < t.length && (t[r++] = (o >> 24) & 255), (i = 0), (s = 0))
              : ((i = o >>> 24), (s += 2)));
        }
        if (r < t.length) for (t[r++] = i; r < t.length; ) t[r++] = 0;
      }),
      (n.prototype._toArrayLikeBE = function (t, e) {
        for (var r = t.length - 1, i = 0, n = 0, s = 0; n < this.length; n++) {
          var o = (this.words[n] << s) | i;
          ((t[r--] = 255 & o),
            r >= 0 && (t[r--] = (o >> 8) & 255),
            r >= 0 && (t[r--] = (o >> 16) & 255),
            6 === s
              ? (r >= 0 && (t[r--] = (o >> 24) & 255), (i = 0), (s = 0))
              : ((i = o >>> 24), (s += 2)));
        }
        if (r >= 0) for (t[r--] = i; r >= 0; ) t[r--] = 0;
      }),
      Math.clz32
        ? (n.prototype._countBits = function (t) {
            return 32 - Math.clz32(t);
          })
        : (n.prototype._countBits = function (t) {
            var e = t,
              r = 0;
            return (
              e >= 4096 && ((r += 13), (e >>>= 13)),
              e >= 64 && ((r += 7), (e >>>= 7)),
              e >= 8 && ((r += 4), (e >>>= 4)),
              e >= 2 && ((r += 2), (e >>>= 2)),
              r + e
            );
          }),
      (n.prototype._zeroBits = function (t) {
        if (0 === t) return 26;
        var e = t,
          r = 0;
        return (
          (8191 & e) == 0 && ((r += 13), (e >>>= 13)),
          (127 & e) == 0 && ((r += 7), (e >>>= 7)),
          (15 & e) == 0 && ((r += 4), (e >>>= 4)),
          (3 & e) == 0 && ((r += 2), (e >>>= 2)),
          (1 & e) == 0 && r++,
          r
        );
      }),
      (n.prototype.bitLength = function () {
        var t = this.words[this.length - 1],
          e = this._countBits(t);
        return (this.length - 1) * 26 + e;
      }),
      (n.prototype.zeroBits = function () {
        if (this.isZero()) return 0;
        for (var t = 0, e = 0; e < this.length; e++) {
          var r = this._zeroBits(this.words[e]);
          if (((t += r), 26 !== r)) break;
        }
        return t;
      }),
      (n.prototype.byteLength = function () {
        return Math.ceil(this.bitLength() / 8);
      }),
      (n.prototype.toTwos = function (t) {
        return 0 !== this.negative
          ? this.abs().inotn(t).iaddn(1)
          : this.clone();
      }),
      (n.prototype.fromTwos = function (t) {
        return this.testn(t - 1) ? this.notn(t).iaddn(1).ineg() : this.clone();
      }),
      (n.prototype.isNeg = function () {
        return 0 !== this.negative;
      }),
      (n.prototype.neg = function () {
        return this.clone().ineg();
      }),
      (n.prototype.ineg = function () {
        return (this.isZero() || (this.negative ^= 1), this);
      }),
      (n.prototype.iuor = function (t) {
        for (; this.length < t.length; ) this.words[this.length++] = 0;
        for (var e = 0; e < t.length; e++)
          this.words[e] = this.words[e] | t.words[e];
        return this._strip();
      }),
      (n.prototype.ior = function (t) {
        return (r((this.negative | t.negative) == 0), this.iuor(t));
      }),
      (n.prototype.or = function (t) {
        return this.length > t.length
          ? this.clone().ior(t)
          : t.clone().ior(this);
      }),
      (n.prototype.uor = function (t) {
        return this.length > t.length
          ? this.clone().iuor(t)
          : t.clone().iuor(this);
      }),
      (n.prototype.iuand = function (t) {
        var e;
        e = this.length > t.length ? t : this;
        for (var r = 0; r < e.length; r++)
          this.words[r] = this.words[r] & t.words[r];
        return ((this.length = e.length), this._strip());
      }),
      (n.prototype.iand = function (t) {
        return (r((this.negative | t.negative) == 0), this.iuand(t));
      }),
      (n.prototype.and = function (t) {
        return this.length > t.length
          ? this.clone().iand(t)
          : t.clone().iand(this);
      }),
      (n.prototype.uand = function (t) {
        return this.length > t.length
          ? this.clone().iuand(t)
          : t.clone().iuand(this);
      }),
      (n.prototype.iuxor = function (t) {
        this.length > t.length ? ((e = this), (r = t)) : ((e = t), (r = this));
        for (var e, r, i = 0; i < r.length; i++)
          this.words[i] = e.words[i] ^ r.words[i];
        if (this !== e) for (; i < e.length; i++) this.words[i] = e.words[i];
        return ((this.length = e.length), this._strip());
      }),
      (n.prototype.ixor = function (t) {
        return (r((this.negative | t.negative) == 0), this.iuxor(t));
      }),
      (n.prototype.xor = function (t) {
        return this.length > t.length
          ? this.clone().ixor(t)
          : t.clone().ixor(this);
      }),
      (n.prototype.uxor = function (t) {
        return this.length > t.length
          ? this.clone().iuxor(t)
          : t.clone().iuxor(this);
      }),
      (n.prototype.inotn = function (t) {
        r("number" == typeof t && t >= 0);
        var e = 0 | Math.ceil(t / 26),
          i = t % 26;
        (this._expand(e), i > 0 && e--);
        for (var n = 0; n < e; n++) this.words[n] = 0x3ffffff & ~this.words[n];
        for (
          i > 0 &&
          ((this.words[n] = ~this.words[n] & (0x3ffffff >> (26 - i))), n++);
          n < this.length;
          n++
        )
          this.words[n] = 0;
        return this._strip();
      }),
      (n.prototype.notn = function (t) {
        return this.clone().inotn(t);
      }),
      (n.prototype.setn = function (t, e) {
        r("number" == typeof t && t >= 0);
        var i = (t / 26) | 0,
          n = t % 26;
        return (
          this._expand(i + 1),
          e
            ? (this.words[i] = this.words[i] | (1 << n))
            : (this.words[i] = this.words[i] & ~(1 << n)),
          this._strip()
        );
      }),
      (n.prototype.iadd = function (t) {
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
        this.length > t.length ? ((r = this), (i = t)) : ((r = t), (i = this));
        for (var e, r, i, n = 0, s = 0; s < i.length; s++)
          ((e = (0 | r.words[s]) + (0 | i.words[s]) + n),
            (this.words[s] = 0x3ffffff & e),
            (n = e >>> 26));
        for (; 0 !== n && s < r.length; s++)
          ((e = (0 | r.words[s]) + n),
            (this.words[s] = 0x3ffffff & e),
            (n = e >>> 26));
        if (((this.length = r.length), 0 !== n))
          ((this.words[this.length] = n), this.length++);
        else if (r !== this)
          for (; s < r.length; s++) this.words[s] = r.words[s];
        return this;
      }),
      (n.prototype.add = function (t) {
        var e;
        return 0 !== t.negative && 0 === this.negative
          ? ((t.negative = 0), (e = this.sub(t)), (t.negative ^= 1), e)
          : 0 === t.negative && 0 !== this.negative
            ? ((this.negative = 0), (e = t.sub(this)), (this.negative = 1), e)
            : this.length > t.length
              ? this.clone().iadd(t)
              : t.clone().iadd(this);
      }),
      (n.prototype.isub = function (t) {
        if (0 !== t.negative) {
          t.negative = 0;
          var e,
            r,
            i = this.iadd(t);
          return ((t.negative = 1), i._normSign());
        }
        if (0 !== this.negative)
          return (
            (this.negative = 0),
            this.iadd(t),
            (this.negative = 1),
            this._normSign()
          );
        var n = this.cmp(t);
        if (0 === n)
          return (
            (this.negative = 0),
            (this.length = 1),
            (this.words[0] = 0),
            this
          );
        n > 0 ? ((e = this), (r = t)) : ((e = t), (r = this));
        for (var s = 0, o = 0; o < r.length; o++)
          ((s = (i = (0 | e.words[o]) - (0 | r.words[o]) + s) >> 26),
            (this.words[o] = 0x3ffffff & i));
        for (; 0 !== s && o < e.length; o++)
          ((s = (i = (0 | e.words[o]) + s) >> 26),
            (this.words[o] = 0x3ffffff & i));
        if (0 === s && o < e.length && e !== this)
          for (; o < e.length; o++) this.words[o] = e.words[o];
        return (
          (this.length = Math.max(this.length, o)),
          e !== this && (this.negative = 1),
          this._strip()
        );
      }),
      (n.prototype.sub = function (t) {
        return this.clone().isub(t);
      }));
    var g = function (t, e, r) {
      var i,
        n,
        s,
        o = t.words,
        a = e.words,
        u = r.words,
        c = 0,
        l = 0 | o[0],
        h = 8191 & l,
        f = l >>> 13,
        d = 0 | o[1],
        p = 8191 & d,
        g = d >>> 13,
        m = 0 | o[2],
        y = 8191 & m,
        b = m >>> 13,
        w = 0 | o[3],
        k = 8191 & w,
        v = w >>> 13,
        S = 0 | o[4],
        _ = 8191 & S,
        I = S >>> 13,
        A = 0 | o[5],
        E = 8191 & A,
        x = A >>> 13,
        B = 0 | o[6],
        M = 8191 & B,
        P = B >>> 13,
        T = 0 | o[7],
        R = 8191 & T,
        L = T >>> 13,
        C = 0 | o[8],
        O = 8191 & C,
        U = C >>> 13,
        N = 0 | o[9],
        z = 8191 & N,
        W = N >>> 13,
        K = 0 | a[0],
        q = 8191 & K,
        D = K >>> 13,
        $ = 0 | a[1],
        F = 8191 & $,
        V = $ >>> 13,
        j = 0 | a[2],
        H = 8191 & j,
        J = j >>> 13,
        G = 0 | a[3],
        Y = 8191 & G,
        Z = G >>> 13,
        X = 0 | a[4],
        Q = 8191 & X,
        tt = X >>> 13,
        te = 0 | a[5],
        tr = 8191 & te,
        ti = te >>> 13,
        tn = 0 | a[6],
        ts = 8191 & tn,
        to = tn >>> 13,
        ta = 0 | a[7],
        tu = 8191 & ta,
        tc = ta >>> 13,
        tl = 0 | a[8],
        th = 8191 & tl,
        tf = tl >>> 13,
        td = 0 | a[9],
        tp = 8191 & td,
        tg = td >>> 13;
      ((r.negative = t.negative ^ e.negative),
        (r.length = 19),
        (i = Math.imul(h, q)));
      var tm =
        (((c + i) | 0) +
          ((8191 & (n = ((n = Math.imul(h, D)) + Math.imul(f, q)) | 0)) <<
            13)) |
        0;
      ((c = ((((s = Math.imul(f, D)) + (n >>> 13)) | 0) + (tm >>> 26)) | 0),
        (tm &= 0x3ffffff),
        (i = Math.imul(p, q)),
        (n = ((n = Math.imul(p, D)) + Math.imul(g, q)) | 0),
        (s = Math.imul(g, D)),
        (i = (i + Math.imul(h, F)) | 0));
      var ty =
        (((c + i) | 0) +
          ((8191 &
            (n = ((n = (n + Math.imul(h, V)) | 0) + Math.imul(f, F)) | 0)) <<
            13)) |
        0;
      ((c =
        ((((s = (s + Math.imul(f, V)) | 0) + (n >>> 13)) | 0) + (ty >>> 26)) |
        0),
        (ty &= 0x3ffffff),
        (i = Math.imul(y, q)),
        (n = ((n = Math.imul(y, D)) + Math.imul(b, q)) | 0),
        (s = Math.imul(b, D)),
        (i = (i + Math.imul(p, F)) | 0),
        (n = ((n = (n + Math.imul(p, V)) | 0) + Math.imul(g, F)) | 0),
        (s = (s + Math.imul(g, V)) | 0),
        (i = (i + Math.imul(h, H)) | 0));
      var tb =
        (((c + i) | 0) +
          ((8191 &
            (n = ((n = (n + Math.imul(h, J)) | 0) + Math.imul(f, H)) | 0)) <<
            13)) |
        0;
      ((c =
        ((((s = (s + Math.imul(f, J)) | 0) + (n >>> 13)) | 0) + (tb >>> 26)) |
        0),
        (tb &= 0x3ffffff),
        (i = Math.imul(k, q)),
        (n = ((n = Math.imul(k, D)) + Math.imul(v, q)) | 0),
        (s = Math.imul(v, D)),
        (i = (i + Math.imul(y, F)) | 0),
        (n = ((n = (n + Math.imul(y, V)) | 0) + Math.imul(b, F)) | 0),
        (s = (s + Math.imul(b, V)) | 0),
        (i = (i + Math.imul(p, H)) | 0),
        (n = ((n = (n + Math.imul(p, J)) | 0) + Math.imul(g, H)) | 0),
        (s = (s + Math.imul(g, J)) | 0),
        (i = (i + Math.imul(h, Y)) | 0));
      var tw =
        (((c + i) | 0) +
          ((8191 &
            (n = ((n = (n + Math.imul(h, Z)) | 0) + Math.imul(f, Y)) | 0)) <<
            13)) |
        0;
      ((c =
        ((((s = (s + Math.imul(f, Z)) | 0) + (n >>> 13)) | 0) + (tw >>> 26)) |
        0),
        (tw &= 0x3ffffff),
        (i = Math.imul(_, q)),
        (n = ((n = Math.imul(_, D)) + Math.imul(I, q)) | 0),
        (s = Math.imul(I, D)),
        (i = (i + Math.imul(k, F)) | 0),
        (n = ((n = (n + Math.imul(k, V)) | 0) + Math.imul(v, F)) | 0),
        (s = (s + Math.imul(v, V)) | 0),
        (i = (i + Math.imul(y, H)) | 0),
        (n = ((n = (n + Math.imul(y, J)) | 0) + Math.imul(b, H)) | 0),
        (s = (s + Math.imul(b, J)) | 0),
        (i = (i + Math.imul(p, Y)) | 0),
        (n = ((n = (n + Math.imul(p, Z)) | 0) + Math.imul(g, Y)) | 0),
        (s = (s + Math.imul(g, Z)) | 0),
        (i = (i + Math.imul(h, Q)) | 0));
      var tk =
        (((c + i) | 0) +
          ((8191 &
            (n = ((n = (n + Math.imul(h, tt)) | 0) + Math.imul(f, Q)) | 0)) <<
            13)) |
        0;
      ((c =
        ((((s = (s + Math.imul(f, tt)) | 0) + (n >>> 13)) | 0) + (tk >>> 26)) |
        0),
        (tk &= 0x3ffffff),
        (i = Math.imul(E, q)),
        (n = ((n = Math.imul(E, D)) + Math.imul(x, q)) | 0),
        (s = Math.imul(x, D)),
        (i = (i + Math.imul(_, F)) | 0),
        (n = ((n = (n + Math.imul(_, V)) | 0) + Math.imul(I, F)) | 0),
        (s = (s + Math.imul(I, V)) | 0),
        (i = (i + Math.imul(k, H)) | 0),
        (n = ((n = (n + Math.imul(k, J)) | 0) + Math.imul(v, H)) | 0),
        (s = (s + Math.imul(v, J)) | 0),
        (i = (i + Math.imul(y, Y)) | 0),
        (n = ((n = (n + Math.imul(y, Z)) | 0) + Math.imul(b, Y)) | 0),
        (s = (s + Math.imul(b, Z)) | 0),
        (i = (i + Math.imul(p, Q)) | 0),
        (n = ((n = (n + Math.imul(p, tt)) | 0) + Math.imul(g, Q)) | 0),
        (s = (s + Math.imul(g, tt)) | 0),
        (i = (i + Math.imul(h, tr)) | 0));
      var tv =
        (((c + i) | 0) +
          ((8191 &
            (n = ((n = (n + Math.imul(h, ti)) | 0) + Math.imul(f, tr)) | 0)) <<
            13)) |
        0;
      ((c =
        ((((s = (s + Math.imul(f, ti)) | 0) + (n >>> 13)) | 0) + (tv >>> 26)) |
        0),
        (tv &= 0x3ffffff),
        (i = Math.imul(M, q)),
        (n = ((n = Math.imul(M, D)) + Math.imul(P, q)) | 0),
        (s = Math.imul(P, D)),
        (i = (i + Math.imul(E, F)) | 0),
        (n = ((n = (n + Math.imul(E, V)) | 0) + Math.imul(x, F)) | 0),
        (s = (s + Math.imul(x, V)) | 0),
        (i = (i + Math.imul(_, H)) | 0),
        (n = ((n = (n + Math.imul(_, J)) | 0) + Math.imul(I, H)) | 0),
        (s = (s + Math.imul(I, J)) | 0),
        (i = (i + Math.imul(k, Y)) | 0),
        (n = ((n = (n + Math.imul(k, Z)) | 0) + Math.imul(v, Y)) | 0),
        (s = (s + Math.imul(v, Z)) | 0),
        (i = (i + Math.imul(y, Q)) | 0),
        (n = ((n = (n + Math.imul(y, tt)) | 0) + Math.imul(b, Q)) | 0),
        (s = (s + Math.imul(b, tt)) | 0),
        (i = (i + Math.imul(p, tr)) | 0),
        (n = ((n = (n + Math.imul(p, ti)) | 0) + Math.imul(g, tr)) | 0),
        (s = (s + Math.imul(g, ti)) | 0),
        (i = (i + Math.imul(h, ts)) | 0));
      var tS =
        (((c + i) | 0) +
          ((8191 &
            (n = ((n = (n + Math.imul(h, to)) | 0) + Math.imul(f, ts)) | 0)) <<
            13)) |
        0;
      ((c =
        ((((s = (s + Math.imul(f, to)) | 0) + (n >>> 13)) | 0) + (tS >>> 26)) |
        0),
        (tS &= 0x3ffffff),
        (i = Math.imul(R, q)),
        (n = ((n = Math.imul(R, D)) + Math.imul(L, q)) | 0),
        (s = Math.imul(L, D)),
        (i = (i + Math.imul(M, F)) | 0),
        (n = ((n = (n + Math.imul(M, V)) | 0) + Math.imul(P, F)) | 0),
        (s = (s + Math.imul(P, V)) | 0),
        (i = (i + Math.imul(E, H)) | 0),
        (n = ((n = (n + Math.imul(E, J)) | 0) + Math.imul(x, H)) | 0),
        (s = (s + Math.imul(x, J)) | 0),
        (i = (i + Math.imul(_, Y)) | 0),
        (n = ((n = (n + Math.imul(_, Z)) | 0) + Math.imul(I, Y)) | 0),
        (s = (s + Math.imul(I, Z)) | 0),
        (i = (i + Math.imul(k, Q)) | 0),
        (n = ((n = (n + Math.imul(k, tt)) | 0) + Math.imul(v, Q)) | 0),
        (s = (s + Math.imul(v, tt)) | 0),
        (i = (i + Math.imul(y, tr)) | 0),
        (n = ((n = (n + Math.imul(y, ti)) | 0) + Math.imul(b, tr)) | 0),
        (s = (s + Math.imul(b, ti)) | 0),
        (i = (i + Math.imul(p, ts)) | 0),
        (n = ((n = (n + Math.imul(p, to)) | 0) + Math.imul(g, ts)) | 0),
        (s = (s + Math.imul(g, to)) | 0),
        (i = (i + Math.imul(h, tu)) | 0));
      var t_ =
        (((c + i) | 0) +
          ((8191 &
            (n = ((n = (n + Math.imul(h, tc)) | 0) + Math.imul(f, tu)) | 0)) <<
            13)) |
        0;
      ((c =
        ((((s = (s + Math.imul(f, tc)) | 0) + (n >>> 13)) | 0) + (t_ >>> 26)) |
        0),
        (t_ &= 0x3ffffff),
        (i = Math.imul(O, q)),
        (n = ((n = Math.imul(O, D)) + Math.imul(U, q)) | 0),
        (s = Math.imul(U, D)),
        (i = (i + Math.imul(R, F)) | 0),
        (n = ((n = (n + Math.imul(R, V)) | 0) + Math.imul(L, F)) | 0),
        (s = (s + Math.imul(L, V)) | 0),
        (i = (i + Math.imul(M, H)) | 0),
        (n = ((n = (n + Math.imul(M, J)) | 0) + Math.imul(P, H)) | 0),
        (s = (s + Math.imul(P, J)) | 0),
        (i = (i + Math.imul(E, Y)) | 0),
        (n = ((n = (n + Math.imul(E, Z)) | 0) + Math.imul(x, Y)) | 0),
        (s = (s + Math.imul(x, Z)) | 0),
        (i = (i + Math.imul(_, Q)) | 0),
        (n = ((n = (n + Math.imul(_, tt)) | 0) + Math.imul(I, Q)) | 0),
        (s = (s + Math.imul(I, tt)) | 0),
        (i = (i + Math.imul(k, tr)) | 0),
        (n = ((n = (n + Math.imul(k, ti)) | 0) + Math.imul(v, tr)) | 0),
        (s = (s + Math.imul(v, ti)) | 0),
        (i = (i + Math.imul(y, ts)) | 0),
        (n = ((n = (n + Math.imul(y, to)) | 0) + Math.imul(b, ts)) | 0),
        (s = (s + Math.imul(b, to)) | 0),
        (i = (i + Math.imul(p, tu)) | 0),
        (n = ((n = (n + Math.imul(p, tc)) | 0) + Math.imul(g, tu)) | 0),
        (s = (s + Math.imul(g, tc)) | 0),
        (i = (i + Math.imul(h, th)) | 0));
      var tI =
        (((c + i) | 0) +
          ((8191 &
            (n = ((n = (n + Math.imul(h, tf)) | 0) + Math.imul(f, th)) | 0)) <<
            13)) |
        0;
      ((c =
        ((((s = (s + Math.imul(f, tf)) | 0) + (n >>> 13)) | 0) + (tI >>> 26)) |
        0),
        (tI &= 0x3ffffff),
        (i = Math.imul(z, q)),
        (n = ((n = Math.imul(z, D)) + Math.imul(W, q)) | 0),
        (s = Math.imul(W, D)),
        (i = (i + Math.imul(O, F)) | 0),
        (n = ((n = (n + Math.imul(O, V)) | 0) + Math.imul(U, F)) | 0),
        (s = (s + Math.imul(U, V)) | 0),
        (i = (i + Math.imul(R, H)) | 0),
        (n = ((n = (n + Math.imul(R, J)) | 0) + Math.imul(L, H)) | 0),
        (s = (s + Math.imul(L, J)) | 0),
        (i = (i + Math.imul(M, Y)) | 0),
        (n = ((n = (n + Math.imul(M, Z)) | 0) + Math.imul(P, Y)) | 0),
        (s = (s + Math.imul(P, Z)) | 0),
        (i = (i + Math.imul(E, Q)) | 0),
        (n = ((n = (n + Math.imul(E, tt)) | 0) + Math.imul(x, Q)) | 0),
        (s = (s + Math.imul(x, tt)) | 0),
        (i = (i + Math.imul(_, tr)) | 0),
        (n = ((n = (n + Math.imul(_, ti)) | 0) + Math.imul(I, tr)) | 0),
        (s = (s + Math.imul(I, ti)) | 0),
        (i = (i + Math.imul(k, ts)) | 0),
        (n = ((n = (n + Math.imul(k, to)) | 0) + Math.imul(v, ts)) | 0),
        (s = (s + Math.imul(v, to)) | 0),
        (i = (i + Math.imul(y, tu)) | 0),
        (n = ((n = (n + Math.imul(y, tc)) | 0) + Math.imul(b, tu)) | 0),
        (s = (s + Math.imul(b, tc)) | 0),
        (i = (i + Math.imul(p, th)) | 0),
        (n = ((n = (n + Math.imul(p, tf)) | 0) + Math.imul(g, th)) | 0),
        (s = (s + Math.imul(g, tf)) | 0),
        (i = (i + Math.imul(h, tp)) | 0));
      var tA =
        (((c + i) | 0) +
          ((8191 &
            (n = ((n = (n + Math.imul(h, tg)) | 0) + Math.imul(f, tp)) | 0)) <<
            13)) |
        0;
      ((c =
        ((((s = (s + Math.imul(f, tg)) | 0) + (n >>> 13)) | 0) + (tA >>> 26)) |
        0),
        (tA &= 0x3ffffff),
        (i = Math.imul(z, F)),
        (n = ((n = Math.imul(z, V)) + Math.imul(W, F)) | 0),
        (s = Math.imul(W, V)),
        (i = (i + Math.imul(O, H)) | 0),
        (n = ((n = (n + Math.imul(O, J)) | 0) + Math.imul(U, H)) | 0),
        (s = (s + Math.imul(U, J)) | 0),
        (i = (i + Math.imul(R, Y)) | 0),
        (n = ((n = (n + Math.imul(R, Z)) | 0) + Math.imul(L, Y)) | 0),
        (s = (s + Math.imul(L, Z)) | 0),
        (i = (i + Math.imul(M, Q)) | 0),
        (n = ((n = (n + Math.imul(M, tt)) | 0) + Math.imul(P, Q)) | 0),
        (s = (s + Math.imul(P, tt)) | 0),
        (i = (i + Math.imul(E, tr)) | 0),
        (n = ((n = (n + Math.imul(E, ti)) | 0) + Math.imul(x, tr)) | 0),
        (s = (s + Math.imul(x, ti)) | 0),
        (i = (i + Math.imul(_, ts)) | 0),
        (n = ((n = (n + Math.imul(_, to)) | 0) + Math.imul(I, ts)) | 0),
        (s = (s + Math.imul(I, to)) | 0),
        (i = (i + Math.imul(k, tu)) | 0),
        (n = ((n = (n + Math.imul(k, tc)) | 0) + Math.imul(v, tu)) | 0),
        (s = (s + Math.imul(v, tc)) | 0),
        (i = (i + Math.imul(y, th)) | 0),
        (n = ((n = (n + Math.imul(y, tf)) | 0) + Math.imul(b, th)) | 0),
        (s = (s + Math.imul(b, tf)) | 0),
        (i = (i + Math.imul(p, tp)) | 0));
      var tE =
        (((c + i) | 0) +
          ((8191 &
            (n = ((n = (n + Math.imul(p, tg)) | 0) + Math.imul(g, tp)) | 0)) <<
            13)) |
        0;
      ((c =
        ((((s = (s + Math.imul(g, tg)) | 0) + (n >>> 13)) | 0) + (tE >>> 26)) |
        0),
        (tE &= 0x3ffffff),
        (i = Math.imul(z, H)),
        (n = ((n = Math.imul(z, J)) + Math.imul(W, H)) | 0),
        (s = Math.imul(W, J)),
        (i = (i + Math.imul(O, Y)) | 0),
        (n = ((n = (n + Math.imul(O, Z)) | 0) + Math.imul(U, Y)) | 0),
        (s = (s + Math.imul(U, Z)) | 0),
        (i = (i + Math.imul(R, Q)) | 0),
        (n = ((n = (n + Math.imul(R, tt)) | 0) + Math.imul(L, Q)) | 0),
        (s = (s + Math.imul(L, tt)) | 0),
        (i = (i + Math.imul(M, tr)) | 0),
        (n = ((n = (n + Math.imul(M, ti)) | 0) + Math.imul(P, tr)) | 0),
        (s = (s + Math.imul(P, ti)) | 0),
        (i = (i + Math.imul(E, ts)) | 0),
        (n = ((n = (n + Math.imul(E, to)) | 0) + Math.imul(x, ts)) | 0),
        (s = (s + Math.imul(x, to)) | 0),
        (i = (i + Math.imul(_, tu)) | 0),
        (n = ((n = (n + Math.imul(_, tc)) | 0) + Math.imul(I, tu)) | 0),
        (s = (s + Math.imul(I, tc)) | 0),
        (i = (i + Math.imul(k, th)) | 0),
        (n = ((n = (n + Math.imul(k, tf)) | 0) + Math.imul(v, th)) | 0),
        (s = (s + Math.imul(v, tf)) | 0),
        (i = (i + Math.imul(y, tp)) | 0));
      var tx =
        (((c + i) | 0) +
          ((8191 &
            (n = ((n = (n + Math.imul(y, tg)) | 0) + Math.imul(b, tp)) | 0)) <<
            13)) |
        0;
      ((c =
        ((((s = (s + Math.imul(b, tg)) | 0) + (n >>> 13)) | 0) + (tx >>> 26)) |
        0),
        (tx &= 0x3ffffff),
        (i = Math.imul(z, Y)),
        (n = ((n = Math.imul(z, Z)) + Math.imul(W, Y)) | 0),
        (s = Math.imul(W, Z)),
        (i = (i + Math.imul(O, Q)) | 0),
        (n = ((n = (n + Math.imul(O, tt)) | 0) + Math.imul(U, Q)) | 0),
        (s = (s + Math.imul(U, tt)) | 0),
        (i = (i + Math.imul(R, tr)) | 0),
        (n = ((n = (n + Math.imul(R, ti)) | 0) + Math.imul(L, tr)) | 0),
        (s = (s + Math.imul(L, ti)) | 0),
        (i = (i + Math.imul(M, ts)) | 0),
        (n = ((n = (n + Math.imul(M, to)) | 0) + Math.imul(P, ts)) | 0),
        (s = (s + Math.imul(P, to)) | 0),
        (i = (i + Math.imul(E, tu)) | 0),
        (n = ((n = (n + Math.imul(E, tc)) | 0) + Math.imul(x, tu)) | 0),
        (s = (s + Math.imul(x, tc)) | 0),
        (i = (i + Math.imul(_, th)) | 0),
        (n = ((n = (n + Math.imul(_, tf)) | 0) + Math.imul(I, th)) | 0),
        (s = (s + Math.imul(I, tf)) | 0),
        (i = (i + Math.imul(k, tp)) | 0));
      var tB =
        (((c + i) | 0) +
          ((8191 &
            (n = ((n = (n + Math.imul(k, tg)) | 0) + Math.imul(v, tp)) | 0)) <<
            13)) |
        0;
      ((c =
        ((((s = (s + Math.imul(v, tg)) | 0) + (n >>> 13)) | 0) + (tB >>> 26)) |
        0),
        (tB &= 0x3ffffff),
        (i = Math.imul(z, Q)),
        (n = ((n = Math.imul(z, tt)) + Math.imul(W, Q)) | 0),
        (s = Math.imul(W, tt)),
        (i = (i + Math.imul(O, tr)) | 0),
        (n = ((n = (n + Math.imul(O, ti)) | 0) + Math.imul(U, tr)) | 0),
        (s = (s + Math.imul(U, ti)) | 0),
        (i = (i + Math.imul(R, ts)) | 0),
        (n = ((n = (n + Math.imul(R, to)) | 0) + Math.imul(L, ts)) | 0),
        (s = (s + Math.imul(L, to)) | 0),
        (i = (i + Math.imul(M, tu)) | 0),
        (n = ((n = (n + Math.imul(M, tc)) | 0) + Math.imul(P, tu)) | 0),
        (s = (s + Math.imul(P, tc)) | 0),
        (i = (i + Math.imul(E, th)) | 0),
        (n = ((n = (n + Math.imul(E, tf)) | 0) + Math.imul(x, th)) | 0),
        (s = (s + Math.imul(x, tf)) | 0),
        (i = (i + Math.imul(_, tp)) | 0));
      var tM =
        (((c + i) | 0) +
          ((8191 &
            (n = ((n = (n + Math.imul(_, tg)) | 0) + Math.imul(I, tp)) | 0)) <<
            13)) |
        0;
      ((c =
        ((((s = (s + Math.imul(I, tg)) | 0) + (n >>> 13)) | 0) + (tM >>> 26)) |
        0),
        (tM &= 0x3ffffff),
        (i = Math.imul(z, tr)),
        (n = ((n = Math.imul(z, ti)) + Math.imul(W, tr)) | 0),
        (s = Math.imul(W, ti)),
        (i = (i + Math.imul(O, ts)) | 0),
        (n = ((n = (n + Math.imul(O, to)) | 0) + Math.imul(U, ts)) | 0),
        (s = (s + Math.imul(U, to)) | 0),
        (i = (i + Math.imul(R, tu)) | 0),
        (n = ((n = (n + Math.imul(R, tc)) | 0) + Math.imul(L, tu)) | 0),
        (s = (s + Math.imul(L, tc)) | 0),
        (i = (i + Math.imul(M, th)) | 0),
        (n = ((n = (n + Math.imul(M, tf)) | 0) + Math.imul(P, th)) | 0),
        (s = (s + Math.imul(P, tf)) | 0),
        (i = (i + Math.imul(E, tp)) | 0));
      var tP =
        (((c + i) | 0) +
          ((8191 &
            (n = ((n = (n + Math.imul(E, tg)) | 0) + Math.imul(x, tp)) | 0)) <<
            13)) |
        0;
      ((c =
        ((((s = (s + Math.imul(x, tg)) | 0) + (n >>> 13)) | 0) + (tP >>> 26)) |
        0),
        (tP &= 0x3ffffff),
        (i = Math.imul(z, ts)),
        (n = ((n = Math.imul(z, to)) + Math.imul(W, ts)) | 0),
        (s = Math.imul(W, to)),
        (i = (i + Math.imul(O, tu)) | 0),
        (n = ((n = (n + Math.imul(O, tc)) | 0) + Math.imul(U, tu)) | 0),
        (s = (s + Math.imul(U, tc)) | 0),
        (i = (i + Math.imul(R, th)) | 0),
        (n = ((n = (n + Math.imul(R, tf)) | 0) + Math.imul(L, th)) | 0),
        (s = (s + Math.imul(L, tf)) | 0),
        (i = (i + Math.imul(M, tp)) | 0));
      var tT =
        (((c + i) | 0) +
          ((8191 &
            (n = ((n = (n + Math.imul(M, tg)) | 0) + Math.imul(P, tp)) | 0)) <<
            13)) |
        0;
      ((c =
        ((((s = (s + Math.imul(P, tg)) | 0) + (n >>> 13)) | 0) + (tT >>> 26)) |
        0),
        (tT &= 0x3ffffff),
        (i = Math.imul(z, tu)),
        (n = ((n = Math.imul(z, tc)) + Math.imul(W, tu)) | 0),
        (s = Math.imul(W, tc)),
        (i = (i + Math.imul(O, th)) | 0),
        (n = ((n = (n + Math.imul(O, tf)) | 0) + Math.imul(U, th)) | 0),
        (s = (s + Math.imul(U, tf)) | 0),
        (i = (i + Math.imul(R, tp)) | 0));
      var tR =
        (((c + i) | 0) +
          ((8191 &
            (n = ((n = (n + Math.imul(R, tg)) | 0) + Math.imul(L, tp)) | 0)) <<
            13)) |
        0;
      ((c =
        ((((s = (s + Math.imul(L, tg)) | 0) + (n >>> 13)) | 0) + (tR >>> 26)) |
        0),
        (tR &= 0x3ffffff),
        (i = Math.imul(z, th)),
        (n = ((n = Math.imul(z, tf)) + Math.imul(W, th)) | 0),
        (s = Math.imul(W, tf)),
        (i = (i + Math.imul(O, tp)) | 0));
      var tL =
        (((c + i) | 0) +
          ((8191 &
            (n = ((n = (n + Math.imul(O, tg)) | 0) + Math.imul(U, tp)) | 0)) <<
            13)) |
        0;
      ((c =
        ((((s = (s + Math.imul(U, tg)) | 0) + (n >>> 13)) | 0) + (tL >>> 26)) |
        0),
        (tL &= 0x3ffffff),
        (i = Math.imul(z, tp)));
      var tC =
        (((c + i) | 0) +
          ((8191 & (n = ((n = Math.imul(z, tg)) + Math.imul(W, tp)) | 0)) <<
            13)) |
        0;
      return (
        (c = ((((s = Math.imul(W, tg)) + (n >>> 13)) | 0) + (tC >>> 26)) | 0),
        (tC &= 0x3ffffff),
        (u[0] = tm),
        (u[1] = ty),
        (u[2] = tb),
        (u[3] = tw),
        (u[4] = tk),
        (u[5] = tv),
        (u[6] = tS),
        (u[7] = t_),
        (u[8] = tI),
        (u[9] = tA),
        (u[10] = tE),
        (u[11] = tx),
        (u[12] = tB),
        (u[13] = tM),
        (u[14] = tP),
        (u[15] = tT),
        (u[16] = tR),
        (u[17] = tL),
        (u[18] = tC),
        0 !== c && ((u[19] = c), r.length++),
        r
      );
    };
    function m(t, e, r) {
      ((r.negative = e.negative ^ t.negative),
        (r.length = t.length + e.length));
      for (var i = 0, n = 0, s = 0; s < r.length - 1; s++) {
        var o = n;
        n = 0;
        for (
          var a = 0x3ffffff & i,
            u = Math.min(s, e.length - 1),
            c = Math.max(0, s - t.length + 1);
          c <= u;
          c++
        ) {
          var l = s - c,
            h = (0 | t.words[l]) * (0 | e.words[c]),
            f = 0x3ffffff & h;
          ((o = (o + ((h / 0x4000000) | 0)) | 0),
            (a = 0x3ffffff & (f = (f + a) | 0)),
            (n += (o = (o + (f >>> 26)) | 0) >>> 26),
            (o &= 0x3ffffff));
        }
        ((r.words[s] = a), (i = o), (o = n));
      }
      return (0 !== i ? (r.words[s] = i) : r.length--, r._strip());
    }
    function y(t, e) {
      ((this.x = t), (this.y = e));
    }
    (Math.imul || (g = p),
      (n.prototype.mulTo = function (t, e) {
        var r,
          i = this.length + t.length;
        return (
          10 === this.length && 10 === t.length
            ? (r = g(this, t, e))
            : i < 63
              ? (r = p(this, t, e))
              : (r = m(this, t, e)),
          r
        );
      }),
      (y.prototype.makeRBT = function (t) {
        for (
          var e = Array(t), r = n.prototype._countBits(t) - 1, i = 0;
          i < t;
          i++
        )
          e[i] = this.revBin(i, r, t);
        return e;
      }),
      (y.prototype.revBin = function (t, e, r) {
        if (0 === t || t === r - 1) return t;
        for (var i = 0, n = 0; n < e; n++)
          ((i |= (1 & t) << (e - n - 1)), (t >>= 1));
        return i;
      }),
      (y.prototype.permute = function (t, e, r, i, n, s) {
        for (var o = 0; o < s; o++) ((i[o] = e[t[o]]), (n[o] = r[t[o]]));
      }),
      (y.prototype.transform = function (t, e, r, i, n, s) {
        this.permute(s, t, e, r, i, n);
        for (var o = 1; o < n; o <<= 1)
          for (
            var a = o << 1,
              u = Math.cos((2 * Math.PI) / a),
              c = Math.sin((2 * Math.PI) / a),
              l = 0;
            l < n;
            l += a
          )
            for (var h = u, f = c, d = 0; d < o; d++) {
              var p = r[l + d],
                g = i[l + d],
                m = r[l + d + o],
                y = i[l + d + o],
                b = h * m - f * y;
              ((y = h * y + f * m),
                (m = b),
                (r[l + d] = p + m),
                (i[l + d] = g + y),
                (r[l + d + o] = p - m),
                (i[l + d + o] = g - y),
                d !== a && ((b = u * h - c * f), (f = u * f + c * h), (h = b)));
            }
      }),
      (y.prototype.guessLen13b = function (t, e) {
        var r = 1 | Math.max(e, t),
          i = 1 & r,
          n = 0;
        for (r = (r / 2) | 0; r; r >>>= 1) n++;
        return 1 << (n + 1 + i);
      }),
      (y.prototype.conjugate = function (t, e, r) {
        if (!(r <= 1))
          for (var i = 0; i < r / 2; i++) {
            var n = t[i];
            ((t[i] = t[r - i - 1]),
              (t[r - i - 1] = n),
              (n = e[i]),
              (e[i] = -e[r - i - 1]),
              (e[r - i - 1] = -n));
          }
      }),
      (y.prototype.normalize13b = function (t, e) {
        for (var r = 0, i = 0; i < e / 2; i++) {
          var n =
            8192 * Math.round(t[2 * i + 1] / e) + Math.round(t[2 * i] / e) + r;
          ((t[i] = 0x3ffffff & n),
            (r = n < 0x4000000 ? 0 : (n / 0x4000000) | 0));
        }
        return t;
      }),
      (y.prototype.convert13b = function (t, e, i, n) {
        for (var s = 0, o = 0; o < e; o++)
          ((s += 0 | t[o]),
            (i[2 * o] = 8191 & s),
            (s >>>= 13),
            (i[2 * o + 1] = 8191 & s),
            (s >>>= 13));
        for (o = 2 * e; o < n; ++o) i[o] = 0;
        (r(0 === s), r((-8192 & s) == 0));
      }),
      (y.prototype.stub = function (t) {
        for (var e = Array(t), r = 0; r < t; r++) e[r] = 0;
        return e;
      }),
      (y.prototype.mulp = function (t, e, r) {
        var i = 2 * this.guessLen13b(t.length, e.length),
          n = this.makeRBT(i),
          s = this.stub(i),
          o = Array(i),
          a = Array(i),
          u = Array(i),
          c = Array(i),
          l = Array(i),
          h = Array(i),
          f = r.words;
        ((f.length = i),
          this.convert13b(t.words, t.length, o, i),
          this.convert13b(e.words, e.length, c, i),
          this.transform(o, s, a, u, i, n),
          this.transform(c, s, l, h, i, n));
        for (var d = 0; d < i; d++) {
          var p = a[d] * l[d] - u[d] * h[d];
          ((u[d] = a[d] * h[d] + u[d] * l[d]), (a[d] = p));
        }
        return (
          this.conjugate(a, u, i),
          this.transform(a, u, f, s, i, n),
          this.conjugate(f, s, i),
          this.normalize13b(f, i),
          (r.negative = t.negative ^ e.negative),
          (r.length = t.length + e.length),
          r._strip()
        );
      }),
      (n.prototype.mul = function (t) {
        var e = new n(null);
        return ((e.words = Array(this.length + t.length)), this.mulTo(t, e));
      }),
      (n.prototype.mulf = function (t) {
        var e = new n(null);
        return ((e.words = Array(this.length + t.length)), m(this, t, e));
      }),
      (n.prototype.imul = function (t) {
        return this.clone().mulTo(t, this);
      }),
      (n.prototype.imuln = function (t) {
        var e = t < 0;
        (e && (t = -t), r("number" == typeof t), r(t < 0x4000000));
        for (var i = 0, n = 0; n < this.length; n++) {
          var s = (0 | this.words[n]) * t,
            o = (0x3ffffff & s) + (0x3ffffff & i);
          ((i >>= 26),
            (i += ((s / 0x4000000) | 0) + (o >>> 26)),
            (this.words[n] = 0x3ffffff & o));
        }
        return (
          0 !== i && ((this.words[n] = i), this.length++),
          0 === t && ((this.length = 1), this._normSign()),
          e ? this.ineg() : this
        );
      }),
      (n.prototype.muln = function (t) {
        return this.clone().imuln(t);
      }),
      (n.prototype.sqr = function () {
        return this.mul(this);
      }),
      (n.prototype.isqr = function () {
        return this.imul(this.clone());
      }),
      (n.prototype.pow = function (t) {
        var e = (function (t) {
          for (var e = Array(t.bitLength()), r = 0; r < e.length; r++) {
            var i = (r / 26) | 0,
              n = r % 26;
            e[r] = (t.words[i] >>> n) & 1;
          }
          return e;
        })(t);
        if (0 === e.length) return new n(1);
        for (var r = this, i = 0; i < e.length && 0 === e[i]; i++, r = r.sqr());
        if (++i < e.length)
          for (var s = r.sqr(); i < e.length; i++, s = s.sqr())
            0 !== e[i] && (r = r.mul(s));
        return r;
      }),
      (n.prototype.iushln = function (t) {
        r("number" == typeof t && t >= 0);
        var e,
          i = t % 26,
          n = (t - i) / 26,
          s = (0x3ffffff >>> (26 - i)) << (26 - i);
        if (0 !== i) {
          var o = 0;
          for (e = 0; e < this.length; e++) {
            var a = this.words[e] & s,
              u = ((0 | this.words[e]) - a) << i;
            ((this.words[e] = u | o), (o = a >>> (26 - i)));
          }
          o && ((this.words[e] = o), this.length++);
        }
        if (0 !== n) {
          for (e = this.length - 1; e >= 0; e--)
            this.words[e + n] = this.words[e];
          for (e = 0; e < n; e++) this.words[e] = 0;
          this.length += n;
        }
        return this._strip();
      }),
      (n.prototype.ishln = function (t) {
        return (r(0 === this.negative), this.iushln(t));
      }),
      (n.prototype.iushrn = function (t, e, i) {
        r("number" == typeof t && t >= 0);
        var n = e ? (e - (e % 26)) / 26 : 0,
          s = t % 26,
          o = Math.min((t - s) / 26, this.length),
          a = 0x3ffffff ^ ((0x3ffffff >>> s) << s);
        if (((n -= o), (n = Math.max(0, n)), i)) {
          for (var u = 0; u < o; u++) i.words[u] = this.words[u];
          i.length = o;
        }
        if (0 === o);
        else if (this.length > o)
          for (this.length -= o, u = 0; u < this.length; u++)
            this.words[u] = this.words[u + o];
        else ((this.words[0] = 0), (this.length = 1));
        var c = 0;
        for (u = this.length - 1; u >= 0 && (0 !== c || u >= n); u--) {
          var l = 0 | this.words[u];
          ((this.words[u] = (c << (26 - s)) | (l >>> s)), (c = l & a));
        }
        return (
          i && 0 !== c && (i.words[i.length++] = c),
          0 === this.length && ((this.words[0] = 0), (this.length = 1)),
          this._strip()
        );
      }),
      (n.prototype.ishrn = function (t, e, i) {
        return (r(0 === this.negative), this.iushrn(t, e, i));
      }),
      (n.prototype.shln = function (t) {
        return this.clone().ishln(t);
      }),
      (n.prototype.ushln = function (t) {
        return this.clone().iushln(t);
      }),
      (n.prototype.shrn = function (t) {
        return this.clone().ishrn(t);
      }),
      (n.prototype.ushrn = function (t) {
        return this.clone().iushrn(t);
      }),
      (n.prototype.testn = function (t) {
        r("number" == typeof t && t >= 0);
        var e = t % 26,
          i = (t - e) / 26;
        return !(this.length <= i) && !!(this.words[i] & (1 << e));
      }),
      (n.prototype.imaskn = function (t) {
        r("number" == typeof t && t >= 0);
        var e = t % 26,
          i = (t - e) / 26;
        return (r(
          0 === this.negative,
          "imaskn works only with positive numbers",
        ),
        this.length <= i)
          ? this
          : (0 !== e && i++,
            (this.length = Math.min(i, this.length)),
            0 !== e &&
              (this.words[this.length - 1] &=
                0x3ffffff ^ ((0x3ffffff >>> e) << e)),
            0 === this.length && ((this.words[0] = 0), (this.length = 1)),
            this._strip());
      }),
      (n.prototype.maskn = function (t) {
        return this.clone().imaskn(t);
      }),
      (n.prototype.iaddn = function (t) {
        return (r("number" == typeof t), r(t < 0x4000000), t < 0)
          ? this.isubn(-t)
          : 0 !== this.negative
            ? (1 === this.length && (0 | this.words[0]) <= t
                ? ((this.words[0] = t - (0 | this.words[0])),
                  (this.negative = 0))
                : ((this.negative = 0), this.isubn(t), (this.negative = 1)),
              this)
            : this._iaddn(t);
      }),
      (n.prototype._iaddn = function (t) {
        this.words[0] += t;
        for (var e = 0; e < this.length && this.words[e] >= 0x4000000; e++)
          ((this.words[e] -= 0x4000000),
            e === this.length - 1
              ? (this.words[e + 1] = 1)
              : this.words[e + 1]++);
        return ((this.length = Math.max(this.length, e + 1)), this);
      }),
      (n.prototype.isubn = function (t) {
        if ((r("number" == typeof t), r(t < 0x4000000), t < 0))
          return this.iaddn(-t);
        if (0 !== this.negative)
          return (
            (this.negative = 0),
            this.iaddn(t),
            (this.negative = 1),
            this
          );
        if (((this.words[0] -= t), 1 === this.length && this.words[0] < 0))
          ((this.words[0] = -this.words[0]), (this.negative = 1));
        else
          for (var e = 0; e < this.length && this.words[e] < 0; e++)
            ((this.words[e] += 0x4000000), (this.words[e + 1] -= 1));
        return this._strip();
      }),
      (n.prototype.addn = function (t) {
        return this.clone().iaddn(t);
      }),
      (n.prototype.subn = function (t) {
        return this.clone().isubn(t);
      }),
      (n.prototype.iabs = function () {
        return ((this.negative = 0), this);
      }),
      (n.prototype.abs = function () {
        return this.clone().iabs();
      }),
      (n.prototype._ishlnsubmul = function (t, e, i) {
        var n,
          s,
          o = t.length + i;
        this._expand(o);
        var a = 0;
        for (n = 0; n < t.length; n++) {
          s = (0 | this.words[n + i]) + a;
          var u = (0 | t.words[n]) * e;
          ((s -= 0x3ffffff & u),
            (a = (s >> 26) - ((u / 0x4000000) | 0)),
            (this.words[n + i] = 0x3ffffff & s));
        }
        for (; n < this.length - i; n++)
          ((a = (s = (0 | this.words[n + i]) + a) >> 26),
            (this.words[n + i] = 0x3ffffff & s));
        if (0 === a) return this._strip();
        for (r(-1 === a), a = 0, n = 0; n < this.length; n++)
          ((a = (s = -(0 | this.words[n]) + a) >> 26),
            (this.words[n] = 0x3ffffff & s));
        return ((this.negative = 1), this._strip());
      }),
      (n.prototype._wordDiv = function (t, e) {
        var r,
          i = this.length - t.length,
          s = this.clone(),
          o = t,
          a = 0 | o.words[o.length - 1];
        0 != (i = 26 - this._countBits(a)) &&
          ((o = o.ushln(i)), s.iushln(i), (a = 0 | o.words[o.length - 1]));
        var u = s.length - o.length;
        if ("mod" !== e) {
          (((r = new n(null)).length = u + 1), (r.words = Array(r.length)));
          for (var c = 0; c < r.length; c++) r.words[c] = 0;
        }
        var l = s.clone()._ishlnsubmul(o, 1, u);
        0 === l.negative && ((s = l), r && (r.words[u] = 1));
        for (var h = u - 1; h >= 0; h--) {
          var f =
            (0 | s.words[o.length + h]) * 0x4000000 +
            (0 | s.words[o.length + h - 1]);
          for (
            f = Math.min((f / a) | 0, 0x3ffffff), s._ishlnsubmul(o, f, h);
            0 !== s.negative;

          )
            (f--,
              (s.negative = 0),
              s._ishlnsubmul(o, 1, h),
              s.isZero() || (s.negative ^= 1));
          r && (r.words[h] = f);
        }
        return (
          r && r._strip(),
          s._strip(),
          "div" !== e && 0 !== i && s.iushrn(i),
          { div: r || null, mod: s }
        );
      }),
      (n.prototype.divmod = function (t, e, i) {
        var s, o, a;
        return (r(!t.isZero()), this.isZero())
          ? { div: new n(0), mod: new n(0) }
          : 0 !== this.negative && 0 === t.negative
            ? ((a = this.neg().divmod(t, e)),
              "mod" !== e && (s = a.div.neg()),
              "div" !== e &&
                ((o = a.mod.neg()), i && 0 !== o.negative && o.iadd(t)),
              { div: s, mod: o })
            : 0 === this.negative && 0 !== t.negative
              ? ((a = this.divmod(t.neg(), e)),
                "mod" !== e && (s = a.div.neg()),
                { div: s, mod: a.mod })
              : (this.negative & t.negative) != 0
                ? ((a = this.neg().divmod(t.neg(), e)),
                  "div" !== e &&
                    ((o = a.mod.neg()), i && 0 !== o.negative && o.isub(t)),
                  { div: a.div, mod: o })
                : t.length > this.length || 0 > this.cmp(t)
                  ? { div: new n(0), mod: this }
                  : 1 === t.length
                    ? "div" === e
                      ? { div: this.divn(t.words[0]), mod: null }
                      : "mod" === e
                        ? { div: null, mod: new n(this.modrn(t.words[0])) }
                        : {
                            div: this.divn(t.words[0]),
                            mod: new n(this.modrn(t.words[0])),
                          }
                    : this._wordDiv(t, e);
      }),
      (n.prototype.div = function (t) {
        return this.divmod(t, "div", !1).div;
      }),
      (n.prototype.mod = function (t) {
        return this.divmod(t, "mod", !1).mod;
      }),
      (n.prototype.umod = function (t) {
        return this.divmod(t, "mod", !0).mod;
      }),
      (n.prototype.divRound = function (t) {
        var e = this.divmod(t);
        if (e.mod.isZero()) return e.div;
        var r = e.mod.abs(),
          i = t.abs().iushrn(1),
          s = 1 & t.words[0],
          o = r.cmp(i);
        if (o < 0 || (1 === s && 0 === o)) return e.div;
        var a = new n(1);
        return ((a.negative = this.negative ^ t.negative), e.div.iadd(a));
      }),
      (n.prototype.modrn = function (t) {
        var e = t < 0;
        (e && (t = -t), r(t <= 0x3ffffff));
        for (var i = 0x4000000 % t, n = 0, s = this.length - 1; s >= 0; s--)
          n = (i * n + (0 | this.words[s])) % t;
        return e ? -n : n;
      }),
      (n.prototype.modn = function (t) {
        return this.modrn(t);
      }),
      (n.prototype.idivn = function (t) {
        var e = t < 0;
        (e && (t = -t), r(t <= 0x3ffffff));
        for (var i = 0, n = this.length - 1; n >= 0; n--) {
          var s = (0 | this.words[n]) + 0x4000000 * i;
          ((this.words[n] = (s / t) | 0), (i = s % t));
        }
        return (this._strip(), e ? this.ineg() : this);
      }),
      (n.prototype.divn = function (t) {
        return this.clone().idivn(t);
      }),
      (n.prototype.egcd = function (t) {
        (r(0 === t.negative), r(!t.isZero()));
        var e = this,
          i = t.clone();
        e = 0 !== e.negative ? e.umod(t) : e.clone();
        for (
          var s = new n(1), o = new n(0), a = new n(0), u = new n(1), c = 0;
          e.isEven() && i.isEven();

        )
          (e.iushrn(1), i.iushrn(1), ++c);
        for (var l = i.clone(), h = e.clone(); !e.isZero(); ) {
          for (var f = 0, d = 1; (e.words[0] & d) == 0 && f < 26; ++f, d <<= 1);
          if (f > 0)
            for (e.iushrn(f); f-- > 0; )
              ((s.isOdd() || o.isOdd()) && (s.iadd(l), o.isub(h)),
                s.iushrn(1),
                o.iushrn(1));
          for (var p = 0, g = 1; (i.words[0] & g) == 0 && p < 26; ++p, g <<= 1);
          if (p > 0)
            for (i.iushrn(p); p-- > 0; )
              ((a.isOdd() || u.isOdd()) && (a.iadd(l), u.isub(h)),
                a.iushrn(1),
                u.iushrn(1));
          e.cmp(i) >= 0
            ? (e.isub(i), s.isub(a), o.isub(u))
            : (i.isub(e), a.isub(s), u.isub(o));
        }
        return { a: a, b: u, gcd: i.iushln(c) };
      }),
      (n.prototype._invmp = function (t) {
        (r(0 === t.negative), r(!t.isZero()));
        var e,
          i = this,
          s = t.clone();
        i = 0 !== i.negative ? i.umod(t) : i.clone();
        for (
          var o = new n(1), a = new n(0), u = s.clone();
          i.cmpn(1) > 0 && s.cmpn(1) > 0;

        ) {
          for (var c = 0, l = 1; (i.words[0] & l) == 0 && c < 26; ++c, l <<= 1);
          if (c > 0)
            for (i.iushrn(c); c-- > 0; ) (o.isOdd() && o.iadd(u), o.iushrn(1));
          for (var h = 0, f = 1; (s.words[0] & f) == 0 && h < 26; ++h, f <<= 1);
          if (h > 0)
            for (s.iushrn(h); h-- > 0; ) (a.isOdd() && a.iadd(u), a.iushrn(1));
          i.cmp(s) >= 0 ? (i.isub(s), o.isub(a)) : (s.isub(i), a.isub(o));
        }
        return (0 > (e = 0 === i.cmpn(1) ? o : a).cmpn(0) && e.iadd(t), e);
      }),
      (n.prototype.gcd = function (t) {
        if (this.isZero()) return t.abs();
        if (t.isZero()) return this.abs();
        var e = this.clone(),
          r = t.clone();
        ((e.negative = 0), (r.negative = 0));
        for (var i = 0; e.isEven() && r.isEven(); i++)
          (e.iushrn(1), r.iushrn(1));
        for (;;) {
          for (; e.isEven(); ) e.iushrn(1);
          for (; r.isEven(); ) r.iushrn(1);
          var n = e.cmp(r);
          if (n < 0) {
            var s = e;
            ((e = r), (r = s));
          } else if (0 === n || 0 === r.cmpn(1)) break;
          e.isub(r);
        }
        return r.iushln(i);
      }),
      (n.prototype.invm = function (t) {
        return this.egcd(t).a.umod(t);
      }),
      (n.prototype.isEven = function () {
        return (1 & this.words[0]) == 0;
      }),
      (n.prototype.isOdd = function () {
        return (1 & this.words[0]) == 1;
      }),
      (n.prototype.andln = function (t) {
        return this.words[0] & t;
      }),
      (n.prototype.bincn = function (t) {
        r("number" == typeof t);
        var e = t % 26,
          i = (t - e) / 26,
          n = 1 << e;
        if (this.length <= i)
          return (this._expand(i + 1), (this.words[i] |= n), this);
        for (var s = n, o = i; 0 !== s && o < this.length; o++) {
          var a = 0 | this.words[o];
          ((a += s), (s = a >>> 26), (a &= 0x3ffffff), (this.words[o] = a));
        }
        return (0 !== s && ((this.words[o] = s), this.length++), this);
      }),
      (n.prototype.isZero = function () {
        return 1 === this.length && 0 === this.words[0];
      }),
      (n.prototype.cmpn = function (t) {
        var e,
          i = t < 0;
        if (0 !== this.negative && !i) return -1;
        if (0 === this.negative && i) return 1;
        if ((this._strip(), this.length > 1)) e = 1;
        else {
          (i && (t = -t), r(t <= 0x3ffffff, "Number is too big"));
          var n = 0 | this.words[0];
          e = n === t ? 0 : n < t ? -1 : 1;
        }
        return 0 !== this.negative ? 0 | -e : e;
      }),
      (n.prototype.cmp = function (t) {
        if (0 !== this.negative && 0 === t.negative) return -1;
        if (0 === this.negative && 0 !== t.negative) return 1;
        var e = this.ucmp(t);
        return 0 !== this.negative ? 0 | -e : e;
      }),
      (n.prototype.ucmp = function (t) {
        if (this.length > t.length) return 1;
        if (this.length < t.length) return -1;
        for (var e = 0, r = this.length - 1; r >= 0; r--) {
          var i = 0 | this.words[r],
            n = 0 | t.words[r];
          if (i !== n) {
            i < n ? (e = -1) : i > n && (e = 1);
            break;
          }
        }
        return e;
      }),
      (n.prototype.gtn = function (t) {
        return 1 === this.cmpn(t);
      }),
      (n.prototype.gt = function (t) {
        return 1 === this.cmp(t);
      }),
      (n.prototype.gten = function (t) {
        return this.cmpn(t) >= 0;
      }),
      (n.prototype.gte = function (t) {
        return this.cmp(t) >= 0;
      }),
      (n.prototype.ltn = function (t) {
        return -1 === this.cmpn(t);
      }),
      (n.prototype.lt = function (t) {
        return -1 === this.cmp(t);
      }),
      (n.prototype.lten = function (t) {
        return 0 >= this.cmpn(t);
      }),
      (n.prototype.lte = function (t) {
        return 0 >= this.cmp(t);
      }),
      (n.prototype.eqn = function (t) {
        return 0 === this.cmpn(t);
      }),
      (n.prototype.eq = function (t) {
        return 0 === this.cmp(t);
      }),
      (n.red = function (t) {
        return new I(t);
      }),
      (n.prototype.toRed = function (t) {
        return (
          r(!this.red, "Already a number in reduction context"),
          r(0 === this.negative, "red works only with positives"),
          t.convertTo(this)._forceRed(t)
        );
      }),
      (n.prototype.fromRed = function () {
        return (
          r(this.red, "fromRed works only with numbers in reduction context"),
          this.red.convertFrom(this)
        );
      }),
      (n.prototype._forceRed = function (t) {
        return ((this.red = t), this);
      }),
      (n.prototype.forceRed = function (t) {
        return (
          r(!this.red, "Already a number in reduction context"),
          this._forceRed(t)
        );
      }),
      (n.prototype.redAdd = function (t) {
        return (
          r(this.red, "redAdd works only with red numbers"),
          this.red.add(this, t)
        );
      }),
      (n.prototype.redIAdd = function (t) {
        return (
          r(this.red, "redIAdd works only with red numbers"),
          this.red.iadd(this, t)
        );
      }),
      (n.prototype.redSub = function (t) {
        return (
          r(this.red, "redSub works only with red numbers"),
          this.red.sub(this, t)
        );
      }),
      (n.prototype.redISub = function (t) {
        return (
          r(this.red, "redISub works only with red numbers"),
          this.red.isub(this, t)
        );
      }),
      (n.prototype.redShl = function (t) {
        return (
          r(this.red, "redShl works only with red numbers"),
          this.red.shl(this, t)
        );
      }),
      (n.prototype.redMul = function (t) {
        return (
          r(this.red, "redMul works only with red numbers"),
          this.red._verify2(this, t),
          this.red.mul(this, t)
        );
      }),
      (n.prototype.redIMul = function (t) {
        return (
          r(this.red, "redMul works only with red numbers"),
          this.red._verify2(this, t),
          this.red.imul(this, t)
        );
      }),
      (n.prototype.redSqr = function () {
        return (
          r(this.red, "redSqr works only with red numbers"),
          this.red._verify1(this),
          this.red.sqr(this)
        );
      }),
      (n.prototype.redISqr = function () {
        return (
          r(this.red, "redISqr works only with red numbers"),
          this.red._verify1(this),
          this.red.isqr(this)
        );
      }),
      (n.prototype.redSqrt = function () {
        return (
          r(this.red, "redSqrt works only with red numbers"),
          this.red._verify1(this),
          this.red.sqrt(this)
        );
      }),
      (n.prototype.redInvm = function () {
        return (
          r(this.red, "redInvm works only with red numbers"),
          this.red._verify1(this),
          this.red.invm(this)
        );
      }),
      (n.prototype.redNeg = function () {
        return (
          r(this.red, "redNeg works only with red numbers"),
          this.red._verify1(this),
          this.red.neg(this)
        );
      }),
      (n.prototype.redPow = function (t) {
        return (
          r(this.red && !t.red, "redPow(normalNum)"),
          this.red._verify1(this),
          this.red.pow(this, t)
        );
      }));
    var b = { k256: null, p224: null, p192: null, p25519: null };
    function w(t, e) {
      ((this.name = t),
        (this.p = new n(e, 16)),
        (this.n = this.p.bitLength()),
        (this.k = new n(1).iushln(this.n).isub(this.p)),
        (this.tmp = this._tmp()));
    }
    function k() {
      w.call(
        this,
        "k256",
        "ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffe fffffc2f",
      );
    }
    function v() {
      w.call(
        this,
        "p224",
        "ffffffff ffffffff ffffffff ffffffff 00000000 00000000 00000001",
      );
    }
    function S() {
      w.call(
        this,
        "p192",
        "ffffffff ffffffff ffffffff fffffffe ffffffff ffffffff",
      );
    }
    function _() {
      w.call(
        this,
        "25519",
        "7fffffffffffffff ffffffffffffffff ffffffffffffffff ffffffffffffffed",
      );
    }
    function I(t) {
      if ("string" == typeof t) {
        var e = n._prime(t);
        ((this.m = e.p), (this.prime = e));
      } else
        (r(t.gtn(1), "modulus must be greater than 1"),
          (this.m = t),
          (this.prime = null));
    }
    function A(t) {
      (I.call(this, t),
        (this.shift = this.m.bitLength()),
        this.shift % 26 != 0 && (this.shift += 26 - (this.shift % 26)),
        (this.r = new n(1).iushln(this.shift)),
        (this.r2 = this.imod(this.r.sqr())),
        (this.rinv = this.r._invmp(this.m)),
        (this.minv = this.rinv.mul(this.r).isubn(1).div(this.m)),
        (this.minv = this.minv.umod(this.r)),
        (this.minv = this.r.sub(this.minv)));
    }
    ((w.prototype._tmp = function () {
      var t = new n(null);
      return ((t.words = Array(Math.ceil(this.n / 13))), t);
    }),
      (w.prototype.ireduce = function (t) {
        var e,
          r = t;
        do
          (this.split(r, this.tmp),
            (e = (r = (r = this.imulK(r)).iadd(this.tmp)).bitLength()));
        while (e > this.n);
        var i = e < this.n ? -1 : r.ucmp(this.p);
        return (
          0 === i
            ? ((r.words[0] = 0), (r.length = 1))
            : i > 0
              ? r.isub(this.p)
              : void 0 !== r.strip
                ? r.strip()
                : r._strip(),
          r
        );
      }),
      (w.prototype.split = function (t, e) {
        t.iushrn(this.n, 0, e);
      }),
      (w.prototype.imulK = function (t) {
        return t.imul(this.k);
      }),
      i(k, w),
      (k.prototype.split = function (t, e) {
        for (var r = Math.min(t.length, 9), i = 0; i < r; i++)
          e.words[i] = t.words[i];
        if (((e.length = r), t.length <= 9)) {
          ((t.words[0] = 0), (t.length = 1));
          return;
        }
        var n = t.words[9];
        for (e.words[e.length++] = 4194303 & n, i = 10; i < t.length; i++) {
          var s = 0 | t.words[i];
          ((t.words[i - 10] = ((4194303 & s) << 4) | (n >>> 22)), (n = s));
        }
        ((n >>>= 22),
          (t.words[i - 10] = n),
          0 === n && t.length > 10 ? (t.length -= 10) : (t.length -= 9));
      }),
      (k.prototype.imulK = function (t) {
        ((t.words[t.length] = 0), (t.words[t.length + 1] = 0), (t.length += 2));
        for (var e = 0, r = 0; r < t.length; r++) {
          var i = 0 | t.words[r];
          ((e += 977 * i),
            (t.words[r] = 0x3ffffff & e),
            (e = 64 * i + ((e / 0x4000000) | 0)));
        }
        return (
          0 === t.words[t.length - 1] &&
            (t.length--, 0 === t.words[t.length - 1] && t.length--),
          t
        );
      }),
      i(v, w),
      i(S, w),
      i(_, w),
      (_.prototype.imulK = function (t) {
        for (var e = 0, r = 0; r < t.length; r++) {
          var i = (0 | t.words[r]) * 19 + e,
            n = 0x3ffffff & i;
          ((i >>>= 26), (t.words[r] = n), (e = i));
        }
        return (0 !== e && (t.words[t.length++] = e), t);
      }),
      (n._prime = function (t) {
        var e;
        if (b[t]) return b[t];
        if ("k256" === t) e = new k();
        else if ("p224" === t) e = new v();
        else if ("p192" === t) e = new S();
        else if ("p25519" === t) e = new _();
        else throw Error("Unknown prime " + t);
        return ((b[t] = e), e);
      }),
      (I.prototype._verify1 = function (t) {
        (r(0 === t.negative, "red works only with positives"),
          r(t.red, "red works only with red numbers"));
      }),
      (I.prototype._verify2 = function (t, e) {
        (r((t.negative | e.negative) == 0, "red works only with positives"),
          r(t.red && t.red === e.red, "red works only with red numbers"));
      }),
      (I.prototype.imod = function (t) {
        return this.prime
          ? this.prime.ireduce(t)._forceRed(this)
          : (u(t, t.umod(this.m)._forceRed(this)), t);
      }),
      (I.prototype.neg = function (t) {
        return t.isZero() ? t.clone() : this.m.sub(t)._forceRed(this);
      }),
      (I.prototype.add = function (t, e) {
        this._verify2(t, e);
        var r = t.add(e);
        return (r.cmp(this.m) >= 0 && r.isub(this.m), r._forceRed(this));
      }),
      (I.prototype.iadd = function (t, e) {
        this._verify2(t, e);
        var r = t.iadd(e);
        return (r.cmp(this.m) >= 0 && r.isub(this.m), r);
      }),
      (I.prototype.sub = function (t, e) {
        this._verify2(t, e);
        var r = t.sub(e);
        return (0 > r.cmpn(0) && r.iadd(this.m), r._forceRed(this));
      }),
      (I.prototype.isub = function (t, e) {
        this._verify2(t, e);
        var r = t.isub(e);
        return (0 > r.cmpn(0) && r.iadd(this.m), r);
      }),
      (I.prototype.shl = function (t, e) {
        return (this._verify1(t), this.imod(t.ushln(e)));
      }),
      (I.prototype.imul = function (t, e) {
        return (this._verify2(t, e), this.imod(t.imul(e)));
      }),
      (I.prototype.mul = function (t, e) {
        return (this._verify2(t, e), this.imod(t.mul(e)));
      }),
      (I.prototype.isqr = function (t) {
        return this.imul(t, t.clone());
      }),
      (I.prototype.sqr = function (t) {
        return this.mul(t, t);
      }),
      (I.prototype.sqrt = function (t) {
        if (t.isZero()) return t.clone();
        var e = this.m.andln(3);
        if ((r(e % 2 == 1), 3 === e)) {
          var i = this.m.add(new n(1)).iushrn(2);
          return this.pow(t, i);
        }
        for (var s = this.m.subn(1), o = 0; !s.isZero() && 0 === s.andln(1); )
          (o++, s.iushrn(1));
        r(!s.isZero());
        var a = new n(1).toRed(this),
          u = a.redNeg(),
          c = this.m.subn(1).iushrn(1),
          l = this.m.bitLength();
        for (l = new n(2 * l * l).toRed(this); 0 !== this.pow(l, c).cmp(u); )
          l.redIAdd(u);
        for (
          var h = this.pow(l, s),
            f = this.pow(t, s.addn(1).iushrn(1)),
            d = this.pow(t, s),
            p = o;
          0 !== d.cmp(a);

        ) {
          for (var g = d, m = 0; 0 !== g.cmp(a); m++) g = g.redSqr();
          r(m < p);
          var y = this.pow(h, new n(1).iushln(p - m - 1));
          ((f = f.redMul(y)), (h = y.redSqr()), (d = d.redMul(h)), (p = m));
        }
        return f;
      }),
      (I.prototype.invm = function (t) {
        var e = t._invmp(this.m);
        return 0 !== e.negative
          ? ((e.negative = 0), this.imod(e).redNeg())
          : this.imod(e);
      }),
      (I.prototype.pow = function (t, e) {
        if (e.isZero()) return new n(1).toRed(this);
        if (0 === e.cmpn(1)) return t.clone();
        var r = Array(16);
        ((r[0] = new n(1).toRed(this)), (r[1] = t));
        for (var i = 2; i < r.length; i++) r[i] = this.mul(r[i - 1], t);
        var s = r[0],
          o = 0,
          a = 0,
          u = e.bitLength() % 26;
        for (0 === u && (u = 26), i = e.length - 1; i >= 0; i--) {
          for (var c = e.words[i], l = u - 1; l >= 0; l--) {
            var h = (c >> l) & 1;
            if ((s !== r[0] && (s = this.sqr(s)), 0 === h && 0 === o)) {
              a = 0;
              continue;
            }
            ((o <<= 1),
              (o |= h),
              (4 == ++a || (0 === i && 0 === l)) &&
                ((s = this.mul(s, r[o])), (a = 0), (o = 0)));
          }
          u = 26;
        }
        return s;
      }),
      (I.prototype.convertTo = function (t) {
        var e = t.umod(this.m);
        return e === t ? e.clone() : e;
      }),
      (I.prototype.convertFrom = function (t) {
        var e = t.clone();
        return ((e.red = null), e);
      }),
      (n.mont = function (t) {
        return new A(t);
      }),
      i(A, I),
      (A.prototype.convertTo = function (t) {
        return this.imod(t.ushln(this.shift));
      }),
      (A.prototype.convertFrom = function (t) {
        var e = this.imod(t.mul(this.rinv));
        return ((e.red = null), e);
      }),
      (A.prototype.imul = function (t, e) {
        if (t.isZero() || e.isZero())
          return ((t.words[0] = 0), (t.length = 1), t);
        var r = t.imul(e),
          i = r.maskn(this.shift).mul(this.minv).imaskn(this.shift).mul(this.m),
          n = r.isub(i).iushrn(this.shift),
          s = n;
        return (
          n.cmp(this.m) >= 0
            ? (s = n.isub(this.m))
            : 0 > n.cmpn(0) && (s = n.iadd(this.m)),
          s._forceRed(this)
        );
      }),
      (A.prototype.mul = function (t, e) {
        if (t.isZero() || e.isZero()) return new n(0)._forceRed(this);
        var r = t.mul(e),
          i = r.maskn(this.shift).mul(this.minv).imaskn(this.shift).mul(this.m),
          s = r.isub(i).iushrn(this.shift),
          o = s;
        return (
          s.cmp(this.m) >= 0
            ? (o = s.isub(this.m))
            : 0 > s.cmpn(0) && (o = s.iadd(this.m)),
          o._forceRed(this)
        );
      }),
      (A.prototype.invm = function (t) {
        return this.imod(t._invmp(this.m).mul(this.r2))._forceRed(this);
      }));
  })(e, t.e);
};
