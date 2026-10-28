// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e, t, n) => {
  Object.defineProperty(n, "__esModule", { value: !0 });
  var r = {
    VALID_LOADERS: function () {
      return o;
    },
    imageConfigDefault: function () {
      return u;
    },
    prepareImageConfig: function () {
      return a;
    },
  };
  for (var i in r) Object.defineProperty(n, i, { enumerable: !0, get: r[i] });
  let o = ["default", "imgix", "cloudinary", "akamai", "custom"],
    s = {},
    l = new WeakMap();
  function a(e, t) {
    let n = e ?? s,
      r = t ?? s,
      i = l.get(n);
    if (i) {
      let e = i.get(r);
      if (e) return e;
    }
    let o = e || t || u,
      a = [...o.deviceSizes].sort((e, t) => e - t),
      d = [...o.imageSizes],
      c = {
        deviceSizes: a,
        imageSizes: d,
        allSizes: [...a, ...d].sort((e, t) => e - t),
        qualities:
          void 0 === o.qualities
            ? void 0
            : [...o.qualities].sort((e, t) => e - t),
        path: o.path,
        loader: o.loader,
        dangerouslyAllowSVG: o.dangerouslyAllowSVG,
        unoptimized: o.unoptimized,
        domains: o.domains,
        remotePatterns: o.remotePatterns,
        localPatterns:
          "u" < typeof window && void 0 !== t
            ? t.localPatterns
            : o.localPatterns,
        output: o.output,
      };
    return (i || ((i = new WeakMap()), l.set(n, i)), i.set(r, c), c);
  }
  let u = {
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [32, 48, 64, 96, 128, 256, 384],
    path: "/_next/image",
    loader: "default",
    loaderFile: "",
    domains: [],
    disableStaticImages: !1,
    minimumCacheTTL: 14400,
    formats: ["image/webp"],
    maximumDiskCacheSize: void 0,
    maximumRedirects: 3,
    maximumResponseBody: 5e7,
    dangerouslyAllowLocalIP: !1,
    dangerouslyAllowSVG: !1,
    contentSecurityPolicy: "script-src 'none'; frame-src 'none'; sandbox;",
    contentDispositionType: "attachment",
    localPatterns: void 0,
    remotePatterns: [],
    qualities: [75],
    unoptimized: !1,
    customCacheHandler: !1,
  };
};
