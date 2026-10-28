// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(352386);
  function n(e, t) {
    if (e.length !== t.length) return !1;
    for (let n = 0; n < e.length; n++) if (e[n] !== t[n]) return !1;
    return !0;
  }
  e.s([
    "f",
    0,
    function ({
      mints: e,
      enabled: r = !0,
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
        h = (0, t.useCallback)(() => {
          if (!r) return [];
          let t = [];
          for (let n = 0; n < e.length; n++) {
            let r = e[n];
            r &&
              (o.current.has(r) ? !0 === s.current.get(r) : n < a) &&
              t.push(r);
          }
          return t;
        }, [e, a, r]),
        f = (0, t.useCallback)(
          (t) => {
            if (!r) return [];
            let n = new Set(t),
              i = [];
            for (let t = 0; t < e.length; t++) {
              let r = e[t];
              r && (t < a || c.current.has(r) || n.has(r)) && i.push(r);
            }
            return i;
          },
          [e, a, r],
        ),
        [p, g] = (0, t.useState)(() =>
          r ? e.slice(0, a).filter(Boolean) : [],
        ),
        [b, _] = (0, t.useState)(() =>
          r ? e.slice(0, a).filter(Boolean) : [],
        ),
        x = (0, t.useMemo)(() => {
          if (!r) return [];
          let t = new Set(b),
            n = [];
          for (let r = 0; r < e.length; r++) {
            let i = e[r];
            i && (r < a || t.has(i)) && n.push(i);
          }
          return n;
        }, [e, a, r, b]),
        y = (0, t.useCallback)(() => {
          ((m.current = null),
            g((e) => {
              let t = h();
              return n(e, t) ? e : t;
            }),
            _((e) => {
              let t = f(e);
              return n(e, t) ? e : t;
            }));
        }, [h, f]),
        v = (0, t.useRef)(y);
      (0, t.useEffect)(() => {
        v.current = y;
      }, [y]);
      let k = (0, t.useCallback)(() => {
          null == m.current && (m.current = setTimeout(() => v.current(), l));
        }, [l]),
        w = (0, t.useRef)(k);
      (0, t.useEffect)(() => {
        w.current = k;
      }, [k]);
      let j = (0, t.useCallback)((e) => {
        for (let t of e) {
          let e = t.target.id;
          e &&
            (o.current.add(e),
            s.current.set(e, t.isIntersecting),
            t.isIntersecting && c.current.add(e));
        }
        w.current();
      }, []);
      (0, t.useEffect)(() => {
        if (!r || "u" < typeof IntersectionObserver) return;
        let e = new IntersectionObserver(j, {
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
      }, [r, i, j]);
      let N = (0, t.useCallback)((e) => {
          if (e)
            return (
              u.current.add(e),
              d.current?.observe(e),
              () => {
                (u.current.delete(e), d.current?.unobserve(e));
              }
            );
        }, []),
        S = (0, t.useMemo)(() => e.join(","), [e]);
      return (
        (0, t.useEffect)(() => {
          let t = new Set(e.filter(Boolean));
          for (let e of Array.from(s.current.keys()))
            t.has(e) || s.current.delete(e);
          for (let e of Array.from(o.current)) t.has(e) || o.current.delete(e);
          for (let e of Array.from(c.current)) t.has(e) || c.current.delete(e);
          (g((e) => {
            let t = h();
            return n(e, t) ? e : t;
          }),
            _((e) => {
              let t = f(e);
              return n(e, t) ? e : t;
            }));
        }, [S, r]),
        (0, t.useEffect)(
          () => () => {
            null != m.current && (clearTimeout(m.current), (m.current = null));
          },
          [],
        ),
        { observe: N, visibleMints: p, seenMints: x }
      );
    },
  ]);
};
