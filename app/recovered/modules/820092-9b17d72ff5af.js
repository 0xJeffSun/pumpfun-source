// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(t, e, r) => {
  var n = Object.prototype;
  e.exports = function (t) {
    var e = t && t.constructor;
    return t === (("function" == typeof e && e.prototype) || n);
  };
};
