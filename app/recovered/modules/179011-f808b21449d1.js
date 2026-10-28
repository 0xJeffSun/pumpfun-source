// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var r = e.i(732486),
    i = e.i(352386);
  let o = i.forwardRef(function ({ title: e, titleId: r, ...o }, a) {
    return i.createElement(
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
          ref: a,
          "aria-labelledby": r,
        },
        o,
      ),
      e ? i.createElement("title", { id: r }, e) : null,
      i.createElement("path", {
        strokeLinecap: "round",
        strokeLinejoin: "round",
        d: "M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z",
      }),
    );
  });
  var a = e.i(689391),
    t = e.i(25047),
    l = e.i(995040),
    n = e.i(933185),
    s = e.i(461687),
    c = e.i(748117),
    d = e.i(636447),
    p = e.i(616800),
    h = e.i(467793),
    g = e.i(315430),
    u = e.i(336291),
    v = e.i(541021),
    f = e.i(731110),
    x = e.i(292632),
    m = e.i(461614);
  let b = (0, e.i(78048).f)("circle-user", [
    ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
    ["circle", { cx: "12", cy: "10", r: "3", key: "ilqhr7" }],
    [
      "path",
      { d: "M7 20.662V19a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v1.662", key: "154egf" },
    ],
  ]);
  var y = e.i(520818),
    w = e.i(23915),
    C = e.i(56322),
    j = e.i(42799),
    A = e.i(839326),
    k = e.i(827566),
    M = e.i(583503),
    S = e.i(743911),
    z = e.i(682618),
    L = e.i(349030),
    E = e.i(42536),
    B = e.i(368868),
    T = e.i(335341);
  let H = () => {
      let e = (0, n.a)(),
        o = e?.appearance?.logo,
        a = `${e?.name} logo`,
        t = { maxHeight: "90px", maxWidth: "180px" };
      return o
        ? "string" == typeof o
          ? (0, r.jsx)("img", { src: o, alt: a, style: t })
          : "svg" === o.type || "img" === o.type
            ? i.default.cloneElement(o, { alt: a, style: t })
            : (console.warn(
                "`config.appearance.logo` must be a string, or an SVG / IMG element. Nothing will be rendered.",
              ),
              null)
        : null;
    },
    V = a.z.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 24px 0;
  flex-grow: 1;
  justify-content: center;
`,
    D = ({ name: e, logoUrl: i, size: o = "38px" }) =>
      "string" == typeof i
        ? (0, r.jsx)("img", {
            src: i,
            alt: `${e ?? "Provider app"} logo`,
            style: {
              width: o,
              height: o,
              maxHeight: "90px",
              maxWidth: "180px",
              borderRadius: "8px",
            },
          })
        : (0, r.jsx)("span", {}),
    F = ({ appId: e }) => {
      let [o, a] = (0, i.useState)(void 0),
        { startCrossAppAuthFlow: t } = (0, f.d)(),
        { authenticated: l } = (0, n.u)(),
        { data: s } = (0, d.u)(),
        { client: p } = (0, c.u)();
      return (
        (0, i.useEffect)(() => {
          (async () => {
            p && a(await p.getCrossAppProviderDetails(e));
          })();
        }, [p]),
        (0, r.jsx)(g.L, {
          onClick: () =>
            t({
              appId: e,
              action: l ? "link" : "login",
              disableSignup: s?.login?.disableSignup,
            }),
          disabled: !o,
          children: o
            ? (0, r.jsxs)(r.Fragment, {
                children: [
                  (0, r.jsx)(g.m, {
                    $fullSize: !0,
                    children: (0, r.jsx)(D, {
                      name: o.name,
                      logoUrl: o.icon_url || void 0,
                      size: "32px",
                    }),
                  }),
                  o.name,
                ],
              })
            : (0, r.jsx)(v.B, {}),
        })
      );
    },
    W = ({ isEditable: e, setIsEditable: o, defaultValue: a }) => {
      let t = (0, i.useRef)(null);
      return (0, r.jsxs)(r.Fragment, {
        children: [
          (0, r.jsx)(g.H, {
            $if: !e,
            children: (0, r.jsx)(y.C, { ref: t, defaultValue: a }),
          }),
          (0, r.jsx)(g.H, {
            $if: e,
            children: (0, r.jsxs)(g.L, {
              onClick: () => {
                (o(),
                  setTimeout(() => {
                    t.current?.focus();
                  }, 0));
              },
              children: [
                (0, r.jsx)(g.m, { children: (0, r.jsx)(x.f, {}) }),
                "Continue with Email",
              ],
            }),
          }),
        ],
      });
    },
    P = () => {
      let [e, o] = (0, i.useState)(!1),
        {
          currentScreen: a,
          navigate: t,
          setModalData: l,
          data: n,
        } = (0, d.u)(),
        { enabled: s, token: h } = (0, p.a)(),
        { initLoginWithFarcaster: u } = (0, c.u)(),
        { accountType: f } = (0, g.h)();
      return (0, r.jsxs)(g.L, {
        onClick: async () => {
          o(!0);
          try {
            s && !h
              ? (l({
                  captchaModalData: {
                    callback: (e) => u(e, n?.login?.disableSignup),
                    userIntentRequired: !0,
                    onSuccessNavigateTo: "FarcasterConnectStatusScreen",
                    onErrorNavigateTo: "ErrorScreen",
                  },
                }),
                t("CaptchaScreen"))
              : (await u(h, n?.login?.disableSignup),
                t("FarcasterConnectStatusScreen"));
          } catch (e) {
            (l({
              errorModalData: {
                error: e,
                previousScreen: a || "LandingScreen",
              },
            }),
              t("ErrorScreen"));
          } finally {
            o(!1);
          }
        },
        disabled: !1,
        children: [
          (0, r.jsx)(C.F, { width: 32, height: 32 }),
          " Farcaster",
          e && (0, r.jsx)(v.B, {}),
          "farcaster" === f &&
            (0, r.jsx)(I, { color: "gray", children: "Recent" }),
        ],
      });
    },
    I = (0, a.z)(w.C)`
  margin-left: auto;
