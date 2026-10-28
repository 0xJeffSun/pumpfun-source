// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e, t, n) => {
  Object.defineProperty(n, "__esModule", { value: !0 });
  var r = {
    compareAppPaths: function () {
      return i;
    },
    normalizeAppPath: function () {
      return o;
    },
    normalizeRscURL: function () {
      return f;
    },
    selectAppPageEntry: function () {
      return s;
    },
  };
  for (var a in r) Object.defineProperty(n, a, { enumerable: !0, get: r[a] });
  let l = e.r(568187),
    u = e.r(706957);
  function o(e) {
    return (0, l.ensureLeadingSlash)(
      e
        .split("/")
        .reduce(
          (e, t, n, r) =>
            !t ||
            (0, u.isGroupSegment)(t) ||
            "@" === t[0] ||
            (("page" === t || "route" === t) && n === r.length - 1)
              ? e
              : `${e}/${t}`,
          "",
        ),
    );
  }
  function i(e, t) {
    let n = e.includes("/@"),
      r = t.includes("/@");
    return n && !r ? -1 : !n && r ? 1 : e.localeCompare(t);
  }
  function c(e) {
    return o(e).replace(/%5F/g, "_");
  }
  function s(e, t, n = c) {
    let r;
    for (let a of t) n(a) === e && (void 0 === r || 0 > i(r, a)) && (r = a);
    if (void 0 === r)
      throw Error(`Invariant: no direct app page entry found for ${e}`);
    return r;
  }
  function f(e) {
    return e.replace(/\.rsc($|\?)/, "$1");
  }
};
