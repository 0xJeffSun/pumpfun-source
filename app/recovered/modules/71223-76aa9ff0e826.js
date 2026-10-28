// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e, t, n) => {
  Object.defineProperty(n, "__esModule", { value: !0 });
  var r = {
    createInitialRSCPayloadFromFallbackPrerender: function () {
      return o;
    },
    getNextFlightSegmentPath: function () {
      return i;
    },
    prepareFlightRouterStateForRequest: function () {
      return c;
    },
  };
  for (var a in r) Object.defineProperty(n, a, { enumerable: !0, get: r[a] });
  let l = e.r(188294),
    u = e.r(790661);
  function o(e, t) {
    let n = (0, l.getRenderedPathname)(e),
      r = (0, l.getRenderedSearch)(e),
      a = (0, u.createHrefFromUrl)(new URL(location.href)),
      o = t.t,
      i = {
        c: a.split("/"),
        q: r,
        i: t.i,
        t: {
          t: (function e(t, n, r) {
            let a,
              u,
              o,
              i = t.s;
            if ("string" == typeof i)
              ((a = i), (u = (0, l.doesStaticSegmentAppearInURL)(i)));
            else {
              let e = (0, l.parseDynamicParamFromURLPart)(i.t, n, r);
              ((a = {
                n: i.n,
                t: i.t,
                k: (0, l.getCacheKeyForDynamicParam)(e),
                s: i.s,
              }),
                (u = !0));
            }
            let c = u ? r + 1 : r,
              s = t.c;
            if (void 0 !== s)
              for (let [t, r] of ((o = new Map()), s)) o.set(t, e(r, n, c));
            let f = { s: a, d: t.d };
            return (
              void 0 !== t.h && (f.h = t.h),
              void 0 !== o && (f.c = o),
              f
            );
          })(
            o.t,
            n.split("/").filter((e) => "" !== e),
            0,
          ),
          h: o.h,
        },
        m: t.m,
        G: t.G,
        S: t.S,
      };
    return (t.b && (i.b = t.b), i);
  }
  function i(e) {
    return e.slice(2);
  }
  function c(e, t) {
    return t
      ? encodeURIComponent(JSON.stringify(e))
      : encodeURIComponent(
          JSON.stringify(
            (function e(t) {
              let [n, r, a, l, u] = t,
                o = (function (e) {
                  if ("string" == typeof e) return e;
                  let [t, n, r] = e;
                  return [t, n, r, null];
                })(n),
                i = {};
              for (let [t, n] of Object.entries(r)) i[t] = e(n);
              let c = [o, i];
              return (
                l && ((c[2] = null), (c[3] = l)),
                void 0 !== u && (c[4] = u),
                c
              );
            })(e),
          ),
        );
  }
  ("function" == typeof n.default ||
    ("object" == typeof n.default && null !== n.default)) &&
    void 0 === n.default.__esModule &&
    (Object.defineProperty(n.default, "__esModule", { value: !0 }),
    Object.assign(n.default, n),
    (t.exports = n.default));
};
