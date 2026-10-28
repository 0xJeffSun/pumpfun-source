// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e, n, t) => {
  (Object.defineProperty(t, "__esModule", { value: !0 }),
    (t.clearField = t.isFieldSet = void 0));
  let r = e.r(90281);
  ((t.isFieldSet = function (e, n) {
    let t = e.localName;
    if (e.repeated) return n[t].length > 0;
    if (e.oneof) return n[e.oneof.localName].case === t;
    switch (e.kind) {
      case "enum":
      case "scalar":
        if (e.opt || e.req) return void 0 !== n[t];
        if ("enum" == e.kind) return n[t] !== e.T.values[0].no;
        return !(0, r.isScalarZeroValue)(e.T, n[t]);
      case "message":
        return void 0 !== n[t];
      case "map":
        return Object.keys(n[t]).length > 0;
    }
  }),
    (t.clearField = function (e, n) {
      let t = e.localName,
        o = !e.opt && !e.req;
      if (e.repeated) n[t] = [];
      else if (e.oneof) n[e.oneof.localName] = { case: void 0 };
      else
        switch (e.kind) {
          case "map":
            n[t] = {};
            break;
          case "enum":
            n[t] = o ? e.T.values[0].no : void 0;
            break;
          case "scalar":
            n[t] = o ? (0, r.scalarZeroValue)(e.T, e.L) : void 0;
            break;
          case "message":
            n[t] = void 0;
        }
    }));
};
