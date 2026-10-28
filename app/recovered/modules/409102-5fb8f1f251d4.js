// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(268932),
    n = e.i(303232),
    r = e.i(732612),
    i = e.i(839854);
  let o = `button,a,[role="button"],select,[tabindex]:not([tabindex="-1"]),${i.n}`;
  class l {
    constructor() {
      ((this.pointerType = void 0),
        (this.interactedInside = !1),
        (this.handler = void 0),
        (this.blockMouseMove = !0),
        (this.performedPointerEventsMutation = !1),
        (this.pointerEventsScopeElement = null),
        (this.pointerEventsReferenceElement = null),
        (this.pointerEventsFloatingElement = null),
        (this.restTimeoutPending = !1),
        (this.openChangeTimeout = new r.U()),
        (this.restTimeout = new r.U()),
        (this.handleCloseOptions = void 0));
    }
    static create() {
      return new l();
    }
    dispose = () => {
      (this.openChangeTimeout.clear(), this.restTimeout.clear());
    };
    disposeEffect = () => this.dispose;
  }
  function s(e) {
    e.performedPointerEventsMutation &&
      (e.pointerEventsScopeElement?.style.removeProperty("pointer-events"),
      e.pointerEventsReferenceElement?.style.removeProperty("pointer-events"),
      e.pointerEventsFloatingElement?.style.removeProperty("pointer-events"),
      (e.performedPointerEventsMutation = !1),
      (e.pointerEventsScopeElement = null),
      (e.pointerEventsReferenceElement = null),
      (e.pointerEventsFloatingElement = null));
  }
  e.s([
    "p",
    0,
    function (e, t) {
      let { scopeElement: n, referenceElement: r, floatingElement: i } = t;
      (s(e),
        (e.performedPointerEventsMutation = !0),
        (e.pointerEventsScopeElement = n),
        (e.pointerEventsReferenceElement = r),
        (e.pointerEventsFloatingElement = i),
        (n.style.pointerEvents = "none"),
        (r.style.pointerEvents = "auto"),
        (i.style.pointerEvents = "auto"));
    },
    "O",
    0,
    s,
    "W",
    0,
    function (e) {
      return !!e && !!e.closest(o);
    },
    "s",
    0,
    function (e) {
      let r = (0, n.f)(l.create).current,
        i = e.context.dataRef.current;
      return (
        i.hoverInteractionState || (i.hoverInteractionState = r),
        (0, t.f)(i.hoverInteractionState.disposeEffect),
        i.hoverInteractionState
      );
    },
  ]);
};
