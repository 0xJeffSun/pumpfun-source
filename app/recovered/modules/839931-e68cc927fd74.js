// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(406288);
  e.i(167079);
  let n = "/packs",
    r = `${n}/all`,
    o = "category",
    i = (e) => `${n}/${encodeURIComponent(e).replace(/%3A/gi, ":")}`,
    a = "step",
    s = ["pack", "binder", "market", "profile"],
    l = "from",
    c = "provider",
    u = /^[1-9A-HJ-NP-Za-km-z]{32,44}$/,
    p = (e, t, r) => {
      let o = new URLSearchParams();
      (t && o.set(l, t), r && "collector_crypt" !== r && o.set(c, r));
      let i = o.toString();
      return `${n}/card/${e}${i ? `?${i}` : ""}`;
    },
    d = "open",
    f = "callout",
    g = ["callouts", "activity"],
    m = /^[A-Za-z0-9_-]{1,64}$/,
    b = /^collectible:[A-Za-z0-9:_-]{1,160}$/,
    h = `${n}/market`,
    v = `${n}/binder`,
    x = "wallet",
    y = `${n}/rip-lock`,
    _ = "blocked",
    k = "extend";
  e.s([
    "p",
    0,
    x,
    "t",
    0,
    o,
    "l",
    0,
    "packs-featured",
    "m",
    0,
    n,
    "N",
    0,
    h,
    "F",
    0,
    _,
    "a",
    0,
    k,
    "n",
    0,
    y,
    "M",
    0,
    f,
    "B",
    0,
    l,
    "e",
    0,
    d,
    "j",
    0,
    c,
    "Y",
    0,
    "source_ref",
    "b",
    0,
    ["confirm"],
    "y",
    0,
    a,
    "h",
    0,
    (e, t, n) =>
      `${p(e)}?${d}=callouts&${f}=${encodeURIComponent(t)}${n && "collector_crypt" !== n ? `&${c}=${n}` : ""}`,
    "o",
    0,
    p,
    "q",
    0,
    ({ open: e, callout: t, sourceRef: n }) => {
      let r = n && b.test(n) ? n : null,
        o = g.includes(e ?? "") ? e : null === r ? null : "callouts";
      if (null === o) return null;
      let i = "callouts" === o && t && m.test(t) ? t : null;
      return { open: o, calloutId: i, sourceRef: r };
    },
    "Z",
    0,
    (e) => (null === e ? null : "activity" === e.open ? "about" : "callouts"),
    "c",
    0,
    (e, t) =>
      null === t
        ? e
        : [e, t.open, t.calloutId ?? "", t.sourceRef ?? ""].join("|"),
    "s",
    0,
    (e) => (s.includes(e ?? "") ? e : "deeplink"),
    "H",
    0,
    (e) => ((0, t._)(e) ? e : null),
    "C",
    0,
    (e) => `${i(e)}/cards`,
    "v",
    0,
    (e) => `${i(e)}?${a}=confirm`,
    "O",
    0,
    i,
    "x",
    0,
    (e) => `packs-rail-${e.toLowerCase().replace(/\s+/g, "-")}`,
    "P",
    0,
    (e) => (void 0 === e ? r : `${r}?${o}=${encodeURIComponent(e)}`),
    "X",
    0,
    (e) => (e ? `${v}?${x}=${encodeURIComponent(e)}` : v),
    "r",
    0,
    (e) => {
      let t = Array.isArray(e) ? e[0] : e;
      return t && u.test(t) ? t : null;
    },
    "Q",
    0,
    (e = {}) => {
      let t = new URLSearchParams();
      (e.blocked && t.set(_, "1"), e.extend && t.set(k, "1"));
      let n = t.toString();
      return n ? `${y}?${n}` : y;
    },
  ]);
};
