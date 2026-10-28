// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(717473),
    r = e.i(620016),
    n = e.i(421957),
    i = e.i(286533),
    a = e.i(586844),
    s = e.i(859095);
  async function o(e, o) {
    let {
        abi: u,
        address: l,
        args: c,
        functionName: f,
        dataSuffix: d = "string" == typeof e.dataSuffix
          ? e.dataSuffix
          : e.dataSuffix?.value,
        ...p
      } = o,
      y = p.account ? (0, t.f)(p.account) : e.account,
      h = (0, n.f)({ abi: u, args: c, functionName: f });
    try {
      let { data: t } = await (0, a.f)(
          e,
          s.f,
          "call",
        )({
          batch: !1,
          data: `${h}${d ? d.replace("0x", "") : ""}`,
          to: l,
          ...p,
          account: y,
        }),
        n = (0, r.f)({ abi: u, args: c, functionName: f, data: t || "0x" }),
        i = u.filter((e) => "name" in e && e.name === o.functionName);
      return {
        result: n,
        request: {
          abi: i,
          address: l,
          args: c,
          dataSuffix: d,
          functionName: f,
          ...p,
          account: y,
        },
      };
    } catch (e) {
      throw (0, i.f)(e, {
        abi: u,
        address: l,
        args: c,
        docsPath: "/docs/contract/simulateContract",
        functionName: f,
        sender: y?.address,
      });
    }
  }
  e.s(["f", 0, o]);
};
