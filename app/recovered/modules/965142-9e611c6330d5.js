// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(990149),
    r = e.i(590719),
    n = e.i(19648),
    o = e.i(711753),
    s = e.i(497763);
  e.s([
    "f",
    0,
    function (e) {
      let { chainId: a, nonce: i, to: c } = e,
        u = e.contractAddress ?? e.address,
        d = (0, s.f)(
          (0, t.s)([
            "0x05",
            (0, o.f)([a ? (0, n.N)(a) : "0x", u, i ? (0, n.N)(i) : "0x"]),
          ]),
        );
      return "bytes" === c ? (0, r.X)(d) : d;
    },
  ]);
};
