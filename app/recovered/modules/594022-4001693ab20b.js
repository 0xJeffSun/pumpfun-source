// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(732486),
    i = e.i(698870),
    r = e.i(352386),
    n = e.i(689391),
    o = e.i(933185),
    a = e.i(336291);
  let l = (e) =>
      (0, t.jsx)("svg", {
        viewBox: "0 0 50 50",
        fill: "none",
        xmlns: "http://www.w3.org/2000/svg",
        ...e,
        children: (0, t.jsx)("rect", {
          width: "50",
          height: "50",
          fill: "black",
          rx: 10,
          ry: 10,
        }),
      }),
    s = (e, t, i, r, n) => {
      for (let o = t; o < t + r; o++)
        for (let t = i; t < i + n; t++) {
          let i = e?.[t];
          i && i[o] && (i[o] = 0);
        }
      return e;
    },
    c = ({ x: e, y: i, cellSize: r, bgColor: n, fgColor: o }) =>
      (0, t.jsx)(t.Fragment, {
        children: [0, 1, 2].map((a) =>
          (0, t.jsx)(
            "circle",
            {
              r: (r * (7 - 2 * a)) / 2,
              cx: e + (7 * r) / 2,
              cy: i + (7 * r) / 2,
              fill: a % 2 != 0 ? n : o,
            },
            `finder-${e}-${i}-${a}`,
          ),
        ),
      }),
    d = ({ cellSize: e, matrixSize: i, bgColor: r, fgColor: n }) =>
      (0, t.jsx)(t.Fragment, {
        children: [
          [0, 0],
          [(i - 7) * e, 0],
          [0, (i - 7) * e],
        ].map(([i, o]) =>
          (0, t.jsx)(
            c,
            { x: i, y: o, cellSize: e, bgColor: r, fgColor: n },
            `finder-${i}-${o}`,
          ),
        ),
      }),
    h = ({ matrix: e, cellSize: i, color: n }) =>
      (0, t.jsx)(t.Fragment, {
        children: e.map((e, o) =>
          e.map((e, a) =>
            e
              ? (0, t.jsx)(
                  "rect",
                  {
                    height: i - 0.4,
                    width: i - 0.4,
                    x: o * i + 0.1 * i,
                    y: a * i + 0.1 * i,
                    rx: 0.5 * i,
                    ry: 0.5 * i,
                    fill: n,
                  },
                  `cell-${o}-${a}`,
                )
              : (0, t.jsx)(r.default.Fragment, {}, `circle-${o}-${a}`),
          ),
        ),
      }),
    u = ({
      cellSize: e,
      matrixSize: i,
      element: r,
      sizePercentage: n,
      bgColor: o,
    }) => {
      if (!r) return (0, t.jsx)(t.Fragment, {});
      let a = i * (n || 0.14),
        l = Math.floor(i / 2 - a / 2),
        s = Math.floor(i / 2 + a / 2);
      (s - l) % 2 != i % 2 && (s += 1);
      let c = (s - l) * e,
        d = c - 0.2 * c,
        h = l * e;
      return (0, t.jsxs)(t.Fragment, {
        children: [
          (0, t.jsx)("rect", {
            x: l * e,
            y: l * e,
            width: c,
            height: c,
            fill: o,
          }),
          (0, t.jsx)(r, {
            x: h + 0.1 * c,
            y: h + 0.1 * c,
            height: d,
            width: d,
          }),
        ],
      });
    },
    p = (e) => {
      var r, n;
      let o,
        l,
        c = e.outputSize,
        p =
          ((r = e.url),
          (n = e.errorCorrectionLevel),
          (o = i.default.create(r, { errorCorrectionLevel: n }).modules),
          (l = s((l = (0, a.l)(Array.from(o.data), o.size)), 0, 0, 7, 7)),
          (l = s(l, l.length - 7, 0, 7, 7)),
          s(l, 0, l.length - 7, 7, 7)),
        g = c / p.length,
        m = (0, a.m)(2 * g, { min: 0.025 * c, max: 0.036 * c });
      return (0, t.jsxs)("svg", {
        height: e.outputSize,
        width: e.outputSize,
        viewBox: `0 0 ${e.outputSize} ${e.outputSize}`,
        style: { height: "100%", width: "100%", padding: `${m}px` },
        children: [
          (0, t.jsx)(h, { matrix: p, cellSize: g, color: e.fgColor }),
          (0, t.jsx)(d, {
            cellSize: g,
            matrixSize: p.length,
            fgColor: e.fgColor,
            bgColor: e.bgColor,
          }),
          (0, t.jsx)(u, {
            cellSize: g,
            element: e.logo?.element,
            bgColor: e.bgColor,
            matrixSize: p.length,
          }),
        ],
      });
    },
    g = n.z.div.attrs({ className: "ph-no-capture" })`
  display: flex;
  justify-content: center;
  align-items: center;
  height: ${(e) => `${e.$size}px`};
  width: ${(e) => `${e.$size}px`};
  margin: auto;
  background-color: ${(e) => e.$bgColor};

  && {
    border-width: 2px;
    border-color: ${(e) => e.$borderColor};
    border-radius: var(--privy-border-radius-md);
  }
`;
  e.s([
    "Q",
    0,
    (e) => {
      let { appearance: i } = (0, o.a)(),
        r = e.bgColor || "#FFFFFF",
        n = e.fgColor || "#000000",
        a = e.size || 160,
        s = "dark" === i.palette.colorScheme ? r : n;
      return (0, t.jsx)(g, {
        $size: a,
        $bgColor: r,
        $fgColor: n,
        $borderColor: s,
        children: (0, t.jsx)(p, {
          url: e.url,
          logo: e.hideLogo ? void 0 : { element: e.squareLogoElement ?? l },
          outputSize: a,
          bgColor: r,
          fgColor: n,
          errorCorrectionLevel: e.errorCorrectionLevel || "Q",
        }),
      });
    },
  ]);
};
