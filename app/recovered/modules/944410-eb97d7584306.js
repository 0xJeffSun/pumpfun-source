// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(445242),
    i = e.i(96224),
    r = e.i(30181);
  e.s([
    "useClientServerApiClient",
    0,
    () => {
      let e,
        n = (0, t.c)(2),
        a = (0, i.useApiClientsConfig)();
      return (
        n[0] !== a ? ((e = (0, r.d)(a)), (n[0] = a), (n[1] = e)) : (e = n[1]),
        e
      );
    },
    "useClientServerContract",
    0,
    () => {
      let e,
        n = (0, t.c)(2),
        a = (0, i.useApiClientsConfig)();
      return (
        n[0] !== a ? ((e = (0, r.K)(a)), (n[0] = a), (n[1] = e)) : (e = n[1]),
        e
      );
    },
    "useHermesApiClient",
    0,
    () => {
      let e,
        n = (0, t.c)(2),
        a = (0, i.useApiClientsConfig)();
      return (
        n[0] !== a.hermesNotificationsAvailable
          ? ((e = a.hermesNotificationsAvailable ? (0, r.p)() : null),
            (n[0] = a.hermesNotificationsAvailable),
            (n[1] = e))
          : (e = n[1]),
        e
      );
    },
    "useLivechatApiClient",
    0,
    () => {
      let e,
        n = (0, t.c)(2),
        a = (0, i.useApiClientsConfig)();
      return (
        n[0] !== a ? ((e = (0, r.M)(a)), (n[0] = a), (n[1] = e)) : (e = n[1]),
        e
      );
    },
    "useLivestreamApiClient",
    0,
    () => {
      let e,
        n = (0, t.c)(2),
        a = (0, i.useApiClientsConfig)();
      return (
        n[0] !== a ? ((e = (0, r.c)(a)), (n[0] = a), (n[1] = e)) : (e = n[1]),
        e
      );
    },
  ]);
};
