// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(t, r, e) => {
  r.exports = function (t) {
    return (
      t &&
      "object" == typeof t &&
      "function" == typeof t.copy &&
      "function" == typeof t.fill &&
      "function" == typeof t.readUInt8
    );
  };
};
