// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(t) => {
  let e;
  var r = t.i(352386);
  t.i(732486);
  var a = r.createContext(
    ((e = !1),
    {
      clearReset: () => {
        e = !1;
      },
      reset: () => {
        e = !0;
      },
      isReset: () => e,
    }),
  );
  t.s(["f", 0, () => r.useContext(a)], 921489);
  var s = t.i(667669);
  t.s(
    [
      "l",
      0,
      (t, e) => {
        (t.suspense || t.throwOnError || t.experimental_prefetchInRender) &&
          !e.isReset() &&
          (t.retryOnMount = !1);
      },
      "P",
      0,
      ({
        result: t,
        errorResetBoundary: e,
        throwOnError: r,
        query: a,
        suspense: n,
      }) =>
        t.isError &&
        !e.isReset() &&
        !t.isFetching &&
        a &&
        ((n && void 0 === t.data) || (0, s.Z)(r, [t.error, a])),
      "E",
      0,
      (t) => {
        r.useEffect(() => {
          t.clearReset();
        }, [t]);
      },
    ],
    389623,
  );
};
