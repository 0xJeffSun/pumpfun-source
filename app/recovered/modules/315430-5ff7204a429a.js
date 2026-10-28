// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(352386),
    r = e.i(689391),
    n = e.i(703114),
    i = e.i(336291),
    a = e.i(809845),
    o = e.i(732486),
    s = e.i(933185),
    l = e.i(623213),
    u = e.i(748117);
  (e.i(461687), e.i(582355));
  var d = e.i(78436);
  let c = r.z.div`
  text-align: left;
  flex-grow: 1;
`,
    p = r.z.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  flex-grow: 1;
`,
    f = r.z.div`
  display: flex;
  flex-direction: column;
  gap: 8px;

  /* for Internet Explorer, Edge */
  -ms-overflow-style: none;

  /* for Firefox */
  scrollbar-width: none;

  /* for Chrome, Safari, and Opera */
  &::-webkit-scrollbar {
    display: none;
  }
`,
    m = (0, r.z)(f)`
  ${(e) => ("light" === e.$colorScheme ? "background: linear-gradient(var(--privy-color-background), var(--privy-color-background) 70%) bottom, linear-gradient(rgba(0, 0, 0, 0) 20%, rgba(0, 0, 0, 0.06)) bottom;" : "dark" === e.$colorScheme ? "background: linear-gradient(var(--privy-color-background), var(--privy-color-background) 70%) bottom, linear-gradient(rgba(255, 255, 255, 0) 20%, rgba(255, 255, 255, 0.06)) bottom;" : void 0)}

  background-repeat: no-repeat;
  background-size:
    100% 32px,
    100% 16px;
  background-attachment: local, scroll;
  max-height: 400px;
  overflow-y: auto;
  scrollbar-width: none;
  padding: 3px;
`,
    g = r.m`
  && {
    width: 100%;
    font-size: 16px;
    line-height: 24px;
    min-height: 56px;

    /* Tablet and Up */
    @media (min-width: 440px) {
      font-size: 14px;
    }

    display: flex;
    gap: 12px;
    align-items: center;
    color: var(--privy-color-foreground);

    padding: 10px 12px;
    border: 1px solid var(--privy-color-foreground-4) !important;
    border-radius: var(--privy-border-radius-md);
    transition: background-color 200ms ease;

    cursor: pointer;

    &:hover {
      background-color: var(--privy-color-background-2);
    }

    &:disabled {
      cursor: pointer;
      background-color: var(--privy-color-background-2);
    }
  }
`,
    y = r.z.div`
  text-align: center;
  font-size: 14px;
  margin-bottom: 24px;
`,
    h = r.z.button.attrs({ className: "login-method-button" })`
  ${g}
`;
  r.z.a`
  ${g}
`;
  let v = r.z.div`
  width: 32px;
  height: 32px;
  border-radius: ${(e) => (e.$fullSize ? "0" : "4px")};
  background: ${(e) => (e.$fullSize ? "transparent" : "var(--privy-color-background-2)")};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;

  svg {
    width: ${(e) => (e.$fullSize ? "32px" : "18px")};
    height: ${(e) => (e.$fullSize ? "32px" : "18px")};
    color: ${(e) => (e.$fullSize ? "inherit" : "var(--privy-color-icon-muted)")};
  }
`,
    w = r.z.div`
  width: 100%;
  height: 100%;
  min-height: inherit;
  display: flex;
  flex-direction: column;
  ${(e) => (e.$if ? "display: none;" : "")}
`,
    E = r.z.div`
  width: 100%;
  height: 100%;
  padding: ${(e) => (e.$withPadding ? "64px 0px" : "0px")};
