// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(927974);
  class r extends t.f {
    constructor({ docsPath: e } = {}) {
      super(
        "Could not find an Account to execute with this Action.\nPlease provide an Account with the `account` argument on the Action, or by supplying an `account` to the Client.",
        { docsPath: e, docsSlug: "account", name: "AccountNotFoundError" },
      );
    }
  }
  class n extends t.f {
    constructor({ docsPath: e, metaMessages: t, type: r }) {
      super(`Account type "${r}" is not supported.`, {
        docsPath: e,
        metaMessages: t,
        name: "AccountTypeNotSupportedError",
      });
    }
  }
  e.s(["A", 0, r, "c", 0, n]);
};
