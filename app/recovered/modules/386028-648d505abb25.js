// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(732486),
    i = e.i(445242),
    l = e.i(426091),
    r = e.i(365089);
  e.i(12692);
  var a = e.i(398902),
    o = e.i(174251);
  (e.s(
    [
      "f",
      0,
      function (e) {
        let n,
          s,
          d,
          c,
          u = (0, i.c)(14),
          { quoted: m, dense: p } = e,
          f = void 0 !== p && p,
          { t: h } = (0, a.f)();
        u[0] !== m.authorAddress || u[1] !== m.authorName
          ? ((n =
              m.authorName ??
              (m.authorAddress ? (0, r.d)(m.authorAddress, 4, 4) : void 0)),
            (u[0] = m.authorAddress),
            (u[1] = m.authorName),
            (u[2] = n))
          : (n = u[2]);
        let I = n,
          x = f ? "p-2" : "p-3";
        return (
          u[3] !== x
            ? ((s = (0, l.c)(
                "w-full rounded-md border border-border-tertiary",
                x,
              )),
              (u[3] = x),
              (u[4] = s))
            : (s = u[4]),
          u[5] !== I ||
          u[6] !== f ||
          u[7] !== m.deleted ||
          u[8] !== m.text ||
          u[9] !== h
            ? ((d = m.deleted
                ? (0, t.jsx)("p", {
                    className: "text-xs leading-4 text-text-tertiary",
                    children: h("profile.reposts.deleted_post"),
                  })
                : (0, t.jsxs)(t.Fragment, {
                    children: [
                      I
                        ? (0, t.jsx)("p", {
                            className:
                              "truncate text-xs font-medium leading-4 text-text-secondary",
                            children: I,
                          })
                        : null,
                      m.text
                        ? (0, t.jsx)("p", {
                            className:
                              "mt-0.5 w-full whitespace-pre-wrap break-words text-xs leading-4 text-text-primary",
                            children: (0, t.jsx)(o.f, {
                              content: m.text,
                              density: f ? "terminal" : "comfortable",
                            }),
                          })
                        : null,
                    ],
                  })),
              (u[5] = I),
              (u[6] = f),
              (u[7] = m.deleted),
              (u[8] = m.text),
              (u[9] = h),
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
          let { coinMint: t, calloutId: i, replyId: l } = e;
          return `/callouts/${t}/${i}/${l}`;
        },
      ],
      390767,
    ));
};
