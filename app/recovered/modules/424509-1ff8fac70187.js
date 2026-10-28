// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(t, e, r) => {
  !(function (t, e) {
    "use strict";
    function r(t, e) {
      if (!t) throw Error(e || "Assertion failed");
    }
    function n(t, e) {
      t.super_ = e;
      var r = function () {};
      ((r.prototype = e.prototype),
        (t.prototype = new r()),
        (t.prototype.constructor = t));
    }
    function i(t, e, r) {
      if (i.isBN(t)) return t;
      ((this.negative = 0),
        (this.words = null),
        (this.length = 0),
        (this.red = null),
        null !== t &&
          (("le" === e || "be" === e) && ((r = e), (e = 10)),
          this._init(t || 0, e || 10, r || "be")));
    }
    ((t.exports = i), (i.BN = i), (i.wordSize = 26));
    try {
      h =
        "u" > typeof window && void 0 !== window.Buffer
          ? window.Buffer
          : void 0;
    } catch (t) {}
    function o(t, e) {
      var n = t.charCodeAt(e);
      return n >= 48 && n <= 57
        ? n - 48
        : n >= 65 && n <= 70
          ? n - 55
          : n >= 97 && n <= 102
            ? n - 87
            : void r(!1, "Invalid character in " + t);
    }
    function s(t, e, r) {
      var n = o(t, r);
      return (r - 1 >= e && (n |= o(t, r - 1) << 4), n);
    }
    function a(t, e, n, i) {
      for (var o = 0, s = 0, a = Math.min(t.length, n), u = e; u < a; u++) {
        var l = t.charCodeAt(u) - 48;
        ((o *= i),
          (s = l >= 49 ? l - 49 + 10 : l >= 17 ? l - 17 + 10 : l),
          r(l >= 0 && s < i, "Invalid character"),
          (o += s));
      }
      return o;
    }
    function u(t, e) {
      ((t.words = e.words),
        (t.length = e.length),
        (t.negative = e.negative),
        (t.red = e.red));
    }
    if (
      ((i.isBN = function (t) {
        return (
          t instanceof i ||
          (null !== t &&
            "object" == typeof t &&
            t.constructor.wordSize === i.wordSize &&
            Array.isArray(t.words))
        );
      }),
      (i.max = function (t, e) {
        return t.cmp(e) > 0 ? t : e;
      }),
      (i.min = function (t, e) {
        return 0 > t.cmp(e) ? t : e;
      }),
      (i.prototype._init = function (t, e, n) {
        if ("number" == typeof t) return this._initNumber(t, e, n);
        if ("object" == typeof t) return this._initArray(t, e, n);
        ("hex" === e && (e = 16), r(e === (0 | e) && e >= 2 && e <= 36));
        var i = 0;
        ("-" === (t = t.toString().replace(/\s+/g, ""))[0] &&
          (i++, (this.negative = 1)),
          i < t.length &&
            (16 === e
              ? this._parseHex(t, i, n)
              : (this._parseBase(t, e, i),
                "le" === n && this._initArray(this.toArray(), e, n))));
      }),
      (i.prototype._initNumber = function (t, e, n) {
        (t < 0 && ((this.negative = 1), (t = -t)),
          t < 0x4000000
            ? ((this.words = [0x3ffffff & t]), (this.length = 1))
            : t < 0x10000000000000
              ? ((this.words = [0x3ffffff & t, (t / 0x4000000) & 0x3ffffff]),
                (this.length = 2))
              : (r(t < 0x20000000000000),
                (this.words = [0x3ffffff & t, (t / 0x4000000) & 0x3ffffff, 1]),
                (this.length = 3)),
          "le" === n && this._initArray(this.toArray(), e, n));
      }),
      (i.prototype._initArray = function (t, e, n) {
        if ((r("number" == typeof t.length), t.length <= 0))
          return ((this.words = [0]), (this.length = 1), this);
        ((this.length = Math.ceil(t.length / 3)),
          (this.words = Array(this.length)));
        for (var i, o, s = 0; s < this.length; s++) this.words[s] = 0;
        var a = 0;
        if ("be" === n)
          for (s = t.length - 1, i = 0; s >= 0; s -= 3)
            ((o = t[s] | (t[s - 1] << 8) | (t[s - 2] << 16)),
              (this.words[i] |= (o << a) & 0x3ffffff),
              (this.words[i + 1] = (o >>> (26 - a)) & 0x3ffffff),
              (a += 24) >= 26 && ((a -= 26), i++));
        else if ("le" === n)
          for (s = 0, i = 0; s < t.length; s += 3)
            ((o = t[s] | (t[s + 1] << 8) | (t[s + 2] << 16)),
              (this.words[i] |= (o << a) & 0x3ffffff),
              (this.words[i + 1] = (o >>> (26 - a)) & 0x3ffffff),
              (a += 24) >= 26 && ((a -= 26), i++));
        return this._strip();
      }),
      (i.prototype._parseHex = function (t, e, r) {
        ((this.length = Math.ceil((t.length - e) / 6)),
          (this.words = Array(this.length)));
        for (var n, i = 0; i < this.length; i++) this.words[i] = 0;
        var o = 0,
          a = 0;
        if ("be" === r)
          for (i = t.length - 1; i >= e; i -= 2)
            ((n = s(t, e, i) << o),
              (this.words[a] |= 0x3ffffff & n),
              o >= 18
                ? ((o -= 18), (a += 1), (this.words[a] |= n >>> 26))
                : (o += 8));
        else
          for (i = (t.length - e) % 2 == 0 ? e + 1 : e; i < t.length; i += 2)
            ((n = s(t, e, i) << o),
              (this.words[a] |= 0x3ffffff & n),
              o >= 18
                ? ((o -= 18), (a += 1), (this.words[a] |= n >>> 26))
                : (o += 8));
        this._strip();
      }),
      (i.prototype._parseBase = function (t, e, r) {
        ((this.words = [0]), (this.length = 1));
        for (var n = 0, i = 1; i <= 0x3ffffff; i *= e) n++;
        (n--, (i = (i / e) | 0));
        for (
          var o = t.length - r,
            s = o % n,
            u = Math.min(o, o - s) + r,
            l = 0,
            h = r;
          h < u;
          h += n
        )
          ((l = a(t, h, h + n, e)),
            this.imuln(i),
            this.words[0] + l < 0x4000000
              ? (this.words[0] += l)
              : this._iaddn(l));
        if (0 !== s) {
          var c = 1;
          for (l = a(t, h, t.length, e), h = 0; h < s; h++) c *= e;
          (this.imuln(c),
            this.words[0] + l < 0x4000000
              ? (this.words[0] += l)
              : this._iaddn(l));
        }
        this._strip();
      }),
      (i.prototype.copy = function (t) {
        t.words = Array(this.length);
        for (var e = 0; e < this.length; e++) t.words[e] = this.words[e];
        ((t.length = this.length),
          (t.negative = this.negative),
          (t.red = this.red));
      }),
      (i.prototype._move = function (t) {
        u(t, this);
      }),
      (i.prototype.clone = function () {
        var t = new i(null);
        return (this.copy(t), t);
      }),
      (i.prototype._expand = function (t) {
        for (; this.length < t; ) this.words[this.length++] = 0;
        return this;
      }),
      (i.prototype._strip = function () {
        for (; this.length > 1 && 0 === this.words[this.length - 1]; )
          this.length--;
        return this._normSign();
      }),
      (i.prototype._normSign = function () {
        return (
          1 === this.length && 0 === this.words[0] && (this.negative = 0),
          this
        );
      }),
      "u" > typeof Symbol && "function" == typeof Symbol.for)
    )
      try {
        i.prototype[Symbol.for("nodejs.util.inspect.custom")] = l;
      } catch (t) {
        i.prototype.inspect = l;
      }
    else i.prototype.inspect = l;
    function l() {
      return (this.red ? "<BN-R: " : "<BN: ") + this.toString(16) + ">";
    }
    var h,
      c = [
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
      d = [
        0, 0, 25, 16, 12, 11, 10, 9, 8, 8, 7, 7, 7, 7, 6, 6, 6, 6, 6, 6, 6, 5,
        5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5,
      ],
      f = [
        0, 0, 0x2000000, 0x290d741, 0x1000000, 0x2e90edd, 0x39aa400, 0x267bf47,
        0x1000000, 0x290d741, 1e7, 0x12959c3, 0x222c000, 0x3bd7765, 7529536,
        0xadcea1, 0x1000000, 0x1704f61, 0x206fc40, 0x2cddcf9, 64e6, 4084101,
        5153632, 6436343, 7962624, 9765625, 0xb54ba0, 0xdaf26b, 0x1069c00,
        0x138f9ad, 243e5, 0x1b4d89f, 0x2000000, 0x25528a1, 0x2b54a20, 0x3216b93,
        0x39aa400,
      ];
    function p(t, e, r) {
      r.negative = e.negative ^ t.negative;
      var n = (t.length + e.length) | 0;
      ((r.length = n), (n = (n - 1) | 0));
      var i = 0 | t.words[0],
        o = 0 | e.words[0],
        s = i * o,
        a = 0x3ffffff & s,
        u = (s / 0x4000000) | 0;
      r.words[0] = a;
      for (var l = 1; l < n; l++) {
        for (
          var h = u >>> 26,
            c = 0x3ffffff & u,
            d = Math.min(l, e.length - 1),
            f = Math.max(0, l - t.length + 1);
          f <= d;
          f++
        ) {
          var p = (l - f) | 0;
          ((h +=
            ((s = (i = 0 | t.words[p]) * (o = 0 | e.words[f]) + c) /
              0x4000000) |
            0),
            (c = 0x3ffffff & s));
        }
        ((r.words[l] = 0 | c), (u = 0 | h));
      }
      return (0 !== u ? (r.words[l] = 0 | u) : r.length--, r._strip());
    }
    ((i.prototype.toString = function (t, e) {
      if (((e = 0 | e || 1), 16 === (t = t || 10) || "hex" === t)) {
        for (var n = "", i = 0, o = 0, s = 0; s < this.length; s++) {
          var a = this.words[s],
            u = (((a << i) | o) & 0xffffff).toString(16);
          ((o = (a >>> (24 - i)) & 0xffffff),
            (i += 2) >= 26 && ((i -= 26), s--),
            (n =
              0 !== o || s !== this.length - 1
                ? c[6 - u.length] + u + n
                : u + n));
        }
        for (0 !== o && (n = o.toString(16) + n); n.length % e != 0; )
          n = "0" + n;
        return (0 !== this.negative && (n = "-" + n), n);
      }
      if (t === (0 | t) && t >= 2 && t <= 36) {
        var l = d[t],
          h = f[t];
        n = "";
        var p = this.clone();
        for (p.negative = 0; !p.isZero(); ) {
          var m = p.modrn(h).toString(t);
          n = (p = p.idivn(h)).isZero() ? m + n : c[l - m.length] + m + n;
        }
        for (this.isZero() && (n = "0" + n); n.length % e != 0; ) n = "0" + n;
        return (0 !== this.negative && (n = "-" + n), n);
      }
      r(!1, "Base should be between 2 and 36");
    }),
      (i.prototype.toNumber = function () {
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
      (i.prototype.toJSON = function () {
        return this.toString(16, 2);
      }),
      h &&
        (i.prototype.toBuffer = function (t, e) {
          return this.toArrayLike(h, t, e);
        }),
      (i.prototype.toArray = function (t, e) {
        return this.toArrayLike(Array, t, e);
      }),
      (i.prototype.toArrayLike = function (t, e, n) {
        this._strip();
        var i = this.byteLength(),
          o = n || Math.max(1, i);
        (r(i <= o, "byte array longer than desired length"),
          r(o > 0, "Requested array length <= 0"));
        var s = t.allocUnsafe ? t.allocUnsafe(o) : new t(o);
        return (this["_toArrayLike" + ("le" === e ? "LE" : "BE")](s, i), s);
      }),
      (i.prototype._toArrayLikeLE = function (t, e) {
        for (var r = 0, n = 0, i = 0, o = 0; i < this.length; i++) {
          var s = (this.words[i] << o) | n;
          ((t[r++] = 255 & s),
            r < t.length && (t[r++] = (s >> 8) & 255),
            r < t.length && (t[r++] = (s >> 16) & 255),
            6 === o
              ? (r < t.length && (t[r++] = (s >> 24) & 255), (n = 0), (o = 0))
              : ((n = s >>> 24), (o += 2)));
        }
        if (r < t.length) for (t[r++] = n; r < t.length; ) t[r++] = 0;
      }),
      (i.prototype._toArrayLikeBE = function (t, e) {
        for (var r = t.length - 1, n = 0, i = 0, o = 0; i < this.length; i++) {
          var s = (this.words[i] << o) | n;
          ((t[r--] = 255 & s),
            r >= 0 && (t[r--] = (s >> 8) & 255),
            r >= 0 && (t[r--] = (s >> 16) & 255),
            6 === o
              ? (r >= 0 && (t[r--] = (s >> 24) & 255), (n = 0), (o = 0))
              : ((n = s >>> 24), (o += 2)));
        }
        if (r >= 0) for (t[r--] = n; r >= 0; ) t[r--] = 0;
      }),
      Math.clz32
        ? (i.prototype._countBits = function (t) {
            return 32 - Math.clz32(t);
          })
        : (i.prototype._countBits = function (t) {
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
      (i.prototype._zeroBits = function (t) {
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
      (i.prototype.bitLength = function () {
        var t = this.words[this.length - 1],
          e = this._countBits(t);
        return (this.length - 1) * 26 + e;
      }),
      (i.prototype.zeroBits = function () {
        if (this.isZero()) return 0;
        for (var t = 0, e = 0; e < this.length; e++) {
          var r = this._zeroBits(this.words[e]);
          if (((t += r), 26 !== r)) break;
        }
        return t;
      }),
      (i.prototype.byteLength = function () {
        return Math.ceil(this.bitLength() / 8);
      }),
      (i.prototype.toTwos = function (t) {
        return 0 !== this.negative
          ? this.abs().inotn(t).iaddn(1)
          : this.clone();
      }),
      (i.prototype.fromTwos = function (t) {
        return this.testn(t - 1) ? this.notn(t).iaddn(1).ineg() : this.clone();
      }),
      (i.prototype.isNeg = function () {
        return 0 !== this.negative;
      }),
      (i.prototype.neg = function () {
        return this.clone().ineg();
      }),
      (i.prototype.ineg = function () {
        return (this.isZero() || (this.negative ^= 1), this);
      }),
      (i.prototype.iuor = function (t) {
        for (; this.length < t.length; ) this.words[this.length++] = 0;
        for (var e = 0; e < t.length; e++)
          this.words[e] = this.words[e] | t.words[e];
        return this._strip();
      }),
      (i.prototype.ior = function (t) {
        return (r((this.negative | t.negative) == 0), this.iuor(t));
      }),
      (i.prototype.or = function (t) {
        return this.length > t.length
          ? this.clone().ior(t)
          : t.clone().ior(this);
      }),
      (i.prototype.uor = function (t) {
        return this.length > t.length
          ? this.clone().iuor(t)
          : t.clone().iuor(this);
      }),
      (i.prototype.iuand = function (t) {
        var e;
        e = this.length > t.length ? t : this;
        for (var r = 0; r < e.length; r++)
          this.words[r] = this.words[r] & t.words[r];
        return ((this.length = e.length), this._strip());
      }),
      (i.prototype.iand = function (t) {
        return (r((this.negative | t.negative) == 0), this.iuand(t));
      }),
      (i.prototype.and = function (t) {
        return this.length > t.length
          ? this.clone().iand(t)
          : t.clone().iand(this);
      }),
      (i.prototype.uand = function (t) {
        return this.length > t.length
          ? this.clone().iuand(t)
          : t.clone().iuand(this);
      }),
      (i.prototype.iuxor = function (t) {
        this.length > t.length ? ((e = this), (r = t)) : ((e = t), (r = this));
        for (var e, r, n = 0; n < r.length; n++)
          this.words[n] = e.words[n] ^ r.words[n];
        if (this !== e) for (; n < e.length; n++) this.words[n] = e.words[n];
        return ((this.length = e.length), this._strip());
      }),
      (i.prototype.ixor = function (t) {
        return (r((this.negative | t.negative) == 0), this.iuxor(t));
      }),
      (i.prototype.xor = function (t) {
        return this.length > t.length
          ? this.clone().ixor(t)
          : t.clone().ixor(this);
      }),
      (i.prototype.uxor = function (t) {
        return this.length > t.length
          ? this.clone().iuxor(t)
          : t.clone().iuxor(this);
      }),
      (i.prototype.inotn = function (t) {
        r("number" == typeof t && t >= 0);
        var e = 0 | Math.ceil(t / 26),
          n = t % 26;
        (this._expand(e), n > 0 && e--);
        for (var i = 0; i < e; i++) this.words[i] = 0x3ffffff & ~this.words[i];
        return (
          n > 0 && (this.words[i] = ~this.words[i] & (0x3ffffff >> (26 - n))),
          this._strip()
        );
      }),
      (i.prototype.notn = function (t) {
        return this.clone().inotn(t);
      }),
      (i.prototype.setn = function (t, e) {
        r("number" == typeof t && t >= 0);
        var n = (t / 26) | 0,
          i = t % 26;
        return (
          this._expand(n + 1),
          e
            ? (this.words[n] = this.words[n] | (1 << i))
            : (this.words[n] = this.words[n] & ~(1 << i)),
          this._strip()
        );
      }),
      (i.prototype.iadd = function (t) {
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
        this.length > t.length ? ((r = this), (n = t)) : ((r = t), (n = this));
        for (var e, r, n, i = 0, o = 0; o < n.length; o++)
          ((e = (0 | r.words[o]) + (0 | n.words[o]) + i),
            (this.words[o] = 0x3ffffff & e),
            (i = e >>> 26));
        for (; 0 !== i && o < r.length; o++)
          ((e = (0 | r.words[o]) + i),
            (this.words[o] = 0x3ffffff & e),
            (i = e >>> 26));
        if (((this.length = r.length), 0 !== i))
          ((this.words[this.length] = i), this.length++);
        else if (r !== this)
          for (; o < r.length; o++) this.words[o] = r.words[o];
        return this;
      }),
      (i.prototype.add = function (t) {
        var e;
        return 0 !== t.negative && 0 === this.negative
          ? ((t.negative = 0), (e = this.sub(t)), (t.negative ^= 1), e)
          : 0 === t.negative && 0 !== this.negative
            ? ((this.negative = 0), (e = t.sub(this)), (this.negative = 1), e)
            : this.length > t.length
              ? this.clone().iadd(t)
              : t.clone().iadd(this);
      }),
      (i.prototype.isub = function (t) {
        if (0 !== t.negative) {
          t.negative = 0;
          var e,
            r,
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
        var i = this.cmp(t);
        if (0 === i)
          return (
            (this.negative = 0),
            (this.length = 1),
            (this.words[0] = 0),
            this
          );
        i > 0 ? ((e = this), (r = t)) : ((e = t), (r = this));
        for (var o = 0, s = 0; s < r.length; s++)
          ((o = (n = (0 | e.words[s]) - (0 | r.words[s]) + o) >> 26),
            (this.words[s] = 0x3ffffff & n));
        for (; 0 !== o && s < e.length; s++)
          ((o = (n = (0 | e.words[s]) + o) >> 26),
            (this.words[s] = 0x3ffffff & n));
        if (0 === o && s < e.length && e !== this)
          for (; s < e.length; s++) this.words[s] = e.words[s];
        return (
          (this.length = Math.max(this.length, s)),
          e !== this && (this.negative = 1),
          this._strip()
        );
      }),
      (i.prototype.sub = function (t) {
        return this.clone().isub(t);
      }));
    var m = function (t, e, r) {
      var n,
        i,
        o,
        s = t.words,
        a = e.words,
        u = r.words,
        l = 0,
        h = 0 | s[0],
        c = 8191 & h,
        d = h >>> 13,
        f = 0 | s[1],
        p = 8191 & f,
        m = f >>> 13,
        _ = 0 | s[2],
        g = 8191 & _,
        y = _ >>> 13,
        w = 0 | s[3],
        v = 8191 & w,
        b = w >>> 13,
        R = 0 | s[4],
        E = 8191 & R,
        A = R >>> 13,
        O = 0 | s[5],
        T = 8191 & O,
        N = O >>> 13,
        M = 0 | s[6],
        I = 8191 & M,
        x = M >>> 13,
        C = 0 | s[7],
        S = 8191 & C,
        k = C >>> 13,
        L = 0 | s[8],
        D = 8191 & L,
        P = L >>> 13,
        U = 0 | s[9],
        B = 8191 & U,
        z = U >>> 13,
        H = 0 | a[0],
        G = 8191 & H,
        j = H >>> 13,
        V = 0 | a[1],
        F = 8191 & V,
        K = V >>> 13,
        Z = 0 | a[2],
        q = 8191 & Z,
        $ = Z >>> 13,
        W = 0 | a[3],
        X = 8191 & W,
        Y = W >>> 13,
        Q = 0 | a[4],
        J = 8191 & Q,
        tt = Q >>> 13,
        te = 0 | a[5],
        tr = 8191 & te,
        tn = te >>> 13,
        ti = 0 | a[6],
        to = 8191 & ti,
        ts = ti >>> 13,
        ta = 0 | a[7],
        tu = 8191 & ta,
        tl = ta >>> 13,
        th = 0 | a[8],
        tc = 8191 & th,
        td = th >>> 13,
        tf = 0 | a[9],
        tp = 8191 & tf,
        tm = tf >>> 13;
      ((r.negative = t.negative ^ e.negative),
        (r.length = 19),
        (n = Math.imul(c, G)));
      var t_ =
        (((l + n) | 0) +
          ((8191 & (i = ((i = Math.imul(c, j)) + Math.imul(d, G)) | 0)) <<
            13)) |
        0;
      ((l = ((((o = Math.imul(d, j)) + (i >>> 13)) | 0) + (t_ >>> 26)) | 0),
        (t_ &= 0x3ffffff),
        (n = Math.imul(p, G)),
        (i = ((i = Math.imul(p, j)) + Math.imul(m, G)) | 0),
        (o = Math.imul(m, j)),
        (n = (n + Math.imul(c, F)) | 0));
      var tg =
        (((l + n) | 0) +
          ((8191 &
            (i = ((i = (i + Math.imul(c, K)) | 0) + Math.imul(d, F)) | 0)) <<
            13)) |
        0;
      ((l =
        ((((o = (o + Math.imul(d, K)) | 0) + (i >>> 13)) | 0) + (tg >>> 26)) |
        0),
        (tg &= 0x3ffffff),
        (n = Math.imul(g, G)),
        (i = ((i = Math.imul(g, j)) + Math.imul(y, G)) | 0),
        (o = Math.imul(y, j)),
        (n = (n + Math.imul(p, F)) | 0),
        (i = ((i = (i + Math.imul(p, K)) | 0) + Math.imul(m, F)) | 0),
        (o = (o + Math.imul(m, K)) | 0),
        (n = (n + Math.imul(c, q)) | 0));
      var ty =
        (((l + n) | 0) +
          ((8191 &
            (i = ((i = (i + Math.imul(c, $)) | 0) + Math.imul(d, q)) | 0)) <<
            13)) |
        0;
      ((l =
        ((((o = (o + Math.imul(d, $)) | 0) + (i >>> 13)) | 0) + (ty >>> 26)) |
        0),
        (ty &= 0x3ffffff),
        (n = Math.imul(v, G)),
        (i = ((i = Math.imul(v, j)) + Math.imul(b, G)) | 0),
        (o = Math.imul(b, j)),
        (n = (n + Math.imul(g, F)) | 0),
        (i = ((i = (i + Math.imul(g, K)) | 0) + Math.imul(y, F)) | 0),
        (o = (o + Math.imul(y, K)) | 0),
        (n = (n + Math.imul(p, q)) | 0),
        (i = ((i = (i + Math.imul(p, $)) | 0) + Math.imul(m, q)) | 0),
        (o = (o + Math.imul(m, $)) | 0),
        (n = (n + Math.imul(c, X)) | 0));
      var tw =
        (((l + n) | 0) +
          ((8191 &
            (i = ((i = (i + Math.imul(c, Y)) | 0) + Math.imul(d, X)) | 0)) <<
            13)) |
        0;
      ((l =
        ((((o = (o + Math.imul(d, Y)) | 0) + (i >>> 13)) | 0) + (tw >>> 26)) |
        0),
        (tw &= 0x3ffffff),
        (n = Math.imul(E, G)),
        (i = ((i = Math.imul(E, j)) + Math.imul(A, G)) | 0),
        (o = Math.imul(A, j)),
        (n = (n + Math.imul(v, F)) | 0),
        (i = ((i = (i + Math.imul(v, K)) | 0) + Math.imul(b, F)) | 0),
        (o = (o + Math.imul(b, K)) | 0),
        (n = (n + Math.imul(g, q)) | 0),
        (i = ((i = (i + Math.imul(g, $)) | 0) + Math.imul(y, q)) | 0),
        (o = (o + Math.imul(y, $)) | 0),
        (n = (n + Math.imul(p, X)) | 0),
        (i = ((i = (i + Math.imul(p, Y)) | 0) + Math.imul(m, X)) | 0),
        (o = (o + Math.imul(m, Y)) | 0),
        (n = (n + Math.imul(c, J)) | 0));
      var tv =
        (((l + n) | 0) +
          ((8191 &
            (i = ((i = (i + Math.imul(c, tt)) | 0) + Math.imul(d, J)) | 0)) <<
            13)) |
        0;
      ((l =
        ((((o = (o + Math.imul(d, tt)) | 0) + (i >>> 13)) | 0) + (tv >>> 26)) |
        0),
        (tv &= 0x3ffffff),
        (n = Math.imul(T, G)),
        (i = ((i = Math.imul(T, j)) + Math.imul(N, G)) | 0),
        (o = Math.imul(N, j)),
        (n = (n + Math.imul(E, F)) | 0),
        (i = ((i = (i + Math.imul(E, K)) | 0) + Math.imul(A, F)) | 0),
        (o = (o + Math.imul(A, K)) | 0),
        (n = (n + Math.imul(v, q)) | 0),
        (i = ((i = (i + Math.imul(v, $)) | 0) + Math.imul(b, q)) | 0),
        (o = (o + Math.imul(b, $)) | 0),
        (n = (n + Math.imul(g, X)) | 0),
        (i = ((i = (i + Math.imul(g, Y)) | 0) + Math.imul(y, X)) | 0),
        (o = (o + Math.imul(y, Y)) | 0),
        (n = (n + Math.imul(p, J)) | 0),
        (i = ((i = (i + Math.imul(p, tt)) | 0) + Math.imul(m, J)) | 0),
        (o = (o + Math.imul(m, tt)) | 0),
        (n = (n + Math.imul(c, tr)) | 0));
      var tb =
        (((l + n) | 0) +
          ((8191 &
            (i = ((i = (i + Math.imul(c, tn)) | 0) + Math.imul(d, tr)) | 0)) <<
            13)) |
        0;
      ((l =
        ((((o = (o + Math.imul(d, tn)) | 0) + (i >>> 13)) | 0) + (tb >>> 26)) |
        0),
        (tb &= 0x3ffffff),
        (n = Math.imul(I, G)),
        (i = ((i = Math.imul(I, j)) + Math.imul(x, G)) | 0),
        (o = Math.imul(x, j)),
        (n = (n + Math.imul(T, F)) | 0),
        (i = ((i = (i + Math.imul(T, K)) | 0) + Math.imul(N, F)) | 0),
        (o = (o + Math.imul(N, K)) | 0),
        (n = (n + Math.imul(E, q)) | 0),
        (i = ((i = (i + Math.imul(E, $)) | 0) + Math.imul(A, q)) | 0),
        (o = (o + Math.imul(A, $)) | 0),
        (n = (n + Math.imul(v, X)) | 0),
        (i = ((i = (i + Math.imul(v, Y)) | 0) + Math.imul(b, X)) | 0),
        (o = (o + Math.imul(b, Y)) | 0),
        (n = (n + Math.imul(g, J)) | 0),
        (i = ((i = (i + Math.imul(g, tt)) | 0) + Math.imul(y, J)) | 0),
        (o = (o + Math.imul(y, tt)) | 0),
        (n = (n + Math.imul(p, tr)) | 0),
        (i = ((i = (i + Math.imul(p, tn)) | 0) + Math.imul(m, tr)) | 0),
        (o = (o + Math.imul(m, tn)) | 0),
        (n = (n + Math.imul(c, to)) | 0));
      var tR =
        (((l + n) | 0) +
          ((8191 &
            (i = ((i = (i + Math.imul(c, ts)) | 0) + Math.imul(d, to)) | 0)) <<
            13)) |
        0;
      ((l =
        ((((o = (o + Math.imul(d, ts)) | 0) + (i >>> 13)) | 0) + (tR >>> 26)) |
        0),
        (tR &= 0x3ffffff),
        (n = Math.imul(S, G)),
        (i = ((i = Math.imul(S, j)) + Math.imul(k, G)) | 0),
        (o = Math.imul(k, j)),
        (n = (n + Math.imul(I, F)) | 0),
        (i = ((i = (i + Math.imul(I, K)) | 0) + Math.imul(x, F)) | 0),
        (o = (o + Math.imul(x, K)) | 0),
        (n = (n + Math.imul(T, q)) | 0),
        (i = ((i = (i + Math.imul(T, $)) | 0) + Math.imul(N, q)) | 0),
        (o = (o + Math.imul(N, $)) | 0),
        (n = (n + Math.imul(E, X)) | 0),
        (i = ((i = (i + Math.imul(E, Y)) | 0) + Math.imul(A, X)) | 0),
        (o = (o + Math.imul(A, Y)) | 0),
        (n = (n + Math.imul(v, J)) | 0),
        (i = ((i = (i + Math.imul(v, tt)) | 0) + Math.imul(b, J)) | 0),
        (o = (o + Math.imul(b, tt)) | 0),
        (n = (n + Math.imul(g, tr)) | 0),
        (i = ((i = (i + Math.imul(g, tn)) | 0) + Math.imul(y, tr)) | 0),
        (o = (o + Math.imul(y, tn)) | 0),
        (n = (n + Math.imul(p, to)) | 0),
        (i = ((i = (i + Math.imul(p, ts)) | 0) + Math.imul(m, to)) | 0),
        (o = (o + Math.imul(m, ts)) | 0),
        (n = (n + Math.imul(c, tu)) | 0));
      var tE =
        (((l + n) | 0) +
          ((8191 &
            (i = ((i = (i + Math.imul(c, tl)) | 0) + Math.imul(d, tu)) | 0)) <<
            13)) |
        0;
      ((l =
        ((((o = (o + Math.imul(d, tl)) | 0) + (i >>> 13)) | 0) + (tE >>> 26)) |
        0),
        (tE &= 0x3ffffff),
        (n = Math.imul(D, G)),
        (i = ((i = Math.imul(D, j)) + Math.imul(P, G)) | 0),
        (o = Math.imul(P, j)),
        (n = (n + Math.imul(S, F)) | 0),
        (i = ((i = (i + Math.imul(S, K)) | 0) + Math.imul(k, F)) | 0),
        (o = (o + Math.imul(k, K)) | 0),
        (n = (n + Math.imul(I, q)) | 0),
        (i = ((i = (i + Math.imul(I, $)) | 0) + Math.imul(x, q)) | 0),
        (o = (o + Math.imul(x, $)) | 0),
        (n = (n + Math.imul(T, X)) | 0),
        (i = ((i = (i + Math.imul(T, Y)) | 0) + Math.imul(N, X)) | 0),
        (o = (o + Math.imul(N, Y)) | 0),
        (n = (n + Math.imul(E, J)) | 0),
        (i = ((i = (i + Math.imul(E, tt)) | 0) + Math.imul(A, J)) | 0),
        (o = (o + Math.imul(A, tt)) | 0),
        (n = (n + Math.imul(v, tr)) | 0),
        (i = ((i = (i + Math.imul(v, tn)) | 0) + Math.imul(b, tr)) | 0),
        (o = (o + Math.imul(b, tn)) | 0),
        (n = (n + Math.imul(g, to)) | 0),
        (i = ((i = (i + Math.imul(g, ts)) | 0) + Math.imul(y, to)) | 0),
        (o = (o + Math.imul(y, ts)) | 0),
        (n = (n + Math.imul(p, tu)) | 0),
        (i = ((i = (i + Math.imul(p, tl)) | 0) + Math.imul(m, tu)) | 0),
        (o = (o + Math.imul(m, tl)) | 0),
        (n = (n + Math.imul(c, tc)) | 0));
      var tA =
        (((l + n) | 0) +
          ((8191 &
            (i = ((i = (i + Math.imul(c, td)) | 0) + Math.imul(d, tc)) | 0)) <<
            13)) |
        0;
      ((l =
        ((((o = (o + Math.imul(d, td)) | 0) + (i >>> 13)) | 0) + (tA >>> 26)) |
        0),
        (tA &= 0x3ffffff),
        (n = Math.imul(B, G)),
        (i = ((i = Math.imul(B, j)) + Math.imul(z, G)) | 0),
        (o = Math.imul(z, j)),
        (n = (n + Math.imul(D, F)) | 0),
        (i = ((i = (i + Math.imul(D, K)) | 0) + Math.imul(P, F)) | 0),
        (o = (o + Math.imul(P, K)) | 0),
        (n = (n + Math.imul(S, q)) | 0),
        (i = ((i = (i + Math.imul(S, $)) | 0) + Math.imul(k, q)) | 0),
        (o = (o + Math.imul(k, $)) | 0),
        (n = (n + Math.imul(I, X)) | 0),
        (i = ((i = (i + Math.imul(I, Y)) | 0) + Math.imul(x, X)) | 0),
        (o = (o + Math.imul(x, Y)) | 0),
        (n = (n + Math.imul(T, J)) | 0),
        (i = ((i = (i + Math.imul(T, tt)) | 0) + Math.imul(N, J)) | 0),
        (o = (o + Math.imul(N, tt)) | 0),
        (n = (n + Math.imul(E, tr)) | 0),
        (i = ((i = (i + Math.imul(E, tn)) | 0) + Math.imul(A, tr)) | 0),
        (o = (o + Math.imul(A, tn)) | 0),
        (n = (n + Math.imul(v, to)) | 0),
        (i = ((i = (i + Math.imul(v, ts)) | 0) + Math.imul(b, to)) | 0),
        (o = (o + Math.imul(b, ts)) | 0),
        (n = (n + Math.imul(g, tu)) | 0),
        (i = ((i = (i + Math.imul(g, tl)) | 0) + Math.imul(y, tu)) | 0),
        (o = (o + Math.imul(y, tl)) | 0),
        (n = (n + Math.imul(p, tc)) | 0),
        (i = ((i = (i + Math.imul(p, td)) | 0) + Math.imul(m, tc)) | 0),
        (o = (o + Math.imul(m, td)) | 0),
        (n = (n + Math.imul(c, tp)) | 0));
      var tO =
        (((l + n) | 0) +
          ((8191 &
            (i = ((i = (i + Math.imul(c, tm)) | 0) + Math.imul(d, tp)) | 0)) <<
            13)) |
        0;
      ((l =
        ((((o = (o + Math.imul(d, tm)) | 0) + (i >>> 13)) | 0) + (tO >>> 26)) |
        0),
        (tO &= 0x3ffffff),
        (n = Math.imul(B, F)),
        (i = ((i = Math.imul(B, K)) + Math.imul(z, F)) | 0),
        (o = Math.imul(z, K)),
        (n = (n + Math.imul(D, q)) | 0),
        (i = ((i = (i + Math.imul(D, $)) | 0) + Math.imul(P, q)) | 0),
        (o = (o + Math.imul(P, $)) | 0),
        (n = (n + Math.imul(S, X)) | 0),
        (i = ((i = (i + Math.imul(S, Y)) | 0) + Math.imul(k, X)) | 0),
        (o = (o + Math.imul(k, Y)) | 0),
        (n = (n + Math.imul(I, J)) | 0),
        (i = ((i = (i + Math.imul(I, tt)) | 0) + Math.imul(x, J)) | 0),
        (o = (o + Math.imul(x, tt)) | 0),
        (n = (n + Math.imul(T, tr)) | 0),
        (i = ((i = (i + Math.imul(T, tn)) | 0) + Math.imul(N, tr)) | 0),
        (o = (o + Math.imul(N, tn)) | 0),
        (n = (n + Math.imul(E, to)) | 0),
        (i = ((i = (i + Math.imul(E, ts)) | 0) + Math.imul(A, to)) | 0),
        (o = (o + Math.imul(A, ts)) | 0),
        (n = (n + Math.imul(v, tu)) | 0),
        (i = ((i = (i + Math.imul(v, tl)) | 0) + Math.imul(b, tu)) | 0),
        (o = (o + Math.imul(b, tl)) | 0),
        (n = (n + Math.imul(g, tc)) | 0),
        (i = ((i = (i + Math.imul(g, td)) | 0) + Math.imul(y, tc)) | 0),
        (o = (o + Math.imul(y, td)) | 0),
        (n = (n + Math.imul(p, tp)) | 0));
      var tT =
        (((l + n) | 0) +
          ((8191 &
            (i = ((i = (i + Math.imul(p, tm)) | 0) + Math.imul(m, tp)) | 0)) <<
            13)) |
        0;
      ((l =
        ((((o = (o + Math.imul(m, tm)) | 0) + (i >>> 13)) | 0) + (tT >>> 26)) |
        0),
        (tT &= 0x3ffffff),
        (n = Math.imul(B, q)),
        (i = ((i = Math.imul(B, $)) + Math.imul(z, q)) | 0),
        (o = Math.imul(z, $)),
        (n = (n + Math.imul(D, X)) | 0),
        (i = ((i = (i + Math.imul(D, Y)) | 0) + Math.imul(P, X)) | 0),
        (o = (o + Math.imul(P, Y)) | 0),
        (n = (n + Math.imul(S, J)) | 0),
        (i = ((i = (i + Math.imul(S, tt)) | 0) + Math.imul(k, J)) | 0),
        (o = (o + Math.imul(k, tt)) | 0),
        (n = (n + Math.imul(I, tr)) | 0),
        (i = ((i = (i + Math.imul(I, tn)) | 0) + Math.imul(x, tr)) | 0),
        (o = (o + Math.imul(x, tn)) | 0),
        (n = (n + Math.imul(T, to)) | 0),
        (i = ((i = (i + Math.imul(T, ts)) | 0) + Math.imul(N, to)) | 0),
        (o = (o + Math.imul(N, ts)) | 0),
        (n = (n + Math.imul(E, tu)) | 0),
        (i = ((i = (i + Math.imul(E, tl)) | 0) + Math.imul(A, tu)) | 0),
        (o = (o + Math.imul(A, tl)) | 0),
        (n = (n + Math.imul(v, tc)) | 0),
        (i = ((i = (i + Math.imul(v, td)) | 0) + Math.imul(b, tc)) | 0),
        (o = (o + Math.imul(b, td)) | 0),
        (n = (n + Math.imul(g, tp)) | 0));
      var tN =
        (((l + n) | 0) +
          ((8191 &
            (i = ((i = (i + Math.imul(g, tm)) | 0) + Math.imul(y, tp)) | 0)) <<
            13)) |
        0;
      ((l =
        ((((o = (o + Math.imul(y, tm)) | 0) + (i >>> 13)) | 0) + (tN >>> 26)) |
        0),
        (tN &= 0x3ffffff),
        (n = Math.imul(B, X)),
        (i = ((i = Math.imul(B, Y)) + Math.imul(z, X)) | 0),
        (o = Math.imul(z, Y)),
        (n = (n + Math.imul(D, J)) | 0),
        (i = ((i = (i + Math.imul(D, tt)) | 0) + Math.imul(P, J)) | 0),
        (o = (o + Math.imul(P, tt)) | 0),
        (n = (n + Math.imul(S, tr)) | 0),
        (i = ((i = (i + Math.imul(S, tn)) | 0) + Math.imul(k, tr)) | 0),
        (o = (o + Math.imul(k, tn)) | 0),
        (n = (n + Math.imul(I, to)) | 0),
        (i = ((i = (i + Math.imul(I, ts)) | 0) + Math.imul(x, to)) | 0),
        (o = (o + Math.imul(x, ts)) | 0),
        (n = (n + Math.imul(T, tu)) | 0),
        (i = ((i = (i + Math.imul(T, tl)) | 0) + Math.imul(N, tu)) | 0),
        (o = (o + Math.imul(N, tl)) | 0),
        (n = (n + Math.imul(E, tc)) | 0),
        (i = ((i = (i + Math.imul(E, td)) | 0) + Math.imul(A, tc)) | 0),
        (o = (o + Math.imul(A, td)) | 0),
        (n = (n + Math.imul(v, tp)) | 0));
      var tM =
        (((l + n) | 0) +
          ((8191 &
            (i = ((i = (i + Math.imul(v, tm)) | 0) + Math.imul(b, tp)) | 0)) <<
            13)) |
        0;
      ((l =
        ((((o = (o + Math.imul(b, tm)) | 0) + (i >>> 13)) | 0) + (tM >>> 26)) |
        0),
        (tM &= 0x3ffffff),
        (n = Math.imul(B, J)),
        (i = ((i = Math.imul(B, tt)) + Math.imul(z, J)) | 0),
        (o = Math.imul(z, tt)),
        (n = (n + Math.imul(D, tr)) | 0),
        (i = ((i = (i + Math.imul(D, tn)) | 0) + Math.imul(P, tr)) | 0),
        (o = (o + Math.imul(P, tn)) | 0),
        (n = (n + Math.imul(S, to)) | 0),
        (i = ((i = (i + Math.imul(S, ts)) | 0) + Math.imul(k, to)) | 0),
        (o = (o + Math.imul(k, ts)) | 0),
        (n = (n + Math.imul(I, tu)) | 0),
        (i = ((i = (i + Math.imul(I, tl)) | 0) + Math.imul(x, tu)) | 0),
        (o = (o + Math.imul(x, tl)) | 0),
        (n = (n + Math.imul(T, tc)) | 0),
        (i = ((i = (i + Math.imul(T, td)) | 0) + Math.imul(N, tc)) | 0),
        (o = (o + Math.imul(N, td)) | 0),
        (n = (n + Math.imul(E, tp)) | 0));
      var tI =
        (((l + n) | 0) +
          ((8191 &
            (i = ((i = (i + Math.imul(E, tm)) | 0) + Math.imul(A, tp)) | 0)) <<
            13)) |
        0;
      ((l =
        ((((o = (o + Math.imul(A, tm)) | 0) + (i >>> 13)) | 0) + (tI >>> 26)) |
        0),
        (tI &= 0x3ffffff),
        (n = Math.imul(B, tr)),
        (i = ((i = Math.imul(B, tn)) + Math.imul(z, tr)) | 0),
        (o = Math.imul(z, tn)),
        (n = (n + Math.imul(D, to)) | 0),
        (i = ((i = (i + Math.imul(D, ts)) | 0) + Math.imul(P, to)) | 0),
        (o = (o + Math.imul(P, ts)) | 0),
        (n = (n + Math.imul(S, tu)) | 0),
        (i = ((i = (i + Math.imul(S, tl)) | 0) + Math.imul(k, tu)) | 0),
        (o = (o + Math.imul(k, tl)) | 0),
        (n = (n + Math.imul(I, tc)) | 0),
        (i = ((i = (i + Math.imul(I, td)) | 0) + Math.imul(x, tc)) | 0),
        (o = (o + Math.imul(x, td)) | 0),
        (n = (n + Math.imul(T, tp)) | 0));
      var tx =
        (((l + n) | 0) +
          ((8191 &
            (i = ((i = (i + Math.imul(T, tm)) | 0) + Math.imul(N, tp)) | 0)) <<
            13)) |
        0;
      ((l =
        ((((o = (o + Math.imul(N, tm)) | 0) + (i >>> 13)) | 0) + (tx >>> 26)) |
        0),
        (tx &= 0x3ffffff),
        (n = Math.imul(B, to)),
        (i = ((i = Math.imul(B, ts)) + Math.imul(z, to)) | 0),
        (o = Math.imul(z, ts)),
        (n = (n + Math.imul(D, tu)) | 0),
        (i = ((i = (i + Math.imul(D, tl)) | 0) + Math.imul(P, tu)) | 0),
        (o = (o + Math.imul(P, tl)) | 0),
        (n = (n + Math.imul(S, tc)) | 0),
        (i = ((i = (i + Math.imul(S, td)) | 0) + Math.imul(k, tc)) | 0),
        (o = (o + Math.imul(k, td)) | 0),
        (n = (n + Math.imul(I, tp)) | 0));
      var tC =
        (((l + n) | 0) +
          ((8191 &
            (i = ((i = (i + Math.imul(I, tm)) | 0) + Math.imul(x, tp)) | 0)) <<
            13)) |
        0;
      ((l =
        ((((o = (o + Math.imul(x, tm)) | 0) + (i >>> 13)) | 0) + (tC >>> 26)) |
        0),
        (tC &= 0x3ffffff),
        (n = Math.imul(B, tu)),
        (i = ((i = Math.imul(B, tl)) + Math.imul(z, tu)) | 0),
        (o = Math.imul(z, tl)),
        (n = (n + Math.imul(D, tc)) | 0),
        (i = ((i = (i + Math.imul(D, td)) | 0) + Math.imul(P, tc)) | 0),
        (o = (o + Math.imul(P, td)) | 0),
        (n = (n + Math.imul(S, tp)) | 0));
      var tS =
        (((l + n) | 0) +
          ((8191 &
            (i = ((i = (i + Math.imul(S, tm)) | 0) + Math.imul(k, tp)) | 0)) <<
            13)) |
        0;
      ((l =
        ((((o = (o + Math.imul(k, tm)) | 0) + (i >>> 13)) | 0) + (tS >>> 26)) |
        0),
        (tS &= 0x3ffffff),
        (n = Math.imul(B, tc)),
        (i = ((i = Math.imul(B, td)) + Math.imul(z, tc)) | 0),
        (o = Math.imul(z, td)),
        (n = (n + Math.imul(D, tp)) | 0));
      var tk =
        (((l + n) | 0) +
          ((8191 &
            (i = ((i = (i + Math.imul(D, tm)) | 0) + Math.imul(P, tp)) | 0)) <<
            13)) |
        0;
      ((l =
        ((((o = (o + Math.imul(P, tm)) | 0) + (i >>> 13)) | 0) + (tk >>> 26)) |
        0),
        (tk &= 0x3ffffff),
        (n = Math.imul(B, tp)));
      var tL =
        (((l + n) | 0) +
          ((8191 & (i = ((i = Math.imul(B, tm)) + Math.imul(z, tp)) | 0)) <<
            13)) |
        0;
      return (
        (l = ((((o = Math.imul(z, tm)) + (i >>> 13)) | 0) + (tL >>> 26)) | 0),
        (tL &= 0x3ffffff),
        (u[0] = t_),
        (u[1] = tg),
        (u[2] = ty),
        (u[3] = tw),
        (u[4] = tv),
        (u[5] = tb),
        (u[6] = tR),
        (u[7] = tE),
        (u[8] = tA),
        (u[9] = tO),
        (u[10] = tT),
        (u[11] = tN),
        (u[12] = tM),
        (u[13] = tI),
        (u[14] = tx),
        (u[15] = tC),
        (u[16] = tS),
        (u[17] = tk),
        (u[18] = tL),
        0 !== l && ((u[19] = l), r.length++),
        r
      );
    };
    function _(t, e, r) {
      ((r.negative = e.negative ^ t.negative),
        (r.length = t.length + e.length));
      for (var n = 0, i = 0, o = 0; o < r.length - 1; o++) {
        var s = i;
        i = 0;
        for (
          var a = 0x3ffffff & n,
            u = Math.min(o, e.length - 1),
            l = Math.max(0, o - t.length + 1);
          l <= u;
          l++
        ) {
          var h = o - l,
            c = (0 | t.words[h]) * (0 | e.words[l]),
            d = 0x3ffffff & c;
          ((s = (s + ((c / 0x4000000) | 0)) | 0),
            (a = 0x3ffffff & (d = (d + a) | 0)),
            (i += (s = (s + (d >>> 26)) | 0) >>> 26),
            (s &= 0x3ffffff));
        }
        ((r.words[o] = a), (n = s), (s = i));
      }
      return (0 !== n ? (r.words[o] = n) : r.length--, r._strip());
    }
    function g(t, e) {
      ((this.x = t), (this.y = e));
    }
    (Math.imul || (m = p),
      (i.prototype.mulTo = function (t, e) {
        var r,
          n = this.length + t.length;
        return (
          10 === this.length && 10 === t.length
            ? (r = m(this, t, e))
            : n < 63
              ? (r = p(this, t, e))
              : (r = _(this, t, e)),
          r
        );
      }),
      (g.prototype.makeRBT = function (t) {
        for (
          var e = Array(t), r = i.prototype._countBits(t) - 1, n = 0;
          n < t;
          n++
        )
          e[n] = this.revBin(n, r, t);
        return e;
      }),
      (g.prototype.revBin = function (t, e, r) {
        if (0 === t || t === r - 1) return t;
        for (var n = 0, i = 0; i < e; i++)
          ((n |= (1 & t) << (e - i - 1)), (t >>= 1));
        return n;
      }),
      (g.prototype.permute = function (t, e, r, n, i, o) {
        for (var s = 0; s < o; s++) ((n[s] = e[t[s]]), (i[s] = r[t[s]]));
      }),
      (g.prototype.transform = function (t, e, r, n, i, o) {
        this.permute(o, t, e, r, n, i);
        for (var s = 1; s < i; s <<= 1)
          for (
            var a = s << 1,
              u = Math.cos((2 * Math.PI) / a),
              l = Math.sin((2 * Math.PI) / a),
              h = 0;
            h < i;
            h += a
          )
            for (var c = u, d = l, f = 0; f < s; f++) {
              var p = r[h + f],
                m = n[h + f],
                _ = r[h + f + s],
                g = n[h + f + s],
                y = c * _ - d * g;
              ((g = c * g + d * _),
                (_ = y),
                (r[h + f] = p + _),
                (n[h + f] = m + g),
                (r[h + f + s] = p - _),
                (n[h + f + s] = m - g),
                f !== a && ((y = u * c - l * d), (d = u * d + l * c), (c = y)));
            }
      }),
      (g.prototype.guessLen13b = function (t, e) {
        var r = 1 | Math.max(e, t),
          n = 1 & r,
          i = 0;
        for (r = (r / 2) | 0; r; r >>>= 1) i++;
        return 1 << (i + 1 + n);
      }),
      (g.prototype.conjugate = function (t, e, r) {
        if (!(r <= 1))
          for (var n = 0; n < r / 2; n++) {
            var i = t[n];
            ((t[n] = t[r - n - 1]),
              (t[r - n - 1] = i),
              (i = e[n]),
              (e[n] = -e[r - n - 1]),
              (e[r - n - 1] = -i));
          }
      }),
      (g.prototype.normalize13b = function (t, e) {
        for (var r = 0, n = 0; n < e / 2; n++) {
          var i =
            8192 * Math.round(t[2 * n + 1] / e) + Math.round(t[2 * n] / e) + r;
          ((t[n] = 0x3ffffff & i),
            (r = i < 0x4000000 ? 0 : (i / 0x4000000) | 0));
        }
        return t;
      }),
      (g.prototype.convert13b = function (t, e, n, i) {
        for (var o = 0, s = 0; s < e; s++)
          ((o += 0 | t[s]),
            (n[2 * s] = 8191 & o),
            (o >>>= 13),
            (n[2 * s + 1] = 8191 & o),
            (o >>>= 13));
        for (s = 2 * e; s < i; ++s) n[s] = 0;
        (r(0 === o), r((-8192 & o) == 0));
      }),
      (g.prototype.stub = function (t) {
        for (var e = Array(t), r = 0; r < t; r++) e[r] = 0;
        return e;
      }),
      (g.prototype.mulp = function (t, e, r) {
        var n = 2 * this.guessLen13b(t.length, e.length),
          i = this.makeRBT(n),
          o = this.stub(n),
          s = Array(n),
          a = Array(n),
          u = Array(n),
          l = Array(n),
          h = Array(n),
          c = Array(n),
          d = r.words;
        ((d.length = n),
          this.convert13b(t.words, t.length, s, n),
          this.convert13b(e.words, e.length, l, n),
          this.transform(s, o, a, u, n, i),
          this.transform(l, o, h, c, n, i));
        for (var f = 0; f < n; f++) {
          var p = a[f] * h[f] - u[f] * c[f];
          ((u[f] = a[f] * c[f] + u[f] * h[f]), (a[f] = p));
        }
        return (
          this.conjugate(a, u, n),
          this.transform(a, u, d, o, n, i),
          this.conjugate(d, o, n),
          this.normalize13b(d, n),
          (r.negative = t.negative ^ e.negative),
          (r.length = t.length + e.length),
          r._strip()
        );
      }),
      (i.prototype.mul = function (t) {
        var e = new i(null);
        return ((e.words = Array(this.length + t.length)), this.mulTo(t, e));
      }),
      (i.prototype.mulf = function (t) {
        var e = new i(null);
        return ((e.words = Array(this.length + t.length)), _(this, t, e));
      }),
      (i.prototype.imul = function (t) {
        return this.clone().mulTo(t, this);
      }),
      (i.prototype.imuln = function (t) {
        var e = t < 0;
        (e && (t = -t), r("number" == typeof t), r(t < 0x4000000));
        for (var n = 0, i = 0; i < this.length; i++) {
          var o = (0 | this.words[i]) * t,
            s = (0x3ffffff & o) + (0x3ffffff & n);
          ((n >>= 26),
            (n += ((o / 0x4000000) | 0) + (s >>> 26)),
            (this.words[i] = 0x3ffffff & s));
        }
        return (
          0 !== n && ((this.words[i] = n), this.length++),
          (this.length = 0 === t ? 1 : this.length),
          e ? this.ineg() : this
        );
      }),
      (i.prototype.muln = function (t) {
        return this.clone().imuln(t);
      }),
      (i.prototype.sqr = function () {
        return this.mul(this);
      }),
      (i.prototype.isqr = function () {
        return this.imul(this.clone());
      }),
      (i.prototype.pow = function (t) {
        var e = (function (t) {
          for (var e = Array(t.bitLength()), r = 0; r < e.length; r++) {
            var n = (r / 26) | 0,
              i = r % 26;
            e[r] = (t.words[n] >>> i) & 1;
          }
          return e;
        })(t);
        if (0 === e.length) return new i(1);
        for (var r = this, n = 0; n < e.length && 0 === e[n]; n++, r = r.sqr());
        if (++n < e.length)
          for (var o = r.sqr(); n < e.length; n++, o = o.sqr())
            0 !== e[n] && (r = r.mul(o));
        return r;
      }),
      (i.prototype.iushln = function (t) {
        r("number" == typeof t && t >= 0);
        var e,
          n = t % 26,
          i = (t - n) / 26,
          o = (0x3ffffff >>> (26 - n)) << (26 - n);
        if (0 !== n) {
          var s = 0;
          for (e = 0; e < this.length; e++) {
            var a = this.words[e] & o,
              u = ((0 | this.words[e]) - a) << n;
            ((this.words[e] = u | s), (s = a >>> (26 - n)));
          }
          s && ((this.words[e] = s), this.length++);
        }
        if (0 !== i) {
          for (e = this.length - 1; e >= 0; e--)
            this.words[e + i] = this.words[e];
          for (e = 0; e < i; e++) this.words[e] = 0;
          this.length += i;
        }
        return this._strip();
      }),
      (i.prototype.ishln = function (t) {
        return (r(0 === this.negative), this.iushln(t));
      }),
      (i.prototype.iushrn = function (t, e, n) {
        r("number" == typeof t && t >= 0);
        var i = e ? (e - (e % 26)) / 26 : 0,
          o = t % 26,
          s = Math.min((t - o) / 26, this.length),
          a = 0x3ffffff ^ ((0x3ffffff >>> o) << o);
        if (((i -= s), (i = Math.max(0, i)), n)) {
          for (var u = 0; u < s; u++) n.words[u] = this.words[u];
          n.length = s;
        }
        if (0 === s);
        else if (this.length > s)
          for (this.length -= s, u = 0; u < this.length; u++)
            this.words[u] = this.words[u + s];
        else ((this.words[0] = 0), (this.length = 1));
        var l = 0;
        for (u = this.length - 1; u >= 0 && (0 !== l || u >= i); u--) {
          var h = 0 | this.words[u];
          ((this.words[u] = (l << (26 - o)) | (h >>> o)), (l = h & a));
        }
        return (
          n && 0 !== l && (n.words[n.length++] = l),
          0 === this.length && ((this.words[0] = 0), (this.length = 1)),
          this._strip()
        );
      }),
      (i.prototype.ishrn = function (t, e, n) {
        return (r(0 === this.negative), this.iushrn(t, e, n));
      }),
      (i.prototype.shln = function (t) {
        return this.clone().ishln(t);
      }),
      (i.prototype.ushln = function (t) {
        return this.clone().iushln(t);
      }),
      (i.prototype.shrn = function (t) {
        return this.clone().ishrn(t);
      }),
      (i.prototype.ushrn = function (t) {
        return this.clone().iushrn(t);
      }),
      (i.prototype.testn = function (t) {
        r("number" == typeof t && t >= 0);
        var e = t % 26,
          n = (t - e) / 26;
        return !(this.length <= n) && !!(this.words[n] & (1 << e));
      }),
      (i.prototype.imaskn = function (t) {
        r("number" == typeof t && t >= 0);
        var e = t % 26,
          n = (t - e) / 26;
        return (r(
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
            0 === this.length && ((this.words[0] = 0), (this.length = 1)),
            this._strip());
      }),
      (i.prototype.maskn = function (t) {
        return this.clone().imaskn(t);
      }),
      (i.prototype.iaddn = function (t) {
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
      (i.prototype._iaddn = function (t) {
        this.words[0] += t;
        for (var e = 0; e < this.length && this.words[e] >= 0x4000000; e++)
          ((this.words[e] -= 0x4000000),
            e === this.length - 1
              ? (this.words[e + 1] = 1)
              : this.words[e + 1]++);
        return ((this.length = Math.max(this.length, e + 1)), this);
      }),
      (i.prototype.isubn = function (t) {
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
      (i.prototype.addn = function (t) {
        return this.clone().iaddn(t);
      }),
      (i.prototype.subn = function (t) {
        return this.clone().isubn(t);
      }),
      (i.prototype.iabs = function () {
        return ((this.negative = 0), this);
      }),
      (i.prototype.abs = function () {
        return this.clone().iabs();
      }),
      (i.prototype._ishlnsubmul = function (t, e, n) {
        var i,
          o,
          s = t.length + n;
        this._expand(s);
        var a = 0;
        for (i = 0; i < t.length; i++) {
          o = (0 | this.words[i + n]) + a;
          var u = (0 | t.words[i]) * e;
          ((o -= 0x3ffffff & u),
            (a = (o >> 26) - ((u / 0x4000000) | 0)),
            (this.words[i + n] = 0x3ffffff & o));
        }
        for (; i < this.length - n; i++)
          ((a = (o = (0 | this.words[i + n]) + a) >> 26),
            (this.words[i + n] = 0x3ffffff & o));
        if (0 === a) return this._strip();
        for (r(-1 === a), a = 0, i = 0; i < this.length; i++)
          ((a = (o = -(0 | this.words[i]) + a) >> 26),
            (this.words[i] = 0x3ffffff & o));
        return ((this.negative = 1), this._strip());
      }),
      (i.prototype._wordDiv = function (t, e) {
        var r,
          n = this.length - t.length,
          o = this.clone(),
          s = t,
          a = 0 | s.words[s.length - 1];
        0 != (n = 26 - this._countBits(a)) &&
          ((s = s.ushln(n)), o.iushln(n), (a = 0 | s.words[s.length - 1]));
        var u = o.length - s.length;
        if ("mod" !== e) {
          (((r = new i(null)).length = u + 1), (r.words = Array(r.length)));
          for (var l = 0; l < r.length; l++) r.words[l] = 0;
        }
        var h = o.clone()._ishlnsubmul(s, 1, u);
        0 === h.negative && ((o = h), r && (r.words[u] = 1));
        for (var c = u - 1; c >= 0; c--) {
          var d =
            (0 | o.words[s.length + c]) * 0x4000000 +
            (0 | o.words[s.length + c - 1]);
          for (
            d = Math.min((d / a) | 0, 0x3ffffff), o._ishlnsubmul(s, d, c);
            0 !== o.negative;

          )
            (d--,
              (o.negative = 0),
              o._ishlnsubmul(s, 1, c),
              o.isZero() || (o.negative ^= 1));
          r && (r.words[c] = d);
        }
        return (
          r && r._strip(),
          o._strip(),
          "div" !== e && 0 !== n && o.iushrn(n),
          { div: r || null, mod: o }
        );
      }),
      (i.prototype.divmod = function (t, e, n) {
        var o, s, a;
        return (r(!t.isZero()), this.isZero())
          ? { div: new i(0), mod: new i(0) }
          : 0 !== this.negative && 0 === t.negative
            ? ((a = this.neg().divmod(t, e)),
              "mod" !== e && (o = a.div.neg()),
              "div" !== e &&
                ((s = a.mod.neg()), n && 0 !== s.negative && s.iadd(t)),
              { div: o, mod: s })
            : 0 === this.negative && 0 !== t.negative
              ? ((a = this.divmod(t.neg(), e)),
                "mod" !== e && (o = a.div.neg()),
                { div: o, mod: a.mod })
              : (this.negative & t.negative) != 0
                ? ((a = this.neg().divmod(t.neg(), e)),
                  "div" !== e &&
                    ((s = a.mod.neg()), n && 0 !== s.negative && s.isub(t)),
                  { div: a.div, mod: s })
                : t.length > this.length || 0 > this.cmp(t)
                  ? { div: new i(0), mod: this }
                  : 1 === t.length
                    ? "div" === e
                      ? { div: this.divn(t.words[0]), mod: null }
                      : "mod" === e
                        ? { div: null, mod: new i(this.modrn(t.words[0])) }
                        : {
                            div: this.divn(t.words[0]),
                            mod: new i(this.modrn(t.words[0])),
                          }
                    : this._wordDiv(t, e);
      }),
      (i.prototype.div = function (t) {
        return this.divmod(t, "div", !1).div;
      }),
      (i.prototype.mod = function (t) {
        return this.divmod(t, "mod", !1).mod;
      }),
      (i.prototype.umod = function (t) {
        return this.divmod(t, "mod", !0).mod;
      }),
      (i.prototype.divRound = function (t) {
        var e = this.divmod(t);
        if (e.mod.isZero()) return e.div;
        var r = 0 !== e.div.negative ? e.mod.isub(t) : e.mod,
          n = t.ushrn(1),
          i = t.andln(1),
          o = r.cmp(n);
        return o < 0 || (1 === i && 0 === o)
          ? e.div
          : 0 !== e.div.negative
            ? e.div.isubn(1)
            : e.div.iaddn(1);
      }),
      (i.prototype.modrn = function (t) {
        var e = t < 0;
        (e && (t = -t), r(t <= 0x3ffffff));
        for (var n = 0x4000000 % t, i = 0, o = this.length - 1; o >= 0; o--)
          i = (n * i + (0 | this.words[o])) % t;
        return e ? -i : i;
      }),
      (i.prototype.modn = function (t) {
        return this.modrn(t);
      }),
      (i.prototype.idivn = function (t) {
        var e = t < 0;
        (e && (t = -t), r(t <= 0x3ffffff));
        for (var n = 0, i = this.length - 1; i >= 0; i--) {
          var o = (0 | this.words[i]) + 0x4000000 * n;
          ((this.words[i] = (o / t) | 0), (n = o % t));
        }
        return (this._strip(), e ? this.ineg() : this);
      }),
      (i.prototype.divn = function (t) {
        return this.clone().idivn(t);
      }),
      (i.prototype.egcd = function (t) {
        (r(0 === t.negative), r(!t.isZero()));
        var e = this,
          n = t.clone();
        e = 0 !== e.negative ? e.umod(t) : e.clone();
        for (
          var o = new i(1), s = new i(0), a = new i(0), u = new i(1), l = 0;
          e.isEven() && n.isEven();

        )
          (e.iushrn(1), n.iushrn(1), ++l);
        for (var h = n.clone(), c = e.clone(); !e.isZero(); ) {
          for (var d = 0, f = 1; (e.words[0] & f) == 0 && d < 26; ++d, f <<= 1);
          if (d > 0)
            for (e.iushrn(d); d-- > 0; )
              ((o.isOdd() || s.isOdd()) && (o.iadd(h), s.isub(c)),
                o.iushrn(1),
                s.iushrn(1));
          for (var p = 0, m = 1; (n.words[0] & m) == 0 && p < 26; ++p, m <<= 1);
          if (p > 0)
            for (n.iushrn(p); p-- > 0; )
              ((a.isOdd() || u.isOdd()) && (a.iadd(h), u.isub(c)),
                a.iushrn(1),
                u.iushrn(1));
          e.cmp(n) >= 0
            ? (e.isub(n), o.isub(a), s.isub(u))
            : (n.isub(e), a.isub(o), u.isub(s));
        }
        return { a: a, b: u, gcd: n.iushln(l) };
      }),
      (i.prototype._invmp = function (t) {
        (r(0 === t.negative), r(!t.isZero()));
        var e,
          n = this,
          o = t.clone();
        n = 0 !== n.negative ? n.umod(t) : n.clone();
        for (
          var s = new i(1), a = new i(0), u = o.clone();
          n.cmpn(1) > 0 && o.cmpn(1) > 0;

        ) {
          for (var l = 0, h = 1; (n.words[0] & h) == 0 && l < 26; ++l, h <<= 1);
          if (l > 0)
            for (n.iushrn(l); l-- > 0; ) (s.isOdd() && s.iadd(u), s.iushrn(1));
          for (var c = 0, d = 1; (o.words[0] & d) == 0 && c < 26; ++c, d <<= 1);
          if (c > 0)
            for (o.iushrn(c); c-- > 0; ) (a.isOdd() && a.iadd(u), a.iushrn(1));
          n.cmp(o) >= 0 ? (n.isub(o), s.isub(a)) : (o.isub(n), a.isub(s));
        }
        return (0 > (e = 0 === n.cmpn(1) ? s : a).cmpn(0) && e.iadd(t), e);
      }),
      (i.prototype.gcd = function (t) {
        if (this.isZero()) return t.abs();
        if (t.isZero()) return this.abs();
        var e = this.clone(),
          r = t.clone();
        ((e.negative = 0), (r.negative = 0));
        for (var n = 0; e.isEven() && r.isEven(); n++)
          (e.iushrn(1), r.iushrn(1));
        for (;;) {
          for (; e.isEven(); ) e.iushrn(1);
          for (; r.isEven(); ) r.iushrn(1);
          var i = e.cmp(r);
          if (i < 0) {
            var o = e;
            ((e = r), (r = o));
          } else if (0 === i || 0 === r.cmpn(1)) break;
          e.isub(r);
        }
        return r.iushln(n);
      }),
      (i.prototype.invm = function (t) {
        return this.egcd(t).a.umod(t);
      }),
      (i.prototype.isEven = function () {
        return (1 & this.words[0]) == 0;
      }),
      (i.prototype.isOdd = function () {
        return (1 & this.words[0]) == 1;
      }),
      (i.prototype.andln = function (t) {
        return this.words[0] & t;
      }),
      (i.prototype.bincn = function (t) {
        r("number" == typeof t);
        var e = t % 26,
          n = (t - e) / 26,
          i = 1 << e;
        if (this.length <= n)
          return (this._expand(n + 1), (this.words[n] |= i), this);
        for (var o = i, s = n; 0 !== o && s < this.length; s++) {
          var a = 0 | this.words[s];
          ((a += o), (o = a >>> 26), (a &= 0x3ffffff), (this.words[s] = a));
        }
        return (0 !== o && ((this.words[s] = o), this.length++), this);
      }),
      (i.prototype.isZero = function () {
        return 1 === this.length && 0 === this.words[0];
      }),
      (i.prototype.cmpn = function (t) {
        var e,
          n = t < 0;
        if (0 !== this.negative && !n) return -1;
        if (0 === this.negative && n) return 1;
        if ((this._strip(), this.length > 1)) e = 1;
        else {
          (n && (t = -t), r(t <= 0x3ffffff, "Number is too big"));
          var i = 0 | this.words[0];
          e = i === t ? 0 : i < t ? -1 : 1;
        }
        return 0 !== this.negative ? 0 | -e : e;
      }),
      (i.prototype.cmp = function (t) {
        if (0 !== this.negative && 0 === t.negative) return -1;
        if (0 === this.negative && 0 !== t.negative) return 1;
        var e = this.ucmp(t);
        return 0 !== this.negative ? 0 | -e : e;
      }),
      (i.prototype.ucmp = function (t) {
        if (this.length > t.length) return 1;
        if (this.length < t.length) return -1;
        for (var e = 0, r = this.length - 1; r >= 0; r--) {
          var n = 0 | this.words[r],
            i = 0 | t.words[r];
          if (n !== i) {
            n < i ? (e = -1) : n > i && (e = 1);
            break;
          }
        }
        return e;
      }),
      (i.prototype.gtn = function (t) {
        return 1 === this.cmpn(t);
      }),
      (i.prototype.gt = function (t) {
        return 1 === this.cmp(t);
      }),
      (i.prototype.gten = function (t) {
        return this.cmpn(t) >= 0;
      }),
      (i.prototype.gte = function (t) {
        return this.cmp(t) >= 0;
      }),
      (i.prototype.ltn = function (t) {
        return -1 === this.cmpn(t);
      }),
      (i.prototype.lt = function (t) {
        return -1 === this.cmp(t);
      }),
      (i.prototype.lten = function (t) {
        return 0 >= this.cmpn(t);
      }),
      (i.prototype.lte = function (t) {
        return 0 >= this.cmp(t);
      }),
      (i.prototype.eqn = function (t) {
        return 0 === this.cmpn(t);
      }),
      (i.prototype.eq = function (t) {
        return 0 === this.cmp(t);
      }),
      (i.red = function (t) {
        return new A(t);
      }),
      (i.prototype.toRed = function (t) {
        return (
          r(!this.red, "Already a number in reduction context"),
          r(0 === this.negative, "red works only with positives"),
          t.convertTo(this)._forceRed(t)
        );
      }),
      (i.prototype.fromRed = function () {
        return (
          r(this.red, "fromRed works only with numbers in reduction context"),
          this.red.convertFrom(this)
        );
      }),
      (i.prototype._forceRed = function (t) {
        return ((this.red = t), this);
      }),
      (i.prototype.forceRed = function (t) {
        return (
          r(!this.red, "Already a number in reduction context"),
          this._forceRed(t)
        );
      }),
      (i.prototype.redAdd = function (t) {
        return (
          r(this.red, "redAdd works only with red numbers"),
          this.red.add(this, t)
        );
      }),
      (i.prototype.redIAdd = function (t) {
        return (
          r(this.red, "redIAdd works only with red numbers"),
          this.red.iadd(this, t)
        );
      }),
      (i.prototype.redSub = function (t) {
        return (
          r(this.red, "redSub works only with red numbers"),
          this.red.sub(this, t)
        );
      }),
      (i.prototype.redISub = function (t) {
        return (
          r(this.red, "redISub works only with red numbers"),
          this.red.isub(this, t)
        );
      }),
      (i.prototype.redShl = function (t) {
        return (
          r(this.red, "redShl works only with red numbers"),
          this.red.shl(this, t)
        );
      }),
      (i.prototype.redMul = function (t) {
        return (
          r(this.red, "redMul works only with red numbers"),
          this.red._verify2(this, t),
          this.red.mul(this, t)
        );
      }),
      (i.prototype.redIMul = function (t) {
        return (
          r(this.red, "redMul works only with red numbers"),
          this.red._verify2(this, t),
          this.red.imul(this, t)
        );
      }),
      (i.prototype.redSqr = function () {
        return (
          r(this.red, "redSqr works only with red numbers"),
          this.red._verify1(this),
          this.red.sqr(this)
        );
      }),
      (i.prototype.redISqr = function () {
        return (
          r(this.red, "redISqr works only with red numbers"),
          this.red._verify1(this),
          this.red.isqr(this)
        );
      }),
      (i.prototype.redSqrt = function () {
        return (
          r(this.red, "redSqrt works only with red numbers"),
          this.red._verify1(this),
          this.red.sqrt(this)
        );
      }),
      (i.prototype.redInvm = function () {
        return (
          r(this.red, "redInvm works only with red numbers"),
          this.red._verify1(this),
          this.red.invm(this)
        );
      }),
      (i.prototype.redNeg = function () {
        return (
          r(this.red, "redNeg works only with red numbers"),
          this.red._verify1(this),
          this.red.neg(this)
        );
      }),
      (i.prototype.redPow = function (t) {
        return (
          r(this.red && !t.red, "redPow(normalNum)"),
          this.red._verify1(this),
          this.red.pow(this, t)
        );
      }));
    var y = { k256: null, p224: null, p192: null, p25519: null };
    function w(t, e) {
      ((this.name = t),
        (this.p = new i(e, 16)),
        (this.n = this.p.bitLength()),
        (this.k = new i(1).iushln(this.n).isub(this.p)),
        (this.tmp = this._tmp()));
    }
    function v() {
      w.call(
        this,
        "k256",
        "ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffe fffffc2f",
      );
    }
    function b() {
      w.call(
        this,
        "p224",
        "ffffffff ffffffff ffffffff ffffffff 00000000 00000000 00000001",
      );
    }
    function R() {
      w.call(
        this,
        "p192",
        "ffffffff ffffffff ffffffff fffffffe ffffffff ffffffff",
      );
    }
    function E() {
      w.call(
        this,
        "25519",
        "7fffffffffffffff ffffffffffffffff ffffffffffffffff ffffffffffffffed",
      );
    }
    function A(t) {
      if ("string" == typeof t) {
        var e = i._prime(t);
        ((this.m = e.p), (this.prime = e));
      } else
        (r(t.gtn(1), "modulus must be greater than 1"),
          (this.m = t),
          (this.prime = null));
    }
    function O(t) {
      (A.call(this, t),
        (this.shift = this.m.bitLength()),
        this.shift % 26 != 0 && (this.shift += 26 - (this.shift % 26)),
        (this.r = new i(1).iushln(this.shift)),
        (this.r2 = this.imod(this.r.sqr())),
        (this.rinv = this.r._invmp(this.m)),
        (this.minv = this.rinv.mul(this.r).isubn(1).div(this.m)),
        (this.minv = this.minv.umod(this.r)),
        (this.minv = this.r.sub(this.minv)));
    }
    ((w.prototype._tmp = function () {
      var t = new i(null);
      return ((t.words = Array(Math.ceil(this.n / 13))), t);
    }),
      (w.prototype.ireduce = function (t) {
        var e,
          r = t;
        do
          (this.split(r, this.tmp),
            (e = (r = (r = this.imulK(r)).iadd(this.tmp)).bitLength()));
        while (e > this.n);
        var n = e < this.n ? -1 : r.ucmp(this.p);
        return (
          0 === n
            ? ((r.words[0] = 0), (r.length = 1))
            : n > 0
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
      n(v, w),
      (v.prototype.split = function (t, e) {
        for (var r = Math.min(t.length, 9), n = 0; n < r; n++)
          e.words[n] = t.words[n];
        if (((e.length = r), t.length <= 9)) {
          ((t.words[0] = 0), (t.length = 1));
          return;
        }
        var i = t.words[9];
        for (e.words[e.length++] = 4194303 & i, n = 10; n < t.length; n++) {
          var o = 0 | t.words[n];
          ((t.words[n - 10] = ((4194303 & o) << 4) | (i >>> 22)), (i = o));
        }
        ((i >>>= 22),
          (t.words[n - 10] = i),
          0 === i && t.length > 10 ? (t.length -= 10) : (t.length -= 9));
      }),
      (v.prototype.imulK = function (t) {
        ((t.words[t.length] = 0), (t.words[t.length + 1] = 0), (t.length += 2));
        for (var e = 0, r = 0; r < t.length; r++) {
          var n = 0 | t.words[r];
          ((e += 977 * n),
            (t.words[r] = 0x3ffffff & e),
            (e = 64 * n + ((e / 0x4000000) | 0)));
        }
        return (
          0 === t.words[t.length - 1] &&
            (t.length--, 0 === t.words[t.length - 1] && t.length--),
          t
        );
      }),
      n(b, w),
      n(R, w),
      n(E, w),
      (E.prototype.imulK = function (t) {
        for (var e = 0, r = 0; r < t.length; r++) {
          var n = (0 | t.words[r]) * 19 + e,
            i = 0x3ffffff & n;
          ((n >>>= 26), (t.words[r] = i), (e = n));
        }
        return (0 !== e && (t.words[t.length++] = e), t);
      }),
      (i._prime = function (t) {
        var e;
        if (y[t]) return y[t];
        if ("k256" === t) e = new v();
        else if ("p224" === t) e = new b();
        else if ("p192" === t) e = new R();
        else if ("p25519" === t) e = new E();
        else throw Error("Unknown prime " + t);
        return ((y[t] = e), e);
      }),
      (A.prototype._verify1 = function (t) {
        (r(0 === t.negative, "red works only with positives"),
          r(t.red, "red works only with red numbers"));
      }),
      (A.prototype._verify2 = function (t, e) {
        (r((t.negative | e.negative) == 0, "red works only with positives"),
          r(t.red && t.red === e.red, "red works only with red numbers"));
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
        var r = t.add(e);
        return (r.cmp(this.m) >= 0 && r.isub(this.m), r._forceRed(this));
      }),
      (A.prototype.iadd = function (t, e) {
        this._verify2(t, e);
        var r = t.iadd(e);
        return (r.cmp(this.m) >= 0 && r.isub(this.m), r);
      }),
      (A.prototype.sub = function (t, e) {
        this._verify2(t, e);
        var r = t.sub(e);
        return (0 > r.cmpn(0) && r.iadd(this.m), r._forceRed(this));
      }),
      (A.prototype.isub = function (t, e) {
        this._verify2(t, e);
        var r = t.isub(e);
        return (0 > r.cmpn(0) && r.iadd(this.m), r);
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
        if ((r(e % 2 == 1), 3 === e)) {
          var n = this.m.add(new i(1)).iushrn(2);
          return this.pow(t, n);
        }
        for (var o = this.m.subn(1), s = 0; !o.isZero() && 0 === o.andln(1); )
          (s++, o.iushrn(1));
        r(!o.isZero());
        var a = new i(1).toRed(this),
          u = a.redNeg(),
          l = this.m.subn(1).iushrn(1),
          h = this.m.bitLength();
        for (h = new i(2 * h * h).toRed(this); 0 !== this.pow(h, l).cmp(u); )
          h.redIAdd(u);
        for (
          var c = this.pow(h, o),
            d = this.pow(t, o.addn(1).iushrn(1)),
            f = this.pow(t, o),
            p = s;
          0 !== f.cmp(a);

        ) {
          for (var m = f, _ = 0; 0 !== m.cmp(a); _++) m = m.redSqr();
          r(_ < p);
          var g = this.pow(c, new i(1).iushln(p - _ - 1));
          ((d = d.redMul(g)), (c = g.redSqr()), (f = f.redMul(c)), (p = _));
        }
        return d;
      }),
      (A.prototype.invm = function (t) {
        var e = t._invmp(this.m);
        return 0 !== e.negative
          ? ((e.negative = 0), this.imod(e).redNeg())
          : this.imod(e);
      }),
      (A.prototype.pow = function (t, e) {
        if (e.isZero()) return new i(1).toRed(this);
        if (0 === e.cmpn(1)) return t.clone();
        var r = Array(16);
        ((r[0] = new i(1).toRed(this)), (r[1] = t));
        for (var n = 2; n < r.length; n++) r[n] = this.mul(r[n - 1], t);
        var o = r[0],
          s = 0,
          a = 0,
          u = e.bitLength() % 26;
        for (0 === u && (u = 26), n = e.length - 1; n >= 0; n--) {
          for (var l = e.words[n], h = u - 1; h >= 0; h--) {
            var c = (l >> h) & 1;
            if ((o !== r[0] && (o = this.sqr(o)), 0 === c && 0 === s)) {
              a = 0;
              continue;
            }
            ((s <<= 1),
              (s |= c),
              (4 == ++a || (0 === n && 0 === h)) &&
                ((o = this.mul(o, r[s])), (a = 0), (s = 0)));
          }
          u = 26;
        }
        return o;
      }),
      (A.prototype.convertTo = function (t) {
        var e = t.umod(this.m);
        return e === t ? e.clone() : e;
      }),
      (A.prototype.convertFrom = function (t) {
        var e = t.clone();
        return ((e.red = null), e);
      }),
      (i.mont = function (t) {
        return new O(t);
      }),
      n(O, A),
      (O.prototype.convertTo = function (t) {
        return this.imod(t.ushln(this.shift));
      }),
      (O.prototype.convertFrom = function (t) {
        var e = this.imod(t.mul(this.rinv));
        return ((e.red = null), e);
      }),
      (O.prototype.imul = function (t, e) {
        if (t.isZero() || e.isZero())
          return ((t.words[0] = 0), (t.length = 1), t);
        var r = t.imul(e),
          n = r.maskn(this.shift).mul(this.minv).imaskn(this.shift).mul(this.m),
          i = r.isub(n).iushrn(this.shift),
          o = i;
        return (
          i.cmp(this.m) >= 0
            ? (o = i.isub(this.m))
            : 0 > i.cmpn(0) && (o = i.iadd(this.m)),
          o._forceRed(this)
        );
      }),
      (O.prototype.mul = function (t, e) {
        if (t.isZero() || e.isZero()) return new i(0)._forceRed(this);
        var r = t.mul(e),
          n = r.maskn(this.shift).mul(this.minv).imaskn(this.shift).mul(this.m),
          o = r.isub(n).iushrn(this.shift),
          s = o;
        return (
          o.cmp(this.m) >= 0
            ? (s = o.isub(this.m))
            : 0 > o.cmpn(0) && (s = o.iadd(this.m)),
          s._forceRed(this)
        );
      }),
      (O.prototype.invm = function (t) {
        return this.imod(t._invmp(this.m).mul(this.r2))._forceRed(this);
      }));
  })(e, t.e);
};
