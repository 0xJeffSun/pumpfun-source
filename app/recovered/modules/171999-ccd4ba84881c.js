// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(r) => {
  var e = r.i(732486),
    o = r.i(161541),
    i = r.i(748117),
    a = r.i(335341);
  (r.i(352386), r.i(252494));
  let l = ({ onClose: r }) =>
      (0, e.jsx)(a.S, {
        title: "Could not log in with provider",
        subtitle:
          "It looks like you're using an in-app browser. To log in, please try again using an external browser.",
        icon: o.f,
        primaryCta: { label: "Close", onClick: r },
        watermark: !0,
      }),
    n = {
      component: () => {
        let { closePrivyModal: r } = (0, i.u)();
        return (0, e.jsx)(l, { onClose: () => r() });
      },
    };
  r.s([
    "InAppBrowserLoginNotPossible",
    0,
    n,
    "InAppBrowserLoginNotPossibleView",
    0,
    l,
    "default",
    0,
    n,
  ]);
};
