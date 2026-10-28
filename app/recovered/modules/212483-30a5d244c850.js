// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e, t, n) => {
  var r = e.r(352386),
    a =
      "function" == typeof Object.is
        ? Object.is
        : function (e, t) {
            return (
              (e === t && (0 !== e || 1 / e == 1 / t)) || (e != e && t != t)
            );
          },
    i = r.useSyncExternalStore,
    s = r.useRef,
    o = r.useEffect,
    l = r.useMemo,
    c = r.useDebugValue;
  n.useSyncExternalStoreWithSelector = function (e, t, n, r, u) {
    var d = s(null);
    if (null === d.current) {
      var p = { hasValue: !1, value: null };
      d.current = p;
    } else p = d.current;
    var f = i(
      e,
      (d = l(
        function () {
          function e(e) {
            if (!o) {
              if (((o = !0), (i = e), (e = r(e)), void 0 !== u && p.hasValue)) {
                var t = p.value;
                if (u(t, e)) return (s = t);
              }
              return (s = e);
            }
            if (((t = s), a(i, e))) return t;
            var n = r(e);
            return void 0 !== u && u(t, n) ? ((i = e), t) : ((i = e), (s = n));
          }
          var i,
            s,
            o = !1,
            l = void 0 === n ? null : n;
          return [
            function () {
              return e(t());
            },
            null === l
              ? void 0
              : function () {
                  return e(l());
                },
          ];
        },
        [t, n, r, u],
      ))[0],
      d[1],
    );
    return (
      o(
        function () {
          ((p.hasValue = !0), (p.value = f));
        },
        [f],
      ),
      c(f),
      f
    );
  };
};
