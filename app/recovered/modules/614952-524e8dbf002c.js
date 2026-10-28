// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(352386),
    n = e.i(231332),
    r = e.i(556872),
    o = e.i(127864),
    i = e.i(732486),
    a = t.forwardRef((e, a) => {
      let { container: s, ...l } = e,
        [u, d] = t.useState(!1);
      (0, o.f)(() => d(!0), []);
      let c = s || (u && globalThis?.document?.body);
      return c
        ? n.default.createPortal((0, i.jsx)(r.V.div, { ...l, ref: a }), c)
        : null;
    });
  ((a.displayName = "Portal"), e.s(["f", 0, a]));
};
