// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(732486),
    n = e.i(445242),
    i = e.i(439587);
  e.i(12692);
  var r = e.i(398902),
    a = e.i(595673),
    s = e.i(198825),
    o = e.i(266300),
    u = e.i(127962);
  e.s([
    "f",
    0,
    function () {
      let e,
        l,
        c,
        m = (0, n.c)(7),
        { t: d } = (0, r.f)(),
        { setShowWallet: f } = (0, s.useConnectWallet)();
      return (
        m[0] !== f
          ? ((e = () => {
              ((0, a.Lw)({ source: "bounty_claim" }),
                (0, u.U)(),
                (0, o.f)(),
                f(!0));
            }),
            (m[0] = f),
            (m[1] = e))
          : (e = m[1]),
        m[2] !== d
          ? ((l = d("web.bounties.connect_wallet")), (m[2] = d), (m[3] = l))
          : (l = m[3]),
        m[4] !== e || m[5] !== l
          ? ((c = (0, t.jsx)(i.K, { onClick: e, size: 32, children: l })),
            (m[4] = e),
            (m[5] = l),
            (m[6] = c))
          : (c = m[6]),
        c
      );
    },
  ]);
};
