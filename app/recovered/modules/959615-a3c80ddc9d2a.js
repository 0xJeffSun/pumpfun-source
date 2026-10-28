// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(741947),
    n = e.i(641802),
    r = e.i(612164),
    i = e.i(346371),
    a = e.i(990834),
    s = e.i(730755);
  e.s(
    [
      "f",
      0,
      function (e) {
        let { abi: o, data: f, cause: c } = e,
          u = (0, r.M)(f, 0, 4);
        if ("0x" === u) throw new n.g({ cause: c });
        let d = [...(o || []), t.T, t.n].find(
          (e) => "error" === e.type && u === (0, i.f)((0, s.r)(e)),
        );
        if (!d)
          throw new n.J(u, {
            docsPath: "/docs/contract/decodeErrorResult",
            cause: c,
          });
        return {
          abiItem: d,
          args:
            "inputs" in d && d.inputs && d.inputs.length > 0
              ? (0, a.f)(d.inputs, (0, r.M)(f, 4))
              : void 0,
          errorName: d.name,
        };
      },
    ],
    959615,
  );
  let o = (e, t, n) =>
    JSON.stringify(
      e,
      (e, n) => {
        let r = "bigint" == typeof n ? n.toString() : n;
        return "function" == typeof t ? t(e, r) : r;
      },
      n,
    );
  (e.s(["f", 0, o], 225587),
    e.s(
      [
        "f",
        0,
        function ({
          abiItem: e,
          args: t,
          includeFunctionName: n = !0,
          includeName: r = !1,
        }) {
          if ("name" in e && "inputs" in e && e.inputs)
            return `${n ? e.name : ""}(${e.inputs.map((e, n) => `${r && e.name ? `${e.name}: ` : ""}${"object" == typeof t[n] ? o(t[n]) : t[n]}`).join(", ")})`;
        },
      ],
      369483,
    ));
};
