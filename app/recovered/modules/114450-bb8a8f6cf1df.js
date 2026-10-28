// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(238153),
    r = e.i(492421),
    n = e.i(632713),
    a = e.i(539392),
    i = e.i(504244),
    l = e.i(511518),
    o = e.i(324292),
    s = e.i(737038),
    u = e.i(667062);
  e.s(
    [
      "f",
      0,
      function (e, d, c) {
        let f,
          m,
          h = (0, r.f)(),
          p = c?.locale ?? h.locale ?? t.f,
          x = (0, i.f)(e, d);
        if (isNaN(x)) throw RangeError("Invalid time value");
        let g = Object.assign({}, c, {
            addSuffix: c?.addSuffix,
            comparison: x,
          }),
          [y, v] = (0, a.f)(c?.in, ...(x > 0 ? [d, e] : [e, d])),
          b = ((m = (0, u.f)(v, y) / 1e3), (0, s.f)(void 0)(m)),
          w = Math.round((b - ((0, n.f)(v) - (0, n.f)(y)) / 1e3) / 60);
        if (w < 2)
          if (c?.includeSeconds)
            if (b < 5) return p.formatDistance("lessThanXSeconds", 5, g);
            else if (b < 10) return p.formatDistance("lessThanXSeconds", 10, g);
            else if (b < 20) return p.formatDistance("lessThanXSeconds", 20, g);
            else if (b < 40) return p.formatDistance("halfAMinute", 0, g);
            else if (b < 60) return p.formatDistance("lessThanXMinutes", 1, g);
            else return p.formatDistance("xMinutes", 1, g);
          else if (0 === w) return p.formatDistance("lessThanXMinutes", 1, g);
          else return p.formatDistance("xMinutes", w, g);
        if (w < 45) return p.formatDistance("xMinutes", w, g);
        if (w < 90) return p.formatDistance("aboutXHours", 1, g);
        if (w < l.k) {
          let e = Math.round(w / 60);
          return p.formatDistance("aboutXHours", e, g);
        }
        if (w < 2520) return p.formatDistance("xDays", 1, g);
        else if (w < l.d) {
          let e = Math.round(w / l.k);
          return p.formatDistance("xDays", e, g);
        } else if (w < 2 * l.d)
          return (
            (f = Math.round(w / l.d)),
            p.formatDistance("aboutXMonths", f, g)
          );
        if ((f = (0, o.f)(v, y)) < 12) {
          let e = Math.round(w / l.d);
          return p.formatDistance("xMonths", e, g);
        }
        {
          let e = f % 12,
            t = Math.trunc(f / 12);
          return e < 3
            ? p.formatDistance("aboutXYears", t, g)
            : e < 9
              ? p.formatDistance("overXYears", t, g)
              : p.formatDistance("almostXYears", t + 1, g);
        }
      },
    ],
    114450,
  );
};
