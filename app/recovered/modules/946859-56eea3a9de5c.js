// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e, t, n) => {
  Object.defineProperty(n, "__esModule", { value: !0 });
  var r = {
    createCacheKey: function () {
      return l;
    },
    splitPathnameIntoParts: function () {
      return u;
    },
  };
  for (var a in r) Object.defineProperty(n, a, { enumerable: !0, get: r[a] });
  function l(e, t) {
    let n = new URL(e);
    return { pathname: n.pathname, search: n.search, nextUrl: t };
  }
  function u(e) {
    let t = [],
      n = 0;
    for (let r = 0; r < e.length; r++)
      47 === e.charCodeAt(r) && (r > n && t.push(e.slice(n, r)), (n = r + 1));
    return (n < e.length && t.push(e.slice(n)), t);
  }
  ("function" == typeof n.default ||
    ("object" == typeof n.default && null !== n.default)) &&
    void 0 === n.default.__esModule &&
    (Object.defineProperty(n.default, "__esModule", { value: !0 }),
    Object.assign(n.default, n),
    (t.exports = n.default));
};
