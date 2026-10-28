// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(t, e, r) => {
  var n = t.r(641664),
    o = Array.prototype.splice;
  e.exports = function (t) {
    var e = this.__data__,
      r = n(e, t);
    return (
      !(r < 0) &&
      (r == e.length - 1 ? e.pop() : o.call(e, r, 1), --this.size, !0)
    );
  };
};
