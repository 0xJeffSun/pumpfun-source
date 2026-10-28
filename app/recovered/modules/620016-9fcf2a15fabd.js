// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(641802),
    n = e.i(990834),
    r = e.i(923148);
  let i = "/docs/contract/decodeFunctionResult";
  e.s([
    "f",
    0,
    function (e) {
      let { abi: a, args: s, functionName: o, data: f } = e,
        c = a[0];
      if (o) {
        let e = (0, r.f)({ abi: a, args: s, name: o });
        if (!e) throw new t.$(o, { docsPath: i });
        c = e;
      }
      if ("function" !== c.type) throw new t.$(void 0, { docsPath: i });
      if (!c.outputs) throw new t.Y(c.name, { docsPath: i });
      let u = (0, n.f)(c.outputs, f);
      return u && u.length > 1 ? u : u && 1 === u.length ? u[0] : void 0;
    },
  ]);
};
