// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var r = e.i(732486),
    i = e.i(352386);
  let o = i.forwardRef(function ({ title: e, titleId: r, ...o }, t) {
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
          ref: t,
          "aria-labelledby": r,
        },
        o,
      ),
      e ? i.createElement("title", { id: r }, e) : null,
      i.createElement("path", {
        strokeLinecap: "round",
        strokeLinejoin: "round",
        d: "m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z",
      }),
    );
  });
  var t = e.i(659226),
    a = e.i(768820),
    n = e.i(689391),
    l = e.i(995040),
    c = e.i(164923),
    s = e.i(583503),
    d = e.i(25047),
    p = e.i(594022),
    u = e.i(305869),
    h = e.i(933185),
    g = e.i(439614),
    v = e.i(461687),
    m = e.i(809845),
    w = e.i(565530),
    y = e.i(748117),
    f = e.i(480705),
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
    metamask: { image_url: { sm: v.M, md: v.M } },
    "okx-wallet": {
      mobile: { native: "okex://main", universal: "okex://main" },
    },
    "okx-wallet-1": {
      mobile: { native: "okxwallet://main", universal: "okxwallet://main" },
    },
  };
  class j {
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
    inAllowList(e, r) {
      if (
        !this.normalizedAllowList ||
        0 === this.normalizedAllowList.length ||
        ("listing" === r && this.includeWalletConnect)
      )
        return !0;
      let i = j.normalize(e);
      return this.normalizedAllowList.some((e) => i === j.normalize(e));
    }
    inDenyList(e, r) {
      return ("listing" === r && "rabby" === e) || "agw" === j.normalize(e);
    }
    chainMatches(e) {
      return "ethereum-only" === this.chainFilter
        ? "ethereum" === e
        : "solana-only" !== this.chainFilter || "solana" === e;
    }
    getAllowListKey(e, r, i, o) {
      let t = j.normalize(e);
      for (let e of this.normalizedAllowList || [])
        if (t === j.normalize(e)) return e;
      if ("connector" === r) {
        if (
          ("injected" === i || "solana_adapter" === i) &&
          "ethereum" === o &&
          this.detectedEth
        )
          return "detected_ethereum_wallets";
        if (
          ("injected" === i || "solana_adapter" === i) &&
          "solana" === o &&
          this.detectedSol
        )
          return "detected_solana_wallets";
      }
      if ("listing" === r && this.includeWalletConnect) return "wallet_connect";
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
    getWallets(e, r) {
      let i = new Map(),
        o = (e) => {
          let r = i.get(e.id);
          if (r) {
            r.chainType !== e.chainType && (r.chainType = "multi");
            let i = new Set(r.chains);
            (e.chains.forEach((e) => i.add(e)),
              (r.chains = Array.from(i)),
              !r.icon && e.icon && (r.icon = e.icon),
              !r.url && e.url && (r.url = e.url),
              !r.listing && e.listing && (r.listing = e.listing),
              !r.allowListKey &&
                e.allowListKey &&
                (r.allowListKey = e.allowListKey));
          } else i.set(e.id, e);
        };
      e.filter((e) => this.connectorOk(e)).forEach((e) => {
        let r = j.normalize(e.walletClientType);
        o({
          id: r,
          label: e.walletBranding?.name ?? r,
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
      let t = e.find((e) => "wallet_connect_v2" === e.connectorType),
        a = e.find((e) => "walletconnect_solana" === e.walletBranding.id);
      (r
        .filter((e) => this.listingOk(e))
        .forEach((r) => {
          let i = [...r.chains].filter(
            (e) => e.includes("eip155:") || e.includes("solana:"),
          );
          if (
            (e.some(
              (e) =>
                j.normalize(e.walletClientType) === j.normalize(r.slug) &&
                "ethereum" === e.chainType &&
                "null" !== e.connectorType,
            ) ||
              t ||
              r.mobile.native ||
              r.mobile.universal ||
              v.m[r.slug]?.chainTypes.includes("ethereum") ||
              (i = i.filter((e) => !e.includes("eip155:"))),
            e.some(
              (e) =>
                j.normalize(e.walletClientType) === j.normalize(r.slug) &&
                "solana" === e.chainType &&
                "null" !== e.connectorType,
            ) ||
              a ||
              r.mobile.native ||
              r.mobile.universal ||
              v.m[r.slug]?.chainTypes.includes("solana") ||
              (i = i.filter((e) => !e.includes("solana:"))),
            !i.length)
          )
            return;
          let n = j.normalize(r.slug),
            l = k[r.slug],
            c = l?.image_url?.sm || r.image_url?.sm;
          (i.some((e) => e.includes("eip155:")) &&
            o({
              id: n,
              label: r.name || n,
              source: "listing",
              listing: r,
              chainType: "ethereum",
              icon: c,
              url: r.homepage,
              chains: i,
              allowListKey: this.getAllowListKey(r.slug, "listing"),
            }),
            i.some((e) => e.includes("solana:")) &&
              o({
                id: n,
                label: r.name || n,
                source: "listing",
                listing: r,
                chainType: "solana",
                icon: c,
                url: r.homepage,
                chains: i,
                allowListKey: this.getAllowListKey(r.slug, "listing"),
              }));
        }),
        this.includeWalletConnectQr &&
          t &&
          o({
            id: "wallet_connect_qr",
            label: "WalletConnect",
            source: "connector",
            connector: t,
            chainType: "ethereum",
            icon: m.a,
            url: void 0,
            chains: ["eip155"],
            allowListKey: "wallet_connect_qr",
          }),
        this.includeWalletConnectQrSolana &&
          a &&
          o({
            id: "wallet_connect_qr_solana",
            label: "WalletConnect",
            source: "connector",
            connector: a,
            chainType: "solana",
            icon: m.a,
            url: void 0,
            chains: ["solana"],
            allowListKey: "wallet_connect_qr_solana",
          }));
      let n = Array.from(i.values());
      n.forEach((e) => {
        let r = k[e.listing?.slug || e.id];
        r?.image_url?.sm && (e.icon = r.image_url.sm);
      });
      let l = new Map();
      return (
        this.normalizedAllowList?.forEach((e, r) => {
          l.set(j.normalize(e), r);
        }),
        {
          wallets: n.slice().sort((e, r) => {
            if (e.allowListKey && r.allowListKey) {
              let i =
                  this.normalizedAllowList?.findIndex(
                    (r) => j.normalize(r) === j.normalize(e.allowListKey),
                  ) ?? -1,
                o =
                  this.normalizedAllowList?.findIndex(
                    (e) => j.normalize(e) === j.normalize(r.allowListKey),
                  ) ?? -1;
              if (i !== o && i >= 0 && o >= 0) return i - o;
            }
            if (e.allowListKey && !r.allowListKey) return -1;
            if (!e.allowListKey && r.allowListKey) return 1;
            let i = j.normalize(e.id),
              o = j.normalize(r.id);
            ("binance-defi" === i
              ? (i = "binance")
              : "universalprofiles" === i
                ? (i = "universal_profile")
                : "cryptocom-defi" === i
                  ? (i = "cryptocom")
                  : "bitkeep" === i && (i = "bitget_wallet"),
              "binance-defi" === o
                ? (o = "binance")
                : "universalprofiles" === o
                  ? (o = "universal_profile")
                  : "cryptocom-defi" === o
                    ? (o = "cryptocom")
                    : "bitkeep" === o && (o = "bitget_wallet"));
            let t = l.has(i),
              a = l.has(o);
            return t && a
              ? l.get(i) - l.get(o)
              : t
                ? -1
                : a
                  ? 1
                  : "connector" === e.source && "listing" === r.source
                    ? -1
                    : "listing" === e.source && "connector" === r.source
                      ? 1
                      : e.label
                          .toLowerCase()
                          .localeCompare(r.label.toLowerCase());
          }),
          walletCount: n.length,
        }
      );
    }
    constructor(e, r) {
      if (((this.chainFilter = e), r && r.length > 0)) {
        if (
          ((this.normalizedAllowList = r.map(String)),
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
  var z = (e) =>
      (0, r.jsxs)("svg", {
        viewBox: "0 0 32 32",
        xmlns: "http://www.w3.org/2000/svg",
        ...e,
        children: [
          (0, r.jsx)("path", { d: "m0 0h32v32h-32z", fill: "#5469d4" }),
          (0, r.jsx)("path", {
            d: "m15.997 5.333-.143.486v14.106l.143.143 6.548-3.87z",
            fill: "#c2ccf4",
          }),
          (0, r.jsx)("path", {
            d: "m15.996 5.333-6.548 10.865 6.548 3.87z",
            fill: "#fff",
          }),
          (0, r.jsx)("path", {
            d: "m15.997 21.306-.08.098v5.025l.08.236 6.552-9.227z",
            fill: "#c2ccf4",
          }),
          (0, r.jsx)("path", {
            d: "m15.996 26.665v-5.36l-6.548-3.867z",
            fill: "#fff",
          }),
          (0, r.jsx)("path", {
            d: "m15.995 20.07 6.548-3.87-6.548-2.976v6.847z",
            fill: "#8698e8",
          }),
          (0, r.jsx)("path", {
            d: "m9.448 16.2 6.548 3.87v-6.846z",
            fill: "#c2ccf4",
          }),
        ],
      }),
    S = (e) =>
      (0, r.jsxs)("svg", {
        viewBox: "0 0 32 32",
        xmlns: "http://www.w3.org/2000/svg",
        ...e,
        children: [
          (0, r.jsxs)("linearGradient", {
            id: "a",
            gradientUnits: "userSpaceOnUse",
            x1: "7.233",
            x2: "24.766",
            y1: "24.766",
            y2: "7.234",
            children: [
              (0, r.jsx)("stop", { offset: "0", stopColor: "#9945ff" }),
              (0, r.jsx)("stop", { offset: ".2", stopColor: "#7962e7" }),
              (0, r.jsx)("stop", { offset: "1", stopColor: "#00d18c" }),
            ],
          }),
          (0, r.jsx)("path", { d: "m0 0h32v32h-32z", fill: "#10111a" }),
          (0, r.jsx)("path", {
            clipRule: "evenodd",
            d: "m9.873 20.41a.645.645 0 0 1 .476-.21l14.662.012a.323.323 0 0 1 .238.54l-3.123 3.438a.643.643 0 0 1 -.475.21l-14.662-.012a.323.323 0 0 1 -.238-.54zm15.376-2.862a.322.322 0 0 1 -.238.54l-14.662.012a.642.642 0 0 1 -.476-.21l-3.122-3.44a.323.323 0 0 1 .238-.54l14.662-.012a.644.644 0 0 1 .475.21zm-15.376-9.738a.644.644 0 0 1 .476-.21l14.662.012a.322.322 0 0 1 .238.54l-3.123 3.438a.643.643 0 0 1 -.475.21l-14.662-.012a.323.323 0 0 1 -.238-.54z",
            fill: "url(#a)",
            fillRule: "evenodd",
          }),
        ],
      });
  function T({ enabled: e = !0, walletList: r, walletChainType: o }) {
    let t = (0, h.a)(),
      { connectors: a } = (0, y.u)(),
      { listings: n, loading: l } = (0, v.u)(e),
      c = o ?? t.appearance.walletChainType,
      s = r ?? t.appearance?.walletList,
      d = (0, i.useMemo)(() => new j(c, s), [c, s]),
      { wallets: p, walletCount: u } = (0, i.useMemo)(
        () => d.getWallets(a, n),
        [d, a, n],
      ),
      [g, m] = (0, i.useState)(""),
      w = (0, i.useMemo)(
        () =>
          g
            ? p.filter((e) => e.label.toLowerCase().includes(g.toLowerCase()))
            : p,
        [g, p],
      ),
      [f, b] = (0, i.useState)();
    return {
      selected: f,
      setSelected: b,
      search: g,
      setSearch: m,
      loadingListings: l,
      wallets: w,
      walletCount: u,
    };
  }
  let V = (e) =>
      !e || ("string" != typeof e && (e instanceof v.j || e instanceof v.S)),
    D = ({ index: e, style: i, data: o, recent: t }) => {
      let a = o.wallets[e],
        { walletChainType: n, handleWalletClick: l } = o,
        { t: c } = (0, g.u)(),
        s = { ...i, boxSizing: "border-box" };
      return a
        ? (0, r.jsxs)(W, {
            style: s,
            onClick: () => l(a),
            children: [
              a.icon &&
                (a.connector && !V(a.connector)
                  ? (0, r.jsx)(x.b, {
                      children:
                        "string" == typeof a.icon
                          ? (0, r.jsx)(x.W, { src: a.icon })
                          : (0, r.jsx)(a.icon, {
                              style: { width: "32px", height: "32px" },
                            }),
                    })
                  : "string" == typeof a.icon
                    ? (0, r.jsx)(x.W, { src: a.icon })
                    : (0, r.jsx)(a.icon, {
                        style: { width: "32px", height: "32px" },
                      })),
              (0, r.jsx)(A, { children: a.label }),
              t
                ? (0, r.jsxs)(r.Fragment, {
                    children: [
                      (0, r.jsx)(x.C, {
                        children: c("connectWallet.lastUsed"),
                      }),
                      (0, r.jsx)(F, {
                        children: (0, r.jsxs)(r.Fragment, {
                          children: [
                            "ethereum-only" === n && (0, r.jsx)(z, {}),
                            "solana-only" === n && (0, r.jsx)(S, {}),
                          ],
                        }),
                      }),
                    ],
                  })
                : (0, r.jsx)(F, {
                    children:
                      "ethereum-only" !== n &&
                      "solana-only" !== n &&
                      (0, r.jsxs)(r.Fragment, {
                        children: [
                          a.chains?.some((e) => e.startsWith("eip155")) &&
                            (0, r.jsx)(z, {}),
                          a.chains?.some((e) => e.startsWith("solana")) &&
                            (0, r.jsx)(S, {}),
                        ],
                      }),
                  }),
            ],
          })
        : null;
    },
    L = n.z.div`
  position: sticky;
  /* Offset by negative margin to account for focus outline */
  margin-top: -3px;
  padding-top: 3px;
  top: -3px;
  z-index: 1;
  background: var(--privy-color-background);
  padding-bottom: calc(var(--screen-space) / 2);
`,
    $ = n.z.div`
  display: flex;
  flex-direction: column;
  gap: ${5}px;
`,
    W = n.z.button`
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
    F = n.z.span`
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
    _ = n.z.div`
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
`,
    A = n.z.span`
  text-overflow: ellipsis;
  white-space: nowrap;
  color: var(--privy-color-foreground);
  font-weight: 400;
  flex: 1;
`,
    U = (0, n.z)(c.C)`
  && {
    margin: 0.5rem auto 0;
  }
`,
    P = n.z.div`
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
      j,
      "a",
      0,
      D,
      "i",
      0,
      ({
        className: e,
        customDescription: n,
        connectOnly: c,
        preSelectedWalletId: E,
        hideHeader: M,
        ...B
      }) => {
        let N = (0, h.a)(),
          { t: I } = (0, g.u)(),
          { connectors: R } = (0, y.u)(),
          O = B.walletChainType || N.appearance.walletChainType,
          Z = B.walletList || N.appearance?.walletList,
          { onBack: q, onClose: K, app: H } = B,
          {
            selected: Q,
            setSelected: Y,
            qrUrl: G,
            setQrUrl: J,
            connecting: X,
            uiState: ee,
            errorCode: er,
            wallets: ei,
            walletCount: eo,
            handleConnect: et,
            handleBack: ea,
            showSearchBar: en,
            isInitialConnectView: el,
            title: ec,
            search: es,
            setSearch: ed,
          } = (function ({
            onConnect: e,
            onBack: r,
            onClose: o,
            onConnectError: t,
            walletList: n,
            walletChainType: l,
            app: c,
          }) {
            let s = (0, h.a)(),
              { connectors: d } = (0, y.u)(),
              { t: p } = (0, g.u)(),
              {
                wallets: u,
                walletCount: f,
                search: x,
                setSearch: C,
                selected: k,
                setSelected: j,
              } = T({
                enabled: (0, v.s)(n ?? []),
                walletList: n,
                walletChainType: l,
              }),
              [z, S] = (0, i.useState)(),
              [V, D] = (0, i.useState)(),
              [L, $] = (0, i.useState)(),
              [W, F] = (0, i.useState)(),
              _ = !k && !L && !W,
              A = _ && (f > 6 || x.length > 0),
              U = d.find((e) => "wallet_connect_v2" === e.connectorType),
              P = (0, i.useCallback)(
                async (r, i) => {
                  if (!r) return;
                  let o = i?.name ?? "Wallet";
                  if (W?.connector !== r || "loading" !== z) {
                    if ((S("loading"), "string" == typeof r))
                      return (
                        m.c.debug("Connecting wallet via deeplink", {
                          wallet: o,
                          url: r.length > 80 ? `${r.slice(0, 80)}...` : r,
                        }),
                        F({
                          connector: r,
                          name: o,
                          icon: i?.icon,
                          id: i?.id,
                          url: i?.url,
                        }),
                        void window.open(r, "_blank")
                      );
                    (m.c.debug("Connecting wallet via connector", {
                      wallet: o,
                      connectorType: r.connectorType,
                    }),
                      F({
                        connector: r,
                        name: i?.name ?? r.walletBranding.name ?? "Wallet",
                        icon: i?.icon ?? r.walletBranding.icon,
                        id: i?.id,
                        url: i?.url,
                      }));
                    try {
                      let i = await r.connect({ showPrompt: !0 });
                      if (!i)
                        return (
                          m.c.warn("Wallet connection returned null", {
                            wallet: o,
                            connectorType: r.connectorType,
                          }),
                          S("error"),
                          D(void 0),
                          void t?.(new w.e("Unable to connect wallet"))
                        );
                      (m.c.debug("Wallet connection successful", {
                        wallet: o,
                        connectorType: r.connectorType,
                      }),
                        (0, v.i)(i) && (await (0, b.e)(i, s)),
                        S("success"),
                        D(void 0),
                        (0, b.s)({
                          address: i.address,
                          client: i.walletClientType,
                          appId: s.id,
                        }),
                        setTimeout(() => {
                          e({ connector: r, wallet: i });
                        }, h.Q));
                    } catch (i) {
                      if (
                        i?.message?.includes("already pending for origin") ||
                        i?.message?.includes("wallet_requestPermissions")
                      )
                        return void m.c.debug(
                          "Connection request already pending, maintaining loading state",
                          { wallet: o },
                        );
                      let e =
                        i instanceof Error
                          ? i.message
                          : String(i?.message || "Unknown error");
                      (m.c.error("Wallet connection failed", i, {
                        wallet: o,
                        connectorType: r.connectorType,
                        errorCode: i?.privyErrorCode,
                      }),
                        S("error"),
                        D(i?.privyErrorCode),
                        t?.(
                          i instanceof Error
                            ? i
                            : new w.e(e || "Unable to connect wallet"),
                        ));
                    }
                  } else
                    m.c.debug("Duplicate connection attempt prevented", {
                      wallet: o,
                    });
                },
                [s.id, e, W, z],
              ),
              E = (0, i.useCallback)(
                () =>
                  L
                    ? (S(void 0), D(void 0), F(void 0), void $(void 0))
                    : W
                      ? (S(void 0), D(void 0), void F(void 0))
                      : k
                        ? (S(void 0), D(void 0), F(void 0), void j(void 0))
                        : "error" === z || "loading" === z
                          ? (S(void 0), D(void 0), void F(void 0))
                          : void r?.(),
                [L, W, k, z, r],
              ),
              M = (0, i.useMemo)(
                () =>
                  W?.connector === U && L && a.isMobile && W?.name
                    ? p("connectWallet.goToWallet", { walletName: W.name })
                    : W?.connector === U && L && W?.name
                      ? p("connectWallet.scanToConnect", { walletName: W.name })
                      : L && W?.name
                        ? p(
                            a.isMobile
                              ? "connectWallet.goToWallet"
                              : "connectWallet.scanToConnect",
                            { walletName: W.name },
                          )
                        : "string" == typeof W?.connector
                          ? p("connectWallet.openOrInstall", {
                              walletName: W.name,
                            })
                          : k && !W
                            ? p("connectWallet.selectNetwork")
                            : W
                              ? null
                              : p("connectWallet.selectYourWallet"),
                [W, L, k, U, p],
              );
            return {
              selected: k,
              setSelected: j,
              qrUrl: L,
              setQrUrl: $,
              connecting: W,
              uiState: z,
              errorCode: V,
              search: x,
              setSearch: C,
              wallets: u,
              walletCount: f,
              wc: U,
              isInitialConnectView: _,
              showSearchBar: A,
              title: M,
              handleConnect: P,
              handleBack: E,
              onClose: o,
              onConnect: e,
              app: c,
            };
          })({ ...B, walletList: Z, walletChainType: O }),
          ep = R.find((e) => "wallet_connect_v2" === e.connectorType),
          eu = R.find((e) => "walletconnect_solana" === e.walletBranding.id),
          eh = (0, i.useRef)(null),
          eg = (0, t.f)({
            count: ei.length,
            getScrollElement: () => eh.current,
            estimateSize: () => 56,
            overscan: 6,
            gap: 5,
          }),
          ev = (0, i.useCallback)(
            async (e) => {
              let r,
                i =
                  "solana-only" !== O &&
                  e.chains?.some((e) => e.startsWith("eip155")),
                o =
                  "ethereum-only" !== O &&
                  e.chains?.some((e) => e.startsWith("solana")),
                t = ((r = e.id), v.m[r] || v.m[`${r}_wallet`]),
                n = (r) => {
                  let i = j.normalize(e.id);
                  return R.find(
                    (e) =>
                      j.normalize(e.walletClientType) === i &&
                      e.chainType === r &&
                      "wallet_connect_v2" !== e.connectorType &&
                      !(
                        ("ethereum" === e.chainType && e instanceof v.j) ||
                        ("solana" === e.chainType && e instanceof v.S)
                      ),
                  );
                },
                l = i ? n("ethereum") : void 0,
                s = o ? n("solana") : void 0;
              if (
                t &&
                (0, v.l)({ isMobile: a.isMobile, walletConfig: t }) &&
                !l &&
                !s
              )
                return (
                  m.c.debug(
                    "Using install flow for wallets that do not support WalletConnect.",
                    { wallet: e.id },
                  ),
                  void (await et(t.installLink, {
                    name: e.label,
                    icon: e.icon,
                    id: e.id,
                    url: e.url,
                  }))
                );
              let d = async () => {
                  if (!ep || !e.listing) return !1;
                  let r = k[e.listing.slug]
                    ? { ...e.listing, ...k[e.listing.slug] }
                    : e.listing;
                  return (
                    ep.setWalletEntry(r, J),
                    await ep.resetConnection(e.id),
                    await et(ep, {
                      name: e.label,
                      icon: e.icon,
                      id: e.id,
                      url: e.url,
                    }),
                    !0
                  );
                },
                p = async () =>
                  !!eu &&
                  !!e.listing &&
                  (await eu.disconnect(),
                  eu.wallet.setWalletEntry(e.listing, J),
                  await new Promise((e) => setTimeout(e, 100)),
                  await et(eu, {
                    name: e.label,
                    icon: e.icon,
                    id: e.id,
                    url: e.url,
                  }),
                  !0),
                u = async (r) => {
                  let i = ((e) => {
                    if (t)
                      return t.getMobileRedirect({
                        isSolana: e,
                        connectOnly: !!c,
                        useUniversalLink: !1,
                      });
                  })(r);
                  return (
                    !!i &&
                    (await et(i, {
                      name: e.label,
                      icon: e.icon,
                      id: e.id,
                      url: e.url,
                    }),
                    !0)
                  );
                };
              if (i && o) Y(e);
              else {
                if (i && !o) {
                  if (l && !V(l))
                    return (
                      m.c.debug("Attempting injected EVM connection", {
                        wallet: e.id,
                        connectorType: l.connectorType,
                      }),
                      void (await et(l, {
                        name: e.label,
                        icon: e.icon,
                        id: e.id,
                        url: e.url,
                      }))
                    );
                  if (a.isMobile && t) {
                    if ((await u(!1)) || (await d())) return;
                  } else if ((await d()) || (await u(!1))) return;
                }
                if (o && !i) {
                  if (s && !V(s))
                    return (
                      m.c.debug("Attempting injected Solana connection", {
                        wallet: e.id,
                        connectorType: s.connectorType,
                      }),
                      void (await et(s, {
                        name: e.label,
                        icon: e.icon,
                        id: e.id,
                        url: e.url,
                      }))
                    );
                  if (a.isMobile) {
                    if ((await u(!0)) || (await p())) return;
                  } else if ((await p()) || (await u(!0))) return;
                }
                if (!V(e.connector)) {
                  if (
                    (m.c.debug("Using fallback direct connector", {
                      wallet: e.id,
                      connectorType: e.connector?.connectorType,
                    }),
                    ep && "wallet_connect_v2" === e.connector?.connectorType)
                  )
                    if (
                      (await ep.resetConnection(e.id),
                      "wallet_connect_qr" !== e.id && e.listing)
                    ) {
                      let r = k[e.listing.slug]
                        ? { ...e.listing, ...k[e.listing.slug] }
                        : e.listing;
                      ep.setWalletEntry(r, J);
                    } else
                      ep.setWalletEntry(
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
                    void (await et(e.connector, {
                      name: e.label,
                      icon: e.icon,
                      id: e.id,
                      url: e.url,
                    }))
                  );
                }
                e.url
                  ? await et(e.url, {
                      name: e.label,
                      icon: e.icon,
                      id: e.id,
                      url: e.url,
                    })
                  : m.c.warn("No available connection method for wallet", {
                      wallet: e.id,
                    });
              }
            },
            [ep, eu, et, Y, J, O, c, R],
          );
        return (
          (0, i.useEffect)(() => {
            if (!E) return;
            let e = ei.find(({ id: e }) => e === E);
            e && ev(e).catch(console.error);
          }, [E]),
          (0, r.jsxs)(C.S, {
            className: e,
            children: [
              (0, r.jsx)(C.S.Header, {
                icon:
                  M && el
                    ? void 0
                    : (X && !G) || (G && a.isMobile && X?.icon)
                      ? X.icon
                      : X
                        ? void 0
                        : f.W,
                iconVariant:
                  (X && !G) || (G && a.isMobile) ? "loading" : void 0,
                iconLoadingStatus:
                  (X && !G) || (G && a.isMobile)
                    ? { success: "success" === ee, fail: "error" === ee }
                    : void 0,
                title:
                  M && el
                    ? void 0
                    : X && !G
                      ? I("connectWallet.waitingForWallet", {
                          walletName: X.name,
                        })
                      : G && a.isMobile
                        ? I("connectWallet.waitingForWallet", {
                            walletName: X?.name ?? "connection",
                          })
                        : ec,
                subtitle:
                  M && el
                    ? void 0
                    : X && !G && "string" == typeof X.connector
                      ? I("connectWallet.installAndConnect", {
                          walletName: X.name,
                        })
                      : X && !G && "string" != typeof X.connector
                        ? "error" === ee
                          ? er === w.a.NO_SOLANA_ACCOUNTS
                            ? `The connected wallet has no Solana accounts. Please add a Solana account in ${X.name} and try again.`
                            : I("connectWallet.tryConnectingAgain")
                          : I(
                              "coinbase_wallet" === X.connector.connectorType
                                ? "coinbaseWallet.connectingSubtitle"
                                : "connectionStatus.connectOneWallet",
                            )
                        : el
                          ? (n ??
                            (H
                              ? I("connectWallet.connectToAccount", {
                                  appName: H.name,
                                })
                              : null))
                          : null,
                showBack: !!q || !el,
                showClose: !0,
                onBack: q || ea,
                onClose: K,
              }),
              (0, r.jsxs)(C.S.Body, {
                ref: eh,
                $colorScheme: N.appearance.palette.colorScheme,
                style: { marginBottom: G ? "0.5rem" : void 0 },
                children: [
                  en &&
                    (0, r.jsx)(L, {
                      children: (0, r.jsxs)(u.E, {
                        style: { background: "transparent" },
                        children: [
                          (0, r.jsx)(b.m, { children: (0, r.jsx)(o, {}) }),
                          (0, r.jsx)("input", {
                            className: "login-method-button",
                            type: "text",
                            placeholder: I("connectWallet.searchPlaceholder", {
                              count: String(eo),
                            }),
                            onChange: (e) => ed(e.target.value),
                            value: es,
                          }),
                        ],
                      }),
                    }),
                  G &&
                    a.isMobile &&
                    "loading" === ee &&
                    (0, r.jsxs)("div", {
                      style: {
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: "1rem",
                      },
                      children: [
                        (0, r.jsx)(l.B, {
                          variant: "primary",
                          onClick: () =>
                            window.open(G.universal ?? G.native, "_blank"),
                          style: { width: "100%" },
                          children: I("connectWallet.openInApp"),
                        }),
                        (0, r.jsx)(U, {
                          value: G.universal ?? G.native,
                          iconOnly: !0,
                          children: "Copy link",
                        }),
                      ],
                    }),
                  G &&
                    !a.isMobile &&
                    "loading" === ee &&
                    (0, r.jsx)("div", {
                      style: {
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: "1rem",
                      },
                      children: (0, r.jsx)(U, {
                        value: G.universal ?? G.native,
                        iconOnly: !0,
                        children: I("connectWallet.copyLink"),
                      }),
                    }),
                  G &&
                    !a.isMobile &&
                    (0, r.jsx)(p.Q, {
                      size: 280,
                      url: G.universal ?? G.native,
                      squareLogoElement: X?.icon
                        ? "string" == typeof X.icon
                          ? (e) =>
                              (0, r.jsx)("svg", {
                                ...e,
                                children: (0, r.jsx)("image", {
                                  href: X.icon,
                                  height: e.height,
                                  width: e.width,
                                }),
                              })
                          : X.icon
                        : m.d,
                    }),
                  G &&
                    !a.isMobile &&
                    X?.url &&
                    ("binance" === X.id ||
                      "binanceus" === X.id ||
                      "binance-defi" === X.id ||
                      "robinhood" === X.id) &&
                    (0, r.jsxs)(P, {
                      children: [
                        (0, r.jsxs)("span", {
                          children: ["Don't have ", X.name, "? "],
                        }),
                        (0, r.jsx)(s.L, {
                          href: X.url,
                          target: "_blank",
                          size: "sm",
                          children: "Download here",
                        }),
                      ],
                    }),
                  (0, r.jsxs)($, {
                    children: [
                      X &&
                        !G &&
                        "string" == typeof X.connector &&
                        (0, r.jsxs)(W, {
                          onClick: () => window.open(X.connector, "_blank"),
                          children: [
                            X.icon &&
                              ("string" == typeof X.icon
                                ? (0, r.jsx)(x.W, { src: X.icon })
                                : (0, r.jsx)(X.icon, {})),
                            (0, r.jsx)(A, { children: X.name }),
                          ],
                        }),
                      Q?.chains.some((e) => e.startsWith("eip155")) &&
                        !X &&
                        (0, r.jsxs)(W, {
                          onClick: () =>
                            ev({
                              ...Q,
                              chains: Q.chains.filter((e) =>
                                e.startsWith("eip155"),
                              ),
                            }),
                          children: [
                            Q.icon &&
                              ("string" == typeof Q.icon
                                ? (0, r.jsx)(x.W, { src: Q.icon })
                                : (0, r.jsx)(Q.icon, {})),
                            (0, r.jsx)(A, { children: Q.label }),
                            (0, r.jsx)(F, { children: (0, r.jsx)(z, {}) }),
                          ],
                        }),
                      Q?.chains.some((e) => e.startsWith("solana")) &&
                        !X &&
                        (0, r.jsxs)(W, {
                          onClick: () =>
                            ev({
                              ...Q,
                              chains: Q.chains.filter((e) =>
                                e.startsWith("solana"),
                              ),
                            }),
                          children: [
                            Q.icon &&
                              ("string" == typeof Q.icon
                                ? (0, r.jsx)(x.W, { src: Q.icon })
                                : (0, r.jsx)(Q.icon, {})),
                            (0, r.jsx)(A, { children: Q.label }),
                            (0, r.jsx)(F, { children: (0, r.jsx)(S, {}) }),
                          ],
                        }),
                      el &&
                        (0, r.jsxs)(r.Fragment, {
                          children: [
                            !(eo > 0) &&
                              (0, r.jsx)(_, {
                                children: I("connectWallet.noWalletsFound"),
                              }),
                            eo > 0 &&
                              !G &&
                              (0, r.jsx)("div", {
                                style: {
                                  maxHeight: 56 * Math.min(ei.length, 5) + 5,
                                  width: "100%",
                                },
                                children: (0, r.jsx)("div", {
                                  style: {
                                    height: `${eg.getTotalSize()}px`,
                                    width: "100%",
                                    position: "relative",
                                  },
                                  children: eg
                                    .getVirtualItems()
                                    .map((e) =>
                                      (0, r.jsx)(
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
                                            handleWalletClick: ev,
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
              (0, r.jsxs)(C.S.Footer, {
                children: [
                  X &&
                    !G &&
                    "string" != typeof X.connector &&
                    "error" === ee &&
                    (0, r.jsx)(C.S.Actions, {
                      children: (0, r.jsx)(l.B, {
                        style: { width: "100%", alignItems: "center" },
                        variant: "error",
                        onClick: () =>
                          et(X.connector, {
                            name: X.name,
                            icon: X.icon,
                            id: X.id,
                            url: X.url,
                          }),
                        children: I("connectWallet.retry"),
                      }),
                    }),
                  !!(
                    H &&
                    H.legal.privacyPolicyUrl &&
                    H.legal.termsAndConditionsUrl
                  ) &&
                    (0, r.jsx)(d.T, { app: H, alwaysShowImplicitConsent: !0 }),
                  (0, r.jsx)(C.S.Watermark, {}),
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
