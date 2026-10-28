// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(t, e, r) => {
  var n = t.r(778116),
    o = t.r(692558),
    i = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,
    a = /^\w*$/;
  e.exports = function (t, e) {
    if (n(t)) return !1;
    var r = typeof t;
    return (
      !!(
        "number" == r ||
        "symbol" == r ||
        "boolean" == r ||
        null == t ||
        o(t)
      ) ||
      a.test(t) ||
      !i.test(t) ||
      (null != e && t in Object(e))
    );
  };
};
