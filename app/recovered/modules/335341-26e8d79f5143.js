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
      helpText: l,
      footerText: t,
      watermark: n = !0,
      children: c,
      ...d
    }) => {
      let s =
        r || i
          ? (0, e.jsxs)(e.Fragment, {
              children: [
                r &&
                  (() => {
                    let { label: a, ...i } = r,
                      l = i.variant || "primary";
                    return (0, e.jsx)(o.B, {
                      ...i,
                      variant: l,
                      style: { width: "100%", ...i.style },
                      children: a,
                    });
                  })(),
                i &&
                  (() => {
                    let { label: r, ...a } = i,
                      l = a.variant || "secondary";
                    return (0, e.jsx)(o.B, {
                      ...a,
                      variant: l,
                      style: { width: "100%", ...a.style },
                      children: r,
                    });
                  })(),
              ],
            })
          : null;
      return (0, e.jsxs)(a.S, {
        id: d.id,
        className: d.className,
        children: [
          (0, e.jsx)(a.S.Header, { ...d }),
          c ? (0, e.jsx)(a.S.Body, { children: c }) : null,
          l || s || n
            ? (0, e.jsxs)(a.S.Footer, {
                children: [
                  l ? (0, e.jsx)(a.S.HelpText, { children: l }) : null,
                  s ? (0, e.jsx)(a.S.Actions, { children: s }) : null,
                  n ? (0, e.jsx)(a.S.Watermark, {}) : null,
                ],
              })
            : null,
          t ? (0, e.jsx)(a.S.FooterText, { children: t }) : null,
        ],
      });
    },
  ]);
};
