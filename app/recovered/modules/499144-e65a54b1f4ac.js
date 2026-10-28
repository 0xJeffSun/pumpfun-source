// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e, t, n) => {
  var r,
    o,
    i = /[^\x00-\x2f\x3a-\x40\x5b-\x60\x7b-\x7f]+/g,
    a = /[\xc0-\xd6\xd8-\xf6\xf8-\xff\u0100-\u017f]/g,
    l = "\\ud800-\\udfff",
    s = "\\u0300-\\u036f\\ufe20-\\ufe23",
    u = "\\u20d0-\\u20f0",
    c = "\\u2700-\\u27bf",
    f = "a-z\\xdf-\\xf6\\xf8-\\xff",
    d = "A-Z\\xc0-\\xd6\\xd8-\\xde",
    p = "\\ufe0e\\ufe0f",
    g =
      "\\xac\\xb1\\xd7\\xf7\\x00-\\x2f\\x3a-\\x40\\x5b-\\x60\\x7b-\\xbf\\u2000-\\u206f \\t\\x0b\\f\\xa0\\ufeff\\n\\r\\u2028\\u2029\\u1680\\u180e\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200a\\u202f\\u205f\\u3000",
    v = "['’]",
    m = "[" + g + "]",
    h = "[" + s + u + "]",
    y = "[" + f + "]",
    b = "[^" + l + g + "\\d+" + c + f + d + "]",
    w = "\\ud83c[\\udffb-\\udfff]",
    x = "[^" + l + "]",
    k = "(?:\\ud83c[\\udde6-\\uddff]){2}",
    E = "[\\ud800-\\udbff][\\udc00-\\udfff]",
    O = "[" + d + "]",
    S = "\\u200d",
    C = "(?:" + y + "|" + b + ")",
    P = "(?:" + O + "|" + b + ")",
    D = "(?:" + v + "(?:d|ll|m|re|s|t|ve))?",
    I = "(?:" + v + "(?:D|LL|M|RE|S|T|VE))?",
    j = "(?:" + h + "|" + w + ")?",
    F = "[" + p + "]?",
    T = "(?:" + S + "(?:" + [x, k, E].join("|") + ")" + F + j + ")*",
    R = F + j + T,
    L = "(?:" + ["[" + c + "]", k, E].join("|") + ")" + R,
    U = "(?:" + [x + h + "?", h, k, E, "[" + l + "]"].join("|") + ")",
    A = RegExp(v, "g"),
    $ = RegExp(h, "g"),
    N = RegExp(w + "(?=" + w + ")|" + U + R, "g"),
    M = RegExp(
      [
        O + "?" + y + "+" + D + "(?=" + [m, O, "$"].join("|") + ")",
        P + "+" + I + "(?=" + [m, O + C, "$"].join("|") + ")",
        O + "?" + C + "+" + D,
        O + "+" + I,
        "\\d+",
        L,
      ].join("|"),
      "g",
    ),
    V = RegExp("[" + S + l + s + u + p + "]"),
    H = /[a-z][A-Z]|[A-Z]{2,}[a-z]|[0-9][a-zA-Z]|[a-zA-Z][0-9]|[^a-zA-Z0-9 ]/,
    z = e.g && e.g.Object === Object && e.g,
    K = "object" == typeof self && self && self.Object === Object && self,
    q = z || K || Function("return this")(),
    _ =
      ((r = {
        À: "A",
        Á: "A",
        Â: "A",
        Ã: "A",
        Ä: "A",
        Å: "A",
        à: "a",
        á: "a",
        â: "a",
        ã: "a",
        ä: "a",
        å: "a",
        Ç: "C",
        ç: "c",
        Ð: "D",
        ð: "d",
        È: "E",
        É: "E",
        Ê: "E",
        Ë: "E",
        è: "e",
        é: "e",
        ê: "e",
        ë: "e",
        Ì: "I",
        Í: "I",
        Î: "I",
        Ï: "I",
        ì: "i",
        í: "i",
        î: "i",
        ï: "i",
        Ñ: "N",
        ñ: "n",
        Ò: "O",
        Ó: "O",
        Ô: "O",
        Õ: "O",
        Ö: "O",
        Ø: "O",
        ò: "o",
        ó: "o",
        ô: "o",
        õ: "o",
        ö: "o",
        ø: "o",
        Ù: "U",
        Ú: "U",
        Û: "U",
        Ü: "U",
        ù: "u",
        ú: "u",
        û: "u",
        ü: "u",
        Ý: "Y",
        ý: "y",
        ÿ: "y",
        Æ: "Ae",
        æ: "ae",
        Þ: "Th",
        þ: "th",
        ß: "ss",
        Ā: "A",
        Ă: "A",
        Ą: "A",
        ā: "a",
        ă: "a",
        ą: "a",
        Ć: "C",
        Ĉ: "C",
        Ċ: "C",
        Č: "C",
        ć: "c",
        ĉ: "c",
        ċ: "c",
        č: "c",
        Ď: "D",
        Đ: "D",
        ď: "d",
        đ: "d",
        Ē: "E",
        Ĕ: "E",
        Ė: "E",
        Ę: "E",
        Ě: "E",
        ē: "e",
        ĕ: "e",
        ė: "e",
        ę: "e",
        ě: "e",
        Ĝ: "G",
        Ğ: "G",
        Ġ: "G",
        Ģ: "G",
        ĝ: "g",
        ğ: "g",
        ġ: "g",
        ģ: "g",
        Ĥ: "H",
        Ħ: "H",
        ĥ: "h",
        ħ: "h",
        Ĩ: "I",
        Ī: "I",
        Ĭ: "I",
        Į: "I",
        İ: "I",
        ĩ: "i",
        ī: "i",
        ĭ: "i",
        į: "i",
        ı: "i",
        Ĵ: "J",
        ĵ: "j",
        Ķ: "K",
        ķ: "k",
        ĸ: "k",
        Ĺ: "L",
        Ļ: "L",
        Ľ: "L",
        Ŀ: "L",
        Ł: "L",
        ĺ: "l",
        ļ: "l",
        ľ: "l",
        ŀ: "l",
        ł: "l",
        Ń: "N",
        Ņ: "N",
        Ň: "N",
        Ŋ: "N",
        ń: "n",
        ņ: "n",
        ň: "n",
        ŋ: "n",
        Ō: "O",
        Ŏ: "O",
        Ő: "O",
        ō: "o",
        ŏ: "o",
        ő: "o",
        Ŕ: "R",
        Ŗ: "R",
        Ř: "R",
        ŕ: "r",
        ŗ: "r",
        ř: "r",
        Ś: "S",
        Ŝ: "S",
        Ş: "S",
        Š: "S",
        ś: "s",
        ŝ: "s",
        ş: "s",
        š: "s",
        Ţ: "T",
        Ť: "T",
        Ŧ: "T",
        ţ: "t",
        ť: "t",
        ŧ: "t",
        Ũ: "U",
        Ū: "U",
        Ŭ: "U",
        Ů: "U",
        Ű: "U",
        Ų: "U",
        ũ: "u",
        ū: "u",
        ŭ: "u",
        ů: "u",
        ű: "u",
        ų: "u",
        Ŵ: "W",
        ŵ: "w",
        Ŷ: "Y",
        ŷ: "y",
        Ÿ: "Y",
        Ź: "Z",
        Ż: "Z",
        Ž: "Z",
        ź: "z",
        ż: "z",
        ž: "z",
        Ĳ: "IJ",
        ĳ: "ij",
        Œ: "Oe",
        œ: "oe",
        ŉ: "'n",
        ſ: "ss",
      }),
      function (e) {
        return null == r ? void 0 : r[e];
      }),
    J = Object.prototype.toString,
    W = q.Symbol,
    B = W ? W.prototype : void 0,
    G = B ? B.toString : void 0;
  function Z(e) {
    return null == e
      ? ""
      : (function (e) {
          if ("string" == typeof e) return e;
          if (
            (function (e) {
              return (
                "symbol" == typeof e ||
                (!!e && "object" == typeof e && "[object Symbol]" == J.call(e))
              );
            })(e)
          )
            return G ? G.call(e) : "";
          var t = e + "";
          return "0" == t && 1 / e == -1 / 0 ? "-0" : t;
        })(e);
  }
  var X =
      ((o = function (e, t, n) {
        return ((t = t.toLowerCase()), e + (n ? Y(Z(t).toLowerCase()) : t));
      }),
      function (e) {
        for (
          var t,
            n = (function (e, t) {
              if (((e = Z(e)), void 0 === t)) {
                var n;
                return ((n = e), H.test(n))
                  ? e.match(M) || []
                  : e.match(i) || [];
              }
              return e.match(t) || [];
            })(
              ((t = Z((t = e))) && t.replace(a, _).replace($, "")).replace(
                A,
                "",
              ),
            ),
            r = "",
            l = -1,
            s = n ? n.length : 0;
          ++l < s;

        )
          r = o(r, n[l], l);
        return r;
      }),
    Y = function (e) {
      var t,
        n,
        r,
        o = ((t = e = Z(e)), V.test(t))
          ? (function (e) {
              return V.test(e) ? e.match(N) || [] : e.split("");
            })(e)
          : void 0,
        i = o ? o[0] : e.charAt(0),
        a = o
          ? ((r = o.length),
            (function (e, t, n) {
              var r = -1,
                o = e.length;
              (t < 0 && (t = -t > o ? 0 : o + t),
                (n = n > o ? o : n) < 0 && (n += o),
                (o = t > n ? 0 : (n - t) >>> 0),
                (t >>>= 0));
              for (var i = Array(o); ++r < o; ) i[r] = e[r + t];
              return i;
            })(o, 1, (n = void 0 === n ? r : n))).join("")
          : e.slice(1);
      return i.toUpperCase() + a;
    };
  t.exports = X;
};
