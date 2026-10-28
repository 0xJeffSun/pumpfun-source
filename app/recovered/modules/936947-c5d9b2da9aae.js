// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(432405);
  let i = "data-row-cover",
    s = (e, t) => {
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
    n = (e, t) => e instanceof Node && !t.contains(e),
    l = (e) => {
      let t = e.currentTarget,
        l = t.querySelector(`[${i}]`);
      if (!l || n(e.target, t)) return null;
      let r = e.target instanceof Node ? e.target : null;
      return (r && l.contains(r)) || s(e.target, t) ? null : l;
    },
    r = (e) => {
      let t = l(e);
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
      let t = l(e);
      if (!t) return;
      let i = e.currentTarget,
        [s, n] = "mouseenter" === e.type ? [i, t] : [t, i];
      s.dispatchEvent(
        new MouseEvent("mouseout", {
          bubbles: !0,
          cancelable: !0,
          relatedTarget: n,
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
      let l = e.currentTarget;
      n(e.target, l) ||
        s(e.target, l) ||
        window.getSelection()?.toString() ||
        l.querySelector(`[${i}]`)?.click();
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
    s,
    "J",
    0,
    { onPointerDown: r, onPointerUp: r, onMouseEnter: o, onMouseLeave: o },
  ]);
};
