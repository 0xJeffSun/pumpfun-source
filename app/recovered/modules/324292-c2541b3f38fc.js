// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(539392),
    r = e.i(516467);
  function n(e, t) {
    let n = (0, r.f)(e) - (0, r.f)(t);
    return n < 0 ? -1 : n > 0 ? 1 : n;
  }
  (e.s(["f", 0, n], 504244),
    e.s(
      [
        "f",
        0,
        function (e, a, i) {
          var l, o;
          let s,
            u,
            d,
            c,
            [f, m, h] = (0, t.f)(i?.in, e, e, a),
            p = n(m, h),
            x = Math.abs(
              (function (e, r) {
                let [n, a] = (0, t.f)(void 0, e, r);
                return (
                  12 * (n.getFullYear() - a.getFullYear()) +
                  (n.getMonth() - a.getMonth())
                );
              })(m, h),
            );
          if (x < 1) return 0;
          (1 === m.getMonth() && m.getDate() > 27 && m.setDate(30),
            m.setMonth(m.getMonth() - p * x));
          let g = n(m, h) === -p;
          +((s = (0, r.f)(f, void 0)),
          (l = void 0),
          (u = (0, r.f)(s, l?.in)).setHours(23, 59, 59, 999),
          u) ==
            +((o = void 0),
            (c = (d = (0, r.f)(s, o?.in)).getMonth()),
            d.setFullYear(d.getFullYear(), c + 1, 0),
            d.setHours(23, 59, 59, 999),
            d) &&
            1 === x &&
            1 === n(f, h) &&
            (g = !1);
          let y = p * (x - g);
          return 0 === y ? 0 : y;
        },
      ],
      324292,
    ));
};
