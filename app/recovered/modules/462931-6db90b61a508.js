// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(t, e, r) => {
  var n = t.r(416907),
    o = t.r(878524);
  e.exports = function (t) {
    if (!o(t)) return !1;
    var e = n(t);
    return (
      "[object Function]" == e ||
      "[object GeneratorFunction]" == e ||
      "[object AsyncFunction]" == e ||
      "[object Proxy]" == e
    );
  };
};
