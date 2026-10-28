// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(r) => {
  var e = r.i(732486),
    o = r.i(814763),
    i = r.i(269722);
  let a = (0, r.i(78048).f)("cloud-upload", [
    ["path", { d: "M12 13v8", key: "1l5pq0" }],
    [
      "path",
      {
        d: "M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242",
        key: "1pljnt",
      },
    ],
    ["path", { d: "m8 17 4-4 4 4", key: "1quai1" }],
  ]);
  var l = r.i(352386),
    n = r.i(440527),
    t = r.i(933185),
    c = r.i(565530),
    s = r.i(748117),
    d = r.i(636447),
    v = r.i(335341);
  r.i(252494);
  let p = ({
      appName: r,
      address: l,
      success: t,
      error: c,
      onAccept: s,
      onDecline: d,
      onClose: p,
    }) =>
      (0, e.jsx)(
        v.S,
        t || c
          ? {
              title: c ? "Something went wrong" : "Success!",
              subtitle: c
                ? "Please try again."
                : `You've successfully granted delegated action permissions to ${r}.`,
              icon: c ? o.f : i.f,
              iconVariant: c ? "error" : "success",
              onBack: p,
              watermark: !0,
            }
          : {
              title: "Enable offline access",
              subtitle: `By confirming, ${r} will be able to use your wallet for you even when you're not around. You can revoke this later.`,
              icon: a,
              primaryCta: { label: "Accept", onClick: s },
              secondaryCta: { label: "Not now", onClick: d },
              onBack: p,
              watermark: !0,
              children: (0, e.jsx)(n.W, { address: l, title: "Wallet" }),
            },
      ),
    h = {
      component: () => {
        let { data: r } = (0, d.u)(),
          o = (0, t.a)(),
          { closePrivyModal: i } = (0, s.u)(),
          [a, n] = (0, l.useState)(!1),
          [v, h] = (0, l.useState)(),
          {
            address: u,
            onDelegate: g,
            onSuccess: f,
            onError: x,
          } = r.delegatedActions.consent,
          b = async () => {
            (a ? f() : x(v ?? new c.P("User declined delegating actions.")),
              i({ shouldCallAuthOnSuccess: !1 }));
          };
        return (
          (0, l.useEffect)(() => {
            if (!a && !v) return;
            let r = setTimeout(b, t.T);
            return () => clearTimeout(r);
          }, [a, v]),
          (0, e.jsx)(p, {
            appName: o.name,
            address: u,
            success: a,
            error: v,
            onAccept: async () => {
              try {
                (await g(), n(!0));
              } catch (r) {
                h(r);
              }
            },
            onDecline: () => {
              b();
            },
            onClose: b,
          })
        );
      },
    };
  r.s(
    [
      "DelegatedActionsConsentScreen",
      0,
      h,
      "DelegatedActionsConsentScreenView",
      0,
      p,
      "default",
      0,
      h,
    ],
    754370,
  );
};
