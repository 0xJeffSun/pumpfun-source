// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  let t;
  (e.s(["f", () => W], 8242),
    e.s(["f", () => k], 650883),
    e.s(["f", () => N], 220752),
    e.s(["f", () => A], 778818),
    e.s(["f", () => I], 752954),
    e.s(["f", () => m], 92363),
    e.s(["f", () => x], 184580));
  var i = e.i(359702),
    s = e.i(770924),
    r = e.i(450314),
    a = e.i(259176),
    n = e.i(129086),
    o = e.i(472560),
    c = e.i(489083),
    l = e.i(603797),
    h = e.i(191529),
    u = e.i(656976),
    d = e.i(376744);
  e.i(165636);
  var p = e.i(793884),
    g = e.i(931120),
    f = e.i(789336);
  let m = {
    getSIWX: () => h.f.state.siwx,
    async initializeIfEnabled() {
      let e = h.f.state.siwx,
        t = W.getActiveCaipAddress();
      if (!(e && t)) return;
      let [i, s, r] = t.split(":");
      if (W.checkIfSupportedNetwork(i))
        try {
          if ((await e.getSessions(`${i}:${s}`, r)).length) return;
          await A.open({ view: "SIWXSignMessage" });
        } catch (e) {
          (console.error("SIWXUtil:initializeIfEnabled", e),
            g.f.sendEvent({
              type: "track",
              event: "SIWX_AUTH_ERROR",
              properties: this.getSIWXEventProperties(),
            }),
            await I._getClient()?.disconnect().catch(console.error),
            N.reset("Connect"),
            f.f.showError(
              "A problem occurred while trying initialize authentication",
            ));
        }
    },
    async requestSignMessage() {
      let e = h.f.state.siwx,
        t = d.f.getPlainAddress(W.getActiveCaipAddress()),
        i = W.getActiveCaipNetwork(),
        s = I._getClient();
      if (!e) throw Error("SIWX is not enabled");
      if (!t) throw Error("No ActiveCaipAddress found");
      if (!i) throw Error("No ActiveCaipNetwork or client found");
      if (!s) throw Error("No ConnectionController client found");
      try {
        let a = await e.createMessage({
            chainId: i.caipNetworkId,
            accountAddress: t,
          }),
          n = a.toString();
        k.getConnectorId(i.chainNamespace) === r.f.CONNECTOR_ID.AUTH &&
          N.pushTransactionStack({ view: null, goBack: !1, replace: !0 });
        let o = await s.signMessage(n);
        (await e.addSession({ data: a, message: n, signature: o }),
          A.close(),
          g.f.sendEvent({
            type: "track",
            event: "SIWX_AUTH_SUCCESS",
            properties: this.getSIWXEventProperties(),
          }));
      } catch (t) {
        let e = this.getSIWXEventProperties();
        ((A.state.open && "ApproveTransaction" !== N.state.view) ||
          (await A.open({ view: "SIWXSignMessage" })),
          e.isSmartAccount
            ? f.f.showError("This application might not support Smart Accounts")
            : f.f.showError("Signature declined"),
          g.f.sendEvent({
            type: "track",
            event: "SIWX_AUTH_ERROR",
            properties: e,
          }),
          console.error("SWIXUtil:requestSignMessage", t));
      }
    },
    async cancelSignMessage() {
      try {
        let e = this.getSIWX();
        (e?.getRequired?.() ? await I.disconnect() : A.close(),
          N.reset("Connect"),
          g.f.sendEvent({
            event: "CLICK_CANCEL_SIWX",
            type: "track",
            properties: this.getSIWXEventProperties(),
          }));
      } catch (e) {
        console.error("SIWXUtil:cancelSignMessage", e);
      }
    },
    async getSessions() {
      let e = h.f.state.siwx,
        t = d.f.getPlainAddress(W.getActiveCaipAddress()),
        i = W.getActiveCaipNetwork();
      return e && t && i ? e.getSessions(i.caipNetworkId, t) : [];
    },
    async isSIWXCloseDisabled() {
      let e = this.getSIWX();
      if (e) {
        let t = "ApproveTransaction" === N.state.view,
          i = "SIWXSignMessage" === N.state.view;
        if (t || i)
          return e.getRequired?.() && 0 === (await this.getSessions()).length;
      }
      return !1;
    },
    async universalProviderAuthenticate({
      universalProvider: e,
      chains: t,
      methods: i,
    }) {
      let s = m.getSIWX(),
        r = new Set(t.map((e) => e.split(":")[0]));
      if (!s || 1 !== r.size || !r.has("eip155")) return !1;
      let a = await s.createMessage({
          chainId: W.getActiveCaipNetwork()?.caipNetworkId || "",
          accountAddress: "",
        }),
        n = await e.authenticate({
          nonce: a.nonce,
          domain: a.domain,
          uri: a.uri,
          exp: a.expirationTime,
          iat: a.issuedAt,
          nbf: a.notBefore,
          requestId: a.requestId,
          version: a.version,
          resources: a.resources,
          statement: a.statement,
          chainId: a.chainId,
          methods: i,
          chains: [a.chainId, ...t.filter((e) => e !== a.chainId)],
        });
      if (
        (f.f.showLoading("Authenticating...", { autoClose: !1 }),
        u.f.setConnectedWalletInfo(
          {
            ...n.session.peer.metadata,
            name: n.session.peer.metadata.name,
            icon: n.session.peer.metadata.icons?.[0],
            type: "WALLET_CONNECT",
          },
          Array.from(r)[0],
        ),
        n?.auths?.length)
      ) {
        let t = n.auths.map((t) => {
          let i = e.client.formatAuthMessage({ request: t.p, iss: t.p.iss });
          return {
            data: {
              ...t.p,
              accountAddress: t.p.iss.split(":").slice(-1).join(""),
              chainId: t.p.iss.split(":").slice(2, 4).join(":"),
              uri: t.p.aud,
              version: t.p.version || a.version,
              expirationTime: t.p.exp,
              issuedAt: t.p.iat,
              notBefore: t.p.nbf,
            },
            message: i,
            signature: t.s.s,
            cacao: t,
          };
        });
        try {
          (await s.setSessions(t),
            g.f.sendEvent({
              type: "track",
              event: "SIWX_AUTH_SUCCESS",
              properties: m.getSIWXEventProperties(),
            }));
        } catch (t) {
          throw (
            console.error(
              "SIWX:universalProviderAuth - failed to set sessions",
              t,
            ),
            g.f.sendEvent({
              type: "track",
              event: "SIWX_AUTH_ERROR",
              properties: m.getSIWXEventProperties(),
            }),
            await e.disconnect().catch(console.error),
            t
          );
        } finally {
          f.f.hide();
        }
      }
      return !0;
    },
    getSIWXEventProperties: () => ({
      network: W.state.activeCaipNetwork?.caipNetworkId || "",
      isSmartAccount:
        u.f.state.preferredAccountType === p.f.ACCOUNT_TYPES.SMART_ACCOUNT,
    }),
    async clearSessions() {
      let e = this.getSIWX();
      e && (await e.setSessions([]));
    },
  };
  var w = e.i(702353);
  let y = (0, i.s)({
      transactions: [],
      coinbaseTransactions: {},
      transactionsByYear: {},
      lastNetworkInView: void 0,
      loading: !1,
      empty: !1,
      next: void 0,
    }),
    b = {
      state: y,
      subscribe: (e) => (0, i.i)(y, () => e(y)),
      setLastNetworkInView(e) {
        y.lastNetworkInView = e;
      },
      async fetchTransactions(e, t) {
        if (!e)
          throw Error(
            "Transactions can't be fetched without an accountAddress",
          );
        y.loading = !0;
        try {
          let i = await w.f.fetchTransactions({
              account: e,
              cursor: y.next,
              onramp: t,
              cache: "coinbase" === t ? "no-cache" : void 0,
              chainId: W.state.activeCaipNetwork?.caipNetworkId,
            }),
            s = this.filterSpamTransactions(i.data),
            r = this.filterByConnectedChain(s),
            a = [...y.transactions, ...r];
          ((y.loading = !1),
            "coinbase" === t
              ? (y.coinbaseTransactions = this.groupTransactionsByYearAndMonth(
                  y.coinbaseTransactions,
                  i.data,
                ))
              : ((y.transactions = a),
                (y.transactionsByYear = this.groupTransactionsByYearAndMonth(
                  y.transactionsByYear,
                  r,
                ))),
            (y.empty = 0 === a.length),
            (y.next = i.next ? i.next : void 0));
        } catch (t) {
          (g.f.sendEvent({
            type: "track",
            event: "ERROR_FETCH_TRANSACTIONS",
            properties: {
              address: e,
              projectId: h.f.state.projectId,
              cursor: y.next,
              isSmartAccount:
                u.f.state.preferredAccountType ===
                p.f.ACCOUNT_TYPES.SMART_ACCOUNT,
            },
          }),
            f.f.showError("Failed to fetch transactions"),
            (y.loading = !1),
            (y.empty = !0),
            (y.next = void 0));
        }
      },
      groupTransactionsByYearAndMonth: (e = {}, t = []) => (
        t.forEach((t) => {
          let i = new Date(t.metadata.minedAt).getFullYear(),
            s = new Date(t.metadata.minedAt).getMonth(),
            r = e[i] ?? {},
            a = (r[s] ?? []).filter((e) => e.id !== t.id);
          e[i] = {
            ...r,
            [s]: [...a, t].sort(
              (e, t) =>
                new Date(t.metadata.minedAt).getTime() -
                new Date(e.metadata.minedAt).getTime(),
            ),
          };
        }),
        e
      ),
      filterSpamTransactions: (e) =>
        e.filter(
          (e) => !e.transfers.every((e) => e.nft_info?.flags.is_spam === !0),
        ),
      filterByConnectedChain(e) {
        let t = W.state.activeCaipNetwork?.caipNetworkId;
        return e.filter((e) => e.metadata.chain === t);
      },
      clearCursor() {
        y.next = void 0;
      },
      resetTransactions() {
        ((y.transactions = []),
          (y.transactionsByYear = {}),
          (y.lastNetworkInView = void 0),
          (y.loading = !1),
          (y.empty = !1),
          (y.next = void 0));
      },
    },
    v = (0, i.s)({ wcError: !1, buffering: !1, status: "disconnected" }),
    I = {
      state: v,
      subscribeKey: (e, t) => (0, s.T)(v, e, t),
      _getClient: () => v._client,
      setClient(e) {
        v._client = (0, i.C)(e);
      },
      async connectWalletConnect() {
        if (d.f.isTelegram() || (d.f.isSafari() && d.f.isIos())) {
          if (t) {
            (await t, (t = void 0));
            return;
          }
          if (!d.f.isPairingExpired(v?.wcPairingExpiry)) {
            let e = v.wcUri;
            v.wcUri = e;
            return;
          }
          ((t = this._getClient()
            ?.connectWalletConnect?.()
            .catch(() => void 0)),
            (this.state.status = "connecting"),
            await t,
            (t = void 0),
            (v.wcPairingExpiry = void 0),
            (this.state.status = "connected"));
        } else await this._getClient()?.connectWalletConnect?.();
      },
      async connectExternal(e, t, i = !0) {
        (await this._getClient()?.connectExternal?.(e),
          i && W.setActiveNamespace(t));
      },
      async reconnectExternal(e) {
        await this._getClient()?.reconnectExternal?.(e);
        let t = e.chain || W.state.activeChain;
        t && k.setConnectorId(e.id, t);
      },
      async setPreferredAccountType(e) {
        A.setLoading(!0, W.state.activeChain);
        let t = k.getAuthConnector();
        t &&
          (await t?.provider.setPreferredAccount(e),
          await this.reconnectExternal(t),
          A.setLoading(!1, W.state.activeChain),
          g.f.sendEvent({
            type: "track",
            event: "SET_PREFERRED_ACCOUNT_TYPE",
            properties: {
              accountType: e,
              network: W.state.activeCaipNetwork?.caipNetworkId || "",
            },
          }));
      },
      async signMessage(e) {
        return this._getClient()?.signMessage(e);
      },
      parseUnits(e, t) {
        return this._getClient()?.parseUnits(e, t);
      },
      formatUnits(e, t) {
        return this._getClient()?.formatUnits(e, t);
      },
      async sendTransaction(e) {
        return this._getClient()?.sendTransaction(e);
      },
      async getCapabilities(e) {
        return this._getClient()?.getCapabilities(e);
      },
      async grantPermissions(e) {
        return this._getClient()?.grantPermissions(e);
      },
      async walletGetAssets(e) {
        return this._getClient()?.walletGetAssets(e) ?? {};
      },
      async estimateGas(e) {
        return this._getClient()?.estimateGas(e);
      },
      async writeContract(e) {
        return this._getClient()?.writeContract(e);
      },
      async getEnsAddress(e) {
        return this._getClient()?.getEnsAddress(e);
      },
      async getEnsAvatar(e) {
        return this._getClient()?.getEnsAvatar(e);
      },
      checkInstalled(e) {
        return this._getClient()?.checkInstalled?.(e) || !1;
      },
      resetWcConnection() {
        ((v.wcUri = void 0),
          (v.wcPairingExpiry = void 0),
          (v.wcLinking = void 0),
          (v.recentWallet = void 0),
          (v.status = "disconnected"),
          b.resetTransactions(),
          c.f.deleteWalletConnectDeepLink());
      },
      resetUri() {
        ((v.wcUri = void 0), (v.wcPairingExpiry = void 0));
      },
      finalizeWcConnection() {
        let { wcLinking: e, recentWallet: t } = I.state;
        (e && c.f.setWalletConnectDeepLink(e),
          t && c.f.setAppKitRecent(t),
          g.f.sendEvent({
            type: "track",
            event: "CONNECT_SUCCESS",
            properties: {
              method: e ? "mobile" : "qrcode",
              name: N.state.data?.wallet?.name || "Unknown",
            },
          }));
      },
      setWcBasic(e) {
        v.wcBasic = e;
      },
      setUri(e) {
        ((v.wcUri = e), (v.wcPairingExpiry = d.f.getPairingExpiry()));
      },
      setWcLinking(e) {
        v.wcLinking = e;
      },
      setWcError(e) {
        ((v.wcError = e), (v.buffering = !1));
      },
      setRecentWallet(e) {
        v.recentWallet = e;
      },
      setBuffering(e) {
        v.buffering = e;
      },
      setStatus(e) {
        v.status = e;
      },
      async disconnect(e) {
        try {
          (A.setLoading(!0, e),
            await m.clearSessions(),
            await W.disconnect(e),
            A.setLoading(!1, e),
            k.setFilterByNamespace(void 0));
        } catch (e) {
          throw Error("Failed to disconnect");
        }
      },
    },
    E = (0, i.s)({
      loading: !1,
      open: !1,
      selectedNetworkId: void 0,
      activeChain: void 0,
      initialized: !1,
    }),
    C = {
      state: E,
      subscribe: (e) => (0, i.i)(E, () => e(E)),
      set(e) {
        Object.assign(E, { ...E, ...e });
      },
    };
  e.s(["f", 0, C], 147670);
  let S = (0, i.s)({
      loading: !1,
      loadingNamespaceMap: new Map(),
      open: !1,
      shake: !1,
      namespace: void 0,
    }),
    A = {
      state: S,
      subscribe: (e) => (0, i.i)(S, () => e(S)),
      subscribeKey: (e, t) => (0, s.T)(S, e, t),
      async open(e) {
        let t = "connected" === u.f.state.status;
        (I.state.wcBasic
          ? l.f.prefetch({ fetchNetworkImages: !1, fetchConnectorImages: !1 })
          : await l.f.prefetch({
              fetchConnectorImages: !t,
              fetchFeaturedWallets: !t,
              fetchRecommendedWallets: !t,
            }),
          e?.namespace
            ? (await W.switchActiveNamespace(e.namespace),
              A.setLoading(!0, e.namespace))
            : A.setLoading(!0),
          k.setFilterByNamespace(e?.namespace));
        let i = W.getAccountData(e?.namespace)?.caipAddress;
        (W.state.noAdapters && !i
          ? d.f.isMobile()
            ? N.reset("AllWallets")
            : N.reset("ConnectingWalletConnectBasic")
          : e?.view
            ? N.reset(e.view)
            : i
              ? N.reset("Account")
              : N.reset("Connect"),
          (S.open = !0),
          C.set({ open: !0 }),
          g.f.sendEvent({
            type: "track",
            event: "MODAL_OPEN",
            properties: { connected: !!i },
          }));
      },
      close() {
        let e = h.f.state.enableEmbedded,
          t = !!W.state.activeCaipAddress;
        (S.open &&
          g.f.sendEvent({
            type: "track",
            event: "MODAL_CLOSE",
            properties: { connected: t },
          }),
          (S.open = !1),
          A.clearLoading(),
          e
            ? t
              ? N.replace("Account")
              : N.push("Connect")
            : C.set({ open: !1 }),
          I.resetUri());
      },
      setLoading(e, t) {
        (t && S.loadingNamespaceMap.set(t, e),
          (S.loading = e),
          C.set({ loading: e }));
      },
      clearLoading() {
        (S.loadingNamespaceMap.clear(), (S.loading = !1));
      },
      shake() {
        S.shake ||
          ((S.shake = !0),
          setTimeout(() => {
            S.shake = !1;
          }, 500));
      },
    },
    P = (0, i.s)({
      view: "Connect",
      history: ["Connect"],
      transactionStack: [],
    }),
    N = {
      state: P,
      subscribeKey: (e, t) => (0, s.T)(P, e, t),
      pushTransactionStack(e) {
        P.transactionStack.push(e);
      },
      popTransactionStack(e) {
        let t = P.transactionStack.pop();
        if (t)
          if (e) (this.goBack(), t?.onCancel?.());
          else {
            if (t.goBack) this.goBack();
            else if (t.replace) {
              let e = P.history.indexOf("ConnectingSiwe");
              e > 0 ? this.goBackToIndex(e - 1) : (A.close(), (P.history = []));
            } else t.view && this.reset(t.view);
            t?.onSuccess?.();
          }
      },
      push(e, t) {
        e !== P.view && ((P.view = e), P.history.push(e), (P.data = t));
      },
      reset(e, t) {
        ((P.view = e), (P.history = [e]), (P.data = t));
      },
      replace(e, t) {
        P.history.at(-1) !== e &&
          ((P.view = e), (P.history[P.history.length - 1] = e), (P.data = t));
      },
      goBack() {
        let e =
          !W.state.activeCaipAddress &&
          "ConnectingFarcaster" === this.state.view;
        if (P.history.length > 1 && !P.history.includes("UnsupportedChain")) {
          P.history.pop();
          let [e] = P.history.slice(-1);
          e && (P.view = e);
        } else A.close();
        (P.data?.wallet && (P.data.wallet = void 0),
          setTimeout(() => {
            if (e) {
              u.f.setFarcasterUrl(void 0, W.state.activeChain);
              let e = k.getAuthConnector();
              e?.provider?.reload();
              let t = (0, i.D)(h.f.state);
              e?.provider?.syncDappData?.({
                metadata: t.metadata,
                sdkVersion: t.sdkVersion,
                projectId: t.projectId,
                sdkType: t.sdkType,
              });
            }
          }, 100));
      },
      goBackToIndex(e) {
        if (P.history.length > 1) {
          P.history = P.history.slice(0, e + 1);
          let [t] = P.history.slice(-1);
          t && (P.view = t);
        }
      },
    },
    _ = (0, i.s)({
      themeMode: "dark",
      themeVariables: {},
      w3mThemeVariables: void 0,
    }),
    x = {
      state: _,
      subscribe: (e) => (0, i.i)(_, () => e(_)),
      setThemeMode(e) {
        _.themeMode = e;
        try {
          let t = k.getAuthConnector();
          if (t) {
            let i = x.getSnapshot().themeVariables;
            t.provider.syncTheme({
              themeMode: e,
              themeVariables: i,
              w3mThemeVariables: (0, n.f)(i, e),
            });
          }
        } catch {
          console.info("Unable to sync theme to auth connector");
        }
      },
      setThemeVariables(e) {
        _.themeVariables = { ..._.themeVariables, ...e };
        try {
          let e = k.getAuthConnector();
          if (e) {
            let t = x.getSnapshot().themeVariables;
            e.provider.syncTheme({
              themeVariables: t,
              w3mThemeVariables: (0, n.f)(_.themeVariables, _.themeMode),
            });
          }
        } catch {
          console.info("Unable to sync theme to auth connector");
        }
      },
      getSnapshot: () => (0, i.D)(_),
    },
    O = { eip155: void 0, solana: void 0, polkadot: void 0, bip122: void 0 },
    T = (0, i.s)({
      allConnectors: [],
      connectors: [],
      activeConnector: void 0,
      filterByNamespace: void 0,
      activeConnectorIds: { ...O },
    }),
    k = {
      state: T,
      subscribe: (e) =>
        (0, i.i)(T, () => {
          e(T);
        }),
      subscribeKey: (e, t) => (0, s.T)(T, e, t),
      initialize(e) {
        e.forEach((e) => {
          let t = c.f.getConnectedConnectorId(e);
          t && this.setConnectorId(t, e);
        });
      },
      setActiveConnector(e) {
        e && (T.activeConnector = (0, i.C)(e));
      },
      setConnectors(e) {
        (e
          .filter(
            (e) =>
              !T.allConnectors.some(
                (t) =>
                  t.id === e.id &&
                  this.getConnectorName(t.name) ===
                    this.getConnectorName(e.name) &&
                  t.chain === e.chain,
              ),
          )
          .forEach((e) => {
            "MULTI_CHAIN" !== e.type && T.allConnectors.push((0, i.C)(e));
          }),
          (T.connectors = this.mergeMultiChainConnectors(T.allConnectors)));
      },
      removeAdapter(e) {
        ((T.allConnectors = T.allConnectors.filter((t) => t.chain !== e)),
          (T.connectors = this.mergeMultiChainConnectors(T.allConnectors)));
      },
      mergeMultiChainConnectors(e) {
        let t = this.generateConnectorMapByName(e),
          i = [];
        return (
          t.forEach((e) => {
            let t = e[0],
              s = t?.id === r.f.CONNECTOR_ID.AUTH;
            e.length > 1 && t
              ? i.push({
                  name: t.name,
                  imageUrl: t.imageUrl,
                  imageId: t.imageId,
                  connectors: [...e],
                  type: s ? "AUTH" : "MULTI_CHAIN",
                  chain: "eip155",
                  id: t?.id || "",
                })
              : t && i.push(t);
          }),
          i
        );
      },
      generateConnectorMapByName(e) {
        let t = new Map();
        return (
          e.forEach((e) => {
            let { name: i } = e,
              s = this.getConnectorName(i);
            if (!s) return;
            let r = t.get(s) || [];
            (r.find((t) => t.chain === e.chain) || r.push(e), t.set(s, r));
          }),
          t
        );
      },
      getConnectorName: (e) => (e && { "Trust Wallet": "Trust" }[e]) || e,
      getUniqueConnectorsByName(e) {
        let t = [];
        return (
          e.forEach((e) => {
            t.find((t) => t.chain === e.chain) || t.push(e);
          }),
          t
        );
      },
      addConnector(e) {
        if (e.id === r.f.CONNECTOR_ID.AUTH) {
          let t = (0, i.D)(h.f.state),
            s = x.getSnapshot().themeMode,
            r = x.getSnapshot().themeVariables;
          (e?.provider?.syncDappData?.({
            metadata: t.metadata,
            sdkVersion: t.sdkVersion,
            projectId: t.projectId,
            sdkType: t.sdkType,
          }),
            e?.provider?.syncTheme({
              themeMode: s,
              themeVariables: r,
              w3mThemeVariables: (0, n.f)(r, s),
            }),
            this.setConnectors([e]));
        } else this.setConnectors([e]);
      },
      getAuthConnector(e) {
        let t = e || W.state.activeChain,
          i = T.connectors.find((e) => e.id === r.f.CONNECTOR_ID.AUTH);
        if (i)
          return i?.connectors?.length
            ? i.connectors.find((e) => e.chain === t)
            : i;
      },
      getAnnouncedConnectorRdns: () =>
        T.connectors
          .filter((e) => "ANNOUNCED" === e.type)
          .map((e) => e.info?.rdns),
      getConnectorById: (e) => T.allConnectors.find((t) => t.id === e),
      getConnector: (e, t) =>
        T.allConnectors
          .filter((e) => e.chain === W.state.activeChain)
          .find((i) => i.explorerId === e || i.info?.rdns === t),
      syncIfAuthConnector(e) {
        if ("ID_AUTH" !== e.id) return;
        let t = (0, i.D)(h.f.state),
          s = x.getSnapshot().themeMode,
          r = x.getSnapshot().themeVariables;
        (e?.provider?.syncDappData?.({
          metadata: t.metadata,
          sdkVersion: t.sdkVersion,
          sdkType: t.sdkType,
          projectId: t.projectId,
        }),
          e.provider.syncTheme({
            themeMode: s,
            themeVariables: r,
            w3mThemeVariables: (0, n.f)(r, s),
          }));
      },
      getConnectorsByNamespace(e) {
        let t = T.allConnectors.filter((t) => t.chain === e);
        return this.mergeMultiChainConnectors(t);
      },
      selectWalletConnector(e) {
        let t = k.getConnector(e.id, e.rdns);
        (W.state.activeChain === r.f.CHAIN.SOLANA &&
          o.f.handleSolanaDeeplinkRedirect(t?.name || e.name || ""),
          t
            ? N.push("ConnectingExternal", { connector: t })
            : N.push("ConnectingWalletConnect", { wallet: e }));
      },
      getConnectors(e) {
        return e
          ? this.getConnectorsByNamespace(e)
          : this.mergeMultiChainConnectors(T.allConnectors);
      },
      setFilterByNamespace(e) {
        ((T.filterByNamespace = e),
          (T.connectors = this.getConnectors(e)),
          l.f.setFilterByNamespace(e));
      },
      setConnectorId(e, t) {
        e &&
          ((T.activeConnectorIds = { ...T.activeConnectorIds, [t]: e }),
          c.f.setConnectedConnectorId(t, e));
      },
      removeConnectorId(e) {
        ((T.activeConnectorIds = { ...T.activeConnectorIds, [e]: void 0 }),
          c.f.deleteConnectedConnectorId(e));
      },
      getConnectorId(e) {
        if (e) return T.activeConnectorIds[e];
      },
      isConnected: (e) =>
        e
          ? !!T.activeConnectorIds[e]
          : Object.values(T.activeConnectorIds).some((e) => !!e),
      resetConnectorIds() {
        T.activeConnectorIds = { ...O };
      },
    };
  function R(e, t) {
    return k.getConnectorId(e) === t;
  }
  var U = e.i(901131),
    D = e.i(173729);
  let L = {
      bigNumber: (e) => new D.f(e ? e : 0),
      multiply(e, t) {
        if (void 0 === e || void 0 === t) return new D.f(0);
        let i = new D.f(e),
          s = new D.f(t);
        return i.times(s);
      },
      formatNumberToLocalString: (e, t = 2) =>
        void 0 === e
          ? "0.00"
          : "number" == typeof e
            ? e.toLocaleString("en-US", {
                maximumFractionDigits: t,
                minimumFractionDigits: t,
              })
            : parseFloat(e).toLocaleString("en-US", {
                maximumFractionDigits: t,
                minimumFractionDigits: t,
              }),
      parseLocalStringToNumber: (e) =>
        void 0 === e ? 0 : parseFloat(e.replace(/,/gu, "")),
    },
    j = [
      {
        type: "function",
        name: "transfer",
        stateMutability: "nonpayable",
        inputs: [
          { name: "_to", type: "address" },
          { name: "_value", type: "uint256" },
        ],
        outputs: [{ name: "", type: "bool" }],
      },
      {
        type: "function",
        name: "transferFrom",
        stateMutability: "nonpayable",
        inputs: [
          { name: "_from", type: "address" },
          { name: "_to", type: "address" },
          { name: "_value", type: "uint256" },
        ],
        outputs: [{ name: "", type: "bool" }],
      },
    ],
    $ = [
      {
        type: "function",
        name: "transfer",
        stateMutability: "nonpayable",
        inputs: [
          { name: "recipient", type: "address" },
          { name: "amount", type: "uint256" },
        ],
        outputs: [],
      },
      {
        type: "function",
        name: "transferFrom",
        stateMutability: "nonpayable",
        inputs: [
          { name: "sender", type: "address" },
          { name: "recipient", type: "address" },
          { name: "amount", type: "uint256" },
        ],
        outputs: [{ name: "", type: "bool" }],
      },
    ];
  var M = e.i(263965);
  let q = {
      createBalance(e, t) {
        let i = {
          name: e.metadata.name || "",
          symbol: e.metadata.symbol || "",
          decimals: e.metadata.decimals || 0,
          value: e.metadata.value || 0,
          price: e.metadata.price || 0,
          iconUrl: e.metadata.iconUrl || "",
        };
        return {
          name: i.name,
          symbol: i.symbol,
          chainId: t,
          address:
            "native" === e.address
              ? void 0
              : this.convertAddressToCAIP10Address(e.address, t),
          value: i.value,
          price: i.price,
          quantity: {
            decimals: i.decimals.toString(),
            numeric: this.convertHexToBalance({
              hex: e.balance,
              decimals: i.decimals,
            }),
          },
          iconUrl: i.iconUrl,
        };
      },
      convertHexToBalance: ({ hex: e, decimals: t }) => (0, M.f)(BigInt(e), t),
      convertAddressToCAIP10Address: (e, t) => `${t}:${e}`,
      createCAIP2ChainId: (e, t) => `${t}:${parseInt(e, 16)}`,
      getChainIdHexFromCAIP2ChainId(e) {
        let t = e.split(":");
        if (t.length < 2 || !t[1]) return "0x0";
        let i = parseInt(t[1], 10);
        return isNaN(i) ? "0x0" : `0x${i.toString(16)}`;
      },
      isWalletGetAssetsResponse(e) {
        return (
          "object" == typeof e &&
          null !== e &&
          Object.values(e).every(
            (e) => Array.isArray(e) && e.every((e) => this.isValidAsset(e)),
          )
        );
      },
      isValidAsset: (e) =>
        "object" == typeof e &&
        null !== e &&
        "string" == typeof e.address &&
        "string" == typeof e.balance &&
        ("ERC20" === e.type || "NATIVE" === e.type) &&
        "object" == typeof e.metadata &&
        null !== e.metadata &&
        "string" == typeof e.metadata.name &&
        "string" == typeof e.metadata.symbol &&
        "number" == typeof e.metadata.decimals &&
        "number" == typeof e.metadata.price &&
        "string" == typeof e.metadata.iconUrl,
    },
    B = {
      async getMyTokensWithBalance(e) {
        let t = u.f.state.address,
          i = W.state.activeCaipNetwork;
        if (!t || !i) return [];
        if ("eip155" === i.chainNamespace) {
          let e = await this.getEIP155Balances(t, i);
          if (e) return this.filterLowQualityTokens(e);
        }
        let s = await w.f.getBalance(t, i.caipNetworkId, e);
        return this.filterLowQualityTokens(s.balances);
      },
      async getEIP155Balances(e, t) {
        try {
          let i = q.getChainIdHexFromCAIP2ChainId(t.caipNetworkId),
            s = await I.getCapabilities(e);
          if (!s?.[i]?.assetDiscovery?.supported) return null;
          let r = await I.walletGetAssets({ account: e, chainFilter: [i] });
          if (!q.isWalletGetAssetsResponse(r)) return null;
          return (r[i] || []).map((e) => q.createBalance(e, t.caipNetworkId));
        } catch (e) {
          return null;
        }
      },
      filterLowQualityTokens: (e) =>
        e.filter((e) => "0" !== e.quantity.decimals),
      mapBalancesToSwapTokens: (e) =>
        e?.map((e) => ({
          ...e,
          address: e?.address ? e.address : W.getActiveNetworkTokenAddress(),
          decimals: parseInt(e.quantity.decimals, 10),
          logoUri: e.iconUrl,
          eip2612: !1,
        })) || [],
    },
    z = (0, i.s)({ tokenBalances: [], loading: !1 }),
    H = {
      state: z,
      subscribe: (e) => (0, i.i)(z, () => e(z)),
      subscribeKey: (e, t) => (0, s.T)(z, e, t),
      setToken(e) {
        e && (z.token = (0, i.C)(e));
      },
      setTokenAmount(e) {
        z.sendTokenAmount = e;
      },
      setReceiverAddress(e) {
        z.receiverAddress = e;
      },
      setReceiverProfileImageUrl(e) {
        z.receiverProfileImageUrl = e;
      },
      setReceiverProfileName(e) {
        z.receiverProfileName = e;
      },
      setGasPrice(e) {
        z.gasPrice = e;
      },
      setGasPriceInUsd(e) {
        z.gasPriceInUSD = e;
      },
      setNetworkBalanceInUsd(e) {
        z.networkBalanceInUSD = e;
      },
      setLoading(e) {
        z.loading = e;
      },
      sendToken() {
        switch (W.state.activeCaipNetwork?.chainNamespace) {
          case "eip155":
            this.sendEvmToken();
            return;
          case "solana":
            this.sendSolanaToken();
            return;
          default:
            throw Error("Unsupported chain");
        }
      },
      sendEvmToken() {
        this.state.token?.address &&
        this.state.sendTokenAmount &&
        this.state.receiverAddress
          ? (g.f.sendEvent({
              type: "track",
              event: "SEND_INITIATED",
              properties: {
                isSmartAccount:
                  u.f.state.preferredAccountType ===
                  p.f.ACCOUNT_TYPES.SMART_ACCOUNT,
                token: this.state.token.address,
                amount: this.state.sendTokenAmount,
                network: W.state.activeCaipNetwork?.caipNetworkId || "",
              },
            }),
            this.sendERC20Token({
              receiverAddress: this.state.receiverAddress,
              tokenAddress: this.state.token.address,
              sendTokenAmount: this.state.sendTokenAmount,
              decimals: this.state.token.quantity.decimals,
            }))
          : this.state.receiverAddress &&
            this.state.sendTokenAmount &&
            this.state.gasPrice &&
            this.state.token?.quantity.decimals &&
            (g.f.sendEvent({
              type: "track",
              event: "SEND_INITIATED",
              properties: {
                isSmartAccount:
                  u.f.state.preferredAccountType ===
                  p.f.ACCOUNT_TYPES.SMART_ACCOUNT,
                token: this.state.token?.symbol,
                amount: this.state.sendTokenAmount,
                network: W.state.activeCaipNetwork?.caipNetworkId || "",
              },
            }),
            this.sendNativeToken({
              receiverAddress: this.state.receiverAddress,
              sendTokenAmount: this.state.sendTokenAmount,
              gasPrice: this.state.gasPrice,
              decimals: this.state.token.quantity.decimals,
            }));
      },
      async fetchTokenBalance(e) {
        z.loading = !0;
        let t = W.state.activeCaipNetwork?.caipNetworkId,
          i = W.state.activeCaipNetwork?.chainNamespace,
          s = W.state.activeCaipAddress,
          r = s ? d.f.getPlainAddress(s) : void 0;
        if (
          z.lastRetry &&
          !d.f.isAllowedRetry(z.lastRetry, 30 * U.f.ONE_SEC_MS)
        )
          return ((z.loading = !1), []);
        try {
          if (r && t && i) {
            let e = await B.getMyTokensWithBalance();
            return ((z.tokenBalances = e), (z.lastRetry = void 0), e);
          }
        } catch (t) {
          ((z.lastRetry = Date.now()),
            e?.(t),
            f.f.showError("Token Balance Unavailable"));
        } finally {
          z.loading = !1;
        }
        return [];
      },
      fetchNetworkBalance() {
        if (0 === z.tokenBalances.length) return;
        let e = B.mapBalancesToSwapTokens(z.tokenBalances);
        if (!e) return;
        let t = e.find((e) => e.address === W.getActiveNetworkTokenAddress());
        t &&
          (z.networkBalanceInUSD = t
            ? L.multiply(t.quantity.numeric, t.price).toString()
            : "0");
      },
      isInsufficientNetworkTokenForGas: (e, t) =>
        !!L.bigNumber(e).eq(0) || L.bigNumber(L.bigNumber(t || "0")).gt(e),
      hasInsufficientGasFunds() {
        let e = !0;
        return (
          u.f.state.preferredAccountType === p.f.ACCOUNT_TYPES.SMART_ACCOUNT
            ? (e = !1)
            : z.networkBalanceInUSD &&
              (e = this.isInsufficientNetworkTokenForGas(
                z.networkBalanceInUSD,
                z.gasPriceInUSD,
              )),
          e
        );
      },
      async sendNativeToken(e) {
        N.pushTransactionStack({ view: "Account", goBack: !1 });
        let t = e.receiverAddress,
          i = u.f.state.address,
          s = I.parseUnits(e.sendTokenAmount.toString(), Number(e.decimals));
        try {
          (await I.sendTransaction({
            chainNamespace: "eip155",
            to: t,
            address: i,
            data: "0x",
            value: s ?? BigInt(0),
            gasPrice: e.gasPrice,
          }),
            f.f.showSuccess("Transaction started"),
            g.f.sendEvent({
              type: "track",
              event: "SEND_SUCCESS",
              properties: {
                isSmartAccount:
                  u.f.state.preferredAccountType ===
                  p.f.ACCOUNT_TYPES.SMART_ACCOUNT,
                token: this.state.token?.symbol || "",
                amount: e.sendTokenAmount,
                network: W.state.activeCaipNetwork?.caipNetworkId || "",
              },
            }),
            this.resetSend());
        } catch (i) {
          console.error(
            "SendController:sendERC20Token - failed to send native token",
            i,
          );
          let t = i instanceof Error ? i.message : "Unknown error";
          (g.f.sendEvent({
            type: "track",
            event: "SEND_ERROR",
            properties: {
              message: t,
              isSmartAccount:
                u.f.state.preferredAccountType ===
                p.f.ACCOUNT_TYPES.SMART_ACCOUNT,
              token: this.state.token?.symbol || "",
              amount: e.sendTokenAmount,
              network: W.state.activeCaipNetwork?.caipNetworkId || "",
            },
          }),
            f.f.showError("Something went wrong"));
        }
      },
      async sendERC20Token(e) {
        N.pushTransactionStack({ view: "Account", goBack: !1 });
        let t = I.parseUnits(e.sendTokenAmount.toString(), Number(e.decimals));
        try {
          if (
            u.f.state.address &&
            e.sendTokenAmount &&
            e.receiverAddress &&
            e.tokenAddress
          ) {
            let i,
              s = d.f.getPlainAddress(e.tokenAddress);
            (await I.writeContract({
              fromAddress: u.f.state.address,
              tokenAddress: s,
              args: [e.receiverAddress, t ?? BigInt(0)],
              method: "transfer",
              abi: ((i = s), r.f.USDT_CONTRACT_ADDRESSES.includes(i) ? $ : j),
              chainNamespace: "eip155",
            }),
              f.f.showSuccess("Transaction started"),
              this.resetSend());
          }
        } catch (i) {
          console.error(
            "SendController:sendERC20Token - failed to send erc20 token",
            i,
          );
          let t = i instanceof Error ? i.message : "Unknown error";
          (g.f.sendEvent({
            type: "track",
            event: "SEND_ERROR",
            properties: {
              message: t,
              isSmartAccount:
                u.f.state.preferredAccountType ===
                p.f.ACCOUNT_TYPES.SMART_ACCOUNT,
              token: this.state.token?.symbol || "",
              amount: e.sendTokenAmount,
              network: W.state.activeCaipNetwork?.caipNetworkId || "",
            },
          }),
            f.f.showError("Something went wrong"));
        }
      },
      sendSolanaToken() {
        this.state.sendTokenAmount && this.state.receiverAddress
          ? (N.pushTransactionStack({ view: "Account", goBack: !1 }),
            I.sendTransaction({
              chainNamespace: "solana",
              to: this.state.receiverAddress,
              value: this.state.sendTokenAmount,
            })
              .then(() => {
                (this.resetSend(), u.f.fetchTokenBalance());
              })
              .catch((e) => {
                (f.f.showError("Failed to send transaction. Please try again."),
                  console.error(
                    "SendController:sendToken - failed to send solana transaction",
                    e,
                  ));
              }))
          : f.f.showError("Please enter a valid amount and receiver address");
      },
      resetSend() {
        ((z.token = void 0),
          (z.sendTokenAmount = void 0),
          (z.receiverAddress = void 0),
          (z.receiverProfileImageUrl = void 0),
          (z.receiverProfileName = void 0),
          (z.loading = !1),
          (z.tokenBalances = []));
      },
    },
    V = {
      currentTab: 0,
      tokenBalance: [],
      smartAccountDeployed: !1,
      addressLabels: new Map(),
      allAccounts: [],
      user: void 0,
    },
    F = {
      caipNetwork: void 0,
      supportsAllNetworks: !0,
      smartAccountEnabledNetworks: [],
    },
    K = (0, i.s)({
      chains: (0, s.I)(),
      activeCaipAddress: void 0,
      activeChain: void 0,
      activeCaipNetwork: void 0,
      noAdapters: !1,
      universalAdapter: {
        networkControllerClient: void 0,
        connectionControllerClient: void 0,
      },
      isSwitchingNamespace: !1,
    }),
    W = {
      state: K,
      subscribe: (e) =>
        (0, i.i)(K, () => {
          e(K);
        }),
      subscribeKey: (e, t) => (0, s.T)(K, e, t),
      subscribeChainProp(e, t, s) {
        let r;
        return (0, i.i)(K.chains, () => {
          let i = s || K.activeChain;
          if (i) {
            let s = K.chains.get(i)?.[e];
            r !== s && ((r = s), t(s));
          }
        });
      },
      initialize(e, t, s) {
        let { chainId: r, namespace: a } = c.f.getActiveNetworkProps(),
          n = t?.find((e) => e.id.toString() === r?.toString()),
          o = e.find((e) => e?.namespace === a) || e?.[0],
          l = new Set([...(t?.map((e) => e.chainNamespace) ?? [])]);
        ((e?.length !== 0 && o) || (K.noAdapters = !0),
          !K.noAdapters &&
            ((K.activeChain = o?.namespace),
            (K.activeCaipNetwork = n),
            this.setChainNetworkData(o?.namespace, { caipNetwork: n }),
            K.activeChain && C.set({ activeChain: o?.namespace })),
          l.forEach((e) => {
            let r = t?.filter((t) => t.chainNamespace === e);
            (W.state.chains.set(e, {
              namespace: e,
              networkState: (0, i.s)({ ...F, caipNetwork: r?.[0] }),
              accountState: (0, i.s)(V),
              caipNetworks: r ?? [],
              ...s,
            }),
              this.setRequestedCaipNetworks(r ?? [], e));
          }));
      },
      removeAdapter(e) {
        if (K.activeChain === e) {
          let t = Array.from(K.chains.entries()).find(([t]) => t !== e);
          if (t) {
            let e = t[1]?.caipNetworks?.[0];
            e && this.setActiveCaipNetwork(e);
          }
        }
        K.chains.delete(e);
      },
      addAdapter(
        e,
        { networkControllerClient: t, connectionControllerClient: i },
        s,
      ) {
        (K.chains.set(e.namespace, {
          namespace: e.namespace,
          networkState: { ...F, caipNetwork: s[0] },
          accountState: V,
          caipNetworks: s,
          connectionControllerClient: i,
          networkControllerClient: t,
        }),
          this.setRequestedCaipNetworks(
            s?.filter((t) => t.chainNamespace === e.namespace) ?? [],
            e.namespace,
          ));
      },
      addNetwork(e) {
        let t = K.chains.get(e.chainNamespace);
        if (t) {
          let i = [...(t.caipNetworks || [])];
          (t.caipNetworks?.find((t) => t.id === e.id) || i.push(e),
            K.chains.set(e.chainNamespace, { ...t, caipNetworks: i }),
            this.setRequestedCaipNetworks(i, e.chainNamespace));
        }
      },
      removeNetwork(e, t) {
        let i = K.chains.get(e);
        if (i) {
          let s = K.activeCaipNetwork?.id === t,
            r = [...(i.caipNetworks?.filter((e) => e.id !== t) || [])];
          (s &&
            i?.caipNetworks?.[0] &&
            this.setActiveCaipNetwork(i.caipNetworks[0]),
            K.chains.set(e, { ...i, caipNetworks: r }),
            this.setRequestedCaipNetworks(r || [], e));
        }
      },
      setAdapterNetworkState(e, t) {
        let i = K.chains.get(e);
        i &&
          ((i.networkState = { ...(i.networkState || F), ...t }),
          K.chains.set(e, i));
      },
      setChainAccountData(e, t, i = !0) {
        if (!e) throw Error("Chain is required to update chain account data");
        let s = K.chains.get(e);
        if (s) {
          let i = { ...(s.accountState || V), ...t };
          (K.chains.set(e, { ...s, accountState: i }),
            (1 === K.chains.size || K.activeChain === e) &&
              (t.caipAddress && (K.activeCaipAddress = t.caipAddress),
              u.f.replaceState(i)));
        }
      },
      setChainNetworkData(e, t) {
        if (!e) return;
        let i = K.chains.get(e);
        if (i) {
          let s = { ...(i.networkState || F), ...t };
          K.chains.set(e, { ...i, networkState: s });
        }
      },
      setAccountProp(e, t, i, s = !0) {
        (this.setChainAccountData(i, { [e]: t }, s),
          "status" === e &&
            "disconnected" === t &&
            i &&
            k.removeConnectorId(i));
      },
      setActiveNamespace(e) {
        K.activeChain = e;
        let t = e ? K.chains.get(e) : void 0,
          i = t?.networkState?.caipNetwork;
        i?.id &&
          e &&
          ((K.activeCaipAddress = t?.accountState?.caipAddress),
          (K.activeCaipNetwork = i),
          this.setChainNetworkData(e, { caipNetwork: i }),
          c.f.setActiveCaipNetworkId(i?.caipNetworkId),
          C.set({ activeChain: e, selectedNetworkId: i?.caipNetworkId }));
      },
      setActiveCaipNetwork(e) {
        if (!e) return;
        K.activeChain !== e.chainNamespace && this.setIsSwitchingNamespace(!0);
        let t = K.chains.get(e.chainNamespace);
        ((K.activeChain = e.chainNamespace),
          (K.activeCaipNetwork = e),
          this.setChainNetworkData(e.chainNamespace, { caipNetwork: e }),
          t?.accountState?.address
            ? (K.activeCaipAddress = `${e.chainNamespace}:${e.id}:${t?.accountState?.address}`)
            : (K.activeCaipAddress = void 0),
          this.setAccountProp(
            "caipAddress",
            K.activeCaipAddress,
            e.chainNamespace,
          ),
          t && u.f.replaceState(t.accountState),
          H.resetSend(),
          C.set({
            activeChain: K.activeChain,
            selectedNetworkId: K.activeCaipNetwork?.caipNetworkId,
          }),
          c.f.setActiveCaipNetworkId(e.caipNetworkId),
          this.checkIfSupportedNetwork(e.chainNamespace) ||
            !h.f.state.enableNetworkSwitch ||
            h.f.state.allowUnsupportedChain ||
            I.state.wcBasic ||
            this.showUnsupportedChainUI());
      },
      addCaipNetwork(e) {
        if (!e) return;
        let t = K.chains.get(e.chainNamespace);
        t && t?.caipNetworks?.push(e);
      },
      async switchActiveNamespace(e) {
        if (!e) return;
        let t = e !== W.state.activeChain,
          i = W.getNetworkData(e)?.caipNetwork,
          s = W.getCaipNetworkByNamespace(e, i?.id);
        t && s && (await W.switchActiveNetwork(s));
      },
      async switchActiveNetwork(e) {
        let t = W.state.chains.get(W.state.activeChain);
        t?.caipNetworks?.some((e) => e.id === K.activeCaipNetwork?.id) ||
          N.goBack();
        let i = this.getNetworkControllerClient(e.chainNamespace);
        i &&
          (await i.switchCaipNetwork(e),
          g.f.sendEvent({
            type: "track",
            event: "SWITCH_NETWORK",
            properties: { network: e.caipNetworkId },
          }));
      },
      getNetworkControllerClient(e) {
        let t = e || K.activeChain,
          i = K.chains.get(t);
        if (!i) throw Error("Chain adapter not found");
        if (!i.networkControllerClient)
          throw Error("NetworkController client not set");
        return i.networkControllerClient;
      },
      getConnectionControllerClient(e) {
        let t = e || K.activeChain;
        if (!t)
          throw Error("Chain is required to get connection controller client");
        let i = K.chains.get(t);
        if (!i?.connectionControllerClient)
          throw Error("ConnectionController client not set");
        return i.connectionControllerClient;
      },
      getAccountProp(e, t) {
        let i = K.activeChain;
        if ((t && (i = t), !i)) return;
        let s = K.chains.get(i)?.accountState;
        if (s) return s[e];
      },
      getNetworkProp(e, t) {
        let i = K.chains.get(t)?.networkState;
        if (i) return i[e];
      },
      getRequestedCaipNetworks(e) {
        let t = K.chains.get(e),
          { approvedCaipNetworkIds: i = [], requestedCaipNetworks: s = [] } =
            t?.networkState || {};
        return d.f.sortRequestedNetworks(i, s);
      },
      getAllRequestedCaipNetworks() {
        let e = [];
        return (
          K.chains.forEach((t) => {
            let i = this.getRequestedCaipNetworks(t.namespace);
            e.push(...i);
          }),
          e
        );
      },
      setRequestedCaipNetworks(e, t) {
        this.setAdapterNetworkState(t, { requestedCaipNetworks: e });
      },
      getAllApprovedCaipNetworkIds() {
        let e = [];
        return (
          K.chains.forEach((t) => {
            let i = this.getApprovedCaipNetworkIds(t.namespace);
            e.push(...i);
          }),
          e
        );
      },
      getActiveCaipNetwork: () => K.activeCaipNetwork,
      getActiveCaipAddress: () => K.activeCaipAddress,
      getApprovedCaipNetworkIds(e) {
        let t = K.chains.get(e);
        return t?.networkState?.approvedCaipNetworkIds || [];
      },
      async setApprovedCaipNetworksData(e) {
        let t = this.getNetworkControllerClient(),
          i = await t?.getApprovedCaipNetworksData();
        this.setAdapterNetworkState(e, {
          approvedCaipNetworkIds: i?.approvedCaipNetworkIds,
          supportsAllNetworks: i?.supportsAllNetworks,
        });
      },
      checkIfSupportedNetwork(e, t) {
        let i = t || K.activeCaipNetwork,
          s = this.getRequestedCaipNetworks(e);
        return !s.length || s?.some((e) => e.id === i?.id);
      },
      checkIfSupportedChainId(e) {
        if (!K.activeChain) return !0;
        let t = this.getRequestedCaipNetworks(K.activeChain);
        return t?.some((t) => t.id === e);
      },
      setSmartAccountEnabledNetworks(e, t) {
        this.setAdapterNetworkState(t, { smartAccountEnabledNetworks: e });
      },
      checkIfSmartAccountEnabled() {
        let e = a.f.caipNetworkIdToNumber(K.activeCaipNetwork?.caipNetworkId),
          t = K.activeChain;
        if (!t || !e) return !1;
        let i = this.getNetworkProp("smartAccountEnabledNetworks", t);
        return !!i?.includes(Number(e));
      },
      getActiveNetworkTokenAddress() {
        let e = K.activeCaipNetwork?.chainNamespace || "eip155",
          t = K.activeCaipNetwork?.id || 1,
          i = U.f.NATIVE_TOKEN_ADDRESS[e];
        return `${e}:${t}:${i}`;
      },
      showUnsupportedChainUI() {
        A.open({ view: "UnsupportedChain" });
      },
      checkIfNamesSupported() {
        let e = K.activeCaipNetwork;
        return !!(
          e?.chainNamespace &&
          U.f.NAMES_SUPPORTED_CHAIN_NAMESPACES.includes(e.chainNamespace)
        );
      },
      resetNetwork(e) {
        this.setAdapterNetworkState(e, {
          approvedCaipNetworkIds: void 0,
          supportsAllNetworks: !0,
          smartAccountEnabledNetworks: [],
        });
      },
      resetAccount(e) {
        if (!e) throw Error("Chain is required to set account prop");
        ((K.activeCaipAddress = void 0),
          this.setChainAccountData(e, {
            smartAccountDeployed: !1,
            currentTab: 0,
            caipAddress: void 0,
            address: void 0,
            balance: void 0,
            balanceSymbol: void 0,
            profileName: void 0,
            profileImage: void 0,
            addressExplorerUrl: void 0,
            tokenBalance: [],
            connectedWalletInfo: void 0,
            preferredAccountType: void 0,
            socialProvider: void 0,
            socialWindow: void 0,
            farcasterUrl: void 0,
            allAccounts: [],
            user: void 0,
            status: "disconnected",
          }),
          k.removeConnectorId(e));
      },
      async disconnect(e) {
        let t,
          i,
          s =
            ((t = Array.from(W.state.chains.keys())),
            (i = []),
            e
              ? (i.push([e, W.state.chains.get(e)]),
                R(e, r.f.CONNECTOR_ID.WALLET_CONNECT)
                  ? t.forEach((t) => {
                      t !== e &&
                        R(t, r.f.CONNECTOR_ID.WALLET_CONNECT) &&
                        i.push([t, W.state.chains.get(t)]);
                    })
                  : R(e, r.f.CONNECTOR_ID.AUTH) &&
                    t.forEach((t) => {
                      t !== e &&
                        R(t, r.f.CONNECTOR_ID.AUTH) &&
                        i.push([t, W.state.chains.get(t)]);
                    }))
              : (i = Array.from(W.state.chains.entries())),
            i);
        try {
          H.resetSend();
          let t = await Promise.allSettled(
            s.map(async ([e, t]) => {
              try {
                let { caipAddress: i } = this.getAccountData(e) || {};
                (i &&
                  t.connectionControllerClient?.disconnect &&
                  (await t.connectionControllerClient.disconnect(e)),
                  this.resetAccount(e),
                  this.resetNetwork(e));
              } catch (t) {
                throw Error(`Failed to disconnect chain ${e}: ${t.message}`);
              }
            }),
          );
          I.resetWcConnection();
          let i = t.filter((e) => "rejected" === e.status);
          if (i.length > 0)
            throw Error(i.map((e) => e.reason.message).join(", "));
          (c.f.deleteConnectedSocialProvider(),
            e ? k.removeConnectorId(e) : k.resetConnectorIds(),
            g.f.sendEvent({
              type: "track",
              event: "DISCONNECT_SUCCESS",
              properties: { namespace: e || "all" },
            }));
        } catch (e) {
          (console.error(e.message || "Failed to disconnect chains"),
            g.f.sendEvent({
              type: "track",
              event: "DISCONNECT_ERROR",
              properties: {
                message: e.message || "Failed to disconnect chains",
              },
            }));
        }
      },
      setIsSwitchingNamespace(e) {
        K.isSwitchingNamespace = e;
      },
      getFirstCaipNetworkSupportsAuthConnector() {
        let e = [];
        if (
          (K.chains.forEach((t) => {
            r.f.AUTH_CONNECTOR_SUPPORTED_CHAINS.find(
              (e) => e === t.namespace,
            ) &&
              t.namespace &&
              e.push(t.namespace);
          }),
          e.length > 0)
        ) {
          let t = e[0];
          return t ? K.chains.get(t)?.caipNetworks?.[0] : void 0;
        }
      },
      getAccountData: (e) =>
        e ? W.state.chains.get(e)?.accountState : u.f.state,
      getNetworkData(e) {
        let t = e || K.activeChain;
        if (t) return W.state.chains.get(t)?.networkState;
      },
      getCaipNetworkByNamespace(e, t) {
        if (!e) return;
        let i = W.state.chains.get(e),
          s = i?.caipNetworks?.find((e) => e.id === t);
        return s || i?.networkState?.caipNetwork || i?.caipNetworks?.[0];
      },
      getRequestedCaipNetworkIds() {
        let e = k.state.filterByNamespace;
        return (e ? [K.chains.get(e)] : Array.from(K.chains.values()))
          .flatMap((e) => e?.caipNetworks || [])
          .map((e) => e.caipNetworkId);
      },
    };
};
