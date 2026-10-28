// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(445242),
    r = e.i(352386),
    o = e.i(637027),
    n = e.i(78436),
    a = e.i(634103);
  let i = (0, n.$)()(
    (0, a.V)(
      (e) => ({
        overrides: {},
        isEnabled: !0,
        isEmployeeUnlocked: !1,
        setFlagOverride: (t, r) =>
          e((e) => ({ overrides: { ...e.overrides, [t]: r } })),
        clearFlagOverride: (t) =>
          e((e) => {
            let { [t]: r, ...o } = e.overrides;
            return { overrides: o };
          }),
        clearAllOverrides: () => e({ overrides: {} }),
        toggleEnabled: () => e((e) => ({ isEnabled: !e.isEnabled })),
        setEmployeeUnlocked: (t) =>
          e((e) =>
            e.isEmployeeUnlocked === t ? e : { isEmployeeUnlocked: t },
          ),
      }),
      {
        name: "feature-flag-dev-tools",
        partialize: (e) => ({ overrides: e.overrides, isEnabled: e.isEnabled }),
      },
    ),
  );
  e.s(["f", 0, i], 30824);
  var s = e.i(272173),
    l = e.i(37116);
  let d = Object.freeze([]),
    u = (e) => {
      if (!Array.isArray(e)) return d;
      let t = e.filter((e) => "string" == typeof e);
      return t.length > 0 ? t : d;
    };
  var c = e.i(711089);
  let w = (e, t) => {
      let r = e[t];
      return "boolean" == typeof r ? r : void 0;
    },
    b = (e, r) => {
      let n,
        a = (0, t.c)(4),
        d = void 0 !== r && r,
        u = (0, l.useLaunchDarklyFlags)(),
        b = (0, l.useLDClient)(),
        { isClientContextIdentified: h } = (0, s.useLaunchDarklyContextSync)(),
        p = (0, c.useServerFlags)(),
        { overrides: f, isEnabled: m, isEmployeeUnlocked: g } = i(),
        { isDevelopment: _ } = (0, o.useExperimentsConfig)();
      e: {
        if ((_ || g) && m && e in f) {
          n = f[e] ?? d;
          break e;
        }
        let t = !!b && h;
        if (t && e in u) {
          n = u[e] ?? d;
          break e;
        }
        if (p && e in p) {
          let t;
          (a[0] !== d || a[1] !== e || a[2] !== p
            ? ((t = w(p, e) ?? d),
              (a[0] = d),
              (a[1] = e),
              (a[2] = p),
              (a[3] = t))
            : (t = a[3]),
            (n = t));
          break e;
        }
        n = (t ? u[e] : void 0) ?? d;
      }
      return n;
    };
  e.s(
    [
      "U",
      0,
      () => {
        let { isDevelopment: e } = (0, o.useExperimentsConfig)(),
          { isEmployeeUnlocked: t } = i();
        return e || t;
      },
      "j",
      0,
      b,
      "k",
      0,
      (e, t) => b(e, void 0 !== t && t),
      "p",
      0,
      () => {
        let e,
          r = (0, t.c)(7),
          n = (0, l.useLaunchDarklyFlags)(),
          a = (0, l.useLDClient)(),
          { isClientContextIdentified: d } = (0,
          s.useLaunchDarklyContextSync)(),
          u = (0, c.useServerFlags)(),
          { overrides: b, isEnabled: h, isEmployeeUnlocked: p } = i(),
          { isDevelopment: f } = (0, o.useExperimentsConfig)(),
          m = f || p,
          g = !!a && d;
        return (
          r[0] !== n ||
          r[1] !== g ||
          r[2] !== h ||
          r[3] !== m ||
          r[4] !== b ||
          r[5] !== u
            ? ((e = (e) =>
                m && h && e in b
                  ? (b[e] ?? !1)
                  : g && e in n
                    ? (n[e] ?? !1)
                    : u && e in u
                      ? (w(u, e) ?? !1)
                      : ((g ? n[e] : void 0) ?? !1)),
              (r[0] = n),
              (r[1] = g),
              (r[2] = h),
              (r[3] = m),
              (r[4] = b),
              (r[5] = u),
              (r[6] = e))
            : (e = r[6]),
          e
        );
      },
      "V",
      0,
      (e) => {
        let t,
          r = (0, l.useLaunchDarklyFlags)(),
          n = (0, l.useLDClient)(),
          { isClientContextIdentified: a } = (0,
          s.useLaunchDarklyContextSync)(),
          d = (0, c.useServerFlags)(),
          { overrides: u, isEnabled: w, isEmployeeUnlocked: b } = i(),
          { isDevelopment: h } = (0, o.useExperimentsConfig)();
        e: {
          if (((h || b) && w && e in u) || (n && a && e in r)) {
            t = !0;
            break e;
          }
          t = !!(d && e in d);
        }
        return t;
      },
      "D",
      0,
      (e) => {
        let r,
          o = (0, t.c)(4),
          n = (0, l.useLaunchDarklyFlags)(),
          a = (0, l.useLDClient)(),
          { isClientContextIdentified: i } = (0,
          s.useLaunchDarklyContextSync)(),
          d = (0, c.useServerFlags)();
        e: {
          let t;
          if (a && i && e in n) {
            let t,
              a = n[e];
            (o[0] !== a ? ((t = u(a)), (o[0] = a), (o[1] = t)) : (t = o[1]),
              (r = t));
            break e;
          }
          let s = d?.[e];
          (o[2] !== s ? ((t = u(s)), (o[2] = s), (o[3] = t)) : (t = o[3]),
            (r = t));
        }
        return r;
      },
      "G",
      0,
      (e, n) =>
        ((e, n) => {
          let a = (0, t.c)(4),
            d = void 0 !== n && n,
            u = (0, l.useLaunchDarklyFlags)(),
            b = (0, l.useLDClient)(),
            { isClientContextIdentified: h } = (0,
            s.useLaunchDarklyContextSync)(),
            p = (0, c.useServerFlagsPromise)(),
            { overrides: f, isEnabled: m, isEmployeeUnlocked: g } = i(),
            { isDevelopment: _ } = (0, o.useExperimentsConfig)();
          if ((_ || g) && m && e in f) return f[e] ?? d;
          let v = !!b && h;
          if (v && e in u) return u[e] ?? d;
          let E = p ? (0, r.use)(p) : null;
          if (E && e in E) {
            let t;
            return (
              a[0] !== d || a[1] !== e || a[2] !== E
                ? ((t = w(E, e) ?? d),
                  (a[0] = d),
                  (a[1] = e),
                  (a[2] = E),
                  (a[3] = t))
                : (t = a[3]),
              t
            );
          }
          return (v ? u[e] : void 0) ?? d;
        })(e, void 0 !== n && n),
    ],
    254010,
  );
};
