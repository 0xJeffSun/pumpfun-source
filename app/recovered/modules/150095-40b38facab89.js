// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(t, e, r) => {
  var n = t.r(977902),
    o = Object.prototype.hasOwnProperty;
  e.exports = function (t) {
    var e = this.__data__;
    if (n) {
      var r = e[t];
      return "__lodash_hash_undefined__" === r ? void 0 : r;
    }
    return o.call(e, t) ? e[t] : void 0;
  };
};
