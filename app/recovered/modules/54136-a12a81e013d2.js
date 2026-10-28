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
      rootMargin: i = "600px 0px 600px 0px",
      flushMs: l = 200,
      eagerCount: a = 24,
    }) {
      let s = (0, t.useRef)(new Map()),
        o = (0, t.useRef)(new Set()),
        c = (0, t.useRef)(new Set()),
        u = (0, t.useRef)(new Set()),
        d = (0, t.useRef)(null),
        m = (0, t.useRef)(null),
        f = (0, t.useCallback)(() => {
          if (!n) return [];
          let t = [];
          for (let r = 0; r < e.length; r++) {
            let n = e[r];
            n &&
              (o.current.has(n) ? !0 === s.current.get(n) : r < a) &&
              t.push(n);
          }
          return t;
        }, [e, a, n]),
        h = (0, t.useCallback)(
          (t) => {
            if (!n) return [];
            let r = new Set(t),
              i = [];
            for (let t = 0; t < e.length; t++) {
              let n = e[t];
              n && (t < a || c.current.has(n) || r.has(n)) && i.push(n);
            }
            return i;
          },
          [e, a, n],
        ),
        [p, g] = (0, t.useState)(() =>
          n ? e.slice(0, a).filter(Boolean) : [],
        ),
        [b, x] = (0, t.useState)(() =>
          n ? e.slice(0, a).filter(Boolean) : [],
        ),
        v = (0, t.useMemo)(() => {
          if (!n) return [];
          let t = new Set(b),
            r = [];
          for (let n = 0; n < e.length; n++) {
            let i = e[n];
            i && (n < a || t.has(i)) && r.push(i);
          }
          return r;
        }, [e, a, n, b]),
        y = (0, t.useCallback)(() => {
          ((m.current = null),
            g((e) => {
              let t = f();
              return r(e, t) ? e : t;
            }),
            x((e) => {
              let t = h(e);
              return r(e, t) ? e : t;
            }));
        }, [f, h]),
        w = (0, t.useRef)(y);
      (0, t.useEffect)(() => {
        w.current = y;
      }, [y]);
      let j = (0, t.useCallback)(() => {
          null == m.current && (m.current = setTimeout(() => w.current(), l));
        }, [l]),
        N = (0, t.useRef)(j);
      (0, t.useEffect)(() => {
        N.current = j;
      }, [j]);
      let C = (0, t.useCallback)((e) => {
        for (let t of e) {
          let e = t.target.id;
          e &&
            (o.current.add(e),
            s.current.set(e, t.isIntersecting),
            t.isIntersecting && c.current.add(e));
        }
        N.current();
      }, []);
      (0, t.useEffect)(() => {
        if (!n || "u" < typeof IntersectionObserver) return;
        let e = new IntersectionObserver(C, {
          root: null,
          rootMargin: i,
          threshold: 0,
        });
        return (
          (d.current = e),
          u.current.forEach((t) => e.observe(t)),
          () => {
            (e.disconnect(), (d.current = null));
          }
        );
      }, [n, i, C]);
      let _ = (0, t.useCallback)((e) => {
          if (e)
            return (
              u.current.add(e),
              d.current?.observe(e),
              () => {
                (u.current.delete(e), d.current?.unobserve(e));
              }
            );
        }, []),
        k = (0, t.useMemo)(() => e.join(","), [e]);
      return (
        (0, t.useEffect)(() => {
          let t = new Set(e.filter(Boolean));
          for (let e of Array.from(s.current.keys()))
            t.has(e) || s.current.delete(e);
          for (let e of Array.from(o.current)) t.has(e) || o.current.delete(e);
          for (let e of Array.from(c.current)) t.has(e) || c.current.delete(e);
          (g((e) => {
            let t = f();
            return r(e, t) ? e : t;
          }),
            x((e) => {
              let t = h(e);
              return r(e, t) ? e : t;
            }));
        }, [k, n]),
        (0, t.useEffect)(
          () => () => {
            null != m.current && (clearTimeout(m.current), (m.current = null));
          },
          [],
        ),
        { observe: _, visibleMints: p, seenMints: v }
      );
    },
  ]);
};
