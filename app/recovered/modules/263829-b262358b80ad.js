// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e, t, n) => {
  (Object.defineProperty(n, "__esModule", { value: !0 }),
    Object.defineProperty(n, "isNavigatingToNewRootLayout", {
      enumerable: !0,
      get: function () {
        return function e(t, n) {
          let a = (t.prefetchHints & r.PrefetchHint.IsRootLayoutOrAbove) != 0,
            l = (n.prefetchHints & r.PrefetchHint.IsRootLayoutOrAbove) != 0;
          if (!a && !l) return !1;
          if (a !== l) return !0;
          let u = t.segment,
            o = n.segment;
          if (Array.isArray(u) && Array.isArray(o)) {
            if (u[0] !== o[0] || u[2] !== o[2]) return !0;
          } else if (u !== o) return !0;
          let i = n.slots,
            c = t.slots;
          if (null !== i)
            for (let [t, n] of i) {
              let r = c?.get(t);
              if (void 0 === r || e(r, n)) return !0;
            }
          return !1;
        };
      },
    }));
  let r = e.r(368418);
  ("function" == typeof n.default ||
    ("object" == typeof n.default && null !== n.default)) &&
    void 0 === n.default.__esModule &&
    (Object.defineProperty(n.default, "__esModule", { value: !0 }),
    Object.assign(n.default, n),
    (t.exports = n.default));
};
