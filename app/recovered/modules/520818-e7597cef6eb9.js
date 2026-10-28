// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(r) => {
  var e = r.i(732486),
    o = r.i(292632),
    i = r.i(352386),
    a = r.i(689391),
    l = r.i(933185),
    t = r.i(616800),
    n = r.i(748117),
    c = r.i(636447),
    d = r.i(315430),
    s = r.i(336291),
    v = r.i(995040),
    p = r.i(23915),
    u = r.i(305869),
    h = r.i(294882);
  let g = (0, i.forwardRef)((r, a) => {
      let [u, g] = (0, i.useState)(r.defaultValue || ""),
        [y, m] = (0, i.useState)(""),
        [k, w] = (0, i.useState)(!1),
        { authenticated: j } = (0, l.u)(),
        { initLoginWithEmail: z } = (0, n.u)(),
        {
          navigate: $,
          setModalData: C,
          currentScreen: S,
          data: E,
        } = (0, c.u)(),
        { enabled: M, token: L } = (0, t.a)(),
        [Z, A] = (0, i.useState)(!1),
        { accountType: B } = (0, d.h)(),
        T = (0, l.a)(),
        V =
          (0, s.v)(u) &&
          (T.disablePlusEmails && u.includes("+")
            ? (y || m("Please enter a valid email address without a '+'."), !1)
            : (y && m(""), !0)),
        F = k || !V,
        N = () => {
          F ||
            (C({ login: E?.login, inlineError: void 0 }),
            !M || L || j
              ? (w(!0),
                z({
                  email: u,
                  captchaToken: L,
                  disableSignup: E?.login?.disableSignup,
                  withPrivyUi: !0,
                })
                  .then(() => {
                    $("AwaitingPasswordlessCodeScreen");
                  })
                  .catch((r) => {
                    (C({
                      errorModalData: {
                        error: r,
                        previousScreen: S || "LandingScreen",
                      },
                    }),
                      $("ErrorScreen"));
                  })
                  .finally(() => {
                    w(!1);
                  }))
              : (C({
                  captchaModalData: {
                    callback: (r) =>
                      z({ email: u, captchaToken: r, withPrivyUi: !0 }),
                    userIntentRequired: !1,
                    onSuccessNavigateTo: "AwaitingPasswordlessCodeScreen",
                    onErrorNavigateTo: "ErrorScreen",
                  },
                }),
                $("CaptchaScreen")));
        };
      return (0, e.jsxs)(e.Fragment, {
        children: [
          (0, e.jsxs)(b, {
            children: [
              y &&
                (0, e.jsx)(h.E, {
                  style: {
                    display: "block",
                    marginTop: "0.25rem",
                    textAlign: "left",
                  },
                  children: y,
                }),
              (0, e.jsxs)(x, {
                stacked: r.stacked,
                $error: !!y,
                children: [
                  (0, e.jsx)(f, { children: (0, e.jsx)(o.f, {}) }),
                  (0, e.jsx)("input", {
                    ref: a,
                    id: "email-input",
                    className: "login-method-button",
                    type: "email",
                    placeholder: "your@email.com",
                    onFocus: () => A(!0),
                    onChange: (r) => g(r.target.value),
                    onKeyUp: (r) => {
                      "Enter" === r.key && N();
                    },
                    value: u,
                    autoComplete: "email",
                  }),
                  "email" !== B || Z
                    ? r.stacked
                      ? (0, e.jsx)("span", {})
                      : (0, e.jsx)(v.E, {
                          isSubmitting: k,
                          onClick: N,
                          disabled: F,
                          children: "Submit",
                        })
                    : (0, e.jsx)(p.C, { color: "gray", children: "Recent" }),
                ],
              }),
            ],
          }),
          r.stacked
            ? (0, e.jsx)(v.P, {
                loadingText: null,
                loading: k,
                disabled: F,
                onClick: N,
                style: { width: "100%" },
                children: "Submit",
              })
            : null,
        ],
      });
    }),
    b = u.I,
    x = u.a,
    f = (0, a.z)(d.m)`
  display: inline-flex;
`;
  r.s(["C", 0, g]);
};
