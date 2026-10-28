// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(732486),
    i = e.i(352386);
  let n = i.forwardRef(function ({ title: e, titleId: t, ...n }, a) {
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
          "aria-labelledby": t,
        },
        n,
      ),
      e ? i.createElement("title", { id: t }, e) : null,
      i.createElement("path", {
        strokeLinecap: "round",
        strokeLinejoin: "round",
        d: "m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z",
      }),
    );
  });
  var a = e.i(659226),
    r = e.i(768820),
    l = e.i(689391),
    o = e.i(995040),
    s = e.i(164923),
    c = e.i(583503),
    d = e.i(25047),
    u = e.i(594022),
    p = e.i(305869),
    h = e.i(933185),
    g = e.i(439614),
    m = e.i(461687),
    w = e.i(809845),
    y = e.i(565530),
    f = e.i(748117),
    v = e.i(480705),
    b = e.i(315430),
    C = e.i(786847),
    x = e.i(612269);
  let S = {
    phantom: {
      mobile: { native: "phantom://", universal: "https://phantom.app/ul/" },
    },
    solflare: {
      mobile: { native: void 0, universal: "https://solflare.com/ul/v1/" },
    },
    metamask: { image_url: { sm: m.M, md: m.M } },
    "okx-wallet": {
      mobile: { native: "okex://main", universal: "okex://main" },
    },
    "okx-wallet-1": {
      mobile: { native: "okxwallet://main", universal: "okxwallet://main" },
    },
  };
  class T {
    static normalize(e) {
      return e
        .replace(/[-_]wallet$/, "")
        .replace(/[-_]extension$/, "")
        .toLowerCase();
    }
    isEth(e) {
      return e.chains.some((e) => e.includes("eip155:"));
    }
    isSol(e) {
      return e.chains.some((e) => e.includes("solana:"));
    }
    inAllowList(e, t) {
      if (
        !this.normalizedAllowList ||
        0 === this.normalizedAllowList.length ||
        ("listing" === t && this.includeWalletConnect)
      )
        return !0;
      let i = T.normalize(e);
      return this.normalizedAllowList.some((e) => i === T.normalize(e));
    }
    inDenyList(e, t) {
      return ("listing" === t && "rabby" === e) || "agw" === T.normalize(e);
    }
    chainMatches(e) {
      return "ethereum-only" === this.chainFilter
        ? "ethereum" === e
        : "solana-only" !== this.chainFilter || "solana" === e;
    }
    getAllowListKey(e, t, i, n) {
      let a = T.normalize(e);
      for (let e of this.normalizedAllowList || [])
        if (a === T.normalize(e)) return e;
      if ("connector" === t) {
        if (
          ("injected" === i || "solana_adapter" === i) &&
          "ethereum" === n &&
          this.detectedEth
        )
          return "detected_ethereum_wallets";
        if (
          ("injected" === i || "solana_adapter" === i) &&
          "solana" === n &&
          this.detectedSol
        )
          return "detected_solana_wallets";
      }
      if ("listing" === t && this.includeWalletConnect) return "wallet_connect";
    }
    connectorOk(e) {
      return !!(
        "null" !== e.connectorType &&
        "walletconnect_solana" !== e.walletBranding.id &&
        this.chainMatches(e.chainType) &&
        (this.inAllowList(e.walletClientType, "connector") ||
          (("injected" === e.connectorType ||
            "solana_adapter" === e.connectorType) &&
            (("ethereum" === e.chainType && this.detectedEth) ||
              ("solana" === e.chainType && this.detectedSol))))
      );
    }
    listingOk(e) {
      if (e.slug.includes("coinbase")) return !1;
      if ("ethereum-only" === this.chainFilter) {
        if (!this.isEth(e)) return !1;
      } else if ("solana-only" === this.chainFilter && !this.isSol(e))
        return !1;
      return !(
        !this.inAllowList(e.slug, "listing") ||
        this.inDenyList(e.slug, "listing")
      );
    }
    getWallets(e, t) {
      let i = new Map(),
        n = (e) => {
          let t = i.get(e.id);
          if (t) {
            t.chainType !== e.chainType && (t.chainType = "multi");
            let i = new Set(t.chains);
            (e.chains.forEach((e) => i.add(e)),
              (t.chains = Array.from(i)),
              !t.icon && e.icon && (t.icon = e.icon),
              !t.url && e.url && (t.url = e.url),
              !t.listing && e.listing && (t.listing = e.listing),
              !t.allowListKey &&
                e.allowListKey &&
                (t.allowListKey = e.allowListKey));
          } else i.set(e.id, e);
        };
      e.filter((e) => this.connectorOk(e)).forEach((e) => {
        let t = T.normalize(e.walletClientType);
        n({
          id: t,
          label: e.walletBranding?.name ?? t,
          source: "connector",
          connector: e,
          chainType: e.chainType,
          icon: e.walletBranding?.icon,
          url: void 0,
          chains: ["ethereum" === e.chainType ? "eip155" : "solana"],
          allowListKey: this.getAllowListKey(
            e.walletClientType,
            "connector",
            e.connectorType,
            e.chainType,
          ),
        });
      });
      let a = e.find((e) => "wallet_connect_v2" === e.connectorType),
        r = e.find((e) => "walletconnect_solana" === e.walletBranding.id);
      (t
        .filter((e) => this.listingOk(e))
        .forEach((t) => {
          let i = [...t.chains].filter(
            (e) => e.includes("eip155:") || e.includes("solana:"),
          );
          if (
            (e.some(
              (e) =>
                T.normalize(e.walletClientType) === T.normalize(t.slug) &&
                "ethereum" === e.chainType &&
                "null" !== e.connectorType,
            ) ||
              a ||
              t.mobile.native ||
              t.mobile.universal ||
              m.m[t.slug]?.chainTypes.includes("ethereum") ||
              (i = i.filter((e) => !e.includes("eip155:"))),
            e.some(
              (e) =>
                T.normalize(e.walletClientType) === T.normalize(t.slug) &&
                "solana" === e.chainType &&
                "null" !== e.connectorType,
            ) ||
              r ||
              t.mobile.native ||
              t.mobile.universal ||
              m.m[t.slug]?.chainTypes.includes("solana") ||
              (i = i.filter((e) => !e.includes("solana:"))),
            !i.length)
          )
            return;
          let l = T.normalize(t.slug),
            o = S[t.slug],
            s = o?.image_url?.sm || t.image_url?.sm;
          (i.some((e) => e.includes("eip155:")) &&
            n({
              id: l,
              label: t.name || l,
              source: "listing",
              listing: t,
              chainType: "ethereum",
              icon: s,
              url: t.homepage,
              chains: i,
              allowListKey: this.getAllowListKey(t.slug, "listing"),
            }),
            i.some((e) => e.includes("solana:")) &&
              n({
                id: l,
                label: t.name || l,
                source: "listing",
                listing: t,
                chainType: "solana",
                icon: s,
                url: t.homepage,
                chains: i,
                allowListKey: this.getAllowListKey(t.slug, "listing"),
              }));
        }),
        this.includeWalletConnectQr &&
          a &&
          n({
            id: "wallet_connect_qr",
            label: "WalletConnect",
            source: "connector",
            connector: a,
            chainType: "ethereum",
            icon: w.a,
            url: void 0,
            chains: ["eip155"],
            allowListKey: "wallet_connect_qr",
          }),
        this.includeWalletConnectQrSolana &&
          r &&
          n({
            id: "wallet_connect_qr_solana",
            label: "WalletConnect",
            source: "connector",
            connector: r,
            chainType: "solana",
            icon: w.a,
            url: void 0,
            chains: ["solana"],
            allowListKey: "wallet_connect_qr_solana",
          }));
      let l = Array.from(i.values());
      l.forEach((e) => {
        let t = S[e.listing?.slug || e.id];
        t?.image_url?.sm && (e.icon = t.image_url.sm);
      });
      let o = new Map();
      return (
        this.normalizedAllowList?.forEach((e, t) => {
          o.set(T.normalize(e), t);
        }),
        {
          wallets: l.slice().sort((e, t) => {
            if (e.allowListKey && t.allowListKey) {
              let i =
                  this.normalizedAllowList?.findIndex(
                    (t) => T.normalize(t) === T.normalize(e.allowListKey),
                  ) ?? -1,
                n =
                  this.normalizedAllowList?.findIndex(
                    (e) => T.normalize(e) === T.normalize(t.allowListKey),
                  ) ?? -1;
              if (i !== n && i >= 0 && n >= 0) return i - n;
            }
            if (e.allowListKey && !t.allowListKey) return -1;
            if (!e.allowListKey && t.allowListKey) return 1;
            let i = T.normalize(e.id),
              n = T.normalize(t.id);
            ("binance-defi" === i
              ? (i = "binance")
              : "universalprofiles" === i
                ? (i = "universal_profile")
                : "cryptocom-defi" === i
                  ? (i = "cryptocom")
                  : "bitkeep" === i && (i = "bitget_wallet"),
              "binance-defi" === n
                ? (n = "binance")
                : "universalprofiles" === n
                  ? (n = "universal_profile")
                  : "cryptocom-defi" === n
                    ? (n = "cryptocom")
                    : "bitkeep" === n && (n = "bitget_wallet"));
            let a = o.has(i),
              r = o.has(n);
            return a && r
              ? o.get(i) - o.get(n)
              : a
                ? -1
                : r
                  ? 1
                  : "connector" === e.source && "listing" === t.source
                    ? -1
                    : "listing" === e.source && "connector" === t.source
                      ? 1
                      : e.label
                          .toLowerCase()
                          .localeCompare(t.label.toLowerCase());
          }),
          walletCount: l.length,
        }
      );
    }
    constructor(e, t) {
      if (((this.chainFilter = e), t && t.length > 0)) {
        if (
          ((this.normalizedAllowList = t.map(String)),
          this.normalizedAllowList.includes("binance"))
        ) {
          let e = this.normalizedAllowList.indexOf("binance");
          this.normalizedAllowList.splice(e + 1, 0, "binance-defi-wallet");
        }
        if (this.normalizedAllowList.includes("bitget_wallet")) {
          let e = this.normalizedAllowList.indexOf("bitget_wallet");
          this.normalizedAllowList.splice(e + 1, 0, "bitkeep");
        }
      }
      ((this.detectedEth =
        this.normalizedAllowList?.includes("detected_ethereum_wallets") ?? !1),
        (this.detectedSol =
          this.normalizedAllowList?.includes("detected_solana_wallets") ?? !1),
        (this.includeWalletConnect =
          this.normalizedAllowList?.includes("wallet_connect") ?? !1),
        (this.includeWalletConnectQr =
          this.normalizedAllowList?.includes("wallet_connect_qr") ?? !1),
        (this.includeWalletConnectQrSolana =
          this.normalizedAllowList?.includes("wallet_connect_qr_solana") ??
          !1));
    }
  }
  var V = (e) =>
      (0, t.jsxs)("svg", {
        viewBox: "0 0 32 32",
        xmlns: "http://www.w3.org/2000/svg",
        ...e,
        children: [
          (0, t.jsx)("path", { d: "m0 0h32v32h-32z", fill: "#5469d4" }),
          (0, t.jsx)("path", {
            d: "m15.997 5.333-.143.486v14.106l.143.143 6.548-3.87z",
            fill: "#c2ccf4",
          }),
          (0, t.jsx)("path", {
            d: "m15.996 5.333-6.548 10.865 6.548 3.87z",
            fill: "#fff",
          }),
          (0, t.jsx)("path", {
            d: "m15.997 21.306-.08.098v5.025l.08.236 6.552-9.227z",
            fill: "#c2ccf4",
          }),
          (0, t.jsx)("path", {
            d: "m15.996 26.665v-5.36l-6.548-3.867z",
            fill: "#fff",
          }),
          (0, t.jsx)("path", {
            d: "m15.995 20.07 6.548-3.87-6.548-2.976v6.847z",
            fill: "#8698e8",
          }),
          (0, t.jsx)("path", {
            d: "m9.448 16.2 6.548 3.87v-6.846z",
            fill: "#c2ccf4",
          }),
        ],
      }),
    k = (e) =>
      (0, t.jsxs)("svg", {
        viewBox: "0 0 32 32",
        xmlns: "http://www.w3.org/2000/svg",
        ...e,
        children: [
          (0, t.jsxs)("linearGradient", {
            id: "a",
            gradientUnits: "userSpaceOnUse",
            x1: "7.233",
            x2: "24.766",
            y1: "24.766",
            y2: "7.234",
            children: [
              (0, t.jsx)("stop", { offset: "0", stopColor: "#9945ff" }),
              (0, t.jsx)("stop", { offset: ".2", stopColor: "#7962e7" }),
              (0, t.jsx)("stop", { offset: "1", stopColor: "#00d18c" }),
            ],
          }),
          (0, t.jsx)("path", { d: "m0 0h32v32h-32z", fill: "#10111a" }),
          (0, t.jsx)("path", {
            clipRule: "evenodd",
            d: "m9.873 20.41a.645.645 0 0 1 .476-.21l14.662.012a.323.323 0 0 1 .238.54l-3.123 3.438a.643.643 0 0 1 -.475.21l-14.662-.012a.323.323 0 0 1 -.238-.54zm15.376-2.862a.322.322 0 0 1 -.238.54l-14.662.012a.642.642 0 0 1 -.476-.21l-3.122-3.44a.323.323 0 0 1 .238-.54l14.662-.012a.644.644 0 0 1 .475.21zm-15.376-9.738a.644.644 0 0 1 .476-.21l14.662.012a.322.322 0 0 1 .238.54l-3.123 3.438a.643.643 0 0 1 -.475.21l-14.662-.012a.323.323 0 0 1 -.238-.54z",
            fill: "url(#a)",
            fillRule: "evenodd",
          }),
        ],
      });
  function j({ enabled: e = !0, walletList: t, walletChainType: n }) {
    let a = (0, h.a)(),
      { connectors: r } = (0, f.u)(),
      { listings: l, loading: o } = (0, m.u)(e),
      s = n ?? a.appearance.walletChainType,
      c = t ?? a.appearance?.walletList,
      d = (0, i.useMemo)(() => new T(s, c), [s, c]),
      { wallets: u, walletCount: p } = (0, i.useMemo)(
        () => d.getWallets(r, l),
        [d, r, l],
      ),
      [g, w] = (0, i.useState)(""),
      y = (0, i.useMemo)(
        () =>
          g
            ? u.filter((e) => e.label.toLowerCase().includes(g.toLowerCase()))
            : u,
        [g, u],
      ),
      [v, b] = (0, i.useState)();
    return {
      selected: v,
      setSelected: b,
      search: g,
      setSearch: w,
      loadingListings: o,
      wallets: y,
      walletCount: p,
    };
  }
  let z = (e) =>
      !e || ("string" != typeof e && (e instanceof m.j || e instanceof m.S)),
    D = ({ index: e, style: i, data: n, recent: a }) => {
      let r = n.wallets[e],
        { walletChainType: l, handleWalletClick: o } = n,
        { t: s } = (0, g.u)(),
        c = { ...i, boxSizing: "border-box" };
      return r
        ? (0, t.jsxs)(F, {
            style: c,
            onClick: () => o(r),
            children: [
              r.icon &&
                (r.connector && !z(r.connector)
                  ? (0, t.jsx)(C.b, {
                      children:
                        "string" == typeof r.icon
                          ? (0, t.jsx)(C.W, { src: r.icon })
                          : (0, t.jsx)(r.icon, {
                              style: { width: "32px", height: "32px" },
                            }),
                    })
                  : "string" == typeof r.icon
                    ? (0, t.jsx)(C.W, { src: r.icon })
                    : (0, t.jsx)(r.icon, {
                        style: { width: "32px", height: "32px" },
                      })),
              (0, t.jsx)(P, { children: r.label }),
              a
                ? (0, t.jsxs)(t.Fragment, {
                    children: [
                      (0, t.jsx)(C.C, {
                        children: s("connectWallet.lastUsed"),
                      }),
                      (0, t.jsx)(_, {
                        children: (0, t.jsxs)(t.Fragment, {
                          children: [
                            "ethereum-only" === l && (0, t.jsx)(V, {}),
                            "solana-only" === l && (0, t.jsx)(k, {}),
                          ],
                        }),
                      }),
                    ],
                  })
                : (0, t.jsx)(_, {
                    children:
                      "ethereum-only" !== l &&
                      "solana-only" !== l &&
                      (0, t.jsxs)(t.Fragment, {
                        children: [
                          r.chains?.some((e) => e.startsWith("eip155")) &&
                            (0, t.jsx)(V, {}),
                          r.chains?.some((e) => e.startsWith("solana")) &&
                            (0, t.jsx)(k, {}),
                        ],
                      }),
                  }),
            ],
          })
        : null;
    },
    W = l.z.div`
  position: sticky;
  /* Offset by negative margin to account for focus outline */
  margin-top: -3px;
  padding-top: 3px;
  top: -3px;
  z-index: 1;
  background: var(--privy-color-background);
  padding-bottom: calc(var(--screen-space) / 2);
`,
    L = l.z.div`
  display: flex;
  flex-direction: column;
  gap: ${5}px;
`,
    F = l.z.button`
  && {
    gap: 0.5rem;
    align-items: center;
    display: flex;
    position: relative;
    text-align: left;
    font-weight: 500;
    transition: background 200ms ease-in;
    width: calc(100% - 4px);
    border-radius: var(--privy-border-radius-md);
    padding: 0.75em;
    border: 1px solid var(--privy-color-foreground-4);
    justify-content: space-between;
  }

  &:hover {
    background: var(--privy-color-background-2);
  }
`,
    _ = l.z.span`
  display: flex;
  align-items: center;
  justify-content: end;
  position: relative;

  & > svg {
    border-radius: var(--privy-border-radius-full);
    stroke-width: 2.5;
    width: 100%;
    max-height: 1rem;
    max-width: 1rem;
    flex-shrink: 0;
  }

  & > svg:not(:last-child) {
    border-radius: var(--privy-border-radius-full);
    margin-right: -0.375rem;
  }
`,
    U = l.z.div`
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
`,
    P = l.z.span`
  text-overflow: ellipsis;
  white-space: nowrap;
  color: var(--privy-color-foreground);
  font-weight: 400;
  flex: 1;
`,
    A = (0, l.z)(s.C)`
  && {
    margin: 0.5rem auto 0;
  }
`,
    $ = l.z.div`
  text-align: center;
  margin-top: 1rem;
  font-size: 0.875rem;
  font-weight: 400;
  color: var(--privy-color-foreground-3);
`;
  e.s(
    [
      "W",
      0,
      T,
      "a",
      0,
      D,
      "i",
      0,
      ({
        className: e,
        customDescription: l,
        connectOnly: s,
        preSelectedWalletId: E,
        hideHeader: N,
        ...B
      }) => {
        let I = (0, h.a)(),
          { t: M } = (0, g.u)(),
          { connectors: R } = (0, f.u)(),
          O = B.walletChainType || I.appearance.walletChainType,
          q = B.walletList || I.appearance?.walletList,
          { onBack: K, onClose: Q, app: H } = B,
          {
            selected: Y,
            setSelected: G,
            qrUrl: Z,
            setQrUrl: J,
            connecting: X,
            uiState: ee,
            errorCode: et,
            wallets: ei,
            walletCount: en,
            handleConnect: ea,
            handleBack: er,
            showSearchBar: el,
            isInitialConnectView: eo,
            title: es,
            search: ec,
            setSearch: ed,
          } = (function ({
            onConnect: e,
            onBack: t,
            onClose: n,
            onConnectError: a,
            walletList: l,
            walletChainType: o,
            app: s,
          }) {
            let c = (0, h.a)(),
              { connectors: d } = (0, f.u)(),
              { t: u } = (0, g.u)(),
              {
                wallets: p,
                walletCount: v,
                search: C,
                setSearch: x,
                selected: S,
                setSelected: T,
              } = j({
                enabled: (0, m.s)(l ?? []),
                walletList: l,
                walletChainType: o,
              }),
              [V, k] = (0, i.useState)(),
              [z, D] = (0, i.useState)(),
              [W, L] = (0, i.useState)(),
              [F, _] = (0, i.useState)(),
              U = !S && !W && !F,
              P = U && (v > 6 || C.length > 0),
              A = d.find((e) => "wallet_connect_v2" === e.connectorType),
              $ = (0, i.useCallback)(
                async (t, i) => {
                  if (!t) return;
                  let n = i?.name ?? "Wallet";
                  if (F?.connector !== t || "loading" !== V) {
                    if ((k("loading"), "string" == typeof t))
                      return (
                        w.c.debug("Connecting wallet via deeplink", {
                          wallet: n,
                          url: t.length > 80 ? `${t.slice(0, 80)}...` : t,
                        }),
                        _({
                          connector: t,
                          name: n,
                          icon: i?.icon,
                          id: i?.id,
                          url: i?.url,
                        }),
                        void window.open(t, "_blank")
                      );
                    (w.c.debug("Connecting wallet via connector", {
                      wallet: n,
                      connectorType: t.connectorType,
                    }),
                      _({
                        connector: t,
                        name: i?.name ?? t.walletBranding.name ?? "Wallet",
                        icon: i?.icon ?? t.walletBranding.icon,
                        id: i?.id,
                        url: i?.url,
                      }));
                    try {
                      let i = await t.connect({ showPrompt: !0 });
                      if (!i)
                        return (
                          w.c.warn("Wallet connection returned null", {
                            wallet: n,
                            connectorType: t.connectorType,
                          }),
                          k("error"),
                          D(void 0),
                          void a?.(new y.e("Unable to connect wallet"))
                        );
                      (w.c.debug("Wallet connection successful", {
                        wallet: n,
                        connectorType: t.connectorType,
                      }),
                        (0, m.i)(i) && (await (0, b.e)(i, c)),
                        k("success"),
                        D(void 0),
                        (0, b.s)({
                          address: i.address,
                          client: i.walletClientType,
                          appId: c.id,
                        }),
                        setTimeout(() => {
                          e({ connector: t, wallet: i });
                        }, h.Q));
                    } catch (i) {
                      if (
                        i?.message?.includes("already pending for origin") ||
                        i?.message?.includes("wallet_requestPermissions")
                      )
                        return void w.c.debug(
                          "Connection request already pending, maintaining loading state",
                          { wallet: n },
                        );
                      let e =
                        i instanceof Error
                          ? i.message
                          : String(i?.message || "Unknown error");
                      (w.c.error("Wallet connection failed", i, {
                        wallet: n,
                        connectorType: t.connectorType,
                        errorCode: i?.privyErrorCode,
                      }),
                        k("error"),
                        D(i?.privyErrorCode),
                        a?.(
                          i instanceof Error
                            ? i
                            : new y.e(e || "Unable to connect wallet"),
                        ));
                    }
                  } else
                    w.c.debug("Duplicate connection attempt prevented", {
                      wallet: n,
                    });
                },
                [c.id, e, F, V],
              ),
              E = (0, i.useCallback)(
                () =>
                  W
                    ? (k(void 0), D(void 0), _(void 0), void L(void 0))
                    : F
                      ? (k(void 0), D(void 0), void _(void 0))
                      : S
                        ? (k(void 0), D(void 0), _(void 0), void T(void 0))
                        : "error" === V || "loading" === V
                          ? (k(void 0), D(void 0), void _(void 0))
                          : void t?.(),
                [W, F, S, V, t],
              ),
              N = (0, i.useMemo)(
                () =>
                  F?.connector === A && W && r.isMobile && F?.name
                    ? u("connectWallet.goToWallet", { walletName: F.name })
                    : F?.connector === A && W && F?.name
                      ? u("connectWallet.scanToConnect", { walletName: F.name })
                      : W && F?.name
                        ? u(
                            r.isMobile
                              ? "connectWallet.goToWallet"
                              : "connectWallet.scanToConnect",
                            { walletName: F.name },
                          )
                        : "string" == typeof F?.connector
                          ? u("connectWallet.openOrInstall", {
                              walletName: F.name,
                            })
                          : S && !F
                            ? u("connectWallet.selectNetwork")
                            : F
                              ? null
                              : u("connectWallet.selectYourWallet"),
                [F, W, S, A, u],
              );
            return {
              selected: S,
              setSelected: T,
              qrUrl: W,
              setQrUrl: L,
              connecting: F,
              uiState: V,
              errorCode: z,
              search: C,
              setSearch: x,
              wallets: p,
              walletCount: v,
              wc: A,
              isInitialConnectView: U,
              showSearchBar: P,
              title: N,
              handleConnect: $,
              handleBack: E,
              onClose: n,
              onConnect: e,
              app: s,
            };
          })({ ...B, walletList: q, walletChainType: O }),
          eu = R.find((e) => "wallet_connect_v2" === e.connectorType),
          ep = R.find((e) => "walletconnect_solana" === e.walletBranding.id),
          eh = (0, i.useRef)(null),
          eg = (0, a.f)({
            count: ei.length,
            getScrollElement: () => eh.current,
            estimateSize: () => 56,
            overscan: 6,
            gap: 5,
          }),
          em = (0, i.useCallback)(
            async (e) => {
              let t,
                i =
                  "solana-only" !== O &&
                  e.chains?.some((e) => e.startsWith("eip155")),
                n =
                  "ethereum-only" !== O &&
                  e.chains?.some((e) => e.startsWith("solana")),
                a = ((t = e.id), m.m[t] || m.m[`${t}_wallet`]),
                l = (t) => {
                  let i = T.normalize(e.id);
                  return R.find(
                    (e) =>
                      T.normalize(e.walletClientType) === i &&
                      e.chainType === t &&
                      "wallet_connect_v2" !== e.connectorType &&
                      !(
                        ("ethereum" === e.chainType && e instanceof m.j) ||
                        ("solana" === e.chainType && e instanceof m.S)
                      ),
                  );
                },
                o = i ? l("ethereum") : void 0,
                c = n ? l("solana") : void 0;
              if (
                a &&
                (0, m.l)({ isMobile: r.isMobile, walletConfig: a }) &&
                !o &&
                !c
              )
                return (
                  w.c.debug(
                    "Using install flow for wallets that do not support WalletConnect.",
                    { wallet: e.id },
                  ),
                  void (await ea(a.installLink, {
                    name: e.label,
                    icon: e.icon,
                    id: e.id,
                    url: e.url,
                  }))
                );
              let d = async () => {
                  if (!eu || !e.listing) return !1;
                  let t = S[e.listing.slug]
                    ? { ...e.listing, ...S[e.listing.slug] }
                    : e.listing;
                  return (
                    eu.setWalletEntry(t, J),
                    await eu.resetConnection(e.id),
                    await ea(eu, {
                      name: e.label,
                      icon: e.icon,
                      id: e.id,
                      url: e.url,
                    }),
                    !0
                  );
                },
                u = async () =>
                  !!ep &&
                  !!e.listing &&
                  (await ep.disconnect(),
                  ep.wallet.setWalletEntry(e.listing, J),
                  await new Promise((e) => setTimeout(e, 100)),
                  await ea(ep, {
                    name: e.label,
                    icon: e.icon,
                    id: e.id,
                    url: e.url,
                  }),
                  !0),
                p = async (t) => {
                  let i = ((e) => {
                    if (a)
                      return a.getMobileRedirect({
                        isSolana: e,
                        connectOnly: !!s,
                        useUniversalLink: !1,
                      });
                  })(t);
                  return (
                    !!i &&
                    (await ea(i, {
                      name: e.label,
                      icon: e.icon,
                      id: e.id,
                      url: e.url,
                    }),
                    !0)
                  );
                };
              if (i && n) G(e);
              else {
                if (i && !n) {
                  if (o && !z(o))
                    return (
                      w.c.debug("Attempting injected EVM connection", {
                        wallet: e.id,
                        connectorType: o.connectorType,
                      }),
                      void (await ea(o, {
                        name: e.label,
                        icon: e.icon,
                        id: e.id,
                        url: e.url,
                      }))
                    );
                  if (r.isMobile && a) {
                    if ((await p(!1)) || (await d())) return;
                  } else if ((await d()) || (await p(!1))) return;
                }
                if (n && !i) {
                  if (c && !z(c))
                    return (
                      w.c.debug("Attempting injected Solana connection", {
                        wallet: e.id,
                        connectorType: c.connectorType,
                      }),
                      void (await ea(c, {
                        name: e.label,
                        icon: e.icon,
                        id: e.id,
                        url: e.url,
                      }))
                    );
                  if (r.isMobile) {
                    if ((await p(!0)) || (await u())) return;
                  } else if ((await u()) || (await p(!0))) return;
                }
                if (!z(e.connector)) {
                  if (
                    (w.c.debug("Using fallback direct connector", {
                      wallet: e.id,
                      connectorType: e.connector?.connectorType,
                    }),
                    eu && "wallet_connect_v2" === e.connector?.connectorType)
                  )
                    if (
                      (await eu.resetConnection(e.id),
                      "wallet_connect_qr" !== e.id && e.listing)
                    ) {
                      let t = S[e.listing.slug]
                        ? { ...e.listing, ...S[e.listing.slug] }
                        : e.listing;
                      eu.setWalletEntry(t, J);
                    } else
                      eu.setWalletEntry(
                        {
                          id: "wallet_connect_qr",
                          name: "WalletConnect",
                          rdns: "",
                          slug: "wallet-connect",
                          homepage: "",
                          chains: ["eip155"],
                          mobile: { native: "", universal: void 0 },
                        },
                        J,
                      );
                  return (
                    ep &&
                      "walletconnect_solana" ===
                        e.connector?.walletBranding.id &&
                      (await ep.disconnect(),
                      "wallet_connect_qr_solana" !== e.id && e.listing
                        ? ep.wallet.setWalletEntry(e.listing, J)
                        : ep.wallet.setWalletEntry(
                            {
                              id: "wallet_connect_solana_qr",
                              name: "WalletConnect",
                              rdns: "",
                              slug: "wallet-connect-solana",
                              homepage: "",
                              chains: ["solana"],
                              mobile: { native: "", universal: void 0 },
                            },
                            J,
                          ),
                      await new Promise((e) => setTimeout(e, 100))),
                    void (await ea(e.connector, {
                      name: e.label,
                      icon: e.icon,
                      id: e.id,
                      url: e.url,
                    }))
                  );
                }
                e.url
                  ? await ea(e.url, {
                      name: e.label,
                      icon: e.icon,
                      id: e.id,
                      url: e.url,
                    })
                  : w.c.warn("No available connection method for wallet", {
                      wallet: e.id,
                    });
              }
            },
            [eu, ep, ea, G, J, O, s, R],
          );
        return (
          (0, i.useEffect)(() => {
            if (!E) return;
            let e = ei.find(({ id: e }) => e === E);
            e && em(e).catch(console.error);
          }, [E]),
          (0, t.jsxs)(x.S, {
            className: e,
            children: [
              (0, t.jsx)(x.S.Header, {
                icon:
                  N && eo
                    ? void 0
                    : (X && !Z) || (Z && r.isMobile && X?.icon)
                      ? X.icon
                      : X
                        ? void 0
                        : v.W,
                iconVariant:
                  (X && !Z) || (Z && r.isMobile) ? "loading" : void 0,
                iconLoadingStatus:
                  (X && !Z) || (Z && r.isMobile)
                    ? { success: "success" === ee, fail: "error" === ee }
                    : void 0,
                title:
                  N && eo
                    ? void 0
                    : X && !Z
                      ? M("connectWallet.waitingForWallet", {
                          walletName: X.name,
                        })
                      : Z && r.isMobile
                        ? M("connectWallet.waitingForWallet", {
                            walletName: X?.name ?? "connection",
                          })
                        : es,
                subtitle:
                  N && eo
                    ? void 0
                    : X && !Z && "string" == typeof X.connector
                      ? M("connectWallet.installAndConnect", {
                          walletName: X.name,
                        })
                      : X && !Z && "string" != typeof X.connector
                        ? "error" === ee
                          ? et === y.a.NO_SOLANA_ACCOUNTS
                            ? `The connected wallet has no Solana accounts. Please add a Solana account in ${X.name} and try again.`
                            : M("connectWallet.tryConnectingAgain")
                          : M(
                              "coinbase_wallet" === X.connector.connectorType
                                ? "coinbaseWallet.connectingSubtitle"
                                : "connectionStatus.connectOneWallet",
                            )
                        : eo
                          ? (l ??
                            (H
                              ? M("connectWallet.connectToAccount", {
                                  appName: H.name,
                                })
                              : null))
                          : null,
                showBack: !!K || !eo,
                showClose: !0,
                onBack: K || er,
                onClose: Q,
              }),
              (0, t.jsxs)(x.S.Body, {
                ref: eh,
                $colorScheme: I.appearance.palette.colorScheme,
                style: { marginBottom: Z ? "0.5rem" : void 0 },
                children: [
                  el &&
                    (0, t.jsx)(W, {
                      children: (0, t.jsxs)(p.E, {
                        style: { background: "transparent" },
                        children: [
                          (0, t.jsx)(b.m, { children: (0, t.jsx)(n, {}) }),
                          (0, t.jsx)("input", {
                            className: "login-method-button",
                            type: "text",
                            placeholder: M("connectWallet.searchPlaceholder", {
                              count: String(en),
                            }),
                            onChange: (e) => ed(e.target.value),
                            value: ec,
                          }),
                        ],
                      }),
                    }),
                  Z &&
                    r.isMobile &&
                    "loading" === ee &&
                    (0, t.jsxs)("div", {
                      style: {
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: "1rem",
                      },
                      children: [
                        (0, t.jsx)(o.B, {
                          variant: "primary",
                          onClick: () =>
                            window.open(Z.universal ?? Z.native, "_blank"),
                          style: { width: "100%" },
                          children: M("connectWallet.openInApp"),
                        }),
                        (0, t.jsx)(A, {
                          value: Z.universal ?? Z.native,
                          iconOnly: !0,
                          children: "Copy link",
                        }),
                      ],
                    }),
                  Z &&
                    !r.isMobile &&
                    "loading" === ee &&
                    (0, t.jsx)("div", {
                      style: {
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: "1rem",
                      },
                      children: (0, t.jsx)(A, {
                        value: Z.universal ?? Z.native,
                        iconOnly: !0,
                        children: M("connectWallet.copyLink"),
                      }),
                    }),
                  Z &&
                    !r.isMobile &&
                    (0, t.jsx)(u.Q, {
                      size: 280,
                      url: Z.universal ?? Z.native,
                      squareLogoElement: X?.icon
                        ? "string" == typeof X.icon
                          ? (e) =>
                              (0, t.jsx)("svg", {
                                ...e,
                                children: (0, t.jsx)("image", {
                                  href: X.icon,
                                  height: e.height,
                                  width: e.width,
                                }),
                              })
                          : X.icon
                        : w.d,
                    }),
                  Z &&
                    !r.isMobile &&
                    X?.url &&
                    ("binance" === X.id ||
                      "binanceus" === X.id ||
                      "binance-defi" === X.id ||
                      "robinhood" === X.id) &&
                    (0, t.jsxs)($, {
                      children: [
                        (0, t.jsxs)("span", {
                          children: ["Don't have ", X.name, "? "],
                        }),
                        (0, t.jsx)(c.L, {
                          href: X.url,
                          target: "_blank",
                          size: "sm",
                          children: "Download here",
                        }),
                      ],
                    }),
                  (0, t.jsxs)(L, {
                    children: [
                      X &&
                        !Z &&
                        "string" == typeof X.connector &&
                        (0, t.jsxs)(F, {
                          onClick: () => window.open(X.connector, "_blank"),
                          children: [
                            X.icon &&
                              ("string" == typeof X.icon
                                ? (0, t.jsx)(C.W, { src: X.icon })
                                : (0, t.jsx)(X.icon, {})),
                            (0, t.jsx)(P, { children: X.name }),
                          ],
                        }),
                      Y?.chains.some((e) => e.startsWith("eip155")) &&
                        !X &&
                        (0, t.jsxs)(F, {
                          onClick: () =>
                            em({
                              ...Y,
                              chains: Y.chains.filter((e) =>
                                e.startsWith("eip155"),
                              ),
                            }),
                          children: [
                            Y.icon &&
                              ("string" == typeof Y.icon
                                ? (0, t.jsx)(C.W, { src: Y.icon })
                                : (0, t.jsx)(Y.icon, {})),
                            (0, t.jsx)(P, { children: Y.label }),
                            (0, t.jsx)(_, { children: (0, t.jsx)(V, {}) }),
                          ],
                        }),
                      Y?.chains.some((e) => e.startsWith("solana")) &&
                        !X &&
                        (0, t.jsxs)(F, {
                          onClick: () =>
                            em({
                              ...Y,
                              chains: Y.chains.filter((e) =>
                                e.startsWith("solana"),
                              ),
                            }),
                          children: [
                            Y.icon &&
                              ("string" == typeof Y.icon
                                ? (0, t.jsx)(C.W, { src: Y.icon })
                                : (0, t.jsx)(Y.icon, {})),
                            (0, t.jsx)(P, { children: Y.label }),
                            (0, t.jsx)(_, { children: (0, t.jsx)(k, {}) }),
                          ],
                        }),
                      eo &&
                        (0, t.jsxs)(t.Fragment, {
                          children: [
                            !(en > 0) &&
                              (0, t.jsx)(U, {
                                children: M("connectWallet.noWalletsFound"),
                              }),
                            en > 0 &&
                              !Z &&
                              (0, t.jsx)("div", {
                                style: {
                                  maxHeight: 56 * Math.min(ei.length, 5) + 5,
                                  width: "100%",
                                },
                                children: (0, t.jsx)("div", {
                                  style: {
                                    height: `${eg.getTotalSize()}px`,
                                    width: "100%",
                                    position: "relative",
                                  },
                                  children: eg
                                    .getVirtualItems()
                                    .map((e) =>
                                      (0, t.jsx)(
                                        D,
                                        {
                                          index: e.index,
                                          style: {
                                            position: "absolute",
                                            top: 0,
                                            left: 0,
                                            height: `${e.size}px`,
                                            transform: `translateY(${e.start}px)`,
                                          },
                                          data: {
                                            wallets: ei,
                                            walletChainType: O,
                                            handleWalletClick: em,
                                          },
                                        },
                                        e.key,
                                      ),
                                    ),
                                }),
                              }),
                          ],
                        }),
                    ],
                  }),
                ],
              }),
              (0, t.jsxs)(x.S.Footer, {
                children: [
                  X &&
                    !Z &&
                    "string" != typeof X.connector &&
                    "error" === ee &&
                    (0, t.jsx)(x.S.Actions, {
                      children: (0, t.jsx)(o.B, {
                        style: { width: "100%", alignItems: "center" },
                        variant: "error",
                        onClick: () =>
                          ea(X.connector, {
                            name: X.name,
                            icon: X.icon,
                            id: X.id,
                            url: X.url,
                          }),
                        children: M("connectWallet.retry"),
                      }),
                    }),
                  !!(
                    H &&
                    H.legal.privacyPolicyUrl &&
                    H.legal.termsAndConditionsUrl
                  ) &&
                    (0, t.jsx)(d.T, { app: H, alwaysShowImplicitConsent: !0 }),
                  (0, t.jsx)(x.S.Watermark, {}),
                ],
              }),
            ],
          })
        );
      },
      "u",
      0,
      j,
    ],
    467793,
  );
};
