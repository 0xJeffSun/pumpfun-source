// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(632220);
  let r = /#/g,
    n = /&/g,
    s = /\//g,
    i = /=/g,
    o = /\+/g,
    a = /%5e/gi,
    u = /%60/gi,
    l = /%7c/gi,
    c = /%20/gi;
  function p(e) {
    return encodeURI("" + ("string" == typeof e ? e : JSON.stringify(e)))
      .replace(l, "|")
      .replace(o, "%2B")
      .replace(c, "+")
      .replace(r, "%23")
      .replace(n, "%26")
      .replace(u, "`")
      .replace(a, "^")
      .replace(s, "%2F");
  }
  function f(e) {
    return p(e).replace(i, "%3D");
  }
  function d(e = "") {
    try {
      return decodeURIComponent("" + e);
    } catch {
      return "" + e;
    }
  }
  let y = /^[\s\w\0+.-]{2,}:([/\\]{1,2})/,
    m = /^[\s\w\0+.-]{2,}:([/\\]{2})?/,
    h = /^([/\\]\s*){2,}[^/\\]/,
    _ = /\/$|\/\?|\/#/,
    b = /^\.?\//;
  function g(e, t = {}) {
    return ("boolean" == typeof t && (t = { acceptRelative: t }), t.strict)
      ? y.test(e)
      : m.test(e) || (!!t.acceptRelative && h.test(e));
  }
  let E = Symbol.for("ufo:protocolRelative");
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
  let v = new Set(Object.freeze(["PATCH", "POST", "PUT", "DELETE"]));
  function $(e = "GET") {
    return v.has(e.toUpperCase());
  }
  let I = new Set([
      "image/svg",
      "application/xml",
      "application/xhtml",
      "application/html",
    ]),
    x = /^application\/(?:[\w!#$%&*.^`~-]*\+)?json(;.+)?$/i;
  async function O(e, t) {
    if (t)
      if (Array.isArray(t)) for (let r of t) await r(e);
      else await t(e);
  }
  let S = new Set([408, 409, 425, 429, 500, 502, 503, 504]),
    T = new Set([101, 204, 205, 304]);
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
          Headers: s = globalThis.Headers,
          AbortController: i = globalThis.AbortController,
        } = r;
        async function a(e) {
          let t =
            (e.error && "AbortError" === e.error.name && !e.options.timeout) ||
            !1;
          if (!1 !== e.options.retry && !t) {
            let t;
            t =
              "number" == typeof e.options.retry
                ? e.options.retry
                : +!$(e.options.method);
            let r = (e.response && e.response.status) || 500;
            if (
              t > 0 &&
              (Array.isArray(e.options.retryStatusCodes)
                ? e.options.retryStatusCodes.includes(r)
                : S.has(r))
            ) {
              let r =
                "function" == typeof e.options.retryDelay
                  ? e.options.retryDelay(e)
                  : e.options.retryDelay || 0;
              return (
                r > 0 && (await new Promise((e) => setTimeout(e, r))),
                u(e.request, { ...e.options, retry: t - 1 })
              );
            }
          }
          let r = (function (e) {
            let t = e.error?.message || e.error?.toString() || "",
              r = e.request?.method || e.options?.method || "GET",
              n = e.request?.url || String(e.request) || "/",
              s = `[${r}] ${JSON.stringify(n)}`,
              i = e.response
                ? `${e.response.status} ${e.response.statusText}`
                : "<no response>",
              o = new A(
                `${s}: ${i}${t ? ` ${t}` : ""}`,
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
          throw (Error.captureStackTrace && Error.captureStackTrace(r, u), r);
        }
        let u = async function (e, u = {}) {
            var l, c, y, m;
            let h,
              _,
              A,
              v = {
                request: e,
                options:
                  ((l = r.defaults),
                  (A = (function (e, t, r) {
                    if (!t) return new r(e);
                    let n = new r(t);
                    if (e)
                      for (let [t, s] of Symbol.iterator in e ||
                      Array.isArray(e)
                        ? e
                        : new r(e))
                        n.set(t, s);
                    return n;
                  })(u?.headers ?? e?.headers, l?.headers, s)),
                  (l?.query || l?.params || u?.params || u?.query) &&
                    (_ = {
                      ...l?.params,
                      ...l?.query,
                      ...u?.params,
                      ...u?.query,
                    }),
                  { ...l, ...u, query: _, params: _, headers: A }),
                response: void 0,
                error: void 0,
              };
            if (
              (v.options.method &&
                (v.options.method = v.options.method.toUpperCase()),
              v.options.onRequest &&
                (await O(v, v.options.onRequest),
                v.options.headers instanceof s ||
                  (v.options.headers = new s(v.options.headers || {}))),
              "string" == typeof v.request)
            ) {
              if (
                (v.options.baseURL &&
                  (v.request = (function (e, t) {
                    var r;
                    if (!(r = t) || "/" === r || g(e)) return e;
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
                  })(v.request, v.options.baseURL)),
                v.options.query)
              ) {
                let e, t, r, n, s, i, a;
                ((c = v.request),
                  (y = v.options.query),
                  (t = {
                    ...(function (e = "") {
                      let t = Object.create(null);
                      for (let r of ("?" === e[0] && (e = e.slice(1)),
                      e.split("&"))) {
                        let e = r.match(/([^=]+)=?(.*)/) || [];
                        if (e.length < 2) continue;
                        let n = d(e[1].replace(o, " "));
                        if ("__proto__" === n || "constructor" === n) continue;
                        let s = d((e[2] || "").replace(o, " "));
                        void 0 === t[n]
                          ? (t[n] = s)
                          : Array.isArray(t[n])
                            ? t[n].push(s)
                            : (t[n] = [t[n], s]);
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
                        if (!g(t, { acceptRelative: !0 }))
                          return r ? e(r + t) : w(t);
                        let [, s = "", i, o = ""] =
                            t
                              .replace(/\\/g, "/")
                              .match(
                                /^[\s\0]*([\w+.-]{2,}:)?\/\/([^/@]+@)?(.*)/,
                              ) || [],
                          [, a = "", u = ""] = o.match(/([^#/?]*)(.*)?/) || [];
                        "file:" === s && (u = u.replace(/\/(?=[A-Za-z]:)/, ""));
                        let { pathname: l, search: c, hash: p } = w(u);
                        return {
                          protocol: s.toLowerCase(),
                          auth: i ? i.slice(0, Math.max(0, i.length - 1)) : "",
                          host: a,
                          pathname: l,
                          search: c,
                          hash: p,
                          [E]: !s,
                        };
                      })(c)).search,
                    ),
                    ...y,
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
                          ? r.map((t) => `${f(e)}=${p(t)}`).join("&")
                          : `${f(e)}=${p(r)}`
                        : f(e);
                    })
                    .filter(Boolean)
                    .join("&")),
                  (r = (m = e).pathname || ""),
                  (n = m.search
                    ? (m.search.startsWith("?") ? "" : "?") + m.search
                    : ""),
                  (s = m.hash || ""),
                  (i = m.auth ? m.auth + "@" : ""),
                  (a = m.host || ""),
                  (v.request =
                    (m.protocol || m[E] ? (m.protocol || "") + "//" : "") +
                    i +
                    a +
                    r +
                    n +
                    s),
                  delete v.options.query);
              }
              ("query" in v.options && delete v.options.query,
                "params" in v.options && delete v.options.params);
            }
            if (v.options.body && $(v.options.method))
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
                })(v.options.body)
              ) {
                let e = v.options.headers.get("content-type");
                ("string" != typeof v.options.body &&
                  (v.options.body =
                    "application/x-www-form-urlencoded" === e
                      ? new URLSearchParams(v.options.body).toString()
                      : JSON.stringify(v.options.body)),
                  e ||
                    v.options.headers.set("content-type", "application/json"),
                  v.options.headers.has("accept") ||
                    v.options.headers.set("accept", "application/json"));
              } else
                (("pipeTo" in v.options.body &&
                  "function" == typeof v.options.body.pipeTo) ||
                  "function" == typeof v.options.body.pipe) &&
                  !("duplex" in v.options) &&
                  (v.options.duplex = "half");
            if (!v.options.signal && v.options.timeout) {
              let e = new i();
              ((h = setTimeout(() => {
                let t = Error(
                  "[TimeoutError]: The operation was aborted due to timeout",
                );
                ((t.name = "TimeoutError"), (t.code = 23), e.abort(t));
              }, v.options.timeout)),
                (v.options.signal = e.signal));
            }
            try {
              v.response = await n(v.request, v.options);
            } catch (e) {
              return (
                (v.error = e),
                v.options.onRequestError &&
                  (await O(v, v.options.onRequestError)),
                await a(v)
              );
            } finally {
              h && clearTimeout(h);
            }
            if (
              (v.response.body || v.response._bodyInit) &&
              !T.has(v.response.status) &&
              "HEAD" !== v.options.method
            ) {
              let e =
                (v.options.parseResponse ? "json" : v.options.responseType) ||
                (function (e = "") {
                  if (!e) return "json";
                  let t = e.split(";").shift() || "";
                  return x.test(t)
                    ? "json"
                    : "text/event-stream" === t
                      ? "stream"
                      : I.has(t) || t.startsWith("text/")
                        ? "text"
                        : "blob";
                })(v.response.headers.get("content-type") || "");
              switch (e) {
                case "json": {
                  let e = await v.response.text(),
                    r = v.options.parseResponse || t.f;
                  v.response._data = r(e);
                  break;
                }
                case "stream":
                  v.response._data = v.response.body || v.response._bodyInit;
                  break;
                default:
                  v.response._data = await v.response[e]();
              }
            }
            return (v.options.onResponse && (await O(v, v.options.onResponse)),
            !v.options.ignoreResponseError &&
              v.response.status >= 400 &&
              v.response.status < 600)
              ? (v.options.onResponseError &&
                  (await O(v, v.options.onResponseError)),
                await a(v))
              : v.response;
          },
          l = async function (e, t) {
            return (await u(e, t))._data;
          };
        return (
          (l.raw = u),
          (l.native = (...e) => n(...e)),
          (l.create = (t = {}, n = {}) =>
            e({
              ...r,
              ...n,
              defaults: { ...r.defaults, ...n.defaults, ...t },
            })),
          l
        );
      },
    ],
    311629,
  );
};
