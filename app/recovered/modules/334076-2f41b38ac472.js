// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  let t = new Map(),
    n = (e, t) => t - e.startedAt < 1e4,
    r = ({ url: e, read: r, now: i = Date.now() }) => {
      let l = t.get(e);
      if (l && n(l, i))
        return l.page.then(
          () => void 0,
          () => void 0,
        );
      t.delete(e);
      let a = r(),
        o = { page: a, startedAt: i };
      for (let n of (t.set(e, o), t.keys())) {
        if (t.size <= 8) break;
        t.delete(n);
      }
      return a.then(
        (e) => {
          o.settled = e;
        },
        () => {
          t.get(e) === o && t.delete(e);
        },
      );
    };
  e.s(
    [
      "o",
      0,
      ({ url: e, now: r = Date.now() }) => {
        let i = t.get(e);
        if (i && n(i, r)) return { page: i.page, settled: i.settled };
      },
      "Y",
      0,
      r,
      "g",
      0,
      ({ url: e, now: r = Date.now() }) => {
        let i = t.get(e);
        if (i && (t.delete(e), n(i, r))) return i.page;
      },
    ],
    27521,
  );
  var i = e.i(882238);
  let l = [
      "bundles/runtime.528f81f7a425983444d8.js",
      "bundles/en.9488.2f156b47fe84118759c5.js",
      "bundles/1996.25e6f30e7a095ec239f4.css",
      "bundles/207.2e06ffb7ce05936178f2.js",
      "bundles/library.2a35263e52ab75f5729a.js",
    ],
    a = !1,
    o = () => void 0;
  var s = e.i(997887),
    u = e.i(505835),
    d = e.i(628731),
    c = e.i(641947),
    f = e.i(99415),
    m = e.i(666880);
  let p = () => e.A(670698);
  e.s(["f", 0, p], 441057);
  let h = () => e.A(195098);
  e.s(["f", 0, h], 62785);
  let y = () => void 0,
    g = ({ coin: e }) => {
      if (!(0, m.f)(e)) return null;
      let t = (0, u.U)({
        mint: e.mint,
        chainId: e.chain_id || (c.A ? f.y : e.chain_id),
      });
      if (!t) return null;
      let n = (0, s.i)(e.created_timestamp);
      return {
        chainId: t,
        address: e.mint,
        interval: (0, u.y)((0, i.u)({ coin: { ...e, created_timestamp: n } })),
        measure: (0, u.W)("USD"),
        count: d.p,
      };
    };
  e.s(
    [
      "T",
      0,
      g,
      "h",
      0,
      ({ coin: e }) => {
        let t;
        if (((t = navigator.connection), t?.saveData === !0)) return;
        (p().catch(y),
          h().catch(y),
          (({ fetchImpl: e = fetch } = {}) => {
            if (!a)
              for (let t of ((a = !0), l))
                e(`/tradingview/charting_library/${t}`, {
                  priority: "low",
                  credentials: "same-origin",
                })
                  .then((e) => e.arrayBuffer())
                  .then(o, o);
          })());
        let n = g({ coin: e });
        n && r({ url: (0, u.h)(n), read: () => (0, u.Z)({ ...n, relay: !0 }) });
      },
    ],
    334076,
  );
};