`,
    N = ({ ...e }) =>
      (0, r.jsxs)("svg", {
        xmlns: "http://www.w3.org/2000/svg",
        width: "25",
        height: "25",
        viewBox: "0 0 25 25",
        fill: "none",
        ...e,
        children: [
          (0, r.jsxs)("g", {
            clipPath: "url(#clip0_2856_1743)",
            children: [
              (0, r.jsx)("path", {
                d: "M22.1673 8.24075V16.3642C22.1673 17.3256 21.3421 18.105 20.3241 18.105H17.0028M22.1673 8.24075C22.1673 7.27936 21.3421 6.5 20.3241 6.5H11.5302M22.1673 8.24075V8.42852C22.1673 9.03302 21.8352 9.59423 21.2901 9.91105L15.1463 13.4818C14.5539 13.8261 13.8067 13.8261 13.2143 13.4818L10.1621 11.5401",
                stroke: "currentColor",
                strokeWidth: "1.5",
                strokeLinecap: "round",
                strokeLinejoin: "round",
              }),
              (0, r.jsx)("path", {
                d: "M3.12913 6.64816C0.508085 12.9507 3.49251 20.1847 9.79504 22.8057L11.5068 23.5176C12.4522 23.9108 13.7783 23.2222 14.1714 22.2768L14.6054 21.2333C14.7687 20.8406 14.6438 20.3871 14.3024 20.1334L11.2872 17.8927C10.9878 17.6702 10.5843 17.6488 10.2632 17.8384L9.11575 18.5156C8.78274 18.7121 8.3597 18.6844 8.07552 18.4221C5.94293 16.4542 4.77629 13.6264 4.90096 10.7273C4.91757 10.3409 5.19796 10.023 5.57269 9.92753L6.86381 9.59869C7.22522 9.50664 7.49627 9.20696 7.55169 8.83815L8.10986 5.12321C8.17306 4.70259 7.94188 4.29293 7.54915 4.1296L6.50564 3.69564C5.56026 3.30248 4.23416 3.99103 3.84101 4.9364L3.12913 6.64816Z",
                stroke: "currentColor",
                strokeWidth: "1.5",
                strokeLinecap: "round",
                strokeLinejoin: "round",
              }),
            ],
          }),
          (0, r.jsx)("defs", {
            children: (0, r.jsx)("clipPath", {
              id: "clip0_2856_1743",
              children: (0, r.jsx)("rect", {
                x: "0.5",
                y: "0.5",
                width: "24",
                height: "24",
                rx: "6",
                fill: "white",
              }),
            }),
          }),
        ],
      }),
    R = ({ chainType: e, withPadding: i }) => {
      let o = "";
      return (
        (o =
          "ethereum-only" === e || "ethereum-and-solana" === e
            ? "Rainbow, Phantom, or Coinbase Wallet"
            : "Phantom or Solflare"),
        (0, r.jsx)(
          g.E,
          {
            $withPadding: i,
            children: (0, r.jsxs)(g.n, {
              children: [
                (0, r.jsx)(A.f, {
                  style: {
                    color: "var(--privy-color-warn)",
                    height: 48,
                    width: 48,
                  },
                }),
                (0, r.jsx)("h3", { children: "No wallets available" }),
                (0, r.jsxs)("p", {
                  children: [
                    "Please download an external wallet provider, like ",
                    o,
                    ".",
                  ],
                }),
              ],
            }),
          },
          "empty-wallet-state",
        )
      );
    },
    G = () => {
      let { enabled: e, token: o } = (0, p.a)(),
        { navigate: a, setModalData: t, data: l } = (0, d.u)(),
        s = (0, n.a)(),
        { initLoginWithPasskey: h } = (0, c.u)(),
        u = () => {
          s.loginConfig.passkeysForSignupEnabled
            ? a("PasskeySelectSignupOrLogin")
            : (async () => {
                e && !o
                  ? (t({
                      passkeyAuthModalData: { passkeySignupFlow: !1 },
                      captchaModalData: {
                        callback: (e) =>
                          h({ captchaToken: e, withPrivyUi: !0 }),
                        userIntentRequired: !1,
                        onSuccessNavigateTo: "PasskeyStatusScreen",
                        onErrorNavigateTo: "ErrorScreen",
                      },
                    }),
                    a("CaptchaScreen"))
                  : (await h({ withPrivyUi: !0, captchaToken: o }),
                    t({ passkeyAuthModalData: { passkeySignupFlow: !1 } }),
                    a("PasskeyStatusScreen"));
              })();
        };
      return 0 ===
        (0, i.useMemo)(() => {
          let e = l?.login?.loginMethods;
          return e
            ? e.filter((e) => "passkey" !== e).length
            : Object.entries(s.loginMethods)
                .filter(([e, r]) => r)
                .filter(([e]) => "passkey" !== e).length;
        }, [s.loginMethods, l?.login])
        ? (0, r.jsxs)(g.L, {
            onClick: u,
            children: [(0, r.jsx)(k.f, {}), " Continue with passkey"],
          })
        : (0, r.jsx)(M.L, {
            as: "button",
            onClick: u,
            size: "sm",
            variant: "navigation",
            style: { width: "100%", justifyContent: "center" },
            children: "I have a passkey",
          });
    },
    Z = ({ isEditable: e, setIsEditable: o, defaultValue: a }) => {
      let t = (0, i.useRef)(null),
        { authenticated: l } = (0, n.u)(),
        {
          navigate: s,
          setModalData: h,
          currentScreen: u,
          data: v,
        } = (0, d.u)(),
        { initLoginWithSms: f } = (0, c.u)(),
        { enabled: x, token: b } = (0, p.a)(),
        { whatsAppEnabled: y } = (0, n.a)();
      return (0, r.jsxs)(r.Fragment, {
        children: [
          (0, r.jsx)(g.H, {
            $if: !e,
            children: (0, r.jsx)(S.C, {
              ref: t,
              onSubmit: async function ({ qualifiedPhoneNumber: e }) {
                if (!x || b || l)
                  try {
                    (await f({
                      phoneNumber: e,
                      captchaToken: b,
                      withPrivyUi: !0,
                      disableSignup: v?.login?.disableSignup,
                    }),
                      s("AwaitingPasswordlessCodeScreen"));
                  } catch (e) {
                    (h({
                      errorModalData: {
                        error: e,
                        previousScreen: u || "LandingScreen",
                      },
                    }),
                      s("ErrorScreen"));
                  }
                else
                  (h({
                    captchaModalData: {
                      callback: (r) =>
                        f({
                          phoneNumber: e,
                          captchaToken: r,
                          withPrivyUi: !0,
                          disableSignup: v?.login?.disableSignup,
                        }),
                      userIntentRequired: !1,
                      onSuccessNavigateTo: "AwaitingPasswordlessCodeScreen",
                      onErrorNavigateTo: "ErrorScreen",
                    },
                  }),
                    s("CaptchaScreen"));
              },
              defaultValue: a,
            }),
          }),
          (0, r.jsx)(g.H, {
            $if: e,
            children: (0, r.jsxs)(g.L, {
              onClick: () => {
                (o(),
                  setTimeout(() => {
                    t.current?.focus();
                  }, 0));
              },
              children: [
                (0, r.jsx)(g.m, { children: (0, r.jsx)(m.f, {}) }),
                "Continue with ",
                y ? "WhatsApp" : "SMS",
              ],
            }),
          }),
        ],
      });
    },
    q = {
      apple: { logo: z.A, displayName: "Apple" },
      discord: { logo: z.D, displayName: "Discord" },
      github: { logo: z.b, displayName: "GitHub" },
      google: { logo: z.G, displayName: "Google" },
      linkedin: { logo: z.L, displayName: "LinkedIn" },
      spotify: { logo: z.S, displayName: "Spotify" },
      instagram: { logo: z.I, displayName: "Instagram" },
      telegram: { logo: E.T, displayName: "Telegram" },
      twitter: { logo: z.a, displayName: "Twitter" },
      tiktok: { logo: z.T, displayName: "TikTok" },
      line: { logo: L.L, displayName: "LINE" },
      twitch: { logo: L.T, displayName: "Twitch" },
    },
    O = ({ provider: e }) => {
      let { enabled: o, token: a } = (0, p.a)(),
        {
          currentScreen: t,
          navigate: l,
          setModalData: s,
          data: h,
        } = (0, d.u)(),
        [u, v] = (0, i.useState)(!1),
        f = (0, n.a)(),
        { initLoginWithOAuth: x } = (0, c.u)(),
        { accountType: m } = (0, g.h)(),
        b = (0, i.useMemo)(
          () =>
            m && "guest" !== m && "authorization_key" !== m && "cross_app" !== m
              ? (0, p.t)(m)
              : null,
          [m],
        ),
        { displayName: y, logo: w } = (0, i.useMemo)(() => {
          if ((0, n.i)(e)) {
            let i = f.customOAuthProviders.find((r) => r.provider === e),
              o = i.provider_icon_url,
              a = i.provider_display_name;
            return {
              displayName: a,
              logo: ({ style: e }) =>
                (0, r.jsx)("img", { alt: `${a} logo`, src: o, style: e }),
            };
          }
          return q[e];
        }, [e, f.customOAuthProviders]);
      return (0, r.jsxs)(g.L, {
        onClick: () => {
          (v(!0),
            setTimeout(() => {
              v(!1);
            }, 2e3),
            o && !a
              ? (s({
                  captchaModalData: {
                    callback: (r) => x(e, r, h?.login?.disableSignup),
                    userIntentRequired: !0,
                    onSuccessNavigateTo: null,
                    onErrorNavigateTo: "ErrorScreen",
                  },
                }),
                l("CaptchaScreen"))
              : x(e, void 0, h?.login?.disableSignup).catch((e) => {
                  (v(!1),
                    s({
                      errorModalData: {
                        error: e,
                        previousScreen: t || "LandingScreen",
                      },
                    }),
                    l("ErrorScreen"));
                }));
        },
        disabled: u,
        children: [
          (0, r.jsx)(g.m, {
            $fullSize: !0,
            children: (0, r.jsx)(w, {
              style: { width: "32px", height: "32px" },
            }),
          }),
          y,
          b?.loginMethod === e &&
            (0, r.jsx)(U, { color: "gray", children: "Recent" }),
        ],
      });
    },
    U = (0, a.z)(w.C)`
  margin-left: auto;
