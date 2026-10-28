// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(352386),
    n = e.i(689391),
    r = e.i(703114),
    a = e.i(336291),
    i = e.i(809845),
    o = e.i(732486),
    l = e.i(933185),
    s = e.i(623213),
    d = e.i(748117);
  (e.i(461687), e.i(582355));
  var u = e.i(78436);
  let c = n.z.div`
  text-align: left;
  flex-grow: 1;
`,
    p = n.z.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  flex-grow: 1;
`,
    f = n.z.div`
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
    g = (0, n.z)(f)`
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
    h = n.m`
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
    m = n.z.div`
  text-align: center;
  font-size: 14px;
  margin-bottom: 24px;
`,
    v = n.z.button.attrs({ className: "login-method-button" })`
  ${h}
`;
  n.z.a`
  ${h}
`;
  let w = n.z.div`
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
    E = n.z.div`
  width: 100%;
  height: 100%;
  min-height: inherit;
  display: flex;
  flex-direction: column;
  ${(e) => (e.$if ? "display: none;" : "")}
`,
    y = n.z.div`
  width: 100%;
  height: 100%;
  padding: ${(e) => (e.$withPadding ? "64px 0px" : "0px")};
`,
    b = n.z.div`
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
  async function S(e, t, n) {
    if (!t.shouldEnforceDefaultChainOnConnect) return;
    let o = Number(e.chainId.replace("eip155:", ""));
    if (
      !t.chains.find((e) => e.id === o) &&
      ("wallet_connect_v2" !== e.connectorType ||
        "metamask" !== e.walletClientType)
    ) {
      n?.();
      try {
        (await e.switchChain(t.defaultChain.id),
          (e.chainId = (0, a.f)((0, r.g)(t.defaultChain.id))));
      } catch {
        i.c.warn("Unable to switch to default chain after connect", {
          chainId: t.defaultChain.id,
        });
      }
    }
  }
  let C = (0, t.createContext)({}),
    _ = (e) => `privy:${e}:recent-login-method`,
    x = (e) => `privy:${e}:recent-login-wallet-client`,
    k = (e) => `privy:${e}:recent-login-chain-type`,
    A = (0, u.$)(() => ({ isModalOpen: !1, resolvers: null }));
  (0, u.$)(() => ({}));
  e.s([
    "A",
    0,
    p,
    "E",
    0,
    y,
    "G",
    0,
    c,
    "H",
    0,
    E,
    "L",
    0,
    v,
    "R",
    0,
    ({ children: e }) => {
      let n = (0, l.a)(),
        [r, i] = (0, t.useState)({});
      return (
        (0, s.u)("login", {
          onComplete: ({ loginAccount: e }) => {
            e &&
              "passkey" !== e.type &&
              "cross_app" !== e.type &&
              ("wallet" !== e.type || "privy" !== e.walletClientType) &&
              (a.s.put(_(n.id), e.type),
              "wallet" === e.type
                ? (a.s.put(x(n.id), e.walletClientType),
                  a.s.put(k(n.id), e.chainType),
                  i({
                    accountType: e.type,
                    walletClientType: e.walletClientType,
                    chainType: e.chainType,
                  }))
                : (a.s.del(x(n.id)),
                  a.s.del(k(n.id)),
                  i({ accountType: e.type })));
          },
        }),
        (0, t.useEffect)(() => {
          if (!n.id) return;
          let e = a.s.get(_(n.id)),
            t = a.s.get(x(n.id)),
            r = a.s.get(k(n.id));
          e &&
            i(
              "wallet" === e
                ? { accountType: e, walletClientType: t, chainType: r }
                : { accountType: e },
            );
        }, [n.id]),
        (0, o.jsx)(C.Provider, { value: r, children: e })
      );
    },
    "S",
    0,
    m,
    "a",
    0,
    (e) => {
      (0, s.u)("fundWallet", e);
      let { fundWallet: t } = (0, d.u)();
      return { fundWallet: ({ address: e, options: n }) => t(e, n) };
    },
    "d",
    0,
    function (e) {
      let { login: n } = (0, t.useContext)(l.P);
      return ((0, s.u)("login", e), { login: n });
    },
    "e",
    0,
    S,
    "f",
    0,
    function (e) {
      let { logout: n } = (0, t.useContext)(l.P);
      return ((0, s.u)("logout", e), { logout: n });
    },
    "h",
    0,
    () => (0, t.useContext)(C),
    "m",
    0,
    w,
    "n",
    0,
    b,
    "o",
    0,
    g,
    "p",
    0,
    f,
    "s",
    0,
    ({ address: e, client: t, appId: n }) => {
      let r,
        i = `${t}:${e}`;
      (n && a.s.put(((r = n), `privy:${r}:active-wallet-connection`), i),
        A.setState({ wallet: i }));
    },
    "u",
    0,
    (e) => {
      let [n, r] = (0, t.useState)("auto");
      return (
        (0, t.useEffect)(() => {
          let t = new ResizeObserver((e) => {
            r(e[0]?.contentRect.height ?? "auto");
          });
          return (
            e.current && t.observe(e.current),
            () => {
              e.current && t.unobserve(e.current);
            }
          );
        }, [e.current]),
        n
      );
    },
  ]);
};
