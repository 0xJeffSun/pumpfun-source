// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = "[big.js] ",
    r = t + "Invalid ",
    s = r + "decimal places",
    n = r + "rounding mode",
    o = t + "Division by zero",
    i = {},
    a = void 0,
    c = /^-?(\d+(\.\d*)?|\.\d+)(e[+-]?\d+)?$/i;
  function l(e, t, r, s) {
    var o = e.c;
    if (
      (r === a && (r = e.constructor.RM),
      0 !== r && 1 !== r && 2 !== r && 3 !== r)
    )
      throw Error(n);
    if (t < 1)
      ((s =
        (3 === r && (s || !!o[0])) ||
        (0 === t &&
          ((1 === r && o[0] >= 5) ||
            (2 === r && (o[0] > 5 || (5 === o[0] && (s || o[1] !== a))))))),
        (o.length = 1),
        s ? ((e.e = e.e - t + 1), (o[0] = 1)) : (o[0] = e.e = 0));
    else if (t < o.length) {
      if (
        ((s =
          (1 === r && o[t] >= 5) ||
          (2 === r &&
            (o[t] > 5 ||
              (5 === o[t] && (s || o[t + 1] !== a || 1 & o[t - 1])))) ||
          (3 === r && (s || !!o[0]))),
        (o.length = t),
        s)
      ) {
        for (; ++o[--t] > 9; )
          if (((o[t] = 0), 0 === t)) {
            (++e.e, o.unshift(1));
            break;
          }
      }
      for (t = o.length; !o[--t]; ) o.pop();
    }
    return e;
  }
  function u(e, t, r) {
    var s = e.e,
      n = e.c.join(""),
      o = n.length;
    if (t)
      n =
        n.charAt(0) +
        (o > 1 ? "." + n.slice(1) : "") +
        (s < 0 ? "e" : "e+") +
        s;
    else if (s < 0) {
      for (; ++s; ) n = "0" + n;
      n = "0." + n;
    } else if (s > 0)
      if (++s > o) for (s -= o; s--; ) n += "0";
      else s < o && (n = n.slice(0, s) + "." + n.slice(s));
    else o > 1 && (n = n.charAt(0) + "." + n.slice(1));
    return e.s < 0 && r ? "-" + n : n;
  }
  ((i.abs = function () {
    var e = new this.constructor(this);
    return ((e.s = 1), e);
  }),
    (i.cmp = function (e) {
      var t,
        r = this.c,
        s = (e = new this.constructor(e)).c,
        n = this.s,
        o = e.s,
        i = this.e,
        a = e.e;
      if (!r[0] || !s[0]) return r[0] ? n : s[0] ? -o : 0;
      if (n != o) return n;
      if (((t = n < 0), i != a)) return (i > a) ^ t ? 1 : -1;
      for (o = (i = r.length) < (a = s.length) ? i : a, n = -1; ++n < o; )
        if (r[n] != s[n]) return (r[n] > s[n]) ^ t ? 1 : -1;
      return i == a ? 0 : (i > a) ^ t ? 1 : -1;
    }),
    (i.div = function (e) {
      var t = this.constructor,
        r = this.c,
        n = (e = new t(e)).c,
        i = this.s == e.s ? 1 : -1,
        c = t.DP;
      if (c !== ~~c || c < 0 || c > 1e6) throw Error(s);
      if (!n[0]) throw Error(o);
      if (!r[0]) return ((e.s = i), (e.c = [(e.e = 0)]), e);
      var u,
        h,
        d,
        f,
        p,
        g = n.slice(),
        m = (u = n.length),
        b = r.length,
        w = r.slice(0, u),
        y = w.length,
        E = e,
        v = (E.c = []),
        $ = 0,
        _ = c + (E.e = this.e - e.e) + 1;
      for (E.s = i, i = _ < 0 ? 0 : _, g.unshift(0); y++ < u; ) w.push(0);
      do {
        for (d = 0; d < 10; d++) {
          if (u != (y = w.length)) f = u > y ? 1 : -1;
          else
            for (p = -1, f = 0; ++p < u; )
              if (n[p] != w[p]) {
                f = n[p] > w[p] ? 1 : -1;
                break;
              }
          if (f < 0) {
            for (h = y == u ? n : g; y; ) {
              if (w[--y] < h[y]) {
                for (p = y; p && !w[--p]; ) w[p] = 9;
                (--w[p], (w[y] += 10));
              }
              w[y] -= h[y];
            }
            for (; !w[0]; ) w.shift();
          } else break;
        }
        ((v[$++] = f ? d : ++d), w[0] && f ? (w[y] = r[m] || 0) : (w = [r[m]]));
      } while ((m++ < b || w[0] !== a) && i--);
      return (
        !v[0] && 1 != $ && (v.shift(), E.e--, _--),
        $ > _ && l(E, _, t.RM, w[0] !== a),
        E
      );
    }),
    (i.eq = function (e) {
      return 0 === this.cmp(e);
    }),
    (i.gt = function (e) {
      return this.cmp(e) > 0;
    }),
    (i.gte = function (e) {
      return this.cmp(e) > -1;
    }),
    (i.lt = function (e) {
      return 0 > this.cmp(e);
    }),
    (i.lte = function (e) {
      return 1 > this.cmp(e);
    }),
    (i.minus = i.sub =
      function (e) {
        var t,
          r,
          s,
          n,
          o = this.constructor,
          i = this.s,
          a = (e = new o(e)).s;
        if (i != a) return ((e.s = -a), this.plus(e));
        var c = this.c.slice(),
          l = this.e,
          u = e.c,
          h = e.e;
        if (!c[0] || !u[0])
          return (u[0] ? (e.s = -a) : c[0] ? (e = new o(this)) : (e.s = 1), e);
        if ((i = l - h)) {
          for (
            (n = i < 0) ? ((i = -i), (s = c)) : ((h = l), (s = u)),
              s.reverse(),
              a = i;
            a--;

          )
            s.push(0);
          s.reverse();
        } else
          for (
            r = ((n = c.length < u.length) ? c : u).length, i = a = 0;
            a < r;
            a++
          )
            if (c[a] != u[a]) {
              n = c[a] < u[a];
              break;
            }
        if (
          (n && ((s = c), (c = u), (u = s), (e.s = -e.s)),
          (a = (r = u.length) - (t = c.length)) > 0)
        )
          for (; a--; ) c[t++] = 0;
        for (a = t; r > i; ) {
          if (c[--r] < u[r]) {
            for (t = r; t && !c[--t]; ) c[t] = 9;
            (--c[t], (c[r] += 10));
          }
          c[r] -= u[r];
        }
        for (; 0 === c[--a]; ) c.pop();
        for (; 0 === c[0]; ) (c.shift(), --h);
        return (c[0] || ((e.s = 1), (c = [(h = 0)])), (e.c = c), (e.e = h), e);
      }),
    (i.mod = function (e) {
      var t,
        r = this,
        s = r.constructor,
        n = r.s,
        i = (e = new s(e)).s;
      if (!e.c[0]) throw Error(o);
      return ((r.s = e.s = 1), (t = 1 == e.cmp(r)), (r.s = n), (e.s = i), t)
        ? new s(r)
        : ((n = s.DP),
          (i = s.RM),
          (s.DP = s.RM = 0),
          (r = r.div(e)),
          (s.DP = n),
          (s.RM = i),
          this.minus(r.times(e)));
    }),
    (i.neg = function () {
      var e = new this.constructor(this);
      return ((e.s = -e.s), e);
    }),
    (i.plus = i.add =
      function (e) {
        var t,
          r,
          s,
          n = this.constructor;
        if (((e = new n(e)), this.s != e.s))
          return ((e.s = -e.s), this.minus(e));
        var o = this.e,
          i = this.c,
          a = e.e,
          c = e.c;
        if (!i[0] || !c[0])
          return (c[0] || (i[0] ? (e = new n(this)) : (e.s = this.s)), e);
        if (((i = i.slice()), (t = o - a))) {
          for (
            t > 0 ? ((a = o), (s = c)) : ((t = -t), (s = i)), s.reverse();
            t--;

          )
            s.push(0);
          s.reverse();
        }
        for (
          i.length - c.length < 0 && ((s = c), (c = i), (i = s)),
            t = c.length,
            r = 0;
          t;
          i[t] %= 10
        )
          r = ((i[--t] = i[t] + c[t] + r) / 10) | 0;
        for (r && (i.unshift(r), ++a), t = i.length; 0 === i[--t]; ) i.pop();
        return ((e.c = i), (e.e = a), e);
      }),
    (i.pow = function (e) {
      var t = this,
        s = new t.constructor("1"),
        n = s,
        o = e < 0;
      if (e !== ~~e || e < -1e6 || e > 1e6) throw Error(r + "exponent");
      for (o && (e = -e); 1 & e && (n = n.times(t)), (e >>= 1); )
        t = t.times(t);
      return o ? s.div(n) : n;
    }),
    (i.prec = function (e, t) {
      if (e !== ~~e || e < 1 || e > 1e6) throw Error(r + "precision");
      return l(new this.constructor(this), e, t);
    }),
    (i.round = function (e, t) {
      if (e === a) e = 0;
      else if (e !== ~~e || e < -1e6 || e > 1e6) throw Error(s);
      return l(new this.constructor(this), e + this.e + 1, t);
    }),
    (i.sqrt = function () {
      var e,
        r,
        s,
        n = this.constructor,
        o = this.s,
        i = this.e,
        a = new n("0.5");
      if (!this.c[0]) return new n(this);
      if (o < 0) throw Error(t + "No square root");
      (0 === (o = Math.sqrt(+u(this, !0, !0))) || 1 / 0 === o
        ? (((r = this.c.join("")).length + i) & 1 || (r += "0"),
          (i = (((i + 1) / 2) | 0) - (i < 0 || 1 & i)),
          (e = new n(
            (1 / 0 == (o = Math.sqrt(r))
              ? "5e"
              : (o = o.toExponential()).slice(0, o.indexOf("e") + 1)) + i,
          )))
        : (e = new n(o + "")),
        (i = e.e + (n.DP += 4)));
      do ((s = e), (e = a.times(s.plus(this.div(s)))));
      while (s.c.slice(0, i).join("") !== e.c.slice(0, i).join(""));
      return l(e, (n.DP -= 4) + e.e + 1, n.RM);
    }),
    (i.times = i.mul =
      function (e) {
        var t,
          r = this.constructor,
          s = this.c,
          n = (e = new r(e)).c,
          o = s.length,
          i = n.length,
          a = this.e,
          c = e.e;
        if (((e.s = this.s == e.s ? 1 : -1), !s[0] || !n[0]))
          return ((e.c = [(e.e = 0)]), e);
        for (
          e.e = a + c,
            o < i && ((t = s), (s = n), (n = t), (c = o), (o = i), (i = c)),
            t = Array((c = o + i));
          c--;

        )
          t[c] = 0;
        for (a = i; a--; ) {
          for (i = 0, c = o + a; c > a; )
            ((i = t[c] + n[a] * s[c - a - 1] + i),
              (t[c--] = i % 10),
              (i = (i / 10) | 0));
          t[c] = i;
        }
        for (i ? ++e.e : t.shift(), a = t.length; !t[--a]; ) t.pop();
        return ((e.c = t), e);
      }),
    (i.toExponential = function (e, t) {
      var r = this,
        n = r.c[0];
      if (e !== a) {
        if (e !== ~~e || e < 0 || e > 1e6) throw Error(s);
        for (r = l(new r.constructor(r), ++e, t); r.c.length < e; ) r.c.push(0);
      }
      return u(r, !0, !!n);
    }),
    (i.toFixed = function (e, t) {
      var r = this,
        n = r.c[0];
      if (e !== a) {
        if (e !== ~~e || e < 0 || e > 1e6) throw Error(s);
        for (
          r = l(new r.constructor(r), e + r.e + 1, t), e = e + r.e + 1;
          r.c.length < e;

        )
          r.c.push(0);
      }
      return u(r, !1, !!n);
    }),
    (i[Symbol.for("nodejs.util.inspect.custom")] =
      i.toJSON =
      i.toString =
        function () {
          var e = this.constructor;
          return u(this, this.e <= e.NE || this.e >= e.PE, !!this.c[0]);
        }),
    (i.toNumber = function () {
      var e = +u(this, !0, !0);
      if (!0 === this.constructor.strict && !this.eq(e.toString()))
        throw Error(t + "Imprecise conversion");
      return e;
    }),
    (i.toPrecision = function (e, t) {
      var s = this,
        n = s.constructor,
        o = s.c[0];
      if (e !== a) {
        if (e !== ~~e || e < 1 || e > 1e6) throw Error(r + "precision");
        for (s = l(new n(s), e, t); s.c.length < e; ) s.c.push(0);
      }
      return u(s, e <= s.e || s.e <= n.NE || s.e >= n.PE, !!o);
    }),
    (i.valueOf = function () {
      var e = this.constructor;
      if (!0 === e.strict) throw Error(t + "valueOf disallowed");
      return u(this, this.e <= e.NE || this.e >= e.PE, !0);
    }));
  var h = (function e() {
    function t(s) {
      if (!(this instanceof t)) return s === a ? e() : new t(s);
      if (s instanceof t)
        ((this.s = s.s), (this.e = s.e), (this.c = s.c.slice()));
      else {
        if ("string" != typeof s) {
          if (!0 === t.strict && "bigint" != typeof s)
            throw TypeError(r + "value");
          s = 0 === s && 1 / s < 0 ? "-0" : String(s);
        }
        !(function (e, t) {
          var s, n, o;
          if (!c.test(t)) throw Error(r + "number");
          for (
            e.s = "-" == t.charAt(0) ? ((t = t.slice(1)), -1) : 1,
              (s = t.indexOf(".")) > -1 && (t = t.replace(".", "")),
              (n = t.search(/e/i)) > 0
                ? (s < 0 && (s = n),
                  (s += +t.slice(n + 1)),
                  (t = t.substring(0, n)))
                : s < 0 && (s = t.length),
              o = t.length,
              n = 0;
            n < o && "0" == t.charAt(n);

          )
            ++n;
          if (n == o) e.c = [(e.e = 0)];
          else {
            for (; o > 0 && "0" == t.charAt(--o); );
            for (e.e = s - n - 1, e.c = [], s = 0; n <= o; )
              e.c[s++] = +t.charAt(n++);
          }
        })(this, s);
      }
      this.constructor = t;
    }
    return (
      (t.prototype = i),
      (t.DP = 20),
      (t.RM = 1),
      (t.NE = -7),
      (t.PE = 21),
      (t.strict = !1),
      (t.roundDown = 0),
      (t.roundHalfUp = 1),
      (t.roundHalfEven = 2),
      (t.roundUp = 3),
      t
    );
  })();
  e.s(["f", 0, h]);
};
