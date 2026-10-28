// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(t) => {
  let e;
  function r() {
    return "u" > typeof window;
  }
  function o(t) {
    return s(t) ? (t.nodeName || "").toLowerCase() : "#document";
  }
  function n(t) {
    var e;
    return (
      (null == t || null == (e = t.ownerDocument) ? void 0 : e.defaultView) ||
      window
    );
  }
  function i(t) {
    var e;
    return null ==
      (e = (s(t) ? t.ownerDocument : t.document) || window.document)
      ? void 0
      : e.documentElement;
  }
  function s(t) {
    return !!r() && (t instanceof Node || t instanceof n(t).Node);
  }
  function a(t) {
    return !!r() && (t instanceof Element || t instanceof n(t).Element);
  }
  function l(t) {
    return !!r() && (t instanceof HTMLElement || t instanceof n(t).HTMLElement);
  }
  function u(t) {
    return (
      !(!r() || "u" < typeof ShadowRoot) &&
      (t instanceof ShadowRoot || t instanceof n(t).ShadowRoot)
    );
  }
  function c(t) {
    let { overflow: e, overflowX: r, overflowY: o, display: n } = b(t);
    return (
      /auto|scroll|overlay|hidden|clip/.test(e + o + r) &&
      "inline" !== n &&
      "contents" !== n
    );
  }
  function f(t) {
    try {
      if (t.matches(":popover-open")) return !0;
    } catch (t) {}
    try {
      return t.matches(":modal");
    } catch (t) {
      return !1;
    }
  }
  let h = /transform|translate|scale|rotate|perspective|filter/,
    p = /paint|layout|strict|content/,
    d = (t) => !!t && "none" !== t;
  function y(t) {
    let e = a(t) ? b(t) : t;
    return (
      d(e.transform) ||
      d(e.translate) ||
      d(e.scale) ||
      d(e.rotate) ||
      d(e.perspective) ||
      (!m() && (d(e.backdropFilter) || d(e.filter))) ||
      h.test(e.willChange || "") ||
      p.test(e.contain || "")
    );
  }
  function m() {
    return (
      null == e &&
        (e =
          "u" > typeof CSS &&
          CSS.supports &&
          CSS.supports("-webkit-backdrop-filter", "none")),
      e
    );
  }
  function g(t) {
    return /^(html|body|#document)$/.test(o(t));
  }
  function b(t) {
    return n(t).getComputedStyle(t);
  }
  function w(t) {
    if ("html" === o(t)) return t;
    let e = t.assignedSlot || t.parentNode || (u(t) && t.host) || i(t);
    return u(e) ? e.host : e;
  }
  function v(t) {
    return t.parent && Object.getPrototypeOf(t.parent) ? t.frameElement : null;
  }
  t.s([
    "X",
    0,
    b,
    "f",
    0,
    function (t) {
      let e = w(t);
      for (; l(e) && !g(e); ) {
        if (y(e)) return e;
        if (f(e)) break;
        e = w(e);
      }
      return null;
    },
    "I",
    0,
    i,
    "w",
    0,
    v,
    "A",
    0,
    o,
    "Q",
    0,
    function (t) {
      return a(t)
        ? { scrollLeft: t.scrollLeft, scrollTop: t.scrollTop }
        : { scrollLeft: t.scrollX, scrollTop: t.scrollY };
    },
    "G",
    0,
    function t(e, r, o) {
      var i;
      (void 0 === r && (r = []), void 0 === o && (o = !0));
      let s = (function t(e) {
          let r = w(e);
          return g(r) ? (e.ownerDocument || e).body : l(r) && c(r) ? r : t(r);
        })(e),
        a = s === (null == (i = e.ownerDocument) ? void 0 : i.body),
        u = n(s);
      if (!a) return r.concat(s, t(s, [], o));
      {
        let e = v(u);
        return r.concat(
          u,
          u.visualViewport || [],
          c(s) ? s : [],
          e && o ? t(e) : [],
        );
      }
    },
    "J",
    0,
    w,
    "K",
    0,
    n,
    "e",
    0,
    y,
    "m",
    0,
    a,
    "E",
    0,
    l,
    "Z",
    0,
    g,
    "t",
    0,
    s,
    "B",
    0,
    c,
    "R",
    0,
    u,
    "S",
    0,
    function (t) {
      return /^(table|td|th)$/.test(o(t));
    },
    "D",
    0,
    f,
    "i",
    0,
    m,
  ]);
};
