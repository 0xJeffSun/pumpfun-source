// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(445242),
    r = e.i(352386);
  e.i(12692);
  var i = e.i(398902);
  let a = (e) => !!e && "object" == typeof e;
  e.s([
    "I18nNamespaces",
    0,
    function (e) {
      let s,
        n,
        l = (0, t.c)(5),
        { promise: o, children: c } = e,
        { i18n: d } = (0, i.f)(),
        { locale: u, resources: m } = (0, r.use)(o),
        p = `${u}:${Object.keys(m).join(",")}`,
        [f, x] = (0, r.useState)(null);
      if (f !== p) {
        let e, t;
        ((e = d.services.resourceStore.data),
          (e[u] ??= {}),
          (e[u].translation ??= {}),
          (t = (e, r) => {
            for (let [i, s] of Object.entries(r)) {
              if ("__proto__" === i || "constructor" === i || "prototype" === i)
                continue;
              let r = e[i];
              a(s) && a(r) ? t(r, s) : (e[i] = s);
            }
          })(e[u].translation, m),
          x(p));
      }
      return (
        l[0] !== d || l[1] !== u || l[2] !== m
          ? ((s = () => {
              d.addResourceBundle(u, "translation", m, !0, !0);
            }),
            (n = [d, u, m]),
            (l[0] = d),
            (l[1] = u),
            (l[2] = m),
            (l[3] = s),
            (l[4] = n))
          : ((s = l[3]), (n = l[4])),
        (0, r.useEffect)(s, n),
        c
      );
    },
  ]);
};
