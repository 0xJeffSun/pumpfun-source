// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(990149),
    n = e.i(590719),
    r = e.i(19648),
    i = e.i(711753),
    s = e.i(497763);
  e.s([
    "f",
    0,
    function (e) {
      let { chainId: o, nonce: a, to: f } = e,
        c = e.contractAddress ?? e.address,
        u = (0, s.f)(
          (0, t.s)([
            "0x05",
            (0, i.f)([o ? (0, r.N)(o) : "0x", c, a ? (0, r.N)(a) : "0x"]),
          ]),
        );
      return "bytes" === f ? (0, n.X)(u) : u;
    },
  ]);
};
