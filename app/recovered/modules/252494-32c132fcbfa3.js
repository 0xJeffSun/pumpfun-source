// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  function t(e) {
    return (t =
      "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
        ? function (e) {
            return typeof e;
          }
        : function (e) {
            return e &&
              "function" == typeof Symbol &&
              e.constructor === Symbol &&
              e !== Symbol.prototype
              ? "symbol"
              : typeof e;
          })(e);
  }
  var a,
    r,
    n,
    i = /^\s+/,
    l = /\s+$/;
  function o(e, a) {
    if (((a = a || {}), (e = e || "") instanceof o)) return e;
    if (!(this instanceof o)) return new o(e, a);
    var r,
      n,
      s,
      c,
      u,
      d,
      p,
      h,
      m,
      f,
      b,
      g,
      _,
      y,
      v,
      w,
      k,
      A,
      C,
      S,
      W =
        ((n = { r: 0, g: 0, b: 0 }),
        (s = 1),
        (c = null),
        (u = null),
        (d = null),
        (p = !1),
        (h = !1),
        "string" == typeof (r = e) &&
          (r = (function (e) {
            e = e.replace(i, "").replace(l, "").toLowerCase();
            var t,
              a = !1;
            if (x[e]) ((e = x[e]), (a = !0));
            else if ("transparent" == e)
              return { r: 0, g: 0, b: 0, a: 0, format: "name" };
            return (t = H.rgb.exec(e))
              ? { r: t[1], g: t[2], b: t[3] }
              : (t = H.rgba.exec(e))
                ? { r: t[1], g: t[2], b: t[3], a: t[4] }
                : (t = H.hsl.exec(e))
                  ? { h: t[1], s: t[2], l: t[3] }
                  : (t = H.hsla.exec(e))
                    ? { h: t[1], s: t[2], l: t[3], a: t[4] }
                    : (t = H.hsv.exec(e))
                      ? { h: t[1], s: t[2], v: t[3] }
                      : (t = H.hsva.exec(e))
                        ? { h: t[1], s: t[2], v: t[3], a: t[4] }
                        : (t = H.hex8.exec(e))
                          ? {
                              r: F(t[1]),
                              g: F(t[2]),
                              b: F(t[3]),
                              a: F(t[4]) / 255,
                              format: a ? "name" : "hex8",
                            }
                          : (t = H.hex6.exec(e))
                            ? {
                                r: F(t[1]),
                                g: F(t[2]),
                                b: F(t[3]),
                                format: a ? "name" : "hex",
                              }
                            : (t = H.hex4.exec(e))
                              ? {
                                  r: F(t[1] + "" + t[1]),
                                  g: F(t[2] + "" + t[2]),
                                  b: F(t[3] + "" + t[3]),
                                  a: F(t[4] + "" + t[4]) / 255,
                                  format: a ? "name" : "hex8",
                                }
                              : !!(t = H.hex3.exec(e)) && {
                                  r: F(t[1] + "" + t[1]),
                                  g: F(t[2] + "" + t[2]),
                                  b: F(t[3] + "" + t[3]),
                                  format: a ? "name" : "hex",
                                };
          })(r)),
        "object" == t(r) &&
          (B(r.r) && B(r.g) && B(r.b)
            ? ((m = r.r),
              (f = r.g),
              (b = r.b),
              (n = {
                r: 255 * M(m, 255),
                g: 255 * M(f, 255),
                b: 255 * M(b, 255),
              }),
              (p = !0),
              (h = "%" === String(r.r).substr(-1) ? "prgb" : "rgb"))
            : B(r.h) && B(r.s) && B(r.v)
              ? ((c = U(r.s)),
                (u = U(r.v)),
                (g = r.h),
                (_ = c),
                (y = u),
                (g = 6 * M(g, 360)),
                (_ = M(_, 100)),
                (y = M(y, 100)),
                (v = Math.floor(g)),
                (w = g - v),
                (k = y * (1 - _)),
                (A = y * (1 - w * _)),
                (C = y * (1 - (1 - w) * _)),
                (n = {
                  r: 255 * [y, A, k, k, C, y][(S = v % 6)],
                  g: 255 * [C, y, y, A, k, k][S],
                  b: 255 * [k, k, C, y, y, A][S],
                }),
                (p = !0),
                (h = "hsv"))
              : B(r.h) &&
                B(r.s) &&
                B(r.l) &&
                ((c = U(r.s)),
                (d = U(r.l)),
                (n = (function (e, t, a) {
                  var r, n, i;
                  function l(e, t, a) {
                    return (a < 0 && (a += 1), a > 1 && (a -= 1), a < 1 / 6)
                      ? e + (t - e) * 6 * a
                      : a < 0.5
                        ? t
                        : a < 2 / 3
                          ? e + (t - e) * (2 / 3 - a) * 6
                          : e;
                  }
                  if (
                    ((e = M(e, 360)), (t = M(t, 100)), (a = M(a, 100)), 0 === t)
                  )
                    r = n = i = a;
                  else {
                    var o = a < 0.5 ? a * (1 + t) : a + t - a * t,
                      s = 2 * a - o;
                    ((r = l(s, o, e + 1 / 3)),
                      (n = l(s, o, e)),
                      (i = l(s, o, e - 1 / 3)));
                  }
                  return { r: 255 * r, g: 255 * n, b: 255 * i };
                })(r.h, c, d)),
                (p = !0),
                (h = "hsl")),
          r.hasOwnProperty("a") && (s = r.a)),
        (s = E(s)),
        {
          ok: p,
          format: r.format || h,
          r: Math.min(255, Math.max(n.r, 0)),
          g: Math.min(255, Math.max(n.g, 0)),
          b: Math.min(255, Math.max(n.b, 0)),
          a: s,
        });
    ((this._originalInput = e),
      (this._r = W.r),
      (this._g = W.g),
      (this._b = W.b),
      (this._a = W.a),
      (this._roundA = Math.round(100 * this._a) / 100),
      (this._format = a.format || W.format),
      (this._gradientType = a.gradientType),
      this._r < 1 && (this._r = Math.round(this._r)),
      this._g < 1 && (this._g = Math.round(this._g)),
      this._b < 1 && (this._b = Math.round(this._b)),
      (this._ok = W.ok));
  }
  function s(e, t, a) {
    e = M(e, 255);
    var r,
      n,
      i = Math.max(e, (t = M(t, 255)), (a = M(a, 255))),
      l = Math.min(e, t, a),
      o = (i + l) / 2;
    if (i == l) r = n = 0;
    else {
      var s = i - l;
      switch (((n = o > 0.5 ? s / (2 - i - l) : s / (i + l)), i)) {
        case e:
          r = (t - a) / s + 6 * (t < a);
          break;
        case t:
          r = (a - e) / s + 2;
          break;
        case a:
          r = (e - t) / s + 4;
      }
      r /= 6;
    }
    return { h: r, s: n, l: o };
  }
  function c(e, t, a) {
    e = M(e, 255);
    var r,
      n = Math.max(e, (t = M(t, 255)), (a = M(a, 255))),
      i = Math.min(e, t, a),
      l = n - i;
    if (n == i) r = 0;
    else {
      switch (n) {
        case e:
          r = (t - a) / l + 6 * (t < a);
          break;
        case t:
          r = (a - e) / l + 2;
          break;
        case a:
          r = (e - t) / l + 4;
      }
      r /= 6;
    }
    return { h: r, s: 0 === n ? 0 : l / n, v: n };
  }
  function u(e, t, a, r) {
    var n = [
      W(Math.round(e).toString(16)),
      W(Math.round(t).toString(16)),
      W(Math.round(a).toString(16)),
    ];
    return r &&
      n[0].charAt(0) == n[0].charAt(1) &&
      n[1].charAt(0) == n[1].charAt(1) &&
      n[2].charAt(0) == n[2].charAt(1)
      ? n[0].charAt(0) + n[1].charAt(0) + n[2].charAt(0)
      : n.join("");
  }
  function d(e, t, a, r) {
    return [
      W(T(r)),
      W(Math.round(e).toString(16)),
      W(Math.round(t).toString(16)),
      W(Math.round(a).toString(16)),
    ].join("");
  }
  function p(e, t) {
    t = 0 === t ? 0 : t || 10;
    var a = o(e).toHsl();
    return ((a.s -= t / 100), (a.s = S(a.s)), o(a));
  }
  function h(e, t) {
    t = 0 === t ? 0 : t || 10;
    var a = o(e).toHsl();
    return ((a.s += t / 100), (a.s = S(a.s)), o(a));
  }
  function m(e) {
    return o(e).desaturate(100);
  }
  function f(e, t) {
    t = 0 === t ? 0 : t || 10;
    var a = o(e).toHsl();
    return ((a.l += t / 100), (a.l = S(a.l)), o(a));
  }
  function b(e, t) {
    t = 0 === t ? 0 : t || 10;
    var a = o(e).toRgb();
    return (
      (a.r = Math.max(0, Math.min(255, a.r - Math.round(-((t / 100) * 255))))),
      (a.g = Math.max(0, Math.min(255, a.g - Math.round(-((t / 100) * 255))))),
      (a.b = Math.max(0, Math.min(255, a.b - Math.round(-((t / 100) * 255))))),
      o(a)
    );
  }
  function g(e, t) {
    t = 0 === t ? 0 : t || 10;
    var a = o(e).toHsl();
    return ((a.l -= t / 100), (a.l = S(a.l)), o(a));
  }
  function _(e, t) {
    var a = o(e).toHsl(),
      r = (a.h + t) % 360;
    return ((a.h = r < 0 ? 360 + r : r), o(a));
  }
  function y(e) {
    var t = o(e).toHsl();
    return ((t.h = (t.h + 180) % 360), o(t));
  }
  function v(e, t) {
    if (isNaN(t) || t <= 0)
      throw Error("Argument to polyad must be a positive number");
    for (var a = o(e).toHsl(), r = [o(e)], n = 360 / t, i = 1; i < t; i++)
      r.push(o({ h: (a.h + i * n) % 360, s: a.s, l: a.l }));
    return r;
  }
  function w(e) {
    var t = o(e).toHsl(),
      a = t.h;
    return [
      o(e),
      o({ h: (a + 72) % 360, s: t.s, l: t.l }),
      o({ h: (a + 216) % 360, s: t.s, l: t.l }),
    ];
  }
  function k(e, t, a) {
    ((t = t || 6), (a = a || 30));
    var r = o(e).toHsl(),
      n = 360 / a,
      i = [o(e)];
    for (r.h = (r.h - ((n * t) >> 1) + 720) % 360; --t; )
      ((r.h = (r.h + n) % 360), i.push(o(r)));
    return i;
  }
  function A(e, t) {
    t = t || 6;
    for (
      var a = o(e).toHsv(), r = a.h, n = a.s, i = a.v, l = [], s = 1 / t;
      t--;

    )
      (l.push(o({ h: r, s: n, v: i })), (i = (i + s) % 1));
    return l;
  }
  ((o.prototype = {
    isDark: function () {
      return 128 > this.getBrightness();
    },
    isLight: function () {
      return !this.isDark();
    },
    isValid: function () {
      return this._ok;
    },
    getOriginalInput: function () {
      return this._originalInput;
    },
    getFormat: function () {
      return this._format;
    },
    getAlpha: function () {
      return this._a;
    },
    getBrightness: function () {
      var e = this.toRgb();
      return (299 * e.r + 587 * e.g + 114 * e.b) / 1e3;
    },
    getLuminance: function () {
      var e,
        t,
        a,
        r = this.toRgb();
      return (
        (e = r.r / 255),
        (t = r.g / 255),
        0.2126 *
          (e <= 0.03928 ? e / 12.92 : Math.pow((e + 0.055) / 1.055, 2.4)) +
          0.7152 *
            (t <= 0.03928 ? t / 12.92 : Math.pow((t + 0.055) / 1.055, 2.4)) +
          0.0722 *
            ((a = r.b / 255) <= 0.03928
              ? a / 12.92
              : Math.pow((a + 0.055) / 1.055, 2.4))
      );
    },
    setAlpha: function (e) {
      return (
        (this._a = E(e)),
        (this._roundA = Math.round(100 * this._a) / 100),
        this
      );
    },
    toHsv: function () {
      var e = c(this._r, this._g, this._b);
      return { h: 360 * e.h, s: e.s, v: e.v, a: this._a };
    },
    toHsvString: function () {
      var e = c(this._r, this._g, this._b),
        t = Math.round(360 * e.h),
        a = Math.round(100 * e.s),
        r = Math.round(100 * e.v);
      return 1 == this._a
        ? "hsv(" + t + ", " + a + "%, " + r + "%)"
        : "hsva(" + t + ", " + a + "%, " + r + "%, " + this._roundA + ")";
    },
    toHsl: function () {
      var e = s(this._r, this._g, this._b);
      return { h: 360 * e.h, s: e.s, l: e.l, a: this._a };
    },
    toHslString: function () {
      var e = s(this._r, this._g, this._b),
        t = Math.round(360 * e.h),
        a = Math.round(100 * e.s),
        r = Math.round(100 * e.l);
      return 1 == this._a
        ? "hsl(" + t + ", " + a + "%, " + r + "%)"
        : "hsla(" + t + ", " + a + "%, " + r + "%, " + this._roundA + ")";
    },
    toHex: function (e) {
      return u(this._r, this._g, this._b, e);
    },
    toHexString: function (e) {
      return "#" + this.toHex(e);
    },
    toHex8: function (e) {
      var t, a, r, n, i, l;
      return (
        (t = this._r),
        (a = this._g),
        (r = this._b),
        (n = this._a),
        (i = e),
        (l = [
          W(Math.round(t).toString(16)),
          W(Math.round(a).toString(16)),
          W(Math.round(r).toString(16)),
          W(T(n)),
        ]),
        i &&
        l[0].charAt(0) == l[0].charAt(1) &&
        l[1].charAt(0) == l[1].charAt(1) &&
        l[2].charAt(0) == l[2].charAt(1) &&
        l[3].charAt(0) == l[3].charAt(1)
          ? l[0].charAt(0) + l[1].charAt(0) + l[2].charAt(0) + l[3].charAt(0)
          : l.join("")
      );
    },
    toHex8String: function (e) {
      return "#" + this.toHex8(e);
    },
    toRgb: function () {
      return {
        r: Math.round(this._r),
        g: Math.round(this._g),
        b: Math.round(this._b),
        a: this._a,
      };
    },
    toRgbString: function () {
      return 1 == this._a
        ? "rgb(" +
            Math.round(this._r) +
            ", " +
            Math.round(this._g) +
            ", " +
            Math.round(this._b) +
            ")"
        : "rgba(" +
            Math.round(this._r) +
            ", " +
            Math.round(this._g) +
            ", " +
            Math.round(this._b) +
            ", " +
            this._roundA +
            ")";
    },
    toPercentageRgb: function () {
      return {
        r: Math.round(100 * M(this._r, 255)) + "%",
        g: Math.round(100 * M(this._g, 255)) + "%",
        b: Math.round(100 * M(this._b, 255)) + "%",
        a: this._a,
      };
    },
    toPercentageRgbString: function () {
      return 1 == this._a
        ? "rgb(" +
            Math.round(100 * M(this._r, 255)) +
            "%, " +
            Math.round(100 * M(this._g, 255)) +
            "%, " +
            Math.round(100 * M(this._b, 255)) +
            "%)"
        : "rgba(" +
            Math.round(100 * M(this._r, 255)) +
            "%, " +
            Math.round(100 * M(this._g, 255)) +
            "%, " +
            Math.round(100 * M(this._b, 255)) +
            "%, " +
            this._roundA +
            ")";
    },
    toName: function () {
      return 0 === this._a
        ? "transparent"
        : !(this._a < 1) && (C[u(this._r, this._g, this._b, !0)] || !1);
    },
    toFilter: function (e) {
      var t = "#" + d(this._r, this._g, this._b, this._a),
        a = t,
        r = this._gradientType ? "GradientType = 1, " : "";
      if (e) {
        var n = o(e);
        a = "#" + d(n._r, n._g, n._b, n._a);
      }
      return (
        "progid:DXImageTransform.Microsoft.gradient(" +
        r +
        "startColorstr=" +
        t +
        ",endColorstr=" +
        a +
        ")"
      );
    },
    toString: function (e) {
      var t = !!e;
      e = e || this._format;
      var a = !1,
        r = this._a < 1 && this._a >= 0;
      return !t &&
        r &&
        ("hex" === e ||
          "hex6" === e ||
          "hex3" === e ||
          "hex4" === e ||
          "hex8" === e ||
          "name" === e)
        ? "name" === e && 0 === this._a
          ? this.toName()
          : this.toRgbString()
        : ("rgb" === e && (a = this.toRgbString()),
          "prgb" === e && (a = this.toPercentageRgbString()),
          ("hex" === e || "hex6" === e) && (a = this.toHexString()),
          "hex3" === e && (a = this.toHexString(!0)),
          "hex4" === e && (a = this.toHex8String(!0)),
          "hex8" === e && (a = this.toHex8String()),
          "name" === e && (a = this.toName()),
          "hsl" === e && (a = this.toHslString()),
          "hsv" === e && (a = this.toHsvString()),
          a || this.toHexString());
    },
    clone: function () {
      return o(this.toString());
    },
    _applyModification: function (e, t) {
      var a = e.apply(null, [this].concat([].slice.call(t)));
      return (
        (this._r = a._r),
        (this._g = a._g),
        (this._b = a._b),
        this.setAlpha(a._a),
        this
      );
    },
    lighten: function () {
      return this._applyModification(f, arguments);
    },
    brighten: function () {
      return this._applyModification(b, arguments);
    },
    darken: function () {
      return this._applyModification(g, arguments);
    },
    desaturate: function () {
      return this._applyModification(p, arguments);
    },
    saturate: function () {
      return this._applyModification(h, arguments);
    },
    greyscale: function () {
      return this._applyModification(m, arguments);
    },
    spin: function () {
      return this._applyModification(_, arguments);
    },
    _applyCombination: function (e, t) {
      return e.apply(null, [this].concat([].slice.call(t)));
    },
    analogous: function () {
      return this._applyCombination(k, arguments);
    },
    complement: function () {
      return this._applyCombination(y, arguments);
    },
    monochromatic: function () {
      return this._applyCombination(A, arguments);
    },
    splitcomplement: function () {
      return this._applyCombination(w, arguments);
    },
    triad: function () {
      return this._applyCombination(v, [3]);
    },
    tetrad: function () {
      return this._applyCombination(v, [4]);
    },
  }),
    (o.fromRatio = function (e, a) {
      if ("object" == t(e)) {
        var r = {};
        for (var n in e)
          e.hasOwnProperty(n) && ("a" === n ? (r[n] = e[n]) : (r[n] = U(e[n])));
        e = r;
      }
      return o(e, a);
    }),
    (o.equals = function (e, t) {
      return !!e && !!t && o(e).toRgbString() == o(t).toRgbString();
    }),
    (o.random = function () {
      return o.fromRatio({
        r: Math.random(),
        g: Math.random(),
        b: Math.random(),
      });
    }),
    (o.mix = function (e, t, a) {
      a = 0 === a ? 0 : a || 50;
      var r = o(e).toRgb(),
        n = o(t).toRgb(),
        i = a / 100;
      return o({
        r: (n.r - r.r) * i + r.r,
        g: (n.g - r.g) * i + r.g,
        b: (n.b - r.b) * i + r.b,
        a: (n.a - r.a) * i + r.a,
      });
    }),
    (o.readability = function (e, t) {
      var a = o(e),
        r = o(t);
      return (
        (Math.max(a.getLuminance(), r.getLuminance()) + 0.05) /
        (Math.min(a.getLuminance(), r.getLuminance()) + 0.05)
      );
    }),
    (o.isReadable = function (e, t, a) {
      var r,
        n,
        i,
        l,
        s,
        c = o.readability(e, t);
      switch (
        ((s = !1),
        ((n = (
          (r = (r = a) || { level: "AA", size: "small" }).level || "AA"
        ).toUpperCase()),
        (i = (r.size || "small").toLowerCase()),
        "AA" !== n && "AAA" !== n && (n = "AA"),
        "small" !== i && "large" !== i && (i = "small"),
        (l = { level: n, size: i })).level + l.size)
      ) {
        case "AAsmall":
        case "AAAlarge":
          s = c >= 4.5;
          break;
        case "AAlarge":
          s = c >= 3;
          break;
        case "AAAsmall":
          s = c >= 7;
      }
      return s;
    }),
    (o.mostReadable = function (e, t, a) {
      var r,
        n,
        i,
        l,
        s = null,
        c = 0;
      ((n = (a = a || {}).includeFallbackColors), (i = a.level), (l = a.size));
      for (var u = 0; u < t.length; u++)
        (r = o.readability(e, t[u])) > c && ((c = r), (s = o(t[u])));
      return o.isReadable(e, s, { level: i, size: l }) || !n
        ? s
        : ((a.includeFallbackColors = !1),
          o.mostReadable(e, ["#fff", "#000"], a));
    }));
  var x = (o.names = {
      aliceblue: "f0f8ff",
      antiquewhite: "faebd7",
      aqua: "0ff",
      aquamarine: "7fffd4",
      azure: "f0ffff",
      beige: "f5f5dc",
      bisque: "ffe4c4",
      black: "000",
      blanchedalmond: "ffebcd",
      blue: "00f",
      blueviolet: "8a2be2",
      brown: "a52a2a",
      burlywood: "deb887",
      burntsienna: "ea7e5d",
      cadetblue: "5f9ea0",
      chartreuse: "7fff00",
      chocolate: "d2691e",
      coral: "ff7f50",
      cornflowerblue: "6495ed",
      cornsilk: "fff8dc",
      crimson: "dc143c",
      cyan: "0ff",
      darkblue: "00008b",
      darkcyan: "008b8b",
      darkgoldenrod: "b8860b",
      darkgray: "a9a9a9",
      darkgreen: "006400",
      darkgrey: "a9a9a9",
      darkkhaki: "bdb76b",
      darkmagenta: "8b008b",
      darkolivegreen: "556b2f",
      darkorange: "ff8c00",
      darkorchid: "9932cc",
      darkred: "8b0000",
      darksalmon: "e9967a",
      darkseagreen: "8fbc8f",
      darkslateblue: "483d8b",
      darkslategray: "2f4f4f",
      darkslategrey: "2f4f4f",
      darkturquoise: "00ced1",
      darkviolet: "9400d3",
      deeppink: "ff1493",
      deepskyblue: "00bfff",
      dimgray: "696969",
      dimgrey: "696969",
      dodgerblue: "1e90ff",
      firebrick: "b22222",
      floralwhite: "fffaf0",
      forestgreen: "228b22",
      fuchsia: "f0f",
      gainsboro: "dcdcdc",
      ghostwhite: "f8f8ff",
      gold: "ffd700",
      goldenrod: "daa520",
      gray: "808080",
      green: "008000",
      greenyellow: "adff2f",
      grey: "808080",
      honeydew: "f0fff0",
      hotpink: "ff69b4",
      indianred: "cd5c5c",
      indigo: "4b0082",
      ivory: "fffff0",
      khaki: "f0e68c",
      lavender: "e6e6fa",
      lavenderblush: "fff0f5",
      lawngreen: "7cfc00",
      lemonchiffon: "fffacd",
      lightblue: "add8e6",
      lightcoral: "f08080",
      lightcyan: "e0ffff",
      lightgoldenrodyellow: "fafad2",
      lightgray: "d3d3d3",
      lightgreen: "90ee90",
      lightgrey: "d3d3d3",
      lightpink: "ffb6c1",
      lightsalmon: "ffa07a",
      lightseagreen: "20b2aa",
      lightskyblue: "87cefa",
      lightslategray: "789",
      lightslategrey: "789",
      lightsteelblue: "b0c4de",
      lightyellow: "ffffe0",
      lime: "0f0",
      limegreen: "32cd32",
      linen: "faf0e6",
      magenta: "f0f",
      maroon: "800000",
      mediumaquamarine: "66cdaa",
      mediumblue: "0000cd",
      mediumorchid: "ba55d3",
      mediumpurple: "9370db",
      mediumseagreen: "3cb371",
      mediumslateblue: "7b68ee",
      mediumspringgreen: "00fa9a",
      mediumturquoise: "48d1cc",
      mediumvioletred: "c71585",
      midnightblue: "191970",
      mintcream: "f5fffa",
      mistyrose: "ffe4e1",
      moccasin: "ffe4b5",
      navajowhite: "ffdead",
      navy: "000080",
      oldlace: "fdf5e6",
      olive: "808000",
      olivedrab: "6b8e23",
      orange: "ffa500",
      orangered: "ff4500",
      orchid: "da70d6",
      palegoldenrod: "eee8aa",
      palegreen: "98fb98",
      paleturquoise: "afeeee",
      palevioletred: "db7093",
      papayawhip: "ffefd5",
      peachpuff: "ffdab9",
      peru: "cd853f",
      pink: "ffc0cb",
      plum: "dda0dd",
      powderblue: "b0e0e6",
      purple: "800080",
      rebeccapurple: "663399",
      red: "f00",
      rosybrown: "bc8f8f",
      royalblue: "4169e1",
      saddlebrown: "8b4513",
      salmon: "fa8072",
      sandybrown: "f4a460",
      seagreen: "2e8b57",
      seashell: "fff5ee",
      sienna: "a0522d",
      silver: "c0c0c0",
      skyblue: "87ceeb",
      slateblue: "6a5acd",
      slategray: "708090",
      slategrey: "708090",
      snow: "fffafa",
      springgreen: "00ff7f",
      steelblue: "4682b4",
      tan: "d2b48c",
      teal: "008080",
      thistle: "d8bfd8",
      tomato: "ff6347",
      turquoise: "40e0d0",
      violet: "ee82ee",
      wheat: "f5deb3",
      white: "fff",
      whitesmoke: "f5f5f5",
      yellow: "ff0",
      yellowgreen: "9acd32",
    }),
    C = (o.hexNames = (function (e) {
      var t = {};
      for (var a in e) e.hasOwnProperty(a) && (t[e[a]] = a);
      return t;
    })(x));
  function E(e) {
    return ((isNaN((e = parseFloat(e))) || e < 0 || e > 1) && (e = 1), e);
  }
  function M(e, t) {
    "string" == typeof (a = e) &&
      -1 != a.indexOf(".") &&
      1 === parseFloat(a) &&
      (e = "100%");
    var a,
      r,
      n = "string" == typeof (r = e) && -1 != r.indexOf("%");
    return ((e = Math.min(t, Math.max(0, parseFloat(e)))),
    n && (e = parseInt(e * t, 10) / 100),
    1e-6 > Math.abs(e - t))
      ? 1
      : (e % t) / parseFloat(t);
  }
  function S(e) {
    return Math.min(1, Math.max(0, e));
  }
  function F(e) {
    return parseInt(e, 16);
  }
  function W(e) {
    return 1 == e.length ? "0" + e : "" + e;
  }
  function U(e) {
    return (e <= 1 && (e = 100 * e + "%"), e);
  }
  function T(e) {
    return Math.round(255 * parseFloat(e)).toString(16);
  }
  var H =
    ((r =
      "[\\s|\\(]+(" +
      (a = "(?:[-\\+]?\\d*\\.\\d+%?)|(?:[-\\+]?\\d+%?)") +
      ")[,|\\s]+(" +
      a +
      ")[,|\\s]+(" +
      a +
      ")\\s*\\)?"),
    (n =
      "[\\s|\\(]+(" +
      a +
      ")[,|\\s]+(" +
      a +
      ")[,|\\s]+(" +
      a +
      ")[,|\\s]+(" +
      a +
      ")\\s*\\)?"),
    {
      CSS_UNIT: new RegExp(a),
      rgb: RegExp("rgb" + r),
      rgba: RegExp("rgba" + n),
      hsl: RegExp("hsl" + r),
      hsla: RegExp("hsla" + n),
      hsv: RegExp("hsv" + r),
      hsva: RegExp("hsva" + n),
      hex3: /^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,
      hex6: /^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/,
      hex4: /^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,
      hex8: /^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/,
    });
  function B(e) {
    return !!H.CSS_UNIT.exec(e);
  }
  e.s(["f", 0, o]);
};
