// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(t, e, r) => {
  var n = t.r(505918),
    o = r && !r.nodeType && r,
    i = o && e && !e.nodeType && e,
    a = i && i.exports === o && n.process;
  e.exports = (function () {
    try {
      var t = i && i.require && i.require("util").types;
      if (t) return t;
      return a && a.binding && a.binding("util");
    } catch (t) {}
  })();
};
