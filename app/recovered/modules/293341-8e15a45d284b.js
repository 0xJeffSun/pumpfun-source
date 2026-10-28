// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(990149),
    f = e.i(971860),
    a = e.i(76373),
    n = e.i(964764),
    r = e.i(515752),
    i = e.i(178868);
  let b = "/docs/contract/encodeFunctionData";
  e.s(
    [
      "f",
      0,
      function (e) {
        let { args: s } = e,
          { abi: o, functionName: c } =
            1 === e.abi.length && e.functionName?.startsWith("0x")
              ? e
              : (function (e) {
                  let { abi: t, args: f, functionName: s } = e,
                    o = t[0];
                  if (s) {
                    let e = (0, i.f)({ abi: t, args: f, name: s });
                    if (!e) throw new a.$(s, { docsPath: b });
                    o = e;
                  }
                  if ("function" !== o.type)
                    throw new a.$(void 0, { docsPath: b });
                  return { abi: [o], functionName: (0, n.f)((0, r.r)(o)) };
                })(e),
          d = o[0],
          u = "inputs" in d && d.inputs ? (0, f.N)(d.inputs, s ?? []) : void 0;
        return (0, t.s)([c, u ?? "0x"]);
      },
    ],
    293341,
  );
};
