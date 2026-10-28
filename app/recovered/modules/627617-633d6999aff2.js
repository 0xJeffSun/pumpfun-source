// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(717473),
    r = e.i(980987),
    n = e.i(147864),
    i = e.i(274573),
    a = e.i(723566),
    s = e.i(943343),
    o = e.i(109340),
    u = e.i(586844),
    l = e.i(41096),
    c = e.i(95285),
    f = e.i(339513);
  async function d(e) {
    let t = await e.request({ method: "eth_chainId" }, { dedupe: !0 });
    return (0, f.T)(t);
  }
  async function p(e, f) {
    let {
        account: p = e.account,
        accessList: y,
        authorizationList: h,
        chain: m = e.chain,
        blobVersionedHashes: g,
        blobs: b,
        data: w,
        gas: v,
        gasPrice: x,
        maxFeePerBlobGas: P,
        maxFeePerGas: k,
        maxPriorityFeePerGas: A,
        nonce: I,
        nonceManager: B,
        to: E,
        type: N,
        value: T,
        ...S
      } = f,
      M = await (async () => {
        if (!p || !B || void 0 !== I) return I;
        let r = (0, t.f)(p),
          n = m ? m.id : await (0, u.f)(e, d, "getChainId")({});
        return await B.consume({ address: r.address, chainId: n, client: e });
      })();
    (0, l.f)(f);
    let z = m?.formatters?.transactionRequest?.format,
      U = (z || o.F)(
        {
          ...(0, a.f)(S, { format: z }),
          account: p ? (0, t.f)(p) : void 0,
          accessList: y,
          authorizationList: h,
          blobs: b,
          blobVersionedHashes: g,
          data: w,
          gas: v,
          gasPrice: x,
          maxFeePerBlobGas: P,
          maxFeePerGas: k,
          maxPriorityFeePerGas: A,
          nonce: M,
          to: E,
          type: N,
          value: T,
        },
        "fillTransaction",
      );
    try {
      let t = await e.request({ method: "eth_fillTransaction", params: [U] }),
        i = (m?.formatters?.transaction?.format || s.F)(t.tx);
      (delete i.blockHash,
        delete i.blockNumber,
        delete i.r,
        delete i.s,
        delete i.transactionIndex,
        delete i.v,
        delete i.yParity,
        (i.data = i.input));
      let a = void 0 !== i.feePayerSignature && null !== i.feePayerSignature;
      if (a && void 0 !== M && i.nonce !== M)
        throw new n.b({ filledNonce: i.nonce, requestedNonce: M });
      if (!a) {
        (i.gas && (i.gas = f.gas ?? i.gas),
          i.gasPrice && (i.gasPrice = f.gasPrice ?? i.gasPrice),
          i.maxFeePerBlobGas &&
            (i.maxFeePerBlobGas = f.maxFeePerBlobGas ?? i.maxFeePerBlobGas),
          i.maxFeePerGas && (i.maxFeePerGas = f.maxFeePerGas ?? i.maxFeePerGas),
          i.maxPriorityFeePerGas &&
            (i.maxPriorityFeePerGas =
              f.maxPriorityFeePerGas ?? i.maxPriorityFeePerGas),
          void 0 !== i.nonce && (i.nonce = f.nonce ?? i.nonce));
        let t = await (async () => {
          if ("function" == typeof m?.fees?.baseFeeMultiplier) {
            let t = await (0, u.f)(e, c.f, "getBlock")({});
            return m.fees.baseFeeMultiplier({
              block: t,
              client: e,
              request: f,
            });
          }
          return m?.fees?.baseFeeMultiplier ?? 1.2;
        })();
        if (t < 1) throw new r.W();
        let n = t.toString().split(".")[1]?.length ?? 0,
          a = 10 ** n,
          s = (e) => (e * BigInt(Math.round(t * a))) / BigInt(a);
        (i.maxFeePerGas &&
          !f.maxFeePerGas &&
          (i.maxFeePerGas = s(i.maxFeePerGas)),
          i.gasPrice && !f.gasPrice && (i.gasPrice = s(i.gasPrice)));
      }
      return {
        raw: t.raw,
        transaction: { from: U.from, ...i },
        ...(t.capabilities ? { capabilities: t.capabilities } : {}),
      };
    } catch (t) {
      throw (0, i.f)(t, { ...f, chain: e.chain });
    }
  }
  (e.s(["f", 0, d], 429158), e.s(["f", 0, p], 627617));
};
