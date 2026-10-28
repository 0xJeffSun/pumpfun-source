// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var r = e.i(732486),
    i = e.i(292632),
    o = e.i(352386),
    a = e.i(689391),
    t = e.i(933185),
    l = e.i(616800),
    n = e.i(748117),
    s = e.i(636447),
    c = e.i(315430),
    d = e.i(336291),
    p = e.i(995040),
    h = e.i(23915),
    g = e.i(305869),
    u = e.i(294882);
  let v = (0, o.forwardRef)((e, a) => {
      let [g, v] = (0, o.useState)(e.defaultValue || ""),
        [b, y] = (0, o.useState)(""),
        [w, C] = (0, o.useState)(!1),
        { authenticated: j } = (0, t.u)(),
        { initLoginWithEmail: A } = (0, n.u)(),
        {
          navigate: k,
          setModalData: M,
          currentScreen: S,
          data: z,
        } = (0, s.u)(),
        { enabled: L, token: E } = (0, l.a)(),
        [B, T] = (0, o.useState)(!1),
        { accountType: H } = (0, c.h)(),
        V = (0, t.a)(),
        D =
          (0, d.v)(g) &&
          (V.disablePlusEmails && g.includes("+")
            ? (b || y("Please enter a valid email address without a '+'."), !1)
            : (b && y(""), !0)),
        F = w || !D,
        W = () => {
          F ||
            (M({ login: z?.login, inlineError: void 0 }),
            !L || E || j
              ? (C(!0),
                A({
                  email: g,
                  captchaToken: E,
                  disableSignup: z?.login?.disableSignup,
                  withPrivyUi: !0,
                })
                  .then(() => {
                    k("AwaitingPasswordlessCodeScreen");
                  })
                  .catch((e) => {
                    (M({
                      errorModalData: {
                        error: e,
                        previousScreen: S || "LandingScreen",
                      },
                    }),
                      k("ErrorScreen"));
                  })
                  .finally(() => {
                    C(!1);
                  }))
              : (M({
                  captchaModalData: {
                    callback: (e) =>
                      A({ email: g, captchaToken: e, withPrivyUi: !0 }),
                    userIntentRequired: !1,
                    onSuccessNavigateTo: "AwaitingPasswordlessCodeScreen",
                    onErrorNavigateTo: "ErrorScreen",
                  },
                }),
                k("CaptchaScreen")));
        };
      return (0, r.jsxs)(r.Fragment, {
        children: [
          (0, r.jsxs)(f, {
            children: [
              b &&
                (0, r.jsx)(u.E, {
                  style: {
                    display: "block",
                    marginTop: "0.25rem",
                    textAlign: "left",
                  },
                  children: b,
                }),
              (0, r.jsxs)(x, {
                stacked: e.stacked,
                $error: !!b,
                children: [
                  (0, r.jsx)(m, { children: (0, r.jsx)(i.f, {}) }),
                  (0, r.jsx)("input", {
                    ref: a,
                    id: "email-input",
                    className: "login-method-button",
                    type: "email",
                    placeholder: "your@email.com",
                    onFocus: () => T(!0),
                    onChange: (e) => v(e.target.value),
                    onKeyUp: (e) => {
                      "Enter" === e.key && W();
                    },
                    value: g,
                    autoComplete: "email",
                  }),
                  "email" !== H || B
                    ? e.stacked
                      ? (0, r.jsx)("span", {})
                      : (0, r.jsx)(p.E, {
                          isSubmitting: w,
                          onClick: W,
                          disabled: F,
                          children: "Submit",
                        })
                    : (0, r.jsx)(h.C, { color: "gray", children: "Recent" }),
                ],
              }),
            ],
          }),
          e.stacked
            ? (0, r.jsx)(p.P, {
                loadingText: null,
                loading: w,
                disabled: F,
                onClick: W,
                style: { width: "100%" },
                children: "Submit",
              })
            : null,
        ],
      });
    }),
    f = g.I,
    x = g.a,
    m = (0, a.z)(c.m)`
  display: inline-flex;
`;
  e.s(["C", 0, v]);
};
