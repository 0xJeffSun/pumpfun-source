// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  e.s([
    "f",
    0,
    ({ origin: e, path: t, query: r = {}, hash: n = {} }) => {
      let i = new URL(t, e.endsWith("/") ? e : `${e}/`);
      for (let [e, t] of Object.entries(r))
        void 0 !== t && i.searchParams.set(e, t);
      let a = Object.entries(n);
      if (a.length > 0) {
        let e = new URLSearchParams();
        for (let [t, r] of a) void 0 !== r && e.append(t, r);
        i.hash = e.toString();
      }
      return i.href;
    },
  ]);
};
