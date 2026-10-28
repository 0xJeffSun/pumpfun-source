// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(t, e, r) => {
  var n = t.r(328042),
    o = t.r(239145),
    i = t.r(778116),
    a = t.r(692558),
    u = n ? n.prototype : void 0,
    c = u ? u.toString : void 0;
  e.exports = function t(e) {
    if ("string" == typeof e) return e;
    if (i(e)) return o(e, t) + "";
    if (a(e)) return c ? c.call(e) : "";
    var r = e + "";
    return "0" == r && 1 / e == -1 / 0 ? "-0" : r;
  };
};
