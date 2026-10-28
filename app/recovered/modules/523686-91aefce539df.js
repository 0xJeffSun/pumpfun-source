// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(297454);
  e.s([
    "f",
    0,
    function (e, n, r, i) {
      let o = !1,
        l = !1,
        s = i ?? t.w;
      return {
        reason: e,
        event: n ?? new Event("base-ui"),
        cancel() {
          o = !0;
        },
        allowPropagation() {
          l = !0;
        },
        get isCanceled() {
          return o;
        },
        get isPropagationAllowed() {
          return l;
        },
        trigger: r,
        ...s,
      };
    },
  ]);
};
