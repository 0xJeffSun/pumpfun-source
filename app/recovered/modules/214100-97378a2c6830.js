// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  (e.s(
    [
      "f",
      0,
      ({ read: e, write: t, readServer: r }) => {
        let i = new Set();
        return {
          kind: "cookie",
          read: () => e() ?? void 0,
          write: (e) => {
            (t(e), i.forEach((e) => e()));
          },
          subscribe: (e) => (
            i.add(e),
            () => {
              i.delete(e);
            }
          ),
          readServer: r ? ({ cookieHeader: e }) => r(e) ?? void 0 : void 0,
        };
      },
    ],
    214100,
  ),
    e.s(
      [
        "f",
        0,
        ({ store: e, select: t, write: r }) => ({
          kind: "localBucket",
          read: () => t(e().getState()),
          write: (t) => r({ next: t, state: e().getState() }),
          subscribe: (r) =>
            e().subscribe((e, i) => {
              Object.is(t(e), t(i)) || r();
            }),
        }),
      ],
      73383,
    ));
};
