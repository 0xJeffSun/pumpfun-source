// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(732486),
    i = e.i(445242),
    l = e.i(426091),
    r = e.i(365089);
  e.i(12692);
  var a = e.i(398902),
    n = e.i(174251);
  (e.s(
    [
      "f",
      0,
      function (e) {
        let o,
          s,
          d,
          u,
          c = (0, i.c)(14),
          { quoted: m, dense: p } = e,
          f = void 0 !== p && p,
          { t: I } = (0, a.f)();
        c[0] !== m.authorAddress || c[1] !== m.authorName
          ? ((o =
              m.authorName ??
              (m.authorAddress ? (0, r.d)(m.authorAddress, 4, 4) : void 0)),
            (c[0] = m.authorAddress),
            (c[1] = m.authorName),
            (c[2] = o))
          : (o = c[2]);
        let h = o,
          y = f ? "p-2" : "p-3";
        return (
          c[3] !== y
            ? ((s = (0, l.c)(
                "w-full rounded-md border border-border-tertiary",
                y,
              )),
              (c[3] = y),
              (c[4] = s))
            : (s = c[4]),
          c[5] !== h ||
          c[6] !== f ||
          c[7] !== m.deleted ||
          c[8] !== m.text ||
          c[9] !== I
            ? ((d = m.deleted
                ? (0, t.jsx)("p", {
                    className: "text-xs leading-4 text-text-tertiary",
                    children: I("profile.reposts.deleted_post"),
                  })
                : (0, t.jsxs)(t.Fragment, {
                    children: [
                      h
                        ? (0, t.jsx)("p", {
                            className:
                              "truncate text-xs font-medium leading-4 text-text-secondary",
                            children: h,
                          })
                        : null,
                      m.text
                        ? (0, t.jsx)("p", {
                            className:
                              "mt-0.5 w-full whitespace-pre-wrap break-words text-xs leading-4 text-text-primary",
                            children: (0, t.jsx)(n.f, {
                              content: m.text,
                              density: f ? "terminal" : "comfortable",
                            }),
                          })
                        : null,
                    ],
                  })),
              (c[5] = h),
              (c[6] = f),
              (c[7] = m.deleted),
              (c[8] = m.text),
              (c[9] = I),
              (c[10] = d))
            : (d = c[10]),
          c[11] !== s || c[12] !== d
            ? ((u = (0, t.jsx)("blockquote", {
                "data-testid": "feed-quote-embed",
                className: s,
                children: d,
              })),
              (c[11] = s),
              (c[12] = d),
              (c[13] = u))
            : (u = c[13]),
          u
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
          let { coinMint: t, calloutId: i, replyId: l } = e;
          return `/callouts/${t}/${i}/${l}`;
        },
      ],
      390767,
    ));
};
