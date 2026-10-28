// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e, t, a) => {
  var l = e.r(766798),
    r = e.r(828e3),
    i = e.r(657208),
    n = e.r(265988),
    o = e.r(717576);
  function s(e, t) {
    ((this.typeNumber = e),
      (this.errorCorrectLevel = t),
      (this.modules = null),
      (this.moduleCount = 0),
      (this.dataCache = null),
      (this.dataList = []));
  }
  var c = s.prototype;
  ((c.addData = function (e) {
    var t = new l(e);
    (this.dataList.push(t), (this.dataCache = null));
  }),
    (c.isDark = function (e, t) {
      if (e < 0 || this.moduleCount <= e || t < 0 || this.moduleCount <= t)
        throw Error(e + "," + t);
      return this.modules[e][t];
    }),
    (c.getModuleCount = function () {
      return this.moduleCount;
    }),
    (c.make = function () {
      if (this.typeNumber < 1) {
        var e = 1;
        for (e = 1; e < 40; e++) {
          for (
            var t = r.getRSBlocks(e, this.errorCorrectLevel),
              a = new i(),
              l = 0,
              o = 0;
            o < t.length;
            o++
          )
            l += t[o].dataCount;
          for (var o = 0; o < this.dataList.length; o++) {
            var s = this.dataList[o];
            (a.put(s.mode, 4),
              a.put(s.getLength(), n.getLengthInBits(s.mode, e)),
              s.write(a));
          }
          if (a.getLengthInBits() <= 8 * l) break;
        }
        this.typeNumber = e;
      }
      this.makeImpl(!1, this.getBestMaskPattern());
    }),
    (c.makeImpl = function (e, t) {
      ((this.moduleCount = 4 * this.typeNumber + 17),
        (this.modules = Array(this.moduleCount)));
      for (var a = 0; a < this.moduleCount; a++) {
        this.modules[a] = Array(this.moduleCount);
        for (var l = 0; l < this.moduleCount; l++) this.modules[a][l] = null;
      }
      (this.setupPositionProbePattern(0, 0),
        this.setupPositionProbePattern(this.moduleCount - 7, 0),
        this.setupPositionProbePattern(0, this.moduleCount - 7),
        this.setupPositionAdjustPattern(),
        this.setupTimingPattern(),
        this.setupTypeInfo(e, t),
        this.typeNumber >= 7 && this.setupTypeNumber(e),
        null == this.dataCache &&
          (this.dataCache = s.createData(
            this.typeNumber,
            this.errorCorrectLevel,
            this.dataList,
          )),
        this.mapData(this.dataCache, t));
    }),
    (c.setupPositionProbePattern = function (e, t) {
      for (var a = -1; a <= 7; a++)
        if (!(e + a <= -1) && !(this.moduleCount <= e + a))
          for (var l = -1; l <= 7; l++)
            t + l <= -1 ||
              this.moduleCount <= t + l ||
              ((0 <= a && a <= 6 && (0 == l || 6 == l)) ||
              (0 <= l && l <= 6 && (0 == a || 6 == a)) ||
              (2 <= a && a <= 4 && 2 <= l && l <= 4)
                ? (this.modules[e + a][t + l] = !0)
                : (this.modules[e + a][t + l] = !1));
    }),
    (c.getBestMaskPattern = function () {
      for (var e = 0, t = 0, a = 0; a < 8; a++) {
        this.makeImpl(!0, a);
        var l = n.getLostPoint(this);
        (0 == a || e > l) && ((e = l), (t = a));
      }
      return t;
    }),
    (c.createMovieClip = function (e, t, a) {
      var l = e.createEmptyMovieClip(t, a);
      this.make();
      for (var r = 0; r < this.modules.length; r++)
        for (var i = +r, n = 0; n < this.modules[r].length; n++) {
          var o = +n;
          this.modules[r][n] &&
            (l.beginFill(0, 100),
            l.moveTo(o, i),
            l.lineTo(o + 1, i),
            l.lineTo(o + 1, i + 1),
            l.lineTo(o, i + 1),
            l.endFill());
        }
      return l;
    }),
    (c.setupTimingPattern = function () {
      for (var e = 8; e < this.moduleCount - 8; e++)
        null == this.modules[e][6] && (this.modules[e][6] = e % 2 == 0);
      for (var t = 8; t < this.moduleCount - 8; t++)
        null == this.modules[6][t] && (this.modules[6][t] = t % 2 == 0);
    }),
    (c.setupPositionAdjustPattern = function () {
      for (
        var e = n.getPatternPosition(this.typeNumber), t = 0;
        t < e.length;
        t++
      )
        for (var a = 0; a < e.length; a++) {
          var l = e[t],
            r = e[a];
          if (null == this.modules[l][r])
            for (var i = -2; i <= 2; i++)
              for (var o = -2; o <= 2; o++)
                -2 == i || 2 == i || -2 == o || 2 == o || (0 == i && 0 == o)
                  ? (this.modules[l + i][r + o] = !0)
                  : (this.modules[l + i][r + o] = !1);
        }
    }),
    (c.setupTypeNumber = function (e) {
      for (var t = n.getBCHTypeNumber(this.typeNumber), a = 0; a < 18; a++) {
        var l = !e && ((t >> a) & 1) == 1;
        this.modules[Math.floor(a / 3)][(a % 3) + this.moduleCount - 8 - 3] = l;
      }
      for (var a = 0; a < 18; a++) {
        var l = !e && ((t >> a) & 1) == 1;
        this.modules[(a % 3) + this.moduleCount - 8 - 3][Math.floor(a / 3)] = l;
      }
    }),
    (c.setupTypeInfo = function (e, t) {
      for (
        var a = (this.errorCorrectLevel << 3) | t,
          l = n.getBCHTypeInfo(a),
          r = 0;
        r < 15;
        r++
      ) {
        var i = !e && ((l >> r) & 1) == 1;
        r < 6
          ? (this.modules[r][8] = i)
          : r < 8
            ? (this.modules[r + 1][8] = i)
            : (this.modules[this.moduleCount - 15 + r][8] = i);
      }
      for (var r = 0; r < 15; r++) {
        var i = !e && ((l >> r) & 1) == 1;
        r < 8
          ? (this.modules[8][this.moduleCount - r - 1] = i)
          : r < 9
            ? (this.modules[8][15 - r - 1 + 1] = i)
            : (this.modules[8][15 - r - 1] = i);
      }
      this.modules[this.moduleCount - 8][8] = !e;
    }),
    (c.mapData = function (e, t) {
      for (
        var a = -1,
          l = this.moduleCount - 1,
          r = 7,
          i = 0,
          o = this.moduleCount - 1;
        o > 0;
        o -= 2
      )
        for (6 == o && o--; ; ) {
          for (var s = 0; s < 2; s++)
            if (null == this.modules[l][o - s]) {
              var c = !1;
              (i < e.length && (c = ((e[i] >>> r) & 1) == 1),
                n.getMask(t, l, o - s) && (c = !c),
                (this.modules[l][o - s] = c),
                -1 == --r && (i++, (r = 7)));
            }
          if ((l += a) < 0 || this.moduleCount <= l) {
            ((l -= a), (a = -a));
            break;
          }
        }
    }),
    (s.PAD0 = 236),
    (s.PAD1 = 17),
    (s.createData = function (e, t, a) {
      for (var l = r.getRSBlocks(e, t), o = new i(), c = 0; c < a.length; c++) {
        var u = a[c];
        (o.put(u.mode, 4),
          o.put(u.getLength(), n.getLengthInBits(u.mode, e)),
          u.write(o));
      }
      for (var d = 0, c = 0; c < l.length; c++) d += l[c].dataCount;
      if (o.getLengthInBits() > 8 * d)
        throw Error(
          "code length overflow. (" + o.getLengthInBits() + ">" + 8 * d + ")",
        );
      for (
        o.getLengthInBits() + 4 <= 8 * d && o.put(0, 4);
        o.getLengthInBits() % 8 != 0;

      )
        o.putBit(!1);
      for (
        ;
        !(o.getLengthInBits() >= 8 * d) &&
        (o.put(s.PAD0, 8), !(o.getLengthInBits() >= 8 * d));

      ) {
        o.put(s.PAD1, 8);
      }
      return s.createBytes(o, l);
    }),
    (s.createBytes = function (e, t) {
      for (
        var a = 0,
          l = 0,
          r = 0,
          i = Array(t.length),
          s = Array(t.length),
          c = 0;
        c < t.length;
        c++
      ) {
        var u = t[c].dataCount,
          d = t[c].totalCount - u;
        ((l = Math.max(l, u)), (r = Math.max(r, d)), (i[c] = Array(u)));
        for (var m = 0; m < i[c].length; m++) i[c][m] = 255 & e.buffer[m + a];
        a += u;
        var f = n.getErrorCorrectPolynomial(d),
          p = new o(i[c], f.getLength() - 1).mod(f);
        s[c] = Array(f.getLength() - 1);
        for (var m = 0; m < s[c].length; m++) {
          var _ = m + p.getLength() - s[c].length;
          s[c][m] = _ >= 0 ? p.get(_) : 0;
        }
      }
      for (var h = 0, m = 0; m < t.length; m++) h += t[m].totalCount;
      for (var g = Array(h), b = 0, m = 0; m < l; m++)
        for (var c = 0; c < t.length; c++)
          m < i[c].length && (g[b++] = i[c][m]);
      for (var m = 0; m < r; m++)
        for (var c = 0; c < t.length; c++)
          m < s[c].length && (g[b++] = s[c][m]);
      return g;
    }),
    (t.exports = s));
};
