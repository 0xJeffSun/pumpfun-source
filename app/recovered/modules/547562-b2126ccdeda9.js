// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(445242),
    r = e.i(352386),
    i = e.i(671027),
    s = e.i(272700);
  let n = new WeakMap(),
    o = (e) => {
      let t,
        r = n.get(e);
      if (r) return r;
      let s = Symbol("unset"),
        o = {
          subscribe: e.adapter.subscribe,
          getSnapshot: () => {
            (0, i.f)(e);
            let r = e.adapter.read();
            return Object.is(r, s) ? t : ((s = r), (t = e.coerce(r)));
          },
          getServerSnapshot: () => e.default,
        };
      return (n.set(e, o), o);
    },
    a = (e) => s.k[e],
    l = (e) => o(a(e)).getSnapshot(),
    c = (e, t) => {
      let r = a(e);
      r.adapter.write(r.coerce(t));
    },
    d = (e, i) => {
      let s,
        n,
        l = (0, t.c)(5);
      l[0] !== e ? ((s = o(a(e))), (l[0] = e), (l[1] = s)) : (s = l[1]);
      let c = s,
        d = i?.serverValue;
      return (
        l[2] !== c.getServerSnapshot || l[3] !== d
          ? ((n = void 0 === d ? c.getServerSnapshot : () => d),
            (l[2] = c.getServerSnapshot),
            (l[3] = d),
            (l[4] = n))
          : (n = l[4]),
        (0, r.useSyncExternalStore)(c.subscribe, c.getSnapshot, n)
      );
    },
    u = (e) => {
      let r,
        i = (0, t.c)(2);
      return (
        i[0] !== e
          ? ((r = (t) => {
              let r = l(e);
              c(e, "function" == typeof t ? t(r) : t);
            }),
            (i[0] = e),
            (i[1] = r))
          : (r = i[1]),
        r
      );
    };
  e.s([
    "L",
    0,
    l,
    "Z",
    0,
    u,
    "l",
    0,
    (e, r) => {
      let i,
        s = (0, t.c)(3),
        n = d(e, r),
        o = u(e);
      return (
        s[0] !== n || s[1] !== o
          ? ((i = [n, o]), (s[0] = n), (s[1] = o), (s[2] = i))
          : (i = s[2]),
        i
      );
    },
    "o",
    0,
    d,
    "i",
    0,
    c,
  ]);
};
