// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  let t;
  function n() {
    return "u" > typeof window;
  }
  function r(e) {
    return o(e) ? (e.nodeName || "").toLowerCase() : "#document";
  }
  function i(e) {
    var t;
    return (
      (null == e || null == (t = e.ownerDocument) ? void 0 : t.defaultView) ||
      window
    );
  }
  function o(e) {
    return !!n() && (e instanceof Node || e instanceof i(e).Node);
  }
  function l(e) {
    return (
      !(!n() || "u" < typeof ShadowRoot) &&
      (e instanceof ShadowRoot || e instanceof i(e).ShadowRoot)
    );
  }
  function s(e) {
    return i(e).getComputedStyle(e);
  }
  e.s([
    "X",
    0,
    s,
    "A",
    0,
    r,
    "I",
    0,
    function (e) {
      var t;
      if ("html" === r(e)) return e;
      let n =
        e.assignedSlot ||
        e.parentNode ||
        (l(e) && e.host) ||
        (null == (t = (o(e) ? e.ownerDocument : e.document) || window.document)
          ? void 0
          : t.documentElement);
      return l(n) ? n.host : n;
    },
    "J",
    0,
    i,
    "m",
    0,
    function (e) {
      return !!n() && (e instanceof Element || e instanceof i(e).Element);
    },
    "E",
    0,
    function (e) {
      return (
        !!n() && (e instanceof HTMLElement || e instanceof i(e).HTMLElement)
      );
    },
    "Z",
    0,
    function (e) {
      return /^(html|body|#document)$/.test(r(e));
    },
    "t",
    0,
    o,
    "B",
    0,
    function (e) {
      let { overflow: t, overflowX: n, overflowY: r, display: i } = s(e);
      return (
        /auto|scroll|overlay|hidden|clip/.test(t + r + n) &&
        "inline" !== i &&
        "contents" !== i
      );
    },
    "R",
    0,
    l,
    "i",
    0,
    function () {
      return (
        null == t &&
          (t =
            "u" > typeof CSS &&
            CSS.supports &&
            CSS.supports("-webkit-backdrop-filter", "none")),
        t
      );
    },
  ]);
};
