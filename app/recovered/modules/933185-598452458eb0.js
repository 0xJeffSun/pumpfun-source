// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(26004),
    a = e.i(732486),
    r = e.i(352386),
    n = e.i(178061),
    i = e.i(252494),
    o = e.i(748117);
  function l(e) {
    return "string" == typeof e && /^custom:[a-zA-Z0-9_-]+$/i.test(e);
  }
  let s = (e) => !!e.id && "privy-v2" === e.recoveryMethod;
  function c(e) {
    return e ? new Date(1e3 * e) : null;
  }
  function u(e, t) {
    return e
      .slice()
      .sort(
        (e, t) =>
          (e.firstVerifiedAt?.getTime() ?? 0) -
          (t.firstVerifiedAt?.getTime() ?? 0),
      )
      .find((e) => e.type === t);
  }
  let d = (e) => (e ? (p(e).find((e) => 0 === e.walletIndex) ?? null) : null),
    p = (e) => (e ? h(e, "ethereum") : []),
    h = (e, t) =>
      e.linkedAccounts.filter(
        (e) =>
          "wallet" === e.type &&
          "privy" === e.walletClientType &&
          !e.imported &&
          e.chainType === t,
      ),
    f = (e) => (e ? h(e, "solana") : []),
    m = (e) => (e ? (f(e).find((e) => 0 === e.walletIndex) ?? null) : null),
    b = (e) =>
      e.reduce((e, t) => (!e || t.walletIndex < e.walletIndex ? t : e), null),
    g = "Log in or sign up",
    y = "light",
    _ = [
      "detected_ethereum_wallets",
      "detected_solana_wallets",
      "metamask",
      "coinbase_wallet",
      "rainbow",
      "robinhood_wallet",
      "base_account",
      "wallet_connect",
      "phantom",
    ],
    v = !1,
    w = { moonpay: { useSandbox: !1 } },
    k = new Set([
      "coinbase_wallet",
      "base_account",
      "cryptocom",
      "metamask",
      "okx_wallet",
      "phantom",
      "rainbow",
      "uniswap",
      "zerion",
      "universal_profile",
      "bybit_wallet",
      "ronin_wallet",
      "haha_wallet",
      "wallet_connect",
      "wallet_connect_qr",
      "wallet_connect_qr_solana",
      "detected_solana_wallets",
      "detected_ethereum_wallets",
      "rabby_wallet",
      "safe",
      "solflare",
      "backpack",
      "jupiter",
      "binance",
      "binanceus",
      "bitget_wallet",
      "kraken_wallet",
      "robinhood_wallet",
    ]),
    x = (e) => k.has(e),
    A = (e, t, a) => a.indexOf(e) === t,
    E = /paymaster\.biconomy\.io\/api/i,
    C = {
      mode: "SPONSORED",
      calculateGasLimits: !0,
      expiryDuration: 300,
      sponsorshipInfo: {
        webhookData: {},
        smartAccountInfo: { name: "BICONOMY", version: "2.0.0" },
      },
    };
  function M(e, t) {
    let a = Math.max(0, Math.min(1, e.toHsl().l + t));
    return (0, i.f)({ ...e.toHsl(), l: a });
  }
  function S(e, t) {
    let a = e.getLuminance(),
      r = t.getLuminance();
    return (Math.max(a, r) + 0.05) / (Math.min(a, r) + 0.05);
  }
  let F = {
      background: {
        default: "#020713",
        elevated: "#1A2230",
        "default-hover": "#101724",
        "default-clicked": "#1A2230",
        "default-disabled": "#020713",
        success: "#0E3E2D",
        warning: "#373827",
        error: "#2E0C18",
        interactive: "#8B86FF",
        "error-hover": "#441821",
        "interactive-hover": "#7B73E5",
        "interactive-clicked": "#6560CC",
        "interactive-disabled": "#141824",
        info: "#1F2937",
        "info-hover": "#141824",
      },
      icon: {
        default: "#F8F8F8",
        muted: "#9BA2AE",
        subtle: "#7B8491",
        inverse: "#020713",
        success: "#88E3B5",
        warning: "#FDF27B",
        error: "#EF4444",
        interactive: "#88B6FF",
        "default-hover": "#F8F8F8",
        "muted-hover": "#AEB3BD",
        "subtle-hover": "#8B939E",
        "default-clicked": "#F8F8F8",
        "muted-clicked": "#9097A5",
        "subtle-clicked": "#78818E",
        "default-disabled": "#404452",
        "muted-disabled": "#404452",
        "subtle-disabled": "#404452",
        "error-hover": "#F05555",
        "interactive-hover": "#7B73E5",
        "error-clicked": "#EF4444",
        "interactive-clicked": "#6560CC",
      },
      text: {
        default: "#F8F8F8",
        muted: "#9BA2AE",
        placeholder: "#7B8491",
        success: "#ACEECB",
        warning: "#FEF9A0",
        error: "#FCA5A5",
        interactive: "#A29EFF",
        "default-disabled": "#404452",
        "interactive-hover": "#8C88E5",
      },
      border: {
        default: "#1F2937",
        interactive: "#88B0FF",
        focused: "#F8F8FC",
        info: "#5B83D3",
        success: "#317056",
        warning: "#FBBF24",
        error: "#F87171",
        "default-hover": "#34304A",
        "interactive-hover": "#88B0FF",
      },
      shadow: { elevation: "rgb(55 65 81 / 15%)" },
    },
    z = {
      background: {
        default: "#FFFFFF",
        elevated: "#F1F2F9",
        "default-hover": "#F8F9FC",
        "default-clicked": "#F1F2F9",
        "default-disabled": "#FFFFFF",
        success: "#DCFCE7",
        warning: "#FEF3C7",
        error: "#FEE2E2",
        interactive: "#5B4FFF",
        "error-hover": "#FECACA",
        "interactive-hover": "#4F46E5",
        "interactive-clicked": "#4338CA",
        "interactive-disabled": "#F1F2F9",
        info: "#E0E7FF",
        "info-hover": "#EEF2FF",
      },
      icon: {
        default: "#110F2A",
        muted: "#64668B",
        subtle: "#9498B8",
        inverse: "#FFFFFF",
        success: "#33B287",
        warning: "#F59E0B",
        error: "#EF4444",
        interactive: "#564FFF",
        "default-hover": "#1D1B35",
        "muted-hover": "#64668B",
        "subtle-hover": "#888AAE",
        "default-clicked": "#060C23",
        "muted-clicked": "#64668B",
        "subtle-clicked": "#788804",
        "default-disabled": "#CBCDE1",
        "muted-disabled": "#CBCDE1",
        "subtle-disabled": "#CBCDE1",
        "error-hover": "#F06060",
        "interactive-hover": "#4F46E5",
        "error-clicked": "#DC3838",
        "interactive-clicked": "#2BA482",
      },
      text: {
        default: "#040217",
        muted: "#64668B",
        placeholder: "#9498B8",
        success: "#135638",
        warning: "#906218",
        error: "#991B1B",
        interactive: "#5B4FFF",
        "default-disabled": "#CBCDE1",
        "interactive-hover": "#5B4FFF",
      },
      border: {
        default: "#E2E3F0",
        interactive: "#5B4FFF",
        focused: "#949DF9",
        info: "#F1F2F9",
        success: "#87D7B7",
        warning: "#FACD63",
        error: "#F69393",
        "default-hover": "#E2E3F0",
        "interactive-hover": "#5B4FFF",
      },
      shadow: { elevation: "rgb(55 65 81 / 15%)" },
    },
    W = ["sms", "totp", "passkey"];
  function U(e, t, a, r, o) {
    let l,
      s,
      c,
      u,
      d,
      p,
      h,
      f,
      m,
      b,
      k,
      U,
      T,
      B,
      H,
      I,
      P,
      j,
      L = a ? console.warn : () => {},
      O = [];
    if (t?.loginMethods)
      for (let e of ((l = t.loginMethods.includes("email")),
      (s = t.loginMethods.includes("sms")),
      (u = t.loginMethods.includes("wallet")),
      (d = t.loginMethods.includes("google")),
      (p = t.loginMethods.includes("twitter")),
      (h = t.loginMethods.includes("discord")),
      (k = t.loginMethods.includes("spotify")),
      (U = t.loginMethods.includes("instagram")),
      (f = t.loginMethods.includes("tiktok")),
      (m = t.loginMethods.includes("line")),
      (b = t.loginMethods.includes("twitch")),
      (B = t.loginMethods.includes("github")),
      (T = t.loginMethods.includes("linkedin")),
      (H = t.loginMethods.includes("apple")),
      (I = t.loginMethods.includes("farcaster")),
      (P = t.loginMethods.includes("telegram")),
      (c = t.loginMethods.includes("passkey")),
      t.loginMethods))
        "string" == typeof e && e.startsWith("privy:") && O.push(e);
    else
      ((l = e.email_auth),
        (s = e.sms_auth),
        (u = e.wallet_auth || e.solana_wallet_auth),
        (d = e.google_oauth),
        (p = e.twitter_oauth),
        (h = e.discord_oauth),
        (B = e.github_oauth),
        (k = e.spotify_oauth),
        (U = e.instagram_oauth),
        (f = e.tiktok_oauth),
        (m = e.line_oauth),
        (b = e.twitch_oauth),
        (T = e.linkedin_oauth),
        (H = e.apple_oauth),
        (I = e.farcaster_auth),
        (P = e.telegram_auth || e.telegram_oauth),
        (c = e.passkey_auth),
        (j = e.custom_jwt_auth));
    (e.passkey_auth && (c = !0),
      "u" > typeof window &&
        "function" != typeof window.PublicKeyCredential &&
        (c = !1));
    let $ = [l, s].filter(Boolean),
      D = [d, p, h, B, k, U, f, m, b, T, H, I, P].filter(Boolean),
      N = [u].filter(Boolean),
      V = t?.loginMethods?.includes("passkey") ?? !1,
      R = e.passkeys_for_signup_enabled ?? !1,
      q = [c && (R || V)].filter(Boolean),
      G = [j].filter(Boolean);
    if ($.length + D.length + N.length + q.length + G.length + O.length === 0)
      throw Error("You must enable at least one login method");
    let K =
      void 0 !== t?.appearance?.showWalletLoginFirst
        ? t?.appearance?.showWalletLoginFirst
        : e.show_wallet_login_first;
    K && 0 === N.length
      ? (L(
          "You should only enable `showWalletLoginFirst` when `wallet` logins are also enabled. `showWalletLoginFirst` has been set to false",
        ),
        (K = !1))
      : K ||
        D.length + $.length !== 0 ||
        (L(
          "You should only disable `showWalletLoginFirst` when `email`, `sms`, or social logins are also enabled. `showWalletLoginFirst` has been set to true",
        ),
        (K = !0));
    let X = t?.externalWallets?.walletConnect?.enabled ?? !0;
    t?.loginMethods &&
      t.loginMethodsAndOrder &&
      L(
        "You should only configure one of `loginMethods` or `loginMethodsAndOrder`",
      );
    let Y = (({ input: e, overrides: t }) =>
      t
        ? t.primary
            .concat(t.overflow ?? [])
            .filter(x)
            .filter(A)
        : e
          ? e.filter(x).filter(A)
          : _)({
      input: t?.appearance?.walletList,
      overrides: t?.loginMethodsAndOrder,
    });
    if (
      (Y.includes("wallet_connect_qr") || Y.includes("wallet_connect")) &&
      Y.includes("wallet_connect_qr_solana")
    )
      throw Error(
        "wallet_connect_qr and wallet_connect_qr_solana cannot both be present in walletList due to WalletConnect session conflicts.",
      );
    let Z = (({ input: e }) => {
        if (!e || !e.primary[0]) return;
        let t = [e.primary[0]],
          a = [];
        for (let a of (e.primary.length > 4 &&
          console.warn(
            "You should not specify greater than 4 login methods in `loginMethodsAndOrder.primary`",
          ),
        e.primary.slice(1)))
          t.includes(a)
            ? console.warn(`Duplicated login method: ${a}`)
            : t.push(a);
        for (let r of e.overflow ?? [])
          t.includes(r) || a.includes(r)
            ? console.warn(`Duplicated login method: ${r}`)
            : a.push(r);
        return { primary: t, overflow: a };
      })({ input: t?.loginMethodsAndOrder }),
      Q = t?.intl?.defaultCountry ?? "US",
      { chains: J, defaultChain: ee } = (function ({
        supportedChains: e,
        defaultChainFromConfig: t,
      }) {
        let a;
        if (e) {
          if (0 === e.length)
            throw Error("`supportedChains` must contain at least one chain");
          a = (0, n.Q)(e);
        } else a = [...n.L];
        let r = e ? a[0] : n.q,
          i = t ?? r;
        if (!a.find((e) => e.id === i.id))
          throw Error("`defaultChain` must be included in `supportedChains`");
        return { chains: a, defaultChain: i };
      })({
        supportedChains: t?.supportedChains,
        defaultChainFromConfig: t?.defaultChain,
      }),
      et = !!t?.defaultChain,
      ea = t?.customAuth?.getCustomAccessToken && !1 !== t?.customAuth?.enabled,
      er = ea ? "all-users" : e.embedded_wallet_config.ethereum.create_on_login,
      en = e.embedded_wallet_config.solana.create_on_login;
    e.solana_wallet_auth &&
      !t?.externalWallets?.solana?.connectors &&
      console.warn(
        "App configuration has Solana wallet login enabled, but no Solana wallet connectors have been passed to Privy. Make sure to pass Solana connectors to the `config.externalWallets.solana.connectors` field of the `PrivyProvider`",
      );
    let ei = e.telegram_auth_config
        ? {
            botId: e.telegram_auth_config.bot_id,
            botName: e.telegram_auth_config.bot_name,
            linkEnabled: e.telegram_auth_config.link_enabled,
            seamlessAuthEnabled: e.telegram_auth_config.seamless_auth_enabled,
          }
        : void 0,
      eo = e.funding_config
        ? {
            methods: e.funding_config.methods,
            options: e.funding_config.options,
            defaultRecommendedAmount:
              e.funding_config.default_recommended_amount,
            defaultRecommendedCurrency:
              e.funding_config.default_recommended_currency,
            promptFundingOnWalletCreation:
              e.funding_config.prompt_funding_on_wallet_creation,
            crossChainBridgingEnabled:
              e.funding_config.cross_chain_bridging_enabled,
          }
        : void 0,
      el = e.smart_wallet_config;
    return {
      id: e.id,
      appClientId: o,
      name: e.name,
      legalName: e.legal_name ?? null,
      scriptNonce: t?.scriptNonce,
      allowlistConfig: {
        errorTitle: e.allowlist_config.error_title,
        errorDetail: e.allowlist_config.error_detail,
        errorCtaText: e.allowlist_config.cta_text,
        errorCtaLink: e.allowlist_config.cta_link,
      },
      legacyWalletUiConfig: e.legacy_wallet_ui_config,
      appearance: {
        logo: t?.appearance?.logo ?? e.logo_url ?? void 0,
        emailDomain: t?.appearance?.emailDomain,
        landingHeader: t?.appearance?.landingHeader ?? g,
        loginMessage:
          "string" == typeof t?.appearance?.loginMessage
            ? t?.appearance?.loginMessage.slice(0, 100)
            : t?.appearance?.loginMessage,
        footerLogo: t?.appearance?.footerLogo,
        palette: (function ({ backgroundTheme: e, accentHex: t }) {
          let a, r, n, o, l, s, c;
          "light" === e
            ? (a = !1)
            : "dark" === e
              ? (a = !0)
              : ((a = 0.5 >= (0, i.f)(e).getLuminance()),
                (r = (0, i.f)(e).toHslString()));
          let u = a ? "dark" : "light",
            d = a ? F : z,
            {
              accent: p,
              accentLight: h,
              accentHover: f,
              accentDark: m,
              accentDarkest: b,
            } = (function (e, t) {
              if (!e) {
                let e = t ? F : z;
                return {
                  accent: (0, i.f)(e.background.interactive),
                  accentLight: (0, i.f)(e.background.interactive),
                  accentHover: (0, i.f)(e.background["interactive-hover"]),
                  accentDark: (0, i.f)(e.background["interactive-clicked"]),
                  accentDarkest: (0, i.f)(e.background["interactive-disabled"]),
                };
              }
              let a = (0, i.f)(e);
              return {
                accent: a,
                accentLight: M(a, 0.15),
                accentHover: M(a, 0.3),
                accentDark: M(a, -0.06),
                accentDarkest: M(a, -0.6),
              };
            })(t, a),
            g =
              ((n = (0, i.f)(z.text.default)),
              (o = (0, i.f)(F.text.default)),
              (l = S(p, n)),
              (s = S(p, o)),
              (c = p.toHsl()).h >= 220 && c.h <= 300 && s >= 3
                ? F.text.default
                : l > s
                  ? z.text.default
                  : F.text.default),
            y = (0, i.f)(g),
            _ = S(p, (0, i.f)(d.background.default)) >= 3;
          return {
            colorScheme: u,
            background: r || d.background.default,
            background2: d.background.elevated,
            background3: d.background.interactive,
            foreground: d.text.default,
            foreground2: d.text.muted,
            foreground3: d.text.placeholder,
            foreground4: d.border.default,
            accent: p.toHslString(),
            accentLight: h.toHslString(),
            accentHover: f.toHslString(),
            accentDark: m.toHslString(),
            accentDarkest: b.toHslString(),
            foregroundAccent: y.toHslString(),
            success: d.background.success,
            successDark: d.text.success,
            successLight: d.background.success,
            error: d.text.error,
            errorLight: d.background.error,
            warn: d.background.warning,
            warnLight: d.background.warning,
            warningDark: d.text.warning,
            errorDark: d.text.error,
            successBg: d.background.success,
            errorBg: d.background.error,
            errorBgHover: d.background["error-hover"],
            warnBg: d.background.warning,
            infoBg: d.background.info,
            infoBgHover: d.background["info-hover"],
            borderDefault: d.border.default,
            borderHover: d.border["default-hover"],
            borderFocus: d.border.focused,
            borderError: d.border.error,
            borderSuccess: d.border.success,
            borderWarning: d.border.warning,
            borderInfo: d.border.info,
            borderInteractive: d.border.interactive,
            borderInteractiveHover: d.border["interactive-hover"],
            backgroundHover: d.background["default-hover"],
            backgroundClicked: d.background["default-clicked"],
            backgroundDisabled: d.background["default-disabled"],
            backgroundInteractive: d.background.interactive,
            backgroundInteractiveHover: d.background["interactive-hover"],
            backgroundInteractiveClicked: d.background["interactive-clicked"],
            backgroundInteractiveDisabled: d.background["interactive-disabled"],
            foregroundHover: d.text.default,
            foregroundClicked: d.text.default,
            foregroundDisabled: d.text["default-disabled"],
            foregroundInteractive: d.text.interactive,
            foregroundInteractiveHover: d.text["interactive-hover"],
            accentHasGoodContrast: _ ? "1" : "0",
            linkNavigationColor: _ ? p.toHslString() : d.text.default,
            linkNavigationDecoration: _ ? "none" : "underline",
            iconDefault: d.icon.default,
            iconMuted: d.icon.muted,
            iconSubtle: d.icon.subtle,
            iconInverse: d.icon.inverse,
            iconSuccess: d.icon.success,
            iconWarning: d.icon.warning,
            iconError: d.icon.error,
            iconInteractive: d.icon.interactive,
            iconDefaultHover: d.icon["default-hover"],
            iconMutedHover: d.icon["muted-hover"],
            iconSubtleHover: d.icon["subtle-hover"],
            iconDefaultClicked: d.icon["default-clicked"],
            iconMutedClicked: d.icon["muted-clicked"],
            iconSubtleClicked: d.icon["subtle-clicked"],
            iconDefaultDisabled: d.icon["default-disabled"],
            iconMutedDisabled: d.icon["muted-disabled"],
            iconSubtleDisabled: d.icon["subtle-disabled"],
            iconErrorHover: d.icon["error-hover"],
            iconInteractiveHover: d.icon["interactive-hover"],
            iconErrorClicked: d.icon["error-clicked"],
            iconInteractiveClicked: d.icon["interactive-clicked"],
            iconMutedDisabledAlt: d.icon["muted-disabled"],
            iconSubtleDisabledAlt: d.icon["subtle-disabled"],
            shadow: d.shadow.elevation,
          };
        })({
          backgroundTheme: t?.appearance?.theme ?? y,
          accentHex: t?.appearance?.accentColor ?? e.accent_color,
        }),
        loginGroupPriority: K ? "web3-first" : "web2-first",
        hideDirectWeb2Inputs: !!t?.appearance?.hideDirectWeb2Inputs,
        walletList: Y,
        walletChainType:
          t?.appearance?.walletChainType ??
          (({ evmWalletAuth: e, solanaWalletAuth: t }) =>
            e && t
              ? "ethereum-and-solana"
              : e
                ? "ethereum-only"
                : t
                  ? "solana-only"
                  : "ethereum-only")({
            evmWalletAuth: e.wallet_auth ?? !1,
            solanaWalletAuth: e.solana_wallet_auth ?? !1,
          }),
      },
      loginMethods: {
        wallet: u,
        email: l,
        sms: s,
        passkey: c,
        google: d,
        twitter: p,
        discord: h,
        github: B,
        spotify: k,
        instagram: U,
        tiktok: f,
        line: m,
        twitch: b,
        linkedin: T,
        apple: H,
        farcaster: I,
        telegram: P,
      },
      globalDisablePasskeys: t?.globalDisablePasskeys ?? !1,
      customOAuthProviders: (e.custom_oauth_providers ?? []).filter(
        (e) => !1 !== e.enabled,
      ),
      crossAppProviders: O,
      disablePlusEmails: e.disable_plus_emails,
      loginMethodsAndOrder: Z,
      legal: {
        termsAndConditionsUrl:
          t?.legal?.termsAndConditionsUrl ?? e.terms_and_conditions_url,
        privacyPolicyUrl: t?.legal?.privacyPolicyUrl ?? e.privacy_policy_url,
        requireUsersAcceptTerms: e.require_users_accept_terms ?? !1,
      },
      walletConnectCloudProjectId:
        t?.walletConnectCloudProjectId ??
        e.wallet_connect_cloud_project_id ??
        "34357d3c125c2bcf2ce2bc3309d98715",
      rpcConfig: {
        rpcUrls: {},
        rpcTimeouts: t?.externalWallets?.signatureRequestTimeouts ?? {},
      },
      chains: J,
      defaultChain: ee,
      intl: { defaultCountry: Q, textLocalization: t?.intl?.textLocalization },
      shouldEnforceDefaultChainOnConnect: et,
      captcha: {
        enabledProvider: e.enabled_captcha_provider ?? null,
        siteKey: e.captcha_site_key,
      },
      externalWallets: {
        coinbaseWallet: {
          config: {
            appName: e.name,
            appLogoUrl: e.logo_url,
            preference: {
              options: "all",
              ...t?.externalWallets?.coinbaseWallet?.config?.preference,
            },
            ...t?.externalWallets?.coinbaseWallet?.config,
          },
        },
        baseAccount: {
          config: {
            appName: e.name,
            appLogoUrl: e.logo_url,
            ...t?.externalWallets?.baseAccount?.config,
            preference: {
              ...t?.externalWallets?.baseAccount?.config?.preference,
              telemetry: !1,
            },
          },
        },
        walletConnect: { enabled: X },
        solana: { connectors: t?.externalWallets?.solana?.connectors },
        disableAllExternalWallets:
          t?.externalWallets?.disableAllExternalWallets ?? !1,
      },
      embeddedWallets: {
        requireUserOwnedRecoveryOnCreate:
          !ea &&
          (e.embedded_wallet_config.require_user_owned_recovery_on_create ??
            !1),
        userOwnedRecoveryOptions: ea
          ? ["user-passcode"]
          : e.embedded_wallet_config.user_owned_recovery_options,
        priceDisplay: t?.embeddedWallets?.priceDisplay ?? {
          primary: "fiat-currency",
          secondary: "native-token",
        },
        ethereum: {
          createOnLogin: t?.embeddedWallets?.ethereum?.createOnLogin ?? er,
        },
        solana: {
          createOnLogin: t?.embeddedWallets?.solana?.createOnLogin ?? en,
        },
        disableAutomaticMigration:
          t?.embeddedWallets?.disableAutomaticMigration ?? !1,
        mode: e.embedded_wallet_config.mode,
        showWalletUIs:
          t?.embeddedWallets?.showWalletUIs ?? e.enforce_wallet_uis ?? !0,
        extendedCalldataDecoding:
          t?.embeddedWallets?.extendedCalldataDecoding ?? !1,
        transactionScanning: {
          enabled: t?.embeddedWallets?.transactionScanning?.enabled ?? !1,
          domain:
            t?.embeddedWallets?.transactionScanning?.domain ??
            r ??
            "https://auth.privy.io",
        },
      },
      mfa: {
        methods: (e.mfa_methods ?? []).filter((e) => W.includes(e)),
        noPromptOnMfaRequired: t?.mfa?.noPromptOnMfaRequired ?? !1,
      },
      passkeys: {
        shouldUnlinkOnUnenrollMfa: t?.passkeys?.shouldUnlinkOnUnenrollMfa,
        shouldUnenrollMfaOnUnlink: t?.passkeys?.shouldUnenrollMfaOnUnlink,
        registration: t?.passkeys?.registration,
      },
      customAuth: ea ? { enabled: !0, ...t.customAuth } : void 0,
      loginConfig: {
        telegramAuthConfiguration: ei,
        telegramHasHmacCredentials: !!e.telegram_auth,
        telegramSeamlessAuthEnabled: !!e.telegram_seamless_auth_enabled,
        passkeysForSignupEnabled: e.passkeys_for_signup_enabled,
      },
      headless: !!t?.headless,
      render: { standalone: t?._render?.standalone ?? v },
      fundingConfig: eo,
      fundingMethodConfig: {
        ...(t?.fundingMethodConfig ?? w),
        moonpay: {
          ...(t?.fundingMethodConfig?.moonpay ?? w.moonpay),
          useSandbox:
            t?.fundingMethodConfig?.moonpay.useSandbox ?? w.moonpay.useSandbox,
        },
      },
      whatsAppEnabled: !!e.whatsapp_enabled,
      customOAuthRedirectUrl: t?.customOAuthRedirectUrl,
      allowOAuthInEmbeddedBrowsers: t?.allowOAuthInEmbeddedBrowsers ?? !1,
      solanaRpcs: {
        "solana:mainnet": t?.solana?.rpcs?.["solana:mainnet"] ?? null,
        "solana:devnet": t?.solana?.rpcs?.["solana:devnet"] ?? null,
        "solana:testnet": t?.solana?.rpcs?.["solana:testnet"] ?? null,
      },
      smartWallets: el?.enabled
        ? {
            enabled: el.enabled,
            smartWalletVersion: el.smart_wallet_version,
            smartWalletType: el.smart_wallet_type,
            configuredNetworks: el.configured_networks.map((e) => {
              let t, a;
              return {
                chainId: e.chain_id,
                bundlerUrl: e.bundler_url,
                paymasterUrl: e.paymaster_url,
                paymasterContext:
                  ((t = e.paymaster_url),
                  (a = e.paymaster_context),
                  t && E.test(t)
                    ? C
                    : a && a.policy_id
                      ? { policyId: a.policy_id }
                      : void 0),
              };
            }),
          }
        : { enabled: el?.enabled ?? !1 },
      connectorsDebugLogs: t?.connectorsDebugLogs ?? !1,
    };
  }
  let T = {
      show_wallet_login_first: !0,
      allowlist_config: {
        error_title: null,
        error_detail: null,
        cta_text: null,
        cta_link: null,
      },
      wallet_auth: !0,
      email_auth: !0,
      sms_auth: !1,
      google_oauth: !1,
      twitter_oauth: !1,
      discord_oauth: !1,
      github_oauth: !1,
      linkedin_oauth: !1,
      apple_oauth: !1,
      disable_plus_emails: !1,
      terms_and_conditions_url: null,
      privacy_policy_url: null,
      embedded_wallet_config: {
        create_on_login: "off",
        ethereum: { create_on_login: "off" },
        solana: { create_on_login: "off" },
        require_user_owned_recovery_on_create: !1,
        user_owned_recovery_options: ["user-passcode"],
        mode: "user-controlled-server-wallets-only",
      },
      captcha_site_key: "",
      enforce_wallet_uis: !1,
      legacy_wallet_ui_config: !1,
      id: "",
      name: "",
      passkeys_for_signup_enabled: !1,
      whatsapp_enabled: !1,
    },
    B = (0, r.createContext)({
      appConfig: U(T, void 0, !1),
      isServerConfigLoaded: !1,
      initializationError: null,
      setInitializationError: () => {},
    }),
    H = (0, r.createContext)({
      ready: !1,
      authenticated: !1,
      user: null,
      error: null,
      walletConnectors: null,
      connectWallet: o.n,
      login: o.n,
      connectOrCreateWallet: o.n,
      linkEmail: o.n,
      linkPhone: o.n,
      linkFarcaster: o.n,
      linkWallet: o.n,
      linkGoogle: o.n,
      linkTwitter: o.n,
      linkTwitch: o.n,
      linkDiscord: o.n,
      linkGithub: o.n,
      linkSpotify: o.n,
      linkInstagram: o.n,
      linkTelegram: o.n,
      linkTiktok: o.n,
      linkLine: o.n,
      linkLinkedIn: o.n,
      linkApple: o.n,
      linkPasskey: o.n,
      linkOAuth: o.n,
      logout: o.n,
      getAccessToken: o.n,
      signMessage: o.n,
      signTypedData: o.n,
      enrollInMfa: o.n,
      initEnrollmentWithSms: o.n,
      initEnrollmentWithTotp: o.n,
      initEnrollmentWithPasskey: o.n,
      promptMfa: o.n,
      init: o.n,
      submitEnrollmentWithSms: o.n,
      submitEnrollmentWithTotp: o.n,
      submitEnrollmentWithPasskey: o.n,
      unenroll: o.n,
      clear: o.n,
      submit: o.n,
      cancel: o.n,
      sendTransaction: o.n,
      signTransaction: o.n,
      setWalletPassword: o.n,
      setWalletRecovery: o.n,
      isModalOpen: !1,
      mfaMethods: [],
    });
  e.s([
    "$",
    0,
    "pk_live_hirbpu0cVcLHrjktC9l7fbc9ctjv0SL",
    "A",
    0,
    "privy-refresh-token",
    "B",
    0,
    "privy-id-token",
    "C",
    0,
    "privy:connections",
    "D",
    0,
    "https://auth.privy.io",
    "E",
    0,
    2e4,
    "F",
    0,
    12e4,
    "G",
    0,
    (e) => `privy:wallet:${e}`,
    "H",
    0,
    "privy:headless_oauth",
    "I",
    0,
    "privy:id_token",
    "J",
    0,
    "0x1",
    "K",
    0,
    [
      "metamask",
      "phantom",
      "brave_wallet",
      "rainbow",
      "uniswap_wallet_extension",
      "uniswap_extension",
      "rabby_wallet",
      "bybit_wallet",
      "ronin_wallet",
      "haha_wallet",
      "crypto.com_wallet_extension",
      "crypto.com_onchain",
      "binance",
      "bitget_wallet",
      "coinbase_wallet",
      "coinbase_smart_wallet",
      "base_account",
      "metamask",
      "trust",
      "safe",
      "rainbow",
      "uniswap",
      "zerion",
      "argent",
      "spot",
      "omni",
      "cryptocom",
      "blockchain",
      "safepal",
      "bitget_wallet",
      "zengo",
      "1inch",
      "binance",
      "exodus",
      "mew_wallet",
      "alphawallet",
      "keyring_pro",
      "mathwallet",
      "unstoppable",
      "obvious",
      "ambire",
      "internet_money_wallet",
      "coin98",
      "abc_wallet",
      "arculus_wallet",
      "haha",
      "cling_wallet",
      "broearn",
      "copiosa",
      "burrito_wallet",
      "enjin_wallet",
      "plasma_wallet",
      "avacus",
      "bee",
      "pitaka",
      "pltwallet",
      "minerva",
      "kryptogo",
      "prema",
      "slingshot",
      "kriptonio",
      "timeless",
      "secux",
      "bitizen",
      "blocto",
      "okx_wallet",
      "safemoon",
      "rabby_wallet",
      "bybit_wallet",
      "ronin_wallet",
      "haha_wallet",
      "privy",
      "unknown",
      "phantom",
      "solflare",
      "glow",
      "backpack",
      "jupiter",
      "mobile_wallet_adapter",
    ],
    "M",
    0,
    d,
    "N",
    0,
    m,
    "O",
    0,
    "privy:oauth_disable_signup",
    "P",
    0,
    H,
    "Q",
    0,
    1400,
    "R",
    0,
    "privy:refresh_token",
    "S",
    0,
    "privy:state_code",
    "T",
    0,
    2500,
    "U",
    0,
    1,
    "V",
    0,
    "3.46.0",
    "W",
    0,
    3e4,
    "X",
    0,
    4e3,
    "Y",
    0,
    "https://api.moonpay.com/v1",
    "Z",
    0,
    "https://api.moonpay.com/v1",
    "_",
    0,
    "pk_test_fqWjXZMSFwloh7orvJsRfjiUHXJqFzI",
    "a",
    0,
    () => {
      let { appConfig: e } = (0, r.useContext)(B);
      return e;
    },
    "b",
    0,
    () => {
      let { isServerConfigLoaded: e } = (0, r.useContext)(B);
      return e;
    },
    "c",
    0,
    s,
    "d",
    0,
    p,
    "e",
    0,
    (e) =>
      (e?.linkedAccounts ?? []).filter(
        (e) =>
          "wallet" === e.type &&
          "privy" === e.walletClientType &&
          e.imported &&
          "ethereum" === e.chainType,
      ),
    "f",
    0,
    f,
    "g",
    0,
    (e) => {
      let t = d(e),
        a = m(e);
      return t && a && !s(a) && s(t) ? a : (d(e) ?? m(e));
    },
    "h",
    0,
    (e) =>
      (e?.linkedAccounts ?? []).filter(
        (e) =>
          "wallet" === e.type &&
          e.imported &&
          "privy" === e.walletClientType &&
          "solana" === e.chainType,
      ),
    "i",
    0,
    l,
    "j",
    0,
    () => {
      let { initializationError: e, setInitializationError: t } = (0,
      r.useContext)(B);
      return { initializationError: e, setInitializationError: t };
    },
    "k",
    0,
    (e, a) =>
      e?.linkedAccounts.find(
        (e) =>
          "wallet" === e.type &&
          "privy" === e.walletClientType &&
          (0, t.f)(e.address, a),
      ) || null,
    "l",
    0,
    (e) => b(p(e)),
    "m",
    0,
    (e, a) => e.find((e) => (0, t.f)(e.address, a)) || null,
    "n",
    0,
    "privy:caid",
    "o",
    0,
    (e) => `privy:guest:${e}`,
    "p",
    0,
    ({
      children: e,
      client: t,
      legacyClient: n,
      clientConfig: i,
      appClientId: o,
    }) => {
      let [l, s] = (0, r.useState)(null),
        [c, u] = (0, r.useState)(null),
        d = (0, r.useMemo)(
          () =>
            U(
              l ?? T,
              i,
              !!l,
              "u" > typeof window ? window.location.origin : void 0,
              o,
            ),
          [l, i, o],
        );
      return (
        (0, r.useEffect)(() => {
          if (!l) return;
          let e = (function (e) {
              if (!e) return {};
              let {
                appearance: t,
                scriptNonce: a,
                supportedChains: r,
                defaultChain: n,
                externalWallets: i,
                ...o
              } = e;
              return {
                ...o,
                ...(r ? { supportedChains: r.map((e) => e.id) } : void 0),
                ...(n ? { defaultChain: n.id } : void 0),
                ...(i
                  ? {
                      walletConnect: i.walletConnect
                        ? { enabled: i.walletConnect.enabled }
                        : void 0,
                      coinbaseWallet: i.coinbaseWallet,
                      solana: {
                        connectors: i.solana?.connectors
                          ?.get()
                          .map((e) => e.walletClientType),
                      },
                    }
                  : void 0),
              };
            })(i),
            t = (function (e, t = 0) {
              let a = 0xdeadbeef ^ t,
                r = 0x41c6ce57 ^ t;
              for (let t, n = 0; n < e.length; n++)
                ((a = Math.imul(a ^ (t = e.charCodeAt(n)), 0x9e3779b1)),
                  (r = Math.imul(r ^ t, 0x5f356495)));
              return (
                (a =
                  Math.imul(a ^ (a >>> 16), 0x85ebca6b) ^
                  Math.imul(r ^ (r >>> 13), 0xc2b2ae35)),
                0x100000000 *
                  (2097151 &
                    (r =
                      Math.imul(r ^ (r >>> 16), 0x85ebca6b) ^
                      Math.imul(a ^ (a >>> 13), 0xc2b2ae35))) +
                  (a >>> 0)
              );
            })(JSON.stringify(e)).toString(),
            a = `privy:sent:${l.id}:${t}`;
          localStorage.getItem(a) ||
            (n.createAnalyticsEvent({
              eventName: "sdk_initialize",
              payload: e,
            }),
            localStorage.setItem(a, "t"));
        }, [i, l]),
        (0, r.useEffect)(() => {
          l ||
            (async () => {
              try {
                await t.initialize();
                let e = t.app.getConfig();
                (e.custom_api_url && n.updateApiUrl(e.custom_api_url), s(e));
              } catch (t) {
                let e = t instanceof Error ? t : Error(String(t));
                (u(e), console.warn("Error generating app config: ", e));
              }
            })();
        }, []),
        (0, a.jsx)(B.Provider, {
          value: {
            appConfig: d,
            isServerConfigLoaded: !!l,
            initializationError: c,
            setInitializationError: u,
          },
          children: e,
        })
      );
    },
    "q",
    0,
    "privy:token",
    "r",
    0,
    (e) => `privy:cross-app:${e}`,
    "s",
    0,
    (e) => b(f(e)),
    "t",
    0,
    "privy:code_verifier",
    "u",
    0,
    () => (0, r.useContext)(H),
    "v",
    0,
    "privy:pat",
    "w",
    0,
    "privy-session",
    "x",
    0,
    "deprecated",
    "y",
    0,
    function (e) {
      if (!e) return null;
      let t = (function (e) {
          let t = [];
          for (let a of e) {
            let e = a.type;
            switch (a.type) {
              case "wallet":
                let r = {
                  id: a.id,
                  address: a.address,
                  type: a.type,
                  imported: a.imported,
                  delegated: a.delegated,
                  firstVerifiedAt: c(a.first_verified_at),
                  latestVerifiedAt: c(a.latest_verified_at),
                  chainType: a.chain_type,
                  walletClientType: a.wallet_client_type,
                  connectorType: a.connector_type,
                  recoveryMethod: a.recovery_method,
                  walletIndex: a.wallet_index,
                  publicKey: a.public_key,
                };
                t.push(r);
                break;
              case "smart_wallet":
                let n = {
                  address: a.address,
                  type: a.type,
                  firstVerifiedAt: c(a.first_verified_at),
                  latestVerifiedAt: c(a.latest_verified_at),
                  smartWalletType: a.smart_wallet_type,
                  smartWalletVersion: a.smart_wallet_version,
                };
                t.push(n);
                break;
              case "cross_app":
                let i = {
                  type: a.type,
                  subject: a.subject,
                  embeddedWallets: a.embedded_wallets,
                  smartWallets: a.smart_wallets,
                  providerApp: { id: a.provider_app_id },
                  firstVerifiedAt: c(a.first_verified_at),
                  latestVerifiedAt: c(a.latest_verified_at),
                };
                t.push(i);
                break;
              case "email":
                let o = {
                  address: a.address,
                  type: a.type,
                  firstVerifiedAt: c(a.first_verified_at),
                  latestVerifiedAt: c(a.latest_verified_at),
                };
                t.push(o);
                break;
              case "phone":
                let s = {
                  number: a.phoneNumber,
                  type: a.type,
                  firstVerifiedAt: c(a.first_verified_at),
                  latestVerifiedAt: c(a.latest_verified_at),
                };
                t.push(s);
                break;
              case "google_oauth":
                let u = {
                  subject: a.subject,
                  email: a.email,
                  name: a.name,
                  type: a.type,
                  firstVerifiedAt: c(a.first_verified_at),
                  latestVerifiedAt: c(a.latest_verified_at),
                };
                t.push(u);
                break;
              case "spotify_oauth":
                let d = {
                  subject: a.subject,
                  email: a.email,
                  name: a.name,
                  type: a.type,
                  firstVerifiedAt: c(a.first_verified_at),
                  latestVerifiedAt: c(a.latest_verified_at),
                };
                t.push(d);
                break;
              case "instagram_oauth":
                let p = {
                  subject: a.subject,
                  username: a.username,
                  type: a.type,
                  firstVerifiedAt: c(a.first_verified_at),
                  latestVerifiedAt: c(a.latest_verified_at),
                };
                t.push(p);
                break;
              case "twitter_oauth":
                let h = {
                  subject: a.subject,
                  username: a.username,
                  name: a.name,
                  type: a.type,
                  profilePictureUrl: a.profile_picture_url,
                  firstVerifiedAt: c(a.first_verified_at),
                  latestVerifiedAt: c(a.latest_verified_at),
                };
                t.push(h);
                break;
              case "discord_oauth":
                let f = {
                  subject: a.subject,
                  username: a.username,
                  email: a.email,
                  type: a.type,
                  firstVerifiedAt: c(a.first_verified_at),
                  latestVerifiedAt: c(a.latest_verified_at),
                };
                t.push(f);
                break;
              case "github_oauth":
                let m = {
                  subject: a.subject,
                  username: a.username,
                  name: a.name,
                  email: a.email,
                  type: a.type,
                  firstVerifiedAt: c(a.first_verified_at),
                  latestVerifiedAt: c(a.latest_verified_at),
                };
                t.push(m);
                break;
              case "tiktok_oauth":
                let b = {
                  subject: a.subject,
                  username: a.username,
                  name: a.name,
                  type: a.type,
                  firstVerifiedAt: c(a.first_verified_at),
                  latestVerifiedAt: c(a.latest_verified_at),
                };
                t.push(b);
                break;
              case "line_oauth":
                let g = {
                  subject: a.subject,
                  name: a.name,
                  email: a.email,
                  profilePictureUrl: a.profile_picture_url,
                  type: a.type,
                  firstVerifiedAt: c(a.first_verified_at),
                  latestVerifiedAt: c(a.latest_verified_at),
                };
                t.push(g);
                break;
              case "twitch_oauth":
                let y = {
                  subject: a.subject,
                  username: a.username,
                  type: a.type,
                  firstVerifiedAt: c(a.first_verified_at),
                  latestVerifiedAt: c(a.latest_verified_at),
                };
                t.push(y);
                break;
              case "linkedin_oauth":
                let _ = {
                  subject: a.subject,
                  name: a.name,
                  email: a.email,
                  vanityName: a.vanity_name,
                  type: a.type,
                  firstVerifiedAt: c(a.first_verified_at),
                  latestVerifiedAt: c(a.latest_verified_at),
                };
                t.push(_);
                break;
              case "apple_oauth":
                let v = {
                  subject: a.subject,
                  email: a.email,
                  type: a.type,
                  firstVerifiedAt: c(a.first_verified_at),
                  latestVerifiedAt: c(a.latest_verified_at),
                };
                t.push(v);
                break;
              case "custom_auth":
                t.push({
                  type: a.type,
                  customUserId: a.custom_user_id,
                  firstVerifiedAt: c(a.first_verified_at),
                  latestVerifiedAt: c(a.latest_verified_at),
                });
                break;
              case "farcaster":
                let w = {
                  type: a.type,
                  fid: a.fid,
                  ownerAddress: a.owner_address,
                  displayName: a.display_name,
                  username: a.username,
                  bio: a.bio,
                  pfp: a.profile_picture_url,
                  url: a.homepage_url,
                  firstVerifiedAt: c(a.first_verified_at),
                  latestVerifiedAt: c(a.latest_verified_at),
                  signerPublicKey: a.signer_public_key,
                };
                t.push(w);
                break;
              case "passkey":
                let k = {
                  type: a.type,
                  enrolledInMfa: a.enrolled_in_mfa,
                  credentialId: a.credential_id,
                  publicKey: a.public_key,
                  authenticatorName: a.authenticator_name,
                  createdWithDevice: a.created_with_device,
                  createdWithOs: a.created_with_os,
                  createdWithBrowser: a.created_with_browser,
                  firstVerifiedAt: c(a.first_verified_at),
                  latestVerifiedAt: c(a.latest_verified_at),
                };
                t.push(k);
                break;
              case "telegram":
                let x = {
                  type: a.type,
                  telegramUserId: a.telegram_user_id,
                  firstName: a.first_name,
                  lastName: a.last_name,
                  username: a.username,
                  photoUrl: a.photo_url,
                  firstVerifiedAt: c(a.first_verified_at),
                  latestVerifiedAt: c(a.latest_verified_at),
                };
                t.push(x);
                break;
              default:
                if (l(a.type)) {
                  let e = {
                    type: a.type,
                    subject: a.subject,
                    name: a.name,
                    username: a.username,
                    email: a.email,
                    profilePictureUrl: a.profile_picture_url,
                    firstVerifiedAt: c(a.first_verified_at),
                    latestVerifiedAt: c(a.latest_verified_at),
                  };
                  t.push(e);
                  break;
                }
                console.warn(
                  `Unrecognized account type: ${e}. Please consider upgrading the Privy SDK.`,
                );
            }
          }
          return t;
        })(e.linked_accounts),
        a = u(t, "wallet"),
        r = u(t, "smart_wallet"),
        n = u(t, "email"),
        i = u(t, "phone"),
        o = u(t, "google_oauth"),
        s = u(t, "twitter_oauth"),
        d = u(t, "discord_oauth"),
        p = u(t, "github_oauth"),
        h = u(t, "spotify_oauth"),
        f = u(t, "instagram_oauth"),
        m = u(t, "tiktok_oauth"),
        b = u(t, "line_oauth"),
        g = u(t, "twitch_oauth"),
        y = u(t, "linkedin_oauth"),
        _ = u(t, "apple_oauth"),
        v = u(t, "farcaster"),
        w = u(t, "telegram"),
        k = e.mfa_methods.map(({ type: e, verified_at: t }) => ({
          type: e,
          verifiedAt: c(t),
        }));
      return {
        id: e.id,
        createdAt: c(e.created_at),
        linkedAccounts: t,
        email: n && { address: n?.address },
        phone: i && { number: i?.number },
        wallet: a && {
          id: a.id,
          address: a.address,
          chainType: a.chainType,
          walletClientType: a.walletClientType,
          connectorType: a.connectorType,
          recoveryMethod: a.recoveryMethod,
          imported: a.imported,
          delegated: a.delegated,
          walletIndex: a.walletIndex,
          publicKey: a.publicKey,
        },
        smartWallet: r && {
          address: r.address,
          smartWalletType: r.smartWalletType,
          smartWalletVersion: r.smartWalletVersion,
        },
        google: o && { subject: o.subject, email: o.email, name: o.name },
        twitter: s && {
          subject: s.subject,
          username: s.username,
          name: s.name,
          profilePictureUrl: s.profilePictureUrl,
        },
        discord: d && {
          subject: d.subject,
          username: d.username,
          email: d.email,
        },
        github: p && {
          subject: p.subject,
          username: p.username,
          name: p.name,
          email: p.email,
        },
        spotify: h && { subject: h.subject, email: h.email, name: h.name },
        instagram: f && { subject: f.subject, username: f.username },
        tiktok: m && { subject: m.subject, username: m.username, name: m.name },
        line: b && {
          subject: b.subject,
          name: b.name,
          email: b.email,
          profilePictureUrl: b.profilePictureUrl,
        },
        twitch: g && { subject: g.subject, username: g.username },
        linkedin: y && {
          subject: y.subject,
          name: y.name,
          email: y.email,
          vanityName: y.vanityName,
        },
        apple: _ && { subject: _.subject, email: _.email },
        farcaster: v && {
          fid: v.fid,
          ownerAddress: v.ownerAddress,
          displayName: v.displayName,
          username: v.username,
          bio: v.bio,
          pfp: v.pfp,
          url: v.url,
          signerPublicKey: v.signerPublicKey,
        },
        telegram: w && {
          telegramUserId: w.telegramUserId,
          firstName: w.firstName,
          lastName: w.lastName,
          username: w.username,
          photoUrl: w.photoUrl,
        },
        delegatedWallets: [],
        mfaMethods: k.map((e) => e.type),
        hasAcceptedTerms: e.has_accepted_terms ?? !1,
        isGuest: e.is_guest,
        customMetadata: e.custom_metadata,
      };
    },
    "z",
    0,
    "privy-token",
  ]);
};
