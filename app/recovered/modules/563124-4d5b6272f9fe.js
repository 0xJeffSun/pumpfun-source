// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(352386),
    n = Object.defineProperty,
    r = new Map(),
    i = new WeakMap(),
    l = 0,
    a = void 0;
  (t.Component,
    e.s([
      "f",
      0,
      function ({
        threshold: e,
        delay: n,
        trackVisibility: s,
        rootMargin: o,
        root: c,
        triggerOnce: u,
        skip: d,
        initialInView: m,
        fallbackInView: h,
        onChange: f,
      } = {}) {
        var p;
        let [g, b] = t.useState(null),
          _ = t.useRef(),
          [x, y] = t.useState({ inView: !!m, entry: void 0 });
        ((_.current = f),
          t.useEffect(() => {
            let t;
            if (!d && g)
              return (
                (t = (function (e, t, n = {}, s = a) {
                  if (void 0 === window.IntersectionObserver && void 0 !== s) {
                    let r = e.getBoundingClientRect();
                    return (
                      t(s, {
                        isIntersecting: s,
                        target: e,
                        intersectionRatio:
                          "number" == typeof n.threshold ? n.threshold : 0,
                        time: 0,
                        boundingClientRect: r,
                        intersectionRect: r,
                        rootBounds: r,
                      }),
                      () => {}
                    );
                  }
                  let {
                      id: o,
                      observer: c,
                      elements: u,
                    } = (function (e) {
                      let t = Object.keys(e)
                          .sort()
                          .filter((t) => void 0 !== e[t])
                          .map((t) => {
                            var n;
                            return `${t}_${"root" === t ? (!(n = e.root) ? "0" : (i.has(n) || ((l += 1), i.set(n, l.toString())), i.get(n))) : e[t]}`;
                          })
                          .toString(),
                        n = r.get(t);
                      if (!n) {
                        let i,
                          l = new Map(),
                          a = new IntersectionObserver((t) => {
                            t.forEach((t) => {
                              var n;
                              let r =
                                t.isIntersecting &&
                                i.some((e) => t.intersectionRatio >= e);
                              (e.trackVisibility &&
                                void 0 === t.isVisible &&
                                (t.isVisible = r),
                                null == (n = l.get(t.target)) ||
                                  n.forEach((e) => {
                                    e(r, t);
                                  }));
                            });
                          }, e);
                        ((i =
                          a.thresholds ||
                          (Array.isArray(e.threshold)
                            ? e.threshold
                            : [e.threshold || 0])),
                          (n = { id: t, observer: a, elements: l }),
                          r.set(t, n));
                      }
                      return n;
                    })(n),
                    d = u.get(e) || [];
                  return (
                    u.has(e) || u.set(e, d),
                    d.push(t),
                    c.observe(e),
                    function () {
                      (d.splice(d.indexOf(t), 1),
                        0 === d.length && (u.delete(e), c.unobserve(e)),
                        0 === u.size && (c.disconnect(), r.delete(o)));
                    }
                  );
                })(
                  g,
                  (e, n) => {
                    (y({ inView: e, entry: n }),
                      _.current && _.current(e, n),
                      n.isIntersecting && u && t && (t(), (t = void 0)));
                  },
                  {
                    root: c,
                    rootMargin: o,
                    threshold: e,
                    trackVisibility: s,
                    delay: n,
                  },
                  h,
                )),
                () => {
                  t && t();
                }
              );
          }, [Array.isArray(e) ? e.toString() : e, g, c, o, u, d, s, h, n]));
        let v = null == (p = x.entry) ? void 0 : p.target,
          k = t.useRef();
        g ||
          !v ||
          u ||
          d ||
          k.current === v ||
          ((k.current = v), y({ inView: !!m, entry: void 0 }));
        let w = [b, x.inView, x.entry];
        return ((w.ref = w[0]), (w.inView = w[1]), (w.entry = w[2]), w);
      },
    ]));
};
