// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e, n, t) => {
  (Object.defineProperty(t, "__esModule", { value: !0 }),
    (t.createFeatureResolver = void 0));
  let r = e.r(953124),
    o = e.r(955874);
  t.createFeatureResolver = function (e, n, t) {
    var a;
    let s,
      i =
        null != n
          ? n
          : r.FeatureSetDefaults.fromBinary(
              o.protoBase64.dec(
                "ChMY5gciACoMCAEQAhgCIAMoATACChMY5wciACoMCAIQARgBIAIoATABChMY6AciDAgBEAEYASACKAEwASoAIOYHKOgH",
              ),
              t,
            ),
      m = i.minimumEdition,
      l = i.maximumEdition;
    if (
      void 0 === m ||
      void 0 === l ||
      i.defaults.some((e) => void 0 === e.edition)
    )
      throw Error("Invalid FeatureSetDefaults");
    if (e < m)
      throw Error(
        `Edition ${r.Edition[e]} is earlier than the minimum supported edition ${r.Edition[m]}`,
      );
    if (l < e)
      throw Error(
        `Edition ${r.Edition[e]} is later than the maximum supported edition ${r.Edition[l]}`,
      );
    for (let n of i.defaults) {
      let t,
        o = null != (a = n.edition) ? a : 0;
      !(o > e) &&
        ((void 0 !== s && s.e > o) ||
          (n.fixedFeatures && n.overridableFeatures
            ? (t = n.fixedFeatures).fromBinary(n.overridableFeatures.toBinary())
            : (t = n.fixedFeatures
                ? n.fixedFeatures
                : n.overridableFeatures
                  ? n.overridableFeatures
                  : new r.FeatureSet()),
          (s = { e: o, f: t })));
    }
    if (void 0 === s)
      throw Error(`No valid default found for edition ${r.Edition[e]}`);
    let u = s.f.toBinary(t);
    return (...n) => {
      let o = r.FeatureSet.fromBinary(u, t);
      for (let e of n) void 0 !== e && o.fromBinary(e.toBinary(t), t);
      if (
        !(function (e) {
          for (let n of r.FeatureSet.fields.list()) {
            let t = e[n.localName];
            if (void 0 === t || ("enum" == n.kind && 0 === t)) return !1;
          }
          return !0;
        })(o)
      )
        throw Error(`Invalid FeatureSet for edition ${r.Edition[e]}`);
      return o;
    };
  };
};
