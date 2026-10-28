// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(t, e, r) => {
  var n = t.r(820092),
    o = t.r(394272),
    i = Object.prototype.hasOwnProperty;
  e.exports = function (t) {
    if (!n(t)) return o(t);
    var e = [];
    for (var r in Object(t)) i.call(t, r) && "constructor" != r && e.push(r);
    return e;
  };
};
