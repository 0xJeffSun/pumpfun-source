// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t,
    r = e.i(765115);
  function l(e, t, l) {
    try {
      return e(t);
    } catch (e) {
      return (
        (0, r.S)(
          "[nuqs] Error while parsing value `%s`: %O" +
            (l ? " (for key `%s`)" : ""),
          t,
          e,
          l,
        ),
        null
      );
    }
  }
  var n = (function () {
      if ("u" < typeof window || !window.GestureEvent) return 50;
      try {
        let e = navigator.userAgent?.match(/version\/([\d\.]+) safari/i);
        return parseFloat(e[1]) >= 17 ? 120 : 320;
      } catch {
        return 320;
      }
    })(),
    a = new Map(),
    i = { history: "replace", scroll: !1, shallow: !0, throttleMs: n },
    s = new Set(),
    u = 0,
    o = null;
  function c(e, t, l, u) {
    let o = null === t ? null : l(t);
    return (
      (0, r.h)("[nuqs queue] Enqueueing %s=%s %O", e, o, u),
      a.set(e, o),
      "push" === u.history && (i.history = "push"),
      u.scroll && (i.scroll = !0),
      !1 === u.shallow && (i.shallow = !1),
      u.startTransition && s.add(u.startTransition),
      (i.throttleMs = Math.max(
        u.throttleMs ?? n,
        Number.isFinite(i.throttleMs) ? i.throttleMs : 0,
      )),
      o
    );
  }
  function d() {
    return new URLSearchParams(location.search);
  }
  function f({
    getSearchParamsSnapshot: e = d,
    updateUrl: t,
    rateLimitFactor: l = 1,
  }) {
    return (
      null === o &&
        (o = new Promise((c, d) => {
          if (!Number.isFinite(i.throttleMs)) {
            ((0, r.h)("[nuqs queue] Skipping flush due to throttleMs=Infinity"),
              c(e()),
              setTimeout(() => {
                o = null;
              }, 0));
            return;
          }
          function f() {
            u = performance.now();
            let [l, f] = (function ({
              updateUrl: e,
              getSearchParamsSnapshot: t,
            }) {
              let l = t();
              if (0 === a.size) return [l, null];
              let u = Array.from(a.entries()),
                o = { ...i },
                c = Array.from(s);
              for (let [e, t] of (a.clear(),
              s.clear(),
              (i.history = "replace"),
              (i.scroll = !1),
              (i.shallow = !0),
              (i.throttleMs = n),
              (0, r.h)("[nuqs queue] Flushing queue %O with options %O", u, o),
              u))
                null === t ? l.delete(e) : l.set(e, t);
              try {
                var d, f;
                let t;
                return (
                  (d = c),
                  (f = () => {
                    e(l, {
                      history: o.history,
                      scroll: o.scroll,
                      shallow: o.shallow,
                    });
                  }),
                  (t = (e) => {
                    if (e === d.length) return f();
                    let r = d[e];
                    if (!r) throw Error("Invalid transition function");
                    r(() => t(e + 1));
                  })(0),
                  [l, null]
                );
              } catch (e) {
                return (
                  console.error((0, r.C)(429), u.map(([e]) => e).join(), e),
                  [l, e]
                );
              }
            })({ updateUrl: t, getSearchParamsSnapshot: e });
            (null === f ? c(l) : d(l), (o = null));
          }
          setTimeout(function () {
            let e = performance.now() - u,
              t = i.throttleMs,
              n = l * Math.max(0, Math.min(t, t - e));
            ((0, r.h)(
              "[nuqs queue] Scheduling flush in %f ms. Throttled at %f ms",
              n,
              t,
            ),
              0 === n ? f() : setTimeout(f, n));
          }, 0);
        })),
      o
    );
  }
  var p = e.i(352386);
  function m(e) {
    function t(t) {
      if (void 0 === t) return null;
      let r = "";
      if (Array.isArray(t)) {
        if (void 0 === t[0]) return null;
        r = t[0];
      }
      return ("string" == typeof t && (r = t), l(e.parse, r));
    }
    return {
      eq: (e, t) => e === t,
      ...e,
      parseServerSide: t,
      withDefault(e) {
        return { ...this, defaultValue: e, parseServerSide: (r) => t(r) ?? e };
      },
      withOptions(e) {
        return { ...this, ...e };
      },
    };
  }
  var h = m({ parse: (e) => e, serialize: (e) => `${e}` }),
    b = m({
      parse: (e) => {
        let t = parseInt(e);
        return Number.isNaN(t) ? null : t;
      },
      serialize: (e) => Math.round(e).toFixed(),
    });
  (m({
    parse: (e) => {
      let t = b.parse(e);
      return null === t ? null : t - 1;
    },
    serialize: (e) => b.serialize(e + 1),
  }),
    m({
      parse: (e) => {
        let t = parseInt(e, 16);
        return Number.isNaN(t) ? null : t;
      },
      serialize: (e) => {
        let t = Math.round(e).toString(16);
        return t.padStart(t.length + (t.length % 2), "0");
      },
    }),
    m({
      parse: (e) => {
        let t = parseFloat(e);
        return Number.isNaN(t) ? null : t;
      },
      serialize: (e) => e.toString(),
    }));
  var g = m({
    parse: (e) => "true" === e,
    serialize: (e) => (e ? "true" : "false"),
  });
  function y(e, t) {
    return e.valueOf() === t.valueOf();
  }
  (m({
    parse: (e) => {
      let t = parseInt(e);
      return Number.isNaN(t) ? null : new Date(t);
    },
    serialize: (e) => e.valueOf().toString(),
    eq: y,
  }),
    m({
      parse: (e) => {
        let t = new Date(e);
        return Number.isNaN(t.valueOf()) ? null : t;
      },
      serialize: (e) => e.toISOString(),
      eq: y,
    }),
    m({
      parse: (e) => {
        let t = new Date(e.slice(0, 10));
        return Number.isNaN(t.valueOf()) ? null : t;
      },
      serialize: (e) => e.toISOString().slice(0, 10),
      eq: y,
    }));
  var v = {
      all: (t = t || new Map()),
      on: function (e, r) {
        var l = t.get(e);
        l ? l.push(r) : t.set(e, [r]);
      },
      off: function (e, r) {
        var l = t.get(e);
        l && (r ? l.splice(l.indexOf(r) >>> 0, 1) : t.set(e, []));
      },
      emit: function (e, r) {
        var l = t.get(e);
        (l &&
          l.slice().map(function (e) {
            e(r);
          }),
          (l = t.get("*")) &&
            l.slice().map(function (t) {
              t(e, r);
            }));
      },
    },
    S = {};
  function x(e, t, r, n, i) {
    let s = !1,
      u = Object.keys(e).reduce((u, o) => {
        let c = t?.[o] ?? o,
          { parse: d } = e[o],
          f = a.get(c),
          p = void 0 === f ? (r?.get(c) ?? null) : f;
        if (n && i && (n[c] ?? null) === p) return ((u[o] = i[o] ?? null), u);
        s = !0;
        let m = null === p ? null : l(d, p, o);
        return ((u[o] = m ?? null), n && (n[c] = p), u);
      }, {});
    if (!s) {
      let t = Object.keys(e),
        r = Object.keys(i ?? {});
      s = t.length !== r.length || t.some((e) => !r.includes(e));
    }
    return { state: u, hasChanged: s };
  }
  function w(e, t) {
    return Object.fromEntries(
      Object.keys(e).map((r) => [r, e[r] ?? t[r] ?? null]),
    );
  }
  e.s(
    [
      "k",
      0,
      m,
      "e",
      0,
      function (e, t = ",") {
        let r = e.eq ?? ((e, t) => e === t),
          n = encodeURIComponent(t);
        return m({
          parse: (r) =>
            "" === r
              ? []
              : r
                  .split(t)
                  .map((r, a) => l(e.parse, r.replaceAll(n, t), `[${a}]`))
                  .filter((e) => null != e),
          serialize: (r) =>
            r
              .map((r) =>
                (e.serialize ? e.serialize(r) : String(r)).replaceAll(t, n),
              )
              .join(t),
          eq: (e, t) =>
            e === t || (e.length === t.length && e.every((e, l) => r(e, t[l]))),
        });
      },
      "Z",
      0,
      g,
      "w",
      0,
      b,
      "d",
      0,
      h,
      "b",
      0,
      function (e) {
        return m({
          parse: (t) => (e.includes(t) ? t : null),
          serialize: (e) => e.toString(),
        });
      },
      "o",
      0,
      function (
        e,
        {
          history: t = "replace",
          shallow: i = !0,
          scroll: s = !1,
          throttleMs: u = n,
          parse: o = (e) => e,
          serialize: d = String,
          eq: m = (e, t) => e === t,
          defaultValue: h,
          clearOnDefault: b = !0,
          startTransition: g,
        } = {
          history: "replace",
          scroll: !1,
          shallow: !0,
          throttleMs: n,
          parse: (e) => e,
          serialize: String,
          eq: (e, t) => e === t,
          clearOnDefault: !0,
          defaultValue: void 0,
        },
      ) {
        let y = (0, r.J)(),
          S = y.searchParams,
          x = (0, p.useRef)(S?.get(e) ?? null),
          [w, N] = (0, p.useState)(() => {
            let t = a.get(e),
              r = void 0 === t ? (S?.get(e) ?? null) : t;
            return null === r ? null : l(o, r, e);
          }),
          E = (0, p.useRef)(w);
        ((0, r.h)(
          "[nuqs `%s`] render - state: %O, iSP: %s",
          e,
          w,
          S?.get(e) ?? null,
        ),
          (0, p.useEffect)(() => {
            let t = S?.get(e) ?? null;
            if (t === x.current) return;
            let n = null === t ? null : l(o, t, e);
            ((0, r.h)("[nuqs `%s`] syncFromUseSearchParams %O", e, n),
              (E.current = n),
              (x.current = t),
              N(n));
          }, [S?.get(e), e]),
          (0, p.useEffect)(() => {
            function t({ state: l, query: n }) {
              ((0, r.h)("[nuqs `%s`] updateInternalState %O", e, l),
                (E.current = l),
                (x.current = n),
                N(l));
            }
            return (
              (0, r.h)("[nuqs `%s`] subscribing to sync", e),
              v.on(e, t),
              () => {
                ((0, r.h)("[nuqs `%s`] unsubscribing from sync", e),
                  v.off(e, t));
              }
            );
          }, [e]));
        let M = (0, p.useCallback)(
          (r, l = {}) => {
            let n = "function" == typeof r ? r(E.current ?? h ?? null) : r;
            (l.clearOnDefault ?? b) &&
              null !== n &&
              void 0 !== h &&
              m(n, h) &&
              (n = null);
            let a = c(e, n, d, {
              history: l.history ?? t,
              shallow: l.shallow ?? i,
              scroll: l.scroll ?? s,
              throttleMs: l.throttleMs ?? u,
              startTransition: l.startTransition ?? g,
            });
            return (v.emit(e, { state: n, query: a }), f(y));
          },
          [
            e,
            t,
            i,
            s,
            u,
            g,
            y.updateUrl,
            y.getSearchParamsSnapshot,
            y.rateLimitFactor,
          ],
        );
        return [w ?? h ?? null, M];
      },
      "i",
      0,
      function (
        e,
        {
          history: t = "replace",
          scroll: l = !1,
          shallow: a = !0,
          throttleMs: i = n,
          clearOnDefault: s = !0,
          startTransition: u,
          urlKeys: o = S,
        } = {},
      ) {
        let d = Object.keys(e).join(","),
          m = (0, p.useMemo)(
            () => Object.fromEntries(Object.keys(e).map((e) => [e, o[e] ?? e])),
            [d, JSON.stringify(o)],
          ),
          h = (0, r.J)(),
          b = h.searchParams,
          g = (0, p.useRef)({}),
          y = (0, p.useMemo)(
            () =>
              Object.fromEntries(
                Object.keys(e).map((t) => [t, e[t].defaultValue ?? null]),
              ),
            [
              Object.values(e)
                .map(({ defaultValue: e }) => e)
                .join(","),
            ],
          ),
          [N, E] = (0, p.useState)(
            () => x(e, o, b ?? new URLSearchParams()).state,
          ),
          M = (0, p.useRef)(N);
        if (
          ((0, r.h)("[nuq+ `%s`] render - state: %O, iSP: %s", d, N, b),
          Object.keys(g.current).join("&") !== Object.values(m).join("&"))
        ) {
          let { state: t, hasChanged: r } = x(e, o, b, g.current, M.current);
          (r && ((M.current = t), E(t)),
            (g.current = Object.fromEntries(
              Object.values(m).map((e) => [e, b?.get(e) ?? null]),
            )));
        }
        ((0, p.useEffect)(() => {
          let { state: t, hasChanged: r } = x(e, o, b, g.current, M.current);
          r && ((M.current = t), E(t));
        }, [
          Object.values(m)
            .map((e) => `${e}=${b?.get(e)}`)
            .join("&"),
        ]),
          (0, p.useEffect)(() => {
            let t = Object.keys(e).reduce(
              (t, l) => (
                (t[l] = ({ state: t, query: n }) => {
                  var a;
                  let { defaultValue: i } = e[l],
                    s = m[l];
                  ((M.current = { ...M.current, [l]: t ?? i ?? null }),
                    (g.current[s] = n),
                    (0, r.h)(
                      "[nuq+ `%s`] Cross-hook key sync %s: %O (default: %O). Resolved: %O",
                      d,
                      s,
                      t,
                      i,
                      M.current,
                    ),
                    (a = M.current),
                    (0, r.h)("[nuq+ `%s`] updateInternalState %O", d, a),
                    (M.current = a),
                    E(a));
                }),
                t
              ),
              {},
            );
            for (let l of Object.keys(e)) {
              let e = m[l];
              ((0, r.h)("[nuq+ `%s`] Subscribing to sync for `%s`", d, e),
                v.on(e, t[l]));
            }
            return () => {
              for (let l of Object.keys(e)) {
                let e = m[l];
                ((0, r.h)("[nuq+ `%s`] Unsubscribing to sync for `%s`", d, e),
                  v.off(e, t[l]));
              }
            };
          }, [d, m]));
        let I = (0, p.useCallback)(
          (n, o = {}) => {
            let p = Object.fromEntries(Object.keys(e).map((e) => [e, null])),
              b = "function" == typeof n ? (n(w(M.current, y)) ?? p) : (n ?? p);
            for (let [n, f] of ((0, r.h)("[nuq+ `%s`] setState: %O", d, b),
            Object.entries(b))) {
              let r = e[n],
                d = m[n];
              if (!r) continue;
              (o.clearOnDefault ?? r.clearOnDefault ?? s) &&
                null !== f &&
                void 0 !== r.defaultValue &&
                (r.eq ?? ((e, t) => e === t))(f, r.defaultValue) &&
                (f = null);
              let p = c(d, f, r.serialize ?? String, {
                history: o.history ?? r.history ?? t,
                shallow: o.shallow ?? r.shallow ?? a,
                scroll: o.scroll ?? r.scroll ?? l,
                throttleMs: o.throttleMs ?? r.throttleMs ?? i,
                startTransition: o.startTransition ?? r.startTransition ?? u,
              });
              v.emit(d, { state: f, query: p });
            }
            return f(h);
          },
          [
            d,
            t,
            a,
            l,
            i,
            u,
            m,
            h.updateUrl,
            h.getSearchParamsSnapshot,
            h.rateLimitFactor,
            y,
          ],
        );
        return [(0, p.useMemo)(() => w(N, y), [N, y]), I];
      },
    ],
    311282,
  );
};
