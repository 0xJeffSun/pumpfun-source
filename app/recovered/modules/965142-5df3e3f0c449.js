// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(990149),
    n = e.i(590719),
    i = e.i(19648),
    r = e.i(711753),
    s = e.i(497763);
  e.s([
    "f",
    0,
    function (e) {
      let { chainId: o, nonce: a, to: u } = e,
        c = e.contractAddress ?? e.address,
        l = (0, s.f)(
          (0, t.s)([
            "0x05",
            (0, r.f)([o ? (0, i.N)(o) : "0x", c, a ? (0, i.N)(a) : "0x"]),
          ]),
        );
      return "bytes" === u ? (0, n.X)(l) : l;
    },
  ]);
};
