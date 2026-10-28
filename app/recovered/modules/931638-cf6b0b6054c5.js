// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(58904),
    f = e.i(52764),
    a = e.i(166800),
    n = e.i(76373),
    r = e.i(990149),
    i = e.i(964764),
    b = e.i(971860),
    s = e.i(515752),
    o = e.i(178868);
  let c = "/docs/contract/encodeErrorResult";
  function d(e) {
    let { abi: t, errorName: f, args: a } = e,
      d = t[0];
    if (f) {
      let e = (0, o.f)({ abi: t, args: a, name: f });
      if (!e) throw new n.k(f, { docsPath: c });
      d = e;
    }
    if ("error" !== d.type) throw new n.k(void 0, { docsPath: c });
    let u = (0, s.r)(d),
      l = (0, i.f)(u),
      h = "0x";
    if (a && a.length > 0) {
      if (!d.inputs) throw new n.A(d.name, { docsPath: c });
      h = (0, b.N)(d.inputs, a);
    }
    return (0, r.s)([l, h]);
  }
  let u = "/docs/contract/encodeFunctionResult",
    l = "x-batch-gateway:true";
  async function h(e) {
    let { data: r, ccipRequest: i } = e,
      {
        args: [s],
      } = (0, a.f)({ abi: t.p, data: r }),
      c = [],
      p = [];
    return (
      await Promise.all(
        s.map(async (e, a) => {
          try {
            ((p[a] = e.urls.includes(l)
              ? await h({ data: e.data, ccipRequest: i })
              : await i(e)),
              (c[a] = !1));
          } catch (e) {
            var n;
            ((c[a] = !0),
              (p[a] =
                "HttpRequestError" === (n = e).name && n.status
                  ? d({
                      abi: t.p,
                      errorName: "HttpError",
                      args: [n.status, n.shortMessage],
                    })
                  : d({
                      abi: [f.T],
                      errorName: "Error",
                      args: ["shortMessage" in n ? n.shortMessage : n.message],
                    })));
          }
        }),
      ),
      (function (e) {
        let { abi: t, functionName: f, result: a } = e,
          r = t[0];
        if (f) {
          let e = (0, o.f)({ abi: t, name: f });
          if (!e) throw new n.$(f, { docsPath: u });
          r = e;
        }
        if ("function" !== r.type) throw new n.$(void 0, { docsPath: u });
        if (!r.outputs) throw new n.Y(r.name, { docsPath: u });
        let i = (() => {
          if (0 === r.outputs.length) return [];
          if (1 === r.outputs.length) return [a];
          if (Array.isArray(a)) return a;
          throw new n.w(a);
        })();
        return (0, b.N)(r.outputs, i);
      })({ abi: t.p, functionName: "query", result: [c, p] })
    );
  }
  e.s(["V", 0, h, "o", 0, l], 931638);
};
