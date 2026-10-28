// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(r) => {
  var e = r.i(732486),
    o = r.i(995040),
    a = r.i(612269);
  r.s([
    "S",
    0,
    ({
      primaryCta: r,
      secondaryCta: i,
      helpText: t,
      footerText: n,
      watermark: l = !0,
      children: c,
      ...s
    }) => {
      let d =
        r || i
          ? (0, e.jsxs)(e.Fragment, {
              children: [
                r &&
                  (() => {
                    let { label: a, ...i } = r,
                      t = i.variant || "primary";
                    return (0, e.jsx)(o.B, {
                      ...i,
                      variant: t,
                      style: { width: "100%", ...i.style },
                      children: a,
                    });
                  })(),
                i &&
                  (() => {
                    let { label: r, ...a } = i,
                      t = a.variant || "secondary";
                    return (0, e.jsx)(o.B, {
                      ...a,
                      variant: t,
                      style: { width: "100%", ...a.style },
                      children: r,
                    });
                  })(),
              ],
            })
          : null;
      return (0, e.jsxs)(a.S, {
        id: s.id,
        className: s.className,
        children: [
          (0, e.jsx)(a.S.Header, { ...s }),
          c ? (0, e.jsx)(a.S.Body, { children: c }) : null,
          t || d || l
            ? (0, e.jsxs)(a.S.Footer, {
                children: [
                  t ? (0, e.jsx)(a.S.HelpText, { children: t }) : null,
                  d ? (0, e.jsx)(a.S.Actions, { children: d }) : null,
                  l ? (0, e.jsx)(a.S.Watermark, {}) : null,
                ],
              })
            : null,
          n ? (0, e.jsx)(a.S.FooterText, { children: n }) : null,
        ],
      });
    },
  ]);
};