`,
    Q = () => {
      let { enabled: e, token: o } = (0, p.a)(),
        { navigate: a, setModalData: t, data: l } = (0, d.u)(),
        [n, s] = (0, i.useState)(!1),
        { initLoginWithTelegram: h } = (0, c.u)(),
        { accountType: u } = (0, g.h)();
      async function v(e) {
        try {
          (await h(e, l?.login?.disableSignup),
            t({ telegramAuthModalData: { seamlessAuth: !1 } }),
            a("TelegramAuthScreen"));
        } catch (e) {
          (console.error(e), s(!1));
        }
      }
      return (0, r.jsxs)(g.L, {
        onClick: async function () {
          (s(!0), e && !o)
            ? (t({
                captchaModalData: {
                  callback: v,
                  userIntentRequired: !0,
                  onSuccessNavigateTo: null,
                  onErrorNavigateTo: "ErrorScreen",
                },
              }),
              a("CaptchaScreen"))
            : await v(o);
        },
        disabled: n,
        children: [
          (0, r.jsx)(E.T, { width: 32, height: 32 }),
          "Telegram",
          "telegram" === u &&
            (0, r.jsx)(X, { color: "gray", children: "Recent" }),
        ],
      });
    },
    X = (0, a.z)(w.C)`
  margin-left: auto;
