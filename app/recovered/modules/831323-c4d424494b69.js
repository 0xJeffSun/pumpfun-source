// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(54913),
    n = e.i(709549),
    r = e.i(526658),
    i = e.i(895453),
    o = e.i(970961);
  function s(e, t, n) {
    let r = { ...e };
    for (let [e, { required: o, type: s }] of Object.entries(t))
      ("string" !== s || u(r[e]) || (r[e] = String(r[e])),
        o &&
          u(r[e]) &&
          i.s.warn(
            `The property ${e} of ${n} is required; context will not be sent to the intake.`,
          ));
    return r;
  }
  function u(e) {
    return null == e || "" === e;
  }
  e.s(
    [
      "f",
      0,
      function (e = "", { propertiesConfig: u = {} } = {}) {
        let a = {},
          l = new r.S(),
          c = {
            getContext: () => (0, t.F)(a),
            setContext: (t) => {
              let r;
              (((r = "object" === (0, o.f)(t)) ||
                i.s.error("Unsupported context:", t),
              r)
                ? (a = (0, n.f)(s(t, u, e)))
                : c.clearContext(),
                l.notify());
            },
            setContextProperty: (t, r) => {
              ((a = (0, n.f)(s({ ...a, [t]: r }, u, e))), l.notify());
            },
            removeContextProperty: (t) => {
              (delete a[t], s(a, u, e), l.notify());
            },
            clearContext: () => {
              ((a = {}), l.notify());
            },
            changeObservable: l,
          };
        return c;
      },
    ],
    831323,
  );
};
