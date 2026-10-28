// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(732486),
    n = e.i(445242),
    i = e.i(439587),
    r = e.i(352386);
  e.i(12692);
  var l = e.i(398902),
    a = e.i(786147),
    s = e.i(167958),
    o = e.i(196796),
    c = e.i(547562);
  function d(e) {
    return e.stopPropagation();
  }
  e.s([
    "f",
    0,
    function (e) {
      let u,
        x,
        m,
        p,
        f,
        h = (0, n.c)(20),
        { definition: g, label: b } = e,
        { t: j } = (0, l.f)(),
        v = g.id,
        y = (0, c.o)(v),
        _ = (0, c.Z)(v),
        w = (0, o.f)(),
        [N, C] = (0, r.useState)(null),
        k = "switch" === g.control.kind ? g.control.confirm : void 0,
        S = !0 === g.firstPaintSensitive && !w;
      h[0] !== k || h[1] !== _
        ? ((u = (e) => {
            k && e === k.when ? C(e) : _(e);
          }),
          (h[0] = k),
          (h[1] = _),
          (h[2] = u))
        : (u = h[2]);
      let T = u;
      h[3] !== N || h[4] !== _
        ? ((x = (e) => {
            (e && null !== N && _(N), C(null));
          }),
          (h[3] = N),
          (h[4] = _),
          (h[5] = x))
        : (x = h[5]);
      let A = x,
        P = !0 === y;
      return (
        h[6] !== S || h[7] !== b || h[8] !== T || h[9] !== P
          ? ((m = (0, t.jsx)("span", {
              className: "flex",
              onPointerDown: d,
              children: (0, t.jsx)(i.Z, {
                "aria-label": b,
                isChecked: P,
                isDisabled: S,
                onCheckedChange: T,
              }),
            })),
            (h[6] = S),
            (h[7] = b),
            (h[8] = T),
            (h[9] = P),
            (h[10] = m))
          : (m = h[10]),
        h[11] !== k ||
        h[12] !== g.id ||
        h[13] !== N ||
        h[14] !== A ||
        h[15] !== j
          ? ((p =
              k && null !== N
                ? (0, t.jsxs)(s.N, {
                    open: !0,
                    onOpenChange: (e) => {
                      e || A(!1);
                    },
                    density: "terminal",
                    size: "sm",
                    title: (0, a.f)(j, k.titleKey),
                    "data-testid": `setting-confirm-${g.id}`,
                    children: [
                      (0, t.jsx)(s.K, {
                        children: (0, t.jsx)("p", {
                          className:
                            "text-[12px] leading-4 text-text-secondary",
                          children: (0, a.f)(j, k.descriptionKey),
                        }),
                      }),
                      (0, t.jsxs)(s.c, {
                        className: "flex-col items-stretch",
                        children: [
                          (0, t.jsx)(i.K, {
                            variant: "primary",
                            className:
                              "bg-loss text-bg-primary hover:bg-loss/90",
                            size: s.$,
                            isFullWidth: !0,
                            onClick: () => A(!0),
                            children: (0, a.f)(j, k.confirmLabelKey),
                          }),
                          (0, t.jsx)(i.K, {
                            variant: "secondary",
                            size: s.Z,
                            isFullWidth: !0,
                            onClick: () => A(!1),
                            children: j("common.cancel"),
                          }),
                        ],
                      }),
                    ],
                  })
                : null),
            (h[11] = k),
            (h[12] = g.id),
            (h[13] = N),
            (h[14] = A),
            (h[15] = j),
            (h[16] = p))
          : (p = h[16]),
        h[17] !== m || h[18] !== p
          ? ((f = (0, t.jsxs)(t.Fragment, { children: [m, p] })),
            (h[17] = m),
            (h[18] = p),
            (h[19] = f))
          : (f = h[19]),
        f
      );
    },
  ]);
};
