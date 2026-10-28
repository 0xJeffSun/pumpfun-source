// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  "use strict";
  var t = e.i(352386),
    l = e.i(732486);
  function r(e) {
    let t = e.match(/^#([0-9a-f]{3,8})$/i);
    if (t) {
      let e = t[1];
      return (
        3 === e.length && (e = e[0] + e[0] + e[1] + e[1] + e[2] + e[2]),
        [
          parseInt(e.slice(0, 2), 16),
          parseInt(e.slice(2, 4), 16),
          parseInt(e.slice(4, 6), 16),
        ]
      );
    }
    let l = e.match(/rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)/);
    return l ? [+l[1], +l[2], +l[3]] : [128, 128, 128];
  }
  function n(e, t, l, r) {
    return `rgba(${e}, ${t}, ${l}, ${r})`;
  }
  function o(e, t) {
    let [l, o, a] = r(e),
      i = "dark" === t;
    return {
      line: e,
      lineWidth: 2,
      fillTop: n(l, o, a, i ? 0.12 : 0.08),
      fillBottom: n(l, o, a, 0),
      gridLine: i ? "rgba(255, 255, 255, 0.06)" : "rgba(0, 0, 0, 0.06)",
      gridLabel: i ? "rgba(255, 255, 255, 0.4)" : "rgba(0, 0, 0, 0.35)",
      dotUp: "#22c55e",
      dotDown: "#ef4444",
      dotFlat: e,
      glowUp: "rgba(34, 197, 94, 0.18)",
      glowDown: "rgba(239, 68, 68, 0.18)",
      glowFlat: n(l, o, a, 0.12),
      badgeOuterBg: i ? "rgba(40, 40, 40, 0.95)" : "rgba(255, 255, 255, 0.95)",
      badgeOuterShadow: i ? "rgba(0, 0, 0, 0.4)" : "rgba(0, 0, 0, 0.15)",
      badgeBg: e,
      badgeText: "#ffffff",
      dashLine: n(l, o, a, 0.4),
      refLine: i ? "rgba(255, 255, 255, 0.15)" : "rgba(0, 0, 0, 0.12)",
      refLabel: i ? "rgba(255, 255, 255, 0.45)" : "rgba(0, 0, 0, 0.4)",
      timeLabel: i ? "rgba(255, 255, 255, 0.35)" : "rgba(0, 0, 0, 0.3)",
      crosshairLine: i ? "rgba(255, 255, 255, 0.2)" : "rgba(0, 0, 0, 0.12)",
      tooltipBg: i ? "rgba(30, 30, 30, 0.95)" : "rgba(255, 255, 255, 0.95)",
      tooltipText: i ? "#e5e5e5" : "#1a1a1a",
      tooltipBorder: i ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.08)",
      bgRgb: i ? [10, 10, 10] : [255, 255, 255],
      labelFont: '11px "SF Mono", Menlo, Monaco, "Cascadia Code", monospace',
      valueFont: '600 11px "SF Mono", Menlo, monospace',
      badgeFont: '500 11px "SF Mono", Menlo, monospace',
    };
  }
  var a = [
    "#3b82f6",
    "#ef4444",
    "#22c55e",
    "#f59e0b",
    "#8b5cf6",
    "#ec4899",
    "#06b6d4",
    "#f97316",
  ];
  function i(e, t, l, r = 16.67) {
    return e + (t - e) * (1 - Math.pow(1 - l, r / 16.67));
  }
  function s(e, t, l, r) {
    let n = 1 / 0,
      o = -1 / 0;
    for (let t of e)
      (t.value < n && (n = t.value), t.value > o && (o = t.value));
    (t < n && (n = t),
      t > o && (o = t),
      void 0 !== l && (l < n && (n = l), l > o && (o = l)));
    let a = o - n,
      i = a * (r ? 0.02 : 0.1) || (r ? 0.04 : 0.4);
    if (a < i) {
      let e = (n + o) / 2;
      ((n = e - i / 2), (o = e + i / 2));
    } else {
      let e = a * (r ? 0.01 : 0.12);
      ((n -= e), (o += e));
    }
    return { min: n, max: o };
  }
  function u(e, t = 20) {
    if (e.length < 5) return "flat";
    let l = Math.max(0, e.length - t),
      r = 1 / 0,
      n = -1 / 0;
    for (let t = l; t < e.length; t++) {
      let l = e[t].value;
      (l < r && (r = l), l > n && (n = l));
    }
    let o = n - r;
    if (0 === o) return "flat";
    let a = Math.max(l, e.length - 5),
      i = e[a].value,
      s = e[e.length - 1].value - i,
      c = 0.12 * o;
    return s > c ? "up" : s < -c ? "down" : "flat";
  }
  function c(e, t) {
    if (0 === e.length) return null;
    if (t <= e[0].time) return e[0].value;
    if (t >= e[e.length - 1].time) return e[e.length - 1].value;
    let l = 0,
      r = e.length - 1;
    for (; r - l > 1; ) {
      let n = (l + r) >> 1;
      e[n].time <= t ? (l = n) : (r = n);
    }
    let n = e[l],
      o = e[r],
      a = o.time - n.time;
    if (0 === a) return n.value;
    let i = (t - n.time) / a;
    return n.value + (o.value - n.value) * i;
  }
  function d(e, t, l, r, n, o) {
    let { w: a, h: s, pad: u, valRange: c, minVal: d, maxVal: h, toY: f } = t,
      p = s - u.top - u.bottom;
    if (p <= 0 || c <= 0) return;
    let g = p / c,
      m = (function (e, t, l) {
        if (l > 0) {
          let e = l * t;
          if (e >= 18 && e <= 144) return l;
        }
        let r = 1 / 0;
        for (let l of [
          [2, 2.5, 2],
          [2, 2, 2.5],
          [2.5, 2, 2],
        ]) {
          let n = Math.pow(10, Math.ceil(Math.log10(e))),
            o = 0;
          for (; (n / l[o % 3]) * t >= 36; ) ((n /= l[o % 3]), o++);
          n < r && (r = n);
        }
        return 1 / 0 === r ? e / 5 : r;
      })(c, g, n.interval);
    n.interval = m;
    let b = m / 2,
      x = b * g,
      v = x < 40 ? 0 : x >= 60 ? 1 : (x - 40) / 20,
      y = (e) => {
        let t = Math.min(e - u.top, s - u.bottom - e);
        return t >= 32 ? 1 : t <= 0 ? 0 : t / 32;
      },
      M = new Map(),
      w = Math.ceil(d / b) * b;
    for (let e = w; e <= h; e += b) {
      let t = f(e);
      if (t < u.top - 2 || t > s - u.bottom + 2) continue;
      let l =
          (!(function (e, t) {
            let l = e / t;
            return 0.01 > Math.abs(l - Math.round(l));
          })(e, m)
            ? v
            : 1) * y(t),
        r = Math.round(1e3 * e);
      M.set(r, l);
    }
    for (let [e, t] of n.labels) {
      let l = M.get(e) ?? 0,
        r = l >= t ? 0.18 : 0.12,
        a = i(t, l, r, o);
      (0.02 > Math.abs(a - l) && (a = l),
        a < 0.01 && 0 === l ? n.labels.delete(e) : n.labels.set(e, a));
    }
    for (let [e, t] of M) n.labels.has(e) || n.labels.set(e, 0.18 * t);
    let S = e.globalAlpha;
    for (let [t, o] of (e.setLineDash([1, 3]),
    (e.lineWidth = 1),
    (e.font = l.labelFont),
    (e.textAlign = "left"),
    n.labels)) {
      if (o < 0.02) continue;
      let n = t / 1e3,
        i = f(n);
      i < u.top - 10 ||
        i > s - u.bottom + 10 ||
        (e.save(),
        (e.globalAlpha = S * o),
        (e.strokeStyle = l.gridLine),
        e.beginPath(),
        e.moveTo(u.left, i),
        e.lineTo(a - u.right, i),
        e.stroke(),
        (e.fillStyle = l.gridLabel),
        e.fillText(r(n), a - u.right + 8, i + 4),
        e.restore());
    }
    e.setLineDash([]);
  }
  function h(e, t) {
    if (t.length < 2) return;
    if (2 === t.length) return void e.lineTo(t[1][0], t[1][1]);
    let l = t.length,
      r = Array(l - 1),
      n = Array(l - 1);
    for (let e = 0; e < l - 1; e++)
      ((n[e] = t[e + 1][0] - t[e][0]),
        (r[e] = 0 === n[e] ? 0 : (t[e + 1][1] - t[e][1]) / n[e]));
    let o = Array(l);
    ((o[0] = r[0]), (o[l - 1] = r[l - 2]));
    for (let e = 1; e < l - 1; e++)
      r[e - 1] * r[e] <= 0 ? (o[e] = 0) : (o[e] = (r[e - 1] + r[e]) / 2);
    for (let e = 0; e < l - 1; e++)
      if (0 === r[e]) ((o[e] = 0), (o[e + 1] = 0));
      else {
        let t = o[e] / r[e],
          l = o[e + 1] / r[e],
          n = t * t + l * l;
        if (n > 9) {
          let a = 3 / Math.sqrt(n);
          ((o[e] = a * t * r[e]), (o[e + 1] = a * l * r[e]));
        }
      }
    for (let r = 0; r < l - 1; r++) {
      let l = n[r];
      e.bezierCurveTo(
        t[r][0] + l / 3,
        t[r][1] + (o[r] * l) / 3,
        t[r + 1][0] - l / 3,
        t[r + 1][1] - (o[r + 1] * l) / 3,
        t[r + 1][0],
        t[r + 1][1],
      );
    }
  }
  function f(e, t, l, r) {
    return (
      t +
      l *
        (0.55 * Math.sin(9.4 * e + r) +
          0.3 * Math.sin(15.7 * e + 1.3 * r) +
          0.15 * Math.sin(4.2 * e + 0.7 * r))
    );
  }
  function p(e) {
    return 0.22 + 0.08 * Math.sin((e / 1200) * Math.PI);
  }
  function g(e) {
    let t = e.match(/^#([0-9a-f]{3,8})$/i);
    if (t) {
      let e = t[1];
      return (
        3 === e.length && (e = e[0] + e[0] + e[1] + e[1] + e[2] + e[2]),
        [
          parseInt(e.slice(0, 2), 16),
          parseInt(e.slice(2, 4), 16),
          parseInt(e.slice(4, 6), 16),
          1,
        ]
      );
    }
    let l = e.match(/rgba\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*,\s*([\d.]+)/);
    if (l) return [+l[1], +l[2], +l[3], +l[4]];
    let r = e.match(/rgb\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)/);
    return r ? [+r[1], +r[2], +r[3], 1] : [128, 128, 128, 1];
  }
  function m(e, t, l, r, n, o = 1, a = 1, i) {
    let { h: s, pad: u } = t,
      c = e.globalAlpha;
    if (n && a > 0.01) {
      e.globalAlpha = c * a;
      let t = e.createLinearGradient(0, u.top, 0, s - u.bottom);
      (t.addColorStop(0, l.fillTop),
        t.addColorStop(1, l.fillBottom),
        e.beginPath(),
        e.moveTo(r[0][0], s - u.bottom),
        e.lineTo(r[0][0], r[0][1]),
        h(e, r),
        e.lineTo(r[r.length - 1][0], s - u.bottom),
        e.closePath(),
        (e.fillStyle = t),
        e.fill());
    }
    ((e.globalAlpha = c * o),
      e.beginPath(),
      e.moveTo(r[0][0], r[0][1]),
      h(e, r),
      (e.strokeStyle = i ?? l.line),
      (e.lineWidth = l.lineWidth),
      (e.lineJoin = "round"),
      (e.lineCap = "round"),
      e.stroke(),
      (e.globalAlpha = c));
  }
  function b(
    e,
    t,
    l,
    r,
    n,
    o,
    a,
    i,
    s = 0,
    u = 1,
    c = 0,
    d = 1,
    h = !1,
    x = 1,
  ) {
    let { h: v, pad: y, toX: M, toY: w, chartW: S, chartH: T } = t,
      k = e.globalAlpha,
      A = y.top,
      R = v - y.bottom,
      C = (e) => Math.max(A, Math.min(R, e)),
      L = y.top + T / 2,
      $ = 0.07 * T,
      E = 0.001 * c,
      P =
        u < 1
          ? (e, t) => {
              let l = Math.max(0, Math.min(1, (t - y.left) / S)),
                r = Math.max(
                  0,
                  Math.min(1, (u - 2 * Math.abs(l - 0.5) * 0.4) / 0.6),
                ),
                n = f(l, L, $, E);
              return n + (e - n) * r;
            }
          : (e, t) => e,
      W = r.map((e, t) => {
        let l = M(e.time),
          o = t === r.length - 1 ? P(C(w(n)), l) : P(C(w(e.value)), l);
        return [l, o];
      }),
      F = M(o),
      B = y.left + S,
      I = u < 1 ? F + (B - F) * (1 - u) : F;
    if ((W.push([I, P(C(w(n)), I)]), W.length < 2)) return;
    let z = 1,
      V = x;
    if (u < 1) {
      let e = p(c);
      ((z = e + (1 - e) * u), (V = u * x));
    }
    let D = Math.min(1, 3 * u) * d,
      O =
        u < 1 || d < 1
          ? (function (e, t, l) {
              if (l <= 0) return e;
              if (l >= 1) return t;
              let [r, n, o, a] = g(e),
                [i, s, u, c] = g(t),
                d = Math.round(r + (i - r) * l),
                h = Math.round(n + (s - n) * l),
                f = Math.round(o + (u - o) * l),
                p = a + (c - a) * l;
              return p >= 0.995
                ? `rgb(${d},${h},${f})`
                : `rgba(${d},${h},${f},${p.toFixed(3)})`;
            })(l.gridLabel, l.line, D)
          : void 0,
      j = null !== i;
    if (
      (e.save(),
      e.beginPath(),
      e.rect(y.left - 1, y.top, S + 2, T),
      e.clip(),
      j
        ? (e.save(),
          e.beginPath(),
          e.rect(0, 0, i, v),
          e.clip(),
          m(e, t, l, W, a, z, V, O),
          e.restore(),
          e.save(),
          e.beginPath(),
          e.rect(i, 0, t.w - i, v),
          e.clip(),
          (e.globalAlpha = k * (1 - 0.6 * s)),
          m(e, t, l, W, a, z, V, O),
          e.restore())
        : m(e, t, l, W, a, z, V, O),
      e.restore(),
      !h)
    ) {
      let r = Math.max(y.top, Math.min(v - y.bottom, w(n))),
        o = u < 1 ? L + (r - L) * u : r;
      (e.setLineDash([4, 4]), (e.strokeStyle = l.dashLine), (e.lineWidth = 1));
      let a = j ? 1 - 0.2 * s : 1;
      ((e.globalAlpha = k * (u < 1 ? a * u : a)),
        e.beginPath(),
        e.moveTo(y.left, o),
        e.lineTo(t.w - y.right, o),
        e.stroke(),
        e.setLineDash([]));
    }
    e.globalAlpha = k;
    let X = W[W.length - 1];
    return ((X[1] = Math.max(10, Math.min(v - 10, X[1]))), W);
  }
  function x(e, t, l, n, o = !0, a = 0, i = performance.now()) {
    let s = e.globalAlpha,
      u = 0.7 * a;
    if (o && u < 0.3) {
      let r = (i % 1500) / 900;
      r < 1 &&
        (e.beginPath(),
        e.arc(t, l, 9 + 12 * r, 0, 2 * Math.PI),
        (e.strokeStyle = n.line),
        (e.lineWidth = 1.5),
        (e.globalAlpha = 0.35 * (1 - r) * (1 - 3 * u) * s),
        e.stroke());
    }
    let c = r(n.badgeOuterBg);
    if (
      (e.save(),
      (e.globalAlpha = s),
      (e.shadowColor = n.badgeOuterShadow),
      (e.shadowBlur = 6 * (1 - u)),
      (e.shadowOffsetY = 1),
      e.beginPath(),
      e.arc(t, l, 6.5, 0, 2 * Math.PI),
      (e.fillStyle = n.badgeOuterBg),
      e.fill(),
      e.restore(),
      (e.globalAlpha = s),
      e.beginPath(),
      e.arc(t, l, 3.5, 0, 2 * Math.PI),
      u > 0.01)
    ) {
      var d;
      let t, l, o;
      ((d = r(n.line)),
        (t = Math.round(d[0] + (c[0] - d[0]) * u)),
        (l = Math.round(d[1] + (c[1] - d[1]) * u)),
        (o = Math.round(d[2] + (c[2] - d[2]) * u)),
        (e.fillStyle = `rgb(${t},${l},${o})`));
    } else e.fillStyle = n.line;
    e.fill();
  }
  function v(e, t, l, r) {
    let { w: n, h: o, pad: a, toY: i, chartW: s } = t,
      u = i(r.value);
    if (u < a.top - 10 || u > o - a.bottom + 10) return;
    let c = r.label ?? "";
    if (c) {
      e.font = "500 11px system-ui, sans-serif";
      let t = e.measureText(c).width,
        r = a.left + s / 2;
      ((e.strokeStyle = l.refLine),
        (e.lineWidth = 1),
        e.beginPath(),
        e.moveTo(a.left, u),
        e.lineTo(r - t / 2 - 8, u),
        e.stroke(),
        e.beginPath(),
        e.moveTo(r + t / 2 + 8, u),
        e.lineTo(n - a.right, u),
        e.stroke(),
        (e.fillStyle = l.refLabel),
        (e.textAlign = "center"),
        e.fillText(c, r, u + 4));
    } else
      ((e.strokeStyle = l.refLine),
        (e.lineWidth = 1),
        e.setLineDash([4, 4]),
        e.beginPath(),
        e.moveTo(a.left, u),
        e.lineTo(n - a.right, u),
        e.stroke(),
        e.setLineDash([]));
  }
  function y(e, t, l, r, n) {
    let { h: o, pad: a, toY: i } = t,
      s = 0,
      u = 0;
    for (let c of r) {
      let r;
      if (!c || !Number.isFinite(c.value)) continue;
      let d = i(c.value);
      (d < a.top
        ? ((r = a.top + 22 * s), (s += 1))
        : d > o - a.bottom && ((r = o - a.bottom - 22 * u), (u += 1)),
        (function (e, t, l, r, n, o) {
          let { w: a, h: i, pad: s, toY: u } = t;
          if (!r || !Number.isFinite(r.value)) return;
          let c = u(r.value),
            d = c < s.top,
            h = c > i - s.bottom,
            f = d || h,
            p = void 0 !== o ? o : Math.max(s.top, Math.min(i - s.bottom, c)),
            g = r.color || l.refLine;
          (e.save(),
            f ||
              (e.setLineDash([4, 4]),
              (e.strokeStyle = g),
              (e.lineWidth = 1),
              e.beginPath(),
              e.moveTo(s.left, p),
              e.lineTo(a - s.right, p),
              e.stroke(),
              e.setLineDash([])));
          let [m, b, x] = l.bgRgb,
            v = `rgb(${m},${b},${x})`,
            y = n ? n(r.value) : "";
          if (y) {
            ((e.font = l.valueFont),
              (e.textAlign = "left"),
              (e.textBaseline = "middle"));
            let t = Math.ceil(e.measureText(y).width) + 12,
              r = a - s.right + 8 - 6,
              n = p - 9;
            if (((e.fillStyle = g), "function" == typeof Path2D)) {
              let l = new Path2D(F(t, 18, B, I));
              (e.save(), e.translate(r - B, n), e.fill(l), e.restore());
            } else
              "function" == typeof e.roundRect
                ? (e.beginPath(), e.roundRect(r, n, t, 18, 9), e.fill())
                : e.fillRect(r, n, t, 18);
            ((e.fillStyle = v), e.fillText(y, r + 6, p + 0.5));
          }
          if (r.label) {
            let t = f ? `${r.label} ${d ? "▴" : "▾"}` : r.label;
            ((e.font = "600 10px system-ui, sans-serif"),
              (e.textAlign = "left"),
              (e.textBaseline = "middle"));
            let l = Math.ceil(e.measureText(t).width) + 12,
              n = s.left + 12,
              o = p - 9;
            ((e.fillStyle = v),
              (e.strokeStyle = g),
              (e.lineWidth = 1),
              "function" == typeof e.roundRect
                ? (e.beginPath(),
                  e.roundRect(n, o, l, 18, 9),
                  e.fill(),
                  e.stroke())
                : (e.fillRect(n, o, l, 18), e.strokeRect(n, o, l, 18)),
              (e.fillStyle = g),
              e.fillText(t, n + 6, p + 0.5));
          }
          e.restore();
        })(e, t, l, c, n, r));
    }
  }
  function M(e, t, l, r, n, o, a, s) {
    let u,
      { h: c, pad: d, leftEdge: h, rightEdge: f, toX: p } = t,
      g = d.left,
      m = t.w - d.right,
      b = m - g,
      x = (e) => {
        let t = Math.min(e - g, m - e);
        return t >= 50 ? 1 : t <= 0 ? 0 : t / 50;
      };
    e.font = l.labelFont;
    let v = b / n,
      y =
        n <= 15
          ? 2
          : n <= 30
            ? 5
            : n <= 60
              ? 10
              : n <= 120
                ? 15
                : n <= 300
                  ? 30
                  : n <= 600
                    ? 60
                    : n <= 1800
                      ? 300
                      : n <= 3600
                        ? 600
                        : n <= 14400
                          ? 1800
                          : n <= 43200
                            ? 3600
                            : n <= 86400
                              ? 7200
                              : n <= 604800
                                ? 86400
                                : 604800;
    for (; y * v < 60 && y < n; ) y *= 2;
    if (y >= 86400) {
      let e = new Date((h - y) * 1e3);
      (e.setHours(0, 0, 0, 0), (u = e.getTime() / 1e3));
    } else u = Math.ceil((h - y) / y) * y;
    let M = new Set();
    for (let e = u; e <= f + y && M.size < 30; e += y)
      M.add(Math.round(100 * e));
    for (let e of M) {
      let t = o(e / 100),
        l = a.labels.get(e);
      l ? (l.text = t) : a.labels.set(e, { alpha: 0, text: t });
    }
    for (let [e, t] of a.labels) {
      let l = p(e / 100),
        r = M.has(e) ? x(l) : 0,
        n = i(t.alpha, r, 0.08, s);
      (0.02 > Math.abs(n - r) && (n = r),
        n < 0.01 && 0 === r ? a.labels.delete(e) : (t.alpha = n));
    }
    let w = e.globalAlpha,
      S = c - d.bottom;
    ((e.strokeStyle = l.gridLine),
      (e.lineWidth = 1),
      e.beginPath(),
      e.moveTo(g, S),
      e.lineTo(m, S),
      e.stroke(),
      (e.textAlign = "center"));
    let T = [];
    for (let [t, l] of a.labels) {
      if (l.alpha < 0.02) continue;
      let r = p(t / 100);
      if (r < g - 20 || r > m) continue;
      let n = e.measureText(l.text).width;
      T.push({ x: r, alpha: l.alpha, text: l.text, w: n });
    }
    T.sort((e, t) => e.x - t.x);
    let k = [];
    for (let e of T) {
      let t = e.x - e.w / 2;
      if (k.length > 0) {
        let l = k[k.length - 1];
        if (t < l.x + l.w / 2 + 8) {
          e.alpha > l.alpha && (k[k.length - 1] = e);
          continue;
        }
      }
      k.push(e);
    }
    for (let t of k)
      (e.save(),
        (e.globalAlpha = w * t.alpha),
        (e.strokeStyle = l.gridLine),
        (e.lineWidth = 1),
        e.beginPath(),
        e.moveTo(t.x, S),
        e.lineTo(t.x, S + 5),
        e.stroke(),
        (e.fillStyle = l.timeLabel),
        e.fillText(t.text, t.x, S + 5 + 14),
        e.restore());
  }
  var w = [34, 197, 94],
    S = [239, 68, 68],
    T = "#22c55e",
    k = "#ef4444";
  function A(e) {
    let t = Math.round(239 + -205 * e),
      l = Math.round(68 + 129 * e),
      r = Math.round(68 + 26 * e);
    return `rgb(${t},${l},${r})`;
  }
  function R(e) {
    let t = e.match(/^#([0-9a-f]{6})$/i);
    if (t) {
      let e = t[1];
      return [
        parseInt(e.slice(0, 2), 16),
        parseInt(e.slice(2, 4), 16),
        parseInt(e.slice(4, 6), 16),
      ];
    }
    let l = e.match(/rgb\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)/);
    return l ? [+l[1], +l[2], +l[3]] : [128, 128, 128];
  }
  function C(e, t, l, r, n, o) {
    o <= 0 || n < 2 * o
      ? e.rect(t, l, r, n)
      : (e.moveTo(t + o, l),
        e.lineTo(t + r - o, l),
        e.arcTo(t + r, l, t + r, l + o, o),
        e.lineTo(t + r, l + n - o),
        e.arcTo(t + r, l + n, t + r - o, l + n, o),
        e.lineTo(t + o, l + n),
        e.arcTo(t, l + n, t, l + n - o, o),
        e.lineTo(t, l + o),
        e.arcTo(t, l, t + o, l, o),
        e.closePath());
  }
  function L(e, t, l, r, n, o, a, i, s = 1, u = -1, c, d = 0) {
    let h, f;
    if (0 === l.length) return;
    let { toX: p, toY: g } = t,
      {
        bodyW: m,
        wickW: b,
        radius: x,
      } = ((f = Math.max(
        0.8,
        Math.min(
          2,
          0.15 *
            (h = Math.max(
              1,
              r * (t.chartW / (t.rightEdge - t.leftEdge)) * 0.7,
            )),
        ),
      )),
      { bodyW: h, wickW: f, radius: 1.5 * (h > 6) }),
      v = m / 2,
      y = t.pad.left,
      M = t.pad.left + t.chartW,
      w = 0.12 + 0.08 * Math.sin(0.004 * o);
    for (let t of l) {
      let l = p(t.time + r / 2);
      if (l + v < y || l - v > M) continue;
      let o = t.close >= t.open,
        h = t.time === n,
        f = h && u >= 0 ? A(u) : o ? T : k;
      c &&
        d > 0.01 &&
        (f = (function (e, t, l) {
          if (l <= 0) return e;
          if (l >= 1) return t;
          let [r, n, o] = R(e),
            [a, i, s] = R(t),
            u = Math.round(r + (a - r) * l),
            c = Math.round(n + (i - n) * l),
            d = Math.round(o + (s - o) * l);
          return `rgb(${u},${c},${d})`;
        })(f, c, d));
      let S = h ? s : 1;
      if (i > 0.01 && a > 0) {
        let e = l - a;
        e > 0 && (S *= 1 - 0.5 * i * Math.min(e / (1.5 * m), 1));
      }
      let L = e.globalAlpha;
      e.globalAlpha = L * S;
      let $ = g(Math.max(t.open, t.close)),
        E = g(Math.min(t.open, t.close)),
        P = Math.max(1, E - $),
        W = g(t.high),
        F = g(t.low);
      ((e.lineCap = "round"),
        (e.strokeStyle = f),
        $ - W > 0.5 &&
          (e.beginPath(),
          e.moveTo(l, $),
          e.lineTo(l, W),
          (e.lineWidth = b),
          e.stroke()),
        F - E > 0.5 &&
          (e.beginPath(),
          e.moveTo(l, E),
          e.lineTo(l, F),
          (e.lineWidth = b),
          e.stroke()),
        (e.fillStyle = f),
        e.beginPath(),
        C(e, l - v, $, m, P, x),
        e.fill(),
        h &&
          (e.save(),
          (e.globalAlpha = L * S * w),
          (e.shadowColor = f),
          (e.shadowBlur = 8),
          (e.fillStyle = f),
          e.beginPath(),
          C(e, l - v, $, m, P, x),
          e.fill(),
          e.restore()),
        (e.globalAlpha = L));
    }
  }
  function $(e, t, l, r, n, o = 1, a = 0, i = !1, s) {
    let u = t - r.left - r.right,
      c = l - r.top - r.bottom,
      d = r.top + c / 2,
      g = r.left + u / 2,
      m = s ?? "No data to display",
      b = 0.07 * c;
    (e.save(), (e.font = "400 12px system-ui, -apple-system, sans-serif"));
    let x = e.measureText(m).width / 2 + 20;
    if (!i) {
      let t = 0.001 * a,
        l = p(a),
        i = [];
      for (let e = 0; e <= 32; e++) {
        let l = e / 32,
          n = r.left + l * u,
          o = f(l, d, b, t);
        i.push([n, o]);
      }
      (e.beginPath(),
        e.moveTo(i[0][0], i[0][1]),
        h(e, i),
        (e.strokeStyle = n.gridLabel),
        (e.lineWidth = n.lineWidth),
        (e.globalAlpha = l * o),
        (e.lineCap = "round"),
        (e.lineJoin = "round"),
        e.stroke());
    }
    (e.save(), (e.globalCompositeOperation = "destination-out"));
    let v = g - x - 30,
      y = g + x + 30,
      M = e.createLinearGradient(v, 0, y, 0);
    (M.addColorStop(0, "rgba(0,0,0,0)"),
      M.addColorStop(30 / (y - v), "rgba(0,0,0,1)"),
      M.addColorStop(1 - 30 / (y - v), "rgba(0,0,0,1)"),
      M.addColorStop(1, "rgba(0,0,0,0)"),
      (e.fillStyle = M),
      (e.globalAlpha = o));
    let w = 2 * b + n.lineWidth + 6;
    (e.fillRect(v, d - w / 2, y - v, w),
      e.restore(),
      (e.textAlign = "center"),
      (e.textBaseline = "middle"),
      (e.globalAlpha = 0.35 * o),
      (e.fillStyle = n.gridLabel),
      e.fillText(m, g, d),
      e.restore());
  }
  var E = [2, 3];
  function P(e, t, l, r) {
    if (0 === r.length) return;
    let { pad: n, h: o } = t,
      a = e.globalAlpha;
    for (let t of r) {
      if (t.alpha < 0.01) continue;
      let r = t.bubbleY + t.bubbleR + 3,
        i = t.y - 3.5 - 4;
      (i > r &&
        (e.save(),
        (e.globalAlpha = a * t.alpha * 0.7),
        (e.strokeStyle = t.color),
        (e.lineWidth = 1),
        e.setLineDash(E),
        e.beginPath(),
        e.moveTo(t.x, r),
        e.lineTo(t.x, Math.min(i, o - n.bottom)),
        e.stroke(),
        e.setLineDash([]),
        e.restore()),
        e.save(),
        (e.globalAlpha = a * t.alpha),
        e.beginPath(),
        e.arc(t.x, t.y, 4.75, 0, 2 * Math.PI),
        (e.fillStyle = l.badgeOuterBg),
        e.fill(),
        e.beginPath(),
        e.arc(t.x, t.y, 3.5, 0, 2 * Math.PI),
        (e.fillStyle = t.color),
        e.fill(),
        e.restore());
    }
    e.globalAlpha = a;
  }
  function W(e, t, l, r, n, o, a = 1, i) {
    let s = t - r.left - r.right,
      u = l - r.top - r.bottom,
      c = r.top + u / 2,
      d = r.left,
      g = 0.07 * u,
      m = 0.001 * o,
      b = p(o),
      x = [];
    for (let e = 0; e <= 32; e++) {
      let t = e / 32,
        l = d + t * s,
        r = f(t, c, g, m);
      x.push([l, r]);
    }
    (e.save(),
      e.beginPath(),
      e.moveTo(x[0][0], x[0][1]),
      h(e, x),
      (e.strokeStyle = i ?? n.line),
      (e.lineWidth = n.lineWidth),
      (e.globalAlpha = b * a),
      (e.lineCap = "round"),
      (e.lineJoin = "round"),
      e.stroke(),
      e.restore());
  }
  function F(e, t, l, r) {
    let n = t / 2,
      o = l + e - n,
      a = l + n;
    return `M${a},0 L${o},0 A${n},${n},0,0,1,${o},${t} L${a},${t} C${l + 2},${t},3,${n + r},0,${n} C3,${n - r},${l + 2},0,${a},0 Z`;
  }
  var B = 5,
    I = 2.5,
    z = "http://www.w3.org/2000/svg";
  function V(e, t, l, r, n, o) {
    let a = Math.min(Math.abs(e - t) / (r - l || 1), 1);
    return o ? 1 : n + (1 - a) * 0.2;
  }
  function D(e, t, l, r, n, o, a, i, u, c, d) {
    let h;
    if (t.to !== e.windowSecs) {
      ((t.from = l),
        (t.to = e.windowSecs),
        (t.startMs = a),
        (t.rangeFromMin = r),
        (t.rangeFromMax = n));
      let o = i + e.windowSecs * d,
        h = o - e.windowSecs,
        f = [];
      for (let e of u) e.time >= h - 2 && e.time <= o && f.push(e);
      if (f.length > 0) {
        let l = s(f, c, e.referenceLine?.value, e.exaggerate);
        ((t.rangeToMin = l.min), (t.rangeToMax = l.max));
      }
    }
    let f = 0;
    if (o || 0 === t.startMs) h = e.windowSecs;
    else {
      let l = Math.min((a - t.startMs) / 750, 1),
        r = (1 - Math.cos(l * Math.PI)) / 2;
      f = r;
      let n = Math.log(t.from);
      ((h = Math.exp(n + (Math.log(t.to) - n) * r)),
        l >= 1 && ((h = e.windowSecs), (t.startMs = 0), (f = 0)));
    }
    return { windowSecs: h, windowTransProgress: f };
  }
  function O(e, t, l, r, n, o, a, s, u, c, d, h) {
    if (!t)
      return {
        minVal: e.min,
        maxVal: e.max,
        valRange: e.max - e.min || 0.001,
        targetMin: e.min,
        targetMax: e.max,
        displayMin: e.min,
        displayMax: e.max,
        rangeInited: !0,
      };
    if (a)
      ((n = u.rangeFromMin + (u.rangeToMin - u.rangeFromMin) * s),
        (o = u.rangeFromMax + (u.rangeToMax - u.rangeFromMax) * s),
        (l = e.min),
        (r = e.max));
    else {
      let t = o - n;
      ((l = e.min), (r = e.max), (n = i(n, l, c, h)), (o = i(o, r, c, h)));
      let a = (0.5 * t) / d || 0.001;
      (Math.abs(n - l) < a && (n = l), Math.abs(o - r) < a && (o = r));
    }
    return {
      minVal: n,
      maxVal: o,
      valRange: o - n || 0.001,
      targetMin: l,
      targetMax: r,
      displayMin: n,
      displayMax: o,
      rangeInited: !0,
    };
  }
  function j(e, t, l, r, n, o, a, s, u, c, d, h = 1) {
    let f;
    if (!t.showBadge || h < 0.25)
      return ((e.container.style.display = "none"), o);
    e.container.style.display = "";
    let p = h < 0.5 ? (h - 0.25) / 0.25 : 1;
    e.container.style.opacity = p < 1 ? String(p) : "";
    let { w: g, h: m, pad: b } = r,
      x = t.formatValue(l);
    ((e.text.textContent = x),
      (e.text.style.font = t.palette.labelFont),
      (e.text.style.lineHeight = "16px"));
    let v = t.badgeTail ? B : 0;
    ((e.text.style.padding = `3px 10px 3px ${v + 10}px`),
      (c.font = t.palette.labelFont));
    let y = x.replace(/[0-9]/g, "8"),
      M = c.measureText(y).width;
    ((e.targetW = M),
      0 === e.displayW && (e.displayW = M),
      (e.displayW = i(e.displayW, e.targetW, 0.15, d)),
      0.3 > Math.abs(e.displayW - e.targetW) && (e.displayW = e.targetW));
    let w = e.displayW + 20,
      S = v + w;
    (e.svg.setAttribute("width", String(Math.ceil(S))),
      e.svg.setAttribute("height", String(22)),
      e.svg.setAttribute("viewBox", `0 0 ${S} 22`),
      e.path.setAttribute(
        "d",
        t.badgeTail
          ? F(w, 22, B, I)
          : ((f = 11),
            `M${f},0 L${w - f},0 A${f},${f},0,0,1,${w - f},22 L${f},22 A${f},${f},0,0,1,${f},0 Z`),
      ));
    let T = b.top + r.chartH / 2,
      k = Math.max(b.top, Math.min(m - b.bottom, r.toY(l))),
      A = h < 1 ? T + (k - T) * h : k;
    o = null === o || u ? A : i(o, A, s ? 0.5 : 0.35, d);
    let R = g - b.right + 8 - 10 - v,
      C = o - 11;
    if (
      ((e.container.style.transform = `translate3d(${R}px, ${C}px, 0)`),
      "minimal" === t.badgeVariant)
    )
      (e.path.setAttribute("fill", t.palette.badgeOuterBg),
        (e.text.style.color = t.palette.tooltipText),
        (e.container.style.filter = `drop-shadow(0 1px 4px ${t.palette.badgeOuterShadow})`));
    else {
      let l;
      if (
        ((e.container.style.filter = ""),
        (e.text.style.color = "#fff"),
        t.showMomentum)
      ) {
        let e = "up" === n ? 1 : "down" === n ? 0 : a.green;
        ((a.green = u ? e : i(a.green, e, 0.12, d)),
          a.green > 0.99 && (a.green = 1),
          a.green < 0.01 && (a.green = 0));
        let t = a.green,
          r = Math.round(239 + -205 * t),
          o = Math.round(68 + 129 * t),
          s = Math.round(68 + 26 * t);
        l = `rgb(${r},${o},${s})`;
      } else l = t.palette.line;
      e.path.setAttribute("fill", l);
    }
    return o;
  }
  function X(e, t, l, r, n, o, a, i, s, u) {
    let c,
      d = e.markers,
      h = () => {
        for (let e of r.values())
          "none" !== e.wrap.style.display && (e.wrap.style.display = "none");
        for (let e of n.values())
          "none" !== e.wrap.style.display && (e.wrap.style.display = "none");
        o && (o.style.display = "none");
      };
    if (!d || 0 === d.length)
      return (h(), { items: [], clusters: [], activeCluster: null });
    let f = [],
      p = [],
      { pad: g, h: m, leftEdge: b, rightEdge: x, toX: v, toY: y } = t,
      M = e.markerSize / 2,
      w = e.markerOffset,
      S = (function (e, t) {
        if (!1 === e)
          return { enabled: !1, radius: 0, matchColor: !0, minSize: 2 };
        let l = !0 === e || null == e ? {} : e;
        return {
          enabled: l.enabled ?? !0,
          radius: l.radius ?? t,
          matchColor: l.matchColor ?? !0,
          minSize: Math.max(2, l.minSize ?? 2),
        };
      })(e.markerCluster, e.markerSize),
      T = s >= 1 ? 1 : s <= 0.6 ? 0 : (c = (s - 0.6) / 0.4) * c * (3 - 2 * c);
    if (T <= 0.001)
      return (h(), { items: f, clusters: p, activeCluster: null });
    let k = T * (1 - u),
      A = [];
    for (let t of d) {
      if (t.time < b - 1 || t.time > x + 1) continue;
      let l = v(t.time),
        r = y(t.value),
        n = Math.max(g.top, Math.min(m - g.bottom, r)),
        o = n - w,
        a = Math.max(g.top + M + 1, o),
        i = l - g.left,
        s = k * (i <= 0 ? 0 : i >= 40 ? 1 : i / 40);
      s < 0.01 ||
        A.push({
          marker: t,
          xRaw: l,
          y: n,
          bubbleY: a,
          alpha: s,
          color: t.color || e.palette.line,
        });
    }
    let R = new Int32Array(A.length).fill(-1),
      C = [];
    if (S.enabled && A.length > 1) {
      let e = A.map((e, t) => t).sort((e, t) => A[e].xRaw - A[t].xRaw),
        t = S.radius;
      for (let l = 0; l < e.length; l++) {
        let r = e[l];
        if (-1 !== R[r]) continue;
        let n = A[r],
          o = [r];
        R[r] = C.length;
        for (let r = l + 1; r < e.length; r++) {
          let l = e[r];
          if (-1 !== R[l]) continue;
          let a = A[l],
            i = a.xRaw - n.xRaw;
          if (i > t) break;
          let s = a.bubbleY - n.bubbleY;
          !(Math.sqrt(i * i + s * s) > t) &&
            ((S.matchColor && a.color !== n.color) ||
              (o.push(l), (R[l] = C.length)));
        }
        C.push(o);
      }
    } else for (let e = 0; e < A.length; e++) ((R[e] = C.length), C.push([e]));
    let L = new Set(),
      $ = new Set(),
      E = null;
    for (let t of C)
      if (t.length >= S.minSize) {
        let r = 0,
          o = 0,
          s = 0,
          u = 0,
          c = [];
        for (let e of t) {
          let t = A[e];
          ((r += t.xRaw),
            (o += t.bubbleY),
            (s += t.y),
            (u += t.alpha),
            c.push(t.marker));
        }
        let d = t.length,
          h = r / d,
          g = o / d,
          m = s / d,
          b = Math.min(1, u / d),
          x = S.matchColor ? A[t[0]].color : e.palette.line,
          v = c
            .map((e) => e.id)
            .slice()
            .sort(),
          y = v.join("|");
        $.add(y);
        let w = 1.18 * M,
          T = {
            key: y,
            members: c.slice().sort((e, t) => e.time - t.time),
            x: h,
            bubbleY: g,
            dotX: h,
            dotY: m,
            bubbleR: w,
            color: x,
            alpha: b,
          };
        (p.push(T), a === y && (E = T));
        let k = n.get(y);
        k ||
          ((k = (function (e, t, l, r) {
            let n = document.createElement("div");
            n.style.cssText =
              "position:absolute;top:0;left:0;pointer-events:none;will-change:transform,opacity;display:none;z-index:3";
            let o = document.createElement("button");
            ((o.type = "button"),
              (o.style.cssText = `position:absolute;top:0;left:0;box-sizing:border-box;padding:0;margin:0;border-radius:9999px;cursor:pointer;pointer-events:auto;overflow:hidden;transform-origin:center;transform:scale(1);transition:transform 120ms ease-out, box-shadow 160ms ease-out;-webkit-tap-highlight-color:transparent;outline:none;font-family:inherit;line-height:1;border:1.5px solid ${l};box-shadow:0 2px 6px rgba(0,0,0,0.45)`));
            let a = document.createElement("span");
            ((a.style.cssText = `display:flex;align-items:center;justify-content:center;width:100%;height:100%;color:${e.palette.tooltipText};font: 700 11px "SF Mono", Menlo, Monaco, monospace;letter-spacing:-0.02em;pointer-events:none;user-select:none`),
              o.appendChild(a),
              n.appendChild(o),
              o.addEventListener("click", (e) => {
                (e.stopPropagation(), r(t, o));
              }));
            let i = !1,
              s = () => {
                ((o.style.transform = i ? "scale(1.08)" : "scale(1)"),
                  (o.style.boxShadow = i
                    ? "0 4px 12px rgba(0,0,0,0.55)"
                    : "0 2px 6px rgba(0,0,0,0.45)"));
              };
            return (
              o.addEventListener("mouseenter", () => {
                ((i = !0), s());
              }),
              o.addEventListener("mouseleave", () => {
                ((i = !1), s());
              }),
              o.addEventListener("mousemove", (e) => e.stopPropagation()),
              { wrap: n, btn: o, countEl: a, memberIds: [] }
            );
          })(e, y, x, i)),
          l && l.appendChild(k.wrap),
          n.set(y, k));
        let R = Math.round(2 * w);
        (k.lastSize !== R &&
          ((k.btn.style.width = `${R}px`),
          (k.btn.style.height = `${R}px`),
          (k.lastSize = R)),
          k.lastColor !== x &&
            ((k.btn.style.border = `1.5px solid ${x}`),
            (k.countEl.style.color = e.palette.tooltipText),
            (k.lastColor = x)));
        let C = c[0].bubbleBg || e.palette.badgeOuterBg;
        (k.lastBg !== C && ((k.btn.style.background = C), (k.lastBg = C)),
          k.lastCount !== d &&
            ((k.countEl.textContent = String(d)), (k.lastCount = d)),
          (k.memberIds = v),
          (k.btn.title = `${d} markers — click to expand`),
          k.btn.setAttribute("aria-label", `Cluster of ${d} markers`),
          k.btn.setAttribute("aria-expanded", a === y ? "true" : "false"));
        let L = h - w,
          P = g - w;
        ((k.wrap.style.display = "block"),
          (k.wrap.style.transform = `translate3d(${L}px, ${P}px, 0)`),
          (k.wrap.style.opacity = b < 1 ? b.toFixed(3) : ""),
          f.push({ x: h, y: m, bubbleY: g, bubbleR: w, color: x, alpha: b }));
      } else
        for (let e of t) {
          let t = A[e],
            l = r.get(t.marker.id);
          if (!l) continue;
          L.add(t.marker.id);
          let n = t.xRaw - M,
            o = t.bubbleY - M;
          ((l.wrap.style.display = "block"),
            (l.wrap.style.transform = `translate3d(${n}px, ${o}px, 0)`),
            (l.wrap.style.opacity = t.alpha < 1 ? t.alpha.toFixed(3) : ""),
            f.push({
              x: t.xRaw,
              y: t.y,
              bubbleY: t.bubbleY,
              bubbleR: M,
              color: t.color,
              alpha: t.alpha,
            }));
        }
    for (let [e, t] of r)
      L.has(e) ||
        "none" === t.wrap.style.display ||
        (t.wrap.style.display = "none");
    for (let [e, t] of n)
      $.has(e) ||
        "none" === t.wrap.style.display ||
        (t.wrap.style.display = "none");
    return (
      o && null !== a && !$.has(a) && (o.style.display = "none"),
      { items: f, clusters: p, activeCluster: E }
    );
  }
  function Y(e, t, l, r, n, o, a) {
    if (!t) return;
    if (!e) {
      ("none" !== t.style.display && (t.style.display = "none"),
        (n.lastKey = null));
      return;
    }
    if (e.alpha < 0.2) {
      "none" !== t.style.display && (t.style.display = "none");
      return;
    }
    let i = l.palette,
      s = i.bgRgb[0] < 128;
    if (n.lastKey !== e.key) {
      for (; t.firstChild; ) t.removeChild(t.firstChild);
      for (let r of ((t.style.background = i.tooltipBg),
      (t.style.border = `1px solid ${i.tooltipBorder}`),
      (t.style.borderRadius = "10px"),
      (t.style.padding = "6px"),
      (t.style.minWidth = "160px"),
      (t.style.maxWidth = "260px"),
      (t.style.maxHeight = "240px"),
      (t.style.overflowY = "auto"),
      (t.style.boxShadow = s
        ? "0 8px 24px rgba(0,0,0,0.55), 0 2px 6px rgba(0,0,0,0.4)"
        : "0 8px 24px rgba(0,0,0,0.18), 0 2px 6px rgba(0,0,0,0.08)"),
      (t.style.font =
        '500 11px system-ui, -apple-system, "Segoe UI", sans-serif'),
      (t.style.color = i.tooltipText),
      t.setAttribute("role", "menu"),
      e.members)) {
        let e = document.createElement("button");
        ((e.type = "button"), e.setAttribute("role", "menuitem"));
        let n = r.color || i.line;
        ((e.style.cssText = `display:flex;align-items:center;gap:8px;width:100%;box-sizing:border-box;padding:6px 8px;border:none;background:transparent;color:${i.tooltipText};border-radius:6px;cursor:pointer;font:inherit;text-align:left;line-height:1.2;transition:background 120ms ease-out`),
          e.addEventListener("mouseenter", () => {
            e.style.background = s
              ? "rgba(255,255,255,0.06)"
              : "rgba(0,0,0,0.04)";
          }),
          e.addEventListener("mouseleave", () => {
            e.style.background = "transparent";
          }));
        let u = document.createElement("span");
        if (
          ((u.style.cssText = `width:18px;height:18px;border-radius:50%;border:1.5px solid ${n};background:${r.bubbleBg || i.badgeOuterBg};box-sizing:border-box;display:flex;align-items:center;justify-content:center;flex-shrink:0;overflow:hidden`),
          r.imageUrl)
        ) {
          let e = document.createElement("img");
          ((e.src = r.imageUrl),
            (e.alt = ""),
            (e.draggable = !1),
            (e.style.cssText = "width:100%;height:100%;object-fit:cover;"),
            e.addEventListener("error", () => {
              if (!r.label) return void e.remove();
              let t = document.createElement("span");
              ((t.textContent = r.label.slice(0, 2)),
                (t.style.cssText = `color:${i.tooltipText};font: 600 9px "SF Mono", Menlo, Monaco, monospace;letter-spacing:-0.02em;pointer-events:none`),
                e.replaceWith(t));
            }),
            u.appendChild(e));
        } else if (r.label) {
          let e = document.createElement("span");
          ((e.textContent = r.label.slice(0, 2)),
            (e.style.cssText = `color:${i.tooltipText};font: 600 9px "SF Mono", Menlo, Monaco, monospace;letter-spacing:-0.02em;pointer-events:none`),
            u.appendChild(e));
        }
        e.appendChild(u);
        let c = document.createElement("span");
        ((c.style.cssText =
          "flex:1;min-width:0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;"),
          (c.textContent = r.title ?? r.label ?? `@${l.formatValue(r.value)}`),
          e.appendChild(c),
          e.addEventListener("click", (e) => {
            e.stopPropagation();
            let t = o.current;
            (t?.onMarkerClick?.(r, e), a());
          }),
          t.appendChild(e));
      }
      n.lastKey = e.key;
    }
    t.style.display = "block";
    let u = t.offsetWidth,
      c = t.offsetHeight,
      d = e.x - u / 2,
      h = e.bubbleY + e.bubbleR + 8;
    (d + u > r.w - 4 && (d = r.w - 4 - u),
      d < 4 && (d = 4),
      h + c > r.h - 4 && (h = e.bubbleY - e.bubbleR - 8 - c) < 4 && (h = 4),
      (t.style.transform = `translate3d(${d}px, ${h}px, 0)`),
      (t.style.opacity = e.alpha < 1 ? e.alpha.toFixed(3) : "1"));
  }
  function G(e) {
    let t = 1 / 0,
      l = -1 / 0;
    for (let r of e) (r.low < t && (t = r.low), r.high > l && (l = r.high));
    if (!isFinite(t) || !isFinite(l)) return { min: 99, max: 101 };
    let r = l - t,
      n = 0.12 * r,
      o = 0.1 * r || 0.4;
    if (r < o) {
      let e = (t + l) / 2;
      return { min: e - o / 2, max: e + o / 2 };
    }
    return { min: t - n, max: l + n };
  }
  function H(e, t, l, r) {
    let n =
        r.leftEdge + ((t - r.pad.left) / r.chartW) * (r.rightEdge - r.leftEdge),
      o = 0,
      a = e.length - 1;
    for (; o <= a; ) {
      let t = (o + a) >> 1,
        r = e[t];
      if (n < r.time) a = t - 1;
      else {
        if (!(n >= r.time + l)) return r;
        o = t + 1;
      }
    }
    return null;
  }
  var U = (e) => e.toFixed(2),
    N = (e) => {
      let t = new Date(1e3 * e),
        l = t.getHours().toString().padStart(2, "0"),
        r = t.getMinutes().toString().padStart(2, "0"),
        n = t.getSeconds().toString().padStart(2, "0");
      return `${l}:${r}:${n}`;
    };
  e.s([
    "f",
    0,
    function ({
      data: e,
      value: r,
      series: n,
      theme: h = "dark",
      color: f = "#3b82f6",
      window: p = 30,
      grid: g = !0,
      badge: m = !0,
      momentum: R = !0,
      fill: C = !0,
      scrub: E = !0,
      loading: F = !1,
      paused: B = !1,
      emptyText: I,
      exaggerate: _ = !1,
      degen: q,
      badgeTail: J = !0,
      badgeVariant: K = "default",
      showValue: Z = !1,
      valueMomentumColor: Q = !1,
      windows: ee,
      onWindowChange: et,
      windowStyle: el,
      tooltipY: er = 14,
      tooltipOutline: en = !0,
      orderbook: eo,
      referenceLine: ea,
      priceLines: ei,
      formatValue: es = U,
      formatTime: eu = N,
      lerpSpeed: ec = 0.08,
      padding: ed,
      onHover: eh,
      cursor: ef = "crosshair",
      pulse: ep = !0,
      mode: eg = "line",
      candles: em,
      candleWidth: eb,
      liveCandle: ex,
      lineMode: ev,
      lineData: ey,
      lineValue: eM,
      onModeChange: ew,
      onSeriesToggle: eS,
      seriesToggleCompact: eT = !1,
      lineWidth: ek,
      markers: eA,
      onMarkerClick: eR,
      markerOffset: eC = 32,
      markerSize: eL = 22,
      markerCluster: e$ = !0,
      className: eE,
      style: eP,
    }) {
      var eW;
      let eF,
        eB,
        eI,
        ez,
        eV,
        eD,
        eO,
        ej,
        eX,
        eY,
        eG,
        eH,
        eU,
        eN,
        e_,
        eq,
        eJ,
        eK,
        eZ,
        eQ,
        e0,
        e1,
        e2,
        e5,
        e3,
        e4,
        e6,
        e9,
        e8,
        e7,
        te,
        tt,
        tl,
        tr,
        tn,
        to,
        ta,
        ti,
        ts,
        tu,
        tc,
        td,
        th,
        tf,
        tp,
        tg,
        tm,
        tb,
        tx,
        tv,
        ty,
        tM,
        tw,
        tS,
        tT,
        tk,
        tA,
        tR,
        tC,
        tL,
        t$,
        tE,
        tP,
        tW,
        tF,
        tB,
        tI,
        tz,
        tV = (0, t.useRef)(null),
        tD = (0, t.useRef)(null),
        tO = (0, t.useRef)(null),
        tj = (0, t.useRef)(null),
        tX = (0, t.useRef)(new Map()),
        [tY, tG] = (0, t.useState)(null),
        tH = (0, t.useRef)(null),
        tU = (0, t.useRef)(new Map()),
        [tN, t_] = (0, t.useState)(null),
        [tq, tJ] = (0, t.useState)(new Set()),
        tK = (0, t.useRef)(n);
      n && n.length > 0 && (tK.current = n);
      let tZ = (0, t.useMemo)(() => {
          let e = o(f, h);
          return (null != ek && (e.lineWidth = ek), e);
        }, [f, h, ek]),
        tQ = "dark" === h,
        t0 = null != n && n.length > 0,
        t1 = (tK.current?.length ?? 0) > 1,
        t2 = (0, t.useMemo)(() => {
          if (!n || 0 === n.length) return null;
          let e = new Map();
          for (let t = 0; t < n.length; t++) {
            let l = n[t],
              r = l.color || a[t % a.length];
            e.set(l.id, o(r, h));
          }
          return e;
        }, [n, h]),
        t5 = (0, t.useMemo)(() => {
          if (n && t2)
            return n.map((e, t) => ({
              id: e.id,
              data: e.data,
              value: e.value,
              palette: t2.get(e.id) ?? o(e.color || a[t % a.length], h),
              label: e.label,
            }));
        }, [n, t2, h]),
        t3 = {
          top: ed?.top ?? 12,
          right: ed?.right ?? (m ? 80 : g ? 54 : 12),
          bottom: ed?.bottom ?? 28,
          left: ed?.left ?? 12,
        },
        t4 = null != q && !1 !== q,
        [t6, t9] = (0, t.useState)(ee && ee.length > 0 ? ee[0].secs : p),
        t8 = ee ? t6 : p;
      (0, t.useLayoutEffect)(() => {
        if (!ee || 0 === ee.length) return;
        let e = tX.current.get(t6),
          t = tj.current;
        if (e && t) {
          let l = t.getBoundingClientRect(),
            r = e.getBoundingClientRect();
          tG({ left: r.left - l.left, width: r.width });
        }
      }, [t6, ee]);
      let t7 = ev ? "line" : "candle";
      (0, t.useLayoutEffect)(() => {
        if (!ew) return;
        let e = tU.current.get(t7),
          t = tH.current;
        if (e && t) {
          let l = t.getBoundingClientRect(),
            r = e.getBoundingClientRect();
          t_({ left: r.left - l.left, width: r.width });
        }
      }, [t7, ew]);
      let le = (0, t.useCallback)(
          (e) => {
            tJ((t) => {
              let l = new Set(t);
              if (l.has(e)) (l.delete(e), eS?.(e, !0));
              else {
                if ((n?.length ?? 0) - l.size <= 1) return t;
                (l.add(e), eS?.(e, !1));
              }
              return l;
            });
          },
          [n?.length, eS],
        ),
        lt = el ?? "default";
      ((eW = {
        data: e,
        value: r,
        palette: tZ,
        windowSecs: t8,
        lerpSpeed: ec,
        showGrid: g,
        showBadge: !t0 && m,
        showMomentum: !t0 && !1 !== R,
        momentumOverride: "string" == typeof R ? R : void 0,
        showFill: !t0 && C,
        referenceLine: ea,
        priceLines: ei,
        formatValue: es,
        formatTime: eu,
        padding: t3,
        onHover: eh,
        showPulse: ep,
        scrub: E,
        exaggerate: _,
        degenOptions: t0
          ? void 0
          : t4
            ? "object" == typeof q
              ? q
              : {}
            : void 0,
        badgeTail: J,
        badgeVariant: K,
        tooltipY: er,
        tooltipOutline: en,
        valueMomentumColor: Q,
        valueDisplayRef: Z ? tO : void 0,
        orderbookData: eo,
        loading: F,
        paused: B,
        emptyText: I,
        mode: eg,
        candles: em,
        candleWidth: eb,
        liveCandle: ex,
        lineMode: ev,
        lineData: ey,
        lineValue: eM,
        multiSeries: t5,
        isMultiSeries: t0,
        hiddenSeriesIds: tq,
        markers: eA,
        onMarkerClick: eR,
        markerOffset: eC,
        markerSize: eL,
        markerCluster: e$,
      }),
        ((eF = (0, t.useRef)(eW)).current = eW),
        (eB = (0, t.useRef)(eW.value)),
        (eI = (0, t.useRef)(new Map())),
        (ez = (0, t.useRef)(new Map())),
        (eV = (0, t.useRef)(0)),
        (eD = (0, t.useRef)(0)),
        (eO = (0, t.useRef)(0)),
        (ej = (0, t.useRef)(0)),
        (eX = (0, t.useRef)(!1)),
        (eY = (0, t.useRef)(eW.windowSecs)),
        (eG = (0, t.useRef)({
          from: eW.windowSecs,
          to: eW.windowSecs,
          startMs: 0,
          rangeFromMin: 0,
          rangeFromMax: 0,
          rangeToMin: 0,
          rangeToMax: 0,
        })),
        (eH = (0, t.useRef)({ up: 0, down: 0 })),
        (eU = (0, t.useRef)({ interval: 0, labels: new Map() })),
        (eN = (0, t.useRef)({ labels: new Map() })),
        (e_ = (0, t.useRef)({
          labels: [],
          spawnTimer: 0,
          smoothSpeed: 60,
          prevBidTotal: 0,
          prevAskTotal: 0,
          churnRate: 0,
        })),
        (eq = (0, t.useRef)({ particles: [], cooldown: 0, burstCount: 0 })),
        (eJ = (0, t.useRef)({ amplitude: 0 })),
        (eK = (0, t.useRef)({ green: 1 })),
        (eZ = (0, t.useRef)(null)),
        (eQ = (0, t.useRef)(!1)),
        (e0 = (0, t.useRef)({ w: 0, h: 0 })),
        (e1 = (0, t.useRef)(null)),
        (e2 = (0, t.useRef)(0)),
        (e5 = (0, t.useRef)(0)),
        (e3 = (0, t.useRef)(null)),
        (e4 = (0, t.useRef)(new Map())),
        (e6 = (0, t.useRef)(new Map())),
        (e9 = (0, t.useRef)(null)),
        (e8 = (0, t.useRef)(null)),
        (e7 = (0, t.useRef)(() => {})),
        (te = (0, t.useRef)({ lastKey: null })),
        (tt = (0, t.useRef)(null)),
        (tl = (0, t.useRef)(0)),
        (tr = (0, t.useRef)(null)),
        (tn = (0, t.useRef)([])),
        (to = (0, t.useRef)(0)),
        (ta = (0, t.useRef)(0)),
        (ti = (0, t.useRef)(0)),
        (ts = (0, t.useRef)([])),
        (tu = (0, t.useRef)([])),
        (tc = (0, t.useRef)(0)),
        (td = (0, t.useRef)(null)),
        (th = (0, t.useRef)(null)),
        (tf = (0, t.useRef)(+!!eW.loading)),
        (tp = (0, t.useRef)(null)),
        (tg = (0, t.useRef)(1)),
        (tm = (0, t.useRef)(0.5)),
        (tb = (0, t.useRef)(0)),
        (tx = (0, t.useRef)(!1)),
        (tv = (0, t.useRef)(0)),
        (ty = (0, t.useRef)(!1)),
        (tM = (0, t.useRef)(0)),
        (tw = (0, t.useRef)({ startMs: 0, from: 0, to: 0 })),
        (tS = (0, t.useRef)(0)),
        (tT = (0, t.useRef)({ startMs: 0, from: 0, to: 0 })),
        (tk = (0, t.useRef)(0)),
        (tA = (0, t.useRef)(!1)),
        (tR = (0, t.useRef)({
          fromWidth: eW.candleWidth ?? 1,
          toWidth: eW.candleWidth ?? 1,
          startMs: 0,
          rangeFromMin: 0,
          rangeFromMax: 0,
          rangeToMin: 0,
          rangeToMax: 0,
          oldCandles: [],
          oldWidth: eW.candleWidth ?? 1,
        })),
        (tC = (0, t.useRef)({ candles: [], width: eW.candleWidth ?? 1 })),
        (tL = (0, t.useRef)(null)),
        (t$ = (0, t.useRef)(null)),
        (tE = (0, t.useRef)(null)),
        (tP = (0, t.useRef)(null)),
        (tW = (0, t.useRef)([])),
        (tF = (0, t.useRef)(null)),
        (tB = (0, t.useRef)([])),
        (tI = (0, t.useRef)(void 0)),
        (0, t.useEffect)(() => {
          let e = tD.current;
          if (!e) return;
          let t = document.createElement("div");
          t.style.cssText =
            "position:absolute;top:0;left:0;pointer-events:none;will-change:transform;display:none;z-index:1;";
          let l = document.createElementNS(z, "svg");
          l.style.cssText = "position:absolute;top:0;left:0;";
          let r = document.createElementNS(z, "path");
          l.appendChild(r);
          let n = document.createElement("span");
          return (
            (n.style.cssText =
              "position:relative;display:block;color:#fff;white-space:nowrap;"),
            t.appendChild(l),
            t.appendChild(n),
            e.appendChild(t),
            (e3.current = {
              container: t,
              svg: l,
              path: r,
              text: n,
              displayW: 0,
              targetW: 0,
            }),
            () => {
              (e.removeChild(t), (e3.current = null));
            }
          );
        }, [tD]),
        (0, t.useEffect)(() => {
          let e = tD.current;
          if (!e) return;
          let t = document.createElement("div");
          ((t.style.cssText =
            "position:absolute;top:0;left:0;display:none;pointer-events:auto;z-index:4;will-change:transform,opacity;transition:opacity 120ms ease-out;box-sizing:border-box"),
            e.appendChild(t),
            (e8.current = t));
          let l = (e) => {
            if (!e9.current) return;
            let l = e.target;
            if (!(l && t.contains(l))) {
              for (let e of e6.current.values())
                if (l && e.btn.contains(l)) return;
              ((e9.current = null), (t.style.display = "none"));
            }
          };
          document.addEventListener("mousedown", l, !0);
          let r = (e) => {
            "Escape" === e.key &&
              e9.current &&
              ((e9.current = null), (t.style.display = "none"));
          };
          return (
            document.addEventListener("keydown", r),
            (e7.current = (e) => {
              ((e9.current = e9.current === e ? null : e),
                null === e9.current && (t.style.display = "none"));
            }),
            () => {
              (document.removeEventListener("mousedown", l, !0),
                document.removeEventListener("keydown", r),
                t.parentNode && t.parentNode.removeChild(t),
                (e8.current = null),
                (e7.current = () => {}));
            }
          );
        }, [tD]),
        (0, t.useEffect)(() => {
          let e = tD.current;
          if (!e) return;
          let t = e4.current,
            l = eW.markers ?? [],
            r = eW.markerSize,
            n = eW.palette,
            o = n.bgRgb[0] < 128,
            a = new Set();
          for (let i of l) {
            a.add(i.id);
            let l = i.color || n.line,
              s = i.bubbleBg || n.badgeOuterBg,
              u = i.label ? i.label.slice(0, 2) : void 0,
              c = i.title ?? i.label ?? "",
              d = o
                ? "0 2px 6px rgba(0,0,0,0.45)"
                : "0 1px 4px rgba(0,0,0,0.12)",
              h = o
                ? "0 4px 12px rgba(0,0,0,0.55)"
                : "0 4px 10px rgba(0,0,0,0.18)",
              f = t.get(i.id);
            if (!f) {
              let r = document.createElement("div");
              r.style.cssText =
                "position:absolute;top:0;left:0;pointer-events:none;will-change:transform,opacity;display:none;z-index:2";
              let n = document.createElement("button");
              ((n.type = "button"),
                (n.style.cssText = `position:absolute;top:0;left:0;box-sizing:border-box;padding:0;margin:0;border-radius:9999px;cursor:pointer;pointer-events:auto;overflow:hidden;transform-origin:center;transform:scale(1);transition:transform 120ms ease-out, box-shadow 160ms ease-out;-webkit-tap-highlight-color:transparent;outline:none;font-family:inherit;line-height:1;box-shadow:${d}`),
                n.addEventListener("click", (e) => {
                  e.stopPropagation();
                  let l = eF.current,
                    r = t.get(i.id)?.marker ?? i;
                  l.onMarkerClick?.(r, e);
                }));
              let o = !1,
                a = !1,
                s = () => {
                  let e = t.get(i.id),
                    r = e?.lastColor ?? l;
                  (a
                    ? (n.style.boxShadow = `0 0 0 2px ${r}66, ${d}`)
                    : o
                      ? (n.style.boxShadow = h)
                      : (n.style.boxShadow = d),
                    (n.style.transform = o ? "scale(1.08)" : "scale(1)"));
                };
              (n.addEventListener("mouseenter", () => {
                ((o = !0),
                  s(),
                  (tt.current = null),
                  eF.current.onHover?.(null));
              }),
                n.addEventListener("mouseleave", () => {
                  ((o = !1), s());
                }),
                n.addEventListener("mousemove", (e) => {
                  e.stopPropagation();
                }),
                n.addEventListener("focus", () => {
                  ((a = !0), s());
                }),
                n.addEventListener("blur", () => {
                  ((a = !1), s());
                }),
                r.appendChild(n),
                e.appendChild(r),
                (f = { wrap: r, btn: n, visualKind: "empty", marker: i }),
                t.set(i.id, f));
            }
            ((f.marker = i),
              f.lastSize !== r &&
                ((f.btn.style.width = `${r}px`),
                (f.btn.style.height = `${r}px`),
                (f.lastSize = r)),
              f.lastColor !== l &&
                ((f.btn.style.border = `1.5px solid ${l}`), (f.lastColor = l)),
              f.lastBg !== s && ((f.btn.style.background = s), (f.lastBg = s)),
              c
                ? ((f.btn.title = c), f.btn.setAttribute("aria-label", c))
                : (f.btn.removeAttribute("title"),
                  f.btn.removeAttribute("aria-label")));
            let p = i.imageUrl ? "image" : u ? "label" : "empty";
            if (p !== f.visualKind) {
              for (; f.btn.firstChild; ) f.btn.removeChild(f.btn.firstChild);
              if (
                ((f.labelEl = void 0),
                (f.imgEl = void 0),
                (f.fallbackEl = void 0),
                (f.lastImageUrl = void 0),
                (f.lastLabel = void 0),
                "label" === p)
              ) {
                let e = document.createElement("span"),
                  t = Math.max(9, Math.round(0.45 * r));
                ((e.style.cssText = `display:flex;align-items:center;justify-content:center;width:100%;height:100%;font: 600 ${t}px "SF Mono", Menlo, Monaco, monospace;color:${n.tooltipText};letter-spacing:-0.02em;pointer-events:none;user-select:none`),
                  f.btn.appendChild(e),
                  (f.labelEl = e));
              } else if ("image" === p) {
                let e = document.createElement("img");
                ((e.draggable = !1),
                  (e.loading = "lazy"),
                  (e.alt = ""),
                  (e.style.cssText =
                    "display:block;width:100%;height:100%;border-radius:50%;object-fit:cover;pointer-events:none;user-select:none"));
                let t = f;
                (e.addEventListener("error", () => {
                  if (t.imgEl !== e) return;
                  e.style.display = "none";
                  let l = t.marker.label ? t.marker.label.slice(0, 2) : void 0;
                  if (!l || t.fallbackEl) return;
                  let o = document.createElement("span"),
                    a = Math.max(9, Math.round(0.45 * r));
                  ((o.style.cssText = `display:flex;align-items:center;justify-content:center;width:100%;height:100%;font: 600 ${a}px "SF Mono", Menlo, Monaco, monospace;color:${n.tooltipText};letter-spacing:-0.02em;pointer-events:none;user-select:none`),
                    (o.textContent = l),
                    t.btn.appendChild(o),
                    (t.fallbackEl = o));
                }),
                  e.addEventListener("load", () => {
                    t.imgEl === e &&
                      ((e.style.display = "block"),
                      t.fallbackEl &&
                        (t.fallbackEl.remove(), (t.fallbackEl = void 0)));
                  }),
                  f.btn.appendChild(e),
                  (f.imgEl = e));
              }
              f.visualKind = p;
            }
            "label" === p && f.labelEl
              ? (f.lastLabel !== u &&
                  ((f.labelEl.textContent = u ?? ""), (f.lastLabel = u)),
                (f.labelEl.style.color = n.tooltipText))
              : "image" === p &&
                f.imgEl &&
                f.lastImageUrl !== i.imageUrl &&
                ((f.imgEl.src = i.imageUrl ?? ""),
                (f.lastImageUrl = i.imageUrl));
          }
          for (let [e, l] of t)
            a.has(e) ||
              (l.wrap.parentNode && l.wrap.parentNode.removeChild(l.wrap),
              t.delete(e));
        }, [eW.markers, eW.palette, eW.markerSize, tD]),
        (0, t.useEffect)(
          () => () => {
            let e = e4.current;
            for (let t of e.values())
              t.wrap.parentNode && t.wrap.parentNode.removeChild(t.wrap);
            e.clear();
            let t = e6.current;
            for (let e of t.values())
              e.wrap.parentNode && e.wrap.parentNode.removeChild(e.wrap);
            t.clear();
            let l = e8.current;
            (l && l.parentNode && l.parentNode.removeChild(l),
              (e8.current = null),
              (e9.current = null));
          },
          [],
        ),
        (0, t.useEffect)(() => {
          let e = tD.current;
          if (!e) return;
          let t = new ResizeObserver((e) => {
            let t = e[0];
            if (!t) return;
            let { width: l, height: r } = t.contentRect;
            e0.current = { w: l, h: r };
          });
          t.observe(e);
          let l = e.getBoundingClientRect();
          return (
            (e0.current = { w: l.width, h: l.height }),
            () => t.disconnect()
          );
        }, [tD]),
        (0, t.useEffect)(() => {
          let e = tD.current;
          if (!e) return;
          let t = (t) => {
              if (!eF.current.scrub) return;
              let l = e.getBoundingClientRect();
              tt.current = t.clientX - l.left;
            },
            l = () => {
              ((tt.current = null), eF.current.onHover?.(null));
            },
            r = (t) => {
              if (!eF.current.scrub || 1 !== t.touches.length) return;
              let l = e.getBoundingClientRect();
              tt.current = t.touches[0].clientX - l.left;
            },
            n = (t) => {
              if (!eF.current.scrub || 1 !== t.touches.length) return;
              t.preventDefault();
              let l = e.getBoundingClientRect();
              tt.current = t.touches[0].clientX - l.left;
            },
            o = () => {
              ((tt.current = null), eF.current.onHover?.(null));
            };
          return (
            e.addEventListener("mousemove", t),
            e.addEventListener("mouseleave", l),
            e.addEventListener("touchstart", r, { passive: !0 }),
            e.addEventListener("touchmove", n, { passive: !1 }),
            e.addEventListener("touchend", o),
            e.addEventListener("touchcancel", o),
            () => {
              (e.removeEventListener("mousemove", t),
                e.removeEventListener("mouseleave", l),
                e.removeEventListener("touchstart", r),
                e.removeEventListener("touchmove", n),
                e.removeEventListener("touchend", o),
                e.removeEventListener("touchcancel", o));
            }
          );
        }, [tD]),
        (0, t.useEffect)(() => {
          let e = window.matchMedia("(prefers-reduced-motion: reduce)");
          eQ.current = e.matches;
          let t = (e) => {
            eQ.current = e.matches;
          };
          return (
            e.addEventListener("change", t),
            () => e.removeEventListener("change", t)
          );
        }, []),
        (0, t.useEffect)(() => {
          let e = () => {
            document.hidden ||
              e2.current ||
              (e2.current = requestAnimationFrame(tz));
          };
          return (
            document.addEventListener("visibilitychange", e),
            () => document.removeEventListener("visibilitychange", e)
          );
        }, []),
        (tz = (0, t.useCallback)(() => {
          var e;
          let t;
          if (document.hidden) {
            e2.current = 0;
            return;
          }
          let l = tV.current,
            { w: r, h: n } = e0.current;
          if (!l || 0 === r || 0 === n) {
            e2.current = requestAnimationFrame(tz);
            return;
          }
          let o = eF.current,
            a =
              "u" < typeof window
                ? 1
                : Math.min(window.devicePixelRatio || 1, 3),
            h = performance.now(),
            f = e5.current ? Math.min(h - e5.current, 50) : 16.67;
          e5.current = h;
          let p = () => {
              for (let e of e4.current.values())
                "none" !== e.wrap.style.display &&
                  (e.wrap.style.display = "none");
              for (let e of e6.current.values())
                "none" !== e.wrap.style.display &&
                  (e.wrap.style.display = "none");
              e8.current && (e8.current.style.display = "none");
            },
            g = () => {
              ((e9.current = null),
                e8.current && (e8.current.style.display = "none"));
            },
            m = Math.round(r * a),
            R = Math.round(n * a);
          (l.width !== m || l.height !== R) &&
            ((l.width = m),
            (l.height = R),
            (l.style.width = `${r}px`),
            (l.style.height = `${n}px`));
          let C = e1.current;
          if (
            ((C && C.canvas === l) || (e1.current = C = l.getContext("2d")), !C)
          ) {
            e2.current = requestAnimationFrame(tz);
            return;
          }
          ((e = C).setTransform(a, 0, 0, a, 0, 0), e.clearRect(0, 0, r, n));
          let E = eQ.current,
            F = "candle" === o.mode;
          if (F)
            (o.paused &&
              null === tL.current &&
              (o.candles?.length ?? 0) > 0 &&
              ((tL.current = o.candles.slice()),
              (t$.current = o.liveCandle ?? null),
              (tE.current = o.lineData?.slice() ?? null),
              (tP.current = o.lineValue ?? null)),
              o.paused ||
                ((tL.current = null),
                (t$.current = null),
                (tE.current = null),
                (tP.current = null)));
          else if (o.isMultiSeries && o.multiSeries) {
            if (o.paused && null === th.current) {
              let e = new Map();
              for (let t of o.multiSeries)
                t.data.length >= 2 &&
                  e.set(t.id, { data: t.data.slice(), value: t.value });
              e.size > 0 && (th.current = e);
            }
            o.paused || (th.current = null);
          } else
            (o.paused &&
              null === td.current &&
              o.data.length >= 2 &&
              (td.current = o.data.slice()),
              o.paused || (td.current = null));
          let B = F ? [] : (td.current ?? o.data),
            I = F ? (tL.current ?? o.candles ?? []) : [],
            z =
              !!o.isMultiSeries &&
              !!o.multiSeries &&
              o.multiSeries.some((e) => e.data.length >= 2),
            U = F ? I.length >= 2 : z || B.length >= 2,
            N = o.padding,
            _ = n - N.top - N.bottom,
            q = +!!o.paused;
          ((ta.current = E ? q : i(ta.current, q, 0.12, f)),
            ta.current < 0.005 && (ta.current = 0),
            ta.current > 0.995 && (ta.current = 1));
          let J = ta.current,
            K = f * (1 - J),
            Z = f / 1e3;
          if (((ti.current += Z * J), !o.paused && ti.current > 0.001)) {
            let e = ti.current > 10 ? 0.22 : 0.08;
            ((ti.current = i(ti.current, 0, e, f)),
              ti.current < 0.01 && (ti.current = 0));
          }
          let Q = +!!o.loading;
          ((tf.current = E ? Q : i(tf.current, Q, 0.14, f)),
            tf.current < 0.01 && (tf.current = 0),
            tf.current > 0.99 && (tf.current = 1));
          let ee = tf.current,
            et = !o.loading && U ? 1 : 0;
          ((to.current = E ? et : i(to.current, et, 1 === et ? 0.09 : 0.14, f)),
            0.005 > Math.abs(to.current - et) && (to.current = et));
          let el = to.current;
          el < 0.01 && (eX.current = !1);
          let er = !1;
          if (
            (F
              ? (t = !U && el > 0.005 && tW.current.length > 0)
              : ((er = !U && el > 0.005 && tu.current.length > 0),
                z &&
                  o.multiSeries &&
                  (tu.current = o.multiSeries.map((e) => ({
                    id: e.id,
                    data: e.data.slice(),
                    value: e.value,
                    palette: e.palette,
                    label: e.label,
                  }))),
                U && !o.isMultiSeries && (tu.current = []),
                (t = !er && !U && el > 0.005 && ts.current.length >= 2),
                U && !o.isMultiSeries && (ts.current = B)),
            F)
          ) {
            let e = tw.current,
              t = +!!o.lineMode;
            if (
              (e.to !== t &&
                ((e.from = tM.current), (e.to = t), (e.startMs = h)),
              e.startMs > 0)
            ) {
              let t = Math.min((h - e.startMs) / 500, 1);
              ((tM.current =
                e.from + (e.to - e.from) * ((1 - Math.cos(t * Math.PI)) / 2)),
                t >= 1 && ((tM.current = e.to), (e.startMs = 0)));
            } else tM.current = e.to;
          }
          if (!U && !t && !er) {
            let e =
              F || o.isMultiSeries || tu.current.length > 0
                ? o.palette.gridLabel
                : void 0;
            (ee > 0.01 && W(C, r, n, N, o.palette, h, ee, e),
              1 - ee > 0.01 &&
                $(C, r, n, N, o.palette, 1 - ee, h, !1, o.emptyText),
              C.save(),
              (C.globalCompositeOperation = "destination-out"));
            let t = C.createLinearGradient(N.left, 0, N.left + 40, 0);
            (t.addColorStop(0, "rgba(0, 0, 0, 1)"),
              t.addColorStop(1, "rgba(0, 0, 0, 0)"),
              (C.fillStyle = t),
              C.fillRect(0, 0, N.left + 40, n),
              C.restore(),
              e3.current && (e3.current.container.style.display = "none"),
              p(),
              (e2.current = requestAnimationFrame(tz)));
            return;
          }
          if (F) {
            let e, l, a, s, c;
            U && (tc.current = Date.now() / 1e3 - ti.current);
            let p =
                U || el < 0.005 ? Date.now() / 1e3 - ti.current : tc.current,
              m = tL.current ? (t$.current ?? void 0) : o.liveCandle,
              v = tE.current ?? o.lineData,
              y = tP.current ?? o.lineValue;
            (U && v && v.length > 0 && ((tB.current = v), (tI.current = y)),
              t &&
                tB.current.length > 0 &&
                ((v = tB.current), (y = tI.current)));
            let w = o.candleWidth ?? 1,
              S = tR.current,
              R = -1;
            if (S.startMs > 0) {
              let t = Math.min((h - S.startMs) / 300, 1);
              ((R = (1 - Math.cos(t * Math.PI)) / 2),
                (e = Math.exp(
                  Math.log(S.fromWidth) +
                    (Math.log(S.toWidth) - Math.log(S.fromWidth)) * R,
                )),
                t >= 1 && ((e = S.toWidth), (S.startMs = 0), (R = -1)));
            } else e = S.toWidth;
            if (w !== S.toWidth) {
              ((S.oldCandles = tC.current.candles),
                (S.oldWidth = tC.current.width),
                (S.fromWidth = e),
                (S.toWidth = w),
                (S.startMs = h),
                (R = 0),
                (S.rangeFromMin = eV.current),
                (S.rangeFromMax = eD.current));
              let t = eY.current,
                l = p + 0.015 * t,
                r = l - t,
                n = [];
              for (let e of I) e.time + w >= r && e.time <= l && n.push(e);
              if ((m && n.push(m), n.length > 0)) {
                let e = G(n);
                ((S.rangeToMin = e.min), (S.rangeToMax = e.max));
              } else ((S.rangeToMin = eV.current), (S.rangeToMax = eD.current));
            }
            tC.current = { candles: o.candles ?? [], width: w };
            let W = tM.current,
              F = tT.current,
              B = v && v.length > 0,
              z = o.lineMode && W >= 0.3 && B ? 1 : 0;
            if (
              (F.to !== z &&
                ((F.from = tS.current), (F.to = z), (F.startMs = h)),
              F.startMs > 0)
            ) {
              let e = Math.min((h - F.startMs) / 350, 1);
              ((l = F.from + (F.to - F.from) * (1 - (1 - e) * (1 - e))),
                e >= 1 && ((l = F.to), (F.startMs = 0)));
            } else l = F.to;
            tS.current = l;
            let V = eG.current,
              D = (function (e, t, l, r, n, o, a, i, s, u) {
                let c;
                if (t.to !== e) {
                  ((t.from = l),
                    (t.to = e),
                    (t.startMs = o),
                    (t.rangeFromMin = r),
                    (t.rangeFromMax = n));
                  let c = a + 0.015 * e,
                    d = c - e,
                    h = [];
                  for (let e of i) e.time + u >= d && e.time <= c && h.push(e);
                  if (
                    (s && s.time + u >= d && s.time <= c && h.push(s),
                    h.length > 0)
                  ) {
                    let e = G(h);
                    ((t.rangeToMin = e.min), (t.rangeToMax = e.max));
                  }
                }
                let d = 0;
                if (0 === t.startMs) c = e;
                else {
                  let l = Math.min((o - t.startMs) / 750, 1),
                    r = (1 - Math.cos(l * Math.PI)) / 2;
                  d = r;
                  let n = Math.log(t.from);
                  ((c = Math.exp(n + (Math.log(t.to) - n) * r)),
                    l >= 1 && ((c = e), (t.startMs = 0), (d = 0)));
                }
                return { windowSecs: c, windowTransProgress: d };
              })(
                o.windowSecs,
                V,
                eY.current,
                eV.current,
                eD.current,
                h,
                p,
                I,
                m,
                w,
              );
            eY.current = D.windowSecs;
            let O = D.windowSecs,
              q = D.windowTransProgress,
              Z = V.startMs > 0,
              Q = p + 0.015 * O,
              et = Q - O;
            if (m) {
              let e = tp.current;
              if (e && e.time === m.time) {
                let e = tp.current;
                ((e.open = i(e.open, m.open, 0.25, K)),
                  (e.high = i(e.high, m.high, 0.25, K)),
                  (e.low = i(e.low, m.low, 0.25, K)),
                  (e.close = i(e.close, m.close, 0.25, K)));
              } else
                ((tp.current = {
                  time: m.time,
                  open: m.open,
                  high: m.open,
                  low: m.open,
                  close: m.open,
                }),
                  (tg.current = 0));
              ((tg.current = i(tg.current, 1, 0.2, K)),
                tg.current > 0.99 && (tg.current = 1));
              let t = tp.current,
                l = +(t.close >= t.open);
              ((tm.current = i(tm.current, l, 0.12, K)),
                tm.current > 0.99 && (tm.current = 1),
                tm.current < 0.01 && (tm.current = 0),
                (a = t));
            } else ((tp.current = null), (tg.current = 1), (tm.current = 0.5));
            if (
              (m
                ? ty.current
                  ? ((tv.current = i(tv.current, m.close, 0.25, K)),
                    Math.abs(tv.current - m.close) <
                      5e-4 * (eD.current - eV.current || 1) &&
                      (tv.current = m.close))
                  : ((tv.current = m.close), (ty.current = !0))
                : t || (ty.current = !1),
              m)
            )
              if (tx.current) {
                let e = Math.abs(m.close - tb.current),
                  t = eD.current - eV.current || 1,
                  l = Math.min(e / t, 1);
                ((tb.current = i(tb.current, m.close, 0.08 + (1 - l) * 0.2, K)),
                  e < 0.001 * t && (tb.current = m.close));
              } else ((tb.current = m.close), (tx.current = !0));
            else t || (tx.current = !1);
            if (void 0 !== y && B)
              if (tA.current) {
                let e = Math.abs(y - tk.current),
                  t = eD.current - eV.current || 1,
                  l = Math.min(e / t, 1);
                ((tk.current = i(tk.current, y, 0.08 + (1 - l) * 0.2, K)),
                  e < 0.001 * t && (tk.current = y));
              } else ((tk.current = y), (tA.current = !0));
            else t || (tA.current = !1);
            let er = [];
            for (let e of I) e.time + w >= et && e.time <= Q && er.push(e);
            a && a.time + e >= et && a.time <= Q && er.push(a);
            let en = [];
            if (R >= 0 && S.oldCandles.length > 0)
              for (let e of S.oldCandles)
                e.time + S.oldWidth >= et && e.time <= Q && en.push(e);
            U && ((tW.current = er), (tF.current = a ?? null));
            let eo = t ? tW.current : er,
              ea = t ? (tF.current ?? void 0) : a,
              ei = r - N.left - N.right,
              es = (function (e, t, l, r, n, o, a, s, u) {
                if (!t)
                  return {
                    minVal: e.min,
                    maxVal: e.max,
                    valRange: e.max - e.min || 0.001,
                    displayMin: e.min,
                    displayMax: e.max,
                    rangeInited: !0,
                  };
                if (n)
                  ((l = a.rangeFromMin + (a.rangeToMin - a.rangeFromMin) * o),
                    (r = a.rangeFromMax + (a.rangeToMax - a.rangeFromMax) * o));
                else {
                  let t = r - l || 1,
                    n =
                      0.15 +
                      (1 -
                        Math.min(
                          (Math.abs(l - e.min) + Math.abs(r - e.max)) / t,
                          1,
                        )) *
                        0.2;
                  ((l = i(l, e.min, n, u)), (r = i(r, e.max, n, u)));
                  let o = (0.5 * t) / s || 0.001;
                  (Math.abs(l - e.min) < o && (l = e.min),
                    Math.abs(r - e.max) < o && (r = e.max));
                }
                return {
                  minVal: l,
                  maxVal: r,
                  valRange: r - l || 0.001,
                  displayMin: l,
                  displayMax: r,
                  rangeInited: !0,
                };
              })(
                eo.length > 0 ? G(eo) : { min: eV.current, max: eD.current },
                eX.current,
                eV.current,
                eD.current,
                Z,
                q,
                V,
                _,
                K,
              );
            (R >= 0 &&
              ((es.displayMin =
                S.rangeFromMin + (S.rangeToMin - S.rangeFromMin) * R),
              (es.displayMax =
                S.rangeFromMax + (S.rangeToMax - S.rangeFromMax) * R),
              (es.minVal = es.displayMin),
              (es.maxVal = es.displayMax),
              (es.valRange = es.displayMax - es.displayMin || 0.001)),
              (eX.current = es.rangeInited),
              (eV.current = es.displayMin),
              (eD.current = es.displayMax));
            let { minVal: eu, maxVal: ec, valRange: ed } = es,
              eh = {
                w: r,
                h: n,
                pad: N,
                chartW: ei,
                chartH: _,
                leftEdge: et,
                rightEdge: Q,
                minVal: eu,
                maxVal: ec,
                valRange: ed,
                toX: (e) => N.left + ((e - et) / (Q - et)) * ei,
                toY: (e) => N.top + (1 - (e - eu) / ed) * _,
              },
              ef = tt.current,
              ep = null,
              eg = !1;
            null !== ef &&
              ef >= N.left &&
              ef <= r - N.right &&
              (ep = H(eo, ef, e, eh)) &&
              (eg = !0);
            let em = +!!eg;
            ((tl.current = i(tl.current, em, 0.12, f)),
              tl.current < 0.01 && (tl.current = 0),
              tl.current > 0.99 && (tl.current = 1));
            let eb = tl.current,
              ex = ef,
              ev = 0,
              ey = ep;
            !eg && eb > 0 && tr.current
              ? ((ex = tr.current.x),
                (ev = tr.current.time),
                (ey = H(eo, tr.current.x, e, eh)))
              : eg &&
                null !== ef &&
                ((ev =
                  eh.leftEdge +
                  ((ef - N.left) / ei) * (eh.rightEdge - eh.leftEdge)),
                (tr.current = { x: ef, value: ep?.close ?? 0, time: ev }));
            let eM = eo,
              ew = en,
              eS = ea;
            if (W > 0.01 && eS && tx.current) {
              let e = eS.close + (tb.current - eS.close) * W;
              eS = { ...eS, close: e };
              let t = eM.length - 1;
              t >= 0 &&
                eM[t].time === eS.time &&
                ((eM = eM.slice())[t] = { ...eM[t], close: e });
            }
            if (W > 0.01 && W < 0.99) {
              let e = (e) => {
                let t = 1 - W;
                return {
                  time: e.time,
                  open: e.close + (e.open - e.close) * t,
                  high: e.close + (e.high - e.close) * t,
                  low: e.close + (e.low - e.close) * t,
                  close: e.close,
                };
              };
              ((eM = eM.map(e)),
                ew.length > 0 && (ew = ew.map(e)),
                eS && (eS = e(eS)));
            }
            if (v && v.length > 0 && (l > 0.01 || W > 0.05)) {
              let t = [];
              for (let l of eM) t.push({ t: l.time + e / 2, v: l.close });
              (eS && t.push({ t: p, v: eS.close }), (s = []));
              let r = 0;
              for (let e of v) {
                let n;
                if (e.time < et || e.time > Q) continue;
                for (; r < t.length - 2 && t[r + 1].t < e.time; ) r++;
                if (0 === t.length) n = e.value;
                else if (1 === t.length || e.time <= t[0].t) n = t[0].v;
                else if (r >= t.length - 1) n = t[t.length - 1].v;
                else {
                  let l = t[r],
                    o = t[r + 1],
                    a = o.t - l.t,
                    i =
                      a > 0 ? Math.max(0, Math.min(1, (e.time - l.t) / a)) : 0;
                  n = l.v + (o.v - l.v) * i;
                }
                let o = n + (e.value - n) * l;
                s.push({ time: e.time, value: o });
              }
              let n = tA.current ? tk.current : (y ?? v[v.length - 1].value);
              c = tb.current + (n - tb.current) * l;
            } else
              ((s = eM.map((t) => ({ time: t.time + e / 2, value: t.close }))),
                (c = tx.current
                  ? tb.current
                  : (eS?.close ?? eM[eM.length - 1]?.close ?? 0)));
            if (el < 1 && s.length >= 2) {
              let e = s[0].time,
                t = Q - et;
              if (e - et > 0.05 * t) {
                let l = s[0].value,
                  r = t / 32,
                  n = [];
                for (let t = et; t < e - 0.5 * r; t += r)
                  n.push({ time: t, value: l });
                s = [...n, ...s];
              }
            }
            let eT = X(
              o,
              eh,
              tD.current,
              e4.current,
              e6.current,
              e8.current,
              e9.current,
              e7.current,
              el,
              J,
            );
            Y(eT.activeCluster, e8.current, o, eh, te.current, eF, g);
            let ek = eT.items;
            if (
              (!(function (e, t, l, r) {
                let n,
                  { w: o, h: a, pad: i, chartW: s, chartH: u } = t,
                  c = r.chartReveal,
                  h = r.lineModeProg >= 0.99,
                  f = Math.max(
                    r.lineModeProg,
                    h ? 1 - c : (1 - c) * (1 - c) * (1 - c),
                  ),
                  p = f > 0.001 ? r.lineModeProg / f : 1,
                  g = (e, t) => {
                    let l = Math.max(0, Math.min(1, (c - e) / (t - e)));
                    return l * l * (3 - 2 * l);
                  },
                  m = g(0.25, 0.6);
                if (
                  (r.showGrid &&
                    m > 0.01 &&
                    (e.save(),
                    m < 1 && (e.globalAlpha = m),
                    d(e, t, l, r.formatValue, r.gridState, r.dt),
                    e.restore()),
                  f > 0.01 && r.lineVisible.length >= 2)
                ) {
                  let o = r.scrubAmount > 0.05 ? r.hoverX : null;
                  (e.save(),
                    (e.globalAlpha = f),
                    (n = b(
                      e,
                      t,
                      l,
                      r.lineVisible,
                      r.lineSmoothValue,
                      r.now,
                      r.lineModeProg > 0.01,
                      o,
                      r.scrubAmount,
                      r.chartReveal,
                      r.now_ms,
                      p,
                      !h,
                      r.lineModeProg,
                    )),
                    e.restore());
                }
                let v = g(0.4, 0.8),
                  y = r.closePriceCandle ?? r.liveCandle;
                if (
                  y &&
                  v > 0.01 &&
                  (f < 0.99 &&
                    (e.save(),
                    (e.globalAlpha = v * (1 - f)),
                    !(function (e, t, l, r, n = -1) {
                      let o = t.toY(l.close);
                      if (o < t.pad.top || o > t.h - t.pad.bottom) return;
                      let a = l.close >= l.open,
                        i = n >= 0 ? A(n) : a ? T : k,
                        s = e.globalAlpha;
                      (e.save(),
                        e.setLineDash([4, 4]),
                        (e.strokeStyle = i),
                        (e.lineWidth = 1),
                        (e.globalAlpha = s * (1 - 0.3 * r) * 0.4),
                        e.beginPath(),
                        e.moveTo(t.pad.left, o),
                        e.lineTo(t.w - t.pad.right, o),
                        e.stroke(),
                        e.setLineDash([]),
                        e.restore());
                    })(e, t, y, r.scrubAmount, r.liveBullBlend),
                    e.restore()),
                  f > 0.01 && !h)
                ) {
                  let n = t.toY(y.close);
                  n >= i.top &&
                    n <= a - i.bottom &&
                    (e.save(),
                    e.setLineDash([4, 4]),
                    (e.strokeStyle = l.dashLine),
                    (e.lineWidth = 1),
                    (e.globalAlpha = v * f * (1 - 0.2 * r.scrubAmount)),
                    e.beginPath(),
                    e.moveTo(i.left, n),
                    e.lineTo(o - i.right, n),
                    e.stroke(),
                    e.setLineDash([]),
                    e.restore());
                }
                let w = r.chartReveal * (1 - f);
                if (w > 0.01) {
                  let n = c * c * (3 - 2 * c),
                    o = (e) =>
                      n >= 0.99
                        ? e
                        : {
                            time: e.time,
                            open: e.close + (e.open - e.close) * n,
                            high: e.close + (e.high - e.close) * n,
                            low: e.close + (e.low - e.close) * n,
                            close: e.close,
                          },
                    a = n < 0.99 ? r.candles.map(o) : r.candles,
                    d =
                      n < 0.99 && r.oldCandles.length > 0
                        ? r.oldCandles.map(o)
                        : r.oldCandles;
                  (e.save(),
                    e.beginPath(),
                    e.rect(i.left - 1, i.top, s + 2, u),
                    e.clip());
                  let h = f > 0.01 ? l.line : void 0;
                  (r.morphT >= 0 && d.length > 0
                    ? ((e.globalAlpha = (1 - r.morphT) * w),
                      L(
                        e,
                        t,
                        d,
                        r.oldWidth,
                        -1,
                        r.now_ms,
                        r.hoverX ?? 0,
                        r.scrubAmount,
                        1,
                        -1,
                        h,
                        f,
                      ),
                      (e.globalAlpha = r.morphT * w),
                      L(
                        e,
                        t,
                        a,
                        r.displayCandleWidth,
                        r.liveCandle?.time ?? -1,
                        r.now_ms,
                        r.hoverX ?? 0,
                        r.scrubAmount,
                        r.liveBirthAlpha,
                        r.liveBullBlend,
                        h,
                        f,
                      ),
                      (e.globalAlpha = 1))
                    : (w < 1 && (e.globalAlpha = w),
                      L(
                        e,
                        t,
                        a,
                        r.displayCandleWidth,
                        r.liveCandle?.time ?? -1,
                        r.now_ms,
                        r.hoverX ?? 0,
                        r.scrubAmount,
                        r.liveBirthAlpha,
                        r.liveBullBlend,
                        h,
                        f,
                      )),
                    e.restore());
                }
                if (f > 0.5 && n && n.length > 0 && c > 0.3) {
                  let t = n[n.length - 1],
                    o = (f - 0.5) * 2 * ((c - 0.3) / 0.7),
                    a = f > 0.8 && c > 0.6;
                  o > 0.01 &&
                    (e.save(),
                    (e.globalAlpha = o),
                    x(e, t[0], t[1], l, a, r.scrubAmount, r.now_ms),
                    e.restore());
                }
                let S = g(0.25, 0.6);
                (S > 0.01 &&
                  (e.save(),
                  S < 1 && (e.globalAlpha = S),
                  M(
                    e,
                    t,
                    l,
                    r.targetWindowSecs,
                    r.targetWindowSecs,
                    r.formatTime,
                    r.timeAxisState,
                    r.dt,
                  ),
                  e.restore()),
                  r.markers && r.markers.length > 0 && P(e, t, l, r.markers),
                  e.save(),
                  (e.globalCompositeOperation = "destination-out"));
                let R = e.createLinearGradient(i.left, 0, i.left + 40, 0);
                if (
                  (R.addColorStop(0, "rgba(0, 0, 0, 1)"),
                  R.addColorStop(1, "rgba(0, 0, 0, 0)"),
                  (e.fillStyle = R),
                  e.fillRect(0, 0, i.left + 40, a),
                  e.restore(),
                  r.showEmptyOverlay)
                ) {
                  let t = 1 - r.chartReveal;
                  if (t > 0.01) {
                    let n = (1 - r.loadingAlpha) * t;
                    n > 0.01 && $(e, o, a, i, l, n, r.now_ms, !0, r.emptyText);
                  }
                }
                r.chartReveal > 0.7 &&
                  r.hoveredCandle &&
                  null !== r.hoverX &&
                  r.scrubAmount > 0.01 &&
                  (r.lineModeProg > 0.5
                    ? (function (e, t, l, r, n, o, a, i, s) {
                        if (s < 0.01) return;
                        let { h: u, pad: c } = t,
                          d = t.toY(n);
                        if (
                          (e.save(),
                          (e.globalAlpha = 0.5 * s),
                          (e.strokeStyle = l.crosshairLine),
                          (e.lineWidth = 1),
                          e.beginPath(),
                          e.moveTo(r, c.top),
                          e.lineTo(r, u - c.bottom),
                          e.stroke(),
                          (e.globalAlpha = 0.3 * s),
                          e.beginPath(),
                          e.moveTo(c.left, d),
                          e.lineTo(t.w - c.right, d),
                          e.stroke(),
                          e.restore(),
                          s < 0.1 || t.w < 200)
                        )
                          return;
                        let h = a(n),
                          f = i(o);
                        (e.save(),
                          (e.globalAlpha = s),
                          (e.font = '400 13px "SF Mono", Menlo, monospace'),
                          (e.textAlign = "left"));
                        let p = [
                            { text: h, color: l.line },
                            { text: "  ·  ", color: l.gridLabel },
                            { text: f, color: l.gridLabel },
                          ],
                          g = 0,
                          m = [];
                        for (let t of p) {
                          let l = e.measureText(t.text).width;
                          (m.push(l), (g += l));
                        }
                        let b = r - g / 2,
                          x = c.left + 4,
                          v = t.w - c.right - g;
                        (b < x && (b = x), b > v && (b = v));
                        let y = c.top + 24;
                        ((e.strokeStyle = l.tooltipBg),
                          (e.lineWidth = 3),
                          (e.lineJoin = "round"));
                        let M = b;
                        for (let t = 0; t < p.length; t++)
                          (e.strokeText(p[t].text, M, y), (M += m[t]));
                        M = b;
                        for (let t = 0; t < p.length; t++)
                          ((e.fillStyle = p[t].color),
                            e.fillText(p[t].text, M, y),
                            (M += m[t]));
                        e.restore();
                      })(
                        e,
                        t,
                        l,
                        r.hoverX,
                        r.hoveredCandle.close,
                        r.hoverTime ?? 0,
                        r.formatValue,
                        r.formatTime,
                        r.scrubAmount,
                      )
                    : (function (e, t, l, r, n, o, a, i, s) {
                        let u;
                        if (s < 0.01) return;
                        let { h: c, pad: d } = t;
                        if (
                          (e.save(),
                          (e.globalAlpha = 0.5 * s),
                          (e.strokeStyle = l.crosshairLine),
                          (e.lineWidth = 1),
                          e.beginPath(),
                          e.moveTo(r, d.top),
                          e.lineTo(r, c - d.bottom),
                          e.stroke(),
                          e.restore(),
                          s < 0.1 || t.w < 200)
                        )
                          return;
                        let h = n.close >= n.open ? T : k,
                          f = a(n.close),
                          p = i(o);
                        if (
                          (e.save(),
                          (e.globalAlpha = s),
                          (e.font = '400 13px "SF Mono", Menlo, monospace'),
                          (e.textAlign = "left"),
                          t.w >= 400)
                        ) {
                          let e = a(n.open),
                            t = a(n.high),
                            r = a(n.low);
                          u = [
                            { text: "O ", color: l.gridLabel },
                            { text: e, color: h },
                            { text: "   H ", color: l.gridLabel },
                            { text: t, color: h },
                            { text: "   L ", color: l.gridLabel },
                            { text: r, color: h },
                            { text: "   C ", color: l.gridLabel },
                            { text: f, color: h },
                            { text: "  ·  ", color: l.gridLabel },
                            { text: p, color: l.gridLabel },
                          ];
                        } else
                          u = [
                            { text: "C ", color: l.gridLabel },
                            { text: f, color: h },
                            { text: "  ·  ", color: l.gridLabel },
                            { text: p, color: l.gridLabel },
                          ];
                        let g = 0,
                          m = [];
                        for (let t of u) {
                          let l = e.measureText(t.text).width;
                          (m.push(l), (g += l));
                        }
                        let b = r - g / 2,
                          x = d.left + 4,
                          v = t.w - d.right - g;
                        (b < x && (b = x), b > v && (b = v));
                        let y = d.top + 24;
                        ((e.strokeStyle = l.tooltipBg),
                          (e.lineWidth = 3),
                          (e.lineJoin = "round"));
                        let M = b;
                        for (let t = 0; t < u.length; t++)
                          (e.strokeText(u[t].text, M, y), (M += m[t]));
                        M = b;
                        for (let t = 0; t < u.length; t++)
                          ((e.fillStyle = u[t].color),
                            e.fillText(u[t].text, M, y),
                            (M += m[t]));
                        e.restore();
                      })(
                        e,
                        t,
                        l,
                        r.hoverX,
                        r.hoveredCandle,
                        r.hoverTime ?? 0,
                        r.formatValue,
                        r.formatTime,
                        r.scrubAmount,
                      ));
              })(C, eh, o.palette, {
                candles: eM,
                displayCandleWidth: e,
                oldCandles: ew,
                oldWidth: S.oldWidth,
                morphT: R,
                liveCandle: eS,
                closePriceCandle:
                  ty.current && m ? { ...m, close: tv.current } : m,
                liveTime: ea?.time ?? -1,
                liveBirthAlpha: tg.current,
                liveBullBlend: tm.current,
                lineModeProg: W,
                chartReveal: el,
                now_ms: h,
                now: p,
                pauseProgress: J,
                showGrid: o.showGrid,
                scrubAmount: eb,
                hoverX: ex,
                hoverValue: ey?.close ?? null,
                hoverTime: ev,
                hoveredCandle: ey,
                formatValue: o.formatValue,
                formatTime: o.formatTime,
                gridState: eU.current,
                timeAxisState: eN.current,
                dt: K,
                targetWindowSecs: o.windowSecs,
                tooltipY: o.tooltipY,
                tooltipOutline: o.tooltipOutline,
                lineVisible: s,
                lineSmoothValue: c,
                emptyText: o.emptyText,
                loadingAlpha: ee,
                showEmptyOverlay: !o.loading && ee < 0.01,
                markers: ek,
              }),
              e3.current)
            )
              if (W > 0.5 && o.showBadge) {
                let e = u(s);
                eZ.current = j(
                  e3.current,
                  o,
                  c,
                  eh,
                  e,
                  eZ.current,
                  eK.current,
                  Z,
                  E,
                  C,
                  K,
                  el,
                );
                let t = (W - 0.5) * 2;
                if ("none" !== e3.current.container.style.display) {
                  let e = e3.current.container.style.opacity
                    ? parseFloat(e3.current.container.style.opacity)
                    : 1;
                  e3.current.container.style.opacity = String(e * t * (1 - J));
                }
              } else e3.current.container.style.display = "none";
          } else if (
            (o.isMultiSeries && o.multiSeries && o.multiSeries.length > 0) ||
            er
          ) {
            let e = er ? tu.current : o.multiSeries,
              t = 0;
            if (e.some((e) => e.label)) {
              C.font =
                '600 10px -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif';
              let l = 0;
              for (let t of e)
                if (t.label) {
                  let e = C.measureText(t.label).width;
                  e > l && (l = e);
                }
              t = Math.max(0, l - 2) * el;
            }
            let l = r - N.left - N.right - t,
              a = o.showBadge ? 0.05 : 0.015;
            if (!er) {
              let t = new Set(e.map((e) => e.id));
              for (let e of eI.current.keys()) t.has(e) || eI.current.delete(e);
            }
            let u = e[0],
              m = eG.current;
            U && (tc.current = Date.now() / 1e3 - ti.current);
            let x = er ? tc.current : Date.now() / 1e3 - ti.current,
              w = new Map();
            for (let t of e) {
              let e = eI.current.get(t.id);
              if ((void 0 === e && (e = t.value), !er)) {
                let l = V(t.value, e, eV.current, eD.current, o.lerpSpeed, E);
                e = i(e, t.value, l, K);
                let r = eD.current - eV.current || 1;
                (Math.abs(e - t.value) < 0.001 * r && (e = t.value),
                  eI.current.set(t.id, e));
              }
              w.set(t.id, e);
            }
            let S = o.hiddenSeriesIds,
              T = ez.current;
            for (let t of e) {
              let e = T.get(t.id) ?? 1,
                l = +!S?.has(t.id);
              ((e = E ? l : i(e, l, 0.1, K)) < 0.01 && (e = 0),
                e > 0.99 && (e = 1),
                T.set(t.id, e));
            }
            let k = th.current?.get(u.id)?.data ?? u.data,
              A = D(
                o,
                m,
                eY.current,
                eV.current,
                eD.current,
                E,
                h,
                x,
                k,
                w.get(u.id) ?? u.value,
                a,
              );
            if (m.startMs > 0 && e.length > 1) {
              let t = x + o.windowSecs * a,
                l = t - o.windowSecs,
                r = 1 / 0,
                n = -1 / 0;
              for (let a of e) {
                let e = th.current?.get(a.id)?.data ?? a.data,
                  i = w.get(a.id) ?? a.value,
                  u = [];
                for (let r of e) r.time >= l - 2 && r.time <= t && u.push(r);
                if (u.length > 0) {
                  let e = s(u, i, o.referenceLine?.value, o.exaggerate);
                  (e.min < r && (r = e.min), e.max > n && (n = e.max));
                }
              }
              isFinite(r) &&
                isFinite(n) &&
                ((m.rangeToMin = r), (m.rangeToMax = n));
            }
            eY.current = A.windowSecs;
            let R = A.windowSecs,
              L = A.windowTransProgress,
              F = m.startMs > 0,
              B = x + R * a,
              I = B - R,
              z = B - (B - x) * J,
              j = [],
              G = 1 / 0,
              H = -1 / 0;
            for (let t of e) {
              let e = th.current?.get(t.id),
                l = e?.data ?? t.data,
                r = [];
              for (let e of l) e.time >= I - 2 && e.time <= z && r.push(e);
              let n = w.get(t.id) ?? t.value,
                a = T.get(t.id) ?? 1;
              if (r.length >= 2) {
                if (a > 0.01) {
                  let e = s(r, n, o.referenceLine?.value, o.exaggerate);
                  (e.min < G && (G = e.min), e.max > H && (H = e.max));
                }
                j.push({
                  visible: r,
                  smoothValue: n,
                  palette: t.palette,
                  label: t.label,
                  alpha: a,
                });
              }
            }
            if (0 === j.length) {
              (ee > 0.01 &&
                W(C, r, n, N, o.palette, h, ee, o.palette.gridLabel),
                1 - ee > 0.01 &&
                  $(C, r, n, N, o.palette, 1 - ee, h, !1, o.emptyText),
                C.save(),
                (C.globalCompositeOperation = "destination-out"));
              let e = C.createLinearGradient(N.left, 0, N.left + 40, 0);
              (e.addColorStop(0, "rgba(0, 0, 0, 1)"),
                e.addColorStop(1, "rgba(0, 0, 0, 0)"),
                (C.fillStyle = e),
                C.fillRect(0, 0, N.left + 40, n),
                C.restore(),
                e3.current && (e3.current.container.style.display = "none"),
                p(),
                (e2.current = requestAnimationFrame(tz)));
              return;
            }
            let q = { min: isFinite(G) ? G : 0, max: isFinite(H) ? H : 1 },
              Z = o.lerpSpeed + 0.1,
              Q = O(
                q,
                eX.current,
                eO.current,
                ej.current,
                eV.current,
                eD.current,
                F,
                L,
                m,
                Z,
                _,
                K,
              );
            ((eX.current = Q.rangeInited),
              (eO.current = Q.targetMin),
              (ej.current = Q.targetMax),
              (eV.current = Q.displayMin),
              (eD.current = Q.displayMax));
            let { minVal: en, maxVal: eo, valRange: ea } = Q,
              ei = {
                w: r,
                h: n,
                pad: N,
                chartW: l,
                chartH: _,
                leftEdge: I,
                rightEdge: B,
                minVal: en,
                maxVal: eo,
                valRange: ea,
                toX: (e) => N.left + ((e - I) / (B - I)) * l,
                toY: (e) => N.top + (1 - (e - en) / ea) * _,
              },
              es = tt.current,
              eu = null,
              ec = null,
              ed = !1,
              eh = [];
            if (null !== es && es >= N.left && es <= r - N.right) {
              let e = Math.min(es, ei.toX(x)),
                t = I + ((e - N.left) / l) * (B - I);
              for (let l of ((eu = e), (ec = t), (ed = !0), j)) {
                if ((l.alpha ?? 1) < 0.5) continue;
                let e = c(l.visible, t);
                null !== e &&
                  eh.push({
                    color: l.palette.line,
                    label: l.label ?? "",
                    value: e,
                  });
              }
              ((tr.current = { x: e, value: eh[0]?.value ?? 0, time: t }),
                (tn.current = eh),
                o.onHover?.({
                  time: t,
                  value: eh[0]?.value ?? 0,
                  x: e,
                  y: ei.toY(eh[0]?.value ?? 0),
                }));
            }
            let ef = +!!ed;
            (E
              ? (tl.current = ef)
              : ((tl.current += (ef - tl.current) * 0.12),
                tl.current < 0.01 && (tl.current = 0),
                tl.current > 0.99 && (tl.current = 1)),
              !ed &&
                tl.current > 0 &&
                tr.current &&
                ((eu = tr.current.x),
                (ec = tr.current.time),
                (eh = tn.current)));
            let ep = X(
              o,
              ei,
              tD.current,
              e4.current,
              e6.current,
              e8.current,
              e9.current,
              e7.current,
              el,
              J,
            );
            Y(ep.activeCluster, e8.current, o, ei, te.current, eF, g);
            let eg = ep.items;
            !(function (e, t, l) {
              let r = l.primaryPalette,
                n = l.chartReveal,
                o = (e, t) => {
                  let l = Math.max(0, Math.min(1, (n - e) / (t - e)));
                  return l * l * (3 - 2 * l);
                };
              if (
                (l.referenceLine &&
                  n > 0.01 &&
                  (e.save(),
                  n < 1 && (e.globalAlpha = n),
                  v(e, t, r, l.referenceLine),
                  e.restore()),
                l.showGrid)
              ) {
                let a = n < 1 ? o(0.15, 0.7) : 1;
                a > 0.01 &&
                  (e.save(),
                  a < 1 && (e.globalAlpha = a),
                  d(e, t, r, l.formatValue, l.gridState, l.dt),
                  e.restore());
              }
              let a = l.scrubAmount > 0.05 ? l.hoverX : null,
                i = [];
              for (let r = 0; r < l.series.length; r++) {
                let o = l.series[r],
                  s = o.alpha ?? 1,
                  u = (r > 0 && n < 1 ? Math.min(1, 2 * n) : 1) * s;
                if (u < 0.01) continue;
                (e.save(), u < 1 && (e.globalAlpha = u));
                let c = b(
                  e,
                  t,
                  o.palette,
                  o.visible,
                  o.smoothValue,
                  l.now,
                  !1,
                  a,
                  l.scrubAmount,
                  n,
                  l.now_ms,
                );
                (e.restore(),
                  c &&
                    c.length > 0 &&
                    i.push({
                      pts: c,
                      palette: o.palette,
                      label: o.label,
                      alpha: s,
                    }));
              }
              {
                let a = n < 1 ? o(0.15, 0.7) : 1;
                a > 0.01 &&
                  (e.save(),
                  a < 1 && (e.globalAlpha = a),
                  M(
                    e,
                    t,
                    r,
                    l.windowSecs,
                    l.targetWindowSecs,
                    l.formatTime,
                    l.timeAxisState,
                    l.dt,
                  ),
                  e.restore());
              }
              if (n > 0.3 && i.length > 0) {
                let t = (n - 0.3) / 0.7,
                  r = l.showPulse && n > 0.6 && l.pauseProgress < 0.5;
                for (let n of i) {
                  if (n.alpha < 0.01) continue;
                  let o = n.pts[n.pts.length - 1];
                  (e.save(),
                    (e.globalAlpha = t * n.alpha),
                    r && n.alpha > 0.5
                      ? (function (
                          e,
                          t,
                          l,
                          r,
                          n = !0,
                          o = performance.now(),
                          a = 3,
                        ) {
                          let i = e.globalAlpha;
                          if (n) {
                            let n = (o % 1500) / 900;
                            n < 1 &&
                              (e.beginPath(),
                              e.arc(t, l, 9 + 10 * n, 0, 2 * Math.PI),
                              (e.strokeStyle = r),
                              (e.lineWidth = 1.5),
                              (e.globalAlpha = 0.3 * (1 - n) * i),
                              e.stroke());
                          }
                          ((e.globalAlpha = i),
                            e.beginPath(),
                            e.arc(t, l, a, 0, 2 * Math.PI),
                            (e.fillStyle = r),
                            e.fill());
                        })(e, o[0], o[1], n.palette.line, !0, l.now_ms, 3)
                      : (function (e, t, l, r, n = 3) {
                          (e.beginPath(),
                            e.arc(t, l, n, 0, 2 * Math.PI),
                            (e.fillStyle = r),
                            e.fill());
                        })(e, o[0], o[1], n.palette.line, 3),
                    n.label &&
                      ((e.font =
                        '600 10px -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif'),
                      (e.textAlign = "left"),
                      (e.fillStyle = n.palette.line),
                      e.fillText(n.label, o[0] + 6, o[1] + 3.5)),
                    e.restore());
                }
              }
              (l.markers && l.markers.length > 0 && P(e, t, r, l.markers),
                e.save(),
                (e.globalCompositeOperation = "destination-out"));
              let s = e.createLinearGradient(t.pad.left, 0, t.pad.left + 40, 0);
              if (
                (s.addColorStop(0, "rgba(0, 0, 0, 1)"),
                s.addColorStop(1, "rgba(0, 0, 0, 0)"),
                (e.fillStyle = s),
                e.fillRect(0, 0, t.pad.left + 40, t.h),
                e.restore(),
                l.priceLines &&
                  l.priceLines.length > 0 &&
                  n > 0.01 &&
                  (e.save(),
                  n < 1 && (e.globalAlpha = n),
                  y(e, t, r, l.priceLines, l.formatValue),
                  e.restore()),
                null !== l.hoverX &&
                  null !== l.hoverTime &&
                  l.hoverEntries.length > 0 &&
                  i.length > 0 &&
                  l.scrubAmount > 0.01)
              ) {
                let n = 0;
                for (let e of i) {
                  if (e.alpha < 0.01) continue;
                  let t = e.pts[e.pts.length - 1][0];
                  t > n && (n = t);
                }
                let o = n - l.hoverX,
                  a = Math.min(80, 0.3 * t.chartW),
                  s =
                    o < 5
                      ? 0
                      : o >= a
                        ? l.scrubAmount
                        : ((o - 5) / (a - 5)) * l.scrubAmount;
                s > 0.01 &&
                  (function (e, t, l, r, n, o, a, i, s, u, c, d) {
                    if (s < 0.01 || 0 === o.length) return;
                    let { h, pad: f, toY: p } = t;
                    (e.save(),
                      (e.globalAlpha = 0.5 * s),
                      (e.strokeStyle = l.crosshairLine),
                      (e.lineWidth = 1),
                      e.beginPath(),
                      e.moveTo(r, f.top),
                      e.lineTo(r, h - f.bottom),
                      e.stroke(),
                      e.restore());
                    let g = 4 * Math.min(3 * s, 1);
                    if (g > 0.5)
                      for (let t of ((e.globalAlpha = 1), o)) {
                        let l = p(t.value);
                        (e.beginPath(),
                          e.arc(r, l, g, 0, 2 * Math.PI),
                          (e.fillStyle = t.color),
                          e.fill());
                      }
                    if (s < 0.1 || t.w < 300) return;
                    (e.save(),
                      (e.globalAlpha = s),
                      (e.font = '400 13px "SF Mono", Menlo, monospace'),
                      (e.textAlign = "left"));
                    let m = [{ text: i(n), color: l.gridLabel }];
                    for (let e of o) {
                      (m.push({ text: "  ·  ", color: l.gridLabel }),
                        m.push({ text: " ", color: e.color, isDot: !0 }));
                      let t = e.label ? `${e.label} ` : "";
                      (t && m.push({ text: t, color: l.gridLabel }),
                        m.push({ text: a(e.value), color: l.tooltipText }));
                    }
                    let b = 0,
                      x = [];
                    for (let t of m) {
                      let l = t.isDot ? 12 : e.measureText(t.text).width;
                      (x.push(l), (b += l));
                    }
                    let v = r - b / 2,
                      y = f.left + 4,
                      M = (null != d ? d + 7 : t.w - f.right) - b;
                    (v < y && (v = y), v > M && (v = M));
                    let w = f.top + (u ?? 14) + 10;
                    if (!1 !== c) {
                      ((e.strokeStyle = l.tooltipBg),
                        (e.lineWidth = 3),
                        (e.lineJoin = "round"));
                      let t = v;
                      for (let l = 0; l < m.length; l++) {
                        let r = m[l];
                        (r.isDot || e.strokeText(r.text, t, w), (t += x[l]));
                      }
                    }
                    let S = v;
                    for (let t = 0; t < m.length; t++) {
                      let l = m[t];
                      (l.isDot
                        ? (e.beginPath(),
                          e.arc(S + 4, w - 4, 3.5, 0, 2 * Math.PI),
                          (e.fillStyle = l.color),
                          e.fill())
                        : ((e.fillStyle = l.color), e.fillText(l.text, S, w)),
                        (S += x[t]));
                    }
                    e.restore();
                  })(
                    e,
                    t,
                    r,
                    l.hoverX,
                    l.hoverTime,
                    l.hoverEntries,
                    l.formatValue,
                    l.formatTime,
                    s,
                    l.tooltipY,
                    l.tooltipOutline,
                    n,
                  );
              }
            })(C, ei, {
              series: j,
              now: x,
              showGrid: o.showGrid,
              showPulse: o.showPulse,
              referenceLine: o.referenceLine,
              priceLines: o.priceLines,
              hoverX: eu,
              hoverTime: ec,
              hoverEntries: eh,
              scrubAmount: tl.current,
              windowSecs: R,
              formatValue: o.formatValue,
              formatTime: o.formatTime,
              gridState: eU.current,
              timeAxisState: eN.current,
              dt: f,
              targetWindowSecs: o.windowSecs,
              tooltipY: o.tooltipY,
              tooltipOutline: o.tooltipOutline,
              chartReveal: el,
              pauseProgress: J,
              now_ms: h,
              primaryPalette: o.palette,
              markers: eg,
            });
            let em = 1 - el;
            if (em > 0.01 && 0 === et && !o.loading) {
              let e = (1 - ee) * em;
              e > 0.01 && $(C, r, n, N, o.palette, e, h, !0, o.emptyText);
            }
            e3.current && (e3.current.container.style.display = "none");
          } else {
            let e = t ? ts.current : B,
              l = V(
                o.value,
                eB.current,
                eV.current,
                eD.current,
                o.lerpSpeed,
                E,
              );
            if (!t && ((eB.current = i(eB.current, o.value, l, K)), J < 0.5)) {
              let e = eD.current - eV.current || 1;
              Math.abs(eB.current - o.value) < 0.001 * e &&
                (eB.current = o.value);
            }
            let a = eB.current,
              m = r - N.left - N.right,
              T = o.showBadge ? 0.05 : 0.015,
              k =
                o.showMomentum && o.showBadge
                  ? Math.max(T, 37 / Math.max(m, 1))
                  : T,
              A = eG.current;
            U && (tc.current = Date.now() / 1e3 - ti.current);
            let R = t ? tc.current : Date.now() / 1e3 - ti.current,
              L = D(o, A, eY.current, eV.current, eD.current, E, h, R, e, a, k);
            eY.current = L.windowSecs;
            let W = L.windowSecs,
              F = L.windowTransProgress,
              I = R + W * k,
              z = I - W,
              G = I - (I - R) * J,
              H = [];
            for (let t of e) t.time >= z - 2 && t.time <= G && H.push(t);
            if (H.length < 2) {
              (e3.current && (e3.current.container.style.display = "none"),
                p(),
                (e2.current = requestAnimationFrame(tz)));
              return;
            }
            let q = s(H, a, o.referenceLine?.value, o.exaggerate),
              Z = A.startMs > 0,
              Q = O(
                q,
                eX.current,
                eO.current,
                ej.current,
                eV.current,
                eD.current,
                Z,
                F,
                A,
                l,
                _,
                K,
              );
            ((eX.current = Q.rangeInited),
              (eO.current = Q.targetMin),
              (ej.current = Q.targetMax),
              (eV.current = Q.displayMin),
              (eD.current = Q.displayMax));
            let { minVal: er, maxVal: en, valRange: eo } = Q,
              ea = {
                w: r,
                h: n,
                pad: N,
                chartW: m,
                chartH: _,
                leftEdge: z,
                rightEdge: I,
                minVal: er,
                maxVal: en,
                valRange: eo,
                toX: (e) => N.left + ((e - z) / (I - z)) * m,
                toY: (e) => N.top + (1 - (e - er) / eo) * _,
              },
              ei = o.momentumOverride ?? u(H),
              es = (function (e, t, l, r, n, o, a, i, s, u, d, h, f) {
                let p = null,
                  g = null,
                  m = null,
                  b = !1;
                if (null !== e && e >= t.left && e <= l - t.right) {
                  let l = Math.min(e, r.toX(n)),
                    a = d + ((l - t.left) / f) * (h - d),
                    u = c(o, a);
                  null !== u &&
                    ((p = u),
                    (g = a),
                    (m = l),
                    (b = !0),
                    (i = { x: l, value: u, time: a }),
                    s.onHover?.({ time: a, value: u, x: l, y: r.toY(u) }));
                }
                let x = +!!b;
                u
                  ? (a = x)
                  : ((a += (x - a) * 0.12) < 0.01 && (a = 0),
                    a > 0.99 && (a = 1));
                let v = m,
                  y = p,
                  M = g;
                return (
                  !b && a > 0 && i && ((v = i.x), (y = i.value), (M = i.time)),
                  {
                    hoverX: v,
                    hoverValue: y,
                    hoverTime: M,
                    scrubAmount: a,
                    isActiveHover: b,
                    lastHover: i,
                  }
                );
              })(
                tt.current,
                N,
                r,
                ea,
                R,
                H,
                tl.current,
                tr.current,
                o,
                E,
                z,
                I,
                m,
              );
            ((tl.current = es.scrubAmount), (tr.current = es.lastHover));
            let { hoverX: eu, hoverValue: ec, hoverTime: ed } = es,
              eh = Math.min(5, H.length - 1),
              ef =
                eh > 0
                  ? Math.abs(H[H.length - 1].value - H[H.length - 1 - eh].value)
                  : 0,
              ep = eo > 0 ? Math.min(ef / eo, 1) : 0,
              eg = X(
                o,
                ea,
                tD.current,
                e4.current,
                e6.current,
                e8.current,
                e9.current,
                e7.current,
                el,
                J,
              );
            Y(eg.activeCluster, e8.current, o, ea, te.current, eF, g);
            let em = eg.items;
            !(function (e, t, l, r) {
              let n = r.shakeState,
                o = 0,
                a = 0;
              if (
                (n &&
                  n.amplitude > 0.2 &&
                  ((o = (Math.random() - 0.5) * 2 * n.amplitude),
                  (a = (Math.random() - 0.5) * 2 * n.amplitude),
                  e.save(),
                  e.translate(o, a)),
                n)
              ) {
                let e = Math.pow(0.002, r.dt / 1e3);
                ((n.amplitude *= e), n.amplitude < 0.2 && (n.amplitude = 0));
              }
              let s = r.chartReveal,
                u = r.pauseProgress,
                c = (e, t) => {
                  let l = Math.max(0, Math.min(1, (s - e) / (t - e)));
                  return l * l * (3 - 2 * l);
                };
              if (
                (r.referenceLine &&
                  s > 0.01 &&
                  (e.save(),
                  s < 1 && (e.globalAlpha = s),
                  v(e, t, l, r.referenceLine),
                  e.restore()),
                r.showGrid)
              ) {
                let n = s < 1 ? c(0.15, 0.7) : 1;
                n > 0.01 &&
                  (e.save(),
                  n < 1 && (e.globalAlpha = n),
                  d(e, t, l, r.formatValue, r.gridState, r.dt),
                  e.restore());
              }
              r.orderbookData &&
                r.orderbookState &&
                s > 0.01 &&
                (e.save(),
                s < 1 && (e.globalAlpha = s),
                (function (e, t, l, r, n, o, a) {
                  let { pad: i, h: s, chartH: u } = t,
                    c = n / 1e3;
                  if (0 === r.bids.length && 0 === r.asks.length) return;
                  let d = 0,
                    h = 0,
                    f = 0;
                  for (let [, e] of r.bids) ((h += e), e > d && (d = e));
                  for (let [, e] of r.asks) ((f += e), e > d && (d = e));
                  if (0 === d) return;
                  let p = o.prevBidTotal + o.prevAskTotal,
                    g = 0;
                  (p > 0 &&
                    (g = Math.min(
                      (Math.abs(h - o.prevBidTotal) +
                        Math.abs(f - o.prevAskTotal)) /
                        p,
                      1,
                    )),
                    (o.prevBidTotal = h),
                    (o.prevAskTotal = f));
                  let m = g > o.churnRate ? 0.3 : 0.05;
                  o.churnRate += (g - o.churnRate) * m;
                  let b = Math.max(Math.min(5 * a, 1), o.churnRate),
                    x = 1 - Math.pow(0.95, n / 16.67);
                  o.smoothSpeed += (60 + 100 * b - o.smoothSpeed) * x;
                  let v = o.smoothSpeed,
                    y = i.left + 8,
                    M = s - i.bottom - 6,
                    T = i.top,
                    k = l.bgRgb;
                  for (
                    o.spawnTimer += n;
                    o.spawnTimer >= 40 && o.labels.length < 50;

                  ) {
                    var A;
                    o.spawnTimer -= 40;
                    let e = !1;
                    for (let t = 0; t < o.labels.length; t++)
                      if (22 > Math.abs(o.labels[t].y - M)) {
                        e = !0;
                        break;
                      }
                    if (e) break;
                    let t = [];
                    for (let [, e] of r.bids) t.push({ size: e, green: !0 });
                    for (let [, e] of r.asks) t.push({ size: e, green: !1 });
                    let l = 0;
                    for (let e of t) l += e.size;
                    let n = Math.random() * l,
                      a = t[0];
                    for (let e of t)
                      if ((n -= e.size) <= 0) {
                        a = e;
                        break;
                      }
                    let i = a.size / d;
                    o.labels.push({
                      y: M,
                      text: `+ ${(A = a.size) >= 10 ? `$${Math.round(A)}` : A >= 1 ? `$${A.toFixed(1)}` : `$${A.toFixed(2)}`}`,
                      green: a.green,
                      life: 6,
                      maxLife: 6,
                      intensity: 0.5 + 0.5 * i,
                    });
                  }
                  let R = M - T,
                    C = 0;
                  for (let e = 0; e < o.labels.length; e++) {
                    let t = o.labels[e];
                    if (((t.life -= c), t.life <= 0)) continue;
                    let l = R > 0 ? (t.y - T) / R : 1;
                    ((t.y -= v * (0.7 + 0.3 * l) * c),
                      t.y < T - 14 || (o.labels[C++] = t));
                  }
                  o.labels.length = C;
                  let L = e.globalAlpha;
                  (e.save(),
                    (e.font = '600 13px "SF Mono", Menlo, monospace'),
                    (e.textAlign = "left"),
                    (e.textBaseline = "middle"),
                    (e.globalAlpha = L));
                  let $ = `rgb(${k[0]},${k[1]},${k[2]})`;
                  for (let t = 0; t < o.labels.length; t++) {
                    let l = o.labels[t],
                      r = Math.min((1 - l.life / l.maxLife) * 10, 1),
                      n = (l.y - T) / u,
                      a = n < 0.45 ? n / 0.45 : 1,
                      i = l.intensity * r * a,
                      s = (function (e, t, l) {
                        let r = Math.round(e[0] + (t[0] - e[0]) * l),
                          n = Math.round(e[1] + (t[1] - e[1]) * l),
                          o = Math.round(e[2] + (t[2] - e[2]) * l);
                        return `rgb(${r},${n},${o})`;
                      })(l.green ? w : S, k, 1 - i);
                    ((e.strokeStyle = $),
                      (e.lineWidth = 4),
                      (e.lineJoin = "round"),
                      e.strokeText(l.text, y, l.y),
                      (e.fillStyle = s),
                      e.fillText(l.text, y, l.y));
                  }
                  e.restore();
                })(
                  e,
                  t,
                  l,
                  r.orderbookData,
                  r.dt,
                  r.orderbookState,
                  r.swingMagnitude,
                ),
                e.restore());
              let h = r.scrubAmount > 0.05 ? r.hoverX : null,
                f = b(
                  e,
                  t,
                  l,
                  r.visible,
                  r.smoothValue,
                  r.now,
                  r.showFill,
                  h,
                  r.scrubAmount,
                  s,
                  r.now_ms,
                );
              {
                let n = s < 1 ? c(0.15, 0.7) : 1;
                n > 0.01 &&
                  (e.save(),
                  n < 1 && (e.globalAlpha = n),
                  M(
                    e,
                    t,
                    l,
                    r.windowSecs,
                    r.targetWindowSecs,
                    r.formatTime,
                    r.timeAxisState,
                    r.dt,
                  ),
                  e.restore());
              }
              if (f && f.length > 0) {
                let o = f[f.length - 1],
                  a = r.scrubAmount;
                if (null !== r.hoverX && a > 0) {
                  let e = o[0] - r.hoverX,
                    l = Math.min(80, 0.3 * t.chartW);
                  a =
                    e < 5
                      ? 0
                      : e >= l
                        ? r.scrubAmount
                        : ((e - 5) / (l - 5)) * r.scrubAmount;
                }
                let d = s < 0.3 ? 0 : (s - 0.3) / 0.7,
                  h = r.showPulse && s > 0.6 && u < 0.5;
                if (
                  (d > 0.01 &&
                    (e.save(),
                    d < 1 && (e.globalAlpha = d),
                    x(e, o[0], o[1], l, h, a, r.now_ms),
                    e.restore()),
                  r.showMomentum)
                ) {
                  let t = (s < 1 ? c(0.6, 1) : 1) * (1 - u);
                  t > 0.01 &&
                    (e.save(),
                    t < 1 && (e.globalAlpha = t),
                    (function (e, t, l, r, n, o, a, s = performance.now()) {
                      let u = e.globalAlpha,
                        c = +("up" === r),
                        d = +("down" === r),
                        h = o.down < 0.02,
                        f = o.up < 0.02;
                      ((o.up = i(o.up, h ? c : 0, c > o.up ? 0.08 : 0.04, a)),
                        (o.down = i(
                          o.down,
                          f ? d : 0,
                          d > o.down ? 0.08 : 0.04,
                          a,
                        )),
                        o.up < 0.01 && (o.up = 0),
                        o.down < 0.01 && (o.down = 0),
                        o.up > 0.99 && (o.up = 1),
                        o.down > 0.99 && (o.down = 1));
                      let p = (s % 1400) / 1400,
                        g = (r, o) => {
                          if (o < 0.01) return;
                          let a = t + 19;
                          (e.save(),
                            (e.strokeStyle = n.gridLabel),
                            (e.lineWidth = 2.5),
                            (e.lineCap = "round"),
                            (e.lineJoin = "round"));
                          for (let t = 0; t < 2; t++) {
                            let n = p - 0.2 * t;
                            e.globalAlpha =
                              u *
                              o *
                              (0.3 +
                                0.7 *
                                  (n >= 0 && n < 0.35
                                    ? Math.sin((n / 0.35) * Math.PI)
                                    : 0));
                            let i = -1 === r ? -3 : 3,
                              s = l + r * (8 * t - 4) + i;
                            (e.beginPath(),
                              e.moveTo(a - 5, s - 3.5 * r),
                              e.lineTo(a, s),
                              e.lineTo(a + 5, s - 3.5 * r),
                              e.stroke());
                          }
                          e.restore();
                        };
                      (g(-1, o.up), g(1, o.down), (e.globalAlpha = u));
                    })(
                      e,
                      o[0],
                      o[1],
                      r.momentum,
                      l,
                      r.arrowState,
                      r.dt,
                      r.now_ms,
                    ),
                    e.restore());
                }
                if (r.particleState && s > 0.9) {
                  let t = (function (e, t, l, r, n, o, a, i) {
                    if (
                      ((e.cooldown = Math.max(0, e.cooldown - a)),
                      "flat" === t || e.cooldown > 0)
                    )
                      return 0;
                    if (n < 0.08) return ((e.burstCount = 0), 0);
                    if (
                      ("down" === t && i?.downMomentum !== !0) ||
                      e.burstCount >= 3
                    )
                      return 0;
                    e.cooldown = 400;
                    let s = i?.scale ?? 1,
                      u = "up" === t,
                      c = Math.min(5 * n, 1),
                      d = c > 0.6 ? 1 : ([1, 0.6, 0.35][e.burstCount] ?? 0.35);
                    e.burstCount++;
                    let h = Math.round((12 + 20 * c) * s * d),
                      f = 1 + 0.8 * c;
                    for (let t = 0; t < h && e.particles.length < 80; t++) {
                      let t =
                          (u ? -Math.PI / 2 : Math.PI / 2) +
                          1.2 * Math.PI * (Math.random() - 0.5),
                        n = (60 + 100 * Math.random()) * f;
                      e.particles.push({
                        x: l + (Math.random() - 0.5) * 24,
                        y: r + (Math.random() - 0.5) * 8,
                        vx: Math.cos(t) * n,
                        vy: Math.sin(t) * n,
                        life: 1,
                        size: (1 + 1.2 * Math.random()) * s * d,
                        color: o,
                      });
                    }
                    return d;
                  })(
                    r.particleState,
                    r.momentum,
                    o[0],
                    o[1],
                    r.swingMagnitude,
                    l.line,
                    r.dt,
                    r.particleOptions,
                  );
                  (t > 0 && n && (n.amplitude = (3 + 4 * r.swingMagnitude) * t),
                    (function (e, t, l) {
                      if (0 === t.particles.length) return;
                      let r = l / 1e3;
                      e.save();
                      let n = 0;
                      for (let l = 0; l < t.particles.length; l++) {
                        let o = t.particles[l];
                        ((o.life -= r / 1),
                          o.life <= 0 ||
                            ((o.x += o.vx * r),
                            (o.y += o.vy * r),
                            (o.vx *= 0.95),
                            (o.vy *= 0.95),
                            (e.globalAlpha = 0.55 * o.life),
                            (e.fillStyle = o.color),
                            e.beginPath(),
                            e.arc(
                              o.x,
                              o.y,
                              o.size * (0.5 + 0.5 * o.life),
                              0,
                              2 * Math.PI,
                            ),
                            e.fill(),
                            (t.particles[n++] = o)));
                      }
                      ((t.particles.length = n), e.restore());
                    })(e, r.particleState, r.dt));
                }
              }
              (r.markers && r.markers.length > 0 && P(e, t, l, r.markers),
                e.save(),
                (e.globalCompositeOperation = "destination-out"));
              let p = e.createLinearGradient(t.pad.left, 0, t.pad.left + 40, 0);
              if (
                (p.addColorStop(0, "rgba(0, 0, 0, 1)"),
                p.addColorStop(1, "rgba(0, 0, 0, 0)"),
                (e.fillStyle = p),
                e.fillRect(0, 0, t.pad.left + 40, t.h),
                e.restore(),
                r.priceLines &&
                  r.priceLines.length > 0 &&
                  s > 0.01 &&
                  (e.save(),
                  s < 1 && (e.globalAlpha = s),
                  y(e, t, l, r.priceLines, r.formatValue),
                  e.restore()),
                null !== r.hoverX &&
                  null !== r.hoverValue &&
                  null !== r.hoverTime &&
                  f &&
                  f.length > 0)
              ) {
                let n = f[f.length - 1],
                  o = n[0] - r.hoverX,
                  a = Math.min(80, 0.3 * t.chartW),
                  i =
                    o < 5
                      ? 0
                      : o >= a
                        ? r.scrubAmount
                        : ((o - 5) / (a - 5)) * r.scrubAmount;
                i > 0.01 &&
                  (function (e, t, l, r, n, o, a, i, s, u, c, d) {
                    if (s < 0.01) return;
                    let { h, pad: f, toY: p } = t,
                      g = p(n);
                    (e.save(),
                      (e.globalAlpha = 0.5 * s),
                      (e.strokeStyle = l.crosshairLine),
                      (e.lineWidth = 1),
                      e.beginPath(),
                      e.moveTo(r, f.top),
                      e.lineTo(r, h - f.bottom),
                      e.stroke(),
                      e.restore());
                    let m = 4 * Math.min(3 * s, 1);
                    if (
                      (m > 0.5 &&
                        ((e.globalAlpha = 1),
                        e.beginPath(),
                        e.arc(r, g, m, 0, 2 * Math.PI),
                        (e.fillStyle = l.line),
                        e.fill()),
                      s < 0.1 || t.w < 300)
                    )
                      return;
                    let b = a(n),
                      x = i(o),
                      v = "  ·  ";
                    (e.save(),
                      (e.globalAlpha = s),
                      (e.font = '400 13px "SF Mono", Menlo, monospace'));
                    let y = e.measureText(b).width,
                      M = y + e.measureText(v).width + e.measureText(x).width,
                      w = r - M / 2,
                      S = f.left + 4,
                      T = (null != c ? c + 7 : t.w - f.right) - M;
                    (w < S && (w = S), w > T && (w = T));
                    let k = f.top + (u ?? 14) + 10;
                    ((e.textAlign = "left"),
                      d &&
                        ((e.strokeStyle = l.tooltipBg),
                        (e.lineWidth = 3),
                        (e.lineJoin = "round"),
                        e.strokeText(b, w, k),
                        e.strokeText(v + x, w + y, k)),
                      (e.fillStyle = l.tooltipText),
                      e.fillText(b, w, k),
                      (e.fillStyle = l.gridLabel),
                      e.fillText(v + x, w + y, k),
                      e.restore());
                  })(
                    e,
                    t,
                    l,
                    r.hoverX,
                    r.hoverValue,
                    r.hoverTime,
                    r.formatValue,
                    r.formatTime,
                    i,
                    r.tooltipY,
                    n[0],
                    r.tooltipOutline,
                  );
              }
              n && (0 !== o || 0 !== a) && e.restore();
            })(C, ea, o.palette, {
              visible: H,
              smoothValue: a,
              now: R,
              momentum: ei,
              arrowState: eH.current,
              showGrid: o.showGrid,
              showMomentum: o.showMomentum,
              showPulse: o.showPulse,
              showFill: o.showFill,
              referenceLine: o.referenceLine,
              priceLines: o.priceLines,
              hoverX: eu,
              hoverValue: ec,
              hoverTime: ed,
              scrubAmount: tl.current,
              windowSecs: W,
              formatValue: o.formatValue,
              formatTime: o.formatTime,
              gridState: eU.current,
              timeAxisState: eN.current,
              dt: f,
              targetWindowSecs: o.windowSecs,
              tooltipY: o.tooltipY,
              tooltipOutline: o.tooltipOutline,
              orderbookData: o.orderbookData,
              orderbookState: o.orderbookData ? e_.current : void 0,
              particleState: o.degenOptions ? eq.current : void 0,
              particleOptions: o.degenOptions,
              swingMagnitude: ep,
              shakeState: o.degenOptions ? eJ.current : void 0,
              chartReveal: el,
              pauseProgress: J,
              now_ms: h,
              markers: em,
            });
            let eb = 1 - el;
            if (eb > 0.01 && 0 === et && !o.loading) {
              let e = (1 - ee) * eb;
              e > 0.01 && $(C, r, n, N, o.palette, e, h, !0, o.emptyText);
            }
            let ex = e3.current;
            if (
              ex &&
              ((eZ.current = j(
                ex,
                o,
                a,
                ea,
                ei,
                eZ.current,
                eK.current,
                Z,
                E,
                C,
                K,
                el,
              )),
              J > 0.01 && "none" !== ex.container.style.display)
            ) {
              let e = ex.container.style.opacity
                ? parseFloat(ex.container.style.opacity)
                : 1;
              ex.container.style.opacity = String(e * (1 - J));
            }
            let ev = o.valueDisplayRef?.current;
            if (ev) {
              let e = o.valueMomentumColor ? Math.abs(a) : a;
              if (((ev.textContent = o.formatValue(e)), o.valueMomentumColor)) {
                let e =
                  "up" === ei ? "#22c55e" : "down" === ei ? "#ef4444" : "";
                e ? (ev.style.color = e) : ev.style.removeProperty("color");
              }
            }
          }
          e2.current = requestAnimationFrame(tz);
        }, [tV])),
        (0, t.useEffect)(
          () => (
            (e2.current = requestAnimationFrame(tz)),
            () => cancelAnimationFrame(e2.current)
          ),
          [tz],
        ));
      let ll = tQ ? "rgba(255,255,255,0.7)" : "rgba(0,0,0,0.55)",
        lr = tQ ? "rgba(255,255,255,0.25)" : "rgba(0,0,0,0.22)";
      return (0, l.jsxs)(l.Fragment, {
        children: [
          Z &&
            (0, l.jsx)("span", {
              ref: tO,
              style: {
                display: "block",
                fontSize: 20,
                fontWeight: 500,
                fontFamily: '"SF Mono", Menlo, monospace',
                color: tQ ? "rgba(255,255,255,0.85)" : "#111",
                transition: "color 0.3s",
                letterSpacing: "-0.01em",
                marginBottom: 8,
                paddingTop: 4,
                paddingLeft: t3.left,
              },
            }),
          ((ee && ee.length > 0) || ew || t1) &&
            (0, l.jsxs)("div", {
              style: {
                display: "flex",
                alignItems: "center",
                gap: 6,
                marginBottom: 6,
                marginLeft: t3.left,
              },
              children: [
                ee &&
                  ee.length > 0 &&
                  (0, l.jsxs)("div", {
                    ref: tj,
                    style: {
                      position: "relative",
                      display: "inline-flex",
                      gap: "text" === lt ? 4 : 2,
                      background:
                        "text" === lt
                          ? "transparent"
                          : tQ
                            ? "rgba(255,255,255,0.03)"
                            : "rgba(0,0,0,0.02)",
                      borderRadius: "rounded" === lt ? 999 : 6,
                      padding: "text" === lt ? 0 : "rounded" === lt ? 3 : 2,
                    },
                    children: [
                      "text" !== lt &&
                        tY &&
                        (0, l.jsx)("div", {
                          style: {
                            position: "absolute",
                            top: "rounded" === lt ? 3 : 2,
                            left: tY.left,
                            width: tY.width,
                            height:
                              "rounded" === lt
                                ? "calc(100% - 6px)"
                                : "calc(100% - 4px)",
                            background: tQ
                              ? "rgba(255,255,255,0.06)"
                              : "rgba(0,0,0,0.035)",
                            borderRadius: "rounded" === lt ? 999 : 4,
                            transition:
                              "left 0.25s cubic-bezier(0.4, 0, 0.2, 1), width 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
                            pointerEvents: "none",
                          },
                        }),
                      ee.map((e) => {
                        let t = e.secs === t6;
                        return (0, l.jsx)(
                          "button",
                          {
                            ref: (t) => {
                              t
                                ? tX.current.set(e.secs, t)
                                : tX.current.delete(e.secs);
                            },
                            onClick: () => {
                              (t9(e.secs), et?.(e.secs));
                            },
                            style: {
                              position: "relative",
                              zIndex: 1,
                              fontSize: 11,
                              padding: "text" === lt ? "2px 6px" : "3px 10px",
                              borderRadius: "rounded" === lt ? 999 : 4,
                              border: "none",
                              cursor: "pointer",
                              fontFamily:
                                "system-ui, -apple-system, sans-serif",
                              fontWeight: t ? 600 : 400,
                              background: "transparent",
                              color: t ? ll : lr,
                              transition: "color 0.2s, background 0.15s",
                              lineHeight: "16px",
                            },
                            children: e.label,
                          },
                          e.secs,
                        );
                      }),
                    ],
                  }),
                ew &&
                  (0, l.jsxs)("div", {
                    ref: tH,
                    style: {
                      position: "relative",
                      display: "inline-flex",
                      gap: "text" === lt ? 4 : 2,
                      background:
                        "text" === lt
                          ? "transparent"
                          : tQ
                            ? "rgba(255,255,255,0.03)"
                            : "rgba(0,0,0,0.02)",
                      borderRadius: "rounded" === lt ? 999 : 6,
                      padding: "text" === lt ? 0 : "rounded" === lt ? 3 : 2,
                    },
                    children: [
                      "text" !== lt &&
                        tN &&
                        (0, l.jsx)("div", {
                          style: {
                            position: "absolute",
                            top: "rounded" === lt ? 3 : 2,
                            left: tN.left,
                            width: tN.width,
                            height:
                              "rounded" === lt
                                ? "calc(100% - 6px)"
                                : "calc(100% - 4px)",
                            background: tQ
                              ? "rgba(255,255,255,0.06)"
                              : "rgba(0,0,0,0.035)",
                            borderRadius: "rounded" === lt ? 999 : 4,
                            transition:
                              "left 0.25s cubic-bezier(0.4, 0, 0.2, 1), width 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
                            pointerEvents: "none",
                          },
                        }),
                      (0, l.jsx)("button", {
                        ref: (e) => {
                          e
                            ? tU.current.set("line", e)
                            : tU.current.delete("line");
                        },
                        onClick: () => ew("line"),
                        style: {
                          position: "relative",
                          zIndex: 1,
                          padding: "5px 7px",
                          borderRadius: "rounded" === lt ? 999 : 4,
                          border: "none",
                          cursor: "pointer",
                          background: "transparent",
                          display: "flex",
                          alignItems: "center",
                        },
                        children: (0, l.jsx)("svg", {
                          width: "12",
                          height: "12",
                          viewBox: "0 0 12 12",
                          fill: "none",
                          children: (0, l.jsx)("path", {
                            d: "M1 8.5C2.5 8.5 3 4 5.5 4S7.5 7 8.5 7C9.5 7 10 3.5 11 3.5",
                            stroke: "line" === t7 ? ll : lr,
                            strokeWidth: "line" === t7 ? 1.5 : 1.2,
                            strokeLinecap: "round",
                            fill: "none",
                          }),
                        }),
                      }),
                      (0, l.jsx)("button", {
                        ref: (e) => {
                          e
                            ? tU.current.set("candle", e)
                            : tU.current.delete("candle");
                        },
                        onClick: () => ew("candle"),
                        style: {
                          position: "relative",
                          zIndex: 1,
                          padding: "5px 7px",
                          borderRadius: "rounded" === lt ? 999 : 4,
                          border: "none",
                          cursor: "pointer",
                          background: "transparent",
                          display: "flex",
                          alignItems: "center",
                        },
                        children: (0, l.jsxs)("svg", {
                          width: "12",
                          height: "12",
                          viewBox: "0 0 12 12",
                          fill: "none",
                          children: [
                            (0, l.jsx)("line", {
                              x1: "3.5",
                              y1: "1",
                              x2: "3.5",
                              y2: "11",
                              stroke: "candle" === t7 ? ll : lr,
                              strokeWidth: "1",
                            }),
                            (0, l.jsx)("rect", {
                              x: "2",
                              y: "3",
                              width: "3",
                              height: "5",
                              rx: "0.5",
                              fill: "candle" === t7 ? ll : lr,
                            }),
                            (0, l.jsx)("line", {
                              x1: "8.5",
                              y1: "2",
                              x2: "8.5",
                              y2: "10",
                              stroke: "candle" === t7 ? ll : lr,
                              strokeWidth: "1",
                            }),
                            (0, l.jsx)("rect", {
                              x: "7",
                              y: "4",
                              width: "3",
                              height: "4",
                              rx: "0.5",
                              fill: "candle" === t7 ? ll : lr,
                            }),
                          ],
                        }),
                      }),
                    ],
                  }),
                t1 &&
                  (0, l.jsx)("div", {
                    style: {
                      display: "inline-flex",
                      gap: "text" === lt ? 4 : 2,
                      background:
                        "text" === lt
                          ? "transparent"
                          : tQ
                            ? "rgba(255,255,255,0.03)"
                            : "rgba(0,0,0,0.02)",
                      borderRadius: "rounded" === lt ? 999 : 6,
                      padding: "text" === lt ? 0 : "rounded" === lt ? 3 : 2,
                      opacity: +!!t0,
                      transition: "opacity 0.4s",
                      pointerEvents: t0 ? "auto" : "none",
                    },
                    children: (tK.current ?? []).map((e, t) => {
                      let r = tq.has(e.id),
                        n = e.color || a[t % a.length];
                      return (0, l.jsxs)(
                        "button",
                        {
                          onClick: () => le(e.id),
                          style: {
                            position: "relative",
                            zIndex: 1,
                            fontSize: 11,
                            padding: eT
                              ? "text" === lt
                                ? "2px 4px"
                                : "5px 7px"
                              : "text" === lt
                                ? "2px 6px"
                                : "3px 8px",
                            borderRadius: "rounded" === lt ? 999 : 4,
                            border: "none",
                            cursor: "pointer",
                            fontFamily: "system-ui, -apple-system, sans-serif",
                            fontWeight: 500,
                            background:
                              r || "text" === lt
                                ? "transparent"
                                : tQ
                                  ? "rgba(255,255,255,0.06)"
                                  : "rgba(0,0,0,0.035)",
                            color: r ? lr : ll,
                            opacity: r ? 0.4 : 1,
                            transition:
                              "opacity 0.2s, background 0.15s, color 0.2s",
                            lineHeight: "16px",
                            display: "flex",
                            alignItems: "center",
                            gap: 4 * !eT,
                          },
                          children: [
                            (0, l.jsx)("span", {
                              style: {
                                width: eT ? 8 : 6,
                                height: eT ? 8 : 6,
                                borderRadius: "50%",
                                background: n,
                                flexShrink: 0,
                                opacity: r ? 0.4 : 1,
                                transition: "opacity 0.2s",
                              },
                            }),
                            !eT && (e.label ?? e.id),
                          ],
                        },
                        e.id,
                      );
                    }),
                  }),
              ],
            }),
          (0, l.jsx)("div", {
            ref: tD,
            className: eE,
            style: {
              width: "100%",
              height: "100%",
              position: "relative",
              ...eP,
            },
            children: (0, l.jsx)("canvas", {
              ref: tV,
              style: { display: "block", cursor: E ? ef : "default" },
            }),
          }),
        ],
      });
    },
  ]);
};
