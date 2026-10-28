// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e, t, f) => {
  !(function (e, t) {
    "use strict";
    function f(e, t) {
      if (!e) throw Error(t || "Assertion failed");
    }
    function r(e, t) {
      e.super_ = t;
      var f = function () {};
      ((f.prototype = t.prototype),
        (e.prototype = new f()),
        (e.prototype.constructor = e));
    }
    function i(e, t, f) {
      if (i.isBN(e)) return e;
      ((this.negative = 0),
        (this.words = null),
        (this.length = 0),
        (this.red = null),
        null !== e &&
          (("le" === t || "be" === t) && ((f = t), (t = 10)),
          this._init(e || 0, t || 10, f || "be")));
    }
    ((e.exports = i), (i.BN = i), (i.wordSize = 26));
    try {
      c =
        "u" > typeof window && void 0 !== window.Buffer
          ? window.Buffer
          : void 0;
    } catch (e) {}
    function d(e, t) {
      var f = e.charCodeAt(t);
      return f >= 65 && f <= 70
        ? f - 55
        : f >= 97 && f <= 102
          ? f - 87
          : (f - 48) & 15;
    }
    function a(e, t, f) {
      var r = d(e, f);
      return (f - 1 >= t && (r |= d(e, f - 1) << 4), r);
    }
    function n(e, t, f, r) {
      for (var i = 0, d = Math.min(e.length, f), a = t; a < d; a++) {
        var n = e.charCodeAt(a) - 48;
        ((i *= r),
          n >= 49
            ? (i += n - 49 + 10)
            : n >= 17
              ? (i += n - 17 + 10)
              : (i += n));
      }
      return i;
    }
    ((i.isBN = function (e) {
      return (
        e instanceof i ||
        (null !== e &&
          "object" == typeof e &&
          e.constructor.wordSize === i.wordSize &&
          Array.isArray(e.words))
      );
    }),
      (i.max = function (e, t) {
        return e.cmp(t) > 0 ? e : t;
      }),
      (i.min = function (e, t) {
        return 0 > e.cmp(t) ? e : t;
      }),
      (i.prototype._init = function (e, t, r) {
        if ("number" == typeof e) return this._initNumber(e, t, r);
        if ("object" == typeof e) return this._initArray(e, t, r);
        ("hex" === t && (t = 16), f(t === (0 | t) && t >= 2 && t <= 36));
        var i = 0;
        ("-" === (e = e.toString().replace(/\s+/g, ""))[0] &&
          (i++, (this.negative = 1)),
          i < e.length &&
            (16 === t
              ? this._parseHex(e, i, r)
              : (this._parseBase(e, t, i),
                "le" === r && this._initArray(this.toArray(), t, r))));
      }),
      (i.prototype._initNumber = function (e, t, r) {
        (e < 0 && ((this.negative = 1), (e = -e)),
          e < 0x4000000
            ? ((this.words = [0x3ffffff & e]), (this.length = 1))
            : e < 0x10000000000000
              ? ((this.words = [0x3ffffff & e, (e / 0x4000000) & 0x3ffffff]),
                (this.length = 2))
              : (f(e < 0x20000000000000),
                (this.words = [0x3ffffff & e, (e / 0x4000000) & 0x3ffffff, 1]),
                (this.length = 3)),
          "le" === r && this._initArray(this.toArray(), t, r));
      }),
      (i.prototype._initArray = function (e, t, r) {
        if ((f("number" == typeof e.length), e.length <= 0))
          return ((this.words = [0]), (this.length = 1), this);
        ((this.length = Math.ceil(e.length / 3)),
          (this.words = Array(this.length)));
        for (var i, d, a = 0; a < this.length; a++) this.words[a] = 0;
        var n = 0;
        if ("be" === r)
          for (a = e.length - 1, i = 0; a >= 0; a -= 3)
            ((d = e[a] | (e[a - 1] << 8) | (e[a - 2] << 16)),
              (this.words[i] |= (d << n) & 0x3ffffff),
              (this.words[i + 1] = (d >>> (26 - n)) & 0x3ffffff),
              (n += 24) >= 26 && ((n -= 26), i++));
        else if ("le" === r)
          for (a = 0, i = 0; a < e.length; a += 3)
            ((d = e[a] | (e[a + 1] << 8) | (e[a + 2] << 16)),
              (this.words[i] |= (d << n) & 0x3ffffff),
              (this.words[i + 1] = (d >>> (26 - n)) & 0x3ffffff),
              (n += 24) >= 26 && ((n -= 26), i++));
        return this.strip();
      }),
      (i.prototype._parseHex = function (e, t, f) {
        ((this.length = Math.ceil((e.length - t) / 6)),
          (this.words = Array(this.length)));
        for (var r, i = 0; i < this.length; i++) this.words[i] = 0;
        var d = 0,
          n = 0;
        if ("be" === f)
          for (i = e.length - 1; i >= t; i -= 2)
            ((r = a(e, t, i) << d),
              (this.words[n] |= 0x3ffffff & r),
              d >= 18
                ? ((d -= 18), (n += 1), (this.words[n] |= r >>> 26))
                : (d += 8));
        else
          for (i = (e.length - t) % 2 == 0 ? t + 1 : t; i < e.length; i += 2)
            ((r = a(e, t, i) << d),
              (this.words[n] |= 0x3ffffff & r),
              d >= 18
                ? ((d -= 18), (n += 1), (this.words[n] |= r >>> 26))
                : (d += 8));
        this.strip();
      }),
      (i.prototype._parseBase = function (e, t, f) {
        ((this.words = [0]), (this.length = 1));
        for (var r = 0, i = 1; i <= 0x3ffffff; i *= t) r++;
        (r--, (i = (i / t) | 0));
        for (
          var d = e.length - f,
            a = d % r,
            c = Math.min(d, d - a) + f,
            h = 0,
            s = f;
          s < c;
          s += r
        )
          ((h = n(e, s, s + r, t)),
            this.imuln(i),
            this.words[0] + h < 0x4000000
              ? (this.words[0] += h)
              : this._iaddn(h));
        if (0 !== a) {
          var o = 1;
          for (h = n(e, s, e.length, t), s = 0; s < a; s++) o *= t;
          (this.imuln(o),
            this.words[0] + h < 0x4000000
              ? (this.words[0] += h)
              : this._iaddn(h));
        }
        this.strip();
      }),
      (i.prototype.copy = function (e) {
        e.words = Array(this.length);
        for (var t = 0; t < this.length; t++) e.words[t] = this.words[t];
        ((e.length = this.length),
          (e.negative = this.negative),
          (e.red = this.red));
      }),
      (i.prototype.clone = function () {
        var e = new i(null);
        return (this.copy(e), e);
      }),
      (i.prototype._expand = function (e) {
        for (; this.length < e; ) this.words[this.length++] = 0;
        return this;
      }),
      (i.prototype.strip = function () {
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
      (i.prototype.inspect = function () {
        return (this.red ? "<BN-R: " : "<BN: ") + this.toString(16) + ">";
      }));
    var c,
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
      s = [
        0, 0, 25, 16, 12, 11, 10, 9, 8, 8, 7, 7, 7, 7, 6, 6, 6, 6, 6, 6, 6, 5,
        5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5,
      ],
      o = [
        0, 0, 0x2000000, 0x290d741, 0x1000000, 0x2e90edd, 0x39aa400, 0x267bf47,
        0x1000000, 0x290d741, 1e7, 0x12959c3, 0x222c000, 0x3bd7765, 7529536,
        0xadcea1, 0x1000000, 0x1704f61, 0x206fc40, 0x2cddcf9, 64e6, 4084101,
        5153632, 6436343, 7962624, 9765625, 0xb54ba0, 0xdaf26b, 0x1069c00,
        0x138f9ad, 243e5, 0x1b4d89f, 0x2000000, 0x25528a1, 0x2b54a20, 0x3216b93,
        0x39aa400,
      ];
    function u(e, t, f) {
      f.negative = t.negative ^ e.negative;
      var r = (e.length + t.length) | 0;
      ((f.length = r), (r = (r - 1) | 0));
      var i = 0 | e.words[0],
        d = 0 | t.words[0],
        a = i * d,
        n = 0x3ffffff & a,
        c = (a / 0x4000000) | 0;
      f.words[0] = n;
      for (var h = 1; h < r; h++) {
        for (
          var s = c >>> 26,
            o = 0x3ffffff & c,
            u = Math.min(h, t.length - 1),
            b = Math.max(0, h - e.length + 1);
          b <= u;
          b++
        ) {
          var l = (h - b) | 0;
          ((s +=
            ((a = (i = 0 | e.words[l]) * (d = 0 | t.words[b]) + o) /
              0x4000000) |
            0),
            (o = 0x3ffffff & a));
        }
        ((f.words[h] = 0 | o), (c = 0 | s));
      }
      return (0 !== c ? (f.words[h] = 0 | c) : f.length--, f.strip());
    }
    ((i.prototype.toString = function (e, t) {
      if (((t = 0 | t || 1), 16 === (e = e || 10) || "hex" === e)) {
        for (var r = "", i = 0, d = 0, a = 0; a < this.length; a++) {
          var n = this.words[a],
            c = (((n << i) | d) & 0xffffff).toString(16);
          ((d = (n >>> (24 - i)) & 0xffffff),
            (i += 2) >= 26 && ((i -= 26), a--),
            (r =
              0 !== d || a !== this.length - 1
                ? h[6 - c.length] + c + r
                : c + r));
        }
        for (0 !== d && (r = d.toString(16) + r); r.length % t != 0; )
          r = "0" + r;
        return (0 !== this.negative && (r = "-" + r), r);
      }
      if (e === (0 | e) && e >= 2 && e <= 36) {
        var u = s[e],
          b = o[e];
        r = "";
        var l = this.clone();
        for (l.negative = 0; !l.isZero(); ) {
          var p = l.modn(b).toString(e);
          r = (l = l.idivn(b)).isZero() ? p + r : h[u - p.length] + p + r;
        }
        for (this.isZero() && (r = "0" + r); r.length % t != 0; ) r = "0" + r;
        return (0 !== this.negative && (r = "-" + r), r);
      }
      f(!1, "Base should be between 2 and 36");
    }),
      (i.prototype.toNumber = function () {
        var e = this.words[0];
        return (
          2 === this.length
            ? (e += 0x4000000 * this.words[1])
            : 3 === this.length && 1 === this.words[2]
              ? (e += 0x10000000000000 + 0x4000000 * this.words[1])
              : this.length > 2 &&
                f(!1, "Number can only safely store up to 53 bits"),
          0 !== this.negative ? -e : e
        );
      }),
      (i.prototype.toJSON = function () {
        return this.toString(16);
      }),
      (i.prototype.toBuffer = function (e, t) {
        return (f(void 0 !== c), this.toArrayLike(c, e, t));
      }),
      (i.prototype.toArray = function (e, t) {
        return this.toArrayLike(Array, e, t);
      }),
      (i.prototype.toArrayLike = function (e, t, r) {
        var i,
          d,
          a = this.byteLength(),
          n = r || Math.max(1, a);
        (f(a <= n, "byte array longer than desired length"),
          f(n > 0, "Requested array length <= 0"),
          this.strip());
        var c = new e(n),
          h = this.clone();
        if ("le" === t) {
          for (d = 0; !h.isZero(); d++)
            ((i = h.andln(255)), h.iushrn(8), (c[d] = i));
          for (; d < n; d++) c[d] = 0;
        } else {
          for (d = 0; d < n - a; d++) c[d] = 0;
          for (d = 0; !h.isZero(); d++)
            ((i = h.andln(255)), h.iushrn(8), (c[n - d - 1] = i));
        }
        return c;
      }),
      Math.clz32
        ? (i.prototype._countBits = function (e) {
            return 32 - Math.clz32(e);
          })
        : (i.prototype._countBits = function (e) {
            var t = e,
              f = 0;
            return (
              t >= 4096 && ((f += 13), (t >>>= 13)),
              t >= 64 && ((f += 7), (t >>>= 7)),
              t >= 8 && ((f += 4), (t >>>= 4)),
              t >= 2 && ((f += 2), (t >>>= 2)),
              f + t
            );
          }),
      (i.prototype._zeroBits = function (e) {
        if (0 === e) return 26;
        var t = e,
          f = 0;
        return (
          (8191 & t) == 0 && ((f += 13), (t >>>= 13)),
          (127 & t) == 0 && ((f += 7), (t >>>= 7)),
          (15 & t) == 0 && ((f += 4), (t >>>= 4)),
          (3 & t) == 0 && ((f += 2), (t >>>= 2)),
          (1 & t) == 0 && f++,
          f
        );
      }),
      (i.prototype.bitLength = function () {
        var e = this.words[this.length - 1],
          t = this._countBits(e);
        return (this.length - 1) * 26 + t;
      }),
      (i.prototype.zeroBits = function () {
        if (this.isZero()) return 0;
        for (var e = 0, t = 0; t < this.length; t++) {
          var f = this._zeroBits(this.words[t]);
          if (((e += f), 26 !== f)) break;
        }
        return e;
      }),
      (i.prototype.byteLength = function () {
        return Math.ceil(this.bitLength() / 8);
      }),
      (i.prototype.toTwos = function (e) {
        return 0 !== this.negative
          ? this.abs().inotn(e).iaddn(1)
          : this.clone();
      }),
      (i.prototype.fromTwos = function (e) {
        return this.testn(e - 1) ? this.notn(e).iaddn(1).ineg() : this.clone();
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
      (i.prototype.iuor = function (e) {
        for (; this.length < e.length; ) this.words[this.length++] = 0;
        for (var t = 0; t < e.length; t++)
          this.words[t] = this.words[t] | e.words[t];
        return this.strip();
      }),
      (i.prototype.ior = function (e) {
        return (f((this.negative | e.negative) == 0), this.iuor(e));
      }),
      (i.prototype.or = function (e) {
        return this.length > e.length
          ? this.clone().ior(e)
          : e.clone().ior(this);
      }),
      (i.prototype.uor = function (e) {
        return this.length > e.length
          ? this.clone().iuor(e)
          : e.clone().iuor(this);
      }),
      (i.prototype.iuand = function (e) {
        var t;
        t = this.length > e.length ? e : this;
        for (var f = 0; f < t.length; f++)
          this.words[f] = this.words[f] & e.words[f];
        return ((this.length = t.length), this.strip());
      }),
      (i.prototype.iand = function (e) {
        return (f((this.negative | e.negative) == 0), this.iuand(e));
      }),
      (i.prototype.and = function (e) {
        return this.length > e.length
          ? this.clone().iand(e)
          : e.clone().iand(this);
      }),
      (i.prototype.uand = function (e) {
        return this.length > e.length
          ? this.clone().iuand(e)
          : e.clone().iuand(this);
      }),
      (i.prototype.iuxor = function (e) {
        this.length > e.length ? ((t = this), (f = e)) : ((t = e), (f = this));
        for (var t, f, r = 0; r < f.length; r++)
          this.words[r] = t.words[r] ^ f.words[r];
        if (this !== t) for (; r < t.length; r++) this.words[r] = t.words[r];
        return ((this.length = t.length), this.strip());
      }),
      (i.prototype.ixor = function (e) {
        return (f((this.negative | e.negative) == 0), this.iuxor(e));
      }),
      (i.prototype.xor = function (e) {
        return this.length > e.length
          ? this.clone().ixor(e)
          : e.clone().ixor(this);
      }),
      (i.prototype.uxor = function (e) {
        return this.length > e.length
          ? this.clone().iuxor(e)
          : e.clone().iuxor(this);
      }),
      (i.prototype.inotn = function (e) {
        f("number" == typeof e && e >= 0);
        var t = 0 | Math.ceil(e / 26),
          r = e % 26;
        (this._expand(t), r > 0 && t--);
        for (var i = 0; i < t; i++) this.words[i] = 0x3ffffff & ~this.words[i];
        return (
          r > 0 && (this.words[i] = ~this.words[i] & (0x3ffffff >> (26 - r))),
          this.strip()
        );
      }),
      (i.prototype.notn = function (e) {
        return this.clone().inotn(e);
      }),
      (i.prototype.setn = function (e, t) {
        f("number" == typeof e && e >= 0);
        var r = (e / 26) | 0,
          i = e % 26;
        return (
          this._expand(r + 1),
          t
            ? (this.words[r] = this.words[r] | (1 << i))
            : (this.words[r] = this.words[r] & ~(1 << i)),
          this.strip()
        );
      }),
      (i.prototype.iadd = function (e) {
        if (0 !== this.negative && 0 === e.negative)
          return (
            (this.negative = 0),
            (t = this.isub(e)),
            (this.negative ^= 1),
            this._normSign()
          );
        if (0 === this.negative && 0 !== e.negative)
          return (
            (e.negative = 0),
            (t = this.isub(e)),
            (e.negative = 1),
            t._normSign()
          );
        this.length > e.length ? ((f = this), (r = e)) : ((f = e), (r = this));
        for (var t, f, r, i = 0, d = 0; d < r.length; d++)
          ((t = (0 | f.words[d]) + (0 | r.words[d]) + i),
            (this.words[d] = 0x3ffffff & t),
            (i = t >>> 26));
        for (; 0 !== i && d < f.length; d++)
          ((t = (0 | f.words[d]) + i),
            (this.words[d] = 0x3ffffff & t),
            (i = t >>> 26));
        if (((this.length = f.length), 0 !== i))
          ((this.words[this.length] = i), this.length++);
        else if (f !== this)
          for (; d < f.length; d++) this.words[d] = f.words[d];
        return this;
      }),
      (i.prototype.add = function (e) {
        var t;
        return 0 !== e.negative && 0 === this.negative
          ? ((e.negative = 0), (t = this.sub(e)), (e.negative ^= 1), t)
          : 0 === e.negative && 0 !== this.negative
            ? ((this.negative = 0), (t = e.sub(this)), (this.negative = 1), t)
            : this.length > e.length
              ? this.clone().iadd(e)
              : e.clone().iadd(this);
      }),
      (i.prototype.isub = function (e) {
        if (0 !== e.negative) {
          e.negative = 0;
          var t,
            f,
            r = this.iadd(e);
          return ((e.negative = 1), r._normSign());
        }
        if (0 !== this.negative)
          return (
            (this.negative = 0),
            this.iadd(e),
            (this.negative = 1),
            this._normSign()
          );
        var i = this.cmp(e);
        if (0 === i)
          return (
            (this.negative = 0),
            (this.length = 1),
            (this.words[0] = 0),
            this
          );
        i > 0 ? ((t = this), (f = e)) : ((t = e), (f = this));
        for (var d = 0, a = 0; a < f.length; a++)
          ((d = (r = (0 | t.words[a]) - (0 | f.words[a]) + d) >> 26),
            (this.words[a] = 0x3ffffff & r));
        for (; 0 !== d && a < t.length; a++)
          ((d = (r = (0 | t.words[a]) + d) >> 26),
            (this.words[a] = 0x3ffffff & r));
        if (0 === d && a < t.length && t !== this)
          for (; a < t.length; a++) this.words[a] = t.words[a];
        return (
          (this.length = Math.max(this.length, a)),
          t !== this && (this.negative = 1),
          this.strip()
        );
      }),
      (i.prototype.sub = function (e) {
        return this.clone().isub(e);
      }));
    var b = function (e, t, f) {
      var r,
        i,
        d,
        a = e.words,
        n = t.words,
        c = f.words,
        h = 0,
        s = 0 | a[0],
        o = 8191 & s,
        u = s >>> 13,
        b = 0 | a[1],
        l = 8191 & b,
        p = b >>> 13,
        m = 0 | a[2],
        v = 8191 & m,
        g = m >>> 13,
        y = 0 | a[3],
        x = 8191 & y,
        M = y >>> 13,
        w = 0 | a[4],
        S = 8191 & w,
        _ = w >>> 13,
        A = 0 | a[5],
        I = 8191 & A,
        z = A >>> 13,
        q = 0 | a[6],
        R = 8191 & q,
        k = q >>> 13,
        P = 0 | a[7],
        N = 8191 & P,
        B = P >>> 13,
        E = 0 | a[8],
        L = 8191 & E,
        j = E >>> 13,
        O = 0 | a[9],
        T = 8191 & O,
        C = O >>> 13,
        F = 0 | n[0],
        Z = 8191 & F,
        J = F >>> 13,
        H = 0 | n[1],
        X = 8191 & H,
        D = H >>> 13,
        K = 0 | n[2],
        V = 8191 & K,
        W = K >>> 13,
        U = 0 | n[3],
        Y = 8191 & U,
        G = U >>> 13,
        Q = 0 | n[4],
        $ = 8191 & Q,
        ee = Q >>> 13,
        et = 0 | n[5],
        ef = 8191 & et,
        er = et >>> 13,
        ei = 0 | n[6],
        ed = 8191 & ei,
        ea = ei >>> 13,
        en = 0 | n[7],
        ec = 8191 & en,
        eh = en >>> 13,
        es = 0 | n[8],
        eo = 8191 & es,
        eu = es >>> 13,
        eb = 0 | n[9],
        el = 8191 & eb,
        ep = eb >>> 13;
      ((f.negative = e.negative ^ t.negative),
        (f.length = 19),
        (r = Math.imul(o, Z)));
      var em =
        (((h + r) | 0) +
          ((8191 & (i = ((i = Math.imul(o, J)) + Math.imul(u, Z)) | 0)) <<
            13)) |
        0;
      ((h = ((((d = Math.imul(u, J)) + (i >>> 13)) | 0) + (em >>> 26)) | 0),
        (em &= 0x3ffffff),
        (r = Math.imul(l, Z)),
        (i = ((i = Math.imul(l, J)) + Math.imul(p, Z)) | 0),
        (d = Math.imul(p, J)),
        (r = (r + Math.imul(o, X)) | 0));
      var ev =
        (((h + r) | 0) +
          ((8191 &
            (i = ((i = (i + Math.imul(o, D)) | 0) + Math.imul(u, X)) | 0)) <<
            13)) |
        0;
      ((h =
        ((((d = (d + Math.imul(u, D)) | 0) + (i >>> 13)) | 0) + (ev >>> 26)) |
        0),
        (ev &= 0x3ffffff),
        (r = Math.imul(v, Z)),
        (i = ((i = Math.imul(v, J)) + Math.imul(g, Z)) | 0),
        (d = Math.imul(g, J)),
        (r = (r + Math.imul(l, X)) | 0),
        (i = ((i = (i + Math.imul(l, D)) | 0) + Math.imul(p, X)) | 0),
        (d = (d + Math.imul(p, D)) | 0),
        (r = (r + Math.imul(o, V)) | 0));
      var eg =
        (((h + r) | 0) +
          ((8191 &
            (i = ((i = (i + Math.imul(o, W)) | 0) + Math.imul(u, V)) | 0)) <<
            13)) |
        0;
      ((h =
        ((((d = (d + Math.imul(u, W)) | 0) + (i >>> 13)) | 0) + (eg >>> 26)) |
        0),
        (eg &= 0x3ffffff),
        (r = Math.imul(x, Z)),
        (i = ((i = Math.imul(x, J)) + Math.imul(M, Z)) | 0),
        (d = Math.imul(M, J)),
        (r = (r + Math.imul(v, X)) | 0),
        (i = ((i = (i + Math.imul(v, D)) | 0) + Math.imul(g, X)) | 0),
        (d = (d + Math.imul(g, D)) | 0),
        (r = (r + Math.imul(l, V)) | 0),
        (i = ((i = (i + Math.imul(l, W)) | 0) + Math.imul(p, V)) | 0),
        (d = (d + Math.imul(p, W)) | 0),
        (r = (r + Math.imul(o, Y)) | 0));
      var ey =
        (((h + r) | 0) +
          ((8191 &
            (i = ((i = (i + Math.imul(o, G)) | 0) + Math.imul(u, Y)) | 0)) <<
            13)) |
        0;
      ((h =
        ((((d = (d + Math.imul(u, G)) | 0) + (i >>> 13)) | 0) + (ey >>> 26)) |
        0),
        (ey &= 0x3ffffff),
        (r = Math.imul(S, Z)),
        (i = ((i = Math.imul(S, J)) + Math.imul(_, Z)) | 0),
        (d = Math.imul(_, J)),
        (r = (r + Math.imul(x, X)) | 0),
        (i = ((i = (i + Math.imul(x, D)) | 0) + Math.imul(M, X)) | 0),
        (d = (d + Math.imul(M, D)) | 0),
        (r = (r + Math.imul(v, V)) | 0),
        (i = ((i = (i + Math.imul(v, W)) | 0) + Math.imul(g, V)) | 0),
        (d = (d + Math.imul(g, W)) | 0),
        (r = (r + Math.imul(l, Y)) | 0),
        (i = ((i = (i + Math.imul(l, G)) | 0) + Math.imul(p, Y)) | 0),
        (d = (d + Math.imul(p, G)) | 0),
        (r = (r + Math.imul(o, $)) | 0));
      var ex =
        (((h + r) | 0) +
          ((8191 &
            (i = ((i = (i + Math.imul(o, ee)) | 0) + Math.imul(u, $)) | 0)) <<
            13)) |
        0;
      ((h =
        ((((d = (d + Math.imul(u, ee)) | 0) + (i >>> 13)) | 0) + (ex >>> 26)) |
        0),
        (ex &= 0x3ffffff),
        (r = Math.imul(I, Z)),
        (i = ((i = Math.imul(I, J)) + Math.imul(z, Z)) | 0),
        (d = Math.imul(z, J)),
        (r = (r + Math.imul(S, X)) | 0),
        (i = ((i = (i + Math.imul(S, D)) | 0) + Math.imul(_, X)) | 0),
        (d = (d + Math.imul(_, D)) | 0),
        (r = (r + Math.imul(x, V)) | 0),
        (i = ((i = (i + Math.imul(x, W)) | 0) + Math.imul(M, V)) | 0),
        (d = (d + Math.imul(M, W)) | 0),
        (r = (r + Math.imul(v, Y)) | 0),
        (i = ((i = (i + Math.imul(v, G)) | 0) + Math.imul(g, Y)) | 0),
        (d = (d + Math.imul(g, G)) | 0),
        (r = (r + Math.imul(l, $)) | 0),
        (i = ((i = (i + Math.imul(l, ee)) | 0) + Math.imul(p, $)) | 0),
        (d = (d + Math.imul(p, ee)) | 0),
        (r = (r + Math.imul(o, ef)) | 0));
      var eM =
        (((h + r) | 0) +
          ((8191 &
            (i = ((i = (i + Math.imul(o, er)) | 0) + Math.imul(u, ef)) | 0)) <<
            13)) |
        0;
      ((h =
        ((((d = (d + Math.imul(u, er)) | 0) + (i >>> 13)) | 0) + (eM >>> 26)) |
        0),
        (eM &= 0x3ffffff),
        (r = Math.imul(R, Z)),
        (i = ((i = Math.imul(R, J)) + Math.imul(k, Z)) | 0),
        (d = Math.imul(k, J)),
        (r = (r + Math.imul(I, X)) | 0),
        (i = ((i = (i + Math.imul(I, D)) | 0) + Math.imul(z, X)) | 0),
        (d = (d + Math.imul(z, D)) | 0),
        (r = (r + Math.imul(S, V)) | 0),
        (i = ((i = (i + Math.imul(S, W)) | 0) + Math.imul(_, V)) | 0),
        (d = (d + Math.imul(_, W)) | 0),
        (r = (r + Math.imul(x, Y)) | 0),
        (i = ((i = (i + Math.imul(x, G)) | 0) + Math.imul(M, Y)) | 0),
        (d = (d + Math.imul(M, G)) | 0),
        (r = (r + Math.imul(v, $)) | 0),
        (i = ((i = (i + Math.imul(v, ee)) | 0) + Math.imul(g, $)) | 0),
        (d = (d + Math.imul(g, ee)) | 0),
        (r = (r + Math.imul(l, ef)) | 0),
        (i = ((i = (i + Math.imul(l, er)) | 0) + Math.imul(p, ef)) | 0),
        (d = (d + Math.imul(p, er)) | 0),
        (r = (r + Math.imul(o, ed)) | 0));
      var ew =
        (((h + r) | 0) +
          ((8191 &
            (i = ((i = (i + Math.imul(o, ea)) | 0) + Math.imul(u, ed)) | 0)) <<
            13)) |
        0;
      ((h =
        ((((d = (d + Math.imul(u, ea)) | 0) + (i >>> 13)) | 0) + (ew >>> 26)) |
        0),
        (ew &= 0x3ffffff),
        (r = Math.imul(N, Z)),
        (i = ((i = Math.imul(N, J)) + Math.imul(B, Z)) | 0),
        (d = Math.imul(B, J)),
        (r = (r + Math.imul(R, X)) | 0),
        (i = ((i = (i + Math.imul(R, D)) | 0) + Math.imul(k, X)) | 0),
        (d = (d + Math.imul(k, D)) | 0),
        (r = (r + Math.imul(I, V)) | 0),
        (i = ((i = (i + Math.imul(I, W)) | 0) + Math.imul(z, V)) | 0),
        (d = (d + Math.imul(z, W)) | 0),
        (r = (r + Math.imul(S, Y)) | 0),
        (i = ((i = (i + Math.imul(S, G)) | 0) + Math.imul(_, Y)) | 0),
        (d = (d + Math.imul(_, G)) | 0),
        (r = (r + Math.imul(x, $)) | 0),
        (i = ((i = (i + Math.imul(x, ee)) | 0) + Math.imul(M, $)) | 0),
        (d = (d + Math.imul(M, ee)) | 0),
        (r = (r + Math.imul(v, ef)) | 0),
        (i = ((i = (i + Math.imul(v, er)) | 0) + Math.imul(g, ef)) | 0),
        (d = (d + Math.imul(g, er)) | 0),
        (r = (r + Math.imul(l, ed)) | 0),
        (i = ((i = (i + Math.imul(l, ea)) | 0) + Math.imul(p, ed)) | 0),
        (d = (d + Math.imul(p, ea)) | 0),
        (r = (r + Math.imul(o, ec)) | 0));
      var eS =
        (((h + r) | 0) +
          ((8191 &
            (i = ((i = (i + Math.imul(o, eh)) | 0) + Math.imul(u, ec)) | 0)) <<
            13)) |
        0;
      ((h =
        ((((d = (d + Math.imul(u, eh)) | 0) + (i >>> 13)) | 0) + (eS >>> 26)) |
        0),
        (eS &= 0x3ffffff),
        (r = Math.imul(L, Z)),
        (i = ((i = Math.imul(L, J)) + Math.imul(j, Z)) | 0),
        (d = Math.imul(j, J)),
        (r = (r + Math.imul(N, X)) | 0),
        (i = ((i = (i + Math.imul(N, D)) | 0) + Math.imul(B, X)) | 0),
        (d = (d + Math.imul(B, D)) | 0),
        (r = (r + Math.imul(R, V)) | 0),
        (i = ((i = (i + Math.imul(R, W)) | 0) + Math.imul(k, V)) | 0),
        (d = (d + Math.imul(k, W)) | 0),
        (r = (r + Math.imul(I, Y)) | 0),
        (i = ((i = (i + Math.imul(I, G)) | 0) + Math.imul(z, Y)) | 0),
        (d = (d + Math.imul(z, G)) | 0),
        (r = (r + Math.imul(S, $)) | 0),
        (i = ((i = (i + Math.imul(S, ee)) | 0) + Math.imul(_, $)) | 0),
        (d = (d + Math.imul(_, ee)) | 0),
        (r = (r + Math.imul(x, ef)) | 0),
        (i = ((i = (i + Math.imul(x, er)) | 0) + Math.imul(M, ef)) | 0),
        (d = (d + Math.imul(M, er)) | 0),
        (r = (r + Math.imul(v, ed)) | 0),
        (i = ((i = (i + Math.imul(v, ea)) | 0) + Math.imul(g, ed)) | 0),
        (d = (d + Math.imul(g, ea)) | 0),
        (r = (r + Math.imul(l, ec)) | 0),
        (i = ((i = (i + Math.imul(l, eh)) | 0) + Math.imul(p, ec)) | 0),
        (d = (d + Math.imul(p, eh)) | 0),
        (r = (r + Math.imul(o, eo)) | 0));
      var e_ =
        (((h + r) | 0) +
          ((8191 &
            (i = ((i = (i + Math.imul(o, eu)) | 0) + Math.imul(u, eo)) | 0)) <<
            13)) |
        0;
      ((h =
        ((((d = (d + Math.imul(u, eu)) | 0) + (i >>> 13)) | 0) + (e_ >>> 26)) |
        0),
        (e_ &= 0x3ffffff),
        (r = Math.imul(T, Z)),
        (i = ((i = Math.imul(T, J)) + Math.imul(C, Z)) | 0),
        (d = Math.imul(C, J)),
        (r = (r + Math.imul(L, X)) | 0),
        (i = ((i = (i + Math.imul(L, D)) | 0) + Math.imul(j, X)) | 0),
        (d = (d + Math.imul(j, D)) | 0),
        (r = (r + Math.imul(N, V)) | 0),
        (i = ((i = (i + Math.imul(N, W)) | 0) + Math.imul(B, V)) | 0),
        (d = (d + Math.imul(B, W)) | 0),
        (r = (r + Math.imul(R, Y)) | 0),
        (i = ((i = (i + Math.imul(R, G)) | 0) + Math.imul(k, Y)) | 0),
        (d = (d + Math.imul(k, G)) | 0),
        (r = (r + Math.imul(I, $)) | 0),
        (i = ((i = (i + Math.imul(I, ee)) | 0) + Math.imul(z, $)) | 0),
        (d = (d + Math.imul(z, ee)) | 0),
        (r = (r + Math.imul(S, ef)) | 0),
        (i = ((i = (i + Math.imul(S, er)) | 0) + Math.imul(_, ef)) | 0),
        (d = (d + Math.imul(_, er)) | 0),
        (r = (r + Math.imul(x, ed)) | 0),
        (i = ((i = (i + Math.imul(x, ea)) | 0) + Math.imul(M, ed)) | 0),
        (d = (d + Math.imul(M, ea)) | 0),
        (r = (r + Math.imul(v, ec)) | 0),
        (i = ((i = (i + Math.imul(v, eh)) | 0) + Math.imul(g, ec)) | 0),
        (d = (d + Math.imul(g, eh)) | 0),
        (r = (r + Math.imul(l, eo)) | 0),
        (i = ((i = (i + Math.imul(l, eu)) | 0) + Math.imul(p, eo)) | 0),
        (d = (d + Math.imul(p, eu)) | 0),
        (r = (r + Math.imul(o, el)) | 0));
      var eA =
        (((h + r) | 0) +
          ((8191 &
            (i = ((i = (i + Math.imul(o, ep)) | 0) + Math.imul(u, el)) | 0)) <<
            13)) |
        0;
      ((h =
        ((((d = (d + Math.imul(u, ep)) | 0) + (i >>> 13)) | 0) + (eA >>> 26)) |
        0),
        (eA &= 0x3ffffff),
        (r = Math.imul(T, X)),
        (i = ((i = Math.imul(T, D)) + Math.imul(C, X)) | 0),
        (d = Math.imul(C, D)),
        (r = (r + Math.imul(L, V)) | 0),
        (i = ((i = (i + Math.imul(L, W)) | 0) + Math.imul(j, V)) | 0),
        (d = (d + Math.imul(j, W)) | 0),
        (r = (r + Math.imul(N, Y)) | 0),
        (i = ((i = (i + Math.imul(N, G)) | 0) + Math.imul(B, Y)) | 0),
        (d = (d + Math.imul(B, G)) | 0),
        (r = (r + Math.imul(R, $)) | 0),
        (i = ((i = (i + Math.imul(R, ee)) | 0) + Math.imul(k, $)) | 0),
        (d = (d + Math.imul(k, ee)) | 0),
        (r = (r + Math.imul(I, ef)) | 0),
        (i = ((i = (i + Math.imul(I, er)) | 0) + Math.imul(z, ef)) | 0),
        (d = (d + Math.imul(z, er)) | 0),
        (r = (r + Math.imul(S, ed)) | 0),
        (i = ((i = (i + Math.imul(S, ea)) | 0) + Math.imul(_, ed)) | 0),
        (d = (d + Math.imul(_, ea)) | 0),
        (r = (r + Math.imul(x, ec)) | 0),
        (i = ((i = (i + Math.imul(x, eh)) | 0) + Math.imul(M, ec)) | 0),
        (d = (d + Math.imul(M, eh)) | 0),
        (r = (r + Math.imul(v, eo)) | 0),
        (i = ((i = (i + Math.imul(v, eu)) | 0) + Math.imul(g, eo)) | 0),
        (d = (d + Math.imul(g, eu)) | 0),
        (r = (r + Math.imul(l, el)) | 0));
      var eI =
        (((h + r) | 0) +
          ((8191 &
            (i = ((i = (i + Math.imul(l, ep)) | 0) + Math.imul(p, el)) | 0)) <<
            13)) |
        0;
      ((h =
        ((((d = (d + Math.imul(p, ep)) | 0) + (i >>> 13)) | 0) + (eI >>> 26)) |
        0),
        (eI &= 0x3ffffff),
        (r = Math.imul(T, V)),
        (i = ((i = Math.imul(T, W)) + Math.imul(C, V)) | 0),
        (d = Math.imul(C, W)),
        (r = (r + Math.imul(L, Y)) | 0),
        (i = ((i = (i + Math.imul(L, G)) | 0) + Math.imul(j, Y)) | 0),
        (d = (d + Math.imul(j, G)) | 0),
        (r = (r + Math.imul(N, $)) | 0),
        (i = ((i = (i + Math.imul(N, ee)) | 0) + Math.imul(B, $)) | 0),
        (d = (d + Math.imul(B, ee)) | 0),
        (r = (r + Math.imul(R, ef)) | 0),
        (i = ((i = (i + Math.imul(R, er)) | 0) + Math.imul(k, ef)) | 0),
        (d = (d + Math.imul(k, er)) | 0),
        (r = (r + Math.imul(I, ed)) | 0),
        (i = ((i = (i + Math.imul(I, ea)) | 0) + Math.imul(z, ed)) | 0),
        (d = (d + Math.imul(z, ea)) | 0),
        (r = (r + Math.imul(S, ec)) | 0),
        (i = ((i = (i + Math.imul(S, eh)) | 0) + Math.imul(_, ec)) | 0),
        (d = (d + Math.imul(_, eh)) | 0),
        (r = (r + Math.imul(x, eo)) | 0),
        (i = ((i = (i + Math.imul(x, eu)) | 0) + Math.imul(M, eo)) | 0),
        (d = (d + Math.imul(M, eu)) | 0),
        (r = (r + Math.imul(v, el)) | 0));
      var ez =
        (((h + r) | 0) +
          ((8191 &
            (i = ((i = (i + Math.imul(v, ep)) | 0) + Math.imul(g, el)) | 0)) <<
            13)) |
        0;
      ((h =
        ((((d = (d + Math.imul(g, ep)) | 0) + (i >>> 13)) | 0) + (ez >>> 26)) |
        0),
        (ez &= 0x3ffffff),
        (r = Math.imul(T, Y)),
        (i = ((i = Math.imul(T, G)) + Math.imul(C, Y)) | 0),
        (d = Math.imul(C, G)),
        (r = (r + Math.imul(L, $)) | 0),
        (i = ((i = (i + Math.imul(L, ee)) | 0) + Math.imul(j, $)) | 0),
        (d = (d + Math.imul(j, ee)) | 0),
        (r = (r + Math.imul(N, ef)) | 0),
        (i = ((i = (i + Math.imul(N, er)) | 0) + Math.imul(B, ef)) | 0),
        (d = (d + Math.imul(B, er)) | 0),
        (r = (r + Math.imul(R, ed)) | 0),
        (i = ((i = (i + Math.imul(R, ea)) | 0) + Math.imul(k, ed)) | 0),
        (d = (d + Math.imul(k, ea)) | 0),
        (r = (r + Math.imul(I, ec)) | 0),
        (i = ((i = (i + Math.imul(I, eh)) | 0) + Math.imul(z, ec)) | 0),
        (d = (d + Math.imul(z, eh)) | 0),
        (r = (r + Math.imul(S, eo)) | 0),
        (i = ((i = (i + Math.imul(S, eu)) | 0) + Math.imul(_, eo)) | 0),
        (d = (d + Math.imul(_, eu)) | 0),
        (r = (r + Math.imul(x, el)) | 0));
      var eq =
        (((h + r) | 0) +
          ((8191 &
            (i = ((i = (i + Math.imul(x, ep)) | 0) + Math.imul(M, el)) | 0)) <<
            13)) |
        0;
      ((h =
        ((((d = (d + Math.imul(M, ep)) | 0) + (i >>> 13)) | 0) + (eq >>> 26)) |
        0),
        (eq &= 0x3ffffff),
        (r = Math.imul(T, $)),
        (i = ((i = Math.imul(T, ee)) + Math.imul(C, $)) | 0),
        (d = Math.imul(C, ee)),
        (r = (r + Math.imul(L, ef)) | 0),
        (i = ((i = (i + Math.imul(L, er)) | 0) + Math.imul(j, ef)) | 0),
        (d = (d + Math.imul(j, er)) | 0),
        (r = (r + Math.imul(N, ed)) | 0),
        (i = ((i = (i + Math.imul(N, ea)) | 0) + Math.imul(B, ed)) | 0),
        (d = (d + Math.imul(B, ea)) | 0),
        (r = (r + Math.imul(R, ec)) | 0),
        (i = ((i = (i + Math.imul(R, eh)) | 0) + Math.imul(k, ec)) | 0),
        (d = (d + Math.imul(k, eh)) | 0),
        (r = (r + Math.imul(I, eo)) | 0),
        (i = ((i = (i + Math.imul(I, eu)) | 0) + Math.imul(z, eo)) | 0),
        (d = (d + Math.imul(z, eu)) | 0),
        (r = (r + Math.imul(S, el)) | 0));
      var eR =
        (((h + r) | 0) +
          ((8191 &
            (i = ((i = (i + Math.imul(S, ep)) | 0) + Math.imul(_, el)) | 0)) <<
            13)) |
        0;
      ((h =
        ((((d = (d + Math.imul(_, ep)) | 0) + (i >>> 13)) | 0) + (eR >>> 26)) |
        0),
        (eR &= 0x3ffffff),
        (r = Math.imul(T, ef)),
        (i = ((i = Math.imul(T, er)) + Math.imul(C, ef)) | 0),
        (d = Math.imul(C, er)),
        (r = (r + Math.imul(L, ed)) | 0),
        (i = ((i = (i + Math.imul(L, ea)) | 0) + Math.imul(j, ed)) | 0),
        (d = (d + Math.imul(j, ea)) | 0),
        (r = (r + Math.imul(N, ec)) | 0),
        (i = ((i = (i + Math.imul(N, eh)) | 0) + Math.imul(B, ec)) | 0),
        (d = (d + Math.imul(B, eh)) | 0),
        (r = (r + Math.imul(R, eo)) | 0),
        (i = ((i = (i + Math.imul(R, eu)) | 0) + Math.imul(k, eo)) | 0),
        (d = (d + Math.imul(k, eu)) | 0),
        (r = (r + Math.imul(I, el)) | 0));
      var ek =
        (((h + r) | 0) +
          ((8191 &
            (i = ((i = (i + Math.imul(I, ep)) | 0) + Math.imul(z, el)) | 0)) <<
            13)) |
        0;
      ((h =
        ((((d = (d + Math.imul(z, ep)) | 0) + (i >>> 13)) | 0) + (ek >>> 26)) |
        0),
        (ek &= 0x3ffffff),
        (r = Math.imul(T, ed)),
        (i = ((i = Math.imul(T, ea)) + Math.imul(C, ed)) | 0),
        (d = Math.imul(C, ea)),
        (r = (r + Math.imul(L, ec)) | 0),
        (i = ((i = (i + Math.imul(L, eh)) | 0) + Math.imul(j, ec)) | 0),
        (d = (d + Math.imul(j, eh)) | 0),
        (r = (r + Math.imul(N, eo)) | 0),
        (i = ((i = (i + Math.imul(N, eu)) | 0) + Math.imul(B, eo)) | 0),
        (d = (d + Math.imul(B, eu)) | 0),
        (r = (r + Math.imul(R, el)) | 0));
      var eP =
        (((h + r) | 0) +
          ((8191 &
            (i = ((i = (i + Math.imul(R, ep)) | 0) + Math.imul(k, el)) | 0)) <<
            13)) |
        0;
      ((h =
        ((((d = (d + Math.imul(k, ep)) | 0) + (i >>> 13)) | 0) + (eP >>> 26)) |
        0),
        (eP &= 0x3ffffff),
        (r = Math.imul(T, ec)),
        (i = ((i = Math.imul(T, eh)) + Math.imul(C, ec)) | 0),
        (d = Math.imul(C, eh)),
        (r = (r + Math.imul(L, eo)) | 0),
        (i = ((i = (i + Math.imul(L, eu)) | 0) + Math.imul(j, eo)) | 0),
        (d = (d + Math.imul(j, eu)) | 0),
        (r = (r + Math.imul(N, el)) | 0));
      var eN =
        (((h + r) | 0) +
          ((8191 &
            (i = ((i = (i + Math.imul(N, ep)) | 0) + Math.imul(B, el)) | 0)) <<
            13)) |
        0;
      ((h =
        ((((d = (d + Math.imul(B, ep)) | 0) + (i >>> 13)) | 0) + (eN >>> 26)) |
        0),
        (eN &= 0x3ffffff),
        (r = Math.imul(T, eo)),
        (i = ((i = Math.imul(T, eu)) + Math.imul(C, eo)) | 0),
        (d = Math.imul(C, eu)),
        (r = (r + Math.imul(L, el)) | 0));
      var eB =
        (((h + r) | 0) +
          ((8191 &
            (i = ((i = (i + Math.imul(L, ep)) | 0) + Math.imul(j, el)) | 0)) <<
            13)) |
        0;
      ((h =
        ((((d = (d + Math.imul(j, ep)) | 0) + (i >>> 13)) | 0) + (eB >>> 26)) |
        0),
        (eB &= 0x3ffffff),
        (r = Math.imul(T, el)));
      var eE =
        (((h + r) | 0) +
          ((8191 & (i = ((i = Math.imul(T, ep)) + Math.imul(C, el)) | 0)) <<
            13)) |
        0;
      return (
        (h = ((((d = Math.imul(C, ep)) + (i >>> 13)) | 0) + (eE >>> 26)) | 0),
        (eE &= 0x3ffffff),
        (c[0] = em),
        (c[1] = ev),
        (c[2] = eg),
        (c[3] = ey),
        (c[4] = ex),
        (c[5] = eM),
        (c[6] = ew),
        (c[7] = eS),
        (c[8] = e_),
        (c[9] = eA),
        (c[10] = eI),
        (c[11] = ez),
        (c[12] = eq),
        (c[13] = eR),
        (c[14] = ek),
        (c[15] = eP),
        (c[16] = eN),
        (c[17] = eB),
        (c[18] = eE),
        0 !== h && ((c[19] = h), f.length++),
        f
      );
    };
    function l(e, t, f) {
      return new p().mulp(e, t, f);
    }
    function p(e, t) {
      ((this.x = e), (this.y = t));
    }
    (Math.imul || (b = u),
      (i.prototype.mulTo = function (e, t) {
        var f = this.length + e.length;
        return 10 === this.length && 10 === e.length
          ? b(this, e, t)
          : f < 63
            ? u(this, e, t)
            : f < 1024
              ? (function (e, t, f) {
                  ((f.negative = t.negative ^ e.negative),
                    (f.length = e.length + t.length));
                  for (var r = 0, i = 0, d = 0; d < f.length - 1; d++) {
                    var a = i;
                    i = 0;
                    for (
                      var n = 0x3ffffff & r,
                        c = Math.min(d, t.length - 1),
                        h = Math.max(0, d - e.length + 1);
                      h <= c;
                      h++
                    ) {
                      var s = d - h,
                        o = (0 | e.words[s]) * (0 | t.words[h]),
                        u = 0x3ffffff & o;
                      ((a = (a + ((o / 0x4000000) | 0)) | 0),
                        (n = 0x3ffffff & (u = (u + n) | 0)),
                        (i += (a = (a + (u >>> 26)) | 0) >>> 26),
                        (a &= 0x3ffffff));
                    }
                    ((f.words[d] = n), (r = a), (a = i));
                  }
                  return (0 !== r ? (f.words[d] = r) : f.length--, f.strip());
                })(this, e, t)
              : l(this, e, t);
      }),
      (p.prototype.makeRBT = function (e) {
        for (
          var t = Array(e), f = i.prototype._countBits(e) - 1, r = 0;
          r < e;
          r++
        )
          t[r] = this.revBin(r, f, e);
        return t;
      }),
      (p.prototype.revBin = function (e, t, f) {
        if (0 === e || e === f - 1) return e;
        for (var r = 0, i = 0; i < t; i++)
          ((r |= (1 & e) << (t - i - 1)), (e >>= 1));
        return r;
      }),
      (p.prototype.permute = function (e, t, f, r, i, d) {
        for (var a = 0; a < d; a++) ((r[a] = t[e[a]]), (i[a] = f[e[a]]));
      }),
      (p.prototype.transform = function (e, t, f, r, i, d) {
        this.permute(d, e, t, f, r, i);
        for (var a = 1; a < i; a <<= 1)
          for (
            var n = a << 1,
              c = Math.cos((2 * Math.PI) / n),
              h = Math.sin((2 * Math.PI) / n),
              s = 0;
            s < i;
            s += n
          )
            for (var o = c, u = h, b = 0; b < a; b++) {
              var l = f[s + b],
                p = r[s + b],
                m = f[s + b + a],
                v = r[s + b + a],
                g = o * m - u * v;
              ((v = o * v + u * m),
                (m = g),
                (f[s + b] = l + m),
                (r[s + b] = p + v),
                (f[s + b + a] = l - m),
                (r[s + b + a] = p - v),
                b !== n && ((g = c * o - h * u), (u = c * u + h * o), (o = g)));
            }
      }),
      (p.prototype.guessLen13b = function (e, t) {
        var f = 1 | Math.max(t, e),
          r = 1 & f,
          i = 0;
        for (f = (f / 2) | 0; f; f >>>= 1) i++;
        return 1 << (i + 1 + r);
      }),
      (p.prototype.conjugate = function (e, t, f) {
        if (!(f <= 1))
          for (var r = 0; r < f / 2; r++) {
            var i = e[r];
            ((e[r] = e[f - r - 1]),
              (e[f - r - 1] = i),
              (i = t[r]),
              (t[r] = -t[f - r - 1]),
              (t[f - r - 1] = -i));
          }
      }),
      (p.prototype.normalize13b = function (e, t) {
        for (var f = 0, r = 0; r < t / 2; r++) {
          var i =
            8192 * Math.round(e[2 * r + 1] / t) + Math.round(e[2 * r] / t) + f;
          ((e[r] = 0x3ffffff & i),
            (f = i < 0x4000000 ? 0 : (i / 0x4000000) | 0));
        }
        return e;
      }),
      (p.prototype.convert13b = function (e, t, r, i) {
        for (var d = 0, a = 0; a < t; a++)
          ((d += 0 | e[a]),
            (r[2 * a] = 8191 & d),
            (d >>>= 13),
            (r[2 * a + 1] = 8191 & d),
            (d >>>= 13));
        for (a = 2 * t; a < i; ++a) r[a] = 0;
        (f(0 === d), f((-8192 & d) == 0));
      }),
      (p.prototype.stub = function (e) {
        for (var t = Array(e), f = 0; f < e; f++) t[f] = 0;
        return t;
      }),
      (p.prototype.mulp = function (e, t, f) {
        var r = 2 * this.guessLen13b(e.length, t.length),
          i = this.makeRBT(r),
          d = this.stub(r),
          a = Array(r),
          n = Array(r),
          c = Array(r),
          h = Array(r),
          s = Array(r),
          o = Array(r),
          u = f.words;
        ((u.length = r),
          this.convert13b(e.words, e.length, a, r),
          this.convert13b(t.words, t.length, h, r),
          this.transform(a, d, n, c, r, i),
          this.transform(h, d, s, o, r, i));
        for (var b = 0; b < r; b++) {
          var l = n[b] * s[b] - c[b] * o[b];
          ((c[b] = n[b] * o[b] + c[b] * s[b]), (n[b] = l));
        }
        return (
          this.conjugate(n, c, r),
          this.transform(n, c, u, d, r, i),
          this.conjugate(u, d, r),
          this.normalize13b(u, r),
          (f.negative = e.negative ^ t.negative),
          (f.length = e.length + t.length),
          f.strip()
        );
      }),
      (i.prototype.mul = function (e) {
        var t = new i(null);
        return ((t.words = Array(this.length + e.length)), this.mulTo(e, t));
      }),
      (i.prototype.mulf = function (e) {
        var t = new i(null);
        return ((t.words = Array(this.length + e.length)), l(this, e, t));
      }),
      (i.prototype.imul = function (e) {
        return this.clone().mulTo(e, this);
      }),
      (i.prototype.imuln = function (e) {
        (f("number" == typeof e), f(e < 0x4000000));
        for (var t = 0, r = 0; r < this.length; r++) {
          var i = (0 | this.words[r]) * e,
            d = (0x3ffffff & i) + (0x3ffffff & t);
          ((t >>= 26),
            (t += ((i / 0x4000000) | 0) + (d >>> 26)),
            (this.words[r] = 0x3ffffff & d));
        }
        return (
          0 !== t && ((this.words[r] = t), this.length++),
          (this.length = 0 === e ? 1 : this.length),
          this
        );
      }),
      (i.prototype.muln = function (e) {
        return this.clone().imuln(e);
      }),
      (i.prototype.sqr = function () {
        return this.mul(this);
      }),
      (i.prototype.isqr = function () {
        return this.imul(this.clone());
      }),
      (i.prototype.pow = function (e) {
        var t = (function (e) {
          for (var t = Array(e.bitLength()), f = 0; f < t.length; f++) {
            var r = (f / 26) | 0,
              i = f % 26;
            t[f] = (e.words[r] & (1 << i)) >>> i;
          }
          return t;
        })(e);
        if (0 === t.length) return new i(1);
        for (var f = this, r = 0; r < t.length && 0 === t[r]; r++, f = f.sqr());
        if (++r < t.length)
          for (var d = f.sqr(); r < t.length; r++, d = d.sqr())
            0 !== t[r] && (f = f.mul(d));
        return f;
      }),
      (i.prototype.iushln = function (e) {
        f("number" == typeof e && e >= 0);
        var t,
          r = e % 26,
          i = (e - r) / 26,
          d = (0x3ffffff >>> (26 - r)) << (26 - r);
        if (0 !== r) {
          var a = 0;
          for (t = 0; t < this.length; t++) {
            var n = this.words[t] & d,
              c = ((0 | this.words[t]) - n) << r;
            ((this.words[t] = c | a), (a = n >>> (26 - r)));
          }
          a && ((this.words[t] = a), this.length++);
        }
        if (0 !== i) {
          for (t = this.length - 1; t >= 0; t--)
            this.words[t + i] = this.words[t];
          for (t = 0; t < i; t++) this.words[t] = 0;
          this.length += i;
        }
        return this.strip();
      }),
      (i.prototype.ishln = function (e) {
        return (f(0 === this.negative), this.iushln(e));
      }),
      (i.prototype.iushrn = function (e, t, r) {
        f("number" == typeof e && e >= 0);
        var i = t ? (t - (t % 26)) / 26 : 0,
          d = e % 26,
          a = Math.min((e - d) / 26, this.length),
          n = 0x3ffffff ^ ((0x3ffffff >>> d) << d);
        if (((i -= a), (i = Math.max(0, i)), r)) {
          for (var c = 0; c < a; c++) r.words[c] = this.words[c];
          r.length = a;
        }
        if (0 === a);
        else if (this.length > a)
          for (this.length -= a, c = 0; c < this.length; c++)
            this.words[c] = this.words[c + a];
        else ((this.words[0] = 0), (this.length = 1));
        var h = 0;
        for (c = this.length - 1; c >= 0 && (0 !== h || c >= i); c--) {
          var s = 0 | this.words[c];
          ((this.words[c] = (h << (26 - d)) | (s >>> d)), (h = s & n));
        }
        return (
          r && 0 !== h && (r.words[r.length++] = h),
          0 === this.length && ((this.words[0] = 0), (this.length = 1)),
          this.strip()
        );
      }),
      (i.prototype.ishrn = function (e, t, r) {
        return (f(0 === this.negative), this.iushrn(e, t, r));
      }),
      (i.prototype.shln = function (e) {
        return this.clone().ishln(e);
      }),
      (i.prototype.ushln = function (e) {
        return this.clone().iushln(e);
      }),
      (i.prototype.shrn = function (e) {
        return this.clone().ishrn(e);
      }),
      (i.prototype.ushrn = function (e) {
        return this.clone().iushrn(e);
      }),
      (i.prototype.testn = function (e) {
        f("number" == typeof e && e >= 0);
        var t = e % 26,
          r = (e - t) / 26;
        return !(this.length <= r) && !!(this.words[r] & (1 << t));
      }),
      (i.prototype.imaskn = function (e) {
        f("number" == typeof e && e >= 0);
        var t = e % 26,
          r = (e - t) / 26;
        return (f(
          0 === this.negative,
          "imaskn works only with positive numbers",
        ),
        this.length <= r)
          ? this
          : (0 !== t && r++,
            (this.length = Math.min(r, this.length)),
            0 !== t &&
              (this.words[this.length - 1] &=
                0x3ffffff ^ ((0x3ffffff >>> t) << t)),
            0 === this.length && ((this.words[0] = 0), (this.length = 1)),
            this.strip());
      }),
      (i.prototype.maskn = function (e) {
        return this.clone().imaskn(e);
      }),
      (i.prototype.iaddn = function (e) {
        return (f("number" == typeof e), f(e < 0x4000000), e < 0)
          ? this.isubn(-e)
          : 0 !== this.negative
            ? (1 === this.length && (0 | this.words[0]) < e
                ? ((this.words[0] = e - (0 | this.words[0])),
                  (this.negative = 0))
                : ((this.negative = 0), this.isubn(e), (this.negative = 1)),
              this)
            : this._iaddn(e);
      }),
      (i.prototype._iaddn = function (e) {
        this.words[0] += e;
        for (var t = 0; t < this.length && this.words[t] >= 0x4000000; t++)
          ((this.words[t] -= 0x4000000),
            t === this.length - 1
              ? (this.words[t + 1] = 1)
              : this.words[t + 1]++);
        return ((this.length = Math.max(this.length, t + 1)), this);
      }),
      (i.prototype.isubn = function (e) {
        if ((f("number" == typeof e), f(e < 0x4000000), e < 0))
          return this.iaddn(-e);
        if (0 !== this.negative)
          return (
            (this.negative = 0),
            this.iaddn(e),
            (this.negative = 1),
            this
          );
        if (((this.words[0] -= e), 1 === this.length && this.words[0] < 0))
          ((this.words[0] = -this.words[0]), (this.negative = 1));
        else
          for (var t = 0; t < this.length && this.words[t] < 0; t++)
            ((this.words[t] += 0x4000000), (this.words[t + 1] -= 1));
        return this.strip();
      }),
      (i.prototype.addn = function (e) {
        return this.clone().iaddn(e);
      }),
      (i.prototype.subn = function (e) {
        return this.clone().isubn(e);
      }),
      (i.prototype.iabs = function () {
        return ((this.negative = 0), this);
      }),
      (i.prototype.abs = function () {
        return this.clone().iabs();
      }),
      (i.prototype._ishlnsubmul = function (e, t, r) {
        var i,
          d,
          a = e.length + r;
        this._expand(a);
        var n = 0;
        for (i = 0; i < e.length; i++) {
          d = (0 | this.words[i + r]) + n;
          var c = (0 | e.words[i]) * t;
          ((d -= 0x3ffffff & c),
            (n = (d >> 26) - ((c / 0x4000000) | 0)),
            (this.words[i + r] = 0x3ffffff & d));
        }
        for (; i < this.length - r; i++)
          ((n = (d = (0 | this.words[i + r]) + n) >> 26),
            (this.words[i + r] = 0x3ffffff & d));
        if (0 === n) return this.strip();
        for (f(-1 === n), n = 0, i = 0; i < this.length; i++)
          ((n = (d = -(0 | this.words[i]) + n) >> 26),
            (this.words[i] = 0x3ffffff & d));
        return ((this.negative = 1), this.strip());
      }),
      (i.prototype._wordDiv = function (e, t) {
        var f,
          r = this.length - e.length,
          d = this.clone(),
          a = e,
          n = 0 | a.words[a.length - 1];
        0 != (r = 26 - this._countBits(n)) &&
          ((a = a.ushln(r)), d.iushln(r), (n = 0 | a.words[a.length - 1]));
        var c = d.length - a.length;
        if ("mod" !== t) {
          (((f = new i(null)).length = c + 1), (f.words = Array(f.length)));
          for (var h = 0; h < f.length; h++) f.words[h] = 0;
        }
        var s = d.clone()._ishlnsubmul(a, 1, c);
        0 === s.negative && ((d = s), f && (f.words[c] = 1));
        for (var o = c - 1; o >= 0; o--) {
          var u =
            (0 | d.words[a.length + o]) * 0x4000000 +
            (0 | d.words[a.length + o - 1]);
          for (
            u = Math.min((u / n) | 0, 0x3ffffff), d._ishlnsubmul(a, u, o);
            0 !== d.negative;

          )
            (u--,
              (d.negative = 0),
              d._ishlnsubmul(a, 1, o),
              d.isZero() || (d.negative ^= 1));
          f && (f.words[o] = u);
        }
        return (
          f && f.strip(),
          d.strip(),
          "div" !== t && 0 !== r && d.iushrn(r),
          { div: f || null, mod: d }
        );
      }),
      (i.prototype.divmod = function (e, t, r) {
        var d, a, n;
        return (f(!e.isZero()), this.isZero())
          ? { div: new i(0), mod: new i(0) }
          : 0 !== this.negative && 0 === e.negative
            ? ((n = this.neg().divmod(e, t)),
              "mod" !== t && (d = n.div.neg()),
              "div" !== t &&
                ((a = n.mod.neg()), r && 0 !== a.negative && a.iadd(e)),
              { div: d, mod: a })
            : 0 === this.negative && 0 !== e.negative
              ? ((n = this.divmod(e.neg(), t)),
                "mod" !== t && (d = n.div.neg()),
                { div: d, mod: n.mod })
              : (this.negative & e.negative) != 0
                ? ((n = this.neg().divmod(e.neg(), t)),
                  "div" !== t &&
                    ((a = n.mod.neg()), r && 0 !== a.negative && a.isub(e)),
                  { div: n.div, mod: a })
                : e.length > this.length || 0 > this.cmp(e)
                  ? { div: new i(0), mod: this }
                  : 1 === e.length
                    ? "div" === t
                      ? { div: this.divn(e.words[0]), mod: null }
                      : "mod" === t
                        ? { div: null, mod: new i(this.modn(e.words[0])) }
                        : {
                            div: this.divn(e.words[0]),
                            mod: new i(this.modn(e.words[0])),
                          }
                    : this._wordDiv(e, t);
      }),
      (i.prototype.div = function (e) {
        return this.divmod(e, "div", !1).div;
      }),
      (i.prototype.mod = function (e) {
        return this.divmod(e, "mod", !1).mod;
      }),
      (i.prototype.umod = function (e) {
        return this.divmod(e, "mod", !0).mod;
      }),
      (i.prototype.divRound = function (e) {
        var t = this.divmod(e);
        if (t.mod.isZero()) return t.div;
        var f = 0 !== t.div.negative ? t.mod.isub(e) : t.mod,
          r = e.ushrn(1),
          i = e.andln(1),
          d = f.cmp(r);
        return d < 0 || (1 === i && 0 === d)
          ? t.div
          : 0 !== t.div.negative
            ? t.div.isubn(1)
            : t.div.iaddn(1);
      }),
      (i.prototype.modn = function (e) {
        f(e <= 0x3ffffff);
        for (var t = 0x4000000 % e, r = 0, i = this.length - 1; i >= 0; i--)
          r = (t * r + (0 | this.words[i])) % e;
        return r;
      }),
      (i.prototype.idivn = function (e) {
        f(e <= 0x3ffffff);
        for (var t = 0, r = this.length - 1; r >= 0; r--) {
          var i = (0 | this.words[r]) + 0x4000000 * t;
          ((this.words[r] = (i / e) | 0), (t = i % e));
        }
        return this.strip();
      }),
      (i.prototype.divn = function (e) {
        return this.clone().idivn(e);
      }),
      (i.prototype.egcd = function (e) {
        (f(0 === e.negative), f(!e.isZero()));
        var t = this,
          r = e.clone();
        t = 0 !== t.negative ? t.umod(e) : t.clone();
        for (
          var d = new i(1), a = new i(0), n = new i(0), c = new i(1), h = 0;
          t.isEven() && r.isEven();

        )
          (t.iushrn(1), r.iushrn(1), ++h);
        for (var s = r.clone(), o = t.clone(); !t.isZero(); ) {
          for (var u = 0, b = 1; (t.words[0] & b) == 0 && u < 26; ++u, b <<= 1);
          if (u > 0)
            for (t.iushrn(u); u-- > 0; )
              ((d.isOdd() || a.isOdd()) && (d.iadd(s), a.isub(o)),
                d.iushrn(1),
                a.iushrn(1));
          for (var l = 0, p = 1; (r.words[0] & p) == 0 && l < 26; ++l, p <<= 1);
          if (l > 0)
            for (r.iushrn(l); l-- > 0; )
              ((n.isOdd() || c.isOdd()) && (n.iadd(s), c.isub(o)),
                n.iushrn(1),
                c.iushrn(1));
          t.cmp(r) >= 0
            ? (t.isub(r), d.isub(n), a.isub(c))
            : (r.isub(t), n.isub(d), c.isub(a));
        }
        return { a: n, b: c, gcd: r.iushln(h) };
      }),
      (i.prototype._invmp = function (e) {
        (f(0 === e.negative), f(!e.isZero()));
        var t,
          r = this,
          d = e.clone();
        r = 0 !== r.negative ? r.umod(e) : r.clone();
        for (
          var a = new i(1), n = new i(0), c = d.clone();
          r.cmpn(1) > 0 && d.cmpn(1) > 0;

        ) {
          for (var h = 0, s = 1; (r.words[0] & s) == 0 && h < 26; ++h, s <<= 1);
          if (h > 0)
            for (r.iushrn(h); h-- > 0; ) (a.isOdd() && a.iadd(c), a.iushrn(1));
          for (var o = 0, u = 1; (d.words[0] & u) == 0 && o < 26; ++o, u <<= 1);
          if (o > 0)
            for (d.iushrn(o); o-- > 0; ) (n.isOdd() && n.iadd(c), n.iushrn(1));
          r.cmp(d) >= 0 ? (r.isub(d), a.isub(n)) : (d.isub(r), n.isub(a));
        }
        return (0 > (t = 0 === r.cmpn(1) ? a : n).cmpn(0) && t.iadd(e), t);
      }),
      (i.prototype.gcd = function (e) {
        if (this.isZero()) return e.abs();
        if (e.isZero()) return this.abs();
        var t = this.clone(),
          f = e.clone();
        ((t.negative = 0), (f.negative = 0));
        for (var r = 0; t.isEven() && f.isEven(); r++)
          (t.iushrn(1), f.iushrn(1));
        for (;;) {
          for (; t.isEven(); ) t.iushrn(1);
          for (; f.isEven(); ) f.iushrn(1);
          var i = t.cmp(f);
          if (i < 0) {
            var d = t;
            ((t = f), (f = d));
          } else if (0 === i || 0 === f.cmpn(1)) break;
          t.isub(f);
        }
        return f.iushln(r);
      }),
      (i.prototype.invm = function (e) {
        return this.egcd(e).a.umod(e);
      }),
      (i.prototype.isEven = function () {
        return (1 & this.words[0]) == 0;
      }),
      (i.prototype.isOdd = function () {
        return (1 & this.words[0]) == 1;
      }),
      (i.prototype.andln = function (e) {
        return this.words[0] & e;
      }),
      (i.prototype.bincn = function (e) {
        f("number" == typeof e);
        var t = e % 26,
          r = (e - t) / 26,
          i = 1 << t;
        if (this.length <= r)
          return (this._expand(r + 1), (this.words[r] |= i), this);
        for (var d = i, a = r; 0 !== d && a < this.length; a++) {
          var n = 0 | this.words[a];
          ((n += d), (d = n >>> 26), (n &= 0x3ffffff), (this.words[a] = n));
        }
        return (0 !== d && ((this.words[a] = d), this.length++), this);
      }),
      (i.prototype.isZero = function () {
        return 1 === this.length && 0 === this.words[0];
      }),
      (i.prototype.cmpn = function (e) {
        var t,
          r = e < 0;
        if (0 !== this.negative && !r) return -1;
        if (0 === this.negative && r) return 1;
        if ((this.strip(), this.length > 1)) t = 1;
        else {
          (r && (e = -e), f(e <= 0x3ffffff, "Number is too big"));
          var i = 0 | this.words[0];
          t = i === e ? 0 : i < e ? -1 : 1;
        }
        return 0 !== this.negative ? 0 | -t : t;
      }),
      (i.prototype.cmp = function (e) {
        if (0 !== this.negative && 0 === e.negative) return -1;
        if (0 === this.negative && 0 !== e.negative) return 1;
        var t = this.ucmp(e);
        return 0 !== this.negative ? 0 | -t : t;
      }),
      (i.prototype.ucmp = function (e) {
        if (this.length > e.length) return 1;
        if (this.length < e.length) return -1;
        for (var t = 0, f = this.length - 1; f >= 0; f--) {
          var r = 0 | this.words[f],
            i = 0 | e.words[f];
          if (r !== i) {
            r < i ? (t = -1) : r > i && (t = 1);
            break;
          }
        }
        return t;
      }),
      (i.prototype.gtn = function (e) {
        return 1 === this.cmpn(e);
      }),
      (i.prototype.gt = function (e) {
        return 1 === this.cmp(e);
      }),
      (i.prototype.gten = function (e) {
        return this.cmpn(e) >= 0;
      }),
      (i.prototype.gte = function (e) {
        return this.cmp(e) >= 0;
      }),
      (i.prototype.ltn = function (e) {
        return -1 === this.cmpn(e);
      }),
      (i.prototype.lt = function (e) {
        return -1 === this.cmp(e);
      }),
      (i.prototype.lten = function (e) {
        return 0 >= this.cmpn(e);
      }),
      (i.prototype.lte = function (e) {
        return 0 >= this.cmp(e);
      }),
      (i.prototype.eqn = function (e) {
        return 0 === this.cmpn(e);
      }),
      (i.prototype.eq = function (e) {
        return 0 === this.cmp(e);
      }),
      (i.red = function (e) {
        return new w(e);
      }),
      (i.prototype.toRed = function (e) {
        return (
          f(!this.red, "Already a number in reduction context"),
          f(0 === this.negative, "red works only with positives"),
          e.convertTo(this)._forceRed(e)
        );
      }),
      (i.prototype.fromRed = function () {
        return (
          f(this.red, "fromRed works only with numbers in reduction context"),
          this.red.convertFrom(this)
        );
      }),
      (i.prototype._forceRed = function (e) {
        return ((this.red = e), this);
      }),
      (i.prototype.forceRed = function (e) {
        return (
          f(!this.red, "Already a number in reduction context"),
          this._forceRed(e)
        );
      }),
      (i.prototype.redAdd = function (e) {
        return (
          f(this.red, "redAdd works only with red numbers"),
          this.red.add(this, e)
        );
      }),
      (i.prototype.redIAdd = function (e) {
        return (
          f(this.red, "redIAdd works only with red numbers"),
          this.red.iadd(this, e)
        );
      }),
      (i.prototype.redSub = function (e) {
        return (
          f(this.red, "redSub works only with red numbers"),
          this.red.sub(this, e)
        );
      }),
      (i.prototype.redISub = function (e) {
        return (
          f(this.red, "redISub works only with red numbers"),
          this.red.isub(this, e)
        );
      }),
      (i.prototype.redShl = function (e) {
        return (
          f(this.red, "redShl works only with red numbers"),
          this.red.shl(this, e)
        );
      }),
      (i.prototype.redMul = function (e) {
        return (
          f(this.red, "redMul works only with red numbers"),
          this.red._verify2(this, e),
          this.red.mul(this, e)
        );
      }),
      (i.prototype.redIMul = function (e) {
        return (
          f(this.red, "redMul works only with red numbers"),
          this.red._verify2(this, e),
          this.red.imul(this, e)
        );
      }),
      (i.prototype.redSqr = function () {
        return (
          f(this.red, "redSqr works only with red numbers"),
          this.red._verify1(this),
          this.red.sqr(this)
        );
      }),
      (i.prototype.redISqr = function () {
        return (
          f(this.red, "redISqr works only with red numbers"),
          this.red._verify1(this),
          this.red.isqr(this)
        );
      }),
      (i.prototype.redSqrt = function () {
        return (
          f(this.red, "redSqrt works only with red numbers"),
          this.red._verify1(this),
          this.red.sqrt(this)
        );
      }),
      (i.prototype.redInvm = function () {
        return (
          f(this.red, "redInvm works only with red numbers"),
          this.red._verify1(this),
          this.red.invm(this)
        );
      }),
      (i.prototype.redNeg = function () {
        return (
          f(this.red, "redNeg works only with red numbers"),
          this.red._verify1(this),
          this.red.neg(this)
        );
      }),
      (i.prototype.redPow = function (e) {
        return (
          f(this.red && !e.red, "redPow(normalNum)"),
          this.red._verify1(this),
          this.red.pow(this, e)
        );
      }));
    var m = { k256: null, p224: null, p192: null, p25519: null };
    function v(e, t) {
      ((this.name = e),
        (this.p = new i(t, 16)),
        (this.n = this.p.bitLength()),
        (this.k = new i(1).iushln(this.n).isub(this.p)),
        (this.tmp = this._tmp()));
    }
    function g() {
      v.call(
        this,
        "k256",
        "ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffe fffffc2f",
      );
    }
    function y() {
      v.call(
        this,
        "p224",
        "ffffffff ffffffff ffffffff ffffffff 00000000 00000000 00000001",
      );
    }
    function x() {
      v.call(
        this,
        "p192",
        "ffffffff ffffffff ffffffff fffffffe ffffffff ffffffff",
      );
    }
    function M() {
      v.call(
        this,
        "25519",
        "7fffffffffffffff ffffffffffffffff ffffffffffffffff ffffffffffffffed",
      );
    }
    function w(e) {
      if ("string" == typeof e) {
        var t = i._prime(e);
        ((this.m = t.p), (this.prime = t));
      } else
        (f(e.gtn(1), "modulus must be greater than 1"),
          (this.m = e),
          (this.prime = null));
    }
    function S(e) {
      (w.call(this, e),
        (this.shift = this.m.bitLength()),
        this.shift % 26 != 0 && (this.shift += 26 - (this.shift % 26)),
        (this.r = new i(1).iushln(this.shift)),
        (this.r2 = this.imod(this.r.sqr())),
        (this.rinv = this.r._invmp(this.m)),
        (this.minv = this.rinv.mul(this.r).isubn(1).div(this.m)),
        (this.minv = this.minv.umod(this.r)),
        (this.minv = this.r.sub(this.minv)));
    }
    ((v.prototype._tmp = function () {
      var e = new i(null);
      return ((e.words = Array(Math.ceil(this.n / 13))), e);
    }),
      (v.prototype.ireduce = function (e) {
        var t,
          f = e;
        do
          (this.split(f, this.tmp),
            (t = (f = (f = this.imulK(f)).iadd(this.tmp)).bitLength()));
        while (t > this.n);
        var r = t < this.n ? -1 : f.ucmp(this.p);
        return (
          0 === r
            ? ((f.words[0] = 0), (f.length = 1))
            : r > 0
              ? f.isub(this.p)
              : void 0 !== f.strip
                ? f.strip()
                : f._strip(),
          f
        );
      }),
      (v.prototype.split = function (e, t) {
        e.iushrn(this.n, 0, t);
      }),
      (v.prototype.imulK = function (e) {
        return e.imul(this.k);
      }),
      r(g, v),
      (g.prototype.split = function (e, t) {
        for (var f = Math.min(e.length, 9), r = 0; r < f; r++)
          t.words[r] = e.words[r];
        if (((t.length = f), e.length <= 9)) {
          ((e.words[0] = 0), (e.length = 1));
          return;
        }
        var i = e.words[9];
        for (t.words[t.length++] = 4194303 & i, r = 10; r < e.length; r++) {
          var d = 0 | e.words[r];
          ((e.words[r - 10] = ((4194303 & d) << 4) | (i >>> 22)), (i = d));
        }
        ((i >>>= 22),
          (e.words[r - 10] = i),
          0 === i && e.length > 10 ? (e.length -= 10) : (e.length -= 9));
      }),
      (g.prototype.imulK = function (e) {
        ((e.words[e.length] = 0), (e.words[e.length + 1] = 0), (e.length += 2));
        for (var t = 0, f = 0; f < e.length; f++) {
          var r = 0 | e.words[f];
          ((t += 977 * r),
            (e.words[f] = 0x3ffffff & t),
            (t = 64 * r + ((t / 0x4000000) | 0)));
        }
        return (
          0 === e.words[e.length - 1] &&
            (e.length--, 0 === e.words[e.length - 1] && e.length--),
          e
        );
      }),
      r(y, v),
      r(x, v),
      r(M, v),
      (M.prototype.imulK = function (e) {
        for (var t = 0, f = 0; f < e.length; f++) {
          var r = (0 | e.words[f]) * 19 + t,
            i = 0x3ffffff & r;
          ((r >>>= 26), (e.words[f] = i), (t = r));
        }
        return (0 !== t && (e.words[e.length++] = t), e);
      }),
      (i._prime = function (e) {
        var t;
        if (m[e]) return m[e];
        if ("k256" === e) t = new g();
        else if ("p224" === e) t = new y();
        else if ("p192" === e) t = new x();
        else if ("p25519" === e) t = new M();
        else throw Error("Unknown prime " + e);
        return ((m[e] = t), t);
      }),
      (w.prototype._verify1 = function (e) {
        (f(0 === e.negative, "red works only with positives"),
          f(e.red, "red works only with red numbers"));
      }),
      (w.prototype._verify2 = function (e, t) {
        (f((e.negative | t.negative) == 0, "red works only with positives"),
          f(e.red && e.red === t.red, "red works only with red numbers"));
      }),
      (w.prototype.imod = function (e) {
        return this.prime
          ? this.prime.ireduce(e)._forceRed(this)
          : e.umod(this.m)._forceRed(this);
      }),
      (w.prototype.neg = function (e) {
        return e.isZero() ? e.clone() : this.m.sub(e)._forceRed(this);
      }),
      (w.prototype.add = function (e, t) {
        this._verify2(e, t);
        var f = e.add(t);
        return (f.cmp(this.m) >= 0 && f.isub(this.m), f._forceRed(this));
      }),
      (w.prototype.iadd = function (e, t) {
        this._verify2(e, t);
        var f = e.iadd(t);
        return (f.cmp(this.m) >= 0 && f.isub(this.m), f);
      }),
      (w.prototype.sub = function (e, t) {
        this._verify2(e, t);
        var f = e.sub(t);
        return (0 > f.cmpn(0) && f.iadd(this.m), f._forceRed(this));
      }),
      (w.prototype.isub = function (e, t) {
        this._verify2(e, t);
        var f = e.isub(t);
        return (0 > f.cmpn(0) && f.iadd(this.m), f);
      }),
      (w.prototype.shl = function (e, t) {
        return (this._verify1(e), this.imod(e.ushln(t)));
      }),
      (w.prototype.imul = function (e, t) {
        return (this._verify2(e, t), this.imod(e.imul(t)));
      }),
      (w.prototype.mul = function (e, t) {
        return (this._verify2(e, t), this.imod(e.mul(t)));
      }),
      (w.prototype.isqr = function (e) {
        return this.imul(e, e.clone());
      }),
      (w.prototype.sqr = function (e) {
        return this.mul(e, e);
      }),
      (w.prototype.sqrt = function (e) {
        if (e.isZero()) return e.clone();
        var t = this.m.andln(3);
        if ((f(t % 2 == 1), 3 === t)) {
          var r = this.m.add(new i(1)).iushrn(2);
          return this.pow(e, r);
        }
        for (var d = this.m.subn(1), a = 0; !d.isZero() && 0 === d.andln(1); )
          (a++, d.iushrn(1));
        f(!d.isZero());
        var n = new i(1).toRed(this),
          c = n.redNeg(),
          h = this.m.subn(1).iushrn(1),
          s = this.m.bitLength();
        for (s = new i(2 * s * s).toRed(this); 0 !== this.pow(s, h).cmp(c); )
          s.redIAdd(c);
        for (
          var o = this.pow(s, d),
            u = this.pow(e, d.addn(1).iushrn(1)),
            b = this.pow(e, d),
            l = a;
          0 !== b.cmp(n);

        ) {
          for (var p = b, m = 0; 0 !== p.cmp(n); m++) p = p.redSqr();
          f(m < l);
          var v = this.pow(o, new i(1).iushln(l - m - 1));
          ((u = u.redMul(v)), (o = v.redSqr()), (b = b.redMul(o)), (l = m));
        }
        return u;
      }),
      (w.prototype.invm = function (e) {
        var t = e._invmp(this.m);
        return 0 !== t.negative
          ? ((t.negative = 0), this.imod(t).redNeg())
          : this.imod(t);
      }),
      (w.prototype.pow = function (e, t) {
        if (t.isZero()) return new i(1).toRed(this);
        if (0 === t.cmpn(1)) return e.clone();
        var f = Array(16);
        ((f[0] = new i(1).toRed(this)), (f[1] = e));
        for (var r = 2; r < f.length; r++) f[r] = this.mul(f[r - 1], e);
        var d = f[0],
          a = 0,
          n = 0,
          c = t.bitLength() % 26;
        for (0 === c && (c = 26), r = t.length - 1; r >= 0; r--) {
          for (var h = t.words[r], s = c - 1; s >= 0; s--) {
            var o = (h >> s) & 1;
            if ((d !== f[0] && (d = this.sqr(d)), 0 === o && 0 === a)) {
              n = 0;
              continue;
            }
            ((a <<= 1),
              (a |= o),
              (4 == ++n || (0 === r && 0 === s)) &&
                ((d = this.mul(d, f[a])), (n = 0), (a = 0)));
          }
          c = 26;
        }
        return d;
      }),
      (w.prototype.convertTo = function (e) {
        var t = e.umod(this.m);
        return t === e ? t.clone() : t;
      }),
      (w.prototype.convertFrom = function (e) {
        var t = e.clone();
        return ((t.red = null), t);
      }),
      (i.mont = function (e) {
        return new S(e);
      }),
      r(S, w),
      (S.prototype.convertTo = function (e) {
        return this.imod(e.ushln(this.shift));
      }),
      (S.prototype.convertFrom = function (e) {
        var t = this.imod(e.mul(this.rinv));
        return ((t.red = null), t);
      }),
      (S.prototype.imul = function (e, t) {
        if (e.isZero() || t.isZero())
          return ((e.words[0] = 0), (e.length = 1), e);
        var f = e.imul(t),
          r = f.maskn(this.shift).mul(this.minv).imaskn(this.shift).mul(this.m),
          i = f.isub(r).iushrn(this.shift),
          d = i;
        return (
          i.cmp(this.m) >= 0
            ? (d = i.isub(this.m))
            : 0 > i.cmpn(0) && (d = i.iadd(this.m)),
          d._forceRed(this)
        );
      }),
      (S.prototype.mul = function (e, t) {
        if (e.isZero() || t.isZero()) return new i(0)._forceRed(this);
        var f = e.mul(t),
          r = f.maskn(this.shift).mul(this.minv).imaskn(this.shift).mul(this.m),
          d = f.isub(r).iushrn(this.shift),
          a = d;
        return (
          d.cmp(this.m) >= 0
            ? (a = d.isub(this.m))
            : 0 > d.cmpn(0) && (a = d.iadd(this.m)),
          a._forceRed(this)
        );
      }),
      (S.prototype.invm = function (e) {
        return this.imod(e._invmp(this.m).mul(this.r2))._forceRed(this);
      }));
  })(t, e.e);
};
