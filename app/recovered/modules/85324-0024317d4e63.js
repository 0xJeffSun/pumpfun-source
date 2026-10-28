// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(352386);
  let n = () => "visible" === document.visibilityState && document.hasFocus(),
    r = () => "visible" === document.visibilityState,
    i = () => !1,
    a = (e) => (
      document.addEventListener("visibilitychange", e),
      window.addEventListener("focus", e),
      window.addEventListener("blur", e),
      () => {
        (document.removeEventListener("visibilitychange", e),
          window.removeEventListener("focus", e),
          window.removeEventListener("blur", e));
      }
    ),
    o = () => (0, t.useSyncExternalStore)(a, n, i),
    s = (e) => (
      document.addEventListener("visibilitychange", e),
      () => {
        document.removeEventListener("visibilitychange", e);
      }
    ),
    l = () => (0, t.useSyncExternalStore)(s, r, i);
  e.s([
    "W",
    0,
    o,
    "p",
    0,
    l,
    "q",
    0,
    (e, t) => {
      let n = o();
      return !!(void 0 === t || t) && !!n && "number" == typeof e && e;
    },
    "S",
    0,
    (e, t) => {
      let n = l();
      return !!(void 0 === t || t) && !!n && "number" == typeof e && e;
    },
  ]);
};
