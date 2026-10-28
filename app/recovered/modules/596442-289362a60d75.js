// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e, t, n) => {
  (Object.defineProperty(n, "__esModule", { value: !0 }),
    Object.defineProperty(n, "default", {
      enumerable: !0,
      get: function () {
        return l;
      },
    }));
  let r = e.r(352386),
    i = "u" < typeof window,
    o = i ? () => {} : r.useLayoutEffect,
    s = i ? () => {} : r.useEffect;
  function l(e) {
    let { headManager: t, reduceComponentsToState: n } = e;
    function l() {
      if (t && t.mountedInstances) {
        let e = r.Children.toArray(
          Array.from(t.mountedInstances).filter(Boolean),
        );
        t.updateHead(n(e));
      }
    }
    return (
      i && (t?.mountedInstances?.add(e.children), l()),
      o(
        () => (
          t?.mountedInstances?.add(e.children),
          () => {
            t?.mountedInstances?.delete(e.children);
          }
        ),
      ),
      o(
        () => (
          t && (t._pendingUpdate = l),
          () => {
            t && (t._pendingUpdate = l);
          }
        ),
      ),
      s(
        () => (
          t &&
            t._pendingUpdate &&
            (t._pendingUpdate(), (t._pendingUpdate = null)),
          () => {
            t &&
              t._pendingUpdate &&
              (t._pendingUpdate(), (t._pendingUpdate = null));
          }
        ),
      ),
      null
    );
  }
};
