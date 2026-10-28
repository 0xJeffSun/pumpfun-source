// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  "use strict";
  var t = e.i(352386),
    r = e.i(879499),
    l = e.i(189816);
  function i(e, t, r) {
    let l = e.slice();
    return (l.splice(r < 0 ? l.length + r : r, 0, l.splice(t, 1)[0]), l);
  }
  function n(e) {
    return null !== e && e >= 0;
  }
  let a = { scaleX: 1, scaleY: 1 },
    s = (e) => {
      let { rects: t, activeIndex: r, overIndex: l, index: n } = e,
        a = i(t, l, r),
        s = t[n],
        o = a[n];
      return o && s
        ? {
            x: o.left - s.left,
            y: o.top - s.top,
            scaleX: o.width / s.width,
            scaleY: o.height / s.height,
          }
        : null;
    },
    o = { scaleX: 1, scaleY: 1 },
    c = "Sortable",
    d = t.default.createContext({
      activeIndex: -1,
      containerId: c,
      disableTransforms: !1,
      items: [],
      overIndex: -1,
      useDragOverlay: !1,
      sortedRects: [],
      strategy: s,
      disabled: { draggable: !1, droppable: !1 },
    }),
    u = (e) => {
      let { id: t, items: r, activeIndex: l, overIndex: n } = e;
      return i(r, l, n).indexOf(t);
    },
    m = (e) => {
      let {
        containerId: t,
        isSorting: r,
        wasDragging: l,
        index: i,
        items: n,
        newIndex: a,
        previousItems: s,
        previousContainerId: o,
        transition: c,
      } = e;
      return (
        !!c && !!l && (s === n || i !== a) && (!!r || (a !== i && t === o))
      );
    },
    x = { duration: 200, easing: "ease" },
    f = "transform",
    h = l.r.Transition.toString({ property: f, duration: 0, easing: "linear" }),
    p = { roleDescription: "sortable" };
  function b(e) {
    if (!e) return !1;
    let t = e.data.current;
    return (
      !!t &&
      "sortable" in t &&
      "object" == typeof t.sortable &&
      "containerId" in t.sortable &&
      "items" in t.sortable &&
      "index" in t.sortable
    );
  }
  let g = [r.M.Down, r.M.Right, r.M.Up, r.M.Left];
  function y(e, t) {
    return (
      !!b(e) &&
      !!b(t) &&
      e.data.current.sortable.containerId ===
        t.data.current.sortable.containerId
    );
  }
  e.s([
    "V",
    0,
    function (e) {
      let {
          children: i,
          id: n,
          items: a,
          strategy: o = s,
          disabled: u = !1,
        } = e,
        {
          active: m,
          dragOverlay: x,
          droppableRects: f,
          over: h,
          measureDroppableContainers: p,
        } = (0, r.Q)(),
        b = (0, l.k)(c, n),
        g = null !== x.rect,
        y = (0, t.useMemo)(
          () => a.map((e) => ("object" == typeof e && "id" in e ? e.id : e)),
          [a],
        ),
        v = null != m,
        _ = m ? y.indexOf(m.id) : -1,
        j = h ? y.indexOf(h.id) : -1,
        w = (0, t.useRef)(y),
        N = !(function (e, t) {
          if (e === t) return !0;
          if (e.length !== t.length) return !1;
          for (let r = 0; r < e.length; r++) if (e[r] !== t[r]) return !1;
          return !0;
        })(y, w.current),
        z = (-1 !== j && -1 === _) || N,
        I = "boolean" == typeof u ? { draggable: u, droppable: u } : u;
      ((0, l.u)(() => {
        N && v && p(y);
      }, [N, y, v, p]),
        (0, t.useEffect)(() => {
          w.current = y;
        }, [y]));
      let k = (0, t.useMemo)(
        () => ({
          activeIndex: _,
          containerId: b,
          disabled: I,
          disableTransforms: z,
          items: y,
          overIndex: j,
          useDragOverlay: g,
          sortedRects: y.reduce((e, t, r) => {
            let l = f.get(t);
            return (l && (e[r] = l), e);
          }, Array(y.length)),
          strategy: o,
        }),
        [_, b, I.draggable, I.droppable, z, y, j, f, g, o],
      );
      return t.default.createElement(d.Provider, { value: k }, i);
    },
    "I",
    0,
    (e) => {
      var t, r, l, i;
      let n,
        s,
        o,
        {
          rects: c,
          activeNodeRect: d,
          activeIndex: u,
          overIndex: m,
          index: x,
        } = e,
        f = null != (t = c[u]) ? t : d;
      if (!f) return null;
      let h =
        ((r = c),
        (l = x),
        (i = u),
        (n = r[l]),
        (s = r[l - 1]),
        (o = r[l + 1]),
        n && (s || o)
          ? i < l
            ? s
              ? n.left - (s.left + s.width)
              : o.left - (n.left + n.width)
            : o
              ? o.left - (n.left + n.width)
              : n.left - (s.left + s.width)
          : 0);
      if (x === u) {
        let e = c[m];
        return e
          ? {
              x:
                u < m ? e.left + e.width - (f.left + f.width) : e.left - f.left,
              y: 0,
              ...a,
            }
          : null;
      }
      return x > u && x <= m
        ? { x: -f.width - h, y: 0, ...a }
        : x < u && x >= m
          ? { x: f.width + h, y: 0, ...a }
          : { x: 0, y: 0, ...a };
    },
    "j",
    0,
    (e, t) => {
      let {
        context: {
          active: i,
          collisionRect: n,
          droppableRects: a,
          droppableContainers: s,
          over: o,
          scrollableAncestors: c,
        },
      } = t;
      if (g.includes(e.code)) {
        if ((e.preventDefault(), !i || !n)) return;
        let t = [];
        s.getEnabled().forEach((l) => {
          if (!l || (null != l && l.disabled)) return;
          let i = a.get(l.id);
          if (i)
            switch (e.code) {
              case r.M.Down:
                n.top < i.top && t.push(l);
                break;
              case r.M.Up:
                n.top > i.top && t.push(l);
                break;
              case r.M.Left:
                n.left > i.left && t.push(l);
                break;
              case r.M.Right:
                n.left < i.left && t.push(l);
            }
        });
        let m = (0, r.O)({
            active: i,
            collisionRect: n,
            droppableRects: a,
            droppableContainers: t,
            pointerCoordinates: null,
          }),
          x = (0, r.Z)(m, "id");
        if (
          (x === (null == o ? void 0 : o.id) && m.length > 1 && (x = m[1].id),
          null != x)
        ) {
          let e = s.get(i.id),
            t = s.get(x),
            o = t ? a.get(t.id) : null,
            m = null == t ? void 0 : t.node.current;
          if (m && o && e && t) {
            var d, u;
            let i = (0, r.l)(m).some((e, t) => c[t] !== e),
              a = y(e, t),
              s =
                ((d = e),
                (u = t),
                !!b(d) &&
                  !!b(u) &&
                  !!y(d, u) &&
                  d.data.current.sortable.index <
                    u.data.current.sortable.index),
              x =
                i || !a
                  ? { x: 0, y: 0 }
                  : {
                      x: s ? n.width - o.width : 0,
                      y: s ? n.height - o.height : 0,
                    },
              f = { x: o.left, y: o.top };
            return x.x && x.y ? f : (0, l.M)(f, x);
          }
        }
      }
    },
    "s",
    0,
    function (e) {
      var i, a, s, o;
      let {
          animateLayoutChanges: c = m,
          attributes: b,
          disabled: g,
          data: y,
          getNewIndex: v = u,
          id: _,
          strategy: j,
          resizeObserverConfig: w,
          transition: N = x,
        } = e,
        {
          items: z,
          containerId: I,
          activeIndex: k,
          disabled: C,
          disableTransforms: S,
          sortedRects: M,
          overIndex: O,
          useDragOverlay: R,
          strategy: D,
        } = (0, t.useContext)(d),
        T =
          ((i = g),
          (a = C),
          "boolean" == typeof i
            ? { draggable: i, droppable: !1 }
            : {
                draggable:
                  null != (s = null == i ? void 0 : i.draggable)
                    ? s
                    : a.draggable,
                droppable:
                  null != (o = null == i ? void 0 : i.droppable)
                    ? o
                    : a.droppable,
              }),
        E = z.indexOf(_),
        U = (0, t.useMemo)(
          () => ({ sortable: { containerId: I, index: E, items: z }, ...y }),
          [I, y, E, z],
        ),
        K = (0, t.useMemo)(() => z.slice(z.indexOf(_)), [z, _]),
        {
          rect: Y,
          node: $,
          isOver: P,
          setNodeRef: X,
        } = (0, r.g)({
          id: _,
          data: U,
          disabled: T.droppable,
          resizeObserverConfig: { updateMeasurementsFor: K, ...w },
        }),
        {
          active: A,
          activatorEvent: L,
          activeNodeRect: V,
          attributes: q,
          setNodeRef: B,
          listeners: F,
          isDragging: H,
          over: J,
          setActivatorNodeRef: Q,
          transform: W,
        } = (0, r.f)({
          id: _,
          data: U,
          attributes: { ...p, ...b },
          disabled: T.draggable,
        }),
        Z = (0, l.h)(X, B),
        G = !!A,
        ee = G && !S && n(k) && n(O),
        et = !R && H,
        er = et && ee ? W : null,
        el = ee
          ? null != er
            ? er
            : (null != j ? j : D)({
                rects: M,
                activeNodeRect: V,
                activeIndex: k,
                overIndex: O,
                index: E,
              })
          : null,
        ei =
          n(k) && n(O)
            ? v({ id: _, items: z, activeIndex: k, overIndex: O })
            : E,
        en = null == A ? void 0 : A.id,
        ea = (0, t.useRef)({
          activeId: en,
          items: z,
          newIndex: ei,
          containerId: I,
        }),
        es = z !== ea.current.items,
        eo = c({
          active: A,
          containerId: I,
          isDragging: H,
          isSorting: G,
          id: _,
          index: E,
          items: z,
          newIndex: ea.current.newIndex,
          previousItems: ea.current.items,
          previousContainerId: ea.current.containerId,
          transition: N,
          wasDragging: null != ea.current.activeId,
        }),
        ec = (function (e) {
          let { disabled: i, index: n, node: a, rect: s } = e,
            [o, c] = (0, t.useState)(null),
            d = (0, t.useRef)(n);
          return (
            (0, l.u)(() => {
              if (!i && n !== d.current && a.current) {
                let e = s.current;
                if (e) {
                  let t = (0, r.S)(a.current, { ignoreTransform: !0 }),
                    l = {
                      x: e.left - t.left,
                      y: e.top - t.top,
                      scaleX: e.width / t.width,
                      scaleY: e.height / t.height,
                    };
                  (l.x || l.y) && c(l);
                }
              }
              n !== d.current && (d.current = n);
            }, [i, n, a, s]),
            (0, t.useEffect)(() => {
              o && c(null);
            }, [o]),
            o
          );
        })({ disabled: !eo, index: E, node: $, rect: Y });
      return (
        (0, t.useEffect)(() => {
          (G && ea.current.newIndex !== ei && (ea.current.newIndex = ei),
            I !== ea.current.containerId && (ea.current.containerId = I),
            z !== ea.current.items && (ea.current.items = z));
        }, [G, ei, I, z]),
        (0, t.useEffect)(() => {
          if (en === ea.current.activeId) return;
          if (null != en && null == ea.current.activeId) {
            ea.current.activeId = en;
            return;
          }
          let e = setTimeout(() => {
            ea.current.activeId = en;
          }, 50);
          return () => clearTimeout(e);
        }, [en]),
        {
          active: A,
          activeIndex: k,
          attributes: q,
          data: U,
          rect: Y,
          index: E,
          newIndex: ei,
          items: z,
          isOver: P,
          isSorting: G,
          isDragging: H,
          listeners: F,
          node: $,
          overIndex: O,
          over: J,
          setNodeRef: Z,
          setActivatorNodeRef: Q,
          setDroppableNodeRef: X,
          setDraggableNodeRef: B,
          transform: null != ec ? ec : el,
          transition:
            ec || (es && ea.current.newIndex === E)
              ? h
              : (!et || (0, l.U)(L)) && N && (G || eo)
                ? l.r.Transition.toString({ ...N, property: f })
                : void 0,
        }
      );
    },
    "W",
    0,
    (e) => {
      var t, r, l, i;
      let n,
        a,
        s,
        {
          activeIndex: c,
          activeNodeRect: d,
          index: u,
          rects: m,
          overIndex: x,
        } = e,
        f = null != (t = m[c]) ? t : d;
      if (!f) return null;
      if (u === c) {
        let e = m[x];
        return e
          ? {
              x: 0,
              y: c < x ? e.top + e.height - (f.top + f.height) : e.top - f.top,
              ...o,
            }
          : null;
      }
      let h =
        ((r = m),
        (l = u),
        (i = c),
        (n = r[l]),
        (a = r[l - 1]),
        (s = r[l + 1]),
        n
          ? i < l
            ? a
              ? n.top - (a.top + a.height)
              : s
                ? s.top - (n.top + n.height)
                : 0
            : s
              ? s.top - (n.top + n.height)
              : a
                ? n.top - (a.top + a.height)
                : 0
          : 0);
      return u > c && u <= x
        ? { x: 0, y: -f.height - h, ...o }
        : u < c && u >= x
          ? { x: 0, y: f.height + h, ...o }
          : { x: 0, y: 0, ...o };
    },
  ]);
};
