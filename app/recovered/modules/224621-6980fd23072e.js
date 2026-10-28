// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(r) => {
  var e = r.i(732486),
    o = r.i(697781);
  let i = (0, r.i(78048).f)("square-pen", [
    [
      "path",
      {
        d: "M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7",
        key: "1m0v6g",
      },
    ],
    [
      "path",
      {
        d: "M18.375 2.625a1 1 0 0 1 3 3l-9.013 9.014a2 2 0 0 1-.853.505l-2.873.84a.5.5 0 0 1-.62-.62l.84-2.873a2 2 0 0 1 .506-.852z",
        key: "ohrbg2",
      },
    ],
  ]);
  var a = r.i(352386),
    l = r.i(689391),
    t = r.i(520417),
    n = r.i(339513),
    c = r.i(42799),
    d = r.i(194250),
    s = r.i(727472),
    v = r.i(549125),
    p = r.i(809845),
    h = r.i(933185),
    u = r.i(748117),
    g = r.i(636447),
    x = r.i(335341);
  (r.i(785373), r.i(252494));
  let b = l.z.img`
  && {
    height: ${(r) => ("sm" === r.size ? "65px" : "140px")};
    width: ${(r) => ("sm" === r.size ? "65px" : "140px")};
    border-radius: 16px;
    margin-bottom: 12px;
  }
`,
    f = (r) => {
      let { types: o, primaryType: i, ...a } = r.typedData;
      return (0, e.jsxs)(e.Fragment, {
        children: [
          (0, e.jsx)(k, { data: a }),
          (0, e.jsx)(d.C, {
            text: JSON.stringify(r.typedData, null, 2),
            itemName: "full payload to clipboard",
          }),
          " ",
        ],
      });
    },
    y = ({
      method: r,
      messageData: a,
      copy: l,
      iconUrl: c,
      isLoading: d,
      success: v,
      walletProxyIsLoading: p,
      errorMessage: h,
      isCancellable: u,
      onSign: g,
      onCancel: y,
      onClose: m,
    }) =>
      (0, e.jsx)(x.S, {
        title: l.title,
        subtitle: l.description,
        showClose: !0,
        onClose: m,
        icon: i,
        iconVariant: "subtle",
        helpText: h ? (0, e.jsx)(j, { children: h }) : void 0,
        primaryCta: {
          label: l.buttonText,
          onClick: g,
          disabled: d || v || p,
          loading: d,
        },
        secondaryCta: u
          ? { label: "Not now", onClick: y, disabled: d || v || p }
          : void 0,
        watermark: !0,
        children: (0, e.jsxs)(s.a, {
          children: [
            c
              ? (0, e.jsx)(b, {
                  style: { alignSelf: "center" },
                  size: "sm",
                  src: c,
                  alt: "app image",
                })
              : null,
            (0, e.jsxs)(w, {
              children: [
                "personal_sign" === r &&
                  (0, e.jsx)(z, {
                    children: ((r) => {
                      if (!(0, t.f)(r)) return r;
                      try {
                        let e = (0, n.m)(r);
                        return e.includes("�") ? r : e;
                      } catch {
                        return r;
                      }
                    })(a),
                  }),
                "eth_signTypedData_v4" === r && (0, e.jsx)(f, { typedData: a }),
                "solana_signMessage" === r &&
                  (0, e.jsx)(z, {
                    children: ((r) => {
                      try {
                        let e = o.t.decode(r),
                          i = new TextDecoder().decode(e);
                        return i.includes("�") ? r : i;
                      } catch {
                        return r;
                      }
                    })(a),
                  }),
              ],
            }),
          ],
        }),
      }),
    m = {
      component: () => {
        let { authenticated: r } = (0, h.u)(),
          { initializeWalletProxy: o, closePrivyModal: i } = (0, u.u)(),
          {
            navigate: l,
            data: t,
            onUserCloseViaDialogOrKeybindRef: n,
          } = (0, g.u)(),
          [d, s] = (0, a.useState)(!0),
          [v, x] = (0, a.useState)(""),
          [b, f] = (0, a.useState)(),
          [m, w] = (0, a.useState)(null),
          [j, k] = (0, a.useState)(!1);
        ((0, a.useEffect)(() => {
          r || l("LandingScreen");
        }, [r]),
          (0, a.useEffect)(() => {
            o(h.W).then((r) => {
              (s(!1),
                r ||
                  (x("An error has occurred, please try again."),
                  f(
                    new p.P(
                      new p.e(v, c.X.E32603_DEFAULT_INTERNAL_ERROR.eipCode),
                    ),
                  )));
            });
          }, []));
        let {
            method: z,
            data: C,
            confirmAndSign: $,
            onSuccess: S,
            onFailure: M,
            uiOptions: E,
          } = t.signMessage,
          T = {
            title: E?.title || "Sign message",
            description:
              E?.description ||
              "Signing this message will not cost you any fees.",
            buttonText: E?.buttonText || "Sign and continue",
          },
          L = (r) => {
            (r
              ? S(r)
              : M(
                  b ||
                    new p.P(
                      new p.e(
                        "The user rejected the request.",
                        c.X.E4001_USER_REJECTED_REQUEST.eipCode,
                      ),
                    ),
                ),
              i({ shouldCallAuthOnSuccess: !1 }),
              setTimeout(() => {
                (w(null), x(""), f(void 0));
              }, 200));
          };
        return (
          (n.current = () => {
            L(m);
          }),
          (0, e.jsx)(y, {
            method: z,
            messageData: C,
            copy: T,
            iconUrl:
              E?.iconUrl && "string" == typeof E.iconUrl ? E.iconUrl : void 0,
            isLoading: j,
            success: null !== m,
            walletProxyIsLoading: d,
            errorMessage: v,
            isCancellable: E?.isCancellable,
            onSign: async () => {
              (k(!0), x(""));
              try {
                let r = await $();
                (w(r),
                  k(!1),
                  setTimeout(() => {
                    L(r);
                  }, h.Q));
              } catch (r) {
                (console.error(r),
                  x("An error has occurred, please try again."),
                  f(
                    new p.P(
                      new p.e(v, c.X.E32603_DEFAULT_INTERNAL_ERROR.eipCode),
                    ),
                  ),
                  k(!1));
              }
            },
            onCancel: () => L(null),
            onClose: () => L(m),
          })
        );
      },
    },
    w = l.z.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 16px;
`,
    j = l.z.p`
  && {
    margin: 0;
    width: 100%;
    text-align: center;
    color: var(--privy-color-error-dark);
    font-size: 14px;
    line-height: 22px;
  }
`,
    k = (0, l.z)(v.D)`
  margin-top: 0;
`,
    z = (0, l.z)(v.M)`
  margin-top: 0;
`;
  r.s(
    ["SignRequestScreen", 0, m, "SignRequestView", 0, y, "default", 0, m],
    224621,
  );
};
