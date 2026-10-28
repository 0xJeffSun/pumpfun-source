// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(t, e, i) => {
  e.exports = function () {
    return (
      "function" == typeof Promise &&
      Promise.prototype &&
      Promise.prototype.then
    );
  };
};
