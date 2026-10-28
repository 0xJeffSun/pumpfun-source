// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  e.s([
    "f",
    0,
    function (e) {
      let t = { formatters: void 0, fees: void 0, serializers: void 0, ...e };
      return Object.assign(t, {
        extend: (function e(t) {
          return (s) => {
            let i = "function" == typeof s ? s(t) : s,
              r = { ...t, ...i };
            return Object.assign(r, { extend: e(r) });
          };
        })(t),
      });
    },
  ]);
};
