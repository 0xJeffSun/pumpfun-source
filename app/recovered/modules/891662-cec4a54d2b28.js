// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(t) => {
  var e = t.i(725542),
    i = t.i(633836),
    s = t.i(120194),
    r = t.i(271929),
    n = t.i(475796),
    a = t.i(412126),
    o = t.i(247553),
    l = t.i(906470),
    h = t.i(187067),
    u = t.i(210514),
    f = t.i(275006),
    d = t.i(50252);
  let p = ([t, e, i, s]) => `cubic-bezier(${t}, ${e}, ${i}, ${s})`,
    c = {
      linear: "linear",
      ease: "ease",
      easeIn: "ease-in",
      easeOut: "ease-out",
      easeInOut: "ease-in-out",
      circIn: p([0, 0.65, 0.55, 1]),
      circOut: p([0.55, 0, 1, 0.45]),
      backIn: p([0.31, 0.01, 0.66, -0.59]),
      backOut: p([0.33, 1.53, 0.69, 0.99]),
    };
  function m(t) {
    return "function" == typeof t && "applyToOptions" in t;
  }
  t.s(["f", 0, m], 430142);
  class g extends o.f {
    constructor(t) {
      if (
        (super(),
        (this.finishedTime = null),
        (this.isStopped = !1),
        (this.manualStartTime = null),
        !t)
      )
        return;
      let {
        element: i,
        name: s,
        keyframes: n,
        pseudoElement: o,
        allowFlatten: g = !1,
        finalKeyframe: v,
        onComplete: y,
      } = t;
      ((this.isPseudoElement = !!o),
        (this.allowFlatten = g),
        (this.options = t),
        (0, e.k)(
          "string" != typeof t.type,
          'Mini animate() doesn\'t support "type" as a string.',
          "mini-spring",
        ));
      let b = (function ({ type: t, ...e }) {
        return m(t) && (0, f.f)()
          ? t.applyToOptions(e)
          : (e.duration ?? (e.duration = 300),
            e.ease ?? (e.ease = "easeOut"),
            e);
      })(t);
      ((this.animation = (function (
        t,
        e,
        i,
        {
          delay: s = 0,
          duration: r = 300,
          repeat: n = 0,
          repeatType: a = "loop",
          ease: o = "easeOut",
          times: m,
        } = {},
        g,
      ) {
        let v = { [e]: i };
        m && (v.offset = m);
        let y = (function t(e, i) {
          if (e)
            return "function" == typeof e
              ? (0, f.f)()
                ? (0, d.f)(e, i)
                : "ease-out"
              : (0, u.f)(e)
                ? p(e)
                : Array.isArray(e)
                  ? e.map((e) => t(e, i) || c.easeOut)
                  : c[e];
        })(o, r);
        (Array.isArray(y) && (v.easing = y), h.f.value && l.f.waapi++);
        let b = {
          delay: s,
          duration: r,
          easing: Array.isArray(y) ? "linear" : y,
          fill: "both",
          iterations: n + 1,
          direction: "reverse" === a ? "alternate" : "normal",
        };
        g && (b.pseudoElement = g);
        let w = t.animate(v, b);
        return (
          h.f.value &&
            w.finished.finally(() => {
              l.f.waapi--;
            }),
          w
        );
      })(i, s, n, b, o)),
        !1 === b.autoplay && this.animation.pause(),
        (this.animation.onfinish = () => {
          if (((this.finishedTime = this.time), !o)) {
            let t = (0, a.f)(n, this.options, v, this.speed);
            (this.updateMotionValue && this.updateMotionValue(t),
              (0, r.f)(i, s, t),
              this.animation.cancel());
          }
          (y?.(), this.notifyFinished());
        }));
    }
    play() {
      this.isStopped ||
        ((this.manualStartTime = null),
        this.animation.play(),
        "finished" === this.state && this.updateFinished());
    }
    pause() {
      this.animation.pause();
    }
    complete() {
      this.animation.finish?.();
    }
    cancel() {
      try {
        this.animation.cancel();
      } catch (t) {}
    }
    stop() {
      if (this.isStopped) return;
      this.isStopped = !0;
      let { state: t } = this;
      "idle" !== t &&
        "finished" !== t &&
        (this.updateMotionValue
          ? this.updateMotionValue()
          : this.commitStyles(),
        this.isPseudoElement || this.cancel());
    }
    commitStyles() {
      let t = this.options?.element;
      !this.isPseudoElement &&
        t?.isConnected &&
        this.animation.commitStyles?.();
    }
    get duration() {
      let t = this.animation.effect?.getComputedTiming?.().duration || 0;
      return (0, i.q)(Number(t));
    }
    get iterationDuration() {
      let { delay: t = 0 } = this.options || {};
      return this.duration + (0, i.q)(t);
    }
    get time() {
      return (0, i.q)(Number(this.animation.currentTime) || 0);
    }
    set time(t) {
      let e = null !== this.finishedTime;
      ((this.manualStartTime = null),
        (this.finishedTime = null),
        (this.animation.currentTime = (0, i.Z)(t)),
        e && this.animation.pause());
    }
    get speed() {
      return this.animation.playbackRate;
    }
    set speed(t) {
      (t < 0 && (this.finishedTime = null), (this.animation.playbackRate = t));
    }
    get state() {
      return null !== this.finishedTime ? "finished" : this.animation.playState;
    }
    get startTime() {
      return this.manualStartTime ?? Number(this.animation.startTime);
    }
    set startTime(t) {
      this.manualStartTime = this.animation.startTime = t;
    }
    attachTimeline({ timeline: t, rangeStart: e, rangeEnd: i, observe: r }) {
      return (this.allowFlatten &&
        this.animation.effect?.updateTiming({ easing: "linear" }),
      (this.animation.onfinish = null),
      t && (0, n.f)())
        ? ((this.animation.timeline = t),
          e && (this.animation.rangeStart = e),
          i && (this.animation.rangeEnd = i),
          s.f)
        : r(this);
    }
  }
  t.s(["f", 0, g], 891662);
  let v = new Set(["opacity", "clipPath", "filter", "transform"]);
  t.s(["f", 0, v], 337259);
};
