// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(76373),
    f = e.i(887857),
    a = e.i(178868);
  let n = "/docs/contract/decodeFunctionResult";
  e.s([
    "f",
    0,
    function (e) {
      let { abi: r, args: i, functionName: b, data: s } = e,
        o = r[0];
      if (b) {
        let e = (0, a.f)({ abi: r, args: i, name: b });
        if (!e) throw new t.$(b, { docsPath: n });
        o = e;
      }
      if ("function" !== o.type) throw new t.$(void 0, { docsPath: n });
      if (!o.outputs) throw new t.Y(o.name, { docsPath: n });
      let c = (0, f.f)(o.outputs, s);
      return c && c.length > 1 ? c : c && 1 === c.length ? c[0] : void 0;
    },
  ]);
};
