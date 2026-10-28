// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e, t, n) => {
  (Object.defineProperty(n, "__esModule", { value: !0 }),
    Object.defineProperty(n, "InvariantError", {
      enumerable: !0,
      get: function () {
        return r;
      },
    }));
  class r extends Error {
    constructor(e, t) {
      (super(
        `Invariant: ${e.endsWith(".") ? e : e + "."} This is a bug in Next.js.`,
        t,
      ),
        (this.name = "InvariantError"));
    }
  }
};
