// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(732486),
    n = e.i(445242),
    a = e.i(338319);
  let s = {
    active: {
      label: "Agent active",
      text: "text-positive",
      bg: "bg-positive/10",
      dot: "bg-positive",
    },
    paused: {
      label: "Agent paused",
      text: "text-yellow-500",
      bg: "bg-yellow-500/10",
      dot: "bg-yellow-500",
    },
    completed: {
      label: "Agent ended",
      text: "text-text-tertiary",
      bg: "bg-text-tertiary/10",
      dot: "bg-text-tertiary",
    },
    enabled: {
      label: "New",
      text: "text-text-accent",
      bg: "bg-text-accent/10",
      dot: "bg-text-accent",
    },
  };
  e.s([
    "f",
    0,
    function (e) {
      let i,
        r,
        l,
        m,
        c = (0, n.c)(12),
        { state: o, className: d } = e,
        u = s[o ?? "enabled"] ?? s.enabled;
      return (
        c[0] !== d || c[1] !== u.bg || c[2] !== u.text
          ? ((i = (0, a.c)(
              "inline-flex h-[26px] w-fit items-center gap-[7px] whitespace-nowrap rounded-full px-[11px] font-semibold text-[11px] tracking-[0.02em]",
              u.bg,
              u.text,
              d,
            )),
            (c[0] = d),
            (c[1] = u.bg),
            (c[2] = u.text),
            (c[3] = i))
          : (i = c[3]),
        c[4] !== u.dot
          ? ((r = (0, a.c)("size-1.5 rounded-full", u.dot)),
            (c[4] = u.dot),
            (c[5] = r))
          : (r = c[5]),
        c[6] !== r
          ? ((l = (0, t.jsx)("span", { className: r })), (c[6] = r), (c[7] = l))
          : (l = c[7]),
        c[8] !== u.label || c[9] !== i || c[10] !== l
          ? ((m = (0, t.jsxs)("span", {
              className: i,
              children: [l, u.label],
            })),
            (c[8] = u.label),
            (c[9] = i),
            (c[10] = l),
            (c[11] = m))
          : (m = c[11]),
        m
      );
    },
  ]);
};
