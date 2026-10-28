// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(990149),
    n = e.i(590719),
    r = e.i(19648),
    s = e.i(711753),
    i = e.i(497763);
  e.s([
    "f",
    0,
    function (e) {
      let { chainId: a, nonce: o, to: u } = e,
        p = e.contractAddress ?? e.address,
        y = (0, i.f)(
          (0, t.s)([
            "0x05",
            (0, s.f)([a ? (0, r.N)(a) : "0x", p, o ? (0, r.N)(o) : "0x"]),
          ]),
        );
      return "bytes" === u ? (0, n.X)(y) : y;
    },
  ]);
};
