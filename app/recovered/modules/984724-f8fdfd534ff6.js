// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(732486),
    r = e.i(445242),
    l = e.i(322315),
    o = e.i(254010),
    i = e.i(352386),
    a = e.i(959242),
    n = e.i(27521),
    s = e.i(526080),
    c = e.i(180636),
    d = e.i(505835),
    u = e.i(938277);
  e.i(12692);
  var m = e.i(398902),
    p = e.i(524546);
  let b = { left: 0, right: 0, top: 0, bottom: 0 };
  var h = e.i(549200),
    y = e.i(805089),
    f = e.i(890088),
    g = e.i(326929);
  let v = (e, t) =>
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
      let l = (e) => Number.parseInt(r.slice(e, e + 2), 16);
      return `rgba(${l(0)}, ${l(2)}, ${l(4)}, ${t})`;
    };
  function w(e) {
    let l,
      o,
      a,
      n = (0, r.c)(7),
      { candles: s, displayMode: c } = e,
      d = (0, i.useRef)(null),
      { i18n: u } = (0, m.f)(),
      y = u.language;
    return (
      n[0] !== s || n[1] !== c || n[2] !== y
        ? ((l = () => {
            let e = d.current,
              t = e?.parentElement;
            if (!e || !t) return;
            let r = () => {
              let { width: r, height: l } = t.getBoundingClientRect();
              if (r <= 0 || l <= 0) return;
              let o = window.devicePixelRatio || 1;
              ((e.width = Math.round(r * o)),
                (e.height = Math.round(l * o)),
                (e.style.width = `${r}px`),
                (e.style.height = `${l}px`));
              let i = e.getContext("2d");
              i &&
                (i.setTransform(o, 0, 0, o, 0, 0),
                (({
                  context: e,
                  layout: t,
                  colors: r,
                  displayMode: l,
                  locale: o,
                  fontFamily: i,
                  width: a,
                  height: n,
                }) => {
                  let { plot: s, bars: c, priceTicks: d, timeTicks: u } = t;
                  if ((e.clearRect(0, 0, a, n), 0 === c.length)) return;
                  for (let t of ((e.font = `11px ${i}`),
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
                    let l = t.up ? r.candleUp : r.candleDown;
                    ((e.strokeStyle = l), (e.fillStyle = l));
                    let o = Math.round(t.x) + 0.5;
                    (e.beginPath(),
                      e.moveTo(o, t.yHigh),
                      e.lineTo(o, t.yLow),
                      e.stroke());
                    let i = Math.min(t.yOpen, t.yClose),
                      a = Math.max(1, Math.abs(t.yClose - t.yOpen));
                    e.fillRect(t.x - t.bodyWidth / 2, i, t.bodyWidth, a);
                  }
                  for (let t of ((e.fillStyle = r.textTertiary),
                  (e.textAlign = "left"),
                  d))
                    e.fillText(v(t.value, l), s.right + 6, t.y);
                  let m = (e) =>
                    t.spanMs >= 1728e5
                      ? (0, f.u)({ locale: o, timestampMs: e })
                      : (0, f.a)(e, o);
                  for (let t of ((e.textAlign = "center"), u))
                    e.fillText(m(t.timestamp), t.x, s.bottom + 17);
                })({
                  context: i,
                  layout: (({
                    candles: e,
                    width: t,
                    height: r,
                    geometry: l,
                  }) => {
                    let o = {
                        left: l.leftGutterPx,
                        right: t - l.priceScalePx,
                        top: l.paneTopPx,
                        bottom: r - l.timeScalePx,
                      },
                      i = o.right - o.left,
                      a = o.bottom - o.top;
                    if (i <= 0 || a <= 0 || 0 === e.length)
                      return {
                        plot: b,
                        bars: [],
                        priceTicks: [],
                        timeTicks: [],
                        spanMs: 0,
                      };
                    let n = [...e].sort((e, t) => e.timestamp - t.timestamp),
                      s = (0, p.q)(i),
                      c = n.slice(Math.max(0, n.length - s)),
                      d = i * (1 - p.v / 100),
                      u = d / s,
                      m = Math.max(1, Math.floor((70 * u) / 100)),
                      h = o.left + d - c.length * u,
                      y = 1 / 0,
                      f = -1 / 0,
                      g = 0;
                    for (let e of c)
                      (e.low < y && (y = e.low),
                        e.high > f && (f = e.high),
                        e.volume > g && (g = e.volume));
                    let v = f - y,
                      x = o.top,
                      w = o.bottom - (22 * a) / 100,
                      C = w - x,
                      k = x + (12 * C) / 100,
                      S = 0.8 * C,
                      N = (e) => (v > 0 ? k + ((f - e) / v) * S : k + S / 2),
                      P = o.bottom - w,
                      j = c.map((e, t) => {
                        let r = N(e.open),
                          l = N(e.close),
                          i = g > 0 ? e.volume / g : 0;
                        return {
                          x: h + t * u + u / 2,
                          bodyWidth: m,
                          yOpen: r,
                          yClose: l,
                          yHigh: N(e.high),
                          yLow: N(e.low),
                          yVolume: o.bottom - P * i,
                          up: e.close >= e.open,
                        };
                      }),
                      T = [];
                    for (let e = 0; e < 5; e++) {
                      let t = f - (e / 4) * v;
                      T.push({ y: N(t), value: t });
                    }
                    let A = [],
                      _ = Math.max(1, Math.round(120 / u));
                    for (let e = c.length - 1; e >= 0; e -= _) {
                      let t = j[e],
                        r = c[e];
                      t && r && A.push({ x: t.x, timestamp: r.timestamp });
                    }
                    A.reverse();
                    let M = c[0],
                      I = c[c.length - 1];
                    return {
                      plot: o,
                      bars: j,
                      priceTicks: T,
                      timeTicks: A,
                      spanMs: M && I ? I.timestamp - M.timestamp : 0,
                    };
                  })({ candles: s, width: r, height: l, geometry: g.O }),
                  colors: (0, h.A)(),
                  displayMode: c,
                  locale: y,
                  fontFamily: getComputedStyle(t).fontFamily,
                  width: r,
                  height: l,
                }));
            };
            if ((r(), "u" < typeof ResizeObserver)) return;
            let l = new ResizeObserver(r);
            return (l.observe(t), () => l.disconnect());
          }),
          (o = [s, c, y]),
          (n[0] = s),
          (n[1] = c),
          (n[2] = y),
          (n[3] = l),
          (n[4] = o))
        : ((l = n[3]), (o = n[4])),
      (0, i.useLayoutEffect)(l, o),
      n[5] !== s.length
        ? ((a = (0, t.jsx)("canvas", {
            ref: d,
            "aria-hidden": !0,
            "data-testid": "coin-chart-preview",
            "data-bars": s.length,
            className: "absolute inset-0 block",
          })),
          (n[5] = s.length),
          (n[6] = a))
        : (a = n[6]),
      a
    );
  }
  var C = e.i(570998),
    k = e.i(334076);
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
  function N() {}
  e.s(
    [
      "f",
      0,
      function (e) {
        let u,
          m,
          p,
          b,
          h,
          y,
          f,
          g,
          v = (0, r.c)(20);
        v[0] !== e
          ? (({ coin: u, displayMode: p, ...m } = e),
            (v[0] = e),
            (v[1] = u),
            (v[2] = m),
            (v[3] = p))
          : ((u = v[1]), (m = v[2]), (p = v[3]));
        let x = void 0 === p ? "marketcap" : p,
          P = (0, o.k)(l.D.WEB_INSTANT_COIN_CHART),
          j = (0, o.k)(l.D.WEB_COIN_CHART_INSTANT_PREVIEW),
          T = P && j && "line" !== m.view;
        v[4] !== u || v[5] !== T
          ? ((b = { coin: u, enabled: T }), (v[4] = u), (v[5] = T), (v[6] = b))
          : (b = v[6]);
        let A = ((e) => {
            let t,
              l,
              o,
              a,
              s,
              c = (0, r.c)(11),
              { coin: u, enabled: m } = e;
            c[0] !== u || c[1] !== m
              ? ((t = m && u ? (0, k.T)({ coin: u }) : null),
                (c[0] = u),
                (c[1] = m),
                (c[2] = t))
              : (t = c[2]);
            let p = t;
            c[3] !== p
              ? ((l = p ? (0, d.h)(p) : null), (c[3] = p), (c[4] = l))
              : (l = c[4]);
            let b = l;
            c[5] !== b
              ? ((o = () => {
                  if (!b) return null;
                  let e = (0, n.o)({ url: b })?.settled;
                  return e ? { url: b, candles: e.candles } : null;
                }),
                (c[5] = b),
                (c[6] = o))
              : (o = c[6]);
            let [h, y] = (0, i.useState)(o);
            return (
              c[7] !== p || c[8] !== b
                ? ((a = () => {
                    if (!b || !p) return;
                    let e = !1,
                      t = (0, n.o)({ url: b });
                    t ||
                      (0, n.Y)({
                        url: b,
                        read: () => (0, d.Z)({ ...p, relay: !0 }),
                      });
                    let r = t ?? (0, n.o)({ url: b });
                    return (
                      r?.page.then((t) => {
                        e || y({ url: b, candles: t.candles });
                      }, N),
                      () => {
                        e = !0;
                      }
                    );
                  }),
                  (s = [b, p]),
                  (c[7] = p),
                  (c[8] = b),
                  (c[9] = a),
                  (c[10] = s))
                : ((a = c[9]), (s = c[10])),
              (0, i.useEffect)(a, s),
              h?.url === b ? h.candles : null
            );
          })(b),
          _ = u?.mint ?? "";
        v[7] !== _
          ? ((h = { mint: _, isEvm: !1 }), (v[7] = _), (v[8] = h))
          : (h = v[8]);
        let M = (0, c.f)(h);
        if (v[9] !== u || v[10] !== x || v[11] !== M || v[12] !== A) {
          e: {
            if (!u || !A || 0 === A.length) {
              y = null;
              break e;
            }
            let e = (0, s.r)({ coin: u, knownSupply: M });
            if ("marketcap" === x && !(e > 0)) {
              y = null;
              break e;
            }
            y = (0, a.b)(A, x, e).map(S);
          }
          ((v[9] = u), (v[10] = x), (v[11] = M), (v[12] = A), (v[13] = y));
        } else y = v[13];
        let I = y;
        return (
          v[14] !== I || v[15] !== x
            ? ((f = I ? (0, t.jsx)(w, { candles: I, displayMode: x }) : void 0),
              (v[14] = I),
              (v[15] = x),
              (v[16] = f))
            : (f = v[16]),
          v[17] !== m || v[18] !== f
            ? ((g = (0, t.jsx)(C.f, { ...m, plot: f })),
              (v[17] = m),
              (v[18] = f),
              (v[19] = g))
            : (g = v[19]),
          g
        );
      },
    ],
    984724,
  );
};
