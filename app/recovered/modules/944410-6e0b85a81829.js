// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(445242),
    n = e.i(96224),
    r = e.i(30181);
  e.s([
    "useClientServerApiClient",
    0,
    () => {
      let e,
        i = (0, t.c)(2),
        o = (0, n.useApiClientsConfig)();
      return (
        i[0] !== o ? ((e = (0, r.d)(o)), (i[0] = o), (i[1] = e)) : (e = i[1]),
        e
      );
    },
    "useClientServerContract",
    0,
    () => {
      let e,
        i = (0, t.c)(2),
        o = (0, n.useApiClientsConfig)();
      return (
        i[0] !== o ? ((e = (0, r.K)(o)), (i[0] = o), (i[1] = e)) : (e = i[1]),
        e
      );
    },
    "useHermesApiClient",
    0,
    () => {
      let e,
        i = (0, t.c)(2),
        o = (0, n.useApiClientsConfig)();
      return (
        i[0] !== o.hermesNotificationsAvailable
          ? ((e = o.hermesNotificationsAvailable ? (0, r.p)() : null),
            (i[0] = o.hermesNotificationsAvailable),
            (i[1] = e))
          : (e = i[1]),
        e
      );
    },
    "useLivechatApiClient",
    0,
    () => {
      let e,
        i = (0, t.c)(2),
        o = (0, n.useApiClientsConfig)();
      return (
        i[0] !== o ? ((e = (0, r.M)(o)), (i[0] = o), (i[1] = e)) : (e = i[1]),
        e
      );
    },
    "useLivestreamApiClient",
    0,
    () => {
      let e,
        i = (0, t.c)(2),
        o = (0, n.useApiClientsConfig)();
      return (
        i[0] !== o ? ((e = (0, r.c)(o)), (i[0] = o), (i[1] = e)) : (e = i[1]),
        e
      );
    },
  ]);
};
