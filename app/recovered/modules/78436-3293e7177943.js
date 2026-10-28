// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(352386);
  let r = (e) => {
      let t,
        r = new Set(),
        o = (e, o) => {
          let n = "function" == typeof e ? e(t) : e;
          if (!Object.is(n, t)) {
            let e = t;
            ((t = (null != o ? o : "object" != typeof n || null === n)
              ? n
              : Object.assign({}, t, n)),
              r.forEach((r) => r(t, e)));
          }
        },
        n = () => t,
        a = {
          setState: o,
          getState: n,
          getInitialState: () => i,
          subscribe: (e) => (r.add(e), () => r.delete(e)),
        },
        i = (t = e(o, n, a));
      return a;
    },
    o = (e) => (e ? r(e) : r);
  e.s(["f", 0, o], 510757);
  let n = (e) => e;
  function a(e, r = n) {
    let o = t.default.useSyncExternalStore(
      e.subscribe,
      () => r(e.getState()),
      () => r(e.getInitialState()),
    );
    return (t.default.useDebugValue(o), o);
  }
  let i = (e) => {
    let t = o(e),
      r = (e) => a(t, e);
    return (Object.assign(r, t), r);
  };
  e.s(["$", 0, (e) => (e ? i(e) : i), "f", 0, a], 78436);
};
