// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e, t, n) => {
  (e.i(149502), Object.defineProperty(n, "__esModule", { value: !0 }));
  var r = {
    canonicalizeURLPart: function () {
      return y;
    },
    doesStaticSegmentAppearInURL: function () {
      return v;
    },
    getCacheKeyForDynamicParam: function () {
      return _;
    },
    getParamValueFromCacheKey: function () {
      return m;
    },
    getPathnameFromRequestURL: function () {
      return p;
    },
    getRenderedPathname: function () {
      return h;
    },
    getRenderedSearch: function () {
      return d;
    },
    normalizeRenderedSearch: function () {
      return f;
    },
    parseDynamicParamFromURLPart: function () {
      return g;
    },
    urlSearchParamsToParsedUrlQuery: function () {
      return R;
    },
    urlToUrlWithoutFlightMarker: function () {
      return S;
    },
  };
  for (var a in r) Object.defineProperty(n, a, { enumerable: !0, get: r[a] });
  let l = e.r(706957),
    u = e.r(357830),
    o = e.r(674637),
    i = e.r(948866);
  e.r(834454);
  let c = e.r(461172),
    s = e.r(830017);
  function f(e) {
    let t = R(new URLSearchParams(e));
    return (0, s.getRenderedSearch)(t);
  }
  function d(e) {
    let t = e.headers.get(o.NEXT_REWRITTEN_QUERY_HEADER);
    return null !== t ? f(t) : f(S(new URL(e.url)).search);
  }
  function h(e) {
    let t = e.headers.get(o.NEXT_REWRITTEN_PATH_HEADER);
    if (null !== t) return t;
    let n = S(new URL(e.url)).pathname;
    return (0, i.hasBasePath)(n) ? (0, c.removeBasePath)(n) : n;
  }
  function p(e) {
    let t = e.pathname;
    return (0, i.hasBasePath)(t) ? (0, c.removeBasePath)(t) : t;
  }
  function y(e) {
    try {
      return encodeURIComponent(decodeURIComponent(e));
    } catch {
      return e;
    }
  }
  function g(e, t, n) {
    switch (e) {
      case "c":
        return n < t.length ? t.slice(n).map((e) => y(e)) : [];
      case "ci(..)(..)":
      case "ci(.)":
      case "ci(..)":
      case "ci(...)": {
        let r = e.length - 2;
        return n < t.length
          ? t.slice(n).map((e, t) => (0 === t ? y(e.slice(r)) : y(e)))
          : [];
      }
      case "oc":
        return n < t.length ? t.slice(n).map((e) => y(e)) : null;
      case "d":
        if (n >= t.length) return "";
        return y(t[n]);
      case "di(..)(..)":
      case "di(.)":
      case "di(..)":
      case "di(...)": {
        let r = e.length - 2;
        if (n >= t.length) return "";
        return y(t[n].slice(r));
      }
      default:
        return "";
    }
  }
  function v(e) {
    return (
      !(
        e === u.ROOT_SEGMENT_REQUEST_KEY ||
        e === l.PAGE_SEGMENT_KEY ||
        ("(" === e[0] && e.endsWith(")"))
      ) &&
      e !== l.DEFAULT_SEGMENT_KEY &&
      "/_not-found" !== e
    );
  }
  function _(e) {
    return "string" == typeof e ? e : null === e ? "" : e.join("/");
  }
  function S(e) {
    let t = new URL(e);
    return (t.searchParams.delete(o.NEXT_RSC_UNION_QUERY), t);
  }
  function m(e, t) {
    return "c" === t || "oc" === t ? e.split("/") : e;
  }
  function R(e) {
    let t = {};
    for (let [n, r] of e.entries())
      void 0 === t[n]
        ? (t[n] = r)
        : Array.isArray(t[n])
          ? t[n].push(r)
          : (t[n] = [t[n], r]);
    return t;
  }
  ("function" == typeof n.default ||
    ("object" == typeof n.default && null !== n.default)) &&
    void 0 === n.default.__esModule &&
    (Object.defineProperty(n.default, "__esModule", { value: !0 }),
    Object.assign(n.default, n),
    (t.exports = n.default));
};
