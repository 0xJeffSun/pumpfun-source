// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e, t, r) => {
  t.exports = function e(t, r) {
    if (t && r) return e(t)(r);
    if ("function" != typeof t) throw TypeError("need wrapper function");
    return (
      Object.keys(t).forEach(function (e) {
        n[e] = t[e];
      }),
      n
    );
    function n() {
      for (var e = Array(arguments.length), r = 0; r < e.length; r++)
        e[r] = arguments[r];
      var n = t.apply(this, e),
        i = e[e.length - 1];
      return (
        "function" == typeof n &&
          n !== i &&
          Object.keys(i).forEach(function (e) {
            n[e] = i[e];
          }),
        n
      );
    }
  };
};
