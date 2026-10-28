// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(352386);
  let r = Symbol("screener-parent-sync-unset");
  e.s([
    "w",
    0,
    (e, t) =>
      e === t ||
      (null == e || null == t
        ? e === t
        : JSON.stringify(e) === JSON.stringify(t)),
    "G",
    0,
    (e, t) => {
      if (e === t) return !0;
      if (!e || e.size !== t.size) return !1;
      for (let [r, n] of t) if (e.get(r) !== n) return !1;
      return !0;
    },
    "T",
    0,
    function (e, n, s) {
      let i = (0, t.useRef)(r),
        l = (0, t.useRef)(n);
      ((l.current = n),
        (0, t.useEffect)(() => {
          let t = i.current === r ? void 0 : i.current;
          (i.current !== r && s(t, e)) || ((i.current = e), l.current?.(e));
        }, [e, s]));
    },
  ]);
};
