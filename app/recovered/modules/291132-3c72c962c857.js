// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(352386),
    r = e.i(775453),
    n = e.i(156207),
    o = e.i(144977),
    a = e.i(681289),
    i = e.i(732486);
  function l(e) {
    let r = e + "CollectionProvider",
      [l, u] = (0, n.c)(r),
      [s, d] = l(r, { collectionRef: { current: null }, itemMap: new Map() }),
      c = (e) => {
        let { scope: r, children: n } = e,
          o = t.default.useRef(null),
          a = t.default.useRef(new Map()).current;
        return (0, i.jsx)(s, {
          scope: r,
          itemMap: a,
          collectionRef: o,
          children: n,
        });
      };
    c.displayName = r;
    let f = e + "CollectionSlot",
      p = (0, a.f)(f),
      v = t.default.forwardRef((e, t) => {
        let { scope: r, children: n } = e,
          a = d(f, r),
          l = (0, o.j)(t, a.collectionRef);
        return (0, i.jsx)(p, { ref: l, children: n });
      });
    v.displayName = f;
    let m = e + "CollectionItemSlot",
      h = "data-radix-collection-item",
      g = (0, a.f)(m),
      w = t.default.forwardRef((e, r) => {
        let { scope: n, children: a, ...l } = e,
          u = t.default.useRef(null),
          s = (0, o.j)(r, u),
          c = d(m, n);
        return (
          t.default.useEffect(
            () => (
              c.itemMap.set(u, { ref: u, ...l }),
              () => void c.itemMap.delete(u)
            ),
          ),
          (0, i.jsx)(g, { ...{ [h]: "" }, ref: s, children: a })
        );
      });
    return (
      (w.displayName = m),
      [
        { Provider: c, Slot: v, ItemSlot: w },
        function (r) {
          let n = d(e + "CollectionConsumer", r);
          return t.default.useCallback(() => {
            let e = n.collectionRef.current;
            if (!e) return [];
            let t = Array.from(e.querySelectorAll(`[${h}]`));
            return Array.from(n.itemMap.values()).sort(
              (e, r) => t.indexOf(e.ref.current) - t.indexOf(r.ref.current),
            );
          }, [n.collectionRef, n.itemMap]);
        },
        u,
      ]
    );
  }
  e.s(["f", 0, l], 956017);
  var u = e.i(461194),
    s = e.i(362275),
    d = e.i(252960),
    c = e.i(534643),
    f = e.i(770460),
    p = "rovingFocusGroup.onEntryFocus",
    v = { bubbles: !1, cancelable: !0 },
    m = "RovingFocusGroup",
    [h, g, w] = l(m),
    [y, x] = (0, n.c)(m, [w]),
    [b, C] = y(m),
    E = t.forwardRef((e, t) =>
      (0, i.jsx)(h.Provider, {
        scope: e.__scopeRovingFocusGroup,
        children: (0, i.jsx)(h.Slot, {
          scope: e.__scopeRovingFocusGroup,
          children: (0, i.jsx)(R, { ...e, ref: t }),
        }),
      }),
    );
  E.displayName = m;
  var R = t.forwardRef((e, n) => {
      let {
          __scopeRovingFocusGroup: a,
          orientation: l,
          loop: u = !1,
          dir: h,
          currentTabStopId: w,
          defaultCurrentTabStopId: y,
          onCurrentTabStopIdChange: x,
          onEntryFocus: C,
          preventScrollOnEntryFocus: E = !1,
          ...R
        } = e,
        j = t.useRef(null),
        M = (0, o.j)(n, j),
        D = (0, f.f)(h),
        [S, T] = (0, c.f)({
          prop: w,
          defaultProp: y ?? null,
          onChange: x,
          caller: m,
        }),
        [I, L] = t.useState(!1),
        k = (0, d.f)(C),
        O = g(a),
        _ = t.useRef(!1),
        [A, F] = t.useState(0);
      return (
        t.useEffect(() => {
          let e = j.current;
          if (e)
            return (
              e.addEventListener(p, k),
              () => e.removeEventListener(p, k)
            );
        }, [k]),
        (0, i.jsx)(b, {
          scope: a,
          orientation: l,
          dir: D,
          loop: u,
          currentTabStopId: S,
          onItemFocus: t.useCallback((e) => T(e), [T]),
          onItemShiftTab: t.useCallback(() => L(!0), []),
          onFocusableItemAdd: t.useCallback(() => F((e) => e + 1), []),
          onFocusableItemRemove: t.useCallback(() => F((e) => e - 1), []),
          children: (0, i.jsx)(s.V.div, {
            tabIndex: I || 0 === A ? -1 : 0,
            "data-orientation": l,
            ...R,
            ref: M,
            style: { outline: "none", ...e.style },
            onMouseDown: (0, r.f)(e.onMouseDown, () => {
              _.current = !0;
            }),
            onFocus: (0, r.f)(e.onFocus, (e) => {
              let t = !_.current;
              if (e.target === e.currentTarget && t && !I) {
                let t = new CustomEvent(p, v);
                if ((e.currentTarget.dispatchEvent(t), !t.defaultPrevented)) {
                  let e = O().filter((e) => e.focusable);
                  P(
                    [e.find((e) => e.active), e.find((e) => e.id === S), ...e]
                      .filter(Boolean)
                      .map((e) => e.ref.current),
                    E,
                  );
                }
              }
              _.current = !1;
            }),
            onBlur: (0, r.f)(e.onBlur, () => L(!1)),
          }),
        })
      );
    }),
    j = "RovingFocusGroupItem",
    M = t.forwardRef((e, n) => {
      let {
          __scopeRovingFocusGroup: o,
          focusable: a = !0,
          active: l = !1,
          tabStopId: d,
          children: c,
          ...f
        } = e,
        p = (0, u.f)(),
        v = d || p,
        m = C(j, o),
        w = m.currentTabStopId === v,
        y = g(o),
        {
          onFocusableItemAdd: x,
          onFocusableItemRemove: b,
          currentTabStopId: E,
        } = m;
      return (
        t.useEffect(() => {
          if (a) return (x(), () => b());
        }, [a, x, b]),
        (0, i.jsx)(h.ItemSlot, {
          scope: o,
          id: v,
          focusable: a,
          active: l,
          children: (0, i.jsx)(s.V.span, {
            tabIndex: w ? 0 : -1,
            "data-orientation": m.orientation,
            ...f,
            ref: n,
            onMouseDown: (0, r.f)(e.onMouseDown, (e) => {
              a ? m.onItemFocus(v) : e.preventDefault();
            }),
            onFocus: (0, r.f)(e.onFocus, () => m.onItemFocus(v)),
            onKeyDown: (0, r.f)(e.onKeyDown, (e) => {
              if ("Tab" === e.key && e.shiftKey) return void m.onItemShiftTab();
              if (e.target !== e.currentTarget) return;
              let t = (function (e, t, r) {
                var n;
                let o =
                  ((n = e.key),
                  "rtl" !== r
                    ? n
                    : "ArrowLeft" === n
                      ? "ArrowRight"
                      : "ArrowRight" === n
                        ? "ArrowLeft"
                        : n);
                if (
                  !(
                    "vertical" === t && ["ArrowLeft", "ArrowRight"].includes(o)
                  ) &&
                  !("horizontal" === t && ["ArrowUp", "ArrowDown"].includes(o))
                )
                  return D[o];
              })(e, m.orientation, m.dir);
              if (void 0 !== t) {
                if (e.metaKey || e.ctrlKey || e.altKey || e.shiftKey) return;
                e.preventDefault();
                let o = y()
                  .filter((e) => e.focusable)
                  .map((e) => e.ref.current);
                if ("last" === t) o.reverse();
                else if ("prev" === t || "next" === t) {
                  var r, n;
                  "prev" === t && o.reverse();
                  let a = o.indexOf(e.currentTarget);
                  o = m.loop
                    ? ((r = o),
                      (n = a + 1),
                      r.map((e, t) => r[(n + t) % r.length]))
                    : o.slice(a + 1);
                }
                setTimeout(() => P(o));
              }
            }),
            children:
              "function" == typeof c
                ? c({ isCurrentTabStop: w, hasTabStop: null != E })
                : c,
          }),
        })
      );
    });
  M.displayName = j;
  var D = {
    ArrowLeft: "prev",
    ArrowUp: "prev",
    ArrowRight: "next",
    ArrowDown: "next",
    PageUp: "first",
    Home: "first",
    PageDown: "last",
    End: "last",
  };
  function P(e, t = !1) {
    let r = document.activeElement;
    for (let n of e)
      if (
        n === r ||
        (n.focus({ preventScroll: t }), document.activeElement !== r)
      )
        return;
  }
  e.s(["M", 0, M, "F", 0, E, "B", 0, x], 291132);
};
