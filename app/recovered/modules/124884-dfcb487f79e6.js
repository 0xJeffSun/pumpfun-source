// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  "use strict";
  var t = e.i(732486),
    i = e.i(445242),
    r = e.i(745018),
    s = e.i(439587),
    n = e.i(352386);
  e.i(12692);
  var l = e.i(398902),
    a = e.i(165228),
    o = e.i(426091);
  let c = (e) => {
      let r,
        s,
        n = (0, i.c)(3),
        { children: l } = e;
      return (
        n[0] === Symbol.for("react.memo_cache_sentinel")
          ? ((r = (0, t.jsx)("rect", {
              className: "text-bg-primary",
              fill: "currentColor",
              x: "0",
              y: "0",
              width: "120",
              height: "64",
              rx: "6",
            })),
            (n[0] = r))
          : (r = n[0]),
        n[1] !== l
          ? ((s = (0, t.jsxs)("g", { children: [r, l] })),
            (n[1] = l),
            (n[2] = s))
          : (s = n[2]),
        s
      );
    },
    d = (e) => {
      let r,
        s,
        n,
        l,
        a,
        o,
        c = (0, i.c)(9),
        { x: d, y: x, up: u } = e,
        m = `translate(${d} ${x})`;
      c[0] === Symbol.for("react.memo_cache_sentinel")
        ? ((r = (0, t.jsx)("rect", {
            className: "text-bg-tertiary",
            fill: "currentColor",
            width: "34",
            height: "26",
            rx: "3",
          })),
          (s = (0, t.jsx)("rect", {
            className: "text-text-tertiary",
            fill: "currentColor",
            opacity: "0.45",
            x: "3",
            y: "3",
            width: "28",
            height: "11",
            rx: "2",
          })),
          (n = (0, t.jsx)("rect", {
            className: "text-text-primary",
            fill: "currentColor",
            opacity: "0.9",
            x: "3",
            y: "17",
            width: "13",
            height: "2.4",
            rx: "1.2",
          })),
          (c[0] = r),
          (c[1] = s),
          (c[2] = n))
        : ((r = c[0]), (s = c[1]), (n = c[2]));
      let h = u ? "text-gain" : "text-loss";
      return (
        c[3] !== h
          ? ((l = (0, t.jsx)("rect", {
              className: h,
              fill: "currentColor",
              x: "21",
              y: "16.6",
              width: "10",
              height: "3.2",
              rx: "1.6",
            })),
            (c[3] = h),
            (c[4] = l))
          : (l = c[4]),
        c[5] === Symbol.for("react.memo_cache_sentinel")
          ? ((a = (0, t.jsx)("rect", {
              className: "text-text-tertiary",
              fill: "currentColor",
              x: "3",
              y: "21.5",
              width: "20",
              height: "2",
              rx: "1",
            })),
            (c[5] = a))
          : (a = c[5]),
        c[6] !== m || c[7] !== l
          ? ((o = (0, t.jsxs)("g", {
              transform: m,
              children: [r, s, n, l, a],
            })),
            (c[6] = m),
            (c[7] = l),
            (c[8] = o))
          : (o = c[8]),
        o
      );
    },
    x = (e) => {
      let r,
        s,
        n,
        l,
        a,
        o = (0, i.c)(18),
        { y: c, up: d, nameWidth: x, header: u } = e,
        m = void 0 !== u && u,
        h = `translate(0 ${c})`;
      o[0] !== m
        ? ((r = m
            ? null
            : (0, t.jsx)("circle", {
                className: "text-text-tertiary",
                fill: "currentColor",
                opacity: "0.55",
                cx: "12",
                cy: "4",
                r: "3",
              })),
          (o[0] = m),
          (o[1] = r))
        : (r = o[1]);
      let p = m ? "text-text-tertiary" : "text-text-primary",
        f = m ? 0.5 : 0.9,
        y = m ? 8 : 18;
      o[2] !== x || o[3] !== p || o[4] !== f || o[5] !== y
        ? ((s = (0, t.jsx)("rect", {
            className: p,
            fill: "currentColor",
            opacity: f,
            x: y,
            y: "2.8",
            width: x,
            height: "2.4",
            rx: "1.2",
          })),
          (o[2] = x),
          (o[3] = p),
          (o[4] = f),
          (o[5] = y),
          (o[6] = s))
        : (s = o[6]);
      let b = m ? 0.5 : 0.8;
      o[7] !== b
        ? ((n = (0, t.jsx)("rect", {
            className: "text-text-tertiary",
            fill: "currentColor",
            opacity: b,
            x: "62",
            y: "2.8",
            width: "14",
            height: "2.4",
            rx: "1.2",
          })),
          (o[7] = b),
          (o[8] = n))
        : (n = o[8]);
      let g = m ? "text-text-tertiary" : d ? "text-gain" : "text-loss",
        j = m ? 0.5 : 1;
      return (
        o[9] !== g || o[10] !== j
          ? ((l = (0, t.jsx)("rect", {
              className: g,
              fill: "currentColor",
              opacity: j,
              x: "90",
              y: "2.4",
              width: "22",
              height: "3.2",
              rx: "1.6",
            })),
            (o[9] = g),
            (o[10] = j),
            (o[11] = l))
          : (l = o[11]),
        o[12] !== l || o[13] !== h || o[14] !== r || o[15] !== s || o[16] !== n
          ? ((a = (0, t.jsxs)("g", { transform: h, children: [r, s, n, l] })),
            (o[12] = l),
            (o[13] = h),
            (o[14] = r),
            (o[15] = s),
            (o[16] = n),
            (o[17] = a))
          : (a = o[17]),
        a
      );
    },
    u = (e) => {
      let r,
        s,
        n,
        l,
        a = (0, i.c)(16),
        { x: o, open: c, close: d, high: x, low: u, width: m } = e,
        h = void 0 === m ? 6 : m,
        p = d < c,
        f = Math.min(c, d);
      a[0] !== d || a[1] !== c
        ? ((r = Math.abs(c - d)), (a[0] = d), (a[1] = c), (a[2] = r))
        : (r = a[2]);
      let y = Math.max(r, 1.5),
        b = p ? "text-gain" : "text-loss";
      a[3] !== x || a[4] !== u || a[5] !== o
        ? ((s = (0, t.jsx)("line", {
            x1: o,
            x2: o,
            y1: x,
            y2: u,
            strokeWidth: "1",
          })),
          (a[3] = x),
          (a[4] = u),
          (a[5] = o),
          (a[6] = s))
        : (s = a[6]);
      let g = o - h / 2;
      return (
        a[7] !== y || a[8] !== g || a[9] !== f || a[10] !== h
          ? ((n = (0, t.jsx)("rect", {
              x: g,
              y: f,
              width: h,
              height: y,
              rx: "0.8",
              stroke: "none",
            })),
            (a[7] = y),
            (a[8] = g),
            (a[9] = f),
            (a[10] = h),
            (a[11] = n))
          : (n = a[11]),
        a[12] !== b || a[13] !== s || a[14] !== n
          ? ((l = (0, t.jsxs)("g", {
              className: b,
              fill: "currentColor",
              stroke: "currentColor",
              children: [s, n],
            })),
            (a[12] = b),
            (a[13] = s),
            (a[14] = n),
            (a[15] = l))
          : (l = a[15]),
        l
      );
    },
    m = (e) => {
      let r,
        s,
        n,
        l,
        a = (0, i.c)(17),
        { x: o, open: c, close: d, high: x, low: u } = e,
        m = d < c ? "text-gain" : "text-loss";
      a[0] !== x || a[1] !== u || a[2] !== o
        ? ((r = (0, t.jsx)("line", { x1: o, x2: o, y1: x, y2: u })),
          (a[0] = x),
          (a[1] = u),
          (a[2] = o),
          (a[3] = r))
        : (r = a[3]);
      let h = o - 4;
      a[4] !== c || a[5] !== h || a[6] !== o
        ? ((s = (0, t.jsx)("line", { x1: h, x2: o, y1: c, y2: c })),
          (a[4] = c),
          (a[5] = h),
          (a[6] = o),
          (a[7] = s))
        : (s = a[7]);
      let p = o + 4;
      return (
        a[8] !== d || a[9] !== p || a[10] !== o
          ? ((n = (0, t.jsx)("line", { x1: o, x2: p, y1: d, y2: d })),
            (a[8] = d),
            (a[9] = p),
            (a[10] = o),
            (a[11] = n))
          : (n = a[11]),
        a[12] !== m || a[13] !== r || a[14] !== s || a[15] !== n
          ? ((l = (0, t.jsxs)("g", {
              className: m,
              stroke: "currentColor",
              strokeWidth: "1.4",
              strokeLinecap: "round",
              children: [r, s, n],
            })),
            (a[12] = m),
            (a[13] = r),
            (a[14] = s),
            (a[15] = n),
            (a[16] = l))
          : (l = a[16]),
        l
      );
    },
    h = (e) => {
      let r,
        s,
        n = (0, i.c)(4),
        { labels: l } = e;
      return (
        n[0] !== l ? ((r = l.map(N)), (n[0] = l), (n[1] = r)) : (r = n[1]),
        n[2] !== r
          ? ((s = (0, t.jsx)("g", {
              className: "text-text-tertiary",
              fill: "currentColor",
              fontSize: "5.5",
              fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
              textAnchor: "start",
              children: r,
            })),
            (n[2] = r),
            (n[3] = s))
          : (s = n[3]),
        s
      );
    },
    p = () => {
      let e,
        r = (0, i.c)(1);
      return (
        r[0] === Symbol.for("react.memo_cache_sentinel")
          ? ((e = (0, t.jsxs)("g", {
              className: "text-border-secondary",
              stroke: "currentColor",
              strokeWidth: "0.6",
              opacity: "0.6",
              children: [
                (0, t.jsx)("line", { x1: "6", x2: "86", y1: "11", y2: "11" }),
                (0, t.jsx)("line", { x1: "6", x2: "86", y1: "26", y2: "26" }),
                (0, t.jsx)("line", { x1: "6", x2: "86", y1: "41", y2: "41" }),
                (0, t.jsx)("line", { x1: "6", x2: "86", y1: "56", y2: "56" }),
              ],
            })),
            (r[0] = e))
          : (e = r[0]),
        e
      );
    },
    f = [
      [40, 32, 28, 44],
      [32, 36, 29, 40],
      [36, 24, 20, 38],
      [24, 27, 18, 31],
      [27, 16, 12, 30],
      [16, 21, 13, 26],
      [21, 14, 10, 24],
      [14, 18, 9, 22],
    ],
    y = "M8 46 C 20 44, 26 34, 36 36 S 52 20, 62 24 S 78 8, 86 12",
    b = (e) => {
      let r,
        s,
        n,
        l = (0, i.c)(6),
        { children: a, labels: o } = e;
      return (
        l[0] === Symbol.for("react.memo_cache_sentinel")
          ? ((r = (0, t.jsx)(p, {})), (l[0] = r))
          : (r = l[0]),
        l[1] !== o
          ? ((s = (0, t.jsx)(h, { labels: o })), (l[1] = o), (l[2] = s))
          : (s = l[2]),
        l[3] !== a || l[4] !== s
          ? ((n = (0, t.jsxs)(c, { children: [r, a, s] })),
            (l[3] = a),
            (l[4] = s),
            (l[5] = n))
          : (n = l[5]),
        n
      );
    },
    g = ["$0.0₄52", "$0.0₄38", "$0.0₄24"],
    j = {
      "layout-grid": (0, t.jsxs)(c, {
        children: [
          (0, t.jsx)(d, { x: 6, y: 5, up: !0 }),
          (0, t.jsx)(d, { x: 43, y: 5, up: !1 }),
          (0, t.jsx)(d, { x: 80, y: 5, up: !0 }),
          (0, t.jsx)(d, { x: 6, y: 35, up: !0 }),
          (0, t.jsx)(d, { x: 43, y: 35, up: !0 }),
          (0, t.jsx)(d, { x: 80, y: 35, up: !1 }),
        ],
      }),
      "layout-table": (0, t.jsxs)(c, {
        children: [
          (0, t.jsx)(x, { y: 4, nameWidth: 18, header: !0 }),
          (0, t.jsx)("line", {
            className: "text-border-secondary",
            stroke: "currentColor",
            strokeWidth: "0.6",
            x1: "4",
            x2: "116",
            y1: "13",
            y2: "13",
          }),
          (0, t.jsx)(x, { y: 15, nameWidth: 24, up: !0 }),
          (0, t.jsx)(x, { y: 26, nameWidth: 18, up: !1 }),
          (0, t.jsx)(x, { y: 37, nameWidth: 28, up: !0 }),
          (0, t.jsx)(x, { y: 48, nameWidth: 21, up: !0 }),
        ],
      }),
      "positions-compact": (0, t.jsx)(c, {
        children: [6, 26, 46].map((e, i) =>
          (0, t.jsxs)(
            "g",
            {
              transform: `translate(0 ${e})`,
              children: [
                (0, t.jsx)("rect", {
                  className: "text-bg-tertiary",
                  fill: "currentColor",
                  x: "4",
                  y: "0",
                  width: "112",
                  height: "16",
                  rx: "3",
                }),
                (0, t.jsx)("rect", {
                  className: "text-text-tertiary",
                  fill: "currentColor",
                  opacity: "0.5",
                  x: "8",
                  y: "3",
                  width: "10",
                  height: "10",
                  rx: "2",
                }),
                (0, t.jsx)("rect", {
                  className: "text-text-primary",
                  fill: "currentColor",
                  opacity: "0.9",
                  x: "22",
                  y: "4",
                  width: "22",
                  height: "2.4",
                  rx: "1.2",
                }),
                (0, t.jsx)("rect", {
                  className: "text-text-tertiary",
                  fill: "currentColor",
                  x: "22",
                  y: "9.5",
                  width: "34",
                  height: "2",
                  rx: "1",
                }),
                (0, t.jsx)("rect", {
                  className: 1 === i ? "text-loss" : "text-gain",
                  fill: "currentColor",
                  x: "92",
                  y: "6",
                  width: "20",
                  height: "4",
                  rx: "2",
                }),
              ],
            },
            e,
          ),
        ),
      }),
      "positions-expanded": (0, t.jsxs)(c, {
        children: [
          (0, t.jsx)("rect", {
            className: "text-bg-tertiary",
            fill: "currentColor",
            x: "4",
            y: "4",
            width: "112",
            height: "56",
            rx: "4",
          }),
          (0, t.jsx)("circle", {
            className: "text-text-tertiary",
            fill: "currentColor",
            opacity: "0.6",
            cx: "13",
            cy: "13",
            r: "5",
          }),
          (0, t.jsx)("rect", {
            className: "text-text-primary",
            fill: "currentColor",
            opacity: "0.9",
            x: "22",
            y: "9",
            width: "24",
            height: "2.6",
            rx: "1.3",
          }),
          (0, t.jsx)("rect", {
            className: "text-text-tertiary",
            fill: "currentColor",
            x: "22",
            y: "14",
            width: "14",
            height: "2",
            rx: "1",
          }),
          (0, t.jsx)("rect", {
            className: "text-text-tertiary",
            fill: "currentColor",
            opacity: "0.85",
            x: "8",
            y: "23",
            width: "96",
            height: "2.2",
            rx: "1.1",
          }),
          (0, t.jsx)("rect", {
            className: "text-text-tertiary",
            fill: "currentColor",
            opacity: "0.85",
            x: "8",
            y: "28",
            width: "70",
            height: "2.2",
            rx: "1.1",
          }),
          (0, t.jsx)("rect", {
            className: "text-bg-primary",
            fill: "currentColor",
            x: "8",
            y: "34",
            width: "104",
            height: "15",
            rx: "3",
          }),
          (0, t.jsx)("rect", {
            className: "text-text-tertiary",
            fill: "currentColor",
            opacity: "0.5",
            x: "12",
            y: "38",
            width: "7",
            height: "7",
            rx: "1.5",
          }),
          (0, t.jsx)("rect", {
            className: "text-text-primary",
            fill: "currentColor",
            opacity: "0.9",
            x: "23",
            y: "39",
            width: "16",
            height: "2.2",
            rx: "1.1",
          }),
          (0, t.jsx)("rect", {
            className: "text-text-tertiary",
            fill: "currentColor",
            x: "23",
            y: "43.5",
            width: "10",
            height: "1.8",
            rx: "0.9",
          }),
          (0, t.jsx)("rect", {
            className: "text-gain",
            fill: "currentColor",
            x: "86",
            y: "39.5",
            width: "22",
            height: "4",
            rx: "2",
          }),
          [12, 24, 36, 48].map((e) =>
            (0, t.jsx)(
              "circle",
              {
                className: "text-text-tertiary",
                fill: "currentColor",
                opacity: "0.6",
                cx: e,
                cy: "55",
                r: "1.8",
              },
              e,
            ),
          ),
        ],
      }),
      "series-candles": (0, t.jsx)(b, {
        labels: g,
        children: f.map(([e, i, r, s], n) =>
          (0, t.jsx)(
            u,
            { x: 12 + 10.5 * n, open: e, close: i, high: r, low: s },
            n,
          ),
        ),
      }),
      "series-bars": (0, t.jsx)(b, {
        labels: g,
        children: f.map(([e, i, r, s], n) =>
          (0, t.jsx)(
            m,
            { x: 12 + 10.5 * n, open: e, close: i, high: r, low: s },
            n,
          ),
        ),
      }),
      "series-line": (0, t.jsx)(b, {
        labels: g,
        children: (0, t.jsxs)("g", {
          className: "text-text-accent",
          children: [
            (0, t.jsx)("path", {
              d: `${y} L 86 58 L 8 58 Z`,
              fill: "currentColor",
              opacity: "0.14",
            }),
            (0, t.jsx)("path", {
              d: y,
              fill: "none",
              stroke: "currentColor",
              strokeWidth: "1.8",
              strokeLinecap: "round",
            }),
            (0, t.jsx)("circle", {
              cx: "86",
              cy: "12",
              r: "2.2",
              fill: "currentColor",
            }),
          ],
        }),
      }),
      "series-heikin": (0, t.jsx)(b, {
        labels: g,
        children: [
          [42, 36, 34, 43],
          [36, 30, 28, 37],
          [30, 24, 22, 31],
          [24, 19, 17, 25],
          [19, 15, 13, 20],
          [15, 19, 14, 21],
          [19, 23, 18, 25],
          [23, 27, 22, 29],
        ].map(([e, i, r, s], n) =>
          (0, t.jsx)(
            u,
            { x: 12 + 10.5 * n, open: e, close: i, high: r, low: s, width: 7 },
            n,
          ),
        ),
      }),
      "axis-marketcap": (0, t.jsxs)(b, {
        labels: ["$1.4M", "$980K", "$620K"],
        children: [
          (0, t.jsx)("g", {
            className: "text-text-accent",
            children: (0, t.jsx)("path", {
              d: y,
              fill: "none",
              stroke: "currentColor",
              strokeWidth: "1.8",
              strokeLinecap: "round",
            }),
          }),
          (0, t.jsx)("rect", {
            className: "text-bg-tertiary",
            fill: "currentColor",
            x: "6",
            y: "4",
            width: "22",
            height: "7",
            rx: "3.5",
          }),
          (0, t.jsx)("text", {
            className: "text-text-primary",
            fill: "currentColor",
            fontSize: "5",
            fontWeight: "600",
            x: "17",
            y: "9.2",
            textAnchor: "middle",
            children: "MC",
          }),
        ],
      }),
      "axis-price": (0, t.jsxs)(b, {
        labels: g,
        children: [
          (0, t.jsx)("g", {
            className: "text-text-accent",
            children: (0, t.jsx)("path", {
              d: y,
              fill: "none",
              stroke: "currentColor",
              strokeWidth: "1.8",
              strokeLinecap: "round",
            }),
          }),
          (0, t.jsx)("rect", {
            className: "text-bg-tertiary",
            fill: "currentColor",
            x: "6",
            y: "4",
            width: "28",
            height: "7",
            rx: "3.5",
          }),
          (0, t.jsx)("text", {
            className: "text-text-primary",
            fill: "currentColor",
            fontSize: "5",
            fontWeight: "600",
            x: "20",
            y: "9.2",
            textAnchor: "middle",
            children: "Price",
          }),
        ],
      }),
    },
    v = (e) => void 0 !== e && e in j;
  function w(e) {
    let r,
      s = (0, i.c)(2),
      { id: n } = e,
      l = j[n];
    return l
      ? (s[0] !== l
          ? ((r = (0, t.jsx)("svg", {
              "aria-hidden": !0,
              viewBox: "0 0 120 64",
              className: "block h-auto w-full",
              focusable: "false",
              children: l,
            })),
            (s[0] = l),
            (s[1] = r))
          : (r = s[1]),
        r)
      : null;
  }
  function N(e, i) {
    return (0, t.jsx)("text", { x: "90", y: 13 + 15 * i, children: e }, e);
  }
  var K = e.i(786147),
    _ = e.i(187611);
  let C =
    "flex h-8 items-center gap-1.5 rounded-md bg-bg-tertiary px-2.5 ring-1 ring-inset ring-border-tertiary transition-colors focus-within:ring-text-accent";
  function k(e) {
    let r,
      s,
      n,
      l = (0, i.c)(16),
      {
        choices: a,
        value: c,
        onChange: d,
        label: x,
        isDisabled: u,
        wrap: m,
        className: h,
      } = e;
    if (
      (l[0] !== h || l[1] !== m
        ? ((r = (0, o.c)(
            ((e = !1) =>
              (0, o.c)(
                "inline-flex max-w-full items-center gap-0.5 rounded-md bg-bg-tertiary p-0.5",
                e && "flex-wrap",
              ))(m),
            h,
          )),
          (l[0] = h),
          (l[1] = m),
          (l[2] = r))
        : (r = l[2]),
      l[3] !== a || l[4] !== u || l[5] !== d || l[6] !== c)
    ) {
      let e;
      (l[8] !== u || l[9] !== d || l[10] !== c
        ? ((e = (e) => {
            let i = Object.is(e.value, c);
            return (0, t.jsx)(
              "button",
              {
                type: "button",
                role: "radio",
                "aria-checked": i,
                disabled: u,
                onClick: () => d(e.value),
                className: ((e, t = !1) =>
                  (0, o.c)(
                    "h-7 whitespace-nowrap rounded-md px-2.5 text-xs font-medium leading-none tabular-nums transition-colors",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-text-accent/50",
                    e
                      ? "bg-bg-quaternary text-text-primary"
                      : "text-text-tertiary hover:text-text-primary",
                    t && "cursor-not-allowed opacity-50",
                  ))(i, u),
                children: e.label,
              },
              String(e.value),
            );
          }),
          (l[8] = u),
          (l[9] = d),
          (l[10] = c),
          (l[11] = e))
        : (e = l[11]),
        (s = a.map(e)),
        (l[3] = a),
        (l[4] = u),
        (l[5] = d),
        (l[6] = c),
        (l[7] = s));
    } else s = l[7];
    return (
      l[12] !== x || l[13] !== r || l[14] !== s
        ? ((n = (0, t.jsx)("div", {
            role: "radiogroup",
            "aria-label": x,
            className: r,
            children: s,
          })),
          (l[12] = x),
          (l[13] = r),
          (l[14] = s),
          (l[15] = n))
        : (n = l[15]),
      n
    );
  }
  let S = (e, t) =>
      t.labelKey
        ? (0, K.f)(e, t.labelKey)
        : (0, _.T)(t.rawLabel ?? "", "unicode-symbol"),
    P = (e) => e.length <= 4 && e.join("").length <= 26;
  function I(e) {
    let r,
      s,
      n = (0, i.c)(37),
      { options: a, value: c, onChange: d, label: x, isDisabled: u } = e,
      { t: m } = (0, l.f)();
    if (!a.some(A)) {
      let e, i, r, s, l, o, h, p;
      if (
        n[0] !== u ||
        n[1] !== x ||
        n[2] !== d ||
        n[3] !== a ||
        n[4] !== m ||
        n[5] !== c
      ) {
        let t;
        n[13] !== m
          ? ((t = (e) => S(m, e)), (n[13] = m), (n[14] = t))
          : (t = n[14]);
        let p = a.map(t);
        ((e = k),
          (r = a.map((e, t) => ({ value: e.value, label: p[t] }))),
          (s = c),
          (l = d),
          (o = x),
          (h = u),
          (i = P(p)),
          (n[0] = u),
          (n[1] = x),
          (n[2] = d),
          (n[3] = a),
          (n[4] = m),
          (n[5] = c),
          (n[6] = e),
          (n[7] = i),
          (n[8] = r),
          (n[9] = s),
          (n[10] = l),
          (n[11] = o),
          (n[12] = h));
      } else
        ((e = n[6]),
          (i = n[7]),
          (r = n[8]),
          (s = n[9]),
          (l = n[10]),
          (o = n[11]),
          (h = n[12]));
      let f = !i;
      return (
        n[15] !== e ||
        n[16] !== r ||
        n[17] !== s ||
        n[18] !== l ||
        n[19] !== o ||
        n[20] !== h ||
        n[21] !== f
          ? ((p = (0, t.jsx)(e, {
              choices: r,
              value: s,
              onChange: l,
              label: o,
              isDisabled: h,
              wrap: f,
            })),
            (n[15] = e),
            (n[16] = r),
            (n[17] = s),
            (n[18] = l),
            (n[19] = o),
            (n[20] = h),
            (n[21] = f),
            (n[22] = p))
          : (p = n[22]),
        p
      );
    }
    if (
      n[23] !== u ||
      n[24] !== d ||
      n[25] !== a ||
      n[26] !== m ||
      n[27] !== c
    ) {
      let e;
      (n[29] !== u || n[30] !== d || n[31] !== m || n[32] !== c
        ? ((e = (e) => {
            let i = Object.is(e.value, c);
            return (0, t.jsxs)(
              "button",
              {
                type: "button",
                role: "radio",
                "aria-checked": i,
                disabled: u,
                onClick: () => d(e.value),
                className: (0, o.c)(
                  "group flex flex-col items-stretch rounded-lg bg-bg-secondary p-1 text-left ring-1 ring-inset transition-[box-shadow,color]",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-text-accent/60",
                  i
                    ? "text-text-primary ring-text-accent"
                    : "text-text-tertiary ring-border-secondary/70 hover:text-text-primary hover:ring-border-tertiary",
                  u && "cursor-not-allowed opacity-50",
                ),
                children: [
                  v(e.preview)
                    ? (0, t.jsx)("div", {
                        className: "overflow-hidden rounded-md",
                        children: (0, t.jsx)(w, { id: e.preview }),
                      })
                    : null,
                  (0, t.jsxs)("span", {
                    className:
                      "flex items-center justify-between gap-2 px-1.5 pb-1 pt-1.5",
                    children: [
                      (0, t.jsx)("span", {
                        className: "truncate text-xs font-medium",
                        children: S(m, e),
                      }),
                      (0, t.jsx)("span", {
                        "aria-hidden": !0,
                        className: (0, o.c)(
                          "size-1.5 shrink-0 rounded-full transition-colors",
                          i ? "bg-text-accent" : "bg-border-tertiary",
                        ),
                      }),
                    ],
                  }),
                ],
              },
              String(e.value),
            );
          }),
          (n[29] = u),
          (n[30] = d),
          (n[31] = m),
          (n[32] = c),
          (n[33] = e))
        : (e = n[33]),
        (r = a.map(e)),
        (n[23] = u),
        (n[24] = d),
        (n[25] = a),
        (n[26] = m),
        (n[27] = c),
        (n[28] = r));
    } else r = n[28];
    return (
      n[34] !== x || n[35] !== r
        ? ((s = (0, t.jsx)("div", {
            role: "radiogroup",
            "aria-label": x,
            className: "grid grid-cols-2 gap-2 sm:grid-cols-4",
            children: r,
          })),
          (n[34] = x),
          (n[35] = r),
          (n[36] = s))
        : (s = n[36]),
      s
    );
  }
  function A(e) {
    return v(e.preview);
  }
  var T = e.i(379288),
    O = e.i(883468),
    W = e.i(547562);
  let z = [
    ["1S", "1s"],
    ["15S", "15s"],
    ["30S", "30s"],
    ["1", "1m"],
    ["5", "5m"],
    ["15", "15m"],
    ["30", "30m"],
    ["60", "1h"],
    ["240", "4h"],
    ["360", "6h"],
    ["720", "12h"],
    ["1D", "1D"],
    ["1W", "1W"],
  ].map(([e, t]) => ({ value: e, label: t }));
  var D = e.i(574472),
    F = e.i(464456);
  function L(e) {
    let s,
      n,
      l = (0, i.c)(8),
      { listLabel: a, chips: o, onUnhide: c } = e;
    if (l[0] !== o || l[1] !== c) {
      let e;
      (l[3] !== c
        ? ((e = (e) =>
            (0, t.jsx)(
              "li",
              {
                children: (0, t.jsxs)("button", {
                  type: "button",
                  "aria-label": e.unhideLabel,
                  onClick: () => c(e.id),
                  className:
                    "group flex h-7 items-center gap-1.5 rounded-md bg-bg-secondary pl-2.5 pr-1.5 text-xs font-medium text-text-primary ring-1 ring-inset ring-border-secondary/70 transition-colors hover:ring-border-tertiary focus-visible:outline-none focus-visible:ring-text-accent/60",
                  children: [
                    (0, t.jsx)("span", { children: e.label }),
                    (0, t.jsx)(r.x6, {
                      "aria-hidden": !0,
                      className:
                        "size-3 text-text-tertiary transition-colors group-hover:text-text-primary",
                    }),
                  ],
                }),
              },
              e.id,
            )),
          (l[3] = c),
          (l[4] = e))
        : (e = l[4]),
        (s = o.map(e)),
        (l[0] = o),
        (l[1] = c),
        (l[2] = s));
    } else s = l[2];
    return (
      l[5] !== a || l[6] !== s
        ? ((n = (0, t.jsx)("ul", {
            "aria-label": a,
            className: "flex flex-wrap gap-1.5",
            children: s,
          })),
          (l[5] = a),
          (l[6] = s),
          (l[7] = n))
        : (n = l[7]),
      n
    );
  }
  var M = e.i(562322),
    R = e.i(551792);
  function $(e, t) {
    return t.hiddenAt - e.hiddenAt;
  }
  var B = e.i(365089),
    E = e.i(605587);
  function q(e, t) {
    return t.hiddenAt - e.hiddenAt;
  }
  var X = e.i(447890),
    U = e.i(749099),
    H = e.i(228008),
    V = e.i(138800);
  let Z = [0, 1, 2];
  var G = e.i(970914),
    Q = e.i(862507),
    Y = e.i(111740),
    J = e.i(388625),
    ee = e.i(268888),
    et = e.i(996567),
    ei = e.i(97326),
    er = e.i(918120),
    es = e.i(778593);
  let en = {
    "trade-presets": function (e) {
      let r,
        s,
        n,
        a,
        o,
        c,
        d,
        x,
        u = (0, i.c)(44),
        { definition: m } = e,
        { t: h } = (0, l.f)(),
        p = (0, es.f)(),
        { slippage: f, setSlippage: y } = (0, ei.f)(),
        { tipAmount: b, setTipAmount: g } = (0, er.f)(),
        { priorityFee: j, setPriorityFee: v } = (0, ee.f)(),
        { frontRunningProtection: w, setFrontRunningProtection: N } = (0,
        Y.f)(),
        { holdToConfirm: _, setHoldToConfirm: C } = (0, J.f)(),
        k = m.id;
      (u[0] !== m.labelKey || u[1] !== h
        ? ((r = (0, K.f)(h, m.labelKey)),
          (u[0] = m.labelKey),
          (u[1] = h),
          (u[2] = r))
        : (r = u[2]),
        u[3] !== m.descriptionKey || u[4] !== h
          ? ((s = m.descriptionKey ? (0, K.f)(h, m.descriptionKey) : void 0),
            (u[3] = m.descriptionKey),
            (u[4] = h),
            (u[5] = s))
          : (s = u[5]));
      let S = p.resetActivePreset;
      return (
        u[6] !== h
          ? ((n = h("web.trade.reset")), (u[6] = h), (u[7] = n))
          : (n = u[7]),
        u[8] !== p.resetActivePreset || u[9] !== n
          ? ((a = (0, t.jsx)(T.O, { onClick: S, children: n })),
            (u[8] = p.resetActivePreset),
            (u[9] = n),
            (u[10] = a))
          : (a = u[10]),
        u[11] !== w ||
        u[12] !== _ ||
        u[13] !== p.resetActivePreset ||
        u[14] !== j ||
        u[15] !== N ||
        u[16] !== C ||
        u[17] !== v ||
        u[18] !== y ||
        u[19] !== g ||
        u[20] !== f ||
        u[21] !== b
          ? ((o = {
              slippage: f,
              setSlippage: y,
              priorityFee: j,
              setPriorityFee: v,
              tipAmount: b,
              setTipAmount: g,
              frontRunningProtection: w,
              setFrontRunningProtection: N,
              holdToConfirm: _,
              setHoldToConfirm: C,
              resetToDefaults: p.resetActivePreset,
            }),
            (u[11] = w),
            (u[12] = _),
            (u[13] = p.resetActivePreset),
            (u[14] = j),
            (u[15] = N),
            (u[16] = C),
            (u[17] = v),
            (u[18] = y),
            (u[19] = g),
            (u[20] = f),
            (u[21] = b),
            (u[22] = o))
          : (o = u[22]),
        u[23] !== p.activeIndex ||
        u[24] !== p.activePreset ||
        u[25] !== p.addPreset ||
        u[26] !== p.canAddPreset ||
        u[27] !== p.canDeletePreset ||
        u[28] !== p.deletePreset ||
        u[29] !== p.duplicatePreset ||
        u[30] !== p.presets ||
        u[31] !== p.renamePreset ||
        u[32] !== p.setActiveIndex
          ? ((c = {
              presets: p.presets,
              activeIndex: p.activeIndex,
              activePreset: p.activePreset,
              canAddPreset: p.canAddPreset,
              canDeletePreset: p.canDeletePreset,
              setActiveIndex: p.setActiveIndex,
              renamePreset: p.renamePreset,
              addPreset: p.addPreset,
              duplicatePreset: p.duplicatePreset,
              deletePreset: p.deletePreset,
            }),
            (u[23] = p.activeIndex),
            (u[24] = p.activePreset),
            (u[25] = p.addPreset),
            (u[26] = p.canAddPreset),
            (u[27] = p.canDeletePreset),
            (u[28] = p.deletePreset),
            (u[29] = p.duplicatePreset),
            (u[30] = p.presets),
            (u[31] = p.renamePreset),
            (u[32] = p.setActiveIndex),
            (u[33] = c))
          : (c = u[33]),
        u[34] !== p.setActiveIndex || u[35] !== o || u[36] !== c
          ? ((d = (0, t.jsx)(Q.l, {
              variant: "flat",
              execution: o,
              presetControls: c,
              onPresetSelect: p.setActiveIndex,
            })),
            (u[34] = p.setActiveIndex),
            (u[35] = o),
            (u[36] = c),
            (u[37] = d))
          : (d = u[37]),
        u[38] !== m.id ||
        u[39] !== r ||
        u[40] !== s ||
        u[41] !== a ||
        u[42] !== d
          ? ((x = (0, t.jsx)(T.s, {
              settingId: k,
              title: r,
              description: s,
              control: a,
              children: d,
            })),
            (u[38] = m.id),
            (u[39] = r),
            (u[40] = s),
            (u[41] = a),
            (u[42] = d),
            (u[43] = x))
          : (x = u[43]),
        x
      );
    },
    "quick-buy-execution": function (e) {
      let r,
        s,
        n,
        a,
        o,
        c,
        d = (0, i.c)(29),
        { definition: x } = e,
        { t: u } = (0, l.f)(),
        m = (0, W.o)("trading.quickBuy.useActivePreset"),
        h = (0, et.f)();
      if (m) return null;
      let p = x.id;
      (d[0] !== x.labelKey || d[1] !== u
        ? ((r = (0, K.f)(u, x.labelKey)),
          (d[0] = x.labelKey),
          (d[1] = u),
          (d[2] = r))
        : (r = d[2]),
        d[3] !== x.descriptionKey || d[4] !== u
          ? ((s = x.descriptionKey ? (0, K.f)(u, x.descriptionKey) : void 0),
            (d[3] = x.descriptionKey),
            (d[4] = u),
            (d[5] = s))
          : (s = d[5]));
      let f = h.reset;
      return (
        d[6] !== u
          ? ((n = u("web.trade.reset")), (d[6] = u), (d[7] = n))
          : (n = d[7]),
        d[8] !== h.reset || d[9] !== n
          ? ((a = (0, t.jsx)(T.O, { onClick: f, children: n })),
            (d[8] = h.reset),
            (d[9] = n),
            (d[10] = a))
          : (a = d[10]),
        d[11] !== h.frontRunningProtection ||
        d[12] !== h.holdToConfirm ||
        d[13] !== h.priorityFee ||
        d[14] !== h.reset ||
        d[15] !== h.setFrontRunningProtection ||
        d[16] !== h.setHoldToConfirm ||
        d[17] !== h.setPriorityFee ||
        d[18] !== h.setSlippage ||
        d[19] !== h.setTipAmount ||
        d[20] !== h.slippage ||
        d[21] !== h.tipAmount
          ? ((o = (0, t.jsx)(Q.l, {
              variant: "flat",
              execution: {
                slippage: h.slippage,
                setSlippage: h.setSlippage,
                priorityFee: h.priorityFee,
                setPriorityFee: h.setPriorityFee,
                tipAmount: h.tipAmount,
                setTipAmount: h.setTipAmount,
                frontRunningProtection: h.frontRunningProtection,
                setFrontRunningProtection: h.setFrontRunningProtection,
                holdToConfirm: h.holdToConfirm,
                setHoldToConfirm: h.setHoldToConfirm,
                resetToDefaults: h.reset,
              },
            })),
            (d[11] = h.frontRunningProtection),
            (d[12] = h.holdToConfirm),
            (d[13] = h.priorityFee),
            (d[14] = h.reset),
            (d[15] = h.setFrontRunningProtection),
            (d[16] = h.setHoldToConfirm),
            (d[17] = h.setPriorityFee),
            (d[18] = h.setSlippage),
            (d[19] = h.setTipAmount),
            (d[20] = h.slippage),
            (d[21] = h.tipAmount),
            (d[22] = o))
          : (o = d[22]),
        d[23] !== x.id ||
        d[24] !== r ||
        d[25] !== s ||
        d[26] !== a ||
        d[27] !== o
          ? ((c = (0, t.jsx)(T.s, {
              settingId: p,
              title: r,
              description: s,
              control: a,
              children: o,
            })),
            (d[23] = x.id),
            (d[24] = r),
            (d[25] = s),
            (d[26] = a),
            (d[27] = o),
            (d[28] = c))
          : (c = d[28]),
        c
      );
    },
    "quick-preset-triple": function (e) {
      let r,
        s,
        n,
        a,
        o,
        c,
        d,
        x,
        u,
        m,
        h,
        p,
        f,
        y,
        b = (0, i.c)(46),
        { definition: g } = e,
        { t: j } = (0, l.f)(),
        v = g.id,
        [w, N] = (0, W.l)(v);
      if (
        b[0] !== g.descriptionKey ||
        b[1] !== g.id ||
        b[2] !== g.labelKey ||
        b[3] !== v ||
        b[4] !== N ||
        b[5] !== j ||
        b[6] !== w
      ) {
        let e,
          i,
          l,
          m = (0, K.f)(j, g.labelKey);
        if (b[16] !== g.id) {
          let t;
          ((e = (t = g.id).endsWith(".usd")
            ? "USD"
            : t.endsWith(".sol")
              ? "SOL"
              : "%"),
            (b[16] = g.id),
            (b[17] = e));
        } else e = b[17];
        ((u = e),
          (r = T.s),
          (o = g.id),
          (c = m),
          b[18] !== g.descriptionKey || b[19] !== j
            ? ((d = g.descriptionKey ? (0, K.f)(j, g.descriptionKey) : void 0),
              (b[18] = g.descriptionKey),
              (b[19] = j),
              (b[20] = d))
            : (d = b[20]),
          b[21] !== v
            ? ((i = () => (0, V.O)(v)), (b[21] = v), (b[22] = i))
            : (i = b[22]));
        let h = j("web.trade.reset_amounts_aria", { title: m });
        (b[23] !== j
          ? ((l = j("web.trade.reset")), (b[23] = j), (b[24] = l))
          : (l = b[24]),
          (x = (0, t.jsx)(T.O, { onClick: i, "aria-label": h, children: l })),
          (a = "flex flex-wrap items-center gap-x-4 gap-y-2"),
          (s = "grid w-full grid-cols-3 gap-2 sm:w-[312px]"),
          (n = Z.map((e) =>
            (0, t.jsx)(
              H.f,
              {
                value: w[e],
                suffix: u,
                className: C,
                "aria-label": j("web.trade.amount_field_aria", {
                  title: m,
                  number: e + 1,
                }),
                onCommit: (t) =>
                  N((i) => {
                    let r = [...i];
                    return ((r[e] = t), r);
                  }),
              },
              e,
            ),
          )),
          (b[0] = g.descriptionKey),
          (b[1] = g.id),
          (b[2] = g.labelKey),
          (b[3] = v),
          (b[4] = N),
          (b[5] = j),
          (b[6] = w),
          (b[7] = r),
          (b[8] = s),
          (b[9] = n),
          (b[10] = a),
          (b[11] = o),
          (b[12] = c),
          (b[13] = d),
          (b[14] = x),
          (b[15] = u));
      } else
        ((r = b[7]),
          (s = b[8]),
          (n = b[9]),
          (a = b[10]),
          (o = b[11]),
          (c = b[12]),
          (d = b[13]),
          (x = b[14]),
          (u = b[15]));
      if (
        (b[25] !== s || b[26] !== n
          ? ((m = (0, t.jsx)("div", { className: s, children: n })),
            (b[25] = s),
            (b[26] = n),
            (b[27] = m))
          : (m = b[27]),
        b[28] !== u || b[29] !== w)
      ) {
        let e;
        (b[31] !== u
          ? ((e = (e, i) =>
              (0, t.jsx)(
                "span",
                {
                  className:
                    "rounded-md bg-bg-tertiary px-2 py-1 text-[11px] font-semibold tabular-nums text-text-secondary",
                  children: "%" === u ? `${e}%` : `${e} ${u}`,
                },
                i,
              )),
            (b[31] = u),
            (b[32] = e))
          : (e = b[32]),
          (h = w.map(e)),
          (b[28] = u),
          (b[29] = w),
          (b[30] = h));
      } else h = b[30];
      return (
        b[33] !== h
          ? ((p = (0, t.jsx)("div", {
              "aria-hidden": !0,
              className: "flex items-center gap-1",
              children: h,
            })),
            (b[33] = h),
            (b[34] = p))
          : (p = b[34]),
        b[35] !== p || b[36] !== a || b[37] !== m
          ? ((f = (0, t.jsxs)("div", { className: a, children: [m, p] })),
            (b[35] = p),
            (b[36] = a),
            (b[37] = m),
            (b[38] = f))
          : (f = b[38]),
        b[39] !== r ||
        b[40] !== f ||
        b[41] !== o ||
        b[42] !== c ||
        b[43] !== d ||
        b[44] !== x
          ? ((y = (0, t.jsx)(r, {
              settingId: o,
              title: c,
              description: d,
              control: x,
              children: f,
            })),
            (b[39] = r),
            (b[40] = f),
            (b[41] = o),
            (b[42] = c),
            (b[43] = d),
            (b[44] = x),
            (b[45] = y))
          : (y = b[45]),
        y
      );
    },
    "profile-quick-trade": function (e) {
      let r,
        s,
        n,
        a,
        o = (0, i.c)(11),
        { definition: c } = e,
        { t: d } = (0, l.f)(),
        x = c.id;
      return (
        o[0] !== c.labelKey || o[1] !== d
          ? ((r = (0, K.f)(d, c.labelKey)),
            (o[0] = c.labelKey),
            (o[1] = d),
            (o[2] = r))
          : (r = o[2]),
        o[3] !== c.descriptionKey || o[4] !== d
          ? ((s = c.descriptionKey ? (0, K.f)(d, c.descriptionKey) : void 0),
            (o[3] = c.descriptionKey),
            (o[4] = d),
            (o[5] = s))
          : (s = o[5]),
        o[6] === Symbol.for("react.memo_cache_sentinel")
          ? ((n = (0, t.jsx)(T.N, {
              className: "p-3",
              children: (0, t.jsx)(U.I, {}),
            })),
            (o[6] = n))
          : (n = o[6]),
        o[7] !== c.id || o[8] !== r || o[9] !== s
          ? ((a = (0, t.jsx)(T.s, {
              settingId: x,
              title: r,
              description: s,
              children: n,
            })),
            (o[7] = c.id),
            (o[8] = r),
            (o[9] = s),
            (o[10] = a))
          : (a = o[10]),
        a
      );
    },
    "screeners-style": function (e) {
      let r,
        s,
        n,
        a,
        o,
        c = (0, i.c)(17),
        { definition: d } = e,
        { t: x } = (0, l.f)(),
        [u, m] = (0, W.l)("feed.screeners.style"),
        h = d.id;
      return (
        c[0] !== d.labelKey || c[1] !== x
          ? ((r = (0, K.f)(x, d.labelKey)),
            (c[0] = d.labelKey),
            (c[1] = x),
            (c[2] = r))
          : (r = c[2]),
        c[3] !== d.descriptionKey || c[4] !== x
          ? ((s = d.descriptionKey ? (0, K.f)(x, d.descriptionKey) : void 0),
            (c[3] = d.descriptionKey),
            (c[4] = x),
            (c[5] = s))
          : (s = c[5]),
        c[6] !== m || c[7] !== u || c[8] !== x
          ? ((n = G.U.map((e) => {
              let i = e.choices.findIndex((e) => e.isActive(u));
              return (0, t.jsxs)(
                "div",
                {
                  className:
                    "flex items-center justify-between gap-3 px-3 py-2",
                  children: [
                    (0, t.jsx)("span", {
                      className: "text-xs font-medium text-text-secondary",
                      children: x(e.headingKey),
                    }),
                    (0, t.jsx)(k, {
                      choices: e.choices.map((e, t) => ({
                        value: t,
                        label: x(e.labelKey),
                      })),
                      value: i,
                      label: x(e.headingKey),
                      onChange: (t) => {
                        let i = e.choices[t];
                        i && m((e) => ({ ...e, ...i.patch }));
                      },
                    }),
                  ],
                },
                e.headingKey,
              );
            })),
            (c[6] = m),
            (c[7] = u),
            (c[8] = x),
            (c[9] = n))
          : (n = c[9]),
        c[10] !== n
          ? ((a = (0, t.jsx)(T.N, {
              className: "divide-y divide-border-secondary",
              children: n,
            })),
            (c[10] = n),
            (c[11] = a))
          : (a = c[11]),
        c[12] !== d.id || c[13] !== r || c[14] !== s || c[15] !== a
          ? ((o = (0, t.jsx)(T.s, {
              settingId: h,
              title: r,
              description: s,
              children: a,
            })),
            (c[12] = d.id),
            (c[13] = r),
            (c[14] = s),
            (c[15] = a),
            (c[16] = o))
          : (o = c[16]),
        o
      );
    },
    "chart-interval": function (e) {
      let r,
        s,
        n,
        a,
        o,
        c = (0, i.c)(17),
        { definition: d } = e,
        { t: x } = (0, l.f)(),
        [u, m] = (0, W.l)("chart.interval");
      c[0] !== d.labelKey || c[1] !== x
        ? ((r = (0, K.f)(x, d.labelKey)),
          (c[0] = d.labelKey),
          (c[1] = x),
          (c[2] = r))
        : (r = c[2]);
      let h = r;
      c[3] !== d.descriptionKey || c[4] !== x
        ? ((s = d.descriptionKey ? (0, K.f)(x, d.descriptionKey) : void 0),
          (c[3] = d.descriptionKey),
          (c[4] = x),
          (c[5] = s))
        : (s = c[5]);
      let p = u.lastSelected ?? "auto";
      return (
        c[6] !== m
          ? ((n = (e) =>
              m((t) =>
                "auto" === e
                  ? { byMint: t.byMint }
                  : { byMint: t.byMint, lastSelected: e },
              )),
            (c[6] = m),
            (c[7] = n))
          : (n = c[7]),
        c[8] !== p || c[9] !== n || c[10] !== h
          ? ((a = (0, t.jsx)(I, {
              options: O.O,
              value: p,
              label: h,
              onChange: n,
            })),
            (c[8] = p),
            (c[9] = n),
            (c[10] = h),
            (c[11] = a))
          : (a = c[11]),
        c[12] !== d.id || c[13] !== s || c[14] !== a || c[15] !== h
          ? ((o = (0, t.jsx)(T.s, {
              settingId: d.id,
              title: h,
              description: s,
              children: a,
            })),
            (c[12] = d.id),
            (c[13] = s),
            (c[14] = a),
            (c[15] = h),
            (c[16] = o))
          : (o = c[16]),
        o
      );
    },
    "favorite-intervals": function (e) {
      let r,
        s,
        n,
        a,
        c,
        d,
        x = (0, i.c)(19),
        { definition: u } = e,
        { t: m } = (0, l.f)(),
        [h, p] = (0, W.l)("chart.favoriteIntervals");
      x[0] !== u.labelKey || x[1] !== m
        ? ((r = (0, K.f)(m, u.labelKey)),
          (x[0] = u.labelKey),
          (x[1] = m),
          (x[2] = r))
        : (r = x[2]);
      let f = r;
      x[3] !== p
        ? ((s = (e) =>
            p((t) => (t.includes(e) ? t.filter((t) => t !== e) : [...t, e]))),
          (x[3] = p),
          (x[4] = s))
        : (s = x[4]);
      let y = s,
        b = u.id;
      return (
        x[5] !== u.descriptionKey || x[6] !== m
          ? ((n = u.descriptionKey ? (0, K.f)(m, u.descriptionKey) : void 0),
            (x[5] = u.descriptionKey),
            (x[6] = m),
            (x[7] = n))
          : (n = x[7]),
        x[8] !== h || x[9] !== y
          ? ((a = z.map((e) => {
              let i = h.includes(e.value);
              return (0, t.jsx)(
                "button",
                {
                  type: "button",
                  "aria-pressed": i,
                  onClick: () => y(e.value),
                  className: (0, o.c)(
                    "h-7 rounded-md px-2.5 text-xs font-medium tabular-nums ring-1 ring-inset transition-colors",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-text-accent/50",
                    i
                      ? "bg-text-accent/15 text-text-accent ring-text-accent/40"
                      : "bg-bg-secondary text-text-tertiary ring-border-tertiary hover:text-text-primary",
                  ),
                  children: e.label,
                },
                e.value,
              );
            })),
            (x[8] = h),
            (x[9] = y),
            (x[10] = a))
          : (a = x[10]),
        x[11] !== a || x[12] !== f
          ? ((c = (0, t.jsx)("div", {
              role: "group",
              "aria-label": f,
              className: "flex flex-wrap gap-1.5",
              children: a,
            })),
            (x[11] = a),
            (x[12] = f),
            (x[13] = c))
          : (c = x[13]),
        x[14] !== u.id || x[15] !== n || x[16] !== c || x[17] !== f
          ? ((d = (0, t.jsx)(T.s, {
              settingId: b,
              title: f,
              description: n,
              children: c,
            })),
            (x[14] = u.id),
            (x[15] = n),
            (x[16] = c),
            (x[17] = f),
            (x[18] = d))
          : (d = x[18]),
        d
      );
    },
    language: function (e) {
      let r,
        s,
        n,
        a,
        o = (0, i.c)(11),
        { definition: c } = e,
        { t: d } = (0, l.f)(),
        x = c.id;
      return (
        o[0] !== c.labelKey || o[1] !== d
          ? ((r = (0, K.f)(d, c.labelKey)),
            (o[0] = c.labelKey),
            (o[1] = d),
            (o[2] = r))
          : (r = o[2]),
        o[3] !== c.descriptionKey || o[4] !== d
          ? ((s = c.descriptionKey ? (0, K.f)(d, c.descriptionKey) : void 0),
            (o[3] = c.descriptionKey),
            (o[4] = d),
            (o[5] = s))
          : (s = o[5]),
        o[6] === Symbol.for("react.memo_cache_sentinel")
          ? ((n = (0, t.jsx)(X.f, {
              className:
                "h-8 w-[200px] rounded-md border-border-secondary bg-bg-secondary px-2.5 text-[13px] text-text-primary sm:w-56",
            })),
            (o[6] = n))
          : (n = o[6]),
        o[7] !== c.id || o[8] !== r || o[9] !== s
          ? ((a = (0, t.jsx)(T.s, {
              settingId: x,
              title: r,
              description: s,
              control: n,
            })),
            (o[7] = c.id),
            (o[8] = r),
            (o[9] = s),
            (o[10] = a))
          : (a = o[10]),
        a
      );
    },
    "info-bar-hidden-tokens": function (e) {
      let r,
        s,
        n,
        a,
        o,
        c,
        d,
        x,
        u = (0, i.c)(31),
        { definition: m } = e,
        { t: h } = (0, l.f)(),
        [p, f] = (0, W.l)("feed.infoBar.hiddenTokens"),
        y = (0, W.o)("feed.infoBar.hiddenProfiles");
      if (
        u[0] !== m.id ||
        u[1] !== m.labelKey ||
        u[2] !== p ||
        u[3] !== y ||
        u[4] !== f ||
        u[5] !== h
      ) {
        let e,
          i,
          l = Object.values(p).sort(q),
          x = 0 === l.length && 0 === Object.keys(y).length;
        u[13] !== m.labelKey || u[14] !== h
          ? ((e = (0, K.f)(h, m.labelKey)),
            (u[13] = m.labelKey),
            (u[14] = h),
            (u[15] = e))
          : (e = u[15]);
        let b = e;
        u[16] !== f
          ? ((i = (e) => {
              let t = (0, E.c)(e);
              f((e) =>
                Object.fromEntries(
                  Object.entries(e).filter((e) => {
                    let [i] = e;
                    return i !== t;
                  }),
                ),
              );
            }),
            (u[16] = f),
            (u[17] = i))
          : (i = u[17]);
        let g = i;
        ((r = T.s),
          (s = m.id),
          (n = b),
          u[18] !== x || u[19] !== h
            ? ((a = x ? h("web.info_bar.no_hidden_tokens") : void 0),
              (u[18] = x),
              (u[19] = h),
              (u[20] = a))
            : (a = u[20]),
          u[21] !== h
            ? ((o = h("web.info_bar.hidden_positions_note")),
              (u[21] = h),
              (u[22] = o))
            : (o = u[22]),
          (c =
            l.length > 0
              ? (0, t.jsx)(T.O, {
                  onClick: () => f({}),
                  children: h("web.info_bar.show_all_hidden"),
                })
              : void 0),
          (d =
            l.length > 0
              ? (0, t.jsx)(L, {
                  listLabel: b,
                  chips: l.map((e) => {
                    let t = e.symbol || (0, B.d)(e.mint, 4, 4);
                    return {
                      id: e.mint,
                      label: (0, _.T)(t, "coin-symbol"),
                      unhideLabel: h("web.info_bar.unhide_token", {
                        symbol: t,
                      }),
                    };
                  }),
                  onUnhide: g,
                })
              : null),
          (u[0] = m.id),
          (u[1] = m.labelKey),
          (u[2] = p),
          (u[3] = y),
          (u[4] = f),
          (u[5] = h),
          (u[6] = r),
          (u[7] = s),
          (u[8] = n),
          (u[9] = a),
          (u[10] = o),
          (u[11] = c),
          (u[12] = d));
      } else
        ((r = u[6]),
          (s = u[7]),
          (n = u[8]),
          (a = u[9]),
          (o = u[10]),
          (c = u[11]),
          (d = u[12]));
      return (
        u[23] !== r ||
        u[24] !== s ||
        u[25] !== n ||
        u[26] !== a ||
        u[27] !== o ||
        u[28] !== c ||
        u[29] !== d
          ? ((x = (0, t.jsx)(r, {
              settingId: s,
              title: n,
              description: a,
              note: o,
              control: c,
              children: d,
            })),
            (u[23] = r),
            (u[24] = s),
            (u[25] = n),
            (u[26] = a),
            (u[27] = o),
            (u[28] = c),
            (u[29] = d),
            (u[30] = x))
          : (x = u[30]),
        x
      );
    },
    "info-bar-hidden-profiles": function (e) {
      let r,
        s,
        n,
        a,
        o,
        c,
        d = (0, i.c)(21),
        { definition: x } = e,
        { t: u } = (0, l.f)(),
        [m, h] = (0, W.l)("feed.infoBar.hiddenProfiles");
      if (
        d[0] !== x.id ||
        d[1] !== x.labelKey ||
        d[2] !== m ||
        d[3] !== h ||
        d[4] !== u
      ) {
        let e,
          i,
          l = Object.values(m).sort($);
        d[10] !== x.labelKey || d[11] !== u
          ? ((e = (0, K.f)(u, x.labelKey)),
            (d[10] = x.labelKey),
            (d[11] = u),
            (d[12] = e))
          : (e = d[12]);
        let c = e;
        d[13] !== h
          ? ((i = (e) => {
              let t = (0, R.M)(e);
              h((e) =>
                Object.fromEntries(
                  Object.entries(e).filter((e) => {
                    let [i] = e;
                    return i !== t;
                  }),
                ),
              );
            }),
            (d[13] = h),
            (d[14] = i))
          : (i = d[14]);
        let p = i;
        ((r = T.s),
          (s = x.id),
          (n = c),
          (a =
            l.length > 0
              ? (0, t.jsx)(T.O, {
                  onClick: () => h({}),
                  children: u("web.info_bar.show_all_hidden"),
                })
              : void 0),
          (o =
            l.length > 0
              ? (0, t.jsx)(L, {
                  listLabel: c,
                  chips: l.map((e) => {
                    let t = (0, M.f)({
                      address: e.address,
                      username: e.username || null,
                    });
                    return {
                      id: e.address,
                      label: (0, _.T)(t, "user-name"),
                      unhideLabel: u("web.info_bar.unhide_profile", {
                        name: t,
                      }),
                    };
                  }),
                  onUnhide: p,
                })
              : null),
          (d[0] = x.id),
          (d[1] = x.labelKey),
          (d[2] = m),
          (d[3] = h),
          (d[4] = u),
          (d[5] = r),
          (d[6] = s),
          (d[7] = n),
          (d[8] = a),
          (d[9] = o));
      } else ((r = d[5]), (s = d[6]), (n = d[7]), (a = d[8]), (o = d[9]));
      return (
        d[15] !== r || d[16] !== s || d[17] !== n || d[18] !== a || d[19] !== o
          ? ((c = (0, t.jsx)(r, {
              settingId: s,
              title: n,
              control: a,
              children: o,
            })),
            (d[15] = r),
            (d[16] = s),
            (d[17] = n),
            (d[18] = a),
            (d[19] = o),
            (d[20] = c))
          : (c = d[20]),
        c
      );
    },
    "info-bar-dust-floor": function (e) {
      let r,
        s,
        n,
        a,
        o,
        c = (0, i.c)(17),
        { definition: d } = e,
        { t: x } = (0, l.f)(),
        { address: u } = (0, D.F)(),
        m = d.id;
      return (
        c[0] !== d.labelKey || c[1] !== x
          ? ((r = (0, K.f)(x, d.labelKey)),
            (c[0] = d.labelKey),
            (c[1] = x),
            (c[2] = r))
          : (r = c[2]),
        c[3] !== d.descriptionKey || c[4] !== x
          ? ((s = d.descriptionKey ? (0, K.f)(x, d.descriptionKey) : void 0),
            (c[3] = d.descriptionKey),
            (c[4] = x),
            (c[5] = s))
          : (s = c[5]),
        c[6] !== u || c[7] !== x
          ? ((n = u ? void 0 : x("web.info_bar.signed_out_positions")),
            (c[6] = u),
            (c[7] = x),
            (c[8] = n))
          : (n = c[8]),
        c[9] !== u
          ? ((a = u
              ? (0, t.jsx)(F.f, {
                  address: u,
                  density: "comfortable",
                  surface: "info-bar",
                  className: "max-w-xs",
                })
              : null),
            (c[9] = u),
            (c[10] = a))
          : (a = c[10]),
        c[11] !== d.id ||
        c[12] !== r ||
        c[13] !== s ||
        c[14] !== n ||
        c[15] !== a
          ? ((o = (0, t.jsx)(T.s, {
              settingId: m,
              title: r,
              description: s,
              note: n,
              children: a,
            })),
            (c[11] = d.id),
            (c[12] = r),
            (c[13] = s),
            (c[14] = n),
            (c[15] = a),
            (c[16] = o))
          : (o = c[16]),
        o
      );
    },
  };
  var el = e.i(196796);
  let ea = /^\d*\.?\d*$/;
  function eo(e) {
    let r,
      s,
      l,
      a,
      o,
      c,
      d,
      x = (0, i.c)(20),
      {
        value: u,
        onCommit: m,
        min: h,
        step: p,
        unit: f,
        label: y,
        isDisabled: b,
      } = e,
      [g, j] = (0, n.useState)(null),
      v = g ?? String(u);
    x[0] !== h || x[1] !== m
      ? ((r = (e) => {
          let t = Number(e);
          "" !== e &&
            Number.isFinite(t) &&
            t > 0 &&
            m(void 0 !== h ? Math.max(t, h) : t);
        }),
        (x[0] = h),
        (x[1] = m),
        (x[2] = r))
      : (r = x[2]);
    let w = r;
    return (
      x[3] !== u
        ? ((s = () => j(String(u))), (x[3] = u), (x[4] = s))
        : (s = x[4]),
      x[5] !== w
        ? ((l = (e) => {
            let t = e.currentTarget.value.replace(/,/g, ".");
            ea.test(t) && !(t.length > 12) && (j(t), w(t));
          }),
          (x[5] = w),
          (x[6] = l))
        : (l = x[6]),
      x[7] === Symbol.for("react.memo_cache_sentinel")
        ? ((a = () => j(null)), (x[7] = a))
        : (a = x[7]),
      x[8] !== b ||
      x[9] !== y ||
      x[10] !== v ||
      x[11] !== p ||
      x[12] !== s ||
      x[13] !== l
        ? ((o = (0, t.jsx)("input", {
            type: "text",
            inputMode: "decimal",
            autoComplete: "off",
            spellCheck: !1,
            "aria-label": y,
            disabled: b,
            step: p,
            className:
              "w-full min-w-0 bg-transparent text-right text-[13px] tabular-nums text-text-primary outline-none disabled:opacity-50",
            value: v,
            onFocus: s,
            onChange: l,
            onBlur: a,
          })),
          (x[8] = b),
          (x[9] = y),
          (x[10] = v),
          (x[11] = p),
          (x[12] = s),
          (x[13] = l),
          (x[14] = o))
        : (o = x[14]),
      x[15] !== f
        ? ((c = f
            ? (0, t.jsx)("span", {
                className:
                  "pointer-events-none shrink-0 text-[11px] font-medium uppercase tracking-wide text-text-tertiary",
                children: f,
              })
            : null),
          (x[15] = f),
          (x[16] = c))
        : (c = x[16]),
      x[17] !== o || x[18] !== c
        ? ((d = (0, t.jsxs)("div", {
            className: `${C} w-28`,
            children: [o, c],
          })),
          (x[17] = o),
          (x[18] = c),
          (x[19] = d))
        : (d = x[19]),
      d
    );
  }
  var ec = e.i(416380);
  function ed(e) {
    let r,
      s,
      n,
      a,
      o,
      c,
      d = (0, i.c)(51),
      { definition: x, compact: u } = e,
      m = void 0 !== u && u,
      { t: h } = (0, l.f)(),
      p = x.id,
      f = (0, W.o)(p),
      y = (0, W.Z)(p),
      b = (0, el.f)(),
      g = x.control;
    if ("hidden" === g.kind) return null;
    if ("custom" === g.kind) {
      let e,
        i = en[g.component];
      return i
        ? (d[0] !== i || d[1] !== x
            ? ((e = (0, t.jsx)(i, { definition: x })),
              (d[0] = i),
              (d[1] = x),
              (d[2] = e))
            : (e = d[2]),
          e)
        : null;
    }
    d[3] !== x.labelKey || d[4] !== h
      ? ((r = (0, K.f)(h, x.labelKey)),
        (d[3] = x.labelKey),
        (d[4] = h),
        (d[5] = r))
      : (r = d[5]);
    let j = r;
    d[6] !== m || d[7] !== x.descriptionKey || d[8] !== h
      ? ((s = x.descriptionKey && !m ? (0, K.f)(h, x.descriptionKey) : void 0),
        (d[6] = m),
        (d[7] = x.descriptionKey),
        (d[8] = h),
        (d[9] = s))
      : (s = d[9]);
    let v = s,
      w = !0 === x.firstPaintSensitive && !b;
    if ("switch" === g.kind) {
      let e, i;
      return (
        d[10] !== x || d[11] !== j
          ? ((e = (0, t.jsx)(ec.f, { definition: x, label: j })),
            (d[10] = x),
            (d[11] = j),
            (d[12] = e))
          : (e = d[12]),
        d[13] !== m ||
        d[14] !== x.id ||
        d[15] !== v ||
        d[16] !== e ||
        d[17] !== j
          ? ((i = (0, t.jsx)(T.s, {
              settingId: x.id,
              title: j,
              description: v,
              dense: m,
              control: e,
            })),
            (d[13] = m),
            (d[14] = x.id),
            (d[15] = v),
            (d[16] = e),
            (d[17] = j),
            (d[18] = i))
          : (i = d[18]),
        i
      );
    }
    if ("number" === g.kind) {
      let e,
        i,
        r,
        s = "number" == typeof f ? f : Number(f);
      return (
        d[19] !== y
          ? ((e = (e) => y(e)), (d[19] = y), (d[20] = e))
          : (e = d[20]),
        d[21] !== g.min ||
        d[22] !== g.step ||
        d[23] !== g.unit ||
        d[24] !== w ||
        d[25] !== s ||
        d[26] !== e ||
        d[27] !== j
          ? ((i = (0, t.jsx)(eo, {
              value: s,
              onCommit: e,
              min: g.min,
              step: g.step,
              unit: g.unit,
              label: j,
              isDisabled: w,
            })),
            (d[21] = g.min),
            (d[22] = g.step),
            (d[23] = g.unit),
            (d[24] = w),
            (d[25] = s),
            (d[26] = e),
            (d[27] = j),
            (d[28] = i))
          : (i = d[28]),
        d[29] !== x.id || d[30] !== v || d[31] !== i || d[32] !== j
          ? ((r = (0, t.jsx)(T.s, {
              settingId: x.id,
              title: j,
              description: v,
              control: i,
            })),
            (d[29] = x.id),
            (d[30] = v),
            (d[31] = i),
            (d[32] = j),
            (d[33] = r))
          : (r = d[33]),
        r
      );
    }
    (d[34] !== y ? ((n = (e) => y(e)), (d[34] = y), (d[35] = n)) : (n = d[35]),
      d[36] !== g.options ||
      d[37] !== w ||
      d[38] !== n ||
      d[39] !== j ||
      d[40] !== f
        ? ((a = (0, t.jsx)(I, {
            options: g.options,
            value: f,
            onChange: n,
            label: j,
            isDisabled: w,
          })),
          (d[36] = g.options),
          (d[37] = w),
          (d[38] = n),
          (d[39] = j),
          (d[40] = f),
          (d[41] = a))
        : (a = d[41]));
    let N = a;
    d[42] !== g.options || d[43] !== h
      ? ((o = !g.options.some(ex) && P(g.options.map((e) => S(h, e)))),
        (d[42] = g.options),
        (d[43] = h),
        (d[44] = o))
      : (o = d[44]);
    let _ = o;
    return (
      d[45] !== x.id || d[46] !== v || d[47] !== _ || d[48] !== N || d[49] !== j
        ? ((c = _
            ? (0, t.jsx)(T.s, {
                settingId: x.id,
                title: j,
                description: v,
                control: N,
              })
            : (0, t.jsx)(T.s, {
                settingId: x.id,
                title: j,
                description: v,
                children: N,
              })),
          (d[45] = x.id),
          (d[46] = v),
          (d[47] = _),
          (d[48] = N),
          (d[49] = j),
          (d[50] = c))
        : (c = d[50]),
      c
    );
  }
  function ex(e) {
    return v(e.preview);
  }
  var eu = e.i(322315),
    em = e.i(254010);
  let eh = () => {
    let e,
      t = (0, i.c)(3),
      r = (0, em.k)(eu.D.WEB_SAFE_MODE),
      s = (0, em.k)(eu.D.WEB_EXPLORE_SOCIAL_TERMINAL);
    return (
      t[0] !== r || t[1] !== s
        ? ((e = new Set()),
          r || e.add("trading.safeModeDisabled"),
          s || (e.add("feed.exploreWindow"), e.add("feed.exploreRisingRows")),
          (t[0] = r),
          (t[1] = s),
          (t[2] = e))
        : (e = t[2]),
      e
    );
  };
  var ep = e.i(272700);
  let ef = (e) =>
    e.toLocaleLowerCase().normalize("NFKD").replace(/\p{M}/gu, "");
  var ey = e.i(532757);
  function eb(e) {
    let r,
      s,
      n,
      a,
      o,
      c,
      d,
      x = (0, i.c)(31),
      { query: u, visibleSections: m } = e,
      { t: h } = (0, l.f)(),
      p = eh();
    x[0] !== h
      ? ((r = (e) => {
          let t = ey.n.find((t) => t.id === e);
          return t ? (0, K.f)(h, t.labelKey) : e;
        }),
        (x[0] = h),
        (x[1] = r))
      : (r = x[1]);
    let f = r;
    if (x[2] !== p || x[3] !== u || x[4] !== f || x[5] !== h || x[6] !== m) {
      c = Symbol.for("react.early_return_sentinel");
      e: {
        let e, i, r;
        (x[12] !== p || x[13] !== m
          ? ((e = (e) => m.includes(e.section) && !p.has(e.id)),
            (x[12] = p),
            (x[13] = m),
            (x[14] = e))
          : (e = x[14]),
          x[15] !== h
            ? ((i = (e) => (0, K.f)(h, e)), (x[15] = h), (x[16] = i))
            : (i = x[16]),
          x[17] !== f
            ? ((r = (e) => f(e.section)), (x[17] = f), (x[18] = r))
            : (r = x[18]));
        let l = (({
          query: e,
          definitions: t,
          translate: i,
          sectionLabelOf: r,
        }) => {
          let s = ef(e).split(/\s+/).filter(Boolean);
          return 0 === s.length
            ? []
            : t.filter((e) => {
                if ("hidden" === e.control.kind) return !1;
                let t = (({ definition: e, translate: t, sectionLabel: i }) =>
                  ef(
                    [
                      t(e.labelKey),
                      e.descriptionKey ? t(e.descriptionKey) : "",
                      ...(e.searchTerms ?? []),
                      i,
                      e.id.replace(/[.]/g, " "),
                    ].join(" "),
                  ))({ definition: e, translate: i, sectionLabel: r(e) });
                return s.every((e) => t.includes(e));
              });
        })({
          query: u,
          definitions: ep.g.filter(e),
          translate: i,
          sectionLabelOf: r,
        });
        if (0 === l.length) {
          let e, i;
          (x[19] !== u || x[20] !== h
            ? ((e = h("web.settings.search_empty", { query: u })),
              (x[19] = u),
              (x[20] = h),
              (x[21] = e))
            : (e = x[21]),
            x[22] !== e
              ? ((i = (0, t.jsx)("p", {
                  role: "status",
                  className:
                    "px-1 py-12 text-center text-sm text-text-tertiary",
                  children: e,
                })),
                (x[22] = e),
                (x[23] = i))
              : (i = x[23]),
            (c = i));
          break e;
        }
        let d = new Map();
        for (let e of l) {
          let t = d.get(e.section) ?? [];
          (t.push(e), d.set(e.section, t));
        }
        ((s = "region"),
          x[24] !== h
            ? ((n = h("web.settings.search_results")), (x[24] = h), (x[25] = n))
            : (n = x[25]),
          (a = "flex flex-col gap-7 pt-1"),
          (o = ey.n
            .filter((e) => d.has(e.id))
            .map((e) =>
              (0, t.jsx)(
                T.X,
                {
                  label: (0, K.f)(h, e.labelKey),
                  children: (d.get(e.id) ?? []).map(eg),
                },
                e.id,
              ),
            )));
      }
      ((x[2] = p),
        (x[3] = u),
        (x[4] = f),
        (x[5] = h),
        (x[6] = m),
        (x[7] = s),
        (x[8] = n),
        (x[9] = a),
        (x[10] = o),
        (x[11] = c));
    } else ((s = x[7]), (n = x[8]), (a = x[9]), (o = x[10]), (c = x[11]));
    return c !== Symbol.for("react.early_return_sentinel")
      ? c
      : (x[26] !== s || x[27] !== n || x[28] !== a || x[29] !== o
          ? ((d = (0, t.jsx)("div", {
              role: s,
              "aria-label": n,
              className: a,
              children: o,
            })),
            (x[26] = s),
            (x[27] = n),
            (x[28] = a),
            (x[29] = o),
            (x[30] = d))
          : (d = x[30]),
        d);
  }
  function eg(e) {
    return (0, t.jsx)(ed, { definition: e }, e.id);
  }
  var ej = e.i(917781),
    ev = e.i(599077),
    ew = e.i(869955),
    eN = e.i(371622),
    eK = e.i(70023),
    e_ = e.i(624876),
    eC = e.i(549418);
  function ek() {
    let e,
      s,
      n,
      a,
      o = (0, i.c)(9),
      { t: c } = (0, l.f)(),
      { openDialog: d, dialog: x } = (0, eC.f)();
    return (
      o[0] === Symbol.for("react.memo_cache_sentinel")
        ? ((e = (0, t.jsx)(r.bO, { className: "size-4" })), (o[0] = e))
        : (e = o[0]),
      o[1] !== c
        ? ((s = c("settings.delete_account")), (o[1] = c), (o[2] = s))
        : (s = o[2]),
      o[3] !== d || o[4] !== s
        ? ((n = (0, t.jsx)(T.D, {
            icon: e,
            label: s,
            tone: "danger",
            onClick: d,
            testId: "settings-action-delete-account",
          })),
          (o[3] = d),
          (o[4] = s),
          (o[5] = n))
        : (n = o[5]),
      o[6] !== x || o[7] !== n
        ? ((a = (0, t.jsxs)(t.Fragment, { children: [n, x] })),
          (o[6] = x),
          (o[7] = n),
          (o[8] = a))
        : (a = o[8]),
      a
    );
  }
  var eS = e.i(21384),
    eP = e.i(338871),
    eI = e.i(595673),
    eA = e.i(198825);
  function eT() {
    let e,
      a,
      o,
      c,
      d,
      x,
      u,
      m,
      h,
      p,
      f,
      y,
      b,
      g,
      j,
      v,
      w,
      N,
      K,
      _,
      C,
      k,
      S,
      P,
      I,
      A,
      O,
      W,
      z,
      F,
      L,
      M = (0, i.c)(83),
      { t: R } = (0, l.f)(),
      { push: $ } = (0, ev.useRouter)(),
      { address: B, shouldUsePrivy: E } = (0, D.F)(),
      { reader: q, ownsSessionWallet: X } = (0, eS.f)(),
      {
        setShowDeposit: U,
        setShowExport: H,
        setShowWithdraw: V,
      } = (0, eA.useConnectWallet)(),
      { toggleChat: Z, isBooting: G } = (0, eP.f)(),
      { signOut: Q, privyReader: Y } = (0, e_.f)(),
      [J, ee] = (0, n.useState)(!1),
      [et, ei] = (0, n.useState)(!1);
    return B
      ? (M[0] !== R
          ? ((e = R("web.settings.account.connection")), (M[0] = R), (M[1] = e))
          : (e = M[1]),
        M[2] === Symbol.for("react.memo_cache_sentinel")
          ? ((a = (0, t.jsx)(ew.a, { compact: !0, className: "py-2.5" })),
            (M[2] = a))
          : (a = M[2]),
        M[3] !== e
          ? ((o = (0, t.jsx)(T.X, { label: e, children: a })),
            (M[3] = e),
            (M[4] = o))
          : (o = M[4]),
        M[5] !== R
          ? ((c = R("web.settings.account.wallet_actions")),
            (M[5] = R),
            (M[6] = c))
          : (c = M[6]),
        M[7] === Symbol.for("react.memo_cache_sentinel")
          ? ((d = (0, t.jsx)(r.YC, { className: "size-4" })), (M[7] = d))
          : (d = M[7]),
        M[8] !== R
          ? ((x = R("common.deposit")), (M[8] = R), (M[9] = x))
          : (x = M[9]),
        M[10] !== U
          ? ((u = () => {
              ((0, eI.xm)(), U(!0));
            }),
            (M[10] = U),
            (M[11] = u))
          : (u = M[11]),
        M[12] !== x || M[13] !== u
          ? ((m = (0, t.jsx)(T.D, {
              icon: d,
              label: x,
              onClick: u,
              testId: "settings-action-deposit",
            })),
            (M[12] = x),
            (M[13] = u),
            (M[14] = m))
          : (m = M[14]),
        M[15] !== B || M[16] !== V || M[17] !== E || M[18] !== R
          ? ((h = E
              ? (0, t.jsx)(T.D, {
                  icon: (0, t.jsx)(r.q4, { className: "size-4" }),
                  label: R("web.account.withdraw"),
                  onClick: () => {
                    ((0, eI.sT)({ profileId: B }), V(!0));
                  },
                  testId: "settings-action-withdraw",
                })
              : null),
            (M[15] = B),
            (M[16] = V),
            (M[17] = E),
            (M[18] = R),
            (M[19] = h))
          : (h = M[19]),
        M[20] !== H || M[21] !== E || M[22] !== R
          ? ((p = E
              ? (0, t.jsx)(T.D, {
                  icon: (0, t.jsx)(r.bi, { className: "size-4" }),
                  label: R("settings.export_wallet"),
                  onClick: () => {
                    ((0, eI.Gu)(), H(!0));
                  },
                  testId: "settings-action-export-wallet",
                })
              : null),
            (M[20] = H),
            (M[21] = E),
            (M[22] = R),
            (M[23] = p))
          : (p = M[23]),
        M[24] !== c || M[25] !== m || M[26] !== h || M[27] !== p
          ? ((f = (0, t.jsxs)(T.X, { label: c, children: [m, h, p] })),
            (M[24] = c),
            (M[25] = m),
            (M[26] = h),
            (M[27] = p),
            (M[28] = f))
          : (f = M[28]),
        M[29] !== R
          ? ((y = R("web.x_link.group_label")), (M[29] = R), (M[30] = y))
          : (y = M[30]),
        M[31] === Symbol.for("react.memo_cache_sentinel")
          ? ((b = (0, t.jsx)(r.Tc, { className: "size-4" })), (M[31] = b))
          : (b = M[31]),
        M[32] !== R
          ? ((g = R("web.x_link.title")), (M[32] = R), (M[33] = g))
          : (g = M[33]),
        M[34] === Symbol.for("react.memo_cache_sentinel")
          ? ((j = () => ei(!0)), (M[34] = j))
          : (j = M[34]),
        M[35] !== g
          ? ((v = (0, t.jsx)(T.D, {
              icon: b,
              label: g,
              onClick: j,
              testId: "settings-action-x-link",
            })),
            (M[35] = g),
            (M[36] = v))
          : (v = M[36]),
        M[37] !== y || M[38] !== v
          ? ((w = (0, t.jsx)(T.X, { label: y, children: v })),
            (M[37] = y),
            (M[38] = v),
            (M[39] = w))
          : (w = M[39]),
        M[40] !== R
          ? ((N = R("web.settings.account.session")), (M[40] = R), (M[41] = N))
          : (N = M[41]),
        M[42] !== X || M[43] !== $ || M[44] !== R
          ? ((K = X
              ? (0, t.jsx)(T.D, {
                  icon: (0, t.jsx)(r._6, { className: "size-4" }),
                  label: R("account.management.title"),
                  onClick: () => $(eN.p),
                  testId: "settings-action-account-management",
                })
              : null),
            (M[42] = X),
            (M[43] = $),
            (M[44] = R),
            (M[45] = K))
          : (K = M[45]),
        M[46] === Symbol.for("react.memo_cache_sentinel")
          ? ((_ = (0, t.jsx)(r.aj, { className: "size-4" })), (M[46] = _))
          : (_ = M[46]),
        M[47] !== R
          ? ((C = R("common.support")), (M[47] = R), (M[48] = C))
          : (C = M[48]),
        M[49] !== G || M[50] !== C || M[51] !== Z
          ? ((k = (0, t.jsx)(T.D, {
              icon: _,
              label: C,
              onClick: Z,
              busy: G,
              testId: "settings-action-support",
            })),
            (M[49] = G),
            (M[50] = C),
            (M[51] = Z),
            (M[52] = k))
          : (k = M[52]),
        M[53] === Symbol.for("react.memo_cache_sentinel")
          ? ((S = (0, t.jsx)(r.jC, { className: "size-4" })), (M[53] = S))
          : (S = M[53]),
        M[54] !== R
          ? ((P = R("account.logout")), (M[54] = R), (M[55] = P))
          : (P = M[55]),
        M[56] === Symbol.for("react.memo_cache_sentinel")
          ? ((I = () => ee(!0)), (M[56] = I))
          : (I = M[56]),
        M[57] !== J || M[58] !== Q || M[59] !== R
          ? ((A = J
              ? (0, t.jsxs)("div", {
                  role: "group",
                  "aria-label": R("account.logout"),
                  className:
                    "mx-3 mb-2 flex items-center justify-between gap-3 rounded-lg bg-bg-secondary px-3 py-2.5 ring-1 ring-inset ring-border-secondary/60",
                  children: [
                    (0, t.jsx)("p", {
                      className: "text-xs text-text-tertiary",
                      children: R("web.session.logout_confirm_description"),
                    }),
                    (0, t.jsxs)("div", {
                      className: "flex shrink-0 gap-2",
                      children: [
                        (0, t.jsx)(s.K, {
                          variant: "secondary",
                          size: 32,
                          onClick: () => ee(!1),
                          children: R("web.session.no"),
                        }),
                        (0, t.jsx)(s.K, {
                          variant: "primary",
                          size: 32,
                          className: "bg-loss text-bg-primary hover:bg-loss/90",
                          onClick: () => {
                            (ee(!1), Q());
                          },
                          children: R("common.yes"),
                        }),
                      ],
                    }),
                  ],
                })
              : null),
            (M[57] = J),
            (M[58] = Q),
            (M[59] = R),
            (M[60] = A))
          : (A = M[60]),
        M[61] !== P || M[62] !== A
          ? ((O = (0, t.jsx)(T.D, {
              icon: S,
              label: P,
              tone: "danger",
              onClick: I,
              testId: "settings-action-logout",
              children: A,
            })),
            (M[61] = P),
            (M[62] = A),
            (M[63] = O))
          : (O = M[63]),
        M[64] !== X || M[65] !== E
          ? ((W = E && X ? (0, t.jsx)(ek, {}) : null),
            (M[64] = X),
            (M[65] = E),
            (M[66] = W))
          : (W = M[66]),
        M[67] !== N || M[68] !== K || M[69] !== k || M[70] !== O || M[71] !== W
          ? ((z = (0, t.jsxs)(T.X, { label: N, children: [K, k, O, W] })),
            (M[67] = N),
            (M[68] = K),
            (M[69] = k),
            (M[70] = O),
            (M[71] = W),
            (M[72] = z))
          : (z = M[72]),
        M[73] !== et
          ? ((F = (0, t.jsx)(eK.f, { open: et, onOpenChange: ei })),
            (M[73] = et),
            (M[74] = F))
          : (F = M[74]),
        M[75] !== q ||
        M[76] !== Y ||
        M[77] !== f ||
        M[78] !== w ||
        M[79] !== o ||
        M[80] !== z ||
        M[81] !== F
          ? ((L = (0, t.jsxs)(t.Fragment, { children: [o, f, w, z, F, Y, q] })),
            (M[75] = q),
            (M[76] = Y),
            (M[77] = f),
            (M[78] = w),
            (M[79] = o),
            (M[80] = z),
            (M[81] = F),
            (M[82] = L))
          : (L = M[82]),
        L)
      : null;
  }
  var eO = e.i(663930);
  function eW(e) {
    let r,
      n,
      a,
      o,
      c,
      d,
      x = (0, i.c)(15),
      { onOpen: u } = e,
      { t: m } = (0, l.f)();
    return (
      x[0] !== m
        ? ((r = m("web.settings.privacy.cookies")), (x[0] = m), (x[1] = r))
        : (r = x[1]),
      x[2] !== m
        ? ((n = m("web.settings.privacy.cookies_description")),
          (x[2] = m),
          (x[3] = n))
        : (n = x[3]),
      x[4] !== u
        ? ((a = () => {
            (u?.(), (0, eO.C)());
          }),
          (x[4] = u),
          (x[5] = a))
        : (a = x[5]),
      x[6] !== m
        ? ((o = m("web.settings.privacy.manage_cookies")),
          (x[6] = m),
          (x[7] = o))
        : (o = x[7]),
      x[8] !== a || x[9] !== o
        ? ((c = (0, t.jsx)(s.K, {
            variant: "secondary",
            size: 32,
            onClick: a,
            children: o,
          })),
          (x[8] = a),
          (x[9] = o),
          (x[10] = c))
        : (c = x[10]),
      x[11] !== r || x[12] !== n || x[13] !== c
        ? ((d = (0, t.jsx)(T.s, {
            settingId: "privacy.cookies",
            title: r,
            description: n,
            control: c,
          })),
          (x[11] = r),
          (x[12] = n),
          (x[13] = c),
          (x[14] = d))
        : (d = x[14]),
      d
    );
  }
  let ez = new Set([
      "trading.presets",
      "trading.autoApprove",
      "trading.priorityLevel",
    ]),
    eD = {
      trading: [
        { labelKey: "web.trade.execution", match: (e) => ez.has(e) },
        {
          labelKey: "web.trade.quick_buy",
          match: (e) =>
            e.startsWith("trading.quickBuy.") ||
            e.startsWith("trading.quickSell.") ||
            "trading.profileQuickTradeButtons" === e,
        },
        {
          labelKey: "coin_details.chart.settings.denomination",
          match: (e) =>
            e.startsWith("trading.paymentAsset.") ||
            e.startsWith("trading.inputUnit."),
        },
      ],
      chart: [
        { match: (e) => !e.startsWith("chart.markers.") },
        {
          labelKey: "web.settings.chart.bubbles",
          descriptionKey: "web.settings.chart.bubbles_description",
          compact: !0,
          match: (e) => e.startsWith("chart.markers."),
        },
      ],
    };
  function eF(e) {
    let r,
      s,
      n,
      a,
      o,
      c,
      d = (0, i.c)(19),
      { section: x, onRequestClose: u } = e,
      { t: m } = (0, l.f)(),
      h = eh();
    if (d[0] !== h || d[1] !== u || d[2] !== x || d[3] !== m) {
      o = Symbol.for("react.early_return_sentinel");
      e: {
        var p;
        let e, i, l, c;
        d[9] !== h
          ? ((e = (e) => "hidden" !== e.control.kind && !h.has(e.id)),
            (d[9] = h),
            (d[10] = e))
          : (e = d[10]);
        let f = (0, ep.n)(x).filter(e);
        if ("notifications" === x) {
          let e;
          (d[11] === Symbol.for("react.memo_cache_sentinel")
            ? ((e = (0, t.jsx)("div", {
                className: "pt-1",
                children: (0, t.jsx)(ej.NotificationSettingsSections, {}),
              })),
              (d[11] = e))
            : (e = d[11]),
            (o = e));
          break e;
        }
        let y =
            ((p = eD[x] ?? [{ match: eM }]),
            (i = new Set()),
            (l = p.map((e) => {
              let t = f.filter((t) => !i.has(t.id) && e.match(t.id));
              for (let e of t) i.add(e.id);
              return { group: e, rows: t };
            })),
            (c = f.filter((e) => !i.has(e.id))).length > 0 &&
              l.push({ group: { match: () => !0 }, rows: c }),
            l.filter((e) => e.rows.length > 0)),
          b = y.map((e, i) => {
            let { group: r, rows: s } = e;
            return (0, t.jsxs)(
              T.X,
              {
                label: r.labelKey ? (0, K.f)(m, r.labelKey) : void 0,
                description: r.descriptionKey
                  ? (0, K.f)(m, r.descriptionKey)
                  : void 0,
                children: [
                  s.map((e) =>
                    (0, t.jsx)(ed, { definition: e, compact: r.compact }, e.id),
                  ),
                  "privacy" === x && i === y.length - 1
                    ? (0, t.jsx)(eW, { onOpen: u })
                    : null,
                ],
              },
              r.labelKey ?? `run-${i}`,
            );
          });
        ((r = `settings-section-${x}`),
          (s = "flex flex-col gap-7 pt-1"),
          d[12] !== x
            ? ((n = "account" === x ? (0, t.jsx)(eT, {}) : null),
              (d[12] = x),
              (d[13] = n))
            : (n = d[13]),
          (a =
            "account" === x && b.length > 0
              ? (0, t.jsx)(T.X, {
                  label: m("web.settings.account.profile"),
                  children: f.map(eL),
                })
              : b));
      }
      ((d[0] = h),
        (d[1] = u),
        (d[2] = x),
        (d[3] = m),
        (d[4] = r),
        (d[5] = s),
        (d[6] = n),
        (d[7] = a),
        (d[8] = o));
    } else ((r = d[4]), (s = d[5]), (n = d[6]), (a = d[7]), (o = d[8]));
    return o !== Symbol.for("react.early_return_sentinel")
      ? o
      : (d[14] !== r || d[15] !== s || d[16] !== n || d[17] !== a
          ? ((c = (0, t.jsxs)("div", {
              "data-testid": r,
              className: s,
              children: [n, a],
            })),
            (d[14] = r),
            (d[15] = s),
            (d[16] = n),
            (d[17] = a),
            (d[18] = c))
          : (c = d[18]),
        c);
  }
  function eL(e) {
    return (0, t.jsx)(ed, { definition: e }, e.id);
  }
  function eM() {
    return !0;
  }
  var eR = e.i(833997),
    e$ = e.i(411657),
    eB = e.i(592209);
  let eE = [0, 1, 2, 3, 4];
  function eq() {
    let e,
      r = (0, i.c)(1);
    return (
      r[0] === Symbol.for("react.memo_cache_sentinel")
        ? ((e = (0, t.jsx)("div", {
            "aria-hidden": !0,
            className: "flex flex-col divide-y divide-border-secondary",
            children: eE.map(eX),
          })),
          (r[0] = e))
        : (e = r[0]),
      e
    );
  }
  function eX(e) {
    return (0, t.jsxs)(
      "div",
      {
        className: "flex items-center justify-between gap-6 py-4",
        children: [
          (0, t.jsxs)("div", {
            className: "flex flex-col gap-2",
            children: [
              (0, t.jsx)("div", {
                className: "h-3 w-40 animate-pulse rounded bg-bg-tertiary",
              }),
              (0, t.jsx)("div", {
                className: "h-2.5 w-64 animate-pulse rounded bg-bg-secondary",
              }),
            ],
          }),
          (0, t.jsx)("div", {
            className: "h-5 w-9 animate-pulse rounded-full bg-bg-secondary",
          }),
        ],
      },
      e,
    );
  }
  function eU(e) {
    return !1 !== e.resettable;
  }
  function eH(e) {
    return e.id;
  }
  e.s(
    [
      "SettingsModal",
      0,
      function (e) {
        let o,
          c,
          d,
          x,
          u,
          m,
          h,
          p,
          f,
          y,
          b,
          g,
          j,
          v,
          w,
          N,
          _,
          C,
          k,
          S,
          P,
          I,
          A,
          T,
          O,
          W,
          z,
          F,
          L,
          M,
          R,
          $,
          B,
          E,
          q,
          X = (0, i.c)(100),
          { section: U, focusSettingId: H, onSectionChange: Z, onClose: G } = e,
          { t: Q } = (0, l.f)(),
          Y = (() => {
            let e,
              t,
              r = (0, i.c)(6),
              s = (0, em.k)(eu.D.WEB_HERMES_NOTIFICATIONS),
              { address: n } = (0, D.F)(),
              l = (0, eR.f)("pump.settings_admin.open");
            return (
              r[0] !== n || r[1] !== s || r[2] !== l
                ? ((e = new Set()),
                  s || e.add("notifications"),
                  n || e.add("account"),
                  l || e.add("admin"),
                  (r[0] = n),
                  (r[1] = s),
                  (r[2] = l),
                  (r[3] = e))
                : (e = r[3]),
              r[4] !== e
                ? ((t = ey.n.filter((t) => !e.has(t.id))),
                  (r[4] = e),
                  (r[5] = t))
                : (t = r[5]),
              t
            );
          })(),
          J = (() => {
            let e,
              t,
              r,
              s = (0, i.c)(6),
              { i18n: a } = (0, l.f)();
            s[0] !== a
              ? ((e = () => a.exists("web.trade.max_slippage")),
                (s[0] = a),
                (s[1] = e))
              : (e = s[1]);
            let [o, c] = (0, n.useState)(e);
            return (
              s[2] !== a || s[3] !== o
                ? ((t = () => {
                    if (o) return;
                    let e = !1,
                      t = (0, eB.v)(a.language) ?? eB.T;
                    return (
                      (0, e$.u)(a, t).finally(() => {
                        e || c(!0);
                      }),
                      () => {
                        e = !0;
                      }
                    );
                  }),
                  (r = [a, o]),
                  (s[2] = a),
                  (s[3] = o),
                  (s[4] = t),
                  (s[5] = r))
                : ((t = s[4]), (r = s[5])),
              (0, n.useEffect)(t, r),
              o
            );
          })(),
          ee = (0, a.h)(H),
          [et, ei] = (0, n.useState)(""),
          [er, es] = (0, n.useState)(!1),
          en = (0, n.useId)(),
          el = (0, n.useRef)(null),
          ea = Y.map(eH),
          eo = ea.includes(U) ? U : (ea[0] ?? "trading"),
          ec = Y.find((e) => e.id === eo),
          ed = ec ? (0, K.f)(Q, ec.labelKey) : "";
        X[0] !== et ? ((o = et.trim()), (X[0] = et), (X[1] = o)) : (o = X[1]);
        let ex = o.length > 0,
          eh = !ex && (0, ep.n)(eo).some(eU),
          ef = !ex && "notifications" !== eo;
        (X[2] === Symbol.for("react.memo_cache_sentinel")
          ? ((c = () => {
              el.current?.scrollTo?.({ top: 0 });
            }),
            (X[2] = c))
          : (c = X[2]),
          X[3] !== eo || X[4] !== ex
            ? ((d = [eo, ex]), (X[3] = eo), (X[4] = ex), (X[5] = d))
            : (d = X[5]),
          (0, n.useEffect)(c, d),
          X[6] !== Z
            ? ((x = (e) => {
                (es(!1), Z(e));
              }),
              (X[6] = Z),
              (X[7] = x))
            : (x = X[7]));
        let eg = x,
          ej = s.v;
        X[8] !== G
          ? ((u = (e) => {
              e || G();
            }),
            (X[8] = G),
            (X[9] = u))
          : (u = X[9]);
        let ev = s.s;
        if (
          (X[10] !== Q
            ? ((m = Q("web.settings.title")), (X[10] = Q), (X[11] = m))
            : (m = X[11]),
          X[12] !== m
            ? ((h = (0, t.jsx)("h2", {
                className: "text-[15px] font-semibold text-text-primary",
                children: m,
              })),
              (X[12] = m),
              (X[13] = h))
            : (h = X[13]),
          X[14] !== Q
            ? ((p = Q("web.settings.close")), (X[14] = Q), (X[15] = p))
            : (p = X[15]),
          X[16] === Symbol.for("react.memo_cache_sentinel")
            ? ((f = (0, t.jsx)(r.x6, { className: "size-4" })), (X[16] = f))
            : (f = X[16]),
          X[17] !== G || X[18] !== p
            ? ((y = (0, t.jsx)("button", {
                type: "button",
                onClick: G,
                "aria-label": p,
                className:
                  "-mr-1.5 flex size-7 items-center justify-center rounded-md text-text-tertiary transition-colors hover:bg-bg-secondary hover:text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-text-accent/40",
                children: f,
              })),
              (X[17] = G),
              (X[18] = p),
              (X[19] = y))
            : (y = X[19]),
          X[20] !== h || X[21] !== y
            ? ((b = (0, t.jsxs)("div", {
                className: "flex items-center justify-between gap-3",
                children: [h, y],
              })),
              (X[20] = h),
              (X[21] = y),
              (X[22] = b))
            : (b = X[22]),
          X[23] !== eg
            ? ((g = (e) => eg(e)), (X[23] = eg), (X[24] = g))
            : (g = X[24]),
          X[25] !== Q
            ? ((j = Q("web.settings.title")), (X[25] = Q), (X[26] = j))
            : (j = X[26]),
          X[27] !== Y || X[28] !== Q)
        ) {
          let e;
          (X[30] !== Q
            ? ((e = (e) =>
                (0, t.jsx)(
                  s.V,
                  {
                    value: e.id,
                    className: "mb-1.5 px-2.5 py-1.5 text-[13px]",
                    children: (0, K.f)(Q, e.tabLabelKey),
                  },
                  e.id,
                )),
              (X[30] = Q),
              (X[31] = e))
            : (e = X[31]),
            (v = Y.map(e)),
            (X[27] = Y),
            (X[28] = Q),
            (X[29] = v));
        } else v = X[29];
        (X[32] !== j || X[33] !== v
          ? ((w = (0, t.jsx)(s.R, {
              "aria-label": j,
              className:
                "scrollbar-hide -mx-5 mt-2 border-border-secondary px-5",
              children: v,
            })),
            (X[32] = j),
            (X[33] = v),
            (X[34] = w))
          : (w = X[34]),
          X[35] !== eo || X[36] !== g || X[37] !== w
            ? ((N = (0, t.jsx)(s.i, {
                value: eo,
                onValueChange: g,
                children: w,
              })),
              (X[35] = eo),
              (X[36] = g),
              (X[37] = w),
              (X[38] = N))
            : (N = X[38]),
          X[39] !== b || X[40] !== N
            ? ((_ = (0, t.jsxs)("header", {
                className: "shrink-0 px-5 pt-4",
                children: [b, N],
              })),
              (X[39] = b),
              (X[40] = N),
              (X[41] = _))
            : (_ = X[41]),
          X[42] === Symbol.for("react.memo_cache_sentinel")
            ? ((C = (0, t.jsx)(r.L3, {
                "aria-hidden": !0,
                className: "size-4 shrink-0 text-text-tertiary",
              })),
              (X[42] = C))
            : (C = X[42]),
          X[43] === Symbol.for("react.memo_cache_sentinel")
            ? ((k = (e) => ei(e.target.value)), (X[43] = k))
            : (k = X[43]),
          X[44] !== Q
            ? ((S = Q("web.settings.search_placeholder")),
              (X[44] = Q),
              (X[45] = S))
            : (S = X[45]),
          X[46] !== Q
            ? ((P = Q("web.settings.search_aria")), (X[46] = Q), (X[47] = P))
            : (P = X[47]),
          X[48] !== et || X[49] !== en || X[50] !== S || X[51] !== P
            ? ((I = (0, t.jsx)("input", {
                id: en,
                type: "search",
                value: et,
                onChange: k,
                placeholder: S,
                "aria-label": P,
                autoComplete: "off",
                spellCheck: !1,
                className:
                  "min-w-0 flex-1 bg-transparent text-[13px] text-text-primary outline-none placeholder:text-text-tertiary [&::-webkit-search-cancel-button]:hidden",
                "data-testid": "settings-search",
              })),
              (X[48] = et),
              (X[49] = en),
              (X[50] = S),
              (X[51] = P),
              (X[52] = I))
            : (I = X[52]),
          X[53] !== ex || X[54] !== Q
            ? ((A = ex
                ? (0, t.jsx)("button", {
                    type: "button",
                    onClick: () => ei(""),
                    "aria-label": Q("web.settings.clear_search"),
                    className:
                      "-mr-1 flex size-6 shrink-0 items-center justify-center rounded-md text-text-tertiary transition-colors hover:bg-bg-tertiary hover:text-text-primary",
                    children: (0, t.jsx)(r.x6, { className: "size-3.5" }),
                  })
                : null),
              (X[53] = ex),
              (X[54] = Q),
              (X[55] = A))
            : (A = X[55]),
          X[56] !== en || X[57] !== I || X[58] !== A
            ? ((T = (0, t.jsx)("div", {
                className: "shrink-0 px-5 pt-3",
                children: (0, t.jsxs)("label", {
                  htmlFor: en,
                  className:
                    "flex h-9 items-center gap-2 rounded-lg bg-bg-secondary px-3 ring-1 ring-inset ring-border-secondary/60 transition-colors focus-within:ring-text-accent/60",
                  children: [C, I, A],
                }),
              })),
              (X[56] = en),
              (X[57] = I),
              (X[58] = A),
              (X[59] = T))
            : (T = X[59]));
        let ew = !J || void 0;
        (X[60] !== eo ||
        X[61] !== J ||
        X[62] !== ee ||
        X[63] !== G ||
        X[64] !== et ||
        X[65] !== ex ||
        X[66] !== ea
          ? ((O = J
              ? ex
                ? (0, t.jsx)(eb, { query: et.trim(), visibleSections: ea })
                : (0, t.jsx)(a._.Provider, {
                    value: ee,
                    children: (0, t.jsx)(
                      "div",
                      {
                        className: "animate-in fade-in-0 duration-200",
                        children: (0, t.jsx)(eF, {
                          section: eo,
                          onRequestClose: G,
                        }),
                      },
                      eo,
                    ),
                  })
              : (0, t.jsx)(eq, {})),
            (X[60] = eo),
            (X[61] = J),
            (X[62] = ee),
            (X[63] = G),
            (X[64] = et),
            (X[65] = ex),
            (X[66] = ea),
            (X[67] = O))
          : (O = X[67]),
          X[68] !== ew || X[69] !== O
            ? ((W = (0, t.jsx)("div", {
                ref: el,
                className:
                  "custom-scrollbar min-h-0 flex-1 overflow-y-auto px-5 pb-6 pt-4 [mask-image:linear-gradient(to_bottom,transparent,#000_16px,#000_calc(100%-20px),transparent)]",
                "aria-busy": ew,
                children: O,
              })),
              (X[68] = ew),
              (X[69] = O),
              (X[70] = W))
            : (W = X[70]));
        let eN = eh
          ? er
            ? (0, t.jsxs)("div", {
                role: "group",
                "aria-label": Q("web.settings.reset_confirm_title", {
                  section: ed,
                }),
                className: "flex min-w-0 items-center gap-2",
                children: [
                  (0, t.jsx)("p", {
                    className:
                      "hidden min-w-0 truncate text-xs text-text-tertiary sm:block",
                    children: Q("web.settings.reset_confirm_body"),
                  }),
                  (0, t.jsx)(s.K, {
                    variant: "secondary",
                    size: 32,
                    onClick: () => es(!1),
                    children: Q("common.cancel"),
                  }),
                  (0, t.jsx)(s.K, {
                    variant: "primary",
                    size: 32,
                    className: "bg-loss text-bg-primary hover:bg-loss/90",
                    onClick: () => {
                      ((0, V.t)(eo), es(!1));
                    },
                    children: Q("web.settings.reset_confirm_action"),
                  }),
                ],
              })
            : (0, t.jsxs)("button", {
                type: "button",
                onClick: () => es(!0),
                className:
                  "-ml-2 flex items-center gap-1.5 rounded-md px-2 py-1.5 text-xs font-medium text-text-tertiary transition-colors hover:bg-bg-secondary hover:text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-text-accent/40",
                children: [
                  (0, t.jsx)(r.B4, {
                    "aria-hidden": !0,
                    className: "size-3.5",
                  }),
                  Q("web.settings.reset_section"),
                ],
              })
          : null;
        return (
          X[71] !== eN
            ? ((z = (0, t.jsx)("div", {
                className: "flex min-w-0 items-center",
                children: eN,
              })),
              (X[71] = eN),
              (X[72] = z))
            : (z = X[72]),
          X[73] !== er || X[74] !== ef || X[75] !== Q
            ? ((F =
                ef && !er
                  ? (0, t.jsxs)("span", {
                      className:
                        "hidden items-center gap-1.5 text-[11px] text-text-tertiary sm:flex",
                      children: [
                        (0, t.jsx)(r.mD, {
                          "aria-hidden": !0,
                          className: "size-3.5",
                        }),
                        Q("web.settings.device_note"),
                      ],
                    })
                  : null),
              (X[73] = er),
              (X[74] = ef),
              (X[75] = Q),
              (X[76] = F))
            : (F = X[76]),
          X[77] !== Q
            ? ((L = Q("common.done")), (X[77] = Q), (X[78] = L))
            : (L = X[78]),
          X[79] !== G || X[80] !== L
            ? ((M = (0, t.jsx)(s.K, {
                variant: "primary",
                size: 32,
                onClick: G,
                children: L,
              })),
              (X[79] = G),
              (X[80] = L),
              (X[81] = M))
            : (M = X[81]),
          X[82] !== F || X[83] !== M
            ? ((R = (0, t.jsxs)("div", {
                className: "flex shrink-0 items-center gap-4",
                children: [F, M],
              })),
              (X[82] = F),
              (X[83] = M),
              (X[84] = R))
            : (R = X[84]),
          X[85] !== z || X[86] !== R
            ? (($ = (0, t.jsxs)("footer", {
                className:
                  "flex shrink-0 items-center justify-between gap-3 border-t border-border-secondary px-5 py-3",
                children: [z, R],
              })),
              (X[85] = z),
              (X[86] = R),
              (X[87] = $))
            : ($ = X[87]),
          X[88] !== _ || X[89] !== T || X[90] !== W || X[91] !== $
            ? ((B = (0, t.jsxs)("div", {
                className: "flex h-[min(82dvh,720px)] flex-col",
                children: [_, T, W, $],
              })),
              (X[88] = _),
              (X[89] = T),
              (X[90] = W),
              (X[91] = $),
              (X[92] = B))
            : (B = X[92]),
          X[93] !== ev || X[94] !== B
            ? ((E = (0, t.jsx)(ev, {
                className: "max-w-[720px] overflow-hidden p-0",
                "data-testid": "settings-modal",
                children: B,
              })),
              (X[93] = ev),
              (X[94] = B),
              (X[95] = E))
            : (E = X[95]),
          X[96] !== ej || X[97] !== E || X[98] !== u
            ? ((q = (0, t.jsx)(ej, {
                isOpen: !0,
                onIsOpenChange: u,
                children: E,
              })),
              (X[96] = ej),
              (X[97] = E),
              (X[98] = u),
              (X[99] = q))
            : (q = X[99]),
          q
        );
      },
    ],
    124884,
  );
};
