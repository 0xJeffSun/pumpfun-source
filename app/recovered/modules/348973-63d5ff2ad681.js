// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e, r, t) => {
  let s = e.r(489386),
    i = e.r(790329),
    n = e.r(573159),
    o = e.r(647960),
    a = e.r(934558),
    l = e.r(915087);
  r.exports = (e, r, t, p) => {
    switch (r) {
      case "===":
        return (
          "object" == typeof e && (e = e.version),
          "object" == typeof t && (t = t.version),
          e === t
        );
      case "!==":
        return (
          "object" == typeof e && (e = e.version),
          "object" == typeof t && (t = t.version),
          e !== t
        );
      case "":
      case "=":
      case "==":
        return s(e, t, p);
      case "!=":
        return i(e, t, p);
      case ">":
        return n(e, t, p);
      case ">=":
        return o(e, t, p);
      case "<":
        return a(e, t, p);
      case "<=":
        return l(e, t, p);
      default:
        throw TypeError(`Invalid operator: ${r}`);
    }
  };
};
