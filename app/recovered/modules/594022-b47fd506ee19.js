// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var r = e.i(732486),
    t = e.i(698870),
    i = e.i(352386),
    o = e.i(689391),
    n = e.i(933185),
    a = e.i(336291);
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
    s = (e, r, t, i, o) => {
      for (let n = r; n < r + i; n++)
        for (let r = t; r < t + o; r++) {
          let t = e?.[r];
          t && t[n] && (t[n] = 0);
        }
      return e;
    },
    c = ({ x: e, y: t, cellSize: i, bgColor: o, fgColor: n }) =>
      (0, r.jsx)(r.Fragment, {
        children: [0, 1, 2].map((a) =>
          (0, r.jsx)(
            "circle",
            {
              r: (i * (7 - 2 * a)) / 2,
              cx: e + (7 * i) / 2,
              cy: t + (7 * i) / 2,
              fill: a % 2 != 0 ? o : n,
            },
            `finder-${e}-${t}-${a}`,
          ),
        ),
      }),
    d = ({ cellSize: e, matrixSize: t, bgColor: i, fgColor: o }) =>
      (0, r.jsx)(r.Fragment, {
        children: [
          [0, 0],
          [(t - 7) * e, 0],
          [0, (t - 7) * e],
        ].map(([t, n]) =>
          (0, r.jsx)(
            c,
            { x: t, y: n, cellSize: e, bgColor: i, fgColor: o },
            `finder-${t}-${n}`,
          ),
        ),
      }),
    h = ({ matrix: e, cellSize: t, color: o }) =>
      (0, r.jsx)(r.Fragment, {
        children: e.map((e, n) =>
          e.map((e, a) =>
            e
              ? (0, r.jsx)(
                  "rect",
                  {
                    height: t - 0.4,
                    width: t - 0.4,
                    x: n * t + 0.1 * t,
                    y: a * t + 0.1 * t,
                    rx: 0.5 * t,
                    ry: 0.5 * t,
                    fill: o,
                  },
                  `cell-${n}-${a}`,
                )
              : (0, r.jsx)(i.default.Fragment, {}, `circle-${n}-${a}`),
          ),
        ),
      }),
    p = ({
      cellSize: e,
      matrixSize: t,
      element: i,
      sizePercentage: o,
      bgColor: n,
    }) => {
      if (!i) return (0, r.jsx)(r.Fragment, {});
      let a = t * (o || 0.14),
        l = Math.floor(t / 2 - a / 2),
        s = Math.floor(t / 2 + a / 2);
      (s - l) % 2 != t % 2 && (s += 1);
      let c = (s - l) * e,
        d = c - 0.2 * c,
        h = l * e;
      return (0, r.jsxs)(r.Fragment, {
        children: [
          (0, r.jsx)("rect", {
            x: l * e,
            y: l * e,
            width: c,
            height: c,
            fill: n,
          }),
          (0, r.jsx)(i, {
            x: h + 0.1 * c,
            y: h + 0.1 * c,
            height: d,
            width: d,
          }),
        ],
      });
    },
    u = (e) => {
      var i, o;
      let n,
        l,
        c = e.outputSize,
        u =
          ((i = e.url),
          (o = e.errorCorrectionLevel),
          (n = t.default.create(i, { errorCorrectionLevel: o }).modules),
          (l = s((l = (0, a.l)(Array.from(n.data), n.size)), 0, 0, 7, 7)),
          (l = s(l, l.length - 7, 0, 7, 7)),
          s(l, 0, l.length - 7, 7, 7)),
        g = c / u.length,
        x = (0, a.m)(2 * g, { min: 0.025 * c, max: 0.036 * c });
      return (0, r.jsxs)("svg", {
        height: e.outputSize,
        width: e.outputSize,
        viewBox: `0 0 ${e.outputSize} ${e.outputSize}`,
        style: { height: "100%", width: "100%", padding: `${x}px` },
        children: [
          (0, r.jsx)(h, { matrix: u, cellSize: g, color: e.fgColor }),
          (0, r.jsx)(d, {
            cellSize: g,
            matrixSize: u.length,
            fgColor: e.fgColor,
            bgColor: e.bgColor,
          }),
          (0, r.jsx)(p, {
            cellSize: g,
            element: e.logo?.element,
            bgColor: e.bgColor,
            matrixSize: u.length,
          }),
        ],
      });
    },
    g = o.z.div.attrs({ className: "ph-no-capture" })`
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
      let { appearance: t } = (0, n.a)(),
        i = e.bgColor || "#FFFFFF",
        o = e.fgColor || "#000000",
        a = e.size || 160,
        s = "dark" === t.palette.colorScheme ? i : o;
      return (0, r.jsx)(g, {
        $size: a,
        $bgColor: i,
        $fgColor: o,
        $borderColor: s,
        children: (0, r.jsx)(u, {
          url: e.url,
          logo: e.hideLogo ? void 0 : { element: e.squareLogoElement ?? l },
          outputSize: a,
          bgColor: i,
          fgColor: o,
          errorCorrectionLevel: e.errorCorrectionLevel || "Q",
        }),
      });
    },
  ]);
};
