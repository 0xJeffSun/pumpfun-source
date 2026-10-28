// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(528600),
    r = e.i(759257);
  let n = (e) => {
      let r;
      if ("" === e.trim()) throw new t.M({ reason: "empty_body" });
      try {
        r = JSON.parse(e);
      } catch {
        throw new t.M({ reason: "invalid_json" });
      }
      if (Array.isArray(r)) return r;
      if (r && "object" == typeof r && "users" in r && Array.isArray(r.users))
        return r.users;
      throw new t.M({ reason: "invalid_shape" });
    },
    a = async (e, a) =>
      (0, r.j)()("POST /users/batch", {
        body: { addresses: e },
        headers: { "Content-Type": "application/json" },
        ...a,
        throwHttpErrors: !1,
        parseJson: n,
        hooks: {
          afterResponse: [
            async (e, r, n) => {
              if (!n.ok)
                throw new t.M({ reason: "http_error", status: n.status });
              if (!(await n.clone().text()).trim())
                throw new t.M({ reason: "empty_body" });
            },
          ],
        },
      });
  async function i(e) {
    let { fetchOptions: t, userAddresses: r } = e;
    if (r.length <= 100) return a(r, t);
    let n = [];
    for (let e = 0; e < r.length; e += 100) n.push(r.slice(e, e + 100));
    return (await Promise.all(n.map((e) => a(e, t)))).flat();
  }
  e.s(["p", 0, 100, "u", 0, i]);
};
