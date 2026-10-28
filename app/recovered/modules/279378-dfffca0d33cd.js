// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(732486),
    i = e.i(445242),
    l = e.i(453706),
    a = e.i(121910),
    s = e.i(571097);
  let n = (0, l.default)(() => e.A(813012).then((e) => e.DmShareStrip), {
    loadableGenerated: { modules: [314334] },
    ssr: !1,
    loading: function () {
      let e,
        l = (0, i.c)(1);
      return (
        l[0] === Symbol.for("react.memo_cache_sentinel")
          ? ((e = (0, t.jsx)(s.$, { children: (0, t.jsx)(s.t, {}) })),
            (l[0] = e))
          : (e = l[0]),
        e
      );
    },
  });
  e.s(
    [
      "f",
      0,
      function (e) {
        let l,
          s = (0, i.c)(4),
          { url: r, onDismissHost: o, onSeeMore: c } = e;
        return (0, a.f)() && null !== r
          ? (s[0] !== o || s[1] !== c || s[2] !== r
              ? ((l = (0, t.jsx)(n, {
                  onDismissHost: o,
                  onSeeMore: c,
                  url: r,
                })),
                (s[0] = o),
                (s[1] = c),
                (s[2] = r),
                (s[3] = l))
              : (l = s[3]),
            l)
          : null;
      },
    ],
    279378,
  );
  var r = e.i(352386),
    o = e.i(793371);
  e.s(
    [
      "f",
      0,
      (e) => {
        let t,
          l,
          a,
          s = (0, i.c)(5),
          { closeHost: n } = e,
          c = (0, r.useRef)(null);
        s[0] !== n
          ? ((t = (e) => {
              ((c.current = e), n());
            }),
            (s[0] = n),
            (s[1] = t))
          : (t = s[1]);
        let d = t;
        s[2] === Symbol.for("react.memo_cache_sentinel")
          ? ((l = (e) => {
              let t = c.current;
              null !== t &&
                ((c.current = null), e.preventDefault(), (0, o.n)(t));
            }),
            (s[2] = l))
          : (l = s[2]);
        let u = l;
        return (
          s[3] !== d
            ? ((a = { handOff: d, onCloseAutoFocus: u }),
              (s[3] = d),
              (s[4] = a))
            : (a = s[4]),
          a
        );
      },
    ],
    434935,
  );
  var c = e.i(975982),
    d = e.i(526080);
  let u = (e) =>
    "number" == typeof e ? Number.isFinite(e) && e > 0 : !!e?.trim();
  e.s(
    [
      "f",
      0,
      function ({ avgEntryPriceUsd: e, coin: t, mint: i }) {
        if (
          null == e ||
          !Number.isFinite(e) ||
          e <= 0 ||
          !t ||
          (!(
            u(t.circulating_supply_str) ||
            u(t.total_supply_str) ||
            u(t.total_supply)
          ) &&
            !(0, c.k)(i))
        )
          return null;
        let l = (0, d.B)(t);
        if (!Number.isFinite(l) || l <= 0) return null;
        let a = e * l;
        return Number.isFinite(a) && a > 0 ? a : null;
      },
    ],
    505266,
  );
};
