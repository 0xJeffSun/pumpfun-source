// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e, t, i) => {
  !(function (n) {
    "use strict";
    var r = "function",
      o = "undefined",
      a = "object",
      s = "string",
      l = "major",
      c = "model",
      d = "name",
      u = "type",
      h = "vendor",
      w = "version",
      m = "architecture",
      p = "console",
      b = "mobile",
      f = "tablet",
      g = "smarttv",
      v = "wearable",
      y = "embedded",
      C = "Amazon",
      A = "Apple",
      x = "ASUS",
      k = "BlackBerry",
      E = "Browser",
      T = "Chrome",
      O = "Firefox",
      P = "Google",
      S = "Honor",
      j = "Huawei",
      _ = "Microsoft",
      I = "Motorola",
      N = "Nvidia",
      z = "OnePlus",
      M = "Opera",
      W = "OPPO",
      L = "Samsung",
      U = "Sharp",
      R = "Sony",
      F = "Xiaomi",
      D = "Zebra",
      V = "Facebook",
      B = "Chromium OS",
      q = "Mac OS",
      G = " Browser",
      Y = function (e, t) {
        var i = {};
        for (var n in e)
          t[n] && t[n].length % 2 == 0
            ? (i[n] = t[n].concat(e[n]))
            : (i[n] = e[n]);
        return i;
      },
      X = function (e) {
        for (var t = {}, i = 0; i < e.length; i++) t[e[i].toUpperCase()] = e[i];
        return t;
      },
      J = function (e, t) {
        return typeof e === s && -1 !== Z(t).indexOf(Z(e));
      },
      Z = function (e) {
        return e.toLowerCase();
      },
      H = function (e, t) {
        if (typeof e === s)
          return (
            (e = e.replace(/^\s\s*/, "")),
            typeof t === o ? e : e.substring(0, 500)
          );
      },
      $ = function (e, t) {
        for (var i, n, o, s, l, c, d = 0; d < t.length && !l; ) {
          var u = t[d],
            h = t[d + 1];
          for (i = n = 0; i < u.length && !l && u[i]; )
            if ((l = u[i++].exec(e)))
              for (o = 0; o < h.length; o++)
                ((c = l[++n]),
                  typeof (s = h[o]) === a && s.length > 0
                    ? 2 === s.length
                      ? typeof s[1] == r
                        ? (this[s[0]] = s[1].call(this, c))
                        : (this[s[0]] = s[1])
                      : 3 === s.length
                        ? typeof s[1] !== r || (s[1].exec && s[1].test)
                          ? (this[s[0]] = c ? c.replace(s[1], s[2]) : void 0)
                          : (this[s[0]] = c ? s[1].call(this, c, s[2]) : void 0)
                        : 4 === s.length &&
                          (this[s[0]] = c
                            ? s[3].call(this, c.replace(s[1], s[2]))
                            : void 0)
                    : (this[s] = c || void 0));
          d += 2;
        }
      },
      Q = function (e, t) {
        for (var i in t)
          if (typeof t[i] === a && t[i].length > 0) {
            for (var n = 0; n < t[i].length; n++)
              if (J(t[i][n], e)) return "?" === i ? void 0 : i;
          } else if (J(t[i], e)) return "?" === i ? void 0 : i;
        return t.hasOwnProperty("*") ? t["*"] : e;
      },
      K = {
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
          [w, [d, "Chrome"]],
          [/edg(?:e|ios|a)?\/([\w\.]+)/i],
          [w, [d, "Edge"]],
          [
            /(opera mini)\/([-\w\.]+)/i,
            /(opera [mobiletab]{3,6})\b.+version\/([-\w\.]+)/i,
            /(opera)(?:.+version\/|[\/ ]+)([\w\.]+)/i,
          ],
          [d, w],
          [/opios[\/ ]+([\w\.]+)/i],
          [w, [d, M + " Mini"]],
          [/\bop(?:rg)?x\/([\w\.]+)/i],
          [w, [d, M + " GX"]],
          [/\bopr\/([\w\.]+)/i],
          [w, [d, M]],
          [/\bb[ai]*d(?:uhd|[ub]*[aekoprswx]{5,6})[\/ ]?([\w\.]+)/i],
          [w, [d, "Baidu"]],
          [/\b(?:mxbrowser|mxios|myie2)\/?([-\w\.]*)\b/i],
          [w, [d, "Maxthon"]],
          [
            /(kindle)\/([\w\.]+)/i,
            /(lunascape|maxthon|netfront|jasmine|blazer|sleipnir)[\/ ]?([\w\.]*)/i,
            /(avant|iemobile|slim(?:browser|boat|jet))[\/ ]?([\d\.]*)/i,
            /(?:ms|\()(ie) ([\w\.]+)/i,
            /(flock|rockmelt|midori|epiphany|silk|skyfire|ovibrowser|bolt|iron|vivaldi|iridium|phantomjs|bowser|qupzilla|falkon|rekonq|puffin|brave|whale(?!.+naver)|qqbrowserlite|duckduckgo|klar|helio|(?=comodo_)?dragon)\/([-\w\.]+)/i,
            /(heytap|ovi|115)browser\/([\d\.]+)/i,
            /(weibo)__([\d\.]+)/i,
          ],
          [d, w],
          [/quark(?:pc)?\/([-\w\.]+)/i],
          [w, [d, "Quark"]],
          [/\bddg\/([\w\.]+)/i],
          [w, [d, "DuckDuckGo"]],
          [/(?:\buc? ?browser|(?:juc.+)ucweb)[\/ ]?([\w\.]+)/i],
          [w, [d, "UC" + E]],
          [
            /microm.+\bqbcore\/([\w\.]+)/i,
            /\bqbcore\/([\w\.]+).+microm/i,
            /micromessenger\/([\w\.]+)/i,
          ],
          [w, [d, "WeChat"]],
          [/konqueror\/([\w\.]+)/i],
          [w, [d, "Konqueror"]],
          [/trident.+rv[: ]([\w\.]{1,9})\b.+like gecko/i],
          [w, [d, "IE"]],
          [/ya(?:search)?browser\/([\w\.]+)/i],
          [w, [d, "Yandex"]],
          [/slbrowser\/([\w\.]+)/i],
          [w, [d, "Smart Lenovo " + E]],
          [/(avast|avg)\/([\w\.]+)/i],
          [[d, /(.+)/, "$1 Secure " + E], w],
          [/\bfocus\/([\w\.]+)/i],
          [w, [d, O + " Focus"]],
          [/\bopt\/([\w\.]+)/i],
          [w, [d, M + " Touch"]],
          [/coc_coc\w+\/([\w\.]+)/i],
          [w, [d, "Coc Coc"]],
          [/dolfin\/([\w\.]+)/i],
          [w, [d, "Dolphin"]],
          [/coast\/([\w\.]+)/i],
          [w, [d, M + " Coast"]],
          [/miuibrowser\/([\w\.]+)/i],
          [w, [d, "MIUI" + G]],
          [/fxios\/([\w\.-]+)/i],
          [w, [d, O]],
          [/\bqihoobrowser\/?([\w\.]*)/i],
          [w, [d, "360"]],
          [/\b(qq)\/([\w\.]+)/i],
          [[d, /(.+)/, "$1Browser"], w],
          [/(oculus|sailfish|huawei|vivo|pico)browser\/([\w\.]+)/i],
          [[d, /(.+)/, "$1" + G], w],
          [/samsungbrowser\/([\w\.]+)/i],
          [w, [d, L + " Internet"]],
          [/metasr[\/ ]?([\d\.]+)/i],
          [w, [d, "Sogou Explorer"]],
          [/(sogou)mo\w+\/([\d\.]+)/i],
          [[d, "Sogou Mobile"], w],
          [
            /(electron)\/([\w\.]+) safari/i,
            /(tesla)(?: qtcarbrowser|\/(20\d\d\.[-\w\.]+))/i,
            /m?(qqbrowser|2345(?=browser|chrome|explorer))\w*[\/ ]?v?([\w\.]+)/i,
          ],
          [d, w],
          [/(lbbrowser|rekonq)/i, /\[(linkedin)app\]/i],
          [d],
          [
            /ome\/([\w\.]+) \w* ?(iron) saf/i,
            /ome\/([\w\.]+).+qihu (360)[es]e/i,
          ],
          [w, d],
          [/((?:fban\/fbios|fb_iab\/fb4a)(?!.+fbav)|;fbav\/([\w\.]+);)/i],
          [[d, V], w],
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
          [d, w],
          [/\bgsa\/([\w\.]+) .*safari\//i],
          [w, [d, "GSA"]],
          [/musical_ly(?:.+app_?version\/|_)([\w\.]+)/i],
          [w, [d, "TikTok"]],
          [/headlesschrome(?:\/([\w\.]+)| )/i],
          [w, [d, T + " Headless"]],
          [/ wv\).+(chrome)\/([\w\.]+)/i],
          [[d, T + " WebView"], w],
          [/droid.+ version\/([\w\.]+)\b.+(?:mobile safari|safari)/i],
          [w, [d, "Android " + E]],
          [/(chrome|omniweb|arora|[tizenoka]{5} ?browser)\/v?([\w\.]+)/i],
          [d, w],
          [/version\/([\w\.\,]+) .*mobile\/\w+ (safari)/i],
          [w, [d, "Mobile Safari"]],
          [/version\/([\w(\.|\,)]+) .*(mobile ?safari|safari)/i],
          [w, d],
          [/webkit.+?(mobile ?safari|safari)(\/[\w\.]+)/i],
          [
            d,
            [
              w,
              Q,
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
          [d, w],
          [/(navigator|netscape\d?)\/([-\w\.]+)/i],
          [[d, "Netscape"], w],
          [/(wolvic|librewolf)\/([\w\.]+)/i],
          [d, w],
          [/mobile vr; rv:([\w\.]+)\).+firefox/i],
          [w, [d, O + " Reality"]],
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
          [d, [w, /_/g, "."]],
          [/(cobalt)\/([\w\.]+)/i],
          [d, [w, /master.|lts./, ""]],
        ],
        cpu: [
          [/\b((amd|x|x86[-_]?|wow|win)64)\b/i],
          [[m, "amd64"]],
          [/(ia32(?=;))/i, /\b((i[346]|x)86)(pc)?\b/i],
          [[m, "ia32"]],
          [/\b(aarch64|arm(v?[89]e?l?|_?64))\b/i],
          [[m, "arm64"]],
          [/\b(arm(v[67])?ht?n?[fl]p?)\b/i],
          [[m, "armhf"]],
          [/( (ce|mobile); ppc;|\/[\w\.]+arm\b)/i],
          [[m, "arm"]],
          [/((ppc|powerpc)(64)?)( mac|;|\))/i],
          [[m, /ower/, "", Z]],
          [/ sun4\w[;\)]/i],
          [[m, "sparc"]],
          [
            /\b(avr32|ia64(?=;)|68k(?=\))|\barm(?=v([1-7]|[5-7]1)l?|;|eabi)|(irix|mips|sparc)(64)?\b|pa-risc)/i,
          ],
          [[m, Z]],
        ],
        device: [
          [
            /\b(sch-i[89]0\d|shw-m380s|sm-[ptx]\w{2,4}|gt-[pn]\d{2,4}|sgh-t8[56]9|nexus 10)/i,
          ],
          [c, [h, L], [u, f]],
          [
            /\b((?:s[cgp]h|gt|sm)-(?![lr])\w+|sc[g-]?[\d]+a?|galaxy nexus)/i,
            /samsung[- ]((?!sm-[lr])[-\w]+)/i,
            /sec-(sgh\w+)/i,
          ],
          [c, [h, L], [u, b]],
          [/(?:\/|\()(ip(?:hone|od)[\w, ]*)(?:\/|;)/i],
          [c, [h, A], [u, b]],
          [
            /\((ipad);[-\w\),; ]+apple/i,
            /applecoremedia\/[\w\.]+ \((ipad)/i,
            /\b(ipad)\d\d?,\d\d?[;\]].+ios/i,
          ],
          [c, [h, A], [u, f]],
          [/(macintosh);/i],
          [c, [h, A]],
          [/\b(sh-?[altvz]?\d\d[a-ekm]?)/i],
          [c, [h, U], [u, b]],
          [
            /\b((?:brt|eln|hey2?|gdi|jdn)-a?[lnw]09|(?:ag[rm]3?|jdn2|kob2)-a?[lw]0[09]hn)(?: bui|\)|;)/i,
          ],
          [c, [h, S], [u, f]],
          [/honor([-\w ]+)[;\)]/i],
          [c, [h, S], [u, b]],
          [
            /\b((?:ag[rs][2356]?k?|bah[234]?|bg[2o]|bt[kv]|cmr|cpn|db[ry]2?|jdn2|got|kob2?k?|mon|pce|scm|sht?|[tw]gr|vrd)-[ad]?[lw][0125][09]b?|605hw|bg2-u03|(?:gem|fdr|m2|ple|t1)-[7a]0[1-4][lu]|t1-a2[13][lw]|mediapad[\w\. ]*(?= bui|\)))\b(?!.+d\/s)/i,
          ],
          [c, [h, j], [u, f]],
          [
            /(?:huawei)([-\w ]+)[;\)]/i,
            /\b(nexus 6p|\w{2,4}e?-[atu]?[ln][\dx][012359c][adn]?)\b(?!.+d\/s)/i,
          ],
          [c, [h, j], [u, b]],
          [
            /oid[^\)]+; (2[\dbc]{4}(182|283|rp\w{2})[cgl]|m2105k81a?c)(?: bui|\))/i,
            /\b((?:red)?mi[-_ ]?pad[\w- ]*)(?: bui|\))/i,
          ],
          [
            [c, /_/g, " "],
            [h, F],
            [u, f],
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
            [c, /_/g, " "],
            [h, F],
            [u, b],
          ],
          [
            /; (\w+) bui.+ oppo/i,
            /\b(cph[12]\d{3}|p(?:af|c[al]|d\w|e[ar])[mt]\d0|x9007|a101op)\b/i,
          ],
          [c, [h, W], [u, b]],
          [/\b(opd2(\d{3}a?))(?: bui|\))/i],
          [c, [h, Q, { OnePlus: ["304", "403", "203"], "*": W }], [u, f]],
          [/vivo (\w+)(?: bui|\))/i, /\b(v[12]\d{3}\w?[at])(?: bui|;)/i],
          [c, [h, "Vivo"], [u, b]],
          [/\b(rmx[1-3]\d{3})(?: bui|;|\))/i],
          [c, [h, "Realme"], [u, b]],
          [
            /\b(milestone|droid(?:[2-4x]| (?:bionic|x2|pro|razr))?:?( 4g)?)\b[\w ]+build\//i,
            /\bmot(?:orola)?[- ](\w*)/i,
            /((?:moto(?! 360)[\w\(\) ]+|xt\d{3,4}|nexus 6)(?= bui|\)))/i,
          ],
          [c, [h, I], [u, b]],
          [/\b(mz60\d|xoom[2 ]{0,2}) build\//i],
          [c, [h, I], [u, f]],
          [/((?=lg)?[vl]k\-?\d{3}) bui| 3\.[-\w; ]{10}lg?-([06cv9]{3,4})/i],
          [c, [h, "LG"], [u, f]],
          [
            /(lm(?:-?f100[nv]?|-[\w\.]+)(?= bui|\))|nexus [45])/i,
            /\blg[-e;\/ ]+((?!browser|netcast|android tv|watch)\w+)/i,
            /\blg-?([\d\w]+) bui/i,
          ],
          [c, [h, "LG"], [u, b]],
          [
            /(ideatab[-\w ]+|602lv|d-42a|a101lv|a2109a|a3500-hv|s[56]000|pb-6505[my]|tb-?x?\d{3,4}(?:f[cu]|xu|[av])|yt\d?-[jx]?\d+[lfmx])( bui|;|\)|\/)/i,
            /lenovo ?(b[68]0[08]0-?[hf]?|tab(?:[\w- ]+?)|tb[\w-]{6,7})( bui|;|\)|\/)/i,
          ],
          [c, [h, "Lenovo"], [u, f]],
          [/(nokia) (t[12][01])/i],
          [h, c, [u, f]],
          [
            /(?:maemo|nokia).*(n900|lumia \d+|rm-\d+)/i,
            /nokia[-_ ]?(([-\w\. ]*))/i,
          ],
          [
            [c, /_/g, " "],
            [u, b],
            [h, "Nokia"],
          ],
          [/(pixel (c|tablet))\b/i],
          [c, [h, P], [u, f]],
          [/droid.+; (pixel[\daxl ]{0,6})(?: bui|\))/i],
          [c, [h, P], [u, b]],
          [
            /droid.+; (a?\d[0-2]{2}so|[c-g]\d{4}|so[-gl]\w+|xq-a\w[4-7][12])(?= bui|\).+chrome\/(?![1-6]{0,1}\d\.))/i,
          ],
          [c, [h, R], [u, b]],
          [/sony tablet [ps]/i, /\b(?:sony)?sgp\w+(?: bui|\))/i],
          [
            [c, "Xperia Tablet"],
            [h, R],
            [u, f],
          ],
          [
            / (kb2005|in20[12]5|be20[12][59])\b/i,
            /(?:one)?(?:plus)? (a\d0\d\d)(?: b|\))/i,
          ],
          [c, [h, z], [u, b]],
          [
            /(alexa)webm/i,
            /(kf[a-z]{2}wi|aeo(?!bc)\w\w)( bui|\))/i,
            /(kf[a-z]+)( bui|\)).+silk\//i,
          ],
          [c, [h, C], [u, f]],
          [/((?:sd|kf)[0349hijorstuw]+)( bui|\)).+silk\//i],
          [
            [c, /(.+)/g, "Fire Phone $1"],
            [h, C],
            [u, b],
          ],
          [/(playbook);[-\w\),; ]+(rim)/i],
          [c, h, [u, f]],
          [/\b((?:bb[a-f]|st[hv])100-\d)/i, /\(bb10; (\w+)/i],
          [c, [h, k], [u, b]],
          [
            /(?:\b|asus_)(transfo[prime ]{4,10} \w+|eeepc|slider \w+|nexus 7|padfone|p00[cj])/i,
          ],
          [c, [h, x], [u, f]],
          [/ (z[bes]6[027][012][km][ls]|zenfone \d\w?)\b/i],
          [c, [h, x], [u, b]],
          [/(nexus 9)/i],
          [c, [h, "HTC"], [u, f]],
          [
            /(htc)[-;_ ]{1,2}([\w ]+(?=\)| bui)|\w+)/i,
            /(zte)[- ]([\w ]+?)(?: bui|\/|\))/i,
            /(alcatel|geeksphone|nexian|panasonic(?!(?:;|\.))|sony(?!-bra))[-_ ]?([-\w]*)/i,
          ],
          [h, [c, /_/g, " "], [u, b]],
          [
            /droid [\w\.]+; ((?:8[14]9[16]|9(?:0(?:48|60|8[01])|1(?:3[27]|66)|2(?:6[69]|9[56])|466))[gqswx])\w*(\)| bui)/i,
          ],
          [c, [h, "TCL"], [u, f]],
          [/(itel) ((\w+))/i],
          [[h, Z], c, [u, Q, { tablet: ["p10001l", "w7001"], "*": "mobile" }]],
          [/droid.+; ([ab][1-7]-?[0178a]\d\d?)/i],
          [c, [h, "Acer"], [u, f]],
          [/droid.+; (m[1-5] note) bui/i, /\bmz-([-\w]{2,})/i],
          [c, [h, "Meizu"], [u, b]],
          [/; ((?:power )?armor(?:[\w ]{0,8}))(?: bui|\))/i],
          [c, [h, "Ulefone"], [u, b]],
          [/; (energy ?\w+)(?: bui|\))/i, /; energizer ([\w ]+)(?: bui|\))/i],
          [c, [h, "Energizer"], [u, b]],
          [/; cat (b35);/i, /; (b15q?|s22 flip|s48c|s62 pro)(?: bui|\))/i],
          [c, [h, "Cat"], [u, b]],
          [/((?:new )?andromax[\w- ]+)(?: bui|\))/i],
          [c, [h, "Smartfren"], [u, b]],
          [/droid.+; (a(?:015|06[35]|142p?))/i],
          [c, [h, "Nothing"], [u, b]],
          [
            /; (x67 5g|tikeasy \w+|ac[1789]\d\w+)( b|\))/i,
            /archos ?(5|gamepad2?|([\w ]*[t1789]|hello) ?\d+[\w ]*)( b|\))/i,
          ],
          [c, [h, "Archos"], [u, f]],
          [/archos ([\w ]+)( b|\))/i, /; (ac[3-6]\d\w{2,8})( b|\))/i],
          [c, [h, "Archos"], [u, b]],
          [/(imo) (tab \w+)/i, /(infinix) (x1101b?)/i],
          [h, c, [u, f]],
          [
            /(blackberry|benq|palm(?=\-)|sonyericsson|acer|asus(?! zenw)|dell|jolla|meizu|motorola|polytron|infinix|tecno|micromax|advan)[-_ ]?([-\w]*)/i,
            /; (hmd|imo) ([\w ]+?)(?: bui|\))/i,
            /(hp) ([\w ]+\w)/i,
            /(microsoft); (lumia[\w ]+)/i,
            /(lenovo)[-_ ]?([-\w ]+?)(?: bui|\)|\/)/i,
            /(oppo) ?([\w ]+) bui/i,
          ],
          [h, c, [u, b]],
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
          [h, c, [u, f]],
          [/(surface duo)/i],
          [c, [h, _], [u, f]],
          [/droid [\d\.]+; (fp\du?)(?: b|\))/i],
          [c, [h, "Fairphone"], [u, b]],
          [/(u304aa)/i],
          [c, [h, "AT&T"], [u, b]],
          [/\bsie-(\w*)/i],
          [c, [h, "Siemens"], [u, b]],
          [/\b(rct\w+) b/i],
          [c, [h, "RCA"], [u, f]],
          [/\b(venue[\d ]{2,7}) b/i],
          [c, [h, "Dell"], [u, f]],
          [/\b(q(?:mv|ta)\w+) b/i],
          [c, [h, "Verizon"], [u, f]],
          [/\b(?:barnes[& ]+noble |bn[rt])([\w\+ ]*) b/i],
          [c, [h, "Barnes & Noble"], [u, f]],
          [/\b(tm\d{3}\w+) b/i],
          [c, [h, "NuVision"], [u, f]],
          [/\b(k88) b/i],
          [c, [h, "ZTE"], [u, f]],
          [/\b(nx\d{3}j) b/i],
          [c, [h, "ZTE"], [u, b]],
          [/\b(gen\d{3}) b.+49h/i],
          [c, [h, "Swiss"], [u, b]],
          [/\b(zur\d{3}) b/i],
          [c, [h, "Swiss"], [u, f]],
          [/\b((zeki)?tb.*\b) b/i],
          [c, [h, "Zeki"], [u, f]],
          [/\b([yr]\d{2}) b/i, /\b(dragon[- ]+touch |dt)(\w{5}) b/i],
          [[h, "Dragon Touch"], c, [u, f]],
          [/\b(ns-?\w{0,9}) b/i],
          [c, [h, "Insignia"], [u, f]],
          [/\b((nxa|next)-?\w{0,9}) b/i],
          [c, [h, "NextBook"], [u, f]],
          [/\b(xtreme\_)?(v(1[045]|2[015]|[3469]0|7[05])) b/i],
          [[h, "Voice"], c, [u, b]],
          [/\b(lvtel\-)?(v1[12]) b/i],
          [[h, "LvTel"], c, [u, b]],
          [/\b(ph-1) /i],
          [c, [h, "Essential"], [u, b]],
          [/\b(v(100md|700na|7011|917g).*\b) b/i],
          [c, [h, "Envizen"], [u, f]],
          [/\b(trio[-\w\. ]+) b/i],
          [c, [h, "MachSpeed"], [u, f]],
          [/\btu_(1491) b/i],
          [c, [h, "Rotor"], [u, f]],
          [/((?:tegranote|shield t(?!.+d tv))[\w- ]*?)(?: b|\))/i],
          [c, [h, N], [u, f]],
          [/(sprint) (\w+)/i],
          [h, c, [u, b]],
          [/(kin\.[onetw]{3})/i],
          [
            [c, /\./g, " "],
            [h, _],
            [u, b],
          ],
          [/droid.+; (cc6666?|et5[16]|mc[239][23]x?|vc8[03]x?)\)/i],
          [c, [h, D], [u, f]],
          [/droid.+; (ec30|ps20|tc[2-8]\d[kx])\)/i],
          [c, [h, D], [u, b]],
          [/smart-tv.+(samsung)/i],
          [h, [u, g]],
          [/hbbtv.+maple;(\d+)/i],
          [
            [c, /^/, "SmartTV"],
            [h, L],
            [u, g],
          ],
          [/(nux; netcast.+smarttv|lg (netcast\.tv-201\d|android tv))/i],
          [
            [h, "LG"],
            [u, g],
          ],
          [/(apple) ?tv/i],
          [h, [c, A + " TV"], [u, g]],
          [/crkey/i],
          [
            [c, T + "cast"],
            [h, P],
            [u, g],
          ],
          [/droid.+aft(\w+)( bui|\))/i],
          [c, [h, C], [u, g]],
          [/(shield \w+ tv)/i],
          [c, [h, N], [u, g]],
          [/\(dtv[\);].+(aquos)/i, /(aquos-tv[\w ]+)\)/i],
          [c, [h, U], [u, g]],
          [/(bravia[\w ]+)( bui|\))/i],
          [c, [h, R], [u, g]],
          [/(mi(tv|box)-?\w+) bui/i],
          [c, [h, F], [u, g]],
          [/Hbbtv.*(technisat) (.*);/i],
          [h, c, [u, g]],
          [
            /\b(roku)[\dx]*[\)\/]((?:dvp-)?[\d\.]*)/i,
            /hbbtv\/\d+\.\d+\.\d+ +\([\w\+ ]*; *([\w\d][^;]*);([^;]*)/i,
          ],
          [
            [h, H],
            [c, H],
            [u, g],
          ],
          [/droid.+; ([\w- ]+) (?:android tv|smart[- ]?tv)/i],
          [c, [u, g]],
          [/\b(android tv|smart[- ]?tv|opera tv|tv; rv:)\b/i],
          [[u, g]],
          [/(ouya)/i, /(nintendo) ([wids3utch]+)/i],
          [h, c, [u, p]],
          [/droid.+; (shield)( bui|\))/i],
          [c, [h, N], [u, p]],
          [/(playstation \w+)/i],
          [c, [h, R], [u, p]],
          [/\b(xbox(?: one)?(?!; xbox))[\); ]/i],
          [c, [h, _], [u, p]],
          [/\b(sm-[lr]\d\d[0156][fnuw]?s?|gear live)\b/i],
          [c, [h, L], [u, v]],
          [
            /((pebble))app/i,
            /(asus|google|lg|oppo) ((pixel |zen)?watch[\w ]*)( bui|\))/i,
          ],
          [h, c, [u, v]],
          [/(ow(?:19|20)?we?[1-3]{1,3})/i],
          [c, [h, W], [u, v]],
          [/(watch)(?: ?os[,\/]|\d,\d\/)[\d\.]+/i],
          [c, [h, A], [u, v]],
          [/(opwwe\d{3})/i],
          [c, [h, z], [u, v]],
          [/(moto 360)/i],
          [c, [h, I], [u, v]],
          [/(smartwatch 3)/i],
          [c, [h, R], [u, v]],
          [/(g watch r)/i],
          [c, [h, "LG"], [u, v]],
          [/droid.+; (wt63?0{2,3})\)/i],
          [c, [h, D], [u, v]],
          [/droid.+; (glass) \d/i],
          [c, [h, P], [u, v]],
          [/(pico) (4|neo3(?: link|pro)?)/i],
          [h, c, [u, v]],
          [/; (quest( \d| pro)?)/i],
          [c, [h, V], [u, v]],
          [/(tesla)(?: qtcarbrowser|\/[-\w\.]+)/i],
          [h, [u, y]],
          [/(aeobc)\b/i],
          [c, [h, C], [u, y]],
          [/(homepod).+mac os/i],
          [c, [h, A], [u, y]],
          [/windows iot/i],
          [[u, y]],
          [/droid .+?; ([^;]+?)(?: bui|; wv\)|\) applew).+? mobile safari/i],
          [c, [u, b]],
          [/droid .+?; ([^;]+?)(?: bui|\) applew).+?(?! mobile) safari/i],
          [c, [u, f]],
          [/\b((tablet|tab)[;\/]|focus\/\d(?!.+mobile))/i],
          [[u, f]],
          [/(phone|mobile(?:[;\/]| [ \w\/\.]*safari)|pda(?=.+windows ce))/i],
          [[u, b]],
          [/droid .+?; ([\w\. -]+)( bui|\))/i],
          [c, [h, "Generic"]],
        ],
        engine: [
          [/windows.+ edge\/([\w\.]+)/i],
          [w, [d, "EdgeHTML"]],
          [/(arkweb)\/([\w\.]+)/i],
          [d, w],
          [/webkit\/537\.36.+chrome\/(?!27)([\w\.]+)/i],
          [w, [d, "Blink"]],
          [
            /(presto)\/([\w\.]+)/i,
            /(webkit|trident|netfront|netsurf|amaya|lynx|w3m|goanna|servo)\/([\w\.]+)/i,
            /ekioh(flow)\/([\w\.]+)/i,
            /(khtml|tasman|links)[\/ ]\(?([\w\.]+)/i,
            /(icab)[\/ ]([23]\.[\d\.]+)/i,
            /\b(libweb)/i,
          ],
          [d, w],
          [/ladybird\//i],
          [[d, "LibWeb"]],
          [/rv\:([\w\.]{1,9})\b.+(gecko)/i],
          [w, d],
        ],
        os: [
          [/microsoft (windows) (vista|xp)/i],
          [d, w],
          [/(windows (?:phone(?: os)?|mobile|iot))[\/ ]?([\d\.\w ]*)/i],
          [d, [w, Q, K]],
          [
            /windows nt 6\.2; (arm)/i,
            /windows[\/ ]([ntce\d\. ]+\w)(?!.+xbox)/i,
            /(?:win(?=3|9|n)|win 9x )([nt\d\.]+)/i,
          ],
          [
            [w, Q, K],
            [d, "Windows"],
          ],
          [
            /[adehimnop]{4,7}\b(?:.*os ([\w]+) like mac|; opera)/i,
            /(?:ios;fbsv\/|iphone.+ios[\/ ])([\d\.]+)/i,
            /cfnetwork\/.+darwin/i,
          ],
          [
            [w, /_/g, "."],
            [d, "iOS"],
          ],
          [/(mac os x) ?([\w\. ]*)/i, /(macintosh|mac_powerpc\b)(?!.+haiku)/i],
          [
            [d, q],
            [w, /_/g, "."],
          ],
          [/droid ([\w\.]+)\b.+(android[- ]x86|harmonyos)/i],
          [w, d],
          [/(ubuntu) ([\w\.]+) like android/i],
          [[d, /(.+)/, "$1 Touch"], w],
          [
            /(android|bada|blackberry|kaios|maemo|meego|openharmony|qnx|rim tablet os|sailfish|series40|symbian|tizen|webos)\w*[-\/; ]?([\d\.]*)/i,
          ],
          [d, w],
          [/\(bb(10);/i],
          [w, [d, k]],
          [/(?:symbian ?os|symbos|s60(?=;)|series ?60)[-\/ ]?([\w\.]*)/i],
          [w, [d, "Symbian"]],
          [
            /mozilla\/[\d\.]+ \((?:mobile|tablet|tv|mobile; [\w ]+); rv:.+ gecko\/([\w\.]+)/i,
          ],
          [w, [d, O + " OS"]],
          [/web0s;.+rt(tv)/i, /\b(?:hp)?wos(?:browser)?\/([\w\.]+)/i],
          [w, [d, "webOS"]],
          [/watch(?: ?os[,\/]|\d,\d\/)([\d\.]+)/i],
          [w, [d, "watchOS"]],
          [/crkey\/([\d\.]+)/i],
          [w, [d, T + "cast"]],
          [/(cros) [\w]+(?:\)| ([\w\.]+)\b)/i],
          [[d, B], w],
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
          [d, w],
          [/(sunos) ?([\w\.\d]*)/i],
          [[d, "Solaris"], w],
          [
            /((?:open)?solaris)[-\/ ]?([\w\.]*)/i,
            /(aix) ((\d)(?=\.|\)| )[\w\.])*/i,
            /\b(beos|os\/2|amigaos|morphos|openvms|fuchsia|hp-ux|serenityos)/i,
            /(unix) ?([\w\.]*)/i,
          ],
          [d, w],
        ],
      },
      et = function (e, t) {
        if ((typeof e === a && ((t = e), (e = void 0)), !(this instanceof et)))
          return new et(e, t).getResult();
        var i = typeof n !== o && n.navigator ? n.navigator : void 0,
          p = e || (i && i.userAgent ? i.userAgent : ""),
          g = i && i.userAgentData ? i.userAgentData : void 0,
          v = t ? Y(ee, t) : ee,
          y = i && i.userAgent == p;
        return (
          (this.getBrowser = function () {
            var e,
              t = {};
            return (
              (t[d] = void 0),
              (t[w] = void 0),
              $.call(t, p, v.browser),
              (t[l] =
                typeof (e = t[w]) === s
                  ? e.replace(/[^\d\.]/g, "").split(".")[0]
                  : void 0),
              y &&
                i &&
                i.brave &&
                typeof i.brave.isBrave == r &&
                (t[d] = "Brave"),
              t
            );
          }),
          (this.getCPU = function () {
            var e = {};
            return ((e[m] = void 0), $.call(e, p, v.cpu), e);
          }),
          (this.getDevice = function () {
            var e = {};
            return (
              (e[h] = void 0),
              (e[c] = void 0),
              (e[u] = void 0),
              $.call(e, p, v.device),
              y && !e[u] && g && g.mobile && (e[u] = b),
              y &&
                "Macintosh" == e[c] &&
                i &&
                typeof i.standalone !== o &&
                i.maxTouchPoints &&
                i.maxTouchPoints > 2 &&
                ((e[c] = "iPad"), (e[u] = f)),
              e
            );
          }),
          (this.getEngine = function () {
            var e = {};
            return (
              (e[d] = void 0),
              (e[w] = void 0),
              $.call(e, p, v.engine),
              e
            );
          }),
          (this.getOS = function () {
            var e = {};
            return (
              (e[d] = void 0),
              (e[w] = void 0),
              $.call(e, p, v.os),
              y &&
                !e[d] &&
                g &&
                g.platform &&
                "Unknown" != g.platform &&
                (e[d] = g.platform
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
              (p = typeof e === s && e.length > 500 ? H(e, 500) : e),
              this
            );
          }),
          this.setUA(p),
          this
        );
      };
    if (
      ((et.VERSION = "1.0.41"),
      (et.BROWSER = X([d, w, l])),
      (et.CPU = X([m])),
      (et.DEVICE = X([c, h, u, p, b, g, f, v, y])),
      (et.ENGINE = et.OS = X([d, w])),
      typeof i !== o)
    )
      (t.exports && (i = t.exports = et), (i.UAParser = et));
    else if (typeof define === r && define.amd) (e.r, void 0 !== et && e.v(et));
    else typeof n !== o && (n.UAParser = et);
    var ei = typeof n !== o && (n.jQuery || n.Zepto);
    if (ei && !ei.ua) {
      var en = new et();
      ((ei.ua = en.getResult()),
        (ei.ua.get = function () {
          return en.getUA();
        }),
        (ei.ua.set = function (e) {
          en.setUA(e);
          var t = en.getResult();
          for (var i in t) ei.ua[i] = t[i];
        }));
    }
  })("object" == typeof window ? window : e.e);
};
