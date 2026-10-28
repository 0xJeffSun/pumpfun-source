// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e, t, n) => {
  Object.defineProperty(n, "__esModule", { value: !0 });
  var r = {
    UnknownDynamicStaleTime: function () {
      return o;
    },
    computeDynamicStaleAt: function () {
      return i;
    },
    invalidateBfCache: function () {
      return f;
    },
    readFromBFCache: function () {
      return p;
    },
    readFromBFCacheDuringRegularNavigation: function () {
      return y;
    },
    updateBFCacheEntryFromDynamicResponse: function () {
      return h;
    },
    writeToBFCache: function () {
      return d;
    },
  };
  for (var a in r) Object.defineProperty(n, a, { enumerable: !0, get: r[a] });
  let l = e.r(561448),
    u = e.r(948176),
    o = -1;
  function i(e, t) {
    return t !== o ? e + 1e3 * t : e + l.DYNAMIC_STALETIME_MS;
  }
  let c = (0, u.createCacheMap)(),
    s = 0;
  function f() {
    "u" > typeof window && s++;
  }
  function d(e, t, n, r) {
    if ("u" < typeof window) return;
    let a = {
      rsc: n.rsc,
      prefetchRsc: n.prefetchRsc,
      varyParams: n.varyParams,
      bfcacheId: n.bfcacheId,
      ref: null,
      size: 100,
      navigatedAt: e,
      staleAt: r,
      version: s,
      status: u.EntryStatus.Fulfilled,
    };
    (0, u.setInCacheMap)(c, t, a, !1);
  }
  function h(e, t, n) {
    if ("u" < typeof window) return;
    let r = (0, u.getFromCacheMap)(-1, s, c, e, !1, !1);
    null !== r &&
      r.rsc === t.rsc &&
      ((r.staleAt = n), (r.varyParams = t.varyParams));
  }
  function p(e) {
    return "u" < typeof window
      ? null
      : (0, u.getFromCacheMap)(-1, s, c, e, !1, !1);
  }
  function y(e, t) {
    return "u" < typeof window
      ? null
      : (0, u.getFromCacheMap)(e, s, c, t, !1, !1);
  }
  ("function" == typeof n.default ||
    ("object" == typeof n.default && null !== n.default)) &&
    void 0 === n.default.__esModule &&
    (Object.defineProperty(n.default, "__esModule", { value: !0 }),
    Object.assign(n.default, n),
    (t.exports = n.default));
};
