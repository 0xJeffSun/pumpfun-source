// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  let t = {
      inputs: [{ name: "message", type: "string" }],
      name: "Error",
      type: "error",
    },
    f = {
      inputs: [{ name: "reason", type: "uint256" }],
      name: "Panic",
      type: "error",
    };
  e.s(
    [
      "o",
      0,
      {
        1: "An `assert` condition failed.",
        17: "Arithmetic operation resulted in underflow or overflow.",
        18: "Division or modulo by zero (e.g. `5 / 0` or `23 % 0`).",
        33: "Attempted to convert to an invalid type.",
        34: "Attempted to access a storage byte array that is incorrectly encoded.",
        49: "Performed `.pop()` on an empty array",
        50: "Array index is out of bounds.",
        65: "Allocated too much memory or created an array which is too large.",
        81: "Attempted to call a zero-initialized variable of internal function type.",
      },
      "T",
      0,
      t,
      "n",
      0,
      f,
    ],
    52764,
  );
  var a = e.i(76373),
    n = e.i(989494),
    r = e.i(964764),
    i = e.i(887857),
    b = e.i(515752);
  e.s(
    [
      "f",
      0,
      function (e) {
        let { abi: s, data: o } = e,
          c = (0, n.M)(o, 0, 4);
        if ("0x" === c) throw new a.g();
        let d = [...(s || []), t, f].find(
          (e) => "error" === e.type && c === (0, r.f)((0, b.r)(e)),
        );
        if (!d)
          throw new a.J(c, { docsPath: "/docs/contract/decodeErrorResult" });
        return {
          abiItem: d,
          args:
            "inputs" in d && d.inputs && d.inputs.length > 0
              ? (0, i.f)(d.inputs, (0, n.M)(o, 4))
              : void 0,
          errorName: d.name,
        };
      },
    ],
    773933,
  );
  var s = e.i(393547);
  e.s(
    [
      "f",
      0,
      function ({
        abiItem: e,
        args: t,
        includeFunctionName: f = !0,
        includeName: a = !1,
      }) {
        if ("name" in e && "inputs" in e && e.inputs)
          return `${f ? e.name : ""}(${e.inputs.map((e, f) => `${a && e.name ? `${e.name}: ` : ""}${"object" == typeof t[f] ? (0, s.f)(t[f]) : t[f]}`).join(", ")})`;
      },
    ],
    521567,
  );
};
