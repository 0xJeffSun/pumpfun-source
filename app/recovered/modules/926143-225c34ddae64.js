// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var o = e.i(732486),
    n = e.i(839326),
    r = e.i(494780),
    t = e.i(352386);
  let i = t.forwardRef(function ({ title: e, titleId: o, ...n }, r) {
      return t.createElement(
        "svg",
        Object.assign(
          {
            xmlns: "http://www.w3.org/2000/svg",
            viewBox: "0 0 24 24",
            fill: "currentColor",
            "aria-hidden": "true",
            "data-slot": "icon",
            ref: r,
            "aria-labelledby": o,
          },
          n,
        ),
        e ? t.createElement("title", { id: o }, e) : null,
        t.createElement("path", {
          fillRule: "evenodd",
          d: "M8.603 3.799A4.49 4.49 0 0 1 12 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 0 1 3.498 1.307 4.491 4.491 0 0 1 1.307 3.497A4.49 4.49 0 0 1 21.75 12a4.49 4.49 0 0 1-1.549 3.397 4.491 4.491 0 0 1-1.307 3.497 4.491 4.491 0 0 1-3.497 1.307A4.49 4.49 0 0 1 12 21.75a4.49 4.49 0 0 1-3.397-1.549 4.49 4.49 0 0 1-3.498-1.306 4.491 4.491 0 0 1-1.307-3.498A4.49 4.49 0 0 1 2.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 0 1 1.307-3.497 4.49 4.49 0 0 1 3.497-1.307Zm7.007 6.387a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z",
          clipRule: "evenodd",
        }),
      );
    }),
    l = t.forwardRef(function ({ title: e, titleId: o, ...n }, r) {
      return t.createElement(
        "svg",
        Object.assign(
          {
            xmlns: "http://www.w3.org/2000/svg",
            viewBox: "0 0 24 24",
            fill: "currentColor",
            "aria-hidden": "true",
            "data-slot": "icon",
            ref: r,
            "aria-labelledby": o,
          },
          n,
        ),
        e ? t.createElement("title", { id: o }, e) : null,
        t.createElement("path", {
          d: "M10.5 18.75a.75.75 0 0 0 0 1.5h3a.75.75 0 0 0 0-1.5h-3Z",
        }),
        t.createElement("path", {
          fillRule: "evenodd",
          d: "M8.625.75A3.375 3.375 0 0 0 5.25 4.125v15.75a3.375 3.375 0 0 0 3.375 3.375h6.75a3.375 3.375 0 0 0 3.375-3.375V4.125A3.375 3.375 0 0 0 15.375.75h-6.75ZM7.5 4.125C7.5 3.504 8.004 3 8.625 3H9.75v.375c0 .621.504 1.125 1.125 1.125h2.25c.621 0 1.125-.504 1.125-1.125V3h1.125c.621 0 1.125.504 1.125 1.125v15.75c0 .621-.504 1.125-1.125 1.125h-6.75A1.125 1.125 0 0 1 7.5 19.875V4.125Z",
          clipRule: "evenodd",
        }),
      );
    });
  var a = e.i(995040),
    s = e.i(541021),
    c = e.i(25047),
    d = e.i(933185),
    u = e.i(748117),
    h = e.i(636447),
    m = e.i(616800),
    p = e.i(266794),
    x = e.i(927035),
    f = e.i(518527),
    g = e.i(42799),
    y = e.i(743911),
    v = e.i(668701),
    j = e.i(91488);
  (e.i(252494), e.i(785373), e.i(768820), e.i(535391), e.i(698870));
  let w = ({ appName: e, onComplete: n, onReset: r, onClose: i }) => {
      let [l, s] = (0, t.useState)(""),
        [u, p] = (0, t.useState)(!1),
        [w, b] = (0, t.useState)(null),
        [C, k] = (0, t.useState)("enroll"),
        { initEnrollmentWithSms: S, submitEnrollmentWithSms: M } = (0, m.h)(),
        { data: E } = (0, h.u)(),
        $ = (0, d.a)();
      function P() {
        (E?.mfaEnrollmentFlow?.onSuccess(), n());
      }
      return w
        ? (0, o.jsx)(j.ErrorScreenView, {
            allowlistConfig: $.allowlistConfig,
            error: w,
            onBack: () => b(null),
            onRetry: () => b(null),
          })
        : (0, o.jsxs)(
            o.Fragment,
            "enroll" === C
              ? {
                  children: [
                    (0, o.jsx)(a.M, { backFn: r, onClose: i }, "header"),
                    (0, o.jsx)(v.I, {
                      style: { marginBottom: "1.5rem" },
                      children: (0, o.jsx)(f.f, {}),
                    }),
                    (0, o.jsx)(v.T, { children: "Set up SMS verification" }),
                    (0, o.jsxs)(v.S, {
                      children: [
                        "We'll text a verification code to this mobile device whenever you use your ",
                        e,
                        " ",
                        "wallet.",
                      ],
                    }),
                    (0, o.jsxs)(v.C, {
                      children: [
                        (0, o.jsx)(y.C, {
                          onSubmit: async function ({
                            qualifiedPhoneNumber: e,
                          }) {
                            try {
                              (await S({ phoneNumber: e }), s(e), k("verify"));
                            } catch (e) {
                              b(e);
                            }
                          },
                          hideRecent: !0,
                        }),
                        (0, o.jsxs)(v.c, {
                          children: [
                            "By providing your mobile number, you agree to receive text messages from ",
                            $?.name,
                            ". Some carrier charges may apply",
                          ],
                        }),
                      ],
                    }),
                    (0, o.jsx)(c.M, {}),
                  ],
                }
              : u
                ? {
                    children: [
                      (0, o.jsx)(a.M, { onClose: P }, "header"),
                      (0, o.jsx)(v.I, {
                        style: { marginBottom: "1.5rem" },
                        children: (0, o.jsx)(x.f, {}),
                      }),
                      (0, o.jsx)(v.T, { children: "SMS verification added" }),
                      (0, o.jsxs)(v.S, {
                        children: [
                          "From now on, you'll enter the verification code sent to your mobile device whenever you use your ",
                          e,
                          " wallet.",
                        ],
                      }),
                      (0, o.jsx)(v.B, {
                        children: (0, o.jsx)(a.P, {
                          onClick: P,
                          children: "Done",
                        }),
                      }),
                      (0, o.jsx)(c.M, {}),
                    ],
                  }
                : {
                    children: [
                      (0, o.jsx)(
                        a.M,
                        {
                          backFn: function () {
                            "verify" === C ? k("enroll") : r();
                          },
                          onClose: i,
                        },
                        "header",
                      ),
                      (0, o.jsx)(v.I, {
                        style: { marginBottom: "1.5rem" },
                        children: (0, o.jsx)(f.f, {}),
                      }),
                      (0, o.jsx)(v.T, { children: "Enter enrollment code" }),
                      (0, o.jsxs)(v.C, {
                        children: [
                          (0, o.jsx)(v.N, {
                            onChange: async function (e) {
                              try {
                                if (!e) return;
                                (await M({ phoneNumber: l, mfaCode: e }),
                                  p(!0));
                              } catch (e) {
                                if ((0, m.i)(e))
                                  throw Error(
                                    "You have exceeded the maximum number of attempts. Please close this window and try again in 10 seconds.",
                                  );
                                if ((0, m.d)(e))
                                  throw Error(
                                    "The code you entered is not valid",
                                  );
                                if ((0, m.f)(e))
                                  throw Error(
                                    "You have exceeded the time limit for code entry. Please try again in 30 seconds.",
                                  );
                                throw (0, m.j)(e)
                                  ? Error("Verification canceled")
                                  : Error("Unknown error");
                              }
                            },
                          }),
                          (0, o.jsxs)(v.S, {
                            children: [
                              "To continue, enter the 6-digit code sent to ",
                              (0, o.jsx)("strong", { children: (0, g.q)(l) }),
                            ],
                          }),
                        ],
                      }),
                      (0, o.jsx)(c.M, {}),
                    ],
                  },
          );
    },
    b = {
      component: () => {
        let { user: e, enrollInMfa: x, ready: f } = (0, d.u)(),
          [g, y] = (0, t.useState)(null),
          {
            unenrollWithSms: j,
            unenrollWithTotp: b,
            unenrollWithPasskey: C,
            submitEnrollmentWithTotp: k,
            initEnrollmentWithPasskey: S,
            submitEnrollmentWithPasskey: M,
            initEnrollmentWithTotp: E,
          } = (0, m.h)(),
          { data: $, onUserCloseViaDialogOrKeybindRef: P } = (0, h.u)(),
          F = (0, d.a)(),
          { closePrivyModal: R } = (0, u.u)(),
          { promptMfa: T } = (0, m.u)(),
          [B, A] = (0, t.useState)(!1),
          [L, N] = (0, t.useState)(null),
          [I, U] = (0, t.useState)(null),
          W = () => {
            (R({ shouldCallAuthOnSuccess: !0 }),
              x(!1),
              setTimeout(() => {
                (y(null), N(null));
              }, 500));
          },
          [V, O] = (0, t.useState)(!1),
          [z, q] = (0, t.useState)();
        P.current = W;
        let Z = e?.mfaMethods.includes("sms"),
          D = !!e?.phone,
          K = e?.mfaMethods.includes("totp"),
          Y = e?.mfaMethods.includes("passkey"),
          H = Z || K || Y,
          G =
            e?.linkedAccounts
              .filter((e) => "passkey" === e.type)
              .map((e) => e.credentialId) ?? [];
        function J() {
          (y(null), N(null), q(void 0));
        }
        async function Q(e = G) {
          O(!0);
          try {
            return (
              await S(),
              await M(
                { credentialIds: e },
                {
                  removeForLogin:
                    $?.mfaEnrollmentFlow?.shouldUnlinkOnUnenrollMfa,
                },
              ),
              $?.mfaEnrollmentFlow?.onSuccess(),
              W()
            );
          } catch (e) {
            q(e);
          } finally {
            O(!1);
          }
        }
        if (
          ((0, t.useEffect)(() => {
            H && A(!0);
          }, [H]),
          !f || !e || !F)
        )
          return (0, o.jsxs)(o.Fragment, {
            children: [
              (0, o.jsx)(a.M, { onClose: W }, "header"),
              (0, o.jsx)(v.A, { children: (0, o.jsx)(p.M, {}) }),
              (0, o.jsx)(v.C, { children: (0, o.jsx)(s.L, {}) }),
              (0, o.jsx)(c.M, {}),
            ],
          });
        if ("sms" === g)
          return (0, o.jsxs)(o.Fragment, {
            children: [
              (0, o.jsx)(a.M, { backFn: J, onClose: W }, "header"),
              (0, o.jsx)(v.I, {
                style: { marginBottom: "1.5rem" },
                children: (0, o.jsx)(n.f, {}),
              }),
              (0, o.jsx)(v.T, { children: "Remove SMS verification?" }),
              (0, o.jsxs)(v.S, {
                children: [
                  "MFA adds an extra layer of security to your ",
                  F?.name,
                  " account. Make sure you have other methods to secure your account.",
                ],
              }),
              (0, o.jsx)(v.B, {
                children: (0, o.jsx)(a.P, {
                  $warn: !0,
                  onClick: async function () {
                    y(null);
                    try {
                      await j();
                    } catch (e) {
                      y(null);
                    }
                  },
                  children: "Remove",
                }),
              }),
              (0, o.jsx)(c.M, {}),
            ],
          });
        if ("totp" === g)
          return (0, o.jsxs)(o.Fragment, {
            children: [
              (0, o.jsx)(a.M, { backFn: J, onClose: W }, "header"),
              (0, o.jsx)(v.I, {
                style: { marginBottom: "1.5rem" },
                children: (0, o.jsx)(n.f, {}),
              }),
              (0, o.jsx)(v.T, {
                children: "Remove authenticator app verification?",
              }),
              (0, o.jsxs)(v.S, {
                children: [
                  "MFA adds an extra layer of security to your ",
                  F?.name,
                  " account. Make sure you have other methods to secure your account.",
                ],
              }),
              (0, o.jsx)(v.B, {
                children: (0, o.jsx)(a.P, {
                  $warn: !0,
                  onClick: async function () {
                    y(null);
                    try {
                      await b();
                    } catch (e) {
                      y(null);
                    }
                  },
                  children: "Remove",
                }),
              }),
              (0, o.jsx)(c.M, {}),
            ],
          });
        if ("passkey" === g) {
          let e = $?.mfaEnrollmentFlow?.shouldUnlinkOnUnenrollMfa ?? !0;
          return (0, o.jsxs)(o.Fragment, {
            children: [
              (0, o.jsx)(a.M, { backFn: J, onClose: W }, "header"),
              (0, o.jsx)(v.I, {
                style: { marginBottom: "1.5rem" },
                children: (0, o.jsx)(n.f, {}),
              }),
              (0, o.jsx)(v.T, {
                children: "Are you sure you want to remove this passkey?",
              }),
              (0, o.jsx)(v.S, {
                children: e
                  ? "Removing your passkey will remove as both a verification method and a login method."
                  : "Removing your passkey will remove as a verification method.",
              }),
              (0, o.jsx)(v.B, {
                children: (0, o.jsx)(a.P, {
                  $warn: !0,
                  onClick: async function () {
                    y(null);
                    try {
                      await C({
                        removeForLogin:
                          $?.mfaEnrollmentFlow?.shouldUnlinkOnUnenrollMfa,
                      });
                    } catch (e) {
                      y(null);
                    }
                  },
                  children: "Remove",
                }),
              }),
              (0, o.jsx)(c.M, {}),
            ],
          });
        }
        if (0 === $.mfaEnrollmentFlow.mfaMethods.length && !H)
          return (0, o.jsxs)(o.Fragment, {
            children: [
              (0, o.jsx)(a.M, { onClose: W }, "header"),
              (0, o.jsx)(v.I, {
                style: { marginBottom: "1.5rem" },
                children: (0, o.jsx)(r.f, {}),
              }),
              (0, o.jsx)(v.T, { children: "Add more security" }),
              (0, o.jsxs)(v.S, {
                children: [
                  F?.name,
                  " does not have any verification methods enabled.",
                ],
              }),
              (0, o.jsx)(v.B, {
                children: (0, o.jsx)(a.P, { onClick: W, children: "Close" }),
              }),
              (0, o.jsx)(c.M, {}),
            ],
          });
        let X = !H && !B;
        return X
          ? (0, o.jsxs)(o.Fragment, {
              children: [
                (0, o.jsx)(a.M, { onClose: W }, "header"),
                (0, o.jsx)(v.I, {
                  style: { marginBottom: "1.5rem" },
                  children: (0, o.jsx)(r.f, {}),
                }),
                (0, o.jsx)(v.T, { children: "Transaction Protection" }),
                (0, o.jsx)(v.S, {
                  children:
                    "Set up transaction protection to add an extra layer of security to your account",
                }),
                (0, o.jsxs)(v.L, {
                  children: [
                    (0, o.jsxs)(v.a, {
                      children: [
                        (0, o.jsx)(v.b, { children: (0, o.jsx)(i, {}) }),
                        "Enable 2-Step verification for your ",
                        F?.name,
                        " wallet.",
                      ],
                    }),
                    (0, o.jsxs)(v.a, {
                      children: [
                        (0, o.jsx)(v.b, { children: (0, o.jsx)(l, {}) }),
                        "You'll be prompted to authenticate to complete transactions.",
                      ],
                    }),
                  ],
                }),
                (0, o.jsxs)(v.B, {
                  children: [
                    (0, o.jsx)(a.P, {
                      onClick: () => A(!0),
                      children: "Continue",
                    }),
                    (0, o.jsx)(a.S, { onClick: W, children: "Not now" }),
                  ],
                }),
                (0, o.jsx)(c.M, {}),
              ],
            })
          : "sms" === L
            ? (0, o.jsx)(w, {
                appName: F?.name || "Privy",
                onComplete: W,
                onReset: J,
                onClose: W,
              })
            : "totp" === L && I
              ? (0, o.jsx)(p.E, {
                  onClose: W,
                  onReset: J,
                  submitEnrollmentWithTotp: ({ mfaCode: e }) =>
                    (async function (e) {
                      try {
                        return (
                          q(void 0),
                          await k({ mfaCode: e }),
                          $?.mfaEnrollmentFlow?.onSuccess(),
                          W()
                        );
                      } catch (e) {
                        q(e);
                      } finally {
                        y(null);
                      }
                    })(e),
                  totpInfo: { ...I, appName: F?.name || "Privy" },
                })
              : "passkey" === L
                ? (0, o.jsx)(p.a, {
                    onReset: J,
                    onClose: W,
                    submitEnrollmentWithPasskey: Q,
                  })
                : (0, o.jsx)(p.b, {
                    showIntro: X,
                    userMfaMethods: e.mfaMethods,
                    appMfaMethods: F.mfa.methods,
                    userHasAuthSms: D,
                    backFn: function () {
                      A(!1);
                    },
                    handleSelectMethod: async function (e) {
                      q(void 0);
                      try {
                        await T();
                      } catch (e) {
                        return void q(e);
                      }
                      return "totp" === e
                        ? (N(e),
                          U(null),
                          void E()
                            .then((e) => {
                              U(e);
                            })
                            .catch(() => {
                              (U(null), J());
                            }))
                        : "passkey" === e && 1 === G.length
                          ? await Q()
                          : void N(e);
                    },
                    isTotpLoading: "totp" === L && !I,
                    isPasskeyLoading: V,
                    error: z,
                    onClose: W,
                    setRemovingMfaMethod: async (e) => {
                      q(void 0);
                      try {
                        await T();
                      } catch (e) {
                        return void q(e);
                      }
                      y(e);
                    },
                  });
      },
    };
  e.s(["MfaEnrollmentFlowScreen", 0, b, "default", 0, b], 926143);
};
