// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  let n = /^[1-9A-HJ-NP-Za-km-z]{32,44}$/,
    t = { form: "unknown", userId: void 0, wallet: void 0, role: void 0 },
    a = (e) => {
      let a, r;
      return e
        ? (((e) => {
            if ("gid" !== e[0]) return null;
            let n = e[1];
            return n && e[2]
              ? 4 === e.length && ("host" === e[3] || "ingress" === e[3])
                ? { form: "gid", userId: n, wallet: void 0, role: e[3] }
                : 5 === e.length && "viewer" === e[3] && e[4]
                  ? { form: "gid", userId: n, wallet: void 0, role: "viewer" }
                  : t
              : t;
          })(e.split(":")) ??
            ((r = (a = e.split("-"))[0]),
            n.test(r)
              ? 1 === a.length
                ? { form: "legacy", userId: void 0, wallet: r, role: "host" }
                : 2 === a.length && "ingress" === a[1]
                  ? {
                      form: "legacy",
                      userId: void 0,
                      wallet: r,
                      role: "ingress",
                    }
                  : 4 === a.length && "viewer" === a[2] && a[3]
                    ? {
                        form: "legacy",
                        userId: void 0,
                        wallet: r,
                        role: "viewer",
                      }
                    : t
              : t))
        : t;
    };
  e.s([
    "B",
    0,
    (e) => "viewer" === a(e).role,
    "A",
    0,
    a,
    "M",
    0,
    (e) => {
      let n = a(e);
      return "gid" === n.form
        ? { userId: n.userId }
        : "legacy" === n.form
          ? { address: n.wallet }
          : {};
    },
    "N",
    0,
    (e) => e.address ?? e.userId ?? "",
  ]);
};