`,
    K = ({ onClick: e, text: i, icon: o }) =>
      (0, r.jsxs)(g.L, {
        onClick: e,
        children: [
          (0, r.jsx)(g.m, { children: o }),
          (0, r.jsx)(g.G, { children: i }),
        ],
      }),
    Y = a.z.div`
  text-align: center;
  font-size: 14px;
  margin-bottom: 24px;
`,
    $ = a.z.div`
  margin-bottom: 24px;
`,
    J = ({
      mostRecentlyUsedAccountType: e,
      smsAvailable: r,
      emailAvailable: i,
      prefilledType: o,
    }) =>
      (i && (("email" === e && "phone" !== o) || "email" === o)) ||
      !r ||
      ("phone" !== e && "phone" !== o)
        ? "email"
        : "sms",
    _ = (0, a.z)((e) => {
      let i = (0, n.a)();
      return i?.appearance.logo
        ? (0, r.jsx)(V, { ...e, children: (0, r.jsx)(H, {}) })
        : null;
    })`
  margin-bottom: 16px;
`;
  e.s(
    [
      "C",
      0,
      ({ connectOnly: e }) => {
        let { closePrivyModal: a, connectors: v } = (0, c.u)(),
          {
            data: f,
            setModalData: x,
            onUserCloseViaDialogOrKeybindRef: m,
            navigate: b,
          } = (0, d.u)(),
          y = (0, n.a)(),
          w = y.appearance.palette.colorScheme,
          { accountType: C, walletClientType: j } = (0, g.h)(),
          A = (0, i.useMemo)(
            () =>
              C &&
              "guest" !== C &&
              "authorization_key" !== C &&
              "cross_app" !== C
                ? (0, p.t)(C)
                : null,
            [C],
          ),
          k = y.loginMethodsAndOrder?.primary ?? [],
          M = y.loginMethodsAndOrder?.overflow ?? [],
          S = (0, i.useMemo)(() => [...k, ...M], [k, M]),
          z = y.loginMethods.passkey,
          L = f?.login,
          E = [];
        j && S.includes(j)
          ? E.push(j)
          : C && S.includes(A?.loginMethod) && E.push(A?.loginMethod);
        let [B, T] = (0, i.useState)("default"),
          [H, V] = (0, i.useState)(
            J({
              mostRecentlyUsedAccountType: C,
              smsAvailable: S.includes("sms"),
              emailAvailable: S.includes("email"),
              prefilledType: L?.prefill?.type,
            }),
          );
        ((0, i.useEffect)(() => {
          V(
            J({
              mostRecentlyUsedAccountType: C,
              smsAvailable: S.includes("sms"),
              emailAvailable: S.includes("email"),
              prefilledType: L?.prefill?.type,
            }),
          );
        }, [S, C]),
          (0, i.useEffect)(() => {
            "phone" === C && V("sms");
            let e = S.indexOf("sms"),
              r = S.indexOf("email");
            e > -1 && e < r && V("sms");
          }, [C, k, M]));
        let D = () => {
          (a({ shouldCallAuthOnSuccess: !0 }),
            setTimeout(() => {
              T("default");
            }, 150));
        };
        m.current = D;
        let { listings: I } = (0, s.u)(),
          N = (i) => {
            if ("email" === i)
              return (0, r.jsx)(
                W,
                {
                  isEditable: "email" === H,
                  setIsEditable: () => {
                    V("email");
                  },
                  defaultValue:
                    "email" === L?.prefill?.type ? L.prefill.value : void 0,
                },
                i,
              );
            if ("sms" === i)
              return (0, r.jsx)(
                Z,
                {
                  isEditable: "sms" === H,
                  setIsEditable: () => {
                    V("sms");
                  },
                  defaultValue:
                    "phone" === L?.prefill?.type ? L.prefill.value : void 0,
                },
                i,
              );
            if ("apple" === i) return (0, r.jsx)(O, { provider: "apple" }, i);
            if ("discord" === i)
              return (0, r.jsx)(O, { provider: "discord" }, i);
            if ("farcaster" === i) return (0, r.jsx)(P, {}, i);
            if ("github" === i) return (0, r.jsx)(O, { provider: "github" }, i);
            if ("google" === i) return (0, r.jsx)(O, { provider: "google" }, i);
            if ("linkedin" === i)
              return (0, r.jsx)(O, { provider: "linkedin" }, i);
            if ("spotify" === i)
              return (0, r.jsx)(O, { provider: "spotify" }, i);
            if ("instagram" === i)
              return (0, r.jsx)(O, { provider: "instagram" }, i);
            if ("tiktok" === i) return (0, r.jsx)(O, { provider: "tiktok" }, i);
            if ("line" === i) return (0, r.jsx)(O, { provider: "line" }, i);
            if ("twitch" === i) return (0, r.jsx)(O, { provider: "twitch" }, i);
            if ("twitter" === i)
              return (0, r.jsx)(O, { provider: "twitter" }, i);
            if ("telegram" === i)
              return y.loginConfig.telegramHasHmacCredentials
                ? (0, r.jsx)(Q, {}, i)
                : (0, r.jsx)(O, { provider: "telegram" }, i);
            if (i.startsWith("privy:"))
              return (0, r.jsx)(F, { appId: i.replace("privy:", "") }, i);
            let o = y.appearance.walletChainType,
              a = new h.W(o, [i]).getWallets(v, I);
            return a.wallets.map((i, t) =>
              (0, r.jsx)(
                h.a,
                {
                  index: t,
                  data: {
                    wallets: a.wallets,
                    walletChainType: o,
                    handleWalletClick(r) {
                      (x((e) => ({
                        ...e,
                        externalConnectWallet: {
                          walletList: S,
                          walletChainType: o,
                          preSelectedWalletId: r.id,
                        },
                      })),
                        b(
                          e
                            ? "ConnectOnlyLandingScreen"
                            : "AuthenticateWithWalletScreen",
                        ));
                    },
                  },
                },
                i.id + t,
              ),
            );
          },
          R = E.flatMap(N),
          q = k.filter((e) => e !== j && e !== A?.loginMethod).flatMap(N),
          U = M.filter((e) => e !== j && e !== A?.loginMethod).flatMap(N),
          [X, Y] = (0, u.k)(
            [...R, ...q, ...U],
            (({ primary: e, overflow: r }) =>
              e < 5 ? e : 5 === e && 0 === r ? 5 : 4)({
              primary: q.length + R.length,
              overflow: U.length,
            }),
          );
        return (0, r.jsxs)(r.Fragment, {
          children: [
            (0, r.jsx)(l.M, {
              title: y.appearance.landingHeader,
              onClose: D,
              backFn:
                "default" === B
                  ? void 0
                  : () => {
                      T("default");
                    },
            }),
            "default" === B && (0, r.jsx)(_, {}),
            "default" === B &&
              ("string" == typeof y.appearance.loginMessage
                ? (0, r.jsx)(g.S, { children: y.appearance.loginMessage })
                : y.appearance.loginMessage),
            (0, r.jsx)(g.A, {
              style: { overflow: "hidden" },
              children: (0, r.jsxs)(g.o, {
                $colorScheme: w,
                children: [
                  "default" === B &&
                    (0, r.jsxs)(r.Fragment, {
                      children: [
                        X,
                        Y.length > 0 &&
                          (0, r.jsx)(K, {
                            text: "More options",
                            icon: (0, r.jsx)(o, {}),
                            onClick: () => T("overflow"),
                          }),
                      ],
                    }),
                  "overflow" === B && (0, r.jsx)(r.Fragment, { children: Y }),
                  z && "default" === B && (0, r.jsx)(G, {}),
                ],
              }),
            }),
            y && (0, r.jsx)(t.T, { app: y }),
            (0, r.jsx)(t.B, {}),
          ],
        });
      },
      "L",
      0,
      ({ connectOnly: e }) => {
        let { closePrivyModal: o } = (0, c.u)(),
          {
            data: a,
            setModalData: l,
            onUserCloseViaDialogOrKeybindRef: u,
            navigate: v,
          } = (0, d.u)(),
          f = (0, n.a)(),
          y = a?.login,
          w = f.appearance.walletList,
          C = y?.walletChainType ?? f.appearance.walletChainType,
          { accountType: A, walletClientType: k, chainType: M } = (0, g.h)(),
          S = (0, i.useMemo)(
            () =>
              A &&
              "guest" !== A &&
              "authorization_key" !== A &&
              "cross_app" !== A
                ? (0, p.t)(A)
                : null,
            [A],
          ),
          {
            email: z,
            sms: L,
            google: E,
            twitter: V,
            discord: D,
            github: I,
            spotify: q,
            instagram: U,
            tiktok: X,
            line: _,
            twitch: ee,
            linkedin: er,
            apple: ei,
            wallet: eo,
            farcaster: ea,
            telegram: et,
          } = (0, i.useMemo)(
            () => (y?.loginMethods ? (0, j.D)(y.loginMethods, !0) : null),
            [y],
          ) ?? f.loginMethods,
          { wallets: el } = (0, h.u)({
            enabled: (0, s.s)(eo ? w : []),
            walletList: w,
            walletChainType: C,
          }),
          en = f.customOAuthProviders,
          es = f.crossAppProviders,
          { passkey: ec } = f.loginMethods,
          ed = [
            z && "email",
            L && "sms",
            E && "google",
            V && "twitter",
            D && "discord",
            I && "github",
            q && "spotify",
            U && "instagram",
            X && "tiktok",
            _ && "line",
            ee && "twitch",
            er && "linkedin",
            ei && "apple",
            ea && "farcaster",
            et && "telegram",
            ...en.map((e) => e.provider),
            ...es,
          ].filter((e) => !!e),
          ep = ed.length > 0,
          eh = (0, i.useMemo)(
            () =>
              eo && !ep
                ? "web3-first"
                : (eo && f?.appearance.loginGroupPriority) || "web2-first",
            [eo, ep, f?.appearance.loginGroupPriority],
          ),
          eg = f?.appearance.hideDirectWeb2Inputs,
          [eu, ev] = (0, i.useState)("default"),
          [ef, ex] = (0, i.useState)(
            J({
              mostRecentlyUsedAccountType: A,
              smsAvailable: L,
              emailAvailable: z,
              prefilledType: y?.prefill?.type,
            }),
          );
        (0, i.useEffect)(() => {
          ex(
            J({
              mostRecentlyUsedAccountType: A,
              smsAvailable: L,
              emailAvailable: z,
              prefilledType: y?.prefill?.type,
            }),
          );
        }, [z, L, A]);
        let em = () => {
          (o({ shouldCallAuthOnSuccess: !0 }),
            setTimeout(() => {
              ev("default");
            }, 150));
        };
        u.current = em;
        let eb = [];
        k && eo
          ? eb.push(k)
          : S?.loginMethod &&
            ed.includes(S.loginMethod) &&
            eb.push(S.loginMethod);
        let ey = (i) => {
            if ("email" === i)
              return (0, r.jsx)(
                W,
                {
                  isEditable: "email" === ef,
                  setIsEditable: () => {
                    ex("email");
                  },
                  defaultValue:
                    "email" === y?.prefill?.type ? y.prefill.value : void 0,
                },
                i,
              );
            if ("sms" === i)
              return (0, r.jsx)(
                Z,
                {
                  isEditable: "sms" === ef,
                  setIsEditable: () => {
                    ex("sms");
                  },
                  defaultValue:
                    "phone" === y?.prefill?.type ? y.prefill.value : void 0,
                },
                i,
              );
            if ("apple" === i) return (0, r.jsx)(O, { provider: "apple" }, i);
            if ("discord" === i)
              return (0, r.jsx)(O, { provider: "discord" }, i);
            if ("farcaster" === i) return (0, r.jsx)(P, {}, i);
            if ("github" === i) return (0, r.jsx)(O, { provider: "github" }, i);
            if ("google" === i) return (0, r.jsx)(O, { provider: "google" }, i);
            if ("linkedin" === i)
              return (0, r.jsx)(O, { provider: "linkedin" }, i);
            if ("tiktok" === i) return (0, r.jsx)(O, { provider: "tiktok" }, i);
            if ("line" === i) return (0, r.jsx)(O, { provider: "line" }, i);
            if ("twitch" === i) return (0, r.jsx)(O, { provider: "twitch" }, i);
            if ("spotify" === i)
              return (0, r.jsx)(O, { provider: "spotify" }, i);
            if ("instagram" === i)
              return (0, r.jsx)(O, { provider: "instagram" }, i);
            if ("twitter" === i)
              return (0, r.jsx)(O, { provider: "twitter" }, i);
            if ("telegram" === i)
              return f.loginConfig.telegramHasHmacCredentials
                ? (0, r.jsx)(Q, {}, i)
                : (0, r.jsx)(O, { provider: "telegram" }, i);
            if ((0, n.i)(i)) return (0, r.jsx)(O, { provider: i }, i);
            if (i.startsWith("privy:")) {
              let e = i.split(":")[1];
              if (!e)
                throw Error(
                  "Invalid cross-app provider format. App ID missing.",
                );
              return (0, r.jsx)(F, { appId: e }, i);
            }
            let o = el.findIndex(({ id: e }) => e === h.W.normalize(i)),
              a = "solana" === M ? "solana-only" : "ethereum-only";
            return (0, r.jsx)(h.a, {
              recent: !0,
              index: o,
              data: {
                wallets: el,
                walletChainType: a,
                handleWalletClick(r) {
                  (l((e) => ({
                    ...e,
                    externalConnectWallet: {
                      walletList: w,
                      walletChainType: a,
                      preSelectedWalletId: r.id,
                    },
                  })),
                    v(
                      e
                        ? "ConnectOnlyLandingScreen"
                        : "AuthenticateWithWalletScreen",
                    ));
                },
              },
            });
          },
          ew = el.filter((e) => e.id !== h.W.normalize(k || "")),
          eC = ew.map((i, o) =>
            (0, r.jsx)(
              h.a,
              {
                index: o,
                data: {
                  walletChainType: C,
                  wallets: ew,
                  handleWalletClick(r) {
                    (l((e) => ({
                      ...e,
                      externalConnectWallet: {
                        walletList: w,
                        walletChainType: C,
                        preSelectedWalletId: r.id,
                      },
                    })),
                      v(
                        e
                          ? "ConnectOnlyLandingScreen"
                          : "AuthenticateWithWalletScreen",
                      ));
                  },
                },
              },
              i.id,
            ),
          ),
          ej = ed.filter((e) => e !== S?.loginMethod).flatMap(ey),
          eA = eb.flatMap(ey);
        "web3-first" === eh && "default" === eu
          ? eC.unshift(...eA)
          : "web2-first" === eh && ej.unshift(...eA);
        let ek = "web2-overflow" === eu ? () => ev("default") : void 0,
          eM = ed.filter((e) => "email" !== e && "sms" !== e),
          eS = (({ priority: e, email: r, sms: i, social: o }) =>
            "web2-first" === e
              ? "Other socials"
              : (r && i && o.length > 0) || (r && o.length > 0)
                ? "Log in with email or socials"
                : i && o.length > 0
                  ? "Log in with sms or socials"
                  : r && i
                    ? "Continue with email or sms"
                    : r
                      ? "Continue with email"
                      : i
                        ? "Continue with sms"
                        : "Log in with a social account")({
            priority: eh,
            email: z,
            sms: L,
            social: eM,
          }),
          ez = (({ priority: e, email: i, sms: o, social: a }) =>
            "web2-first" === e || a.length > 0
              ? (0, r.jsx)(b, {})
              : i && o
                ? (0, r.jsx)(N, {})
                : i
                  ? (0, r.jsx)(x.f, {})
                  : o
                    ? (0, r.jsx)(m.f, {})
                    : null)({ priority: eh, email: z, sms: L, social: eM }),
          eL = (0, r.jsx)(B.W, {
            text: (({ priority: e }) =>
              "web2-first" === e ? "Continue with a wallet" : "Other wallets")({
              priority: eh,
            }),
            onClick: () => {
              (l({
                ...a,
                externalConnectWallet: {
                  walletChainType:
                    y?.walletChainType ?? f.appearance.walletChainType,
                },
              }),
                v(
                  e
                    ? "ConnectOnlyLandingScreen"
                    : "AuthenticateWithWalletScreen",
                ));
            },
          }),
          eE = (0, r.jsx)(K, {
            text: eS,
            icon: ez,
            onClick: () => ev("web2-overflow"),
          }),
          eB = +!eg,
          eT = eo && eC.length > 0,
          eH = 0 === ej.length && eo && 0 === eC.length,
          eV = 5 - !!eT,
          eD = "default" === eu && f?.appearance.logo,
          eF = "default" === eu && f.appearance.loginMessage;
        return (0, r.jsxs)(T.S, {
          title: f.appearance.landingHeader,
          icon: eD ? (0, r.jsx)(H, {}) : void 0,
          iconVariant: eD ? "logo" : void 0,
          onClose: em,
          showClose: !0,
          onBack: ek,
          showBack: !!ek,
          helpText:
            f || (ec && "default" === eu)
              ? (0, r.jsxs)(r.Fragment, {
                  children: [
                    ec &&
                      "default" === eu &&
                      !f.globalDisablePasskeys &&
                      (0, r.jsx)(G, {}),
                    f && (0, r.jsx)(t.T, { app: f }),
                  ],
                })
              : void 0,
          watermark: !0,
          children: [
            eF &&
              ("string" == typeof f.appearance.loginMessage
                ? (0, r.jsx)(Y, { children: f.appearance.loginMessage })
                : (0, r.jsx)($, { children: f.appearance.loginMessage })),
            (0, r.jsx)(g.o, {
              $colorScheme: f.appearance.palette.colorScheme,
              children:
                "default" === eu && "web2-first" === eh
                  ? (0, r.jsxs)(r.Fragment, {
                      children: [
                        ej.length > eV ? ej.slice(0, eV - 1) : ej,
                        ej.length > eV && eE,
                        eT && eL,
                        eH &&
                          (0, r.jsx)(R, {
                            chainType: f.appearance.walletChainType,
                          }),
                      ],
                    })
                  : "default" === eu && "web3-first" === eh
                    ? (0, r.jsxs)(r.Fragment, {
                        children: [
                          eo &&
                            (0, r.jsxs)(r.Fragment, {
                              children: [
                                eC.length > eV ? eC.slice(0, eV - 1) : eC,
                                eC.length > eV && eL,
                              ],
                            }),
                          ej.length > eB && eE,
                          ej.length === eB && ej[0],
                          eH &&
                            (0, r.jsx)(R, {
                              chainType: f.appearance.walletChainType,
                            }),
                        ],
                      })
                    : "web2-overflow" === eu
                      ? (0, r.jsx)(r.Fragment, {
                          children: "web3-first" === eh ? ej : ej.slice(3),
                        })
                      : null,
            }),
          ],
        });
      },
    ],
    179011,
  );
};
