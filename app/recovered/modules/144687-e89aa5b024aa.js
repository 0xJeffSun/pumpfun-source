// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(352386);
  let s = Symbol("screener-parent-sync-unset");
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
      for (let [s, r] of t) if (e.get(s) !== r) return !1;
      return !0;
    },
    "T",
    0,
    function (e, r, n) {
      let i = (0, t.useRef)(s),
        l = (0, t.useRef)(r);
      ((l.current = r),
        (0, t.useEffect)(() => {
          let t = i.current === s ? void 0 : i.current;
          (i.current !== s && n(t, e)) || ((i.current = e), l.current?.(e));
        }, [e, n]));
    },
  ]);
};
