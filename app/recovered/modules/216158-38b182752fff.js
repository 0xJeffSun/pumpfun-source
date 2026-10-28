// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(t, e, r) => {
  e.exports = function (t, e) {
    return function (r) {
      return t(e(r));
    };
  };
};
