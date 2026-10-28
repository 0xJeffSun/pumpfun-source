// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  (e.s(["f", () => g], 656976), e.s(["f", () => d], 702353));
  var t = e.i(359702),
    i = e.i(901131),
    s = e.i(376744),
    r = e.i(683767),
    a = e.i(489083),
    n = e.i(8242),
    o = e.i(191529),
    c = e.i(789336);
  let l = {
      purchaseCurrencies: [
        {
          id: "2b92315d-eab7-5bef-84fa-089a131333f5",
          name: "USD Coin",
          symbol: "USDC",
          networks: [
            {
              name: "ethereum-mainnet",
              display_name: "Ethereum",
              chain_id: "1",
              contract_address: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
            },
            {
              name: "polygon-mainnet",
              display_name: "Polygon",
              chain_id: "137",
              contract_address: "0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174",
            },
          ],
        },
        {
          id: "2b92315d-eab7-5bef-84fa-089a131333f5",
          name: "Ether",
          symbol: "ETH",
          networks: [
            {
              name: "ethereum-mainnet",
              display_name: "Ethereum",
              chain_id: "1",
              contract_address: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
            },
            {
              name: "polygon-mainnet",
              display_name: "Polygon",
              chain_id: "137",
              contract_address: "0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174",
            },
          ],
        },
      ],
      paymentCurrencies: [
        {
          id: "USD",
          payment_method_limits: [
            { id: "card", min: "10.00", max: "7500.00" },
            { id: "ach_bank_account", min: "10.00", max: "25000.00" },
          ],
        },
        {
          id: "EUR",
          payment_method_limits: [
            { id: "card", min: "10.00", max: "7500.00" },
            { id: "ach_bank_account", min: "10.00", max: "25000.00" },
          ],
        },
      ],
    },
    h = s.f.getBlockchainApiUrl(),
    u = (0, t.s)({
      clientId: null,
      api: new r.f({ baseUrl: h, clientId: null }),
      supportedChains: { http: [], ws: [] },
    }),
    d = {
      state: u,
      async get(e) {
        let { st: t, sv: i } = d.getSdkProperties(),
          s = o.f.state.projectId,
          r = { ...(e.params || {}), st: t, sv: i, projectId: s };
        return u.api.get({ ...e, params: r });
      },
      getSdkProperties() {
        let { sdkType: e, sdkVersion: t } = o.f.state;
        return { st: e || "unknown", sv: t || "unknown" };
      },
      async isNetworkSupported(e) {
        if (!e) return !1;
        try {
          u.supportedChains.http.length || (await d.getSupportedNetworks());
        } catch (e) {
          return !1;
        }
        return u.supportedChains.http.includes(e);
      },
      async getSupportedNetworks() {
        let e = await d.get({ path: "v1/supported-chains" });
        return ((u.supportedChains = e), e);
      },
      async fetchIdentity({ address: e, caipNetworkId: t }) {
        if (!(await d.isNetworkSupported(t))) return { avatar: "", name: "" };
        let i = a.f.getIdentityFromCacheForAddress(e);
        if (i) return i;
        let r = await d.get({
          path: `/v1/identity/${e}`,
          params: {
            sender: n.f.state.activeCaipAddress
              ? s.f.getPlainAddress(n.f.state.activeCaipAddress)
              : void 0,
          },
        });
        return (
          a.f.updateIdentityCache({
            address: e,
            identity: r,
            timestamp: Date.now(),
          }),
          r
        );
      },
      fetchTransactions: async ({
        account: e,
        cursor: t,
        onramp: i,
        signal: s,
        cache: r,
        chainId: a,
      }) =>
        (await d.isNetworkSupported(n.f.state.activeCaipNetwork?.caipNetworkId))
          ? d.get({
              path: `/v1/account/${e}/history`,
              params: { cursor: t, onramp: i, chainId: a },
              signal: s,
              cache: r,
            })
          : { data: [], next: void 0 },
      fetchSwapQuote: async ({
        amount: e,
        userAddress: t,
        from: i,
        to: s,
        gasPrice: r,
      }) =>
        (await d.isNetworkSupported(n.f.state.activeCaipNetwork?.caipNetworkId))
          ? d.get({
              path: "/v1/convert/quotes",
              headers: { "Content-Type": "application/json" },
              params: {
                amount: e,
                userAddress: t,
                from: i,
                to: s,
                gasPrice: r,
              },
            })
          : { quotes: [] },
      fetchSwapTokens: async ({ chainId: e }) =>
        (await d.isNetworkSupported(n.f.state.activeCaipNetwork?.caipNetworkId))
          ? d.get({ path: "/v1/convert/tokens", params: { chainId: e } })
          : { tokens: [] },
      fetchTokenPrice: async ({ addresses: e }) =>
        (await d.isNetworkSupported(n.f.state.activeCaipNetwork?.caipNetworkId))
          ? u.api.post({
              path: "/v1/fungible/price",
              body: {
                currency: "usd",
                addresses: e,
                projectId: o.f.state.projectId,
              },
              headers: { "Content-Type": "application/json" },
            })
          : { fungibles: [] },
      fetchSwapAllowance: async ({ tokenAddress: e, userAddress: t }) =>
        (await d.isNetworkSupported(n.f.state.activeCaipNetwork?.caipNetworkId))
          ? d.get({
              path: "/v1/convert/allowance",
              params: { tokenAddress: e, userAddress: t },
              headers: { "Content-Type": "application/json" },
            })
          : { allowance: "0" },
      async fetchGasPrice({ chainId: e }) {
        let { st: t, sv: i } = d.getSdkProperties();
        if (
          !(await d.isNetworkSupported(
            n.f.state.activeCaipNetwork?.caipNetworkId,
          ))
        )
          throw Error("Network not supported for Gas Price");
        return d.get({
          path: "/v1/convert/gas-price",
          headers: { "Content-Type": "application/json" },
          params: { chainId: e, st: t, sv: i },
        });
      },
      async generateSwapCalldata({
        amount: e,
        from: t,
        to: s,
        userAddress: r,
        disableEstimate: a,
      }) {
        if (
          !(await d.isNetworkSupported(
            n.f.state.activeCaipNetwork?.caipNetworkId,
          ))
        )
          throw Error("Network not supported for Swaps");
        return u.api.post({
          path: "/v1/convert/build-transaction",
          headers: { "Content-Type": "application/json" },
          body: {
            amount: e,
            eip155: { slippage: i.f.CONVERT_SLIPPAGE_TOLERANCE },
            projectId: o.f.state.projectId,
            from: t,
            to: s,
            userAddress: r,
            disableEstimate: a,
          },
        });
      },
      async generateApproveCalldata({ from: e, to: t, userAddress: i }) {
        let { st: s, sv: r } = d.getSdkProperties();
        if (
          !(await d.isNetworkSupported(
            n.f.state.activeCaipNetwork?.caipNetworkId,
          ))
        )
          throw Error("Network not supported for Swaps");
        return d.get({
          path: "/v1/convert/build-approve",
          headers: { "Content-Type": "application/json" },
          params: { userAddress: i, from: e, to: t, st: s, sv: r },
        });
      },
      async getBalance(e, t, i) {
        let { st: s, sv: r } = d.getSdkProperties();
        if (
          !(await d.isNetworkSupported(
            n.f.state.activeCaipNetwork?.caipNetworkId,
          ))
        )
          return (c.f.showError("Token Balance Unavailable"), { balances: [] });
        let o = `${t}:${e}`,
          l = a.f.getBalanceCacheForCaipAddress(o);
        if (l) return l;
        let h = await d.get({
          path: `/v1/account/${e}/balance`,
          params: { currency: "usd", chainId: t, forceUpdate: i, st: s, sv: r },
        });
        return (
          a.f.updateBalanceCache({
            caipAddress: o,
            balance: h,
            timestamp: Date.now(),
          }),
          h
        );
      },
      lookupEnsName: async (e) =>
        (await d.isNetworkSupported(n.f.state.activeCaipNetwork?.caipNetworkId))
          ? d.get({
              path: `/v1/profile/account/${e}`,
              params: { apiVersion: "2" },
            })
          : { addresses: {}, attributes: [] },
      reverseLookupEnsName: async ({ address: e }) =>
        (await d.isNetworkSupported(n.f.state.activeCaipNetwork?.caipNetworkId))
          ? d.get({
              path: `/v1/profile/reverse/${e}`,
              params: { sender: g.state.address, apiVersion: "2" },
            })
          : [],
      getEnsNameSuggestions: async (e) =>
        (await d.isNetworkSupported(n.f.state.activeCaipNetwork?.caipNetworkId))
          ? d.get({
              path: `/v1/profile/suggestions/${e}`,
              params: { zone: "reown.id" },
            })
          : { suggestions: [] },
      registerEnsName: async ({
        coinType: e,
        address: t,
        message: i,
        signature: s,
      }) =>
        (await d.isNetworkSupported(n.f.state.activeCaipNetwork?.caipNetworkId))
          ? u.api.post({
              path: "/v1/profile/account",
              body: { coin_type: e, address: t, message: i, signature: s },
              headers: { "Content-Type": "application/json" },
            })
          : { success: !1 },
      generateOnRampURL: async ({
        destinationWallets: e,
        partnerUserId: t,
        defaultNetwork: i,
        purchaseAmount: s,
        paymentAmount: r,
      }) =>
        (await d.isNetworkSupported(n.f.state.activeCaipNetwork?.caipNetworkId))
          ? (
              await u.api.post({
                path: "/v1/generators/onrampurl",
                params: { projectId: o.f.state.projectId },
                body: {
                  destinationWallets: e,
                  defaultNetwork: i,
                  partnerUserId: t,
                  defaultExperience: "buy",
                  presetCryptoAmount: s,
                  presetFiatAmount: r,
                },
              })
            ).url
          : "",
      async getOnrampOptions() {
        if (
          !(await d.isNetworkSupported(
            n.f.state.activeCaipNetwork?.caipNetworkId,
          ))
        )
          return { paymentCurrencies: [], purchaseCurrencies: [] };
        try {
          return await d.get({ path: "/v1/onramp/options" });
        } catch (e) {
          return l;
        }
      },
      async getOnrampQuote({
        purchaseCurrency: e,
        paymentCurrency: t,
        amount: i,
        network: s,
      }) {
        try {
          if (
            !(await d.isNetworkSupported(
              n.f.state.activeCaipNetwork?.caipNetworkId,
            ))
          )
            return null;
          return await u.api.post({
            path: "/v1/onramp/quote",
            params: { projectId: o.f.state.projectId },
            body: {
              purchaseCurrency: e,
              paymentCurrency: t,
              amount: i,
              network: s,
            },
          });
        } catch (e) {
          return {
            coinbaseFee: { amount: i, currency: t.id },
            networkFee: { amount: i, currency: t.id },
            paymentSubtotal: { amount: i, currency: t.id },
            paymentTotal: { amount: i, currency: t.id },
            purchaseAmount: { amount: i, currency: t.id },
            quoteId: "mocked-quote-id",
          };
        }
      },
      getSmartSessions: async (e) =>
        (await d.isNetworkSupported(n.f.state.activeCaipNetwork?.caipNetworkId))
          ? d.get({ path: `/v1/sessions/${e}` })
          : [],
      revokeSmartSession: async (e, t, i) =>
        (await d.isNetworkSupported(n.f.state.activeCaipNetwork?.caipNetworkId))
          ? u.api.post({
              path: `/v1/sessions/${e}/revoke`,
              params: { projectId: o.f.state.projectId },
              body: { pci: t, signature: i },
            })
          : { success: !1 },
      setClientId(e) {
        ((u.clientId = e), (u.api = new r.f({ baseUrl: h, clientId: e })));
      },
    },
    p = (0, t.s)({
      currentTab: 0,
      tokenBalance: [],
      smartAccountDeployed: !1,
      addressLabels: new Map(),
      allAccounts: [],
    }),
    g = {
      state: p,
      replaceState(e) {
        e && Object.assign(p, (0, t.C)(e));
      },
      subscribe: (e) =>
        n.f.subscribeChainProp("accountState", (t) => {
          if (t) return e(t);
        }),
      subscribeKey(e, t, i) {
        let s;
        return n.f.subscribeChainProp(
          "accountState",
          (i) => {
            if (i) {
              let r = i[e];
              s !== r && ((s = r), t(r));
            }
          },
          i,
        );
      },
      setStatus(e, t) {
        n.f.setAccountProp("status", e, t);
      },
      getCaipAddress: (e) => n.f.getAccountProp("caipAddress", e),
      setCaipAddress(e, t) {
        let i = e ? s.f.getPlainAddress(e) : void 0;
        (t === n.f.state.activeChain && (n.f.state.activeCaipAddress = e),
          n.f.setAccountProp("caipAddress", e, t),
          n.f.setAccountProp("address", i, t));
      },
      setBalance(e, t, i) {
        (n.f.setAccountProp("balance", e, i),
          n.f.setAccountProp("balanceSymbol", t, i));
      },
      setProfileName(e, t) {
        n.f.setAccountProp("profileName", e, t);
      },
      setProfileImage(e, t) {
        n.f.setAccountProp("profileImage", e, t);
      },
      setUser(e, t) {
        n.f.setAccountProp("user", e, t);
      },
      setAddressExplorerUrl(e, t) {
        n.f.setAccountProp("addressExplorerUrl", e, t);
      },
      setSmartAccountDeployed(e, t) {
        n.f.setAccountProp("smartAccountDeployed", e, t);
      },
      setCurrentTab(e) {
        n.f.setAccountProp("currentTab", e, n.f.state.activeChain);
      },
      setTokenBalance(e, t) {
        e && n.f.setAccountProp("tokenBalance", e, t);
      },
      setShouldUpdateToAddress(e, t) {
        n.f.setAccountProp("shouldUpdateToAddress", e, t);
      },
      setAllAccounts(e, t) {
        n.f.setAccountProp("allAccounts", e, t);
      },
      addAddressLabel(e, t, i) {
        let s = n.f.getAccountProp("addressLabels", i) || new Map();
        (s.set(e, t), n.f.setAccountProp("addressLabels", s, i));
      },
      removeAddressLabel(e, t) {
        let i = n.f.getAccountProp("addressLabels", t) || new Map();
        (i.delete(e), n.f.setAccountProp("addressLabels", i, t));
      },
      setConnectedWalletInfo(e, t) {
        n.f.setAccountProp("connectedWalletInfo", e, t, !1);
      },
      setPreferredAccountType(e, t) {
        n.f.setAccountProp("preferredAccountType", e, t);
      },
      setSocialProvider(e, t) {
        e && n.f.setAccountProp("socialProvider", e, t);
      },
      setSocialWindow(e, i) {
        n.f.setAccountProp("socialWindow", e ? (0, t.C)(e) : void 0, i);
      },
      setFarcasterUrl(e, t) {
        n.f.setAccountProp("farcasterUrl", e, t);
      },
      async fetchTokenBalance(e) {
        p.balanceLoading = !0;
        let t = n.f.state.activeCaipNetwork?.caipNetworkId,
          r = n.f.state.activeCaipNetwork?.chainNamespace,
          a = n.f.state.activeCaipAddress,
          o = a ? s.f.getPlainAddress(a) : void 0;
        if (
          p.lastRetry &&
          !s.f.isAllowedRetry(p.lastRetry, 30 * i.f.ONE_SEC_MS)
        )
          return ((p.balanceLoading = !1), []);
        try {
          if (o && t && r) {
            let e = (await d.getBalance(o, t)).balances.filter(
              (e) => "0" !== e.quantity.decimals,
            );
            return (
              this.setTokenBalance(e, r),
              (p.lastRetry = void 0),
              (p.balanceLoading = !1),
              e
            );
          }
        } catch (t) {
          ((p.lastRetry = Date.now()),
            e?.(t),
            c.f.showError("Token Balance Unavailable"));
        } finally {
          p.balanceLoading = !1;
        }
        return [];
      },
      resetAccount(e) {
        n.f.resetAccount(e);
      },
    };
};
