// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(352386);
  let n = (e) =>
      0 === e.button && !e.metaKey && !e.ctrlKey && !e.shiftKey && !e.altKey,
    r = (e, t) => {
      let n = e.target instanceof Element ? e.target : null;
      if (!n || n === e.currentTarget) return !1;
      let r = n.closest(
        "a, button, [role=button], input, select, textarea, label, [contenteditable]",
      );
      return (
        null !== r &&
        r !== e.currentTarget &&
        !!e.currentTarget.contains(r) &&
        !t?.(r)
      );
    };
  e.s([
    "E",
    0,
    150,
    "Q",
    0,
    function (e = {}) {
      let {
          onIntent: i,
          onArm: l,
          onPress: a,
          dwellMs: o = 150,
          navigatesVia: s,
        } = e,
        [u, d] = (0, t.useState)(!1),
        c = (0, t.useRef)(null),
        f = (0, t.useRef)(l);
      ((f.current = l),
        (0, t.useEffect)(
          () => () => {
            null !== c.current && clearTimeout(c.current);
          },
          [],
        ));
      let m = () => {
          null !== c.current && (clearTimeout(c.current), (c.current = null));
        },
        p = () => {
          (m(), d(!0), f.current?.());
        };
      return {
        prefetch: u,
        hoverProps: {
          onMouseEnter: () => {
            if ((i?.(), !u && null === c.current)) {
              if (o <= 0) return void p();
              c.current = setTimeout(p, o);
            }
          },
          onMouseLeave: m,
          onFocus: () => {
            (i?.(), p());
          },
          onPointerDown: (e) => {
            (i?.(),
              p(),
              !r(e, s) && "touch" !== e.pointerType && n(e) && a?.());
          },
          onPointerUp: (e) => {
            !r(e, s) && "touch" === e.pointerType && n(e) && a?.();
          },
        },
      };
    },
  ]);
};
