// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  let t = "u" > typeof navigator,
    n = (function () {
      if (!t) return { platform: "", maxTouchPoints: -1 };
      let e = navigator.userAgentData;
      return e?.platform
        ? { platform: e.platform, maxTouchPoints: navigator.maxTouchPoints }
        : {
            platform: navigator.platform ?? "",
            maxTouchPoints: navigator.maxTouchPoints ?? -1,
          };
    })(),
    r = (function () {
      if (!t) return "";
      let e = navigator.userAgentData;
      return e?.platform ? e.platform : (navigator.platform ?? "");
    })(),
    i = (function () {
      if (!t) return "";
      let e = navigator.userAgentData;
      return e && Array.isArray(e.brands)
        ? e.brands.map(({ brand: e, version: t }) => `${e}/${t}`).join(" ")
        : navigator.userAgent;
    })(),
    o =
      "u" > typeof CSS &&
      !!CSS.supports &&
      CSS.supports("-webkit-backdrop-filter:none"),
    l =
      ("MacIntel" === n.platform && n.maxTouchPoints > 1) ||
      /iP(hone|ad|od)|iOS/.test(n.platform);
  t && /firefox/i.test(i);
  let s = t && /apple/i.test(navigator.vendor);
  t && /Edg/i.test(i);
  let u = (t && /android/i.test(r)) || /android/i.test(i),
    a = t && r.toLowerCase().startsWith("mac") && !navigator.maxTouchPoints,
    c = i.includes("jsdom/");
  e.s(["B", 0, u, "I", 0, l, "S", 0, c, "F", 0, a, "G", 0, s, "i", 0, o]);
};
