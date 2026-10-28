// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  let t = [
      /reject/i,
      /cancel/i,
      /denied/i,
      /declin/i,
      /has not been authorized by the user/i,
      /not authorized by the user/i,
      /user did not approve/i,
      /approval denied/i,
      /dibatalkan/i,
      /ditolak/i,
      /rechazad/i,
      /cancelad/i,
      /annul/i,
      /refusé/i,
      /abgelehnt/i,
      /abgebrochen/i,
    ],
    r = new Set([4001, 4100]),
    n = (e) => {
      if ("string" == typeof e) return e;
      if (e instanceof Error) return e.message;
      if (e && "object" == typeof e && "message" in e) {
        let { message: t } = e;
        if ("string" == typeof t) return t;
      }
      return "";
    },
    o = (e) => {
      if (e && "object" == typeof e && "code" in e) {
        let { code: t } = e;
        if ("number" == typeof t) return t;
        if ("string" == typeof t && "" !== t.trim() && !Number.isNaN(Number(t)))
          return Number(t);
      }
    };
  e.s([
    "k",
    0,
    "USER_CANCELLED_SIGNING",
    "N",
    0,
    o,
    "S",
    0,
    function (e, { code: i } = {}) {
      let s = i ?? o(e);
      if (void 0 !== s && r.has(s)) return !0;
      let a = n(e);
      return !!a && t.some((e) => e.test(a));
    },
    "A",
    0,
    n,
  ]);
};
