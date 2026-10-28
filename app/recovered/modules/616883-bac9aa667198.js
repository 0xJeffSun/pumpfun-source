// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(954982),
    r = e.i(67223),
    n = e.i(548291),
    i = e.i(772488),
    a = e.i(404820),
    s = e.i(641802),
    o = e.i(536568),
    u = e.i(415415),
    l = e.i(990834),
    c = e.i(730755);
  let f = "/docs/contract/decodeEventLog";
  function d(e) {
    let { abi: t, data: r, strict: n, topics: i } = e,
      d = n ?? !0,
      [p, ...y] = i;
    if (!p) throw new s.R({ docsPath: f });
    let h = t.find((e) => "event" === e.type && p === (0, a.f)((0, c.r)(e)));
    if (!(h && "name" in h) || "event" !== h.type)
      throw new s.u(p, { docsPath: f });
    let { name: m, inputs: g } = h,
      b = g?.some((e) => !("name" in e && e.name)),
      w = b ? [] : {},
      v = g.map((e, t) => [e, t]).filter(([e]) => "indexed" in e && e.indexed),
      x = [];
    for (let e = 0; e < v.length; e++) {
      let [t, r] = v[e],
        n = y[e];
      if (!n) {
        if (d) throw new s.s({ abiItem: h, param: t });
        x.push([t, r]);
        continue;
      }
      w[b ? r : t.name || r] = (function ({ param: e, value: t }) {
        return "string" === e.type ||
          "bytes" === e.type ||
          "tuple" === e.type ||
          e.type.match(/^(.*)\[(\d+)?\]$/)
          ? t
          : ((0, l.f)([e], t) || [])[0];
      })({ param: t, value: n });
    }
    let P = g.filter((e) => !("indexed" in e && e.indexed)),
      k = d ? P : [...x.map(([e]) => e), ...P];
    if (k.length > 0) {
      if (r && "0x" !== r)
        try {
          let e = (0, l.f)(k, r);
          if (e) {
            let t = 0;
            if (!d) for (let [r, n] of x) w[b ? n : r.name || n] = e[t++];
            if (b)
              for (let r = 0; r < g.length; r++)
                void 0 === w[r] && t < e.length && (w[r] = e[t++]);
            else for (let r = 0; r < P.length; r++) w[P[r].name] = e[t++];
          }
        } catch (e) {
          if (d) {
            if (e instanceof s.D || e instanceof o.n)
              throw new s.t({
                abiItem: h,
                data: r,
                params: k,
                size: (0, u.f)(r),
              });
            throw e;
          }
        }
      else if (d) throw new s.t({ abiItem: h, data: "0x", params: k, size: 0 });
    }
    return { eventName: m, args: Object.values(w).length > 0 ? w : void 0 };
  }
  (e.s(["f", 0, d], 224008),
    e.s(
      [
        "f",
        0,
        function (e) {
          let { abi: s, args: o, logs: u, strict: l = !0 } = e,
            c = (() => {
              if (e.eventName)
                return Array.isArray(e.eventName) ? e.eventName : [e.eventName];
            })(),
            f = s
              .filter((e) => "event" === e.type)
              .map((e) => ({ abi: e, selector: (0, a.f)(e) }));
          return u
            .map((e) => {
              let a,
                s,
                u = "string" == typeof e.blockNumber ? (0, n.f)(e) : e,
                p = f.filter((e) => u.topics[0] === e.selector);
              if (0 === p.length) return null;
              for (let e of p)
                try {
                  ((a = d({ ...u, abi: [e.abi], strict: !0 })), (s = e));
                  break;
                } catch {}
              if (!a && !l) {
                s = p[0];
                try {
                  a = d({
                    data: u.data,
                    topics: u.topics,
                    abi: [s.abi],
                    strict: !1,
                  });
                } catch {
                  let e = s.abi.inputs?.some((e) => !("name" in e && e.name));
                  return { ...u, args: e ? [] : {}, eventName: s.abi.name };
                }
              }
              return a &&
                s &&
                (!c || c.includes(a.eventName)) &&
                (function (e) {
                  let { args: n, inputs: a, matchArgs: s } = e;
                  if (!s) return !0;
                  if (!n) return !1;
                  function o(e, n, a) {
                    try {
                      if ("address" === e.type) return (0, t.f)(n, a);
                      if ("string" === e.type || "bytes" === e.type)
                        return (0, i.f)((0, r.D)(n)) === a;
                      return n === a;
                    } catch {
                      return !1;
                    }
                  }
                  return Array.isArray(n) && Array.isArray(s)
                    ? s.every((e, t) => {
                        if (null == e) return !0;
                        let r = a[t];
                        return (
                          !!r &&
                          (Array.isArray(e) ? e : [e]).some((e) =>
                            o(r, e, n[t]),
                          )
                        );
                      })
                    : !(
                        "object" != typeof n ||
                        Array.isArray(n) ||
                        "object" != typeof s ||
                        Array.isArray(s)
                      ) &&
                        Object.entries(s).every(([e, t]) => {
                          if (null == t) return !0;
                          let r = a.find((t) => t.name === e);
                          return (
                            !!r &&
                            (Array.isArray(t) ? t : [t]).some((t) =>
                              o(r, t, n[e]),
                            )
                          );
                        });
                })({ args: a.args, inputs: s.abi.inputs, matchArgs: o })
                ? { ...a, ...u }
                : null;
            })
            .filter(Boolean);
        },
      ],
      616883,
    ));
};
