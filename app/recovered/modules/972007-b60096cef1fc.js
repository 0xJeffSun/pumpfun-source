// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(732486),
    r = e.i(445242),
    n = e.i(426091);
  let i = (0, e.i(294237).f)(
    "inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors",
    {
      variants: {
        variant: {
          default:
            "border-transparent bg-bg-accent text-primary-foreground hover:bg-primary/80",
          secondary:
            "border-transparent bg-bg-tertiary text-text-primary hover:bg-bg-quaternary",
          destructive:
            "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
          outline:
            "border-border-secondary bg-bg-secondary text-text-primary hover:bg-bg-tertiary",
          transparent:
            "border-transparent bg-bg-secondary text-text-tertiary cursor-pointer rounded-lg",
        },
      },
      defaultVariants: { variant: "default" },
    },
  );
  e.s([
    "f",
    0,
    function (e) {
      let a,
        o,
        s,
        l,
        c,
        d,
        m = (0, r.c)(11);
      return (
        m[0] !== e
          ? (({ className: a, variant: s, ...o } = e),
            (m[0] = e),
            (m[1] = a),
            (m[2] = o),
            (m[3] = s))
          : ((a = m[1]), (o = m[2]), (s = m[3])),
        m[4] !== a || m[5] !== s
          ? ((l = (0, n.c)(i({ variant: s }), a)),
            (m[4] = a),
            (m[5] = s),
            (m[6] = l))
          : (l = m[6]),
        m[7] === Symbol.for("react.memo_cache_sentinel")
          ? ((c = { borderRadius: "8px" }), (m[7] = c))
          : (c = m[7]),
        m[8] !== o || m[9] !== l
          ? ((d = (0, t.jsx)("div", { className: l, style: c, ...o })),
            (m[8] = o),
            (m[9] = l),
            (m[10] = d))
          : (d = m[10]),
        d
      );
    },
  ]);
};
