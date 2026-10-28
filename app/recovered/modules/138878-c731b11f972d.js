// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(352386),
    n = e.i(303232),
    r = e.i(278051),
    i = e.i(565693),
    o = e.i(524932),
    l = e.i(732486);
  function s() {
    return new Map();
  }
  function u() {
    return new Set();
  }
  function a(e, t) {
    let n = e.compareDocumentPosition(t);
    return n & Node.DOCUMENT_POSITION_FOLLOWING ||
      n & Node.DOCUMENT_POSITION_CONTAINED_BY
      ? -1
      : n & Node.DOCUMENT_POSITION_PRECEDING ||
          n & Node.DOCUMENT_POSITION_CONTAINS
        ? 1
        : 0;
  }
  e.s([
    "f",
    0,
    function (e) {
      let { children: c, elementsRef: f, labelsRef: d, onMapChange: p } = e,
        g = (0, r.f)(p),
        h = t.useRef(0),
        m = (0, n.f)(u).current,
        v = (0, n.f)(s).current,
        [y, b] = t.useState(0),
        w = t.useRef(y),
        E = (0, r.f)((e, t) => {
          (v.set(e, t ?? null), (w.current += 1), b(w.current));
        }),
        x = (0, r.f)((e) => {
          (v.delete(e), (w.current += 1), b(w.current));
        }),
        R = t.useMemo(() => {
          let e = new Map();
          return (
            Array.from(v.keys())
              .filter((e) => e.isConnected)
              .sort(a)
              .forEach((t, n) => {
                let r = v.get(t) ?? {};
                e.set(t, { ...r, index: n });
              }),
            e
          );
        }, [v, y]);
      ((0, i.f)(() => {
        if ("function" != typeof MutationObserver || 0 === R.size) return;
        let e = new MutationObserver((e) => {
          let t = new Set(),
            n = (e) => (t.has(e) ? t.delete(e) : t.add(e));
          (e.forEach((e) => {
            (e.removedNodes.forEach(n), e.addedNodes.forEach(n));
          }),
            0 === t.size && ((w.current += 1), b(w.current)));
        });
        return (
          R.forEach((t, n) => {
            n.parentElement && e.observe(n.parentElement, { childList: !0 });
          }),
          () => {
            e.disconnect();
          }
        );
      }, [R]),
        (0, i.f)(() => {
          (w.current === y &&
            (f.current.length !== R.size && (f.current.length = R.size),
            d && d.current.length !== R.size && (d.current.length = R.size),
            (h.current = R.size)),
            g(R));
        }, [g, R, f, d, y]),
        (0, i.f)(
          () => () => {
            f.current = [];
          },
          [f],
        ),
        (0, i.f)(
          () => () => {
            d && (d.current = []);
          },
          [d],
        ));
      let S = (0, r.f)(
        (e) => (
          m.add(e),
          () => {
            m.delete(e);
          }
        ),
      );
      (0, i.f)(() => {
        m.forEach((e) => e(R));
      }, [m, R]);
      let T = t.useMemo(
        () => ({
          register: E,
          unregister: x,
          subscribeMapChange: S,
          elementsRef: f,
          labelsRef: d,
          nextIndexRef: h,
        }),
        [E, x, S, f, d, h],
      );
      return (0, l.jsx)(o.i.Provider, { value: T, children: c });
    },
  ]);
};
