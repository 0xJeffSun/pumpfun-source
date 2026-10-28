// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(76373),
    r = e.i(989494),
    n = e.i(964764),
    a = e.i(887857),
    i = e.i(515752);
  e.s([
    "f",
    0,
    function (e) {
      let { abi: s, data: o } = e,
        c = (0, r.M)(o, 0, 4),
        l = s.find((e) => "function" === e.type && c === (0, n.f)((0, i.r)(e)));
      if (!l)
        throw new t.N(c, { docsPath: "/docs/contract/decodeFunctionData" });
      return {
        functionName: l.name,
        args:
          "inputs" in l && l.inputs && l.inputs.length > 0
            ? (0, a.f)(l.inputs, (0, r.M)(o, 4))
            : void 0,
      };
    },
  ]);
};
