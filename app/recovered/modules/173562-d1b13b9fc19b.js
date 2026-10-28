// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(74812),
    n = e.i(970260);
  function a(e, t) {
    if (!t) return Object.freeze({ address: e, exists: !1 });
    let a = (0, n.Q)().encode(t.data[0]);
    return Object.freeze({ ...i(t), address: e, data: a, exists: !0 });
  }
  function i(e) {
    return Object.freeze({
      executable: e.executable,
      lamports: e.lamports,
      programAddress: e.owner,
      space: e.space,
    });
  }
  async function r(e, t, n = {}) {
    let { abortSignal: i, ...o } = n,
      s = await e
        .getAccountInfo(t, { ...o, encoding: "base64" })
        .send({ abortSignal: i });
    return a(t, s.value);
  }
  async function o(e, t, n = {}) {
    let { abortSignal: i, ...r } = n;
    return (
      await e
        .getMultipleAccounts(t, { ...r, encoding: "base64" })
        .send({ abortSignal: i })
    ).value.map((e, n) => a(t[n], e));
  }
  async function s(e, t, n = {}) {
    let { abortSignal: r, ...o } = n;
    return (
      await e
        .getMultipleAccounts(t, { ...o, encoding: "jsonParsed" })
        .send({ abortSignal: r })
    ).value.map((e, n) =>
      e && "object" == typeof e && "parsed" in e.data
        ? (function (e, t) {
            if (!t) return Object.freeze({ address: e, exists: !1 });
            let n = t.data.parsed.info;
            return Object.freeze({ ...i(t), address: e, data: n, exists: !0 });
          })(t[n], e)
        : a(t[n], e),
    );
  }
  e.s([
    "X",
    0,
    128,
    "z",
    0,
    function (e) {
      if (!e.exists) throw new t.Py(t.GN, { address: e.address });
    },
    "Y",
    0,
    function (e) {
      let n = e.filter(
        (e) =>
          (!("exists" in e) || ("exists" in e && e.exists)) &&
          e.data instanceof Uint8Array,
      );
      if (n.length > 0) {
        let e = n.map((e) => e.address);
        throw new t.Py(t.p2, { addresses: e });
      }
    },
    "S",
    0,
    function (e) {
      let n = e.filter((e) => !e.exists);
      if (n.length > 0) {
        let e = n.map((e) => e.address);
        throw new t.Py(t.sJ, { addresses: e });
      }
    },
    "V",
    0,
    function (e, n) {
      try {
        if ("exists" in e && !e.exists) return e;
        return Object.freeze({ ...e, data: n.decode(e.data) });
      } catch {
        throw new t.Py(t.GU, { address: e.address });
      }
    },
    "m",
    0,
    r,
    "N",
    0,
    o,
    "P",
    0,
    s,
  ]);
};
