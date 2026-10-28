// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(990149),
    r = e.i(590719),
    n = e.i(19648),
    s = e.i(711753),
    o = e.i(497763);
  e.s([
    "f",
    0,
    function (e) {
      let { chainId: i, nonce: a, to: c } = e,
        u = e.contractAddress ?? e.address,
        l = (0, o.f)(
          (0, t.s)([
            "0x05",
            (0, s.f)([i ? (0, n.N)(i) : "0x", u, a ? (0, n.N)(a) : "0x"]),
          ]),
        );
      return "bytes" === c ? (0, r.X)(l) : l;
    },
  ]);
};
