// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(732486),
    r = e.i(445242),
    o = e.i(886813),
    n = e.i(352386),
    a = e.i(998898),
    i = e.i(37116);
  let s = (e) => {
      let t = { context: e, identifiedContext: null },
        r = t,
        o = new Set(),
        n = () => {
          for (let e of o) e();
        };
      return {
        get: () => r,
        getInitial: () => t,
        setContext: (e) => {
          let t = "function" == typeof e ? e(r.context) : e;
          t !== r.context && ((r = { ...r, context: t }), n());
        },
        setIdentifiedContext: (e) => {
          e !== r.identifiedContext &&
            ((r = { ...r, identifiedContext: e }), n());
        },
        subscribe: (e) => (
          o.add(e),
          () => {
            o.delete(e);
          }
        ),
      };
    },
    l = { store: s((0, a.e)()), setContext: () => {}, patchContext: () => {} },
    d = (0, n.createContext)(l),
    u = (e) => (0, n.useSyncExternalStore)(e.subscribe, e.get, e.getInitial);
  function c() {
    return s((0, a.e)({ deviceId: (0, o.p)() }));
  }
  e.s([
    "LaunchDarklyContextSyncProvider",
    0,
    (e) => {
      let s,
        l,
        w,
        b,
        h,
        p,
        f,
        m = (0, r.c)(18),
        { children: g } = e,
        _ = (0, i.useLDClient)(),
        [v] = (0, n.useState)(c),
        { context: E, identifiedContext: k } = u(v),
        { setContext: y } = v;
      (m[0] !== y
        ? ((s = () => {
            let e = () => {
              let e = (0, o.$)();
              y((t) => {
                if (t.device?.key === e) return t;
                let r = (0, a.e)({
                  userAddress: t.user.anonymous ? void 0 : t.user.key,
                  ccUserId: t.account?.key,
                  deviceId: e,
                });
                return (0, a.w)(t, r) ? t : r;
              });
            };
            e();
            let t = () => {
              "visible" === document.visibilityState && e();
            };
            return (
              window.addEventListener("focus", e),
              document.addEventListener("visibilitychange", t),
              () => {
                (window.removeEventListener("focus", e),
                  document.removeEventListener("visibilitychange", t));
              }
            );
          }),
          (l = [y]),
          (m[0] = y),
          (m[1] = s),
          (m[2] = l))
        : ((s = m[1]), (l = m[2])),
        (0, n.useEffect)(s, l),
        m[3] !== E || m[4] !== k || m[5] !== _ || m[6] !== v
          ? ((w = () => {
              if (!_ || (k && (0, a.w)(k, E))) return;
              let e = !1,
                t = () => {
                  e || v.setIdentifiedContext(E);
                };
              return (
                Promise.resolve(_.identify(E)).then(t, t),
                () => {
                  e = !0;
                }
              );
            }),
            (b = [_, E, k, v]),
            (m[3] = E),
            (m[4] = k),
            (m[5] = _),
            (m[6] = v),
            (m[7] = w),
            (m[8] = b))
          : ((w = m[7]), (b = m[8])),
        (0, n.useEffect)(w, b),
        m[9] !== y
          ? ((h = (e) =>
              y((t) => {
                let r = (0, a.e)({
                  userAddress:
                    null === e.userAddress
                      ? void 0
                      : e.userAddress ||
                        (t.user.anonymous ? void 0 : t.user.key),
                  ccUserId:
                    null === e.ccUserId ? void 0 : e.ccUserId || t.account?.key,
                  deviceId: t.device?.key,
                });
                return (0, a.w)(t, r) ? t : r;
              })),
            (m[9] = y),
            (m[10] = h))
          : (h = m[10]));
      let R = h;
      m[11] !== R || m[12] !== y || m[13] !== v
        ? ((p = { store: v, setContext: y, patchContext: R }),
          (m[11] = R),
          (m[12] = y),
          (m[13] = v),
          (m[14] = p))
        : (p = m[14]);
      let P = p;
      return (
        m[15] !== g || m[16] !== P
          ? ((f = (0, t.jsx)(d.Provider, { value: P, children: g })),
            (m[15] = g),
            (m[16] = P),
            (m[17] = f))
          : (f = m[17]),
        f
      );
    },
    "useLaunchDarklyContextSync",
    0,
    () => {
      let e,
        t,
        o = (0, r.c)(7),
        { store: i, setContext: s, patchContext: l } = (0, n.use)(d),
        c = u(i),
        w = c.context;
      return (
        o[0] !== c
          ? ((e = (({ context: e, identifiedContext: t }) =>
              null !== t && (0, a.w)(t, e))(c)),
            (o[0] = c),
            (o[1] = e))
          : (e = o[1]),
        o[2] !== l || o[3] !== s || o[4] !== c.context || o[5] !== e
          ? ((t = {
              context: w,
              setContext: s,
              patchContext: l,
              isClientContextIdentified: e,
            }),
            (o[2] = l),
            (o[3] = s),
            (o[4] = c.context),
            (o[5] = e),
            (o[6] = t))
          : (t = o[6]),
        t
      );
    },
  ]);
};
