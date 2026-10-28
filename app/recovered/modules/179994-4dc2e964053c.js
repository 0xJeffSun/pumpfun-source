// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(r) => {
  var o = r.i(732486),
    e = r.i(147890),
    l = r.i(352386);
  let i = l.forwardRef(function ({ title: r, titleId: o, ...e }, i) {
    return l.createElement(
      "svg",
      Object.assign(
        {
          xmlns: "http://www.w3.org/2000/svg",
          fill: "none",
          viewBox: "0 0 24 24",
          strokeWidth: 1.5,
          stroke: "currentColor",
          "aria-hidden": "true",
          "data-slot": "icon",
          ref: i,
          "aria-labelledby": o,
        },
        e,
      ),
      r ? l.createElement("title", { id: o }, r) : null,
      l.createElement("path", {
        strokeLinecap: "round",
        strokeLinejoin: "round",
        d: "m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10",
      }),
    );
  });
  var a = r.i(839326),
    c = r.i(689391),
    t = r.i(933185),
    n = r.i(995040),
    d = r.i(25047),
    s = r.i(847181),
    v = r.i(748117),
    p = r.i(636447),
    u = r.i(616800),
    h = r.i(803437),
    g = r.i(315430);
  (r.i(252494), r.i(785373), r.i(768820), r.i(535391));
  let b = c.z.div`
  width: 24px;
  height: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
`,
    x = {
      "google-drive": "Google Drive",
      icloud: "iCloud",
      "user-passcode": "password",
      privy: "Privy",
      "privy-v2": "Privy",
    },
    y = ({ onClose: r }) =>
      (0, o.jsxs)(h.a, {
        children: [
          (0, o.jsx)(s.C, {
            title: "Why do I need to secure my account?",
            icon: (0, o.jsx)(a.f, { width: 48 }),
            description: (0, o.jsxs)(o.Fragment, {
              children: [
                (0, o.jsx)("p", {
                  children:
                    "Your app uses cryptography to secure your account. App secrets are split and encrypted so only you can access them.",
                }),
                (0, o.jsx)("p", {
                  children:
                    "To use this app on new devices, secure account secrets using a password, your Google or your Apple account. It’s important you don’t lose access to the method you choose.",
                }),
              ],
            }),
          }),
          (0, o.jsx)(n.P, { onClick: r, children: "Select backup method" }),
        ],
      }),
    f = {
      component: () => {
        let [r, a] = (0, l.useState)(!1),
          {
            navigate: c,
            lastScreen: f,
            navigateBack: m,
            setModalData: w,
            data: j,
            onUserCloseViaDialogOrKeybindRef: k,
          } = (0, p.u)(),
          { user: C } = (0, t.u)(),
          { embeddedWallets: z } = (0, t.a)(),
          { closePrivyModal: L } = (0, v.u)(),
          M = (0, t.g)(C),
          $ = null === M,
          {
            isInAccountCreateFlow: Z,
            isResettingPassword: A,
            shouldCreateEth: S,
            shouldCreateSol: B,
          } = j.recoverySelection,
          F = M && "privy" !== M.recoveryMethod,
          E = F
            ? (0, o.jsxs)("span", {
                children: [
                  "Your account is currently secured using",
                  " ",
                  (0, o.jsx)("strong", {
                    children: x[M?.recoveryMethod || "user-passcode"],
                  }),
                  ".",
                ],
              })
            : "Select a method for logging in on new devices and recovering your account.";
        function V(r) {
          (w({
            recoveryOAuthStatus: {
              provider: r,
              action: $ ? "create-wallet" : "set-recovery",
              isInAccountCreateFlow: Z,
              shouldCreateEth: S,
              shouldCreateSol: B,
            },
          }),
            c("RecoveryOAuthScreen"));
        }
        function H() {
          (j?.setWalletPassword?.onFailure(
            Error("User exited set recovery flow"),
          ),
            L({
              shouldCallAuthOnSuccess:
                j?.setWalletPassword?.callAuthOnSuccessOnClose ?? !1,
            }));
        }
        return (
          (k.current = H),
          (0, o.jsxs)(o.Fragment, {
            children: [
              (0, o.jsx)(
                n.M,
                {
                  onClose: H,
                  backFn: r ? () => a(!1) : f ? m : void 0,
                  infoFn: f || r ? void 0 : () => a(!0),
                },
                "header",
              ),
              r
                ? (0, o.jsx)(y, { onClose: () => a(!1) })
                : (0, o.jsxs)(o.Fragment, {
                    children: [
                      (0, o.jsx)(s.C, {
                        title: F
                          ? "Update backup method"
                          : "Secure your account",
                        icon: (0, o.jsx)(e.f, { width: 48 }),
                        description: E,
                      }),
                      (0, o.jsx)(h.R, {
                        children: z.userOwnedRecoveryOptions
                          .filter(
                            (r) =>
                              !["icloud", "google-drive"].includes(
                                M?.recoveryMethod || "",
                              ) || r !== M?.recoveryMethod,
                          )
                          .sort()
                          .map((r) => {
                            switch (r) {
                              case "google-drive":
                                return (0, o.jsxs)(
                                  g.L,
                                  {
                                    onClick: () => V("google-drive"),
                                    children: [
                                      (0, o.jsx)(b, {
                                        children: (0, o.jsx)(h.G, {
                                          style: { width: 18 },
                                        }),
                                      }),
                                      "Back up to Google Drive",
                                    ],
                                  },
                                  r,
                                );
                              case "icloud":
                                return (0, o.jsxs)(
                                  g.L,
                                  {
                                    onClick: () => V("icloud"),
                                    children: [
                                      (0, o.jsx)(b, {
                                        children: (0, o.jsx)(h.A, {
                                          style: { width: 24 },
                                        }),
                                      }),
                                      "Back up to Apple iCloud",
                                    ],
                                  },
                                  r,
                                );
                              case "user-passcode":
                                return (0, o.jsxs)(
                                  g.L,
                                  {
                                    onClick: () => {
                                      c(
                                        (0, u.o)({
                                          isCreatingWallet: $,
                                          skipSplashScreen: !0,
                                        }),
                                      );
                                    },
                                    children: [
                                      (0, o.jsx)(b, {
                                        children: (0, o.jsx)(i, {
                                          style: { width: 18 },
                                        }),
                                      }),
                                      A ? "Reset your" : "Set a",
                                      " password",
                                    ],
                                  },
                                  r,
                                );
                              default:
                                return null;
                            }
                          }),
                      }),
                    ],
                  }),
              (0, o.jsx)(d.B, {}),
            ],
          })
        );
      },
    };
  r.s(["RecoverySelectionScreen", 0, f, "default", 0, f], 179994);
};
