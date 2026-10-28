// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(732486),
    i = e.i(445242),
    r = e.i(177560),
    a = e.i(426091);
  let n = e.i(352386).forwardRef((e, n) => {
    let s,
      l,
      o,
      c,
      m,
      u,
      d,
      f,
      p = (0, i.c)(17);
    p[0] !== e
      ? (({ className: s, value: c, barColor: o, ...l } = e),
        (p[0] = e),
        (p[1] = s),
        (p[2] = l),
        (p[3] = o),
        (p[4] = c))
      : ((s = p[1]), (l = p[2]), (o = p[3]), (c = p[4]));
    let h = void 0 === o ? "bg-text-primary" : o;
    p[5] !== s
      ? ((m = (0, a.c)(
          "relative h-4 w-full overflow-hidden rounded-full bg-bg-tertiary",
          s,
        )),
        (p[5] = s),
        (p[6] = m))
      : (m = p[6]);
    let x = `h-full w-full flex-1 ${h} transition-all`,
      v = `translateX(-${100 - (c || 0)}%)`;
    return (
      p[7] !== v
        ? ((u = { transform: v }), (p[7] = v), (p[8] = u))
        : (u = p[8]),
      p[9] !== x || p[10] !== u
        ? ((d = (0, t.jsx)(r.S, { className: x, style: u })),
          (p[9] = x),
          (p[10] = u),
          (p[11] = d))
        : (d = p[11]),
      p[12] !== l || p[13] !== n || p[14] !== m || p[15] !== d
        ? ((f = (0, t.jsx)(r.F, { ref: n, className: m, ...l, children: d })),
          (p[12] = l),
          (p[13] = n),
          (p[14] = m),
          (p[15] = d),
          (p[16] = f))
        : (f = p[16]),
      f
    );
  });
  ((n.displayName = r.F.displayName), e.s(["f", 0, n]));
};
