// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(490831),
    n = e.i(715928),
    r = e.i(821292),
    a = e.i(651012),
    i = e.i(135378);
  e.s([
    "f",
    0,
    function (e) {
      let s,
        { abi: o, args: f = [], name: c } = e,
        u = (0, n.f)(c, { strict: !1 }),
        l = o.filter((e) =>
          u
            ? "function" === e.type
              ? (0, i.f)(e) === c
              : "event" === e.type && (0, a.f)(e) === c
            : "name" in e && e.name === c,
        );
      if (0 !== l.length) {
        if (1 === l.length) return l[0];
        for (let e of l) {
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
                let a = "inputs" in e && e.inputs[n];
                return (
                  !!a &&
                  (function e(t, n) {
                    let a = typeof t,
                      i = n.type;
                    switch (i) {
                      case "address":
                        return (0, r.f)(t, { strict: !1 });
                      case "bool":
                        return "boolean" === a;
                      case "function":
                      case "string":
                        return "string" === a;
                      default:
                        if ("tuple" === i && "components" in n)
                          return Object.values(n.components).every((n, r) =>
                            e(Object.values(t)[r], n),
                          );
                        if (
                          /^u?int(8|16|24|32|40|48|56|64|72|80|88|96|104|112|120|128|136|144|152|160|168|176|184|192|200|208|216|224|232|240|248|256)?$/.test(
                            i,
                          )
                        )
                          return "number" === a || "bigint" === a;
                        if (/^bytes([1-9]|1[0-9]|2[0-9]|3[0-2])?$/.test(i))
                          return "string" === a || t instanceof Uint8Array;
                        if (/[a-z]+[1-9]{0,3}(\[[0-9]{0,}\])+$/.test(i))
                          return (
                            Array.isArray(t) &&
                            t.every((t) =>
                              e(t, {
                                ...n,
                                type: i.replace(/(\[[0-9]{0,}\])$/, ""),
                              }),
                            )
                          );
                        return !1;
                    }
                  })(t, a)
                );
              })
            ) {
              if (s && "inputs" in s && s.inputs) {
                let n = (function e(t, n, a) {
                  for (let i in t) {
                    let s = t[i],
                      o = n[i];
                    if (
                      "tuple" === s.type &&
                      "tuple" === o.type &&
                      "components" in s &&
                      "components" in o
                    )
                      return e(s.components, o.components, a[i]);
                    let f = [s.type, o.type];
                    if (
                      (f.includes("address") && f.includes("bytes20")) ||
                      (((f.includes("address") && f.includes("string")) ||
                        (f.includes("address") && f.includes("bytes"))) &&
                        (0, r.f)(a[i], { strict: !1 }))
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
        return s || l[0];
      }
    },
  ]);
};
