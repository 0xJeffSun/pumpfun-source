// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(7284);
  let r = (e) => ("boolean" == typeof e ? `${e}` : 0 === e ? "0" : e),
    n = t.q;
  e.s([
    "f",
    0,
    (e, t) => (i) => {
      var o;
      if ((null == t ? void 0 : t.variants) == null)
        return n(
          e,
          null == i ? void 0 : i.class,
          null == i ? void 0 : i.className,
        );
      let { variants: a, defaultVariants: s } = t,
        l = Object.keys(a).map((e) => {
          let t = null == i ? void 0 : i[e],
            n = null == s ? void 0 : s[e];
          if (null === t) return null;
          let o = r(t) || r(n);
          return a[e][o];
        }),
        c =
          i &&
          Object.entries(i).reduce((e, t) => {
            let [r, n] = t;
            return (void 0 === n || (e[r] = n), e);
          }, {});
      return n(
        e,
        l,
        null == t || null == (o = t.compoundVariants)
          ? void 0
          : o.reduce((e, t) => {
              let { class: r, className: n, ...i } = t;
              return Object.entries(i).every((e) => {
                let [t, r] = e;
                return Array.isArray(r)
                  ? r.includes({ ...s, ...c }[t])
                  : { ...s, ...c }[t] === r;
              })
                ? [...e, r, n]
                : e;
            }, []),
        null == i ? void 0 : i.class,
        null == i ? void 0 : i.className,
      );
    },
  ]);
};
