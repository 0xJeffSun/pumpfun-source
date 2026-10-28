// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(t) => {
  var e = t.i(185972),
    i = t.i(489274),
    s = t.i(545322),
    n = t.i(810246),
    r = t.i(853624),
    o = t.i(120194),
    a = t.i(659367),
    l = t.i(274794),
    h = t.i(233278),
    u = t.i(354012),
    d = t.i(720802),
    c = t.i(575342),
    p = t.i(906470),
    m = t.i(187067);
  t.i(633836);
  var f = t.i(907953),
    y = t.i(170899),
    v = t.i(341330),
    g = t.i(964355),
    x = t.i(474032),
    P = t.i(813968),
    T = t.i(470934),
    w = t.i(509);
  let S = [
      "borderTopLeftRadius",
      "borderTopRightRadius",
      "borderBottomLeftRadius",
      "borderBottomRightRadius",
    ],
    A = S.length,
    E = (t) => ("string" == typeof t ? parseFloat(t) : t),
    D = (t) => "number" == typeof t || P.L.test(t);
  function b(t, e) {
    return void 0 !== t[e] ? t[e] : t.borderRadius;
  }
  let M = V(0, 0.5, w.o),
    k = V(0.5, 0.95, o.f);
  function V(t, e, i) {
    return (s) => (s < t ? 0 : s > e ? 1 : i((0, T.f)(t, e, s)));
  }
  function L(t, e) {
    ((t.min = e.min), (t.max = e.max));
  }
  function C(t, e) {
    (L(t.x, e.x), L(t.y, e.y));
  }
  function R(t, e) {
    ((t.translate = e.translate),
      (t.scale = e.scale),
      (t.originPoint = e.originPoint),
      (t.origin = e.origin));
  }
  var j = t.i(174302),
    B = t.i(710401);
  function I(t, e, i, s, n) {
    return (
      (t -= e),
      (t = (0, j._)(t, 1 / i, s)),
      void 0 !== n && (t = (0, j._)(t, 1 / n, s)),
      t
    );
  }
  function O(t, e, [i, s, n], r, o) {
    !(function (t, e = 0, i = 1, s = 0.5, n, r = t, o = t) {
      if (
        (P.U.test(e) &&
          ((e = parseFloat(e)), (e = (0, v.f)(o.min, o.max, e / 100) - o.min)),
        "number" != typeof e)
      )
        return;
      let a = (0, v.f)(r.min, r.max, s);
      (t === r && (a -= e),
        (t.min = I(t.min, e, i, a, n)),
        (t.max = I(t.max, e, i, a, n)));
    })(t, e[i], e[s], e[n], e.scale, r, o);
  }
  let F = ["x", "scaleX", "originX"],
    U = ["y", "scaleY", "originY"];
  function $(t, e, i, s) {
    (O(t.x, e, F, i ? i.x : void 0, s ? s.x : void 0),
      O(t.y, e, U, i ? i.y : void 0, s ? s.y : void 0));
  }
  var z = t.i(686968);
  function W(t) {
    return 0 === t.translate && 1 === t.scale;
  }
  function N(t) {
    return W(t.x) && W(t.y);
  }
  function q(t, e) {
    return t.min === e.min && t.max === e.max;
  }
  function Y(t, e) {
    return (
      Math.round(t.min) === Math.round(e.min) &&
      Math.round(t.max) === Math.round(e.max)
    );
  }
  function H(t, e) {
    return Y(t.x, e.x) && Y(t.y, e.y);
  }
  function X(t) {
    return (0, B.M)(t.x) / (0, B.M)(t.y);
  }
  function G(t, e) {
    return (
      t.translate === e.translate &&
      t.scale === e.scale &&
      t.originPoint === e.originPoint
    );
  }
  var K = t.i(926935);
  class J {
    constructor() {
      this.members = [];
    }
    add(t) {
      (0, K.I)(this.members, t);
      for (let e = this.members.length - 1; e >= 0; e--) {
        let i = this.members[e];
        if (i === t || i === this.lead || i === this.prevLead) continue;
        let s = i.instance;
        (s && !1 !== s.isConnected) ||
          i.snapshot ||
          ((0, K.i)(this.members, i), i.unmount());
      }
      t.scheduleRender();
    }
    remove(t) {
      if (
        ((0, K.i)(this.members, t),
        t === this.prevLead && (this.prevLead = void 0),
        t === this.lead)
      ) {
        let t = this.members[this.members.length - 1];
        t && this.promote(t);
      }
    }
    relegate(t) {
      for (let e = this.members.indexOf(t) - 1; e >= 0; e--) {
        let t = this.members[e];
        if (!1 !== t.isPresent && t.instance?.isConnected !== !1)
          return (this.promote(t), !0);
      }
      return !1;
    }
    promote(t, e) {
      let i = this.lead;
      if (t !== i && ((this.prevLead = i), (this.lead = t), t.show(), i)) {
        (i.updateSnapshot(), t.scheduleRender());
        let { layoutDependency: s } = i.options,
          { layoutDependency: n } = t.options;
        ((void 0 === s || s !== n) &&
          ((t.resumeFrom = i),
          e && (i.preserveOpacity = !0),
          i.snapshot &&
            ((t.snapshot = i.snapshot),
            (t.snapshot.latestValues = i.animationValues || i.latestValues)),
          t.root?.isUpdating && (t.isLayoutDirty = !0)),
          !1 === t.options.crossfade && i.hide());
      }
    }
    exitAnimationComplete() {
      this.members.forEach((t) => {
        (t.options.onExitComplete?.(),
          t.resumingFrom?.options.onExitComplete?.());
      });
    }
    scheduleRender() {
      this.members.forEach((t) => t.instance && t.scheduleRender(!1));
    }
    removeLeadSnapshot() {
      this.lead?.snapshot && (this.lead.snapshot = void 0);
    }
  }
  var Z = t.i(587935);
  let _ = (t, e) => t.depth - e.depth;
  class Q {
    constructor() {
      ((this.children = []), (this.isDirty = !1));
    }
    add(t) {
      ((0, K.I)(this.children, t), (this.isDirty = !0));
    }
    remove(t) {
      ((0, K.i)(this.children, t), (this.isDirty = !0));
    }
    forEach(t) {
      (this.isDirty && this.children.sort(_),
        (this.isDirty = !1),
        this.children.forEach(t));
    }
  }
  var tt = t.i(767052),
    te = t.i(584047);
  let ti = { nodes: 0, calculatedTargetDeltas: 0, calculatedProjections: 0 },
    ts = ["", "X", "Y", "Z"],
    tn = 0;
  function tr(t, e, i, s) {
    let { latestValues: n } = e;
    n[t] && ((i[t] = n[t]), e.setStaticValue(t, 0), s && (s[t] = 0));
  }
  function to({
    attachResizeListener: t,
    defaultParent: e,
    measureScroll: i,
    checkIsScrollRoot: s,
    resetTransform: o,
  }) {
    return class {
      constructor(t = {}, i = e?.()) {
        ((this.id = tn++),
          (this.animationId = 0),
          (this.animationCommitId = 0),
          (this.children = new Set()),
          (this.options = {}),
          (this.isTreeAnimating = !1),
          (this.isAnimationBlocked = !1),
          (this.isLayoutDirty = !1),
          (this.isProjectionDirty = !1),
          (this.isSharedProjectionDirty = !1),
          (this.isTransformDirty = !1),
          (this.updateManuallyBlocked = !1),
          (this.updateBlockedByResize = !1),
          (this.isUpdating = !1),
          (this.isSVG = !1),
          (this.needsReset = !1),
          (this.shouldResetTransform = !1),
          (this.hasCheckedOptimisedAppear = !1),
          (this.treeScale = { x: 1, y: 1 }),
          (this.eventHandlers = new Map()),
          (this.hasTreeAnimated = !1),
          (this.layoutVersion = 0),
          (this.updateScheduled = !1),
          (this.scheduleUpdate = () => this.update()),
          (this.projectionUpdateScheduled = !1),
          (this.checkUpdateFailed = () => {
            this.isUpdating &&
              ((this.isUpdating = !1), this.clearAllSnapshots());
          }),
          (this.updateProjection = () => {
            ((this.projectionUpdateScheduled = !1),
              m.f.value &&
                (ti.nodes =
                  ti.calculatedTargetDeltas =
                  ti.calculatedProjections =
                    0),
              this.nodes.forEach(th),
              this.nodes.forEach(tg),
              this.nodes.forEach(tx),
              this.nodes.forEach(tu),
              m.f.addProjectionMetrics && m.f.addProjectionMetrics(ti));
          }),
          (this.resolvedRelativeTargetAt = 0),
          (this.linkedParentVersion = 0),
          (this.hasProjected = !1),
          (this.isVisible = !0),
          (this.animationProgress = 0),
          (this.sharedNodes = new Map()),
          (this.latestValues = t),
          (this.root = i ? i.root || i : this),
          (this.path = i ? [...i.path, i] : []),
          (this.parent = i),
          (this.depth = i ? i.depth + 1 : 0));
        for (let t = 0; t < this.path.length; t++)
          this.path[t].shouldResetTransform = !0;
        this.root === this && (this.nodes = new Q());
      }
      addEventListener(t, e) {
        return (
          this.eventHandlers.has(t) || this.eventHandlers.set(t, new n.f()),
          this.eventHandlers.get(t).add(e)
        );
      }
      notifyListeners(t, ...e) {
        let i = this.eventHandlers.get(t);
        i && i.notify(...e);
      }
      hasListeners(t) {
        return this.eventHandlers.has(t);
      }
      mount(e) {
        if (this.instance) return;
        ((this.isSVG = (0, y.f)(e) && (!(0, y.f)(e) || "svg" !== e.tagName)),
          (this.instance = e));
        let { layoutId: i, layout: s, visualElement: n } = this.options;
        if (
          (n && !n.current && n.mount(e),
          this.root.nodes.add(this),
          this.parent && this.parent.children.add(this),
          this.root.hasTreeAnimated && (s || i) && (this.isLayoutDirty = !0),
          t)
        ) {
          let i,
            s = 0,
            n = () => (this.root.updateBlockedByResize = !1);
          (f.y.read(() => {
            s = window.innerWidth;
          }),
            t(e, () => {
              let t = window.innerWidth;
              if (t !== s) {
                let e, r;
                ((s = t),
                  (this.root.updateBlockedByResize = !0),
                  i && i(),
                  (e = d.f.now()),
                  (r = ({ timestamp: t }) => {
                    let i = t - e;
                    i >= 250 && ((0, f.Y)(r), n());
                  }),
                  f.y.setup(r, !0),
                  (i = () => (0, f.Y)(r)),
                  te.f.hasAnimatedSinceResize &&
                    ((te.f.hasAnimatedSinceResize = !1),
                    this.nodes.forEach(tv)));
              }
            }));
        }
        (i && this.root.registerSharedNode(i, this),
          !1 !== this.options.animate &&
            n &&
            (i || s) &&
            this.addEventListener(
              "didUpdate",
              ({
                delta: t,
                hasLayoutChanged: e,
                hasRelativeLayoutChanged: i,
                layout: s,
              }) => {
                if (this.isTreeAnimationBlocked()) {
                  ((this.target = void 0), (this.relativeTarget = void 0));
                  return;
                }
                let r =
                    this.options.transition || n.getDefaultTransition() || tE,
                  { onLayoutAnimationStart: o, onLayoutAnimationComplete: a } =
                    n.getProps(),
                  l = !this.targetLayout || !H(this.targetLayout, s),
                  u = !e && i;
                if (
                  this.options.layoutRoot ||
                  this.resumeFrom ||
                  u ||
                  (e && (l || !this.currentAnimation))
                ) {
                  this.resumeFrom &&
                    ((this.resumingFrom = this.resumeFrom),
                    (this.resumingFrom.resumingFrom = void 0));
                  let e = {
                    ...(0, h.f)(r, "layout"),
                    onPlay: o,
                    onComplete: a,
                  };
                  ((n.shouldReduceMotion || this.options.layoutRoot) &&
                    ((e.delay = 0), (e.type = !1)),
                    this.startAnimation(e),
                    this.setAnimationOrigin(t, u, e.path));
                } else
                  (e || tv(this),
                    this.isLead() &&
                      this.options.onExitComplete &&
                      this.options.onExitComplete());
                this.targetLayout = s;
              },
            ));
      }
      unmount() {
        (this.options.layoutId && this.willUpdate(),
          this.root.nodes.remove(this));
        let t = this.getStack();
        (t && t.remove(this),
          this.parent && this.parent.children.delete(this),
          (this.instance = void 0),
          this.eventHandlers.clear(),
          (0, f.Y)(this.updateProjection));
      }
      blockUpdate() {
        this.updateManuallyBlocked = !0;
      }
      unblockUpdate() {
        this.updateManuallyBlocked = !1;
      }
      isUpdateBlocked() {
        return this.updateManuallyBlocked || this.updateBlockedByResize;
      }
      isTreeAnimationBlocked() {
        return (
          this.isAnimationBlocked ||
          (this.parent && this.parent.isTreeAnimationBlocked()) ||
          !1
        );
      }
      startUpdate() {
        !this.isUpdateBlocked() &&
          ((this.isUpdating = !0),
          this.nodes && this.nodes.forEach(tP),
          this.animationId++);
      }
      getTransformTemplate() {
        let { visualElement: t } = this.options;
        return t && t.getProps().transformTemplate;
      }
      willUpdate(t = !0) {
        if (((this.root.hasTreeAnimated = !0), this.root.isUpdateBlocked())) {
          this.options.onExitComplete && this.options.onExitComplete();
          return;
        }
        if (
          (window.MotionCancelOptimisedAnimation &&
            !this.hasCheckedOptimisedAppear &&
            (function t(e) {
              if (((e.hasCheckedOptimisedAppear = !0), e.root === e)) return;
              let { visualElement: i } = e.options;
              if (!i) return;
              let s = (0, l.f)(i);
              if (window.MotionHasOptimisedAnimation(s, "transform")) {
                let { layout: t, layoutId: i } = e.options;
                window.MotionCancelOptimisedAnimation(
                  s,
                  "transform",
                  f.y,
                  !(t || i),
                );
              }
              let { parent: n } = e;
              n && !n.hasCheckedOptimisedAppear && t(n);
            })(this),
          this.root.isUpdating || this.root.startUpdate(),
          this.isLayoutDirty)
        )
          return;
        this.isLayoutDirty = !0;
        for (let t = 0; t < this.path.length; t++) {
          let e = this.path[t];
          ((e.shouldResetTransform = !0),
            ("string" == typeof e.latestValues.x ||
              "string" == typeof e.latestValues.y) &&
              (e.isLayoutDirty = !0),
            e.updateScroll("snapshot"),
            e.options.layoutRoot && e.willUpdate(!1));
        }
        let { layoutId: e, layout: i } = this.options;
        if (void 0 === e && !i) return;
        let s = this.getTransformTemplate();
        ((this.prevTransformTemplateValue = s
          ? s(this.latestValues, "")
          : void 0),
          this.updateSnapshot(),
          t && this.notifyListeners("willUpdate"));
      }
      update() {
        if (((this.updateScheduled = !1), this.isUpdateBlocked())) {
          let t = this.updateBlockedByResize;
          (this.unblockUpdate(),
            (this.updateBlockedByResize = !1),
            this.clearAllSnapshots(),
            t && this.nodes.forEach(tp),
            this.nodes.forEach(tc));
          return;
        }
        if (this.animationId <= this.animationCommitId)
          return void this.nodes.forEach(tm);
        ((this.animationCommitId = this.animationId),
          this.isUpdating
            ? ((this.isUpdating = !1),
              this.nodes.forEach(tf),
              this.nodes.forEach(ty),
              this.nodes.forEach(ta),
              this.nodes.forEach(tl))
            : this.nodes.forEach(tm),
          this.clearAllSnapshots());
        let t = d.f.now();
        ((f.I.delta = (0, r.f)(0, 1e3 / 60, t - f.I.timestamp)),
          (f.I.timestamp = t),
          (f.I.isProcessing = !0),
          f.q.update.process(f.I),
          f.q.preRender.process(f.I),
          f.q.render.process(f.I),
          (f.I.isProcessing = !1));
      }
      didUpdate() {
        this.updateScheduled ||
          ((this.updateScheduled = !0), u.f.read(this.scheduleUpdate));
      }
      clearAllSnapshots() {
        (this.nodes.forEach(td), this.sharedNodes.forEach(tT));
      }
      scheduleUpdateProjection() {
        this.projectionUpdateScheduled ||
          ((this.projectionUpdateScheduled = !0),
          f.y.preRender(this.updateProjection, !1, !0));
      }
      scheduleCheckAfterUnmount() {
        f.y.postRender(() => {
          this.isLayoutDirty
            ? this.root.didUpdate()
            : this.root.checkUpdateFailed();
        });
      }
      updateSnapshot() {
        !this.snapshot &&
          this.instance &&
          ((this.snapshot = this.measure()),
          !this.snapshot ||
            (0, B.M)(this.snapshot.measuredBox.x) ||
            (0, B.M)(this.snapshot.measuredBox.y) ||
            (this.snapshot = void 0));
      }
      updateLayout() {
        if (
          !this.instance ||
          (this.updateScroll(),
          !(this.options.alwaysMeasureLayout && this.isLead()) &&
            !this.isLayoutDirty)
        )
          return;
        if (this.resumeFrom && !this.resumeFrom.instance)
          for (let t = 0; t < this.path.length; t++)
            this.path[t].updateScroll();
        let t = this.layout;
        ((this.layout = this.measure(!1)),
          this.layoutVersion++,
          this.layoutCorrected || (this.layoutCorrected = (0, z.J)()),
          (this.isLayoutDirty = !1),
          (this.projectionDelta = void 0),
          this.notifyListeners("measure", this.layout.layoutBox));
        let { visualElement: e } = this.options;
        e &&
          e.notify(
            "LayoutMeasure",
            this.layout.layoutBox,
            t ? t.layoutBox : void 0,
          );
      }
      updateScroll(t = "measure") {
        let e = !!(this.options.layoutScroll && this.instance);
        if (
          (this.scroll &&
            this.scroll.animationId === this.root.animationId &&
            this.scroll.phase === t &&
            (e = !1),
          e && this.instance)
        ) {
          let e = s(this.instance);
          this.scroll = {
            animationId: this.root.animationId,
            phase: t,
            isRoot: e,
            offset: i(this.instance),
            wasRoot: this.scroll ? this.scroll.isRoot : e,
          };
        }
      }
      resetTransform() {
        if (!o) return;
        let t =
            this.isLayoutDirty ||
            this.shouldResetTransform ||
            this.options.alwaysMeasureLayout,
          e = this.projectionDelta && !N(this.projectionDelta),
          i = this.getTransformTemplate(),
          s = i ? i(this.latestValues, "") : void 0,
          n = s !== this.prevTransformTemplateValue;
        t &&
          this.instance &&
          (e || (0, tt.u)(this.latestValues) || n) &&
          (o(this.instance, s),
          (this.shouldResetTransform = !1),
          this.scheduleRender());
      }
      measure(t = !0) {
        var e;
        let i = this.measurePageBox(),
          s = this.removeElementScroll(i);
        return (
          t && (s = this.removeTransform(s)),
          tM((e = s).x),
          tM(e.y),
          {
            animationId: this.root.animationId,
            measuredBox: i,
            layoutBox: s,
            latestValues: {},
            source: this.id,
          }
        );
      }
      measurePageBox() {
        let { visualElement: t } = this.options;
        if (!t) return (0, z.J)();
        let e = t.measureViewportBox();
        if (!(this.scroll?.wasRoot || this.path.some(tV))) {
          let { scroll: t } = this.root;
          t && ((0, j.i)(e.x, t.offset.x), (0, j.i)(e.y, t.offset.y));
        }
        return e;
      }
      removeElementScroll(t) {
        let e = (0, z.J)();
        if ((C(e, t), this.scroll?.wasRoot)) return e;
        for (let i = 0; i < this.path.length; i++) {
          let s = this.path[i],
            { scroll: n, options: r } = s;
          s !== this.root &&
            n &&
            r.layoutScroll &&
            (n.wasRoot && C(e, t),
            (0, j.i)(e.x, n.offset.x),
            (0, j.i)(e.y, n.offset.y));
        }
        return e;
      }
      applyTransform(t, e = !1, i) {
        let s = i || (0, z.J)();
        C(s, t);
        for (let t = 0; t < this.path.length; t++) {
          let i = this.path[t];
          (!e &&
            i.options.layoutScroll &&
            i.scroll &&
            i !== i.root &&
            ((0, j.i)(s.x, -i.scroll.offset.x),
            (0, j.i)(s.y, -i.scroll.offset.y)),
            (0, tt.u)(i.latestValues) &&
              (0, j.k)(s, i.latestValues, i.layout?.layoutBox));
        }
        return (
          (0, tt.u)(this.latestValues) &&
            (0, j.k)(s, this.latestValues, this.layout?.layoutBox),
          s
        );
      }
      removeTransform(t) {
        let e = (0, z.J)();
        C(e, t);
        for (let t = 0; t < this.path.length; t++) {
          let i,
            s = this.path[t];
          (0, tt.u)(s.latestValues) &&
            (s.instance &&
              ((0, tt.N)(s.latestValues) && s.updateSnapshot(),
              C((i = (0, z.J)()), s.measurePageBox())),
            $(e, s.latestValues, s.snapshot?.layoutBox, i));
        }
        return ((0, tt.u)(this.latestValues) && $(e, this.latestValues), e);
      }
      setTargetDelta(t) {
        ((this.targetDelta = t),
          this.root.scheduleUpdateProjection(),
          (this.isProjectionDirty = !0));
      }
      setOptions(t) {
        this.options = {
          ...this.options,
          ...t,
          crossfade: void 0 === t.crossfade || t.crossfade,
        };
      }
      clearMeasurements() {
        ((this.scroll = void 0),
          (this.layout = void 0),
          (this.snapshot = void 0),
          (this.prevTransformTemplateValue = void 0),
          (this.targetDelta = void 0),
          (this.target = void 0),
          (this.isLayoutDirty = !1));
      }
      forceRelativeParentToResolveTarget() {
        this.relativeParent &&
          this.relativeParent.resolvedRelativeTargetAt !== f.I.timestamp &&
          this.relativeParent.resolveTargetDelta(!0);
      }
      resolveTargetDelta(t = !1) {
        let e = this.getLead();
        (this.isProjectionDirty ||
          (this.isProjectionDirty = e.isProjectionDirty),
          this.isTransformDirty || (this.isTransformDirty = e.isTransformDirty),
          this.isSharedProjectionDirty ||
            (this.isSharedProjectionDirty = e.isSharedProjectionDirty));
        let i = !!this.resumingFrom || this !== e;
        if (
          !(
            t ||
            (i && this.isSharedProjectionDirty) ||
            this.isProjectionDirty ||
            this.parent?.isProjectionDirty ||
            this.attemptToResolveRelativeTarget ||
            this.root.updateBlockedByResize
          )
        )
          return;
        let { layout: s, layoutId: n } = this.options;
        if (!this.layout || !(s || n)) return;
        this.resolvedRelativeTargetAt = f.I.timestamp;
        let r = this.getClosestProjectingParent();
        (r &&
          this.linkedParentVersion !== r.layoutVersion &&
          !r.options.layoutRoot &&
          this.removeRelativeTarget(),
          this.targetDelta ||
            this.relativeTarget ||
            (!1 !== this.options.layoutAnchor && r && r.layout
              ? this.createRelativeTarget(
                  r,
                  this.layout.layoutBox,
                  r.layout.layoutBox,
                )
              : this.removeRelativeTarget()),
          (this.relativeTarget || this.targetDelta) &&
            (this.target ||
              ((this.target = (0, z.J)()),
              (this.targetWithTransforms = (0, z.J)())),
            this.relativeTarget &&
            this.relativeTargetOrigin &&
            this.relativeParent &&
            this.relativeParent.target
              ? (this.forceRelativeParentToResolveTarget(),
                (0, B.Z)(
                  this.target,
                  this.relativeTarget,
                  this.relativeParent.target,
                  this.options.layoutAnchor || void 0,
                ))
              : this.targetDelta
                ? (this.resumingFrom
                    ? this.applyTransform(
                        this.layout.layoutBox,
                        !1,
                        this.target,
                      )
                    : C(this.target, this.layout.layoutBox),
                  (0, j.z)(this.target, this.targetDelta))
                : C(this.target, this.layout.layoutBox),
            this.attemptToResolveRelativeTarget &&
              ((this.attemptToResolveRelativeTarget = !1),
              !1 !== this.options.layoutAnchor &&
              r &&
              !!r.resumingFrom == !!this.resumingFrom &&
              !r.options.layoutScroll &&
              r.target &&
              1 !== this.animationProgress
                ? this.createRelativeTarget(r, this.target, r.target)
                : (this.relativeParent = this.relativeTarget = void 0)),
            m.f.value && ti.calculatedTargetDeltas++));
      }
      getClosestProjectingParent() {
        if (
          !(
            !this.parent ||
            (0, tt.N)(this.parent.latestValues) ||
            (0, tt.k)(this.parent.latestValues)
          )
        )
          if (this.parent.isProjecting()) return this.parent;
          else return this.parent.getClosestProjectingParent();
      }
      isProjecting() {
        return !!(
          (this.relativeTarget ||
            this.targetDelta ||
            this.options.layoutRoot) &&
          this.layout
        );
      }
      createRelativeTarget(t, e, i) {
        ((this.relativeParent = t),
          (this.linkedParentVersion = t.layoutVersion),
          this.forceRelativeParentToResolveTarget(),
          (this.relativeTarget = (0, z.J)()),
          (this.relativeTargetOrigin = (0, z.J)()),
          (0, B.q)(
            this.relativeTargetOrigin,
            e,
            i,
            this.options.layoutAnchor || void 0,
          ),
          C(this.relativeTarget, this.relativeTargetOrigin));
      }
      removeRelativeTarget() {
        this.relativeParent = this.relativeTarget = void 0;
      }
      calcProjection() {
        let t = this.getLead(),
          e = !!this.resumingFrom || this !== t,
          i = !0;
        if (
          ((this.isProjectionDirty || this.parent?.isProjectionDirty) &&
            (i = !1),
          e &&
            (this.isSharedProjectionDirty || this.isTransformDirty) &&
            (i = !1),
          this.resolvedRelativeTargetAt === f.I.timestamp && (i = !1),
          i)
        )
          return;
        let { layout: s, layoutId: n } = this.options;
        if (
          ((this.isTreeAnimating = !!(
            (this.parent && this.parent.isTreeAnimating) ||
            this.currentAnimation ||
            this.pendingAnimation
          )),
          this.isTreeAnimating ||
            (this.targetDelta = this.relativeTarget = void 0),
          !this.layout || !(s || n))
        )
          return;
        C(this.layoutCorrected, this.layout.layoutBox);
        let r = this.treeScale.x,
          o = this.treeScale.y;
        ((0, j.w)(this.layoutCorrected, this.treeScale, this.path, e),
          t.layout &&
            !t.target &&
            (1 !== this.treeScale.x || 1 !== this.treeScale.y) &&
            ((t.target = t.layout.layoutBox),
            (t.targetWithTransforms = (0, z.J)())));
        let { target: a } = t;
        if (!a) {
          this.prevProjectionDelta &&
            (this.createProjectionDeltas(), this.scheduleRender());
          return;
        }
        (this.projectionDelta && this.prevProjectionDelta
          ? (R(this.prevProjectionDelta.x, this.projectionDelta.x),
            R(this.prevProjectionDelta.y, this.projectionDelta.y))
          : this.createProjectionDeltas(),
          (0, B.P)(
            this.projectionDelta,
            this.layoutCorrected,
            a,
            this.latestValues,
          ),
          (this.treeScale.x === r &&
            this.treeScale.y === o &&
            G(this.projectionDelta.x, this.prevProjectionDelta.x) &&
            G(this.projectionDelta.y, this.prevProjectionDelta.y)) ||
            ((this.hasProjected = !0),
            this.scheduleRender(),
            this.notifyListeners("projectionUpdate", a)),
          m.f.value && ti.calculatedProjections++);
      }
      hide() {
        this.isVisible = !1;
      }
      show() {
        this.isVisible = !0;
      }
      scheduleRender(t = !0) {
        if ((this.options.visualElement?.scheduleRender(), t)) {
          let t = this.getStack();
          t && t.scheduleRender();
        }
        this.resumingFrom &&
          !this.resumingFrom.instance &&
          (this.resumingFrom = void 0);
      }
      createProjectionDeltas() {
        ((this.prevProjectionDelta = (0, z.$)()),
          (this.projectionDelta = (0, z.$)()),
          (this.projectionDeltaWithTransform = (0, z.$)()));
      }
      setAnimationOrigin(t, e = !1, i) {
        let s,
          n = this.snapshot,
          r = n ? n.latestValues : {},
          o = { ...this.latestValues },
          a = (0, z.$)();
        ((this.relativeParent && this.relativeParent.options.layoutRoot) ||
          (this.relativeTarget = this.relativeTargetOrigin = void 0),
          (this.attemptToResolveRelativeTarget = !e));
        let l = (0, z.J)(),
          h =
            (n ? n.source : void 0) !==
            (this.layout ? this.layout.source : void 0),
          u = this.getStack(),
          d = !u || u.members.length <= 1,
          c = !!(
            h &&
            !d &&
            !0 === this.options.crossfade &&
            !this.path.some(tA)
          );
        this.animationProgress = 0;
        let p = i?.interpolateProjection(t);
        ((this.mixTargetDelta = (e) => {
          let i = e / 1e3,
            n = p?.(i);
          if (
            (n
              ? ((a.x.translate = n.x),
                (a.x.scale = (0, v.f)(t.x.scale, 1, i)),
                (a.x.origin = t.x.origin),
                (a.x.originPoint = t.x.originPoint),
                (a.y.translate = n.y),
                (a.y.scale = (0, v.f)(t.y.scale, 1, i)),
                (a.y.origin = t.y.origin),
                (a.y.originPoint = t.y.originPoint))
              : (tw(a.x, t.x, i), tw(a.y, t.y, i)),
            this.setTargetDelta(a),
            this.relativeTarget &&
              this.relativeTargetOrigin &&
              this.layout &&
              this.relativeParent &&
              this.relativeParent.layout)
          ) {
            var u, m, f, y, g, x;
            ((0, B.q)(
              l,
              this.layout.layoutBox,
              this.relativeParent.layout.layoutBox,
              this.options.layoutAnchor || void 0,
            ),
              (f = this.relativeTarget),
              (y = this.relativeTargetOrigin),
              (g = l),
              (x = i),
              tS(f.x, y.x, g.x, x),
              tS(f.y, y.y, g.y, x),
              s &&
                ((u = this.relativeTarget),
                (m = s),
                q(u.x, m.x) && q(u.y, m.y)) &&
                (this.isProjectionDirty = !1),
              s || (s = (0, z.J)()),
              C(s, this.relativeTarget));
          }
          (h &&
            ((this.animationValues = o),
            (function (t, e, i, s, n, r) {
              n
                ? ((t.opacity = (0, v.f)(0, i.opacity ?? 1, M(s))),
                  (t.opacityExit = (0, v.f)(e.opacity ?? 1, 0, k(s))))
                : r &&
                  (t.opacity = (0, v.f)(e.opacity ?? 1, i.opacity ?? 1, s));
              for (let n = 0; n < A; n++) {
                let r = S[n],
                  o = b(e, r),
                  a = b(i, r);
                (void 0 !== o || void 0 !== a) &&
                  (o || (o = 0),
                  a || (a = 0),
                  0 === o || 0 === a || D(o) === D(a)
                    ? ((t[r] = Math.max((0, v.f)(E(o), E(a), s), 0)),
                      (P.U.test(a) || P.U.test(o)) && (t[r] += "%"))
                    : (t[r] = a));
              }
              (e.rotate || i.rotate) &&
                (t.rotate = (0, v.f)(e.rotate || 0, i.rotate || 0, s));
            })(o, r, this.latestValues, i, c, d)),
            n &&
              void 0 !== n.rotate &&
              (this.animationValues || (this.animationValues = o),
              (this.animationValues.pathRotation = n.rotate)),
            this.root.scheduleUpdateProjection(),
            this.scheduleRender(),
            (this.animationProgress = i));
        }),
          this.mixTargetDelta(1e3 * !!this.options.layoutRoot));
      }
      startAnimation(t) {
        (this.notifyListeners("animationStart"),
          this.currentAnimation?.stop(),
          this.resumingFrom?.currentAnimation?.stop(),
          this.pendingAnimation &&
            ((0, f.Y)(this.pendingAnimation), (this.pendingAnimation = void 0)),
          (this.pendingAnimation = f.y.update(() => {
            ((te.f.hasAnimatedSinceResize = !0),
              p.f.layout++,
              this.motionValue || (this.motionValue = (0, g.o)(0)),
              this.motionValue.jump(0, !1),
              (this.currentAnimation = (0, a.f)(this.motionValue, [0, 1e3], {
                ...t,
                velocity: 0,
                isSync: !0,
                onUpdate: (e) => {
                  (this.mixTargetDelta(e), t.onUpdate && t.onUpdate(e));
                },
                onStop: () => {
                  p.f.layout--;
                },
                onComplete: () => {
                  (p.f.layout--,
                    t.onComplete && t.onComplete(),
                    this.completeAnimation());
                },
              })),
              this.resumingFrom &&
                (this.resumingFrom.currentAnimation = this.currentAnimation),
              (this.pendingAnimation = void 0));
          })));
      }
      completeAnimation() {
        this.resumingFrom &&
          ((this.resumingFrom.currentAnimation = void 0),
          (this.resumingFrom.preserveOpacity = void 0));
        let t = this.getStack();
        (t && t.exitAnimationComplete(),
          (this.resumingFrom =
            this.currentAnimation =
            this.animationValues =
              void 0),
          this.notifyListeners("animationComplete"));
      }
      finishAnimation() {
        (this.currentAnimation &&
          (this.mixTargetDelta && this.mixTargetDelta(1e3),
          this.currentAnimation.stop()),
          this.completeAnimation());
      }
      applyTransformsToTarget() {
        let t = this.getLead(),
          {
            targetWithTransforms: e,
            target: i,
            layout: s,
            latestValues: n,
          } = t;
        if (e && i && s) {
          if (
            this !== t &&
            this.layout &&
            s &&
            tk(this.options.animationType, this.layout.layoutBox, s.layoutBox)
          ) {
            i = this.target || (0, z.J)();
            let e = (0, B.M)(this.layout.layoutBox.x);
            ((i.x.min = t.target.x.min), (i.x.max = i.x.min + e));
            let s = (0, B.M)(this.layout.layoutBox.y);
            ((i.y.min = t.target.y.min), (i.y.max = i.y.min + s));
          }
          (C(e, i),
            (0, j.k)(e, n),
            (0, B.P)(
              this.projectionDeltaWithTransform,
              this.layoutCorrected,
              e,
              n,
            ));
        }
      }
      registerSharedNode(t, e) {
        (this.sharedNodes.has(t) || this.sharedNodes.set(t, new J()),
          this.sharedNodes.get(t).add(e));
        let i = e.options.initialPromotionConfig;
        e.promote({
          transition: i ? i.transition : void 0,
          preserveFollowOpacity:
            i && i.shouldPreserveFollowOpacity
              ? i.shouldPreserveFollowOpacity(e)
              : void 0,
        });
      }
      isLead() {
        let t = this.getStack();
        return !t || t.lead === this;
      }
      getLead() {
        let { layoutId: t } = this.options;
        return (t && this.getStack()?.lead) || this;
      }
      getPrevLead() {
        let { layoutId: t } = this.options;
        return t ? this.getStack()?.prevLead : void 0;
      }
      getStack() {
        let { layoutId: t } = this.options;
        if (t) return this.root.sharedNodes.get(t);
      }
      promote({ needsReset: t, transition: e, preserveFollowOpacity: i } = {}) {
        let s = this.getStack();
        (s && s.promote(this, i),
          t && ((this.projectionDelta = void 0), (this.needsReset = !0)),
          e && this.setOptions({ transition: e }));
      }
      relegate() {
        let t = this.getStack();
        return !!t && t.relegate(this);
      }
      resetSkewAndRotation() {
        let { visualElement: t } = this.options;
        if (!t) return;
        let e = !1,
          { latestValues: i } = t;
        if (
          ((i.z ||
            i.rotate ||
            i.rotateX ||
            i.rotateY ||
            i.rotateZ ||
            i.skewX ||
            i.skewY) &&
            (e = !0),
          !e)
        )
          return;
        let s = {};
        i.z && tr("z", t, s, this.animationValues);
        for (let e = 0; e < ts.length; e++)
          (tr(`rotate${ts[e]}`, t, s, this.animationValues),
            tr(`skew${ts[e]}`, t, s, this.animationValues));
        for (let e in (t.render(), s))
          (t.setStaticValue(e, s[e]),
            this.animationValues && (this.animationValues[e] = s[e]));
        t.scheduleRender();
      }
      applyProjectionStyles(t, e) {
        if (!this.instance || this.isSVG) return;
        if (!this.isVisible) {
          t.visibility = "hidden";
          return;
        }
        let i = this.getTransformTemplate();
        if (this.needsReset) {
          ((this.needsReset = !1),
            (t.visibility = ""),
            (t.opacity = ""),
            (t.pointerEvents = (0, x.f)(e?.pointerEvents) || ""),
            (t.transform = i ? i(this.latestValues, "") : "none"));
          return;
        }
        let s = this.getLead();
        if (!this.projectionDelta || !this.layout || !s.target) {
          (this.options.layoutId &&
            ((t.opacity =
              void 0 !== this.latestValues.opacity
                ? this.latestValues.opacity
                : 1),
            (t.pointerEvents = (0, x.f)(e?.pointerEvents) || "")),
            this.hasProjected &&
              !(0, tt.u)(this.latestValues) &&
              ((t.transform = i ? i({}, "") : "none"),
              (this.hasProjected = !1)));
          return;
        }
        t.visibility = "";
        let n = s.animationValues || s.latestValues;
        this.applyTransformsToTarget();
        let r = (function (t, e, i) {
          let s = "",
            n = t.x.translate / e.x,
            r = t.y.translate / e.y,
            o = i?.z || 0;
          if (
            ((n || r || o) && (s = `translate3d(${n}px, ${r}px, ${o}px) `),
            (1 !== e.x || 1 !== e.y) && (s += `scale(${1 / e.x}, ${1 / e.y}) `),
            i)
          ) {
            let {
              transformPerspective: t,
              rotate: e,
              pathRotation: n,
              rotateX: r,
              rotateY: o,
              skewX: a,
              skewY: l,
            } = i;
            (t && (s = `perspective(${t}px) ${s}`),
              e && (s += `rotate(${e}deg) `),
              n && (s += `rotate(${n}deg) `),
              r && (s += `rotateX(${r}deg) `),
              o && (s += `rotateY(${o}deg) `),
              a && (s += `skewX(${a}deg) `),
              l && (s += `skewY(${l}deg) `));
          }
          let a = t.x.scale * e.x,
            l = t.y.scale * e.y;
          return (
            (1 !== a || 1 !== l) && (s += `scale(${a}, ${l})`),
            s || "none"
          );
        })(this.projectionDeltaWithTransform, this.treeScale, n);
        (i && (r = i(n, r)), (t.transform = r));
        let { x: o, y: a } = this.projectionDelta;
        for (let e in ((t.transformOrigin = `${100 * o.origin}% ${100 * a.origin}% 0`),
        s.animationValues
          ? (t.opacity =
              s === this
                ? (n.opacity ?? this.latestValues.opacity ?? 1)
                : this.preserveOpacity
                  ? this.latestValues.opacity
                  : n.opacityExit)
          : (t.opacity =
              s === this
                ? void 0 !== n.opacity
                  ? n.opacity
                  : ""
                : void 0 !== n.opacityExit
                  ? n.opacityExit
                  : 0),
        c.f)) {
          if (void 0 === n[e]) continue;
          let { correct: i, applyTo: o, isCSSVariable: a } = c.f[e],
            l = "none" === r ? n[e] : i(n[e], s);
          if (o) {
            let e = o.length;
            for (let i = 0; i < e; i++) t[o[i]] = l;
          } else
            a
              ? (this.options.visualElement.renderState.vars[e] = l)
              : (t[e] = l);
        }
        this.options.layoutId &&
          (t.pointerEvents =
            s === this ? (0, x.f)(e?.pointerEvents) || "" : "none");
      }
      clearSnapshot() {
        this.resumeFrom = this.snapshot = void 0;
      }
      resetTree() {
        (this.root.nodes.forEach((t) => t.currentAnimation?.stop()),
          this.root.nodes.forEach(tc),
          this.root.sharedNodes.clear());
      }
    };
  }
  function ta(t) {
    t.updateLayout();
  }
  function tl(t) {
    let e = t.resumeFrom?.snapshot || t.snapshot;
    if (t.isLead() && t.layout && e && t.hasListeners("didUpdate")) {
      let { layoutBox: i, measuredBox: s } = t.layout,
        { animationType: n } = t.options,
        r = e.source !== t.layout.source;
      if ("size" === n)
        (0, Z.f)((t) => {
          let s = r ? e.measuredBox[t] : e.layoutBox[t],
            n = (0, B.M)(s);
          ((s.min = i[t].min), (s.max = s.min + n));
        });
      else if ("x" === n || "y" === n) {
        let t = "x" === n ? "y" : "x";
        L(r ? e.measuredBox[t] : e.layoutBox[t], i[t]);
      } else
        tk(n, e.layoutBox, i) &&
          (0, Z.f)((s) => {
            let n = r ? e.measuredBox[s] : e.layoutBox[s],
              o = (0, B.M)(i[s]);
            ((n.max = n.min + o),
              t.relativeTarget &&
                !t.currentAnimation &&
                ((t.isProjectionDirty = !0),
                (t.relativeTarget[s].max = t.relativeTarget[s].min + o)));
          });
      let o = (0, z.$)();
      (0, B.P)(o, i, e.layoutBox);
      let a = (0, z.$)();
      r
        ? (0, B.P)(a, t.applyTransform(s, !0), e.measuredBox)
        : (0, B.P)(a, i, e.layoutBox);
      let l = !N(o),
        h = !1;
      if (!t.resumeFrom) {
        let s = t.getClosestProjectingParent();
        if (s && !s.resumeFrom) {
          let { snapshot: n, layout: r } = s;
          if (n && r) {
            let o = t.options.layoutAnchor || void 0,
              a = (0, z.J)();
            (0, B.q)(a, e.layoutBox, n.layoutBox, o);
            let l = (0, z.J)();
            ((0, B.q)(l, i, r.layoutBox, o),
              H(a, l) || (h = !0),
              s.options.layoutRoot &&
                ((t.relativeTarget = l),
                (t.relativeTargetOrigin = a),
                (t.relativeParent = s)));
          }
        }
      }
      t.notifyListeners("didUpdate", {
        layout: i,
        snapshot: e,
        delta: a,
        layoutDelta: o,
        hasLayoutChanged: l,
        hasRelativeLayoutChanged: h,
      });
    } else if (t.isLead()) {
      let { onExitComplete: e } = t.options;
      e && e();
    }
    t.options.transition = void 0;
  }
  function th(t) {
    (m.f.value && ti.nodes++,
      t.parent &&
        (t.isProjecting() || (t.isProjectionDirty = t.parent.isProjectionDirty),
        t.isSharedProjectionDirty ||
          (t.isSharedProjectionDirty = !!(
            t.isProjectionDirty ||
            t.parent.isProjectionDirty ||
            t.parent.isSharedProjectionDirty
          )),
        t.isTransformDirty ||
          (t.isTransformDirty = t.parent.isTransformDirty)));
  }
  function tu(t) {
    t.isProjectionDirty = t.isSharedProjectionDirty = t.isTransformDirty = !1;
  }
  function td(t) {
    t.clearSnapshot();
  }
  function tc(t) {
    t.clearMeasurements();
  }
  function tp(t) {
    ((t.isLayoutDirty = !0), t.updateLayout());
  }
  function tm(t) {
    t.isLayoutDirty = !1;
  }
  function tf(t) {
    t.isAnimationBlocked &&
      t.layout &&
      !t.isLayoutDirty &&
      ((t.snapshot = t.layout), (t.isLayoutDirty = !0));
  }
  function ty(t) {
    let { visualElement: e } = t.options;
    (e && e.getProps().onBeforeLayoutMeasure && e.notify("BeforeLayoutMeasure"),
      t.resetTransform());
  }
  function tv(t) {
    (t.finishAnimation(),
      (t.targetDelta = t.relativeTarget = t.target = void 0),
      (t.isProjectionDirty = !0));
  }
  function tg(t) {
    t.resolveTargetDelta();
  }
  function tx(t) {
    t.calcProjection();
  }
  function tP(t) {
    t.resetSkewAndRotation();
  }
  function tT(t) {
    t.removeLeadSnapshot();
  }
  function tw(t, e, i) {
    ((t.translate = (0, v.f)(e.translate, 0, i)),
      (t.scale = (0, v.f)(e.scale, 1, i)),
      (t.origin = e.origin),
      (t.originPoint = e.originPoint));
  }
  function tS(t, e, i, s) {
    ((t.min = (0, v.f)(e.min, i.min, s)), (t.max = (0, v.f)(e.max, i.max, s)));
  }
  function tA(t) {
    return t.animationValues && void 0 !== t.animationValues.opacityExit;
  }
  let tE = { duration: 0.45, ease: [0.4, 0, 0.1, 1] },
    tD = (t) =>
      "u" > typeof navigator &&
      navigator.userAgent &&
      navigator.userAgent.toLowerCase().includes(t),
    tb = tD("applewebkit/") && !tD("chrome/") ? Math.round : o.f;
  function tM(t) {
    ((t.min = tb(t.min)), (t.max = tb(t.max)));
  }
  function tk(t, e, i) {
    return (
      "position" === t ||
      ("preserve-aspect" === t && !(0, B.$)(X(e), X(i), 0.2))
    );
  }
  function tV(t) {
    return t !== t.root && t.scroll?.wasRoot;
  }
  var tL = t.i(508821);
  let tC = to({
      attachResizeListener: (t, e) => (0, tL.f)(t, "resize", e),
      measureScroll: () => ({
        x:
          document.documentElement.scrollLeft || document.body?.scrollLeft || 0,
        y: document.documentElement.scrollTop || document.body?.scrollTop || 0,
      }),
      checkIsScrollRoot: () => !0,
    }),
    tR = { current: void 0 },
    tj = to({
      measureScroll: (t) => ({ x: t.scrollLeft, y: t.scrollTop }),
      defaultParent: () => {
        if (!tR.current) {
          let t = new tC({});
          (t.mount(window),
            t.setOptions({ layoutScroll: !0 }),
            (tR.current = t));
        }
        return tR.current;
      },
      resetTransform: (t, e) => {
        t.style.transform = void 0 !== e ? e : "none";
      },
      checkIsScrollRoot: (t) => "fixed" === window.getComputedStyle(t).position,
    });
  t.s(["f", 0, tj], 515990);
  let tB = {
    pan: { Feature: i.f },
    drag: { Feature: e.f, ProjectionNode: tj, MeasureLayout: s.f },
  };
  t.s(["f", 0, tB], 385436);
};
