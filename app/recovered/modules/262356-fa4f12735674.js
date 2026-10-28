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
        name: a,
        request: i,
        retryCount: s = 3,
        retryDelay: o = 150,
        timeout: c,
        type: l,
      },
      u,
    ) {
      let f = (0, r.f)();
      return {
        config: {
          key: e,
          methods: n,
          name: a,
          request: i,
          retryCount: s,
          retryDelay: o,
          timeout: c,
          type: l,
        },
        request: (0, t.f)(i, {
          methods: n,
          retryCount: s,
          retryDelay: o,
          uid: f,
        }),
        value: u,
      };
    },
  ]);
};
