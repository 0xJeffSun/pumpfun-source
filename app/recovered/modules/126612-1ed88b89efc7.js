// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e, t, r) => {
  "use strict";
  var a = function (e) {
      var t, r, a;
      return (
        !!(t = e) &&
        "object" == typeof t &&
        ((r = e),
        "[object RegExp]" !== (a = Object.prototype.toString.call(r)) &&
          "[object Date]" !== a &&
          r.$$typeof !== n)
      );
    },
    n =
      "function" == typeof Symbol && Symbol.for
        ? Symbol.for("react.element")
        : 60103;
  function o(e, t) {
    return !1 !== t.clone && t.isMergeableObject(e)
      ? u(Array.isArray(e) ? [] : {}, e, t)
      : e;
  }
  function i(e, t, r) {
    return e.concat(t).map(function (e) {
      return o(e, r);
    });
  }
  function l(e) {
    return Object.keys(e).concat(
      Object.getOwnPropertySymbols
        ? Object.getOwnPropertySymbols(e).filter(function (t) {
            return Object.propertyIsEnumerable.call(e, t);
          })
        : [],
    );
  }
  function s(e, t) {
    try {
      return t in e;
    } catch (e) {
      return !1;
    }
  }
  function u(e, t, r) {
    (((r = r || {}).arrayMerge = r.arrayMerge || i),
      (r.isMergeableObject = r.isMergeableObject || a),
      (r.cloneUnlessOtherwiseSpecified = o));
    var n,
      c,
      p = Array.isArray(t);
    return p !== Array.isArray(e)
      ? o(t, r)
      : p
        ? r.arrayMerge(e, t, r)
        : ((c = {}),
          (n = r).isMergeableObject(e) &&
            l(e).forEach(function (t) {
              c[t] = o(e[t], n);
            }),
          l(t).forEach(function (r) {
            (s(e, r) &&
              !(
                Object.hasOwnProperty.call(e, r) &&
                Object.propertyIsEnumerable.call(e, r)
              )) ||
              (s(e, r) && n.isMergeableObject(t[r])
                ? (c[r] = (function (e, t) {
                    if (!t.customMerge) return u;
                    var r = t.customMerge(e);
                    return "function" == typeof r ? r : u;
                  })(r, n)(e[r], t[r], n))
                : (c[r] = o(t[r], n)));
          }),
          c);
  }
  ((u.all = function (e, t) {
    if (!Array.isArray(e)) throw Error("first argument should be an array");
    return e.reduce(function (e, r) {
      return u(e, r, t);
    }, {});
  }),
    (t.exports = u));
};
