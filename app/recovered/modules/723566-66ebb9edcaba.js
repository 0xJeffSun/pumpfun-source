// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  e.s(
    [
      "f",
      0,
      function (e, { format: t }) {
        if (!t) return {};
        let n = {};
        return (
          !(function t(r) {
            for (let i of Object.keys(r))
              (i in e && (n[i] = e[i]),
                r[i] &&
                  "object" == typeof r[i] &&
                  !Array.isArray(r[i]) &&
                  t(r[i]));
          })(t(e || {})),
          n
        );
      },
    ],
    723566,
  );
  var t = e.i(703114);
  function n(e, t) {
    return ({ exclude: n, format: r }) => ({
      exclude: n,
      format: (e, i) => {
        let a = t(e, i);
        if (n) for (let e of n) delete a[e];
        return { ...a, ...r(e, i) };
      },
      type: e,
    });
  }
  e.s(["f", 0, n], 743699);
  let r = {
    legacy: "0x0",
    eip2930: "0x1",
    eip1559: "0x2",
    eip4844: "0x3",
    eip7702: "0x4",
  };
  function i(e, n) {
    let i = {};
    return (
      void 0 !== e.authorizationList &&
        (i.authorizationList = e.authorizationList.map((e) => ({
          address: e.address,
          r: e.r ? (0, t.N)(BigInt(e.r)) : e.r,
          s: e.s ? (0, t.N)(BigInt(e.s)) : e.s,
          chainId: (0, t.N)(e.chainId),
          nonce: (0, t.N)(e.nonce),
          ...(void 0 !== e.yParity ? { yParity: (0, t.N)(e.yParity) } : {}),
          ...(void 0 !== e.v && void 0 === e.yParity
            ? { v: (0, t.N)(e.v) }
            : {}),
        }))),
      void 0 !== e.accessList && (i.accessList = e.accessList),
      void 0 !== e.blobVersionedHashes &&
        (i.blobVersionedHashes = e.blobVersionedHashes),
      void 0 !== e.blobs &&
        ("string" != typeof e.blobs[0]
          ? (i.blobs = e.blobs.map((e) => (0, t.v)(e)))
          : (i.blobs = e.blobs)),
      void 0 !== e.data && (i.data = e.data),
      e.account && (i.from = e.account.address),
      void 0 !== e.from && (i.from = e.from),
      void 0 !== e.gas && (i.gas = (0, t.N)(e.gas)),
      void 0 !== e.gasPrice && (i.gasPrice = (0, t.N)(e.gasPrice)),
      void 0 !== e.maxFeePerBlobGas &&
        (i.maxFeePerBlobGas = (0, t.N)(e.maxFeePerBlobGas)),
      void 0 !== e.maxFeePerGas && (i.maxFeePerGas = (0, t.N)(e.maxFeePerGas)),
      void 0 !== e.maxPriorityFeePerGas &&
        (i.maxPriorityFeePerGas = (0, t.N)(e.maxPriorityFeePerGas)),
      void 0 !== e.nonce && (i.nonce = (0, t.N)(e.nonce)),
      void 0 !== e.to && (i.to = e.to),
      void 0 !== e.type && (i.type = r[e.type]),
      void 0 !== e.value && (i.value = (0, t.N)(e.value)),
      i
    );
  }
  let a = n("transactionRequest", i);
  e.s(["V", 0, a, "F", 0, i], 109340);
};
