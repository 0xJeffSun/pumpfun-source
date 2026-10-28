// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e, n, t) => {
  function r(e, n) {
    let r = a(e);
    return n ? r : (0, t.safeObjectProperty)(u(r));
  }
  function o(e) {
    return r(e, !1);
  }
  function a(e) {
    let n = !1,
      t = [];
    for (let r = 0; r < e.length; r++) {
      let o = e.charAt(r);
      switch (o) {
        case "_":
          n = !0;
          break;
        case "0":
        case "1":
        case "2":
        case "3":
        case "4":
        case "5":
        case "6":
        case "7":
        case "8":
        case "9":
          (t.push(o), (n = !1));
          break;
        default:
          (n && ((n = !1), (o = o.toUpperCase())), t.push(o));
      }
    }
    return t.join("");
  }
  (Object.defineProperty(t, "__esModule", { value: !0 }),
    (t.safeIdentifier =
      t.safeObjectProperty =
      t.findEnumSharedPrefix =
      t.fieldJsonName =
      t.localOneofName =
      t.localFieldName =
      t.localName =
        void 0),
    (t.localName = function (e) {
      switch (e.kind) {
        case "field":
          return r(e.name, void 0 !== e.oneof);
        case "oneof":
          return o(e.name);
        case "enum":
        case "message":
        case "service":
        case "extension": {
          let n = e.file.proto.package,
            r = void 0 === n ? 0 : n.length + 1,
            o = e.typeName.substring(r).replace(/\./g, "_");
          return (0, t.safeObjectProperty)((0, t.safeIdentifier)(o));
        }
        case "enum_value": {
          let n = e.name,
            r = e.parent.sharedPrefix;
          return (
            void 0 !== r && (n = n.substring(r.length)),
            (0, t.safeObjectProperty)(n)
          );
        }
        case "rpc": {
          let n = e.name;
          if (0 == n.length) return n;
          return (
            (n = n[0].toLowerCase() + n.substring(1)),
            (0, t.safeObjectProperty)(n)
          );
        }
      }
    }),
    (t.localFieldName = r),
    (t.localOneofName = o),
    (t.fieldJsonName = a),
    (t.findEnumSharedPrefix = function (e, n) {
      var t;
      let r =
        (
          (t = e).substring(0, 1) +
          t.substring(1).replace(/[A-Z]/g, (e) => "_" + e)
        ).toLowerCase() + "_";
      for (let e of n) {
        if (!e.toLowerCase().startsWith(r)) return;
        let n = e.substring(r.length);
        if (0 == n.length || /^\d/.test(n)) return;
      }
      return r;
    }));
  let s = new Set([
      "break",
      "case",
      "catch",
      "class",
      "const",
      "continue",
      "debugger",
      "default",
      "delete",
      "do",
      "else",
      "export",
      "extends",
      "false",
      "finally",
      "for",
      "function",
      "if",
      "import",
      "in",
      "instanceof",
      "new",
      "null",
      "return",
      "super",
      "switch",
      "this",
      "throw",
      "true",
      "try",
      "typeof",
      "var",
      "void",
      "while",
      "with",
      "yield",
      "enum",
      "implements",
      "interface",
      "let",
      "package",
      "private",
      "protected",
      "public",
      "static",
      "Object",
      "bigint",
      "number",
      "boolean",
      "string",
      "object",
      "globalThis",
      "Uint8Array",
      "Partial",
    ]),
    i = new Set(["constructor", "toString", "toJSON", "valueOf"]),
    m = new Set([
      "getType",
      "clone",
      "equals",
      "fromBinary",
      "fromJson",
      "fromJsonString",
      "toBinary",
      "toJson",
      "toJsonString",
      "toObject",
    ]),
    l = (e) => `${e}$`,
    u = (e) => (m.has(e) ? l(e) : e);
  ((t.safeObjectProperty = (e) => (i.has(e) ? l(e) : e)),
    (t.safeIdentifier = (e) => (s.has(e) ? l(e) : e)));
};
