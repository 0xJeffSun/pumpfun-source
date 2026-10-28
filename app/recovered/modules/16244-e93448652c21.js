// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e, t, n) => {
  (e.i(149502),
    Object.defineProperty(n, "__esModule", { value: !0 }),
    Object.defineProperty(n, "useImageConfig", {
      enumerable: !0,
      get: function () {
        return l;
      },
    }));
  let r = e.r(352386),
    i = e.r(558769),
    o = e.r(46856),
    s = {
      deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
      imageSizes: [32, 48, 64, 96, 128, 256, 384],
      qualities: [75],
      path: "/_next/image",
      loader: "default",
      dangerouslyAllowSVG: !1,
      unoptimized: !1,
    };
  function l() {
    let e = (0, r.useContext)(o.ImageConfigContext);
    return (0, i.prepareImageConfig)(s, e);
  }
  ("function" == typeof n.default ||
    ("object" == typeof n.default && null !== n.default)) &&
    void 0 === n.default.__esModule &&
    (Object.defineProperty(n.default, "__esModule", { value: !0 }),
    Object.assign(n.default, n),
    (t.exports = n.default));
};
