// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e, n, t) => {
  (Object.defineProperty(t, "__esModule", { value: !0 }),
    (t.hasExtension =
      t.clearExtension =
      t.setExtension =
      t.getExtension =
        void 0));
  let r = e.r(740640),
    o = e.r(842572);
  function a(e, n) {
    let t = e.getType();
    return (
      n.extendee.typeName === t.typeName &&
      !!t.runtime.bin.listUnknownFields(e).find((e) => e.no == n.field.no)
    );
  }
  function s(e, n) {
    (0, r.assert)(
      e.extendee.typeName == n.getType().typeName,
      `extension ${e.typeName} can only be applied to message ${e.extendee.typeName}`,
    );
  }
  ((t.getExtension = function (e, n, t) {
    s(n, e);
    let r = n.runtime.bin.makeReadOptions(t),
      a = (0, o.filterUnknownFields)(
        e.getType().runtime.bin.listUnknownFields(e),
        n.field,
      ),
      [i, m] = (0, o.createExtensionContainer)(n);
    for (let e of a)
      n.runtime.bin.readField(
        i,
        r.readerFactory(e.data),
        n.field,
        e.wireType,
        r,
      );
    return m();
  }),
    (t.setExtension = function (e, n, t, r) {
      s(n, e);
      let o = n.runtime.bin.makeReadOptions(r),
        i = n.runtime.bin.makeWriteOptions(r);
      if (a(e, n)) {
        let t = e
          .getType()
          .runtime.bin.listUnknownFields(e)
          .filter((e) => e.no != n.field.no);
        for (let n of (e.getType().runtime.bin.discardUnknownFields(e), t))
          e.getType().runtime.bin.onUnknownField(e, n.no, n.wireType, n.data);
      }
      let m = i.writerFactory(),
        l = n.field;
      (l.opt ||
        l.repeated ||
        ("enum" != l.kind && "scalar" != l.kind) ||
        (l = Object.assign(Object.assign({}, n.field), { opt: !0 })),
        n.runtime.bin.writeField(l, t, m, i));
      let u = o.readerFactory(m.finish());
      for (; u.pos < u.len; ) {
        let [n, t] = u.tag(),
          r = u.skip(t, n);
        e.getType().runtime.bin.onUnknownField(e, n, t, r);
      }
    }),
    (t.clearExtension = function (e, n) {
      if ((s(n, e), a(e, n))) {
        let t = e.getType().runtime.bin,
          r = t.listUnknownFields(e).filter((e) => e.no != n.field.no);
        for (let n of (t.discardUnknownFields(e), r))
          t.onUnknownField(e, n.no, n.wireType, n.data);
      }
    }),
    (t.hasExtension = a));
};
