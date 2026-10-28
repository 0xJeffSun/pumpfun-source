// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e, t, n) => {
  Object.defineProperty(n, "__esModule", { value: !0 });
  var r = {
    ACTION_HEADER: function () {
      return u;
    },
    FLIGHT_HEADERS: function () {
      return p;
    },
    NEXT_ACTION_NOT_FOUND_HEADER: function () {
      return R;
    },
    NEXT_ACTION_REVALIDATED_HEADER: function () {
      return b;
    },
    NEXT_DID_POSTPONE_HEADER: function () {
      return v;
    },
    NEXT_HMR_REFRESH_HEADER: function () {
      return s;
    },
    NEXT_HTML_REQUEST_ID_HEADER: function () {
      return E;
    },
    NEXT_INSTANT_TEST_COOKIE: function () {
      return h;
    },
    NEXT_IS_PRERENDER_HEADER: function () {
      return m;
    },
    NEXT_REQUEST_ID_HEADER: function () {
      return P;
    },
    NEXT_REWRITTEN_PATH_HEADER: function () {
      return _;
    },
    NEXT_REWRITTEN_QUERY_HEADER: function () {
      return S;
    },
    NEXT_ROUTER_PREFETCH_HEADER: function () {
      return i;
    },
    NEXT_ROUTER_SEGMENT_PREFETCH_HEADER: function () {
      return c;
    },
    NEXT_ROUTER_STALE_TIME_HEADER: function () {
      return g;
    },
    NEXT_ROUTER_STATE_TREE_HEADER: function () {
      return o;
    },
    NEXT_RSC_UNION_QUERY: function () {
      return y;
    },
    NEXT_URL: function () {
      return f;
    },
    RSC_CONTENT_TYPE_HEADER: function () {
      return d;
    },
    RSC_HEADER: function () {
      return l;
    },
  };
  for (var a in r) Object.defineProperty(n, a, { enumerable: !0, get: r[a] });
  let l = "rsc",
    u = "next-action",
    o = "next-router-state-tree",
    i = "next-router-prefetch",
    c = "next-router-segment-prefetch",
    s = "next-hmr-refresh",
    f = "next-url",
    d = "text/x-component",
    h = "next-instant-navigation-testing",
    p = [l, o, i, s, c],
    y = "_rsc",
    g = "x-nextjs-stale-time",
    v = "x-nextjs-postponed",
    _ = "x-nextjs-rewritten-path",
    S = "x-nextjs-rewritten-query",
    m = "x-nextjs-prerender",
    R = "x-nextjs-action-not-found",
    P = "x-nextjs-request-id",
    E = "x-nextjs-html-request-id",
    b = "x-action-revalidated";
  ("function" == typeof n.default ||
    ("object" == typeof n.default && null !== n.default)) &&
    void 0 === n.default.__esModule &&
    (Object.defineProperty(n.default, "__esModule", { value: !0 }),
    Object.assign(n.default, n),
    (t.exports = n.default));
};
