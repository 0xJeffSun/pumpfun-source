// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e, t, i) => {
  !(function (r) {
    "use strict";
    var n = "function",
      a = "undefined",
      o = "object",
      s = "string",
      l = "major",
      d = "model",
      c = "name",
      u = "type",
      m = "vendor",
      f = "version",
      b = "architecture",
      p = "console",
      h = "mobile",
      w = "tablet",
      v = "smarttv",
      g = "wearable",
      y = "embedded",
      x = "Amazon",
      k = "Apple",
      C = "ASUS",
      S = "BlackBerry",
      N = "Browser",
      _ = "Chrome",
      j = "Firefox",
      P = "Google",
      E = "Honor",
      O = "Huawei",
      T = "Microsoft",
      M = "Motorola",
      A = "Nvidia",
      F = "OnePlus",
      I = "Opera",
      R = "OPPO",
      W = "Samsung",
      V = "Sharp",
      L = "Sony",
      U = "Xiaomi",
      D = "Zebra",
      z = "Facebook",
      B = "Chromium OS",
      q = "Mac OS",
      H = " Browser",
      $ = function (e, t) {
        var i = {};
        for (var r in e)
          t[r] && t[r].length % 2 == 0
            ? (i[r] = t[r].concat(e[r]))
            : (i[r] = e[r]);
        return i;
      },
      K = function (e) {
        for (var t = {}, i = 0; i < e.length; i++) t[e[i].toUpperCase()] = e[i];
        return t;
      },
      G = function (e, t) {
        return typeof e === s && -1 !== Y(t).indexOf(Y(e));
      },
      Y = function (e) {
        return e.toLowerCase();
      },
      Q = function (e, t) {
        if (typeof e === s)
          return (
            (e = e.replace(/^\s\s*/, "")),
            typeof t === a ? e : e.substring(0, 500)
          );
      },
      Z = function (e, t) {
        for (var i, r, a, s, l, d, c = 0; c < t.length && !l; ) {
          var u = t[c],
            m = t[c + 1];
          for (i = r = 0; i < u.length && !l && u[i]; )
            if ((l = u[i++].exec(e)))
              for (a = 0; a < m.length; a++)
                ((d = l[++r]),
                  typeof (s = m[a]) === o && s.length > 0
                    ? 2 === s.length
                      ? typeof s[1] == n
                        ? (this[s[0]] = s[1].call(this, d))
                        : (this[s[0]] = s[1])
                      : 3 === s.length
                        ? typeof s[1] !== n || (s[1].exec && s[1].test)
                          ? (this[s[0]] = d ? d.replace(s[1], s[2]) : void 0)
                          : (this[s[0]] = d ? s[1].call(this, d, s[2]) : void 0)
                        : 4 === s.length &&
                          (this[s[0]] = d
                            ? s[3].call(this, d.replace(s[1], s[2]))
                            : void 0)
                    : (this[s] = d || void 0));
          c += 2;
        }
      },
      X = function (e, t) {
        for (var i in t)
          if (typeof t[i] === o && t[i].length > 0) {
            for (var r = 0; r < t[i].length; r++)
              if (G(t[i][r], e)) return "?" === i ? void 0 : i;
          } else if (G(t[i], e)) return "?" === i ? void 0 : i;
        return t.hasOwnProperty("*") ? t["*"] : e;
      },
      J = {
        ME: "4.90",
        "NT 3.11": "NT3.51",
        "NT 4.0": "NT4.0",
        2e3: "NT 5.0",
        XP: ["NT 5.1", "NT 5.2"],
        Vista: "NT 6.0",
        7: "NT 6.1",
        8: "NT 6.2",
        8.1: "NT 6.3",
        10: ["NT 6.4", "NT 10.0"],
        RT: "ARM",
      },
      ee = {
        browser: [
          [/\b(?:crmo|crios)\/([\w\.]+)/i],
          [f, [c, "Chrome"]],
          [/edg(?:e|ios|a)?\/([\w\.]+)/i],
          [f, [c, "Edge"]],
          [
            /(opera mini)\/([-\w\.]+)/i,
            /(opera [mobiletab]{3,6})\b.+version\/([-\w\.]+)/i,
            /(opera)(?:.+version\/|[\/ ]+)([\w\.]+)/i,
          ],
          [c, f],
          [/opios[\/ ]+([\w\.]+)/i],
          [f, [c, I + " Mini"]],
          [/\bop(?:rg)?x\/([\w\.]+)/i],
          [f, [c, I + " GX"]],
          [/\bopr\/([\w\.]+)/i],
          [f, [c, I]],
          [/\bb[ai]*d(?:uhd|[ub]*[aekoprswx]{5,6})[\/ ]?([\w\.]+)/i],
          [f, [c, "Baidu"]],
          [/\b(?:mxbrowser|mxios|myie2)\/?([-\w\.]*)\b/i],
          [f, [c, "Maxthon"]],
          [
            /(kindle)\/([\w\.]+)/i,
            /(lunascape|maxthon|netfront|jasmine|blazer|sleipnir)[\/ ]?([\w\.]*)/i,
            /(avant|iemobile|slim(?:browser|boat|jet))[\/ ]?([\d\.]*)/i,
            /(?:ms|\()(ie) ([\w\.]+)/i,
            /(flock|rockmelt|midori|epiphany|silk|skyfire|ovibrowser|bolt|iron|vivaldi|iridium|phantomjs|bowser|qupzilla|falkon|rekonq|puffin|brave|whale(?!.+naver)|qqbrowserlite|duckduckgo|klar|helio|(?=comodo_)?dragon)\/([-\w\.]+)/i,
            /(heytap|ovi|115)browser\/([\d\.]+)/i,
            /(weibo)__([\d\.]+)/i,
          ],
          [c, f],
          [/quark(?:pc)?\/([-\w\.]+)/i],
          [f, [c, "Quark"]],
          [/\bddg\/([\w\.]+)/i],
          [f, [c, "DuckDuckGo"]],
          [/(?:\buc? ?browser|(?:juc.+)ucweb)[\/ ]?([\w\.]+)/i],
          [f, [c, "UC" + N]],
          [
            /microm.+\bqbcore\/([\w\.]+)/i,
            /\bqbcore\/([\w\.]+).+microm/i,
            /micromessenger\/([\w\.]+)/i,
          ],
          [f, [c, "WeChat"]],
          [/konqueror\/([\w\.]+)/i],
          [f, [c, "Konqueror"]],
          [/trident.+rv[: ]([\w\.]{1,9})\b.+like gecko/i],
          [f, [c, "IE"]],
          [/ya(?:search)?browser\/([\w\.]+)/i],
          [f, [c, "Yandex"]],
          [/slbrowser\/([\w\.]+)/i],
          [f, [c, "Smart Lenovo " + N]],
          [/(avast|avg)\/([\w\.]+)/i],
          [[c, /(.+)/, "$1 Secure " + N], f],
          [/\bfocus\/([\w\.]+)/i],
          [f, [c, j + " Focus"]],
          [/\bopt\/([\w\.]+)/i],
          [f, [c, I + " Touch"]],
          [/coc_coc\w+\/([\w\.]+)/i],
          [f, [c, "Coc Coc"]],
          [/dolfin\/([\w\.]+)/i],
          [f, [c, "Dolphin"]],
          [/coast\/([\w\.]+)/i],
          [f, [c, I + " Coast"]],
          [/miuibrowser\/([\w\.]+)/i],
          [f, [c, "MIUI" + H]],
          [/fxios\/([\w\.-]+)/i],
          [f, [c, j]],
          [/\bqihoobrowser\/?([\w\.]*)/i],
          [f, [c, "360"]],
          [/\b(qq)\/([\w\.]+)/i],
          [[c, /(.+)/, "$1Browser"], f],
          [/(oculus|sailfish|huawei|vivo|pico)browser\/([\w\.]+)/i],
          [[c, /(.+)/, "$1" + H], f],
          [/samsungbrowser\/([\w\.]+)/i],
          [f, [c, W + " Internet"]],
          [/metasr[\/ ]?([\d\.]+)/i],
          [f, [c, "Sogou Explorer"]],
          [/(sogou)mo\w+\/([\d\.]+)/i],
          [[c, "Sogou Mobile"], f],
          [
            /(electron)\/([\w\.]+) safari/i,
            /(tesla)(?: qtcarbrowser|\/(20\d\d\.[-\w\.]+))/i,
            /m?(qqbrowser|2345(?=browser|chrome|explorer))\w*[\/ ]?v?([\w\.]+)/i,
          ],
          [c, f],
          [/(lbbrowser|rekonq)/i, /\[(linkedin)app\]/i],
          [c],
          [
            /ome\/([\w\.]+) \w* ?(iron) saf/i,
            /ome\/([\w\.]+).+qihu (360)[es]e/i,
          ],
          [f, c],
          [/((?:fban\/fbios|fb_iab\/fb4a)(?!.+fbav)|;fbav\/([\w\.]+);)/i],
          [[c, z], f],
          [
            /(Klarna)\/([\w\.]+)/i,
            /(kakao(?:talk|story))[\/ ]([\w\.]+)/i,
            /(naver)\(.*?(\d+\.[\w\.]+).*\)/i,
            /(daum)apps[\/ ]([\w\.]+)/i,
            /safari (line)\/([\w\.]+)/i,
            /\b(line)\/([\w\.]+)\/iab/i,
            /(alipay)client\/([\w\.]+)/i,
            /(twitter)(?:and| f.+e\/([\w\.]+))/i,
            /(chromium|instagram|snapchat)[\/ ]([-\w\.]+)/i,
          ],
          [c, f],
          [/\bgsa\/([\w\.]+) .*safari\//i],
          [f, [c, "GSA"]],
          [/musical_ly(?:.+app_?version\/|_)([\w\.]+)/i],
          [f, [c, "TikTok"]],
          [/headlesschrome(?:\/([\w\.]+)| )/i],
          [f, [c, _ + " Headless"]],
          [/ wv\).+(chrome)\/([\w\.]+)/i],
          [[c, _ + " WebView"], f],
          [/droid.+ version\/([\w\.]+)\b.+(?:mobile safari|safari)/i],
          [f, [c, "Android " + N]],
          [/(chrome|omniweb|arora|[tizenoka]{5} ?browser)\/v?([\w\.]+)/i],
          [c, f],
          [/version\/([\w\.\,]+) .*mobile\/\w+ (safari)/i],
          [f, [c, "Mobile Safari"]],
          [/version\/([\w(\.|\,)]+) .*(mobile ?safari|safari)/i],
          [f, c],
          [/webkit.+?(mobile ?safari|safari)(\/[\w\.]+)/i],
          [
            c,
            [
              f,
              X,
              {
                "1.0": "/8",
                1.2: "/1",
                1.3: "/3",
                "2.0": "/412",
                "2.0.2": "/416",
                "2.0.3": "/417",
                "2.0.4": "/419",
                "?": "/",
              },
            ],
          ],
          [/(webkit|khtml)\/([\w\.]+)/i],
          [c, f],
          [/(navigator|netscape\d?)\/([-\w\.]+)/i],
          [[c, "Netscape"], f],
          [/(wolvic|librewolf)\/([\w\.]+)/i],
          [c, f],
          [/mobile vr; rv:([\w\.]+)\).+firefox/i],
          [f, [c, j + " Reality"]],
          [
            /ekiohf.+(flow)\/([\w\.]+)/i,
            /(swiftfox)/i,
            /(icedragon|iceweasel|camino|chimera|fennec|maemo browser|minimo|conkeror)[\/ ]?([\w\.\+]+)/i,
            /(seamonkey|k-meleon|icecat|iceape|firebird|phoenix|palemoon|basilisk|waterfox)\/([-\w\.]+)$/i,
            /(firefox)\/([\w\.]+)/i,
            /(mozilla)\/([\w\.]+) .+rv\:.+gecko\/\d+/i,
            /(amaya|dillo|doris|icab|ladybird|lynx|mosaic|netsurf|obigo|polaris|w3m|(?:go|ice|up)[\. ]?browser)[-\/ ]?v?([\w\.]+)/i,
            /\b(links) \(([\w\.]+)/i,
          ],
          [c, [f, /_/g, "."]],
          [/(cobalt)\/([\w\.]+)/i],
          [c, [f, /master.|lts./, ""]],
        ],
        cpu: [
          [/\b((amd|x|x86[-_]?|wow|win)64)\b/i],
          [[b, "amd64"]],
          [/(ia32(?=;))/i, /\b((i[346]|x)86)(pc)?\b/i],
          [[b, "ia32"]],
          [/\b(aarch64|arm(v?[89]e?l?|_?64))\b/i],
          [[b, "arm64"]],
          [/\b(arm(v[67])?ht?n?[fl]p?)\b/i],
          [[b, "armhf"]],
          [/( (ce|mobile); ppc;|\/[\w\.]+arm\b)/i],
          [[b, "arm"]],
          [/((ppc|powerpc)(64)?)( mac|;|\))/i],
          [[b, /ower/, "", Y]],
          [/ sun4\w[;\)]/i],
          [[b, "sparc"]],
          [
            /\b(avr32|ia64(?=;)|68k(?=\))|\barm(?=v([1-7]|[5-7]1)l?|;|eabi)|(irix|mips|sparc)(64)?\b|pa-risc)/i,
          ],
          [[b, Y]],
        ],
        device: [
          [
            /\b(sch-i[89]0\d|shw-m380s|sm-[ptx]\w{2,4}|gt-[pn]\d{2,4}|sgh-t8[56]9|nexus 10)/i,
          ],
          [d, [m, W], [u, w]],
          [
            /\b((?:s[cgp]h|gt|sm)-(?![lr])\w+|sc[g-]?[\d]+a?|galaxy nexus)/i,
            /samsung[- ]((?!sm-[lr])[-\w]+)/i,
            /sec-(sgh\w+)/i,
          ],
          [d, [m, W], [u, h]],
          [/(?:\/|\()(ip(?:hone|od)[\w, ]*)(?:\/|;)/i],
          [d, [m, k], [u, h]],
          [
            /\((ipad);[-\w\),; ]+apple/i,
            /applecoremedia\/[\w\.]+ \((ipad)/i,
            /\b(ipad)\d\d?,\d\d?[;\]].+ios/i,
          ],
          [d, [m, k], [u, w]],
          [/(macintosh);/i],
          [d, [m, k]],
          [/\b(sh-?[altvz]?\d\d[a-ekm]?)/i],
          [d, [m, V], [u, h]],
          [
            /\b((?:brt|eln|hey2?|gdi|jdn)-a?[lnw]09|(?:ag[rm]3?|jdn2|kob2)-a?[lw]0[09]hn)(?: bui|\)|;)/i,
          ],
          [d, [m, E], [u, w]],
          [/honor([-\w ]+)[;\)]/i],
          [d, [m, E], [u, h]],
          [
            /\b((?:ag[rs][2356]?k?|bah[234]?|bg[2o]|bt[kv]|cmr|cpn|db[ry]2?|jdn2|got|kob2?k?|mon|pce|scm|sht?|[tw]gr|vrd)-[ad]?[lw][0125][09]b?|605hw|bg2-u03|(?:gem|fdr|m2|ple|t1)-[7a]0[1-4][lu]|t1-a2[13][lw]|mediapad[\w\. ]*(?= bui|\)))\b(?!.+d\/s)/i,
          ],
          [d, [m, O], [u, w]],
          [
            /(?:huawei)([-\w ]+)[;\)]/i,
            /\b(nexus 6p|\w{2,4}e?-[atu]?[ln][\dx][012359c][adn]?)\b(?!.+d\/s)/i,
          ],
          [d, [m, O], [u, h]],
          [
            /oid[^\)]+; (2[\dbc]{4}(182|283|rp\w{2})[cgl]|m2105k81a?c)(?: bui|\))/i,
            /\b((?:red)?mi[-_ ]?pad[\w- ]*)(?: bui|\))/i,
          ],
          [
            [d, /_/g, " "],
            [m, U],
            [u, w],
          ],
          [
            /\b(poco[\w ]+|m2\d{3}j\d\d[a-z]{2})(?: bui|\))/i,
            /\b; (\w+) build\/hm\1/i,
            /\b(hm[-_ ]?note?[_ ]?(?:\d\w)?) bui/i,
            /\b(redmi[\-_ ]?(?:note|k)?[\w_ ]+)(?: bui|\))/i,
            /oid[^\)]+; (m?[12][0-389][01]\w{3,6}[c-y])( bui|; wv|\))/i,
            /\b(mi[-_ ]?(?:a\d|one|one[_ ]plus|note lte|max|cc)?[_ ]?(?:\d?\w?)[_ ]?(?:plus|se|lite|pro)?)(?: bui|\))/i,
            / ([\w ]+) miui\/v?\d/i,
          ],
          [
            [d, /_/g, " "],
            [m, U],
            [u, h],
          ],
          [
            /; (\w+) bui.+ oppo/i,
            /\b(cph[12]\d{3}|p(?:af|c[al]|d\w|e[ar])[mt]\d0|x9007|a101op)\b/i,
          ],
          [d, [m, R], [u, h]],
          [/\b(opd2(\d{3}a?))(?: bui|\))/i],
          [d, [m, X, { OnePlus: ["304", "403", "203"], "*": R }], [u, w]],
          [/vivo (\w+)(?: bui|\))/i, /\b(v[12]\d{3}\w?[at])(?: bui|;)/i],
          [d, [m, "Vivo"], [u, h]],
          [/\b(rmx[1-3]\d{3})(?: bui|;|\))/i],
          [d, [m, "Realme"], [u, h]],
          [
            /\b(milestone|droid(?:[2-4x]| (?:bionic|x2|pro|razr))?:?( 4g)?)\b[\w ]+build\//i,
            /\bmot(?:orola)?[- ](\w*)/i,
            /((?:moto(?! 360)[\w\(\) ]+|xt\d{3,4}|nexus 6)(?= bui|\)))/i,
          ],
          [d, [m, M], [u, h]],
          [/\b(mz60\d|xoom[2 ]{0,2}) build\//i],
          [d, [m, M], [u, w]],
          [/((?=lg)?[vl]k\-?\d{3}) bui| 3\.[-\w; ]{10}lg?-([06cv9]{3,4})/i],
          [d, [m, "LG"], [u, w]],
          [
            /(lm(?:-?f100[nv]?|-[\w\.]+)(?= bui|\))|nexus [45])/i,
            /\blg[-e;\/ ]+((?!browser|netcast|android tv|watch)\w+)/i,
            /\blg-?([\d\w]+) bui/i,
          ],
          [d, [m, "LG"], [u, h]],
          [
            /(ideatab[-\w ]+|602lv|d-42a|a101lv|a2109a|a3500-hv|s[56]000|pb-6505[my]|tb-?x?\d{3,4}(?:f[cu]|xu|[av])|yt\d?-[jx]?\d+[lfmx])( bui|;|\)|\/)/i,
            /lenovo ?(b[68]0[08]0-?[hf]?|tab(?:[\w- ]+?)|tb[\w-]{6,7})( bui|;|\)|\/)/i,
          ],
          [d, [m, "Lenovo"], [u, w]],
          [/(nokia) (t[12][01])/i],
          [m, d, [u, w]],
          [
            /(?:maemo|nokia).*(n900|lumia \d+|rm-\d+)/i,
            /nokia[-_ ]?(([-\w\. ]*))/i,
          ],
          [
            [d, /_/g, " "],
            [u, h],
            [m, "Nokia"],
          ],
          [/(pixel (c|tablet))\b/i],
          [d, [m, P], [u, w]],
          [/droid.+; (pixel[\daxl ]{0,6})(?: bui|\))/i],
          [d, [m, P], [u, h]],
          [
            /droid.+; (a?\d[0-2]{2}so|[c-g]\d{4}|so[-gl]\w+|xq-a\w[4-7][12])(?= bui|\).+chrome\/(?![1-6]{0,1}\d\.))/i,
          ],
          [d, [m, L], [u, h]],
          [/sony tablet [ps]/i, /\b(?:sony)?sgp\w+(?: bui|\))/i],
          [
            [d, "Xperia Tablet"],
            [m, L],
            [u, w],
          ],
          [
            / (kb2005|in20[12]5|be20[12][59])\b/i,
            /(?:one)?(?:plus)? (a\d0\d\d)(?: b|\))/i,
          ],
          [d, [m, F], [u, h]],
          [
            /(alexa)webm/i,
            /(kf[a-z]{2}wi|aeo(?!bc)\w\w)( bui|\))/i,
            /(kf[a-z]+)( bui|\)).+silk\//i,
          ],
          [d, [m, x], [u, w]],
          [/((?:sd|kf)[0349hijorstuw]+)( bui|\)).+silk\//i],
          [
            [d, /(.+)/g, "Fire Phone $1"],
            [m, x],
            [u, h],
          ],
          [/(playbook);[-\w\),; ]+(rim)/i],
          [d, m, [u, w]],
          [/\b((?:bb[a-f]|st[hv])100-\d)/i, /\(bb10; (\w+)/i],
          [d, [m, S], [u, h]],
          [
            /(?:\b|asus_)(transfo[prime ]{4,10} \w+|eeepc|slider \w+|nexus 7|padfone|p00[cj])/i,
          ],
          [d, [m, C], [u, w]],
          [/ (z[bes]6[027][012][km][ls]|zenfone \d\w?)\b/i],
          [d, [m, C], [u, h]],
          [/(nexus 9)/i],
          [d, [m, "HTC"], [u, w]],
          [
            /(htc)[-;_ ]{1,2}([\w ]+(?=\)| bui)|\w+)/i,
            /(zte)[- ]([\w ]+?)(?: bui|\/|\))/i,
            /(alcatel|geeksphone|nexian|panasonic(?!(?:;|\.))|sony(?!-bra))[-_ ]?([-\w]*)/i,
          ],
          [m, [d, /_/g, " "], [u, h]],
          [
            /droid [\w\.]+; ((?:8[14]9[16]|9(?:0(?:48|60|8[01])|1(?:3[27]|66)|2(?:6[69]|9[56])|466))[gqswx])\w*(\)| bui)/i,
          ],
          [d, [m, "TCL"], [u, w]],
          [/(itel) ((\w+))/i],
          [[m, Y], d, [u, X, { tablet: ["p10001l", "w7001"], "*": "mobile" }]],
          [/droid.+; ([ab][1-7]-?[0178a]\d\d?)/i],
          [d, [m, "Acer"], [u, w]],
          [/droid.+; (m[1-5] note) bui/i, /\bmz-([-\w]{2,})/i],
          [d, [m, "Meizu"], [u, h]],
          [/; ((?:power )?armor(?:[\w ]{0,8}))(?: bui|\))/i],
          [d, [m, "Ulefone"], [u, h]],
          [/; (energy ?\w+)(?: bui|\))/i, /; energizer ([\w ]+)(?: bui|\))/i],
          [d, [m, "Energizer"], [u, h]],
          [/; cat (b35);/i, /; (b15q?|s22 flip|s48c|s62 pro)(?: bui|\))/i],
          [d, [m, "Cat"], [u, h]],
          [/((?:new )?andromax[\w- ]+)(?: bui|\))/i],
          [d, [m, "Smartfren"], [u, h]],
          [/droid.+; (a(?:015|06[35]|142p?))/i],
          [d, [m, "Nothing"], [u, h]],
          [
            /; (x67 5g|tikeasy \w+|ac[1789]\d\w+)( b|\))/i,
            /archos ?(5|gamepad2?|([\w ]*[t1789]|hello) ?\d+[\w ]*)( b|\))/i,
          ],
          [d, [m, "Archos"], [u, w]],
          [/archos ([\w ]+)( b|\))/i, /; (ac[3-6]\d\w{2,8})( b|\))/i],
          [d, [m, "Archos"], [u, h]],
          [/(imo) (tab \w+)/i, /(infinix) (x1101b?)/i],
          [m, d, [u, w]],
          [
            /(blackberry|benq|palm(?=\-)|sonyericsson|acer|asus(?! zenw)|dell|jolla|meizu|motorola|polytron|infinix|tecno|micromax|advan)[-_ ]?([-\w]*)/i,
            /; (hmd|imo) ([\w ]+?)(?: bui|\))/i,
            /(hp) ([\w ]+\w)/i,
            /(microsoft); (lumia[\w ]+)/i,
            /(lenovo)[-_ ]?([-\w ]+?)(?: bui|\)|\/)/i,
            /(oppo) ?([\w ]+) bui/i,
          ],
          [m, d, [u, h]],
          [
            /(kobo)\s(ereader|touch)/i,
            /(hp).+(touchpad(?!.+tablet)|tablet)/i,
            /(kindle)\/([\w\.]+)/i,
            /(nook)[\w ]+build\/(\w+)/i,
            /(dell) (strea[kpr\d ]*[\dko])/i,
            /(le[- ]+pan)[- ]+(\w{1,9}) bui/i,
            /(trinity)[- ]*(t\d{3}) bui/i,
            /(gigaset)[- ]+(q\w{1,9}) bui/i,
            /(vodafone) ([\w ]+)(?:\)| bui)/i,
          ],
          [m, d, [u, w]],
          [/(surface duo)/i],
          [d, [m, T], [u, w]],
          [/droid [\d\.]+; (fp\du?)(?: b|\))/i],
          [d, [m, "Fairphone"], [u, h]],
          [/(u304aa)/i],
          [d, [m, "AT&T"], [u, h]],
          [/\bsie-(\w*)/i],
          [d, [m, "Siemens"], [u, h]],
          [/\b(rct\w+) b/i],
          [d, [m, "RCA"], [u, w]],
          [/\b(venue[\d ]{2,7}) b/i],
          [d, [m, "Dell"], [u, w]],
          [/\b(q(?:mv|ta)\w+) b/i],
          [d, [m, "Verizon"], [u, w]],
          [/\b(?:barnes[& ]+noble |bn[rt])([\w\+ ]*) b/i],
          [d, [m, "Barnes & Noble"], [u, w]],
          [/\b(tm\d{3}\w+) b/i],
          [d, [m, "NuVision"], [u, w]],
          [/\b(k88) b/i],
          [d, [m, "ZTE"], [u, w]],
          [/\b(nx\d{3}j) b/i],
          [d, [m, "ZTE"], [u, h]],
          [/\b(gen\d{3}) b.+49h/i],
          [d, [m, "Swiss"], [u, h]],
          [/\b(zur\d{3}) b/i],
          [d, [m, "Swiss"], [u, w]],
          [/\b((zeki)?tb.*\b) b/i],
          [d, [m, "Zeki"], [u, w]],
          [/\b([yr]\d{2}) b/i, /\b(dragon[- ]+touch |dt)(\w{5}) b/i],
          [[m, "Dragon Touch"], d, [u, w]],
          [/\b(ns-?\w{0,9}) b/i],
          [d, [m, "Insignia"], [u, w]],
          [/\b((nxa|next)-?\w{0,9}) b/i],
          [d, [m, "NextBook"], [u, w]],
          [/\b(xtreme\_)?(v(1[045]|2[015]|[3469]0|7[05])) b/i],
          [[m, "Voice"], d, [u, h]],
          [/\b(lvtel\-)?(v1[12]) b/i],
          [[m, "LvTel"], d, [u, h]],
          [/\b(ph-1) /i],
          [d, [m, "Essential"], [u, h]],
          [/\b(v(100md|700na|7011|917g).*\b) b/i],
          [d, [m, "Envizen"], [u, w]],
          [/\b(trio[-\w\. ]+) b/i],
          [d, [m, "MachSpeed"], [u, w]],
          [/\btu_(1491) b/i],
          [d, [m, "Rotor"], [u, w]],
          [/((?:tegranote|shield t(?!.+d tv))[\w- ]*?)(?: b|\))/i],
          [d, [m, A], [u, w]],
          [/(sprint) (\w+)/i],
          [m, d, [u, h]],
          [/(kin\.[onetw]{3})/i],
          [
            [d, /\./g, " "],
            [m, T],
            [u, h],
          ],
          [/droid.+; (cc6666?|et5[16]|mc[239][23]x?|vc8[03]x?)\)/i],
          [d, [m, D], [u, w]],
          [/droid.+; (ec30|ps20|tc[2-8]\d[kx])\)/i],
          [d, [m, D], [u, h]],
          [/smart-tv.+(samsung)/i],
          [m, [u, v]],
          [/hbbtv.+maple;(\d+)/i],
          [
            [d, /^/, "SmartTV"],
            [m, W],
            [u, v],
          ],
          [/(nux; netcast.+smarttv|lg (netcast\.tv-201\d|android tv))/i],
          [
            [m, "LG"],
            [u, v],
          ],
          [/(apple) ?tv/i],
          [m, [d, k + " TV"], [u, v]],
          [/crkey/i],
          [
            [d, _ + "cast"],
            [m, P],
            [u, v],
          ],
          [/droid.+aft(\w+)( bui|\))/i],
          [d, [m, x], [u, v]],
          [/(shield \w+ tv)/i],
          [d, [m, A], [u, v]],
          [/\(dtv[\);].+(aquos)/i, /(aquos-tv[\w ]+)\)/i],
          [d, [m, V], [u, v]],
          [/(bravia[\w ]+)( bui|\))/i],
          [d, [m, L], [u, v]],
          [/(mi(tv|box)-?\w+) bui/i],
          [d, [m, U], [u, v]],
          [/Hbbtv.*(technisat) (.*);/i],
          [m, d, [u, v]],
          [
            /\b(roku)[\dx]*[\)\/]((?:dvp-)?[\d\.]*)/i,
            /hbbtv\/\d+\.\d+\.\d+ +\([\w\+ ]*; *([\w\d][^;]*);([^;]*)/i,
          ],
          [
            [m, Q],
            [d, Q],
            [u, v],
          ],
          [/droid.+; ([\w- ]+) (?:android tv|smart[- ]?tv)/i],
          [d, [u, v]],
          [/\b(android tv|smart[- ]?tv|opera tv|tv; rv:)\b/i],
          [[u, v]],
          [/(ouya)/i, /(nintendo) ([wids3utch]+)/i],
          [m, d, [u, p]],
          [/droid.+; (shield)( bui|\))/i],
          [d, [m, A], [u, p]],
          [/(playstation \w+)/i],
          [d, [m, L], [u, p]],
          [/\b(xbox(?: one)?(?!; xbox))[\); ]/i],
          [d, [m, T], [u, p]],
          [/\b(sm-[lr]\d\d[0156][fnuw]?s?|gear live)\b/i],
          [d, [m, W], [u, g]],
          [
            /((pebble))app/i,
            /(asus|google|lg|oppo) ((pixel |zen)?watch[\w ]*)( bui|\))/i,
          ],
          [m, d, [u, g]],
          [/(ow(?:19|20)?we?[1-3]{1,3})/i],
          [d, [m, R], [u, g]],
          [/(watch)(?: ?os[,\/]|\d,\d\/)[\d\.]+/i],
          [d, [m, k], [u, g]],
          [/(opwwe\d{3})/i],
          [d, [m, F], [u, g]],
          [/(moto 360)/i],
          [d, [m, M], [u, g]],
          [/(smartwatch 3)/i],
          [d, [m, L], [u, g]],
          [/(g watch r)/i],
          [d, [m, "LG"], [u, g]],
          [/droid.+; (wt63?0{2,3})\)/i],
          [d, [m, D], [u, g]],
          [/droid.+; (glass) \d/i],
          [d, [m, P], [u, g]],
          [/(pico) (4|neo3(?: link|pro)?)/i],
          [m, d, [u, g]],
          [/; (quest( \d| pro)?)/i],
          [d, [m, z], [u, g]],
          [/(tesla)(?: qtcarbrowser|\/[-\w\.]+)/i],
          [m, [u, y]],
          [/(aeobc)\b/i],
          [d, [m, x], [u, y]],
          [/(homepod).+mac os/i],
          [d, [m, k], [u, y]],
          [/windows iot/i],
          [[u, y]],
          [/droid .+?; ([^;]+?)(?: bui|; wv\)|\) applew).+? mobile safari/i],
          [d, [u, h]],
          [/droid .+?; ([^;]+?)(?: bui|\) applew).+?(?! mobile) safari/i],
          [d, [u, w]],
          [/\b((tablet|tab)[;\/]|focus\/\d(?!.+mobile))/i],
          [[u, w]],
          [/(phone|mobile(?:[;\/]| [ \w\/\.]*safari)|pda(?=.+windows ce))/i],
          [[u, h]],
          [/droid .+?; ([\w\. -]+)( bui|\))/i],
          [d, [m, "Generic"]],
        ],
        engine: [
          [/windows.+ edge\/([\w\.]+)/i],
          [f, [c, "EdgeHTML"]],
          [/(arkweb)\/([\w\.]+)/i],
          [c, f],
          [/webkit\/537\.36.+chrome\/(?!27)([\w\.]+)/i],
          [f, [c, "Blink"]],
          [
            /(presto)\/([\w\.]+)/i,
            /(webkit|trident|netfront|netsurf|amaya|lynx|w3m|goanna|servo)\/([\w\.]+)/i,
            /ekioh(flow)\/([\w\.]+)/i,
            /(khtml|tasman|links)[\/ ]\(?([\w\.]+)/i,
            /(icab)[\/ ]([23]\.[\d\.]+)/i,
            /\b(libweb)/i,
          ],
          [c, f],
          [/ladybird\//i],
          [[c, "LibWeb"]],
          [/rv\:([\w\.]{1,9})\b.+(gecko)/i],
          [f, c],
        ],
        os: [
          [/microsoft (windows) (vista|xp)/i],
          [c, f],
          [/(windows (?:phone(?: os)?|mobile|iot))[\/ ]?([\d\.\w ]*)/i],
          [c, [f, X, J]],
          [
            /windows nt 6\.2; (arm)/i,
            /windows[\/ ]([ntce\d\. ]+\w)(?!.+xbox)/i,
            /(?:win(?=3|9|n)|win 9x )([nt\d\.]+)/i,
          ],
          [
            [f, X, J],
            [c, "Windows"],
          ],
          [
            /[adehimnop]{4,7}\b(?:.*os ([\w]+) like mac|; opera)/i,
            /(?:ios;fbsv\/|iphone.+ios[\/ ])([\d\.]+)/i,
            /cfnetwork\/.+darwin/i,
          ],
          [
            [f, /_/g, "."],
            [c, "iOS"],
          ],
          [/(mac os x) ?([\w\. ]*)/i, /(macintosh|mac_powerpc\b)(?!.+haiku)/i],
          [
            [c, q],
            [f, /_/g, "."],
          ],
          [/droid ([\w\.]+)\b.+(android[- ]x86|harmonyos)/i],
          [f, c],
          [/(ubuntu) ([\w\.]+) like android/i],
          [[c, /(.+)/, "$1 Touch"], f],
          [
            /(android|bada|blackberry|kaios|maemo|meego|openharmony|qnx|rim tablet os|sailfish|series40|symbian|tizen|webos)\w*[-\/; ]?([\d\.]*)/i,
          ],
          [c, f],
          [/\(bb(10);/i],
          [f, [c, S]],
          [/(?:symbian ?os|symbos|s60(?=;)|series ?60)[-\/ ]?([\w\.]*)/i],
          [f, [c, "Symbian"]],
          [
            /mozilla\/[\d\.]+ \((?:mobile|tablet|tv|mobile; [\w ]+); rv:.+ gecko\/([\w\.]+)/i,
          ],
          [f, [c, j + " OS"]],
          [/web0s;.+rt(tv)/i, /\b(?:hp)?wos(?:browser)?\/([\w\.]+)/i],
          [f, [c, "webOS"]],
          [/watch(?: ?os[,\/]|\d,\d\/)([\d\.]+)/i],
          [f, [c, "watchOS"]],
          [/crkey\/([\d\.]+)/i],
          [f, [c, _ + "cast"]],
          [/(cros) [\w]+(?:\)| ([\w\.]+)\b)/i],
          [[c, B], f],
          [
            /panasonic;(viera)/i,
            /(netrange)mmh/i,
            /(nettv)\/(\d+\.[\w\.]+)/i,
            /(nintendo|playstation) ([wids345portablevuch]+)/i,
            /(xbox); +xbox ([^\);]+)/i,
            /\b(joli|palm)\b ?(?:os)?\/?([\w\.]*)/i,
            /(mint)[\/\(\) ]?(\w*)/i,
            /(mageia|vectorlinux)[; ]/i,
            /([kxln]?ubuntu|debian|suse|opensuse|gentoo|arch(?= linux)|slackware|fedora|mandriva|centos|pclinuxos|red ?hat|zenwalk|linpus|raspbian|plan 9|minix|risc os|contiki|deepin|manjaro|elementary os|sabayon|linspire)(?: gnu\/linux)?(?: enterprise)?(?:[- ]linux)?(?:-gnu)?[-\/ ]?(?!chrom|package)([-\w\.]*)/i,
            /(hurd|linux)(?: arm\w*| x86\w*| ?)([\w\.]*)/i,
            /(gnu) ?([\w\.]*)/i,
            /\b([-frentopcghs]{0,5}bsd|dragonfly)[\/ ]?(?!amd|[ix346]{1,2}86)([\w\.]*)/i,
            /(haiku) (\w+)/i,
          ],
          [c, f],
          [/(sunos) ?([\w\.\d]*)/i],
          [[c, "Solaris"], f],
          [
            /((?:open)?solaris)[-\/ ]?([\w\.]*)/i,
            /(aix) ((\d)(?=\.|\)| )[\w\.])*/i,
            /\b(beos|os\/2|amigaos|morphos|openvms|fuchsia|hp-ux|serenityos)/i,
            /(unix) ?([\w\.]*)/i,
          ],
          [c, f],
        ],
      },
      et = function (e, t) {
        if ((typeof e === o && ((t = e), (e = void 0)), !(this instanceof et)))
          return new et(e, t).getResult();
        var i = typeof r !== a && r.navigator ? r.navigator : void 0,
          p = e || (i && i.userAgent ? i.userAgent : ""),
          v = i && i.userAgentData ? i.userAgentData : void 0,
          g = t ? $(ee, t) : ee,
          y = i && i.userAgent == p;
        return (
          (this.getBrowser = function () {
            var e,
              t = {};
            return (
              (t[c] = void 0),
              (t[f] = void 0),
              Z.call(t, p, g.browser),
              (t[l] =
                typeof (e = t[f]) === s
                  ? e.replace(/[^\d\.]/g, "").split(".")[0]
                  : void 0),
              y &&
                i &&
                i.brave &&
                typeof i.brave.isBrave == n &&
                (t[c] = "Brave"),
              t
            );
          }),
          (this.getCPU = function () {
            var e = {};
            return ((e[b] = void 0), Z.call(e, p, g.cpu), e);
          }),
          (this.getDevice = function () {
            var e = {};
            return (
              (e[m] = void 0),
              (e[d] = void 0),
              (e[u] = void 0),
              Z.call(e, p, g.device),
              y && !e[u] && v && v.mobile && (e[u] = h),
              y &&
                "Macintosh" == e[d] &&
                i &&
                typeof i.standalone !== a &&
                i.maxTouchPoints &&
                i.maxTouchPoints > 2 &&
                ((e[d] = "iPad"), (e[u] = w)),
              e
            );
          }),
          (this.getEngine = function () {
            var e = {};
            return (
              (e[c] = void 0),
              (e[f] = void 0),
              Z.call(e, p, g.engine),
              e
            );
          }),
          (this.getOS = function () {
            var e = {};
            return (
              (e[c] = void 0),
              (e[f] = void 0),
              Z.call(e, p, g.os),
              y &&
                !e[c] &&
                v &&
                v.platform &&
                "Unknown" != v.platform &&
                (e[c] = v.platform
                  .replace(/chrome os/i, B)
                  .replace(/macos/i, q)),
              e
            );
          }),
          (this.getResult = function () {
            return {
              ua: this.getUA(),
              browser: this.getBrowser(),
              engine: this.getEngine(),
              os: this.getOS(),
              device: this.getDevice(),
              cpu: this.getCPU(),
            };
          }),
          (this.getUA = function () {
            return p;
          }),
          (this.setUA = function (e) {
            return (
              (p = typeof e === s && e.length > 500 ? Q(e, 500) : e),
              this
            );
          }),
          this.setUA(p),
          this
        );
      };
    if (
      ((et.VERSION = "1.0.41"),
      (et.BROWSER = K([c, f, l])),
      (et.CPU = K([b])),
      (et.DEVICE = K([d, m, u, p, h, v, w, g, y])),
      (et.ENGINE = et.OS = K([c, f])),
      typeof i !== a)
    )
      (t.exports && (i = t.exports = et), (i.UAParser = et));
    else if (typeof define === n && define.amd) (e.r, void 0 !== et && e.v(et));
    else typeof r !== a && (r.UAParser = et);
    var ei = typeof r !== a && (r.jQuery || r.Zepto);
    if (ei && !ei.ua) {
      var er = new et();
      ((ei.ua = er.getResult()),
        (ei.ua.get = function () {
          return er.getUA();
        }),
        (ei.ua.set = function (e) {
          er.setUA(e);
          var t = er.getResult();
          for (var i in t) ei.ua[i] = t[i];
        }));
    }
  })("object" == typeof window ? window : e.e);
};
