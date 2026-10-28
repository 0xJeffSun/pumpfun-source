// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var r = e.i(732486),
    o = e.i(995040),
    t = e.i(612269);
  e.s([
    "S",
    0,
    ({
      primaryCta: e,
      secondaryCta: i,
      helpText: a,
      footerText: n,
      watermark: l = !0,
      children: s,
      ...c
    }) => {
      let d =
        e || i
          ? (0, r.jsxs)(r.Fragment, {
              children: [
                e &&
                  (() => {
                    let { label: t, ...i } = e,
                      a = i.variant || "primary";
                    return (0, r.jsx)(o.B, {
                      ...i,
                      variant: a,
                      style: { width: "100%", ...i.style },
                      children: t,
                    });
                  })(),
                i &&
                  (() => {
                    let { label: e, ...t } = i,
                      a = t.variant || "secondary";
                    return (0, r.jsx)(o.B, {
                      ...t,
                      variant: a,
                      style: { width: "100%", ...t.style },
                      children: e,
                    });
                  })(),
              ],
            })
          : null;
      return (0, r.jsxs)(t.S, {
        id: c.id,
        className: c.className,
        children: [
          (0, r.jsx)(t.S.Header, { ...c }),
          s ? (0, r.jsx)(t.S.Body, { children: s }) : null,
          a || d || l
            ? (0, r.jsxs)(t.S.Footer, {
                children: [
                  a ? (0, r.jsx)(t.S.HelpText, { children: a }) : null,
                  d ? (0, r.jsx)(t.S.Actions, { children: d }) : null,
                  l ? (0, r.jsx)(t.S.Watermark, {}) : null,
                ],
              })
            : null,
          n ? (0, r.jsx)(t.S.FooterText, { children: n }) : null,
        ],
      });
    },
  ]);
};
