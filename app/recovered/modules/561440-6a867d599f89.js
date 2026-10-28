// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(r) => {
  var e = r.i(732486),
    o = r.i(465120);
  r.i(352386);
  var i = r.i(933185),
    a = r.i(636447),
    l = r.i(839094),
    n = r.i(335341);
  r.i(252494);
  let t = ({
      title: r = "You don't have access to this app",
      subtitle: i = "Have you been invited?",
      ctaText: a = "Try another account",
      ctaLink: t,
      onCtaClick: c,
    }) =>
      (0, e.jsx)(n.S, {
        title: r,
        subtitle: i,
        icon: o.f,
        iconVariant: "warning",
        primaryCta: {
          label: a,
          onClick: () => {
            let r = (0, l.t)(t);
            r ? window.open(r, "_blank", "noopener,noreferrer") : c?.();
          },
        },
        watermark: !0,
      }),
    c = {
      component: () => {
        let { navigate: r } = (0, a.u)(),
          o = (0, i.a)(),
          l =
            o?.allowlistConfig.errorTitle ||
            "You don't have access to this app",
          n = o?.allowlistConfig.errorDetail || "Have you been invited?",
          c = o?.allowlistConfig.errorCtaText || "Try another account",
          d = o?.allowlistConfig.errorCtaLink;
        return (0, e.jsx)(t, {
          title: l,
          subtitle: n,
          ctaText: c,
          ctaLink: d ?? void 0,
          onCtaClick: () => {
            r("LandingScreen");
          },
        });
      },
    };
  r.s([
    "AllowlistRejectionScreen",
    0,
    c,
    "AllowlistRejectionScreenView",
    0,
    t,
    "default",
    0,
    c,
  ]);
};
