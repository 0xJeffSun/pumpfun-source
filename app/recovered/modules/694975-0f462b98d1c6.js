// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t,
    n = e.i(352386),
    r = e.i(565693),
    i = e.i(524932);
  let o =
    (((t = {})[(t.None = 0)] = "None"),
    (t[(t.GuessFromOrder = 1)] = "GuessFromOrder"),
    t);
  e.s([
    "f",
    0,
    function (e = {}) {
      let {
          label: t,
          metadata: l,
          textRef: s,
          indexGuessBehavior: u,
          index: a,
        } = e,
        {
          register: c,
          unregister: f,
          subscribeMapChange: d,
          elementsRef: p,
          labelsRef: g,
          nextIndexRef: h,
        } = (0, i.Q)(),
        m = n.useRef(-1),
        [v, y] = n.useState(
          a ??
            (u === o.GuessFromOrder
              ? () => {
                  if (-1 === m.current) {
                    let e = h.current;
                    ((h.current += 1), (m.current = e));
                  }
                  return m.current;
                }
              : -1),
        ),
        b = n.useRef(null),
        w = n.useCallback(
          (e) => {
            if (
              ((b.current = e),
              -1 !== v && null !== e && ((p.current[v] = e), g))
            ) {
              let n = void 0 !== t;
              g.current[v] = n ? t : (s?.current?.textContent ?? e.textContent);
            }
          },
          [v, p, g, t, s],
        );
      return (
        (0, r.f)(() => {
          if (null != a) return;
          let e = b.current;
          if (e)
            return (
              c(e, l),
              () => {
                f(e);
              }
            );
        }, [a, c, f, l]),
        (0, r.f)(() => {
          if (null == a)
            return d((e) => {
              let t = b.current ? e.get(b.current)?.index : null;
              null != t && y(t);
            });
        }, [a, d, y]),
        n.useMemo(() => ({ ref: w, index: v }), [v, w])
      );
    },
  ]);
};
