// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e, t, r) => {
  (Object.defineProperty(r, "__esModule", { value: !0 }),
    Object.defineProperty(r, "handleISRError", {
      enumerable: !0,
      get: function () {
        return o;
      },
    }));
  let n = e.r(675942);
  function o({ error: e }) {
    if (!n.workUnitAsyncStorage) return;
    let t = n.workUnitAsyncStorage.getStore();
    switch (t?.type) {
      case "prerender":
      case "prerender-client":
      case "prerender-legacy":
        throw (e && console.error(e), e);
      case "request":
      case "prerender-runtime":
      case "validation-client":
      case "cache":
      case "private-cache":
      case "unstable-cache":
      case "build-time-generator":
      case void 0:
        return;
    }
  }
  ("function" == typeof r.default ||
    ("object" == typeof r.default && null !== r.default)) &&
    void 0 === r.default.__esModule &&
    (Object.defineProperty(r.default, "__esModule", { value: !0 }),
    Object.assign(r.default, r),
    (t.exports = r.default));
};
