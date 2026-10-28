// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(445242),
    r = e.i(352386);
  e.i(12692);
  var l = e.i(398902);
  let i = (e) => !!e && "object" == typeof e;
  e.s([
    "I18nNamespaces",
    0,
    function (e) {
      let a,
        n,
        s = (0, t.c)(5),
        { promise: o, children: d } = e,
        { i18n: u } = (0, l.f)(),
        { locale: c, resources: m } = (0, r.use)(o),
        p = `${c}:${Object.keys(m).join(",")}`,
        [h, f] = (0, r.useState)(null);
      if (h !== p) {
        let e, t;
        ((e = u.services.resourceStore.data),
          (e[c] ??= {}),
          (e[c].translation ??= {}),
          (t = (e, r) => {
            for (let [l, a] of Object.entries(r)) {
              if ("__proto__" === l || "constructor" === l || "prototype" === l)
                continue;
              let r = e[l];
              i(a) && i(r) ? t(r, a) : (e[l] = a);
            }
          })(e[c].translation, m),
          f(p));
      }
      return (
        s[0] !== u || s[1] !== c || s[2] !== m
          ? ((a = () => {
              u.addResourceBundle(c, "translation", m, !0, !0);
            }),
            (n = [u, c, m]),
            (s[0] = u),
            (s[1] = c),
            (s[2] = m),
            (s[3] = a),
            (s[4] = n))
          : ((a = s[3]), (n = s[4])),
        (0, r.useEffect)(a, n),
        d
      );
    },
  ]);
};
