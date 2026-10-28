// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(732486),
    n = e.i(445242),
    r = e.i(426091),
    i = e.i(352386);
  e.i(12692);
  var l = e.i(398902);
  (e.i(595673),
    e.s([
      "f",
      0,
      function (e) {
        let a,
          s,
          o,
          c,
          d,
          m,
          h = (0, n.c)(21),
          { coin: u } = e,
          { t: f } = (0, l.f)(),
          x = (0, i.useId)(),
          [p, g] = (0, i.useState)(!1);
        h[0] !== u.description
          ? ((a = u.description?.trim()), (h[0] = u.description), (h[1] = a))
          : (a = h[1]);
        let b = a;
        if (!b) return null;
        let v = b.length > 150,
          w = v && !p,
          y = w && "line-clamp-2";
        return (
          h[2] !== y
            ? ((s = (0, r.c)(
                "m-0 text-[12px] leading-4 text-text-secondary",
                y,
              )),
              (h[2] = y),
              (h[3] = s))
            : (s = h[3]),
          h[4] !== x || h[5] !== v || h[6] !== p || h[7] !== f
            ? ((o =
                v && p
                  ? (0, t.jsx)("button", {
                      type: "button",
                      "aria-controls": x,
                      "aria-expanded": !0,
                      "aria-label": f("common.show_less"),
                      className:
                        "ml-1.5 inline border-0 bg-transparent p-0 text-[12px] text-text-tertiary transition-colors hover:text-text-primary",
                      onClick: () => g(!1),
                      children: f("common.show_less"),
                    })
                  : null),
              (h[4] = x),
              (h[5] = v),
              (h[6] = p),
              (h[7] = f),
              (h[8] = o))
            : (o = h[8]),
          h[9] !== b || h[10] !== x || h[11] !== s || h[12] !== o
            ? ((c = (0, t.jsxs)("p", {
                id: x,
                className: s,
                children: [b, o],
              })),
              (h[9] = b),
              (h[10] = x),
              (h[11] = s),
              (h[12] = o),
              (h[13] = c))
            : (c = h[13]),
          h[14] !== x || h[15] !== w || h[16] !== f
            ? ((d = w
                ? (0, t.jsx)("button", {
                    type: "button",
                    "aria-controls": x,
                    "aria-expanded": !1,
                    "aria-label": f("common.show_more"),
                    className:
                      "absolute right-0 bottom-0 border-0 bg-gradient-to-r from-transparent from-0% via-bg-secondary via-[18px] to-bg-secondary pl-7 text-[12px] leading-4 text-text-tertiary transition-colors hover:text-text-primary",
                    onClick: () => g(!0),
                    children: f("common.show_more"),
                  })
                : null),
              (h[14] = x),
              (h[15] = w),
              (h[16] = f),
              (h[17] = d))
            : (d = h[17]),
          h[18] !== c || h[19] !== d
            ? ((m = (0, t.jsxs)("div", {
                className: "relative max-w-[72ch]",
                children: [c, d],
              })),
              (h[18] = c),
              (h[19] = d),
              (h[20] = m))
            : (m = h[20]),
          m
        );
      },
    ]));
};
