// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(793136),
    n = e.i(602484),
    r = e.i(490831),
    a = e.i(612684),
    i = e.i(135378),
    s = e.i(797312),
    o = e.i(1619),
    f = e.i(296354),
    c = e.i(141569),
    u = e.i(917342);
  let l = "/docs/contract/encodeErrorResult";
  function d(e) {
    let { abi: t, errorName: n, args: a } = e,
      s = t[0];
    if (n) {
      let e = (0, u.f)({ abi: t, args: a, name: n });
      if (!e) throw new r.k(n, { docsPath: l });
      s = e;
    }
    if ("error" !== s.type) throw new r.k(void 0, { docsPath: l });
    let d = (0, o.r)(s),
      b = (0, i.f)(d),
      p = "0x";
    if (a && a.length > 0) {
      if (!s.inputs) throw new r.A(s.name, { docsPath: l });
      p = (0, c.N)(s.inputs, a);
    }
    return (0, f.s)([b, p]);
  }
  let b = "/docs/contract/encodeFunctionResult",
    p = "x-batch-gateway:true";
  async function h(e) {
    let { data: f, ccipRequest: l } = e,
      {
        args: [m],
      } = (function (e) {
        let { abi: t, data: n } = e,
          f = (0, a.M)(n, 0, 4),
          c = t.find(
            (e) => "function" === e.type && f === (0, i.f)((0, o.r)(e)),
          );
        if (!c)
          throw new r.N(f, { docsPath: "/docs/contract/decodeFunctionData" });
        return {
          functionName: c.name,
          args:
            "inputs" in c && c.inputs && c.inputs.length > 0
              ? (0, s.f)(c.inputs, (0, a.M)(n, 4))
              : void 0,
        };
      })({ abi: t.p, data: f }),
      y = [],
      g = [];
    return (
      await Promise.all(
        m.map(async (e, r) => {
          try {
            ((g[r] = e.urls.includes(p)
              ? await h({ data: e.data, ccipRequest: l })
              : await l(e)),
              (y[r] = !1));
          } catch (e) {
            var a;
            ((y[r] = !0),
              (g[r] =
                "HttpRequestError" === (a = e).name && a.status
                  ? d({
                      abi: t.p,
                      errorName: "HttpError",
                      args: [a.status, a.shortMessage],
                    })
                  : d({
                      abi: [n.T],
                      errorName: "Error",
                      args: ["shortMessage" in a ? a.shortMessage : a.message],
                    })));
          }
        }),
      ),
      (function (e) {
        let { abi: t, functionName: n, result: a } = e,
          i = t[0];
        if (n) {
          let e = (0, u.f)({ abi: t, name: n });
          if (!e) throw new r.$(n, { docsPath: b });
          i = e;
        }
        if ("function" !== i.type) throw new r.$(void 0, { docsPath: b });
        if (!i.outputs) throw new r.Y(i.name, { docsPath: b });
        let s = (() => {
          if (0 === i.outputs.length) return [];
          if (1 === i.outputs.length) return [a];
          if (Array.isArray(a)) return a;
          throw new r.w(a);
        })();
        return (0, c.N)(i.outputs, s);
      })({ abi: t.p, functionName: "query", result: [y, g] })
    );
  }
  e.s(["V", 0, h, "o", 0, p], 825640);
};
