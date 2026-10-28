// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e, t, r) => {
  var n = Object.create,
    i = Object.defineProperty,
    a = Object.getOwnPropertyDescriptor,
    s = Object.getOwnPropertyNames,
    o = Object.getPrototypeOf,
    l = Object.prototype.hasOwnProperty,
    c = (e, t) => i(e, "name", { value: t, configurable: !0 }),
    u = (e, t, r, n) => {
      if ((t && "object" == typeof t) || "function" == typeof t)
        for (let o of s(t))
          l.call(e, o) ||
            o === r ||
            i(e, o, {
              get: () => t[o],
              enumerable: !(n = a(t, o)) || n.enumerable,
            });
      return e;
    },
    d = (e, t, r) => (
      (r = null != e ? n(o(e)) : {}),
      u(
        !t && e && e.__esModule
          ? r
          : i(r, "default", { value: e, enumerable: !0 }),
        e,
      )
    ),
    m = {},
    f = { default: () => v };
  for (var p in f) i(m, p, { get: f[p], enumerable: !0 });
  t.exports = u(i({}, "__esModule", { value: !0 }), m);
  var h = d(e.r(304153)),
    y = d(e.r(352386)),
    b = d(e.r(123374)),
    g = c(
      ({
        color: e,
        height: t,
        showSpinner: r,
        crawl: n,
        crawlSpeed: i,
        initialPosition: a,
        easing: s,
        speed: o,
        shadow: l,
        template: u,
        zIndex: d = 1600,
        showAtBottom: m = !1,
      }) => {
        let f = null != e ? e : "#29d",
          p =
            l || void 0 === l
              ? l
                ? `box-shadow:${l}`
                : `box-shadow:0 0 10px ${f},0 0 5px ${f}`
              : "",
          h = y.createElement(
            "style",
            null,
            `#nprogress{pointer-events:none}#nprogress .bar{background:${f};position:fixed;z-index:${d};${m ? "bottom: 0;" : "top: 0;"}left:0;width:100%;height:${null != t ? t : 3}px}#nprogress .peg{display:block;position:absolute;right:0;width:100px;height:100%;${p};opacity:1;-webkit-transform:rotate(3deg) translate(0px,-4px);-ms-transform:rotate(3deg) translate(0px,-4px);transform:rotate(3deg) translate(0px,-4px)}#nprogress .spinner{display:block;position:fixed;z-index:${d};${m ? "bottom: 15px;" : "top: 15px;"}right:15px}#nprogress .spinner-icon{width:18px;height:18px;box-sizing:border-box;border:2px solid transparent;border-top-color:${f};border-left-color:${f};border-radius:50%;-webkit-animation:nprogress-spinner 400ms linear infinite;animation:nprogress-spinner 400ms linear infinite}.nprogress-custom-parent{overflow:hidden;position:relative}.nprogress-custom-parent #nprogress .bar,.nprogress-custom-parent #nprogress .spinner{position:absolute}@-webkit-keyframes nprogress-spinner{0%{-webkit-transform:rotate(0deg)}100%{-webkit-transform:rotate(360deg)}}@keyframes nprogress-spinner{0%{transform:rotate(0deg)}100%{transform:rotate(360deg)}}`,
          ),
          g = c((e) => new URL(e, window.location.href).href, "toAbsoluteURL"),
          v = c((e, t) => {
            let r = new URL(g(e)),
              n = new URL(g(t));
            return r.href.split("#")[0] === n.href.split("#")[0];
          }, "isHashAnchor"),
          w = c((e, t) => {
            let r = new URL(g(e)),
              n = new URL(g(t));
            return (
              r.hostname.replace(/^www\./, "") ===
              n.hostname.replace(/^www\./, "")
            );
          }, "isSameHostName");
        return (
          y.useEffect(() => {
            let e, t;
            function l(e, t) {
              let r = new URL(e),
                n = new URL(t);
              if (
                r.hostname === n.hostname &&
                r.pathname === n.pathname &&
                r.search === n.search
              ) {
                let e = r.hash,
                  t = n.hash;
                return (
                  e !== t && r.href.replace(e, "") === n.href.replace(t, "")
                );
              }
              return !1;
            }
            (b.configure({
              showSpinner: null == r || r,
              trickle: null == n || n,
              trickleSpeed: null != i ? i : 200,
              minimum: null != a ? a : 0.08,
              easing: null != s ? s : "ease",
              speed: null != o ? o : 200,
              template:
                null != u
                  ? u
                  : '<div class="bar" role="bar"><div class="peg"></div></div><div class="spinner" role="spinner"><div class="spinner-icon"></div></div>',
            }),
              c(l, "isAnchorOfCurrentUrl"));
            var d,
              m,
              f = document.querySelectorAll("html");
            let p = c(
              () => f.forEach((e) => e.classList.remove("nprogress-busy")),
              "removeNProgressClass",
            );
            function h(e) {
              for (; e && "a" !== e.tagName.toLowerCase(); )
                e = e.parentElement;
              return e;
            }
            function y(e) {
              try {
                let t = e.target,
                  r = h(t),
                  n = null == r ? void 0 : r.href;
                if (n) {
                  let t = window.location.href,
                    i = "_blank" === r.target,
                    a = ["tel:", "mailto:", "sms:", "blob:", "download:"].some(
                      (e) => n.startsWith(e),
                    ),
                    s = l(t, n);
                  if (!w(window.location.href, r.href)) return;
                  n === t ||
                  s ||
                  i ||
                  a ||
                  e.ctrlKey ||
                  e.metaKey ||
                  e.shiftKey ||
                  e.altKey ||
                  v(window.location.href, r.href) ||
                  !g(r.href).startsWith("http")
                    ? (b.start(), b.done(), p())
                    : b.start();
                }
              } catch (e) {
                (b.start(), b.done());
              }
            }
            function x() {
              (b.done(), p());
            }
            function _() {
              b.done();
            }
            return (
              c(h, "findClosestAnchor"),
              c(y, "handleClick"),
              (e = (d = window.history).pushState),
              (d.pushState = (...t) => (b.done(), p(), e.apply(d, t))),
              (t = (m = window.history).replaceState),
              (m.replaceState = (...e) => (b.done(), p(), t.apply(m, e))),
              c(x, "handlePageHide"),
              c(_, "handleBackAndForth"),
              window.addEventListener("popstate", _),
              document.addEventListener("click", y),
              window.addEventListener("pagehide", x),
              () => {
                (document.removeEventListener("click", y),
                  window.removeEventListener("pagehide", x),
                  window.removeEventListener("popstate", _));
              }
            );
          }, []),
          h
        );
      },
      "NextTopLoader",
    ),
    v = g;
  g.propTypes = {
    color: h.string,
    height: h.number,
    showSpinner: h.bool,
    crawl: h.bool,
    crawlSpeed: h.number,
    initialPosition: h.number,
    easing: h.string,
    speed: h.number,
    template: h.string,
    shadow: h.oneOfType([h.string, h.bool]),
    zIndex: h.number,
    showAtBottom: h.bool,
  };
};
