// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(209296),
    n = e.i(726062),
    r = e.i(254780),
    i = e.i(36177);
  let o = {
    open: (0, t.f)((e) => e.open),
    domReferenceElement: (0, t.f)((e) => e.domReferenceElement),
    referenceElement: (0, t.f)(
      (e) => e.positionReference ?? e.referenceElement,
    ),
    floatingElement: (0, t.f)((e) => e.floatingElement),
    floatingId: (0, t.f)((e) => e.floatingId),
  };
  class l extends n.f {
    constructor(e) {
      let {
        nested: t,
        noEmit: n,
        onOpenChange: i,
        triggerElements: l,
        ...s
      } = e;
      super(
        {
          ...s,
          positionReference: s.referenceElement,
          domReferenceElement: s.referenceElement,
        },
        {
          onOpenChange: i,
          dataRef: { current: {} },
          events: (0, r.f)(),
          nested: t,
          noEmit: n,
          triggerElements: l,
        },
        o,
      );
    }
    setOpen = (e, t) => {
      if (
        ((!e || !this.state.open || (0, i.D)(t.event)) &&
          (this.context.dataRef.current.openEvent = e ? t.event : void 0),
        !this.context.noEmit)
      ) {
        let n = {
          open: e,
          reason: t.reason,
          nativeEvent: t.event,
          nested: this.context.nested,
          triggerElement: t.trigger,
        };
        this.context.events.emit("openchange", n);
      }
      this.context.onOpenChange?.(e, t);
    };
  }
  e.s(["f", 0, l]);
};
