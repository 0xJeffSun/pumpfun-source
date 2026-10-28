// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(76373),
    f = e.i(990149),
    a = e.i(971860);
  let n = "/docs/contract/encodeDeployData";
  e.s([
    "f",
    0,
    function (e) {
      let { abi: r, args: i, bytecode: b } = e;
      if (!i || 0 === i.length) return b;
      let s = r.find((e) => "type" in e && "constructor" === e.type);
      if (!s) throw new t.j({ docsPath: n });
      if (!("inputs" in s) || !s.inputs || 0 === s.inputs.length)
        throw new t.B({ docsPath: n });
      let o = (0, a.N)(s.inputs, i);
      return (0, f.s)([b, o]);
    },
  ]);
};
