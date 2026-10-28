// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(t) => {
  t.i(149502);
  var e = t.i(633836),
    i = t.i(423796),
    s = t.i(874864),
    r = t.i(810246),
    n = t.i(920986),
    a = t.i(891662),
    o = t.i(337259),
    l = t.i(354012),
    h = t.i(720802),
    u = t.i(686968),
    f = t.i(964355),
    d = t.i(49997),
    p = t.i(198141),
    c = t.i(416725),
    m = t.i(350764),
    g = t.i(323482),
    v = t.i(186645),
    y = t.i(59778),
    b = t.i(59880),
    w = t.i(538463),
    V = t.i(155458),
    L = t.i(758307),
    S = t.i(907953);
  let M = [
      "AnimationStart",
      "AnimationComplete",
      "Update",
      "BeforeLayoutMeasure",
      "LayoutMeasure",
      "LayoutAnimationStart",
      "LayoutAnimationComplete",
    ],
    T = {};
  t.s([
    "F",
    0,
    class {
      scrapeMotionValuesFromProps(t, e, i) {
        return {};
      }
      constructor(
        {
          parent: t,
          props: e,
          presenceContext: i,
          reducedMotionConfig: s,
          skipAnimations: r,
          blockInitialAnimation: a,
          visualState: o,
        },
        l = {},
      ) {
        ((this.current = null),
          (this.children = new Set()),
          (this.isVariantNode = !1),
          (this.isControllingVariants = !1),
          (this.shouldReduceMotion = null),
          (this.shouldSkipAnimations = !1),
          (this.values = new Map()),
          (this.KeyframeResolver = n.p),
          (this.features = {}),
          (this.valueSubscriptions = new Map()),
          (this.prevMotionValues = {}),
          (this.hasBeenMounted = !1),
          (this.events = {}),
          (this.propEventSubscriptions = {}),
          (this.notifyUpdate = () => this.notify("Update", this.latestValues)),
          (this.render = () => {
            this.current &&
              (this.triggerBuild(),
              this.renderInstance(
                this.current,
                this.renderState,
                this.props.style,
                this.projection,
              ));
          }),
          (this.renderScheduledAt = 0),
          (this.scheduleRender = () => {
            let t = h.f.now();
            this.renderScheduledAt < t &&
              ((this.renderScheduledAt = t), S.y.render(this.render, !1, !0));
          }));
        let { latestValues: u, renderState: f } = o;
        ((this.latestValues = u),
          (this.baseTarget = { ...u }),
          (this.initialValues = e.initial ? { ...u } : {}),
          (this.renderState = f),
          (this.parent = t),
          (this.props = e),
          (this.presenceContext = i),
          (this.depth = t ? t.depth + 1 : 0),
          (this.reducedMotionConfig = s),
          (this.skipAnimationsConfig = r),
          (this.options = l),
          (this.blockInitialAnimation = !!a),
          (this.isControllingVariants = (0, v.m)(e)),
          (this.isVariantNode = (0, v.I)(e)),
          this.isVariantNode && (this.variantChildren = new Set()),
          (this.manuallyAnimateOnMount = !!(t && t.current)));
        let { willChange: d, ...p } = this.scrapeMotionValuesFromProps(
          e,
          {},
          this,
        );
        for (let t in p) {
          let e = p[t];
          void 0 !== u[t] && (0, m.f)(e) && e.set(u[t]);
        }
      }
      mount(t) {
        if (this.hasBeenMounted)
          for (let t in this.initialValues)
            (this.values.get(t)?.jump(this.initialValues[t]),
              (this.latestValues[t] = this.initialValues[t]));
        ((this.current = t),
          g.f.set(t, this),
          this.projection &&
            !this.projection.instance &&
            this.projection.mount(t),
          this.parent &&
            this.isVariantNode &&
            !this.isControllingVariants &&
            (this.removeFromVariantTree = this.parent.addVariantChild(this)),
          this.values.forEach((t, e) => this.bindToMotionValue(e, t)),
          "never" === this.reducedMotionConfig
            ? (this.shouldReduceMotion = !1)
            : "always" === this.reducedMotionConfig
              ? (this.shouldReduceMotion = !0)
              : (L.E.current || (0, w.f)(),
                (this.shouldReduceMotion = L.d.current)),
          (this.shouldSkipAnimations = this.skipAnimationsConfig ?? !1),
          this.parent?.addChild(this),
          this.update(this.props, this.presenceContext),
          (this.hasBeenMounted = !0));
      }
      unmount() {
        for (let t in (this.projection && this.projection.unmount(),
        (0, S.Y)(this.notifyUpdate),
        (0, S.Y)(this.render),
        this.valueSubscriptions.forEach((t) => t()),
        this.valueSubscriptions.clear(),
        this.removeFromVariantTree && this.removeFromVariantTree(),
        this.parent?.removeChild(this),
        this.events))
          this.events[t].clear();
        for (let t in this.features) {
          let e = this.features[t];
          e && (e.unmount(), (e.isMounted = !1));
        }
        this.current = null;
      }
      addChild(t) {
        (this.children.add(t),
          this.enteringChildren ?? (this.enteringChildren = new Set()),
          this.enteringChildren.add(t));
      }
      removeChild(t) {
        (this.children.delete(t),
          this.enteringChildren && this.enteringChildren.delete(t));
      }
      bindToMotionValue(t, i) {
        let s;
        if (
          (this.valueSubscriptions.has(t) && this.valueSubscriptions.get(t)(),
          i.accelerate && o.f.has(t) && this.current instanceof HTMLElement)
        ) {
          let {
              factory: s,
              keyframes: r,
              times: n,
              ease: o,
              duration: l,
            } = i.accelerate,
            h = new a.f({
              element: this.current,
              name: t,
              keyframes: r,
              times: n,
              ease: o,
              duration: (0, e.Z)(l),
            }),
            u = s(h);
          this.valueSubscriptions.set(t, () => {
            (u(), h.cancel());
          });
          return;
        }
        let r = y.P.has(t);
        r && this.onBindTransform && this.onBindTransform();
        let n = i.on("change", (e) => {
          ((this.latestValues[t] = e),
            this.props.onUpdate && S.y.preRender(this.notifyUpdate),
            r && this.projection && (this.projection.isTransformDirty = !0),
            this.scheduleRender());
        });
        ("u" > typeof window &&
          window.MotionCheckAppearSync &&
          (s = window.MotionCheckAppearSync(this, t, i)),
          this.valueSubscriptions.set(t, () => {
            (n(), s && s());
          }));
      }
      sortNodePosition(t) {
        return this.current &&
          this.sortInstanceNodePosition &&
          this.type === t.type
          ? this.sortInstanceNodePosition(this.current, t.current)
          : 0;
      }
      updateFeatures() {
        let t = "animation";
        for (t in T) {
          let e = T[t];
          if (!e) continue;
          let { isEnabled: i, Feature: s } = e;
          if (
            (!this.features[t] &&
              s &&
              i(this.props) &&
              (this.features[t] = new s(this)),
            this.features[t])
          ) {
            let e = this.features[t];
            e.isMounted ? e.update() : (e.mount(), (e.isMounted = !0));
          }
        }
      }
      triggerBuild() {
        this.build(this.renderState, this.latestValues, this.props);
      }
      measureViewportBox() {
        return this.current
          ? this.measureInstanceViewportBox(this.current, this.props)
          : (0, u.J)();
      }
      getStaticValue(t) {
        return this.latestValues[t];
      }
      setStaticValue(t, e) {
        this.latestValues[t] = e;
      }
      update(t, e) {
        ((t.transformTemplate || this.props.transformTemplate) &&
          this.scheduleRender(),
          (this.prevProps = this.props),
          (this.props = t),
          (this.prevPresenceContext = this.presenceContext),
          (this.presenceContext = e));
        for (let e = 0; e < M.length; e++) {
          let i = M[e];
          this.propEventSubscriptions[i] &&
            (this.propEventSubscriptions[i](),
            delete this.propEventSubscriptions[i]);
          let s = t["on" + i];
          s && (this.propEventSubscriptions[i] = this.on(i, s));
        }
        ((this.prevMotionValues = (0, b.f)(
          this,
          this.scrapeMotionValuesFromProps(t, this.prevProps || {}, this),
          this.prevMotionValues,
        )),
          this.handleChildMotionValue && this.handleChildMotionValue());
      }
      getProps() {
        return this.props;
      }
      getVariant(t) {
        return this.props.variants ? this.props.variants[t] : void 0;
      }
      getDefaultTransition() {
        return this.props.transition;
      }
      getTransformPagePoint() {
        return this.props.transformPagePoint;
      }
      getClosestVariantNode() {
        return this.isVariantNode
          ? this
          : this.parent
            ? this.parent.getClosestVariantNode()
            : void 0;
      }
      addVariantChild(t) {
        let e = this.getClosestVariantNode();
        if (e)
          return (
            e.variantChildren && e.variantChildren.add(t),
            () => e.variantChildren.delete(t)
          );
      }
      addValue(t, e) {
        let i = this.values.get(t);
        e !== i &&
          (i && this.removeValue(t),
          this.bindToMotionValue(t, e),
          this.values.set(t, e),
          (this.latestValues[t] = e.get()));
      }
      removeValue(t) {
        this.values.delete(t);
        let e = this.valueSubscriptions.get(t);
        (e && (e(), this.valueSubscriptions.delete(t)),
          delete this.latestValues[t],
          this.removeValueFromRenderState(t, this.renderState));
      }
      hasValue(t) {
        return this.values.has(t);
      }
      getValue(t, e) {
        if (this.props.values && this.props.values[t])
          return this.props.values[t];
        let i = this.values.get(t);
        return (
          void 0 === i &&
            void 0 !== e &&
            ((i = (0, f.o)(null === e ? void 0 : e, { owner: this })),
            this.addValue(t, i)),
          i
        );
      }
      readValue(t, e) {
        let r =
          void 0 === this.latestValues[t] && this.current
            ? (this.getBaseTargetFromProps(this.props, t) ??
              this.readValueFromInstance(this.current, t, this.options))
            : this.latestValues[t];
        return (
          null != r &&
            ("string" == typeof r && ((0, i.f)(r) || (0, s.f)(r))
              ? (r = parseFloat(r))
              : !(0, c.f)(r) && d.u.test(e) && (r = (0, p.f)(t, e)),
            this.setBaseTarget(t, (0, m.f)(r) ? r.get() : r)),
          (0, m.f)(r) ? r.get() : r
        );
      }
      setBaseTarget(t, e) {
        this.baseTarget[t] = e;
      }
      getBaseTarget(t) {
        let e,
          { initial: i } = this.props;
        if ("string" == typeof i || "object" == typeof i) {
          let s = (0, V.f)(this.props, i, this.presenceContext?.custom);
          s && (e = s[t]);
        }
        if (i && void 0 !== e) return e;
        let s = this.getBaseTargetFromProps(this.props, t);
        return void 0 === s || (0, m.f)(s)
          ? void 0 !== this.initialValues[t] && void 0 === e
            ? void 0
            : this.baseTarget[t]
          : s;
      }
      on(t, e) {
        return (
          this.events[t] || (this.events[t] = new r.f()),
          this.events[t].add(e)
        );
      }
      notify(t, ...e) {
        this.events[t] && this.events[t].notify(...e);
      }
      scheduleRenderMicrotask() {
        l.f.render(this.render);
      }
    },
    "k",
    0,
    function () {
      return T;
    },
    "Y",
    0,
    function (t) {
      T = t;
    },
  ]);
};
