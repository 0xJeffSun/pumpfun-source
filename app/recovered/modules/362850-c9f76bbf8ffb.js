// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var r = e.i(732486),
    t = e.i(445242);
  e.i(12692);
  var l = e.i(398902),
    a = e.i(338319);
  e.s([
    "FormatUTCDate",
    0,
    (e) => {
      let o,
        s,
        i = (0, t.c)(5),
        { date: d } = e,
        { t: c } = (0, l.f)();
      return (
        i[0] !== d || i[1] !== c
          ? ((o = c("web.ui.last_updated_date", {
              date: (0, a.O)(d, {
                timeZone: "UTC",
                day: "2-digit",
                month: "long",
                year: "numeric",
              }),
            })),
            (i[0] = d),
            (i[1] = c),
            (i[2] = o))
          : (o = i[2]),
        i[3] !== o
          ? ((s = (0, r.jsx)("span", { className: "font-bold", children: o })),
            (i[3] = o),
            (i[4] = s))
          : (s = i[4]),
        s
      );
    },
  ]);
};
