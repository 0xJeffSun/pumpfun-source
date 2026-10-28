// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(602484),
    n = e.i(490831),
    r = e.i(612684),
    a = e.i(135378),
    i = e.i(797312),
    s = e.i(1619);
  e.s(
    [
      "f",
      0,
      function (e) {
        let { abi: o, data: f } = e,
          c = (0, r.M)(f, 0, 4);
        if ("0x" === c) throw new n.g();
        let u = [...(o || []), t.T, t.n].find(
          (e) => "error" === e.type && c === (0, a.f)((0, s.r)(e)),
        );
        if (!u)
          throw new n.J(c, { docsPath: "/docs/contract/decodeErrorResult" });
        return {
          abiItem: u,
          args:
            "inputs" in u && u.inputs && u.inputs.length > 0
              ? (0, i.f)(u.inputs, (0, r.M)(f, 4))
              : void 0,
          errorName: u.name,
        };
      },
    ],
    120110,
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
  (e.s(["f", 0, o], 26566),
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
      80495,
    ));
};
