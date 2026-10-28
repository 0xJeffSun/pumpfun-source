// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(t) => {
  var e = t.i(352386),
    i = t.i(430663);
  t.s([
    "f",
    0,
    function (t = !0) {
      let s = (0, e.useContext)(i.f);
      if (null === s) return [!0, null];
      let { isPresent: r, onExitComplete: n, register: a } = s,
        o = (0, e.useId)();
      (0, e.useEffect)(() => {
        if (t) return a(o);
      }, [t]);
      let l = (0, e.useCallback)(() => t && n && n(o), [o, n, t]);
      return !r && n ? [!1, l] : [!0];
    },
  ]);
};
