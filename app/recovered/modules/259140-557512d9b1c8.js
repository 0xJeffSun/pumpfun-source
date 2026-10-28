// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(641802),
    n = e.i(850697),
    r = e.i(640279);
  let i = "/docs/contract/encodeDeployData";
  e.s([
    "f",
    0,
    function (e) {
      let { abi: a, args: s, bytecode: o } = e;
      if (!s || 0 === s.length) return o;
      let f = a.find((e) => "type" in e && "constructor" === e.type);
      if (!f) throw new t.j({ docsPath: i });
      if (!("inputs" in f) || !f.inputs || 0 === f.inputs.length)
        throw new t.B({ docsPath: i });
      let c = (0, r.N)(f.inputs, s);
      return (0, n.s)([o, c]);
    },
  ]);
};
