// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(352386),
    r = e.i(775453),
    n = e.i(156207),
    i = e.i(144977),
    s = e.i(681289),
    a = e.i(732486);
  function o(e) {
    let r = e + "CollectionProvider",
      [o, l] = (0, n.c)(r),
      [u, d] = o(r, { collectionRef: { current: null }, itemMap: new Map() }),
      c = (e) => {
        let { scope: r, children: n } = e,
          i = t.default.useRef(null),
          s = t.default.useRef(new Map()).current;
        return (0, a.jsx)(u, {
          scope: r,
          itemMap: s,
          collectionRef: i,
          children: n,
        });
      };
    c.displayName = r;
    let f = e + "CollectionSlot",
      m = (0, s.f)(f),
      p = t.default.forwardRef((e, t) => {
        let { scope: r, children: n } = e,
          s = d(f, r),
          o = (0, i.j)(t, s.collectionRef);
        return (0, a.jsx)(m, { ref: o, children: n });
      });
    p.displayName = f;
    let w = e + "CollectionItemSlot",
      g = "data-radix-collection-item",
      b = (0, s.f)(w),
      h = t.default.forwardRef((e, r) => {
        let { scope: n, children: s, ...o } = e,
          l = t.default.useRef(null),
          u = (0, i.j)(r, l),
          c = d(w, n);
        return (
          t.default.useEffect(
            () => (
              c.itemMap.set(l, { ref: l, ...o }),
              () => void c.itemMap.delete(l)
            ),
          ),
          (0, a.jsx)(b, { ...{ [g]: "" }, ref: u, children: s })
        );
      });
    return (
      (h.displayName = w),
      [
        { Provider: c, Slot: p, ItemSlot: h },
        function (r) {
          let n = d(e + "CollectionConsumer", r);
          return t.default.useCallback(() => {
            let e = n.collectionRef.current;
            if (!e) return [];
            let t = Array.from(e.querySelectorAll(`[${g}]`));
            return Array.from(n.itemMap.values()).sort(
              (e, r) => t.indexOf(e.ref.current) - t.indexOf(r.ref.current),
            );
          }, [n.collectionRef, n.itemMap]);
        },
        l,
      ]
    );
  }
  e.s(["f", 0, o], 956017);
  var l = e.i(461194),
    u = e.i(362275),
    d = e.i(252960),
    c = e.i(534643),
    f = e.i(770460),
    m = "rovingFocusGroup.onEntryFocus",
    p = { bubbles: !1, cancelable: !0 },
    w = "RovingFocusGroup",
    [g, b, h] = o(w),
    [v, y] = (0, n.c)(w, [h]),
    [x, S] = v(w),
    N = t.forwardRef((e, t) =>
      (0, a.jsx)(g.Provider, {
        scope: e.__scopeRovingFocusGroup,
        children: (0, a.jsx)(g.Slot, {
          scope: e.__scopeRovingFocusGroup,
          children: (0, a.jsx)(E, { ...e, ref: t }),
        }),
      }),
    );
  N.displayName = w;
  var E = t.forwardRef((e, n) => {
      let {
          __scopeRovingFocusGroup: s,
          orientation: o,
          loop: l = !1,
          dir: g,
          currentTabStopId: h,
          defaultCurrentTabStopId: v,
          onCurrentTabStopIdChange: y,
          onEntryFocus: S,
          preventScrollOnEntryFocus: N = !1,
          ...E
        } = e,
        j = t.useRef(null),
        I = (0, i.j)(n, j),
        R = (0, f.f)(g),
        [_, L] = (0, c.f)({
          prop: h,
          defaultProp: v ?? null,
          onChange: y,
          caller: w,
        }),
        [T, O] = t.useState(!1),
        D = (0, d.f)(S),
        M = b(s),
        P = t.useRef(!1),
        [k, U] = t.useState(0);
      return (
        t.useEffect(() => {
          let e = j.current;
          if (e)
            return (
              e.addEventListener(m, D),
              () => e.removeEventListener(m, D)
            );
        }, [D]),
        (0, a.jsx)(x, {
          scope: s,
          orientation: o,
          dir: R,
          loop: l,
          currentTabStopId: _,
          onItemFocus: t.useCallback((e) => L(e), [L]),
          onItemShiftTab: t.useCallback(() => O(!0), []),
          onFocusableItemAdd: t.useCallback(() => U((e) => e + 1), []),
          onFocusableItemRemove: t.useCallback(() => U((e) => e - 1), []),
          children: (0, a.jsx)(u.V.div, {
            tabIndex: T || 0 === k ? -1 : 0,
            "data-orientation": o,
            ...E,
            ref: I,
            style: { outline: "none", ...e.style },
            onMouseDown: (0, r.f)(e.onMouseDown, () => {
              P.current = !0;
            }),
            onFocus: (0, r.f)(e.onFocus, (e) => {
              let t = !P.current;
              if (e.target === e.currentTarget && t && !T) {
                let t = new CustomEvent(m, p);
                if ((e.currentTarget.dispatchEvent(t), !t.defaultPrevented)) {
                  let e = M().filter((e) => e.focusable);
                  A(
                    [e.find((e) => e.active), e.find((e) => e.id === _), ...e]
                      .filter(Boolean)
                      .map((e) => e.ref.current),
                    N,
                  );
                }
              }
              P.current = !1;
            }),
            onBlur: (0, r.f)(e.onBlur, () => O(!1)),
          }),
        })
      );
    }),
    j = "RovingFocusGroupItem",
    I = t.forwardRef((e, n) => {
      let {
          __scopeRovingFocusGroup: i,
          focusable: s = !0,
          active: o = !1,
          tabStopId: d,
          children: c,
          ...f
        } = e,
        m = (0, l.f)(),
        p = d || m,
        w = S(j, i),
        h = w.currentTabStopId === p,
        v = b(i),
        {
          onFocusableItemAdd: y,
          onFocusableItemRemove: x,
          currentTabStopId: N,
        } = w;
      return (
        t.useEffect(() => {
          if (s) return (y(), () => x());
        }, [s, y, x]),
        (0, a.jsx)(g.ItemSlot, {
          scope: i,
          id: p,
          focusable: s,
          active: o,
          children: (0, a.jsx)(u.V.span, {
            tabIndex: h ? 0 : -1,
            "data-orientation": w.orientation,
            ...f,
            ref: n,
            onMouseDown: (0, r.f)(e.onMouseDown, (e) => {
              s ? w.onItemFocus(p) : e.preventDefault();
            }),
            onFocus: (0, r.f)(e.onFocus, () => w.onItemFocus(p)),
            onKeyDown: (0, r.f)(e.onKeyDown, (e) => {
              if ("Tab" === e.key && e.shiftKey) return void w.onItemShiftTab();
              if (e.target !== e.currentTarget) return;
              let t = (function (e, t, r) {
                var n;
                let i =
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
                    "vertical" === t && ["ArrowLeft", "ArrowRight"].includes(i)
                  ) &&
                  !("horizontal" === t && ["ArrowUp", "ArrowDown"].includes(i))
                )
                  return R[i];
              })(e, w.orientation, w.dir);
              if (void 0 !== t) {
                if (e.metaKey || e.ctrlKey || e.altKey || e.shiftKey) return;
                e.preventDefault();
                let i = v()
                  .filter((e) => e.focusable)
                  .map((e) => e.ref.current);
                if ("last" === t) i.reverse();
                else if ("prev" === t || "next" === t) {
                  var r, n;
                  "prev" === t && i.reverse();
                  let s = i.indexOf(e.currentTarget);
                  i = w.loop
                    ? ((r = i),
                      (n = s + 1),
                      r.map((e, t) => r[(n + t) % r.length]))
                    : i.slice(s + 1);
                }
                setTimeout(() => A(i));
              }
            }),
            children:
              "function" == typeof c
                ? c({ isCurrentTabStop: h, hasTabStop: null != N })
                : c,
          }),
        })
      );
    });
  I.displayName = j;
  var R = {
    ArrowLeft: "prev",
    ArrowUp: "prev",
    ArrowRight: "next",
    ArrowDown: "next",
    PageUp: "first",
    Home: "first",
    PageDown: "last",
    End: "last",
  };
  function A(e, t = !1) {
    let r = document.activeElement;
    for (let n of e)
      if (
        n === r ||
        (n.focus({ preventScroll: t }), document.activeElement !== r)
      )
        return;
  }
  e.s(["M", 0, I, "F", 0, N, "B", 0, y], 291132);
};
