// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(78436),
    n = e.i(697453);
  let i = { livestreams: !1, all: !1, bridge: !1, perps: !1, isLoading: !0 },
    r = (0, t.$)()((e) => ({
      ...i,
      setDisabledFeatures: (t) =>
        e({
          livestreams: t.livestreams,
          all: t.all,
          bridge: !0 === t.bridge,
          perps: !0 === t.perps,
        }),
      setLoading: (t) => e({ isLoading: t }),
    }));
  function a(e) {
    return e.bridge && !e.isLoading;
  }
  function s(e) {
    return e.perps && !e.isLoading;
  }
  e.s([
    "K",
    0,
    r,
    "V",
    0,
    () => r((e) => e.livestreams && !e.isLoading),
    "i",
    0,
    () => {
      let e = r(s),
        t = (0, n.l)();
      return e && !t;
    },
    "b",
    0,
    () => r((e) => e.all),
    "m",
    0,
    () => {
      let e = (0, n.l)();
      return r(a) && !e;
    },
    "y",
    0,
    () => r((e) => e.isLoading),
  ]);
};
