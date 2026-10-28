// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(t, e, r) => {
  e.exports = function (t, e, r) {
    for (var n = -1, o = null == t ? 0 : t.length; ++n < o; )
      if (r(e, t[n])) return !0;
    return !1;
  };
};
