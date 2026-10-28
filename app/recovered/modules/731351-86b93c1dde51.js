// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(t, e, r) => {
  ((r.L = { bit: 1 }),
    (r.M = { bit: 0 }),
    (r.Q = { bit: 3 }),
    (r.H = { bit: 2 }),
    (r.isValid = function (t) {
      return t && void 0 !== t.bit && t.bit >= 0 && t.bit < 4;
    }),
    (r.from = function (t, e) {
      if (r.isValid(t)) return t;
      try {
        if ("string" != typeof t) throw Error("Param is not a string");
        switch (t.toLowerCase()) {
          case "l":
          case "low":
            return r.L;
          case "m":
          case "medium":
            return r.M;
          case "q":
          case "quartile":
            return r.Q;
          case "h":
          case "high":
            return r.H;
          default:
            throw Error("Unknown EC Level: " + t);
        }
      } catch (t) {
        return e;
      }
    }));
};
