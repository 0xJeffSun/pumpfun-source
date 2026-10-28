// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(r) => {
  var e = r.i(732486),
    o = r.i(672082),
    i = r.i(727472),
    a = r.i(292632),
    l = r.i(352386),
    t = r.i(933185),
    n = r.i(616800),
    d = r.i(748117),
    c = r.i(636447),
    s = r.i(315430),
    p = r.i(336291),
    v = r.i(995040),
    u = r.i(305869),
    h = r.i(294882),
    g = r.i(335341);
  (r.i(252494), r.i(785373), r.i(768820), r.i(535391));
  let b = () => {
      let [r, o] = (0, l.useState)(""),
        [i, g] = (0, l.useState)(""),
        [b, x] = (0, l.useState)(!1),
        { authenticated: f, user: y } = (0, t.u)(),
        { initUpdateEmail: m } = (0, d.u)(),
        { navigate: w, setModalData: k, currentScreen: j } = (0, c.u)(),
        { enabled: z, token: $ } = (0, n.a)(),
        C = (0, t.a)(),
        S =
          (0, p.v)(r) &&
          (C.disablePlusEmails && r.includes("+")
            ? (i || g("Please enter a valid email address without a '+'."), !1)
            : (i && g(""), !0)),
        E = b || !S,
        M = () => {
          E ||
            (!z || $ || f
              ? (async (e) => {
                  if (!y?.email)
                    throw Error(
                      "User is required to have an email address to update it.",
                    );
                  x(!0);
                  try {
                    (await m({
                      oldAddress: y.email.address,
                      newAddress: r,
                      captchaToken: e,
                    }),
                      w("AwaitingPasswordlessCodeScreen"));
                  } catch (r) {
                    (k({
                      errorModalData: {
                        error: r,
                        previousScreen: j || "LandingScreen",
                      },
                    }),
                      w("ErrorScreen"));
                  }
                  x(!1);
                })($)
              : (k({
                  captchaModalData: {
                    callback: (e) => {
                      if (!y?.email)
                        throw Error(
                          "User is required to have an email address to update it.",
                        );
                      return m({
                        oldAddress: y.email.address,
                        newAddress: r,
                        captchaToken: e,
                      });
                    },
                    userIntentRequired: !1,
                    onSuccessNavigateTo: "AwaitingPasswordlessCodeScreen",
                    onErrorNavigateTo: "ErrorScreen",
                  },
                }),
                w("CaptchaScreen")));
        };
      return (0, e.jsxs)(e.Fragment, {
        children: [
          (0, e.jsxs)(u.I, {
            children: [
              i &&
                (0, e.jsx)(h.E, {
                  style: { marginTop: "0.25rem", textAlign: "left" },
                  children: i,
                }),
              (0, e.jsxs)(u.E, {
                $error: !!i,
                children: [
                  (0, e.jsx)(s.m, { children: (0, e.jsx)(a.f, {}) }),
                  (0, e.jsx)("input", {
                    id: "email-input",
                    type: "email",
                    placeholder: "your@email.com",
                    onChange: (r) => o(r.target.value),
                    onKeyUp: (r) => {
                      "Enter" === r.key && M();
                    },
                    value: r,
                    autoComplete: "email",
                  }),
                ],
              }),
            ],
          }),
          (0, e.jsx)(v.P, {
            loadingText: null,
            loading: b,
            disabled: E,
            onClick: M,
            style: { width: "100%" },
            children: "Submit",
          }),
        ],
      });
    },
    x = ({
      title: r = "Update your email",
      subtitle:
        a = "Add the email address you'd like to use going forward. We'll send you a confirmation code",
    }) =>
      (0, e.jsx)(g.S, {
        title: r,
        subtitle: a,
        icon: o.f,
        watermark: !0,
        children: (0, e.jsx)(i.B, { children: (0, e.jsx)(b, {}) }),
      }),
    f = { component: () => (0, e.jsx)(x, {}) };
  r.s([
    "UpdateEmailScreen",
    0,
    f,
    "UpdateEmailScreenView",
    0,
    x,
    "default",
    0,
    f,
  ]);
};
