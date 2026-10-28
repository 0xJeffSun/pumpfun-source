// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(432405);
  let i = "data-row-cover",
    a = (e, t) => {
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
    l = (e, t) => e instanceof Node && !t.contains(e),
    r = (e) => {
      let t = e.currentTarget,
        r = t.querySelector(`[${i}]`);
      if (!r || l(e.target, t)) return null;
      let n = e.target instanceof Node ? e.target : null;
      return (n && r.contains(n)) || a(e.target, t) ? null : r;
    },
    n = (e) => {
      let t = r(e);
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
      let t = r(e);
      if (!t) return;
      let i = e.currentTarget,
        [a, l] = "mouseenter" === e.type ? [i, t] : [t, i];
      a.dispatchEvent(
        new MouseEvent("mouseout", {
          bubbles: !0,
          cancelable: !0,
          relatedTarget: l,
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
      let r = e.currentTarget;
      l(e.target, r) ||
        a(e.target, r) ||
        window.getSelection()?.toString() ||
        r.querySelector(`[${i}]`)?.click();
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
    a,
    "J",
    0,
    { onPointerDown: n, onPointerUp: n, onMouseEnter: o, onMouseLeave: o },
  ]);
};
