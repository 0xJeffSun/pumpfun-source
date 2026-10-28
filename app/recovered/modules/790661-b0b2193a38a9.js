// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e, t, n) => {
  function r(e, t = !0) {
    return e.pathname + e.search + (t ? e.hash : "");
  }
  (Object.defineProperty(n, "__esModule", { value: !0 }),
    Object.defineProperty(n, "createHrefFromUrl", {
      enumerable: !0,
      get: function () {
        return r;
      },
    }),
    ("function" == typeof n.default ||
      ("object" == typeof n.default && null !== n.default)) &&
      void 0 === n.default.__esModule &&
      (Object.defineProperty(n.default, "__esModule", { value: !0 }),
      Object.assign(n.default, n),
      (t.exports = n.default)));
};
