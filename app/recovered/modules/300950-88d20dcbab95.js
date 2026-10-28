// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(631777);
  e.s([
    "f",
    0,
    function (
      e,
      { delay: r = 100, retryCount: s = 2, shouldRetry: n = () => !0 } = {},
    ) {
      return new Promise((o, i) => {
        let a = async ({ count: c = 0 } = {}) => {
          let u = async ({ error: e }) => {
            let s = "function" == typeof r ? r({ count: c, error: e }) : r;
            (s && (await (0, t.f)(s)), a({ count: c + 1 }));
          };
          try {
            let t = await e();
            o(t);
          } catch (e) {
            if (c < s && (await n({ count: c, error: e })))
              return u({ error: e });
            i(e);
          }
        };
        a();
      });
    },
  ]);
};
