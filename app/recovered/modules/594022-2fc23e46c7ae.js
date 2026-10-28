// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(r) => {
  var e = r.i(732486),
    o = r.i(698870),
    i = r.i(352386),
    a = r.i(689391),
    t = r.i(933185),
    l = r.i(336291);
  let n = (r) =>
      (0, e.jsx)("svg", {
        viewBox: "0 0 50 50",
        fill: "none",
        xmlns: "http://www.w3.org/2000/svg",
        ...r,
        children: (0, e.jsx)("rect", {
          width: "50",
          height: "50",
          fill: "black",
          rx: 10,
          ry: 10,
        }),
      }),
    c = (r, e, o, i, a) => {
      for (let t = e; t < e + i; t++)
        for (let e = o; e < o + a; e++) {
          let o = r?.[e];
          o && o[t] && (o[t] = 0);
        }
      return r;
    },
    s = ({ x: r, y: o, cellSize: i, bgColor: a, fgColor: t }) =>
      (0, e.jsx)(e.Fragment, {
        children: [0, 1, 2].map((l) =>
          (0, e.jsx)(
            "circle",
            {
              r: (i * (7 - 2 * l)) / 2,
              cx: r + (7 * i) / 2,
              cy: o + (7 * i) / 2,
              fill: l % 2 != 0 ? a : t,
            },
            `finder-${r}-${o}-${l}`,
          ),
        ),
      }),
    d = ({ cellSize: r, matrixSize: o, bgColor: i, fgColor: a }) =>
      (0, e.jsx)(e.Fragment, {
        children: [
          [0, 0],
          [(o - 7) * r, 0],
          [0, (o - 7) * r],
        ].map(([o, t]) =>
          (0, e.jsx)(
            s,
            { x: o, y: t, cellSize: r, bgColor: i, fgColor: a },
            `finder-${o}-${t}`,
          ),
        ),
      }),
    p = ({ matrix: r, cellSize: o, color: a }) =>
      (0, e.jsx)(e.Fragment, {
        children: r.map((r, t) =>
          r.map((r, l) =>
            r
              ? (0, e.jsx)(
                  "rect",
                  {
                    height: o - 0.4,
                    width: o - 0.4,
                    x: t * o + 0.1 * o,
                    y: l * o + 0.1 * o,
                    rx: 0.5 * o,
                    ry: 0.5 * o,
                    fill: a,
                  },
                  `cell-${t}-${l}`,
                )
              : (0, e.jsx)(i.default.Fragment, {}, `circle-${t}-${l}`),
          ),
        ),
      }),
    v = ({
      cellSize: r,
      matrixSize: o,
      element: i,
      sizePercentage: a,
      bgColor: t,
    }) => {
      if (!i) return (0, e.jsx)(e.Fragment, {});
      let l = o * (a || 0.14),
        n = Math.floor(o / 2 - l / 2),
        c = Math.floor(o / 2 + l / 2);
      (c - n) % 2 != o % 2 && (c += 1);
      let s = (c - n) * r,
        d = s - 0.2 * s,
        p = n * r;
      return (0, e.jsxs)(e.Fragment, {
        children: [
          (0, e.jsx)("rect", {
            x: n * r,
            y: n * r,
            width: s,
            height: s,
            fill: t,
          }),
          (0, e.jsx)(i, {
            x: p + 0.1 * s,
            y: p + 0.1 * s,
            height: d,
            width: d,
          }),
        ],
      });
    },
    u = (r) => {
      var i, a;
      let t,
        n,
        s = r.outputSize,
        u =
          ((i = r.url),
          (a = r.errorCorrectionLevel),
          (t = o.default.create(i, { errorCorrectionLevel: a }).modules),
          (n = c((n = (0, l.l)(Array.from(t.data), t.size)), 0, 0, 7, 7)),
          (n = c(n, n.length - 7, 0, 7, 7)),
          c(n, 0, n.length - 7, 7, 7)),
        h = s / u.length,
        g = (0, l.m)(2 * h, { min: 0.025 * s, max: 0.036 * s });
      return (0, e.jsxs)("svg", {
        height: r.outputSize,
        width: r.outputSize,
        viewBox: `0 0 ${r.outputSize} ${r.outputSize}`,
        style: { height: "100%", width: "100%", padding: `${g}px` },
        children: [
          (0, e.jsx)(p, { matrix: u, cellSize: h, color: r.fgColor }),
          (0, e.jsx)(d, {
            cellSize: h,
            matrixSize: u.length,
            fgColor: r.fgColor,
            bgColor: r.bgColor,
          }),
          (0, e.jsx)(v, {
            cellSize: h,
            element: r.logo?.element,
            bgColor: r.bgColor,
            matrixSize: u.length,
          }),
        ],
      });
    },
    h = a.z.div.attrs({ className: "ph-no-capture" })`
  display: flex;
  justify-content: center;
  align-items: center;
  height: ${(r) => `${r.$size}px`};
  width: ${(r) => `${r.$size}px`};
  margin: auto;
  background-color: ${(r) => r.$bgColor};

  && {
    border-width: 2px;
    border-color: ${(r) => r.$borderColor};
    border-radius: var(--privy-border-radius-md);
  }
`;
  r.s([
    "Q",
    0,
    (r) => {
      let { appearance: o } = (0, t.a)(),
        i = r.bgColor || "#FFFFFF",
        a = r.fgColor || "#000000",
        l = r.size || 160,
        c = "dark" === o.palette.colorScheme ? i : a;
      return (0, e.jsx)(h, {
        $size: l,
        $bgColor: i,
        $fgColor: a,
        $borderColor: c,
        children: (0, e.jsx)(u, {
          url: r.url,
          logo: r.hideLogo ? void 0 : { element: r.squareLogoElement ?? n },
          outputSize: l,
          bgColor: i,
          fgColor: a,
          errorCorrectionLevel: r.errorCorrectionLevel || "Q",
        }),
      });
    },
  ]);
};
