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
      secondaryCta: a,
      helpText: t,
      footerText: l,
      watermark: n = !0,
      children: c,
      ...s
    }) => {
      let d =
        r || a
          ? (0, e.jsxs)(e.Fragment, {
              children: [
                r &&
                  (() => {
                    let { label: i, ...a } = r,
                      t = a.variant || "primary";
                    return (0, e.jsx)(o.B, {
                      ...a,
                      variant: t,
                      style: { width: "100%", ...a.style },
                      children: i,
                    });
                  })(),
                a &&
                  (() => {
                    let { label: r, ...i } = a,
                      t = i.variant || "secondary";
                    return (0, e.jsx)(o.B, {
                      ...i,
                      variant: t,
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
          t || d || n
            ? (0, e.jsxs)(i.S.Footer, {
                children: [
                  t ? (0, e.jsx)(i.S.HelpText, { children: t }) : null,
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
