// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e, r, t) => {
  let s = e.r(401542);
  r.exports = (e, r, t = !1) => {
    if (e instanceof s) return e;
    try {
      return new s(e, r);
    } catch (e) {
      if (!t) return null;
      throw e;
    }
  };
};
