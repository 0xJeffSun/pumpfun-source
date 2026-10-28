// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(t) => {
  var e = t.i(813323),
    i = t.i(302192),
    s = t.i(907953);
  let r = new Set(),
    n = !1,
    a = !1,
    o = !1;
  function l() {
    if (a) {
      let t = Array.from(r).filter((t) => t.needsMeasurement),
        e = new Set(t.map((t) => t.element)),
        s = new Map();
      (e.forEach((t) => {
        let e = (0, i.l)(t);
        e.length && (s.set(t, e), t.render());
      }),
        t.forEach((t) => t.measureInitialState()),
        e.forEach((t) => {
          t.render();
          let e = s.get(t);
          e &&
            e.forEach(([e, i]) => {
              t.getValue(e)?.set(i);
            });
        }),
        t.forEach((t) => t.measureEndState()),
        t.forEach((t) => {
          void 0 !== t.suspendedScrollY &&
            window.scrollTo(0, t.suspendedScrollY);
        }));
    }
    ((a = !1), (n = !1), r.forEach((t) => t.complete(o)), r.clear());
  }
  function h() {
    r.forEach((t) => {
      (t.readKeyframes(), t.needsMeasurement && (a = !0));
    });
  }
  t.s([
    "p",
    0,
    class {
      constructor(t, e, i, s, r, n = !1) {
        ((this.state = "pending"),
          (this.isAsync = !1),
          (this.needsMeasurement = !1),
          (this.unresolvedKeyframes = [...t]),
          (this.onComplete = e),
          (this.name = i),
          (this.motionValue = s),
          (this.element = r),
          (this.isAsync = n));
      }
      scheduleResolve() {
        ((this.state = "scheduled"),
          this.isAsync
            ? (r.add(this),
              n || ((n = !0), s.y.read(h), s.y.resolveKeyframes(l)))
            : (this.readKeyframes(), this.complete()));
      }
      readKeyframes() {
        let {
          unresolvedKeyframes: t,
          name: i,
          element: s,
          motionValue: r,
        } = this;
        if (null === t[0]) {
          let e = r?.get(),
            n = t[t.length - 1];
          if (void 0 !== e) t[0] = e;
          else if (s && i) {
            let e = s.readValue(i, n);
            null != e && (t[0] = e);
          }
          (void 0 === t[0] && (t[0] = n), r && void 0 === e && r.set(t[0]));
        }
        (0, e.f)(t);
      }
      setFinalKeyframe() {}
      measureInitialState() {}
      renderEndStyles() {}
      measureEndState() {}
      complete(t = !1) {
        ((this.state = "complete"),
          this.onComplete(this.unresolvedKeyframes, this.finalKeyframe, t),
          r.delete(this));
      }
      cancel() {
        "scheduled" === this.state &&
          (r.delete(this), (this.state = "pending"));
      }
      resume() {
        "pending" === this.state && this.scheduleResolve();
      }
    },
    "f",
    0,
    function () {
      ((o = !0), h(), l(), (o = !1));
    },
  ]);
};
