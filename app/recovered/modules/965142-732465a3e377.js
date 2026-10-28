// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(990149),
    r = e.i(590719),
    n = e.i(19648),
    i = e.i(711753),
    a = e.i(497763);
  e.s([
    "f",
    0,
    function (e) {
      let { chainId: o, nonce: s, to: l } = e,
        u = e.contractAddress ?? e.address,
        d = (0, a.f)(
          (0, t.s)([
            "0x05",
            (0, i.f)([o ? (0, n.N)(o) : "0x", u, s ? (0, n.N)(s) : "0x"]),
          ]),
        );
      return "bytes" === l ? (0, r.X)(d) : d;
    },
  ]);
};
