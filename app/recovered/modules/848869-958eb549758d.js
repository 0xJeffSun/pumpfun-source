// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(238153),
    r = e.i(492421),
    n = e.i(737038),
    a = e.i(632713),
    i = e.i(539392),
    l = e.i(504244),
    o = e.i(511518);
  e.s([
    "f",
    0,
    function (e, s, u) {
      let d,
        c = (0, r.f)(),
        f = u?.locale ?? c.locale ?? t.f,
        m = (0, l.f)(e, s);
      if (isNaN(m)) throw RangeError("Invalid time value");
      let h = Object.assign({}, u, { addSuffix: u?.addSuffix, comparison: m }),
        [p, x] = (0, i.f)(u?.in, ...(m > 0 ? [s, e] : [e, s])),
        g = (0, n.f)(u?.roundingMethod ?? "round"),
        y = x.getTime() - p.getTime(),
        v = y / o.z,
        b = (y - ((0, a.f)(x) - (0, a.f)(p))) / o.z,
        w = u?.unit;
      if (
        "second" ===
        (d =
          w ||
          (v < 1
            ? "second"
            : v < 60
              ? "minute"
              : v < o.k
                ? "hour"
                : b < o.d
                  ? "day"
                  : b < o.l
                    ? "month"
                    : "year"))
      ) {
        let e = g(y / 1e3);
        return f.formatDistance("xSeconds", e, h);
      }
      if ("minute" === d) {
        let e = g(v);
        return f.formatDistance("xMinutes", e, h);
      }
      if ("hour" === d) {
        let e = g(v / 60);
        return f.formatDistance("xHours", e, h);
      }
      if ("day" === d) {
        let e = g(b / o.k);
        return f.formatDistance("xDays", e, h);
      }
      if ("month" === d) {
        let e = g(b / o.d);
        return 12 === e && "month" !== w
          ? f.formatDistance("xYears", 1, h)
          : f.formatDistance("xMonths", e, h);
      } else {
        let e = g(b / o.l);
        return f.formatDistance("xYears", e, h);
      }
    },
  ]);
};
