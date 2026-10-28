// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e, t, r) => {
  var a = Object.create,
    n = Object.defineProperty,
    o = Object.getOwnPropertyDescriptor,
    i = Object.getOwnPropertyNames,
    l = Object.getPrototypeOf,
    s = Object.prototype.hasOwnProperty,
    u = (e, t, r, a) => {
      if ((t && "object" == typeof t) || "function" == typeof t)
        for (let l of i(t))
          s.call(e, l) ||
            l === r ||
            n(e, l, {
              get: () => t[l],
              enumerable: !(a = o(t, l)) || a.enumerable,
            });
      return e;
    },
    c = (e, t, r) => (
      (r = null != e ? a(l(e)) : {}),
      u(
        !t && e && e.__esModule
          ? r
          : n(r, "default", { value: e, enumerable: !0 }),
        e,
      )
    ),
    p = (e, t, r) => {
      let a;
      return (
        (a = "symbol" != typeof t ? t + "" : t) in e
          ? n(e, a, {
              enumerable: !0,
              configurable: !0,
              writable: !0,
              value: r,
            })
          : (e[a] = r),
        r
      );
    },
    y = {},
    d = { createReactPlayer: () => T };
  for (var h in d) n(y, h, { get: d[h], enumerable: !0 });
  t.exports = u(n({}, "__esModule", { value: !0 }), y);
  var f = c(e.r(352386)),
    m = c(e.r(126612)),
    b = c(e.r(25195)),
    P = c(e.r(771196)),
    g = e.r(496135),
    v = e.r(415685),
    w = c(e.r(844033));
  let O = (0, v.lazy)(() => e.A(961822)),
    k = "u" > typeof window && window.document && "u" > typeof document,
    j = e.g.window && e.g.window.document,
    _ = Object.keys(g.propTypes),
    A = k || j ? f.Suspense : () => null,
    S = [],
    T = (e, t) => {
      var r;
      return (
        (r = class extends f.Component {
          constructor() {
            (super(...arguments),
              p(this, "state", { showPreview: !!this.props.light }),
              p(this, "references", {
                wrapper: (e) => {
                  this.wrapper = e;
                },
                player: (e) => {
                  this.player = e;
                },
              }),
              p(this, "handleClickPreview", (e) => {
                (this.setState({ showPreview: !1 }),
                  this.props.onClickPreview(e));
              }),
              p(this, "showPreview", () => {
                this.setState({ showPreview: !0 });
              }),
              p(this, "getDuration", () =>
                this.player ? this.player.getDuration() : null,
              ),
              p(this, "getCurrentTime", () =>
                this.player ? this.player.getCurrentTime() : null,
              ),
              p(this, "getSecondsLoaded", () =>
                this.player ? this.player.getSecondsLoaded() : null,
              ),
              p(this, "getInternalPlayer", (e = "player") =>
                this.player ? this.player.getInternalPlayer(e) : null,
              ),
              p(this, "seekTo", (e, t, r) => {
                if (!this.player) return null;
                this.player.seekTo(e, t, r);
              }),
              p(this, "handleReady", () => {
                this.props.onReady(this);
              }),
              p(
                this,
                "getActivePlayer",
                (0, b.default)((r) => {
                  for (let t of [...S, ...e]) if (t.canPlay(r)) return t;
                  return t || null;
                }),
              ),
              p(
                this,
                "getConfig",
                (0, b.default)((e, t) => {
                  let { config: r } = this.props;
                  return m.default.all([
                    g.defaultProps.config,
                    g.defaultProps.config[t] || {},
                    r,
                    r[t] || {},
                  ]);
                }),
              ),
              p(
                this,
                "getAttributes",
                (0, b.default)((e) => (0, v.omit)(this.props, _)),
              ),
              p(this, "renderActivePlayer", (e) => {
                if (!e) return null;
                let t = this.getActivePlayer(e);
                if (!t) return null;
                let r = this.getConfig(e, t.key);
                return f.default.createElement(w.default, {
                  ...this.props,
                  key: t.key,
                  ref: this.references.player,
                  config: r,
                  activePlayer: t.lazyPlayer || t,
                  onReady: this.handleReady,
                });
              }));
          }
          shouldComponentUpdate(e, t) {
            return (
              !(0, P.default)(this.props, e) || !(0, P.default)(this.state, t)
            );
          }
          componentDidUpdate(e) {
            let { light: t } = this.props;
            (!e.light && t && this.setState({ showPreview: !0 }),
              e.light && !t && this.setState({ showPreview: !1 }));
          }
          renderPreview(e) {
            if (!e) return null;
            let {
              light: t,
              playIcon: r,
              previewTabIndex: a,
              oEmbedUrl: n,
              previewAriaLabel: o,
            } = this.props;
            return f.default.createElement(O, {
              url: e,
              light: t,
              playIcon: r,
              previewTabIndex: a,
              previewAriaLabel: o,
              oEmbedUrl: n,
              onClick: this.handleClickPreview,
            });
          }
          render() {
            let {
                url: e,
                style: t,
                width: r,
                height: a,
                fallback: n,
                wrapper: o,
              } = this.props,
              { showPreview: i } = this.state,
              l = this.getAttributes(e),
              s = "string" == typeof o ? this.references.wrapper : void 0;
            return f.default.createElement(
              o,
              { ref: s, style: { ...t, width: r, height: a }, ...l },
              f.default.createElement(
                A,
                { fallback: n },
                i ? this.renderPreview(e) : this.renderActivePlayer(e),
              ),
            );
          }
        }),
        p(r, "displayName", "ReactPlayer"),
        p(r, "propTypes", g.propTypes),
        p(r, "defaultProps", g.defaultProps),
        p(r, "addCustomPlayer", (e) => {
          S.push(e);
        }),
        p(r, "removeCustomPlayers", () => {
          S.length = 0;
        }),
        p(r, "canPlay", (t) => {
          for (let r of [...S, ...e]) if (r.canPlay(t)) return !0;
          return !1;
        }),
        p(r, "canEnablePIP", (t) => {
          for (let r of [...S, ...e])
            if (r.canEnablePIP && r.canEnablePIP(t)) return !0;
          return !1;
        }),
        r
      );
    };
};
