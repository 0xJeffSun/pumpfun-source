// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(t) => {
  var e = t.i(59778),
    i = t.i(711320),
    s = t.i(686968),
    n = t.i(350764),
    r = t.i(270826),
    o = t.i(326063),
    a = t.i(725542),
    l = t.i(423796),
    h = t.i(995905);
  let u = /^var\(--(?:([\w-]+)|([\w-]+), ?([a-zA-Z\d ()%#.,-]+))\)/u;
  var d = t.i(920986),
    c = t.i(874864),
    p = t.i(49997),
    m = t.i(198141);
  let f = new Set(["auto", "none", "0"]);
  var y = t.i(302192);
  class v extends d.p {
    constructor(t, e, i, s, n) {
      super(t, e, i, s, n, !0);
    }
    readKeyframes() {
      let { unresolvedKeyframes: t, element: e, name: i } = this;
      if (!e || !e.current) return;
      super.readKeyframes();
      for (let i = 0; i < t.length; i++) {
        let s = t[i];
        if ("string" == typeof s && ((s = s.trim()), (0, h.u)(s))) {
          let n = (function t(e, i, s = 1) {
            (0, a.k)(
              s <= 4,
              `Max CSS variable fallback depth detected in property "${e}". This may indicate a circular fallback dependency.`,
              "max-css-var-depth",
            );
            let [n, r] = (function (t) {
              let e = u.exec(t);
              if (!e) return [,];
              let [, i, s, n] = e;
              return [`--${i ?? s}`, n];
            })(e);
            if (!n) return;
            let o = window.getComputedStyle(i).getPropertyValue(n);
            if (o) {
              let t = o.trim();
              return (0, l.f)(t) ? parseFloat(t) : t;
            }
            return (0, h.u)(r) ? t(r, i, s + 1) : r;
          })(s, e.current);
          (void 0 !== n && (t[i] = n),
            i === t.length - 1 && (this.finalKeyframe = s));
        }
      }
      if ((this.resolveNoneKeyframes(), !r.f.has(i) || 2 !== t.length)) return;
      let [s, n] = t,
        d = (0, o.t)(s),
        c = (0, o.t)(n);
      if ((0, h.t)(s) !== (0, h.t)(n) && y.k[i]) {
        this.needsMeasurement = !0;
        return;
      }
      if (d !== c)
        if ((0, y.D)(d) && (0, y.D)(c))
          for (let e = 0; e < t.length; e++) {
            let i = t[e];
            "string" == typeof i && (t[e] = parseFloat(i));
          }
        else y.k[i] && (this.needsMeasurement = !0);
    }
    resolveNoneKeyframes() {
      let { unresolvedKeyframes: t, name: e } = this,
        i = [];
      for (let e = 0; e < t.length; e++) {
        var s;
        (null === t[e] ||
          ("number" == typeof (s = t[e])
            ? 0 === s
            : null === s || "none" === s || "0" === s || (0, c.f)(s))) &&
          i.push(e);
      }
      i.length &&
        (function (t, e, i) {
          let s,
            n = 0;
          for (; n < t.length && !s; ) {
            let e = t[n];
            ("string" == typeof e &&
              !f.has(e) &&
              (0, p.L)(e).values.length &&
              (s = t[n]),
              n++);
          }
          if (s && i) for (let n of e) t[n] = (0, m.f)(i, s);
        })(t, i, e);
    }
    measureInitialState() {
      let { element: t, unresolvedKeyframes: e, name: i } = this;
      if (!t || !t.current) return;
      ("height" === i && (this.suspendedScrollY = window.pageYOffset),
        (this.measuredOrigin = y.k[i](
          t.measureViewportBox(),
          window.getComputedStyle(t.current),
        )),
        (e[0] = this.measuredOrigin));
      let s = e[e.length - 1];
      void 0 !== s && t.getValue(i, s).jump(s, !1);
    }
    measureEndState() {
      let { element: t, name: e, unresolvedKeyframes: i } = this;
      if (!t || !t.current) return;
      let s = t.getValue(e);
      s && s.jump(this.measuredOrigin, !1);
      let n = i.length - 1,
        r = i[n];
      ((i[n] = y.k[e](
        t.measureViewportBox(),
        window.getComputedStyle(t.current),
      )),
        null !== r && void 0 === this.finalKeyframe && (this.finalKeyframe = r),
        this.removedTransforms?.length &&
          this.removedTransforms.forEach(([e, i]) => {
            t.getValue(e).set(i);
          }),
        this.resolveNoneKeyframes());
    }
  }
  var g = t.i(481103);
  class x extends g.F {
    constructor() {
      (super(...arguments), (this.KeyframeResolver = v));
    }
    sortInstanceNodePosition(t, e) {
      return 2 & t.compareDocumentPosition(e) ? 1 : -1;
    }
    getBaseTargetFromProps(t, e) {
      let i = t.style;
      return i ? i[e] : void 0;
    }
    removeValueFromRenderState(t, { vars: e, style: i }) {
      (delete e[t], delete i[t]);
    }
    handleChildMotionValue() {
      this.childSubscription &&
        (this.childSubscription(), delete this.childSubscription);
      let { children: t } = this.props;
      (0, n.f)(t) &&
        (this.childSubscription = t.on("change", (t) => {
          this.current && (this.current.textContent = `${t}`);
        }));
    }
  }
  t.s(["f", 0, x], 83581);
  var P = t.i(544473),
    T = t.i(533186);
  let w = new Set([
    "baseFrequency",
    "diffuseConstant",
    "kernelMatrix",
    "kernelUnitLength",
    "keySplines",
    "keyTimes",
    "limitingConeAngle",
    "markerHeight",
    "markerWidth",
    "numOctaves",
    "targetX",
    "targetY",
    "surfaceScale",
    "specularConstant",
    "specularExponent",
    "stdDeviation",
    "tableValues",
    "viewBox",
    "gradientTransform",
    "pathLength",
    "startOffset",
    "textLength",
    "lengthAdjust",
  ]);
  var S = t.i(140109);
  function A(t, { style: e, vars: i }, s, n) {
    let r,
      o = t.style;
    for (r in e) o[r] = e[r];
    for (r in (n?.applyProjectionStyles(o, s), i)) o.setProperty(r, i[r]);
  }
  t.s(["f", 0, A], 671348);
  var E = t.i(639190);
  t.s(
    [
      "f",
      0,
      class extends x {
        constructor() {
          (super(...arguments),
            (this.type = "svg"),
            (this.isSVGTag = !1),
            (this.measureInstanceViewportBox = s.J));
        }
        getBaseTargetFromProps(t, e) {
          return t[e];
        }
        readValueFromInstance(t, s) {
          if (e.P.has(s)) {
            let t = (0, i.f)(s);
            return (t && t.default) || 0;
          }
          return ((s = w.has(s) ? s : (0, P.f)(s)), t.getAttribute(s));
        }
        scrapeMotionValuesFromProps(t, e, i) {
          return (0, E.f)(t, e, i);
        }
        build(t, e, i) {
          (0, T.f)(t, e, this.isSVGTag, i.transformTemplate, i.style);
        }
        renderInstance(t, e, i, s) {
          for (let i in (A(t, e, void 0, s), e.attrs))
            t.setAttribute(w.has(i) ? i : (0, P.f)(i), e.attrs[i]);
        }
        mount(t) {
          ((this.isSVGTag = (0, S.f)(t.tagName)), super.mount(t));
        }
      },
    ],
    488257,
  );
};
