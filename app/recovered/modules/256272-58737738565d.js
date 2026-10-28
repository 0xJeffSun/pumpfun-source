// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(732486),
    n = e.i(445242),
    r = e.i(426091),
    o = e.i(352386);
  let i =
      "flex flex-col rounded-xl border border-solid border-border-secondary bg-bg-secondary px-0 py-4",
    a = {
      card: {
        default:
          "flex flex-col rounded-xl border border-solid border-border-secondary bg-bg-secondary p-4",
        table: i,
      },
      panel: { default: "flex flex-col p-3", table: "flex flex-col px-0 py-3" },
    },
    s = (0, o.createContext)("card"),
    l = () => (0, o.use)(s);
  e.s([
    "$",
    0,
    i,
    "g",
    0,
    function (e) {
      let o,
        i,
        s,
        c,
        u,
        p,
        d = (0, n.c)(13);
      d[0] !== e
        ? (({ children: o, className: i, variant: c, ...s } = e),
          (d[0] = e),
          (d[1] = o),
          (d[2] = i),
          (d[3] = s),
          (d[4] = c))
        : ((o = d[1]), (i = d[2]), (s = d[3]), (c = d[4]));
      let f = void 0 === c ? "default" : c,
        g = l(),
        m = a[g][f];
      d[5] !== i || d[6] !== m
        ? ((u = (0, r.c)(m, i)), (d[5] = i), (d[6] = m), (d[7] = u))
        : (u = d[7]);
      let b = "panel" === g ? "panel" : void 0;
      return (
        d[8] !== o || d[9] !== s || d[10] !== u || d[11] !== b
          ? ((p = (0, t.jsx)("section", {
              className: u,
              "data-surface": b,
              ...s,
              children: o,
            })),
            (d[8] = o),
            (d[9] = s),
            (d[10] = u),
            (d[11] = b),
            (d[12] = p))
          : (p = d[12]),
        p
      );
    },
    "F",
    0,
    function (e) {
      let r,
        o = (0, n.c)(3),
        { surface: i, children: a } = e;
      return (
        o[0] !== a || o[1] !== i
          ? ((r = (0, t.jsx)(s.Provider, { value: i, children: a })),
            (o[0] = a),
            (o[1] = i),
            (o[2] = r))
          : (r = o[2]),
        r
      );
    },
    "u",
    0,
    l,
  ]);
};
