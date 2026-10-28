// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(450314),
    i = e.i(901131);
  let s = {
    WALLET_ID: "@appkit/wallet_id",
    WALLET_NAME: "@appkit/wallet_name",
    SOLANA_WALLET: "@appkit/solana_wallet",
    SOLANA_CAIP_CHAIN: "@appkit/solana_caip_chain",
    ACTIVE_CAIP_NETWORK_ID: "@appkit/active_caip_network_id",
    CONNECTED_SOCIAL: "@appkit/connected_social",
    CONNECTED_SOCIAL_USERNAME: "@appkit-wallet/SOCIAL_USERNAME",
    RECENT_WALLETS: "@appkit/recent_wallets",
    DEEPLINK_CHOICE: "WALLETCONNECT_DEEPLINK_CHOICE",
    ACTIVE_NAMESPACE: "@appkit/active_namespace",
    CONNECTED_NAMESPACES: "@appkit/connected_namespaces",
    CONNECTION_STATUS: "@appkit/connection_status",
    SIWX_AUTH_TOKEN: "@appkit/siwx-auth-token",
    SIWX_NONCE_TOKEN: "@appkit/siwx-nonce-token",
    TELEGRAM_SOCIAL_PROVIDER: "@appkit/social_provider",
    NATIVE_BALANCE_CACHE: "@appkit/native_balance_cache",
    PORTFOLIO_CACHE: "@appkit/portfolio_cache",
    ENS_CACHE: "@appkit/ens_cache",
    IDENTITY_CACHE: "@appkit/identity_cache",
  };
  function r(e) {
    if (!e) throw Error("Namespace is required for CONNECTED_CONNECTOR_ID");
    return `@appkit/${e}:connected_connector_id`;
  }
  let a = {
    setItem(e, t) {
      n() && void 0 !== t && localStorage.setItem(e, t);
    },
    getItem(e) {
      if (n()) return localStorage.getItem(e) || void 0;
    },
    removeItem(e) {
      n() && localStorage.removeItem(e);
    },
    clear() {
      n() && localStorage.clear();
    },
  };
  function n() {
    return "u" > typeof window && "u" > typeof localStorage;
  }
  e.s(["y", 0, a, "A", 0, s, "o", 0, r, "v", 0, n], 142792);
  let o = {
    cacheExpiry: {
      portfolio: 3e4,
      nativeBalance: 3e4,
      ens: 3e5,
      identity: 3e5,
    },
    isCacheExpired: (e, t) => Date.now() - e > t,
    getActiveNetworkProps() {
      let e = o.getActiveNamespace(),
        t = o.getActiveCaipNetworkId(),
        i = t ? t.split(":")[1] : void 0;
      return {
        namespace: e,
        caipNetworkId: t,
        chainId: i ? (isNaN(Number(i)) ? i : Number(i)) : void 0,
      };
    },
    setWalletConnectDeepLink({ name: e, href: t }) {
      try {
        a.setItem(s.DEEPLINK_CHOICE, JSON.stringify({ href: t, name: e }));
      } catch {
        console.info("Unable to set WalletConnect deep link");
      }
    },
    getWalletConnectDeepLink() {
      try {
        let e = a.getItem(s.DEEPLINK_CHOICE);
        if (e) return JSON.parse(e);
      } catch {
        console.info("Unable to get WalletConnect deep link");
      }
    },
    deleteWalletConnectDeepLink() {
      try {
        a.removeItem(s.DEEPLINK_CHOICE);
      } catch {
        console.info("Unable to delete WalletConnect deep link");
      }
    },
    setActiveNamespace(e) {
      try {
        a.setItem(s.ACTIVE_NAMESPACE, e);
      } catch {
        console.info("Unable to set active namespace");
      }
    },
    setActiveCaipNetworkId(e) {
      try {
        (a.setItem(s.ACTIVE_CAIP_NETWORK_ID, e),
          o.setActiveNamespace(e.split(":")[0]));
      } catch {
        console.info("Unable to set active caip network id");
      }
    },
    getActiveCaipNetworkId() {
      try {
        return a.getItem(s.ACTIVE_CAIP_NETWORK_ID);
      } catch {
        console.info("Unable to get active caip network id");
        return;
      }
    },
    deleteActiveCaipNetworkId() {
      try {
        a.removeItem(s.ACTIVE_CAIP_NETWORK_ID);
      } catch {
        console.info("Unable to delete active caip network id");
      }
    },
    deleteConnectedConnectorId(e) {
      try {
        let t = r(e);
        a.removeItem(t);
      } catch {
        console.info("Unable to delete connected connector id");
      }
    },
    setAppKitRecent(e) {
      try {
        let t = o.getRecentWallets();
        t.find((t) => t.id === e.id) ||
          (t.unshift(e),
          t.length > 2 && t.pop(),
          a.setItem(s.RECENT_WALLETS, JSON.stringify(t)));
      } catch {
        console.info("Unable to set AppKit recent");
      }
    },
    getRecentWallets() {
      try {
        let e = a.getItem(s.RECENT_WALLETS);
        return e ? JSON.parse(e) : [];
      } catch {
        console.info("Unable to get AppKit recent");
      }
      return [];
    },
    setConnectedConnectorId(e, t) {
      try {
        let i = r(e);
        a.setItem(i, t);
      } catch {
        console.info("Unable to set Connected Connector Id");
      }
    },
    getActiveNamespace() {
      try {
        return a.getItem(s.ACTIVE_NAMESPACE);
      } catch {
        console.info("Unable to get active namespace");
      }
    },
    getConnectedConnectorId(e) {
      if (e)
        try {
          let t = r(e);
          return a.getItem(t);
        } catch (t) {
          console.info("Unable to get connected connector id in namespace ", e);
        }
    },
    setConnectedSocialProvider(e) {
      try {
        a.setItem(s.CONNECTED_SOCIAL, e);
      } catch {
        console.info("Unable to set connected social provider");
      }
    },
    getConnectedSocialProvider() {
      try {
        return a.getItem(s.CONNECTED_SOCIAL);
      } catch {
        console.info("Unable to get connected social provider");
      }
    },
    deleteConnectedSocialProvider() {
      try {
        a.removeItem(s.CONNECTED_SOCIAL);
      } catch {
        console.info("Unable to delete connected social provider");
      }
    },
    getConnectedSocialUsername() {
      try {
        return a.getItem(s.CONNECTED_SOCIAL_USERNAME);
      } catch {
        console.info("Unable to get connected social username");
      }
    },
    getStoredActiveCaipNetworkId() {
      let e = a.getItem(s.ACTIVE_CAIP_NETWORK_ID);
      return e?.split(":")?.[1];
    },
    setConnectionStatus(e) {
      try {
        a.setItem(s.CONNECTION_STATUS, e);
      } catch {
        console.info("Unable to set connection status");
      }
    },
    getConnectionStatus() {
      try {
        return a.getItem(s.CONNECTION_STATUS);
      } catch {
        return;
      }
    },
    getConnectedNamespaces() {
      try {
        let e = a.getItem(s.CONNECTED_NAMESPACES);
        if (!e?.length) return [];
        return e.split(",");
      } catch {
        return [];
      }
    },
    setConnectedNamespaces(e) {
      try {
        let t = Array.from(new Set(e));
        a.setItem(s.CONNECTED_NAMESPACES, t.join(","));
      } catch {
        console.info("Unable to set namespaces in storage");
      }
    },
    addConnectedNamespace(e) {
      try {
        let t = o.getConnectedNamespaces();
        t.includes(e) || (t.push(e), o.setConnectedNamespaces(t));
      } catch {
        console.info("Unable to add connected namespace");
      }
    },
    removeConnectedNamespace(e) {
      try {
        let t = o.getConnectedNamespaces(),
          i = t.indexOf(e);
        i > -1 && (t.splice(i, 1), o.setConnectedNamespaces(t));
      } catch {
        console.info("Unable to remove connected namespace");
      }
    },
    getTelegramSocialProvider() {
      try {
        return a.getItem(s.TELEGRAM_SOCIAL_PROVIDER);
      } catch {
        return (console.info("Unable to get telegram social provider"), null);
      }
    },
    setTelegramSocialProvider(e) {
      try {
        a.setItem(s.TELEGRAM_SOCIAL_PROVIDER, e);
      } catch {
        console.info("Unable to set telegram social provider");
      }
    },
    removeTelegramSocialProvider() {
      try {
        a.removeItem(s.TELEGRAM_SOCIAL_PROVIDER);
      } catch {
        console.info("Unable to remove telegram social provider");
      }
    },
    getBalanceCache() {
      let e = {};
      try {
        let t = a.getItem(s.PORTFOLIO_CACHE);
        e = t ? JSON.parse(t) : {};
      } catch {
        console.info("Unable to get balance cache");
      }
      return e;
    },
    removeAddressFromBalanceCache(e) {
      try {
        let t = o.getBalanceCache();
        a.setItem(s.PORTFOLIO_CACHE, JSON.stringify({ ...t, [e]: void 0 }));
      } catch {
        console.info("Unable to remove address from balance cache", e);
      }
    },
    getBalanceCacheForCaipAddress(e) {
      try {
        let t = o.getBalanceCache()[e];
        if (t && !this.isCacheExpired(t.timestamp, this.cacheExpiry.portfolio))
          return t.balance;
        o.removeAddressFromBalanceCache(e);
      } catch {
        console.info("Unable to get balance cache for address", e);
      }
    },
    updateBalanceCache(e) {
      try {
        let t = o.getBalanceCache();
        ((t[e.caipAddress] = e),
          a.setItem(s.PORTFOLIO_CACHE, JSON.stringify(t)));
      } catch {
        console.info("Unable to update balance cache", e);
      }
    },
    getNativeBalanceCache() {
      let e = {};
      try {
        let t = a.getItem(s.NATIVE_BALANCE_CACHE);
        e = t ? JSON.parse(t) : {};
      } catch {
        console.info("Unable to get balance cache");
      }
      return e;
    },
    removeAddressFromNativeBalanceCache(e) {
      try {
        let t = o.getBalanceCache();
        a.setItem(
          s.NATIVE_BALANCE_CACHE,
          JSON.stringify({ ...t, [e]: void 0 }),
        );
      } catch {
        console.info("Unable to remove address from balance cache", e);
      }
    },
    getNativeBalanceCacheForCaipAddress(e) {
      try {
        let t = o.getNativeBalanceCache()[e];
        if (
          t &&
          !this.isCacheExpired(t.timestamp, this.cacheExpiry.nativeBalance)
        )
          return t;
        (console.info("Discarding cache for address", e),
          o.removeAddressFromBalanceCache(e));
      } catch {
        console.info("Unable to get balance cache for address", e);
      }
    },
    updateNativeBalanceCache(e) {
      try {
        let t = o.getNativeBalanceCache();
        ((t[e.caipAddress] = e),
          a.setItem(s.NATIVE_BALANCE_CACHE, JSON.stringify(t)));
      } catch {
        console.info("Unable to update balance cache", e);
      }
    },
    getEnsCache() {
      let e = {};
      try {
        let t = a.getItem(s.ENS_CACHE);
        e = t ? JSON.parse(t) : {};
      } catch {
        console.info("Unable to get ens name cache");
      }
      return e;
    },
    getEnsFromCacheForAddress(e) {
      try {
        let t = o.getEnsCache()[e];
        if (t && !this.isCacheExpired(t.timestamp, this.cacheExpiry.ens))
          return t.ens;
        o.removeEnsFromCache(e);
      } catch {
        console.info("Unable to get ens name from cache", e);
      }
    },
    updateEnsCache(e) {
      try {
        let t = o.getEnsCache();
        ((t[e.address] = e), a.setItem(s.ENS_CACHE, JSON.stringify(t)));
      } catch {
        console.info("Unable to update ens name cache", e);
      }
    },
    removeEnsFromCache(e) {
      try {
        let t = o.getEnsCache();
        a.setItem(s.ENS_CACHE, JSON.stringify({ ...t, [e]: void 0 }));
      } catch {
        console.info("Unable to remove ens name from cache", e);
      }
    },
    getIdentityCache() {
      let e = {};
      try {
        let t = a.getItem(s.IDENTITY_CACHE);
        e = t ? JSON.parse(t) : {};
      } catch {
        console.info("Unable to get identity cache");
      }
      return e;
    },
    getIdentityFromCacheForAddress(e) {
      try {
        let t = o.getIdentityCache()[e];
        if (t && !this.isCacheExpired(t.timestamp, this.cacheExpiry.identity))
          return t.identity;
        o.removeIdentityFromCache(e);
      } catch {
        console.info("Unable to get identity from cache", e);
      }
    },
    updateIdentityCache(e) {
      try {
        let t = o.getIdentityCache();
        ((t[e.address] = { identity: e.identity, timestamp: e.timestamp }),
          a.setItem(s.IDENTITY_CACHE, JSON.stringify(t)));
      } catch {
        console.info("Unable to update identity cache", e);
      }
    },
    removeIdentityFromCache(e) {
      try {
        let t = o.getIdentityCache();
        a.setItem(s.IDENTITY_CACHE, JSON.stringify({ ...t, [e]: void 0 }));
      } catch {
        console.info("Unable to remove identity from cache", e);
      }
    },
    clearAddressCache() {
      try {
        (a.removeItem(s.PORTFOLIO_CACHE),
          a.removeItem(s.NATIVE_BALANCE_CACHE),
          a.removeItem(s.ENS_CACHE),
          a.removeItem(s.IDENTITY_CACHE));
      } catch {
        console.info("Unable to clear address cache");
      }
    },
  };
  e.s(["f", 0, o], 489083);
  let c = {
    isMobile() {
      return (
        !!this.isClient() &&
        !!(
          window?.matchMedia("(pointer:coarse)")?.matches ||
          /Android|webOS|iPhone|iPad|iPod|BlackBerry|Opera Mini/u.test(
            navigator.userAgent,
          )
        )
      );
    },
    checkCaipNetwork: (e, t = "") =>
      e?.caipNetworkId.toLocaleLowerCase().includes(t.toLowerCase()),
    isAndroid() {
      if (!this.isMobile()) return !1;
      let e = window?.navigator.userAgent.toLowerCase();
      return c.isMobile() && e.includes("android");
    },
    isIos() {
      if (!this.isMobile()) return !1;
      let e = window?.navigator.userAgent.toLowerCase();
      return e.includes("iphone") || e.includes("ipad");
    },
    isSafari() {
      return (
        !!this.isClient() &&
        window?.navigator.userAgent.toLowerCase().includes("safari")
      );
    },
    isClient: () => "u" > typeof window,
    isPairingExpired: (e) => !e || e - Date.now() <= i.f.TEN_SEC_MS,
    isAllowedRetry: (e, t = i.f.ONE_SEC_MS) => Date.now() - e >= t,
    copyToClopboard(e) {
      navigator.clipboard.writeText(e);
    },
    isIframe() {
      try {
        return window?.self !== window?.top;
      } catch (e) {
        return !1;
      }
    },
    getPairingExpiry: () => Date.now() + i.f.FOUR_MINUTES_MS,
    getNetworkId: (e) => e?.split(":")[1],
    getPlainAddress: (e) => e?.split(":")[2],
    wait: async (e) =>
      new Promise((t) => {
        setTimeout(t, e);
      }),
    debounce(e, t = 500) {
      let i;
      return (...s) => {
        (i && clearTimeout(i),
          (i = setTimeout(function () {
            e(...s);
          }, t)));
      };
    },
    isHttpUrl: (e) => e.startsWith("http://") || e.startsWith("https://"),
    formatNativeUrl(e, t) {
      if (c.isHttpUrl(e)) return this.formatUniversalUrl(e, t);
      let i = e;
      (i.includes("://") ||
        ((i = e.replaceAll("/", "").replaceAll(":", "")), (i = `${i}://`)),
        i.endsWith("/") || (i = `${i}/`),
        this.isTelegram() && this.isAndroid() && (t = encodeURIComponent(t)));
      let s = encodeURIComponent(t);
      return { redirect: `${i}wc?uri=${s}`, href: i };
    },
    formatUniversalUrl(e, t) {
      if (!c.isHttpUrl(e)) return this.formatNativeUrl(e, t);
      let i = e;
      i.endsWith("/") || (i = `${i}/`);
      let s = encodeURIComponent(t);
      return { redirect: `${i}wc?uri=${s}`, href: i };
    },
    getOpenTargetForPlatform(e) {
      return "popupWindow" === e
        ? e
        : this.isTelegram()
          ? o.getTelegramSocialProvider()
            ? "_top"
            : "_blank"
          : e;
    },
    openHref(e, t, i) {
      window?.open(
        e,
        this.getOpenTargetForPlatform(t),
        i || "noreferrer noopener",
      );
    },
    returnOpenHref(e, t, i) {
      return window?.open(
        e,
        this.getOpenTargetForPlatform(t),
        i || "noreferrer noopener",
      );
    },
    isTelegram: () =>
      "u" > typeof window &&
      (!!window.TelegramWebviewProxy ||
        !!window.Telegram ||
        !!window.TelegramWebviewProxyProto),
    preloadImage: async (e) =>
      Promise.race([
        new Promise((t, i) => {
          let s = new Image();
          ((s.onload = t),
            (s.onerror = i),
            (s.crossOrigin = "anonymous"),
            (s.src = e));
        }),
        c.wait(2e3),
      ]),
    formatBalance(e, t) {
      let i = "0.000";
      if ("string" == typeof e) {
        let t = Number(e);
        if (t) {
          let e = Math.floor(1e3 * t) / 1e3;
          e && (i = e.toString());
        }
      }
      return `${i}${t ? ` ${t}` : ""}`;
    },
    formatBalance2(e, t) {
      let i;
      if ("0" === e) i = "0";
      else if ("string" == typeof e) {
        let t = Number(e);
        t && (i = t.toString().match(/^-?\d+(?:\.\d{0,3})?/u)?.[0]);
      }
      return { value: i ?? "0", rest: "0" === i ? "000" : "", symbol: t };
    },
    getApiUrl: () => t.f.W3M_API_URL,
    getBlockchainApiUrl: () => t.f.BLOCKCHAIN_API_RPC_URL,
    getAnalyticsUrl: () => t.f.PULSE_API_URL,
    getUUID: () =>
      crypto?.randomUUID
        ? crypto.randomUUID()
        : "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/gu, (e) => {
            let t = (16 * Math.random()) | 0;
            return ("x" === e ? t : (3 & t) | 8).toString(16);
          }),
    parseError: (e) =>
      "string" == typeof e
        ? e
        : "string" == typeof e?.issues?.[0]?.message
          ? e.issues[0].message
          : e instanceof Error
            ? e.message
            : "Unknown error",
    sortRequestedNetworks(e, t = []) {
      let i = {};
      return (
        t &&
          e &&
          (e.forEach((e, t) => {
            i[e] = t;
          }),
          t.sort((e, t) => {
            let s = i[e.id],
              r = i[t.id];
            return void 0 !== s && void 0 !== r
              ? s - r
              : void 0 !== s
                ? -1
                : 1 * (void 0 !== r);
          })),
        t
      );
    },
    calculateBalance(e) {
      let t = 0;
      for (let i of e) t += i.value ?? 0;
      return t;
    },
    formatTokenBalance(e) {
      let [t, i] = e.toFixed(2).split(".");
      return { dollars: t, pennies: i };
    },
    isAddress(e, t = "eip155") {
      switch (t) {
        case "eip155":
          if (
            /^(?:0x)?[0-9a-f]{40}$/iu.test(e) &&
            (/^(?:0x)?[0-9a-f]{40}$/iu.test(e) ||
              /^(?:0x)?[0-9A-F]{40}$/iu.test(e))
          )
            return !0;
          return !1;
        case "solana":
          return /[1-9A-HJ-NP-Za-km-z]{32,44}$/iu.test(e);
        default:
          return !1;
      }
    },
    uniqueBy(e, t) {
      let i = new Set();
      return e.filter((e) => {
        let s = e[t];
        return !i.has(s) && (i.add(s), !0);
      });
    },
    generateSdkVersion(e, t, s) {
      let r =
        0 === e.length
          ? i.f.ADAPTER_TYPES.UNIVERSAL
          : e.map((e) => e.adapterType).join(",");
      return `${t}-${r}-${s}`;
    },
    createAccount: (e, t, i, s, r) => ({
      namespace: e,
      address: t,
      type: i,
      publicKey: s,
      path: r,
    }),
    isCaipAddress(e) {
      if ("string" != typeof e) return !1;
      let i = e.split(":"),
        s = i[0];
      return 3 === i.filter(Boolean).length && s in t.f.CHAIN_NAME_MAP;
    },
    isMac() {
      let e = window?.navigator.userAgent.toLowerCase();
      return e.includes("macintosh") && !e.includes("safari");
    },
    formatTelegramSocialLoginUrl(e) {
      let t = `--${encodeURIComponent(window?.location.href)}`,
        i = "state=";
      if ("auth.magic.link" === new URL(e).host) {
        let s = "provider_authorization_url=",
          r = e.substring(e.indexOf(s) + s.length),
          a = this.injectIntoUrl(decodeURIComponent(r), i, t);
        return e.replace(r, encodeURIComponent(a));
      }
      return this.injectIntoUrl(e, i, t);
    },
    injectIntoUrl(e, t, i) {
      let s = e.indexOf(t);
      if (-1 === s) throw Error(`${t} parameter not found in the URL: ${e}`);
      let r = e.indexOf("&", s),
        a = t.length,
        n = -1 !== r ? r : e.length;
      return (
        e.substring(0, s + a) + (e.substring(s + a, n) + i) + e.substring(r)
      );
    },
  };
  async function l(...e) {
    let t = await fetch(...e);
    if (!t.ok) throw Error(`HTTP status code: ${t.status}`, { cause: t });
    return t;
  }
  (e.s(["f", 0, c], 376744),
    e.s(
      [
        "f",
        0,
        class {
          constructor({ baseUrl: e, clientId: t }) {
            ((this.baseUrl = e), (this.clientId = t));
          }
          async get({ headers: e, signal: t, cache: i, ...s }) {
            let r = this.createUrl(s);
            return (
              await l(r, { method: "GET", headers: e, signal: t, cache: i })
            ).json();
          }
          async getBlob({ headers: e, signal: t, ...i }) {
            let s = this.createUrl(i);
            return (
              await l(s, { method: "GET", headers: e, signal: t })
            ).blob();
          }
          async post({ body: e, headers: t, signal: i, ...s }) {
            let r = this.createUrl(s);
            return (
              await l(r, {
                method: "POST",
                headers: t,
                body: e ? JSON.stringify(e) : void 0,
                signal: i,
              })
            ).json();
          }
          async put({ body: e, headers: t, signal: i, ...s }) {
            let r = this.createUrl(s);
            return (
              await l(r, {
                method: "PUT",
                headers: t,
                body: e ? JSON.stringify(e) : void 0,
                signal: i,
              })
            ).json();
          }
          async delete({ body: e, headers: t, signal: i, ...s }) {
            let r = this.createUrl(s);
            return (
              await l(r, {
                method: "DELETE",
                headers: t,
                body: e ? JSON.stringify(e) : void 0,
                signal: i,
              })
            ).json();
          }
          createUrl({ path: e, params: t }) {
            let i = new URL(e, this.baseUrl);
            return (
              t &&
                Object.entries(t).forEach(([e, t]) => {
                  t && i.searchParams.append(e, t);
                }),
              this.clientId && i.searchParams.append("clientId", this.clientId),
              i
            );
          }
        },
      ],
      683767,
    ));
};
