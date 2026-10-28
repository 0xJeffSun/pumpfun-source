// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  let t = globalThis,
    r =
      t.ShadowRoot &&
      (void 0 === t.ShadyCSS || t.ShadyCSS.nativeShadow) &&
      "adoptedStyleSheets" in Document.prototype &&
      "replace" in CSSStyleSheet.prototype,
    s = Symbol(),
    n = new WeakMap();
  class o {
    constructor(e, t, r) {
      if (((this._$cssResult$ = !0), r !== s))
        throw Error(
          "CSSResult is not constructable. Use `unsafeCSS` or `css` instead.",
        );
      ((this.cssText = e), (this.t = t));
    }
    get styleSheet() {
      let e = this.o,
        t = this.t;
      if (r && void 0 === e) {
        let r = void 0 !== t && 1 === t.length;
        (r && (e = n.get(t)),
          void 0 === e &&
            ((this.o = e = new CSSStyleSheet()).replaceSync(this.cssText),
            r && n.set(t, e)));
      }
      return e;
    }
    toString() {
      return this.cssText;
    }
  }
  let i = (e) => new o("string" == typeof e ? e : e + "", void 0, s),
    a = (e, s) => {
      if (r)
        e.adoptedStyleSheets = s.map((e) =>
          e instanceof CSSStyleSheet ? e : e.styleSheet,
        );
      else
        for (let r of s) {
          let s = document.createElement("style"),
            n = t.litNonce;
          (void 0 !== n && s.setAttribute("nonce", n),
            (s.textContent = r.cssText),
            e.appendChild(s));
        }
    },
    c = r
      ? (e) => e
      : (e) =>
          e instanceof CSSStyleSheet
            ? ((e) => {
                let t = "";
                for (let r of e.cssRules) t += r.cssText;
                return i(t);
              })(e)
            : e;
  e.s(
    [
      "p",
      0,
      a,
      "m",
      0,
      (e, ...t) =>
        new o(
          1 === e.length
            ? e[0]
            : t.reduce(
                (t, r, s) =>
                  t +
                  ((e) => {
                    if (!0 === e._$cssResult$) return e.cssText;
                    if ("number" == typeof e) return e;
                    throw Error(
                      "Value passed to 'css' function must be a 'css' function result: " +
                        e +
                        ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.",
                    );
                  })(r) +
                  e[s + 1],
                e[0],
              ),
          e,
          s,
        ),
      "l",
      0,
      c,
      "N",
      0,
      i,
    ],
    940697,
  );
  let {
      is: l,
      defineProperty: u,
      getOwnPropertyDescriptor: h,
      getOwnPropertyNames: d,
      getOwnPropertySymbols: f,
      getPrototypeOf: p,
    } = Object,
    g = globalThis,
    m = g.trustedTypes,
    b = m ? m.emptyScript : "",
    w = g.reactiveElementPolyfillSupport,
    y = {
      toAttribute(e, t) {
        switch (t) {
          case Boolean:
            e = e ? b : null;
            break;
          case Object:
          case Array:
            e = null == e ? e : JSON.stringify(e);
        }
        return e;
      },
      fromAttribute(e, t) {
        let r = e;
        switch (t) {
          case Boolean:
            r = null !== e;
            break;
          case Number:
            r = null === e ? null : Number(e);
            break;
          case Object:
          case Array:
            try {
              r = JSON.parse(e);
            } catch (e) {
              r = null;
            }
        }
        return r;
      },
    },
    E = (e, t) => !l(e, t),
    v = {
      attribute: !0,
      type: String,
      converter: y,
      reflect: !1,
      useDefault: !1,
      hasChanged: E,
    };
  ((Symbol.metadata ??= Symbol("metadata")),
    (g.litPropertyMetadata ??= new WeakMap()));
  class $ extends HTMLElement {
    static addInitializer(e) {
      (this._$Ei(), (this.l ??= []).push(e));
    }
    static get observedAttributes() {
      return (this.finalize(), this._$Eh && [...this._$Eh.keys()]);
    }
    static createProperty(e, t = v) {
      if (
        (t.state && (t.attribute = !1),
        this._$Ei(),
        this.prototype.hasOwnProperty(e) &&
          ((t = Object.create(t)).wrapped = !0),
        this.elementProperties.set(e, t),
        !t.noAccessor)
      ) {
        let r = Symbol(),
          s = this.getPropertyDescriptor(e, r, t);
        void 0 !== s && u(this.prototype, e, s);
      }
    }
    static getPropertyDescriptor(e, t, r) {
      let { get: s, set: n } = h(this.prototype, e) ?? {
        get() {
          return this[t];
        },
        set(e) {
          this[t] = e;
        },
      };
      return {
        get: s,
        set(t) {
          let o = s?.call(this);
          (n?.call(this, t), this.requestUpdate(e, o, r));
        },
        configurable: !0,
        enumerable: !0,
      };
    }
    static getPropertyOptions(e) {
      return this.elementProperties.get(e) ?? v;
    }
    static _$Ei() {
      if (this.hasOwnProperty("elementProperties")) return;
      let e = p(this);
      (e.finalize(),
        void 0 !== e.l && (this.l = [...e.l]),
        (this.elementProperties = new Map(e.elementProperties)));
    }
    static finalize() {
      if (this.hasOwnProperty("finalized")) return;
      if (
        ((this.finalized = !0), this._$Ei(), this.hasOwnProperty("properties"))
      ) {
        let e = this.properties;
        for (let t of [...d(e), ...f(e)]) this.createProperty(t, e[t]);
      }
      let e = this[Symbol.metadata];
      if (null !== e) {
        let t = litPropertyMetadata.get(e);
        if (void 0 !== t)
          for (let [e, r] of t) this.elementProperties.set(e, r);
      }
      for (let [e, t] of ((this._$Eh = new Map()), this.elementProperties)) {
        let r = this._$Eu(e, t);
        void 0 !== r && this._$Eh.set(r, e);
      }
      this.elementStyles = this.finalizeStyles(this.styles);
    }
    static finalizeStyles(e) {
      let t = [];
      if (Array.isArray(e))
        for (let r of new Set(e.flat(1 / 0).reverse())) t.unshift(c(r));
      else void 0 !== e && t.push(c(e));
      return t;
    }
    static _$Eu(e, t) {
      let r = t.attribute;
      return !1 === r
        ? void 0
        : "string" == typeof r
          ? r
          : "string" == typeof e
            ? e.toLowerCase()
            : void 0;
    }
    constructor() {
      (super(),
        (this._$Ep = void 0),
        (this.isUpdatePending = !1),
        (this.hasUpdated = !1),
        (this._$Em = null),
        this._$Ev());
    }
    _$Ev() {
      ((this._$ES = new Promise((e) => (this.enableUpdating = e))),
        (this._$AL = new Map()),
        this._$E_(),
        this.requestUpdate(),
        this.constructor.l?.forEach((e) => e(this)));
    }
    addController(e) {
      ((this._$EO ??= new Set()).add(e),
        void 0 !== this.renderRoot && this.isConnected && e.hostConnected?.());
    }
    removeController(e) {
      this._$EO?.delete(e);
    }
    _$E_() {
      let e = new Map();
      for (let t of this.constructor.elementProperties.keys())
        this.hasOwnProperty(t) && (e.set(t, this[t]), delete this[t]);
      e.size > 0 && (this._$Ep = e);
    }
    createRenderRoot() {
      let e =
        this.shadowRoot ??
        this.attachShadow(this.constructor.shadowRootOptions);
      return (a(e, this.constructor.elementStyles), e);
    }
    connectedCallback() {
      ((this.renderRoot ??= this.createRenderRoot()),
        this.enableUpdating(!0),
        this._$EO?.forEach((e) => e.hostConnected?.()));
    }
    enableUpdating(e) {}
    disconnectedCallback() {
      this._$EO?.forEach((e) => e.hostDisconnected?.());
    }
    attributeChangedCallback(e, t, r) {
      this._$AK(e, r);
    }
    _$ET(e, t) {
      let r = this.constructor.elementProperties.get(e),
        s = this.constructor._$Eu(e, r);
      if (void 0 !== s && !0 === r.reflect) {
        let n = (
          void 0 !== r.converter?.toAttribute ? r.converter : y
        ).toAttribute(t, r.type);
        ((this._$Em = e),
          null == n ? this.removeAttribute(s) : this.setAttribute(s, n),
          (this._$Em = null));
      }
    }
    _$AK(e, t) {
      let r = this.constructor,
        s = r._$Eh.get(e);
      if (void 0 !== s && this._$Em !== s) {
        let e = r.getPropertyOptions(s),
          n =
            "function" == typeof e.converter
              ? { fromAttribute: e.converter }
              : void 0 !== e.converter?.fromAttribute
                ? e.converter
                : y;
        this._$Em = s;
        let o = n.fromAttribute(t, e.type);
        ((this[s] = o ?? this._$Ej?.get(s) ?? o), (this._$Em = null));
      }
    }
    requestUpdate(e, t, r, s = !1, n) {
      if (void 0 !== e) {
        let o = this.constructor;
        if (
          (!1 === s && (n = this[e]),
          !(
            ((r ??= o.getPropertyOptions(e)).hasChanged ?? E)(n, t) ||
            (r.useDefault &&
              r.reflect &&
              n === this._$Ej?.get(e) &&
              !this.hasAttribute(o._$Eu(e, r)))
          ))
        )
          return;
        this.C(e, t, r);
      }
      !1 === this.isUpdatePending && (this._$ES = this._$EP());
    }
    C(e, t, { useDefault: r, reflect: s, wrapped: n }, o) {
      (r &&
        !(this._$Ej ??= new Map()).has(e) &&
        (this._$Ej.set(e, o ?? t ?? this[e]), !0 !== n || void 0 !== o)) ||
        (this._$AL.has(e) ||
          (this.hasUpdated || r || (t = void 0), this._$AL.set(e, t)),
        !0 === s && this._$Em !== e && (this._$Eq ??= new Set()).add(e));
    }
    async _$EP() {
      this.isUpdatePending = !0;
      try {
        await this._$ES;
      } catch (e) {
        Promise.reject(e);
      }
      let e = this.scheduleUpdate();
      return (null != e && (await e), !this.isUpdatePending);
    }
    scheduleUpdate() {
      return this.performUpdate();
    }
    performUpdate() {
      if (!this.isUpdatePending) return;
      if (!this.hasUpdated) {
        if (((this.renderRoot ??= this.createRenderRoot()), this._$Ep)) {
          for (let [e, t] of this._$Ep) this[e] = t;
          this._$Ep = void 0;
        }
        let e = this.constructor.elementProperties;
        if (e.size > 0)
          for (let [t, r] of e) {
            let { wrapped: e } = r,
              s = this[t];
            !0 !== e ||
              this._$AL.has(t) ||
              void 0 === s ||
              this.C(t, void 0, r, s);
          }
      }
      let e = !1,
        t = this._$AL;
      try {
        (e = this.shouldUpdate(t))
          ? (this.willUpdate(t),
            this._$EO?.forEach((e) => e.hostUpdate?.()),
            this.update(t))
          : this._$EM();
      } catch (t) {
        throw ((e = !1), this._$EM(), t);
      }
      e && this._$AE(t);
    }
    willUpdate(e) {}
    _$AE(e) {
      (this._$EO?.forEach((e) => e.hostUpdated?.()),
        this.hasUpdated || ((this.hasUpdated = !0), this.firstUpdated(e)),
        this.updated(e));
    }
    _$EM() {
      ((this._$AL = new Map()), (this.isUpdatePending = !1));
    }
    get updateComplete() {
      return this.getUpdateComplete();
    }
    getUpdateComplete() {
      return this._$ES;
    }
    shouldUpdate(e) {
      return !0;
    }
    update(e) {
      ((this._$Eq &&= this._$Eq.forEach((e) => this._$ET(e, this[e]))),
        this._$EM());
    }
    updated(e) {}
    firstUpdated(e) {}
  }
  (($.elementStyles = []),
    ($.shadowRootOptions = { mode: "open" }),
    ($.elementProperties = new Map()),
    ($.finalized = new Map()),
    w?.({ ReactiveElement: $ }),
    (g.reactiveElementVersions ??= []).push("2.1.2"),
    e.s(["l", 0, $, "s", 0, y, "e", 0, E], 289795));
  let _ = globalThis,
    A = (e) => e,
    O = _.trustedTypes,
    T = O ? O.createPolicy("lit-html", { createHTML: (e) => e }) : void 0,
    C = "$lit$",
    N = `lit$${Math.random().toFixed(9).slice(2)}$`,
    P = "?" + N,
    x = `<${P}>`,
    R = document,
    M = () => R.createComment(""),
    S = (e) => null === e || ("object" != typeof e && "function" != typeof e),
    U = Array.isArray,
    j = (e) => U(e) || "function" == typeof e?.[Symbol.iterator],
    D = "[ 	\n\f\r]",
    L = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,
    I = /-->/g,
    k = />/g,
    H = RegExp(
      `>|${D}(?:([^\\s"'>=/]+)(${D}*=${D}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,
      "g",
    ),
    W = /'/g,
    q = /"/g,
    B = /^(?:script|style|textarea|title)$/i,
    V =
      (e) =>
      (t, ...r) => ({ _$litType$: e, strings: t, values: r }),
    F = V(1),
    J = V(2),
    z = (V(3), Symbol.for("lit-noChange")),
    K = Symbol.for("lit-nothing"),
    G = new WeakMap(),
    Y = R.createTreeWalker(R, 129);
  function X(e, t) {
    if (!U(e) || !e.hasOwnProperty("raw"))
      throw Error("invalid template strings array");
    return void 0 !== T ? T.createHTML(t) : t;
  }
  let Z = (e, t) => {
    let r = e.length - 1,
      s = [],
      n,
      o = 2 === t ? "<svg>" : 3 === t ? "<math>" : "",
      i = L;
    for (let t = 0; t < r; t++) {
      let r = e[t],
        a,
        c,
        l = -1,
        u = 0;
      for (; u < r.length && ((i.lastIndex = u), null !== (c = i.exec(r))); )
        ((u = i.lastIndex),
          i === L
            ? "!--" === c[1]
              ? (i = I)
              : void 0 !== c[1]
                ? (i = k)
                : void 0 !== c[2]
                  ? (B.test(c[2]) && (n = RegExp("</" + c[2], "g")), (i = H))
                  : void 0 !== c[3] && (i = H)
            : i === H
              ? ">" === c[0]
                ? ((i = n ?? L), (l = -1))
                : void 0 === c[1]
                  ? (l = -2)
                  : ((l = i.lastIndex - c[2].length),
                    (a = c[1]),
                    (i = void 0 === c[3] ? H : '"' === c[3] ? q : W))
              : i === q || i === W
                ? (i = H)
                : i === I || i === k
                  ? (i = L)
                  : ((i = H), (n = void 0)));
      let h = i === H && e[t + 1].startsWith("/>") ? " " : "";
      o +=
        i === L
          ? r + x
          : l >= 0
            ? (s.push(a), r.slice(0, l) + C + r.slice(l) + N + h)
            : r + N + (-2 === l ? t : h);
    }
    return [
      X(
        e,
        o + (e[r] || "<?>") + (2 === t ? "</svg>" : 3 === t ? "</math>" : ""),
      ),
      s,
    ];
  };
  class Q {
    constructor({ strings: e, _$litType$: t }, r) {
      let s;
      this.parts = [];
      let n = 0,
        o = 0,
        i = e.length - 1,
        a = this.parts,
        [c, l] = Z(e, t);
      if (
        ((this.el = Q.createElement(c, r)),
        (Y.currentNode = this.el.content),
        2 === t || 3 === t)
      ) {
        let e = this.el.content.firstChild;
        e.replaceWith(...e.childNodes);
      }
      for (; null !== (s = Y.nextNode()) && a.length < i; ) {
        if (1 === s.nodeType) {
          if (s.hasAttributes())
            for (let e of s.getAttributeNames())
              if (e.endsWith(C)) {
                let t = l[o++],
                  r = s.getAttribute(e).split(N),
                  i = /([.?@])?(.*)/.exec(t);
                (a.push({
                  type: 1,
                  index: n,
                  name: i[2],
                  strings: r,
                  ctor:
                    "." === i[1]
                      ? en
                      : "?" === i[1]
                        ? eo
                        : "@" === i[1]
                          ? ei
                          : es,
                }),
                  s.removeAttribute(e));
              } else
                e.startsWith(N) &&
                  (a.push({ type: 6, index: n }), s.removeAttribute(e));
          if (B.test(s.tagName)) {
            let e = s.textContent.split(N),
              t = e.length - 1;
            if (t > 0) {
              s.textContent = O ? O.emptyScript : "";
              for (let r = 0; r < t; r++)
                (s.append(e[r], M()),
                  Y.nextNode(),
                  a.push({ type: 2, index: ++n }));
              s.append(e[t], M());
            }
          }
        } else if (8 === s.nodeType)
          if (s.data === P) a.push({ type: 2, index: n });
          else {
            let e = -1;
            for (; -1 !== (e = s.data.indexOf(N, e + 1)); )
              (a.push({ type: 7, index: n }), (e += N.length - 1));
          }
        n++;
      }
    }
    static createElement(e, t) {
      let r = R.createElement("template");
      return ((r.innerHTML = e), r);
    }
  }
  function ee(e, t, r = e, s) {
    if (t === z) return t;
    let n = void 0 !== s ? r._$Co?.[s] : r._$Cl,
      o = S(t) ? void 0 : t._$litDirective$;
    return (
      n?.constructor !== o &&
        (n?._$AO?.(!1),
        void 0 === o ? (n = void 0) : (n = new o(e))._$AT(e, r, s),
        void 0 !== s ? ((r._$Co ??= [])[s] = n) : (r._$Cl = n)),
      void 0 !== n && (t = ee(e, n._$AS(e, t.values), n, s)),
      t
    );
  }
  class et {
    constructor(e, t) {
      ((this._$AV = []),
        (this._$AN = void 0),
        (this._$AD = e),
        (this._$AM = t));
    }
    get parentNode() {
      return this._$AM.parentNode;
    }
    get _$AU() {
      return this._$AM._$AU;
    }
    u(e) {
      let {
          el: { content: t },
          parts: r,
        } = this._$AD,
        s = (e?.creationScope ?? R).importNode(t, !0);
      Y.currentNode = s;
      let n = Y.nextNode(),
        o = 0,
        i = 0,
        a = r[0];
      for (; void 0 !== a; ) {
        if (o === a.index) {
          let t;
          (2 === a.type
            ? (t = new er(n, n.nextSibling, this, e))
            : 1 === a.type
              ? (t = new a.ctor(n, a.name, a.strings, this, e))
              : 6 === a.type && (t = new ea(n, this, e)),
            this._$AV.push(t),
            (a = r[++i]));
        }
        o !== a?.index && ((n = Y.nextNode()), o++);
      }
      return ((Y.currentNode = R), s);
    }
    p(e) {
      let t = 0;
      for (let r of this._$AV)
        (void 0 !== r &&
          (void 0 !== r.strings
            ? (r._$AI(e, r, t), (t += r.strings.length - 2))
            : r._$AI(e[t])),
          t++);
    }
  }
  class er {
    get _$AU() {
      return this._$AM?._$AU ?? this._$Cv;
    }
    constructor(e, t, r, s) {
      ((this.type = 2),
        (this._$AH = K),
        (this._$AN = void 0),
        (this._$AA = e),
        (this._$AB = t),
        (this._$AM = r),
        (this.options = s),
        (this._$Cv = s?.isConnected ?? !0));
    }
    get parentNode() {
      let e = this._$AA.parentNode,
        t = this._$AM;
      return (void 0 !== t && 11 === e?.nodeType && (e = t.parentNode), e);
    }
    get startNode() {
      return this._$AA;
    }
    get endNode() {
      return this._$AB;
    }
    _$AI(e, t = this) {
      S((e = ee(this, e, t)))
        ? e === K || null == e || "" === e
          ? (this._$AH !== K && this._$AR(), (this._$AH = K))
          : e !== this._$AH && e !== z && this._(e)
        : void 0 !== e._$litType$
          ? this.$(e)
          : void 0 !== e.nodeType
            ? this.T(e)
            : j(e)
              ? this.k(e)
              : this._(e);
    }
    O(e) {
      return this._$AA.parentNode.insertBefore(e, this._$AB);
    }
    T(e) {
      this._$AH !== e && (this._$AR(), (this._$AH = this.O(e)));
    }
    _(e) {
      (this._$AH !== K && S(this._$AH)
        ? (this._$AA.nextSibling.data = e)
        : this.T(R.createTextNode(e)),
        (this._$AH = e));
    }
    $(e) {
      let { values: t, _$litType$: r } = e,
        s =
          "number" == typeof r
            ? this._$AC(e)
            : (void 0 === r.el &&
                (r.el = Q.createElement(X(r.h, r.h[0]), this.options)),
              r);
      if (this._$AH?._$AD === s) this._$AH.p(t);
      else {
        let e = new et(s, this),
          r = e.u(this.options);
        (e.p(t), this.T(r), (this._$AH = e));
      }
    }
    _$AC(e) {
      let t = G.get(e.strings);
      return (void 0 === t && G.set(e.strings, (t = new Q(e))), t);
    }
    k(e) {
      U(this._$AH) || ((this._$AH = []), this._$AR());
      let t = this._$AH,
        r,
        s = 0;
      for (let n of e)
        (s === t.length
          ? t.push((r = new er(this.O(M()), this.O(M()), this, this.options)))
          : (r = t[s]),
          r._$AI(n),
          s++);
      s < t.length && (this._$AR(r && r._$AB.nextSibling, s), (t.length = s));
    }
    _$AR(e = this._$AA.nextSibling, t) {
      for (this._$AP?.(!1, !0, t); e !== this._$AB; ) {
        let t = A(e).nextSibling;
        (A(e).remove(), (e = t));
      }
    }
    setConnected(e) {
      void 0 === this._$AM && ((this._$Cv = e), this._$AP?.(e));
    }
  }
  class es {
    get tagName() {
      return this.element.tagName;
    }
    get _$AU() {
      return this._$AM._$AU;
    }
    constructor(e, t, r, s, n) {
      ((this.type = 1),
        (this._$AH = K),
        (this._$AN = void 0),
        (this.element = e),
        (this.name = t),
        (this._$AM = s),
        (this.options = n),
        r.length > 2 || "" !== r[0] || "" !== r[1]
          ? ((this._$AH = Array(r.length - 1).fill(new String())),
            (this.strings = r))
          : (this._$AH = K));
    }
    _$AI(e, t = this, r, s) {
      let n = this.strings,
        o = !1;
      if (void 0 === n)
        (o = !S((e = ee(this, e, t, 0))) || (e !== this._$AH && e !== z)) &&
          (this._$AH = e);
      else {
        let s,
          i,
          a = e;
        for (e = n[0], s = 0; s < n.length - 1; s++)
          ((i = ee(this, a[r + s], t, s)) === z && (i = this._$AH[s]),
            (o ||= !S(i) || i !== this._$AH[s]),
            i === K ? (e = K) : e !== K && (e += (i ?? "") + n[s + 1]),
            (this._$AH[s] = i));
      }
      o && !s && this.j(e);
    }
    j(e) {
      e === K
        ? this.element.removeAttribute(this.name)
        : this.element.setAttribute(this.name, e ?? "");
    }
  }
  class en extends es {
    constructor() {
      (super(...arguments), (this.type = 3));
    }
    j(e) {
      this.element[this.name] = e === K ? void 0 : e;
    }
  }
  class eo extends es {
    constructor() {
      (super(...arguments), (this.type = 4));
    }
    j(e) {
      this.element.toggleAttribute(this.name, !!e && e !== K);
    }
  }
  class ei extends es {
    constructor(e, t, r, s, n) {
      (super(e, t, r, s, n), (this.type = 5));
    }
    _$AI(e, t = this) {
      if ((e = ee(this, e, t, 0) ?? K) === z) return;
      let r = this._$AH,
        s =
          (e === K && r !== K) ||
          e.capture !== r.capture ||
          e.once !== r.once ||
          e.passive !== r.passive,
        n = e !== K && (r === K || s);
      (s && this.element.removeEventListener(this.name, this, r),
        n && this.element.addEventListener(this.name, this, e),
        (this._$AH = e));
    }
    handleEvent(e) {
      "function" == typeof this._$AH
        ? this._$AH.call(this.options?.host ?? this.element, e)
        : this._$AH.handleEvent(e);
    }
  }
  class ea {
    constructor(e, t, r) {
      ((this.element = e),
        (this.type = 6),
        (this._$AN = void 0),
        (this._$AM = t),
        (this.options = r));
    }
    get _$AU() {
      return this._$AM._$AU;
    }
    _$AI(e) {
      ee(this, e);
    }
  }
  let ec = _.litHtmlPolyfillSupport;
  (ec?.(Q, er), (_.litHtmlVersions ??= []).push("3.3.2"));
  let el = (e, t, r) => {
    let s = r?.renderBefore ?? t,
      n = s._$litPart$;
    if (void 0 === n) {
      let e = r?.renderBefore ?? null;
      s._$litPart$ = n = new er(t.insertBefore(M(), e), e, void 0, r ?? {});
    }
    return (n._$AI(e), n);
  };
  e.s(
    [
      "e",
      0,
      {
        M: C,
        P: N,
        A: P,
        C: 1,
        L: Z,
        R: et,
        D: j,
        V: ee,
        I: er,
        H: es,
        N: eo,
        U: ei,
        B: en,
        F: ea,
      },
      "c",
      0,
      F,
      "r",
      0,
      z,
      "i",
      0,
      K,
      "a",
      0,
      el,
      "V",
      0,
      J,
    ],
    165520,
  );
  let eu = globalThis;
  class eh extends $ {
    constructor() {
      (super(...arguments),
        (this.renderOptions = { host: this }),
        (this._$Do = void 0));
    }
    createRenderRoot() {
      let e = super.createRenderRoot();
      return ((this.renderOptions.renderBefore ??= e.firstChild), e);
    }
    update(e) {
      let t = this.render();
      (this.hasUpdated || (this.renderOptions.isConnected = this.isConnected),
        super.update(e),
        (this._$Do = el(t, this.renderRoot, this.renderOptions)));
    }
    connectedCallback() {
      (super.connectedCallback(), this._$Do?.setConnected(!0));
    }
    disconnectedCallback() {
      (super.disconnectedCallback(), this._$Do?.setConnected(!1));
    }
    render() {
      return z;
    }
  }
  ((eh._$litElement$ = !0),
    (eh.finalized = !0),
    eu.litElementHydrateSupport?.({ LitElement: eh }));
  let ed = eu.litElementPolyfillSupport;
  (ed?.({ LitElement: eh }),
    (eu.litElementVersions ??= []).push("4.2.2"),
    e.s(["f", 0, eh], 641449),
    e.s([], 24727));
};
