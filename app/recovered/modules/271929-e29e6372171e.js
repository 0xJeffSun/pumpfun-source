// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(t) => {
  function e(t) {
    let e;
    return () => (void 0 === e && (e = t()), e);
  }
  (t.s(
    [
      "f",
      0,
      function (t, e, i) {
        e.startsWith("--") ? t.style.setProperty(e, i) : (t.style[e] = i);
      },
    ],
    271929,
  ),
    t.s(["f", 0, e], 761866));
  let i = {};
  function s(t, s) {
    let r = e(t);
    return () => i[s] ?? r();
  }
  t.s(["f", 0, s], 99860);
  let r = s(() => void 0 !== window.ScrollTimeline, "scrollTimeline");
  t.s(["f", 0, r], 475796);
};
