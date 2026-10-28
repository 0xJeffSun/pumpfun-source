// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(323886),
    r = e.i(841087);
  e.s([
    "f",
    0,
    function (
      {
        key: e,
        methods: o,
        name: a,
        request: s,
        retryCount: n = 3,
        retryDelay: i = 150,
        timeout: c,
        type: l,
      },
      u,
    ) {
      let d = (0, r.f)();
      return {
        config: {
          key: e,
          methods: o,
          name: a,
          request: s,
          retryCount: n,
          retryDelay: i,
          timeout: c,
          type: l,
        },
        request: (0, t.f)(s, {
          methods: o,
          retryCount: n,
          retryDelay: i,
          uid: d,
        }),
        value: u,
      };
    },
  ]);
};
