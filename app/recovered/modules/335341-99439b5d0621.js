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
      helpText: a,
      footerText: l,
      watermark: n = !0,
      children: c,
      ...s
    }) => {
      let d =
        r || t
          ? (0, e.jsxs)(e.Fragment, {
              children: [
                r &&
                  (() => {
                    let { label: i, ...t } = r,
                      a = t.variant || "primary";
                    return (0, e.jsx)(o.B, {
                      ...t,
                      variant: a,
                      style: { width: "100%", ...t.style },
                      children: i,
                    });
                  })(),
                t &&
                  (() => {
                    let { label: r, ...i } = t,
                      a = i.variant || "secondary";
                    return (0, e.jsx)(o.B, {
                      ...i,
                      variant: a,
                      style: { width: "100%", ...i.style },
                      children: r,
                    });
                  })(),
              ],
            })
          : null;
      return (0, e.jsxs)(i.S, {
        id: s.id,
        className: s.className,
        children: [
          (0, e.jsx)(i.S.Header, { ...s }),
          c ? (0, e.jsx)(i.S.Body, { children: c }) : null,
          a || d || n
            ? (0, e.jsxs)(i.S.Footer, {
                children: [
                  a ? (0, e.jsx)(i.S.HelpText, { children: a }) : null,
                  d ? (0, e.jsx)(i.S.Actions, { children: d }) : null,
                  n ? (0, e.jsx)(i.S.Watermark, {}) : null,
                ],
              })
            : null,
          l ? (0, e.jsx)(i.S.FooterText, { children: l }) : null,
        ],
      });
    },
  ]);
};
