// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(t, e, r) => {
  var n = t.r(977902);
  e.exports = function (t, e) {
    var r = this.__data__;
    return (
      (this.size += +!this.has(t)),
      (r[t] = n && void 0 === e ? "__lodash_hash_undefined__" : e),
      this
    );
  };
};
