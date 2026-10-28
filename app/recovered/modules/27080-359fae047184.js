// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e, t, n) => {
  (e.i(149502),
    Object.defineProperty(n, "__esModule", { value: !0 }),
    Object.defineProperty(n, "default", {
      enumerable: !0,
      get: function () {
        return s;
      },
    }));
  let r = e.r(697831),
    i = e.r(185457);
  function o({ config: e, src: t, width: n, quality: s }) {
    let l = (0, i.getDeploymentId)();
    if (t.startsWith("/") && !t.startsWith("//"))
      if (t.includes("/_next/static/immutable") && !(0, i.getAssetToken)())
        l = void 0;
      else {
        let e = t.indexOf("?");
        if (-1 !== e) {
          let n = new URLSearchParams(t.slice(e + 1)),
            r = n.get("dpl");
          if (r) {
            ((l = r), n.delete("dpl"));
            let i = n.toString();
            t = t.slice(0, e) + (i ? "?" + i : "");
          }
        }
      }
    if (
      t.startsWith("/") &&
      t.includes("?") &&
      e.localPatterns?.length === 1 &&
      "**" === e.localPatterns[0].pathname &&
      "" === e.localPatterns[0].search
    )
      throw Error(`Image with src "${t}" is using a query string which is not configured in images.localPatterns.
Read more: https://nextjs.org/docs/messages/next-image-unconfigured-localpatterns`);
    let a = (0, r.findClosestQuality)(s, e);
    return `${e.path}?url=${encodeURIComponent(t)}&w=${n}&q=${a}${t.startsWith("/") && l ? `&dpl=${l}` : ""}`;
  }
  o.__next_img_default = !0;
  let s = o;
};
