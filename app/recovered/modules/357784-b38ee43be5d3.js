// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(352386),
    r = e.i(156207),
    n = e.i(144977),
    l = e.i(93074),
    o = e.i(732486);
  e.s([
    "f",
    0,
    function (e) {
      let a = e + "CollectionProvider",
        [i, s] = (0, r.c)(a),
        [d, u] = i(a, { collectionRef: { current: null }, itemMap: new Map() }),
        c = (e) => {
          let { scope: r, children: n } = e,
            l = t.default.useRef(null),
            a = t.default.useRef(new Map()).current;
          return (0, o.jsx)(d, {
            scope: r,
            itemMap: a,
            collectionRef: l,
            children: n,
          });
        };
      c.displayName = a;
      let f = e + "CollectionSlot",
        p = (0, l.B)(f),
        h = t.default.forwardRef((e, t) => {
          let { scope: r, children: l } = e,
            a = u(f, r),
            i = (0, n.j)(t, a.collectionRef);
          return (0, o.jsx)(p, { ref: i, children: l });
        });
      h.displayName = f;
      let v = e + "CollectionItemSlot",
        m = "data-radix-collection-item",
        w = (0, l.B)(v),
        g = t.default.forwardRef((e, r) => {
          let { scope: l, children: a, ...i } = e,
            s = t.default.useRef(null),
            d = (0, n.j)(r, s),
            c = u(v, l);
          return (
            t.default.useEffect(
              () => (
                c.itemMap.set(s, { ref: s, ...i }),
                () => void c.itemMap.delete(s)
              ),
            ),
            (0, o.jsx)(w, { ...{ [m]: "" }, ref: d, children: a })
          );
        });
      return (
        (g.displayName = v),
        [
          { Provider: c, Slot: h, ItemSlot: g },
          function (r) {
            let n = u(e + "CollectionConsumer", r);
            return t.default.useCallback(() => {
              let e = n.collectionRef.current;
              if (!e) return [];
              let t = Array.from(e.querySelectorAll(`[${m}]`));
              return Array.from(n.itemMap.values()).sort(
                (e, r) => t.indexOf(e.ref.current) - t.indexOf(r.ref.current),
              );
            }, [n.collectionRef, n.itemMap]);
          },
          s,
        ]
      );
    },
  ]);
};
