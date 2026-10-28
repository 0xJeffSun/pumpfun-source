// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(r) => {
  var e = r.i(732486),
    o = r.i(698870),
    i = r.i(352386),
    t = r.i(689391),
    n = r.i(933185),
    a = r.i(336291);
  let l = (r) =>
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
    s = (r, e, o, i, t) => {
      for (let n = e; n < e + i; n++)
        for (let e = o; e < o + t; e++) {
          let o = r?.[e];
          o && o[n] && (o[n] = 0);
        }
      return r;
    },
    c = ({ x: r, y: o, cellSize: i, bgColor: t, fgColor: n }) =>
      (0, e.jsx)(e.Fragment, {
        children: [0, 1, 2].map((a) =>
          (0, e.jsx)(
            "circle",
            {
              r: (i * (7 - 2 * a)) / 2,
              cx: r + (7 * i) / 2,
              cy: o + (7 * i) / 2,
              fill: a % 2 != 0 ? t : n,
            },
            `finder-${r}-${o}-${a}`,
          ),
        ),
      }),
    d = ({ cellSize: r, matrixSize: o, bgColor: i, fgColor: t }) =>
      (0, e.jsx)(e.Fragment, {
        children: [
          [0, 0],
          [(o - 7) * r, 0],
          [0, (o - 7) * r],
        ].map(([o, n]) =>
          (0, e.jsx)(
            c,
            { x: o, y: n, cellSize: r, bgColor: i, fgColor: t },
            `finder-${o}-${n}`,
          ),
        ),
      }),
    p = ({ matrix: r, cellSize: o, color: t }) =>
      (0, e.jsx)(e.Fragment, {
        children: r.map((r, n) =>
          r.map((r, a) =>
            r
              ? (0, e.jsx)(
                  "rect",
                  {
                    height: o - 0.4,
                    width: o - 0.4,
                    x: n * o + 0.1 * o,
                    y: a * o + 0.1 * o,
                    rx: 0.5 * o,
                    ry: 0.5 * o,
                    fill: t,
                  },
                  `cell-${n}-${a}`,
                )
              : (0, e.jsx)(i.default.Fragment, {}, `circle-${n}-${a}`),
          ),
        ),
      }),
    u = ({
      cellSize: r,
      matrixSize: o,
      element: i,
      sizePercentage: t,
      bgColor: n,
    }) => {
      if (!i) return (0, e.jsx)(e.Fragment, {});
      let a = o * (t || 0.14),
        l = Math.floor(o / 2 - a / 2),
        s = Math.floor(o / 2 + a / 2);
      (s - l) % 2 != o % 2 && (s += 1);
      let c = (s - l) * r,
        d = c - 0.2 * c,
        p = l * r;
      return (0, e.jsxs)(e.Fragment, {
        children: [
          (0, e.jsx)("rect", {
            x: l * r,
            y: l * r,
            width: c,
            height: c,
            fill: n,
          }),
          (0, e.jsx)(i, {
            x: p + 0.1 * c,
            y: p + 0.1 * c,
            height: d,
            width: d,
          }),
        ],
      });
    },
    h = (r) => {
      var i, t;
      let n,
        l,
        c = r.outputSize,
        h =
          ((i = r.url),
          (t = r.errorCorrectionLevel),
          (n = o.default.create(i, { errorCorrectionLevel: t }).modules),
          (l = s((l = (0, a.l)(Array.from(n.data), n.size)), 0, 0, 7, 7)),
          (l = s(l, l.length - 7, 0, 7, 7)),
          s(l, 0, l.length - 7, 7, 7)),
        v = c / h.length,
        g = (0, a.m)(2 * v, { min: 0.025 * c, max: 0.036 * c });
      return (0, e.jsxs)("svg", {
        height: r.outputSize,
        width: r.outputSize,
        viewBox: `0 0 ${r.outputSize} ${r.outputSize}`,
        style: { height: "100%", width: "100%", padding: `${g}px` },
        children: [
          (0, e.jsx)(p, { matrix: h, cellSize: v, color: r.fgColor }),
          (0, e.jsx)(d, {
            cellSize: v,
            matrixSize: h.length,
            fgColor: r.fgColor,
            bgColor: r.bgColor,
          }),
          (0, e.jsx)(u, {
            cellSize: v,
            element: r.logo?.element,
            bgColor: r.bgColor,
            matrixSize: h.length,
          }),
        ],
      });
    },
    v = t.z.div.attrs({ className: "ph-no-capture" })`
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
      let { appearance: o } = (0, n.a)(),
        i = r.bgColor || "#FFFFFF",
        t = r.fgColor || "#000000",
        a = r.size || 160,
        s = "dark" === o.palette.colorScheme ? i : t;
      return (0, e.jsx)(v, {
        $size: a,
        $bgColor: i,
        $fgColor: t,
        $borderColor: s,
        children: (0, e.jsx)(h, {
          url: r.url,
          logo: r.hideLogo ? void 0 : { element: r.squareLogoElement ?? l },
          outputSize: a,
          bgColor: i,
          fgColor: t,
          errorCorrectionLevel: r.errorCorrectionLevel || "Q",
        }),
      });
    },
  ]);
};
