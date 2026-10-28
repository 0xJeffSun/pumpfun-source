// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(r) => {
  var e = r.i(732486);
  let o = (0, r.i(78048).f)("circle-question-mark", [
    ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
    ["path", { d: "M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3", key: "1u773s" }],
    ["path", { d: "M12 17h.01", key: "p32p05" }],
  ]);
  var i = r.i(933185),
    a = r.i(748117),
    l = r.i(636447),
    n = r.i(335341);
  (r.i(352386), r.i(252494));
  let t = ({
      title: r = "Account not found",
      subtitle: i,
      appName: a = "this app",
      ctaText: l = "Try logging in again",
      onRetry: t,
    }) =>
      (0, e.jsx)(n.S, {
        title: r,
        subtitle:
          i ||
          `Please try logging in again or go to ${a} to create an account.`,
        icon: o,
        iconVariant: "warning",
        primaryCta: { label: l, onClick: t },
        watermark: !0,
      }),
    c = {
      component: () => {
        let { navigate: r, setModalData: o, data: n } = (0, l.u)(),
          c = (0, i.a)(),
          { getAuthMeta: d, client: s } = (0, a.u)();
        return (0, e.jsx)(t, {
          appName: c?.name,
          onRetry: () => {
            let e = d();
            (o({
              ...n,
              login: {
                ...n?.login,
                ...(e?.disableSignup ? { disableSignup: !0 } : {}),
              },
            }),
              s?.authFlow && (s.authFlow = void 0),
              r("LandingScreen"));
          },
        });
      },
    };
  r.s(
    [
      "AccountNotFoundScreen",
      0,
      c,
      "AccountNotFoundScreenView",
      0,
      t,
      "default",
      0,
      c,
    ],
    785087,
  );
};
