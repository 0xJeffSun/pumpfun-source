// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(t, e, r) => {
  var n = t.r(328042),
    o = t.r(684435),
    i = t.r(933680),
    a = n ? n.toStringTag : void 0;
  e.exports = function (t) {
    return null == t
      ? void 0 === t
        ? "[object Undefined]"
        : "[object Null]"
      : a && a in Object(t)
        ? o(t)
        : i(t);
  };
};
