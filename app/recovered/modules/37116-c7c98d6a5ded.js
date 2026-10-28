// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(352386);
  let r = { flags: {}, ldClient: void 0 },
    o = () => {
      let e = r,
        t = new Set();
      return {
        getState: () => e,
        setState: (r) => {
          if (r !== e) for (let o of ((e = r), t)) o();
        },
        subscribe: (e) => (
          t.add(e),
          () => {
            t.delete(e);
          }
        ),
      };
    },
    n = (0, t.createContext)(o()),
    a = () => r,
    i = () => {
      let e = (0, t.use)(n);
      return (0, t.useSyncExternalStore)(e.subscribe, e.getState, a);
    };
  e.s([
    "LaunchDarklyClientContext",
    0,
    n,
    "createLaunchDarklyClientStore",
    0,
    o,
    "useLDClient",
    0,
    () => i().ldClient,
    "useLaunchDarklyFlags",
    0,
    () => i().flags,
  ]);
};
