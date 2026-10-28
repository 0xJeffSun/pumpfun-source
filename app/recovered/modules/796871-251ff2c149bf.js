// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e, n, t) => {
  (Object.defineProperty(t, "__esModule", { value: !0 }),
    (t.makeMessageType = void 0));
  let r = e.r(934682);
  t.makeMessageType = function (e, n, t, o) {
    var a;
    let s =
        null != (a = null == o ? void 0 : o.localName)
          ? a
          : n.substring(n.lastIndexOf(".") + 1),
      i = {
        [s]: function (n) {
          (e.util.initFields(this), e.util.initPartial(n, this));
        },
      }[s];
    return (
      Object.setPrototypeOf(i.prototype, new r.Message()),
      Object.assign(i, {
        runtime: e,
        typeName: n,
        fields: e.util.newFieldList(t),
        fromBinary: (e, n) => new i().fromBinary(e, n),
        fromJson: (e, n) => new i().fromJson(e, n),
        fromJsonString: (e, n) => new i().fromJsonString(e, n),
        equals: (n, t) => e.util.equals(i, n, t),
      }),
      i
    );
  };
};
