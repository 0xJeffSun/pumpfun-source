// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e, n, t) => {
  (Object.defineProperty(t, "__esModule", { value: !0 }),
    (t.toPlainMessage = void 0));
  let r = e.r(503158);
  function o(e) {
    if (!(0, r.isMessage)(e)) return e;
    let n = e.getType(),
      t = {};
    for (let r of n.fields.byMember()) {
      let n,
        o = e[r.localName];
      if (r.repeated) n = o.map((e) => a(e));
      else if ("map" == r.kind)
        for (let [e, t] of ((n = {}), Object.entries(o))) n[e] = a(t);
      else
        n =
          "oneof" == r.kind
            ? r.findField(o.case)
              ? { case: o.case, value: a(o.value) }
              : { case: void 0 }
            : a(o);
      t[r.localName] = n;
    }
    return t;
  }
  function a(e) {
    if (void 0 === e) return e;
    if ((0, r.isMessage)(e)) return o(e);
    if (e instanceof Uint8Array) {
      let n = new Uint8Array(e.byteLength);
      return (n.set(e), n);
    }
    return e;
  }
  t.toPlainMessage = o;
};
