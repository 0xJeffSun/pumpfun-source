// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e, t, r) => {
  (e.i(149502), Object.defineProperty(r, "__esModule", { value: !0 }));
  var n = {
    handleHardNavError: function () {
      return a;
    },
    useNavFailureHandler: function () {
      return l;
    },
  };
  for (var o in n) Object.defineProperty(r, o, { enumerable: !0, get: n[o] });
  e.r(352386);
  let i = e.r(790661);
  function a(e) {
    return (
      "u" > typeof window &&
      !!window.next.__pendingUrl &&
      (0, i.createHrefFromUrl)(new URL(window.location.href)) !==
        (0, i.createHrefFromUrl)(window.next.__pendingUrl) &&
      (console.error(
        "Error occurred during navigation, falling back to hard navigation",
        e,
      ),
      (window.location.href = window.next.__pendingUrl.toString()),
      !0)
    );
  }
  function l() {}
  ("function" == typeof r.default ||
    ("object" == typeof r.default && null !== r.default)) &&
    void 0 === r.default.__esModule &&
    (Object.defineProperty(r.default, "__esModule", { value: !0 }),
    Object.assign(r.default, r),
    (t.exports = r.default));
};
