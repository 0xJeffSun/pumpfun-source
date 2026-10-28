// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(t, e, n) => {
  !(function (n) {
    "use strict";
    var r,
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
      c = Math.floor,
      l = Math.pow,
      f = /^(\d+(\.\d*)?|\.\d+)(e[+-]?\d+)?$/i,
      h = c(1286742750677284.5),
      p = {};
    function d(t, e) {
      var n,
        r,
        i,
        s,
        a,
        u,
        c,
        l,
        f = t.constructor,
        h = f.precision;
      if (!t.s || !e.s) return (e.s || (e = new f(t)), o ? A(e, h) : e);
      if (
        ((c = t.d),
        (l = e.d),
        (a = t.e),
        (i = e.e),
        (c = c.slice()),
        (s = a - i))
      ) {
        for (
          s < 0
            ? ((r = c), (s = -s), (u = l.length))
            : ((r = l), (i = a), (u = c.length)),
            s > (u = (a = Math.ceil(h / 7)) > u ? a + 1 : u + 1) &&
              ((s = u), (r.length = 1)),
            r.reverse();
          s--;

        )
          r.push(0);
        r.reverse();
      }
      for (
        (u = c.length) - (s = l.length) < 0 &&
          ((s = u), (r = l), (l = c), (c = r)),
          n = 0;
        s;

      )
        ((n = ((c[--s] = c[s] + l[s] + n) / 1e7) | 0), (c[s] %= 1e7));
      for (n && (c.unshift(n), ++i), u = c.length; 0 == c[--u]; ) c.pop();
      return ((e.d = c), (e.e = i), o ? A(e, h) : e);
    }
    function v(t, e, n) {
      if (t !== ~~t || t < e || t > n) throw Error(a + t);
    }
    function y(t) {
      var e,
        n,
        r,
        i = t.length - 1,
        o = "",
        s = t[0];
      if (i > 0) {
        for (o += s, e = 1; e < i; e++)
          ((n = 7 - (r = t[e] + "").length) && (o += x(n)), (o += r));
        (n = 7 - (r = (s = t[e]) + "").length) && (o += x(n));
      } else if (0 === s) return "0";
      for (; s % 10 == 0; ) s /= 10;
      return o + s;
    }
    ((p.absoluteValue = p.abs =
      function () {
        var t = new this.constructor(this);
        return (t.s && (t.s = 1), t);
      }),
      (p.comparedTo = p.cmp =
        function (t) {
          var e, n, r, i;
          if (((t = new this.constructor(t)), this.s !== t.s))
            return this.s || -t.s;
          if (this.e !== t.e) return (this.e > t.e) ^ (this.s < 0) ? 1 : -1;
          for (
            r = this.d.length, e = 0, n = r < (i = t.d.length) ? r : i;
            e < n;
            ++e
          )
            if (this.d[e] !== t.d[e])
              return (this.d[e] > t.d[e]) ^ (this.s < 0) ? 1 : -1;
          return r === i ? 0 : (r > i) ^ (this.s < 0) ? 1 : -1;
        }),
      (p.decimalPlaces = p.dp =
        function () {
          var t = this.d.length - 1,
            e = (t - this.e) * 7;
          if ((t = this.d[t])) for (; t % 10 == 0; t /= 10) e--;
          return e < 0 ? 0 : e;
        }),
      (p.dividedBy = p.div =
        function (t) {
          return m(this, new this.constructor(t));
        }),
      (p.dividedToIntegerBy = p.idiv =
        function (t) {
          var e = this.constructor;
          return A(m(this, new e(t), 0, 1), e.precision);
        }),
      (p.equals = p.eq =
        function (t) {
          return !this.cmp(t);
        }),
      (p.exponent = function () {
        return b(this);
      }),
      (p.greaterThan = p.gt =
        function (t) {
          return this.cmp(t) > 0;
        }),
      (p.greaterThanOrEqualTo = p.gte =
        function (t) {
          return this.cmp(t) >= 0;
        }),
      (p.isInteger = p.isint =
        function () {
          return this.e > this.d.length - 2;
        }),
      (p.isNegative = p.isneg =
        function () {
          return this.s < 0;
        }),
      (p.isPositive = p.ispos =
        function () {
          return this.s > 0;
        }),
      (p.isZero = function () {
        return 0 === this.s;
      }),
      (p.lessThan = p.lt =
        function (t) {
          return 0 > this.cmp(t);
        }),
      (p.lessThanOrEqualTo = p.lte =
        function (t) {
          return 1 > this.cmp(t);
        }),
      (p.logarithm = p.log =
        function (t) {
          var e,
            n = this.constructor,
            i = n.precision,
            a = i + 5;
          if (void 0 === t) t = new n(10);
          else if ((t = new n(t)).s < 1 || t.eq(r)) throw Error(s + "NaN");
          if (this.s < 1) throw Error(s + (this.s ? "NaN" : "-Infinity"));
          return this.eq(r)
            ? new n(0)
            : ((o = !1), (e = m(O(this, a), O(t, a), a)), (o = !0), A(e, i));
        }),
      (p.minus = p.sub =
        function (t) {
          return (
            (t = new this.constructor(t)),
            this.s == t.s ? P(this, t) : d(this, ((t.s = -t.s), t))
          );
        }),
      (p.modulo = p.mod =
        function (t) {
          var e,
            n = this.constructor,
            r = n.precision;
          if (!(t = new n(t)).s) throw Error(s + "NaN");
          return this.s
            ? ((o = !1),
              (e = m(this, t, 0, 1).times(t)),
              (o = !0),
              this.minus(e))
            : A(new n(this), r);
        }),
      (p.naturalExponential = p.exp =
        function () {
          return g(this);
        }),
      (p.naturalLogarithm = p.ln =
        function () {
          return O(this);
        }),
      (p.negated = p.neg =
        function () {
          var t = new this.constructor(this);
          return ((t.s = -t.s || 0), t);
        }),
      (p.plus = p.add =
        function (t) {
          return (
            (t = new this.constructor(t)),
            this.s == t.s ? d(this, t) : P(this, ((t.s = -t.s), t))
          );
        }),
      (p.precision = p.sd =
        function (t) {
          var e, n, r;
          if (void 0 !== t && !!t !== t && 1 !== t && 0 !== t)
            throw Error(a + t);
          if (
            ((e = b(this) + 1),
            (n = 7 * (r = this.d.length - 1) + 1),
            (r = this.d[r]))
          ) {
            for (; r % 10 == 0; r /= 10) n--;
            for (r = this.d[0]; r >= 10; r /= 10) n++;
          }
          return t && e > n ? e : n;
        }),
      (p.squareRoot = p.sqrt =
        function () {
          var t,
            e,
            n,
            r,
            i,
            a,
            u,
            l = this.constructor;
          if (this.s < 1) {
            if (!this.s) return new l(0);
            throw Error(s + "NaN");
          }
          for (
            t = b(this),
              o = !1,
              0 == (i = Math.sqrt(+this)) || 1 / 0 == i
                ? (((e = y(this.d)).length + t) % 2 == 0 && (e += "0"),
                  (i = Math.sqrt(e)),
                  (t = c((t + 1) / 2) - (t < 0 || t % 2)),
                  (r = new l(
                    (e =
                      1 / 0 == i
                        ? "5e" + t
                        : (e = i.toExponential()).slice(0, e.indexOf("e") + 1) +
                          t),
                  )))
                : (r = new l(i.toString())),
              i = u = (n = l.precision) + 3;
            ;

          )
            if (
              ((r = (a = r).plus(m(this, a, u + 2)).times(0.5)),
              y(a.d).slice(0, u) === (e = y(r.d)).slice(0, u))
            ) {
              if (((e = e.slice(u - 3, u + 1)), i == u && "4999" == e)) {
                if ((A(a, n + 1, 0), a.times(a).eq(this))) {
                  r = a;
                  break;
                }
              } else if ("9999" != e) break;
              u += 4;
            }
          return ((o = !0), A(r, n));
        }),
      (p.times = p.mul =
        function (t) {
          var e,
            n,
            r,
            i,
            s,
            a,
            u,
            c,
            l,
            f = this.constructor,
            h = this.d,
            p = (t = new f(t)).d;
          if (!this.s || !t.s) return new f(0);
          for (
            t.s *= this.s,
              n = this.e + t.e,
              (c = h.length) < (l = p.length) &&
                ((s = h), (h = p), (p = s), (a = c), (c = l), (l = a)),
              s = [],
              r = a = c + l;
            r--;

          )
            s.push(0);
          for (r = l; --r >= 0; ) {
            for (e = 0, i = c + r; i > r; )
              ((u = s[i] + p[r] * h[i - r - 1] + e),
                (s[i--] = u % 1e7 | 0),
                (e = (u / 1e7) | 0));
            s[i] = (s[i] + e) % 1e7 | 0;
          }
          for (; !s[--a]; ) s.pop();
          return (
            e ? ++n : s.shift(),
            (t.d = s),
            (t.e = n),
            o ? A(t, f.precision) : t
          );
        }),
      (p.toDecimalPlaces = p.todp =
        function (t, e) {
          var n = this,
            r = n.constructor;
          return ((n = new r(n)), void 0 === t)
            ? n
            : (v(t, 0, 1e9),
              void 0 === e ? (e = r.rounding) : v(e, 0, 8),
              A(n, t + b(n) + 1, e));
        }),
      (p.toExponential = function (t, e) {
        var n,
          r = this,
          i = r.constructor;
        return (
          void 0 === t
            ? (n = N(r, !0))
            : (v(t, 0, 1e9),
              void 0 === e ? (e = i.rounding) : v(e, 0, 8),
              (n = N((r = A(new i(r), t + 1, e)), !0, t + 1))),
          n
        );
      }),
      (p.toFixed = function (t, e) {
        var n,
          r,
          i = this.constructor;
        return void 0 === t
          ? N(this)
          : (v(t, 0, 1e9),
            void 0 === e ? (e = i.rounding) : v(e, 0, 8),
            (n = N(
              (r = A(new i(this), t + b(this) + 1, e)).abs(),
              !1,
              t + b(r) + 1,
            )),
            this.isneg() && !this.isZero() ? "-" + n : n);
      }),
      (p.toInteger = p.toint =
        function () {
          var t = this.constructor;
          return A(new t(this), b(this) + 1, t.rounding);
        }),
      (p.toNumber = function () {
        return +this;
      }),
      (p.toPower = p.pow =
        function (t) {
          var e,
            n,
            i,
            a,
            u,
            l,
            f = this,
            h = f.constructor,
            p = +(t = new h(t));
          if (!t.s) return new h(r);
          if (!(f = new h(f)).s) {
            if (t.s < 1) throw Error(s + "Infinity");
            return f;
          }
          if (f.eq(r)) return f;
          if (((i = h.precision), t.eq(r))) return A(f, i);
          if (((l = (e = t.e) >= (n = t.d.length - 1)), (u = f.s), l)) {
            if ((n = p < 0 ? -p : p) <= 0x1fffffffffffff) {
              for (
                a = new h(r), e = Math.ceil(i / 7 + 4), o = !1;
                n % 2 && _((a = a.times(f)).d, e), 0 !== (n = c(n / 2));

              )
                _((f = f.times(f)).d, e);
              return ((o = !0), t.s < 0 ? new h(r).div(a) : A(a, i));
            }
          } else if (u < 0) throw Error(s + "NaN");
          return (
            (u = u < 0 && 1 & t.d[Math.max(e, n)] ? -1 : 1),
            (f.s = 1),
            (o = !1),
            (a = t.times(O(f, i + 12))),
            (o = !0),
            ((a = g(a)).s = u),
            a
          );
        }),
      (p.toPrecision = function (t, e) {
        var n,
          r,
          i = this,
          o = i.constructor;
        return (
          void 0 === t
            ? ((n = b(i)), (r = N(i, n <= o.toExpNeg || n >= o.toExpPos)))
            : (v(t, 1, 1e9),
              void 0 === e ? (e = o.rounding) : v(e, 0, 8),
              (n = b((i = A(new o(i), t, e)))),
              (r = N(i, t <= n || n <= o.toExpNeg, t))),
          r
        );
      }),
      (p.toSignificantDigits = p.tosd =
        function (t, e) {
          var n = this.constructor;
          return (
            void 0 === t
              ? ((t = n.precision), (e = n.rounding))
              : (v(t, 1, 1e9), void 0 === e ? (e = n.rounding) : v(e, 0, 8)),
            A(new n(this), t, e)
          );
        }),
      (p.toString =
        p.valueOf =
        p.val =
        p.toJSON =
          function () {
            var t = b(this),
              e = this.constructor;
            return N(this, t <= e.toExpNeg || t >= e.toExpPos);
          }));
    var m = (function () {
      function t(t, e) {
        var n,
          r = 0,
          i = t.length;
        for (t = t.slice(); i--; )
          ((n = t[i] * e + r), (t[i] = n % 1e7 | 0), (r = (n / 1e7) | 0));
        return (r && t.unshift(r), t);
      }
      function e(t, e, n, r) {
        var i, o;
        if (n != r) o = n > r ? 1 : -1;
        else
          for (i = o = 0; i < n; i++)
            if (t[i] != e[i]) {
              o = t[i] > e[i] ? 1 : -1;
              break;
            }
        return o;
      }
      function n(t, e, n) {
        for (var r = 0; n--; )
          ((t[n] -= r), (r = +(t[n] < e[n])), (t[n] = 1e7 * r + t[n] - e[n]));
        for (; !t[0] && t.length > 1; ) t.shift();
      }
      return function (r, i, o, a) {
        var u,
          c,
          l,
          f,
          h,
          p,
          d,
          v,
          y,
          m,
          g,
          w,
          x,
          O,
          E,
          P,
          N,
          _,
          j = r.constructor,
          L = r.s == i.s ? 1 : -1,
          k = r.d,
          D = i.d;
        if (!r.s) return new j(r);
        if (!i.s) throw Error(s + "Division by zero");
        for (
          c = r.e - i.e,
            N = D.length,
            E = k.length,
            v = (d = new j(L)).d = [],
            l = 0;
          D[l] == (k[l] || 0);

        )
          ++l;
        if (
          (D[l] > (k[l] || 0) && --c,
          (w = null == o ? (o = j.precision) : a ? o + (b(r) - b(i)) + 1 : o) <
            0)
        )
          return new j(0);
        if (((w = (w / 7 + 2) | 0), (l = 0), 1 == N))
          for (f = 0, D = D[0], w++; (l < E || f) && w--; l++)
            ((x = 1e7 * f + (k[l] || 0)),
              (v[l] = (x / D) | 0),
              (f = x % D | 0));
        else {
          for (
            (f = (1e7 / (D[0] + 1)) | 0) > 1 &&
              ((D = t(D, f)), (k = t(k, f)), (N = D.length), (E = k.length)),
              O = N,
              m = (y = k.slice(0, N)).length;
            m < N;

          )
            y[m++] = 0;
          ((_ = D.slice()).unshift(0), (P = D[0]), D[1] >= 5e6 && ++P);
          do
            ((f = 0),
              (u = e(D, y, N, m)) < 0
                ? ((g = y[0]),
                  N != m && (g = 1e7 * g + (y[1] || 0)),
                  (f = (g / P) | 0) > 1
                    ? (f >= 1e7 && (f = 1e7 - 1),
                      (p = (h = t(D, f)).length),
                      (m = y.length),
                      1 == (u = e(h, y, p, m)) && (f--, n(h, N < p ? _ : D, p)))
                    : (0 == f && (u = f = 1), (h = D.slice())),
                  (p = h.length) < m && h.unshift(0),
                  n(y, h, m),
                  -1 == u &&
                    ((m = y.length),
                    (u = e(D, y, N, m)) < 1 && (f++, n(y, N < m ? _ : D, m))),
                  (m = y.length))
                : 0 === u && (f++, (y = [0])),
              (v[l++] = f),
              u && y[0] ? (y[m++] = k[O] || 0) : ((y = [k[O]]), (m = 1)));
          while ((O++ < E || void 0 !== y[0]) && w--);
        }
        return (v[0] || v.shift(), (d.e = c), A(d, a ? o + b(d) + 1 : o));
      };
    })();
    function g(t, e) {
      var n,
        i,
        s,
        a,
        c,
        f = 0,
        h = 0,
        p = t.constructor,
        d = p.precision;
      if (b(t) > 16) throw Error(u + b(t));
      if (!t.s) return new p(r);
      for (
        null == e ? ((o = !1), (c = d)) : (c = e), a = new p(0.03125);
        t.abs().gte(0.1);

      )
        ((t = t.times(a)), (h += 5));
      for (
        c += ((Math.log(l(2, h)) / Math.LN10) * 2 + 5) | 0,
          n = i = s = new p(r),
          p.precision = c;
        ;

      ) {
        if (
          ((i = A(i.times(t), c)),
          (n = n.times(++f)),
          y((a = s.plus(m(i, n, c))).d).slice(0, c) === y(s.d).slice(0, c))
        ) {
          for (; h--; ) s = A(s.times(s), c);
          return ((p.precision = d), null == e ? ((o = !0), A(s, d)) : s);
        }
        s = a;
      }
    }
    function b(t) {
      for (var e = 7 * t.e, n = t.d[0]; n >= 10; n /= 10) e++;
      return e;
    }
    function w(t, e, n) {
      if (e > t.LN10.sd())
        throw (
          (o = !0),
          n && (t.precision = n),
          Error(s + "LN10 precision limit exceeded")
        );
      return A(new t(t.LN10), e);
    }
    function x(t) {
      for (var e = ""; t--; ) e += "0";
      return e;
    }
    function O(t, e) {
      var n,
        i,
        a,
        u,
        c,
        l,
        f,
        h,
        p,
        d = 1,
        v = t,
        g = v.d,
        x = v.constructor,
        E = x.precision;
      if (v.s < 1) throw Error(s + (v.s ? "NaN" : "-Infinity"));
      if (v.eq(r)) return new x(0);
      if ((null == e ? ((o = !1), (h = E)) : (h = e), v.eq(10)))
        return (null == e && (o = !0), w(x, h));
      if (
        ((x.precision = h += 10),
        (i = (n = y(g)).charAt(0)),
        !(15e14 > Math.abs((u = b(v)))))
      )
        return (
          (f = w(x, h + 2, E).times(u + "")),
          (v = O(new x(i + "." + n.slice(1)), h - 10).plus(f)),
          (x.precision = E),
          null == e ? ((o = !0), A(v, E)) : v
        );
      for (; (i < 7 && 1 != i) || (1 == i && n.charAt(1) > 3); )
        ((i = (n = y((v = v.times(t)).d)).charAt(0)), d++);
      for (
        u = b(v),
          i > 1
            ? ((v = new x("0." + n)), u++)
            : (v = new x(i + "." + n.slice(1))),
          l = c = v = m(v.minus(r), v.plus(r), h),
          p = A(v.times(v), h),
          a = 3;
        ;

      ) {
        if (
          ((c = A(c.times(p), h)),
          y((f = l.plus(m(c, new x(a), h))).d).slice(0, h) ===
            y(l.d).slice(0, h))
        )
          return (
            (l = l.times(2)),
            0 !== u && (l = l.plus(w(x, h + 2, E).times(u + ""))),
            (l = m(l, new x(d), h)),
            (x.precision = E),
            null == e ? ((o = !0), A(l, E)) : l
          );
        ((l = f), (a += 2));
      }
    }
    function E(t, e) {
      var n, r, i;
      for (
        (n = e.indexOf(".")) > -1 && (e = e.replace(".", "")),
          (r = e.search(/e/i)) > 0
            ? (n < 0 && (n = r),
              (n += +e.slice(r + 1)),
              (e = e.substring(0, r)))
            : n < 0 && (n = e.length),
          r = 0;
        48 === e.charCodeAt(r);

      )
        ++r;
      for (i = e.length; 48 === e.charCodeAt(i - 1); ) --i;
      if ((e = e.slice(r, i))) {
        if (
          ((i -= r),
          (t.e = c((n = n - r - 1) / 7)),
          (t.d = []),
          (r = (n + 1) % 7),
          n < 0 && (r += 7),
          r < i)
        ) {
          for (r && t.d.push(+e.slice(0, r)), i -= 7; r < i; )
            t.d.push(+e.slice(r, (r += 7)));
          r = 7 - (e = e.slice(r)).length;
        } else r -= i;
        for (; r--; ) e += "0";
        if ((t.d.push(+e), o && (t.e > h || t.e < -h))) throw Error(u + n);
      } else ((t.s = 0), (t.e = 0), (t.d = [0]));
      return t;
    }
    function A(t, e, n) {
      var r,
        i,
        s,
        a,
        f,
        p,
        d,
        v,
        y = t.d;
      for (a = 1, s = y[0]; s >= 10; s /= 10) a++;
      if ((r = e - a) < 0) ((r += 7), (i = e), (d = y[(v = 0)]));
      else {
        if ((v = Math.ceil((r + 1) / 7)) >= (s = y.length)) return t;
        for (d = s = y[v], a = 1; s >= 10; s /= 10) a++;
        ((r %= 7), (i = r - 7 + a));
      }
      if (
        (void 0 !== n &&
          ((f = (d / (s = l(10, a - i - 1))) % 10 | 0),
          (p = e < 0 || void 0 !== y[v + 1] || d % s),
          (p =
            n < 4
              ? (f || p) && (0 == n || n == (t.s < 0 ? 3 : 2))
              : f > 5 ||
                (5 == f &&
                  (4 == n ||
                    p ||
                    (6 == n &&
                      (r > 0 ? (i > 0 ? d / l(10, a - i) : 0) : y[v - 1]) % 10 &
                        1) ||
                    n == (t.s < 0 ? 8 : 7))))),
        e < 1 || !y[0])
      )
        return (
          p
            ? ((s = b(t)),
              (y.length = 1),
              (e = e - s - 1),
              (y[0] = l(10, (7 - (e % 7)) % 7)),
              (t.e = c(-e / 7) || 0))
            : ((y.length = 1), (y[0] = t.e = t.s = 0)),
          t
        );
      if (
        (0 == r
          ? ((y.length = v), (s = 1), v--)
          : ((y.length = v + 1),
            (s = l(10, 7 - r)),
            (y[v] = i > 0 ? ((d / l(10, a - i)) % l(10, i) | 0) * s : 0)),
        p)
      )
        for (;;)
          if (0 == v) {
            1e7 == (y[0] += s) && ((y[0] = 1), ++t.e);
            break;
          } else {
            if (((y[v] += s), 1e7 != y[v])) break;
            ((y[v--] = 0), (s = 1));
          }
      for (r = y.length; 0 === y[--r]; ) y.pop();
      if (o && (t.e > h || t.e < -h)) throw Error(u + b(t));
      return t;
    }
    function P(t, e) {
      var n,
        r,
        i,
        s,
        a,
        u,
        c,
        l,
        f,
        h,
        p = t.constructor,
        d = p.precision;
      if (!t.s || !e.s)
        return (e.s ? (e.s = -e.s) : (e = new p(t)), o ? A(e, d) : e);
      if (
        ((c = t.d),
        (h = e.d),
        (r = e.e),
        (l = t.e),
        (c = c.slice()),
        (a = l - r))
      ) {
        for (
          (f = a < 0)
            ? ((n = c), (a = -a), (u = h.length))
            : ((n = h), (r = l), (u = c.length)),
            a > (i = Math.max(Math.ceil(d / 7), u) + 2) &&
              ((a = i), (n.length = 1)),
            n.reverse(),
            i = a;
          i--;

        )
          n.push(0);
        n.reverse();
      } else {
        for (
          (f = (i = c.length) < (u = h.length)) && (u = i), i = 0;
          i < u;
          i++
        )
          if (c[i] != h[i]) {
            f = c[i] < h[i];
            break;
          }
        a = 0;
      }
      for (
        f && ((n = c), (c = h), (h = n), (e.s = -e.s)),
          u = c.length,
          i = h.length - u;
        i > 0;
        --i
      )
        c[u++] = 0;
      for (i = h.length; i > a; ) {
        if (c[--i] < h[i]) {
          for (s = i; s && 0 === c[--s]; ) c[s] = 1e7 - 1;
          (--c[s], (c[i] += 1e7));
        }
        c[i] -= h[i];
      }
      for (; 0 === c[--u]; ) c.pop();
      for (; 0 === c[0]; c.shift()) --r;
      return c[0] ? ((e.d = c), (e.e = r), o ? A(e, d) : e) : new p(0);
    }
    function N(t, e, n) {
      var r,
        i = b(t),
        o = y(t.d),
        s = o.length;
      return (
        e
          ? (n && (r = n - s) > 0
              ? (o = o.charAt(0) + "." + o.slice(1) + x(r))
              : s > 1 && (o = o.charAt(0) + "." + o.slice(1)),
            (o = o + (i < 0 ? "e" : "e+") + i))
          : i < 0
            ? ((o = "0." + x(-i - 1) + o), n && (r = n - s) > 0 && (o += x(r)))
            : i >= s
              ? ((o += x(i + 1 - s)),
                n && (r = n - i - 1) > 0 && (o = o + "." + x(r)))
              : ((r = i + 1) < s && (o = o.slice(0, r) + "." + o.slice(r)),
                n &&
                  (r = n - s) > 0 &&
                  (i + 1 === s && (o += "."), (o += x(r)))),
        t.s < 0 ? "-" + o : o
      );
    }
    function _(t, e) {
      if (t.length > e) return ((t.length = e), !0);
    }
    function j(t) {
      if (!t || "object" != typeof t) throw Error(s + "Object expected");
      var e,
        n,
        r,
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
        if (void 0 !== (r = t[(n = i[e])]))
          if (c(r) === r && r >= i[e + 1] && r <= i[e + 2]) this[n] = r;
          else throw Error(a + n + ": " + r);
      if (void 0 !== (r = t[(n = "LN10")]))
        if (r == Math.LN10) this[n] = new this(r);
        else throw Error(a + n + ": " + r);
      return this;
    }
    if (
      (((i = (function t(e) {
        var n, r, i;
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
            return E(this, t.toString());
          }
          if ("string" != typeof t) throw Error(a + t);
          if (
            (45 === t.charCodeAt(0)
              ? ((t = t.slice(1)), (this.s = -1))
              : (this.s = 1),
            f.test(t))
          )
            E(this, t);
          else throw Error(a + t);
        }
        if (
          ((o.prototype = p),
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
          (o.config = o.set = j),
          void 0 === e && (e = {}),
          e)
        )
          for (
            n = 0,
              i = ["precision", "rounding", "toExpNeg", "toExpPos", "LN10"];
            n < i.length;

          )
            e.hasOwnProperty((r = i[n++])) || (e[r] = this[r]);
        return (o.config(e), o);
      })(i)).default = i.Decimal =
        i),
      (r = new i(1)),
      "function" == typeof define && define.amd)
    ) {
      let e;
      (t.r, void 0 !== (e = i) && t.v(e));
    } else
      e.exports
        ? (e.exports = i)
        : (n ||
            (n =
              "u" > typeof self && self && self.self == self
                ? self
                : Function("return this")()),
          (n.Decimal = i));
  })(t.e);
};
