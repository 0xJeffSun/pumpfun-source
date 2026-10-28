// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(440519),
    r = e.i(858042),
    n = e.i(954982),
    i = e.i(421957),
    a = e.i(766409),
    s = e.i(330778),
    o = e.i(559787);
  function u(e, t) {
    let { decimals: i, token: a } = t,
      s = l(e, a);
    if (s) return { address: s.address, decimals: i ?? s.decimals };
    if ((0, r.f)(a, { strict: !1 }))
      return {
        address: a,
        decimals:
          i ??
          (function (e, t) {
            let r = e.tokens,
              i = e.chain?.id;
            if (r && void 0 !== i)
              for (let e of r) {
                let r = c(e, i);
                if (r && (0, n.f)(r.address, t)) return r.decimals;
              }
          })(e, a),
      };
    throw Error(
      `Token "${a}" is not a declared ERC-20 token on the client's \`tokens\` array (with an address for the client's chain), and is not a valid address.`,
    );
  }
  function l(e, t) {
    let i = e.tokens,
      a = e.chain?.id;
    if (!i || void 0 === a) return;
    let s = (function (e, t) {
      let r = t.toLowerCase();
      for (let t of e) if (t.symbol?.toLowerCase() === r) return t;
    })(i, t);
    if (s) return c(s, a);
    if ((0, r.f)(t, { strict: !1 }))
      for (let e of i) {
        let r = c(e, a);
        if (r && (0, n.f)(r.address, t)) return r;
      }
  }
  function c(e, t) {
    let r = e.addresses[t];
    if (r)
      return {
        address: r,
        currency: e.currency,
        decimals: e.decimals,
        name: e.name,
        popular: e.popular,
        symbol: e.symbol,
      };
  }
  async function f(e, r) {
    let { address: n, decimals: i } = u(e, r);
    return void 0 !== i
      ? { address: n, decimals: i }
      : {
          address: n,
          decimals: await (0, o.f)(e, {
            abi: t.q,
            address: n,
            functionName: "decimals",
          }),
        };
  }
  e.s([
    "V",
    0,
    function (e) {
      return { ...e, data: (0, i.f)(e), to: e.address };
    },
    "F",
    0,
    l,
    "N",
    0,
    function (e) {
      let {
        account: t,
        chain: r,
        gas: n,
        maxFeePerGas: i,
        maxPriorityFeePerGas: a,
        nonce: s,
      } = e;
      return {
        account: t,
        chain: r,
        gas: n,
        maxFeePerGas: i,
        maxPriorityFeePerGas: a,
        nonce: s,
      };
    },
    "Y",
    0,
    function (e, t) {
      return "bigint" == typeof e ? t : (e.decimals ?? t);
    },
    "M",
    0,
    u,
    "u",
    0,
    f,
    "i",
    0,
    function (e, t) {
      return { amount: e, decimals: t, formatted: (0, a.f)(e, t) };
    },
    "Z",
    0,
    function (e, t) {
      if ("bigint" == typeof e) return e;
      let r = e.decimals ?? t;
      return (0, s.f)(
        e.formatted,
        (function (e) {
          if (void 0 === e)
            throw Error(
              "Token decimals are required. Pass `amount.decimals` or select a declared token.",
            );
          return e;
        })(r),
      );
    },
  ]);
};
