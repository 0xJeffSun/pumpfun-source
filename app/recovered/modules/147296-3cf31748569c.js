// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  "use strict";
  e.i(24727);
  var t = e.i(641449),
    i = e.i(165520);
  e.i(428531);
  var o = e.i(772072),
    r = e.i(601908);
  e.i(372412);
  var a = e.i(628850),
    s = e.i(450314),
    n = e.i(603797),
    c = e.i(8242),
    l = e.i(650883),
    w = e.i(376744),
    d = e.i(778818),
    p = e.i(191529),
    u = e.i(220752),
    m = e.i(92363),
    h = e.i(789336),
    f = e.i(184580);
  e.i(484695);
  var v = e.i(299055),
    g = e.i(664216),
    b = e.i(896343),
    y = t,
    x = e.i(940697);
  let k = x.m`
  :host {
    display: block;
    border-radius: clamp(0px, var(--wui-border-radius-l), 44px);
    box-shadow: 0 0 0 1px var(--wui-color-gray-glass-005);
    background-color: var(--wui-color-modal-bg);
    overflow: hidden;
  }

  :host([data-embedded='true']) {
    box-shadow:
      0 0 0 1px var(--wui-color-gray-glass-005),
      0px 4px 12px 4px var(--w3m-card-embedded-shadow-color);
  }
`,
    C = class extends y.f {
      render() {
        return i.c`<slot></slot>`;
      }
    };
  ((C.styles = [b.e, k]),
    (C = (function (e, t, i, o) {
      var r,
        a = arguments.length,
        s =
          a < 3
            ? t
            : null === o
              ? (o = Object.getOwnPropertyDescriptor(t, i))
              : o;
      if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
        s = Reflect.decorate(e, t, i, o);
      else
        for (var n = e.length - 1; n >= 0; n--)
          (r = e[n]) &&
            (s = (a < 3 ? r(s) : a > 3 ? r(t, i, s) : r(t, i)) || s);
      return (a > 3 && s && Object.defineProperty(t, i, s), s);
    })([(0, g.f)("wui-card")], C)),
    e.i(915389));
  var S = t,
    R = e.i(578108),
    T = t;
  (e.i(192234), e.i(135618), e.i(659355));
  let O = x.m`
  :host {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: var(--wui-spacing-s);
    border-radius: var(--wui-border-radius-s);
    border: 1px solid var(--wui-color-dark-glass-100);
    box-sizing: border-box;
    background-color: var(--wui-color-bg-325);
    box-shadow: 0px 0px 16px 0px rgba(0, 0, 0, 0.25);
  }

  wui-flex {
    width: 100%;
  }

  wui-text {
    word-break: break-word;
    flex: 1;
  }

  .close {
    cursor: pointer;
  }

  .icon-box {
    height: 40px;
    width: 40px;
    border-radius: var(--wui-border-radius-3xs);
    background-color: var(--local-icon-bg-value);
  }
`;
  var N = function (e, t, i, o) {
    var r,
      a = arguments.length,
      s =
        a < 3
          ? t
          : null === o
            ? (o = Object.getOwnPropertyDescriptor(t, i))
            : o;
    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
      s = Reflect.decorate(e, t, i, o);
    else
      for (var n = e.length - 1; n >= 0; n--)
        (r = e[n]) && (s = (a < 3 ? r(s) : a > 3 ? r(t, i, s) : r(t, i)) || s);
    return (a > 3 && s && Object.defineProperty(t, i, s), s);
  };
  let A = class extends T.f {
    constructor() {
      (super(...arguments),
        (this.message = ""),
        (this.backgroundColor = "accent-100"),
        (this.iconColor = "accent-100"),
        (this.icon = "info"));
    }
    render() {
      return (
        (this.style.cssText = `
      --local-icon-bg-value: var(--wui-color-${this.backgroundColor});
   `),
        i.c`
      <wui-flex flexDirection="row" justifyContent="space-between" alignItems="center">
        <wui-flex columnGap="xs" flexDirection="row" alignItems="center">
          <wui-flex
            flexDirection="row"
            alignItems="center"
            justifyContent="center"
            class="icon-box"
          >
            <wui-icon color=${this.iconColor} size="md" name=${this.icon}></wui-icon>
          </wui-flex>
          <wui-text variant="small-500" color="bg-350" data-testid="wui-alertbar-text"
            >${this.message}</wui-text
          >
        </wui-flex>
        <wui-icon
          class="close"
          color="bg-350"
          size="sm"
          name="close"
          @click=${this.onClose}
        ></wui-icon>
      </wui-flex>
    `
      );
    }
    onClose() {
      R.f.close();
    }
  };
  ((A.styles = [b.e, O]),
    N([(0, o.f)()], A.prototype, "message", void 0),
    N([(0, o.f)()], A.prototype, "backgroundColor", void 0),
    N([(0, o.f)()], A.prototype, "iconColor", void 0),
    N([(0, o.f)()], A.prototype, "icon", void 0),
    (A = N([(0, g.f)("wui-alertbar")], A)));
  let W = x.m`
  :host {
    display: block;
    position: absolute;
    top: var(--wui-spacing-s);
    left: var(--wui-spacing-l);
    right: var(--wui-spacing-l);
    opacity: 0;
    pointer-events: none;
  }
`;
  var $ = function (e, t, i, o) {
    var r,
      a = arguments.length,
      s =
        a < 3
          ? t
          : null === o
            ? (o = Object.getOwnPropertyDescriptor(t, i))
            : o;
    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
      s = Reflect.decorate(e, t, i, o);
    else
      for (var n = e.length - 1; n >= 0; n--)
        (r = e[n]) && (s = (a < 3 ? r(s) : a > 3 ? r(t, i, s) : r(t, i)) || s);
    return (a > 3 && s && Object.defineProperty(t, i, s), s);
  };
  let E = {
      info: { backgroundColor: "fg-350", iconColor: "fg-325", icon: "info" },
      success: {
        backgroundColor: "success-glass-reown-020",
        iconColor: "success-125",
        icon: "checkmark",
      },
      warning: {
        backgroundColor: "warning-glass-reown-020",
        iconColor: "warning-100",
        icon: "warningCircle",
      },
      error: {
        backgroundColor: "error-glass-reown-020",
        iconColor: "error-125",
        icon: "exclamationTriangle",
      },
    },
    I = class extends S.f {
      constructor() {
        (super(),
          (this.unsubscribe = []),
          (this.open = R.f.state.open),
          this.onOpen(!0),
          this.unsubscribe.push(
            R.f.subscribeKey("open", (e) => {
              ((this.open = e), this.onOpen(!1));
            }),
          ));
      }
      disconnectedCallback() {
        this.unsubscribe.forEach((e) => e());
      }
      render() {
        let { message: e, variant: t } = R.f.state,
          o = E[t];
        return i.c`
      <wui-alertbar
        message=${e}
        backgroundColor=${o?.backgroundColor}
        iconColor=${o?.iconColor}
        icon=${o?.icon}
      ></wui-alertbar>
    `;
      }
      onOpen(e) {
        this.open
          ? (this.animate(
              [
                { opacity: 0, transform: "scale(0.85)" },
                { opacity: 1, transform: "scale(1)" },
              ],
              { duration: 150, fill: "forwards", easing: "ease" },
            ),
            (this.style.cssText = "pointer-events: auto"))
          : e ||
            (this.animate(
              [
                { opacity: 1, transform: "scale(1)" },
                { opacity: 0, transform: "scale(0.85)" },
              ],
              { duration: 150, fill: "forwards", easing: "ease" },
            ),
            (this.style.cssText = "pointer-events: none"));
      }
    };
  ((I.styles = W),
    $([(0, r.f)()], I.prototype, "open", void 0),
    (I = $([(0, g.f)("w3m-alertbar")], I)));
  var P = t,
    j = e.i(656976),
    D = e.i(143301),
    B = e.i(530022),
    z = e.i(752954),
    L = e.i(931120),
    U = t;
  let K = x.m`
  button {
    border-radius: var(--local-border-radius);
    color: var(--wui-color-fg-100);
    padding: var(--local-padding);
  }

  @media (max-width: 700px) {
    button {
      padding: var(--wui-spacing-s);
    }
  }

  button > wui-icon {
    pointer-events: none;
  }

  button:disabled > wui-icon {
    color: var(--wui-color-bg-300) !important;
  }

  button:disabled {
    background-color: transparent;
  }
`;
  var H = function (e, t, i, o) {
    var r,
      a = arguments.length,
      s =
        a < 3
          ? t
          : null === o
            ? (o = Object.getOwnPropertyDescriptor(t, i))
            : o;
    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
      s = Reflect.decorate(e, t, i, o);
    else
      for (var n = e.length - 1; n >= 0; n--)
        (r = e[n]) && (s = (a < 3 ? r(s) : a > 3 ? r(t, i, s) : r(t, i)) || s);
    return (a > 3 && s && Object.defineProperty(t, i, s), s);
  };
  let X = class extends U.f {
    constructor() {
      (super(...arguments),
        (this.size = "md"),
        (this.disabled = !1),
        (this.icon = "copy"),
        (this.iconColor = "inherit"));
    }
    render() {
      let e =
          "lg" === this.size
            ? "--wui-border-radius-xs"
            : "--wui-border-radius-xxs",
        t = "lg" === this.size ? "--wui-spacing-1xs" : "--wui-spacing-2xs";
      return (
        (this.style.cssText = `
    --local-border-radius: var(${e});
    --local-padding: var(${t});
`),
        i.c`
      <button ?disabled=${this.disabled}>
        <wui-icon color=${this.iconColor} size=${this.size} name=${this.icon}></wui-icon>
      </button>
    `
      );
    }
  };
  ((X.styles = [b.e, b.j, b.G, K]),
    H([(0, o.f)()], X.prototype, "size", void 0),
    H([(0, o.f)({ type: Boolean })], X.prototype, "disabled", void 0),
    H([(0, o.f)()], X.prototype, "icon", void 0),
    H([(0, o.f)()], X.prototype, "iconColor", void 0),
    (X = H([(0, g.f)("wui-icon-link")], X)));
  var Y = t;
  (e.i(307060), e.i(809090));
  let V = x.m`
  button {
    display: block;
    display: flex;
    align-items: center;
    padding: var(--wui-spacing-xxs);
    gap: var(--wui-spacing-xxs);
    transition: all var(--wui-ease-out-power-1) var(--wui-duration-md);
    border-radius: var(--wui-border-radius-xxs);
  }

  wui-image {
    border-radius: 100%;
    width: var(--wui-spacing-xl);
    height: var(--wui-spacing-xl);
  }

  wui-icon-box {
    width: var(--wui-spacing-xl);
    height: var(--wui-spacing-xl);
  }

  button:hover {
    background-color: var(--wui-color-gray-glass-002);
  }

  button:active {
    background-color: var(--wui-color-gray-glass-005);
  }
`;
  var M = function (e, t, i, o) {
    var r,
      a = arguments.length,
      s =
        a < 3
          ? t
          : null === o
            ? (o = Object.getOwnPropertyDescriptor(t, i))
            : o;
    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
      s = Reflect.decorate(e, t, i, o);
    else
      for (var n = e.length - 1; n >= 0; n--)
        (r = e[n]) && (s = (a < 3 ? r(s) : a > 3 ? r(t, i, s) : r(t, i)) || s);
    return (a > 3 && s && Object.defineProperty(t, i, s), s);
  };
  let _ = class extends Y.f {
    constructor() {
      (super(...arguments), (this.imageSrc = ""));
    }
    render() {
      return i.c`<button>
      ${this.imageTemplate()}
      <wui-icon size="xs" color="fg-200" name="chevronBottom"></wui-icon>
    </button>`;
    }
    imageTemplate() {
      return this.imageSrc
        ? i.c`<wui-image src=${this.imageSrc} alt="select visual"></wui-image>`
        : i.c`<wui-icon-box
      size="xxs"
      iconColor="fg-200"
      backgroundColor="fg-100"
      background="opaque"
      icon="networkPlaceholder"
    ></wui-icon-box>`;
    }
  };
  ((_.styles = [b.e, b.j, b.G, V]),
    M([(0, o.f)()], _.prototype, "imageSrc", void 0),
    (_ = M([(0, g.f)("wui-select")], _)),
    e.i(625427),
    e.i(192523));
  var G = e.i(231109);
  let q = x.m`
  :host {
    height: 64px;
  }

  wui-text {
    text-transform: capitalize;
  }

  wui-flex.w3m-header-title {
    transform: translateY(0);
    opacity: 1;
  }

  wui-flex.w3m-header-title[view-direction='prev'] {
    animation:
      slide-down-out 120ms forwards var(--wui-ease-out-power-2),
      slide-down-in 120ms forwards var(--wui-ease-out-power-2);
    animation-delay: 0ms, 200ms;
  }

  wui-flex.w3m-header-title[view-direction='next'] {
    animation:
      slide-up-out 120ms forwards var(--wui-ease-out-power-2),
      slide-up-in 120ms forwards var(--wui-ease-out-power-2);
    animation-delay: 0ms, 200ms;
  }

  wui-icon-link[data-hidden='true'] {
    opacity: 0 !important;
    pointer-events: none;
  }

  @keyframes slide-up-out {
    from {
      transform: translateY(0px);
      opacity: 1;
    }
    to {
      transform: translateY(3px);
      opacity: 0;
    }
  }

  @keyframes slide-up-in {
    from {
      transform: translateY(-3px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }

  @keyframes slide-down-out {
    from {
      transform: translateY(0px);
      opacity: 1;
    }
    to {
      transform: translateY(-3px);
      opacity: 0;
    }
  }

  @keyframes slide-down-in {
    from {
      transform: translateY(3px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }
`;
  var F = function (e, t, i, o) {
    var r,
      a = arguments.length,
      s =
        a < 3
          ? t
          : null === o
            ? (o = Object.getOwnPropertyDescriptor(t, i))
            : o;
    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
      s = Reflect.decorate(e, t, i, o);
    else
      for (var n = e.length - 1; n >= 0; n--)
        (r = e[n]) && (s = (a < 3 ? r(s) : a > 3 ? r(t, i, s) : r(t, i)) || s);
    return (a > 3 && s && Object.defineProperty(t, i, s), s);
  };
  let J = ["SmartSessionList"];
  function Q() {
    let e = u.f.state.data?.connector?.name,
      t = u.f.state.data?.wallet?.name,
      i = u.f.state.data?.network?.name,
      o = t ?? e,
      r = l.f.getConnectors(),
      a = 1 === r.length && r[0]?.id === "w3m-email";
    return {
      Connect: `Connect ${a ? "Email" : ""} Wallet`,
      Create: "Create Wallet",
      ChooseAccountName: void 0,
      Account: void 0,
      AccountSettings: void 0,
      AllWallets: "All Wallets",
      ApproveTransaction: "Approve Transaction",
      BuyInProgress: "Buy",
      ConnectingExternal: o ?? "Connect Wallet",
      ConnectingWalletConnect: o ?? "WalletConnect",
      ConnectingWalletConnectBasic: "WalletConnect",
      ConnectingSiwe: "Sign In",
      Convert: "Convert",
      ConvertSelectToken: "Select token",
      ConvertPreview: "Preview convert",
      Downloads: o ? `Get ${o}` : "Downloads",
      EmailLogin: "Email Login",
      EmailVerifyOtp: "Confirm Email",
      EmailVerifyDevice: "Register Device",
      GetWallet: "Get a wallet",
      Networks: "Choose Network",
      OnRampProviders: "Choose Provider",
      OnRampActivity: "Activity",
      OnRampTokenSelect: "Select Token",
      OnRampFiatSelect: "Select Currency",
      Profile: void 0,
      SwitchNetwork: i ?? "Switch Network",
      SwitchAddress: "Switch Address",
      Transactions: "Activity",
      UnsupportedChain: "Switch Network",
      UpgradeEmailWallet: "Upgrade your Wallet",
      UpdateEmailWallet: "Edit Email",
      UpdateEmailPrimaryOtp: "Confirm Current Email",
      UpdateEmailSecondaryOtp: "Confirm New Email",
      WhatIsABuy: "What is Buy?",
      RegisterAccountName: "Choose name",
      RegisterAccountNameSuccess: "",
      WalletReceive: "Receive",
      WalletCompatibleNetworks: "Compatible Networks",
      Swap: "Swap",
      SwapSelectToken: "Select token",
      SwapPreview: "Preview swap",
      WalletSend: "Send",
      WalletSendPreview: "Review send",
      WalletSendSelectToken: "Select Token",
      WhatIsANetwork: "What is a network?",
      WhatIsAWallet: "What is a wallet?",
      ConnectWallets: "Connect wallet",
      ConnectSocials: "All socials",
      ConnectingSocial: j.f.state.socialProvider
        ? j.f.state.socialProvider
        : "Connect Social",
      ConnectingMultiChain: "Select chain",
      ConnectingFarcaster: "Farcaster",
      SwitchActiveChain: "Switch chain",
      SmartSessionCreated: void 0,
      SmartSessionList: "Smart Sessions",
      SIWXSignMessage: "Sign In",
    };
  }
  let Z = class extends P.f {
    constructor() {
      (super(),
        (this.unsubscribe = []),
        (this.heading = Q()[u.f.state.view]),
        (this.network = c.f.state.activeCaipNetwork),
        (this.networkImage = B.f.getNetworkImage(this.network)),
        (this.buffering = !1),
        (this.showBack = !1),
        (this.prevHistoryLength = 1),
        (this.view = u.f.state.view),
        (this.viewDirection = ""),
        (this.headerText = Q()[u.f.state.view]),
        this.unsubscribe.push(
          D.f.subscribeNetworkImages(() => {
            this.networkImage = B.f.getNetworkImage(this.network);
          }),
          u.f.subscribeKey("view", (e) => {
            (setTimeout(() => {
              ((this.view = e), (this.headerText = Q()[e]));
            }, G.f.ANIMATION_DURATIONS.HeaderText),
              this.onViewChange(),
              this.onHistoryChange());
          }),
          z.f.subscribeKey("buffering", (e) => (this.buffering = e)),
          c.f.subscribeKey("activeCaipNetwork", (e) => {
            ((this.network = e),
              (this.networkImage = B.f.getNetworkImage(this.network)));
          }),
        ));
    }
    disconnectCallback() {
      this.unsubscribe.forEach((e) => e());
    }
    render() {
      return i.c`
      <wui-flex .padding=${this.getPadding()} justifyContent="space-between" alignItems="center">
        ${this.leftHeaderTemplate()} ${this.titleTemplate()} ${this.rightHeaderTemplate()}
      </wui-flex>
    `;
    }
    onWalletHelp() {
      (L.f.sendEvent({ type: "track", event: "CLICK_WALLET_HELP" }),
        u.f.push("WhatIsAWallet"));
    }
    async onClose() {
      "UnsupportedChain" === u.f.state.view || (await m.f.isSIWXCloseDisabled())
        ? d.f.shake()
        : d.f.close();
    }
    rightHeaderTemplate() {
      let e = p.f?.state?.features?.smartSessions;
      return "Account" === u.f.state.view && e
        ? i.c`<wui-flex>
      <wui-icon-link
        icon="clock"
        @click=${() => u.f.push("SmartSessionList")}
        data-testid="w3m-header-smart-sessions"
      ></wui-icon-link>
      ${this.closeButtonTemplate()}
    </wui-flex> `
        : this.closeButtonTemplate();
    }
    closeButtonTemplate() {
      return i.c`
      <wui-icon-link
        ?disabled=${this.buffering}
        icon="close"
        @click=${this.onClose.bind(this)}
        data-testid="w3m-header-close"
      ></wui-icon-link>
    `;
    }
    titleTemplate() {
      let e = J.includes(this.view);
      return i.c`
      <wui-flex
        view-direction="${this.viewDirection}"
        class="w3m-header-title"
        alignItems="center"
        gap="xs"
      >
        <wui-text variant="paragraph-700" color="fg-100" data-testid="w3m-header-text"
          >${this.headerText}</wui-text
        >
        ${e ? i.c`<wui-tag variant="main">Beta</wui-tag>` : null}
      </wui-flex>
    `;
    }
    leftHeaderTemplate() {
      let { view: e } = u.f.state,
        t = "Connect" === e,
        o = p.f.state.enableEmbedded,
        r = p.f.state.enableNetworkSwitch;
      return "Account" === e && r
        ? i.c`<wui-select
        id="dynamic"
        data-testid="w3m-account-select-network"
        active-network=${(0, a.f)(this.network?.name)}
        @click=${this.onNetworks.bind(this)}
        imageSrc=${(0, a.f)(this.networkImage)}
      ></wui-select>`
        : this.showBack &&
            !("ApproveTransaction" === e || "ConnectingSiwe" === e || (t && o))
          ? i.c`<wui-icon-link
        data-testid="header-back"
        id="dynamic"
        icon="chevronLeft"
        ?disabled=${this.buffering}
        @click=${this.onGoBack.bind(this)}
      ></wui-icon-link>`
          : i.c`<wui-icon-link
      data-hidden=${!t}
      id="dynamic"
      icon="helpCircle"
      @click=${this.onWalletHelp.bind(this)}
    ></wui-icon-link>`;
    }
    onNetworks() {
      this.isAllowedNetworkSwitch() &&
        (L.f.sendEvent({ type: "track", event: "CLICK_NETWORKS" }),
        u.f.push("Networks"));
    }
    isAllowedNetworkSwitch() {
      let e = c.f.getAllRequestedCaipNetworks(),
        t = !!e && e.length > 1,
        i = e?.find(({ id: e }) => e === this.network?.id);
      return t || !i;
    }
    getPadding() {
      return this.heading ? ["l", "2l", "l", "2l"] : ["0", "2l", "0", "2l"];
    }
    onViewChange() {
      let { history: e } = u.f.state,
        t = G.f.VIEW_DIRECTION.Next;
      (e.length < this.prevHistoryLength && (t = G.f.VIEW_DIRECTION.Prev),
        (this.prevHistoryLength = e.length),
        (this.viewDirection = t));
    }
    async onHistoryChange() {
      let { history: e } = u.f.state,
        t = this.shadowRoot?.querySelector("#dynamic");
      e.length > 1 && !this.showBack && t
        ? (await t.animate([{ opacity: 1 }, { opacity: 0 }], {
            duration: 200,
            fill: "forwards",
            easing: "ease",
          }).finished,
          (this.showBack = !0),
          t.animate([{ opacity: 0 }, { opacity: 1 }], {
            duration: 200,
            fill: "forwards",
            easing: "ease",
          }))
        : e.length <= 1 &&
          this.showBack &&
          t &&
          (await t.animate([{ opacity: 1 }, { opacity: 0 }], {
            duration: 200,
            fill: "forwards",
            easing: "ease",
          }).finished,
          (this.showBack = !1),
          t.animate([{ opacity: 0 }, { opacity: 1 }], {
            duration: 200,
            fill: "forwards",
            easing: "ease",
          }));
    }
    onGoBack() {
      u.f.goBack();
    }
  };
  ((Z.styles = q),
    F([(0, r.f)()], Z.prototype, "heading", void 0),
    F([(0, r.f)()], Z.prototype, "network", void 0),
    F([(0, r.f)()], Z.prototype, "networkImage", void 0),
    F([(0, r.f)()], Z.prototype, "buffering", void 0),
    F([(0, r.f)()], Z.prototype, "showBack", void 0),
    F([(0, r.f)()], Z.prototype, "prevHistoryLength", void 0),
    F([(0, r.f)()], Z.prototype, "view", void 0),
    F([(0, r.f)()], Z.prototype, "viewDirection", void 0),
    F([(0, r.f)()], Z.prototype, "headerText", void 0),
    (Z = F([(0, g.f)("w3m-header")], Z)));
  var ee = t,
    et = t;
  e.i(381921);
  let ei = x.m`
  :host {
    display: flex;
    column-gap: var(--wui-spacing-s);
    align-items: center;
    padding: var(--wui-spacing-xs) var(--wui-spacing-m) var(--wui-spacing-xs) var(--wui-spacing-xs);
    border-radius: var(--wui-border-radius-s);
    border: 1px solid var(--wui-color-gray-glass-005);
    box-sizing: border-box;
    background-color: var(--wui-color-bg-175);
    box-shadow:
      0px 14px 64px -4px rgba(0, 0, 0, 0.15),
      0px 8px 22px -6px rgba(0, 0, 0, 0.15);

    max-width: 300px;
  }

  :host wui-loading-spinner {
    margin-left: var(--wui-spacing-3xs);
  }
`;
  var eo = function (e, t, i, o) {
    var r,
      a = arguments.length,
      s =
        a < 3
          ? t
          : null === o
            ? (o = Object.getOwnPropertyDescriptor(t, i))
            : o;
    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
      s = Reflect.decorate(e, t, i, o);
    else
      for (var n = e.length - 1; n >= 0; n--)
        (r = e[n]) && (s = (a < 3 ? r(s) : a > 3 ? r(t, i, s) : r(t, i)) || s);
    return (a > 3 && s && Object.defineProperty(t, i, s), s);
  };
  let er = class extends et.f {
    constructor() {
      (super(...arguments),
        (this.backgroundColor = "accent-100"),
        (this.iconColor = "accent-100"),
        (this.icon = "checkmark"),
        (this.message = ""),
        (this.loading = !1),
        (this.iconType = "default"));
    }
    render() {
      return i.c`
      ${this.templateIcon()}
      <wui-text variant="paragraph-500" color="fg-100" data-testid="wui-snackbar-message"
        >${this.message}</wui-text
      >
    `;
    }
    templateIcon() {
      return this.loading
        ? i.c`<wui-loading-spinner size="md" color="accent-100"></wui-loading-spinner>`
        : "default" === this.iconType
          ? i.c`<wui-icon size="xl" color=${this.iconColor} name=${this.icon}></wui-icon>`
          : i.c`<wui-icon-box
      size="sm"
      iconSize="xs"
      iconColor=${this.iconColor}
      backgroundColor=${this.backgroundColor}
      icon=${this.icon}
      background="opaque"
    ></wui-icon-box>`;
    }
  };
  ((er.styles = [b.e, ei]),
    eo([(0, o.f)()], er.prototype, "backgroundColor", void 0),
    eo([(0, o.f)()], er.prototype, "iconColor", void 0),
    eo([(0, o.f)()], er.prototype, "icon", void 0),
    eo([(0, o.f)()], er.prototype, "message", void 0),
    eo([(0, o.f)()], er.prototype, "loading", void 0),
    eo([(0, o.f)()], er.prototype, "iconType", void 0),
    (er = eo([(0, g.f)("wui-snackbar")], er)));
  let ea = x.m`
  :host {
    display: block;
    position: absolute;
    opacity: 0;
    pointer-events: none;
    top: 11px;
    left: 50%;
    width: max-content;
  }
`;
  var es = function (e, t, i, o) {
    var r,
      a = arguments.length,
      s =
        a < 3
          ? t
          : null === o
            ? (o = Object.getOwnPropertyDescriptor(t, i))
            : o;
    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
      s = Reflect.decorate(e, t, i, o);
    else
      for (var n = e.length - 1; n >= 0; n--)
        (r = e[n]) && (s = (a < 3 ? r(s) : a > 3 ? r(t, i, s) : r(t, i)) || s);
    return (a > 3 && s && Object.defineProperty(t, i, s), s);
  };
  let en = {
      loading: void 0,
      success: {
        backgroundColor: "success-100",
        iconColor: "success-100",
        icon: "checkmark",
      },
      error: {
        backgroundColor: "error-100",
        iconColor: "error-100",
        icon: "close",
      },
    },
    ec = class extends ee.f {
      constructor() {
        (super(),
          (this.unsubscribe = []),
          (this.timeout = void 0),
          (this.open = h.f.state.open),
          this.unsubscribe.push(
            h.f.subscribeKey("open", (e) => {
              ((this.open = e), this.onOpen());
            }),
          ));
      }
      disconnectedCallback() {
        (clearTimeout(this.timeout), this.unsubscribe.forEach((e) => e()));
      }
      render() {
        let { message: e, variant: t, svg: o } = h.f.state,
          r = en[t],
          { icon: a, iconColor: s } = o ?? r ?? {};
        return i.c`
      <wui-snackbar
        message=${e}
        backgroundColor=${r?.backgroundColor}
        iconColor=${s}
        icon=${a}
        .loading=${"loading" === t}
      ></wui-snackbar>
    `;
      }
      onOpen() {
        (clearTimeout(this.timeout),
          this.open
            ? (this.animate(
                [
                  { opacity: 0, transform: "translateX(-50%) scale(0.85)" },
                  { opacity: 1, transform: "translateX(-50%) scale(1)" },
                ],
                { duration: 150, fill: "forwards", easing: "ease" },
              ),
              this.timeout && clearTimeout(this.timeout),
              h.f.state.autoClose &&
                (this.timeout = setTimeout(() => h.f.hide(), 2500)))
            : this.animate(
                [
                  { opacity: 1, transform: "translateX(-50%) scale(1)" },
                  { opacity: 0, transform: "translateX(-50%) scale(0.85)" },
                ],
                { duration: 150, fill: "forwards", easing: "ease" },
              ));
      }
    };
  ((ec.styles = ea),
    es([(0, r.f)()], ec.prototype, "open", void 0),
    (ec = es([(0, g.f)("w3m-snackbar")], ec)));
  var el = t,
    ew = e.i(359702),
    ed = e.i(770924);
  let ep = (0, ew.s)({
      message: "",
      open: !1,
      triggerRect: { width: 0, height: 0, top: 0, left: 0 },
      variant: "shade",
    }),
    eu = {
      state: ep,
      subscribe: (e) => (0, ew.i)(ep, () => e(ep)),
      subscribeKey: (e, t) => (0, ed.T)(ep, e, t),
      showTooltip({ message: e, triggerRect: t, variant: i }) {
        ((ep.open = !0),
          (ep.message = e),
          (ep.triggerRect = t),
          (ep.variant = i));
      },
      hide() {
        ((ep.open = !1),
          (ep.message = ""),
          (ep.triggerRect = { width: 0, height: 0, top: 0, left: 0 }));
      },
    };
  e.i(820841);
  let em = x.m`
  :host {
    pointer-events: none;
  }

  :host > wui-flex {
    display: var(--w3m-tooltip-display);
    opacity: var(--w3m-tooltip-opacity);
    padding: 9px var(--wui-spacing-s) 10px var(--wui-spacing-s);
    border-radius: var(--wui-border-radius-xxs);
    color: var(--wui-color-bg-100);
    position: fixed;
    top: var(--w3m-tooltip-top);
    left: var(--w3m-tooltip-left);
    transform: translate(calc(-50% + var(--w3m-tooltip-parent-width)), calc(-100% - 8px));
    max-width: calc(var(--w3m-modal-width) - var(--wui-spacing-xl));
    transition: opacity 0.2s var(--wui-ease-out-power-2);
    will-change: opacity;
  }

  :host([data-variant='shade']) > wui-flex {
    background-color: var(--wui-color-bg-150);
    border: 1px solid var(--wui-color-gray-glass-005);
  }

  :host([data-variant='shade']) > wui-flex > wui-text {
    color: var(--wui-color-fg-150);
  }

  :host([data-variant='fill']) > wui-flex {
    background-color: var(--wui-color-fg-100);
    border: none;
  }

  wui-icon {
    position: absolute;
    width: 12px !important;
    height: 4px !important;
    color: var(--wui-color-bg-150);
  }

  wui-icon[data-placement='top'] {
    bottom: 0px;
    left: 50%;
    transform: translate(-50%, 95%);
  }

  wui-icon[data-placement='bottom'] {
    top: 0;
    left: 50%;
    transform: translate(-50%, -95%) rotate(180deg);
  }

  wui-icon[data-placement='right'] {
    top: 50%;
    left: 0;
    transform: translate(-65%, -50%) rotate(90deg);
  }

  wui-icon[data-placement='left'] {
    top: 50%;
    right: 0%;
    transform: translate(65%, -50%) rotate(270deg);
  }
`;
  var eh = function (e, t, i, o) {
    var r,
      a = arguments.length,
      s =
        a < 3
          ? t
          : null === o
            ? (o = Object.getOwnPropertyDescriptor(t, i))
            : o;
    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
      s = Reflect.decorate(e, t, i, o);
    else
      for (var n = e.length - 1; n >= 0; n--)
        (r = e[n]) && (s = (a < 3 ? r(s) : a > 3 ? r(t, i, s) : r(t, i)) || s);
    return (a > 3 && s && Object.defineProperty(t, i, s), s);
  };
  let ef = class extends el.f {
    constructor() {
      (super(),
        (this.unsubscribe = []),
        (this.open = eu.state.open),
        (this.message = eu.state.message),
        (this.triggerRect = eu.state.triggerRect),
        (this.variant = eu.state.variant),
        this.unsubscribe.push(
          eu.subscribe((e) => {
            ((this.open = e.open),
              (this.message = e.message),
              (this.triggerRect = e.triggerRect),
              (this.variant = e.variant));
          }),
        ));
    }
    disconnectedCallback() {
      this.unsubscribe.forEach((e) => e());
    }
    render() {
      this.dataset.variant = this.variant;
      let e = this.triggerRect.top,
        t = this.triggerRect.left;
      return (
        (this.style.cssText = `
    --w3m-tooltip-top: ${e}px;
    --w3m-tooltip-left: ${t}px;
    --w3m-tooltip-parent-width: ${this.triggerRect.width / 2}px;
    --w3m-tooltip-display: ${this.open ? "flex" : "none"};
    --w3m-tooltip-opacity: ${+!!this.open};
    `),
        i.c`<wui-flex>
      <wui-icon data-placement="top" color="fg-100" size="inherit" name="cursor"></wui-icon>
      <wui-text color="inherit" variant="small-500">${this.message}</wui-text>
    </wui-flex>`
      );
    }
  };
  ((ef.styles = [em]),
    eh([(0, r.f)()], ef.prototype, "open", void 0),
    eh([(0, r.f)()], ef.prototype, "message", void 0),
    eh([(0, r.f)()], ef.prototype, "triggerRect", void 0),
    eh([(0, r.f)()], ef.prototype, "variant", void 0),
    (ef = eh([(0, g.f)("w3m-tooltip"), (0, g.f)("w3m-tooltip")], ef)));
  var ev = t;
  let eg = x.m`
  :host {
    --prev-height: 0px;
    --new-height: 0px;
    display: block;
  }

  div.w3m-router-container {
    transform: translateY(0);
    opacity: 1;
  }

  div.w3m-router-container[view-direction='prev'] {
    animation:
      slide-left-out 150ms forwards ease,
      slide-left-in 150ms forwards ease;
    animation-delay: 0ms, 200ms;
  }

  div.w3m-router-container[view-direction='next'] {
    animation:
      slide-right-out 150ms forwards ease,
      slide-right-in 150ms forwards ease;
    animation-delay: 0ms, 200ms;
  }

  @keyframes slide-left-out {
    from {
      transform: translateX(0px);
      opacity: 1;
    }
    to {
      transform: translateX(10px);
      opacity: 0;
    }
  }

  @keyframes slide-left-in {
    from {
      transform: translateX(-10px);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }

  @keyframes slide-right-out {
    from {
      transform: translateX(0px);
      opacity: 1;
    }
    to {
      transform: translateX(-10px);
      opacity: 0;
    }
  }

  @keyframes slide-right-in {
    from {
      transform: translateX(10px);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
`;
  var eb = function (e, t, i, o) {
    var r,
      a = arguments.length,
      s =
        a < 3
          ? t
          : null === o
            ? (o = Object.getOwnPropertyDescriptor(t, i))
            : o;
    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
      s = Reflect.decorate(e, t, i, o);
    else
      for (var n = e.length - 1; n >= 0; n--)
        (r = e[n]) && (s = (a < 3 ? r(s) : a > 3 ? r(t, i, s) : r(t, i)) || s);
    return (a > 3 && s && Object.defineProperty(t, i, s), s);
  };
  let ey = class extends ev.f {
    constructor() {
      (super(),
        (this.resizeObserver = void 0),
        (this.prevHeight = "0px"),
        (this.prevHistoryLength = 1),
        (this.unsubscribe = []),
        (this.view = u.f.state.view),
        (this.viewDirection = ""),
        this.unsubscribe.push(
          u.f.subscribeKey("view", (e) => this.onViewChange(e)),
        ));
    }
    firstUpdated() {
      ((this.resizeObserver = new ResizeObserver(([e]) => {
        let t = `${e?.contentRect.height}px`;
        ("0px" !== this.prevHeight &&
          (this.style.setProperty("--prev-height", this.prevHeight),
          this.style.setProperty("--new-height", t),
          (this.style.animation = "w3m-view-height 150ms forwards ease"),
          (this.style.height = "auto")),
          setTimeout(() => {
            ((this.prevHeight = t), (this.style.animation = "unset"));
          }, G.f.ANIMATION_DURATIONS.ModalHeight));
      })),
        this.resizeObserver?.observe(this.getWrapper()));
    }
    disconnectedCallback() {
      (this.resizeObserver?.unobserve(this.getWrapper()),
        this.unsubscribe.forEach((e) => e()));
    }
    render() {
      return i.c`<div class="w3m-router-container" view-direction="${this.viewDirection}">
      ${this.viewTemplate()}
    </div>`;
    }
    viewTemplate() {
      switch (this.view) {
        case "AccountSettings":
          return i.c`<w3m-account-settings-view></w3m-account-settings-view>`;
        case "Account":
          return i.c`<w3m-account-view></w3m-account-view>`;
        case "AllWallets":
          return i.c`<w3m-all-wallets-view></w3m-all-wallets-view>`;
        case "ApproveTransaction":
          return i.c`<w3m-approve-transaction-view></w3m-approve-transaction-view>`;
        case "BuyInProgress":
          return i.c`<w3m-buy-in-progress-view></w3m-buy-in-progress-view>`;
        case "ChooseAccountName":
          return i.c`<w3m-choose-account-name-view></w3m-choose-account-name-view>`;
        case "Connect":
        default:
          return i.c`<w3m-connect-view></w3m-connect-view>`;
        case "Create":
          return i.c`<w3m-connect-view walletGuide="explore"></w3m-connect-view>`;
        case "ConnectingWalletConnect":
          return i.c`<w3m-connecting-wc-view></w3m-connecting-wc-view>`;
        case "ConnectingWalletConnectBasic":
          return i.c`<w3m-connecting-wc-basic-view></w3m-connecting-wc-basic-view>`;
        case "ConnectingExternal":
          return i.c`<w3m-connecting-external-view></w3m-connecting-external-view>`;
        case "ConnectingSiwe":
          return i.c`<w3m-connecting-siwe-view></w3m-connecting-siwe-view>`;
        case "ConnectWallets":
          return i.c`<w3m-connect-wallets-view></w3m-connect-wallets-view>`;
        case "ConnectSocials":
          return i.c`<w3m-connect-socials-view></w3m-connect-socials-view>`;
        case "ConnectingSocial":
          return i.c`<w3m-connecting-social-view></w3m-connecting-social-view>`;
        case "Downloads":
          return i.c`<w3m-downloads-view></w3m-downloads-view>`;
        case "EmailLogin":
          return i.c`<w3m-email-login-view></w3m-email-login-view>`;
        case "EmailVerifyOtp":
          return i.c`<w3m-email-verify-otp-view></w3m-email-verify-otp-view>`;
        case "EmailVerifyDevice":
          return i.c`<w3m-email-verify-device-view></w3m-email-verify-device-view>`;
        case "GetWallet":
          return i.c`<w3m-get-wallet-view></w3m-get-wallet-view>`;
        case "Networks":
          return i.c`<w3m-networks-view></w3m-networks-view>`;
        case "SwitchNetwork":
          return i.c`<w3m-network-switch-view></w3m-network-switch-view>`;
        case "Profile":
          return i.c`<w3m-profile-view></w3m-profile-view>`;
        case "SwitchAddress":
          return i.c`<w3m-switch-address-view></w3m-switch-address-view>`;
        case "Transactions":
          return i.c`<w3m-transactions-view></w3m-transactions-view>`;
        case "OnRampProviders":
          return i.c`<w3m-onramp-providers-view></w3m-onramp-providers-view>`;
        case "OnRampActivity":
          return i.c`<w3m-onramp-activity-view></w3m-onramp-activity-view>`;
        case "OnRampTokenSelect":
          return i.c`<w3m-onramp-token-select-view></w3m-onramp-token-select-view>`;
        case "OnRampFiatSelect":
          return i.c`<w3m-onramp-fiat-select-view></w3m-onramp-fiat-select-view>`;
        case "UpgradeEmailWallet":
          return i.c`<w3m-upgrade-wallet-view></w3m-upgrade-wallet-view>`;
        case "UpdateEmailWallet":
          return i.c`<w3m-update-email-wallet-view></w3m-update-email-wallet-view>`;
        case "UpdateEmailPrimaryOtp":
          return i.c`<w3m-update-email-primary-otp-view></w3m-update-email-primary-otp-view>`;
        case "UpdateEmailSecondaryOtp":
          return i.c`<w3m-update-email-secondary-otp-view></w3m-update-email-secondary-otp-view>`;
        case "UnsupportedChain":
          return i.c`<w3m-unsupported-chain-view></w3m-unsupported-chain-view>`;
        case "Swap":
          return i.c`<w3m-swap-view></w3m-swap-view>`;
        case "SwapSelectToken":
          return i.c`<w3m-swap-select-token-view></w3m-swap-select-token-view>`;
        case "SwapPreview":
          return i.c`<w3m-swap-preview-view></w3m-swap-preview-view>`;
        case "WalletSend":
          return i.c`<w3m-wallet-send-view></w3m-wallet-send-view>`;
        case "WalletSendSelectToken":
          return i.c`<w3m-wallet-send-select-token-view></w3m-wallet-send-select-token-view>`;
        case "WalletSendPreview":
          return i.c`<w3m-wallet-send-preview-view></w3m-wallet-send-preview-view>`;
        case "WhatIsABuy":
          return i.c`<w3m-what-is-a-buy-view></w3m-what-is-a-buy-view>`;
        case "WalletReceive":
          return i.c`<w3m-wallet-receive-view></w3m-wallet-receive-view>`;
        case "WalletCompatibleNetworks":
          return i.c`<w3m-wallet-compatible-networks-view></w3m-wallet-compatible-networks-view>`;
        case "WhatIsAWallet":
          return i.c`<w3m-what-is-a-wallet-view></w3m-what-is-a-wallet-view>`;
        case "ConnectingMultiChain":
          return i.c`<w3m-connecting-multi-chain-view></w3m-connecting-multi-chain-view>`;
        case "WhatIsANetwork":
          return i.c`<w3m-what-is-a-network-view></w3m-what-is-a-network-view>`;
        case "ConnectingFarcaster":
          return i.c`<w3m-connecting-farcaster-view></w3m-connecting-farcaster-view>`;
        case "SwitchActiveChain":
          return i.c`<w3m-switch-active-chain-view></w3m-switch-active-chain-view>`;
        case "RegisterAccountName":
          return i.c`<w3m-register-account-name-view></w3m-register-account-name-view>`;
        case "RegisterAccountNameSuccess":
          return i.c`<w3m-register-account-name-success-view></w3m-register-account-name-success-view>`;
        case "SmartSessionCreated":
          return i.c`<w3m-smart-session-created-view></w3m-smart-session-created-view>`;
        case "SmartSessionList":
          return i.c`<w3m-smart-session-list-view></w3m-smart-session-list-view>`;
        case "SIWXSignMessage":
          return i.c`<w3m-siwx-sign-message-view></w3m-siwx-sign-message-view>`;
      }
    }
    onViewChange(e) {
      eu.hide();
      let t = G.f.VIEW_DIRECTION.Next,
        { history: i } = u.f.state;
      (i.length < this.prevHistoryLength && (t = G.f.VIEW_DIRECTION.Prev),
        (this.prevHistoryLength = i.length),
        (this.viewDirection = t),
        setTimeout(() => {
          this.view = e;
        }, G.f.ANIMATION_DURATIONS.ViewTransition));
    }
    getWrapper() {
      return this.shadowRoot?.querySelector("div");
    }
  };
  ((ey.styles = eg),
    eb([(0, r.f)()], ey.prototype, "view", void 0),
    eb([(0, r.f)()], ey.prototype, "viewDirection", void 0),
    (ey = eb([(0, g.f)("w3m-router")], ey)));
  let ex = x.m`
  :host {
    z-index: var(--w3m-z-index);
    display: block;
    backface-visibility: hidden;
    will-change: opacity;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    pointer-events: none;
    opacity: 0;
    background-color: var(--wui-cover);
    transition: opacity 0.2s var(--wui-ease-out-power-2);
    will-change: opacity;
  }

  :host(.open) {
    opacity: 1;
  }

  :host(.embedded) {
    position: relative;
    pointer-events: unset;
    background: none;
    width: 100%;
    opacity: 1;
  }

  wui-card {
    max-width: var(--w3m-modal-width);
    width: 100%;
    position: relative;
    animation: zoom-in 0.2s var(--wui-ease-out-power-2);
    animation-fill-mode: backwards;
    outline: none;
    transition:
      border-radius var(--wui-duration-lg) var(--wui-ease-out-power-1),
      background-color var(--wui-duration-lg) var(--wui-ease-out-power-1);
    will-change: border-radius, background-color;
  }

  :host(.embedded) wui-card {
    max-width: 400px;
  }

  wui-card[shake='true'] {
    animation:
      zoom-in 0.2s var(--wui-ease-out-power-2),
      w3m-shake 0.5s var(--wui-ease-out-power-2);
  }

  wui-flex {
    overflow-x: hidden;
    overflow-y: auto;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
  }

  @media (max-height: 700px) and (min-width: 431px) {
    wui-flex {
      align-items: flex-start;
    }

    wui-card {
      margin: var(--wui-spacing-xxl) 0px;
    }
  }

  @media (max-width: 430px) {
    wui-flex {
      align-items: flex-end;
    }

    wui-card {
      max-width: 100%;
      border-bottom-left-radius: var(--local-border-bottom-mobile-radius);
      border-bottom-right-radius: var(--local-border-bottom-mobile-radius);
      border-bottom: none;
      animation: slide-in 0.2s var(--wui-ease-out-power-2);
    }

    wui-card[shake='true'] {
      animation:
        slide-in 0.2s var(--wui-ease-out-power-2),
        w3m-shake 0.5s var(--wui-ease-out-power-2);
    }
  }

  @keyframes zoom-in {
    0% {
      transform: scale(0.95) translateY(0);
    }
    100% {
      transform: scale(1) translateY(0);
    }
  }

  @keyframes slide-in {
    0% {
      transform: scale(1) translateY(50px);
    }
    100% {
      transform: scale(1) translateY(0);
    }
  }

  @keyframes w3m-shake {
    0% {
      transform: scale(1) rotate(0deg);
    }
    20% {
      transform: scale(1) rotate(-1deg);
    }
    40% {
      transform: scale(1) rotate(1.5deg);
    }
    60% {
      transform: scale(1) rotate(-1.5deg);
    }
    80% {
      transform: scale(1) rotate(1deg);
    }
    100% {
      transform: scale(1) rotate(0deg);
    }
  }

  @keyframes w3m-view-height {
    from {
      height: var(--prev-height);
    }
    to {
      height: var(--new-height);
    }
  }
`;
  var ek = function (e, t, i, o) {
    var r,
      a = arguments.length,
      s =
        a < 3
          ? t
          : null === o
            ? (o = Object.getOwnPropertyDescriptor(t, i))
            : o;
    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
      s = Reflect.decorate(e, t, i, o);
    else
      for (var n = e.length - 1; n >= 0; n--)
        (r = e[n]) && (s = (a < 3 ? r(s) : a > 3 ? r(t, i, s) : r(t, i)) || s);
    return (a > 3 && s && Object.defineProperty(t, i, s), s);
  };
  let eC = "scroll-lock",
    eS = class extends t.f {
      constructor() {
        (super(),
          (this.unsubscribe = []),
          (this.abortController = void 0),
          (this.hasPrefetched = !1),
          (this.enableEmbedded = p.f.state.enableEmbedded),
          (this.open = d.f.state.open),
          (this.caipAddress = c.f.state.activeCaipAddress),
          (this.caipNetwork = c.f.state.activeCaipNetwork),
          (this.shake = d.f.state.shake),
          (this.filterByNamespace = l.f.state.filterByNamespace),
          this.initializeTheming(),
          n.f.prefetchAnalyticsConfig(),
          this.unsubscribe.push(
            d.f.subscribeKey("open", (e) =>
              e ? this.onOpen() : this.onClose(),
            ),
            d.f.subscribeKey("shake", (e) => (this.shake = e)),
            c.f.subscribeKey("activeCaipNetwork", (e) => this.onNewNetwork(e)),
            c.f.subscribeKey("activeCaipAddress", (e) => this.onNewAddress(e)),
            p.f.subscribeKey(
              "enableEmbedded",
              (e) => (this.enableEmbedded = e),
            ),
            l.f.subscribeKey("filterByNamespace", (e) => {
              this.filterByNamespace === e ||
                c.f.getAccountData(e)?.caipAddress ||
                (n.f.fetchRecommendedWallets(), (this.filterByNamespace = e));
            }),
          ));
      }
      firstUpdated() {
        if (this.caipAddress) {
          if (this.enableEmbedded) {
            (d.f.close(), this.prefetch());
            return;
          }
          this.onNewAddress(this.caipAddress);
        }
        (this.open && this.onOpen(), this.enableEmbedded && this.prefetch());
      }
      disconnectedCallback() {
        (this.unsubscribe.forEach((e) => e()), this.onRemoveKeyboardListener());
      }
      render() {
        return ((this.style.cssText = `
      --local-border-bottom-mobile-radius: ${this.enableEmbedded ? "clamp(0px, var(--wui-border-radius-l), 44px)" : "0px"};
    `),
        this.enableEmbedded)
          ? i.c`${this.contentTemplate()}
        <w3m-tooltip></w3m-tooltip> `
          : this.open
            ? i.c`
          <wui-flex @click=${this.onOverlayClick.bind(this)} data-testid="w3m-modal-overlay">
            ${this.contentTemplate()}
          </wui-flex>
          <w3m-tooltip></w3m-tooltip>
        `
            : null;
      }
      contentTemplate() {
        return i.c` <wui-card
      shake="${this.shake}"
      data-embedded="${(0, a.f)(this.enableEmbedded)}"
      role="alertdialog"
      aria-modal="true"
      tabindex="0"
      data-testid="w3m-modal-card"
    >
      <w3m-header></w3m-header>
      <w3m-router></w3m-router>
      <w3m-snackbar></w3m-snackbar>
      <w3m-alertbar></w3m-alertbar>
    </wui-card>`;
      }
      async onOverlayClick(e) {
        e.target === e.currentTarget && (await this.handleClose());
      }
      async handleClose() {
        "UnsupportedChain" === u.f.state.view ||
        (await m.f.isSIWXCloseDisabled())
          ? d.f.shake()
          : d.f.close();
      }
      initializeTheming() {
        let { themeVariables: e, themeMode: t } = f.f.state,
          i = v.f.getColorTheme(t);
        (0, b.k)(e, i);
      }
      onClose() {
        ((this.open = !1),
          this.classList.remove("open"),
          this.onScrollUnlock(),
          h.f.hide(),
          this.onRemoveKeyboardListener());
      }
      onOpen() {
        ((this.open = !0),
          this.classList.add("open"),
          this.onScrollLock(),
          this.onAddKeyboardListener());
      }
      onScrollLock() {
        let e = document.createElement("style");
        ((e.dataset.w3m = eC),
          (e.textContent = `
      body {
        touch-action: none;
        overflow: hidden;
        overscroll-behavior: contain;
      }
      w3m-modal {
        pointer-events: auto;
      }
    `),
          document.head.appendChild(e));
      }
      onScrollUnlock() {
        let e = document.head.querySelector(`style[data-w3m="${eC}"]`);
        e && e.remove();
      }
      onAddKeyboardListener() {
        this.abortController = new AbortController();
        let e = this.shadowRoot?.querySelector("wui-card");
        (e?.focus(),
          window.addEventListener(
            "keydown",
            (t) => {
              if ("Escape" === t.key) this.handleClose();
              else if ("Tab" === t.key) {
                let { tagName: i } = t.target;
                !i || i.includes("W3M-") || i.includes("WUI-") || e?.focus();
              }
            },
            this.abortController,
          ));
      }
      onRemoveKeyboardListener() {
        (this.abortController?.abort(), (this.abortController = void 0));
      }
      async onNewAddress(e) {
        let t = c.f.state.isSwitchingNamespace,
          i = w.f.getPlainAddress(e);
        (i || t ? t && i && u.f.goBack() : d.f.close(),
          await m.f.initializeIfEnabled(),
          (this.caipAddress = e),
          c.f.setIsSwitchingNamespace(!1));
      }
      onNewNetwork(e) {
        let t = this.caipNetwork?.caipNetworkId?.toString(),
          i = e?.caipNetworkId?.toString(),
          o = c.f.state.isSwitchingNamespace,
          r = this.caipNetwork?.name === s.f.UNSUPPORTED_NETWORK_NAME,
          a = "ConnectingExternal" === u.f.state.view,
          n = !this.caipAddress,
          l = "UnsupportedChain" === u.f.state.view;
        (d.f.state.open &&
          !a &&
          (n || l || (t && i && t !== i && !r && !o)) &&
          u.f.goBack(),
          (this.caipNetwork = e));
      }
      prefetch() {
        this.hasPrefetched ||
          (n.f.prefetch(),
          n.f.fetchWallets({ page: 1 }),
          (this.hasPrefetched = !0));
      }
    };
  ((eS.styles = ex),
    ek([(0, o.f)({ type: Boolean })], eS.prototype, "enableEmbedded", void 0),
    ek([(0, r.f)()], eS.prototype, "open", void 0),
    ek([(0, r.f)()], eS.prototype, "caipAddress", void 0),
    ek([(0, r.f)()], eS.prototype, "caipNetwork", void 0),
    ek([(0, r.f)()], eS.prototype, "shake", void 0),
    ek([(0, r.f)()], eS.prototype, "filterByNamespace", void 0),
    (eS = ek([(0, g.f)("w3m-modal")], eS)),
    e.s(["W3mModal", 0, eS], 794436),
    e.i(794436),
    e.s(["W3mModal", 0, eS], 147296));
};
