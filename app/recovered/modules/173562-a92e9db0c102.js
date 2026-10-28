// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(r) => {
  var e = r.i(74812),
    o = r.i(970260);
  function i(r, e) {
    if (!e) return Object.freeze({ address: r, exists: !1 });
    let i = (0, o.Q)().encode(e.data[0]);
    return Object.freeze({ ...a(e), address: r, data: i, exists: !0 });
  }
  function a(r) {
    return Object.freeze({
      executable: r.executable,
      lamports: r.lamports,
      programAddress: r.owner,
      space: r.space,
    });
  }
  async function n(r, e, o = {}) {
    let { abortSignal: a, ...t } = o,
      l = await r
        .getAccountInfo(e, { ...t, encoding: "base64" })
        .send({ abortSignal: a });
    return i(e, l.value);
  }
  async function t(r, e, o = {}) {
    let { abortSignal: a, ...n } = o;
    return (
      await r
        .getMultipleAccounts(e, { ...n, encoding: "base64" })
        .send({ abortSignal: a })
    ).value.map((r, o) => i(e[o], r));
  }
  async function l(r, e, o = {}) {
    let { abortSignal: n, ...t } = o;
    return (
      await r
        .getMultipleAccounts(e, { ...t, encoding: "jsonParsed" })
        .send({ abortSignal: n })
    ).value.map((r, o) =>
      r && "object" == typeof r && "parsed" in r.data
        ? (function (r, e) {
            if (!e) return Object.freeze({ address: r, exists: !1 });
            let o = e.data.parsed.info;
            return Object.freeze({ ...a(e), address: r, data: o, exists: !0 });
          })(e[o], r)
        : i(e[o], r),
    );
  }
  r.s([
    "X",
    0,
    128,
    "z",
    0,
    function (r) {
      if (!r.exists) throw new e.Py(e.GN, { address: r.address });
    },
    "Y",
    0,
    function (r) {
      let o = r.filter(
        (r) =>
          (!("exists" in r) || ("exists" in r && r.exists)) &&
          r.data instanceof Uint8Array,
      );
      if (o.length > 0) {
        let r = o.map((r) => r.address);
        throw new e.Py(e.p2, { addresses: r });
      }
    },
    "S",
    0,
    function (r) {
      let o = r.filter((r) => !r.exists);
      if (o.length > 0) {
        let r = o.map((r) => r.address);
        throw new e.Py(e.sJ, { addresses: r });
      }
    },
    "V",
    0,
    function (r, o) {
      try {
        if ("exists" in r && !r.exists) return r;
        return Object.freeze({ ...r, data: o.decode(r.data) });
      } catch {
        throw new e.Py(e.GU, { address: r.address });
      }
    },
    "m",
    0,
    n,
    "N",
    0,
    t,
    "P",
    0,
    l,
  ]);
};
