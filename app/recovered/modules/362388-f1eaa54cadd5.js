// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(732486),
    r = e.i(445242),
    a = e.i(599077),
    i = e.i(352386),
    n = e.i(282837),
    l = e.i(33474),
    s = e.i(544514);
  let o = /^[A-Za-z0-9_-]{1,512}$/,
    c = (e) => (e && o.test(e) ? e : null);
  var d = e.i(896180),
    m = e.i(955332);
  e.s(
    [
      "ConditionalMobileAppsFlyerSmartBanner",
      0,
      () => {
        let e,
          o,
          u,
          f,
          h,
          p,
          x = (0, r.c)(11),
          g = (0, a.usePathname)(),
          [b, v] = (0, i.useState)(!1),
          [y, j] = (0, i.useState)(!1),
          w = (0, s.f)();
        if (
          (x[0] === Symbol.for("react.memo_cache_sentinel")
            ? ((e = () => {
                let e = window.matchMedia("(max-width: 768px)"),
                  t = () => {
                    (v(e.matches), e.matches || j(!1));
                  };
                return (
                  t(),
                  e.addEventListener("change", t),
                  () => e.removeEventListener("change", t)
                );
              }),
              (o = []),
              (x[0] = e),
              (x[1] = o))
            : ((e = x[0]), (o = x[1])),
          (0, i.useEffect)(e, o),
          x[2] !== w || x[3] !== b
            ? ((u = () => {
                if (!b || !w) return;
                let e = window.setTimeout(() => j(!0), 3e3);
                return () => window.clearTimeout(e);
              }),
              (f = [b, w]),
              (x[2] = w),
              (x[3] = b),
              (x[4] = u),
              (x[5] = f))
            : ((u = x[4]), (f = x[5])),
          (0, i.useEffect)(u, f),
          x[6] !== g)
        ) {
          let e = (0, m.I)(g),
            t = l.K.SMART_BANNER_WEB(
              e || void 0,
              (() => {
                try {
                  let e = (() => {
                    let e = window.localStorage.getItem("ss_incoming_params");
                    if (!e) return null;
                    let t = JSON.parse(e);
                    if (!Array.isArray(t)) return null;
                    let r = Date.now(),
                      a = t.find(
                        (e) =>
                          "string" == typeof e?.gclid &&
                          e.gclid.length > 0 &&
                          ("number" != typeof e.af_ss_exp_at ||
                            e.af_ss_exp_at > r),
                      );
                    return a?.gclid ? c(decodeURIComponent(a.gclid)) : null;
                  })();
                  if (e) return e;
                } catch {}
                try {
                  return c(
                    new URLSearchParams(window.location.search).get("gclid"),
                  );
                } catch {
                  return null;
                }
              })() ?? void 0,
            );
          ((h = (0, l.n)(t)), (x[6] = g), (x[7] = h));
        } else h = x[7];
        let N = h,
          _ = !b;
        return !_ && w && y
          ? (x[8] !== N || x[9] !== _
              ? ((p = (0, t.jsx)(d.i, {
                  webKey: n.Z.WEB_KEY,
                  bannerZIndex: n.Z.SMART_BANNER.Z_INDEX,
                  additionalParams: N,
                  shouldHide: _,
                })),
                (x[8] = N),
                (x[9] = _),
                (x[10] = p))
              : (p = x[10]),
            p)
          : null;
      },
    ],
    362388,
  );
};
