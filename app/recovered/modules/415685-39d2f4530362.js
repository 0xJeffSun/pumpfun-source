// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e, t, r) => {
  var a = Object.create,
    n = Object.defineProperty,
    o = Object.getOwnPropertyDescriptor,
    i = Object.getOwnPropertyNames,
    l = Object.getPrototypeOf,
    s = Object.prototype.hasOwnProperty,
    u = (e, t, r, a) => {
      if ((t && "object" == typeof t) || "function" == typeof t)
        for (let l of i(t))
          s.call(e, l) ||
            l === r ||
            n(e, l, {
              get: () => t[l],
              enumerable: !(a = o(t, l)) || a.enumerable,
            });
      return e;
    },
    c = (e, t, r) => (
      (r = null != e ? a(l(e)) : {}),
      u(
        !t && e && e.__esModule
          ? r
          : n(r, "default", { value: e, enumerable: !0 }),
        e,
      )
    ),
    p = {},
    y = {
      callPlayer: () => R,
      getConfig: () => C,
      getSDK: () => E,
      isBlobUrl: () => x,
      isMediaStream: () => I,
      lazy: () => b,
      omit: () => M,
      parseEndTime: () => j,
      parseStartTime: () => k,
      queryString: () => A,
      randomString: () => _,
      supportsWebKitPresentationMode: () => L,
    };
  for (var d in y) n(p, d, { get: y[d], enumerable: !0 });
  t.exports = u(n({}, "__esModule", { value: !0 }), p);
  var h = c(e.r(352386)),
    f = c(e.r(157664)),
    m = c(e.r(126612));
  let b = (e) =>
      h.default.lazy(async () => {
        let t = await e();
        return "function" == typeof t.default ? t : t.default;
      }),
    P = /[?&#](?:start|t)=([0-9hms]+)/,
    g = /[?&#]end=([0-9hms]+)/,
    v = /(\d+)(h|m|s)/g,
    w = /^\d+$/;
  function O(e, t) {
    if (e instanceof Array) return;
    let r = e.match(t);
    if (r) {
      let e = r[1];
      if (e.match(v)) {
        var a = e;
        let t = 0,
          r = v.exec(a);
        for (; null !== r; ) {
          let [, e, n] = r;
          ("h" === n && (t += 60 * parseInt(e, 10) * 60),
            "m" === n && (t += 60 * parseInt(e, 10)),
            "s" === n && (t += parseInt(e, 10)),
            (r = v.exec(a)));
        }
        return t;
      }
      if (w.test(e)) return parseInt(e);
    }
  }
  function k(e) {
    return O(e, P);
  }
  function j(e) {
    return O(e, g);
  }
  function _() {
    return Math.random().toString(36).substr(2, 5);
  }
  function A(e) {
    return Object.keys(e)
      .map((t) => `${t}=${e[t]}`)
      .join("&");
  }
  function S(e) {
    return window[e]
      ? window[e]
      : window.exports && window.exports[e]
        ? window.exports[e]
        : window.module && window.module.exports && window.module.exports[e]
          ? window.module.exports[e]
          : null;
  }
  let T = {},
    E = function (e, t, r = null, a = () => !0, n = f.default) {
      let o = S(t);
      return o && a(o)
        ? Promise.resolve(o)
        : new Promise((a, o) => {
            if (T[e]) return void T[e].push({ resolve: a, reject: o });
            T[e] = [{ resolve: a, reject: o }];
            let i = (t) => {
              T[e].forEach((e) => e.resolve(t));
            };
            if (r) {
              let e = window[r];
              window[r] = function () {
                (e && e(), i(S(t)));
              };
            }
            n(e, (a) => {
              a
                ? (T[e].forEach((e) => e.reject(a)), (T[e] = null))
                : r || i(S(t));
            });
          });
    };
  function C(e, t) {
    return (0, m.default)(t.config, e.config);
  }
  function M(e, ...t) {
    let r = [].concat(...t),
      a = {};
    for (let t of Object.keys(e)) -1 === r.indexOf(t) && (a[t] = e[t]);
    return a;
  }
  function R(e, ...t) {
    if (!this.player || !this.player[e]) {
      let t = `ReactPlayer: ${this.constructor.displayName} player could not call %c${e}%c – `;
      return (
        this.player
          ? this.player[e] || (t += "The method was not available")
          : (t += "The player was not available"),
        console.warn(t, "font-weight: bold", ""),
        null
      );
    }
    return this.player[e](...t);
  }
  function I(e) {
    return (
      "u" > typeof window &&
      void 0 !== window.MediaStream &&
      e instanceof window.MediaStream
    );
  }
  function x(e) {
    return /^blob:/.test(e);
  }
  function L(e = document.createElement("video")) {
    let t = !1 === /iPhone|iPod/.test(navigator.userAgent);
    return (
      e.webkitSupportsPresentationMode &&
      "function" == typeof e.webkitSetPresentationMode &&
      t
    );
  }
};
