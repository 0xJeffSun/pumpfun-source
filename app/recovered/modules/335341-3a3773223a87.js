// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var r = e.i(732486),
    a = e.i(995040),
    o = e.i(612269);
  e.s([
    "S",
    0,
    ({
      primaryCta: e,
      secondaryCta: i,
      helpText: t,
      footerText: n,
      watermark: l = !0,
      children: c,
      ...s
    }) => {
      let d =
        e || i
          ? (0, r.jsxs)(r.Fragment, {
              children: [
                e &&
                  (() => {
                    let { label: o, ...i } = e,
                      t = i.variant || "primary";
                    return (0, r.jsx)(a.B, {
                      ...i,
                      variant: t,
                      style: { width: "100%", ...i.style },
                      children: o,
                    });
                  })(),
                i &&
                  (() => {
                    let { label: e, ...o } = i,
                      t = o.variant || "secondary";
                    return (0, r.jsx)(a.B, {
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
        id: s.id,
        className: s.className,
        children: [
          (0, r.jsx)(o.S.Header, { ...s }),
          c ? (0, r.jsx)(o.S.Body, { children: c }) : null,
          t || d || l
            ? (0, r.jsxs)(o.S.Footer, {
                children: [
                  t ? (0, r.jsx)(o.S.HelpText, { children: t }) : null,
                  d ? (0, r.jsx)(o.S.Actions, { children: d }) : null,
                  l ? (0, r.jsx)(o.S.Watermark, {}) : null,
                ],
              })
            : null,
          n ? (0, r.jsx)(o.S.FooterText, { children: n }) : null,
        ],
      });
    },
  ]);
};
