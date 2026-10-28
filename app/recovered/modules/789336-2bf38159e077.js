// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(359702),
    i = e.i(770924),
    s = e.i(376744);
  let r = Object.freeze({
      message: "",
      variant: "success",
      svg: void 0,
      open: !1,
      autoClose: !0,
    }),
    a = (0, t.s)({ ...r });
  e.s([
    "f",
    0,
    {
      state: a,
      subscribeKey: (e, t) => (0, i.T)(a, e, t),
      showLoading(e, t = {}) {
        this._showMessage({ message: e, variant: "loading", ...t });
      },
      showSuccess(e) {
        this._showMessage({ message: e, variant: "success" });
      },
      showSvg(e, t) {
        this._showMessage({ message: e, svg: t });
      },
      showError(e) {
        let t = s.f.parseError(e);
        this._showMessage({ message: t, variant: "error" });
      },
      hide() {
        ((a.message = r.message),
          (a.variant = r.variant),
          (a.svg = r.svg),
          (a.open = r.open),
          (a.autoClose = r.autoClose));
      },
      _showMessage({
        message: e,
        svg: t,
        variant: i = "success",
        autoClose: s = r.autoClose,
      }) {
        a.open
          ? ((a.open = !1),
            setTimeout(() => {
              ((a.message = e),
                (a.variant = i),
                (a.svg = t),
                (a.open = !0),
                (a.autoClose = s));
            }, 150))
          : ((a.message = e),
            (a.variant = i),
            (a.svg = t),
            (a.open = !0),
            (a.autoClose = s));
      },
    },
  ]);
};
