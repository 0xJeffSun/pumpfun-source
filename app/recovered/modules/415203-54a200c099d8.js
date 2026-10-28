// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(732486),
    r = e.i(352386),
    a = e.i(457150),
    i = e.i(80496);
  function n(e) {
    return "function" == typeof e;
  }
  e.s(
    [
      "f",
      0,
      function ({ children: e, features: l, strict: s = !1 }) {
        let [, o] = (0, r.useState)(!n(l)),
          c = (0, r.useRef)(void 0);
        if (!n(l)) {
          let { renderer: e, ...t } = l;
          ((c.current = e), (0, i.f)(t));
        }
        return (
          (0, r.useEffect)(() => {
            n(l) &&
              l().then(({ renderer: e, ...t }) => {
                ((0, i.f)(t), (c.current = e), o(!0));
              });
          }, []),
          (0, t.jsx)(a.f.Provider, {
            value: { renderer: c.current, strict: s },
            children: e,
          })
        );
      },
    ],
    415203,
  );
  let l = (0, e.i(360286).f)();
  e.s(["m", 0, l], 39548);
};
