// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e, n, t) => {
  (Object.defineProperty(t, "__esModule", { value: !0 }), (t.proto2 = void 0));
  let r = e.r(570148),
    o = e.r(856790),
    a = e.r(442516);
  t.proto2 = (0, r.makeProtoRuntime)(
    "proto2",
    (e) => new o.InternalFieldList(e, (e) => (0, a.normalizeFieldInfos)(e, !1)),
    (e) => {
      for (let n of e.getType().fields.byMember()) {
        let t = n.localName;
        if (n.repeated) {
          e[t] = [];
          continue;
        }
        switch (n.kind) {
          case "oneof":
            e[t] = { case: void 0 };
            break;
          case "map":
            e[t] = {};
        }
      }
    },
  );
};
