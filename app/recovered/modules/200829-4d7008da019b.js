// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e, t, n) => {
  Object.defineProperty(n, "__esModule", { value: !0 });
  var r = {
    HTML_LIMITED_BOT_UA_RE: function () {
      return l.HTML_LIMITED_BOT_UA_RE;
    },
    HTML_LIMITED_BOT_UA_RE_STRING: function () {
      return o;
    },
    getBotType: function () {
      return s;
    },
    isBot: function () {
      return c;
    },
  };
  for (var a in r) Object.defineProperty(n, a, { enumerable: !0, get: r[a] });
  let l = e.r(492956),
    u = /Googlebot(?!-)|Googlebot$/i,
    o = l.HTML_LIMITED_BOT_UA_RE.source;
  function i(e) {
    return l.HTML_LIMITED_BOT_UA_RE.test(e);
  }
  function c(e) {
    return u.test(e) || i(e);
  }
  function s(e) {
    return u.test(e) ? "dom" : i(e) ? "html" : void 0;
  }
};
