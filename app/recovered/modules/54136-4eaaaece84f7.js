// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(352386);
  function r(e, t) {
    if (e.length !== t.length) return !1;
    for (let r = 0; r < e.length; r++) if (e[r] !== t[r]) return !1;
    return !0;
  }
  e.s([
    "f",
    0,
    function ({
      mints: e,
      enabled: n = !0,
      rootMargin: l = "600px 0px 600px 0px",
      flushMs: i = 200,
      eagerCount: u = 24,
    }) {
      let a = (0, t.useRef)(new Map()),
        s = (0, t.useRef)(new Set()),
        o = (0, t.useRef)(new Set()),
        c = (0, t.useRef)(new Set()),
        f = (0, t.useRef)(null),
        d = (0, t.useRef)(null),
        h = (0, t.useCallback)(() => {
          if (!n) return [];
          let t = [];
          for (let r = 0; r < e.length; r++) {
            let n = e[r];
            n &&
              (s.current.has(n) ? !0 === a.current.get(n) : r < u) &&
              t.push(n);
          }
          return t;
        }, [e, u, n]),
        E = (0, t.useCallback)(
          (t) => {
            if (!n) return [];
            let r = new Set(t),
              l = [];
            for (let t = 0; t < e.length; t++) {
              let n = e[t];
              n && (t < u || o.current.has(n) || r.has(n)) && l.push(n);
            }
            return l;
          },
          [e, u, n],
        ),
        [y, m] = (0, t.useState)(() =>
          n ? e.slice(0, u).filter(Boolean) : [],
        ),
        [g, S] = (0, t.useState)(() =>
          n ? e.slice(0, u).filter(Boolean) : [],
        ),
        p = (0, t.useMemo)(() => {
          if (!n) return [];
          let t = new Set(g),
            r = [];
          for (let n = 0; n < e.length; n++) {
            let l = e[n];
            l && (n < u || t.has(l)) && r.push(l);
          }
          return r;
        }, [e, u, n, g]),
        w = (0, t.useCallback)(() => {
          ((d.current = null),
            m((e) => {
              let t = h();
              return r(e, t) ? e : t;
            }),
            S((e) => {
              let t = E(e);
              return r(e, t) ? e : t;
            }));
        }, [h, E]),
        k = (0, t.useRef)(w);
      (0, t.useEffect)(() => {
        k.current = w;
      }, [w]);
      let b = (0, t.useCallback)(() => {
          null == d.current && (d.current = setTimeout(() => k.current(), i));
        }, [i]),
        T = (0, t.useRef)(b);
      (0, t.useEffect)(() => {
        T.current = b;
      }, [b]);
      let v = (0, t.useCallback)((e) => {
        for (let t of e) {
          let e = t.target.id;
          e &&
            (s.current.add(e),
            a.current.set(e, t.isIntersecting),
            t.isIntersecting && o.current.add(e));
        }
        T.current();
      }, []);
      (0, t.useEffect)(() => {
        if (!n || "u" < typeof IntersectionObserver) return;
        let e = new IntersectionObserver(v, {
          root: null,
          rootMargin: l,
          threshold: 0,
        });
        return (
          (f.current = e),
          c.current.forEach((t) => e.observe(t)),
          () => {
            (e.disconnect(), (f.current = null));
          }
        );
      }, [n, l, v]);
      let C = (0, t.useCallback)((e) => {
          if (e)
            return (
              c.current.add(e),
              f.current?.observe(e),
              () => {
                (c.current.delete(e), f.current?.unobserve(e));
              }
            );
        }, []),
        A = (0, t.useMemo)(() => e.join(","), [e]);
      return (
        (0, t.useEffect)(() => {
          let t = new Set(e.filter(Boolean));
          for (let e of Array.from(a.current.keys()))
            t.has(e) || a.current.delete(e);
          for (let e of Array.from(s.current)) t.has(e) || s.current.delete(e);
          for (let e of Array.from(o.current)) t.has(e) || o.current.delete(e);
          (m((e) => {
            let t = h();
            return r(e, t) ? e : t;
          }),
            S((e) => {
              let t = E(e);
              return r(e, t) ? e : t;
            }));
        }, [A, n]),
        (0, t.useEffect)(
          () => () => {
            null != d.current && (clearTimeout(d.current), (d.current = null));
          },
          [],
        ),
        { observe: C, visibleMints: y, seenMints: p }
      );
    },
  ]);
};
