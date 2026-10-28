// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e, t, n) => {
  Object.defineProperty(n, "__esModule", { value: !0 });
  var r = {
    prefetch: function () {
      return h;
    },
    prefetchRoute: function () {
      return d;
    },
  };
  for (var a in r) Object.defineProperty(n, a, { enumerable: !0, get: r[a] });
  let l = e.r(313537),
    u = e.r(611520),
    o = e.r(871512),
    i = e.r(863090),
    c = e.r(946859),
    s = e.r(685003),
    f = e.r(634258);
  function d(e, t) {
    let n;
    if ((0, i.isJavaScriptURLString)(e))
      throw Error(
        "Next.js has blocked a javascript: URL as a security precaution.",
      );
    let r = (0, o.getCurrentAppRouterState)();
    if (null === r)
      throw Error(
        "Internal Next.js error: Router action dispatched before initialization.",
      );
    switch (t?.kind ?? l.PrefetchKind.AUTO) {
      case l.PrefetchKind.AUTO:
        n = f.FetchStrategy.PPR;
        break;
      case l.PrefetchKind.FULL:
        n = f.FetchStrategy.Full;
        break;
      default:
        n = f.FetchStrategy.PPR;
    }
    h(e, r.nextUrl, r.root, n, t?.onInvalidate ?? null);
  }
  function h(e, t, n, r, a) {
    let l = (0, u.createPrefetchURL)(e);
    if (null === l) return;
    let o = (0, c.createCacheKey)(l.href, t);
    (0, s.schedulePrefetchTask)(o, n, r, f.PrefetchPriority.Default, a, null);
  }
  ("function" == typeof n.default ||
    ("object" == typeof n.default && null !== n.default)) &&
    void 0 === n.default.__esModule &&
    (Object.defineProperty(n.default, "__esModule", { value: !0 }),
    Object.assign(n.default, n),
    (t.exports = n.default));
};
