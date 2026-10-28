// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(t) => {
  var e = t.i(964355),
    i = t.i(660391);
  let s = (t) => Array.isArray(t);
  (t.s(["f", 0, s], 130350),
    t.s(
      [
        "f",
        0,
        function (t, n) {
          let {
            transitionEnd: r = {},
            transition: o = {},
            ...a
          } = (0, i.f)(t, n) || {};
          for (let i in (a = { ...a, ...r })) {
            var l;
            let n = s((l = a[i])) ? l[l.length - 1] || 0 : l;
            t.hasValue(i) ? t.getValue(i).set(n) : t.addValue(i, (0, e.o)(n));
          }
        },
      ],
      198577,
    ));
};
