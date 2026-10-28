// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(t, e, r) => {
  e.exports = function (t) {
    return (
      "number" == typeof t && t > -1 && t % 1 == 0 && t <= 0x1fffffffffffff
    );
  };
};
