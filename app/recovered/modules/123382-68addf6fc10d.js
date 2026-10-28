// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e, i, r) => {
  !(function (n) {
    "use strict";
    var t = "function",
      o = "undefined",
      a = "object",
      s = "string",
      u = "major",
      d = "model",
      l = "name",
      c = "type",
      b = "vendor",
      w = "version",
      m = "architecture",
      f = "console",
      p = "mobile",
      h = "tablet",
      v = "smarttv",
      g = "wearable",
      y = "embedded",
      x = "Amazon",
      k = "Apple",
      O = "ASUS",
      E = "BlackBerry",
      S = "Browser",
      P = "Chrome",
      C = "Firefox",
      A = "Google",
      _ = "Honor",
      T = "Huawei",
      j = "Microsoft",
      V = "Motorola",
      W = "Nvidia",
      M = "OnePlus",
      F = "Opera",
      I = "OPPO",
      N = "Samsung",
      U = "Sharp",
      L = "Sony",
      B = "Xiaomi",
      q = "Zebra",
      z = "Facebook",
      D = "Chromium OS",
      R = "Mac OS",
      G = " Browser",
      H = function (e, i) {
        var r = {};
        for (var n in e)
          i[n] && i[n].length % 2 == 0
            ? (r[n] = i[n].concat(e[n]))
            : (r[n] = e[n]);
        return r;
      },
      $ = function (e) {
        for (var i = {}, r = 0; r < e.length; r++) i[e[r].toUpperCase()] = e[r];
        return i;
      },
      Y = function (e, i) {
        return typeof e === s && -1 !== Q(i).indexOf(Q(e));
      },
      Q = function (e) {
        return e.toLowerCase();
      },
      Z = function (e, i) {
        if (typeof e === s)
          return (
            (e = e.replace(/^\s\s*/, "")),
            typeof i === o ? e : e.substring(0, 500)
          );
      },
      K = function (e, i) {
        for (var r, n, o, s, u, d, l = 0; l < i.length && !u; ) {
          var c = i[l],
            b = i[l + 1];
          for (r = n = 0; r < c.length && !u && c[r]; )
            if ((u = c[r++].exec(e)))
              for (o = 0; o < b.length; o++)
                ((d = u[++n]),
                  typeof (s = b[o]) === a && s.length > 0
                    ? 2 === s.length
                      ? typeof s[1] == t
                        ? (this[s[0]] = s[1].call(this, d))
                        : (this[s[0]] = s[1])
                      : 3 === s.length
                        ? typeof s[1] !== t || (s[1].exec && s[1].test)
                          ? (this[s[0]] = d ? d.replace(s[1], s[2]) : void 0)
                          : (this[s[0]] = d ? s[1].call(this, d, s[2]) : void 0)
                        : 4 === s.length &&
                          (this[s[0]] = d
                            ? s[3].call(this, d.replace(s[1], s[2]))
                            : void 0)
                    : (this[s] = d || void 0));
          l += 2;
        }
      },
      X = function (e, i) {
        for (var r in i)
          if (typeof i[r] === a && i[r].length > 0) {
            for (var n = 0; n < i[r].length; n++)
              if (Y(i[r][n], e)) return "?" === r ? void 0 : r;
          } else if (Y(i[r], e)) return "?" === r ? void 0 : r;
        return i.hasOwnProperty("*") ? i["*"] : e;
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
          [w, [l, "Chrome"]],
          [/edg(?:e|ios|a)?\/([\w\.]+)/i],
          [w, [l, "Edge"]],
          [
            /(opera mini)\/([-\w\.]+)/i,
            /(opera [mobiletab]{3,6})\b.+version\/([-\w\.]+)/i,
            /(opera)(?:.+version\/|[\/ ]+)([\w\.]+)/i,
          ],
          [l, w],
          [/opios[\/ ]+([\w\.]+)/i],
          [w, [l, F + " Mini"]],
          [/\bop(?:rg)?x\/([\w\.]+)/i],
          [w, [l, F + " GX"]],
          [/\bopr\/([\w\.]+)/i],
          [w, [l, F]],
          [/\bb[ai]*d(?:uhd|[ub]*[aekoprswx]{5,6})[\/ ]?([\w\.]+)/i],
          [w, [l, "Baidu"]],
          [/\b(?:mxbrowser|mxios|myie2)\/?([-\w\.]*)\b/i],
          [w, [l, "Maxthon"]],
          [
            /(kindle)\/([\w\.]+)/i,
            /(lunascape|maxthon|netfront|jasmine|blazer|sleipnir)[\/ ]?([\w\.]*)/i,
            /(avant|iemobile|slim(?:browser|boat|jet))[\/ ]?([\d\.]*)/i,
            /(?:ms|\()(ie) ([\w\.]+)/i,
            /(flock|rockmelt|midori|epiphany|silk|skyfire|ovibrowser|bolt|iron|vivaldi|iridium|phantomjs|bowser|qupzilla|falkon|rekonq|puffin|brave|whale(?!.+naver)|qqbrowserlite|duckduckgo|klar|helio|(?=comodo_)?dragon)\/([-\w\.]+)/i,
            /(heytap|ovi|115)browser\/([\d\.]+)/i,
            /(weibo)__([\d\.]+)/i,
          ],
          [l, w],
          [/quark(?:pc)?\/([-\w\.]+)/i],
          [w, [l, "Quark"]],
          [/\bddg\/([\w\.]+)/i],
          [w, [l, "DuckDuckGo"]],
          [/(?:\buc? ?browser|(?:juc.+)ucweb)[\/ ]?([\w\.]+)/i],
          [w, [l, "UC" + S]],
          [
            /microm.+\bqbcore\/([\w\.]+)/i,
            /\bqbcore\/([\w\.]+).+microm/i,
            /micromessenger\/([\w\.]+)/i,
          ],
          [w, [l, "WeChat"]],
          [/konqueror\/([\w\.]+)/i],
          [w, [l, "Konqueror"]],
          [/trident.+rv[: ]([\w\.]{1,9})\b.+like gecko/i],
          [w, [l, "IE"]],
          [/ya(?:search)?browser\/([\w\.]+)/i],
          [w, [l, "Yandex"]],
          [/slbrowser\/([\w\.]+)/i],
          [w, [l, "Smart Lenovo " + S]],
          [/(avast|avg)\/([\w\.]+)/i],
          [[l, /(.+)/, "$1 Secure " + S], w],
          [/\bfocus\/([\w\.]+)/i],
          [w, [l, C + " Focus"]],
          [/\bopt\/([\w\.]+)/i],
          [w, [l, F + " Touch"]],
          [/coc_coc\w+\/([\w\.]+)/i],
          [w, [l, "Coc Coc"]],
          [/dolfin\/([\w\.]+)/i],
          [w, [l, "Dolphin"]],
          [/coast\/([\w\.]+)/i],
          [w, [l, F + " Coast"]],
          [/miuibrowser\/([\w\.]+)/i],
          [w, [l, "MIUI" + G]],
          [/fxios\/([\w\.-]+)/i],
          [w, [l, C]],
          [/\bqihoobrowser\/?([\w\.]*)/i],
          [w, [l, "360"]],
          [/\b(qq)\/([\w\.]+)/i],
          [[l, /(.+)/, "$1Browser"], w],
          [/(oculus|sailfish|huawei|vivo|pico)browser\/([\w\.]+)/i],
          [[l, /(.+)/, "$1" + G], w],
          [/samsungbrowser\/([\w\.]+)/i],
          [w, [l, N + " Internet"]],
          [/metasr[\/ ]?([\d\.]+)/i],
          [w, [l, "Sogou Explorer"]],
          [/(sogou)mo\w+\/([\d\.]+)/i],
          [[l, "Sogou Mobile"], w],
          [
            /(electron)\/([\w\.]+) safari/i,
            /(tesla)(?: qtcarbrowser|\/(20\d\d\.[-\w\.]+))/i,
            /m?(qqbrowser|2345(?=browser|chrome|explorer))\w*[\/ ]?v?([\w\.]+)/i,
          ],
          [l, w],
          [/(lbbrowser|rekonq)/i, /\[(linkedin)app\]/i],
          [l],
          [
            /ome\/([\w\.]+) \w* ?(iron) saf/i,
            /ome\/([\w\.]+).+qihu (360)[es]e/i,
          ],
          [w, l],
          [/((?:fban\/fbios|fb_iab\/fb4a)(?!.+fbav)|;fbav\/([\w\.]+);)/i],
          [[l, z], w],
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
          [l, w],
          [/\bgsa\/([\w\.]+) .*safari\//i],
          [w, [l, "GSA"]],
          [/musical_ly(?:.+app_?version\/|_)([\w\.]+)/i],
          [w, [l, "TikTok"]],
          [/headlesschrome(?:\/([\w\.]+)| )/i],
          [w, [l, P + " Headless"]],
          [/ wv\).+(chrome)\/([\w\.]+)/i],
          [[l, P + " WebView"], w],
          [/droid.+ version\/([\w\.]+)\b.+(?:mobile safari|safari)/i],
          [w, [l, "Android " + S]],
          [/(chrome|omniweb|arora|[tizenoka]{5} ?browser)\/v?([\w\.]+)/i],
          [l, w],
          [/version\/([\w\.\,]+) .*mobile\/\w+ (safari)/i],
          [w, [l, "Mobile Safari"]],
          [/version\/([\w(\.|\,)]+) .*(mobile ?safari|safari)/i],
          [w, l],
          [/webkit.+?(mobile ?safari|safari)(\/[\w\.]+)/i],
          [
            l,
            [
              w,
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
          [l, w],
          [/(navigator|netscape\d?)\/([-\w\.]+)/i],
          [[l, "Netscape"], w],
          [/(wolvic|librewolf)\/([\w\.]+)/i],
          [l, w],
          [/mobile vr; rv:([\w\.]+)\).+firefox/i],
          [w, [l, C + " Reality"]],
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
          [l, [w, /_/g, "."]],
          [/(cobalt)\/([\w\.]+)/i],
          [l, [w, /master.|lts./, ""]],
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
          [[m, /ower/, "", Q]],
          [/ sun4\w[;\)]/i],
          [[m, "sparc"]],
          [
            /\b(avr32|ia64(?=;)|68k(?=\))|\barm(?=v([1-7]|[5-7]1)l?|;|eabi)|(irix|mips|sparc)(64)?\b|pa-risc)/i,
          ],
          [[m, Q]],
        ],
        device: [
          [
            /\b(sch-i[89]0\d|shw-m380s|sm-[ptx]\w{2,4}|gt-[pn]\d{2,4}|sgh-t8[56]9|nexus 10)/i,
          ],
          [d, [b, N], [c, h]],
          [
            /\b((?:s[cgp]h|gt|sm)-(?![lr])\w+|sc[g-]?[\d]+a?|galaxy nexus)/i,
            /samsung[- ]((?!sm-[lr])[-\w]+)/i,
            /sec-(sgh\w+)/i,
          ],
          [d, [b, N], [c, p]],
          [/(?:\/|\()(ip(?:hone|od)[\w, ]*)(?:\/|;)/i],
          [d, [b, k], [c, p]],
          [
            /\((ipad);[-\w\),; ]+apple/i,
            /applecoremedia\/[\w\.]+ \((ipad)/i,
            /\b(ipad)\d\d?,\d\d?[;\]].+ios/i,
          ],
          [d, [b, k], [c, h]],
          [/(macintosh);/i],
          [d, [b, k]],
          [/\b(sh-?[altvz]?\d\d[a-ekm]?)/i],
          [d, [b, U], [c, p]],
          [
            /\b((?:brt|eln|hey2?|gdi|jdn)-a?[lnw]09|(?:ag[rm]3?|jdn2|kob2)-a?[lw]0[09]hn)(?: bui|\)|;)/i,
          ],
          [d, [b, _], [c, h]],
          [/honor([-\w ]+)[;\)]/i],
          [d, [b, _], [c, p]],
          [
            /\b((?:ag[rs][2356]?k?|bah[234]?|bg[2o]|bt[kv]|cmr|cpn|db[ry]2?|jdn2|got|kob2?k?|mon|pce|scm|sht?|[tw]gr|vrd)-[ad]?[lw][0125][09]b?|605hw|bg2-u03|(?:gem|fdr|m2|ple|t1)-[7a]0[1-4][lu]|t1-a2[13][lw]|mediapad[\w\. ]*(?= bui|\)))\b(?!.+d\/s)/i,
          ],
          [d, [b, T], [c, h]],
          [
            /(?:huawei)([-\w ]+)[;\)]/i,
            /\b(nexus 6p|\w{2,4}e?-[atu]?[ln][\dx][012359c][adn]?)\b(?!.+d\/s)/i,
          ],
          [d, [b, T], [c, p]],
          [
            /oid[^\)]+; (2[\dbc]{4}(182|283|rp\w{2})[cgl]|m2105k81a?c)(?: bui|\))/i,
            /\b((?:red)?mi[-_ ]?pad[\w- ]*)(?: bui|\))/i,
          ],
          [
            [d, /_/g, " "],
            [b, B],
            [c, h],
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
            [b, B],
            [c, p],
          ],
          [
            /; (\w+) bui.+ oppo/i,
            /\b(cph[12]\d{3}|p(?:af|c[al]|d\w|e[ar])[mt]\d0|x9007|a101op)\b/i,
          ],
          [d, [b, I], [c, p]],
          [/\b(opd2(\d{3}a?))(?: bui|\))/i],
          [d, [b, X, { OnePlus: ["304", "403", "203"], "*": I }], [c, h]],
          [/vivo (\w+)(?: bui|\))/i, /\b(v[12]\d{3}\w?[at])(?: bui|;)/i],
          [d, [b, "Vivo"], [c, p]],
          [/\b(rmx[1-3]\d{3})(?: bui|;|\))/i],
          [d, [b, "Realme"], [c, p]],
          [
            /\b(milestone|droid(?:[2-4x]| (?:bionic|x2|pro|razr))?:?( 4g)?)\b[\w ]+build\//i,
            /\bmot(?:orola)?[- ](\w*)/i,
            /((?:moto(?! 360)[\w\(\) ]+|xt\d{3,4}|nexus 6)(?= bui|\)))/i,
          ],
          [d, [b, V], [c, p]],
          [/\b(mz60\d|xoom[2 ]{0,2}) build\//i],
          [d, [b, V], [c, h]],
          [/((?=lg)?[vl]k\-?\d{3}) bui| 3\.[-\w; ]{10}lg?-([06cv9]{3,4})/i],
          [d, [b, "LG"], [c, h]],
          [
            /(lm(?:-?f100[nv]?|-[\w\.]+)(?= bui|\))|nexus [45])/i,
            /\blg[-e;\/ ]+((?!browser|netcast|android tv|watch)\w+)/i,
            /\blg-?([\d\w]+) bui/i,
          ],
          [d, [b, "LG"], [c, p]],
          [
            /(ideatab[-\w ]+|602lv|d-42a|a101lv|a2109a|a3500-hv|s[56]000|pb-6505[my]|tb-?x?\d{3,4}(?:f[cu]|xu|[av])|yt\d?-[jx]?\d+[lfmx])( bui|;|\)|\/)/i,
            /lenovo ?(b[68]0[08]0-?[hf]?|tab(?:[\w- ]+?)|tb[\w-]{6,7})( bui|;|\)|\/)/i,
          ],
          [d, [b, "Lenovo"], [c, h]],
          [/(nokia) (t[12][01])/i],
          [b, d, [c, h]],
          [
            /(?:maemo|nokia).*(n900|lumia \d+|rm-\d+)/i,
            /nokia[-_ ]?(([-\w\. ]*))/i,
          ],
          [
            [d, /_/g, " "],
            [c, p],
            [b, "Nokia"],
          ],
          [/(pixel (c|tablet))\b/i],
          [d, [b, A], [c, h]],
          [/droid.+; (pixel[\daxl ]{0,6})(?: bui|\))/i],
          [d, [b, A], [c, p]],
          [
            /droid.+; (a?\d[0-2]{2}so|[c-g]\d{4}|so[-gl]\w+|xq-a\w[4-7][12])(?= bui|\).+chrome\/(?![1-6]{0,1}\d\.))/i,
          ],
          [d, [b, L], [c, p]],
          [/sony tablet [ps]/i, /\b(?:sony)?sgp\w+(?: bui|\))/i],
          [
            [d, "Xperia Tablet"],
            [b, L],
            [c, h],
          ],
          [
            / (kb2005|in20[12]5|be20[12][59])\b/i,
            /(?:one)?(?:plus)? (a\d0\d\d)(?: b|\))/i,
          ],
          [d, [b, M], [c, p]],
          [
            /(alexa)webm/i,
            /(kf[a-z]{2}wi|aeo(?!bc)\w\w)( bui|\))/i,
            /(kf[a-z]+)( bui|\)).+silk\//i,
          ],
          [d, [b, x], [c, h]],
          [/((?:sd|kf)[0349hijorstuw]+)( bui|\)).+silk\//i],
          [
            [d, /(.+)/g, "Fire Phone $1"],
            [b, x],
            [c, p],
          ],
          [/(playbook);[-\w\),; ]+(rim)/i],
          [d, b, [c, h]],
          [/\b((?:bb[a-f]|st[hv])100-\d)/i, /\(bb10; (\w+)/i],
          [d, [b, E], [c, p]],
          [
            /(?:\b|asus_)(transfo[prime ]{4,10} \w+|eeepc|slider \w+|nexus 7|padfone|p00[cj])/i,
          ],
          [d, [b, O], [c, h]],
          [/ (z[bes]6[027][012][km][ls]|zenfone \d\w?)\b/i],
          [d, [b, O], [c, p]],
          [/(nexus 9)/i],
          [d, [b, "HTC"], [c, h]],
          [
            /(htc)[-;_ ]{1,2}([\w ]+(?=\)| bui)|\w+)/i,
            /(zte)[- ]([\w ]+?)(?: bui|\/|\))/i,
            /(alcatel|geeksphone|nexian|panasonic(?!(?:;|\.))|sony(?!-bra))[-_ ]?([-\w]*)/i,
          ],
          [b, [d, /_/g, " "], [c, p]],
          [
            /droid [\w\.]+; ((?:8[14]9[16]|9(?:0(?:48|60|8[01])|1(?:3[27]|66)|2(?:6[69]|9[56])|466))[gqswx])\w*(\)| bui)/i,
          ],
          [d, [b, "TCL"], [c, h]],
          [/(itel) ((\w+))/i],
          [[b, Q], d, [c, X, { tablet: ["p10001l", "w7001"], "*": "mobile" }]],
          [/droid.+; ([ab][1-7]-?[0178a]\d\d?)/i],
          [d, [b, "Acer"], [c, h]],
          [/droid.+; (m[1-5] note) bui/i, /\bmz-([-\w]{2,})/i],
          [d, [b, "Meizu"], [c, p]],
          [/; ((?:power )?armor(?:[\w ]{0,8}))(?: bui|\))/i],
          [d, [b, "Ulefone"], [c, p]],
          [/; (energy ?\w+)(?: bui|\))/i, /; energizer ([\w ]+)(?: bui|\))/i],
          [d, [b, "Energizer"], [c, p]],
          [/; cat (b35);/i, /; (b15q?|s22 flip|s48c|s62 pro)(?: bui|\))/i],
          [d, [b, "Cat"], [c, p]],
          [/((?:new )?andromax[\w- ]+)(?: bui|\))/i],
          [d, [b, "Smartfren"], [c, p]],
          [/droid.+; (a(?:015|06[35]|142p?))/i],
          [d, [b, "Nothing"], [c, p]],
          [
            /; (x67 5g|tikeasy \w+|ac[1789]\d\w+)( b|\))/i,
            /archos ?(5|gamepad2?|([\w ]*[t1789]|hello) ?\d+[\w ]*)( b|\))/i,
          ],
          [d, [b, "Archos"], [c, h]],
          [/archos ([\w ]+)( b|\))/i, /; (ac[3-6]\d\w{2,8})( b|\))/i],
          [d, [b, "Archos"], [c, p]],
          [/(imo) (tab \w+)/i, /(infinix) (x1101b?)/i],
          [b, d, [c, h]],
          [
            /(blackberry|benq|palm(?=\-)|sonyericsson|acer|asus(?! zenw)|dell|jolla|meizu|motorola|polytron|infinix|tecno|micromax|advan)[-_ ]?([-\w]*)/i,
            /; (hmd|imo) ([\w ]+?)(?: bui|\))/i,
            /(hp) ([\w ]+\w)/i,
            /(microsoft); (lumia[\w ]+)/i,
            /(lenovo)[-_ ]?([-\w ]+?)(?: bui|\)|\/)/i,
            /(oppo) ?([\w ]+) bui/i,
          ],
          [b, d, [c, p]],
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
          [b, d, [c, h]],
          [/(surface duo)/i],
          [d, [b, j], [c, h]],
          [/droid [\d\.]+; (fp\du?)(?: b|\))/i],
          [d, [b, "Fairphone"], [c, p]],
          [/(u304aa)/i],
          [d, [b, "AT&T"], [c, p]],
          [/\bsie-(\w*)/i],
          [d, [b, "Siemens"], [c, p]],
          [/\b(rct\w+) b/i],
          [d, [b, "RCA"], [c, h]],
          [/\b(venue[\d ]{2,7}) b/i],
          [d, [b, "Dell"], [c, h]],
          [/\b(q(?:mv|ta)\w+) b/i],
          [d, [b, "Verizon"], [c, h]],
          [/\b(?:barnes[& ]+noble |bn[rt])([\w\+ ]*) b/i],
          [d, [b, "Barnes & Noble"], [c, h]],
          [/\b(tm\d{3}\w+) b/i],
          [d, [b, "NuVision"], [c, h]],
          [/\b(k88) b/i],
          [d, [b, "ZTE"], [c, h]],
          [/\b(nx\d{3}j) b/i],
          [d, [b, "ZTE"], [c, p]],
          [/\b(gen\d{3}) b.+49h/i],
          [d, [b, "Swiss"], [c, p]],
          [/\b(zur\d{3}) b/i],
          [d, [b, "Swiss"], [c, h]],
          [/\b((zeki)?tb.*\b) b/i],
          [d, [b, "Zeki"], [c, h]],
          [/\b([yr]\d{2}) b/i, /\b(dragon[- ]+touch |dt)(\w{5}) b/i],
          [[b, "Dragon Touch"], d, [c, h]],
          [/\b(ns-?\w{0,9}) b/i],
          [d, [b, "Insignia"], [c, h]],
          [/\b((nxa|next)-?\w{0,9}) b/i],
          [d, [b, "NextBook"], [c, h]],
          [/\b(xtreme\_)?(v(1[045]|2[015]|[3469]0|7[05])) b/i],
          [[b, "Voice"], d, [c, p]],
          [/\b(lvtel\-)?(v1[12]) b/i],
          [[b, "LvTel"], d, [c, p]],
          [/\b(ph-1) /i],
          [d, [b, "Essential"], [c, p]],
          [/\b(v(100md|700na|7011|917g).*\b) b/i],
          [d, [b, "Envizen"], [c, h]],
          [/\b(trio[-\w\. ]+) b/i],
          [d, [b, "MachSpeed"], [c, h]],
          [/\btu_(1491) b/i],
          [d, [b, "Rotor"], [c, h]],
          [/((?:tegranote|shield t(?!.+d tv))[\w- ]*?)(?: b|\))/i],
          [d, [b, W], [c, h]],
          [/(sprint) (\w+)/i],
          [b, d, [c, p]],
          [/(kin\.[onetw]{3})/i],
          [
            [d, /\./g, " "],
            [b, j],
            [c, p],
          ],
          [/droid.+; (cc6666?|et5[16]|mc[239][23]x?|vc8[03]x?)\)/i],
          [d, [b, q], [c, h]],
          [/droid.+; (ec30|ps20|tc[2-8]\d[kx])\)/i],
          [d, [b, q], [c, p]],
          [/smart-tv.+(samsung)/i],
          [b, [c, v]],
          [/hbbtv.+maple;(\d+)/i],
          [
            [d, /^/, "SmartTV"],
            [b, N],
            [c, v],
          ],
          [/(nux; netcast.+smarttv|lg (netcast\.tv-201\d|android tv))/i],
          [
            [b, "LG"],
            [c, v],
          ],
          [/(apple) ?tv/i],
          [b, [d, k + " TV"], [c, v]],
          [/crkey/i],
          [
            [d, P + "cast"],
            [b, A],
            [c, v],
          ],
          [/droid.+aft(\w+)( bui|\))/i],
          [d, [b, x], [c, v]],
          [/(shield \w+ tv)/i],
          [d, [b, W], [c, v]],
          [/\(dtv[\);].+(aquos)/i, /(aquos-tv[\w ]+)\)/i],
          [d, [b, U], [c, v]],
          [/(bravia[\w ]+)( bui|\))/i],
          [d, [b, L], [c, v]],
          [/(mi(tv|box)-?\w+) bui/i],
          [d, [b, B], [c, v]],
          [/Hbbtv.*(technisat) (.*);/i],
          [b, d, [c, v]],
          [
            /\b(roku)[\dx]*[\)\/]((?:dvp-)?[\d\.]*)/i,
            /hbbtv\/\d+\.\d+\.\d+ +\([\w\+ ]*; *([\w\d][^;]*);([^;]*)/i,
          ],
          [
            [b, Z],
            [d, Z],
            [c, v],
          ],
          [/droid.+; ([\w- ]+) (?:android tv|smart[- ]?tv)/i],
          [d, [c, v]],
          [/\b(android tv|smart[- ]?tv|opera tv|tv; rv:)\b/i],
          [[c, v]],
          [/(ouya)/i, /(nintendo) ([wids3utch]+)/i],
          [b, d, [c, f]],
          [/droid.+; (shield)( bui|\))/i],
          [d, [b, W], [c, f]],
          [/(playstation \w+)/i],
          [d, [b, L], [c, f]],
          [/\b(xbox(?: one)?(?!; xbox))[\); ]/i],
          [d, [b, j], [c, f]],
          [/\b(sm-[lr]\d\d[0156][fnuw]?s?|gear live)\b/i],
          [d, [b, N], [c, g]],
          [
            /((pebble))app/i,
            /(asus|google|lg|oppo) ((pixel |zen)?watch[\w ]*)( bui|\))/i,
          ],
          [b, d, [c, g]],
          [/(ow(?:19|20)?we?[1-3]{1,3})/i],
          [d, [b, I], [c, g]],
          [/(watch)(?: ?os[,\/]|\d,\d\/)[\d\.]+/i],
          [d, [b, k], [c, g]],
          [/(opwwe\d{3})/i],
          [d, [b, M], [c, g]],
          [/(moto 360)/i],
          [d, [b, V], [c, g]],
          [/(smartwatch 3)/i],
          [d, [b, L], [c, g]],
          [/(g watch r)/i],
          [d, [b, "LG"], [c, g]],
          [/droid.+; (wt63?0{2,3})\)/i],
          [d, [b, q], [c, g]],
          [/droid.+; (glass) \d/i],
          [d, [b, A], [c, g]],
          [/(pico) (4|neo3(?: link|pro)?)/i],
          [b, d, [c, g]],
          [/; (quest( \d| pro)?)/i],
          [d, [b, z], [c, g]],
          [/(tesla)(?: qtcarbrowser|\/[-\w\.]+)/i],
          [b, [c, y]],
          [/(aeobc)\b/i],
          [d, [b, x], [c, y]],
          [/(homepod).+mac os/i],
          [d, [b, k], [c, y]],
          [/windows iot/i],
          [[c, y]],
          [/droid .+?; ([^;]+?)(?: bui|; wv\)|\) applew).+? mobile safari/i],
          [d, [c, p]],
          [/droid .+?; ([^;]+?)(?: bui|\) applew).+?(?! mobile) safari/i],
          [d, [c, h]],
          [/\b((tablet|tab)[;\/]|focus\/\d(?!.+mobile))/i],
          [[c, h]],
          [/(phone|mobile(?:[;\/]| [ \w\/\.]*safari)|pda(?=.+windows ce))/i],
          [[c, p]],
          [/droid .+?; ([\w\. -]+)( bui|\))/i],
          [d, [b, "Generic"]],
        ],
        engine: [
          [/windows.+ edge\/([\w\.]+)/i],
          [w, [l, "EdgeHTML"]],
          [/(arkweb)\/([\w\.]+)/i],
          [l, w],
          [/webkit\/537\.36.+chrome\/(?!27)([\w\.]+)/i],
          [w, [l, "Blink"]],
          [
            /(presto)\/([\w\.]+)/i,
            /(webkit|trident|netfront|netsurf|amaya|lynx|w3m|goanna|servo)\/([\w\.]+)/i,
            /ekioh(flow)\/([\w\.]+)/i,
            /(khtml|tasman|links)[\/ ]\(?([\w\.]+)/i,
            /(icab)[\/ ]([23]\.[\d\.]+)/i,
            /\b(libweb)/i,
          ],
          [l, w],
          [/ladybird\//i],
          [[l, "LibWeb"]],
          [/rv\:([\w\.]{1,9})\b.+(gecko)/i],
          [w, l],
        ],
        os: [
          [/microsoft (windows) (vista|xp)/i],
          [l, w],
          [/(windows (?:phone(?: os)?|mobile|iot))[\/ ]?([\d\.\w ]*)/i],
          [l, [w, X, J]],
          [
            /windows nt 6\.2; (arm)/i,
            /windows[\/ ]([ntce\d\. ]+\w)(?!.+xbox)/i,
            /(?:win(?=3|9|n)|win 9x )([nt\d\.]+)/i,
          ],
          [
            [w, X, J],
            [l, "Windows"],
          ],
          [
            /[adehimnop]{4,7}\b(?:.*os ([\w]+) like mac|; opera)/i,
            /(?:ios;fbsv\/|iphone.+ios[\/ ])([\d\.]+)/i,
            /cfnetwork\/.+darwin/i,
          ],
          [
            [w, /_/g, "."],
            [l, "iOS"],
          ],
          [/(mac os x) ?([\w\. ]*)/i, /(macintosh|mac_powerpc\b)(?!.+haiku)/i],
          [
            [l, R],
            [w, /_/g, "."],
          ],
          [/droid ([\w\.]+)\b.+(android[- ]x86|harmonyos)/i],
          [w, l],
          [/(ubuntu) ([\w\.]+) like android/i],
          [[l, /(.+)/, "$1 Touch"], w],
          [
            /(android|bada|blackberry|kaios|maemo|meego|openharmony|qnx|rim tablet os|sailfish|series40|symbian|tizen|webos)\w*[-\/; ]?([\d\.]*)/i,
          ],
          [l, w],
          [/\(bb(10);/i],
          [w, [l, E]],
          [/(?:symbian ?os|symbos|s60(?=;)|series ?60)[-\/ ]?([\w\.]*)/i],
          [w, [l, "Symbian"]],
          [
            /mozilla\/[\d\.]+ \((?:mobile|tablet|tv|mobile; [\w ]+); rv:.+ gecko\/([\w\.]+)/i,
          ],
          [w, [l, C + " OS"]],
          [/web0s;.+rt(tv)/i, /\b(?:hp)?wos(?:browser)?\/([\w\.]+)/i],
          [w, [l, "webOS"]],
          [/watch(?: ?os[,\/]|\d,\d\/)([\d\.]+)/i],
          [w, [l, "watchOS"]],
          [/crkey\/([\d\.]+)/i],
          [w, [l, P + "cast"]],
          [/(cros) [\w]+(?:\)| ([\w\.]+)\b)/i],
          [[l, D], w],
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
          [l, w],
          [/(sunos) ?([\w\.\d]*)/i],
          [[l, "Solaris"], w],
          [
            /((?:open)?solaris)[-\/ ]?([\w\.]*)/i,
            /(aix) ((\d)(?=\.|\)| )[\w\.])*/i,
            /\b(beos|os\/2|amigaos|morphos|openvms|fuchsia|hp-ux|serenityos)/i,
            /(unix) ?([\w\.]*)/i,
          ],
          [l, w],
        ],
      },
      ei = function (e, i) {
        if ((typeof e === a && ((i = e), (e = void 0)), !(this instanceof ei)))
          return new ei(e, i).getResult();
        var r = typeof n !== o && n.navigator ? n.navigator : void 0,
          f = e || (r && r.userAgent ? r.userAgent : ""),
          v = r && r.userAgentData ? r.userAgentData : void 0,
          g = i ? H(ee, i) : ee,
          y = r && r.userAgent == f;
        return (
          (this.getBrowser = function () {
            var e,
              i = {};
            return (
              (i[l] = void 0),
              (i[w] = void 0),
              K.call(i, f, g.browser),
              (i[u] =
                typeof (e = i[w]) === s
                  ? e.replace(/[^\d\.]/g, "").split(".")[0]
                  : void 0),
              y &&
                r &&
                r.brave &&
                typeof r.brave.isBrave == t &&
                (i[l] = "Brave"),
              i
            );
          }),
          (this.getCPU = function () {
            var e = {};
            return ((e[m] = void 0), K.call(e, f, g.cpu), e);
          }),
          (this.getDevice = function () {
            var e = {};
            return (
              (e[b] = void 0),
              (e[d] = void 0),
              (e[c] = void 0),
              K.call(e, f, g.device),
              y && !e[c] && v && v.mobile && (e[c] = p),
              y &&
                "Macintosh" == e[d] &&
                r &&
                typeof r.standalone !== o &&
                r.maxTouchPoints &&
                r.maxTouchPoints > 2 &&
                ((e[d] = "iPad"), (e[c] = h)),
              e
            );
          }),
          (this.getEngine = function () {
            var e = {};
            return (
              (e[l] = void 0),
              (e[w] = void 0),
              K.call(e, f, g.engine),
              e
            );
          }),
          (this.getOS = function () {
            var e = {};
            return (
              (e[l] = void 0),
              (e[w] = void 0),
              K.call(e, f, g.os),
              y &&
                !e[l] &&
                v &&
                v.platform &&
                "Unknown" != v.platform &&
                (e[l] = v.platform
                  .replace(/chrome os/i, D)
                  .replace(/macos/i, R)),
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
            return f;
          }),
          (this.setUA = function (e) {
            return (
              (f = typeof e === s && e.length > 500 ? Z(e, 500) : e),
              this
            );
          }),
          this.setUA(f),
          this
        );
      };
    if (
      ((ei.VERSION = "1.0.41"),
      (ei.BROWSER = $([l, w, u])),
      (ei.CPU = $([m])),
      (ei.DEVICE = $([d, b, c, f, p, v, h, g, y])),
      (ei.ENGINE = ei.OS = $([l, w])),
      typeof r !== o)
    )
      (i.exports && (r = i.exports = ei), (r.UAParser = ei));
    else if (typeof define === t && define.amd) (e.r, void 0 !== ei && e.v(ei));
    else typeof n !== o && (n.UAParser = ei);
    var er = typeof n !== o && (n.jQuery || n.Zepto);
    if (er && !er.ua) {
      var en = new ei();
      ((er.ua = en.getResult()),
        (er.ua.get = function () {
          return en.getUA();
        }),
        (er.ua.set = function (e) {
          en.setUA(e);
          var i = en.getResult();
          for (var r in i) er.ua[r] = i[r];
        }));
    }
  })("object" == typeof window ? window : e.e);
};
