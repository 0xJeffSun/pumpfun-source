// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(490831),
    n = e.i(797312),
    r = e.i(917342);
  let a = "/docs/contract/decodeFunctionResult";
  e.s([
    "f",
    0,
    function (e) {
      let { abi: i, args: s, functionName: o, data: f } = e,
        c = i[0];
      if (o) {
        let e = (0, r.f)({ abi: i, args: s, name: o });
        if (!e) throw new t.$(o, { docsPath: a });
        c = e;
      }
      if ("function" !== c.type) throw new t.$(void 0, { docsPath: a });
      if (!c.outputs) throw new t.Y(c.name, { docsPath: a });
      let u = (0, n.f)(c.outputs, f);
      return u && u.length > 1 ? u : u && 1 === u.length ? u[0] : void 0;
    },
  ]);
};
