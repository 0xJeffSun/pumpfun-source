// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(76373),
    n = e.i(989494),
    r = e.i(964764),
    s = e.i(887857),
    i = e.i(515752);
  e.s([
    "f",
    0,
    function (e) {
      let { abi: a, data: o } = e,
        u = (0, n.M)(o, 0, 4),
        p = a.find((e) => "function" === e.type && u === (0, r.f)((0, i.r)(e)));
      if (!p)
        throw new t.N(u, { docsPath: "/docs/contract/decodeFunctionData" });
      return {
        functionName: p.name,
        args:
          "inputs" in p && p.inputs && p.inputs.length > 0
            ? (0, s.f)(p.inputs, (0, n.M)(o, 4))
            : void 0,
      };
    },
  ]);
};
