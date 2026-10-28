// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e, n, t) => {
  (Object.defineProperty(t, "__esModule", { value: !0 }),
    (t.isMessage = void 0));
  let r = e.r(934682);
  t.isMessage = function (e, n) {
    if (
      null === e ||
      "object" != typeof e ||
      !Object.getOwnPropertyNames(r.Message.prototype).every(
        (n) => n in e && "function" == typeof e[n],
      )
    )
      return !1;
    let t = e.getType();
    return (
      null !== t &&
      "function" == typeof t &&
      "typeName" in t &&
      "string" == typeof t.typeName &&
      (void 0 === n || t.typeName == n.typeName)
    );
  };
};
