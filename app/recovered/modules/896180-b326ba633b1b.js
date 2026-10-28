// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  e.i(149502);
  var t = e.i(445242),
    r = e.i(352386),
    n = e.i(282837),
    i = e.i(315706);
  let l = "appsflyer-smart-banner-sdk";
  function a(e) {
    if (!window.AF) {
      window.AppsFlyerSdkObject = "AF";
      let t = function (...e) {
        ((t.q = t.q || []), t.q.push([Date.now(), ...e]));
      };
      ((t.id = {
        banners: { key: e },
        ...(n.Z.WEB_APP_ID ? { pba: { webAppId: n.Z.WEB_APP_ID } } : {}),
      }),
        (t.plugins = {}),
        (window.AF = t));
    }
    let t = document.getElementById(l);
    if (t) return { scriptEl: t, alreadyLoaded: !0 };
    let r = document.createElement("script");
    return (
      (r.id = l),
      (r.async = !0),
      (r.crossOrigin = "anonymous"),
      (r.integrity = n.Z.WEB_SDK.SCRIPT_INTEGRITY),
      (r.src = n.Z.WEB_SDK.SCRIPT_PATH),
      document.head.appendChild(r),
      { scriptEl: r, alreadyLoaded: !1 }
    );
  }
  function s(e, t = {}) {
    let r = Error(e);
    (0, i.f)()
      .then(({ datadogRum: e }) => {
        e.addError(r, { source: "appsflyer-smart-banner", ...t });
      })
      .catch(() => {});
  }
  let o = {};
  e.s([
    "i",
    0,
    function (e) {
      let i,
        l,
        u = (0, t.c)(6),
        { webKey: d, bannerZIndex: c, additionalParams: m, shouldHide: p } = e,
        f = void 0 === c ? 0x7fffffff : c,
        _ = void 0 === m ? o : m,
        v = void 0 !== p && p;
      return (
        u[0] !== _ || u[1] !== f || u[2] !== v || u[3] !== d
          ? ((i = () => {
              if (!d)
                return void s("webKey missing. Banner will not render", {
                  env: "production",
                });
              let { scriptEl: e, alreadyLoaded: t } = a(d),
                r = window.AF;
              if (
                !r ||
                (v
                  ? r("banners", "hideBanner")
                  : r("banners", "showBanner", {
                      bannerZIndex: f,
                      additionalParams: _,
                      bannerContainerQuery: `#${n.i}`,
                    }),
                t || !e)
              )
                return;
              let i = () => {
                s("SDK <script> failed to load", { src: e.src });
              };
              e.addEventListener("error", i, { once: !0 });
              let l = window.setTimeout(() => {
                v ||
                  document.querySelector(
                    "[id^='af-banner'], [class*='af-banner']",
                  ) ||
                  s("SDK loaded but no banner rendered after timeout", {
                    timeoutMs: 8e3,
                    queueLength: window.AF?.q?.length ?? 0,
                  });
              }, 8e3);
              return () => {
                (e.removeEventListener("error", i), window.clearTimeout(l));
              };
            }),
            (l = [d, v, f, _]),
            (u[0] = _),
            (u[1] = f),
            (u[2] = v),
            (u[3] = d),
            (u[4] = i),
            (u[5] = l))
          : ((i = u[4]), (l = u[5])),
        (0, r.useEffect)(i, l),
        null
      );
    },
    "J",
    0,
    a,
  ]);
};
