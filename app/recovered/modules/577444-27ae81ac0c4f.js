// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(445242),
    r = e.i(352386);
  e.i(12692);
  var l = e.i(398902);
  let a = (e) => !!e && "object" == typeof e;
  e.s([
    "I18nNamespaces",
    0,
    function (e) {
      let i,
        n,
        s = (0, t.c)(5),
        { promise: o, children: d } = e,
        { i18n: c } = (0, l.f)(),
        { locale: u, resources: m } = (0, r.use)(o),
        f = `${u}:${Object.keys(m).join(",")}`,
        [p, h] = (0, r.useState)(null);
      if (p !== f) {
        let e, t;
        ((e = c.services.resourceStore.data),
          (e[u] ??= {}),
          (e[u].translation ??= {}),
          (t = (e, r) => {
            for (let [l, i] of Object.entries(r)) {
              if ("__proto__" === l || "constructor" === l || "prototype" === l)
                continue;
              let r = e[l];
              a(i) && a(r) ? t(r, i) : (e[l] = i);
            }
          })(e[u].translation, m),
          h(f));
      }
      return (
        s[0] !== c || s[1] !== u || s[2] !== m
          ? ((i = () => {
              c.addResourceBundle(u, "translation", m, !0, !0);
            }),
            (n = [c, u, m]),
            (s[0] = c),
            (s[1] = u),
            (s[2] = m),
            (s[3] = i),
            (s[4] = n))
          : ((i = s[3]), (n = s[4])),
        (0, r.useEffect)(i, n),
        d
      );
    },
  ]);
};
