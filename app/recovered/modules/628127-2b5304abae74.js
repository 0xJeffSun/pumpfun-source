// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(78436),
    r = e.i(634103);
  e.s([
    "f",
    0,
    ({ name: e, version: i = 0, fields: s, extra: n }) => {
      let o = Object.keys(s),
        a = Object.fromEntries(
          Object.entries(s).map(([e, t]) => [e, t.default]),
        );
      return (0, t.$)()(
        (0, r.V)(
          (e, t, r) => ({
            ...a,
            ...(n ? n(e, t, r) : {}),
            setField: (t, r) => e({ [t]: s[t].coerce(r) }),
            resetFields: () => e(a),
          }),
          {
            name: e,
            version: i,
            storage: (0, r.j)(() => localStorage),
            partialize: (e) => Object.fromEntries(o.map((t) => [t, e[t]])),
            migrate: (e) => e,
            merge: (e, t) => {
              let r = e ?? {},
                i = Object.fromEntries(o.map((e) => [e, s[e].coerce(r[e])]));
              return { ...t, ...i };
            },
          },
        ),
      );
    },
  ]);
};
