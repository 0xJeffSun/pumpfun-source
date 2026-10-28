// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(732486),
    i = e.i(698870),
    n = e.i(352386),
    a = e.i(689391),
    r = e.i(933185),
    l = e.i(336291);
  let o = (e) =>
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
    s = (e, t, i, n, a) => {
      for (let r = t; r < t + n; r++)
        for (let t = i; t < i + a; t++) {
          let i = e?.[t];
          i && i[r] && (i[r] = 0);
        }
      return e;
    },
    c = ({ x: e, y: i, cellSize: n, bgColor: a, fgColor: r }) =>
      (0, t.jsx)(t.Fragment, {
        children: [0, 1, 2].map((l) =>
          (0, t.jsx)(
            "circle",
            {
              r: (n * (7 - 2 * l)) / 2,
              cx: e + (7 * n) / 2,
              cy: i + (7 * n) / 2,
              fill: l % 2 != 0 ? a : r,
            },
            `finder-${e}-${i}-${l}`,
          ),
        ),
      }),
    d = ({ cellSize: e, matrixSize: i, bgColor: n, fgColor: a }) =>
      (0, t.jsx)(t.Fragment, {
        children: [
          [0, 0],
          [(i - 7) * e, 0],
          [0, (i - 7) * e],
        ].map(([i, r]) =>
          (0, t.jsx)(
            c,
            { x: i, y: r, cellSize: e, bgColor: n, fgColor: a },
            `finder-${i}-${r}`,
          ),
        ),
      }),
    u = ({ matrix: e, cellSize: i, color: a }) =>
      (0, t.jsx)(t.Fragment, {
        children: e.map((e, r) =>
          e.map((e, l) =>
            e
              ? (0, t.jsx)(
                  "rect",
                  {
                    height: i - 0.4,
                    width: i - 0.4,
                    x: r * i + 0.1 * i,
                    y: l * i + 0.1 * i,
                    rx: 0.5 * i,
                    ry: 0.5 * i,
                    fill: a,
                  },
                  `cell-${r}-${l}`,
                )
              : (0, t.jsx)(n.default.Fragment, {}, `circle-${r}-${l}`),
          ),
        ),
      }),
    p = ({
      cellSize: e,
      matrixSize: i,
      element: n,
      sizePercentage: a,
      bgColor: r,
    }) => {
      if (!n) return (0, t.jsx)(t.Fragment, {});
      let l = i * (a || 0.14),
        o = Math.floor(i / 2 - l / 2),
        s = Math.floor(i / 2 + l / 2);
      (s - o) % 2 != i % 2 && (s += 1);
      let c = (s - o) * e,
        d = c - 0.2 * c,
        u = o * e;
      return (0, t.jsxs)(t.Fragment, {
        children: [
          (0, t.jsx)("rect", {
            x: o * e,
            y: o * e,
            width: c,
            height: c,
            fill: r,
          }),
          (0, t.jsx)(n, {
            x: u + 0.1 * c,
            y: u + 0.1 * c,
            height: d,
            width: d,
          }),
        ],
      });
    },
    h = (e) => {
      var n, a;
      let r,
        o,
        c = e.outputSize,
        h =
          ((n = e.url),
          (a = e.errorCorrectionLevel),
          (r = i.default.create(n, { errorCorrectionLevel: a }).modules),
          (o = s((o = (0, l.l)(Array.from(r.data), r.size)), 0, 0, 7, 7)),
          (o = s(o, o.length - 7, 0, 7, 7)),
          s(o, 0, o.length - 7, 7, 7)),
        g = c / h.length,
        m = (0, l.m)(2 * g, { min: 0.025 * c, max: 0.036 * c });
      return (0, t.jsxs)("svg", {
        height: e.outputSize,
        width: e.outputSize,
        viewBox: `0 0 ${e.outputSize} ${e.outputSize}`,
        style: { height: "100%", width: "100%", padding: `${m}px` },
        children: [
          (0, t.jsx)(u, { matrix: h, cellSize: g, color: e.fgColor }),
          (0, t.jsx)(d, {
            cellSize: g,
            matrixSize: h.length,
            fgColor: e.fgColor,
            bgColor: e.bgColor,
          }),
          (0, t.jsx)(p, {
            cellSize: g,
            element: e.logo?.element,
            bgColor: e.bgColor,
            matrixSize: h.length,
          }),
        ],
      });
    },
    g = a.z.div.attrs({ className: "ph-no-capture" })`
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
      let { appearance: i } = (0, r.a)(),
        n = e.bgColor || "#FFFFFF",
        a = e.fgColor || "#000000",
        l = e.size || 160,
        s = "dark" === i.palette.colorScheme ? n : a;
      return (0, t.jsx)(g, {
        $size: l,
        $bgColor: n,
        $fgColor: a,
        $borderColor: s,
        children: (0, t.jsx)(h, {
          url: e.url,
          logo: e.hideLogo ? void 0 : { element: e.squareLogoElement ?? o },
          outputSize: l,
          bgColor: n,
          fgColor: a,
          errorCorrectionLevel: e.errorCorrectionLevel || "Q",
        }),
      });
    },
  ]);
};
