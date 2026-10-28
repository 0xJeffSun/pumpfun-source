// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  e.s([
    "f",
    0,
    function ({ blob: e, fileName: t }) {
      let r = URL.createObjectURL(e),
        n = document.createElement("a");
      if ("download" in n) {
        ((n.href = r),
          (n.download = t),
          (n.rel = "noopener"),
          (n.style.display = "none"),
          document.body.appendChild(n));
        try {
          n.click();
        } finally {
          (n.remove(), setTimeout(() => URL.revokeObjectURL(r), 1e4));
        }
        return "download";
      }
      if (!window.open(r, "_blank", "noopener"))
        throw (
          URL.revokeObjectURL(r),
          Error("download blocked: no download attribute and popup denied")
        );
      return (setTimeout(() => URL.revokeObjectURL(r), 6e4), "opened");
    },
  ]);
};
