// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(t, e, r) => {
  var o = t.r(352386),
    n = t.r(33347),
    i =
      "function" == typeof Object.is
        ? Object.is
        : function (t, e) {
            return (
              (t === e && (0 !== t || 1 / t == 1 / e)) || (t != t && e != e)
            );
          },
    s = n.useSyncExternalStore,
    a = o.useRef,
    l = o.useEffect,
    u = o.useMemo,
    c = o.useDebugValue;
  r.useSyncExternalStoreWithSelector = function (t, e, r, o, n) {
    var f = a(null);
    if (null === f.current) {
      var h = { hasValue: !1, value: null };
      f.current = h;
    } else h = f.current;
    var p = s(
      t,
      (f = u(
        function () {
          function t(t) {
            if (!l) {
              if (((l = !0), (s = t), (t = o(t)), void 0 !== n && h.hasValue)) {
                var e = h.value;
                if (n(e, t)) return (a = e);
              }
              return (a = t);
            }
            if (((e = a), i(s, t))) return e;
            var r = o(t);
            return void 0 !== n && n(e, r) ? ((s = t), e) : ((s = t), (a = r));
          }
          var s,
            a,
            l = !1,
            u = void 0 === r ? null : r;
          return [
            function () {
              return t(e());
            },
            null === u
              ? void 0
              : function () {
                  return t(u());
                },
          ];
        },
        [e, r, o, n],
      ))[0],
      f[1],
    );
    return (
      l(
        function () {
          ((h.hasValue = !0), (h.value = p));
        },
        [p],
      ),
      c(p),
      p
    );
  };
};
