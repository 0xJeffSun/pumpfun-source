// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  let t = (e) =>
      "object" == typeof e &&
      null !== e &&
      (Object.getPrototypeOf(e) === Object.prototype ||
        null === Object.getPrototypeOf(e)),
    r = (e, r) => {
      if (Object.is(e, r)) return !0;
      if (!t(e) || !t(r)) return !1;
      let n = Object.keys(e);
      return (
        n.length === Object.keys(r).length &&
        n.every(
          (n) =>
            n in r &&
            ((e, r) => {
              if (Object.is(e, r)) return !0;
              if (Array.isArray(e) && Array.isArray(r))
                return (
                  e.length === r.length && e.every((e, t) => Object.is(e, r[t]))
                );
              if (!t(e) || !t(r)) return !1;
              let n = Object.keys(e);
              return (
                n.length === Object.keys(r).length &&
                n.every((t) => t in r && Object.is(e[t], r[t]))
              );
            })(e[n], r[n]),
        )
      );
    };
  e.s([
    "h",
    0,
    ({ key: e, isEqual: t = r }) => {
      let n = [],
        l = new Map();
      return {
        stabilize: (r) => {
          let i = r.length !== n.length,
            a = r.map((r, a) => {
              let s = l.get(e(r)),
                o = void 0 !== s && (s === r || t(s, r)) ? s : r;
              return (i || n[a] === o || (i = !0), o);
            });
          return i ? ((n = a), (l = new Map(a.map((t) => [e(t), t]))), a) : n;
        },
      };
    },
    "i",
    0,
    r,
  ]);
};
