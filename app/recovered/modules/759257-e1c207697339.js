// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(30181),
    r = e.i(503630);
  let n = () => !1;
  e.s(["f", 0, n], 67734);
  let o = "x-internal-api-key",
    i = (e) => {
      let t;
      return t
        ? {
            ...e,
            hooks: {
              ...e.hooks,
              beforeRequest: [
                (e) => {
                  e.headers.has(o) || e.headers.set(o, t);
                },
                ...(e.hooks?.beforeRequest ?? []),
              ],
              beforeError: [
                (e) => (e.request.headers.delete(o), e),
                ...(e.hooks?.beforeError ?? []),
              ],
            },
          }
        : e;
    },
    s = { credentials: "same-origin" };
  e.s(
    [
      "j",
      0,
      (e) => (0, t.K)({ clientServerUrl: (0, r.R)() }, i({ ...s, ...e })),
      "f",
      0,
      (e) =>
        (0, t.K)(
          { clientServerUrl: n() ? "/api/client-server" : (0, r.R)() },
          i({ ...s, ...e }),
        ),
    ],
    759257,
  );
};
