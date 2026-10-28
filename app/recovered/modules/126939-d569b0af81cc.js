// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(47509),
    n = e.i(748877),
    r = e.i(70296),
    i = e.i(831323);
  function o() {
    return (0, i.f)("account", {
      propertiesConfig: {
        id: { type: "string", required: !0 },
        name: { type: "string" },
      },
    });
  }
  function s() {
    return (0, i.f)("global context");
  }
  function u() {
    return (0, i.f)("user", {
      propertiesConfig: {
        id: { type: "string" },
        name: { type: "string" },
        email: { type: "string" },
      },
    });
  }
  (e.s(
    [
      "M",
      0,
      o,
      "w",
      0,
      function (e, i, s) {
        let u = o();
        return (
          i.storeContextsAcrossPages && (0, t.f)(i, u, s, 4),
          e.register(0, () => {
            let e = u.getContext();
            return (0, r.n)(e) || !e.id ? n.Y : { account: e };
          }),
          u
        );
      },
    ],
    126939,
  ),
    e.s(
      [
        "c",
        0,
        s,
        "x",
        0,
        function (e, n, r, i) {
          let o = s();
          return (
            n.storeContextsAcrossPages && (0, t.f)(n, o, r, 2),
            e.register(0, () => {
              let e = o.getContext();
              return i ? { context: e } : e;
            }),
            o
          );
        },
      ],
      262876,
    ),
    e.s(
      [
        "P",
        0,
        u,
        "x",
        0,
        function (e, i, o, s) {
          let a = u();
          return (
            i.storeContextsAcrossPages && (0, t.f)(i, a, s, 1),
            e.register(0, ({ eventType: e, startTime: t }) => {
              let s = a.getContext(),
                u = o.findTrackedSession(t);
              return (u &&
                u.anonymousId &&
                !s.anonymous_id &&
                i.trackAnonymousUser &&
                (s.anonymous_id = u.anonymousId),
              (0, r.n)(s))
                ? n.Y
                : { type: e, usr: s };
            }),
            e.register(1, ({ startTime: e }) => {
              var t;
              return {
                anonymous_id:
                  null == (t = o.findTrackedSession(e))
                    ? void 0
                    : t.anonymousId,
              };
            }),
            a
          );
        },
      ],
      683904,
    ));
};
