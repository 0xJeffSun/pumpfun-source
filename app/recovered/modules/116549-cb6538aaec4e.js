// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(445242),
    r = e.i(352386),
    i = e.i(844510),
    n = e.i(45329);
  let a = (0, r.createContext)("none"),
    o = a.Provider,
    l = () => (0, r.useContext)(a),
    s = (0, r.createContext)(null),
    d = s.Provider,
    c = (0, r.createContext)(null),
    u = c.Provider;
  function m(e) {
    return e.style.density;
  }
  e.s([
    "Z",
    0,
    o,
    "w",
    0,
    d,
    "t",
    0,
    u,
    "k",
    0,
    l,
    "B",
    0,
    (e) => {
      let n,
        a,
        o,
        l,
        s = (0, t.c)(9),
        [d, c] = (0, r.useState)(!1),
        [u, m] = (0, r.useState)(!0),
        h = (0, r.useRef)(null);
      (s[0] !== e
        ? ((n = () => {
            let t = h.current;
            if (!t || "u" < typeof ResizeObserver) return;
            let r = i._[e],
              n = new ResizeObserver((e) => {
                m(
                  (e[0]?.contentRect.width ??
                    t.getBoundingClientRect().width) >= r,
                );
              });
            return (n.observe(t), () => n.disconnect());
          }),
          (a = [e]),
          (s[0] = e),
          (s[1] = n),
          (s[2] = a))
        : ((n = s[1]), (a = s[2])),
        (0, r.useEffect)(n, a),
        s[3] !== u
          ? ((o = { publish: c, headerHasRoom: u }), (s[3] = u), (s[4] = o))
          : (o = s[4]));
      let p = o;
      return (
        s[5] !== u || s[6] !== d || s[7] !== p
          ? ((l = { paused: d, headerHasRoom: u, slotRef: h, sink: p }),
            (s[5] = u),
            (s[6] = d),
            (s[7] = p),
            (s[8] = l))
          : (l = s[8]),
        l
      );
    },
    "v",
    0,
    () => (0, r.useContext)(s),
    "F",
    0,
    () => (0, r.useContext)(c),
    "J",
    0,
    () => {
      let e,
        i,
        n,
        a,
        o,
        l,
        s = (0, t.c)(9);
      s[0] === Symbol.for("react.memo_cache_sentinel")
        ? ((e = { open: !1, query: "" }), (s[0] = e))
        : (e = s[0]);
      let [d, c] = (0, r.useState)(e);
      s[1] === Symbol.for("react.memo_cache_sentinel")
        ? ((i = []), (s[1] = i))
        : (i = s[1]);
      let [u, m] = (0, r.useState)(i);
      s[2] === Symbol.for("react.memo_cache_sentinel")
        ? ((n = (e) => {
            c((t) =>
              e
                ? t.open
                  ? t
                  : { ...t, open: !0 }
                : t.open
                  ? { open: !1, query: "" }
                  : t,
            );
          }),
          (s[2] = n))
        : (n = s[2]);
      let h = n;
      s[3] === Symbol.for("react.memo_cache_sentinel")
        ? ((a = (e) => {
            c((t) => (t.query === e ? t : { ...t, query: e }));
          }),
          (s[3] = a))
        : (a = s[3]);
      let p = a;
      s[4] === Symbol.for("react.memo_cache_sentinel")
        ? ((o = (e) => {
            m((t) =>
              t.length === e.length &&
              t.every((t, r) => t.key === e[r]?.key && t.name === e[r]?.name)
                ? t
                : e,
            );
          }),
          (s[4] = o))
        : (o = s[4]);
      let f = o;
      return (
        s[5] !== u || s[6] !== d.open || s[7] !== d.query
          ? ((l = {
              open: d.open,
              query: d.query,
              accounts: u,
              setOpen: h,
              setQuery: p,
              setAccounts: f,
            }),
            (s[5] = u),
            (s[6] = d.open),
            (s[7] = d.query),
            (s[8] = l))
          : (l = s[8]),
        l
      );
    },
    "x",
    0,
    () => {
      let e,
        r = (0, t.c)(3),
        i = l(),
        a = (0, n.V)(m);
      if (r[0] !== a || r[1] !== i)
        ((e =
          "coin-rail" === i
            ? "terminal"
            : "none" === i
              ? "comfortable"
              : "compact" === a
                ? "terminal"
                : "comfortable"),
          (r[0] = a),
          (r[1] = i),
          (r[2] = e));
      else e = r[2];
      return e;
    },
  ]);
};
