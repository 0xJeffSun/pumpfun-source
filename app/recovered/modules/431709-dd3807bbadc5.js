// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(352386),
    n = e.i(78436),
    r = e.i(634103),
    i = e.i(800855);
  let a = ["callouts", "trades"],
    o = a.length,
    l = (e) => a.filter((t) => e.includes(t)),
    s = (e, t, n) => Math.min(n, Math.max(t, e)),
    u = (e) =>
      null != e && Number.isFinite(e)
        ? s(Math.floor((e - 400) / 260), 0, o)
        : 0,
    d = (e, t, n = 1) => {
      let r = Math.max(1, n);
      return Math.round(
        s(
          e,
          260,
          Math.max(
            260,
            Math.min(
              640,
              null != t && Number.isFinite(t) ? Math.floor((t - 400) / r) : 640,
            ),
          ),
        ),
      );
    },
    c = [],
    f = { callouts: ["callouts"], trades: ["trades"] },
    h = (e) => (null == e.cardWidthPx ? e.open : p(e)),
    m = (e, t) => {
      let n = h(e).filter((e) => e !== t);
      return {
        open: 0 === n.length ? c : n,
        lastOpened:
          null != e.lastOpened && n.includes(e.lastOpened)
            ? e.lastOpened
            : (n[0] ?? null),
      };
    },
    g = (0, n.$)()(
      (0, r.V)(
        (e, t) => ({
          open: c,
          lastOpened: null,
          paneWidthPx: 360,
          cardWidthPx: null,
          controlStripWidthPx: null,
          toggle: (n) => {
            let r = t(),
              i = h(r);
            return i.includes(n)
              ? (e(m(r, n)), !1)
              : (e({ open: l([...i, n]), lastOpened: n }), !0);
          },
          close: (n) => {
            let r = t();
            r.open.includes(n) && e(m(r, n));
          },
          setPaneWidthPx: (n) => {
            let r = t();
            e({ paneWidthPx: d(n, r.cardWidthPx, p(r).length) });
          },
          resetPaneWidth: () => e({ paneWidthPx: 360 }),
          setCardWidthPx: (n) => {
            let r = null != n && Number.isFinite(n) ? Math.round(n) : null;
            r !== t().cardWidthPx && e({ cardWidthPx: r });
          },
          setControlStripWidthPx: (n) => {
            let r =
              null != n && Number.isFinite(n) && n > 0 ? Math.round(n) : null;
            r !== t().controlStripWidthPx && e({ controlStripWidthPx: r });
          },
        }),
        {
          name: "coin-chart-side-panel",
          storage: (0, i.I)({
            defaultPersisted: { open: c, lastOpened: null, paneWidthPx: 360 },
          }),
          skipHydration: !0,
          partialize: (e) => ({
            open: e.open,
            lastOpened: e.lastOpened,
            paneWidthPx: e.paneWidthPx,
          }),
          merge: (e, t) => {
            let n,
              r = l(Array.isArray(e?.open) ? e.open : []),
              i =
                e?.lastOpened != null && r.includes(e.lastOpened)
                  ? e.lastOpened
                  : (r[r.length - 1] ?? null);
            return {
              ...t,
              open: 0 === r.length ? c : r,
              lastOpened: i,
              paneWidthPx:
                "number" == typeof (n = e?.paneWidthPx ?? e?.widthPx) &&
                Number.isFinite(n)
                  ? d(n)
                  : 360,
            };
          },
        },
      ),
    );
  (0, i.m)(g);
  let p = (e) => {
      let t = u(e.cardWidthPx);
      if (0 === t || 0 === e.open.length) return c;
      if (e.open.length <= t) return e.open;
      let n = e.open.find((t) => t !== e.lastOpened) ?? e.open[0];
      return n ? f[n] : c;
    },
    b = (e) => g.persist?.onFinishHydration(e) ?? (() => {}),
    w = () => g.persist?.hasHydrated() ?? !1,
    _ = () => !1,
    y = () => (0, t.useSyncExternalStore)(b, w, _);
  e.s([
    "L",
    0,
    260,
    "l",
    0,
    d,
    "e",
    0,
    u,
    "m",
    0,
    y,
    "f",
    0,
    g,
    "c",
    0,
    () => {
      let e = y(),
        t = g(p);
      return e ? t : c;
    },
  ]);
};
