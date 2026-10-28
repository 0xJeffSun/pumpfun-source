// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e, t, n) => {
  Object.defineProperty(n, "__esModule", { value: !0 });
  var r = {
    INTERCEPTION_ROUTE_MARKERS: function () {
      return u;
    },
    extractInterceptionRouteInformation: function () {
      return d;
    },
    findMissingCanonicalInterceptionRoutes: function () {
      return h;
    },
    isInterceptionRouteAppPath: function () {
      return f;
    },
  };
  for (var a in r) Object.defineProperty(n, a, { enumerable: !0, get: r[a] });
  let l = e.r(58469),
    u = ["(..)(..)", "(.)", "(..)", "(...)"];
  function o(e) {
    let t = e.split("/").filter(Boolean),
      n = t.at(-1),
      r = void 0 !== n && n.startsWith("[[...") && n.endsWith("]]"),
      a = void 0 !== n && n.startsWith("[...") && n.endsWith("]"),
      l = r || a,
      u = l ? t.slice(0, -1) : t;
    return {
      prefix: u.map((e) => (e.startsWith("[") && e.endsWith("]") ? null : e)),
      minLength: u.length + (a && !r ? 1 : 0),
      unbounded: l,
    };
  }
  function i(e, t) {
    return e.unbounded ? t >= e.minLength : t === e.minLength;
  }
  function c(e, t) {
    return e.prefix.every((e, n) => {
      if (null === e) return !0;
      let r = t.prefix[n];
      return null != r && e === r;
    });
  }
  function s(e, t, n) {
    return i(e, n) && i(t, n) && c(e, t);
  }
  function f(e) {
    return void 0 !== e.split("/").find((e) => u.find((t) => e.startsWith(t)));
  }
  function d(e) {
    let t, n, r;
    for (let a of e.split("/"))
      if ((n = u.find((e) => a.startsWith(e)))) {
        [t, r] = e.split(n, 2);
        break;
      }
    if (!t || !n || !r)
      throw Error(
        `Invalid interception route: ${e}. Must be in the format /<intercepting route>/(..|...|..)(..)/<intercepted route>`,
      );
    switch (((t = (0, l.normalizeAppPath)(t)), n)) {
      case "(.)":
        r = "/" === t ? `/${r}` : t + "/" + r;
        break;
      case "(..)":
        if ("/" === t)
          throw Error(
            `Invalid interception route: ${e}. Cannot use (..) marker at the root level, use (.) instead.`,
          );
        r = t.split("/").slice(0, -1).concat(r).join("/");
        break;
      case "(...)":
        r = "/" + r;
        break;
      case "(..)(..)":
        let a = t.split("/");
        if (a.length <= 2)
          throw Error(
            `Invalid interception route: ${e}. Cannot use (..)(..) marker at the root level or one level up.`,
          );
        r = a.slice(0, -2).concat(r).join("/");
        break;
      default:
        throw Error("Invariant: unexpected marker");
    }
    return { interceptingRoute: t, interceptedRoute: r };
  }
  function h(e) {
    let t = Object.keys(e)
      .filter((e) => !f(e))
      .map(o);
    return Object.keys(e)
      .filter(f)
      .map((e) => ({
        interceptionRoute: e,
        canonicalRoute: d(e).interceptedRoute,
      }))
      .filter(
        ({ canonicalRoute: e }) =>
          !(function (e, t) {
            let n = o(e);
            if (!n.unbounded) return t.some((e) => s(e, n, n.minLength));
            let r = 1 / 0;
            for (let e of t)
              e.unbounded &&
                c(e, n) &&
                (r = Math.min(r, Math.max(n.minLength, e.minLength)));
            if (1 / 0 === r) return !1;
            for (let e = n.minLength; e < r; e++)
              if (!t.some((t) => s(t, n, e))) return !1;
            return !0;
          })(e, t),
      )
      .sort((e, t) => e.interceptionRoute.localeCompare(t.interceptionRoute));
  }
};
