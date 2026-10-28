// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(732486),
    r = e.i(445242),
    l = e.i(599077),
    a = e.i(352386),
    i = e.i(282837),
    n = e.i(33474),
    s = e.i(544514);
  let o = /^[A-Za-z0-9_-]{1,512}$/,
    d = (e) => (e && o.test(e) ? e : null);
  var c = e.i(896180),
    u = e.i(955332);
  e.s(
    [
      "ConditionalMobileAppsFlyerSmartBanner",
      0,
      () => {
        let e,
          o,
          m,
          f,
          p,
          h,
          v = (0, r.c)(11),
          b = (0, l.usePathname)(),
          [g, y] = (0, a.useState)(!1),
          [x, w] = (0, a.useState)(!1),
          _ = (0, s.f)();
        if (
          (v[0] === Symbol.for("react.memo_cache_sentinel")
            ? ((e = () => {
                let e = window.matchMedia("(max-width: 768px)"),
                  t = () => {
                    (y(e.matches), e.matches || w(!1));
                  };
                return (
                  t(),
                  e.addEventListener("change", t),
                  () => e.removeEventListener("change", t)
                );
              }),
              (o = []),
              (v[0] = e),
              (v[1] = o))
            : ((e = v[0]), (o = v[1])),
          (0, a.useEffect)(e, o),
          v[2] !== _ || v[3] !== g
            ? ((m = () => {
                if (!g || !_) return;
                let e = window.setTimeout(() => w(!0), 3e3);
                return () => window.clearTimeout(e);
              }),
              (f = [g, _]),
              (v[2] = _),
              (v[3] = g),
              (v[4] = m),
              (v[5] = f))
            : ((m = v[4]), (f = v[5])),
          (0, a.useEffect)(m, f),
          v[6] !== b)
        ) {
          let e = (0, u.I)(b),
            t = n.K.SMART_BANNER_WEB(
              e || void 0,
              (() => {
                try {
                  let e = (() => {
                    let e = window.localStorage.getItem("ss_incoming_params");
                    if (!e) return null;
                    let t = JSON.parse(e);
                    if (!Array.isArray(t)) return null;
                    let r = Date.now(),
                      l = t.find(
                        (e) =>
                          "string" == typeof e?.gclid &&
                          e.gclid.length > 0 &&
                          ("number" != typeof e.af_ss_exp_at ||
                            e.af_ss_exp_at > r),
                      );
                    return l?.gclid ? d(decodeURIComponent(l.gclid)) : null;
                  })();
                  if (e) return e;
                } catch {}
                try {
                  return d(
                    new URLSearchParams(window.location.search).get("gclid"),
                  );
                } catch {
                  return null;
                }
              })() ?? void 0,
            );
          ((p = (0, n.n)(t)), (v[6] = b), (v[7] = p));
        } else p = v[7];
        let A = p,
          j = !g;
        return !j && _ && x
          ? (v[8] !== A || v[9] !== j
              ? ((h = (0, t.jsx)(c.i, {
                  webKey: i.Z.WEB_KEY,
                  bannerZIndex: i.Z.SMART_BANNER.Z_INDEX,
                  additionalParams: A,
                  shouldHide: j,
                })),
                (v[8] = A),
                (v[9] = j),
                (v[10] = h))
              : (h = v[10]),
            h)
          : null;
      },
    ],
    362388,
  );
};
