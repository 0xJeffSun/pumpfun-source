// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(t) => {
  var e = t.i(352386),
    r = t.i(732486),
    a = e.createContext(void 0);
  t.s([
    "QueryClientContext",
    0,
    a,
    "QueryClientProvider",
    0,
    ({ client: t, children: s }) => (
      e.useEffect(
        () => (
          t.mount(),
          () => {
            t.unmount();
          }
        ),
        [t],
      ),
      (0, r.jsx)(a.Provider, { value: t, children: s })
    ),
    "useQueryClient",
    0,
    (t) => {
      let r = e.useContext(a);
      if (t) return t;
      if (!r)
        throw Error("No QueryClient set, use QueryClientProvider to set one");
      return r;
    },
  ]);
};
