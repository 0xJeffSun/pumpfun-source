// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(990149),
    r = e.i(590719),
    n = e.i(19648),
    i = e.i(711753),
    o = e.i(497763);
  e.s([
    "f",
    0,
    function (e) {
      let { chainId: a, nonce: s, to: u } = e,
        c = e.contractAddress ?? e.address,
        l = (0, o.f)(
          (0, t.s)([
            "0x05",
            (0, i.f)([a ? (0, n.N)(a) : "0x", c, s ? (0, n.N)(s) : "0x"]),
          ]),
        );
      return "bytes" === u ? (0, r.X)(l) : l;
    },
  ]);
};
