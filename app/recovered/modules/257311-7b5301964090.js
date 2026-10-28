// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(352386),
    n = e.i(641645),
    r = e.i(226115),
    i = e.i(565693),
    o = e.i(925849),
    l = e.i(278051),
    s = e.i(210242);
  function u(e, t, n) {
    let r,
      { reference: i, floating: o } = e,
      l = (0, s.$)(t),
      u = (0, s.i)(t),
      a = (0, s.T)(u),
      c = (0, s.m)(t),
      f = "y" === l,
      d = i.x + i.width / 2 - o.width / 2,
      p = i.y + i.height / 2 - o.height / 2,
      g = i[a] / 2 - o[a] / 2;
    switch (c) {
      case "top":
        r = { x: d, y: i.y - o.height };
        break;
      case "bottom":
        r = { x: d, y: i.y + i.height };
        break;
      case "right":
        r = { x: i.x + i.width, y: p };
        break;
      case "left":
        r = { x: i.x - o.width, y: p };
        break;
      default:
        r = { x: i.x, y: i.y };
    }
    switch ((0, s.R)(t)) {
      case "start":
        r[u] -= g * (n && f ? -1 : 1);
        break;
      case "end":
        r[u] += g * (n && f ? -1 : 1);
    }
    return r;
  }
  async function a(e, t) {
    var n;
    void 0 === t && (t = {});
    let { x: r, y: i, platform: o, rects: l, elements: u, strategy: a } = e,
      {
        boundary: c = "clippingAncestors",
        rootBoundary: f = "viewport",
        elementContext: d = "floating",
        altBoundary: p = !1,
        padding: g = 0,
      } = (0, s.h)(t, e),
      h = (0, s.j)(g),
      m = u[p ? ("floating" === d ? "reference" : "floating") : d],
      v = (0, s._)(
        await o.getClippingRect({
          element:
            null ==
              (n = await (null == o.isElement ? void 0 : o.isElement(m))) || n
              ? m
              : m.contextElement ||
                (await (null == o.getDocumentElement
                  ? void 0
                  : o.getDocumentElement(u.floating))),
          boundary: c,
          rootBoundary: f,
          strategy: a,
        }),
      ),
      y =
        "floating" === d
          ? { x: r, y: i, width: l.floating.width, height: l.floating.height }
          : l.reference,
      b = await (null == o.getOffsetParent
        ? void 0
        : o.getOffsetParent(u.floating)),
      w = ((await (null == o.isElement ? void 0 : o.isElement(b))) &&
        (await (null == o.getScale ? void 0 : o.getScale(b)))) || {
        x: 1,
        y: 1,
      },
      E = (0, s._)(
        o.convertOffsetParentRelativeRectToViewportRelativeRect
          ? await o.convertOffsetParentRelativeRectToViewportRelativeRect({
              elements: u,
              rect: y,
              offsetParent: b,
              strategy: a,
            })
          : y,
      );
    return {
      top: (v.top - E.top + h.top) / w.y,
      bottom: (E.bottom - v.bottom + h.bottom) / w.y,
      left: (v.left - E.left + h.left) / w.x,
      right: (E.right - v.right + h.right) / w.x,
    };
  }
  let c = async (e, t, n) => {
    let {
        placement: r = "bottom",
        strategy: i = "absolute",
        middleware: o = [],
        platform: l,
      } = n,
      s = l.detectOverflow ? l : { ...l, detectOverflow: a },
      c = await (null == l.isRTL ? void 0 : l.isRTL(t)),
      f = await l.getElementRects({ reference: e, floating: t, strategy: i }),
      { x: d, y: p } = u(f, r, c),
      g = r,
      h = 0,
      m = {};
    for (let n = 0; n < o.length; n++) {
      let a = o[n];
      if (!a) continue;
      let { name: v, fn: y } = a,
        {
          x: b,
          y: w,
          data: E,
          reset: x,
        } = await y({
          x: d,
          y: p,
          initialPlacement: r,
          placement: g,
          strategy: i,
          middlewareData: m,
          rects: f,
          platform: s,
          elements: { reference: e, floating: t },
        });
      ((d = null != b ? b : d),
        (p = null != w ? w : p),
        (m[v] = { ...m[v], ...E }),
        x &&
          h < 50 &&
          (h++,
          "object" == typeof x &&
            (x.placement && (g = x.placement),
            x.rects &&
              (f =
                !0 === x.rects
                  ? await l.getElementRects({
                      reference: e,
                      floating: t,
                      strategy: i,
                    })
                  : x.rects),
            ({ x: d, y: p } = u(f, g, c))),
          (n = -1)));
    }
    return { x: d, y: p, placement: g, strategy: i, middlewareData: m };
  };
  function f(e, t) {
    return {
      top: e.top - t.height,
      right: e.right - t.width,
      bottom: e.bottom - t.height,
      left: e.left - t.width,
    };
  }
  function d(e) {
    return s.M.some((t) => e[t] >= 0);
  }
  function p(e) {
    let t = (0, s.u)(...e.map((e) => e.left)),
      n = (0, s.u)(...e.map((e) => e.top));
    return {
      x: t,
      y: n,
      width: (0, s.y)(...e.map((e) => e.right)) - t,
      height: (0, s.y)(...e.map((e) => e.bottom)) - n,
    };
  }
  let g = new Set(["left", "top"]);
  async function h(e, t) {
    let { placement: n, platform: r, elements: i } = e,
      o = await (null == r.isRTL ? void 0 : r.isRTL(i.floating)),
      l = (0, s.m)(n),
      u = (0, s.R)(n),
      a = "y" === (0, s.$)(n),
      c = g.has(l) ? -1 : 1,
      f = o && a ? -1 : 1,
      d = (0, s.h)(t, e),
      {
        mainAxis: p,
        crossAxis: h,
        alignmentAxis: m,
      } = "number" == typeof d
        ? { mainAxis: d, crossAxis: 0, alignmentAxis: null }
        : {
            mainAxis: d.mainAxis || 0,
            crossAxis: d.crossAxis || 0,
            alignmentAxis: d.alignmentAxis,
          };
    return (
      u && "number" == typeof m && (h = "end" === u ? -1 * m : m),
      a ? { x: h * f, y: p * c } : { x: p * c, y: h * f }
    );
  }
  var m = e.i(880269);
  function v(e) {
    let t = (0, m.X)(e),
      n = parseFloat(t.width) || 0,
      r = parseFloat(t.height) || 0,
      i = (0, m.E)(e),
      o = i ? e.offsetWidth : n,
      l = i ? e.offsetHeight : r,
      u = (0, s.H)(n) !== o || (0, s.H)(r) !== l;
    return (u && ((n = o), (r = l)), { width: n, height: r, $: u });
  }
  function y(e) {
    return (0, m.m)(e) ? e : e.contextElement;
  }
  function b(e) {
    let t = y(e);
    if (!(0, m.E)(t)) return (0, s.I)(1);
    let n = t.getBoundingClientRect(),
      { width: r, height: i, $: o } = v(t),
      l = (o ? (0, s.H)(n.width) : n.width) / r,
      u = (o ? (0, s.H)(n.height) : n.height) / i;
    return (
      (l && Number.isFinite(l)) || (l = 1),
      (u && Number.isFinite(u)) || (u = 1),
      { x: l, y: u }
    );
  }
  let w = (0, s.I)(0);
  function E(e) {
    let t = (0, m.K)(e);
    return (0, m.i)() && t.visualViewport
      ? { x: t.visualViewport.offsetLeft, y: t.visualViewport.offsetTop }
      : w;
  }
  function x(e, t, n, r) {
    var i;
    (void 0 === t && (t = !1), void 0 === n && (n = !1));
    let o = e.getBoundingClientRect(),
      l = y(e),
      u = (0, s.I)(1);
    t && (r ? (0, m.m)(r) && (u = b(r)) : (u = b(e)));
    let a = (void 0 === (i = n) && (i = !1),
      r && (!i || r === (0, m.K)(l)) && i)
        ? E(l)
        : (0, s.I)(0),
      c = (o.left + a.x) / u.x,
      f = (o.top + a.y) / u.y,
      d = o.width / u.x,
      p = o.height / u.y;
    if (l) {
      let e = (0, m.K)(l),
        t = r && (0, m.m)(r) ? (0, m.K)(r) : r,
        n = e,
        i = (0, m.w)(n);
      for (; i && r && t !== n; ) {
        let e = b(i),
          t = i.getBoundingClientRect(),
          r = (0, m.X)(i),
          o = t.left + (i.clientLeft + parseFloat(r.paddingLeft)) * e.x,
          l = t.top + (i.clientTop + parseFloat(r.paddingTop)) * e.y;
        ((c *= e.x),
          (f *= e.y),
          (d *= e.x),
          (p *= e.y),
          (c += o),
          (f += l),
          (n = (0, m.K)(i)),
          (i = (0, m.w)(n)));
      }
    }
    return (0, s._)({ width: d, height: p, x: c, y: f });
  }
  function R(e, t) {
    let n = (0, m.Q)(e).scrollLeft;
    return t ? t.left + n : x((0, m.I)(e)).left + n;
  }
  function S(e, t) {
    let n = e.getBoundingClientRect();
    return { x: n.left + t.scrollLeft - R(e, n), y: n.top + t.scrollTop };
  }
  function T(e, t, n) {
    var r;
    let i;
    if ("viewport" === t)
      i = (function (e, t) {
        let n = (0, m.K)(e),
          r = (0, m.I)(e),
          i = n.visualViewport,
          o = r.clientWidth,
          l = r.clientHeight,
          s = 0,
          u = 0;
        if (i) {
          ((o = i.width), (l = i.height));
          let e = (0, m.i)();
          (!e || (e && "fixed" === t)) &&
            ((s = i.offsetLeft), (u = i.offsetTop));
        }
        let a = R(r);
        if (a <= 0) {
          let e = r.ownerDocument,
            t = e.body,
            n = getComputedStyle(t),
            i =
              ("CSS1Compat" === e.compatMode &&
                parseFloat(n.marginLeft) + parseFloat(n.marginRight)) ||
              0,
            l = Math.abs(r.clientWidth - t.clientWidth - i);
          l <= 25 && (o -= l);
        } else a <= 25 && (o += a);
        return { width: o, height: l, x: s, y: u };
      })(e, n);
    else if ("document" === t) {
      let t, n, o, l, u, a, c;
      ((r = (0, m.I)(e)),
        (t = (0, m.I)(r)),
        (n = (0, m.Q)(r)),
        (o = r.ownerDocument.body),
        (l = (0, s.y)(
          t.scrollWidth,
          t.clientWidth,
          o.scrollWidth,
          o.clientWidth,
        )),
        (u = (0, s.y)(
          t.scrollHeight,
          t.clientHeight,
          o.scrollHeight,
          o.clientHeight,
        )),
        (a = -n.scrollLeft + R(r)),
        (c = -n.scrollTop),
        "rtl" === (0, m.X)(o).direction &&
          (a += (0, s.y)(t.clientWidth, o.clientWidth) - l),
        (i = { width: l, height: u, x: a, y: c }));
    } else if ((0, m.m)(t)) {
      let e, r, o, l, u, a;
      ((r = (e = x(t, !0, "fixed" === n)).top + t.clientTop),
        (o = e.left + t.clientLeft),
        (l = (0, m.E)(t) ? b(t) : (0, s.I)(1)),
        (u = t.clientWidth * l.x),
        (a = t.clientHeight * l.y),
        (i = { width: u, height: a, x: o * l.x, y: r * l.y }));
    } else {
      let n = E(e);
      i = { x: t.x - n.x, y: t.y - n.y, width: t.width, height: t.height };
    }
    return (0, s._)(i);
  }
  function C(e) {
    return "static" === (0, m.X)(e).position;
  }
  function k(e, t) {
    if (!(0, m.E)(e) || "fixed" === (0, m.X)(e).position) return null;
    if (t) return t(e);
    let n = e.offsetParent;
    return ((0, m.I)(e) === n && (n = n.ownerDocument.body), n);
  }
  function O(e, t) {
    let n = (0, m.K)(e);
    if ((0, m.D)(e)) return n;
    if (!(0, m.E)(e)) {
      let t = (0, m.J)(e);
      for (; t && !(0, m.Z)(t); ) {
        if ((0, m.m)(t) && !C(t)) return t;
        t = (0, m.J)(t);
      }
      return n;
    }
    let r = k(e, t);
    for (; r && (0, m.S)(r) && C(r); ) r = k(r, t);
    return r && (0, m.Z)(r) && C(r) && !(0, m.e)(r) ? n : r || (0, m.f)(e) || n;
  }
  let I = async function (e) {
      let t = this.getOffsetParent || O,
        n = this.getDimensions,
        r = await n(e.floating);
      return {
        reference: (function (e, t, n) {
          let r = (0, m.E)(t),
            i = (0, m.I)(t),
            o = "fixed" === n,
            l = x(e, !0, o, t),
            u = { scrollLeft: 0, scrollTop: 0 },
            a = (0, s.I)(0);
          if (r || (!r && !o))
            if (
              (("body" !== (0, m.A)(t) || (0, m.B)(i)) && (u = (0, m.Q)(t)), r)
            ) {
              let e = x(t, !0, o, t);
              ((a.x = e.x + t.clientLeft), (a.y = e.y + t.clientTop));
            } else i && (a.x = R(i));
          o && !r && i && (a.x = R(i));
          let c = !i || r || o ? (0, s.I)(0) : S(i, u);
          return {
            x: l.left + u.scrollLeft - a.x - c.x,
            y: l.top + u.scrollTop - a.y - c.y,
            width: l.width,
            height: l.height,
          };
        })(e.reference, await t(e.floating), e.strategy),
        floating: { x: 0, y: 0, width: r.width, height: r.height },
      };
    },
    P = {
      convertOffsetParentRelativeRectToViewportRelativeRect: function (e) {
        let { elements: t, rect: n, offsetParent: r, strategy: i } = e,
          o = "fixed" === i,
          l = (0, m.I)(r),
          u = !!t && (0, m.D)(t.floating);
        if (r === l || (u && o)) return n;
        let a = { scrollLeft: 0, scrollTop: 0 },
          c = (0, s.I)(1),
          f = (0, s.I)(0),
          d = (0, m.E)(r);
        if (
          (d || (!d && !o)) &&
          (("body" !== (0, m.A)(r) || (0, m.B)(l)) && (a = (0, m.Q)(r)), d)
        ) {
          let e = x(r);
          ((c = b(r)), (f.x = e.x + r.clientLeft), (f.y = e.y + r.clientTop));
        }
        let p = !l || d || o ? (0, s.I)(0) : S(l, a);
        return {
          width: n.width * c.x,
          height: n.height * c.y,
          x: n.x * c.x - a.scrollLeft * c.x + f.x + p.x,
          y: n.y * c.y - a.scrollTop * c.y + f.y + p.y,
        };
      },
      getDocumentElement: m.I,
      getClippingRect: function (e) {
        let { element: t, boundary: n, rootBoundary: r, strategy: i } = e,
          o = [
            ...("clippingAncestors" === n
              ? (0, m.D)(t)
                ? []
                : (function (e, t) {
                    let n = t.get(e);
                    if (n) return n;
                    let r = (0, m.G)(e, [], !1).filter(
                        (e) => (0, m.m)(e) && "body" !== (0, m.A)(e),
                      ),
                      i = null,
                      o = "fixed" === (0, m.X)(e).position,
                      l = o ? (0, m.J)(e) : e;
                    for (; (0, m.m)(l) && !(0, m.Z)(l); ) {
                      let t = (0, m.X)(l),
                        n = (0, m.e)(l);
                      (n || "fixed" !== t.position || (i = null),
                        (
                          o
                            ? n || i
                            : !(
                                (!n &&
                                  "static" === t.position &&
                                  i &&
                                  ("absolute" === i.position ||
                                    "fixed" === i.position)) ||
                                ((0, m.B)(l) &&
                                  !n &&
                                  (function e(t, n) {
                                    let r = (0, m.J)(t);
                                    return (
                                      !(
                                        r === n ||
                                        !(0, m.m)(r) ||
                                        (0, m.Z)(r)
                                      ) &&
                                      ("fixed" === (0, m.X)(r).position ||
                                        e(r, n))
                                    );
                                  })(e, l))
                              )
                        )
                          ? (i = t)
                          : (r = r.filter((e) => e !== l)),
                        (l = (0, m.J)(l)));
                    }
                    return (t.set(e, r), r);
                  })(t, this._c)
              : [].concat(n)),
            r,
          ],
          l = T(t, o[0], i),
          u = l.top,
          a = l.right,
          c = l.bottom,
          f = l.left;
        for (let e = 1; e < o.length; e++) {
          let n = T(t, o[e], i);
          ((u = (0, s.y)(n.top, u)),
            (a = (0, s.u)(n.right, a)),
            (c = (0, s.u)(n.bottom, c)),
            (f = (0, s.y)(n.left, f)));
        }
        return { width: a - f, height: c - u, x: f, y: u };
      },
      getOffsetParent: O,
      getElementRects: I,
      getClientRects: function (e) {
        return Array.from(e.getClientRects());
      },
      getDimensions: function (e) {
        let { width: t, height: n } = v(e);
        return { width: t, height: n };
      },
      getScale: b,
      isElement: m.m,
      isRTL: function (e) {
        return "rtl" === (0, m.X)(e).direction;
      },
    };
  function M(e, t) {
    return (
      e.x === t.x && e.y === t.y && e.width === t.width && e.height === t.height
    );
  }
  function A(e, t, n, r) {
    let i;
    void 0 === r && (r = {});
    let {
        ancestorScroll: o = !0,
        ancestorResize: l = !0,
        elementResize: u = "function" == typeof ResizeObserver,
        layoutShift: a = "function" == typeof IntersectionObserver,
        animationFrame: c = !1,
      } = r,
      f = y(e),
      d = o || l ? [...(f ? (0, m.G)(f) : []), ...(t ? (0, m.G)(t) : [])] : [];
    d.forEach((e) => {
      (o && e.addEventListener("scroll", n, { passive: !0 }),
        l && e.addEventListener("resize", n));
    });
    let p =
        f && a
          ? (function (e, t) {
              let n,
                r = null,
                i = (0, m.I)(e);
              function o() {
                var e;
                (clearTimeout(n),
                  null == (e = r) || e.disconnect(),
                  (r = null));
              }
              return (
                !(function l(u, a) {
                  (void 0 === u && (u = !1), void 0 === a && (a = 1), o());
                  let c = e.getBoundingClientRect(),
                    { left: f, top: d, width: p, height: g } = c;
                  if ((u || t(), !p || !g)) return;
                  let h = {
                      rootMargin:
                        -(0, s.w)(d) +
                        "px " +
                        -(0, s.w)(i.clientWidth - (f + p)) +
                        "px " +
                        -(0, s.w)(i.clientHeight - (d + g)) +
                        "px " +
                        -(0, s.w)(f) +
                        "px",
                      threshold: (0, s.y)(0, (0, s.u)(1, a)) || 1,
                    },
                    m = !0;
                  function v(t) {
                    let r = t[0].intersectionRatio;
                    if (r !== a) {
                      if (!m) return l();
                      r
                        ? l(!1, r)
                        : (n = setTimeout(() => {
                            l(!1, 1e-7);
                          }, 1e3));
                    }
                    (1 !== r || M(c, e.getBoundingClientRect()) || l(),
                      (m = !1));
                  }
                  try {
                    r = new IntersectionObserver(v, {
                      ...h,
                      root: i.ownerDocument,
                    });
                  } catch (e) {
                    r = new IntersectionObserver(v, h);
                  }
                  r.observe(e);
                })(!0),
                o
              );
            })(f, n)
          : null,
      g = -1,
      h = null;
    u &&
      ((h = new ResizeObserver((e) => {
        let [r] = e;
        (r &&
          r.target === f &&
          h &&
          t &&
          (h.unobserve(t),
          cancelAnimationFrame(g),
          (g = requestAnimationFrame(() => {
            var e;
            null == (e = h) || e.observe(t);
          }))),
          n());
      })),
      f && !c && h.observe(f),
      t && h.observe(t));
    let v = c ? x(e) : null;
    return (
      c &&
        (function t() {
          let r = x(e);
          (v && !M(v, r) && n(), (v = r), (i = requestAnimationFrame(t)));
        })(),
      n(),
      () => {
        var e;
        (d.forEach((e) => {
          (o && e.removeEventListener("scroll", n),
            l && e.removeEventListener("resize", n));
        }),
          null == p || p(),
          null == (e = h) || e.disconnect(),
          (h = null),
          c && cancelAnimationFrame(i));
      }
    );
  }
  let L = function (e) {
      return (
        void 0 === e && (e = 0),
        {
          name: "offset",
          options: e,
          async fn(t) {
            var n, r;
            let { x: i, y: o, placement: l, middlewareData: s } = t,
              u = await h(t, e);
            return l === (null == (n = s.offset) ? void 0 : n.placement) &&
              null != (r = s.arrow) &&
              r.alignmentOffset
              ? {}
              : { x: i + u.x, y: o + u.y, data: { ...u, placement: l } };
          },
        }
      );
    },
    $ = function (e) {
      return (
        void 0 === e && (e = {}),
        {
          name: "shift",
          options: e,
          async fn(t) {
            let { x: n, y: r, placement: i, platform: o } = t,
              {
                mainAxis: l = !0,
                crossAxis: u = !1,
                limiter: a = {
                  fn: (e) => {
                    let { x: t, y: n } = e;
                    return { x: t, y: n };
                  },
                },
                ...c
              } = (0, s.h)(e, t),
              f = { x: n, y: r },
              d = await o.detectOverflow(t, c),
              p = (0, s.$)((0, s.m)(i)),
              g = (0, s.J)(p),
              h = f[g],
              m = f[p];
            if (l) {
              let e = "y" === g ? "top" : "left",
                t = "y" === g ? "bottom" : "right",
                n = h + d[e],
                r = h - d[t];
              h = (0, s.O)(n, h, r);
            }
            if (u) {
              let e = "y" === p ? "top" : "left",
                t = "y" === p ? "bottom" : "right",
                n = m + d[e],
                r = m - d[t];
              m = (0, s.O)(n, m, r);
            }
            let v = a.fn({ ...t, [g]: h, [p]: m });
            return {
              ...v,
              data: { x: v.x - n, y: v.y - r, enabled: { [g]: l, [p]: u } },
            };
          },
        }
      );
    },
    D = function (e) {
      return (
        void 0 === e && (e = {}),
        {
          name: "flip",
          options: e,
          async fn(t) {
            var n, r, i, o, l;
            let {
                placement: u,
                middlewareData: a,
                rects: c,
                initialPlacement: f,
                platform: d,
                elements: p,
              } = t,
              {
                mainAxis: g = !0,
                crossAxis: h = !0,
                fallbackPlacements: m,
                fallbackStrategy: v = "bestFit",
                fallbackAxisSideDirection: y = "none",
                flipAlignment: b = !0,
                ...w
              } = (0, s.h)(e, t);
            if (null != (n = a.arrow) && n.alignmentOffset) return {};
            let E = (0, s.m)(u),
              x = (0, s.$)(f),
              R = (0, s.m)(f) === f,
              S = await (null == d.isRTL ? void 0 : d.isRTL(p.floating)),
              T = m || (R || !b ? [(0, s.t)(f)] : (0, s.P)(f)),
              C = "none" !== y;
            !m && C && T.push(...(0, s.K)(f, b, y, S));
            let k = [f, ...T],
              O = await d.detectOverflow(t, w),
              I = [],
              P = (null == (r = a.flip) ? void 0 : r.overflows) || [];
            if ((g && I.push(O[E]), h)) {
              let e = (0, s.N)(u, c, S);
              I.push(O[e[0]], O[e[1]]);
            }
            if (
              ((P = [...P, { placement: u, overflows: I }]),
              !I.every((e) => e <= 0))
            ) {
              let e = ((null == (i = a.flip) ? void 0 : i.index) || 0) + 1,
                t = k[e];
              if (
                t &&
                ("alignment" !== h ||
                  x === (0, s.$)(t) ||
                  P.every(
                    (e) => (0, s.$)(e.placement) !== x || e.overflows[0] > 0,
                  ))
              )
                return {
                  data: { index: e, overflows: P },
                  reset: { placement: t },
                };
              let n =
                null ==
                (o = P.filter((e) => e.overflows[0] <= 0).sort(
                  (e, t) => e.overflows[1] - t.overflows[1],
                )[0])
                  ? void 0
                  : o.placement;
              if (!n)
                switch (v) {
                  case "bestFit": {
                    let e =
                      null ==
                      (l = P.filter((e) => {
                        if (C) {
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
                        : l[0];
                    e && (n = e);
                    break;
                  }
                  case "initialPlacement":
                    n = f;
                }
              if (u !== n) return { reset: { placement: n } };
            }
            return {};
          },
        }
      );
    },
    H = function (e) {
      return (
        void 0 === e && (e = {}),
        {
          name: "size",
          options: e,
          async fn(t) {
            var n, r;
            let i,
              o,
              { placement: l, rects: u, platform: a, elements: c } = t,
              { apply: f = () => {}, ...d } = (0, s.h)(e, t),
              p = await a.detectOverflow(t, d),
              g = (0, s.m)(l),
              h = (0, s.R)(l),
              m = "y" === (0, s.$)(l),
              { width: v, height: y } = u.floating;
            "top" === g || "bottom" === g
              ? ((i = g),
                (o =
                  h ===
                  ((await (null == a.isRTL ? void 0 : a.isRTL(c.floating)))
                    ? "start"
                    : "end")
                    ? "left"
                    : "right"))
              : ((o = g), (i = "end" === h ? "top" : "bottom"));
            let b = y - p.top - p.bottom,
              w = v - p.left - p.right,
              E = (0, s.u)(y - p[i], b),
              x = (0, s.u)(v - p[o], w),
              R = !t.middlewareData.shift,
              S = E,
              T = x;
            if (
              (null != (n = t.middlewareData.shift) && n.enabled.x && (T = w),
              null != (r = t.middlewareData.shift) && r.enabled.y && (S = b),
              R && !h)
            ) {
              let e = (0, s.y)(p.left, 0),
                t = (0, s.y)(p.right, 0),
                n = (0, s.y)(p.top, 0),
                r = (0, s.y)(p.bottom, 0);
              m
                ? (T =
                    v -
                    2 *
                      (0 !== e || 0 !== t ? e + t : (0, s.y)(p.left, p.right)))
                : (S =
                    y -
                    2 *
                      (0 !== n || 0 !== r ? n + r : (0, s.y)(p.top, p.bottom)));
            }
            await f({ ...t, availableWidth: T, availableHeight: S });
            let C = await a.getDimensions(c.floating);
            return v !== C.width || y !== C.height
              ? { reset: { rects: !0 } }
              : {};
          },
        }
      );
    },
    W = function (e) {
      return (
        void 0 === e && (e = {}),
        {
          name: "hide",
          options: e,
          async fn(t) {
            let { rects: n, platform: r } = t,
              { strategy: i = "referenceHidden", ...o } = (0, s.h)(e, t);
            switch (i) {
              case "referenceHidden": {
                let e = f(
                  await r.detectOverflow(t, {
                    ...o,
                    elementContext: "reference",
                  }),
                  n.reference,
                );
                return {
                  data: { referenceHiddenOffsets: e, referenceHidden: d(e) },
                };
              }
              case "escaped": {
                let e = f(
                  await r.detectOverflow(t, { ...o, altBoundary: !0 }),
                  n.floating,
                );
                return { data: { escapedOffsets: e, escaped: d(e) } };
              }
              default:
                return {};
            }
          },
        }
      );
    },
    B = (e) => ({
      name: "arrow",
      options: e,
      async fn(t) {
        let {
            x: n,
            y: r,
            placement: i,
            rects: o,
            platform: l,
            elements: u,
            middlewareData: a,
          } = t,
          { element: c, padding: f = 0 } = (0, s.h)(e, t) || {};
        if (null == c) return {};
        let d = (0, s.j)(f),
          p = { x: n, y: r },
          g = (0, s.i)(i),
          h = (0, s.T)(g),
          m = await l.getDimensions(c),
          v = "y" === g,
          y = v ? "clientHeight" : "clientWidth",
          b = o.reference[h] + o.reference[g] - p[g] - o.floating[h],
          w = p[g] - o.reference[g],
          E = await (null == l.getOffsetParent ? void 0 : l.getOffsetParent(c)),
          x = E ? E[y] : 0;
        (x && (await (null == l.isElement ? void 0 : l.isElement(E)))) ||
          (x = u.floating[y] || o.floating[h]);
        let R = x / 2 - m[h] / 2 - 1,
          S = (0, s.u)(d[v ? "top" : "left"], R),
          T = (0, s.u)(d[v ? "bottom" : "right"], R),
          C = x - m[h] - T,
          k = x / 2 - m[h] / 2 + (b / 2 - w / 2),
          O = (0, s.O)(S, k, C),
          I =
            !a.arrow &&
            null != (0, s.R)(i) &&
            k !== O &&
            o.reference[h] / 2 - (k < S ? S : T) - m[h] / 2 < 0,
          P = I ? (k < S ? k - S : k - C) : 0;
        return {
          [g]: p[g] + P,
          data: {
            [g]: O,
            centerOffset: k - O - P,
            ...(I && { alignmentOffset: P }),
          },
          reset: I,
        };
      },
    }),
    N = function (e) {
      return (
        void 0 === e && (e = {}),
        {
          options: e,
          fn(t) {
            let { x: n, y: r, placement: i, rects: o, middlewareData: l } = t,
              {
                offset: u = 0,
                mainAxis: a = !0,
                crossAxis: c = !0,
              } = (0, s.h)(e, t),
              f = { x: n, y: r },
              d = (0, s.$)(i),
              p = (0, s.J)(d),
              h = f[p],
              m = f[d],
              v = (0, s.h)(u, t),
              y =
                "number" == typeof v
                  ? { mainAxis: v, crossAxis: 0 }
                  : { mainAxis: 0, crossAxis: 0, ...v };
            if (a) {
              let e = "y" === p ? "height" : "width",
                t = o.reference[p] - o.floating[e] + y.mainAxis,
                n = o.reference[p] + o.reference[e] - y.mainAxis;
              h < t ? (h = t) : h > n && (h = n);
            }
            if (c) {
              var b, w;
              let e = "y" === p ? "width" : "height",
                t = g.has((0, s.m)(i)),
                n =
                  o.reference[d] -
                  o.floating[e] +
                  ((t && (null == (b = l.offset) ? void 0 : b[d])) || 0) +
                  (t ? 0 : y.crossAxis),
                r =
                  o.reference[d] +
                  o.reference[e] +
                  (t ? 0 : (null == (w = l.offset) ? void 0 : w[d]) || 0) -
                  (t ? y.crossAxis : 0);
              m < n ? (m = n) : m > r && (m = r);
            }
            return { [p]: h, [d]: m };
          },
        }
      );
    },
    j = (e, t, n) => {
      let r = new Map(),
        i = { platform: P, ...n },
        o = { ...i.platform, _c: r };
      return c(e, t, { ...i, platform: o });
    };
  e.s(
    [
      "P",
      0,
      B,
      "p",
      0,
      function (e) {
        return (
          void 0 === e && (e = {}),
          {
            name: "autoPlacement",
            options: e,
            async fn(t) {
              var n, r, i, o;
              let {
                  rects: l,
                  middlewareData: u,
                  placement: a,
                  platform: c,
                  elements: f,
                } = t,
                {
                  crossAxis: d = !1,
                  alignment: p,
                  allowedPlacements: g = s.Z,
                  autoAlignment: h = !0,
                  ...m
                } = (0, s.h)(e, t),
                v =
                  void 0 !== p || g === s.Z
                    ? ((o = p || null)
                        ? [
                            ...g.filter((e) => (0, s.R)(e) === o),
                            ...g.filter((e) => (0, s.R)(e) !== o),
                          ]
                        : g.filter((e) => (0, s.m)(e) === e)
                      ).filter(
                        (e) =>
                          !o || (0, s.R)(e) === o || (!!h && (0, s.o)(e) !== e),
                      )
                    : g,
                y = await c.detectOverflow(t, m),
                b = (null == (n = u.autoPlacement) ? void 0 : n.index) || 0,
                w = v[b];
              if (null == w) return {};
              let E = (0, s.N)(
                w,
                l,
                await (null == c.isRTL ? void 0 : c.isRTL(f.floating)),
              );
              if (a !== w) return { reset: { placement: v[0] } };
              let x = [y[(0, s.m)(w)], y[E[0]], y[E[1]]],
                R = [
                  ...((null == (r = u.autoPlacement) ? void 0 : r.overflows) ||
                    []),
                  { placement: w, overflows: x },
                ],
                S = v[b + 1];
              if (S)
                return {
                  data: { index: b + 1, overflows: R },
                  reset: { placement: S },
                };
              let T = R.map((e) => {
                  let t = (0, s.R)(e.placement);
                  return [
                    e.placement,
                    t && d
                      ? e.overflows.slice(0, 2).reduce((e, t) => e + t, 0)
                      : e.overflows[0],
                    e.overflows,
                  ];
                }).sort((e, t) => e[1] - t[1]),
                C =
                  (null ==
                  (i = T.filter((e) =>
                    e[2].slice(0, (0, s.R)(e[0]) ? 2 : 3).every((e) => e <= 0),
                  )[0])
                    ? void 0
                    : i[0]) || T[0][0];
              return C !== a
                ? {
                    data: { index: b + 1, overflows: R },
                    reset: { placement: C },
                  }
                : {};
            },
          }
        );
      },
      "n",
      0,
      A,
      "A",
      0,
      j,
      "x",
      0,
      D,
      "c",
      0,
      W,
      "g",
      0,
      function (e) {
        return (
          void 0 === e && (e = {}),
          {
            name: "inline",
            options: e,
            async fn(t) {
              let {
                  placement: n,
                  elements: r,
                  rects: i,
                  platform: o,
                  strategy: l,
                } = t,
                { padding: u = 2, x: a, y: c } = (0, s.h)(e, t),
                f = Array.from(
                  (await (null == o.getClientRects
                    ? void 0
                    : o.getClientRects(r.reference))) || [],
                ),
                d = (function (e) {
                  let t = e.slice().sort((e, t) => e.y - t.y),
                    n = [],
                    r = null;
                  for (let e = 0; e < t.length; e++) {
                    let i = t[e];
                    (!r || i.y - r.y > r.height / 2
                      ? n.push([i])
                      : n[n.length - 1].push(i),
                      (r = i));
                  }
                  return n.map((e) => (0, s._)(p(e)));
                })(f),
                g = (0, s._)(p(f)),
                h = (0, s.j)(u),
                m = await o.getElementRects({
                  reference: {
                    getBoundingClientRect: function () {
                      if (
                        2 === d.length &&
                        d[0].left > d[1].right &&
                        null != a &&
                        null != c
                      )
                        return (
                          d.find(
                            (e) =>
                              a > e.left - h.left &&
                              a < e.right + h.right &&
                              c > e.top - h.top &&
                              c < e.bottom + h.bottom,
                          ) || g
                        );
                      if (d.length >= 2) {
                        if ("y" === (0, s.$)(n)) {
                          let e = d[0],
                            t = d[d.length - 1],
                            r = "top" === (0, s.m)(n),
                            i = e.top,
                            o = t.bottom,
                            l = r ? e.left : t.left,
                            u = r ? e.right : t.right;
                          return {
                            top: i,
                            bottom: o,
                            left: l,
                            right: u,
                            width: u - l,
                            height: o - i,
                            x: l,
                            y: i,
                          };
                        }
                        let e = "left" === (0, s.m)(n),
                          t = (0, s.y)(...d.map((e) => e.right)),
                          r = (0, s.u)(...d.map((e) => e.left)),
                          i = d.filter((n) =>
                            e ? n.left === r : n.right === t,
                          ),
                          o = i[0].top,
                          l = i[i.length - 1].bottom;
                        return {
                          top: o,
                          bottom: l,
                          left: r,
                          right: t,
                          width: t - r,
                          height: l - o,
                          x: r,
                          y: o,
                        };
                      }
                      return g;
                    },
                  },
                  floating: r.floating,
                  strategy: l,
                });
              return i.reference.x !== m.reference.x ||
                i.reference.y !== m.reference.y ||
                i.reference.width !== m.reference.width ||
                i.reference.height !== m.reference.height
                ? { reset: { rects: m } }
                : {};
            },
          }
        );
      },
      "o",
      0,
      N,
      "T",
      0,
      L,
      "e",
      0,
      $,
      "q",
      0,
      H,
    ],
    278928,
  );
  var F = e.i(231332),
    V = "u" > typeof document ? t.useLayoutEffect : function () {};
  function _(e, t) {
    let n, r, i;
    if (e === t) return !0;
    if (typeof e != typeof t) return !1;
    if ("function" == typeof e && e.toString() === t.toString()) return !0;
    if (e && t && "object" == typeof e) {
      if (Array.isArray(e)) {
        if ((n = e.length) !== t.length) return !1;
        for (r = n; 0 != r--; ) if (!_(e[r], t[r])) return !1;
        return !0;
      }
      if ((n = (i = Object.keys(e)).length) !== Object.keys(t).length)
        return !1;
      for (r = n; 0 != r--; ) if (!{}.hasOwnProperty.call(t, i[r])) return !1;
      for (r = n; 0 != r--; ) {
        let n = i[r];
        if (("_owner" !== n || !e.$$typeof) && !_(e[n], t[n])) return !1;
      }
      return !0;
    }
    return e != e && t != t;
  }
  function U(e) {
    return "u" < typeof window
      ? 1
      : (e.ownerDocument.defaultView || window).devicePixelRatio || 1;
  }
  function z(e, t) {
    let n = U(e);
    return Math.round(t * n) / n;
  }
  function q(e) {
    let n = t.useRef(e);
    return (
      V(() => {
        n.current = e;
      }),
      n
    );
  }
  function X(e) {
    void 0 === e && (e = {});
    let {
        placement: n = "bottom",
        strategy: r = "absolute",
        middleware: i = [],
        platform: o,
        elements: { reference: l, floating: s } = {},
        transform: u = !0,
        whileElementsMounted: a,
        open: c,
      } = e,
      [f, d] = t.useState({
        x: 0,
        y: 0,
        strategy: r,
        placement: n,
        middlewareData: {},
        isPositioned: !1,
      }),
      [p, g] = t.useState(i);
    _(p, i) || g(i);
    let [h, m] = t.useState(null),
      [v, y] = t.useState(null),
      b = t.useCallback((e) => {
        e !== R.current && ((R.current = e), m(e));
      }, []),
      w = t.useCallback((e) => {
        e !== S.current && ((S.current = e), y(e));
      }, []),
      E = l || h,
      x = s || v,
      R = t.useRef(null),
      S = t.useRef(null),
      T = t.useRef(f),
      C = null != a,
      k = q(a),
      O = q(o),
      I = q(c),
      P = t.useCallback(() => {
        if (!R.current || !S.current) return;
        let e = { placement: n, strategy: r, middleware: p };
        (O.current && (e.platform = O.current),
          j(R.current, S.current, e).then((e) => {
            let t = { ...e, isPositioned: !1 !== I.current };
            M.current &&
              !_(T.current, t) &&
              ((T.current = t),
              F.flushSync(() => {
                d(t);
              }));
          }));
      }, [p, n, r, O, I]);
    V(() => {
      !1 === c &&
        T.current.isPositioned &&
        ((T.current.isPositioned = !1), d((e) => ({ ...e, isPositioned: !1 })));
    }, [c]);
    let M = t.useRef(!1);
    (V(
      () => (
        (M.current = !0),
        () => {
          M.current = !1;
        }
      ),
      [],
    ),
      V(() => {
        if ((E && (R.current = E), x && (S.current = x), E && x)) {
          if (k.current) return k.current(E, x, P);
          P();
        }
      }, [E, x, P, k, C]));
    let A = t.useMemo(
        () => ({ reference: R, floating: S, setReference: b, setFloating: w }),
        [b, w],
      ),
      L = t.useMemo(() => ({ reference: E, floating: x }), [E, x]),
      $ = t.useMemo(() => {
        let e = { position: r, left: 0, top: 0 };
        if (!L.floating) return e;
        let t = z(L.floating, f.x),
          n = z(L.floating, f.y);
        return u
          ? {
              ...e,
              transform: "translate(" + t + "px, " + n + "px)",
              ...(U(L.floating) >= 1.5 && { willChange: "transform" }),
            }
          : { position: r, left: t, top: n };
      }, [r, u, L.floating, f.x, f.y]);
    return t.useMemo(
      () => ({ ...f, update: P, refs: A, elements: L, floatingStyles: $ }),
      [f, P, A, L, $],
    );
  }
  let Y = (e, t) => {
      let n = L(e);
      return { name: n.name, fn: n.fn, options: [e, t] };
    },
    K = (e, t) => {
      let n = $(e);
      return { name: n.name, fn: n.fn, options: [e, t] };
    },
    G = (e, t) => ({ fn: N(e).fn, options: [e, t] }),
    Z = (e, t) => {
      let n = D(e);
      return { name: n.name, fn: n.fn, options: [e, t] };
    },
    J = (e, t) => {
      let n = H(e);
      return { name: n.name, fn: n.fn, options: [e, t] };
    },
    Q = (e, t) => {
      let n = W(e);
      return { name: n.name, fn: n.fn, options: [e, t] };
    };
  e.s(
    [
      "P",
      0,
      (e, t) => {
        let n = {
          name: "arrow",
          options: e,
          fn(t) {
            let { element: n, padding: r } = "function" == typeof e ? e(t) : e;
            return n && {}.hasOwnProperty.call(n, "current")
              ? null != n.current
                ? B({ element: n.current, padding: r }).fn(t)
                : {}
              : n
                ? B({ element: n, padding: r }).fn(t)
                : {};
          },
        };
        return { name: n.name, fn: n.fn, options: [e, t] };
      },
      "x",
      0,
      Z,
      "c",
      0,
      Q,
      "n",
      0,
      G,
      "T",
      0,
      Y,
      "e",
      0,
      K,
      "o",
      0,
      J,
      "E",
      0,
      X,
    ],
    579510,
  );
  var ee = e.i(92615),
    et = e.i(656522),
    en = e.i(761806),
    er = e.i(303232),
    ei = e.i(950161),
    eo = e.i(340607),
    el = e.i(378317);
  let es = {
    name: "hide",
    async fn(e) {
      let { width: t, height: n, x: r, y: i } = e.rects.reference,
        o = await Q().fn(e);
      return {
        data: {
          referenceHidden:
            o.data?.referenceHidden ||
            (0 === t && 0 === n && 0 === r && 0 === i),
        },
      };
    },
  };
  var eu = e.i(285182);
  let ea = { sideX: "left", sideY: "top" };
  function ec(e, t, n) {
    let r = "inline-start" === e || "inline-end" === e;
    return {
      top: "top",
      right: r ? (n ? "inline-start" : "inline-end") : "right",
      bottom: "bottom",
      left: r ? (n ? "inline-end" : "inline-start") : "left",
    }[t];
  }
  function ef(e, t, r) {
    let { rects: i, placement: o } = e;
    return {
      side: ec(t, (0, n.m)(o), r),
      align: (0, n.R)(o) || "center",
      anchor: { width: i.reference.width, height: i.reference.height },
      positioner: { width: i.floating.width, height: i.floating.height },
    };
  }
  function ed(e) {
    return null != e && "current" in e;
  }
  (e.s(
    [
      "x",
      0,
      ea,
      "e",
      0,
      {
        name: "adaptiveOrigin",
        async fn(e) {
          let {
              x: t,
              y: i,
              rects: { floating: o },
              elements: { floating: l },
              platform: s,
              strategy: u,
              placement: a,
            } = e,
            c = (0, eu.f)(l),
            f = c.getComputedStyle(l);
          if ("0s" === f.transitionDuration || "" === f.transitionDuration)
            return { x: t, y: i, data: ea };
          let d = await s.getOffsetParent?.(l),
            p = { width: 0, height: 0 };
          if ("fixed" === u && c?.visualViewport)
            p = {
              width: c.visualViewport.width,
              height: c.visualViewport.height,
            };
          else if (d === c) {
            let e = (0, r.f)(l);
            p = {
              width: e.documentElement.clientWidth,
              height: e.documentElement.clientHeight,
            };
          } else (await s.isElement?.(d)) && (p = await s.getDimensions(d));
          let g = (0, n.m)(a),
            h = t,
            m = i;
          return (
            "left" === g && (h = p.width - (t + o.width)),
            "top" === g && (m = p.height - (i + o.height)),
            {
              x: h,
              y: m,
              data: {
                sideX: "left" === g ? "right" : ea.sideX,
                sideY: "top" === g ? "bottom" : ea.sideY,
              },
            }
          );
        },
      },
    ],
    996971,
  ),
    e.s(
      [
        "f",
        0,
        function (e) {
          var s, u;
          let {
              anchor: a,
              positionMethod: c = "absolute",
              side: f = "bottom",
              sideOffset: d = 0,
              align: p = "center",
              alignOffset: g = 0,
              collisionBoundary: h,
              collisionPadding: m = 5,
              sticky: v = !1,
              arrowPadding: y = 5,
              disableAnchorTracking: b = !1,
              keepMounted: w = !1,
              floatingRootContext: E,
              mounted: x,
              collisionAvoidance: R,
              shiftCrossAxis: S = !1,
              nodeId: T,
              adaptiveOrigin: C,
              lazyFlip: k = !1,
              externalTree: O,
            } = e,
            [I, P] = t.useState(null);
          x || null === I || P(null);
          let M = R.side || "flip",
            L = R.align || "flip",
            $ = R.fallbackAxisSide || "end",
            D = "function" == typeof a ? a : void 0,
            H = (0, l.f)(D),
            W = D ? H : a,
            B = (0, o.f)(a),
            N = "rtl" === (0, el.f)(),
            j =
              I ||
              {
                top: "top",
                right: "right",
                bottom: "bottom",
                left: "left",
                "inline-end": N ? "left" : "right",
                "inline-start": N ? "right" : "left",
              }[f],
            F = "center" === p ? j : `${j}-${p}`,
            V = m,
            _ = +("bottom" === f),
            U = +("top" === f),
            z = +("right" === f),
            q = +("left" === f);
          "number" == typeof V
            ? (V = { top: V + _, right: V + q, bottom: V + U, left: V + z })
            : V &&
              (V = {
                top: (V.top || 0) + _,
                right: (V.right || 0) + q,
                bottom: (V.bottom || 0) + U,
                left: (V.left || 0) + z,
              });
          let Q = {
              boundary: "clipping-ancestors" === h ? "clippingAncestors" : h,
              padding: V,
            },
            eu = t.useRef(null),
            ep = (0, o.f)(d),
            eg = (0, o.f)(g),
            eh = [
              Y(
                (e) => {
                  let t = ef(e, f, N),
                    n =
                      "function" == typeof ep.current
                        ? ep.current(t)
                        : ep.current,
                    r =
                      "function" == typeof eg.current
                        ? eg.current(t)
                        : eg.current;
                  return { mainAxis: n, crossAxis: r, alignmentAxis: r };
                },
                [
                  "function" != typeof d ? d : 0,
                  "function" != typeof g ? g : 0,
                  N,
                  f,
                ],
              ),
            ],
            em = "none" === L && "shift" !== M,
            ev = !em && (v || S || "shift" === M),
            ey =
              "none" === M
                ? null
                : Z({
                    ...Q,
                    padding: {
                      top: V.top + 1,
                      right: V.right + 1,
                      bottom: V.bottom + 1,
                      left: V.left + 1,
                    },
                    mainAxis: !S && "flip" === M,
                    crossAxis: "flip" === L && "alignment",
                    fallbackAxisSideDirection: $,
                  }),
            eb = em
              ? null
              : K(
                  (e) => {
                    let t = (0, r.f)(e.elements.floating).documentElement;
                    return {
                      ...Q,
                      rootBoundary: S
                        ? {
                            x: 0,
                            y: 0,
                            width: t.clientWidth,
                            height: t.clientHeight,
                          }
                        : void 0,
                      mainAxis: "none" !== L,
                      crossAxis: ev,
                      limiter:
                        v || S
                          ? void 0
                          : G((e) => {
                              if (!eu.current) return {};
                              let { width: t, height: r } =
                                  eu.current.getBoundingClientRect(),
                                i = (0, n.$)((0, n.m)(e.placement)),
                                o =
                                  "y" === i
                                    ? V.left + V.right
                                    : V.top + V.bottom;
                              return {
                                offset: ("y" === i ? t : r) / 2 + o / 2,
                              };
                            }),
                    };
                  },
                  [Q, v, S, V, L],
                );
          ("shift" === M || "shift" === L || "center" === p
            ? eh.push(eb, ey)
            : eh.push(ey, eb),
            eh.push(
              J({
                ...Q,
                apply({
                  elements: { floating: e },
                  availableWidth: t,
                  availableHeight: n,
                  rects: r,
                }) {
                  let i = e.style;
                  (i.setProperty("--available-width", `${t}px`),
                    i.setProperty("--available-height", `${n}px`));
                  let o = window.devicePixelRatio || 1,
                    { x: l, y: s, width: u, height: a } = r.reference,
                    c = (Math.round((l + u) * o) - Math.round(l * o)) / o,
                    f = (Math.round((s + a) * o) - Math.round(s * o)) / o;
                  (i.setProperty("--anchor-width", `${c}px`),
                    i.setProperty("--anchor-height", `${f}px`));
                },
              }),
              ((s = () => ({
                element: eu.current || document.createElement("div"),
                padding: y,
                offsetParent: "floating",
              })),
              (u = [y]),
              {
                ...{
                  name: "arrow",
                  options: s,
                  async fn(e) {
                    let {
                        x: t,
                        y: r,
                        placement: i,
                        rects: o,
                        platform: l,
                        elements: u,
                        middlewareData: a,
                      } = e,
                      {
                        element: c,
                        padding: f = 0,
                        offsetParent: d = "real",
                      } = (0, n.h)(s, e) || {};
                    if (null == c) return {};
                    let p = (0, n.j)(f),
                      g = { x: t, y: r },
                      h = (0, n.i)(i),
                      m = (0, n.T)(h),
                      v = await l.getDimensions(c),
                      y = "y" === h,
                      b = y ? "clientHeight" : "clientWidth",
                      w =
                        o.reference[m] + o.reference[h] - g[h] - o.floating[m],
                      E = g[h] - o.reference[h],
                      x =
                        "real" === d
                          ? await l.getOffsetParent?.(c)
                          : u.floating,
                      R = u.floating[b] || o.floating[m];
                    (R && (await l.isElement?.(x))) ||
                      (R = u.floating[b] || o.floating[m]);
                    let S = R / 2 - v[m] / 2 - 1,
                      T = Math.min(p[y ? "top" : "left"], S),
                      C = Math.min(p[y ? "bottom" : "right"], S),
                      k = R - v[m] - C,
                      O = R / 2 - v[m] / 2 + (w / 2 - E / 2),
                      I = (0, n.O)(T, O, k),
                      P =
                        !a.arrow &&
                        null != (0, n.R)(i) &&
                        O !== I &&
                        o.reference[m] / 2 - (O < T ? T : C) - v[m] / 2 < 0,
                      M = P ? (O < T ? O - T : O - k) : 0;
                    return {
                      [h]: g[h] + M,
                      data: {
                        [h]: I,
                        centerOffset: O - I - M,
                        ...(P && { alignmentOffset: M }),
                      },
                      reset: P,
                    };
                  },
                },
                options: [s, u],
              }),
              {
                name: "transformOrigin",
                fn(e) {
                  let {
                      elements: t,
                      middlewareData: r,
                      placement: i,
                      rects: o,
                      y: l,
                    } = e,
                    s = (0, n.m)(i),
                    u = (0, n.$)(s),
                    a = eu.current,
                    c = r.arrow?.x || 0,
                    p = r.arrow?.y || 0,
                    g = a?.clientWidth || 0,
                    h = a?.clientHeight || 0,
                    m = c + g / 2,
                    v = p + h / 2,
                    y = Math.abs(r.shift?.y || 0),
                    b = o.reference.height / 2,
                    w = "function" == typeof d ? d(ef(e, f, N)) : d,
                    E = y > w,
                    x = {
                      top: `${m}px calc(100% + ${w}px)`,
                      bottom: `${m}px ${-w}px`,
                      left: `calc(100% + ${w}px) ${v}px`,
                      right: `${-w}px ${v}px`,
                    }[s],
                    R = `${m}px ${o.reference.y + b - l}px`;
                  return (
                    t.floating.style.setProperty(
                      "--transform-origin",
                      ev && "y" === u && E ? R : x,
                    ),
                    {}
                  );
                },
              },
              es,
              C,
            ),
            (0, i.f)(() => {
              !x &&
                E &&
                E.update({
                  referenceElement: null,
                  floatingElement: null,
                  domReferenceElement: null,
                });
            }, [x, E]));
          let ew = t.useMemo(
              () => ({
                elementResize: !b && "u" > typeof ResizeObserver,
                layoutShift: !b && "u" > typeof IntersectionObserver,
              }),
              [b],
            ),
            {
              refs: eE,
              elements: ex,
              x: eR,
              y: eS,
              middlewareData: eT,
              update: eC,
              placement: ek,
              context: eO,
              isPositioned: eI,
              floatingStyles: eP,
            } = (function (e = {}) {
              let { nodeId: n, externalTree: r } = e,
                o = (function (e) {
                  let { open: t = !1, onOpenChange: n, elements: r = {} } = e,
                    o = (0, en.f)(),
                    l = null != (0, et.G)(),
                    s = (0, er.f)(
                      () =>
                        new ei.f({
                          open: t,
                          onOpenChange: n,
                          referenceElement: r.reference ?? null,
                          floatingElement: r.floating ?? null,
                          triggerElements: new eo.f(),
                          floatingId: o,
                          nested: l,
                          noEmit: !1,
                        }),
                    ).current;
                  return (
                    (0, i.f)(() => {
                      let e = { open: t, floatingId: o };
                      (void 0 !== r.reference &&
                        ((e.referenceElement = r.reference),
                        (e.domReferenceElement = (0, ee.m)(r.reference)
                          ? r.reference
                          : null)),
                        void 0 !== r.floating &&
                          (e.floatingElement = r.floating),
                        s.update(e));
                    }, [t, o, r.reference, r.floating, s]),
                    (s.context.onOpenChange = n),
                    (s.context.nested = l),
                    (s.context.noEmit = !1),
                    s
                  );
                })(e),
                l = e.rootContext || o,
                s = {
                  reference: l.useState("referenceElement"),
                  floating: l.useState("floatingElement"),
                  domReference: l.useState("domReferenceElement"),
                },
                [u, a] = t.useState(null),
                c = t.useRef(null),
                f = (0, et.$)(r);
              (0, i.f)(() => {
                s.domReference && (c.current = s.domReference);
              }, [s.domReference]);
              let d = X({
                  ...e,
                  elements: { ...s, ...(u && { reference: u }) },
                }),
                p = t.useCallback(
                  (e) => {
                    let t = (0, ee.m)(e)
                      ? {
                          getBoundingClientRect: () =>
                            e.getBoundingClientRect(),
                          getClientRects: () => e.getClientRects(),
                          contextElement: e,
                        }
                      : e;
                    (a(t), d.refs.setReference(t));
                  },
                  [d.refs],
                ),
                [g, h] = t.useState(null),
                [m, v] = t.useState(null);
              (l.useSyncedValue("referenceElement", g),
                l.useSyncedValue(
                  "domReferenceElement",
                  (0, ee.m)(g) ? g : null,
                ),
                l.useSyncedValue("floatingElement", m));
              let y = t.useCallback(
                  (e) => {
                    (((0, ee.m)(e) || null === e) && ((c.current = e), h(e)),
                      ((0, ee.m)(d.refs.reference.current) ||
                        null === d.refs.reference.current ||
                        (null !== e && !(0, ee.m)(e))) &&
                        d.refs.setReference(e));
                  },
                  [d.refs, h],
                ),
                b = t.useCallback(
                  (e) => {
                    (v(e), d.refs.setFloating(e));
                  },
                  [d.refs],
                ),
                w = t.useMemo(
                  () => ({
                    ...d.refs,
                    setReference: y,
                    setFloating: b,
                    setPositionReference: p,
                    domReference: c,
                  }),
                  [d.refs, y, b, p],
                ),
                E = t.useMemo(
                  () => ({ ...d.elements, domReference: s.domReference }),
                  [d.elements, s.domReference],
                ),
                x = l.useState("open"),
                R = l.useState("floatingId"),
                S = t.useMemo(
                  () => ({
                    ...d,
                    dataRef: l.context.dataRef,
                    open: x,
                    onOpenChange: l.setOpen,
                    events: l.context.events,
                    floatingId: R,
                    refs: w,
                    elements: E,
                    nodeId: n,
                    rootStore: l,
                  }),
                  [d, w, E, n, l, x, R],
                );
              return (
                (0, i.f)(() => {
                  l.context.dataRef.current.floatingContext = S;
                  let e = f?.nodesRef.current.find((e) => e.id === n);
                  e && (e.context = S);
                }),
                t.useMemo(
                  () => ({
                    ...d,
                    context: S,
                    refs: w,
                    elements: E,
                    rootStore: l,
                  }),
                  [d, w, E, S, l],
                )
              );
            })({
              rootContext: E,
              placement: F,
              middleware: eh,
              strategy: c,
              whileElementsMounted: w ? void 0 : (...e) => A(...e, ew),
              nodeId: T,
              externalTree: O,
            }),
            { sideX: eM, sideY: eA } = eT.adaptiveOrigin || ea,
            eL = eI ? c : "fixed",
            e$ = t.useMemo(() => {
              let e = C
                ? { position: eL, [eM]: eR, [eA]: eS }
                : { position: eL, ...eP };
              return (eI || (e.opacity = 0), e);
            }, [C, eL, eM, eR, eA, eS, eP, eI]),
            eD = t.useRef(null);
          ((0, i.f)(() => {
            if (!x) return;
            let e = B.current,
              t = "function" == typeof e ? e() : e,
              n = (ed(t) ? t.current : t) || null;
            n !== eD.current && (eE.setPositionReference(n), (eD.current = n));
          }, [x, eE, W, B]),
            t.useEffect(() => {
              if (!x) return;
              let e = B.current;
              "function" != typeof e &&
                ed(e) &&
                e.current !== eD.current &&
                (eE.setPositionReference(e.current), (eD.current = e.current));
            }, [x, eE, W, B]),
            t.useEffect(() => {
              if (w && x && ex.domReference && ex.floating)
                return A(ex.domReference, ex.floating, eC, ew);
            }, [w, x, ex, eC, ew]));
          let eH = (0, n.m)(ek),
            eW = ec(f, eH, N),
            eB = (0, n.R)(ek) || "center",
            eN = !!eT.hide?.referenceHidden;
          (0, i.f)(() => {
            k && x && eI && P(eH);
          }, [k, x, eI, eH]);
          let ej = t.useMemo(
              () => ({
                position: "absolute",
                top: eT.arrow?.y,
                left: eT.arrow?.x,
              }),
              [eT.arrow],
            ),
            eF = eT.arrow?.centerOffset !== 0;
          return t.useMemo(
            () => ({
              positionerStyles: e$,
              arrowStyles: ej,
              arrowRef: eu,
              arrowUncentered: eF,
              side: eW,
              align: eB,
              physicalSide: eH,
              anchorHidden: eN,
              refs: eE,
              context: eO,
              isPositioned: eI,
              update: eC,
            }),
            [e$, ej, eu, eF, eW, eB, eH, eN, eE, eO, eI, eC],
          );
        },
      ],
      257311,
    ));
};
