// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(r) => {
  var e = r.i(732486),
    o = r.i(352386);
  let i = o.forwardRef(function ({ title: r, titleId: e, ...i }, a) {
    return o.createElement(
      "svg",
      Object.assign(
        {
          xmlns: "http://www.w3.org/2000/svg",
          viewBox: "0 0 20 20",
          fill: "currentColor",
          "aria-hidden": "true",
          "data-slot": "icon",
          ref: a,
          "aria-labelledby": e,
        },
        i,
      ),
      r ? o.createElement("title", { id: e }, r) : null,
      o.createElement("path", {
        fillRule: "evenodd",
        d: "M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z",
        clipRule: "evenodd",
      }),
    );
  });
  var a = r.i(672082),
    n = r.i(518527),
    t = r.i(768820),
    l = r.i(689391),
    c = r.i(727472),
    d = r.i(583503),
    s = r.i(933185),
    v = r.i(565530),
    p = r.i(748117),
    u = r.i(636447),
    h = r.i(203793),
    g = r.i(335341);
  (r.i(252494), r.i(785373), r.i(535391));
  let f = ({
      contactMethod: r,
      authFlow: l,
      emailDomain: s,
      appName: v = "Privy",
      whatsAppEnabled: p = !1,
      onBack: u,
      onCodeSubmit: h,
      onResend: f,
      errorMessage: y,
      success: m = !1,
      resendCountdown: w = 0,
      onInvalidInput: k,
      onClearError: j,
    }) => {
      let [T, M] = (0, o.useState)(b);
      (0, o.useEffect)(() => {
        y || M(b);
      }, [y]);
      let L = async (r) => {
        r.preventDefault();
        let e = r.currentTarget.value.replace(" ", "");
        if ("" === e) return;
        if (isNaN(Number(e))) return void k?.("Code should be numeric");
        j?.();
        let o = Number(r.currentTarget.name?.charAt(5)),
          i = [...(e || [""])].slice(0, x - o),
          a = [...T.slice(0, o), ...i, ...T.slice(o + i.length)];
        M(a);
        let n = Math.min(Math.max(o + i.length, 0), x - 1);
        if (!isNaN(Number(r.currentTarget.value))) {
          let r = document.querySelector(`input[name=code-${n}]`);
          r?.focus();
        }
        if (a.every((r) => r && !isNaN(+r))) {
          let r = document.querySelector(`input[name=code-${n}]`);
          (r?.blur(), await h?.(a.join("")));
        }
      };
      return (0, e.jsx)(g.S, {
        title: "Enter confirmation code",
        subtitle: (0, e.jsxs)(
          "span",
          "email" === l
            ? {
                children: [
                  "Please check ",
                  (0, e.jsx)(A, { children: r }),
                  " for an email from",
                  " ",
                  s ?? "privy.io",
                  " and enter your code below.",
                ],
              }
            : {
                children: [
                  "Please check ",
                  (0, e.jsx)(A, { children: r }),
                  " for a",
                  p ? " WhatsApp" : "",
                  " message from ",
                  v,
                  " and enter your code below.",
                ],
              },
        ),
        icon: "email" === l ? a.f : n.f,
        onBack: u,
        showBack: !0,
        helpText: (0, e.jsxs)(C, {
          children: [
            (0, e.jsxs)("span", {
              children: [
                "Didn't get ",
                "email" === l ? "an email" : "a message",
                "?",
              ],
            }),
            w
              ? (0, e.jsxs)(S, {
                  children: [
                    (0, e.jsx)(i, {
                      color: "var(--privy-color-foreground)",
                      strokeWidth: 1.33,
                      height: "12px",
                      width: "12px",
                    }),
                    (0, e.jsx)("span", { children: "Code sent" }),
                  ],
                })
              : (0, e.jsx)(d.L, {
                  as: "button",
                  size: "sm",
                  onClick: f,
                  children: "Resend code",
                }),
          ],
        }),
        children: (0, e.jsx)(z, {
          children: (0, e.jsx)(c.H, {
            children: (0, e.jsxs)($, {
              children: [
                (0, e.jsx)("div", {
                  children: T.map((r, o) =>
                    (0, e.jsx)(
                      "input",
                      {
                        name: `code-${o}`,
                        type: "text",
                        value: T[o],
                        onChange: L,
                        onKeyUp: (r) => {
                          "Backspace" === r.key &&
                            ((r) => {
                              if (
                                (j?.(),
                                M([...T.slice(0, r), "", ...T.slice(r + 1)]),
                                r > 0)
                              ) {
                                let e = document.querySelector(
                                  `input[name=code-${r - 1}]`,
                                );
                                e?.focus();
                              }
                            })(o);
                        },
                        inputMode: "numeric",
                        autoFocus: 0 === o,
                        pattern: "[0-9]",
                        className: `${m ? "success" : ""} ${y ? "fail" : ""}`,
                        autoComplete: t.isMobile ? "one-time-code" : "off",
                      },
                      o,
                    ),
                  ),
                }),
                (0, e.jsx)(E, {
                  $fail: !!y,
                  $success: m,
                  children: (0, e.jsx)("span", {
                    children:
                      "Invalid or expired verification code" === y
                        ? "Incorrect code"
                        : y || (m ? "Success!" : ""),
                  }),
                }),
              ],
            }),
          }),
        }),
      });
    },
    x = 6,
    b = Array(6).fill("");
  var y,
    m,
    w =
      (((y = w || {})[(y.RESET_AFTER_DELAY = 0)] = "RESET_AFTER_DELAY"),
      (y[(y.CLEAR_ON_NEXT_VALID_INPUT = 1)] = "CLEAR_ON_NEXT_VALID_INPUT"),
      y),
    k = (((m = k || {})[(m.EMAIL = 0)] = "EMAIL"), (m[(m.SMS = 1)] = "SMS"), m);
  let j = {
      component: () => {
        let {
            navigate: r,
            lastScreen: i,
            navigateBack: a,
            setModalData: n,
            onUserCloseViaDialogOrKeybindRef: t,
          } = (0, u.u)(),
          l = (0, s.a)(),
          {
            closePrivyModal: c,
            resendEmailCode: d,
            resendSmsCode: g,
            getAuthMeta: x,
            loginWithCode: b,
            updateWallets: y,
            createAnalyticsEvent: m,
          } = (0, p.u)(),
          { authenticated: w, logout: k, user: j } = (0, s.u)(),
          { whatsAppEnabled: z } = (0, s.a)(),
          [$, E] = (0, o.useState)(!1),
          [C, S] = (0, o.useState)(null),
          [A, T] = (0, o.useState)(null),
          [M, L] = (0, o.useState)(0);
        t.current = () => null;
        let N = +!x()?.email,
          _ = 0 === N ? x()?.email || "" : x()?.phoneNumber || "",
          R = s.Q - 500;
        return (
          (0, o.useEffect)(() => {
            if (M) {
              let r = setTimeout(() => {
                L(M - 1);
              }, 1e3);
              return () => clearTimeout(r);
            }
          }, [M]),
          (0, o.useEffect)(() => {
            if (w && $ && j) {
              if (l?.legal.requireUsersAcceptTerms && !j.hasAcceptedTerms) {
                let e = setTimeout(() => {
                  r("AffirmativeConsentScreen");
                }, R);
                return () => clearTimeout(e);
              }
              if ((0, h.s)(j, l.embeddedWallets)) {
                let e = setTimeout(() => {
                  (n({
                    createWallet: {
                      onSuccess: () => {},
                      onFailure: (r) => {
                        (console.error(r),
                          m({
                            eventName:
                              "embedded_wallet_creation_failure_logout",
                            payload: {
                              error: r,
                              screen: "AwaitingPasswordlessCodeScreen",
                            },
                          }),
                          k());
                      },
                      callAuthOnSuccessOnClose: !0,
                    },
                  }),
                    r("EmbeddedWalletOnAccountCreateScreen"));
                }, R);
                return () => clearTimeout(e);
              }
              {
                y();
                let r = setTimeout(
                  () => c({ shouldCallAuthOnSuccess: !0, isSuccess: !0 }),
                  s.Q,
                );
                return () => clearTimeout(r);
              }
            }
          }, [w, $, j]),
          (0, o.useEffect)(() => {
            if (C && 0 === A) {
              let r = setTimeout(() => {
                (S(null), T(null));
                let r = document.querySelector("input[name=code-0]");
                r?.focus();
              }, 1400);
              return () => clearTimeout(r);
            }
          }, [C, A]),
          (0, e.jsx)(f, {
            contactMethod: _,
            authFlow: 0 === N ? "email" : "sms",
            emailDomain: l?.appearance.emailDomain,
            appName: l?.name,
            whatsAppEnabled: z,
            onBack: () => a(),
            onCodeSubmit: async (e) => {
              try {
                (await b(e), E(!0));
              } catch (e) {
                if (
                  e instanceof v.c &&
                  e.privyErrorCode === v.a.INVALID_CREDENTIALS
                )
                  (S("Invalid or expired verification code"), T(0));
                else if (
                  e instanceof v.c &&
                  e.privyErrorCode === v.a.CANNOT_LINK_MORE_OF_TYPE
                )
                  S(e.message);
                else {
                  if (
                    e instanceof v.c &&
                    e.privyErrorCode === v.a.USER_LIMIT_REACHED
                  )
                    return (
                      console.error(new v.j(e).toString()),
                      void r("UserLimitReachedScreen")
                    );
                  if (
                    e instanceof v.c &&
                    e.privyErrorCode === v.a.USER_DOES_NOT_EXIST
                  )
                    return void r("AccountNotFoundScreen");
                  if (
                    e instanceof v.c &&
                    e.privyErrorCode === v.a.LINKED_TO_ANOTHER_USER
                  )
                    return (
                      n({
                        errorModalData: {
                          error: e,
                          previousScreen: i ?? "AwaitingPasswordlessCodeScreen",
                        },
                      }),
                      void r("ErrorScreen", !1)
                    );
                  if (
                    e instanceof v.c &&
                    e.privyErrorCode === v.a.DISALLOWED_PLUS_EMAIL
                  )
                    return (
                      n({ inlineError: { error: e } }),
                      void r("ConnectOrCreateScreen", !1)
                    );
                  if (
                    e instanceof v.c &&
                    e.privyErrorCode === v.a.ACCOUNT_TRANSFER_REQUIRED &&
                    e.data?.data?.nonce
                  )
                    return (
                      n({
                        accountTransfer: {
                          nonce: e.data?.data?.nonce,
                          account: _,
                          displayName: e.data?.data?.account?.displayName,
                          linkMethod: 0 === N ? "email" : "sms",
                          embeddedWalletAddress:
                            e.data?.data?.otherUser?.embeddedWalletAddress,
                        },
                      }),
                      void r("LinkConflictScreen")
                    );
                  (S("Issue verifying code"), T(0));
                }
              }
            },
            onResend: async () => {
              (L(30), 0 === N ? await d() : await g());
            },
            errorMessage: C || void 0,
            success: $,
            resendCountdown: M,
            onInvalidInput: (r) => {
              (S(r), T(1));
            },
            onClearError: () => {
              1 === A && (S(null), T(null));
            },
          })
        );
      },
    },
    z = l.z.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: auto;
  gap: 16px;
  flex-grow: 1;
  width: 100%;
