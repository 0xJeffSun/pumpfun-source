// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(904440);
  e.s(["f", 0, t], 854274);
  var n = e.i(352386),
    r = e.i(278051),
    i = e.i(565693),
    o = e.i(378734),
    l = e.i(24542);
  e.s(
    [
      "z",
      0,
      function (e) {
        let t = e.useState("open");
        (0, i.f)(() => {
          if (
            t &&
            !e.select("activeTriggerId") &&
            1 === e.context.triggerElements.size
          ) {
            let t = e.context.triggerElements.entries().next();
            if (!t.done) {
              let [n, r] = t.value;
              e.update({ activeTriggerId: n, activeTriggerElement: r });
            }
          }
        }, [t, e]);
      },
      "L",
      0,
      function (e, t, n) {
        let { mounted: i, setMounted: s, transitionStatus: u } = (0, o.f)(e);
        t.useSyncedValues({ mounted: i, transitionStatus: u });
        let a = (0, r.f)(() => {
            (s(!1),
              t.update({
                activeTriggerId: null,
                activeTriggerElement: null,
                mounted: !1,
              }),
              n?.(),
              t.context.onOpenChangeComplete?.(!1));
          }),
          c = t.useState("preventUnmountingOnClose");
        return (
          (0, l.f)({
            enabled: !c,
            open: e,
            ref: t.context.popupRef,
            onComplete() {
              e || a();
            },
          }),
          { forceUnmount: a, transitionStatus: u }
        );
      },
      "F",
      0,
      function (e, t, o, l) {
        let s,
          u,
          a = o.useState("isMountedByTrigger", e),
          c =
            ((s = n.useRef(null)),
            (u = n.useRef(null)),
            n.useCallback(
              (t) => {
                if (void 0 !== e) {
                  if (null !== s.current) {
                    let e = s.current,
                      t = u.current,
                      n = o.context.triggerElements.getById(e);
                    (t && n === t && o.context.triggerElements.delete(e),
                      (s.current = null),
                      (u.current = null));
                  }
                  null !== t &&
                    ((s.current = e),
                    (u.current = t),
                    o.context.triggerElements.add(e, t));
                }
              },
              [o, e],
            )),
          f = (0, r.f)((t) => {
            if ((c(t), !t || !o.select("open"))) return;
            let n = o.select("activeTriggerId");
            n === e
              ? o.update({ activeTriggerElement: t, ...l })
              : null == n &&
                o.update({ activeTriggerId: e, activeTriggerElement: t, ...l });
          });
        return (
          (0, i.f)(() => {
            a && o.update({ activeTriggerElement: t.current, ...l });
          }, [a, o, t, ...Object.values(l)]),
          { registerTrigger: f, isMountedByThisTrigger: a }
        );
      },
    ],
    290915,
  );
};
