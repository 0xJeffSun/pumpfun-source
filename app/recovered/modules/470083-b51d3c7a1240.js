// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(t) => {
  t.s([
    "f",
    0,
    function (t, { strict: e = !0 } = {}) {
      return (
        !!t &&
        "string" == typeof t &&
        (e ? /^0x[0-9a-fA-F]*$/.test(t) : t.startsWith("0x"))
      );
    },
  ]);
};
