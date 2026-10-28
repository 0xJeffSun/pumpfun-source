// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(t, e, r) => {
  var n = Function.prototype.toString;
  e.exports = function (t) {
    if (null != t) {
      try {
        return n.call(t);
      } catch (t) {}
      try {
        return t + "";
      } catch (t) {}
    }
    return "";
  };
};
