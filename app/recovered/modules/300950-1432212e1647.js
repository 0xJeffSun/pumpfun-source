// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(631777);
  e.s([
    "f",
    0,
    function (
      e,
      { delay: r = 100, retryCount: n = 2, shouldRetry: s = () => !0 } = {},
    ) {
      return new Promise((o, i) => {
        let a = async ({ count: c = 0 } = {}) => {
          let u = async ({ error: e }) => {
            let n = "function" == typeof r ? r({ count: c, error: e }) : r;
            (n && (await (0, t.f)(n)), a({ count: c + 1 }));
          };
          try {
            let t = await e();
            o(t);
          } catch (e) {
            if (c < n && (await s({ count: c, error: e })))
              return u({ error: e });
            i(e);
          }
        };
        a();
      });
    },
  ]);
};
