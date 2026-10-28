// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(732486),
    r = e.i(445242);
  e.i(12692);
  var n = e.i(398902);
  e.s([
    "f",
    0,
    (e) => {
      let s,
        i,
        l,
        a,
        o,
        c = (0, r.c)(15),
        {
          hasMore: u,
          isLoading: d,
          sentinelRef: f,
          visibleCount: x,
          itemLabel: b,
        } = e,
        { t: m } = (0, n.f)();
      if (c[0] !== u || c[1] !== d || c[2] !== b || c[3] !== m || c[4] !== x) {
        let e = b ?? m("web.bounties.items_bounties");
        ((s = "polite"),
          (i =
            "flex flex-col items-center gap-2 border-t border-border-secondary px-6 py-8 text-[12px] text-text-tertiary"),
          (l = d
            ? (0, t.jsxs)(t.Fragment, {
                children: [
                  (0, t.jsx)("span", {
                    className:
                      "inline-flex h-5 w-5 animate-spin rounded-full border-2 border-border-tertiary border-t-positive",
                  }),
                  (0, t.jsx)("span", {
                    className: "tabular-nums",
                    children: m("web.bounties.loading_more_items", {
                      items: e,
                      count: x.toLocaleString(),
                    }),
                  }),
                ],
              })
            : u
              ? (0, t.jsx)("span", {
                  className: "tabular-nums",
                  children: m("web.bounties.scroll_to_load_more", {
                    items: e,
                    count: x.toLocaleString(),
                  }),
                })
              : (0, t.jsx)("span", {
                  className: "tabular-nums",
                  children: m("web.bounties.reached_the_end", {
                    items: e,
                    count: x.toLocaleString(),
                  }),
                })),
          (c[0] = u),
          (c[1] = d),
          (c[2] = b),
          (c[3] = m),
          (c[4] = x),
          (c[5] = s),
          (c[6] = i),
          (c[7] = l));
      } else ((s = c[5]), (i = c[6]), (l = c[7]));
      return (
        c[8] !== f
          ? ((a = (0, t.jsx)("div", { "aria-hidden": "true", ref: f })),
            (c[8] = f),
            (c[9] = a))
          : (a = c[9]),
        c[10] !== s || c[11] !== i || c[12] !== l || c[13] !== a
          ? ((o = (0, t.jsxs)("div", {
              "aria-live": s,
              className: i,
              children: [l, a],
            })),
            (c[10] = s),
            (c[11] = i),
            (c[12] = l),
            (c[13] = a),
            (c[14] = o))
          : (o = c[14]),
        o
      );
    },
  ]);
};
