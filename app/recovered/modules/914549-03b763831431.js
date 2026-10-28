// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  let t = "buy-with-privy-large-amounts-confirmation",
    r = "trade-auto-confirm-prompt-dismissed",
    n = new Set(),
    o = () => {
      let e;
      return !(null !== (e = localStorage.getItem(t)) && JSON.parse(e));
    };
  e.s([
    "V",
    0,
    o,
    "O",
    0,
    (e) => {
      localStorage.setItem(r, JSON.stringify(e));
    },
    "C",
    0,
    (e) => {
      (localStorage.setItem(t, JSON.stringify(!e)),
        n.forEach((e) => {
          e();
        }));
    },
    "y",
    0,
    ({ isPrivyWallet: e }) =>
      !(!e || o()) && "true" !== localStorage.getItem(r),
    "F",
    0,
    () => !o(),
    "R",
    0,
    (e) => (
      n.add(e),
      () => {
        n.delete(e);
      }
    ),
  ]);
};
