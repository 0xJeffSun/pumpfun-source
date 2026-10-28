// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(r) => {
  var e = r.i(732486),
    i = r.i(995040),
    o = r.i(612269);
  r.s([
    "S",
    0,
    ({
      primaryCta: r,
      secondaryCta: t,
      helpText: a,
      footerText: n,
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
                    let { label: o, ...t } = r,
                      a = t.variant || "primary";
                    return (0, e.jsx)(i.B, {
                      ...t,
                      variant: a,
                      style: { width: "100%", ...t.style },
                      children: o,
                    });
                  })(),
                t &&
                  (() => {
                    let { label: r, ...o } = t,
                      a = o.variant || "secondary";
                    return (0, e.jsx)(i.B, {
                      ...o,
                      variant: a,
                      style: { width: "100%", ...o.style },
                      children: r,
                    });
                  })(),
              ],
            })
          : null;
      return (0, e.jsxs)(o.S, {
        id: c.id,
        className: c.className,
        children: [
          (0, e.jsx)(o.S.Header, { ...c }),
          s ? (0, e.jsx)(o.S.Body, { children: s }) : null,
          a || d || l
            ? (0, e.jsxs)(o.S.Footer, {
                children: [
                  a ? (0, e.jsx)(o.S.HelpText, { children: a }) : null,
                  d ? (0, e.jsx)(o.S.Actions, { children: d }) : null,
                  l ? (0, e.jsx)(o.S.Watermark, {}) : null,
                ],
              })
            : null,
          n ? (0, e.jsx)(o.S.FooterText, { children: n }) : null,
        ],
      });
    },
  ]);
};
