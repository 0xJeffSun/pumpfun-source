// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(732486),
    s = e.i(445242);
  e.i(12692);
  var r = e.i(398902);
  e.s([
    "f",
    0,
    (e) => {
      let n,
        i,
        l,
        o,
        a,
        u = (0, s.c)(15),
        {
          hasMore: d,
          isLoading: c,
          sentinelRef: f,
          visibleCount: m,
          itemLabel: b,
        } = e,
        { t: g } = (0, r.f)();
      if (u[0] !== d || u[1] !== c || u[2] !== b || u[3] !== g || u[4] !== m) {
        let e = b ?? g("web.bounties.items_bounties");
        ((n = "polite"),
          (i =
            "flex flex-col items-center gap-2 border-t border-border-secondary px-6 py-8 text-[12px] text-text-tertiary"),
          (l = c
            ? (0, t.jsxs)(t.Fragment, {
                children: [
                  (0, t.jsx)("span", {
                    className:
                      "inline-flex h-5 w-5 animate-spin rounded-full border-2 border-border-tertiary border-t-positive",
                  }),
                  (0, t.jsx)("span", {
                    className: "tabular-nums",
                    children: g("web.bounties.loading_more_items", {
                      items: e,
                      count: m.toLocaleString(),
                    }),
                  }),
                ],
              })
            : d
              ? (0, t.jsx)("span", {
                  className: "tabular-nums",
                  children: g("web.bounties.scroll_to_load_more", {
                    items: e,
                    count: m.toLocaleString(),
                  }),
                })
              : (0, t.jsx)("span", {
                  className: "tabular-nums",
                  children: g("web.bounties.reached_the_end", {
                    items: e,
                    count: m.toLocaleString(),
                  }),
                })),
          (u[0] = d),
          (u[1] = c),
          (u[2] = b),
          (u[3] = g),
          (u[4] = m),
          (u[5] = n),
          (u[6] = i),
          (u[7] = l));
      } else ((n = u[5]), (i = u[6]), (l = u[7]));
      return (
        u[8] !== f
          ? ((o = (0, t.jsx)("div", { "aria-hidden": "true", ref: f })),
            (u[8] = f),
            (u[9] = o))
          : (o = u[9]),
        u[10] !== n || u[11] !== i || u[12] !== l || u[13] !== o
          ? ((a = (0, t.jsxs)("div", {
              "aria-live": n,
              className: i,
              children: [l, o],
            })),
            (u[10] = n),
            (u[11] = i),
            (u[12] = l),
            (u[13] = o),
            (u[14] = a))
          : (a = u[14]),
        a
      );
    },
  ]);
};
