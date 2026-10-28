// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(490831),
    n = e.i(296354),
    r = e.i(141569);
  let a = "/docs/contract/encodeDeployData";
  e.s([
    "f",
    0,
    function (e) {
      let { abi: i, args: s, bytecode: o } = e;
      if (!s || 0 === s.length) return o;
      let f = i.find((e) => "type" in e && "constructor" === e.type);
      if (!f) throw new t.j({ docsPath: a });
      if (!("inputs" in f) || !f.inputs || 0 === f.inputs.length)
        throw new t.B({ docsPath: a });
      let c = (0, r.N)(f.inputs, s);
      return (0, n.s)([o, c]);
    },
  ]);
};
