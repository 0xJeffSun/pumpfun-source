// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  e.s([
    "f",
    0,
    function (e, { strict: t = !0 } = {}) {
      return (
        !!e &&
        "string" == typeof e &&
        (t ? /^0x[0-9a-fA-F]*$/.test(e) : e.startsWith("0x"))
      );
    },
  ]);
};
