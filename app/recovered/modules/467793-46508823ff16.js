// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(732486),
    i = e.i(352386);
  let r = i.forwardRef(function ({ title: e, titleId: t, ...r }, n) {
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
          ref: n,
          "aria-labelledby": t,
        },
        r,
      ),
      e ? i.createElement("title", { id: t }, e) : null,
      i.createElement("path", {
        strokeLinecap: "round",
        strokeLinejoin: "round",
        d: "m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z",
      }),
    );
  });
  var n = e.i(659226),
    o = e.i(768820),
    a = e.i(689391),
    l = e.i(995040),
    s = e.i(164923),
    c = e.i(583503),
    d = e.i(25047),
    h = e.i(594022),
    u = e.i(305869),
    p = e.i(933185),
    g = e.i(439614),
    m = e.i(461687),
    v = e.i(809845),
    f = e.i(565530),
    w = e.i(748117),
    y = e.i(480705),
    b = e.i(315430),
    x = e.i(786847),
    C = e.i(612269);
  let k = {
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
    getAllowListKey(e, t, i, r) {
      let n = z.normalize(e);
      for (let e of this.normalizedAllowList || [])
        if (n === z.normalize(e)) return e;
      if ("connector" === t) {
        if (
          ("injected" === i || "solana_adapter" === i) &&
          "ethereum" === r &&
          this.detectedEth
        )
          return "detected_ethereum_wallets";
        if (
          ("injected" === i || "solana_adapter" === i) &&
          "solana" === r &&
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
        r = (e) => {
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
        r({
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
      let n = e.find((e) => "wallet_connect_v2" === e.connectorType),
        o = e.find((e) => "walletconnect_solana" === e.walletBranding.id);
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
              n ||
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
              o ||
              t.mobile.native ||
              t.mobile.universal ||
              m.m[t.slug]?.chainTypes.includes("solana") ||
              (i = i.filter((e) => !e.includes("solana:"))),
            !i.length)
          )
            return;
          let a = z.normalize(t.slug),
            l = k[t.slug],
            s = l?.image_url?.sm || t.image_url?.sm;
          (i.some((e) => e.includes("eip155:")) &&
            r({
              id: a,
              label: t.name || a,
              source: "listing",
              listing: t,
              chainType: "ethereum",
              icon: s,
              url: t.homepage,
              chains: i,
              allowListKey: this.getAllowListKey(t.slug, "listing"),
            }),
            i.some((e) => e.includes("solana:")) &&
              r({
                id: a,
                label: t.name || a,
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
          n &&
          r({
            id: "wallet_connect_qr",
            label: "WalletConnect",
            source: "connector",
            connector: n,
            chainType: "ethereum",
            icon: v.a,
            url: void 0,
            chains: ["eip155"],
            allowListKey: "wallet_connect_qr",
          }),
        this.includeWalletConnectQrSolana &&
          o &&
          r({
            id: "wallet_connect_qr_solana",
            label: "WalletConnect",
            source: "connector",
            connector: o,
            chainType: "solana",
            icon: v.a,
            url: void 0,
            chains: ["solana"],
            allowListKey: "wallet_connect_qr_solana",
          }));
      let a = Array.from(i.values());
      a.forEach((e) => {
        let t = k[e.listing?.slug || e.id];
        t?.image_url?.sm && (e.icon = t.image_url.sm);
      });
      let l = new Map();
      return (
        this.normalizedAllowList?.forEach((e, t) => {
          l.set(z.normalize(e), t);
        }),
        {
          wallets: a.slice().sort((e, t) => {
            if (e.allowListKey && t.allowListKey) {
              let i =
                  this.normalizedAllowList?.findIndex(
                    (t) => z.normalize(t) === z.normalize(e.allowListKey),
                  ) ?? -1,
                r =
                  this.normalizedAllowList?.findIndex(
                    (e) => z.normalize(e) === z.normalize(t.allowListKey),
                  ) ?? -1;
              if (i !== r && i >= 0 && r >= 0) return i - r;
            }
            if (e.allowListKey && !t.allowListKey) return -1;
            if (!e.allowListKey && t.allowListKey) return 1;
            let i = z.normalize(e.id),
              r = z.normalize(t.id);
            ("binance-defi" === i
              ? (i = "binance")
              : "universalprofiles" === i
                ? (i = "universal_profile")
                : "cryptocom-defi" === i
                  ? (i = "cryptocom")
                  : "bitkeep" === i && (i = "bitget_wallet"),
              "binance-defi" === r
                ? (r = "binance")
                : "universalprofiles" === r
                  ? (r = "universal_profile")
                  : "cryptocom-defi" === r
                    ? (r = "cryptocom")
                    : "bitkeep" === r && (r = "bitget_wallet"));
            let n = l.has(i),
              o = l.has(r);
            return n && o
              ? l.get(i) - l.get(r)
              : n
                ? -1
                : o
                  ? 1
                  : "connector" === e.source && "listing" === t.source
                    ? -1
                    : "listing" === e.source && "connector" === t.source
                      ? 1
                      : e.label
                          .toLowerCase()
                          .localeCompare(t.label.toLowerCase());
          }),
          walletCount: a.length,
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
  var j = (e) =>
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
    S = (e) =>
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
  function T({ enabled: e = !0, walletList: t, walletChainType: r }) {
    let n = (0, p.a)(),
      { connectors: o } = (0, w.u)(),
      { listings: a, loading: l } = (0, m.u)(e),
      s = r ?? n.appearance.walletChainType,
      c = t ?? n.appearance?.walletList,
      d = (0, i.useMemo)(() => new z(s, c), [s, c]),
      { wallets: h, walletCount: u } = (0, i.useMemo)(
        () => d.getWallets(o, a),
        [d, o, a],
      ),
      [g, v] = (0, i.useState)(""),
      f = (0, i.useMemo)(
        () =>
          g
            ? h.filter((e) => e.label.toLowerCase().includes(g.toLowerCase()))
            : h,
        [g, h],
      ),
      [y, b] = (0, i.useState)();
    return {
      selected: y,
      setSelected: b,
      search: g,
      setSearch: v,
      loadingListings: l,
      wallets: f,
      walletCount: u,
    };
  }
  let V = (e) =>
      !e || ("string" != typeof e && (e instanceof m.j || e instanceof m.S)),
    D = ({ index: e, style: i, data: r, recent: n }) => {
      let o = r.wallets[e],
        { walletChainType: a, handleWalletClick: l } = r,
        { t: s } = (0, g.u)(),
        c = { ...i, boxSizing: "border-box" };
      return o
        ? (0, t.jsxs)(L, {
            style: c,
            onClick: () => l(o),
            children: [
              o.icon &&
                (o.connector && !V(o.connector)
                  ? (0, t.jsx)(x.b, {
                      children:
                        "string" == typeof o.icon
                          ? (0, t.jsx)(x.W, { src: o.icon })
                          : (0, t.jsx)(o.icon, {
                              style: { width: "32px", height: "32px" },
                            }),
                    })
                  : "string" == typeof o.icon
                    ? (0, t.jsx)(x.W, { src: o.icon })
                    : (0, t.jsx)(o.icon, {
                        style: { width: "32px", height: "32px" },
                      })),
              (0, t.jsx)(E, { children: o.label }),
              n
                ? (0, t.jsxs)(t.Fragment, {
                    children: [
                      (0, t.jsx)(x.C, {
                        children: s("connectWallet.lastUsed"),
                      }),
                      (0, t.jsx)($, {
                        children: (0, t.jsxs)(t.Fragment, {
                          children: [
                            "ethereum-only" === a && (0, t.jsx)(j, {}),
                            "solana-only" === a && (0, t.jsx)(S, {}),
                          ],
                        }),
                      }),
                    ],
                  })
                : (0, t.jsx)($, {
                    children:
                      "ethereum-only" !== a &&
                      "solana-only" !== a &&
                      (0, t.jsxs)(t.Fragment, {
                        children: [
                          o.chains?.some((e) => e.startsWith("eip155")) &&
                            (0, t.jsx)(j, {}),
                          o.chains?.some((e) => e.startsWith("solana")) &&
                            (0, t.jsx)(S, {}),
                        ],
                      }),
                  }),
            ],
          })
        : null;
    },
    W = a.z.div`
  position: sticky;
  /* Offset by negative margin to account for focus outline */
  margin-top: -3px;
  padding-top: 3px;
  top: -3px;
  z-index: 1;
  background: var(--privy-color-background);
  padding-bottom: calc(var(--screen-space) / 2);
`,
    F = a.z.div`
  display: flex;
  flex-direction: column;
  gap: ${5}px;
`,
    L = a.z.button`
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
    $ = a.z.span`
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
    M = a.z.div`
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
`,
    E = a.z.span`
  text-overflow: ellipsis;
  white-space: nowrap;
  color: var(--privy-color-foreground);
  font-weight: 400;
  flex: 1;
`,
    A = (0, a.z)(s.C)`
  && {
    margin: 0.5rem auto 0;
  }
`,
    _ = a.z.div`
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
      D,
      "i",
      0,
      ({
        className: e,
        customDescription: a,
        connectOnly: s,
        preSelectedWalletId: P,
        hideHeader: U,
        ...O
      }) => {
        let I = (0, p.a)(),
          { t: B } = (0, g.u)(),
          { connectors: R } = (0, w.u)(),
          N = O.walletChainType || I.appearance.walletChainType,
          Z = O.walletList || I.appearance?.walletList,
          { onBack: q, onClose: K, app: H } = O,
          {
            selected: Q,
            setSelected: Y,
            qrUrl: G,
            setQrUrl: J,
            connecting: X,
            uiState: ee,
            errorCode: et,
            wallets: ei,
            walletCount: er,
            handleConnect: en,
            handleBack: eo,
            showSearchBar: ea,
            isInitialConnectView: el,
            title: es,
            search: ec,
            setSearch: ed,
          } = (function ({
            onConnect: e,
            onBack: t,
            onClose: r,
            onConnectError: n,
            walletList: a,
            walletChainType: l,
            app: s,
          }) {
            let c = (0, p.a)(),
              { connectors: d } = (0, w.u)(),
              { t: h } = (0, g.u)(),
              {
                wallets: u,
                walletCount: y,
                search: x,
                setSearch: C,
                selected: k,
                setSelected: z,
              } = T({
                enabled: (0, m.s)(a ?? []),
                walletList: a,
                walletChainType: l,
              }),
              [j, S] = (0, i.useState)(),
              [V, D] = (0, i.useState)(),
              [W, F] = (0, i.useState)(),
              [L, $] = (0, i.useState)(),
              M = !k && !W && !L,
              E = M && (y > 6 || x.length > 0),
              A = d.find((e) => "wallet_connect_v2" === e.connectorType),
              _ = (0, i.useCallback)(
                async (t, i) => {
                  if (!t) return;
                  let r = i?.name ?? "Wallet";
                  if (L?.connector !== t || "loading" !== j) {
                    if ((S("loading"), "string" == typeof t))
                      return (
                        v.c.debug("Connecting wallet via deeplink", {
                          wallet: r,
                          url: t.length > 80 ? `${t.slice(0, 80)}...` : t,
                        }),
                        $({
                          connector: t,
                          name: r,
                          icon: i?.icon,
                          id: i?.id,
                          url: i?.url,
                        }),
                        void window.open(t, "_blank")
                      );
                    (v.c.debug("Connecting wallet via connector", {
                      wallet: r,
                      connectorType: t.connectorType,
                    }),
                      $({
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
                          v.c.warn("Wallet connection returned null", {
                            wallet: r,
                            connectorType: t.connectorType,
                          }),
                          S("error"),
                          D(void 0),
                          void n?.(new f.e("Unable to connect wallet"))
                        );
                      (v.c.debug("Wallet connection successful", {
                        wallet: r,
                        connectorType: t.connectorType,
                      }),
                        (0, m.i)(i) && (await (0, b.e)(i, c)),
                        S("success"),
                        D(void 0),
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
                        return void v.c.debug(
                          "Connection request already pending, maintaining loading state",
                          { wallet: r },
                        );
                      let e =
                        i instanceof Error
                          ? i.message
                          : String(i?.message || "Unknown error");
                      (v.c.error("Wallet connection failed", i, {
                        wallet: r,
                        connectorType: t.connectorType,
                        errorCode: i?.privyErrorCode,
                      }),
                        S("error"),
                        D(i?.privyErrorCode),
                        n?.(
                          i instanceof Error
                            ? i
                            : new f.e(e || "Unable to connect wallet"),
                        ));
                    }
                  } else
                    v.c.debug("Duplicate connection attempt prevented", {
                      wallet: r,
                    });
                },
                [c.id, e, L, j],
              ),
              P = (0, i.useCallback)(
                () =>
                  W
                    ? (S(void 0), D(void 0), $(void 0), void F(void 0))
                    : L
                      ? (S(void 0), D(void 0), void $(void 0))
                      : k
                        ? (S(void 0), D(void 0), $(void 0), void z(void 0))
                        : "error" === j || "loading" === j
                          ? (S(void 0), D(void 0), void $(void 0))
                          : void t?.(),
                [W, L, k, j, t],
              ),
              U = (0, i.useMemo)(
                () =>
                  L?.connector === A && W && o.isMobile && L?.name
                    ? h("connectWallet.goToWallet", { walletName: L.name })
                    : L?.connector === A && W && L?.name
                      ? h("connectWallet.scanToConnect", { walletName: L.name })
                      : W && L?.name
                        ? h(
                            o.isMobile
                              ? "connectWallet.goToWallet"
                              : "connectWallet.scanToConnect",
                            { walletName: L.name },
                          )
                        : "string" == typeof L?.connector
                          ? h("connectWallet.openOrInstall", {
                              walletName: L.name,
                            })
                          : k && !L
                            ? h("connectWallet.selectNetwork")
                            : L
                              ? null
                              : h("connectWallet.selectYourWallet"),
                [L, W, k, A, h],
              );
            return {
              selected: k,
              setSelected: z,
              qrUrl: W,
              setQrUrl: F,
              connecting: L,
              uiState: j,
              errorCode: V,
              search: x,
              setSearch: C,
              wallets: u,
              walletCount: y,
              wc: A,
              isInitialConnectView: M,
              showSearchBar: E,
              title: U,
              handleConnect: _,
              handleBack: P,
              onClose: r,
              onConnect: e,
              app: s,
            };
          })({ ...O, walletList: Z, walletChainType: N }),
          eh = R.find((e) => "wallet_connect_v2" === e.connectorType),
          eu = R.find((e) => "walletconnect_solana" === e.walletBranding.id),
          ep = (0, i.useRef)(null),
          eg = (0, n.f)({
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
                  "solana-only" !== N &&
                  e.chains?.some((e) => e.startsWith("eip155")),
                r =
                  "ethereum-only" !== N &&
                  e.chains?.some((e) => e.startsWith("solana")),
                n = ((t = e.id), m.m[t] || m.m[`${t}_wallet`]),
                a = (t) => {
                  let i = z.normalize(e.id);
                  return R.find(
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
                l = i ? a("ethereum") : void 0,
                c = r ? a("solana") : void 0;
              if (
                n &&
                (0, m.l)({ isMobile: o.isMobile, walletConfig: n }) &&
                !l &&
                !c
              )
                return (
                  v.c.debug(
                    "Using install flow for wallets that do not support WalletConnect.",
                    { wallet: e.id },
                  ),
                  void (await en(n.installLink, {
                    name: e.label,
                    icon: e.icon,
                    id: e.id,
                    url: e.url,
                  }))
                );
              let d = async () => {
                  if (!eh || !e.listing) return !1;
                  let t = k[e.listing.slug]
                    ? { ...e.listing, ...k[e.listing.slug] }
                    : e.listing;
                  return (
                    eh.setWalletEntry(t, J),
                    await eh.resetConnection(e.id),
                    await en(eh, {
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
                  await en(eu, {
                    name: e.label,
                    icon: e.icon,
                    id: e.id,
                    url: e.url,
                  }),
                  !0),
                u = async (t) => {
                  let i = ((e) => {
                    if (n)
                      return n.getMobileRedirect({
                        isSolana: e,
                        connectOnly: !!s,
                        useUniversalLink: !1,
                      });
                  })(t);
                  return (
                    !!i &&
                    (await en(i, {
                      name: e.label,
                      icon: e.icon,
                      id: e.id,
                      url: e.url,
                    }),
                    !0)
                  );
                };
              if (i && r) Y(e);
              else {
                if (i && !r) {
                  if (l && !V(l))
                    return (
                      v.c.debug("Attempting injected EVM connection", {
                        wallet: e.id,
                        connectorType: l.connectorType,
                      }),
                      void (await en(l, {
                        name: e.label,
                        icon: e.icon,
                        id: e.id,
                        url: e.url,
                      }))
                    );
                  if (o.isMobile && n) {
                    if ((await u(!1)) || (await d())) return;
                  } else if ((await d()) || (await u(!1))) return;
                }
                if (r && !i) {
                  if (c && !V(c))
                    return (
                      v.c.debug("Attempting injected Solana connection", {
                        wallet: e.id,
                        connectorType: c.connectorType,
                      }),
                      void (await en(c, {
                        name: e.label,
                        icon: e.icon,
                        id: e.id,
                        url: e.url,
                      }))
                    );
                  if (o.isMobile) {
                    if ((await u(!0)) || (await h())) return;
                  } else if ((await h()) || (await u(!0))) return;
                }
                if (!V(e.connector)) {
                  if (
                    (v.c.debug("Using fallback direct connector", {
                      wallet: e.id,
                      connectorType: e.connector?.connectorType,
                    }),
                    eh && "wallet_connect_v2" === e.connector?.connectorType)
                  )
                    if (
                      (await eh.resetConnection(e.id),
                      "wallet_connect_qr" !== e.id && e.listing)
                    ) {
                      let t = k[e.listing.slug]
                        ? { ...e.listing, ...k[e.listing.slug] }
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
                    void (await en(e.connector, {
                      name: e.label,
                      icon: e.icon,
                      id: e.id,
                      url: e.url,
                    }))
                  );
                }
                e.url
                  ? await en(e.url, {
                      name: e.label,
                      icon: e.icon,
                      id: e.id,
                      url: e.url,
                    })
                  : v.c.warn("No available connection method for wallet", {
                      wallet: e.id,
                    });
              }
            },
            [eh, eu, en, Y, J, N, s, R],
          );
        return (
          (0, i.useEffect)(() => {
            if (!P) return;
            let e = ei.find(({ id: e }) => e === P);
            e && em(e).catch(console.error);
          }, [P]),
          (0, t.jsxs)(C.S, {
            className: e,
            children: [
              (0, t.jsx)(C.S.Header, {
                icon:
                  U && el
                    ? void 0
                    : (X && !G) || (G && o.isMobile && X?.icon)
                      ? X.icon
                      : X
                        ? void 0
                        : y.W,
                iconVariant:
                  (X && !G) || (G && o.isMobile) ? "loading" : void 0,
                iconLoadingStatus:
                  (X && !G) || (G && o.isMobile)
                    ? { success: "success" === ee, fail: "error" === ee }
                    : void 0,
                title:
                  U && el
                    ? void 0
                    : X && !G
                      ? B("connectWallet.waitingForWallet", {
                          walletName: X.name,
                        })
                      : G && o.isMobile
                        ? B("connectWallet.waitingForWallet", {
                            walletName: X?.name ?? "connection",
                          })
                        : es,
                subtitle:
                  U && el
                    ? void 0
                    : X && !G && "string" == typeof X.connector
                      ? B("connectWallet.installAndConnect", {
                          walletName: X.name,
                        })
                      : X && !G && "string" != typeof X.connector
                        ? "error" === ee
                          ? et === f.a.NO_SOLANA_ACCOUNTS
                            ? `The connected wallet has no Solana accounts. Please add a Solana account in ${X.name} and try again.`
                            : B("connectWallet.tryConnectingAgain")
                          : B(
                              "coinbase_wallet" === X.connector.connectorType
                                ? "coinbaseWallet.connectingSubtitle"
                                : "connectionStatus.connectOneWallet",
                            )
                        : el
                          ? (a ??
                            (H
                              ? B("connectWallet.connectToAccount", {
                                  appName: H.name,
                                })
                              : null))
                          : null,
                showBack: !!q || !el,
                showClose: !0,
                onBack: q || eo,
                onClose: K,
              }),
              (0, t.jsxs)(C.S.Body, {
                ref: ep,
                $colorScheme: I.appearance.palette.colorScheme,
                style: { marginBottom: G ? "0.5rem" : void 0 },
                children: [
                  ea &&
                    (0, t.jsx)(W, {
                      children: (0, t.jsxs)(u.E, {
                        style: { background: "transparent" },
                        children: [
                          (0, t.jsx)(b.m, { children: (0, t.jsx)(r, {}) }),
                          (0, t.jsx)("input", {
                            className: "login-method-button",
                            type: "text",
                            placeholder: B("connectWallet.searchPlaceholder", {
                              count: String(er),
                            }),
                            onChange: (e) => ed(e.target.value),
                            value: ec,
                          }),
                        ],
                      }),
                    }),
                  G &&
                    o.isMobile &&
                    "loading" === ee &&
                    (0, t.jsxs)("div", {
                      style: {
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: "1rem",
                      },
                      children: [
                        (0, t.jsx)(l.B, {
                          variant: "primary",
                          onClick: () =>
                            window.open(G.universal ?? G.native, "_blank"),
                          style: { width: "100%" },
                          children: B("connectWallet.openInApp"),
                        }),
                        (0, t.jsx)(A, {
                          value: G.universal ?? G.native,
                          iconOnly: !0,
                          children: "Copy link",
                        }),
                      ],
                    }),
                  G &&
                    !o.isMobile &&
                    "loading" === ee &&
                    (0, t.jsx)("div", {
                      style: {
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: "1rem",
                      },
                      children: (0, t.jsx)(A, {
                        value: G.universal ?? G.native,
                        iconOnly: !0,
                        children: B("connectWallet.copyLink"),
                      }),
                    }),
                  G &&
                    !o.isMobile &&
                    (0, t.jsx)(h.Q, {
                      size: 280,
                      url: G.universal ?? G.native,
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
                        : v.d,
                    }),
                  G &&
                    !o.isMobile &&
                    X?.url &&
                    ("binance" === X.id ||
                      "binanceus" === X.id ||
                      "binance-defi" === X.id ||
                      "robinhood" === X.id) &&
                    (0, t.jsxs)(_, {
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
                        !G &&
                        "string" == typeof X.connector &&
                        (0, t.jsxs)(L, {
                          onClick: () => window.open(X.connector, "_blank"),
                          children: [
                            X.icon &&
                              ("string" == typeof X.icon
                                ? (0, t.jsx)(x.W, { src: X.icon })
                                : (0, t.jsx)(X.icon, {})),
                            (0, t.jsx)(E, { children: X.name }),
                          ],
                        }),
                      Q?.chains.some((e) => e.startsWith("eip155")) &&
                        !X &&
                        (0, t.jsxs)(L, {
                          onClick: () =>
                            em({
                              ...Q,
                              chains: Q.chains.filter((e) =>
                                e.startsWith("eip155"),
                              ),
                            }),
                          children: [
                            Q.icon &&
                              ("string" == typeof Q.icon
                                ? (0, t.jsx)(x.W, { src: Q.icon })
                                : (0, t.jsx)(Q.icon, {})),
                            (0, t.jsx)(E, { children: Q.label }),
                            (0, t.jsx)($, { children: (0, t.jsx)(j, {}) }),
                          ],
                        }),
                      Q?.chains.some((e) => e.startsWith("solana")) &&
                        !X &&
                        (0, t.jsxs)(L, {
                          onClick: () =>
                            em({
                              ...Q,
                              chains: Q.chains.filter((e) =>
                                e.startsWith("solana"),
                              ),
                            }),
                          children: [
                            Q.icon &&
                              ("string" == typeof Q.icon
                                ? (0, t.jsx)(x.W, { src: Q.icon })
                                : (0, t.jsx)(Q.icon, {})),
                            (0, t.jsx)(E, { children: Q.label }),
                            (0, t.jsx)($, { children: (0, t.jsx)(S, {}) }),
                          ],
                        }),
                      el &&
                        (0, t.jsxs)(t.Fragment, {
                          children: [
                            !(er > 0) &&
                              (0, t.jsx)(M, {
                                children: B("connectWallet.noWalletsFound"),
                              }),
                            er > 0 &&
                              !G &&
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
                                            walletChainType: N,
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
              (0, t.jsxs)(C.S.Footer, {
                children: [
                  X &&
                    !G &&
                    "string" != typeof X.connector &&
                    "error" === ee &&
                    (0, t.jsx)(C.S.Actions, {
                      children: (0, t.jsx)(l.B, {
                        style: { width: "100%", alignItems: "center" },
                        variant: "error",
                        onClick: () =>
                          en(X.connector, {
                            name: X.name,
                            icon: X.icon,
                            id: X.id,
                            url: X.url,
                          }),
                        children: B("connectWallet.retry"),
                      }),
                    }),
                  !!(
                    H &&
                    H.legal.privacyPolicyUrl &&
                    H.legal.termsAndConditionsUrl
                  ) &&
                    (0, t.jsx)(d.T, { app: H, alwaysShowImplicitConsent: !0 }),
                  (0, t.jsx)(C.S.Watermark, {}),
                ],
              }),
            ],
          })
        );
      },
      "u",
      0,
      T,
    ],
    467793,
  );
};
