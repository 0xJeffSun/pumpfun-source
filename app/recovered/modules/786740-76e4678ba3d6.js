// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(63289);
  let r = async (e, r) => {
      try {
        navigator.clipboard
          ? (await navigator.clipboard.writeText(e),
            t.c.success(r || "Copied to clipboard"))
          : t.c.error("Clipboard not available on this device");
      } catch (e) {
        (console.error("Failed to copy to clipboard:", e),
          t.c.error("Failed to copy"));
      }
    },
    n = async (e) => {
      await r(e, "Address copied to clipboard");
    };
  e.s(["d", 0, n, "W", 0, r]);
};
