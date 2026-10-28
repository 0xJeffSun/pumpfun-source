// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  e.i(149502);
  var t = e.i(352386);
  e.s([
    "f",
    0,
    function ({ controlled: e, default: n, name: r, state: i = "value" }) {
      let { current: o } = t.useRef(void 0 !== e),
        [l, s] = t.useState(n),
        u = t.useCallback((e) => {
          o || s(e);
        }, []);
      return [o ? e : l, u];
    },
  ]);
};
