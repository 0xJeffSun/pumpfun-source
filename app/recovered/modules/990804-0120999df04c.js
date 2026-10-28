// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e, t, r) => {
  (e.e,
    (t.exports = (function () {
      var e = {
          17: function (e, t, r) {
            "use strict";
            ((t.__esModule = !0), (t.default = void 0));
            var n = r(18);
            ((t.default = (function () {
              function e() {}
              return (
                (e.getFirstMatch = function (e, t) {
                  var r = t.match(e);
                  return (r && r.length > 0 && r[1]) || "";
                }),
                (e.getSecondMatch = function (e, t) {
                  var r = t.match(e);
                  return (r && r.length > 1 && r[2]) || "";
                }),
                (e.matchAndReturnConst = function (e, t, r) {
                  if (e.test(t)) return r;
                }),
                (e.getWindowsVersionName = function (e) {
                  switch (e) {
                    case "NT":
                      return "NT";
                    case "XP":
                    case "NT 5.1":
                      return "XP";
                    case "NT 5.0":
                      return "2000";
                    case "NT 5.2":
                      return "2003";
                    case "NT 6.0":
                      return "Vista";
                    case "NT 6.1":
                      return "7";
                    case "NT 6.2":
                      return "8";
                    case "NT 6.3":
                      return "8.1";
                    case "NT 10.0":
                      return "10";
                    default:
                      return;
                  }
                }),
                (e.getMacOSVersionName = function (e) {
                  var t = e
                    .split(".")
                    .splice(0, 2)
                    .map(function (e) {
                      return parseInt(e, 10) || 0;
                    });
                  t.push(0);
                  var r = t[0],
                    n = t[1];
                  if (10 === r)
                    switch (n) {
                      case 5:
                        return "Leopard";
                      case 6:
                        return "Snow Leopard";
                      case 7:
                        return "Lion";
                      case 8:
                        return "Mountain Lion";
                      case 9:
                        return "Mavericks";
                      case 10:
                        return "Yosemite";
                      case 11:
                        return "El Capitan";
                      case 12:
                        return "Sierra";
                      case 13:
                        return "High Sierra";
                      case 14:
                        return "Mojave";
                      case 15:
                        return "Catalina";
                      default:
                        return;
                    }
                  switch (r) {
                    case 11:
                      return "Big Sur";
                    case 12:
                      return "Monterey";
                    case 13:
                      return "Ventura";
                    case 14:
                      return "Sonoma";
                    case 15:
                      return "Sequoia";
                    default:
                      return;
                  }
                }),
                (e.getAndroidVersionName = function (e) {
                  var t = e
                    .split(".")
                    .splice(0, 2)
                    .map(function (e) {
                      return parseInt(e, 10) || 0;
                    });
                  if ((t.push(0), !(1 === t[0] && t[1] < 5)))
                    return 1 === t[0] && t[1] < 6
                      ? "Cupcake"
                      : 1 === t[0] && t[1] >= 6
                        ? "Donut"
                        : 2 === t[0] && t[1] < 2
                          ? "Eclair"
                          : 2 === t[0] && 2 === t[1]
                            ? "Froyo"
                            : 2 === t[0] && t[1] > 2
                              ? "Gingerbread"
                              : 3 === t[0]
                                ? "Honeycomb"
                                : 4 === t[0] && t[1] < 1
                                  ? "Ice Cream Sandwich"
                                  : 4 === t[0] && t[1] < 4
                                    ? "Jelly Bean"
                                    : 4 === t[0] && t[1] >= 4
                                      ? "KitKat"
                                      : 5 === t[0]
                                        ? "Lollipop"
                                        : 6 === t[0]
                                          ? "Marshmallow"
                                          : 7 === t[0]
                                            ? "Nougat"
                                            : 8 === t[0]
                                              ? "Oreo"
                                              : 9 === t[0]
                                                ? "Pie"
                                                : void 0;
                }),
                (e.getVersionPrecision = function (e) {
                  return e.split(".").length;
                }),
                (e.compareVersions = function (t, r, n) {
                  void 0 === n && (n = !1);
                  var i = e.getVersionPrecision(t),
                    o = e.getVersionPrecision(r),
                    a = Math.max(i, o),
                    s = 0,
                    l = e.map([t, r], function (t) {
                      var r = a - e.getVersionPrecision(t),
                        n = t + Array(r + 1).join(".0");
                      return e
                        .map(n.split("."), function (e) {
                          return Array(20 - e.length).join("0") + e;
                        })
                        .reverse();
                    });
                  for (n && (s = a - Math.min(i, o)), a -= 1; a >= s; ) {
                    if (l[0][a] > l[1][a]) return 1;
                    if (l[0][a] === l[1][a]) {
                      if (a === s) return 0;
                      a -= 1;
                    } else if (l[0][a] < l[1][a]) return -1;
                  }
                }),
                (e.map = function (e, t) {
                  var r,
                    n = [];
                  if (Array.prototype.map)
                    return Array.prototype.map.call(e, t);
                  for (r = 0; r < e.length; r += 1) n.push(t(e[r]));
                  return n;
                }),
                (e.find = function (e, t) {
                  var r, n;
                  if (Array.prototype.find)
                    return Array.prototype.find.call(e, t);
                  for (r = 0, n = e.length; r < n; r += 1) {
                    var i = e[r];
                    if (t(i, r)) return i;
                  }
                }),
                (e.assign = function (e) {
                  for (
                    var t = arguments.length,
                      r = Array(t > 1 ? t - 1 : 0),
                      n = 1;
                    n < t;
                    n++
                  )
                    r[n - 1] = arguments[n];
                  return Object.assign.apply(Object, [e].concat(r));
                }),
                (e.getBrowserAlias = function (e) {
                  return n.BROWSER_ALIASES_MAP[e];
                }),
                (e.getBrowserTypeByAlias = function (e) {
                  return n.BROWSER_MAP[e] || "";
                }),
                e
              );
            })()),
              (e.exports = t.default));
          },
          18: function (e, t, r) {
            "use strict";
            ((t.__esModule = !0),
              (t.ENGINE_MAP =
                t.OS_MAP =
                t.PLATFORMS_MAP =
                t.BROWSER_MAP =
                t.BROWSER_ALIASES_MAP =
                  void 0),
              (t.BROWSER_ALIASES_MAP = {
                AmazonBot: "amazonbot",
                "Amazon Silk": "amazon_silk",
                "Android Browser": "android",
                BaiduSpider: "baiduspider",
                Bada: "bada",
                BingCrawler: "bingcrawler",
                BlackBerry: "blackberry",
                "ChatGPT-User": "chatgpt_user",
                Chrome: "chrome",
                ClaudeBot: "claudebot",
                Chromium: "chromium",
                Diffbot: "diffbot",
                DuckDuckBot: "duckduckbot",
                Electron: "electron",
                Epiphany: "epiphany",
                FacebookExternalHit: "facebookexternalhit",
                Firefox: "firefox",
                Focus: "focus",
                Generic: "generic",
                "Google Search": "google_search",
                Googlebot: "googlebot",
                GPTBot: "gptbot",
                "Internet Explorer": "ie",
                InternetArchiveCrawler: "internetarchivecrawler",
                "K-Meleon": "k_meleon",
                LibreWolf: "librewolf",
                Maxthon: "maxthon",
                "Meta-ExternalAds": "meta_externalads",
                "Meta-ExternalAgent": "meta_externalagent",
                "Meta-ExternalFetcher": "meta_externalfetcher",
                "Meta-WebIndexer": "meta_webindexer",
                "Microsoft Edge": "edge",
                "MZ Browser": "mz",
                "NAVER Whale Browser": "naver",
                "OAI-SearchBot": "oai_searchbot",
                Omgilibot: "omgilibot",
                Opera: "opera",
                "Opera Coast": "opera_coast",
                "Pale Moon": "pale_moon",
                PerplexityBot: "perplexitybot",
                "Perplexity-User": "perplexity_user",
                PhantomJS: "phantomjs",
                PingdomBot: "pingdombot",
                Puffin: "puffin",
                QQ: "qq",
                QQLite: "qqlite",
                QupZilla: "qupzilla",
                Roku: "roku",
                Safari: "safari",
                Sailfish: "sailfish",
                "Samsung Internet for Android": "samsung_internet",
                SeaMonkey: "seamonkey",
                Sleipnir: "sleipnir",
                "Sogou Browser": "sogou",
                Swing: "swing",
                Tizen: "tizen",
                "UC Browser": "uc",
                Vivaldi: "vivaldi",
                "WebOS Browser": "webos",
                WeChat: "wechat",
                YahooSlurp: "yahooslurp",
                "Yandex Browser": "yandex",
                YandexBot: "yandexbot",
                YouBot: "youbot",
              }),
              (t.BROWSER_MAP = {
                amazonbot: "AmazonBot",
                amazon_silk: "Amazon Silk",
                android: "Android Browser",
                baiduspider: "BaiduSpider",
                bada: "Bada",
                bingcrawler: "BingCrawler",
                blackberry: "BlackBerry",
                chatgpt_user: "ChatGPT-User",
                chrome: "Chrome",
                claudebot: "ClaudeBot",
                chromium: "Chromium",
                diffbot: "Diffbot",
                duckduckbot: "DuckDuckBot",
                edge: "Microsoft Edge",
                electron: "Electron",
                epiphany: "Epiphany",
                facebookexternalhit: "FacebookExternalHit",
                firefox: "Firefox",
                focus: "Focus",
                generic: "Generic",
                google_search: "Google Search",
                googlebot: "Googlebot",
                gptbot: "GPTBot",
                ie: "Internet Explorer",
                internetarchivecrawler: "InternetArchiveCrawler",
                k_meleon: "K-Meleon",
                librewolf: "LibreWolf",
                maxthon: "Maxthon",
                meta_externalads: "Meta-ExternalAds",
                meta_externalagent: "Meta-ExternalAgent",
                meta_externalfetcher: "Meta-ExternalFetcher",
                meta_webindexer: "Meta-WebIndexer",
                mz: "MZ Browser",
                naver: "NAVER Whale Browser",
                oai_searchbot: "OAI-SearchBot",
                omgilibot: "Omgilibot",
                opera: "Opera",
                opera_coast: "Opera Coast",
                pale_moon: "Pale Moon",
                perplexitybot: "PerplexityBot",
                perplexity_user: "Perplexity-User",
                phantomjs: "PhantomJS",
                pingdombot: "PingdomBot",
                puffin: "Puffin",
                qq: "QQ Browser",
                qqlite: "QQ Browser Lite",
                qupzilla: "QupZilla",
                roku: "Roku",
                safari: "Safari",
                sailfish: "Sailfish",
                samsung_internet: "Samsung Internet for Android",
                seamonkey: "SeaMonkey",
                sleipnir: "Sleipnir",
                sogou: "Sogou Browser",
                swing: "Swing",
                tizen: "Tizen",
                uc: "UC Browser",
                vivaldi: "Vivaldi",
                webos: "WebOS Browser",
                wechat: "WeChat",
                yahooslurp: "YahooSlurp",
                yandex: "Yandex Browser",
                yandexbot: "YandexBot",
                youbot: "YouBot",
              }),
              (t.PLATFORMS_MAP = {
                bot: "bot",
                desktop: "desktop",
                mobile: "mobile",
                tablet: "tablet",
                tv: "tv",
              }),
              (t.OS_MAP = {
                Android: "Android",
                Bada: "Bada",
                BlackBerry: "BlackBerry",
                ChromeOS: "Chrome OS",
                HarmonyOS: "HarmonyOS",
                iOS: "iOS",
                Linux: "Linux",
                MacOS: "macOS",
                PlayStation4: "PlayStation 4",
                Roku: "Roku",
                Tizen: "Tizen",
                WebOS: "WebOS",
                Windows: "Windows",
                WindowsPhone: "Windows Phone",
              }),
              (t.ENGINE_MAP = {
                Blink: "Blink",
                EdgeHTML: "EdgeHTML",
                Gecko: "Gecko",
                Presto: "Presto",
                Trident: "Trident",
                WebKit: "WebKit",
              }));
          },
          90: function (e, t, r) {
            "use strict";
            ((t.__esModule = !0), (t.default = void 0));
            var n,
              i = (n = r(91)) && n.__esModule ? n : { default: n },
              o = r(18);
            ((t.default = (function () {
              function e() {}
              return (
                (e.getParser = function (e, t) {
                  if ((void 0 === t && (t = !1), "string" != typeof e))
                    throw Error("UserAgent should be a string");
                  return new i.default(e, t);
                }),
                (e.parse = function (e) {
                  return new i.default(e).getResult();
                }),
                (function (e, t) {
                  for (var r = 0; r < t.length; r++) {
                    var n = t[r];
                    ((n.enumerable = n.enumerable || !1),
                      (n.configurable = !0),
                      "value" in n && (n.writable = !0),
                      Object.defineProperty(e, n.key, n));
                  }
                })(e, [
                  {
                    key: "BROWSER_MAP",
                    get: function () {
                      return o.BROWSER_MAP;
                    },
                  },
                  {
                    key: "ENGINE_MAP",
                    get: function () {
                      return o.ENGINE_MAP;
                    },
                  },
                  {
                    key: "OS_MAP",
                    get: function () {
                      return o.OS_MAP;
                    },
                  },
                  {
                    key: "PLATFORMS_MAP",
                    get: function () {
                      return o.PLATFORMS_MAP;
                    },
                  },
                ]),
                e
              );
            })()),
              (e.exports = t.default));
          },
          91: function (e, t, r) {
            "use strict";
            ((t.__esModule = !0), (t.default = void 0));
            var n = l(r(92)),
              i = l(r(93)),
              o = l(r(94)),
              a = l(r(95)),
              s = l(r(17));
            function l(e) {
              return e && e.__esModule ? e : { default: e };
            }
            ((t.default = (function () {
              function e(e, t) {
                if ((void 0 === t && (t = !1), null == e || "" === e))
                  throw Error("UserAgent parameter can't be empty");
                ((this._ua = e),
                  (this.parsedResult = {}),
                  !0 !== t && this.parse());
              }
              var t = e.prototype;
              return (
                (t.getUA = function () {
                  return this._ua;
                }),
                (t.test = function (e) {
                  return e.test(this._ua);
                }),
                (t.parseBrowser = function () {
                  var e = this;
                  this.parsedResult.browser = {};
                  var t = s.default.find(n.default, function (t) {
                    if ("function" == typeof t.test) return t.test(e);
                    if (Array.isArray(t.test))
                      return t.test.some(function (t) {
                        return e.test(t);
                      });
                    throw Error("Browser's test function is not valid");
                  });
                  return (
                    t && (this.parsedResult.browser = t.describe(this.getUA())),
                    this.parsedResult.browser
                  );
                }),
                (t.getBrowser = function () {
                  return this.parsedResult.browser
                    ? this.parsedResult.browser
                    : this.parseBrowser();
                }),
                (t.getBrowserName = function (e) {
                  return e
                    ? String(this.getBrowser().name).toLowerCase() || ""
                    : this.getBrowser().name || "";
                }),
                (t.getBrowserVersion = function () {
                  return this.getBrowser().version;
                }),
                (t.getOS = function () {
                  return this.parsedResult.os
                    ? this.parsedResult.os
                    : this.parseOS();
                }),
                (t.parseOS = function () {
                  var e = this;
                  this.parsedResult.os = {};
                  var t = s.default.find(i.default, function (t) {
                    if ("function" == typeof t.test) return t.test(e);
                    if (Array.isArray(t.test))
                      return t.test.some(function (t) {
                        return e.test(t);
                      });
                    throw Error("Browser's test function is not valid");
                  });
                  return (
                    t && (this.parsedResult.os = t.describe(this.getUA())),
                    this.parsedResult.os
                  );
                }),
                (t.getOSName = function (e) {
                  var t = this.getOS().name;
                  return e ? String(t).toLowerCase() || "" : t || "";
                }),
                (t.getOSVersion = function () {
                  return this.getOS().version;
                }),
                (t.getPlatform = function () {
                  return this.parsedResult.platform
                    ? this.parsedResult.platform
                    : this.parsePlatform();
                }),
                (t.getPlatformType = function (e) {
                  void 0 === e && (e = !1);
                  var t = this.getPlatform().type;
                  return e ? String(t).toLowerCase() || "" : t || "";
                }),
                (t.parsePlatform = function () {
                  var e = this;
                  this.parsedResult.platform = {};
                  var t = s.default.find(o.default, function (t) {
                    if ("function" == typeof t.test) return t.test(e);
                    if (Array.isArray(t.test))
                      return t.test.some(function (t) {
                        return e.test(t);
                      });
                    throw Error("Browser's test function is not valid");
                  });
                  return (
                    t &&
                      (this.parsedResult.platform = t.describe(this.getUA())),
                    this.parsedResult.platform
                  );
                }),
                (t.getEngine = function () {
                  return this.parsedResult.engine
                    ? this.parsedResult.engine
                    : this.parseEngine();
                }),
                (t.getEngineName = function (e) {
                  return e
                    ? String(this.getEngine().name).toLowerCase() || ""
                    : this.getEngine().name || "";
                }),
                (t.parseEngine = function () {
                  var e = this;
                  this.parsedResult.engine = {};
                  var t = s.default.find(a.default, function (t) {
                    if ("function" == typeof t.test) return t.test(e);
                    if (Array.isArray(t.test))
                      return t.test.some(function (t) {
                        return e.test(t);
                      });
                    throw Error("Browser's test function is not valid");
                  });
                  return (
                    t && (this.parsedResult.engine = t.describe(this.getUA())),
                    this.parsedResult.engine
                  );
                }),
                (t.parse = function () {
                  return (
                    this.parseBrowser(),
                    this.parseOS(),
                    this.parsePlatform(),
                    this.parseEngine(),
                    this
                  );
                }),
                (t.getResult = function () {
                  return s.default.assign({}, this.parsedResult);
                }),
                (t.satisfies = function (e) {
                  var t = this,
                    r = {},
                    n = 0,
                    i = {},
                    o = 0;
                  if (
                    (Object.keys(e).forEach(function (t) {
                      var a = e[t];
                      "string" == typeof a
                        ? ((i[t] = a), (o += 1))
                        : "object" == typeof a && ((r[t] = a), (n += 1));
                    }),
                    n > 0)
                  ) {
                    var a = Object.keys(r),
                      l = s.default.find(a, function (e) {
                        return t.isOS(e);
                      });
                    if (l) {
                      var u = this.satisfies(r[l]);
                      if (void 0 !== u) return u;
                    }
                    var d = s.default.find(a, function (e) {
                      return t.isPlatform(e);
                    });
                    if (d) {
                      var c = this.satisfies(r[d]);
                      if (void 0 !== c) return c;
                    }
                  }
                  if (o > 0) {
                    var f = Object.keys(i),
                      h = s.default.find(f, function (e) {
                        return t.isBrowser(e, !0);
                      });
                    if (void 0 !== h) return this.compareVersion(i[h]);
                  }
                }),
                (t.isBrowser = function (e, t) {
                  void 0 === t && (t = !1);
                  var r = this.getBrowserName().toLowerCase(),
                    n = e.toLowerCase(),
                    i = s.default.getBrowserTypeByAlias(n);
                  return (t && i && (n = i.toLowerCase()), n === r);
                }),
                (t.compareVersion = function (e) {
                  var t = [0],
                    r = e,
                    n = !1,
                    i = this.getBrowserVersion();
                  if ("string" == typeof i)
                    return (
                      ">" === e[0] || "<" === e[0]
                        ? ((r = e.substr(1)),
                          "=" === e[1]
                            ? ((n = !0), (r = e.substr(2)))
                            : (t = []),
                          ">" === e[0] ? t.push(1) : t.push(-1))
                        : "=" === e[0]
                          ? (r = e.substr(1))
                          : "~" === e[0] && ((n = !0), (r = e.substr(1))),
                      t.indexOf(s.default.compareVersions(i, r, n)) > -1
                    );
                }),
                (t.isOS = function (e) {
                  return this.getOSName(!0) === String(e).toLowerCase();
                }),
                (t.isPlatform = function (e) {
                  return this.getPlatformType(!0) === String(e).toLowerCase();
                }),
                (t.isEngine = function (e) {
                  return this.getEngineName(!0) === String(e).toLowerCase();
                }),
                (t.is = function (e, t) {
                  return (
                    void 0 === t && (t = !1),
                    this.isBrowser(e, t) || this.isOS(e) || this.isPlatform(e)
                  );
                }),
                (t.some = function (e) {
                  var t = this;
                  return (
                    void 0 === e && (e = []),
                    e.some(function (e) {
                      return t.is(e);
                    })
                  );
                }),
                e
              );
            })()),
              (e.exports = t.default));
          },
          92: function (e, t, r) {
            "use strict";
            ((t.__esModule = !0), (t.default = void 0));
            var n,
              i = (n = r(17)) && n.__esModule ? n : { default: n },
              o = /version\/(\d+(\.?_?\d+)+)/i;
            ((t.default = [
              {
                test: [/gptbot/i],
                describe: function (e) {
                  var t = { name: "GPTBot" },
                    r =
                      i.default.getFirstMatch(/gptbot\/(\d+(\.\d+)+)/i, e) ||
                      i.default.getFirstMatch(o, e);
                  return (r && (t.version = r), t);
                },
              },
              {
                test: [/chatgpt-user/i],
                describe: function (e) {
                  var t = { name: "ChatGPT-User" },
                    r =
                      i.default.getFirstMatch(
                        /chatgpt-user\/(\d+(\.\d+)+)/i,
                        e,
                      ) || i.default.getFirstMatch(o, e);
                  return (r && (t.version = r), t);
                },
              },
              {
                test: [/oai-searchbot/i],
                describe: function (e) {
                  var t = { name: "OAI-SearchBot" },
                    r =
                      i.default.getFirstMatch(
                        /oai-searchbot\/(\d+(\.\d+)+)/i,
                        e,
                      ) || i.default.getFirstMatch(o, e);
                  return (r && (t.version = r), t);
                },
              },
              {
                test: [
                  /claudebot/i,
                  /claude-web/i,
                  /claude-user/i,
                  /claude-searchbot/i,
                ],
                describe: function (e) {
                  var t = { name: "ClaudeBot" },
                    r =
                      i.default.getFirstMatch(
                        /(?:claudebot|claude-web|claude-user|claude-searchbot)\/(\d+(\.\d+)+)/i,
                        e,
                      ) || i.default.getFirstMatch(o, e);
                  return (r && (t.version = r), t);
                },
              },
              {
                test: [/omgilibot/i, /webzio-extended/i],
                describe: function (e) {
                  var t = { name: "Omgilibot" },
                    r =
                      i.default.getFirstMatch(
                        /(?:omgilibot|webzio-extended)\/(\d+(\.\d+)+)/i,
                        e,
                      ) || i.default.getFirstMatch(o, e);
                  return (r && (t.version = r), t);
                },
              },
              {
                test: [/diffbot/i],
                describe: function (e) {
                  var t = { name: "Diffbot" },
                    r =
                      i.default.getFirstMatch(/diffbot\/(\d+(\.\d+)+)/i, e) ||
                      i.default.getFirstMatch(o, e);
                  return (r && (t.version = r), t);
                },
              },
              {
                test: [/perplexitybot/i],
                describe: function (e) {
                  var t = { name: "PerplexityBot" },
                    r =
                      i.default.getFirstMatch(
                        /perplexitybot\/(\d+(\.\d+)+)/i,
                        e,
                      ) || i.default.getFirstMatch(o, e);
                  return (r && (t.version = r), t);
                },
              },
              {
                test: [/perplexity-user/i],
                describe: function (e) {
                  var t = { name: "Perplexity-User" },
                    r =
                      i.default.getFirstMatch(
                        /perplexity-user\/(\d+(\.\d+)+)/i,
                        e,
                      ) || i.default.getFirstMatch(o, e);
                  return (r && (t.version = r), t);
                },
              },
              {
                test: [/youbot/i],
                describe: function (e) {
                  var t = { name: "YouBot" },
                    r =
                      i.default.getFirstMatch(/youbot\/(\d+(\.\d+)+)/i, e) ||
                      i.default.getFirstMatch(o, e);
                  return (r && (t.version = r), t);
                },
              },
              {
                test: [/meta-webindexer/i],
                describe: function (e) {
                  var t = { name: "Meta-WebIndexer" },
                    r =
                      i.default.getFirstMatch(
                        /meta-webindexer\/(\d+(\.\d+)+)/i,
                        e,
                      ) || i.default.getFirstMatch(o, e);
                  return (r && (t.version = r), t);
                },
              },
              {
                test: [/meta-externalads/i],
                describe: function (e) {
                  var t = { name: "Meta-ExternalAds" },
                    r =
                      i.default.getFirstMatch(
                        /meta-externalads\/(\d+(\.\d+)+)/i,
                        e,
                      ) || i.default.getFirstMatch(o, e);
                  return (r && (t.version = r), t);
                },
              },
              {
                test: [/meta-externalagent/i],
                describe: function (e) {
                  var t = { name: "Meta-ExternalAgent" },
                    r =
                      i.default.getFirstMatch(
                        /meta-externalagent\/(\d+(\.\d+)+)/i,
                        e,
                      ) || i.default.getFirstMatch(o, e);
                  return (r && (t.version = r), t);
                },
              },
              {
                test: [/meta-externalfetcher/i],
                describe: function (e) {
                  var t = { name: "Meta-ExternalFetcher" },
                    r =
                      i.default.getFirstMatch(
                        /meta-externalfetcher\/(\d+(\.\d+)+)/i,
                        e,
                      ) || i.default.getFirstMatch(o, e);
                  return (r && (t.version = r), t);
                },
              },
              {
                test: [/googlebot/i],
                describe: function (e) {
                  var t = { name: "Googlebot" },
                    r =
                      i.default.getFirstMatch(/googlebot\/(\d+(\.\d+))/i, e) ||
                      i.default.getFirstMatch(o, e);
                  return (r && (t.version = r), t);
                },
              },
              {
                test: [/amazonbot/i],
                describe: function (e) {
                  var t = { name: "AmazonBot" },
                    r =
                      i.default.getFirstMatch(/amazonbot\/(\d+(\.\d+)+)/i, e) ||
                      i.default.getFirstMatch(o, e);
                  return (r && (t.version = r), t);
                },
              },
              {
                test: [/bingbot/i],
                describe: function (e) {
                  var t = { name: "BingCrawler" },
                    r =
                      i.default.getFirstMatch(/bingbot\/(\d+(\.\d+)+)/i, e) ||
                      i.default.getFirstMatch(o, e);
                  return (r && (t.version = r), t);
                },
              },
              {
                test: [/baiduspider/i],
                describe: function (e) {
                  var t = { name: "BaiduSpider" },
                    r =
                      i.default.getFirstMatch(
                        /baiduspider\/(\d+(\.\d+)+)/i,
                        e,
                      ) || i.default.getFirstMatch(o, e);
                  return (r && (t.version = r), t);
                },
              },
              {
                test: [/duckduckbot/i],
                describe: function (e) {
                  var t = { name: "DuckDuckBot" },
                    r =
                      i.default.getFirstMatch(
                        /duckduckbot\/(\d+(\.\d+)+)/i,
                        e,
                      ) || i.default.getFirstMatch(o, e);
                  return (r && (t.version = r), t);
                },
              },
              {
                test: [/ia_archiver/i],
                describe: function (e) {
                  var t = { name: "InternetArchiveCrawler" },
                    r =
                      i.default.getFirstMatch(
                        /ia_archiver\/(\d+(\.\d+)+)/i,
                        e,
                      ) || i.default.getFirstMatch(o, e);
                  return (r && (t.version = r), t);
                },
              },
              {
                test: [/facebookexternalhit/i, /facebookcatalog/i],
                describe: function () {
                  return { name: "FacebookExternalHit" };
                },
              },
              {
                test: [/yahoo!?[\s/]*slurp/i],
                describe: function () {
                  return { name: "YahooSlurp" };
                },
              },
              {
                test: [/yandexbot/i, /yandexmobilebot/i],
                describe: function () {
                  return { name: "YandexBot" };
                },
              },
              {
                test: [/pingdom/i],
                describe: function () {
                  return { name: "PingdomBot" };
                },
              },
              {
                test: [/opera/i],
                describe: function (e) {
                  var t = { name: "Opera" },
                    r =
                      i.default.getFirstMatch(o, e) ||
                      i.default.getFirstMatch(
                        /(?:opera)[\s/](\d+(\.?_?\d+)+)/i,
                        e,
                      );
                  return (r && (t.version = r), t);
                },
              },
              {
                test: [/opr\/|opios/i],
                describe: function (e) {
                  var t = { name: "Opera" },
                    r =
                      i.default.getFirstMatch(/(?:opr|opios)[\s/](\S+)/i, e) ||
                      i.default.getFirstMatch(o, e);
                  return (r && (t.version = r), t);
                },
              },
              {
                test: [/SamsungBrowser/i],
                describe: function (e) {
                  var t = { name: "Samsung Internet for Android" },
                    r =
                      i.default.getFirstMatch(o, e) ||
                      i.default.getFirstMatch(
                        /(?:SamsungBrowser)[\s/](\d+(\.?_?\d+)+)/i,
                        e,
                      );
                  return (r && (t.version = r), t);
                },
              },
              {
                test: [/Whale/i],
                describe: function (e) {
                  var t = { name: "NAVER Whale Browser" },
                    r =
                      i.default.getFirstMatch(o, e) ||
                      i.default.getFirstMatch(
                        /(?:whale)[\s/](\d+(?:\.\d+)+)/i,
                        e,
                      );
                  return (r && (t.version = r), t);
                },
              },
              {
                test: [/PaleMoon/i],
                describe: function (e) {
                  var t = { name: "Pale Moon" },
                    r =
                      i.default.getFirstMatch(o, e) ||
                      i.default.getFirstMatch(
                        /(?:PaleMoon)[\s/](\d+(?:\.\d+)+)/i,
                        e,
                      );
                  return (r && (t.version = r), t);
                },
              },
              {
                test: [/MZBrowser/i],
                describe: function (e) {
                  var t = { name: "MZ Browser" },
                    r =
                      i.default.getFirstMatch(
                        /(?:MZBrowser)[\s/](\d+(?:\.\d+)+)/i,
                        e,
                      ) || i.default.getFirstMatch(o, e);
                  return (r && (t.version = r), t);
                },
              },
              {
                test: [/focus/i],
                describe: function (e) {
                  var t = { name: "Focus" },
                    r =
                      i.default.getFirstMatch(
                        /(?:focus)[\s/](\d+(?:\.\d+)+)/i,
                        e,
                      ) || i.default.getFirstMatch(o, e);
                  return (r && (t.version = r), t);
                },
              },
              {
                test: [/swing/i],
                describe: function (e) {
                  var t = { name: "Swing" },
                    r =
                      i.default.getFirstMatch(
                        /(?:swing)[\s/](\d+(?:\.\d+)+)/i,
                        e,
                      ) || i.default.getFirstMatch(o, e);
                  return (r && (t.version = r), t);
                },
              },
              {
                test: [/coast/i],
                describe: function (e) {
                  var t = { name: "Opera Coast" },
                    r =
                      i.default.getFirstMatch(o, e) ||
                      i.default.getFirstMatch(
                        /(?:coast)[\s/](\d+(\.?_?\d+)+)/i,
                        e,
                      );
                  return (r && (t.version = r), t);
                },
              },
              {
                test: [/opt\/\d+(?:.?_?\d+)+/i],
                describe: function (e) {
                  var t = { name: "Opera Touch" },
                    r =
                      i.default.getFirstMatch(
                        /(?:opt)[\s/](\d+(\.?_?\d+)+)/i,
                        e,
                      ) || i.default.getFirstMatch(o, e);
                  return (r && (t.version = r), t);
                },
              },
              {
                test: [/yabrowser/i],
                describe: function (e) {
                  var t = { name: "Yandex Browser" },
                    r =
                      i.default.getFirstMatch(
                        /(?:yabrowser)[\s/](\d+(\.?_?\d+)+)/i,
                        e,
                      ) || i.default.getFirstMatch(o, e);
                  return (r && (t.version = r), t);
                },
              },
              {
                test: [/ucbrowser/i],
                describe: function (e) {
                  var t = { name: "UC Browser" },
                    r =
                      i.default.getFirstMatch(o, e) ||
                      i.default.getFirstMatch(
                        /(?:ucbrowser)[\s/](\d+(\.?_?\d+)+)/i,
                        e,
                      );
                  return (r && (t.version = r), t);
                },
              },
              {
                test: [/Maxthon|mxios/i],
                describe: function (e) {
                  var t = { name: "Maxthon" },
                    r =
                      i.default.getFirstMatch(o, e) ||
                      i.default.getFirstMatch(
                        /(?:Maxthon|mxios)[\s/](\d+(\.?_?\d+)+)/i,
                        e,
                      );
                  return (r && (t.version = r), t);
                },
              },
              {
                test: [/epiphany/i],
                describe: function (e) {
                  var t = { name: "Epiphany" },
                    r =
                      i.default.getFirstMatch(o, e) ||
                      i.default.getFirstMatch(
                        /(?:epiphany)[\s/](\d+(\.?_?\d+)+)/i,
                        e,
                      );
                  return (r && (t.version = r), t);
                },
              },
              {
                test: [/puffin/i],
                describe: function (e) {
                  var t = { name: "Puffin" },
                    r =
                      i.default.getFirstMatch(o, e) ||
                      i.default.getFirstMatch(
                        /(?:puffin)[\s/](\d+(\.?_?\d+)+)/i,
                        e,
                      );
                  return (r && (t.version = r), t);
                },
              },
              {
                test: [/sleipnir/i],
                describe: function (e) {
                  var t = { name: "Sleipnir" },
                    r =
                      i.default.getFirstMatch(o, e) ||
                      i.default.getFirstMatch(
                        /(?:sleipnir)[\s/](\d+(\.?_?\d+)+)/i,
                        e,
                      );
                  return (r && (t.version = r), t);
                },
              },
              {
                test: [/k-meleon/i],
                describe: function (e) {
                  var t = { name: "K-Meleon" },
                    r =
                      i.default.getFirstMatch(o, e) ||
                      i.default.getFirstMatch(
                        /(?:k-meleon)[\s/](\d+(\.?_?\d+)+)/i,
                        e,
                      );
                  return (r && (t.version = r), t);
                },
              },
              {
                test: [/micromessenger/i],
                describe: function (e) {
                  var t = { name: "WeChat" },
                    r =
                      i.default.getFirstMatch(
                        /(?:micromessenger)[\s/](\d+(\.?_?\d+)+)/i,
                        e,
                      ) || i.default.getFirstMatch(o, e);
                  return (r && (t.version = r), t);
                },
              },
              {
                test: [/qqbrowser/i],
                describe: function (e) {
                  var t = {
                      name: /qqbrowserlite/i.test(e)
                        ? "QQ Browser Lite"
                        : "QQ Browser",
                    },
                    r =
                      i.default.getFirstMatch(
                        /(?:qqbrowserlite|qqbrowser)[/](\d+(\.?_?\d+)+)/i,
                        e,
                      ) || i.default.getFirstMatch(o, e);
                  return (r && (t.version = r), t);
                },
              },
              {
                test: [/msie|trident/i],
                describe: function (e) {
                  var t = { name: "Internet Explorer" },
                    r = i.default.getFirstMatch(
                      /(?:msie |rv:)(\d+(\.?_?\d+)+)/i,
                      e,
                    );
                  return (r && (t.version = r), t);
                },
              },
              {
                test: [/\sedg\//i],
                describe: function (e) {
                  var t = { name: "Microsoft Edge" },
                    r = i.default.getFirstMatch(/\sedg\/(\d+(\.?_?\d+)+)/i, e);
                  return (r && (t.version = r), t);
                },
              },
              {
                test: [/edg([ea]|ios)/i],
                describe: function (e) {
                  var t = { name: "Microsoft Edge" },
                    r = i.default.getSecondMatch(
                      /edg([ea]|ios)\/(\d+(\.?_?\d+)+)/i,
                      e,
                    );
                  return (r && (t.version = r), t);
                },
              },
              {
                test: [/vivaldi/i],
                describe: function (e) {
                  var t = { name: "Vivaldi" },
                    r = i.default.getFirstMatch(
                      /vivaldi\/(\d+(\.?_?\d+)+)/i,
                      e,
                    );
                  return (r && (t.version = r), t);
                },
              },
              {
                test: [/seamonkey/i],
                describe: function (e) {
                  var t = { name: "SeaMonkey" },
                    r = i.default.getFirstMatch(
                      /seamonkey\/(\d+(\.?_?\d+)+)/i,
                      e,
                    );
                  return (r && (t.version = r), t);
                },
              },
              {
                test: [/sailfish/i],
                describe: function (e) {
                  var t = { name: "Sailfish" },
                    r = i.default.getFirstMatch(
                      /sailfish\s?browser\/(\d+(\.\d+)?)/i,
                      e,
                    );
                  return (r && (t.version = r), t);
                },
              },
              {
                test: [/silk/i],
                describe: function (e) {
                  var t = { name: "Amazon Silk" },
                    r = i.default.getFirstMatch(/silk\/(\d+(\.?_?\d+)+)/i, e);
                  return (r && (t.version = r), t);
                },
              },
              {
                test: [/phantom/i],
                describe: function (e) {
                  var t = { name: "PhantomJS" },
                    r = i.default.getFirstMatch(
                      /phantomjs\/(\d+(\.?_?\d+)+)/i,
                      e,
                    );
                  return (r && (t.version = r), t);
                },
              },
              {
                test: [/slimerjs/i],
                describe: function (e) {
                  var t = { name: "SlimerJS" },
                    r = i.default.getFirstMatch(
                      /slimerjs\/(\d+(\.?_?\d+)+)/i,
                      e,
                    );
                  return (r && (t.version = r), t);
                },
              },
              {
                test: [/blackberry|\bbb\d+/i, /rim\stablet/i],
                describe: function (e) {
                  var t = { name: "BlackBerry" },
                    r =
                      i.default.getFirstMatch(o, e) ||
                      i.default.getFirstMatch(
                        /blackberry[\d]+\/(\d+(\.?_?\d+)+)/i,
                        e,
                      );
                  return (r && (t.version = r), t);
                },
              },
              {
                test: [/(web|hpw)[o0]s/i],
                describe: function (e) {
                  var t = { name: "WebOS Browser" },
                    r =
                      i.default.getFirstMatch(o, e) ||
                      i.default.getFirstMatch(
                        /w(?:eb)?[o0]sbrowser\/(\d+(\.?_?\d+)+)/i,
                        e,
                      );
                  return (r && (t.version = r), t);
                },
              },
              {
                test: [/bada/i],
                describe: function (e) {
                  var t = { name: "Bada" },
                    r = i.default.getFirstMatch(/dolfin\/(\d+(\.?_?\d+)+)/i, e);
                  return (r && (t.version = r), t);
                },
              },
              {
                test: [/tizen/i],
                describe: function (e) {
                  var t = { name: "Tizen" },
                    r =
                      i.default.getFirstMatch(
                        /(?:tizen\s?)?browser\/(\d+(\.?_?\d+)+)/i,
                        e,
                      ) || i.default.getFirstMatch(o, e);
                  return (r && (t.version = r), t);
                },
              },
              {
                test: [/qupzilla/i],
                describe: function (e) {
                  var t = { name: "QupZilla" },
                    r =
                      i.default.getFirstMatch(
                        /(?:qupzilla)[\s/](\d+(\.?_?\d+)+)/i,
                        e,
                      ) || i.default.getFirstMatch(o, e);
                  return (r && (t.version = r), t);
                },
              },
              {
                test: [/librewolf/i],
                describe: function (e) {
                  var t = { name: "LibreWolf" },
                    r = i.default.getFirstMatch(
                      /(?:librewolf)[\s/](\d+(\.?_?\d+)+)/i,
                      e,
                    );
                  return (r && (t.version = r), t);
                },
              },
              {
                test: [/firefox|iceweasel|fxios/i],
                describe: function (e) {
                  var t = { name: "Firefox" },
                    r = i.default.getFirstMatch(
                      /(?:firefox|iceweasel|fxios)[\s/](\d+(\.?_?\d+)+)/i,
                      e,
                    );
                  return (r && (t.version = r), t);
                },
              },
              {
                test: [/electron/i],
                describe: function (e) {
                  var t = { name: "Electron" },
                    r = i.default.getFirstMatch(
                      /(?:electron)\/(\d+(\.?_?\d+)+)/i,
                      e,
                    );
                  return (r && (t.version = r), t);
                },
              },
              {
                test: [/sogoumobilebrowser/i, /metasr/i, /se 2\.[x]/i],
                describe: function (e) {
                  var t = { name: "Sogou Browser" },
                    r = i.default.getFirstMatch(
                      /(?:sogoumobilebrowser)[\s/](\d+(\.?_?\d+)+)/i,
                      e,
                    ),
                    n = i.default.getFirstMatch(
                      /(?:chrome|crios|crmo)\/(\d+(\.?_?\d+)+)/i,
                      e,
                    ),
                    o = i.default.getFirstMatch(/se ([\d.]+)x/i, e),
                    a = r || n || o;
                  return (a && (t.version = a), t);
                },
              },
              {
                test: [/MiuiBrowser/i],
                describe: function (e) {
                  var t = { name: "Miui" },
                    r = i.default.getFirstMatch(
                      /(?:MiuiBrowser)[\s/](\d+(\.?_?\d+)+)/i,
                      e,
                    );
                  return (r && (t.version = r), t);
                },
              },
              {
                test: [/chromium/i],
                describe: function (e) {
                  var t = { name: "Chromium" },
                    r =
                      i.default.getFirstMatch(
                        /(?:chromium)[\s/](\d+(\.?_?\d+)+)/i,
                        e,
                      ) || i.default.getFirstMatch(o, e);
                  return (r && (t.version = r), t);
                },
              },
              {
                test: [/chrome|crios|crmo/i],
                describe: function (e) {
                  var t = { name: "Chrome" },
                    r = i.default.getFirstMatch(
                      /(?:chrome|crios|crmo)\/(\d+(\.?_?\d+)+)/i,
                      e,
                    );
                  return (r && (t.version = r), t);
                },
              },
              {
                test: [/GSA/i],
                describe: function (e) {
                  var t = { name: "Google Search" },
                    r = i.default.getFirstMatch(
                      /(?:GSA)\/(\d+(\.?_?\d+)+)/i,
                      e,
                    );
                  return (r && (t.version = r), t);
                },
              },
              {
                test: function (e) {
                  var t = !e.test(/like android/i),
                    r = e.test(/android/i);
                  return t && r;
                },
                describe: function (e) {
                  var t = { name: "Android Browser" },
                    r = i.default.getFirstMatch(o, e);
                  return (r && (t.version = r), t);
                },
              },
              {
                test: [/playstation 4/i],
                describe: function (e) {
                  var t = { name: "PlayStation 4" },
                    r = i.default.getFirstMatch(o, e);
                  return (r && (t.version = r), t);
                },
              },
              {
                test: [/safari|applewebkit/i],
                describe: function (e) {
                  var t = { name: "Safari" },
                    r = i.default.getFirstMatch(o, e);
                  return (r && (t.version = r), t);
                },
              },
              {
                test: [/.*/i],
                describe: function (e) {
                  var t =
                    -1 !== e.search("\\(")
                      ? /^(.*)\/(.*)[ \t]\((.*)/
                      : /^(.*)\/(.*) /;
                  return {
                    name: i.default.getFirstMatch(t, e),
                    version: i.default.getSecondMatch(t, e),
                  };
                },
              },
            ]),
              (e.exports = t.default));
          },
          93: function (e, t, r) {
            "use strict";
            ((t.__esModule = !0), (t.default = void 0));
            var n,
              i = (n = r(17)) && n.__esModule ? n : { default: n },
              o = r(18);
            ((t.default = [
              {
                test: [/Roku\/DVP/],
                describe: function (e) {
                  var t = i.default.getFirstMatch(/Roku\/DVP-(\d+\.\d+)/i, e);
                  return { name: o.OS_MAP.Roku, version: t };
                },
              },
              {
                test: [/windows phone/i],
                describe: function (e) {
                  var t = i.default.getFirstMatch(
                    /windows phone (?:os)?\s?(\d+(\.\d+)*)/i,
                    e,
                  );
                  return { name: o.OS_MAP.WindowsPhone, version: t };
                },
              },
              {
                test: [/windows /i],
                describe: function (e) {
                  var t = i.default.getFirstMatch(
                      /Windows ((NT|XP)( \d\d?.\d)?)/i,
                      e,
                    ),
                    r = i.default.getWindowsVersionName(t);
                  return { name: o.OS_MAP.Windows, version: t, versionName: r };
                },
              },
              {
                test: [/Macintosh(.*?) FxiOS(.*?)\//],
                describe: function (e) {
                  var t = { name: o.OS_MAP.iOS },
                    r = i.default.getSecondMatch(/(Version\/)(\d[\d.]+)/, e);
                  return (r && (t.version = r), t);
                },
              },
              {
                test: [/macintosh/i],
                describe: function (e) {
                  var t = i.default
                      .getFirstMatch(/mac os x (\d+(\.?_?\d+)+)/i, e)
                      .replace(/[_\s]/g, "."),
                    r = i.default.getMacOSVersionName(t),
                    n = { name: o.OS_MAP.MacOS, version: t };
                  return (r && (n.versionName = r), n);
                },
              },
              {
                test: [/(ipod|iphone|ipad)/i],
                describe: function (e) {
                  var t = i.default
                    .getFirstMatch(/os (\d+([_\s]\d+)*) like mac os x/i, e)
                    .replace(/[_\s]/g, ".");
                  return { name: o.OS_MAP.iOS, version: t };
                },
              },
              {
                test: [/OpenHarmony/i],
                describe: function (e) {
                  var t = i.default.getFirstMatch(
                    /OpenHarmony\s+(\d+(\.\d+)*)/i,
                    e,
                  );
                  return { name: o.OS_MAP.HarmonyOS, version: t };
                },
              },
              {
                test: function (e) {
                  var t = !e.test(/like android/i),
                    r = e.test(/android/i);
                  return t && r;
                },
                describe: function (e) {
                  var t = i.default.getFirstMatch(
                      /android[\s/-](\d+(\.\d+)*)/i,
                      e,
                    ),
                    r = i.default.getAndroidVersionName(t),
                    n = { name: o.OS_MAP.Android, version: t };
                  return (r && (n.versionName = r), n);
                },
              },
              {
                test: [/(web|hpw)[o0]s/i],
                describe: function (e) {
                  var t = i.default.getFirstMatch(
                      /(?:web|hpw)[o0]s\/(\d+(\.\d+)*)/i,
                      e,
                    ),
                    r = { name: o.OS_MAP.WebOS };
                  return (t && t.length && (r.version = t), r);
                },
              },
              {
                test: [/blackberry|\bbb\d+/i, /rim\stablet/i],
                describe: function (e) {
                  var t =
                    i.default.getFirstMatch(
                      /rim\stablet\sos\s(\d+(\.\d+)*)/i,
                      e,
                    ) ||
                    i.default.getFirstMatch(
                      /blackberry\d+\/(\d+([_\s]\d+)*)/i,
                      e,
                    ) ||
                    i.default.getFirstMatch(/\bbb(\d+)/i, e);
                  return { name: o.OS_MAP.BlackBerry, version: t };
                },
              },
              {
                test: [/bada/i],
                describe: function (e) {
                  var t = i.default.getFirstMatch(/bada\/(\d+(\.\d+)*)/i, e);
                  return { name: o.OS_MAP.Bada, version: t };
                },
              },
              {
                test: [/tizen/i],
                describe: function (e) {
                  var t = i.default.getFirstMatch(
                    /tizen[/\s](\d+(\.\d+)*)/i,
                    e,
                  );
                  return { name: o.OS_MAP.Tizen, version: t };
                },
              },
              {
                test: [/linux/i],
                describe: function () {
                  return { name: o.OS_MAP.Linux };
                },
              },
              {
                test: [/CrOS/],
                describe: function () {
                  return { name: o.OS_MAP.ChromeOS };
                },
              },
              {
                test: [/PlayStation 4/],
                describe: function (e) {
                  var t = i.default.getFirstMatch(
                    /PlayStation 4[/\s](\d+(\.\d+)*)/i,
                    e,
                  );
                  return { name: o.OS_MAP.PlayStation4, version: t };
                },
              },
            ]),
              (e.exports = t.default));
          },
          94: function (e, t, r) {
            "use strict";
            ((t.__esModule = !0), (t.default = void 0));
            var n,
              i = (n = r(17)) && n.__esModule ? n : { default: n },
              o = r(18);
            ((t.default = [
              {
                test: [/googlebot/i],
                describe: function () {
                  return { type: o.PLATFORMS_MAP.bot, vendor: "Google" };
                },
              },
              {
                test: [/amazonbot/i],
                describe: function () {
                  return { type: o.PLATFORMS_MAP.bot, vendor: "Amazon" };
                },
              },
              {
                test: [/gptbot/i],
                describe: function () {
                  return { type: o.PLATFORMS_MAP.bot, vendor: "OpenAI" };
                },
              },
              {
                test: [/chatgpt-user/i],
                describe: function () {
                  return { type: o.PLATFORMS_MAP.bot, vendor: "OpenAI" };
                },
              },
              {
                test: [/oai-searchbot/i],
                describe: function () {
                  return { type: o.PLATFORMS_MAP.bot, vendor: "OpenAI" };
                },
              },
              {
                test: [/baiduspider/i],
                describe: function () {
                  return { type: o.PLATFORMS_MAP.bot, vendor: "Baidu" };
                },
              },
              {
                test: [/bingbot/i],
                describe: function () {
                  return { type: o.PLATFORMS_MAP.bot, vendor: "Bing" };
                },
              },
              {
                test: [/duckduckbot/i],
                describe: function () {
                  return { type: o.PLATFORMS_MAP.bot, vendor: "DuckDuckGo" };
                },
              },
              {
                test: [
                  /claudebot/i,
                  /claude-web/i,
                  /claude-user/i,
                  /claude-searchbot/i,
                ],
                describe: function () {
                  return { type: o.PLATFORMS_MAP.bot, vendor: "Anthropic" };
                },
              },
              {
                test: [/omgilibot/i, /webzio-extended/i],
                describe: function () {
                  return { type: o.PLATFORMS_MAP.bot, vendor: "Webz.io" };
                },
              },
              {
                test: [/diffbot/i],
                describe: function () {
                  return { type: o.PLATFORMS_MAP.bot, vendor: "Diffbot" };
                },
              },
              {
                test: [/perplexitybot/i],
                describe: function () {
                  return { type: o.PLATFORMS_MAP.bot, vendor: "Perplexity AI" };
                },
              },
              {
                test: [/perplexity-user/i],
                describe: function () {
                  return { type: o.PLATFORMS_MAP.bot, vendor: "Perplexity AI" };
                },
              },
              {
                test: [/youbot/i],
                describe: function () {
                  return { type: o.PLATFORMS_MAP.bot, vendor: "You.com" };
                },
              },
              {
                test: [/ia_archiver/i],
                describe: function () {
                  return {
                    type: o.PLATFORMS_MAP.bot,
                    vendor: "Internet Archive",
                  };
                },
              },
              {
                test: [/meta-webindexer/i],
                describe: function () {
                  return { type: o.PLATFORMS_MAP.bot, vendor: "Meta" };
                },
              },
              {
                test: [/meta-externalads/i],
                describe: function () {
                  return { type: o.PLATFORMS_MAP.bot, vendor: "Meta" };
                },
              },
              {
                test: [/meta-externalagent/i],
                describe: function () {
                  return { type: o.PLATFORMS_MAP.bot, vendor: "Meta" };
                },
              },
              {
                test: [/meta-externalfetcher/i],
                describe: function () {
                  return { type: o.PLATFORMS_MAP.bot, vendor: "Meta" };
                },
              },
              {
                test: [/facebookexternalhit/i, /facebookcatalog/i],
                describe: function () {
                  return { type: o.PLATFORMS_MAP.bot, vendor: "Meta" };
                },
              },
              {
                test: [/yahoo/i],
                describe: function () {
                  return { type: o.PLATFORMS_MAP.bot, vendor: "Yahoo" };
                },
              },
              {
                test: [/yandexbot/i, /yandexmobilebot/i],
                describe: function () {
                  return { type: o.PLATFORMS_MAP.bot, vendor: "Yandex" };
                },
              },
              {
                test: [/pingdom/i],
                describe: function () {
                  return { type: o.PLATFORMS_MAP.bot, vendor: "Pingdom" };
                },
              },
              {
                test: [/huawei/i],
                describe: function (e) {
                  var t = i.default.getFirstMatch(/(can-l01)/i, e) && "Nova",
                    r = { type: o.PLATFORMS_MAP.mobile, vendor: "Huawei" };
                  return (t && (r.model = t), r);
                },
              },
              {
                test: [/nexus\s*(?:7|8|9|10).*/i],
                describe: function () {
                  return { type: o.PLATFORMS_MAP.tablet, vendor: "Nexus" };
                },
              },
              {
                test: [/ipad/i],
                describe: function () {
                  return {
                    type: o.PLATFORMS_MAP.tablet,
                    vendor: "Apple",
                    model: "iPad",
                  };
                },
              },
              {
                test: [/Macintosh(.*?) FxiOS(.*?)\//],
                describe: function () {
                  return {
                    type: o.PLATFORMS_MAP.tablet,
                    vendor: "Apple",
                    model: "iPad",
                  };
                },
              },
              {
                test: [/kftt build/i],
                describe: function () {
                  return {
                    type: o.PLATFORMS_MAP.tablet,
                    vendor: "Amazon",
                    model: "Kindle Fire HD 7",
                  };
                },
              },
              {
                test: [/silk/i],
                describe: function () {
                  return { type: o.PLATFORMS_MAP.tablet, vendor: "Amazon" };
                },
              },
              {
                test: [/tablet(?! pc)/i],
                describe: function () {
                  return { type: o.PLATFORMS_MAP.tablet };
                },
              },
              {
                test: function (e) {
                  var t = e.test(/ipod|iphone/i),
                    r = e.test(/like (ipod|iphone)/i);
                  return t && !r;
                },
                describe: function (e) {
                  var t = i.default.getFirstMatch(/(ipod|iphone)/i, e);
                  return {
                    type: o.PLATFORMS_MAP.mobile,
                    vendor: "Apple",
                    model: t,
                  };
                },
              },
              {
                test: [/nexus\s*[0-6].*/i, /galaxy nexus/i],
                describe: function () {
                  return { type: o.PLATFORMS_MAP.mobile, vendor: "Nexus" };
                },
              },
              {
                test: [/Nokia/i],
                describe: function (e) {
                  var t = i.default.getFirstMatch(
                      /Nokia\s+([0-9]+(\.[0-9]+)?)/i,
                      e,
                    ),
                    r = { type: o.PLATFORMS_MAP.mobile, vendor: "Nokia" };
                  return (t && (r.model = t), r);
                },
              },
              {
                test: [/[^-]mobi/i],
                describe: function () {
                  return { type: o.PLATFORMS_MAP.mobile };
                },
              },
              {
                test: function (e) {
                  return "blackberry" === e.getBrowserName(!0);
                },
                describe: function () {
                  return { type: o.PLATFORMS_MAP.mobile, vendor: "BlackBerry" };
                },
              },
              {
                test: function (e) {
                  return "bada" === e.getBrowserName(!0);
                },
                describe: function () {
                  return { type: o.PLATFORMS_MAP.mobile };
                },
              },
              {
                test: function (e) {
                  return "windows phone" === e.getBrowserName();
                },
                describe: function () {
                  return { type: o.PLATFORMS_MAP.mobile, vendor: "Microsoft" };
                },
              },
              {
                test: function (e) {
                  var t = Number(String(e.getOSVersion()).split(".")[0]);
                  return "android" === e.getOSName(!0) && t >= 3;
                },
                describe: function () {
                  return { type: o.PLATFORMS_MAP.tablet };
                },
              },
              {
                test: function (e) {
                  return "android" === e.getOSName(!0);
                },
                describe: function () {
                  return { type: o.PLATFORMS_MAP.mobile };
                },
              },
              {
                test: function (e) {
                  return "macos" === e.getOSName(!0);
                },
                describe: function () {
                  return { type: o.PLATFORMS_MAP.desktop, vendor: "Apple" };
                },
              },
              {
                test: function (e) {
                  return "windows" === e.getOSName(!0);
                },
                describe: function () {
                  return { type: o.PLATFORMS_MAP.desktop };
                },
              },
              {
                test: function (e) {
                  return "linux" === e.getOSName(!0);
                },
                describe: function () {
                  return { type: o.PLATFORMS_MAP.desktop };
                },
              },
              {
                test: function (e) {
                  return "playstation 4" === e.getOSName(!0);
                },
                describe: function () {
                  return { type: o.PLATFORMS_MAP.tv };
                },
              },
              {
                test: function (e) {
                  return "roku" === e.getOSName(!0);
                },
                describe: function () {
                  return { type: o.PLATFORMS_MAP.tv };
                },
              },
            ]),
              (e.exports = t.default));
          },
          95: function (e, t, r) {
            "use strict";
            ((t.__esModule = !0), (t.default = void 0));
            var n,
              i = (n = r(17)) && n.__esModule ? n : { default: n },
              o = r(18);
            ((t.default = [
              {
                test: function (e) {
                  return "microsoft edge" === e.getBrowserName(!0);
                },
                describe: function (e) {
                  if (/\sedg\//i.test(e)) return { name: o.ENGINE_MAP.Blink };
                  var t = i.default.getFirstMatch(/edge\/(\d+(\.?_?\d+)+)/i, e);
                  return { name: o.ENGINE_MAP.EdgeHTML, version: t };
                },
              },
              {
                test: [/trident/i],
                describe: function (e) {
                  var t = { name: o.ENGINE_MAP.Trident },
                    r = i.default.getFirstMatch(
                      /trident\/(\d+(\.?_?\d+)+)/i,
                      e,
                    );
                  return (r && (t.version = r), t);
                },
              },
              {
                test: function (e) {
                  return e.test(/presto/i);
                },
                describe: function (e) {
                  var t = { name: o.ENGINE_MAP.Presto },
                    r = i.default.getFirstMatch(/presto\/(\d+(\.?_?\d+)+)/i, e);
                  return (r && (t.version = r), t);
                },
              },
              {
                test: function (e) {
                  var t = e.test(/gecko/i),
                    r = e.test(/like gecko/i);
                  return t && !r;
                },
                describe: function (e) {
                  var t = { name: o.ENGINE_MAP.Gecko },
                    r = i.default.getFirstMatch(/gecko\/(\d+(\.?_?\d+)+)/i, e);
                  return (r && (t.version = r), t);
                },
              },
              {
                test: [/(apple)?webkit\/537\.36/i],
                describe: function () {
                  return { name: o.ENGINE_MAP.Blink };
                },
              },
              {
                test: [/(apple)?webkit/i],
                describe: function (e) {
                  var t = { name: o.ENGINE_MAP.WebKit },
                    r = i.default.getFirstMatch(/webkit\/(\d+(\.?_?\d+)+)/i, e);
                  return (r && (t.version = r), t);
                },
              },
            ]),
              (e.exports = t.default));
          },
        },
        t = {};
      function r(n) {
        if (t[n]) return t[n].exports;
        var i = (t[n] = { i: n, l: !1, exports: {} });
        return (e[n].call(i.exports, i, i.exports, r), (i.l = !0), i.exports);
      }
      return (
        (r.m = e),
        (r.c = t),
        (r.d = function (e, t, n) {
          r.o(e, t) || Object.defineProperty(e, t, { enumerable: !0, get: n });
        }),
        (r.r = function (e) {
          ("u" > typeof Symbol &&
            Symbol.toStringTag &&
            Object.defineProperty(e, Symbol.toStringTag, { value: "Module" }),
            Object.defineProperty(e, "__esModule", { value: !0 }));
        }),
        (r.t = function (e, t) {
          if (
            (1 & t && (e = r(e)),
            8 & t || (4 & t && "object" == typeof e && e && e.__esModule))
          )
            return e;
          var n = Object.create(null);
          if (
            (r.r(n),
            Object.defineProperty(n, "default", { enumerable: !0, value: e }),
            2 & t && "string" != typeof e)
          )
            for (var i in e)
              r.d(
                n,
                i,
                function (t) {
                  return e[t];
                }.bind(null, i),
              );
          return n;
        }),
        (r.n = function (e) {
          var t =
            e && e.__esModule
              ? function () {
                  return e.default;
                }
              : function () {
                  return e;
                };
          return (r.d(t, "a", t), t);
        }),
        (r.o = function (e, t) {
          return Object.prototype.hasOwnProperty.call(e, t);
        }),
        (r.p = ""),
        r((r.s = 90))
      );
    })()));
};
