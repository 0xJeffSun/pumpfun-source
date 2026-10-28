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
    l = e.i(768820),
    r = e.i(689391),
    o = e.i(995040),
    s = e.i(164923),
    c = e.i(583503),
    d = e.i(25047),
    h = e.i(594022),
    u = e.i(305869),
    p = e.i(933185),
    g = e.i(439614),
    m = e.i(461687),
    w = e.i(809845),
    f = e.i(565530),
    y = e.i(748117),
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
  class z {
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
      let i = z.normalize(e);
      return this.normalizedAllowList.some((e) => i === z.normalize(e));
    }
    inDenyList(e, t) {
      return ("listing" === t && "rabby" === e) || "agw" === z.normalize(e);
    }
    chainMatches(e) {
      return "ethereum-only" === this.chainFilter
        ? "ethereum" === e
        : "solana-only" !== this.chainFilter || "solana" === e;
    }
    getAllowListKey(e, t, i, n) {
      let a = z.normalize(e);
      for (let e of this.normalizedAllowList || [])
        if (a === z.normalize(e)) return e;
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
        let t = z.normalize(e.walletClientType);
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
        l = e.find((e) => "walletconnect_solana" === e.walletBranding.id);
      (t
        .filter((e) => this.listingOk(e))
        .forEach((t) => {
          let i = [...t.chains].filter(
            (e) => e.includes("eip155:") || e.includes("solana:"),
          );
          if (
            (e.some(
              (e) =>
                z.normalize(e.walletClientType) === z.normalize(t.slug) &&
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
                z.normalize(e.walletClientType) === z.normalize(t.slug) &&
                "solana" === e.chainType &&
                "null" !== e.connectorType,
            ) ||
              l ||
              t.mobile.native ||
              t.mobile.universal ||
              m.m[t.slug]?.chainTypes.includes("solana") ||
              (i = i.filter((e) => !e.includes("solana:"))),
            !i.length)
          )
            return;
          let r = z.normalize(t.slug),
            o = S[t.slug],
            s = o?.image_url?.sm || t.image_url?.sm;
          (i.some((e) => e.includes("eip155:")) &&
            n({
              id: r,
              label: t.name || r,
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
                id: r,
                label: t.name || r,
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
          l &&
          n({
            id: "wallet_connect_qr_solana",
            label: "WalletConnect",
            source: "connector",
            connector: l,
            chainType: "solana",
            icon: w.a,
            url: void 0,
            chains: ["solana"],
            allowListKey: "wallet_connect_qr_solana",
          }));
      let r = Array.from(i.values());
      r.forEach((e) => {
        let t = S[e.listing?.slug || e.id];
        t?.image_url?.sm && (e.icon = t.image_url.sm);
      });
      let o = new Map();
      return (
        this.normalizedAllowList?.forEach((e, t) => {
          o.set(z.normalize(e), t);
        }),
        {
          wallets: r.slice().sort((e, t) => {
            if (e.allowListKey && t.allowListKey) {
              let i =
                  this.normalizedAllowList?.findIndex(
                    (t) => z.normalize(t) === z.normalize(e.allowListKey),
                  ) ?? -1,
                n =
                  this.normalizedAllowList?.findIndex(
                    (e) => z.normalize(e) === z.normalize(t.allowListKey),
                  ) ?? -1;
              if (i !== n && i >= 0 && n >= 0) return i - n;
            }
            if (e.allowListKey && !t.allowListKey) return -1;
            if (!e.allowListKey && t.allowListKey) return 1;
            let i = z.normalize(e.id),
              n = z.normalize(t.id);
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
              l = o.has(n);
            return a && l
              ? o.get(i) - o.get(n)
              : a
                ? -1
                : l
                  ? 1
                  : "connector" === e.source && "listing" === t.source
                    ? -1
                    : "listing" === e.source && "connector" === t.source
                      ? 1
                      : e.label
                          .toLowerCase()
                          .localeCompare(t.label.toLowerCase());
          }),
          walletCount: r.length,
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
  var T = (e) =>
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
  function V({ enabled: e = !0, walletList: t, walletChainType: n }) {
    let a = (0, p.a)(),
      { connectors: l } = (0, y.u)(),
      { listings: r, loading: o } = (0, m.u)(e),
      s = n ?? a.appearance.walletChainType,
      c = t ?? a.appearance?.walletList,
      d = (0, i.useMemo)(() => new z(s, c), [s, c]),
      { wallets: h, walletCount: u } = (0, i.useMemo)(
        () => d.getWallets(l, r),
        [d, l, r],
      ),
      [g, w] = (0, i.useState)(""),
      f = (0, i.useMemo)(
        () =>
          g
            ? h.filter((e) => e.label.toLowerCase().includes(g.toLowerCase()))
            : h,
        [g, h],
      ),
      [v, b] = (0, i.useState)();
    return {
      selected: v,
      setSelected: b,
      search: g,
      setSearch: w,
      loadingListings: o,
      wallets: f,
      walletCount: u,
    };
  }
  let D = (e) =>
      !e || ("string" != typeof e && (e instanceof m.j || e instanceof m.S)),
    j = ({ index: e, style: i, data: n, recent: a }) => {
      let l = n.wallets[e],
        { walletChainType: r, handleWalletClick: o } = n,
        { t: s } = (0, g.u)(),
        c = { ...i, boxSizing: "border-box" };
      return l
        ? (0, t.jsxs)(L, {
            style: c,
            onClick: () => o(l),
            children: [
              l.icon &&
                (l.connector && !D(l.connector)
                  ? (0, t.jsx)(C.b, {
                      children:
                        "string" == typeof l.icon
                          ? (0, t.jsx)(C.W, { src: l.icon })
                          : (0, t.jsx)(l.icon, {
                              style: { width: "32px", height: "32px" },
                            }),
                    })
                  : "string" == typeof l.icon
                    ? (0, t.jsx)(C.W, { src: l.icon })
                    : (0, t.jsx)(l.icon, {
                        style: { width: "32px", height: "32px" },
                      })),
              (0, t.jsx)(E, { children: l.label }),
              a
                ? (0, t.jsxs)(t.Fragment, {
                    children: [
                      (0, t.jsx)(C.C, {
                        children: s("connectWallet.lastUsed"),
                      }),
                      (0, t.jsx)(_, {
                        children: (0, t.jsxs)(t.Fragment, {
                          children: [
                            "ethereum-only" === r && (0, t.jsx)(T, {}),
                            "solana-only" === r && (0, t.jsx)(k, {}),
                          ],
                        }),
                      }),
                    ],
                  })
                : (0, t.jsx)(_, {
                    children:
                      "ethereum-only" !== r &&
                      "solana-only" !== r &&
                      (0, t.jsxs)(t.Fragment, {
                        children: [
                          l.chains?.some((e) => e.startsWith("eip155")) &&
                            (0, t.jsx)(T, {}),
                          l.chains?.some((e) => e.startsWith("solana")) &&
                            (0, t.jsx)(k, {}),
                        ],
                      }),
                  }),
            ],
          })
        : null;
    },
    W = r.z.div`
  position: sticky;
  /* Offset by negative margin to account for focus outline */
  margin-top: -3px;
  padding-top: 3px;
  top: -3px;
  z-index: 1;
  background: var(--privy-color-background);
  padding-bottom: calc(var(--screen-space) / 2);
`,
    F = r.z.div`
  display: flex;
  flex-direction: column;
  gap: ${5}px;
`,
    L = r.z.button`
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
    _ = r.z.span`
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
    A = r.z.div`
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
`,
    E = r.z.span`
  text-overflow: ellipsis;
  white-space: nowrap;
  color: var(--privy-color-foreground);
  font-weight: 400;
  flex: 1;
`,
    M = (0, r.z)(s.C)`
  && {
    margin: 0.5rem auto 0;
  }
`,
    P = r.z.div`
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
      z,
      "a",
      0,
      j,
      "i",
      0,
      ({
        className: e,
        customDescription: r,
        connectOnly: s,
        preSelectedWalletId: O,
        hideHeader: U,
        ...I
      }) => {
        let $ = (0, p.a)(),
          { t: R } = (0, g.u)(),
          { connectors: N } = (0, y.u)(),
          B = I.walletChainType || $.appearance.walletChainType,
          q = I.walletList || $.appearance?.walletList,
          { onBack: K, onClose: Q, app: H } = I,
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
            handleBack: el,
            showSearchBar: er,
            isInitialConnectView: eo,
            title: es,
            search: ec,
            setSearch: ed,
          } = (function ({
            onConnect: e,
            onBack: t,
            onClose: n,
            onConnectError: a,
            walletList: r,
            walletChainType: o,
            app: s,
          }) {
            let c = (0, p.a)(),
              { connectors: d } = (0, y.u)(),
              { t: h } = (0, g.u)(),
              {
                wallets: u,
                walletCount: v,
                search: C,
                setSearch: x,
                selected: S,
                setSelected: z,
              } = V({
                enabled: (0, m.s)(r ?? []),
                walletList: r,
                walletChainType: o,
              }),
              [T, k] = (0, i.useState)(),
              [D, j] = (0, i.useState)(),
              [W, F] = (0, i.useState)(),
              [L, _] = (0, i.useState)(),
              A = !S && !W && !L,
              E = A && (v > 6 || C.length > 0),
              M = d.find((e) => "wallet_connect_v2" === e.connectorType),
              P = (0, i.useCallback)(
                async (t, i) => {
                  if (!t) return;
                  let n = i?.name ?? "Wallet";
                  if (L?.connector !== t || "loading" !== T) {
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
                          j(void 0),
                          void a?.(new f.e("Unable to connect wallet"))
                        );
                      (w.c.debug("Wallet connection successful", {
                        wallet: n,
                        connectorType: t.connectorType,
                      }),
                        (0, m.i)(i) && (await (0, b.e)(i, c)),
                        k("success"),
                        j(void 0),
                        (0, b.s)({
                          address: i.address,
                          client: i.walletClientType,
                          appId: c.id,
                        }),
                        setTimeout(() => {
                          e({ connector: t, wallet: i });
                        }, p.Q));
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
                        j(i?.privyErrorCode),
                        a?.(
                          i instanceof Error
                            ? i
                            : new f.e(e || "Unable to connect wallet"),
                        ));
                    }
                  } else
                    w.c.debug("Duplicate connection attempt prevented", {
                      wallet: n,
                    });
                },
                [c.id, e, L, T],
              ),
              O = (0, i.useCallback)(
                () =>
                  W
                    ? (k(void 0), j(void 0), _(void 0), void F(void 0))
                    : L
                      ? (k(void 0), j(void 0), void _(void 0))
                      : S
                        ? (k(void 0), j(void 0), _(void 0), void z(void 0))
                        : "error" === T || "loading" === T
                          ? (k(void 0), j(void 0), void _(void 0))
                          : void t?.(),
                [W, L, S, T, t],
              ),
              U = (0, i.useMemo)(
                () =>
                  L?.connector === M && W && l.isMobile && L?.name
                    ? h("connectWallet.goToWallet", { walletName: L.name })
                    : L?.connector === M && W && L?.name
                      ? h("connectWallet.scanToConnect", { walletName: L.name })
                      : W && L?.name
                        ? h(
                            l.isMobile
                              ? "connectWallet.goToWallet"
                              : "connectWallet.scanToConnect",
                            { walletName: L.name },
                          )
                        : "string" == typeof L?.connector
                          ? h("connectWallet.openOrInstall", {
                              walletName: L.name,
                            })
                          : S && !L
                            ? h("connectWallet.selectNetwork")
                            : L
                              ? null
                              : h("connectWallet.selectYourWallet"),
                [L, W, S, M, h],
              );
            return {
              selected: S,
              setSelected: z,
              qrUrl: W,
              setQrUrl: F,
              connecting: L,
              uiState: T,
              errorCode: D,
              search: C,
              setSearch: x,
              wallets: u,
              walletCount: v,
              wc: M,
              isInitialConnectView: A,
              showSearchBar: E,
              title: U,
              handleConnect: P,
              handleBack: O,
              onClose: n,
              onConnect: e,
              app: s,
            };
          })({ ...I, walletList: q, walletChainType: B }),
          eh = N.find((e) => "wallet_connect_v2" === e.connectorType),
          eu = N.find((e) => "walletconnect_solana" === e.walletBranding.id),
          ep = (0, i.useRef)(null),
          eg = (0, a.f)({
            count: ei.length,
            getScrollElement: () => ep.current,
            estimateSize: () => 56,
            overscan: 6,
            gap: 5,
          }),
          em = (0, i.useCallback)(
            async (e) => {
              let t,
                i =
                  "solana-only" !== B &&
                  e.chains?.some((e) => e.startsWith("eip155")),
                n =
                  "ethereum-only" !== B &&
                  e.chains?.some((e) => e.startsWith("solana")),
                a = ((t = e.id), m.m[t] || m.m[`${t}_wallet`]),
                r = (t) => {
                  let i = z.normalize(e.id);
                  return N.find(
                    (e) =>
                      z.normalize(e.walletClientType) === i &&
                      e.chainType === t &&
                      "wallet_connect_v2" !== e.connectorType &&
                      !(
                        ("ethereum" === e.chainType && e instanceof m.j) ||
                        ("solana" === e.chainType && e instanceof m.S)
                      ),
                  );
                },
                o = i ? r("ethereum") : void 0,
                c = n ? r("solana") : void 0;
              if (
                a &&
                (0, m.l)({ isMobile: l.isMobile, walletConfig: a }) &&
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
                  if (!eh || !e.listing) return !1;
                  let t = S[e.listing.slug]
                    ? { ...e.listing, ...S[e.listing.slug] }
                    : e.listing;
                  return (
                    eh.setWalletEntry(t, J),
                    await eh.resetConnection(e.id),
                    await ea(eh, {
                      name: e.label,
                      icon: e.icon,
                      id: e.id,
                      url: e.url,
                    }),
                    !0
                  );
                },
                h = async () =>
                  !!eu &&
                  !!e.listing &&
                  (await eu.disconnect(),
                  eu.wallet.setWalletEntry(e.listing, J),
                  await new Promise((e) => setTimeout(e, 100)),
                  await ea(eu, {
                    name: e.label,
                    icon: e.icon,
                    id: e.id,
                    url: e.url,
                  }),
                  !0),
                u = async (t) => {
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
                  if (o && !D(o))
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
                  if (l.isMobile && a) {
                    if ((await u(!1)) || (await d())) return;
                  } else if ((await d()) || (await u(!1))) return;
                }
                if (n && !i) {
                  if (c && !D(c))
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
                  if (l.isMobile) {
                    if ((await u(!0)) || (await h())) return;
                  } else if ((await h()) || (await u(!0))) return;
                }
                if (!D(e.connector)) {
                  if (
                    (w.c.debug("Using fallback direct connector", {
                      wallet: e.id,
                      connectorType: e.connector?.connectorType,
                    }),
                    eh && "wallet_connect_v2" === e.connector?.connectorType)
                  )
                    if (
                      (await eh.resetConnection(e.id),
                      "wallet_connect_qr" !== e.id && e.listing)
                    ) {
                      let t = S[e.listing.slug]
                        ? { ...e.listing, ...S[e.listing.slug] }
                        : e.listing;
                      eh.setWalletEntry(t, J);
                    } else
                      eh.setWalletEntry(
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
                    eu &&
                      "walletconnect_solana" ===
                        e.connector?.walletBranding.id &&
                      (await eu.disconnect(),
                      "wallet_connect_qr_solana" !== e.id && e.listing
                        ? eu.wallet.setWalletEntry(e.listing, J)
                        : eu.wallet.setWalletEntry(
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
            [eh, eu, ea, G, J, B, s, N],
          );
        return (
          (0, i.useEffect)(() => {
            if (!O) return;
            let e = ei.find(({ id: e }) => e === O);
            e && em(e).catch(console.error);
          }, [O]),
          (0, t.jsxs)(x.S, {
            className: e,
            children: [
              (0, t.jsx)(x.S.Header, {
                icon:
                  U && eo
                    ? void 0
                    : (X && !Z) || (Z && l.isMobile && X?.icon)
                      ? X.icon
                      : X
                        ? void 0
                        : v.W,
                iconVariant:
                  (X && !Z) || (Z && l.isMobile) ? "loading" : void 0,
                iconLoadingStatus:
                  (X && !Z) || (Z && l.isMobile)
                    ? { success: "success" === ee, fail: "error" === ee }
                    : void 0,
                title:
                  U && eo
                    ? void 0
                    : X && !Z
                      ? R("connectWallet.waitingForWallet", {
                          walletName: X.name,
                        })
                      : Z && l.isMobile
                        ? R("connectWallet.waitingForWallet", {
                            walletName: X?.name ?? "connection",
                          })
                        : es,
                subtitle:
                  U && eo
                    ? void 0
                    : X && !Z && "string" == typeof X.connector
                      ? R("connectWallet.installAndConnect", {
                          walletName: X.name,
                        })
                      : X && !Z && "string" != typeof X.connector
                        ? "error" === ee
                          ? et === f.a.NO_SOLANA_ACCOUNTS
                            ? `The connected wallet has no Solana accounts. Please add a Solana account in ${X.name} and try again.`
                            : R("connectWallet.tryConnectingAgain")
                          : R(
                              "coinbase_wallet" === X.connector.connectorType
                                ? "coinbaseWallet.connectingSubtitle"
                                : "connectionStatus.connectOneWallet",
                            )
                        : eo
                          ? (r ??
                            (H
                              ? R("connectWallet.connectToAccount", {
                                  appName: H.name,
                                })
                              : null))
                          : null,
                showBack: !!K || !eo,
                showClose: !0,
                onBack: K || el,
                onClose: Q,
              }),
              (0, t.jsxs)(x.S.Body, {
                ref: ep,
                $colorScheme: $.appearance.palette.colorScheme,
                style: { marginBottom: Z ? "0.5rem" : void 0 },
                children: [
                  er &&
                    (0, t.jsx)(W, {
                      children: (0, t.jsxs)(u.E, {
                        style: { background: "transparent" },
                        children: [
                          (0, t.jsx)(b.m, { children: (0, t.jsx)(n, {}) }),
                          (0, t.jsx)("input", {
                            className: "login-method-button",
                            type: "text",
                            placeholder: R("connectWallet.searchPlaceholder", {
                              count: String(en),
                            }),
                            onChange: (e) => ed(e.target.value),
                            value: ec,
                          }),
                        ],
                      }),
                    }),
                  Z &&
                    l.isMobile &&
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
                          children: R("connectWallet.openInApp"),
                        }),
                        (0, t.jsx)(M, {
                          value: Z.universal ?? Z.native,
                          iconOnly: !0,
                          children: "Copy link",
                        }),
                      ],
                    }),
                  Z &&
                    !l.isMobile &&
                    "loading" === ee &&
                    (0, t.jsx)("div", {
                      style: {
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: "1rem",
                      },
                      children: (0, t.jsx)(M, {
                        value: Z.universal ?? Z.native,
                        iconOnly: !0,
                        children: R("connectWallet.copyLink"),
                      }),
                    }),
                  Z &&
                    !l.isMobile &&
                    (0, t.jsx)(h.Q, {
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
                    !l.isMobile &&
                    X?.url &&
                    ("binance" === X.id ||
                      "binanceus" === X.id ||
                      "binance-defi" === X.id ||
                      "robinhood" === X.id) &&
                    (0, t.jsxs)(P, {
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
                  (0, t.jsxs)(F, {
                    children: [
                      X &&
                        !Z &&
                        "string" == typeof X.connector &&
                        (0, t.jsxs)(L, {
                          onClick: () => window.open(X.connector, "_blank"),
                          children: [
                            X.icon &&
                              ("string" == typeof X.icon
                                ? (0, t.jsx)(C.W, { src: X.icon })
                                : (0, t.jsx)(X.icon, {})),
                            (0, t.jsx)(E, { children: X.name }),
                          ],
                        }),
                      Y?.chains.some((e) => e.startsWith("eip155")) &&
                        !X &&
                        (0, t.jsxs)(L, {
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
                            (0, t.jsx)(E, { children: Y.label }),
                            (0, t.jsx)(_, { children: (0, t.jsx)(T, {}) }),
                          ],
                        }),
                      Y?.chains.some((e) => e.startsWith("solana")) &&
                        !X &&
                        (0, t.jsxs)(L, {
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
                            (0, t.jsx)(E, { children: Y.label }),
                            (0, t.jsx)(_, { children: (0, t.jsx)(k, {}) }),
                          ],
                        }),
                      eo &&
                        (0, t.jsxs)(t.Fragment, {
                          children: [
                            !(en > 0) &&
                              (0, t.jsx)(A, {
                                children: R("connectWallet.noWalletsFound"),
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
                                        j,
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
                                            walletChainType: B,
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
                        children: R("connectWallet.retry"),
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
      V,
    ],
    467793,
  );
};
