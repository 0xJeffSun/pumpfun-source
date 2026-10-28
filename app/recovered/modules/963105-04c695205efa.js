// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e, t, n) => {
  Object.defineProperty(n, "__esModule", { value: !0 });
  var r = {
    setCacheBustingSearchParam: function () {
      return i;
    },
    setCacheBustingSearchParamWithHash: function () {
      return c;
    },
  };
  for (var a in r) Object.defineProperty(n, a, { enumerable: !0, get: r[a] });
  let l = e.r(673899),
    u = e.r(674637);
  async function o(e) {
    return "function" == typeof globalThis.crypto?.subtle?.digest
      ? (0, l.computeCacheBustingSearchParam)(
          e[u.NEXT_ROUTER_PREFETCH_HEADER],
          e[u.NEXT_ROUTER_SEGMENT_PREFETCH_HEADER],
          e[u.NEXT_ROUTER_STATE_TREE_HEADER],
          e[u.NEXT_URL],
        )
      : (0, l.computeLegacyCacheBustingSearchParam)(
          e[u.NEXT_ROUTER_PREFETCH_HEADER],
          e[u.NEXT_ROUTER_SEGMENT_PREFETCH_HEADER],
          e[u.NEXT_ROUTER_STATE_TREE_HEADER],
          e[u.NEXT_URL],
        );
  }
  let i = async (e, t) => {
      c(e, await o(t));
    },
    c = (e, t) => {
      let n = e.search,
        r = (n.startsWith("?") ? n.slice(1) : n)
          .split("&")
          .filter((e) => e && !e.startsWith(`${u.NEXT_RSC_UNION_QUERY}=`));
      (t.length > 0
        ? r.push(`${u.NEXT_RSC_UNION_QUERY}=${t}`)
        : r.push(`${u.NEXT_RSC_UNION_QUERY}`),
        (e.search = r.length ? `?${r.join("&")}` : ""));
    };
  ("function" == typeof n.default ||
    ("object" == typeof n.default && null !== n.default)) &&
    void 0 === n.default.__esModule &&
    (Object.defineProperty(n.default, "__esModule", { value: !0 }),
    Object.assign(n.default, n),
    (t.exports = n.default));
};
