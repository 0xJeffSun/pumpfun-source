// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e, t, r) => {
  (Object.defineProperty(r, "__esModule", { value: !0 }),
    (r.routeErrorSchema = r.errorStatuses = r.emittedCodes = void 0));
  let o = e.r(876543),
    n = e.r(525364);
  ((r.emittedCodes = (e) => e.emits ?? []),
    (r.errorStatuses = (e) => {
      let t = new Set(Object.keys(e.errors ?? {}).map(Number));
      for (let o of (0, r.emittedCodes)(e)) t.add(n.ERROR_CODES[o].status);
      return [...t].sort((e, t) => e - t);
    }),
    (r.routeErrorSchema = (e, t) => {
      let s = e.errors?.[t],
        a = ((e, t) => {
          let s = new Map();
          for (let o of (0, r.emittedCodes)(e)) {
            let e = n.ERROR_CODES[o];
            if (e.status !== t) continue;
            let r = s.get(e.data);
            r ? r.push(o) : s.set(e.data, [o]);
          }
          return [...s].map(([e, [t, ...r]]) => {
            let n;
            return (
              (n = [t, ...r]),
              o.z.object({
                error: o.z.enum(n),
                message: o.z.string(),
                ...(e?.shape ?? {}),
              })
            );
          });
        })(e, t);
      return 0 === a.length
        ? s
        : (void 0 !== s && !0 !== s && a.push(s),
          1 === a.length ? a[0] : o.z.union(a));
    }));
};
