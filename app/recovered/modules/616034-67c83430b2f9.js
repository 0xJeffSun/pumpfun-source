// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(r) => {
  var e = r.i(732486),
    o = r.i(518527),
    i = r.i(352386),
    a = r.i(743911),
    n = r.i(748117),
    l = r.i(636447),
    t = r.i(933185),
    c = r.i(335341);
  (r.i(785373), r.i(768820), r.i(252494));
  let d = ({
      title: r = "Update your phone number",
      subtitle:
        n = "Add the phone number you'd like to use going forward. We'll send you a confirmation code",
      onSubmit: l,
      isSubmitting: t = !1,
    }) => {
      let [d, s] = (0, i.useState)(null);
      return (0, e.jsx)(c.S, {
        title: r,
        subtitle: n,
        icon: o.f,
        primaryCta: {
          label: t ? "Submitting" : "Update",
          onClick: async () => {
            d?.qualifiedPhoneNumber && (await l(d));
          },
          disabled: !d?.isValid || t,
        },
        watermark: !0,
        children: (0, e.jsx)(a.C, {
          onChange: (r) => {
            s(r);
          },
          onSubmit: async () => {},
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
          } = (0, l.u)(),
          { user: s } = (0, t.u)(),
          { initUpdatePhone: v } = (0, n.u)(),
          [p, u] = (0, i.useState)(!1);
        return (0, e.jsx)(d, {
          onSubmit: async (e) => {
            u(!0);
            try {
              if (!s?.phone?.number)
                throw Error(
                  "User is required to have an phone number to update it.",
                );
              (await v(s?.phone?.number, e.qualifiedPhoneNumber),
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
  r.s([
    "UpdatePhoneScreen",
    0,
    s,
    "UpdatePhoneScreenView",
    0,
    d,
    "default",
    0,
    s,
  ]);
};
