// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e, t, n) => {
  (e.i(149502), Object.defineProperty(n, "__esModule", { value: !0 }));
  var r = {
    DYNAMIC_STALETIME_MS: function () {
      return i;
    },
    STATIC_STALETIME_MS: function () {
      return c;
    },
    navigateReducer: function () {
      return s;
    },
  };
  for (var a in r) Object.defineProperty(n, a, { enumerable: !0, get: r[a] });
  let l = e.r(813328),
    u = e.r(85396),
    o = e.r(944112),
    i = 1e3 * Number("0"),
    c = (0, u.getStaleTimeMs)(Number("300"));
  function s(e, t) {
    let { url: n, isExternalUrl: r, navigateType: a, scrollBehavior: u } = t;
    if (r || document.getElementById("__next-page-redirect"))
      return (0, l.completeHardNavigation)(e, n, a);
    let i = new URL(e.canonicalUrl, location.origin),
      c = e.renderedSearch;
    return (0, l.navigate)(
      e,
      n,
      i,
      c,
      e.root,
      e.tree,
      e.nextUrl,
      o.FreshnessPolicy.Default,
      u,
      a,
    );
  }
  ("function" == typeof n.default ||
    ("object" == typeof n.default && null !== n.default)) &&
    void 0 === n.default.__esModule &&
    (Object.defineProperty(n.default, "__esModule", { value: !0 }),
    Object.assign(n.default, n),
    (t.exports = n.default));
};
