// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  (e.i(149502), e.i(426091));
  var r = e.i(7284),
    t = e.i(525505);
  (e.i(256617),
    e.i(12345),
    e.i(646908),
    e.s([
      "c",
      0,
      function (...e) {
        return (0, t.f)((0, r.q)(e));
      },
      "k",
      0,
      function (e) {
        let r = e.match(/(Qm[a-zA-Z0-9]{44}|b[a-zA-Z0-9]{58})/);
        return r && r[1] ? r[1] : "";
      },
      "r",
      0,
      (e) => {
        let r = new Date(e),
          t = r.toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "long",
            year: "numeric",
          }),
          o = r.toLocaleTimeString("en-GB", {
            hour: "2-digit",
            minute: "2-digit",
          });
        return `${t} ${o}`;
      },
      "O",
      0,
      function (e, r) {
        let t = new Date(e);
        return new Intl.DateTimeFormat(
          "en-GB",
          r || { dateStyle: "short", timeStyle: "short" },
        ).format(t);
      },
      "Q",
      0,
      () => {
        try {
          let e = localStorage.getItem("decoded-jwt");
          if (!e) return;
          let r = JSON.parse(e);
          return "string" == typeof r.userId && "" !== r.userId
            ? r.userId
            : void 0;
        } catch {
          return;
        }
      },
      "e",
      0,
      () => {
        let e = localStorage.getItem("decoded-jwt");
        if (e)
          try {
            return JSON.parse(e).address || void 0;
          } catch {
            return;
          }
      },
      "a",
      0,
      (e) => {
        let r = e instanceof Date ? e.getTime() : e;
        return Date.now() - r < 864e5;
      },
    ]));
};
