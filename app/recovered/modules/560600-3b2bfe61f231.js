// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(t, e, r) => {
  !(function (r) {
    "use strict";
    var n,
      i = {
        precision: 20,
        rounding: 4,
        toExpNeg: -7,
        toExpPos: 21,
        LN10: "2.302585092994045684017991454684364207601101488628772976033327900967572609677352480235997205089598298341967784042286",
      },
      o = !0,
      s = "[DecimalError] ",
      a = s + "Invalid argument: ",
      u = s + "Exponent out of range: ",
      l = Math.floor,
      c = Math.pow,
      f = /^(\d+(\.\d*)?|\.\d+)(e[+-]?\d+)?$/i,
      h = l(1286742750677284.5),
      d = {};
    function p(t, e) {
      var r,
        n,
        i,
        s,
        a,
        u,
        l,
        c,
        f = t.constructor,
        h = f.precision;
      if (!t.s || !e.s) return (e.s || (e = new f(t)), o ? A(e, h) : e);
      if (
        ((l = t.d),
        (c = e.d),
        (a = t.e),
        (i = e.e),
        (l = l.slice()),
        (s = a - i))
      ) {
        for (
          s < 0
            ? ((n = l), (s = -s), (u = c.length))
            : ((n = c), (i = a), (u = l.length)),
            s > (u = (a = Math.ceil(h / 7)) > u ? a + 1 : u + 1) &&
              ((s = u), (n.length = 1)),
            n.reverse();
          s--;

        )
          n.push(0);
        n.reverse();
      }
      for (
        (u = l.length) - (s = c.length) < 0 &&
          ((s = u), (n = c), (c = l), (l = n)),
          r = 0;
        s;

      )
        ((r = ((l[--s] = l[s] + c[s] + r) / 1e7) | 0), (l[s] %= 1e7));
      for (r && (l.unshift(r), ++i), u = l.length; 0 == l[--u]; ) l.pop();
      return ((e.d = l), (e.e = i), o ? A(e, h) : e);
    }
    function v(t, e, r) {
      if (t !== ~~t || t < e || t > r) throw Error(a + t);
    }
    function y(t) {
      var e,
        r,
        n,
        i = t.length - 1,
        o = "",
        s = t[0];
      if (i > 0) {
        for (o += s, e = 1; e < i; e++)
          ((r = 7 - (n = t[e] + "").length) && (o += E(r)), (o += n));
        (r = 7 - (n = (s = t[e]) + "").length) && (o += E(r));
      } else if (0 === s) return "0";
      for (; s % 10 == 0; ) s /= 10;
      return o + s;
    }
    ((d.absoluteValue = d.abs =
      function () {
        var t = new this.constructor(this);
        return (t.s && (t.s = 1), t);
      }),
      (d.comparedTo = d.cmp =
        function (t) {
          var e, r, n, i;
          if (((t = new this.constructor(t)), this.s !== t.s))
            return this.s || -t.s;
          if (this.e !== t.e) return (this.e > t.e) ^ (this.s < 0) ? 1 : -1;
          for (
            n = this.d.length, e = 0, r = n < (i = t.d.length) ? n : i;
            e < r;
            ++e
          )
            if (this.d[e] !== t.d[e])
              return (this.d[e] > t.d[e]) ^ (this.s < 0) ? 1 : -1;
          return n === i ? 0 : (n > i) ^ (this.s < 0) ? 1 : -1;
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
          return m(this, new this.constructor(t));
        }),
      (d.dividedToIntegerBy = d.idiv =
        function (t) {
          var e = this.constructor;
          return A(m(this, new e(t), 0, 1), e.precision);
        }),
      (d.equals = d.eq =
        function (t) {
          return !this.cmp(t);
        }),
      (d.exponent = function () {
        return b(this);
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
            i = r.precision,
            a = i + 5;
          if (void 0 === t) t = new r(10);
          else if ((t = new r(t)).s < 1 || t.eq(n)) throw Error(s + "NaN");
          if (this.s < 1) throw Error(s + (this.s ? "NaN" : "-Infinity"));
          return this.eq(n)
            ? new r(0)
            : ((o = !1), (e = m(x(this, a), x(t, a), a)), (o = !0), A(e, i));
        }),
      (d.minus = d.sub =
        function (t) {
          return (
            (t = new this.constructor(t)),
            this.s == t.s ? P(this, t) : p(this, ((t.s = -t.s), t))
          );
        }),
      (d.modulo = d.mod =
        function (t) {
          var e,
            r = this.constructor,
            n = r.precision;
          if (!(t = new r(t)).s) throw Error(s + "NaN");
          return this.s
            ? ((o = !1),
              (e = m(this, t, 0, 1).times(t)),
              (o = !0),
              this.minus(e))
            : A(new r(this), n);
        }),
      (d.naturalExponential = d.exp =
        function () {
          return g(this);
        }),
      (d.naturalLogarithm = d.ln =
        function () {
          return x(this);
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
            this.s == t.s ? p(this, t) : P(this, ((t.s = -t.s), t))
          );
        }),
      (d.precision = d.sd =
        function (t) {
          var e, r, n;
          if (void 0 !== t && !!t !== t && 1 !== t && 0 !== t)
            throw Error(a + t);
          if (
            ((e = b(this) + 1),
            (r = 7 * (n = this.d.length - 1) + 1),
            (n = this.d[n]))
          ) {
            for (; n % 10 == 0; n /= 10) r--;
            for (n = this.d[0]; n >= 10; n /= 10) r++;
          }
          return t && e > r ? e : r;
        }),
      (d.squareRoot = d.sqrt =
        function () {
          var t,
            e,
            r,
            n,
            i,
            a,
            u,
            c = this.constructor;
          if (this.s < 1) {
            if (!this.s) return new c(0);
            throw Error(s + "NaN");
          }
          for (
            t = b(this),
              o = !1,
              0 == (i = Math.sqrt(+this)) || 1 / 0 == i
                ? (((e = y(this.d)).length + t) % 2 == 0 && (e += "0"),
                  (i = Math.sqrt(e)),
                  (t = l((t + 1) / 2) - (t < 0 || t % 2)),
                  (n = new c(
                    (e =
                      1 / 0 == i
                        ? "5e" + t
                        : (e = i.toExponential()).slice(0, e.indexOf("e") + 1) +
                          t),
                  )))
                : (n = new c(i.toString())),
              i = u = (r = c.precision) + 3;
            ;

          )
            if (
              ((n = (a = n).plus(m(this, a, u + 2)).times(0.5)),
              y(a.d).slice(0, u) === (e = y(n.d)).slice(0, u))
            ) {
              if (((e = e.slice(u - 3, u + 1)), i == u && "4999" == e)) {
                if ((A(a, r + 1, 0), a.times(a).eq(this))) {
                  n = a;
                  break;
                }
              } else if ("9999" != e) break;
              u += 4;
            }
          return ((o = !0), A(n, r));
        }),
      (d.times = d.mul =
        function (t) {
          var e,
            r,
            n,
            i,
            s,
            a,
            u,
            l,
            c,
            f = this.constructor,
            h = this.d,
            d = (t = new f(t)).d;
          if (!this.s || !t.s) return new f(0);
          for (
            t.s *= this.s,
              r = this.e + t.e,
              (l = h.length) < (c = d.length) &&
                ((s = h), (h = d), (d = s), (a = l), (l = c), (c = a)),
              s = [],
              n = a = l + c;
            n--;

          )
            s.push(0);
          for (n = c; --n >= 0; ) {
            for (e = 0, i = l + n; i > n; )
              ((u = s[i] + d[n] * h[i - n - 1] + e),
                (s[i--] = u % 1e7 | 0),
                (e = (u / 1e7) | 0));
            s[i] = (s[i] + e) % 1e7 | 0;
          }
          for (; !s[--a]; ) s.pop();
          return (
            e ? ++r : s.shift(),
            (t.d = s),
            (t.e = r),
            o ? A(t, f.precision) : t
          );
        }),
      (d.toDecimalPlaces = d.todp =
        function (t, e) {
          var r = this,
            n = r.constructor;
          return ((r = new n(r)), void 0 === t)
            ? r
            : (v(t, 0, 1e9),
              void 0 === e ? (e = n.rounding) : v(e, 0, 8),
              A(r, t + b(r) + 1, e));
        }),
      (d.toExponential = function (t, e) {
        var r,
          n = this,
          i = n.constructor;
        return (
          void 0 === t
            ? (r = N(n, !0))
            : (v(t, 0, 1e9),
              void 0 === e ? (e = i.rounding) : v(e, 0, 8),
              (r = N((n = A(new i(n), t + 1, e)), !0, t + 1))),
          r
        );
      }),
      (d.toFixed = function (t, e) {
        var r,
          n,
          i = this.constructor;
        return void 0 === t
          ? N(this)
          : (v(t, 0, 1e9),
            void 0 === e ? (e = i.rounding) : v(e, 0, 8),
            (r = N(
              (n = A(new i(this), t + b(this) + 1, e)).abs(),
              !1,
              t + b(n) + 1,
            )),
            this.isneg() && !this.isZero() ? "-" + r : r);
      }),
      (d.toInteger = d.toint =
        function () {
          var t = this.constructor;
          return A(new t(this), b(this) + 1, t.rounding);
        }),
      (d.toNumber = function () {
        return +this;
      }),
      (d.toPower = d.pow =
        function (t) {
          var e,
            r,
            i,
            a,
            u,
            c,
            f = this,
            h = f.constructor,
            d = +(t = new h(t));
          if (!t.s) return new h(n);
          if (!(f = new h(f)).s) {
            if (t.s < 1) throw Error(s + "Infinity");
            return f;
          }
          if (f.eq(n)) return f;
          if (((i = h.precision), t.eq(n))) return A(f, i);
          if (((c = (e = t.e) >= (r = t.d.length - 1)), (u = f.s), c)) {
            if ((r = d < 0 ? -d : d) <= 0x1fffffffffffff) {
              for (
                a = new h(n), e = Math.ceil(i / 7 + 4), o = !1;
                r % 2 && j((a = a.times(f)).d, e), 0 !== (r = l(r / 2));

              )
                j((f = f.times(f)).d, e);
              return ((o = !0), t.s < 0 ? new h(n).div(a) : A(a, i));
            }
          } else if (u < 0) throw Error(s + "NaN");
          return (
            (u = u < 0 && 1 & t.d[Math.max(e, r)] ? -1 : 1),
            (f.s = 1),
            (o = !1),
            (a = t.times(x(f, i + 12))),
            (o = !0),
            ((a = g(a)).s = u),
            a
          );
        }),
      (d.toPrecision = function (t, e) {
        var r,
          n,
          i = this,
          o = i.constructor;
        return (
          void 0 === t
            ? ((r = b(i)), (n = N(i, r <= o.toExpNeg || r >= o.toExpPos)))
            : (v(t, 1, 1e9),
              void 0 === e ? (e = o.rounding) : v(e, 0, 8),
              (r = b((i = A(new o(i), t, e)))),
              (n = N(i, t <= r || r <= o.toExpNeg, t))),
          n
        );
      }),
      (d.toSignificantDigits = d.tosd =
        function (t, e) {
          var r = this.constructor;
          return (
            void 0 === t
              ? ((t = r.precision), (e = r.rounding))
              : (v(t, 1, 1e9), void 0 === e ? (e = r.rounding) : v(e, 0, 8)),
            A(new r(this), t, e)
          );
        }),
      (d.toString =
        d.valueOf =
        d.val =
        d.toJSON =
          function () {
            var t = b(this),
              e = this.constructor;
            return N(this, t <= e.toExpNeg || t >= e.toExpPos);
          }));
    var m = (function () {
      function t(t, e) {
        var r,
          n = 0,
          i = t.length;
        for (t = t.slice(); i--; )
          ((r = t[i] * e + n), (t[i] = r % 1e7 | 0), (n = (r / 1e7) | 0));
        return (n && t.unshift(n), t);
      }
      function e(t, e, r, n) {
        var i, o;
        if (r != n) o = r > n ? 1 : -1;
        else
          for (i = o = 0; i < r; i++)
            if (t[i] != e[i]) {
              o = t[i] > e[i] ? 1 : -1;
              break;
            }
        return o;
      }
      function r(t, e, r) {
        for (var n = 0; r--; )
          ((t[r] -= n), (n = +(t[r] < e[r])), (t[r] = 1e7 * n + t[r] - e[r]));
        for (; !t[0] && t.length > 1; ) t.shift();
      }
      return function (n, i, o, a) {
        var u,
          l,
          c,
          f,
          h,
          d,
          p,
          v,
          y,
          m,
          g,
          w,
          E,
          x,
          O,
          P,
          N,
          j,
          D = n.constructor,
          k = n.s == i.s ? 1 : -1,
          L = n.d,
          S = i.d;
        if (!n.s) return new D(n);
        if (!i.s) throw Error(s + "Division by zero");
        for (
          l = n.e - i.e,
            N = S.length,
            O = L.length,
            v = (p = new D(k)).d = [],
            c = 0;
          S[c] == (L[c] || 0);

        )
          ++c;
        if (
          (S[c] > (L[c] || 0) && --l,
          (w = null == o ? (o = D.precision) : a ? o + (b(n) - b(i)) + 1 : o) <
            0)
        )
          return new D(0);
        if (((w = (w / 7 + 2) | 0), (c = 0), 1 == N))
          for (f = 0, S = S[0], w++; (c < O || f) && w--; c++)
            ((E = 1e7 * f + (L[c] || 0)),
              (v[c] = (E / S) | 0),
              (f = E % S | 0));
        else {
          for (
            (f = (1e7 / (S[0] + 1)) | 0) > 1 &&
              ((S = t(S, f)), (L = t(L, f)), (N = S.length), (O = L.length)),
              x = N,
              m = (y = L.slice(0, N)).length;
            m < N;

          )
            y[m++] = 0;
          ((j = S.slice()).unshift(0), (P = S[0]), S[1] >= 5e6 && ++P);
          do
            ((f = 0),
              (u = e(S, y, N, m)) < 0
                ? ((g = y[0]),
                  N != m && (g = 1e7 * g + (y[1] || 0)),
                  (f = (g / P) | 0) > 1
                    ? (f >= 1e7 && (f = 1e7 - 1),
                      (d = (h = t(S, f)).length),
                      (m = y.length),
                      1 == (u = e(h, y, d, m)) && (f--, r(h, N < d ? j : S, d)))
                    : (0 == f && (u = f = 1), (h = S.slice())),
                  (d = h.length) < m && h.unshift(0),
                  r(y, h, m),
                  -1 == u &&
                    ((m = y.length),
                    (u = e(S, y, N, m)) < 1 && (f++, r(y, N < m ? j : S, m))),
                  (m = y.length))
                : 0 === u && (f++, (y = [0])),
              (v[c++] = f),
              u && y[0] ? (y[m++] = L[x] || 0) : ((y = [L[x]]), (m = 1)));
          while ((x++ < O || void 0 !== y[0]) && w--);
        }
        return (v[0] || v.shift(), (p.e = l), A(p, a ? o + b(p) + 1 : o));
      };
    })();
    function g(t, e) {
      var r,
        i,
        s,
        a,
        l,
        f = 0,
        h = 0,
        d = t.constructor,
        p = d.precision;
      if (b(t) > 16) throw Error(u + b(t));
      if (!t.s) return new d(n);
      for (
        null == e ? ((o = !1), (l = p)) : (l = e), a = new d(0.03125);
        t.abs().gte(0.1);

      )
        ((t = t.times(a)), (h += 5));
      for (
        l += ((Math.log(c(2, h)) / Math.LN10) * 2 + 5) | 0,
          r = i = s = new d(n),
          d.precision = l;
        ;

      ) {
        if (
          ((i = A(i.times(t), l)),
          (r = r.times(++f)),
          y((a = s.plus(m(i, r, l))).d).slice(0, l) === y(s.d).slice(0, l))
        ) {
          for (; h--; ) s = A(s.times(s), l);
          return ((d.precision = p), null == e ? ((o = !0), A(s, p)) : s);
        }
        s = a;
      }
    }
    function b(t) {
      for (var e = 7 * t.e, r = t.d[0]; r >= 10; r /= 10) e++;
      return e;
    }
    function w(t, e, r) {
      if (e > t.LN10.sd())
        throw (
          (o = !0),
          r && (t.precision = r),
          Error(s + "LN10 precision limit exceeded")
        );
      return A(new t(t.LN10), e);
    }
    function E(t) {
      for (var e = ""; t--; ) e += "0";
      return e;
    }
    function x(t, e) {
      var r,
        i,
        a,
        u,
        l,
        c,
        f,
        h,
        d,
        p = 1,
        v = t,
        g = v.d,
        E = v.constructor,
        O = E.precision;
      if (v.s < 1) throw Error(s + (v.s ? "NaN" : "-Infinity"));
      if (v.eq(n)) return new E(0);
      if ((null == e ? ((o = !1), (h = O)) : (h = e), v.eq(10)))
        return (null == e && (o = !0), w(E, h));
      if (
        ((E.precision = h += 10),
        (i = (r = y(g)).charAt(0)),
        !(15e14 > Math.abs((u = b(v)))))
      )
        return (
          (f = w(E, h + 2, O).times(u + "")),
          (v = x(new E(i + "." + r.slice(1)), h - 10).plus(f)),
          (E.precision = O),
          null == e ? ((o = !0), A(v, O)) : v
        );
      for (; (i < 7 && 1 != i) || (1 == i && r.charAt(1) > 3); )
        ((i = (r = y((v = v.times(t)).d)).charAt(0)), p++);
      for (
        u = b(v),
          i > 1
            ? ((v = new E("0." + r)), u++)
            : (v = new E(i + "." + r.slice(1))),
          c = l = v = m(v.minus(n), v.plus(n), h),
          d = A(v.times(v), h),
          a = 3;
        ;

      ) {
        if (
          ((l = A(l.times(d), h)),
          y((f = c.plus(m(l, new E(a), h))).d).slice(0, h) ===
            y(c.d).slice(0, h))
        )
          return (
            (c = c.times(2)),
            0 !== u && (c = c.plus(w(E, h + 2, O).times(u + ""))),
            (c = m(c, new E(p), h)),
            (E.precision = O),
            null == e ? ((o = !0), A(c, O)) : c
          );
        ((c = f), (a += 2));
      }
    }
    function O(t, e) {
      var r, n, i;
      for (
        (r = e.indexOf(".")) > -1 && (e = e.replace(".", "")),
          (n = e.search(/e/i)) > 0
            ? (r < 0 && (r = n),
              (r += +e.slice(n + 1)),
              (e = e.substring(0, n)))
            : r < 0 && (r = e.length),
          n = 0;
        48 === e.charCodeAt(n);

      )
        ++n;
      for (i = e.length; 48 === e.charCodeAt(i - 1); ) --i;
      if ((e = e.slice(n, i))) {
        if (
          ((i -= n),
          (t.e = l((r = r - n - 1) / 7)),
          (t.d = []),
          (n = (r + 1) % 7),
          r < 0 && (n += 7),
          n < i)
        ) {
          for (n && t.d.push(+e.slice(0, n)), i -= 7; n < i; )
            t.d.push(+e.slice(n, (n += 7)));
          n = 7 - (e = e.slice(n)).length;
        } else n -= i;
        for (; n--; ) e += "0";
        if ((t.d.push(+e), o && (t.e > h || t.e < -h))) throw Error(u + r);
      } else ((t.s = 0), (t.e = 0), (t.d = [0]));
      return t;
    }
    function A(t, e, r) {
      var n,
        i,
        s,
        a,
        f,
        d,
        p,
        v,
        y = t.d;
      for (a = 1, s = y[0]; s >= 10; s /= 10) a++;
      if ((n = e - a) < 0) ((n += 7), (i = e), (p = y[(v = 0)]));
      else {
        if ((v = Math.ceil((n + 1) / 7)) >= (s = y.length)) return t;
        for (p = s = y[v], a = 1; s >= 10; s /= 10) a++;
        ((n %= 7), (i = n - 7 + a));
      }
      if (
        (void 0 !== r &&
          ((f = (p / (s = c(10, a - i - 1))) % 10 | 0),
          (d = e < 0 || void 0 !== y[v + 1] || p % s),
          (d =
            r < 4
              ? (f || d) && (0 == r || r == (t.s < 0 ? 3 : 2))
              : f > 5 ||
                (5 == f &&
                  (4 == r ||
                    d ||
                    (6 == r &&
                      (n > 0 ? (i > 0 ? p / c(10, a - i) : 0) : y[v - 1]) % 10 &
                        1) ||
                    r == (t.s < 0 ? 8 : 7))))),
        e < 1 || !y[0])
      )
        return (
          d
            ? ((s = b(t)),
              (y.length = 1),
              (e = e - s - 1),
              (y[0] = c(10, (7 - (e % 7)) % 7)),
              (t.e = l(-e / 7) || 0))
            : ((y.length = 1), (y[0] = t.e = t.s = 0)),
          t
        );
      if (
        (0 == n
          ? ((y.length = v), (s = 1), v--)
          : ((y.length = v + 1),
            (s = c(10, 7 - n)),
            (y[v] = i > 0 ? ((p / c(10, a - i)) % c(10, i) | 0) * s : 0)),
        d)
      )
        for (;;)
          if (0 == v) {
            1e7 == (y[0] += s) && ((y[0] = 1), ++t.e);
            break;
          } else {
            if (((y[v] += s), 1e7 != y[v])) break;
            ((y[v--] = 0), (s = 1));
          }
      for (n = y.length; 0 === y[--n]; ) y.pop();
      if (o && (t.e > h || t.e < -h)) throw Error(u + b(t));
      return t;
    }
    function P(t, e) {
      var r,
        n,
        i,
        s,
        a,
        u,
        l,
        c,
        f,
        h,
        d = t.constructor,
        p = d.precision;
      if (!t.s || !e.s)
        return (e.s ? (e.s = -e.s) : (e = new d(t)), o ? A(e, p) : e);
      if (
        ((l = t.d),
        (h = e.d),
        (n = e.e),
        (c = t.e),
        (l = l.slice()),
        (a = c - n))
      ) {
        for (
          (f = a < 0)
            ? ((r = l), (a = -a), (u = h.length))
            : ((r = h), (n = c), (u = l.length)),
            a > (i = Math.max(Math.ceil(p / 7), u) + 2) &&
              ((a = i), (r.length = 1)),
            r.reverse(),
            i = a;
          i--;

        )
          r.push(0);
        r.reverse();
      } else {
        for (
          (f = (i = l.length) < (u = h.length)) && (u = i), i = 0;
          i < u;
          i++
        )
          if (l[i] != h[i]) {
            f = l[i] < h[i];
            break;
          }
        a = 0;
      }
      for (
        f && ((r = l), (l = h), (h = r), (e.s = -e.s)),
          u = l.length,
          i = h.length - u;
        i > 0;
        --i
      )
        l[u++] = 0;
      for (i = h.length; i > a; ) {
        if (l[--i] < h[i]) {
          for (s = i; s && 0 === l[--s]; ) l[s] = 1e7 - 1;
          (--l[s], (l[i] += 1e7));
        }
        l[i] -= h[i];
      }
      for (; 0 === l[--u]; ) l.pop();
      for (; 0 === l[0]; l.shift()) --n;
      return l[0] ? ((e.d = l), (e.e = n), o ? A(e, p) : e) : new d(0);
    }
    function N(t, e, r) {
      var n,
        i = b(t),
        o = y(t.d),
        s = o.length;
      return (
        e
          ? (r && (n = r - s) > 0
              ? (o = o.charAt(0) + "." + o.slice(1) + E(n))
              : s > 1 && (o = o.charAt(0) + "." + o.slice(1)),
            (o = o + (i < 0 ? "e" : "e+") + i))
          : i < 0
            ? ((o = "0." + E(-i - 1) + o), r && (n = r - s) > 0 && (o += E(n)))
            : i >= s
              ? ((o += E(i + 1 - s)),
                r && (n = r - i - 1) > 0 && (o = o + "." + E(n)))
              : ((n = i + 1) < s && (o = o.slice(0, n) + "." + o.slice(n)),
                r &&
                  (n = r - s) > 0 &&
                  (i + 1 === s && (o += "."), (o += E(n)))),
        t.s < 0 ? "-" + o : o
      );
    }
    function j(t, e) {
      if (t.length > e) return ((t.length = e), !0);
    }
    function D(t) {
      if (!t || "object" != typeof t) throw Error(s + "Object expected");
      var e,
        r,
        n,
        i = [
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
      for (e = 0; e < i.length; e += 3)
        if (void 0 !== (n = t[(r = i[e])]))
          if (l(n) === n && n >= i[e + 1] && n <= i[e + 2]) this[r] = n;
          else throw Error(a + r + ": " + n);
      if (void 0 !== (n = t[(r = "LN10")]))
        if (n == Math.LN10) this[r] = new this(n);
        else throw Error(a + r + ": " + n);
      return this;
    }
    if (
      (((i = (function t(e) {
        var r, n, i;
        function o(t) {
          if (!(this instanceof o)) return new o(t);
          if (((this.constructor = o), t instanceof o)) {
            ((this.s = t.s),
              (this.e = t.e),
              (this.d = (t = t.d) ? t.slice() : t));
            return;
          }
          if ("number" == typeof t) {
            if (0 * t != 0) throw Error(a + t);
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
            return O(this, t.toString());
          }
          if ("string" != typeof t) throw Error(a + t);
          if (
            (45 === t.charCodeAt(0)
              ? ((t = t.slice(1)), (this.s = -1))
              : (this.s = 1),
            f.test(t))
          )
            O(this, t);
          else throw Error(a + t);
        }
        if (
          ((o.prototype = d),
          (o.ROUND_UP = 0),
          (o.ROUND_DOWN = 1),
          (o.ROUND_CEIL = 2),
          (o.ROUND_FLOOR = 3),
          (o.ROUND_HALF_UP = 4),
          (o.ROUND_HALF_DOWN = 5),
          (o.ROUND_HALF_EVEN = 6),
          (o.ROUND_HALF_CEIL = 7),
          (o.ROUND_HALF_FLOOR = 8),
          (o.clone = t),
          (o.config = o.set = D),
          void 0 === e && (e = {}),
          e)
        )
          for (
            r = 0,
              i = ["precision", "rounding", "toExpNeg", "toExpPos", "LN10"];
            r < i.length;

          )
            e.hasOwnProperty((n = i[r++])) || (e[n] = this[n]);
        return (o.config(e), o);
      })(i)).default = i.Decimal =
        i),
      (n = new i(1)),
      "function" == typeof define && define.amd)
    ) {
      let e;
      (t.r, void 0 !== (e = i) && t.v(e));
    } else
      e.exports
        ? (e.exports = i)
        : (r ||
            (r =
              "u" > typeof self && self && self.self == self
                ? self
                : Function("return this")()),
          (r.Decimal = i));
  })(t.e);
};
