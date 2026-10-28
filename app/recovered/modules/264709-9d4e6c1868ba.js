// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e, r, t) => {
  let s = e.r(401542),
    i = e.r(247071);
  r.exports = (e, r, t) => {
    let n = null,
      o = null,
      a = null;
    try {
      a = new i(r, t);
    } catch (e) {
      return null;
    }
    return (
      e.forEach((e) => {
        a.test(e) && (!n || -1 === o.compare(e)) && (o = new s((n = e), t));
      }),
      n
    );
  };
};
