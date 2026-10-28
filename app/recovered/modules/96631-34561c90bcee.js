// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(t) => {
  "use strict";
  t.i(24727);
  var e = t.i(641449),
    i = t.i(165520);
  t.i(428531);
  var r = t.i(601908),
    o = t.i(603797),
    n = t.i(376744),
    a = t.i(191529),
    s = t.i(489083);
  t.i(484695);
  var l = t.i(664216);
  t.i(915389);
  var c = e,
    u = t.i(772072);
  t.i(372412);
  var d = t.i(628850),
    h = t.i(650883),
    p = t.i(931120),
    f = t.i(220752),
    g = e;
  (t.i(192234), t.i(135618), t.i(809090));
  var w = t.i(896343),
    b = e;
  t.i(659355);
  var m = e;
  t.i(307060);
  var v = t.i(940697);
  let y = v.m`
  :host {
    position: relative;
    background-color: var(--wui-color-gray-glass-002);
    display: flex;
    justify-content: center;
    align-items: center;
    width: var(--local-size);
    height: var(--local-size);
    border-radius: inherit;
    border-radius: var(--local-border-radius);
  }

  :host > wui-flex {
    overflow: hidden;
    border-radius: inherit;
    border-radius: var(--local-border-radius);
  }

  :host::after {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    border-radius: inherit;
    border: 1px solid var(--wui-color-gray-glass-010);
    pointer-events: none;
  }

  :host([name='Extension'])::after {
    border: 1px solid var(--wui-color-accent-glass-010);
  }

  :host([data-wallet-icon='allWallets']) {
    background-color: var(--wui-all-wallets-bg-100);
  }

  :host([data-wallet-icon='allWallets'])::after {
    border: 1px solid var(--wui-color-accent-glass-010);
  }

  wui-icon[data-parent-size='inherit'] {
    width: 75%;
    height: 75%;
    align-items: center;
  }

  wui-icon[data-parent-size='sm'] {
    width: 18px;
    height: 18px;
  }

  wui-icon[data-parent-size='md'] {
    width: 24px;
    height: 24px;
  }

  wui-icon[data-parent-size='lg'] {
    width: 42px;
    height: 42px;
  }

  wui-icon[data-parent-size='full'] {
    width: 100%;
    height: 100%;
  }

  :host > wui-icon-box {
    position: absolute;
    overflow: hidden;
    right: -1px;
    bottom: -2px;
    z-index: 1;
    border: 2px solid var(--wui-color-bg-150, #1e1f1f);
    padding: 1px;
  }
`;
  var x = function (t, e, i, r) {
    var o,
      n = arguments.length,
      a =
        n < 3
          ? e
          : null === r
            ? (r = Object.getOwnPropertyDescriptor(e, i))
            : r;
    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
      a = Reflect.decorate(t, e, i, r);
    else
      for (var s = t.length - 1; s >= 0; s--)
        (o = t[s]) && (a = (n < 3 ? o(a) : n > 3 ? o(e, i, a) : o(e, i)) || a);
    return (n > 3 && a && Object.defineProperty(e, i, a), a);
  };
  let $ = class extends m.f {
    constructor() {
      (super(...arguments),
        (this.size = "md"),
        (this.name = ""),
        (this.installed = !1),
        (this.badgeSize = "xs"));
    }
    render() {
      let t = "xxs";
      return (
        (t = "lg" === this.size ? "m" : "md" === this.size ? "xs" : "xxs"),
        (this.style.cssText = `
       --local-border-radius: var(--wui-border-radius-${t});
       --local-size: var(--wui-wallet-image-size-${this.size});
   `),
        this.walletIcon && (this.dataset.walletIcon = this.walletIcon),
        i.c`
      <wui-flex justifyContent="center" alignItems="center"> ${this.templateVisual()} </wui-flex>
    `
      );
    }
    templateVisual() {
      return this.imageSrc
        ? i.c`<wui-image src=${this.imageSrc} alt=${this.name}></wui-image>`
        : this.walletIcon
          ? i.c`<wui-icon
        data-parent-size="md"
        size="md"
        color="inherit"
        name=${this.walletIcon}
      ></wui-icon>`
          : i.c`<wui-icon
      data-parent-size=${this.size}
      size="inherit"
      color="inherit"
      name="walletPlaceholder"
    ></wui-icon>`;
    }
  };
  (($.styles = [w.j, w.e, y]),
    x([(0, u.f)()], $.prototype, "size", void 0),
    x([(0, u.f)()], $.prototype, "name", void 0),
    x([(0, u.f)()], $.prototype, "imageSrc", void 0),
    x([(0, u.f)()], $.prototype, "walletIcon", void 0),
    x([(0, u.f)({ type: Boolean })], $.prototype, "installed", void 0),
    x([(0, u.f)()], $.prototype, "badgeSize", void 0),
    ($ = x([(0, l.f)("wui-wallet-image")], $)));
  let C = v.m`
  :host {
    position: relative;
    border-radius: var(--wui-border-radius-xxs);
    width: 40px;
    height: 40px;
    overflow: hidden;
    background: var(--wui-color-gray-glass-002);
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    gap: var(--wui-spacing-4xs);
    padding: 3.75px !important;
  }

  :host::after {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    border-radius: inherit;
    border: 1px solid var(--wui-color-gray-glass-010);
    pointer-events: none;
  }

  :host > wui-wallet-image {
    width: 14px;
    height: 14px;
    border-radius: var(--wui-border-radius-5xs);
  }

  :host > wui-flex {
    padding: 2px;
    position: fixed;
    overflow: hidden;
    left: 34px;
    bottom: 8px;
    background: var(--dark-background-150, #1e1f1f);
    border-radius: 50%;
    z-index: 2;
    display: flex;
  }
`;
  var k = function (t, e, i, r) {
    var o,
      n = arguments.length,
      a =
        n < 3
          ? e
          : null === r
            ? (r = Object.getOwnPropertyDescriptor(e, i))
            : r;
    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
      a = Reflect.decorate(t, e, i, r);
    else
      for (var s = t.length - 1; s >= 0; s--)
        (o = t[s]) && (a = (n < 3 ? o(a) : n > 3 ? o(e, i, a) : o(e, i)) || a);
    return (n > 3 && a && Object.defineProperty(e, i, a), a);
  };
  let R = class extends b.f {
    constructor() {
      (super(...arguments), (this.walletImages = []));
    }
    render() {
      let t = this.walletImages.length < 4;
      return i.c`${this.walletImages.slice(0, 4).map(
        ({ src: t, walletName: e }) => i.c`
            <wui-wallet-image
              size="inherit"
              imageSrc=${t}
              name=${(0, d.f)(e)}
            ></wui-wallet-image>
          `,
      )}
      ${t ? [...Array(4 - this.walletImages.length)].map(() => i.c` <wui-wallet-image size="inherit" name=""></wui-wallet-image>`) : null}
      <wui-flex>
        <wui-icon-box
          size="xxs"
          iconSize="xxs"
          iconcolor="success-100"
          backgroundcolor="success-100"
          icon="checkmark"
          background="opaque"
        ></wui-icon-box>
      </wui-flex>`;
    }
  };
  ((R.styles = [w.e, C]),
    k([(0, u.f)({ type: Array })], R.prototype, "walletImages", void 0),
    (R = k([(0, l.f)("wui-all-wallets-image")], R)),
    t.i(625427));
  let I = v.m`
  button {
    column-gap: var(--wui-spacing-s);
    padding: 7px var(--wui-spacing-l) 7px var(--wui-spacing-xs);
    width: 100%;
    background-color: var(--wui-color-gray-glass-002);
    border-radius: var(--wui-border-radius-xs);
    color: var(--wui-color-fg-100);
  }

  button > wui-text:nth-child(2) {
    display: flex;
    flex: 1;
  }

  button:disabled {
    background-color: var(--wui-color-gray-glass-015);
    color: var(--wui-color-gray-glass-015);
  }

  button:disabled > wui-tag {
    background-color: var(--wui-color-gray-glass-010);
    color: var(--wui-color-fg-300);
  }

  wui-icon {
    color: var(--wui-color-fg-200) !important;
  }
`;
  var E = function (t, e, i, r) {
    var o,
      n = arguments.length,
      a =
        n < 3
          ? e
          : null === r
            ? (r = Object.getOwnPropertyDescriptor(e, i))
            : r;
    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
      a = Reflect.decorate(t, e, i, r);
    else
      for (var s = t.length - 1; s >= 0; s--)
        (o = t[s]) && (a = (n < 3 ? o(a) : n > 3 ? o(e, i, a) : o(e, i)) || a);
    return (n > 3 && a && Object.defineProperty(e, i, a), a);
  };
  let T = class extends g.f {
    constructor() {
      (super(...arguments),
        (this.walletImages = []),
        (this.imageSrc = ""),
        (this.name = ""),
        (this.tabIdx = void 0),
        (this.installed = !1),
        (this.disabled = !1),
        (this.showAllWallets = !1),
        (this.loading = !1),
        (this.loadingSpinnerColor = "accent-100"));
    }
    render() {
      return i.c`
      <button ?disabled=${this.disabled} tabindex=${(0, d.f)(this.tabIdx)}>
        ${this.templateAllWallets()} ${this.templateWalletImage()}
        <wui-text variant="paragraph-500" color="inherit">${this.name}</wui-text>
        ${this.templateStatus()}
      </button>
    `;
    }
    templateAllWallets() {
      return this.showAllWallets && this.imageSrc
        ? i.c` <wui-all-wallets-image .imageeSrc=${this.imageSrc}> </wui-all-wallets-image> `
        : this.showAllWallets && this.walletIcon
          ? i.c` <wui-wallet-image .walletIcon=${this.walletIcon} size="sm"> </wui-wallet-image> `
          : null;
    }
    templateWalletImage() {
      return !this.showAllWallets && this.imageSrc
        ? i.c`<wui-wallet-image
        size="sm"
        imageSrc=${this.imageSrc}
        name=${this.name}
        .installed=${this.installed}
      ></wui-wallet-image>`
        : this.showAllWallets || this.imageSrc
          ? null
          : i.c`<wui-wallet-image size="sm" name=${this.name}></wui-wallet-image>`;
    }
    templateStatus() {
      return this.loading
        ? i.c`<wui-loading-spinner
        size="lg"
        color=${this.loadingSpinnerColor}
      ></wui-loading-spinner>`
        : this.tagLabel && this.tagVariant
          ? i.c`<wui-tag variant=${this.tagVariant}>${this.tagLabel}</wui-tag>`
          : this.icon
            ? i.c`<wui-icon color="inherit" size="sm" name=${this.icon}></wui-icon>`
            : null;
    }
  };
  ((T.styles = [w.e, w.j, I]),
    E([(0, u.f)({ type: Array })], T.prototype, "walletImages", void 0),
    E([(0, u.f)()], T.prototype, "imageSrc", void 0),
    E([(0, u.f)()], T.prototype, "name", void 0),
    E([(0, u.f)()], T.prototype, "tagLabel", void 0),
    E([(0, u.f)()], T.prototype, "tagVariant", void 0),
    E([(0, u.f)()], T.prototype, "icon", void 0),
    E([(0, u.f)()], T.prototype, "walletIcon", void 0),
    E([(0, u.f)()], T.prototype, "tabIdx", void 0),
    E([(0, u.f)({ type: Boolean })], T.prototype, "installed", void 0),
    E([(0, u.f)({ type: Boolean })], T.prototype, "disabled", void 0),
    E([(0, u.f)({ type: Boolean })], T.prototype, "showAllWallets", void 0),
    E([(0, u.f)({ type: Boolean })], T.prototype, "loading", void 0),
    E([(0, u.f)({ type: String })], T.prototype, "loadingSpinnerColor", void 0),
    (T = E([(0, l.f)("wui-list-wallet")], T)));
  var S = function (t, e, i, r) {
    var o,
      n = arguments.length,
      a =
        n < 3
          ? e
          : null === r
            ? (r = Object.getOwnPropertyDescriptor(e, i))
            : r;
    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
      a = Reflect.decorate(t, e, i, r);
    else
      for (var s = t.length - 1; s >= 0; s--)
        (o = t[s]) && (a = (n < 3 ? o(a) : n > 3 ? o(e, i, a) : o(e, i)) || a);
    return (n > 3 && a && Object.defineProperty(e, i, a), a);
  };
  let j = class extends c.f {
    constructor() {
      (super(),
        (this.unsubscribe = []),
        (this.tabIdx = void 0),
        (this.connectors = h.f.state.connectors),
        (this.count = o.f.state.count),
        (this.isFetchingRecommendedWallets =
          o.f.state.isFetchingRecommendedWallets),
        this.unsubscribe.push(
          h.f.subscribeKey("connectors", (t) => (this.connectors = t)),
          o.f.subscribeKey("count", (t) => (this.count = t)),
          o.f.subscribeKey(
            "isFetchingRecommendedWallets",
            (t) => (this.isFetchingRecommendedWallets = t),
          ),
        ));
    }
    disconnectedCallback() {
      this.unsubscribe.forEach((t) => t());
    }
    render() {
      let t = this.connectors.find((t) => "walletConnect" === t.id),
        { allWallets: e } = a.f.state;
      if (!t || "HIDE" === e || ("ONLY_MOBILE" === e && !n.f.isMobile()))
        return null;
      let r = o.f.state.featured.length,
        s = this.count + r,
        l = s < 10 ? s : 10 * Math.floor(s / 10),
        c = l < s ? `${l}+` : `${l}`;
      return i.c`
      <wui-list-wallet
        name="All Wallets"
        walletIcon="allWallets"
        showAllWallets
        @click=${this.onAllWallets.bind(this)}
        tagLabel=${c}
        tagVariant="shade"
        data-testid="all-wallets"
        tabIdx=${(0, d.f)(this.tabIdx)}
        .loading=${this.isFetchingRecommendedWallets}
        loadingSpinnerColor=${this.isFetchingRecommendedWallets ? "fg-300" : "accent-100"}
      ></wui-list-wallet>
    `;
    }
    onAllWallets() {
      (p.f.sendEvent({ type: "track", event: "CLICK_ALL_WALLETS" }),
        f.f.push("AllWallets"));
    }
  };
  (S([(0, u.f)()], j.prototype, "tabIdx", void 0),
    S([(0, r.f)()], j.prototype, "connectors", void 0),
    S([(0, r.f)()], j.prototype, "count", void 0),
    S([(0, r.f)()], j.prototype, "isFetchingRecommendedWallets", void 0),
    (j = S([(0, l.f)("w3m-all-wallets-widget")], j)));
  var P = e,
    O = e,
    L = t.i(530022),
    A = t.i(662702),
    B = function (t, e, i, r) {
      var o,
        n = arguments.length,
        a =
          n < 3
            ? e
            : null === r
              ? (r = Object.getOwnPropertyDescriptor(e, i))
              : r;
      if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
        a = Reflect.decorate(t, e, i, r);
      else
        for (var s = t.length - 1; s >= 0; s--)
          (o = t[s]) &&
            (a = (n < 3 ? o(a) : n > 3 ? o(e, i, a) : o(e, i)) || a);
      return (n > 3 && a && Object.defineProperty(e, i, a), a);
    };
  let z = class extends O.f {
    constructor() {
      (super(),
        (this.unsubscribe = []),
        (this.tabIdx = void 0),
        (this.connectors = h.f.state.connectors),
        this.unsubscribe.push(
          h.f.subscribeKey("connectors", (t) => (this.connectors = t)),
        ));
    }
    disconnectedCallback() {
      this.unsubscribe.forEach((t) => t());
    }
    render() {
      let t = this.connectors.filter((t) => "ANNOUNCED" === t.type);
      return t?.length
        ? i.c`
      <wui-flex flexDirection="column" gap="xs">
        ${t.filter(A.f.showConnector).map(
          (t) => i.c`
              <wui-list-wallet
                imageSrc=${(0, d.f)(L.f.getConnectorImage(t))}
                name=${t.name ?? "Unknown"}
                @click=${() => this.onConnector(t)}
                tagVariant="success"
                tagLabel="installed"
                data-testid=${`wallet-selector-${t.id}`}
                .installed=${!0}
                tabIdx=${(0, d.f)(this.tabIdx)}
              >
              </wui-list-wallet>
            `,
        )}
      </wui-flex>
    `
        : ((this.style.cssText = "display: none"), null);
    }
    onConnector(t) {
      "walletConnect" === t.id
        ? n.f.isMobile()
          ? f.f.push("AllWallets")
          : f.f.push("ConnectingWalletConnect")
        : f.f.push("ConnectingExternal", { connector: t });
    }
  };
  (B([(0, u.f)()], z.prototype, "tabIdx", void 0),
    B([(0, r.f)()], z.prototype, "connectors", void 0),
    (z = B([(0, l.f)("w3m-connect-announced-widget")], z)));
  var W = e,
    D = t.i(752954),
    N = function (t, e, i, r) {
      var o,
        n = arguments.length,
        a =
          n < 3
            ? e
            : null === r
              ? (r = Object.getOwnPropertyDescriptor(e, i))
              : r;
      if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
        a = Reflect.decorate(t, e, i, r);
      else
        for (var s = t.length - 1; s >= 0; s--)
          (o = t[s]) &&
            (a = (n < 3 ? o(a) : n > 3 ? o(e, i, a) : o(e, i)) || a);
      return (n > 3 && a && Object.defineProperty(e, i, a), a);
    };
  let M = class extends W.f {
    constructor() {
      (super(),
        (this.unsubscribe = []),
        (this.tabIdx = void 0),
        (this.connectors = h.f.state.connectors),
        (this.loading = !1),
        this.unsubscribe.push(
          h.f.subscribeKey("connectors", (t) => (this.connectors = t)),
        ),
        n.f.isTelegram() &&
          n.f.isIos() &&
          ((this.loading = !D.f.state.wcUri),
          this.unsubscribe.push(
            D.f.subscribeKey("wcUri", (t) => (this.loading = !t)),
          )));
    }
    disconnectedCallback() {
      this.unsubscribe.forEach((t) => t());
    }
    render() {
      let { customWallets: t } = a.f.state;
      if (!t?.length) return ((this.style.cssText = "display: none"), null);
      let e = this.filterOutDuplicateWallets(t);
      return i.c`<wui-flex flexDirection="column" gap="xs">
      ${e.map(
        (t) => i.c`
          <wui-list-wallet
            imageSrc=${(0, d.f)(L.f.getWalletImage(t))}
            name=${t.name ?? "Unknown"}
            @click=${() => this.onConnectWallet(t)}
            data-testid=${`wallet-selector-${t.id}`}
            tabIdx=${(0, d.f)(this.tabIdx)}
            ?loading=${this.loading}
          >
          </wui-list-wallet>
        `,
      )}
    </wui-flex>`;
    }
    filterOutDuplicateWallets(t) {
      let e = s.f.getRecentWallets(),
        i = this.connectors.map((t) => t.info?.rdns).filter(Boolean),
        r = e.map((t) => t.rdns).filter(Boolean),
        o = i.concat(r);
      if (o.includes("io.metamask.mobile") && n.f.isMobile()) {
        let t = o.indexOf("io.metamask.mobile");
        o[t] = "io.metamask";
      }
      return t.filter((t) => !o.includes(String(t?.rdns)));
    }
    onConnectWallet(t) {
      this.loading || f.f.push("ConnectingWalletConnect", { wallet: t });
    }
  };
  (N([(0, u.f)()], M.prototype, "tabIdx", void 0),
    N([(0, r.f)()], M.prototype, "connectors", void 0),
    N([(0, r.f)()], M.prototype, "loading", void 0),
    (M = N([(0, l.f)("w3m-connect-custom-widget")], M)));
  var U = e,
    q = t.i(450314),
    V = function (t, e, i, r) {
      var o,
        n = arguments.length,
        a =
          n < 3
            ? e
            : null === r
              ? (r = Object.getOwnPropertyDescriptor(e, i))
              : r;
      if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
        a = Reflect.decorate(t, e, i, r);
      else
        for (var s = t.length - 1; s >= 0; s--)
          (o = t[s]) &&
            (a = (n < 3 ? o(a) : n > 3 ? o(e, i, a) : o(e, i)) || a);
      return (n > 3 && a && Object.defineProperty(e, i, a), a);
    };
  let _ = class extends U.f {
    constructor() {
      (super(),
        (this.unsubscribe = []),
        (this.tabIdx = void 0),
        (this.connectors = h.f.state.connectors),
        this.unsubscribe.push(
          h.f.subscribeKey("connectors", (t) => (this.connectors = t)),
        ));
    }
    disconnectedCallback() {
      this.unsubscribe.forEach((t) => t());
    }
    render() {
      let t = this.connectors
        .filter((t) => "EXTERNAL" === t.type)
        .filter((t) => t.id !== q.f.CONNECTOR_ID.COINBASE_SDK);
      return t?.length
        ? i.c`
      <wui-flex flexDirection="column" gap="xs">
        ${t.map(
          (t) => i.c`
            <wui-list-wallet
              imageSrc=${(0, d.f)(L.f.getConnectorImage(t))}
              .installed=${!0}
              name=${t.name ?? "Unknown"}
              data-testid=${`wallet-selector-external-${t.id}`}
              @click=${() => this.onConnector(t)}
              tabIdx=${(0, d.f)(this.tabIdx)}
            >
            </wui-list-wallet>
          `,
        )}
      </wui-flex>
    `
        : ((this.style.cssText = "display: none"), null);
    }
    onConnector(t) {
      f.f.push("ConnectingExternal", { connector: t });
    }
  };
  (V([(0, u.f)()], _.prototype, "tabIdx", void 0),
    V([(0, r.f)()], _.prototype, "connectors", void 0),
    (_ = V([(0, l.f)("w3m-connect-external-widget")], _)));
  var K = e,
    H = function (t, e, i, r) {
      var o,
        n = arguments.length,
        a =
          n < 3
            ? e
            : null === r
              ? (r = Object.getOwnPropertyDescriptor(e, i))
              : r;
      if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
        a = Reflect.decorate(t, e, i, r);
      else
        for (var s = t.length - 1; s >= 0; s--)
          (o = t[s]) &&
            (a = (n < 3 ? o(a) : n > 3 ? o(e, i, a) : o(e, i)) || a);
      return (n > 3 && a && Object.defineProperty(e, i, a), a);
    };
  let F = class extends K.f {
    constructor() {
      (super(...arguments), (this.tabIdx = void 0), (this.wallets = []));
    }
    render() {
      return this.wallets.length
        ? i.c`
      <wui-flex flexDirection="column" gap="xs">
        ${this.wallets.map(
          (t) => i.c`
            <wui-list-wallet
              data-testid=${`wallet-selector-featured-${t.id}`}
              imageSrc=${(0, d.f)(L.f.getWalletImage(t))}
              name=${t.name ?? "Unknown"}
              @click=${() => this.onConnectWallet(t)}
              tabIdx=${(0, d.f)(this.tabIdx)}
            >
            </wui-list-wallet>
          `,
        )}
      </wui-flex>
    `
        : ((this.style.cssText = "display: none"), null);
    }
    onConnectWallet(t) {
      h.f.selectWalletConnector(t);
    }
  };
  (H([(0, u.f)()], F.prototype, "tabIdx", void 0),
    H([(0, u.f)()], F.prototype, "wallets", void 0),
    (F = H([(0, l.f)("w3m-connect-featured-widget")], F)));
  var Y = e,
    G = function (t, e, i, r) {
      var o,
        n = arguments.length,
        a =
          n < 3
            ? e
            : null === r
              ? (r = Object.getOwnPropertyDescriptor(e, i))
              : r;
      if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
        a = Reflect.decorate(t, e, i, r);
      else
        for (var s = t.length - 1; s >= 0; s--)
          (o = t[s]) &&
            (a = (n < 3 ? o(a) : n > 3 ? o(e, i, a) : o(e, i)) || a);
      return (n > 3 && a && Object.defineProperty(e, i, a), a);
    };
  let J = class extends Y.f {
    constructor() {
      (super(...arguments), (this.tabIdx = void 0), (this.connectors = []));
    }
    render() {
      let t = this.connectors;
      return t?.length &&
        (1 !== t.length || t[0]?.name !== "Browser Wallet" || n.f.isMobile())
        ? i.c`
      <wui-flex flexDirection="column" gap="xs">
        ${t.map((t) => {
          let e = t.info?.rdns;
          return n.f.isMobile() || "Browser Wallet" !== t.name
            ? e || D.f.checkInstalled()
              ? A.f.showConnector(t)
                ? i.c`
            <wui-list-wallet
              imageSrc=${(0, d.f)(L.f.getConnectorImage(t))}
              .installed=${!0}
              name=${t.name ?? "Unknown"}
              tagVariant="success"
              tagLabel="installed"
              data-testid=${`wallet-selector-${t.id}`}
              @click=${() => this.onConnector(t)}
              tabIdx=${(0, d.f)(this.tabIdx)}
            >
            </wui-list-wallet>
          `
                : null
              : ((this.style.cssText = "display: none"), null)
            : null;
        })}
      </wui-flex>
    `
        : ((this.style.cssText = "display: none"), null);
    }
    onConnector(t) {
      (h.f.setActiveConnector(t),
        f.f.push("ConnectingExternal", { connector: t }));
    }
  };
  (G([(0, u.f)()], J.prototype, "tabIdx", void 0),
    G([(0, u.f)()], J.prototype, "connectors", void 0),
    (J = G([(0, l.f)("w3m-connect-injected-widget")], J)));
  var X = e,
    Q = function (t, e, i, r) {
      var o,
        n = arguments.length,
        a =
          n < 3
            ? e
            : null === r
              ? (r = Object.getOwnPropertyDescriptor(e, i))
              : r;
      if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
        a = Reflect.decorate(t, e, i, r);
      else
        for (var s = t.length - 1; s >= 0; s--)
          (o = t[s]) &&
            (a = (n < 3 ? o(a) : n > 3 ? o(e, i, a) : o(e, i)) || a);
      return (n > 3 && a && Object.defineProperty(e, i, a), a);
    };
  let Z = class extends X.f {
    constructor() {
      (super(),
        (this.unsubscribe = []),
        (this.tabIdx = void 0),
        (this.connectors = h.f.state.connectors),
        this.unsubscribe.push(
          h.f.subscribeKey("connectors", (t) => (this.connectors = t)),
        ));
    }
    disconnectedCallback() {
      this.unsubscribe.forEach((t) => t());
    }
    render() {
      let t = this.connectors.filter(
        (t) => "MULTI_CHAIN" === t.type && "WalletConnect" !== t.name,
      );
      return t?.length
        ? i.c`
      <wui-flex flexDirection="column" gap="xs">
        ${t.map(
          (t) => i.c`
            <wui-list-wallet
              imageSrc=${(0, d.f)(L.f.getConnectorImage(t))}
              .installed=${!0}
              name=${t.name ?? "Unknown"}
              tagVariant="shade"
              tagLabel="multichain"
              data-testid=${`wallet-selector-${t.id}`}
              @click=${() => this.onConnector(t)}
              tabIdx=${(0, d.f)(this.tabIdx)}
            >
            </wui-list-wallet>
          `,
        )}
      </wui-flex>
    `
        : ((this.style.cssText = "display: none"), null);
    }
    onConnector(t) {
      (h.f.setActiveConnector(t), f.f.push("ConnectingMultiChain"));
    }
  };
  (Q([(0, u.f)()], Z.prototype, "tabIdx", void 0),
    Q([(0, r.f)()], Z.prototype, "connectors", void 0),
    (Z = Q([(0, l.f)("w3m-connect-multi-chain-widget")], Z)));
  var tt = e,
    te = function (t, e, i, r) {
      var o,
        n = arguments.length,
        a =
          n < 3
            ? e
            : null === r
              ? (r = Object.getOwnPropertyDescriptor(e, i))
              : r;
      if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
        a = Reflect.decorate(t, e, i, r);
      else
        for (var s = t.length - 1; s >= 0; s--)
          (o = t[s]) &&
            (a = (n < 3 ? o(a) : n > 3 ? o(e, i, a) : o(e, i)) || a);
      return (n > 3 && a && Object.defineProperty(e, i, a), a);
    };
  let ti = class extends tt.f {
    constructor() {
      (super(),
        (this.unsubscribe = []),
        (this.tabIdx = void 0),
        (this.connectors = h.f.state.connectors),
        (this.loading = !1),
        this.unsubscribe.push(
          h.f.subscribeKey("connectors", (t) => (this.connectors = t)),
        ),
        n.f.isTelegram() &&
          n.f.isIos() &&
          ((this.loading = !D.f.state.wcUri),
          this.unsubscribe.push(
            D.f.subscribeKey("wcUri", (t) => (this.loading = !t)),
          )));
    }
    render() {
      let t = s.f
        .getRecentWallets()
        .filter(
          (t) =>
            !this.connectors.some((e) => e.id === t.id || e.name === t.name),
        );
      return t.length
        ? i.c`
      <wui-flex flexDirection="column" gap="xs">
        ${t.map(
          (t) => i.c`
            <wui-list-wallet
              imageSrc=${(0, d.f)(L.f.getWalletImage(t))}
              name=${t.name ?? "Unknown"}
              @click=${() => this.onConnectWallet(t)}
              tagLabel="recent"
              tagVariant="shade"
              tabIdx=${(0, d.f)(this.tabIdx)}
              ?loading=${this.loading}
            >
            </wui-list-wallet>
          `,
        )}
      </wui-flex>
    `
        : ((this.style.cssText = "display: none"), null);
    }
    onConnectWallet(t) {
      this.loading || h.f.selectWalletConnector(t);
    }
  };
  (te([(0, u.f)()], ti.prototype, "tabIdx", void 0),
    te([(0, r.f)()], ti.prototype, "connectors", void 0),
    te([(0, r.f)()], ti.prototype, "loading", void 0),
    (ti = te([(0, l.f)("w3m-connect-recent-widget")], ti)));
  var tr = e,
    to = t.i(140881),
    tn = function (t, e, i, r) {
      var o,
        n = arguments.length,
        a =
          n < 3
            ? e
            : null === r
              ? (r = Object.getOwnPropertyDescriptor(e, i))
              : r;
      if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
        a = Reflect.decorate(t, e, i, r);
      else
        for (var s = t.length - 1; s >= 0; s--)
          (o = t[s]) &&
            (a = (n < 3 ? o(a) : n > 3 ? o(e, i, a) : o(e, i)) || a);
      return (n > 3 && a && Object.defineProperty(e, i, a), a);
    };
  let ta = class extends tr.f {
    constructor() {
      (super(),
        (this.unsubscribe = []),
        (this.tabIdx = void 0),
        (this.wallets = []),
        (this.loading = !1),
        n.f.isTelegram() &&
          n.f.isIos() &&
          ((this.loading = !D.f.state.wcUri),
          this.unsubscribe.push(
            D.f.subscribeKey("wcUri", (t) => (this.loading = !t)),
          )));
    }
    render() {
      let { connectors: t } = h.f.state,
        { customWallets: e, featuredWalletIds: r } = a.f.state,
        o = s.f.getRecentWallets(),
        n = t.find((t) => "walletConnect" === t.id),
        l = t
          .filter(
            (t) =>
              "INJECTED" === t.type ||
              "ANNOUNCED" === t.type ||
              "MULTI_CHAIN" === t.type,
          )
          .filter((t) => "Browser Wallet" !== t.name);
      if (!n) return null;
      if (r || e || !this.wallets.length)
        return ((this.style.cssText = "display: none"), null);
      let c = Math.max(0, 2 - (l.length + o.length)),
        u = to.f.filterOutDuplicateWallets(this.wallets).slice(0, c);
      return u.length
        ? i.c`
      <wui-flex flexDirection="column" gap="xs">
        ${u.map(
          (t) => i.c`
            <wui-list-wallet
              imageSrc=${(0, d.f)(L.f.getWalletImage(t))}
              name=${t?.name ?? "Unknown"}
              @click=${() => this.onConnectWallet(t)}
              tabIdx=${(0, d.f)(this.tabIdx)}
              ?loading=${this.loading}
            >
            </wui-list-wallet>
          `,
        )}
      </wui-flex>
    `
        : ((this.style.cssText = "display: none"), null);
    }
    onConnectWallet(t) {
      if (this.loading) return;
      let e = h.f.getConnector(t.id, t.rdns);
      e
        ? f.f.push("ConnectingExternal", { connector: e })
        : f.f.push("ConnectingWalletConnect", { wallet: t });
    }
  };
  (tn([(0, u.f)()], ta.prototype, "tabIdx", void 0),
    tn([(0, u.f)()], ta.prototype, "wallets", void 0),
    tn([(0, r.f)()], ta.prototype, "loading", void 0),
    (ta = tn([(0, l.f)("w3m-connect-recommended-widget")], ta)));
  var ts = e,
    tl = t.i(143301),
    tc = function (t, e, i, r) {
      var o,
        n = arguments.length,
        a =
          n < 3
            ? e
            : null === r
              ? (r = Object.getOwnPropertyDescriptor(e, i))
              : r;
      if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
        a = Reflect.decorate(t, e, i, r);
      else
        for (var s = t.length - 1; s >= 0; s--)
          (o = t[s]) &&
            (a = (n < 3 ? o(a) : n > 3 ? o(e, i, a) : o(e, i)) || a);
      return (n > 3 && a && Object.defineProperty(e, i, a), a);
    };
  let tu = class extends ts.f {
    constructor() {
      (super(),
        (this.unsubscribe = []),
        (this.tabIdx = void 0),
        (this.connectors = h.f.state.connectors),
        (this.connectorImages = tl.f.state.connectorImages),
        this.unsubscribe.push(
          h.f.subscribeKey("connectors", (t) => (this.connectors = t)),
          tl.f.subscribeKey(
            "connectorImages",
            (t) => (this.connectorImages = t),
          ),
        ));
    }
    disconnectedCallback() {
      this.unsubscribe.forEach((t) => t());
    }
    render() {
      if (n.f.isMobile()) return ((this.style.cssText = "display: none"), null);
      let t = this.connectors.find((t) => "walletConnect" === t.id);
      if (!t) return ((this.style.cssText = "display: none"), null);
      let e = t.imageUrl || this.connectorImages[t?.imageId ?? ""];
      return i.c`
      <wui-list-wallet
        imageSrc=${(0, d.f)(e)}
        name=${t.name ?? "Unknown"}
        @click=${() => this.onConnector(t)}
        tagLabel="qr code"
        tagVariant="main"
        tabIdx=${(0, d.f)(this.tabIdx)}
        data-testid="wallet-selector-walletconnect"
      >
      </wui-list-wallet>
    `;
    }
    onConnector(t) {
      (h.f.setActiveConnector(t), f.f.push("ConnectingWalletConnect"));
    }
  };
  (tc([(0, u.f)()], tu.prototype, "tabIdx", void 0),
    tc([(0, r.f)()], tu.prototype, "connectors", void 0),
    tc([(0, r.f)()], tu.prototype, "connectorImages", void 0),
    (tu = tc([(0, l.f)("w3m-connect-walletconnect-widget")], tu)));
  let td = v.m`
  :host {
    margin-top: var(--wui-spacing-3xs);
  }
  wui-separator {
    margin: var(--wui-spacing-m) calc(var(--wui-spacing-m) * -1) var(--wui-spacing-xs)
      calc(var(--wui-spacing-m) * -1);
    width: calc(100% + var(--wui-spacing-s) * 2);
  }
`;
  var th = function (t, e, i, r) {
    var o,
      n = arguments.length,
      a =
        n < 3
          ? e
          : null === r
            ? (r = Object.getOwnPropertyDescriptor(e, i))
            : r;
    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
      a = Reflect.decorate(t, e, i, r);
    else
      for (var s = t.length - 1; s >= 0; s--)
        (o = t[s]) && (a = (n < 3 ? o(a) : n > 3 ? o(e, i, a) : o(e, i)) || a);
    return (n > 3 && a && Object.defineProperty(e, i, a), a);
  };
  let tp = class extends P.f {
    constructor() {
      (super(),
        (this.unsubscribe = []),
        (this.tabIdx = void 0),
        (this.connectors = h.f.state.connectors),
        (this.recommended = o.f.state.recommended),
        (this.featured = o.f.state.featured),
        this.unsubscribe.push(
          h.f.subscribeKey("connectors", (t) => (this.connectors = t)),
          o.f.subscribeKey("recommended", (t) => (this.recommended = t)),
          o.f.subscribeKey("featured", (t) => (this.featured = t)),
        ));
    }
    disconnectedCallback() {
      this.unsubscribe.forEach((t) => t());
    }
    render() {
      return i.c`
      <wui-flex flexDirection="column" gap="xs"> ${this.connectorListTemplate()} </wui-flex>
    `;
    }
    connectorListTemplate() {
      let {
        custom: t,
        recent: e,
        announced: r,
        injected: o,
        multiChain: n,
        recommended: a,
        featured: s,
        external: l,
      } = A.f.getConnectorsByType(
        this.connectors,
        this.recommended,
        this.featured,
      );
      return A.f
        .getConnectorTypeOrder({
          custom: t,
          recent: e,
          announced: r,
          injected: o,
          multiChain: n,
          recommended: a,
          featured: s,
          external: l,
        })
        .map((t) => {
          switch (t) {
            case "injected":
              return i.c`
            ${
              n.length
                ? i.c`<w3m-connect-multi-chain-widget
                  tabIdx=${(0, d.f)(this.tabIdx)}
                ></w3m-connect-multi-chain-widget>`
                : null
            }
            ${
              r.length
                ? i.c`<w3m-connect-announced-widget
                  tabIdx=${(0, d.f)(this.tabIdx)}
                ></w3m-connect-announced-widget>`
                : null
            }
            ${
              o.length
                ? i.c`<w3m-connect-injected-widget
                  .connectors=${o}
                  tabIdx=${(0, d.f)(this.tabIdx)}
                ></w3m-connect-injected-widget>`
                : null
            }
          `;
            case "walletConnect":
              return i.c`<w3m-connect-walletconnect-widget
            tabIdx=${(0, d.f)(this.tabIdx)}
          ></w3m-connect-walletconnect-widget>`;
            case "recent":
              return i.c`<w3m-connect-recent-widget
            tabIdx=${(0, d.f)(this.tabIdx)}
          ></w3m-connect-recent-widget>`;
            case "featured":
              return i.c`<w3m-connect-featured-widget
            .wallets=${s}
            tabIdx=${(0, d.f)(this.tabIdx)}
          ></w3m-connect-featured-widget>`;
            case "custom":
              return i.c`<w3m-connect-custom-widget
            tabIdx=${(0, d.f)(this.tabIdx)}
          ></w3m-connect-custom-widget>`;
            case "external":
              return i.c`<w3m-connect-external-widget
            tabIdx=${(0, d.f)(this.tabIdx)}
          ></w3m-connect-external-widget>`;
            case "recommended":
              return i.c`<w3m-connect-recommended-widget
            .wallets=${a}
            tabIdx=${(0, d.f)(this.tabIdx)}
          ></w3m-connect-recommended-widget>`;
            default:
              return (console.warn(`Unknown connector type: ${t}`), null);
          }
        });
    }
  };
  ((tp.styles = td),
    th([(0, u.f)()], tp.prototype, "tabIdx", void 0),
    th([(0, r.f)()], tp.prototype, "connectors", void 0),
    th([(0, r.f)()], tp.prototype, "recommended", void 0),
    th([(0, r.f)()], tp.prototype, "featured", void 0),
    (tp = th([(0, l.f)("w3m-connector-list")], tp)));
  var tf = e,
    tg = t.i(8242),
    tw = t.i(778818),
    tb = t.i(789336),
    tm = e,
    tv = e;
  let ty = v.m`
  :host {
    display: inline-flex;
    background-color: var(--wui-color-gray-glass-002);
    border-radius: var(--wui-border-radius-3xl);
    padding: var(--wui-spacing-3xs);
    position: relative;
    height: 36px;
    min-height: 36px;
    overflow: hidden;
  }

  :host::before {
    content: '';
    position: absolute;
    pointer-events: none;
    top: 4px;
    left: 4px;
    display: block;
    width: var(--local-tab-width);
    height: 28px;
    border-radius: var(--wui-border-radius-3xl);
    background-color: var(--wui-color-gray-glass-002);
    box-shadow: inset 0 0 0 1px var(--wui-color-gray-glass-002);
    transform: translateX(calc(var(--local-tab) * var(--local-tab-width)));
    transition: transform var(--wui-ease-out-power-1) var(--wui-duration-md);
    will-change: background-color, opacity;
  }

  :host([data-type='flex'])::before {
    left: 3px;
    transform: translateX(calc((var(--local-tab) * 34px) + (var(--local-tab) * 4px)));
  }

  :host([data-type='flex']) {
    display: flex;
    padding: 0px 0px 0px 12px;
    gap: 4px;
  }

  :host([data-type='flex']) > button > wui-text {
    position: absolute;
    left: 18px;
    opacity: 0;
  }

  button[data-active='true'] > wui-icon,
  button[data-active='true'] > wui-text {
    color: var(--wui-color-fg-100);
  }

  button[data-active='false'] > wui-icon,
  button[data-active='false'] > wui-text {
    color: var(--wui-color-fg-200);
  }

  button[data-active='true']:disabled,
  button[data-active='false']:disabled {
    background-color: transparent;
    opacity: 0.5;
    cursor: not-allowed;
  }

  button[data-active='true']:disabled > wui-text {
    color: var(--wui-color-fg-200);
  }

  button[data-active='false']:disabled > wui-text {
    color: var(--wui-color-fg-300);
  }

  button > wui-icon,
  button > wui-text {
    pointer-events: none;
    transition: color var(--wui-e ase-out-power-1) var(--wui-duration-md);
    will-change: color;
  }

  button {
    width: var(--local-tab-width);
    transition: background-color var(--wui-ease-out-power-1) var(--wui-duration-md);
    will-change: background-color;
  }

  :host([data-type='flex']) > button {
    width: 34px;
    position: relative;
    display: flex;
    justify-content: flex-start;
  }

  button:hover:enabled,
  button:active:enabled {
    background-color: transparent !important;
  }

  button:hover:enabled > wui-icon,
  button:active:enabled > wui-icon {
    transition: all var(--wui-ease-out-power-1) var(--wui-duration-lg);
    color: var(--wui-color-fg-125);
  }

  button:hover:enabled > wui-text,
  button:active:enabled > wui-text {
    transition: all var(--wui-ease-out-power-1) var(--wui-duration-lg);
    color: var(--wui-color-fg-125);
  }

  button {
    border-radius: var(--wui-border-radius-3xl);
  }
`;
  var tx = function (t, e, i, r) {
    var o,
      n = arguments.length,
      a =
        n < 3
          ? e
          : null === r
            ? (r = Object.getOwnPropertyDescriptor(e, i))
            : r;
    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
      a = Reflect.decorate(t, e, i, r);
    else
      for (var s = t.length - 1; s >= 0; s--)
        (o = t[s]) && (a = (n < 3 ? o(a) : n > 3 ? o(e, i, a) : o(e, i)) || a);
    return (n > 3 && a && Object.defineProperty(e, i, a), a);
  };
  let t$ = class extends tv.f {
    constructor() {
      (super(...arguments),
        (this.tabs = []),
        (this.onTabChange = () => null),
        (this.buttons = []),
        (this.disabled = !1),
        (this.localTabWidth = "100px"),
        (this.activeTab = 0),
        (this.isDense = !1));
    }
    render() {
      return (
        (this.isDense = this.tabs.length > 3),
        (this.style.cssText = `
      --local-tab: ${this.activeTab};
      --local-tab-width: ${this.localTabWidth};
    `),
        (this.dataset.type = this.isDense ? "flex" : "block"),
        this.tabs.map((t, e) => {
          let r = e === this.activeTab;
          return i.c`
        <button
          ?disabled=${this.disabled}
          @click=${() => this.onTabClick(e)}
          data-active=${r}
          data-testid="tab-${t.label?.toLowerCase()}"
        >
          ${this.iconTemplate(t)}
          <wui-text variant="small-600" color="inherit"> ${t.label} </wui-text>
        </button>
      `;
        })
      );
    }
    firstUpdated() {
      this.shadowRoot &&
        this.isDense &&
        ((this.buttons = [...this.shadowRoot.querySelectorAll("button")]),
        setTimeout(() => {
          this.animateTabs(0, !0);
        }, 0));
    }
    iconTemplate(t) {
      return t.icon
        ? i.c`<wui-icon size="xs" color="inherit" name=${t.icon}></wui-icon>`
        : null;
    }
    onTabClick(t) {
      (this.buttons && this.animateTabs(t, !1),
        (this.activeTab = t),
        this.onTabChange(t));
    }
    animateTabs(t, e) {
      let i = this.buttons[this.activeTab],
        r = this.buttons[t],
        o = i?.querySelector("wui-text"),
        n = r?.querySelector("wui-text"),
        a = r?.getBoundingClientRect(),
        s = n?.getBoundingClientRect();
      (i &&
        o &&
        !e &&
        t !== this.activeTab &&
        (o.animate([{ opacity: 0 }], {
          duration: 50,
          easing: "ease",
          fill: "forwards",
        }),
        i.animate([{ width: "34px" }], {
          duration: 500,
          easing: "ease",
          fill: "forwards",
        })),
        r &&
          a &&
          s &&
          n &&
          (t !== this.activeTab || e) &&
          ((this.localTabWidth = `${Math.round(a.width + s.width) + 6}px`),
          r.animate([{ width: `${a.width + s.width}px` }], {
            duration: 500 * !e,
            fill: "forwards",
            easing: "ease",
          }),
          n.animate([{ opacity: 1 }], {
            duration: 125 * !e,
            delay: 200 * !e,
            fill: "forwards",
            easing: "ease",
          })));
    }
  };
  ((t$.styles = [w.e, w.j, ty]),
    tx([(0, u.f)({ type: Array })], t$.prototype, "tabs", void 0),
    tx([(0, u.f)()], t$.prototype, "onTabChange", void 0),
    tx([(0, u.f)({ type: Array })], t$.prototype, "buttons", void 0),
    tx([(0, u.f)({ type: Boolean })], t$.prototype, "disabled", void 0),
    tx([(0, u.f)()], t$.prototype, "localTabWidth", void 0),
    tx([(0, r.f)()], t$.prototype, "activeTab", void 0),
    tx([(0, r.f)()], t$.prototype, "isDense", void 0),
    (t$ = tx([(0, l.f)("wui-tabs")], t$)));
  var tC = function (t, e, i, r) {
    var o,
      n = arguments.length,
      a =
        n < 3
          ? e
          : null === r
            ? (r = Object.getOwnPropertyDescriptor(e, i))
            : r;
    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
      a = Reflect.decorate(t, e, i, r);
    else
      for (var s = t.length - 1; s >= 0; s--)
        (o = t[s]) && (a = (n < 3 ? o(a) : n > 3 ? o(e, i, a) : o(e, i)) || a);
    return (n > 3 && a && Object.defineProperty(e, i, a), a);
  };
  let tk = class extends tm.f {
    constructor() {
      (super(),
        (this.platformTabs = []),
        (this.unsubscribe = []),
        (this.platforms = []),
        (this.onSelectPlatfrom = void 0),
        (this.buffering = !1),
        this.unsubscribe.push(
          D.f.subscribeKey("buffering", (t) => (this.buffering = t)),
        ));
    }
    disconnectCallback() {
      this.unsubscribe.forEach((t) => t());
    }
    render() {
      let t = this.generateTabs();
      return i.c`
      <wui-flex justifyContent="center" .padding=${["0", "0", "l", "0"]}>
        <wui-tabs
          ?disabled=${this.buffering}
          .tabs=${t}
          .onTabChange=${this.onTabChange.bind(this)}
        ></wui-tabs>
      </wui-flex>
    `;
    }
    generateTabs() {
      let t = this.platforms.map((t) => {
        if ("browser" === t)
          return { label: "Browser", icon: "extension", platform: "browser" };
        if ("mobile" === t)
          return { label: "Mobile", icon: "mobile", platform: "mobile" };
        if ("qrcode" === t)
          return { label: "Mobile", icon: "mobile", platform: "qrcode" };
        if ("web" === t)
          return { label: "Webapp", icon: "browser", platform: "web" };
        if ("desktop" === t)
          return { label: "Desktop", icon: "desktop", platform: "desktop" };
        return { label: "Browser", icon: "extension", platform: "unsupported" };
      });
      return ((this.platformTabs = t.map(({ platform: t }) => t)), t);
    }
    onTabChange(t) {
      let e = this.platformTabs[t];
      e && this.onSelectPlatfrom?.(e);
    }
  };
  (tC([(0, u.f)({ type: Array })], tk.prototype, "platforms", void 0),
    tC([(0, u.f)()], tk.prototype, "onSelectPlatfrom", void 0),
    tC([(0, r.f)()], tk.prototype, "buffering", void 0),
    (tk = tC([(0, l.f)("w3m-connecting-header")], tk)));
  var tR = e,
    tI = t.i(184580),
    tE = e;
  t.i(381921);
  let tT = v.m`
  :host {
    width: var(--local-width);
    position: relative;
  }

  button {
    border: none;
    border-radius: var(--local-border-radius);
    width: var(--local-width);
    white-space: nowrap;
  }

  /* -- Sizes --------------------------------------------------- */
  button[data-size='md'] {
    padding: 8.2px var(--wui-spacing-l) 9px var(--wui-spacing-l);
    height: 36px;
  }

  button[data-size='md'][data-icon-left='true'][data-icon-right='false'] {
    padding: 8.2px var(--wui-spacing-l) 9px var(--wui-spacing-s);
  }

  button[data-size='md'][data-icon-right='true'][data-icon-left='false'] {
    padding: 8.2px var(--wui-spacing-s) 9px var(--wui-spacing-l);
  }

  button[data-size='lg'] {
    padding: var(--wui-spacing-m) var(--wui-spacing-2l);
    height: 48px;
  }

  /* -- Variants --------------------------------------------------------- */
  button[data-variant='main'] {
    background-color: var(--wui-color-accent-100);
    color: var(--wui-color-inverse-100);
    border: none;
    box-shadow: inset 0 0 0 1px var(--wui-color-gray-glass-010);
  }

  button[data-variant='inverse'] {
    background-color: var(--wui-color-inverse-100);
    color: var(--wui-color-inverse-000);
    border: none;
    box-shadow: inset 0 0 0 1px var(--wui-color-gray-glass-010);
  }

  button[data-variant='accent'] {
    background-color: var(--wui-color-accent-glass-010);
    color: var(--wui-color-accent-100);
    border: none;
    box-shadow: inset 0 0 0 1px var(--wui-color-gray-glass-005);
  }

  button[data-variant='accent-error'] {
    background: var(--wui-color-error-glass-015);
    color: var(--wui-color-error-100);
    border: none;
    box-shadow: inset 0 0 0 1px var(--wui-color-error-glass-010);
  }

  button[data-variant='accent-success'] {
    background: var(--wui-color-success-glass-015);
    color: var(--wui-color-success-100);
    border: none;
    box-shadow: inset 0 0 0 1px var(--wui-color-success-glass-010);
  }

  button[data-variant='neutral'] {
    background: transparent;
    color: var(--wui-color-fg-100);
    border: none;
    box-shadow: inset 0 0 0 1px var(--wui-color-gray-glass-005);
  }

  /* -- Focus states --------------------------------------------------- */
  button[data-variant='main']:focus-visible:enabled {
    background-color: var(--wui-color-accent-090);
    box-shadow:
      inset 0 0 0 1px var(--wui-color-accent-100),
      0 0 0 4px var(--wui-color-accent-glass-020);
  }
  button[data-variant='inverse']:focus-visible:enabled {
    background-color: var(--wui-color-inverse-100);
    box-shadow:
      inset 0 0 0 1px var(--wui-color-gray-glass-010),
      0 0 0 4px var(--wui-color-accent-glass-020);
  }
  button[data-variant='accent']:focus-visible:enabled {
    background-color: var(--wui-color-accent-glass-010);
    box-shadow:
      inset 0 0 0 1px var(--wui-color-accent-100),
      0 0 0 4px var(--wui-color-accent-glass-020);
  }
  button[data-variant='accent-error']:focus-visible:enabled {
    background: var(--wui-color-error-glass-015);
    box-shadow:
      inset 0 0 0 1px var(--wui-color-error-100),
      0 0 0 4px var(--wui-color-error-glass-020);
  }
  button[data-variant='accent-success']:focus-visible:enabled {
    background: var(--wui-color-success-glass-015);
    box-shadow:
      inset 0 0 0 1px var(--wui-color-success-100),
      0 0 0 4px var(--wui-color-success-glass-020);
  }
  button[data-variant='neutral']:focus-visible:enabled {
    background: var(--wui-color-gray-glass-005);
    box-shadow:
      inset 0 0 0 1px var(--wui-color-gray-glass-010),
      0 0 0 4px var(--wui-color-gray-glass-002);
  }

  /* -- Hover & Active states ----------------------------------------------------------- */
  @media (hover: hover) and (pointer: fine) {
    button[data-variant='main']:hover:enabled {
      background-color: var(--wui-color-accent-090);
    }

    button[data-variant='main']:active:enabled {
      background-color: var(--wui-color-accent-080);
    }

    button[data-variant='accent']:hover:enabled {
      background-color: var(--wui-color-accent-glass-015);
    }

    button[data-variant='accent']:active:enabled {
      background-color: var(--wui-color-accent-glass-020);
    }

    button[data-variant='accent-error']:hover:enabled {
      background: var(--wui-color-error-glass-020);
      color: var(--wui-color-error-100);
    }

    button[data-variant='accent-error']:active:enabled {
      background: var(--wui-color-error-glass-030);
      color: var(--wui-color-error-100);
    }

    button[data-variant='accent-success']:hover:enabled {
      background: var(--wui-color-success-glass-020);
      color: var(--wui-color-success-100);
    }

    button[data-variant='accent-success']:active:enabled {
      background: var(--wui-color-success-glass-030);
      color: var(--wui-color-success-100);
    }

    button[data-variant='neutral']:hover:enabled {
      background: var(--wui-color-gray-glass-002);
    }

    button[data-variant='neutral']:active:enabled {
      background: var(--wui-color-gray-glass-005);
    }

    button[data-size='lg'][data-icon-left='true'][data-icon-right='false'] {
      padding-left: var(--wui-spacing-m);
    }

    button[data-size='lg'][data-icon-right='true'][data-icon-left='false'] {
      padding-right: var(--wui-spacing-m);
    }
  }

  /* -- Disabled state --------------------------------------------------- */
  button:disabled {
    background-color: var(--wui-color-gray-glass-002);
    box-shadow: inset 0 0 0 1px var(--wui-color-gray-glass-002);
    color: var(--wui-color-gray-glass-020);
    cursor: not-allowed;
  }

  button > wui-text {
    transition: opacity var(--wui-ease-out-power-1) var(--wui-duration-md);
    will-change: opacity;
    opacity: var(--local-opacity-100);
  }

  ::slotted(*) {
    transition: opacity var(--wui-ease-out-power-1) var(--wui-duration-md);
    will-change: opacity;
    opacity: var(--local-opacity-100);
  }

  wui-loading-spinner {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    opacity: var(--local-opacity-000);
  }
`;
  var tS = function (t, e, i, r) {
    var o,
      n = arguments.length,
      a =
        n < 3
          ? e
          : null === r
            ? (r = Object.getOwnPropertyDescriptor(e, i))
            : r;
    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
      a = Reflect.decorate(t, e, i, r);
    else
      for (var s = t.length - 1; s >= 0; s--)
        (o = t[s]) && (a = (n < 3 ? o(a) : n > 3 ? o(e, i, a) : o(e, i)) || a);
    return (n > 3 && a && Object.defineProperty(e, i, a), a);
  };
  let tj = {
      main: "inverse-100",
      inverse: "inverse-000",
      accent: "accent-100",
      "accent-error": "error-100",
      "accent-success": "success-100",
      neutral: "fg-100",
      disabled: "gray-glass-020",
    },
    tP = { lg: "paragraph-600", md: "small-600" },
    tO = { lg: "md", md: "md" },
    tL = class extends tE.f {
      constructor() {
        (super(...arguments),
          (this.size = "lg"),
          (this.disabled = !1),
          (this.fullWidth = !1),
          (this.loading = !1),
          (this.variant = "main"),
          (this.hasIconLeft = !1),
          (this.hasIconRight = !1),
          (this.borderRadius = "m"));
      }
      render() {
        this.style.cssText = `
    --local-width: ${this.fullWidth ? "100%" : "auto"};
    --local-opacity-100: ${+!this.loading};
    --local-opacity-000: ${+!!this.loading};
    --local-border-radius: var(--wui-border-radius-${this.borderRadius});
    `;
        let t = this.textVariant ?? tP[this.size];
        return i.c`
      <button
        data-variant=${this.variant}
        data-icon-left=${this.hasIconLeft}
        data-icon-right=${this.hasIconRight}
        data-size=${this.size}
        ?disabled=${this.disabled}
      >
        ${this.loadingTemplate()}
        <slot name="iconLeft" @slotchange=${() => this.handleSlotLeftChange()}></slot>
        <wui-text variant=${t} color="inherit">
          <slot></slot>
        </wui-text>
        <slot name="iconRight" @slotchange=${() => this.handleSlotRightChange()}></slot>
      </button>
    `;
      }
      handleSlotLeftChange() {
        this.hasIconLeft = !0;
      }
      handleSlotRightChange() {
        this.hasIconRight = !0;
      }
      loadingTemplate() {
        if (this.loading) {
          let t = tO[this.size],
            e = this.disabled ? tj.disabled : tj[this.variant];
          return i.c`<wui-loading-spinner color=${e} size=${t}></wui-loading-spinner>`;
        }
        return i.c``;
      }
    };
  ((tL.styles = [w.e, w.j, tT]),
    tS([(0, u.f)()], tL.prototype, "size", void 0),
    tS([(0, u.f)({ type: Boolean })], tL.prototype, "disabled", void 0),
    tS([(0, u.f)({ type: Boolean })], tL.prototype, "fullWidth", void 0),
    tS([(0, u.f)({ type: Boolean })], tL.prototype, "loading", void 0),
    tS([(0, u.f)()], tL.prototype, "variant", void 0),
    tS([(0, u.f)({ type: Boolean })], tL.prototype, "hasIconLeft", void 0),
    tS([(0, u.f)({ type: Boolean })], tL.prototype, "hasIconRight", void 0),
    tS([(0, u.f)()], tL.prototype, "borderRadius", void 0),
    tS([(0, u.f)()], tL.prototype, "textVariant", void 0),
    (tL = tS([(0, l.f)("wui-button")], tL)),
    t.i(820841));
  var tA = e;
  let tB = v.m`
  button {
    padding: var(--wui-spacing-4xs) var(--wui-spacing-xxs);
    border-radius: var(--wui-border-radius-3xs);
    background-color: transparent;
    color: var(--wui-color-accent-100);
  }

  button:disabled {
    background-color: transparent;
    color: var(--wui-color-gray-glass-015);
  }

  button:hover {
    background-color: var(--wui-color-gray-glass-005);
  }
`;
  var tz = function (t, e, i, r) {
    var o,
      n = arguments.length,
      a =
        n < 3
          ? e
          : null === r
            ? (r = Object.getOwnPropertyDescriptor(e, i))
            : r;
    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
      a = Reflect.decorate(t, e, i, r);
    else
      for (var s = t.length - 1; s >= 0; s--)
        (o = t[s]) && (a = (n < 3 ? o(a) : n > 3 ? o(e, i, a) : o(e, i)) || a);
    return (n > 3 && a && Object.defineProperty(e, i, a), a);
  };
  let tW = class extends tA.f {
    constructor() {
      (super(...arguments),
        (this.tabIdx = void 0),
        (this.disabled = !1),
        (this.color = "inherit"));
    }
    render() {
      return i.c`
      <button ?disabled=${this.disabled} tabindex=${(0, d.f)(this.tabIdx)}>
        <slot name="iconLeft"></slot>
        <wui-text variant="small-600" color=${this.color}>
          <slot></slot>
        </wui-text>
        <slot name="iconRight"></slot>
      </button>
    `;
    }
  };
  ((tW.styles = [w.e, w.j, tB]),
    tz([(0, u.f)()], tW.prototype, "tabIdx", void 0),
    tz([(0, u.f)({ type: Boolean })], tW.prototype, "disabled", void 0),
    tz([(0, u.f)()], tW.prototype, "color", void 0),
    (tW = tz([(0, l.f)("wui-link")], tW)));
  var tD = e;
  let tN = v.m`
  :host {
    display: block;
    width: var(--wui-box-size-md);
    height: var(--wui-box-size-md);
  }

  svg {
    width: var(--wui-box-size-md);
    height: var(--wui-box-size-md);
  }

  rect {
    fill: none;
    stroke: var(--wui-color-accent-100);
    stroke-width: 4px;
    stroke-linecap: round;
    animation: dash 1s linear infinite;
  }

  @keyframes dash {
    to {
      stroke-dashoffset: 0px;
    }
  }
`;
  var tM = function (t, e, i, r) {
    var o,
      n = arguments.length,
      a =
        n < 3
          ? e
          : null === r
            ? (r = Object.getOwnPropertyDescriptor(e, i))
            : r;
    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
      a = Reflect.decorate(t, e, i, r);
    else
      for (var s = t.length - 1; s >= 0; s--)
        (o = t[s]) && (a = (n < 3 ? o(a) : n > 3 ? o(e, i, a) : o(e, i)) || a);
    return (n > 3 && a && Object.defineProperty(e, i, a), a);
  };
  let tU = class extends tD.f {
    constructor() {
      (super(...arguments), (this.radius = 36));
    }
    render() {
      return this.svgLoaderTemplate();
    }
    svgLoaderTemplate() {
      let t = this.radius > 50 ? 50 : this.radius,
        e = 36 - t;
      return i.c`
      <svg viewBox="0 0 110 110" width="110" height="110">
        <rect
          x="2"
          y="2"
          width="106"
          height="106"
          rx=${t}
          stroke-dasharray="${116 + e} ${245 + e}"
          stroke-dashoffset=${360 + 1.75 * e}
        />
      </svg>
    `;
    }
  };
  ((tU.styles = [w.e, tN]),
    tM([(0, u.f)({ type: Number })], tU.prototype, "radius", void 0),
    (tU = tM([(0, l.f)("wui-loading-thumbnail")], tU)),
    t.i(192523));
  var tq = e,
    tV = t.i(299055),
    t_ = e,
    tK = e;
  let tH = v.m`
  button {
    border: none;
    border-radius: var(--wui-border-radius-3xl);
  }

  button[data-variant='main'] {
    background-color: var(--wui-color-accent-100);
    color: var(--wui-color-inverse-100);
    box-shadow: inset 0 0 0 1px var(--wui-color-gray-glass-010);
  }

  button[data-variant='accent'] {
    background-color: var(--wui-color-accent-glass-010);
    color: var(--wui-color-accent-100);
    box-shadow: inset 0 0 0 1px var(--wui-color-gray-glass-005);
  }

  button[data-variant='gray'] {
    background-color: transparent;
    color: var(--wui-color-fg-200);
    box-shadow: inset 0 0 0 1px var(--wui-color-gray-glass-010);
  }

  button[data-variant='shade'] {
    background-color: transparent;
    color: var(--wui-color-accent-100);
    box-shadow: inset 0 0 0 1px var(--wui-color-gray-glass-010);
  }

  button[data-size='sm'] {
    height: 32px;
    padding: 0 var(--wui-spacing-s);
  }

  button[data-size='md'] {
    height: 40px;
    padding: 0 var(--wui-spacing-l);
  }

  button[data-size='sm'] > wui-image {
    width: 16px;
    height: 16px;
  }

  button[data-size='md'] > wui-image {
    width: 24px;
    height: 24px;
  }

  button[data-size='sm'] > wui-icon {
    width: 12px;
    height: 12px;
  }

  button[data-size='md'] > wui-icon {
    width: 14px;
    height: 14px;
  }

  wui-image {
    border-radius: var(--wui-border-radius-3xl);
    overflow: hidden;
  }

  button.disabled > wui-icon,
  button.disabled > wui-image {
    filter: grayscale(1);
  }

  button[data-variant='main'] > wui-image {
    box-shadow: inset 0 0 0 1px var(--wui-color-accent-090);
  }

  button[data-variant='shade'] > wui-image,
  button[data-variant='gray'] > wui-image {
    box-shadow: inset 0 0 0 1px var(--wui-color-gray-glass-010);
  }

  @media (hover: hover) and (pointer: fine) {
    button[data-variant='main']:focus-visible {
      background-color: var(--wui-color-accent-090);
    }

    button[data-variant='main']:hover:enabled {
      background-color: var(--wui-color-accent-090);
    }

    button[data-variant='main']:active:enabled {
      background-color: var(--wui-color-accent-080);
    }

    button[data-variant='accent']:hover:enabled {
      background-color: var(--wui-color-accent-glass-015);
    }

    button[data-variant='accent']:active:enabled {
      background-color: var(--wui-color-accent-glass-020);
    }

    button[data-variant='shade']:focus-visible,
    button[data-variant='gray']:focus-visible,
    button[data-variant='shade']:hover,
    button[data-variant='gray']:hover {
      background-color: var(--wui-color-gray-glass-002);
    }

    button[data-variant='gray']:active,
    button[data-variant='shade']:active {
      background-color: var(--wui-color-gray-glass-005);
    }
  }

  button.disabled {
    color: var(--wui-color-gray-glass-020);
    background-color: var(--wui-color-gray-glass-002);
    box-shadow: inset 0 0 0 1px var(--wui-color-gray-glass-002);
    pointer-events: none;
  }
`;
  var tF = function (t, e, i, r) {
    var o,
      n = arguments.length,
      a =
        n < 3
          ? e
          : null === r
            ? (r = Object.getOwnPropertyDescriptor(e, i))
            : r;
    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
      a = Reflect.decorate(t, e, i, r);
    else
      for (var s = t.length - 1; s >= 0; s--)
        (o = t[s]) && (a = (n < 3 ? o(a) : n > 3 ? o(e, i, a) : o(e, i)) || a);
    return (n > 3 && a && Object.defineProperty(e, i, a), a);
  };
  let tY = class extends tK.f {
    constructor() {
      (super(...arguments),
        (this.variant = "accent"),
        (this.imageSrc = ""),
        (this.disabled = !1),
        (this.icon = "externalLink"),
        (this.size = "md"),
        (this.text = ""));
    }
    render() {
      let t = "sm" === this.size ? "small-600" : "paragraph-600";
      return i.c`
      <button
        class=${this.disabled ? "disabled" : ""}
        data-variant=${this.variant}
        data-size=${this.size}
      >
        ${this.imageSrc ? i.c`<wui-image src=${this.imageSrc}></wui-image>` : null}
        <wui-text variant=${t} color="inherit"> ${this.text} </wui-text>
        <wui-icon name=${this.icon} color="inherit" size="inherit"></wui-icon>
      </button>
    `;
    }
  };
  ((tY.styles = [w.e, w.j, tH]),
    tF([(0, u.f)()], tY.prototype, "variant", void 0),
    tF([(0, u.f)()], tY.prototype, "imageSrc", void 0),
    tF([(0, u.f)({ type: Boolean })], tY.prototype, "disabled", void 0),
    tF([(0, u.f)()], tY.prototype, "icon", void 0),
    tF([(0, u.f)()], tY.prototype, "size", void 0),
    tF([(0, u.f)()], tY.prototype, "text", void 0),
    (tY = tF([(0, l.f)("wui-chip-button")], tY)));
  let tG = v.m`
  wui-flex {
    width: 100%;
    background-color: var(--wui-color-gray-glass-002);
    border-radius: var(--wui-border-radius-xs);
  }
`;
  var tJ = function (t, e, i, r) {
    var o,
      n = arguments.length,
      a =
        n < 3
          ? e
          : null === r
            ? (r = Object.getOwnPropertyDescriptor(e, i))
            : r;
    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
      a = Reflect.decorate(t, e, i, r);
    else
      for (var s = t.length - 1; s >= 0; s--)
        (o = t[s]) && (a = (n < 3 ? o(a) : n > 3 ? o(e, i, a) : o(e, i)) || a);
    return (n > 3 && a && Object.defineProperty(e, i, a), a);
  };
  let tX = class extends t_.f {
    constructor() {
      (super(...arguments),
        (this.disabled = !1),
        (this.label = ""),
        (this.buttonLabel = ""));
    }
    render() {
      return i.c`
      <wui-flex
        justifyContent="space-between"
        alignItems="center"
        .padding=${["1xs", "2l", "1xs", "2l"]}
      >
        <wui-text variant="paragraph-500" color="fg-200">${this.label}</wui-text>
        <wui-chip-button size="sm" variant="shade" text=${this.buttonLabel} icon="chevronRight">
        </wui-chip-button>
      </wui-flex>
    `;
    }
  };
  ((tX.styles = [w.e, w.j, tG]),
    tJ([(0, u.f)({ type: Boolean })], tX.prototype, "disabled", void 0),
    tJ([(0, u.f)()], tX.prototype, "label", void 0),
    tJ([(0, u.f)()], tX.prototype, "buttonLabel", void 0),
    (tX = tJ([(0, l.f)("wui-cta-button")], tX)));
  let tQ = v.m`
  :host {
    display: block;
    padding: 0 var(--wui-spacing-xl) var(--wui-spacing-xl);
  }
`;
  var tZ = function (t, e, i, r) {
    var o,
      n = arguments.length,
      a =
        n < 3
          ? e
          : null === r
            ? (r = Object.getOwnPropertyDescriptor(e, i))
            : r;
    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
      a = Reflect.decorate(t, e, i, r);
    else
      for (var s = t.length - 1; s >= 0; s--)
        (o = t[s]) && (a = (n < 3 ? o(a) : n > 3 ? o(e, i, a) : o(e, i)) || a);
    return (n > 3 && a && Object.defineProperty(e, i, a), a);
  };
  let t0 = class extends tq.f {
    constructor() {
      (super(...arguments), (this.wallet = void 0));
    }
    render() {
      if (!this.wallet) return ((this.style.display = "none"), null);
      let {
          name: t,
          app_store: e,
          play_store: r,
          chrome_store: o,
          homepage: a,
        } = this.wallet,
        s = n.f.isMobile(),
        l = n.f.isIos(),
        c = n.f.isAndroid(),
        u = [e, r, a, o].filter(Boolean).length > 1,
        d = tV.f.getTruncateString({
          string: t,
          charsStart: 12,
          charsEnd: 0,
          truncate: "end",
        });
      return u && !s
        ? i.c`
        <wui-cta-button
          label=${`Don't have ${d}?`}
          buttonLabel="Get"
          @click=${() => f.f.push("Downloads", { wallet: this.wallet })}
        ></wui-cta-button>
      `
        : !u && a
          ? i.c`
        <wui-cta-button
          label=${`Don't have ${d}?`}
          buttonLabel="Get"
          @click=${this.onHomePage.bind(this)}
        ></wui-cta-button>
      `
          : e && l
            ? i.c`
        <wui-cta-button
          label=${`Don't have ${d}?`}
          buttonLabel="Get"
          @click=${this.onAppStore.bind(this)}
        ></wui-cta-button>
      `
            : r && c
              ? i.c`
        <wui-cta-button
          label=${`Don't have ${d}?`}
          buttonLabel="Get"
          @click=${this.onPlayStore.bind(this)}
        ></wui-cta-button>
      `
              : ((this.style.display = "none"), null);
    }
    onAppStore() {
      this.wallet?.app_store && n.f.openHref(this.wallet.app_store, "_blank");
    }
    onPlayStore() {
      this.wallet?.play_store && n.f.openHref(this.wallet.play_store, "_blank");
    }
    onHomePage() {
      this.wallet?.homepage && n.f.openHref(this.wallet.homepage, "_blank");
    }
  };
  ((t0.styles = [tQ]),
    tZ([(0, u.f)({ type: Object })], t0.prototype, "wallet", void 0),
    (t0 = tZ([(0, l.f)("w3m-mobile-download-links")], t0)));
  let t1 = v.m`
  @keyframes shake {
    0% {
      transform: translateX(0);
    }
    25% {
      transform: translateX(3px);
    }
    50% {
      transform: translateX(-3px);
    }
    75% {
      transform: translateX(3px);
    }
    100% {
      transform: translateX(0);
    }
  }

  wui-flex:first-child:not(:only-child) {
    position: relative;
  }

  wui-loading-thumbnail {
    position: absolute;
  }

  wui-icon-box {
    position: absolute;
    right: calc(var(--wui-spacing-3xs) * -1);
    bottom: calc(var(--wui-spacing-3xs) * -1);
    opacity: 0;
    transform: scale(0.5);
    transition-property: opacity, transform;
    transition-duration: var(--wui-duration-lg);
    transition-timing-function: var(--wui-ease-out-power-2);
    will-change: opacity, transform;
  }

  wui-text[align='center'] {
    width: 100%;
    padding: 0px var(--wui-spacing-l);
  }

  [data-error='true'] wui-icon-box {
    opacity: 1;
    transform: scale(1);
  }

  [data-error='true'] > wui-flex:first-child {
    animation: shake 250ms cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
  }

  [data-retry='false'] wui-link {
    display: none;
  }

  [data-retry='true'] wui-link {
    display: block;
    opacity: 1;
  }
`;
  var t3 = function (t, e, i, r) {
    var o,
      n = arguments.length,
      a =
        n < 3
          ? e
          : null === r
            ? (r = Object.getOwnPropertyDescriptor(e, i))
            : r;
    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
      a = Reflect.decorate(t, e, i, r);
    else
      for (var s = t.length - 1; s >= 0; s--)
        (o = t[s]) && (a = (n < 3 ? o(a) : n > 3 ? o(e, i, a) : o(e, i)) || a);
    return (n > 3 && a && Object.defineProperty(e, i, a), a);
  };
  class t2 extends tR.f {
    constructor() {
      (super(),
        (this.wallet = f.f.state.data?.wallet),
        (this.connector = f.f.state.data?.connector),
        (this.timeout = void 0),
        (this.secondaryBtnIcon = "refresh"),
        (this.onConnect = void 0),
        (this.onRender = void 0),
        (this.onAutoConnect = void 0),
        (this.isWalletConnect = !0),
        (this.unsubscribe = []),
        (this.imageSrc =
          L.f.getWalletImage(this.wallet) ??
          L.f.getConnectorImage(this.connector)),
        (this.name = this.wallet?.name ?? this.connector?.name ?? "Wallet"),
        (this.isRetrying = !1),
        (this.uri = D.f.state.wcUri),
        (this.error = D.f.state.wcError),
        (this.ready = !1),
        (this.showRetry = !1),
        (this.secondaryBtnLabel = "Try again"),
        (this.secondaryLabel = "Accept connection request in the wallet"),
        (this.buffering = !1),
        (this.isLoading = !1),
        (this.isMobile = !1),
        (this.onRetry = void 0),
        this.unsubscribe.push(
          D.f.subscribeKey("wcUri", (t) => {
            ((this.uri = t),
              this.isRetrying &&
                this.onRetry &&
                ((this.isRetrying = !1), this.onConnect?.()));
          }),
          D.f.subscribeKey("wcError", (t) => (this.error = t)),
          D.f.subscribeKey("buffering", (t) => (this.buffering = t)),
        ),
        (n.f.isTelegram() || n.f.isSafari()) &&
          n.f.isIos() &&
          D.f.state.wcUri &&
          this.onConnect?.());
    }
    firstUpdated() {
      (this.onAutoConnect?.(), (this.showRetry = !this.onAutoConnect));
    }
    disconnectedCallback() {
      (this.unsubscribe.forEach((t) => t()), clearTimeout(this.timeout));
    }
    render() {
      (this.onRender?.(), this.onShowRetry());
      let t = this.error
          ? "Connection can be declined if a previous request is still active"
          : this.secondaryLabel,
        e = `Continue in ${this.name}`;
      return (
        this.buffering && (e = "Connecting..."),
        this.error && (e = "Connection declined"),
        i.c`
      <wui-flex
        data-error=${(0, d.f)(this.error)}
        data-retry=${this.showRetry}
        flexDirection="column"
        alignItems="center"
        .padding=${["3xl", "xl", "xl", "xl"]}
        gap="xl"
      >
        <wui-flex justifyContent="center" alignItems="center">
          <wui-wallet-image size="lg" imageSrc=${(0, d.f)(this.imageSrc)}></wui-wallet-image>

          ${this.error ? null : this.loaderTemplate()}

          <wui-icon-box
            backgroundColor="error-100"
            background="opaque"
            iconColor="error-100"
            icon="close"
            size="sm"
            border
            borderColor="wui-color-bg-125"
          ></wui-icon-box>
        </wui-flex>

        <wui-flex flexDirection="column" alignItems="center" gap="xs">
          <wui-text variant="paragraph-500" color=${this.error ? "error-100" : "fg-100"}>
            ${e}
          </wui-text>
          <wui-text align="center" variant="small-500" color="fg-200">${t}</wui-text>
        </wui-flex>

        ${
          this.secondaryBtnLabel
            ? i.c`
              <wui-button
                variant="accent"
                size="md"
                ?disabled=${this.isRetrying || (!this.error && this.buffering) || this.isLoading}
                @click=${this.onTryAgain.bind(this)}
                data-testid="w3m-connecting-widget-secondary-button"
              >
                <wui-icon color="inherit" slot="iconLeft" name=${this.secondaryBtnIcon}></wui-icon>
                ${this.secondaryBtnLabel}
              </wui-button>
            `
            : null
        }
      </wui-flex>

      ${
        this.isWalletConnect
          ? i.c`
            <wui-flex .padding=${["0", "xl", "xl", "xl"]} justifyContent="center">
              <wui-link @click=${this.onCopyUri} color="fg-200" data-testid="wui-link-copy">
                <wui-icon size="xs" color="fg-200" slot="iconLeft" name="copy"></wui-icon>
                Copy link
              </wui-link>
            </wui-flex>
          `
          : null
      }

      <w3m-mobile-download-links .wallet=${this.wallet}></w3m-mobile-download-links>
    `
      );
    }
    onShowRetry() {
      if (this.error && !this.showRetry) {
        this.showRetry = !0;
        let t = this.shadowRoot?.querySelector("wui-button");
        t?.animate([{ opacity: 0 }, { opacity: 1 }], {
          fill: "forwards",
          easing: "ease",
        });
      }
    }
    onTryAgain() {
      this.buffering ||
        (D.f.setWcError(!1),
        this.onRetry
          ? ((this.isRetrying = !0), this.onRetry?.())
          : this.onConnect?.());
    }
    loaderTemplate() {
      let t = tI.f.state.themeVariables["--w3m-border-radius-master"],
        e = t ? parseInt(t.replace("px", ""), 10) : 4;
      return i.c`<wui-loading-thumbnail radius=${9 * e}></wui-loading-thumbnail>`;
    }
    onCopyUri() {
      try {
        this.uri &&
          (n.f.copyToClopboard(this.uri), tb.f.showSuccess("Link copied"));
      } catch {
        tb.f.showError("Failed to copy");
      }
    }
  }
  ((t2.styles = t1),
    t3([(0, r.f)()], t2.prototype, "isRetrying", void 0),
    t3([(0, r.f)()], t2.prototype, "uri", void 0),
    t3([(0, r.f)()], t2.prototype, "error", void 0),
    t3([(0, r.f)()], t2.prototype, "ready", void 0),
    t3([(0, r.f)()], t2.prototype, "showRetry", void 0),
    t3([(0, r.f)()], t2.prototype, "secondaryBtnLabel", void 0),
    t3([(0, r.f)()], t2.prototype, "secondaryLabel", void 0),
    t3([(0, r.f)()], t2.prototype, "buffering", void 0),
    t3([(0, r.f)()], t2.prototype, "isLoading", void 0),
    t3([(0, u.f)({ type: Boolean })], t2.prototype, "isMobile", void 0),
    t3([(0, u.f)()], t2.prototype, "onRetry", void 0));
  let t5 = class extends t2 {
    constructor() {
      if ((super(), !this.wallet))
        throw Error("w3m-connecting-wc-browser: No wallet provided");
      ((this.onConnect = this.onConnectProxy.bind(this)),
        (this.onAutoConnect = this.onConnectProxy.bind(this)),
        p.f.sendEvent({
          type: "track",
          event: "SELECT_WALLET",
          properties: { name: this.wallet.name, platform: "browser" },
        }));
    }
    async onConnectProxy() {
      try {
        this.error = !1;
        let { connectors: t } = h.f.state,
          e = t.find(
            (t) =>
              ("ANNOUNCED" === t.type && t.info?.rdns === this.wallet?.rdns) ||
              "INJECTED" === t.type ||
              t.name === this.wallet?.name,
          );
        if (e) await D.f.connectExternal(e, e.chain);
        else throw Error("w3m-connecting-wc-browser: No connector found");
        (tw.f.close(),
          p.f.sendEvent({
            type: "track",
            event: "CONNECT_SUCCESS",
            properties: {
              method: "browser",
              name: this.wallet?.name || "Unknown",
            },
          }));
      } catch (t) {
        (p.f.sendEvent({
          type: "track",
          event: "CONNECT_ERROR",
          properties: { message: t?.message ?? "Unknown" },
        }),
          (this.error = !0));
      }
    }
  };
  t5 = (function (t, e, i, r) {
    var o,
      n = arguments.length,
      a =
        n < 3
          ? e
          : null === r
            ? (r = Object.getOwnPropertyDescriptor(e, i))
            : r;
    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
      a = Reflect.decorate(t, e, i, r);
    else
      for (var s = t.length - 1; s >= 0; s--)
        (o = t[s]) && (a = (n < 3 ? o(a) : n > 3 ? o(e, i, a) : o(e, i)) || a);
    return (n > 3 && a && Object.defineProperty(e, i, a), a);
  })([(0, l.f)("w3m-connecting-wc-browser")], t5);
  let t4 = class extends t2 {
    constructor() {
      if ((super(), !this.wallet))
        throw Error("w3m-connecting-wc-desktop: No wallet provided");
      ((this.onConnect = this.onConnectProxy.bind(this)),
        (this.onRender = this.onRenderProxy.bind(this)),
        p.f.sendEvent({
          type: "track",
          event: "SELECT_WALLET",
          properties: { name: this.wallet.name, platform: "desktop" },
        }));
    }
    onRenderProxy() {
      !this.ready && this.uri && ((this.ready = !0), this.onConnect?.());
    }
    onConnectProxy() {
      if (this.wallet?.desktop_link && this.uri)
        try {
          this.error = !1;
          let { desktop_link: t, name: e } = this.wallet,
            { redirect: i, href: r } = n.f.formatNativeUrl(t, this.uri);
          (D.f.setWcLinking({ name: e, href: r }),
            D.f.setRecentWallet(this.wallet),
            n.f.openHref(i, "_blank"));
        } catch {
          this.error = !0;
        }
    }
  };
  t4 = (function (t, e, i, r) {
    var o,
      n = arguments.length,
      a =
        n < 3
          ? e
          : null === r
            ? (r = Object.getOwnPropertyDescriptor(e, i))
            : r;
    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
      a = Reflect.decorate(t, e, i, r);
    else
      for (var s = t.length - 1; s >= 0; s--)
        (o = t[s]) && (a = (n < 3 ? o(a) : n > 3 ? o(e, i, a) : o(e, i)) || a);
    return (n > 3 && a && Object.defineProperty(e, i, a), a);
  })([(0, l.f)("w3m-connecting-wc-desktop")], t4);
  var t6 = t.i(901131);
  let t8 = class extends t2 {
    constructor() {
      if (
        (super(),
        (this.btnLabelTimeout = void 0),
        (this.labelTimeout = void 0),
        (this.onRender = () => {
          !this.ready && this.uri && ((this.ready = !0), this.onConnect?.());
        }),
        (this.onConnect = () => {
          if (this.wallet?.mobile_link && this.uri)
            try {
              this.error = !1;
              let { mobile_link: t, name: e } = this.wallet,
                { redirect: i, href: r } = n.f.formatNativeUrl(t, this.uri);
              (D.f.setWcLinking({ name: e, href: r }),
                D.f.setRecentWallet(this.wallet));
              let o = n.f.isIframe() ? "_top" : "_self";
              (n.f.openHref(i, o),
                clearTimeout(this.labelTimeout),
                (this.secondaryLabel = t6.f.CONNECT_LABELS.MOBILE));
            } catch (t) {
              (p.f.sendEvent({
                type: "track",
                event: "CONNECT_PROXY_ERROR",
                properties: {
                  message:
                    t instanceof Error
                      ? t.message
                      : "Error parsing the deeplink",
                  uri: this.uri,
                  mobile_link: this.wallet.mobile_link,
                  name: this.wallet.name,
                },
              }),
                (this.error = !0));
            }
        }),
        !this.wallet)
      )
        throw Error("w3m-connecting-wc-mobile: No wallet provided");
      ((this.secondaryBtnLabel = void 0),
        (this.secondaryLabel = t6.f.CONNECT_LABELS.MOBILE),
        document.addEventListener(
          "visibilitychange",
          this.onBuffering.bind(this),
        ),
        p.f.sendEvent({
          type: "track",
          event: "SELECT_WALLET",
          properties: { name: this.wallet.name, platform: "mobile" },
        }),
        (this.btnLabelTimeout = setTimeout(() => {
          ((this.secondaryBtnLabel = "Try again"),
            (this.secondaryLabel = t6.f.CONNECT_LABELS.MOBILE));
        }, t6.f.FIVE_SEC_MS)),
        (this.labelTimeout = setTimeout(() => {
          this.secondaryLabel =
            "Hold tight... it's taking longer than expected";
        }, t6.f.THREE_SEC_MS)));
    }
    disconnectedCallback() {
      (super.disconnectedCallback(),
        document.removeEventListener(
          "visibilitychange",
          this.onBuffering.bind(this),
        ),
        clearTimeout(this.btnLabelTimeout),
        clearTimeout(this.labelTimeout));
    }
    onBuffering() {
      let t = n.f.isIos();
      document?.visibilityState === "visible" &&
        !this.error &&
        t &&
        (D.f.setBuffering(!0),
        setTimeout(() => {
          D.f.setBuffering(!1);
        }, 5e3));
    }
    onTryAgain() {
      this.buffering || (D.f.setWcError(!1), this.onConnect());
    }
  };
  t8 = (function (t, e, i, r) {
    var o,
      n = arguments.length,
      a =
        n < 3
          ? e
          : null === r
            ? (r = Object.getOwnPropertyDescriptor(e, i))
            : r;
    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
      a = Reflect.decorate(t, e, i, r);
    else
      for (var s = t.length - 1; s >= 0; s--)
        (o = t[s]) && (a = (n < 3 ? o(a) : n > 3 ? o(e, i, a) : o(e, i)) || a);
    return (n > 3 && a && Object.defineProperty(e, i, a), a);
  })([(0, l.f)("w3m-connecting-wc-mobile")], t8);
  var t9 = e,
    t7 = t.i(709626);
  function et(t, e, i) {
    return t !== e && (t - e < 0 ? e - t : t - e) <= i + 0.1;
  }
  let ee = {
      generate({ uri: t, size: e, logoSize: r, dotColor: o = "#141414" }) {
        let n,
          a,
          s = [],
          l =
            ((a = Math.sqrt(
              (n = Array.prototype.slice.call(
                t7.default.create(t, { errorCorrectionLevel: "Q" }).modules
                  .data,
                0,
              )).length,
            )),
            n.reduce(
              (t, e, i) =>
                (i % a == 0 ? t.push([e]) : t[t.length - 1].push(e)) && t,
              [],
            )),
          c = e / l.length,
          u = [
            { x: 0, y: 0 },
            { x: 1, y: 0 },
            { x: 0, y: 1 },
          ];
        u.forEach(({ x: t, y: e }) => {
          let r = (l.length - 7) * c * t,
            n = (l.length - 7) * c * e;
          for (let t = 0; t < u.length; t += 1) {
            let e = c * (7 - 2 * t);
            s.push(i.V`
            <rect
              fill=${2 === t ? o : "transparent"}
              width=${0 === t ? e - 5 : e}
              rx= ${0 === t ? (e - 5) * 0.45 : 0.45 * e}
              ry= ${0 === t ? (e - 5) * 0.45 : 0.45 * e}
              stroke=${o}
              stroke-width=${5 * (0 === t)}
              height=${0 === t ? e - 5 : e}
              x= ${0 === t ? n + c * t + 2.5 : n + c * t}
              y= ${0 === t ? r + c * t + 2.5 : r + c * t}
            />
          `);
          }
        });
        let d = Math.floor((r + 25) / c),
          h = l.length / 2 - d / 2,
          p = l.length / 2 + d / 2 - 1,
          f = [];
        l.forEach((t, e) => {
          t.forEach((t, i) => {
            !l[e][i] ||
              (e < 7 && i < 7) ||
              (e > l.length - 8 && i < 7) ||
              (e < 7 && i > l.length - 8) ||
              (e > h && e < p && i > h && i < p) ||
              f.push([e * c + c / 2, i * c + c / 2]);
          });
        });
        let g = {};
        return (
          f.forEach(([t, e]) => {
            g[t] ? g[t]?.push(e) : (g[t] = [e]);
          }),
          Object.entries(g)
            .map(([t, e]) => {
              let i = e.filter((t) => e.every((e) => !et(t, e, c)));
              return [Number(t), i];
            })
            .forEach(([t, e]) => {
              e.forEach((e) => {
                s.push(i.V`<circle cx=${t} cy=${e} fill=${o} r=${c / 2.5} />`);
              });
            }),
          Object.entries(g)
            .filter(([t, e]) => e.length > 1)
            .map(([t, e]) => {
              let i = e.filter((t) => e.some((e) => et(t, e, c)));
              return [Number(t), i];
            })
            .map(([t, e]) => {
              e.sort((t, e) => (t < e ? -1 : 1));
              let i = [];
              for (let t of e) {
                let e = i.find((e) => e.some((e) => et(t, e, c)));
                e ? e.push(t) : i.push([t]);
              }
              return [t, i.map((t) => [t[0], t[t.length - 1]])];
            })
            .forEach(([t, e]) => {
              e.forEach(([e, r]) => {
                s.push(i.V`
              <line
                x1=${t}
                x2=${t}
                y1=${e}
                y2=${r}
                stroke=${o}
                stroke-width=${c / 1.25}
                stroke-linecap="round"
              />
            `);
              });
            }),
          s
        );
      },
    },
    ei = v.m`
  :host {
    position: relative;
    user-select: none;
    display: block;
    overflow: hidden;
    aspect-ratio: 1 / 1;
    width: var(--local-size);
  }

  :host([data-theme='dark']) {
    border-radius: clamp(0px, var(--wui-border-radius-l), 40px);
    background-color: var(--wui-color-inverse-100);
    padding: var(--wui-spacing-l);
  }

  :host([data-theme='light']) {
    box-shadow: 0 0 0 1px var(--wui-color-bg-125);
    background-color: var(--wui-color-bg-125);
  }

  :host([data-clear='true']) > wui-icon {
    display: none;
  }

  svg:first-child,
  wui-image,
  wui-icon {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateY(-50%) translateX(-50%);
  }

  wui-image {
    width: 25%;
    height: 25%;
    border-radius: var(--wui-border-radius-xs);
  }

  wui-icon {
    width: 100%;
    height: 100%;
    color: var(--local-icon-color) !important;
    transform: translateY(-50%) translateX(-50%) scale(0.25);
  }
`;
  var er = function (t, e, i, r) {
    var o,
      n = arguments.length,
      a =
        n < 3
          ? e
          : null === r
            ? (r = Object.getOwnPropertyDescriptor(e, i))
            : r;
    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
      a = Reflect.decorate(t, e, i, r);
    else
      for (var s = t.length - 1; s >= 0; s--)
        (o = t[s]) && (a = (n < 3 ? o(a) : n > 3 ? o(e, i, a) : o(e, i)) || a);
    return (n > 3 && a && Object.defineProperty(e, i, a), a);
  };
  let eo = class extends t9.f {
    constructor() {
      (super(...arguments),
        (this.uri = ""),
        (this.size = 0),
        (this.theme = "dark"),
        (this.imageSrc = void 0),
        (this.alt = void 0),
        (this.arenaClear = void 0),
        (this.farcaster = void 0));
    }
    render() {
      return (
        (this.dataset.theme = this.theme),
        (this.dataset.clear = String(this.arenaClear)),
        (this.style.cssText = `
     --local-size: ${this.size}px;
     --local-icon-color: ${this.color ?? "#3396ff"}
    `),
        i.c`${this.templateVisual()} ${this.templateSvg()}`
      );
    }
    templateSvg() {
      let t = "light" === this.theme ? this.size : this.size - 32;
      return i.V`
      <svg height=${t} width=${t}>
        ${ee.generate({ uri: this.uri, size: t, logoSize: this.arenaClear ? 0 : t / 4, dotColor: this.color })}
      </svg>
    `;
    }
    templateVisual() {
      return this.imageSrc
        ? i.c`<wui-image src=${this.imageSrc} alt=${this.alt ?? "logo"}></wui-image>`
        : this.farcaster
          ? i.c`<wui-icon
        class="farcaster"
        size="inherit"
        color="inherit"
        name="farcaster"
      ></wui-icon>`
          : i.c`<wui-icon size="inherit" color="inherit" name="walletConnect"></wui-icon>`;
    }
  };
  ((eo.styles = [w.e, ei]),
    er([(0, u.f)()], eo.prototype, "uri", void 0),
    er([(0, u.f)({ type: Number })], eo.prototype, "size", void 0),
    er([(0, u.f)()], eo.prototype, "theme", void 0),
    er([(0, u.f)()], eo.prototype, "imageSrc", void 0),
    er([(0, u.f)()], eo.prototype, "alt", void 0),
    er([(0, u.f)()], eo.prototype, "color", void 0),
    er([(0, u.f)({ type: Boolean })], eo.prototype, "arenaClear", void 0),
    er([(0, u.f)({ type: Boolean })], eo.prototype, "farcaster", void 0),
    (eo = er([(0, l.f)("wui-qr-code")], eo)));
  var en = e;
  let ea = v.m`
  :host {
    display: block;
    box-shadow: inset 0 0 0 1px var(--wui-color-gray-glass-005);
    background: linear-gradient(
      120deg,
      var(--wui-color-bg-200) 5%,
      var(--wui-color-bg-200) 48%,
      var(--wui-color-bg-300) 55%,
      var(--wui-color-bg-300) 60%,
      var(--wui-color-bg-300) calc(60% + 10px),
      var(--wui-color-bg-200) calc(60% + 12px),
      var(--wui-color-bg-200) 100%
    );
    background-size: 250%;
    animation: shimmer 3s linear infinite reverse;
  }

  :host([variant='light']) {
    background: linear-gradient(
      120deg,
      var(--wui-color-bg-150) 5%,
      var(--wui-color-bg-150) 48%,
      var(--wui-color-bg-200) 55%,
      var(--wui-color-bg-200) 60%,
      var(--wui-color-bg-200) calc(60% + 10px),
      var(--wui-color-bg-150) calc(60% + 12px),
      var(--wui-color-bg-150) 100%
    );
    background-size: 250%;
  }

  @keyframes shimmer {
    from {
      background-position: -250% 0;
    }
    to {
      background-position: 250% 0;
    }
  }
`;
  var es = function (t, e, i, r) {
    var o,
      n = arguments.length,
      a =
        n < 3
          ? e
          : null === r
            ? (r = Object.getOwnPropertyDescriptor(e, i))
            : r;
    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
      a = Reflect.decorate(t, e, i, r);
    else
      for (var s = t.length - 1; s >= 0; s--)
        (o = t[s]) && (a = (n < 3 ? o(a) : n > 3 ? o(e, i, a) : o(e, i)) || a);
    return (n > 3 && a && Object.defineProperty(e, i, a), a);
  };
  let el = class extends en.f {
    constructor() {
      (super(...arguments),
        (this.width = ""),
        (this.height = ""),
        (this.borderRadius = "m"),
        (this.variant = "default"));
    }
    render() {
      return (
        (this.style.cssText = `
      width: ${this.width};
      height: ${this.height};
      border-radius: clamp(0px,var(--wui-border-radius-${this.borderRadius}), 40px);
    `),
        i.c`<slot></slot>`
      );
    }
  };
  ((el.styles = [ea]),
    es([(0, u.f)()], el.prototype, "width", void 0),
    es([(0, u.f)()], el.prototype, "height", void 0),
    es([(0, u.f)()], el.prototype, "borderRadius", void 0),
    es([(0, u.f)()], el.prototype, "variant", void 0),
    (el = es([(0, l.f)("wui-shimmer")], el)));
  var ec = e;
  let eu = v.m`
  .reown-logo {
    height: var(--wui-spacing-xxl);
  }
`,
    ed = class extends ec.f {
      render() {
        return i.c`
      <wui-flex
        justifyContent="center"
        alignItems="center"
        gap="xs"
        .padding=${["0", "0", "l", "0"]}
      >
        <wui-text variant="small-500" color="fg-100"> UX by </wui-text>
        <wui-icon name="reown" size="xxxl" class="reown-logo"></wui-icon>
      </wui-flex>
    `;
      }
    };
  ((ed.styles = [w.e, w.j, eu]),
    (ed = (function (t, e, i, r) {
      var o,
        n = arguments.length,
        a =
          n < 3
            ? e
            : null === r
              ? (r = Object.getOwnPropertyDescriptor(e, i))
              : r;
      if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
        a = Reflect.decorate(t, e, i, r);
      else
        for (var s = t.length - 1; s >= 0; s--)
          (o = t[s]) &&
            (a = (n < 3 ? o(a) : n > 3 ? o(e, i, a) : o(e, i)) || a);
      return (n > 3 && a && Object.defineProperty(e, i, a), a);
    })([(0, l.f)("wui-ux-by-reown")], ed)));
  let eh = v.m`
  @keyframes fadein {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  wui-shimmer {
    width: 100%;
    aspect-ratio: 1 / 1;
    border-radius: clamp(0px, var(--wui-border-radius-l), 40px) !important;
  }

  wui-qr-code {
    opacity: 0;
    animation-duration: 200ms;
    animation-timing-function: ease;
    animation-name: fadein;
    animation-fill-mode: forwards;
  }
`,
    ep = class extends t2 {
      constructor() {
        (super(),
          (this.forceUpdate = () => {
            this.requestUpdate();
          }),
          window.addEventListener("resize", this.forceUpdate),
          p.f.sendEvent({
            type: "track",
            event: "SELECT_WALLET",
            properties: {
              name: this.wallet?.name ?? "WalletConnect",
              platform: "qrcode",
            },
          }));
      }
      disconnectedCallback() {
        (super.disconnectedCallback(),
          this.unsubscribe?.forEach((t) => t()),
          window.removeEventListener("resize", this.forceUpdate));
      }
      render() {
        return (
          this.onRenderProxy(),
          i.c`
      <wui-flex
        flexDirection="column"
        alignItems="center"
        .padding=${["0", "xl", "xl", "xl"]}
        gap="xl"
      >
        <wui-shimmer borderRadius="l" width="100%"> ${this.qrCodeTemplate()} </wui-shimmer>

        <wui-text variant="paragraph-500" color="fg-100">
          Scan this QR Code with your phone
        </wui-text>
        ${this.copyTemplate()}
      </wui-flex>
      <w3m-mobile-download-links .wallet=${this.wallet}></w3m-mobile-download-links>
    `
        );
      }
      onRenderProxy() {
        !this.ready &&
          this.uri &&
          (this.timeout = setTimeout(() => {
            this.ready = !0;
          }, 200));
      }
      qrCodeTemplate() {
        if (!this.uri || !this.ready) return null;
        let t = this.getBoundingClientRect().width - 40,
          e = this.wallet ? this.wallet.name : void 0;
        return (
          D.f.setWcLinking(void 0),
          D.f.setRecentWallet(this.wallet),
          i.c` <wui-qr-code
      size=${t}
      theme=${tI.f.state.themeMode}
      uri=${this.uri}
      imageSrc=${(0, d.f)(L.f.getWalletImage(this.wallet))}
      color=${(0, d.f)(tI.f.state.themeVariables["--w3m-qr-color"])}
      alt=${(0, d.f)(e)}
      data-testid="wui-qr-code"
    ></wui-qr-code>`
        );
      }
      copyTemplate() {
        let t = !this.uri || !this.ready;
        return i.c`<wui-link
      .disabled=${t}
      @click=${this.onCopyUri}
      color="fg-200"
      data-testid="copy-wc2-uri"
    >
      <wui-icon size="xs" color="fg-200" slot="iconLeft" name="copy"></wui-icon>
      Copy link
    </wui-link>`;
      }
    };
  ((ep.styles = eh),
    (ep = (function (t, e, i, r) {
      var o,
        n = arguments.length,
        a =
          n < 3
            ? e
            : null === r
              ? (r = Object.getOwnPropertyDescriptor(e, i))
              : r;
      if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
        a = Reflect.decorate(t, e, i, r);
      else
        for (var s = t.length - 1; s >= 0; s--)
          (o = t[s]) &&
            (a = (n < 3 ? o(a) : n > 3 ? o(e, i, a) : o(e, i)) || a);
      return (n > 3 && a && Object.defineProperty(e, i, a), a);
    })([(0, l.f)("w3m-connecting-wc-qrcode")], ep)));
  var ef = e;
  let eg = class extends ef.f {
    constructor() {
      if ((super(), (this.wallet = f.f.state.data?.wallet), !this.wallet))
        throw Error("w3m-connecting-wc-unsupported: No wallet provided");
      p.f.sendEvent({
        type: "track",
        event: "SELECT_WALLET",
        properties: { name: this.wallet.name, platform: "browser" },
      });
    }
    render() {
      return i.c`
      <wui-flex
        flexDirection="column"
        alignItems="center"
        .padding=${["3xl", "xl", "xl", "xl"]}
        gap="xl"
      >
        <wui-wallet-image
          size="lg"
          imageSrc=${(0, d.f)(L.f.getWalletImage(this.wallet))}
        ></wui-wallet-image>

        <wui-text variant="paragraph-500" color="fg-100">Not Detected</wui-text>
      </wui-flex>

      <w3m-mobile-download-links .wallet=${this.wallet}></w3m-mobile-download-links>
    `;
    }
  };
  eg = (function (t, e, i, r) {
    var o,
      n = arguments.length,
      a =
        n < 3
          ? e
          : null === r
            ? (r = Object.getOwnPropertyDescriptor(e, i))
            : r;
    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
      a = Reflect.decorate(t, e, i, r);
    else
      for (var s = t.length - 1; s >= 0; s--)
        (o = t[s]) && (a = (n < 3 ? o(a) : n > 3 ? o(e, i, a) : o(e, i)) || a);
    return (n > 3 && a && Object.defineProperty(e, i, a), a);
  })([(0, l.f)("w3m-connecting-wc-unsupported")], eg);
  var ew = function (t, e, i, r) {
    var o,
      n = arguments.length,
      a =
        n < 3
          ? e
          : null === r
            ? (r = Object.getOwnPropertyDescriptor(e, i))
            : r;
    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
      a = Reflect.decorate(t, e, i, r);
    else
      for (var s = t.length - 1; s >= 0; s--)
        (o = t[s]) && (a = (n < 3 ? o(a) : n > 3 ? o(e, i, a) : o(e, i)) || a);
    return (n > 3 && a && Object.defineProperty(e, i, a), a);
  };
  let eb = class extends t2 {
    constructor() {
      if ((super(), (this.isLoading = !0), !this.wallet))
        throw Error("w3m-connecting-wc-web: No wallet provided");
      ((this.onConnect = this.onConnectProxy.bind(this)),
        (this.secondaryBtnLabel = "Open"),
        (this.secondaryLabel = "Open and continue in a new browser tab"),
        (this.secondaryBtnIcon = "externalLink"),
        this.updateLoadingState(),
        this.unsubscribe.push(
          D.f.subscribeKey("wcUri", () => {
            this.updateLoadingState();
          }),
        ),
        p.f.sendEvent({
          type: "track",
          event: "SELECT_WALLET",
          properties: { name: this.wallet.name, platform: "web" },
        }));
    }
    updateLoadingState() {
      this.isLoading = !this.uri;
    }
    onConnectProxy() {
      if (this.wallet?.webapp_link && this.uri)
        try {
          this.error = !1;
          let { webapp_link: t, name: e } = this.wallet,
            { redirect: i, href: r } = n.f.formatUniversalUrl(t, this.uri);
          (D.f.setWcLinking({ name: e, href: r }),
            D.f.setRecentWallet(this.wallet),
            n.f.openHref(i, "_blank"));
        } catch {
          this.error = !0;
        }
    }
  };
  (ew([(0, r.f)()], eb.prototype, "isLoading", void 0),
    (eb = ew([(0, l.f)("w3m-connecting-wc-web")], eb)));
  var em = function (t, e, i, r) {
    var o,
      n = arguments.length,
      a =
        n < 3
          ? e
          : null === r
            ? (r = Object.getOwnPropertyDescriptor(e, i))
            : r;
    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
      a = Reflect.decorate(t, e, i, r);
    else
      for (var s = t.length - 1; s >= 0; s--)
        (o = t[s]) && (a = (n < 3 ? o(a) : n > 3 ? o(e, i, a) : o(e, i)) || a);
    return (n > 3 && a && Object.defineProperty(e, i, a), a);
  };
  let ev = class extends tf.f {
    constructor() {
      (super(),
        (this.wallet = f.f.state.data?.wallet),
        (this.platform = void 0),
        (this.platforms = []),
        (this.isSiwxEnabled = !!a.f.state.siwx),
        this.determinePlatforms(),
        this.initializeConnection());
    }
    render() {
      return i.c`
      ${this.headerTemplate()}
      <div>${this.platformTemplate()}</div>
      <wui-ux-by-reown></wui-ux-by-reown>
    `;
    }
    async initializeConnection(t = !1) {
      if ("browser" !== this.platform && (!a.f.state.manualWCControl || t))
        try {
          let { wcPairingExpiry: e, status: i } = D.f.state;
          (t || n.f.isPairingExpired(e) || "connecting" === i) &&
            (await D.f.connectWalletConnect(),
            this.isSiwxEnabled || tw.f.close());
        } catch (t) {
          (p.f.sendEvent({
            type: "track",
            event: "CONNECT_ERROR",
            properties: { message: t?.message ?? "Unknown" },
          }),
            D.f.setWcError(!0),
            tb.f.showError(t.message ?? "Connection error"),
            D.f.resetWcConnection(),
            f.f.goBack());
        }
    }
    determinePlatforms() {
      if (!this.wallet) {
        (this.platforms.push("qrcode"), (this.platform = "qrcode"));
        return;
      }
      if (this.platform) return;
      let {
          mobile_link: t,
          desktop_link: e,
          webapp_link: i,
          injected: r,
          rdns: o,
        } = this.wallet,
        s = r?.map(({ injected_id: t }) => t).filter(Boolean),
        l = [...(o ? [o] : (s ?? []))],
        c = !a.f.state.isUniversalProvider && l.length,
        u = D.f.checkInstalled(l),
        d = c && u,
        h = e && !n.f.isMobile();
      (d && !tg.f.state.noAdapters && this.platforms.push("browser"),
        t && this.platforms.push(n.f.isMobile() ? "mobile" : "qrcode"),
        i && this.platforms.push("web"),
        h && this.platforms.push("desktop"),
        d || !c || tg.f.state.noAdapters || this.platforms.push("unsupported"),
        (this.platform = this.platforms[0]));
    }
    platformTemplate() {
      switch (this.platform) {
        case "browser":
          return i.c`<w3m-connecting-wc-browser></w3m-connecting-wc-browser>`;
        case "web":
          return i.c`<w3m-connecting-wc-web></w3m-connecting-wc-web>`;
        case "desktop":
          return i.c`
          <w3m-connecting-wc-desktop .onRetry=${() => this.initializeConnection(!0)}>
          </w3m-connecting-wc-desktop>
        `;
        case "mobile":
          return i.c`
          <w3m-connecting-wc-mobile isMobile .onRetry=${() => this.initializeConnection(!0)}>
          </w3m-connecting-wc-mobile>
        `;
        case "qrcode":
          return i.c`<w3m-connecting-wc-qrcode></w3m-connecting-wc-qrcode>`;
        default:
          return i.c`<w3m-connecting-wc-unsupported></w3m-connecting-wc-unsupported>`;
      }
    }
    headerTemplate() {
      return this.platforms.length > 1
        ? i.c`
      <w3m-connecting-header
        .platforms=${this.platforms}
        .onSelectPlatfrom=${this.onSelectPlatform.bind(this)}
      >
      </w3m-connecting-header>
    `
        : null;
    }
    async onSelectPlatform(t) {
      let e = this.shadowRoot?.querySelector("div");
      e &&
        (await e.animate([{ opacity: 1 }, { opacity: 0 }], {
          duration: 200,
          fill: "forwards",
          easing: "ease",
        }).finished,
        (this.platform = t),
        e.animate([{ opacity: 0 }, { opacity: 1 }], {
          duration: 200,
          fill: "forwards",
          easing: "ease",
        }));
    }
  };
  (em([(0, r.f)()], ev.prototype, "platform", void 0),
    em([(0, r.f)()], ev.prototype, "platforms", void 0),
    em([(0, r.f)()], ev.prototype, "isSiwxEnabled", void 0),
    (ev = em([(0, l.f)("w3m-connecting-wc-view")], ev)));
  var ey = function (t, e, i, r) {
    var o,
      n = arguments.length,
      a =
        n < 3
          ? e
          : null === r
            ? (r = Object.getOwnPropertyDescriptor(e, i))
            : r;
    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
      a = Reflect.decorate(t, e, i, r);
    else
      for (var s = t.length - 1; s >= 0; s--)
        (o = t[s]) && (a = (n < 3 ? o(a) : n > 3 ? o(e, i, a) : o(e, i)) || a);
    return (n > 3 && a && Object.defineProperty(e, i, a), a);
  };
  let ex = class extends e.f {
    constructor() {
      (super(...arguments), (this.isMobile = n.f.isMobile()));
    }
    render() {
      if (this.isMobile) {
        let { featured: t, recommended: e } = o.f.state,
          { customWallets: r } = a.f.state,
          n = s.f.getRecentWallets(),
          l = t.length || e.length || r?.length || n.length;
        return i.c`<wui-flex
        flexDirection="column"
        gap="xs"
        .margin=${["3xs", "s", "s", "s"]}
      >
        ${l ? i.c`<w3m-connector-list></w3m-connector-list>` : null}
        <w3m-all-wallets-widget></w3m-all-wallets-widget>
      </wui-flex>`;
      }
      return i.c`<wui-flex flexDirection="column" .padding=${["0", "0", "l", "0"]}>
      <w3m-connecting-wc-view></w3m-connecting-wc-view>
      <wui-flex flexDirection="column" .padding=${["0", "m", "0", "m"]}>
        <w3m-all-wallets-widget></w3m-all-wallets-widget> </wui-flex
    ></wui-flex>`;
    }
  };
  (ey([(0, r.f)()], ex.prototype, "isMobile", void 0),
    (ex = ey([(0, l.f)("w3m-connecting-wc-basic-view")], ex)),
    t.s(["W3mConnectingWcBasicView", 0, ex], 424907));
  var e$ = e,
    eC = e,
    ek = e,
    eR = t.i(372288),
    eI = t.i(972853);
  let eE = () => new eT();
  class eT {}
  let eS = new WeakMap(),
    ej = (0, eI.l)(
      class extends eR.f {
        render(t) {
          return i.i;
        }
        update(t, [e]) {
          let r = e !== this.G;
          return (
            r && void 0 !== this.G && this.rt(void 0),
            (r || this.lt !== this.ct) &&
              ((this.G = e),
              (this.ht = t.options?.host),
              this.rt((this.ct = t.element))),
            i.i
          );
        }
        rt(t) {
          if ((this.isConnected || (t = void 0), "function" == typeof this.G)) {
            let e = this.ht ?? globalThis,
              i = eS.get(e);
            (void 0 === i && ((i = new WeakMap()), eS.set(e, i)),
              void 0 !== i.get(this.G) && this.G.call(this.ht, void 0),
              i.set(this.G, t),
              void 0 !== t && this.G.call(this.ht, t));
          } else this.G.value = t;
        }
        get lt() {
          return "function" == typeof this.G
            ? eS.get(this.ht ?? globalThis)?.get(this.G)
            : this.G?.value;
        }
        disconnected() {
          this.lt === this.ct && this.rt(void 0);
        }
        reconnected() {
          this.rt(this.ct);
        }
      },
    ),
    eP = v.m`
  :host {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  label {
    position: relative;
    display: inline-block;
    width: 32px;
    height: 22px;
  }

  input {
    width: 0;
    height: 0;
    opacity: 0;
  }

  span {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: var(--wui-color-blue-100);
    border-width: 1px;
    border-style: solid;
    border-color: var(--wui-color-gray-glass-002);
    border-radius: 999px;
    transition:
      background-color var(--wui-ease-inout-power-1) var(--wui-duration-md),
      border-color var(--wui-ease-inout-power-1) var(--wui-duration-md);
    will-change: background-color, border-color;
  }

  span:before {
    position: absolute;
    content: '';
    height: 16px;
    width: 16px;
    left: 3px;
    top: 2px;
    background-color: var(--wui-color-inverse-100);
    transition: transform var(--wui-ease-inout-power-1) var(--wui-duration-lg);
    will-change: transform;
    border-radius: 50%;
  }

  input:checked + span {
    border-color: var(--wui-color-gray-glass-005);
    background-color: var(--wui-color-blue-100);
  }

  input:not(:checked) + span {
    background-color: var(--wui-color-gray-glass-010);
  }

  input:checked + span:before {
    transform: translateX(calc(100% - 7px));
  }
`;
  var eO = function (t, e, i, r) {
    var o,
      n = arguments.length,
      a =
        n < 3
          ? e
          : null === r
            ? (r = Object.getOwnPropertyDescriptor(e, i))
            : r;
    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
      a = Reflect.decorate(t, e, i, r);
    else
      for (var s = t.length - 1; s >= 0; s--)
        (o = t[s]) && (a = (n < 3 ? o(a) : n > 3 ? o(e, i, a) : o(e, i)) || a);
    return (n > 3 && a && Object.defineProperty(e, i, a), a);
  };
  let eL = class extends ek.f {
    constructor() {
      (super(...arguments),
        (this.inputElementRef = eE()),
        (this.checked = void 0));
    }
    render() {
      return i.c`
      <label>
        <input
          ${ej(this.inputElementRef)}
          type="checkbox"
          ?checked=${(0, d.f)(this.checked)}
          @change=${this.dispatchChangeEvent.bind(this)}
        />
        <span></span>
      </label>
    `;
    }
    dispatchChangeEvent() {
      this.dispatchEvent(
        new CustomEvent("switchChange", {
          detail: this.inputElementRef.value?.checked,
          bubbles: !0,
          composed: !0,
        }),
      );
    }
  };
  ((eL.styles = [w.e, w.j, w.G, eP]),
    eO([(0, u.f)({ type: Boolean })], eL.prototype, "checked", void 0),
    (eL = eO([(0, l.f)("wui-switch")], eL)));
  let eA = v.m`
  :host {
    height: 100%;
  }

  button {
    display: flex;
    align-items: center;
    justify-content: center;
    column-gap: var(--wui-spacing-1xs);
    padding: var(--wui-spacing-xs) var(--wui-spacing-s);
    background-color: var(--wui-color-gray-glass-002);
    border-radius: var(--wui-border-radius-xs);
    box-shadow: inset 0 0 0 1px var(--wui-color-gray-glass-002);
    transition: background-color var(--wui-ease-out-power-1) var(--wui-duration-md);
    will-change: background-color;
    cursor: pointer;
  }

  wui-switch {
    pointer-events: none;
  }
`;
  var eB = function (t, e, i, r) {
    var o,
      n = arguments.length,
      a =
        n < 3
          ? e
          : null === r
            ? (r = Object.getOwnPropertyDescriptor(e, i))
            : r;
    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
      a = Reflect.decorate(t, e, i, r);
    else
      for (var s = t.length - 1; s >= 0; s--)
        (o = t[s]) && (a = (n < 3 ? o(a) : n > 3 ? o(e, i, a) : o(e, i)) || a);
    return (n > 3 && a && Object.defineProperty(e, i, a), a);
  };
  let ez = class extends eC.f {
    constructor() {
      (super(...arguments), (this.checked = void 0));
    }
    render() {
      return i.c`
      <button>
        <wui-icon size="xl" name="walletConnectBrown"></wui-icon>
        <wui-switch ?checked=${(0, d.f)(this.checked)}></wui-switch>
      </button>
    `;
    }
  };
  ((ez.styles = [w.e, w.j, eA]),
    eB([(0, u.f)({ type: Boolean })], ez.prototype, "checked", void 0),
    (ez = eB([(0, l.f)("wui-certified-switch")], ez)));
  var eW = e,
    eD = e;
  let eN = v.m`
  button {
    background-color: var(--wui-color-fg-300);
    border-radius: var(--wui-border-radius-4xs);
    width: 16px;
    height: 16px;
  }

  button:disabled {
    background-color: var(--wui-color-bg-300);
  }

  wui-icon {
    color: var(--wui-color-bg-200) !important;
  }

  button:focus-visible {
    background-color: var(--wui-color-fg-250);
    border: 1px solid var(--wui-color-accent-100);
  }

  @media (hover: hover) and (pointer: fine) {
    button:hover:enabled {
      background-color: var(--wui-color-fg-250);
    }

    button:active:enabled {
      background-color: var(--wui-color-fg-225);
    }
  }
`;
  var eM = function (t, e, i, r) {
    var o,
      n = arguments.length,
      a =
        n < 3
          ? e
          : null === r
            ? (r = Object.getOwnPropertyDescriptor(e, i))
            : r;
    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
      a = Reflect.decorate(t, e, i, r);
    else
      for (var s = t.length - 1; s >= 0; s--)
        (o = t[s]) && (a = (n < 3 ? o(a) : n > 3 ? o(e, i, a) : o(e, i)) || a);
    return (n > 3 && a && Object.defineProperty(e, i, a), a);
  };
  let eU = class extends eD.f {
    constructor() {
      (super(...arguments), (this.icon = "copy"));
    }
    render() {
      return i.c`
      <button>
        <wui-icon color="inherit" size="xxs" name=${this.icon}></wui-icon>
      </button>
    `;
    }
  };
  ((eU.styles = [w.e, w.j, eN]),
    eM([(0, u.f)()], eU.prototype, "icon", void 0),
    (eU = eM([(0, l.f)("wui-input-element")], eU)));
  var eq = e;
  t.i(182384);
  var eV = t.i(198060);
  let e_ = v.m`
  :host {
    position: relative;
    width: 100%;
    display: inline-block;
    color: var(--wui-color-fg-275);
  }

  input {
    width: 100%;
    border-radius: var(--wui-border-radius-xs);
    box-shadow: inset 0 0 0 1px var(--wui-color-gray-glass-002);
    background: var(--wui-color-gray-glass-002);
    font-size: var(--wui-font-size-paragraph);
    letter-spacing: var(--wui-letter-spacing-paragraph);
    color: var(--wui-color-fg-100);
    transition:
      background-color var(--wui-ease-inout-power-1) var(--wui-duration-md),
      border-color var(--wui-ease-inout-power-1) var(--wui-duration-md),
      box-shadow var(--wui-ease-inout-power-1) var(--wui-duration-md);
    will-change: background-color, border-color, box-shadow;
    caret-color: var(--wui-color-accent-100);
  }

  input:disabled {
    cursor: not-allowed;
    border: 1px solid var(--wui-color-gray-glass-010);
  }

  input:disabled::placeholder,
  input:disabled + wui-icon {
    color: var(--wui-color-fg-300);
  }

  input::placeholder {
    color: var(--wui-color-fg-275);
  }

  input:focus:enabled {
    background-color: var(--wui-color-gray-glass-005);
    -webkit-box-shadow:
      inset 0 0 0 1px var(--wui-color-accent-100),
      0px 0px 0px 4px var(--wui-box-shadow-blue);
    -moz-box-shadow:
      inset 0 0 0 1px var(--wui-color-accent-100),
      0px 0px 0px 4px var(--wui-box-shadow-blue);
    box-shadow:
      inset 0 0 0 1px var(--wui-color-accent-100),
      0px 0px 0px 4px var(--wui-box-shadow-blue);
  }

  input:hover:enabled {
    background-color: var(--wui-color-gray-glass-005);
  }

  wui-icon {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    pointer-events: none;
  }

  .wui-size-sm {
    padding: 9px var(--wui-spacing-m) 10px var(--wui-spacing-s);
  }

  wui-icon + .wui-size-sm {
    padding: 9px var(--wui-spacing-m) 10px 36px;
  }

  wui-icon[data-input='sm'] {
    left: var(--wui-spacing-s);
  }

  .wui-size-md {
    padding: 15px var(--wui-spacing-m) var(--wui-spacing-l) var(--wui-spacing-m);
  }

  wui-icon + .wui-size-md,
  wui-loading-spinner + .wui-size-md {
    padding: 10.5px var(--wui-spacing-3xl) 10.5px var(--wui-spacing-3xl);
  }

  wui-icon[data-input='md'] {
    left: var(--wui-spacing-l);
  }

  .wui-size-lg {
    padding: var(--wui-spacing-s) var(--wui-spacing-s) var(--wui-spacing-s) var(--wui-spacing-l);
    letter-spacing: var(--wui-letter-spacing-medium-title);
    font-size: var(--wui-font-size-medium-title);
    font-weight: var(--wui-font-weight-light);
    line-height: 130%;
    color: var(--wui-color-fg-100);
    height: 64px;
  }

  .wui-padding-right-xs {
    padding-right: var(--wui-spacing-xs);
  }

  .wui-padding-right-s {
    padding-right: var(--wui-spacing-s);
  }

  .wui-padding-right-m {
    padding-right: var(--wui-spacing-m);
  }

  .wui-padding-right-l {
    padding-right: var(--wui-spacing-l);
  }

  .wui-padding-right-xl {
    padding-right: var(--wui-spacing-xl);
  }

  .wui-padding-right-2xl {
    padding-right: var(--wui-spacing-2xl);
  }

  .wui-padding-right-3xl {
    padding-right: var(--wui-spacing-3xl);
  }

  .wui-padding-right-4xl {
    padding-right: var(--wui-spacing-4xl);
  }

  .wui-padding-right-5xl {
    padding-right: var(--wui-spacing-5xl);
  }

  wui-icon + .wui-size-lg,
  wui-loading-spinner + .wui-size-lg {
    padding-left: 50px;
  }

  wui-icon[data-input='lg'] {
    left: var(--wui-spacing-l);
  }

  .wui-size-mdl {
    padding: 17.25px var(--wui-spacing-m) 17.25px var(--wui-spacing-m);
  }
  wui-icon + .wui-size-mdl,
  wui-loading-spinner + .wui-size-mdl {
    padding: 17.25px var(--wui-spacing-3xl) 17.25px 40px;
  }
  wui-icon[data-input='mdl'] {
    left: var(--wui-spacing-m);
  }

  input:placeholder-shown ~ ::slotted(wui-input-element),
  input:placeholder-shown ~ ::slotted(wui-icon) {
    opacity: 0;
    pointer-events: none;
  }

  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  input[type='number'] {
    -moz-appearance: textfield;
  }

  ::slotted(wui-input-element),
  ::slotted(wui-icon) {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
  }

  ::slotted(wui-input-element) {
    right: var(--wui-spacing-m);
  }

  ::slotted(wui-icon) {
    right: 0px;
  }
`;
  var eK = function (t, e, i, r) {
    var o,
      n = arguments.length,
      a =
        n < 3
          ? e
          : null === r
            ? (r = Object.getOwnPropertyDescriptor(e, i))
            : r;
    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
      a = Reflect.decorate(t, e, i, r);
    else
      for (var s = t.length - 1; s >= 0; s--)
        (o = t[s]) && (a = (n < 3 ? o(a) : n > 3 ? o(e, i, a) : o(e, i)) || a);
    return (n > 3 && a && Object.defineProperty(e, i, a), a);
  };
  let eH = class extends eq.f {
    constructor() {
      (super(...arguments),
        (this.inputElementRef = eE()),
        (this.size = "md"),
        (this.disabled = !1),
        (this.placeholder = ""),
        (this.type = "text"),
        (this.value = ""));
    }
    render() {
      let t = `wui-padding-right-${this.inputRightPadding}`,
        e = { [`wui-size-${this.size}`]: !0, [t]: !!this.inputRightPadding };
      return i.c`${this.templateIcon()}
      <input
        data-testid="wui-input-text"
        ${ej(this.inputElementRef)}
        class=${(0, eV.f)(e)}
        type=${this.type}
        enterkeyhint=${(0, d.f)(this.enterKeyHint)}
        ?disabled=${this.disabled}
        placeholder=${this.placeholder}
        @input=${this.dispatchInputChangeEvent.bind(this)}
        .value=${this.value || ""}
        tabindex=${(0, d.f)(this.tabIdx)}
      />
      <slot></slot>`;
    }
    templateIcon() {
      return this.icon
        ? i.c`<wui-icon
        data-input=${this.size}
        size=${this.size}
        color="inherit"
        name=${this.icon}
      ></wui-icon>`
        : null;
    }
    dispatchInputChangeEvent() {
      this.dispatchEvent(
        new CustomEvent("inputChange", {
          detail: this.inputElementRef.value?.value,
          bubbles: !0,
          composed: !0,
        }),
      );
    }
  };
  ((eH.styles = [w.e, w.j, e_]),
    eK([(0, u.f)()], eH.prototype, "size", void 0),
    eK([(0, u.f)()], eH.prototype, "icon", void 0),
    eK([(0, u.f)({ type: Boolean })], eH.prototype, "disabled", void 0),
    eK([(0, u.f)()], eH.prototype, "placeholder", void 0),
    eK([(0, u.f)()], eH.prototype, "type", void 0),
    eK([(0, u.f)()], eH.prototype, "keyHint", void 0),
    eK([(0, u.f)()], eH.prototype, "value", void 0),
    eK([(0, u.f)()], eH.prototype, "inputRightPadding", void 0),
    eK([(0, u.f)()], eH.prototype, "tabIdx", void 0),
    (eH = eK([(0, l.f)("wui-input-text")], eH)));
  let eF = v.m`
  :host {
    position: relative;
    display: inline-block;
    width: 100%;
  }
`,
    eY = class extends eW.f {
      constructor() {
        (super(...arguments), (this.inputComponentRef = eE()));
      }
      render() {
        return i.c`
      <wui-input-text
        ${ej(this.inputComponentRef)}
        placeholder="Search wallet"
        icon="search"
        type="search"
        enterKeyHint="search"
        size="sm"
      >
        <wui-input-element @click=${this.clearValue} icon="close"></wui-input-element>
      </wui-input-text>
    `;
      }
      clearValue() {
        let t = this.inputComponentRef.value,
          e = t?.inputElementRef.value;
        e && ((e.value = ""), e.focus(), e.dispatchEvent(new Event("input")));
      }
    };
  ((eY.styles = [w.e, eF]),
    (eY = (function (t, e, i, r) {
      var o,
        n = arguments.length,
        a =
          n < 3
            ? e
            : null === r
              ? (r = Object.getOwnPropertyDescriptor(e, i))
              : r;
      if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
        a = Reflect.decorate(t, e, i, r);
      else
        for (var s = t.length - 1; s >= 0; s--)
          (o = t[s]) &&
            (a = (n < 3 ? o(a) : n > 3 ? o(e, i, a) : o(e, i)) || a);
      return (n > 3 && a && Object.defineProperty(e, i, a), a);
    })([(0, l.f)("wui-search-bar")], eY)));
  var eG = e,
    eJ = e;
  let eX = i.V`<svg  viewBox="0 0 48 54" fill="none">
  <path
    d="M43.4605 10.7248L28.0485 1.61089C25.5438 0.129705 22.4562 0.129705 19.9515 1.61088L4.53951 10.7248C2.03626 12.2051 0.5 14.9365 0.5 17.886V36.1139C0.5 39.0635 2.03626 41.7949 4.53951 43.2752L19.9515 52.3891C22.4562 53.8703 25.5438 53.8703 28.0485 52.3891L43.4605 43.2752C45.9637 41.7949 47.5 39.0635 47.5 36.114V17.8861C47.5 14.9365 45.9637 12.2051 43.4605 10.7248Z"
  />
</svg>`,
    eQ = v.m`
  :host {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 104px;
    row-gap: var(--wui-spacing-xs);
    padding: var(--wui-spacing-xs) 10px;
    background-color: var(--wui-color-gray-glass-002);
    border-radius: clamp(0px, var(--wui-border-radius-xs), 20px);
    position: relative;
  }

  wui-shimmer[data-type='network'] {
    border: none;
    -webkit-clip-path: var(--wui-path-network);
    clip-path: var(--wui-path-network);
  }

  svg {
    position: absolute;
    width: 48px;
    height: 54px;
    z-index: 1;
  }

  svg > path {
    stroke: var(--wui-color-gray-glass-010);
    stroke-width: 1px;
  }

  @media (max-width: 350px) {
    :host {
      width: 100%;
    }
  }
`;
  var eZ = function (t, e, i, r) {
    var o,
      n = arguments.length,
      a =
        n < 3
          ? e
          : null === r
            ? (r = Object.getOwnPropertyDescriptor(e, i))
            : r;
    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
      a = Reflect.decorate(t, e, i, r);
    else
      for (var s = t.length - 1; s >= 0; s--)
        (o = t[s]) && (a = (n < 3 ? o(a) : n > 3 ? o(e, i, a) : o(e, i)) || a);
    return (n > 3 && a && Object.defineProperty(e, i, a), a);
  };
  let e0 = class extends eJ.f {
    constructor() {
      (super(...arguments), (this.type = "wallet"));
    }
    render() {
      return i.c`
      ${this.shimmerTemplate()}
      <wui-shimmer width="56px" height="20px" borderRadius="xs"></wui-shimmer>
    `;
    }
    shimmerTemplate() {
      return "network" === this.type
        ? i.c` <wui-shimmer
          data-type=${this.type}
          width="48px"
          height="54px"
          borderRadius="xs"
        ></wui-shimmer>
        ${eX}`
        : i.c`<wui-shimmer width="56px" height="56px" borderRadius="xs"></wui-shimmer>`;
    }
  };
  ((e0.styles = [w.e, w.j, eQ]),
    eZ([(0, u.f)()], e0.prototype, "type", void 0),
    (e0 = eZ([(0, l.f)("wui-card-select-loader")], e0)));
  var e1 = e;
  let e3 = v.m`
  :host {
    display: grid;
    width: inherit;
    height: inherit;
  }
`;
  var e2 = function (t, e, i, r) {
    var o,
      n = arguments.length,
      a =
        n < 3
          ? e
          : null === r
            ? (r = Object.getOwnPropertyDescriptor(e, i))
            : r;
    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
      a = Reflect.decorate(t, e, i, r);
    else
      for (var s = t.length - 1; s >= 0; s--)
        (o = t[s]) && (a = (n < 3 ? o(a) : n > 3 ? o(e, i, a) : o(e, i)) || a);
    return (n > 3 && a && Object.defineProperty(e, i, a), a);
  };
  let e5 = class extends e1.f {
    render() {
      return (
        (this.style.cssText = `
      grid-template-rows: ${this.gridTemplateRows};
      grid-template-columns: ${this.gridTemplateColumns};
      justify-items: ${this.justifyItems};
      align-items: ${this.alignItems};
      justify-content: ${this.justifyContent};
      align-content: ${this.alignContent};
      column-gap: ${this.columnGap && `var(--wui-spacing-${this.columnGap})`};
      row-gap: ${this.rowGap && `var(--wui-spacing-${this.rowGap})`};
      gap: ${this.gap && `var(--wui-spacing-${this.gap})`};
      padding-top: ${this.padding && tV.f.getSpacingStyles(this.padding, 0)};
      padding-right: ${this.padding && tV.f.getSpacingStyles(this.padding, 1)};
      padding-bottom: ${this.padding && tV.f.getSpacingStyles(this.padding, 2)};
      padding-left: ${this.padding && tV.f.getSpacingStyles(this.padding, 3)};
      margin-top: ${this.margin && tV.f.getSpacingStyles(this.margin, 0)};
      margin-right: ${this.margin && tV.f.getSpacingStyles(this.margin, 1)};
      margin-bottom: ${this.margin && tV.f.getSpacingStyles(this.margin, 2)};
      margin-left: ${this.margin && tV.f.getSpacingStyles(this.margin, 3)};
    `),
        i.c`<slot></slot>`
      );
    }
  };
  ((e5.styles = [w.e, e3]),
    e2([(0, u.f)()], e5.prototype, "gridTemplateRows", void 0),
    e2([(0, u.f)()], e5.prototype, "gridTemplateColumns", void 0),
    e2([(0, u.f)()], e5.prototype, "justifyItems", void 0),
    e2([(0, u.f)()], e5.prototype, "alignItems", void 0),
    e2([(0, u.f)()], e5.prototype, "justifyContent", void 0),
    e2([(0, u.f)()], e5.prototype, "alignContent", void 0),
    e2([(0, u.f)()], e5.prototype, "columnGap", void 0),
    e2([(0, u.f)()], e5.prototype, "rowGap", void 0),
    e2([(0, u.f)()], e5.prototype, "gap", void 0),
    e2([(0, u.f)()], e5.prototype, "padding", void 0),
    e2([(0, u.f)()], e5.prototype, "margin", void 0),
    (e5 = e2([(0, l.f)("wui-grid")], e5)));
  var e4 = e;
  let e6 = v.m`
  button {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    width: 104px;
    row-gap: var(--wui-spacing-xs);
    padding: var(--wui-spacing-s) var(--wui-spacing-0);
    background-color: var(--wui-color-gray-glass-002);
    border-radius: clamp(0px, var(--wui-border-radius-xs), 20px);
    transition:
      color var(--wui-duration-lg) var(--wui-ease-out-power-1),
      background-color var(--wui-duration-lg) var(--wui-ease-out-power-1),
      border-radius var(--wui-duration-lg) var(--wui-ease-out-power-1);
    will-change: background-color, color, border-radius;
    outline: none;
    border: none;
  }

  button > wui-flex > wui-text {
    color: var(--wui-color-fg-100);
    max-width: 86px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    justify-content: center;
  }

  button > wui-flex > wui-text.certified {
    max-width: 66px;
  }

  button:hover:enabled {
    background-color: var(--wui-color-gray-glass-005);
  }

  button:disabled > wui-flex > wui-text {
    color: var(--wui-color-gray-glass-015);
  }

  [data-selected='true'] {
    background-color: var(--wui-color-accent-glass-020);
  }

  @media (hover: hover) and (pointer: fine) {
    [data-selected='true']:hover:enabled {
      background-color: var(--wui-color-accent-glass-015);
    }
  }

  [data-selected='true']:active:enabled {
    background-color: var(--wui-color-accent-glass-010);
  }

  @media (max-width: 350px) {
    button {
      width: 100%;
    }
  }
`;
  var e8 = function (t, e, i, r) {
    var o,
      n = arguments.length,
      a =
        n < 3
          ? e
          : null === r
            ? (r = Object.getOwnPropertyDescriptor(e, i))
            : r;
    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
      a = Reflect.decorate(t, e, i, r);
    else
      for (var s = t.length - 1; s >= 0; s--)
        (o = t[s]) && (a = (n < 3 ? o(a) : n > 3 ? o(e, i, a) : o(e, i)) || a);
    return (n > 3 && a && Object.defineProperty(e, i, a), a);
  };
  let e9 = class extends e4.f {
    constructor() {
      (super(),
        (this.observer = new IntersectionObserver(() => void 0)),
        (this.visible = !1),
        (this.imageSrc = void 0),
        (this.imageLoading = !1),
        (this.wallet = void 0),
        (this.observer = new IntersectionObserver(
          (t) => {
            t.forEach((t) => {
              t.isIntersecting
                ? ((this.visible = !0), this.fetchImageSrc())
                : (this.visible = !1);
            });
          },
          { threshold: 0.01 },
        )));
    }
    firstUpdated() {
      this.observer.observe(this);
    }
    disconnectedCallback() {
      this.observer.disconnect();
    }
    render() {
      let t = this.wallet?.badge_type === "certified";
      return i.c`
      <button>
        ${this.imageTemplate()}
        <wui-flex flexDirection="row" alignItems="center" justifyContent="center" gap="3xs">
          <wui-text
            variant="tiny-500"
            color="inherit"
            class=${(0, d.f)(t ? "certified" : void 0)}
            >${this.wallet?.name}</wui-text
          >
          ${t ? i.c`<wui-icon size="sm" name="walletConnectBrown"></wui-icon>` : null}
        </wui-flex>
      </button>
    `;
    }
    imageTemplate() {
      return (this.visible || this.imageSrc) && !this.imageLoading
        ? i.c`
      <wui-wallet-image
        size="md"
        imageSrc=${(0, d.f)(this.imageSrc)}
        name=${this.wallet?.name}
        .installed=${this.wallet?.installed}
        badgeSize="sm"
      >
      </wui-wallet-image>
    `
        : this.shimmerTemplate();
    }
    shimmerTemplate() {
      return i.c`<wui-shimmer width="56px" height="56px" borderRadius="xs"></wui-shimmer>`;
    }
    async fetchImageSrc() {
      !this.wallet ||
        ((this.imageSrc = L.f.getWalletImage(this.wallet)),
        this.imageSrc ||
          ((this.imageLoading = !0),
          (this.imageSrc = await L.f.fetchWalletImage(this.wallet.image_id)),
          (this.imageLoading = !1)));
    }
  };
  ((e9.styles = e6),
    e8([(0, r.f)()], e9.prototype, "visible", void 0),
    e8([(0, r.f)()], e9.prototype, "imageSrc", void 0),
    e8([(0, r.f)()], e9.prototype, "imageLoading", void 0),
    e8([(0, u.f)()], e9.prototype, "wallet", void 0),
    (e9 = e8([(0, l.f)("w3m-all-wallets-list-item")], e9)));
  let e7 = v.m`
  wui-grid {
    max-height: clamp(360px, 400px, 80vh);
    overflow: scroll;
    scrollbar-width: none;
    grid-auto-rows: min-content;
    grid-template-columns: repeat(auto-fill, 104px);
  }

  @media (max-width: 350px) {
    wui-grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  wui-grid[data-scroll='false'] {
    overflow: hidden;
  }

  wui-grid::-webkit-scrollbar {
    display: none;
  }

  wui-loading-spinner {
    padding-top: var(--wui-spacing-l);
    padding-bottom: var(--wui-spacing-l);
    justify-content: center;
    grid-column: 1 / span 4;
  }
`;
  var it = function (t, e, i, r) {
    var o,
      n = arguments.length,
      a =
        n < 3
          ? e
          : null === r
            ? (r = Object.getOwnPropertyDescriptor(e, i))
            : r;
    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
      a = Reflect.decorate(t, e, i, r);
    else
      for (var s = t.length - 1; s >= 0; s--)
        (o = t[s]) && (a = (n < 3 ? o(a) : n > 3 ? o(e, i, a) : o(e, i)) || a);
    return (n > 3 && a && Object.defineProperty(e, i, a), a);
  };
  let ie = "local-paginator",
    ii = class extends eG.f {
      constructor() {
        (super(),
          (this.unsubscribe = []),
          (this.paginationObserver = void 0),
          (this.loading = !o.f.state.wallets.length),
          (this.wallets = o.f.state.wallets),
          (this.recommended = o.f.state.recommended),
          (this.featured = o.f.state.featured),
          this.unsubscribe.push(
            o.f.subscribeKey("wallets", (t) => (this.wallets = t)),
            o.f.subscribeKey("recommended", (t) => (this.recommended = t)),
            o.f.subscribeKey("featured", (t) => (this.featured = t)),
          ));
      }
      firstUpdated() {
        (this.initialFetch(), this.createPaginationObserver());
      }
      disconnectedCallback() {
        (this.unsubscribe.forEach((t) => t()),
          this.paginationObserver?.disconnect());
      }
      render() {
        return i.c`
      <wui-grid
        data-scroll=${!this.loading}
        .padding=${["0", "s", "s", "s"]}
        columnGap="xxs"
        rowGap="l"
        justifyContent="space-between"
      >
        ${this.loading ? this.shimmerTemplate(16) : this.walletsTemplate()}
        ${this.paginationLoaderTemplate()}
      </wui-grid>
    `;
      }
      async initialFetch() {
        this.loading = !0;
        let t = this.shadowRoot?.querySelector("wui-grid");
        t &&
          (await o.f.fetchWallets({ page: 1 }),
          await t.animate([{ opacity: 1 }, { opacity: 0 }], {
            duration: 200,
            fill: "forwards",
            easing: "ease",
          }).finished,
          (this.loading = !1),
          t.animate([{ opacity: 0 }, { opacity: 1 }], {
            duration: 200,
            fill: "forwards",
            easing: "ease",
          }));
      }
      shimmerTemplate(t, e) {
        return [...Array(t)].map(
          () => i.c`
        <wui-card-select-loader type="wallet" id=${(0, d.f)(e)}></wui-card-select-loader>
      `,
        );
      }
      walletsTemplate() {
        let t = n.f.uniqueBy(
          [...this.featured, ...this.recommended, ...this.wallets],
          "id",
        );
        return to.f.markWalletsAsInstalled(t).map(
          (t) => i.c`
        <w3m-all-wallets-list-item
          @click=${() => this.onConnectWallet(t)}
          .wallet=${t}
        ></w3m-all-wallets-list-item>
      `,
        );
      }
      paginationLoaderTemplate() {
        let { wallets: t, recommended: e, featured: i, count: r } = o.f.state,
          n = window.innerWidth < 352 ? 3 : 4,
          a = t.length + e.length,
          s = Math.ceil(a / n) * n - a + n;
        return ((s -= t.length ? i.length % n : 0), 0 === r && i.length > 0)
          ? null
          : 0 === r || [...i, ...t, ...e].length < r
            ? this.shimmerTemplate(s, ie)
            : null;
      }
      createPaginationObserver() {
        let t = this.shadowRoot?.querySelector(`#${ie}`);
        t &&
          ((this.paginationObserver = new IntersectionObserver(([t]) => {
            if (t?.isIntersecting && !this.loading) {
              let { page: t, count: e, wallets: i } = o.f.state;
              i.length < e && o.f.fetchWallets({ page: t + 1 });
            }
          })),
          this.paginationObserver.observe(t));
      }
      onConnectWallet(t) {
        h.f.selectWalletConnector(t);
      }
    };
  ((ii.styles = e7),
    it([(0, r.f)()], ii.prototype, "loading", void 0),
    it([(0, r.f)()], ii.prototype, "wallets", void 0),
    it([(0, r.f)()], ii.prototype, "recommended", void 0),
    it([(0, r.f)()], ii.prototype, "featured", void 0),
    (ii = it([(0, l.f)("w3m-all-wallets-list")], ii)));
  var ir = e;
  let io = v.m`
  wui-grid,
  wui-loading-spinner,
  wui-flex {
    height: 360px;
  }

  wui-grid {
    overflow: scroll;
    scrollbar-width: none;
    grid-auto-rows: min-content;
    grid-template-columns: repeat(auto-fill, 104px);
  }

  wui-grid[data-scroll='false'] {
    overflow: hidden;
  }

  wui-grid::-webkit-scrollbar {
    display: none;
  }

  wui-loading-spinner {
    justify-content: center;
    align-items: center;
  }

  @media (max-width: 350px) {
    wui-grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }
`;
  var ia = function (t, e, i, r) {
    var o,
      n = arguments.length,
      a =
        n < 3
          ? e
          : null === r
            ? (r = Object.getOwnPropertyDescriptor(e, i))
            : r;
    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
      a = Reflect.decorate(t, e, i, r);
    else
      for (var s = t.length - 1; s >= 0; s--)
        (o = t[s]) && (a = (n < 3 ? o(a) : n > 3 ? o(e, i, a) : o(e, i)) || a);
    return (n > 3 && a && Object.defineProperty(e, i, a), a);
  };
  let is = class extends ir.f {
    constructor() {
      (super(...arguments),
        (this.prevQuery = ""),
        (this.prevBadge = void 0),
        (this.loading = !0),
        (this.query = ""));
    }
    render() {
      return (
        this.onSearch(),
        this.loading
          ? i.c`<wui-loading-spinner color="accent-100"></wui-loading-spinner>`
          : this.walletsTemplate()
      );
    }
    async onSearch() {
      (this.query.trim() !== this.prevQuery.trim() ||
        this.badge !== this.prevBadge) &&
        ((this.prevQuery = this.query),
        (this.prevBadge = this.badge),
        (this.loading = !0),
        await o.f.searchWallet({ search: this.query, badge: this.badge }),
        (this.loading = !1));
    }
    walletsTemplate() {
      let { search: t } = o.f.state,
        e = to.f.markWalletsAsInstalled(t);
      return t.length
        ? i.c`
      <wui-grid
        data-testid="wallet-list"
        .padding=${["0", "s", "s", "s"]}
        rowGap="l"
        columnGap="xs"
        justifyContent="space-between"
      >
        ${e.map(
          (t) => i.c`
            <w3m-all-wallets-list-item
              @click=${() => this.onConnectWallet(t)}
              .wallet=${t}
              data-testid="wallet-search-item-${t.id}"
            ></w3m-all-wallets-list-item>
          `,
        )}
      </wui-grid>
    `
        : i.c`
        <wui-flex
          data-testid="no-wallet-found"
          justifyContent="center"
          alignItems="center"
          gap="s"
          flexDirection="column"
        >
          <wui-icon-box
            size="lg"
            iconColor="fg-200"
            backgroundColor="fg-300"
            icon="wallet"
            background="transparent"
          ></wui-icon-box>
          <wui-text data-testid="no-wallet-found-text" color="fg-200" variant="paragraph-500">
            No Wallet found
          </wui-text>
        </wui-flex>
      `;
    }
    onConnectWallet(t) {
      h.f.selectWalletConnector(t);
    }
  };
  ((is.styles = io),
    ia([(0, r.f)()], is.prototype, "loading", void 0),
    ia([(0, u.f)()], is.prototype, "query", void 0),
    ia([(0, u.f)()], is.prototype, "badge", void 0),
    (is = ia([(0, l.f)("w3m-all-wallets-search")], is)));
  var il = function (t, e, i, r) {
    var o,
      n = arguments.length,
      a =
        n < 3
          ? e
          : null === r
            ? (r = Object.getOwnPropertyDescriptor(e, i))
            : r;
    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
      a = Reflect.decorate(t, e, i, r);
    else
      for (var s = t.length - 1; s >= 0; s--)
        (o = t[s]) && (a = (n < 3 ? o(a) : n > 3 ? o(e, i, a) : o(e, i)) || a);
    return (n > 3 && a && Object.defineProperty(e, i, a), a);
  };
  let ic = class extends e$.f {
    constructor() {
      (super(...arguments),
        (this.search = ""),
        (this.onDebouncedSearch = n.f.debounce((t) => {
          this.search = t;
        })));
    }
    render() {
      let t = this.search.length >= 2;
      return i.c`
      <wui-flex .padding=${["0", "s", "s", "s"]} gap="xs">
        <wui-search-bar @inputChange=${this.onInputChange.bind(this)}></wui-search-bar>
        <wui-certified-switch
          ?checked=${this.badge}
          @click=${this.onClick.bind(this)}
          data-testid="wui-certified-switch"
        ></wui-certified-switch>
        ${this.qrButtonTemplate()}
      </wui-flex>
      ${
        t || this.badge
          ? i.c`<w3m-all-wallets-search
            query=${this.search}
            badge=${(0, d.f)(this.badge)}
          ></w3m-all-wallets-search>`
          : i.c`<w3m-all-wallets-list badge=${(0, d.f)(this.badge)}></w3m-all-wallets-list>`
      }
    `;
    }
    onInputChange(t) {
      this.onDebouncedSearch(t.detail);
    }
    onClick() {
      if ("certified" === this.badge) {
        this.badge = void 0;
        return;
      }
      ((this.badge = "certified"),
        tb.f.showSvg("Only WalletConnect certified", {
          icon: "walletConnectBrown",
          iconColor: "accent-100",
        }));
    }
    qrButtonTemplate() {
      return n.f.isMobile()
        ? i.c`
        <wui-icon-box
          size="lg"
          iconSize="xl"
          iconColor="accent-100"
          backgroundColor="accent-100"
          icon="qrCode"
          background="transparent"
          border
          borderColor="wui-accent-glass-010"
          @click=${this.onWalletConnectQr.bind(this)}
        ></wui-icon-box>
      `
        : null;
    }
    onWalletConnectQr() {
      f.f.push("ConnectingWalletConnect");
    }
  };
  (il([(0, r.f)()], ic.prototype, "search", void 0),
    il([(0, r.f)()], ic.prototype, "badge", void 0),
    (ic = il([(0, l.f)("w3m-all-wallets-view")], ic)),
    t.s(["W3mAllWalletsView", 0, ic], 85382));
  var iu = e,
    id = e;
  let ih = v.m`
  button {
    column-gap: var(--wui-spacing-s);
    padding: 11px 18px 11px var(--wui-spacing-s);
    width: 100%;
    background-color: var(--wui-color-gray-glass-002);
    border-radius: var(--wui-border-radius-xs);
    color: var(--wui-color-fg-250);
    transition:
      color var(--wui-ease-out-power-1) var(--wui-duration-md),
      background-color var(--wui-ease-out-power-1) var(--wui-duration-md);
    will-change: color, background-color;
  }

  button[data-iconvariant='square'],
  button[data-iconvariant='square-blue'] {
    padding: 6px 18px 6px 9px;
  }

  button > wui-flex {
    flex: 1;
  }

  button > wui-image {
    width: 32px;
    height: 32px;
    box-shadow: 0 0 0 2px var(--wui-color-gray-glass-005);
    border-radius: var(--wui-border-radius-3xl);
  }

  button > wui-icon {
    width: 36px;
    height: 36px;
    transition: opacity var(--wui-ease-out-power-1) var(--wui-duration-md);
    will-change: opacity;
  }

  button > wui-icon-box[data-variant='blue'] {
    box-shadow: 0 0 0 2px var(--wui-color-accent-glass-005);
  }

  button > wui-icon-box[data-variant='overlay'] {
    box-shadow: 0 0 0 2px var(--wui-color-gray-glass-005);
  }

  button > wui-icon-box[data-variant='square-blue'] {
    border-radius: var(--wui-border-radius-3xs);
    position: relative;
    border: none;
    width: 36px;
    height: 36px;
  }

  button > wui-icon-box[data-variant='square-blue']::after {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    border-radius: inherit;
    border: 1px solid var(--wui-color-accent-glass-010);
    pointer-events: none;
  }

  button > wui-icon:last-child {
    width: 14px;
    height: 14px;
  }

  button:disabled {
    color: var(--wui-color-gray-glass-020);
  }

  button[data-loading='true'] > wui-icon {
    opacity: 0;
  }

  wui-loading-spinner {
    position: absolute;
    right: 18px;
    top: 50%;
    transform: translateY(-50%);
  }
`;
  var ip = function (t, e, i, r) {
    var o,
      n = arguments.length,
      a =
        n < 3
          ? e
          : null === r
            ? (r = Object.getOwnPropertyDescriptor(e, i))
            : r;
    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
      a = Reflect.decorate(t, e, i, r);
    else
      for (var s = t.length - 1; s >= 0; s--)
        (o = t[s]) && (a = (n < 3 ? o(a) : n > 3 ? o(e, i, a) : o(e, i)) || a);
    return (n > 3 && a && Object.defineProperty(e, i, a), a);
  };
  let ig = class extends id.f {
    constructor() {
      (super(...arguments),
        (this.tabIdx = void 0),
        (this.variant = "icon"),
        (this.disabled = !1),
        (this.imageSrc = void 0),
        (this.alt = void 0),
        (this.chevron = !1),
        (this.loading = !1));
    }
    render() {
      return i.c`
      <button
        ?disabled=${!!this.loading || !!this.disabled}
        data-loading=${this.loading}
        data-iconvariant=${(0, d.f)(this.iconVariant)}
        tabindex=${(0, d.f)(this.tabIdx)}
      >
        ${this.loadingTemplate()} ${this.visualTemplate()}
        <wui-flex gap="3xs">
          <slot></slot>
        </wui-flex>
        ${this.chevronTemplate()}
      </button>
    `;
    }
    visualTemplate() {
      if ("image" === this.variant && this.imageSrc)
        return i.c`<wui-image src=${this.imageSrc} alt=${this.alt ?? "list item"}></wui-image>`;
      if ("square" === this.iconVariant && this.icon && "icon" === this.variant)
        return i.c`<wui-icon name=${this.icon}></wui-icon>`;
      if ("icon" === this.variant && this.icon && this.iconVariant) {
        let t = ["blue", "square-blue"].includes(this.iconVariant)
            ? "accent-100"
            : "fg-200",
          e = "square-blue" === this.iconVariant ? "mdl" : "md",
          r = this.iconSize ? this.iconSize : e;
        return i.c`
        <wui-icon-box
          data-variant=${this.iconVariant}
          icon=${this.icon}
          iconSize=${r}
          background="transparent"
          iconColor=${t}
          backgroundColor=${t}
          size=${e}
        ></wui-icon-box>
      `;
      }
      return null;
    }
    loadingTemplate() {
      return this.loading
        ? i.c`<wui-loading-spinner
        data-testid="wui-list-item-loading-spinner"
        color="fg-300"
      ></wui-loading-spinner>`
        : i.c``;
    }
    chevronTemplate() {
      return this.chevron
        ? i.c`<wui-icon size="inherit" color="fg-200" name="chevronRight"></wui-icon>`
        : null;
    }
  };
  ((ig.styles = [w.e, w.j, ih]),
    ip([(0, u.f)()], ig.prototype, "icon", void 0),
    ip([(0, u.f)()], ig.prototype, "iconSize", void 0),
    ip([(0, u.f)()], ig.prototype, "tabIdx", void 0),
    ip([(0, u.f)()], ig.prototype, "variant", void 0),
    ip([(0, u.f)()], ig.prototype, "iconVariant", void 0),
    ip([(0, u.f)({ type: Boolean })], ig.prototype, "disabled", void 0),
    ip([(0, u.f)()], ig.prototype, "imageSrc", void 0),
    ip([(0, u.f)()], ig.prototype, "alt", void 0),
    ip([(0, u.f)({ type: Boolean })], ig.prototype, "chevron", void 0),
    ip([(0, u.f)({ type: Boolean })], ig.prototype, "loading", void 0),
    (ig = ip([(0, l.f)("wui-list-item")], ig)));
  let iw = class extends iu.f {
    constructor() {
      (super(...arguments), (this.wallet = f.f.state.data?.wallet));
    }
    render() {
      if (!this.wallet) throw Error("w3m-downloads-view");
      return i.c`
      <wui-flex gap="xs" flexDirection="column" .padding=${["s", "s", "l", "s"]}>
        ${this.chromeTemplate()} ${this.iosTemplate()} ${this.androidTemplate()}
        ${this.homepageTemplate()}
      </wui-flex>
    `;
    }
    chromeTemplate() {
      return this.wallet?.chrome_store
        ? i.c`<wui-list-item
      variant="icon"
      icon="chromeStore"
      iconVariant="square"
      @click=${this.onChromeStore.bind(this)}
      chevron
    >
      <wui-text variant="paragraph-500" color="fg-100">Chrome Extension</wui-text>
    </wui-list-item>`
        : null;
    }
    iosTemplate() {
      return this.wallet?.app_store
        ? i.c`<wui-list-item
      variant="icon"
      icon="appStore"
      iconVariant="square"
      @click=${this.onAppStore.bind(this)}
      chevron
    >
      <wui-text variant="paragraph-500" color="fg-100">iOS App</wui-text>
    </wui-list-item>`
        : null;
    }
    androidTemplate() {
      return this.wallet?.play_store
        ? i.c`<wui-list-item
      variant="icon"
      icon="playStore"
      iconVariant="square"
      @click=${this.onPlayStore.bind(this)}
      chevron
    >
      <wui-text variant="paragraph-500" color="fg-100">Android App</wui-text>
    </wui-list-item>`
        : null;
    }
    homepageTemplate() {
      return this.wallet?.homepage
        ? i.c`
      <wui-list-item
        variant="icon"
        icon="browser"
        iconVariant="square-blue"
        @click=${this.onHomePage.bind(this)}
        chevron
      >
        <wui-text variant="paragraph-500" color="fg-100">Website</wui-text>
      </wui-list-item>
    `
        : null;
    }
    onChromeStore() {
      this.wallet?.chrome_store &&
        n.f.openHref(this.wallet.chrome_store, "_blank");
    }
    onAppStore() {
      this.wallet?.app_store && n.f.openHref(this.wallet.app_store, "_blank");
    }
    onPlayStore() {
      this.wallet?.play_store && n.f.openHref(this.wallet.play_store, "_blank");
    }
    onHomePage() {
      this.wallet?.homepage && n.f.openHref(this.wallet.homepage, "_blank");
    }
  };
  ((iw = (function (t, e, i, r) {
    var o,
      n = arguments.length,
      a =
        n < 3
          ? e
          : null === r
            ? (r = Object.getOwnPropertyDescriptor(e, i))
            : r;
    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
      a = Reflect.decorate(t, e, i, r);
    else
      for (var s = t.length - 1; s >= 0; s--)
        (o = t[s]) && (a = (n < 3 ? o(a) : n > 3 ? o(e, i, a) : o(e, i)) || a);
    return (n > 3 && a && Object.defineProperty(e, i, a), a);
  })([(0, l.f)("w3m-downloads-view")], iw)),
    t.s(["W3mDownloadsView", 0, iw], 321749),
    t.i(424907),
    t.i(85382),
    t.i(321749),
    t.s(
      [
        "W3mAllWalletsView",
        0,
        ic,
        "W3mConnectingWcBasicView",
        0,
        ex,
        "W3mDownloadsView",
        0,
        iw,
      ],
      96631,
    ));
};
