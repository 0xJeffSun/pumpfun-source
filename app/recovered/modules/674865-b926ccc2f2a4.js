// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(732486),
    n = e.i(445242);
  e.i(12692);
  var i = e.i(398902);
  e.s([
    "f",
    0,
    (e) => {
      let r,
        a,
        s,
        o,
        u,
        l = (0, n.c)(15),
        {
          hasMore: c,
          isLoading: m,
          sentinelRef: d,
          visibleCount: f,
          itemLabel: b,
        } = e,
        { t: p } = (0, i.f)();
      if (l[0] !== c || l[1] !== m || l[2] !== b || l[3] !== p || l[4] !== f) {
        let e = b ?? p("web.bounties.items_bounties");
        ((r = "polite"),
          (a =
            "flex flex-col items-center gap-2 border-t border-border-secondary px-6 py-8 text-[12px] text-text-tertiary"),
          (s = m
            ? (0, t.jsxs)(t.Fragment, {
                children: [
                  (0, t.jsx)("span", {
                    className:
                      "inline-flex h-5 w-5 animate-spin rounded-full border-2 border-border-tertiary border-t-positive",
                  }),
                  (0, t.jsx)("span", {
                    className: "tabular-nums",
                    children: p("web.bounties.loading_more_items", {
                      items: e,
                      count: f.toLocaleString(),
                    }),
                  }),
                ],
              })
            : c
              ? (0, t.jsx)("span", {
                  className: "tabular-nums",
                  children: p("web.bounties.scroll_to_load_more", {
                    items: e,
                    count: f.toLocaleString(),
                  }),
                })
              : (0, t.jsx)("span", {
                  className: "tabular-nums",
                  children: p("web.bounties.reached_the_end", {
                    items: e,
                    count: f.toLocaleString(),
                  }),
                })),
          (l[0] = c),
          (l[1] = m),
          (l[2] = b),
          (l[3] = p),
          (l[4] = f),
          (l[5] = r),
          (l[6] = a),
          (l[7] = s));
      } else ((r = l[5]), (a = l[6]), (s = l[7]));
      return (
        l[8] !== d
          ? ((o = (0, t.jsx)("div", { "aria-hidden": "true", ref: d })),
            (l[8] = d),
            (l[9] = o))
          : (o = l[9]),
        l[10] !== r || l[11] !== a || l[12] !== s || l[13] !== o
          ? ((u = (0, t.jsxs)("div", {
              "aria-live": r,
              className: a,
              children: [s, o],
            })),
            (l[10] = r),
            (l[11] = a),
            (l[12] = s),
            (l[13] = o),
            (l[14] = u))
          : (u = l[14]),
        u
      );
    },
  ]);
};
