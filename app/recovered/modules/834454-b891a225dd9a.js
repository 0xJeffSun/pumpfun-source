// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e, t, n) => {
  (e.i(149502),
    Object.defineProperty(n, "__esModule", { value: !0 }),
    Object.defineProperty(n, "normalizePathTrailingSlash", {
      enumerable: !0,
      get: function () {
        return l;
      },
    }));
  let r = e.r(190367),
    a = e.r(556494),
    l = (e) => {
      if (47 !== e.charCodeAt(0)) return e;
      let { pathname: t, query: n, hash: l } = (0, a.parsePath)(e);
      return `${(0, r.removeTrailingSlash)(t)}${n}${l}`;
    };
  ("function" == typeof n.default ||
    ("object" == typeof n.default && null !== n.default)) &&
    void 0 === n.default.__esModule &&
    (Object.defineProperty(n.default, "__esModule", { value: !0 }),
    Object.assign(n.default, n),
    (t.exports = n.default));
};
