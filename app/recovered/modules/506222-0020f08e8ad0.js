// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(t) => {
  var e = t.i(719372),
    i = t.i(120194),
    s = t.i(720802);
  let n = (...t) => t.reduce((t, e) => (i) => e(t(i)));
  t.s(["f", 0, n], 815645);
  var r = t.i(853624),
    o = t.i(633836),
    a = t.i(906470),
    l = t.i(725542),
    h = t.i(995905),
    u = t.i(970080),
    d = t.i(49997),
    c = t.i(34771),
    p = t.i(108027);
  function m(t, e, i) {
    return (i < 0 && (i += 1), i > 1 && (i -= 1), i < 1 / 6)
      ? t + (e - t) * 6 * i
      : i < 0.5
        ? e
        : i < 2 / 3
          ? t + (e - t) * (2 / 3 - i) * 6
          : t;
  }
  var f = t.i(328076);
  function y(t, e) {
    return (i) => (i > 0 ? e : t);
  }
  var v = t.i(341330);
  let g = (t, e, i) => {
      let s = t * t,
        n = i * (e * e - s) + s;
      return n < 0 ? 0 : Math.sqrt(n);
    },
    x = [c.f, f.f, p.f];
  function P(t) {
    let e = x.find((e) => e.test(t));
    if (
      ((0, l.w)(
        !!e,
        `'${t}' is not an animatable color. Use the equivalent color code instead.`,
        "color-not-animatable",
      ),
      !e)
    )
      return !1;
    let i = e.parse(t);
    return (
      e === p.f &&
        (i = (function ({ hue: t, saturation: e, lightness: i, alpha: s }) {
          ((t /= 360), (i /= 100));
          let n = 0,
            r = 0,
            o = 0;
          if ((e /= 100)) {
            let s = i < 0.5 ? i * (1 + e) : i + e - i * e,
              a = 2 * i - s;
            ((n = m(a, s, t + 1 / 3)),
              (r = m(a, s, t)),
              (o = m(a, s, t - 1 / 3)));
          } else n = r = o = i;
          return {
            red: Math.round(255 * n),
            green: Math.round(255 * r),
            blue: Math.round(255 * o),
            alpha: s,
          };
        })(i)),
      i
    );
  }
  let T = (t, e) => {
      let i = P(t),
        s = P(e);
      if (!i || !s) return y(t, e);
      let n = { ...i };
      return (t) => (
        (n.red = g(i.red, s.red, t)),
        (n.green = g(i.green, s.green, t)),
        (n.blue = g(i.blue, s.blue, t)),
        (n.alpha = (0, v.f)(i.alpha, s.alpha, t)),
        f.f.transform(n)
      );
    },
    w = new Set(["none", "hidden"]);
  function S(t, e) {
    return (i) => (0, v.f)(t, e, i);
  }
  function A(t) {
    return "number" == typeof t
      ? S
      : "string" == typeof t
        ? (0, h.u)(t)
          ? y
          : u.f.test(t)
            ? T
            : b
        : Array.isArray(t)
          ? E
          : "object" == typeof t
            ? u.f.test(t)
              ? T
              : D
            : y;
  }
  function E(t, e) {
    let i = [...t],
      s = i.length,
      n = t.map((t, i) => A(t)(t, e[i]));
    return (t) => {
      for (let e = 0; e < s; e++) i[e] = n[e](t);
      return i;
    };
  }
  function D(t, e) {
    let i = { ...t, ...e },
      s = {};
    for (let n in i)
      void 0 !== t[n] && void 0 !== e[n] && (s[n] = A(t[n])(t[n], e[n]));
    return (t) => {
      for (let e in s) i[e] = s[e](t);
      return i;
    };
  }
  let b = (t, e) => {
    let i = d.u.createTransformer(e),
      s = (0, d.L)(t),
      r = (0, d.L)(e);
    if (
      !(
        s.indexes.var.length === r.indexes.var.length &&
        s.indexes.color.length === r.indexes.color.length &&
        s.indexes.number.length >= r.indexes.number.length
      )
    )
      return (
        (0, l.w)(
          !0,
          `Complex values '${t}' and '${e}' too different to mix. Ensure all colors are of the same type, and that each contains the same quantity of number and color values. Falling back to instant transition.`,
          "complex-values-different",
        ),
        y(t, e)
      );
    if ((w.has(t) && !r.values.length) || (w.has(e) && !s.values.length))
      return w.has(t) ? (i) => (i <= 0 ? t : e) : (i) => (i >= 1 ? e : t);
    return n(
      E(
        (function (t, e) {
          let i = [],
            s = { color: 0, var: 0, number: 0 };
          for (let n = 0; n < e.values.length; n++) {
            let r = e.types[n],
              o = t.indexes[r][s[r]],
              a = t.values[o] ?? 0;
            ((i[n] = a), s[r]++);
          }
          return i;
        })(s, r),
        r.values,
      ),
      i,
    );
  };
  function M(t, e, i) {
    return "number" == typeof t && "number" == typeof e && "number" == typeof i
      ? (0, v.f)(t, e, i)
      : A(t)(t, e);
  }
  var k = t.i(907953);
  let V = (t) => {
    let e = ({ timestamp: e }) => t(e);
    return {
      start: (t = !0) => k.y.update(e, t),
      stop: () => (0, k.Y)(e),
      now: () => (k.I.isProcessing ? k.I.timestamp : s.f.now()),
    };
  };
  var L = t.i(50252);
  function C(t) {
    let e = 0,
      i = t.next(e);
    for (; !i.done && e < 2e4; ) ((e += 50), (i = t.next(e)));
    return e >= 2e4 ? 1 / 0 : e;
  }
  let R = 0.01,
    j = 2,
    B = 0.005,
    I = 0.5;
  function O(t, e) {
    return t * Math.sqrt(1 - e * e);
  }
  let F = ["duration", "bounce"],
    U = ["stiffness", "damping", "mass"];
  function $(t, e) {
    return e.some((e) => void 0 !== t[e]);
  }
  function z(t = 0.3, e = 0.3) {
    let i,
      s,
      n,
      a,
      h,
      u,
      d =
        "object" != typeof t
          ? { visualDuration: t, keyframes: [0, 1], bounce: e }
          : t,
      { restSpeed: c, restDelta: p } = d,
      m = d.keyframes[0],
      f = d.keyframes[d.keyframes.length - 1],
      y = { done: !1, value: m },
      {
        stiffness: v,
        damping: g,
        mass: x,
        duration: P,
        velocity: T,
        isResolvedFromDuration: w,
      } = (function (t) {
        let e = {
          velocity: 0,
          stiffness: 100,
          damping: 10,
          mass: 1,
          isResolvedFromDuration: !1,
          ...t,
        };
        if (!$(t, U) && $(t, F))
          if (((e.velocity = 0), t.visualDuration)) {
            let i = (2 * Math.PI) / (1.2 * t.visualDuration),
              s = i * i,
              n = 2 * (0, r.f)(0.05, 1, 1 - (t.bounce || 0)) * Math.sqrt(s);
            e = { ...e, mass: 1, stiffness: s, damping: n };
          } else {
            let i = (function ({
              duration: t = 800,
              bounce: e = 0.3,
              velocity: i = 0,
              mass: s = 1,
            }) {
              let n, a;
              (0, l.w)(
                t <= (0, o.Z)(10),
                "Spring duration must be 10 seconds or less",
                "spring-duration-limit",
              );
              let h = 1 - e;
              ((h = (0, r.f)(0.05, 1, h)),
                (t = (0, r.f)(0.01, 10, (0, o.q)(t))),
                h < 1
                  ? ((n = (e) => {
                      let s = e * h,
                        n = s * t;
                      return 0.001 - ((s - i) / O(e, h)) * Math.exp(-n);
                    }),
                    (a = (e) => {
                      let s = e * h * t,
                        r = Math.pow(h, 2) * Math.pow(e, 2) * t,
                        o = Math.exp(-s),
                        a = O(Math.pow(e, 2), h);
                      return (
                        ((s * i + i - r) * o * (-n(e) + 0.001 > 0 ? -1 : 1)) / a
                      );
                    }))
                  : ((n = (e) => -0.001 + Math.exp(-e * t) * ((e - i) * t + 1)),
                    (a = (e) => t * t * (i - e) * Math.exp(-e * t))));
              let u = (function (t, e, i) {
                let s = i;
                for (let i = 1; i < 12; i++) s -= t(s) / e(s);
                return s;
              })(n, a, 5 / t);
              if (((t = (0, o.Z)(t)), isNaN(u)))
                return { stiffness: 100, damping: 10, duration: t };
              {
                let e = Math.pow(u, 2) * s;
                return {
                  stiffness: e,
                  damping: 2 * h * Math.sqrt(s * e),
                  duration: t,
                };
              }
            })({ ...t, velocity: 0 });
            (e = { ...e, ...i, mass: 1 }).isResolvedFromDuration = !0;
          }
        return e;
      })({ ...d, velocity: -(0, o.q)(d.velocity || 0) }),
      S = T || 0,
      A = g / (2 * Math.sqrt(v * x)),
      E = f - m,
      D = (0, o.q)(Math.sqrt(v / x)),
      b = 5 > Math.abs(E);
    if ((c || (c = b ? R : j), p || (p = b ? B : I), A < 1))
      ((n = O(D, A)),
        (a = (S + A * D * E) / n),
        (i = (t) =>
          f -
          Math.exp(-A * D * t) * (a * Math.sin(n * t) + E * Math.cos(n * t))),
        (h = A * D * a + E * n),
        (u = A * D * E - a * n),
        (s = (t) =>
          Math.exp(-A * D * t) * (h * Math.sin(n * t) + u * Math.cos(n * t))));
    else if (1 === A) {
      i = (t) => f - Math.exp(-D * t) * (E + (S + D * E) * t);
      let t = S + D * E;
      s = (e) => Math.exp(-D * e) * (D * t * e - S);
    } else {
      let t = D * Math.sqrt(A * A - 1);
      i = (e) => {
        let i = Math.exp(-A * D * e),
          s = Math.min(t * e, 300);
        return (
          f - (i * ((S + A * D * E) * Math.sinh(s) + t * E * Math.cosh(s))) / t
        );
      };
      let e = (S + A * D * E) / t,
        n = A * D * e - E * t,
        r = A * D * E - e * t;
      s = (e) => {
        let i = Math.exp(-A * D * e),
          s = Math.min(t * e, 300);
        return i * (n * Math.sinh(s) + r * Math.cosh(s));
      };
    }
    let M = {
      calculatedDuration: (w && P) || null,
      velocity: (t) => (0, o.Z)(s(t)),
      next: (t) => {
        if (!w && A < 1) {
          let e = Math.exp(-A * D * t),
            i = Math.sin(n * t),
            s = Math.cos(n * t),
            r = f - e * (a * i + E * s);
          return (
            (y.done =
              Math.abs((0, o.Z)(e * (h * i + u * s))) <= c &&
              Math.abs(f - r) <= p),
            (y.value = y.done ? f : r),
            y
          );
        }
        let e = i(t);
        return (
          w
            ? (y.done = t >= P)
            : (y.done = Math.abs((0, o.Z)(s(t))) <= c && Math.abs(f - e) <= p),
          (y.value = y.done ? f : e),
          y
        );
      },
      toString: () => {
        let t = Math.min(C(M), 2e4),
          e = (0, L.f)((e) => M.next(t * e).value, t, 30);
        return t + "ms " + e;
      },
      toTransition: () => {},
    };
    return M;
  }
  z.applyToOptions = (t) => {
    let e = (function (t, e = 100, i) {
      let s = i({ ...t, keyframes: [0, e] }),
        n = Math.min(C(s), 2e4);
      return {
        type: "keyframes",
        ease: (t) => s.next(n * t).value / e,
        duration: (0, o.q)(n),
      };
    })(t, 100, z);
    return (
      (t.ease = e.ease),
      (t.duration = (0, o.Z)(e.duration)),
      (t.type = "keyframes"),
      t
    );
  };
  var W = t.i(398361);
  function N(t, e, i) {
    let s = Math.max(e - 5, 0);
    return (0, W.f)(i - t(s), e - s);
  }
  function q({
    keyframes: t,
    velocity: e = 0,
    power: i = 0.8,
    timeConstant: s = 325,
    bounceDamping: n = 10,
    bounceStiffness: r = 500,
    modifyTarget: o,
    min: a,
    max: l,
    restDelta: h = 0.5,
    restSpeed: u,
  }) {
    let d,
      c,
      p = t[0],
      m = { done: !1, value: p },
      f = i * e,
      y = p + f,
      v = void 0 === o ? y : o(y);
    v !== y && (f = v - p);
    let g = (t) => -f * Math.exp(-t / s),
      x = (t) => v + g(t),
      P = (t) => {
        let e = g(t),
          i = x(t);
        ((m.done = Math.abs(e) <= h), (m.value = m.done ? v : i));
      },
      T = (t) => {
        let e;
        if (
          ((e = m.value), (void 0 !== a && e < a) || (void 0 !== l && e > l))
        ) {
          var i;
          ((d = t),
            (c = z({
              keyframes: [
                m.value,
                ((i = m.value),
                void 0 === a
                  ? l
                  : void 0 === l || Math.abs(a - i) < Math.abs(l - i)
                    ? a
                    : l),
              ],
              velocity: N(x, t, m.value),
              damping: n,
              stiffness: r,
              restDelta: h,
              restSpeed: u,
            })));
        }
      };
    return (
      T(0),
      {
        calculatedDuration: null,
        next: (t) => {
          let e = !1;
          return (c || void 0 !== d || ((e = !0), P(t), T(t)),
          void 0 !== d && t >= d)
            ? c.next(t - d)
            : (e || P(t), m);
        },
      }
    );
  }
  let Y = (t, e, i) =>
    (((1 - 3 * i + 3 * e) * t + (3 * i - 6 * e)) * t + 3 * e) * t;
  function H(t, e, s, n) {
    return t === e && s === n
      ? i.f
      : (i) =>
          0 === i || 1 === i
            ? i
            : Y(
                (function (t, e, i, s, n) {
                  let r,
                    o,
                    a = 0;
                  do
                    (r = Y((o = e + (i - e) / 2), s, n) - t) > 0
                      ? (i = o)
                      : (e = o);
                  while (Math.abs(r) > 1e-7 && ++a < 12);
                  return o;
                })(i, 0, 1, t, s),
                e,
                n,
              );
  }
  let X = H(0.42, 0, 1, 1),
    G = H(0, 0, 0.58, 1),
    K = H(0.42, 0, 0.58, 1);
  t.s(["t", 0, X, "H", 0, K, "u", 0, G], 515745);
  let J = (t) => (e) => (e <= 0.5 ? t(2 * e) / 2 : (2 - t(2 * (1 - e))) / 2),
    Z = (t) => (e) => 1 - t(1 - e),
    _ = H(0.33, 1.53, 0.69, 0.99),
    Q = Z(_),
    tt = J(Q),
    te = (t) =>
      t >= 1
        ? 1
        : (t *= 2) < 1
          ? 0.5 * Q(t)
          : 0.5 * (2 - Math.pow(2, -10 * (t - 1))),
    ti = (t) => 1 - Math.sin(Math.acos(t)),
    ts = Z(ti),
    tn = J(ti);
  t.s(["d", 0, ti, "s", 0, tn, "o", 0, ts], 509);
  var tr = t.i(210514);
  let to = {
      linear: i.f,
      easeIn: X,
      easeInOut: K,
      easeOut: G,
      circIn: ti,
      circInOut: tn,
      circOut: ts,
      backIn: Q,
      backInOut: tt,
      backOut: _,
      anticipate: te,
    },
    ta = (t) => {
      if ((0, tr.f)(t)) {
        (0, l.k)(
          4 === t.length,
          "Cubic bezier arrays must contain four numerical values.",
          "cubic-bezier-length",
        );
        let [e, i, s, n] = t;
        return H(e, i, s, n);
      }
      return "string" == typeof t
        ? ((0, l.k)(
            void 0 !== to[t],
            `Invalid easing type '${t}'`,
            "invalid-easing-type",
          ),
          to[t])
        : t;
    },
    tl = (t, e, i) => {
      let s = e - t;
      return s ? (i - t) / s : 1;
    };
  function th(t, s, { clamp: o = !0, ease: a, mixer: h } = {}) {
    let u = t.length;
    if (
      ((0, l.k)(
        u === s.length,
        "Both input and output ranges must be the same length",
        "range-length",
      ),
      1 === u)
    )
      return () => s[0];
    if (2 === u && s[0] === s[1]) return () => s[1];
    let d = t[0] === t[1];
    t[0] > t[u - 1] && ((t = [...t].reverse()), (s = [...s].reverse()));
    let c = (function (t, s, r) {
        let o = [],
          a = r || e.f.mix || M,
          l = t.length - 1;
        for (let e = 0; e < l; e++) {
          let r = a(t[e], t[e + 1]);
          (s && (r = n(Array.isArray(s) ? s[e] || i.f : s, r)), o.push(r));
        }
        return o;
      })(s, a, h),
      p = c.length,
      m = (e) => {
        if (d && e < t[0]) return s[0];
        let i = 0;
        if (p > 1) for (; i < t.length - 2 && !(e < t[i + 1]); i++);
        let n = tl(t[i], t[i + 1], e);
        return c[i](n);
      };
    return o ? (e) => m((0, r.f)(t[0], t[u - 1], e)) : m;
  }
  function tu({
    duration: t = 300,
    keyframes: e,
    times: i,
    ease: s = "easeInOut",
  }) {
    var n;
    let r,
      o = Array.isArray(s) && "number" != typeof s[0] ? s.map(ta) : ta(s),
      a = { done: !1, value: e[0] },
      l = th(
        ((n =
          i && i.length === e.length
            ? i
            : (!(function (t, e) {
                let i = t[t.length - 1];
                for (let s = 1; s <= e; s++) {
                  let n = tl(0, e, s);
                  t.push((0, v.f)(i, 1, n));
                }
              })((r = [0]), e.length - 1),
              r)),
        n.map((e) => e * t)),
        e,
        {
          ease: Array.isArray(o)
            ? o
            : e.map(() => o || K).splice(0, e.length - 1),
        },
      );
    return {
      calculatedDuration: t,
      next: (e) => ((a.value = l(e)), (a.done = e >= t), a),
    };
  }
  (t.s(["f", 0, tl], 470934), t.s(["f", 0, th], 562667));
  var td = t.i(412126);
  let tc = { decay: q, inertia: q, tween: tu, keyframes: tu, spring: z };
  function tp(t) {
    "string" == typeof t.type && (t.type = tc[t.type]);
  }
  var tm = t.i(247553);
  let tf = (t) => t / 100;
  class ty extends tm.f {
    constructor(t) {
      (super(),
        (this.state = "idle"),
        (this.startTime = null),
        (this.isStopped = !1),
        (this.currentTime = 0),
        (this.holdTime = null),
        (this.playbackSpeed = 1),
        (this.delayState = { done: !1, value: void 0 }),
        (this.stop = () => {
          let { motionValue: t } = this.options;
          (t && t.updatedAt !== s.f.now() && this.tick(s.f.now()),
            (this.isStopped = !0),
            "idle" !== this.state &&
              (this.teardown(), this.options.onStop?.()));
        }),
        a.f.mainThread++,
        (this.options = t),
        this.initAnimation(),
        this.play(),
        !1 === t.autoplay && this.pause());
    }
    initAnimation() {
      let { options: t } = this;
      tp(t);
      let {
          type: e = tu,
          repeat: i = 0,
          repeatDelay: s = 0,
          repeatType: r,
          velocity: o = 0,
        } = t,
        { keyframes: a } = t,
        l = e || tu;
      l !== tu &&
        "number" != typeof a[0] &&
        ((this.mixKeyframes = n(tf, M(a[0], a[1]))), (a = [0, 100]));
      let h = l({ ...t, keyframes: a });
      ("mirror" === r &&
        (this.mirroredGenerator = l({
          ...t,
          keyframes: [...a].reverse(),
          velocity: -o,
        })),
        null === h.calculatedDuration && (h.calculatedDuration = C(h)));
      let { calculatedDuration: u } = h;
      ((this.calculatedDuration = u),
        (this.resolvedDuration = u + s),
        (this.totalDuration = this.resolvedDuration * (i + 1) - s),
        (this.generator = h));
    }
    updateTime(t) {
      let e = Math.round(t - this.startTime) * this.playbackSpeed;
      null !== this.holdTime
        ? (this.currentTime = this.holdTime)
        : (this.currentTime = e);
    }
    tick(t, e = !1) {
      let i,
        {
          generator: s,
          totalDuration: n,
          mixKeyframes: o,
          mirroredGenerator: a,
          resolvedDuration: l,
          calculatedDuration: h,
        } = this;
      if (null === this.startTime) return s.next(0);
      let {
        delay: u = 0,
        keyframes: d,
        repeat: c,
        repeatType: p,
        repeatDelay: m,
        type: f,
        onUpdate: y,
        finalKeyframe: v,
      } = this.options;
      (this.speed > 0
        ? (this.startTime = Math.min(this.startTime, t))
        : this.speed < 0 &&
          (this.startTime = Math.min(t - n / this.speed, this.startTime)),
        e ? (this.currentTime = t) : this.updateTime(t));
      let g = this.currentTime - u * (this.playbackSpeed >= 0 ? 1 : -1),
        x = this.playbackSpeed >= 0 ? g < 0 : g > n;
      ((this.currentTime = Math.max(g, 0)),
        "finished" === this.state &&
          null === this.holdTime &&
          (this.currentTime = n));
      let P = this.currentTime,
        T = s;
      if (c) {
        let t = Math.min(this.currentTime, n) / l,
          e = Math.floor(t),
          i = t % 1;
        (!i && t >= 1 && (i = 1),
          1 === i && e--,
          (e = Math.min(e, c + 1)) % 2 &&
            ("reverse" === p
              ? ((i = 1 - i), m && (i -= m / l))
              : "mirror" === p && (T = a)),
          (P = (0, r.f)(0, 1, i) * l));
      }
      (x
        ? ((this.delayState.value = d[0]), (i = this.delayState))
        : (i = T.next(P)),
        o && !x && (i.value = o(i.value)));
      let { done: w } = i;
      x ||
        null === h ||
        (w =
          this.playbackSpeed >= 0
            ? this.currentTime >= n
            : this.currentTime <= 0);
      let S =
        null === this.holdTime &&
        ("finished" === this.state || ("running" === this.state && w));
      return (
        S && f !== q && (i.value = (0, td.f)(d, this.options, v, this.speed)),
        y && y(i.value),
        S && this.finish(),
        i
      );
    }
    then(t, e) {
      return this.finished.then(t, e);
    }
    get duration() {
      return (0, o.q)(this.calculatedDuration);
    }
    get iterationDuration() {
      let { delay: t = 0 } = this.options || {};
      return this.duration + (0, o.q)(t);
    }
    get time() {
      return (0, o.q)(this.currentTime);
    }
    set time(t) {
      ((t = (0, o.Z)(t)),
        (this.currentTime = t),
        null === this.startTime ||
        null !== this.holdTime ||
        0 === this.playbackSpeed
          ? (this.holdTime = t)
          : this.driver &&
            (this.startTime = this.driver.now() - t / this.playbackSpeed),
        this.driver
          ? this.driver.start(!1)
          : ((this.startTime = 0),
            (this.state = "paused"),
            (this.holdTime = t),
            this.tick(t)));
    }
    getGeneratorVelocity() {
      let t = this.currentTime;
      if (t <= 0) return this.options.velocity || 0;
      if (this.generator.velocity) return this.generator.velocity(t);
      let e = this.generator.next(t).value;
      return N((t) => this.generator.next(t).value, t, e);
    }
    get speed() {
      return this.playbackSpeed;
    }
    set speed(t) {
      let e = this.playbackSpeed !== t;
      (e && this.driver && this.updateTime(s.f.now()),
        (this.playbackSpeed = t),
        e && this.driver && (this.time = (0, o.q)(this.currentTime)));
    }
    play() {
      if (this.isStopped) return;
      let { driver: t = V, startTime: e } = this.options;
      (this.driver || (this.driver = t((t) => this.tick(t))),
        this.options.onPlay?.());
      let i = this.driver.now();
      ("finished" === this.state
        ? (this.updateFinished(), (this.startTime = i))
        : null !== this.holdTime
          ? (this.startTime = i - this.holdTime)
          : this.startTime || (this.startTime = e ?? i),
        "finished" === this.state &&
          this.speed < 0 &&
          (this.startTime += this.calculatedDuration),
        (this.holdTime = null),
        (this.state = "running"),
        this.driver.start());
    }
    pause() {
      ((this.state = "paused"),
        this.updateTime(s.f.now()),
        (this.holdTime = this.currentTime));
    }
    complete() {
      ("running" !== this.state && this.play(),
        (this.state = "finished"),
        (this.holdTime = null));
    }
    finish() {
      (this.notifyFinished(),
        this.teardown(),
        (this.state = "finished"),
        this.options.onComplete?.());
    }
    cancel() {
      ((this.holdTime = null),
        (this.startTime = 0),
        this.tick(0),
        this.teardown(),
        this.options.onCancel?.());
    }
    teardown() {
      ((this.state = "idle"),
        this.stopDriver(),
        (this.startTime = this.holdTime = null),
        a.f.mainThread--);
    }
    stopDriver() {
      this.driver && (this.driver.stop(), (this.driver = void 0));
    }
    sample(t) {
      return ((this.startTime = 0), this.tick(t, !0));
    }
    attachTimeline(t) {
      return (
        this.options.allowFlatten &&
          ((this.options.type = "keyframes"),
          (this.options.ease = "linear"),
          this.initAnimation()),
        this.driver?.stop(),
        t.observe(this)
      );
    }
  }
  t.s(["f", 0, ty], 904282);
  var tv = t.i(920986),
    tg = t.i(271929),
    tx = t.i(891662);
  let tP = { anticipate: te, backInOut: tt, circInOut: tn };
  class tT extends tx.f {
    constructor(t) {
      ("string" == typeof t.ease && t.ease in tP && (t.ease = tP[t.ease]),
        tp(t),
        super(t),
        void 0 !== t.startTime &&
          !1 !== t.autoplay &&
          (this.startTime = t.startTime),
        (this.options = t));
    }
    updateMotionValue(t) {
      let {
        motionValue: e,
        onUpdate: i,
        onComplete: n,
        element: o,
        ...a
      } = this.options;
      if (!e) return;
      if (void 0 !== t) return void e.set(t);
      let l = new ty({ ...a, autoplay: !1 }),
        h = Math.max(10, s.f.now() - this.startTime),
        u = (0, r.f)(0, 10, h - 10),
        d = l.sample(h).value,
        { name: c } = this.options;
      (o && c && (0, tg.f)(o, c, d),
        e.setWithVelocity(l.sample(Math.max(0, h - u)).value, d, u),
        l.stop());
    }
  }
  var tw = t.i(430142);
  let tS = (t, e) =>
    "zIndex" !== e &&
    !!(
      "number" == typeof t ||
      Array.isArray(t) ||
      ("string" == typeof t &&
        (d.u.test(t) || "0" === t) &&
        !t.startsWith("url("))
    );
  function tA(t) {
    ((t.duration = 0), (t.type = "keyframes"));
  }
  t.s(["f", 0, tA], 425838);
  var tE = tm,
    tD = t.i(761866),
    tb = t.i(337259);
  let tM = /^(?:oklch|oklab|lab|lch|color|color-mix|light-dark)\(/,
    tk = new Set([
      "color",
      "backgroundColor",
      "outlineColor",
      "fill",
      "stroke",
      "borderColor",
      "borderTopColor",
      "borderRightColor",
      "borderBottomColor",
      "borderLeftColor",
    ]),
    tV = (0, tD.f)(() =>
      Object.hasOwnProperty.call(Element.prototype, "animate"),
    );
  class tL extends tE.f {
    constructor({
      autoplay: t = !0,
      delay: e = 0,
      type: i = "keyframes",
      repeat: n = 0,
      repeatDelay: r = 0,
      repeatType: o = "loop",
      keyframes: a,
      name: l,
      motionValue: h,
      element: u,
      ...d
    }) {
      (super(),
        (this.stop = () => {
          (this._animation && (this._animation.stop(), this.stopTimeline?.()),
            this.keyframeResolver?.cancel());
        }),
        (this.createdAt = s.f.now()));
      let c = {
          autoplay: t,
          delay: e,
          type: i,
          repeat: n,
          repeatDelay: r,
          repeatType: o,
          name: l,
          motionValue: h,
          element: u,
          ...d,
        },
        p = u?.KeyframeResolver || tv.p;
      ((this.keyframeResolver = new p(
        a,
        (t, e, i) => this.onKeyframesResolved(t, e, c, !i),
        l,
        h,
        u,
      )),
        this.keyframeResolver?.scheduleResolve());
    }
    onKeyframesResolved(t, n, r, o) {
      let a;
      this.keyframeResolver = void 0;
      let {
        name: h,
        type: u,
        velocity: d,
        delay: c,
        isHandoff: p,
        onUpdate: m,
      } = r;
      this.resolvedAt = s.f.now();
      let f = !0;
      !(function (t, e, i, s) {
        let n = t[0];
        if (null === n) return !1;
        if ("display" === e || "visibility" === e) return !0;
        let r = t[t.length - 1],
          o = tS(n, e),
          a = tS(r, e);
        return (
          (0, l.w)(
            o === a,
            `You are trying to animate ${e} from "${n}" to "${r}". "${o ? r : n}" is not an animatable value.`,
            "value-not-animatable",
          ),
          !!o &&
            !!a &&
            ((function (t) {
              let e = t[0];
              if (1 === t.length) return !0;
              for (let i = 0; i < t.length; i++) if (t[i] !== e) return !0;
            })(t) ||
              (("spring" === i || (0, tw.f)(i)) && s))
        );
      })(t, h, u, d) &&
        ((f = !1),
        (e.f.instantAnimations || !c) && m?.((0, td.f)(t, r, n)),
        (t[0] = t[t.length - 1]),
        tA(r),
        (r.repeat = 0));
      let y = {
          startTime: o
            ? this.resolvedAt && this.resolvedAt - this.createdAt > 40
              ? this.resolvedAt
              : this.createdAt
            : void 0,
          finalKeyframe: n,
          ...r,
          keyframes: t,
        },
        v =
          f &&
          !p &&
          (function (t) {
            let {
              motionValue: e,
              name: i,
              repeatDelay: s,
              repeatType: n,
              damping: r,
              type: o,
              keyframes: a,
            } = t;
            if (!(e?.owner?.current instanceof HTMLElement)) return !1;
            let { onUpdate: l, transformTemplate: h } = e.owner.getProps();
            return (
              tV() &&
              i &&
              (tb.f.has(i) ||
                (tk.has(i) &&
                  (function (t) {
                    for (let e = 0; e < t.length; e++)
                      if ("string" == typeof t[e] && tM.test(t[e])) return !0;
                    return !1;
                  })(a))) &&
              ("transform" !== i || !h) &&
              !l &&
              !s &&
              "mirror" !== n &&
              0 !== r &&
              "inertia" !== o
            );
          })(y),
        g = y.motionValue?.owner?.current;
      if (v)
        try {
          a = new tT({ ...y, element: g });
        } catch {
          a = new ty(y);
        }
      else a = new ty(y);
      (a.finished
        .then(() => {
          this.notifyFinished();
        })
        .catch(i.f),
        this.pendingTimeline &&
          ((this.stopTimeline = a.attachTimeline(this.pendingTimeline)),
          (this.pendingTimeline = void 0)),
        (this._animation = a));
    }
    get finished() {
      return this._animation ? this.animation.finished : this._finished;
    }
    then(t, e) {
      return this.finished.finally(t).then(() => {});
    }
    get animation() {
      return (
        this._animation || (this.keyframeResolver?.resume(), (0, tv.f)()),
        this._animation
      );
    }
    get duration() {
      return this.animation.duration;
    }
    get iterationDuration() {
      return this.animation.iterationDuration;
    }
    get time() {
      return this.animation.time;
    }
    set time(t) {
      this.animation.time = t;
    }
    get speed() {
      return this.animation.speed;
    }
    get state() {
      return this.animation.state;
    }
    set speed(t) {
      this.animation.speed = t;
    }
    get startTime() {
      return this.animation.startTime;
    }
    attachTimeline(t) {
      return (
        this._animation
          ? (this.stopTimeline = this.animation.attachTimeline(t))
          : (this.pendingTimeline = t),
        () => this.stop()
      );
    }
    play() {
      this.animation.play();
    }
    pause() {
      this.animation.pause();
    }
    complete() {
      this.animation.complete();
    }
    cancel() {
      (this._animation && this.animation.cancel(),
        this.keyframeResolver?.cancel());
    }
  }
  t.s(["f", 0, tL], 506222);
};
