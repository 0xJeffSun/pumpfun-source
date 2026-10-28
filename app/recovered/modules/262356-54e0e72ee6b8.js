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
        methods: n,
        name: o,
        request: s,
        retryCount: a = 3,
        retryDelay: i = 150,
        timeout: c,
        type: u,
      },
      d,
    ) {
      let l = (0, r.f)();
      return {
        config: {
          key: e,
          methods: n,
          name: o,
          request: s,
          retryCount: a,
          retryDelay: i,
          timeout: c,
          type: u,
        },
        request: (0, t.f)(s, {
          methods: n,
          retryCount: a,
          retryDelay: i,
          uid: l,
        }),
        value: d,
      };
    },
  ]);
};
