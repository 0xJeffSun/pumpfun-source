// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(t, e, r) => {
  var n = t.r(641664);
  e.exports = function (t, e) {
    var r = this.__data__,
      o = n(r, t);
    return (o < 0 ? (++this.size, r.push([t, e])) : (r[o][1] = e), this);
  };
};
