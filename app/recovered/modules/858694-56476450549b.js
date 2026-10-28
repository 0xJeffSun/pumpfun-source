// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e, t, r) => {
  (Object.defineProperty(r, "__esModule", { value: !0 }),
    (r.isContractError = r.ContractError = void 0));
  let o = e.r(525364);
  class n extends Error {
    constructor(e, t, r, n, s, a) {
      let i;
      (super(`${e} responded ${t}${(i = (0, o.domainCode)(r)) ? ` ${i}` : ""}`),
        (this.route = e),
        (this.status = t),
        (this.body = r),
        (this.data = n),
        (this.serverMessage = s),
        (this.name = "ContractError"),
        (this.code = (0, o.domainCode)(r)),
        (this.cause = a));
    }
    is(e) {
      return this.status === e;
    }
  }
  ((r.ContractError = n),
    (r.isContractError = (e, t) =>
      e instanceof n && (void 0 === t || e.route === t)));
};
