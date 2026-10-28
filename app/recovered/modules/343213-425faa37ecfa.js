// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  function t() {
    let e = () => void 0,
      t = () => void 0;
    return {
      promise: new Promise((r, n) => {
        ((e = r), (t = n));
      }),
      resolve: e,
      reject: t,
    };
  }
  e.s(["f", 0, t], 737219);
  let r = new Map();
  e.s(
    [
      "f",
      0,
      function ({ fn: e, id: n, shouldSplitBatch: a, wait: i = 0, sort: s }) {
        let o = async () => {
            let t = l();
            c();
            let r = t.map(({ args: e }) => e);
            0 !== r.length &&
              e(r)
                .then((e) => {
                  s && Array.isArray(e) && e.sort(s);
                  for (let r = 0; r < t.length; r++) {
                    let { resolve: n } = t[r];
                    n?.([e[r], e]);
                  }
                })
                .catch((e) => {
                  for (let r = 0; r < t.length; r++) {
                    let { reject: n } = t[r];
                    n?.(e);
                  }
                });
          },
          c = () => r.delete(n),
          l = () => r.get(n) || [],
          u = (e) => r.set(n, [...l(), e]);
        return {
          flush: c,
          async schedule(e) {
            let { promise: r, resolve: n, reject: s } = t();
            return (
              (a?.([...l().map(({ args: e }) => e), e]) && o(), l().length > 0)
                ? u({ args: e, resolve: n, reject: s })
                : (u({ args: e, resolve: n, reject: s }), setTimeout(o, i)),
              r
            );
          },
        };
      },
    ],
    343213,
  );
};
