// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var l = e.i(78436),
    t = e.i(733089);
  let i = [],
    n = [],
    a = (e, l) => ({
      mint: e,
      wallets: i,
      side: "all",
      venue: "all",
      sizeEnabled: !0,
      sizeBand: { min: l, max: null },
      sizeFloor: l,
      walletClasses: n,
      timeWindow: null,
      search: "",
      writer: null,
      walletSource: null,
      plotOnChart: !1,
    }),
    s = (0, l.$)()((e, l) => ({
      ...a(null, 0),
      initForMint: (l, { defaultMinSize: t }) =>
        e((e) => (e.mint === l ? e : a(l, t))),
      setSide: (l) => e({ side: l }),
      setVenue: (l) => e({ venue: l }),
      setSizeEnabled: (l) => e({ sizeEnabled: l }),
      setSizeBand: (l) =>
        e((e) => {
          let t = { ...e.sizeBand, ...l };
          return (
            null != t.min && null != t.max && t.max < t.min && (t.max = t.min),
            { sizeBand: t }
          );
        }),
      toggleWalletClass: (l) =>
        e((e) => ({
          walletClasses: e.walletClasses.includes(l)
            ? e.walletClasses.filter((e) => e !== l)
            : [...e.walletClasses, l],
        })),
      setWalletClasses: (l) => e({ walletClasses: [...new Set(l)] }),
      setWallets: (l, i, n) => {
        let a = ((e) => {
          let l = new Set(),
            i = [];
          for (let n of e) {
            let e = n.trim();
            if (!e) continue;
            let a = (0, t.P)(e);
            l.has(a) || (l.add(a), i.push(e));
          }
          return i;
        })(l);
        e((e) => ({
          wallets: a,
          writer: a.length ? i : null,
          walletSource: a.length ? (n?.source ?? e.walletSource) : null,
          plotOnChart: !!a.length && (n?.plotOnChart ?? e.plotOnChart),
        }));
      },
      setPlotOnChart: (l) => e({ plotOnChart: l }),
      addWallet: (e, t) => l().setWallets([...l().wallets, e], t),
      removeWallet: (e) => {
        let i = (0, t.P)(e);
        l().setWallets(
          l().wallets.filter((e) => (0, t.P)(e) !== i),
          l().writer ?? "table",
        );
      },
      clearWallets: () =>
        e({ wallets: i, writer: null, walletSource: null, plotOnChart: !1 }),
      setTimeWindow: (l) => e({ timeWindow: l }),
      setSearch: (l) => e({ search: l }),
      clearAll: () =>
        e((e) => ({ ...a(e.mint, e.sizeFloor), sizeEnabled: e.sizeEnabled })),
    })),
    r = (e) =>
      e.sizeEnabled &&
      ((e.sizeBand.min ?? 0) !== e.sizeFloor || null != e.sizeBand.max);
  e.s([
    "p",
    0,
    1,
    "B",
    0,
    ["you", "dev", "following", "tracked", "verified"],
    "G",
    0,
    r,
    "f",
    0,
    (e) =>
      e.wallets.length > 0 ||
      "all" !== e.side ||
      "all" !== e.venue ||
      e.walletClasses.length > 0 ||
      null !== e.timeWindow ||
      "" !== e.search.trim() ||
      r(e),
    "Y",
    0,
    (e) =>
      [
        `side:${e.side}`,
        "all" !== e.venue ? `venue:${e.venue}` : null,
        e.sizeEnabled
          ? `size:${e.sizeBand.min ?? ""}-${e.sizeBand.max ?? ""}`
          : "size:off",
        ...e.walletClasses.map((e) => `class:+${e}`),
        e.wallets.length ? `wallets:${e.wallets.length}` : null,
        e.search.trim() ? "search:text" : null,
      ]
        .filter(Boolean)
        .join(" "),
    "M",
    0,
    s,
  ]);
};
