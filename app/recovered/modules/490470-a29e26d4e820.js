// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(t, e, r) => {
  var n,
    o = t.r(118309),
    i = (n = /[^.]+$/.exec((o && o.keys && o.keys.IE_PROTO) || ""))
      ? "Symbol(src)_1." + n
      : "";
  e.exports = function (t) {
    return !!i && i in t;
  };
};
