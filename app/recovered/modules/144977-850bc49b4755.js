// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(352386);
  function n(e, t) {
    if ("function" == typeof e) return e(t);
    null != e && (e.current = t);
  }
  function r(...e) {
    return (t) => {
      let r = !1,
        o = e.map((e) => {
          let o = n(e, t);
          return (r || "function" != typeof o || (r = !0), o);
        });
      if (r)
        return () => {
          for (let t = 0; t < o.length; t++) {
            let r = o[t];
            "function" == typeof r ? r() : n(e[t], null);
          }
        };
    };
  }
  e.s([
    "Q",
    0,
    r,
    "j",
    0,
    function (...e) {
      return t.useCallback(r(...e), e);
    },
  ]);
};
