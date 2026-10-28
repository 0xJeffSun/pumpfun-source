// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var r = e.i(732486),
    i = e.i(995040),
    o = e.i(612269);
  e.s([
    "S",
    0,
    ({
      primaryCta: e,
      secondaryCta: n,
      helpText: t,
      footerText: a,
      watermark: s = !0,
      children: l,
      ...c
    }) => {
      let d =
        e || n
          ? (0, r.jsxs)(r.Fragment, {
              children: [
                e &&
                  (() => {
                    let { label: o, ...n } = e,
                      t = n.variant || "primary";
                    return (0, r.jsx)(i.B, {
                      ...n,
                      variant: t,
                      style: { width: "100%", ...n.style },
                      children: o,
                    });
                  })(),
                n &&
                  (() => {
                    let { label: e, ...o } = n,
                      t = o.variant || "secondary";
                    return (0, r.jsx)(i.B, {
                      ...o,
                      variant: t,
                      style: { width: "100%", ...o.style },
                      children: e,
                    });
                  })(),
              ],
            })
          : null;
      return (0, r.jsxs)(o.S, {
        id: c.id,
        className: c.className,
        children: [
          (0, r.jsx)(o.S.Header, { ...c }),
          l ? (0, r.jsx)(o.S.Body, { children: l }) : null,
          t || d || s
            ? (0, r.jsxs)(o.S.Footer, {
                children: [
                  t ? (0, r.jsx)(o.S.HelpText, { children: t }) : null,
                  d ? (0, r.jsx)(o.S.Actions, { children: d }) : null,
                  s ? (0, r.jsx)(o.S.Watermark, {}) : null,
                ],
              })
            : null,
          a ? (0, r.jsx)(o.S.FooterText, { children: a }) : null,
        ],
      });
    },
  ]);
};
