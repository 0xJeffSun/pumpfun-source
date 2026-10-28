// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(r) => {
  var e = r.i(732486),
    o = r.i(518527),
    i = r.i(352386),
    a = r.i(743911),
    n = r.i(933185),
    l = r.i(748117),
    t = r.i(636447),
    c = r.i(335341);
  (r.i(785373), r.i(768820), r.i(252494));
  let d = ({
      title: r = "Connect your phone",
      subtitle: n = "Add your number to your account",
      onSubmit: l,
      isSubmitting: t = !1,
    }) => {
      let [d, s] = (0, i.useState)(null),
        v = async () => {
          d?.qualifiedPhoneNumber && (await l(d));
        };
      return (0, e.jsx)(c.S, {
        title: r,
        subtitle: n,
        icon: o.f,
        primaryCta: {
          label: t ? "Submitting" : "Submit",
          onClick: v,
          disabled: !d?.isValid || t,
        },
        watermark: !0,
        children: (0, e.jsx)(a.C, {
          onChange: (r) => {
            s(r);
          },
          onSubmit: v,
          noIncludeSubmitButton: !0,
          hideRecent: !0,
        }),
      });
    },
    s = {
      component: () => {
        let {
            currentScreen: r,
            data: o,
            navigate: a,
            setModalData: c,
          } = (0, t.u)(),
          s = (0, n.a)(),
          { initLoginWithSms: v } = (0, l.u)(),
          [p, u] = (0, i.useState)(!1);
        return (0, e.jsx)(d, {
          subtitle: `Add your number to your ${s?.name} account`,
          onSubmit: async (e) => {
            u(!0);
            try {
              (await v({
                phoneNumber: e.qualifiedPhoneNumber,
                withPrivyUi: !0,
              }),
                a("AwaitingPasswordlessCodeScreen"));
            } catch (e) {
              (c({
                errorModalData: {
                  error: e,
                  previousScreen:
                    o?.errorModalData?.previousScreen || r || "LinkPhoneScreen",
                },
              }),
                a("ErrorScreen"));
            } finally {
              u(!1);
            }
          },
          isSubmitting: p,
        });
      },
    };
  r.s(["LinkPhoneScreen", 0, s, "LinkPhoneScreenView", 0, d, "default", 0, s]);
};
