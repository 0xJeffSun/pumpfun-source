// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(352386),
    r = Object.defineProperty,
    n = new Map(),
    i = new WeakMap(),
    l = 0,
    a = void 0;
  (t.Component,
    e.s([
      "f",
      0,
      function ({
        threshold: e,
        delay: r,
        trackVisibility: s,
        rootMargin: o,
        root: c,
        triggerOnce: u,
        skip: d,
        initialInView: m,
        fallbackInView: f,
        onChange: h,
      } = {}) {
        var p;
        let [g, b] = t.useState(null),
          x = t.useRef(),
          [v, y] = t.useState({ inView: !!m, entry: void 0 });
        ((x.current = h),
          t.useEffect(() => {
            let t;
            if (!d && g)
              return (
                (t = (function (e, t, r = {}, s = a) {
                  if (void 0 === window.IntersectionObserver && void 0 !== s) {
                    let n = e.getBoundingClientRect();
                    return (
                      t(s, {
                        isIntersecting: s,
                        target: e,
                        intersectionRatio:
                          "number" == typeof r.threshold ? r.threshold : 0,
                        time: 0,
                        boundingClientRect: n,
                        intersectionRect: n,
                        rootBounds: n,
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
                            var r;
                            return `${t}_${"root" === t ? (!(r = e.root) ? "0" : (i.has(r) || ((l += 1), i.set(r, l.toString())), i.get(r))) : e[t]}`;
                          })
                          .toString(),
                        r = n.get(t);
                      if (!r) {
                        let i,
                          l = new Map(),
                          a = new IntersectionObserver((t) => {
                            t.forEach((t) => {
                              var r;
                              let n =
                                t.isIntersecting &&
                                i.some((e) => t.intersectionRatio >= e);
                              (e.trackVisibility &&
                                void 0 === t.isVisible &&
                                (t.isVisible = n),
                                null == (r = l.get(t.target)) ||
                                  r.forEach((e) => {
                                    e(n, t);
                                  }));
                            });
                          }, e);
                        ((i =
                          a.thresholds ||
                          (Array.isArray(e.threshold)
                            ? e.threshold
                            : [e.threshold || 0])),
                          (r = { id: t, observer: a, elements: l }),
                          n.set(t, r));
                      }
                      return r;
                    })(r),
                    d = u.get(e) || [];
                  return (
                    u.has(e) || u.set(e, d),
                    d.push(t),
                    c.observe(e),
                    function () {
                      (d.splice(d.indexOf(t), 1),
                        0 === d.length && (u.delete(e), c.unobserve(e)),
                        0 === u.size && (c.disconnect(), n.delete(o)));
                    }
                  );
                })(
                  g,
                  (e, r) => {
                    (y({ inView: e, entry: r }),
                      x.current && x.current(e, r),
                      r.isIntersecting && u && t && (t(), (t = void 0)));
                  },
                  {
                    root: c,
                    rootMargin: o,
                    threshold: e,
                    trackVisibility: s,
                    delay: r,
                  },
                  f,
                )),
                () => {
                  t && t();
                }
              );
          }, [Array.isArray(e) ? e.toString() : e, g, c, o, u, d, s, f, r]));
        let w = null == (p = v.entry) ? void 0 : p.target,
          j = t.useRef();
        g ||
          !w ||
          u ||
          d ||
          j.current === w ||
          ((j.current = w), y({ inView: !!m, entry: void 0 }));
        let N = [b, v.inView, v.entry];
        return ((N.ref = N[0]), (N.inView = N[1]), (N.entry = N[2]), N);
      },
    ]));
};