`,
    $ = l.z.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 12px;

  > div:first-child {
    display: flex;
    justify-content: center;
    gap: 0.5rem;
    width: 100%;
    border-radius: var(--privy-border-radius-sm);

    > input {
      border: 1px solid var(--privy-color-foreground-4);
      background: var(--privy-color-background);
      border-radius: var(--privy-border-radius-sm);
      padding: 8px 10px;
      height: 48px;
      width: 40px;
      text-align: center;
      font-size: 18px;
      font-weight: 600;
      color: var(--privy-color-foreground);
      transition: all 0.2s ease;
    }

    > input:focus {
      border: 1px solid var(--privy-color-foreground);
      box-shadow: 0 0 0 1px var(--privy-color-foreground);
    }

    > input:invalid {
      border: 1px solid var(--privy-color-error);
    }

    > input.success {
      border: 1px solid var(--privy-color-border-success);
      background: var(--privy-color-success-bg);
    }

    > input.fail {
      border: 1px solid var(--privy-color-border-error);
      background: var(--privy-color-error-bg);
      animation: shake 180ms;
      animation-iteration-count: 2;
    }
  }

  @keyframes shake {
    0% {
      transform: translate(1px, 0);
    }
    33% {
      transform: translate(-1px, 0);
    }
    67% {
      transform: translate(-1px, 0);
    }
    100% {
      transform: translate(1px, 0);
    }
  }
`,
    E = l.z.div`
  line-height: 20px;
  min-height: 20px;
  font-size: 14px;
  font-weight: 400;
  color: ${(r) => (r.$success ? "var(--privy-color-success-dark)" : r.$fail ? "var(--privy-color-error-dark)" : "transparent")};
  display: flex;
  justify-content: center;
  width: 100%;
  text-align: center;
`,
    C = l.z.div`
  display: flex;
  gap: 8px;
  align-items: center;
  justify-content: center;
  width: 100%;
  color: var(--privy-color-foreground-2);
`,
    S = l.z.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--privy-border-radius-sm);
  padding: 2px 8px;
  gap: 4px;
  background: var(--privy-color-background-2);
  color: var(--privy-color-foreground-2);
`,
    A = l.z.span`
  font-weight: 500;
  word-break: break-all;
  color: var(--privy-color-foreground);
`;
  r.s(
    [
      "AwaitingPasswordlessCodeScreen",
      0,
      j,
      "AwaitingPasswordlessCodeScreenView",
      0,
      f,
      "default",
      0,
      j,
    ],
    262731,
  );
};
