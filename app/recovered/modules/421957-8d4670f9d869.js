// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(850697),
    n = e.i(640279),
    r = e.i(641802),
    i = e.i(346371),
    a = e.i(730755),
    s = e.i(923148);
  let o = "/docs/contract/encodeFunctionData";
  e.s(
    [
      "f",
      0,
      function (e) {
        let { args: f } = e,
          { abi: c, functionName: u } =
            1 === e.abi.length && e.functionName?.startsWith("0x")
              ? e
              : (function (e) {
                  let { abi: t, args: n, functionName: f } = e,
                    c = t[0];
                  if (f) {
                    let e = (0, s.f)({ abi: t, args: n, name: f });
                    if (!e) throw new r.$(f, { docsPath: o });
                    c = e;
                  }
                  if ("function" !== c.type)
                    throw new r.$(void 0, { docsPath: o });
                  return { abi: [c], functionName: (0, i.f)((0, a.r)(c)) };
                })(e),
          d = c[0],
          b = "inputs" in d && d.inputs ? (0, n.N)(d.inputs, f ?? []) : void 0;
        return (0, t.s)([u, b ?? "0x"]);
      },
    ],
    421957,
  );
};
