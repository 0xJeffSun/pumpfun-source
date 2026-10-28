// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(732486),
    r = e.i(445242),
    l = e.i(352386),
    a = e.i(538794),
    i = e.i(505835);
  let n = 864e5,
    s = 18e5,
    o = 6e5,
    d = 6048e5,
    c = 3e5,
    u = [
      { maxDuration: 18e4, resolution: "1s", ms: 1e3 },
      { maxDuration: 9e5, resolution: "15s", ms: 15e3 },
      { maxDuration: 36e5, resolution: "1m", ms: 6e4 },
      { maxDuration: 144e5, resolution: "5m", ms: 3e5 },
      { maxDuration: 432e5, resolution: "15m", ms: 9e5 },
      { maxDuration: 1728e5, resolution: "30m", ms: 18e5 },
      { maxDuration: 6048e5, resolution: "1h", ms: 36e5 },
      { maxDuration: 1 / 0, resolution: "4h", ms: 144e5 },
    ],
    m = (e) => u.find((t) => t.resolution === e)?.ms ?? 144e5,
    h = (e) =>
      (u.find((t) => e <= t.maxDuration) ?? u[u.length - 1]).resolution,
    f = (e, t) => Math.min(240, Math.max(20, Math.ceil(e / m(t)) + 40)),
    p = (e) => Math.floor(300 / (0, i.O)(e).bars),
    x = ({ startTime: e, endTime: t, now: r, resolution: l }) => {
      let a = t - e,
        i = (e) => Math.ceil(a / m(e)) + 5 <= p(e),
        n = i(l)
          ? l
          : (u.find((e) => m(e.resolution) > m(l) && i(e.resolution))
              ?.resolution ?? u[u.length - 1].resolution),
        s = Math.ceil(a / m(n)) + 5;
      return {
        resolution: n,
        limit: Math.min(p(n), Math.max(f(t - e, n), s)),
        ...(t < r ? { to: Math.floor(t) } : {}),
      };
    },
    y = (e) => new Date(e.timestamp).getTime(),
    g = ({
      prices: e,
      markers: t,
      width: r,
      height: l,
      topPad: a,
      bottomPad: i = a,
      calloutIndex: n,
    }) => {
      if (0 === e.length) return [];
      let s = ((e) => {
          if (e.length < 3) return [...e];
          let t = Math.max(2, Math.round(0.12 * e.length)),
            r = e.map((r, l) => {
              let a = Math.max(0, l - t),
                i = Math.min(e.length - 1, l + t),
                n = 0;
              for (let t = a; t <= i; t++) n += e[t];
              return n / (i - a + 1);
            });
          return e.map((e, t) => r[t] + (e - r[t]) * 1.6);
        })(e),
        { lo: o, hi: d } = ((e, t, r) => {
          let l = new Set();
          for (let r of t) l.add(Math.min(r.index, e.length - 1));
          (void 0 !== r && l.add(Math.min(r, e.length - 1)),
            l.add(e.length - 1));
          let a = [...l].map((t) => e[t]);
          if (a.length < 2) return { lo: Math.min(...e), hi: Math.max(...e) };
          let i = Math.min(...a),
            n = Math.max(...a),
            s = 0.35 * (n - i || Math.abs(n) || 1);
          return { lo: i - s, hi: n + s };
        })(s, t, n),
        c = d - o || 1;
      return s.map((e, t) => {
        var n;
        let d,
          u =
            (d = (n = Math.min(1, Math.max(0, (e - o) / c))) ** 1.3) /
            (d + (1 - n) ** 1.3 || 1);
        return {
          x: 1 === s.length ? 0 : (t / (s.length - 1)) * r,
          y: a + (1 - u) * (l - a - i),
        };
      });
    },
    b = (e) => {
      if (e.length < 2) return "";
      let t = `M ${e[0].x} ${e[0].y}`;
      for (let r = 1; r < e.length; r++) {
        let l = e[r - 1],
          a = e[r],
          i = l.x + (a.x - l.x) * 0.3,
          n = a.x - (a.x - l.x) * 0.3;
        t += ` C ${i} ${l.y}, ${n} ${a.y}, ${a.x} ${a.y}`;
      }
      return t;
    },
    j = (e, t) => {
      if (e.length < 2) return "";
      let r = e[e.length - 1],
        l = e[0];
      return `${b(e)} L ${r.x} ${t} L ${l.x} ${t} Z`;
    };
  e.s(
    [
      "S",
      0,
      (e, t) => {
        if (0 === e.length) return t;
        let r = [...e].sort((e, t) => y(e) - y(t)),
          l = 0,
          a = 0;
        return (
          r.forEach((e, t) => {
            let r,
              i,
              n =
                ((r = Math.abs(Number(e.amountSOL ?? 0))),
                (i = Number(e.priceSOL ?? 0)) > 0 ? r / i : 0);
            if ("buy" === e.type) {
              (l <= 1e-9 && (a = t), (l += n));
              return;
            }
            (l = Math.max(0, l - n)) <= 1e-9 && (l = 0);
          }),
          y(r[a])
        );
      },
      "Y",
      0,
      (e, t) => {
        let r;
        if (0 !== e.length && Number.isFinite(t)) {
          for (let l = 0; l < e.length && !(e[l].time > t); l++) r = l;
          return r ?? 0;
        }
      },
      "t",
      0,
      j,
      "P",
      0,
      b,
      "q",
      0,
      g,
      "W",
      0,
      ({ candles: e, window: t, trades: r, isClosed: l }) => {
        let a = [];
        for (let t of e) {
          let e = Number(t.close);
          Number.isFinite(e) &&
            !(e <= 0) &&
            a.push({ price: e, time: t.timestamp });
        }
        if ((a.sort((e, t) => e.time - t.time), 0 === a.length)) return a;
        let i = t.endTime;
        if (l && r.length > 0) {
          let e = Math.max(...r.map(y));
          i = Math.max(i, e + o);
        }
        let n = a.filter((e) => e.time >= t.startTime && e.time <= i);
        if (0 === n.length) {
          if ((n = a.filter((e) => e.time >= t.startTime)).length > 1e3) {
            let e = t.startTime + d;
            n = n.filter((t) => t.time <= e);
          }
          0 === n.length && (n = a.slice(-500));
        }
        return n;
      },
      "x",
      0,
      ({
        firstTradeTime: e,
        lastTradeTime: t,
        isClosed: r,
        now: l,
        extendToNow: a = !1,
      }) => {
        let i, o;
        if (e <= 0) {
          let e = l - n,
            t = l + c,
            r = h(t - e);
          return {
            startTime: e,
            endTime: t,
            resolution: r,
            limit: f(t - e, r),
          };
        }
        let d = l - t < s,
          u = t - e,
          p = l - e;
        if (r && a) {
          let t = e - Math.max(9e5, 0.3 * p),
            r = l + c,
            a = h(r - t),
            i = e - 10 * m(a);
          return {
            startTime: i,
            endTime: r,
            ...x({ startTime: i, endTime: r, now: l, resolution: a }),
          };
        }
        if (r) {
          let r = Math.max(18e5, 0.25 * u),
            l = Math.min(12e4, 0.02 * u);
          ((i = e - r), (o = t + l));
        } else
          d
            ? ((i = e - Math.max(9e5, u)),
              (o = Math.max(t + Math.max(6e5, 0.5 * u), l + c)))
            : ((i = e - Math.max(9e5, 0.3 * p)),
              (o = l + Math.max(c, 0.1 * p)));
        let y = h(o - i),
          g = m(y),
          b = r ? 5 : d ? 20 : Math.floor(10),
          j = e - 10 * g,
          v = r ? t + b * g : Math.max(t + b * g, l + c);
        return {
          startTime: j,
          endTime: v,
          ...x({ startTime: j, endTime: v, now: l, resolution: y }),
        };
      },
      "u",
      0,
      ({ series: e, trades: t, chartWidth: r, markerWidth: l }) => {
        let a = [...e],
          i = t.filter((e) => Number(e.priceUSD) > 0);
        for (let e of i) {
          let t = y(e),
            r = Number(e.priceUSD),
            l = a.findIndex((e) => e.time >= t);
          -1 === l
            ? a.push({ price: r, time: t })
            : a[l].time !== t && a.splice(l, 0, { price: r, time: t });
        }
        if (0 === a.length || 0 === i.length) return { points: a, markers: [] };
        let n = new Map(),
          s = [...i].sort((e, t) => y(e) - y(t)),
          o = 0;
        for (let e of s) {
          let t,
            r = y(e);
          if (r < a[0].time) t = 0;
          else {
            for (; o < a.length && a[o].time < r; ) o++;
            t = Math.min(o, a.length - 1);
          }
          n.set(t, [...(n.get(t) ?? []), e]);
        }
        let d = [...n.keys()].sort((e, t) => e - t),
          c = Math.ceil((0.6 * l) / (r / a.length)),
          u = new Map();
        if (d.length <= 1 || c <= 1) for (let [e, t] of n) u.set(e, t);
        else {
          let e = d[0],
            t = [...(n.get(e) ?? [])];
          for (let r of d.slice(1))
            r - e < c
              ? t.push(...(n.get(r) ?? []))
              : (u.set(e, t), (e = r), (t = [...(n.get(r) ?? [])]));
          u.set(e, t);
        }
        let m = [];
        for (let [e, t] of u)
          m.push({
            index: e,
            hasBuy: t.some((e) => "buy" === e.type),
            hasSell: t.some((e) => "sell" === e.type),
          });
        return (m.sort((e, t) => e.index - t.index), { points: a, markers: m });
      },
    ],
    282578,
  );
  let v = "#00FF88",
    w = "#FF4444";
  function k(e) {
    let l,
      i,
      n,
      s,
      o,
      d = (0, r.c)(20),
      { point: c, clampX: u, clampY: m, color: h, size: f, scale: p } = e;
    d[0] !== u || d[1] !== c.x
      ? ((l = u(c.x)), (d[0] = u), (d[1] = c.x), (d[2] = l))
      : (l = d[2]);
    let x = l;
    d[3] !== m || d[4] !== c.y
      ? ((i = m(c.y)), (d[3] = m), (d[4] = c.y), (d[5] = i))
      : (i = d[5]);
    let y = i,
      g = f / 2,
      b = Math.max(1, 1.5 * p);
    d[6] !== h || d[7] !== x || d[8] !== y || d[9] !== g || d[10] !== b
      ? ((n = (0, t.jsx)("circle", {
          cx: x,
          cy: y,
          r: g,
          fill: a.C,
          stroke: h,
          strokeWidth: b,
        })),
        (d[6] = h),
        (d[7] = x),
        (d[8] = y),
        (d[9] = g),
        (d[10] = b),
        (d[11] = n))
      : (n = d[11]);
    let j = 0.16 * f;
    return (
      d[12] !== h || d[13] !== x || d[14] !== y || d[15] !== j
        ? ((s = (0, t.jsx)("circle", { cx: x, cy: y, r: j, fill: h })),
          (d[12] = h),
          (d[13] = x),
          (d[14] = y),
          (d[15] = j),
          (d[16] = s))
        : (s = d[16]),
      d[17] !== n || d[18] !== s
        ? ((o = (0, t.jsxs)(t.Fragment, { children: [n, s] })),
          (d[17] = n),
          (d[18] = s),
          (d[19] = o))
        : (o = d[19]),
      o
    );
  }
  function M(e) {
    let l,
      i,
      n,
      s = (0, r.c)(16),
      { label: o, x: d, y: c, anchor: u, fontSize: m, scale: h } = e,
      f = 3 * h;
    return (
      s[0] !== u ||
      s[1] !== m ||
      s[2] !== o ||
      s[3] !== f ||
      s[4] !== d ||
      s[5] !== c
        ? ((l = (0, t.jsx)("text", {
            x: d,
            y: c,
            textAnchor: u,
            fontSize: m,
            fontWeight: 700,
            fill: a.C,
            stroke: a.C,
            strokeWidth: f,
            strokeLinejoin: "round",
            children: o,
          })),
          (s[0] = u),
          (s[1] = m),
          (s[2] = o),
          (s[3] = f),
          (s[4] = d),
          (s[5] = c),
          (s[6] = l))
        : (l = s[6]),
      s[7] !== u || s[8] !== m || s[9] !== o || s[10] !== d || s[11] !== c
        ? ((i = (0, t.jsx)("text", {
            x: d,
            y: c,
            textAnchor: u,
            fontSize: m,
            fontWeight: 700,
            fill: "#FFFFFF",
            children: o,
          })),
          (s[7] = u),
          (s[8] = m),
          (s[9] = o),
          (s[10] = d),
          (s[11] = c),
          (s[12] = i))
        : (i = s[12]),
      s[13] !== l || s[14] !== i
        ? ((n = (0, t.jsxs)(t.Fragment, { children: [l, i] })),
          (s[13] = l),
          (s[14] = i),
          (s[15] = n))
        : (n = s[15]),
      n
    );
  }
  function S(e) {
    let l,
      a = (0, r.c)(7),
      { x: i, from: n, to: s, color: o, scale: d } = e;
    if (s <= n) return null;
    let c = Math.max(1, 1.5 * d),
      u = `0 ${2.5 * c}`;
    return (
      a[0] !== o ||
      a[1] !== n ||
      a[2] !== c ||
      a[3] !== u ||
      a[4] !== s ||
      a[5] !== i
        ? ((l = (0, t.jsx)("line", {
            x1: i,
            y1: n,
            x2: i,
            y2: s,
            stroke: o,
            strokeWidth: c,
            strokeLinecap: "round",
            strokeDasharray: u,
            opacity: 0.8,
          })),
          (a[0] = o),
          (a[1] = n),
          (a[2] = c),
          (a[3] = u),
          (a[4] = s),
          (a[5] = i),
          (a[6] = l))
        : (l = a[6]),
      l
    );
  }
  function _(e) {
    let l,
      i,
      n,
      s,
      o = (0, r.c)(21),
      { x: d, y: c, isBuy: u, fill: m, size: h, scale: f } = e,
      p = 0.26 * h,
      x = Math.max(1, 1.6 * f),
      y = h / 2,
      g = Math.max(0.75, f);
    o[0] !== m || o[1] !== y || o[2] !== g || o[3] !== d || o[4] !== c
      ? ((l = (0, t.jsx)("circle", {
          cx: d,
          cy: c,
          r: y,
          fill: m,
          stroke: a.C,
          strokeWidth: g,
        })),
        (o[0] = m),
        (o[1] = y),
        (o[2] = g),
        (o[3] = d),
        (o[4] = c),
        (o[5] = l))
      : (l = o[5]);
    let b = d - p,
      j = d + p;
    return (
      o[6] !== x || o[7] !== b || o[8] !== j || o[9] !== c
        ? ((i = (0, t.jsx)("line", {
            x1: b,
            y1: c,
            x2: j,
            y2: c,
            stroke: a.C,
            strokeWidth: x,
            strokeLinecap: "round",
          })),
          (o[6] = x),
          (o[7] = b),
          (o[8] = j),
          (o[9] = c),
          (o[10] = i))
        : (i = o[10]),
      o[11] !== p || o[12] !== x || o[13] !== u || o[14] !== d || o[15] !== c
        ? ((n = u
            ? (0, t.jsx)("line", {
                x1: d,
                y1: c - p,
                x2: d,
                y2: c + p,
                stroke: a.C,
                strokeWidth: x,
                strokeLinecap: "round",
              })
            : null),
          (o[11] = p),
          (o[12] = x),
          (o[13] = u),
          (o[14] = d),
          (o[15] = c),
          (o[16] = n))
        : (n = o[16]),
      o[17] !== l || o[18] !== i || o[19] !== n
        ? ((s = (0, t.jsxs)(t.Fragment, { children: [l, i, n] })),
          (o[17] = l),
          (o[18] = i),
          (o[19] = n),
          (o[20] = s))
        : (s = o[20]),
      s
    );
  }
  e.s(
    [
      "f",
      0,
      function (e) {
        let a,
          i,
          n,
          s,
          o,
          d,
          c,
          u,
          m,
          h,
          f,
          p,
          x,
          y,
          N,
          U,
          L,
          $,
          C,
          F,
          R,
          z,
          I,
          A,
          O,
          B,
          T,
          E,
          P,
          D,
          W = (0, r.c)(108),
          {
            prices: q,
            markers: H,
            width: G,
            height: J,
            palette: K,
            scale: V,
            calloutMarkerIndex: Y,
            annotations: X,
          } = e,
          Z = (0, l.useId)();
        if (W[0] !== Z) {
          let e;
          (W[2] === Symbol.for("react.memo_cache_sentinel")
            ? ((e = /:/g), (W[2] = e))
            : (e = W[2]),
            (a = Z.replace(e, "")),
            (W[0] = Z),
            (W[1] = a));
        } else a = W[1];
        let Q = a,
          ee = `pnlChartStroke-${Q}`,
          et = `pnlChartFill-${Q}`;
        if (
          W[3] !== X?.entryLabel ||
          W[4] !== X?.exitLabel ||
          W[5] !== X?.nowLabel ||
          W[6] !== Y ||
          W[7] !== J ||
          W[8] !== H ||
          W[9] !== q ||
          W[10] !== V ||
          W[11] !== G
        ) {
          x = Symbol.for("react.early_return_sentinel");
          e: {
            let e,
              r,
              l = Math.round(20 * V);
            if (
              (h = g({
                prices: q,
                markers: H,
                width: G,
                height: J,
                topPad:
                  X?.nowLabel !== void 0 || X?.entryLabel !== void 0
                    ? ((e, t = 0) => (30 + t) * e)(V, 20)
                    : l,
                bottomPad:
                  X?.exitLabel !== void 0 ? ((e, t = 0) => (30 + t) * e)(V) : l,
                calloutIndex: Y,
              })).length < 2
            ) {
              x = null;
              break e;
            }
            ((c = b(h)), (d = j(h, J)));
            let a = (f = 16 * V) / 2 + 2 * V;
            (W[24] !== a || W[25] !== G
              ? ((e = (e) => Math.max(a, Math.min(G - a, e))),
                (W[24] = a),
                (W[25] = G),
                (W[26] = e))
              : (e = W[26]),
              (i = e),
              W[27] !== a || W[28] !== J
                ? ((r = (e) => Math.max(a, Math.min(J - a, e))),
                  (W[27] = a),
                  (W[28] = J),
                  (W[29] = r))
                : (r = W[29]),
              (n = r));
            let y = 1 / 0,
              k = -1;
            for (let e of ((u = []), H)) {
              let r = h[Math.min(e.index, h.length - 1)],
                l = n(r.y),
                a = e.hasBuy && e.hasSell ? 0.6 * f : 0;
              if (e.hasBuy) {
                let n = i(r.x - a);
                (e.index <= y && ((y = e.index), (s = { x: n, y: l })),
                  u.push(
                    (0, t.jsx)(
                      _,
                      { x: n, y: l, isBuy: !0, fill: v, size: f, scale: V },
                      `b-${e.index}`,
                    ),
                  ));
              }
              if (e.hasSell) {
                let n = i(r.x + a);
                (e.index >= k && ((k = e.index), (o = { x: n, y: l })),
                  u.push(
                    (0, t.jsx)(
                      _,
                      { x: n, y: l, isBuy: !1, fill: w, size: f, scale: V },
                      `s-${e.index}`,
                    ),
                  ));
              }
            }
            let M = h[h.length - 1];
            ((m = i(M.x)), (p = n(M.y)));
          }
          ((W[3] = X?.entryLabel),
            (W[4] = X?.exitLabel),
            (W[5] = X?.nowLabel),
            (W[6] = Y),
            (W[7] = J),
            (W[8] = H),
            (W[9] = q),
            (W[10] = V),
            (W[11] = G),
            (W[12] = i),
            (W[13] = n),
            (W[14] = s),
            (W[15] = o),
            (W[16] = d),
            (W[17] = c),
            (W[18] = u),
            (W[19] = m),
            (W[20] = h),
            (W[21] = f),
            (W[22] = p),
            (W[23] = x));
        } else
          ((i = W[12]),
            (n = W[13]),
            (s = W[14]),
            (o = W[15]),
            (d = W[16]),
            (c = W[17]),
            (u = W[18]),
            (m = W[19]),
            (h = W[20]),
            (f = W[21]),
            (p = W[22]),
            (x = W[23]));
        if (x !== Symbol.for("react.early_return_sentinel")) return x;
        let er = p,
          el = 22 * V;
        W[30] !== el
          ? ((y = (e) => e.length * el * 0.55), (W[30] = el), (W[31] = y))
          : (y = W[31]);
        let ea = y,
          ei =
            X?.entryLabel !== void 0 &&
            void 0 !== s &&
            (void 0 === X.nowLabel ||
              s.x - f / 2 + ea(X.entryLabel) < m - ea(X.nowLabel) - 16 * V),
          en = `0 0 ${G} ${J}`;
        (W[32] !== K.accent
          ? ((N = (0, t.jsx)("stop", {
              offset: "0",
              stopColor: K.accent,
              stopOpacity: 0.4,
            })),
            (W[32] = K.accent),
            (W[33] = N))
          : (N = W[33]),
          W[34] !== K.primary
            ? ((U = (0, t.jsx)("stop", {
                offset: "0.5",
                stopColor: K.primary,
              })),
              (L = (0, t.jsx)("stop", { offset: "1", stopColor: K.primary })),
              (W[34] = K.primary),
              (W[35] = U),
              (W[36] = L))
            : ((U = W[35]), (L = W[36])),
          W[37] !== ee || W[38] !== N || W[39] !== U || W[40] !== L
            ? (($ = (0, t.jsxs)("linearGradient", {
                id: ee,
                x1: "0",
                y1: "0",
                x2: "1",
                y2: "0",
                children: [N, U, L],
              })),
              (W[37] = ee),
              (W[38] = N),
              (W[39] = U),
              (W[40] = L),
              (W[41] = $))
            : ($ = W[41]),
          W[42] !== K.primary
            ? ((C = (0, t.jsx)("stop", {
                offset: "0",
                stopColor: K.primary,
                stopOpacity: 0.15,
              })),
              (F = (0, t.jsx)("stop", {
                offset: "1",
                stopColor: K.primary,
                stopOpacity: 0,
              })),
              (W[42] = K.primary),
              (W[43] = C),
              (W[44] = F))
            : ((C = W[43]), (F = W[44])),
          W[45] !== et || W[46] !== C || W[47] !== F
            ? ((R = (0, t.jsxs)("linearGradient", {
                id: et,
                x1: "0",
                y1: "0",
                x2: "0",
                y2: "1",
                children: [C, F],
              })),
              (W[45] = et),
              (W[46] = C),
              (W[47] = F),
              (W[48] = R))
            : (R = W[48]),
          W[49] !== R || W[50] !== $
            ? ((z = (0, t.jsxs)("defs", { children: [$, R] })),
              (W[49] = R),
              (W[50] = $),
              (W[51] = z))
            : (z = W[51]));
        let es = `url(#${et})`;
        W[52] !== d || W[53] !== es
          ? ((I = (0, t.jsx)("path", { d: d, fill: es })),
            (W[52] = d),
            (W[53] = es),
            (W[54] = I))
          : (I = W[54]);
        let eo = 6 * V;
        W[55] !== c || W[56] !== K.primary || W[57] !== eo
          ? ((A = (0, t.jsx)("path", {
              d: c,
              fill: "none",
              stroke: K.primary,
              strokeWidth: eo,
              strokeLinecap: "round",
              strokeLinejoin: "round",
              opacity: 0.2,
            })),
            (W[55] = c),
            (W[56] = K.primary),
            (W[57] = eo),
            (W[58] = A))
          : (A = W[58]);
        let ed = `url(#${ee})`,
          ec = 3 * V;
        return (
          W[59] !== c || W[60] !== ed || W[61] !== ec
            ? ((O = (0, t.jsx)("path", {
                d: c,
                fill: "none",
                stroke: ed,
                strokeWidth: ec,
                strokeLinecap: "round",
                strokeLinejoin: "round",
              })),
              (W[59] = c),
              (W[60] = ed),
              (W[61] = ec),
              (W[62] = O))
            : (O = W[62]),
          W[63] !== Y ||
          W[64] !== i ||
          W[65] !== n ||
          W[66] !== K.primary ||
          W[67] !== h ||
          W[68] !== V ||
          W[69] !== f
            ? ((B =
                void 0 !== Y
                  ? (0, t.jsx)(k, {
                      point: h[Math.min(Y, h.length - 1)],
                      clampX: i,
                      clampY: n,
                      color: K.primary,
                      size: f,
                      scale: V,
                    })
                  : null),
              (W[63] = Y),
              (W[64] = i),
              (W[65] = n),
              (W[66] = K.primary),
              (W[67] = h),
              (W[68] = V),
              (W[69] = f),
              (W[70] = B))
            : (B = W[70]),
          W[71] !== X ||
          W[72] !== el ||
          W[73] !== s ||
          W[74] !== V ||
          W[75] !== ei ||
          W[76] !== f
            ? ((T =
                ei && X?.entryLabel !== void 0 && s
                  ? (0, t.jsxs)(t.Fragment, {
                      children: [
                        (0, t.jsx)(S, {
                          x: s.x,
                          from: el + 4 * V,
                          to: s.y - f / 2 - 4 * V,
                          color: v,
                          scale: V,
                        }),
                        (0, t.jsx)(M, {
                          label: X.entryLabel,
                          x: s.x - f / 2,
                          y: el,
                          anchor: "start",
                          fontSize: el,
                          scale: V,
                        }),
                      ],
                    })
                  : null),
              (W[71] = X),
              (W[72] = el),
              (W[73] = s),
              (W[74] = V),
              (W[75] = ei),
              (W[76] = f),
              (W[77] = T))
            : (T = W[77]),
          W[78] !== X ||
          W[79] !== el ||
          W[80] !== m ||
          W[81] !== er ||
          W[82] !== K.primary ||
          W[83] !== V ||
          W[84] !== f
            ? ((E =
                X?.nowLabel !== void 0
                  ? (0, t.jsxs)(t.Fragment, {
                      children: [
                        (0, t.jsx)(S, {
                          x: m,
                          from: el + 4 * V,
                          to: er - 4 * V,
                          color: K.primary,
                          scale: V,
                        }),
                        (0, t.jsx)("circle", {
                          cx: m,
                          cy: er,
                          r: 0.22 * f,
                          fill: K.primary,
                        }),
                        (0, t.jsx)(M, {
                          label: X.nowLabel,
                          x: m,
                          y: el,
                          anchor: "end",
                          fontSize: el,
                          scale: V,
                        }),
                      ],
                    })
                  : null),
              (W[78] = X),
              (W[79] = el),
              (W[80] = m),
              (W[81] = er),
              (W[82] = K.primary),
              (W[83] = V),
              (W[84] = f),
              (W[85] = E))
            : (E = W[85]),
          W[86] !== X ||
          W[87] !== el ||
          W[88] !== ea ||
          W[89] !== o ||
          W[90] !== J ||
          W[91] !== V ||
          W[92] !== f ||
          W[93] !== G
            ? ((P =
                X?.exitLabel !== void 0 && void 0 !== o
                  ? (0, t.jsxs)(t.Fragment, {
                      children: [
                        (0, t.jsx)(S, {
                          x: o.x,
                          from: o.y + f / 2 + 4 * V,
                          to: J - 1.25 * el - 4 * V,
                          color: w,
                          scale: V,
                        }),
                        (0, t.jsx)(M, {
                          label: X.exitLabel,
                          x: Math.min(
                            Math.max(o.x - f / 2, 0),
                            G - ea(X.exitLabel),
                          ),
                          y: J - 0.25 * el,
                          anchor: "start",
                          fontSize: el,
                          scale: V,
                        }),
                      ],
                    })
                  : null),
              (W[86] = X),
              (W[87] = el),
              (W[88] = ea),
              (W[89] = o),
              (W[90] = J),
              (W[91] = V),
              (W[92] = f),
              (W[93] = G),
              (W[94] = P))
            : (P = W[94]),
          W[95] !== J ||
          W[96] !== u ||
          W[97] !== z ||
          W[98] !== I ||
          W[99] !== A ||
          W[100] !== O ||
          W[101] !== B ||
          W[102] !== T ||
          W[103] !== E ||
          W[104] !== P ||
          W[105] !== en ||
          W[106] !== G
            ? ((D = (0, t.jsxs)("svg", {
                width: G,
                height: J,
                viewBox: en,
                "aria-hidden": !0,
                "data-testid": "pnl-share-chart",
                children: [z, I, A, O, B, u, T, E, P],
              })),
              (W[95] = J),
              (W[96] = u),
              (W[97] = z),
              (W[98] = I),
              (W[99] = A),
              (W[100] = O),
              (W[101] = B),
              (W[102] = T),
              (W[103] = E),
              (W[104] = P),
              (W[105] = en),
              (W[106] = G),
              (W[107] = D))
            : (D = W[107]),
          D
        );
      },
    ],
    422642,
  );
};
