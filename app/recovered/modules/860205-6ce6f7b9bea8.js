// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(t, e, r) => {
  var n = /\s/;
  e.exports = function (t) {
    for (var e = t.length; e-- && n.test(t.charAt(e)); );
    return e;
  };
};
