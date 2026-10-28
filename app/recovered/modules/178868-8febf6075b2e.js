// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(76373),
    f = e.i(470083),
    a = e.i(4911);
  let n = e.i(808387).f;
  e.s(["f", 0, n], 624097);
  var r = e.i(964764);
  e.s(
    [
      "f",
      0,
      function (e) {
        let i,
          { abi: b, args: s = [], name: o } = e,
          c = (0, f.f)(o, { strict: !1 }),
          d = b.filter((e) =>
            c
              ? "function" === e.type
                ? (0, r.f)(e) === o
                : "event" === e.type && n(e) === o
              : "name" in e && e.name === o,
          );
        if (0 !== d.length) {
          if (1 === d.length) return d[0];
          for (let e of d) {
            if ("inputs" in e) {
              if (!s || 0 === s.length) {
                if (!e.inputs || 0 === e.inputs.length) return e;
                continue;
              }
              if (
                e.inputs &&
                0 !== e.inputs.length &&
                e.inputs.length === s.length &&
                s.every((t, f) => {
                  let n = "inputs" in e && e.inputs[f];
                  return (
                    !!n &&
                    (function e(t, f) {
                      let n = typeof t,
                        r = f.type;
                      switch (r) {
                        case "address":
                          return (0, a.f)(t, { strict: !1 });
                        case "bool":
                          return "boolean" === n;
                        case "function":
                        case "string":
                          return "string" === n;
                        default:
                          if ("tuple" === r && "components" in f)
                            return Object.values(f.components).every((f, a) =>
                              e(Object.values(t)[a], f),
                            );
                          if (
                            /^u?int(8|16|24|32|40|48|56|64|72|80|88|96|104|112|120|128|136|144|152|160|168|176|184|192|200|208|216|224|232|240|248|256)?$/.test(
                              r,
                            )
                          )
                            return "number" === n || "bigint" === n;
                          if (/^bytes([1-9]|1[0-9]|2[0-9]|3[0-2])?$/.test(r))
                            return "string" === n || t instanceof Uint8Array;
                          if (/[a-z]+[1-9]{0,3}(\[[0-9]{0,}\])+$/.test(r))
                            return (
                              Array.isArray(t) &&
                              t.every((t) =>
                                e(t, {
                                  ...f,
                                  type: r.replace(/(\[[0-9]{0,}\])$/, ""),
                                }),
                              )
                            );
                          return !1;
                      }
                    })(t, n)
                  );
                })
              ) {
                if (i && "inputs" in i && i.inputs) {
                  let f = (function e(t, f, n) {
                    for (let r in t) {
                      let i = t[r],
                        b = f[r];
                      if (
                        "tuple" === i.type &&
                        "tuple" === b.type &&
                        "components" in i &&
                        "components" in b
                      )
                        return e(i.components, b.components, n[r]);
                      let s = [i.type, b.type];
                      if (
                        (s.includes("address") && s.includes("bytes20")) ||
                        (((s.includes("address") && s.includes("string")) ||
                          (s.includes("address") && s.includes("bytes"))) &&
                          (0, a.f)(n[r], { strict: !1 }))
                      )
                        return s;
                    }
                  })(e.inputs, i.inputs, s);
                  if (f)
                    throw new t.r(
                      { abiItem: e, type: f[0] },
                      { abiItem: i, type: f[1] },
                    );
                }
                i = e;
              }
            }
          }
          return i || d[0];
        }
      },
    ],
    178868,
  );
};
