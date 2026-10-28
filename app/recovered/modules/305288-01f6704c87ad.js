// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  let n;
  var t,
    a,
    r = e.i(484169),
    i = e.i(352386);
  let o = Math.min,
    s = Math.max,
    l = Math.round,
    c = Math.floor,
    u = (e) => ({ x: e, y: e }),
    d = { left: "right", right: "left", bottom: "top", top: "bottom" },
    m = { start: "end", end: "start" };
  function p(e, n) {
    return "function" == typeof e ? e(n) : e;
  }
  function f(e) {
    return e.split("-")[0];
  }
  function h(e) {
    return e.split("-")[1];
  }
  function g(e) {
    return "x" === e ? "y" : "x";
  }
  function k(e) {
    return "y" === e ? "height" : "width";
  }
  let T = new Set(["top", "bottom"]);
  function v(e) {
    return T.has(f(e)) ? "y" : "x";
  }
  function y(e) {
    return e.replace(/start|end/g, (e) => m[e]);
  }
  let b = ["left", "right"],
    E = ["right", "left"],
    _ = ["top", "bottom"],
    S = ["bottom", "top"];
  function w(e) {
    return e.replace(/left|right|bottom|top/g, (e) => d[e]);
  }
  function I(e) {
    let { x: n, y: t, width: a, height: r } = e;
    return {
      width: a,
      height: r,
      top: t,
      left: n,
      right: n + a,
      bottom: t + r,
      x: n,
      y: t,
    };
  }
  function A(e, n, t) {
    let a,
      { reference: r, floating: i } = e,
      o = v(n),
      s = g(v(n)),
      l = k(s),
      c = f(n),
      u = "y" === o,
      d = r.x + r.width / 2 - i.width / 2,
      m = r.y + r.height / 2 - i.height / 2,
      p = r[l] / 2 - i[l] / 2;
    switch (c) {
      case "top":
        a = { x: d, y: r.y - i.height };
        break;
      case "bottom":
        a = { x: d, y: r.y + r.height };
        break;
      case "right":
        a = { x: r.x + r.width, y: m };
        break;
      case "left":
        a = { x: r.x - i.width, y: m };
        break;
      default:
        a = { x: r.x, y: r.y };
    }
    switch (h(n)) {
      case "start":
        a[s] -= p * (t && u ? -1 : 1);
        break;
      case "end":
        a[s] += p * (t && u ? -1 : 1);
    }
    return a;
  }
  let N = async (e, n, t) => {
    let {
        placement: a = "bottom",
        strategy: r = "absolute",
        middleware: i = [],
        platform: o,
      } = t,
      s = i.filter(Boolean),
      l = await (null == o.isRTL ? void 0 : o.isRTL(n)),
      c = await o.getElementRects({ reference: e, floating: n, strategy: r }),
      { x: u, y: d } = A(c, a, l),
      m = a,
      p = {},
      f = 0;
    for (let t = 0; t < s.length; t++) {
      let { name: i, fn: h } = s[t],
        {
          x: g,
          y: k,
          data: T,
          reset: v,
        } = await h({
          x: u,
          y: d,
          initialPlacement: a,
          placement: m,
          strategy: r,
          middlewareData: p,
          rects: c,
          platform: o,
          elements: { reference: e, floating: n },
        });
      ((u = g ?? u),
        (d = k ?? d),
        (p = { ...p, [i]: { ...p[i], ...T } }),
        v &&
          f <= 50 &&
          (f++,
          "object" == typeof v &&
            (v.placement && (m = v.placement),
            v.rects &&
              (c =
                !0 === v.rects
                  ? await o.getElementRects({
                      reference: e,
                      floating: n,
                      strategy: r,
                    })
                  : v.rects),
            ({ x: u, y: d } = A(c, m, l))),
          (t = -1)));
    }
    return { x: u, y: d, placement: m, strategy: r, middlewareData: p };
  };
  async function R(e, n) {
    var t, a;
    void 0 === n && (n = {});
    let { x: r, y: i, platform: o, rects: s, elements: l, strategy: c } = e,
      {
        boundary: u = "clippingAncestors",
        rootBoundary: d = "viewport",
        elementContext: m = "floating",
        altBoundary: f = !1,
        padding: h = 0,
      } = p(n, e),
      g =
        "number" != typeof (a = h)
          ? { top: 0, right: 0, bottom: 0, left: 0, ...a }
          : { top: a, right: a, bottom: a, left: a },
      k = l[f ? ("floating" === m ? "reference" : "floating") : m],
      T = I(
        await o.getClippingRect({
          element:
            null ==
              (t = await (null == o.isElement ? void 0 : o.isElement(k))) || t
              ? k
              : k.contextElement ||
                (await (null == o.getDocumentElement
                  ? void 0
                  : o.getDocumentElement(l.floating))),
          boundary: u,
          rootBoundary: d,
          strategy: c,
        }),
      ),
      v =
        "floating" === m
          ? { x: r, y: i, width: s.floating.width, height: s.floating.height }
          : s.reference,
      y = await (null == o.getOffsetParent
        ? void 0
        : o.getOffsetParent(l.floating)),
      b = ((await (null == o.isElement ? void 0 : o.isElement(y))) &&
        (await (null == o.getScale ? void 0 : o.getScale(y)))) || {
        x: 1,
        y: 1,
      },
      E = I(
        o.convertOffsetParentRelativeRectToViewportRelativeRect
          ? await o.convertOffsetParentRelativeRectToViewportRelativeRect({
              elements: l,
              rect: v,
              offsetParent: y,
              strategy: c,
            })
          : v,
      );
    return {
      top: (T.top - E.top + g.top) / b.y,
      bottom: (E.bottom - T.bottom + g.bottom) / b.y,
      left: (T.left - E.left + g.left) / b.x,
      right: (E.right - T.right + g.right) / b.x,
    };
  }
  let P = new Set(["left", "top"]);
  async function O(e, n) {
    let { placement: t, platform: a, elements: r } = e,
      i = await (null == a.isRTL ? void 0 : a.isRTL(r.floating)),
      o = f(t),
      s = h(t),
      l = "y" === v(t),
      c = P.has(o) ? -1 : 1,
      u = i && l ? -1 : 1,
      d = p(n, e),
      {
        mainAxis: m,
        crossAxis: g,
        alignmentAxis: k,
      } = "number" == typeof d
        ? { mainAxis: d, crossAxis: 0, alignmentAxis: null }
        : {
            mainAxis: d.mainAxis || 0,
            crossAxis: d.crossAxis || 0,
            alignmentAxis: d.alignmentAxis,
          };
    return (
      s && "number" == typeof k && (g = "end" === s ? -1 * k : k),
      l ? { x: g * u, y: m * c } : { x: m * c, y: g * u }
    );
  }
  function x() {
    return "u" > typeof window;
  }
  function C(e) {
    return L(e) ? (e.nodeName || "").toLowerCase() : "#document";
  }
  function M(e) {
    var n;
    return (
      (null == e || null == (n = e.ownerDocument) ? void 0 : n.defaultView) ||
      window
    );
  }
  function D(e) {
    var n;
    return null ==
      (n = (L(e) ? e.ownerDocument : e.document) || window.document)
      ? void 0
      : n.documentElement;
  }
  function L(e) {
    return !!x() && (e instanceof Node || e instanceof M(e).Node);
  }
  function U(e) {
    return !!x() && (e instanceof Element || e instanceof M(e).Element);
  }
  function F(e) {
    return !!x() && (e instanceof HTMLElement || e instanceof M(e).HTMLElement);
  }
  function j(e) {
    return (
      !(!x() || typeof ShadowRoot > "u") &&
      (e instanceof ShadowRoot || e instanceof M(e).ShadowRoot)
    );
  }
  let V = new Set(["inline", "contents"]);
  function H(e) {
    let { overflow: n, overflowX: t, overflowY: a, display: r } = Z(e);
    return /auto|scroll|overlay|hidden|clip/.test(n + a + t) && !V.has(r);
  }
  let B = new Set(["table", "td", "th"]),
    $ = [":popover-open", ":modal"];
  function G(e) {
    return $.some((n) => {
      try {
        return e.matches(n);
      } catch {
        return !1;
      }
    });
  }
  let W = ["transform", "translate", "scale", "rotate", "perspective"],
    J = ["transform", "translate", "scale", "rotate", "perspective", "filter"],
    z = ["paint", "layout", "strict", "content"];
  function q(e) {
    let n = Y(),
      t = U(e) ? Z(e) : e;
    return (
      W.some((e) => !!t[e] && "none" !== t[e]) ||
      (!!t.containerType && "normal" !== t.containerType) ||
      (!n && !!t.backdropFilter && "none" !== t.backdropFilter) ||
      (!n && !!t.filter && "none" !== t.filter) ||
      J.some((e) => (t.willChange || "").includes(e)) ||
      z.some((e) => (t.contain || "").includes(e))
    );
  }
  function Y() {
    return (
      !(typeof CSS > "u") &&
      !!CSS.supports &&
      CSS.supports("-webkit-backdrop-filter", "none")
    );
  }
  let K = new Set(["html", "body", "#document"]);
  function X(e) {
    return K.has(C(e));
  }
  function Z(e) {
    return M(e).getComputedStyle(e);
  }
  function Q(e) {
    return U(e)
      ? { scrollLeft: e.scrollLeft, scrollTop: e.scrollTop }
      : { scrollLeft: e.scrollX, scrollTop: e.scrollY };
  }
  function ee(e) {
    if ("html" === C(e)) return e;
    let n = e.assignedSlot || e.parentNode || (j(e) && e.host) || D(e);
    return j(n) ? n.host : n;
  }
  function en(e, n, t) {
    var a;
    (void 0 === n && (n = []), void 0 === t && (t = !0));
    let r = (function e(n) {
        let t = ee(n);
        return X(t)
          ? n.ownerDocument
            ? n.ownerDocument.body
            : n.body
          : F(t) && H(t)
            ? t
            : e(t);
      })(e),
      i = r === (null == (a = e.ownerDocument) ? void 0 : a.body),
      o = M(r);
    if (i) {
      let e = et(o);
      return n.concat(
        o,
        o.visualViewport || [],
        H(r) ? r : [],
        e && t ? en(e) : [],
      );
    }
    return n.concat(r, en(r, [], t));
  }
  function et(e) {
    return e.parent && Object.getPrototypeOf(e.parent) ? e.frameElement : null;
  }
  function ea(e) {
    let n = Z(e),
      t = parseFloat(n.width) || 0,
      a = parseFloat(n.height) || 0,
      r = F(e),
      i = r ? e.offsetWidth : t,
      o = r ? e.offsetHeight : a,
      s = l(t) !== i || l(a) !== o;
    return (s && ((t = i), (a = o)), { width: t, height: a, $: s });
  }
  function er(e) {
    return U(e) ? e : e.contextElement;
  }
  function ei(e) {
    let n = er(e);
    if (!F(n)) return u(1);
    let t = n.getBoundingClientRect(),
      { width: a, height: r, $: i } = ea(n),
      o = (i ? l(t.width) : t.width) / a,
      s = (i ? l(t.height) : t.height) / r;
    return (
      (o && Number.isFinite(o)) || (o = 1),
      (s && Number.isFinite(s)) || (s = 1),
      { x: o, y: s }
    );
  }
  let eo = u(0);
  function es(e) {
    let n = M(e);
    return Y() && n.visualViewport
      ? { x: n.visualViewport.offsetLeft, y: n.visualViewport.offsetTop }
      : eo;
  }
  function el(e, n, t, a) {
    var r;
    (void 0 === n && (n = !1), void 0 === t && (t = !1));
    let i = e.getBoundingClientRect(),
      o = er(e),
      s = u(1);
    n && (a ? U(a) && (s = ei(a)) : (s = ei(e)));
    let l = (void 0 === (r = t) && (r = !1), a && (!r || a === M(o)) && r)
        ? es(o)
        : u(0),
      c = (i.left + l.x) / s.x,
      d = (i.top + l.y) / s.y,
      m = i.width / s.x,
      p = i.height / s.y;
    if (o) {
      let e = M(o),
        n = a && U(a) ? M(a) : a,
        t = e,
        r = et(t);
      for (; r && a && n !== t; ) {
        let e = ei(r),
          n = r.getBoundingClientRect(),
          a = Z(r),
          i = n.left + (r.clientLeft + parseFloat(a.paddingLeft)) * e.x,
          o = n.top + (r.clientTop + parseFloat(a.paddingTop)) * e.y;
        ((c *= e.x),
          (d *= e.y),
          (m *= e.x),
          (p *= e.y),
          (c += i),
          (d += o),
          (r = et((t = M(r)))));
      }
    }
    return I({ width: m, height: p, x: c, y: d });
  }
  function ec(e, n) {
    let t = Q(e).scrollLeft;
    return n ? n.left + t : el(D(e)).left + t;
  }
  function eu(e, n) {
    let t = e.getBoundingClientRect();
    return { x: t.left + n.scrollLeft - ec(e, t), y: t.top + n.scrollTop };
  }
  let ed = new Set(["absolute", "fixed"]);
  function em(e, n, t) {
    var a;
    let r;
    if ("viewport" === n)
      r = (function (e, n) {
        let t = M(e),
          a = D(e),
          r = t.visualViewport,
          i = a.clientWidth,
          o = a.clientHeight,
          s = 0,
          l = 0;
        if (r) {
          ((i = r.width), (o = r.height));
          let e = Y();
          (!e || (e && "fixed" === n)) &&
            ((s = r.offsetLeft), (l = r.offsetTop));
        }
        let c = ec(a);
        if (c <= 0) {
          let e = a.ownerDocument,
            n = e.body,
            t = getComputedStyle(n),
            r =
              ("CSS1Compat" === e.compatMode &&
                parseFloat(t.marginLeft) + parseFloat(t.marginRight)) ||
              0,
            o = Math.abs(a.clientWidth - n.clientWidth - r);
          o <= 25 && (i -= o);
        } else c <= 25 && (i += c);
        return { width: i, height: o, x: s, y: l };
      })(e, t);
    else if ("document" === n) {
      let n, t, i, o, l, c, u;
      ((a = D(e)),
        (n = D(a)),
        (t = Q(a)),
        (i = a.ownerDocument.body),
        (o = s(n.scrollWidth, n.clientWidth, i.scrollWidth, i.clientWidth)),
        (l = s(n.scrollHeight, n.clientHeight, i.scrollHeight, i.clientHeight)),
        (c = -t.scrollLeft + ec(a)),
        (u = -t.scrollTop),
        "rtl" === Z(i).direction && (c += s(n.clientWidth, i.clientWidth) - o),
        (r = { width: o, height: l, x: c, y: u }));
    } else if (U(n)) {
      let e, a, i, o, s, l;
      ((a = (e = el(n, !0, "fixed" === t)).top + n.clientTop),
        (i = e.left + n.clientLeft),
        (o = F(n) ? ei(n) : u(1)),
        (s = n.clientWidth * o.x),
        (l = n.clientHeight * o.y),
        (r = { width: s, height: l, x: i * o.x, y: a * o.y }));
    } else {
      let t = es(e);
      r = { x: n.x - t.x, y: n.y - t.y, width: n.width, height: n.height };
    }
    return I(r);
  }
  function ep(e) {
    return "static" === Z(e).position;
  }
  function ef(e, n) {
    if (!F(e) || "fixed" === Z(e).position) return null;
    if (n) return n(e);
    let t = e.offsetParent;
    return (D(e) === t && (t = t.ownerDocument.body), t);
  }
  function eh(e, n) {
    var t;
    let a = M(e);
    if (G(e)) return a;
    if (!F(e)) {
      let n = ee(e);
      for (; n && !X(n); ) {
        if (U(n) && !ep(n)) return n;
        n = ee(n);
      }
      return a;
    }
    let r = ef(e, n);
    for (; r && ((t = r), B.has(C(t))) && ep(r); ) r = ef(r, n);
    return r && X(r) && ep(r) && !q(r)
      ? a
      : r ||
          (function (e) {
            let n = ee(e);
            for (; F(n) && !X(n); ) {
              if (q(n)) return n;
              if (G(n)) break;
              n = ee(n);
            }
            return null;
          })(e) ||
          a;
  }
  let eg = async function (e) {
      let n = this.getOffsetParent || eh,
        t = this.getDimensions,
        a = await t(e.floating);
      return {
        reference: (function (e, n, t) {
          let a = F(n),
            r = D(n),
            i = "fixed" === t,
            o = el(e, !0, i, n),
            s = { scrollLeft: 0, scrollTop: 0 },
            l = u(0);
          if (a || (!a && !i))
            if ((("body" !== C(n) || H(r)) && (s = Q(n)), a)) {
              let e = el(n, !0, i, n);
              ((l.x = e.x + n.clientLeft), (l.y = e.y + n.clientTop));
            } else r && (l.x = ec(r));
          i && !a && r && (l.x = ec(r));
          let c = !r || a || i ? u(0) : eu(r, s);
          return {
            x: o.left + s.scrollLeft - l.x - c.x,
            y: o.top + s.scrollTop - l.y - c.y,
            width: o.width,
            height: o.height,
          };
        })(e.reference, await n(e.floating), e.strategy),
        floating: { x: 0, y: 0, width: a.width, height: a.height },
      };
    },
    ek = {
      convertOffsetParentRelativeRectToViewportRelativeRect: function (e) {
        let { elements: n, rect: t, offsetParent: a, strategy: r } = e,
          i = "fixed" === r,
          o = D(a),
          s = !!n && G(n.floating);
        if (a === o || (s && i)) return t;
        let l = { scrollLeft: 0, scrollTop: 0 },
          c = u(1),
          d = u(0),
          m = F(a);
        if (
          (m || (!m && !i)) &&
          (("body" !== C(a) || H(o)) && (l = Q(a)), F(a))
        ) {
          let e = el(a);
          ((c = ei(a)), (d.x = e.x + a.clientLeft), (d.y = e.y + a.clientTop));
        }
        let p = !o || m || i ? u(0) : eu(o, l);
        return {
          width: t.width * c.x,
          height: t.height * c.y,
          x: t.x * c.x - l.scrollLeft * c.x + d.x + p.x,
          y: t.y * c.y - l.scrollTop * c.y + d.y + p.y,
        };
      },
      getDocumentElement: D,
      getClippingRect: function (e) {
        let { element: n, boundary: t, rootBoundary: a, strategy: r } = e,
          i = [
            ...("clippingAncestors" === t
              ? G(n)
                ? []
                : (function (e, n) {
                    let t = n.get(e);
                    if (t) return t;
                    let a = en(e, [], !1).filter(
                        (e) => U(e) && "body" !== C(e),
                      ),
                      r = null,
                      i = "fixed" === Z(e).position,
                      o = i ? ee(e) : e;
                    for (; U(o) && !X(o); ) {
                      let n = Z(o),
                        t = q(o);
                      (t || "fixed" !== n.position || (r = null),
                        (
                          i
                            ? !t && !r
                            : (!t &&
                                "static" === n.position &&
                                !!r &&
                                ed.has(r.position)) ||
                              (H(o) &&
                                !t &&
                                (function e(n, t) {
                                  let a = ee(n);
                                  return (
                                    !(a === t || !U(a) || X(a)) &&
                                    ("fixed" === Z(a).position || e(a, t))
                                  );
                                })(e, o))
                        )
                          ? (a = a.filter((e) => e !== o))
                          : (r = n),
                        (o = ee(o)));
                    }
                    return (n.set(e, a), a);
                  })(n, this._c)
              : [].concat(t)),
            a,
          ],
          l = i[0],
          c = i.reduce(
            (e, t) => {
              let a = em(n, t, r);
              return (
                (e.top = s(a.top, e.top)),
                (e.right = o(a.right, e.right)),
                (e.bottom = o(a.bottom, e.bottom)),
                (e.left = s(a.left, e.left)),
                e
              );
            },
            em(n, l, r),
          );
        return {
          width: c.right - c.left,
          height: c.bottom - c.top,
          x: c.left,
          y: c.top,
        };
      },
      getOffsetParent: eh,
      getElementRects: eg,
      getClientRects: function (e) {
        return Array.from(e.getClientRects());
      },
      getDimensions: function (e) {
        let { width: n, height: t } = ea(e);
        return { width: n, height: t };
      },
      getScale: ei,
      isElement: U,
      isRTL: function (e) {
        return "rtl" === Z(e).direction;
      },
    };
  function eT(e, n) {
    return (
      e.x === n.x && e.y === n.y && e.width === n.width && e.height === n.height
    );
  }
  var ev =
    "u" > typeof globalThis ? globalThis : "u" > typeof window ? window : e.g;
  function ey(e) {
    return e &&
      e.__esModule &&
      Object.prototype.hasOwnProperty.call(e, "default")
      ? e.default
      : e;
  }
  var eb,
    eE = { exports: {} },
    e_ = eE.exports;
  let eS = ey(
    (eb ||
      ((eb = 1),
      (t = function () {
        var e = function () {},
          n = "undefined",
          t =
            typeof window !== n &&
            typeof window.navigator !== n &&
            /Trident\/|MSIE /.test(window.navigator.userAgent),
          a = ["trace", "debug", "info", "warn", "error"],
          r = {},
          i = null;
        function o(e, n) {
          var t = e[n];
          if ("function" == typeof t.bind) return t.bind(e);
          try {
            return Function.prototype.bind.call(t, e);
          } catch {
            return function () {
              return Function.prototype.apply.apply(t, [e, arguments]);
            };
          }
        }
        function s() {
          (console.log &&
            (console.log.apply
              ? console.log.apply(console, arguments)
              : Function.prototype.apply.apply(console.log, [
                  console,
                  arguments,
                ])),
            console.trace && console.trace());
        }
        function l() {
          for (var t = this.getLevel(), r = 0; r < a.length; r++) {
            var i = a[r];
            this[i] = r < t ? e : this.methodFactory(i, t, this.name);
          }
          if (
            ((this.log = this.debug),
            typeof console === n && t < this.levels.SILENT)
          )
            return "No console available for logging";
        }
        function c(e) {
          return function () {
            typeof console !== n &&
              (l.call(this), this[e].apply(this, arguments));
          };
        }
        function u(a, r, i) {
          var l;
          return (
            "debug" === (l = a) && (l = "log"),
            (typeof console !== n &&
              ("trace" === l && t
                ? s
                : void 0 !== console[l]
                  ? o(console, l)
                  : void 0 !== console.log
                    ? o(console, "log")
                    : e)) ||
              c.apply(this, arguments)
          );
        }
        function d(e, t) {
          var o,
            s,
            c,
            d = this,
            m = "loglevel";
          function p() {
            var e;
            if (!(typeof window === n || !m)) {
              try {
                e = window.localStorage[m];
              } catch {}
              if (typeof e === n)
                try {
                  var t = window.document.cookie,
                    a = encodeURIComponent(m),
                    r = t.indexOf(a + "=");
                  -1 !== r &&
                    (e = /^([^;]+)/.exec(t.slice(r + a.length + 1))[1]);
                } catch {}
              return (void 0 === d.levels[e] && (e = void 0), e);
            }
          }
          function f(e) {
            var n = e;
            if (
              ("string" == typeof n &&
                void 0 !== d.levels[n.toUpperCase()] &&
                (n = d.levels[n.toUpperCase()]),
              "number" == typeof n && n >= 0 && n <= d.levels.SILENT)
            )
              return n;
            throw TypeError("log.setLevel() called with invalid level: " + e);
          }
          ("string" == typeof e
            ? (m += ":" + e)
            : "symbol" == typeof e && (m = void 0),
            (d.name = e),
            (d.levels = {
              TRACE: 0,
              DEBUG: 1,
              INFO: 2,
              WARN: 3,
              ERROR: 4,
              SILENT: 5,
            }),
            (d.methodFactory = t || u),
            (d.getLevel = function () {
              return c ?? s ?? o;
            }),
            (d.setLevel = function (e, t) {
              return (
                (c = f(e)),
                !1 !== t &&
                  (function (e) {
                    var t = (a[e] || "silent").toUpperCase();
                    if (!(typeof window === n || !m)) {
                      try {
                        window.localStorage[m] = t;
                        return;
                      } catch {}
                      try {
                        window.document.cookie =
                          encodeURIComponent(m) + "=" + t + ";";
                      } catch {}
                    }
                  })(c),
                l.call(d)
              );
            }),
            (d.setDefaultLevel = function (e) {
              ((s = f(e)), p() || d.setLevel(e, !1));
            }),
            (d.resetLevel = function () {
              ((c = null),
                (function () {
                  if (!(typeof window === n || !m)) {
                    try {
                      window.localStorage.removeItem(m);
                    } catch {}
                    try {
                      window.document.cookie =
                        encodeURIComponent(m) +
                        "=; expires=Thu, 01 Jan 1970 00:00:00 UTC";
                    } catch {}
                  }
                })(),
                l.call(d));
            }),
            (d.enableAll = function (e) {
              d.setLevel(d.levels.TRACE, e);
            }),
            (d.disableAll = function (e) {
              d.setLevel(d.levels.SILENT, e);
            }),
            (d.rebuild = function () {
              if ((i !== d && (o = f(i.getLevel())), l.call(d), i === d))
                for (var e in r) r[e].rebuild();
            }),
            (o = f(i ? i.getLevel() : "WARN")));
          var h = p();
          (null != h && (c = f(h)), l.call(d));
        }
        (i = new d()).getLogger = function (e) {
          if (("symbol" != typeof e && "string" != typeof e) || "" === e)
            throw TypeError("You must supply a name when creating a logger.");
          var n = r[e];
          return (n || (n = r[e] = new d(e, i.methodFactory)), n);
        };
        var m = typeof window !== n ? window.log : void 0;
        return (
          (i.noConflict = function () {
            return (
              typeof window !== n && window.log === i && (window.log = m),
              i
            );
          }),
          (i.getLoggers = function () {
            return r;
          }),
          (i.default = i),
          i
        );
      }),
      eE.exports ? (eE.exports = t()) : (e_.log = t())),
    eE.exports),
  );
  var ew = function (e, n) {
    return (ew =
      Object.setPrototypeOf ||
      ({ __proto__: [] } instanceof Array &&
        function (e, n) {
          e.__proto__ = n;
        }) ||
      function (e, n) {
        for (var t in n)
          Object.prototype.hasOwnProperty.call(n, t) && (e[t] = n[t]);
      })(e, n);
  };
  function eI(e, n) {
    if ("function" != typeof n && null !== n)
      throw TypeError(
        "Class extends value " + String(n) + " is not a constructor or null",
      );
    function t() {
      this.constructor = e;
    }
    (ew(e, n),
      (e.prototype =
        null === n
          ? Object.create(n)
          : ((t.prototype = n.prototype), new t())));
  }
  function eA(e, n) {
    var t,
      a,
      r,
      i = {
        label: 0,
        sent: function () {
          if (1 & r[0]) throw r[1];
          return r[1];
        },
        trys: [],
        ops: [],
      },
      o = Object.create(
        ("function" == typeof Iterator ? Iterator : Object).prototype,
      );
    return (
      (o.next = s(0)),
      (o.throw = s(1)),
      (o.return = s(2)),
      "function" == typeof Symbol &&
        (o[Symbol.iterator] = function () {
          return this;
        }),
      o
    );
    function s(s) {
      return function (l) {
        var c = [s, l];
        if (t) throw TypeError("Generator is already executing.");
        for (; o && ((o = 0), c[0] && (i = 0)), i; )
          try {
            if (
              ((t = 1),
              a &&
                (r =
                  2 & c[0]
                    ? a.return
                    : c[0]
                      ? a.throw || ((r = a.return) && r.call(a), 0)
                      : a.next) &&
                !(r = r.call(a, c[1])).done)
            )
              return r;
            switch (((a = 0), r && (c = [2 & c[0], r.value]), c[0])) {
              case 0:
              case 1:
                r = c;
                break;
              case 4:
                return (i.label++, { value: c[1], done: !1 });
              case 5:
                (i.label++, (a = c[1]), (c = [0]));
                continue;
              case 7:
                ((c = i.ops.pop()), i.trys.pop());
                continue;
              default:
                if (
                  !(r = (r = i.trys).length > 0 && r[r.length - 1]) &&
                  (6 === c[0] || 2 === c[0])
                ) {
                  i = 0;
                  continue;
                }
                if (3 === c[0] && (!r || (c[1] > r[0] && c[1] < r[3]))) {
                  i.label = c[1];
                  break;
                }
                if (6 === c[0] && i.label < r[1]) {
                  ((i.label = r[1]), (r = c));
                  break;
                }
                if (r && i.label < r[2]) {
                  ((i.label = r[2]), i.ops.push(c));
                  break;
                }
                (r[2] && i.ops.pop(), i.trys.pop());
                continue;
            }
            c = n.call(e, i);
          } catch (e) {
            ((c = [6, e]), (a = 0));
          } finally {
            t = r = 0;
          }
        if (5 & c[0]) throw c[1];
        return { value: c[0] ? c[1] : void 0, done: !0 };
      };
    }
  }
  function eN(e) {
    var n = "function" == typeof Symbol && Symbol.iterator,
      t = n && e[n],
      a = 0;
    if (t) return t.call(e);
    if (e && "number" == typeof e.length)
      return {
        next: function () {
          return (
            e && a >= e.length && (e = void 0),
            { value: e && e[a++], done: !e }
          );
        },
      };
    throw TypeError(
      n ? "Object is not iterable." : "Symbol.iterator is not defined.",
    );
  }
  function eR(e, n) {
    var t = "function" == typeof Symbol && e[Symbol.iterator];
    if (!t) return e;
    var a,
      r,
      i = t.call(e),
      o = [];
    try {
      for (; (void 0 === n || n-- > 0) && !(a = i.next()).done; )
        o.push(a.value);
    } catch (e) {
      r = { error: e };
    } finally {
      try {
        a && !a.done && (t = i.return) && t.call(i);
      } finally {
        if (r) throw r.error;
      }
    }
    return o;
  }
  function eP(e, n, t) {
    if (t || 2 == arguments.length)
      for (var a, r = 0, i = n.length; r < i; r++)
        (!a && r in n) ||
          (a || (a = Array.prototype.slice.call(n, 0, r)), (a[r] = n[r]));
    return e.concat(a || Array.prototype.slice.call(n));
  }
  function eO(e) {
    return this instanceof eO ? ((this.v = e), this) : new eO(e);
  }
  function ex(e) {
    return "function" == typeof e;
  }
  function eC(e) {
    var n = e(function (e) {
      (Error.call(e), (e.stack = Error().stack));
    });
    return (
      (n.prototype = Object.create(Error.prototype)),
      (n.prototype.constructor = n),
      n
    );
  }
  var eM = eC(function (e) {
    return function (n) {
      (e(this),
        (this.message = n
          ? n.length +
            ` errors occurred during unsubscription:
` +
            n.map(function (e, n) {
              return n + 1 + ") " + e.toString();
            }).join(`
  `)
          : ""),
        (this.name = "UnsubscriptionError"),
        (this.errors = n));
    };
  });
  function eD(e, n) {
    if (e) {
      var t = e.indexOf(n);
      0 <= t && e.splice(t, 1);
    }
  }
  var eL = (function () {
      var e;
      function n(e) {
        ((this.initialTeardown = e),
          (this.closed = !1),
          (this._parentage = null),
          (this._finalizers = null));
      }
      return (
        (n.prototype.unsubscribe = function () {
          var e, n, t, a, r;
          if (!this.closed) {
            this.closed = !0;
            var i = this._parentage;
            if (i)
              if (((this._parentage = null), Array.isArray(i)))
                try {
                  for (var o = eN(i), s = o.next(); !s.done; s = o.next())
                    s.value.remove(this);
                } catch (n) {
                  e = { error: n };
                } finally {
                  try {
                    s && !s.done && (n = o.return) && n.call(o);
                  } finally {
                    if (e) throw e.error;
                  }
                }
              else i.remove(this);
            var l = this.initialTeardown;
            if (ex(l))
              try {
                l();
              } catch (e) {
                r = e instanceof eM ? e.errors : [e];
              }
            var c = this._finalizers;
            if (c) {
              this._finalizers = null;
              try {
                for (var u = eN(c), d = u.next(); !d.done; d = u.next()) {
                  var m = d.value;
                  try {
                    ej(m);
                  } catch (e) {
                    ((r = r ?? []),
                      e instanceof eM
                        ? (r = eP(eP([], eR(r)), eR(e.errors)))
                        : r.push(e));
                  }
                }
              } catch (e) {
                t = { error: e };
              } finally {
                try {
                  d && !d.done && (a = u.return) && a.call(u);
                } finally {
                  if (t) throw t.error;
                }
              }
            }
            if (r) throw new eM(r);
          }
        }),
        (n.prototype.add = function (e) {
          var t;
          if (e && e !== this)
            if (this.closed) ej(e);
            else {
              if (e instanceof n) {
                if (e.closed || e._hasParent(this)) return;
                e._addParent(this);
              }
              (this._finalizers = null != (t = this._finalizers) ? t : []).push(
                e,
              );
            }
        }),
        (n.prototype._hasParent = function (e) {
          var n = this._parentage;
          return n === e || (Array.isArray(n) && n.includes(e));
        }),
        (n.prototype._addParent = function (e) {
          var n = this._parentage;
          this._parentage = Array.isArray(n) ? (n.push(e), n) : n ? [n, e] : e;
        }),
        (n.prototype._removeParent = function (e) {
          var n = this._parentage;
          n === e ? (this._parentage = null) : Array.isArray(n) && eD(n, e);
        }),
        (n.prototype.remove = function (e) {
          var t = this._finalizers;
          (t && eD(t, e), e instanceof n && e._removeParent(this));
        }),
        ((e = new n()).closed = !0),
        (n.EMPTY = e),
        n
      );
    })(),
    eU = eL.EMPTY;
  function eF(e) {
    return (
      e instanceof eL ||
      (e && "closed" in e && ex(e.remove) && ex(e.add) && ex(e.unsubscribe))
    );
  }
  function ej(e) {
    ex(e) ? e() : e.unsubscribe();
  }
  var eV = void 0,
    eH = function (e, n) {
      for (var t = [], a = 2; a < arguments.length; a++)
        t[a - 2] = arguments[a];
      return setTimeout.apply(void 0, eP([e, n], eR(t)));
    };
  function eB(e) {
    eH(function () {
      throw e;
    });
  }
  function e$() {}
  var eG = (function (e) {
      function n(n) {
        var t = e.call(this) || this;
        return (
          (t.isStopped = !1),
          n ? ((t.destination = n), eF(n) && n.add(t)) : (t.destination = ez),
          t
        );
      }
      return (
        eI(n, e),
        (n.create = function (e, n, t) {
          return new eJ(e, n, t);
        }),
        (n.prototype.next = function (e) {
          this.isStopped || this._next(e);
        }),
        (n.prototype.error = function (e) {
          this.isStopped || ((this.isStopped = !0), this._error(e));
        }),
        (n.prototype.complete = function () {
          this.isStopped || ((this.isStopped = !0), this._complete());
        }),
        (n.prototype.unsubscribe = function () {
          this.closed ||
            ((this.isStopped = !0),
            e.prototype.unsubscribe.call(this),
            (this.destination = null));
        }),
        (n.prototype._next = function (e) {
          this.destination.next(e);
        }),
        (n.prototype._error = function (e) {
          try {
            this.destination.error(e);
          } finally {
            this.unsubscribe();
          }
        }),
        (n.prototype._complete = function () {
          try {
            this.destination.complete();
          } finally {
            this.unsubscribe();
          }
        }),
        n
      );
    })(eL),
    eW = (function () {
      function e(e) {
        this.partialObserver = e;
      }
      return (
        (e.prototype.next = function (e) {
          var n = this.partialObserver;
          if (n.next)
            try {
              n.next(e);
            } catch (e) {
              eB(e);
            }
        }),
        (e.prototype.error = function (e) {
          var n = this.partialObserver;
          if (n.error)
            try {
              n.error(e);
            } catch (e) {
              eB(e);
            }
          else eB(e);
        }),
        (e.prototype.complete = function () {
          var e = this.partialObserver;
          if (e.complete)
            try {
              e.complete();
            } catch (e) {
              eB(e);
            }
        }),
        e
      );
    })(),
    eJ = (function (e) {
      function n(n, t, a) {
        var r = e.call(this) || this;
        return (
          (r.destination = new eW(
            ex(n) || !n
              ? { next: n ?? void 0, error: t ?? void 0, complete: a ?? void 0 }
              : n,
          )),
          r
        );
      }
      return (eI(n, e), n);
    })(eG),
    ez = {
      closed: !0,
      next: e$,
      error: function (e) {
        throw e;
      },
      complete: e$,
    },
    eq = ("function" == typeof Symbol && Symbol.observable) || "@@observable";
  function eY(e) {
    return e;
  }
  var eK = (function () {
    function e(e) {
      e && (this._subscribe = e);
    }
    return (
      (e.prototype.lift = function (n) {
        var t = new e();
        return ((t.source = this), (t.operator = n), t);
      }),
      (e.prototype.subscribe = function (e, n, t) {
        var a,
          r,
          i = this,
          o = !(function (e) {
            return (
              (e && e instanceof eG) ||
              (e && ex(e.next) && ex(e.error) && ex(e.complete) && eF(e))
            );
          })(e)
            ? new eJ(e, n, t)
            : e;
        return (
          (a = i.operator),
          (r = i.source),
          o.add(a ? a.call(o, r) : r ? i._subscribe(o) : i._trySubscribe(o)),
          o
        );
      }),
      (e.prototype._trySubscribe = function (e) {
        try {
          return this._subscribe(e);
        } catch (n) {
          e.error(n);
        }
      }),
      (e.prototype.forEach = function (e, n) {
        var t = this;
        return new (n = eX(n))(function (n, a) {
          var r = new eJ({
            next: function (n) {
              try {
                e(n);
              } catch (e) {
                (a(e), r.unsubscribe());
              }
            },
            error: a,
            complete: n,
          });
          t.subscribe(r);
        });
      }),
      (e.prototype._subscribe = function (e) {
        var n;
        return null == (n = this.source) ? void 0 : n.subscribe(e);
      }),
      (e.prototype[eq] = function () {
        return this;
      }),
      (e.prototype.pipe = function () {
        for (var e = [], n = 0; n < arguments.length; n++) e[n] = arguments[n];
        return (
          0 === e.length
            ? eY
            : 1 === e.length
              ? e[0]
              : function (n) {
                  return e.reduce(function (e, n) {
                    return n(e);
                  }, n);
                }
        )(this);
      }),
      (e.prototype.toPromise = function (e) {
        var n = this;
        return new (e = eX(e))(function (e, t) {
          var a;
          n.subscribe(
            function (e) {
              return (a = e);
            },
            function (e) {
              return t(e);
            },
            function () {
              return e(a);
            },
          );
        });
      }),
      (e.create = function (n) {
        return new e(n);
      }),
      e
    );
  })();
  function eX(e) {
    var n;
    return null != (n = e ?? eV) ? n : Promise;
  }
  function eZ(e) {
    return function (n) {
      if (ex(null == n ? void 0 : n.lift))
        return n.lift(function (n) {
          try {
            return e(n, this);
          } catch (e) {
            this.error(e);
          }
        });
      throw TypeError("Unable to lift unknown Observable type");
    };
  }
  function eQ(e, n, t, a, r) {
    return new e0(e, n, t, a, r);
  }
  var e0 = (function (e) {
      function n(n, t, a, r, i, o) {
        var s = e.call(this, n) || this;
        return (
          (s.onFinalize = i),
          (s.shouldUnsubscribe = o),
          (s._next = t
            ? function (e) {
                try {
                  t(e);
                } catch (e) {
                  n.error(e);
                }
              }
            : e.prototype._next),
          (s._error = r
            ? function (e) {
                try {
                  r(e);
                } catch (e) {
                  n.error(e);
                } finally {
                  this.unsubscribe();
                }
              }
            : e.prototype._error),
          (s._complete = a
            ? function () {
                try {
                  a();
                } catch (e) {
                  n.error(e);
                } finally {
                  this.unsubscribe();
                }
              }
            : e.prototype._complete),
          s
        );
      }
      return (
        eI(n, e),
        (n.prototype.unsubscribe = function () {
          var n;
          if (!this.shouldUnsubscribe || this.shouldUnsubscribe()) {
            var t = this.closed;
            (e.prototype.unsubscribe.call(this),
              t || null == (n = this.onFinalize) || n.call(this));
          }
        }),
        n
      );
    })(eG),
    e1 = eC(function (e) {
      return function () {
        (e(this),
          (this.name = "ObjectUnsubscribedError"),
          (this.message = "object unsubscribed"));
      };
    }),
    e5 = (function (e) {
      function n() {
        var n = e.call(this) || this;
        return (
          (n.closed = !1),
          (n.currentObservers = null),
          (n.observers = []),
          (n.isStopped = !1),
          (n.hasError = !1),
          (n.thrownError = null),
          n
        );
      }
      return (
        eI(n, e),
        (n.prototype.lift = function (e) {
          var n = new e2(this, this);
          return ((n.operator = e), n);
        }),
        (n.prototype._throwIfClosed = function () {
          if (this.closed) throw new e1();
        }),
        (n.prototype.next = function (e) {
          var n, t;
          if ((this._throwIfClosed(), !this.isStopped)) {
            this.currentObservers ||
              (this.currentObservers = Array.from(this.observers));
            try {
              for (
                var a = eN(this.currentObservers), r = a.next();
                !r.done;
                r = a.next()
              )
                r.value.next(e);
            } catch (e) {
              n = { error: e };
            } finally {
              try {
                r && !r.done && (t = a.return) && t.call(a);
              } finally {
                if (n) throw n.error;
              }
            }
          }
        }),
        (n.prototype.error = function (e) {
          if ((this._throwIfClosed(), !this.isStopped)) {
            ((this.hasError = this.isStopped = !0), (this.thrownError = e));
            for (var n = this.observers; n.length; ) n.shift().error(e);
          }
        }),
        (n.prototype.complete = function () {
          if ((this._throwIfClosed(), !this.isStopped)) {
            this.isStopped = !0;
            for (var e = this.observers; e.length; ) e.shift().complete();
          }
        }),
        (n.prototype.unsubscribe = function () {
          ((this.isStopped = this.closed = !0),
            (this.observers = this.currentObservers = null));
        }),
        Object.defineProperty(n.prototype, "observed", {
          get: function () {
            var e;
            return (null == (e = this.observers) ? void 0 : e.length) > 0;
          },
          enumerable: !1,
          configurable: !0,
        }),
        (n.prototype._trySubscribe = function (n) {
          return (
            this._throwIfClosed(),
            e.prototype._trySubscribe.call(this, n)
          );
        }),
        (n.prototype._subscribe = function (e) {
          return (
            this._throwIfClosed(),
            this._checkFinalizedStatuses(e),
            this._innerSubscribe(e)
          );
        }),
        (n.prototype._innerSubscribe = function (e) {
          var n = this,
            t = this.hasError,
            a = this.isStopped,
            r = this.observers;
          return t || a
            ? eU
            : ((this.currentObservers = null),
              r.push(e),
              new eL(function () {
                ((n.currentObservers = null), eD(r, e));
              }));
        }),
        (n.prototype._checkFinalizedStatuses = function (e) {
          var n = this.hasError,
            t = this.thrownError,
            a = this.isStopped;
          n ? e.error(t) : a && e.complete();
        }),
        (n.prototype.asObservable = function () {
          var e = new eK();
          return ((e.source = this), e);
        }),
        (n.create = function (e, n) {
          return new e2(e, n);
        }),
        n
      );
    })(eK),
    e2 = (function (e) {
      function n(n, t) {
        var a = e.call(this) || this;
        return ((a.destination = n), (a.source = t), a);
      }
      return (
        eI(n, e),
        (n.prototype.next = function (e) {
          var n, t;
          null == (t = null == (n = this.destination) ? void 0 : n.next) ||
            t.call(n, e);
        }),
        (n.prototype.error = function (e) {
          var n, t;
          null == (t = null == (n = this.destination) ? void 0 : n.error) ||
            t.call(n, e);
        }),
        (n.prototype.complete = function () {
          var e, n;
          null == (n = null == (e = this.destination) ? void 0 : e.complete) ||
            n.call(e);
        }),
        (n.prototype._subscribe = function (e) {
          var n, t;
          return null !=
            (t = null == (n = this.source) ? void 0 : n.subscribe(e))
            ? t
            : eU;
        }),
        n
      );
    })(e5),
    e3 = (function (e) {
      function n(n) {
        var t = e.call(this) || this;
        return ((t._value = n), t);
      }
      return (
        eI(n, e),
        Object.defineProperty(n.prototype, "value", {
          get: function () {
            return this.getValue();
          },
          enumerable: !1,
          configurable: !0,
        }),
        (n.prototype._subscribe = function (n) {
          var t = e.prototype._subscribe.call(this, n);
          return (t.closed || n.next(this._value), t);
        }),
        (n.prototype.getValue = function () {
          var e = this.hasError,
            n = this.thrownError,
            t = this._value;
          if (e) throw n;
          return (this._throwIfClosed(), t);
        }),
        (n.prototype.next = function (n) {
          e.prototype.next.call(this, (this._value = n));
        }),
        n
      );
    })(e5),
    e9 = function () {
      return Date.now();
    },
    e4 = (function (e) {
      function n(n, t) {
        return e.call(this) || this;
      }
      return (
        eI(n, e),
        (n.prototype.schedule = function (e, n) {
          return this;
        }),
        n
      );
    })(eL),
    e6 = function (e, n) {
      for (var t = [], a = 2; a < arguments.length; a++)
        t[a - 2] = arguments[a];
      return setInterval.apply(void 0, eP([e, n], eR(t)));
    },
    e7 = (function (e) {
      function n(n, t) {
        var a = e.call(this, n, t) || this;
        return ((a.scheduler = n), (a.work = t), (a.pending = !1), a);
      }
      return (
        eI(n, e),
        (n.prototype.schedule = function (e, n) {
          if ((void 0 === n && (n = 0), this.closed)) return this;
          this.state = e;
          var t,
            a = this.id,
            r = this.scheduler;
          return (
            null != a && (this.id = this.recycleAsyncId(r, a, n)),
            (this.pending = !0),
            (this.delay = n),
            (this.id =
              null != (t = this.id) ? t : this.requestAsyncId(r, this.id, n)),
            this
          );
        }),
        (n.prototype.requestAsyncId = function (e, n, t) {
          return (void 0 === t && (t = 0), e6(e.flush.bind(e, this), t));
        }),
        (n.prototype.recycleAsyncId = function (e, n, t) {
          if (
            (void 0 === t && (t = 0),
            null != t && this.delay === t && !1 === this.pending)
          )
            return n;
          null != n && clearInterval(n);
        }),
        (n.prototype.execute = function (e, n) {
          if (this.closed) return Error("executing a cancelled action");
          this.pending = !1;
          var t = this._execute(e, n);
          if (t) return t;
          !1 === this.pending &&
            null != this.id &&
            (this.id = this.recycleAsyncId(this.scheduler, this.id, null));
        }),
        (n.prototype._execute = function (e, n) {
          var t,
            a = !1;
          try {
            this.work(e);
          } catch (e) {
            ((a = !0), (t = e || Error("Scheduled action threw falsy error")));
          }
          if (a) return (this.unsubscribe(), t);
        }),
        (n.prototype.unsubscribe = function () {
          if (!this.closed) {
            var n = this.id,
              t = this.scheduler,
              a = t.actions;
            ((this.work = this.state = this.scheduler = null),
              (this.pending = !1),
              eD(a, this),
              null != n && (this.id = this.recycleAsyncId(t, n, null)),
              (this.delay = null),
              e.prototype.unsubscribe.call(this));
          }
        }),
        n
      );
    })(e4),
    e8 = (function () {
      function e(n, t) {
        (void 0 === t && (t = e.now),
          (this.schedulerActionCtor = n),
          (this.now = t));
      }
      return (
        (e.prototype.schedule = function (e, n, t) {
          return (
            void 0 === n && (n = 0),
            new this.schedulerActionCtor(this, e).schedule(t, n)
          );
        }),
        (e.now = e9),
        e
      );
    })(),
    ne = new ((function (e) {
      function n(n, t) {
        void 0 === t && (t = e8.now);
        var a = e.call(this, n, t) || this;
        return ((a.actions = []), (a._active = !1), a);
      }
      return (
        eI(n, e),
        (n.prototype.flush = function (e) {
          var n,
            t = this.actions;
          if (this._active) return void t.push(e);
          this._active = !0;
          do if ((n = e.execute(e.state, e.delay))) break;
          while ((e = t.shift()));
          if (((this._active = !1), n)) {
            for (; (e = t.shift()); ) e.unsubscribe();
            throw n;
          }
        }),
        n
      );
    })(e8))(e7);
  function nn(e) {
    var n;
    return (n = e[e.length - 1]) && ex(n.schedule) ? e.pop() : void 0;
  }
  var nt = function (e) {
    return e && "number" == typeof e.length && "function" != typeof e;
  };
  function na(e) {
    return ex(null == e ? void 0 : e.then);
  }
  function nr(e) {
    return (
      Symbol.asyncIterator && ex(null == e ? void 0 : e[Symbol.asyncIterator])
    );
  }
  function ni(e) {
    return TypeError(
      "You provided " +
        (null !== e && "object" == typeof e
          ? "an invalid object"
          : "'" + e + "'") +
        " where a stream was expected. You can provide an Observable, Promise, ReadableStream, Array, AsyncIterable, or Iterable.",
    );
  }
  var no =
    "function" == typeof Symbol && Symbol.iterator
      ? Symbol.iterator
      : "@@iterator";
  function ns(e) {
    return ex(null == e ? void 0 : e[no]);
  }
  function nl(e) {
    return (function (e, n, t) {
      if (!Symbol.asyncIterator)
        throw TypeError("Symbol.asyncIterator is not defined.");
      var a,
        r = t.apply(e, n || []),
        i = [];
      return (
        (a = Object.create(
          ("function" == typeof AsyncIterator ? AsyncIterator : Object)
            .prototype,
        )),
        o("next"),
        o("throw"),
        o("return", function (e) {
          return function (n) {
            return Promise.resolve(n).then(e, c);
          };
        }),
        (a[Symbol.asyncIterator] = function () {
          return this;
        }),
        a
      );
      function o(e, n) {
        r[e] &&
          ((a[e] = function (n) {
            return new Promise(function (t, a) {
              i.push([e, n, t, a]) > 1 || s(e, n);
            });
          }),
          n && (a[e] = n(a[e])));
      }
      function s(e, n) {
        try {
          var t;
          (t = r[e](n)).value instanceof eO
            ? Promise.resolve(t.value.v).then(l, c)
            : u(i[0][2], t);
        } catch (e) {
          u(i[0][3], e);
        }
      }
      function l(e) {
        s("next", e);
      }
      function c(e) {
        s("throw", e);
      }
      function u(e, n) {
        (e(n), i.shift(), i.length && s(i[0][0], i[0][1]));
      }
    })(this, arguments, function () {
      var n, t, a;
      return eA(this, function (r) {
        switch (r.label) {
          case 0:
            ((n = e.getReader()), (r.label = 1));
          case 1:
            (r.trys.push([1, , 9, 10]), (r.label = 2));
          case 2:
            return [4, eO(n.read())];
          case 3:
            return (
              (a = (t = r.sent()).value),
              t.done ? [4, eO(void 0)] : [3, 5]
            );
          case 4:
            return [2, r.sent()];
          case 5:
            return [4, eO(a)];
          case 6:
            return [4, r.sent()];
          case 7:
            return (r.sent(), [3, 2]);
          case 8:
            return [3, 10];
          case 9:
            return (n.releaseLock(), [7]);
          case 10:
            return [2];
        }
      });
    });
  }
  function nc(e) {
    return ex(null == e ? void 0 : e.getReader);
  }
  function nu(e) {
    if (e instanceof eK) return e;
    if (null != e) {
      var n, t, a, r;
      if (ex(e[eq])) {
        return (
          (n = e),
          new eK(function (e) {
            var t = n[eq]();
            if (ex(t.subscribe)) return t.subscribe(e);
            throw TypeError(
              "Provided object does not correctly implement Symbol.observable",
            );
          })
        );
      }
      if (nt(e)) {
        return (
          (t = e),
          new eK(function (e) {
            for (var n = 0; n < t.length && !e.closed; n++) e.next(t[n]);
            e.complete();
          })
        );
      }
      if (na(e)) {
        return (
          (a = e),
          new eK(function (e) {
            a.then(
              function (n) {
                e.closed || (e.next(n), e.complete());
              },
              function (n) {
                return e.error(n);
              },
            ).then(null, eB);
          })
        );
      }
      if (nr(e)) return nd(e);
      if (ns(e)) {
        return (
          (r = e),
          new eK(function (e) {
            var n, t;
            try {
              for (var a = eN(r), i = a.next(); !i.done; i = a.next()) {
                var o = i.value;
                if ((e.next(o), e.closed)) return;
              }
            } catch (e) {
              n = { error: e };
            } finally {
              try {
                i && !i.done && (t = a.return) && t.call(a);
              } finally {
                if (n) throw n.error;
              }
            }
            e.complete();
          })
        );
      }
      if (nc(e)) return nd(nl(e));
    }
    throw ni(e);
  }
  function nd(e) {
    return new eK(function (n) {
      (function (e, n) {
        var t, a, r, i, o, s, l, c;
        return (
          (o = this),
          (s = void 0),
          (l = void 0),
          (c = function () {
            var o;
            return eA(this, function (s) {
              switch (s.label) {
                case 0:
                  (s.trys.push([0, 5, 6, 11]),
                    (t = (function (e) {
                      if (!Symbol.asyncIterator)
                        throw TypeError("Symbol.asyncIterator is not defined.");
                      var n,
                        t = e[Symbol.asyncIterator];
                      return t
                        ? t.call(e)
                        : ((e = eN(e)),
                          (n = {}),
                          a("next"),
                          a("throw"),
                          a("return"),
                          (n[Symbol.asyncIterator] = function () {
                            return this;
                          }),
                          n);
                      function a(t) {
                        n[t] =
                          e[t] &&
                          function (n) {
                            return new Promise(function (a, r) {
                              var i, o, s;
                              ((i = a),
                                (o = r),
                                (s = (n = e[t](n)).done),
                                Promise.resolve(n.value).then(function (e) {
                                  i({ value: e, done: s });
                                }, o));
                            });
                          };
                      }
                    })(e)),
                    (s.label = 1));
                case 1:
                  return [4, t.next()];
                case 2:
                  if ((a = s.sent()).done) return [3, 4];
                  if (((o = a.value), n.next(o), n.closed)) return [2];
                  s.label = 3;
                case 3:
                  return [3, 1];
                case 4:
                  return [3, 11];
                case 5:
                  return ((r = { error: s.sent() }), [3, 11]);
                case 6:
                  return (
                    s.trys.push([6, , 9, 10]),
                    a && !a.done && (i = t.return) ? [4, i.call(t)] : [3, 8]
                  );
                case 7:
                  (s.sent(), (s.label = 8));
                case 8:
                  return [3, 10];
                case 9:
                  if (r) throw r.error;
                  return [7];
                case 10:
                  return [7];
                case 11:
                  return (n.complete(), [2]);
              }
            });
          }),
          new (l || (l = Promise))(function (e, n) {
            function t(e) {
              try {
                r(c.next(e));
              } catch (e) {
                n(e);
              }
            }
            function a(e) {
              try {
                r(c.throw(e));
              } catch (e) {
                n(e);
              }
            }
            function r(n) {
              var r;
              n.done
                ? e(n.value)
                : ((r = n.value) instanceof l
                    ? r
                    : new l(function (e) {
                        e(r);
                      })
                  ).then(t, a);
            }
            r((c = c.apply(o, s || [])).next());
          })
        );
      })(e, n).catch(function (e) {
        return n.error(e);
      });
    });
  }
  function nm(e, n, t, a, r) {
    (void 0 === a && (a = 0), void 0 === r && (r = !1));
    var i = n.schedule(function () {
      (t(), r ? e.add(this.schedule(null, a)) : this.unsubscribe());
    }, a);
    if ((e.add(i), !r)) return i;
  }
  function np(e, n) {
    return (
      void 0 === n && (n = 0),
      eZ(function (t, a) {
        t.subscribe(
          eQ(
            a,
            function (t) {
              return nm(
                a,
                e,
                function () {
                  return a.next(t);
                },
                n,
              );
            },
            function () {
              return nm(
                a,
                e,
                function () {
                  return a.complete();
                },
                n,
              );
            },
            function (t) {
              return nm(
                a,
                e,
                function () {
                  return a.error(t);
                },
                n,
              );
            },
          ),
        );
      })
    );
  }
  function nf(e, n) {
    return (
      void 0 === n && (n = 0),
      eZ(function (t, a) {
        a.add(
          e.schedule(function () {
            return t.subscribe(a);
          }, n),
        );
      })
    );
  }
  function nh(e, n) {
    if (!e) throw Error("Iterable cannot be null");
    return new eK(function (t) {
      nm(t, n, function () {
        var a = e[Symbol.asyncIterator]();
        nm(
          t,
          n,
          function () {
            a.next().then(function (e) {
              e.done ? t.complete() : t.next(e.value);
            });
          },
          0,
          !0,
        );
      });
    });
  }
  function ng(e, n) {
    return n
      ? (function (e, n) {
          if (null != e) {
            if (ex(e[eq])) return nu(e).pipe(nf(n), np(n));
            if (nt(e))
              return new eK(function (t) {
                var a = 0;
                return n.schedule(function () {
                  a === e.length
                    ? t.complete()
                    : (t.next(e[a++]), t.closed || this.schedule());
                });
              });
            if (na(e)) return nu(e).pipe(nf(n), np(n));
            if (nr(e)) return nh(e, n);
            if (ns(e))
              return new eK(function (t) {
                var a;
                return (
                  nm(t, n, function () {
                    ((a = e[no]()),
                      nm(
                        t,
                        n,
                        function () {
                          var e, n, r;
                          try {
                            ((n = (e = a.next()).value), (r = e.done));
                          } catch (e) {
                            t.error(e);
                            return;
                          }
                          r ? t.complete() : t.next(n);
                        },
                        0,
                        !0,
                      ));
                  }),
                  function () {
                    return ex(null == a ? void 0 : a.return) && a.return();
                  }
                );
              });
            if (nc(e)) return nh(nl(e), n);
          }
          throw ni(e);
        })(e, n)
      : nu(e);
  }
  function nk() {
    for (var e = [], n = 0; n < arguments.length; n++) e[n] = arguments[n];
    var t = nn(e);
    return ng(e, t);
  }
  var nT = eC(function (e) {
    return function (n) {
      (void 0 === n && (n = null),
        e(this),
        (this.message = "Timeout has occurred"),
        (this.name = "TimeoutError"),
        (this.info = n));
    };
  });
  function nv(e) {
    throw new nT(e);
  }
  function ny(e, n) {
    return eZ(function (t, a) {
      var r = 0;
      t.subscribe(
        eQ(a, function (t) {
          a.next(e.call(n, t, r++));
        }),
      );
    });
  }
  var nb = Array.isArray;
  function nE(e, n, t) {
    return (
      void 0 === t && (t = 1 / 0),
      ex(n)
        ? nE(function (t, a) {
            return ny(function (e, r) {
              return n(t, e, a, r);
            })(nu(e(t, a)));
          }, t)
        : ("number" == typeof n && (t = n),
          eZ(function (n, a) {
            var r, i, o, s, l, c, u;
            return (
              (r = t),
              (i = []),
              (o = 0),
              (s = 0),
              (l = !1),
              (c = function () {
                !l || i.length || o || a.complete();
              }),
              (u = function (n) {
                o++;
                var t = !1;
                nu(e(n, s++)).subscribe(
                  eQ(
                    a,
                    function (e) {
                      a.next(e);
                    },
                    function () {
                      t = !0;
                    },
                    void 0,
                    function () {
                      if (t)
                        try {
                          for (o--; i.length && o < r; )
                            !(function () {
                              var e = i.shift();
                              u(e);
                            })();
                          c();
                        } catch (e) {
                          a.error(e);
                        }
                    },
                  ),
                );
              }),
              n.subscribe(
                eQ(
                  a,
                  function (e) {
                    return o < r ? u(e) : i.push(e);
                  },
                  function () {
                    ((l = !0), c());
                  },
                ),
              ),
              function () {}
            );
          }))
    );
  }
  function n_() {
    for (var e = [], n = 0; n < arguments.length; n++) e[n] = arguments[n];
    return nE(eY, 1)(ng(e, nn(e)));
  }
  var nS = ["addListener", "removeListener"],
    nw = ["addEventListener", "removeEventListener"],
    nI = ["on", "off"];
  function nA(e, n) {
    return function (t) {
      return function (a) {
        return e[t](n, a);
      };
    };
  }
  function nN(e, n) {
    return eZ(function (t, a) {
      var r = 0;
      t.subscribe(
        eQ(a, function (t) {
          return e.call(n, t, r++) && a.next(t);
        }),
      );
    });
  }
  function nR(e, n) {
    return e === n;
  }
  function nP(e, n) {
    var t;
    return eZ(
      ((t = arguments.length >= 2),
      function (a, r) {
        var i = t,
          o = n,
          s = 0;
        a.subscribe(
          eQ(
            r,
            function (n) {
              var t = s++;
              ((o = i ? e(o, n, t) : ((i = !0), n)), r.next(o));
            },
            void 0,
          ),
        );
      }),
    );
  }
  function nO(e, n) {
    for (var t = [], a = 2; a < arguments.length; a++) t[a - 2] = arguments[a];
    if (!0 === n) return void e();
    if (!1 !== n) {
      var r = new eJ({
        next: function () {
          (r.unsubscribe(), e());
        },
      });
      return nu(n.apply(void 0, eP([], eR(t)))).subscribe(r);
    }
  }
  function nx() {
    for (var e = [], n = 0; n < arguments.length; n++) e[n] = arguments[n];
    var t = nn(e);
    return eZ(function (n, a) {
      (t ? n_(e, n, t) : n_(e, n)).subscribe(a);
    });
  }
  function nC(e, n) {
    return eZ(function (t, a) {
      var r = null,
        i = 0,
        o = !1,
        s = function () {
          return o && !r && a.complete();
        };
      t.subscribe(
        eQ(
          a,
          function (t) {
            null == r || r.unsubscribe();
            var o = 0,
              l = i++;
            nu(e(t, l)).subscribe(
              (r = eQ(
                a,
                function (e) {
                  return a.next(n ? n(t, e, l, o++) : e);
                },
                function () {
                  ((r = null), s());
                },
              )),
            );
          },
          function () {
            ((o = !0), s());
          },
        ),
      );
    });
  }
  function nM(e) {
    return eZ(function (n, t) {
      (nu(e).subscribe(
        eQ(
          t,
          function () {
            return t.complete();
          },
          e$,
        ),
      ),
        t.closed || n.subscribe(t));
    });
  }
  var nD = Object.defineProperty,
    nL = Object.defineProperties,
    nU = Object.getOwnPropertyDescriptors,
    nF = Object.getOwnPropertySymbols,
    nj = Object.prototype.hasOwnProperty,
    nV = Object.prototype.propertyIsEnumerable,
    nH = (e, n, t) =>
      n in e
        ? nD(e, n, { enumerable: !0, configurable: !0, writable: !0, value: t })
        : (e[n] = t),
    nB = (e, n) => {
      for (var t in n || (n = {})) nj.call(n, t) && nH(e, t, n[t]);
      if (nF) for (var t of nF(n)) nV.call(n, t) && nH(e, t, n[t]);
      return e;
    },
    n$ = (e, n, t) =>
      new Promise((a, r) => {
        var i = (e) => {
            try {
              s(t.next(e));
            } catch (e) {
              r(e);
            }
          },
          o = (e) => {
            try {
              s(t.throw(e));
            } catch (e) {
              r(e);
            }
          },
          s = (e) =>
            e.done ? a(e.value) : Promise.resolve(e.value).then(i, o);
        s((t = t.apply(e, n)).next());
      });
  function nG(e) {
    var n, t, a;
    return (
      !(typeof e > "u") &&
      ((!!(n = e) &&
        n.hasOwnProperty("participant") &&
        n.hasOwnProperty("source") &&
        n.hasOwnProperty("track") &&
        "u" > typeof (null == (t = n.publication) ? void 0 : t.track)) ||
        (!!(a = e) &&
          a.hasOwnProperty("participant") &&
          a.hasOwnProperty("source") &&
          a.hasOwnProperty("publication") &&
          "u" > typeof a.publication))
    );
  }
  function nW(e) {
    return (
      !!e &&
      e.hasOwnProperty("participant") &&
      e.hasOwnProperty("source") &&
      typeof e.publication > "u"
    );
  }
  function nJ(e) {
    if ("string" == typeof e || "number" == typeof e) return `${e}`;
    if (nW(e)) return `${e.participant.identity}_${e.source}_placeholder`;
    if (nG(e))
      return `${e.participant.identity}_${e.publication.source}_${e.publication.trackSid}`;
    throw Error(`Can't generate a id for the given track reference: ${e}`);
  }
  var nz =
      "[^\\.\\s@:](?:[^\\s@:]*[^\\s@:\\.])?@[^\\.\\s@]+(?:\\.[^\\.\\s@]+)*",
    nq = [
      r.RoomEvent.ConnectionStateChanged,
      r.RoomEvent.RoomMetadataChanged,
      r.RoomEvent.ActiveSpeakersChanged,
      r.RoomEvent.ConnectionQualityChanged,
      r.RoomEvent.ParticipantConnected,
      r.RoomEvent.ParticipantDisconnected,
      r.RoomEvent.ParticipantPermissionsChanged,
      r.RoomEvent.ParticipantMetadataChanged,
      r.RoomEvent.ParticipantNameChanged,
      r.RoomEvent.ParticipantAttributesChanged,
      r.RoomEvent.TrackMuted,
      r.RoomEvent.TrackUnmuted,
      r.RoomEvent.TrackPublished,
      r.RoomEvent.TrackUnpublished,
      r.RoomEvent.TrackStreamStateChanged,
      r.RoomEvent.TrackSubscriptionFailed,
      r.RoomEvent.TrackSubscriptionPermissionChanged,
      r.RoomEvent.TrackSubscriptionStatusChanged,
      r.RoomEvent.LocalTrackPublished,
      r.RoomEvent.LocalTrackUnpublished,
    ],
    nY = [
      r.ParticipantEvent.TrackPublished,
      r.ParticipantEvent.TrackUnpublished,
      r.ParticipantEvent.TrackMuted,
      r.ParticipantEvent.TrackUnmuted,
      r.ParticipantEvent.TrackStreamStateChanged,
      r.ParticipantEvent.TrackSubscribed,
      r.ParticipantEvent.TrackUnsubscribed,
      r.ParticipantEvent.TrackSubscriptionPermissionChanged,
      r.ParticipantEvent.TrackSubscriptionFailed,
      r.ParticipantEvent.LocalTrackPublished,
      r.ParticipantEvent.LocalTrackUnpublished,
    ],
    nK = [
      r.ParticipantEvent.ConnectionQualityChanged,
      r.ParticipantEvent.IsSpeakingChanged,
      r.ParticipantEvent.ParticipantMetadataChanged,
      r.ParticipantEvent.ParticipantPermissionsChanged,
      r.ParticipantEvent.TrackMuted,
      r.ParticipantEvent.TrackUnmuted,
      r.ParticipantEvent.TrackPublished,
      r.ParticipantEvent.TrackUnpublished,
      r.ParticipantEvent.TrackStreamStateChanged,
      r.ParticipantEvent.TrackSubscriptionFailed,
      r.ParticipantEvent.TrackSubscriptionPermissionChanged,
      r.ParticipantEvent.TrackSubscriptionStatusChanged,
      r.ParticipantEvent.LocalTrackPublished,
      r.ParticipantEvent.LocalTrackUnpublished,
    ],
    nX = eS.getLogger("lk-components-js");
  nX.setDefaultLevel("WARN");
  var nZ =
      (((n = nZ || {}).AgentState = "lk.agent.state"),
      (n.PublishOnBehalf = "lk.publish_on_behalf"),
      (n.TranscriptionFinal = "lk.transcription_final"),
      (n.TranscriptionSegmentId = "lk.segment_id"),
      (n.TranscribedTrackId = "lk.transcribed_track_id"),
      n),
    nQ = [],
    n0 = { showChat: !1, unreadMessages: 0, showSettings: !1 };
  function n1(e) {
    return "object" == typeof e;
  }
  function n5(e, n) {
    return n.audioLevel - e.audioLevel;
  }
  function n2(e, n) {
    return e.isSpeaking === n.isSpeaking ? 0 : e.isSpeaking ? -1 : 1;
  }
  function n3(e, n) {
    var t, a, r, i;
    return void 0 !== e.lastSpokeAt || void 0 !== n.lastSpokeAt
      ? (null != (a = null == (t = n.lastSpokeAt) ? void 0 : t.getTime())
          ? a
          : 0) -
          (null != (i = null == (r = e.lastSpokeAt) ? void 0 : r.getTime())
            ? i
            : 0)
      : 0;
  }
  function n9(e, n) {
    var t, a, r, i;
    return (
      (null != (a = null == (t = e.joinedAt) ? void 0 : t.getTime()) ? a : 0) -
      (null != (i = null == (r = n.joinedAt) ? void 0 : r.getTime()) ? i : 0)
    );
  }
  function n4(e, n) {
    return Array(Math.max(e.length, n.length))
      .fill([])
      .map((t, a) => [e[a], n[a]]);
  }
  function n6(e, n, t) {
    return e.filter((e) => !n.map((e) => t(e)).includes(t(e)));
  }
  function n7(e) {
    return e.map((e) =>
      "string" == typeof e || "number" == typeof e ? `${e}` : nJ(e),
    );
  }
  function n8(e, n) {
    let t = n.findIndex((n) => nJ(n) === nJ(e));
    if (-1 === t)
      throw Error(`Element not part of the array: ${nJ(e)} not in ${n7(n)}`);
    return t;
  }
  function te(e, n) {
    return e.reduce(
      (e, t, a) =>
        a % n == 0 ? [...e, [t]] : [...e.slice(0, -1), [...e.slice(-1)[0], t]],
      [],
    );
  }
  function tn(e) {
    return `lk-${e}`;
  }
  function tt(e) {
    if (nG(e)) return e.publication;
    {
      let { source: n, name: t, participant: a } = e;
      if (n && t)
        return a
          .getTrackPublications()
          .find((e) => e.source === n && e.trackName === t);
      if (t) return a.getTrackPublicationByName(t);
      if (n) return a.getTrackPublication(n);
      throw Error("At least one of source and name needs to be defined");
    }
  }
  function ta(e, ...n) {
    return new eK((t) => {
      let a = () => {
        t.next(e);
      };
      return (
        n.forEach((n) => {
          e.on(n, a);
        }),
        () => {
          n.forEach((n) => {
            e.off(n, a);
          });
        }
      );
    }).pipe(nx(e));
  }
  function tr(e, n) {
    return new eK((t) => {
      let a = (...e) => {
        t.next(e);
      };
      return (
        e.on(n, a),
        () => {
          e.off(n, a);
        }
      );
    });
  }
  function ti(e) {
    return ta(e, r.RoomEvent.AudioPlaybackStatusChanged).pipe(
      ny((e) => ({ canPlayAudio: e.canPlaybackAudio })),
    );
  }
  function to(e) {
    return ta(e, r.RoomEvent.VideoPlaybackStatusChanged).pipe(
      ny((e) => ({ canPlayVideo: e.canPlaybackVideo })),
    );
  }
  function ts(e, ...n) {
    return new eK((t) => {
      let a = () => {
        t.next(e);
      };
      return (
        n.forEach((n) => {
          e.on(n, a);
        }),
        () => {
          n.forEach((n) => {
            e.off(n, a);
          });
        }
      );
    }).pipe(nx(e));
  }
  function tl(e) {
    return ts(
      e,
      r.ParticipantEvent.TrackMuted,
      r.ParticipantEvent.TrackUnmuted,
      r.ParticipantEvent.ParticipantPermissionsChanged,
      r.ParticipantEvent.TrackPublished,
      r.ParticipantEvent.TrackUnpublished,
      r.ParticipantEvent.LocalTrackPublished,
      r.ParticipantEvent.LocalTrackUnpublished,
      r.ParticipantEvent.MediaDevicesError,
      r.ParticipantEvent.TrackSubscriptionStatusChanged,
    ).pipe(
      ny((e) => {
        let {
            isMicrophoneEnabled: n,
            isCameraEnabled: t,
            isScreenShareEnabled: a,
          } = e,
          i = e.getTrackPublication(r.Track.Source.Microphone);
        return {
          isCameraEnabled: t,
          isMicrophoneEnabled: n,
          isScreenShareEnabled: a,
          cameraTrack: e.getTrackPublication(r.Track.Source.Camera),
          microphoneTrack: i,
          participant: e,
        };
      }),
    );
  }
  function tc(e) {
    return e
      ? ts(
          e,
          r.ParticipantEvent.ParticipantMetadataChanged,
          r.ParticipantEvent.ParticipantNameChanged,
        ).pipe(
          ny(({ name: e, identity: n, metadata: t }) => ({
            name: e,
            identity: n,
            metadata: t,
          })),
          nx({ name: e.name, identity: e.identity, metadata: e.metadata }),
        )
      : void 0;
  }
  function tu(e, n) {
    return new eK((t) => {
      let a = (...e) => {
        t.next(e);
      };
      return (
        e.on(n, a),
        () => {
          e.off(n, a);
        }
      );
    });
  }
  function td(e) {
    var n, t, a, i;
    return ts(
      e.participant,
      r.ParticipantEvent.TrackMuted,
      r.ParticipantEvent.TrackUnmuted,
      r.ParticipantEvent.TrackSubscribed,
      r.ParticipantEvent.TrackUnsubscribed,
      r.ParticipantEvent.LocalTrackPublished,
      r.ParticipantEvent.LocalTrackUnpublished,
    ).pipe(
      ny((n) => {
        var t, a;
        let r =
          null != (t = e.publication) ? t : n.getTrackPublication(e.source);
        return null == (a = null == r ? void 0 : r.isMuted) || a;
      }),
      nx(
        null ==
          (i =
            null != (a = null == (n = e.publication) ? void 0 : n.isMuted)
              ? a
              : null == (t = e.participant.getTrackPublication(e.source))
                ? void 0
                : t.isMuted) || i,
      ),
    );
  }
  var tm = { CHAT: "lk.chat", TRANSCRIPTION: "lk.transcription" };
  function tp(e, n) {
    return n$(this, arguments, function* (e, n, t = {}) {
      let { reliable: a, destinationIdentities: r, topic: i } = t;
      yield e.publishData(n, {
        destinationIdentities: r,
        topic: i,
        reliable: a,
      });
    });
  }
  function tf(e, n, t) {
    let a,
      i = Array.isArray(n) ? n : [n];
    return {
      messageObservable: tr(e, r.RoomEvent.DataReceived).pipe(
        nN(([, , , e]) => void 0 === n || (void 0 !== e && i.includes(e))),
        ny(([e, n, , a]) => {
          let r = { payload: e, topic: a, from: n };
          return (null == t || t(r), r);
        }),
      ),
      isSendingObservable: new eK((e) => {
        a = e;
      }),
      send: (n, ...t) =>
        n$(this, [n, ...t], function* (n, t = {}) {
          a.next(!0);
          try {
            yield tp(e.localParticipant, n, nB({ topic: i[0] }, t));
          } finally {
            a.next(!1);
          }
        }),
    };
  }
  var th = new WeakMap(),
    tg = (e) => JSON.parse(new TextDecoder().decode(e)),
    tk = (e) => new TextEncoder().encode(JSON.stringify(e));
  function tT(e, n, t = !0) {
    let a = [e.localParticipant, ...Array.from(e.remoteParticipants.values())],
      r = [];
    return (
      a.forEach((e) => {
        n.forEach((n) => {
          let a = Array.from(e.trackPublications.values())
            .filter((e) => e.source === n && (!t || e.track))
            .map((n) => ({ participant: e, publication: n, source: n.source }));
          r.push(...a);
        });
      }),
      { trackReferences: r, participants: a }
    );
  }
  function tv(e, n, t = !1) {
    let { sources: a, kind: r, name: i } = n;
    return Array.from(e.trackPublications.values())
      .filter(
        (e) =>
          (!a || a.includes(e.source)) &&
          (!r || e.kind === r) &&
          (!i || e.trackName === i) &&
          (!t || e.track),
      )
      .map((n) => ({ participant: e, publication: n, source: n.source }));
  }
  function ty(e, n) {
    return new eK((t) => {
      let a = (...e) => {
        t.next(e);
      };
      return (
        e.on(n, a),
        () => {
          e.off(n, a);
        }
      );
    });
  }
  var { load: tb, save: tE } =
      ((a = "lk-user-choices"),
      {
        load: () =>
          (function (e) {
            if (typeof localStorage > "u")
              return void nX.error("Local storage is not available.");
            try {
              let n = localStorage.getItem(e);
              if (!n)
                return void nX.warn(
                  `Item with key ${e} does not exist in local storage.`,
                );
              return JSON.parse(n);
            } catch (e) {
              nX.error(`Error getting item from local storage: ${e}`);
              return;
            }
          })(a),
        save: (e) =>
          (function (e, n) {
            if (typeof localStorage > "u")
              return void nX.error("Local storage is not available.");
            try {
              if (n) {
                let t = Object.fromEntries(
                  Object.entries(n).filter(([, e]) => "" !== e),
                );
                localStorage.setItem(e, JSON.stringify(t));
              }
            } catch (e) {
              nX.error(`Error setting item to local storage: ${e}`);
            }
          })(a, e),
      }),
    t_ = null,
    tS = null,
    tw = 0;
  function tI() {
    return (t_ || (t_ = new Map()), t_);
  }
  function tA(e, n) {
    if ("show_chat" === n.msg) return { ...e, showChat: !0, unreadMessages: 0 };
    if ("hide_chat" === n.msg) return { ...e, showChat: !1 };
    if ("toggle_chat" !== n.msg)
      return "unread_msg" === n.msg
        ? { ...e, unreadMessages: n.count }
        : "toggle_settings" === n.msg
          ? { ...e, showSettings: !e.showSettings }
          : { ...e };
    {
      let n = { ...e, showChat: !e.showChat };
      return (!0 === n.showChat && (n.unreadMessages = 0), n);
    }
  }
  function tN(e, n) {
    return "set_pin" === n.msg
      ? [n.trackReference]
      : "clear_pin" === n.msg
        ? []
        : { ...e };
  }
  let tR = i.createContext(void 0);
  function tP() {
    return i.useContext(tR);
  }
  let tO = i.createContext(void 0);
  function tx() {
    return i.useContext(tO);
  }
  let tC = i.createContext(void 0);
  function tM() {
    return i.useContext(tC);
  }
  let tD = i.createContext(void 0);
  function tL() {
    return i.useContext(tD);
  }
  let tU = i.createContext(void 0);
  function tF() {
    return i.useContext(tU);
  }
  let tj = i.createContext(void 0);
  e.s([
    "$",
    0,
    function (e, n = !1) {
      !0 !== n && tE(e);
    },
    "A",
    0,
    function (e, n, t) {
      var a, r;
      let i =
        ((a = e),
        (r = n),
        a.map(
          (e) =>
            r.find(
              (n) =>
                nJ(e) === nJ(n) ||
                ("number" != typeof e &&
                  nW(e) &&
                  nG(n) &&
                  nW(e) &&
                  nG(n) &&
                  n.participant.identity === e.participant.identity &&
                  n.source === e.source),
            ) ?? e,
        ));
      if (i.length < n.length) {
        let e = n6(n, i, nJ);
        i = [...i, ...e];
      }
      if (
        (n4(te(i, t), te(n, t)).forEach(([e, n], a) => {
          if (e && n) {
            var r;
            let o = {
              dropped: n6((r = te(i, t)[a]), n, nJ),
              added: n6(n, r, nJ),
            };
            (0 !== o.added.length || 0 !== o.dropped.length) &&
              (nX.debug(
                `Detected visual changes on page: ${a}, current: ${n7(e)}, next: ${n7(n)}`,
                { changes: o },
              ),
              o.added.length === o.dropped.length &&
                n4(o.added, o.dropped).forEach(([e, n]) => {
                  if (e && n) {
                    var t;
                    let a, r;
                    ((a = n8(e, (t = i))),
                      (r = n8(n, t)),
                      t.splice(a, 1, n),
                      t.splice(r, 1, e),
                      (i = t));
                  } else
                    throw Error(
                      `For a swap action we need a addition and a removal one is missing: ${e}, ${n}`,
                    );
                }),
              0 === o.added.length &&
                o.dropped.length > 0 &&
                o.dropped.forEach((e) => {
                  var n;
                  let t;
                  ((t = n8(e, (n = i))), n.splice(t, 1), (i = n));
                }),
              o.added.length > 0 &&
                0 === o.dropped.length &&
                o.added.forEach((e) => {
                  i = [...i, e];
                }));
          }
        }),
        i.length > n.length)
      ) {
        let e = n6(i, n, nJ);
        i = i.filter((n) => !e.map(nJ).includes(nJ(n)));
      }
      return i;
    },
    "B",
    0,
    tM,
    "C",
    0,
    tc,
    "D",
    0,
    function () {
      return { className: tn("participant-tile") };
    },
    "E",
    0,
    function (e, n = {}) {
      var t;
      let a,
        i = new eK((e) => ((a = e), () => s.unsubscribe())).pipe(
          nx(Array.from(e.remoteParticipants.values())),
        ),
        o = null != (t = n.additionalRoomEvents) ? t : nq,
        s = ta(
          e,
          ...Array.from(
            new Set([
              r.RoomEvent.ParticipantConnected,
              r.RoomEvent.ParticipantDisconnected,
              r.RoomEvent.ConnectionStateChanged,
              ...o,
            ]),
          ),
        ).subscribe((e) =>
          null == a
            ? void 0
            : a.next(Array.from(e.remoteParticipants.values())),
        );
      return (
        e.remoteParticipants.size > 0 &&
          (null == a || a.next(Array.from(e.remoteParticipants.values()))),
        i
      );
    },
    "F",
    0,
    function (e) {
      let n = tP();
      if ((e ?? (e = n), !e))
        throw Error(
          "Tried to access LayoutContext context outside a LayoutContextProvider provider.",
        );
      return e;
    },
    "G",
    0,
    [
      { columns: 1, rows: 1 },
      { columns: 1, rows: 2, orientation: "portrait" },
      { columns: 2, rows: 1, orientation: "landscape" },
      { columns: 2, rows: 2, minWidth: 560 },
      { columns: 3, rows: 3, minWidth: 700 },
      { columns: 4, rows: 4, minWidth: 960 },
      { columns: 5, rows: 5, minWidth: 1100 },
    ],
    "H",
    0,
    function (e, n, t = {}) {
      var a;
      let i = null != (a = t.additionalEvents) ? a : nK;
      return ta(
        e,
        r.RoomEvent.ParticipantConnected,
        r.RoomEvent.ParticipantDisconnected,
        r.RoomEvent.ConnectionStateChanged,
      ).pipe(
        nC((e) => {
          let t = e.getParticipantByIdentity(n);
          return t ? ts(t, ...i) : new eK((e) => e.next(void 0));
        }),
        nx(e.getParticipantByIdentity(n)),
      );
    },
    "I",
    0,
    function (e, { kind: n, identity: t }, a = {}) {
      var i;
      let o = null != (i = a.additionalEvents) ? i : nK,
        s = (e) => {
          let a = !0;
          return (
            n && (a = a && e.kind === n),
            t && (a = a && e.identity === t),
            a
          );
        };
      return ta(
        e,
        r.RoomEvent.ParticipantConnected,
        r.RoomEvent.ParticipantDisconnected,
        r.RoomEvent.ConnectionStateChanged,
      ).pipe(
        nC((e) => {
          let n = Array.from(e.remoteParticipants.values()).find((e) => s(e));
          return n ? ts(n, ...o) : new eK((e) => e.next(void 0));
        }),
        nx(Array.from(e.remoteParticipants.values()).find((e) => s(e))),
      );
    },
    "J",
    0,
    function (e) {
      return ta(
        e,
        r.RoomEvent.RoomMetadataChanged,
        r.RoomEvent.ConnectionStateChanged,
      ).pipe(ny((e) => ({ name: e.name, metadata: e.metadata })));
    },
    "K",
    0,
    function (e) {
      return tr(e, r.RoomEvent.ActiveSpeakersChanged).pipe(ny(([e]) => e));
    },
    "L",
    0,
    tj,
    "M",
    0,
    function (e) {
      let n = [...e];
      n.sort((e, n) => {
        if (e.isSpeaking && n.isSpeaking) return n5(e, n);
        if (e.isSpeaking !== n.isSpeaking) return n2(e, n);
        if (e.lastSpokeAt !== n.lastSpokeAt) return n3(e, n);
        let t = e.videoTrackPublications.size > 0;
        return t !== n.videoTrackPublications.size > 0
          ? t
            ? -1
            : 1
          : n9(e, n);
      });
      let t = n.find((e) => e.isLocal);
      if (t) {
        let e = n.indexOf(t);
        e >= 0 &&
          (n.splice(e, 1), n.length > 0 ? n.splice(0, 0, t) : n.push(t));
      }
      return n;
    },
    "N",
    0,
    function () {
      let e = (e) =>
        n$(this, null, function* () {
          (nX.info("Start Audio for room: ", e), yield e.startAudio());
        });
      return {
        className: tn("start-audio-button"),
        roomAudioPlaybackAllowedObservable: ti,
        handleStartAudioPlayback: e,
      };
    },
    "O",
    0,
    function () {
      let e = (e) =>
        n$(this, null, function* () {
          (nX.info("Start Video for room: ", e), yield e.startVideo());
        });
      return {
        className: tn("start-audio-button"),
        roomVideoPlaybackAllowedObservable: to,
        handleStartVideoPlayback: e,
      };
    },
    "P",
    0,
    function () {
      return { className: [tn("button"), tn("chat-toggle")].join(" ") };
    },
    "Q",
    0,
    function (e) {
      let n = "track-muted-indicator-camera";
      switch (e.source) {
        case r.Track.Source.Camera:
          n = "track-muted-indicator-camera";
          break;
        case r.Track.Source.Microphone:
          n = "track-muted-indicator-microphone";
      }
      return { className: tn(n), mediaMutedObserver: td(e) };
    },
    "R",
    0,
    tD,
    "S",
    0,
    function (e, n, t, a, i) {
      let { localParticipant: o } = n,
        s = (e, n) => {
          let t = !1;
          switch (e) {
            case r.Track.Source.Camera:
              t = n.isCameraEnabled;
              break;
            case r.Track.Source.Microphone:
              t = n.isMicrophoneEnabled;
              break;
            case r.Track.Source.ScreenShare:
              t = n.isScreenShareEnabled;
          }
          return t;
        },
        l = tl(o).pipe(
          ny((n) => s(e, n.participant)),
          nx(s(e, o)),
        ),
        c = new e5(),
        u = (n, s) =>
          n$(this, null, function* () {
            try {
              switch ((s ?? (s = t), c.next(!0), e)) {
                case r.Track.Source.Camera:
                  return (
                    yield o.setCameraEnabled(n ?? !o.isCameraEnabled, s, a),
                    o.isCameraEnabled
                  );
                case r.Track.Source.Microphone:
                  return (
                    yield o.setMicrophoneEnabled(
                      n ?? !o.isMicrophoneEnabled,
                      s,
                      a,
                    ),
                    o.isMicrophoneEnabled
                  );
                case r.Track.Source.ScreenShare:
                  return (
                    yield o.setScreenShareEnabled(
                      n ?? !o.isScreenShareEnabled,
                      s,
                      a,
                    ),
                    o.isScreenShareEnabled
                  );
                default:
                  throw TypeError("Tried to toggle unsupported source");
              }
            } catch (e) {
              if (i && e instanceof Error) {
                null == i || i(e);
                return;
              }
              throw e;
            } finally {
              c.next(!1);
            }
          });
      return {
        className: tn("button"),
        toggle: u,
        enabledObserver: l,
        pendingObserver: c.asObservable(),
      };
    },
    "T",
    0,
    function () {
      let e = !1,
        n = new e5(),
        t = new e5(),
        a = (a) =>
          n$(this, null, function* () {
            (t.next(!0), (e = a ?? !e), n.next(e), t.next(!1));
          });
      return {
        className: tn("button"),
        toggle: a,
        enabledObserver: n.asObservable(),
        pendingObserver: t.asObservable(),
      };
    },
    "U",
    0,
    n1,
    "V",
    0,
    function (e, n, t) {
      var a, i;
      let o = null != (a = t.additionalRoomEvents) ? a : nq,
        s = null == (i = t.onlySubscribed) || i;
      return ta(
        e,
        ...Array.from(
          new Set([
            r.RoomEvent.ParticipantConnected,
            r.RoomEvent.ParticipantDisconnected,
            r.RoomEvent.ConnectionStateChanged,
            r.RoomEvent.LocalTrackPublished,
            r.RoomEvent.LocalTrackUnpublished,
            r.RoomEvent.TrackPublished,
            r.RoomEvent.TrackUnpublished,
            r.RoomEvent.TrackSubscriptionStatusChanged,
            ...o,
          ]).values(),
        ),
      ).pipe(
        ny((e) => {
          let t = tT(e, n, s);
          return (
            nX.debug(
              `TrackReference[] was updated. (length ${t.trackReferences.length})`,
              t,
            ),
            t
          );
        }),
        nx(tT(e, n, s)),
      );
    },
    "W",
    0,
    function (e) {
      return Array.isArray(e) && e.filter(n1).length > 0;
    },
    "X",
    0,
    tt,
    "Y",
    0,
    function (e) {
      let n = tt(e),
        t = tl(e.participant).pipe(
          ny(() => tt(e)),
          nx(n),
        );
      return {
        className: tn(
          e.source === r.Track.Source.Camera ||
            e.source === r.Track.Source.ScreenShare
            ? "participant-media-video"
            : "participant-media-audio",
        ),
        trackObserver: t,
      };
    },
    "Z",
    0,
    function (e, n) {
      var t, a, i, o, s, l;
      let c = new e5(),
        u = null != (t = null == n ? void 0 : n.channelTopic) ? t : tm.CHAT,
        d =
          null != (a = null == n ? void 0 : n.channelTopic)
            ? a
            : "lk-chat-topic",
        m = !1;
      th.has(e) || (m = !0);
      let p = null != (i = th.get(e)) ? i : new Map(),
        f = null != (o = p.get(u)) ? o : new e5();
      (p.set(u, f), th.set(e, p));
      let h = null != (s = null == n ? void 0 : n.messageDecoder) ? s : tg;
      if (m) {
        e.registerTextStreamHandler(u, (n, t) =>
          n$(this, null, function* () {
            let { id: a, timestamp: r } = n.info;
            ng(n)
              .pipe(
                nP((e, n) => e + n),
                ny((n) => ({
                  id: a,
                  timestamp: r,
                  message: n,
                  from: e.getParticipantByIdentity(t.identity),
                  type: "chatMessage",
                })),
              )
              .subscribe({ next: (e) => f.next(e) });
          }),
        );
        let { messageObservable: n } = tf(e, [d]);
        n.pipe(
          ny((e) => {
            let n = h(e.payload);
            return !0 == n.ignoreLegacy
              ? void 0
              : nL(nB({}, n), nU({ type: "chatMessage", from: e.from }));
          }),
          nN((e) => !!e),
          nM(c),
        ).subscribe(f);
      }
      let g = f.pipe(
          nP((e, n) => {
            if (
              "id" in n &&
              e.find((e) => {
                var t, a;
                return (
                  (null == (t = e.from) ? void 0 : t.identity) ===
                    (null == (a = n.from) ? void 0 : a.identity) &&
                  e.id === n.id
                );
              })
            ) {
              let t = e.findIndex((e) => e.id === n.id);
              if (t > -1) {
                let a = e[t];
                e[t] = nL(
                  nB({}, n),
                  nU({ timestamp: a.timestamp, editTimestamp: n.timestamp }),
                );
              }
              return [...e];
            }
            return [...e, n];
          }, []),
          nM(c),
        ),
        k = new e3(!1),
        T = null != (l = null == n ? void 0 : n.messageEncoder) ? l : tk,
        v = (n, t) =>
          n$(this, null, function* () {
            var a, i, o;
            (t || (t = {}), null != t.topic || (t.topic = u), k.next(!0));
            try {
              let s,
                l,
                c,
                u,
                m,
                p,
                h = {
                  id: (yield e.localParticipant.sendText(n, t)).id,
                  timestamp: Date.now(),
                  message: n,
                },
                g =
                  ((s = nB({}, h)),
                  (l = { attachedFiles: t.attachments }),
                  nL(s, nU(l))),
                k =
                  ((c = nB({}, g)),
                  (u = {
                    type: "chatMessage",
                    from: e.localParticipant,
                    attributes: t.attributes,
                  }),
                  nL(c, nU(u)));
              f.next(k);
              let v = T(
                ((m = nB({}, h)),
                (p = {
                  ignoreLegacy:
                    (null == (a = e.serverInfo) ? void 0 : a.edition) === 1 ||
                    (!!(null != (i = e.serverInfo) && i.version) &&
                      (0, r.compareVersions)(
                        null == (o = e.serverInfo) ? void 0 : o.version,
                        "1.8.2",
                      ) > 0),
                }),
                nL(m, nU(p))),
              );
              try {
                yield tp(e.localParticipant, v, { reliable: !0, topic: d });
              } catch (e) {
                nX.info("could not send message in legacy chat format", e);
              }
              return k;
            } finally {
              k.next(!1);
            }
          });
      return (
        e.once(r.RoomEvent.Disconnected, function () {
          (c.next(),
            c.complete(),
            f.complete(),
            th.delete(e),
            e.unregisterTextStreamHandler(u));
        }),
        { messageObservable: g, isSendingObservable: k, send: v }
      );
    },
    "_",
    0,
    function (e, n = !1) {
      var t, a, r, i, o;
      let s = {
        videoEnabled: null == (t = null == e ? void 0 : e.videoEnabled) || t,
        audioEnabled: null == (a = null == e ? void 0 : e.audioEnabled) || a,
        videoDeviceId:
          null != (r = null == e ? void 0 : e.videoDeviceId) ? r : "default",
        audioDeviceId:
          null != (i = null == e ? void 0 : e.audioDeviceId) ? i : "default",
        username: null != (o = null == e ? void 0 : e.username) ? o : "",
      };
      if (n) return s;
      {
        let e = tb();
        return nB(nB({}, s), e ?? {});
      }
    },
    "a",
    0,
    function () {
      let e = i.useContext(tR);
      if (!e)
        throw Error(
          "Tried to access LayoutContext context outside a LayoutContextProvider provider.",
        );
      return e;
    },
    "a0",
    0,
    function (e, n) {
      return tr(e, r.RoomEvent.ParticipantEncryptionStatusChanged).pipe(
        nN(
          ([, t]) =>
            (null == n ? void 0 : n.identity) ===
              (null == t ? void 0 : t.identity) ||
            (!t &&
              (null == n ? void 0 : n.identity) ===
                e.localParticipant.identity),
        ),
        ny(([e]) => e),
        nx(
          null != n && n.isLocal
            ? n.isE2EEEnabled
            : !!(null != n && n.isEncrypted),
        ),
      );
    },
    "a1",
    0,
    nG,
    "a2",
    0,
    function (e, n) {
      return ts(e, ...nY).pipe(
        ny((e) => {
          let t = tv(e, n);
          return (
            nX.debug(`TrackReference[] was updated. (length ${t.length})`, t),
            t
          );
        }),
        nx(tv(e, n)),
      );
    },
    "a3",
    0,
    function (e) {
      return ty(e, r.TrackEvent.TimeSyncUpdate).pipe(ny(([e]) => e));
    },
    "a4",
    0,
    function (e) {
      return ty(e, r.TrackEvent.TranscriptionReceived);
    },
    "a5",
    0,
    function (e, n, t) {
      return [...e, ...n]
        .reduceRight(
          (e, n) => (e.find((e) => e.id === n.id) || e.unshift(n), e),
          [],
        )
        .slice(0 - t);
    },
    "a6",
    0,
    function (e, n) {
      var t;
      return nL(
        nB({}, e),
        nU({
          receivedAtMediaTimestamp: null != (t = n.rtpTimestamp) ? t : 0,
          receivedAt: n.timestamp,
        }),
      );
    },
    "a7",
    0,
    function (e) {
      return typeof e > "u"
        ? new eK()
        : tu(e, r.ParticipantEvent.AttributesChanged).pipe(
            ny(([n]) => ({ changed: n, attributes: e.attributes })),
            nx({ changed: e.attributes, attributes: e.attributes }),
          );
    },
    "a8",
    0,
    nZ,
    "a9",
    0,
    function (e) {
      return tr(e, r.RoomEvent.RecordingStatusChanged).pipe(
        ny(([e]) => e),
        nx(e.isRecording),
      );
    },
    "aa",
    0,
    function (e, n) {
      var t, a, i, o, s, l, c, u, d, m, p;
      let f,
        h,
        g =
          (tS || (tS = new WeakMap()),
          (h = (f = tS).get(e)) || ((h = `room_${tw++}`), f.set(e, h)),
          `${h}:${n}`),
        k = tI(),
        T = k.get(g);
      if (T) return T;
      let v = new e5(),
        y = [],
        b = "lk.segment_id",
        E = v.pipe(
          (a = ex(
            (t = {
              subscribe: () => {
                e.registerTextStreamHandler(n, (e, n) =>
                  n$(this, null, function* () {
                    var t;
                    let a = ng(e).pipe(nP((e, n) => e + n, "")),
                      r = !!(null != (t = e.info.attributes) && t[b]);
                    a.subscribe((t) => {
                      let a = y.findIndex((n) => {
                        var t, a;
                        return (
                          n.streamInfo.id === e.info.id ||
                          (r &&
                            (null == (t = n.streamInfo.attributes)
                              ? void 0
                              : t[b]) ===
                              (null == (a = e.info.attributes) ? void 0 : a[b]))
                        );
                      });
                      (-1 !== a
                        ? (y[a] = nL(nB({}, y[a]), nU({ text: t })))
                        : y.push({
                            text: t,
                            participantInfo: n,
                            streamInfo: e.info,
                          }),
                        v.next([...y]));
                    });
                  }),
                );
              },
              finalize: () => {
                e.unregisterTextStreamHandler(n);
              },
            }),
          )
            ? { next: t, error: void 0, complete: void 0 }
            : t)
            ? eZ(function (e, n) {
                null == (t = a.subscribe) || t.call(a);
                var t,
                  r = !0;
                e.subscribe(
                  eQ(
                    n,
                    function (e) {
                      var t;
                      (null == (t = a.next) || t.call(a, e), n.next(e));
                    },
                    function () {
                      var e;
                      ((r = !1),
                        null == (e = a.complete) || e.call(a),
                        n.complete());
                    },
                    function (e) {
                      var t;
                      ((r = !1),
                        null == (t = a.error) || t.call(a, e),
                        n.error(e));
                    },
                    function () {
                      var e, n;
                      (r && (null == (e = a.unsubscribe) || e.call(a)),
                        null == (n = a.finalize) || n.call(a));
                    },
                  ),
                );
              })
            : eY,
          (void 0 === i && (i = {}),
          (s =
            void 0 === (o = i.connector)
              ? function () {
                  return new e5();
                }
              : o),
          (c = void 0 === (l = i.resetOnError) || l),
          (d = void 0 === (u = i.resetOnComplete) || u),
          (p = void 0 === (m = i.resetOnRefCountZero) || m),
          function (e) {
            var n,
              t,
              a,
              r = 0,
              i = !1,
              o = !1,
              l = function () {
                (null == t || t.unsubscribe(), (t = void 0));
              },
              u = function () {
                (l(), (n = a = void 0), (i = o = !1));
              },
              m = function () {
                var e = n;
                (u(), null == e || e.unsubscribe());
              };
            return eZ(function (e, f) {
              (r++, o || i || l());
              var h = (a = a ?? s());
              (f.add(function () {
                0 != --r || o || i || (t = nO(m, p));
              }),
                h.subscribe(f),
                !n &&
                  r > 0 &&
                  ((n = new eJ({
                    next: function (e) {
                      return h.next(e);
                    },
                    error: function (e) {
                      ((o = !0), l(), (t = nO(u, c, e)), h.error(e));
                    },
                    complete: function () {
                      ((i = !0), l(), (t = nO(u, d)), h.complete());
                    },
                  })),
                  nu(e).subscribe(n)));
            })(e);
          }),
        );
      return (
        k.set(g, E),
        e.on(r.RoomEvent.Disconnected, () => {
          (tI().delete(g), (y = []), v.next([]));
        }),
        E
      );
    },
    "ab",
    0,
    tm,
    "ac",
    0,
    tF,
    "ad",
    0,
    function (e) {
      let n = tF(),
        t = e ?? n;
      if (!t)
        throw Error(
          "No session provided, make sure you are inside a Session context or pass the session explicitly",
        );
      return t;
    },
    "ae",
    0,
    tx,
    "af",
    0,
    tR,
    "ag",
    0,
    function (e) {
      return { className: "lk-participant-name", infoObserver: tc(e) };
    },
    "ah",
    0,
    ev,
    "ai",
    0,
    ey,
    "aj",
    0,
    tC,
    "ak",
    0,
    tO,
    "al",
    0,
    function (e) {
      let n = i.useContext(tj);
      if (!0 === e) {
        if (n) return n;
        throw Error("tried to access feature context, but none is present");
      }
      return n;
    },
    "am",
    0,
    function (e, n = 1e3) {
      var t, a;
      if (null === e) return nk(!1);
      let r = (function e(n, t, a, r) {
          if ((ex(a) && ((r = a), (a = void 0)), r)) {
            return e(n, t, a).pipe(
              ((i = r),
              ny(function (e) {
                return nb(e) ? i.apply(void 0, eP([], eR(e))) : i(e);
              })),
            );
          }
          var i,
            o,
            s,
            l,
            c = eR(
              ex((o = n).addEventListener) && ex(o.removeEventListener)
                ? nw.map(function (e) {
                    return function (r) {
                      return n[e](t, r, a);
                    };
                  })
                : ex((s = n).addListener) && ex(s.removeListener)
                  ? nS.map(nA(n, t))
                  : ex((l = n).on) && ex(l.off)
                    ? nI.map(nA(n, t))
                    : [],
              2,
            ),
            u = c[0],
            d = c[1];
          if (!u && nt(n))
            return nE(function (n) {
              return e(n, t, a);
            })(nu(n));
          if (!u) throw TypeError("Invalid event target");
          return new eK(function (e) {
            var n = function () {
              for (var n = [], t = 0; t < arguments.length; t++)
                n[t] = arguments[t];
              return e.next(1 < n.length ? n : n[0]);
            };
            return (
              u(n),
              function () {
                return d(n);
              }
            );
          });
        })(e, "mousemove", { passive: !0 }).pipe(ny(() => !0)),
        i = r.pipe(
          (function (e) {
            var n =
                e instanceof Date && !isNaN(e)
                  ? { first: e }
                  : "number" == typeof e
                    ? { each: e }
                    : e,
              t = n.first,
              a = n.each,
              r = n.with,
              i = void 0 === r ? nv : r,
              o = n.scheduler,
              s = void 0 === o ? ne : o,
              l = n.meta,
              c = void 0 === l ? null : l;
            if (null == t && null == a) throw TypeError("No timeout provided.");
            return eZ(function (e, n) {
              var r,
                o,
                l = null,
                u = 0,
                d = function (e) {
                  o = nm(
                    n,
                    s,
                    function () {
                      try {
                        (r.unsubscribe(),
                          nu(i({ meta: c, lastValue: l, seen: u })).subscribe(
                            n,
                          ));
                      } catch (e) {
                        n.error(e);
                      }
                    },
                    e,
                  );
                };
              ((r = e.subscribe(
                eQ(
                  n,
                  function (e) {
                    (null == o || o.unsubscribe(),
                      u++,
                      n.next((l = e)),
                      a > 0 && d(a));
                  },
                  void 0,
                  void 0,
                  function () {
                    ((null != o && o.closed) || null == o || o.unsubscribe(),
                      (l = null));
                  },
                ),
              )),
                u ||
                  d(null != t ? ("number" == typeof t ? t : t - s.now()) : a));
            });
          })({
            each: n,
            with: () =>
              n_(
                nk(!1),
                i.pipe(
                  eZ(function (e, n) {
                    var t = !1,
                      a = eQ(
                        n,
                        function () {
                          (null == a || a.unsubscribe(), (t = !0));
                        },
                        e$,
                      );
                    (nu(r).subscribe(a),
                      e.subscribe(
                        eQ(n, function (e) {
                          return t && n.next(e);
                        }),
                      ));
                  }),
                ),
              ),
          }),
          (void 0 === a && (a = eY),
          (t = t ?? nR),
          eZ(function (e, n) {
            var r,
              i = !0;
            e.subscribe(
              eQ(n, function (e) {
                var o = a(e);
                (i || !t(r, o)) && ((i = !1), (r = o), n.next(e));
              }),
            );
          })),
        );
      return i;
    },
    "an",
    0,
    function () {
      let e = document.createElement("p");
      ((e.style.width = "100%"), (e.style.height = "200px"));
      let n = document.createElement("div");
      ((n.style.position = "absolute"),
        (n.style.top = "0px"),
        (n.style.left = "0px"),
        (n.style.visibility = "hidden"),
        (n.style.width = "200px"),
        (n.style.height = "150px"),
        (n.style.overflow = "hidden"),
        n.appendChild(e),
        document.body.appendChild(n));
      let t = e.offsetWidth;
      n.style.overflow = "scroll";
      let a = e.offsetWidth;
      return (
        t === a && (a = n.clientWidth),
        document.body.removeChild(n),
        t - a
      );
    },
    "ao",
    0,
    function (e) {
      let [n, t] = i.useReducer(tN, nQ),
        [a, r] = i.useReducer(tA, n0);
      return (
        e ?? {
          pin: { dispatch: t, state: n },
          widget: { dispatch: r, state: a },
        }
      );
    },
    "ap",
    0,
    function (e, n) {
      let t = Object.entries(n)
          .map(([n, t], a) =>
            Array.from(e.matchAll(t)).map(({ index: e, 0: t }) => ({
              type: n,
              weight: a,
              content: t,
              index: e ?? 0,
            })),
          )
          .flat()
          .sort((e, n) => {
            let t = e.index - n.index;
            return 0 !== t ? t : e.weight - n.weight;
          })
          .filter(({ index: e }, n, t) => {
            if (0 === n) return !0;
            let a = t[n - 1];
            return a.index + a.content.length <= e;
          }),
        a = [],
        r = 0;
      for (let { type: n, content: i, index: o } of t)
        (o > r && a.push(e.substring(r, o)),
          a.push({ type: n, content: i }),
          (r = o + i.length));
      return (e.length > r && a.push(e.substring(r)), a);
    },
    "aq",
    0,
    () => {
      var e;
      let n, t;
      return {
        email: (function ({ exact: e } = {}) {
          return e ? RegExp(`^${nz}$`) : RegExp(nz, "g");
        })(),
        url:
          ((e = nB({}, (e = {}))),
          (n = RegExp(
            "(?:25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]\\d|\\d)(?:\\.(?:25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]\\d|\\d)){3}",
            "g",
          ).source),
          (t = `(?:(?:(?:[a-z]+:)?//)?|www\\.)(?:\\S+(?::\\S*)?@)?(?:localhost|${n}|(?:(?:[a-z\\u00a1-\\uffff0-9][-_]*)*[a-z\\u00a1-\\uffff0-9]+)(?:\\.(?:[a-z\\u00a1-\\uffff0-9]-*)*[a-z\\u00a1-\\uffff0-9]+)*(?:\\.(?:[a-z\\u00a1-\\uffff]{2,}))\\.?)(?::\\d{2,5})?(?:[/?#][^\\s"]*)?`),
          e.exact ? RegExp(`(?:^${t}$)`, "i") : RegExp(t, "ig")),
      };
    },
    "ar",
    0,
    tU,
    "as",
    0,
    function (e, n, t) {
      return (function (e, n, t, a) {
        void 0 === a && (a = {});
        let {
            ancestorScroll: r = !0,
            ancestorResize: i = !0,
            elementResize: l = "function" == typeof ResizeObserver,
            layoutShift: u = "function" == typeof IntersectionObserver,
            animationFrame: d = !1,
          } = a,
          m = er(e),
          p = r || i ? [...(m ? en(m) : []), ...en(n)] : [];
        p.forEach((e) => {
          (r && e.addEventListener("scroll", t, { passive: !0 }),
            i && e.addEventListener("resize", t));
        });
        let f =
            m && u
              ? (function (e, n) {
                  let t = null,
                    a,
                    r = D(e);
                  function i() {
                    var e;
                    (clearTimeout(a),
                      null == (e = t) || e.disconnect(),
                      (t = null));
                  }
                  return (
                    (function l(u, d) {
                      (void 0 === u && (u = !1), void 0 === d && (d = 1), i());
                      let m = e.getBoundingClientRect(),
                        { left: p, top: f, width: h, height: g } = m;
                      if ((u || n(), !h || !g)) return;
                      let k = {
                          rootMargin:
                            -c(f) +
                            "px " +
                            -c(r.clientWidth - (p + h)) +
                            "px " +
                            -c(r.clientHeight - (f + g)) +
                            "px " +
                            -c(p) +
                            "px",
                          threshold: s(0, o(1, d)) || 1,
                        },
                        T = !0;
                      function v(n) {
                        let t = n[0].intersectionRatio;
                        if (t !== d) {
                          if (!T) return l();
                          t
                            ? l(!1, t)
                            : (a = setTimeout(() => {
                                l(!1, 1e-7);
                              }, 1e3));
                        }
                        (1 !== t || eT(m, e.getBoundingClientRect()) || l(),
                          (T = !1));
                      }
                      try {
                        t = new IntersectionObserver(v, {
                          ...k,
                          root: r.ownerDocument,
                        });
                      } catch {
                        t = new IntersectionObserver(v, k);
                      }
                      t.observe(e);
                    })(!0),
                    i
                  );
                })(m, t)
              : null,
          h = -1,
          g = null;
        l &&
          ((g = new ResizeObserver((e) => {
            let [a] = e;
            (a &&
              a.target === m &&
              g &&
              (g.unobserve(n),
              cancelAnimationFrame(h),
              (h = requestAnimationFrame(() => {
                var e;
                null == (e = g) || e.observe(n);
              }))),
              t());
          })),
          m && !d && g.observe(m),
          g.observe(n));
        let k,
          T = d ? el(e) : null;
        return (
          d &&
            (function n() {
              let a = el(e);
              (T && !eT(T, a) && t(), (T = a), (k = requestAnimationFrame(n)));
            })(),
          t(),
          () => {
            var e;
            (p.forEach((e) => {
              (r && e.removeEventListener("scroll", t),
                i && e.removeEventListener("resize", t));
            }),
              null == f || f(),
              null == (e = g) || e.disconnect(),
              (g = null),
              d && cancelAnimationFrame(k));
          }
        );
      })(e, n, () =>
        n$(this, null, function* () {
          var a, r, i;
          let l,
            c,
            u,
            { x: d, y: m } = yield ((i = {
              placement: "top",
              middleware: [
                {
                  name: "offset",
                  options: 6,
                  async fn(e) {
                    var n, t;
                    let { x: a, y: r, placement: i, middlewareData: o } = e,
                      s = await O(e, 6);
                    return i ===
                      (null == (n = o.offset) ? void 0 : n.placement) &&
                      null != (t = o.arrow) &&
                      t.alignmentOffset
                      ? {}
                      : {
                          x: a + s.x,
                          y: r + s.y,
                          data: { ...s, placement: i },
                        };
                  },
                },
                (void 0 === a && (a = {}),
                {
                  name: "flip",
                  options: a,
                  async fn(e) {
                    var n, t, r, i, o, s, l, c;
                    let u,
                      d,
                      m,
                      {
                        placement: T,
                        middlewareData: I,
                        rects: A,
                        initialPlacement: N,
                        platform: P,
                        elements: O,
                      } = e,
                      {
                        mainAxis: x = !0,
                        crossAxis: C = !0,
                        fallbackPlacements: M,
                        fallbackStrategy: D = "bestFit",
                        fallbackAxisSideDirection: L = "none",
                        flipAlignment: U = !0,
                        ...F
                      } = p(a, e);
                    if (null != (n = I.arrow) && n.alignmentOffset) return {};
                    let j = f(T),
                      V = v(N),
                      H = f(N) === N,
                      B = await (null == P.isRTL
                        ? void 0
                        : P.isRTL(O.floating)),
                      $ =
                        M || (H || !U ? [w(N)] : ((u = w(N)), [y(N), u, y(u)])),
                      G = "none" !== L;
                    !M &&
                      G &&
                      $.push(
                        ...((d = h(N)),
                        (m = (function (e, n, t) {
                          switch (e) {
                            case "top":
                            case "bottom":
                              return t ? (n ? E : b) : n ? b : E;
                            case "left":
                            case "right":
                              return n ? _ : S;
                            default:
                              return [];
                          }
                        })(f(N), "start" === L, B)),
                        d &&
                          ((m = m.map((e) => e + "-" + d)),
                          U && (m = m.concat(m.map(y)))),
                        m),
                      );
                    let W = [N, ...$],
                      J = await R(e, F),
                      z = [],
                      q = (null == (t = I.flip) ? void 0 : t.overflows) || [];
                    if ((x && z.push(J[j]), C)) {
                      let e,
                        n,
                        t,
                        a,
                        r =
                          ((s = T),
                          (l = A),
                          void 0 === (c = B) && (c = !1),
                          (e = h(s)),
                          (t = k((n = g(v(s))))),
                          (a =
                            "x" === n
                              ? e === (c ? "end" : "start")
                                ? "right"
                                : "left"
                              : "start" === e
                                ? "bottom"
                                : "top"),
                          l.reference[t] > l.floating[t] && (a = w(a)),
                          [a, w(a)]);
                      z.push(J[r[0]], J[r[1]]);
                    }
                    if (
                      ((q = [...q, { placement: T, overflows: z }]),
                      !z.every((e) => e <= 0))
                    ) {
                      let e =
                          ((null == (r = I.flip) ? void 0 : r.index) || 0) + 1,
                        n = W[e];
                      if (
                        n &&
                        ("alignment" !== C ||
                          V === v(n) ||
                          q.every(
                            (e) => v(e.placement) !== V || e.overflows[0] > 0,
                          ))
                      )
                        return {
                          data: { index: e, overflows: q },
                          reset: { placement: n },
                        };
                      let t =
                        null ==
                        (i = q
                          .filter((e) => e.overflows[0] <= 0)
                          .sort((e, n) => e.overflows[1] - n.overflows[1])[0])
                          ? void 0
                          : i.placement;
                      if (!t)
                        switch (D) {
                          case "bestFit": {
                            let e =
                              null ==
                              (o = q
                                .filter((e) => {
                                  if (G) {
                                    let n = v(e.placement);
                                    return n === V || "y" === n;
                                  }
                                  return !0;
                                })
                                .map((e) => [
                                  e.placement,
                                  e.overflows
                                    .filter((e) => e > 0)
                                    .reduce((e, n) => e + n, 0),
                                ])
                                .sort((e, n) => e[1] - n[1])[0])
                                ? void 0
                                : o[0];
                            e && (t = e);
                            break;
                          }
                          case "initialPlacement":
                            t = N;
                        }
                      if (T !== t) return { reset: { placement: t } };
                    }
                    return {};
                  },
                }),
                {
                  name: "shift",
                  options: (r = { padding: 5 }),
                  async fn(e) {
                    let { x: n, y: t, placement: a } = e,
                      {
                        mainAxis: i = !0,
                        crossAxis: l = !1,
                        limiter: c = {
                          fn: (e) => {
                            let { x: n, y: t } = e;
                            return { x: n, y: t };
                          },
                        },
                        ...u
                      } = p(r, e),
                      d = { x: n, y: t },
                      m = await R(e, u),
                      h = v(f(a)),
                      k = g(h),
                      T = d[k],
                      y = d[h];
                    if (i) {
                      let e = "y" === k ? "top" : "left",
                        n = "y" === k ? "bottom" : "right",
                        t = T + m[e],
                        a = T - m[n];
                      T = s(t, o(T, a));
                    }
                    if (l) {
                      let e = "y" === h ? "top" : "left",
                        n = "y" === h ? "bottom" : "right",
                        t = y + m[e],
                        a = y - m[n];
                      y = s(t, o(y, a));
                    }
                    let b = c.fn({ ...e, [k]: T, [h]: y });
                    return {
                      ...b,
                      data: {
                        x: b.x - n,
                        y: b.y - t,
                        enabled: { [k]: i, [h]: l },
                      },
                    };
                  },
                },
              ],
            }),
            (l = new Map()),
            (u = { ...(c = { platform: ek, ...i }).platform, _c: l }),
            N(e, n, { ...c, platform: u }));
          null == t || t(d, m);
        }),
      );
    },
    "at",
    0,
    function (e, n) {
      return !e.contains(n.target);
    },
    "au",
    0,
    function () {
      return (
        "u" > typeof navigator &&
        navigator.mediaDevices &&
        !!navigator.mediaDevices.getDisplayMedia
      );
    },
    "av",
    0,
    function () {
      let [e, n] = i.useReducer(tN, nQ),
        [t, a] = i.useReducer(tA, n0);
      return {
        pin: { dispatch: n, state: e },
        widget: { dispatch: a, state: t },
      };
    },
    "aw",
    0,
    function (e, n) {
      return (
        void 0 !== e &&
        void 0 !== n &&
        (nG(e) && nG(n)
          ? e.publication.trackSid === n.publication.trackSid
          : nJ(e) === nJ(n))
      );
    },
    "ax",
    0,
    function () {
      return "u" > typeof document;
    },
    "b",
    0,
    function () {
      return { className: "lk-clear-pin-button lk-button" };
    },
    "c",
    0,
    function (e) {
      let n = tM(),
        t = tx(),
        a = e ?? n ?? (null == t ? void 0 : t.participant);
      if (!a)
        throw Error(
          "No participant provided, make sure you are inside a participant context or pass the participant explicitly",
        );
      return a;
    },
    "d",
    0,
    function (e) {
      return {
        className: tn("connection-quality"),
        connectionQualityObserver: tu(
          e,
          r.ParticipantEvent.ConnectionQualityChanged,
        ).pipe(
          ny(([e]) => e),
          nx(e.connectionQuality),
        ),
      };
    },
    "e",
    0,
    function (e) {
      return tr(e, r.RoomEvent.ConnectionStateChanged).pipe(
        ny(([e]) => e),
        nx(e.state),
      );
    },
    "f",
    0,
    function () {
      let e = i.useContext(tD);
      if (!e)
        throw Error(
          "tried to access room context outside of livekit room component",
        );
      return e;
    },
    "g",
    0,
    tf,
    "h",
    0,
    function (e) {
      return {
        className: tn("disconnect-button"),
        disconnect: (n) => {
          e.disconnect(n);
        },
      };
    },
    "i",
    0,
    function (e) {
      let n = tx(),
        t = e ?? n;
      if (!t)
        throw Error(
          "No TrackRef, make sure you are inside a TrackRefContext or pass the TrackRef explicitly",
        );
      return t;
    },
    "j",
    0,
    tP,
    "k",
    0,
    function () {
      return { className: [tn("button"), tn("focus-toggle-button")].join(" ") };
    },
    "l",
    0,
    nX,
    "m",
    0,
    function (e, n) {
      return (
        !(typeof n > "u") &&
        (nG(e)
          ? n.some(
              (n) =>
                n.participant.identity === e.participant.identity &&
                nG(n) &&
                n.publication.trackSid === e.publication.trackSid,
            )
          : !!nW(e) &&
            n.some(
              (n) =>
                n.participant.identity === e.participant.identity &&
                nW(n) &&
                n.source === e.source,
            ))
      );
    },
    "n",
    0,
    function e(n, t, a, r) {
      if (n.length < 1)
        throw Error("At least one grid layout definition must be provided.");
      let i = [...n]
        .map((e) => {
          var n, t;
          return {
            name: `${e.columns}x${e.rows}`,
            columns: e.columns,
            rows: e.rows,
            maxTiles: e.columns * e.rows,
            minWidth: null != (n = e.minWidth) ? n : 0,
            minHeight: null != (t = e.minHeight) ? t : 0,
            orientation: e.orientation,
          };
        })
        .sort((e, n) =>
          e.maxTiles !== n.maxTiles
            ? e.maxTiles - n.maxTiles
            : 0 !== e.minWidth || 0 !== n.minWidth
              ? e.minWidth - n.minWidth
              : 0 !== e.minHeight || 0 !== n.minHeight
                ? e.minHeight - n.minHeight
                : 0,
        );
      if (a <= 0 || r <= 0) return i[0];
      let o = 0,
        s = a / r > 1 ? "landscape" : "portrait",
        l = i.find((e, n, a) => {
          o = n;
          let r =
            -1 !==
            a.findIndex((t, a) => {
              let r = !t.orientation || t.orientation === s,
                i = t.maxTiles === e.maxTiles;
              return a > n && i && r;
            });
          return e.maxTiles >= t && !r;
        });
      if (void 0 === l)
        if ((l = i[i.length - 1]))
          nX.warn(
            `No layout found for: participantCount: ${t}, width/height: ${a}/${r} fallback to biggest available layout (${l}).`,
          );
        else throw Error("No layout or fallback layout found.");
      if ((a < l.minWidth || r < l.minHeight) && o > 0) {
        let n = i[o - 1];
        l = e(i.slice(0, o), n.maxTiles, a, r);
      }
      return l;
    },
    "o",
    0,
    td,
    "p",
    0,
    nJ,
    "q",
    0,
    function (e) {
      return tu(e, r.ParticipantEvent.IsSpeakingChanged).pipe(ny(([e]) => e));
    },
    "r",
    0,
    ti,
    "s",
    0,
    function () {
      return { className: "lk-room-container" };
    },
    "t",
    0,
    tl,
    "u",
    0,
    function (e) {
      let n = tL(),
        t = e ?? n;
      if (!t)
        throw Error(
          "No room provided, make sure you are inside a Room context or pass the room explicitly",
        );
      return t;
    },
    "v",
    0,
    function (e) {
      return tu(e, r.ParticipantEvent.ParticipantPermissionsChanged).pipe(
        ny(() => e.permissions),
        nx(e.permissions),
      );
    },
    "w",
    0,
    tL,
    "x",
    0,
    function (e, n, t = !0) {
      return n_(
        new eK((a) => {
          r.Room.getLocalDevices(e, t)
            .then((e) => {
              (a.next(e), a.complete());
            })
            .catch((e) => {
              (null == n || n(e), a.next([]), a.complete());
            });
        }),
        new eK((a) => {
          var i;
          let o = () =>
            n$(this, null, function* () {
              try {
                let n = yield r.Room.getLocalDevices(e, t);
                a.next(n);
              } catch (e) {
                null == n || n(e);
              }
            });
          if ("u" > typeof window) {
            if (!window.isSecureContext)
              throw Error(
                "Accessing media devices is available only in secure contexts (HTTPS and localhost), in some or all supporting browsers. See: https://developer.mozilla.org/en-US/docs/Web/API/Navigator/mediaDevices",
              );
            null == (i = null == navigator ? void 0 : navigator.mediaDevices) ||
              i.addEventListener("devicechange", o);
          }
          return () => {
            var e;
            null == (e = null == navigator ? void 0 : navigator.mediaDevices) ||
              e.removeEventListener("devicechange", o);
          };
        }),
      );
    },
    "y",
    0,
    function (e, n, t) {
      let a = new e3(void 0),
        i = tr(n, r.RoomEvent.ActiveDeviceChanged).pipe(
          nN(([n]) => n === e),
          ny(
            ([e, n]) => (
              nX.debug(
                "activeDeviceObservable | RoomEvent.ActiveDeviceChanged",
                { kind: e, deviceId: n },
              ),
              n
            ),
          ),
        ),
        o = (t, ...i) =>
          n$(this, [t, ...i], function* (t, i = {}) {
            var o, s, l;
            if (n) {
              let c,
                u = (0, r.getBrowser)();
              if (
                "audiooutput" === e &&
                ((null == u ? void 0 : u.name) === "Safari" ||
                  (null == u ? void 0 : u.os) === "iOS")
              )
                return void nX.warn(
                  "Switching audio output device is not supported on Safari and iOS.",
                );
              (nX.debug(`Switching active device of kind "${e}" with id ${t}.`),
                yield n.switchActiveDevice(e, t, i.exact));
              let d = null != (o = n.getActiveDevice(e)) ? o : t;
              (d !== t &&
                "default" !== t &&
                nX.info(
                  `We tried to select the device with id (${t}), but the browser decided to select the device with id (${d}) instead.`,
                ),
                "audioinput" === e
                  ? (c =
                      null ==
                      (s = n.localParticipant.getTrackPublication(
                        r.Track.Source.Microphone,
                      ))
                        ? void 0
                        : s.track)
                  : "videoinput" === e &&
                    (c =
                      null ==
                      (l = n.localParticipant.getTrackPublication(
                        r.Track.Source.Camera,
                      ))
                        ? void 0
                        : l.track));
              let m =
                ("default" === t && !c) ||
                ("default" === t &&
                  (null == c
                    ? void 0
                    : c.mediaStreamTrack.label.startsWith("Default")));
              a.next(m ? t : d);
            }
          });
      return {
        className: tn("media-device-select"),
        activeDeviceObservable: i,
        setActiveMediaDevice: o,
      };
    },
    "z",
    0,
    function (e) {
      let n,
        t,
        a,
        i,
        o = [],
        s = [],
        l = [],
        c = [];
      e.forEach((e) => {
        e.participant.isLocal && e.source === r.Track.Source.Camera
          ? o.push(e)
          : e.source === r.Track.Source.ScreenShare
            ? s.push(e)
            : e.source === r.Track.Source.Camera
              ? l.push(e)
              : c.push(e);
      });
      return [
        ...o,
        ...((n = []),
        (t = []),
        s.forEach((e) => {
          e.participant.isLocal ? n.push(e) : t.push(e);
        }),
        n.sort((e, n) => n9(e.participant, n.participant)),
        t.sort((e, n) => n9(e.participant, n.participant)),
        [...t, ...n]),
        ...((a = []),
        (i = []),
        l.forEach((e) => {
          e.participant.isLocal ? a.push(e) : i.push(e);
        }),
        i.sort((e, n) => {
          let t;
          return e.participant.isSpeaking && n.participant.isSpeaking
            ? n5(e.participant, n.participant)
            : e.participant.isSpeaking !== n.participant.isSpeaking
              ? n2(e.participant, n.participant)
              : e.participant.lastSpokeAt !== n.participant.lastSpokeAt
                ? n3(e.participant, n.participant)
                : nG(e) !== nG(n)
                  ? nG(e)
                    ? nG(n)
                      ? 0
                      : -1
                    : +!!nG(n)
                  : e.participant.isCameraEnabled !==
                      n.participant.isCameraEnabled
                    ? (t = e.participant.isCameraEnabled) !==
                      n.participant.isCameraEnabled
                      ? t
                        ? -1
                        : 1
                      : 0
                    : n9(e.participant, n.participant);
        }),
        [...a, ...i]),
        ...c,
      ];
    },
  ]);
};
