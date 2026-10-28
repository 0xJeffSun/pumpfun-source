// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e, t, n) => {
  (e.i(149502), Object.defineProperty(n, "__esModule", { value: !0 }));
  var r = {
    createPrefetchURL: function () {
      return i;
    },
    isExternalURL: function () {
      return o;
    },
  };
  for (var a in r) Object.defineProperty(n, a, { enumerable: !0, get: r[a] });
  let l = e.r(200829),
    u = e.r(814621);
  function o(e) {
    return e.origin !== window.location.origin;
  }
  function i(e) {
    let t;
    if ((0, l.isBot)(window.navigator.userAgent)) return null;
    try {
      t = new URL((0, u.addBasePath)(e), window.location.href);
    } catch (t) {
      throw Error(
        `Cannot prefetch '${e}' because it cannot be converted to a URL.`,
      );
    }
    return o(t) ? null : t;
  }
  ("function" == typeof n.default ||
    ("object" == typeof n.default && null !== n.default)) &&
    void 0 === n.default.__esModule &&
    (Object.defineProperty(n.default, "__esModule", { value: !0 }),
    Object.assign(n.default, n),
    (t.exports = n.default));
};
