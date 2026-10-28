// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(t, e, i) => {
  ((i.L = { bit: 1 }),
    (i.M = { bit: 0 }),
    (i.Q = { bit: 3 }),
    (i.H = { bit: 2 }),
    (i.isValid = function (t) {
      return t && void 0 !== t.bit && t.bit >= 0 && t.bit < 4;
    }),
    (i.from = function (t, e) {
      if (i.isValid(t)) return t;
      try {
        if ("string" != typeof t) throw Error("Param is not a string");
        switch (t.toLowerCase()) {
          case "l":
          case "low":
            return i.L;
          case "m":
          case "medium":
            return i.M;
          case "q":
          case "quartile":
            return i.Q;
          case "h":
          case "high":
            return i.H;
          default:
            throw Error("Unknown EC Level: " + t);
        }
      } catch (t) {
        return e;
      }
    }));
};
