// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e, t, r) => {
  (e.i(149502), Object.defineProperty(r, "__esModule", { value: !0 }));
  var n = {
    formatUrl: function () {
      return a;
    },
    formatWithValidation: function () {
      return u;
    },
    urlObjectKeys: function () {
      return l;
    },
  };
  for (var o in n) Object.defineProperty(r, o, { enumerable: !0, get: n[o] });
  let i = e.r(56421)._(e.r(830017)),
    s = /https?|ftp|gopher|file/;
  function a(e) {
    let { auth: t, hostname: r } = e,
      n = e.protocol || "",
      o = e.pathname || "",
      a = e.hash || "",
      l = e.query || "",
      u = !1;
    ((t = t ? encodeURIComponent(t).replace(/%3A/i, ":") + "@" : ""),
      e.host
        ? (u = t + e.host)
        : r &&
          ((u = t + (~r.indexOf(":") ? `[${r}]` : r)),
          e.port && (u += ":" + e.port)),
      l && "object" == typeof l && (l = String(i.urlQueryToSearchParams(l))));
    let c = e.search || (l && `?${l}`) || "";
    return (
      n && !n.endsWith(":") && (n += ":"),
      e.slashes || ((!n || s.test(n)) && !1 !== u)
        ? ((u = "//" + (u || "")), o && "/" !== o[0] && (o = "/" + o))
        : u || (u = ""),
      a && "#" !== a[0] && (a = "#" + a),
      c && "?" !== c[0] && (c = "?" + c),
      (o = o.replace(/[?#]/g, encodeURIComponent)),
      (c = c.replace("#", "%23")),
      `${n}${u}${o}${c}${a}`
    );
  }
  let l = [
    "auth",
    "hash",
    "host",
    "hostname",
    "href",
    "path",
    "pathname",
    "port",
    "protocol",
    "query",
    "search",
    "slashes",
  ];
  function u(e) {
    return a(e);
  }
};
