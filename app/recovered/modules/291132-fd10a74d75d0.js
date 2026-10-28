// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(352386),
    r = e.i(775453),
    a = e.i(156207),
    i = e.i(144977),
    s = e.i(681289),
    l = e.i(732486);
  function o(e) {
    let r = e + "CollectionProvider",
      [o, n] = (0, a.c)(r),
      [d, u] = o(r, { collectionRef: { current: null }, itemMap: new Map() }),
      c = (e) => {
        let { scope: r, children: a } = e,
          i = t.default.useRef(null),
          s = t.default.useRef(new Map()).current;
        return (0, l.jsx)(d, {
          scope: r,
          itemMap: s,
          collectionRef: i,
          children: a,
        });
      };
    c.displayName = r;
    let f = e + "CollectionSlot",
      m = (0, s.f)(f),
      p = t.default.forwardRef((e, t) => {
        let { scope: r, children: a } = e,
          s = u(f, r),
          o = (0, i.j)(t, s.collectionRef);
        return (0, l.jsx)(m, { ref: o, children: a });
      });
    p.displayName = f;
    let v = e + "CollectionItemSlot",
      h = "data-radix-collection-item",
      y = (0, s.f)(v),
      x = t.default.forwardRef((e, r) => {
        let { scope: a, children: s, ...o } = e,
          n = t.default.useRef(null),
          d = (0, i.j)(r, n),
          c = u(v, a);
        return (
          t.default.useEffect(
            () => (
              c.itemMap.set(n, { ref: n, ...o }),
              () => void c.itemMap.delete(n)
            ),
          ),
          (0, l.jsx)(y, { ...{ [h]: "" }, ref: d, children: s })
        );
      });
    return (
      (x.displayName = v),
      [
        { Provider: c, Slot: p, ItemSlot: x },
        function (r) {
          let a = u(e + "CollectionConsumer", r);
          return t.default.useCallback(() => {
            let e = a.collectionRef.current;
            if (!e) return [];
            let t = Array.from(e.querySelectorAll(`[${h}]`));
            return Array.from(a.itemMap.values()).sort(
              (e, r) => t.indexOf(e.ref.current) - t.indexOf(r.ref.current),
            );
          }, [a.collectionRef, a.itemMap]);
        },
        n,
      ]
    );
  }
  e.s(["f", 0, o], 956017);
  var n = e.i(461194),
    d = e.i(362275),
    u = e.i(252960),
    c = e.i(534643),
    f = e.i(770460),
    m = "rovingFocusGroup.onEntryFocus",
    p = { bubbles: !1, cancelable: !0 },
    v = "RovingFocusGroup",
    [h, y, x] = o(v),
    [g, w] = (0, a.c)(v, [x]),
    [b, N] = g(v),
    j = t.forwardRef((e, t) =>
      (0, l.jsx)(h.Provider, {
        scope: e.__scopeRovingFocusGroup,
        children: (0, l.jsx)(h.Slot, {
          scope: e.__scopeRovingFocusGroup,
          children: (0, l.jsx)(R, { ...e, ref: t }),
        }),
      }),
    );
  j.displayName = v;
  var R = t.forwardRef((e, a) => {
      let {
          __scopeRovingFocusGroup: s,
          orientation: o,
          loop: n = !1,
          dir: h,
          currentTabStopId: x,
          defaultCurrentTabStopId: g,
          onCurrentTabStopIdChange: w,
          onEntryFocus: N,
          preventScrollOnEntryFocus: j = !1,
          ...R
        } = e,
        S = t.useRef(null),
        C = (0, i.j)(a, S),
        A = (0, f.f)(h),
        [_, k] = (0, c.f)({
          prop: x,
          defaultProp: g ?? null,
          onChange: w,
          caller: v,
        }),
        [M, T] = t.useState(!1),
        E = (0, u.f)(N),
        I = y(s),
        D = t.useRef(!1),
        [L, P] = t.useState(0);
      return (
        t.useEffect(() => {
          let e = S.current;
          if (e)
            return (
              e.addEventListener(m, E),
              () => e.removeEventListener(m, E)
            );
        }, [E]),
        (0, l.jsx)(b, {
          scope: s,
          orientation: o,
          dir: A,
          loop: n,
          currentTabStopId: _,
          onItemFocus: t.useCallback((e) => k(e), [k]),
          onItemShiftTab: t.useCallback(() => T(!0), []),
          onFocusableItemAdd: t.useCallback(() => P((e) => e + 1), []),
          onFocusableItemRemove: t.useCallback(() => P((e) => e - 1), []),
          children: (0, l.jsx)(d.V.div, {
            tabIndex: M || 0 === L ? -1 : 0,
            "data-orientation": o,
            ...R,
            ref: C,
            style: { outline: "none", ...e.style },
            onMouseDown: (0, r.f)(e.onMouseDown, () => {
              D.current = !0;
            }),
            onFocus: (0, r.f)(e.onFocus, (e) => {
              let t = !D.current;
              if (e.target === e.currentTarget && t && !M) {
                let t = new CustomEvent(m, p);
                if ((e.currentTarget.dispatchEvent(t), !t.defaultPrevented)) {
                  let e = I().filter((e) => e.focusable);
                  F(
                    [e.find((e) => e.active), e.find((e) => e.id === _), ...e]
                      .filter(Boolean)
                      .map((e) => e.ref.current),
                    j,
                  );
                }
              }
              D.current = !1;
            }),
            onBlur: (0, r.f)(e.onBlur, () => T(!1)),
          }),
        })
      );
    }),
    S = "RovingFocusGroupItem",
    C = t.forwardRef((e, a) => {
      let {
          __scopeRovingFocusGroup: i,
          focusable: s = !0,
          active: o = !1,
          tabStopId: u,
          children: c,
          ...f
        } = e,
        m = (0, n.f)(),
        p = u || m,
        v = N(S, i),
        x = v.currentTabStopId === p,
        g = y(i),
        {
          onFocusableItemAdd: w,
          onFocusableItemRemove: b,
          currentTabStopId: j,
        } = v;
      return (
        t.useEffect(() => {
          if (s) return (w(), () => b());
        }, [s, w, b]),
        (0, l.jsx)(h.ItemSlot, {
          scope: i,
          id: p,
          focusable: s,
          active: o,
          children: (0, l.jsx)(d.V.span, {
            tabIndex: x ? 0 : -1,
            "data-orientation": v.orientation,
            ...f,
            ref: a,
            onMouseDown: (0, r.f)(e.onMouseDown, (e) => {
              s ? v.onItemFocus(p) : e.preventDefault();
            }),
            onFocus: (0, r.f)(e.onFocus, () => v.onItemFocus(p)),
            onKeyDown: (0, r.f)(e.onKeyDown, (e) => {
              if ("Tab" === e.key && e.shiftKey) return void v.onItemShiftTab();
              if (e.target !== e.currentTarget) return;
              let t = (function (e, t, r) {
                var a;
                let i =
                  ((a = e.key),
                  "rtl" !== r
                    ? a
                    : "ArrowLeft" === a
                      ? "ArrowRight"
                      : "ArrowRight" === a
                        ? "ArrowLeft"
                        : a);
                if (
                  !(
                    "vertical" === t && ["ArrowLeft", "ArrowRight"].includes(i)
                  ) &&
                  !("horizontal" === t && ["ArrowUp", "ArrowDown"].includes(i))
                )
                  return A[i];
              })(e, v.orientation, v.dir);
              if (void 0 !== t) {
                if (e.metaKey || e.ctrlKey || e.altKey || e.shiftKey) return;
                e.preventDefault();
                let i = g()
                  .filter((e) => e.focusable)
                  .map((e) => e.ref.current);
                if ("last" === t) i.reverse();
                else if ("prev" === t || "next" === t) {
                  var r, a;
                  "prev" === t && i.reverse();
                  let s = i.indexOf(e.currentTarget);
                  i = v.loop
                    ? ((r = i),
                      (a = s + 1),
                      r.map((e, t) => r[(a + t) % r.length]))
                    : i.slice(s + 1);
                }
                setTimeout(() => F(i));
              }
            }),
            children:
              "function" == typeof c
                ? c({ isCurrentTabStop: x, hasTabStop: null != j })
                : c,
          }),
        })
      );
    });
  C.displayName = S;
  var A = {
    ArrowLeft: "prev",
    ArrowUp: "prev",
    ArrowRight: "next",
    ArrowDown: "next",
    PageUp: "first",
    Home: "first",
    PageDown: "last",
    End: "last",
  };
  function F(e, t = !1) {
    let r = document.activeElement;
    for (let a of e)
      if (
        a === r ||
        (a.focus({ preventScroll: t }), document.activeElement !== r)
      )
        return;
  }
  e.s(["M", 0, C, "F", 0, j, "B", 0, w], 291132);
};
