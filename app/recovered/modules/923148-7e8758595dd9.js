// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(641802),
    n = e.i(520417),
    r = e.i(858042),
    i = e.i(404820),
    a = e.i(346371);
  e.s([
    "f",
    0,
    function (e) {
      let s,
        { abi: o, args: f = [], name: c } = e,
        u = (0, n.f)(c, { strict: !1 }),
        d = o.filter((e) =>
          u
            ? "function" === e.type
              ? (0, a.f)(e) === c
              : "event" === e.type && (0, i.f)(e) === c
            : "name" in e && e.name === c,
        );
      if (0 !== d.length) {
        if (1 === d.length) return d[0];
        for (let e of d) {
          if ("inputs" in e) {
            if (!f || 0 === f.length) {
              if (!e.inputs || 0 === e.inputs.length) return e;
              continue;
            }
            if (
              e.inputs &&
              0 !== e.inputs.length &&
              e.inputs.length === f.length &&
              f.every((t, n) => {
                let i = "inputs" in e && e.inputs[n];
                return (
                  !!i &&
                  (function e(t, n) {
                    let i = typeof t,
                      a = n.type;
                    switch (a) {
                      case "address":
                        return (0, r.f)(t, { strict: !1 });
                      case "bool":
                        return "boolean" === i;
                      case "function":
                      case "string":
                        return "string" === i;
                      default:
                        if ("tuple" === a && "components" in n)
                          return Object.values(n.components).every(
                            (n, r) =>
                              "object" === i && e(Object.values(t)[r], n),
                          );
                        if (
                          /^u?int(8|16|24|32|40|48|56|64|72|80|88|96|104|112|120|128|136|144|152|160|168|176|184|192|200|208|216|224|232|240|248|256)?$/.test(
                            a,
                          )
                        )
                          return "number" === i || "bigint" === i;
                        if (/^bytes([1-9]|1[0-9]|2[0-9]|3[0-2])?$/.test(a))
                          return "string" === i || t instanceof Uint8Array;
                        if (/[a-z]+[1-9]{0,3}(\[[0-9]{0,}\])+$/.test(a))
                          return (
                            Array.isArray(t) &&
                            t.every((t) =>
                              e(t, {
                                ...n,
                                type: a.replace(/(\[[0-9]{0,}\])$/, ""),
                              }),
                            )
                          );
                        return !1;
                    }
                  })(t, i)
                );
              })
            ) {
              if (s && "inputs" in s && s.inputs) {
                let n = (function e(t, n, i) {
                  for (let a in t) {
                    let s = t[a],
                      o = n[a];
                    if (
                      "tuple" === s.type &&
                      "tuple" === o.type &&
                      "components" in s &&
                      "components" in o
                    )
                      return e(s.components, o.components, i[a]);
                    let f = [s.type, o.type];
                    if (
                      (f.includes("address") && f.includes("bytes20")) ||
                      (((f.includes("address") && f.includes("string")) ||
                        (f.includes("address") && f.includes("bytes"))) &&
                        (0, r.f)(i[a], { strict: !1 }))
                    )
                      return f;
                  }
                })(e.inputs, s.inputs, f);
                if (n)
                  throw new t.r(
                    { abiItem: e, type: n[0] },
                    { abiItem: s, type: n[1] },
                  );
              }
              s = e;
            }
          }
        }
        return s || d[0];
      }
    },
  ]);
};
