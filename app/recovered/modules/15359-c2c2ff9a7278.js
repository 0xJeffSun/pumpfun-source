// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(732486),
    r = e.i(445242),
    n = e.i(375670);
  let i = ["a", "b", "c", "d", "e", "f", "g", "h"],
    a = {
      inbox: {
        rows: 5,
        list: "flex flex-col gap-1 px-2",
        row: "flex items-center gap-3 p-3",
        avatar: "size-11 shrink-0 rounded-full",
      },
      picker: {
        rows: 8,
        list: "flex flex-col",
        row: "flex items-center gap-3 px-4 py-3",
        avatar: "size-10 shrink-0 rounded-full",
      },
    };
  e.s([
    "f",
    0,
    function (e) {
      let l,
        s,
        o = (0, r.c)(11),
        { label: c, variant: u } = e,
        d = a[void 0 === u ? "inbox" : u],
        f = d.list;
      if (o[0] !== d.avatar || o[1] !== d.row || o[2] !== d.rows) {
        let e;
        (o[4] !== d.avatar || o[5] !== d.row
          ? ((e = (e) =>
              (0, t.jsxs)(
                "li",
                {
                  className: d.row,
                  children: [
                    (0, t.jsx)(n.f, { className: d.avatar }),
                    (0, t.jsxs)("span", {
                      className: "flex flex-1 flex-col gap-2",
                      children: [
                        (0, t.jsx)(n.f, { className: "h-3.5 w-1/2" }),
                        (0, t.jsx)(n.f, { className: "h-3 w-3/4" }),
                      ],
                    }),
                  ],
                },
                e,
              )),
            (o[4] = d.avatar),
            (o[5] = d.row),
            (o[6] = e))
          : (e = o[6]),
          (l = i.slice(0, d.rows).map(e)),
          (o[0] = d.avatar),
          (o[1] = d.row),
          (o[2] = d.rows),
          (o[3] = l));
      } else l = o[3];
      return (
        o[7] !== d.list || o[8] !== c || o[9] !== l
          ? ((s = (0, t.jsx)("ul", {
              "aria-busy": !0,
              "aria-label": c,
              className: f,
              children: l,
            })),
            (o[7] = d.list),
            (o[8] = c),
            (o[9] = l),
            (o[10] = s))
          : (s = o[10]),
        s
      );
    },
  ]);
};
