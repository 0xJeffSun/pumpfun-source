// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e, r, t) => {
  let s = e.r(401542),
    i = e.r(580740),
    { ANY: n } = i,
    o = e.r(247071),
    a = e.r(38104),
    l = e.r(573159),
    p = e.r(934558),
    c = e.r(915087),
    h = e.r(647960);
  r.exports = (e, r, t, u) => {
    let E, d, f, m, I;
    switch (((e = new s(e, u)), (r = new o(r, u)), t)) {
      case ">":
        ((E = l), (d = c), (f = p), (m = ">"), (I = ">="));
        break;
      case "<":
        ((E = p), (d = h), (f = l), (m = "<"), (I = "<="));
        break;
      default:
        throw TypeError('Must provide a hilo val of "<" or ">"');
    }
    if (a(e, r, u)) return !1;
    for (let t = 0; t < r.set.length; ++t) {
      let s = r.set[t],
        o = null,
        a = null;
      if (
        (s.forEach((e) => {
          (e.semver === n && (e = new i(">=0.0.0")),
            (o = o || e),
            (a = a || e),
            E(e.semver, o.semver, u)
              ? (o = e)
              : f(e.semver, a.semver, u) && (a = e));
        }),
        o.operator === m ||
          o.operator === I ||
          ((!a.operator || a.operator === m) && d(e, a.semver)) ||
          (a.operator === I && f(e, a.semver)))
      )
        return !1;
    }
    return !0;
  };
};
