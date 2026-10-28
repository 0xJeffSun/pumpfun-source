// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(445242),
    r = e.i(352386);
  e.i(12692);
  var a = e.i(398902);
  let i = (e) => !!e && "object" == typeof e;
  e.s([
    "I18nNamespaces",
    0,
    function (e) {
      let l,
        n,
        o = (0, t.c)(5),
        { promise: s, children: d } = e,
        { i18n: c } = (0, a.f)(),
        { locale: u, resources: f } = (0, r.use)(s),
        m = `${u}:${Object.keys(f).join(",")}`,
        [p, b] = (0, r.useState)(null);
      if (p !== m) {
        let e, t;
        ((e = c.services.resourceStore.data),
          (e[u] ??= {}),
          (e[u].translation ??= {}),
          (t = (e, r) => {
            for (let [a, l] of Object.entries(r)) {
              if ("__proto__" === a || "constructor" === a || "prototype" === a)
                continue;
              let r = e[a];
              i(l) && i(r) ? t(r, l) : (e[a] = l);
            }
          })(e[u].translation, f),
          b(m));
      }
      return (
        o[0] !== c || o[1] !== u || o[2] !== f
          ? ((l = () => {
              c.addResourceBundle(u, "translation", f, !0, !0);
            }),
            (n = [c, u, f]),
            (o[0] = c),
            (o[1] = u),
            (o[2] = f),
            (o[3] = l),
            (o[4] = n))
          : ((l = o[3]), (n = o[4])),
        (0, r.useEffect)(l, n),
        d
      );
    },
  ]);
};
