// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e, n, t) => {
  (Object.defineProperty(t, "__esModule", { value: !0 }),
    (t.normalizeFieldInfos = void 0));
  let r = e.r(18667),
    o = e.r(631268),
    a = e.r(138614);
  t.normalizeFieldInfos = function (e, n) {
    var t, s, i, m, l, u;
    let d,
      p = [];
    for (let c of "function" == typeof e ? e() : e) {
      if (
        ((c.localName = (0, o.localFieldName)(c.name, void 0 !== c.oneof)),
        (c.jsonName =
          null != (t = c.jsonName) ? t : (0, o.fieldJsonName)(c.name)),
        (c.repeated = null != (s = c.repeated) && s),
        "scalar" == c.kind && (c.L = null != (i = c.L) ? i : a.LongType.BIGINT),
        (c.delimited = null != (m = c.delimited) && m),
        (c.req = null != (l = c.req) && l),
        (c.opt = null != (u = c.opt) && u),
        void 0 === c.packed &&
          (n
            ? (c.packed =
                "enum" == c.kind ||
                ("scalar" == c.kind &&
                  c.T != a.ScalarType.BYTES &&
                  c.T != a.ScalarType.STRING))
            : (c.packed = !1)),
        void 0 !== c.oneof)
      ) {
        let e = "string" == typeof c.oneof ? c.oneof : c.oneof.name;
        ((d && d.name == e) || (d = new r.InternalOneofInfo(e)),
          (c.oneof = d),
          d.addField(c));
      }
      p.push(c);
    }
    return p;
  };
};
