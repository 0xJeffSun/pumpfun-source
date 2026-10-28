// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(759257);
  async function r(e) {
    let { fetchOptions: r } = e;
    return (
      await (0, t.j)()("GET /sol-price", {
        ...r,
        throwHttpErrors: !1,
        hooks: {
          afterResponse: [
            (e, t, r) => {
              if (!r.ok) throw Error("Failed to fetch sol price");
            },
          ],
        },
      })
    ).solPrice;
  }
  e.s(["f", 0, r]);
};
