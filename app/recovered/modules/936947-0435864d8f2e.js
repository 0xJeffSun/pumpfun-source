// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(432405);
  let i = "data-row-cover",
    r = (e, t) => {
      let i = e instanceof Element ? e : null;
      for (; i && i !== t; ) {
        if (
          i.matches(
            "a, button, [role=button], input, select, textarea, label, [contenteditable]",
          ) &&
          !i.matches("[data-slot=tooltip-trigger]")
        )
          return !0;
        i = i.parentElement;
      }
      return !1;
    },
    a = (e, t) => e instanceof Node && !t.contains(e),
    n = (e) => {
      let t = e.currentTarget,
        n = t.querySelector(`[${i}]`);
      if (!n || a(e.target, t)) return null;
      let l = e.target instanceof Node ? e.target : null;
      return (l && n.contains(l)) || r(e.target, t) ? null : n;
    },
    l = (e) => {
      let t = n(e);
      t &&
        t.dispatchEvent(
          new ("function" == typeof PointerEvent ? PointerEvent : MouseEvent)(
            e.type,
            {
              bubbles: !0,
              cancelable: !0,
              button: e.button,
              buttons: e.buttons,
              pointerType: e.pointerType,
              clientX: e.clientX,
              clientY: e.clientY,
              ctrlKey: e.ctrlKey,
              metaKey: e.metaKey,
              shiftKey: e.shiftKey,
              altKey: e.altKey,
            },
          ),
        );
    },
    o = (e) => {
      let t = n(e);
      if (!t) return;
      let i = e.currentTarget,
        [r, a] = "mouseenter" === e.type ? [i, t] : [t, i];
      r.dispatchEvent(
        new MouseEvent("mouseout", {
          bubbles: !0,
          cancelable: !0,
          relatedTarget: a,
        }),
      );
    };
  e.s([
    "A",
    0,
    i,
    "N",
    0,
    (e) => {
      if (!(0, t.f)(e)) return;
      let n = e.currentTarget;
      a(e.target, n) ||
        r(e.target, n) ||
        window.getSelection()?.toString() ||
        n.querySelector(`[${i}]`)?.click();
    },
    "j",
    0,
    (e) => {
      let t = e.relatedTarget;
      if (!(t instanceof Node)) return !0;
      let i = e.currentTarget.closest("tr, [role=row]");
      return null === i || t === i || !i.contains(t);
    },
    "Y",
    0,
    r,
    "J",
    0,
    { onPointerDown: l, onPointerUp: l, onMouseEnter: o, onMouseLeave: o },
  ]);
};
