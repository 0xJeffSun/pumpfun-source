// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(352386);
  let r = () => "visible" === document.visibilityState && document.hasFocus(),
    n = () => "visible" === document.visibilityState,
    i = () => !1,
    o = (e) => (
      document.addEventListener("visibilitychange", e),
      window.addEventListener("focus", e),
      window.addEventListener("blur", e),
      () => {
        (document.removeEventListener("visibilitychange", e),
          window.removeEventListener("focus", e),
          window.removeEventListener("blur", e));
      }
    ),
    a = () => (0, t.useSyncExternalStore)(o, r, i),
    s = (e) => (
      document.addEventListener("visibilitychange", e),
      () => {
        document.removeEventListener("visibilitychange", e);
      }
    ),
    l = () => (0, t.useSyncExternalStore)(s, n, i);
  e.s([
    "W",
    0,
    a,
    "p",
    0,
    l,
    "q",
    0,
    (e, t) => {
      let r = a();
      return !!(void 0 === t || t) && !!r && "number" == typeof e && e;
    },
    "S",
    0,
    (e, t) => {
      let r = l();
      return !!(void 0 === t || t) && !!r && "number" == typeof e && e;
    },
  ]);
};
