// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(t, e, r) => {
  e.exports = function (t, e) {
    return function (r) {
      return null != r && r[t] === e && (void 0 !== e || t in Object(r));
    };
  };
};
