// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e, t, n) => {
  (Object.defineProperty(n, "__esModule", { value: !0 }),
    Object.defineProperty(n, "assignLocation", {
      enumerable: !0,
      get: function () {
        return a;
      },
    }));
  let r = e.r(814621);
  function a(e, t) {
    if (e.startsWith(".")) {
      let n = t.origin + t.pathname;
      return new URL((n.endsWith("/") ? n : n + "/") + e);
    }
    return new URL((0, r.addBasePath)(e), t.href);
  }
  ("function" == typeof n.default ||
    ("object" == typeof n.default && null !== n.default)) &&
    void 0 === n.default.__esModule &&
    (Object.defineProperty(n.default, "__esModule", { value: !0 }),
    Object.assign(n.default, n),
    (t.exports = n.default));
};
