// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(76373),
    n = e.i(989494),
    i = e.i(964764),
    r = e.i(887857),
    s = e.i(515752);
  e.s([
    "f",
    0,
    function (e) {
      let { abi: o, data: a } = e,
        u = (0, n.M)(a, 0, 4),
        c = o.find((e) => "function" === e.type && u === (0, i.f)((0, s.r)(e)));
      if (!c)
        throw new t.N(u, { docsPath: "/docs/contract/decodeFunctionData" });
      return {
        functionName: c.name,
        args:
          "inputs" in c && c.inputs && c.inputs.length > 0
            ? (0, r.f)(c.inputs, (0, n.M)(a, 4))
            : void 0,
      };
    },
  ]);
};
