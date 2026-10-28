// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e, n, t) => {
  (Object.defineProperty(t, "__esModule", { value: !0 }), (t.proto3 = void 0));
  let r = e.r(570148),
    o = e.r(856790),
    a = e.r(90281),
    s = e.r(442516);
  t.proto3 = (0, r.makeProtoRuntime)(
    "proto3",
    (e) => new o.InternalFieldList(e, (e) => (0, s.normalizeFieldInfos)(e, !0)),
    (e) => {
      for (let n of e.getType().fields.byMember()) {
        if (n.opt) continue;
        let t = n.localName;
        if (n.repeated) {
          e[t] = [];
          continue;
        }
        switch (n.kind) {
          case "oneof":
            e[t] = { case: void 0 };
            break;
          case "enum":
            e[t] = 0;
            break;
          case "map":
            e[t] = {};
            break;
          case "scalar":
            e[t] = (0, a.scalarZeroValue)(n.T, n.L);
        }
      }
    },
  );
};
