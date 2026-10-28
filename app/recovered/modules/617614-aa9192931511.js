// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(78436);
  let r = { isSearchOpen: !1 },
    n = (0, t.$)()((e) => ({
      ...r,
      setIsSearchOpen: (t) => e({ isSearchOpen: t }),
      toggleSearchDialog: () => e((e) => ({ isSearchOpen: !e.isSearchOpen })),
    })),
    i = (e) => e.isSearchOpen,
    a = (e) => e.setIsSearchOpen;
  e.s(["F", 0, () => n(i), "Z", 0, () => n(a)]);
};
