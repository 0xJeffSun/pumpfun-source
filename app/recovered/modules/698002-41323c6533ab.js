// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e, n, t) => {
  (Object.defineProperty(t, "__esModule", { value: !0 }),
    (t.makeEnum = t.makeEnumType = t.setEnumType = t.getEnumType = void 0));
  let r = e.r(740640),
    o = Symbol("@bufbuild/protobuf/enum-type");
  function a(e, n, t, r) {
    e[o] = s(
      n,
      t.map((n) => ({ no: n.no, name: n.name, localName: e[n.no] })),
      r,
    );
  }
  function s(e, n, t) {
    let r = Object.create(null),
      o = Object.create(null),
      a = [];
    for (let e of n) {
      let n = i(e);
      (a.push(n), (r[e.name] = n), (o[e.no] = n));
    }
    return {
      typeName: e,
      values: a,
      findName: (e) => r[e],
      findNumber: (e) => o[e],
    };
  }
  function i(e) {
    return "localName" in e
      ? e
      : Object.assign(Object.assign({}, e), { localName: e.name });
  }
  ((t.getEnumType = function (e) {
    let n = e[o];
    return ((0, r.assert)(n, "missing enum type on enum object"), n);
  }),
    (t.setEnumType = a),
    (t.makeEnumType = s),
    (t.makeEnum = function (e, n, t) {
      let r = {};
      for (let e of n) {
        let n = i(e);
        ((r[n.localName] = n.no), (r[n.no] = n.localName));
      }
      return (a(r, e, n, t), r);
    }));
};
