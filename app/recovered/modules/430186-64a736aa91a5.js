// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(92615),
    n = e.i(234006),
    r = e.i(839854);
  function i(e, n) {
    if (!e || !n) return !1;
    let r = n.getRootNode?.();
    if (e.contains(n)) return !0;
    if (r && (0, t.R)(r)) {
      let t = n;
      for (; t; ) {
        if (e === t) return !0;
        t = t.parentNode || t.host;
      }
    }
    return !1;
  }
  function o(e) {
    return (0, t.E)(e) && e.matches(r.n);
  }
  e.s([
    "T",
    0,
    function (e) {
      let t = e.activeElement;
      for (; t?.shadowRoot?.activeElement != null; )
        t = t.shadowRoot.activeElement;
      return t;
    },
    "I",
    0,
    i,
    "G",
    0,
    function (e) {
      return e
        ? e.hasAttribute(r.Q)
          ? e
          : e.querySelector(`[${r.Q}]`) || e
        : null;
    },
    "Z",
    0,
    function (e) {
      return "composedPath" in e ? e.composedPath()[0] : e.target;
    },
    "V",
    0,
    function (e, t) {
      return (
        null != t &&
        ("composedPath" in e
          ? e.composedPath().includes(t)
          : null != e.target && t.contains(e.target))
      );
    },
    "W",
    0,
    function (e) {
      return e.matches("html,body");
    },
    "x",
    0,
    function (e, n) {
      if (!(0, t.m)(e)) return !1;
      if (n.hasElement(e)) return !e.hasAttribute("data-trigger-disabled");
      for (let [, t] of n.entries())
        if (i(t, e)) return !t.hasAttribute("data-trigger-disabled");
      return !1;
    },
    "J",
    0,
    function (e) {
      return !!e && "combobox" === e.getAttribute("role") && o(e);
    },
    "Q",
    0,
    o,
    "F",
    0,
    function (e) {
      if (!e || n.S) return !0;
      try {
        return e.matches(":focus-visible");
      } catch (e) {
        return !0;
      }
    },
  ]);
};
