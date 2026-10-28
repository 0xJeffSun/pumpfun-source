// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  function t() {
    let e = () => void 0,
      t = () => void 0;
    return {
      promise: new Promise((n, r) => {
        ((e = n), (t = r));
      }),
      resolve: e,
      reject: t,
    };
  }
  e.s(["f", 0, t], 966348);
  let n = new Map();
  e.s(
    [
      "f",
      0,
      function ({ fn: e, id: r, shouldSplitBatch: i, wait: a = 0, sort: s }) {
        let o = async () => {
            let t = c();
            f();
            let n = t.map(({ args: e }) => e);
            0 !== n.length &&
              e(n)
                .then((e) => {
                  s && Array.isArray(e) && e.sort(s);
                  for (let n = 0; n < t.length; n++) {
                    let { resolve: r } = t[n];
                    r?.([e[n], e]);
                  }
                })
                .catch((e) => {
                  for (let n = 0; n < t.length; n++) {
                    let { reject: r } = t[n];
                    r?.(e);
                  }
                });
          },
          f = () => n.delete(r),
          c = () => n.get(r) || [],
          u = (e) => n.set(r, [...c(), e]);
        return {
          flush: f,
          async schedule(e) {
            let { promise: n, resolve: r, reject: s } = t();
            return (
              (i?.([...c().map(({ args: e }) => e), e]) && o(), c().length > 0)
                ? u({ args: e, resolve: r, reject: s })
                : (u({ args: e, resolve: r, reject: s }), setTimeout(o, a)),
              n
            );
          },
        };
      },
    ],
    20655,
  );
};
