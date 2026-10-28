// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(t) => {
  var e = t.i(838976),
    i = t.i(660391),
    s = t.i(233278),
    n = t.i(8864),
    r = t.i(270826),
    o = t.i(198577),
    a = t.i(923301),
    l = t.i(274794),
    h = t.i(490350),
    u = t.i(907953);
  function d(t, e, { delay: i = 0, transitionOverride: c, type: p } = {}) {
    let { transition: m, transitionEnd: f, ...y } = e,
      v = t.getDefaultTransition();
    m = m ? (0, n.f)(m, v) : v;
    let g = m?.reduceMotion,
      x = m?.skipAnimations;
    c && (m = c);
    let P = [],
      T = p && t.animationState && t.animationState.getState()[p],
      w = m?.path;
    for (let e in (w && w.animateVisualElement(t, y, m, i, P), y)) {
      let n = t.getValue(e, t.latestValues[e] ?? null),
        o = y[e];
      if (
        void 0 === o ||
        (T &&
          (function ({ protectedKeys: t, needsAnimating: e }, i) {
            let s = t.hasOwnProperty(i) && !0 !== e[i];
            return ((e[i] = !1), s);
          })(T, e))
      )
        continue;
      let d = { delay: i, ...(0, s.f)(m || {}, e) };
      x && (d.skipAnimations = !0);
      let c = n.get();
      if (
        void 0 !== c &&
        !n.isAnimating() &&
        !Array.isArray(o) &&
        o === c &&
        !d.velocity
      ) {
        u.y.update(() => n.set(o));
        continue;
      }
      let p = !1;
      if (window.MotionHandoffAnimation) {
        let i = (0, l.f)(t);
        if (i) {
          let t = window.MotionHandoffAnimation(i, e, u.y);
          null !== t && ((d.startTime = t), (p = !0));
        }
      }
      (0, a.f)(t, e);
      let f = g ?? t.shouldReduceMotion;
      n.start((0, h.f)(e, n, o, f && r.f.has(e) ? { type: !1 } : d, t, p));
      let v = n.animation;
      v && P.push(v);
    }
    if (f) {
      let e = () =>
        u.y.update(() => {
          f && (0, o.f)(t, f);
        });
      P.length ? Promise.all(P).then(e) : e();
    }
    return P;
  }
  function c(t, e, i, s = 0, n = 1) {
    let r = Array.from(t)
        .sort((t, e) => t.sortNodePosition(e))
        .indexOf(e),
      o = t.size,
      a = (o - 1) * s;
    return "function" == typeof i ? i(r, o) : 1 === n ? r * s : a - r * s;
  }
  function p(t, e, s = {}) {
    let n = (0, i.f)(
        t,
        e,
        "exit" === s.type ? t.presenceContext?.custom : void 0,
      ),
      { transition: r = t.getDefaultTransition() || {} } = n || {};
    s.transitionOverride && (r = s.transitionOverride);
    let o = n ? () => Promise.all(d(t, n, s)) : () => Promise.resolve(),
      a =
        t.variantChildren && t.variantChildren.size
          ? (i = 0) => {
              let {
                delayChildren: n = 0,
                staggerChildren: o,
                staggerDirection: a,
              } = r;
              return (function (t, e, i = 0, s = 0, n = 0, r = 1, o) {
                let a = [];
                for (let l of t.variantChildren)
                  (l.notify("AnimationStart", e),
                    a.push(
                      p(l, e, {
                        ...o,
                        delay:
                          i +
                          ("function" == typeof s ? 0 : s) +
                          c(t.variantChildren, l, s, n, r),
                      }).then(() => l.notify("AnimationComplete", e)),
                    ));
                return Promise.all(a);
              })(t, e, i, n, o, a, s);
            }
          : () => Promise.resolve(),
      { when: l } = r;
    if (!l) return Promise.all([o(), a(s.delay)]);
    {
      let [t, e] = "beforeChildren" === l ? [o, a] : [a, o];
      return t().then(() => e());
    }
  }
  function m(t, e, s = {}) {
    let n;
    if ((t.notify("AnimationStart", e), Array.isArray(e)))
      n = Promise.all(e.map((e) => p(t, e, s)));
    else if ("string" == typeof e) n = p(t, e, s);
    else {
      let r = "function" == typeof e ? (0, i.f)(t, e, s.custom) : e;
      n = Promise.all(d(t, r, s));
    }
    return n.then(() => {
      t.notify("AnimationComplete", e);
    });
  }
  t.s(["f", 0, m], 959452);
  var f = t.i(643646),
    y = t.i(661749);
  let v = y.z.length;
  var g = t.i(508578),
    x = t.i(130350);
  function P(t, e) {
    if (!Array.isArray(e)) return !1;
    let i = e.length;
    if (i !== t.length) return !1;
    for (let s = 0; s < i; s++) if (e[s] !== t[s]) return !1;
    return !0;
  }
  let T = [...y.v].reverse(),
    w = y.v.length;
  function S(t = !1) {
    return {
      isActive: t,
      protectedKeys: {},
      needsAnimating: {},
      prevResolvedValues: {},
    };
  }
  function A() {
    return {
      animate: S(!0),
      whileInView: S(),
      whileHover: S(),
      whileTap: S(),
      whileDrag: S(),
      whileFocus: S(),
      exit: S(),
    };
  }
  class E extends e.f {
    constructor(t) {
      (super(t),
        t.animationState ||
          (t.animationState = (function (t) {
            let e = (e) =>
                Promise.all(
                  e.map(({ animation: e, options: i }) => m(t, e, i)),
                ),
              s = A(),
              n = !0,
              r = !1,
              o = (e) => (s, n) => {
                let r = (0, i.f)(
                  t,
                  n,
                  "exit" === e ? t.presenceContext?.custom : void 0,
                );
                if (r) {
                  let { transition: t, transitionEnd: e, ...i } = r;
                  s = { ...s, ...i, ...e };
                }
                return s;
              };
            function a(a) {
              let { props: l } = t,
                h =
                  (function t(e) {
                    if (!e) return;
                    if (!e.isControllingVariants) {
                      let i = (e.parent && t(e.parent)) || {};
                      return (
                        void 0 !== e.props.initial &&
                          (i.initial = e.props.initial),
                        i
                      );
                    }
                    let i = {};
                    for (let t = 0; t < v; t++) {
                      let s = y.z[t],
                        n = e.props[s];
                      ((0, f.f)(n) || !1 === n) && (i[s] = n);
                    }
                    return i;
                  })(t.parent) || {},
                u = [],
                d = new Set(),
                p = {},
                m = 1 / 0;
              for (let e = 0; e < w; e++) {
                var S, A;
                let y = T[e],
                  v = s[y],
                  w = void 0 !== l[y] ? l[y] : h[y],
                  E = (0, f.f)(w),
                  D = y === a ? v.isActive : null;
                !1 === D && (m = e);
                let b = w === h[y] && w !== l[y] && E;
                if (
                  (b && (n || r) && t.manuallyAnimateOnMount && (b = !1),
                  (v.protectedKeys = { ...p }),
                  (!v.isActive && null === D) ||
                    (!w && !v.prevProp) ||
                    (0, g.f)(w) ||
                    "boolean" == typeof w)
                )
                  continue;
                if ("exit" === y && v.isActive && !0 !== D) {
                  v.prevResolvedValues &&
                    (p = { ...p, ...v.prevResolvedValues });
                  continue;
                }
                let M =
                    ((S = v.prevProp),
                    "string" == typeof (A = w)
                      ? A !== S
                      : !!Array.isArray(A) && !P(A, S)),
                  k = M || (y === a && v.isActive && !b && E) || (e > m && E),
                  V = !1,
                  L = Array.isArray(w) ? w : [w],
                  C = L.reduce(o(y), {});
                !1 === D && (C = {});
                let { prevResolvedValues: R = {} } = v,
                  j = { ...R, ...C },
                  B = (e) => {
                    ((k = !0),
                      d.has(e) && ((V = !0), d.delete(e)),
                      (v.needsAnimating[e] = !0));
                    let i = t.getValue(e);
                    i && (i.liveStyle = !1);
                  };
                for (let t in j) {
                  let e = C[t],
                    i = R[t];
                  if (!p.hasOwnProperty(t))
                    ((0, x.f)(e) && (0, x.f)(i) ? !P(e, i) || M : e !== i)
                      ? null != e
                        ? B(t)
                        : d.add(t)
                      : void 0 !== e && d.has(t)
                        ? B(t)
                        : (v.protectedKeys[t] = !0);
                }
                ((v.prevProp = w),
                  (v.prevResolvedValues = C),
                  v.isActive && (p = { ...p, ...C }),
                  (n || r) && t.blockInitialAnimation && (k = !1));
                let I = b && M,
                  O = !I || V;
                k &&
                  O &&
                  u.push(
                    ...L.map((e) => {
                      let s = { type: y };
                      if (
                        "string" == typeof e &&
                        (n || r) &&
                        !I &&
                        t.manuallyAnimateOnMount &&
                        t.parent
                      ) {
                        let { parent: n } = t,
                          r = (0, i.f)(n, e);
                        if (n.enteringChildren && r) {
                          let { delayChildren: e } = r.transition || {};
                          s.delay = c(n.enteringChildren, t, e);
                        }
                      }
                      return { animation: e, options: s };
                    }),
                  );
              }
              if (d.size) {
                let e = {};
                if ("boolean" != typeof l.initial) {
                  let s = (0, i.f)(
                    t,
                    Array.isArray(l.initial) ? l.initial[0] : l.initial,
                  );
                  s && s.transition && (e.transition = s.transition);
                }
                (d.forEach((i) => {
                  let s = t.getBaseTarget(i),
                    n = t.getValue(i);
                  (n && (n.liveStyle = !0), (e[i] = s ?? null));
                }),
                  u.push({ animation: e }));
              }
              let E = !!u.length;
              return (
                n &&
                  (!1 === l.initial || l.initial === l.animate) &&
                  !t.manuallyAnimateOnMount &&
                  (E = !1),
                (n = !1),
                (r = !1),
                E ? e(u) : Promise.resolve()
              );
            }
            return {
              animateChanges: a,
              setActive: function (e, i) {
                if (s[e].isActive === i) return Promise.resolve();
                (t.variantChildren?.forEach((t) =>
                  t.animationState?.setActive(e, i),
                ),
                  (s[e].isActive = i));
                let n = a(e);
                for (let t in s) s[t].protectedKeys = {};
                return n;
              },
              setAnimateFunction: function (i) {
                e = i(t);
              },
              getState: () => s,
              reset: () => {
                ((s = A()), (r = !0));
              },
            };
          })(t)));
    }
    updateAnimationControlsSubscription() {
      let { animate: t } = this.node.getProps();
      (0, g.f)(t) && (this.unmountControls = t.subscribe(this.node));
    }
    mount() {
      this.updateAnimationControlsSubscription();
    }
    update() {
      let { animate: t } = this.node.getProps(),
        { animate: e } = this.node.prevProps || {};
      t !== e && this.updateAnimationControlsSubscription();
    }
    unmount() {
      (this.node.animationState.reset(), this.unmountControls?.());
    }
  }
  var D = e;
  let b = 0;
  class M extends D.f {
    constructor() {
      (super(...arguments), (this.id = b++), (this.isExitComplete = !1));
    }
    update() {
      if (!this.node.presenceContext) return;
      let { isPresent: t, onExitComplete: e } = this.node.presenceContext,
        { isPresent: s } = this.node.prevPresenceContext || {};
      if (!this.node.animationState || t === s) return;
      if (t && !1 === s) {
        if (this.isExitComplete) {
          let { initial: t, custom: e } = this.node.getProps();
          if (
            "string" == typeof t ||
            ("object" == typeof t && null !== t && !Array.isArray(t))
          ) {
            let s = (0, i.f)(this.node, t, e);
            if (s) {
              let { transition: t, transitionEnd: e, ...i } = s;
              for (let t in i) this.node.getValue(t)?.jump(i[t]);
            }
          }
          (this.node.animationState.reset(),
            this.node.animationState.animateChanges());
        } else this.node.animationState.setActive("exit", !1);
        this.isExitComplete = !1;
        return;
      }
      let n = this.node.animationState.setActive("exit", !t);
      e &&
        !t &&
        n.then(() => {
          ((this.isExitComplete = !0), e(this.id));
        });
    }
    mount() {
      let { register: t, onExitComplete: e } = this.node.presenceContext || {};
      (e && e(this.id), t && (this.unmount = t(this.id)));
    }
    unmount() {}
  }
  t.s(["f", 0, { animation: { Feature: E }, exit: { Feature: M } }], 493771);
};
