// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(t, e, r) => {
  e.exports = function (t) {
    var e = this.has(t) && delete this.__data__[t];
    return ((this.size -= !!e), e);
  };
};
