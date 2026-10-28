// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(352386),
    n = e.i(839854);
  function r(e, t, r) {
    let o = new Map(),
      l = "item" === r,
      s = {};
    for (let t in ("floating" === r && ((s.tabIndex = -1), (s[n.Q] = "")), e))
      (l && e && (t === n.U || t === n.g)) || (s[t] = e[t]);
    for (let n = 0; n < t.length; n += 1) {
      let u,
        a = t[n]?.[r];
      (u = "function" == typeof a ? (e ? a(e) : null) : a) && i(s, u, l, o);
    }
    return (i(s, e, l, o), s);
  }
  function i(e, t, r, i) {
    for (let o in t) {
      let l = t[o];
      (r && (o === n.U || o === n.g)) ||
        (o.startsWith("on")
          ? (i.has(o) || i.set(o, []),
            "function" == typeof l &&
              (i.get(o)?.push(l),
              (e[o] = (...e) =>
                i
                  .get(o)
                  ?.map((t) => t(...e))
                  .find((e) => void 0 !== e))))
          : (e[o] = l));
    }
  }
  e.s([
    "f",
    0,
    function (e = []) {
      let n = e.map((e) => e?.reference),
        i = e.map((e) => e?.floating),
        o = e.map((e) => e?.item),
        l = e.map((e) => e?.trigger),
        s = t.useCallback((t) => r(t, e, "reference"), n),
        u = t.useCallback((t) => r(t, e, "floating"), i),
        a = t.useCallback((t) => r(t, e, "item"), o),
        c = t.useCallback((t) => r(t, e, "trigger"), l);
      return t.useMemo(
        () => ({
          getReferenceProps: s,
          getFloatingProps: u,
          getItemProps: a,
          getTriggerProps: c,
        }),
        [s, u, a, c],
      );
    },
  ]);
};
