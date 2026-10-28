// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(352386),
    n = e.i(231332),
    r = e.i(93074),
    o = e.i(732486),
    i = [
      "a",
      "button",
      "div",
      "form",
      "h2",
      "h3",
      "img",
      "input",
      "label",
      "li",
      "nav",
      "ol",
      "p",
      "select",
      "span",
      "svg",
      "ul",
    ].reduce((e, n) => {
      let i = (0, r.B)(`Primitive.${n}`),
        a = t.forwardRef((e, t) => {
          let { asChild: r, ...a } = e;
          return (
            "u" > typeof window && (window[Symbol.for("radix-ui")] = !0),
            (0, o.jsx)(r ? i : n, { ...a, ref: t })
          );
        });
      return ((a.displayName = `Primitive.${n}`), { ...e, [n]: a });
    }, {});
  e.s([
    "V",
    0,
    i,
    "u",
    0,
    function (e, t) {
      e && n.flushSync(() => e.dispatchEvent(t));
    },
  ]);
};
