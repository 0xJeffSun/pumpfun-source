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
      secondaryCta: a,
      helpText: t,
      footerText: l,
      watermark: n = !0,
      children: s,
      ...c
    }) => {
      let d =
        e || a
          ? (0, r.jsxs)(r.Fragment, {
              children: [
                e &&
                  (() => {
                    let { label: o, ...a } = e,
                      t = a.variant || "primary";
                    return (0, r.jsx)(i.B, {
                      ...a,
                      variant: t,
                      style: { width: "100%", ...a.style },
                      children: o,
                    });
                  })(),
                a &&
                  (() => {
                    let { label: e, ...o } = a,
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
          s ? (0, r.jsx)(o.S.Body, { children: s }) : null,
          t || d || n
            ? (0, r.jsxs)(o.S.Footer, {
                children: [
                  t ? (0, r.jsx)(o.S.HelpText, { children: t }) : null,
                  d ? (0, r.jsx)(o.S.Actions, { children: d }) : null,
                  n ? (0, r.jsx)(o.S.Watermark, {}) : null,
                ],
              })
            : null,
          l ? (0, r.jsx)(o.S.FooterText, { children: l }) : null,
        ],
      });
    },
  ]);
};
