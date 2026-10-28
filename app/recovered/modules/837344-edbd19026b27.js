// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(t, e, r) => {
  var n = t.r(593613),
    o =
      /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g,
    i = /\\(\\)?/g;
  e.exports = n(function (t) {
    var e = [];
    return (
      46 === t.charCodeAt(0) && e.push(""),
      t.replace(o, function (t, r, n, o) {
        e.push(n ? o.replace(i, "$1") : r || t);
      }),
      e
    );
  });
};
