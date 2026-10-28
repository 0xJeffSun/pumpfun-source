// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var r = e.i(445242),
    t = e.i(352386);
  e.i(12692);
  var s = e.i(398902);
  let i = (e) => !!e && "object" == typeof e;
  e.s([
    "I18nNamespaces",
    0,
    function (e) {
      let u,
        o,
        n = (0, r.c)(5),
        { promise: a, children: l } = e,
        { i18n: c } = (0, s.f)(),
        { locale: d, resources: v } = (0, t.use)(a),
        f = `${d}:${Object.keys(v).join(",")}`,
        [m, h] = (0, t.useState)(null);
      if (m !== f) {
        let e, r;
        ((e = c.services.resourceStore.data),
          (e[d] ??= {}),
          (e[d].translation ??= {}),
          (r = (e, t) => {
            for (let [s, u] of Object.entries(t)) {
              if ("__proto__" === s || "constructor" === s || "prototype" === s)
                continue;
              let t = e[s];
              i(u) && i(t) ? r(t, u) : (e[s] = u);
            }
          })(e[d].translation, v),
          h(f));
      }
      return (
        n[0] !== c || n[1] !== d || n[2] !== v
          ? ((u = () => {
              c.addResourceBundle(d, "translation", v, !0, !0);
            }),
            (o = [c, d, v]),
            (n[0] = c),
            (n[1] = d),
            (n[2] = v),
            (n[3] = u),
            (n[4] = o))
          : ((u = n[3]), (o = n[4])),
        (0, t.useEffect)(u, o),
        l
      );
    },
  ]);
};
