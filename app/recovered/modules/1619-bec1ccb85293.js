// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  e.s(["r", () => n, "Q", () => r], 1619);
  var t = e.i(490831);
  function n(e, { includeName: a = !1 } = {}) {
    if ("function" !== e.type && "event" !== e.type && "error" !== e.type)
      throw new t.d(e.type);
    return `${e.name}(${r(e.inputs, { includeName: a })})`;
  }
  function r(e, { includeName: t = !1 } = {}) {
    return e
      ? e
          .map((e) =>
            (function (e, { includeName: t }) {
              return e.type.startsWith("tuple")
                ? `(${r(e.components, { includeName: t })})${e.type.slice(5)}`
                : e.type + (t && e.name ? ` ${e.name}` : "");
            })(e, { includeName: t }),
          )
          .join(t ? ", " : ",")
      : "";
  }
  function a(e, { strict: t = !0 } = {}) {
    return (
      !!e &&
      "string" == typeof e &&
      (t ? /^0x[0-9a-fA-F]*$/.test(e) : e.startsWith("0x"))
    );
  }
  (e.s(["f", 0, a], 715928),
    e.s(
      [
        "f",
        0,
        function (e) {
          return a(e, { strict: !1 })
            ? Math.ceil((e.length - 2) / 2)
            : e.length;
        },
      ],
      539788,
    ));
};
