// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e, t, r) => {
  Object.defineProperty(r, "__esModule", { value: !0 });
  var n = {
    RedirectBoundary: function () {
      return p;
    },
    RedirectErrorBoundary: function () {
      return d;
    },
  };
  for (var o in n) Object.defineProperty(r, o, { enumerable: !0, get: n[o] });
  let i = e.r(56421),
    a = e.r(732486),
    l = i._(e.r(352386)),
    u = e.r(411081),
    s = e.r(46485),
    c = e.r(601331);
  function f({ redirect: e, reset: t, redirectType: r }) {
    let n = (0, u.useRouter)();
    return (
      (0, l.useEffect)(() => {
        l.default.startTransition(() => {
          ("push" === r ? n.push(e, {}) : n.replace(e, {}), t());
        });
      }, [e, r, t, n]),
      null
    );
  }
  class d extends l.default.Component {
    constructor(e) {
      (super(e), (this.state = { redirect: null, redirectType: null }));
    }
    static getDerivedStateFromError(e) {
      if ((0, c.isRedirectError)(e)) {
        let t = (0, s.getURLFromRedirectError)(e),
          r = (0, s.getRedirectTypeFromError)(e);
        return "handled" in e
          ? { redirect: null, redirectType: null }
          : { redirect: t, redirectType: r };
      }
      throw e;
    }
    render() {
      let { redirect: e, redirectType: t } = this.state;
      return null !== e && null !== t
        ? (0, a.jsx)(f, {
            redirect: e,
            redirectType: t,
            reset: () => this.setState({ redirect: null }),
          })
        : this.props.children;
    }
  }
  function p({ children: e }) {
    let t = (0, u.useRouter)();
    return (0, a.jsx)(d, { router: t, children: e });
  }
  ("function" == typeof r.default ||
    ("object" == typeof r.default && null !== r.default)) &&
    void 0 === r.default.__esModule &&
    (Object.defineProperty(r.default, "__esModule", { value: !0 }),
    Object.assign(r.default, r),
    (t.exports = r.default));
};
