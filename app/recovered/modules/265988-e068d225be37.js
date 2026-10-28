// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e, t, a) => {
  var l = e.r(888267),
    r = e.r(717576),
    i = e.r(149324),
    n = {
      PATTERN_POSITION_TABLE: [
        [],
        [6, 18],
        [6, 22],
        [6, 26],
        [6, 30],
        [6, 34],
        [6, 22, 38],
        [6, 24, 42],
        [6, 26, 46],
        [6, 28, 50],
        [6, 30, 54],
        [6, 32, 58],
        [6, 34, 62],
        [6, 26, 46, 66],
        [6, 26, 48, 70],
        [6, 26, 50, 74],
        [6, 30, 54, 78],
        [6, 30, 56, 82],
        [6, 30, 58, 86],
        [6, 34, 62, 90],
        [6, 28, 50, 72, 94],
        [6, 26, 50, 74, 98],
        [6, 30, 54, 78, 102],
        [6, 28, 54, 80, 106],
        [6, 32, 58, 84, 110],
        [6, 30, 58, 86, 114],
        [6, 34, 62, 90, 118],
        [6, 26, 50, 74, 98, 122],
        [6, 30, 54, 78, 102, 126],
        [6, 26, 52, 78, 104, 130],
        [6, 30, 56, 82, 108, 134],
        [6, 34, 60, 86, 112, 138],
        [6, 30, 58, 86, 114, 142],
        [6, 34, 62, 90, 118, 146],
        [6, 30, 54, 78, 102, 126, 150],
        [6, 24, 50, 76, 102, 128, 154],
        [6, 28, 54, 80, 106, 132, 158],
        [6, 32, 58, 84, 110, 136, 162],
        [6, 26, 54, 82, 110, 138, 166],
        [6, 30, 58, 86, 114, 142, 170],
      ],
      G15: 1335,
      G18: 7973,
      G15_MASK: 21522,
      getBCHTypeInfo: function (e) {
        for (var t = e << 10; n.getBCHDigit(t) - n.getBCHDigit(n.G15) >= 0; )
          t ^= n.G15 << (n.getBCHDigit(t) - n.getBCHDigit(n.G15));
        return ((e << 10) | t) ^ n.G15_MASK;
      },
      getBCHTypeNumber: function (e) {
        for (var t = e << 12; n.getBCHDigit(t) - n.getBCHDigit(n.G18) >= 0; )
          t ^= n.G18 << (n.getBCHDigit(t) - n.getBCHDigit(n.G18));
        return (e << 12) | t;
      },
      getBCHDigit: function (e) {
        for (var t = 0; 0 != e; ) (t++, (e >>>= 1));
        return t;
      },
      getPatternPosition: function (e) {
        return n.PATTERN_POSITION_TABLE[e - 1];
      },
      getMask: function (e, t, a) {
        switch (e) {
          case 0:
            return (t + a) % 2 == 0;
          case 1:
            return t % 2 == 0;
          case 2:
            return a % 3 == 0;
          case 3:
            return (t + a) % 3 == 0;
          case 4:
            return (Math.floor(t / 2) + Math.floor(a / 3)) % 2 == 0;
          case 5:
            return ((t * a) % 2) + ((t * a) % 3) == 0;
          case 6:
            return (((t * a) % 2) + ((t * a) % 3)) % 2 == 0;
          case 7:
            return (((t * a) % 3) + ((t + a) % 2)) % 2 == 0;
          default:
            throw Error("bad maskPattern:" + e);
        }
      },
      getErrorCorrectPolynomial: function (e) {
        for (var t = new r([1], 0), a = 0; a < e; a++)
          t = t.multiply(new r([1, i.gexp(a)], 0));
        return t;
      },
      getLengthInBits: function (e, t) {
        if (1 <= t && t < 10)
          switch (e) {
            case l.MODE_NUMBER:
              return 10;
            case l.MODE_ALPHA_NUM:
              return 9;
            case l.MODE_8BIT_BYTE:
            case l.MODE_KANJI:
              return 8;
            default:
              throw Error("mode:" + e);
          }
        if (t < 27)
          switch (e) {
            case l.MODE_NUMBER:
              return 12;
            case l.MODE_ALPHA_NUM:
              return 11;
            case l.MODE_8BIT_BYTE:
              return 16;
            case l.MODE_KANJI:
              return 10;
            default:
              throw Error("mode:" + e);
          }
        if (t < 41)
          switch (e) {
            case l.MODE_NUMBER:
              return 14;
            case l.MODE_ALPHA_NUM:
              return 13;
            case l.MODE_8BIT_BYTE:
              return 16;
            case l.MODE_KANJI:
              return 12;
            default:
              throw Error("mode:" + e);
          }
        throw Error("type:" + t);
      },
      getLostPoint: function (e) {
        for (var t = e.getModuleCount(), a = 0, l = 0; l < t; l++)
          for (var r = 0; r < t; r++) {
            for (var i = 0, n = e.isDark(l, r), o = -1; o <= 1; o++)
              if (!(l + o < 0) && !(t <= l + o))
                for (var s = -1; s <= 1; s++)
                  !(r + s < 0) &&
                    !(t <= r + s) &&
                    (0 != o || 0 != s) &&
                    n == e.isDark(l + o, r + s) &&
                    i++;
            i > 5 && (a += 3 + i - 5);
          }
        for (var l = 0; l < t - 1; l++)
          for (var r = 0; r < t - 1; r++) {
            var c = 0;
            (e.isDark(l, r) && c++,
              e.isDark(l + 1, r) && c++,
              e.isDark(l, r + 1) && c++,
              e.isDark(l + 1, r + 1) && c++,
              (0 == c || 4 == c) && (a += 3));
          }
        for (var l = 0; l < t; l++)
          for (var r = 0; r < t - 6; r++)
            e.isDark(l, r) &&
              !e.isDark(l, r + 1) &&
              e.isDark(l, r + 2) &&
              e.isDark(l, r + 3) &&
              e.isDark(l, r + 4) &&
              !e.isDark(l, r + 5) &&
              e.isDark(l, r + 6) &&
              (a += 40);
        for (var r = 0; r < t; r++)
          for (var l = 0; l < t - 6; l++)
            e.isDark(l, r) &&
              !e.isDark(l + 1, r) &&
              e.isDark(l + 2, r) &&
              e.isDark(l + 3, r) &&
              e.isDark(l + 4, r) &&
              !e.isDark(l + 5, r) &&
              e.isDark(l + 6, r) &&
              (a += 40);
        for (var u = 0, r = 0; r < t; r++)
          for (var l = 0; l < t; l++) e.isDark(l, r) && u++;
        return a + 10 * (Math.abs((100 * u) / t / t - 50) / 5);
      },
    };
  t.exports = n;
};
