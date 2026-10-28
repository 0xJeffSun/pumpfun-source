// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var r = e.i(732486),
    o = e.i(995040),
    i = e.i(612269);
  e.s([
    "S",
    0,
    ({
      primaryCta: e,
      secondaryCta: a,
      helpText: n,
      footerText: t,
      watermark: l = !0,
      children: c,
      ...d
    }) => {
      let s =
        e || a
          ? (0, r.jsxs)(r.Fragment, {
              children: [
                e &&
                  (() => {
                    let { label: i, ...a } = e,
                      n = a.variant || "primary";
                    return (0, r.jsx)(o.B, {
                      ...a,
                      variant: n,
                      style: { width: "100%", ...a.style },
                      children: i,
                    });
                  })(),
                a &&
                  (() => {
                    let { label: e, ...i } = a,
                      n = i.variant || "secondary";
                    return (0, r.jsx)(o.B, {
                      ...i,
                      variant: n,
                      style: { width: "100%", ...i.style },
                      children: e,
                    });
                  })(),
              ],
            })
          : null;
      return (0, r.jsxs)(i.S, {
        id: d.id,
        className: d.className,
        children: [
          (0, r.jsx)(i.S.Header, { ...d }),
          c ? (0, r.jsx)(i.S.Body, { children: c }) : null,
          n || s || l
            ? (0, r.jsxs)(i.S.Footer, {
                children: [
                  n ? (0, r.jsx)(i.S.HelpText, { children: n }) : null,
                  s ? (0, r.jsx)(i.S.Actions, { children: s }) : null,
                  l ? (0, r.jsx)(i.S.Watermark, {}) : null,
                ],
              })
            : null,
          t ? (0, r.jsx)(i.S.FooterText, { children: t }) : null,
        ],
      });
    },
  ]);
};
