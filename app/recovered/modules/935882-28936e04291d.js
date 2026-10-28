// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e, t, n) => {
  t.exports &&
    (t.exports = function (e) {
      return (
        (e.prototype.toFormat = function (e, t, n) {
          if (!this.e && 0 !== this.e) return this.toString();
          var i,
            r,
            o,
            a,
            s,
            u,
            c,
            l,
            m,
            d,
            p,
            f,
            y,
            g,
            S,
            A = this.format || {},
            b = this.constructor.format || {};
          if (
            (e != s
              ? "object" == typeof e
                ? ((n = e), (e = s))
                : t != s
                  ? "object" == typeof t
                    ? ((n = t), (t = s))
                    : "object" != typeof n && (n = {})
                  : (n = {})
              : (n = {}),
            (l = (i = this.toFixed(e, t).split("."))[0]),
            (m = i[1]),
            (u = (c = this.s < 0 ? l.slice(1) : l).length),
            (d = n.decimalSeparator) == s &&
              (d = A.decimalSeparator) == s &&
              (d = b.decimalSeparator) == s &&
              (d = "."),
            (p = n.groupSeparator) == s &&
              (p = A.groupSeparator) == s &&
              (p = b.groupSeparator),
            p &&
              ((f = n.groupSize) == s &&
                (f = A.groupSize) == s &&
                (f = b.groupSize) == s &&
                (f = 0),
              (y = n.secondaryGroupSize) == s &&
                (y = A.secondaryGroupSize) == s &&
                (y = b.secondaryGroupSize) == s &&
                (y = 0),
              y ? ((r = +y), (u -= o = +f)) : ((r = +f), (o = +y)),
              r > 0 && u > 0))
          ) {
            for (a = u % r || r, l = c.substr(0, a); a < u; a += r)
              l += p + c.substr(a, r);
            (o > 0 && (l += p + c.slice(a)), this.s < 0 && (l = "-" + l));
          }
          return m
            ? ((g = n.fractionGroupSeparator) == s &&
                (g = A.fractionGroupSeparator) == s &&
                (g = b.fractionGroupSeparator),
              g &&
                ((S = n.fractionGroupSize) == s &&
                  (S = A.fractionGroupSize) == s &&
                  (S = b.fractionGroupSize) == s &&
                  (S = 0),
                (S *= 1) &&
                  (m = m.replace(RegExp("\\d{" + S + "}\\B", "g"), "$&" + g))),
              l + d + m)
            : l;
        }),
        (e.format = {
          decimalSeparator: ".",
          groupSeparator: ",",
          groupSize: 3,
          secondaryGroupSize: 0,
          fractionGroupSeparator: "",
          fractionGroupSize: 0,
        }),
        e
      );
    });
};
