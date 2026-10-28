// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(352386),
    l = e.i(879499),
    n = e.i(189816);
  function a(e, t, l) {
    let n = e.slice();
    return (n.splice(l < 0 ? n.length + l : l, 0, n.splice(t, 1)[0]), n);
  }
  function s(e) {
    return null !== e && e >= 0;
  }
  let r = { scaleX: 1, scaleY: 1 },
    i = (e) => {
      let { rects: t, activeIndex: l, overIndex: n, index: s } = e,
        r = a(t, n, l),
        i = t[s],
        d = r[s];
      return d && i
        ? {
            x: d.left - i.left,
            y: d.top - i.top,
            scaleX: d.width / i.width,
            scaleY: d.height / i.height,
          }
        : null;
    },
    d = { scaleX: 1, scaleY: 1 },
    c = "Sortable",
    o = t.default.createContext({
      activeIndex: -1,
      containerId: c,
      disableTransforms: !1,
      items: [],
      overIndex: -1,
      useDragOverlay: !1,
      sortedRects: [],
      strategy: i,
      disabled: { draggable: !1, droppable: !1 },
    }),
    u = (e) => {
      let { id: t, items: l, activeIndex: n, overIndex: s } = e;
      return a(l, n, s).indexOf(t);
    },
    p = (e) => {
      let {
        containerId: t,
        isSorting: l,
        wasDragging: n,
        index: a,
        items: s,
        newIndex: r,
        previousItems: i,
        previousContainerId: d,
        transition: c,
      } = e;
      return (
        !!c && !!n && (i === s || a !== r) && (!!l || (r !== a && t === d))
      );
    },
    m = { duration: 200, easing: "ease" },
    h = "transform",
    x = n.r.Transition.toString({ property: h, duration: 0, easing: "linear" }),
    f = { roleDescription: "sortable" };
  function g(e) {
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
  let b = [l.M.Down, l.M.Right, l.M.Up, l.M.Left];
  function y(e, t) {
    return (
      !!g(e) &&
      !!g(t) &&
      e.data.current.sortable.containerId ===
        t.data.current.sortable.containerId
    );
  }
  e.s([
    "V",
    0,
    function (e) {
      let {
          children: a,
          id: s,
          items: r,
          strategy: d = i,
          disabled: u = !1,
        } = e,
        {
          active: p,
          dragOverlay: m,
          droppableRects: h,
          over: x,
          measureDroppableContainers: f,
        } = (0, l.Q)(),
        g = (0, n.k)(c, s),
        b = null !== m.rect,
        y = (0, t.useMemo)(
          () => r.map((e) => ("object" == typeof e && "id" in e ? e.id : e)),
          [r],
        ),
        v = null != p,
        w = p ? y.indexOf(p.id) : -1,
        _ = x ? y.indexOf(x.id) : -1,
        j = (0, t.useRef)(y),
        C = !(function (e, t) {
          if (e === t) return !0;
          if (e.length !== t.length) return !1;
          for (let l = 0; l < e.length; l++) if (e[l] !== t[l]) return !1;
          return !0;
        })(y, j.current),
        N = (-1 !== _ && -1 === w) || C,
        U = "boolean" == typeof u ? { draggable: u, droppable: u } : u;
      ((0, n.u)(() => {
        C && v && f(y);
      }, [C, y, v, f]),
        (0, t.useEffect)(() => {
          j.current = y;
        }, [y]));
      let k = (0, t.useMemo)(
        () => ({
          activeIndex: w,
          containerId: g,
          disabled: U,
          disableTransforms: N,
          items: y,
          overIndex: _,
          useDragOverlay: b,
          sortedRects: y.reduce((e, t, l) => {
            let n = h.get(t);
            return (n && (e[l] = n), e);
          }, Array(y.length)),
          strategy: d,
        }),
        [w, g, U.draggable, U.droppable, N, y, _, h, b, d],
      );
      return t.default.createElement(o.Provider, { value: k }, a);
    },
    "I",
    0,
    (e) => {
      var t, l, n, a;
      let s,
        i,
        d,
        {
          rects: c,
          activeNodeRect: o,
          activeIndex: u,
          overIndex: p,
          index: m,
        } = e,
        h = null != (t = c[u]) ? t : o;
      if (!h) return null;
      let x =
        ((l = c),
        (n = m),
        (a = u),
        (s = l[n]),
        (i = l[n - 1]),
        (d = l[n + 1]),
        s && (i || d)
          ? a < n
            ? i
              ? s.left - (i.left + i.width)
              : d.left - (s.left + s.width)
            : d
              ? d.left - (s.left + s.width)
              : s.left - (i.left + i.width)
          : 0);
      if (m === u) {
        let e = c[p];
        return e
          ? {
              x:
                u < p ? e.left + e.width - (h.left + h.width) : e.left - h.left,
              y: 0,
              ...r,
            }
          : null;
      }
      return m > u && m <= p
        ? { x: -h.width - x, y: 0, ...r }
        : m < u && m >= p
          ? { x: h.width + x, y: 0, ...r }
          : { x: 0, y: 0, ...r };
    },
    "j",
    0,
    (e, t) => {
      let {
        context: {
          active: a,
          collisionRect: s,
          droppableRects: r,
          droppableContainers: i,
          over: d,
          scrollableAncestors: c,
        },
      } = t;
      if (b.includes(e.code)) {
        if ((e.preventDefault(), !a || !s)) return;
        let t = [];
        i.getEnabled().forEach((n) => {
          if (!n || (null != n && n.disabled)) return;
          let a = r.get(n.id);
          if (a)
            switch (e.code) {
              case l.M.Down:
                s.top < a.top && t.push(n);
                break;
              case l.M.Up:
                s.top > a.top && t.push(n);
                break;
              case l.M.Left:
                s.left > a.left && t.push(n);
                break;
              case l.M.Right:
                s.left < a.left && t.push(n);
            }
        });
        let p = (0, l.O)({
            active: a,
            collisionRect: s,
            droppableRects: r,
            droppableContainers: t,
            pointerCoordinates: null,
          }),
          m = (0, l.Z)(p, "id");
        if (
          (m === (null == d ? void 0 : d.id) && p.length > 1 && (m = p[1].id),
          null != m)
        ) {
          let e = i.get(a.id),
            t = i.get(m),
            d = t ? r.get(t.id) : null,
            p = null == t ? void 0 : t.node.current;
          if (p && d && e && t) {
            var o, u;
            let a = (0, l.l)(p).some((e, t) => c[t] !== e),
              r = y(e, t),
              i =
                ((o = e),
                (u = t),
                !!g(o) &&
                  !!g(u) &&
                  !!y(o, u) &&
                  o.data.current.sortable.index <
                    u.data.current.sortable.index),
              m =
                a || !r
                  ? { x: 0, y: 0 }
                  : {
                      x: i ? s.width - d.width : 0,
                      y: i ? s.height - d.height : 0,
                    },
              h = { x: d.left, y: d.top };
            return m.x && m.y ? h : (0, n.M)(h, m);
          }
        }
      }
    },
    "s",
    0,
    function (e) {
      var a, r, i, d;
      let {
          animateLayoutChanges: c = p,
          attributes: g,
          disabled: b,
          data: y,
          getNewIndex: v = u,
          id: w,
          strategy: _,
          resizeObserverConfig: j,
          transition: C = m,
        } = e,
        {
          items: N,
          containerId: U,
          activeIndex: k,
          disabled: M,
          disableTransforms: z,
          sortedRects: S,
          overIndex: I,
          useDragOverlay: K,
          strategy: E,
        } = (0, t.useContext)(o),
        T =
          ((a = b),
          (r = M),
          "boolean" == typeof a
            ? { draggable: a, droppable: !1 }
            : {
                draggable:
                  null != (i = null == a ? void 0 : a.draggable)
                    ? i
                    : r.draggable,
                droppable:
                  null != (d = null == a ? void 0 : a.droppable)
                    ? d
                    : r.droppable,
              }),
        X = N.indexOf(w),
        $ = (0, t.useMemo)(
          () => ({ sortable: { containerId: U, index: X, items: N }, ...y }),
          [U, y, X, N],
        ),
        B = (0, t.useMemo)(() => N.slice(N.indexOf(w)), [N, w]),
        {
          rect: Y,
          node: L,
          isOver: W,
          setNodeRef: R,
        } = (0, l.g)({
          id: w,
          data: $,
          disabled: T.droppable,
          resizeObserverConfig: { updateMeasurementsFor: B, ...j },
        }),
        {
          active: A,
          activatorEvent: F,
          activeNodeRect: P,
          attributes: O,
          setNodeRef: D,
          listeners: V,
          isDragging: q,
          over: G,
          setActivatorNodeRef: J,
          transform: Q,
        } = (0, l.f)({
          id: w,
          data: $,
          attributes: { ...f, ...g },
          disabled: T.draggable,
        }),
        Z = (0, n.h)(R, D),
        H = !!A,
        ee = H && !z && s(k) && s(I),
        et = !K && q,
        el = et && ee ? Q : null,
        en = ee
          ? null != el
            ? el
            : (null != _ ? _ : E)({
                rects: S,
                activeNodeRect: P,
                activeIndex: k,
                overIndex: I,
                index: X,
              })
          : null,
        ea =
          s(k) && s(I)
            ? v({ id: w, items: N, activeIndex: k, overIndex: I })
            : X,
        es = null == A ? void 0 : A.id,
        er = (0, t.useRef)({
          activeId: es,
          items: N,
          newIndex: ea,
          containerId: U,
        }),
        ei = N !== er.current.items,
        ed = c({
          active: A,
          containerId: U,
          isDragging: q,
          isSorting: H,
          id: w,
          index: X,
          items: N,
          newIndex: er.current.newIndex,
          previousItems: er.current.items,
          previousContainerId: er.current.containerId,
          transition: C,
          wasDragging: null != er.current.activeId,
        }),
        ec = (function (e) {
          let { disabled: a, index: s, node: r, rect: i } = e,
            [d, c] = (0, t.useState)(null),
            o = (0, t.useRef)(s);
          return (
            (0, n.u)(() => {
              if (!a && s !== o.current && r.current) {
                let e = i.current;
                if (e) {
                  let t = (0, l.S)(r.current, { ignoreTransform: !0 }),
                    n = {
                      x: e.left - t.left,
                      y: e.top - t.top,
                      scaleX: e.width / t.width,
                      scaleY: e.height / t.height,
                    };
                  (n.x || n.y) && c(n);
                }
              }
              s !== o.current && (o.current = s);
            }, [a, s, r, i]),
            (0, t.useEffect)(() => {
              d && c(null);
            }, [d]),
            d
          );
        })({ disabled: !ed, index: X, node: L, rect: Y });
      return (
        (0, t.useEffect)(() => {
          (H && er.current.newIndex !== ea && (er.current.newIndex = ea),
            U !== er.current.containerId && (er.current.containerId = U),
            N !== er.current.items && (er.current.items = N));
        }, [H, ea, U, N]),
        (0, t.useEffect)(() => {
          if (es === er.current.activeId) return;
          if (null != es && null == er.current.activeId) {
            er.current.activeId = es;
            return;
          }
          let e = setTimeout(() => {
            er.current.activeId = es;
          }, 50);
          return () => clearTimeout(e);
        }, [es]),
        {
          active: A,
          activeIndex: k,
          attributes: O,
          data: $,
          rect: Y,
          index: X,
          newIndex: ea,
          items: N,
          isOver: W,
          isSorting: H,
          isDragging: q,
          listeners: V,
          node: L,
          overIndex: I,
          over: G,
          setNodeRef: Z,
          setActivatorNodeRef: J,
          setDroppableNodeRef: R,
          setDraggableNodeRef: D,
          transform: null != ec ? ec : en,
          transition:
            ec || (ei && er.current.newIndex === X)
              ? x
              : (!et || (0, n.U)(F)) && C && (H || ed)
                ? n.r.Transition.toString({ ...C, property: h })
                : void 0,
        }
      );
    },
    "W",
    0,
    (e) => {
      var t, l, n, a;
      let s,
        r,
        i,
        {
          activeIndex: c,
          activeNodeRect: o,
          index: u,
          rects: p,
          overIndex: m,
        } = e,
        h = null != (t = p[c]) ? t : o;
      if (!h) return null;
      if (u === c) {
        let e = p[m];
        return e
          ? {
              x: 0,
              y: c < m ? e.top + e.height - (h.top + h.height) : e.top - h.top,
              ...d,
            }
          : null;
      }
      let x =
        ((l = p),
        (n = u),
        (a = c),
        (s = l[n]),
        (r = l[n - 1]),
        (i = l[n + 1]),
        s
          ? a < n
            ? r
              ? s.top - (r.top + r.height)
              : i
                ? i.top - (s.top + s.height)
                : 0
            : i
              ? i.top - (s.top + s.height)
              : r
                ? s.top - (r.top + r.height)
                : 0
          : 0);
      return u > c && u <= m
        ? { x: 0, y: -h.height - x, ...d }
        : u < c && u >= m
          ? { x: 0, y: h.height + x, ...d }
          : { x: 0, y: 0, ...d };
    },
  ]);
};
