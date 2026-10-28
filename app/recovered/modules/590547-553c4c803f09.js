// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(209296),
    n = e.i(340607),
    r = e.i(950161),
    i = e.i(297454);
  let o = (0, t.f)((e) => e.triggerIdProp ?? e.activeTriggerId),
    l = {
      open: (0, t.f)((e) => e.openProp ?? e.open),
      mounted: (0, t.f)((e) => e.mounted),
      transitionStatus: (0, t.f)((e) => e.transitionStatus),
      floatingRootContext: (0, t.f)((e) => e.floatingRootContext),
      preventUnmountingOnClose: (0, t.f)((e) => e.preventUnmountingOnClose),
      payload: (0, t.f)((e) => e.payload),
      activeTriggerId: o,
      activeTriggerElement: (0, t.f)((e) =>
        e.mounted ? e.activeTriggerElement : null,
      ),
      isTriggerActive: (0, t.f)((e, t) => void 0 !== t && o(e) === t),
      isOpenedByTrigger: (0, t.f)(
        (e, t) => void 0 !== t && o(e) === t && e.open,
      ),
      isMountedByTrigger: (0, t.f)(
        (e, t) => void 0 !== t && o(e) === t && e.mounted,
      ),
      triggerProps: (0, t.f)((e, t) =>
        t ? e.activeTriggerProps : e.inactiveTriggerProps,
      ),
      popupProps: (0, t.f)((e) => e.popupProps),
      popupElement: (0, t.f)((e) => e.popupElement),
      positionerElement: (0, t.f)((e) => e.positionerElement),
    };
  e.s(
    [
      "i",
      0,
      function () {
        return {
          open: !1,
          openProp: void 0,
          mounted: !1,
          transitionStatus: "idle",
          floatingRootContext: new r.f({
            open: !1,
            floatingElement: null,
            referenceElement: null,
            triggerElements: new n.f(),
            floatingId: "",
            nested: !1,
            noEmit: !1,
            onOpenChange: void 0,
          }),
          preventUnmountingOnClose: !1,
          payload: void 0,
          activeTriggerId: null,
          activeTriggerElement: null,
          triggerIdProp: void 0,
          popupElement: null,
          positionerElement: null,
          activeTriggerProps: i.w,
          inactiveTriggerProps: i.w,
          popupProps: i.w,
        };
      },
      "j",
      0,
      l,
    ],
    590547,
  );
};
