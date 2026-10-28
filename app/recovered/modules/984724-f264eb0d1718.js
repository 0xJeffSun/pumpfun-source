// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(732486),
    r = e.i(445242),
    l = e.i(322315),
    a = e.i(254010),
    o = e.i(352386),
    i = e.i(959242),
    n = e.i(27521),
    s = e.i(526080),
    c = e.i(180636),
    d = e.i(505835),
    m = e.i(938277);
  e.i(12692);
  var u = e.i(398902),
    p = e.i(524546);
  let h = { left: 0, right: 0, top: 0, bottom: 0 };
  var b = e.i(549200),
    x = e.i(805089),
    f = e.i(890088),
    g = e.i(326929);
  let y = (e, t) =>
      "marketcap" === t
        ? (0, m.M)(e)
        : (0, x.f)({
            value: e,
            showCurrency: !0,
            currencySymbol: "$",
            format: "plain",
            fixedDecimalLength: 2,
          }),
    v = (e, t) => {
      let r = e.trim().match(/^#([0-9a-f]{6})$/i)?.[1];
      if (!r) return e;
      let l = (e) => Number.parseInt(r.slice(e, e + 2), 16);
      return `rgba(${l(0)}, ${l(2)}, ${l(4)}, ${t})`;
    };
  function w(e) {
    let l,
      a,
      i,
      n = (0, r.c)(7),
      { candles: s, displayMode: c } = e,
      d = (0, o.useRef)(null),
      { i18n: m } = (0, u.f)(),
      x = m.language;
    return (
      n[0] !== s || n[1] !== c || n[2] !== x
        ? ((l = () => {
            let e = d.current,
              t = e?.parentElement;
            if (!e || !t) return;
            let r = () => {
              let { width: r, height: l } = t.getBoundingClientRect();
              if (r <= 0 || l <= 0) return;
              let a = window.devicePixelRatio || 1;
              ((e.width = Math.round(r * a)),
                (e.height = Math.round(l * a)),
                (e.style.width = `${r}px`),
                (e.style.height = `${l}px`));
              let o = e.getContext("2d");
              o &&
                (o.setTransform(a, 0, 0, a, 0, 0),
                (({
                  context: e,
                  layout: t,
                  colors: r,
                  displayMode: l,
                  locale: a,
                  fontFamily: o,
                  width: i,
                  height: n,
                }) => {
                  let { plot: s, bars: c, priceTicks: d, timeTicks: m } = t;
                  if ((e.clearRect(0, 0, i, n), 0 === c.length)) return;
                  for (let t of ((e.font = `11px ${o}`),
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
                  for (let t of m) {
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
                    ((e.fillStyle = v(t.up ? r.candleUp : r.candleDown, 0.35)),
                      e.fillRect(
                        t.x - t.bodyWidth / 2,
                        t.yVolume,
                        t.bodyWidth,
                        s.bottom - t.yVolume,
                      ));
                  for (let t of c) {
                    let l = t.up ? r.candleUp : r.candleDown;
                    ((e.strokeStyle = l), (e.fillStyle = l));
                    let a = Math.round(t.x) + 0.5;
                    (e.beginPath(),
                      e.moveTo(a, t.yHigh),
                      e.lineTo(a, t.yLow),
                      e.stroke());
                    let o = Math.min(t.yOpen, t.yClose),
                      i = Math.max(1, Math.abs(t.yClose - t.yOpen));
                    e.fillRect(t.x - t.bodyWidth / 2, o, t.bodyWidth, i);
                  }
                  for (let t of ((e.fillStyle = r.textTertiary),
                  (e.textAlign = "left"),
                  d))
                    e.fillText(y(t.value, l), s.right + 6, t.y);
                  let u = (e) =>
                    t.spanMs >= 1728e5
                      ? (0, f.u)({ locale: a, timestampMs: e })
                      : (0, f.a)(e, a);
                  for (let t of ((e.textAlign = "center"), m))
                    e.fillText(u(t.timestamp), t.x, s.bottom + 17);
                })({
                  context: o,
                  layout: (({
                    candles: e,
                    width: t,
                    height: r,
                    geometry: l,
                  }) => {
                    let a = {
                        left: l.leftGutterPx,
                        right: t - l.priceScalePx,
                        top: l.paneTopPx,
                        bottom: r - l.timeScalePx,
                      },
                      o = a.right - a.left,
                      i = a.bottom - a.top;
                    if (o <= 0 || i <= 0 || 0 === e.length)
                      return {
                        plot: h,
                        bars: [],
                        priceTicks: [],
                        timeTicks: [],
                        spanMs: 0,
                      };
                    let n = [...e].sort((e, t) => e.timestamp - t.timestamp),
                      s = (0, p.q)(o),
                      c = n.slice(Math.max(0, n.length - s)),
                      d = o * (1 - p.v / 100),
                      m = d / s,
                      u = Math.max(1, Math.floor((70 * m) / 100)),
                      b = a.left + d - c.length * m,
                      x = 1 / 0,
                      f = -1 / 0,
                      g = 0;
                    for (let e of c)
                      (e.low < x && (x = e.low),
                        e.high > f && (f = e.high),
                        e.volume > g && (g = e.volume));
                    let y = f - x,
                      v = a.top,
                      w = a.bottom - (22 * i) / 100,
                      S = w - v,
                      N = v + (12 * S) / 100,
                      C = 0.8 * S,
                      j = (e) => (y > 0 ? N + ((f - e) / y) * C : N + C / 2),
                      P = a.bottom - w,
                      k = c.map((e, t) => {
                        let r = j(e.open),
                          l = j(e.close),
                          o = g > 0 ? e.volume / g : 0;
                        return {
                          x: b + t * m + m / 2,
                          bodyWidth: u,
                          yOpen: r,
                          yClose: l,
                          yHigh: j(e.high),
                          yLow: j(e.low),
                          yVolume: a.bottom - P * o,
                          up: e.close >= e.open,
                        };
                      }),
                      T = [];
                    for (let e = 0; e < 5; e++) {
                      let t = f - (e / 4) * y;
                      T.push({ y: j(t), value: t });
                    }
                    let M = [],
                      _ = Math.max(1, Math.round(120 / m));
                    for (let e = c.length - 1; e >= 0; e -= _) {
                      let t = k[e],
                        r = c[e];
                      t && r && M.push({ x: t.x, timestamp: r.timestamp });
                    }
                    M.reverse();
                    let U = c[0],
                      $ = c[c.length - 1];
                    return {
                      plot: a,
                      bars: k,
                      priceTicks: T,
                      timeTicks: M,
                      spanMs: U && $ ? $.timestamp - U.timestamp : 0,
                    };
                  })({ candles: s, width: r, height: l, geometry: g.O }),
                  colors: (0, b.A)(),
                  displayMode: c,
                  locale: x,
                  fontFamily: getComputedStyle(t).fontFamily,
                  width: r,
                  height: l,
                }));
            };
            if ((r(), "u" < typeof ResizeObserver)) return;
            let l = new ResizeObserver(r);
            return (l.observe(t), () => l.disconnect());
          }),
          (a = [s, c, x]),
          (n[0] = s),
          (n[1] = c),
          (n[2] = x),
          (n[3] = l),
          (n[4] = a))
        : ((l = n[3]), (a = n[4])),
      (0, o.useLayoutEffect)(l, a),
      n[5] !== s.length
        ? ((i = (0, t.jsx)("canvas", {
            ref: d,
            "aria-hidden": !0,
            "data-testid": "coin-chart-preview",
            "data-bars": s.length,
            className: "absolute inset-0 block",
          })),
          (n[5] = s.length),
          (n[6] = i))
        : (i = n[6]),
      i
    );
  }
  var S = e.i(570998),
    N = e.i(334076);
  function C(e) {
    return {
      timestamp: e.timestamp,
      open: e.open,
      high: e.high,
      low: e.low,
      close: e.close,
      volume: Number(e.volume),
    };
  }
  function j() {}
  e.s(
    [
      "f",
      0,
      function (e) {
        let m,
          u,
          p,
          h,
          b,
          x,
          f,
          g,
          y = (0, r.c)(20);
        y[0] !== e
          ? (({ coin: m, displayMode: p, ...u } = e),
            (y[0] = e),
            (y[1] = m),
            (y[2] = u),
            (y[3] = p))
          : ((m = y[1]), (u = y[2]), (p = y[3]));
        let v = void 0 === p ? "marketcap" : p,
          P = (0, a.k)(l.D.WEB_INSTANT_COIN_CHART),
          k = (0, a.k)(l.D.WEB_COIN_CHART_INSTANT_PREVIEW),
          T = P && k && "line" !== u.view;
        y[4] !== m || y[5] !== T
          ? ((h = { coin: m, enabled: T }), (y[4] = m), (y[5] = T), (y[6] = h))
          : (h = y[6]);
        let M = ((e) => {
            let t,
              l,
              a,
              i,
              s,
              c = (0, r.c)(11),
              { coin: m, enabled: u } = e;
            c[0] !== m || c[1] !== u
              ? ((t = u && m ? (0, N.T)({ coin: m }) : null),
                (c[0] = m),
                (c[1] = u),
                (c[2] = t))
              : (t = c[2]);
            let p = t;
            c[3] !== p
              ? ((l = p ? (0, d.h)(p) : null), (c[3] = p), (c[4] = l))
              : (l = c[4]);
            let h = l;
            c[5] !== h
              ? ((a = () => {
                  if (!h) return null;
                  let e = (0, n.o)({ url: h })?.settled;
                  return e ? { url: h, candles: e.candles } : null;
                }),
                (c[5] = h),
                (c[6] = a))
              : (a = c[6]);
            let [b, x] = (0, o.useState)(a);
            return (
              c[7] !== p || c[8] !== h
                ? ((i = () => {
                    if (!h || !p) return;
                    let e = !1,
                      t = (0, n.o)({ url: h });
                    t ||
                      (0, n.Y)({
                        url: h,
                        read: () => (0, d.Z)({ ...p, relay: !0 }),
                      });
                    let r = t ?? (0, n.o)({ url: h });
                    return (
                      r?.page.then((t) => {
                        e || x({ url: h, candles: t.candles });
                      }, j),
                      () => {
                        e = !0;
                      }
                    );
                  }),
                  (s = [h, p]),
                  (c[7] = p),
                  (c[8] = h),
                  (c[9] = i),
                  (c[10] = s))
                : ((i = c[9]), (s = c[10])),
              (0, o.useEffect)(i, s),
              b?.url === h ? b.candles : null
            );
          })(h),
          _ = m?.mint ?? "";
        y[7] !== _
          ? ((b = { mint: _, isEvm: !1 }), (y[7] = _), (y[8] = b))
          : (b = y[8]);
        let U = (0, c.f)(b);
        if (y[9] !== m || y[10] !== v || y[11] !== U || y[12] !== M) {
          e: {
            if (!m || !M || 0 === M.length) {
              x = null;
              break e;
            }
            let e = (0, s.r)({ coin: m, knownSupply: U });
            if ("marketcap" === v && !(e > 0)) {
              x = null;
              break e;
            }
            x = (0, i.b)(M, v, e).map(C);
          }
          ((y[9] = m), (y[10] = v), (y[11] = U), (y[12] = M), (y[13] = x));
        } else x = y[13];
        let $ = x;
        return (
          y[14] !== $ || y[15] !== v
            ? ((f = $ ? (0, t.jsx)(w, { candles: $, displayMode: v }) : void 0),
              (y[14] = $),
              (y[15] = v),
              (y[16] = f))
            : (f = y[16]),
          y[17] !== u || y[18] !== f
            ? ((g = (0, t.jsx)(S.f, { ...u, plot: f })),
              (y[17] = u),
              (y[18] = f),
              (y[19] = g))
            : (g = y[19]),
          g
        );
      },
    ],
    984724,
  );
};
