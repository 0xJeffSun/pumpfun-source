// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e, t, n) => {
  Object.defineProperty(n, "__esModule", { value: !0 });
  var r = {
    computeChangedPath: function () {
      return h;
    },
    extractPathFromFlightRouterState: function () {
      return f;
    },
    extractSourcePageFromFlightRouterState: function () {
      return d;
    },
    getSelectedParams: function () {
      return function e(t, n = {}) {
        for (let r of Object.values(t[1])) {
          let t = r[0],
            a = Array.isArray(t),
            l = a ? t[1] : t;
          l &&
            l !== u.PAGE_SEGMENT_KEY &&
            (a && ("c" === t[2] || "oc" === t[2])
              ? (n[t[0]] = t[1].split("/"))
              : a && (n[t[0]] = t[1]),
            (n = e(r, n)));
        }
        return n;
      };
    },
    segmentToSourcePagePathname: function () {
      return c;
    },
  };
  for (var a in r) Object.defineProperty(n, a, { enumerable: !0, get: r[a] });
  let l = e.r(800524),
    u = e.r(706957),
    o = (e) => ("/" === e[0] ? e.slice(1) : e),
    i = (e) => ("string" == typeof e ? ("children" === e ? "" : e) : e[1]),
    c = (e) => {
      if ("string" == typeof e)
        return "children" === e ? "" : e === u.PAGE_SEGMENT_KEY ? "page" : e;
      let [t, , n] = e;
      switch (n) {
        case "c":
          return `[...${t}]`;
        case "ci(..)(..)":
          return `(..)(..)[...${t}]`;
        case "ci(.)":
          return `(.)[...${t}]`;
        case "ci(..)":
          return `(..)[...${t}]`;
        case "ci(...)":
          return `(...)[...${t}]`;
        case "oc":
          return `[[...${t}]]`;
        case "d":
        default:
          return `[${t}]`;
        case "di(..)(..)":
          return `(..)(..)[${t}]`;
        case "di(.)":
          return `(.)[${t}]`;
        case "di(..)":
          return `(..)[${t}]`;
        case "di(...)":
          return `(...)[${t}]`;
      }
    };
  function s(e) {
    return (
      e.reduce(
        (e, t) =>
          "" === (t = o(t)) || (0, u.isGroupSegment)(t) ? e : `${e}/${t}`,
        "",
      ) || "/"
    );
  }
  function f(e) {
    let t = Array.isArray(e[0]) ? e[0][1] : e[0];
    if (
      t === u.DEFAULT_SEGMENT_KEY ||
      l.INTERCEPTION_ROUTE_MARKERS.some((e) => t.startsWith(e))
    )
      return;
    if (t === u.PAGE_SEGMENT_KEY) return "";
    let n = [i(t)],
      r = e[1] ?? {},
      a = r.children ? f(r.children) : void 0;
    if (void 0 !== a) n.push(a);
    else
      for (let [e, t] of Object.entries(r)) {
        if ("children" === e) continue;
        let r = f(t);
        void 0 !== r && n.push(r);
      }
    return s(n);
  }
  function d(e) {
    let t = (function e(t) {
      let n = c(t[0]);
      if (n === u.DEFAULT_SEGMENT_KEY) return;
      if ("page" === n) return [n];
      let r = t[1] ?? {},
        a = r.children ? e(r.children) : void 0;
      if (void 0 !== a) return "" === n ? a : [o(n), ...a];
      for (let [t, a] of Object.entries(r)) {
        if ("children" === t) continue;
        let r = e(a);
        if (void 0 !== r) return "" === n ? r : [o(n), ...r];
      }
    })(e);
    return t ? `/${t.join("/")}` : void 0;
  }
  function h(e, t) {
    let n = (function e(t, n) {
      let [r, a] = t,
        [o, c] = n,
        s = i(r),
        d = i(o);
      if (
        l.INTERCEPTION_ROUTE_MARKERS.some(
          (e) => s.startsWith(e) || d.startsWith(e),
        )
      )
        return "";
      if (
        ("string" == typeof r || "string" == typeof o
          ? r !== o
          : r[0] !== o[0] || r[1] !== o[1]) ||
        (r === u.PAGE_SEGMENT_KEY && t[5] !== n[5])
      )
        return f(n) ?? "";
      for (let t in a)
        if (c[t]) {
          let n = e(a[t], c[t]);
          if (null !== n) return `${i(o)}/${n}`;
        }
      return null;
    })(e, t);
    return null == n || "/" === n ? n : s(n.split("/"));
  }
  ("function" == typeof n.default ||
    ("object" == typeof n.default && null !== n.default)) &&
    void 0 === n.default.__esModule &&
    (Object.defineProperty(n.default, "__esModule", { value: !0 }),
    Object.assign(n.default, n),
    (t.exports = n.default));
};
