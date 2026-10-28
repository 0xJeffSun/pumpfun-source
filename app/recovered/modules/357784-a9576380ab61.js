// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(352386),
    l = e.i(156207),
    r = e.i(144977),
    n = e.i(93074),
    i = e.i(732486);
  e.s([
    "f",
    0,
    function (e) {
      let a = e + "CollectionProvider",
        [s, o] = (0, l.c)(a),
        [c, d] = s(a, { collectionRef: { current: null }, itemMap: new Map() }),
        u = (e) => {
          let { scope: l, children: r } = e,
            n = t.default.useRef(null),
            a = t.default.useRef(new Map()).current;
          return (0, i.jsx)(c, {
            scope: l,
            itemMap: a,
            collectionRef: n,
            children: r,
          });
        };
      u.displayName = a;
      let m = e + "CollectionSlot",
        f = (0, n.B)(m),
        x = t.default.forwardRef((e, t) => {
          let { scope: l, children: n } = e,
            a = d(m, l),
            s = (0, r.j)(t, a.collectionRef);
          return (0, i.jsx)(f, { ref: s, children: n });
        });
      x.displayName = m;
      let h = e + "CollectionItemSlot",
        p = "data-radix-collection-item",
        g = (0, n.B)(h),
        b = t.default.forwardRef((e, l) => {
          let { scope: n, children: a, ...s } = e,
            o = t.default.useRef(null),
            c = (0, r.j)(l, o),
            u = d(h, n);
          return (
            t.default.useEffect(
              () => (
                u.itemMap.set(o, { ref: o, ...s }),
                () => void u.itemMap.delete(o)
              ),
            ),
            (0, i.jsx)(g, { ...{ [p]: "" }, ref: c, children: a })
          );
        });
      return (
        (b.displayName = h),
        [
          { Provider: u, Slot: x, ItemSlot: b },
          function (l) {
            let r = d(e + "CollectionConsumer", l);
            return t.default.useCallback(() => {
              let e = r.collectionRef.current;
              if (!e) return [];
              let t = Array.from(e.querySelectorAll(`[${p}]`));
              return Array.from(r.itemMap.values()).sort(
                (e, l) => t.indexOf(e.ref.current) - t.indexOf(l.ref.current),
              );
            }, [r.collectionRef, r.itemMap]);
          },
          o,
        ]
      );
    },
  ]);
};