`,
    b = r.z.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 32px;
  gap: 12px;
  & h3 {
    font-size: 18px;
    font-style: normal;
    font-weight: 600;
    line-height: 24px;
  }
  & p {
    max-width: 300px;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 20px;
  }
`;
  async function x(e, t, r) {
    if (!t.shouldEnforceDefaultChainOnConnect) return;
    let o = Number(e.chainId.replace("eip155:", ""));
    if (
      !t.chains.find((e) => e.id === o) &&
      ("wallet_connect_v2" !== e.connectorType ||
        "metamask" !== e.walletClientType)
    ) {
      r?.();
      try {
        (await e.switchChain(t.defaultChain.id),
          (e.chainId = (0, i.f)((0, n.g)(t.defaultChain.id))));
      } catch {
        a.c.warn("Unable to switch to default chain after connect", {
          chainId: t.defaultChain.id,
        });
      }
    }
  }
  let A = (0, t.createContext)({}),
    I = (e) => `privy:${e}:recent-login-method`,
    $ = (e) => `privy:${e}:recent-login-wallet-client`,
    S = (e) => `privy:${e}:recent-login-chain-type`,
    M = (0, d.$)(() => ({ isModalOpen: !1, resolvers: null }));
  (0, d.$)(() => ({}));
  e.s([
    "A",
    0,
    p,
    "E",
    0,
    E,
    "G",
    0,
    c,
    "H",
    0,
    w,
    "L",
    0,
    h,
    "R",
    0,
    ({ children: e }) => {
      let r = (0, s.a)(),
        [n, a] = (0, t.useState)({});
      return (
        (0, l.u)("login", {
          onComplete: ({ loginAccount: e }) => {
            e &&
              "passkey" !== e.type &&
              "cross_app" !== e.type &&
              ("wallet" !== e.type || "privy" !== e.walletClientType) &&
              (i.s.put(I(r.id), e.type),
              "wallet" === e.type
                ? (i.s.put($(r.id), e.walletClientType),
                  i.s.put(S(r.id), e.chainType),
                  a({
                    accountType: e.type,
                    walletClientType: e.walletClientType,
                    chainType: e.chainType,
                  }))
                : (i.s.del($(r.id)),
                  i.s.del(S(r.id)),
                  a({ accountType: e.type })));
          },
        }),
        (0, t.useEffect)(() => {
          if (!r.id) return;
          let e = i.s.get(I(r.id)),
            t = i.s.get($(r.id)),
            n = i.s.get(S(r.id));
          e &&
            a(
              "wallet" === e
                ? { accountType: e, walletClientType: t, chainType: n }
                : { accountType: e },
            );
        }, [r.id]),
        (0, o.jsx)(A.Provider, { value: n, children: e })
      );
    },
    "S",
    0,
    y,
    "a",
    0,
    (e) => {
      (0, l.u)("fundWallet", e);
      let { fundWallet: t } = (0, u.u)();
      return { fundWallet: ({ address: e, options: r }) => t(e, r) };
    },
    "d",
    0,
    function (e) {
      let { login: r } = (0, t.useContext)(s.P);
      return ((0, l.u)("login", e), { login: r });
    },
    "e",
    0,
    x,
    "f",
    0,
    function (e) {
      let { logout: r } = (0, t.useContext)(s.P);
      return ((0, l.u)("logout", e), { logout: r });
    },
    "h",
    0,
    () => (0, t.useContext)(A),
    "m",
    0,
    v,
    "n",
    0,
    b,
    "o",
    0,
    m,
    "p",
    0,
    f,
    "s",
    0,
    ({ address: e, client: t, appId: r }) => {
      let n,
        a = `${t}:${e}`;
      (r && i.s.put(((n = r), `privy:${n}:active-wallet-connection`), a),
        M.setState({ wallet: a }));
    },
    "u",
    0,
    (e) => {
      let [r, n] = (0, t.useState)("auto");
      return (
        (0, t.useEffect)(() => {
          let t = new ResizeObserver((e) => {
            n(e[0]?.contentRect.height ?? "auto");
          });
          return (
            e.current && t.observe(e.current),
            () => {
              e.current && t.unobserve(e.current);
            }
          );
        }, [e.current]),
        r
      );
    },
  ]);
};
