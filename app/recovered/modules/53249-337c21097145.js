// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(761806),
    n = e.i(303232),
    r = e.i(565693),
    i = e.i(92615),
    o = e.i(656522),
    l = e.i(950161);
  e.s([
    "f",
    0,
    function (e) {
      let {
          popupStore: s,
          noEmit: u = !1,
          treatPopupAsFloatingElement: a = !1,
          onOpenChange: c,
        } = e,
        f = (0, t.f)(),
        d = null != (0, o.G)(),
        p = s.useState("open"),
        g = s.useState("activeTriggerElement"),
        h = s.useState(a ? "popupElement" : "positionerElement"),
        m = s.context.triggerElements,
        v = (0, n.f)(
          () =>
            new l.f({
              open: p,
              referenceElement: g,
              floatingElement: h,
              triggerElements: m,
              onOpenChange: c,
              floatingId: f,
              nested: d,
              noEmit: u,
            }),
        ).current;
      return (
        (0, r.f)(() => {
          let e = {
            open: p,
            floatingId: f,
            referenceElement: g,
            floatingElement: h,
          };
          ((0, i.m)(g) && (e.domReferenceElement = g),
            v.state.positionReference === v.state.referenceElement &&
              (e.positionReference = g),
            v.update(e));
        }, [p, f, g, h, v]),
        (v.context.onOpenChange = c),
        (v.context.nested = d),
        (v.context.noEmit = u),
        v
      );
    },
  ]);
};
