// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(f) => {
  f.s([
    "f",
    0,
    function (f) {
      let e = { formatters: void 0, fees: void 0, serializers: void 0, ...f };
      return Object.assign(e, {
        extend: (function f(e) {
          return (b) => {
            let c = "function" == typeof b ? b(e) : b,
              a = { ...e, ...c };
            return Object.assign(a, { extend: f(a) });
          };
        })(e),
      });
    },
  ]);
};
