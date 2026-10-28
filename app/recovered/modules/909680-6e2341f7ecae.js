// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e, t, n) => {
  Object.defineProperty(n, "__esModule", { value: !0 });
  var r = {
    beginLockedNavigation: function () {
      return d;
    },
    beginNavigationLockPrefetch: function () {
      return u;
    },
    getCurrentNavigationGate: function () {
      return h;
    },
    getNavigationLockSegmentCacheMap: function () {
      return o;
    },
    getPreLockFetch: function () {
      return l;
    },
    isNavigationLocked: function () {
      return f;
    },
    resetNavigationLockToPending: function () {
      return p;
    },
    resolveNavigationLockPrefetch: function () {
      return i;
    },
    shouldRestrictNavigationToShell: function () {
      return y;
    },
    startListeningForInstantNavigationCookie: function () {
      return c;
    },
    updateCapturedSPAToTree: function () {
      return s;
    },
  };
  for (var a in r) Object.defineProperty(n, a, { enumerable: !0, get: r[a] });
  function l() {
    return null;
  }
  function u() {
    return null;
  }
  function o() {
    return null;
  }
  function i(e) {}
  function c() {}
  function s(e, t) {}
  function f() {
    return !1;
  }
  function d() {
    return null;
  }
  function h() {
    return null;
  }
  function p() {}
  function y(e, t) {
    return !1;
  }
  ("function" == typeof n.default ||
    ("object" == typeof n.default && null !== n.default)) &&
    void 0 === n.default.__esModule &&
    (Object.defineProperty(n.default, "__esModule", { value: !0 }),
    Object.assign(n.default, n),
    (t.exports = n.default));
};
