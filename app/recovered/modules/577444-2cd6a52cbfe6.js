// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(445242),
    i = e.i(352386);
  e.i(12692);
  var r = e.i(398902);
  let a = (e) => !!e && "object" == typeof e;
  e.s([
    "I18nNamespaces",
    0,
    function (e) {
      let n,
        s,
        l = (0, t.c)(5),
        { promise: o, children: c } = e,
        { i18n: m } = (0, r.f)(),
        { locale: d, resources: h } = (0, i.use)(o),
        u = `${d}:${Object.keys(h).join(",")}`,
        [f, x] = (0, i.useState)(null);
      if (f !== u) {
        let e, t;
        ((e = m.services.resourceStore.data),
          (e[d] ??= {}),
          (e[d].translation ??= {}),
          (t = (e, i) => {
            for (let [r, n] of Object.entries(i)) {
              if ("__proto__" === r || "constructor" === r || "prototype" === r)
                continue;
              let i = e[r];
              a(n) && a(i) ? t(i, n) : (e[r] = n);
            }
          })(e[d].translation, h),
          x(u));
      }
      return (
        l[0] !== m || l[1] !== d || l[2] !== h
          ? ((n = () => {
              m.addResourceBundle(d, "translation", h, !0, !0);
            }),
            (s = [m, d, h]),
            (l[0] = m),
            (l[1] = d),
            (l[2] = h),
            (l[3] = n),
            (l[4] = s))
          : ((n = l[3]), (s = l[4])),
        (0, i.useEffect)(n, s),
        c
      );
    },
  ]);
};
