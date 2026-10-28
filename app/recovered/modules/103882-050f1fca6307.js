// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(539392),
    n = e.i(738416);
  e.s(
    [
      "f",
      0,
      function (e, r, i) {
        let [a, o] = (0, t.f)(i?.in, e, r);
        return +(0, n.f)(a) == +(0, n.f)(o);
      },
    ],
    103882,
  );
  var r = e.i(487122),
    i = e.i(516467);
  e.s(
    [
      "f",
      0,
      function (e, t, n) {
        var a;
        let o;
        return (
          (a = -t),
          (o = (0, i.f)(e, n?.in)),
          isNaN(a)
            ? (0, r.f)(n?.in || e, 0 / 0)
            : (a && o.setDate(o.getDate() + a), o)
        );
      },
    ],
    119470,
  );
};
