// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(631777);
  e.s([
    "f",
    0,
    function (
      e,
      { delay: r = 100, retryCount: n = 2, shouldRetry: a = () => !0 } = {},
    ) {
      return new Promise((i, s) => {
        let o = async ({ count: c = 0 } = {}) => {
          let l = async ({ error: e }) => {
            let n = "function" == typeof r ? r({ count: c, error: e }) : r;
            (n && (await (0, t.f)(n)), o({ count: c + 1 }));
          };
          try {
            let t = await e();
            i(t);
          } catch (e) {
            if (c < n && (await a({ count: c, error: e })))
              return l({ error: e });
            s(e);
          }
        };
        o();
      });
    },
  ]);
};
