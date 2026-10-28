// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(481103);
  let i = {
      animation: [
        "animate",
        "variants",
        "whileHover",
        "whileTap",
        "exit",
        "whileInView",
        "whileFocus",
        "whileDrag",
      ],
      exit: ["exit"],
      drag: ["drag", "dragControls"],
      focus: ["whileFocus"],
      hover: ["whileHover", "onHoverStart", "onHoverEnd"],
      tap: ["whileTap", "onTap", "onTapStart", "onTapCancel"],
      pan: ["onPan", "onPanStart", "onPanSessionStart", "onPanEnd"],
      inView: ["whileInView", "onViewportEnter", "onViewportLeave"],
      layout: ["layout", "layoutId"],
    },
    r = !1;
  function n() {
    return (
      !(function () {
        if (r) return;
        let e = {};
        for (let t in i) e[t] = { isEnabled: (e) => i[t].some((t) => !!e[t]) };
        ((0, t.Y)(e), (r = !0));
      })(),
      (0, t.k)()
    );
  }
  (e.s(["f", 0, n], 463264),
    e.s(
      [
        "f",
        0,
        function (e) {
          let i = n();
          for (let t in e) i[t] = { ...i[t], ...e[t] };
          (0, t.Y)(i);
        },
      ],
      80496,
    ));
};
