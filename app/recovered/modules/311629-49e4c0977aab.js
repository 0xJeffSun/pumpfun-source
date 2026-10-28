// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(632220);
  let r = /#/g,
    n = /&/g,
    a = /\//g,
    s = /=/g,
    o = /\+/g,
    i = /%5e/gi,
    l = /%60/gi,
    u = /%7c/gi,
    p = /%20/gi;
  function c(e) {
    return encodeURI("" + ("string" == typeof e ? e : JSON.stringify(e)))
      .replace(u, "|")
      .replace(o, "%2B")
      .replace(p, "+")
      .replace(r, "%23")
      .replace(n, "%26")
      .replace(l, "`")
      .replace(i, "^")
      .replace(a, "%2F");
  }
  function d(e) {
    return c(e).replace(s, "%3D");
  }
  function f(e = "") {
    try {
      return decodeURIComponent("" + e);
    } catch {
      return "" + e;
    }
  }
  let _ = /^[\s\w\0+.-]{2,}:([/\\]{1,2})/,
    y = /^[\s\w\0+.-]{2,}:([/\\]{2})?/,
    m = /^([/\\]\s*){2,}[^/\\]/,
    h = /\/$|\/\?|\/#/,
    b = /^\.?\//;
  function E(e, t = {}) {
    return ("boolean" == typeof t && (t = { acceptRelative: t }), t.strict)
      ? _.test(e)
      : y.test(e) || (!!t.acceptRelative && m.test(e));
  }
  let g = Symbol.for("ufo:protocolRelative");
  function w(e = "") {
    let [t = "", r = "", n = ""] = (
      e.match(/([^#?]*)(\?[^#]*)?(#.*)?/) || []
    ).splice(1);
    return { pathname: t, search: r, hash: n };
  }
  class A extends Error {
    constructor(e, t) {
      (super(e, t),
        (this.name = "FetchError"),
        t?.cause && !this.cause && (this.cause = t.cause));
    }
  }
  let I = new Set(Object.freeze(["PATCH", "POST", "PUT", "DELETE"]));
  function v(e = "GET") {
    return I.has(e.toUpperCase());
  }
  let T = new Set([
      "image/svg",
      "application/xml",
      "application/xhtml",
      "application/html",
    ]),
    O = /^application\/(?:[\w!#$%&*.^`~-]*\+)?json(;.+)?$/i;
  async function S(e, t) {
    if (t)
      if (Array.isArray(t)) for (let r of t) await r(e);
      else await t(e);
  }
  let R = new Set([408, 409, 425, 429, 500, 502, 503, 504]),
    N = new Set([101, 204, 205, 304]);
  e.s(
    [
      "F",
      0,
      A,
      "c",
      0,
      function e(r = {}) {
        let {
          fetch: n = globalThis.fetch,
          Headers: a = globalThis.Headers,
          AbortController: s = globalThis.AbortController,
        } = r;
        async function i(e) {
          let t =
            (e.error && "AbortError" === e.error.name && !e.options.timeout) ||
            !1;
          if (!1 !== e.options.retry && !t) {
            let t;
            t =
              "number" == typeof e.options.retry
                ? e.options.retry
                : +!v(e.options.method);
            let r = (e.response && e.response.status) || 500;
            if (
              t > 0 &&
              (Array.isArray(e.options.retryStatusCodes)
                ? e.options.retryStatusCodes.includes(r)
                : R.has(r))
            ) {
              let r =
                "function" == typeof e.options.retryDelay
                  ? e.options.retryDelay(e)
                  : e.options.retryDelay || 0;
              return (
                r > 0 && (await new Promise((e) => setTimeout(e, r))),
                l(e.request, { ...e.options, retry: t - 1 })
              );
            }
          }
          let r = (function (e) {
            let t = e.error?.message || e.error?.toString() || "",
              r = e.request?.method || e.options?.method || "GET",
              n = e.request?.url || String(e.request) || "/",
              a = `[${r}] ${JSON.stringify(n)}`,
              s = e.response
                ? `${e.response.status} ${e.response.statusText}`
                : "<no response>",
              o = new A(
                `${a}: ${s}${t ? ` ${t}` : ""}`,
                e.error ? { cause: e.error } : void 0,
              );
            for (let t of ["request", "options", "response"])
              Object.defineProperty(o, t, { get: () => e[t] });
            for (let [t, r] of [
              ["data", "_data"],
              ["status", "status"],
              ["statusCode", "status"],
              ["statusText", "statusText"],
              ["statusMessage", "statusText"],
            ])
              Object.defineProperty(o, t, {
                get: () => e.response && e.response[r],
              });
            return o;
          })(e);
          throw (Error.captureStackTrace && Error.captureStackTrace(r, l), r);
        }
        let l = async function (e, l = {}) {
            var u, p, _, y;
            let m,
              h,
              A,
              I = {
                request: e,
                options:
                  ((u = r.defaults),
                  (A = (function (e, t, r) {
                    if (!t) return new r(e);
                    let n = new r(t);
                    if (e)
                      for (let [t, a] of Symbol.iterator in e ||
                      Array.isArray(e)
                        ? e
                        : new r(e))
                        n.set(t, a);
                    return n;
                  })(l?.headers ?? e?.headers, u?.headers, a)),
                  (u?.query || u?.params || l?.params || l?.query) &&
                    (h = {
                      ...u?.params,
                      ...u?.query,
                      ...l?.params,
                      ...l?.query,
                    }),
                  { ...u, ...l, query: h, params: h, headers: A }),
                response: void 0,
                error: void 0,
              };
            if (
              (I.options.method &&
                (I.options.method = I.options.method.toUpperCase()),
              I.options.onRequest &&
                (await S(I, I.options.onRequest),
                I.options.headers instanceof a ||
                  (I.options.headers = new a(I.options.headers || {}))),
              "string" == typeof I.request)
            ) {
              if (
                (I.options.baseURL &&
                  (I.request = (function (e, t) {
                    var r;
                    if (!(r = t) || "/" === r || E(e)) return e;
                    let n = (function (e = "") {
                      return (
                        (!(function (e = "") {
                          return e.endsWith("/");
                        })(e)
                          ? e
                          : e.slice(0, -1)) || "/"
                      );
                    })(t);
                    return e.startsWith(n)
                      ? e
                      : (function (e, ...t) {
                          let r = e || "";
                          for (let e of t.filter((e) => e && "/" !== e))
                            if (r) {
                              let t = e.replace(b, "");
                              r =
                                (function (e = "") {
                                  return e.endsWith("/") ? e : e + "/";
                                })(r) + t;
                            } else r = e;
                          return r;
                        })(n, e);
                  })(I.request, I.options.baseURL)),
                I.options.query)
              ) {
                let e, t, r, n, a, s, i;
                ((p = I.request),
                  (_ = I.options.query),
                  (t = {
                    ...(function (e = "") {
                      let t = Object.create(null);
                      for (let r of ("?" === e[0] && (e = e.slice(1)),
                      e.split("&"))) {
                        let e = r.match(/([^=]+)=?(.*)/) || [];
                        if (e.length < 2) continue;
                        let n = f(e[1].replace(o, " "));
                        if ("__proto__" === n || "constructor" === n) continue;
                        let a = f((e[2] || "").replace(o, " "));
                        void 0 === t[n]
                          ? (t[n] = a)
                          : Array.isArray(t[n])
                            ? t[n].push(a)
                            : (t[n] = [t[n], a]);
                      }
                      return t;
                    })(
                      (e = (function e(t = "", r) {
                        let n = t.match(
                          /^[\s\0]*(blob:|data:|javascript:|vbscript:)(.*)/i,
                        );
                        if (n) {
                          let [, e, t = ""] = n;
                          return {
                            protocol: e.toLowerCase(),
                            pathname: t,
                            href: e + t,
                            auth: "",
                            host: "",
                            search: "",
                            hash: "",
                          };
                        }
                        if (!E(t, { acceptRelative: !0 }))
                          return r ? e(r + t) : w(t);
                        let [, a = "", s, o = ""] =
                            t
                              .replace(/\\/g, "/")
                              .match(
                                /^[\s\0]*([\w+.-]{2,}:)?\/\/([^/@]+@)?(.*)/,
                              ) || [],
                          [, i = "", l = ""] = o.match(/([^#/?]*)(.*)?/) || [];
                        "file:" === a && (l = l.replace(/\/(?=[A-Za-z]:)/, ""));
                        let { pathname: u, search: p, hash: c } = w(l);
                        return {
                          protocol: a.toLowerCase(),
                          auth: s ? s.slice(0, Math.max(0, s.length - 1)) : "",
                          host: i,
                          pathname: u,
                          search: p,
                          hash: c,
                          [g]: !a,
                        };
                      })(p)).search,
                    ),
                    ..._,
                  }),
                  (e.search = Object.keys(t)
                    .filter((e) => void 0 !== t[e])
                    .map((e) => {
                      var r;
                      return (("number" == typeof (r = t[e]) ||
                        "boolean" == typeof r) &&
                        (r = String(r)),
                      r)
                        ? Array.isArray(r)
                          ? r.map((t) => `${d(e)}=${c(t)}`).join("&")
                          : `${d(e)}=${c(r)}`
                        : d(e);
                    })
                    .filter(Boolean)
                    .join("&")),
                  (r = (y = e).pathname || ""),
                  (n = y.search
                    ? (y.search.startsWith("?") ? "" : "?") + y.search
                    : ""),
                  (a = y.hash || ""),
                  (s = y.auth ? y.auth + "@" : ""),
                  (i = y.host || ""),
                  (I.request =
                    (y.protocol || y[g] ? (y.protocol || "") + "//" : "") +
                    s +
                    i +
                    r +
                    n +
                    a),
                  delete I.options.query);
              }
              ("query" in I.options && delete I.options.query,
                "params" in I.options && delete I.options.params);
            }
            if (I.options.body && v(I.options.method))
              if (
                (function (e) {
                  if (void 0 === e) return !1;
                  let t = typeof e;
                  return (
                    "string" === t ||
                    "number" === t ||
                    "boolean" === t ||
                    null === t ||
                    ("object" === t &&
                      (!!Array.isArray(e) ||
                        (!(
                          e.buffer ||
                          e instanceof FormData ||
                          e instanceof URLSearchParams
                        ) &&
                          ((e.constructor && "Object" === e.constructor.name) ||
                            "function" == typeof e.toJSON))))
                  );
                })(I.options.body)
              ) {
                let e = I.options.headers.get("content-type");
                ("string" != typeof I.options.body &&
                  (I.options.body =
                    "application/x-www-form-urlencoded" === e
                      ? new URLSearchParams(I.options.body).toString()
                      : JSON.stringify(I.options.body)),
                  e ||
                    I.options.headers.set("content-type", "application/json"),
                  I.options.headers.has("accept") ||
                    I.options.headers.set("accept", "application/json"));
              } else
                (("pipeTo" in I.options.body &&
                  "function" == typeof I.options.body.pipeTo) ||
                  "function" == typeof I.options.body.pipe) &&
                  !("duplex" in I.options) &&
                  (I.options.duplex = "half");
            if (!I.options.signal && I.options.timeout) {
              let e = new s();
              ((m = setTimeout(() => {
                let t = Error(
                  "[TimeoutError]: The operation was aborted due to timeout",
                );
                ((t.name = "TimeoutError"), (t.code = 23), e.abort(t));
              }, I.options.timeout)),
                (I.options.signal = e.signal));
            }
            try {
              I.response = await n(I.request, I.options);
            } catch (e) {
              return (
                (I.error = e),
                I.options.onRequestError &&
                  (await S(I, I.options.onRequestError)),
                await i(I)
              );
            } finally {
              m && clearTimeout(m);
            }
            if (
              (I.response.body || I.response._bodyInit) &&
              !N.has(I.response.status) &&
              "HEAD" !== I.options.method
            ) {
              let e =
                (I.options.parseResponse ? "json" : I.options.responseType) ||
                (function (e = "") {
                  if (!e) return "json";
                  let t = e.split(";").shift() || "";
                  return O.test(t)
                    ? "json"
                    : "text/event-stream" === t
                      ? "stream"
                      : T.has(t) || t.startsWith("text/")
                        ? "text"
                        : "blob";
                })(I.response.headers.get("content-type") || "");
              switch (e) {
                case "json": {
                  let e = await I.response.text(),
                    r = I.options.parseResponse || t.f;
                  I.response._data = r(e);
                  break;
                }
                case "stream":
                  I.response._data = I.response.body || I.response._bodyInit;
                  break;
                default:
                  I.response._data = await I.response[e]();
              }
            }
            return (I.options.onResponse && (await S(I, I.options.onResponse)),
            !I.options.ignoreResponseError &&
              I.response.status >= 400 &&
              I.response.status < 600)
              ? (I.options.onResponseError &&
                  (await S(I, I.options.onResponseError)),
                await i(I))
              : I.response;
          },
          u = async function (e, t) {
            return (await l(e, t))._data;
          };
        return (
          (u.raw = l),
          (u.native = (...e) => n(...e)),
          (u.create = (t = {}, n = {}) =>
            e({
              ...r,
              ...n,
              defaults: { ...r.defaults, ...n.defaults, ...t },
            })),
          u
        );
      },
    ],
    311629,
  );
};
