// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(432405);
  let r = "data-row-cover",
    a = (e, t) => {
      let r = e instanceof Element ? e : null;
      for (; r && r !== t; ) {
        if (
          r.matches(
            "a, button, [role=button], input, select, textarea, label, [contenteditable]",
          ) &&
          !r.matches("[data-slot=tooltip-trigger]")
        )
          return !0;
        r = r.parentElement;
      }
      return !1;
    },
    i = (e, t) => e instanceof Node && !t.contains(e),
    s = (e) => {
      let t = e.currentTarget,
        s = t.querySelector(`[${r}]`);
      if (!s || i(e.target, t)) return null;
      let l = e.target instanceof Node ? e.target : null;
      return (l && s.contains(l)) || a(e.target, t) ? null : s;
    },
    l = (e) => {
      let t = s(e);
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
    n = (e) => {
      let t = s(e);
      if (!t) return;
      let r = e.currentTarget,
        [a, i] = "mouseenter" === e.type ? [r, t] : [t, r];
      a.dispatchEvent(
        new MouseEvent("mouseout", {
          bubbles: !0,
          cancelable: !0,
          relatedTarget: i,
        }),
      );
    };
  e.s([
    "A",
    0,
    r,
    "N",
    0,
    (e) => {
      if (!(0, t.f)(e)) return;
      let s = e.currentTarget;
      i(e.target, s) ||
        a(e.target, s) ||
        window.getSelection()?.toString() ||
        s.querySelector(`[${r}]`)?.click();
    },
    "j",
    0,
    (e) => {
      let t = e.relatedTarget;
      if (!(t instanceof Node)) return !0;
      let r = e.currentTarget.closest("tr, [role=row]");
      return null === r || t === r || !r.contains(t);
    },
    "Y",
    0,
    a,
    "J",
    0,
    { onPointerDown: l, onPointerUp: l, onMouseEnter: n, onMouseLeave: n },
  ]);
};
