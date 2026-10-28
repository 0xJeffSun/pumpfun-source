// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(445242),
    r = e.i(352386);
  e.i(12692);
  var n = e.i(398902);
  let i = (e) => !!e && "object" == typeof e;
  e.s([
    "I18nNamespaces",
    0,
    function (e) {
      let a,
        o,
        s = (0, t.c)(5),
        { promise: l, children: c } = e,
        { i18n: d } = (0, n.f)(),
        { locale: m, resources: u } = (0, r.use)(l),
        b = `${m}:${Object.keys(u).join(",")}`,
        [h, f] = (0, r.useState)(null);
      if (h !== b) {
        let e, t;
        ((e = d.services.resourceStore.data),
          (e[m] ??= {}),
          (e[m].translation ??= {}),
          (t = (e, r) => {
            for (let [n, a] of Object.entries(r)) {
              if ("__proto__" === n || "constructor" === n || "prototype" === n)
                continue;
              let r = e[n];
              i(a) && i(r) ? t(r, a) : (e[n] = a);
            }
          })(e[m].translation, u),
          f(b));
      }
      return (
        s[0] !== d || s[1] !== m || s[2] !== u
          ? ((a = () => {
              d.addResourceBundle(m, "translation", u, !0, !0);
            }),
            (o = [d, m, u]),
            (s[0] = d),
            (s[1] = m),
            (s[2] = u),
            (s[3] = a),
            (s[4] = o))
          : ((a = s[3]), (o = s[4])),
        (0, r.useEffect)(a, o),
        c
      );
    },
  ]);
};
