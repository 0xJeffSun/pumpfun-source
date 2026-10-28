// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e, t, n) => {
  (e.i(149502),
    Object.defineProperty(n, "__esModule", { value: !0 }),
    Object.defineProperty(n, "getImgProps", {
      enumerable: !0,
      get: function () {
        return a;
      },
    }));
  let r = e.r(185457),
    i = e.r(999536),
    o = ["-moz-initial", "fill", "none", "scale-down", void 0];
  function s(e) {
    return void 0 !== e.default;
  }
  function l(e) {
    return void 0 === e
      ? e
      : "number" == typeof e
        ? Number.isFinite(e)
          ? e
          : 0 / 0
        : "string" == typeof e && /^[0-9]+$/.test(e)
          ? parseInt(e, 10)
          : 0 / 0;
  }
  function a(
    {
      src: e,
      sizes: t,
      unoptimized: n = !1,
      priority: u = !1,
      preload: d = !1,
      loading: c,
      className: f,
      quality: m,
      width: E,
      height: _,
      fill: S = !1,
      style: T,
      overrideSrc: I,
      onLoad: p,
      onLoadingComplete: N,
      placeholder: R = "empty",
      blurDataURL: O,
      fetchPriority: A,
      decoding: g = "async",
      layout: h,
      objectFit: b,
      objectPosition: C,
      lazyBoundary: U,
      lazyRoot: M,
      ...P
    },
    y,
  ) {
    var L;
    let w,
      B,
      { imgConf: F, showAltText: D, blurComplete: v, defaultLoader: Y } = y;
    if (void 0 === Y)
      throw Error(
        "images.loaderFile detected but the file is missing default export.\nRead more: https://nextjs.org/docs/messages/invalid-images-config",
      );
    let x = P.loader || Y;
    (delete P.loader, delete P.srcSet);
    let j = "__next_img_default" in x;
    if (j) {
      if ("custom" === F.loader)
        throw Error(`Image with src "${e}" is missing "loader" prop.
Read more: https://nextjs.org/docs/messages/next-image-missing-loader`);
    } else {
      let e = x;
      x = (t) => {
        let { config: n, ...r } = t;
        return e(r);
      };
    }
    if (h) {
      "fill" === h && (S = !0);
      let e = {
        intrinsic: { maxWidth: "100%", height: "auto" },
        responsive: { width: "100%", height: "auto" },
      }[h];
      e && (T = { ...T, ...e });
      let n = { responsive: "100vw", fill: "100vw" }[h];
      n && !t && (t = n);
    }
    let G = "",
      H = l(E),
      $ = l(_);
    if ((L = e) && "object" == typeof L && (s(L) || void 0 !== L.src)) {
      let t = s(e) ? e.default : e;
      if (!t.src)
        throw Error(
          `An object should only be passed to the image component src parameter if it comes from a static image import. It must include src. Received ${JSON.stringify(t)}`,
        );
      if (!t.height || !t.width)
        throw Error(
          `An object should only be passed to the image component src parameter if it comes from a static image import. It must include height and width. Received ${JSON.stringify(t)}`,
        );
      if (
        ((w = t.blurWidth),
        (B = t.blurHeight),
        (O = O || t.blurDataURL),
        (G = t.src),
        !S)
      )
        if (H || $) {
          if (H && !$) {
            let e = H / t.width;
            $ = Math.round(t.height * e);
          } else if (!H && $) {
            let e = $ / t.height;
            H = Math.round(t.width * e);
          }
        } else ((H = t.width), ($ = t.height));
    }
    let k = !u && !d && ("lazy" === c || void 0 === c);
    ((!(e = "string" == typeof e ? e : G) ||
      e.startsWith("data:") ||
      e.startsWith("blob:")) &&
      ((n = !0), (k = !1)),
      F.unoptimized && (n = !0),
      j &&
        !F.dangerouslyAllowSVG &&
        e.split("?", 1)[0].endsWith(".svg") &&
        (n = !0));
    let W = l(m),
      z = Object.assign(
        S
          ? {
              position: "absolute",
              height: "100%",
              width: "100%",
              left: 0,
              top: 0,
              right: 0,
              bottom: 0,
              objectFit: b,
              objectPosition: C,
            }
          : {},
        D ? {} : { color: "transparent" },
        T,
      ),
      V =
        v || "empty" === R
          ? null
          : "blur" === R
            ? `url("data:image/svg+xml;charset=utf-8,${(0, i.getImageBlurSvg)({ widthInt: H, heightInt: $, blurWidth: w, blurHeight: B, blurDataURL: O || "", objectFit: z.objectFit })}")`
            : `url("${R}")`,
      q = o.includes(z.objectFit)
        ? "fill" === z.objectFit
          ? "100% 100%"
          : "cover"
        : z.objectFit,
      K = V
        ? {
            backgroundSize: q,
            backgroundPosition: z.objectPosition || "50% 50%",
            backgroundRepeat: "no-repeat",
            backgroundImage: V,
          }
        : {},
      X = (function ({
        config: e,
        src: t,
        unoptimized: n,
        width: i,
        quality: o,
        sizes: s,
        loader: l,
      }) {
        if (n) {
          if (t.startsWith("/") && !t.startsWith("//")) {
            let e = (0, r.getDeploymentId)();
            if (
              t.includes("/_next/static/immutable") &&
              !(0, r.getAssetToken)()
            )
              e = void 0;
            else if (e) {
              let n = t.indexOf("?");
              if (-1 !== n) {
                let r = new URLSearchParams(t.slice(n + 1));
                r.get("dpl") ||
                  (r.append("dpl", e),
                  (t = t.slice(0, n) + "?" + r.toString()));
              } else t += `?dpl=${e}`;
            }
          }
          return { src: t, srcSet: void 0, sizes: void 0 };
        }
        let { widths: a, kind: u } = (function (
            { deviceSizes: e, allSizes: t },
            n,
            r,
          ) {
            if (r) {
              let n = /(^|\s)(1?\d?\d)vw/g,
                i = [];
              for (let e; (e = n.exec(r)); ) i.push(parseInt(e[2]));
              if (i.length) {
                let n = 0.01 * Math.min(...i);
                return { widths: t.filter((t) => t >= e[0] * n), kind: "w" };
              }
              return { widths: t, kind: "w" };
            }
            return "number" != typeof n
              ? { widths: e, kind: "w" }
              : {
                  widths: [
                    ...new Set(
                      [n, 2 * n].map(
                        (e) => t.find((t) => t >= e) || t[t.length - 1],
                      ),
                    ),
                  ],
                  kind: "x",
                };
          })(e, i, s),
          d = a.length - 1;
        return {
          sizes: s || "w" !== u ? s : "100vw",
          srcSet: a
            .map(
              (n, r) =>
                `${l({ config: e, src: t, quality: o, width: n })} ${"w" === u ? n : r + 1}${u}`,
            )
            .join(", "),
          src: l({ config: e, src: t, quality: o, width: a[d] }),
        };
      })({
        config: F,
        src: e,
        unoptimized: n,
        width: H,
        quality: W,
        sizes: t,
        loader: x,
      }),
      J = k ? "lazy" : c;
    return {
      props: {
        ...P,
        loading: J,
        fetchPriority: A,
        width: H,
        height: $,
        decoding: g,
        className: f,
        style: { ...z, ...K },
        sizes: X.sizes,
        srcSet: X.srcSet,
        src: I || X.src,
      },
      meta: { unoptimized: n, preload: d || u, placeholder: R, fill: S },
    };
  }
};
