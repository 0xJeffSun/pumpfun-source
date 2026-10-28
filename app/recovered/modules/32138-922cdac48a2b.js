// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e, t, r) => {
  Object.defineProperty(r, "__esModule", { value: !0 });
  var n = {
    createHeadKey: function () {
      return a;
    },
    createSegmentKey: function () {
      return i.createRouterCacheKey;
    },
  };
  for (var o in n) Object.defineProperty(r, o, { enumerable: !0, get: n[o] });
  let i = e.r(929144);
  function a(e) {
    let t = [e.value],
      r = e.parent;
    for (; null !== r; ) {
      let e = r.value;
      ("string" == typeof e && t.push(e), (r = r.parent));
    }
    return JSON.stringify(t);
  }
  ("function" == typeof r.default ||
    ("object" == typeof r.default && null !== r.default)) &&
    void 0 === r.default.__esModule &&
    (Object.defineProperty(r.default, "__esModule", { value: !0 }),
    Object.assign(r.default, r),
    (t.exports = r.default));
};
