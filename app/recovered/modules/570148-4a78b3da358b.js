// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e, n, t) => {
  (Object.defineProperty(t, "__esModule", { value: !0 }),
    (t.makeProtoRuntime = void 0));
  let r = e.r(698002),
    o = e.r(796871),
    a = e.r(842572),
    s = e.r(215858),
    i = e.r(787784),
    m = e.r(62715);
  t.makeProtoRuntime = function (e, n, t) {
    return {
      syntax: e,
      json: (0, s.makeJsonFormat)(),
      bin: (0, i.makeBinaryFormat)(),
      util: Object.assign(Object.assign({}, (0, m.makeUtilCommon)()), {
        newFieldList: n,
        initFields: t,
      }),
      makeMessageType(e, n, t) {
        return (0, o.makeMessageType)(this, e, n, t);
      },
      makeEnum: r.makeEnum,
      makeEnumType: r.makeEnumType,
      getEnumType: r.getEnumType,
      makeExtension(e, n, t) {
        return (0, a.makeExtension)(this, e, n, t);
      },
    };
  };
};
