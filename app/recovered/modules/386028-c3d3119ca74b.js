// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(732486),
    a = e.i(445242),
    i = e.i(426091),
    l = e.i(365089);
  e.i(12692);
  var r = e.i(398902),
    n = e.i(174251);
  (e.s(
    [
      "f",
      0,
      function (e) {
        let o,
          s,
          d,
          c,
          u = (0, a.c)(14),
          { quoted: m, dense: p } = e,
          h = void 0 !== p && p,
          { t: f } = (0, r.f)();
        u[0] !== m.authorAddress || u[1] !== m.authorName
          ? ((o =
              m.authorName ??
              (m.authorAddress ? (0, l.d)(m.authorAddress, 4, 4) : void 0)),
            (u[0] = m.authorAddress),
            (u[1] = m.authorName),
            (u[2] = o))
          : (o = u[2]);
        let g = o,
          y = h ? "p-2" : "p-3";
        return (
          u[3] !== y
            ? ((s = (0, i.c)(
                "w-full rounded-md border border-border-tertiary",
                y,
              )),
              (u[3] = y),
              (u[4] = s))
            : (s = u[4]),
          u[5] !== g ||
          u[6] !== h ||
          u[7] !== m.deleted ||
          u[8] !== m.text ||
          u[9] !== f
            ? ((d = m.deleted
                ? (0, t.jsx)("p", {
                    className: "text-xs leading-4 text-text-tertiary",
                    children: f("profile.reposts.deleted_post"),
                  })
                : (0, t.jsxs)(t.Fragment, {
                    children: [
                      g
                        ? (0, t.jsx)("p", {
                            className:
                              "truncate text-xs font-medium leading-4 text-text-secondary",
                            children: g,
                          })
                        : null,
                      m.text
                        ? (0, t.jsx)("p", {
                            className:
                              "mt-0.5 w-full whitespace-pre-wrap break-words text-xs leading-4 text-text-primary",
                            children: (0, t.jsx)(n.f, {
                              content: m.text,
                              density: h ? "terminal" : "comfortable",
                            }),
                          })
                        : null,
                    ],
                  })),
              (u[5] = g),
              (u[6] = h),
              (u[7] = m.deleted),
              (u[8] = m.text),
              (u[9] = f),
              (u[10] = d))
            : (d = u[10]),
          u[11] !== s || u[12] !== d
            ? ((c = (0, t.jsx)("blockquote", {
                "data-testid": "feed-quote-embed",
                className: s,
                children: d,
              })),
              (u[11] = s),
              (u[12] = d),
              (u[13] = c))
            : (c = u[13]),
          c
        );
      },
    ],
    386028,
  ),
    e.s(
      [
        "f",
        0,
        (e) => {
          let { coinMint: t, calloutId: a, replyId: i } = e;
          return `/callouts/${t}/${a}/${i}`;
        },
      ],
      390767,
    ));
};
