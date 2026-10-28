// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(t, e, r) => {
  var n = t.r(732179),
    o = t.r(279218),
    i = t.r(240046),
    a = t.r(778116),
    u = t.r(933230);
  e.exports = function (t) {
    return "function" == typeof t
      ? t
      : null == t
        ? i
        : "object" == typeof t
          ? a(t)
            ? o(t[0], t[1])
            : n(t)
          : u(t);
  };
};
