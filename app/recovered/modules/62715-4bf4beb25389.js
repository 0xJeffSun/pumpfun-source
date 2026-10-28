// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e, n, t) => {
  (Object.defineProperty(t, "__esModule", { value: !0 }),
    (t.makeUtilCommon = void 0));
  let r = e.r(698002),
    o = e.r(90281),
    a = e.r(138614),
    s = e.r(503158);
  function i(e) {
    if (void 0 === e) return e;
    if ((0, s.isMessage)(e)) return e.clone();
    if (e instanceof Uint8Array) {
      let n = new Uint8Array(e.byteLength);
      return (n.set(e), n);
    }
    return e;
  }
  function m(e) {
    return e instanceof Uint8Array ? e : new Uint8Array(e);
  }
  t.makeUtilCommon = function () {
    return {
      setEnumType: r.setEnumType,
      initPartial(e, n) {
        if (void 0 !== e)
          for (let t of n.getType().fields.byMember()) {
            let r = t.localName;
            if (null != e[r])
              switch (t.kind) {
                case "oneof":
                  let o = e[r].case;
                  if (void 0 === o) continue;
                  let i = t.findField(o),
                    l = e[r].value;
                  (i && "message" == i.kind && !(0, s.isMessage)(l, i.T)
                    ? (l = new i.T(l))
                    : i &&
                      "scalar" === i.kind &&
                      i.T === a.ScalarType.BYTES &&
                      (l = m(l)),
                    (n[r] = { case: o, value: l }));
                  break;
                case "scalar":
                case "enum":
                  let u = e[r];
                  (t.T === a.ScalarType.BYTES &&
                    (u = t.repeated ? u.map(m) : m(u)),
                    (n[r] = u));
                  break;
                case "map":
                  switch (t.V.kind) {
                    case "scalar":
                    case "enum":
                      if (t.V.T === a.ScalarType.BYTES)
                        for (let [t, o] of Object.entries(e[r])) n[r][t] = m(o);
                      else Object.assign(n[r], e[r]);
                      break;
                    case "message":
                      let d = t.V.T;
                      for (let t of Object.keys(e[r])) {
                        let o = e[r][t];
                        (d.fieldWrapper || (o = new d(o)), (n[r][t] = o));
                      }
                  }
                  break;
                case "message":
                  let p = t.T;
                  if (t.repeated)
                    n[r] = e[r].map((e) =>
                      (0, s.isMessage)(e, p) ? e : new p(e),
                    );
                  else {
                    let t = e[r];
                    p.fieldWrapper
                      ? "google.protobuf.BytesValue" === p.typeName
                        ? (n[r] = m(t))
                        : (n[r] = t)
                      : (n[r] = (0, s.isMessage)(t, p) ? t : new p(t));
                  }
              }
          }
      },
      equals: (e, n, t) =>
        n === t ||
        (!!n &&
          !!t &&
          e.fields.byMember().every((e) => {
            let r = n[e.localName],
              i = t[e.localName];
            if (e.repeated) {
              if (r.length !== i.length) return !1;
              switch (e.kind) {
                case "message":
                  return r.every((n, t) => e.T.equals(n, i[t]));
                case "scalar":
                  return r.every((n, t) => (0, o.scalarEquals)(e.T, n, i[t]));
                case "enum":
                  return r.every((e, n) =>
                    (0, o.scalarEquals)(a.ScalarType.INT32, e, i[n]),
                  );
              }
              throw Error(`repeated cannot contain ${e.kind}`);
            }
            switch (e.kind) {
              case "message":
                let m = r,
                  l = i;
                return (
                  e.T.fieldWrapper &&
                    (void 0 === m ||
                      (0, s.isMessage)(m) ||
                      (m = e.T.fieldWrapper.wrapField(m)),
                    void 0 === l ||
                      (0, s.isMessage)(l) ||
                      (l = e.T.fieldWrapper.wrapField(l))),
                  e.T.equals(m, l)
                );
              case "enum":
                return (0, o.scalarEquals)(a.ScalarType.INT32, r, i);
              case "scalar":
                return (0, o.scalarEquals)(e.T, r, i);
              case "oneof":
                if (r.case !== i.case) return !1;
                let u = e.findField(r.case);
                if (void 0 === u) return !0;
                switch (u.kind) {
                  case "message":
                    return u.T.equals(r.value, i.value);
                  case "enum":
                    return (0, o.scalarEquals)(
                      a.ScalarType.INT32,
                      r.value,
                      i.value,
                    );
                  case "scalar":
                    return (0, o.scalarEquals)(u.T, r.value, i.value);
                }
                throw Error(`oneof cannot contain ${u.kind}`);
              case "map":
                let d = Object.keys(r).concat(Object.keys(i));
                switch (e.V.kind) {
                  case "message":
                    let p = e.V.T;
                    return d.every((e) => p.equals(r[e], i[e]));
                  case "enum":
                    return d.every((e) =>
                      (0, o.scalarEquals)(a.ScalarType.INT32, r[e], i[e]),
                    );
                  case "scalar":
                    let c = e.V.T;
                    return d.every((e) => (0, o.scalarEquals)(c, r[e], i[e]));
                }
            }
          })),
      clone(e) {
        let n = e.getType(),
          t = new n();
        for (let r of n.fields.byMember()) {
          let n,
            o = e[r.localName];
          if (r.repeated) n = o.map(i);
          else if ("map" == r.kind)
            for (let [e, a] of ((n = t[r.localName]), Object.entries(o)))
              n[e] = i(a);
          else
            n =
              "oneof" == r.kind
                ? r.findField(o.case)
                  ? { case: o.case, value: i(o.value) }
                  : { case: void 0 }
                : i(o);
          t[r.localName] = n;
        }
        for (let r of n.runtime.bin.listUnknownFields(e))
          n.runtime.bin.onUnknownField(t, r.no, r.wireType, r.data);
        return t;
      },
    };
  };
};
