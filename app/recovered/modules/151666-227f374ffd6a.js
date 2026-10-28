// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(732486),
    r = e.i(338595),
    i = e.i(827566),
    n = e.i(518527),
    o = e.i(494780),
    l = e.i(25047),
    a = e.i(335341),
    s = e.i(315430),
    c = e.i(668701),
    d = e.i(352386);
  let u = d.forwardRef(function ({ title: e, titleId: t, ...r }, i) {
    return d.createElement(
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
          "aria-labelledby": t,
        },
        r,
      ),
      e ? d.createElement("title", { id: t }, e) : null,
      d.createElement("path", {
        strokeLinecap: "round",
        strokeLinejoin: "round",
        d: "M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5",
      }),
    );
  });
  var h = e.i(91163),
    p = e.i(995040),
    m = e.i(541021),
    x = e.i(437218),
    g = e.i(748117),
    f = e.i(689391),
    v = e.i(703114),
    y = e.i(525856),
    w = e.i(582355),
    C = e.i(827432),
    j = e.i(451993),
    b = e.i(909486),
    k = e.i(933185),
    E = e.i(616800);
  let M = ({ pendingTransaction: e }) => {
      let { wallets: r } = (0, w.u)(),
        {
          walletProxy: i,
          rpcConfig: n,
          chains: o,
          appId: l,
          nativeTokenSymbolForChainId: a,
        } = (0, g.u)(),
        [s, c] = (0, d.useState)(null),
        [u, h] = (0, d.useState)(e),
        { tokenPrice: p } = (0, y.u)(u.chainId),
        m = a(e.chainId) || "ETH",
        x = (0, d.useMemo)(
          () => r.find((e) => "privy" === e.walletClientType),
          [r],
        );
      return (
        (0, d.useEffect)(() => {
          (async function () {
            if (!i || !x) return u;
            let e = (0, j.g)(u.chainId, o, n, { appId: l }),
              t = await (0, C.d)(u, e, x.address);
            return (c((0, v.g)(BigInt(t.gas ?? 0))), t);
          })()
            .then(h)
            .catch(console.error);
        }, [i]),
        x
          ? (0, t.jsx)(S, {
              children: (0, t.jsx)(b.T, {
                from: x.address,
                to: u.to,
                txn: u,
                gas: s ?? void 0,
                tokenPrice: p,
                tokenSymbol: m,
              }),
            })
          : null
      );
    },
    S = f.z.div`
  width: 100%;
  padding: 1rem 0;
`;
  e.s(
    [
      "V",
      0,
      ({
        hasBlockingError: e,
        error: r,
        onClose: i,
        onBack: n,
        handleSubmit: a,
        account: s,
        submitSuccess: d,
      }) => {
        let { pendingTransaction: f } = (0, g.u)();
        return (0, t.jsxs)(t.Fragment, {
          children: [
            (0, t.jsx)(p.M, { onClose: i }, "header"),
            (0, t.jsx)(x.e, {
              children: (0, t.jsxs)("div", {
                children: [
                  (0, t.jsx)(m.C, { success: d, fail: !!r }),
                  (0, t.jsx)(r ? h.f : c.F, {
                    style: { width: "38px", height: "38px" },
                  }),
                ],
              }),
            }),
            (0, t.jsx)(c.T, {
              style: { marginTop: "1rem" },
              children: "Verifying with passkey",
            }),
            (0, t.jsxs)(c.L, {
              children: [
                (0, t.jsxs)(c.a, {
                  children: [
                    (0, t.jsx)(c.b, { children: (0, t.jsx)(o.f, {}) }),
                    "Approve this action using your touch, face, PIN, or hardware key.",
                  ],
                }),
                (0, t.jsxs)(c.a, {
                  children: [
                    (0, t.jsx)(c.b, { children: (0, t.jsx)(u, {}) }),
                    "You last added a passkey on",
                    " ",
                    s?.firstVerifiedAt?.toLocaleDateString(void 0, {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    }),
                    ".",
                  ],
                }),
              ],
            }),
            f &&
              (0, t.jsx)(c.C, {
                children: (0, t.jsx)(M, { pendingTransaction: f }),
              }),
            r &&
              (0, t.jsxs)(t.Fragment, {
                children: [
                  (0, t.jsx)(c.E, {
                    style: { marginTop: "1.25rem" },
                    children: r.message,
                  }),
                  (0, t.jsx)(p.P, {
                    disabled: e,
                    onClick: a,
                    style: { margin: "1.25rem auto 0" },
                    children: "Try again",
                  }),
                ],
              }),
            n &&
              (0, t.jsx)(c.P, {
                style: { marginTop: "1rem" },
                onClick: n,
                children: "Choose another method",
              }),
            (0, t.jsx)(l.M, {}),
          ],
        });
      },
      "a",
      0,
      ({
        selectedMethod: e,
        submitSuccess: i,
        hasBlockingError: o,
        onClose: a,
        onBack: s,
        handleSubmitCode: d,
      }) => {
        let u = (0, k.a)(),
          { pendingTransaction: h } = (0, g.u)();
        switch (e) {
          case "sms":
            return (0, t.jsxs)(t.Fragment, {
              children: [
                (0, t.jsx)(p.M, { onClose: a }, "header"),
                (0, t.jsx)(c.I, {
                  style: { marginBottom: "1.5rem" },
                  children: (0, t.jsx)(n.f, {}),
                }),
                (0, t.jsx)(c.T, { children: "Enter verification code" }),
                (0, t.jsxs)(c.C, {
                  children: [
                    (0, t.jsx)(c.N, { success: i, disabled: o, onChange: d }),
                    (0, t.jsxs)(c.S, {
                      children: [
                        "To continue, please enter the 6-digit code sent to your ",
                        (0, t.jsx)("strong", { children: "mobile device" }),
                      ],
                    }),
                    h && (0, t.jsx)(M, { pendingTransaction: h }),
                  ],
                }),
                s &&
                  (0, t.jsx)(c.P, {
                    theme: u?.appearance.palette.colorScheme,
                    onClick: s,
                    children: "Choose another method",
                  }),
                (0, t.jsx)(p.S, { onClick: a, children: "Cancel" }),
                (0, t.jsx)(l.M, {}),
              ],
            });
          case "totp":
            return (0, t.jsxs)(t.Fragment, {
              children: [
                (0, t.jsx)(p.M, { onClose: a }, "header"),
                (0, t.jsx)(c.I, {
                  style: { marginBottom: "1.5rem" },
                  children: (0, t.jsx)(r.f, {}),
                }),
                (0, t.jsx)(c.T, { children: "Enter verification code" }),
                (0, t.jsxs)(c.C, {
                  children: [
                    (0, t.jsx)(c.N, { success: i, disabled: o, onChange: d }),
                    (0, t.jsxs)(c.S, {
                      children: [
                        "To continue, please enter the 6-digit code generated from your",
                        " ",
                        (0, t.jsx)("strong", { children: "authenticator app" }),
                      ],
                    }),
                    h && (0, t.jsx)(M, { pendingTransaction: h }),
                  ],
                }),
                s &&
                  (0, t.jsx)(c.P, {
                    theme: u?.appearance.palette.colorScheme,
                    onClick: s,
                    children: "Choose another method",
                  }),
                (0, t.jsx)(p.S, { onClick: a, children: "Cancel" }),
                (0, t.jsx)(l.M, {}),
              ],
            });
          default:
            return null;
        }
      },
      "b",
      0,
      ({ handleClose: e, mfaMethods: d, onSelect: u }) =>
        (0, t.jsxs)(a.S, {
          title: "Verify your identity",
          subtitle: "Choose a verification method",
          icon: o.f,
          iconVariant: "subtle",
          onClose: e,
          showClose: !0,
          watermark: !0,
          children: [
            (0, t.jsxs)(c.M, {
              children: [
                d.includes("totp") &&
                  (0, t.jsxs)(
                    s.L,
                    {
                      onClick: () => u("totp"),
                      children: [
                        (0, t.jsx)(s.m, { children: (0, t.jsx)(r.f, {}) }),
                        "Authenticator app",
                      ],
                    },
                    "totp",
                  ),
                d.includes("sms") &&
                  (0, t.jsxs)(
                    s.L,
                    {
                      onClick: () => u("sms"),
                      children: [
                        (0, t.jsx)(s.m, { children: (0, t.jsx)(n.f, {}) }),
                        "SMS",
                      ],
                    },
                    "sms",
                  ),
                d.includes("passkey") &&
                  (0, t.jsxs)(
                    s.L,
                    {
                      onClick: () => u("passkey"),
                      children: [
                        (0, t.jsx)(s.m, { children: (0, t.jsx)(i.f, {}) }),
                        "Passkey",
                      ],
                    },
                    "passkey",
                  ),
              ],
            }),
            (0, t.jsx)(l.M, {}),
          ],
        }),
      "t",
      0,
      (e) =>
        (0, E.c)(e)
          ? {
              isBlocking: !0,
              error: Error(
                "You have exceeded the maximum number of attempts. Please close this window and try again in 10 seconds.",
              ),
            }
          : (0, E.d)(e)
            ? {
                isBlocking: !1,
                error: Error("The code you entered is not valid"),
              }
            : (0, E.f)(e)
              ? {
                  isBlocking: !0,
                  error: Error(
                    "You have exceeded the time limit for code entry. Please try again in 30 seconds.",
                  ),
                }
              : (console.error(e),
                { isBlocking: !1, error: Error("Something went wrong.") }),
    ],
    151666,
  );
};
