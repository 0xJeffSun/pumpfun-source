// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(t, e, r) => {
  var n = t.r(990543),
    o = t.r(764138),
    i = t.r(158774);
  e.exports = function (t, e) {
    var r = this.__data__;
    if (r instanceof n) {
      var a = r.__data__;
      if (!o || a.length < 199)
        return (a.push([t, e]), (this.size = ++r.size), this);
      r = this.__data__ = new i(a);
    }
    return (r.set(t, e), (this.size = r.size), this);
  };
};
