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
      function ({ fn: e, id: n, shouldSplitBatch: o, wait: s = 0, sort: a }) {
        let i = async () => {
            let t = u();
            c();
            let r = t.map(({ args: e }) => e);
            0 !== r.length &&
              e(r)
                .then((e) => {
                  a && Array.isArray(e) && e.sort(a);
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
          u = () => r.get(n) || [],
          d = (e) => r.set(n, [...u(), e]);
        return {
          flush: c,
          async schedule(e) {
            let { promise: r, resolve: n, reject: a } = t();
            return (
              (o?.([...u().map(({ args: e }) => e), e]) && i(), u().length > 0)
                ? d({ args: e, resolve: n, reject: a })
                : (d({ args: e, resolve: n, reject: a }), setTimeout(i, s)),
              r
            );
          },
        };
      },
    ],
    343213,
  );
};
