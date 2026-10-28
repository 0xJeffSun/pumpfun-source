// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(76373),
    r = e.i(989494),
    n = e.i(964764),
    s = e.i(887857),
    o = e.i(515752);
  e.s([
    "f",
    0,
    function (e) {
      let { abi: i, data: a } = e,
        c = (0, r.M)(a, 0, 4),
        u = i.find((e) => "function" === e.type && c === (0, n.f)((0, o.r)(e)));
      if (!u)
        throw new t.N(c, { docsPath: "/docs/contract/decodeFunctionData" });
      return {
        functionName: u.name,
        args:
          "inputs" in u && u.inputs && u.inputs.length > 0
            ? (0, s.f)(u.inputs, (0, r.M)(a, 4))
            : void 0,
      };
    },
  ]);
};
