// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var r = e.i(732486),
    i = e.i(698870),
    o = e.i(352386),
    t = e.i(689391),
    a = e.i(933185),
    n = e.i(336291);
  let l = (e) =>
      (0, r.jsx)("svg", {
        viewBox: "0 0 50 50",
        fill: "none",
        xmlns: "http://www.w3.org/2000/svg",
        ...e,
        children: (0, r.jsx)("rect", {
          width: "50",
          height: "50",
          fill: "black",
          rx: 10,
          ry: 10,
        }),
      }),
    c = (e, r, i, o, t) => {
      for (let a = r; a < r + o; a++)
        for (let r = i; r < i + t; r++) {
          let i = e?.[r];
          i && i[a] && (i[a] = 0);
        }
      return e;
    },
    s = ({ x: e, y: i, cellSize: o, bgColor: t, fgColor: a }) =>
      (0, r.jsx)(r.Fragment, {
        children: [0, 1, 2].map((n) =>
          (0, r.jsx)(
            "circle",
            {
              r: (o * (7 - 2 * n)) / 2,
              cx: e + (7 * o) / 2,
              cy: i + (7 * o) / 2,
              fill: n % 2 != 0 ? t : a,
            },
            `finder-${e}-${i}-${n}`,
          ),
        ),
      }),
    d = ({ cellSize: e, matrixSize: i, bgColor: o, fgColor: t }) =>
      (0, r.jsx)(r.Fragment, {
        children: [
          [0, 0],
          [(i - 7) * e, 0],
          [0, (i - 7) * e],
        ].map(([i, a]) =>
          (0, r.jsx)(
            s,
            { x: i, y: a, cellSize: e, bgColor: o, fgColor: t },
            `finder-${i}-${a}`,
          ),
        ),
      }),
    p = ({ matrix: e, cellSize: i, color: t }) =>
      (0, r.jsx)(r.Fragment, {
        children: e.map((e, a) =>
          e.map((e, n) =>
            e
              ? (0, r.jsx)(
                  "rect",
                  {
                    height: i - 0.4,
                    width: i - 0.4,
                    x: a * i + 0.1 * i,
                    y: n * i + 0.1 * i,
                    rx: 0.5 * i,
                    ry: 0.5 * i,
                    fill: t,
                  },
                  `cell-${a}-${n}`,
                )
              : (0, r.jsx)(o.default.Fragment, {}, `circle-${a}-${n}`),
          ),
        ),
      }),
    u = ({
      cellSize: e,
      matrixSize: i,
      element: o,
      sizePercentage: t,
      bgColor: a,
    }) => {
      if (!o) return (0, r.jsx)(r.Fragment, {});
      let n = i * (t || 0.14),
        l = Math.floor(i / 2 - n / 2),
        c = Math.floor(i / 2 + n / 2);
      (c - l) % 2 != i % 2 && (c += 1);
      let s = (c - l) * e,
        d = s - 0.2 * s,
        p = l * e;
      return (0, r.jsxs)(r.Fragment, {
        children: [
          (0, r.jsx)("rect", {
            x: l * e,
            y: l * e,
            width: s,
            height: s,
            fill: a,
          }),
          (0, r.jsx)(o, {
            x: p + 0.1 * s,
            y: p + 0.1 * s,
            height: d,
            width: d,
          }),
        ],
      });
    },
    h = (e) => {
      var o, t;
      let a,
        l,
        s = e.outputSize,
        h =
          ((o = e.url),
          (t = e.errorCorrectionLevel),
          (a = i.default.create(o, { errorCorrectionLevel: t }).modules),
          (l = c((l = (0, n.l)(Array.from(a.data), a.size)), 0, 0, 7, 7)),
          (l = c(l, l.length - 7, 0, 7, 7)),
          c(l, 0, l.length - 7, 7, 7)),
        g = s / h.length,
        v = (0, n.m)(2 * g, { min: 0.025 * s, max: 0.036 * s });
      return (0, r.jsxs)("svg", {
        height: e.outputSize,
        width: e.outputSize,
        viewBox: `0 0 ${e.outputSize} ${e.outputSize}`,
        style: { height: "100%", width: "100%", padding: `${v}px` },
        children: [
          (0, r.jsx)(p, { matrix: h, cellSize: g, color: e.fgColor }),
          (0, r.jsx)(d, {
            cellSize: g,
            matrixSize: h.length,
            fgColor: e.fgColor,
            bgColor: e.bgColor,
          }),
          (0, r.jsx)(u, {
            cellSize: g,
            element: e.logo?.element,
            bgColor: e.bgColor,
            matrixSize: h.length,
          }),
        ],
      });
    },
    g = t.z.div.attrs({ className: "ph-no-capture" })`
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
      let { appearance: i } = (0, a.a)(),
        o = e.bgColor || "#FFFFFF",
        t = e.fgColor || "#000000",
        n = e.size || 160,
        c = "dark" === i.palette.colorScheme ? o : t;
      return (0, r.jsx)(g, {
        $size: n,
        $bgColor: o,
        $fgColor: t,
        $borderColor: c,
        children: (0, r.jsx)(h, {
          url: e.url,
          logo: e.hideLogo ? void 0 : { element: e.squareLogoElement ?? l },
          outputSize: n,
          bgColor: o,
          fgColor: t,
          errorCorrectionLevel: e.errorCorrectionLevel || "Q",
        }),
      });
    },
  ]);
};
