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
      helpText: l,
      footerText: t,
      watermark: n = !0,
      children: d,
      ...c
    }) => {
      let s =
        r || a
          ? (0, e.jsxs)(e.Fragment, {
              children: [
                r &&
                  (() => {
                    let { label: i, ...a } = r,
                      l = a.variant || "primary";
                    return (0, e.jsx)(o.B, {
                      ...a,
                      variant: l,
                      style: { width: "100%", ...a.style },
                      children: i,
                    });
                  })(),
                a &&
                  (() => {
                    let { label: r, ...i } = a,
                      l = i.variant || "secondary";
                    return (0, e.jsx)(o.B, {
                      ...i,
                      variant: l,
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
          d ? (0, e.jsx)(i.S.Body, { children: d }) : null,
          l || s || n
            ? (0, e.jsxs)(i.S.Footer, {
                children: [
                  l ? (0, e.jsx)(i.S.HelpText, { children: l }) : null,
                  s ? (0, e.jsx)(i.S.Actions, { children: s }) : null,
                  n ? (0, e.jsx)(i.S.Watermark, {}) : null,
                ],
              })
            : null,
          t ? (0, e.jsx)(i.S.FooterText, { children: t }) : null,
        ],
      });
    },
  ]);
};
