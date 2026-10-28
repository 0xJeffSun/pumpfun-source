// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e, t, r) => {
  (Object.defineProperty(r, "__esModule", { value: !0 }),
    Object.defineProperty(r, "setAttributesFromProps", {
      enumerable: !0,
      get: function () {
        return a;
      },
    }));
  let n = {
      acceptCharset: "accept-charset",
      className: "class",
      htmlFor: "for",
      httpEquiv: "http-equiv",
      noModule: "noModule",
    },
    o = [
      "onLoad",
      "onReady",
      "dangerouslySetInnerHTML",
      "children",
      "onError",
      "strategy",
      "stylesheets",
    ];
  function i(e) {
    return ["async", "defer", "noModule"].includes(e);
  }
  function a(e, t) {
    for (let [r, a] of Object.entries(t)) {
      if (!t.hasOwnProperty(r) || o.includes(r) || void 0 === a) continue;
      let l = n[r] || r.toLowerCase();
      ("SCRIPT" === e.tagName && i(l)
        ? (e[l] = !!a)
        : e.setAttribute(l, String(a)),
        (!1 === a ||
          ("SCRIPT" === e.tagName && i(l) && (!a || "false" === a))) &&
          (e.setAttribute(l, ""), e.removeAttribute(l)));
    }
  }
  ("function" == typeof r.default ||
    ("object" == typeof r.default && null !== r.default)) &&
    void 0 === r.default.__esModule &&
    (Object.defineProperty(r.default, "__esModule", { value: !0 }),
    Object.assign(r.default, r),
    (t.exports = r.default));
};
