// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e, t, r) => {
  (e.i(149502), Object.defineProperty(r, "__esModule", { value: !0 }));
  var n = {
    DecodeError: function () {
      return w;
    },
    MiddlewareNotFoundError: function () {
      return E;
    },
    MissingStaticPage: function () {
      return v;
    },
    NormalizeError: function () {
      return b;
    },
    PageNotFoundError: function () {
      return y;
    },
    SP: function () {
      return g;
    },
    ST: function () {
      return m;
    },
    WEB_VITALS: function () {
      return i;
    },
    execOnce: function () {
      return s;
    },
    getDisplayName: function () {
      return d;
    },
    getLocationOrigin: function () {
      return u;
    },
    getURL: function () {
      return c;
    },
    isAbsoluteUrl: function () {
      return l;
    },
    isResSent: function () {
      return f;
    },
    loadGetInitialProps: function () {
      return h;
    },
    normalizeRepeatedSlashes: function () {
      return p;
    },
    stringifyError: function () {
      return S;
    },
  };
  for (var o in n) Object.defineProperty(r, o, { enumerable: !0, get: n[o] });
  let i = ["CLS", "FCP", "INP", "LCP", "TTFB"];
  function s(e) {
    let t,
      r = !1;
    return (...n) => (r || ((r = !0), (t = e(...n))), t);
  }
  let a = /^[a-zA-Z][a-zA-Z\d+\-.]*?:/,
    l = (e) => {
      let t = e.charCodeAt(0);
      return !!((t >= 65 && t <= 90) || (t >= 97 && t <= 122)) && a.test(e);
    };
  function u() {
    let { protocol: e, hostname: t, port: r } = window.location;
    return `${e}//${t}${r ? ":" + r : ""}`;
  }
  function c() {
    let { href: e } = window.location,
      t = u();
    return e.substring(t.length);
  }
  function d(e) {
    return "string" == typeof e ? e : e.displayName || e.name || "Unknown";
  }
  function f(e) {
    return e.finished || e.headersSent;
  }
  function p(e) {
    let t = e.split("?");
    return (
      t[0].replace(/\\/g, "/").replace(/\/\/+/g, "/") +
      (t[1] ? `?${t.slice(1).join("?")}` : "")
    );
  }
  async function h(e, t) {
    let r = t.res || (t.ctx && t.ctx.res);
    if (!e.getInitialProps)
      return t.ctx && t.Component
        ? { pageProps: await h(t.Component, t.ctx) }
        : {};
    let n = await e.getInitialProps(t);
    if (r && f(r)) return n;
    if (!n)
      throw Error(
        `"${d(e)}.getInitialProps()" should resolve to an object. But found "${n}" instead.`,
      );
    return n;
  }
  let g = "u" > typeof performance,
    m =
      g &&
      ["mark", "measure", "getEntriesByName"].every(
        (e) => "function" == typeof performance[e],
      );
  class w extends Error {}
  class b extends Error {}
  class y extends Error {
    constructor(e) {
      (super(),
        (this.code = "ENOENT"),
        (this.name = "PageNotFoundError"),
        (this.message = `Cannot find module for page: ${e}`));
    }
  }
  class v extends Error {
    constructor(e, t) {
      (super(),
        (this.message = `Failed to load static file for page: ${e} ${t}`));
    }
  }
  class E extends Error {
    constructor() {
      (super(),
        (this.code = "ENOENT"),
        (this.message = "Cannot find the middleware module"));
    }
  }
  function S(e) {
    return JSON.stringify({ message: e.message, stack: e.stack });
  }
};
