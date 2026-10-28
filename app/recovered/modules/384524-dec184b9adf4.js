// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(254667),
    r = e.i(352386),
    n = e.i(719421);
  class i extends r.Component {
    state = { failed: !1, error: null };
    static getDerivedStateFromError(e) {
      return { failed: !0, error: e };
    }
    componentDidCatch(e) {
      if ((0, n.P)(e)) return;
      let r = e instanceof Error ? e : null;
      t.y.error(this.props.logMessage, {
        message: r ? r.message : String(e),
        stack: r?.stack?.slice(0, 1500),
        digest: e?.digest,
      });
    }
    render() {
      let { failed: e, error: t } = this.state;
      if (!e) return this.props.children;
      if ((0, n.P)(t)) throw t;
      return null;
    }
  }
  e.s(["f", 0, i]);
};
