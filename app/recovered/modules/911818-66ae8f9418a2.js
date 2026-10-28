// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(t, e, r) => {
  var n = Date.now;
  e.exports = function (t) {
    var e = 0,
      r = 0;
    return function () {
      var o = n(),
        i = 16 - (o - r);
      if (((r = o), i > 0)) {
        if (++e >= 800) return arguments[0];
      } else e = 0;
      return t.apply(void 0, arguments);
    };
  };
};
