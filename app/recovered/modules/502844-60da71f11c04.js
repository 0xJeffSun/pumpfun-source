// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(t, e, r) => {
  var n = t.r(416907),
    o = t.r(323073),
    i = t.r(394022),
    a = Object.prototype,
    u = Function.prototype.toString,
    c = a.hasOwnProperty,
    l = u.call(Object);
  e.exports = function (t) {
    if (!i(t) || "[object Object]" != n(t)) return !1;
    var e = o(t);
    if (null === e) return !0;
    var r = c.call(e, "constructor") && e.constructor;
    return "function" == typeof r && r instanceof r && u.call(r) == l;
  };
};
