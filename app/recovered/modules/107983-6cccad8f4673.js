// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(t, e, r) => {
  var o = t.r(352386),
    n =
      "function" == typeof Object.is
        ? Object.is
        : function (t, e) {
            return (
              (t === e && (0 !== t || 1 / t == 1 / e)) || (t != t && e != e)
            );
          },
    i = o.useState,
    s = o.useEffect,
    a = o.useLayoutEffect,
    l = o.useDebugValue;
  function u(t) {
    var e = t.getSnapshot;
    t = t.value;
    try {
      var r = e();
      return !n(t, r);
    } catch (t) {
      return !0;
    }
  }
  var c =
    "u" < typeof window ||
    void 0 === window.document ||
    void 0 === window.document.createElement
      ? function (t, e) {
          return e();
        }
      : function (t, e) {
          var r = e(),
            o = i({ inst: { value: r, getSnapshot: e } }),
            n = o[0].inst,
            c = o[1];
          return (
            a(
              function () {
                ((n.value = r), (n.getSnapshot = e), u(n) && c({ inst: n }));
              },
              [t, r, e],
            ),
            s(
              function () {
                return (
                  u(n) && c({ inst: n }),
                  t(function () {
                    u(n) && c({ inst: n });
                  })
                );
              },
              [t],
            ),
            l(r),
            r
          );
        };
  r.useSyncExternalStore =
    void 0 !== o.useSyncExternalStore ? o.useSyncExternalStore : c;
};
