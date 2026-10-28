// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(732486),
    r = e.i(445242),
    i = e.i(322315),
    l = e.i(254010),
    a = e.i(352386),
    n = e.i(959242),
    o = e.i(27521),
    s = e.i(526080),
    c = e.i(180636),
    d = e.i(505835),
    u = e.i(938277);
  e.i(12692);
  var m = e.i(398902),
    p = e.i(524546);
  let h = { left: 0, right: 0, top: 0, bottom: 0 };
  var f = e.i(549200),
    y = e.i(805089),
    b = e.i(890088),
    v = e.i(326929);
  let g = (e, t) =>
      "marketcap" === t
        ? (0, u.M)(e)
        : (0, y.f)({
            value: e,
            showCurrency: !0,
            currencySymbol: "$",
            format: "plain",
            fixedDecimalLength: 2,
          }),
    x = (e, t) => {
      let r = e.trim().match(/^#([0-9a-f]{6})$/i)?.[1];
      if (!r) return e;
      let i = (e) => Number.parseInt(r.slice(e, e + 2), 16);
      return `rgba(${i(0)}, ${i(2)}, ${i(4)}, ${t})`;
    };
  function C(e) {
    let i,
      l,
      n,
      o = (0, r.c)(7),
      { candles: s, displayMode: c } = e,
      d = (0, a.useRef)(null),
      { i18n: u } = (0, m.f)(),
      y = u.language;
    return (
      o[0] !== s || o[1] !== c || o[2] !== y
        ? ((i = () => {
            let e = d.current,
              t = e?.parentElement;
            if (!e || !t) return;
            let r = () => {
              let { width: r, height: i } = t.getBoundingClientRect();
              if (r <= 0 || i <= 0) return;
              let l = window.devicePixelRatio || 1;
              ((e.width = Math.round(r * l)),
                (e.height = Math.round(i * l)),
                (e.style.width = `${r}px`),
                (e.style.height = `${i}px`));
              let a = e.getContext("2d");
              a &&
                (a.setTransform(l, 0, 0, l, 0, 0),
                (({
                  context: e,
                  layout: t,
                  colors: r,
                  displayMode: i,
                  locale: l,
                  fontFamily: a,
                  width: n,
                  height: o,
                }) => {
                  let { plot: s, bars: c, priceTicks: d, timeTicks: u } = t;
                  if ((e.clearRect(0, 0, n, o), 0 === c.length)) return;
                  for (let t of ((e.font = `11px ${a}`),
                  (e.textBaseline = "middle"),
                  (e.strokeStyle = r.borderSecondary),
                  (e.lineWidth = 1),
                  d)) {
                    let r = Math.round(t.y) + 0.5;
                    (e.beginPath(),
                      e.moveTo(s.left, r),
                      e.lineTo(s.right, r),
                      e.stroke());
                  }
                  for (let t of u) {
                    let r = Math.round(t.x) + 0.5;
                    (e.beginPath(),
                      e.moveTo(r, s.top),
                      e.lineTo(r, s.bottom),
                      e.stroke());
                  }
                  for (let t of (e.beginPath(),
                  e.moveTo(s.right + 0.5, s.top),
                  e.lineTo(s.right + 0.5, s.bottom),
                  e.moveTo(s.left, s.bottom + 0.5),
                  e.lineTo(s.right, s.bottom + 0.5),
                  e.stroke(),
                  c))
                    ((e.fillStyle = x(t.up ? r.candleUp : r.candleDown, 0.35)),
                      e.fillRect(
                        t.x - t.bodyWidth / 2,
                        t.yVolume,
                        t.bodyWidth,
                        s.bottom - t.yVolume,
                      ));
                  for (let t of c) {
                    let i = t.up ? r.candleUp : r.candleDown;
                    ((e.strokeStyle = i), (e.fillStyle = i));
                    let l = Math.round(t.x) + 0.5;
                    (e.beginPath(),
                      e.moveTo(l, t.yHigh),
                      e.lineTo(l, t.yLow),
                      e.stroke());
                    let a = Math.min(t.yOpen, t.yClose),
                      n = Math.max(1, Math.abs(t.yClose - t.yOpen));
                    e.fillRect(t.x - t.bodyWidth / 2, a, t.bodyWidth, n);
                  }
                  for (let t of ((e.fillStyle = r.textTertiary),
                  (e.textAlign = "left"),
                  d))
                    e.fillText(g(t.value, i), s.right + 6, t.y);
                  let m = (e) =>
                    t.spanMs >= 1728e5
                      ? (0, b.u)({ locale: l, timestampMs: e })
                      : (0, b.a)(e, l);
                  for (let t of ((e.textAlign = "center"), u))
                    e.fillText(m(t.timestamp), t.x, s.bottom + 17);
                })({
                  context: a,
                  layout: (({
                    candles: e,
                    width: t,
                    height: r,
                    geometry: i,
                  }) => {
                    let l = {
                        left: i.leftGutterPx,
                        right: t - i.priceScalePx,
                        top: i.paneTopPx,
                        bottom: r - i.timeScalePx,
                      },
                      a = l.right - l.left,
                      n = l.bottom - l.top;
                    if (a <= 0 || n <= 0 || 0 === e.length)
                      return {
                        plot: h,
                        bars: [],
                        priceTicks: [],
                        timeTicks: [],
                        spanMs: 0,
                      };
                    let o = [...e].sort((e, t) => e.timestamp - t.timestamp),
                      s = (0, p.q)(a),
                      c = o.slice(Math.max(0, o.length - s)),
                      d = a * (1 - p.v / 100),
                      u = d / s,
                      m = Math.max(1, Math.floor((70 * u) / 100)),
                      f = l.left + d - c.length * u,
                      y = 1 / 0,
                      b = -1 / 0,
                      v = 0;
                    for (let e of c)
                      (e.low < y && (y = e.low),
                        e.high > b && (b = e.high),
                        e.volume > v && (v = e.volume));
                    let g = b - y,
                      x = l.top,
                      C = l.bottom - (22 * n) / 100,
                      k = C - x,
                      w = x + (12 * k) / 100,
                      S = 0.8 * k,
                      _ = (e) => (g > 0 ? w + ((b - e) / g) * S : w + S / 2),
                      P = l.bottom - C,
                      N = c.map((e, t) => {
                        let r = _(e.open),
                          i = _(e.close),
                          a = v > 0 ? e.volume / v : 0;
                        return {
                          x: f + t * u + u / 2,
                          bodyWidth: m,
                          yOpen: r,
                          yClose: i,
                          yHigh: _(e.high),
                          yLow: _(e.low),
                          yVolume: l.bottom - P * a,
                          up: e.close >= e.open,
                        };
                      }),
                      T = [];
                    for (let e = 0; e < 5; e++) {
                      let t = b - (e / 4) * g;
                      T.push({ y: _(t), value: t });
                    }
                    let M = [],
                      j = Math.max(1, Math.round(120 / u));
                    for (let e = c.length - 1; e >= 0; e -= j) {
                      let t = N[e],
                        r = c[e];
                      t && r && M.push({ x: t.x, timestamp: r.timestamp });
                    }
                    M.reverse();
                    let A = c[0],
                      I = c[c.length - 1];
                    return {
                      plot: l,
                      bars: N,
                      priceTicks: T,
                      timeTicks: M,
                      spanMs: A && I ? I.timestamp - A.timestamp : 0,
                    };
                  })({ candles: s, width: r, height: i, geometry: v.O }),
                  colors: (0, f.A)(),
                  displayMode: c,
                  locale: y,
                  fontFamily: getComputedStyle(t).fontFamily,
                  width: r,
                  height: i,
                }));
            };
            if ((r(), "u" < typeof ResizeObserver)) return;
            let i = new ResizeObserver(r);
            return (i.observe(t), () => i.disconnect());
          }),
          (l = [s, c, y]),
          (o[0] = s),
          (o[1] = c),
          (o[2] = y),
          (o[3] = i),
          (o[4] = l))
        : ((i = o[3]), (l = o[4])),
      (0, a.useLayoutEffect)(i, l),
      o[5] !== s.length
        ? ((n = (0, t.jsx)("canvas", {
            ref: d,
            "aria-hidden": !0,
            "data-testid": "coin-chart-preview",
            "data-bars": s.length,
            className: "absolute inset-0 block",
          })),
          (o[5] = s.length),
          (o[6] = n))
        : (n = o[6]),
      n
    );
  }
  var k = e.i(570998),
    w = e.i(334076);
  function S(e) {
    return {
      timestamp: e.timestamp,
      open: e.open,
      high: e.high,
      low: e.low,
      close: e.close,
      volume: Number(e.volume),
    };
  }
  function _() {}
  e.s(
    [
      "f",
      0,
      function (e) {
        let u,
          m,
          p,
          h,
          f,
          y,
          b,
          v,
          g = (0, r.c)(20);
        g[0] !== e
          ? (({ coin: u, displayMode: p, ...m } = e),
            (g[0] = e),
            (g[1] = u),
            (g[2] = m),
            (g[3] = p))
          : ((u = g[1]), (m = g[2]), (p = g[3]));
        let x = void 0 === p ? "marketcap" : p,
          P = (0, l.k)(i.D.WEB_INSTANT_COIN_CHART),
          N = (0, l.k)(i.D.WEB_COIN_CHART_INSTANT_PREVIEW),
          T = P && N && "line" !== m.view;
        g[4] !== u || g[5] !== T
          ? ((h = { coin: u, enabled: T }), (g[4] = u), (g[5] = T), (g[6] = h))
          : (h = g[6]);
        let M = ((e) => {
            let t,
              i,
              l,
              n,
              s,
              c = (0, r.c)(11),
              { coin: u, enabled: m } = e;
            c[0] !== u || c[1] !== m
              ? ((t = m && u ? (0, w.T)({ coin: u }) : null),
                (c[0] = u),
                (c[1] = m),
                (c[2] = t))
              : (t = c[2]);
            let p = t;
            c[3] !== p
              ? ((i = p ? (0, d.h)(p) : null), (c[3] = p), (c[4] = i))
              : (i = c[4]);
            let h = i;
            c[5] !== h
              ? ((l = () => {
                  if (!h) return null;
                  let e = (0, o.o)({ url: h })?.settled;
                  return e ? { url: h, candles: e.candles } : null;
                }),
                (c[5] = h),
                (c[6] = l))
              : (l = c[6]);
            let [f, y] = (0, a.useState)(l);
            return (
              c[7] !== p || c[8] !== h
                ? ((n = () => {
                    if (!h || !p) return;
                    let e = !1,
                      t = (0, o.o)({ url: h });
                    t ||
                      (0, o.Y)({
                        url: h,
                        read: () => (0, d.Z)({ ...p, relay: !0 }),
                      });
                    let r = t ?? (0, o.o)({ url: h });
                    return (
                      r?.page.then((t) => {
                        e || y({ url: h, candles: t.candles });
                      }, _),
                      () => {
                        e = !0;
                      }
                    );
                  }),
                  (s = [h, p]),
                  (c[7] = p),
                  (c[8] = h),
                  (c[9] = n),
                  (c[10] = s))
                : ((n = c[9]), (s = c[10])),
              (0, a.useEffect)(n, s),
              f?.url === h ? f.candles : null
            );
          })(h),
          j = u?.mint ?? "";
        g[7] !== j
          ? ((f = { mint: j, isEvm: !1 }), (g[7] = j), (g[8] = f))
          : (f = g[8]);
        let A = (0, c.f)(f);
        if (g[9] !== u || g[10] !== x || g[11] !== A || g[12] !== M) {
          e: {
            if (!u || !M || 0 === M.length) {
              y = null;
              break e;
            }
            let e = (0, s.r)({ coin: u, knownSupply: A });
            if ("marketcap" === x && !(e > 0)) {
              y = null;
              break e;
            }
            y = (0, n.b)(M, x, e).map(S);
          }
          ((g[9] = u), (g[10] = x), (g[11] = A), (g[12] = M), (g[13] = y));
        } else y = g[13];
        let I = y;
        return (
          g[14] !== I || g[15] !== x
            ? ((b = I ? (0, t.jsx)(C, { candles: I, displayMode: x }) : void 0),
              (g[14] = I),
              (g[15] = x),
              (g[16] = b))
            : (b = g[16]),
          g[17] !== m || g[18] !== b
            ? ((v = (0, t.jsx)(k.f, { ...m, plot: b })),
              (g[17] = m),
              (g[18] = b),
              (g[19] = v))
            : (v = g[19]),
          v
        );
      },
    ],
    984724,
  );
};
