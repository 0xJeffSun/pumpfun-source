// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(440519),
    n = e.i(741947),
    r = e.i(641802),
    i = e.i(612164),
    a = e.i(346371),
    s = e.i(990834),
    o = e.i(730755);
  function f(e) {
    let { abi: t, data: n } = e,
      f = (0, i.M)(n, 0, 4),
      c = t.find((e) => "function" === e.type && f === (0, a.f)((0, o.r)(e)));
    if (!c) throw new r.N(f, { docsPath: "/docs/contract/decodeFunctionData" });
    return {
      functionName: c.name,
      args:
        "inputs" in c && c.inputs && c.inputs.length > 0
          ? (0, s.f)(c.inputs, (0, i.M)(n, 4))
          : void 0,
    };
  }
  e.s(["f", 0, f], 38935);
  var c = e.i(850697),
    u = e.i(640279),
    d = e.i(923148);
  let b = "/docs/contract/encodeErrorResult";
  function l(e) {
    let { abi: t, errorName: n, args: i } = e,
      s = t[0];
    if (n) {
      let e = (0, d.f)({ abi: t, args: i, name: n });
      if (!e) throw new r.k(n, { docsPath: b });
      s = e;
    }
    if ("error" !== s.type) throw new r.k(void 0, { docsPath: b });
    let f = (0, o.r)(s),
      l = (0, a.f)(f),
      p = "0x";
    if (i && i.length > 0) {
      if (!s.inputs) throw new r.A(s.name, { docsPath: b });
      p = (0, u.N)(s.inputs, i);
    }
    return (0, c.s)([l, p]);
  }
  let p = "/docs/contract/encodeFunctionResult",
    h = "x-batch-gateway:true";
  async function m(e) {
    let { data: i, ccipRequest: a } = e,
      {
        args: [s],
      } = f({ abi: t.p, data: i }),
      o = [],
      c = [];
    return (
      await Promise.all(
        s.map(async (e, r) => {
          try {
            ((c[r] = e.urls.includes(h)
              ? await m({ data: e.data, ccipRequest: a })
              : await a(e)),
              (o[r] = !1));
          } catch (e) {
            var i;
            ((o[r] = !0),
              (c[r] =
                "HttpRequestError" === (i = e).name && i.status
                  ? l({
                      abi: t.p,
                      errorName: "HttpError",
                      args: [i.status, i.shortMessage],
                    })
                  : l({
                      abi: [n.T],
                      errorName: "Error",
                      args: ["shortMessage" in i ? i.shortMessage : i.message],
                    })));
          }
        }),
      ),
      (function (e) {
        let { abi: t, functionName: n, result: i } = e,
          a = t[0];
        if (n) {
          let e = (0, d.f)({ abi: t, name: n });
          if (!e) throw new r.$(n, { docsPath: p });
          a = e;
        }
        if ("function" !== a.type) throw new r.$(void 0, { docsPath: p });
        if (!a.outputs) throw new r.Y(a.name, { docsPath: p });
        let s = (() => {
          if (0 === a.outputs.length) return [];
          if (1 === a.outputs.length) return [i];
          if (Array.isArray(i)) return i;
          throw new r.w(i);
        })();
        return (0, u.N)(a.outputs, s);
      })({ abi: t.p, functionName: "query", result: [o, c] })
    );
  }
  e.s(["V", 0, m, "o", 0, h], 661569);
};
