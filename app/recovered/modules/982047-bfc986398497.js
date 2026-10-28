// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(t) => {
  "use strict";
  var e,
    r,
    i = t.i(732486),
    n = t.i(445242),
    a = t.i(745018),
    s = t.i(439587),
    l = t.i(292686),
    o = t.i(574472),
    u = t.i(528600),
    h = t.i(453706),
    d = t.i(458310),
    c = t.i(352386);
  t.i(12692);
  var p = t.i(398902),
    f = t.i(63289),
    m = t.i(909318),
    g = t.i(56087),
    y = t.i(690877);
  let x = (t) => {
      let e,
        r,
        a = (0, n.c)(3),
        { size: s } = t;
      return (
        a[0] === Symbol.for("react.memo_cache_sentinel")
          ? ((e = (0, i.jsx)("path", { d: "M21 12a9 9 0 1 1-6.2-8.56" })),
            (a[0] = e))
          : (e = a[0]),
        a[1] !== s
          ? ((r = (0, i.jsx)("svg", {
              className: "animate-spin",
              width: s,
              height: s,
              viewBox: "0 0 24 24",
              fill: "none",
              stroke: "#F4FFF9",
              strokeWidth: "2",
              strokeLinecap: "round",
              "aria-label": "loading",
              role: "img",
              children: e,
            })),
            (a[1] = s),
            (a[2] = r))
          : (r = a[2]),
        r
      );
    },
    _ = (t) => `https://mobile-resources.pump.fun${t}`,
    v = (t) => ("square" === t ? { w: 1080, h: 1080 } : { w: 1080, h: 1920 }),
    b = {
      title: 3.2,
      dive: 1.6,
      buy: 1.68,
      runUp: 3.84,
      lock: 1.6,
      flash: 0.48,
      profit: 2.4,
      scorecard: 3.2,
    },
    w = {
      title: 0,
      dive: 1.2,
      buy: 1,
      runUp: 2.6,
      lock: 1,
      flash: 0.4,
      profit: 1.4,
      scorecard: 1.4,
    },
    M = [
      "title",
      "dive",
      "buy",
      "runUp",
      "lock",
      "flash",
      "profit",
      "scorecard",
    ],
    T = (t) => ("social" === t ? 9 : 18),
    k = (t) => {
      let e;
      return (
        0.24 +
        0.016 * t.length +
        ((e = 0.016 * t.length),
        Math.min(1.2, Math.max(0.4, t.length / 32 - e)))
      );
    },
    S = (t, e, r) => "social" !== r && t.t <= e,
    A = (t) => {
      let e = t >>> 0;
      return () => {
        let t = Math.imul((e = (e + 0x6d2b79f5) | 0) ^ (e >>> 15), 1 | e);
        return (
          (((t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t) ^ (t >>> 14)) >>>
            0) /
          0x100000000
        );
      };
    },
    F = (t, e) => {
      let r = A(t);
      return Array.from({ length: e }, () => r());
    },
    C = {
      bg: "#050807",
      primary: "#2BFF88",
      primarySoft: "rgba(43, 255, 136, 0.55)",
      accent: "#FF3B30",
    },
    P = {
      bg: "#080506",
      primary: "#FF4D5E",
      primarySoft: "rgba(255, 77, 94, 0.55)",
      accent: "#FF3B30",
    },
    j = "#2BFF88",
    O = "#FF4D5E",
    U = "#2BFF88",
    R = "#EAFFF3",
    E = "#FF4D5E",
    z = "#FFECEA",
    N = "#FACC15",
    I = "#FFF8D6",
    B = [
      15e3, 3e4, 6e4, 12e4, 3e5, 6e5, 9e5, 18e5, 36e5, 72e5, 144e5, 216e5,
      432e5, 864e5, 1728e5, 6048e5, 2592e6,
    ],
    $ = (t) => {
      let e = Math.round(t / 1e3);
      if (e < 60) return `${e}s`;
      if (e < 3600) return `${Math.round(e / 60)}m`;
      if (e < 86400) {
        let t = Math.floor(e / 3600),
          r = Math.round((e - 3600 * t) / 60);
        return r > 0 ? `${t}h${r}m` : `${t}h`;
      }
      let r = Math.floor(e / 86400),
        i = Math.round((e - 86400 * r) / 3600);
      return i > 0 ? `${r}d${i}h` : `${r}d`;
    },
    D = {
      portrait: {
        plot: { x: 70, y: 430, w: 940, h: 1010 },
        scorePlot: { x: 0, y: 700, w: 1080, h: 740 },
        hudRows: { label1: 152, value1: 222, label2: 286, value2: 338 },
        axisBottom: 300,
      },
      square: {
        plot: { x: 70, y: 300, w: 940, h: 560 },
        scorePlot: { x: 0, y: 500, w: 1080, h: 290 },
        hudRows: { label1: 96, value1: 160, label2: 216, value2: 262 },
        axisBottom: 176,
      },
    },
    L = (t, e) => {
      let r = 0,
        i = 1 / 0;
      for (let n = 0; n < t.length; n++) {
        let a = Math.abs(t[n].t - e);
        a < i && ((i = a), (r = n));
      }
      return r;
    },
    W = () => {
      let t = (t) => getComputedStyle(document.body).getPropertyValue(t).trim(),
        e =
          t("--font-geist-sans") || t("--font-sans") || "system-ui, sans-serif",
        r = t("--font-geist-mono") || "ui-monospace, monospace",
        i = `"Hitmarker Text", ${e}`;
      return { sans: e, mono: r, display: i };
    },
    q = async () => {
      if ("u" < typeof document || !("fonts" in document)) return;
      let { sans: t, mono: e, display: r } = W(),
        i = [
          `700 100px ${t}`,
          `600 100px ${e}`,
          `700 100px ${e}`,
          `700 100px ${r}`,
          `500 100px ${r}`,
        ];
      await Promise.all(i.map((t) => document.fonts.load(t).catch(() => [])));
    },
    G = (t, e = !1) => {
      let r = Math.abs(t),
        i =
          r >= 1e12
            ? `${(r / 1e12).toFixed(2)}T`
            : r >= 1e9
              ? `${(r / 1e9).toFixed(2)}B`
              : r >= 1e6
                ? `${(r / 1e6).toFixed(2)}M`
                : r >= 1e3
                  ? `${(r / 1e3).toFixed(2)}K`
                  : `${Math.round(r)}`;
      return `${t < 0 ? "-" : e ? "+" : ""}$${i}`;
    },
    V = {
      shot: _("/replay/sfx-shot.mp3"),
      impact: _("/replay/sfx-impact.mp3"),
      ding: _("/replay/sfx-ding.mp3"),
      chaching: _("/replay/sfx-chaching.mp3"),
    },
    X = _("/replay/bgm.mp3?v=2"),
    Y = 2.24 + 24,
    H = (t, e) => {
      let r = t[e];
      return {
        from: e > 0 ? r.filmStart - 0.2 : r.filmStart,
        to: e < t.length - 1 ? r.filmEnd + 0.2 : r.filmEnd,
      };
    },
    K = (t, e, r, i) => {
      let { from: n, to: a } = H(t, e),
        s = 1;
      return (
        e > 0 &&
          (s *= Math.sin(
            (Math.min(Math.max((i - n) / 0.4, 0), 1) * Math.PI) / 2,
          )),
        e < t.length - 1
          ? (s *= Math.sin(
              (Math.min(Math.max((a - i) / 0.4, 0), 1) * Math.PI) / 2,
            ))
          : (s *= Math.min(Math.max((Math.min(r, a) - i) / 0.8, 0), 1)),
        s
      );
    },
    Q = (t, e, r, i, n, a) => {
      let s = ((t, e) => {
          let r = Math.max(0, e);
          if (r <= t)
            return [{ filmStart: 0, filmEnd: Math.min(t, r), bedStart: 0 }];
          let i = Math.min(Y, 2.24 + 2 * Math.floor((t - 2.24) / 2)),
            n = i - 10.24;
          if (n < 2) return [{ filmStart: 0, filmEnd: t, bedStart: 0 }];
          let a = Math.ceil((r - t) / n),
            s = [{ filmStart: 0, filmEnd: i, bedStart: 0 }],
            l = i;
          for (let t = 1; t < a; t++)
            (s.push({ filmStart: l, filmEnd: l + n, bedStart: 10.24 }),
              (l += n));
          return (s.push({ filmStart: l, filmEnd: r, bedStart: 10.24 }), s);
        })(r.duration, i),
        l = [];
      return (
        s.forEach((o, u) => {
          let { from: h, to: d } = H(s, u),
            c = Math.max(h, n),
            p = d - c;
          if (p <= 0.01) return;
          let f = o.bedStart + (c - o.filmStart);
          if (f < 0 || f >= r.duration) return;
          let m = a + (c - n),
            g = Math.max(0, t.currentTime - m),
            y = m + g,
            x = p - g;
          if (x <= 0.01) return;
          let _ = f + g;
          if (_ >= r.duration) return;
          let v = c + g,
            b = t.createGain(),
            w = Math.max(2, Math.ceil(200 * x) + 1),
            M = new Float32Array(w);
          for (let t = 0; t < w; t++) M[t] = K(s, u, i, v + (x * t) / (w - 1));
          (b.gain.setValueCurveAtTime(M, y, x), b.connect(e));
          let T = t.createBufferSource();
          ((T.buffer = r),
            T.connect(b),
            T.start(y, _, Math.min(x, r.duration - _)),
            l.push(T));
        }),
        l
      );
    },
    J = (t) => {
      let e = Math.floor(0.5 * t.sampleRate),
        r = t.createBuffer(1, e, t.sampleRate),
        i = r.getChannelData(0);
      for (let t = 0; t < e; t++) i[t] = 2 * Math.random() - 1;
      return r;
    },
    Z = (t, e, r, i, n, a) => {
      let s = t.createGain();
      return (
        s.gain.setValueAtTime(0, a),
        s.gain.linearRampToValueAtTime(r, a + i),
        s.gain.exponentialRampToValueAtTime(4e-4, a + i + n),
        s.connect(e),
        s
      );
    },
    tt = (t, e, r, i, n, a, s) => {
      let l = t.createOscillator();
      ((l.type = e),
        l.frequency.setValueAtTime(r, n),
        void 0 !== s &&
          l.frequency.exponentialRampToValueAtTime(Math.max(s, 1), n + a),
        l.connect(i),
        l.start(n),
        l.stop(n + a + 0.02));
    },
    te = (t, e, r, i, n, a, s, l) => {
      let o = t.createBufferSource();
      ((o.buffer = e), (o.loop = !0));
      let u = t.createBiquadFilter();
      ((u.type = a),
        (u.Q.value = 1.1),
        u.frequency.setValueAtTime(s, i),
        u.frequency.exponentialRampToValueAtTime(Math.max(l, 1), i + n),
        o.connect(u),
        u.connect(r),
        o.start(i),
        o.stop(i + n + 0.02));
    },
    tr = (t, e, r, i, n, a) => {
      let s = n.gain ?? 0.3,
        l = n.pitch ?? 1;
      switch (n.kind) {
        case "ding": {
          let i = r.ding;
          if (i) {
            let r = t.createBufferSource();
            ((r.buffer = i), (r.playbackRate.value = l));
            let n = t.createGain();
            ((n.gain.value = s), r.connect(n), n.connect(e), r.start(a));
            break;
          }
          tt(
            t,
            "triangle",
            1560 * l,
            Z(t, e, s, 0.002, 0.1, a),
            a,
            0.12,
            1180 * l,
          );
          break;
        }
        case "crack":
          (te(t, i, Z(t, e, s, 0.001, 0.16, a), a, 0.18, "bandpass", 2600, 900),
            tt(t, "sine", 92, Z(t, e, 0.9 * s, 0.002, 0.3, a), a, 0.32, 40),
            te(
              t,
              i,
              Z(t, e, 0.3 * s, 0.02, 0.4, a),
              a,
              0.42,
              "lowpass",
              900,
              200,
            ));
          break;
        case "shot":
        case "impact":
        case "chaching": {
          let o = r[n.kind];
          if (!o) {
            let s = "chaching" === n.kind ? "ding" : "crack";
            tr(t, e, r, i, { ...n, kind: s }, a);
            break;
          }
          let u = t.createBufferSource();
          ((u.buffer = o), (u.playbackRate.value = l));
          let h = t.createGain();
          ((h.gain.value = s), u.connect(h), h.connect(e), u.start(a));
          break;
        }
        case "whoosh":
          te(t, i, Z(t, e, s, 0.25, 0.55, a), a, 0.8, "bandpass", 320, 2500);
          break;
        case "tick":
          tt(t, "square", 880 * l, Z(t, e, s, 0.001, 0.035, a), a, 0.05);
          break;
        case "stinger":
          (tt(t, "square", 116 * l, Z(t, e, s, 0.002, 0.14, a), a, 0.16, 60),
            te(
              t,
              i,
              Z(t, e, 0.5 * s, 0.001, 0.09, a),
              a,
              0.1,
              "highpass",
              1200,
              2400,
            ));
          break;
        case "acquire": {
          tt(t, "sine", 880 * l, Z(t, e, s, 0.002, 0.07, a), a, 0.08);
          let r = Z(t, e, s, 0.002, 0.1, a + 0.09),
            i = t.createOscillator();
          ((i.type = "sine"),
            (i.frequency.value = 1320 * l),
            i.connect(r),
            i.start(a + 0.09),
            i.stop(a + 0.22));
        }
      }
    };
  function ti(t) {
    if (void 0 === t)
      throw ReferenceError(
        "this hasn't been initialised - super() hasn't been called",
      );
    return t;
  }
  function tn(t, e) {
    ((t.prototype = Object.create(e.prototype)),
      (t.prototype.constructor = t),
      (t.__proto__ = e));
  }
  var ta,
    ts,
    tl,
    to,
    tu,
    th,
    td,
    tc,
    tp,
    tf,
    tm,
    tg,
    ty,
    tx,
    t_,
    tv,
    tb,
    tw,
    tM,
    tT,
    tk,
    tS,
    tA,
    tF,
    tC,
    tP,
    tj = {
      autoSleep: 120,
      force3D: "auto",
      nullTargetWarn: 1,
      units: { lineHeight: "" },
    },
    tO = { duration: 0.5, overwrite: !1, delay: 0 },
    tU = 2 * Math.PI,
    tR = tU / 4,
    tE = 0,
    tz = Math.sqrt,
    tN = Math.cos,
    tI = Math.sin,
    tB = function (t) {
      return "string" == typeof t;
    },
    t$ = function (t) {
      return "function" == typeof t;
    },
    tD = function (t) {
      return "number" == typeof t;
    },
    tL = function (t) {
      return void 0 === t;
    },
    tW = function (t) {
      return "object" == typeof t;
    },
    tq = function (t) {
      return !1 !== t;
    },
    tG = function () {
      return "u" > typeof window;
    },
    tV = function (t) {
      return t$(t) || tB(t);
    },
    tX =
      ("function" == typeof ArrayBuffer && ArrayBuffer.isView) ||
      function () {},
    tY = Array.isArray,
    tH = /random\([^)]+\)/g,
    tK = /,\s*/g,
    tQ = /(?:-?\.?\d|\.)+/gi,
    tJ = /[-+=.]*\d+[.e\-+]*\d*[e\-+]*\d*/g,
    tZ = /[-+=.]*\d+[.e-]*\d*[a-z%]*/g,
    t0 = /[-+=.]*\d+\.?\d*(?:e-|e\+)?\d*/gi,
    t1 = /[+-]=-?[.\d]+/,
    t2 = /[^,'"\[\]\s]+/gi,
    t5 = /^[+\-=e\s\d]*\d+[.\d]*([a-z]*|%)\s*$/i,
    t4 = {},
    t3 = {},
    t6 = function (t) {
      return (t3 = eS(t, t4)) && i_;
    },
    t8 = function (t, e) {
      return console.warn(
        "Invalid property",
        t,
        "set to",
        e,
        "Missing plugin? gsap.registerPlugin()",
      );
    },
    t7 = function (t, e) {
      return !e && console.warn(t);
    },
    t9 = function (t, e) {
      return (t && (t4[t] = e) && t3 && (t3[t] = e)) || t4;
    },
    et = function () {
      return 0;
    },
    ee = { suppressEvents: !0, isStart: !0, kill: !1 },
    er = { suppressEvents: !0, kill: !1 },
    ei = { suppressEvents: !0 },
    en = {},
    ea = [],
    es = {},
    el = {},
    eo = {},
    eu = 30,
    eh = [],
    ed = "",
    ec = function (t) {
      var e,
        r,
        i = t[0];
      if ((tW(i) || t$(i) || (t = [t]), !(e = (i._gsap || {}).harness))) {
        for (r = eh.length; r-- && !eh[r].targetTest(i); );
        e = eh[r];
      }
      for (r = t.length; r--; )
        (t[r] && (t[r]._gsap || (t[r]._gsap = new rU(t[r], e)))) ||
          t.splice(r, 1);
      return t;
    },
    ep = function (t) {
      return t._gsap || ec(e6(t))[0]._gsap;
    },
    ef = function (t, e, r) {
      return (r = t[e]) && t$(r)
        ? t[e]()
        : (tL(r) && t.getAttribute && t.getAttribute(e)) || r;
    },
    em = function (t, e) {
      return (t = t.split(",")).forEach(e) || t;
    },
    eg = function (t) {
      return Math.round(1e5 * t) / 1e5 || 0;
    },
    ey = function (t) {
      return Math.round(1e7 * t) / 1e7 || 0;
    },
    ex = function (t, e) {
      var r = e.charAt(0),
        i = parseFloat(e.substr(2));
      return (
        (t = parseFloat(t)),
        "+" === r ? t + i : "-" === r ? t - i : "*" === r ? t * i : t / i
      );
    },
    e_ = function (t, e) {
      for (var r = e.length, i = 0; 0 > t.indexOf(e[i]) && ++i < r; );
      return i < r;
    },
    ev = function () {
      var t,
        e,
        r = ea.length,
        i = ea.slice(0);
      for (es = {}, ea.length = 0, t = 0; t < r; t++)
        (e = i[t]) &&
          e._lazy &&
          (e.render(e._lazy[0], e._lazy[1], !0)._lazy = 0);
    },
    eb = function (t) {
      return !!(t._initted || t._startAt || t.add);
    },
    ew = function (t, e, r, i) {
      (ea.length && !tb && ev(),
        t.render(e, r, i || !!(tb && e < 0 && eb(t))),
        ea.length && !tb && ev());
    },
    eM = function (t) {
      var e = parseFloat(t);
      return (e || 0 === e) && (t + "").match(t2).length < 2
        ? e
        : tB(t)
          ? t.trim()
          : t;
    },
    eT = function (t) {
      return t;
    },
    ek = function (t, e) {
      for (var r in e) r in t || (t[r] = e[r]);
      return t;
    },
    eS = function (t, e) {
      for (var r in e) t[r] = e[r];
      return t;
    },
    eA = function t(e, r) {
      for (var i in r)
        "__proto__" !== i &&
          "constructor" !== i &&
          "prototype" !== i &&
          (e[i] = tW(r[i]) ? t(e[i] || (e[i] = {}), r[i]) : r[i]);
      return e;
    },
    eF = function (t, e) {
      var r,
        i = {};
      for (r in t) r in e || (i[r] = t[r]);
      return i;
    },
    eC = function (t) {
      var e,
        r = t.parent || tM,
        i = t.keyframes
          ? ((e = tY(t.keyframes)),
            function (t, r) {
              for (var i in r)
                i in t ||
                  ("duration" === i && e) ||
                  "ease" === i ||
                  (t[i] = r[i]);
            })
          : ek;
      if (tq(t.inherit))
        for (; r; ) (i(t, r.vars.defaults), (r = r.parent || r._dp));
      return t;
    },
    eP = function (t, e) {
      for (var r = t.length, i = r === e.length; i && r-- && t[r] === e[r]; );
      return r < 0;
    },
    ej = function (t, e, r, i, n) {
      (void 0 === r && (r = "_first"), void 0 === i && (i = "_last"));
      var a,
        s = t[i];
      if (n) for (a = e[n]; s && s[n] > a; ) s = s._prev;
      return (
        s
          ? ((e._next = s._next), (s._next = e))
          : ((e._next = t[r]), (t[r] = e)),
        e._next ? (e._next._prev = e) : (t[i] = e),
        (e._prev = s),
        (e.parent = e._dp = t),
        e
      );
    },
    eO = function (t, e, r, i) {
      (void 0 === r && (r = "_first"), void 0 === i && (i = "_last"));
      var n = e._prev,
        a = e._next;
      (n ? (n._next = a) : t[r] === e && (t[r] = a),
        a ? (a._prev = n) : t[i] === e && (t[i] = n),
        (e._next = e._prev = e.parent = null));
    },
    eU = function (t, e) {
      (t.parent &&
        (!e || t.parent.autoRemoveChildren) &&
        t.parent.remove &&
        t.parent.remove(t),
        (t._act = 0));
    },
    eR = function (t, e) {
      if (t && (!e || e._end > t._dur || e._start < 0))
        for (var r = t; r; ) ((r._dirty = 1), (r = r.parent));
      return t;
    },
    eE = function (t) {
      for (var e = t.parent; e && e.parent; )
        ((e._dirty = 1), e.totalDuration(), (e = e.parent));
      return t;
    },
    ez = function (t, e, r, i) {
      return (
        t._startAt &&
        (tb
          ? t._startAt.revert(er)
          : (t.vars.immediateRender && !t.vars.autoRevert) ||
            t._startAt.render(e, !0, i))
      );
    },
    eN = function (t) {
      return t._repeat ? eI(t._tTime, (t = t.duration() + t._rDelay)) * t : 0;
    },
    eI = function (t, e) {
      var r = Math.floor((t = ey(t / e)));
      return t && r === t ? r - 1 : r;
    },
    eB = function (t, e) {
      return (
        (t - e._start) * e._ts +
        (e._ts >= 0 ? 0 : e._dirty ? e.totalDuration() : e._tDur)
      );
    },
    e$ = function (t) {
      return (t._end = ey(
        t._start + (t._tDur / Math.abs(t._ts || t._rts || 1e-8) || 0),
      ));
    },
    eD = function (t, e) {
      var r = t._dp;
      return (
        r &&
          r.smoothChildTiming &&
          t._ts &&
          ((t._start = ey(
            r._time -
              (t._ts > 0
                ? e / t._ts
                : -(((t._dirty ? t.totalDuration() : t._tDur) - e) / t._ts)),
          )),
          e$(t),
          r._dirty || eR(r, t)),
        t
      );
    },
    eL = function (t, e) {
      var r;
      if (
        ((e._time ||
          (!e._dur && e._initted) ||
          (e._start < t._time && (e._dur || !e.add))) &&
          ((r = eB(t.rawTime(), e)),
          (!e._dur || e2(0, e.totalDuration(), r) - e._tTime > 1e-8) &&
            e.render(r, !0)),
        eR(t, e)._dp && t._initted && t._time >= t._dur && t._ts)
      ) {
        if (t._dur < t.duration())
          for (r = t; r._dp; )
            (r.rawTime() >= 0 && r.totalTime(r._tTime), (r = r._dp));
        t._zTime = -1e-8;
      }
    },
    eW = function (t, e, r, i) {
      return (
        e.parent && eU(e),
        (e._start = ey(
          (tD(r) ? r : r || t !== tM ? eZ(t, r, e) : t._time) + e._delay,
        )),
        (e._end = ey(
          e._start + (e.totalDuration() / Math.abs(e.timeScale()) || 0),
        )),
        ej(t, e, "_first", "_last", t._sort ? "_start" : 0),
        eX(e) || (t._recent = e),
        i || eL(t, e),
        t._ts < 0 && eD(t, t._tTime),
        t
      );
    },
    eq = function (t, e) {
      return (
        (t4.ScrollTrigger || t8("scrollTrigger", e)) &&
        t4.ScrollTrigger.create(e, t)
      );
    },
    eG = function (t, e, r, i, n) {
      return (rV(t, e, n), t._initted)
        ? !r &&
          t._pt &&
          !tb &&
          ((t._dur && !1 !== t.vars.lazy) || (!t._dur && t.vars.lazy)) &&
          tF !== r_.frame
          ? (ea.push(t), (t._lazy = [n, i]), 1)
          : void 0
        : 1;
    },
    eV = function t(e) {
      var r = e.parent;
      return r && r._ts && r._initted && !r._lock && (0 > r.rawTime() || t(r));
    },
    eX = function (t) {
      var e = t.data;
      return "isFromStart" === e || "isStart" === e;
    },
    eY = function (t, e, r, i) {
      var n,
        a,
        s,
        l = t.ratio,
        o =
          e < 0 ||
          (!e &&
            ((!t._start && eV(t) && !(!t._initted && eX(t))) ||
              ((t._ts < 0 || t._dp._ts < 0) && !eX(t))))
            ? 0
            : 1,
        u = t._rDelay,
        h = 0;
      if (
        (u &&
          t._repeat &&
          ((a = eI((h = e2(0, t._tDur, e)), u)),
          t._yoyo && 1 & a && (o = 1 - o),
          a !== eI(t._tTime, u) &&
            ((l = 1 - o),
            t.vars.repeatRefresh && t._initted && t.invalidate())),
        o !== l || tb || i || 1e-8 === t._zTime || (!e && t._zTime))
      ) {
        if (!t._initted && eG(t, e, i, r, h)) return;
        for (
          s = t._zTime,
            t._zTime = e || 1e-8 * !!r,
            r || (r = e && !s),
            t.ratio = o,
            t._from && (o = 1 - o),
            t._time = 0,
            t._tTime = h,
            n = t._pt;
          n;

        )
          (n.r(o, n.d), (n = n._next));
        (e < 0 && ez(t, e, r, !0),
          t._onUpdate && !r && rl(t, "onUpdate"),
          h && t._repeat && !r && t.parent && rl(t, "onRepeat"),
          (e >= t._tDur || e < 0) &&
            t.ratio === o &&
            (o && eU(t, 1),
            r ||
              tb ||
              (rl(t, o ? "onComplete" : "onReverseComplete", !0),
              t._prom && t._prom())));
      } else t._zTime || (t._zTime = e);
    },
    eH = function (t, e, r) {
      var i;
      if (r > e)
        for (i = t._first; i && i._start <= r; ) {
          if ("isPause" === i.data && i._start > e) return i;
          i = i._next;
        }
      else
        for (i = t._last; i && i._start >= r; ) {
          if ("isPause" === i.data && i._start < e) return i;
          i = i._prev;
        }
    },
    eK = function (t, e, r, i) {
      var n = t._repeat,
        a = ey(e) || 0,
        s = t._tTime / t._tDur;
      return (
        s && !i && (t._time *= a / t._dur),
        (t._dur = a),
        (t._tDur = n ? (n < 0 ? 1e10 : ey(a * (n + 1) + t._rDelay * n)) : a),
        s > 0 && !i && eD(t, (t._tTime = t._tDur * s)),
        t.parent && e$(t),
        r || eR(t.parent, t),
        t
      );
    },
    eQ = function (t) {
      return t instanceof rE ? eR(t) : eK(t, t._dur);
    },
    eJ = { _start: 0, endTime: et, totalDuration: et },
    eZ = function t(e, r, i) {
      var n,
        a,
        s,
        l = e.labels,
        o = e._recent || eJ,
        u = e.duration() >= 1e8 ? o.endTime(!1) : e._dur;
      return tB(r) && (isNaN(r) || r in l)
        ? ((a = r.charAt(0)),
          (s = "%" === r.substr(-1)),
          (n = r.indexOf("=")),
          "<" === a || ">" === a)
          ? (n >= 0 && (r = r.replace(/=/, "")),
            ("<" === a ? o._start : o.endTime(o._repeat >= 0)) +
              (parseFloat(r.substr(1)) || 0) *
                (s ? (n < 0 ? o : i).totalDuration() / 100 : 1))
          : n < 0
            ? (r in l || (l[r] = u), l[r])
            : ((a = parseFloat(r.charAt(n - 1) + r.substr(n + 1))),
              s && i && (a = (a / 100) * (tY(i) ? i[0] : i).totalDuration()),
              n > 1 ? t(e, r.substr(0, n - 1), i) + a : u + a)
        : null == r
          ? u
          : +r;
    },
    e0 = function (t, e, r) {
      var i,
        n,
        a = tD(e[1]),
        s = (a ? 2 : 1) + (t < 2 ? 0 : 1),
        l = e[s];
      if ((a && (l.duration = e[1]), (l.parent = r), t)) {
        for (i = l, n = r; n && !("immediateRender" in i); )
          ((i = n.vars.defaults || {}), (n = tq(n.vars.inherit) && n.parent));
        ((l.immediateRender = tq(i.immediateRender)),
          t < 2 ? (l.runBackwards = 1) : (l.startAt = e[s - 1]));
      }
      return new rZ(e[0], l, e[s + 1]);
    },
    e1 = function (t, e) {
      return t || 0 === t ? e(t) : e;
    },
    e2 = function (t, e, r) {
      return r < t ? t : r > e ? e : r;
    },
    e5 = function (t, e) {
      return tB(t) && (e = t5.exec(t)) ? e[1] : "";
    },
    e4 = [].slice,
    e3 = function (t, e) {
      return (
        t &&
        tW(t) &&
        "length" in t &&
        ((!e && !t.length) || (t.length - 1 in t && tW(t[0]))) &&
        !t.nodeType &&
        t !== tT
      );
    },
    e6 = function (t, e, r) {
      var i;
      return tw && !e && tw.selector
        ? tw.selector(t)
        : tB(t) && !r && (tk || !rv())
          ? e4.call((e || tS).querySelectorAll(t), 0)
          : tY(t)
            ? (void 0 === i && (i = []),
              t.forEach(function (t) {
                var e;
                return (tB(t) && !r) || e3(t, 1)
                  ? (e = i).push.apply(e, e6(t))
                  : i.push(t);
              }) || i)
            : e3(t)
              ? e4.call(t, 0)
              : t
                ? [t]
                : [];
    },
    e8 = function (t) {
      return (
        (t = e6(t)[0] || t7("Invalid scope") || {}),
        function (e) {
          var r = t.current || t.nativeElement || t;
          return e6(
            e,
            r.querySelectorAll
              ? r
              : r === t
                ? t7("Invalid scope") || tS.createElement("div")
                : t,
          );
        }
      );
    },
    e7 = function (t) {
      return t.sort(function () {
        return 0.5 - Math.random();
      });
    },
    e9 = function (t) {
      if (t$(t)) return t;
      var e = tW(t) ? t : { each: t },
        r = rF(e.ease),
        i = e.from || 0,
        n = parseFloat(e.base) || 0,
        a = {},
        s = i > 0 && i < 1,
        l = isNaN(i) || s,
        o = e.axis,
        u = i,
        h = i;
      return (
        tB(i)
          ? (u = h = { center: 0.5, edges: 0.5, end: 1 }[i] || 0)
          : !s && l && ((u = i[0]), (h = i[1])),
        function (t, s, d) {
          var c,
            p,
            f,
            m,
            g,
            y,
            x,
            _,
            v,
            b = (d || e).length,
            w = a[b];
          if (!w) {
            if (!(v = "auto" === e.grid ? 0 : (e.grid || [1, 1e8])[1])) {
              for (
                x = -1e8;
                x < (x = d[v++].getBoundingClientRect().left) && v < b;

              );
              v < b && v--;
            }
            for (
              w = a[b] = [],
                c = l ? Math.min(v, b) * u - 0.5 : i % v,
                p = 1e8 === v ? 0 : l ? (b * h) / v - 0.5 : (i / v) | 0,
                x = 0,
                _ = 1e8,
                y = 0;
              y < b;
              y++
            )
              ((f = (y % v) - c),
                (m = p - ((y / v) | 0)),
                (w[y] = g =
                  o ? Math.abs("y" === o ? m : f) : tz(f * f + m * m)),
                g > x && (x = g),
                g < _ && (_ = g));
            ("random" === i && e7(w),
              (w.max = x - _),
              (w.min = _),
              (w.v = b =
                (parseFloat(e.amount) ||
                  parseFloat(e.each) *
                    (v > b
                      ? b - 1
                      : o
                        ? "y" === o
                          ? b / v
                          : v
                        : Math.max(v, b / v)) ||
                  0) * ("edges" === i ? -1 : 1)),
              (w.b = b < 0 ? n - b : n),
              (w.u = e5(e.amount || e.each) || 0),
              (r = r && b < 0 ? rA(r) : r));
          }
          return (
            (b = (w[t] - w.min) / w.max || 0),
            ey(w.b + (r ? r(b) : b) * w.v) + w.u
          );
        }
      );
    },
    rt = function (t) {
      var e = Math.pow(10, ((t + "").split(".")[1] || "").length);
      return function (r) {
        var i = ey(Math.round(parseFloat(r) / t) * t * e);
        return (i - (i % 1)) / e + (tD(r) ? 0 : e5(r));
      };
    },
    re = function (t, e) {
      var r,
        i,
        n = tY(t);
      return (
        !n &&
          tW(t) &&
          ((r = n = t.radius || 1e8),
          t.values
            ? (i = !tD((t = e6(t.values))[0])) && (r *= r)
            : (t = rt(t.increment))),
        e1(
          e,
          n
            ? t$(t)
              ? function (e) {
                  return Math.abs((i = t(e)) - e) <= r ? i : e;
                }
              : function (e) {
                  for (
                    var n,
                      a,
                      s = parseFloat(i ? e.x : e),
                      l = parseFloat(i ? e.y : 0),
                      o = 1e8,
                      u = 0,
                      h = t.length;
                    h--;

                  )
                    (n = i
                      ? (n = t[h].x - s) * n + (a = t[h].y - l) * a
                      : Math.abs(t[h] - s)) < o && ((o = n), (u = h));
                  return (
                    (u = !r || o <= r ? t[u] : e),
                    i || u === e || tD(e) ? u : u + e5(e)
                  );
                }
            : rt(t),
        )
      );
    },
    rr = function (t, e, r, i) {
      return e1(tY(t) ? !e : !0 === r ? ((r = 0), !1) : !i, function () {
        return tY(t)
          ? t[~~(Math.random() * t.length)]
          : (i = (r = r || 1e-5) < 1 ? Math.pow(10, (r + "").length - 2) : 1) &&
              Math.floor(
                Math.round(
                  (t - r / 2 + Math.random() * (e - t + 0.99 * r)) / r,
                ) *
                  r *
                  i,
              ) / i;
      });
    },
    ri = function (t, e, r) {
      return e1(r, function (r) {
        return t[~~e(r)];
      });
    },
    rn = function (t) {
      return t.replace(tH, function (t) {
        var e = t.indexOf("[") + 1,
          r = t.substring(e || 7, e ? t.indexOf("]") : t.length - 1).split(tK);
        return rr(e ? r : +r[0], e ? 0 : +r[1], +r[2] || 1e-5);
      });
    },
    ra = function (t, e, r, i, n) {
      var a = e - t,
        s = i - r;
      return e1(n, function (e) {
        return r + (((e - t) / a) * s || 0);
      });
    },
    rs = function (t, e, r) {
      var i,
        n,
        a,
        s = t.labels,
        l = 1e8;
      for (i in s)
        (n = s[i] - e) < 0 == !!r &&
          n &&
          l > (n = Math.abs(n)) &&
          ((a = i), (l = n));
      return a;
    },
    rl = function (t, e, r) {
      var i,
        n,
        a,
        s = t.vars,
        l = s[e],
        o = tw,
        u = t._ctx;
      if (l)
        return (
          (i = s[e + "Params"]),
          (n = s.callbackScope || t),
          r && ea.length && ev(),
          u && (tw = u),
          (a = i ? l.apply(n, i) : l.call(n)),
          (tw = o),
          a
        );
    },
    ro = function (t) {
      return (
        eU(t),
        t.scrollTrigger && t.scrollTrigger.kill(!!tb),
        1 > t.progress() && rl(t, "onInterrupt"),
        t
      );
    },
    ru = [],
    rh = function (t) {
      if (t)
        if (((t = (!t.name && t.default) || t), tG() || t.headless)) {
          var e = t.name,
            r = t$(t),
            i =
              e && !r && t.init
                ? function () {
                    this._props = [];
                  }
                : t,
            n = {
              init: et,
              render: r7,
              add: rW,
              kill: it,
              modifier: r9,
              rawVars: 0,
            },
            a = {
              targetTest: 0,
              get: 0,
              getSetter: r4,
              aliases: {},
              register: 0,
            };
          if ((rv(), t !== i)) {
            if (el[e]) return;
            (ek(i, ek(eF(t, n), a)),
              eS(i.prototype, eS(n, eF(t, a))),
              (el[(i.prop = e)] = i),
              t.targetTest && (eh.push(i), (en[e] = 1)),
              (e =
                ("css" === e
                  ? "CSS"
                  : e.charAt(0).toUpperCase() + e.substr(1)) + "Plugin"));
          }
          (t9(e, i), t.register && t.register(i_, i, ii));
        } else ru.push(t);
    },
    rd = {
      aqua: [0, 255, 255],
      lime: [0, 255, 0],
      silver: [192, 192, 192],
      black: [0, 0, 0],
      maroon: [128, 0, 0],
      teal: [0, 128, 128],
      blue: [0, 0, 255],
      navy: [0, 0, 128],
      white: [255, 255, 255],
      olive: [128, 128, 0],
      yellow: [255, 255, 0],
      orange: [255, 165, 0],
      gray: [128, 128, 128],
      purple: [128, 0, 128],
      green: [0, 128, 0],
      red: [255, 0, 0],
      pink: [255, 192, 203],
      cyan: [0, 255, 255],
      transparent: [255, 255, 255, 0],
    },
    rc = function (t, e, r) {
      return (
        ((6 * (t += t < 0 ? 1 : t > 1 ? -1 : 0) < 1
          ? e + (r - e) * t * 6
          : t < 0.5
            ? r
            : 3 * t < 2
              ? e + (r - e) * (2 / 3 - t) * 6
              : e) *
          255 +
          0.5) |
        0
      );
    },
    rp = function (t, e, r) {
      var i,
        n,
        a,
        s,
        l,
        o,
        u,
        h,
        d,
        c,
        p = t ? (tD(t) ? [t >> 16, (t >> 8) & 255, 255 & t] : 0) : rd.black;
      if (!p) {
        if (("," === t.substr(-1) && (t = t.substr(0, t.length - 1)), rd[t]))
          p = rd[t];
        else if ("#" === t.charAt(0)) {
          if (
            (t.length < 6 &&
              ((i = t.charAt(1)),
              (t =
                "#" +
                i +
                i +
                (n = t.charAt(2)) +
                n +
                (a = t.charAt(3)) +
                a +
                (5 === t.length ? t.charAt(4) + t.charAt(4) : ""))),
            9 === t.length)
          )
            return [
              (p = parseInt(t.substr(1, 6), 16)) >> 16,
              (p >> 8) & 255,
              255 & p,
              parseInt(t.substr(7), 16) / 255,
            ];
          p = [(t = parseInt(t.substr(1), 16)) >> 16, (t >> 8) & 255, 255 & t];
        } else if ("hsl" === t.substr(0, 3))
          if (((p = c = t.match(tQ)), e)) {
            if (~t.indexOf("="))
              return ((p = t.match(tJ)), r && p.length < 4 && (p[3] = 1), p);
          } else
            ((s = (p[0] % 360) / 360),
              (l = p[1] / 100),
              (n = (o = p[2] / 100) <= 0.5 ? o * (l + 1) : o + l - o * l),
              (i = 2 * o - n),
              p.length > 3 && (p[3] *= 1),
              (p[0] = rc(s + 1 / 3, i, n)),
              (p[1] = rc(s, i, n)),
              (p[2] = rc(s - 1 / 3, i, n)));
        else p = t.match(tQ) || rd.transparent;
        p = p.map(Number);
      }
      return (
        e &&
          !c &&
          ((i = p[0] / 255),
          (o =
            ((u = Math.max(i, (n = p[1] / 255), (a = p[2] / 255))) +
              (h = Math.min(i, n, a))) /
            2),
          u === h
            ? (s = l = 0)
            : ((d = u - h),
              (l = o > 0.5 ? d / (2 - u - h) : d / (u + h)),
              (s =
                (u === i
                  ? (n - a) / d + 6 * (n < a)
                  : u === n
                    ? (a - i) / d + 2
                    : (i - n) / d + 4) * 60)),
          (p[0] = ~~(s + 0.5)),
          (p[1] = ~~(100 * l + 0.5)),
          (p[2] = ~~(100 * o + 0.5))),
        r && p.length < 4 && (p[3] = 1),
        p
      );
    },
    rf = function (t) {
      var e = [],
        r = [],
        i = -1;
      return (
        t.split(rg).forEach(function (t) {
          var n = t.match(tZ) || [];
          (e.push.apply(e, n), r.push((i += n.length + 1)));
        }),
        (e.c = r),
        e
      );
    },
    rm = function (t, e, r) {
      var i,
        n,
        a,
        s,
        l = "",
        o = (t + l).match(rg),
        u = e ? "hsla(" : "rgba(",
        h = 0;
      if (!o) return t;
      if (
        ((o = o.map(function (t) {
          return (
            (t = rp(t, e, 1)) &&
            u +
              (e
                ? t[0] + "," + t[1] + "%," + t[2] + "%," + t[3]
                : t.join(",")) +
              ")"
          );
        })),
        r && ((a = rf(t)), (i = r.c).join(l) !== a.c.join(l)))
      )
        for (s = (n = t.replace(rg, "1").split(tZ)).length - 1; h < s; h++)
          l +=
            n[h] +
            (~i.indexOf(h)
              ? o.shift() || u + "0,0,0,0)"
              : (a.length ? a : o.length ? o : r).shift());
      if (!n)
        for (s = (n = t.split(rg)).length - 1; h < s; h++) l += n[h] + o[h];
      return l + n[s];
    },
    rg = (function () {
      var t,
        e =
          "(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#(?:[0-9a-f]{3,4}){1,2}\\b";
      for (t in rd) e += "|" + t + "\\b";
      return RegExp(e + ")", "gi");
    })(),
    ry = /hsl[a]?\(/,
    rx = function (t) {
      var e,
        r = t.join(" ");
      if (((rg.lastIndex = 0), rg.test(r)))
        return (
          (e = ry.test(r)),
          (t[1] = rm(t[1], e)),
          (t[0] = rm(t[0], e, rf(t[1]))),
          !0
        );
    },
    r_ =
      ((td = Date.now),
      (tc = 500),
      (tp = 33),
      (tm = tf = td()),
      (tg = 1e3 / 240),
      (ty = 1e3 / 240),
      (tx = []),
      (t_ = function t(e) {
        var r,
          i,
          n,
          a,
          s = td() - tm,
          l = !0 === e;
        if (
          ((s > tc || s < 0) && (tf += s - tp),
          (tm += s),
          ((r = (n = tm - tf) - ty) > 0 || l) &&
            ((a = ++to.frame),
            (tu = n - 1e3 * to.time),
            (to.time = n /= 1e3),
            (ty += r + (r >= tg ? 4 : tg - r)),
            (i = 1)),
          l || (ta = ts(t)),
          i)
        )
          for (th = 0; th < tx.length; th++) tx[th](n, tu, a, e);
      }),
      (to = {
        time: 0,
        frame: 0,
        tick: function () {
          t_(!0);
        },
        deltaRatio: function (t) {
          return tu / (1e3 / (t || 60));
        },
        wake: function () {
          tA &&
            (!tk &&
              tG() &&
              ((tS = (tT = tk = window).document || {}),
              (t4.gsap = i_),
              (tT.gsapVersions || (tT.gsapVersions = [])).push(i_.version),
              t6(t3 || tT.GreenSockGlobals || (!tT.gsap && tT) || {}),
              ru.forEach(rh)),
            (tl = "u" > typeof requestAnimationFrame && requestAnimationFrame),
            ta && to.sleep(),
            (ts =
              tl ||
              function (t) {
                return setTimeout(t, (ty - 1e3 * to.time + 1) | 0);
              }),
            (tP = 1),
            t_(2));
        },
        sleep: function () {
          ((tl ? cancelAnimationFrame : clearTimeout)(ta), (tP = 0), (ts = et));
        },
        lagSmoothing: function (t, e) {
          tp = Math.min(e || 33, (tc = t || 1 / 0));
        },
        fps: function (t) {
          ((tg = 1e3 / (t || 240)), (ty = 1e3 * to.time + tg));
        },
        add: function (t, e, r) {
          var i = e
            ? function (e, r, n, a) {
                (t(e, r, n, a), to.remove(i));
              }
            : t;
          return (to.remove(t), tx[r ? "unshift" : "push"](i), rv(), i);
        },
        remove: function (t, e) {
          ~(e = tx.indexOf(t)) && tx.splice(e, 1) && th >= e && th--;
        },
        _listeners: tx,
      })),
    rv = function () {
      return !tP && r_.wake();
    },
    rb = {},
    rw = /^[\d.\-M][\d.\-,\s]/,
    rM = /["']/g,
    rT = function (t) {
      for (
        var e,
          r,
          i,
          n = {},
          a = t.substr(1, t.length - 3).split(":"),
          s = a[0],
          l = 1,
          o = a.length;
        l < o;
        l++
      )
        ((r = a[l]),
          (e = l !== o - 1 ? r.lastIndexOf(",") : r.length),
          (i = r.substr(0, e)),
          (n[s] = isNaN(i) ? i.replace(rM, "").trim() : +i),
          (s = r.substr(e + 1).trim()));
      return n;
    },
    rk = function (t) {
      var e = t.indexOf("(") + 1,
        r = t.indexOf(")"),
        i = t.indexOf("(", e);
      return t.substring(e, ~i && i < r ? t.indexOf(")", r + 1) : r);
    },
    rS = function (t) {
      var e = (t + "").split("("),
        r = rb[e[0]];
      return r && e.length > 1 && r.config
        ? r.config.apply(
            null,
            ~t.indexOf("{") ? [rT(e[1])] : rk(t).split(",").map(eM),
          )
        : rb._CE && rw.test(t)
          ? rb._CE("", t)
          : r;
    },
    rA = function (t) {
      return function (e) {
        return 1 - t(1 - e);
      };
    },
    rF = function (t, e) {
      return (t && (t$(t) ? t : rb[t] || rS(t))) || e;
    },
    rC = function (t, e, r, i) {
      (void 0 === r &&
        (r = function (t) {
          return 1 - e(1 - t);
        }),
        void 0 === i &&
          (i = function (t) {
            return t < 0.5 ? e(2 * t) / 2 : 1 - e((1 - t) * 2) / 2;
          }));
      var n,
        a = { easeIn: e, easeOut: r, easeInOut: i };
      return (
        em(t, function (t) {
          for (var e in ((rb[t] = t4[t] = a),
          (rb[(n = t.toLowerCase())] = r),
          a))
            rb[
              n + ("easeIn" === e ? ".in" : "easeOut" === e ? ".out" : ".inOut")
            ] = rb[t + "." + e] = a[e];
        }),
        a
      );
    },
    rP = function (t) {
      return function (e) {
        return e < 0.5 ? (1 - t(1 - 2 * e)) / 2 : 0.5 + t((e - 0.5) * 2) / 2;
      };
    },
    rj = function t(e, r, i) {
      var n = r >= 1 ? r : 1,
        a = (i || (e ? 0.3 : 0.45)) / (r < 1 ? r : 1),
        s = (a / tU) * (Math.asin(1 / n) || 0),
        l = function (t) {
          return 1 === t ? 1 : n * Math.pow(2, -10 * t) * tI((t - s) * a) + 1;
        },
        o =
          "out" === e
            ? l
            : "in" === e
              ? function (t) {
                  return 1 - l(1 - t);
                }
              : rP(l);
      return (
        (a = tU / a),
        (o.config = function (r, i) {
          return t(e, r, i);
        }),
        o
      );
    },
    rO = function t(e, r) {
      void 0 === r && (r = 1.70158);
      var i = function (t) {
          return t ? --t * t * ((r + 1) * t + r) + 1 : 0;
        },
        n =
          "out" === e
            ? i
            : "in" === e
              ? function (t) {
                  return 1 - i(1 - t);
                }
              : rP(i);
      return (
        (n.config = function (r) {
          return t(e, r);
        }),
        n
      );
    };
  (em("Linear,Quad,Cubic,Quart,Quint,Strong", function (t, e) {
    var r = e < 5 ? e + 1 : e;
    rC(
      t + ",Power" + (r - 1),
      e
        ? function (t) {
            return Math.pow(t, r);
          }
        : function (t) {
            return t;
          },
      function (t) {
        return 1 - Math.pow(1 - t, r);
      },
      function (t) {
        return t < 0.5
          ? Math.pow(2 * t, r) / 2
          : 1 - Math.pow((1 - t) * 2, r) / 2;
      },
    );
  }),
    (rb.Linear.easeNone = rb.none = rb.Linear.easeIn),
    rC("Elastic", rj("in"), rj("out"), rj()),
    (rN = 2 * (rz = 1 / 2.75)),
    (rI = 2.5 * rz),
    rC(
      "Bounce",
      function (t) {
        return 1 - rB(1 - t);
      },
      (rB = function (t) {
        return t < rz
          ? 7.5625 * t * t
          : t < rN
            ? 7.5625 * Math.pow(t - 1.5 / 2.75, 2) + 0.75
            : t < rI
              ? 7.5625 * (t -= 2.25 / 2.75) * t + 0.9375
              : 7.5625 * Math.pow(t - 2.625 / 2.75, 2) + 0.984375;
      }),
    ),
    rC("Expo", function (t) {
      return Math.pow(2, 10 * (t - 1)) * t + t * t * t * t * t * t * (1 - t);
    }),
    rC("Circ", function (t) {
      return -(tz(1 - t * t) - 1);
    }),
    rC("Sine", function (t) {
      return 1 === t ? 1 : -tN(t * tR) + 1;
    }),
    rC("Back", rO("in"), rO("out"), rO()),
    (rb.SteppedEase =
      rb.steps =
      t4.SteppedEase =
        {
          config: function (t, e) {
            void 0 === t && (t = 1);
            var r = 1 / t,
              i = t + +!e,
              n = +!!e,
              a = 1 - 1e-8;
            return function (t) {
              return (((i * e2(0, a, t)) | 0) + n) * r;
            };
          },
        }),
    (tO.ease = rb["quad.out"]),
    em(
      "onComplete,onUpdate,onStart,onRepeat,onReverseComplete,onInterrupt",
      function (t) {
        return (ed += t + "," + t + "Params,");
      },
    ));
  var rU = function (t, e) {
      ((this.id = tE++),
        (t._gsap = this),
        (this.target = t),
        (this.harness = e),
        (this.get = e ? e.get : ef),
        (this.set = e ? e.getSetter : r4));
    },
    rR = (function () {
      function t(t) {
        ((this.vars = t),
          (this._delay = +t.delay || 0),
          (this._repeat = 1 / 0 === t.repeat ? -2 : t.repeat || 0) &&
            ((this._rDelay = t.repeatDelay || 0),
            (this._yoyo = !!t.yoyo || !!t.yoyoEase)),
          (this._ts = 1),
          eK(this, +t.duration, 1, 1),
          (this.data = t.data),
          tw && ((this._ctx = tw), tw.data.push(this)),
          tP || r_.wake());
      }
      var e = t.prototype;
      return (
        (e.delay = function (t) {
          return t || 0 === t
            ? (this.parent &&
                this.parent.smoothChildTiming &&
                this.startTime(this._start + t - this._delay),
              (this._delay = t),
              this)
            : this._delay;
        }),
        (e.duration = function (t) {
          return arguments.length
            ? this.totalDuration(
                this._repeat > 0 ? t + (t + this._rDelay) * this._repeat : t,
              )
            : this.totalDuration() && this._dur;
        }),
        (e.totalDuration = function (t) {
          return arguments.length
            ? ((this._dirty = 0),
              eK(
                this,
                this._repeat < 0
                  ? t
                  : (t - this._repeat * this._rDelay) / (this._repeat + 1),
              ))
            : this._tDur;
        }),
        (e.totalTime = function (t, e) {
          if ((rv(), !arguments.length)) return this._tTime;
          var r = this._dp;
          if (r && r.smoothChildTiming && this._ts) {
            for (
              eD(this, t), !r._dp || r.parent || eL(r, this);
              r && r.parent;

            )
              (r.parent._time !==
                r._start +
                  (r._ts >= 0
                    ? r._tTime / r._ts
                    : -((r.totalDuration() - r._tTime) / r._ts)) &&
                r.totalTime(r._tTime, !0),
                (r = r.parent));
            !this.parent &&
              this._dp.autoRemoveChildren &&
              ((this._ts > 0 && t < this._tDur) ||
                (this._ts < 0 && t > 0) ||
                (!this._tDur && !t)) &&
              eW(this._dp, this, this._start - this._delay);
          }
          return (
            (this._tTime !== t ||
              (!this._dur && !e) ||
              (this._initted && 1e-8 === Math.abs(this._zTime)) ||
              (!this._initted && this._dur && t) ||
              (!t && !this._initted && (this.add || this._ptLookup))) &&
              (this._ts || (this._pTime = t), ew(this, t, e)),
            this
          );
        }),
        (e.time = function (t, e) {
          return arguments.length
            ? this.totalTime(
                Math.min(this.totalDuration(), t + eN(this)) %
                  (this._dur + this._rDelay) || (t ? this._dur : 0),
                e,
              )
            : this._time;
        }),
        (e.totalProgress = function (t, e) {
          return arguments.length
            ? this.totalTime(this.totalDuration() * t, e)
            : this.totalDuration()
              ? Math.min(1, this._tTime / this._tDur)
              : this.rawTime() >= 0 && this._initted
                ? 1
                : 0;
        }),
        (e.progress = function (t, e) {
          return arguments.length
            ? this.totalTime(
                this.duration() *
                  (this._yoyo && !(1 & this.iteration()) ? 1 - t : t) +
                  eN(this),
                e,
              )
            : this.duration()
              ? Math.min(1, this._time / this._dur)
              : +(this.rawTime() > 0);
        }),
        (e.iteration = function (t, e) {
          var r = this.duration() + this._rDelay;
          return arguments.length
            ? this.totalTime(this._time + (t - 1) * r, e)
            : this._repeat
              ? eI(this._tTime, r) + 1
              : 1;
        }),
        (e.timeScale = function (t, e) {
          if (!arguments.length) return -1e-8 === this._rts ? 0 : this._rts;
          if (this._rts === t) return this;
          var r =
            this.parent && this._ts ? eB(this.parent._time, this) : this._tTime;
          return (
            (this._rts = +t || 0),
            (this._ts = this._ps || -1e-8 === t ? 0 : this._rts),
            this.totalTime(
              e2(-Math.abs(this._delay), this.totalDuration(), r),
              !1 !== e,
            ),
            e$(this),
            eE(this)
          );
        }),
        (e.paused = function (t) {
          return arguments.length
            ? (this._ps !== t &&
                ((this._ps = t),
                t
                  ? ((this._pTime =
                      this._tTime || Math.max(-this._delay, this.rawTime())),
                    (this._ts = this._act = 0))
                  : (rv(),
                    (this._ts = this._rts),
                    this.totalTime(
                      this.parent && !this.parent.smoothChildTiming
                        ? this.rawTime()
                        : this._tTime || this._pTime,
                      1 === this.progress() &&
                        1e-8 !== Math.abs(this._zTime) &&
                        (this._tTime -= 1e-8),
                    ))),
              this)
            : this._ps;
        }),
        (e.startTime = function (t) {
          if (arguments.length) {
            this._start = ey(t);
            var e = this.parent || this._dp;
            return (
              e &&
                (e._sort || !this.parent) &&
                eW(e, this, this._start - this._delay),
              this
            );
          }
          return this._start;
        }),
        (e.endTime = function (t) {
          return (
            this._start +
            (tq(t) ? this.totalDuration() : this.duration()) /
              Math.abs(this._ts || 1)
          );
        }),
        (e.rawTime = function (t) {
          var e = this.parent || this._dp;
          return e
            ? t &&
              (!this._ts ||
                (this._repeat && this._time && 1 > this.totalProgress()))
              ? this._tTime % (this._dur + this._rDelay)
              : this._ts
                ? eB(e.rawTime(t), this)
                : this._tTime
            : this._tTime;
        }),
        (e.revert = function (t) {
          void 0 === t && (t = ei);
          var e = tb;
          return (
            (tb = t),
            eb(this) &&
              (this.timeline && this.timeline.revert(t),
              this.totalTime(-0.01, t.suppressEvents)),
            "nested" !== this.data && !1 !== t.kill && this.kill(),
            (tb = e),
            this
          );
        }),
        (e.globalTime = function (t) {
          for (var e = this, r = arguments.length ? t : e.rawTime(); e; )
            ((r = e._start + r / (Math.abs(e._ts) || 1)), (e = e._dp));
          return !this.parent && this._sat ? this._sat.globalTime(t) : r;
        }),
        (e.repeat = function (t) {
          return arguments.length
            ? ((this._repeat = 1 / 0 === t ? -2 : t), eQ(this))
            : -2 === this._repeat
              ? 1 / 0
              : this._repeat;
        }),
        (e.repeatDelay = function (t) {
          if (arguments.length) {
            var e = this._time;
            return ((this._rDelay = t), eQ(this), e ? this.time(e) : this);
          }
          return this._rDelay;
        }),
        (e.yoyo = function (t) {
          return arguments.length ? ((this._yoyo = t), this) : this._yoyo;
        }),
        (e.seek = function (t, e) {
          return this.totalTime(eZ(this, t), tq(e));
        }),
        (e.restart = function (t, e) {
          return (
            this.play().totalTime(t ? -this._delay : 0, tq(e)),
            this._dur || (this._zTime = -1e-8),
            this
          );
        }),
        (e.play = function (t, e) {
          return (null != t && this.seek(t, e), this.reversed(!1).paused(!1));
        }),
        (e.reverse = function (t, e) {
          return (
            null != t && this.seek(t || this.totalDuration(), e),
            this.reversed(!0).paused(!1)
          );
        }),
        (e.pause = function (t, e) {
          return (null != t && this.seek(t, e), this.paused(!0));
        }),
        (e.resume = function () {
          return this.paused(!1);
        }),
        (e.reversed = function (t) {
          return arguments.length
            ? (!!t !== this.reversed() &&
                this.timeScale(-this._rts || (t ? -1e-8 : 0)),
              this)
            : this._rts < 0;
        }),
        (e.invalidate = function () {
          return ((this._initted = this._act = 0), (this._zTime = -1e-8), this);
        }),
        (e.isActive = function () {
          var t,
            e = this.parent || this._dp,
            r = this._start;
          return !!(
            !e ||
            (this._ts &&
              this._initted &&
              e.isActive() &&
              (t = e.rawTime(!0)) >= r &&
              t < this.endTime(!0) - 1e-8)
          );
        }),
        (e.eventCallback = function (t, e, r) {
          var i = this.vars;
          return arguments.length > 1
            ? (e
                ? ((i[t] = e),
                  r && (i[t + "Params"] = r),
                  "onUpdate" === t && (this._onUpdate = e))
                : delete i[t],
              this)
            : i[t];
        }),
        (e.then = function (t) {
          var e = this,
            r = e._prom;
          return new Promise(function (i) {
            var n = t$(t) ? t : eT,
              a = function () {
                var t = e.then;
                ((e.then = null),
                  r && r(),
                  t$(n) && (n = n(e)) && (n.then || n === e) && (e.then = t),
                  i(n),
                  (e.then = t));
              };
            (e._initted && 1 === e.totalProgress() && e._ts >= 0) ||
            (!e._tTime && e._ts < 0)
              ? a()
              : (e._prom = a);
          });
        }),
        (e.kill = function () {
          ro(this);
        }),
        t
      );
    })();
  ek(rR.prototype, {
    _time: 0,
    _start: 0,
    _end: 0,
    _tTime: 0,
    _tDur: 0,
    _dirty: 0,
    _repeat: 0,
    _yoyo: !1,
    parent: null,
    _initted: !1,
    _rDelay: 0,
    _ts: 1,
    _dp: 0,
    ratio: 0,
    _zTime: -1e-8,
    _prom: 0,
    _ps: !1,
    _rts: 1,
  });
  var rE = (function (t) {
    function e(e, r) {
      var i;
      return (
        void 0 === e && (e = {}),
        ((i = t.call(this, e) || this).labels = {}),
        (i.smoothChildTiming = !!e.smoothChildTiming),
        (i.autoRemoveChildren = !!e.autoRemoveChildren),
        (i._sort = tq(e.sortChildren)),
        tM && eW(e.parent || tM, ti(i), r),
        e.reversed && i.reverse(),
        e.paused && i.paused(!0),
        e.scrollTrigger && eq(ti(i), e.scrollTrigger),
        i
      );
    }
    tn(e, t);
    var r = e.prototype;
    return (
      (r.to = function (t, e, r) {
        return (e0(0, arguments, this), this);
      }),
      (r.from = function (t, e, r) {
        return (e0(1, arguments, this), this);
      }),
      (r.fromTo = function (t, e, r, i) {
        return (e0(2, arguments, this), this);
      }),
      (r.set = function (t, e, r) {
        return (
          (e.duration = 0),
          (e.parent = this),
          eC(e).repeatDelay || (e.repeat = 0),
          (e.immediateRender = !!e.immediateRender),
          new rZ(t, e, eZ(this, r), 1),
          this
        );
      }),
      (r.call = function (t, e, r) {
        return eW(this, rZ.delayedCall(0, t, e), r);
      }),
      (r.staggerTo = function (t, e, r, i, n, a, s) {
        return (
          (r.duration = e),
          (r.stagger = r.stagger || i),
          (r.onComplete = a),
          (r.onCompleteParams = s),
          (r.parent = this),
          new rZ(t, r, eZ(this, n)),
          this
        );
      }),
      (r.staggerFrom = function (t, e, r, i, n, a, s) {
        return (
          (r.runBackwards = 1),
          (eC(r).immediateRender = tq(r.immediateRender)),
          this.staggerTo(t, e, r, i, n, a, s)
        );
      }),
      (r.staggerFromTo = function (t, e, r, i, n, a, s, l) {
        return (
          (i.startAt = r),
          (eC(i).immediateRender = tq(i.immediateRender)),
          this.staggerTo(t, e, i, n, a, s, l)
        );
      }),
      (r.render = function (t, e, r) {
        var i,
          n,
          a,
          s,
          l,
          o,
          u,
          h,
          d,
          c,
          p,
          f,
          m = this._time,
          g = this._dirty ? this.totalDuration() : this._tDur,
          y = this._dur,
          x = t <= 0 ? 0 : ey(t),
          _ = this._zTime < 0 != t < 0 && (this._initted || !y);
        if (
          (this !== tM && x > g && t >= 0 && (x = g),
          x !== this._tTime || r || _)
        ) {
          if (
            (m !== this._time &&
              y &&
              ((x += this._time - m), (t += this._time - m)),
            (i = x),
            (d = this._start),
            (o = !(h = this._ts)),
            _ && (y || (m = this._zTime), (t || !e) && (this._zTime = t)),
            this._repeat)
          ) {
            if (
              ((p = this._yoyo),
              (l = y + this._rDelay),
              this._repeat < -1 && t < 0)
            )
              return this.totalTime(100 * l + t, e, r);
            if (
              ((i = ey(x % l)),
              x === g
                ? ((s = this._repeat), (i = y))
                : ((s = ~~(c = ey(x / l))) && s === c && ((i = y), s--),
                  i > y && (i = y)),
              (c = eI(this._tTime, l)),
              !m &&
                this._tTime &&
                c !== s &&
                this._tTime - c * l - this._dur <= 0 &&
                (c = s),
              p && 1 & s && ((i = y - i), (f = 1)),
              s !== c && !this._lock)
            ) {
              var v = p && 1 & c,
                b = v === (p && 1 & s);
              if (
                (s < c && (v = !v),
                (m = v ? 0 : x % y ? y : x),
                (this._lock = 1),
                (this.render(m || (f ? 0 : ey(s * l)), e, !y)._lock = 0),
                (this._tTime = x),
                !e && this.parent && rl(this, "onRepeat"),
                this.vars.repeatRefresh &&
                  !f &&
                  ((this.invalidate()._lock = 1), (c = s)),
                (m && m !== this._time) ||
                  o !== !this._ts ||
                  (this.vars.onRepeat && !this.parent && !this._act) ||
                  ((y = this._dur),
                  (g = this._tDur),
                  b &&
                    ((this._lock = 2),
                    (m = v ? y : -1e-4),
                    this.render(m, !0),
                    this.vars.repeatRefresh && !f && this.invalidate()),
                  (this._lock = 0),
                  !this._ts && !o))
              )
                return this;
            }
          }
          if (
            (this._hasPause &&
              !this._forcing &&
              this._lock < 2 &&
              (u = eH(this, ey(m), ey(i))) &&
              (x -= i - (i = u._start)),
            (this._tTime = x),
            (this._time = i),
            (this._act = !!h),
            this._initted ||
              ((this._onUpdate = this.vars.onUpdate),
              (this._initted = 1),
              (this._zTime = t),
              (m = 0)),
            !m &&
              x &&
              y &&
              !e &&
              !c &&
              (rl(this, "onStart"), this._tTime !== x))
          )
            return this;
          if (i >= m && t >= 0)
            for (n = this._first; n; ) {
              if (
                ((a = n._next), (n._act || i >= n._start) && n._ts && u !== n)
              ) {
                if (n.parent !== this) return this.render(t, e, r);
                if (
                  (n.render(
                    n._ts > 0
                      ? (i - n._start) * n._ts
                      : (n._dirty ? n.totalDuration() : n._tDur) +
                          (i - n._start) * n._ts,
                    e,
                    r,
                  ),
                  i !== this._time || (!this._ts && !o))
                ) {
                  ((u = 0), a && (x += this._zTime = -1e-8));
                  break;
                }
              }
              n = a;
            }
          else {
            n = this._last;
            for (var w = t < 0 ? t : i; n; ) {
              if (
                ((a = n._prev), (n._act || w <= n._end) && n._ts && u !== n)
              ) {
                if (n.parent !== this) return this.render(t, e, r);
                if (
                  (n.render(
                    n._ts > 0
                      ? (w - n._start) * n._ts
                      : (n._dirty ? n.totalDuration() : n._tDur) +
                          (w - n._start) * n._ts,
                    e,
                    r || (tb && eb(n)),
                  ),
                  i !== this._time || (!this._ts && !o))
                ) {
                  ((u = 0), a && (x += this._zTime = w ? -1e-8 : 1e-8));
                  break;
                }
              }
              n = a;
            }
          }
          if (
            u &&
            !e &&
            (this.pause(),
            (u.render(i >= m ? 0 : -1e-8)._zTime = i >= m ? 1 : -1),
            this._ts)
          )
            return ((this._start = d), e$(this), this.render(t, e, r));
          (this._onUpdate && !e && rl(this, "onUpdate", !0),
            ((x === g && this._tTime >= this.totalDuration()) || (!x && m)) &&
              (d === this._start || Math.abs(h) !== Math.abs(this._ts)) &&
              !this._lock &&
              ((t || !y) &&
                ((x === g && this._ts > 0) || (!x && this._ts < 0)) &&
                eU(this, 1),
              e ||
                (t < 0 && !m) ||
                (!x && !m && g) ||
                (rl(
                  this,
                  x === g && t >= 0 ? "onComplete" : "onReverseComplete",
                  !0,
                ),
                this._prom &&
                  !(x < g && this.timeScale() > 0) &&
                  this._prom())));
        }
        return this;
      }),
      (r.add = function (t, e) {
        var r = this;
        if ((tD(e) || (e = eZ(this, e, t)), !(t instanceof rR))) {
          if (tY(t))
            return (
              t.forEach(function (t) {
                return r.add(t, e);
              }),
              this
            );
          if (tB(t)) return this.addLabel(t, e);
          if (!t$(t)) return this;
          t = rZ.delayedCall(0, t);
        }
        return this !== t ? eW(this, t, e) : this;
      }),
      (r.getChildren = function (t, e, r, i) {
        (void 0 === t && (t = !0),
          void 0 === e && (e = !0),
          void 0 === r && (r = !0),
          void 0 === i && (i = -1e8));
        for (var n = [], a = this._first; a; )
          (a._start >= i &&
            (a instanceof rZ
              ? e && n.push(a)
              : (r && n.push(a),
                t && n.push.apply(n, a.getChildren(!0, e, r)))),
            (a = a._next));
        return n;
      }),
      (r.getById = function (t) {
        for (var e = this.getChildren(1, 1, 1), r = e.length; r--; )
          if (e[r].vars.id === t) return e[r];
      }),
      (r.remove = function (t) {
        return tB(t)
          ? this.removeLabel(t)
          : t$(t)
            ? this.killTweensOf(t)
            : (t.parent === this && eO(this, t),
              t === this._recent && (this._recent = this._last),
              eR(this));
      }),
      (r.totalTime = function (e, r) {
        return arguments.length
          ? ((this._forcing = 1),
            !this._dp &&
              this._ts &&
              (this._start = ey(
                r_.time -
                  (this._ts > 0
                    ? e / this._ts
                    : -((this.totalDuration() - e) / this._ts)),
              )),
            t.prototype.totalTime.call(this, e, r),
            (this._forcing = 0),
            this)
          : this._tTime;
      }),
      (r.addLabel = function (t, e) {
        return ((this.labels[t] = eZ(this, e)), this);
      }),
      (r.removeLabel = function (t) {
        return (delete this.labels[t], this);
      }),
      (r.addPause = function (t, e, r) {
        var i = rZ.delayedCall(0, e || et, r);
        return (
          (i.data = "isPause"),
          (this._hasPause = 1),
          eW(this, i, eZ(this, t))
        );
      }),
      (r.removePause = function (t) {
        var e = this._first;
        for (t = eZ(this, t); e; )
          (e._start === t && "isPause" === e.data && eU(e), (e = e._next));
      }),
      (r.killTweensOf = function (t, e, r) {
        for (var i = this.getTweensOf(t, r), n = i.length; n--; )
          r$ !== i[n] && i[n].kill(t, e);
        return this;
      }),
      (r.getTweensOf = function (t, e) {
        for (var r, i = [], n = e6(t), a = this._first, s = tD(e); a; )
          (a instanceof rZ
            ? e_(a._targets, n) &&
              (s
                ? (!r$ || (a._initted && a._ts)) &&
                  a.globalTime(0) <= e &&
                  a.globalTime(a.totalDuration()) > e
                : !e || a.isActive()) &&
              i.push(a)
            : (r = a.getTweensOf(n, e)).length && i.push.apply(i, r),
            (a = a._next));
        return i;
      }),
      (r.tweenTo = function (t, e) {
        e = e || {};
        var r,
          i = this,
          n = eZ(i, t),
          a = e,
          s = a.startAt,
          l = a.onStart,
          o = a.onStartParams,
          u = a.immediateRender,
          h = rZ.to(
            i,
            ek(
              {
                ease: e.ease || "none",
                lazy: !1,
                immediateRender: !1,
                time: n,
                overwrite: "auto",
                duration:
                  e.duration ||
                  Math.abs(
                    (n - (s && "time" in s ? s.time : i._time)) / i.timeScale(),
                  ) ||
                  1e-8,
                onStart: function () {
                  if ((i.pause(), !r)) {
                    var t =
                      e.duration ||
                      Math.abs(
                        (n - (s && "time" in s ? s.time : i._time)) /
                          i.timeScale(),
                      );
                    (h._dur !== t && eK(h, t, 0, 1).render(h._time, !0, !0),
                      (r = 1));
                  }
                  l && l.apply(h, o || []);
                },
              },
              e,
            ),
          );
        return u ? h.render(0) : h;
      }),
      (r.tweenFromTo = function (t, e, r) {
        return this.tweenTo(e, ek({ startAt: { time: eZ(this, t) } }, r));
      }),
      (r.recent = function () {
        return this._recent;
      }),
      (r.nextLabel = function (t) {
        return (void 0 === t && (t = this._time), rs(this, eZ(this, t)));
      }),
      (r.previousLabel = function (t) {
        return (void 0 === t && (t = this._time), rs(this, eZ(this, t), 1));
      }),
      (r.currentLabel = function (t) {
        return arguments.length
          ? this.seek(t, !0)
          : this.previousLabel(this._time + 1e-8);
      }),
      (r.shiftChildren = function (t, e, r) {
        void 0 === r && (r = 0);
        var i,
          n = this._first,
          a = this.labels;
        for (t = ey(t); n; )
          (n._start >= r && ((n._start += t), (n._end += t)), (n = n._next));
        if (e) for (i in a) a[i] >= r && (a[i] += t);
        return eR(this);
      }),
      (r.invalidate = function (e) {
        var r = this._first;
        for (this._lock = 0; r; ) (r.invalidate(e), (r = r._next));
        return t.prototype.invalidate.call(this, e);
      }),
      (r.clear = function (t) {
        void 0 === t && (t = !0);
        for (var e, r = this._first; r; )
          ((e = r._next), this.remove(r), (r = e));
        return (
          this._dp && (this._time = this._tTime = this._pTime = 0),
          t && (this.labels = {}),
          eR(this)
        );
      }),
      (r.totalDuration = function (t) {
        var e,
          r,
          i,
          n = 0,
          a = this._last,
          s = 1e8;
        if (arguments.length)
          return this.timeScale(
            (this._repeat < 0 ? this.duration() : this.totalDuration()) /
              (this.reversed() ? -t : t),
          );
        if (this._dirty) {
          for (i = this.parent; a; )
            ((e = a._prev),
              a._dirty && a.totalDuration(),
              (r = a._start) > s && this._sort && a._ts && !this._lock
                ? ((this._lock = 1), (eW(this, a, r - a._delay, 1)._lock = 0))
                : (s = r),
              r < 0 &&
                a._ts &&
                ((n -= r),
                ((!i && !this._dp) || (i && i.smoothChildTiming)) &&
                  ((this._start += ey(r / this._ts)),
                  (this._time -= r),
                  (this._tTime -= r)),
                this.shiftChildren(-r, !1, -1 / 0),
                (s = 0)),
              a._end > n && a._ts && (n = a._end),
              (a = e));
          (eK(this, this === tM && this._time > n ? this._time : n, 1, 1),
            (this._dirty = 0));
        }
        return this._tDur;
      }),
      (e.updateRoot = function (t) {
        if ((tM._ts && (ew(tM, eB(t, tM)), (tF = r_.frame)), r_.frame >= eu)) {
          eu += tj.autoSleep || 120;
          var e = tM._first;
          if ((!e || !e._ts) && tj.autoSleep && r_._listeners.length < 2) {
            for (; e && !e._ts; ) e = e._next;
            e || r_.sleep();
          }
        }
      }),
      e
    );
  })(rR);
  ek(rE.prototype, { _lock: 0, _hasPause: 0, _forcing: 0 });
  var rz,
    rN,
    rI,
    rB,
    r$,
    rD,
    rL = function (t, e, r, i, n, a, s) {
      var l,
        o,
        u,
        h,
        d,
        c,
        p,
        f,
        m = new ii(this._pt, t, e, 0, 1, r8, null, n),
        g = 0,
        y = 0;
      for (
        m.b = r,
          m.e = i,
          r += "",
          i += "",
          (p = ~i.indexOf("random(")) && (i = rn(i)),
          a && (a((f = [r, i]), t, e), (r = f[0]), (i = f[1])),
          o = r.match(t0) || [];
        (l = t0.exec(i));

      )
        ((h = l[0]),
          (d = i.substring(g, l.index)),
          u ? (u = (u + 1) % 5) : "rgba(" === d.substr(-5) && (u = 1),
          h !== o[y++] &&
            ((c = parseFloat(o[y - 1]) || 0),
            (m._pt = {
              _next: m._pt,
              p: d || 1 === y ? d : ",",
              s: c,
              c: "=" === h.charAt(1) ? ex(c, h) - c : parseFloat(h) - c,
              m: u && u < 4 ? Math.round : 0,
            }),
            (g = t0.lastIndex)));
      return (
        (m.c = g < i.length ? i.substring(g, i.length) : ""),
        (m.fp = s),
        (t1.test(i) || p) && (m.e = 0),
        (this._pt = m),
        m
      );
    },
    rW = function (t, e, r, i, n, a, s, l, o, u) {
      t$(i) && (i = i(n || 0, t, a));
      var h,
        d = t[e],
        c =
          "get" !== r
            ? r
            : t$(d)
              ? o
                ? t[
                    e.indexOf("set") || !t$(t["get" + e.substr(3)])
                      ? e
                      : "get" + e.substr(3)
                  ](o)
                : t[e]()
              : d,
        p = t$(d) ? (o ? r2 : r1) : r0;
      if (
        (tB(i) &&
          (~i.indexOf("random(") && (i = rn(i)),
          "=" === i.charAt(1) &&
            ((h = ex(c, i) + (e5(c) || 0)) || 0 === h) &&
            (i = h)),
        !u || c !== i || rD)
      )
        return isNaN(c * i) || "" === i
          ? (d || e in t || t8(e, i),
            rL.call(this, t, e, c, i, p, l || tj.stringFilter, o))
          : ((h = new ii(
              this._pt,
              t,
              e,
              +c || 0,
              i - (c || 0),
              "boolean" == typeof d ? r6 : r3,
              0,
              p,
            )),
            o && (h.fp = o),
            s && h.modifier(s, this, t),
            (this._pt = h));
    },
    rq = function (t, e, r, i, n) {
      if (
        (t$(t) && (t = rK(t, n, e, r, i)),
        !tW(t) || (t.style && t.nodeType) || tY(t) || tX(t))
      )
        return tB(t) ? rK(t, n, e, r, i) : t;
      var a,
        s = {};
      for (a in t) s[a] = rK(t[a], n, e, r, i);
      return s;
    },
    rG = function (t, e, r, i, n, a) {
      var s, l, o, u;
      if (
        el[t] &&
        !1 !==
          (s = new el[t]()).init(
            n,
            s.rawVars ? e[t] : rq(e[t], i, n, a, r),
            r,
            i,
            a,
          ) &&
        ((r._pt = l = new ii(r._pt, n, t, 0, 1, s.render, s, 0, s.priority)),
        r !== tC)
      )
        for (o = r._ptLookup[r._targets.indexOf(n)], u = s._props.length; u--; )
          o[s._props[u]] = l;
      return s;
    },
    rV = function t(e, r, i) {
      var n,
        a,
        s,
        l,
        o,
        u,
        h,
        d,
        c,
        p,
        f,
        m,
        g,
        y = e.vars,
        x = y.ease,
        _ = y.startAt,
        v = y.immediateRender,
        b = y.lazy,
        w = y.onUpdate,
        M = y.runBackwards,
        T = y.yoyoEase,
        k = y.keyframes,
        S = y.autoRevert,
        A = e._dur,
        F = e._startAt,
        C = e._targets,
        P = e.parent,
        j = P && "nested" === P.data ? P.vars.targets : C,
        O = "auto" === e._overwrite && !tv,
        U = e.timeline,
        R = y.easeReverse || T;
      if (
        (!U || (k && x) || (x = "none"),
        (e._ease = rF(x, tO.ease)),
        (e._rEase = R && (rF(R) || e._ease)),
        (e._from = !U && !!y.runBackwards),
        e._from && (e.ratio = 1),
        !U || (k && !y.stagger))
      ) {
        if (
          ((m = (d = C[0] ? ep(C[0]).harness : 0) && y[d.prop]),
          (n = eF(y, en)),
          F &&
            (F._zTime < 0 && F.progress(1),
            r < 0 && M && v && !S
              ? F.render(-1, !0)
              : F.revert(M && A ? er : ee),
            (F._lazy = 0)),
          _)
        ) {
          if (
            (eU(
              (e._startAt = rZ.set(
                C,
                ek(
                  {
                    data: "isStart",
                    overwrite: !1,
                    parent: P,
                    immediateRender: !0,
                    lazy: !F && tq(b),
                    startAt: null,
                    delay: 0,
                    onUpdate:
                      w &&
                      function () {
                        return rl(e, "onUpdate");
                      },
                    stagger: 0,
                  },
                  _,
                ),
              )),
            ),
            (e._startAt._dp = 0),
            (e._startAt._sat = e),
            r < 0 && (tb || (!v && !S)) && e._startAt.revert(er),
            v && A && r <= 0 && i <= 0)
          ) {
            r && (e._zTime = r);
            return;
          }
        } else if (M && A && !F)
          if (
            (r && (v = !1),
            (s = ek(
              {
                overwrite: !1,
                data: "isFromStart",
                lazy: v && !F && tq(b),
                immediateRender: v,
                stagger: 0,
                parent: P,
              },
              n,
            )),
            m && (s[d.prop] = m),
            eU((e._startAt = rZ.set(C, s))),
            (e._startAt._dp = 0),
            (e._startAt._sat = e),
            r < 0 && (tb ? e._startAt.revert(er) : e._startAt.render(-1, !0)),
            (e._zTime = r),
            v)
          ) {
            if (!r) return;
          } else t(e._startAt, 1e-8, 1e-8);
        for (
          e._pt = e._ptCache = 0, b = (A && tq(b)) || (b && !A), a = 0;
          a < C.length;
          a++
        ) {
          if (
            ((h = (o = C[a])._gsap || ec(C)[a]._gsap),
            (e._ptLookup[a] = p = {}),
            es[h.id] && ea.length && ev(),
            (f = j === C ? a : j.indexOf(o)),
            d &&
              !1 !== (c = new d()).init(o, m || n, e, f, j) &&
              ((e._pt = l =
                new ii(e._pt, o, c.name, 0, 1, c.render, c, 0, c.priority)),
              c._props.forEach(function (t) {
                p[t] = l;
              }),
              c.priority && (u = 1)),
            !d || m)
          )
            for (s in n)
              el[s] && (c = rG(s, n, e, f, o, j))
                ? c.priority && (u = 1)
                : (p[s] = l =
                    rW.call(e, o, s, "get", n[s], f, j, 0, y.stringFilter));
          (e._op && e._op[a] && e.kill(o, e._op[a]),
            O &&
              e._pt &&
              ((r$ = e),
              tM.killTweensOf(o, p, e.globalTime(r)),
              (g = !e.parent),
              (r$ = 0)),
            e._pt && b && (es[h.id] = 1));
        }
        (u && ir(e), e._onInit && e._onInit(e));
      }
      ((e._onUpdate = w),
        (e._initted = (!e._op || e._pt) && !g),
        k && r <= 0 && U.render(1e8, !0, !0));
    },
    rX = function (t, e, r, i, n, a, s, l) {
      var o,
        u,
        h,
        d,
        c = ((t._pt && t._ptCache) || (t._ptCache = {}))[e];
      if (!c)
        for (
          c = t._ptCache[e] = [], h = t._ptLookup, d = t._targets.length;
          d--;

        ) {
          if ((o = h[d][e]) && o.d && o.d._pt)
            for (o = o.d._pt; o && o.p !== e && o.fp !== e; ) o = o._next;
          if (!o)
            return (
              (rD = 1),
              (t.vars[e] = "+=0"),
              rV(t, s),
              (rD = 0),
              l
                ? t7(
                    e +
                      " not eligible for reset. Try splitting into individual properties",
                  )
                : 1
            );
          c.push(o);
        }
      for (d = c.length; d--; )
        (((o = (u = c[d])._pt || u).s =
          (i || 0 === i) && !n ? i : o.s + (i || 0) + a * o.c),
          (o.c = r - o.s),
          u.e && (u.e = eg(r) + e5(u.e)),
          u.b && (u.b = o.s + e5(u.b)));
    },
    rY = function (t, e) {
      var r,
        i,
        n,
        a,
        s = t[0] ? ep(t[0]).harness : 0,
        l = s && s.aliases;
      if (!l) return e;
      for (i in ((r = eS({}, e)), l))
        if (i in r)
          for (n = (a = l[i].split(",")).length; n--; ) r[a[n]] = r[i];
      return r;
    },
    rH = function (t, e, r, i) {
      var n,
        a,
        s = e.ease || i || "power1.inOut";
      if (tY(e))
        ((a = r[t] || (r[t] = [])),
          e.forEach(function (t, r) {
            return a.push({ t: (r / (e.length - 1)) * 100, v: t, e: s });
          }));
      else
        for (n in e)
          ((a = r[n] || (r[n] = [])),
            "ease" === n || a.push({ t: parseFloat(t), v: e[n], e: s }));
    },
    rK = function (t, e, r, i, n) {
      return t$(t)
        ? t.call(e, r, i, n)
        : tB(t) && ~t.indexOf("random(")
          ? rn(t)
          : t;
    },
    rQ =
      ed +
      "repeat,repeatDelay,yoyo,repeatRefresh,yoyoEase,easeReverse,autoRevert",
    rJ = {};
  em(rQ + ",id,stagger,delay,duration,paused,scrollTrigger", function (t) {
    return (rJ[t] = 1);
  });
  var rZ = (function (t) {
    function e(e, r, i, n) {
      "number" == typeof r && ((i.duration = r), (r = i), (i = null));
      var a,
        s,
        l,
        o,
        u,
        h,
        d,
        c,
        p = t.call(this, n ? r : eC(r)) || this,
        f = p.vars,
        m = f.duration,
        g = f.delay,
        y = f.immediateRender,
        x = f.stagger,
        _ = f.overwrite,
        v = f.keyframes,
        b = f.defaults,
        w = f.scrollTrigger,
        M = r.parent || tM,
        T = (tY(e) || tX(e) ? tD(e[0]) : "length" in r) ? [e] : e6(e);
      if (
        ((p._targets = T.length
          ? ec(T)
          : t7(
              "GSAP target " + e + " not found. https://gsap.com",
              !tj.nullTargetWarn,
            ) || []),
        (p._ptLookup = []),
        (p._overwrite = _),
        v || x || tV(m) || tV(g))
      ) {
        var k = (r = p.vars).easeReverse || r.yoyoEase;
        if (
          ((a = p.timeline =
            new rE({
              data: "nested",
              defaults: b || {},
              targets: M && "nested" === M.data ? M.vars.targets : T,
            })).kill(),
          (a.parent = a._dp = ti(p)),
          (a._start = 0),
          x || tV(m) || tV(g))
        ) {
          if (((o = T.length), (d = x && e9(x)), tW(x)))
            for (u in x) ~rQ.indexOf(u) && (c || (c = {}), (c[u] = x[u]));
          for (s = 0; s < o; s++)
            (((l = eF(r, rJ)).stagger = 0),
              k && (l.easeReverse = k),
              c && eS(l, c),
              (h = T[s]),
              (l.duration = +rK(m, ti(p), s, h, T)),
              (l.delay = (+rK(g, ti(p), s, h, T) || 0) - p._delay),
              !x &&
                1 === o &&
                l.delay &&
                ((p._delay = g = l.delay), (p._start += g), (l.delay = 0)),
              a.to(h, l, d ? d(s, h, T) : 0),
              (a._ease = rb.none));
          a.duration() ? (m = g = 0) : (p.timeline = 0);
        } else if (v) {
          (eC(ek(a.vars.defaults, { ease: "none" })),
            (a._ease = rF(v.ease || r.ease || "none")));
          var S,
            A,
            F,
            C = 0;
          if (tY(v))
            (v.forEach(function (t) {
              return a.to(T, t, ">");
            }),
              a.duration());
          else {
            for (u in ((l = {}), v))
              "ease" === u || "easeEach" === u || rH(u, v[u], l, v.easeEach);
            for (u in l)
              for (
                S = l[u].sort(function (t, e) {
                  return t.t - e.t;
                }),
                  C = 0,
                  s = 0;
                s < S.length;
                s++
              )
                (((F = {
                  ease: (A = S[s]).e,
                  duration: ((A.t - (s ? S[s - 1].t : 0)) / 100) * m,
                })[u] = A.v),
                  a.to(T, F, C),
                  (C += F.duration));
            a.duration() < m && a.to({}, { duration: m - a.duration() });
          }
        }
        m || p.duration((m = a.duration()));
      } else p.timeline = 0;
      return (
        !0 !== _ || tv || ((r$ = ti(p)), tM.killTweensOf(T), (r$ = 0)),
        eW(M, ti(p), i),
        r.reversed && p.reverse(),
        r.paused && p.paused(!0),
        (y ||
          (!m &&
            !v &&
            p._start === ey(M._time) &&
            tq(y) &&
            (function t(e) {
              return !e || (e._ts && t(e.parent));
            })(ti(p)) &&
            "nested" !== M.data)) &&
          ((p._tTime = -1e-8), p.render(Math.max(0, -g) || 0)),
        w && eq(ti(p), w),
        p
      );
    }
    tn(e, t);
    var r = e.prototype;
    return (
      (r.render = function (t, e, r) {
        var i,
          n,
          a,
          s,
          l,
          o,
          u,
          h,
          d = this._time,
          c = this._tDur,
          p = this._dur,
          f = t < 0,
          m = t > c - 1e-8 && !f ? c : t < 1e-8 ? 0 : t;
        if (p) {
          if (
            m !== this._tTime ||
            !t ||
            r ||
            (!this._initted && this._tTime) ||
            (this._startAt && this._zTime < 0 !== f) ||
            this._lazy
          ) {
            if (((i = m), (h = this.timeline), this._repeat)) {
              if (((s = p + this._rDelay), this._repeat < -1 && f))
                return this.totalTime(100 * s + t, e, r);
              if (
                ((i = ey(m % s)),
                m === c
                  ? ((a = this._repeat), (i = p))
                  : (a = ~~(l = ey(m / s))) && a === l
                    ? ((i = p), a--)
                    : i > p && (i = p),
                (o = this._yoyo && 1 & a) && (i = p - i),
                (l = eI(this._tTime, s)),
                i === d && !r && this._initted && a === l)
              )
                return ((this._tTime = m), this);
              a !== l &&
                this.vars.repeatRefresh &&
                !o &&
                !this._lock &&
                i !== s &&
                this._initted &&
                ((this._lock = r = 1),
                (this.render(ey(s * a), !0).invalidate()._lock = 0));
            }
            if (!this._initted) {
              if (eG(this, f ? t : i, r, e, m))
                return ((this._tTime = 0), this);
              if (
                d !== this._time &&
                !(r && this.vars.repeatRefresh && a !== l)
              )
                return this;
              if (p !== this._dur) return this.render(t, e, r);
            }
            if (this._rEase) {
              var g = i < d;
              if (g !== this._inv) {
                var y = g ? d : p - d;
                ((this._inv = g),
                  this._from && (this.ratio = 1 - this.ratio),
                  (this._invRatio = this.ratio),
                  (this._invTime = d),
                  (this._invRecip = y ? (g ? -1 : 1) / y : 0),
                  (this._invScale = g ? -this.ratio : 1 - this.ratio),
                  (this._invEase = g ? this._rEase : this._ease));
              }
              this.ratio = u =
                this._invRatio +
                this._invScale *
                  this._invEase((i - this._invTime) * this._invRecip);
            } else this.ratio = u = this._ease(i / p);
            if (
              (this._from && (this.ratio = u = 1 - u),
              (this._tTime = m),
              (this._time = i),
              !this._act && this._ts && ((this._act = 1), (this._lazy = 0)),
              !d && m && !e && !l && (rl(this, "onStart"), this._tTime !== m))
            )
              return this;
            for (n = this._pt; n; ) (n.r(u, n.d), (n = n._next));
            ((h &&
              h.render(t < 0 ? t : h._dur * h._ease(i / this._dur), e, r)) ||
              (this._startAt && (this._zTime = t)),
              this._onUpdate &&
                !e &&
                (f && ez(this, t, e, r), rl(this, "onUpdate")),
              this._repeat &&
                a !== l &&
                this.vars.onRepeat &&
                !e &&
                this.parent &&
                rl(this, "onRepeat"),
              (m === this._tDur || !m) &&
                this._tTime === m &&
                (f && !this._onUpdate && ez(this, t, !0, !0),
                (t || !p) &&
                  ((m === this._tDur && this._ts > 0) ||
                    (!m && this._ts < 0)) &&
                  eU(this, 1),
                !e &&
                  !(f && !d) &&
                  (m || d || o) &&
                  (rl(this, m === c ? "onComplete" : "onReverseComplete", !0),
                  this._prom &&
                    !(m < c && this.timeScale() > 0) &&
                    this._prom())));
          }
        } else eY(this, t, e, r);
        return this;
      }),
      (r.targets = function () {
        return this._targets;
      }),
      (r.invalidate = function (e) {
        return (
          (e && this.vars.runBackwards) || (this._startAt = 0),
          (this._pt = this._op = this._onUpdate = this._lazy = this.ratio = 0),
          (this._ptLookup = []),
          this.timeline && this.timeline.invalidate(e),
          t.prototype.invalidate.call(this, e)
        );
      }),
      (r.resetTo = function (t, e, r, i, n) {
        (tP || r_.wake(), this._ts || this.play());
        var a = Math.min(this._dur, (this._dp._time - this._start) * this._ts);
        return (this._initted || rV(this, a),
        rX(this, t, e, r, i, this._ease(a / this._dur), a, n))
          ? this.resetTo(t, e, r, i, 1)
          : (eD(this, 0),
            this.parent ||
              ej(
                this._dp,
                this,
                "_first",
                "_last",
                this._dp._sort ? "_start" : 0,
              ),
            this.render(0));
      }),
      (r.kill = function (t, e) {
        if ((void 0 === e && (e = "all"), !t && (!e || "all" === e)))
          return (
            (this._lazy = this._pt = 0),
            this.parent
              ? ro(this)
              : this.scrollTrigger && this.scrollTrigger.kill(!!tb),
            this
          );
        if (this.timeline) {
          var r = this.timeline.totalDuration();
          return (
            this.timeline.killTweensOf(t, e, r$ && !0 !== r$.vars.overwrite)
              ._first || ro(this),
            this.parent &&
              r !== this.timeline.totalDuration() &&
              eK(this, (this._dur * this.timeline._tDur) / r, 0, 1),
            this
          );
        }
        var i,
          n,
          a,
          s,
          l,
          o,
          u,
          h = this._targets,
          d = t ? e6(t) : h,
          c = this._ptLookup,
          p = this._pt;
        if ((!e || "all" === e) && eP(h, d))
          return ("all" === e && (this._pt = 0), ro(this));
        for (
          i = this._op = this._op || [],
            "all" !== e &&
              (tB(e) &&
                ((l = {}),
                em(e, function (t) {
                  return (l[t] = 1);
                }),
                (e = l)),
              (e = rY(h, e))),
            u = h.length;
          u--;

        )
          if (~d.indexOf(h[u]))
            for (l in ((n = c[u]),
            "all" === e
              ? ((i[u] = e), (s = n), (a = {}))
              : ((a = i[u] = i[u] || {}), (s = e)),
            s))
              ((o = n && n[l]) &&
                (("kill" in o.d && !0 !== o.d.kill(l)) || eO(this, o, "_pt"),
                delete n[l]),
                "all" !== a && (a[l] = 1));
        return (this._initted && !this._pt && p && ro(this), this);
      }),
      (e.to = function (t, r) {
        return new e(t, r, arguments[2]);
      }),
      (e.from = function (t, e) {
        return e0(1, arguments);
      }),
      (e.delayedCall = function (t, r, i, n) {
        return new e(r, 0, {
          immediateRender: !1,
          lazy: !1,
          overwrite: !1,
          delay: t,
          onComplete: r,
          onReverseComplete: r,
          onCompleteParams: i,
          onReverseCompleteParams: i,
          callbackScope: n,
        });
      }),
      (e.fromTo = function (t, e, r) {
        return e0(2, arguments);
      }),
      (e.set = function (t, r) {
        return ((r.duration = 0), r.repeatDelay || (r.repeat = 0), new e(t, r));
      }),
      (e.killTweensOf = function (t, e, r) {
        return tM.killTweensOf(t, e, r);
      }),
      e
    );
  })(rR);
  (ek(rZ.prototype, {
    _targets: [],
    _lazy: 0,
    _startAt: 0,
    _op: 0,
    _onInit: 0,
  }),
    em("staggerTo,staggerFrom,staggerFromTo", function (t) {
      rZ[t] = function () {
        var e = new rE(),
          r = e4.call(arguments, 0);
        return (
          r.splice("staggerFromTo" === t ? 5 : 4, 0, 0),
          e[t].apply(e, r)
        );
      };
    }));
  var r0 = function (t, e, r) {
      return (t[e] = r);
    },
    r1 = function (t, e, r) {
      return t[e](r);
    },
    r2 = function (t, e, r, i) {
      return t[e](i.fp, r);
    },
    r5 = function (t, e, r) {
      return t.setAttribute(e, r);
    },
    r4 = function (t, e) {
      return t$(t[e]) ? r1 : tL(t[e]) && t.setAttribute ? r5 : r0;
    },
    r3 = function (t, e) {
      return e.set(e.t, e.p, Math.round((e.s + e.c * t) * 1e6) / 1e6, e);
    },
    r6 = function (t, e) {
      return e.set(e.t, e.p, !!(e.s + e.c * t), e);
    },
    r8 = function (t, e) {
      var r = e._pt,
        i = "";
      if (!t && e.b) i = e.b;
      else if (1 === t && e.e) i = e.e;
      else {
        for (; r; )
          ((i =
            r.p +
            (r.m
              ? r.m(r.s + r.c * t)
              : Math.round((r.s + r.c * t) * 1e4) / 1e4) +
            i),
            (r = r._next));
        i += e.c;
      }
      e.set(e.t, e.p, i, e);
    },
    r7 = function (t, e) {
      for (var r = e._pt; r; ) (r.r(t, r.d), (r = r._next));
    },
    r9 = function (t, e, r, i) {
      for (var n, a = this._pt; a; )
        ((n = a._next), a.p === i && a.modifier(t, e, r), (a = n));
    },
    it = function (t) {
      for (var e, r, i = this._pt; i; )
        ((r = i._next),
          (i.p !== t || i.op) && i.op !== t
            ? i.dep || (e = 1)
            : eO(this, i, "_pt"),
          (i = r));
      return !e;
    },
    ie = function (t, e, r, i) {
      i.mSet(t, e, i.m.call(i.tween, r, i.mt), i);
    },
    ir = function (t) {
      for (var e, r, i, n, a = t._pt; a; ) {
        for (e = a._next, r = i; r && r.pr > a.pr; ) r = r._next;
        ((a._prev = r ? r._prev : n) ? (a._prev._next = a) : (i = a),
          (a._next = r) ? (r._prev = a) : (n = a),
          (a = e));
      }
      t._pt = i;
    },
    ii = (function () {
      function t(t, e, r, i, n, a, s, l, o) {
        ((this.t = e),
          (this.s = i),
          (this.c = n),
          (this.p = r),
          (this.r = a || r3),
          (this.d = s || this),
          (this.set = l || r0),
          (this.pr = o || 0),
          (this._next = t),
          t && (t._prev = this));
      }
      return (
        (t.prototype.modifier = function (t, e, r) {
          ((this.mSet = this.mSet || this.set),
            (this.set = ie),
            (this.m = t),
            (this.mt = r),
            (this.tween = e));
        }),
        t
      );
    })();
  (em(
    ed +
      "parent,duration,ease,delay,overwrite,runBackwards,startAt,yoyo,immediateRender,repeat,repeatDelay,data,paused,reversed,lazy,callbackScope,stringFilter,id,yoyoEase,stagger,inherit,repeatRefresh,keyframes,autoRevert,scrollTrigger,easeReverse",
    function (t) {
      return (en[t] = 1);
    },
  ),
    (t4.TweenMax = t4.TweenLite = rZ),
    (t4.TimelineLite = t4.TimelineMax = rE),
    (tM = new rE({
      sortChildren: !1,
      defaults: tO,
      autoRemoveChildren: !0,
      id: "root",
      smoothChildTiming: !0,
    })),
    (tj.stringFilter = rx));
  var ia = [],
    is = {},
    il = [],
    io = 0,
    iu = 0,
    ih = function (t) {
      return (is[t] || il).map(function (t) {
        return t();
      });
    },
    id = function () {
      var t = Date.now(),
        e = [];
      t - io > 2 &&
        (ih("matchMediaInit"),
        ia.forEach(function (t) {
          var r,
            i,
            n,
            a,
            s = t.queries,
            l = t.conditions;
          for (i in s)
            ((r = tT.matchMedia(s[i]).matches) && (n = 1),
              r !== l[i] && ((l[i] = r), (a = 1)));
          a && (t.revert(), n && e.push(t));
        }),
        ih("matchMediaRevert"),
        e.forEach(function (t) {
          return t.onMatch(t, function (e) {
            return t.add(null, e);
          });
        }),
        (io = t),
        ih("matchMedia"));
    },
    ic = (function () {
      function t(t, e) {
        ((this.selector = e && e8(e)),
          (this.data = []),
          (this._r = []),
          (this.isReverted = !1),
          (this.id = iu++),
          t && this.add(t));
      }
      var e = t.prototype;
      return (
        (e.add = function (t, e, r) {
          t$(t) && ((r = e), (e = t), (t = t$));
          var i = this,
            n = function () {
              var t,
                n = tw,
                a = i.selector;
              return (
                n && n !== i && n.data.push(i),
                r && (i.selector = e8(r)),
                (tw = i),
                (t = e.apply(i, arguments)),
                t$(t) && i._r.push(t),
                (tw = n),
                (i.selector = a),
                (i.isReverted = !1),
                t
              );
            };
          return (
            (i.last = n),
            t === t$
              ? n(i, function (t) {
                  return i.add(null, t);
                })
              : t
                ? (i[t] = n)
                : n
          );
        }),
        (e.ignore = function (t) {
          var e = tw;
          ((tw = null), t(this), (tw = e));
        }),
        (e.getTweens = function () {
          var e = [];
          return (
            this.data.forEach(function (r) {
              return r instanceof t
                ? e.push.apply(e, r.getTweens())
                : r instanceof rZ &&
                    !(r.parent && "nested" === r.parent.data) &&
                    e.push(r);
            }),
            e
          );
        }),
        (e.clear = function () {
          this._r.length = this.data.length = 0;
        }),
        (e.kill = function (t, e) {
          var r = this;
          if (t) {
            for (var i, n = r.getTweens(), a = r.data.length; a--; )
              "isFlip" === (i = r.data[a]).data &&
                (i.revert(),
                i.getChildren(!0, !0, !1).forEach(function (t) {
                  return n.splice(n.indexOf(t), 1);
                }));
            for (
              n
                .map(function (t) {
                  return {
                    g:
                      t._dur ||
                      t._delay ||
                      (t._sat && !t._sat.vars.immediateRender)
                        ? t.globalTime(0)
                        : -1 / 0,
                    t: t,
                  };
                })
                .sort(function (t, e) {
                  return e.g - t.g || -1 / 0;
                })
                .forEach(function (e) {
                  return e.t.revert(t);
                }),
                a = r.data.length;
              a--;

            )
              (i = r.data[a]) instanceof rE
                ? "nested" !== i.data &&
                  (i.scrollTrigger && i.scrollTrigger.revert(), i.kill())
                : i instanceof rZ || !i.revert || i.revert(t);
            (r._r.forEach(function (e) {
              return e(t, r);
            }),
              (r.isReverted = !0));
          } else
            this.data.forEach(function (t) {
              return t.kill && t.kill();
            });
          if ((this.clear(), e))
            for (var s = ia.length; s--; )
              ia[s].id === this.id && ia.splice(s, 1);
        }),
        (e.revert = function (t) {
          this.kill(t || {});
        }),
        t
      );
    })(),
    ip = (function () {
      function t(t) {
        ((this.contexts = []), (this.scope = t), tw && tw.data.push(this));
      }
      var e = t.prototype;
      return (
        (e.add = function (t, e, r) {
          tW(t) || (t = { matches: t });
          var i,
            n,
            a,
            s = new ic(0, r || this.scope),
            l = (s.conditions = {});
          for (n in (tw && !s.selector && (s.selector = tw.selector),
          this.contexts.push(s),
          (e = s.add("onMatch", e)),
          (s.queries = t),
          t))
            "all" === n
              ? (a = 1)
              : (i = tT.matchMedia(t[n])) &&
                (0 > ia.indexOf(s) && ia.push(s),
                (l[n] = i.matches) && (a = 1),
                i.addListener
                  ? i.addListener(id)
                  : i.addEventListener("change", id));
          return (
            a &&
              e(s, function (t) {
                return s.add(null, t);
              }),
            this
          );
        }),
        (e.revert = function (t) {
          this.kill(t || {});
        }),
        (e.kill = function (t) {
          this.contexts.forEach(function (e) {
            return e.kill(t, !0);
          });
        }),
        t
      );
    })(),
    im = {
      registerPlugin: function () {
        for (var t = arguments.length, e = Array(t), r = 0; r < t; r++)
          e[r] = arguments[r];
        e.forEach(function (t) {
          return rh(t);
        });
      },
      timeline: function (t) {
        return new rE(t);
      },
      getTweensOf: function (t, e) {
        return tM.getTweensOf(t, e);
      },
      getProperty: function (t, e, r, i) {
        tB(t) && (t = e6(t)[0]);
        var n = ep(t || {}).get,
          a = r ? eT : eM;
        return (
          "native" === r && (r = ""),
          t
            ? e
              ? a(((el[e] && el[e].get) || n)(t, e, r, i))
              : function (e, r, i) {
                  return a(((el[e] && el[e].get) || n)(t, e, r, i));
                }
            : t
        );
      },
      quickSetter: function (t, e, r) {
        if ((t = e6(t)).length > 1) {
          var i = t.map(function (t) {
              return i_.quickSetter(t, e, r);
            }),
            n = i.length;
          return function (t) {
            for (var e = n; e--; ) i[e](t);
          };
        }
        t = t[0] || {};
        var a = el[e],
          s = ep(t),
          l = (s.harness && (s.harness.aliases || {})[e]) || e,
          o = a
            ? function (e) {
                var i = new a();
                ((tC._pt = 0),
                  i.init(t, r ? e + r : e, tC, 0, [t]),
                  i.render(1, i),
                  tC._pt && r7(1, tC));
              }
            : s.set(t, l);
        return a
          ? o
          : function (e) {
              return o(t, l, r ? e + r : e, s, 1);
            };
      },
      quickTo: function (t, e, r) {
        var i,
          n = i_.to(
            t,
            ek(
              (((i = {})[e] = "+=0.1"), (i.paused = !0), (i.stagger = 0), i),
              r || {},
            ),
          ),
          a = function (t, r, i) {
            return n.resetTo(e, t, r, i);
          };
        return ((a.tween = n), a);
      },
      isTweening: function (t) {
        return tM.getTweensOf(t, !0).length > 0;
      },
      defaults: function (t) {
        return (t && t.ease && (t.ease = rF(t.ease, tO.ease)), eA(tO, t || {}));
      },
      config: function (t) {
        return eA(tj, t || {});
      },
      registerEffect: function (t) {
        var e = t.name,
          r = t.effect,
          i = t.plugins,
          n = t.defaults,
          a = t.extendTimeline;
        ((i || "").split(",").forEach(function (t) {
          return (
            t &&
            !el[t] &&
            !t4[t] &&
            t7(e + " effect requires " + t + " plugin.")
          );
        }),
          (eo[e] = function (t, e, i) {
            return r(e6(t), ek(e || {}, n), i);
          }),
          a &&
            (rE.prototype[e] = function (t, r, i) {
              return this.add(eo[e](t, tW(r) ? r : (i = r) && {}, this), i);
            }));
      },
      registerEase: function (t, e) {
        rb[t] = rF(e);
      },
      parseEase: function (t, e) {
        return arguments.length ? rF(t, e) : rb;
      },
      getById: function (t) {
        return tM.getById(t);
      },
      exportRoot: function (t, e) {
        void 0 === t && (t = {});
        var r,
          i,
          n = new rE(t);
        for (
          n.smoothChildTiming = tq(t.smoothChildTiming),
            tM.remove(n),
            n._dp = 0,
            n._time = n._tTime = tM._time,
            r = tM._first;
          r;

        )
          ((i = r._next),
            (e ||
              !(
                !r._dur &&
                r instanceof rZ &&
                r.vars.onComplete === r._targets[0]
              )) &&
              eW(n, r, r._start - r._delay),
            (r = i));
        return (eW(tM, n, 0), n);
      },
      context: function (t, e) {
        return t ? new ic(t, e) : tw;
      },
      matchMedia: function (t) {
        return new ip(t);
      },
      matchMediaRefresh: function () {
        return (
          ia.forEach(function (t) {
            var e,
              r,
              i = t.conditions;
            for (r in i) i[r] && ((i[r] = !1), (e = 1));
            e && t.revert();
          }) || id()
        );
      },
      addEventListener: function (t, e) {
        var r = is[t] || (is[t] = []);
        ~r.indexOf(e) || r.push(e);
      },
      removeEventListener: function (t, e) {
        var r = is[t],
          i = r && r.indexOf(e);
        i >= 0 && r.splice(i, 1);
      },
      utils: {
        wrap: function t(e, r, i) {
          var n = r - e;
          return tY(e)
            ? ri(e, t(0, e.length), r)
            : e1(i, function (t) {
                return ((n + ((t - e) % n)) % n) + e;
              });
        },
        wrapYoyo: function t(e, r, i) {
          var n = r - e,
            a = 2 * n;
          return tY(e)
            ? ri(e, t(0, e.length - 1), r)
            : e1(i, function (t) {
                return (
                  (t = (a + ((t - e) % a)) % a || 0),
                  e + (t > n ? a - t : t)
                );
              });
        },
        distribute: e9,
        random: rr,
        snap: re,
        normalize: function (t, e, r) {
          return ra(t, e, 0, 1, r);
        },
        getUnit: e5,
        clamp: function (t, e, r) {
          return e1(r, function (r) {
            return e2(t, e, r);
          });
        },
        splitColor: rp,
        toArray: e6,
        selector: e8,
        mapRange: ra,
        pipe: function () {
          for (var t = arguments.length, e = Array(t), r = 0; r < t; r++)
            e[r] = arguments[r];
          return function (t) {
            return e.reduce(function (t, e) {
              return e(t);
            }, t);
          };
        },
        unitize: function (t, e) {
          return function (r) {
            return t(parseFloat(r)) + (e || e5(r));
          };
        },
        interpolate: function t(e, r, i, n) {
          var a = isNaN(e + r)
            ? 0
            : function (t) {
                return (1 - t) * e + t * r;
              };
          if (!a) {
            var s,
              l,
              o,
              u,
              h,
              d = tB(e),
              c = {};
            if ((!0 === i && (n = 1) && (i = null), d))
              ((e = { p: e }), (r = { p: r }));
            else if (tY(e) && !tY(r)) {
              for (o = [], h = (u = e.length) - 2, l = 1; l < u; l++)
                o.push(t(e[l - 1], e[l]));
              (u--,
                (a = function (t) {
                  var e = Math.min(h, ~~(t *= u));
                  return o[e](t - e);
                }),
                (i = r));
            } else n || (e = eS(tY(e) ? [] : {}, e));
            if (!o) {
              for (s in r) rW.call(c, e, s, "get", r[s]);
              a = function (t) {
                return r7(t, c) || (d ? e.p : e);
              };
            }
          }
          return e1(i, a);
        },
        shuffle: e7,
      },
      install: t6,
      effects: eo,
      ticker: r_,
      updateRoot: rE.updateRoot,
      plugins: el,
      globalTimeline: tM,
      core: {
        PropTween: ii,
        globals: t9,
        Tween: rZ,
        Timeline: rE,
        Animation: rR,
        getCache: ep,
        _removeLinkedListItem: eO,
        reverting: function () {
          return tb;
        },
        context: function (t) {
          return (t && tw && (tw.data.push(t), (t._ctx = tw)), tw);
        },
        suppressOverwrites: function (t) {
          return (tv = t);
        },
      },
    };
  (em("to,from,fromTo,delayedCall,set,killTweensOf", function (t) {
    return (im[t] = rZ[t]);
  }),
    r_.add(rE.updateRoot),
    (tC = im.to({}, { duration: 0 })));
  var ig = function (t, e) {
      for (var r = t._pt; r && r.p !== e && r.op !== e && r.fp !== e; )
        r = r._next;
      return r;
    },
    iy = function (t, e) {
      var r,
        i,
        n,
        a = t._targets;
      for (r in e)
        for (i = a.length; i--; )
          (n = t._ptLookup[i][r]) &&
            (n = n.d) &&
            (n._pt && (n = ig(n, r)),
            n && n.modifier && n.modifier(e[r], t, a[i], r));
    },
    ix = function (t, e) {
      return {
        name: t,
        headless: 1,
        rawVars: 1,
        init: function (t, r, i) {
          i._onInit = function (t) {
            var i, n;
            if (
              (tB(r) &&
                ((i = {}),
                em(r, function (t) {
                  return (i[t] = 1);
                }),
                (r = i)),
              e)
            ) {
              for (n in ((i = {}), r)) i[n] = e(r[n]);
              r = i;
            }
            iy(t, r);
          };
        },
      };
    },
    i_ =
      im.registerPlugin(
        {
          name: "attr",
          init: function (t, e, r, i, n) {
            var a, s, l;
            for (a in ((this.tween = r), e))
              ((l = t.getAttribute(a) || ""),
                ((s = this.add(
                  t,
                  "setAttribute",
                  (l || 0) + "",
                  e[a],
                  i,
                  n,
                  0,
                  0,
                  a,
                )).op = a),
                (s.b = l),
                this._props.push(a));
          },
          render: function (t, e) {
            for (var r = e._pt; r; )
              (tb ? r.set(r.t, r.p, r.b, r) : r.r(t, r.d), (r = r._next));
          },
        },
        {
          name: "endArray",
          headless: 1,
          init: function (t, e) {
            for (var r = e.length; r--; )
              this.add(t, r, t[r] || 0, e[r], 0, 0, 0, 0, 0, 1);
          },
        },
        ix("roundProps", rt),
        ix("modifiers"),
        ix("snap", re),
      ) || im;
  ((rZ.version = rE.version = i_.version = "3.15.0"),
    (tA = 1),
    tG() && rv(),
    rb.Power0,
    rb.Power1,
    rb.Power2,
    rb.Power3,
    rb.Power4,
    rb.Linear,
    rb.Quad,
    rb.Cubic,
    rb.Quart,
    rb.Quint,
    rb.Strong,
    rb.Elastic,
    rb.Back,
    rb.SteppedEase,
    rb.Bounce,
    rb.Sine,
    rb.Expo,
    rb.Circ);
  var iv,
    ib,
    iw,
    iM,
    iT,
    ik,
    iS,
    iA = {},
    iF = 180 / Math.PI,
    iC = Math.PI / 180,
    iP = Math.atan2,
    ij = /([A-Z])/g,
    iO = /(left|right|width|margin|padding|x)/i,
    iU = /[\s,\(]\S/,
    iR = {
      autoAlpha: "opacity,visibility",
      scale: "scaleX,scaleY",
      alpha: "opacity",
    },
    iE = function (t, e) {
      return e.set(e.t, e.p, Math.round((e.s + e.c * t) * 1e4) / 1e4 + e.u, e);
    },
    iz = function (t, e) {
      return e.set(
        e.t,
        e.p,
        1 === t ? e.e : Math.round((e.s + e.c * t) * 1e4) / 1e4 + e.u,
        e,
      );
    },
    iN = function (t, e) {
      return e.set(
        e.t,
        e.p,
        t ? Math.round((e.s + e.c * t) * 1e4) / 1e4 + e.u : e.b,
        e,
      );
    },
    iI = function (t, e) {
      return e.set(
        e.t,
        e.p,
        1 === t ? e.e : t ? Math.round((e.s + e.c * t) * 1e4) / 1e4 + e.u : e.b,
        e,
      );
    },
    iB = function (t, e) {
      var r = e.s + e.c * t;
      e.set(e.t, e.p, ~~(r + (r < 0 ? -0.5 : 0.5)) + e.u, e);
    },
    i$ = function (t, e) {
      return e.set(e.t, e.p, t ? e.e : e.b, e);
    },
    iD = function (t, e) {
      return e.set(e.t, e.p, 1 !== t ? e.b : e.e, e);
    },
    iL = function (t, e, r) {
      return (t.style[e] = r);
    },
    iW = function (t, e, r) {
      return t.style.setProperty(e, r);
    },
    iq = function (t, e, r) {
      return (t._gsap[e] = r);
    },
    iG = function (t, e, r) {
      return (t._gsap.scaleX = t._gsap.scaleY = r);
    },
    iV = function (t, e, r, i, n) {
      var a = t._gsap;
      ((a.scaleX = a.scaleY = r), a.renderTransform(n, a));
    },
    iX = function (t, e, r, i, n) {
      var a = t._gsap;
      ((a[e] = r), a.renderTransform(n, a));
    },
    iY = "transform",
    iH = iY + "Origin",
    iK = function t(e, r) {
      var i = this,
        n = this.target,
        a = n.style,
        s = n._gsap;
      if (e in iA && a) {
        if (((this.tfm = this.tfm || {}), "transform" === e))
          return iR.transform.split(",").forEach(function (e) {
            return t.call(i, e, r);
          });
        if (
          (~(e = iR[e] || e).indexOf(",")
            ? e.split(",").forEach(function (t) {
                return (i.tfm[t] = nn(n, t));
              })
            : (this.tfm[e] = s.x ? s[e] : nn(n, e)),
          e === iH && (this.tfm.zOrigin = s.zOrigin),
          this.props.indexOf(iY) >= 0)
        )
          return;
        (s.svg &&
          ((this.svgo = n.getAttribute("data-svg-origin")),
          this.props.push(iH, r, "")),
          (e = iY));
      }
      (a || r) && this.props.push(e, r, a[e]);
    },
    iQ = function (t) {
      t.translate &&
        (t.removeProperty("translate"),
        t.removeProperty("scale"),
        t.removeProperty("rotate"));
    },
    iJ = function () {
      var t,
        e,
        r = this.props,
        i = this.target,
        n = i.style,
        a = i._gsap;
      for (t = 0; t < r.length; t += 3)
        r[t + 1]
          ? 2 === r[t + 1]
            ? i[r[t]](r[t + 2])
            : (i[r[t]] = r[t + 2])
          : r[t + 2]
            ? (n[r[t]] = r[t + 2])
            : n.removeProperty(
                "--" === r[t].substr(0, 2)
                  ? r[t]
                  : r[t].replace(ij, "-$1").toLowerCase(),
              );
      if (this.tfm) {
        for (e in this.tfm) a[e] = this.tfm[e];
        (a.svg &&
          (a.renderTransform(),
          i.setAttribute("data-svg-origin", this.svgo || "")),
          ((t = ik()) && t.isStart) ||
            n[iY] ||
            (iQ(n),
            a.zOrigin &&
              n[iH] &&
              ((n[iH] += " " + a.zOrigin + "px"),
              (a.zOrigin = 0),
              a.renderTransform()),
            (a.uncache = 1)));
      }
    },
    iZ = function (t, e) {
      var r = { target: t, props: [], revert: iJ, save: iK };
      return (
        t._gsap || i_.core.getCache(t),
        e &&
          t.style &&
          t.nodeType &&
          e.split(",").forEach(function (t) {
            return r.save(t);
          }),
        r
      );
    },
    i0 = function (t, e) {
      var r = iv.createElementNS
        ? iv.createElementNS(
            (e || "http://www.w3.org/1999/xhtml").replace(/^https/, "http"),
            t,
          )
        : iv.createElement(t);
      return r && r.style ? r : iv.createElement(t);
    },
    i1 = function t(e, r, i) {
      var n = getComputedStyle(e);
      return (
        n[r] ||
        n.getPropertyValue(r.replace(ij, "-$1").toLowerCase()) ||
        n.getPropertyValue(r) ||
        (!i && t(e, i5(r) || r, 1)) ||
        ""
      );
    },
    i2 = "O,Moz,ms,Ms,Webkit".split(","),
    i5 = function (t, e, r) {
      var i = (e || iM).style,
        n = 5;
      if (t in i && !r) return t;
      for (
        t = t.charAt(0).toUpperCase() + t.substr(1);
        n-- && !(i2[n] + t in i);

      );
      return n < 0 ? null : (3 === n ? "ms" : n >= 0 ? i2[n] : "") + t;
    },
    i4 = function () {
      "u" > typeof window &&
        window.document &&
        ((ib = (iv = window.document).documentElement),
        (iM = i0("div") || { style: {} }),
        i0("div"),
        (iH = (iY = i5(iY)) + "Origin"),
        (iM.style.cssText =
          "border-width:0;line-height:0;position:absolute;padding:0"),
        (iS = !!i5("perspective")),
        (ik = i_.core.reverting),
        (iw = 1));
    },
    i3 = function (t) {
      var e,
        r = t.ownerSVGElement,
        i = i0(
          "svg",
          (r && r.getAttribute("xmlns")) || "http://www.w3.org/2000/svg",
        ),
        n = t.cloneNode(!0);
      ((n.style.display = "block"), i.appendChild(n), ib.appendChild(i));
      try {
        e = n.getBBox();
      } catch (t) {}
      return (i.removeChild(n), ib.removeChild(i), e);
    },
    i6 = function (t, e) {
      for (var r = e.length; r--; )
        if (t.hasAttribute(e[r])) return t.getAttribute(e[r]);
    },
    i8 = function (t) {
      var e, r;
      try {
        e = t.getBBox();
      } catch (i) {
        ((e = i3(t)), (r = 1));
      }
      return (
        (e && (e.width || e.height)) || r || (e = i3(t)),
        !e || e.width || e.x || e.y
          ? e
          : {
              x: +i6(t, ["x", "cx", "x1"]) || 0,
              y: +i6(t, ["y", "cy", "y1"]) || 0,
              width: 0,
              height: 0,
            }
      );
    },
    i7 = function (t) {
      return !!(t.getCTM && (!t.parentNode || t.ownerSVGElement) && i8(t));
    },
    i9 = function (t, e) {
      if (e) {
        var r,
          i = t.style;
        (e in iA && e !== iH && (e = iY),
          i.removeProperty
            ? (("ms" === (r = e.substr(0, 2)) || "webkit" === e.substr(0, 6)) &&
                (e = "-" + e),
              i.removeProperty(
                "--" === r ? e : e.replace(ij, "-$1").toLowerCase(),
              ))
            : i.removeAttribute(e));
      }
    },
    nt = function (t, e, r, i, n, a) {
      var s = new ii(t._pt, e, r, 0, 1, a ? iD : i$);
      return ((t._pt = s), (s.b = i), (s.e = n), t._props.push(r), s);
    },
    ne = { deg: 1, rad: 1, turn: 1 },
    nr = { grid: 1, flex: 1 },
    ni = function t(e, r, i, n) {
      var a,
        s,
        l,
        o,
        u = parseFloat(i) || 0,
        h = (i + "").trim().substr((u + "").length) || "px",
        d = iM.style,
        c = iO.test(r),
        p = "svg" === e.tagName.toLowerCase(),
        f = (p ? "client" : "offset") + (c ? "Width" : "Height"),
        m = "px" === n,
        g = "%" === n;
      if (n === h || !u || ne[n] || ne[h]) return u;
      if (
        ("px" === h || m || (u = t(e, r, i, "px")),
        (o = e.getCTM && i7(e)),
        (g || "%" === h) && (iA[r] || ~r.indexOf("adius")))
      )
        return (
          (a = o ? e.getBBox()[c ? "width" : "height"] : e[f]),
          eg(g ? (u / a) * 100 : (u / 100) * a)
        );
      if (
        ((d[c ? "width" : "height"] = 100 + (m ? h : n)),
        (s =
          ("rem" !== n && ~r.indexOf("adius")) ||
          ("em" === n && e.appendChild && !p)
            ? e
            : e.parentNode),
        o && (s = (e.ownerSVGElement || {}).parentNode),
        (s && s !== iv && s.appendChild) || (s = iv.body),
        (l = s._gsap) && g && l.width && c && l.time === r_.time && !l.uncache)
      )
        return eg((u / l.width) * 100);
      if (g && ("height" === r || "width" === r)) {
        var y = e.style[r];
        ((e.style[r] = 100 + n), (a = e[f]), y ? (e.style[r] = y) : i9(e, r));
      } else
        ((g || "%" === h) &&
          !nr[i1(s, "display")] &&
          (d.position = i1(e, "position")),
          s === e && (d.position = "static"),
          s.appendChild(iM),
          (a = iM[f]),
          s.removeChild(iM),
          (d.position = "absolute"));
      return (
        c && g && (((l = ep(s)).time = r_.time), (l.width = s[f])),
        eg(m ? (a * u) / 100 : a && u ? (100 / a) * u : 0)
      );
    },
    nn = function (t, e, r, i) {
      var n;
      return (
        iw || i4(),
        e in iR &&
          "transform" !== e &&
          ~(e = iR[e]).indexOf(",") &&
          (e = e.split(",")[0]),
        iA[e] && "transform" !== e
          ? ((n = ng(t, i)),
            (n =
              "transformOrigin" !== e
                ? n[e]
                : n.svg
                  ? n.origin
                  : ny(i1(t, iH)) + " " + n.zOrigin + "px"))
          : (!(n = t.style[e]) ||
              "auto" === n ||
              i ||
              ~(n + "").indexOf("calc(")) &&
            (n =
              (nu[e] && nu[e](t, e, r)) ||
              i1(t, e) ||
              ef(t, e) ||
              +("opacity" === e)),
        r && !~(n + "").trim().indexOf(" ") ? ni(t, e, n, r) + r : n
      );
    },
    na = function (t, e, r, i) {
      if (!r || "none" === r) {
        var n = i5(e, t, 1),
          a = n && i1(t, n, 1);
        a && a !== r
          ? ((e = n), (r = a))
          : "borderColor" === e && (r = i1(t, "borderTopColor"));
      }
      var s,
        l,
        o,
        u,
        h,
        d,
        c,
        p,
        f,
        m,
        g,
        y = new ii(this._pt, t.style, e, 0, 1, r8),
        x = 0,
        _ = 0;
      if (
        ((y.b = r),
        (y.e = i),
        (r += ""),
        "var(--" === (i += "").substring(0, 6) &&
          (i = i1(t, i.substring(4, i.indexOf(")")))),
        "auto" === i &&
          ((d = t.style[e]),
          (t.style[e] = i),
          (i = i1(t, e) || i),
          d ? (t.style[e] = d) : i9(t, e)),
        rx((s = [r, i])),
        (r = s[0]),
        (i = s[1]),
        (o = r.match(tZ) || []),
        (i.match(tZ) || []).length)
      ) {
        for (; (l = tZ.exec(i)); )
          ((c = l[0]),
            (f = i.substring(x, l.index)),
            h
              ? (h = (h + 1) % 5)
              : ("rgba(" === f.substr(-5) || "hsla(" === f.substr(-5)) &&
                (h = 1),
            c !== (d = o[_++] || "") &&
              ((u = parseFloat(d) || 0),
              (g = d.substr((u + "").length)),
              "=" === c.charAt(1) && (c = ex(u, c) + g),
              (p = parseFloat(c)),
              (m = c.substr((p + "").length)),
              (x = tZ.lastIndex - m.length),
              m ||
                ((m = m || tj.units[e] || g),
                x === i.length && ((i += m), (y.e += m))),
              g !== m && (u = ni(t, e, d, m) || 0),
              (y._pt = {
                _next: y._pt,
                p: f || 1 === _ ? f : ",",
                s: u,
                c: p - u,
                m: (h && h < 4) || "zIndex" === e ? Math.round : 0,
              })));
        y.c = x < i.length ? i.substring(x, i.length) : "";
      } else y.r = "display" === e && "none" === i ? iD : i$;
      return (t1.test(i) && (y.e = 0), (this._pt = y), y);
    },
    ns = {
      top: "0%",
      bottom: "100%",
      left: "0%",
      right: "100%",
      center: "50%",
    },
    nl = function (t) {
      var e = t.split(" "),
        r = e[0],
        i = e[1] || "50%";
      return (
        ("top" === r || "bottom" === r || "left" === i || "right" === i) &&
          ((t = r), (r = i), (i = t)),
        (e[0] = ns[r] || r),
        (e[1] = ns[i] || i),
        e.join(" ")
      );
    },
    no = function (t, e) {
      if (e.tween && e.tween._time === e.tween._dur) {
        var r,
          i,
          n,
          a = e.t,
          s = a.style,
          l = e.u,
          o = a._gsap;
        if ("all" === l || !0 === l) ((s.cssText = ""), (i = 1));
        else
          for (n = (l = l.split(",")).length; --n > -1; )
            (iA[(r = l[n])] &&
              ((i = 1), (r = "transformOrigin" === r ? iH : iY)),
              i9(a, r));
        i &&
          (i9(a, iY),
          o &&
            (o.svg && a.removeAttribute("transform"),
            (s.scale = s.rotate = s.translate = "none"),
            ng(a, 1),
            (o.uncache = 1),
            iQ(s)));
      }
    },
    nu = {
      clearProps: function (t, e, r, i, n) {
        if ("isFromStart" !== n.data) {
          var a = (t._pt = new ii(t._pt, e, r, 0, 0, no));
          return ((a.u = i), (a.pr = -10), (a.tween = n), t._props.push(r), 1);
        }
      },
    },
    nh = [1, 0, 0, 1, 0, 0],
    nd = {},
    nc = function (t) {
      return "matrix(1, 0, 0, 1, 0, 0)" === t || "none" === t || !t;
    },
    np = function (t) {
      var e = i1(t, iY);
      return nc(e) ? nh : e.substr(7).match(tJ).map(eg);
    },
    nf = function (t, e) {
      var r,
        i,
        n,
        a,
        s = t._gsap || ep(t),
        l = t.style,
        o = np(t);
      return s.svg && t.getAttribute("transform")
        ? "1,0,0,1,0,0" ===
          (o = [
            (n = t.transform.baseVal.consolidate().matrix).a,
            n.b,
            n.c,
            n.d,
            n.e,
            n.f,
          ]).join(",")
          ? nh
          : o
        : (o !== nh ||
            t.offsetParent ||
            t === ib ||
            s.svg ||
            ((n = l.display),
            (l.display = "block"),
            ((r = t.parentNode) &&
              (t.offsetParent || t.getBoundingClientRect().width)) ||
              ((a = 1), (i = t.nextElementSibling), ib.appendChild(t)),
            (o = np(t)),
            n ? (l.display = n) : i9(t, "display"),
            a &&
              (i
                ? r.insertBefore(t, i)
                : r
                  ? r.appendChild(t)
                  : ib.removeChild(t))),
          e && o.length > 6 ? [o[0], o[1], o[4], o[5], o[12], o[13]] : o);
    },
    nm = function (t, e, r, i, n, a) {
      var s,
        l,
        o,
        u,
        h = t._gsap,
        d = n || nf(t, !0),
        c = h.xOrigin || 0,
        p = h.yOrigin || 0,
        f = h.xOffset || 0,
        m = h.yOffset || 0,
        g = d[0],
        y = d[1],
        x = d[2],
        _ = d[3],
        v = d[4],
        b = d[5],
        w = e.split(" "),
        M = parseFloat(w[0]) || 0,
        T = parseFloat(w[1]) || 0;
      (r
        ? d !== nh &&
          (l = g * _ - y * x) &&
          ((o = (_ / l) * M + (-x / l) * T + (x * b - _ * v) / l),
          (u = (-y / l) * M + (g / l) * T - (g * b - y * v) / l),
          (M = o),
          (T = u))
        : ((M = (s = i8(t)).x + (~w[0].indexOf("%") ? (M / 100) * s.width : M)),
          (T =
            s.y + (~(w[1] || w[0]).indexOf("%") ? (T / 100) * s.height : T))),
        i || (!1 !== i && h.smooth)
          ? ((h.xOffset = f + ((v = M - c) * g + (b = T - p) * x) - v),
            (h.yOffset = m + (v * y + b * _) - b))
          : (h.xOffset = h.yOffset = 0),
        (h.xOrigin = M),
        (h.yOrigin = T),
        (h.smooth = !!i),
        (h.origin = e),
        (h.originIsAbsolute = !!r),
        (t.style[iH] = "0px 0px"),
        a &&
          (nt(a, h, "xOrigin", c, M),
          nt(a, h, "yOrigin", p, T),
          nt(a, h, "xOffset", f, h.xOffset),
          nt(a, h, "yOffset", m, h.yOffset)),
        t.setAttribute("data-svg-origin", M + " " + T));
    },
    ng = function (t, e) {
      var r = t._gsap || new rU(t);
      if ("x" in r && !e && !r.uncache) return r;
      var i,
        n,
        a,
        s,
        l,
        o,
        u,
        h,
        d,
        c,
        p,
        f,
        m,
        g,
        y,
        x,
        _,
        v,
        b,
        w,
        M,
        T,
        k,
        S,
        A,
        F,
        C,
        P,
        j,
        O,
        U,
        R,
        E = t.style,
        z = r.scaleX < 0,
        N = getComputedStyle(t),
        I = i1(t, iH) || "0";
      return (
        (i = n = a = o = u = h = d = c = p = 0),
        (s = l = 1),
        (r.svg = !!(t.getCTM && i7(t))),
        N.translate &&
          (("none" !== N.translate ||
            "none" !== N.scale ||
            "none" !== N.rotate) &&
            (E[iY] =
              ("none" !== N.translate
                ? "translate3d(" +
                  (N.translate + " 0 0").split(" ").slice(0, 3).join(", ") +
                  ") "
                : "") +
              ("none" !== N.rotate ? "rotate(" + N.rotate + ") " : "") +
              ("none" !== N.scale
                ? "scale(" + N.scale.split(" ").join(",") + ") "
                : "") +
              ("none" !== N[iY] ? N[iY] : "")),
          (E.scale = E.rotate = E.translate = "none")),
        (g = nf(t, r.svg)),
        r.svg &&
          (r.uncache
            ? ((A = t.getBBox()),
              (I = r.xOrigin - A.x + "px " + (r.yOrigin - A.y) + "px"),
              (S = ""))
            : (S = !e && t.getAttribute("data-svg-origin")),
          nm(t, S || I, !!S || r.originIsAbsolute, !1 !== r.smooth, g)),
        (f = r.xOrigin || 0),
        (m = r.yOrigin || 0),
        g !== nh &&
          ((v = g[0]),
          (b = g[1]),
          (w = g[2]),
          (M = g[3]),
          (i = T = g[4]),
          (n = k = g[5]),
          6 === g.length
            ? ((s = Math.sqrt(v * v + b * b)),
              (l = Math.sqrt(M * M + w * w)),
              (o = v || b ? iP(b, v) * iF : 0),
              (d = w || M ? iP(w, M) * iF + o : 0) &&
                (l *= Math.abs(Math.cos(d * iC))),
              r.svg && ((i -= f - (f * v + m * w)), (n -= m - (f * b + m * M))))
            : ((R = g[6]),
              (O = g[7]),
              (C = g[8]),
              (P = g[9]),
              (j = g[10]),
              (U = g[11]),
              (i = g[12]),
              (n = g[13]),
              (a = g[14]),
              (u = (y = iP(R, j)) * iF),
              y &&
                ((S = T * (x = Math.cos(-y)) + C * (_ = Math.sin(-y))),
                (A = k * x + P * _),
                (F = R * x + j * _),
                (C = -(T * _) + C * x),
                (P = -(k * _) + P * x),
                (j = -(R * _) + j * x),
                (U = -(O * _) + U * x),
                (T = S),
                (k = A),
                (R = F)),
              (h = (y = iP(-w, j)) * iF),
              y &&
                ((S = v * (x = Math.cos(-y)) - C * (_ = Math.sin(-y))),
                (A = b * x - P * _),
                (F = w * x - j * _),
                (U = M * _ + U * x),
                (v = S),
                (b = A),
                (w = F)),
              (o = (y = iP(b, v)) * iF),
              y &&
                ((S = v * (x = Math.cos(y)) + b * (_ = Math.sin(y))),
                (A = T * x + k * _),
                (b = b * x - v * _),
                (k = k * x - T * _),
                (v = S),
                (T = A)),
              u &&
                Math.abs(u) + Math.abs(o) > 359.9 &&
                ((u = o = 0), (h = 180 - h)),
              (s = eg(Math.sqrt(v * v + b * b + w * w))),
              (l = eg(Math.sqrt(k * k + R * R))),
              (d = Math.abs((y = iP(T, k))) > 2e-4 ? y * iF : 0),
              (p = U ? 1 / (U < 0 ? -U : U) : 0)),
          r.svg &&
            ((S = t.getAttribute("transform")),
            (r.forceCSS = t.setAttribute("transform", "") || !nc(i1(t, iY))),
            S && t.setAttribute("transform", S))),
        Math.abs(d) > 90 &&
          270 > Math.abs(d) &&
          (z
            ? ((s *= -1),
              (d += o <= 0 ? 180 : -180),
              (o += o <= 0 ? 180 : -180))
            : ((l *= -1), (d += d <= 0 ? 180 : -180))),
        (e = e || r.uncache),
        (r.x =
          i -
          ((r.xPercent =
            i &&
            ((!e && r.xPercent) ||
              (Math.round(t.offsetWidth / 2) === Math.round(-i) ? -50 : 0)))
            ? (t.offsetWidth * r.xPercent) / 100
            : 0) +
          "px"),
        (r.y =
          n -
          ((r.yPercent =
            n &&
            ((!e && r.yPercent) ||
              (Math.round(t.offsetHeight / 2) === Math.round(-n) ? -50 : 0)))
            ? (t.offsetHeight * r.yPercent) / 100
            : 0) +
          "px"),
        (r.z = a + "px"),
        (r.scaleX = eg(s)),
        (r.scaleY = eg(l)),
        (r.rotation = eg(o) + "deg"),
        (r.rotationX = eg(u) + "deg"),
        (r.rotationY = eg(h) + "deg"),
        (r.skewX = d + "deg"),
        (r.skewY = c + "deg"),
        (r.transformPerspective = p + "px"),
        (r.zOrigin = parseFloat(I.split(" ")[2]) || (!e && r.zOrigin) || 0) &&
          (E[iH] = ny(I)),
        (r.xOffset = r.yOffset = 0),
        (r.force3D = tj.force3D),
        (r.renderTransform = r.svg ? nw : iS ? nb : n_),
        (r.uncache = 0),
        r
      );
    },
    ny = function (t) {
      return (t = t.split(" "))[0] + " " + t[1];
    },
    nx = function (t, e, r) {
      var i = e5(e);
      return eg(parseFloat(e) + parseFloat(ni(t, "x", r + "px", i))) + i;
    },
    n_ = function (t, e) {
      ((e.z = "0px"),
        (e.rotationY = e.rotationX = "0deg"),
        (e.force3D = 0),
        nb(t, e));
    },
    nv = "0deg",
    nb = function (t, e) {
      var r = e || this,
        i = r.xPercent,
        n = r.yPercent,
        a = r.x,
        s = r.y,
        l = r.z,
        o = r.rotation,
        u = r.rotationY,
        h = r.rotationX,
        d = r.skewX,
        c = r.skewY,
        p = r.scaleX,
        f = r.scaleY,
        m = r.transformPerspective,
        g = r.force3D,
        y = r.target,
        x = r.zOrigin,
        _ = "",
        v = ("auto" === g && t && 1 !== t) || !0 === g;
      if (x && (h !== nv || u !== nv)) {
        var b,
          w = parseFloat(u) * iC,
          M = Math.sin(w),
          T = Math.cos(w);
        ((a = nx(y, a, -(M * (b = Math.cos((w = parseFloat(h) * iC))) * x))),
          (s = nx(y, s, -(-Math.sin(w) * x))),
          (l = nx(y, l, -(T * b * x) + x)));
      }
      ("0px" !== m && (_ += "perspective(" + m + ") "),
        (i || n) && (_ += "translate(" + i + "%, " + n + "%) "),
        (v || "0px" !== a || "0px" !== s || "0px" !== l) &&
          (_ +=
            "0px" !== l || v
              ? "translate3d(" + a + ", " + s + ", " + l + ") "
              : "translate(" + a + ", " + s + ") "),
        o !== nv && (_ += "rotate(" + o + ") "),
        u !== nv && (_ += "rotateY(" + u + ") "),
        h !== nv && (_ += "rotateX(" + h + ") "),
        (d !== nv || c !== nv) && (_ += "skew(" + d + ", " + c + ") "),
        (1 !== p || 1 !== f) && (_ += "scale(" + p + ", " + f + ") "),
        (y.style[iY] = _ || "translate(0, 0)"));
    },
    nw = function (t, e) {
      var r,
        i,
        n,
        a,
        s,
        l = e || this,
        o = l.xPercent,
        u = l.yPercent,
        h = l.x,
        d = l.y,
        c = l.rotation,
        p = l.skewX,
        f = l.skewY,
        m = l.scaleX,
        g = l.scaleY,
        y = l.target,
        x = l.xOrigin,
        _ = l.yOrigin,
        v = l.xOffset,
        b = l.yOffset,
        w = l.forceCSS,
        M = parseFloat(h),
        T = parseFloat(d);
      ((c = parseFloat(c)),
        (p = parseFloat(p)),
        (f = parseFloat(f)) && ((p += f = parseFloat(f)), (c += f)),
        c || p
          ? ((c *= iC),
            (p *= iC),
            (r = Math.cos(c) * m),
            (i = Math.sin(c) * m),
            (n = -(Math.sin(c - p) * g)),
            (a = Math.cos(c - p) * g),
            p &&
              ((f *= iC),
              (n *= s = Math.sqrt(1 + (s = Math.tan(p - f)) * s)),
              (a *= s),
              f && ((r *= s = Math.sqrt(1 + (s = Math.tan(f)) * s)), (i *= s))),
            (r = eg(r)),
            (i = eg(i)),
            (n = eg(n)),
            (a = eg(a)))
          : ((r = m), (a = g), (i = n = 0)),
        ((M && !~(h + "").indexOf("px")) || (T && !~(d + "").indexOf("px"))) &&
          ((M = ni(y, "x", h, "px")), (T = ni(y, "y", d, "px"))),
        (x || _ || v || b) &&
          ((M = eg(M + x - (x * r + _ * n) + v)),
          (T = eg(T + _ - (x * i + _ * a) + b))),
        (o || u) &&
          ((M = eg(M + (o / 100) * (s = y.getBBox()).width)),
          (T = eg(T + (u / 100) * s.height))),
        (s =
          "matrix(" +
          r +
          "," +
          i +
          "," +
          n +
          "," +
          a +
          "," +
          M +
          "," +
          T +
          ")"),
        y.setAttribute("transform", s),
        w && (y.style[iY] = s));
    },
    nM = function (t, e, r, i, n) {
      var a,
        s,
        l = tB(n),
        o = parseFloat(n) * (l && ~n.indexOf("rad") ? iF : 1) - i,
        u = i + o + "deg";
      return (
        l &&
          ("short" === (a = n.split("_")[1]) &&
            (o %= 360) != o % 180 &&
            (o += o < 0 ? 360 : -360),
          "cw" === a && o < 0
            ? (o = ((o + 36e9) % 360) - 360 * ~~(o / 360))
            : "ccw" === a &&
              o > 0 &&
              (o = ((o - 36e9) % 360) - 360 * ~~(o / 360))),
        (t._pt = s = new ii(t._pt, e, r, i, o, iz)),
        (s.e = u),
        (s.u = "deg"),
        t._props.push(r),
        s
      );
    },
    nT = function (t, e) {
      for (var r in e) t[r] = e[r];
      return t;
    },
    nk = function (t, e, r) {
      var i,
        n,
        a,
        s,
        l,
        o,
        u,
        h = nT({}, r._gsap),
        d = r.style;
      for (n in (h.svg
        ? ((a = r.getAttribute("transform")),
          r.setAttribute("transform", ""),
          (d[iY] = e),
          (i = ng(r, 1)),
          i9(r, iY),
          r.setAttribute("transform", a))
        : ((a = getComputedStyle(r)[iY]),
          (d[iY] = e),
          (i = ng(r, 1)),
          (d[iY] = a)),
      iA))
        (a = h[n]) !== (s = i[n]) &&
          0 > "perspective,force3D,transformOrigin,svgOrigin".indexOf(n) &&
          ((l = e5(a) !== (u = e5(s)) ? ni(r, n, a, u) : parseFloat(a)),
          (o = parseFloat(s)),
          (t._pt = new ii(t._pt, i, n, l, o - l, iE)),
          (t._pt.u = u || 0),
          t._props.push(n));
      nT(i, h);
    };
  em("padding,margin,Width,Radius", function (t, e) {
    var r = "Right",
      i = "Bottom",
      n = "Left",
      a = (e < 3 ? ["Top", r, i, n] : ["Top" + n, "Top" + r, i + r, i + n]).map(
        function (r) {
          return e < 2 ? t + r : "border" + r + t;
        },
      );
    nu[e > 1 ? "border" + t : t] = function (t, e, r, i, n) {
      var s, l;
      if (arguments.length < 4)
        return 5 ===
          (l = (s = a.map(function (e) {
            return nn(t, e, r);
          })).join(" ")).split(s[0]).length
          ? s[0]
          : l;
      ((s = (i + "").split(" ")),
        (l = {}),
        a.forEach(function (t, e) {
          return (l[t] = s[e] = s[e] || s[((e - 1) / 2) | 0]);
        }),
        t.init(e, l, n));
    };
  });
  var nS = {
    name: "css",
    register: i4,
    targetTest: function (t) {
      return t.style && t.nodeType;
    },
    init: function (t, e, r, i, n) {
      var a,
        s,
        l,
        o,
        u,
        h,
        d,
        c,
        p,
        f,
        m,
        g,
        y,
        x,
        _,
        v,
        b,
        w = this._props,
        M = t.style,
        T = r.vars.startAt;
      for (d in (iw || i4(),
      (this.styles = this.styles || iZ(t)),
      (v = this.styles.props),
      (this.tween = r),
      e))
        if (
          "autoRound" !== d &&
          ((s = e[d]), !(el[d] && rG(d, e, r, i, t, n)))
        ) {
          if (
            ((u = typeof s),
            (h = nu[d]),
            "function" === u && (u = typeof (s = s.call(r, i, t, n))),
            "string" === u && ~s.indexOf("random(") && (s = rn(s)),
            h)
          )
            h(this, t, d, s, r) && (_ = 1);
          else if ("--" === d.substr(0, 2))
            ((a = (getComputedStyle(t).getPropertyValue(d) + "").trim()),
              (s += ""),
              (rg.lastIndex = 0),
              !rg.test(a) &&
                ((c = e5(a)),
                (p = e5(s))
                  ? c !== p && (a = ni(t, d, a, p) + p)
                  : c && (s += c)),
              this.add(M, "setProperty", a, s, i, n, 0, 0, d),
              w.push(d),
              v.push(d, 0, M[d]));
          else if ("undefined" !== u) {
            if (
              (T && d in T
                ? (tB(
                    (a =
                      "function" == typeof T[d] ? T[d].call(r, i, t, n) : T[d]),
                  ) &&
                    ~a.indexOf("random(") &&
                    (a = rn(a)),
                  e5(a + "") ||
                    "auto" === a ||
                    (a += tj.units[d] || e5(nn(t, d)) || ""),
                  "=" === (a + "").charAt(1) && (a = nn(t, d)))
                : (a = nn(t, d)),
              (o = parseFloat(a)),
              (f = "string" === u && "=" === s.charAt(1) && s.substr(0, 2)) &&
                (s = s.substr(2)),
              (l = parseFloat(s)),
              d in iR &&
                ("autoAlpha" === d &&
                  (1 === o && "hidden" === nn(t, "visibility") && l && (o = 0),
                  v.push("visibility", 0, M.visibility),
                  nt(
                    this,
                    M,
                    "visibility",
                    o ? "inherit" : "hidden",
                    l ? "inherit" : "hidden",
                    !l,
                  )),
                "scale" !== d &&
                  "transform" !== d &&
                  ~(d = iR[d]).indexOf(",") &&
                  (d = d.split(",")[0])),
              (m = d in iA))
            ) {
              if (
                (this.styles.save(d),
                (b = s),
                "string" === u && "var(--" === s.substring(0, 6))
              ) {
                if (
                  "calc(" ===
                  (s = i1(t, s.substring(4, s.indexOf(")")))).substring(0, 5)
                ) {
                  var k = t.style.perspective;
                  ((t.style.perspective = s),
                    (s = i1(t, "perspective")),
                    k ? (t.style.perspective = k) : i9(t, "perspective"));
                }
                l = parseFloat(s);
              }
              if (
                (g ||
                  (((y = t._gsap).renderTransform && !e.parseTransform) ||
                    ng(t, e.parseTransform),
                  (x = !1 !== e.smoothOrigin && y.smooth),
                  ((g = this._pt =
                    new ii(
                      this._pt,
                      M,
                      iY,
                      0,
                      1,
                      y.renderTransform,
                      y,
                      0,
                      -1,
                    )).dep = 1)),
                "scale" === d)
              )
                ((this._pt = new ii(
                  this._pt,
                  y,
                  "scaleY",
                  y.scaleY,
                  (f ? ex(y.scaleY, f + l) : l) - y.scaleY || 0,
                  iE,
                )),
                  (this._pt.u = 0),
                  w.push("scaleY", d),
                  (d += "X"));
              else if ("transformOrigin" === d) {
                (v.push(iH, 0, M[iH]),
                  (s = nl(s)),
                  y.svg
                    ? nm(t, s, 0, x, 0, this)
                    : ((p = parseFloat(s.split(" ")[2]) || 0) !== y.zOrigin &&
                        nt(this, y, "zOrigin", y.zOrigin, p),
                      nt(this, M, d, ny(a), ny(s))));
                continue;
              } else if ("svgOrigin" === d) {
                nm(t, s, 1, x, 0, this);
                continue;
              } else if (d in nd) {
                nM(this, y, d, o, f ? ex(o, f + s) : s);
                continue;
              } else if ("smoothOrigin" === d) {
                nt(this, y, "smooth", y.smooth, s);
                continue;
              } else if ("force3D" === d) {
                y[d] = s;
                continue;
              } else if ("transform" === d) {
                nk(this, s, t);
                continue;
              }
            } else d in M || (d = i5(d) || d);
            if (
              m ||
              ((l || 0 === l) && (o || 0 === o) && !iU.test(s) && d in M)
            )
              ((c = (a + "").substr((o + "").length)),
                l || (l = 0),
                (p = e5(s) || (d in tj.units ? tj.units[d] : c)),
                c !== p && (o = ni(t, d, a, p)),
                (this._pt = new ii(
                  this._pt,
                  m ? y : M,
                  d,
                  o,
                  (f ? ex(o, f + l) : l) - o,
                  !m && ("px" === p || "zIndex" === d) && !1 !== e.autoRound
                    ? iB
                    : iE,
                )),
                (this._pt.u = p || 0),
                m && b !== s
                  ? ((this._pt.b = a), (this._pt.e = b), (this._pt.r = iI))
                  : c !== p &&
                    "%" !== p &&
                    ((this._pt.b = a), (this._pt.r = iN)));
            else if (d in M) na.call(this, t, d, a, f ? f + s : s);
            else if (d in t) this.add(t, d, a || t[d], f ? f + s : s, i, n);
            else if ("parseTransform" !== d) {
              t8(d, s);
              continue;
            }
            (m ||
              (d in M
                ? v.push(d, 0, M[d])
                : "function" == typeof t[d]
                  ? v.push(d, 2, t[d]())
                  : v.push(d, 1, a || t[d])),
              w.push(d));
          }
        }
      _ && ir(this);
    },
    render: function (t, e) {
      if (e.tween._time || !ik())
        for (var r = e._pt; r; ) (r.r(t, r.d), (r = r._next));
      else e.styles.revert();
    },
    get: nn,
    aliases: iR,
    getSetter: function (t, e, r) {
      var i = iR[e];
      return (
        i && 0 > i.indexOf(",") && (e = i),
        e in iA && e !== iH && (t._gsap.x || nn(t, "x"))
          ? r && iT === r
            ? "scale" === e
              ? iG
              : iq
            : ((iT = r || {}), "scale" === e ? iV : iX)
          : t.style && !tL(t.style[e])
            ? iL
            : ~e.indexOf("-")
              ? iW
              : r4(t, e)
      );
    },
    core: { _removeProperty: i9, _getMatrix: nf },
  };
  ((i_.utils.checkPrefix = i5),
    (i_.core.getStyleSaver = iZ),
    (r = em(
      "x,y,z,scale,scaleX,scaleY,xPercent,yPercent," +
        (e = "rotation,rotationX,rotationY,skewX,skewY") +
        ",transform,transformOrigin,svgOrigin,force3D,smoothOrigin,transformPerspective",
      function (t) {
        iA[t] = 1;
      },
    )),
    em(e, function (t) {
      ((tj.units[t] = "deg"), (nd[t] = 1));
    }),
    (iR[r[13]] = "x,y,z,scale,scaleX,scaleY,xPercent,yPercent," + e),
    em(
      "0:translateX,1:translateY,2:translateZ,8:rotate,8:rotationZ,8:rotateZ,9:rotateX,10:rotateY",
      function (t) {
        var e = t.split(":");
        iR[e[1]] = r[e[0]];
      },
    ),
    em(
      "x,y,z,top,right,bottom,left,width,height,fontSize,padding,margin,perspective",
      function (t) {
        tj.units[t] = "px";
      },
    ),
    i_.registerPlugin(nS));
  var nA = i_.registerPlugin(nS) || i_;
  nA.core.Tween;
  let nF = _("/replay/intro-sniper.mp4?v=6"),
    nC = '"Hitmarker Text", system-ui, sans-serif',
    nP = _("/replay/user-placeholder.png"),
    nj = (t) => t.filter((t) => null !== t),
    nO = ({
      replay: t,
      autoplay: e = !0,
      controlsRef: r,
      onReady: n,
      onProgress: a,
      onEnded: s,
      onSoundChange: l,
      onDownload: o,
      downloadState: u = "idle",
      hideControls: h = !1,
    }) => {
      let d,
        p,
        f = (0, c.useRef)(null),
        m = (0, c.useRef)(null),
        g = (0, c.useRef)(null),
        y = (0, c.useRef)(null),
        Y = (0, c.useRef)(null),
        H = (0, c.useRef)(null),
        K = (0, c.useRef)(null),
        Z = (0, c.useRef)(null),
        tt = (0, c.useRef)(null),
        te = (0, c.useRef)([]),
        ti = (0, c.useRef)(null),
        tn = (0, c.useRef)(null),
        ta = (0, c.useRef)(null),
        ts = (0, c.useRef)(null),
        tl = (0, c.useRef)(null),
        to = (0, c.useRef)(null),
        tu = (0, c.useRef)(null),
        th = (0, c.useRef)(null),
        td = (0, c.useRef)([]),
        tc = (0, c.useRef)([]),
        tp = (0, c.useRef)(null),
        tf = (0, c.useRef)(n),
        tm = (0, c.useRef)(a),
        tg = (0, c.useRef)(s),
        ty = (0, c.useRef)(l);
      (0, c.useEffect)(() => {
        ((tf.current = n),
          (tm.current = a),
          (tg.current = s),
          (ty.current = l));
      }, [n, a, s, l]);
      let tx = (0, c.useRef)(null),
        t_ = (0, c.useRef)(null),
        tv = (0, c.useRef)(!1),
        [tb, tw] = (0, c.useState)(!1),
        [tM, tT] = (0, c.useState)(null),
        tk = t.intro?.url ?? null,
        tS = null !== tk && tk !== tM ? tk : nF,
        [tA, tF] = (0, c.useState)(e),
        [tC, tP] = (0, c.useState)(!1),
        tj = (0, c.useRef)(!1),
        tO = t.aspect ?? "portrait",
        tU = v(tO);
      (0, c.useLayoutEffect)(() => {
        let t = f.current,
          e = m.current;
        if (!t || !e) return;
        let r = () => {
          let r = Math.max(t.clientWidth, 1),
            i = Math.max(t.clientHeight, 1),
            n = Math.round((i / r) * tU.w),
            a =
              "portrait" === tO
                ? Math.min(Math.max(tU.h, n), tU.h + 560)
                : tU.h;
          e.style.height = `${a}px`;
          let s = Math.min(r / tU.w, i / a),
            l = (r - tU.w * s) / 2,
            o = "portrait" === tO ? 0 : (i - a * s) / 2;
          e.style.transform = `translate(${l}px, ${o}px) scale(${s})`;
        };
        r();
        let i = new ResizeObserver(r);
        return (i.observe(t), () => i.disconnect());
      }, [tO, tU.w, tU.h]);
      let tR = (0, c.useCallback)((t) => {
        tv.current !== t &&
          ((tv.current = t), tw(t), t_.current?.setEnabled(t), ty.current?.(t));
      }, []);
      (0, c.useEffect)(() => {
        let i,
          n,
          a,
          s,
          l,
          o,
          u,
          h,
          d,
          c,
          p,
          f,
          m,
          x,
          _,
          G,
          tp,
          ty = g.current;
        if (
          !ty ||
          !K.current ||
          !Z.current ||
          !tt.current ||
          !ti.current ||
          !tn.current ||
          !tu.current
        )
          return;
        let tb = {
            title: K.current,
            titleGhostA: Z.current,
            titleGhostB: tt.current,
            titleLetters: nj(te.current),
            counter: ti.current,
            counterValue: tn.current,
            counterPct: ta.current,
            stampWords: nj(td.current),
            stampShines: nj(tc.current),
            badge: tu.current,
            coinChip: ts.current,
            stats: th.current,
            introVideo: y.current,
            bgWrap: H.current,
            bgVideo: Y.current,
            miniCoin: tl.current,
            miniBar: to.current,
          },
          tw =
            ((i = null),
            (n = null),
            (a = !1),
            (s = []),
            (l = {}),
            (o = null),
            (u = null),
            (h = []),
            (d = 0),
            (c = 0),
            (p = 0),
            (f = 1 / 0),
            (m = new Map()),
            (x = (t, e) => {
              let r = m.get(e);
              if (r) return r;
              let i = fetch(e)
                .then((t) => (t.ok ? t.arrayBuffer() : Promise.reject()))
                .then((e) => t.decodeAudioData(e))
                .catch(() => null);
              return (m.set(e, i), i);
            }),
            (_ = () => {
              for (let t of h)
                try {
                  t.stop();
                } catch {}
              h = [];
            }),
            (G = null),
            (tp = (t) => {
              if (i && n) {
                var e;
                tr(i, n, l, ((e = i), G || (G = J(e)), G), t, i.currentTime);
              }
            }),
            {
              setEnabled: (t) => {
                if (((a = t), t)) {
                  if (!i) {
                    (((n = (i = new AudioContext()).createGain()).gain.value =
                      0.85),
                      n.connect(i.destination),
                      ((u = i.createGain()).gain.value = 0.16),
                      u.connect(n));
                    var e = i;
                    for (let t of Object.keys(V))
                      l[t] ||
                        x(e, V[t]).then((e) => {
                          e && (l[t] = e);
                        });
                    o ||
                      x(e, X).then((t) => {
                        t && (o = t);
                      });
                  }
                  "suspended" === i.state && i.resume();
                } else i && "running" === i.state && i.suspend();
              },
              isEnabled: () => a,
              setCues: (t) => {
                s = [...t].sort((t, e) => t.at - e.at);
              },
              setDuration: (t) => {
                t !== d && ((d = t), _());
              },
              captureStream: () => {
                if (!i || !n) return null;
                let t = i.createMediaStreamDestination();
                return (n.connect(t), t.stream);
              },
              renderOffline: async (t) => {
                let e = new OfflineAudioContext(
                    2,
                    Math.max(1, Math.ceil(48e3 * t)),
                    48e3,
                  ),
                  r = e.createGain();
                ((r.gain.value = 0.85), r.connect(e.destination));
                let i = Object.keys(V),
                  [n, ...a] = await Promise.all([
                    x(e, X),
                    ...i.map((t) => x(e, V[t])),
                  ]),
                  l = {};
                if (
                  (i.forEach((t, e) => {
                    let r = a[e];
                    r && (l[t] = r);
                  }),
                  n)
                ) {
                  let i = e.createGain();
                  ((i.gain.value = 0.16), i.connect(r), Q(e, i, n, t, 0, 0));
                }
                let o = J(e);
                for (let i of s)
                  i.at >= t || tr(e, r, l, o, i, Math.max(i.at, 0));
                return ((t) => {
                  let e = t.numberOfChannels,
                    r = t.length,
                    i = r * e * 2,
                    n = new ArrayBuffer(44 + i),
                    a = new DataView(n),
                    s = (t, e) => {
                      for (let r = 0; r < e.length; r++)
                        a.setUint8(t + r, e.charCodeAt(r));
                    };
                  (s(0, "RIFF"),
                    a.setUint32(4, 36 + i, !0),
                    s(8, "WAVE"),
                    s(12, "fmt "),
                    a.setUint32(16, 16, !0),
                    a.setUint16(20, 1, !0),
                    a.setUint16(22, e, !0),
                    a.setUint32(24, t.sampleRate, !0),
                    a.setUint32(28, t.sampleRate * e * 2, !0),
                    a.setUint16(32, 2 * e, !0),
                    a.setUint16(34, 16, !0),
                    s(36, "data"),
                    a.setUint32(40, i, !0));
                  let l = Array.from({ length: e }, (e, r) =>
                      t.getChannelData(r),
                    ),
                    o = 44;
                  for (let t = 0; t < r; t++)
                    for (let r = 0; r < e; r++) {
                      let e = Math.max(-1, Math.min(1, l[r][t]));
                      (a.setInt16(o, e < 0 ? 32768 * e : 32767 * e, !0),
                        (o += 2));
                    }
                  return new Uint8Array(n);
                })(await e.startRendering());
              },
              tick: (t, e) => {
                if (
                  (((t, e) => {
                    if (!i || !u) return;
                    let r = d > 0 ? d : (o?.duration ?? 0);
                    if (!a || !e || !o || t >= r) return _();
                    if (h.length > 0) {
                      if (0.3 >= Math.abs(c + (i.currentTime - p) - t)) return;
                      _();
                    }
                    ((h = Q(i, u, o, r, t, i.currentTime)),
                      (c = t),
                      (p = i.currentTime));
                  })(t, e),
                  !a || !i || !e || t < f)
                ) {
                  f = t;
                  return;
                }
                for (let e of s)
                  if (!(e.at <= f)) {
                    if (e.at > t) break;
                    t - e.at < 0.2 && tp(e);
                  }
                f = t;
              },
              dispose: () => {
                (_(), i && i.close(), (i = null), (n = null), (u = null));
              },
            });
        (tw.setEnabled(tv.current), (t_.current = tw));
        let tM = q(),
          tT = ((t, e, r, i = {}) => {
            var n, a;
            let s,
              l = ((t, e) => {
                let r = t.getContext("2d");
                if (!r) throw Error("replay canvas 2d context unavailable");
                let { w: i, h: n } = v(e.aspect ?? "portrait"),
                  {
                    plot: a,
                    scorePlot: s,
                    hudRows: l,
                    axisBottom: o,
                  } = D[e.aspect ?? "portrait"],
                  u = "loss" === e.theme ? P : C,
                  h = ((t) => {
                    let { plot: e, scorePlot: r } = D[t.aspect ?? "portrait"],
                      { candles: i, trades: n } = t,
                      a = i.length,
                      s = 1 / 0,
                      l = -1 / 0;
                    for (let t of i)
                      (t.l < s && (s = t.l), t.h > l && (l = t.h));
                    let o = (l - s) * 0.06 || 0.05 * Math.abs(l) || 1,
                      u = s - o,
                      h = l + o,
                      d = e.w / Math.max(a - 1, 1),
                      c = Array.from({ length: a }, (t, r) => e.x + r * d),
                      p = Math.min(Math.max(0.74 * d, 5), 30),
                      f = (t) => e.y + e.h * (1 - (t - u) / (h - u)),
                      m = n.find((t) => "buy" === t.side) ?? n[0],
                      g = L(i, m.t),
                      y = m.priceUsd > 0 ? m.priceUsd : i[g].c,
                      x = { x: c[g], y: f(y), index: g },
                      _ = n[n.length - 1],
                      v = void 0 !== _ && "sell" === _.side,
                      b = v ? L(i, _.t) : a - 1,
                      w = v && _.priceUsd > 0 ? _.priceUsd : i[b].c,
                      M = { x: c[b], y: f(w), index: b },
                      T = new Map(),
                      k = 0,
                      S = 0,
                      A = 0,
                      F = 0;
                    for (let t of n) {
                      let e = L(i, t.t),
                        r = t.priceUsd > 0 ? t.priceUsd : i[e].c,
                        n = f(r);
                      if (
                        "buy" === t.side &&
                        72 > Math.hypot(c[e] - x.x, n - x.y)
                      ) {
                        ((k += t.amountUsd), (S += t.count ?? 1));
                        continue;
                      }
                      if (
                        t.side === (v ? "sell" : "buy") &&
                        72 > Math.hypot(c[e] - M.x, n - M.y)
                      ) {
                        ((A += t.amountUsd), (F += t.count ?? 1));
                        continue;
                      }
                      let a = `${e}:${t.side}`,
                        s = T.get(a);
                      s
                        ? ((s.amountUsd += t.amountUsd),
                          (s.pxSum += r * t.amountUsd),
                          (s.count += t.count ?? 1))
                        : T.set(a, {
                            index: e,
                            side: t.side,
                            amountUsd: t.amountUsd,
                            pxSum: r * t.amountUsd,
                            count: t.count ?? 1,
                          });
                    }
                    let C = [...T.values()]
                        .sort((t, e) => e.amountUsd - t.amountUsd)
                        .slice(0, 200)
                        .map((t) => ({
                          x: c[t.index],
                          y: f(
                            t.amountUsd > 0
                              ? t.pxSum / t.amountUsd
                              : i[t.index].c,
                          ),
                          index: t.index,
                          side: t.side,
                          amountUsd: t.amountUsd,
                          count: t.count,
                        }))
                        .sort((t, e) => t.index - e.index),
                      P = (t.callouts ?? []).map((t, e) => {
                        let r = L(i, t.t);
                        return {
                          x: c[r],
                          y: f(i[r].c),
                          index: r,
                          t: t.t,
                          text: t.text,
                          kind: t.kind ?? (0 === e ? "callout" : "update"),
                        };
                      }),
                      j = r.w / Math.max(a - 1, 1),
                      O = i.map((t, e) => {
                        let n = 0,
                          s = 0;
                        for (let t = e - 2; t <= e + 2; t++)
                          t >= 0 && t < a && ((n += i[t].c), s++);
                        let l = n / s;
                        return {
                          x: r.x + e * j,
                          y: r.y + r.h * (1 - (l - u) / (h - u)),
                        };
                      });
                    return {
                      candleXs: c,
                      candleW: p,
                      yFor: f,
                      buyAnchor: x,
                      sellAnchor: M,
                      hasSellExit: v,
                      tradeMarks: C,
                      callouts: P,
                      heroBuyUsd: k,
                      heroBuyCount: S,
                      heroSellUsd: v ? A : 0,
                      heroSellCount: v ? F : 0,
                      buyFrac: Math.min((g + 2) / a, 1),
                      fullCamera: {
                        cx: 540,
                        cy: e.y + e.h / 2,
                        zoom: 1,
                        rot: 0,
                      },
                      curve: O,
                      curveBuyIndex: g,
                      curveSellIndex: b,
                    };
                  })(e),
                  { candles: d } = e,
                  { sans: c, mono: p, display: f } = W(),
                  m = A(e.seed),
                  g = Array.from({ length: 72 }, () => ({
                    angle: m() * Math.PI * 2,
                    speed: 0.55 + 1.3 * m(),
                    phase: m(),
                    len: 180 + 520 * m(),
                    width: 2 + 4.5 * m(),
                  })),
                  y = Array.from({ length: 150 }, () => ({
                    angle: m() * Math.PI * 2,
                    speed: 380 + 1150 * m(),
                    size: 30 + 54 * m(),
                    spin: (m() - 0.5) * 3,
                    stagger: 0.5 * m(),
                  })),
                  x = Array.from({ length: 36 }, () => ({
                    angle: m() * Math.PI * 2,
                    speed: 0,
                    phase: m(),
                    len: 260 + 620 * m(),
                    width: 2 + 4 * m(),
                  })),
                  _ = 46 * 0.7,
                  b = (t) => {
                    let e = Math.abs(t);
                    return e >= 1e9
                      ? `$${(e / 1e9).toFixed(e >= 1e10 ? 0 : 1).replace(/\.0$/, "")}B`
                      : e >= 1e6
                        ? `$${(e / 1e6).toFixed(e >= 1e7 ? 0 : 1).replace(/\.0$/, "")}M`
                        : e >= 1e3
                          ? `$${(e / 1e3).toFixed(e >= 1e4 ? 0 : 1).replace(/\.0$/, "")}K`
                          : `$${Math.round(e)}`;
                  },
                  w = h.tradeMarks.map((t) => {
                    let r = F(e.seed ^ (7919 * t.index + 9541), 20);
                    return {
                      sparks: Array.from({ length: 6 }, (t, e) => ({
                        angle: r[3 * e] * Math.PI * 2,
                        reach: 44 + 40 * r[3 * e + 1],
                        len: 12 + 9 * r[3 * e + 2],
                      })),
                      drift: (r[18] - 0.5) * 36,
                      amount:
                        t.count > 1
                          ? `${b(t.amountUsd)} \xd7${t.count}`
                          : b(t.amountUsd),
                    };
                  }),
                  M = e.trades.find((t) => "buy" === t.side) ?? e.trades[0],
                  T = e.trades.filter((t) => "sell" === t.side),
                  k = h.heroBuyCount > 0 ? h.heroBuyUsd : M.amountUsd,
                  S =
                    h.heroBuyCount > 1 ? `${b(k)} \xd7${h.heroBuyCount}` : b(k),
                  q =
                    h.heroSellCount > 0
                      ? h.heroSellUsd
                      : T.length > 0
                        ? T[T.length - 1].amountUsd
                        : 0,
                  G =
                    h.hasSellExit && (T.length > 0 || h.heroSellCount > 0)
                      ? h.heroSellCount > 1
                        ? `${b(q)} \xd7${h.heroSellCount}`
                        : b(q)
                      : null,
                  V = [],
                  X = 0,
                  Y = 0;
                {
                  let t = [...e.trades]
                      .filter((t) => t.amountUsd > 0)
                      .sort((t, e) => t.t - e.t)
                      .map((t) => {
                        let e = t.priceUsd > 0 ? t.priceUsd : d[L(d, t.t)].c;
                        return { ...t, tokens: e > 0 ? t.amountUsd / e : 0 };
                      }),
                    r = 0,
                    i = 0;
                  for (let e of t)
                    "buy" === e.side
                      ? ((r += e.tokens), (i += e.amountUsd))
                      : (r -= e.tokens);
                  null !== e.openTokensAtEnd &&
                    e.openTokensAtEnd > 0 &&
                    (Y = Math.max(0, e.openTokensAtEnd - r)) > 0 &&
                    (X = Math.max(0, (e.investedUsd ?? 0) - i));
                  let n = X,
                    a = 0,
                    s = Y;
                  for (let e of t)
                    ("buy" === e.side
                      ? ((n += e.amountUsd), (s += e.tokens))
                      : ((a += e.amountUsd), (s = Math.max(0, s - e.tokens))),
                      V.push({ t: e.t, invested: n, proceeds: a, held: s }));
                }
                let H =
                    h.hasSellExit &&
                    T.length > 0 &&
                    T[T.length - 1].priceUsd > 0
                      ? T[T.length - 1].priceUsd
                      : d[h.sellAnchor.index].c,
                  K = V.length > 0 ? V[V.length - 1] : null,
                  Q =
                    K && K.invested > 0
                      ? (K.proceeds + K.held * H) / K.invested
                      : 1,
                  J = h.hasSellExit ? "SELL" : "OPEN",
                  Z = !h.hasSellExit && Q >= 1,
                  tt = Z ? U : E,
                  te = Z ? R : z,
                  tr = (t) =>
                    t >= 9.95
                      ? `${Math.round(t)}x`
                      : t < 0.995
                        ? `${t.toFixed(2)}x`
                        : `${t.toFixed(1)}x`,
                  ti = d.map((t, e) => {
                    let r = 0,
                      i = 0;
                    for (let t = e - 3; t <= e + 3; t++)
                      !(t < 0) && !(t >= d.length) && ((r += d[t].c), i++);
                    return h.yFor(r / i);
                  }),
                  tn = h.tradeMarks.map(() => null),
                  ta = { buyAt: null, sellAt: null },
                  ts = h.callouts.map(() => null),
                  tl = h.callouts.map(() => null),
                  to = F(0x5f3759df ^ e.seed, 256),
                  tu = (t, e) => {
                    if (e <= 0.001) return [0, 0, 0];
                    let r = Math.floor(48 * t) % 253;
                    return [
                      (to[r] - 0.5) * 32 * e,
                      (to[r + 1] - 0.5) * 32 * e,
                      (to[r + 2] - 0.5) * 0.02 * e,
                    ];
                  },
                  th = F(0x27d4eb2f ^ e.seed, 64),
                  td = document.createElement("canvas");
                ((td.width = i), (td.height = n));
                let tc = td.getContext("2d"),
                  tp = document.createElement("canvas");
                ((tp.width = i), (tp.height = n));
                let tf = tp.getContext("2d"),
                  tm = document.createElement("canvas");
                ((tm.width = 4), (tm.height = 4));
                let tg = tm.getContext("2d");
                tg &&
                  ((tg.fillStyle = "rgba(0, 0, 0, 0.5)"),
                  tg.fillRect(0, 0, 4, 2));
                let ty = r.createPattern(tm, "repeat"),
                  tx = r.createRadialGradient(
                    i / 2,
                    n / 2,
                    0.28 * n,
                    i / 2,
                    n / 2,
                    0.72 * n,
                  );
                (tx.addColorStop(0, "rgba(0, 0, 0, 0)"),
                  tx.addColorStop(1, "rgba(0, 0, 0, 0.5)"));
                let t_ = document.createElement("canvas");
                ((t_.width = i), (t_.height = n));
                let tv = t_.getContext("2d");
                tv &&
                  (ty &&
                    ((tv.globalAlpha = 0.07),
                    (tv.fillStyle = ty),
                    tv.fillRect(0, 0, i, n),
                    (tv.globalAlpha = 1)),
                  (tv.fillStyle = tx),
                  tv.fillRect(0, 0, i, n));
                let tb = document.createElement("canvas");
                ((tb.width = 14), (tb.height = 14));
                let tw = tb.getContext("2d");
                tw &&
                  ((tw.fillStyle = "#1C221E"),
                  tw.beginPath(),
                  tw.arc(7, 7, 1.4, 0, 2 * Math.PI),
                  tw.fill());
                let tM = r.createPattern(tb, "repeat"),
                  tT = {
                    x: a.x - 300,
                    y: a.y - 400,
                    w: a.w + 600,
                    h: a.h + 800,
                  },
                  tk = document.createElement("canvas");
                ((tk.width = tT.w), (tk.height = tT.h));
                let tS = tk.getContext("2d"),
                  tA = !!(tS && tM);
                tS &&
                  tM &&
                  (tS.translate(-tT.x, -tT.y),
                  (tS.fillStyle = tM),
                  tS.fillRect(tT.x, tT.y, tT.w, tT.h));
                let tF = document.createElement("canvas");
                ((tF.width = i), (tF.height = n));
                let tC = tF.getContext("2d");
                if (tC && tM) {
                  ((tC.fillStyle = tM),
                    tC.fillRect(s.x, s.y - 70, s.w, s.h + 140));
                  let t = s.x + s.w / 2,
                    e = s.y + 0.45 * s.h;
                  (tC.save(),
                    (tC.globalCompositeOperation = "destination-in"),
                    tC.translate(t, e),
                    tC.scale(1, 0.8));
                  let r = tC.createRadialGradient(0, 0, 0, 0, 0, 0.68 * s.w);
                  (r.addColorStop(0, "rgba(255, 255, 255, 1)"),
                    r.addColorStop(0.45, "rgba(255, 255, 255, 1)"),
                    r.addColorStop(1, "rgba(255, 255, 255, 0)"),
                    (tC.fillStyle = r),
                    tC.fillRect(-i, -(2 * n), 2 * i, 4 * n),
                    tC.restore());
                }
                let tP = (t, e, r, a, s) => {
                    let l = (t - r.cx) * r.zoom,
                      o = (e - r.cy) * r.zoom,
                      u = Math.cos(r.rot),
                      h = Math.sin(r.rot);
                    return [
                      i / 2 + a + l * u - o * h,
                      n / 2 + s + l * h + o * u,
                    ];
                  },
                  tj = (t, e, i, n, a, s, l) => {
                    if (l <= 0.003) return;
                    (r.save(),
                      (r.font = `700 ${Math.round(s)}px ${f}`),
                      (r.letterSpacing = `${Math.round(0.16 * s)}px`));
                    let o = r.measureText(i).width + 1.25 * s,
                      u = 1.85 * s;
                    ((r.globalAlpha = l),
                      r.beginPath(),
                      r.roundRect(t - o / 2, e - u / 2, o, u, u / 2),
                      (r.fillStyle = "rgba(8, 15, 12, 0.6)"),
                      r.fill(),
                      (r.shadowColor = n),
                      (r.shadowBlur = 14),
                      (r.strokeStyle = "rgba(255, 255, 255, 0.24)"),
                      (r.lineWidth = 1.5),
                      r.stroke(),
                      (r.shadowBlur = 0),
                      (r.fillStyle = a),
                      (r.textAlign = "center"),
                      (r.textBaseline = "middle"),
                      r.fillText(i, t, e + 1),
                      (r.letterSpacing = "0px"),
                      r.restore());
                  },
                  tO = (t, e, i, n, a, s, l = 1, o = 1) => {
                    if (i <= 0.001 || o <= 0.001) return;
                    let u = Math.min(1.4 * i, 1) * o,
                      h = 26 * l * (0.6 + 0.4 * i);
                    (r.save(),
                      r.translate(t, e),
                      r.beginPath(),
                      r.arc(0, 0, h, 0, 2 * Math.PI),
                      (r.globalAlpha = 0.18 * u),
                      (r.fillStyle = a),
                      r.fill(),
                      (r.globalAlpha = u),
                      (r.strokeStyle = a),
                      (r.lineWidth = 2.5 + 2 * l * i),
                      (r.shadowColor = a),
                      (r.shadowBlur = 18 * i),
                      r.stroke(),
                      (r.shadowBlur = 0),
                      r.beginPath(),
                      r.arc(
                        0,
                        0,
                        Math.max(4.5 * l + 1.5, 3) * i,
                        0,
                        2 * Math.PI,
                      ),
                      (r.fillStyle = "#FFFFFF"),
                      r.fill(),
                      null !== n &&
                        tj(
                          0,
                          h + (22 * l + 14) * i,
                          n,
                          a,
                          s,
                          Math.round(30 * l + 4),
                          u,
                        ),
                      r.restore());
                  },
                  tU = (t) => 1 - (1 - t) ** 3,
                  tR = (t) => 1 - (1 - t) ** 5,
                  tE = (t, e, r) => Math.min(t / e, 1) * (1 - t) ** r,
                  tz = (t, e, i, n, a, s, l, o, u) => {
                    if (i <= 0 || i >= 1.6 || u <= 0.003) return;
                    let h = i / 1.6,
                      d = tU(h),
                      c = 1 + 0.3 * (1 - tU(Math.min(i / 0.18, 1))),
                      f = h < 0.55 ? 1 : 1 - tU((h - 0.55) / 0.45),
                      m = t + o * d,
                      g = e - d * l;
                    (r.save(),
                      (r.globalAlpha = Math.min(i / 0.07, 1) * f * u),
                      (r.font = `700 ${Math.round(s * c)}px ${p}`),
                      (r.textAlign = "center"),
                      (r.textBaseline = "alphabetic"),
                      (r.lineJoin = "round"),
                      (r.strokeStyle = "rgba(4, 10, 8, 0.85)"),
                      (r.lineWidth = Math.max(0.18 * s, 4)),
                      r.strokeText(n, m, g),
                      (r.fillStyle = a),
                      (r.shadowColor = a),
                      (r.shadowBlur = 18),
                      r.fillText(n, m, g),
                      r.restore());
                  },
                  tN = `600 36px ${c}`,
                  tI = e.userImageUrl ? new Image() : null,
                  tB = !1;
                if (tI && e.userImageUrl) {
                  let t = e.userImageUrl,
                    r = !1;
                  ((tI.onload = () => {
                    tB = tI.naturalWidth > 0;
                  }),
                    (tI.onerror = () => {
                      r ||
                        ((r = !0),
                        tI.removeAttribute("crossorigin"),
                        (tI.src = t));
                    }),
                    (tI.crossOrigin = "anonymous"),
                    (tI.src = t));
                }
                let t$ = (t) => {
                    (r.save(), (r.font = tN));
                    let e = [],
                      i = "",
                      n = () => {
                        (i.length > 0 && e.push(i), (i = ""));
                      };
                    for (let e of t.split(" ")) {
                      let t = i.length > 0 ? `${i} ${e}` : e;
                      if (r.measureText(t).width <= 572) {
                        i = t;
                        continue;
                      }
                      if ((n(), r.measureText(e).width <= 572)) {
                        i = e;
                        continue;
                      }
                      for (let t of e)
                        (r.measureText(i + t).width > 572 && n(), (i += t));
                    }
                    return (n(), r.restore(), e);
                  },
                  tD = (t) =>
                    102 + 46 * (tl[t] ??= t$(h.callouts[t].text)).length + 34,
                  tL = (t) =>
                    t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2,
                  tW = (t, a, s, l, o, u) => {
                    var d;
                    let c,
                      p,
                      m,
                      g,
                      y,
                      x,
                      _,
                      v,
                      b = h.callouts[t];
                    if (l <= 0 || l >= o + 0.46) return;
                    let w = (tl[t] ??= t$(b.text)),
                      M = Math.min(l / 0.24, 1),
                      T = Math.min(l / 0.12, 1),
                      k = l > o ? Math.min((l - o) / 0.46, 1) : 0,
                      S = T * (1 - k * k * k);
                    if (S <= 0.003) return;
                    let A =
                        0.55 +
                        0.45 * ((c = M - 1) * c * (2.70158 * c + 1.70158) + 1),
                      F =
                        k < 0.28
                          ? 1 + 0.04 * Math.sin((k / 0.28) * Math.PI)
                          : 1,
                      C = k <= 0.28 ? 0 : (k - 0.28) / 0.72,
                      P =
                        A *
                        F *
                        (1 -
                          0.5 *
                            (C < 0.5
                              ? 4 * C * C * C
                              : 1 - Math.pow(-2 * C + 2, 3) / 2)) *
                        (1 + (1.3 - 1) * u),
                      j = tD(t),
                      O = Math.min(Math.max(a, 80), i - 80),
                      U = Math.min(Math.max(s, 120), n - 120),
                      R = U - 30 - 54 - j >= 150,
                      E = Math.min(Math.max(O - 320, 32), i - 32 - 640),
                      z = R ? U - 30 - 54 - j : U + 30 + 54,
                      I = E + 320 - O,
                      B = Math.min(
                        Math.max(
                          O +
                            Math.sign(I || 1) * Math.max(0.4 * Math.abs(I), 48),
                          E + 38 + 37 + 6,
                        ),
                        E + 640 - 38 - 37 - 6,
                      ),
                      $ = R ? U - 30 : U + 30;
                    (r.save(),
                      (r.globalAlpha = S),
                      r.translate(O, $),
                      r.scale(P, P),
                      r.translate(-O, -$),
                      (d = { baseL: B - 37, baseR: B + 37, tipX: O, tipY: $ }),
                      (p = E + 640),
                      (m = z + j),
                      (g = R ? m : z),
                      (y = d.tipY - g),
                      (x =
                        d.tipX < (d.baseL + d.baseR) / 2 ? d.baseL : d.baseR),
                      (_ = (t) =>
                        t === x
                          ? [t + (d.tipX - t) * 0.55, g + 0.35 * y]
                          : [t + (d.tipX - t) * 0.1, g + 0.8 * y]),
                      (v = (t, e) => {
                        let [i, n] = _(t),
                          [a, s] = _(e);
                        (r.lineTo(t, g),
                          r.quadraticCurveTo(i, n, d.tipX, d.tipY),
                          r.quadraticCurveTo(a, s, e, g));
                      }),
                      r.beginPath(),
                      r.moveTo(E + 38, z),
                      R || v(d.baseL, d.baseR),
                      r.arcTo(p, z, p, z + 38, 38),
                      r.arcTo(p, m, p - 38, m, 38),
                      R && v(d.baseR, d.baseL),
                      r.arcTo(E, m, E, m - 38, 38),
                      r.arcTo(E, z, E + 38, z, 38),
                      r.closePath(),
                      (r.fillStyle = "rgba(9, 16, 12, 0.9)"),
                      (r.shadowColor = "rgba(0, 0, 0, 0.6)"),
                      (r.shadowBlur = 44),
                      (r.shadowOffsetY = 16),
                      r.fill(),
                      (r.shadowColor = "rgba(0, 0, 0, 0)"),
                      (r.shadowBlur = 0),
                      (r.shadowOffsetY = 0),
                      (r.strokeStyle = "rgba(255, 255, 255, 0.26)"),
                      (r.lineWidth = 2),
                      r.stroke());
                    let D = z + 28 + 28,
                      L = E + 34 + 28,
                      W = e.username ? `@${e.username}` : "TRADER";
                    (r.save(),
                      r.beginPath(),
                      r.arc(L, D, 28, 0, 2 * Math.PI),
                      r.closePath(),
                      (r.fillStyle = "rgba(250, 204, 21, 0.18)"),
                      r.fill(),
                      tI && tB
                        ? (r.clip(), r.drawImage(tI, L - 28, D - 28, 56, 56))
                        : ((r.textBaseline = "middle"),
                          (r.textAlign = "center"),
                          (r.font = `700 28px ${f}`),
                          (r.fillStyle = N),
                          r.fillText(
                            W.replace("@", "").slice(0, 1).toUpperCase(),
                            L,
                            D + 2,
                          )),
                      r.restore(),
                      r.beginPath(),
                      r.arc(L, D, 28, 0, 2 * Math.PI),
                      (r.strokeStyle = "rgba(250, 204, 21, 0.85)"),
                      (r.lineWidth = 2.5),
                      r.stroke());
                    let q = L + 28 + 18;
                    ((r.textBaseline = "middle"),
                      (r.textAlign = "left"),
                      (r.font = `500 30px ${f}`),
                      (r.letterSpacing = "1px"),
                      (r.fillStyle = "rgba(244, 255, 249, 0.92)"),
                      r.fillText(W, q, D + 1));
                    let G = r.measureText(W).width,
                      V = "update" === b.kind ? "UPDATE" : "CALLOUT";
                    ((r.font = `700 22px ${f}`), (r.letterSpacing = "3px"));
                    let X = r.measureText(V).width,
                      Y = q + G + 18;
                    (r.beginPath(),
                      r.roundRect(Y, D - 17, X + 28, 34, 17),
                      (r.fillStyle = "rgba(250, 204, 21, 0.14)"),
                      r.fill(),
                      (r.strokeStyle = "rgba(250, 204, 21, 0.55)"),
                      (r.lineWidth = 1.2),
                      r.stroke(),
                      (r.fillStyle = N),
                      r.fillText(V, Y + 14 + 1.5, D + 2),
                      (r.letterSpacing = "0px"));
                    let H = Math.max(
                      0,
                      Math.min(b.text.length, Math.floor((l - 0.24) / 0.016)),
                    );
                    ((r.font = tN),
                      (r.fillStyle = "#F4FFF9"),
                      (r.textBaseline = "alphabetic"));
                    let K = z + 28 + 56 + 18,
                      Q = E + 34,
                      J = H;
                    for (let t = 0; t < w.length; t++) {
                      let e = w[t],
                        i = K + 46 * t + 36;
                      if (J <= 0) break;
                      let n = e.slice(0, Math.min(J, e.length));
                      (r.fillText(n, Q, i), (J -= e.length + 1));
                    }
                    r.restore();
                  },
                  tq = (t, e, i, n, a, s = 1) => {
                    if (i <= 0 || i >= n || s <= 0.003) return;
                    let l = i / n,
                      o = a * (0.5 + 0.3 * tU(l)),
                      u = 0.6 * a * (1 - 0.35 * tU(l));
                    for (let [i, n] of (r.save(),
                    (r.globalCompositeOperation = "lighter"),
                    (r.strokeStyle = "#FFFFFF"),
                    (r.lineCap = "round"),
                    (r.lineWidth = Math.max(0.16 * a, 3)),
                    (r.globalAlpha = (1 - l) ** 1.6 * s),
                    (r.shadowColor = "#FFFFFF"),
                    (r.shadowBlur = 14),
                    r.beginPath(),
                    [
                      [1, 1],
                      [1, -1],
                      [-1, 1],
                      [-1, -1],
                    ]))
                      (r.moveTo(t + i * o * 0.707, e + n * o * 0.707),
                        r.lineTo(
                          t + i * (o + u) * 0.707,
                          e + n * (o + u) * 0.707,
                        ));
                    (r.stroke(), r.restore());
                  };
                return {
                  draw: (e) => {
                    if (
                      (r.setTransform(1, 0, 0, 1, 0, 0),
                      (r.globalAlpha = 1),
                      (r.globalCompositeOperation = "source-over"),
                      r.clearRect(0, 0, i, n),
                      (r.globalAlpha = 1 - 0.62 * e.scorecard),
                      (r.fillStyle = u.bg),
                      r.fillRect(0, 0, i, n),
                      (r.globalAlpha = 1),
                      e.scorecard < 0.999 &&
                        ((t) => {
                          let [e, a, s] = tu(t.time, t.shake),
                            m = d.length,
                            v = Math.min(
                              Math.max(t.reveal * m - 1, 0),
                              h.sellAnchor.index,
                            ),
                            M = Math.floor(v),
                            T = Math.min(M + 1, h.sellAnchor.index),
                            k = v - M,
                            A =
                              h.candleXs[M] +
                              (h.candleXs[T] - h.candleXs[M]) * k,
                            F = ti[M] + (ti[T] - ti[M]) * k,
                            C = t.camera.cx + (A - t.camera.cx) * t.follow,
                            P =
                              t.camera.cy + (F + 130 - t.camera.cy) * t.follow,
                            D = ((t) => {
                              let e = new Map();
                              for (let r = 0; r < h.callouts.length; r++) {
                                let i = ts[r];
                                if (null === i) continue;
                                let n = t - i.at;
                                if (n <= -0.75 || n >= i.dwell + 1.05) continue;
                                let a =
                                  n < i.dwell
                                    ? tL(Math.min((n + 0.75) / 1.1, 1))
                                    : 1 - tL(Math.min((n - i.dwell) / 1.05, 1));
                                a > 0 && e.set(r, a);
                              }
                              return e;
                            })(t.time),
                            L = 0;
                          for (let t of D.values()) L += t;
                          let W = Math.min(L, 1),
                            q = t.camera.zoom * (1 + 0.28 * W),
                            H = C,
                            K = P;
                          if (L > 0) {
                            let t = W / L;
                            for (let [e, r] of D) {
                              let i = h.callouts[e],
                                n = 30 + (54 + tD(e) / 2) * 1.3,
                                a = r * t;
                              ((H += (i.x - C) * a),
                                (K += (i.y - n / q - P) * a));
                            }
                          }
                          let Z = {
                            cx: H,
                            cy: K,
                            zoom: q,
                            rot: t.camera.rot + s,
                          };
                          (r.save(),
                            r.translate(i / 2 + e, n / 2 + a),
                            r.rotate(Z.rot),
                            r.scale(Z.zoom, Z.zoom),
                            r.translate(-Z.cx, -Z.cy),
                            t.gridAlpha > 0.004 &&
                              tA &&
                              (r.save(),
                              (r.globalAlpha = t.gridAlpha),
                              (r.globalCompositeOperation = "lighten"),
                              r.drawImage(tk, tT.x, tT.y),
                              r.restore()));
                          let tl = t.reveal * m,
                            to = Math.min(Math.floor(tl), m),
                            th = Math.min(tl - to, 1),
                            td = h.candleW,
                            tc = (e, i) => {
                              let n = d[e],
                                a = h.candleXs[e],
                                s = n.c >= n.o,
                                l = h.yFor(n.o),
                                o = h.yFor(n.c),
                                u = h.yFor(n.h),
                                c = h.yFor(n.l),
                                p = Math.min(l, o),
                                f = Math.max(Math.abs(o - l), 2.5);
                              ((r.globalAlpha = i * t.chartAlpha),
                                (r.strokeStyle = s
                                  ? "rgba(43, 255, 136, 0.6)"
                                  : "rgba(255, 77, 94, 0.55)"),
                                (r.lineWidth = Math.max(0.16 * td, 1.4)),
                                r.beginPath(),
                                r.moveTo(a, u),
                                r.lineTo(a, c),
                                r.stroke(),
                                (r.fillStyle = s ? j : O),
                                (r.shadowColor = s ? j : O),
                                (r.shadowBlur = 14),
                                r.fillRect(a - td / 2, p, td, f),
                                (r.shadowBlur = 0));
                            };
                          if (t.chartAlpha > 0.004) {
                            for (let t = 0; t < to; t++) tc(t, 1);
                            to < m && th > 0.02 && tc(to, th);
                          }
                          if (((r.globalAlpha = 1), t.buyRings > 0.004)) {
                            (r.save(), (r.strokeStyle = U));
                            for (let e = 0; e < 3; e++) {
                              let i = 0.1 * e,
                                n = (t.buyRings - i) / (1 - i);
                              if (n <= 0 || n >= 1) continue;
                              let a = tU(n);
                              ((r.globalAlpha = 0.85 * tE(n, 0.1, 1.5)),
                                (r.lineWidth = 7 * (1 - a) + 1),
                                r.beginPath(),
                                r.arc(
                                  h.buyAnchor.x,
                                  h.buyAnchor.y,
                                  _ + 160 * a,
                                  0,
                                  2 * Math.PI,
                                ),
                                r.stroke());
                            }
                            r.restore();
                          }
                          if (t.marks > 0.004)
                            for (let e = 0; e < h.tradeMarks.length; e++) {
                              let i = h.tradeMarks[e],
                                n = tl - (i.index + 1);
                              if (n <= 0) continue;
                              let a = "buy" === i.side,
                                s = a ? U : E,
                                l = a ? "BUY" : "SELL",
                                o = a ? R : z,
                                u = tn[e];
                              if (null === u) {
                                let e = tU(Math.min(n / 1.6, 1));
                                tO(i.x, i.y, 1, l, s, o, 0.5, e * t.marks);
                                continue;
                              }
                              let d = t.time - u;
                              if (d < 0) continue;
                              let c = 1 + 0.6 * (1 - tR(Math.min(d / 0.26, 1))),
                                p = Math.min(d / 0.08, 1);
                              if (d < 0.16) {
                                let e = d / 0.16;
                                (r.save(),
                                  (r.globalCompositeOperation = "lighter"),
                                  (r.fillStyle = "#FFFFFF"),
                                  (r.shadowColor = s),
                                  (r.shadowBlur = 30),
                                  (r.globalAlpha =
                                    (1 - e) ** 2 * 0.9 * t.marks),
                                  r.beginPath(),
                                  r.arc(
                                    i.x,
                                    i.y,
                                    11 + 14 * tU(e),
                                    0,
                                    2 * Math.PI,
                                  ),
                                  r.fill(),
                                  r.restore());
                              }
                              if (d < 0.55) {
                                let e = d / 0.55,
                                  n = tU(e);
                                (r.save(),
                                  (r.strokeStyle = s),
                                  (r.globalAlpha =
                                    0.85 * tE(e, 0.12, 1.7) * t.marks),
                                  (r.lineWidth = 5 * (1 - n) + 0.6),
                                  r.beginPath(),
                                  r.arc(i.x, i.y, 23 + 88 * n, 0, 2 * Math.PI),
                                  r.stroke(),
                                  r.restore());
                              }
                              if (d < 0.42) {
                                let n = d / 0.42,
                                  a = tU(n);
                                for (let l of (r.save(),
                                (r.strokeStyle = s),
                                (r.lineCap = "round"),
                                (r.lineWidth = 3),
                                (r.globalAlpha =
                                  (1 - n) ** 1.5 * 0.9 * t.marks),
                                r.beginPath(),
                                w[e].sparks)) {
                                  let t = 26 + a * l.reach,
                                    e = l.len * (1 - 0.8 * a),
                                    n = Math.cos(l.angle),
                                    s = Math.sin(l.angle);
                                  (r.moveTo(i.x + n * t, i.y + s * t),
                                    r.lineTo(
                                      i.x + n * (t + e),
                                      i.y + s * (t + e),
                                    ));
                                }
                                (r.stroke(), r.restore());
                              }
                              (tO(i.x, i.y, c, l, s, o, 0.5, p * t.marks),
                                tq(i.x, i.y, d, 0.24, 34.5, t.marks),
                                tz(
                                  i.x,
                                  i.y - 23 - 16,
                                  d,
                                  w[e].amount,
                                  s,
                                  32,
                                  88,
                                  w[e].drift,
                                  t.marks,
                                ));
                            }
                          for (let e = 0; e < h.callouts.length; e++) {
                            let i = h.callouts[e],
                              n = ts[e];
                            if (null === n) {
                              if (t.marks <= 0.004) continue;
                              let e = tl - (i.index + 1);
                              if (e <= 0) continue;
                              let r = tU(Math.min(e / 1.6, 1));
                              tO(i.x, i.y, 1, null, N, I, 0.5, r * t.marks);
                              continue;
                            }
                            let a = t.time - n.at;
                            if (a < 0) continue;
                            let s = 1 + 0.35 * (1 - tR(Math.min(a / 0.3, 1))),
                              l = Math.min(a / 0.1, 1);
                            if (a < 0.7) {
                              let t = a / 0.7,
                                e = tU(t);
                              (r.save(),
                                (r.strokeStyle = N),
                                (r.globalAlpha = 0.75 * tE(t, 0.14, 1.6)),
                                (r.lineWidth = 4 * (1 - e) + 0.6),
                                r.beginPath(),
                                r.arc(i.x, i.y, 23 + 70 * e, 0, 2 * Math.PI),
                                r.stroke(),
                                r.restore());
                            }
                            tO(i.x, i.y, s, null, N, I, 0.5, l);
                          }
                          if (
                            (tO(
                              h.buyAnchor.x,
                              h.buyAnchor.y,
                              t.buyMarker,
                              "BUY",
                              U,
                              R,
                              0.7,
                            ),
                            tO(
                              h.sellAnchor.x,
                              h.sellAnchor.y,
                              t.sellMarker,
                              J,
                              tt,
                              te,
                              0.7,
                            ),
                            null !== ta.buyAt)
                          ) {
                            let e = t.time - ta.buyAt;
                            (tz(
                              h.buyAnchor.x,
                              h.buyAnchor.y - _ - 18,
                              e,
                              S,
                              U,
                              38,
                              100,
                              0,
                              1,
                            ),
                              tq(
                                h.buyAnchor.x,
                                h.buyAnchor.y,
                                e,
                                0.3,
                                1.5 * _,
                              ));
                          }
                          if (null !== ta.sellAt && null !== G) {
                            let e = t.time - ta.sellAt;
                            (tz(
                              h.sellAnchor.x,
                              h.sellAnchor.y - _ - 18,
                              e,
                              G,
                              E,
                              38,
                              100,
                              0,
                              1,
                            ),
                              tq(
                                h.sellAnchor.x,
                                h.sellAnchor.y,
                                e,
                                0.34,
                                1.7 * _,
                              ));
                          }
                          if ((r.restore(), t.warp > 0.005)) {
                            (r.save(),
                              (r.globalCompositeOperation = "lighter"));
                            let e = i / 2,
                              a = n / 2 - 80;
                            for (let i of g) {
                              let n = (i.phase + t.time * i.speed) % 1,
                                s = 70 + 820 * n,
                                l = i.len * (0.35 + 0.65 * n),
                                o = Math.cos(i.angle),
                                h = Math.sin(i.angle);
                              ((r.globalAlpha = t.warp * (1 - n) * 0.95),
                                (r.strokeStyle =
                                  i.phase < 0.22 ? "#D9FFEC" : u.primary),
                                (r.lineWidth = i.width),
                                r.beginPath(),
                                r.moveTo(e + o * s, a + h * s),
                                r.lineTo(e + o * (s + l), a + h * (s + l)),
                                r.stroke());
                            }
                            r.restore();
                          }
                          if (t.crosshair > 0.003) {
                            let [i, n] = tP(
                              h.sellAnchor.x,
                              h.sellAnchor.y,
                              Z,
                              e,
                              a,
                            );
                            ((t, e, i, n, a) => {
                              if (n <= 0.003) return;
                              (r.save(),
                                r.translate(t, e),
                                r.rotate(a),
                                (r.globalAlpha = n),
                                (r.strokeStyle = u.accent),
                                (r.shadowColor = u.accent),
                                (r.shadowBlur = 22),
                                (r.lineWidth = 6 * Math.max(i, 0.4)));
                              let s = 96 * i,
                                l = 58 * i;
                              (r.beginPath(),
                                r.arc(0, 0, s, 0, 2 * Math.PI),
                                r.stroke(),
                                r.beginPath(),
                                r.arc(0, 0, l, 0, 2 * Math.PI),
                                r.stroke());
                              for (let t = 0; t < 4; t++) {
                                let e = (t * Math.PI) / 2,
                                  n = Math.cos(e),
                                  a = Math.sin(e);
                                (r.beginPath(),
                                  r.moveTo(n * l * 0.6, a * l * 0.6),
                                  r.lineTo(n * (s + 26 * i), a * (s + 26 * i)),
                                  r.stroke());
                              }
                              ((r.fillStyle = u.accent),
                                r.beginPath(),
                                r.arc(
                                  0,
                                  0,
                                  7 * Math.max(i, 0.5),
                                  0,
                                  2 * Math.PI,
                                ),
                                r.fill(),
                                r.restore());
                            })(
                              i,
                              n,
                              6.2 - 5.2 * t.crosshair,
                              Math.min(1.6 * t.crosshair, 1),
                              (1 - t.crosshairSpin) * 1.4,
                            );
                          }
                          if (t.gridAlpha > 0.004 && d.length >= 2) {
                            let e =
                                t.gridAlpha *
                                Math.max(0, 1 - 1.6 * t.dim) *
                                Math.max(0, 1 - 3 * t.scorecard),
                              a = d[0].t,
                              s = d[d.length - 1].t - a,
                              l = h.candleXs[1] - h.candleXs[0];
                            if (e > 0.004 && s > 0 && l > 0) {
                              let t = s / (d.length - 1),
                                a =
                                  B.find((t) => s / t <= 6.5) ??
                                  B[B.length - 1],
                                u = n - o;
                              (r.save(),
                                (r.globalAlpha = e),
                                (r.font = `600 34px ${p}`),
                                (r.textAlign = "center"),
                                (r.textBaseline = "middle"),
                                (r.lineJoin = "round"));
                              for (let e = 1; e * a <= 1.001 * s; e++) {
                                let n = h.candleXs[0] + ((e * a) / t) * l;
                                if (n > A + 0.5 * l) break;
                                let s = (n - Z.cx) * Z.zoom + i / 2;
                                if (s < 80 || s > i - 80) continue;
                                let o = $(e * a);
                                ((r.strokeStyle = "rgba(4, 10, 8, 0.85)"),
                                  (r.lineWidth = 7),
                                  r.strokeText(o, s, u),
                                  (r.fillStyle = "rgba(244, 255, 249, 0.78)"),
                                  r.fillText(o, s, u),
                                  r.fillRect(s - 1.5, u - 48, 3, 18));
                              }
                              r.restore();
                            }
                          }
                          let tp = 0,
                            tf = [];
                          for (let e = 0; e < h.callouts.length; e++) {
                            let r = ts[e];
                            if (null === r) continue;
                            let i = t.time - r.at;
                            if (i <= 0 || i >= r.dwell + 0.46) continue;
                            tf.push({ ci: e, age: i, dwell: r.dwell });
                            let n =
                              i > r.dwell
                                ? Math.min((i - r.dwell) / 0.46, 1)
                                : 0;
                            tp = Math.max(
                              tp,
                              Math.min(i / 0.14, 1) * (1 - tU(n)),
                            );
                          }
                          let tm = 1 - tp,
                            tg = d[M].c + (d[T].c - d[M].c) * k,
                            ty =
                              d.length > 1
                                ? (d[d.length - 1].t - d[0].t) / (d.length - 1)
                                : 0,
                            tx = ((t) => {
                              let e = {
                                t: -1 / 0,
                                invested: X,
                                proceeds: 0,
                                held: Y,
                              };
                              for (let r of V) {
                                if (r.t > t) break;
                                e = r;
                              }
                              return e;
                            })(d[M].t + (d[T].t - d[M].t) * k + ty);
                          if (t.multHud * tm > 0.004 && tx.invested > 0) {
                            let s = (tx.proceeds + tx.held * tg) / tx.invested,
                              [l, o] = tP(A, F, Z, e, a),
                              u = s >= 1 ? U : E,
                              h = tr(s),
                              d = `700 46px ${p}`;
                            (r.save(),
                              (r.globalAlpha = t.multHud * tm),
                              (r.textBaseline = "middle"),
                              (r.lineJoin = "round"),
                              (r.font = d));
                            let c = r.measureText(h).width,
                              f = Math.min(
                                Math.max(l + 150, c / 2 + 60),
                                i - c / 2 - 60,
                              ),
                              m = Math.min(Math.max(o - 150, 260), n - 320);
                            ((r.textAlign = "left"),
                              (r.strokeStyle = "rgba(4, 10, 8, 0.85)"),
                              (r.lineWidth = 9),
                              r.strokeText(h, f - c / 2, m),
                              (r.fillStyle = u),
                              (r.shadowColor = u),
                              (r.shadowBlur = 20),
                              r.fillText(h, f - c / 2, m),
                              r.restore());
                          }
                          if (t.pnlHud > 0.004 && tx.invested > 0) {
                            let e = tx.proceeds + tx.held * tg - tx.invested,
                              n = e >= 0 ? U : E,
                              a = i - 64;
                            (r.save(),
                              (r.globalAlpha = t.pnlHud),
                              (r.textAlign = "right"),
                              (r.textBaseline = "alphabetic"),
                              (r.lineJoin = "round"),
                              (r.strokeStyle = "rgba(4, 10, 8, 0.85)"),
                              (r.font = `600 26px ${p}`),
                              (r.lineWidth = 6),
                              r.strokeText("LIVE PNL", a, l.label1),
                              (r.fillStyle = "rgba(244, 255, 249, 0.55)"),
                              r.fillText("LIVE PNL", a, l.label1));
                            let s = `${e < 0 ? "-" : "+"}${b(e)}`;
                            ((r.font = `700 64px ${p}`),
                              (r.lineWidth = 10),
                              r.strokeText(s, a, l.value1),
                              (r.fillStyle = n),
                              (r.shadowColor = n),
                              (r.shadowBlur = 22),
                              r.fillText(s, a, l.value1),
                              (r.shadowBlur = 0),
                              (r.font = `600 26px ${p}`),
                              (r.lineWidth = 6),
                              r.strokeText("INVESTED", a, l.label2),
                              (r.fillStyle = "rgba(244, 255, 249, 0.55)"),
                              r.fillText("INVESTED", a, l.label2));
                            let o = b(tx.invested);
                            ((r.font = `700 44px ${p}`),
                              (r.lineWidth = 8),
                              r.strokeText(o, a, l.value2),
                              (r.fillStyle = "rgba(247, 255, 251, 0.92)"),
                              r.fillText(o, a, l.value2),
                              r.restore());
                          }
                          for (let t of tf) {
                            let r = h.callouts[t.ci],
                              [i, n] = tP(r.x, r.y, Z, e, a);
                            tW(t.ci, i, n, t.age, t.dwell, D.get(t.ci) ?? 0);
                          }
                          if (t.multSlam > 0.004) {
                            let [i, s] = tP(
                                h.sellAnchor.x,
                                h.sellAnchor.y,
                                Z,
                                e,
                                a,
                              ),
                              l = Q >= 1 ? U : E,
                              o = tr(Q),
                              u = Math.round(96 * (0.72 + 0.28 * t.multSlam)),
                              d = Math.min(s + 230, n - 180);
                            (r.save(),
                              (r.globalAlpha = Math.min(1.5 * t.multSlam, 1)),
                              (r.font = `700 ${u}px ${f}`),
                              (r.textAlign = "center"),
                              (r.textBaseline = "middle"),
                              (r.lineJoin = "round"),
                              (r.strokeStyle = "rgba(4, 10, 8, 0.9)"),
                              (r.lineWidth = 12),
                              r.strokeText(o, i, d),
                              (r.fillStyle = l),
                              (r.shadowColor = l),
                              (r.shadowBlur = 34),
                              r.fillText(o, i, d),
                              r.restore());
                          }
                          if (
                            (t.dim > 0.004 &&
                              ((r.globalAlpha = 1),
                              (r.fillStyle = `rgba(0, 0, 0, ${0.74 * t.dim})`),
                              r.fillRect(0, 0, i, n)),
                            t.burst > 0.004 && t.burst < 0.999)
                          ) {
                            let e = i / 2,
                              a = 0.43 * n;
                            for (let i of (r.save(),
                            (r.globalCompositeOperation = "lighter"),
                            x)) {
                              let n = Math.min(1.35 * t.burst, 1),
                                s = 80 + 420 * n,
                                l = i.len * (0.5 + 0.5 * n),
                                o = Math.cos(i.angle),
                                h = Math.sin(i.angle);
                              ((r.globalAlpha = (1 - n) * 0.8),
                                (r.strokeStyle = u.primary),
                                (r.lineWidth = i.width),
                                r.beginPath(),
                                r.moveTo(e + o * s, a + h * s),
                                r.lineTo(e + o * (s + l), a + h * (s + l)),
                                r.stroke());
                            }
                            for (let i of ((r.textAlign = "center"),
                            (r.textBaseline = "middle"),
                            y)) {
                              let n = 1.5 * t.burst - i.stagger;
                              if (n <= 0 || n >= 1) continue;
                              let s = 1 - Math.pow(1 - n, 3),
                                l = i.speed * s * 0.85,
                                o = e + Math.cos(i.angle) * l,
                                h = a + Math.sin(i.angle) * l + 190 * n * n;
                              ((r.globalAlpha = 0.95 * Math.pow(1 - n, 0.7)),
                                (r.fillStyle =
                                  i.stagger < 0.08 ? "#D9FFEC" : u.primary),
                                r.save(),
                                r.translate(o, h),
                                r.rotate(i.spin * n * Math.PI),
                                (r.font = `700 ${Math.round(i.size)}px ${c}`),
                                r.fillText("$", 0, 0),
                                r.restore());
                            }
                            r.restore();
                          }
                        })(e),
                      e.scorecard > 0.001 &&
                        ((t) => {
                          let e = t.scorecard,
                            [a, l] = tu(t.time, t.shake);
                          (r.save(),
                            (r.globalAlpha = 0.3 * e),
                            (r.fillStyle = u.bg),
                            r.fillRect(0, 0, i, n),
                            r.translate(a, l),
                            (r.globalAlpha = e),
                            (r.globalCompositeOperation = "lighten"),
                            r.drawImage(tF, 0, 0),
                            (r.globalCompositeOperation = "source-over"));
                          let o = h.curve,
                            d = Math.max(Math.ceil(t.scoreDraw * o.length), 2),
                            c = o.slice(0, Math.min(d, o.length)),
                            p = c[c.length - 1];
                          r.globalAlpha = 0.16 * e;
                          let f = r.createLinearGradient(0, s.y, 0, s.y + s.h);
                          for (let t of (f.addColorStop(0, u.primary),
                          f.addColorStop(1, "rgba(0, 0, 0, 0)"),
                          (r.fillStyle = f),
                          r.beginPath(),
                          r.moveTo(c[0].x, s.y + s.h),
                          c))
                            r.lineTo(t.x, t.y);
                          for (let t of (r.lineTo(p.x, s.y + s.h),
                          r.closePath(),
                          r.fill(),
                          [
                            { width: 12, blur: 34, alphaMul: 0.45 },
                            { width: 5, blur: 10, alphaMul: 1 },
                          ])) {
                            for (let i of ((r.globalAlpha = e * t.alphaMul),
                            (r.strokeStyle = u.primary),
                            (r.shadowColor = u.primary),
                            (r.shadowBlur = t.blur),
                            (r.lineWidth = t.width),
                            (r.lineJoin = "round"),
                            (r.lineCap = "round"),
                            r.beginPath(),
                            r.moveTo(c[0].x, c[0].y),
                            c))
                              r.lineTo(i.x, i.y);
                            r.stroke();
                          }
                          r.shadowBlur = 0;
                          let m = (t, i, n) => {
                              ((r.globalAlpha = e),
                                r.beginPath(),
                                r.arc(t, i, 13, 0, 2 * Math.PI),
                                (r.fillStyle = "rgba(6, 12, 9, 0.85)"),
                                r.fill(),
                                (r.strokeStyle = n),
                                (r.lineWidth = 3.5),
                                (r.shadowColor = n),
                                (r.shadowBlur = 14),
                                r.stroke(),
                                (r.shadowBlur = 0),
                                r.beginPath(),
                                r.arc(t, i, 4.5, 0, 2 * Math.PI),
                                (r.fillStyle = "#FFFFFF"),
                                r.fill());
                            },
                            g = (t) => Math.min(Math.max(t, 84), i - 84);
                          for (let t of h.tradeMarks) {
                            if (d < t.index) continue;
                            let e = o[t.index];
                            m(e.x, e.y, "buy" === t.side ? U : E);
                          }
                          let y = o[h.curveBuyIndex];
                          d >= h.curveBuyIndex &&
                            (m(y.x, y.y, U),
                            tj(g(y.x), y.y + 58, "BUY", U, R, 24, e));
                          let x = o[h.curveSellIndex];
                          (d >= h.curveSellIndex &&
                            (m(x.x, x.y, tt),
                            tj(g(x.x), x.y - 58, J, tt, te, 24, e)),
                            r.restore());
                        })(e),
                      e.glitch > 0.01 && tc && tf)
                    ) {
                      let a = e.glitch,
                        s = Math.floor(24 * e.time),
                        l = th[s % 61] - 0.5,
                        o = th[(s % 61) + 1] - 0.5,
                        u = Math.sign(l || 1) * (12 + 36 * Math.abs(l)) * a,
                        h = Math.sign(o || 1) * (4 + 12 * Math.abs(o)) * a;
                      for (let [e, s, l] of ((tc.globalCompositeOperation =
                        "source-over"),
                      tc.drawImage(t, 0, 0),
                      [
                        ["rgb(255, 46, 84)", u, h],
                        ["rgb(0, 224, 255)", -(0.8 * u), -(0.6 * h)],
                      ]))
                        ((tf.globalCompositeOperation = "source-over"),
                          tf.drawImage(td, 0, 0),
                          (tf.globalCompositeOperation = "multiply"),
                          (tf.fillStyle = e),
                          tf.fillRect(0, 0, i, n),
                          (r.globalCompositeOperation = "lighter"),
                          (r.globalAlpha = 0.85 * a),
                          r.drawImage(tp, s, l));
                      ((r.globalCompositeOperation = "source-over"),
                        (r.globalAlpha = 1));
                    }
                    if (
                      ((r.globalAlpha = 1),
                      tv && r.drawImage(t_, 0, 0),
                      e.flash > 0.004)
                    ) {
                      let t = r.createRadialGradient(
                        i / 2,
                        0.42 * n,
                        0,
                        i / 2,
                        0.42 * n,
                        0.75 * n,
                      );
                      (t.addColorStop(0, "rgba(255, 255, 255, 1)"),
                        t.addColorStop(1, "rgba(255, 255, 255, 0.55)"),
                        (r.globalAlpha = e.flash),
                        (r.fillStyle = t),
                        r.fillRect(0, 0, i, n),
                        (r.globalAlpha = 1));
                    }
                  },
                  layout: h,
                  setStampSchedule: (t, e) => {
                    ((tn = t), e && (ta = e));
                  },
                  setCalloutSchedule: (t) => {
                    ts = t;
                  },
                };
              })(e, t),
              { layout: o } = l,
              u = {
                time: 0,
                camera: { cx: 540, cy: 940, zoom: 1, rot: 0 },
                chartAlpha: 0,
                gridAlpha: 0,
                reveal: 0,
                warp: 0,
                buyMarker: 0,
                marks: 0,
                buyRings: 0,
                crosshair: 0,
                crosshairSpin: 0,
                follow: 0,
                sellMarker: 0,
                flash: 0,
                dim: 0,
                burst: 0,
                scorecard: 0,
                scoreDraw: 0,
                shake: 0,
                glitch: 0,
                multHud: 0,
                multSlam: 0,
                pnlHud: 0,
              };
            u.camera = { ...o.fullCamera };
            let h = t.durationSec,
              d = ((t, e = T(t)) => {
                let r = "social" === t ? w : b,
                  i = M.reduce((t, e) => t + r[e], 0),
                  n = Math.max(0, e - i),
                  a = e < i ? e / i : 1,
                  s = {},
                  l = 0;
                for (let t of M) {
                  let i = (r[t] + ("runUp" === t ? n : 0)) * a;
                  ((s[t] = { start: l / e, end: (l + i) / e }), (l += i));
                }
                return ((s.scorecard.end = 1), s);
              })(t.cut, t.durationSec),
              c = (t) => {
                let e = d[t];
                return {
                  start: e.start * h,
                  end: e.end * h,
                  len: (e.end - e.start) * h,
                };
              },
              p = c("title"),
              f = c("dive"),
              m = c("buy"),
              g = c("runUp"),
              y = c("lock"),
              x = c("flash"),
              _ = c("profit"),
              q = c("scorecard"),
              G = p.len > 0.5,
              { buyAnchor: V, sellAnchor: X } = o,
              Y = t.candles.length,
              H =
                ((n = t.trades),
                (a = t.candles),
                void 0 !== (s = n[n.length - 1]) && "sell" === s.side
                  ? s.t
                  : a[a.length - 1].t),
              K = o.callouts
                .map((t, e) => ({
                  ci: e,
                  mark: t,
                  frac: (t.index + 1) / Y,
                  dwell: k(t.text),
                }))
                .filter((e) => e.mark.index < V.index && S(e.mark, H, t.cut))
                .sort((t, e) => t.frac - e.frac),
              Q = K.reduce((t, e) => t + e.dwell + 0.6, 0),
              J = Math.min(Q, Math.max(0, g.len - 1.5)),
              Z = Q > 0 ? J / Q : 0,
              tt = { start: m.start + J, end: m.end + J, len: m.len },
              te = { start: g.start + J, end: g.end, len: g.len - J },
              tr = K.length > 0 ? K[0].frac : o.buyFrac,
              ti = K.length > 0 ? K[0].mark : V,
              tn = o.callouts.map(() => null),
              ta = F(0x85ebca6b ^ t.seed, 64),
              ts = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789$#%&",
              tl = F(0x5bd1e995 ^ t.seed, 128),
              to = F(0x5bd1e995, 128);
            (nA.set([r.title, r.counter, r.badge], { autoAlpha: 0 }),
              nA.set([r.titleGhostA, r.titleGhostB], { autoAlpha: 0 }),
              nA.set(r.stampWords, { autoAlpha: 0 }),
              r.stampShines &&
                r.stampShines.length > 0 &&
                nA.set(r.stampShines, { autoAlpha: 0 }),
              r.coinChip && nA.set(r.coinChip, { autoAlpha: 0 }),
              r.stats && nA.set(r.stats, { autoAlpha: 0 }),
              r.bgWrap && nA.set(r.bgWrap, { autoAlpha: 0 }),
              r.miniCoin && nA.set(r.miniCoin, { autoAlpha: 0 }),
              r.miniBar && nA.set(r.miniBar, { autoAlpha: 0 }));
            let tu = nA.timeline({ paused: !0, defaults: { ease: "none" } });
            tu.set(u, { reveal: 0 }, 0);
            let th = G ? (r.introVideo ?? null) : null;
            tu.to(u, { gridAlpha: 1, duration: 0.5, ease: "power1.out" }, 0.04);
            let td = [];
            if (G) {
              th &&
                (tu.set(th, { autoAlpha: 1, scale: 1 }, 0),
                tu.to(
                  th,
                  {
                    autoAlpha: 0,
                    scale: 1.16,
                    duration: 0.3,
                    ease: "power2.in",
                  },
                  f.start - 0.3,
                ));
              let e = r.titleLetters ?? [],
                i = t.titleText.replace(/\s+/g, "").split(""),
                n = p.start + 0.07 * p.len,
                a = p.start + 0.34 * p.len;
              (tu.set(r.title, { autoAlpha: 1 }, n),
                e.forEach((t, e) => {
                  let r = n + 0.045 * e;
                  (td.push(r), tu.set(t, { autoAlpha: 1 }, r));
                }),
                tu.fromTo(
                  r.titleGhostA,
                  { autoAlpha: 0, x: 0 },
                  { autoAlpha: 0.5, x: 14, duration: 0.07, ease: "power1.out" },
                  a,
                ),
                tu.to(
                  r.titleGhostA,
                  { autoAlpha: 0, x: 0, duration: 0.12, ease: "power2.out" },
                  a + 0.07,
                ),
                tu.fromTo(
                  r.titleGhostB,
                  { autoAlpha: 0, x: 0 },
                  {
                    autoAlpha: 0.45,
                    x: -11,
                    duration: 0.07,
                    ease: "power1.out",
                  },
                  a,
                ),
                tu.to(
                  r.titleGhostB,
                  { autoAlpha: 0, x: 0, duration: 0.12, ease: "power2.out" },
                  a + 0.07,
                ),
                e.length > 0 &&
                  tu.to(
                    { p: 0 },
                    {
                      p: 1,
                      duration: a + 0.3 - n,
                      ease: "none",
                      onUpdate: () => {
                        let t = tu.time(),
                          r = Math.floor(30 * t);
                        e.forEach((e, n) => {
                          let s = e.firstChild,
                            l = i[n] ?? "";
                          s &&
                            l &&
                            (t < a
                              ? s.nodeValue !== l && (s.nodeValue = l)
                              : (s.nodeValue =
                                  ts[
                                    Math.floor(
                                      to[(7 * r + 13 * n) % 127] * ts.length,
                                    )
                                  ]));
                        });
                      },
                    },
                    n,
                  ),
                e.forEach((t, e) => {
                  tu.to(
                    t,
                    { autoAlpha: 0, duration: 0.05 },
                    a + 0.1 + 0.02 * e,
                  );
                }),
                tu.set(r.title, { autoAlpha: 0 }, a + 0.5));
            }
            (tu.to(
              u.camera,
              { zoom: 5.6, duration: 0.52 * f.len, ease: "power2.inOut" },
              f.start,
            ),
              tu.to(
                u.camera,
                { zoom: 2.6, duration: 0.48 * f.len, ease: "power2.inOut" },
                f.start + 0.52 * f.len,
              ),
              tu.to(
                u.camera,
                {
                  cx: ti.x,
                  cy: ti.y,
                  duration: 0.72 * f.len,
                  ease: "power2.inOut",
                },
                f.start,
              ),
              tu.to(
                u.camera,
                {
                  keyframes: [
                    {
                      rot: -0.03,
                      duration: 0.35 * f.len,
                      ease: "power2.inOut",
                    },
                    {
                      rot: 0.015,
                      duration: 0.28 * f.len,
                      ease: "power2.inOut",
                    },
                    { rot: 0, duration: 0.15 * f.len, ease: "power1.out" },
                  ],
                },
                f.start + 0.22 * f.len,
              ),
              tu.to(
                u,
                {
                  keyframes: [
                    { warp: 1, duration: 0.45 * f.len, ease: "power2.in" },
                    { warp: 0, duration: 0.55 * f.len, ease: "power2.out" },
                  ],
                },
                f.start,
              ),
              tu.to(
                u,
                { chartAlpha: 1, duration: 0.5 * f.len, ease: "power1.inOut" },
                f.start,
              ),
              tu.to(
                u,
                { reveal: tr, duration: 0.72 * f.len, ease: "power2.inOut" },
                f.start,
              ));
            {
              let t = f.end;
              K.forEach((e, r) => {
                let i = e.dwell * Z;
                ((tn[e.ci] = { at: t, dwell: i }), (t += i));
                let n = K[r + 1],
                  a = n ? n.frac : o.buyFrac,
                  s = n ? n.mark : V,
                  l = 0.6 * Z;
                (l > 1e-4 &&
                  (tu.to(u, { reveal: a, duration: l, ease: "sine.inOut" }, t),
                  tu.to(
                    u.camera,
                    { cx: s.x, cy: s.y, duration: l, ease: "sine.inOut" },
                    t,
                  )),
                  (t += l));
              });
            }
            let tc = f.start + 0.6 * f.len;
            (r.miniCoin &&
              tu.fromTo(
                r.miniCoin,
                { autoAlpha: 0, y: -16 },
                { autoAlpha: 1, y: 0, duration: 0.32, ease: "power2.out" },
                tc,
              ),
              r.miniBar &&
                tu.fromTo(
                  r.miniBar,
                  { autoAlpha: 0, y: 14 },
                  { autoAlpha: 1, y: 0, duration: 0.32, ease: "power2.out" },
                  tc + 0.08,
                ),
              tu.fromTo(
                u,
                { buyMarker: 0 },
                { buyMarker: 1, duration: 0.34, ease: "back.out(1.7)" },
                tt.start + 0.05,
              ),
              tu.to(u, { shake: 0.7, duration: 0.04 }, tt.start + 0.05),
              tu.to(
                u,
                { shake: 0, duration: 0.32, ease: "power2.out" },
                tt.start + 0.09,
              ),
              tu.fromTo(
                u,
                { buyRings: 0 },
                { buyRings: 1, duration: 0.78 * tt.len, ease: "power1.out" },
                tt.start + 0.1,
              ),
              tu.to(
                u,
                { marks: 1, duration: 0.3, ease: "power1.out" },
                tt.start + 0.12,
              ),
              tu.to(
                u.camera,
                {
                  cy: V.y - 40,
                  zoom: 2.9,
                  duration: tt.len,
                  ease: "sine.inOut",
                },
                tt.start,
              ));
            let tp = Math.min((o.sellAnchor.index + 1) / t.candles.length, 1),
              tf = tp - o.buyFrac,
              tm = (t) => (1 - Math.cos(Math.PI * t)) / 2,
              tg = (t) =>
                Math.acos(Math.min(Math.max(1 - 2 * t, -1), 1)) / Math.PI,
              ty = o.callouts
                .map((e, r) => ({
                  ci: r,
                  frac: Math.min(Math.max((e.index + 1) / Y, o.buyFrac), tp),
                  dwell: k(e.text),
                  eligible: e.index >= V.index && S(e, H, t.cut),
                }))
                .filter((t) => t.eligible && tf > 1e-4)
                .sort((t, e) => t.frac - e.frac),
              tx = [];
            if (0 === ty.length)
              tx.push({
                from: o.buyFrac,
                to: tp,
                start: te.start,
                len: te.len,
                ease: "power1.in",
                inv: Math.sqrt,
              });
            else {
              let t = ty.reduce((t, e) => t + e.dwell, 0),
                e = te.len - t < 0.6 ? Math.max(0, te.len - 0.6) / t : 1,
                r = te.len - t * e,
                i = [o.buyFrac, ...ty.map((t) => t.frac), tp],
                n = i.slice(1).map((t, e) => Math.max(t - i[e], 0)),
                a = n.filter((t) => t > 1e-9).length,
                s = n.reduce((t, e) => t + e, 0),
                l = Math.min(0.6, a > 0 ? (0.6 * r) / a : 0),
                u = Math.max(0, r - l * a),
                h = n.map((t) =>
                  t > 1e-9 ? l + (s > 0 ? (u * t) / s : 0) : 0,
                ),
                d = o.buyFrac,
                c = te.start,
                p = (t, e, r) => {
                  let n = i[t + 1];
                  (tx.push({
                    from: d,
                    to: n,
                    start: c,
                    len: h[t],
                    ease: e,
                    inv: r,
                  }),
                    (c += h[t]),
                    (d = n));
                };
              (ty.forEach((t, r) => {
                p(r, tm, tg);
                let i = t.dwell * e;
                ((tn[t.ci] = { at: c, dwell: i }), (c += i));
              }),
                p(ty.length, "power1.in", Math.sqrt));
            }
            for (let t of tx)
              t.len <= 1e-4 ||
                t.to - t.from <= 1e-9 ||
                tu.to(
                  u,
                  { reveal: t.to, duration: t.len, ease: t.ease },
                  t.start,
                );
            l.setCalloutSchedule(tn);
            let t_ = (t) => {
                if (tf <= 1e-4 || t <= o.buyFrac || t > tp) return null;
                for (let e of tx) {
                  if (t > e.to + 1e-9) continue;
                  let r = e.to - e.from;
                  if (r <= 1e-9) continue;
                  let i = Math.min(Math.max((t - e.from) / r, 0), 1);
                  return e.start + e.inv(i) * e.len;
                }
                return null;
              },
              tv = ty[0],
              tb = tv ? tn[tv.ci] : null;
            (null !== tb && tb.at - 0.75 < te.start + 0.35 + 0.25
              ? tu.to(
                  u,
                  { follow: 1, duration: 1.05, ease: "power2.inOut" },
                  tb.at + tb.dwell,
                )
              : tu.to(
                  u,
                  { follow: 1, duration: 0.35, ease: "power2.out" },
                  te.start,
                ),
              tu.to(
                u.camera,
                {
                  cx: X.x - 60,
                  cy: X.y + 130,
                  zoom: 2.25,
                  duration: te.len,
                  ease: "power2.inOut",
                },
                te.start,
              ),
              tu.to(
                u,
                { multHud: 1, duration: 0.3, ease: "power1.out" },
                te.start + 0.25,
              ),
              tu.to(
                u,
                { multHud: 0, duration: 0.16, ease: "power1.in" },
                x.start - 0.05,
              ),
              tu.to(
                u,
                { pnlHud: 1, duration: 0.3, ease: "power1.out" },
                tt.start + 0.35,
              ),
              tu.to(
                u,
                { pnlHud: 0, duration: 0.2, ease: "power1.in" },
                _.start,
              ));
            let tw = o.tradeMarks.map(() => null),
              tM = -1;
            for (let t = 0; t < o.tradeMarks.length; t++) {
              let e = o.tradeMarks[t],
                r = t_((e.index + 1) / Y);
              if (null === r || ((tw[t] = r), r - tM < 0.14)) continue;
              tM = r;
              let i = "buy" === e.side ? 0.5 : 0.35;
              (tu.to(u, { shake: i, duration: 0.03 }, r),
                tu.to(
                  u,
                  { shake: 0, duration: 0.22, ease: "power2.out" },
                  r + 0.03,
                ));
            }
            let tT = t.trades[t.trades.length - 1],
              tk = void 0 !== tT && "sell" === tT.side,
              tS = {
                marks: tw,
                buyAt: tt.start + 0.05,
                sellAt: tk ? x.start + 0.06 : null,
              };
            (l.setStampSchedule(tw, tS),
              tu.to(
                u,
                { follow: 0, duration: 0.5, ease: "power2.inOut" },
                y.start,
              ),
              tu.to(
                u,
                { reveal: 1, duration: y.len + x.len, ease: "power1.inOut" },
                y.start,
              ),
              tu.fromTo(
                u,
                { crosshair: 0 },
                { crosshair: 1, duration: 0.62 * y.len, ease: "power3.out" },
                y.start,
              ),
              tu.fromTo(
                u,
                { crosshairSpin: 0 },
                { crosshairSpin: 1, duration: y.len, ease: "power1.out" },
                y.start,
              ),
              tu.to(
                u.camera,
                {
                  cx: X.x,
                  cy: X.y + 60,
                  zoom: 2.42,
                  duration: y.len,
                  ease: "power1.inOut",
                },
                y.start,
              ),
              tu.to(
                u,
                {
                  keyframes: [
                    { flash: 1, duration: 0.07, ease: "power4.in" },
                    { flash: 0, duration: 0.26, ease: "power2.out" },
                  ],
                },
                x.start,
              ),
              tu.fromTo(
                u,
                { sellMarker: 0 },
                { sellMarker: 1, duration: 0.3, ease: "back.out(1.7)" },
                x.start + 0.06,
              ),
              tu.to(u, { shake: 1.35, duration: 0.04 }, x.start + 0.04),
              tu.to(
                u,
                { shake: 0, duration: 0.55, ease: "power2.out" },
                x.start + 0.08,
              ),
              tu.fromTo(
                u,
                { multSlam: 0 },
                { multSlam: 1, duration: 0.34, ease: "back.out(2.1)" },
                x.start + 0.12,
              ),
              tu.to(
                u,
                { multSlam: 0, duration: 0.28, ease: "power2.in" },
                _.start + 0.08,
              ),
              tu.set(u, { glitch: 1 }, x.start + 0.04),
              tu.to(
                u,
                { glitch: 0, duration: 0.22, ease: "power3.in" },
                x.start + 0.16,
              ),
              tu.to(
                u.camera,
                { zoom: 2.58, duration: 0.05, ease: "power4.out" },
                x.start,
              ),
              tu.to(
                u.camera,
                { zoom: 2.42, duration: 0.35, ease: "power2.out" },
                x.start + 0.05,
              ),
              tu.to(
                u,
                { crosshair: 0.93, duration: 0.05, ease: "power3.out" },
                x.start + 0.04,
              ),
              tu.to(
                u,
                { crosshair: 1, duration: 0.3, ease: "power2.out" },
                x.start + 0.09,
              ),
              tu.to(
                u,
                { crosshair: 0, duration: 0.25, ease: "power1.in" },
                _.start,
              ),
              tu.to(u, { dim: 1, duration: 0.3, ease: "power1.out" }, _.start),
              tu.fromTo(
                u,
                { burst: 0 },
                { burst: 1, duration: 0.92 * _.len, ease: "power2.out" },
                _.start + 0.04,
              ),
              tu.fromTo(
                r.counter,
                { autoAlpha: 0, scale: 0.55 },
                {
                  autoAlpha: 1,
                  scale: 1,
                  duration: 0.34,
                  ease: "back.out(1.9)",
                },
                _.start + 0.08,
              ));
            let tA = { p: 0 },
              tF = Math.min(1.15, 0.62 * _.len);
            (tu.fromTo(
              tA,
              { p: 0 },
              {
                p: 1,
                duration: tF,
                ease: "expo.out",
                onUpdate: () => {
                  let e = tA.p,
                    i = 0.55 + 1.9 * ta[Math.floor(30 * u.time) % 62],
                    n = t.profitUsd * (e + (1 - e) * i);
                  if (
                    ((r.counterValue.textContent = `${n < 0 ? "-" : "+"}$${Math.round(Math.abs(n)).toLocaleString("en-US")}`),
                    r.counterPct && null !== t.profitPct)
                  ) {
                    let n = t.profitPct * (e + (1 - e) * i);
                    r.counterPct.textContent = `${n < 0 ? "" : "+"}${Math.round(n)}%`;
                  }
                },
              },
              _.start + 0.12,
            ),
              tu.to(
                r.counter,
                {
                  autoAlpha: 0,
                  scale: 0.92,
                  duration: 0.22,
                  ease: "power2.in",
                },
                q.start + 0.02,
              ),
              tu.to(
                u,
                { scorecard: 1, duration: 0.3, ease: "power1.inOut" },
                q.start,
              ));
            let tC = q.start + 0.05;
            (r.bgWrap &&
              tu.to(
                r.bgWrap,
                { autoAlpha: 1, duration: 0.7, ease: "power1.inOut" },
                tC,
              ),
              tu.fromTo(
                u,
                { scoreDraw: 0 },
                {
                  scoreDraw: 1,
                  duration: Math.min(1.05, 0.5 * q.len),
                  ease: "power2.inOut",
                },
                q.start + 0.18,
              ));
            let tP = q.len > 2,
              tj = tP ? 0.16 : 0.08,
              tO = tP ? 0.5 : 0.22,
              tU = [],
              tR = t.stampText.split(/\s+/).filter(Boolean);
            r.stampWords.forEach((t, e) => {
              let r = q.start + tO + e * tj,
                i = r + 0.14;
              (tU.push(i),
                tu.fromTo(
                  t,
                  { autoAlpha: 0, scale: 3, letterSpacing: "0.24em" },
                  {
                    autoAlpha: 1,
                    scale: 1.02,
                    letterSpacing: "0.01em",
                    duration: 0.14,
                    ease: "power4.in",
                  },
                  r,
                ),
                tu.to(t, { scale: 1, duration: 0.1, ease: "power2.out" }, i),
                tu.fromTo(
                  t,
                  { filter: "brightness(2.7)" },
                  {
                    filter: "brightness(1)",
                    duration: 0.26,
                    ease: "power3.out",
                  },
                  i,
                ));
              let n = tR[e] ?? "",
                a = t.firstChild;
              if (n && a) {
                let t = { p: 0 };
                tu.fromTo(
                  t,
                  { p: 0 },
                  {
                    p: 1,
                    duration: tP ? 0.42 : 0.28,
                    ease: "none",
                    onUpdate: () => {
                      let r = Math.floor(30 * u.time),
                        i = "";
                      for (let a = 0; a < n.length; a++) {
                        let s = (a + 1) / (n.length + 1);
                        t.p >= s
                          ? (i += n[a])
                          : (i +=
                              ts[
                                Math.floor(
                                  tl[(7 * r + 13 * a + 29 * e) % 127] *
                                    ts.length,
                                )
                              ]);
                      }
                      a.nodeValue = i;
                    },
                  },
                  r,
                );
              }
              (tu.to(u, { shake: 0.45, duration: 0.03 }, i),
                tu.to(
                  u,
                  { shake: 0, duration: 0.22, ease: "power2.out" },
                  i + 0.03,
                ));
            });
            let tE = r.stampShines ?? [];
            if (tE.length > 0) {
              let t =
                  q.start +
                  tO +
                  (r.stampWords.length - 1) * tj +
                  0.14 +
                  (tP ? 0.3 : 0.16),
                e = tP ? 0.55 : 0.42;
              tE.forEach((r, i) => {
                let n = t + 0.08 * i;
                (tu.set(r, { autoAlpha: 1 }, n),
                  tu.fromTo(
                    r,
                    { backgroundPosition: "120% 0" },
                    {
                      backgroundPosition: "-20% 0",
                      duration: e,
                      ease: "power1.inOut",
                    },
                    n,
                  ),
                  tu.set(r, { autoAlpha: 0 }, n + e));
              });
            }
            let tz = q.start + tO + r.stampWords.length * tj + 0.08 * !!tP;
            r.coinChip &&
              tu.fromTo(
                r.coinChip,
                { autoAlpha: 0, x: -28 },
                { autoAlpha: 1, x: 0, duration: 0.26, ease: "power3.out" },
                tz,
              );
            let tN = tz + (tP ? 0.18 : 0.04),
              tI = tN + 0.18;
            (tu.fromTo(
              r.badge,
              { autoAlpha: 0, scale: 2.4, transformOrigin: "left center" },
              { autoAlpha: 1, scale: 1.03, duration: 0.18, ease: "power4.in" },
              tN,
            ),
              tu.to(
                r.badge,
                { scale: 1, duration: 0.12, ease: "power2.out" },
                tI,
              ),
              tu.fromTo(
                r.badge,
                { filter: "brightness(2.6)" },
                { filter: "brightness(1)", duration: 0.3, ease: "power3.out" },
                tI,
              ),
              tu.to(u, { shake: 0.6, duration: 0.03 }, tI),
              tu.to(
                u,
                { shake: 0, duration: 0.26, ease: "power2.out" },
                tI + 0.03,
              ));
            let tB = tI + (tP ? 0.24 : 0.06);
            (r.stats &&
              tu.fromTo(
                r.stats,
                { autoAlpha: 0, y: 26 },
                {
                  autoAlpha: 1,
                  y: 0,
                  duration: tP ? 0.34 : 0.24,
                  ease: "power3.out",
                },
                tB,
              ),
              r.miniCoin &&
                tu.to(
                  r.miniCoin,
                  { autoAlpha: 0, duration: 0.22, ease: "power1.in" },
                  q.start + tO - 0.1,
                ),
              tu.to(
                u,
                { glitch: 0.85, duration: 0.22, ease: "power2.in" },
                h - 0.5,
              ),
              tu.to(
                u,
                { glitch: 0, duration: 0.2, ease: "power2.out" },
                h - 0.24,
              ),
              tu.set({ v: 0 }, { v: 1 }, h));
            let t$ = (t, e, r, i) => {
                let n = () =>
                  t && Number.isFinite(t.duration) && t.duration > 0
                    ? t.duration
                    : i;
                return {
                  syncLive: () => {
                    if (!t) return;
                    let i = tu.time();
                    if (tu.isActive() && i >= e - 0.05 && i < r) {
                      let r = n(),
                        a = Math.min(Math.max(i - e, 0), Math.max(r - 0.05, 0));
                      (Math.abs(t.currentTime - a) > 0.25 &&
                        (t.currentTime = a),
                        t.paused &&
                          !(a >= r - 0.12) &&
                          t.play().catch(() => void 0));
                    } else t.paused || t.pause();
                  },
                  seekTo: (r) => {
                    t &&
                      (t.pause(),
                      (t.currentTime = Math.min(
                        Math.max(r - e, 0),
                        Math.max(n() - 0.05, 0),
                      )));
                  },
                };
              },
              tD = t$(th, p.start, f.start, Math.max(p.len, 0.5)),
              tL = t$(r.bgVideo ?? null, tC, h, 5),
              tW = [];
            {
              if ((tW.push({ at: f.start, kind: "whoosh", gain: 0.42 }), G)) {
                for (let t of td)
                  tW.push({ at: t, kind: "tick", gain: 0.09, pitch: 1.4 });
                tW.push({ at: 0.34 * p.len, kind: "acquire", gain: 0.26 });
                let e = t.intro?.durationSeconds ?? p.len,
                  r = t.intro?.fireAt ?? 0.7;
                tW.push({
                  at: p.start + Math.min(r * e, p.len - 0.05),
                  kind: "shot",
                  gain: 0.5,
                });
              }
              tW.push({
                at: tt.start + 0.05,
                kind: "ding",
                gain: 0.44,
                pitch: 0.85,
              });
              let e = -1;
              for (let t = 0; t < tw.length; t++) {
                let r = tw[t];
                if (null === r || r - e < 0.09) continue;
                e = r;
                let i = "buy" === o.tradeMarks[t].side;
                tW.push(
                  i
                    ? { at: r, kind: "ding", gain: 0.26 }
                    : { at: r, kind: "chaching", gain: 0.42 },
                );
              }
              for (let t = 0; t < tn.length; t++) {
                let e = tn[t];
                if (null === e) continue;
                tW.push({ at: e.at, kind: "acquire", gain: 0.18 });
                let r = o.callouts[t].text.length;
                for (let t = 0; t < r; t += 4)
                  tW.push({
                    at: e.at + 0.24 + 0.016 * t,
                    kind: "tick",
                    gain: 0.07,
                    pitch: 1.3,
                  });
              }
              (tW.push({ at: x.start + 0.04, kind: "impact", gain: 0.6 }),
                tk &&
                  tW.push({
                    at: x.start + 0.06,
                    kind: "chaching",
                    gain: 0.58,
                  }));
              for (let t = 0; t < 16; t++)
                tW.push({
                  at: _.start + 0.12 + (t / 16) * tF * 0.92,
                  kind: "tick",
                  gain: 0.15,
                  pitch: 1 + (t / 16) * 0.9,
                });
              for (let t = 0; t < tU.length; t++)
                tW.push({
                  at: tU[t],
                  kind: "stinger",
                  gain: 0.34,
                  pitch: 1 - 0.06 * t,
                });
              (tW.push({ at: tI, kind: "stinger", gain: 0.46, pitch: 0.72 }),
                tW.push({ at: tC, kind: "whoosh", gain: 0.16 }));
            }
            (i.sound?.setCues(tW), i.sound?.setDuration(t.durationSec));
            let tq = () => {
              (tD.syncLive(),
                tL.syncLive(),
                i.sound?.tick(tu.time(), tu.isActive()));
            };
            (tu.eventCallback("onUpdate", () => {
              ((u.time = tu.time()),
                l.draw(u),
                tq(),
                i.onProgress?.(tu.progress()));
            }),
              tu.eventCallback("onComplete", () => {
                i.onEnded?.();
              }),
              tu.render(0, !0, !0),
              l.draw(u));
            let tG = (t, e) => {
              let r = tu.eventCallback("onUpdate");
              (e || tu.eventCallback("onUpdate", null),
                tu.pause(t, !1),
                e || tu.eventCallback("onUpdate", r),
                (u.time = tu.time()),
                tD.seekTo(t),
                tL.seekTo(t),
                e && l.draw(u));
            };
            return {
              timeline: tu,
              layout: o,
              state: u,
              meta: {
                introEndSec: G ? Math.max(0, f.start - 0.3) : 0,
                videoWindows: [
                  ...(G ? [{ start: 0, end: f.start }] : []),
                  { start: tC, end: h },
                ],
              },
              stampSchedule: tS,
              calloutSchedule: { dwells: tn },
              renderAt: (t) => tG(t, !0),
              seekState: (t) => tG(t, !1),
              drawFrame: () => {
                ((u.time = tu.time()), l.draw(u));
              },
              pause: () => {
                (tu.pause(), tq());
              },
              dispose: () => {
                tu.kill();
              },
            };
          })(t, ty, tb, {
            onProgress: (t) => tm.current?.(t),
            onEnded: () => {
              (tF(!1), tg.current?.());
            },
            sound: tw,
          });
        ((tx.current = tT), (tj.current = !1));
        let tk = y.current,
          tS = !1,
          tA = null,
          tC = () => {
            tU(e);
          },
          tO = () => {},
          tU = (e) => {
            tS ||
              ((tS = !0),
              (tj.current = !0),
              null !== tA && (window.clearTimeout(tA), (tA = null)),
              null !== tk &&
                (tk.removeEventListener("canplaythrough", tC),
                tk.removeEventListener("error", tO)),
              tP(!1),
              tf.current?.(t.durationSec),
              e && tT.timeline.play(),
              tF(e));
          },
          tE = () => {
            (tU(!1),
              tT.timeline.progress() >= 1
                ? tT.timeline.pause(0).play()
                : tT.timeline.play(),
              tF(!0));
          },
          tz = () => {
            (tU(!1), tT.pause(), tF(!1));
          },
          tN = () => {
            (tU(!1), tT.timeline.pause(0).play(), tF(!0));
          };
        r && (r.current = { play: tE, pause: tz, restart: tN, setSound: tR });
        let tI = window;
        return (
          (tI.__replay = {
            seek: (t) => {
              (tU(!1), tT.renderAt(t));
            },
            seekState: (t) => {
              (tU(!1), tT.seekState(t));
            },
            play: tE,
            pause: tz,
            restart: tN,
            setSound: tR,
            duration: t.durationSec,
            state: tT.state,
            soundStream: () => tw.captureStream(),
            introEndSec: tT.meta.introEndSec,
            videoWindows: tT.meta.videoWindows,
            renderAudioOffline: async () => {
              let e = await tw.renderOffline(t.durationSec),
                r = "";
              for (let t = 0; t < e.length; t += 32768)
                r += String.fromCharCode(...e.subarray(t, t + 32768));
              return btoa(r);
            },
            fontsReady: tM,
            bake: {
              props: t,
              layout: tT.layout,
              stampSchedule: tT.stampSchedule,
              calloutSchedule: tT.calloutSchedule,
            },
          }),
          null !== tk &&
          tk.getAttribute("src") !== nF &&
          tk.readyState < HTMLMediaElement.HAVE_FUTURE_DATA
            ? (tP(!0),
              (tA = window.setTimeout(tC, 3e3)),
              tk.addEventListener("canplaythrough", tC, { once: !0 }),
              tk.addEventListener("error", tO, { once: !0 }))
            : tU(e),
          () => {
            ((tS = !0),
              null !== tA && window.clearTimeout(tA),
              null !== tk &&
                (tk.removeEventListener("canplaythrough", tC),
                tk.removeEventListener("error", tO)),
              tT.dispose(),
              tw.dispose(),
              (t_.current = null),
              (tx.current = null),
              r && (r.current = null),
              delete tI.__replay);
          }
        );
      }, [t, e, r, tR]);
      let tE = () => {
          (tx.current?.timeline.pause(0).play(),
            tF(!0),
            t_.current?.setEnabled(tv.current));
        },
        tz = "loss" === t.theme ? "#FF4D5E" : "#2BFF88";
      (0, c.useLayoutEffect)(() => {
        let e = tp.current;
        if (!e) return;
        let r = () => {
          let t = nj(td.current);
          if (0 === t.length) return;
          for (let e of t) e.style.fontSize = "104px";
          let r =
              t.reduce((t, e) => t + e.offsetWidth, 0) + 30 * (t.length - 1),
            i = Math.max(
              44,
              Math.floor(104 * Math.min(1, e.clientWidth / Math.max(r, 1))),
            );
          for (let e of t) e.style.fontSize = `${i}px`;
        };
        r();
        let i = !1,
          n = () => {
            i || r();
          };
        return (
          document.fonts
            .load('700 104px "Hitmarker Text"', t.stampText)
            .then(n)
            .catch(() => {}),
          document.fonts.ready.then(n),
          document.fonts.addEventListener("loadingdone", n),
          () => {
            ((i = !0), document.fonts.removeEventListener("loadingdone", n));
          }
        );
      }, [t.stampText]);
      let tN =
          "square" === tO
            ? {
                titleTop: 340,
                counterTop: 360,
                stampTop: 56,
                chipTop: 186,
                miniCoinTop: 74,
                badgeTop: 296,
                statsTop: 880,
                controls: { top: 20 },
                miniBarBottom: 28,
              }
            : {
                titleTop: 660,
                counterTop: 700,
                stampTop: 120,
                chipTop: 258,
                miniCoinTop: 132,
                badgeTop: 402,
                statsTop: 1478,
                controls: { bottom: 290 },
                miniBarBottom: 150,
              },
        tI = t.stampText.split(/\s+/).filter(Boolean),
        tB = t.titleText.split(/\s+/).filter(Boolean),
        t$ = tB.reduce(
          (t, e, r) => (t.push(0 === r ? 0 : t[r - 1] + tB[r - 1].length), t),
          [],
        ),
        tD = "full" === t.cut;
      return (0, i.jsx)("div", {
        ref: f,
        className: "relative h-full w-full overflow-hidden bg-black",
        onClick: tE,
        children: (0, i.jsxs)("div", {
          ref: m,
          className: "absolute left-0 top-0 origin-top-left",
          style: { width: tU.w, height: tU.h },
          children: [
            (0, i.jsxs)("div", {
              ref: H,
              className: "absolute inset-0 opacity-0",
              children: [
                (0, i.jsx)("video", {
                  ref: Y,
                  src: ((d = t.theme), _(`/replay/bg-${d}.mp4?v=6`)),
                  className: "h-full w-full object-cover",
                  style: { filter: "brightness(0.62) saturate(1.2)" },
                  muted: !0,
                  playsInline: !0,
                  preload: "metadata",
                }),
                (0, i.jsx)("div", {
                  className: "absolute inset-0",
                  style: {
                    background:
                      "radial-gradient(ellipse 90% 62% at 50% 44%, rgba(0, 0, 0, 0.5) 0%, rgba(0, 0, 0, 0.18) 60%, rgba(0, 0, 0, 0.55) 100%)",
                  },
                }),
              ],
            }),
            (0, i.jsx)("canvas", {
              ref: g,
              width: tU.w,
              height: tU.h,
              className: "absolute left-0 top-0",
              style: { width: tU.w, height: tU.h },
            }),
            tD
              ? (0, i.jsx)("video", {
                  ref: y,
                  src: tS,
                  "data-replay-intro": !0,
                  className:
                    "absolute left-0 top-0 h-full w-full object-cover opacity-0",
                  muted: !0,
                  playsInline: !0,
                  preload: "auto",
                  onError: () => {
                    null === tk || tj.current || tT(tk);
                  },
                })
              : null,
            t.coinSymbol || t.coinImageUrl
              ? (0, i.jsxs)("div", {
                  ref: tl,
                  className:
                    "pointer-events-none absolute flex items-center opacity-0",
                  style: {
                    left: 48,
                    top: tN.miniCoinTop,
                    gap: 16,
                    padding: "12px 22px 12px 14px",
                    borderRadius: 22,
                    background: "rgba(6, 12, 9, 0.55)",
                    border: "1px solid rgba(255, 255, 255, 0.14)",
                    backdropFilter: "blur(10px)",
                    WebkitBackdropFilter: "blur(10px)",
                    fontFamily: nC,
                  },
                  children: [
                    t.coinImageUrl
                      ? (0, i.jsx)("img", {
                          src: t.coinImageUrl,
                          alt: "",
                          className: "shrink-0 object-cover",
                          style: {
                            width: 64,
                            height: 64,
                            borderRadius: 13,
                            border: "1.5px solid rgba(255, 255, 255, 0.22)",
                          },
                        })
                      : null,
                    (0, i.jsxs)("div", {
                      className: "select-none",
                      style: {
                        fontSize: 38,
                        fontWeight: 700,
                        letterSpacing: 1,
                        color: "#F4FFF9",
                      },
                      children: [
                        "$",
                        (t.coinSymbol || "?").toUpperCase().slice(0, 12),
                      ],
                    }),
                  ],
                })
              : null,
            (0, i.jsxs)("div", {
              ref: to,
              className:
                "pointer-events-none absolute inset-x-0 flex items-center justify-between opacity-0",
              style: {
                bottom: tN.miniBarBottom,
                padding: "0 56px",
                fontFamily: nC,
              },
              children: [
                (0, i.jsxs)("div", {
                  className: "flex min-w-0 items-center",
                  style: { gap: 16 },
                  children: [
                    (0, i.jsx)("img", {
                      src: t.userImageUrl ?? nP,
                      alt: "",
                      className: "shrink-0 rounded-full object-cover",
                      style: {
                        width: 56,
                        height: 56,
                        border: "2px solid rgba(255, 255, 255, 0.28)",
                        boxShadow: "0 2px 12px rgba(0, 0, 0, 0.6)",
                      },
                    }),
                    (0, i.jsx)("div", {
                      className:
                        "select-none overflow-hidden text-ellipsis whitespace-nowrap",
                      style: {
                        fontSize: 44,
                        fontWeight: 700,
                        color: "rgba(247, 255, 251, 0.92)",
                        maxWidth: 560,
                        textShadow: "0 2px 12px rgba(0, 0, 0, 0.8)",
                      },
                      children: t.username || "anon",
                    }),
                  ],
                }),
                (0, i.jsxs)("div", {
                  className: "flex shrink-0 items-center",
                  style: { gap: 12 },
                  children: [
                    (0, i.jsx)("img", {
                      src: "/logo.png",
                      alt: "",
                      style: { width: 35, height: 35, opacity: 0.95 },
                    }),
                    (0, i.jsx)("div", {
                      className: "select-none",
                      style: {
                        fontSize: 44,
                        lineHeight: 1,
                        fontWeight: 700,
                        fontFamily:
                          "var(--font-sans), Geist, system-ui, sans-serif",
                        letterSpacing: "-0.01em",
                        color: "rgba(255, 255, 255, 0.92)",
                        textShadow: "0 2px 12px rgba(0, 0, 0, 0.8)",
                      },
                      children: "pump.fun",
                    }),
                  ],
                }),
              ],
            }),
            (0, i.jsx)("div", {
              ref: K,
              className: "absolute inset-x-0 flex justify-center opacity-0",
              style: { top: tN.titleTop },
              children: (0, i.jsxs)("div", {
                className: "relative text-center",
                children: [
                  (0, i.jsx)("div", {
                    ref: Z,
                    "aria-hidden": !0,
                    className:
                      "absolute inset-0 select-none whitespace-pre-wrap uppercase",
                    style: {
                      fontSize: 150,
                      lineHeight: 0.92,
                      fontWeight: 700,
                      fontFamily: nC,
                      color: "#FF3B5C",
                      opacity: 0.4,
                    },
                    children: t.titleText,
                  }),
                  (0, i.jsx)("div", {
                    ref: tt,
                    "aria-hidden": !0,
                    className:
                      "absolute inset-0 select-none whitespace-pre-wrap uppercase",
                    style: {
                      fontSize: 150,
                      lineHeight: 0.92,
                      fontWeight: 700,
                      fontFamily: nC,
                      color: "#39D9FF",
                      opacity: 0.35,
                    },
                    children: t.titleText,
                  }),
                  (0, i.jsx)("div", {
                    className: "relative select-none uppercase",
                    style: {
                      fontSize: 150,
                      lineHeight: 0.92,
                      fontWeight: 700,
                      fontFamily: nC,
                      color: "#F4FFF9",
                      textShadow:
                        "0 3px 0 rgba(255, 255, 255, 0.22), 0 12px 44px rgba(43, 255, 136, 0.38)",
                      maxWidth: 920,
                    },
                    children: tB.map((t, e) =>
                      (0, i.jsxs)(
                        "span",
                        {
                          children: [
                            (0, i.jsx)("span", {
                              className: "inline-block whitespace-nowrap",
                              children: t.split("").map((t, r) =>
                                (0, i.jsx)(
                                  "span",
                                  {
                                    ref: (t) => {
                                      let i = t$[e] + r;
                                      return (
                                        (te.current[i] = t),
                                        () => {
                                          te.current[i] = null;
                                        }
                                      );
                                    },
                                    className: "inline-block opacity-0",
                                    children: t,
                                  },
                                  r,
                                ),
                              ),
                            }),
                            e < tB.length - 1 ? " " : null,
                          ],
                        },
                        `${t}-${e}`,
                      ),
                    ),
                  }),
                ],
              }),
            }),
            (0, i.jsxs)("div", {
              ref: ti,
              className:
                "absolute inset-x-0 flex flex-col items-center opacity-0",
              style: { top: tN.counterTop },
              children: [
                (0, i.jsx)("div", {
                  ref: tn,
                  className: "select-none",
                  style: {
                    fontSize: 168,
                    fontWeight: 700,
                    fontFamily: nC,
                    letterSpacing: -2,
                    color: "#F4FFF9",
                    textShadow: `0 0 46px ${tz}, 0 6px 0 rgba(0, 0, 0, 0.35)`,
                  },
                }),
                null !== t.profitPct
                  ? (0, i.jsx)("div", {
                      ref: ta,
                      className: "select-none",
                      style: {
                        fontSize: 76,
                        fontWeight: 700,
                        fontFamily: nC,
                        color: tz,
                        textShadow: `0 0 34px ${tz}`,
                      },
                    })
                  : null,
              ],
            }),
            (0, i.jsx)("div", {
              ref: tp,
              className: "absolute flex flex-nowrap justify-start",
              style: {
                left: 64,
                right: 40,
                top: tN.stampTop,
                columnGap: 30,
                whiteSpace: "nowrap",
              },
              children: tI.map((t, e) =>
                (0, i.jsxs)(
                  "span",
                  {
                    ref: (t) => (
                      (td.current[e] = t),
                      () => {
                        td.current[e] = null;
                      }
                    ),
                    className: "relative select-none uppercase opacity-0",
                    style: {
                      fontSize: 104,
                      lineHeight: 1.04,
                      fontWeight: 700,
                      fontFamily: nC,
                      color: "#E9F2EC",
                      textShadow:
                        "0 4px 0 rgba(255, 255, 255, 0.2), 0 14px 44px rgba(0, 0, 0, 0.6)",
                    },
                    children: [
                      t,
                      (0, i.jsx)("span", {
                        "aria-hidden": !0,
                        ref: (t) => (
                          (tc.current[e] = t),
                          () => {
                            tc.current[e] = null;
                          }
                        ),
                        className: "absolute inset-0 opacity-0",
                        style: {
                          backgroundImage: `linear-gradient(100deg, rgba(255, 255, 255, 0) 40%, ${tz}E6 47%, #FFFFFF 51%, ${tz}E6 55%, rgba(255, 255, 255, 0) 62%)`,
                          backgroundSize: "260% 100%",
                          backgroundPosition: "-160% 0",
                          WebkitBackgroundClip: "text",
                          backgroundClip: "text",
                          color: "transparent",
                          textShadow: "none",
                        },
                        children: t,
                      }),
                    ],
                  },
                  `${t}-${e}`,
                ),
              ),
            }),
            tC
              ? (0, i.jsx)("div", {
                  className:
                    "pointer-events-none absolute inset-0 z-10 flex items-center justify-center",
                  children: (0, i.jsx)(x, { size: 72 }),
                })
              : null,
            h
              ? null
              : (0, i.jsxs)("div", {
                  "data-replay-controls": !0,
                  className:
                    "absolute inset-x-0 z-10 flex items-center justify-center",
                  style: { ...tN.controls, gap: 30 },
                  children: [
                    (0, i.jsx)("button", {
                      type: "button",
                      "aria-label": "restart replay",
                      onClick: (t) => {
                        (t.stopPropagation(), tE());
                      },
                      className:
                        "flex items-center justify-center rounded-2xl border border-border-tertiary bg-black/60",
                      style: { width: 96, height: 84 },
                      children: (0, i.jsxs)("svg", {
                        width: "34",
                        height: "34",
                        viewBox: "0 0 24 24",
                        fill: "none",
                        stroke: "#F4FFF9",
                        strokeWidth: "2",
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        children: [
                          (0, i.jsx)("path", {
                            d: "M21 12a9 9 0 1 1-2.64-6.36",
                          }),
                          (0, i.jsx)("path", { d: "M21 3v6h-6" }),
                        ],
                      }),
                    }),
                    (0, i.jsx)("button", {
                      type: "button",
                      "aria-label": tA ? "pause replay" : "play replay",
                      onClick: (t) => {
                        t.stopPropagation();
                        let e = tx.current;
                        if (!e) return;
                        let r = e.timeline;
                        r.progress() >= 1
                          ? tE()
                          : r.paused()
                            ? (r.play(), tF(!0))
                            : (e.pause(), tF(!1));
                      },
                      className:
                        "flex items-center justify-center rounded-2xl border border-border-tertiary bg-black/60",
                      style: { width: 96, height: 84 },
                      children: tA
                        ? (0, i.jsxs)("svg", {
                            width: "34",
                            height: "34",
                            viewBox: "0 0 24 24",
                            fill: "#F4FFF9",
                            children: [
                              (0, i.jsx)("rect", {
                                x: "6",
                                y: "4",
                                width: "4.5",
                                height: "16",
                                rx: "1",
                              }),
                              (0, i.jsx)("rect", {
                                x: "13.5",
                                y: "4",
                                width: "4.5",
                                height: "16",
                                rx: "1",
                              }),
                            ],
                          })
                        : (0, i.jsx)("svg", {
                            width: "34",
                            height: "34",
                            viewBox: "0 0 24 24",
                            fill: "#F4FFF9",
                            children: (0, i.jsx)("polygon", {
                              points: "7 4 20 12 7 20 7 4",
                            }),
                          }),
                    }),
                    (0, i.jsx)("button", {
                      type: "button",
                      "aria-label": tb
                        ? "mute replay sound"
                        : "unmute replay sound",
                      onClick: (t) => {
                        (t.stopPropagation(), tR(!tv.current));
                      },
                      className:
                        "flex items-center justify-center rounded-2xl border border-border-tertiary bg-black/60",
                      style: { width: 96, height: 84 },
                      children: (0, i.jsxs)("svg", {
                        width: "34",
                        height: "34",
                        viewBox: "0 0 24 24",
                        fill: "none",
                        stroke: "#F4FFF9",
                        strokeWidth: "2",
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        children: [
                          (0, i.jsx)("polygon", {
                            points: "11 5 6 9 2 9 2 15 6 15 11 19 11 5",
                            fill: "#F4FFF9",
                          }),
                          tb
                            ? (0, i.jsxs)(i.Fragment, {
                                children: [
                                  (0, i.jsx)("path", {
                                    d: "M15.5 8.5a5 5 0 0 1 0 7",
                                  }),
                                  (0, i.jsx)("path", {
                                    d: "M18.5 5.5a9 9 0 0 1 0 13",
                                  }),
                                ],
                              })
                            : (0, i.jsxs)(i.Fragment, {
                                children: [
                                  (0, i.jsx)("line", {
                                    x1: "15",
                                    y1: "9",
                                    x2: "21",
                                    y2: "15",
                                  }),
                                  (0, i.jsx)("line", {
                                    x1: "21",
                                    y1: "9",
                                    x2: "15",
                                    y2: "15",
                                  }),
                                ],
                              }),
                        ],
                      }),
                    }),
                    o
                      ? (0, i.jsx)("button", {
                          type: "button",
                          "aria-label": "download replay video",
                          onClick: (t) => {
                            (t.stopPropagation(), "rendering" !== u && o?.());
                          },
                          className:
                            "flex items-center justify-center rounded-2xl border border-border-tertiary bg-black/60",
                          style: {
                            width: 96,
                            height: 84,
                            opacity: "rendering" === u ? 0.7 : 1,
                          },
                          children:
                            "rendering" === u
                              ? (0, i.jsx)("svg", {
                                  className: "animate-spin",
                                  width: "34",
                                  height: "34",
                                  viewBox: "0 0 24 24",
                                  fill: "none",
                                  stroke: "#F4FFF9",
                                  strokeWidth: "2",
                                  strokeLinecap: "round",
                                  children: (0, i.jsx)("path", {
                                    d: "M21 12a9 9 0 1 1-6.2-8.56",
                                  }),
                                })
                              : "done" === u
                                ? (0, i.jsx)("svg", {
                                    width: "34",
                                    height: "34",
                                    viewBox: "0 0 24 24",
                                    fill: "none",
                                    stroke: "#2BFF88",
                                    strokeWidth: "2.4",
                                    strokeLinecap: "round",
                                    strokeLinejoin: "round",
                                    children: (0, i.jsx)("path", {
                                      d: "M4 12.5 9.5 18 20 6.5",
                                    }),
                                  })
                                : "error" === u
                                  ? (0, i.jsxs)("svg", {
                                      width: "34",
                                      height: "34",
                                      viewBox: "0 0 24 24",
                                      fill: "none",
                                      stroke: "#FF4D5E",
                                      strokeWidth: "2.4",
                                      strokeLinecap: "round",
                                      children: [
                                        (0, i.jsx)("line", {
                                          x1: "12",
                                          y1: "4",
                                          x2: "12",
                                          y2: "14",
                                        }),
                                        (0, i.jsx)("circle", {
                                          cx: "12",
                                          cy: "19",
                                          r: "0.6",
                                          fill: "#FF4D5E",
                                        }),
                                      ],
                                    })
                                  : (0, i.jsxs)("svg", {
                                      width: "34",
                                      height: "34",
                                      viewBox: "0 0 24 24",
                                      fill: "none",
                                      stroke: "#F4FFF9",
                                      strokeWidth: "2",
                                      strokeLinecap: "round",
                                      strokeLinejoin: "round",
                                      children: [
                                        (0, i.jsx)("path", { d: "M12 3v12" }),
                                        (0, i.jsx)("path", {
                                          d: "m7 10 5 5 5-5",
                                        }),
                                        (0, i.jsx)("path", { d: "M4 19h16" }),
                                      ],
                                    }),
                        })
                      : null,
                  ],
                }),
            t.coinSymbol || t.coinImageUrl
              ? (0, i.jsxs)("div", {
                  ref: ts,
                  className: "absolute flex items-center opacity-0",
                  style: { left: 64, top: tN.chipTop, gap: 22, fontFamily: nC },
                  children: [
                    t.coinImageUrl
                      ? (0, i.jsx)("img", {
                          src: t.coinImageUrl,
                          alt: "",
                          className: "shrink-0 object-cover",
                          style: {
                            width: 96,
                            height: 96,
                            borderRadius: 20,
                            border: "2px solid rgba(255, 255, 255, 0.22)",
                            boxShadow: `0 0 24px ${tz}33`,
                          },
                        })
                      : null,
                    (0, i.jsxs)("div", {
                      className: "min-w-0",
                      children: [
                        (0, i.jsx)("div", {
                          className:
                            "overflow-hidden text-ellipsis whitespace-nowrap",
                          style: {
                            fontSize: 46,
                            fontWeight: 700,
                            color: "#F7FFFB",
                            lineHeight: 1.1,
                            maxWidth: 700,
                          },
                          children:
                            t.coinName ||
                            `$${(t.coinSymbol || "?").toUpperCase()}`,
                        }),
                        (0, i.jsxs)("div", {
                          style: {
                            fontSize: 30,
                            fontWeight: 500,
                            letterSpacing: 2,
                            color: "rgba(244, 255, 249, 0.55)",
                          },
                          children: [
                            "$",
                            (t.coinSymbol || "?").toUpperCase().slice(0, 12),
                          ],
                        }),
                      ],
                    }),
                  ],
                })
              : null,
            (0, i.jsxs)("div", {
              ref: tu,
              className: "absolute flex flex-col items-start opacity-0",
              style: { left: 64, right: 40, top: tN.badgeTop, fontFamily: nC },
              children: [
                (0, i.jsx)("div", {
                  className: "select-none",
                  style: {
                    fontSize: 26,
                    fontWeight: 500,
                    letterSpacing: 6,
                    color: "rgba(244, 255, 249, 0.55)",
                  },
                  children: "PROFIT",
                }),
                (0, i.jsxs)("div", {
                  className: "flex items-center",
                  style: { gap: 26 },
                  children: [
                    (0, i.jsx)("div", {
                      className: "select-none",
                      style: {
                        fontSize: 150,
                        fontWeight: 700,
                        lineHeight: 1.04,
                        color: tz,
                        textShadow: `0 0 64px ${tz}88, 0 6px 0 rgba(0, 0, 0, 0.35)`,
                      },
                      children: G(t.profitUsd, !0),
                    }),
                    null !== t.profitPct
                      ? (0, i.jsxs)("div", {
                          className: "flex select-none items-center",
                          style: {
                            gap: 10,
                            padding: "10px 22px",
                            borderRadius: 999,
                            background: `${tz}1f`,
                            border: `1.5px solid ${tz}55`,
                            fontSize: 40,
                            fontWeight: 700,
                            color: tz,
                          },
                          children: [
                            (0, i.jsx)("span", {
                              style: { fontSize: 28 },
                              children: t.profitPct < 0 ? "▼" : "▲",
                            }),
                            (p = Math.abs(t.profitPct)) >= 1e3
                              ? `${(p / 1e3).toFixed(1)}K%`
                              : `${Math.round(p)}%`,
                          ],
                        })
                      : null,
                  ],
                }),
              ],
            }),
            null !== t.investedUsd || null !== t.marketCapUsd
              ? (0, i.jsxs)("div", {
                  ref: th,
                  className: "absolute flex items-center opacity-0",
                  style: {
                    left: 64,
                    top: tN.statsTop,
                    gap: 72,
                    fontFamily: nC,
                  },
                  children: [
                    null !== t.investedUsd
                      ? (0, i.jsxs)("div", {
                          children: [
                            (0, i.jsx)("div", {
                              style: {
                                fontSize: 48,
                                fontWeight: 700,
                                color: "#F7FFFB",
                              },
                              children: G(t.investedUsd),
                            }),
                            (0, i.jsx)("div", {
                              style: {
                                fontSize: 26,
                                fontWeight: 500,
                                letterSpacing: 2,
                                color: "rgba(244, 255, 249, 0.5)",
                              },
                              children: "Invested",
                            }),
                          ],
                        })
                      : null,
                    null !== t.marketCapUsd
                      ? (0, i.jsxs)("div", {
                          children: [
                            (0, i.jsx)("div", {
                              style: {
                                fontSize: 48,
                                fontWeight: 700,
                                color: "#F7FFFB",
                              },
                              children: G(t.marketCapUsd),
                            }),
                            (0, i.jsx)("div", {
                              style: {
                                fontSize: 26,
                                fontWeight: 500,
                                letterSpacing: 2,
                                color: "rgba(244, 255, 249, 0.5)",
                              },
                              children: "Market Cap",
                            }),
                          ],
                        })
                      : null,
                  ],
                })
              : null,
          ],
        }),
      });
    };
  function nU(t) {
    let e,
      r,
      a,
      l,
      o,
      u,
      h,
      d,
      f,
      m = (0, n.c)(24),
      { body: x, isOpenPosition: _, className: v } = t,
      { t: b } = (0, p.f)(),
      w = (0, c.useRef)(null);
    m[0] === Symbol.for("react.memo_cache_sentinel")
      ? ((e = () => {
          "u" > typeof navigator &&
            navigator.userActivation?.hasBeenActive === !0 &&
            w.current?.setSound(!0);
        }),
        (m[0] = e))
      : (e = m[0]);
    let M = e;
    if (m[1] !== x) {
      let t = new URLSearchParams();
      for (let [e, r] of Object.entries(x))
        null != r && "" !== r && t.set(e, String(r));
      ((r = t.toString()), (m[1] = x), (m[2] = r));
    } else r = m[2];
    let T = r;
    (m[3] !== T
      ? ((a = ["kill-cam-replay-props", T]), (m[3] = T), (m[4] = a))
      : (a = m[4]),
      m[5] !== _
        ? ((l = _ ? { gcTime: 6e4 } : {}), (m[5] = _), (m[6] = l))
        : (l = m[6]),
      m[7] !== x || m[8] !== T
        ? ((o = async () => {
            let t = await fetch(`/api/replay-props?${T}`, {
              signal: AbortSignal.timeout(2e4),
            });
            if (422 === t.status) return { kind: "no_story" };
            if (!t.ok) throw Error(`replay props failed: ${t.status}`);
            return {
              kind: "ready",
              replay: ((t, e) => {
                let r = { ...t };
                if ("number" == typeof e.profitUsd) {
                  let t, i;
                  ((r.profitUsd = e.profitUsd),
                    (r.profitPct =
                      "number" == typeof e.profitPct ? e.profitPct : null),
                    (r.theme = e.profitUsd >= 0 ? "win" : "loss"),
                    (t = r.theme),
                    (i = r.profitPct),
                    (r.stampText =
                      "loss" === t
                        ? "TARGET ESCAPED"
                        : null !== i && i >= 400
                          ? "TARGET ACQUIRED"
                          : "TARGET ELIMINATED"));
                }
                return (
                  e.userImageUrl && (r.userImageUrl = e.userImageUrl),
                  e.imageUrl &&
                    (r.coinImageUrl = (0, g.t)({
                      sourceImageUrl: e.imageUrl,
                      mint: e.mint,
                      imageType: g.d.COIN_IMAGE,
                      width: 128,
                      height: 128,
                    })),
                  r
                );
              })(await t.json(), x),
            };
          }),
          (m[7] = x),
          (m[8] = T),
          (m[9] = o))
        : (o = m[9]),
      m[10] !== a || m[11] !== l || m[12] !== o
        ? ((u = {
            queryKey: a,
            staleTime: 1 / 0,
            refetchOnWindowFocus: !1,
            refetchOnReconnect: !1,
            retry: 1,
            ...l,
            queryFn: o,
          }),
          (m[10] = a),
          (m[11] = l),
          (m[12] = o),
          (m[13] = u))
        : (u = m[13]));
    let k = (0, y.useQuery)(u),
      S = k.isError && !k.isFetching;
    return (
      m[14] !== b
        ? ((h = b("web.replay.killcam_embed_title")), (m[14] = b), (m[15] = h))
        : (h = m[15]),
      m[16] !== S || m[17] !== k || m[18] !== b
        ? ((d =
            k.data?.kind === "ready"
              ? (0, i.jsx)(nO, {
                  replay: k.data.replay,
                  autoplay: !0,
                  controlsRef: w,
                  onReady: M,
                })
              : (0, i.jsx)("div", {
                  className:
                    "flex size-full flex-col items-center justify-center gap-3 px-6 text-center text-sm text-text-tertiary",
                  children:
                    k.data?.kind === "no_story"
                      ? b("web.replay.status_unsupported")
                      : S
                        ? (0, i.jsxs)(i.Fragment, {
                            children: [
                              (0, i.jsx)("span", {
                                children: b("web.replay.status_error"),
                              }),
                              (0, i.jsx)(s.K, {
                                variant: "secondary",
                                size: 36,
                                onClick: () => {
                                  k.refetch();
                                },
                                children: b("web.replay.video_retry"),
                              }),
                            ],
                          })
                        : (0, i.jsx)("span", {
                            className: "animate-pulse",
                            children: b("web.replay.preparing_video"),
                          }),
                })),
          (m[16] = S),
          (m[17] = k),
          (m[18] = b),
          (m[19] = d))
        : (d = m[19]),
      m[20] !== v || m[21] !== h || m[22] !== d
        ? ((f = (0, i.jsx)("div", {
            className: v,
            "data-testid": "kill-cam-replay",
            "aria-label": h,
            children: d,
          })),
          (m[20] = v),
          (m[21] = h),
          (m[22] = d),
          (m[23] = f))
        : (f = m[23]),
      f
    );
  }
  var nR = t.i(146695),
    nE = t.i(705313),
    nz = t.i(223363),
    nN = t.i(174251),
    nI = t.i(953283),
    nB = t.i(741084),
    n$ = t.i(529841),
    nD = t.i(279602),
    nL = t.i(860787),
    nW = t.i(369091);
  function nq(t) {
    let e,
      r,
      a,
      s,
      l,
      o,
      u,
      h,
      c,
      p,
      f,
      m,
      g = (0, n.c)(41),
      {
        mint: y,
        walletAddress: x,
        ownerName: _,
        ownerProfileImage: v,
        ownerAvatarDecoration: b,
        coin: w,
        timeline: M,
        figures: T,
        callout: k,
      } = t,
      { ipfsPrefix: S } = (0, nW.useIpfsPrefix)(),
      A = (0, nD.f)(b);
    g[0] !== v
      ? ((e = (0, nL.Z)({ sourceUrl: (0, nB.f)(v), width: nL.z.list })),
        (g[0] = v),
        (g[1] = e))
      : (e = g[1]);
    let F = e;
    g[2] !== x ? ((r = (0, nR.$)(x)), (g[2] = x), (g[3] = r)) : (r = g[3]);
    let C = r,
      P = !T.isOpenPosition,
      j = M.trades[M.trades.length - 1],
      O = P ? (M.closedAtMs ?? j?.tMs ?? null) : null;
    g[4] !== O
      ? ((a = null === O ? null : new Date(O).toISOString()),
        (g[4] = O),
        (g[5] = a))
      : (a = g[5]);
    let U = a,
      R = F ?? void 0;
    (g[6] !== S || g[7] !== R || g[8] !== x
      ? ((s = (0, i.jsx)(nE.f, {
          address: x,
          alt: "",
          src: R,
          width: 32,
          height: 32,
          ipfsPrefix: S,
          isAnonymous: !1,
          className: "size-8 shrink-0 rounded-full object-cover",
        })),
        (g[6] = S),
        (g[7] = R),
        (g[8] = x),
        (g[9] = s))
      : (s = g[9]),
      g[10] !== A || g[11] !== s
        ? ((l = (0, i.jsx)(nI.f, {
            decoration: A,
            variant: "list",
            children: s,
          })),
          (g[10] = A),
          (g[11] = s),
          (g[12] = l))
        : (l = g[12]),
      g[13] !== _
        ? ((o = (0, i.jsx)("span", {
            className: "truncate font-semibold text-text-primary",
            children: _,
          })),
          (g[13] = _),
          (g[14] = o))
        : (o = g[14]),
      g[15] !== C || g[16] !== l || g[17] !== o
        ? ((u = (0, i.jsxs)(d.default, {
            href: C,
            className: "flex min-w-0 items-center gap-2.5 hover:underline",
            children: [l, o],
          })),
          (g[15] = C),
          (g[16] = l),
          (g[17] = o),
          (g[18] = u))
        : (u = g[18]),
      g[19] !== k
        ? ((h = k
            ? (0, i.jsx)(n$.f, {
                timestamp: k.createdAt,
                live: !1,
                className: "shrink-0 text-xs text-text-tertiary",
              })
            : null),
          (g[19] = k),
          (g[20] = h))
        : (h = g[20]),
      g[21] !== u || g[22] !== h
        ? ((c = (0, i.jsxs)("div", {
            className: "flex items-center gap-1.5 text-sm leading-5",
            children: [u, h],
          })),
          (g[21] = u),
          (g[22] = h),
          (g[23] = c))
        : (c = g[23]),
      g[24] !== k
        ? ((p = k?.note
            ? (0, i.jsx)("p", {
                className:
                  "whitespace-pre-wrap break-words text-[15px] leading-6 text-text-primary",
                "data-testid": "replay-callout-note",
                children: (0, i.jsx)(nN.f, { content: k.note }),
              })
            : null),
          (g[24] = k),
          (g[25] = p))
        : (p = g[25]));
    let E = P && M.proceedsUsd > 0 ? M.proceedsUsd : null;
    return (
      g[26] !== U ||
      g[27] !== w.chain_id ||
      g[28] !== w.image_uri ||
      g[29] !== w.name ||
      g[30] !== w.symbol ||
      g[31] !== T.netPnlUsd ||
      g[32] !== T.positionUsd ||
      g[33] !== P ||
      g[34] !== y ||
      g[35] !== E
        ? ((f = (0, i.jsx)(nz.f, {
            mint: y,
            symbol: w.symbol,
            name: w.name,
            imageUri: w.image_uri,
            chainId: w.chain_id,
            positionUsd: T.positionUsd,
            isClosed: P,
            exitProceedsUsd: E,
            closedAt: U,
            netPnlUsd: T.netPnlUsd,
          })),
          (g[26] = U),
          (g[27] = w.chain_id),
          (g[28] = w.image_uri),
          (g[29] = w.name),
          (g[30] = w.symbol),
          (g[31] = T.netPnlUsd),
          (g[32] = T.positionUsd),
          (g[33] = P),
          (g[34] = y),
          (g[35] = E),
          (g[36] = f))
        : (f = g[36]),
      g[37] !== p || g[38] !== f || g[39] !== c
        ? ((m = (0, i.jsxs)("div", {
            className: "flex flex-col gap-2.5",
            "data-testid": "replay-callout-card",
            children: [c, p, f],
          })),
          (g[37] = p),
          (g[38] = f),
          (g[39] = c),
          (g[40] = m))
        : (m = g[40]),
      m
    );
  }
  var nG = t.i(329657),
    nV = t.i(178175),
    nX = t.i(915625),
    nY = t.i(464154);
  function nH() {
    let t,
      e = (0, n.c)(1);
    return (
      e[0] === Symbol.for("react.memo_cache_sentinel")
        ? ((t = (0, i.jsxs)("div", {
            className: "flex flex-col gap-3 pb-5 pt-2",
            "data-testid": "replay-callout-thread-loading",
            "aria-hidden": !0,
            children: [
              (0, i.jsx)("div", {
                className:
                  "h-10 w-2/3 animate-pulse rounded-lg bg-bg-secondary",
              }),
              (0, i.jsx)("div", {
                className: "h-4 w-full animate-pulse rounded bg-bg-secondary",
              }),
              (0, i.jsx)("div", {
                className:
                  "h-24 w-full animate-pulse rounded-xl bg-bg-secondary",
              }),
            ],
          })),
          (e[0] = t))
        : (t = e[0]),
      t
    );
  }
  function nK(t) {
    let e,
      r,
      a,
      s,
      l = (0, n.c)(28),
      {
        mint: o,
        calloutId: u,
        coin: h,
        owner: d,
        viewerAddress: c,
        fallback: p,
      } = t;
    l[0] !== u || l[1] !== o
      ? ((e = { mint: o, calloutId: u }), (l[0] = u), (l[1] = o), (l[2] = e))
      : (e = l[2]);
    let { callout: f, hasCommunityThread: m, isLoading: g } = (0, nY.u)(e);
    if (!f) {
      let t;
      if (g) {
        let t;
        return (
          l[3] === Symbol.for("react.memo_cache_sentinel")
            ? ((t = (0, i.jsx)(nH, {})), (l[3] = t))
            : (t = l[3]),
          t
        );
      }
      let e = p ?? null;
      return (
        l[4] !== e
          ? ((t = (0, i.jsx)(i.Fragment, { children: e })),
            (l[4] = e),
            (l[5] = t))
          : (t = l[5]),
        t
      );
    }
    let y = h.chain_id,
      x = !!c;
    return (
      l[6] !== f ||
      l[7] !== u ||
      l[8] !== h ||
      l[9] !== m ||
      l[10] !== d ||
      l[11] !== x ||
      l[12] !== c
        ? ((r = (0, i.jsx)(nG.f, {
            callout: f,
            permalinkCalloutId: u,
            coin: h,
            user: d,
            liveMarketCap: null,
            hasCommunityThread: m,
            viewerAddress: c,
            isLoggedIn: x,
            hideCoinIdentity: !0,
            hideReplayAction: !0,
            className: "border-b border-border-primary",
          })),
          (l[6] = f),
          (l[7] = u),
          (l[8] = h),
          (l[9] = m),
          (l[10] = d),
          (l[11] = x),
          (l[12] = c),
          (l[13] = r))
        : (r = l[13]),
      l[14] !== f ||
      l[15] !== u ||
      l[16] !== h.chain_id ||
      l[17] !== m ||
      l[18] !== c
        ? ((a = (0, i.jsx)(nV.f, {
            callout: f,
            chainId: h.chain_id,
            permalinkCalloutId: u,
            hasCommunityThread: m,
            viewerAddress: c,
          })),
          (l[14] = f),
          (l[15] = u),
          (l[16] = h.chain_id),
          (l[17] = m),
          (l[18] = c),
          (l[19] = a))
        : (a = l[19]),
      l[20] !== f ||
      l[21] !== u ||
      l[22] !== h.chain_id ||
      l[23] !== m ||
      l[24] !== r ||
      l[25] !== a ||
      l[26] !== c
        ? ((s = (0, i.jsx)("div", {
            className: "flex flex-col",
            "data-testid": "replay-callout-thread",
            children: (0, i.jsxs)(nX.f, {
              callout: f,
              permalinkCalloutId: u,
              hasCommunityThread: m,
              chainId: y,
              viewerAddress: c,
              children: [r, a],
            }),
          })),
          (l[20] = f),
          (l[21] = u),
          (l[22] = h.chain_id),
          (l[23] = m),
          (l[24] = r),
          (l[25] = a),
          (l[26] = c),
          (l[27] = s))
        : (s = l[27]),
      s
    );
  }
  var nQ = t.i(250311),
    nJ = t.i(116458),
    nZ = t.i(79631),
    n0 = t.i(79395),
    n1 = t.i(246224),
    n2 = t.i(620268),
    n5 = t.i(880783),
    n4 = t.i(652853);
  function n3(t) {
    let e,
      r,
      i,
      a,
      s,
      l,
      o,
      u = (0, n.c)(22),
      { mint: h, enabled: d } = t,
      c = void 0 === d || d;
    u[0] !== c || u[1] !== h
      ? ((e = c && (0, n4.f)(h)), (u[0] = c), (u[1] = h), (u[2] = e))
      : (e = u[2]);
    let p = e;
    (u[3] !== p || u[4] !== h
      ? ((r = p ? [h] : []), (u[3] = p), (u[4] = h), (u[5] = r))
      : (r = u[5]),
      u[6] !== p || u[7] !== r
        ? ((i = { addresses: r, enabled: p }),
          (u[6] = p),
          (u[7] = r),
          (u[8] = i))
        : (i = u[8]));
    let f = (0, n2.x)(i);
    u[9] !== h || u[10] !== f.data
      ? ((a = f.data?.get(h.toLowerCase())),
        (u[9] = h),
        (u[10] = f.data),
        (u[11] = a))
      : (a = u[11]);
    let m = a,
      g = m?.chain === "solana" && m.address === h,
      y = m?.poolAddress;
    u[12] !== g || u[13] !== h || u[14] !== y
      ? ((s = { poolAddress: y, chain: "solana", tokenAddress: h, enabled: g }),
        (u[12] = g),
        (u[13] = h),
        (u[14] = y),
        (u[15] = s))
      : (s = u[15]);
    let x = (0, n1.s)(s),
      _ = !m?.poolAddress || !x.isPending,
      v = x.data?.price;
    t: {
      let t;
      if (!m || !g || !_) {
        l = void 0;
        break t;
      }
      (u[16] !== v || u[17] !== m
        ? ((t = (0, n5.H)(m, { usdMarketCap: (0, n5.S)(v, (0, n5.Q)(m)) })),
          (u[16] = v),
          (u[17] = m),
          (u[18] = t))
        : (t = u[18]),
        (l = t));
    }
    let b = l,
      w = p && (f.isPending || (g && !_));
    return (
      u[19] !== b || u[20] !== w
        ? ((o = { coin: b, isLoading: w }),
          (u[19] = b),
          (u[20] = w),
          (u[21] = o))
        : (o = u[21]),
      o
    );
  }
  t.s(["f", 0, n3], 493777);
  var n6 = t.i(785783),
    n8 = t.i(541710),
    n7 = t.i(646908),
    n9 = t.i(720772),
    at = t.i(505835);
  let ae = async (t) => {
    let { coin: e, window: r, interval: i, signal: n } = t,
      a = (0, at.U)({ mint: e.mint, chainId: e.chain_id });
    if (!a) throw Error("Failed to fetch replay candles: coin has no chain id");
    let s = new Map(),
      l = r.endMs < Date.now() ? r.endMs + 1 : void 0;
    for (let t = 0; t < 7; t++) {
      let t = await (0, at.Z)({
        chainId: a,
        address: e.mint,
        interval: i,
        measure: "price_usd",
        beforeTs: l,
        init: { signal: n },
      });
      for (let e of t.candles) {
        if (s.has(e.timestamp)) continue;
        let t = Number(e.volume);
        s.set(e.timestamp, {
          tMs: e.timestamp,
          open: e.open,
          high: e.high,
          low: e.low,
          close: e.close,
          volume: Number.isFinite(t) && t > 0 ? t : 0,
        });
      }
      let o = t.candles[0]?.timestamp;
      if (void 0 === o || !t.hasOlder || o <= r.startMs) break;
      l = o;
    }
    return Array.from(s.values()).sort((t, e) => t.tMs - e.tMs);
  };
  var ar = t.i(38279);
  let ai = {
      1: "ethereum",
      8453: "base",
      56: "bsc",
      143: "monad",
      4663: "robinhood",
      999: "hype",
      57073: "ink",
      5042: "arc",
      [n8.g]: "megaeth",
      [n8.h]: "xlayer",
      [n8.j]: "polygon",
      [n8.D]: "arbitrum",
    },
    an = (t) => ("number" == typeof t && Number.isFinite(t) ? t : null),
    aa = (t) => ({
      realizedPnlUsd: an(t.realized_pnl_usd),
      unrealizedPnlUsd: an(t.unrealized_pnl_usd),
      percentageUsd: an(t.percentage_usd),
      amountHeld: an(t.amount_held),
      costBasisUsd: an(t.cost_basis_usd),
    }),
    as = (t) =>
      null != t.realized_pnl_usd ||
      null != t.unrealized_pnl_usd ||
      null != t.amount_held ||
      null != t.cost_basis_usd,
    al = async (t) => {
      let {
        account: e,
        mint: r,
        chainId: i,
        chainExposure: n = n8.q,
        signal: a,
      } = t;
      if (!e || !r || (null != i && !(0, n8.b)(i, n))) return null;
      let s = await fetch(
        `${ar.C.PROFILE}/v3/pnl/token/${encodeURIComponent(e)}/${encodeURIComponent(r)}`,
        { signal: a },
      );
      if (404 === s.status) return null;
      if (!s.ok) throw Error(`Failed to fetch replay pnl summary: ${s.status}`);
      let l = await s.json();
      if (null == l || !1 === l.success || null == l.data)
        throw Error("Failed to fetch replay pnl summary: malformed body");
      let o = l.data;
      if (!Array.isArray(o.chains)) return as(o) ? aa(o) : null;
      let u = null != i ? ai[i] : void 0,
        h = u ? o.chains.find((t) => t.chain === u) : void 0;
      if (h) return as(h) ? aa(h) : null;
      let d = o.chains.filter(as);
      return 1 === d.length ? aa(d[0]) : null;
    };
  var ao = t.i(555015),
    au = t.i(606933),
    ah = t.i(759257);
  let ad = () => (0, ah.j)({ credentials: "include" }),
    ac = (t) => {
      let e = t.status;
      if ("rendering" !== e && "done" !== e)
        throw Error(`replay video render reported "${e}"`);
    };
  function ap(t) {
    return (
      t.state.data?.status !== "done" && "error" !== t.state.status && 2500
    );
  }
  var af = t.i(426091),
    am = t.i(367498);
  let ag = (t) => {
    if (!t) return null;
    try {
      let e = new URL(t);
      return "https:" === e.protocol ? e.href : null;
    } catch {
      return null;
    }
  };
  var ay = t.i(595673),
    ax = t.i(338319),
    a_ = t.i(187611);
  let av = (0, h.default)(
      () => t.A(663466).then((t) => t.CalloutDetailSwapCard),
      {
        loadableGenerated: { modules: [338061] },
        ssr: !1,
        loading: () =>
          (0, i.jsx)("div", {
            "aria-hidden": !0,
            className: "h-[320px] w-full animate-pulse rounded-xl bg-white/5",
          }),
      },
    ),
    ab = (0, h.default)(() => t.A(922735).then((t) => t.CalloutChartCard), {
      loadableGenerated: { modules: [639820] },
      ssr: !1,
      loading: () =>
        (0, i.jsx)("div", {
          "aria-hidden": !0,
          className: "h-56 w-full animate-pulse rounded-xl bg-white/5",
        }),
    }),
    aw = (0, h.default)(
      () => t.A(760991).then((t) => t.ReplayHoldersCalloutsTabs),
      {
        loadableGenerated: { modules: [83966] },
        ssr: !1,
        loading: () =>
          (0, i.jsx)("div", {
            "aria-hidden": !0,
            className: "h-40 w-full animate-pulse rounded-xl bg-white/5",
          }),
      },
    );
  function aM(t) {
    let e,
      r,
      a,
      s = (0, n.c)(8),
      { children: l, pulse: o, testId: u } = t,
      h = void 0 !== o && o && "animate-pulse";
    return (
      s[0] !== h ? ((e = (0, ax.c)(h)), (s[0] = h), (s[1] = e)) : (e = s[1]),
      s[2] !== l || s[3] !== e
        ? ((r = (0, i.jsx)("span", { className: e, children: l })),
          (s[2] = l),
          (s[3] = e),
          (s[4] = r))
        : (r = s[4]),
      s[5] !== r || s[6] !== u
        ? ((a = (0, i.jsx)("div", {
            className:
              "flex size-full items-center justify-center px-6 text-center text-sm text-text-tertiary",
            "data-testid": u,
            children: r,
          })),
          (s[5] = r),
          (s[6] = u),
          (s[7] = a))
        : (a = s[7]),
      a
    );
  }
  t.s(
    [
      "f",
      0,
      function (t) {
        let e,
          r,
          h,
          x,
          _,
          v,
          b,
          w,
          M,
          T,
          k,
          S,
          A,
          F,
          C,
          P,
          j,
          O,
          U,
          R,
          E = (0, n.c)(90),
          {
            mint: z,
            walletAddress: N,
            ownerLabel: I,
            coin: B,
            chrome: $,
            layout: D,
            initialMediaTab: L,
            scope: W,
            headline: q,
            onClose: G,
          } = t,
          V = void 0 === W ? null : W,
          X = void 0 === q ? null : q,
          Y = "column" === (void 0 === D ? "dialog" : D),
          { t: H } = (0, p.f)(),
          K = B ?? null;
        E[0] !== X || E[1] !== z || E[2] !== V || E[3] !== K || E[4] !== N
          ? ((e = {
              mint: z,
              walletAddress: N,
              coin: K,
              scope: V,
              headline: X,
            }),
            (E[0] = X),
            (E[1] = z),
            (E[2] = V),
            (E[3] = K),
            (E[4] = N),
            (E[5] = e))
          : (e = E[5]);
        let {
            status: Q,
            coin: J,
            timeline: Z,
            figures: tt,
            ownCallout: te,
          } = (function (t) {
            let e,
              r,
              i,
              a,
              s,
              l,
              o,
              u,
              h,
              d,
              c,
              p,
              f,
              m,
              g,
              x,
              _,
              v,
              b,
              w,
              M,
              T,
              k,
              S = (0, n.c)(99),
              {
                mint: A,
                walletAddress: F,
                coin: C,
                enabled: P,
                scope: j,
                headline: O,
              } = t,
              U = void 0 === P || P,
              R = void 0 === j ? null : j,
              E = void 0 === O ? null : O,
              z = U && !C;
            (S[0] !== z
              ? ((e = { enabled: z }), (S[0] = z), (S[1] = e))
              : (e = S[1]),
              S[2] !== A || S[3] !== e
                ? ((r = { coinAddress: A, queryOptions: e }),
                  (S[2] = A),
                  (S[3] = e),
                  (S[4] = r))
                : (r = S[4]));
            let N = (0, n0.f)(r),
              I = U && !C && !N.isFetching && !N.data;
            S[5] !== A || S[6] !== I
              ? ((i = { mint: A, enabled: I }),
                (S[5] = A),
                (S[6] = I),
                (S[7] = i))
              : (i = S[7]);
            let B = n3(i),
              $ = C ?? (N.data || B.coin || null);
            S[8] !== $
              ? ((a = null != $ && !(0, n9.B)($)), (S[8] = $), (S[9] = a))
              : (a = S[9]);
            let D = a,
              L = !!(U && $ && !D);
            S[10] !== $ || S[11] !== L || S[12] !== F
              ? ((s = { coin: $, walletAddress: F, enabled: L }),
                (S[10] = $),
                (S[11] = L),
                (S[12] = F),
                (S[13] = s))
              : (s = S[13]);
            let W = (0, n6.p)(s),
              q = W.data?.rows,
              G = W.data?.baseDecimals ?? null;
            S[14] !== G || S[15] !== q
              ? ((l = (0, ao.P)(q ?? [], { baseDecimals: G })),
                (S[14] = G),
                (S[15] = q),
                (S[16] = l))
              : (l = S[16]);
            let V = l;
            S[17] !== R || S[18] !== V
              ? ((o = ((t, e) => {
                  if (!e || e.toMs <= e.fromMs)
                    return { trades: t, scope: null };
                  let r = t.filter((t) => t.tMs >= e.fromMs && t.tMs <= e.toMs);
                  return r.length > 0
                    ? { trades: r, scope: e }
                    : { trades: t, scope: null };
                })(V, R)),
                (S[17] = R),
                (S[18] = V),
                (S[19] = o))
              : (o = S[19]);
            let X = o,
              Y = X.trades;
            S[20] !== G || S[21] !== q
              ? ((u = q ? (0, nQ.S)(q, { baseDecimals: G }) : null),
                (S[20] = G),
                (S[21] = q),
                (S[22] = u))
              : (u = S[22]);
            let H = u;
            S[23] !== $
              ? ((h = (0, n9.X)($)), (S[23] = $), (S[24] = h))
              : (h = S[24]);
            let K = h,
              Q = null == K ? F : (W.data?.account ?? null),
              J = (0, n8.l)();
            S[25] !== J.arbitrum ||
            S[26] !== J.megaeth ||
            S[27] !== J.polygon ||
            S[28] !== J.xlayer ||
            S[29] !== K ||
            S[30] !== A ||
            S[31] !== Q
              ? ((d = [
                  "position-replay-pnl-summary",
                  A,
                  Q,
                  K,
                  J.megaeth,
                  J.xlayer,
                  J.polygon,
                  J.arbitrum,
                ]),
                (S[25] = J.arbitrum),
                (S[26] = J.megaeth),
                (S[27] = J.polygon),
                (S[28] = J.xlayer),
                (S[29] = K),
                (S[30] = A),
                (S[31] = Q),
                (S[32] = d))
              : (d = S[32]);
            let Z = d;
            S[33] !== J || S[34] !== K || S[35] !== A || S[36] !== Q
              ? ((c = (t) => {
                  let { signal: e } = t;
                  return al({
                    account: Q,
                    mint: A,
                    chainId: K,
                    chainExposure: J,
                    signal: e,
                  });
                }),
                (S[33] = J),
                (S[34] = K),
                (S[35] = A),
                (S[36] = Q),
                (S[37] = c))
              : (c = S[37]);
            let tt = !!(L && Q);
            S[38] !== Z || S[39] !== c || S[40] !== tt
              ? ((p = {
                  queryKey: Z,
                  queryFn: c,
                  enabled: tt,
                  staleTime: 1 / 0,
                  gcTime: 6e4,
                  refetchOnWindowFocus: !1,
                  retry: 2,
                }),
                (S[38] = Z),
                (S[39] = c),
                (S[40] = tt),
                (S[41] = p))
              : (p = S[41]);
            let te = (0, y.useQuery)(p),
              tr = te.data ?? null,
              ti = te.isSuccess || (null != W.data && !Q);
            (S[42] !== A ? ((f = [A]), (S[42] = A), (S[43] = f)) : (f = S[43]),
              S[44] !== f || S[45] !== L || S[46] !== F
                ? ((m = { userId: F, mints: f, enabled: L }),
                  (S[44] = f),
                  (S[45] = L),
                  (S[46] = F),
                  (S[47] = m))
                : (m = S[47]));
            let { isError: tn, isLoading: ta, summaryFor: ts } = (0, nZ._)(m);
            S[48] !== tn || S[49] !== ts || S[50] !== A
              ? ((g = tn ? null : ts(A)),
                (S[48] = tn),
                (S[49] = ts),
                (S[50] = A),
                (S[51] = g))
              : (g = S[51]);
            let tl = g,
              to = !ta,
              tu = H?.remainingTokens ?? 0;
            S[52] !== tr || S[53] !== tu
              ? ((x = ((t) => {
                  let { summary: e, fillsRemainingTokens: r } = t;
                  return e?.amountHeld != null
                    ? !(e.amountHeld <= ao.G) &&
                        ((null == e.costBasisUsd &&
                          null == e.unrealizedPnlUsd) ||
                          (e.costBasisUsd ?? 0) + (e.unrealizedPnlUsd ?? 0) >
                            0.01)
                    : r > ao.G;
                })({ summary: tr, fillsRemainingTokens: tu })),
                (S[52] = tr),
                (S[53] = tu),
                (S[54] = x))
              : (x = S[54]);
            let th = x,
              td = Y.length > 0 ? Y[Y.length - 1].tMs : null,
              tc = (0, n7.B)($?.chain_id) && (0, n8.M)(J) ? n7.d : void 0;
            S[55] !== U || S[56] !== A || S[57] !== tc || S[58] !== F
              ? ((_ = { mint: A, chain: tc, accountKey: F, enabled: U }),
                (S[55] = U),
                (S[56] = A),
                (S[57] = tc),
                (S[58] = F),
                (S[59] = _))
              : (_ = S[59]);
            let { callout: tp } = (0, nJ.W)(_),
              tf = !!(L && q && V.length > 0 && $ && ti),
              tm = Y[0]?.tMs ?? null,
              tg = X.scope?.fromMs ?? null,
              ty = X.scope?.toMs ?? null;
            S[60] !== th ||
            S[61] !== td ||
            S[62] !== A ||
            S[63] !== Y.length ||
            S[64] !== tm ||
            S[65] !== tg ||
            S[66] !== ty ||
            S[67] !== F
              ? ((v = [
                  "position-replay-candles",
                  A,
                  F,
                  Y.length,
                  tm,
                  td,
                  th,
                  tg,
                  ty,
                ]),
                (S[60] = th),
                (S[61] = td),
                (S[62] = A),
                (S[63] = Y.length),
                (S[64] = tm),
                (S[65] = tg),
                (S[66] = ty),
                (S[67] = F),
                (S[68] = v))
              : (v = S[68]);
            let tx = v;
            S[69] !== $ || S[70] !== th || S[71] !== X.scope || S[72] !== Y
              ? ((b = async (t) => {
                  let { signal: e } = t,
                    r = Date.now(),
                    i = (0, ao.c)({
                      trades: Y,
                      calloutTimesMs: [],
                      isOpenPosition: th,
                      nowMs: r,
                    });
                  if (!i || !$) throw Error("Replay window unavailable");
                  let n = ((t, e) => {
                      if (!e) return t;
                      let r = Math.max(t.startMs, e.fromMs),
                        i = Math.min(t.endMs, e.toMs);
                      return i > r ? { startMs: r, endMs: i } : t;
                    })(i, X.scope),
                    a = (0, ao.A)(n.endMs - n.startMs),
                    s = await ae({
                      coin: $,
                      window: n,
                      interval: a,
                      signal: e,
                    });
                  return { window: n, interval: a, candles: s, nowMs: r };
                }),
                (S[69] = $),
                (S[70] = th),
                (S[71] = X.scope),
                (S[72] = Y),
                (S[73] = b))
              : (b = S[73]);
            let t_ = th ? 6e4 : 1 / 0;
            S[74] !== tf || S[75] !== tx || S[76] !== b || S[77] !== t_
              ? ((w = {
                  queryKey: tx,
                  queryFn: b,
                  enabled: tf,
                  staleTime: t_,
                  refetchOnWindowFocus: !1,
                  retry: 1,
                }),
                (S[74] = tf),
                (S[75] = tx),
                (S[76] = b),
                (S[77] = t_),
                (S[78] = w))
              : (w = S[78]);
            let tv = (0, y.useQuery)(w),
              tb = X.scope && V.length > 0 ? V[V.length - 1].tMs : null;
            t: {
              let t;
              if (!tv.data || 0 === Y.length) {
                M = null;
                break t;
              }
              (S[79] !== tv.data.candles ||
              S[80] !== tv.data.interval ||
              S[81] !== tv.data.nowMs ||
              S[82] !== tv.data.window ||
              S[83] !== tb ||
              S[84] !== th ||
              S[85] !== Y
                ? ((t = (0, ao.R)({
                    candles: tv.data.candles,
                    trades: Y,
                    callouts: [],
                    window: tv.data.window,
                    interval: tv.data.interval,
                    nowMs: tv.data.nowMs,
                    isOpenPosition: th,
                    closedAtMs: tb,
                  })),
                  (S[79] = tv.data.candles),
                  (S[80] = tv.data.interval),
                  (S[81] = tv.data.nowMs),
                  (S[82] = tv.data.window),
                  (S[83] = tb),
                  (S[84] = th),
                  (S[85] = Y),
                  (S[86] = t))
                : (t = S[86]),
                (M = t));
            }
            let tw = M;
            S[87] !== E ||
            S[88] !== tl ||
            S[89] !== to ||
            S[90] !== tr ||
            S[91] !== tw
              ? ((T =
                  tw && to
                    ? ((t) => {
                        let { timeline: e, summary: r, host: i } = t,
                          n = ((t, e) => {
                            let r,
                              i =
                                t.investedUsd > 0
                                  ? (t.finalPnlUsd / t.investedUsd) * 100
                                  : null;
                            if (
                              ((r = t.isOpenPosition),
                              null == e ||
                                (null == e.realizedPnlUsd &&
                                  null == e.unrealizedPnlUsd) ||
                                (r && null == e.unrealizedPnlUsd))
                            )
                              return {
                                netPnlUsd: t.finalPnlUsd,
                                pnlPct: i,
                                investedUsd: t.investedUsd,
                                positionUsd: t.isOpenPosition
                                  ? Math.max(
                                      0,
                                      t.investedUsd -
                                        t.proceedsUsd +
                                        t.finalPnlUsd,
                                    )
                                  : null,
                                isOpenPosition: t.isOpenPosition,
                                source: "fills",
                              };
                            let n =
                                (e.realizedPnlUsd ?? 0) +
                                (e.unrealizedPnlUsd ?? 0),
                              a =
                                null != e.costBasisUsd
                                  ? e.costBasisUsd +
                                    t.proceedsUsd -
                                    (e.realizedPnlUsd ?? 0)
                                  : null,
                              s =
                                null != a && a > 0
                                  ? Math.max(a, t.investedUsd)
                                  : t.investedUsd,
                              l =
                                e.percentageUsd ??
                                (s > 0 ? (n / s) * 100 : null),
                              o = t.isOpenPosition,
                              u = o
                                ? Math.max(
                                    0,
                                    null != e.costBasisUsd ||
                                      null != e.unrealizedPnlUsd
                                      ? (e.costBasisUsd ?? 0) +
                                          (e.unrealizedPnlUsd ?? 0)
                                      : s - t.proceedsUsd + n,
                                  )
                                : null;
                            return {
                              netPnlUsd: n,
                              pnlPct: l,
                              investedUsd: s,
                              positionUsd: u,
                              isOpenPosition: o,
                              source: "summary",
                            };
                          })(e, r);
                        return i?.netPnlUsd == null
                          ? n
                          : {
                              ...n,
                              netPnlUsd: i.netPnlUsd,
                              pnlPct: i.displayPct,
                              source: "host",
                            };
                      })({ timeline: tw, summary: tr, host: E ?? tl })
                    : null),
                (S[87] = E),
                (S[88] = tl),
                (S[89] = to),
                (S[90] = tr),
                (S[91] = tw),
                (S[92] = T))
              : (T = S[92]);
            let tM = T,
              tT = "loading";
            return (
              U
                ? D
                  ? (tT = "unsupported")
                  : !N.isError || C || B.isLoading || B.coin
                    ? W.isError || te.isError || (tv.isError && !tw)
                      ? (tT = "error")
                      : q && 0 === V.length
                        ? (tT = "empty")
                        : tw
                          ? (tT = "ready")
                          : tv.data && !tw && (tT = "error")
                    : (tT = "error")
                : (tT = "loading"),
              S[93] !== $ ||
              S[94] !== tM ||
              S[95] !== tp ||
              S[96] !== tT ||
              S[97] !== tw
                ? ((k = {
                    status: tT,
                    coin: $,
                    timeline: tw,
                    figures: tM,
                    ownCallout: tp,
                  }),
                  (S[93] = $),
                  (S[94] = tM),
                  (S[95] = tp),
                  (S[96] = tT),
                  (S[97] = tw),
                  (S[98] = k))
                : (k = S[98]),
              k
            );
          })(e),
          tr = te
            ? `/coin/${z}?highlight_callout=${te.calloutId}`
            : `/coin/${z}`,
          { address: ti } = (0, o.F)();
        E[6] !== N
          ? ((r = { userIdentifier: N }), (E[6] = N), (E[7] = r))
          : (r = E[7]);
        let tn = (0, u.U)(r),
          ta = tn.data,
          { ipfsPrefix: ts } = (0, nW.useIpfsPrefix)(),
          tl = (({ profileImage: t, ipfsPrefix: e }) => {
            if (!t) return null;
            let r = (0, am.D)(t, e);
            return r === af.A ? null : ag(r);
          })({ profileImage: ta?.profile_image, ipfsPrefix: ts }),
          to = ta?.username?.trim() || I,
          tu = V ? `${z}:${N}:${V.fromMs}-${V.toMs}` : `${z}:${N}`,
          [th, td] = (0, c.useState)(null);
        (E[8] !== tn.isPending || E[9] !== Q || E[10] !== tu
          ? ((h = () => {
              if ("ready" !== Q || !tn.isPending) return;
              let t = setTimeout(() => td(tu), 2500);
              return () => clearTimeout(t);
            }),
            (x = [Q, tn.isPending, tu]),
            (E[8] = tn.isPending),
            (E[9] = Q),
            (E[10] = tu),
            (E[11] = h),
            (E[12] = x))
          : ((h = E[11]), (x = E[12])),
          (0, c.useEffect)(h, x));
        let tc = !tn.isPending || th === tu,
          [tp, tf] = (0, c.useState)(null);
        tp?.key !== tu &&
          "ready" === Q &&
          J &&
          tt &&
          tc &&
          tf({
            key: tu,
            json: JSON.stringify(
              (function ({
                coin: t,
                figures: e,
                mint: r,
                walletAddress: i,
                ownerLabel: n,
                ownerImageUrl: a,
              }) {
                let s = e.pnlPct ?? void 0,
                  l =
                    "number" == typeof t.usd_market_cap && t.usd_market_cap > 0
                      ? t.usd_market_cap
                      : void 0,
                  o = (0, n9.X)(t);
                return {
                  wallet: i,
                  mint: r,
                  ...(null != o ? { chainId: o } : {}),
                  cut: "full",
                  profitUsd: e.netPnlUsd,
                  ...(null != s ? { profitPct: s } : {}),
                  ...(null != l ? { marketCapUsd: l } : {}),
                  username: n,
                  ...(a ? { userImageUrl: a } : {}),
                  ...(t.symbol ? { coinSymbol: t.symbol } : {}),
                  ...(t.name ? { coinName: t.name } : {}),
                  ...(t.image_uri ? { imageUrl: t.image_uri } : {}),
                  ...(t.created_timestamp
                    ? { createdTs: t.created_timestamp }
                    : {}),
                };
              })({
                coin: J,
                figures: tt,
                mint: z,
                walletAddress: N,
                ownerLabel: to,
                ownerImageUrl: tl,
              }),
            ),
            figures: tt,
          });
        let tm = tp?.key === tu ? tp : null,
          tg = tm?.json ?? null,
          ty = tm?.figures ?? tt,
          tx = !!ti;
        E[13] !== tx || E[14] !== tg
          ? ((_ = { bodyJson: tg, enabled: tx }),
            (E[13] = tx),
            (E[14] = tg),
            (E[15] = _))
          : (_ = E[15]);
        let t_ = (function (t) {
          let e,
            r,
            i,
            a,
            s,
            l,
            o,
            u,
            h,
            d = (0, n.c)(24),
            { bodyJson: p, enabled: f } = t,
            m = (0, au.useQueryClient)();
          d[0] === Symbol.for("react.memo_cache_sentinel")
            ? ((e = new Map()), (d[0] = e))
            : (e = d[0]);
          let g = (0, c.useRef)(e);
          d[1] !== p
            ? ((r = ["replay-video-kickoff", p]), (d[1] = p), (d[2] = r))
            : (r = d[2]);
          let x = f && null != p;
          (d[3] !== p
            ? ((i = async () => {
                let t = JSON.parse(p ?? "{}"),
                  e = await ad()("POST /share-video/replay", { body: t });
                return (ac(e), e);
              }),
              (d[3] = p),
              (d[4] = i))
            : (i = d[4]),
            d[5] !== r || d[6] !== x || d[7] !== i
              ? ((a = {
                  queryKey: r,
                  enabled: x,
                  staleTime: 1 / 0,
                  refetchOnWindowFocus: !1,
                  retry: !1,
                  queryFn: i,
                }),
                (d[5] = r),
                (d[6] = x),
                (d[7] = i),
                (d[8] = a))
              : (a = d[8]));
          let _ = (0, y.useQuery)(a),
            v = _.data?.status === "rendering" ? _.data.renderId : null;
          d[9] !== v
            ? ((s = ["replay-video-status", v]), (d[9] = v), (d[10] = s))
            : (s = d[10]);
          let b = null != v;
          (d[11] !== v
            ? ((l = async () => {
                let t = (g.current.get(v ?? "") ?? 0) + 1;
                if ((g.current.set(v ?? "", t), t > 60))
                  throw Error("replay video render exceeded its time budget");
                let e = await ad()("GET /share-video/replay/{renderId}", {
                  params: { renderId: v ?? "" },
                });
                return (ac(e), e);
              }),
              (d[11] = v),
              (d[12] = l))
            : (l = d[12]),
            d[13] !== s || d[14] !== b || d[15] !== l
              ? ((o = {
                  queryKey: s,
                  enabled: b,
                  refetchOnWindowFocus: !1,
                  retry: 2,
                  refetchInterval: ap,
                  queryFn: l,
                }),
                (d[13] = s),
                (d[14] = b),
                (d[15] = l),
                (d[16] = o))
              : (o = d[16]));
          let w = (0, y.useQuery)(o),
            M =
              _.data?.status === "done"
                ? _.data
                : w.data?.status === "done"
                  ? w.data
                  : null,
            T = M?.videoUrl ?? null,
            k = "hidden";
          (f &&
            null != p &&
            (k = T
              ? "ready"
              : _.isError || w.isError || M
                ? "error"
                : "preparing"),
            d[17] !== _ || d[18] !== m
              ? ((u = () => {
                  (g.current.clear(),
                    _.refetch().then((t) => {
                      t.data?.status === "rendering" &&
                        m.refetchQueries({
                          queryKey: ["replay-video-status", t.data.renderId],
                          exact: !0,
                        });
                    }));
                }),
                (d[17] = _),
                (d[18] = m),
                (d[19] = u))
              : (u = d[19]));
          let S = u;
          return (
            d[20] !== S || d[21] !== k || d[22] !== T
              ? ((h = { status: k, videoUrl: T, retry: S }),
                (d[20] = S),
                (d[21] = k),
                (d[22] = T),
                (d[23] = h))
              : (h = d[23]),
            h
          );
        })(_);
        E[16] !== tg
          ? ((v = tg ? JSON.parse(tg) : null), (E[16] = tg), (E[17] = v))
          : (v = E[17]);
        let tv = v;
        if (E[18] !== z || E[19] !== te || E[20] !== N)
          ((b = te
            ? `/callouts/${encodeURIComponent(z)}/${encodeURIComponent(te.calloutId)}`
            : `/replay/${encodeURIComponent(z)}/${encodeURIComponent(N)}`),
            (E[18] = z),
            (E[19] = te),
            (E[20] = N),
            (E[21] = b));
        else b = E[21];
        let tb = b;
        E[22] !== tb
          ? ((w = () => `${window.location.origin}${tb}`),
            (E[22] = tb),
            (E[23] = w))
          : (w = E[23]);
        let tw = w;
        E[24] !== z || E[25] !== tb || E[26] !== tw || E[27] !== H
          ? ((M = () => {
              navigator.clipboard.writeText(tw()).then(
                () => {
                  (f.c.success(H("web.callouts.share_link_copied")),
                    (0, ay.fG)({
                      shareType: l.qp.PNL,
                      shareMethod: l.hF.COPY_LINK,
                      mint: z,
                      shareUrl: tb,
                    }));
                },
                () => f.c.error(H("web.callouts.share_copy_failed")),
              );
            }),
            (E[24] = z),
            (E[25] = tb),
            (E[26] = tw),
            (E[27] = H),
            (E[28] = M))
          : (M = E[28]);
        let tM = M;
        E[29] !== J?.symbol || E[30] !== z || E[31] !== tb || E[32] !== t_
          ? ((T = () => {
              let t;
              if ("error" === t_.status) return void t_.retry();
              let e = ag(t_.videoUrl);
              if (!e) return;
              let r = document.createElement("a");
              ((r.href = e),
                (t = J?.symbol),
                (r.download = `pump-replay${t ? `-${t}` : ""}.mp4`),
                (r.target = "_blank"),
                (r.rel = "noopener"),
                r.click(),
                (0, ay.fG)({
                  shareType: l.qp.PNL,
                  shareMethod: l.hF.DOWNLOAD,
                  mint: z,
                  shareUrl: tb,
                }));
            }),
            (E[29] = J?.symbol),
            (E[30] = z),
            (E[31] = tb),
            (E[32] = t_),
            (E[33] = T))
          : (T = E[33]);
        let tT = T,
          tk = "ready" === Q && null != Z && null != ty && null != J,
          [tS, tA] = (0, c.useState)(void 0 === L ? "chart" : L),
          tF = Y || "replay" === tS,
          tC =
            "card" === (void 0 === $ ? "card" : $) &&
            "overflow-hidden rounded-2xl border border-border-secondary";
        E[34] !== tC
          ? ((k = (0, ax.c)("relative w-full bg-bg-primary", tC)),
            (E[34] = tC),
            (E[35] = k))
          : (k = E[35]);
        let tP = !Y && "md:grid-cols-[minmax(340px,420px)_auto]";
        E[36] !== tP
          ? ((S = (0, ax.c)("grid", tP)), (E[36] = tP), (E[37] = S))
          : (S = E[37]);
        let tj = !Y && "md:col-start-2 md:row-start-1",
          tO = !Y && "md:w-[clamp(420px,calc(100vw-452px),640px)]",
          tU = !Y && tF && "max-md:sticky max-md:top-0 max-md:z-10";
        return (
          E[38] !== tj || E[39] !== tO || E[40] !== tU
            ? ((A = (0, ax.c)("flex flex-col bg-bg-primary", tj, tO, tU)),
              (E[38] = tj),
              (E[39] = tO),
              (E[40] = tU),
              (E[41] = A))
            : (A = E[41]),
          E[42] !== G || E[43] !== H
            ? ((F = G
                ? (0, i.jsxs)("div", {
                    className:
                      "flex items-center justify-between gap-3 border-b border-border-secondary px-4 py-3 md:hidden",
                    children: [
                      (0, i.jsx)("span", {
                        className:
                          "text-sm font-semibold leading-5 text-text-primary",
                        children: H("web.replay.title"),
                      }),
                      (0, i.jsx)("button", {
                        type: "button",
                        onClick: G,
                        "aria-label": H("common.close"),
                        className:
                          "flex size-8 items-center justify-center rounded-full bg-bg-secondary text-text-secondary transition-colors hover:bg-bg-tertiary hover:text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-tertiary",
                        children: (0, i.jsx)(a.x6, { size: 16 }),
                      }),
                    ],
                  })
                : null),
              (E[42] = G),
              (E[43] = H),
              (E[44] = F))
            : (F = E[44]),
          E[45] !== Y || E[46] !== tS || E[47] !== G || E[48] !== H
            ? ((C = Y
                ? null
                : (0, i.jsxs)("div", {
                    className:
                      "flex items-center justify-between gap-3 border-b border-border-secondary px-3 py-2.5",
                    children: [
                      (0, i.jsx)("div", {
                        role: "group",
                        "aria-label": H("web.replay.mode_group_a11y"),
                        className:
                          "flex items-center gap-1 rounded-lg bg-bg-secondary p-0.5",
                        children: [
                          ["chart", H("web.replay.mode_chart")],
                          ["replay", (0, a_.G)("Trade replay")],
                        ].map((t) => {
                          let [e, r] = t;
                          return (0, i.jsx)(
                            "button",
                            {
                              type: "button",
                              "aria-pressed": tS === e,
                              "data-testid": `replay-media-tab-${e}`,
                              onClick: () => tA(e),
                              className: (0, ax.c)(
                                "rounded-md px-3 py-1 text-xs font-medium transition-colors",
                                tS === e
                                  ? "bg-bg-tertiary text-text-primary"
                                  : "text-text-tertiary hover:text-text-primary",
                              ),
                              children: r,
                            },
                            e,
                          );
                        }),
                      }),
                      G
                        ? (0, i.jsx)("button", {
                            type: "button",
                            onClick: G,
                            "aria-label": H("common.close"),
                            className:
                              "hidden size-8 items-center justify-center rounded-full bg-bg-secondary text-text-secondary transition-colors hover:bg-bg-tertiary hover:text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-tertiary md:flex",
                            children: (0, i.jsx)(a.x6, { size: 16 }),
                          })
                        : null,
                    ],
                  })),
              (E[45] = Y),
              (E[46] = tS),
              (E[47] = G),
              (E[48] = H),
              (E[49] = C))
            : (C = E[49]),
          E[50] !== J ||
          E[51] !== tM ||
          E[52] !== tT ||
          E[53] !== Y ||
          E[54] !== tv ||
          E[55] !== tk ||
          E[56] !== tF ||
          E[57] !== ty ||
          E[58] !== Q ||
          E[59] !== H ||
          E[60] !== t_.status
            ? ((P = tF
                ? (0, i.jsxs)(i.Fragment, {
                    children: [
                      (0, i.jsx)("div", {
                        className: Y
                          ? "relative aspect-[9/16] w-full bg-bg-primary"
                          : "relative aspect-[9/16] max-h-[68dvh] w-full bg-bg-primary md:mx-auto md:h-[min(720px,calc(100dvh-200px))] md:max-h-none md:w-auto",
                        "data-testid": "position-replay-film",
                        children: tk
                          ? tv
                            ? (0, i.jsx)(nU, {
                                body: tv,
                                isOpenPosition: ty.isOpenPosition,
                                className: "size-full",
                              })
                            : (0, i.jsx)(aM, {
                                pulse: !0,
                                children: H("web.replay.preparing_video"),
                              })
                          : "loading" === Q
                            ? (0, i.jsx)("div", {
                                className:
                                  "size-full animate-pulse bg-bg-secondary/60",
                                "data-testid": "position-replay-loading",
                              })
                            : (0, i.jsx)(aM, {
                                testId: "position-replay-status",
                                children:
                                  "unsupported" === Q
                                    ? H("web.replay.status_unsupported")
                                    : "empty" === Q
                                      ? H("web.replay.status_empty")
                                      : H("web.replay.status_error"),
                              }),
                      }),
                      tk
                        ? (0, i.jsxs)("div", {
                            className:
                              "flex gap-2 border-t border-border-secondary p-3",
                            children: [
                              (0, i.jsx)("div", {
                                className: "min-w-0 flex-1",
                                children: (0, i.jsx)(s.K, {
                                  variant: "secondary",
                                  size: 36,
                                  isFullWidth: !0,
                                  iconStart: (0, i.jsx)(a.HU, {
                                    className: "size-4",
                                  }),
                                  onClick: tM,
                                  children: H("common.copy_link"),
                                }),
                              }),
                              "hidden" !== t_.status
                                ? (0, i.jsx)("div", {
                                    className: "min-w-0 flex-1",
                                    children: (0, i.jsx)(s.K, {
                                      variant: "secondary",
                                      size: 36,
                                      isFullWidth: !0,
                                      iconStart: (0, i.jsx)(a.ux, {
                                        className: "size-4",
                                      }),
                                      isDisabled: "preparing" === t_.status,
                                      onClick: tT,
                                      children:
                                        "preparing" === t_.status
                                          ? H("web.replay.preparing_short")
                                          : "error" === t_.status
                                            ? H("web.replay.video_retry")
                                            : H("common.download"),
                                    }),
                                  })
                                : null,
                            ],
                          })
                        : null,
                    ],
                  })
                : (0, i.jsxs)("div", {
                    className:
                      "flex w-full flex-col gap-3 p-3 md:h-[min(720px,calc(100dvh-200px))] md:overflow-y-auto md:overscroll-contain [&>*]:shrink-0",
                    "data-testid": "position-replay-chart-tab",
                    children: [
                      (0, i.jsx)(av, {
                        coin: J ?? void 0,
                        compactTradeBox: !0,
                      }),
                      (0, i.jsx)(ab, { coin: J ?? void 0 }),
                      J ? (0, i.jsx)(aw, { coin: J }) : null,
                    ],
                  })),
              (E[50] = J),
              (E[51] = tM),
              (E[52] = tT),
              (E[53] = Y),
              (E[54] = tv),
              (E[55] = tk),
              (E[56] = tF),
              (E[57] = ty),
              (E[58] = Q),
              (E[59] = H),
              (E[60] = t_.status),
              (E[61] = P))
            : (P = E[61]),
          E[62] !== A || E[63] !== F || E[64] !== C || E[65] !== P
            ? ((j = (0, i.jsxs)("div", {
                className: A,
                "data-testid": "position-replay-media",
                children: [F, C, P],
              })),
              (E[62] = A),
              (E[63] = F),
              (E[64] = C),
              (E[65] = P),
              (E[66] = j))
            : (j = E[66]),
          E[67] !== J ||
          E[68] !== tr ||
          E[69] !== Y ||
          E[70] !== z ||
          E[71] !== G ||
          E[72] !== te ||
          E[73] !== ta ||
          E[74] !== I ||
          E[75] !== to ||
          E[76] !== tk ||
          E[77] !== ty ||
          E[78] !== H ||
          E[79] !== Z ||
          E[80] !== ti ||
          E[81] !== N
            ? ((O = Y
                ? null
                : (0, i.jsx)("aside", {
                    className:
                      "isolate min-w-0 border-t border-border-secondary md:relative md:col-start-1 md:row-start-1 md:border-r md:border-t-0",
                    children: (0, i.jsxs)("div", {
                      className:
                        "flex flex-col md:absolute md:inset-0 md:overflow-y-auto md:overscroll-contain md:[scrollbar-width:none] md:[&::-webkit-scrollbar]:hidden",
                      children: [
                        (0, i.jsx)("div", {
                          className: "flex flex-col gap-5 px-5 pt-5",
                          children: (0, i.jsx)("header", {
                            className:
                              "-mx-5 flex items-center gap-3 border-b border-border-secondary px-5 pb-4",
                            children: J
                              ? (0, i.jsxs)(i.Fragment, {
                                  children: [
                                    (0, i.jsx)(d.default, {
                                      href: tr,
                                      onClick: G,
                                      className:
                                        "block size-10 shrink-0 overflow-hidden rounded-xl bg-bg-secondary",
                                      children: (0, i.jsx)(m.f, {
                                        sourceImageUrl: J.image_uri ?? "",
                                        mint: z,
                                        imageType: g.d.COIN_IMAGE,
                                        alt: J.name ?? J.symbol ?? "coin",
                                        width: 40,
                                        height: 40,
                                        className:
                                          "size-full rounded-xl object-cover",
                                        loading: "lazy",
                                      }),
                                    }),
                                    (0, i.jsxs)("div", {
                                      className: "flex min-w-0 flex-1 flex-col",
                                      children: [
                                        (0, i.jsx)(d.default, {
                                          href: tr,
                                          onClick: G,
                                          className:
                                            "truncate text-base font-semibold leading-6 text-text-primary hover:underline",
                                          children: J.name,
                                        }),
                                        (0, i.jsx)("span", {
                                          className:
                                            "truncate text-xs leading-4 text-text-tertiary",
                                          children: J.symbol,
                                        }),
                                      ],
                                    }),
                                    (0, i.jsx)(s.L, {
                                      as: d.default,
                                      href: tr,
                                      onClick: G,
                                      variant: "secondary",
                                      size: 40,
                                      children: H("web.coin.view_coin"),
                                    }),
                                  ],
                                })
                              : (0, i.jsxs)("div", {
                                  className:
                                    "flex min-w-0 flex-1 flex-col gap-0.5",
                                  children: [
                                    (0, i.jsx)("span", {
                                      className:
                                        "text-base font-semibold leading-6 text-text-primary",
                                      children: H("web.replay.title"),
                                    }),
                                    (0, i.jsx)("span", {
                                      className:
                                        "truncate text-xs leading-4 text-text-tertiary",
                                      children: I,
                                    }),
                                  ],
                                }),
                          }),
                        }),
                        J && void 0 === te
                          ? (0, i.jsx)("div", {
                              className: "px-5",
                              children: (0, i.jsx)(nH, {}),
                            })
                          : null,
                        te && J
                          ? (0, i.jsx)("div", {
                              className: "px-5",
                              children: (0, i.jsx)(nK, {
                                mint: z,
                                calloutId: te.calloutId,
                                coin: J,
                                owner: ta,
                                viewerAddress: ti,
                                fallback:
                                  Z && ty
                                    ? (0, i.jsx)("div", {
                                        className: "py-5",
                                        children: (0, i.jsx)(nq, {
                                          mint: z,
                                          walletAddress: N,
                                          ownerName: to,
                                          ownerProfileImage: ta?.profile_image,
                                          ownerAvatarDecoration:
                                            ta?.resolved_avatar_decoration,
                                          coin: J,
                                          timeline: Z,
                                          figures: ty,
                                          callout: te,
                                        }),
                                      })
                                    : null,
                              }),
                            })
                          : tk
                            ? (0, i.jsx)("div", {
                                className: "px-5",
                                children: (0, i.jsx)("div", {
                                  className: "py-5",
                                  children: (0, i.jsx)(nq, {
                                    mint: z,
                                    walletAddress: N,
                                    ownerName: to,
                                    ownerProfileImage: ta?.profile_image,
                                    ownerAvatarDecoration:
                                      ta?.resolved_avatar_decoration,
                                    coin: J,
                                    timeline: Z,
                                    figures: ty,
                                    callout: te,
                                  }),
                                }),
                              })
                            : null,
                      ],
                    }),
                  })),
              (E[67] = J),
              (E[68] = tr),
              (E[69] = Y),
              (E[70] = z),
              (E[71] = G),
              (E[72] = te),
              (E[73] = ta),
              (E[74] = I),
              (E[75] = to),
              (E[76] = tk),
              (E[77] = ty),
              (E[78] = H),
              (E[79] = Z),
              (E[80] = ti),
              (E[81] = N),
              (E[82] = O))
            : (O = E[82]),
          E[83] !== S || E[84] !== j || E[85] !== O
            ? ((U = (0, i.jsxs)("div", { className: S, children: [j, O] })),
              (E[83] = S),
              (E[84] = j),
              (E[85] = O),
              (E[86] = U))
            : (U = E[86]),
          E[87] !== k || E[88] !== U
            ? ((R = (0, i.jsx)("section", {
                className: k,
                "data-testid": "position-replay-view",
                children: U,
              })),
              (E[87] = k),
              (E[88] = U),
              (E[89] = R))
            : (R = E[89]),
          R
        );
      },
    ],
    982047,
  );
};
