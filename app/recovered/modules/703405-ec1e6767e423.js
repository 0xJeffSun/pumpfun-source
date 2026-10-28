// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = /^-?(?:\d+(?:\.\d*)?|\.\d+)(?:e[+-]?\d+)?$/i,
    r = Math.ceil,
    n = Math.floor,
    f = "[BigNumber Error] ",
    i = f + "Number primitive has more than 15 significant digits: ",
    s = [1, 10, 100, 1e3, 1e4, 1e5, 1e6, 1e7, 1e8, 1e9, 1e10, 1e11, 1e12, 1e13];
  function a(e) {
    var t = 0 | e;
    return e > 0 || e === t ? t : t - 1;
  }
  function c(e) {
    for (var t, r, n = 1, f = e.length, i = e[0] + ""; n < f; ) {
      for (r = 14 - (t = e[n++] + "").length; r--; t = "0" + t);
      i += t;
    }
    for (f = i.length; 48 === i.charCodeAt(--f); );
    return i.slice(0, f + 1 || 1);
  }
  function o(e, t) {
    var r,
      n,
      f = e.c,
      i = t.c,
      s = e.s,
      a = t.s,
      c = e.e,
      o = t.e;
    if (!s || !a) return null;
    if (((r = f && !f[0]), (n = i && !i[0]), r || n))
      return r ? (n ? 0 : -a) : s;
    if (s != a) return s;
    if (((r = s < 0), (n = c == o), !f || !i)) return n ? 0 : !f ^ r ? 1 : -1;
    if (!n) return (c > o) ^ r ? 1 : -1;
    for (a = (c = f.length) < (o = i.length) ? c : o, s = 0; s < a; s++)
      if (f[s] != i[s]) return (f[s] > i[s]) ^ r ? 1 : -1;
    return c == o ? 0 : (c > o) ^ r ? 1 : -1;
  }
  function u(e, t, r, i) {
    if (e < t || e > r || e !== n(e))
      throw Error(
        f +
          (i || "Argument") +
          ("number" == typeof e
            ? e < t || e > r
              ? " out of range: "
              : " not an integer: "
            : " not a primitive number: ") +
          String(e),
      );
  }
  function l(e) {
    var t = e.c.length - 1;
    return a(e.e / 14) == t && e.c[t] % 2 != 0;
  }
  function h(e, t) {
    return (
      (e.length > 1 ? e.charAt(0) + "." + e.slice(1) : e) +
      (t < 0 ? "e" : "e+") +
      t
    );
  }
  function d(e, t, r) {
    var n, f;
    if (t < 0) {
      for (f = r + "."; ++t; f += r);
      e = f + e;
    } else if (((n = e.length), ++t > n)) {
      for (f = r, t -= n; --t; f += r);
      e += f;
    } else t < n && (e = e.slice(0, t) + "." + e.slice(t));
    return e;
  }
  var p = (function e(p) {
    var g,
      m,
      b,
      y,
      w,
      B,
      v,
      E,
      x,
      O = (L.prototype = { constructor: L, toString: null, valueOf: null }),
      I = new L(1),
      S = 20,
      A = 4,
      R = -7,
      N = 21,
      _ = -1e7,
      T = 1e7,
      P = !1,
      U = 1,
      q = 0,
      C = {
        prefix: "",
        groupSize: 3,
        secondaryGroupSize: 0,
        groupSeparator: ",",
        decimalSeparator: ".",
        fractionGroupSize: 0,
        fractionGroupSeparator: " ",
        suffix: "",
      },
      D = "0123456789abcdefghijklmnopqrstuvwxyz",
      F = !0;
    function L(e, r) {
      var f,
        s,
        a,
        c,
        o,
        l,
        h,
        d,
        p = this;
      if (!(p instanceof L)) return new L(e, r);
      if (null == r) {
        if (e && !0 === e._isBigNumber) {
          ((p.s = e.s),
            !e.c || e.e > T
              ? (p.c = p.e = null)
              : e.e < _
                ? (p.c = [(p.e = 0)])
                : ((p.e = e.e), (p.c = e.c.slice())));
          return;
        }
        if ((l = "number" == typeof e) && 0 * e == 0) {
          if (((p.s = 1 / e < 0 ? ((e = -e), -1) : 1), e === ~~e)) {
            for (c = 0, o = e; o >= 10; o /= 10, c++);
            c > T ? (p.c = p.e = null) : ((p.e = c), (p.c = [e]));
            return;
          }
          d = String(e);
        } else {
          if (!t.test((d = String(e)))) return x(p, d, l);
          p.s = 45 == d.charCodeAt(0) ? ((d = d.slice(1)), -1) : 1;
        }
        ((c = d.indexOf(".")) > -1 && (d = d.replace(".", "")),
          (o = d.search(/e/i)) > 0
            ? (c < 0 && (c = o),
              (c += +d.slice(o + 1)),
              (d = d.substring(0, o)))
            : c < 0 && (c = d.length));
      } else {
        if ((u(r, 2, D.length, "Base"), 10 == r && F))
          return Z((p = new L(e)), S + p.e + 1, A);
        if (((d = String(e)), (l = "number" == typeof e))) {
          if (0 * e != 0) return x(p, d, l, r);
          if (
            ((p.s = 1 / e < 0 ? ((d = d.slice(1)), -1) : 1),
            L.DEBUG && d.replace(/^0\.0*|\./, "").length > 15)
          )
            throw Error(i + e);
        } else p.s = 45 === d.charCodeAt(0) ? ((d = d.slice(1)), -1) : 1;
        for (f = D.slice(0, r), c = o = 0, h = d.length; o < h; o++)
          if (0 > f.indexOf((s = d.charAt(o)))) {
            if ("." == s) {
              if (o > c) {
                c = h;
                continue;
              }
            } else if (
              !a &&
              ((d == d.toUpperCase() && (d = d.toLowerCase())) ||
                (d == d.toLowerCase() && (d = d.toUpperCase())))
            ) {
              ((a = !0), (o = -1), (c = 0));
              continue;
            }
            return x(p, String(e), l, r);
          }
        ((l = !1),
          (c = (d = E(d, r, 10, p.s)).indexOf(".")) > -1
            ? (d = d.replace(".", ""))
            : (c = d.length));
      }
      for (o = 0; 48 === d.charCodeAt(o); o++);
      for (h = d.length; 48 === d.charCodeAt(--h); );
      if ((d = d.slice(o, ++h))) {
        if (
          ((h -= o),
          l && L.DEBUG && h > 15 && (e > 0x1fffffffffffff || e !== n(e)))
        )
          throw Error(i + p.s * e);
        if ((c = c - o - 1) > T) p.c = p.e = null;
        else if (c < _) p.c = [(p.e = 0)];
        else {
          if (
            ((p.e = c),
            (p.c = []),
            (o = (c + 1) % 14),
            c < 0 && (o += 14),
            o < h)
          ) {
            for (o && p.c.push(+d.slice(0, o)), h -= 14; o < h; )
              p.c.push(+d.slice(o, (o += 14)));
            o = 14 - (d = d.slice(o)).length;
          } else o -= h;
          for (; o--; d += "0");
          p.c.push(+d);
        }
      } else p.c = [(p.e = 0)];
    }
    function G(e, t, r, n) {
      var f, i, s, a, o;
      if ((null == r ? (r = A) : u(r, 0, 8), !e.c)) return e.toString();
      if (((f = e.c[0]), (s = e.e), null == t))
        ((o = c(e.c)),
          (o =
            1 == n || (2 == n && (s <= R || s >= N)) ? h(o, s) : d(o, s, "0")));
      else if (
        ((i = (e = Z(new L(e), t, r)).e),
        (a = (o = c(e.c)).length),
        1 == n || (2 == n && (t <= i || i <= R)))
      ) {
        for (; a < t; o += "0", a++);
        o = h(o, i);
      } else if (
        ((t -= s + (2 === n && i > s)), (o = d(o, i, "0")), i + 1 > a)
      ) {
        if (--t > 0) for (o += "."; t--; o += "0");
      } else if ((t += i - a) > 0)
        for (i + 1 == a && (o += "."); t--; o += "0");
      return e.s < 0 && f ? "-" + o : o;
    }
    function M(e, t) {
      for (var r, n, f = 1, i = new L(e[0]); f < e.length; f++)
        ((n = new L(e[f])).s &&
          (r = o(i, n)) !== t &&
          (0 !== r || i.s !== t)) ||
          (i = n);
      return i;
    }
    function z(e, t, r) {
      for (var n = 1, f = t.length; !t[--f]; t.pop());
      for (f = t[0]; f >= 10; f /= 10, n++);
      return (
        (r = n + 14 * r - 1) > T
          ? (e.c = e.e = null)
          : r < _
            ? (e.c = [(e.e = 0)])
            : ((e.e = r), (e.c = t)),
        e
      );
    }
    function Z(e, t, f, i) {
      var a,
        c,
        o,
        u,
        l,
        h,
        d,
        p = e.c;
      if (p) {
        e: {
          for (a = 1, u = p[0]; u >= 10; u /= 10, a++);
          if ((c = t - a) < 0)
            ((c += 14),
              (o = t),
              (d = n(((l = p[(h = 0)]) / s[a - o - 1]) % 10)));
          else if ((h = r((c + 1) / 14)) >= p.length)
            if (i) {
              for (; p.length <= h; p.push(0));
              ((l = d = 0), (a = 1), (c %= 14), (o = c - 14 + 1));
            } else break e;
          else {
            for (l = u = p[h], a = 1; u >= 10; u /= 10, a++);
            ((c %= 14),
              (d = (o = c - 14 + a) < 0 ? 0 : n((l / s[a - o - 1]) % 10)));
          }
          if (
            ((i =
              i || t < 0 || null != p[h + 1] || (o < 0 ? l : l % s[a - o - 1])),
            (i =
              f < 4
                ? (d || i) && (0 == f || f == (e.s < 0 ? 3 : 2))
                : d > 5 ||
                  (5 == d &&
                    (4 == f ||
                      i ||
                      (6 == f &&
                        (c > 0 ? (o > 0 ? l / s[a - o] : 0) : p[h - 1]) % 10 &
                          1) ||
                      f == (e.s < 0 ? 8 : 7)))),
            t < 1 || !p[0])
          )
            return (
              (p.length = 0),
              i
                ? ((t -= e.e + 1),
                  (p[0] = s[(14 - (t % 14)) % 14]),
                  (e.e = -t || 0))
                : (p[0] = e.e = 0),
              e
            );
          if (
            (0 == c
              ? ((p.length = h), (u = 1), h--)
              : ((p.length = h + 1),
                (u = s[14 - c]),
                (p[h] = o > 0 ? n((l / s[a - o]) % s[o]) * u : 0)),
            i)
          )
            for (;;)
              if (0 == h) {
                for (c = 1, o = p[0]; o >= 10; o /= 10, c++);
                for (o = p[0] += u, u = 1; o >= 10; o /= 10, u++);
                c != u && (e.e++, 1e14 == p[0] && (p[0] = 1));
                break;
              } else {
                if (((p[h] += u), 1e14 != p[h])) break;
                ((p[h--] = 0), (u = 1));
              }
          for (c = p.length; 0 === p[--c]; p.pop());
        }
        e.e > T ? (e.c = e.e = null) : e.e < _ && (e.c = [(e.e = 0)]);
      }
      return e;
    }
    function K(e) {
      var t,
        r = e.e;
      return null === r
        ? e.toString()
        : ((t = c(e.c)),
          (t = r <= R || r >= N ? h(t, r) : d(t, r, "0")),
          e.s < 0 ? "-" + t : t);
    }
    return (
      (L.clone = e),
      (L.ROUND_UP = 0),
      (L.ROUND_DOWN = 1),
      (L.ROUND_CEIL = 2),
      (L.ROUND_FLOOR = 3),
      (L.ROUND_HALF_UP = 4),
      (L.ROUND_HALF_DOWN = 5),
      (L.ROUND_HALF_EVEN = 6),
      (L.ROUND_HALF_CEIL = 7),
      (L.ROUND_HALF_FLOOR = 8),
      (L.EUCLID = 9),
      (L.config = L.set =
        function (e) {
          var t, r;
          if (null != e)
            if ("object" == typeof e) {
              if (
                (e.hasOwnProperty((t = "DECIMAL_PLACES")) &&
                  (u((r = e[t]), 0, 1e9, t), (S = r)),
                e.hasOwnProperty((t = "ROUNDING_MODE")) &&
                  (u((r = e[t]), 0, 8, t), (A = r)),
                e.hasOwnProperty((t = "EXPONENTIAL_AT")) &&
                  ((r = e[t]) && r.pop
                    ? (u(r[0], -1e9, 0, t),
                      u(r[1], 0, 1e9, t),
                      (R = r[0]),
                      (N = r[1]))
                    : (u(r, -1e9, 1e9, t), (R = -(N = r < 0 ? -r : r)))),
                e.hasOwnProperty((t = "RANGE")))
              )
                if ((r = e[t]) && r.pop)
                  (u(r[0], -1e9, -1, t),
                    u(r[1], 1, 1e9, t),
                    (_ = r[0]),
                    (T = r[1]));
                else if ((u(r, -1e9, 1e9, t), r)) _ = -(T = r < 0 ? -r : r);
                else throw Error(f + t + " cannot be zero: " + r);
              if (e.hasOwnProperty((t = "CRYPTO")))
                if (!!(r = e[t]) === r)
                  if (r)
                    if (
                      "u" > typeof crypto &&
                      crypto &&
                      (crypto.getRandomValues || crypto.randomBytes)
                    )
                      P = r;
                    else throw ((P = !r), Error(f + "crypto unavailable"));
                  else P = r;
                else throw Error(f + t + " not true or false: " + r);
              if (
                (e.hasOwnProperty((t = "MODULO_MODE")) &&
                  (u((r = e[t]), 0, 9, t), (U = r)),
                e.hasOwnProperty((t = "POW_PRECISION")) &&
                  (u((r = e[t]), 0, 1e9, t), (q = r)),
                e.hasOwnProperty((t = "FORMAT")))
              )
                if ("object" == typeof (r = e[t])) C = r;
                else throw Error(f + t + " not an object: " + r);
              if (e.hasOwnProperty((t = "ALPHABET"))) {
                if (
                  "string" != typeof (r = e[t]) ||
                  /^.?$|[+\-.\s]|(.).*\1/.test(r)
                )
                  throw Error(f + t + " invalid: " + r);
                ((F = "0123456789" == r.slice(0, 10)), (D = r));
              }
            } else throw Error(f + "Object expected: " + e);
          return {
            DECIMAL_PLACES: S,
            ROUNDING_MODE: A,
            EXPONENTIAL_AT: [R, N],
            RANGE: [_, T],
            CRYPTO: P,
            MODULO_MODE: U,
            POW_PRECISION: q,
            FORMAT: C,
            ALPHABET: D,
          };
        }),
      (L.isBigNumber = function (e) {
        if (!e || !0 !== e._isBigNumber) return !1;
        if (!L.DEBUG) return !0;
        var t,
          r,
          i = e.c,
          s = e.e,
          a = e.s;
        e: if ("[object Array]" == {}.toString.call(i)) {
          if ((1 === a || -1 === a) && s >= -1e9 && s <= 1e9 && s === n(s)) {
            if (0 === i[0]) {
              if (0 === s && 1 === i.length) return !0;
              break e;
            }
            if (
              ((t = (s + 1) % 14) < 1 && (t += 14), String(i[0]).length == t)
            ) {
              for (t = 0; t < i.length; t++)
                if ((r = i[t]) < 0 || r >= 1e14 || r !== n(r)) break e;
              if (0 !== r) return !0;
            }
          }
        } else if (
          null === i &&
          null === s &&
          (null === a || 1 === a || -1 === a)
        )
          return !0;
        throw Error(f + "Invalid BigNumber: " + e);
      }),
      (L.maximum = L.max =
        function () {
          return M(arguments, -1);
        }),
      (L.minimum = L.min =
        function () {
          return M(arguments, 1);
        }),
      (g =
        (0x20000000000000 * Math.random()) & 2097151
          ? function () {
              return n(0x20000000000000 * Math.random());
            }
          : function () {
              return (
                ((0x40000000 * Math.random()) | 0) * 8388608 +
                ((8388608 * Math.random()) | 0)
              );
            }),
      (L.random = function (e) {
        var t,
          i,
          a,
          c,
          o,
          l = 0,
          h = [],
          d = new L(I);
        if ((null == e ? (e = S) : u(e, 0, 1e9), (c = r(e / 14)), P))
          if (crypto.getRandomValues) {
            for (t = crypto.getRandomValues(new Uint32Array((c *= 2))); l < c; )
              (o = 131072 * t[l] + (t[l + 1] >>> 11)) >= 9e15
                ? ((i = crypto.getRandomValues(new Uint32Array(2))),
                  (t[l] = i[0]),
                  (t[l + 1] = i[1]))
                : (h.push(o % 1e14), (l += 2));
            l = c / 2;
          } else if (crypto.randomBytes) {
            for (t = crypto.randomBytes((c *= 7)); l < c; )
              (o =
                (31 & t[l]) * 0x1000000000000 +
                0x10000000000 * t[l + 1] +
                0x100000000 * t[l + 2] +
                0x1000000 * t[l + 3] +
                (t[l + 4] << 16) +
                (t[l + 5] << 8) +
                t[l + 6]) >= 9e15
                ? crypto.randomBytes(7).copy(t, l)
                : (h.push(o % 1e14), (l += 7));
            l = c / 7;
          } else throw ((P = !1), Error(f + "crypto unavailable"));
        if (!P) for (; l < c; ) (o = g()) < 9e15 && (h[l++] = o % 1e14);
        for (
          c = h[--l],
            e %= 14,
            c && e && ((o = s[14 - e]), (h[l] = n(c / o) * o));
          0 === h[l];
          h.pop(), l--
        );
        if (l < 0) h = [(a = 0)];
        else {
          for (a = -1; 0 === h[0]; h.splice(0, 1), a -= 14);
          for (l = 1, o = h[0]; o >= 10; o /= 10, l++);
          l < 14 && (a -= 14 - l);
        }
        return ((d.e = a), (d.c = h), d);
      }),
      (L.sum = function () {
        for (var e = 1, t = arguments, r = new L(t[0]); e < t.length; )
          r = r.plus(t[e++]);
        return r;
      }),
      (E = (function () {
        var e = "0123456789";
        function t(e, t, r, n) {
          for (var f, i, s = [0], a = 0, c = e.length; a < c; ) {
            for (i = s.length; i--; s[i] *= t);
            for (s[0] += n.indexOf(e.charAt(a++)), f = 0; f < s.length; f++)
              s[f] > r - 1 &&
                (null == s[f + 1] && (s[f + 1] = 0),
                (s[f + 1] += (s[f] / r) | 0),
                (s[f] %= r));
          }
          return s.reverse();
        }
        return function (r, n, f, i, s) {
          var a,
            o,
            u,
            l,
            h,
            p,
            g,
            m,
            b = r.indexOf("."),
            y = S,
            w = A;
          for (
            b >= 0 &&
              ((l = q),
              (q = 0),
              (r = r.replace(".", "")),
              (p = (m = new L(n)).pow(r.length - b)),
              (q = l),
              (m.c = t(d(c(p.c), p.e, "0"), 10, f, e)),
              (m.e = m.c.length)),
              u = l = (g = t(r, n, f, s ? ((a = D), e) : ((a = e), D))).length;
            0 == g[--l];
            g.pop()
          );
          if (!g[0]) return a.charAt(0);
          if (
            (b < 0
              ? --u
              : ((p.c = g),
                (p.e = u),
                (p.s = i),
                (g = (p = v(p, m, y, w, f)).c),
                (h = p.r),
                (u = p.e)),
            (b = g[(o = u + y + 1)]),
            (l = f / 2),
            (h = h || o < 0 || null != g[o + 1]),
            (h =
              w < 4
                ? (null != b || h) && (0 == w || w == (p.s < 0 ? 3 : 2))
                : b > l ||
                  (b == l &&
                    (4 == w ||
                      h ||
                      (6 == w && 1 & g[o - 1]) ||
                      w == (p.s < 0 ? 8 : 7)))),
            o < 1 || !g[0])
          )
            r = h ? d(a.charAt(1), -y, a.charAt(0)) : a.charAt(0);
          else {
            if (((g.length = o), h))
              for (--f; ++g[--o] > f; )
                ((g[o] = 0), o || (++u, (g = [1].concat(g))));
            for (l = g.length; !g[--l]; );
            for (b = 0, r = ""; b <= l; r += a.charAt(g[b++]));
            r = d(r, u, a.charAt(0));
          }
          return r;
        };
      })()),
      (v = (function () {
        function e(e, t, r) {
          var n,
            f,
            i,
            s,
            a = 0,
            c = e.length,
            o = t % 1e7,
            u = (t / 1e7) | 0;
          for (e = e.slice(); c--; )
            ((n = u * (i = e[c] % 1e7) + (s = (e[c] / 1e7) | 0) * o),
              (a =
                (((f = o * i + (n % 1e7) * 1e7 + a) / r) | 0) +
                ((n / 1e7) | 0) +
                u * s),
              (e[c] = f % r));
          return (a && (e = [a].concat(e)), e);
        }
        function t(e, t, r, n) {
          var f, i;
          if (r != n) i = r > n ? 1 : -1;
          else
            for (f = i = 0; f < r; f++)
              if (e[f] != t[f]) {
                i = e[f] > t[f] ? 1 : -1;
                break;
              }
          return i;
        }
        function r(e, t, r, n) {
          for (var f = 0; r--; )
            ((e[r] -= f), (f = +(e[r] < t[r])), (e[r] = f * n + e[r] - t[r]));
          for (; !e[0] && e.length > 1; e.splice(0, 1));
        }
        return function (f, i, s, c, o) {
          var u,
            l,
            h,
            d,
            p,
            g,
            m,
            b,
            y,
            w,
            B,
            v,
            E,
            x,
            O,
            I,
            S,
            A = f.s == i.s ? 1 : -1,
            R = f.c,
            N = i.c;
          if (!R || !R[0] || !N || !N[0])
            return new L(
              !f.s || !i.s || (R ? N && R[0] == N[0] : !N)
                ? 0 / 0
                : (R && 0 == R[0]) || !N
                  ? 0 * A
                  : A / 0,
            );
          for (
            y = (b = new L(A)).c = [],
              A = s + (l = f.e - i.e) + 1,
              o ||
                ((o = 1e14),
                (l = a(f.e / 14) - a(i.e / 14)),
                (A = (A / 14) | 0)),
              h = 0;
            N[h] == (R[h] || 0);
            h++
          );
          if ((N[h] > (R[h] || 0) && l--, A < 0)) (y.push(1), (d = !0));
          else {
            for (
              x = R.length,
                I = N.length,
                h = 0,
                A += 2,
                (p = n(o / (N[0] + 1))) > 1 &&
                  ((N = e(N, p, o)),
                  (R = e(R, p, o)),
                  (I = N.length),
                  (x = R.length)),
                E = I,
                B = (w = R.slice(0, I)).length;
              B < I;
              w[B++] = 0
            );
            ((S = [0].concat((S = N.slice()))),
              (O = N[0]),
              N[1] >= o / 2 && O++);
            do {
              if (((p = 0), (u = t(N, w, I, B)) < 0)) {
                if (
                  ((v = w[0]),
                  I != B && (v = v * o + (w[1] || 0)),
                  (p = n(v / O)) > 1)
                )
                  for (
                    p >= o && (p = o - 1),
                      m = (g = e(N, p, o)).length,
                      B = w.length;
                    1 == t(g, w, m, B);

                  )
                    (p--, r(g, I < m ? S : N, m, o), (m = g.length), (u = 1));
                else (0 == p && (u = p = 1), (m = (g = N.slice()).length));
                if (
                  (m < B && (g = [0].concat(g)),
                  r(w, g, B, o),
                  (B = w.length),
                  -1 == u)
                )
                  for (; 1 > t(N, w, I, B); )
                    (p++, r(w, I < B ? S : N, B, o), (B = w.length));
              } else 0 === u && (p++, (w = [0]));
              ((y[h++] = p),
                w[0] ? (w[B++] = R[E] || 0) : ((w = [R[E]]), (B = 1)));
            } while ((E++ < x || null != w[0]) && A--);
            ((d = null != w[0]), y[0] || y.splice(0, 1));
          }
          if (1e14 == o) {
            for (h = 1, A = y[0]; A >= 10; A /= 10, h++);
            Z(b, s + (b.e = h + 14 * l - 1) + 1, c, d);
          } else ((b.e = l), (b.r = +d));
          return b;
        };
      })()),
      (m = /^(-?)0([xbo])(?=\w[\w.]*$)/i),
      (b = /^([^.]+)\.$/),
      (y = /^\.([^.]+)$/),
      (w = /^-?(Infinity|NaN)$/),
      (B = /^\s*\+(?=[\w.])|^\s+|\s+$/g),
      (x = function (e, t, r, n) {
        var i,
          s = r ? t : t.replace(B, "");
        if (w.test(s)) e.s = isNaN(s) ? null : s < 0 ? -1 : 1;
        else {
          if (
            !r &&
            ((s = s.replace(m, function (e, t, r) {
              return (
                (i = "x" == (r = r.toLowerCase()) ? 16 : "b" == r ? 2 : 8),
                n && n != i ? e : t
              );
            })),
            n && ((i = n), (s = s.replace(b, "$1").replace(y, "0.$1"))),
            t != s)
          )
            return new L(s, i);
          if (L.DEBUG)
            throw Error(
              f + "Not a" + (n ? " base " + n : "") + " number: " + t,
            );
          e.s = null;
        }
        e.c = e.e = null;
      }),
      (O.absoluteValue = O.abs =
        function () {
          var e = new L(this);
          return (e.s < 0 && (e.s = 1), e);
        }),
      (O.comparedTo = function (e, t) {
        return o(this, new L(e, t));
      }),
      (O.decimalPlaces = O.dp =
        function (e, t) {
          var r, n, f;
          if (null != e)
            return (
              u(e, 0, 1e9),
              null == t ? (t = A) : u(t, 0, 8),
              Z(new L(this), e + this.e + 1, t)
            );
          if (!(r = this.c)) return null;
          if (((n = ((f = r.length - 1) - a(this.e / 14)) * 14), (f = r[f])))
            for (; f % 10 == 0; f /= 10, n--);
          return (n < 0 && (n = 0), n);
        }),
      (O.dividedBy = O.div =
        function (e, t) {
          return v(this, new L(e, t), S, A);
        }),
      (O.dividedToIntegerBy = O.idiv =
        function (e, t) {
          return v(this, new L(e, t), 0, 1);
        }),
      (O.exponentiatedBy = O.pow =
        function (e, t) {
          var i,
            s,
            a,
            c,
            o,
            u,
            h,
            d,
            p,
            g = this;
          if ((e = new L(e)).c && !e.isInteger())
            throw Error(f + "Exponent not an integer: " + K(e));
          if (
            (null != t && (t = new L(t)),
            (u = e.e > 14),
            !g.c ||
              !g.c[0] ||
              (1 == g.c[0] && !g.e && 1 == g.c.length) ||
              !e.c ||
              !e.c[0])
          )
            return (
              (p = new L(Math.pow(+K(g), u ? e.s * (2 - l(e)) : +K(e)))),
              t ? p.mod(t) : p
            );
          if (((h = e.s < 0), t)) {
            if (t.c ? !t.c[0] : !t.s) return new L(0 / 0);
            (s = !h && g.isInteger() && t.isInteger()) && (g = g.mod(t));
          } else {
            if (
              e.e > 9 &&
              (g.e > 0 ||
                g.e < -1 ||
                (0 == g.e
                  ? g.c[0] > 1 || (u && g.c[1] >= 24e7)
                  : g.c[0] < 8e13 || (u && g.c[0] <= 9999975e7)))
            )
              return (
                (c = g.s < 0 && l(e) ? -0 : 0),
                g.e > -1 && (c = 1 / c),
                new L(h ? 1 / c : c)
              );
            q && (c = r(q / 14 + 2));
          }
          for (
            u
              ? ((i = new L(0.5)), h && (e.s = 1), (d = l(e)))
              : (d = (a = Math.abs(+K(e))) % 2),
              p = new L(I);
            ;

          ) {
            if (d) {
              if (!(p = p.times(g)).c) break;
              c ? p.c.length > c && (p.c.length = c) : s && (p = p.mod(t));
            }
            if (a) {
              if (0 === (a = n(a / 2))) break;
              d = a % 2;
            } else if ((Z((e = e.times(i)), e.e + 1, 1), e.e > 14)) d = l(e);
            else {
              if (0 == (a = +K(e))) break;
              d = a % 2;
            }
            ((g = g.times(g)),
              c
                ? g.c && g.c.length > c && (g.c.length = c)
                : s && (g = g.mod(t)));
          }
          return s
            ? p
            : (h && (p = I.div(p)), t ? p.mod(t) : c ? Z(p, q, A, o) : p);
        }),
      (O.integerValue = function (e) {
        var t = new L(this);
        return (null == e ? (e = A) : u(e, 0, 8), Z(t, t.e + 1, e));
      }),
      (O.isEqualTo = O.eq =
        function (e, t) {
          return 0 === o(this, new L(e, t));
        }),
      (O.isFinite = function () {
        return !!this.c;
      }),
      (O.isGreaterThan = O.gt =
        function (e, t) {
          return o(this, new L(e, t)) > 0;
        }),
      (O.isGreaterThanOrEqualTo = O.gte =
        function (e, t) {
          return 1 === (t = o(this, new L(e, t))) || 0 === t;
        }),
      (O.isInteger = function () {
        return !!this.c && a(this.e / 14) > this.c.length - 2;
      }),
      (O.isLessThan = O.lt =
        function (e, t) {
          return 0 > o(this, new L(e, t));
        }),
      (O.isLessThanOrEqualTo = O.lte =
        function (e, t) {
          return -1 === (t = o(this, new L(e, t))) || 0 === t;
        }),
      (O.isNaN = function () {
        return !this.s;
      }),
      (O.isNegative = function () {
        return this.s < 0;
      }),
      (O.isPositive = function () {
        return this.s > 0;
      }),
      (O.isZero = function () {
        return !!this.c && 0 == this.c[0];
      }),
      (O.minus = function (e, t) {
        var r,
          n,
          f,
          i,
          s = this.s;
        if (((t = (e = new L(e, t)).s), !s || !t)) return new L(0 / 0);
        if (s != t) return ((e.s = -t), this.plus(e));
        var c = this.e / 14,
          o = e.e / 14,
          u = this.c,
          l = e.c;
        if (!c || !o) {
          if (!u || !l) return u ? ((e.s = -t), e) : new L(l ? this : 0 / 0);
          if (!u[0] || !l[0])
            return l[0]
              ? ((e.s = -t), e)
              : new L(u[0] ? this : 3 == A ? -0 : 0);
        }
        if (((c = a(c)), (o = a(o)), (u = u.slice()), (s = c - o))) {
          for (
            (i = s < 0) ? ((s = -s), (f = u)) : ((o = c), (f = l)),
              f.reverse(),
              t = s;
            t--;
            f.push(0)
          );
          f.reverse();
        } else
          for (
            n = (i = (s = u.length) < (t = l.length)) ? s : t, s = t = 0;
            t < n;
            t++
          )
            if (u[t] != l[t]) {
              i = u[t] < l[t];
              break;
            }
        if (
          (i && ((f = u), (u = l), (l = f), (e.s = -e.s)),
          (t = (n = l.length) - (r = u.length)) > 0)
        )
          for (; t--; u[r++] = 0);
        for (t = 1e14 - 1; n > s; ) {
          if (u[--n] < l[n]) {
            for (r = n; r && !u[--r]; u[r] = t);
            (--u[r], (u[n] += 1e14));
          }
          u[n] -= l[n];
        }
        for (; 0 == u[0]; u.splice(0, 1), --o);
        return u[0]
          ? z(e, u, o)
          : ((e.s = 3 == A ? -1 : 1), (e.c = [(e.e = 0)]), e);
      }),
      (O.modulo = O.mod =
        function (e, t) {
          var r, n;
          return ((e = new L(e, t)), this.c && e.s && (!e.c || e.c[0]))
            ? e.c && (!this.c || this.c[0])
              ? (9 == U
                  ? ((n = e.s),
                    (e.s = 1),
                    (r = v(this, e, 0, 3)),
                    (e.s = n),
                    (r.s *= n))
                  : (r = v(this, e, 0, U)),
                (e = this.minus(r.times(e))).c[0] || 1 != U || (e.s = this.s),
                e)
              : new L(this)
            : new L(0 / 0);
        }),
      (O.multipliedBy = O.times =
        function (e, t) {
          var r,
            n,
            f,
            i,
            s,
            c,
            o,
            u,
            l,
            h,
            d,
            p,
            g,
            m = this.c,
            b = (e = new L(e, t)).c;
          if (!m || !b || !m[0] || !b[0])
            return (
              this.s && e.s && (!m || m[0] || b) && (!b || b[0] || m)
                ? ((e.s *= this.s),
                  m && b ? ((e.c = [0]), (e.e = 0)) : (e.c = e.e = null))
                : (e.c = e.e = e.s = null),
              e
            );
          for (
            n = a(this.e / 14) + a(e.e / 14),
              e.s *= this.s,
              (o = m.length) < (h = b.length) &&
                ((g = m), (m = b), (b = g), (f = o), (o = h), (h = f)),
              f = o + h,
              g = [];
            f--;
            g.push(0)
          );
          for (f = h; --f >= 0; ) {
            for (
              r = 0, d = b[f] % 1e7, p = (b[f] / 1e7) | 0, i = f + (s = o);
              i > f;

            )
              ((c = p * (u = m[--s] % 1e7) + (l = (m[s] / 1e7) | 0) * d),
                (r =
                  (((u = d * u + (c % 1e7) * 1e7 + g[i] + r) / 1e14) | 0) +
                  ((c / 1e7) | 0) +
                  p * l),
                (g[i--] = u % 1e14));
            g[i] = r;
          }
          return (r ? ++n : g.splice(0, 1), z(e, g, n));
        }),
      (O.negated = function () {
        var e = new L(this);
        return ((e.s = -e.s || null), e);
      }),
      (O.plus = function (e, t) {
        var r,
          n = this.s;
        if (((t = (e = new L(e, t)).s), !n || !t)) return new L(0 / 0);
        if (n != t) return ((e.s = -t), this.minus(e));
        var f = this.e / 14,
          i = e.e / 14,
          s = this.c,
          c = e.c;
        if (!f || !i) {
          if (!s || !c) return new L(n / 0);
          if (!s[0] || !c[0]) return c[0] ? e : new L(s[0] ? this : 0 * n);
        }
        if (((f = a(f)), (i = a(i)), (s = s.slice()), (n = f - i))) {
          for (
            n > 0 ? ((i = f), (r = c)) : ((n = -n), (r = s)), r.reverse();
            n--;
            r.push(0)
          );
          r.reverse();
        }
        for (
          (n = s.length) - (t = c.length) < 0 &&
            ((r = c), (c = s), (s = r), (t = n)),
            n = 0;
          t;

        )
          ((n = ((s[--t] = s[t] + c[t] + n) / 1e14) | 0),
            (s[t] = 1e14 === s[t] ? 0 : s[t] % 1e14));
        return (n && ((s = [n].concat(s)), ++i), z(e, s, i));
      }),
      (O.precision = O.sd =
        function (e, t) {
          var r, n, f;
          if (null != e && !!e !== e)
            return (
              u(e, 1, 1e9),
              null == t ? (t = A) : u(t, 0, 8),
              Z(new L(this), e, t)
            );
          if (!(r = this.c)) return null;
          if (((n = 14 * (f = r.length - 1) + 1), (f = r[f]))) {
            for (; f % 10 == 0; f /= 10, n--);
            for (f = r[0]; f >= 10; f /= 10, n++);
          }
          return (e && this.e + 1 > n && (n = this.e + 1), n);
        }),
      (O.shiftedBy = function (e) {
        return (
          u(e, -0x1fffffffffffff, 0x1fffffffffffff),
          this.times("1e" + e)
        );
      }),
      (O.squareRoot = O.sqrt =
        function () {
          var e,
            t,
            r,
            n,
            f,
            i = this.c,
            s = this.s,
            o = this.e,
            u = S + 4,
            l = new L("0.5");
          if (1 !== s || !i || !i[0])
            return new L(
              !s || (s < 0 && (!i || i[0])) ? 0 / 0 : i ? this : 1 / 0,
            );
          if (
            (0 == (s = Math.sqrt(+K(this))) || 1 / 0 == s
              ? (((t = c(i)).length + o) % 2 == 0 && (t += "0"),
                (s = Math.sqrt(+t)),
                (o = a((o + 1) / 2) - (o < 0 || o % 2)),
                (r = new L(
                  (t =
                    1 / 0 == s
                      ? "5e" + o
                      : (t = s.toExponential()).slice(0, t.indexOf("e") + 1) +
                        o),
                )))
              : (r = new L(s + "")),
            r.c[0])
          ) {
            for ((s = (o = r.e) + u) < 3 && (s = 0); ; )
              if (
                ((f = r),
                (r = l.times(f.plus(v(this, f, u, 1)))),
                c(f.c).slice(0, s) === (t = c(r.c)).slice(0, s))
              ) {
                if (
                  (r.e < o && --s,
                  "9999" != (t = t.slice(s - 3, s + 1)) && (n || "4999" != t))
                ) {
                  (+t && (+t.slice(1) || "5" != t.charAt(0))) ||
                    (Z(r, r.e + S + 2, 1), (e = !r.times(r).eq(this)));
                  break;
                }
                if (!n && (Z(f, f.e + S + 2, 0), f.times(f).eq(this))) {
                  r = f;
                  break;
                }
                ((u += 4), (s += 4), (n = 1));
              }
          }
          return Z(r, r.e + S + 1, A, e);
        }),
      (O.toExponential = function (e, t) {
        return (null != e && (u(e, 0, 1e9), e++), G(this, e, t, 1));
      }),
      (O.toFixed = function (e, t) {
        return (
          null != e && (u(e, 0, 1e9), (e = e + this.e + 1)),
          G(this, e, t)
        );
      }),
      (O.toFormat = function (e, t, r) {
        var n;
        if (null == r)
          null != e && t && "object" == typeof t
            ? ((r = t), (t = null))
            : e && "object" == typeof e
              ? ((r = e), (e = t = null))
              : (r = C);
        else if ("object" != typeof r)
          throw Error(f + "Argument not an object: " + r);
        if (((n = this.toFixed(e, t)), this.c)) {
          var i,
            s = n.split("."),
            a = +r.groupSize,
            c = +r.secondaryGroupSize,
            o = r.groupSeparator || "",
            u = s[0],
            l = s[1],
            h = this.s < 0,
            d = h ? u.slice(1) : u,
            p = d.length;
          if ((c && ((i = a), (a = c), (c = i), (p -= i)), a > 0 && p > 0)) {
            for (i = p % a || a, u = d.substr(0, i); i < p; i += a)
              u += o + d.substr(i, a);
            (c > 0 && (u += o + d.slice(i)), h && (u = "-" + u));
          }
          n = l
            ? u +
              (r.decimalSeparator || "") +
              ((c = +r.fractionGroupSize)
                ? l.replace(
                    RegExp("\\d{" + c + "}\\B", "g"),
                    "$&" + (r.fractionGroupSeparator || ""),
                  )
                : l)
            : u;
        }
        return (r.prefix || "") + n + (r.suffix || "");
      }),
      (O.toFraction = function (e) {
        var t,
          r,
          n,
          i,
          a,
          o,
          u,
          l,
          h,
          d,
          p,
          g,
          m = this.c;
        if (
          null != e &&
          ((!(u = new L(e)).isInteger() && (u.c || 1 !== u.s)) || u.lt(I))
        )
          throw Error(
            f +
              "Argument " +
              (u.isInteger() ? "out of range: " : "not an integer: ") +
              K(u),
          );
        if (!m) return new L(this);
        for (
          t = new L(I),
            h = r = new L(I),
            n = l = new L(I),
            g = c(m),
            a = t.e = g.length - this.e - 1,
            t.c[0] = s[(o = a % 14) < 0 ? 14 + o : o],
            e = !e || u.comparedTo(t) > 0 ? (a > 0 ? t : h) : u,
            o = T,
            T = 1 / 0,
            u = new L(g),
            l.c[0] = 0;
          (d = v(u, t, 0, 1)), 1 != (i = r.plus(d.times(n))).comparedTo(e);

        )
          ((r = n),
            (n = i),
            (h = l.plus(d.times((i = h)))),
            (l = i),
            (t = u.minus(d.times((i = t)))),
            (u = i));
        return (
          (i = v(e.minus(r), n, 0, 1)),
          (l = l.plus(i.times(h))),
          (r = r.plus(i.times(n))),
          (l.s = h.s = this.s),
          (a *= 2),
          (p =
            1 >
            v(h, n, a, A)
              .minus(this)
              .abs()
              .comparedTo(v(l, r, a, A).minus(this).abs())
              ? [h, n]
              : [l, r]),
          (T = o),
          p
        );
      }),
      (O.toNumber = function () {
        return +K(this);
      }),
      (O.toPrecision = function (e, t) {
        return (null != e && u(e, 1, 1e9), G(this, e, t, 2));
      }),
      (O.toString = function (e) {
        var t,
          r = this,
          n = r.s,
          f = r.e;
        return (
          null === f
            ? n
              ? ((t = "Infinity"), n < 0 && (t = "-" + t))
              : (t = "NaN")
            : (null == e
                ? (t = f <= R || f >= N ? h(c(r.c), f) : d(c(r.c), f, "0"))
                : 10 === e && F
                  ? (t = d(c((r = Z(new L(r), S + f + 1, A)).c), r.e, "0"))
                  : (u(e, 2, D.length, "Base"),
                    (t = E(d(c(r.c), f, "0"), 10, e, n, !0))),
              n < 0 && r.c[0] && (t = "-" + t)),
          t
        );
      }),
      (O.valueOf = O.toJSON =
        function () {
          return K(this);
        }),
      (O._isBigNumber = !0),
      (O[Symbol.toStringTag] = "BigNumber"),
      (O[Symbol.for("nodejs.util.inspect.custom")] = O.valueOf),
      null != p && L.set(p),
      L
    );
  })();
  e.s(["f", 0, p]);
};
