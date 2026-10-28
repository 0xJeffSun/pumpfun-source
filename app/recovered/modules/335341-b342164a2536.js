// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(r) => {
  var e = r.i(732486),
    o = r.i(995040),
    i = r.i(612269);
  r.s([
    "S",
    0,
    ({
      primaryCta: r,
      secondaryCta: t,
      helpText: n,
      footerText: a,
      watermark: l = !0,
      children: s,
      ...c
    }) => {
      let d =
        r || t
          ? (0, e.jsxs)(e.Fragment, {
              children: [
                r &&
                  (() => {
                    let { label: i, ...t } = r,
                      n = t.variant || "primary";
                    return (0, e.jsx)(o.B, {
                      ...t,
                      variant: n,
                      style: { width: "100%", ...t.style },
                      children: i,
                    });
                  })(),
                t &&
                  (() => {
                    let { label: r, ...i } = t,
                      n = i.variant || "secondary";
                    return (0, e.jsx)(o.B, {
                      ...i,
                      variant: n,
                      style: { width: "100%", ...i.style },
                      children: r,
                    });
                  })(),
              ],
            })
          : null;
      return (0, e.jsxs)(i.S, {
        id: c.id,
        className: c.className,
        children: [
          (0, e.jsx)(i.S.Header, { ...c }),
          s ? (0, e.jsx)(i.S.Body, { children: s }) : null,
          n || d || l
            ? (0, e.jsxs)(i.S.Footer, {
                children: [
                  n ? (0, e.jsx)(i.S.HelpText, { children: n }) : null,
                  d ? (0, e.jsx)(i.S.Actions, { children: d }) : null,
                  l ? (0, e.jsx)(i.S.Watermark, {}) : null,
                ],
              })
            : null,
          a ? (0, e.jsx)(i.S.FooterText, { children: a }) : null,
        ],
      });
    },
  ]);
};
