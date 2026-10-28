// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e, t, r) => {
  (Object.defineProperty(r, "__esModule", { value: !0 }),
    Object.defineProperty(r, "isLocalURL", {
      enumerable: !0,
      get: function () {
        return i;
      },
    }));
  let n = e.r(965333),
    o = e.r(948866);
  function i(e) {
    if (!(0, n.isAbsoluteUrl)(e)) return !0;
    try {
      let t = (0, n.getLocationOrigin)(),
        r = new URL(e, t);
      return r.origin === t && (0, o.hasBasePath)(r.pathname);
    } catch (e) {
      return !1;
    }
  }
};
