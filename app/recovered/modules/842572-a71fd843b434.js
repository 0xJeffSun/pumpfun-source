// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e, n, t) => {
  (Object.defineProperty(t, "__esModule", { value: !0 }),
    (t.filterUnknownFields =
      t.createExtensionContainer =
      t.makeExtension =
        void 0));
  let r = e.r(90281);
  ((t.makeExtension = function (e, n, t, r) {
    let o;
    return {
      typeName: n,
      extendee: t,
      get field() {
        if (!o) {
          let t = "function" == typeof r ? r() : r;
          ((t.name = n.split(".").pop()),
            (t.jsonName = `[${n}]`),
            (o = e.util.newFieldList([t]).list()[0]));
        }
        return o;
      },
      runtime: e,
    };
  }),
    (t.createExtensionContainer = function (e) {
      let n = e.field.localName,
        t = Object.create(null);
      return (
        (t[n] = (function (e) {
          let n = e.field;
          if (n.repeated) return [];
          if (void 0 !== n.default) return n.default;
          switch (n.kind) {
            case "enum":
              return n.T.values[0].no;
            case "scalar":
              return (0, r.scalarZeroValue)(n.T, n.L);
            case "message":
              let t = n.T,
                o = new t();
              return t.fieldWrapper ? t.fieldWrapper.unwrapField(o) : o;
            case "map":
              throw "map fields are not allowed to be extensions";
          }
        })(e)),
        [t, () => t[n]]
      );
    }),
    (t.filterUnknownFields = function (e, n) {
      if (!n.repeated && ("enum" == n.kind || "scalar" == n.kind)) {
        for (let t = e.length - 1; t >= 0; --t)
          if (e[t].no == n.no) return [e[t]];
        return [];
      }
      return e.filter((e) => e.no === n.no);
    }));
};
