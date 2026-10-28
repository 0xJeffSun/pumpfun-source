// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(631777);
  e.s([
    "f",
    0,
    function (
      e,
      { delay: r = 100, retryCount: o = 2, shouldRetry: a = () => !0 } = {},
    ) {
      return new Promise((s, n) => {
        let i = async ({ count: c = 0 } = {}) => {
          let l = async ({ error: e }) => {
            let o = "function" == typeof r ? r({ count: c, error: e }) : r;
            (o && (await (0, t.f)(o)), i({ count: c + 1 }));
          };
          try {
            let t = await e();
            s(t);
          } catch (e) {
            if (c < o && (await a({ count: c, error: e })))
              return l({ error: e });
            n(e);
          }
        };
        i();
      });
    },
  ]);
};
