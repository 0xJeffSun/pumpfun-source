// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e, t, n) => {
  (Object.defineProperty(n, "__esModule", { value: !0 }),
    Object.defineProperty(n, "hasInterceptionRouteInCurrentTree", {
      enumerable: !0,
      get: function () {
        return function e([t, n]) {
          if (
            (Array.isArray(t) &&
              ("di(..)(..)" === t[2] ||
                "ci(..)(..)" === t[2] ||
                "di(.)" === t[2] ||
                "ci(.)" === t[2] ||
                "di(..)" === t[2] ||
                "ci(..)" === t[2] ||
                "di(...)" === t[2] ||
                "ci(...)" === t[2])) ||
            ("string" == typeof t && (0, r.isInterceptionRouteAppPath)(t))
          )
            return !0;
          if (n) {
            for (let t in n) if (e(n[t])) return !0;
          }
          return !1;
        };
      },
    }));
  let r = e.r(800524);
  ("function" == typeof n.default ||
    ("object" == typeof n.default && null !== n.default)) &&
    void 0 === n.default.__esModule &&
    (Object.defineProperty(n.default, "__esModule", { value: !0 }),
    Object.assign(n.default, n),
    (t.exports = n.default));
};
