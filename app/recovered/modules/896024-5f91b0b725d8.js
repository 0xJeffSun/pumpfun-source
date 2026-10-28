// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(732486),
    i = e.i(445242),
    r = e.i(439587),
    a = e.i(426091);
  function n(e) {
    return (0, t.jsxs)(
      r.M,
      {
        "aria-label": e.ariaLabel,
        className: "data-[active]:bg-bg-accent",
        value: e.value,
        children: [
          null != e.icon
            ? (0, t.jsx)("span", {
                "aria-hidden": "true",
                className: "inline-flex shrink-0 items-center",
                children: e.icon,
              })
            : null,
          e.label,
        ],
      },
      e.value,
    );
  }
  e.s([
    "f",
    0,
    function (e) {
      let s,
        l,
        o,
        c,
        m,
        u = (0, i.c)(14),
        {
          items: d,
          value: f,
          onValueChange: p,
          ariaLabel: h,
          className: x,
        } = e;
      return (
        u[0] !== p ? ((s = (e) => p(e)), (u[0] = p), (u[1] = s)) : (s = u[1]),
        u[2] !== x ? ((l = (0, a.c)(x)), (u[2] = x), (u[3] = l)) : (l = u[3]),
        u[4] !== d ? ((o = d.map(n)), (u[4] = d), (u[5] = o)) : (o = u[5]),
        u[6] !== h || u[7] !== l || u[8] !== o
          ? ((c = (0, t.jsx)(r.y, {
              "aria-label": h,
              className: l,
              children: o,
            })),
            (u[6] = h),
            (u[7] = l),
            (u[8] = o),
            (u[9] = c))
          : (c = u[9]),
        u[10] !== s || u[11] !== c || u[12] !== f
          ? ((m = (0, t.jsx)(r.i, { value: f, onValueChange: s, children: c })),
            (u[10] = s),
            (u[11] = c),
            (u[12] = f),
            (u[13] = m))
          : (m = u[13]),
        m
      );
    },
  ]);
};
