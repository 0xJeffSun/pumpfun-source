// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(t) => {
  var e = t.i(532617);
  class n extends e.f {
    constructor({ address: t }) {
      super(`Address "${t}" is invalid.`, {
        metaMessages: [
          "- Address must be a hex value of 20 bytes (40 hex characters).",
          "- Address must match its checksum counterpart.",
        ],
        name: "InvalidAddressError",
      });
    }
  }
  t.s(["f", 0, n]);
};
