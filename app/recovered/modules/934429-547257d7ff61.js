// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(927974);
  class r extends t.f {
    constructor({ blockHash: e, blockNumber: t }) {
      let r = "Block";
      (e && (r = `Block at hash "${e}"`),
        t && (r = `Block at number "${t}"`),
        super(`${r} could not be found.`, { name: "BlockNotFoundError" }));
    }
  }
  e.s(["f", 0, r]);
};
