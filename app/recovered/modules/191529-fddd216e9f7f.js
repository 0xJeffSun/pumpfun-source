// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(359702),
    i = e.i(770924),
    s = e.i(901131),
    r = e.i(376744);
  let a = {
      getFeatureValue(e, t) {
        let i = t?.[e];
        return void 0 === i ? s.f.DEFAULT_FEATURES[e] : i;
      },
      filterSocialsByPlatform(e) {
        if (!e || !e.length) return e;
        if (r.f.isTelegram()) {
          if (r.f.isIos()) return e.filter((e) => "google" !== e);
          if (r.f.isMac()) return e.filter((e) => "x" !== e);
          if (r.f.isAndroid())
            return e.filter((e) => !["facebook", "x"].includes(e));
        }
        return e;
      },
    },
    n = (0, t.s)({
      features: s.f.DEFAULT_FEATURES,
      projectId: "",
      sdkType: "appkit",
      sdkVersion: "html-wagmi-undefined",
      defaultAccountTypes: s.f.DEFAULT_ACCOUNT_TYPES,
      enableNetworkSwitch: !0,
    });
  e.s(
    [
      "f",
      0,
      {
        state: n,
        subscribeKey: (e, t) => (0, i.T)(n, e, t),
        setOptions(e) {
          Object.assign(n, e);
        },
        setFeatures(e) {
          if (!e) return;
          n.features || (n.features = s.f.DEFAULT_FEATURES);
          let t = { ...n.features, ...e };
          ((n.features = t),
            n.features.socials &&
              (n.features.socials = a.filterSocialsByPlatform(
                n.features.socials,
              )));
        },
        setProjectId(e) {
          n.projectId = e;
        },
        setCustomRpcUrls(e) {
          n.customRpcUrls = e;
        },
        setAllWallets(e) {
          n.allWallets = e;
        },
        setIncludeWalletIds(e) {
          n.includeWalletIds = e;
        },
        setExcludeWalletIds(e) {
          n.excludeWalletIds = e;
        },
        setFeaturedWalletIds(e) {
          n.featuredWalletIds = e;
        },
        setTokens(e) {
          n.tokens = e;
        },
        setTermsConditionsUrl(e) {
          n.termsConditionsUrl = e;
        },
        setPrivacyPolicyUrl(e) {
          n.privacyPolicyUrl = e;
        },
        setCustomWallets(e) {
          n.customWallets = e;
        },
        setIsSiweEnabled(e) {
          n.isSiweEnabled = e;
        },
        setIsUniversalProvider(e) {
          n.isUniversalProvider = e;
        },
        setSdkVersion(e) {
          n.sdkVersion = e;
        },
        setMetadata(e) {
          n.metadata = e;
        },
        setDisableAppend(e) {
          n.disableAppend = e;
        },
        setEIP6963Enabled(e) {
          n.enableEIP6963 = e;
        },
        setDebug(e) {
          n.debug = e;
        },
        setEnableWalletConnect(e) {
          n.enableWalletConnect = e;
        },
        setEnableWalletGuide(e) {
          n.enableWalletGuide = e;
        },
        setEnableAuthLogger(e) {
          n.enableAuthLogger = e;
        },
        setEnableWallets(e) {
          n.enableWallets = e;
        },
        setHasMultipleAddresses(e) {
          n.hasMultipleAddresses = e;
        },
        setSIWX(e) {
          n.siwx = e;
        },
        setConnectMethodsOrder(e) {
          n.features = { ...n.features, connectMethodsOrder: e };
        },
        setWalletFeaturesOrder(e) {
          n.features = { ...n.features, walletFeaturesOrder: e };
        },
        setSocialsOrder(e) {
          n.features = { ...n.features, socials: e };
        },
        setCollapseWallets(e) {
          n.features = { ...n.features, collapseWallets: e };
        },
        setEnableEmbedded(e) {
          n.enableEmbedded = e;
        },
        setAllowUnsupportedChain(e) {
          n.allowUnsupportedChain = e;
        },
        setManualWCControl(e) {
          n.manualWCControl = e;
        },
        setEnableNetworkSwitch(e) {
          n.enableNetworkSwitch = e;
        },
        setDefaultAccountTypes(e = {}) {
          Object.entries(e).forEach(([e, t]) => {
            t && (n.defaultAccountTypes[e] = t);
          });
        },
        setUniversalProviderConfigOverride(e) {
          n.universalProviderConfigOverride = e;
        },
        getUniversalProviderConfigOverride: () =>
          n.universalProviderConfigOverride,
        getSnapshot: () => (0, t.D)(n),
      },
    ],
    191529,
  );
};
