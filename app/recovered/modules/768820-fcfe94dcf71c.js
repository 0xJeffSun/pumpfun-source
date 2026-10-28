// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e, i, r) => {
  "use strict";
  Object.defineProperty(r, "__esModule", { value: !0 });
  var n = e.r(352386),
    t = n && "object" == typeof n && "default" in n ? n.default : n,
    o = e.r(123382),
    a = new o(),
    s = a.getBrowser(),
    u = a.getCPU(),
    d = a.getDevice(),
    l = a.getEngine(),
    c = a.getOS(),
    b = a.getUA(),
    w = function (e) {
      return a.setUA(e);
    },
    m = function (e) {
      if (!e) return void console.error("No userAgent string was provided");
      var i = new o(e);
      return {
        UA: i,
        browser: i.getBrowser(),
        cpu: i.getCPU(),
        device: i.getDevice(),
        engine: i.getEngine(),
        os: i.getOS(),
        ua: i.getUA(),
        setUserAgent: function (e) {
          return i.setUA(e);
        },
      };
    },
    f = Object.freeze({
      ClientUAInstance: a,
      browser: s,
      cpu: u,
      device: d,
      engine: l,
      os: c,
      ua: b,
      setUa: w,
      parseUserAgent: m,
    });
  function p(e, i) {
    var r = Object.keys(e);
    if (Object.getOwnPropertySymbols) {
      var n = Object.getOwnPropertySymbols(e);
      (i &&
        (n = n.filter(function (i) {
          return Object.getOwnPropertyDescriptor(e, i).enumerable;
        })),
        r.push.apply(r, n));
    }
    return r;
  }
  function h(e) {
    return (h =
      "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
        ? function (e) {
            return typeof e;
          }
        : function (e) {
            return e &&
              "function" == typeof Symbol &&
              e.constructor === Symbol &&
              e !== Symbol.prototype
              ? "symbol"
              : typeof e;
          })(e);
  }
  function v() {
    return (v =
      Object.assign ||
      function (e) {
        for (var i = 1; i < arguments.length; i++) {
          var r = arguments[i];
          for (var n in r)
            Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
        }
        return e;
      }).apply(this, arguments);
  }
  function g(e) {
    return (g = Object.setPrototypeOf
      ? Object.getPrototypeOf
      : function (e) {
          return e.__proto__ || Object.getPrototypeOf(e);
        })(e);
  }
  function y(e, i) {
    return (y =
      Object.setPrototypeOf ||
      function (e, i) {
        return ((e.__proto__ = i), e);
      })(e, i);
  }
  function x(e, i) {
    if (null == e) return {};
    var r,
      n,
      t = (function (e, i) {
        if (null == e) return {};
        var r,
          n,
          t = {},
          o = Object.keys(e);
        for (n = 0; n < o.length; n++)
          ((r = o[n]), i.indexOf(r) >= 0 || (t[r] = e[r]));
        return t;
      })(e, i);
    if (Object.getOwnPropertySymbols) {
      var o = Object.getOwnPropertySymbols(e);
      for (n = 0; n < o.length; n++)
        ((r = o[n]),
          !(i.indexOf(r) >= 0) &&
            Object.prototype.propertyIsEnumerable.call(e, r) &&
            (t[r] = e[r]));
    }
    return t;
  }
  function k(e) {
    if (void 0 === e)
      throw ReferenceError(
        "this hasn't been initialised - super() hasn't been called",
      );
    return e;
  }
  function O(e, i) {
    (null == i || i > e.length) && (i = e.length);
    for (var r = 0, n = Array(i); r < i; r++) n[r] = e[r];
    return n;
  }
  var E = "mobile",
    S = "tablet",
    P = "smarttv",
    C = "console",
    A = "wearable",
    _ = "embedded",
    T = void 0,
    j = {
      Chrome: "Chrome",
      Firefox: "Firefox",
      Opera: "Opera",
      Yandex: "Yandex",
      Safari: "Safari",
      InternetExplorer: "Internet Explorer",
      Edge: "Edge",
      Chromium: "Chromium",
      Ie: "IE",
      MobileSafari: "Mobile Safari",
      EdgeChromium: "Edge Chromium",
      MIUI: "MIUI Browser",
      SamsungBrowser: "Samsung Browser",
    },
    V = {
      IOS: "iOS",
      Android: "Android",
      WindowsPhone: "Windows Phone",
      Windows: "Windows",
      MAC_OS: "Mac OS",
    },
    W = {
      isMobile: !1,
      isTablet: !1,
      isBrowser: !1,
      isSmartTV: !1,
      isConsole: !1,
      isWearable: !1,
    },
    M = function (e) {
      switch (e) {
        case E:
          return { isMobile: !0 };
        case S:
          return { isTablet: !0 };
        case P:
          return { isSmartTV: !0 };
        case C:
          return { isConsole: !0 };
        case A:
          return { isWearable: !0 };
        case T:
          return { isBrowser: !0 };
        case _:
          return { isEmbedded: !0 };
        default:
          return W;
      }
    },
    F = function (e) {
      var i =
        arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "none";
      return e || i;
    },
    I = function () {
      return "u" > typeof window && (window.navigator || navigator);
    },
    N = function (e) {
      var i = I();
      return (
        i &&
        i.platform &&
        (-1 !== i.platform.indexOf(e) ||
          ("MacIntel" === i.platform &&
            i.maxTouchPoints > 1 &&
            !window.MSStream))
      );
    },
    U = function (e) {
      return e.type === E;
    },
    L = function (e) {
      return e.type === S;
    },
    B = function (e) {
      var i = e.type;
      return i === E || i === S;
    },
    q = function (e) {
      return e.type === P;
    },
    z = function (e) {
      return e.type === T;
    },
    D = function (e) {
      return e.type === A;
    },
    R = function (e) {
      return e.type === C;
    },
    G = function (e) {
      return e.type === _;
    },
    H = function (e) {
      return F(e.vendor);
    },
    $ = function (e) {
      return F(e.model);
    },
    Y = function (e) {
      return F(e.type, "browser");
    },
    Q = function (e) {
      return e.name === V.Android;
    },
    Z = function (e) {
      return e.name === V.Windows;
    },
    K = function (e) {
      return e.name === V.MAC_OS;
    },
    X = function (e) {
      return e.name === V.WindowsPhone;
    },
    J = function (e) {
      return e.name === V.IOS;
    },
    ee = function (e) {
      return F(e.version);
    },
    ei = function (e) {
      return F(e.name);
    },
    er = function (e) {
      return e.name === j.Chrome;
    },
    en = function (e) {
      return e.name === j.Firefox;
    },
    et = function (e) {
      return e.name === j.Chromium;
    },
    eo = function (e) {
      return e.name === j.Edge;
    },
    ea = function (e) {
      return e.name === j.Yandex;
    },
    es = function (e) {
      var i = e.name;
      return i === j.Safari || i === j.MobileSafari;
    },
    eu = function (e) {
      return e.name === j.MobileSafari;
    },
    ed = function (e) {
      return e.name === j.Opera;
    },
    el = function (e) {
      var i = e.name;
      return i === j.InternetExplorer || i === j.Ie;
    },
    ec = function (e) {
      return e.name === j.MIUI;
    },
    eb = function (e) {
      return e.name === j.SamsungBrowser;
    },
    ew = function (e) {
      return F(e.version);
    },
    em = function (e) {
      return F(e.major);
    },
    ef = function (e) {
      return F(e.name);
    },
    ep = function (e) {
      return F(e.name);
    },
    eh = function (e) {
      return F(e.version);
    },
    ev = function () {
      var e = I(),
        i = e && e.userAgent && e.userAgent.toLowerCase();
      return "string" == typeof i && /electron/.test(i);
    },
    eg = function (e) {
      return "string" == typeof e && -1 !== e.indexOf("Edg/");
    },
    ey = function () {
      var e = I();
      return (
        e &&
        (/iPad|iPhone|iPod/.test(e.platform) ||
          ("MacIntel" === e.platform && e.maxTouchPoints > 1)) &&
        !window.MSStream
      );
    },
    ex = function () {
      return N("iPad");
    },
    ek = function () {
      return N("iPhone");
    },
    eO = function () {
      return N("iPod");
    },
    eE = function (e) {
      return F(e);
    };
  function eS(e) {
    var i = e || f,
      r = i.device,
      n = i.browser,
      t = i.os,
      o = i.engine,
      a = i.ua;
    return {
      isSmartTV: q(r),
      isConsole: R(r),
      isWearable: D(r),
      isEmbedded: G(r),
      isMobileSafari: eu(n) || ex(),
      isChromium: et(n),
      isMobile: B(r) || ex(),
      isMobileOnly: U(r),
      isTablet: L(r) || ex(),
      isBrowser: z(r),
      isDesktop: z(r),
      isAndroid: Q(t),
      isWinPhone: X(t),
      isIOS: J(t) || ex(),
      isChrome: er(n),
      isFirefox: en(n),
      isSafari: es(n),
      isOpera: ed(n),
      isIE: el(n),
      osVersion: ee(t),
      osName: ei(t),
      fullBrowserVersion: ew(n),
      browserVersion: em(n),
      browserName: ef(n),
      mobileVendor: H(r),
      mobileModel: $(r),
      engineName: ep(o),
      engineVersion: eh(o),
      getUA: eE(a),
      isEdge: eo(n) || eg(a),
      isYandex: ea(n),
      deviceType: Y(r),
      isIOS13: ey(),
      isIPad13: ex(),
      isIPhone13: ek(),
      isIPod13: eO(),
      isElectron: ev(),
      isEdgeChromium: eg(a),
      isLegacyEdge: eo(n) && !eg(a),
      isWindows: Z(t),
      isMacOs: K(t),
      isMIUI: ec(n),
      isSamsungBrowser: eb(n),
    };
  }
  var eP = q(d),
    eC = R(d),
    eA = D(d),
    e_ = G(d),
    eT = eu(s) || ex(),
    ej = et(s),
    eV = B(d) || ex(),
    eW = U(d),
    eM = L(d) || ex(),
    eF = z(d),
    eI = z(d),
    eN = Q(c),
    eU = X(c),
    eL = J(c) || ex(),
    eB = er(s),
    eq = en(s),
    ez = es(s),
    eD = ed(s),
    eR = el(s),
    eG = ee(c),
    eH = ei(c),
    e$ = ew(s),
    eY = em(s),
    eQ = ef(s),
    eZ = H(d),
    eK = $(d),
    eX = ep(l),
    eJ = eh(l),
    e0 = eE(b),
    e1 = eo(s) || eg(b),
    e2 = ea(s),
    e3 = Y(d),
    e6 = ey(),
    e4 = ex(),
    e5 = ek(),
    e9 = eO(),
    e8 = ev(),
    e7 = eg(b),
    ie = eo(s) && !eg(b),
    ii = Z(c),
    ir = K(c),
    it = ec(s),
    io = eb(s);
  function ia(e) {
    return m(e || window.navigator.userAgent);
  }
  ((r.AndroidView = function (e) {
    var i = e.renderWithFragment,
      r = e.children,
      o = x(e, ["renderWithFragment", "children"]);
    return eN
      ? i
        ? t.createElement(n.Fragment, null, r)
        : t.createElement("div", o, r)
      : null;
  }),
    (r.BrowserTypes = j),
    (r.BrowserView = function (e) {
      var i = e.renderWithFragment,
        r = e.children,
        o = x(e, ["renderWithFragment", "children"]);
      return eF
        ? i
          ? t.createElement(n.Fragment, null, r)
          : t.createElement("div", o, r)
        : null;
    }),
    (r.ConsoleView = function (e) {
      var i = e.renderWithFragment,
        r = e.children,
        o = x(e, ["renderWithFragment", "children"]);
      return eC
        ? i
          ? t.createElement(n.Fragment, null, r)
          : t.createElement("div", o, r)
        : null;
    }),
    (r.CustomView = function (e) {
      var i = e.renderWithFragment,
        r = e.children,
        o = (e.viewClassName, e.style, e.condition),
        a = x(e, [
          "renderWithFragment",
          "children",
          "viewClassName",
          "style",
          "condition",
        ]);
      return o
        ? i
          ? t.createElement(n.Fragment, null, r)
          : t.createElement("div", a, r)
        : null;
    }),
    (r.IEView = function (e) {
      var i = e.renderWithFragment,
        r = e.children,
        o = x(e, ["renderWithFragment", "children"]);
      return eR
        ? i
          ? t.createElement(n.Fragment, null, r)
          : t.createElement("div", o, r)
        : null;
    }),
    (r.IOSView = function (e) {
      var i = e.renderWithFragment,
        r = e.children,
        o = x(e, ["renderWithFragment", "children"]);
      return eL
        ? i
          ? t.createElement(n.Fragment, null, r)
          : t.createElement("div", o, r)
        : null;
    }),
    (r.MobileOnlyView = function (e) {
      var i = e.renderWithFragment,
        r = e.children,
        o =
          (e.viewClassName,
          e.style,
          x(e, ["renderWithFragment", "children", "viewClassName", "style"]));
      return eW
        ? i
          ? t.createElement(n.Fragment, null, r)
          : t.createElement("div", o, r)
        : null;
    }),
    (r.MobileView = function (e) {
      var i = e.renderWithFragment,
        r = e.children,
        o = x(e, ["renderWithFragment", "children"]);
      return eV
        ? i
          ? t.createElement(n.Fragment, null, r)
          : t.createElement("div", o, r)
        : null;
    }),
    (r.OsTypes = V),
    (r.SmartTVView = function (e) {
      var i = e.renderWithFragment,
        r = e.children,
        o = x(e, ["renderWithFragment", "children"]);
      return eP
        ? i
          ? t.createElement(n.Fragment, null, r)
          : t.createElement("div", o, r)
        : null;
    }),
    (r.TabletView = function (e) {
      var i = e.renderWithFragment,
        r = e.children,
        o = x(e, ["renderWithFragment", "children"]);
      return eM
        ? i
          ? t.createElement(n.Fragment, null, r)
          : t.createElement("div", o, r)
        : null;
    }),
    (r.WearableView = function (e) {
      var i = e.renderWithFragment,
        r = e.children,
        o = x(e, ["renderWithFragment", "children"]);
      return eA
        ? i
          ? t.createElement(n.Fragment, null, r)
          : t.createElement("div", o, r)
        : null;
    }),
    (r.WinPhoneView = function (e) {
      var i = e.renderWithFragment,
        r = e.children,
        o = x(e, ["renderWithFragment", "children"]);
      return eU
        ? i
          ? t.createElement(n.Fragment, null, r)
          : t.createElement("div", o, r)
        : null;
    }),
    (r.browserName = eQ),
    (r.browserVersion = eY),
    (r.deviceDetect = function (e) {
      var i,
        r,
        n,
        t,
        o = e ? m(e) : f,
        a = o.device,
        s = o.browser,
        u = o.engine,
        d = o.os,
        l = o.ua,
        c = M(a.type),
        b = c.isBrowser,
        w = c.isMobile,
        h = c.isTablet,
        v = c.isSmartTV,
        g = c.isConsole,
        y = c.isWearable,
        x = c.isEmbedded;
      if (b)
        return {
          isBrowser: b,
          browserMajorVersion: F(s.major),
          browserFullVersion: F(s.version),
          browserName: F(s.name),
          engineName: F(u.name),
          engineVersion: F(u.version),
          osName: F(d.name),
          osVersion: F(d.version),
          userAgent: F(l),
        };
      if (v)
        return {
          isSmartTV: v,
          engineName: F(u.name),
          engineVersion: F(u.version),
          osName: F(d.name),
          osVersion: F(d.version),
          userAgent: F(l),
        };
      if (g)
        return {
          isConsole: g,
          engineName: F(u.name),
          engineVersion: F(u.version),
          osName: F(d.name),
          osVersion: F(d.version),
          userAgent: F(l),
        };
      if (w || h) {
        return (
          (i = c),
          (r = a),
          (n = d),
          (t = l),
          (function (e) {
            for (var i = 1; i < arguments.length; i++) {
              var r = null != arguments[i] ? arguments[i] : {};
              i % 2
                ? p(Object(r), !0).forEach(function (i) {
                    var n, t, o;
                    ((n = e),
                      (t = i),
                      (o = r[i]),
                      t in n
                        ? Object.defineProperty(n, t, {
                            value: o,
                            enumerable: !0,
                            configurable: !0,
                            writable: !0,
                          })
                        : (n[t] = o));
                  })
                : Object.getOwnPropertyDescriptors
                  ? Object.defineProperties(
                      e,
                      Object.getOwnPropertyDescriptors(r),
                    )
                  : p(Object(r)).forEach(function (i) {
                      Object.defineProperty(
                        e,
                        i,
                        Object.getOwnPropertyDescriptor(r, i),
                      );
                    });
            }
            return e;
          })({}, i, {
            vendor: F(r.vendor),
            model: F(r.model),
            os: F(n.name),
            osVersion: F(n.version),
            ua: F(t),
          })
        );
      }
      return y
        ? {
            isWearable: y,
            engineName: F(u.name),
            engineVersion: F(u.version),
            osName: F(d.name),
            osVersion: F(d.version),
            userAgent: F(l),
          }
        : x
          ? {
              isEmbedded: x,
              vendor: F(a.vendor),
              model: F(a.model),
              engineName: F(u.name),
              engineVersion: F(u.version),
              osName: F(d.name),
              osVersion: F(d.version),
              userAgent: F(l),
            }
          : void 0;
    }),
    (r.deviceType = e3),
    (r.engineName = eX),
    (r.engineVersion = eJ),
    (r.fullBrowserVersion = e$),
    (r.getSelectorsByUserAgent = function (e) {
      if (!e || "string" != typeof e)
        return void console.error("No valid user agent string was provided");
      var i = m(e);
      return eS({
        device: i.device,
        browser: i.browser,
        os: i.os,
        engine: i.engine,
        ua: i.ua,
      });
    }),
    (r.getUA = e0),
    (r.isAndroid = eN),
    (r.isBrowser = eF),
    (r.isChrome = eB),
    (r.isChromium = ej),
    (r.isConsole = eC),
    (r.isDesktop = eI),
    (r.isEdge = e1),
    (r.isEdgeChromium = e7),
    (r.isElectron = e8),
    (r.isEmbedded = e_),
    (r.isFirefox = eq),
    (r.isIE = eR),
    (r.isIOS = eL),
    (r.isIOS13 = e6),
    (r.isIPad13 = e4),
    (r.isIPhone13 = e5),
    (r.isIPod13 = e9),
    (r.isLegacyEdge = ie),
    (r.isMIUI = it),
    (r.isMacOs = ir),
    (r.isMobile = eV),
    (r.isMobileOnly = eW),
    (r.isMobileSafari = eT),
    (r.isOpera = eD),
    (r.isSafari = ez),
    (r.isSamsungBrowser = io),
    (r.isSmartTV = eP),
    (r.isTablet = eM),
    (r.isWearable = eA),
    (r.isWinPhone = eU),
    (r.isWindows = ii),
    (r.isYandex = e2),
    (r.mobileModel = eK),
    (r.mobileVendor = eZ),
    (r.osName = eH),
    (r.osVersion = eG),
    (r.parseUserAgent = m),
    (r.setUserAgent = function (e) {
      return w(e);
    }),
    (r.useDeviceData = ia),
    (r.useDeviceSelectors = function (e) {
      var i = ia(e || window.navigator.userAgent);
      return [eS(i), i];
    }),
    (r.useMobileOrientation = function () {
      var e,
        i =
          (function (e) {
            if (Array.isArray(e)) return e;
          })(
            (e = n.useState(function () {
              var e = 90 * (window.innerWidth > window.innerHeight);
              return {
                isPortrait: 0 === e,
                isLandscape: 90 === e,
                orientation: 0 === e ? "portrait" : "landscape",
              };
            })),
          ) ||
          (function (e) {
            var i,
              r,
              n =
                null == e
                  ? null
                  : ("u" > typeof Symbol && e[Symbol.iterator]) ||
                    e["@@iterator"];
            if (null != n) {
              var t = [],
                o = !0,
                a = !1;
              try {
                for (
                  n = n.call(e);
                  !(o = (i = n.next()).done) &&
                  (t.push(i.value), 2 !== t.length);
                  o = !0
                );
              } catch (e) {
                ((a = !0), (r = e));
              } finally {
                try {
                  o || null == n.return || n.return();
                } finally {
                  if (a) throw r;
                }
              }
              return t;
            }
          })(e) ||
          (function (e) {
            if (e) {
              if ("string" == typeof e) return O(e, 2);
              var i = Object.prototype.toString.call(e).slice(8, -1);
              if (
                ("Object" === i && e.constructor && (i = e.constructor.name),
                "Map" === i || "Set" === i)
              )
                return Array.from(e);
              if (
                "Arguments" === i ||
                /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(i)
              )
                return O(e, 2);
            }
          })(e) ||
          (function () {
            throw TypeError(
              "Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.",
            );
          })(),
        r = i[0],
        t = i[1],
        o = n.useCallback(
          function () {
            var e = 90 * (window.innerWidth > window.innerHeight),
              i = {
                isPortrait: 0 === e,
                isLandscape: 90 === e,
                orientation: 0 === e ? "portrait" : "landscape",
              };
            r.orientation !== i.orientation && t(i);
          },
          [r.orientation],
        );
      return (
        n.useEffect(
          function () {
            return (
              ("u" < typeof window ? "undefined" : h(window)) !== void 0 &&
                eV &&
                (o(),
                window.addEventListener("load", o, !1),
                window.addEventListener("resize", o, !1)),
              function () {
                (window.removeEventListener("resize", o, !1),
                  window.removeEventListener("load", o, !1));
              }
            );
          },
          [o],
        ),
        r
      );
    }),
    (r.withOrientationChange = function (e) {
      return (function (i) {
        var r;
        if ("function" != typeof i && null !== i)
          throw TypeError("Super expression must either be null or a function");
        function n(e) {
          var i;
          if (!(this instanceof n))
            throw TypeError("Cannot call a class as a function");
          return (
            ((i = (function (e, i) {
              if (i && ("object" == typeof i || "function" == typeof i))
                return i;
              if (void 0 !== i)
                throw TypeError(
                  "Derived constructors may only return object or undefined",
                );
              return k(e);
            })(this, g(n).call(this, e))).isEventListenerAdded = !1),
            (i.handleOrientationChange = i.handleOrientationChange.bind(k(i))),
            (i.onOrientationChange = i.onOrientationChange.bind(k(i))),
            (i.onPageLoad = i.onPageLoad.bind(k(i))),
            (i.state = { isLandscape: !1, isPortrait: !1 }),
            i
          );
        }
        return (
          (n.prototype = Object.create(i && i.prototype, {
            constructor: { value: n, writable: !0, configurable: !0 },
          })),
          i && y(n, i),
          (r = [
            {
              key: "handleOrientationChange",
              value: function () {
                this.isEventListenerAdded || (this.isEventListenerAdded = !0);
                var e = 90 * (window.innerWidth > window.innerHeight);
                this.setState({ isPortrait: 0 === e, isLandscape: 90 === e });
              },
            },
            {
              key: "onOrientationChange",
              value: function () {
                this.handleOrientationChange();
              },
            },
            {
              key: "onPageLoad",
              value: function () {
                this.handleOrientationChange();
              },
            },
            {
              key: "componentDidMount",
              value: function () {
                ("u" < typeof window ? "undefined" : h(window)) !== void 0 &&
                  eV &&
                  (this.isEventListenerAdded
                    ? window.removeEventListener("load", this.onPageLoad, !1)
                    : (this.handleOrientationChange(),
                      window.addEventListener("load", this.onPageLoad, !1)),
                  window.addEventListener(
                    "resize",
                    this.onOrientationChange,
                    !1,
                  ));
              },
            },
            {
              key: "componentWillUnmount",
              value: function () {
                window.removeEventListener(
                  "resize",
                  this.onOrientationChange,
                  !1,
                );
              },
            },
            {
              key: "render",
              value: function () {
                return t.createElement(
                  e,
                  v({}, this.props, {
                    isLandscape: this.state.isLandscape,
                    isPortrait: this.state.isPortrait,
                  }),
                );
              },
            },
          ]),
          (function (e, i) {
            for (var r = 0; r < i.length; r++) {
              var n = i[r];
              ((n.enumerable = n.enumerable || !1),
                (n.configurable = !0),
                "value" in n && (n.writable = !0),
                Object.defineProperty(e, n.key, n));
            }
          })(n.prototype, r),
          n
        );
      })(t.Component);
    }));
};
