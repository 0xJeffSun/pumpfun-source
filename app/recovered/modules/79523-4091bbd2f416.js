// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(359162),
    r = e.i(194672),
    o = e.i(895453);
  (e.s(
    [
      "A",
      0,
      function (e, r, n) {
        let i = e[r];
        (i &&
          !i.q &&
          i.version &&
          o.s.warn(
            "SDK is loaded more than once. This is unsupported and might have unexpected behavior.",
          ),
          (e[r] = n),
          i &&
            i.q &&
            i.q.forEach((e) =>
              (0, t.f)(e, "onReady callback threw an error:")(),
            ));
      },
      "R",
      0,
      function (e) {
        let t = {
          version: "6.22.0",
          onReady(e) {
            e();
          },
          ...e,
        };
        return (
          Object.defineProperty(t, "_setDebug", {
            get: () => r.d,
            enumerable: !1,
          }),
          t
        );
      },
    ],
    79523,
  ),
    e.s(
      [
        "I",
        0,
        {
          getContext: "getContext",
          setContext: "setContext",
          setContextProperty: "setContextProperty",
          removeContextProperty: "removeContextProperty",
          clearContext: "clearContext",
        },
        "W",
        0,
        {
          userContext: "userContext",
          globalContext: "globalContext",
          accountContext: "accountContext",
        },
      ],
      161626,
    ));
};
