// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(352386),
    r = e.i(775453),
    a = e.i(156207),
    i = e.i(144977),
    l = e.i(681289),
    n = e.i(732486);
  function o(e) {
    let r = e + "CollectionProvider",
      [o, s] = (0, a.c)(r),
      [d, c] = o(r, { collectionRef: { current: null }, itemMap: new Map() }),
      u = (e) => {
        let { scope: r, children: a } = e,
          i = t.default.useRef(null),
          l = t.default.useRef(new Map()).current;
        return (0, n.jsx)(d, {
          scope: r,
          itemMap: l,
          collectionRef: i,
          children: a,
        });
      };
    u.displayName = r;
    let f = e + "CollectionSlot",
      m = (0, l.f)(f),
      p = t.default.forwardRef((e, t) => {
        let { scope: r, children: a } = e,
          l = c(f, r),
          o = (0, i.j)(t, l.collectionRef);
        return (0, n.jsx)(m, { ref: o, children: a });
      });
    p.displayName = f;
    let b = e + "CollectionItemSlot",
      h = "data-radix-collection-item",
      v = (0, l.f)(b),
      x = t.default.forwardRef((e, r) => {
        let { scope: a, children: l, ...o } = e,
          s = t.default.useRef(null),
          d = (0, i.j)(r, s),
          u = c(b, a);
        return (
          t.default.useEffect(
            () => (
              u.itemMap.set(s, { ref: s, ...o }),
              () => void u.itemMap.delete(s)
            ),
          ),
          (0, n.jsx)(v, { ...{ [h]: "" }, ref: d, children: l })
        );
      });
    return (
      (x.displayName = b),
      [
        { Provider: u, Slot: p, ItemSlot: x },
        function (r) {
          let a = c(e + "CollectionConsumer", r);
          return t.default.useCallback(() => {
            let e = a.collectionRef.current;
            if (!e) return [];
            let t = Array.from(e.querySelectorAll(`[${h}]`));
            return Array.from(a.itemMap.values()).sort(
              (e, r) => t.indexOf(e.ref.current) - t.indexOf(r.ref.current),
            );
          }, [a.collectionRef, a.itemMap]);
        },
        s,
      ]
    );
  }
  e.s(["f", 0, o], 956017);
  var s = e.i(461194),
    d = e.i(362275),
    c = e.i(252960),
    u = e.i(534643),
    f = e.i(770460),
    m = "rovingFocusGroup.onEntryFocus",
    p = { bubbles: !1, cancelable: !0 },
    b = "RovingFocusGroup",
    [h, v, x] = o(b),
    [g, y] = (0, a.c)(b, [x]),
    [w, j] = g(b),
    N = t.forwardRef((e, t) =>
      (0, n.jsx)(h.Provider, {
        scope: e.__scopeRovingFocusGroup,
        children: (0, n.jsx)(h.Slot, {
          scope: e.__scopeRovingFocusGroup,
          children: (0, n.jsx)(R, { ...e, ref: t }),
        }),
      }),
    );
  N.displayName = b;
  var R = t.forwardRef((e, a) => {
      let {
          __scopeRovingFocusGroup: l,
          orientation: o,
          loop: s = !1,
          dir: h,
          currentTabStopId: x,
          defaultCurrentTabStopId: g,
          onCurrentTabStopIdChange: y,
          onEntryFocus: j,
          preventScrollOnEntryFocus: N = !1,
          ...R
        } = e,
        k = t.useRef(null),
        _ = (0, i.j)(a, k),
        A = (0, f.f)(h),
        [C, I] = (0, u.f)({
          prop: x,
          defaultProp: g ?? null,
          onChange: y,
          caller: b,
        }),
        [T, E] = t.useState(!1),
        F = (0, c.f)(j),
        D = v(l),
        M = t.useRef(!1),
        [K, L] = t.useState(0);
      return (
        t.useEffect(() => {
          let e = k.current;
          if (e)
            return (
              e.addEventListener(m, F),
              () => e.removeEventListener(m, F)
            );
        }, [F]),
        (0, n.jsx)(w, {
          scope: l,
          orientation: o,
          dir: A,
          loop: s,
          currentTabStopId: C,
          onItemFocus: t.useCallback((e) => I(e), [I]),
          onItemShiftTab: t.useCallback(() => E(!0), []),
          onFocusableItemAdd: t.useCallback(() => L((e) => e + 1), []),
          onFocusableItemRemove: t.useCallback(() => L((e) => e - 1), []),
          children: (0, n.jsx)(d.V.div, {
            tabIndex: T || 0 === K ? -1 : 0,
            "data-orientation": o,
            ...R,
            ref: _,
            style: { outline: "none", ...e.style },
            onMouseDown: (0, r.f)(e.onMouseDown, () => {
              M.current = !0;
            }),
            onFocus: (0, r.f)(e.onFocus, (e) => {
              let t = !M.current;
              if (e.target === e.currentTarget && t && !T) {
                let t = new CustomEvent(m, p);
                if ((e.currentTarget.dispatchEvent(t), !t.defaultPrevented)) {
                  let e = D().filter((e) => e.focusable);
                  S(
                    [e.find((e) => e.active), e.find((e) => e.id === C), ...e]
                      .filter(Boolean)
                      .map((e) => e.ref.current),
                    N,
                  );
                }
              }
              M.current = !1;
            }),
            onBlur: (0, r.f)(e.onBlur, () => E(!1)),
          }),
        })
      );
    }),
    k = "RovingFocusGroupItem",
    _ = t.forwardRef((e, a) => {
      let {
          __scopeRovingFocusGroup: i,
          focusable: l = !0,
          active: o = !1,
          tabStopId: c,
          children: u,
          ...f
        } = e,
        m = (0, s.f)(),
        p = c || m,
        b = j(k, i),
        x = b.currentTabStopId === p,
        g = v(i),
        {
          onFocusableItemAdd: y,
          onFocusableItemRemove: w,
          currentTabStopId: N,
        } = b;
      return (
        t.useEffect(() => {
          if (l) return (y(), () => w());
        }, [l, y, w]),
        (0, n.jsx)(h.ItemSlot, {
          scope: i,
          id: p,
          focusable: l,
          active: o,
          children: (0, n.jsx)(d.V.span, {
            tabIndex: x ? 0 : -1,
            "data-orientation": b.orientation,
            ...f,
            ref: a,
            onMouseDown: (0, r.f)(e.onMouseDown, (e) => {
              l ? b.onItemFocus(p) : e.preventDefault();
            }),
            onFocus: (0, r.f)(e.onFocus, () => b.onItemFocus(p)),
            onKeyDown: (0, r.f)(e.onKeyDown, (e) => {
              if ("Tab" === e.key && e.shiftKey) return void b.onItemShiftTab();
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
              })(e, b.orientation, b.dir);
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
                  let l = i.indexOf(e.currentTarget);
                  i = b.loop
                    ? ((r = i),
                      (a = l + 1),
                      r.map((e, t) => r[(a + t) % r.length]))
                    : i.slice(l + 1);
                }
                setTimeout(() => S(i));
              }
            }),
            children:
              "function" == typeof u
                ? u({ isCurrentTabStop: x, hasTabStop: null != N })
                : u,
          }),
        })
      );
    });
  _.displayName = k;
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
  function S(e, t = !1) {
    let r = document.activeElement;
    for (let a of e)
      if (
        a === r ||
        (a.focus({ preventScroll: t }), document.activeElement !== r)
      )
        return;
  }
  e.s(["M", 0, _, "F", 0, N, "B", 0, y], 291132);
};
