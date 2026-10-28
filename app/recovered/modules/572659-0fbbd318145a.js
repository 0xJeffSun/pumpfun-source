// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(548801);
  class n extends t.f {
    constructor({ address: e }) {
      super(`Address "${e}" is invalid.`, {
        metaMessages: [
          "- Address must be a hex value of 20 bytes (40 hex characters).",
          "- Address must match its checksum counterpart.",
        ],
        name: "InvalidAddressError",
      });
    }
  }
  e.s(["f", 0, n]);
};
