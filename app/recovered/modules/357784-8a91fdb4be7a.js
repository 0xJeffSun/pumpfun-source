// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(352386),
    r = e.i(156207),
    a = e.i(144977),
    i = e.i(93074),
    n = e.i(732486);
  e.s([
    "f",
    0,
    function (e) {
      let l = e + "CollectionProvider",
        [s, o] = (0, r.c)(l),
        [c, d] = s(l, { collectionRef: { current: null }, itemMap: new Map() }),
        m = (e) => {
          let { scope: r, children: a } = e,
            i = t.default.useRef(null),
            l = t.default.useRef(new Map()).current;
          return (0, n.jsx)(c, {
            scope: r,
            itemMap: l,
            collectionRef: i,
            children: a,
          });
        };
      m.displayName = l;
      let u = e + "CollectionSlot",
        f = (0, i.B)(u),
        h = t.default.forwardRef((e, t) => {
          let { scope: r, children: i } = e,
            l = d(u, r),
            s = (0, a.j)(t, l.collectionRef);
          return (0, n.jsx)(f, { ref: s, children: i });
        });
      h.displayName = u;
      let p = e + "CollectionItemSlot",
        x = "data-radix-collection-item",
        g = (0, i.B)(p),
        b = t.default.forwardRef((e, r) => {
          let { scope: i, children: l, ...s } = e,
            o = t.default.useRef(null),
            c = (0, a.j)(r, o),
            m = d(p, i);
          return (
            t.default.useEffect(
              () => (
                m.itemMap.set(o, { ref: o, ...s }),
                () => void m.itemMap.delete(o)
              ),
            ),
            (0, n.jsx)(g, { ...{ [x]: "" }, ref: c, children: l })
          );
        });
      return (
        (b.displayName = p),
        [
          { Provider: m, Slot: h, ItemSlot: b },
          function (r) {
            let a = d(e + "CollectionConsumer", r);
            return t.default.useCallback(() => {
              let e = a.collectionRef.current;
              if (!e) return [];
              let t = Array.from(e.querySelectorAll(`[${x}]`));
              return Array.from(a.itemMap.values()).sort(
                (e, r) => t.indexOf(e.ref.current) - t.indexOf(r.ref.current),
              );
            }, [a.collectionRef, a.itemMap]);
          },
          o,
        ]
      );
    },
  ]);
};
