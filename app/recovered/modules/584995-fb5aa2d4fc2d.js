// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e, t, r) => {
  (e.i(149502), Object.defineProperty(r, "__esModule", { value: !0 }));
  var n = {
    ErrorBoundary: function () {
      return h;
    },
    ErrorBoundaryHandler: function () {
      return y;
    },
  };
  for (var o in n) Object.defineProperty(r, o, { enumerable: !0, get: n[o] });
  let i = e.r(56421),
    a = e.r(732486),
    l = i._(e.r(352386)),
    u = e.r(497279),
    s = e.r(684679);
  e.r(60106);
  let c = e.r(128612),
    f = e.r(200829),
    d = e.r(8001),
    p = "u" > typeof window && (0, f.isBot)(window.navigator.userAgent);
  class y extends l.default.Component {
    static {
      this.contextType = d.AppRouterContext;
    }
    constructor(e) {
      (super(e),
        (this.reset = () => {
          this.setState({ error: null });
        }),
        (this.retry = () => {
          (0, l.startTransition)(() => {
            (this.context?.refresh(), this.reset());
          });
        }),
        (this.state = { error: null, previousPathname: this.props.pathname }));
    }
    static getDerivedStateFromError(e) {
      if ((0, s.isNextRouterError)(e)) throw e;
      return { error: { thrownValue: e } };
    }
    static getDerivedStateFromProps(e, t) {
      let { error: r } = t;
      return e.pathname !== t.previousPathname && t.error
        ? { error: null, previousPathname: e.pathname }
        : { error: t.error, previousPathname: e.pathname };
    }
    render() {
      if (this.state.error && !p) {
        let e = this.state.error.thrownValue;
        return (
          (0, c.handleISRError)({ error: e }),
          (0, a.jsxs)(a.Fragment, {
            children: [
              this.props.errorStyles,
              this.props.errorScripts,
              (0, a.jsx)(this.props.errorComponent, {
                error: e,
                reset: this.reset,
                retry: this.retry,
              }),
            ],
          })
        );
      }
      return this.props.children;
    }
  }
  function h({
    errorComponent: e,
    errorStyles: t,
    errorScripts: r,
    children: n,
  }) {
    let o = (0, u.useUntrackedPathname)();
    return e
      ? (0, a.jsx)(y, {
          pathname: o,
          errorComponent: e,
          errorStyles: t,
          errorScripts: r,
          children: n,
        })
      : (0, a.jsx)(a.Fragment, { children: n });
  }
  ("function" == typeof r.default ||
    ("object" == typeof r.default && null !== r.default)) &&
    void 0 === r.default.__esModule &&
    (Object.defineProperty(r.default, "__esModule", { value: !0 }),
    Object.assign(r.default, r),
    (t.exports = r.default));
};
