// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  "use strict";
  var t = e.i(149502),
    r = function () {
      return (r =
        Object.assign ||
        function (e) {
          for (var t, r = 1, n = arguments.length; r < n; r++)
            for (var o in (t = arguments[r]))
              Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
          return e;
        }).apply(this, arguments);
    };
  function n(e, t, r) {
    if (r || 2 == arguments.length)
      for (var n, o = 0, s = t.length; o < s; o++)
        (!n && o in t) ||
          (n || (n = Array.prototype.slice.call(t, 0, o)), (n[o] = t[o]));
    return e.concat(n || Array.prototype.slice.call(t));
  }
  ("function" == typeof SuppressedError && SuppressedError, e.i(627686));
  var o = e.i(352386),
    s = e.i(924330),
    a = "-ms-",
    i = "-moz-",
    c = "-webkit-",
    u = "comm",
    l = "rule",
    f = "decl",
    p = "@keyframes",
    d = Math.abs,
    h = String.fromCharCode,
    v = Object.assign;
  function g(e, t) {
    return (e = t.exec(e)) ? e[0] : e;
  }
  function m(e, t, r) {
    return e.replace(t, r);
  }
  function y(e, t, r) {
    return e.indexOf(t, r);
  }
  function b(e, t) {
    return 0 | e.charCodeAt(t);
  }
  function S(e, t, r) {
    return e.slice(t, r);
  }
  function w(e) {
    return e.length;
  }
  function x(e, t) {
    return (t.push(e), e);
  }
  function C(e, t) {
    return e.filter(function (e) {
      return !g(e, t);
    });
  }
  var I = 1,
    P = 1,
    A = 0,
    k = 0,
    E = 0,
    $ = "";
  function R(e, t, r, n, o, s, a, i) {
    return {
      value: e,
      root: t,
      parent: r,
      type: n,
      props: o,
      children: s,
      line: I,
      column: P,
      length: a,
      return: "",
      siblings: i,
    };
  }
  function O(e, t) {
    return v(
      R("", null, null, "", null, null, 0, e.siblings),
      e,
      { length: -e.length },
      t,
    );
  }
  function _(e) {
    for (; e.root; ) e = O(e.root, { children: [e] });
    x(e, e.siblings);
  }
  function j() {
    return ((E = k < A ? b($, k++) : 0), P++, 10 === E && ((P = 1), I++), E);
  }
  function N() {
    return b($, k);
  }
  function T(e) {
    switch (e) {
      case 0:
      case 9:
      case 10:
      case 13:
      case 32:
        return 5;
      case 33:
      case 43:
      case 44:
      case 47:
      case 62:
      case 64:
      case 126:
      case 59:
      case 123:
      case 125:
        return 4;
      case 58:
        return 3;
      case 34:
      case 39:
      case 40:
      case 91:
        return 2;
      case 41:
      case 93:
        return 1;
    }
    return 0;
  }
  function D(e) {
    var t, r;
    return ((t = k - 1),
    (r = (function e(t) {
      for (; j(); )
        switch (E) {
          case t:
            return k;
          case 34:
          case 39:
            34 !== t && 39 !== t && e(E);
            break;
          case 40:
            41 === t && e(t);
            break;
          case 92:
            j();
        }
      return k;
    })(91 === e ? e + 2 : 40 === e ? e + 1 : e)),
    S($, t, r)).trim();
  }
  function z(e, t) {
    for (var r = "", n = 0; n < e.length; n++) r += t(e[n], n, e, t) || "";
    return r;
  }
  function F(e, t, r, n) {
    switch (e.type) {
      case "@layer":
        if (e.children.length) break;
      case "@import":
      case f:
        return (e.return = e.return || e.value);
      case u:
        return "";
      case p:
        return (e.return = e.value + "{" + z(e.children, n) + "}");
      case l:
        if (!w((e.value = e.props.join(",")))) return "";
    }
    return w((r = z(e.children, n)))
      ? (e.return = e.value + "{" + r + "}")
      : "";
  }
  function G(e, t, r, n) {
    if (e.length > -1 && !e.return)
      switch (e.type) {
        case f:
          e.return = (function e(t, r, n) {
            var o;
            switch (
              ((o = r),
              45 ^ b(t, 0)
                ? (((((((o << 2) ^ b(t, 0)) << 2) ^ b(t, 1)) << 2) ^ b(t, 2)) <<
                    2) ^
                  b(t, 3)
                : 0)
            ) {
              case 5103:
                return c + "print-" + t + t;
              case 5737:
              case 4201:
              case 3177:
              case 3433:
              case 1641:
              case 4457:
              case 2921:
              case 5572:
              case 6356:
              case 5844:
              case 3191:
              case 6645:
              case 3005:
              case 6391:
              case 5879:
              case 5623:
              case 6135:
              case 4599:
              case 4855:
              case 4215:
              case 6389:
              case 5109:
              case 5365:
              case 5621:
              case 3829:
                return c + t + t;
              case 4789:
                return i + t + t;
              case 5349:
              case 4246:
              case 4810:
              case 6968:
              case 2756:
                return c + t + i + t + a + t + t;
              case 5936:
                switch (b(t, r + 11)) {
                  case 114:
                    return c + t + a + m(t, /[svh]\w+-[tblr]{2}/, "tb") + t;
                  case 108:
                    return c + t + a + m(t, /[svh]\w+-[tblr]{2}/, "tb-rl") + t;
                  case 45:
                    return c + t + a + m(t, /[svh]\w+-[tblr]{2}/, "lr") + t;
                }
              case 6828:
              case 4268:
              case 2903:
                return c + t + a + t + t;
              case 6165:
                return c + t + a + "flex-" + t + t;
              case 5187:
                return (
                  c +
                  t +
                  m(t, /(\w+).+(:[^]+)/, c + "box-$1$2" + a + "flex-$1$2") +
                  t
                );
              case 5443:
                return (
                  c +
                  t +
                  a +
                  "flex-item-" +
                  m(t, /flex-|-self/g, "") +
                  (g(t, /flex-|baseline/)
                    ? ""
                    : a + "grid-row-" + m(t, /flex-|-self/g, "")) +
                  t
                );
              case 4675:
                return (
                  c +
                  t +
                  a +
                  "flex-line-pack" +
                  m(t, /align-content|flex-|-self/g, "") +
                  t
                );
              case 5548:
                return c + t + a + m(t, "shrink", "negative") + t;
              case 5292:
                return c + t + a + m(t, "basis", "preferred-size") + t;
              case 6060:
                return (
                  c +
                  "box-" +
                  m(t, "-grow", "") +
                  c +
                  t +
                  a +
                  m(t, "grow", "positive") +
                  t
                );
              case 4554:
                return c + m(t, /([^-])(transform)/g, "$1" + c + "$2") + t;
              case 6187:
                return (
                  m(
                    m(m(t, /(zoom-|grab)/, c + "$1"), /(image-set)/, c + "$1"),
                    t,
                    "",
                  ) + t
                );
              case 5495:
              case 3959:
                return m(t, /(image-set\([^]*)/, c + "$1$`$1");
              case 4968:
                return (
                  m(
                    m(
                      t,
                      /(.+:)(flex-)?(.*)/,
                      c + "box-pack:$3" + a + "flex-pack:$3",
                    ),
                    /s.+-b[^;]+/,
                    "justify",
                  ) +
                  c +
                  t +
                  t
                );
              case 4200:
                if (!g(t, /flex-|baseline/))
                  return a + "grid-column-align" + S(t, r) + t;
                break;
              case 2592:
              case 3360:
                return a + m(t, "template-", "") + t;
              case 4384:
              case 3616:
                if (
                  n &&
                  n.some(function (e, t) {
                    return ((r = t), g(e.props, /grid-\w+-end/));
                  })
                )
                  return ~y(t + (n = n[r].value), "span", 0)
                    ? t
                    : a +
                        m(t, "-start", "") +
                        t +
                        a +
                        "grid-row-span:" +
                        (~y(n, "span", 0)
                          ? g(n, /\d+/)
                          : g(n, /\d+/) - g(t, /\d+/)) +
                        ";";
                return a + m(t, "-start", "") + t;
              case 4896:
              case 4128:
                return n &&
                  n.some(function (e) {
                    return g(e.props, /grid-\w+-start/);
                  })
                  ? t
                  : a + m(m(t, "-end", "-span"), "span ", "") + t;
              case 4095:
              case 3583:
              case 4068:
              case 2532:
                return m(t, /(.+)-inline(.+)/, c + "$1$2") + t;
              case 8116:
              case 7059:
              case 5753:
              case 5535:
              case 5445:
              case 5701:
              case 4933:
              case 4677:
              case 5533:
              case 5789:
              case 5021:
              case 4765:
                if (w(t) - 1 - r > 6)
                  switch (b(t, r + 1)) {
                    case 109:
                      if (45 !== b(t, r + 4)) break;
                    case 102:
                      return (
                        m(
                          t,
                          /(.+:)(.+)-([^]+)/,
                          "$1" +
                            c +
                            "$2-$3$1" +
                            i +
                            (108 == b(t, r + 3) ? "$3" : "$2-$3"),
                        ) + t
                      );
                    case 115:
                      return ~y(t, "stretch", 0)
                        ? e(m(t, "stretch", "fill-available"), r, n) + t
                        : t;
                  }
                break;
              case 5152:
              case 5920:
                return m(
                  t,
                  /(.+?):(\d+)(\s*\/\s*(span)?\s*(\d+))?(.*)/,
                  function (e, r, n, o, s, i, c) {
                    return (
                      a +
                      r +
                      ":" +
                      n +
                      c +
                      (o ? a + r + "-span:" + (s ? i : i - n) + c : "") +
                      t
                    );
                  },
                );
              case 4949:
                if (121 === b(t, r + 6)) return m(t, ":", ":" + c) + t;
                break;
              case 6444:
                switch (b(t, 45 === b(t, 14) ? 18 : 11)) {
                  case 120:
                    return (
                      m(
                        t,
                        /(.+:)([^;\s!]+)(;|(\s+)?!.+)?/,
                        "$1" +
                          c +
                          (45 === b(t, 14) ? "inline-" : "") +
                          "box$3$1" +
                          c +
                          "$2$3$1" +
                          a +
                          "$2box$3",
                      ) + t
                    );
                  case 100:
                    return m(t, ":", ":" + a) + t;
                }
                break;
              case 5719:
              case 2647:
              case 2135:
              case 3927:
              case 2391:
                return m(t, "scroll-", "scroll-snap-") + t;
            }
            return t;
          })(e.value, e.length, r);
          return;
        case p:
          return z([O(e, { value: m(e.value, "@", "@" + c) })], n);
        case l:
          if (e.length) {
            var o, s;
            return (
              (o = r = e.props),
              (s = function (t) {
                switch (g(t, (n = /(::plac\w+|:read-\w+)/))) {
                  case ":read-only":
                  case ":read-write":
                    (_(O(e, { props: [m(t, /:(read-\w+)/, ":" + i + "$1")] })),
                      _(O(e, { props: [t] })),
                      v(e, { props: C(r, n) }));
                    break;
                  case "::placeholder":
                    (_(
                      O(e, {
                        props: [m(t, /:(plac\w+)/, ":" + c + "input-$1")],
                      }),
                    ),
                      _(O(e, { props: [m(t, /:(plac\w+)/, ":" + i + "$1")] })),
                      _(O(e, { props: [m(t, /:(plac\w+)/, a + "input-$1")] })),
                      _(O(e, { props: [t] })),
                      v(e, { props: C(r, n) }));
                }
                return "";
              }),
              o.map(s).join("")
            );
          }
      }
  }
  function B(e, t, r, n, o, s, a, i, c, u, f, p) {
    for (
      var h = o - 1, v = 0 === o ? s : [""], g = v.length, y = 0, b = 0, w = 0;
      y < n;
      ++y
    )
      for (var x = 0, C = S(e, h + 1, (h = d((b = a[y])))), I = e; x < g; ++x)
        (I = (b > 0 ? v[x] + " " + C : m(C, /&\f/g, v[x])).trim()) &&
          (c[w++] = I);
    return R(e, t, r, 0 === o ? l : i, c, u, f, p);
  }
  function L(e, t, r, n, o) {
    return R(e, t, r, f, S(e, 0, n), S(e, n + 1, -1), n, o);
  }
  var M = {
      animationIterationCount: 1,
      aspectRatio: 1,
      borderImageOutset: 1,
      borderImageSlice: 1,
      borderImageWidth: 1,
      boxFlex: 1,
      boxFlexGroup: 1,
      boxOrdinalGroup: 1,
      columnCount: 1,
      columns: 1,
      flex: 1,
      flexGrow: 1,
      flexPositive: 1,
      flexShrink: 1,
      flexNegative: 1,
      flexOrder: 1,
      gridRow: 1,
      gridRowEnd: 1,
      gridRowSpan: 1,
      gridRowStart: 1,
      gridColumn: 1,
      gridColumnEnd: 1,
      gridColumnSpan: 1,
      gridColumnStart: 1,
      msGridRow: 1,
      msGridRowSpan: 1,
      msGridColumn: 1,
      msGridColumnSpan: 1,
      fontWeight: 1,
      lineHeight: 1,
      opacity: 1,
      order: 1,
      orphans: 1,
      tabSize: 1,
      widows: 1,
      zIndex: 1,
      zoom: 1,
      WebkitLineClamp: 1,
      fillOpacity: 1,
      floodOpacity: 1,
      stopOpacity: 1,
      strokeDasharray: 1,
      strokeDashoffset: 1,
      strokeMiterlimit: 1,
      strokeOpacity: 1,
      strokeWidth: 1,
    },
    W =
      (void 0 !== t.default &&
        void 0 !== t.default.env &&
        (t.default.env.REACT_APP_SC_ATTR || t.default.env.SC_ATTR)) ||
      "data-styled",
    Y = "active",
    q = "data-styled-version",
    H = "6.1.19",
    U = "/*!sc*/\n",
    K = "u" > typeof window && "u" > typeof document,
    V = !!("boolean" == typeof SC_DISABLE_SPEEDY
      ? SC_DISABLE_SPEEDY
      : void 0 !== t.default &&
          void 0 !== t.default.env &&
          void 0 !== t.default.env.REACT_APP_SC_DISABLE_SPEEDY &&
          "" !== t.default.env.REACT_APP_SC_DISABLE_SPEEDY
        ? "false" !== t.default.env.REACT_APP_SC_DISABLE_SPEEDY &&
          t.default.env.REACT_APP_SC_DISABLE_SPEEDY
        : void 0 !== t.default &&
          void 0 !== t.default.env &&
          void 0 !== t.default.env.SC_DISABLE_SPEEDY &&
          "" !== t.default.env.SC_DISABLE_SPEEDY &&
          "false" !== t.default.env.SC_DISABLE_SPEEDY &&
          t.default.env.SC_DISABLE_SPEEDY),
    J = {},
    Q = Object.freeze([]),
    Z = Object.freeze({});
  function X(e, t, r) {
    return (
      void 0 === r && (r = Z),
      (e.theme !== r.theme && e.theme) || t || r.theme
    );
  }
  var ee = new Set([
      "a",
      "abbr",
      "address",
      "area",
      "article",
      "aside",
      "audio",
      "b",
      "base",
      "bdi",
      "bdo",
      "big",
      "blockquote",
      "body",
      "br",
      "button",
      "canvas",
      "caption",
      "cite",
      "code",
      "col",
      "colgroup",
      "data",
      "datalist",
      "dd",
      "del",
      "details",
      "dfn",
      "dialog",
      "div",
      "dl",
      "dt",
      "em",
      "embed",
      "fieldset",
      "figcaption",
      "figure",
      "footer",
      "form",
      "h1",
      "h2",
      "h3",
      "h4",
      "h5",
      "h6",
      "header",
      "hgroup",
      "hr",
      "html",
      "i",
      "iframe",
      "img",
      "input",
      "ins",
      "kbd",
      "keygen",
      "label",
      "legend",
      "li",
      "link",
      "main",
      "map",
      "mark",
      "menu",
      "menuitem",
      "meta",
      "meter",
      "nav",
      "noscript",
      "object",
      "ol",
      "optgroup",
      "option",
      "output",
      "p",
      "param",
      "picture",
      "pre",
      "progress",
      "q",
      "rp",
      "rt",
      "ruby",
      "s",
      "samp",
      "script",
      "section",
      "select",
      "small",
      "source",
      "span",
      "strong",
      "style",
      "sub",
      "summary",
      "sup",
      "table",
      "tbody",
      "td",
      "textarea",
      "tfoot",
      "th",
      "thead",
      "time",
      "tr",
      "track",
      "u",
      "ul",
      "use",
      "var",
      "video",
      "wbr",
      "circle",
      "clipPath",
      "defs",
      "ellipse",
      "foreignObject",
      "g",
      "image",
      "line",
      "linearGradient",
      "marker",
      "mask",
      "path",
      "pattern",
      "polygon",
      "polyline",
      "radialGradient",
      "rect",
      "stop",
      "svg",
      "text",
      "tspan",
    ]),
    et = /[!"#$%&'()*+,./:;<=>?@[\\\]^`{|}~-]+/g,
    er = /(^-|-$)/g;
  function en(e) {
    return e.replace(et, "-").replace(er, "");
  }
  var eo = /(a)(d)/gi,
    es = function (e) {
      return String.fromCharCode(e + (e > 25 ? 39 : 97));
    };
  function ea(e) {
    var t,
      r = "";
    for (t = Math.abs(e); t > 52; t = (t / 52) | 0) r = es(t % 52) + r;
    return (es(t % 52) + r).replace(eo, "$1-$2");
  }
  var ei,
    ec = function (e, t) {
      for (var r = t.length; r; ) e = (33 * e) ^ t.charCodeAt(--r);
      return e;
    },
    eu = function (e) {
      return ec(5381, e);
    };
  function el(e) {
    return ea(eu(e) >>> 0);
  }
  function ef(e) {
    return "string" == typeof e;
  }
  var ep = "function" == typeof Symbol && Symbol.for,
    ed = ep ? Symbol.for("react.memo") : 60115,
    eh = ep ? Symbol.for("react.forward_ref") : 60112,
    ev = {
      childContextTypes: !0,
      contextType: !0,
      contextTypes: !0,
      defaultProps: !0,
      displayName: !0,
      getDefaultProps: !0,
      getDerivedStateFromError: !0,
      getDerivedStateFromProps: !0,
      mixins: !0,
      propTypes: !0,
      type: !0,
    },
    eg = {
      name: !0,
      length: !0,
      prototype: !0,
      caller: !0,
      callee: !0,
      arguments: !0,
      arity: !0,
    },
    em = {
      $$typeof: !0,
      compare: !0,
      defaultProps: !0,
      displayName: !0,
      propTypes: !0,
      type: !0,
    },
    ey =
      (((ei = {})[eh] = {
        $$typeof: !0,
        render: !0,
        defaultProps: !0,
        displayName: !0,
        propTypes: !0,
      }),
      (ei[ed] = em),
      ei);
  function eb(e) {
    return ("type" in e && e.type.$$typeof) === ed
      ? em
      : "$$typeof" in e
        ? ey[e.$$typeof]
        : ev;
  }
  var eS = Object.defineProperty,
    ew = Object.getOwnPropertyNames,
    ex = Object.getOwnPropertySymbols,
    eC = Object.getOwnPropertyDescriptor,
    eI = Object.getPrototypeOf,
    eP = Object.prototype;
  function eA(e) {
    return "function" == typeof e;
  }
  function ek(e) {
    return "object" == typeof e && "styledComponentId" in e;
  }
  function eE(e, t) {
    return e && t ? "".concat(e, " ").concat(t) : e || t || "";
  }
  function e$(e, t) {
    if (0 === e.length) return "";
    for (var r = e[0], n = 1; n < e.length; n++) r += t ? t + e[n] : e[n];
    return r;
  }
  function eR(e) {
    return (
      null !== e &&
      "object" == typeof e &&
      e.constructor.name === Object.name &&
      !("props" in e && e.$$typeof)
    );
  }
  function eO(e, t) {
    Object.defineProperty(e, "toString", { value: t });
  }
  function e_(e) {
    for (var t = [], r = 1; r < arguments.length; r++) t[r - 1] = arguments[r];
    return Error(
      "An error occurred. See https://github.com/styled-components/styled-components/blob/main/packages/styled-components/src/utils/errors.md#"
        .concat(e, " for more information.")
        .concat(t.length > 0 ? " Args: ".concat(t.join(", ")) : ""),
    );
  }
  var ej = (function () {
      function e(e) {
        ((this.groupSizes = new Uint32Array(512)),
          (this.length = 512),
          (this.tag = e));
      }
      return (
        (e.prototype.indexOfGroup = function (e) {
          for (var t = 0, r = 0; r < e; r++) t += this.groupSizes[r];
          return t;
        }),
        (e.prototype.insertRules = function (e, t) {
          if (e >= this.groupSizes.length) {
            for (var r = this.groupSizes, n = r.length, o = n; e >= o; )
              if ((o <<= 1) < 0) throw e_(16, "".concat(e));
            ((this.groupSizes = new Uint32Array(o)),
              this.groupSizes.set(r),
              (this.length = o));
            for (var s = n; s < o; s++) this.groupSizes[s] = 0;
          }
          for (
            var a = this.indexOfGroup(e + 1), i = ((s = 0), t.length);
            s < i;
            s++
          )
            this.tag.insertRule(a, t[s]) && (this.groupSizes[e]++, a++);
        }),
        (e.prototype.clearGroup = function (e) {
          if (e < this.length) {
            var t = this.groupSizes[e],
              r = this.indexOfGroup(e),
              n = r + t;
            this.groupSizes[e] = 0;
            for (var o = r; o < n; o++) this.tag.deleteRule(r);
          }
        }),
        (e.prototype.getGroup = function (e) {
          var t = "";
          if (e >= this.length || 0 === this.groupSizes[e]) return t;
          for (
            var r = this.groupSizes[e],
              n = this.indexOfGroup(e),
              o = n + r,
              s = n;
            s < o;
            s++
          )
            t += "".concat(this.tag.getRule(s)).concat(U);
          return t;
        }),
        e
      );
    })(),
    eN = new Map(),
    eT = new Map(),
    eD = 1,
    ez = function (e) {
      if (eN.has(e)) return eN.get(e);
      for (; eT.has(eD); ) eD++;
      var t = eD++;
      return (eN.set(e, t), eT.set(t, e), t);
    },
    eF = function (e, t) {
      ((eD = t + 1), eN.set(e, t), eT.set(t, e));
    },
    eG = "style[".concat(W, "][").concat(q, '="').concat(H, '"]'),
    eB = new RegExp(
      "^".concat(W, '\\.g(\\d+)\\[id="([\\w\\d-]+)"\\].*?"([^"]*)'),
    ),
    eL = function (e, t, r) {
      for (var n, o = r.split(","), s = 0, a = o.length; s < a; s++)
        (n = o[s]) && e.registerName(t, n);
    },
    eM = function (e, t) {
      for (
        var r,
          n = (null != (r = t.textContent) ? r : "").split(U),
          o = [],
          s = 0,
          a = n.length;
        s < a;
        s++
      ) {
        var i = n[s].trim();
        if (i) {
          var c = i.match(eB);
          if (c) {
            var u = 0 | parseInt(c[1], 10),
              l = c[2];
            (0 !== u &&
              (eF(l, u), eL(e, l, c[3]), e.getTag().insertRules(u, o)),
              (o.length = 0));
          } else o.push(i);
        }
      }
    },
    eW = function (e) {
      for (
        var t = document.querySelectorAll(eG), r = 0, n = t.length;
        r < n;
        r++
      ) {
        var o = t[r];
        o &&
          o.getAttribute(W) !== Y &&
          (eM(e, o), o.parentNode && o.parentNode.removeChild(o));
      }
    };
  function eY() {
    return "u" > typeof __webpack_nonce__ ? __webpack_nonce__ : null;
  }
  var eq = function (e) {
      var t,
        r = document.head,
        n = e || r,
        o = document.createElement("style"),
        s = (t = Array.from(n.querySelectorAll("style[".concat(W, "]"))))[
          t.length - 1
        ],
        a = void 0 !== s ? s.nextSibling : null;
      (o.setAttribute(W, Y), o.setAttribute(q, H));
      var i = eY();
      return (i && o.setAttribute("nonce", i), n.insertBefore(o, a), o);
    },
    eH = (function () {
      function e(e) {
        ((this.element = eq(e)),
          this.element.appendChild(document.createTextNode("")),
          (this.sheet = (function (e) {
            if (e.sheet) return e.sheet;
            for (
              var t = document.styleSheets, r = 0, n = t.length;
              r < n;
              r++
            ) {
              var o = t[r];
              if (o.ownerNode === e) return o;
            }
            throw e_(17);
          })(this.element)),
          (this.length = 0));
      }
      return (
        (e.prototype.insertRule = function (e, t) {
          try {
            return (this.sheet.insertRule(t, e), this.length++, !0);
          } catch (e) {
            return !1;
          }
        }),
        (e.prototype.deleteRule = function (e) {
          (this.sheet.deleteRule(e), this.length--);
        }),
        (e.prototype.getRule = function (e) {
          var t = this.sheet.cssRules[e];
          return t && t.cssText ? t.cssText : "";
        }),
        e
      );
    })(),
    eU = (function () {
      function e(e) {
        ((this.element = eq(e)),
          (this.nodes = this.element.childNodes),
          (this.length = 0));
      }
      return (
        (e.prototype.insertRule = function (e, t) {
          if (e <= this.length && e >= 0) {
            var r = document.createTextNode(t);
            return (
              this.element.insertBefore(r, this.nodes[e] || null),
              this.length++,
              !0
            );
          }
          return !1;
        }),
        (e.prototype.deleteRule = function (e) {
          (this.element.removeChild(this.nodes[e]), this.length--);
        }),
        (e.prototype.getRule = function (e) {
          return e < this.length ? this.nodes[e].textContent : "";
        }),
        e
      );
    })(),
    eK = (function () {
      function e(e) {
        ((this.rules = []), (this.length = 0));
      }
      return (
        (e.prototype.insertRule = function (e, t) {
          return (
            e <= this.length && (this.rules.splice(e, 0, t), this.length++, !0)
          );
        }),
        (e.prototype.deleteRule = function (e) {
          (this.rules.splice(e, 1), this.length--);
        }),
        (e.prototype.getRule = function (e) {
          return e < this.length ? this.rules[e] : "";
        }),
        e
      );
    })(),
    eV = K,
    eJ = { isServer: !K, useCSSOMInjection: !V },
    eQ = (function () {
      function e(e, t, n) {
        (void 0 === e && (e = Z), void 0 === t && (t = {}));
        var o = this;
        ((this.options = r(r({}, eJ), e)),
          (this.gs = t),
          (this.names = new Map(n)),
          (this.server = !!e.isServer),
          !this.server && K && eV && ((eV = !1), eW(this)),
          eO(this, function () {
            for (var e = o.getTag(), t = e.length, r = "", n = 0; n < t; n++)
              !(function (t) {
                var n = eT.get(t);
                if (void 0 === n) return;
                var s = o.names.get(n),
                  a = e.getGroup(t);
                if (void 0 !== s && s.size && 0 !== a.length) {
                  var i = "".concat(W, ".g").concat(t, '[id="').concat(n, '"]'),
                    c = "";
                  (void 0 !== s &&
                    s.forEach(function (e) {
                      e.length > 0 && (c += "".concat(e, ","));
                    }),
                    (r += ""
                      .concat(a)
                      .concat(i, '{content:"')
                      .concat(c, '"}')
                      .concat(U)));
                }
              })(n);
            return r;
          }));
      }
      return (
        (e.registerId = function (e) {
          return ez(e);
        }),
        (e.prototype.rehydrate = function () {
          !this.server && K && eW(this);
        }),
        (e.prototype.reconstructWithOptions = function (t, n) {
          return (
            void 0 === n && (n = !0),
            new e(
              r(r({}, this.options), t),
              this.gs,
              (n && this.names) || void 0,
            )
          );
        }),
        (e.prototype.allocateGSInstance = function (e) {
          return (this.gs[e] = (this.gs[e] || 0) + 1);
        }),
        (e.prototype.getTag = function () {
          var e, t, r;
          return (
            this.tag ||
            (this.tag =
              ((t = (e = this.options).useCSSOMInjection),
              (r = e.target),
              new ej(e.isServer ? new eK(r) : t ? new eH(r) : new eU(r))))
          );
        }),
        (e.prototype.hasNameForId = function (e, t) {
          return this.names.has(e) && this.names.get(e).has(t);
        }),
        (e.prototype.registerName = function (e, t) {
          if ((ez(e), this.names.has(e))) this.names.get(e).add(t);
          else {
            var r = new Set();
            (r.add(t), this.names.set(e, r));
          }
        }),
        (e.prototype.insertRules = function (e, t, r) {
          (this.registerName(e, t), this.getTag().insertRules(ez(e), r));
        }),
        (e.prototype.clearNames = function (e) {
          this.names.has(e) && this.names.get(e).clear();
        }),
        (e.prototype.clearRules = function (e) {
          (this.getTag().clearGroup(ez(e)), this.clearNames(e));
        }),
        (e.prototype.clearTag = function () {
          this.tag = void 0;
        }),
        e
      );
    })(),
    eZ = /&/g,
    eX = /^\s*\/\/.*$/gm;
  function e0(e) {
    var t,
      r,
      n,
      o = void 0 === e ? Z : e,
      s = o.options,
      a = void 0 === s ? Z : s,
      i = o.plugins,
      c = void 0 === i ? Q : i,
      f = function (e, n, o) {
        return o.startsWith(r) &&
          o.endsWith(r) &&
          o.replaceAll(r, "").length > 0
          ? ".".concat(t)
          : e;
      },
      p = c.slice();
    (p.push(function (e) {
      e.type === l &&
        e.value.includes("&") &&
        (e.props[0] = e.props[0].replace(eZ, r).replace(n, f));
    }),
      a.prefix && p.push(G),
      p.push(F));
    var v = function (e, o, s, i) {
      (void 0 === o && (o = ""),
        void 0 === s && (s = ""),
        void 0 === i && (i = "&"),
        (t = i),
        (r = o),
        (n = RegExp("\\".concat(r, "\\b"), "g")));
      var c,
        l,
        f,
        v,
        g,
        C,
        O = e.replace(eX, ""),
        _ =
          ((g = (function e(t, r, n, o, s, a, i, c, l) {
            for (
              var f,
                p,
                v,
                g,
                C = 0,
                A = 0,
                O = i,
                _ = 0,
                z = 0,
                F = 0,
                G = 1,
                M = 1,
                W = 1,
                Y = 0,
                q = "",
                H = s,
                U = a,
                K = o,
                V = q;
              M;

            )
              switch (((F = Y), (Y = j()))) {
                case 40:
                  if (108 != F && 58 == b(V, O - 1)) {
                    -1 !=
                      y(
                        (V += m(D(Y), "&", "&\f")),
                        "&\f",
                        d(C ? c[C - 1] : 0),
                      ) && (W = -1);
                    break;
                  }
                case 34:
                case 39:
                case 91:
                  V += D(Y);
                  break;
                case 9:
                case 10:
                case 13:
                case 32:
                  V += (function (e) {
                    for (; (E = N()); )
                      if (E < 33) j();
                      else break;
                    return T(e) > 2 || T(E) > 3 ? "" : " ";
                  })(F);
                  break;
                case 92:
                  V += (function (e, t) {
                    for (
                      var r;
                      --t &&
                      j() &&
                      !(E < 48) &&
                      !(E > 102) &&
                      (!(E > 57) || !(E < 65)) &&
                      (!(E > 70) || !(E < 97));

                    );
                    return (
                      (r = k + (t < 6 && 32 == N() && 32 == j())),
                      S($, e, r)
                    );
                  })(k - 1, 7);
                  continue;
                case 47:
                  switch (N()) {
                    case 42:
                    case 47:
                      x(
                        ((f = (function (e, t) {
                          for (; j(); )
                            if (e + E === 57) break;
                            else if (e + E === 84 && 47 === N()) break;
                          return (
                            "/*" + S($, t, k - 1) + "*" + h(47 === e ? e : j())
                          );
                        })(j(), k)),
                        (p = r),
                        (v = n),
                        (g = l),
                        R(f, p, v, u, h(E), S(f, 2, -2), 0, g)),
                        l,
                      );
                      break;
                    default:
                      V += "/";
                  }
                  break;
                case 123 * G:
                  c[C++] = w(V) * W;
                case 125 * G:
                case 59:
                case 0:
                  switch (Y) {
                    case 0:
                    case 125:
                      M = 0;
                    case 59 + A:
                      (-1 == W && (V = m(V, /\f/g, "")),
                        z > 0 &&
                          w(V) - O &&
                          x(
                            z > 32
                              ? L(V + ";", o, n, O - 1, l)
                              : L(m(V, " ", "") + ";", o, n, O - 2, l),
                            l,
                          ));
                      break;
                    case 59:
                      V += ";";
                    default:
                      if (
                        (x(
                          (K = B(
                            V,
                            r,
                            n,
                            C,
                            A,
                            s,
                            c,
                            q,
                            (H = []),
                            (U = []),
                            O,
                            a,
                          )),
                          a,
                        ),
                        123 === Y)
                      )
                        if (0 === A) e(V, r, K, K, H, a, O, c, U);
                        else
                          switch (99 === _ && 110 === b(V, 3) ? 100 : _) {
                            case 100:
                            case 108:
                            case 109:
                            case 115:
                              e(
                                t,
                                K,
                                K,
                                o &&
                                  x(
                                    B(
                                      t,
                                      K,
                                      K,
                                      0,
                                      0,
                                      s,
                                      c,
                                      q,
                                      s,
                                      (H = []),
                                      O,
                                      U,
                                    ),
                                    U,
                                  ),
                                s,
                                U,
                                O,
                                c,
                                o ? H : U,
                              );
                              break;
                            default:
                              e(V, K, K, K, [""], U, 0, c, U);
                          }
                  }
                  ((C = A = z = 0), (G = W = 1), (q = V = ""), (O = i));
                  break;
                case 58:
                  ((O = 1 + w(V)), (z = F));
                default:
                  if (G < 1) {
                    if (123 == Y) --G;
                    else if (
                      125 == Y &&
                      0 == G++ &&
                      125 ==
                        ((E = k > 0 ? b($, --k) : 0),
                        P--,
                        10 === E && ((P = 1), I--),
                        E)
                    )
                      continue;
                  }
                  switch (((V += h(Y)), Y * G)) {
                    case 38:
                      W = A > 0 ? 1 : ((V += "\f"), -1);
                      break;
                    case 44:
                      ((c[C++] = (w(V) - 1) * W), (W = 1));
                      break;
                    case 64:
                      (45 === N() && (V += D(j())),
                        (_ = N()),
                        (A = O =
                          w(
                            (q = V +=
                              (function (e) {
                                for (; !T(N()); ) j();
                                return S($, e, k);
                              })(k)),
                          )),
                        Y++);
                      break;
                    case 45:
                      45 === F && 2 == w(V) && (G = 0);
                  }
              }
            return a;
          })(
            "",
            null,
            null,
            null,
            [""],
            ((v = f =
              s || o ? "".concat(s, " ").concat(o, " { ").concat(O, " }") : O),
            (I = P = 1),
            (A = w(($ = v))),
            (k = 0),
            (f = [])),
            0,
            [0],
            f,
          )),
          ($ = ""),
          g);
      a.namespace &&
        (_ = (function e(t, r) {
          return t.map(function (t) {
            return (
              "rule" === t.type &&
                ((t.value = "".concat(r, " ").concat(t.value)),
                (t.value = t.value.replaceAll(",", ",".concat(r, " "))),
                (t.props = t.props.map(function (e) {
                  return "".concat(r, " ").concat(e);
                }))),
              Array.isArray(t.children) &&
                "@keyframes" !== t.type &&
                (t.children = e(t.children, r)),
              t
            );
          });
        })(_, a.namespace));
      var F = [];
      return (
        z(
          _,
          ((l = (c = p.concat(
            ((C = function (e) {
              return F.push(e);
            }),
            function (e) {
              !e.root && (e = e.return) && C(e);
            }),
          )).length),
          function (e, t, r, n) {
            for (var o = "", s = 0; s < l; s++) o += c[s](e, t, r, n) || "";
            return o;
          }),
        ),
        F
      );
    };
    return (
      (v.hash = c.length
        ? c
            .reduce(function (e, t) {
              return (t.name || e_(15), ec(e, t.name));
            }, 5381)
            .toString()
        : ""),
      v
    );
  }
  var e1 = new eQ(),
    e2 = e0(),
    e5 = o.default.createContext({
      shouldForwardProp: void 0,
      styleSheet: e1,
      stylis: e2,
    }),
    e3 = (e5.Consumer, o.default.createContext(void 0));
  function e4() {
    return (0, o.useContext)(e5);
  }
  function e9(e) {
    var t = (0, o.useState)(e.stylisPlugins),
      r = t[0],
      n = t[1],
      a = e4().styleSheet,
      i = (0, o.useMemo)(
        function () {
          var t = a;
          return (
            e.sheet
              ? (t = e.sheet)
              : e.target &&
                (t = t.reconstructWithOptions({ target: e.target }, !1)),
            e.disableCSSOMInjection &&
              (t = t.reconstructWithOptions({ useCSSOMInjection: !1 })),
            t
          );
        },
        [e.disableCSSOMInjection, e.sheet, e.target, a],
      ),
      c = (0, o.useMemo)(
        function () {
          return e0({
            options: { namespace: e.namespace, prefix: e.enableVendorPrefixes },
            plugins: r,
          });
        },
        [e.enableVendorPrefixes, e.namespace, r],
      );
    (0, o.useEffect)(
      function () {
        (0, s.default)(r, e.stylisPlugins) || n(e.stylisPlugins);
      },
      [e.stylisPlugins],
    );
    var u = (0, o.useMemo)(
      function () {
        return {
          shouldForwardProp: e.shouldForwardProp,
          styleSheet: i,
          stylis: c,
        };
      },
      [e.shouldForwardProp, i, c],
    );
    return o.default.createElement(
      e5.Provider,
      { value: u },
      o.default.createElement(e3.Provider, { value: c }, e.children),
    );
  }
  var e6 = (function () {
    function e(e, t) {
      var r = this;
      ((this.inject = function (e, t) {
        void 0 === t && (t = e2);
        var n = r.name + t.hash;
        e.hasNameForId(r.id, n) ||
          e.insertRules(r.id, n, t(r.rules, n, "@keyframes"));
      }),
        (this.name = e),
        (this.id = "sc-keyframes-".concat(e)),
        (this.rules = t),
        eO(this, function () {
          throw e_(12, String(r.name));
        }));
    }
    return (
      (e.prototype.getName = function (e) {
        return (void 0 === e && (e = e2), this.name + e.hash);
      }),
      e
    );
  })();
  function e8(e) {
    for (var t = "", r = 0; r < e.length; r++) {
      var n = e[r];
      if (1 === r && "-" === n && "-" === e[0]) return e;
      n >= "A" && n <= "Z" ? (t += "-" + n.toLowerCase()) : (t += n);
    }
    return t.startsWith("ms-") ? "-" + t : t;
  }
  var e7 = function (e) {
      return null == e || !1 === e || "" === e;
    },
    te = function (e) {
      var t = [];
      for (var r in e) {
        var o = e[r];
        e.hasOwnProperty(r) &&
          !e7(o) &&
          ((Array.isArray(o) && o.isCss) || eA(o)
            ? t.push("".concat(e8(r), ":"), o, ";")
            : eR(o)
              ? t.push.apply(
                  t,
                  n(n(["".concat(r, " {")], te(o), !1), ["}"], !1),
                )
              : t.push(
                  ""
                    .concat(e8(r), ": ")
                    .concat(
                      null == o || "boolean" == typeof o || "" === o
                        ? ""
                        : "number" != typeof o ||
                            0 === o ||
                            r in M ||
                            r.startsWith("--")
                          ? String(o).trim()
                          : "".concat(o, "px"),
                      ";",
                    ),
                ));
      }
      return t;
    };
  function tt(e, t, r, n) {
    if (e7(e)) return [];
    if (ek(e)) return [".".concat(e.styledComponentId)];
    if (eA(e))
      return !eA(e) || (e.prototype && e.prototype.isReactComponent) || !t
        ? [e]
        : tt(e(t), t, r, n);
    return e instanceof e6
      ? r
        ? (e.inject(r, n), [e.getName(n)])
        : [e]
      : eR(e)
        ? te(e)
        : Array.isArray(e)
          ? Array.prototype.concat.apply(
              Q,
              e.map(function (e) {
                return tt(e, t, r, n);
              }),
            )
          : [e.toString()];
  }
  function tr(e) {
    for (var t = 0; t < e.length; t += 1) {
      var r = e[t];
      if (eA(r) && !ek(r)) return !1;
    }
    return !0;
  }
  var tn = eu(H),
    to = (function () {
      function e(e, t, r) {
        ((this.rules = e),
          (this.staticRulesId = ""),
          (this.isStatic = (void 0 === r || r.isStatic) && tr(e)),
          (this.componentId = t),
          (this.baseHash = ec(tn, t)),
          (this.baseStyle = r),
          eQ.registerId(t));
      }
      return (
        (e.prototype.generateAndInjectStyles = function (e, t, r) {
          var n = this.baseStyle
            ? this.baseStyle.generateAndInjectStyles(e, t, r)
            : "";
          if (this.isStatic && !r.hash)
            if (
              this.staticRulesId &&
              t.hasNameForId(this.componentId, this.staticRulesId)
            )
              n = eE(n, this.staticRulesId);
            else {
              var o = e$(tt(this.rules, e, t, r)),
                s = ea(ec(this.baseHash, o) >>> 0);
              if (!t.hasNameForId(this.componentId, s)) {
                var a = r(o, ".".concat(s), void 0, this.componentId);
                t.insertRules(this.componentId, s, a);
              }
              ((n = eE(n, s)), (this.staticRulesId = s));
            }
          else {
            for (
              var i = ec(this.baseHash, r.hash), c = "", u = 0;
              u < this.rules.length;
              u++
            ) {
              var l = this.rules[u];
              if ("string" == typeof l) c += l;
              else if (l) {
                var f = e$(tt(l, e, t, r));
                ((i = ec(i, f + u)), (c += f));
              }
            }
            if (c) {
              var p = ea(i >>> 0);
              (t.hasNameForId(this.componentId, p) ||
                t.insertRules(
                  this.componentId,
                  p,
                  r(c, ".".concat(p), void 0, this.componentId),
                ),
                (n = eE(n, p)));
            }
          }
          return n;
        }),
        e
      );
    })(),
    ts = o.default.createContext(void 0);
  ts.Consumer;
  var ta = {};
  function ti(e, t, n) {
    var s,
      a,
      i,
      c,
      u = ek(e),
      l = !ef(e),
      f = t.attrs,
      p = void 0 === f ? Q : f,
      d = t.componentId,
      h =
        void 0 === d
          ? ((s = t.displayName),
            (a = t.parentComponentId),
            (ta[(i = "string" != typeof s ? "sc" : en(s))] = (ta[i] || 0) + 1),
            (c = "".concat(i, "-").concat(el(H + i + ta[i]))),
            a ? "".concat(a, "-").concat(c) : c)
          : d,
      v = t.displayName,
      g =
        void 0 === v
          ? ef(e)
            ? "styled.".concat(e)
            : "Styled(".concat(e.displayName || e.name || "Component", ")")
          : v,
      m =
        t.displayName && t.componentId
          ? "".concat(en(t.displayName), "-").concat(t.componentId)
          : t.componentId || h,
      y = u && e.attrs ? e.attrs.concat(p).filter(Boolean) : p,
      b = t.shouldForwardProp;
    if (u && e.shouldForwardProp) {
      var S = e.shouldForwardProp;
      if (t.shouldForwardProp) {
        var w = t.shouldForwardProp;
        b = function (e, t) {
          return S(e, t) && w(e, t);
        };
      } else b = S;
    }
    var x = new to(n, m, u ? e.componentStyle : void 0);
    function C(e, t) {
      return (function (e, t, n) {
        var s,
          a = e.attrs,
          i = e.componentStyle,
          c = e.defaultProps,
          u = e.foldedComponentIds,
          l = e.styledComponentId,
          f = e.target,
          p = o.default.useContext(ts),
          d = e4(),
          h = e.shouldForwardProp || d.shouldForwardProp,
          v = X(t, p, c) || Z,
          g = (function (e, t, n) {
            for (
              var o, s = r(r({}, t), { className: void 0, theme: n }), a = 0;
              a < e.length;
              a += 1
            ) {
              var i = eA((o = e[a])) ? o(s) : o;
              for (var c in i)
                s[c] =
                  "className" === c
                    ? eE(s[c], i[c])
                    : "style" === c
                      ? r(r({}, s[c]), i[c])
                      : i[c];
            }
            return (
              t.className && (s.className = eE(s.className, t.className)),
              s
            );
          })(a, t, v),
          m = g.as || f,
          y = {};
        for (var b in g)
          void 0 === g[b] ||
            "$" === b[0] ||
            "as" === b ||
            ("theme" === b && g.theme === v) ||
            ("forwardedAs" === b
              ? (y.as = g.forwardedAs)
              : (h && !h(b, m)) || (y[b] = g[b]));
        var S =
            ((s = e4()), i.generateAndInjectStyles(g, s.styleSheet, s.stylis)),
          w = eE(u, l);
        return (
          S && (w += " " + S),
          g.className && (w += " " + g.className),
          (y[ef(m) && !ee.has(m) ? "class" : "className"] = w),
          n && (y.ref = n),
          (0, o.createElement)(m, y)
        );
      })(I, e, t);
    }
    C.displayName = g;
    var I = o.default.forwardRef(C);
    return (
      (I.attrs = y),
      (I.componentStyle = x),
      (I.displayName = g),
      (I.shouldForwardProp = b),
      (I.foldedComponentIds = u
        ? eE(e.foldedComponentIds, e.styledComponentId)
        : ""),
      (I.styledComponentId = m),
      (I.target = u ? e.target : e),
      Object.defineProperty(I, "defaultProps", {
        get: function () {
          return this._foldedDefaultProps;
        },
        set: function (t) {
          this._foldedDefaultProps = u
            ? (function (e) {
                for (var t = [], r = 1; r < arguments.length; r++)
                  t[r - 1] = arguments[r];
                for (var n = 0; n < t.length; n++)
                  !(function e(t, r, n) {
                    if (
                      (void 0 === n && (n = !1),
                      !n && !eR(t) && !Array.isArray(t))
                    )
                      return r;
                    if (Array.isArray(r))
                      for (var o = 0; o < r.length; o++) t[o] = e(t[o], r[o]);
                    else if (eR(r)) for (var o in r) t[o] = e(t[o], r[o]);
                    return t;
                  })(e, t[n], !0);
                return e;
              })({}, e.defaultProps, t)
            : t;
        },
      }),
      eO(I, function () {
        return ".".concat(I.styledComponentId);
      }),
      l &&
        (function e(t, r, n) {
          if ("string" != typeof r) {
            if (eP) {
              var o = eI(r);
              o && o !== eP && e(t, o, n);
            }
            var s = ew(r);
            ex && (s = s.concat(ex(r)));
            for (var a = eb(t), i = eb(r), c = 0; c < s.length; ++c) {
              var u = s[c];
              if (!(u in eg || (n && n[u]) || (i && u in i) || (a && u in a))) {
                var l = eC(r, u);
                try {
                  eS(t, u, l);
                } catch (e) {}
              }
            }
          }
          return t;
        })(I, e, {
          attrs: !0,
          componentStyle: !0,
          displayName: !0,
          foldedComponentIds: !0,
          shouldForwardProp: !0,
          styledComponentId: !0,
          target: !0,
        }),
      I
    );
  }
  function tc(e, t) {
    for (var r = [e[0]], n = 0, o = t.length; n < o; n += 1)
      r.push(t[n], e[n + 1]);
    return r;
  }
  var tu = function (e) {
    return Object.assign(e, { isCss: !0 });
  };
  function tl(e) {
    for (var t = [], r = 1; r < arguments.length; r++) t[r - 1] = arguments[r];
    return eA(e) || eR(e)
      ? tu(tt(tc(Q, n([e], t, !0))))
      : 0 === t.length && 1 === e.length && "string" == typeof e[0]
        ? tt(e)
        : tu(tt(tc(e, t)));
  }
  var tf = function (e) {
    return (function e(t, o, s) {
      if ((void 0 === s && (s = Z), !o)) throw e_(1, o);
      var a = function (e) {
        for (var r = [], a = 1; a < arguments.length; a++)
          r[a - 1] = arguments[a];
        return t(o, s, tl.apply(void 0, n([e], r, !1)));
      };
      return (
        (a.attrs = function (n) {
          return e(
            t,
            o,
            r(r({}, s), {
              attrs: Array.prototype.concat(s.attrs, n).filter(Boolean),
            }),
          );
        }),
        (a.withConfig = function (n) {
          return e(t, o, r(r({}, s), n));
        }),
        a
      );
    })(ti, e);
  };
  ee.forEach(function (e) {
    tf[e] = tf(e);
  });
  var tp = (function () {
    function e(e, t) {
      ((this.rules = e),
        (this.componentId = t),
        (this.isStatic = tr(e)),
        eQ.registerId(this.componentId + 1));
    }
    return (
      (e.prototype.createStyles = function (e, t, r, n) {
        var o = n(e$(tt(this.rules, t, r, n)), ""),
          s = this.componentId + e;
        r.insertRules(s, s, o);
      }),
      (e.prototype.removeStyles = function (e, t) {
        t.clearRules(this.componentId + e);
      }),
      (e.prototype.renderStyles = function (e, t, r, n) {
        (e > 2 && eQ.registerId(this.componentId + e),
          this.removeStyles(e, r),
          this.createStyles(e, t, r, n));
      }),
      e
    );
  })();
  function td() {
    var e = this;
    ((this._emitSheetCSS = function () {
      var t = e.instance.toString();
      if (!t) return "";
      var r = eY(),
        n = e$(
          [
            r && 'nonce="'.concat(r, '"'),
            "".concat(W, '="true"'),
            "".concat(q, '="').concat(H, '"'),
          ].filter(Boolean),
          " ",
        );
      return "<style ".concat(n, ">").concat(t, "</style>");
    }),
      (this.getStyleTags = function () {
        if (e.sealed) throw e_(2);
        return e._emitSheetCSS();
      }),
      (this.getStyleElement = function () {
        if (e.sealed) throw e_(2);
        var t,
          n = e.instance.toString();
        if (!n) return [];
        var s =
            (((t = {})[W] = ""),
            (t[q] = H),
            (t.dangerouslySetInnerHTML = { __html: n }),
            t),
          a = eY();
        return (
          a && (s.nonce = a),
          [o.default.createElement("style", r({}, s, { key: "sc-0-0" }))]
        );
      }),
      (this.seal = function () {
        e.sealed = !0;
      }),
      (this.instance = new eQ({ isServer: !0 })),
      (this.sealed = !1));
  }
  ((td.prototype.collectStyles = function (e) {
    if (this.sealed) throw e_(2);
    return o.default.createElement(e9, { sheet: this.instance }, e);
  }),
    (td.prototype.interleaveWithNodeStream = function (e) {
      throw e_(3);
    }),
    e.s(
      [
        "Q",
        0,
        function (e) {
          for (var t = [], s = 1; s < arguments.length; s++)
            t[s - 1] = arguments[s];
          var a = tl.apply(void 0, n([e], t, !1)),
            i = "sc-global-".concat(el(JSON.stringify(a))),
            c = new tp(a, i),
            u = function (e) {
              var t = e4(),
                r = o.default.useContext(ts),
                n = o.default.useRef(
                  t.styleSheet.allocateGSInstance(i),
                ).current;
              return (
                t.styleSheet.server && l(n, e, t.styleSheet, r, t.stylis),
                o.default.useLayoutEffect(
                  function () {
                    if (!t.styleSheet.server)
                      return (
                        l(n, e, t.styleSheet, r, t.stylis),
                        function () {
                          return c.removeStyles(n, t.styleSheet);
                        }
                      );
                  },
                  [n, e, t.styleSheet, r, t.stylis],
                ),
                null
              );
            };
          function l(e, t, n, o, s) {
            if (c.isStatic) c.renderStyles(e, J, n, s);
            else {
              var a = r(r({}, t), { theme: X(t, o, u.defaultProps) });
              c.renderStyles(e, a, n, s);
            }
          }
          return o.default.memo(u);
        },
        "m",
        0,
        tl,
        "U",
        0,
        tf,
        "q",
        0,
        function (e) {
          for (var t = [], r = 1; r < arguments.length; r++)
            t[r - 1] = arguments[r];
          var o = e$(tl.apply(void 0, n([e], t, !1)));
          return new e6(el(o), o);
        },
        "z",
        0,
        tf,
      ],
      689391,
    ));
  var th = e.i(732486);
  let tv = tf.span`
  && {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 2;
  }
`,
    tg = tf.span`
  position: relative;
  width: 82px;
  height: 82px;
  display: inline-block;
`,
    tm = tf.span`
  && {
    width: 82px;
    height: 82px;
    border-width: 4px;
    border-style: solid;
    border-color: ${(e) => e.color ?? "var(--privy-color-icon-subtle)"};
    border-bottom-color: transparent;
    border-radius: 50%;
    display: inline-block;
    box-sizing: border-box;
    animation: rotation 1.2s linear infinite;
    transition: border-color 800ms;
  }

  @keyframes rotation {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  &&&.success {
    border-color: var(--privy-color-icon-success);
  }

  &&&.fail {
    border-color: var(--privy-color-icon-error);
  }
`,
    ty = tf(tm)`
  && {
    border-color: ${(e) => e.color ?? "var(--privy-color-border-default)"};
    animation: none;
    opacity: 0.5;
  }
`,
    tb = tf(tm)`
  && {
    height: 1rem;
    width: 1rem;
    margin: 2px 0;
    border-width: 1.5px;

    /* Override default Loader to match button transitions */
    transition: border-color 200ms ease;
  }
`;
  e.s(
    [
      "B",
      0,
      (e) =>
        (0, th.jsx)(tb, {
          color: e.color || "var(--privy-color-foreground-3)",
        }),
      "C",
      0,
      ({ success: e, fail: t }) =>
        (0, th.jsxs)(tg, {
          children: [
            (0, th.jsx)(tv, {
              children: (0, th.jsx)(ty, {
                className: e ? "success" : t ? "fail" : "",
              }),
            }),
            (0, th.jsx)(tv, {
              children: (0, th.jsx)(tm, {
                className: e ? "success" : t ? "fail" : "",
              }),
            }),
          ],
        }),
      "L",
      0,
      tm,
      "a",
      0,
      ty,
    ],
    541021,
  );
};
