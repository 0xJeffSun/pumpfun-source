// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(t, e, r) => {
  e.exports = function (t) {
    var e = this.__data__,
      r = e.delete(t);
    return ((this.size = e.size), r);
  };
};
