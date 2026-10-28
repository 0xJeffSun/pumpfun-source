// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(r) => {
  var e = r.i(732486),
    o = r.i(572280),
    i = r.i(748117),
    a = r.i(636447),
    l = r.i(335341);
  (r.i(352386), r.i(252494));
  let n = ({
      title: r = "Could not connect with wallet",
      subtitle:
        i = "Please check that Phantom multichain is enabled and try again.",
      primaryCtaText: a = "Try again",
      secondaryCtaText: n = "Cancel",
      onTryAgain: t,
      onCancel: c,
    }) =>
      (0, e.jsx)(l.S, {
        title: r,
        subtitle: i,
        icon: o.f,
        iconVariant: "error",
        primaryCta: { label: a, onClick: t },
        secondaryCta: { label: n, onClick: c },
        watermark: !0,
      }),
    t = {
      component: () => {
        let { closePrivyModal: r } = (0, i.u)(),
          { navigate: o } = (0, a.u)();
        return (0, e.jsx)(n, {
          onTryAgain: () => {
            o("LandingScreen");
          },
          onCancel: async () => {
            await r();
          },
        });
      },
    };
  r.s([
    "LoginFailedScreen",
    0,
    t,
    "LoginFailedScreenView",
    0,
    n,
    "default",
    0,
    t,
  ]);
};
