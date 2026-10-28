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
        name: s,
        request: o,
        retryCount: i = 3,
        retryDelay: a = 150,
        timeout: c,
        type: u,
      },
      l,
    ) {
      let d = (0, r.f)();
      return {
        config: {
          key: e,
          methods: n,
          name: s,
          request: o,
          retryCount: i,
          retryDelay: a,
          timeout: c,
          type: u,
        },
        request: (0, t.f)(o, {
          methods: n,
          retryCount: i,
          retryDelay: a,
          uid: d,
        }),
        value: l,
      };
    },
  ]);
};
