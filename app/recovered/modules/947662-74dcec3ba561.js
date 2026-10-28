// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e, r, t) => {
  let s = e.r(401542);
  r.exports = (e, r, t, i, n) => {
    "string" == typeof t && ((n = i), (i = t), (t = void 0));
    try {
      return new s(e instanceof s ? e.version : e, t).inc(r, i, n).version;
    } catch (e) {
      return null;
    }
  };
};
