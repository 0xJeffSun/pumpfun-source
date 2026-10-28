// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  let t = "pending-logout";
  function n() {
    try {
      return "1" === localStorage.getItem(t);
    } catch {
      return !1;
    }
  }
  function i(e) {
    try {
      e ? localStorage.setItem(t, "1") : localStorage.removeItem(t);
    } catch {}
  }
  let r = n();
  function a() {
    return r || n();
  }
  e.s([
    "P",
    0,
    function () {
      return !!a() && ((r = !1), i(!1), !0);
    },
    "g",
    0,
    a,
    "c",
    0,
    function () {
      ((r = !0), i(!0));
    },
  ]);
};
