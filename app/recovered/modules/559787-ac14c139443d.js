// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(620016),
    r = e.i(421957),
    n = e.i(286533),
    i = e.i(586844),
    a = e.i(859095);
  async function s(e, s) {
    let { abi: o, address: u, args: l, functionName: c, ...f } = s,
      d = (0, r.f)({ abi: o, args: l, functionName: c });
    try {
      let { data: r } = await (0, i.f)(
        e,
        a.f,
        "call",
      )({ ...f, data: d, to: u });
      return (0, t.f)({ abi: o, args: l, functionName: c, data: r || "0x" });
    } catch (e) {
      throw (0, n.f)(e, {
        abi: o,
        address: u,
        args: l,
        docsPath: "/docs/contract/readContract",
        functionName: c,
      });
    }
  }
  e.s(["f", 0, s]);
};
