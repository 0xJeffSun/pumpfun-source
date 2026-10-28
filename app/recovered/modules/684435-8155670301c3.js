// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(t, e, r) => {
  var n = t.r(328042),
    o = Object.prototype,
    i = o.hasOwnProperty,
    a = o.toString,
    u = n ? n.toStringTag : void 0;
  e.exports = function (t) {
    var e = i.call(t, u),
      r = t[u];
    try {
      t[u] = void 0;
      var n = !0;
    } catch (t) {}
    var o = a.call(t);
    return (n && (e ? (t[u] = r) : delete t[u]), o);
  };
};
