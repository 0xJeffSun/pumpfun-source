// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  function t() {
    let e = () => void 0,
      t = () => void 0;
    return {
      promise: new Promise((r, s) => {
        ((e = r), (t = s));
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
      function ({ fn: e, id: s, shouldSplitBatch: n, wait: o = 0, sort: i }) {
        let a = async () => {
            let t = u();
            c();
            let r = t.map(({ args: e }) => e);
            0 !== r.length &&
              e(r)
                .then((e) => {
                  i && Array.isArray(e) && e.sort(i);
                  for (let r = 0; r < t.length; r++) {
                    let { resolve: s } = t[r];
                    s?.([e[r], e]);
                  }
                })
                .catch((e) => {
                  for (let r = 0; r < t.length; r++) {
                    let { reject: s } = t[r];
                    s?.(e);
                  }
                });
          },
          c = () => r.delete(s),
          u = () => r.get(s) || [],
          l = (e) => r.set(s, [...u(), e]);
        return {
          flush: c,
          async schedule(e) {
            let { promise: r, resolve: s, reject: i } = t();
            return (
              (n?.([...u().map(({ args: e }) => e), e]) && a(), u().length > 0)
                ? l({ args: e, resolve: s, reject: i })
                : (l({ args: e, resolve: s, reject: i }), setTimeout(a, o)),
              r
            );
          },
        };
      },
    ],
    343213,
  );
};
