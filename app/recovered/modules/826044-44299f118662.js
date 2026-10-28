// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(r) => {
  var e = r.i(732486),
    o = r.i(814763),
    i = r.i(269722);
  let a = (0, r.i(78048).f)("ban", [
    ["path", { d: "M4.929 4.929 19.07 19.071", key: "196cmz" }],
    ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ]);
  var l = r.i(352386),
    n = r.i(933185),
    t = r.i(565530),
    c = r.i(748117),
    d = r.i(636447),
    s = r.i(335341);
  r.i(252494);
  let v = ({
      appName: r,
      success: l,
      error: n,
      onRevoke: t,
      onDeny: c,
      onClose: d,
    }) =>
      (0, e.jsx)(
        s.S,
        l || n
          ? {
              title: n ? "Something went wrong" : "Success!",
              subtitle: n
                ? "Please try again."
                : "You've successfully revoked permissions.",
              icon: n ? o.f : i.f,
              iconVariant: n ? "error" : "success",
              onBack: d,
              watermark: !0,
            }
          : {
              title: "Revoke offline access to wallet",
              subtitle: `By confirming, ${r} will no longer be able to use this wallet on your behalf when you are not online.`,
              icon: a,
              primaryCta: { label: "Confirm", onClick: t },
              secondaryCta: { label: "Deny", onClick: c },
              onBack: d,
              watermark: !0,
            },
      ),
    p = {
      component: () => {
        let { data: r } = (0, d.u)(),
          o = (0, n.a)(),
          { closePrivyModal: i } = (0, c.u)(),
          [a, s] = (0, l.useState)(!1),
          [p, u] = (0, l.useState)(),
          { onRevoke: h, onSuccess: g, onError: b } = r.delegatedActions.revoke,
          f = async () => {
            (a
              ? g()
              : b(
                  p ??
                    new t.P(
                      "User declined revoking access to their delegated wallet.",
                    ),
                ),
              i({ shouldCallAuthOnSuccess: !1 }));
          };
        return (
          (0, l.useEffect)(() => {
            if (!a && !p) return;
            let r = setTimeout(f, n.T);
            return () => clearTimeout(r);
          }, [a, p]),
          (0, e.jsx)(v, {
            appName: o.name,
            success: a,
            error: p,
            onRevoke: async () => {
              try {
                (await h(), s(!0));
              } catch (r) {
                u(r);
              }
            },
            onDeny: () => {
              f();
            },
            onClose: f,
          })
        );
      },
    };
  r.s(
    [
      "DelegatedActionsRevokeScreen",
      0,
      p,
      "DelegatedActionsRevokeScreenView",
      0,
      v,
      "default",
      0,
      p,
    ],
    826044,
  );
};
