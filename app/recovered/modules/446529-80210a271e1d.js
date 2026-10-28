// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(445242),
    r = e.i(352386);
  let { ONELINK_URL: n, FALLBACK_URL: i } = e.i(282837).Z.SMART_SCRIPT,
    a = {
      google: "google_web",
      twitter: "x_web",
      x: "x_web",
      facebook: "meta_web",
      instagram: "meta_web",
    },
    l = "landing_page";
  e.s([
    "R",
    0,
    (e) => {
      let t;
      try {
        t = new URL(e);
      } catch {
        return !1;
      }
      let r = t.searchParams.get("pid");
      return !!r && r !== l;
    },
    "V",
    0,
    function (e) {
      let s,
        o,
        c,
        u = (0, t.c)(5);
      u[0] !== e
        ? ((s = void 0 === e ? {} : e), (u[0] = e), (u[1] = s))
        : (s = u[1]);
      let { webFallbackUrl: d } = s,
        [f, m] = (0, r.useState)(i);
      return (
        u[2] !== d
          ? ((o = () => {
              let e = !1,
                t = () => {
                  let t = window.AF_SMART_SCRIPT;
                  if (!t?.generateOneLinkURL) return !1;
                  let r = t.generateOneLinkURL({
                    oneLinkURL: n,
                    afParameters: {
                      mediaSource: {
                        keys: ["utm_source"],
                        overrideValues: a,
                        defaultValue: l,
                      },
                      campaign: {
                        keys: ["utm_campaign"],
                        defaultValue: "landing",
                      },
                      afSub1: { keys: ["gclid"] },
                      afSub2: { keys: ["utm_term"] },
                      afSub3: { keys: ["utm_content"] },
                      ...(d
                        ? {
                            afCustom: [
                              {
                                paramKey: "af_web_dp",
                                defaultValue: encodeURIComponent(d),
                              },
                            ],
                          }
                        : {}),
                    },
                  });
                  return (!e && r?.clickURL && m(r.clickURL), !0);
                };
              if (t()) return;
              let r = Date.now(),
                i = window.setInterval(() => {
                  (e || t() || Date.now() - r > 1e4) && window.clearInterval(i);
                }, 200);
              return () => {
                ((e = !0), window.clearInterval(i));
              };
            }),
            (c = [d]),
            (u[2] = d),
            (u[3] = o),
            (u[4] = c))
          : ((o = u[3]), (c = u[4])),
        (0, r.useEffect)(o, c),
        f
      );
    },
  ]);
};
