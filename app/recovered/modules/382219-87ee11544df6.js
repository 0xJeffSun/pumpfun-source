// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(r) => {
  var e = r.i(732486),
    o = r.i(636447),
    i = r.i(335341);
  (r.i(352386), r.i(252494));
  let a = ({ style: r, ...o }) =>
      (0, e.jsx)("svg", {
        width: "40",
        height: "40",
        viewBox: "0 0 40 40",
        fill: "none",
        xmlns: "http://www.w3.org/2000/svg",
        style: { height: "38px", width: "38px", ...r },
        ...o,
        children: (0, e.jsx)("path", {
          d: "M20 13.6V20M20 26.4H20.016M36 20C36 28.8365 28.8366 36 20 36C11.1635 36 4.00001 28.8365 4.00001 20C4.00001 11.1634 11.1635 3.99999 20 3.99999C28.8366 3.99999 36 11.1634 36 20Z",
          stroke: "currentColor",
          strokeWidth: "3.2",
          strokeLinecap: "round",
          strokeLinejoin: "round",
        }),
      }),
    l = ({
      title: r = "Unable to sign in",
      subtitle:
        o = "This is a test application that has reached its user limit. To allow more users, this app needs to be upgraded to production.",
      onGoBack: l,
    }) =>
      (0, e.jsx)(i.S, {
        title: r,
        subtitle: o,
        icon: a,
        iconVariant: "subtle",
        primaryCta: { label: "Go back", onClick: l },
        showBack: !0,
        onBack: l,
        watermark: !0,
      }),
    n = {
      component: () => {
        let { navigate: r } = (0, o.u)();
        return (0, e.jsx)(l, {
          onGoBack: () => {
            r("LandingScreen");
          },
        });
      },
    };
  r.s([
    "UserLimitReachedScreen",
    0,
    n,
    "UserLimitReachedScreenView",
    0,
    l,
    "default",
    0,
    n,
  ]);
};
