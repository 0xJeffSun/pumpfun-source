// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(732486),
    r = e.i(698870),
    i = e.i(352386),
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
    s = (e, t, r, i, n) => {
      for (let o = t; o < t + i; o++)
        for (let t = r; t < r + n; t++) {
          let r = e?.[t];
          r && r[o] && (r[o] = 0);
        }
      return e;
    },
    c = ({ x: e, y: r, cellSize: i, bgColor: n, fgColor: o }) =>
      (0, t.jsx)(t.Fragment, {
        children: [0, 1, 2].map((a) =>
          (0, t.jsx)(
            "circle",
            {
              r: (i * (7 - 2 * a)) / 2,
              cx: e + (7 * i) / 2,
              cy: r + (7 * i) / 2,
              fill: a % 2 != 0 ? n : o,
            },
            `finder-${e}-${r}-${a}`,
          ),
        ),
      }),
    d = ({ cellSize: e, matrixSize: r, bgColor: i, fgColor: n }) =>
      (0, t.jsx)(t.Fragment, {
        children: [
          [0, 0],
          [(r - 7) * e, 0],
          [0, (r - 7) * e],
        ].map(([r, o]) =>
          (0, t.jsx)(
            c,
            { x: r, y: o, cellSize: e, bgColor: i, fgColor: n },
            `finder-${r}-${o}`,
          ),
        ),
      }),
    h = ({ matrix: e, cellSize: r, color: n }) =>
      (0, t.jsx)(t.Fragment, {
        children: e.map((e, o) =>
          e.map((e, a) =>
            e
              ? (0, t.jsx)(
                  "rect",
                  {
                    height: r - 0.4,
                    width: r - 0.4,
                    x: o * r + 0.1 * r,
                    y: a * r + 0.1 * r,
                    rx: 0.5 * r,
                    ry: 0.5 * r,
                    fill: n,
                  },
                  `cell-${o}-${a}`,
                )
              : (0, t.jsx)(i.default.Fragment, {}, `circle-${o}-${a}`),
          ),
        ),
      }),
    p = ({
      cellSize: e,
      matrixSize: r,
      element: i,
      sizePercentage: n,
      bgColor: o,
    }) => {
      if (!i) return (0, t.jsx)(t.Fragment, {});
      let a = r * (n || 0.14),
        l = Math.floor(r / 2 - a / 2),
        s = Math.floor(r / 2 + a / 2);
      (s - l) % 2 != r % 2 && (s += 1);
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
          (0, t.jsx)(i, {
            x: h + 0.1 * c,
            y: h + 0.1 * c,
            height: d,
            width: d,
          }),
        ],
      });
    },
    u = (e) => {
      var i, n;
      let o,
        l,
        c = e.outputSize,
        u =
          ((i = e.url),
          (n = e.errorCorrectionLevel),
          (o = r.default.create(i, { errorCorrectionLevel: n }).modules),
          (l = s((l = (0, a.l)(Array.from(o.data), o.size)), 0, 0, 7, 7)),
          (l = s(l, l.length - 7, 0, 7, 7)),
          s(l, 0, l.length - 7, 7, 7)),
        x = c / u.length,
        g = (0, a.m)(2 * x, { min: 0.025 * c, max: 0.036 * c });
      return (0, t.jsxs)("svg", {
        height: e.outputSize,
        width: e.outputSize,
        viewBox: `0 0 ${e.outputSize} ${e.outputSize}`,
        style: { height: "100%", width: "100%", padding: `${g}px` },
        children: [
          (0, t.jsx)(h, { matrix: u, cellSize: x, color: e.fgColor }),
          (0, t.jsx)(d, {
            cellSize: x,
            matrixSize: u.length,
            fgColor: e.fgColor,
            bgColor: e.bgColor,
          }),
          (0, t.jsx)(p, {
            cellSize: x,
            element: e.logo?.element,
            bgColor: e.bgColor,
            matrixSize: u.length,
          }),
        ],
      });
    },
    x = n.z.div.attrs({ className: "ph-no-capture" })`
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
      let { appearance: r } = (0, o.a)(),
        i = e.bgColor || "#FFFFFF",
        n = e.fgColor || "#000000",
        a = e.size || 160,
        s = "dark" === r.palette.colorScheme ? i : n;
      return (0, t.jsx)(x, {
        $size: a,
        $bgColor: i,
        $fgColor: n,
        $borderColor: s,
        children: (0, t.jsx)(u, {
          url: e.url,
          logo: e.hideLogo ? void 0 : { element: e.squareLogoElement ?? l },
          outputSize: a,
          bgColor: i,
          fgColor: n,
          errorCorrectionLevel: e.errorCorrectionLevel || "Q",
        }),
      });
    },
  ]);
};
