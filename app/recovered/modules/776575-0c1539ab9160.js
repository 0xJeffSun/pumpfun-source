// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e, n, t) => {
  function r(...e) {
    let n = {},
      t = {},
      o = {},
      a = new Map(),
      s = new Map(),
      i = {
        findMessage: (e) => n[e],
        findEnum: (e) => t[e],
        findService: (e) => o[e],
        findExtensionFor(e, n) {
          var t, r;
          return null != (r = null == (t = s.get(e)) ? void 0 : t.get(n))
            ? r
            : void 0;
        },
        findExtension(e) {
          var n;
          return null != (n = a.get(e)) ? n : void 0;
        },
        add(e) {
          var r;
          if ("fields" in e)
            this.findMessage(e.typeName) ||
              ((n[e.typeName] = e), e.fields.list().forEach(m));
          else if ("methods" in e) {
            if (!this.findService(e.typeName))
              for (let n of ((o[e.typeName] = e), Object.values(e.methods)))
                (this.add(n.I), this.add(n.O));
          } else if ("extendee" in e) {
            if (!a.has(e.typeName)) {
              a.set(e.typeName, e);
              let n = e.extendee.typeName;
              (s.has(n) || s.set(n, new Map()),
                null == (r = s.get(n)) || r.set(e.field.no, e),
                this.add(e.extendee),
                m(e.field));
            }
          } else t[e.typeName] = e;
        },
      };
    function m(e) {
      "message" == e.kind
        ? i.add(e.T)
        : "map" == e.kind && "message" == e.V.kind
          ? i.add(e.V.T)
          : "enum" == e.kind && i.add(e.T);
    }
    for (let n of e) i.add(n);
    return i;
  }
  (Object.defineProperty(t, "__esModule", { value: !0 }),
    (t.createMutableRegistry = t.createRegistry = void 0),
    (t.createRegistry = function (...e) {
      let n = r(...e);
      return (delete n.add, n);
    }),
    (t.createMutableRegistry = r));
};
