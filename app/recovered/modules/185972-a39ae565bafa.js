// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(t) => {
  let e, i;
  var s = t.i(838976),
    n = t.i(120194),
    r = t.i(686968),
    o = t.i(907953),
    a = t.i(587935),
    l = t.i(609846),
    h = t.i(805020),
    u = t.i(923301),
    d = t.i(490350),
    c = t.i(341330);
  function p(t, e, i, s = { passive: !0 }) {
    return (t.addEventListener(e, i, s), () => t.removeEventListener(e, i));
  }
  t.s(["f", 0, p], 508821);
  let m = { x: !1, y: !1 };
  t.s(
    [
      "E",
      0,
      function () {
        return m.x || m.y;
      },
      "x",
      0,
      m,
    ],
    610927,
  );
  var f = t.i(813968);
  function y(t) {
    return t.max - t.min;
  }
  function v(t, e, i, s = 0.5) {
    ((t.origin = s),
      (t.originPoint = (0, c.f)(e.min, e.max, t.origin)),
      (t.scale = y(i) / y(e)),
      (t.translate = (0, c.f)(i.min, i.max, t.origin) - t.originPoint),
      ((t.scale >= 0.9999 && t.scale <= 1.0001) || isNaN(t.scale)) &&
        (t.scale = 1),
      ((t.translate >= -0.01 && t.translate <= 0.01) || isNaN(t.translate)) &&
        (t.translate = 0));
  }
  function g(t, e, i, s = 0) {
    ((t.min = (s ? (0, c.f)(i.min, i.max, s) : i.min) + e.min),
      (t.max = t.min + y(e)));
  }
  function x(t, e, i, s = 0) {
    let n = s ? (0, c.f)(i.min, i.max, s) : i.min;
    ((t.min = e.min - n), (t.max = t.min + y(e)));
  }
  t.s(
    [
      "P",
      0,
      function (t, e, i, s) {
        (v(t.x, e.x, i.x, s ? s.originX : void 0),
          v(t.y, e.y, i.y, s ? s.originY : void 0));
      },
      "M",
      0,
      y,
      "Z",
      0,
      function (t, e, i, s) {
        (g(t.x, e.x, i.x, s?.x), g(t.y, e.y, i.y, s?.y));
      },
      "q",
      0,
      function (t, e, i, s) {
        (x(t.x, e.x, i.x, s?.x), x(t.y, e.y, i.y, s?.y));
      },
      "$",
      0,
      function (t, e, i) {
        return Math.abs(t - e) <= i;
      },
    ],
    710401,
  );
  var P = t.i(825465);
  function T(t) {
    return (0, P.f)(t) && "ownerSVGElement" in t;
  }
  function w(t, e, i) {
    if (null == t) return [];
    if (t instanceof EventTarget) return [t];
    if ("string" == typeof t) {
      let s = document;
      e && (s = e.current);
      let n = i?.[t] ?? s.querySelectorAll(t);
      return n ? Array.from(n) : [];
    }
    return Array.from(t).filter((t) => null != t);
  }
  (t.s(["f", 0, T], 170899), t.s(["f", 0, w], 488133));
  let S = new WeakMap(),
    A = (t, e, i) => (s, n) =>
      n && n[0]
        ? n[0][t + "Size"]
        : T(s) && "getBBox" in s
          ? s.getBBox()[e]
          : s[i],
    E = A("inline", "width", "offsetWidth"),
    D = A("block", "height", "offsetHeight");
  function b({ target: t, borderBoxSize: e }) {
    S.get(t)?.forEach((i) => {
      i(t, {
        get width() {
          return E(t, e);
        },
        get height() {
          return D(t, e);
        },
      });
    });
  }
  function M(t) {
    t.forEach(b);
  }
  let k = new Set();
  function V(t, s) {
    let n;
    return "function" == typeof t
      ? (k.add(t),
        i ||
          ((i = () => {
            let t = {
              get width() {
                return window.innerWidth;
              },
              get height() {
                return window.innerHeight;
              },
            };
            k.forEach((e) => e(t));
          }),
          window.addEventListener("resize", i)),
        () => {
          (k.delete(t),
            k.size ||
              "function" != typeof i ||
              (window.removeEventListener("resize", i), (i = void 0)));
        })
      : (!e && "u" > typeof ResizeObserver && (e = new ResizeObserver(M)),
        (n = w(t)).forEach((t) => {
          let i = S.get(t);
          (i || ((i = new Set()), S.set(t, i)), i.add(s), e?.observe(t));
        }),
        () => {
          n.forEach((t) => {
            let i = S.get(t);
            (i?.delete(s), i?.size || e?.unobserve(t));
          });
        });
  }
  let L = new Set(["BUTTON", "INPUT", "SELECT", "TEXTAREA", "A"]),
    C = new Set(["INPUT", "SELECT", "TEXTAREA"]);
  function R(t) {
    return C.has(t.tagName) || !0 === t.isContentEditable;
  }
  t.s(
    [
      "Y",
      0,
      function (t) {
        return L.has(t.tagName) || !0 === t.isContentEditable;
      },
      "B",
      0,
      R,
    ],
    996584,
  );
  var j = t.i(725542);
  let B = (t) =>
    "mouse" === t.pointerType
      ? "number" != typeof t.button || t.button <= 0
      : !1 !== t.isPrimary;
  function I(t) {
    return { point: { x: t.pageX, y: t.pageY } };
  }
  t.s(["f", 0, B], 658904);
  let O = (t) => (e) => B(e) && t(e, I(e));
  function F(t, e, i, s) {
    return p(t, e, O(i), s);
  }
  t.s(["X", 0, O, "j", 0, I], 373184);
  let U = ({ current: t }) => (t ? t.ownerDocument.defaultView : null);
  var $ = t.i(350986),
    z = t.i(815645),
    W = t.i(633836);
  let N = (t, e) => Math.abs(t - e),
    q = new Set(["auto", "scroll"]);
  class Y {
    constructor(
      t,
      e,
      {
        transformPagePoint: i,
        contextWindow: s = window,
        dragSnapToOrigin: n = !1,
        distanceThreshold: r = 3,
        element: a,
      } = {},
    ) {
      if (
        ((this.startEvent = null),
        (this.lastMoveEvent = null),
        (this.lastMoveEventInfo = null),
        (this.lastRawMoveEventInfo = null),
        (this.handlers = {}),
        (this.contextWindow = window),
        (this.scrollPositions = new Map()),
        (this.removeScrollListeners = null),
        (this.onElementScroll = (t) => {
          this.handleScroll(t.target);
        }),
        (this.onWindowScroll = () => {
          this.handleScroll(window);
        }),
        (this.updatePoint = () => {
          var t, e;
          if (!(this.lastMoveEvent && this.lastMoveEventInfo)) return;
          this.lastRawMoveEventInfo &&
            (this.lastMoveEventInfo = H(
              this.lastRawMoveEventInfo,
              this.transformPagePoint,
            ));
          let i = G(this.lastMoveEventInfo, this.history),
            s = null !== this.startEvent,
            n =
              ((t = i.offset),
              (e = { x: 0, y: 0 }),
              Math.sqrt(N(t.x, e.x) ** 2 + N(t.y, e.y) ** 2) >=
                this.distanceThreshold);
          if (!s && !n) return;
          let { point: r } = i,
            { timestamp: a } = o.I;
          this.history.push({ ...r, timestamp: a });
          let { onStart: l, onMove: h } = this.handlers;
          (s ||
            (l && l(this.lastMoveEvent, i),
            (this.startEvent = this.lastMoveEvent)),
            h && h(this.lastMoveEvent, i));
        }),
        (this.handlePointerMove = (t, e) => {
          ((this.lastMoveEvent = t),
            (this.lastRawMoveEventInfo = e),
            (this.lastMoveEventInfo = H(e, this.transformPagePoint)),
            o.y.update(this.updatePoint, !0));
        }),
        (this.handlePointerUp = (t, e) => {
          this.end();
          let { onEnd: i, onSessionEnd: s, resumeAnimation: n } = this.handlers;
          if (
            ((this.dragSnapToOrigin || !this.startEvent) && n && n(),
            !(this.lastMoveEvent && this.lastMoveEventInfo))
          )
            return;
          let r = G(
            "pointercancel" === t.type
              ? this.lastMoveEventInfo
              : H(e, this.transformPagePoint),
            this.history,
          );
          (this.startEvent && i && i(t, r), s && s(t, r));
        }),
        !B(t))
      )
        return;
      ((this.dragSnapToOrigin = n),
        (this.handlers = e),
        (this.transformPagePoint = i),
        (this.distanceThreshold = r),
        (this.contextWindow = s || window));
      let l = H(I(t), this.transformPagePoint),
        { point: h } = l,
        { timestamp: u } = o.I;
      this.history = [{ ...h, timestamp: u }];
      let { onSessionStart: d } = e;
      (d && d(t, G(l, this.history)),
        (this.removeListeners = (0, z.f)(
          F(this.contextWindow, "pointermove", this.handlePointerMove),
          F(this.contextWindow, "pointerup", this.handlePointerUp),
          F(this.contextWindow, "pointercancel", this.handlePointerUp),
        )),
        a && this.startScrollTracking(a));
    }
    startScrollTracking(t) {
      let e = t.parentElement;
      for (; e; ) {
        let t = getComputedStyle(e);
        ((q.has(t.overflowX) || q.has(t.overflowY)) &&
          this.scrollPositions.set(e, { x: e.scrollLeft, y: e.scrollTop }),
          (e = e.parentElement));
      }
      (this.scrollPositions.set(window, {
        x: window.scrollX,
        y: window.scrollY,
      }),
        window.addEventListener("scroll", this.onElementScroll, {
          capture: !0,
        }),
        window.addEventListener("scroll", this.onWindowScroll),
        (this.removeScrollListeners = () => {
          (window.removeEventListener("scroll", this.onElementScroll, {
            capture: !0,
          }),
            window.removeEventListener("scroll", this.onWindowScroll));
        }));
    }
    handleScroll(t) {
      let e = this.scrollPositions.get(t);
      if (!e) return;
      let i = t === window,
        s = i
          ? { x: window.scrollX, y: window.scrollY }
          : { x: t.scrollLeft, y: t.scrollTop },
        n = { x: s.x - e.x, y: s.y - e.y };
      (0 !== n.x || 0 !== n.y) &&
        (i
          ? this.lastMoveEventInfo &&
            ((this.lastMoveEventInfo.point.x += n.x),
            (this.lastMoveEventInfo.point.y += n.y))
          : this.history.length > 0 &&
            ((this.history[0].x -= n.x), (this.history[0].y -= n.y)),
        this.scrollPositions.set(t, s),
        o.y.update(this.updatePoint, !0));
    }
    updateHandlers(t) {
      this.handlers = t;
    }
    end() {
      (this.removeListeners && this.removeListeners(),
        this.removeScrollListeners && this.removeScrollListeners(),
        this.scrollPositions.clear(),
        (0, o.Y)(this.updatePoint));
    }
  }
  function H(t, e) {
    return e ? { point: e(t.point) } : t;
  }
  function X(t, e) {
    return { x: t.x - e.x, y: t.y - e.y };
  }
  function G({ point: t }, e) {
    return {
      point: t,
      delta: X(t, K(e)),
      offset: X(t, e[0]),
      velocity: (function (t) {
        if (t.length < 2) return { x: 0, y: 0 };
        let e = t.length - 1,
          i = null,
          s = K(t);
        for (
          ;
          e >= 0 && ((i = t[e]), !(s.timestamp - i.timestamp > (0, W.Z)(0.1)));

        )
          e--;
        if (!i) return { x: 0, y: 0 };
        i === t[0] &&
          t.length > 2 &&
          s.timestamp - i.timestamp > 2 * (0, W.Z)(0.1) &&
          (i = t[1]);
        let n = (0, W.q)(s.timestamp - i.timestamp);
        if (0 === n) return { x: 0, y: 0 };
        let r = { x: (s.x - i.x) / n, y: (s.y - i.y) / n };
        return (1 / 0 === r.x && (r.x = 0), 1 / 0 === r.y && (r.y = 0), r);
      })(e),
    };
  }
  function K(t) {
    return t[t.length - 1];
  }
  var J = t.i(470934),
    Z = t.i(853624);
  function _(t, e, i) {
    return {
      min: void 0 !== e ? t.min + e : void 0,
      max: void 0 !== i ? t.max + i - (t.max - t.min) : void 0,
    };
  }
  function Q(t, e) {
    let i = e.min - t.min,
      s = e.max - t.max;
    return (
      e.max - e.min < t.max - t.min && ([i, s] = [s, i]),
      { min: i, max: s }
    );
  }
  function tt(t, e, i) {
    return { min: te(t, e), max: te(t, i) };
  }
  function te(t, e) {
    return "number" == typeof t ? t : t[e] || 0;
  }
  let ti = new WeakMap();
  class ts {
    constructor(t) {
      ((this.openDragLock = null),
        (this.isDragging = !1),
        (this.currentDirection = null),
        (this.originPoint = { x: 0, y: 0 }),
        (this.constraints = !1),
        (this.hasMutatedConstraints = !1),
        (this.elastic = (0, r.J)()),
        (this.latestPointerEvent = null),
        (this.latestPanInfo = null),
        (this.visualElement = t));
    }
    start(t, { snapToCursor: e = !1, distanceThreshold: i } = {}) {
      let { presenceContext: s } = this.visualElement;
      if (s && !1 === s.isPresent) return;
      let n = (t) => {
          (e && this.snapToCursor(I(t).point), this.stopAnimation());
        },
        r = (t, e) => {
          let { drag: i, dragPropagation: s, onDragStart: n } = this.getProps();
          if (
            i &&
            !s &&
            (this.openDragLock && this.openDragLock(),
            (this.openDragLock = (function (t) {
              if ("x" === t || "y" === t)
                if (m[t]) return null;
                else
                  return (
                    (m[t] = !0),
                    () => {
                      m[t] = !1;
                    }
                  );
              return m.x || m.y
                ? null
                : ((m.x = m.y = !0),
                  () => {
                    m.x = m.y = !1;
                  });
            })(i)),
            !this.openDragLock)
          )
            return;
          ((this.latestPointerEvent = t),
            (this.latestPanInfo = e),
            (this.isDragging = !0),
            (this.currentDirection = null),
            this.resolveConstraints(),
            this.visualElement.projection &&
              ((this.visualElement.projection.isAnimationBlocked = !0),
              (this.visualElement.projection.target = void 0)),
            (0, a.f)((t) => {
              let e = this.getAxisMotionValue(t).get() || 0;
              if (f.U.test(e)) {
                let { projection: i } = this.visualElement;
                if (i && i.layout) {
                  let s = i.layout.layoutBox[t];
                  s && (e = y(s) * (parseFloat(e) / 100));
                }
              }
              this.originPoint[t] = e;
            }),
            n && o.y.update(() => n(t, e), !1, !0),
            (0, u.f)(this.visualElement, "transform"));
          let { animationState: r } = this.visualElement;
          r && r.setActive("whileDrag", !0);
        },
        l = (t, e) => {
          ((this.latestPointerEvent = t), (this.latestPanInfo = e));
          let {
            dragPropagation: i,
            dragDirectionLock: s,
            onDirectionLock: n,
            onDrag: r,
          } = this.getProps();
          if (!i && !this.openDragLock) return;
          let { offset: a } = e;
          if (s && null === this.currentDirection) {
            ((this.currentDirection = (function (t, e = 10) {
              let i = null;
              return (
                Math.abs(t.y) > e ? (i = "y") : Math.abs(t.x) > e && (i = "x"),
                i
              );
            })(a)),
              null !== this.currentDirection && n && n(this.currentDirection));
            return;
          }
          (this.updateAxis("x", e.point, a),
            this.updateAxis("y", e.point, a),
            this.visualElement.render(),
            r && o.y.update(() => r(t, e), !1, !0));
        },
        h = (t, e) => {
          ((this.latestPointerEvent = t),
            (this.latestPanInfo = e),
            this.stop(t, e),
            (this.latestPointerEvent = null),
            (this.latestPanInfo = null));
        },
        d = () => {
          let { dragSnapToOrigin: t } = this.getProps();
          (t || this.constraints) && this.startAnimation({ x: 0, y: 0 });
        },
        { dragSnapToOrigin: c } = this.getProps();
      this.panSession = new Y(
        t,
        {
          onSessionStart: n,
          onStart: r,
          onMove: l,
          onSessionEnd: h,
          resumeAnimation: d,
        },
        {
          transformPagePoint: this.visualElement.getTransformPagePoint(),
          dragSnapToOrigin: c,
          distanceThreshold: i,
          contextWindow: U(this.visualElement),
          element: this.visualElement.current,
        },
      );
    }
    stop(t, e) {
      let i = t || this.latestPointerEvent,
        s = e || this.latestPanInfo,
        n = this.isDragging;
      if ((this.cancel(), !n || !s || !i)) return;
      let { velocity: r } = s;
      this.startAnimation(r);
      let { onDragEnd: a } = this.getProps();
      a && o.y.postRender(() => a(i, s));
    }
    cancel() {
      this.isDragging = !1;
      let { projection: t, animationState: e } = this.visualElement;
      (t && (t.isAnimationBlocked = !1), this.endPanSession());
      let { dragPropagation: i } = this.getProps();
      (!i &&
        this.openDragLock &&
        (this.openDragLock(), (this.openDragLock = null)),
        e && e.setActive("whileDrag", !1));
    }
    endPanSession() {
      (this.panSession && this.panSession.end(), (this.panSession = void 0));
    }
    updateAxis(t, e, i) {
      let { drag: s } = this.getProps();
      if (!i || !tr(t, s, this.currentDirection)) return;
      let n = this.getAxisMotionValue(t),
        r = this.originPoint[t] + i[t];
      (this.constraints &&
        this.constraints[t] &&
        (r = (function (t, { min: e, max: i }, s) {
          return (
            void 0 !== e && t < e
              ? (t = s ? (0, c.f)(e, t, s.min) : Math.max(t, e))
              : void 0 !== i &&
                t > i &&
                (t = s ? (0, c.f)(i, t, s.max) : Math.min(t, i)),
            t
          );
        })(r, this.constraints[t], this.elastic[t])),
        n.set(r));
    }
    resolveConstraints() {
      let { dragConstraints: t, dragElastic: e } = this.getProps(),
        i =
          this.visualElement.projection && !this.visualElement.projection.layout
            ? this.visualElement.projection.measure(!1)
            : this.visualElement.projection?.layout,
        s = this.constraints;
      (t && (0, $.f)(t)
        ? this.constraints || (this.constraints = this.resolveRefConstraints())
        : t && i
          ? (this.constraints = (function (
              t,
              { top: e, left: i, bottom: s, right: n },
            ) {
              return { x: _(t.x, i, n), y: _(t.y, e, s) };
            })(i.layoutBox, t))
          : (this.constraints = !1),
        (this.elastic = (function (t = 0.35) {
          return (
            !1 === t ? (t = 0) : !0 === t && (t = 0.35),
            { x: tt(t, "left", "right"), y: tt(t, "top", "bottom") }
          );
        })(e)),
        s !== this.constraints &&
          !(0, $.f)(t) &&
          i &&
          this.constraints &&
          !this.hasMutatedConstraints &&
          (0, a.f)((t) => {
            var e, s;
            let n;
            !1 !== this.constraints &&
              this.getAxisMotionValue(t) &&
              (this.constraints[t] =
                ((e = i.layoutBox[t]),
                (s = this.constraints[t]),
                (n = {}),
                void 0 !== s.min && (n.min = s.min - e.min),
                void 0 !== s.max && (n.max = s.max - e.min),
                n));
          }));
    }
    resolveRefConstraints() {
      var t;
      let { dragConstraints: e, onMeasureDragConstraints: i } = this.getProps();
      if (!e || !(0, $.f)(e)) return !1;
      let s = e.current;
      (0, j.k)(
        null !== s,
        "If `dragConstraints` is set as a React ref, that ref must be passed to another component's `ref` prop.",
        "drag-constraints-ref",
      );
      let { projection: n } = this.visualElement;
      if (!n || !n.layout) return !1;
      n.root && ((n.root.scroll = void 0), n.root.updateScroll());
      let r = (0, l.r)(s, n.root, this.visualElement.getTransformPagePoint()),
        o = ((t = n.layout.layoutBox), { x: Q(t.x, r.x), y: Q(t.y, r.y) });
      if (i) {
        let t = i((0, h.I)(o));
        ((this.hasMutatedConstraints = !!t), t && (o = (0, h.X)(t)));
      }
      return o;
    }
    startAnimation(t) {
      let {
          drag: e,
          dragMomentum: i,
          dragElastic: s,
          dragTransition: n,
          dragSnapToOrigin: r,
          onDragTransitionEnd: o,
        } = this.getProps(),
        l = this.constraints || {};
      return Promise.all(
        (0, a.f)((o) => {
          if (!tr(o, e, this.currentDirection)) return;
          let a = (l && l[o]) || {};
          (!0 === r || r === o) && (a = { min: 0, max: 0 });
          let h = {
            type: "inertia",
            velocity: i ? t[o] : 0,
            bounceStiffness: s ? 200 : 1e6,
            bounceDamping: s ? 40 : 1e7,
            timeConstant: 750,
            restDelta: 1,
            restSpeed: 10,
            ...n,
            ...a,
          };
          return this.startAxisValueAnimation(o, h);
        }),
      ).then(o);
    }
    startAxisValueAnimation(t, e) {
      let i = this.getAxisMotionValue(t);
      return (
        (0, u.f)(this.visualElement, t),
        i.start((0, d.f)(t, i, 0, e, this.visualElement, !1))
      );
    }
    stopAnimation() {
      (0, a.f)((t) => this.getAxisMotionValue(t).stop());
    }
    getAxisMotionValue(t) {
      let e = `_drag${t.toUpperCase()}`;
      return (
        this.visualElement.getProps()[e] ||
        this.visualElement.getValue(t, this.visualElement.latestValues[t] ?? 0)
      );
    }
    snapToCursor(t) {
      (0, a.f)((e) => {
        let { drag: i } = this.getProps();
        if (!tr(e, i, this.currentDirection)) return;
        let { projection: s } = this.visualElement,
          n = this.getAxisMotionValue(e);
        if (s && s.layout) {
          let { min: i, max: r } = s.layout.layoutBox[e],
            o = n.get() || 0;
          n.set(t[e] - (0, c.f)(i, r, 0.5) + o);
        }
      });
    }
    scalePositionWithinConstraints() {
      if (!this.visualElement.current) return;
      let { drag: t, dragConstraints: e } = this.getProps(),
        { projection: i } = this.visualElement;
      if (!(0, $.f)(e) || !i || !this.constraints) return;
      this.stopAnimation();
      let s = { x: 0, y: 0 };
      (0, a.f)((t) => {
        let e = this.getAxisMotionValue(t);
        if (e && !1 !== this.constraints) {
          var i, n;
          let r,
            o,
            a,
            l = e.get();
          s[t] =
            ((i = { min: l, max: l }),
            (n = this.constraints[t]),
            (r = 0.5),
            (o = y(i)),
            (a = y(n)) > o
              ? (r = (0, J.f)(n.min, n.max - o, i.min))
              : o > a && (r = (0, J.f)(i.min, i.max - a, n.min)),
            (0, Z.f)(0, 1, r));
        }
      });
      let { transformTemplate: n } = this.visualElement.getProps();
      ((this.visualElement.current.style.transform = n ? n({}, "") : "none"),
        i.root && i.root.updateScroll(),
        i.updateLayout(),
        (this.constraints = !1),
        this.resolveConstraints(),
        (0, a.f)((e) => {
          if (!tr(e, t, null)) return;
          let i = this.getAxisMotionValue(e),
            { min: n, max: r } = this.constraints[e];
          i.set((0, c.f)(n, r, s[e]));
        }),
        this.visualElement.render());
    }
    addListeners() {
      let t;
      if (!this.visualElement.current) return;
      ti.set(this.visualElement, this);
      let e = this.visualElement.current,
        i = F(e, "pointerdown", (t) => {
          let { drag: i, dragListener: s = !0 } = this.getProps(),
            n = t.target,
            r = n !== e && R(n);
          i && s && !r && this.start(t);
        }),
        s = () => {
          var i, s, n;
          let r,
            o,
            { dragConstraints: a } = this.getProps();
          (0, $.f)(a) &&
            a.current &&
            ((this.constraints = this.resolveRefConstraints()),
            t ||
              ((i = e),
              (s = a.current),
              (r = V(i, tn((n = () => this.scalePositionWithinConstraints())))),
              (o = V(s, tn(n))),
              (t = () => {
                (r(), o());
              })));
        },
        { projection: n } = this.visualElement,
        r = n.addEventListener("measure", s);
      (n && !n.layout && (n.root && n.root.updateScroll(), n.updateLayout()),
        o.y.read(s));
      let l = p(window, "resize", () => this.scalePositionWithinConstraints()),
        h = n.addEventListener(
          "didUpdate",
          ({ delta: t, hasLayoutChanged: e }) => {
            this.isDragging &&
              e &&
              ((0, a.f)((e) => {
                let i = this.getAxisMotionValue(e);
                i &&
                  ((this.originPoint[e] += t[e].translate),
                  i.set(i.get() + t[e].translate));
              }),
              this.visualElement.render());
          },
        );
      return () => {
        (l(), i(), r(), h && h(), t && t());
      };
    }
    getProps() {
      let t = this.visualElement.getProps(),
        {
          drag: e = !1,
          dragDirectionLock: i = !1,
          dragPropagation: s = !1,
          dragConstraints: n = !1,
          dragElastic: r = 0.35,
          dragMomentum: o = !0,
        } = t;
      return {
        ...t,
        drag: e,
        dragDirectionLock: i,
        dragPropagation: s,
        dragConstraints: n,
        dragElastic: r,
        dragMomentum: o,
      };
    }
  }
  function tn(t) {
    let e = !0;
    return () => {
      if (e) {
        e = !1;
        return;
      }
      t();
    };
  }
  function tr(t, e, i) {
    return (!0 === e || e === t) && (null === i || i === t);
  }
  class to extends s.f {
    constructor(t) {
      (super(t),
        (this.removeGroupControls = n.f),
        (this.removeListeners = n.f),
        (this.controls = new ts(t)));
    }
    mount() {
      let { dragControls: t } = this.node.getProps();
      (t && (this.removeGroupControls = t.subscribe(this.controls)),
        (this.removeListeners = this.controls.addListeners() || n.f));
    }
    update() {
      let { dragControls: t } = this.node.getProps(),
        { dragControls: e } = this.node.prevProps || {};
      t !== e &&
        (this.removeGroupControls(),
        t && (this.removeGroupControls = t.subscribe(this.controls)));
    }
    unmount() {
      (this.removeGroupControls(),
        this.removeListeners(),
        this.controls.isDragging || this.controls.endPanSession());
    }
  }
  t.s(["f", 0, to], 185972);
  var ta = s;
  let tl = (t) => (e, i) => {
    t && o.y.update(() => t(e, i), !1, !0);
  };
  class th extends ta.f {
    constructor() {
      (super(...arguments), (this.removePointerDownListener = n.f));
    }
    onPointerDown(t) {
      this.session = new Y(t, this.createPanHandlers(), {
        transformPagePoint: this.node.getTransformPagePoint(),
        contextWindow: U(this.node),
      });
    }
    createPanHandlers() {
      let {
        onPanSessionStart: t,
        onPanStart: e,
        onPan: i,
        onPanEnd: s,
      } = this.node.getProps();
      return {
        onSessionStart: tl(t),
        onStart: tl(e),
        onMove: tl(i),
        onEnd: (t, e) => {
          (delete this.session, s && o.y.postRender(() => s(t, e)));
        },
      };
    }
    mount() {
      this.removePointerDownListener = F(
        this.node.current,
        "pointerdown",
        (t) => this.onPointerDown(t),
      );
    }
    update() {
      this.session && this.session.updateHandlers(this.createPanHandlers());
    }
    unmount() {
      (this.removePointerDownListener(), this.session && this.session.end());
    }
  }
  t.s(["f", 0, th], 489274);
  var tu = t.i(732486);
  let td = { hasAnimatedSinceResize: !0, hasEverUpdated: !1 };
  t.s(["f", 0, td], 584047);
  var tc = t.i(354012),
    tp = t.i(352386),
    tm = t.i(380585),
    tf = t.i(957680),
    ty = t.i(140267);
  let tv = !1;
  class tg extends tp.Component {
    componentDidMount() {
      let {
          visualElement: t,
          layoutGroup: e,
          switchLayoutGroup: i,
          layoutId: s,
        } = this.props,
        { projection: n } = t;
      (n &&
        (e.group && e.group.add(n),
        i && i.register && s && i.register(n),
        tv && n.root.didUpdate(),
        n.addEventListener("animationComplete", () => {
          this.safeToRemove();
        }),
        n.setOptions({
          ...n.options,
          layoutDependency: this.props.layoutDependency,
          onExitComplete: () => this.safeToRemove(),
        })),
        (td.hasEverUpdated = !0));
    }
    getSnapshotBeforeUpdate(t) {
      let {
          layoutDependency: e,
          visualElement: i,
          drag: s,
          isPresent: n,
        } = this.props,
        { projection: r } = i;
      return (
        r &&
          ((r.isPresent = n),
          t.layoutDependency !== e &&
            r.setOptions({ ...r.options, layoutDependency: e }),
          (tv = !0),
          s || t.layoutDependency !== e || void 0 === e || t.isPresent !== n
            ? r.willUpdate()
            : this.safeToRemove(),
          t.isPresent !== n &&
            (n
              ? r.promote()
              : r.relegate() ||
                o.y.postRender(() => {
                  let t = r.getStack();
                  (t && t.members.length) || this.safeToRemove();
                }))),
        null
      );
    }
    componentDidUpdate() {
      let { visualElement: t, layoutAnchor: e } = this.props,
        { projection: i } = t;
      i &&
        ((i.options.layoutAnchor = e),
        i.root.didUpdate(),
        tc.f.postRender(() => {
          !i.currentAnimation && i.isLead() && this.safeToRemove();
        }));
    }
    componentWillUnmount() {
      let {
          visualElement: t,
          layoutGroup: e,
          switchLayoutGroup: i,
        } = this.props,
        { projection: s } = t;
      ((tv = !0),
        s &&
          (s.scheduleCheckAfterUnmount(),
          e && e.group && e.group.remove(s),
          i && i.deregister && i.deregister(s)));
    }
    safeToRemove() {
      let { safeToRemove: t } = this.props;
      t && t();
    }
    render() {
      return null;
    }
  }
  t.s(
    [
      "f",
      0,
      function (t) {
        let [e, i] = (0, tm.f)(),
          s = (0, tp.useContext)(tf.f);
        return (0, tu.jsx)(tg, {
          ...t,
          layoutGroup: s,
          switchLayoutGroup: (0, tp.useContext)(ty.f),
          isPresent: e,
          safeToRemove: i,
        });
      },
    ],
    545322,
  );
  var tx = t.i(964355),
    tP = t.i(350764);
  t.s(
    [
      "f",
      0,
      function (t, e, i) {
        let s = (0, tP.f)(t) ? t : (0, tx.o)(t);
        return (s.start((0, d.f)("", s, e, i)), s.animation);
      },
    ],
    659367,
  );
};
