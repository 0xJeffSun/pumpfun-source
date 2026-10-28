// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(t, e, r) => {
  !(function (r) {
    "use strict";
    var i,
      n = {
        precision: 20,
        rounding: 4,
        toExpNeg: -7,
        toExpPos: 21,
        LN10: "2.302585092994045684017991454684364207601101488628772976033327900967572609677352480235997205089598298341967784042286",
      },
      s = !0,
      o = "[DecimalError] ",
      u = o + "Invalid argument: ",
      f = o + "Exponent out of range: ",
      c = Math.floor,
      h = Math.pow,
      l = /^(\d+(\.\d*)?|\.\d+)(e[+-]?\d+)?$/i,
      a = c(1286742750677284.5),
      d = {};
    function g(t, e) {
      var r,
        i,
        n,
        o,
        u,
        f,
        c,
        h,
        l = t.constructor,
        a = l.precision;
      if (!t.s || !e.s) return (e.s || (e = new l(t)), s ? x(e, a) : e);
      if (
        ((c = t.d),
        (h = e.d),
        (u = t.e),
        (n = e.e),
        (c = c.slice()),
        (o = u - n))
      ) {
        for (
          o < 0
            ? ((i = c), (o = -o), (f = h.length))
            : ((i = h), (n = u), (f = c.length)),
            o > (f = (u = Math.ceil(a / 7)) > f ? u + 1 : f + 1) &&
              ((o = f), (i.length = 1)),
            i.reverse();
          o--;

        )
          i.push(0);
        i.reverse();
      }
      for (
        (f = c.length) - (o = h.length) < 0 &&
          ((o = f), (i = h), (h = c), (c = i)),
          r = 0;
        o;

      )
        ((r = ((c[--o] = c[o] + h[o] + r) / 1e7) | 0), (c[o] %= 1e7));
      for (r && (c.unshift(r), ++n), f = c.length; 0 == c[--f]; ) c.pop();
      return ((e.d = c), (e.e = n), s ? x(e, a) : e);
    }
    function p(t, e, r) {
      if (t !== ~~t || t < e || t > r) throw Error(u + t);
    }
    function w(t) {
      var e,
        r,
        i,
        n = t.length - 1,
        s = "",
        o = t[0];
      if (n > 0) {
        for (s += o, e = 1; e < n; e++)
          ((r = 7 - (i = t[e] + "").length) && (s += b(r)), (s += i));
        (r = 7 - (i = (o = t[e]) + "").length) && (s += b(r));
      } else if (0 === o) return "0";
      for (; o % 10 == 0; ) o /= 10;
      return s + o;
    }
    ((d.absoluteValue = d.abs =
      function () {
        var t = new this.constructor(this);
        return (t.s && (t.s = 1), t);
      }),
      (d.comparedTo = d.cmp =
        function (t) {
          var e, r, i, n;
          if (((t = new this.constructor(t)), this.s !== t.s))
            return this.s || -t.s;
          if (this.e !== t.e) return (this.e > t.e) ^ (this.s < 0) ? 1 : -1;
          for (
            i = this.d.length, e = 0, r = i < (n = t.d.length) ? i : n;
            e < r;
            ++e
          )
            if (this.d[e] !== t.d[e])
              return (this.d[e] > t.d[e]) ^ (this.s < 0) ? 1 : -1;
          return i === n ? 0 : (i > n) ^ (this.s < 0) ? 1 : -1;
        }),
      (d.decimalPlaces = d.dp =
        function () {
          var t = this.d.length - 1,
            e = (t - this.e) * 7;
          if ((t = this.d[t])) for (; t % 10 == 0; t /= 10) e--;
          return e < 0 ? 0 : e;
        }),
      (d.dividedBy = d.div =
        function (t) {
          return v(this, new this.constructor(t));
        }),
      (d.dividedToIntegerBy = d.idiv =
        function (t) {
          var e = this.constructor;
          return x(v(this, new e(t), 0, 1), e.precision);
        }),
      (d.equals = d.eq =
        function (t) {
          return !this.cmp(t);
        }),
      (d.exponent = function () {
        return E(this);
      }),
      (d.greaterThan = d.gt =
        function (t) {
          return this.cmp(t) > 0;
        }),
      (d.greaterThanOrEqualTo = d.gte =
        function (t) {
          return this.cmp(t) >= 0;
        }),
      (d.isInteger = d.isint =
        function () {
          return this.e > this.d.length - 2;
        }),
      (d.isNegative = d.isneg =
        function () {
          return this.s < 0;
        }),
      (d.isPositive = d.ispos =
        function () {
          return this.s > 0;
        }),
      (d.isZero = function () {
        return 0 === this.s;
      }),
      (d.lessThan = d.lt =
        function (t) {
          return 0 > this.cmp(t);
        }),
      (d.lessThanOrEqualTo = d.lte =
        function (t) {
          return 1 > this.cmp(t);
        }),
      (d.logarithm = d.log =
        function (t) {
          var e,
            r = this.constructor,
            n = r.precision,
            u = n + 5;
          if (void 0 === t) t = new r(10);
          else if ((t = new r(t)).s < 1 || t.eq(i)) throw Error(o + "NaN");
          if (this.s < 1) throw Error(o + (this.s ? "NaN" : "-Infinity"));
          return this.eq(i)
            ? new r(0)
            : ((s = !1), (e = v(A(this, u), A(t, u), u)), (s = !0), x(e, n));
        }),
      (d.minus = d.sub =
        function (t) {
          return (
            (t = new this.constructor(t)),
            this.s == t.s ? P(this, t) : g(this, ((t.s = -t.s), t))
          );
        }),
      (d.modulo = d.mod =
        function (t) {
          var e,
            r = this.constructor,
            i = r.precision;
          if (!(t = new r(t)).s) throw Error(o + "NaN");
          return this.s
            ? ((s = !1),
              (e = v(this, t, 0, 1).times(t)),
              (s = !0),
              this.minus(e))
            : x(new r(this), i);
        }),
      (d.naturalExponential = d.exp =
        function () {
          return m(this);
        }),
      (d.naturalLogarithm = d.ln =
        function () {
          return A(this);
        }),
      (d.negated = d.neg =
        function () {
          var t = new this.constructor(this);
          return ((t.s = -t.s || 0), t);
        }),
      (d.plus = d.add =
        function (t) {
          return (
            (t = new this.constructor(t)),
            this.s == t.s ? g(this, t) : P(this, ((t.s = -t.s), t))
          );
        }),
      (d.precision = d.sd =
        function (t) {
          var e, r, i;
          if (void 0 !== t && !!t !== t && 1 !== t && 0 !== t)
            throw Error(u + t);
          if (
            ((e = E(this) + 1),
            (r = 7 * (i = this.d.length - 1) + 1),
            (i = this.d[i]))
          ) {
            for (; i % 10 == 0; i /= 10) r--;
            for (i = this.d[0]; i >= 10; i /= 10) r++;
          }
          return t && e > r ? e : r;
        }),
      (d.squareRoot = d.sqrt =
        function () {
          var t,
            e,
            r,
            i,
            n,
            u,
            f,
            h = this.constructor;
          if (this.s < 1) {
            if (!this.s) return new h(0);
            throw Error(o + "NaN");
          }
          for (
            t = E(this),
              s = !1,
              0 == (n = Math.sqrt(+this)) || 1 / 0 == n
                ? (((e = w(this.d)).length + t) % 2 == 0 && (e += "0"),
                  (n = Math.sqrt(e)),
                  (t = c((t + 1) / 2) - (t < 0 || t % 2)),
                  (i = new h(
                    (e =
                      1 / 0 == n
                        ? "5e" + t
                        : (e = n.toExponential()).slice(0, e.indexOf("e") + 1) +
                          t),
                  )))
                : (i = new h(n.toString())),
              n = f = (r = h.precision) + 3;
            ;

          )
            if (
              ((i = (u = i).plus(v(this, u, f + 2)).times(0.5)),
              w(u.d).slice(0, f) === (e = w(i.d)).slice(0, f))
            ) {
              if (((e = e.slice(f - 3, f + 1)), n == f && "4999" == e)) {
                if ((x(u, r + 1, 0), u.times(u).eq(this))) {
                  i = u;
                  break;
                }
              } else if ("9999" != e) break;
              f += 4;
            }
          return ((s = !0), x(i, r));
        }),
      (d.times = d.mul =
        function (t) {
          var e,
            r,
            i,
            n,
            o,
            u,
            f,
            c,
            h,
            l = this.constructor,
            a = this.d,
            d = (t = new l(t)).d;
          if (!this.s || !t.s) return new l(0);
          for (
            t.s *= this.s,
              r = this.e + t.e,
              (c = a.length) < (h = d.length) &&
                ((o = a), (a = d), (d = o), (u = c), (c = h), (h = u)),
              o = [],
              i = u = c + h;
            i--;

          )
            o.push(0);
          for (i = h; --i >= 0; ) {
            for (e = 0, n = c + i; n > i; )
              ((f = o[n] + d[i] * a[n - i - 1] + e),
                (o[n--] = f % 1e7 | 0),
                (e = (f / 1e7) | 0));
            o[n] = (o[n] + e) % 1e7 | 0;
          }
          for (; !o[--u]; ) o.pop();
          return (
            e ? ++r : o.shift(),
            (t.d = o),
            (t.e = r),
            s ? x(t, l.precision) : t
          );
        }),
      (d.toDecimalPlaces = d.todp =
        function (t, e) {
          var r = this,
            i = r.constructor;
          return ((r = new i(r)), void 0 === t)
            ? r
            : (p(t, 0, 1e9),
              void 0 === e ? (e = i.rounding) : p(e, 0, 8),
              x(r, t + E(r) + 1, e));
        }),
      (d.toExponential = function (t, e) {
        var r,
          i = this,
          n = i.constructor;
        return (
          void 0 === t
            ? (r = O(i, !0))
            : (p(t, 0, 1e9),
              void 0 === e ? (e = n.rounding) : p(e, 0, 8),
              (r = O((i = x(new n(i), t + 1, e)), !0, t + 1))),
          r
        );
      }),
      (d.toFixed = function (t, e) {
        var r,
          i,
          n = this.constructor;
        return void 0 === t
          ? O(this)
          : (p(t, 0, 1e9),
            void 0 === e ? (e = n.rounding) : p(e, 0, 8),
            (r = O(
              (i = x(new n(this), t + E(this) + 1, e)).abs(),
              !1,
              t + E(i) + 1,
            )),
            this.isneg() && !this.isZero() ? "-" + r : r);
      }),
      (d.toInteger = d.toint =
        function () {
          var t = this.constructor;
          return x(new t(this), E(this) + 1, t.rounding);
        }),
      (d.toNumber = function () {
        return +this;
      }),
      (d.toPower = d.pow =
        function (t) {
          var e,
            r,
            n,
            u,
            f,
            h,
            l = this,
            a = l.constructor,
            d = +(t = new a(t));
          if (!t.s) return new a(i);
          if (!(l = new a(l)).s) {
            if (t.s < 1) throw Error(o + "Infinity");
            return l;
          }
          if (l.eq(i)) return l;
          if (((n = a.precision), t.eq(i))) return x(l, n);
          if (((h = (e = t.e) >= (r = t.d.length - 1)), (f = l.s), h)) {
            if ((r = d < 0 ? -d : d) <= 0x1fffffffffffff) {
              for (
                u = new a(i), e = Math.ceil(n / 7 + 4), s = !1;
                r % 2 && D((u = u.times(l)).d, e), 0 !== (r = c(r / 2));

              )
                D((l = l.times(l)).d, e);
              return ((s = !0), t.s < 0 ? new a(i).div(u) : x(u, n));
            }
          } else if (f < 0) throw Error(o + "NaN");
          return (
            (f = f < 0 && 1 & t.d[Math.max(e, r)] ? -1 : 1),
            (l.s = 1),
            (s = !1),
            (u = t.times(A(l, n + 12))),
            (s = !0),
            ((u = m(u)).s = f),
            u
          );
        }),
      (d.toPrecision = function (t, e) {
        var r,
          i,
          n = this,
          s = n.constructor;
        return (
          void 0 === t
            ? ((r = E(n)), (i = O(n, r <= s.toExpNeg || r >= s.toExpPos)))
            : (p(t, 1, 1e9),
              void 0 === e ? (e = s.rounding) : p(e, 0, 8),
              (r = E((n = x(new s(n), t, e)))),
              (i = O(n, t <= r || r <= s.toExpNeg, t))),
          i
        );
      }),
      (d.toSignificantDigits = d.tosd =
        function (t, e) {
          var r = this.constructor;
          return (
            void 0 === t
              ? ((t = r.precision), (e = r.rounding))
              : (p(t, 1, 1e9), void 0 === e ? (e = r.rounding) : p(e, 0, 8)),
            x(new r(this), t, e)
          );
        }),
      (d.toString =
        d.valueOf =
        d.val =
        d.toJSON =
          function () {
            var t = E(this),
              e = this.constructor;
            return O(this, t <= e.toExpNeg || t >= e.toExpPos);
          }));
    var v = (function () {
      function t(t, e) {
        var r,
          i = 0,
          n = t.length;
        for (t = t.slice(); n--; )
          ((r = t[n] * e + i), (t[n] = r % 1e7 | 0), (i = (r / 1e7) | 0));
        return (i && t.unshift(i), t);
      }
      function e(t, e, r, i) {
        var n, s;
        if (r != i) s = r > i ? 1 : -1;
        else
          for (n = s = 0; n < r; n++)
            if (t[n] != e[n]) {
              s = t[n] > e[n] ? 1 : -1;
              break;
            }
        return s;
      }
      function r(t, e, r) {
        for (var i = 0; r--; )
          ((t[r] -= i), (i = +(t[r] < e[r])), (t[r] = 1e7 * i + t[r] - e[r]));
        for (; !t[0] && t.length > 1; ) t.shift();
      }
      return function (i, n, s, u) {
        var f,
          c,
          h,
          l,
          a,
          d,
          g,
          p,
          w,
          v,
          m,
          N,
          b,
          A,
          y,
          P,
          O,
          D,
          M = i.constructor,
          z = i.s == n.s ? 1 : -1,
          q = i.d,
          L = n.d;
        if (!i.s) return new M(i);
        if (!n.s) throw Error(o + "Division by zero");
        for (
          c = i.e - n.e,
            O = L.length,
            y = q.length,
            p = (g = new M(z)).d = [],
            h = 0;
          L[h] == (q[h] || 0);

        )
          ++h;
        if (
          (L[h] > (q[h] || 0) && --c,
          (N = null == s ? (s = M.precision) : u ? s + (E(i) - E(n)) + 1 : s) <
            0)
        )
          return new M(0);
        if (((N = (N / 7 + 2) | 0), (h = 0), 1 == O))
          for (l = 0, L = L[0], N++; (h < y || l) && N--; h++)
            ((b = 1e7 * l + (q[h] || 0)),
              (p[h] = (b / L) | 0),
              (l = b % L | 0));
        else {
          for (
            (l = (1e7 / (L[0] + 1)) | 0) > 1 &&
              ((L = t(L, l)), (q = t(q, l)), (O = L.length), (y = q.length)),
              A = O,
              v = (w = q.slice(0, O)).length;
            v < O;

          )
            w[v++] = 0;
          ((D = L.slice()).unshift(0), (P = L[0]), L[1] >= 5e6 && ++P);
          do
            ((l = 0),
              (f = e(L, w, O, v)) < 0
                ? ((m = w[0]),
                  O != v && (m = 1e7 * m + (w[1] || 0)),
                  (l = (m / P) | 0) > 1
                    ? (l >= 1e7 && (l = 1e7 - 1),
                      (d = (a = t(L, l)).length),
                      (v = w.length),
                      1 == (f = e(a, w, d, v)) && (l--, r(a, O < d ? D : L, d)))
                    : (0 == l && (f = l = 1), (a = L.slice())),
                  (d = a.length) < v && a.unshift(0),
                  r(w, a, v),
                  -1 == f &&
                    ((v = w.length),
                    (f = e(L, w, O, v)) < 1 && (l++, r(w, O < v ? D : L, v))),
                  (v = w.length))
                : 0 === f && (l++, (w = [0])),
              (p[h++] = l),
              f && w[0] ? (w[v++] = q[A] || 0) : ((w = [q[A]]), (v = 1)));
          while ((A++ < y || void 0 !== w[0]) && N--);
        }
        return (p[0] || p.shift(), (g.e = c), x(g, u ? s + E(g) + 1 : s));
      };
    })();
    function m(t, e) {
      var r,
        n,
        o,
        u,
        c,
        l = 0,
        a = 0,
        d = t.constructor,
        g = d.precision;
      if (E(t) > 16) throw Error(f + E(t));
      if (!t.s) return new d(i);
      for (
        null == e ? ((s = !1), (c = g)) : (c = e), u = new d(0.03125);
        t.abs().gte(0.1);

      )
        ((t = t.times(u)), (a += 5));
      for (
        c += ((Math.log(h(2, a)) / Math.LN10) * 2 + 5) | 0,
          r = n = o = new d(i),
          d.precision = c;
        ;

      ) {
        if (
          ((n = x(n.times(t), c)),
          (r = r.times(++l)),
          w((u = o.plus(v(n, r, c))).d).slice(0, c) === w(o.d).slice(0, c))
        ) {
          for (; a--; ) o = x(o.times(o), c);
          return ((d.precision = g), null == e ? ((s = !0), x(o, g)) : o);
        }
        o = u;
      }
    }
    function E(t) {
      for (var e = 7 * t.e, r = t.d[0]; r >= 10; r /= 10) e++;
      return e;
    }
    function N(t, e, r) {
      if (e > t.LN10.sd())
        throw (
          (s = !0),
          r && (t.precision = r),
          Error(o + "LN10 precision limit exceeded")
        );
      return x(new t(t.LN10), e);
    }
    function b(t) {
      for (var e = ""; t--; ) e += "0";
      return e;
    }
    function A(t, e) {
      var r,
        n,
        u,
        f,
        c,
        h,
        l,
        a,
        d,
        g = 1,
        p = t,
        m = p.d,
        b = p.constructor,
        y = b.precision;
      if (p.s < 1) throw Error(o + (p.s ? "NaN" : "-Infinity"));
      if (p.eq(i)) return new b(0);
      if ((null == e ? ((s = !1), (a = y)) : (a = e), p.eq(10)))
        return (null == e && (s = !0), N(b, a));
      if (
        ((b.precision = a += 10),
        (n = (r = w(m)).charAt(0)),
        !(15e14 > Math.abs((f = E(p)))))
      )
        return (
          (l = N(b, a + 2, y).times(f + "")),
          (p = A(new b(n + "." + r.slice(1)), a - 10).plus(l)),
          (b.precision = y),
          null == e ? ((s = !0), x(p, y)) : p
        );
      for (; (n < 7 && 1 != n) || (1 == n && r.charAt(1) > 3); )
        ((n = (r = w((p = p.times(t)).d)).charAt(0)), g++);
      for (
        f = E(p),
          n > 1
            ? ((p = new b("0." + r)), f++)
            : (p = new b(n + "." + r.slice(1))),
          h = c = p = v(p.minus(i), p.plus(i), a),
          d = x(p.times(p), a),
          u = 3;
        ;

      ) {
        if (
          ((c = x(c.times(d), a)),
          w((l = h.plus(v(c, new b(u), a))).d).slice(0, a) ===
            w(h.d).slice(0, a))
        )
          return (
            (h = h.times(2)),
            0 !== f && (h = h.plus(N(b, a + 2, y).times(f + ""))),
            (h = v(h, new b(g), a)),
            (b.precision = y),
            null == e ? ((s = !0), x(h, y)) : h
          );
        ((h = l), (u += 2));
      }
    }
    function y(t, e) {
      var r, i, n;
      for (
        (r = e.indexOf(".")) > -1 && (e = e.replace(".", "")),
          (i = e.search(/e/i)) > 0
            ? (r < 0 && (r = i),
              (r += +e.slice(i + 1)),
              (e = e.substring(0, i)))
            : r < 0 && (r = e.length),
          i = 0;
        48 === e.charCodeAt(i);

      )
        ++i;
      for (n = e.length; 48 === e.charCodeAt(n - 1); ) --n;
      if ((e = e.slice(i, n))) {
        if (
          ((n -= i),
          (t.e = c((r = r - i - 1) / 7)),
          (t.d = []),
          (i = (r + 1) % 7),
          r < 0 && (i += 7),
          i < n)
        ) {
          for (i && t.d.push(+e.slice(0, i)), n -= 7; i < n; )
            t.d.push(+e.slice(i, (i += 7)));
          i = 7 - (e = e.slice(i)).length;
        } else i -= n;
        for (; i--; ) e += "0";
        if ((t.d.push(+e), s && (t.e > a || t.e < -a))) throw Error(f + r);
      } else ((t.s = 0), (t.e = 0), (t.d = [0]));
      return t;
    }
    function x(t, e, r) {
      var i,
        n,
        o,
        u,
        l,
        d,
        g,
        p,
        w = t.d;
      for (u = 1, o = w[0]; o >= 10; o /= 10) u++;
      if ((i = e - u) < 0) ((i += 7), (n = e), (g = w[(p = 0)]));
      else {
        if ((p = Math.ceil((i + 1) / 7)) >= (o = w.length)) return t;
        for (g = o = w[p], u = 1; o >= 10; o /= 10) u++;
        ((i %= 7), (n = i - 7 + u));
      }
      if (
        (void 0 !== r &&
          ((l = (g / (o = h(10, u - n - 1))) % 10 | 0),
          (d = e < 0 || void 0 !== w[p + 1] || g % o),
          (d =
            r < 4
              ? (l || d) && (0 == r || r == (t.s < 0 ? 3 : 2))
              : l > 5 ||
                (5 == l &&
                  (4 == r ||
                    d ||
                    (6 == r &&
                      (i > 0 ? (n > 0 ? g / h(10, u - n) : 0) : w[p - 1]) % 10 &
                        1) ||
                    r == (t.s < 0 ? 8 : 7))))),
        e < 1 || !w[0])
      )
        return (
          d
            ? ((o = E(t)),
              (w.length = 1),
              (e = e - o - 1),
              (w[0] = h(10, (7 - (e % 7)) % 7)),
              (t.e = c(-e / 7) || 0))
            : ((w.length = 1), (w[0] = t.e = t.s = 0)),
          t
        );
      if (
        (0 == i
          ? ((w.length = p), (o = 1), p--)
          : ((w.length = p + 1),
            (o = h(10, 7 - i)),
            (w[p] = n > 0 ? ((g / h(10, u - n)) % h(10, n) | 0) * o : 0)),
        d)
      )
        for (;;)
          if (0 == p) {
            1e7 == (w[0] += o) && ((w[0] = 1), ++t.e);
            break;
          } else {
            if (((w[p] += o), 1e7 != w[p])) break;
            ((w[p--] = 0), (o = 1));
          }
      for (i = w.length; 0 === w[--i]; ) w.pop();
      if (s && (t.e > a || t.e < -a)) throw Error(f + E(t));
      return t;
    }
    function P(t, e) {
      var r,
        i,
        n,
        o,
        u,
        f,
        c,
        h,
        l,
        a,
        d = t.constructor,
        g = d.precision;
      if (!t.s || !e.s)
        return (e.s ? (e.s = -e.s) : (e = new d(t)), s ? x(e, g) : e);
      if (
        ((c = t.d),
        (a = e.d),
        (i = e.e),
        (h = t.e),
        (c = c.slice()),
        (u = h - i))
      ) {
        for (
          (l = u < 0)
            ? ((r = c), (u = -u), (f = a.length))
            : ((r = a), (i = h), (f = c.length)),
            u > (n = Math.max(Math.ceil(g / 7), f) + 2) &&
              ((u = n), (r.length = 1)),
            r.reverse(),
            n = u;
          n--;

        )
          r.push(0);
        r.reverse();
      } else {
        for (
          (l = (n = c.length) < (f = a.length)) && (f = n), n = 0;
          n < f;
          n++
        )
          if (c[n] != a[n]) {
            l = c[n] < a[n];
            break;
          }
        u = 0;
      }
      for (
        l && ((r = c), (c = a), (a = r), (e.s = -e.s)),
          f = c.length,
          n = a.length - f;
        n > 0;
        --n
      )
        c[f++] = 0;
      for (n = a.length; n > u; ) {
        if (c[--n] < a[n]) {
          for (o = n; o && 0 === c[--o]; ) c[o] = 1e7 - 1;
          (--c[o], (c[n] += 1e7));
        }
        c[n] -= a[n];
      }
      for (; 0 === c[--f]; ) c.pop();
      for (; 0 === c[0]; c.shift()) --i;
      return c[0] ? ((e.d = c), (e.e = i), s ? x(e, g) : e) : new d(0);
    }
    function O(t, e, r) {
      var i,
        n = E(t),
        s = w(t.d),
        o = s.length;
      return (
        e
          ? (r && (i = r - o) > 0
              ? (s = s.charAt(0) + "." + s.slice(1) + b(i))
              : o > 1 && (s = s.charAt(0) + "." + s.slice(1)),
            (s = s + (n < 0 ? "e" : "e+") + n))
          : n < 0
            ? ((s = "0." + b(-n - 1) + s), r && (i = r - o) > 0 && (s += b(i)))
            : n >= o
              ? ((s += b(n + 1 - o)),
                r && (i = r - n - 1) > 0 && (s = s + "." + b(i)))
              : ((i = n + 1) < o && (s = s.slice(0, i) + "." + s.slice(i)),
                r &&
                  (i = r - o) > 0 &&
                  (n + 1 === o && (s += "."), (s += b(i)))),
        t.s < 0 ? "-" + s : s
      );
    }
    function D(t, e) {
      if (t.length > e) return ((t.length = e), !0);
    }
    function M(t) {
      if (!t || "object" != typeof t) throw Error(o + "Object expected");
      var e,
        r,
        i,
        n = [
          "precision",
          1,
          1e9,
          "rounding",
          0,
          8,
          "toExpNeg",
          -1 / 0,
          0,
          "toExpPos",
          0,
          1 / 0,
        ];
      for (e = 0; e < n.length; e += 3)
        if (void 0 !== (i = t[(r = n[e])]))
          if (c(i) === i && i >= n[e + 1] && i <= n[e + 2]) this[r] = i;
          else throw Error(u + r + ": " + i);
      if (void 0 !== (i = t[(r = "LN10")]))
        if (i == Math.LN10) this[r] = new this(i);
        else throw Error(u + r + ": " + i);
      return this;
    }
    if (
      (((n = (function t(e) {
        var r, i, n;
        function s(t) {
          if (!(this instanceof s)) return new s(t);
          if (((this.constructor = s), t instanceof s)) {
            ((this.s = t.s),
              (this.e = t.e),
              (this.d = (t = t.d) ? t.slice() : t));
            return;
          }
          if ("number" == typeof t) {
            if (0 * t != 0) throw Error(u + t);
            if (t > 0) this.s = 1;
            else if (t < 0) ((t = -t), (this.s = -1));
            else {
              ((this.s = 0), (this.e = 0), (this.d = [0]));
              return;
            }
            if (t === ~~t && t < 1e7) {
              ((this.e = 0), (this.d = [t]));
              return;
            }
            return y(this, t.toString());
          }
          if ("string" != typeof t) throw Error(u + t);
          if (
            (45 === t.charCodeAt(0)
              ? ((t = t.slice(1)), (this.s = -1))
              : (this.s = 1),
            l.test(t))
          )
            y(this, t);
          else throw Error(u + t);
        }
        if (
          ((s.prototype = d),
          (s.ROUND_UP = 0),
          (s.ROUND_DOWN = 1),
          (s.ROUND_CEIL = 2),
          (s.ROUND_FLOOR = 3),
          (s.ROUND_HALF_UP = 4),
          (s.ROUND_HALF_DOWN = 5),
          (s.ROUND_HALF_EVEN = 6),
          (s.ROUND_HALF_CEIL = 7),
          (s.ROUND_HALF_FLOOR = 8),
          (s.clone = t),
          (s.config = s.set = M),
          void 0 === e && (e = {}),
          e)
        )
          for (
            r = 0,
              n = ["precision", "rounding", "toExpNeg", "toExpPos", "LN10"];
            r < n.length;

          )
            e.hasOwnProperty((i = n[r++])) || (e[i] = this[i]);
        return (s.config(e), s);
      })(n)).default = n.Decimal =
        n),
      (i = new n(1)),
      "function" == typeof define && define.amd)
    ) {
      let e;
      (t.r, void 0 !== (e = n) && t.v(e));
    } else
      e.exports
        ? (e.exports = n)
        : (r ||
            (r =
              "u" > typeof self && self && self.self == self
                ? self
                : Function("return this")()),
          (r.Decimal = n));
  })(t.e);
};
