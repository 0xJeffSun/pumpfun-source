// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  "use strict";
  var t = e.i(352386),
    i = e.i(607079),
    s = e.i(210242);
  function a(e, t, i) {
    let a,
      { reference: n, floating: r } = e,
      o = (0, s.$)(t),
      h = (0, s.i)(t),
      l = (0, s.T)(h),
      d = (0, s.m)(t),
      u = "y" === o,
      c = n.x + n.width / 2 - r.width / 2,
      p = n.y + n.height / 2 - r.height / 2,
      m = n[l] / 2 - r[l] / 2;
    switch (d) {
      case "top":
        a = { x: c, y: n.y - r.height };
        break;
      case "bottom":
        a = { x: c, y: n.y + n.height };
        break;
      case "right":
        a = { x: n.x + n.width, y: p };
        break;
      case "left":
        a = { x: n.x - r.width, y: p };
        break;
      default:
        a = { x: n.x, y: n.y };
    }
    switch ((0, s.R)(t)) {
      case "start":
        a[h] -= m * (i && u ? -1 : 1);
        break;
      case "end":
        a[h] += m * (i && u ? -1 : 1);
    }
    return a;
  }
  let n = async (e, t, i) => {
    let {
        placement: s = "bottom",
        strategy: n = "absolute",
        middleware: r = [],
        platform: o,
      } = i,
      h = r.filter(Boolean),
      l = await (null == o.isRTL ? void 0 : o.isRTL(t)),
      d = await o.getElementRects({ reference: e, floating: t, strategy: n }),
      { x: u, y: c } = a(d, s, l),
      p = s,
      m = {},
      g = 0;
    for (let i = 0; i < h.length; i++) {
      let { name: r, fn: f } = h[i],
        {
          x: y,
          y: v,
          data: b,
          reset: w,
        } = await f({
          x: u,
          y: c,
          initialPlacement: s,
          placement: p,
          strategy: n,
          middlewareData: m,
          rects: d,
          platform: o,
          elements: { reference: e, floating: t },
        });
      ((u = null != y ? y : u),
        (c = null != v ? v : c),
        (m = { ...m, [r]: { ...m[r], ...b } }),
        w &&
          g <= 50 &&
          (g++,
          "object" == typeof w &&
            (w.placement && (p = w.placement),
            w.rects &&
              (d =
                !0 === w.rects
                  ? await o.getElementRects({
                      reference: e,
                      floating: t,
                      strategy: n,
                    })
                  : w.rects),
            ({ x: u, y: c } = a(d, p, l))),
          (i = -1)));
    }
    return { x: u, y: c, placement: p, strategy: n, middlewareData: m };
  };
  async function r(e, t) {
    var i;
    void 0 === t && (t = {});
    let { x: a, y: n, platform: r, rects: o, elements: h, strategy: l } = e,
      {
        boundary: d = "clippingAncestors",
        rootBoundary: u = "viewport",
        elementContext: c = "floating",
        altBoundary: p = !1,
        padding: m = 0,
      } = (0, s.h)(t, e),
      g = (0, s.j)(m),
      f = h[p ? ("floating" === c ? "reference" : "floating") : c],
      y = (0, s._)(
        await r.getClippingRect({
          element:
            null ==
              (i = await (null == r.isElement ? void 0 : r.isElement(f))) || i
              ? f
              : f.contextElement ||
                (await (null == r.getDocumentElement
                  ? void 0
                  : r.getDocumentElement(h.floating))),
          boundary: d,
          rootBoundary: u,
          strategy: l,
        }),
      ),
      v =
        "floating" === c
          ? { x: a, y: n, width: o.floating.width, height: o.floating.height }
          : o.reference,
      b = await (null == r.getOffsetParent
        ? void 0
        : r.getOffsetParent(h.floating)),
      w = ((await (null == r.isElement ? void 0 : r.isElement(b))) &&
        (await (null == r.getScale ? void 0 : r.getScale(b)))) || {
        x: 1,
        y: 1,
      },
      k = (0, s._)(
        r.convertOffsetParentRelativeRectToViewportRelativeRect
          ? await r.convertOffsetParentRelativeRectToViewportRelativeRect({
              elements: h,
              rect: v,
              offsetParent: b,
              strategy: l,
            })
          : v,
      );
    return {
      top: (y.top - k.top + g.top) / w.y,
      bottom: (k.bottom - y.bottom + g.bottom) / w.y,
      left: (y.left - k.left + g.left) / w.x,
      right: (k.right - y.right + g.right) / w.x,
    };
  }
  let o = new Set(["left", "top"]);
  async function h(e, t) {
    let { placement: i, platform: a, elements: n } = e,
      r = await (null == a.isRTL ? void 0 : a.isRTL(n.floating)),
      h = (0, s.m)(i),
      l = (0, s.R)(i),
      d = "y" === (0, s.$)(i),
      u = o.has(h) ? -1 : 1,
      c = r && d ? -1 : 1,
      p = (0, s.h)(t, e),
      {
        mainAxis: m,
        crossAxis: g,
        alignmentAxis: f,
      } = "number" == typeof p
        ? { mainAxis: p, crossAxis: 0, alignmentAxis: null }
        : {
            mainAxis: p.mainAxis || 0,
            crossAxis: p.crossAxis || 0,
            alignmentAxis: p.alignmentAxis,
          };
    return (
      l && "number" == typeof f && (g = "end" === l ? -1 * f : f),
      d ? { x: g * c, y: m * u } : { x: m * u, y: g * c }
    );
  }
  let l = Math.min,
    d = Math.max,
    u = Math.round,
    c = Math.floor,
    p = (e) => ({ x: e, y: e });
  function m() {
    return "u" > typeof window;
  }
  function g(e) {
    return v(e) ? (e.nodeName || "").toLowerCase() : "#document";
  }
  function f(e) {
    var t;
    return (
      (null == e || null == (t = e.ownerDocument) ? void 0 : t.defaultView) ||
      window
    );
  }
  function y(e) {
    var t;
    return null ==
      (t = (v(e) ? e.ownerDocument : e.document) || window.document)
      ? void 0
      : t.documentElement;
  }
  function v(e) {
    return !!m() && (e instanceof Node || e instanceof f(e).Node);
  }
  function b(e) {
    return !!m() && (e instanceof Element || e instanceof f(e).Element);
  }
  function w(e) {
    return !!m() && (e instanceof HTMLElement || e instanceof f(e).HTMLElement);
  }
  function k(e) {
    return (
      !(!m() || "u" < typeof ShadowRoot) &&
      (e instanceof ShadowRoot || e instanceof f(e).ShadowRoot)
    );
  }
  let T = new Set(["inline", "contents"]);
  function x(e) {
    let { overflow: t, overflowX: i, overflowY: s, display: a } = R(e);
    return /auto|scroll|overlay|hidden|clip/.test(t + s + i) && !T.has(a);
  }
  let S = new Set(["table", "td", "th"]),
    $ = [":popover-open", ":modal"];
  function C(e) {
    return $.some((t) => {
      try {
        return e.matches(t);
      } catch (e) {
        return !1;
      }
    });
  }
  let P = ["transform", "translate", "scale", "rotate", "perspective"],
    E = ["transform", "translate", "scale", "rotate", "perspective", "filter"],
    A = ["paint", "layout", "strict", "content"];
  function q(e) {
    let t = M(),
      i = b(e) ? R(e) : e;
    return (
      P.some((e) => !!i[e] && "none" !== i[e]) ||
      (!!i.containerType && "normal" !== i.containerType) ||
      (!t && !!i.backdropFilter && "none" !== i.backdropFilter) ||
      (!t && !!i.filter && "none" !== i.filter) ||
      E.some((e) => (i.willChange || "").includes(e)) ||
      A.some((e) => (i.contain || "").includes(e))
    );
  }
  function M() {
    return (
      !("u" < typeof CSS) &&
      !!CSS.supports &&
      CSS.supports("-webkit-backdrop-filter", "none")
    );
  }
  let L = new Set(["html", "body", "#document"]);
  function D(e) {
    return L.has(g(e));
  }
  function R(e) {
    return f(e).getComputedStyle(e);
  }
  function I(e) {
    return b(e)
      ? { scrollLeft: e.scrollLeft, scrollTop: e.scrollTop }
      : { scrollLeft: e.scrollX, scrollTop: e.scrollY };
  }
  function V(e) {
    if ("html" === g(e)) return e;
    let t = e.assignedSlot || e.parentNode || (k(e) && e.host) || y(e);
    return k(t) ? t.host : t;
  }
  function O(e, t, i) {
    var s;
    (void 0 === t && (t = []), void 0 === i && (i = !0));
    let a = (function e(t) {
        let i = V(t);
        return D(i)
          ? t.ownerDocument
            ? t.ownerDocument.body
            : t.body
          : w(i) && x(i)
            ? i
            : e(i);
      })(e),
      n = a === (null == (s = e.ownerDocument) ? void 0 : s.body),
      r = f(a);
    if (n) {
      let e = F(r);
      return t.concat(
        r,
        r.visualViewport || [],
        x(a) ? a : [],
        e && i ? O(e) : [],
      );
    }
    return t.concat(a, O(a, [], i));
  }
  function F(e) {
    return e.parent && Object.getPrototypeOf(e.parent) ? e.frameElement : null;
  }
  function N(e) {
    let t = R(e),
      i = parseFloat(t.width) || 0,
      s = parseFloat(t.height) || 0,
      a = w(e),
      n = a ? e.offsetWidth : i,
      r = a ? e.offsetHeight : s,
      o = u(i) !== n || u(s) !== r;
    return (o && ((i = n), (s = r)), { width: i, height: s, $: o });
  }
  function U(e) {
    return b(e) ? e : e.contextElement;
  }
  function B(e) {
    let t = U(e);
    if (!w(t)) return p(1);
    let i = t.getBoundingClientRect(),
      { width: s, height: a, $: n } = N(t),
      r = (n ? u(i.width) : i.width) / s,
      o = (n ? u(i.height) : i.height) / a;
    return (
      (r && Number.isFinite(r)) || (r = 1),
      (o && Number.isFinite(o)) || (o = 1),
      { x: r, y: o }
    );
  }
  let K = p(0);
  function W(e) {
    let t = f(e);
    return M() && t.visualViewport
      ? { x: t.visualViewport.offsetLeft, y: t.visualViewport.offsetTop }
      : K;
  }
  function G(e, t, i, a) {
    var n;
    (void 0 === t && (t = !1), void 0 === i && (i = !1));
    let r = e.getBoundingClientRect(),
      o = U(e),
      h = p(1);
    t && (a ? b(a) && (h = B(a)) : (h = B(e)));
    let l = (void 0 === (n = i) && (n = !1), a && (!n || a === f(o)) && n)
        ? W(o)
        : p(0),
      d = (r.left + l.x) / h.x,
      u = (r.top + l.y) / h.y,
      c = r.width / h.x,
      m = r.height / h.y;
    if (o) {
      let e = f(o),
        t = a && b(a) ? f(a) : a,
        i = e,
        s = F(i);
      for (; s && a && t !== i; ) {
        let e = B(s),
          t = s.getBoundingClientRect(),
          a = R(s),
          n = t.left + (s.clientLeft + parseFloat(a.paddingLeft)) * e.x,
          r = t.top + (s.clientTop + parseFloat(a.paddingTop)) * e.y;
        ((d *= e.x),
          (u *= e.y),
          (c *= e.x),
          (m *= e.y),
          (d += n),
          (u += r),
          (s = F((i = f(s)))));
      }
    }
    return (0, s._)({ width: c, height: m, x: d, y: u });
  }
  function Q(e, t) {
    let i = I(e).scrollLeft;
    return t ? t.left + i : G(y(e)).left + i;
  }
  function H(e, t) {
    let i = e.getBoundingClientRect();
    return { x: i.left + t.scrollLeft - Q(e, i), y: i.top + t.scrollTop };
  }
  let z = new Set(["absolute", "fixed"]);
  function j(e, t, i) {
    var a;
    let n;
    if ("viewport" === t)
      n = (function (e, t) {
        let i = f(e),
          s = y(e),
          a = i.visualViewport,
          n = s.clientWidth,
          r = s.clientHeight,
          o = 0,
          h = 0;
        if (a) {
          ((n = a.width), (r = a.height));
          let e = M();
          (!e || (e && "fixed" === t)) &&
            ((o = a.offsetLeft), (h = a.offsetTop));
        }
        let l = Q(s);
        if (l <= 0) {
          let e = s.ownerDocument,
            t = e.body,
            i = getComputedStyle(t),
            a =
              ("CSS1Compat" === e.compatMode &&
                parseFloat(i.marginLeft) + parseFloat(i.marginRight)) ||
              0,
            r = Math.abs(s.clientWidth - t.clientWidth - a);
          r <= 25 && (n -= r);
        } else l <= 25 && (n += l);
        return { width: n, height: r, x: o, y: h };
      })(e, i);
    else if ("document" === t) {
      let t, i, s, r, o, h, l;
      ((a = y(e)),
        (t = y(a)),
        (i = I(a)),
        (s = a.ownerDocument.body),
        (r = d(t.scrollWidth, t.clientWidth, s.scrollWidth, s.clientWidth)),
        (o = d(t.scrollHeight, t.clientHeight, s.scrollHeight, s.clientHeight)),
        (h = -i.scrollLeft + Q(a)),
        (l = -i.scrollTop),
        "rtl" === R(s).direction && (h += d(t.clientWidth, s.clientWidth) - r),
        (n = { width: r, height: o, x: h, y: l }));
    } else if (b(t)) {
      let e, s, a, r, o, h;
      ((s = (e = G(t, !0, "fixed" === i)).top + t.clientTop),
        (a = e.left + t.clientLeft),
        (r = w(t) ? B(t) : p(1)),
        (o = t.clientWidth * r.x),
        (h = t.clientHeight * r.y),
        (n = { width: o, height: h, x: a * r.x, y: s * r.y }));
    } else {
      let i = W(e);
      n = { x: t.x - i.x, y: t.y - i.y, width: t.width, height: t.height };
    }
    return (0, s._)(n);
  }
  function _(e) {
    return "static" === R(e).position;
  }
  function X(e, t) {
    if (!w(e) || "fixed" === R(e).position) return null;
    if (t) return t(e);
    let i = e.offsetParent;
    return (y(e) === i && (i = i.ownerDocument.body), i);
  }
  function J(e, t) {
    var i;
    let s = f(e);
    if (C(e)) return s;
    if (!w(e)) {
      let t = V(e);
      for (; t && !D(t); ) {
        if (b(t) && !_(t)) return t;
        t = V(t);
      }
      return s;
    }
    let a = X(e, t);
    for (; a && ((i = a), S.has(g(i))) && _(a); ) a = X(a, t);
    return a && D(a) && _(a) && !q(a)
      ? s
      : a ||
          (function (e) {
            let t = V(e);
            for (; w(t) && !D(t); ) {
              if (q(t)) return t;
              if (C(t)) break;
              t = V(t);
            }
            return null;
          })(e) ||
          s;
  }
  let Y = async function (e) {
      let t = this.getOffsetParent || J,
        i = this.getDimensions,
        s = await i(e.floating);
      return {
        reference: (function (e, t, i) {
          let s = w(t),
            a = y(t),
            n = "fixed" === i,
            r = G(e, !0, n, t),
            o = { scrollLeft: 0, scrollTop: 0 },
            h = p(0);
          if (s || (!s && !n))
            if ((("body" !== g(t) || x(a)) && (o = I(t)), s)) {
              let e = G(t, !0, n, t);
              ((h.x = e.x + t.clientLeft), (h.y = e.y + t.clientTop));
            } else a && (h.x = Q(a));
          n && !s && a && (h.x = Q(a));
          let l = !a || s || n ? p(0) : H(a, o);
          return {
            x: r.left + o.scrollLeft - h.x - l.x,
            y: r.top + o.scrollTop - h.y - l.y,
            width: r.width,
            height: r.height,
          };
        })(e.reference, await t(e.floating), e.strategy),
        floating: { x: 0, y: 0, width: s.width, height: s.height },
      };
    },
    Z = {
      convertOffsetParentRelativeRectToViewportRelativeRect: function (e) {
        let { elements: t, rect: i, offsetParent: s, strategy: a } = e,
          n = "fixed" === a,
          r = y(s),
          o = !!t && C(t.floating);
        if (s === r || (o && n)) return i;
        let h = { scrollLeft: 0, scrollTop: 0 },
          l = p(1),
          d = p(0),
          u = w(s);
        if (
          (u || (!u && !n)) &&
          (("body" !== g(s) || x(r)) && (h = I(s)), w(s))
        ) {
          let e = G(s);
          ((l = B(s)), (d.x = e.x + s.clientLeft), (d.y = e.y + s.clientTop));
        }
        let c = !r || u || n ? p(0) : H(r, h);
        return {
          width: i.width * l.x,
          height: i.height * l.y,
          x: i.x * l.x - h.scrollLeft * l.x + d.x + c.x,
          y: i.y * l.y - h.scrollTop * l.y + d.y + c.y,
        };
      },
      getDocumentElement: y,
      getClippingRect: function (e) {
        let { element: t, boundary: i, rootBoundary: s, strategy: a } = e,
          n = [
            ...("clippingAncestors" === i
              ? C(t)
                ? []
                : (function (e, t) {
                    let i = t.get(e);
                    if (i) return i;
                    let s = O(e, [], !1).filter((e) => b(e) && "body" !== g(e)),
                      a = null,
                      n = "fixed" === R(e).position,
                      r = n ? V(e) : e;
                    for (; b(r) && !D(r); ) {
                      let t = R(r),
                        i = q(r);
                      (i || "fixed" !== t.position || (a = null),
                        (
                          n
                            ? !i && !a
                            : (!i &&
                                "static" === t.position &&
                                !!a &&
                                z.has(a.position)) ||
                              (x(r) &&
                                !i &&
                                (function e(t, i) {
                                  let s = V(t);
                                  return (
                                    !(s === i || !b(s) || D(s)) &&
                                    ("fixed" === R(s).position || e(s, i))
                                  );
                                })(e, r))
                        )
                          ? (s = s.filter((e) => e !== r))
                          : (a = t),
                        (r = V(r)));
                    }
                    return (t.set(e, s), s);
                  })(t, this._c)
              : [].concat(i)),
            s,
          ],
          r = n[0],
          o = n.reduce(
            (e, i) => {
              let s = j(t, i, a);
              return (
                (e.top = d(s.top, e.top)),
                (e.right = l(s.right, e.right)),
                (e.bottom = l(s.bottom, e.bottom)),
                (e.left = d(s.left, e.left)),
                e
              );
            },
            j(t, r, a),
          );
        return {
          width: o.right - o.left,
          height: o.bottom - o.top,
          x: o.left,
          y: o.top,
        };
      },
      getOffsetParent: J,
      getElementRects: Y,
      getClientRects: function (e) {
        return Array.from(e.getClientRects());
      },
      getDimensions: function (e) {
        let { width: t, height: i } = N(e);
        return { width: t, height: i };
      },
      getScale: B,
      isElement: b,
      isRTL: function (e) {
        return "rtl" === R(e).direction;
      },
    };
  function ee(e, t) {
    return (
      e.x === t.x && e.y === t.y && e.width === t.width && e.height === t.height
    );
  }
  function et(e, t, i, s) {
    let a;
    void 0 === s && (s = {});
    let {
        ancestorScroll: n = !0,
        ancestorResize: r = !0,
        elementResize: o = "function" == typeof ResizeObserver,
        layoutShift: h = "function" == typeof IntersectionObserver,
        animationFrame: u = !1,
      } = s,
      p = U(e),
      m = n || r ? [...(p ? O(p) : []), ...O(t)] : [];
    m.forEach((e) => {
      (n && e.addEventListener("scroll", i, { passive: !0 }),
        r && e.addEventListener("resize", i));
    });
    let g =
        p && h
          ? (function (e, t) {
              let i,
                s = null,
                a = y(e);
              function n() {
                var e;
                (clearTimeout(i),
                  null == (e = s) || e.disconnect(),
                  (s = null));
              }
              return (
                !(function r(o, h) {
                  (void 0 === o && (o = !1), void 0 === h && (h = 1), n());
                  let u = e.getBoundingClientRect(),
                    { left: p, top: m, width: g, height: f } = u;
                  if ((o || t(), !g || !f)) return;
                  let y = {
                      rootMargin:
                        -c(m) +
                        "px " +
                        -c(a.clientWidth - (p + g)) +
                        "px " +
                        -c(a.clientHeight - (m + f)) +
                        "px " +
                        -c(p) +
                        "px",
                      threshold: d(0, l(1, h)) || 1,
                    },
                    v = !0;
                  function b(t) {
                    let s = t[0].intersectionRatio;
                    if (s !== h) {
                      if (!v) return r();
                      s
                        ? r(!1, s)
                        : (i = setTimeout(() => {
                            r(!1, 1e-7);
                          }, 1e3));
                    }
                    (1 !== s || ee(u, e.getBoundingClientRect()) || r(),
                      (v = !1));
                  }
                  try {
                    s = new IntersectionObserver(b, {
                      ...y,
                      root: a.ownerDocument,
                    });
                  } catch (e) {
                    s = new IntersectionObserver(b, y);
                  }
                  s.observe(e);
                })(!0),
                n
              );
            })(p, i)
          : null,
      f = -1,
      v = null;
    o &&
      ((v = new ResizeObserver((e) => {
        let [s] = e;
        (s &&
          s.target === p &&
          v &&
          (v.unobserve(t),
          cancelAnimationFrame(f),
          (f = requestAnimationFrame(() => {
            var e;
            null == (e = v) || e.observe(t);
          }))),
          i());
      })),
      p && !u && v.observe(p),
      v.observe(t));
    let b = u ? G(e) : null;
    return (
      u &&
        (function t() {
          let s = G(e);
          (b && !ee(b, s) && i(), (b = s), (a = requestAnimationFrame(t)));
        })(),
      i(),
      () => {
        var e;
        (m.forEach((e) => {
          (n && e.removeEventListener("scroll", i),
            r && e.removeEventListener("resize", i));
        }),
          null == g || g(),
          null == (e = v) || e.disconnect(),
          (v = null),
          u && cancelAnimationFrame(a));
      }
    );
  }
  let ei = function (e) {
      return (
        void 0 === e && (e = {}),
        {
          name: "shift",
          options: e,
          async fn(t) {
            let { x: i, y: a, placement: n } = t,
              {
                mainAxis: o = !0,
                crossAxis: h = !1,
                limiter: l = {
                  fn: (e) => {
                    let { x: t, y: i } = e;
                    return { x: t, y: i };
                  },
                },
                ...d
              } = (0, s.h)(e, t),
              u = { x: i, y: a },
              c = await r(t, d),
              p = (0, s.$)((0, s.m)(n)),
              m = (0, s.J)(p),
              g = u[m],
              f = u[p];
            if (o) {
              let e = "y" === m ? "top" : "left",
                t = "y" === m ? "bottom" : "right",
                i = g + c[e],
                a = g - c[t];
              g = (0, s.O)(i, g, a);
            }
            if (h) {
              let e = "y" === p ? "top" : "left",
                t = "y" === p ? "bottom" : "right",
                i = f + c[e],
                a = f - c[t];
              f = (0, s.O)(i, f, a);
            }
            let y = l.fn({ ...t, [m]: g, [p]: f });
            return {
              ...y,
              data: { x: y.x - i, y: y.y - a, enabled: { [m]: o, [p]: h } },
            };
          },
        }
      );
    },
    es = function (e) {
      return (
        void 0 === e && (e = {}),
        {
          name: "flip",
          options: e,
          async fn(t) {
            var i, a, n, o, h;
            let {
                placement: l,
                middlewareData: d,
                rects: u,
                initialPlacement: c,
                platform: p,
                elements: m,
              } = t,
              {
                mainAxis: g = !0,
                crossAxis: f = !0,
                fallbackPlacements: y,
                fallbackStrategy: v = "bestFit",
                fallbackAxisSideDirection: b = "none",
                flipAlignment: w = !0,
                ...k
              } = (0, s.h)(e, t);
            if (null != (i = d.arrow) && i.alignmentOffset) return {};
            let T = (0, s.m)(l),
              x = (0, s.$)(c),
              S = (0, s.m)(c) === c,
              $ = await (null == p.isRTL ? void 0 : p.isRTL(m.floating)),
              C = y || (S || !w ? [(0, s.t)(c)] : (0, s.P)(c)),
              P = "none" !== b;
            !y && P && C.push(...(0, s.K)(c, w, b, $));
            let E = [c, ...C],
              A = await r(t, k),
              q = [],
              M = (null == (a = d.flip) ? void 0 : a.overflows) || [];
            if ((g && q.push(A[T]), f)) {
              let e = (0, s.N)(l, u, $);
              q.push(A[e[0]], A[e[1]]);
            }
            if (
              ((M = [...M, { placement: l, overflows: q }]),
              !q.every((e) => e <= 0))
            ) {
              let e = ((null == (n = d.flip) ? void 0 : n.index) || 0) + 1,
                t = E[e];
              if (
                t &&
                ("alignment" !== f ||
                  x === (0, s.$)(t) ||
                  M.every(
                    (e) => (0, s.$)(e.placement) !== x || e.overflows[0] > 0,
                  ))
              )
                return {
                  data: { index: e, overflows: M },
                  reset: { placement: t },
                };
              let i =
                null ==
                (o = M.filter((e) => e.overflows[0] <= 0).sort(
                  (e, t) => e.overflows[1] - t.overflows[1],
                )[0])
                  ? void 0
                  : o.placement;
              if (!i)
                switch (v) {
                  case "bestFit": {
                    let e =
                      null ==
                      (h = M.filter((e) => {
                        if (P) {
                          let t = (0, s.$)(e.placement);
                          return t === x || "y" === t;
                        }
                        return !0;
                      })
                        .map((e) => [
                          e.placement,
                          e.overflows
                            .filter((e) => e > 0)
                            .reduce((e, t) => e + t, 0),
                        ])
                        .sort((e, t) => e[1] - t[1])[0])
                        ? void 0
                        : h[0];
                    e && (i = e);
                    break;
                  }
                  case "initialPlacement":
                    i = c;
                }
              if (l !== i) return { reset: { placement: i } };
            }
            return {};
          },
        }
      );
    },
    ea = (e, t, i) => {
      let s = new Map(),
        a = { platform: Z, ...i },
        r = { ...a.platform, _c: s };
      return n(e, t, { ...a, platform: r });
    };
  function en(e) {
    return (
      !(0, i.isString)(e) &&
      "width" in e &&
      "height" in e &&
      (0, i.isNumber)(e.width) &&
      (0, i.isNumber)(e.height)
    );
  }
  e.s(
    [
      "n",
      0,
      et,
      "A",
      0,
      ea,
      "x",
      0,
      es,
      "T",
      0,
      function (e) {
        return (
          void 0 === e && (e = 0),
          {
            name: "offset",
            options: e,
            async fn(t) {
              var i, s;
              let { x: a, y: n, placement: r, middlewareData: o } = t,
                l = await h(t, e);
              return r === (null == (i = o.offset) ? void 0 : i.placement) &&
                null != (s = o.arrow) &&
                s.alignmentOffset
                ? {}
                : { x: a + l.x, y: n + l.y, data: { ...l, placement: r } };
            },
          }
        );
      },
      "e",
      0,
      ei,
    ],
    422957,
  );
  let er = "u" < typeof document,
    eo = er ? "" : navigator?.userAgent.toLowerCase() || "",
    eh = !er && /iphone|ipad|ipod|ios|crios|fxios/i.test(eo),
    el = !er && /(iphone|ipod)/gi.test(navigator?.platform || ""),
    ed = !er && !!window.chrome,
    eu = !er && (!!window.safari || eh);
  function ec() {
    return (
      !er &&
      !(0, i.isUndefined)(window.screen.orientation) &&
      !(0, i.isUndefined)(window.screen.orientation.lock) &&
      (0, i.isFunction)(screen.orientation.unlock)
    );
  }
  function ep(e, t) {
    return (
      !er &&
      (e || (e = document.createElement("audio")), e.canPlayType(t).length > 0)
    );
  }
  function em(e, t) {
    return (
      !er &&
      (e || (e = document.createElement("video")), e.canPlayType(t).length > 0)
    );
  }
  function eg(e) {
    return (
      !er &&
      (e || (e = document.createElement("video")),
      e.canPlayType("application/vnd.apple.mpegurl").length > 0)
    );
  }
  function ef(e) {
    return (
      !er && !!document.pictureInPictureEnabled && !e?.disablePictureInPicture
    );
  }
  function ey(e) {
    return (
      !er &&
      (0, i.isFunction)(e?.webkitSupportsPresentationMode) &&
      (0, i.isFunction)(e?.webkitSetPresentationMode)
    );
  }
  async function ev() {
    let e = document.createElement("video");
    return ((e.volume = 0.5), await (0, i.waitTimeout)(0), 0.5 === e.volume);
  }
  function eb() {
    if (er) return !1;
    let e = er
      ? void 0
      : (window?.ManagedMediaSource ??
        window?.MediaSource ??
        window?.WebKitMediaSource);
    if ((0, i.isUndefined)(e)) return !1;
    let t =
        e &&
        (0, i.isFunction)(e.isTypeSupported) &&
        e.isTypeSupported('video/mp4; codecs="avc1.42E01E,mp4a.40.2"'),
      s = er ? void 0 : (window?.SourceBuffer ?? window?.WebKitSourceBuffer),
      a =
        (0, i.isUndefined)(s) ||
        (!(0, i.isUndefined)(s.prototype) &&
          (0, i.isFunction)(s.prototype.appendBuffer) &&
          (0, i.isFunction)(s.prototype.remove));
    return !!t && !!a;
  }
  class ew {
    #e;
    get length() {
      return this.#e.length;
    }
    constructor(e, t) {
      (0, i.isArray)(e)
        ? (this.#e = e)
        : (0, i.isUndefined)(e) || (0, i.isUndefined)(t)
          ? (this.#e = [])
          : (this.#e = [[e, t]]);
    }
    start(e) {
      return this.#e[e][0] ?? 1 / 0;
    }
    end(e) {
      return this.#e[e][1] ?? 1 / 0;
    }
  }
  function ek(e) {
    if (!e.length) return null;
    let t = e.start(0);
    for (let i = 1; i < e.length; i++) {
      let s = e.start(i);
      s < t && (t = s);
    }
    return t;
  }
  function eT(e) {
    if (!e.length) return null;
    let t = e.end(0);
    for (let i = 1; i < e.length; i++) {
      let s = e.end(i);
      s > t && (t = s);
    }
    return t;
  }
  let ex =
      /\.(m4a|m4b|mp4a|mpga|mp2|mp2a|mp3|m2a|m3a|wav|weba|aac|oga|spx|flac)($|\?)/i,
    eS = new Set([
      "audio/mpeg",
      "audio/ogg",
      "audio/3gp",
      "audio/mp3",
      "audio/webm",
      "audio/flac",
      "audio/m4a",
      "audio/m4b",
      "audio/mp4a",
      "audio/mp4",
    ]),
    e$ = /\.(mp4|og[gv]|webm|mov|m4v)(#t=[,\d+]+)?($|\?)/i,
    eC = new Set([
      "video/mp4",
      "video/webm",
      "video/3gp",
      "video/ogg",
      "video/avi",
      "video/mpeg",
    ]),
    eP = /\.(m3u8)($|\?)/i,
    eE = /\.(mpd)($|\?)/i,
    eA = new Set([
      "application/vnd.apple.mpegurl",
      "audio/mpegurl",
      "audio/x-mpegurl",
      "application/x-mpegurl",
      "video/x-mpegurl",
      "video/mpegurl",
      "application/mpegurl",
    ]),
    eq = new Set(["application/dash+xml"]);
  function eM({ src: e, type: t }) {
    return (0, i.isString)(e)
      ? ex.test(e) ||
          eS.has(t) ||
          (e.startsWith("blob:") && "audio/object" === t)
      : "audio/object" === t;
  }
  function eL(e) {
    return (0, i.isString)(e.src)
      ? e$.test(e.src) ||
          eC.has(e.type) ||
          (e.src.startsWith("blob:") && "video/object" === e.type) ||
          (eD(e) && (er || eg()))
      : "video/object" === e.type;
  }
  function eD({ src: e, type: t }) {
    return ((0, i.isString)(e) && eP.test(e)) || eA.has(t);
  }
  function eR({ src: e, type: t }) {
    return ((0, i.isString)(e) && eE.test(e)) || eq.has(t);
  }
  function eI(e) {
    return (0, i.isString)(e.src) && (eM(e) || eL(e) || eD(e));
  }
  function eV(e, t = "preconnect") {
    if (er) return !1;
    let s = document.querySelector(`link[href="${e}"]`);
    if (!(0, i.isNull)(s)) return !0;
    let a = document.createElement("link");
    return (
      (a.rel = t),
      (a.href = e),
      (a.crossOrigin = "true"),
      document.head.append(a),
      !0
    );
  }
  let eO = {};
  function eF(e) {
    if (eO[e]) return eO[e].promise;
    let t = (0, i.deferredPromise)(),
      s = document.querySelector(`script[src="${e}"]`);
    if (!(0, i.isNull)(s)) return (t.resolve(), t.promise);
    eO[e] = t;
    let a = document.createElement("script");
    return (
      (a.src = e),
      (a.onload = () => {
        (t.resolve(), delete eO[e]);
      }),
      (a.onerror = () => {
        (t.reject(), delete eO[e]);
      }),
      setTimeout(() => document.head.append(a), 0),
      t.promise
    );
  }
  function eN(e) {
    return "use-credentials" === e
      ? "include"
      : (0, i.isString)(e)
        ? "same-origin"
        : void 0;
  }
  let eU = {
    crossOrigin: Symbol(0),
    readyState: Symbol(0),
    updateActiveCues: Symbol(0),
    canLoad: Symbol(0),
    onModeChange: Symbol(0),
    native: Symbol(0),
    nativeHLS: Symbol(0),
  };
  function eB(e, t) {
    return t >= e.startTime && t < e.endTime;
  }
  function eK(e, t, s) {
    let a = null,
      n = (0, i.getScope)();
    function r() {
      let r = (0, i.isString)(t) ? [t] : t,
        o = e.toArray().find((e) => r.includes(e.kind) && "showing" === e.mode);
      if (o !== a) {
        if (!o) {
          (s(null), (a = null));
          return;
        }
        (2 == o.readyState
          ? s(o)
          : (s(null),
            (0, i.scoped)(() => {
              let e = (0, i.listenEvent)(
                o,
                "load",
                () => {
                  (s(o), e());
                },
                { once: !0 },
              );
            }, n)),
          (a = o));
      }
    }
    return (r(), (0, i.listenEvent)(e, "mode-change", r));
  }
  class eW extends i.EventsTarget {
    static createId(e) {
      return `vds-${e.type}-${e.kind}-${e.src ?? e.label ?? "?"}`;
    }
    src;
    content;
    type;
    encoding;
    id = "";
    label = "";
    language = "";
    kind;
    default = !1;
    #t = !1;
    #i = 0;
    #s = "disabled";
    #a = {};
    #n = [];
    #r = [];
    #o = [];
    [eU.readyState] = 0;
    [eU.crossOrigin];
    [eU.onModeChange] = null;
    [eU.native] = null;
    get metadata() {
      return this.#a;
    }
    get regions() {
      return this.#n;
    }
    get cues() {
      return this.#r;
    }
    get activeCues() {
      return this.#o;
    }
    get readyState() {
      return this[eU.readyState];
    }
    get mode() {
      return this.#s;
    }
    set mode(e) {
      this.setMode(e);
    }
    constructor(e) {
      for (let t of (super(), Object.keys(e))) this[t] = e[t];
      (this.type || (this.type = "vtt"),
        !er && e.content ? this.#h(e) : e.src || (this[eU.readyState] = 2));
    }
    addCue(e, t) {
      let s = 0,
        a = this.#r.length;
      for (s = 0; s < a && !(e.endTime <= this.#r[s].startTime); s++);
      (s === a ? this.#r.push(e) : this.#r.splice(s, 0, e),
        e instanceof TextTrackCue || this[eU.native]?.track.addCue(e),
        this.dispatchEvent(
          new i.DOMEvent("add-cue", { detail: e, trigger: t }),
        ),
        eB(e, this.#i) && this[eU.updateActiveCues](this.#i, t));
    }
    removeCue(e, t) {
      let s = this.#r.indexOf(e);
      if (s >= 0) {
        let a = this.#o.includes(e);
        (this.#r.splice(s, 1),
          this[eU.native]?.track.removeCue(e),
          this.dispatchEvent(
            new i.DOMEvent("remove-cue", { detail: e, trigger: t }),
          ),
          a && this[eU.updateActiveCues](this.#i, t));
      }
    }
    setMode(e, t) {
      this.#s !== e &&
        ((this.#s = e),
        "disabled" === e
          ? ((this.#o = []), this.#l())
          : 2 === this.readyState
            ? this[eU.updateActiveCues](this.#i, t)
            : this.#d(),
        this.dispatchEvent(
          new i.DOMEvent("mode-change", { detail: this, trigger: t }),
        ),
        this[eU.onModeChange]?.());
    }
    [eU.updateActiveCues](e, t) {
      if (((this.#i = e), "disabled" === this.mode || !this.#r.length)) return;
      let i = [];
      for (let t = 0, s = this.#r.length; t < s; t++) {
        let s = this.#r[t];
        eB(s, e) && i.push(s);
      }
      let s = i.length !== this.#o.length;
      if (!s) {
        for (let e = 0; e < i.length; e++)
          if (!this.#o.includes(i[e])) {
            s = !0;
            break;
          }
      }
      ((this.#o = i), s && this.#l(t));
    }
    [eU.canLoad]() {
      ((this.#t = !0), "disabled" !== this.#s && this.#d());
    }
    #h(t) {
      e.A(305136).then(({ parseText: e, VTTCue: s, VTTRegion: a }) => {
        (0, i.isString)(t.content) && "json" !== t.type
          ? e(t.content, { type: t.type }).then(({ cues: e, regions: t }) => {
              ((this.#r = e), (this.#n = t), this.#u());
            })
          : (this.#c(t.content, s, a), 3 !== this.readyState && this.#u());
      });
    }
    async #d() {
      if (this.#t && !(this[eU.readyState] > 0)) {
        if (
          ((this[eU.readyState] = 1),
          this.dispatchEvent(new i.DOMEvent("load-start")),
          !this.src)
        )
          return void this.#u();
        try {
          let { parseResponse: t, VTTCue: i, VTTRegion: s } = await e.A(305136),
            a = this[eU.crossOrigin]?.(),
            n = fetch(this.src, {
              headers:
                "json" === this.type
                  ? { "Content-Type": "application/json" }
                  : void 0,
              credentials: eN(a),
            });
          if ("json" === this.type) this.#c(await (await n).text(), i, s);
          else {
            let {
              errors: e,
              metadata: i,
              regions: s,
              cues: a,
            } = await t(n, { type: this.type, encoding: this.encoding });
            if (e[0]?.code === 0) throw e[0];
            ((this.#a = i), (this.#n = s), (this.#r = a));
          }
          this.#u();
        } catch (e) {
          this.#p(e);
        }
      }
    }
    #u() {
      if (((this[eU.readyState] = 2), !this.src || "vtt" !== this.type)) {
        let e = this[eU.native];
        if (e && !e.managed) for (let t of this.#r) e.track.addCue(t);
      }
      let e = new i.DOMEvent("load");
      (this[eU.updateActiveCues](this.#i, e), this.dispatchEvent(e));
    }
    #p(e) {
      ((this[eU.readyState] = 3),
        this.dispatchEvent(new i.DOMEvent("error", { detail: e })));
    }
    #c(e, t, s) {
      try {
        var a, n, r;
        let o,
          h,
          l,
          { regions: d, cues: u } =
            ((a = e),
            (n = t),
            (r = s),
            (o = (0, i.isString)(a) ? JSON.parse(a) : a),
            (h = []),
            (l = []),
            o.regions &&
              r &&
              (h = o.regions.map((e) => Object.assign(new r(), e))),
            (o.cues || (0, i.isArray)(o)) &&
              (l = ((0, i.isArray)(o) ? o : o.cues)
                .filter(
                  (e) =>
                    (0, i.isNumber)(e.startTime) && (0, i.isNumber)(e.endTime),
                )
                .map((e) => Object.assign(new n(0, 0, ""), e))),
            { regions: h, cues: l });
        ((this.#n = d), (this.#r = u));
      } catch (e) {
        this.#p(e);
      }
    }
    #l(e) {
      this.dispatchEvent(new i.DOMEvent("cue-change", { trigger: e }));
    }
  }
  let eG = /captions|subtitles/;
  function eQ(e) {
    return eG.test(e.kind);
  }
  let eH = new i.State({
      artist: "",
      artwork: null,
      audioTrack: null,
      audioTracks: [],
      autoPlay: !1,
      autoPlayError: null,
      audioGain: null,
      buffered: new ew(),
      canLoad: !1,
      canLoadPoster: !1,
      canFullscreen: !1,
      canOrientScreen: ec(),
      canPictureInPicture: !1,
      canPlay: !1,
      clipStartTime: 0,
      clipEndTime: 0,
      controls: !1,
      get iOSControls() {
        return (
          el &&
          "video" === this.mediaType &&
          (!this.playsInline ||
            (!i.fscreen.fullscreenEnabled && this.fullscreen))
        );
      },
      get nativeControls() {
        return this.controls || this.iOSControls;
      },
      controlsVisible: !1,
      get controlsHidden() {
        return !this.controlsVisible;
      },
      crossOrigin: null,
      ended: !1,
      error: null,
      fullscreen: !1,
      get loop() {
        return this.providedLoop || this.userPrefersLoop;
      },
      logLevel: "silent",
      mediaType: "unknown",
      muted: !1,
      paused: !0,
      played: new ew(),
      playing: !1,
      playsInline: !1,
      pictureInPicture: !1,
      preload: "metadata",
      playbackRate: 1,
      qualities: [],
      quality: null,
      autoQuality: !1,
      canSetQuality: !0,
      canSetPlaybackRate: !0,
      canSetVolume: !1,
      canSetAudioGain: !1,
      seekable: new ew(),
      seeking: !1,
      source: { src: "", type: "" },
      sources: [],
      started: !1,
      textTracks: [],
      textTrack: null,
      get hasCaptions() {
        return this.textTracks.filter(eQ).length > 0;
      },
      volume: 1,
      waiting: !1,
      realCurrentTime: 0,
      get currentTime() {
        return this.ended
          ? this.duration
          : this.clipStartTime > 0
            ? Math.max(
                0,
                Math.min(
                  this.realCurrentTime - this.clipStartTime,
                  this.duration,
                ),
              )
            : this.realCurrentTime;
      },
      providedDuration: -1,
      intrinsicDuration: 0,
      get duration() {
        return this.seekableWindow;
      },
      get title() {
        return this.providedTitle || this.inferredTitle;
      },
      get poster() {
        return this.providedPoster || this.inferredPoster;
      },
      get viewType() {
        return "unknown" !== this.providedViewType
          ? this.providedViewType
          : this.inferredViewType;
      },
      get streamType() {
        return "unknown" !== this.providedStreamType
          ? this.providedStreamType
          : this.inferredStreamType;
      },
      get currentSrc() {
        return this.source;
      },
      get bufferedStart() {
        return Math.max(ek(this.buffered) ?? 0, this.clipStartTime);
      },
      get bufferedEnd() {
        let e = eT(this.buffered) ?? 0;
        return Math.min(this.seekableEnd, Math.max(0, e - this.clipStartTime));
      },
      get bufferedWindow() {
        return Math.max(0, this.bufferedEnd - this.bufferedStart);
      },
      get seekableStart() {
        return this.isLiveDVR && this.liveDVRWindow > 0
          ? Math.max(0, this.seekableEnd - this.liveDVRWindow)
          : Math.max(ek(this.seekable) ?? 0, this.clipStartTime);
      },
      get seekableEnd() {
        if (this.providedDuration > 0) return this.providedDuration;
        let e =
          this.liveSyncPosition > 0
            ? this.liveSyncPosition
            : this.canPlay
              ? (eT(this.seekable) ?? 1 / 0)
              : 0;
        return this.clipEndTime > 0 ? Math.min(this.clipEndTime, e) : e;
      },
      get seekableWindow() {
        let e = this.seekableEnd - this.seekableStart;
        return isNaN(e) ? 1 / 0 : Math.max(0, e);
      },
      canAirPlay: !1,
      canGoogleCast: !1,
      remotePlaybackState: "disconnected",
      remotePlaybackType: "none",
      remotePlaybackLoader: null,
      remotePlaybackInfo: null,
      get isAirPlayConnected() {
        return (
          "airplay" === this.remotePlaybackType &&
          "connected" === this.remotePlaybackState
        );
      },
      get isGoogleCastConnected() {
        return (
          "google-cast" === this.remotePlaybackType &&
          "connected" === this.remotePlaybackState
        );
      },
      pointer: "fine",
      orientation: "landscape",
      width: 0,
      height: 0,
      mediaWidth: 0,
      mediaHeight: 0,
      lastKeyboardAction: null,
      userBehindLiveEdge: !1,
      liveEdgeTolerance: 10,
      minLiveDVRWindow: 60,
      get canSeek() {
        return (
          /unknown|on-demand|:dvr/.test(this.streamType) &&
          Number.isFinite(this.duration) &&
          (!this.isLiveDVR || this.duration >= this.liveDVRWindow)
        );
      },
      get live() {
        return (
          this.streamType.includes("live") || !Number.isFinite(this.duration)
        );
      },
      get liveEdgeStart() {
        return this.live && Number.isFinite(this.seekableEnd)
          ? Math.max(0, this.seekableEnd - this.liveEdgeTolerance)
          : 0;
      },
      get liveEdge() {
        return (
          this.live &&
          (!this.canSeek ||
            (!this.userBehindLiveEdge &&
              this.currentTime >= this.liveEdgeStart))
        );
      },
      get liveEdgeWindow() {
        return this.live && Number.isFinite(this.seekableEnd)
          ? this.seekableEnd - this.liveEdgeStart
          : 0;
      },
      get isLiveDVR() {
        return /:dvr/.test(this.streamType);
      },
      get liveDVRWindow() {
        return Math.max(this.inferredLiveDVRWindow, this.minLiveDVRWindow);
      },
      autoPlaying: !1,
      providedTitle: "",
      inferredTitle: "",
      providedLoop: !1,
      userPrefersLoop: !1,
      providedPoster: "",
      inferredPoster: "",
      inferredViewType: "unknown",
      providedViewType: "unknown",
      providedStreamType: "unknown",
      inferredStreamType: "unknown",
      liveSyncPosition: null,
      inferredLiveDVRWindow: 0,
      savedState: null,
    }),
    ez = new Set([
      "autoPlayError",
      "autoPlaying",
      "buffered",
      "canPlay",
      "error",
      "paused",
      "played",
      "playing",
      "seekable",
      "seeking",
      "waiting",
    ]),
    ej = new Set([
      ...ez,
      "ended",
      "inferredPoster",
      "inferredStreamType",
      "inferredTitle",
      "intrinsicDuration",
      "inferredLiveDVRWindow",
      "liveSyncPosition",
      "realCurrentTime",
      "savedState",
      "started",
      "userBehindLiveEdge",
    ]);
  function e_(e, t = !1) {
    let s = t ? ez : ej;
    (eH.reset(e, (e) => s.has(e)), (0, i.tick)());
  }
  function eX(e, t) {
    let i = e + t.clipStartTime(),
      s = Math.floor(e) === Math.floor(t.seekableStart()),
      a = Math.floor(i) === Math.floor(t.seekableEnd());
    return s
      ? t.seekableStart()
      : a
        ? t.seekableEnd()
        : t.isLiveDVR() &&
            t.liveDVRWindow() > 0 &&
            i < t.seekableEnd() - t.liveDVRWindow()
          ? t.bufferedStart()
          : Math.min(
              Math.max(t.seekableStart() + 0.1, i),
              t.seekableEnd() - 0.1,
            );
  }
  let eJ = (0, i.createContext)();
  function eY() {
    return (0, i.useContext)(eJ);
  }
  class eZ {
    #m = null;
    #g = null;
    #f = -1;
    #y;
    constructor(e) {
      this.#y = e;
    }
    setTarget(e) {
      this.#m = e;
    }
    getPlayer(e) {
      return (
        this.#g ||
          (e ?? this.#m)?.dispatchEvent(
            new i.DOMEvent("find-media-player", {
              detail: (e) => void (this.#g = e),
              bubbles: !0,
              composed: !0,
            }),
          ),
        this.#g
      );
    }
    setPlayer(e) {
      this.#g = e;
    }
    startLoading(e) {
      this.#v("media-start-loading", e);
    }
    startLoadingPoster(e) {
      this.#v("media-poster-start-loading", e);
    }
    requestAirPlay(e) {
      this.#v("media-airplay-request", e);
    }
    requestGoogleCast(e) {
      this.#v("media-google-cast-request", e);
    }
    play(e) {
      this.#v("media-play-request", e);
    }
    pause(e) {
      this.#v("media-pause-request", e);
    }
    mute(e) {
      this.#v("media-mute-request", e);
    }
    unmute(e) {
      this.#v("media-unmute-request", e);
    }
    enterFullscreen(e, t) {
      this.#v("media-enter-fullscreen-request", t, e);
    }
    exitFullscreen(e, t) {
      this.#v("media-exit-fullscreen-request", t, e);
    }
    lockScreenOrientation(e, t) {
      this.#v("media-orientation-lock-request", t, e);
    }
    unlockScreenOrientation(e) {
      this.#v("media-orientation-unlock-request", e);
    }
    enterPictureInPicture(e) {
      this.#v("media-enter-pip-request", e);
    }
    exitPictureInPicture(e) {
      this.#v("media-exit-pip-request", e);
    }
    seeking(e, t) {
      this.#v("media-seeking-request", t, e);
    }
    seek(e, t) {
      this.#v("media-seek-request", t, e);
    }
    seekToLiveEdge(e) {
      this.#v("media-live-edge-request", e);
    }
    changeDuration(e, t) {
      this.#v("media-duration-change-request", t, e);
    }
    changeClipStart(e, t) {
      this.#v("media-clip-start-change-request", t, e);
    }
    changeClipEnd(e, t) {
      this.#v("media-clip-end-change-request", t, e);
    }
    changeVolume(e, t) {
      this.#v("media-volume-change-request", t, Math.max(0, Math.min(1, e)));
    }
    changeAudioTrack(e, t) {
      this.#v("media-audio-track-change-request", t, e);
    }
    changeQuality(e, t) {
      this.#v("media-quality-change-request", t, e);
    }
    requestAutoQuality(e) {
      this.changeQuality(-1, e);
    }
    changeTextTrackMode(e, t, i) {
      this.#v("media-text-track-change-request", i, { index: e, mode: t });
    }
    changePlaybackRate(e, t) {
      this.#v("media-rate-change-request", t, e);
    }
    changeAudioGain(e, t) {
      this.#v("media-audio-gain-change-request", t, e);
    }
    resumeControls(e) {
      this.#v("media-resume-controls-request", e);
    }
    pauseControls(e) {
      this.#v("media-pause-controls-request", e);
    }
    togglePaused(e) {
      let t = this.getPlayer(e?.target);
      t && (t.state.paused ? this.play(e) : this.pause(e));
    }
    toggleControls(e) {
      let t = this.getPlayer(e?.target);
      t && (t.controls.showing ? t.controls.hide(0, e) : t.controls.show(0, e));
    }
    toggleMuted(e) {
      let t = this.getPlayer(e?.target);
      t && (t.state.muted ? this.unmute(e) : this.mute(e));
    }
    toggleFullscreen(e, t) {
      let i = this.getPlayer(t?.target);
      i &&
        (i.state.fullscreen
          ? this.exitFullscreen(e, t)
          : this.enterFullscreen(e, t));
    }
    togglePictureInPicture(e) {
      let t = this.getPlayer(e?.target);
      t &&
        (t.state.pictureInPicture
          ? this.exitPictureInPicture(e)
          : this.enterPictureInPicture(e));
    }
    showCaptions(e) {
      let t = this.getPlayer(e?.target);
      if (!t) return;
      let i = t.state.textTracks,
        s = this.#f;
      ((i[s] && eQ(i[s])) || (s = -1),
        -1 === s && (s = i.findIndex((e) => eQ(e) && e.default)),
        -1 === s && (s = i.findIndex((e) => eQ(e))),
        s >= 0 && this.changeTextTrackMode(s, "showing", e),
        (this.#f = -1));
    }
    disableCaptions(e) {
      let t = this.getPlayer(e?.target);
      if (!t) return;
      let i = t.state.textTracks,
        s = t.state.textTrack;
      if (s) {
        let t = i.indexOf(s);
        (this.changeTextTrackMode(t, "disabled", e), (this.#f = t));
      }
    }
    toggleCaptions(e) {
      let t = this.getPlayer(e?.target);
      t && (t.state.textTrack ? this.disableCaptions() : this.showCaptions());
    }
    userPrefersLoopChange(e, t) {
      this.#v("media-user-loop-change-request", t, e);
    }
    #v(e, t, s) {
      let a = new i.DOMEvent(e, {
          bubbles: !0,
          composed: !0,
          cancelable: !0,
          detail: s,
          trigger: t,
        }),
        n = t?.target || null;
      (n && n instanceof i.Component && (n = n.el),
        (n =
          !n ||
          n === document ||
          n === window ||
          n === document.body ||
          (this.#g?.el && n instanceof Node && !this.#g.el.contains(n))
            ? (this.#m ?? this.getPlayer()?.el)
            : (n ?? this.#m)),
        this.#g && ("media-play-request" !== e || this.#g.state.canLoad)
          ? this.#g.canPlayQueue.enqueue(e, () => n?.dispatchEvent(a))
          : n?.dispatchEvent(a));
    }
    #b(e) {}
  }
  class e0 {
    playerId = "vds-player";
    mediaId = null;
    #w = {
      volume: null,
      muted: null,
      audioGain: null,
      time: null,
      lang: null,
      captions: null,
      rate: null,
      quality: null,
    };
    async getVolume() {
      return this.#w.volume;
    }
    async setVolume(e) {
      ((this.#w.volume = e), this.save());
    }
    async getMuted() {
      return this.#w.muted;
    }
    async setMuted(e) {
      ((this.#w.muted = e), this.save());
    }
    async getTime() {
      return this.#w.time;
    }
    async setTime(e, t) {
      let i = e < 0;
      ((this.#w.time = i ? null : e),
        i || t ? this.saveTime() : this.saveTimeThrottled());
    }
    async getLang() {
      return this.#w.lang;
    }
    async setLang(e) {
      ((this.#w.lang = e), this.save());
    }
    async getCaptions() {
      return this.#w.captions;
    }
    async setCaptions(e) {
      ((this.#w.captions = e), this.save());
    }
    async getPlaybackRate() {
      return this.#w.rate;
    }
    async setPlaybackRate(e) {
      ((this.#w.rate = e), this.save());
    }
    async getAudioGain() {
      return this.#w.audioGain;
    }
    async setAudioGain(e) {
      ((this.#w.audioGain = e), this.save());
    }
    async getVideoQuality() {
      return this.#w.quality;
    }
    async setVideoQuality(e) {
      ((this.#w.quality = e), this.save());
    }
    onChange(e, t, i = "vds-player") {
      let s = i ? localStorage.getItem(i) : null,
        a = t ? localStorage.getItem(t) : null;
      ((this.playerId = i),
        (this.mediaId = t),
        (this.#w = {
          volume: null,
          muted: null,
          audioGain: null,
          lang: null,
          captions: null,
          rate: null,
          quality: null,
          ...(s ? JSON.parse(s) : {}),
          time: a ? +a : null,
        }));
    }
    save() {
      if (er || !this.playerId) return;
      let e = JSON.stringify({ ...this.#w, time: void 0 });
      localStorage.setItem(this.playerId, e);
    }
    saveTimeThrottled = (0, i.functionThrottle)(this.saveTime.bind(this), 1e3);
    saveTime() {
      if (er || !this.mediaId) return;
      let e = (this.#w.time ?? 0).toString();
      localStorage.setItem(this.mediaId, e);
    }
  }
  let e1 = {
    add: Symbol(0),
    remove: Symbol(0),
    reset: Symbol(0),
    select: Symbol(0),
    readonly: Symbol(0),
    setReadonly: Symbol(0),
    onReset: Symbol(0),
    onRemove: Symbol(0),
    onUserSelect: Symbol(0),
  };
  class e2 extends i.EventsTarget {
    items = [];
    [e1.readonly] = !1;
    get length() {
      return this.items.length;
    }
    get readonly() {
      return this[e1.readonly];
    }
    indexOf(e) {
      return this.items.indexOf(e);
    }
    getById(e) {
      return "" === e ? null : (this.items.find((t) => t.id === e) ?? null);
    }
    toArray() {
      return [...this.items];
    }
    [Symbol.iterator]() {
      return this.items.values();
    }
    [e1.add](e, t) {
      let s = this.items.length;
      ("" + s in this ||
        Object.defineProperty(this, s, {
          get() {
            return this.items[s];
          },
        }),
        this.items.includes(e) ||
          (this.items.push(e),
          this.dispatchEvent(
            new i.DOMEvent("add", { detail: e, trigger: t }),
          )));
    }
    [e1.remove](e, t) {
      let s = this.items.indexOf(e);
      s >= 0 &&
        (this[e1.onRemove]?.(e, t),
        this.items.splice(s, 1),
        this.dispatchEvent(
          new i.DOMEvent("remove", { detail: e, trigger: t }),
        ));
    }
    [e1.reset](e) {
      for (let t of [...this.items]) this[e1.remove](t, e);
      ((this.items = []), this[e1.setReadonly](!1, e), this[e1.onReset]?.());
    }
    [e1.setReadonly](e, t) {
      this[e1.readonly] !== e &&
        ((this[e1.readonly] = e),
        this.dispatchEvent(
          new i.DOMEvent("readonly-change", { detail: e, trigger: t }),
        ));
    }
  }
  let e3 = Symbol(0);
  class e5 extends e2 {
    get selected() {
      return this.items.find((e) => e.selected) ?? null;
    }
    get selectedIndex() {
      return this.items.findIndex((e) => e.selected);
    }
    [e1.onRemove](e, t) {
      this[e1.select](e, !1, t);
    }
    [e1.add](e, t) {
      ((e[e3] = !1),
        Object.defineProperty(e, "selected", {
          get() {
            return this[e3];
          },
          set: (t) => {
            this.readonly || (this[e1.onUserSelect]?.(), this[e1.select](e, t));
          },
        }),
        super[e1.add](e, t));
    }
    [e1.select](e, t, s) {
      if (t === e?.[e3]) return;
      let a = this.selected;
      (e && (e[e3] = t),
        (t ? a !== e : a === e) &&
          (a && (a[e3] = !1),
          this.dispatchEvent(
            new i.DOMEvent("change", {
              detail: { prev: a, current: this.selected },
              trigger: s,
            }),
          )));
    }
  }
  class e4 extends e5 {}
  function e7(e, t = 2) {
    return Number(e.toFixed(t));
  }
  function e6(e) {
    return String(e).split(".")[1]?.length ?? 0;
  }
  function e9(e, t, i) {
    return Math.max(e, Math.min(i, t));
  }
  function e8(e, t) {
    let s = t.composedPath()[0];
    return (0, i.isDOMNode)(s) && e.contains(s);
  }
  let te = new Set();
  if (!er) {
    let e = function () {
      for (let e of te)
        try {
          e();
        } catch (e) {}
      window.requestAnimationFrame(e);
    };
    e();
  }
  function tt(e, t, i) {
    e.hasAttribute(t) || e.setAttribute(t, i);
  }
  function ti(e, t) {
    if (!(e.hasAttribute("aria-label") || e.hasAttribute("data-no-label"))) {
      if (!(0, i.isFunction)(t))
        return void (0, i.setAttribute)(e, "aria-label", t);
      er ? s() : (0, i.effect)(s);
    }
    function s() {
      (0, i.setAttribute)(e, "aria-label", t());
    }
  }
  function ts(e) {
    let t = getComputedStyle(e);
    return "none" !== t.display && parseInt(t.opacity) > 0;
  }
  function ta(e, t) {
    var i;
    return (
      (i = () =>
        t(
          !!e &&
            ("checkVisibility" in e
              ? e.checkVisibility({ checkOpacity: !0, checkVisibilityCSS: !0 })
              : ts(e)),
        )),
      te.add(i),
      () => te.delete(i)
    );
  }
  function tn(e, t, i) {
    for (; t; )
      if (t === e) return !0;
      else if (i?.(t)) break;
      else t = t.parentElement;
    return !1;
  }
  function tr(e, t) {
    return new i.EventsController(e)
      .add("pointerup", (e) => {
        0 !== e.button || e.defaultPrevented || t(e);
      })
      .add("keydown", (e) => {
        (0, i.isKeyboardClick)(e) && t(e);
      });
  }
  function to(e) {
    return (
      (0, i.isTouchEvent)(e) &&
      (e.touches.length > 1 || e.changedTouches.length > 1)
    );
  }
  function th(e) {
    if (er) return e();
    let t = (0, i.getScope)(),
      s = window.requestAnimationFrame(() => {
        ((0, i.scoped)(e, t), (s = -1));
      });
    return () => void window.cancelAnimationFrame(s);
  }
  function tl(e, t, s, { offsetVarName: a, xOffset: n, yOffset: r, ...o }) {
    if (!e) return;
    let h = s.replace(" ", "-").replace("-center", "");
    if (((0, i.setStyle)(e, "visibility", t ? null : "hidden"), !t)) return;
    let l = s.includes("top");
    return et(t, e, () => {
      ea(t, e, {
        placement: h,
        middleware: [
          ...(o.middleware ?? []),
          es({ fallbackAxisSideDirection: "start", crossAxis: !1 }),
          ei(),
        ],
        ...o,
      }).then(({ x: t, y: i, middlewareData: o }) => {
        let h,
          d,
          u = !!o.flip?.index;
        ((l = s.includes(u ? "bottom" : "top")),
          e.setAttribute(
            "data-placement",
            u
              ? s.startsWith("top")
                ? s.replace("top", "bottom")
                : s.replace("bottom", "top")
              : s,
          ),
          Object.assign(e.style, {
            top: `calc(${i + "px"} + ${((h = r ? r + "px" : `var(--${a}-y-offset, 0px)`), l ? `calc(-1 * ${h})` : h)})`,
            left: `calc(${t + "px"} + ${((d = n ? n + "px" : `var(--${a}-x-offset, 0px)`), s.includes("left") ? `calc(-1 * ${d})` : d)})`,
          }));
      });
    });
  }
  function td(e) {
    return e instanceof HTMLElement;
  }
  class tu {
    priority = 0;
    #k = !0;
    #T = null;
    #x = null;
    #S = new Set();
    canRender(e, t) {
      return !!t;
    }
    attach(e) {
      ((this.#T = e), e && (e.textTracks.onchange = this.#$.bind(this)));
    }
    addTrack(e) {
      (this.#S.add(e), this.#C(e));
    }
    removeTrack(e) {
      (e[eU.native]?.remove?.(), (e[eU.native] = null), this.#S.delete(e));
    }
    changeTrack(e) {
      let t = e?.[eU.native];
      (t && "showing" !== t.track.mode && (t.track.mode = "showing"),
        (this.#x = e));
    }
    setDisplay(e) {
      ((this.#k = e), this.#$());
    }
    detach() {
      for (let e of (this.#T && (this.#T.textTracks.onchange = null), this.#S))
        this.removeTrack(e);
      (this.#S.clear(), (this.#T = null), (this.#x = null));
    }
    #C(e) {
      if (!this.#T) return;
      let t = (e[eU.native] ??= this.#P(e));
      td(t) &&
        (this.#T.append(t),
        (t.track.mode = t.default ? "showing" : "disabled"));
    }
    #P(e) {
      let t = document.createElement("track"),
        i = e.default || "showing" === e.mode,
        s = e.src && "vtt" === e.type;
      return (
        (t.id = e.id),
        (t.src = s ? e.src : ""),
        (t.label = e.label),
        (t.kind = e.kind),
        (t.default = i),
        e.language && (t.srclang = e.language),
        i && !s && this.#E(e, t.track),
        t
      );
    }
    #E(e, t) {
      if (!((e.src && "vtt" === e.type) || t.cues?.length))
        for (let i of e.cues) t.addCue(i);
    }
    #$(e) {
      for (let t of this.#S) {
        let i = t[eU.native];
        if (!i) continue;
        if (!this.#k) {
          i.track.mode = i.managed ? "hidden" : "disabled";
          continue;
        }
        let s = "showing" === i.track.mode;
        (s && this.#E(t, i.track), t.setMode(s ? "showing" : "disabled", e));
      }
    }
  }
  class tc {
    #T = null;
    #A;
    #q = [];
    #M;
    #L = !1;
    #D = null;
    #R = null;
    constructor(e) {
      this.#M = e;
      let t = e.textTracks;
      ((this.#A = t),
        (0, i.effect)(this.#I.bind(this)),
        (0, i.onDispose)(this.#V.bind(this)),
        new i.EventsController(t)
          .add("add", this.#O.bind(this))
          .add("remove", this.#F.bind(this))
          .add("mode-change", this.#N.bind(this)));
    }
    #I() {
      let { nativeControls: e } = this.#M.$state;
      ((this.#L = e()), this.#N());
    }
    add(e) {
      (this.#q.push(e), (0, i.untrack)(this.#N.bind(this)));
    }
    remove(e) {
      (e.detach(),
        this.#q.splice(this.#q.indexOf(e), 1),
        (0, i.untrack)(this.#N.bind(this)));
    }
    attachVideo(e) {
      requestAnimationFrame(() => {
        if (((this.#T = e), e))
          for (let t of ((this.#D = new tu()), this.#D.attach(e), this.#A))
            this.#U(t);
        this.#N();
      });
    }
    #U(e) {
      eQ(e) && this.#D?.addTrack(e);
    }
    #B(e) {
      eQ(e) && this.#D?.removeTrack(e);
    }
    #O(e) {
      this.#U(e.detail);
    }
    #F(e) {
      this.#B(e.detail);
    }
    #N() {
      let e = this.#A.selected;
      if (this.#T && (this.#L || e?.[eU.nativeHLS])) {
        (this.#R?.changeTrack(null),
          this.#D?.setDisplay(!0),
          this.#D?.changeTrack(e));
        return;
      }
      if ((this.#D?.setDisplay(!1), this.#D?.changeTrack(null), !e))
        return void this.#R?.changeTrack(null);
      let t = this.#q
        .sort((e, t) => e.priority - t.priority)
        .find((t) => t.canRender(e, this.#T));
      (this.#R !== t &&
        (this.#R?.detach(), t?.attach(this.#T), (this.#R = t ?? null)),
        t?.changeTrack(e));
    }
    #V() {
      (this.#D?.detach(),
        (this.#D = null),
        this.#R?.detach(),
        (this.#R = null));
    }
  }
  class tp extends e2 {
    #t = !1;
    #K = {};
    #W = null;
    #G = null;
    [eU.crossOrigin];
    constructor() {
      super();
    }
    get selected() {
      return this.items.find((e) => "showing" === e.mode && eQ(e)) ?? null;
    }
    get selectedIndex() {
      let e = this.selected;
      return e ? this.indexOf(e) : -1;
    }
    get preferredLang() {
      return this.#G;
    }
    set preferredLang(e) {
      ((this.#G = e), this.#Q(e));
    }
    add(e, t) {
      let i = e instanceof eW ? e : new eW(e),
        s =
          "captions" === e.kind || "subtitles" === e.kind ? "captions" : e.kind;
      return (
        this.#K[s] && e.default && delete e.default,
        i.addEventListener("mode-change", this.#H),
        this[e1.add](i, t),
        (i[eU.crossOrigin] = this[eU.crossOrigin]),
        this.#t && i[eU.canLoad](),
        e.default && (this.#K[s] = i),
        this.#z(),
        this
      );
    }
    remove(e, t) {
      if (((this.#j = e), this.items.includes(e)))
        return (
          e === this.#K[e.kind] && delete this.#K[e.kind],
          (e.mode = "disabled"),
          (e[eU.onModeChange] = null),
          e.removeEventListener("mode-change", this.#H),
          this[e1.remove](e, t),
          (this.#j = null),
          this
        );
    }
    clear(e) {
      for (let t of [...this.items]) this.remove(t, e);
      return this;
    }
    getByKind(e) {
      let t = Array.isArray(e) ? e : [e];
      return this.items.filter((e) => t.includes(e.kind));
    }
    [eU.canLoad]() {
      if (!this.#t) {
        for (let e of this.items) e[eU.canLoad]();
        ((this.#t = !0), this.#z());
      }
    }
    #z = (0, i.functionDebounce)(async () => {
      if (!this.#t) return;
      !this.#G && this.#W && (this.#G = await this.#W.getLang());
      let e = await this.#W?.getCaptions();
      for (let t of [
        ["captions", "subtitles"],
        "chapters",
        "descriptions",
        "metadata",
      ]) {
        let s = this.getByKind(t);
        if (s.find((e) => "showing" === e.mode)) continue;
        let a = this.#G ? s.find((e) => e.language === this.#G) : null,
          n = (0, i.isArray)(t)
            ? this.#K[t.find((e) => this.#K[e]) || ""]
            : this.#K[t],
          r = a ?? n,
          o = r && eQ(r);
        r && (!o || !1 !== e) && ((r.mode = "showing"), o && this.#_(r));
      }
    }, 300);
    #j = null;
    #H = this.#X.bind(this);
    #X(e) {
      let t = e.detail;
      if (
        (this.#W && eQ(t) && t !== this.#j && this.#_(t), "showing" === t.mode)
      ) {
        let e = eQ(t) ? ["captions", "subtitles"] : [t.kind];
        for (let i of this.items)
          "showing" === i.mode &&
            i != t &&
            e.includes(i.kind) &&
            (i.mode = "disabled");
      }
      this.dispatchEvent(
        new i.DOMEvent("mode-change", { detail: e.detail, trigger: e }),
      );
    }
    #_(e) {
      ("disabled" !== e.mode && this.#Q(e.language),
        this.#W?.setCaptions?.("showing" === e.mode));
    }
    #Q(e) {
      this.#W?.setLang?.((this.#G = e));
    }
    setStorage(e) {
      this.#W = e;
    }
  }
  let tm = { setAuto: Symbol(0), enableAuto: Symbol(0) };
  class tg extends e5 {
    #J = !1;
    switch = "current";
    get auto() {
      return this.#J || this.readonly;
    }
    [tm.enableAuto];
    [e1.onUserSelect]() {
      this[tm.setAuto](!1);
    }
    [e1.onReset](e) {
      ((this[tm.enableAuto] = void 0), this[tm.setAuto](!1, e));
    }
    autoSelect(e) {
      this.readonly ||
        this.#J ||
        !this[tm.enableAuto] ||
        (this[tm.enableAuto]?.(e), this[tm.setAuto](!0, e));
    }
    getBySrc(e) {
      return this.items.find((t) => t.src === e);
    }
    [tm.setAuto](e, t) {
      this.#J !== e &&
        ((this.#J = e),
        this.dispatchEvent(
          new i.DOMEvent("auto-change", { detail: e, trigger: t }),
        ));
    }
  }
  function tf(e, t) {
    return [...e].sort(t ? tv : ty);
  }
  function ty(e, t) {
    return e.height === t.height
      ? (e.bitrate ?? 0) - (t.bitrate ?? 0)
      : e.height - t.height;
  }
  function tv(e, t) {
    return t.height === e.height
      ? (t.bitrate ?? 0) - (e.bitrate ?? 0)
      : t.height - e.height;
  }
  class tb extends i.ViewController {}
  let tw = new Set(["Shift", "Alt", "Meta", "Ctrl"]),
    tk =
      'input, textarea, select, [contenteditable], [role^="menuitem"], [role="timer"]';
  class tT extends tb {
    #M;
    constructor(e) {
      (super(), (this.#M = e));
    }
    onConnect() {
      (0, i.effect)(this.#Y.bind(this));
    }
    #Y() {
      let { keyDisabled: e, keyTarget: t } = this.$props;
      if (e()) return;
      let s = "player" === t() ? this.el : document,
        a = (0, i.signal)(!1);
      (s === this.el
        ? new i.EventsController(this.el)
            .add("focusin", () => a.set(!0))
            .add("focusout", (e) => {
              this.el.contains(e.target) || a.set(!1);
            })
        : ((0, i.peek)(a) ||
            a.set(document.querySelector("[data-media-player]") === this.el),
          (0, i.listenEvent)(document, "focusin", (e) => {
            let t = e
              .composedPath()
              .find(
                (e) => e instanceof Element && "media-player" === e.localName,
              );
            void 0 !== t && a.set(this.el === t);
          })),
        (0, i.effect)(() => {
          a() &&
            new i.EventsController(s)
              .add("keyup", this.#Z.bind(this))
              .add("keydown", this.#ee.bind(this))
              .add("keydown", this.#et.bind(this), { capture: !0 });
        }));
    }
    #Z(e) {
      let t = document.activeElement;
      if (!e.key || !this.$state.canSeek() || t?.matches(tk)) return;
      let { method: s, value: a } = this.#ei(e);
      if (!(0, i.isString)(a) && !(0, i.isArray)(a)) {
        (a?.onKeyUp?.({
          event: e,
          player: this.#M.player,
          remote: this.#M.remote,
        }),
          a?.callback?.(e, this.#M.remote));
        return;
      }
      if (
        (s?.startsWith("seek") &&
          (e.preventDefault(),
          e.stopPropagation(),
          this.#es
            ? (this.#ea(e, "seekForward" === s), (this.#es = null))
            : (this.#M.remote.seek(this.#en, e), (this.#en = void 0))),
        s?.startsWith("volume"))
      ) {
        let t = this.el.querySelector("[data-media-volume-slider]");
        t?.dispatchEvent(
          new KeyboardEvent("keyup", {
            key: "volumeUp" === s ? "Up" : "Down",
            shiftKey: e.shiftKey,
            trigger: e,
          }),
        );
      }
    }
    #ee(e) {
      if (!e.key || tw.has(e.key)) return;
      let t = document.activeElement;
      if (
        t?.matches(tk) ||
        ((0, i.isKeyboardClick)(e) && t?.matches('button, [role="button"]'))
      )
        return;
      let { method: s, value: a } = this.#ei(e),
        n = !e.metaKey && /^[0-9]$/.test(e.key);
      if (!(0, i.isString)(a) && !(0, i.isArray)(a) && !n) {
        (a?.onKeyDown?.({
          event: e,
          player: this.#M.player,
          remote: this.#M.remote,
        }),
          a?.callback?.(e, this.#M.remote));
        return;
      }
      if (
        !s &&
        n &&
        !(function (e) {
          for (let t of tw) if (e[t.toLowerCase() + "Key"]) return !0;
          return !1;
        })(e)
      ) {
        (e.preventDefault(),
          e.stopPropagation(),
          this.#M.remote.seek(
            (this.$state.duration() / 10) * Number(e.key),
            e,
          ));
        return;
      }
      if (s) {
        switch ((e.preventDefault(), e.stopPropagation(), s)) {
          case "seekForward":
          case "seekBackward":
            this.#er(e, s, "seekForward" === s);
            break;
          case "volumeUp":
          case "volumeDown":
            let t = this.el.querySelector("[data-media-volume-slider]");
            if (t)
              t.dispatchEvent(
                new KeyboardEvent("keydown", {
                  key: "volumeUp" === s ? "Up" : "Down",
                  shiftKey: e.shiftKey,
                  trigger: e,
                }),
              );
            else {
              let t = e.shiftKey ? 0.1 : 0.05;
              this.#M.remote.changeVolume(
                this.$state.volume() + ("volumeUp" === s ? +t : -t),
                e,
              );
            }
            break;
          case "toggleFullscreen":
            this.#M.remote.toggleFullscreen("prefer-media", e);
            break;
          case "speedUp":
          case "slowDown":
            let i = this.$state.playbackRate();
            this.#M.remote.changePlaybackRate(
              Math.max(0.25, Math.min(2, i + ("speedUp" === s ? 0.25 : -0.25))),
              e,
            );
            break;
          default:
            this.#M.remote[s]?.(e);
        }
        this.$state.lastKeyboardAction.set({ action: s, event: e });
      }
    }
    #et(e) {
      var t, i;
      ((i = t = e.target),
        ((!er && i instanceof HTMLAudioElement) ||
          (!er && t instanceof HTMLVideoElement)) &&
          this.#ei(e).method &&
          e.preventDefault());
    }
    #ei(e) {
      let t = { ...this.$props.keyShortcuts(), ...this.#M.ariaKeys },
        s = Object.keys(t).find((s) => {
          let a = t[s],
            n = (0, i.isArray)(a)
              ? a.join(" ")
              : (0, i.isString)(a)
                ? a
                : a?.keys,
            r = ((0, i.isArray)(n) ? n : n?.split(" "))?.map((e) =>
              e
                .replace(/Shift\+(\d)/g, (e, t) => tx[t - 1])
                .replace(/Control/g, "Ctrl")
                .split("+"),
            );
          return r?.some((t) => {
            let i = new Set(t.filter((e) => tw.has(e)));
            for (let t of tw) {
              let s = t.toLowerCase() + "Key";
              if (!i.has(t) && e[s]) return !1;
            }
            return t.every((t) =>
              tw.has(t)
                ? e[t.toLowerCase() + "Key"]
                : e.key === t.replace("Space", " "),
            );
          });
        });
      return { method: s, value: s ? t[s] : null };
    }
    #en;
    #eo(e, t) {
      let i = e.shiftKey ? 10 : 5;
      return (this.#en = Math.max(
        0,
        Math.min(
          (this.#en ?? this.$state.currentTime()) +
            ("seekForward" === t ? +i : -i),
          this.$state.duration(),
        ),
      ));
    }
    #es = null;
    #ea(e, t) {
      this.#es?.dispatchEvent(
        new KeyboardEvent(e.type, {
          key: t ? "Right" : "Left",
          shiftKey: e.shiftKey,
          trigger: e,
        }),
      );
    }
    #er(e, t, i) {
      this.$state.canSeek() &&
        (this.#es ||
          (this.#es = this.el.querySelector("[data-media-time-slider]")),
        this.#es ? this.#ea(e, i) : this.#M.remote.seeking(this.#eo(e, t), e));
    }
  }
  let tx = ["!", "@", "#", "$", "%", "^", "&", "*", "(", ")"];
  class tS extends i.ViewController {
    #eh;
    constructor(e) {
      (super(), (this.#eh = e));
    }
    onAttach(e) {
      let { $props: t, ariaKeys: s } = eY(),
        a = e.getAttribute("aria-keyshortcuts");
      if (a) {
        ((s[this.#eh] = a),
          er ||
            (0, i.onDispose)(() => {
              delete s[this.#eh];
            }));
        return;
      }
      let n = t.keyShortcuts()[this.#eh];
      if (n) {
        let t = (0, i.isArray)(n)
          ? n.join(" ")
          : (0, i.isString)(n)
            ? n
            : n?.keys;
        e.setAttribute(
          "aria-keyshortcuts",
          (0, i.isArray)(t) ? t.join(" ") : t,
        );
      }
    }
  }
  class t$ extends tb {
    #el = -2;
    #ed = !1;
    #eu = (0, i.signal)(!1);
    #ec = (0, i.signal)(!1);
    #ep = null;
    #em = (0, i.signal)(!0);
    defaultDelay = 2e3;
    get canIdle() {
      return this.#em();
    }
    set canIdle(e) {
      this.#em.set(e);
    }
    get hideOnMouseLeave() {
      let { hideControlsOnMouseLeave: e } = this.$props;
      return this.#eu() || e();
    }
    set hideOnMouseLeave(e) {
      this.#eu.set(e);
    }
    get showing() {
      return this.$state.controlsVisible();
    }
    show(e = 0, t) {
      (this.#eg(), this.#ed || this.#ef(!0, e, t));
    }
    hide(e = this.defaultDelay, t) {
      (this.#eg(), this.#ed || this.#ef(!1, e, t));
    }
    pause(e) {
      ((this.#ed = !0), this.#eg(), this.#ef(!0, 0, e));
    }
    resume(e) {
      ((this.#ed = !1),
        this.$state.paused() || this.#ef(!1, this.defaultDelay, e));
    }
    onConnect() {
      (0, i.effect)(this.#ey.bind(this));
    }
    #ey() {
      let { viewType: e } = this.$state;
      if (!this.el || !this.#em()) return;
      if ("audio" === e()) return void this.show();
      ((0, i.effect)(this.#ev.bind(this)), (0, i.effect)(this.#eb.bind(this)));
      let t = this.#ew.bind(this),
        s = this.#ek.bind(this),
        a = this.#eT.bind(this);
      new i.EventsController(this.el)
        .add("can-play", (e) => this.show(0, e))
        .add("play", t)
        .add("pause", s)
        .add("end", a)
        .add("auto-play-fail", s);
    }
    #ev() {
      if (!this.el) return;
      let { started: e, pointer: t, paused: s } = this.$state;
      if (!e() || "fine" !== t()) return;
      let a = new i.EventsController(this.el),
        n = this.hideOnMouseLeave;
      ((n && this.#ec()) ||
        (0, i.effect)(() => {
          s() || a.add("pointermove", this.#ex.bind(this));
        }),
        n &&
          a
            .add("mouseenter", this.#eS.bind(this))
            .add("mouseleave", this.#e$.bind(this)));
    }
    #eb() {
      let { paused: e, started: t, autoPlayError: s } = this.$state;
      if (e() || (s() && !t())) return;
      let a = this.#ex.bind(this);
      (0, i.effect)(() => {
        if (!this.el) return;
        let e = this.$state.pointer(),
          t = new i.EventsController(this.el);
        for (let i of ["coarse" === e ? "touchend" : "pointerup", "keydown"])
          t.add(i, a, { passive: !1 });
      });
    }
    #ew(e) {
      e.triggers.hasType("ended") || (this.show(0, e), this.hide(void 0, e));
    }
    #ek(e) {
      this.show(0, e);
    }
    #eT(e) {
      let { loop: t } = this.$state;
      t() && this.hide(0, e);
    }
    #eS(e) {
      (this.#ec.set(!1), this.show(0, e), this.hide(void 0, e));
    }
    #e$(e) {
      (this.#ec.set(!0), this.hide(0, e));
    }
    #eg() {
      (window.clearTimeout(this.#el), (this.#el = -1));
    }
    #ex(e) {
      e.MEDIA_GESTURE ||
        this.#ed ||
        to(e) ||
        ((0, i.isKeyboardEvent)(e) &&
          ("Escape" === e.key
            ? (this.el?.focus(), (this.#ep = null))
            : this.#ep &&
              (e.preventDefault(),
              requestAnimationFrame(() => {
                (this.#ep?.focus(), (this.#ep = null));
              }))),
        this.show(0, e),
        this.hide(this.defaultDelay, e));
    }
    #ef(e, t, i) {
      0 === t
        ? this.#$(e, i)
        : (this.#el = window.setTimeout(() => {
            this.scope && this.#$(e && !this.#ed, i);
          }, t));
    }
    #$(e, t) {
      this.$state.controlsVisible() !== e &&
        (this.$state.controlsVisible.set(e),
        !e &&
          document.activeElement &&
          this.el?.contains(document.activeElement) &&
          ((this.#ep = document.activeElement),
          requestAnimationFrame(() => {
            this.el?.focus({ preventScroll: !0 });
          })),
        this.dispatch("controls-change", { detail: e, trigger: t }));
    }
  }
  let tC = i.fscreen.fullscreenEnabled;
  class tP extends i.ViewController {
    #eC = !1;
    #eP = !1;
    get active() {
      return this.#eP;
    }
    get supported() {
      return tC;
    }
    onConnect() {
      (new i.EventsController(i.fscreen)
        .add("fullscreenchange", this.#$.bind(this))
        .add("fullscreenerror", this.#eE.bind(this)),
        (0, i.onDispose)(this.#eA.bind(this)));
    }
    async #eA() {
      tC && (await this.exit());
    }
    #$(e) {
      let t = tE(this.el);
      t !== this.#eP &&
        (t || (this.#eC = !1),
        (this.#eP = t),
        this.dispatch("fullscreen-change", { detail: t, trigger: e }));
    }
    #eE(e) {
      this.#eC &&
        (this.dispatch("fullscreen-error", { detail: null, trigger: e }),
        (this.#eC = !1));
    }
    async enter() {
      try {
        if (((this.#eC = !0), !this.el || tE(this.el))) return;
        return (tA(), i.fscreen.requestFullscreen(this.el));
      } catch (e) {
        throw ((this.#eC = !1), e);
      }
    }
    async exit() {
      if (this.el && tE(this.el)) return (tA(), i.fscreen.exitFullscreen());
    }
  }
  function tE(e) {
    if (i.fscreen.fullscreenElement === e) return !0;
    try {
      return e.matches(i.fscreen.fullscreenPseudoClass);
    } catch (e) {
      return !1;
    }
  }
  function tA() {
    if (!tC) throw Error("[vidstack] no fullscreen API");
  }
  class tq extends i.ViewController {
    #eq = (0, i.signal)(this.#eM());
    #eL = (0, i.signal)(!1);
    #eD;
    get type() {
      return this.#eq();
    }
    get locked() {
      return this.#eL();
    }
    get portrait() {
      return this.#eq().startsWith("portrait");
    }
    get landscape() {
      return this.#eq().startsWith("landscape");
    }
    static supported = ec();
    get supported() {
      return tq.supported;
    }
    onConnect() {
      if (this.supported)
        (0, i.listenEvent)(screen.orientation, "change", this.#eR.bind(this));
      else {
        let e = window.matchMedia("(orientation: landscape)");
        ((e.onchange = this.#eR.bind(this)),
          (0, i.onDispose)(() => (e.onchange = null)));
      }
      (0, i.onDispose)(this.#eA.bind(this));
    }
    async #eA() {
      this.supported && this.#eL() && (await this.unlock());
    }
    #eR(e) {
      (this.#eq.set(this.#eM()),
        this.dispatch("orientation-change", {
          detail: { orientation: (0, i.peek)(this.#eq), lock: this.#eD },
          trigger: e,
        }));
    }
    async lock(e) {
      (0, i.peek)(this.#eL) ||
        this.#eD === e ||
        (this.#eI(),
        await screen.orientation.lock(e),
        this.#eL.set(!0),
        (this.#eD = e));
    }
    async unlock() {
      (0, i.peek)(this.#eL) &&
        (this.#eI(),
        (this.#eD = void 0),
        await screen.orientation.unlock(),
        this.#eL.set(!1));
    }
    #eI() {
      if (!this.supported) throw Error("[vidstack] no orientation API");
    }
    #eM() {
      return er
        ? "portrait-primary"
        : this.supported
          ? window.screen.orientation.type
          : window.innerWidth >= window.innerHeight
            ? "landscape-primary"
            : "portrait-primary";
    }
  }
  class tM {
    name = "audio";
    target;
    canPlay(e) {
      return (
        !!eM(e) &&
        (er ||
          !(0, i.isString)(e.src) ||
          "?" === e.type ||
          ep(this.target, e.type))
      );
    }
    mediaType() {
      return "audio";
    }
    async load(t) {
      if (er) throw Error("[vidstack] can not load audio provider server-side");
      return new (await e.A(447578)).AudioProvider(this.target, t);
    }
  }
  class tL {
    name = "video";
    target;
    canPlay(e) {
      return (
        !!eL(e) &&
        (er ||
          !(0, i.isString)(e.src) ||
          "?" === e.type ||
          em(this.target, e.type))
      );
    }
    mediaType() {
      return "video";
    }
    async load(e) {
      if (er) throw Error("[vidstack] can not load video provider server-side");
      return new (
        await Promise.resolve().then(function () {
          return t1;
        })
      ).VideoProvider(this.target, e);
    }
  }
  class tD extends tL {
    static supported = eb();
    name = "hls";
    canPlay(e) {
      return tD.supported && eD(e);
    }
    async load(t) {
      if (er) throw Error("[vidstack] can not load hls provider server-side");
      return new (await e.A(44830)).HLSProvider(this.target, t);
    }
  }
  let tR = null,
    tI = [],
    tV = [];
  function tO() {
    return (tR ??= new AudioContext());
  }
  function tF() {
    tR &&
      0 === tI.length &&
      0 === tV.length &&
      tR.close().then(() => {
        tR = null;
      });
  }
  class tN {
    #M;
    #$;
    #eV = null;
    #eO = null;
    get currentGain() {
      return this.#eV?.gain?.value ?? null;
    }
    get supported() {
      return !0;
    }
    constructor(e, t) {
      ((this.#M = e), (this.#$ = t));
    }
    setGain(e) {
      let t = this.currentGain;
      if (e !== this.currentGain) {
        var i, s;
        let a;
        if (1 === e && 1 !== t) return void this.removeGain();
        if (!this.#eV) {
          let e, t;
          ((this.#eV =
            ((t = (e = tO()).createGain()).connect(e.destination),
            tI.push(t),
            t)),
            this.#eO && this.#eO.connect(this.#eV));
        }
        (this.#eO ||
          (this.#eO =
            ((i = this.#M),
            (s = this.#eV),
            (a = tO().createMediaElementSource(i)),
            s && a.connect(s),
            tV.push(a),
            a)),
          (this.#eV.gain.value = e),
          this.#$(e));
      }
    }
    removeGain() {
      this.#eV &&
        (this.#eO && this.#eO.connect(tO().destination),
        this.#eF(),
        this.#$(null));
    }
    destroy() {
      (this.#eN(), this.#eF());
    }
    #eN() {
      if (this.#eO)
        try {
          var e;
          let t;
          ((e = this.#eO),
            (t = tV.indexOf(e)),
            -1 !== t && (tV.splice(t, 1), e.disconnect(), tF()));
        } catch (e) {
        } finally {
          this.#eO = null;
        }
    }
    #eF() {
      if (this.#eV)
        try {
          var e;
          let t;
          ((e = this.#eV),
            (t = tI.indexOf(e)),
            -1 !== t && (tI.splice(t, 1), e.disconnect(), tF()));
        } catch (e) {
        } finally {
          this.#eV = null;
        }
    }
  }
  let tU = ["focus", "blur", "visibilitychange", "pageshow", "pagehide"];
  class tB {
    #eU = (0, i.signal)(tK());
    #eB = (0, i.signal)(er ? "visible" : document.visibilityState);
    #eK;
    connect() {
      let e = new i.EventsController(window),
        t = this.#eW.bind(this);
      for (let i of tU) e.add(i, t);
      eu &&
        e.add("beforeunload", (e) => {
          this.#eK = setTimeout(() => {
            e.defaultPrevented ||
              e.returnValue.length > 0 ||
              (this.#eU.set("hidden"), this.#eB.set("hidden"));
          }, 0);
        });
    }
    get pageState() {
      return this.#eU();
    }
    get visibility() {
      return this.#eB();
    }
    #eW(e) {
      (eu && window.clearTimeout(this.#eK),
        ("blur" !== e.type || "active" === this.#eU()) &&
          (this.#eU.set(tK(e)),
          this.#eB.set(
            "hidden" == document.visibilityState ? "hidden" : "visible",
          )));
    }
  }
  function tK(e) {
    return er || e?.type === "blur" || "hidden" === document.visibilityState
      ? "hidden"
      : document.hasFocus()
        ? "active"
        : "passive";
  }
  class tW {
    #eG;
    #eQ;
    constructor(e) {
      this.#eQ = e;
    }
    start() {
      (0, i.isUndefined)(this.#eG) && this.#eH();
    }
    stop() {
      ((0, i.isNumber)(this.#eG) && window.cancelAnimationFrame(this.#eG),
        (this.#eG = void 0));
    }
    #eH() {
      this.#eG = window.requestAnimationFrame(() => {
        (0, i.isUndefined)(this.#eG) || (this.#eQ(), this.#eH());
      });
    }
  }
  class tG {
    #ez;
    #ej;
    #e_ = !1;
    #eX = !1;
    #eJ = !1;
    #eY = new tW(this.#eZ.bind(this));
    #e0 = new tB();
    #e1;
    get #M() {
      return this.#ez.media;
    }
    constructor(e, t) {
      ((this.#ez = e),
        (this.#ej = t),
        (this.#e1 = new i.EventsController(e.media)),
        this.#e2(),
        this.#e0.connect(),
        (0, i.effect)(this.#e3.bind(this)),
        (0, i.onDispose)(this.#e5.bind(this)));
    }
    #e5() {
      ((this.#eX = !1),
        (this.#eJ = !1),
        this.#eY.stop(),
        this.#e1.abort(),
        this.#e4?.clear());
    }
    #e7 = 0;
    #e6 = -1;
    #eZ() {
      let e = this.#M.currentTime;
      (eu && e - this.#e6 < 0.35) ||
        this.#e7 === e ||
        (this.#e9(e), (this.#e7 = e));
    }
    #e2() {
      (this.#e8("loadstart", this.#te),
        this.#e8("abort", this.#tt),
        this.#e8("emptied", this.#ti),
        this.#e8("error", this.#eE),
        this.#e8("volumechange", this.#ts));
    }
    #ta() {
      this.#eX ||
        (this.#e8("loadeddata", this.#tn),
        this.#e8("loadedmetadata", this.#tr),
        this.#e8("canplay", this.#to),
        this.#e8("canplaythrough", this.#th),
        this.#e8("durationchange", this.#tl),
        this.#e8("play", this.#ew),
        this.#e8("progress", this.#td),
        this.#e8("stalled", this.#tu),
        this.#e8("suspend", this.#tc),
        this.#e8("ratechange", this.#tp),
        (this.#eX = !0));
    }
    #tm() {
      this.#eJ ||
        (this.#e8("pause", this.#ek),
        this.#e8("playing", this.#tg),
        this.#e8("seeked", this.#tf),
        this.#e8("seeking", this.#ty),
        this.#e8("ended", this.#tv),
        this.#e8("waiting", this.#tb),
        (this.#eJ = !0));
    }
    #e4 = void 0;
    #tw = void 0;
    #e8(e, t) {
      this.#e1.add(e, t.bind(this));
    }
    #tk(e) {}
    #e9(e, t) {
      let i = Math.min(e, this.#ej.$state.seekableEnd());
      this.#ej.notify("time-change", i, t);
    }
    #te(e) {
      3 === this.#M.networkState
        ? this.#tt(e)
        : (this.#ta(), this.#ej.notify("load-start", void 0, e));
    }
    #tt(e) {
      this.#ej.notify("abort", void 0, e);
    }
    #ti() {
      this.#ej.notify("emptied", void 0, event);
    }
    #tn(e) {
      this.#ej.notify("loaded-data", void 0, e);
    }
    #tr(e) {
      ((this.#e7 = 0),
        (this.#e6 = -1),
        this.#tm(),
        this.#ej.notify("loaded-metadata", void 0, e),
        (eh || (eu && eD(this.#ej.$state.source()))) &&
          this.#ej.delegate.ready(this.#tT(), e));
    }
    #tT() {
      return {
        provider: (0, i.peek)(this.#ej.$provider),
        duration: this.#M.duration,
        buffered: this.#M.buffered,
        seekable: this.#M.seekable,
      };
    }
    #ew(e) {
      this.#ej.$state.canPlay && this.#ej.notify("play", void 0, e);
    }
    #ek(e) {
      (1 !== this.#M.readyState || this.#e_) &&
        ((this.#e_ = !1), this.#eY.stop(), this.#ej.notify("pause", void 0, e));
    }
    #to(e) {
      this.#ej.delegate.ready(this.#tT(), e);
    }
    #th(e) {
      this.#ej.$state.started() ||
        this.#ej.notify("can-play-through", this.#tT(), e);
    }
    #tg(e) {
      this.#M.paused ||
        ((this.#e_ = !1),
        this.#ej.notify("playing", void 0, e),
        this.#eY.start());
    }
    #tu(e) {
      (this.#ej.notify("stalled", void 0, e),
        this.#M.readyState < 3 &&
          ((this.#e_ = !0), this.#ej.notify("waiting", void 0, e)));
    }
    #tb(e) {
      this.#M.readyState < 3 &&
        ((this.#e_ = !0), this.#ej.notify("waiting", void 0, e));
    }
    #tv(e) {
      (this.#eY.stop(),
        this.#e9(this.#M.duration, e),
        this.#ej.notify("end", void 0, e),
        this.#ej.$state.loop() &&
          (0, i.isNil)(this.#M.controls) &&
          (this.#M.controls = !1));
    }
    #e3() {
      let e = this.#ej.$state.paused(),
        t = "hidden" === this.#e0.visibility;
      (e || t) &&
        (0, i.listenEvent)(this.#M, "timeupdate", this.#tx.bind(this));
    }
    #tx(e) {
      this.#e9(this.#M.currentTime, e);
    }
    #tl(e) {
      (this.#ej.$state.ended() && this.#e9(this.#M.duration, e),
        this.#ej.notify("duration-change", this.#M.duration, e));
    }
    #ts(e) {
      let t = { volume: this.#M.volume, muted: this.#M.muted };
      this.#ej.notify("volume-change", t, e);
    }
    #tf(e) {
      ((this.#e6 = this.#M.currentTime),
        this.#e9(this.#M.currentTime, e),
        this.#ej.notify("seeked", this.#M.currentTime, e),
        Math.trunc(this.#M.currentTime) === Math.trunc(this.#M.duration) &&
          e6(this.#M.duration) > e6(this.#M.currentTime) &&
          (this.#e9(this.#M.duration, e),
          this.#M.ended ||
            this.#ej.player.dispatch(
              new i.DOMEvent("media-play-request", { trigger: e }),
            )));
    }
    #ty(e) {
      this.#ej.notify("seeking", this.#M.currentTime, e);
    }
    #td(e) {
      let t = { buffered: this.#M.buffered, seekable: this.#M.seekable };
      this.#ej.notify("progress", t, e);
    }
    #tc(e) {
      this.#ej.notify("suspend", void 0, e);
    }
    #tp(e) {
      this.#ej.notify("rate-change", this.#M.playbackRate, e);
    }
    #eE(e) {
      let t = this.#M.error;
      if (!t) return;
      let i = { message: t.message, code: t.code, mediaError: t };
      this.#ej.notify("error", i, e);
    }
  }
  class tQ {
    #ez;
    #ej;
    get #tS() {
      return this.#ez.media.audioTracks;
    }
    constructor(e, t) {
      ((this.#ez = e),
        (this.#ej = t),
        (this.#tS.onaddtrack = this.#t$.bind(this)),
        (this.#tS.onremovetrack = this.#tC.bind(this)),
        (this.#tS.onchange = this.#tP.bind(this)),
        (0, i.listenEvent)(
          this.#ej.audioTracks,
          "change",
          this.#tE.bind(this),
        ));
    }
    #t$(e) {
      let t = e.track;
      if ("" === t.label) return;
      let i = {
        id: t.id.toString() || `native-audio-${this.#ej.audioTracks.length}`,
        label: t.label,
        language: t.language,
        kind: t.kind,
        selected: !1,
      };
      (this.#ej.audioTracks[e1.add](i, e), t.enabled && (i.selected = !0));
    }
    #tC(e) {
      let t = this.#ej.audioTracks.getById(e.track.id);
      t && this.#ej.audioTracks[e1.remove](t, e);
    }
    #tP(e) {
      let t = this.#tA();
      if (!t) return;
      let i = this.#ej.audioTracks.getById(t.id);
      i && this.#ej.audioTracks[e1.select](i, !0, e);
    }
    #tA() {
      return Array.from(this.#tS).find((e) => e.enabled);
    }
    #tE(e) {
      let { current: t } = e.detail;
      if (!t) return;
      let i = this.#tS.getTrackById(t.id);
      if (i) {
        let e = this.#tA();
        (e && (e.enabled = !1), (i.enabled = !0));
      }
    }
  }
  class tH {
    constructor(e, t) {
      ((this.media = e),
        (this.ctx = t),
        (this.audioGain = new tN(e, (e) => {
          this.ctx.notify("audio-gain-change", e);
        })));
    }
    scope = (0, i.createScope)();
    currentSrc = null;
    audioGain;
    setup() {
      (new tG(this, this.ctx),
        "audioTracks" in this.media && new tQ(this, this.ctx),
        (0, i.onDispose)(() => {
          for (let e of (this.audioGain.destroy(),
          (this.media.srcObject = null),
          this.media.removeAttribute("src"),
          this.media.querySelectorAll("source")))
            e.remove();
          this.media.load();
        }));
    }
    get type() {
      return "";
    }
    setPlaybackRate(e) {
      this.media.playbackRate = e;
    }
    async play() {
      return this.media.play();
    }
    async pause() {
      return this.media.pause();
    }
    setMuted(e) {
      this.media.muted = e;
    }
    setVolume(e) {
      this.media.volume = e;
    }
    setCurrentTime(e) {
      this.media.currentTime = e;
    }
    setPlaysInline(e) {
      (0, i.setAttribute)(this.media, "playsinline", e);
    }
    async loadSource({ src: e, type: t }, s) {
      (((this.media.preload = s || ""),
      !er && void 0 !== window.MediaStream && e instanceof window.MediaStream)
        ? (this.removeSource(), (this.media.srcObject = e))
        : ((this.media.srcObject = null),
          (0, i.isString)(e)
            ? "?" !== t
              ? this.appendSource({ src: e, type: t })
              : (this.removeSource(), (this.media.src = this.#tq(e)))
            : (this.removeSource(),
              (this.media.src = window.URL.createObjectURL(e)))),
        this.media.load(),
        (this.currentSrc = { src: e, type: t }));
    }
    appendSource(e, t) {
      let s = this.media.querySelector("source[data-vds]"),
        a = s ?? document.createElement("source");
      ((0, i.setAttribute)(a, "src", this.#tq(e.src)),
        (0, i.setAttribute)(a, "type", "?" !== e.type ? e.type : t),
        (0, i.setAttribute)(a, "data-vds", ""),
        s || this.media.append(a));
    }
    removeSource() {
      this.media.querySelector("source[data-vds]")?.remove();
    }
    #tq(e) {
      let { clipStartTime: t, clipEndTime: i } = this.ctx.$state,
        s = t(),
        a = i();
      return s > 0 && a > 0
        ? `${e}#t=${s},${a}`
        : s > 0
          ? `${e}#t=${s}`
          : a > 0
            ? `${e}#t=0,${a}`
            : e;
    }
  }
  class tz {
    #M;
    #ej;
    #eU;
    #tM = (0, i.signal)(!1);
    get supported() {
      return this.#tM();
    }
    constructor(e, t) {
      ((this.#M = e), (this.#ej = t), this.#tL());
    }
    #tL() {
      !er &&
        this.#M?.remote &&
        this.canPrompt &&
        (this.#M.remote
          .watchAvailability((e) => {
            this.#tM.set(e);
          })
          .catch(() => {
            this.#tM.set(!1);
          }),
        (0, i.effect)(this.#tD.bind(this)));
    }
    #tD() {
      if (!this.#tM()) return;
      let e = this.#tR.bind(this);
      (e(), (0, i.listenEvent)(this.#M, "playing", e));
      let t = new i.EventsController(this.#M.remote);
      for (let i of ["connecting", "connect", "disconnect"]) t.add(i, e);
    }
    async prompt() {
      if (!this.supported) throw Error("Not supported on this platform.");
      return "airplay" === this.type && this.#M.webkitShowPlaybackTargetPicker
        ? this.#M.webkitShowPlaybackTargetPicker()
        : this.#M.remote.prompt();
    }
    #tR(e) {
      let t = this.#M.remote.state;
      if (t === this.#eU) return;
      let i = { type: this.type, state: t };
      (this.#ej.notify("remote-playback-change", i, e), (this.#eU = t));
    }
  }
  class tj extends tz {
    type = "airplay";
    get canPrompt() {
      return "WebKitPlaybackTargetAvailabilityEvent" in window;
    }
  }
  class t_ {
    #T;
    #ej;
    constructor(e, t) {
      ((this.#T = e),
        (this.#ej = t),
        (e.textTracks.onaddtrack = this.#O.bind(this)),
        (0, i.onDispose)(this.#e5.bind(this)));
    }
    #O(e) {
      var t, i;
      let s = e.track;
      if (
        !s ||
        ((t = this.#T),
        (i = s),
        Array.from(t.children).find((e) => e.track === i))
      )
        return;
      let a = new eW({
        id: s.id,
        kind: s.kind,
        label: s.label ?? "",
        language: s.language,
        type: "vtt",
      });
      ((a[eU.native] = { track: s }),
        (a[eU.readyState] = 2),
        (a[eU.nativeHLS] = !0));
      let n = 0,
        r = (e) => {
          if (s.cues)
            for (let t = n; t < s.cues.length; t++)
              (a.addCue(s.cues[t], e), n++);
        };
      (r(e),
        (s.oncuechange = r),
        this.#ej.textTracks.add(a, e),
        a.setMode(s.mode, e));
    }
    #e5() {
      for (let e of ((this.#T.textTracks.onaddtrack = null),
      this.#ej.textTracks)) {
        let t = e[eU.native]?.track;
        t?.oncuechange && (t.oncuechange = null);
      }
    }
  }
  class tX {
    #T;
    #M;
    constructor(e, t) {
      ((this.#T = e),
        (this.#M = t),
        new i.EventsController(e)
          .add("enterpictureinpicture", this.#tI.bind(this))
          .add("leavepictureinpicture", this.#tV.bind(this)));
    }
    get active() {
      return document.pictureInPictureElement === this.#T;
    }
    get supported() {
      return ef(this.#T);
    }
    async enter() {
      return this.#T.requestPictureInPicture();
    }
    exit() {
      return document.exitPictureInPicture();
    }
    #tI(e) {
      this.#$(!0, e);
    }
    #tV(e) {
      this.#$(!1, e);
    }
    #$ = (e, t) => {
      this.#M.notify("picture-in-picture-change", e, t);
    };
  }
  class tJ {
    #T;
    #M;
    #s = "inline";
    get mode() {
      return this.#s;
    }
    constructor(e, t) {
      ((this.#T = e),
        (this.#M = t),
        (0, i.listenEvent)(
          e,
          "webkitpresentationmodechanged",
          this.#tO.bind(this),
        ));
    }
    get supported() {
      return ey(this.#T);
    }
    async setPresentationMode(e) {
      this.#s !== e && this.#T.webkitSetPresentationMode(e);
    }
    #tO(e) {
      let t = this.#s;
      ((this.#s = this.#T.webkitPresentationMode),
        this.#M.player?.dispatch(
          new i.DOMEvent("video-presentation-change", {
            detail: this.#s,
            trigger: e,
          }),
        ),
        ["fullscreen", "picture-in-picture"].forEach((i) => {
          (this.#s === i || t === i) &&
            this.#M.notify(`${i}-change`, this.#s === i, e);
        }));
    }
  }
  class tY {
    #tF;
    get active() {
      return "fullscreen" === this.#tF.mode;
    }
    get supported() {
      return this.#tF.supported;
    }
    constructor(e) {
      this.#tF = e;
    }
    async enter() {
      this.#tF.setPresentationMode("fullscreen");
    }
    async exit() {
      this.#tF.setPresentationMode("inline");
    }
  }
  class tZ {
    #tF;
    get active() {
      return "picture-in-picture" === this.#tF.mode;
    }
    get supported() {
      return this.#tF.supported;
    }
    constructor(e) {
      this.#tF = e;
    }
    async enter() {
      this.#tF.setPresentationMode("picture-in-picture");
    }
    async exit() {
      this.#tF.setPresentationMode("inline");
    }
  }
  class t0 extends tH {
    $$PROVIDER_TYPE = "VIDEO";
    get type() {
      return "video";
    }
    airPlay;
    fullscreen;
    pictureInPicture;
    constructor(e, t) {
      (super(e, t),
        (0, i.scoped)(() => {
          if (((this.airPlay = new tj(e, t)), ey(e))) {
            let i = new tJ(e, t);
            ((this.fullscreen = new tY(i)),
              (this.pictureInPicture = new tZ(i)));
          } else ef(e) && (this.pictureInPicture = new tX(e, t));
        }, this.scope));
    }
    setup() {
      (super.setup(),
        eg(this.video) && new t_(this.video, this.ctx),
        this.ctx.textRenderers.attachVideo(this.video),
        (0, i.onDispose)(() => {
          this.ctx.textRenderers.attachVideo(null);
        }),
        "video" === this.type && this.ctx.notify("provider-setup", this));
    }
    get video() {
      return this.media;
    }
  }
  var t1 = Object.freeze({ __proto__: null, VideoProvider: t0 });
  function t2(e) {
    try {
      return (
        new Intl.DisplayNames(navigator.languages, { type: "language" }).of(
          e,
        ) ?? null
      );
    } catch (e) {
      return null;
    }
  }
  class t3 {
    #T;
    #ej;
    #tN = null;
    #tU = new Set();
    #tB = null;
    config = {};
    get instance() {
      return this.#tN;
    }
    constructor(e, t) {
      ((this.#T = e), (this.#ej = t));
    }
    setup(e) {
      this.#tN = e().create();
      let t = this.#tK.bind(this);
      for (let i of Object.values(e.events)) this.#tN.on(i, t);
      for (let t of (this.#tN.on(e.events.ERROR, this.#eE.bind(this)),
      this.#tU))
        t(this.#tN);
      (this.#ej.player.dispatch("dash-instance", { detail: this.#tN }),
        this.#tN.initialize(this.#T, void 0, !1),
        this.#tN.updateSettings({
          streaming: {
            text: { defaultEnabled: !1, dispatchForManualRendering: !0 },
            buffer: { fastSwitchEnabled: !0 },
          },
          ...this.config,
        }),
        this.#tN.on(e.events.FRAGMENT_LOADING_STARTED, this.#tW.bind(this)),
        this.#tN.on(e.events.FRAGMENT_LOADING_COMPLETED, this.#tG.bind(this)),
        this.#tN.on(e.events.MANIFEST_LOADED, this.#tQ.bind(this)),
        this.#tN.on(e.events.QUALITY_CHANGE_RENDERED, this.#tH.bind(this)),
        this.#tN.on(e.events.TEXT_TRACKS_ADDED, this.#tz.bind(this)),
        this.#tN.on(e.events.TRACK_CHANGE_RENDERED, this.#tj.bind(this)),
        (this.#ej.qualities[tm.enableAuto] = this.#t_.bind(this)),
        (0, i.listenEvent)(this.#ej.qualities, "change", this.#tX.bind(this)),
        (0, i.listenEvent)(this.#ej.audioTracks, "change", this.#tJ.bind(this)),
        (this.#tB = (0, i.effect)(this.#tY.bind(this))));
    }
    #tZ(e) {
      let t;
      return new i.DOMEvent(
        ((t = e.type), `dash-${(0, i.camelToKebabCase)(t)}`),
        { detail: e },
      );
    }
    #tY() {
      if (!this.#ej.$state.live()) return;
      let e = new tW(this.#t0.bind(this));
      return (e.start(), e.stop.bind(e));
    }
    #t0() {
      if (!this.#tN) return;
      let e = this.#tN.duration() - this.#tN.time();
      this.#ej.$state.liveSyncPosition.set(isNaN(e) ? 1 / 0 : e);
    }
    #tK(e) {
      this.#ej.player?.dispatch(this.#tZ(e));
    }
    #t1 = null;
    #t2 = {};
    #t3(e) {
      let t = this.#t1?.[eU.native],
        i = (t?.track).cues;
      if (!t || !i) return;
      let s = this.#t1.id,
        a = this.#t2[s] ?? 0,
        n = this.#tZ(e);
      for (let e = a; e < i.length; e++) {
        let t = i[e];
        (t.positionAlign || (t.positionAlign = "auto"), this.#t1.addCue(t, n));
      }
      this.#t2[s] = i.length;
    }
    #tz(e) {
      if (!this.#tN) return;
      let t = e.tracks,
        i = [...this.#T.textTracks].filter((e) => "manualMode" in e),
        s = this.#tZ(e);
      for (let e = 0; e < i.length; e++) {
        let a = t[e],
          n = i[e],
          r = new eW({
            id: `dash-${a.kind}-${e}`,
            label:
              a?.label ??
              a.labels.find((e) => e.text)?.text ??
              (a?.lang && t2(a.lang)) ??
              a?.lang ??
              void 0,
            language: a.lang ?? void 0,
            kind: a.kind,
            default: a.defaultTrack,
          });
        ((r[eU.native] = { managed: !0, track: n }),
          (r[eU.readyState] = 2),
          (r[eU.onModeChange] = () => {
            this.#tN &&
              ("showing" === r.mode
                ? (this.#tN.setTextTrack(e), (this.#t1 = r))
                : (this.#tN.setTextTrack(-1), (this.#t1 = null)));
          }),
          this.#ej.textTracks.add(r, s));
      }
    }
    #tj(e) {
      let { mediaType: t, newMediaInfo: i } = e;
      if ("audio" === t) {
        let t = this.#ej.audioTracks.getById(`dash-audio-${i.index}`);
        if (t) {
          let i = this.#tZ(e);
          this.#ej.audioTracks[e1.select](t, !0, i);
        }
      }
    }
    #tH(e) {
      if ("video" !== e.mediaType) return;
      let t = this.#ej.qualities[e.newQuality];
      if (t) {
        let i = this.#tZ(e);
        this.#ej.qualities[e1.select](t, !0, i);
      }
    }
    #tQ(e) {
      if (this.#ej.$state.canPlay() || !this.#tN) return;
      let { type: t, mediaPresentationDuration: s } = e.data,
        a = this.#tZ(e);
      (this.#ej.notify(
        "stream-type-change",
        "static" !== t ? "live" : "on-demand",
        a,
      ),
        this.#ej.notify("duration-change", s, a),
        this.#ej.qualities[tm.setAuto](!0, a));
      let n = this.#tN.getVideoElement(),
        r = this.#tN.getTracksForTypeFromManifest("video", e.data),
        o = [...new Set(r.map((e) => e.mimeType))].find((e) => e && em(n, e)),
        h = r.filter((e) => o === e.mimeType)[0],
        l = this.#tN.getTracksForTypeFromManifest("audio", e.data),
        d = [...new Set(l.map((e) => e.mimeType))].find((e) => e && ep(n, e));
      if (
        ((l = l.filter((e) => d === e.mimeType)),
        h.bitrateList.forEach((e, t) => {
          let i = {
            id: e.id?.toString() ?? `dash-bitrate-${t}`,
            width: e.width ?? 0,
            height: e.height ?? 0,
            bitrate: e.bandwidth ?? 0,
            codec: h.codec,
            index: t,
          };
          this.#ej.qualities[e1.add](i, a);
        }),
        (0, i.isNumber)(h.index))
      ) {
        let e = this.#ej.qualities[h.index];
        e && this.#ej.qualities[e1.select](e, !0, a);
      }
      (l.forEach((e, t) => {
        let i =
            e.labels.find((e) =>
              navigator.languages.some(
                (t) =>
                  e.lang && t.toLowerCase().startsWith(e.lang.toLowerCase()),
              ),
            ) || e.labels[0],
          s = {
            id: `dash-audio-${e?.index}`,
            label: i?.text ?? (e.lang && t2(e.lang)) ?? e.lang ?? "",
            language: e.lang ?? "",
            kind: "main",
            mimeType: e.mimeType,
            codec: e.codec,
            index: t,
          };
        this.#ej.audioTracks[e1.add](s, a);
      }),
        n.dispatchEvent(new i.DOMEvent("canplay", { trigger: a })));
    }
    #eE(e) {
      let { type: t, error: i } = e;
      27 === i.code ? this.#t5(i) : this.#t4(i);
    }
    #tW() {
      this.#t7 >= 0 && this.#t6();
    }
    #tG(e) {
      "text" === e.mediaType && requestAnimationFrame(this.#t3.bind(this, e));
    }
    #t7 = -1;
    #t5(e) {
      (this.#t6(),
        this.#tN?.play(),
        (this.#t7 = window.setTimeout(() => {
          ((this.#t7 = -1), this.#t4(e));
        }, 5e3)));
    }
    #t6() {
      (clearTimeout(this.#t7), (this.#t7 = -1));
    }
    #t4(e) {
      this.#ej.notify("error", { message: e.message ?? "", code: 1, error: e });
    }
    #t_() {
      this.#t9("video", !0);
      let { qualities: e } = this.#ej;
      this.#tN?.setQualityFor("video", e.selectedIndex, !0);
    }
    #t9(e, t) {
      this.#tN?.updateSettings({
        streaming: { abr: { autoSwitchBitrate: { [e]: t } } },
      });
    }
    #tX() {
      let { qualities: e } = this.#ej;
      this.#tN &&
        !e.auto &&
        e.selected &&
        (this.#t9("video", !1),
        this.#tN.setQualityFor(
          "video",
          e.selectedIndex,
          "current" === e.switch,
        ),
        ed && (this.#T.currentTime = this.#T.currentTime));
    }
    #tJ() {
      if (!this.#tN) return;
      let { audioTracks: e } = this.#ej,
        t = this.#tN
          .getTracksFor("audio")
          .find((t) => e.selected && e.selected.id === `dash-audio-${t.index}`);
      t && this.#tN.setCurrentTrack(t);
    }
    #t8() {
      (this.#t6(), (this.#t1 = null), (this.#t2 = {}));
    }
    onInstance(e) {
      return (this.#tU.add(e), () => this.#tU.delete(e));
    }
    loadSource(e) {
      (this.#t8(), (0, i.isString)(e.src) && this.#tN?.attachSource(e.src));
    }
    destroy() {
      (this.#t8(),
        this.#tN?.destroy(),
        (this.#tN = null),
        this.#tB?.(),
        (this.#tB = null));
    }
  }
  function t5(e) {
    return e instanceof Error
      ? e
      : Error("string" == typeof e ? e : JSON.stringify(e));
  }
  function t4(e, t) {
    if (!e) throw Error("Assertion failed.");
  }
  class t7 {
    #ie;
    #ej;
    #eQ;
    constructor(e, t, i) {
      ((this.#ie = e), (this.#ej = t), (this.#eQ = i), this.#it());
    }
    async #it() {
      let e = {
          onLoadStart: this.#te.bind(this),
          onLoaded: this.#ii.bind(this),
          onLoadError: this.#is.bind(this),
        },
        t = await t9(this.#ie, e);
      return ((0, i.isUndefined)(t) &&
        !(0, i.isString)(this.#ie) &&
        (t = await t6(this.#ie, e)),
      t)
        ? window.dashjs.supportsMediaSource()
          ? t
          : (this.#ej.player.dispatch(new i.DOMEvent("dash-unsupported")),
            this.#ej.notify("error", {
              message:
                "[vidstack] `dash.js` is not supported in this environment",
              code: 4,
            }),
            null)
        : null;
    }
    #te() {
      this.#ej.player.dispatch(new i.DOMEvent("dash-lib-load-start"));
    }
    #ii(e) {
      (this.#ej.player.dispatch(
        new i.DOMEvent("dash-lib-loaded", { detail: e }),
      ),
        this.#eQ(e));
    }
    #is(e) {
      let t = t5(e);
      (this.#ej.player.dispatch(
        new i.DOMEvent("dash-lib-load-error", { detail: t }),
      ),
        this.#ej.notify("error", { message: t.message, code: 4, error: t }));
    }
  }
  async function t6(e, t = {}) {
    if (!(0, i.isUndefined)(e)) {
      var s;
      if (
        (t.onLoadStart?.(), (s = e) && s.prototype && s.prototype !== Function)
      )
        return (t.onLoaded?.(e), e);
      if (t8(e)) {
        let i = e.MediaPlayer;
        return (t.onLoaded?.(i), i);
      }
      try {
        let i = (await e())?.default;
        if (t8(i)) return (t.onLoaded?.(i.MediaPlayer), i.MediaPlayer);
        if (i) t.onLoaded?.(i);
        else throw Error("");
        return i;
      } catch (e) {
        t.onLoadError?.(e);
      }
    }
  }
  async function t9(e, t = {}) {
    if ((0, i.isString)(e)) {
      t.onLoadStart?.();
      try {
        if ((await eF(e), !(0, i.isFunction)(window.dashjs.MediaPlayer)))
          throw Error("");
        let s = window.dashjs.MediaPlayer;
        return (t.onLoaded?.(s), s);
      } catch (e) {
        t.onLoadError?.(e);
      }
    }
  }
  function t8(e) {
    return e && "MediaPlayer" in e;
  }
  class ie extends t0 {
    $$PROVIDER_TYPE = "DASH";
    #ia = null;
    #ir = new t3(this.video, this.ctx);
    get ctor() {
      return this.#ia;
    }
    get instance() {
      return this.#ir.instance;
    }
    static supported = eb();
    get type() {
      return "dash";
    }
    get canLiveSync() {
      return !0;
    }
    #io = "https://cdn.jsdelivr.net/npm/dashjs@4.7.4/dist/dash.all.min.js";
    get config() {
      return this.#ir.config;
    }
    set config(e) {
      this.#ir.config = e;
    }
    get library() {
      return this.#io;
    }
    set library(e) {
      this.#io = e;
    }
    preconnect() {
      (0, i.isString)(this.#io) && eV(this.#io);
    }
    setup() {
      (super.setup(),
        new t7(this.#io, this.ctx, (e) => {
          ((this.#ia = e),
            this.#ir.setup(e),
            this.ctx.notify("provider-setup", this));
          let t = (0, i.peek)(this.ctx.$state.source);
          t && this.loadSource(t);
        }));
    }
    async loadSource(e, t) {
      (0, i.isString)(e.src)
        ? ((this.media.preload = t || ""),
          this.appendSource(e, "application/x-mpegurl"),
          this.#ir.loadSource(e),
          (this.currentSrc = e))
        : this.removeSource();
    }
    onInstance(e) {
      let t = this.#ir.instance;
      return (t && e(t), this.#ir.onInstance(e));
    }
    destroy() {
      this.#ir.destroy();
    }
  }
  var it = Object.freeze({ __proto__: null, DASHProvider: ie });
  class ii extends tL {
    static supported = eb();
    name = "dash";
    canPlay(e) {
      return ii.supported && eR(e);
    }
    async load(e) {
      if (er) throw Error("[vidstack] can not load dash provider server-side");
      return new (
        await Promise.resolve().then(function () {
          return it;
        })
      ).DASHProvider(this.target, e);
    }
  }
  class is {
    name = "vimeo";
    target;
    preconnect() {
      for (let e of [
        "https://i.vimeocdn.com",
        "https://f.vimeocdn.com",
        "https://fresnel.vimeocdn.com",
      ])
        eV(e);
    }
    canPlay(e) {
      return (0, i.isString)(e.src) && "video/vimeo" === e.type;
    }
    mediaType() {
      return "video";
    }
    async load(t) {
      if (er) throw Error("[vidstack] can not load vimeo provider server-side");
      return new (await e.A(167307)).VimeoProvider(this.target, t);
    }
    async loadPoster(t, s, a) {
      let { resolveVimeoVideoId: n, getVimeoVideoInfo: r } = await e.A(541462);
      if (!(0, i.isString)(t.src)) return null;
      let { videoId: o, hash: h } = n(t.src);
      return o ? r(o, a, h).then((e) => (e ? e.poster : null)) : null;
    }
  }
  class ia {
    name = "youtube";
    target;
    preconnect() {
      for (let e of [
        "https://www.google.com",
        "https://i.ytimg.com",
        "https://googleads.g.doubleclick.net",
        "https://static.doubleclick.net",
      ])
        eV(e);
    }
    canPlay(e) {
      return (0, i.isString)(e.src) && "video/youtube" === e.type;
    }
    mediaType() {
      return "video";
    }
    async load(t) {
      if (er)
        throw Error("[vidstack] can not load youtube provider server-side");
      return new (await e.A(783219)).YouTubeProvider(this.target, t);
    }
    async loadPoster(t, s, a) {
      let { findYouTubePoster: n, resolveYouTubeVideoId: r } =
          await e.A(833511),
        o = (0, i.isString)(t.src) && r(t.src);
      return o ? n(o, a) : null;
    }
  }
  function ir(e, t) {
    let i = String(e),
      s = i.length;
    if (s < t) {
      let i = "0".repeat(t - s);
      return `${i}${e}`;
    }
    return i;
  }
  function io(e) {
    let t = Math.trunc(e / 3600),
      i = Math.trunc((e % 3600) / 60);
    return {
      hours: t,
      minutes: i,
      seconds: Math.trunc(e % 60),
      fraction: Number((e - Math.trunc(e)).toPrecision(3)),
    };
  }
  function ih(
    e,
    {
      padHrs: t = null,
      padMins: s = null,
      showHrs: a = !1,
      showMs: n = !1,
    } = {},
  ) {
    let { hours: r, minutes: o, seconds: h, fraction: l } = io(e),
      d = t ? ir(r, 2) : r,
      u = s || ((0, i.isNull)(s) && e >= 3600) ? ir(o, 2) : o,
      c = ir(h, 2),
      p = n && l > 0 ? `.${String(l).replace(/^0?\./, "")}` : "",
      m = `${u}:${c}${p}`;
    return r > 0 || a ? `${d}:${m}` : m;
  }
  function il(e) {
    let t = [],
      { hours: i, minutes: s, seconds: a } = io(e);
    return (
      i > 0 && t.push(`${i} hour`),
      s > 0 && t.push(`${s} min`),
      (a > 0 || 0 === t.length) && t.push(`${a} sec`),
      t.join(" ")
    );
  }
  let id = Symbol(0),
    iu = [
      "autoPlay",
      "canAirPlay",
      "canFullscreen",
      "canGoogleCast",
      "canLoad",
      "canLoadPoster",
      "canPictureInPicture",
      "canPlay",
      "canSeek",
      "ended",
      "fullscreen",
      "isAirPlayConnected",
      "isGoogleCastConnected",
      "live",
      "liveEdge",
      "loop",
      "mediaType",
      "muted",
      "paused",
      "pictureInPicture",
      "playing",
      "playsInline",
      "remotePlaybackState",
      "remotePlaybackType",
      "seeking",
      "started",
      "streamType",
      "viewType",
      "waiting",
    ],
    ic = {
      artist: "",
      artwork: null,
      autoplay: !1,
      autoPlay: !1,
      clipStartTime: 0,
      clipEndTime: 0,
      controls: !1,
      currentTime: 0,
      crossorigin: null,
      crossOrigin: null,
      duration: -1,
      fullscreenOrientation: "landscape",
      googleCast: {},
      load: "visible",
      posterLoad: "visible",
      logLevel: "silent",
      loop: !1,
      muted: !1,
      paused: !0,
      playsinline: !1,
      playsInline: !1,
      playbackRate: 1,
      poster: "",
      preload: "metadata",
      preferNativeHLS: !1,
      src: "",
      title: "",
      controlsDelay: 2e3,
      hideControlsOnMouseLeave: !1,
      viewType: "unknown",
      streamType: "unknown",
      volume: 1,
      liveEdgeTolerance: 10,
      minLiveDVRWindow: 60,
      keyDisabled: !1,
      keyTarget: "player",
      keyShortcuts: {
        togglePaused: "k Space",
        toggleMuted: "m",
        toggleFullscreen: "f",
        togglePictureInPicture: "i",
        toggleCaptions: "c",
        seekBackward: "j J ArrowLeft",
        seekForward: "l L ArrowRight",
        volumeUp: "ArrowUp",
        volumeDown: "ArrowDown",
        speedUp: ">",
        slowDown: "<",
      },
      storage: null,
    };
  class ip extends tb {
    #eq;
    #eQ;
    constructor(e, t) {
      (super(), (this.#eq = e), (this.#eQ = t));
    }
    async onAttach(e) {
      if (er) return;
      let t = this.$props[this.#eq]();
      if ("eager" === t) requestAnimationFrame(this.#eQ);
      else if ("idle" === t) (0, i.waitIdlePeriod)(this.#eQ);
      else if ("visible" === t) {
        let t,
          s = new IntersectionObserver((e) => {
            this.scope &&
              e[0].isIntersecting &&
              (t?.(), (t = void 0), this.#eQ());
          });
        (s.observe(e), (t = (0, i.onDispose)(() => s.disconnect())));
      }
    }
  }
  class im {
    #ih;
    #M;
    constructor(e, t) {
      ((this.#ih = e), (this.#M = t));
    }
    notify(e, ...t) {
      er || this.#ih(new i.DOMEvent(e, { detail: t?.[0], trigger: t?.[1] }));
    }
    async ready(e, t) {
      if (!er)
        return (0, i.untrack)(async () => {
          let { logger: s } = this.#M,
            {
              autoPlay: a,
              canPlay: n,
              started: r,
              duration: o,
              seekable: h,
              buffered: l,
              remotePlaybackInfo: d,
              playsInline: u,
              savedState: c,
              source: p,
            } = this.#M.$state;
          if (n()) return;
          let m = {
            duration: e?.duration ?? o(),
            seekable: e?.seekable ?? h(),
            buffered: e?.buffered ?? l(),
            provider: this.#M.$provider(),
          };
          (this.notify("can-play", m, t), (0, i.tick)());
          let g = this.#M.$provider(),
            { storage: f, qualities: y } = this.#M,
            {
              muted: v,
              volume: b,
              clipStartTime: w,
              playbackRate: k,
            } = this.#M.$props;
          await f?.onLoad?.(p());
          let T = c()?.currentTime,
            x = c()?.paused,
            S = await f?.getTime(),
            $ = T ?? S ?? w(),
            C = !1 === x || (!0 !== x && !r() && a());
          if (g) {
            (g.setVolume((await f?.getVolume()) ?? b()),
              g.setMuted(v() || !!(await f?.getMuted())));
            let e = (await f?.getAudioGain()) ?? 1;
            (e > 1 && g.audioGain?.setGain?.(e),
              g.setPlaybackRate?.((await f?.getPlaybackRate()) ?? k()),
              g.setPlaysInline?.(u()),
              $ > 0 && g.setCurrentTime($));
          }
          let P = await f?.getVideoQuality();
          if (P && y.length) {
            let e = null,
              t = 1 / 0;
            for (let i of y) {
              let s =
                Math.abs(P.width - i.width) +
                Math.abs(P.height - i.height) +
                (P.bitrate ? Math.abs(P.bitrate - (i.bitrate ?? 0)) : 0);
              s < t && ((e = i), (t = s));
            }
            e && (e.selected = !0);
          }
          (n() && C
            ? await this.#il(t)
            : S && S > 0 && this.notify("started", void 0, t),
            d.set(null));
        });
    }
    async #il(e) {
      let {
        player: t,
        $state: { autoPlaying: s, muted: a },
      } = this.#M;
      s.set(!0);
      let n = new i.DOMEvent("auto-play-attempt", { trigger: e });
      try {
        await t.play(n);
      } catch (e) {}
    }
  }
  class ig {
    #id = new Map();
    enqueue(e, t) {
      this.#id.set(e, t);
    }
    serve(e) {
      let t = this.peek(e);
      return (this.#id.delete(e), t);
    }
    peek(e) {
      return this.#id.get(e);
    }
    delete(e) {
      this.#id.delete(e);
    }
    clear() {
      this.#id.clear();
    }
  }
  class iy {
    #iu = !1;
    #ic = (0, i.deferredPromise)();
    #id = new Map();
    get size() {
      return this.#id.size;
    }
    get isServing() {
      return this.#iu;
    }
    async waitForFlush() {
      this.#iu || (await this.#ic.promise);
    }
    enqueue(e, t) {
      this.#iu ? t() : (this.#id.delete(e), this.#id.set(e, t));
    }
    serve(e) {
      (this.#id.get(e)?.(), this.#id.delete(e));
    }
    start() {
      (this.#ip(), (this.#iu = !0), this.#id.size > 0 && this.#ip());
    }
    stop() {
      this.#iu = !1;
    }
    reset() {
      (this.stop(), this.#id.clear(), this.#im());
    }
    #ip() {
      for (let e of this.#id.keys()) this.serve(e);
      this.#im();
    }
    #im() {
      (this.#ic.resolve(), (this.#ic = (0, i.deferredPromise)()));
    }
  }
  function iv(e) {
    return () => (e() ? "true" : "false");
  }
  class ib extends tb {
    #ig;
    #iy;
    #M;
    controls;
    #iv;
    #ib;
    #iw;
    #ik = new iy();
    constructor(e, t, i) {
      (super(),
        (this.#ig = e),
        (this.#iy = t),
        (this.#M = i),
        (this.#iw = i.$provider),
        (this.controls = new t$()),
        (this.#iv = new tP()),
        (this.#ib = new tq()));
    }
    onAttach() {
      this.listen("fullscreen-change", this.#iT.bind(this));
    }
    onConnect(e) {
      let t = Object.getOwnPropertyNames(Object.getPrototypeOf(this)),
        s = new i.EventsController(e),
        a = this.#ix.bind(this);
      for (let e of t) e.startsWith("media-") && s.add(e, a);
      (this.#iS(),
        (0, i.effect)(this.#i$.bind(this)),
        (0, i.effect)(this.#iC.bind(this)),
        (0, i.effect)(this.#iP.bind(this)),
        (0, i.effect)(this.#iE.bind(this)),
        (0, i.effect)(this.#iA.bind(this)),
        (0, i.effect)(this.#iq.bind(this)),
        (0, i.effect)(this.#iM.bind(this)));
    }
    onDestroy() {
      try {
        let e = this.createEvent("destroy"),
          { pictureInPicture: t, fullscreen: i } = this.$state;
        (i() && this.exitFullscreen("prefer-media", e),
          t() && this.exitPictureInPicture(e));
      } catch (e) {}
      this.#ik.reset();
    }
    #iS() {
      let { load: e } = this.$props,
        { canLoad: t } = this.$state;
      if ("play" !== e() || t()) return;
      let i = this.listen("media-play-request", (e) => {
        (this.#iL(e), i());
      });
    }
    #i$() {
      let e = this.#iw(),
        t = this.$state.canPlay();
      return (
        e && t && this.#ik.start(),
        () => {
          this.#ik.stop();
        }
      );
    }
    #ix(e) {
      (e.stopPropagation(),
        e.defaultPrevented ||
          (this[e.type] &&
            ((0, i.peek)(this.#iw)
              ? this[e.type](e)
              : this.#ik.enqueue(e.type, () => {
                  (0, i.peek)(this.#iw) && this[e.type](e);
                }))));
    }
    async play(e) {
      if (er) return;
      let { canPlay: t, paused: s, autoPlaying: a } = this.$state;
      if (this.#iL(e) || !(0, i.peek)(s)) return;
      e && this.#iy.queue.enqueue("media-play-request", e);
      let n = (0, i.peek)(a);
      try {
        let e = (0, i.peek)(this.#iw);
        return (
          iw(e, (0, i.peek)(t)),
          (function (e) {
            if (
              !("u" < typeof window) &&
              window.matchMedia("(prefers-reduced-motion: reduce)").matches &&
              e
            )
              throw Error("[vidstack] autoplay blocked");
          })(n),
          await e.play()
        );
      } catch (i) {
        let t = this.createEvent("play-fail", { detail: t5(i), trigger: e });
        throw ((t.autoPlay = n), this.#ig.handle(t), i);
      }
    }
    #iL(e) {
      let { load: t } = this.$props,
        { canLoad: i } = this.$state;
      if ("play" === t() && !i()) {
        let t = this.createEvent("media-start-loading", { trigger: e });
        return (
          this.dispatchEvent(t),
          this.#ik.enqueue("media-play-request", async () => {
            try {
              await this.play(t);
            } catch (e) {}
          }),
          !0
        );
      }
      return !1;
    }
    async pause(e) {
      if (er) return;
      let { canPlay: t, paused: s } = this.$state;
      if (!(0, i.peek)(s)) {
        e && this.#iy.queue.enqueue("media-pause-request", e);
        try {
          let e = (0, i.peek)(this.#iw);
          return (iw(e, (0, i.peek)(t)), await e.pause());
        } catch (e) {
          throw (this.#iy.queue.delete("media-pause-request"), e);
        }
      }
    }
    setAudioGain(e, t) {
      let { audioGain: i, canSetAudioGain: s } = this.$state;
      if (i() === e) return;
      let a = this.#iw();
      if (!a?.audioGain || !s())
        throw Error("[vidstack] audio gain api not available");
      (t && this.#iy.queue.enqueue("media-audio-gain-change-request", t),
        a.audioGain.setGain(e));
    }
    seekToLiveEdge(e) {
      if (er) return;
      let {
        canPlay: t,
        live: s,
        liveEdge: a,
        canSeek: n,
        liveSyncPosition: r,
        seekableEnd: o,
        userBehindLiveEdge: h,
      } = this.$state;
      if ((h.set(!1), (0, i.peek)(() => !s() || a() || !n()))) return;
      let l = (0, i.peek)(this.#iw);
      (iw(l, (0, i.peek)(t)),
        e && this.#iy.queue.enqueue("media-seek-request", e));
      let d = o() - 2;
      l.setCurrentTime(Math.min(d, r() ?? d));
    }
    #iD = !1;
    async enterFullscreen(e = "prefer-media", t) {
      if (er) return;
      let s = this.#iR(e);
      if ((ik(e, s), !s.active))
        return (
          (0, i.peek)(this.$state.pictureInPicture) &&
            ((this.#iD = !0), await this.exitPictureInPicture(t)),
          t && this.#iy.queue.enqueue("media-enter-fullscreen-request", t),
          s.enter()
        );
    }
    async exitFullscreen(e = "prefer-media", t) {
      if (er) return;
      let s = this.#iR(e);
      if ((ik(e, s), s.active)) {
        t && this.#iy.queue.enqueue("media-exit-fullscreen-request", t);
        try {
          let e = await s.exit();
          return (
            this.#iD &&
              (0, i.peek)(this.$state.canPictureInPicture) &&
              (await this.enterPictureInPicture()),
            e
          );
        } finally {
          this.#iD = !1;
        }
      }
    }
    #iR(e) {
      let t = (0, i.peek)(this.#iw);
      return ("prefer-media" === e && this.#iv.supported) || "media" === e
        ? this.#iv
        : t?.fullscreen;
    }
    async enterPictureInPicture(e) {
      if (!er && (this.#iI(), !this.$state.pictureInPicture()))
        return (
          e && this.#iy.queue.enqueue("media-enter-pip-request", e),
          await this.#iw().pictureInPicture.enter()
        );
    }
    async exitPictureInPicture(e) {
      if (!er && (this.#iI(), this.$state.pictureInPicture()))
        return (
          e && this.#iy.queue.enqueue("media-exit-pip-request", e),
          await this.#iw().pictureInPicture.exit()
        );
    }
    #iI() {
      if (!this.$state.canPictureInPicture())
        throw Error("[vidstack] no pip support");
    }
    #iC() {
      this.controls.defaultDelay = this.$props.controlsDelay();
    }
    #iP() {
      let { canSetAudioGain: e } = this.$state,
        t = !!this.#iw()?.audioGain?.supported;
      e.set(t);
    }
    #iE() {
      let { canAirPlay: e } = this.$state,
        t = !!this.#iw()?.airPlay?.supported;
      e.set(t);
    }
    #iA() {
      let { canGoogleCast: e, source: t } = this.$state,
        i = ed && !eh && eI(t());
      e.set(i);
    }
    #iq() {
      let { canFullscreen: e } = this.$state,
        t = this.#iv.supported || !!this.#iw()?.fullscreen?.supported;
      e.set(t);
    }
    #iM() {
      let { canPictureInPicture: e } = this.$state,
        t = !!this.#iw()?.pictureInPicture?.supported;
      e.set(t);
    }
    async "media-airplay-request"(e) {
      try {
        await this.requestAirPlay(e);
      } catch (e) {}
    }
    async requestAirPlay(e) {
      try {
        let t = this.#iw()?.airPlay;
        if (!t?.supported) throw Error("No AirPlay adapter.");
        return (
          e && this.#iy.queue.enqueue("media-airplay-request", e),
          await t.prompt()
        );
      } catch (e) {
        throw (this.#iy.queue.delete("media-airplay-request"), e);
      }
    }
    async "media-google-cast-request"(e) {
      try {
        await this.requestGoogleCast(e);
      } catch (e) {}
    }
    #iV;
    async requestGoogleCast(t) {
      try {
        let { canGoogleCast: s } = this.$state;
        if (!(0, i.peek)(s)) {
          let e = Error("Cast not available.");
          throw ((e.code = "CAST_NOT_AVAILABLE"), e);
        }
        if ((eV("https://www.gstatic.com"), !this.#iV)) {
          let t = await e.A(78813).then(function (e) {
            return e.loader;
          });
          this.#iV = new t.GoogleCastLoader();
        }
        (await this.#iV.prompt(this.#M),
          t && this.#iy.queue.enqueue("media-google-cast-request", t));
        let a = "disconnected" !== (0, i.peek)(this.$state.remotePlaybackState);
        (a &&
          this.$state.savedState.set({
            paused: (0, i.peek)(this.$state.paused),
            currentTime: (0, i.peek)(this.$state.currentTime),
          }),
          this.$state.remotePlaybackLoader.set(a ? this.#iV : null));
      } catch (e) {
        throw (this.#iy.queue.delete("media-google-cast-request"), e);
      }
    }
    "media-clip-start-change-request"(e) {
      let { clipStartTime: t } = this.$state;
      t.set(e.detail);
    }
    "media-clip-end-change-request"(e) {
      let { clipEndTime: t } = this.$state;
      (t.set(e.detail),
        this.dispatch("duration-change", { detail: e.detail, trigger: e }));
    }
    "media-duration-change-request"(e) {
      let { providedDuration: t, clipEndTime: i } = this.$state;
      (t.set(e.detail),
        0 >= i() &&
          this.dispatch("duration-change", { detail: e.detail, trigger: e }));
    }
    "media-audio-track-change-request"(e) {
      let { logger: t, audioTracks: i } = this.#M;
      if (i.readonly) return;
      let s = i[e.detail];
      if (s) {
        let t = e.type;
        (this.#iy.queue.enqueue(t, e), (s.selected = !0));
      }
    }
    async "media-enter-fullscreen-request"(e) {
      try {
        await this.enterFullscreen(e.detail, e);
      } catch (t) {
        this.#iO(t, e);
      }
    }
    async "media-exit-fullscreen-request"(e) {
      try {
        await this.exitFullscreen(e.detail, e);
      } catch (t) {
        this.#iO(t, e);
      }
    }
    async #iT(e) {
      let t = (0, i.peek)(this.$props.fullscreenOrientation),
        s = e.detail;
      if (!(0, i.isUndefined)(t) && "none" !== t && this.#ib.supported)
        if (s) {
          if (this.#ib.locked) return;
          this.dispatch("media-orientation-lock-request", {
            detail: t,
            trigger: e,
          });
        } else
          this.#ib.locked &&
            this.dispatch("media-orientation-unlock-request", { trigger: e });
    }
    #iO(e, t) {
      this.#ig.handle(this.createEvent("fullscreen-error", { detail: t5(e) }));
    }
    async "media-orientation-lock-request"(e) {
      let t = e.type;
      try {
        (this.#iy.queue.enqueue(t, e), await this.#ib.lock(e.detail));
      } catch (e) {
        this.#iy.queue.delete(t);
      }
    }
    async "media-orientation-unlock-request"(e) {
      let t = e.type;
      try {
        (this.#iy.queue.enqueue(t, e), await this.#ib.unlock());
      } catch (e) {
        this.#iy.queue.delete(t);
      }
    }
    async "media-enter-pip-request"(e) {
      try {
        await this.enterPictureInPicture(e);
      } catch (t) {
        this.#iF(t, e);
      }
    }
    async "media-exit-pip-request"(e) {
      try {
        await this.exitPictureInPicture(e);
      } catch (t) {
        this.#iF(t, e);
      }
    }
    #iF(e, t) {
      this.#ig.handle(
        this.createEvent("picture-in-picture-error", { detail: t5(e) }),
      );
    }
    "media-live-edge-request"(e) {
      let { live: t, liveEdge: i, canSeek: s } = this.$state;
      if (!(!t() || i()) && s()) {
        this.#iy.queue.enqueue("media-seek-request", e);
        try {
          this.seekToLiveEdge();
        } catch (e) {
          this.#iy.queue.delete("media-seek-request");
        }
      }
    }
    async "media-loop-request"(e) {
      try {
        ((this.#iy.looping = !0),
          (this.#iy.replaying = !0),
          await this.play(e));
      } catch (e) {
        this.#iy.looping = !1;
      }
    }
    "media-user-loop-change-request"(e) {
      this.$state.userPrefersLoop.set(e.detail);
    }
    async "media-pause-request"(e) {
      if (!this.$state.paused())
        try {
          await this.pause(e);
        } catch (e) {}
    }
    async "media-play-request"(e) {
      if (this.$state.paused())
        try {
          await this.play(e);
        } catch (e) {}
    }
    "media-rate-change-request"(e) {
      let { playbackRate: t, canSetPlaybackRate: i } = this.$state;
      if (t() === e.detail || !i()) return;
      let s = this.#iw();
      s?.setPlaybackRate &&
        (this.#iy.queue.enqueue("media-rate-change-request", e),
        s.setPlaybackRate(e.detail));
    }
    "media-audio-gain-change-request"(e) {
      try {
        this.setAudioGain(e.detail, e);
      } catch (e) {}
    }
    "media-quality-change-request"(e) {
      let { qualities: t, storage: i, logger: s } = this.#M;
      if (t.readonly) return;
      this.#iy.queue.enqueue("media-quality-change-request", e);
      let a = e.detail;
      if (a < 0)
        (t.autoSelect(e), e.isOriginTrusted && i?.setVideoQuality?.(null));
      else {
        let s = t[a];
        s &&
          ((s.selected = !0),
          e.isOriginTrusted &&
            i?.setVideoQuality?.({
              id: s.id,
              width: s.width,
              height: s.height,
              bitrate: s.bitrate,
            }));
      }
    }
    "media-pause-controls-request"(e) {
      let t = e.type;
      (this.#iy.queue.enqueue(t, e), this.controls.pause(e));
    }
    "media-resume-controls-request"(e) {
      let t = e.type;
      (this.#iy.queue.enqueue(t, e), this.controls.resume(e));
    }
    "media-seek-request"(e) {
      let {
          canSeek: t,
          ended: i,
          live: s,
          seekableEnd: a,
          userBehindLiveEdge: n,
        } = this.$state,
        r = e.detail;
      i() && (this.#iy.replaying = !0);
      let o = e.type;
      ((this.#iy.seeking = !1), this.#iy.queue.delete(o));
      let h = eX(r, this.$state);
      Number.isFinite(h) &&
        t() &&
        (this.#iy.queue.enqueue(o, e),
        this.#iw().setCurrentTime(h),
        s() && e.isOriginTrusted && Math.abs(a() - h) >= 2 && n.set(!0));
    }
    "media-seeking-request"(e) {
      let t = e.type;
      (this.#iy.queue.enqueue(t, e),
        this.$state.seeking.set(!0),
        (this.#iy.seeking = !0));
    }
    "media-start-loading"(e) {
      if (this.$state.canLoad()) return;
      let t = e.type;
      (this.#iy.queue.enqueue(t, e),
        this.#ig.handle(this.createEvent("can-load")));
    }
    "media-poster-start-loading"(e) {
      if (this.$state.canLoadPoster()) return;
      let t = e.type;
      (this.#iy.queue.enqueue(t, e),
        this.#ig.handle(this.createEvent("can-load-poster")));
    }
    "media-text-track-change-request"(e) {
      let { index: t, mode: i } = e.detail,
        s = this.#M.textTracks[t];
      if (s) {
        let t = e.type;
        (this.#iy.queue.enqueue(t, e), s.setMode(i, e));
      }
    }
    "media-mute-request"(e) {
      if (this.$state.muted()) return;
      let t = e.type;
      (this.#iy.queue.enqueue(t, e), this.#iw().setMuted(!0));
    }
    "media-unmute-request"(e) {
      let { muted: t, volume: i } = this.$state;
      if (!t()) return;
      let s = e.type;
      (this.#iy.queue.enqueue(s, e),
        this.#M.$provider().setMuted(!1),
        0 === i() &&
          (this.#iy.queue.enqueue(s, e), this.#iw().setVolume(0.25)));
    }
    "media-volume-change-request"(e) {
      let { muted: t, volume: i } = this.$state,
        s = e.detail;
      if (i() === s) return;
      let a = e.type;
      (this.#iy.queue.enqueue(a, e),
        this.#iw().setVolume(s),
        s > 0 &&
          t() &&
          (this.#iy.queue.enqueue(a, e), this.#iw().setMuted(!1)));
    }
    #iN(e, t, i) {}
  }
  function iw(e, t) {
    if (!e || !t) throw Error("[vidstack] media not ready");
  }
  function ik(e, t) {
    if (!t?.supported) throw Error("[vidstack] no fullscreen support");
  }
  class iT {
    seeking = !1;
    looping = !1;
    replaying = !1;
    queue = new ig();
  }
  let ix = new Set([
    "auto-play",
    "auto-play-fail",
    "can-load",
    "sources-change",
    "source-change",
    "load-start",
    "abort",
    "error",
    "loaded-metadata",
    "loaded-data",
    "can-play",
    "play",
    "play-fail",
    "pause",
    "playing",
    "seeking",
    "seeked",
    "waiting",
  ]);
  class iS extends tb {
    #iy;
    #M;
    #iU = new Map();
    #iB = !1;
    #iK = [];
    #iW = [-1, -1];
    #iG = !1;
    #iQ;
    constructor(e, t) {
      (super(), (this.#iy = e), (this.#M = t));
    }
    onAttach(e) {
      (e.setAttribute("aria-busy", "true"),
        new i.EventsController(this)
          .add("fullscreen-change", this["fullscreen-change"].bind(this))
          .add("fullscreen-error", this["fullscreen-error"].bind(this))
          .add("orientation-change", this["orientation-change"].bind(this)));
    }
    onConnect(e) {
      ((0, i.effect)(this.#iH.bind(this)),
        this.#iz(),
        this.#ij(),
        this.#i_(),
        this.#iX(),
        (0, i.onDispose)(this.#iJ.bind(this)));
    }
    onDestroy() {
      let { audioTracks: e, qualities: t, textTracks: i } = this.#M;
      (e[e1.reset](), t[e1.reset](), i[e1.reset](), this.#iY());
    }
    handle(e) {
      if (!this.scope) return;
      let t = e.type;
      ((0, i.untrack)(() => this[e.type]?.(e)),
        er || (ix.has(t) && this.#iU.set(t, e), this.dispatch(e)));
    }
    #iZ = !1;
    #iX() {
      this.#iZ &&
        (requestAnimationFrame(() => {
          this.scope && this.#M.remote.play(new i.DOMEvent("dom-connect"));
        }),
        (this.#iZ = !1));
    }
    #iJ() {
      this.#iZ ||
        ((this.#iZ = !this.$state.paused()), this.#M.$provider()?.pause());
    }
    #i0() {
      (this.#i1(),
        (this.#iB = !1),
        (this.#iy.replaying = !1),
        (this.#iy.looping = !1),
        (this.#iG = !1),
        (this.#iQ = void 0),
        this.#iU.clear());
    }
    #i2(e, t) {
      let i = this.#iy.queue.serve(e);
      i && ((t.request = i), t.triggers.add(i));
    }
    #iz() {
      (this.#i3(), this.#i5());
      let e = this.#M.textTracks;
      new i.EventsController(e)
        .add("add", this.#i3.bind(this))
        .add("remove", this.#i3.bind(this))
        .add("mode-change", this.#i5.bind(this));
    }
    #ij() {
      let e = this.#M.qualities;
      new i.EventsController(e)
        .add("add", this.#i4.bind(this))
        .add("remove", this.#i4.bind(this))
        .add("change", this.#tH.bind(this))
        .add("auto-change", this.#i7.bind(this))
        .add("readonly-change", this.#i6.bind(this));
    }
    #i_() {
      let e = this.#M.audioTracks;
      new i.EventsController(e)
        .add("add", this.#i9.bind(this))
        .add("remove", this.#i9.bind(this))
        .add("change", this.#i8.bind(this));
    }
    #i3(e) {
      let { textTracks: t } = this.$state;
      (t.set(this.#M.textTracks.toArray()),
        this.dispatch("text-tracks-change", { detail: t(), trigger: e }));
    }
    #i5(e) {
      e && this.#i2("media-text-track-change-request", e);
      let t = this.#M.textTracks.selected,
        { textTrack: i } = this.$state;
      i() !== t &&
        (i.set(t),
        this.dispatch("text-track-change", { detail: t, trigger: e }));
    }
    #i9(e) {
      let { audioTracks: t } = this.$state;
      (t.set(this.#M.audioTracks.toArray()),
        this.dispatch("audio-tracks-change", { detail: t(), trigger: e }));
    }
    #i8(e) {
      let { audioTrack: t } = this.$state;
      (t.set(this.#M.audioTracks.selected),
        e && this.#i2("media-audio-track-change-request", e),
        this.dispatch("audio-track-change", { detail: t(), trigger: e }));
    }
    #i4(e) {
      let { qualities: t } = this.$state;
      (t.set(this.#M.qualities.toArray()),
        this.dispatch("qualities-change", { detail: t(), trigger: e }));
    }
    #tH(e) {
      let { quality: t } = this.$state;
      (t.set(this.#M.qualities.selected),
        e && this.#i2("media-quality-change-request", e),
        this.dispatch("quality-change", { detail: t(), trigger: e }));
    }
    #i7() {
      let { qualities: e } = this.#M,
        t = e.auto;
      (this.$state.autoQuality.set(t), t || this.#iY());
    }
    #se = null;
    #st() {
      (this.#iY(),
        (this.#se = (0, i.effect)(() => {
          let { qualities: e } = this.#M,
            { mediaWidth: t, mediaHeight: s } = this.$state,
            a = t(),
            n = s();
          if (0 === a || 0 === n) return;
          let r = null,
            o = 1 / 0;
          for (let t of e) {
            let e = Math.abs(t.width - a) + Math.abs(t.height - n);
            e < o && ((o = e), (r = t));
          }
          r &&
            e[e1.select](
              r,
              !0,
              new i.DOMEvent("resize", { detail: { width: a, height: n } }),
            );
        })));
    }
    #iY() {
      (this.#se?.(), (this.#se = null));
    }
    #i6() {
      this.$state.canSetQuality.set(!this.#M.qualities.readonly);
    }
    #iH() {
      let { canSetVolume: e, isGoogleCastConnected: t } = this.$state;
      t() ? e.set(!1) : ev().then(e.set);
    }
    "provider-change"(e) {
      let t = this.#M.$provider(),
        i = e.detail;
      t?.type !== i?.type &&
        (t?.destroy?.(),
        t?.scope?.dispose(),
        this.#M.$provider.set(e.detail),
        t && null === e.detail && this.#si(e));
    }
    "provider-loader-change"(e) {}
    "auto-play"(e) {
      this.$state.autoPlayError.set(null);
    }
    "auto-play-fail"(e) {
      (this.$state.autoPlayError.set(e.detail), this.#i0());
    }
    "can-load"(e) {
      (this.$state.canLoad.set(!0),
        this.#iU.set("can-load", e),
        this.#M.textTracks[eU.canLoad](),
        this.#i2("media-start-loading", e));
    }
    "can-load-poster"(e) {
      (this.$state.canLoadPoster.set(!0),
        this.#iU.set("can-load-poster", e),
        this.#i2("media-poster-start-loading", e));
    }
    "media-type-change"(e) {
      let t = this.#iU.get("source-change");
      t && e.triggers.add(t);
      let i = this.$state.viewType();
      this.$state.mediaType.set(e.detail);
      let s = this.$state.providedViewType(),
        a = "unknown" === s ? e.detail : s;
      i !== a &&
        (er
          ? this.$state.inferredViewType.set(a)
          : setTimeout(() => {
              requestAnimationFrame(() => {
                this.scope &&
                  (this.$state.inferredViewType.set(e.detail),
                  this.dispatch("view-type-change", { detail: a, trigger: e }));
              });
            }, 0));
    }
    "stream-type-change"(e) {
      let t = this.#iU.get("source-change");
      t && e.triggers.add(t);
      let { streamType: i, inferredStreamType: s } = this.$state;
      (s.set(e.detail), (e.detail = i()));
    }
    "rate-change"(e) {
      let { storage: t } = this.#M,
        { canPlay: i } = this.$state;
      (this.$state.playbackRate.set(e.detail),
        this.#i2("media-rate-change-request", e),
        i() && t?.setPlaybackRate?.(e.detail));
    }
    "remote-playback-change"(e) {
      let { remotePlaybackState: t, remotePlaybackType: i } = this.$state,
        { type: s, state: a } = e.detail,
        n = "connected" === a;
      (i.set(s), t.set(a));
      let r =
        "airplay" === s ? "media-airplay-request" : "media-google-cast-request";
      if (n) this.#i2(r, e);
      else {
        let t = this.#iy.queue.peek(r);
        t && ((e.request = t), e.triggers.add(t));
      }
    }
    "sources-change"(e) {
      let t = this.$state.sources(),
        i = e.detail;
      (this.$state.sources.set(i), this.#ss(t, i, e));
    }
    #ss(e, t, i) {
      let { qualities: s } = this.#M,
        a = !1,
        n = !1;
      for (let a of e)
        if (en(a) && !t.some((e) => e.src === a.src)) {
          let e = s.getBySrc(a.src);
          e && (s[e1.remove](e, i), (n = !0));
        }
      for (let e of (n &&
        !s.length &&
        (this.$state.savedState.set(null), s[e1.reset](i)),
      t)) {
        if (!en(e) || s.getBySrc(e.src)) continue;
        let t = {
          id: e.id ?? e.height + "p",
          bitrate: null,
          codec: null,
          ...e,
          selected: !1,
        };
        (s[e1.add](t, i), (a = !0));
      }
      a &&
        !s[tm.enableAuto] &&
        (this.#st(),
        (s[tm.enableAuto] = this.#st.bind(this)),
        s[tm.setAuto](!0, i));
    }
    "source-change"(e) {
      e.isQualityChange = e.originEvent?.type === "quality-change";
      let t = e.detail;
      (this.#si(e, e.isQualityChange),
        this.#iU.set(e.type, e),
        this.$state.source.set(t),
        this.el?.setAttribute("aria-busy", "true"));
    }
    #si(e, t = !1) {
      let { audioTracks: i, qualities: s } = this.#M;
      if (!t) {
        ((this.#iK = []),
          (this.#iW = [-1, -1]),
          i[e1.reset](e),
          s[e1.reset](e),
          e_(this.$state, t),
          this.#i0());
        return;
      }
      (e_(this.$state, t), this.#i0());
    }
    abort(e) {
      let t = this.#iU.get("source-change");
      t && e.triggers.add(t);
      let i = this.#iU.get("can-load");
      i && !e.triggers.hasType("can-load") && e.triggers.add(i);
    }
    "load-start"(e) {
      let t = this.#iU.get("source-change");
      t && e.triggers.add(t);
    }
    error(e) {
      this.$state.error.set(e.detail);
      let t = this.#iU.get("abort");
      t && e.triggers.add(t);
    }
    "loaded-metadata"(e) {
      let t = this.#iU.get("load-start");
      t && e.triggers.add(t);
    }
    "loaded-data"(e) {
      let t = this.#iU.get("load-start");
      t && e.triggers.add(t);
    }
    "can-play"(e) {
      let t = this.#iU.get("loaded-metadata");
      (t && e.triggers.add(t),
        this.#sa(e.detail),
        this.el?.setAttribute("aria-busy", "false"));
    }
    "can-play-through"(e) {
      this.#sa(e.detail);
      let t = this.#iU.get("can-play");
      t && e.triggers.add(t);
    }
    #sa(e) {
      let {
        seekable: t,
        buffered: i,
        intrinsicDuration: s,
        canPlay: a,
      } = this.$state;
      (a.set(!0), i.set(e.buffered), t.set(e.seekable));
      let n = eT(e.seekable) ?? 1 / 0;
      s.set(n);
    }
    "duration-change"(e) {
      let {
          live: t,
          intrinsicDuration: i,
          providedDuration: s,
          clipEndTime: a,
          ended: n,
        } = this.$state,
        r = e.detail;
      if (!t()) {
        let t = Number.isNaN(r) ? 0 : r;
        (i.set(t), n() && this.#sn(e));
      }
      (s() > 0 || a() > 0) && e.stopImmediatePropagation();
    }
    progress(e) {
      let { buffered: t, seekable: i } = this.$state,
        { buffered: s, seekable: a } = e.detail,
        n = eT(s),
        r = s.length !== t().length,
        o = n !== eT(t()),
        h = eT(a),
        l = a.length !== i().length,
        d = h !== eT(i());
      ((r || o) && t.set(s), (l || d) && i.set(a));
    }
    play(e) {
      let {
        paused: t,
        autoPlayError: i,
        ended: s,
        autoPlaying: a,
        playsInline: n,
        pointer: r,
        muted: o,
        viewType: h,
        live: l,
        userBehindLiveEdge: d,
      } = this.$state;
      if ((this.#sr(), !t())) return void e.stopImmediatePropagation();
      e.autoPlay = a();
      let u = this.#iU.get("waiting");
      (u && e.triggers.add(u),
        this.#i2("media-play-request", e),
        this.#iU.set("play", e),
        t.set(!1),
        i.set(null),
        e.autoPlay &&
          (this.handle(
            this.createEvent("auto-play", {
              detail: { muted: o() },
              trigger: e,
            }),
          ),
          a.set(!1)),
        (s() || this.#iy.replaying) &&
          ((this.#iy.replaying = !1),
          s.set(!1),
          this.handle(this.createEvent("replay", { trigger: e }))),
        n() ||
          "video" !== h() ||
          "coarse" !== r() ||
          this.#M.remote.enterFullscreen("prefer-media", e),
        l() && !d() && this.#M.remote.seekToLiveEdge(e));
    }
    #sr(e) {
      if (!(0, i.peek)(this.#M.$provider)) return;
      let {
          ended: t,
          seekableStart: s,
          clipEndTime: a,
          currentTime: n,
          realCurrentTime: r,
          duration: o,
        } = this.$state,
        h =
          t() ||
          r() < s() ||
          (a() > 0 && r() >= a()) ||
          0.1 > Math.abs(n() - o());
      return (
        h && this.dispatch("media-seek-request", { detail: s(), trigger: e }),
        h
      );
    }
    "play-fail"(e) {
      let { muted: t, autoPlaying: i } = this.$state,
        s = this.#iU.get("play");
      (s && e.triggers.add(s), this.#i2("media-play-request", e));
      let { paused: a, playing: n } = this.$state;
      (a.set(!0),
        n.set(!1),
        this.#i0(),
        this.#iU.set("play-fail", e),
        e.autoPlay &&
          (this.handle(
            this.createEvent("auto-play-fail", {
              detail: { muted: t(), error: e.detail },
              trigger: e,
            }),
          ),
          i.set(!1)));
    }
    playing(e) {
      let t = this.#iU.get("play"),
        i = this.#iU.get("seeked");
      (t ? e.triggers.add(t) : i && e.triggers.add(i),
        setTimeout(() => this.#i0(), 0));
      let {
        paused: s,
        playing: a,
        live: n,
        liveSyncPosition: r,
        seekableEnd: o,
        started: h,
        currentTime: l,
        seeking: d,
        ended: u,
      } = this.$state;
      if ((s.set(!1), a.set(!0), d.set(!1), u.set(!1), this.#iy.looping)) {
        this.#iy.looping = !1;
        return;
      }
      if (n() && !h() && 0 === l()) {
        let e = r() ?? o() - 2;
        Number.isFinite(e) && this.#M.$provider().setCurrentTime(e);
      }
      this.started(e);
    }
    started(e) {
      let { started: t } = this.$state;
      t() ||
        (t.set(!0), this.handle(this.createEvent("started", { trigger: e })));
    }
    pause(e) {
      (this.el?.isConnected || (this.#iZ = !0),
        this.#i2("media-pause-request", e));
      let t = this.#iU.get("seeked");
      t && e.triggers.add(t);
      let { paused: i, playing: s } = this.$state;
      (i.set(!0),
        s.set(!1),
        this.#iB &&
          setTimeout(() => {
            (this.handle(this.createEvent("end", { trigger: e })),
              (this.#iB = !1));
          }, 0),
        this.#i0());
    }
    "time-change"(e) {
      if (this.#iy.looping) return void e.stopImmediatePropagation();
      let {
          waiting: t,
          played: i,
          clipEndTime: s,
          realCurrentTime: a,
          currentTime: n,
        } = this.$state,
        r = e.detail,
        o = s();
      for (let i of (a.set(r), this.#so(), t.set(!1), this.#M.textTracks))
        i[eU.updateActiveCues](r, e);
      (o > 0 &&
        r >= o &&
        ((this.#iB = !0), this.dispatch("media-pause-request", { trigger: e })),
        this.#sh(),
        this.dispatch("time-update", {
          detail: { currentTime: n(), played: i() },
          trigger: e,
        }));
    }
    #so() {
      var e, t, i;
      let s,
        a,
        { currentTime: n, played: r, paused: o } = this.$state;
      o() ||
        ((this.#iW =
          ((e = this.#iK),
          (t = this.#iW),
          (i = n()),
          (s = t[0]),
          (a = t[1]),
          i < s
            ? [i, -1]
            : i === s
              ? t
              : -1 === s
                ? ((t[0] = i), t)
                : (i > s && ((t[1] = i), -1 === a && e.push(t)),
                  !(function (e) {
                    if (e.length <= 1) return;
                    e.sort((e, t) => e[0] - t[0]);
                    let t = [],
                      i = e[0];
                    for (let s = 1; s < e.length; s++) {
                      let a = e[s];
                      i[1] >= a[0] - 1
                        ? (i = [i[0], Math.max(i[1], a[1])])
                        : (t.push(i), (i = a));
                    }
                    t.push(i);
                  })(e),
                  t))),
        r.set(new ew(this.#iK)));
    }
    #sn(e) {
      let { clipStartTime: t, clipEndTime: i, duration: s } = this.$state;
      t() > 0 ||
        i() > 0 ||
        this.handle(
          this.createEvent("time-change", { detail: s(), trigger: e }),
        );
    }
    #sh() {
      let { storage: e } = this.#M,
        { canPlay: t, realCurrentTime: i } = this.$state;
      t() && e?.setTime?.(i());
    }
    "audio-gain-change"(e) {
      let { storage: t } = this.#M,
        { canPlay: i, audioGain: s } = this.$state;
      (s.set(e.detail),
        this.#i2("media-audio-gain-change-request", e),
        i() && t?.setAudioGain?.(s()));
    }
    "volume-change"(e) {
      let { storage: t } = this.#M,
        { volume: i, muted: s, canPlay: a } = this.$state,
        n = e.detail;
      (i.set(n.volume),
        s.set(n.muted || 0 === n.volume),
        this.#i2("media-volume-change-request", e),
        this.#i2(n.muted ? "media-mute-request" : "media-unmute-request", e),
        a() && (t?.setVolume?.(i()), t?.setMuted?.(s())));
    }
    seeking = (0, i.functionThrottle)(
      (e) => {
        let { seeking: t, realCurrentTime: i, paused: s } = this.$state;
        (t.set(!0),
          i.set(e.detail),
          this.#i2("media-seeking-request", e),
          s() && ((this.#iQ = e), this.#sl()),
          (this.#iW = [-1, -1]));
      },
      150,
      { leading: !0 },
    );
    seeked(e) {
      let {
        seeking: t,
        currentTime: i,
        realCurrentTime: s,
        paused: a,
        seekableEnd: n,
        ended: r,
        live: o,
      } = this.$state;
      if (this.#iy.seeking) (t.set(!0), e.stopImmediatePropagation());
      else if (t()) {
        let i = this.#iU.get("waiting");
        i && e.triggers.add(i);
        let n = this.#iU.get("seeking");
        (n && !e.triggers.has(n) && e.triggers.add(n),
          a() && this.#i1(),
          t.set(!1),
          s.set(e.detail),
          this.#i2("media-seek-request", e));
        let r = e?.originEvent;
        !r?.isTrusted ||
          r instanceof MessageEvent ||
          /seek/.test(r.type) ||
          this.started(e);
      }
      o() || (Math.floor(i()) !== Math.floor(n()) ? r.set(!1) : this.end(e));
    }
    waiting(e) {
      this.#iG ||
        this.#iy.seeking ||
        (e.stopImmediatePropagation(), (this.#iQ = e), this.#sl());
    }
    #sl = (0, i.functionDebounce)(() => {
      if (!this.#iQ) return;
      this.#iG = !0;
      let { waiting: e, playing: t } = this.$state;
      (e.set(!0), t.set(!1));
      let i = this.createEvent("waiting", { trigger: this.#iQ });
      (this.#iU.set("waiting", i),
        this.dispatch(i),
        (this.#iQ = void 0),
        (this.#iG = !1));
    }, 300);
    end(e) {
      let { loop: t, ended: i } = this.$state;
      if (!(!t() && i())) {
        if (t())
          return void setTimeout(() => {
            requestAnimationFrame(() => {
              (this.#sr(e),
                this.dispatch("media-loop-request", { trigger: e }));
            });
          }, 10);
        setTimeout(() => this.#tv(e), 0);
      }
    }
    #tv(e) {
      let { storage: t } = this.#M,
        { paused: i, seeking: s, ended: a, duration: n } = this.$state;
      (this.#sn(e),
        i() || this.dispatch("pause", { trigger: e }),
        s() && this.dispatch("seeked", { detail: n(), trigger: e }),
        a.set(!0),
        this.#i0(),
        t?.setTime?.(n(), !0),
        this.dispatch("ended", { trigger: e }));
    }
    #i1() {
      (this.#sl.cancel(), this.$state.waiting.set(!1));
    }
    "fullscreen-change"(e) {
      let t = e.detail;
      (this.$state.fullscreen.set(t),
        this.#i2(
          t
            ? "media-enter-fullscreen-request"
            : "media-exit-fullscreen-request",
          e,
        ));
    }
    "fullscreen-error"(e) {
      (this.#i2("media-enter-fullscreen-request", e),
        this.#i2("media-exit-fullscreen-request", e));
    }
    "orientation-change"(e) {
      let t = e.detail.lock;
      this.#i2(
        t
          ? "media-orientation-lock-request"
          : "media-orientation-unlock-request",
        e,
      );
    }
    "picture-in-picture-change"(e) {
      let t = e.detail;
      (this.$state.pictureInPicture.set(t),
        this.#i2(t ? "media-enter-pip-request" : "media-exit-pip-request", e));
    }
    "picture-in-picture-error"(e) {
      (this.#i2("media-enter-pip-request", e),
        this.#i2("media-exit-pip-request", e));
    }
    "title-change"(e) {
      e.trigger &&
        (e.stopImmediatePropagation(), this.$state.inferredTitle.set(e.detail));
    }
    "poster-change"(e) {
      e.trigger &&
        (e.stopImmediatePropagation(),
        this.$state.inferredPoster.set(e.detail));
    }
  }
  class i$ extends tb {
    onSetup() {
      if ((this.#ey(), !er))
        for (let e of [
          this.#sd,
          this.#su,
          this.#sc,
          this.#sp,
          this.#I,
          this.#sm,
          this.#sg,
          this.#sf,
          this.#sy,
          this.#sv,
          this.#sb,
          this.#sw,
          this.#sk,
          this.#sT,
          this.#sx,
        ])
          (0, i.effect)(e.bind(this));
    }
    #ey() {
      let e = {
          duration: "providedDuration",
          loop: "providedLoop",
          poster: "providedPoster",
          streamType: "providedStreamType",
          title: "providedTitle",
          viewType: "providedViewType",
        },
        t = new Set(["currentTime", "paused", "playbackRate", "volume"]);
      for (let i of Object.keys(this.$props))
        t.has(i) || this.$state[e[i] ?? i]?.set(this.$props[i]());
      this.$state.muted.set(this.$props.muted() || 0 === this.$props.volume());
    }
    #sT() {
      let {
          viewType: e,
          streamType: t,
          title: i,
          poster: s,
          loop: a,
        } = this.$props,
        n = this.$state;
      (n.providedPoster.set(s()),
        n.providedStreamType.set(t()),
        n.providedViewType.set(e()),
        n.providedTitle.set(i()),
        n.providedLoop.set(a()));
    }
    #sS() {}
    #sd() {
      let { artist: e, artwork: t } = this.$props;
      (this.$state.artist.set(e()), this.$state.artwork.set(t()));
    }
    #sx() {
      let { title: e } = this.$state;
      this.dispatch("title-change", { detail: e() });
    }
    #su() {
      let e = this.$props.autoPlay() || this.$props.autoplay();
      (this.$state.autoPlay.set(e),
        this.dispatch("auto-play-change", { detail: e }));
    }
    #sb() {
      let e = this.$state.loop();
      this.dispatch("loop-change", { detail: e });
    }
    #I() {
      let e = this.$props.controls();
      this.$state.controls.set(e);
    }
    #sk() {
      let { poster: e } = this.$state;
      this.dispatch("poster-change", { detail: e() });
    }
    #sm() {
      let e = this.$props.crossOrigin() ?? this.$props.crossorigin();
      this.$state.crossOrigin.set(!0 === e ? "" : e);
    }
    #sg() {
      let { duration: e } = this.$props;
      this.dispatch("media-duration-change-request", { detail: e() });
    }
    #sw() {
      let e = this.$props.playsInline() || this.$props.playsinline();
      (this.$state.playsInline.set(e),
        this.dispatch("plays-inline-change", { detail: e }));
    }
    #sc() {
      let { clipStartTime: e } = this.$props;
      this.dispatch("media-clip-start-change-request", { detail: e() });
    }
    #sp() {
      let { clipEndTime: e } = this.$props;
      this.dispatch("media-clip-end-change-request", { detail: e() });
    }
    #sf() {
      this.dispatch("live-change", { detail: this.$state.live() });
    }
    #sv() {
      (this.$state.liveEdgeTolerance.set(this.$props.liveEdgeTolerance()),
        this.$state.minLiveDVRWindow.set(this.$props.minLiveDVRWindow()));
    }
    #sy() {
      this.dispatch("live-edge-change", { detail: this.$state.liveEdge() });
    }
  }
  let iC = ["play", "pause", "seekforward", "seekbackward", "seekto"];
  class iP extends tb {
    onConnect() {
      ((0, i.effect)(this.#s$.bind(this)), (0, i.effect)(this.#sC.bind(this)));
      let e = this.#sP.bind(this);
      for (let t of iC) navigator.mediaSession.setActionHandler(t, e);
      (0, i.onDispose)(this.#eA.bind(this));
    }
    #eA() {
      for (let e of iC) navigator.mediaSession.setActionHandler(e, null);
    }
    #s$() {
      let { title: e, artist: t, artwork: i, poster: s } = this.$state;
      navigator.mediaSession.metadata = new MediaMetadata({
        title: e(),
        artist: t(),
        artwork: i() ?? [{ src: s() }],
      });
    }
    #sC() {
      let { canPlay: e, paused: t } = this.$state;
      navigator.mediaSession.playbackState = e()
        ? t()
          ? "paused"
          : "playing"
        : "none";
    }
    #sP(e) {
      let t = new i.DOMEvent("media-session-action", { detail: e });
      switch (e.action) {
        case "play":
          this.dispatch("media-play-request", { trigger: t });
          break;
        case "pause":
          this.dispatch("media-pause-request", { trigger: t });
          break;
        case "seekto":
        case "seekforward":
        case "seekbackward":
          this.dispatch("media-seek-request", {
            detail: (0, i.isNumber)(e.seekTime)
              ? e.seekTime
              : this.$state.currentTime() +
                (e.seekOffset ?? ("seekforward" === e.action ? 10 : -10)),
            trigger: t,
          });
      }
    }
  }
  let iE = (0, i.signal)(!1);
  er ||
    ((0, i.listenEvent)(document, "pointerdown", () => {
      iE.set(!1);
    }),
    (0, i.listenEvent)(document, "keydown", (e) => {
      e.metaKey || e.altKey || e.ctrlKey || iE.set(!0);
    }));
  class iA extends i.ViewController {
    #sE = (0, i.signal)(!1);
    onConnect(e) {
      (0, i.effect)(() => {
        let t = new i.EventsController(e);
        if (!iE()) {
          (this.#sE.set(!1),
            iq(e, !1),
            t
              .add("pointerenter", this.#sA.bind(this))
              .add("pointerleave", this.#sq.bind(this)));
          return;
        }
        let s = document.activeElement === e;
        (this.#sE.set(s),
          iq(e, s),
          t.add("focus", this.#sM.bind(this)).add("blur", this.#sL.bind(this)));
      });
    }
    focused() {
      return this.#sE();
    }
    #sM() {
      (this.#sE.set(!0), iq(this.el, !0));
    }
    #sL() {
      (this.#sE.set(!1), iq(this.el, !1));
    }
    #sA() {
      iM(this.el, !0);
    }
    #sq() {
      iM(this.el, !1);
    }
  }
  function iq(e, t) {
    ((0, i.setAttribute)(e, "data-focus", t),
      (0, i.setAttribute)(e, "data-hocus", t));
  }
  function iM(e, t) {
    ((0, i.setAttribute)(e, "data-hocus", t),
      (0, i.setAttribute)(e, "data-hover", t));
  }
  class iL extends i.Component {
    static props = ic;
    static state = eH;
    #M;
    #ig;
    #sD;
    canPlayQueue = new iy();
    remoteControl;
    get #ez() {
      return this.#M.$provider();
    }
    get #sR() {
      return this.$props;
    }
    constructor() {
      (super(), new i$());
      let e = {
        player: this,
        qualities: new tg(),
        audioTracks: new e4(),
        storage: null,
        $provider: (0, i.signal)(null),
        $providerSetup: (0, i.signal)(!1),
        $props: this.$props,
        $state: this.$state,
      };
      ((e.remote = this.remoteControl = new eZ(void 0)),
        e.remote.setPlayer(this),
        (e.textTracks = new tp()),
        (e.textTracks[eU.crossOrigin] = this.$state.crossOrigin),
        (e.textRenderers = new tc(e)),
        (e.ariaKeys = {}),
        (this.#M = e),
        (0, i.provideContext)(eJ, e),
        (this.orientation = new tq()),
        new iA(),
        new tT(e));
      let t = new iT();
      ((this.#ig = new iS(t, e)),
        (this.#sD = new ib(this.#ig, t, e)),
        (e.delegate = new im(this.#ig.handle.bind(this.#ig), e)),
        (e.notify = e.delegate.notify.bind(e.delegate)),
        "u" > typeof navigator && "mediaSession" in navigator && new iP(),
        new ip("load", this.startLoading.bind(this)),
        new ip("posterLoad", this.startLoadingPoster.bind(this)));
    }
    onSetup() {
      (this.#sI(),
        (0, i.effect)(this.#sV.bind(this)),
        (0, i.effect)(this.#sO.bind(this)),
        (0, i.effect)(this.#eb.bind(this)),
        (0, i.effect)(this.#sF.bind(this)),
        (0, i.effect)(this.#sN.bind(this)),
        (0, i.effect)(this.#sw.bind(this)),
        (0, i.effect)(this.#sU.bind(this)));
    }
    onAttach(e) {
      (e.setAttribute("data-media-player", ""),
        tt(e, "tabindex", "0"),
        tt(e, "role", "region"),
        (0, i.effect)(this.#sB.bind(this)),
        er ? this.#sx() : (0, i.effect)(this.#sx.bind(this)),
        er ? this.#sK() : (0, i.effect)(this.#sK.bind(this)),
        (0, i.listenEvent)(e, "find-media-player", this.#sW.bind(this)));
    }
    onConnect(e) {
      el && (0, i.setAttribute)(e, "data-iphone", "");
      let t = window.matchMedia("(pointer: coarse)");
      (this.#sG(t), (t.onchange = this.#sG.bind(this)));
      let s = new ResizeObserver(
        (0, i.animationFrameThrottle)(this.#sQ.bind(this)),
      );
      (s.observe(e),
        (0, i.effect)(this.#sQ.bind(this)),
        this.dispatch("media-player-connect", {
          detail: this,
          bubbles: !0,
          composed: !0,
        }),
        (0, i.onDispose)(() => {
          (s.disconnect(), (t.onchange = null));
        }));
    }
    onDestroy() {
      ((this.#M.player = null), this.canPlayQueue.reset());
    }
    #sH = !1;
    #sx() {
      let e = this.$el,
        { title: t, live: s, viewType: a, providedTitle: n } = this.$state,
        r = s(),
        o = (0, i.uppercaseFirstChar)(a()),
        h = "Unknown" !== o ? `${r ? "Live " : ""}${o}` : r ? "Live" : "Media",
        l = t();
      ((0, i.setAttribute)(
        this.el,
        "aria-label",
        `${h} Player` + (l ? ` - ${l}` : ""),
      ),
        !er &&
          e?.hasAttribute("title") &&
          ((this.#sH = !0), e?.removeAttribute("title")));
    }
    #sK() {
      let e = this.orientation.landscape ? "landscape" : "portrait";
      (this.$state.orientation.set(e),
        (0, i.setAttribute)(this.el, "data-orientation", e),
        this.#sQ());
    }
    #sV() {
      this.$state.canPlay() && this.#ez
        ? this.canPlayQueue.start()
        : this.canPlayQueue.stop();
    }
    #sI() {
      if (iL[id]) return void this.setAttributes(iL[id]);
      let e = {
          "data-load": function () {
            return this.$props.load();
          },
          "data-captions": function () {
            let e = this.$state.textTrack();
            return !!e && eQ(e);
          },
          "data-ios-controls": function () {
            return this.$state.iOSControls();
          },
          "data-controls": function () {
            return this.controls.showing;
          },
          "data-buffering": function () {
            let { canLoad: e, canPlay: t, waiting: i } = this.$state;
            return e() && (!t() || i());
          },
          "data-error": function () {
            let { error: e } = this.$state;
            return !!e();
          },
          "data-autoplay-error": function () {
            let { autoPlayError: e } = this.$state;
            return !!e();
          },
        },
        t = {
          autoPlay: "autoplay",
          canAirPlay: "can-airplay",
          canPictureInPicture: "can-pip",
          pictureInPicture: "pip",
          playsInline: "playsinline",
          remotePlaybackState: "remote-state",
          remotePlaybackType: "remote-type",
          isAirPlayConnected: "airplay",
          isGoogleCastConnected: "google-cast",
        };
      for (let s of iu)
        e["data-" + (t[s] ?? (0, i.camelToKebabCase)(s))] = function () {
          return this.$state[s]();
        };
      (delete e.title, (iL[id] = e), this.setAttributes(e));
    }
    #sW(e) {
      e.detail(this);
    }
    #sQ() {
      if (er || !this.el) return;
      let e = this.el.clientWidth,
        t = this.el.clientHeight;
      (this.$state.width.set(e),
        this.$state.height.set(t),
        (0, i.setStyle)(this.el, "--player-width", e + "px"),
        (0, i.setStyle)(this.el, "--player-height", t + "px"));
    }
    #sG(e) {
      if (er) return;
      let t = e.matches ? "coarse" : "fine";
      ((0, i.setAttribute)(this.el, "data-pointer", t),
        this.$state.pointer.set(t),
        this.#sQ());
    }
    get provider() {
      return this.#ez;
    }
    get controls() {
      return this.#sD.controls;
    }
    set controls(e) {
      this.#sR.controls.set(e);
    }
    orientation;
    get title() {
      return (0, i.peek)(this.$state.title);
    }
    set title(e) {
      if (this.#sH) {
        this.#sH = !1;
        return;
      }
      this.#sR.title.set(e);
    }
    get qualities() {
      return this.#M.qualities;
    }
    get audioTracks() {
      return this.#M.audioTracks;
    }
    get textTracks() {
      return this.#M.textTracks;
    }
    get textRenderers() {
      return this.#M.textRenderers;
    }
    get duration() {
      return this.$state.duration();
    }
    set duration(e) {
      this.#sR.duration.set(e);
    }
    get paused() {
      return (0, i.peek)(this.$state.paused);
    }
    set paused(e) {
      this.#sz(e);
    }
    #eb() {
      this.#sz(this.$props.paused());
    }
    #sz(e) {
      e
        ? this.canPlayQueue.enqueue("paused", () => this.#sD.pause())
        : this.canPlayQueue.enqueue("paused", () => this.#sD.play());
    }
    get muted() {
      return (0, i.peek)(this.$state.muted);
    }
    set muted(e) {
      this.#sj(e);
    }
    #sO() {
      this.#sj(this.$props.muted());
    }
    #sj(e) {
      this.canPlayQueue.enqueue("muted", () => {
        this.#ez && this.#ez.setMuted(e);
      });
    }
    get currentTime() {
      return (0, i.peek)(this.$state.currentTime);
    }
    set currentTime(e) {
      this.#s_(e);
    }
    #sN() {
      this.#s_(this.$props.currentTime());
    }
    #s_(e) {
      this.canPlayQueue.enqueue("currentTime", () => {
        let { currentTime: t } = this.$state;
        e !== (0, i.peek)(t) &&
          (0, i.peek)(() => {
            if (!this.#ez) return;
            let t = eX(e, this.$state);
            Number.isFinite(t) && this.#ez.setCurrentTime(t);
          });
      });
    }
    get volume() {
      return (0, i.peek)(this.$state.volume);
    }
    set volume(e) {
      this.#sX(e);
    }
    #sF() {
      this.#sX(this.$props.volume());
    }
    #sX(e) {
      let t = e9(0, e, 1);
      this.canPlayQueue.enqueue("volume", () => {
        this.#ez && this.#ez.setVolume(t);
      });
    }
    get playbackRate() {
      return (0, i.peek)(this.$state.playbackRate);
    }
    set playbackRate(e) {
      this.#sJ(e);
    }
    #sU() {
      this.#sJ(this.$props.playbackRate());
    }
    #sJ(e) {
      this.canPlayQueue.enqueue("rate", () => {
        this.#ez && this.#ez.setPlaybackRate?.(e);
      });
    }
    #sw() {
      this.#sY(this.$props.playsInline());
    }
    #sY(e) {
      this.canPlayQueue.enqueue("playsinline", () => {
        this.#ez && this.#ez.setPlaysInline?.(e);
      });
    }
    #sB() {
      let e = this.$props.storage(),
        t = (0, i.isString)(e) ? new e0() : e;
      if (t?.onChange) {
        let { source: s } = this.$state,
          a = (0, i.isString)(e) ? e : this.el?.id,
          n = (0, i.computed)(this.#sZ.bind(this));
        (0, i.effect)(() => t.onChange(s(), n(), a || void 0));
      }
      ((this.#M.storage = t),
        this.#M.textTracks.setStorage(t),
        (0, i.onDispose)(() => {
          (t?.onDestroy?.(),
            (this.#M.storage = null),
            this.#M.textTracks.setStorage(null));
        }));
    }
    #sZ() {
      let { clipStartTime: e, clipEndTime: t } = this.$props,
        { source: i } = this.$state,
        s = i();
      return s.src ? `${s.src}:${e()}:${t()}` : null;
    }
    async play(e) {
      return this.#sD.play(e);
    }
    async pause(e) {
      return this.#sD.pause(e);
    }
    async enterFullscreen(e, t) {
      return this.#sD.enterFullscreen(e, t);
    }
    async exitFullscreen(e, t) {
      return this.#sD.exitFullscreen(e, t);
    }
    enterPictureInPicture(e) {
      return this.#sD.enterPictureInPicture(e);
    }
    exitPictureInPicture(e) {
      return this.#sD.exitPictureInPicture(e);
    }
    seekToLiveEdge(e) {
      this.#sD.seekToLiveEdge(e);
    }
    startLoading(e) {
      this.#M.notify("can-load", void 0, e);
    }
    startLoadingPoster(e) {
      this.#M.notify("can-load-poster", void 0, e);
    }
    requestAirPlay(e) {
      return this.#sD.requestAirPlay(e);
    }
    requestGoogleCast(e) {
      return this.#sD.requestGoogleCast(e);
    }
    setAudioGain(e, t) {
      return this.#sD.setAudioGain(e, t);
    }
    destroy() {
      (super.destroy(),
        this.#M.remote.setPlayer(null),
        this.dispatch("destroy"));
    }
  }
  let iD = iL.prototype;
  ((0, i.prop)(iD, "canPlayQueue"),
    (0, i.prop)(iD, "remoteControl"),
    (0, i.prop)(iD, "provider"),
    (0, i.prop)(iD, "controls"),
    (0, i.prop)(iD, "orientation"),
    (0, i.prop)(iD, "title"),
    (0, i.prop)(iD, "qualities"),
    (0, i.prop)(iD, "audioTracks"),
    (0, i.prop)(iD, "textTracks"),
    (0, i.prop)(iD, "textRenderers"),
    (0, i.prop)(iD, "duration"),
    (0, i.prop)(iD, "paused"),
    (0, i.prop)(iD, "muted"),
    (0, i.prop)(iD, "currentTime"),
    (0, i.prop)(iD, "volume"),
    (0, i.prop)(iD, "playbackRate"),
    (0, i.method)(iD, "play"),
    (0, i.method)(iD, "pause"),
    (0, i.method)(iD, "enterFullscreen"),
    (0, i.method)(iD, "exitFullscreen"),
    (0, i.method)(iD, "enterPictureInPicture"),
    (0, i.method)(iD, "exitPictureInPicture"),
    (0, i.method)(iD, "seekToLiveEdge"),
    (0, i.method)(iD, "startLoading"),
    (0, i.method)(iD, "startLoadingPoster"),
    (0, i.method)(iD, "requestAirPlay"),
    (0, i.method)(iD, "requestGoogleCast"),
    (0, i.method)(iD, "setAudioGain"));
  let iR = new Map();
  class iI {
    #s0 = !1;
    #s1;
    #s2;
    #M;
    #s3;
    constructor(e, t, s, a = []) {
      ((this.#s2 = e), (this.#M = t), (this.#s3 = s));
      let n = new ii(),
        r = new tD(),
        o = new tL(),
        h = new tM(),
        l = [new ia(), new is()];
      this.#s1 = (0, i.computed)(() => {
        let e = t.$state.remotePlaybackLoader(),
          i = t.$props.preferNativeHLS()
            ? [o, h, n, r, ...l, ...a]
            : [r, o, h, n, ...l, ...a];
        return e ? [e, ...i] : i;
      });
      let { $state: d } = t;
      for (let e of (d.sources.set(iV(t.$props.src())), d.sources())) {
        let i = this.#s1().find((t) => t.canPlay(e));
        if (!i) continue;
        let s = i.mediaType(e);
        (t.$state.source.set(e),
          t.$state.mediaType.set(s),
          t.$state.inferredViewType.set(s),
          this.#s3.set(i),
          (this.#s0 = !0));
        break;
      }
    }
    connect() {
      let e = this.#s3();
      (this.#s0 &&
        (this.#s5(this.#M.$state.source(), e), this.#s4(e), (this.#s0 = !1)),
        (0, i.effect)(this.#s7.bind(this)),
        (0, i.effect)(this.#s6.bind(this)),
        (0, i.effect)(this.#s9.bind(this)),
        (0, i.effect)(this.#s8.bind(this)),
        (0, i.effect)(this.#ae.bind(this)));
    }
    #s7() {
      this.#M.notify("sources-change", [
        ...iV(this.#M.$props.src()),
        ...this.#s2(),
      ]);
    }
    #s6() {
      let { $state: e } = this.#M,
        t = e.sources(),
        s = (0, i.peek)(e.source),
        a = this.#at(s, t);
      if (t[0]?.src && !a.src && !a.type) {
        let { crossOrigin: s } = e,
          a = eN(s()),
          n = new AbortController();
        return (
          Promise.all(
            t.map((e) =>
              (0, i.isString)(e.src) && "?" === e.type
                ? fetch(e.src, {
                    method: "HEAD",
                    credentials: a,
                    signal: n.signal,
                  })
                    .then(
                      (t) => (
                        (e.type = t.headers.get("content-type") || "??"),
                        iR.set(e.src, e.type),
                        e
                      ),
                    )
                    .catch(() => e)
                : e,
            ),
          ).then((t) => {
            if (n.signal.aborted) return;
            let s = this.#at((0, i.peek)(e.source), t);
            ((0, i.tick)(),
              s.src ||
                this.#M.notify("error", {
                  message: "Failed to load resource.",
                  code: 4,
                }));
          }),
          () => n.abort()
        );
      }
      (0, i.tick)();
    }
    #at(e, t) {
      let s = { src: "", type: "" },
        a = null,
        n = new i.DOMEvent("sources-change", { detail: { sources: t } }),
        r = this.#s1(),
        {
          started: o,
          paused: h,
          currentTime: l,
          quality: d,
          savedState: u,
        } = this.#M.$state;
      for (let e of t) {
        let t = r.find((t) => t.canPlay(e));
        if (t) {
          ((s = e), (a = t));
          break;
        }
      }
      if (en(s)) {
        let e = d(),
          a = t.find((t) => t.src === e?.src);
        ((0, i.peek)(o)
          ? u.set({ paused: (0, i.peek)(h), currentTime: (0, i.peek)(l) })
          : u.set(null),
          a &&
            ((s = a),
            (n = new i.DOMEvent("quality-change", {
              detail: { quality: e },
            }))));
      }
      return (
        iF(e, s) || this.#s5(s, a, n),
        a !== (0, i.peek)(this.#s3) && this.#s4(a, n),
        s
      );
    }
    #s5(e, t, i) {
      (this.#M.notify("source-change", e, i),
        this.#M.notify("media-type-change", t?.mediaType(e) || "unknown", i));
    }
    #s4(e, t) {
      (this.#M.$providerSetup.set(!1),
        this.#M.notify("provider-change", null, t),
        e && (0, i.peek)(() => e.preconnect?.(this.#M)),
        this.#s3.set(e),
        this.#M.notify("provider-loader-change", e, t));
    }
    #s9() {
      let e = this.#M.$provider();
      if (!(!e || (0, i.peek)(this.#M.$providerSetup))) {
        if (this.#M.$state.canLoad()) {
          ((0, i.scoped)(() => e.setup(), e.scope),
            this.#M.$providerSetup.set(!0));
          return;
        }
        (0, i.peek)(() => e.preconnect?.());
      }
    }
    #s8() {
      if (!this.#M.$providerSetup()) return;
      let e = this.#M.$provider(),
        t = this.#M.$state.source(),
        s = (0, i.peek)(this.#M.$state.crossOrigin),
        a = (0, i.peek)(this.#M.$props.preferNativeHLS);
      if (!iF(e?.currentSrc, t)) {
        if (this.#M.$state.canLoad()) {
          let n = new AbortController();
          if (eD(t))
            (a || !eb()) &&
              (function e(t, i) {
                return fetch(t, i)
                  .then((e) => e.text())
                  .then((s) => {
                    let a,
                      n = (a = s.match(/#EXT-X-STREAM-INF:[^\n]+(\n[^\n]+)*/g))
                        ? a[0].split("\n")[1].trim()
                        : null;
                    if (n)
                      return e(/^https?:/.test(n) ? n : new URL(n, t).href, i);
                    let r = /EXT-X-PLAYLIST-TYPE:\s*VOD/.test(s)
                      ? "on-demand"
                      : "live";
                    return "live" === r &&
                      (function (e) {
                        for (let t of e.split("\n"))
                          if (t.startsWith("#EXT-X-TARGETDURATION")) {
                            let e = parseFloat(t.split(":")[1]);
                            if (!isNaN(e)) return e;
                          }
                        return -1;
                      })(s) >= 10 &&
                      (/#EXT-X-DVR-ENABLED:\s*true/.test(s) ||
                        s.includes("#EXT-X-DISCONTINUITY"))
                      ? "live:dvr"
                      : r;
                  });
              })(t.src, { credentials: eN(s), signal: n.signal })
                .then((e) => {
                  this.#M.notify("stream-type-change", e);
                })
                .catch(i.noop);
          else if (eR(t))
            fetch(t.src, { credentials: eN(s), signal: n.signal })
              .then((e) => e.text())
              .then((e) => (/type="static"/.test(e) ? "on-demand" : "live"))
              .then((e) => {
                this.#M.notify("stream-type-change", e);
              })
              .catch(i.noop);
          else this.#M.notify("stream-type-change", "on-demand");
          return (
            (0, i.peek)(() => {
              let s = (0, i.peek)(this.#M.$state.preload);
              return e?.loadSource(t, s).catch((e) => {});
            }),
            () => n.abort()
          );
        }
        try {
          (0, i.isString)(t.src) && eV(new URL(t.src).origin);
        } catch (e) {}
      }
    }
    #ae() {
      let e = this.#s3(),
        { providedPoster: t, source: s, canLoadPoster: a } = this.#M.$state;
      if (!e || !e.loadPoster || !s() || !a() || t()) return;
      let n = new AbortController(),
        r = new i.DOMEvent("source-change", { detail: s });
      return (
        e
          .loadPoster(s(), this.#M, n)
          .then((e) => {
            this.#M.notify("poster-change", e || "", r);
          })
          .catch(() => {
            this.#M.notify("poster-change", "", r);
          }),
        () => {
          n.abort();
        }
      );
    }
  }
  function iV(e) {
    return ((0, i.isArray)(e) ? e : [e]).map((e) =>
      (0, i.isString)(e)
        ? { src: e, type: iO(e) }
        : { ...e, type: iO(e.src, e.type) },
    );
  }
  function iO(e, t) {
    if ((0, i.isString)(t) && t.length) return t;
    if ((0, i.isString)(e) && iR.has(e)) return iR.get(e);
    if (!t && eD({ src: e, type: "" })) return "application/x-mpegurl";
    if (!t && eR({ src: e, type: "" })) return "application/dash+xml";
    if (!(0, i.isString)(e) || e.startsWith("blob:")) return "video/object";
    else if (e.includes("youtube") || e.includes("youtu.be"))
      return "video/youtube";
    else if (
      e.includes("vimeo") &&
      !e.includes("progressive_redirect") &&
      !e.includes(".m3u8")
    )
      return "video/vimeo";
    return "?";
  }
  function iF(e, t) {
    return e?.src === t?.src && e?.type === t?.type;
  }
  class iN {
    #ai;
    #M;
    #as = [];
    constructor(e, t) {
      ((this.#ai = e), (this.#M = t), (0, i.effect)(this.#aa.bind(this)));
    }
    #aa() {
      let e = this.#ai();
      for (let t of this.#as)
        if (!e.some((e) => e.id === t.id)) {
          let e = t.id && this.#M.textTracks.getById(t.id);
          e && this.#M.textTracks.remove(e);
        }
      for (let t of e) {
        let e = t.id || eW.createId(t);
        this.#M.textTracks.getById(e) ||
          ((t.id = e), this.#M.textTracks.add(t));
      }
      this.#as = e;
    }
  }
  class iU extends i.Component {
    static props = { loaders: [] };
    static state = new i.State({ loader: null });
    #M;
    #an;
    #s2 = (0, i.signal)([]);
    #ai = (0, i.signal)([]);
    #s3 = null;
    onSetup() {
      ((this.#M = eY()),
        (this.#an = new iI(
          this.#s2,
          this.#M,
          this.$state.loader,
          this.$props.loaders(),
        )));
    }
    onAttach(e) {
      e.setAttribute("data-media-provider", "");
    }
    onConnect(e) {
      (this.#an.connect(), new iN(this.#ai, this.#M));
      let t = new ResizeObserver(
        (0, i.animationFrameThrottle)(this.#sQ.bind(this)),
      );
      t.observe(e);
      let s = new MutationObserver(this.#ar.bind(this));
      (s.observe(e, { attributes: !0, childList: !0 }),
        this.#sQ(),
        this.#ar(),
        (0, i.onDispose)(() => {
          (t.disconnect(), s.disconnect());
        }));
    }
    #ao = -1;
    load(e) {
      (e?.setAttribute("aria-hidden", "true"),
        window.cancelAnimationFrame(this.#ao),
        (this.#ao = requestAnimationFrame(() => this.#ah(e))),
        (0, i.onDispose)(() => {
          window.cancelAnimationFrame(this.#ao);
        }));
    }
    #ah(e) {
      if (!this.scope) return;
      let t = this.$state.loader(),
        { $provider: s } = this.#M;
      (this.#s3 === t && t?.target === e && (0, i.peek)(s)) ||
        (this.#al(),
        (this.#s3 = t),
        t && (t.target = e || null),
        t &&
          e &&
          t.load(this.#M).then((e) => {
            this.scope &&
              (0, i.peek)(this.$state.loader) === t &&
              this.#M.notify("provider-change", e);
          }));
    }
    onDestroy() {
      ((this.#s3 = null), this.#al());
    }
    #al() {
      this.#M?.notify("provider-change", null);
    }
    #sQ() {
      if (!this.el) return;
      let { player: e, $state: t } = this.#M,
        s = this.el.offsetWidth,
        a = this.el.offsetHeight;
      e &&
        (t.mediaWidth.set(s),
        t.mediaHeight.set(a),
        e.el &&
          ((0, i.setStyle)(e.el, "--media-width", s + "px"),
          (0, i.setStyle)(e.el, "--media-height", a + "px")));
    }
    #ar() {
      let e = [],
        t = [];
      for (let s of this.el.children)
        if (!s.hasAttribute("data-vds")) {
          if (s instanceof HTMLSourceElement) {
            let t = { id: s.id, src: s.src, type: s.type };
            for (let e of [
              "id",
              "src",
              "width",
              "height",
              "bitrate",
              "codec",
            ]) {
              let a = s.getAttribute(`data-${e}`);
              (0, i.isString)(a) &&
                (t[e] = /id|src|codec/.test(e) ? a : Number(a));
            }
            e.push(t);
          } else if (s instanceof HTMLTrackElement) {
            let e = {
              src: s.src,
              kind: s.track.kind,
              language: s.srclang,
              label: s.label,
              default: s.default,
              type: s.getAttribute("data-type"),
            };
            t.push({ id: s.id || eW.createId(e), ...e });
          }
        }
      (this.#s2.set(e), this.#ai.set(t), (0, i.tick)());
    }
  }
  let iB = iU.prototype;
  (0, i.method)(iB, "load");
  class iK extends i.Component {
    static props = { translations: null };
    static state = new i.State({ label: null, busy: !1 });
    #M;
    #ad = !1;
    onSetup() {
      this.#M = eY();
    }
    onAttach(e) {
      e.style.display = "contents";
    }
    onConnect(e) {
      (e.setAttribute("data-media-announcer", ""),
        tt(e, "role", "status"),
        tt(e, "aria-live", "polite"));
      let { busy: t } = this.$state;
      (this.setAttributes({ "aria-busy": () => (t() ? "true" : null) }),
        (this.#ad = !0),
        (0, i.effect)(this.#eb.bind(this)),
        (0, i.effect)(this.#sF.bind(this)),
        (0, i.effect)(this.#au.bind(this)),
        (0, i.effect)(this.#ac.bind(this)),
        (0, i.effect)(this.#ap.bind(this)),
        (0, i.effect)(this.#am.bind(this)),
        (0, i.effect)(this.#ag.bind(this)),
        (0, i.tick)(),
        (this.#ad = !1));
    }
    #eb() {
      let { paused: e } = this.#M.$state;
      this.#af(e() ? "Pause" : "Play");
    }
    #ac() {
      let { fullscreen: e } = this.#M.$state;
      this.#af(e() ? "Enter Fullscreen" : "Exit Fullscreen");
    }
    #ap() {
      let { pictureInPicture: e } = this.#M.$state;
      this.#af(e() ? "Enter PiP" : "Exit PiP");
    }
    #au() {
      let { textTrack: e } = this.#M.$state;
      this.#af(e() ? "Closed-Captions On" : "Closed-Captions Off");
    }
    #sF() {
      let { muted: e, volume: t, audioGain: i } = this.#M.$state;
      this.#af(
        e() || 0 === t()
          ? "Mute"
          : `${Math.round(t() * (i() ?? 1) * 100)}% ${this.#ay("Volume")}`,
      );
    }
    #av = -1;
    #ab = -1;
    #am() {
      let { seeking: e, currentTime: t } = this.#M.$state,
        s = e();
      this.#av > 0
        ? (window.clearTimeout(this.#ab),
          (this.#ab = window.setTimeout(() => {
            if (!this.scope) return;
            let e = (0, i.peek)(t),
              s = Math.abs(e - this.#av);
            if (s >= 1) {
              let t = e >= this.#av,
                i = il(s);
              this.#af(
                `${this.#ay(t ? "Seek Forward" : "Seek Backward")} ${i}`,
              );
            }
            ((this.#av = -1), (this.#ab = -1));
          }, 300)))
        : s && (this.#av = (0, i.peek)(t));
    }
    #ay(e) {
      let { translations: t } = this.$props;
      return t?.()?.[e || ""] ?? e;
    }
    #ag() {
      let { label: e, busy: t } = this.$state,
        s = this.#ay(e());
      if (this.#ad) return;
      t.set(!0);
      let a = window.setTimeout(() => void t.set(!1), 150);
      return (
        this.el && (0, i.setAttribute)(this.el, "aria-label", s),
        (0, i.isString)(s) && this.dispatch("change", { detail: s }),
        () => window.clearTimeout(a)
      );
    }
    #af(e) {
      let { label: t } = this.$state;
      t.set(e);
    }
  }
  class iW extends i.Component {
    static props = { hideDelay: 2e3, hideOnMouseLeave: !1 };
    #M;
    onSetup() {
      ((this.#M = eY()), (0, i.effect)(this.#aw.bind(this)));
    }
    onAttach(e) {
      let { pictureInPicture: t, fullscreen: s } = this.#M.$state;
      ((0, i.setStyle)(e, "pointer-events", "none"),
        tt(e, "role", "group"),
        this.setAttributes({
          "data-visible": this.#ak.bind(this),
          "data-fullscreen": s,
          "data-pip": t,
        }),
        (0, i.effect)(() => {
          this.dispatch("change", { detail: this.#ak() });
        }),
        (0, i.effect)(this.#aT.bind(this)),
        (0, i.effect)(() => {
          let t = s();
          for (let s of ["top", "right", "bottom", "left"])
            (0, i.setStyle)(
              e,
              `padding-${s}`,
              t && `env(safe-area-inset-${s})`,
            );
        }));
    }
    #aT() {
      if (!this.el) return;
      let { nativeControls: e } = this.#M.$state,
        t = e();
      ((0, i.setAttribute)(this.el, "aria-hidden", t ? "true" : null),
        (0, i.setStyle)(this.el, "display", t ? "none" : null));
    }
    #aw() {
      let { controls: e } = this.#M.player,
        { hideDelay: t, hideOnMouseLeave: i } = this.$props;
      ((e.defaultDelay = 2e3 === t() ? this.#M.$props.controlsDelay() : t()),
        (e.hideOnMouseLeave = i()));
    }
    #ak() {
      let { controlsVisible: e } = this.#M.$state;
      return e();
    }
  }
  class iG extends i.Component {
    onAttach(e) {
      e.style.pointerEvents || (0, i.setStyle)(e, "pointer-events", "auto");
    }
  }
  class iQ extends i.ViewController {
    #ax;
    constructor(e) {
      (super(), (this.#ax = e), (0, i.effect)(this.#aS.bind(this)));
    }
    onDestroy() {
      (this.#a$?.(), (this.#a$ = null));
    }
    #aS() {
      let e = this.#ax.trigger();
      if (!e) return void this.hide();
      let t = this.show.bind(this),
        i = this.hide.bind(this);
      this.#ax.listen(e, t, i);
    }
    #aC = -1;
    #aP = -1;
    #a$ = null;
    show(e) {
      (this.#aE(),
        window.cancelAnimationFrame(this.#aP),
        (this.#aP = -1),
        this.#a$?.(),
        (this.#a$ = null),
        (this.#aC = window.setTimeout(() => {
          this.#aC = -1;
          let t = this.#ax.content();
          (t && t.style.removeProperty("display"),
            (0, i.peek)(() => this.#ax.onChange(!0, e)));
        }, this.#ax.showDelay?.() ?? 0)));
    }
    hide(e) {
      (this.#aE(),
        (0, i.peek)(() => this.#ax.onChange(!1, e)),
        (this.#aP = requestAnimationFrame(() => {
          (this.#aE(), (this.#aP = -1));
          let e = this.#ax.content();
          if (e) {
            let t = () => {
              ((e.style.display = "none"), (this.#a$ = null));
            };
            if ("none" !== getComputedStyle(e).animationName) {
              this.#a$?.();
              let s = (0, i.listenEvent)(e, "animationend", t, { once: !0 });
              this.#a$ = s;
            } else t();
          }
        })));
    }
    #aE() {
      (window.clearTimeout(this.#aC), (this.#aC = -1));
    }
  }
  let iH = (0, i.createContext)(),
    iz = 0;
  class ij extends i.Component {
    static props = { showDelay: 700 };
    #eG = `media-tooltip-${++iz}`;
    #aA = (0, i.signal)(null);
    #aq = (0, i.signal)(null);
    #aM = (0, i.signal)(!1);
    constructor() {
      (super(), new iA());
      let { showDelay: e } = this.$props;
      new iQ({
        trigger: this.#aA,
        content: this.#aq,
        showDelay: e,
        listen(e, t, s) {
          ((0, i.effect)(() => {
            (iE() && (0, i.listenEvent)(e, "focus", t),
              (0, i.listenEvent)(e, "blur", s));
          }),
            new i.EventsController(e)
              .add("touchstart", (e) => e.preventDefault(), { passive: !1 })
              .add("mouseenter", t)
              .add("mouseleave", s));
        },
        onChange: this.#aL.bind(this),
      });
    }
    onAttach(e) {
      e.style.setProperty("display", "contents");
    }
    onSetup() {
      (0, i.provideContext)(iH, {
        trigger: this.#aA,
        content: this.#aq,
        showing: this.#aM,
        attachTrigger: this.#aD.bind(this),
        detachTrigger: this.#aR.bind(this),
        attachContent: this.#aI.bind(this),
        detachContent: this.#aV.bind(this),
      });
    }
    #aD(e) {
      this.#aA.set(e);
      let t = e.getAttribute("data-media-tooltip");
      (t && this.el?.setAttribute(`data-media-${t}-tooltip`, ""),
        (0, i.setAttribute)(e, "data-describedby", this.#eG));
    }
    #aR(e) {
      (e.removeAttribute("data-describedby"),
        e.removeAttribute("aria-describedby"),
        this.#aA.set(null));
    }
    #aI(e) {
      (e.setAttribute("id", this.#eG),
        (e.style.display = "none"),
        tt(e, "role", "tooltip"),
        this.#aq.set(e));
    }
    #aV(e) {
      (e.removeAttribute("id"), e.removeAttribute("role"), this.#aq.set(null));
    }
    #aL(e) {
      let t = this.#aA(),
        s = this.#aq();
      for (let a of (t &&
        (0, i.setAttribute)(t, "aria-describedby", e ? this.#eG : null),
      [this.el, t, s]))
        a && (0, i.setAttribute)(a, "data-visible", e);
      this.#aM.set(e);
    }
  }
  class i_ extends i.Component {
    constructor() {
      (super(), new iA());
    }
    onConnect(e) {
      (0, i.onDispose)(
        th(() => {
          if (!this.connectScope) return;
          this.#aO();
          let e = (0, i.useContext)(iH);
          (0, i.onDispose)(() => {
            let t = this.#aF();
            t && e.detachTrigger(t);
          });
        }),
      );
    }
    #aO() {
      let e = this.#aF(),
        t = (0, i.useContext)(iH);
      e && t.attachTrigger(e);
    }
    #aF() {
      let e = this.el.firstElementChild;
      return e?.localName === "button" || e?.getAttribute("role") === "button"
        ? e
        : this.el;
    }
  }
  class iX extends i.Component {
    static props = { placement: "top center", offset: 0, alignOffset: 0 };
    constructor() {
      (super(), new iA());
      let { placement: e } = this.$props;
      this.setAttributes({ "data-placement": e });
    }
    onAttach(e) {
      (this.#aO(e),
        Object.assign(e.style, {
          position: "absolute",
          top: 0,
          left: 0,
          width: "max-content",
        }));
    }
    onConnect(e) {
      this.#aO(e);
      let t = (0, i.useContext)(iH);
      ((0, i.onDispose)(() => t.detachContent(e)),
        (0, i.onDispose)(
          th(() => {
            this.connectScope && (0, i.effect)(this.#aN.bind(this));
          }),
        ));
    }
    #aO(e) {
      (0, i.useContext)(iH).attachContent(e);
    }
    #aN() {
      let { showing: e } = (0, i.useContext)(iH);
      if (!e()) return;
      let { placement: t, offset: s, alignOffset: a } = this.$props;
      return tl(this.el, this.#aU(), t(), {
        offsetVarName: "media-tooltip",
        xOffset: a(),
        yOffset: s(),
      });
    }
    #aU() {
      return (0, i.useContext)(iH).trigger();
    }
  }
  class iJ extends i.ViewController {
    static props = { disabled: !1 };
    #ax;
    constructor(e) {
      (super(),
        (this.#ax = e),
        new iA(),
        e.keyShortcut && new tS(e.keyShortcut));
    }
    onSetup() {
      let { disabled: e } = this.$props;
      this.setAttributes({
        "data-pressed": this.#ax.isPresssed,
        "aria-pressed": this.#aB.bind(this),
        "aria-disabled": () => (e() ? "true" : null),
      });
    }
    onAttach(e) {
      (tt(e, "tabindex", "0"),
        tt(e, "role", "button"),
        tt(e, "type", "button"));
    }
    onConnect(e) {
      let t = tr(e, this.#aK.bind(this));
      for (let e of ["click", "touchstart"])
        t.add(e, this.#aW.bind(this), { passive: !0 });
    }
    #aB() {
      return (0, i.ariaBool)(this.#ax.isPresssed());
    }
    #aG(e) {
      (0, i.isWriteSignal)(this.#ax.isPresssed) &&
        this.#ax.isPresssed.set((e) => !e);
    }
    #aK(e) {
      if (this.$props.disabled() || this.el.hasAttribute("data-disabled")) {
        (e.preventDefault(), e.stopImmediatePropagation());
        return;
      }
      (e.preventDefault(), (this.#ax.onPress ?? this.#aG).call(this, e));
    }
    #aW(e) {
      this.$props.disabled() &&
        (e.preventDefault(), e.stopImmediatePropagation());
    }
  }
  class iY extends i.Component {
    static props = { disabled: !1, defaultPressed: !1 };
    #aQ = (0, i.signal)(!1);
    get pressed() {
      return this.#aQ();
    }
    constructor() {
      (super(), new iJ({ isPresssed: this.#aQ }));
    }
  }
  let iZ = iY.prototype;
  (0, i.prop)(iZ, "pressed");
  class i0 extends i.Component {
    static props = iJ.props;
    #M;
    constructor() {
      (super(),
        new iJ({
          isPresssed: this.#aH.bind(this),
          onPress: this.#az.bind(this),
        }));
    }
    onSetup() {
      this.#M = eY();
      let { canAirPlay: e, isAirPlayConnected: t } = this.#M.$state;
      this.setAttributes({
        "data-active": t,
        "data-supported": e,
        "data-state": this.#aj.bind(this),
        "aria-hidden": iv(() => !e()),
      });
    }
    onAttach(e) {
      (e.setAttribute("data-media-tooltip", "airplay"),
        ti(e, this.#a_.bind(this)));
    }
    #az(e) {
      this.#M.remote.requestAirPlay(e);
    }
    #aH() {
      let { remotePlaybackType: e, remotePlaybackState: t } = this.#M.$state;
      return "airplay" === e() && "disconnected" !== t();
    }
    #aj() {
      let { remotePlaybackType: e, remotePlaybackState: t } = this.#M.$state;
      return "airplay" === e() && t();
    }
    #a_() {
      let { remotePlaybackState: e } = this.#M.$state;
      return `AirPlay ${e()}`;
    }
  }
  class i1 extends i.Component {
    static props = iJ.props;
    #M;
    constructor() {
      (super(),
        new iJ({
          isPresssed: this.#aH.bind(this),
          onPress: this.#az.bind(this),
        }));
    }
    onSetup() {
      this.#M = eY();
      let { canGoogleCast: e, isGoogleCastConnected: t } = this.#M.$state;
      this.setAttributes({
        "data-active": t,
        "data-supported": e,
        "data-state": this.#aj.bind(this),
        "aria-hidden": iv(() => !e()),
      });
    }
    onAttach(e) {
      (e.setAttribute("data-media-tooltip", "google-cast"),
        ti(e, this.#a_.bind(this)));
    }
    #az(e) {
      this.#M.remote.requestGoogleCast(e);
    }
    #aH() {
      let { remotePlaybackType: e, remotePlaybackState: t } = this.#M.$state;
      return "google-cast" === e() && "disconnected" !== t();
    }
    #aj() {
      let { remotePlaybackType: e, remotePlaybackState: t } = this.#M.$state;
      return "google-cast" === e() && t();
    }
    #a_() {
      let { remotePlaybackState: e } = this.#M.$state;
      return `Google Cast ${e()}`;
    }
  }
  class i2 extends i.Component {
    static props = iJ.props;
    #M;
    constructor() {
      (super(),
        new iJ({
          isPresssed: this.#aH.bind(this),
          keyShortcut: "togglePaused",
          onPress: this.#az.bind(this),
        }));
    }
    onSetup() {
      this.#M = eY();
      let { paused: e, ended: t } = this.#M.$state;
      this.setAttributes({ "data-paused": e, "data-ended": t });
    }
    onAttach(e) {
      (e.setAttribute("data-media-tooltip", "play"), ti(e, "Play"));
    }
    #az(e) {
      let t = this.#M.remote;
      this.#aH() ? t.pause(e) : t.play(e);
    }
    #aH() {
      let { paused: e } = this.#M.$state;
      return !e();
    }
  }
  class i3 extends i.Component {
    static props = iJ.props;
    #M;
    constructor() {
      (super(),
        new iJ({
          isPresssed: this.#aH.bind(this),
          keyShortcut: "toggleCaptions",
          onPress: this.#az.bind(this),
        }));
    }
    onSetup() {
      ((this.#M = eY()),
        this.setAttributes({
          "data-active": this.#aH.bind(this),
          "data-supported": () => !this.#aX(),
          "aria-hidden": iv(this.#aX.bind(this)),
        }));
    }
    onAttach(e) {
      (e.setAttribute("data-media-tooltip", "caption"), ti(e, "Captions"));
    }
    #az(e) {
      this.#M.remote.toggleCaptions(e);
    }
    #aH() {
      let { textTrack: e } = this.#M.$state,
        t = e();
      return !!t && eQ(t);
    }
    #aX() {
      let { hasCaptions: e } = this.#M.$state;
      return !e();
    }
  }
  class i5 extends i.Component {
    static props = { ...iJ.props, target: "prefer-media" };
    #M;
    constructor() {
      (super(),
        new iJ({
          isPresssed: this.#aH.bind(this),
          keyShortcut: "toggleFullscreen",
          onPress: this.#az.bind(this),
        }));
    }
    onSetup() {
      this.#M = eY();
      let { fullscreen: e } = this.#M.$state,
        t = this.#aJ.bind(this);
      this.setAttributes({
        "data-active": e,
        "data-supported": t,
        "aria-hidden": iv(() => !t()),
      });
    }
    onAttach(e) {
      (e.setAttribute("data-media-tooltip", "fullscreen"), ti(e, "Fullscreen"));
    }
    #az(e) {
      let t = this.#M.remote,
        i = this.$props.target();
      this.#aH() ? t.exitFullscreen(i, e) : t.enterFullscreen(i, e);
    }
    #aH() {
      let { fullscreen: e } = this.#M.$state;
      return e();
    }
    #aJ() {
      let { canFullscreen: e } = this.#M.$state;
      return e();
    }
  }
  class i4 extends i.Component {
    static props = iJ.props;
    #M;
    constructor() {
      (super(),
        new iJ({
          isPresssed: this.#aH.bind(this),
          keyShortcut: "toggleMuted",
          onPress: this.#az.bind(this),
        }));
    }
    onSetup() {
      ((this.#M = eY()),
        this.setAttributes({
          "data-muted": this.#aH.bind(this),
          "data-state": this.#aj.bind(this),
        }));
    }
    onAttach(e) {
      (e.setAttribute("data-media-mute-button", ""),
        e.setAttribute("data-media-tooltip", "mute"),
        ti(e, "Mute"));
    }
    #az(e) {
      let t = this.#M.remote;
      this.#aH() ? t.unmute(e) : t.mute(e);
    }
    #aH() {
      let { muted: e, volume: t } = this.#M.$state;
      return e() || 0 === t();
    }
    #aj() {
      let { muted: e, volume: t } = this.#M.$state,
        i = t();
      return e() || 0 === i
        ? "muted"
        : i >= 0.5
          ? "high"
          : i < 0.5
            ? "low"
            : void 0;
    }
  }
  class i7 extends i.Component {
    static props = iJ.props;
    #M;
    constructor() {
      (super(),
        new iJ({
          isPresssed: this.#aH.bind(this),
          keyShortcut: "togglePictureInPicture",
          onPress: this.#az.bind(this),
        }));
    }
    onSetup() {
      this.#M = eY();
      let { pictureInPicture: e } = this.#M.$state,
        t = this.#aJ.bind(this);
      this.setAttributes({
        "data-active": e,
        "data-supported": t,
        "aria-hidden": iv(() => !t()),
      });
    }
    onAttach(e) {
      (e.setAttribute("data-media-tooltip", "pip"), ti(e, "PiP"));
    }
    #az(e) {
      let t = this.#M.remote;
      this.#aH() ? t.exitPictureInPicture(e) : t.enterPictureInPicture(e);
    }
    #aH() {
      let { pictureInPicture: e } = this.#M.$state;
      return e();
    }
    #aJ() {
      let { canPictureInPicture: e } = this.#M.$state;
      return e();
    }
  }
  class i6 extends i.Component {
    static props = { disabled: !1, seconds: 30 };
    #M;
    constructor() {
      (super(), new iA());
    }
    onSetup() {
      this.#M = eY();
      let { seeking: e } = this.#M.$state,
        { seconds: t } = this.$props,
        i = this.#aJ.bind(this);
      this.setAttributes({
        seconds: t,
        "data-seeking": e,
        "data-supported": i,
        "aria-hidden": iv(() => !i()),
      });
    }
    onAttach(e) {
      (tt(e, "tabindex", "0"),
        tt(e, "role", "button"),
        tt(e, "type", "button"),
        e.setAttribute("data-media-tooltip", "seek"),
        ti(e, this.#a_.bind(this)));
    }
    onConnect(e) {
      tr(e, this.#az.bind(this));
    }
    #aJ() {
      let { canSeek: e } = this.#M.$state;
      return e();
    }
    #a_() {
      let { seconds: e } = this.$props;
      return `Seek ${e() > 0 ? "forward" : "backward"} ${e()} seconds`;
    }
    #az(e) {
      let { seconds: t, disabled: i } = this.$props;
      if (i()) return;
      let { currentTime: s } = this.#M.$state,
        a = s() + t();
      this.#M.remote.seek(a, e);
    }
  }
  class i9 extends i.Component {
    static props = { disabled: !1 };
    #M;
    constructor() {
      (super(), new iA());
    }
    onSetup() {
      this.#M = eY();
      let { disabled: e } = this.$props,
        { live: t, liveEdge: i } = this.#M.$state,
        s = () => !t();
      this.setAttributes({
        "data-edge": i,
        "data-hidden": s,
        "aria-disabled": iv(() => e() || i()),
        "aria-hidden": iv(s),
      });
    }
    onAttach(e) {
      (tt(e, "tabindex", "0"),
        tt(e, "role", "button"),
        tt(e, "type", "button"),
        e.setAttribute("data-media-tooltip", "live"));
    }
    onConnect(e) {
      tr(e, this.#az.bind(this));
    }
    #az(e) {
      let { disabled: t } = this.$props,
        { liveEdge: i } = this.#M.$state;
      t() || i() || this.#M.remote.seekToLiveEdge(e);
    }
  }
  let i8 = new i.State({
    min: 0,
    max: 100,
    value: 0,
    step: 1,
    pointerValue: 0,
    focused: !1,
    dragging: !1,
    pointing: !1,
    hidden: !1,
    get active() {
      return this.dragging || this.focused || this.pointing;
    },
    get fillRate() {
      return se(this.min, this.max, this.value);
    },
    get fillPercent() {
      return 100 * this.fillRate;
    },
    get pointerRate() {
      return se(this.min, this.max, this.pointerValue);
    },
    get pointerPercent() {
      return 100 * this.pointerRate;
    },
  });
  function se(e, t, i) {
    let s = t - e;
    return s > 0 ? (i - e) / s : 0;
  }
  class st extends i.ViewController {
    #ey;
    #aY;
    constructor(e) {
      (super(), (this.#ey = e));
    }
    onConnect(e) {
      ((this.#aY = new IntersectionObserver((e) => {
        this.#ey.callback?.(e, this.#aY);
      }, this.#ey)),
        this.#aY.observe(e),
        (0, i.onDispose)(this.#eA.bind(this)));
    }
    #eA() {
      (this.#aY?.disconnect(), (this.#aY = void 0));
    }
  }
  let si = (0, i.createContext)(),
    ss = (0, i.createContext)(),
    sa = {
      Left: -1,
      ArrowLeft: -1,
      Up: 1,
      ArrowUp: 1,
      Right: 1,
      ArrowRight: 1,
      Down: -1,
      ArrowDown: -1,
    };
  class sn extends i.ViewController {
    #ax;
    #M;
    #aY;
    constructor(e, t) {
      (super(), (this.#ax = e), (this.#M = t));
    }
    onSetup() {
      (0, i.hasProvidedContext)(ss) && (this.#aY = (0, i.useContext)(ss));
    }
    onConnect(e) {
      ((0, i.effect)(this.#aZ.bind(this, e)),
        (0, i.effect)(this.#a0.bind(this, e)),
        this.#ax.swipeGesture && (0, i.effect)(this.#a1.bind(this)));
    }
    #a1() {
      let { pointer: e } = this.#M.$state;
      if ("coarse" !== e() || !this.#ax.swipeGesture()) {
        this.#ez = null;
        return;
      }
      ((this.#ez = this.#M.player.el?.querySelector(
        "media-provider,[data-media-provider]",
      )),
        this.#ez &&
          new i.EventsController(this.#ez)
            .add("touchstart", this.#a2.bind(this), { passive: !0 })
            .add("touchmove", this.#a3.bind(this), { passive: !1 }));
    }
    #ez = null;
    #a5 = null;
    #a4 = null;
    #a2(e) {
      this.#a5 = e.touches[0];
    }
    #a3(e) {
      if ((0, i.isNull)(this.#a5) || to(e)) return;
      let t = e.touches[0],
        s = t.clientX - this.#a5.clientX,
        a = t.clientY - this.#a5.clientY,
        n = this.$state.dragging();
      (!n && Math.abs(a) > 5) ||
        (!n &&
          (e.preventDefault(),
          Math.abs(s) > 20 &&
            ((this.#a5 = t),
            (this.#a4 = this.$state.value()),
            this.#a7(this.#a4, e))));
    }
    #aZ(e) {
      let { hidden: t } = this.$props;
      ((0, i.listenEvent)(e, "focus", this.#sM.bind(this)),
        t() ||
          this.#ax.isDisabled() ||
          new i.EventsController(e)
            .add("keyup", this.#Z.bind(this))
            .add("keydown", this.#ee.bind(this))
            .add("pointerenter", this.#sA.bind(this))
            .add("pointermove", this.#a6.bind(this))
            .add("pointerleave", this.#sq.bind(this))
            .add("pointerdown", this.#a9.bind(this)));
    }
    #a0(e) {
      !this.#ax.isDisabled() &&
        this.$state.dragging() &&
        new i.EventsController(document)
          .add("pointerup", this.#a8.bind(this), { capture: !0 })
          .add("pointermove", this.#ne.bind(this))
          .add("touchmove", this.#nt.bind(this), { passive: !1 });
    }
    #sM() {
      this.#ni(this.$state.value());
    }
    #ns(e, t) {
      let { value: i, min: s, max: a, dragging: n } = this.$state,
        r = Math.max(s(), Math.min(e, a()));
      i.set(r);
      let o = this.createEvent("value-change", { detail: r, trigger: t });
      if ((this.dispatch(o), this.#ax.onValueChange?.(o), n())) {
        let e = this.createEvent("drag-value-change", {
          detail: r,
          trigger: t,
        });
        (this.dispatch(e), this.#ax.onDragValueChange?.(e));
      }
    }
    #ni(e, t) {
      let { pointerValue: i, dragging: s } = this.$state;
      (i.set(e),
        this.dispatch("pointer-value-change", { detail: e, trigger: t }),
        s() && this.#ns(e, t));
    }
    #na(e) {
      var t, s, a, n;
      let r,
        o,
        h = this.el.getBoundingClientRect(),
        { min: l, max: d } = this.$state;
      if ("vertical" === this.$props.orientation()) {
        let { bottom: t, height: i } = h;
        o = (t - e.clientY) / i;
      } else if (this.#a5 && (0, i.isNumber)(this.#a4)) {
        let { width: t } = this.#ez.getBoundingClientRect(),
          i = (e.clientX - this.#a5.clientX) / t,
          s = d() - l(),
          a = s * Math.abs(i);
        o = (i < 0 ? this.#a4 - a : this.#a4 + a) / s;
      } else {
        let { left: t, width: i } = h;
        o = (e.clientX - t) / i;
      }
      return Math.max(
        l(),
        Math.min(
          d(),
          this.#ax.roundValue(
            ((t = l()),
            (s = d()),
            (a = o),
            (r =
              (n = this.#ax.getStep()) *
              Math.round(((s - t) * e9(0, a, 1)) / n)),
            t + r),
          ),
        ),
      );
    }
    #sA(e) {
      this.$state.pointing.set(!0);
    }
    #a6(e) {
      let { dragging: t } = this.$state;
      t() || this.#ni(this.#na(e), e);
    }
    #sq(e) {
      this.$state.pointing.set(!1);
    }
    #a9(e) {
      if (0 !== e.button) return;
      let t = this.#na(e);
      (this.#a7(t, e), this.#ni(t, e));
    }
    #a7(e, t) {
      let { dragging: i } = this.$state;
      if (i()) return;
      (i.set(!0), this.#M.remote.pauseControls(t));
      let s = this.createEvent("drag-start", { detail: e, trigger: t });
      (this.dispatch(s), this.#ax.onDragStart?.(s), this.#aY?.onDragStart?.());
    }
    #nn(e, t) {
      let { dragging: i } = this.$state;
      if (!i()) return;
      (i.set(!1), this.#M.remote.resumeControls(t));
      let s = this.createEvent("drag-end", { detail: e, trigger: t });
      (this.dispatch(s),
        this.#ax.onDragEnd?.(s),
        (this.#a5 = null),
        (this.#a4 = null),
        this.#aY?.onDragEnd?.());
    }
    #nr;
    #no = !1;
    #ee(e) {
      if (!Object.keys(sa).includes(e.key)) return;
      let { key: t } = e,
        s = this.#nh(e);
      if (!(0, i.isNull)(s)) {
        (this.#ni(s, e), this.#ns(s, e));
        return;
      }
      let a = this.#nl(e);
      (this.#no ||
        ((this.#no = t === this.#nr),
        !this.$state.dragging() && this.#no && this.#a7(a, e)),
        this.#ni(a, e),
        (this.#nr = t));
    }
    #Z(e) {
      if (!Object.keys(sa).includes(e.key) || !(0, i.isNull)(this.#nh(e)))
        return;
      let t = this.#no ? this.$state.pointerValue() : this.#nl(e);
      (this.#ns(t, e), this.#nn(t, e), (this.#nr = ""), (this.#no = !1));
    }
    #nh(e) {
      let t = e.key,
        { min: i, max: s } = this.$state;
      return "Home" === t || "PageUp" === t
        ? i()
        : "End" === t || "PageDown" === t
          ? s()
          : !e.metaKey && /^[0-9]$/.test(t)
            ? ((s() - i()) / 10) * Number(t)
            : null;
    }
    #nl(e) {
      let { key: t, shiftKey: i } = e;
      (e.preventDefault(), e.stopPropagation());
      let { shiftKeyMultiplier: s } = this.$props,
        { min: a, max: n, value: r, pointerValue: o } = this.$state,
        h = this.#ax.getStep(),
        l = this.#ax.getKeyStep(),
        d = i ? l * s() : l,
        u = Number(sa[t]),
        c = this.#no ? o() : (this.#ax.getValue?.() ?? r());
      return Math.max(
        a(),
        Math.min(n(), Number((((c + d * u) / h) * h).toFixed(3))),
      );
    }
    #a8(e) {
      if (0 !== e.button) return;
      (e.preventDefault(), e.stopImmediatePropagation());
      let t = this.#na(e);
      (this.#ni(t, e), this.#nn(t, e));
    }
    #nt(e) {
      e.preventDefault();
    }
    #ne = (0, i.functionThrottle)(
      (e) => {
        this.#ni(this.#na(e), e);
      },
      20,
      { leading: !0 },
    );
  }
  let sr = (0, i.createContext)(() => ({}));
  class so extends i.ViewController {
    static props = {
      hidden: !1,
      disabled: !1,
      step: 1,
      keyStep: 1,
      orientation: "horizontal",
      shiftKeyMultiplier: 5,
    };
    #M;
    #ax;
    #nd = (0, i.signal)(!0);
    #nu = (0, i.signal)(!0);
    constructor(e) {
      (super(), (this.#ax = e));
    }
    onSetup() {
      this.#M = eY();
      let e = new iA();
      (e.attach(this),
        (this.$state.focused = e.focused.bind(e)),
        (0, i.hasProvidedContext)(sr) ||
          (0, i.provideContext)(sr, { default: "value" }),
        (0, i.provideContext)(si, {
          orientation: this.$props.orientation,
          disabled: this.#ax.isDisabled,
          preview: (0, i.signal)(null),
        }),
        (0, i.effect)(this.#nc.bind(this)),
        (0, i.effect)(this.#np.bind(this)),
        (0, i.effect)(this.#nm.bind(this)),
        this.#ng(),
        new sn(this.#ax, this.#M).attach(this),
        new st({ callback: this.#nf.bind(this) }).attach(this));
    }
    onAttach(e) {
      (tt(e, "role", "slider"),
        tt(e, "tabindex", "0"),
        tt(e, "autocomplete", "off"),
        er ? this.#ny() : (0, i.effect)(this.#ny.bind(this)));
    }
    onConnect(e) {
      ((0, i.onDispose)(ta(e, this.#nd.set)),
        (0, i.effect)(this.#nv.bind(this)));
    }
    #nf(e) {
      this.#nu.set(e[0].isIntersecting);
    }
    #nv() {
      let { hidden: e } = this.$props;
      this.$state.hidden.set(e() || !this.#nd() || !this.#nu.bind(this));
    }
    #nc() {
      let { dragging: e, value: t, min: s, max: a } = this.$state;
      if (!(0, i.peek)(e)) {
        var n, r;
        t.set(
          ((n = s()), (r = a()), e9(n, e7(t(), e6(this.#ax.getStep())), r)),
        );
      }
    }
    #np() {
      this.$state.step.set(this.#ax.getStep());
    }
    #nm() {
      if (!this.#ax.isDisabled()) return;
      let { dragging: e, pointing: t } = this.$state;
      (e.set(!1), t.set(!1));
    }
    #nb() {
      return (0, i.ariaBool)(this.#ax.isDisabled());
    }
    #ng() {
      let { orientation: e } = this.$props,
        { dragging: t, active: i, pointing: s } = this.$state;
      this.setAttributes({
        "data-dragging": t,
        "data-pointing": s,
        "data-active": i,
        "aria-disabled": this.#nb.bind(this),
        "aria-valuemin": this.#ax.aria.valueMin ?? this.$state.min,
        "aria-valuemax": this.#ax.aria.valueMax ?? this.$state.max,
        "aria-valuenow": this.#ax.aria.valueNow,
        "aria-valuetext": this.#ax.aria.valueText,
        "aria-orientation": e,
      });
    }
    #ny() {
      let { fillPercent: e, pointerPercent: t } = this.$state;
      this.#nw(e7(e(), 3), e7(t(), 3));
    }
    #nw = (0, i.animationFrameThrottle)((e, t) => {
      (this.el?.style.setProperty("--slider-fill", e + "%"),
        this.el?.style.setProperty("--slider-pointer", t + "%"));
    });
  }
  class sh extends i.Component {
    static props = { ...so.props, min: 0, max: 100, value: 0 };
    static state = i8;
    constructor() {
      (super(),
        new so({
          getStep: this.$props.step,
          getKeyStep: this.$props.keyStep,
          roundValue: Math.round,
          isDisabled: this.$props.disabled,
          aria: {
            valueNow: this.#nk.bind(this),
            valueText: this.#nT.bind(this),
          },
        }));
    }
    onSetup() {
      ((0, i.effect)(this.#nc.bind(this)), (0, i.effect)(this.#nx.bind(this)));
    }
    #nk() {
      let { value: e } = this.$state;
      return Math.round(e());
    }
    #nT() {
      let { value: e, max: t } = this.$state;
      return e7((e() / t()) * 100, 2) + "%";
    }
    #nc() {
      let { value: e } = this.$props;
      this.$state.value.set(e());
    }
    #nx() {
      let { min: e, max: t } = this.$props;
      (this.$state.min.set(e()), this.$state.max.set(t()));
    }
  }
  let sl = new Map(),
    sd = new Map();
  class su {
    #M;
    #nS;
    #n$;
    $images = (0, i.signal)([]);
    static create(e, t) {
      return new su(e, t, eY());
    }
    constructor(e, t, s) {
      ((this.#nS = e),
        (this.#n$ = t),
        (this.#M = s),
        (0, i.effect)(this.#nC.bind(this)));
    }
    #nC() {
      let { canLoad: t } = this.#M.$state;
      if (!t()) return;
      let s = this.#nS();
      if (s) {
        if ((0, i.isString)(s) && sl.has(s)) {
          let e = sl.get(s);
          if ((sl.delete(s), sl.set(s, e), sl.size > 99)) {
            let e = sl.keys().next().value;
            sl.delete(e);
          }
          this.$images.set(sl.get(s));
        } else if ((0, i.isString)(s)) {
          let t = this.#n$(),
            a = s + "::" + t;
          if (!sd.has(a)) {
            let n = new Promise(async (a, n) => {
              try {
                let r = await fetch(s, { credentials: eN(t) });
                if ("application/json" === r.headers.get("content-type")) {
                  let e = await r.json();
                  if ((0, i.isArray)(e))
                    if (e[0] && "text" in e[0]) a(this.#nP(e));
                    else {
                      for (let t = 0; t < e.length; t++) {
                        let s = e[t];
                        (t4((0, i.isObject)(s), !1),
                          t4("url" in s && (0, i.isString)(s.url), !1),
                          t4(
                            "startTime" in s && (0, i.isNumber)(s.startTime),
                            !1,
                          ));
                      }
                      a(e);
                    }
                  else a(this.#nE(e));
                  return;
                }
                e.A(305136).then(async ({ parseResponse: e }) => {
                  try {
                    let { cues: t } = await e(r);
                    a(this.#nP(t));
                  } catch (e) {
                    n(e);
                  }
                });
              } catch (e) {
                n(e);
              }
            })
              .then((e) => (sl.set(a, e), e))
              .catch((e) => {
                this.#eE(s, e);
              })
              .finally(() => {
                (0, i.isString)(a) && sd.delete(a);
              });
            sd.set(a, n);
          }
          sd.get(a)?.then((e) => {
            this.$images.set(e || []);
          });
        } else if ((0, i.isArray)(s))
          try {
            this.$images.set(this.#nA(s));
          } catch (e) {
            this.#eE(s, e);
          }
        else
          try {
            this.$images.set(this.#nE(s));
          } catch (e) {
            this.#eE(s, e);
          }
        return () => {
          this.$images.set([]);
        };
      }
    }
    #nA(e) {
      let t = this.#nq();
      return e.map(
        (e, s) => (
          t4(e.url && (0, i.isString)(e.url)),
          t4("startTime" in e && (0, i.isNumber)(e.startTime)),
          { ...e, url: (0, i.isString)(e.url) ? this.#nM(e.url, t) : e.url }
        ),
      );
    }
    #nE(e) {
      (t4((0, i.isString)(e.url)),
        t4((0, i.isArray)(e.tiles) && e.tiles?.length));
      let t = new URL(e.url),
        s = [],
        a = "tile_width" in e ? e.tile_width : e.tileWidth,
        n = "tile_height" in e ? e.tile_height : e.tileHeight;
      for (let i of e.tiles)
        s.push({
          url: t,
          startTime: "start" in i ? i.start : i.startTime,
          width: a,
          height: n,
          coords: { x: i.x, y: i.y },
        });
      return s;
    }
    #nP(e) {
      for (let t = 0; t < e.length; t++) {
        let s = e[t];
        (t4("startTime" in s && (0, i.isNumber)(s.startTime)),
          t4("text" in s && (0, i.isString)(s.text)));
      }
      let t = [],
        s = this.#nq();
      for (let a of e) {
        let [e, n] = a.text.split("#"),
          r = this.#nL(n);
        t.push({
          url: this.#nM(e, s),
          startTime: a.startTime,
          endTime: a.endTime,
          width: r?.w,
          height: r?.h,
          coords:
            r && (0, i.isNumber)(r.x) && (0, i.isNumber)(r.y)
              ? { x: r.x, y: r.y }
              : void 0,
        });
      }
      return t;
    }
    #nq() {
      let e = (0, i.peek)(this.#nS);
      return (0, i.isString)(e) && /^https?:/.test(e) ? e : location.href;
    }
    #nM(e, t) {
      return /^https?:/.test(e) ? new URL(e) : new URL(e, t);
    }
    #nL(e) {
      if (!e) return {};
      let [t, i] = e.split("="),
        s = i?.split(","),
        a = {};
      if (!t || !s) return null;
      for (let e = 0; e < t.length; e++) {
        let i = +s[e];
        isNaN(i) || (a[t[e]] = i);
      }
      return a;
    }
    #eE(e, t) {}
  }
  class sc extends i.Component {
    static props = { src: null, time: 0, crossOrigin: null };
    static state = new i.State({
      src: "",
      img: null,
      thumbnails: [],
      activeThumbnail: null,
      crossOrigin: null,
      loading: !1,
      error: null,
      hidden: !1,
    });
    media;
    #s3;
    #nD = [];
    onSetup() {
      ((this.media = eY()),
        (this.#s3 = su.create(this.$props.src, this.$state.crossOrigin)),
        this.#sm(),
        this.setAttributes({
          "data-loading": this.#nR.bind(this),
          "data-error": this.#nI.bind(this),
          "data-hidden": this.$state.hidden,
          "aria-hidden": iv(this.$state.hidden),
        }));
    }
    onConnect(e) {
      ((0, i.effect)(this.#nV.bind(this)),
        (0, i.effect)(this.#nv.bind(this)),
        (0, i.effect)(this.#sm.bind(this)),
        (0, i.effect)(this.#te.bind(this)),
        (0, i.effect)(this.#nO.bind(this)),
        (0, i.effect)(this.#nF.bind(this)));
    }
    #nV() {
      let e = this.$state.img();
      e &&
        new i.EventsController(e)
          .add("load", this.#ii.bind(this))
          .add("error", this.#eE.bind(this));
    }
    #sm() {
      let { crossOrigin: e } = this.$props,
        { crossOrigin: t } = this.$state,
        { crossOrigin: i } = this.media.$state,
        s = null !== e() ? e() : i();
      t.set(!0 === s ? "anonymous" : s);
    }
    #te() {
      let { src: e, loading: t, error: i } = this.$state;
      return (
        e() && (t.set(!0), i.set(null)),
        () => {
          (this.#nN(), t.set(!1), i.set(null));
        }
      );
    }
    #ii() {
      let { loading: e, error: t } = this.$state;
      (this.#nF(), e.set(!1), t.set(null));
    }
    #eE(e) {
      let { loading: t, error: i } = this.$state;
      (t.set(!1), i.set(e));
    }
    #nR() {
      let { loading: e, hidden: t } = this.$state;
      return !t() && e();
    }
    #nI() {
      let { error: e } = this.$state;
      return !(0, i.isNull)(e());
    }
    #nv() {
      let { hidden: e } = this.$state,
        { duration: t } = this.media.$state,
        i = this.#s3.$images();
      e.set(this.#nI() || !Number.isFinite(t()) || 0 === i.length);
    }
    getTime() {
      return this.$props.time();
    }
    #nO() {
      let e = this.#s3.$images();
      if (!e.length) return;
      let t = this.getTime(),
        { src: i, activeThumbnail: s } = this.$state,
        a = -1,
        n = null;
      for (let i = e.length - 1; i >= 0; i--) {
        let s = e[i];
        if (t >= s.startTime && (!s.endTime || t < s.endTime)) {
          a = i;
          break;
        }
      }
      (e[a] && (n = e[a]), s.set(n), i.set(n?.url.href || ""));
    }
    #nF() {
      if (!this.scope || this.$state.hidden()) return;
      let e = this.el,
        t = this.$state.img(),
        i = this.$state.activeThumbnail();
      if (!t || !i || !e) return;
      let s = i.width ?? t.naturalWidth,
        a = i?.height ?? t.naturalHeight,
        {
          maxWidth: n,
          maxHeight: r,
          minWidth: o,
          minHeight: h,
          width: l,
          height: d,
        } = getComputedStyle(this.el);
      ("100%" === o && (o = parseFloat(l) + ""),
        "100%" === h && (h = parseFloat(d) + ""));
      let u = Math.max(parseInt(o) / s, parseInt(h) / a),
        c = Math.min(
          Math.max(parseInt(o), parseInt(n)) / s,
          Math.max(parseInt(h), parseInt(r)) / a,
        ),
        p = !isNaN(c) && c < 1 ? c : u > 1 ? u : 1;
      (this.#nU(e, "--thumbnail-width", `${s * p}px`),
        this.#nU(e, "--thumbnail-height", `${a * p}px`),
        this.#nU(e, "--thumbnail-aspect-ratio", String(e7(s / a, 5))),
        this.#nU(t, "width", `${t.naturalWidth * p}px`),
        this.#nU(t, "height", `${t.naturalHeight * p}px`),
        this.#nU(
          t,
          "transform",
          i.coords
            ? `translate(-${i.coords.x * p}px, -${i.coords.y * p}px)`
            : "",
        ),
        this.#nU(t, "max-width", "none"));
    }
    #nU(e, t, i) {
      (e.style.setProperty(t, i),
        this.#nD.push(() => e.style.removeProperty(t)));
    }
    #nN() {
      for (let e of this.#nD) e();
      this.#nD = [];
    }
  }
  class sp extends sc {
    #nB;
    onAttach(e) {
      this.#nB = (0, i.useState)(sh.state);
    }
    getTime() {
      let { duration: e, clipStartTime: t } = this.media.$state;
      return t() + this.#nB.pointerRate() * e();
    }
  }
  class sm extends i.Component {
    static props = { src: null, crossOrigin: null };
    static state = new i.State({
      video: null,
      src: null,
      crossOrigin: null,
      canPlay: !1,
      error: null,
      hidden: !1,
    });
    #M;
    #nB;
    get video() {
      return this.$state.video();
    }
    onSetup() {
      ((this.#M = eY()),
        (this.#nB = (0, i.useState)(sh.state)),
        this.#sm(),
        this.setAttributes({
          "data-loading": this.#nR.bind(this),
          "data-hidden": this.$state.hidden,
          "data-error": this.#nI.bind(this),
          "aria-hidden": iv(this.$state.hidden),
        }));
    }
    onAttach(e) {
      ((0, i.effect)(this.#nK.bind(this)),
        (0, i.effect)(this.#nW.bind(this)),
        (0, i.effect)(this.#sm.bind(this)),
        (0, i.effect)(this.#nv.bind(this)),
        (0, i.effect)(this.#nG.bind(this)),
        (0, i.effect)(this.#nQ.bind(this)));
    }
    #nK() {
      let e = this.$state.video();
      e &&
        (e.readyState >= 2 && this.#to(),
        new i.EventsController(e)
          .add("canplay", this.#to.bind(this))
          .add("error", this.#eE.bind(this)));
    }
    #nW() {
      let { src: e } = this.$state,
        { canLoad: t } = this.#M.$state;
      e.set(t() ? this.$props.src() : null);
    }
    #sm() {
      let { crossOrigin: e } = this.$props,
        { crossOrigin: t } = this.$state,
        { crossOrigin: i } = this.#M.$state,
        s = null !== e() ? e() : i();
      t.set(!0 === s ? "anonymous" : s);
    }
    #nR() {
      let { canPlay: e, hidden: t } = this.$state;
      return !e() && !t();
    }
    #nI() {
      let { error: e } = this.$state;
      return !(0, i.isNull)(e);
    }
    #nv() {
      let { src: e, hidden: t } = this.$state,
        { canLoad: i, duration: s } = this.#M.$state;
      t.set(i() && (!e() || this.#nI() || !Number.isFinite(s())));
    }
    #nG() {
      let { src: e, canPlay: t, error: i } = this.$state;
      (e(), t.set(!1), i.set(null));
    }
    #to(e) {
      let { canPlay: t, error: i } = this.$state;
      (t.set(!0), i.set(null), this.dispatch("can-play", { trigger: e }));
    }
    #eE(e) {
      let { canPlay: t, error: i } = this.$state;
      (t.set(!1), i.set(e), this.dispatch("error", { trigger: e }));
    }
    #nQ() {
      let { video: e, canPlay: t } = this.$state,
        { duration: i } = this.#M.$state,
        { pointerRate: s } = this.#nB,
        a = e();
      t() &&
        a &&
        Number.isFinite(i()) &&
        Number.isFinite(s()) &&
        (a.currentTime = s() * i());
    }
  }
  let sg = sm.prototype;
  (0, i.prop)(sg, "video");
  class sf extends i.Component {
    static props = {
      type: "pointer",
      format: null,
      showHours: !1,
      showMs: !1,
      padHours: null,
      padMinutes: null,
      decimalPlaces: 2,
    };
    #nH;
    #nz;
    #nB;
    onSetup() {
      ((this.#nB = (0, i.useState)(sh.state)),
        (this.#nH = (0, i.useContext)(sr)),
        (this.#nz = (0, i.computed)(this.getValueText.bind(this))));
    }
    getValueText() {
      let {
          type: e,
          format: t,
          decimalPlaces: i,
          padHours: s,
          padMinutes: a,
          showHours: n,
          showMs: r,
        } = this.$props,
        { value: o, pointerValue: h, min: l, max: d } = this.#nB,
        u = t?.() ?? this.#nH.default,
        c = "current" === e() ? o() : h();
      if ("percent" === u) {
        let e = (c / (d() - l())) * 100;
        return (this.#nH.percent ?? e7)(e, i()) + "%";
      }
      return "time" === u
        ? (this.#nH.time ?? ih)(c, {
            padHrs: s(),
            padMins: a(),
            showHrs: n(),
            showMs: r(),
          })
        : (this.#nH.value?.(c) ?? c.toFixed(2)) + "";
    }
  }
  let sy = sf.prototype;
  (0, i.method)(sy, "getValueText");
  class sv extends i.Component {
    static props = { offset: 0, noClamp: !1 };
    #nB;
    onSetup() {
      this.#nB = (0, i.useContext)(si);
      let { active: e } = (0, i.useState)(sh.state);
      this.setAttributes({ "data-visible": e });
    }
    onAttach(e) {
      Object.assign(e.style, {
        position: "absolute",
        top: 0,
        left: 0,
        width: "max-content",
      });
    }
    onConnect(e) {
      let { preview: t } = this.#nB;
      (t.set(e),
        (0, i.onDispose)(() => t.set(null)),
        (0, i.effect)(this.#nj.bind(this)));
      let s = new ResizeObserver(this.#nj.bind(this));
      (s.observe(e), (0, i.onDispose)(() => s.disconnect()));
    }
    #nj = (0, i.animationFrameThrottle)(() => {
      let { disabled: e, orientation: t } = this.#nB;
      if (e()) return;
      let i = this.el,
        { offset: s, noClamp: a } = this.$props;
      i && sb(i, { clamp: !a(), offset: s(), orientation: t() });
    });
  }
  function sb(e, { clamp: t, offset: i, orientation: s }) {
    let a = getComputedStyle(e),
      n = parseFloat(a.width),
      r = parseFloat(a.height),
      o = { top: null, right: null, bottom: null, left: null };
    if (
      ((o["horizontal" === s ? "bottom" : "left"] =
        `calc(100% + var(--media-slider-preview-offset, ${i}px))`),
      "horizontal" === s)
    ) {
      let e = n / 2;
      if (t) {
        let t = `max(0px, calc(var(--slider-pointer) - ${e}px))`,
          i = `calc(100% - ${n}px)`;
        o.left = `min(${t}, ${i})`;
      } else o.left = `calc(var(--slider-pointer) - ${e}px)`;
    } else {
      let e = r / 2;
      if (t) {
        let t = `max(${e}px, calc(var(--slider-pointer) - ${e}px))`,
          i = `calc(100% - ${r}px)`;
        o.bottom = `min(${t}, ${i})`;
      } else o.bottom = `calc(var(--slider-pointer) - ${e}px)`;
    }
    Object.assign(e.style, o);
  }
  class sw extends i.Component {
    static props = { ...so.props, keyStep: 5, shiftKeyMultiplier: 2 };
    static state = i8;
    #M;
    onSetup() {
      this.#M = eY();
      let { audioGain: e } = this.#M.$state;
      ((0, i.provideContext)(sr, {
        default: "percent",
        value: (t) => (t * (e() ?? 1)).toFixed(2),
        percent: (t) => Math.round(t * (e() ?? 1)),
      }),
        new so({
          getStep: this.$props.step,
          getKeyStep: this.$props.keyStep,
          roundValue: Math.round,
          isDisabled: this.#n_.bind(this),
          aria: {
            valueMax: this.#nX.bind(this),
            valueNow: this.#nk.bind(this),
            valueText: this.#nT.bind(this),
          },
          onDragValueChange: this.#nJ.bind(this),
          onValueChange: this.#nY.bind(this),
        }).attach(this),
        (0, i.effect)(this.#sF.bind(this)));
    }
    onAttach(e) {
      (e.setAttribute("data-media-volume-slider", ""),
        tt(e, "aria-label", "Volume"));
      let { canSetVolume: t } = this.#M.$state;
      this.setAttributes({
        "data-supported": t,
        "aria-hidden": iv(() => !t()),
      });
    }
    #nk() {
      let { value: e } = this.$state,
        { audioGain: t } = this.#M.$state;
      return Math.round(e() * (t() ?? 1));
    }
    #nT() {
      let { value: e, max: t } = this.$state,
        { audioGain: i } = this.#M.$state;
      return e7((e() / t()) * (i() ?? 1) * 100, 2) + "%";
    }
    #nX() {
      let { audioGain: e } = this.#M.$state;
      return this.$state.max() * (e() ?? 1);
    }
    #n_() {
      let { disabled: e } = this.$props,
        { canSetVolume: t } = this.#M.$state;
      return e() || !t();
    }
    #sF() {
      let { muted: e, volume: t } = this.#M.$state,
        i = e() ? 0 : 100 * t();
      (this.$state.value.set(i), this.dispatch("value-change", { detail: i }));
    }
    #nZ = (0, i.functionThrottle)(this.#ts.bind(this), 25);
    #ts(e) {
      if (!e.trigger) return;
      let t = e7(e.detail / 100, 3);
      this.#M.remote.changeVolume(t, e);
    }
    #nY(e) {
      this.#nZ(e);
    }
    #nJ(e) {
      this.#nZ(e);
    }
  }
  class sk extends i.Component {
    static props = {
      ...so.props,
      step: 25,
      keyStep: 25,
      shiftKeyMultiplier: 2,
      min: 0,
      max: 300,
    };
    static state = i8;
    #M;
    onSetup() {
      ((this.#M = eY()),
        (0, i.provideContext)(sr, {
          default: "percent",
          percent: (e, t) => e7(this.$state.value(), t) + "%",
        }),
        new so({
          getStep: this.$props.step,
          getKeyStep: this.$props.keyStep,
          roundValue: Math.round,
          isDisabled: this.#n_.bind(this),
          aria: {
            valueNow: this.#nk.bind(this),
            valueText: this.#nT.bind(this),
          },
          onDragValueChange: this.#nJ.bind(this),
          onValueChange: this.#nY.bind(this),
        }).attach(this),
        (0, i.effect)(this.#nx.bind(this)),
        (0, i.effect)(this.#n0.bind(this)));
    }
    onAttach(e) {
      (e.setAttribute("data-media-audio-gain-slider", ""),
        tt(e, "aria-label", "Audio Boost"));
      let { canSetAudioGain: t } = this.#M.$state;
      this.setAttributes({
        "data-supported": t,
        "aria-hidden": iv(() => !t()),
      });
    }
    #nk() {
      let { value: e } = this.$state;
      return Math.round(e());
    }
    #nT() {
      let { value: e } = this.$state;
      return e() + "%";
    }
    #nx() {
      let { min: e, max: t } = this.$props;
      (this.$state.min.set(e()), this.$state.max.set(t()));
    }
    #n0() {
      let { audioGain: e } = this.#M.$state,
        t = ((e() ?? 1) - 1) * 100;
      (this.$state.value.set(t), this.dispatch("value-change", { detail: t }));
    }
    #n_() {
      let { disabled: e } = this.$props,
        { canSetAudioGain: t } = this.#M.$state;
      return e() || !t();
    }
    #n1(e) {
      if (!e.trigger) return;
      let t = e7(1 + e.detail / 100, 2);
      this.#M.remote.changeAudioGain(t, e);
    }
    #nY(e) {
      this.#n1(e);
    }
    #nJ(e) {
      this.#n1(e);
    }
  }
  class sT extends i.Component {
    static props = {
      ...so.props,
      step: 0.25,
      keyStep: 0.25,
      shiftKeyMultiplier: 2,
      min: 0,
      max: 2,
    };
    static state = i8;
    #M;
    onSetup() {
      ((this.#M = eY()),
        new so({
          getStep: this.$props.step,
          getKeyStep: this.$props.keyStep,
          roundValue: this.#n2,
          isDisabled: this.#n_.bind(this),
          aria: {
            valueNow: this.#nk.bind(this),
            valueText: this.#nT.bind(this),
          },
          onDragValueChange: this.#nJ.bind(this),
          onValueChange: this.#nY.bind(this),
        }).attach(this),
        (0, i.effect)(this.#nx.bind(this)),
        (0, i.effect)(this.#sU.bind(this)));
    }
    onAttach(e) {
      (e.setAttribute("data-media-speed-slider", ""),
        tt(e, "aria-label", "Speed"));
      let { canSetPlaybackRate: t } = this.#M.$state;
      this.setAttributes({
        "data-supported": t,
        "aria-hidden": iv(() => !t()),
      });
    }
    #nk() {
      let { value: e } = this.$state;
      return e();
    }
    #nT() {
      let { value: e } = this.$state;
      return e() + "x";
    }
    #nx() {
      let { min: e, max: t } = this.$props;
      (this.$state.min.set(e()), this.$state.max.set(t()));
    }
    #sU() {
      let { playbackRate: e } = this.#M.$state,
        t = e();
      (this.$state.value.set(t), this.dispatch("value-change", { detail: t }));
    }
    #n2(e) {
      return e7(e, 2);
    }
    #n_() {
      let { disabled: e } = this.$props,
        { canSetPlaybackRate: t } = this.#M.$state;
      return e() || !t();
    }
    #n3 = (0, i.functionThrottle)(this.#n5.bind(this), 25);
    #n5(e) {
      if (!e.trigger) return;
      let t = e.detail;
      this.#M.remote.changePlaybackRate(t, e);
    }
    #nY(e) {
      this.#n3(e);
    }
    #nJ(e) {
      this.#n3(e);
    }
  }
  class sx extends i.Component {
    static props = { ...so.props, step: 1, keyStep: 1, shiftKeyMultiplier: 1 };
    static state = i8;
    #M;
    #n4 = (0, i.computed)(() => {
      let { qualities: e } = this.#M.$state;
      return tf(e());
    });
    onSetup() {
      ((this.#M = eY()),
        new so({
          getStep: this.$props.step,
          getKeyStep: this.$props.keyStep,
          roundValue: Math.round,
          isDisabled: this.#n_.bind(this),
          aria: {
            valueNow: this.#nk.bind(this),
            valueText: this.#nT.bind(this),
          },
          onDragValueChange: this.#nJ.bind(this),
          onValueChange: this.#nY.bind(this),
        }).attach(this),
        (0, i.effect)(this.#n7.bind(this)),
        (0, i.effect)(this.#n6.bind(this)));
    }
    onAttach(e) {
      (e.setAttribute("data-media-quality-slider", ""),
        tt(e, "aria-label", "Video Quality"));
      let { qualities: t, canSetQuality: s } = this.#M.$state,
        a = (0, i.computed)(() => s() && t().length > 0);
      this.setAttributes({
        "data-supported": a,
        "aria-hidden": iv(() => !a()),
      });
    }
    #nk() {
      let { value: e } = this.$state;
      return e();
    }
    #nT() {
      let { quality: e } = this.#M.$state;
      if (!e()) return "";
      let { height: t, bitrate: i } = e(),
        s = i && i > 0 ? `${(i / 1e6).toFixed(2)} Mbps` : null;
      return t ? `${t}p${s ? ` (${s})` : ""}` : "Auto";
    }
    #n7() {
      let e = this.#n4();
      this.$state.max.set(Math.max(0, e.length - 1));
    }
    #n6() {
      let { quality: e } = this.#M.$state,
        t = Math.max(0, this.#n4().indexOf(e()));
      (this.$state.value.set(t), this.dispatch("value-change", { detail: t }));
    }
    #n_() {
      let { disabled: e } = this.$props,
        { canSetQuality: t, qualities: i } = this.#M.$state;
      return e() || i().length <= 1 || !t();
    }
    #n9 = (0, i.functionThrottle)(this.#tH.bind(this), 25);
    #tH(e) {
      if (!e.trigger) return;
      let { qualities: t } = this.#M,
        s = (0, i.peek)(this.#n4)[e.detail];
      this.#M.remote.changeQuality(t.indexOf(s), e);
    }
    #nY(e) {
      this.#n9(e);
    }
    #nJ(e) {
      this.#n9(e);
    }
  }
  class sS extends i.Component {
    static props = {
      ...so.props,
      step: 0.1,
      keyStep: 5,
      shiftKeyMultiplier: 2,
      pauseWhileDragging: !1,
      noSwipeGesture: !1,
      seekingRequestThrottle: 100,
    };
    static state = i8;
    #M;
    #n8;
    #re = (0, i.signal)(null);
    constructor() {
      super();
      let { noSwipeGesture: e } = this.$props;
      new so({
        swipeGesture: () => !e(),
        getValue: this.#rt.bind(this),
        getStep: this.#ri.bind(this),
        getKeyStep: this.#rs.bind(this),
        roundValue: this.#n2,
        isDisabled: this.#n_.bind(this),
        aria: { valueNow: this.#nk.bind(this), valueText: this.#nT.bind(this) },
        onDragStart: this.#ra.bind(this),
        onDragValueChange: this.#nJ.bind(this),
        onDragEnd: this.#rn.bind(this),
        onValueChange: this.#nY.bind(this),
      });
    }
    onSetup() {
      ((this.#M = eY()),
        (0, i.provideContext)(sr, {
          default: "time",
          value: this.#rr.bind(this),
          time: this.#ro.bind(this),
        }),
        this.setAttributes({ "data-chapters": this.#rh.bind(this) }),
        this.setStyles({ "--slider-progress": this.#rl.bind(this) }),
        (0, i.effect)(this.#sN.bind(this)),
        (0, i.effect)(this.#rd.bind(this)));
    }
    onAttach(e) {
      (e.setAttribute("data-media-time-slider", ""),
        tt(e, "aria-label", "Seek"));
    }
    onConnect(e) {
      ((0, i.effect)(this.#ru.bind(this)),
        eK(this.#M.textTracks, "chapters", this.#re.set));
    }
    #rl() {
      let { bufferedEnd: e, duration: t } = this.#M.$state;
      return e7(100 * Math.min(e() / Math.max(t(), 1), 1), 3) + "%";
    }
    #rh() {
      let { duration: e } = this.#M.$state;
      return this.#re()?.cues.length && Number.isFinite(e()) && e() > 0;
    }
    #rd() {
      this.#n8 = (0, i.functionThrottle)(
        this.#er.bind(this),
        this.$props.seekingRequestThrottle(),
      );
    }
    #sN() {
      if (this.$state.hidden()) return;
      let { value: e, dragging: t } = this.$state,
        s = this.#rt();
      (0, i.peek)(t) ||
        (e.set(s), this.dispatch("value-change", { detail: s }));
    }
    #ru() {
      let e = this.#M.player.el,
        { preview: t } = (0, i.useContext)(si);
      e && t() && (0, i.setAttribute)(e, "data-preview", this.$state.active());
    }
    #er(e, t) {
      this.#M.remote.seeking(e, t);
    }
    #rc(e, t, i) {
      this.#n8.cancel();
      let { live: s } = this.#M.$state;
      s() && t >= 99
        ? this.#M.remote.seekToLiveEdge(i)
        : this.#M.remote.seek(e, i);
    }
    #rp = !1;
    #ra(e) {
      let { pauseWhileDragging: t } = this.$props;
      if (t()) {
        let { paused: t } = this.#M.$state;
        ((this.#rp = !t()), this.#M.remote.pause(e));
      }
    }
    #nJ(e) {
      this.#n8(this.#rm(e.detail), e);
    }
    #rn(e) {
      let { seeking: t } = this.#M.$state;
      (0, i.peek)(t) || this.#er(this.#rm(e.detail), e);
      let s = e.detail;
      this.#rc(this.#rm(s), s, e);
      let { pauseWhileDragging: a } = this.$props;
      a() && this.#rp && (this.#M.remote.play(e), (this.#rp = !1));
    }
    #nY(e) {
      let { dragging: t } = this.$state;
      !t() && e.trigger && this.#rn(e);
    }
    #rt() {
      let { currentTime: e } = this.#M.$state;
      return this.#rg(e());
    }
    #ri() {
      let e = (this.$props.step() / this.#M.$state.duration()) * 100;
      return Number.isFinite(e) ? e : 1;
    }
    #rs() {
      let e = (this.$props.keyStep() / this.#M.$state.duration()) * 100;
      return Number.isFinite(e) ? e : 1;
    }
    #n2(e) {
      return e7(e, 3);
    }
    #n_() {
      let { disabled: e } = this.$props,
        { canSeek: t } = this.#M.$state;
      return e() || !t();
    }
    #nk() {
      let { value: e } = this.$state;
      return Math.round(e());
    }
    #nT() {
      let e = this.#rm(this.$state.value()),
        { duration: t } = this.#M.$state;
      return Number.isFinite(e) ? `${il(e)} out of ${il(t())}` : "live";
    }
    #rm(e) {
      let { duration: t } = this.#M.$state;
      return e7((e / 100) * t(), 5);
    }
    #rg(e) {
      let { liveEdge: t, duration: i } = this.#M.$state,
        s = Math.max(0, Math.min(1, t() ? 1 : Math.min(e, i()) / i()));
      return Number.isNaN(s) ? 0 : Number.isFinite(s) ? 100 * s : 100;
    }
    #rr(e) {
      let t = this.#rm(e),
        { live: i, duration: s } = this.#M.$state;
      return Number.isFinite(t) ? (i() ? t - s() : t).toFixed(0) : "LIVE";
    }
    #ro(e, t) {
      let i = this.#rm(e),
        { live: s, duration: a } = this.#M.$state,
        n = s() ? i - a() : i;
      return Number.isFinite(i)
        ? `${n < 0 ? "-" : ""}${ih(Math.abs(n), t)}`
        : "LIVE";
    }
  }
  class s$ extends i.Component {
    static props = { disabled: !1 };
    #M;
    #rf;
    #ry;
    #rv = null;
    #rb = [];
    #rw = (0, i.signal)(null);
    #rk = (0, i.signal)([]);
    #rT = (0, i.signal)(-1);
    #rx = (0, i.signal)(-1);
    #rS = 0;
    get cues() {
      return this.#rk();
    }
    get activeCue() {
      return this.#rk()[this.#rT()] || null;
    }
    get activePointerCue() {
      return this.#rk()[this.#rx()] || null;
    }
    onSetup() {
      ((this.#M = eY()), (this.#rf = (0, i.useState)(sS.state)));
    }
    onAttach(e) {
      (eK(this.#M.textTracks, "chapters", this.#r$.bind(this)),
        (0, i.effect)(this.#rC.bind(this)));
    }
    onConnect() {
      (0, i.onDispose)(() => this.#t8.bind(this));
    }
    onDestroy() {
      this.#r$(null);
    }
    setRefs(e) {
      if (((this.#rb = e), this.#ry?.dispose(), 1 === this.#rb.length)) {
        let e = this.#rb[0];
        ((e.style.width = "100%"),
          e.style.setProperty("--chapter-fill", "var(--slider-fill)"),
          e.style.setProperty("--chapter-progress", "var(--slider-progress)"));
      } else
        this.#rb.length > 0 &&
          (0, i.scoped)(() => this.#rP(), (this.#ry = (0, i.createScope)()));
    }
    #r$(e) {
      (0, i.peek)(this.#rw) !== e && (this.#t8(), this.#rw.set(e));
    }
    #t8() {
      ((this.#rb = []),
        this.#rk.set([]),
        this.#rT.set(-1),
        this.#rx.set(-1),
        (this.#rS = 0),
        this.#ry?.dispose());
    }
    #rP() {
      this.#rb.length && (0, i.effect)(this.#rE.bind(this));
    }
    #rE() {
      let { hidden: e } = this.#rf;
      e() ||
        ((0, i.effect)(this.#rA.bind(this)),
        (0, i.effect)(this.#rq.bind(this)),
        (0, i.effect)(this.#rM.bind(this)),
        (0, i.effect)(this.#rL.bind(this)));
    }
    #rA() {
      let e = this.#rk();
      if (!e.length) return;
      let t,
        { seekableStart: i, seekableEnd: s } = this.#M.$state,
        a = i(),
        n = (s() || e[e.length - 1].endTime) - a,
        r = 100;
      for (let i = 0; i < e.length; i++)
        if (((t = e[i]), this.#rb[i])) {
          let s =
            i === e.length - 1
              ? r
              : e7(((t.endTime - Math.max(a, t.startTime)) / n) * 100, 3);
          ((this.#rb[i].style.width = s + "%"), (r -= s));
        }
    }
    #rq() {
      let { liveEdge: e, seekableStart: t, seekableEnd: s } = this.#M.$state,
        { fillPercent: a, value: n } = this.#rf,
        r = this.#rk(),
        o = e(),
        h = (0, i.peek)(this.#rT),
        l = r[h],
        d = o
          ? this.#rk.length - 1
          : this.#rD(
              l && (l.startTime / s()) * 100 <= (0, i.peek)(n) ? h : 0,
              a(),
            );
      o || !l
        ? this.#rR(0, r.length, 100)
        : d > h
          ? this.#rR(h, d, 100)
          : d < h && this.#rR(d + 1, h + 1, 0);
      let u = o ? 100 : this.#rI(r[d], a(), t(), this.#rV(r));
      (this.#rO(this.#rb[d], u), this.#rT.set(d));
    }
    #rM() {
      let { hidden: e, pointerPercent: t } = this.#rf;
      if (e()) return void this.#rx.set(-1);
      let i = this.#rD(0, t());
      this.#rx.set(i);
    }
    #rR(e, t, i) {
      for (let s = e; s < t; s++) this.#rO(this.#rb[s], i);
    }
    #rO(e, t) {
      e &&
        (e.style.setProperty("--chapter-fill", t + "%"),
        (0, i.setAttribute)(e, "data-active", t > 0 && t < 100),
        (0, i.setAttribute)(e, "data-ended", 100 === t));
    }
    #rD(e, t) {
      let i = 0,
        s = this.#rk();
      if (0 === t) return 0;
      if (100 === t) return s.length - 1;
      let { seekableStart: a } = this.#M.$state,
        n = a(),
        r = this.#rV(s);
      for (let a = e; a < s.length; a++)
        if ((i = this.#rI(s[a], t, n, r)) >= 0 && i < 100) return a;
      return 0;
    }
    #rL() {
      this.#rF(this.#rN());
    }
    #rF = (0, i.animationFrameThrottle)((e) => {
      let t,
        i = this.#rk(),
        { seekableStart: s } = this.#M.$state,
        a = s(),
        n = this.#rV(i);
      for (let s = this.#rS; s < this.#rb.length; s++)
        if (
          ((t = this.#rI(i[s], e, a, n)),
          this.#rb[s]?.style.setProperty("--chapter-progress", t + "%"),
          t < 100)
        ) {
          this.#rS = s;
          break;
        }
    });
    #rN = (0, i.computed)(this.#rU.bind(this));
    #rU() {
      let { bufferedEnd: e, duration: t } = this.#M.$state;
      return 100 * e7(Math.min(e() / Math.max(t(), 1), 1), 3);
    }
    #rV(e) {
      let { seekableEnd: t } = this.#M.$state,
        i = t();
      return Number.isFinite(i) ? i : e[e.length - 1]?.endTime || 0;
    }
    #rI(e, t, i, s) {
      if (!e || 0 === this.#rk().length) return 0;
      let a = s - i,
        n = Math.max(0, e.startTime - i),
        r = Math.min(s, e.endTime) - i,
        o = n / a,
        h = 100 * o,
        l = 100 * Math.min(1, o + (r - n) / a);
      return Math.max(0, e7(t >= l ? 100 : ((t - h) / (l - h)) * 100, 3));
    }
    #rB(e) {
      let t = [],
        { seekableStart: i, seekableEnd: s, duration: a } = this.#M.$state,
        n = i(),
        r = s(),
        o = (e = e.filter((e) => e.startTime <= r && e.endTime >= n))[0];
      o && o.startTime > n && t.push(new window.VTTCue(n, o.startTime, ""));
      for (let i = 0; i < e.length - 1; i++) {
        let s = e[i],
          a = e[i + 1];
        if ((t.push(s), a)) {
          let e = a.startTime - s.endTime;
          e > 0 && t.push(new window.VTTCue(s.endTime, s.endTime + e, ""));
        }
      }
      let h = e[e.length - 1];
      if (h) {
        t.push(h);
        let e = a();
        e >= 0 &&
          e - h.endTime > 1 &&
          t.push(new window.VTTCue(h.endTime, a(), ""));
      }
      return t;
    }
    #rC() {
      let { source: e } = this.#M.$state;
      (e(), this.#tj());
    }
    #tj() {
      if (!this.scope) return;
      let { disabled: e } = this.$props;
      if (e()) {
        (this.#rk.set([]), this.#rT.set(0), (this.#rS = 0));
        return;
      }
      let t = this.#rw();
      if (t) {
        let e = this.#rK.bind(this);
        (e(),
          new i.EventsController(t).add("add-cue", e).add("remove-cue", e),
          (0, i.effect)(this.#rW.bind(this)));
      }
      return (
        (this.#rv = this.#rG()),
        this.#rv && (0, i.effect)(this.#rQ.bind(this)),
        () => {
          this.#rv && ((this.#rv.textContent = ""), (this.#rv = null));
        }
      );
    }
    #rW() {
      (this.#M.$state.duration(), this.#rK());
    }
    #rK = (0, i.functionDebounce)(
      () => {
        let e = (0, i.peek)(this.#rw);
        this.scope &&
          e &&
          e.cues.length &&
          (this.#rk.set(this.#rB(e.cues)), this.#rT.set(0), (this.#rS = 0));
      },
      150,
      !0,
    );
    #rQ() {
      let e = this.activePointerCue || this.activeCue;
      this.#rv && (this.#rv.textContent = e?.text || "");
    }
    #rH() {
      let e = this.el;
      for (; e && "slider" !== e.getAttribute("role"); ) e = e.parentElement;
      return e;
    }
    #rG() {
      let e = this.#rH();
      return e ? e.querySelector('[data-part="chapter-title"]') : null;
    }
  }
  let sC = s$.prototype;
  ((0, i.prop)(sC, "cues"),
    (0, i.prop)(sC, "activeCue"),
    (0, i.prop)(sC, "activePointerCue"),
    (0, i.method)(sC, "setRefs"));
  let sP = (0, i.createContext)(),
    sE = ["a[href]", "[tabindex]", "input", "select", "button"]
      .map((e) => `${e}:not([aria-hidden='true'])`)
      .join(","),
    sA = new Set([
      "Escape",
      "Tab",
      "ArrowUp",
      "ArrowDown",
      "Home",
      "PageUp",
      "End",
      "PageDown",
      "Enter",
      " ",
    ]);
  class sq {
    #rz = -1;
    #rj = null;
    #r_ = [];
    #ax;
    get items() {
      return this.#r_;
    }
    constructor(e) {
      this.#ax = e;
    }
    attachMenu(e) {
      ((0, i.listenEvent)(e, "focus", this.#sM.bind(this)),
        (this.#rj = e),
        (0, i.onDispose)(() => {
          this.#rj = null;
        }));
    }
    listen() {
      this.#rj &&
        (this.update(),
        new i.EventsController(this.#rj)
          .add("keyup", this.#Z.bind(this))
          .add("keydown", this.#ee.bind(this)),
        (0, i.onDispose)(() => {
          ((this.#rz = -1), (this.#r_ = []));
        }));
    }
    update() {
      ((this.#rz = 0), (this.#r_ = this.#rX()));
    }
    scroll(e = this.#rJ()) {
      let t = this.#r_[e];
      t &&
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            !(function (e, t = {}) {
              var s = {
                scrollMode: "if-needed",
                block: "center",
                inline: "center",
                ...t,
              };
              for (let { el: t, top: a, left: n } of (0, i.r)(e, s))
                t.scroll({ top: a, left: n, behavior: s.behavior });
            })(t, {
              behavior: "smooth",
              boundary: (e) => !e.hasAttribute("data-root"),
            });
          });
        });
    }
    focusActive(e = !0) {
      let t = this.#rJ();
      this.#rY(t >= 0 ? t : 0, e);
    }
    #rY(e, t = !0) {
      ((this.#rz = e),
        this.#r_[e]
          ? (this.#r_[e].focus({ preventScroll: !0 }), t && this.scroll(e))
          : this.#rj?.focus({ preventScroll: !0 }));
    }
    #rJ() {
      return this.#r_.findIndex(
        (e) =>
          document.activeElement === e ||
          ("menuitemradio" === e.getAttribute("role") &&
            "true" === e.getAttribute("aria-checked")),
      );
    }
    #sM() {
      this.#rz >= 0 || (this.update(), this.focusActive());
    }
    #rZ(e) {
      let t = e.target;
      if ((0, i.wasEnterKeyPressed)(e) && t instanceof Element) {
        let e = t.getAttribute("role");
        return !/a|input|select|button/.test(t.localName) && !e;
      }
      return sA.has(e.key);
    }
    #Z(e) {
      this.#rZ(e) && (e.stopPropagation(), e.preventDefault());
    }
    #ee(e) {
      if (this.#rZ(e))
        switch ((e.stopPropagation(), e.preventDefault(), e.key)) {
          case "Escape":
            this.#ax.closeMenu(e);
            break;
          case "Tab":
            this.#rY(this.#r0(e.shiftKey ? -1 : 1));
            break;
          case "ArrowUp":
            this.#rY(this.#r0(-1));
            break;
          case "ArrowDown":
            this.#rY(this.#r0(1));
            break;
          case "Home":
          case "PageUp":
            this.#rY(0);
            break;
          case "End":
          case "PageDown":
            this.#rY(this.#r_.length - 1);
        }
    }
    #r0(e) {
      let t = this.#rz;
      do t = (t + e + this.#r_.length) % this.#r_.length;
      while (this.#r_[t]?.offsetParent === null);
      return t;
    }
    #rX() {
      if (!this.#rj) return [];
      let e = this.#rj.querySelectorAll(sE),
        t = [],
        i = (e) => "menu" === e.getAttribute("role");
      for (let s of e)
        td(s) && null !== s.offsetParent && tn(this.#rj, s, i) && t.push(s);
      return t;
    }
  }
  var sM = Object.defineProperty,
    sL = Object.getOwnPropertyDescriptor,
    sD = (e, t, i, s) => {
      for (var a, n = sL(t, i), r = e.length - 1; r >= 0; r--)
        (a = e[r]) && (n = a(t, i, n) || n);
      return (n && sM(t, i, n), n);
    };
  let sR = 0;
  class sI extends i.Component {
    static props = { showDelay: 0 };
    #M;
    #r1;
    #r2;
    #r3 = (0, i.signal)(!1);
    #r5 = (0, i.signal)(!1);
    #aA = (0, i.signal)(null);
    #aq = (0, i.signal)(null);
    #r4;
    #r7 = new Set();
    #r6 = null;
    #r9;
    #r8;
    #oe = !1;
    #ot = (0, i.signal)(!1);
    #oi = new Set();
    get triggerElement() {
      return this.#aA();
    }
    get contentElement() {
      return this.#aq();
    }
    get isSubmenu() {
      return !!this.#r4;
    }
    constructor() {
      super();
      let { showDelay: e } = this.$props;
      this.#r9 = new iQ({
        trigger: this.#aA,
        content: this.#aq,
        showDelay: e,
        listen: (e, t, i) => {
          tr(e, (e) => {
            this.#r3() ? i(e) : t(e);
          });
          let s = this.#os();
          s &&
            tr(s, (e) => {
              (e.stopPropagation(), i(e));
            });
        },
        onChange: this.#oa.bind(this),
      });
    }
    onSetup() {
      this.#M = eY();
      let e = ++sR;
      ((this.#r1 = `media-menu-${e}`),
        (this.#r2 = `media-menu-button-${e}`),
        (this.#r8 = new sq({ closeMenu: this.close.bind(this) })),
        (0, i.hasProvidedContext)(sP) && (this.#r4 = (0, i.useContext)(sP)),
        this.#on(),
        this.setAttributes({
          "data-open": this.#r3,
          "data-root": !this.isSubmenu,
          "data-submenu": this.isSubmenu,
          "data-disabled": this.#n_.bind(this),
        }),
        (0, i.provideContext)(sP, {
          button: this.#aA,
          content: this.#aq,
          expanded: this.#r3,
          hint: (0, i.signal)(""),
          submenu: !!this.#r4,
          disable: this.#or.bind(this),
          attachMenuButton: this.#oo.bind(this),
          attachMenuItems: this.#oh.bind(this),
          attachObserver: this.#ol.bind(this),
          disableMenuButton: this.#od.bind(this),
          addSubmenu: this.#ou.bind(this),
          onTransitionEvent: (e) => {
            (this.#oi.add(e),
              (0, i.onDispose)(() => {
                this.#oi.delete(e);
              }));
          },
        }));
    }
    onAttach(e) {
      e.style.setProperty("display", "contents");
    }
    onConnect(e) {
      ((0, i.effect)(this.#oc.bind(this)),
        this.isSubmenu && this.#r4?.addSubmenu(this));
    }
    onDestroy() {
      (this.#aA.set(null),
        this.#aq.set(null),
        (this.#r6 = null),
        this.#oi.clear());
    }
    #on() {
      let e = -1,
        t = (0, i.hasProvidedContext)(ss) ? (0, i.useContext)(ss) : null;
      (0, i.provideContext)(ss, {
        onDragStart: () => {
          (t?.onDragStart?.(),
            window.clearTimeout(e),
            (e = -1),
            (this.#oe = !0));
        },
        onDragEnd: () => {
          (t?.onDragEnd?.(),
            (e = window.setTimeout(() => {
              ((this.#oe = !1), (e = -1));
            }, 300)));
        },
      });
    }
    #oc() {
      let e = this.#op();
      (this.isSubmenu || this.#sQ(),
        this.#om(e),
        e &&
          ((0, i.effect)(() => {
            let { height: e } = this.#M.$state,
              t = this.#aq();
            t && (0, i.setStyle)(t, "--player-height", e() + "px");
          }),
          this.#r8.listen(),
          this.listen("pointerup", this.#og.bind(this)),
          (0, i.listenEvent)(window, "pointerup", this.#of.bind(this))));
    }
    #oo(e) {
      let t = e.el,
        s = this.isSubmenu,
        a = iv(this.#n_.bind(this));
      (tt(t, "tabindex", s ? "-1" : "0"),
        tt(t, "role", s ? "menuitem" : "button"),
        (0, i.setAttribute)(t, "id", this.#r2),
        (0, i.setAttribute)(t, "aria-haspopup", "menu"),
        (0, i.setAttribute)(t, "aria-expanded", "false"),
        (0, i.setAttribute)(t, "data-root", !this.isSubmenu),
        (0, i.setAttribute)(t, "data-submenu", this.isSubmenu));
      let n = () => {
        ((0, i.setAttribute)(t, "data-open", this.#r3()),
          (0, i.setAttribute)(t, "aria-disabled", a()));
      };
      (er ? n() : (0, i.effect)(n),
        this.#aA.set(t),
        (0, i.onDispose)(() => {
          this.#aA.set(null);
        }));
    }
    #oh(e) {
      let t = e.el;
      (t.style.setProperty("display", "none"),
        (0, i.setAttribute)(t, "id", this.#r1),
        tt(t, "role", "menu"),
        tt(t, "tabindex", "-1"),
        (0, i.setAttribute)(t, "data-root", !this.isSubmenu),
        (0, i.setAttribute)(t, "data-submenu", this.isSubmenu),
        this.#aq.set(t),
        (0, i.onDispose)(() => this.#aq.set(null)));
      let s = () => (0, i.setAttribute)(t, "data-open", this.#r3());
      (er ? s() : (0, i.effect)(s), this.#r8.attachMenu(t), this.#om(!1));
      let a = this.#oy.bind(this);
      this.isSubmenu
        ? this.#r4?.onTransitionEvent(a)
        : (e.listen("transitionstart", a),
          e.listen("transitionend", a),
          e.listen("animationend", this.#sQ),
          e.listen("vds-menu-resize", this.#sQ));
    }
    #ol(e) {
      this.#r6 = e;
    }
    #om(e) {
      let t = (0, i.peek)(this.#aq);
      t && (0, i.setAttribute)(t, "aria-hidden", (0, i.ariaBool)(!e));
    }
    #od(e) {
      this.#ot.set(e);
    }
    #ov = !1;
    #oa(e, t) {
      if (
        ((this.#ov = (0, i.isKeyboardEvent)(t)),
        t?.stopPropagation(),
        this.#r3() === e)
      )
        return;
      if (this.#n_()) {
        e && this.#r9.hide(t);
        return;
      }
      this.el?.dispatchEvent(
        new Event("vds-menu-resize", { bubbles: !0, composed: !0 }),
      );
      let s = this.#aA(),
        a = this.#aq();
      if (
        (s &&
          ((0, i.setAttribute)(s, "aria-controls", e && this.#r1),
          (0, i.setAttribute)(s, "aria-expanded", (0, i.ariaBool)(e))),
        a && (0, i.setAttribute)(a, "aria-labelledby", e && this.#r2),
        this.#r3.set(e),
        this.#ob(t),
        (0, i.tick)(),
        this.#ov)
      )
        for (let t of (e ? a?.focus() : s?.focus(), [this.el, a]))
          t && t.setAttribute("data-keyboard", "");
      else for (let e of [this.el, a]) e && e.removeAttribute("data-keyboard");
      if ((this.dispatch(e ? "open" : "close", { trigger: t }), e))
        (this.isSubmenu ||
          this.#M.activeMenu === this ||
          (this.#M.activeMenu?.close(t), (this.#M.activeMenu = this)),
          this.#r6?.onOpen?.(t));
      else {
        if (this.isSubmenu) for (let e of this.#r7) e.close(t);
        else this.#M.activeMenu = null;
        this.#r6?.onClose?.(t);
      }
      e && requestAnimationFrame(this.#ow.bind(this));
    }
    #ow() {
      this.#ok ||
        this.#oT ||
        (this.#r8.update(),
        requestAnimationFrame(() => {
          this.#ov ? this.#r8.focusActive() : this.#r8.scroll();
        }));
    }
    #op() {
      return !this.#n_() && this.#r3();
    }
    #n_() {
      return this.#r5() || this.#ot();
    }
    #or(e) {
      this.#r5.set(e);
    }
    #og(e) {
      let t = this.#aq();
      this.#oe || (t && e8(t, e)) || e.stopPropagation();
    }
    #of(e) {
      let t = this.#aq();
      this.#oe || (t && e8(t, e)) || this.close(e);
    }
    #os() {
      let e = this.el?.querySelector('[data-part="close-target"]');
      return this.el &&
        e &&
        tn(this.el, e, (e) => "menu" === e.getAttribute("role"))
        ? e
        : null;
    }
    #ob(e) {
      this.isSubmenu ||
        (this.#r3()
          ? this.#M.remote.pauseControls(e)
          : this.#M.remote.resumeControls(e));
    }
    #ou(e) {
      (this.#r7.add(e),
        new i.EventsController(e).add("open", this.#ox).add("close", this.#oS),
        (0, i.onDispose)(this.#o$));
    }
    #o$ = this.#oC.bind(this);
    #oC(e) {
      this.#r7.delete(e);
    }
    #oT = !1;
    #ox = this.#oP.bind(this);
    #oP(e) {
      this.#oT = !0;
      let t = this.#aq();
      for (let t of (this.isSubmenu &&
        this.triggerElement?.setAttribute("aria-hidden", "true"),
      this.#r7))
        if (t !== e.target)
          for (let e of [t.el, t.triggerElement])
            e?.setAttribute("aria-hidden", "true");
      if (t) {
        let i = e.target.el;
        for (let e of t.children)
          e.contains(i)
            ? e.setAttribute("data-open", "")
            : e !== i && e.setAttribute("data-hidden", "");
      }
    }
    #oS = this.#oE.bind(this);
    #oE(e) {
      this.#oT = !1;
      let t = this.#aq();
      for (let e of (this.isSubmenu &&
        this.triggerElement?.setAttribute("aria-hidden", "false"),
      this.#r7))
        for (let t of [e.el, e.triggerElement])
          t?.setAttribute("aria-hidden", "false");
      if (t)
        for (let e of t.children)
          (e.removeAttribute("data-open"), e.removeAttribute("data-hidden"));
    }
    #sQ = (0, i.animationFrameThrottle)(() => {
      let e = (0, i.peek)(this.#aq);
      if (!e || er) return;
      let t = 0,
        s = getComputedStyle(e),
        a = [...e.children];
      for (let e of [
        "paddingTop",
        "paddingBottom",
        "borderTopWidth",
        "borderBottomWidth",
      ])
        t += parseFloat(s[e]) || 0;
      for (let e of a)
        if (td(e) && "contents" === e.style.display) a.push(...e.children);
        else if (3 === e.nodeType)
          t += parseFloat(getComputedStyle(e).fontSize);
        else if (td(e)) {
          if (!ts(e)) continue;
          let i = getComputedStyle(e);
          t +=
            e.offsetHeight +
            (parseFloat(i.marginTop) || 0) +
            (parseFloat(i.marginBottom) || 0);
        }
      (0, i.setStyle)(e, "--menu-height", t + "px");
    });
    #ok = !1;
    #oy(e) {
      let t = this.#aq();
      for (let s of (t &&
        "height" === e.propertyName &&
        ((this.#ok = "transitionstart" === e.type),
        (0, i.setAttribute)(t, "data-transition", this.#ok ? "height" : null),
        this.#r3() && this.#ow()),
      this.#oi))
        s(e);
    }
    open(e) {
      (0, i.peek)(this.#r3) || (this.#r9.show(e), (0, i.tick)());
    }
    close(e) {
      (0, i.peek)(this.#r3) && (this.#r9.hide(e), (0, i.tick)());
    }
  }
  (sD([i.prop], sI.prototype, "triggerElement"),
    sD([i.prop], sI.prototype, "contentElement"),
    sD([i.prop], sI.prototype, "isSubmenu"),
    sD([i.method], sI.prototype, "open"),
    sD([i.method], sI.prototype, "close"));
  class sV extends i.Component {
    static props = { disabled: !1 };
    #oA;
    #oq = (0, i.signal)(null);
    get expanded() {
      return this.#oA?.expanded() ?? !1;
    }
    constructor() {
      (super(), new iA());
    }
    onSetup() {
      this.#oA = (0, i.useContext)(sP);
    }
    onAttach(e) {
      (this.#oA.attachMenuButton(this),
        (0, i.effect)(this.#nm.bind(this)),
        tt(e, "type", "button"));
    }
    onConnect(e) {
      ((0, i.effect)(this.#oM.bind(this)), this.#ar());
      let t = new MutationObserver(this.#ar.bind(this));
      (t.observe(e, {
        attributeFilter: ["data-part"],
        childList: !0,
        subtree: !0,
      }),
        (0, i.onDispose)(() => t.disconnect()),
        tr(e, (e) => {
          this.dispatch("select", { trigger: e });
        }));
    }
    #nm() {
      this.#oA.disableMenuButton(this.$props.disabled());
    }
    #oM() {
      let e = this.#oq();
      e &&
        (0, i.effect)(() => {
          let t = this.#oA.hint();
          t && (e.textContent = t);
        });
    }
    #ar() {
      let e = this.el?.querySelector('[data-part="hint"]');
      this.#oq.set(e ?? null);
    }
  }
  let sO = sV.prototype;
  (0, i.prop)(sO, "expanded");
  class sF extends sV {}
  i.Component;
  let sN = (0, i.createContext)();
  class sU extends i.Component {
    static props = { placement: null, offset: 0, alignOffset: 0 };
    #oA;
    constructor() {
      (super(), new iA());
      let { placement: e } = this.$props;
      this.setAttributes({ "data-placement": e });
    }
    onAttach(e) {
      if (
        ((this.#oA = (0, i.useContext)(sP)),
        this.#oA.attachMenuItems(this),
        (0, i.hasProvidedContext)(sN))
      ) {
        let t = (0, i.useContext)(sN);
        t &&
          ((0, i.provideContext)(sN, null),
          t.attach(e),
          (0, i.onDispose)(() => t.attach(null)));
      }
    }
    onConnect(e) {
      (0, i.effect)(this.#aN.bind(this));
    }
    #aN() {
      let { expanded: e } = this.#oA;
      if (!this.el || !e()) return;
      let t = this.$props.placement();
      if (!t) return;
      Object.assign(this.el.style, {
        position: "absolute",
        top: 0,
        left: 0,
        width: "max-content",
      });
      let { offset: s, alignOffset: a } = this.$props;
      ((0, i.onDispose)(
        tl(this.el, this.#aF(), t, {
          offsetVarName: "media-menu",
          xOffset: a(),
          yOffset: s(),
        }),
      ),
        (0, i.onDispose)(this.#oL.bind(this)));
    }
    #oL() {
      this.el &&
        (this.el.removeAttribute("style"), (this.el.style.display = "none"));
    }
    #aF() {
      return this.#oA.button();
    }
  }
  let sB = (0, i.createContext)();
  class sK extends i.ViewController {
    #oD = new Set();
    #oR = (0, i.signal)("");
    #ir = null;
    onValueChange;
    get values() {
      return Array.from(this.#oD).map((e) => e.value());
    }
    get value() {
      return this.#oR();
    }
    set value(e) {
      this.#$(e);
    }
    onSetup() {
      (0, i.provideContext)(sB, {
        add: this.#oI.bind(this),
        remove: this.#oV.bind(this),
      });
    }
    onAttach(e) {
      ((0, i.hasProvidedContext)(sP) || tt(e, "role", "radiogroup"),
        this.setAttributes({ value: this.#oR }));
    }
    onDestroy() {
      this.#oD.clear();
    }
    #oI(e) {
      this.#oD.has(e) ||
        (this.#oD.add(e),
        (e.onCheck = this.#oO),
        e.check(e.value() === this.#oR()));
    }
    #oV(e) {
      ((e.onCheck = null), this.#oD.delete(e));
    }
    #oO = this.#$.bind(this);
    #$(e, t) {
      let s = (0, i.peek)(this.#oR);
      if (!e || e === s) return;
      let a = this.#oF(s),
        n = this.#oF(e);
      (a?.check(!1, t),
        n?.check(!0, t),
        this.#oR.set(e),
        this.onValueChange?.(e, t));
    }
    #oF(e) {
      for (let t of this.#oD) if (e === (0, i.peek)(t.value)) return t;
      return null;
    }
  }
  class sW extends i.Component {
    static props = { value: "" };
    #ir;
    get values() {
      return this.#ir.values;
    }
    get value() {
      return this.#ir.value;
    }
    set value(e) {
      this.#ir.value = e;
    }
    constructor() {
      (super(),
        (this.#ir = new sK()),
        (this.#ir.onValueChange = this.#nY.bind(this)));
    }
    onSetup() {
      er ? this.#nc() : (0, i.effect)(this.#nc.bind(this));
    }
    #nc() {
      this.#ir.value = this.$props.value();
    }
    #nY(e, t) {
      let i = this.createEvent("change", { detail: e, trigger: t });
      this.dispatch(i);
    }
  }
  let sG = sW.prototype;
  ((0, i.prop)(sG, "values"), (0, i.prop)(sG, "value"));
  class sQ extends i.Component {
    static props = { value: "" };
    #oN = (0, i.signal)(!1);
    #ir = {
      value: this.$props.value,
      check: this.#oU.bind(this),
      onCheck: null,
    };
    get checked() {
      return this.#oN();
    }
    constructor() {
      (super(), new iA());
    }
    onSetup() {
      this.setAttributes({
        value: this.$props.value,
        "data-checked": this.#oN,
        "aria-checked": iv(this.#oN),
      });
    }
    onAttach(e) {
      let t = (0, i.hasProvidedContext)(sP);
      (tt(e, "tabindex", t ? "-1" : "0"),
        tt(e, "role", t ? "menuitemradio" : "radio"),
        (0, i.effect)(this.#nc.bind(this)));
    }
    onConnect(e) {
      (this.#oB(),
        tr(e, this.#az.bind(this)),
        (0, i.onDispose)(this.#eA.bind(this)));
    }
    #eA() {
      (0, i.scoped)(() => {
        (0, i.useContext)(sB).remove(this.#ir);
      }, this.connectScope);
    }
    #oB() {
      (0, i.useContext)(sB).add(this.#ir);
    }
    #nc() {
      let { value: e } = this.$props,
        t = e();
      (0, i.peek)(this.#oN) && this.#ir.onCheck?.(t);
    }
    #az(e) {
      (0, i.peek)(this.#oN) ||
        (this.#$(!0, e),
        this.#oK(e),
        this.#ir.onCheck?.((0, i.peek)(this.$props.value), e));
    }
    #oU(e, t) {
      (0, i.peek)(this.#oN) !== e && this.#$(e, t);
    }
    #$(e, t) {
      (this.#oN.set(e), this.dispatch("change", { detail: e, trigger: t }));
    }
    #oK(e) {
      this.dispatch("select", { trigger: e });
    }
  }
  let sH = sQ.prototype;
  (0, i.prop)(sH, "checked");
  class sz extends i.Component {
    static props = { disabled: !1, event: void 0, action: void 0 };
    #M;
    #ez = null;
    onSetup() {
      this.#M = eY();
      let { event: e, action: t } = this.$props;
      this.setAttributes({ event: e, action: t });
    }
    onAttach(e) {
      (e.setAttribute("data-media-gesture", ""),
        e.style.setProperty("pointer-events", "none"));
    }
    onConnect(e) {
      ((this.#ez = this.#M.player.el?.querySelector("[data-media-provider]")),
        (0, i.effect)(this.#oW.bind(this)));
    }
    #oW() {
      let e = this.$props.event(),
        t = this.$props.disabled();
      this.#ez &&
        e &&
        !t &&
        (/^dbl/.test(e) && (e = e.split(/^dbl/)[1]),
        ("pointerup" === e || "pointerdown" === e) &&
          "coarse" === this.#M.$state.pointer() &&
          (e = "pointerup" === e ? "touchend" : "touchstart"),
        (0, i.listenEvent)(this.#ez, e, this.#oG.bind(this), { passive: !1 }));
    }
    #oQ = 0;
    #oH = -1;
    #oG(e) {
      if (
        this.$props.disabled() ||
        ((0, i.isPointerEvent)(e) && (0 !== e.button || this.#M.activeMenu)) ||
        ((0, i.isTouchEvent)(e) && this.#M.activeMenu) ||
        to(e) ||
        !this.#oz(e)
      )
        return;
      ((e.MEDIA_GESTURE = !0), e.preventDefault());
      let t = (0, i.peek)(this.$props.event);
      if (t?.startsWith("dbl")) {
        if (1 === this.#oQ) {
          (queueMicrotask(() => this.#oj(e)),
            clearTimeout(this.#oH),
            (this.#oQ = 0));
          return;
        }
      } else
        0 === this.#oQ &&
          setTimeout(() => {
            1 === this.#oQ && this.#oj(e);
          }, 250);
      (0 === this.#oQ &&
        (this.#oH = window.setTimeout(() => {
          this.#oQ = 0;
        }, 275)),
        this.#oQ++);
    }
    #oj(e) {
      (this.el.setAttribute("data-triggered", ""),
        requestAnimationFrame(() => {
          (this.#o_() && this.#oX((0, i.peek)(this.$props.action), e),
            requestAnimationFrame(() => {
              this.el.removeAttribute("data-triggered");
            }));
        }));
    }
    #oz(e) {
      if (!this.el) return !1;
      if (
        (0, i.isPointerEvent)(e) ||
        (0, i.isMouseEvent)(e) ||
        (0, i.isTouchEvent)(e)
      ) {
        let t = (0, i.isTouchEvent)(e)
            ? (e.changedTouches[0] ?? e.touches[0])
            : void 0,
          s = t?.clientX ?? e.clientX,
          a = t?.clientY ?? e.clientY,
          n = this.el.getBoundingClientRect(),
          r = a >= n.top && a <= n.bottom && s >= n.left && s <= n.right;
        return e.type.includes("leave") ? !r : r;
      }
      return !0;
    }
    #o_() {
      return (
        Array.from(
          this.#M.player.el.querySelectorAll(
            "[data-media-gesture][data-triggered]",
          ),
        ).sort(
          (e, t) => getComputedStyle(t).zIndex - getComputedStyle(e).zIndex,
        )[0] === this.el
      );
    }
    #oX(e, t) {
      if (!e) return;
      let s = new i.DOMEvent("will-trigger", {
        detail: e,
        cancelable: !0,
        trigger: t,
      });
      if ((this.dispatchEvent(s), s.defaultPrevented)) return;
      let [a, n] = e.replace(/:([a-z])/, "-$1").split(":");
      (e.includes(":fullscreen")
        ? this.#M.remote.toggleFullscreen("prefer-media", t)
        : e.includes("seek:")
          ? this.#M.remote.seek(
              (0, i.peek)(this.#M.$state.currentTime) + (+n || 0),
              t,
            )
          : this.#M.remote[(0, i.kebabToCamelCase)(a)](t),
        this.dispatch("trigger", { detail: e, trigger: t }));
    }
  }
  class sj {
    priority = 10;
    #x = null;
    #oJ;
    #e1;
    constructor(e) {
      this.#oJ = e;
    }
    attach() {}
    canRender() {
      return !0;
    }
    detach() {
      (this.#e1?.abort(),
        (this.#e1 = void 0),
        this.#oJ.reset(),
        (this.#x = null));
    }
    changeTrack(e) {
      e &&
        this.#x !== e &&
        (this.#e1?.abort(),
        (this.#e1 = new i.EventsController(e)),
        e.readyState < 2
          ? (this.#oJ.reset(),
            this.#e1.add("load", () => this.#oY(e), { once: !0 }))
          : this.#oY(e),
        this.#e1
          .add("add-cue", (e) => {
            this.#oJ.addCue(e.detail);
          })
          .add("remove-cue", (e) => {
            this.#oJ.removeCue(e.detail);
          }),
        (this.#x = e));
    }
    #oY(e) {
      this.#oJ.changeTrack({ cues: [...e.cues], regions: [...e.regions] });
    }
  }
  class s_ extends i.Component {
    static props = { textDir: "ltr", exampleText: "Captions look like this." };
    #M;
    static lib = (0, i.signal)(null);
    onSetup() {
      ((this.#M = eY()),
        this.setAttributes({ "aria-hidden": iv(this.#aX.bind(this)) }));
    }
    onAttach(e) {
      e.style.setProperty("pointer-events", "none");
    }
    onConnect(t) {
      (s_.lib() || e.A(305136).then((e) => s_.lib.set(e)),
        (0, i.effect)(this.#oZ.bind(this)));
    }
    #aX() {
      let {
          textTrack: e,
          remotePlaybackState: t,
          iOSControls: i,
        } = this.#M.$state,
        s = e();
      return i() || "connected" === t() || !s || !eQ(s);
    }
    #oZ() {
      if (!s_.lib()) return;
      let { viewType: e } = this.#M.$state;
      return "audio" === e() ? this.#o0() : this.#o1();
    }
    #o0() {
      return (
        (0, i.effect)(this.#tj.bind(this)),
        this.#o2(null),
        () => {
          this.el.textContent = "";
        }
      );
    }
    #tj() {
      if (this.#aX()) return;
      this.#o3();
      let { textTrack: e } = this.#M.$state;
      ((0, i.listenEvent)(e(), "cue-change", this.#o3.bind(this)),
        (0, i.effect)(this.#o5.bind(this)));
    }
    #o3() {
      ((this.el.textContent = ""), this.#o4 >= 0 && this.#o7());
      let { realCurrentTime: e, textTrack: t } = this.#M.$state,
        { renderVTTCueString: s } = s_.lib(),
        a = (0, i.peek)(e);
      for (let e of (0, i.peek)(t).activeCues) {
        let t = this.#o6(),
          i = this.#o9();
        ((i.innerHTML = s(e, a)), t.append(i), this.el.append(i));
      }
    }
    #o5() {
      let { realCurrentTime: e } = this.#M.$state,
        { updateTimedVTTCueNodes: t } = s_.lib();
      t(this.el, e());
    }
    #o1() {
      let { CaptionsRenderer: e } = s_.lib(),
        t = new e(this.el),
        s = new sj(t);
      return (
        this.#M.textRenderers.add(s),
        (0, i.effect)(this.#o8.bind(this, t)),
        (0, i.effect)(this.#he.bind(this, t)),
        this.#o2(t),
        () => {
          ((this.el.textContent = ""),
            this.#M.textRenderers.remove(s),
            t.destroy());
        }
      );
    }
    #o8(e) {
      e.dir = this.$props.textDir();
    }
    #he(e) {
      if (this.#aX()) return;
      let { realCurrentTime: t, textTrack: i } = this.#M.$state;
      ((e.currentTime = t()),
        this.#o4 >= 0 && i()?.activeCues[0] && this.#o7());
    }
    #o2(e) {
      let t = this.#M.player;
      if (!t) return;
      let s = this.#ht.bind(this, e);
      (0, i.listenEvent)(t, "vds-font-change", s);
    }
    #ht(e) {
      if (this.#o4 >= 0) return void this.#hi();
      let { textTrack: t } = this.#M.$state;
      t()?.activeCues[0] ? e?.update(!0) : this.#hs();
    }
    #hs() {
      let e = this.#o6();
      (0, i.setAttribute)(e, "data-example", "");
      let t = this.#o9();
      ((0, i.setAttribute)(t, "data-example", ""),
        (t.textContent = this.$props.exampleText()),
        e?.append(t),
        this.el?.append(e),
        this.el?.setAttribute("data-example", ""),
        this.#hi());
    }
    #o4 = -1;
    #hi() {
      (window.clearTimeout(this.#o4),
        (this.#o4 = window.setTimeout(this.#o7.bind(this), 2500)));
    }
    #o7() {
      (this.el?.removeAttribute("data-example"),
        this.el?.querySelector("[data-example]") && (this.el.textContent = ""),
        (this.#o4 = -1));
    }
    #o6() {
      let e = document.createElement("div");
      return ((0, i.setAttribute)(e, "data-part", "cue-display"), e);
    }
    #o9() {
      let e = document.createElement("div");
      return ((0, i.setAttribute)(e, "data-part", "cue"), e);
    }
  }
  class sX extends i.Component {
    static props = { src: null, alt: null, crossOrigin: null };
    static state = new i.State({
      img: null,
      src: null,
      alt: null,
      crossOrigin: null,
      loading: !0,
      error: null,
      hidden: !1,
    });
    #M;
    onSetup() {
      ((this.#M = eY()), this.#nW(), this.#ha(), this.#sm(), this.#nv());
    }
    onAttach(e) {
      (e.style.setProperty("pointer-events", "none"),
        (0, i.effect)(this.#nV.bind(this)),
        (0, i.effect)(this.#nW.bind(this)),
        (0, i.effect)(this.#ha.bind(this)),
        (0, i.effect)(this.#sm.bind(this)),
        (0, i.effect)(this.#nv.bind(this)));
      let { started: t } = this.#M.$state;
      this.setAttributes({
        "data-visible": () => !t() && !this.$state.hidden(),
        "data-loading": this.#nR.bind(this),
        "data-error": this.#nI.bind(this),
        "data-hidden": this.$state.hidden,
      });
    }
    onConnect(e) {
      ((0, i.effect)(this.#hn.bind(this)), (0, i.effect)(this.#te.bind(this)));
    }
    #nI() {
      let { error: e } = this.$state;
      return !(0, i.isNull)(e());
    }
    #hn() {
      let { canLoadPoster: e, poster: t } = this.#M.$state;
      !e() && t() && eV(t(), "preconnect");
    }
    #nv() {
      let { src: e } = this.$props,
        { poster: t, nativeControls: s } = this.#M.$state;
      (this.el && (0, i.setAttribute)(this.el, "display", s() ? "none" : null),
        this.$state.hidden.set(this.#nI() || !(e() || t()) || s()));
    }
    #nR() {
      let { loading: e, hidden: t } = this.$state;
      return !t() && e();
    }
    #nV() {
      let e = this.$state.img();
      e &&
        (new i.EventsController(e)
          .add("load", this.#hr.bind(this))
          .add("error", this.#eE.bind(this)),
        e.complete && this.#hr());
    }
    #ho = "";
    #nW() {
      let { poster: e } = this.#M.$props,
        {
          canLoadPoster: t,
          providedPoster: i,
          inferredPoster: s,
        } = this.#M.$state,
        a = this.$props.src() || "",
        n = a || e() || s();
      (this.#ho === i() && i.set(a),
        this.$state.src.set(t() && n.length ? n : null),
        (this.#ho = a));
    }
    #ha() {
      let { src: e } = this.$props,
        { alt: t } = this.$state,
        { poster: i } = this.#M.$state;
      t.set(e() || i() ? this.$props.alt() : null);
    }
    #sm() {
      let { crossOrigin: e } = this.$props,
        { crossOrigin: t } = this.$state,
        { crossOrigin: i, poster: s } = this.#M.$state,
        a = null !== e() ? e() : i();
      t.set(
        /ytimg\.com|vimeo/.test(s() || "") ? null : !0 === a ? "anonymous" : a,
      );
    }
    #te() {
      let { loading: e, error: t } = this.$state,
        { canLoadPoster: i, poster: s } = this.#M.$state;
      (e.set(i() && !!s()), t.set(null));
    }
    #hr() {
      let { loading: e, error: t } = this.$state;
      (e.set(!1), t.set(null));
    }
    #eE(e) {
      let { loading: t, error: i } = this.$state;
      (t.set(!1), i.set(e));
    }
  }
  class sJ extends i.Component {
    static props = {
      type: "current",
      showHours: !1,
      padHours: null,
      padMinutes: null,
      remainder: !1,
      toggle: !1,
      hidden: !1,
    };
    static state = new i.State({ timeText: "", hidden: !1 });
    #M;
    #hh = (0, i.signal)(null);
    #nd = (0, i.signal)(!0);
    #nu = (0, i.signal)(!0);
    onSetup() {
      ((this.#M = eY()), this.#hl());
      let { type: e } = this.$props;
      (this.setAttributes({
        "data-type": e,
        "data-remainder": this.#hd.bind(this),
      }),
        new st({ callback: this.#nf.bind(this) }).attach(this));
    }
    onAttach(e) {
      (e.hasAttribute("role") || (0, i.effect)(this.#hu.bind(this)),
        (0, i.effect)(this.#hl.bind(this)));
    }
    onConnect(e) {
      ((0, i.onDispose)(ta(e, this.#nd.set)),
        (0, i.effect)(this.#nv.bind(this)),
        (0, i.effect)(this.#hc.bind(this)));
    }
    #nf(e) {
      this.#nu.set(e[0].isIntersecting);
    }
    #nv() {
      let { hidden: e } = this.$props;
      this.$state.hidden.set(e() || !this.#nd() || !this.#nu());
    }
    #hc() {
      this.$props.toggle()
        ? this.el && tr(this.el, this.#hp.bind(this))
        : this.#hh.set(null);
    }
    #hl() {
      let { hidden: e, timeText: t } = this.$state,
        { duration: i } = this.#M.$state;
      if (e()) return;
      let { type: s, padHours: a, padMinutes: n, showHours: r } = this.$props,
        o = this.#hm(s()),
        h = i(),
        l = this.#hd();
      if (!Number.isFinite(o + h)) return void t.set("LIVE");
      let d = ih(l ? Math.max(0, h - o) : o, {
        padHrs: a(),
        padMins: n(),
        showHrs: r(),
      });
      t.set((l ? "-" : "") + d);
    }
    #hu() {
      if (!this.el) return;
      let { toggle: e } = this.$props;
      ((0, i.setAttribute)(this.el, "role", e() ? "timer" : null),
        (0, i.setAttribute)(this.el, "tabindex", e() ? 0 : null));
    }
    #hm(e) {
      let { bufferedEnd: t, duration: i, currentTime: s } = this.#M.$state;
      switch (e) {
        case "buffered":
          return t();
        case "duration":
          return i();
        default:
          return s();
      }
    }
    #hd() {
      return this.$props.remainder() && !1 !== this.#hh();
    }
    #hp(e) {
      (e.preventDefault(), null === this.#hh())
        ? this.#hh.set(!this.$props.remainder())
        : this.#hh.set((e) => !e);
    }
  }
  class sY extends iL {}
  class sZ extends sh {}
  let s0 = t.forwardRef((e, i) => {
    let { children: s, ...a } = e,
      n = t.Children.toArray(s),
      r = n.find(s3);
    if (r) {
      let e = r.props.children,
        s = n.map((i) =>
          i !== r
            ? i
            : t.Children.count(e) > 1
              ? t.Children.only(null)
              : t.isValidElement(e)
                ? e.props.children
                : null,
        );
      return t.createElement(
        s1,
        { ...a, ref: i },
        t.isValidElement(e) ? t.cloneElement(e, void 0, s) : null,
      );
    }
    return t.createElement(s1, { ...a, ref: i }, s);
  });
  s0.displayName = "Slot";
  let s1 = t.forwardRef((e, s) => {
    let { children: a, ...n } = e;
    return t.isValidElement(a)
      ? t.cloneElement(a, {
          ...(function (e, t) {
            let i = { ...t };
            for (let s in t) {
              let a = e[s],
                n = t[s];
              /^on[A-Z]/.test(s)
                ? a && n
                  ? (i[s] = (...e) => {
                      (n(...e), a(...e));
                    })
                  : a && (i[s] = a)
                : "style" === s
                  ? (i[s] = { ...a, ...n })
                  : "className" === s &&
                    (i[s] = [a, n].filter(Boolean).join(" "));
            }
            return { ...e, ...i };
          })(n, a.props),
          ref: s ? (0, i.composeRefs)(s, a.ref) : a.ref,
        })
      : t.Children.count(a) > 1
        ? t.Children.only(null)
        : null;
  });
  s1.displayName = "SlotClone";
  let s2 = ({ children: e }) => t.createElement(t.Fragment, null, e);
  function s3(e) {
    return t.isValidElement(e) && e.type === s2;
  }
  let s5 = ["button", "div", "span", "img", "video", "audio"].reduce((e, i) => {
      let s = t.forwardRef((e, s) => {
        let { asChild: a, ...n } = e,
          r = a ? s0 : i;
        return t.createElement(r, { ...n, ref: s });
      });
      return ((s.displayName = `Primitive.${i}`), { ...e, [i]: s });
    }, {}),
    s4 = sZ.state.record,
    s7 = Object.keys(s4).reduce((e, t) => ({ ...e, [t]: () => s4[t] }), {}),
    s6 = sY.state.record,
    s9 = Object.keys(s6).reduce((e, t) => ({ ...e, [t]: () => s6[t] }), {});
  e.s(
    [
      "iS",
      0,
      class extends i0 {},
      "sl",
      0,
      class extends sk {},
      "fN",
      0,
      class extends i3 {},
      "E$",
      0,
      class extends s_ {},
      "LM",
      0,
      class extends iG {},
      "rc",
      0,
      class extends iW {},
      "SS",
      0,
      class extends i5 {},
      "py",
      0,
      class extends sz {},
      "Ue",
      0,
      class extends i1 {},
      "GB",
      0,
      tj,
      "Fj",
      0,
      tH,
      "Rz",
      0,
      ed,
      "TL",
      0,
      eh,
      "MJ",
      0,
      er,
      "MP",
      0,
      e1,
      "Rl",
      0,
      class extends i9 {},
      "p2",
      0,
      class extends iK {},
      "kc",
      0,
      sY,
      "h",
      0,
      class extends iU {},
      "vL",
      0,
      eZ,
      "_C",
      0,
      class extends sV {},
      "l8",
      0,
      class extends sI {},
      "Vx",
      0,
      class extends sF {},
      "CT",
      0,
      class extends sU {},
      "mJ",
      0,
      class extends i4 {},
      "cO",
      0,
      class extends i7 {},
      "by",
      0,
      class extends i2 {},
      "nb",
      0,
      class extends sX {},
      "CZ",
      0,
      s5,
      "Pu",
      0,
      class extends sx {},
      "cS",
      0,
      tm,
      "Z_",
      0,
      tW,
      "vp",
      0,
      sK,
      "L5",
      0,
      class extends sW {},
      "x2",
      0,
      class extends sQ {},
      "zw",
      0,
      class extends i6 {},
      "Ss",
      0,
      class extends s$ {},
      "kd",
      0,
      sZ,
      "wI",
      0,
      class extends sv {},
      "fX",
      0,
      class extends sp {},
      "p$",
      0,
      class extends sf {},
      "Vf",
      0,
      class extends sm {},
      "tE",
      0,
      class extends sT {},
      "it",
      0,
      eW,
      "LI",
      0,
      eU,
      "SJ",
      0,
      class extends sc {},
      "FK",
      0,
      su,
      "TX",
      0,
      class extends sJ {},
      "y0",
      0,
      ew,
      "Vu",
      0,
      class extends sS {},
      "M",
      0,
      class extends iY {},
      "$1",
      0,
      class extends iX {},
      "TS",
      0,
      class extends ij {},
      "_X",
      0,
      class extends i_ {},
      "L0",
      0,
      t0,
      "GM",
      0,
      class extends sw {},
      "cs",
      0,
      function (e, t) {
        let i = new URL(e);
        for (let e of Object.keys(t)) i.searchParams.set(e, t[e] + "");
        return i.toString();
      },
      "gR",
      0,
      eI,
      "hL",
      0,
      t5,
      "wT",
      0,
      il,
      "eJ",
      0,
      ih,
      "G4",
      0,
      function (e) {
        return e?.$$PROVIDER_TYPE === "HLS";
      },
      "Va",
      0,
      eb,
      "pt",
      0,
      function (e) {
        return e?.$$PROVIDER_TYPE === "REMOTION";
      },
      "oe",
      0,
      eQ,
      "UF",
      0,
      function (e) {
        return e?.$$PROVIDER_TYPE === "VIDEO";
      },
      "sE",
      0,
      eF,
      "$r",
      0,
      eJ,
      "pQ",
      0,
      eH,
      "xw",
      0,
      sP,
      "WZ",
      0,
      eV,
      "zl",
      0,
      tf,
      "n0",
      0,
      sb,
      "Dg",
      0,
      eY,
      "Z9",
      0,
      function (e, t) {
        let s = (0, i.useStateContext)(eH);
        return (0, i.useSignal)((t?.current?.$state || s || s9)[e]);
      },
      "$x",
      0,
      function (e) {
        let t = (0, i.useStateContext)(eH);
        return (0, i.useSignalRecord)(e?.current ? e.current.$state : t || s9);
      },
      "vN",
      0,
      function (e, t) {
        let s = (0, i.useStateContext)(i8);
        return (0, i.useSignal)((t?.current?.$state || s || s7)[e]);
      },
      "WC",
      0,
      eK,
    ],
    77962,
  );
};
