// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(296354),
    n = e.i(141569),
    r = e.i(490831),
    a = e.i(135378),
    i = e.i(1619),
    s = e.i(917342);
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
                  return { abi: [c], functionName: (0, a.f)((0, i.r)(c)) };
                })(e),
          l = c[0],
          d = "inputs" in l && l.inputs ? (0, n.N)(l.inputs, f ?? []) : void 0;
        return (0, t.s)([u, d ?? "0x"]);
      },
    ],
    387060,
  );
};
