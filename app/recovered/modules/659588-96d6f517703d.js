// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(985526),
    n = e.i(755793),
    r = e.i(352386);
  let i = () => !0;
  e.s([
    "f",
    0,
    ({
      instance: e,
      enabled: a = !0,
      onReconnect: o,
      resyncOnFirstConnect: l = i,
    }) => {
      let s = (0, r.useRef)(o);
      s.current = o;
      let u = (0, r.useRef)(l);
      ((u.current = l),
        (0, r.useEffect)(() => {
          if (!a) return;
          let r = (0, n.B)(e) !== t.m.CONNECTED,
            i = r,
            o = (0, n.k)((n, a) => {
              if (n !== e) return;
              if (a !== t.m.CONNECTED) {
                r = !0;
                return;
              }
              if (!r) return;
              r = !1;
              let o = i;
              ((i = !1), (!o || u.current()) && s.current());
            });
          return () => {
            (0, n.t)(o);
          };
        }, [e, a]));
    },
  ]);
};
