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
      function ({ fn: e, id: n, shouldSplitBatch: s, wait: o = 0, sort: i }) {
        let a = async () => {
            let t = u();
            c();
            let r = t.map(({ args: e }) => e);
            0 !== r.length &&
              e(r)
                .then((e) => {
                  i && Array.isArray(e) && e.sort(i);
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
          l = (e) => r.set(n, [...u(), e]);
        return {
          flush: c,
          async schedule(e) {
            let { promise: r, resolve: n, reject: i } = t();
            return (
              (s?.([...u().map(({ args: e }) => e), e]) && a(), u().length > 0)
                ? l({ args: e, resolve: n, reject: i })
                : (l({ args: e, resolve: n, reject: i }), setTimeout(a, o)),
              r
            );
          },
        };
      },
    ],
    343213,
  );
};
