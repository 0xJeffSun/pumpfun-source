// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(732486),
    n = e.i(352386),
    a = e.i(42799),
    r = e.i(933185),
    i = e.i(748117),
    o = e.i(636447),
    s = e.i(852104),
    c = e.i(91488),
    l = e.i(927035),
    d = e.i(689391),
    u = e.i(995040),
    p = e.i(727472),
    m = e.i(25047),
    f = e.i(847181),
    g = e.i(39174),
    h = e.i(635164),
    y = e.i(838581),
    w = e.i(437218),
    x = e.i(315430),
    v = e.i(494982),
    b = e.i(384799),
    k = e.i(750505),
    S = e.i(597188),
    A = e.i(514186),
    j = e.i(970260),
    I = e.i(173562);
  async function C(e, t, n) {
    if (0 === e.length) return {};
    let a = await (0, I.P)(t, e, n);
    return (
      (0, I.Y)(a),
      (0, I.S)(a),
      a.reduce((e, t) => ({ ...e, [t.address]: t.data.addresses }), {})
    );
  }
  (e.i(568590), e.i(74812), e.i(877961));
  var O = e.i(731110),
    T = e.i(867599),
    P = e.i(683903),
    $ = e.i(677558);
  (e.i(252494), e.i(785373), e.i(768820), e.i(535391));
  let F = d.z.span`
  && {
    width: 82px;
    height: 82px;
    border-width: 4px;
    border-style: solid;
    border-color: ${(e) => e.color ?? "var(--privy-color-accent)"};
    background-color: ${(e) => e.color ?? "var(--privy-color-accent)"};
    border-radius: 50%;
    display: inline-block;
    box-sizing: border-box;
  }
`,
    L = ({
      instruction: e,
      fees: n,
      transactionInfo: a,
      solPrice: r,
      chain: i,
    }) =>
      (0, t.jsxs)(g.a, {
        children: [
          a?.action &&
            (0, t.jsxs)(g.R, {
              children: [
                (0, t.jsx)(h.L, { children: "Action" }),
                (0, t.jsx)(h.V, { children: a.action }),
              ],
            }),
          null != e?.total &&
            (0, t.jsxs)(g.R, {
              children: [
                (0, t.jsx)(h.L, { children: "Total" }),
                (0, t.jsx)(h.V, { children: e.total }),
              ],
            }),
          !e?.total &&
            null != e?.amount &&
            (0, t.jsxs)(g.R, {
              children: [
                (0, t.jsx)(h.L, { children: "Total" }),
                (0, t.jsx)(h.V, {
                  children: (0, t.jsx)(y.S, {
                    quantities: [e.amount, n],
                    tokenPrice: r,
                  }),
                }),
              ],
            }),
          (0, t.jsxs)(g.R, {
            children: [
              (0, t.jsx)(h.L, { children: "Fees" }),
              (0, t.jsx)(h.V, {
                children: (0, t.jsx)(y.S, { quantities: [n], tokenPrice: r }),
              }),
            ],
          }),
          e?.to &&
            (0, t.jsxs)(g.R, {
              children: [
                (0, t.jsx)(h.L, { children: "To" }),
                (0, t.jsx)(h.V, {
                  children: (0, t.jsx)(y.W, {
                    walletAddress: e.to,
                    chainId: i,
                    chainType: "solana",
                  }),
                }),
              ],
            }),
        ],
      }),
    E = ({
      fees: e,
      onClose: n,
      receiptHeader: a,
      receiptDescription: r,
      transactionInfo: i,
      solPrice: o,
      signOnly: s,
      instruction: c,
      chain: d,
    }) =>
      (0, t.jsxs)(t.Fragment, {
        children: [
          (0, t.jsx)(u.M, { onClose: n }),
          (0, t.jsx)(w.e, {
            style: { marginBottom: "16px" },
            children: (0, t.jsxs)("div", {
              children: [
                (0, t.jsx)(F, { color: "var(--privy-color-success-light)" }),
                (0, t.jsx)(l.f, {
                  height: 38,
                  width: 38,
                  strokeWidth: 2,
                  stroke: "var(--privy-color-success)",
                }),
              ],
            }),
          }),
          (0, t.jsx)(f.C, {
            title: a ?? `Transaction ${s ? "signed" : "complete"}!`,
            description: r ?? "You're all set.",
          }),
          (0, t.jsx)(L, {
            solPrice: o,
            instruction: c,
            fees: e,
            transactionInfo: i,
            chain: d,
          }),
          (0, t.jsx)(x.G, {}),
          (0, t.jsx)(B, { loading: !1, onClick: n, children: "Close" }),
          (0, t.jsx)(p.R, {}),
          (0, t.jsx)(m.B, {}),
        ],
      }),
    B = (0, d.z)(u.P)`
  && {
    margin-top: 24px;
  }
  transition:
    color 350ms ease,
    background-color 350ms ease;
`;
  async function z(e, t) {
    try {
      return await e;
    } catch {
      return t;
    }
  }
  async function U({ privyClient: e, chain: t, mint: n }) {
    let a = P.D[t];
    if (!a[n]) {
      let r = await e.getSplTokenMetadata({
        mintAddress: n,
        cluster: (function (e) {
          switch (e) {
            case "solana:mainnet":
              return "mainnet-beta";
            case "solana:devnet":
              return "devnet";
            case "solana:testnet":
              return "testnet";
          }
        })(t),
      });
      r && (a[n] = { address: n, symbol: r.symbol, decimals: r.decimals });
    }
    return a[n];
  }
  async function D({ tx: e, solanaClient: t, privyClient: n, checkFunds: a }) {
    let r = (0, S.B)().decode((0, O.w)(e)),
      i = r.staticAccounts[0] ?? "",
      o = await (0, $.f)({ solanaClient: t, tx: e }),
      s = a ? await z((0, $.s)({ solanaClient: t, tx: e })) : void 0,
      c = s?.hasFunds ?? !0,
      l = {},
      d = [],
      u = await (async function ({ solanaClient: e, message: t }) {
        if (!("addressTableLookups" in t) || !t.addressTableLookups)
          return [...t.staticAccounts];
        let n = t.addressTableLookups.map((e) => e.lookupTableAddress),
          a = await C(n, e.rpc),
          r = n
            .map((e, n) => [
              ...(t.addressTableLookups[n]?.writableIndexes.map((t) => {
                let r = a[e]?.[t];
                if (r) return { key: r, isWritable: !0, altIdx: n };
              }) ?? []),
              ...(t.addressTableLookups[n]?.readonlyIndexes.map((t) => {
                let r = a[e]?.[t];
                if (r) return { key: r, isWritable: !1, altIdx: n };
              }) ?? []),
            ])
            .flat()
            .filter((e) => !!e)
            .sort((e, t) =>
              e.isWritable !== t.isWritable
                ? e.isWritable
                  ? -1
                  : 1
                : e.altIdx - t.altIdx,
            )
            .map(({ key: e }) => e);
        return [...t.staticAccounts, ...r];
      })({ solanaClient: t, message: r });
    for (let e of r.instructions) {
      let a = r.staticAccounts[e.programAddressIndex] || "";
      if (a !== P.T && a !== P.a)
        if (a !== P.S) {
          if (a === P.A) {
            let t = await z(
              (function (e, t, n) {
                let [a, r, i, o] = e.accountIndices?.map((e) => t[e]) ?? [];
                return {
                  type: "ata-creation",
                  program: n,
                  payer: a,
                  ata: r,
                  owner: i,
                  mint: o,
                };
              })(e, u, a),
            );
            if (!t) {
              d.push({
                type: "unknown",
                program: a,
                discriminator: e.data?.[0],
              });
              continue;
            }
            if ((d.push(t), t.ata && t.owner && t.mint)) {
              l[t.ata] = { owner: t.owner, mint: t.mint };
              continue;
            }
          }
          if (P.R.includes(a)) {
            let r = await z(V(e, u, t, n, a));
            if (!r) {
              d.push({
                type: "unknown",
                program: a,
                discriminator: e.data?.[0],
              });
              continue;
            }
            d.push(r);
          } else if (P.J.includes(a)) {
            let r = await z(N(e, u, t, n, a));
            if (!r) {
              d.push({
                type: "unknown",
                program: a,
                discriminator: e.data?.[0],
              });
              continue;
            }
            d.push(r);
          } else
            d.push({ type: "unknown", program: a, discriminator: e.data?.[0] });
        } else {
          let t = await z(J(e, u));
          if (!t) {
            d.push({ type: "unknown", program: a, discriminator: e.data?.[0] });
            continue;
          }
          d.push(t);
        }
      else {
        let r = await z(R(e, u, t, n, l, a));
        if (!r) {
          d.push({ type: "unknown", program: a, discriminator: e.data?.[0] });
          continue;
        }
        (d.push(r),
          "spl-transfer" === r.type &&
            (r.fromAta &&
              r.fromAccount &&
              r.token.address &&
              (l[r.fromAta] ??= {
                owner: r.fromAccount,
                mint: r.token.address,
              }),
            r.toAta &&
              r.toAccount &&
              r.token.address &&
              (l[r.toAta] ??= { owner: r.toAccount, mint: r.token.address })));
      }
    }
    return { spender: i, fee: o, instructions: d, hasFunds: !!c };
  }
  function M(e, t = 0) {
    try {
      return (function (e, t = 0) {
        let n = 0n;
        for (let a = 0; a < 8; a++) n |= BigInt(e[t + a]) << BigInt(8 * a);
        return n;
      })(e, t);
    } catch {}
    try {
      return e.readBigInt64LE(t);
    } catch {}
    let n = (0, O.y)(e);
    try {
      return ((e, t = 0) => {
        let n = e[t],
          a = e[t + 7];
        if (!n || !a)
          throw Error(`Buffer offset out of range: first: ${n}, last: ${a}.`);
        return (
          (BigInt(e[t + 4] + 256 * e[t + 5] + 65536 * e[t + 6] + (a << 24)) <<
            32n) +
          BigInt(n + 256 * e[++t] + 65536 * e[++t] + 0x1000000 * e[++t])
        );
      })(n);
    } catch {}
    try {
      return n.subarray(t).readBigInt64LE();
    } catch {}
    try {
      return n.readBigInt64LE(t);
    } catch {}
    return 0n;
  }
  async function R(e, t, n, a, r, i) {
    let o = e.data?.[0],
      s = e.accountIndices?.map((e) => t[e]) ?? [];
    if (1 === o) {
      let [e, t, n] = s;
      return {
        type: "spl-init-account",
        program: i,
        account: e,
        mint: t,
        owner: n,
      };
    }
    if (3 === o) {
      let t,
        o,
        [c, l, d] = s,
        u = "",
        p = l ? r[l] : void 0;
      if (p) ((t = p.owner), (u = p.mint));
      else if (l) {
        let e = await n.rpc
            .getAccountInfo(l, {
              commitment: "confirmed",
              encoding: "jsonParsed",
            })
            .send(),
          a = e.value?.data;
        ((t = a?.parsed?.info?.owner),
          (u = a?.parsed?.info?.mint ?? ""),
          (o = a?.parsed?.info?.tokenAmount?.decimals));
      }
      if (!u && c) {
        let e = await n.rpc
            .getAccountInfo(c, {
              commitment: "confirmed",
              encoding: "jsonParsed",
            })
            .send(),
          t = e.value?.data;
        u = t?.parsed?.info?.mint ?? "";
      }
      let m = await U({ privyClient: a, chain: n.chain, mint: u }),
        f = m?.symbol ?? "";
      return (
        (o ??= m?.decimals ?? 9),
        {
          type: "spl-transfer",
          program: i,
          fromAta: c,
          fromAccount: d,
          toAta: l,
          toAccount: t,
          value: M(e.data, 1),
          token: { symbol: f, decimals: o, address: u },
        }
      );
    }
    if (9 === o) {
      let [e, t, n] = s;
      return {
        type: "spl-close-account",
        program: i,
        source: e,
        destination: t,
        owner: n,
      };
    }
    if (17 === o) return { type: "spl-sync-native", program: i };
    throw Error(`Token program instruction type ${o} not supported`);
  }
  async function J(e, t) {
    let n = e.data?.[0],
      a = e.accountIndices?.map((e) => t[e]) ?? [];
    if (0 === n) {
      let [, t] = a;
      return {
        type: "create-account",
        program: P.S,
        account: t?.toString(),
        value: M(e.data, 4),
        withSeed: !1,
      };
    }
    if (2 === n) {
      let [t, n] = a;
      return {
        type: "sol-transfer",
        program: P.S,
        fromAccount: t,
        toAccount: n,
        token: { symbol: "SOL", decimals: 9 },
        value: M(e.data, 4),
        withSeed: !1,
      };
    }
    if (3 === n) {
      let [, t] = a;
      return {
        type: "create-account",
        program: P.S,
        account: t,
        withSeed: !0,
        value: M(e.data.slice(e.data.length - 32 - 8 - 8)),
      };
    }
    if (11 === n) {
      let [t, n] = a;
      return {
        type: "sol-transfer",
        program: P.S,
        fromAccount: t,
        toAccount: n,
        value: M(e.data, 4),
        token: { symbol: "SOL", decimals: 9 },
        withSeed: !0,
      };
    }
    throw Error(`System program instruction type ${n} not supported`);
  }
  async function V(e, t, n, a, r) {
    let i = e.accountIndices?.map((e) => t[e]) ?? [],
      o = e.data?.[0];
    if (143 === o) {
      let t = i[10],
        o = i[11];
      return {
        type: "raydium-swap-base-input",
        program: r,
        mintIn: t,
        mintOut: o,
        tokenIn: t
          ? await U({ privyClient: a, chain: n.chain, mint: t })
          : void 0,
        tokenOut: o
          ? await U({ privyClient: a, chain: n.chain, mint: o })
          : void 0,
        amountIn: M(e.data, 8),
        minimumAmountOut: M(e.data, 16),
      };
    }
    if (55 === o) {
      let t = i[10],
        o = i[11];
      return {
        type: "raydium-swap-base-output",
        program: r,
        mintIn: t,
        mintOut: o,
        tokenIn: t
          ? await U({ privyClient: a, chain: n.chain, mint: t })
          : void 0,
        tokenOut: o
          ? await U({ privyClient: a, chain: n.chain, mint: o })
          : void 0,
        maxAmountIn: M(e.data, 8),
        amountOut: M(e.data, 16),
      };
    }
    throw Error(`Raydium swap program instruction type ${o} not supported`);
  }
  async function N(e, t, n, a, r) {
    let i = e.data?.[0],
      o = e.accountIndices?.map((e) => t[e]) ?? [];
    if ([208, 51, 239, 151, 123, 43, 237, 92].includes(i)) {
      let t = o[5],
        i = o[6];
      return {
        type: "jupiter-swap-exact-out-route",
        program: r,
        mintIn: t,
        mintOut: i,
        tokenIn: t
          ? await U({ privyClient: a, chain: n.chain, mint: t })
          : void 0,
        tokenOut: i
          ? await U({ privyClient: a, chain: n.chain, mint: i })
          : void 0,
        outAmount: M(e.data, e.data.length - 1 - 2 - 8 - 8),
        quotedInAmount: M(e.data, e.data.length - 1 - 2 - 8),
      };
    }
    if ([176, 209, 105, 168, 154, 125, 69, 62].includes(i)) {
      let t = o[7],
        i = o[8];
      return {
        type: "jupiter-swap-exact-out-route",
        program: r,
        mintIn: t,
        mintOut: i,
        tokenIn: t
          ? await U({ privyClient: a, chain: n.chain, mint: t })
          : void 0,
        tokenOut: i
          ? await U({ privyClient: a, chain: n.chain, mint: i })
          : void 0,
        outAmount: M(e.data, e.data.length - 1 - 2 - 8 - 8),
        quotedInAmount: M(e.data, e.data.length - 1 - 2 - 8),
      };
    }
    if ([193, 32, 155, 51, 65, 214, 156, 129].includes(i)) {
      let t = o[7],
        i = o[8];
      return {
        type: "jupiter-swap-shared-accounts-route",
        program: r,
        mintIn: t,
        mintOut: i,
        tokenIn: t
          ? await U({ privyClient: a, chain: n.chain, mint: t })
          : void 0,
        tokenOut: i
          ? await U({ privyClient: a, chain: n.chain, mint: i })
          : void 0,
        inAmount: M(e.data, e.data.length - 1 - 2 - 8 - 8),
        quotedOutAmount: M(e.data, e.data.length - 1 - 2 - 8),
      };
    }
    throw (
      [62, 198, 214, 193, 213, 159, 108, 210].includes(i) &&
        console.warn(
          "Jupiter swap program instruction 'claim' not implemented",
        ),
      [116, 206, 27, 191, 166, 19, 0, 73].includes(i) &&
        console.warn(
          "Jupiter swap program instruction 'claim_token' not implemented",
        ),
      [26, 74, 236, 151, 104, 64, 183, 249].includes(i) &&
        console.warn(
          "Jupiter swap program instruction 'close_token' not implemented",
        ),
      [229, 194, 212, 172, 8, 10, 134, 147].includes(i) &&
        console.warn(
          "Jupiter swap program instruction 'create_open_orders' not implemented",
        ),
      [28, 226, 32, 148, 188, 136, 113, 171].includes(i) &&
        console.warn(
          "Jupiter swap program instruction 'create_program_open_orders' not implemented",
        ),
      [232, 242, 197, 253, 240, 143, 129, 52].includes(i) &&
        console.warn(
          "Jupiter swap program instruction 'create_token_ledger' not implemented",
        ),
      [147, 241, 123, 100, 244, 132, 174, 118].includes(i) &&
        console.warn(
          "Jupiter swap program instruction 'create_token_account' not implemented",
        ),
      [229, 23, 203, 151, 122, 227, 173, 42].includes(i) &&
        console.warn(
          "Jupiter swap program instruction 'route' not implemented",
        ),
      [150, 86, 71, 116, 167, 93, 14, 104].includes(i) &&
        console.warn(
          "Jupiter swap program instruction 'route_with_token_ledger' not implemented",
        ),
      [228, 85, 185, 112, 78, 79, 77, 2].includes(i) &&
        console.warn(
          "Jupiter swap program instruction 'set_token_ledger' not implemented",
        ),
      [230, 121, 143, 80, 119, 159, 106, 170].includes(i) &&
        console.warn(
          "Jupiter swap program instruction 'shared_accounts_route_with_token_ledger' not implemented",
        ),
      Error(`Jupiter swap program instruction type ${i} not supported`)
    );
  }
  let _ = {
    component: () => {
      let {
          data: e,
          onUserCloseViaDialogOrKeybindRef: l,
          setModalData: d,
          navigate: u,
        } = (0, o.u)(),
        {
          client: p,
          closePrivyModal: m,
          walletProxy: f,
          showFiatPrices: g,
        } = (0, i.u)(),
        h = (0, r.a)(),
        { user: y } = (0, r.u)(),
        w = (0, O.q)()(
          e?.standardSignAndSendTransaction?.chain ?? "solana:mainnet",
        ),
        [x, I] = (0, n.useState)(
          e?.standardSignAndSendTransaction?.transaction,
        ),
        [C, P] = (0, n.useState)(),
        [$, F] = (0, n.useState)(),
        [L, B] = (0, n.useState)({ value: 0n, isLoading: !1 }),
        [z, U] = (0, n.useState)(!1),
        [M, R] = (0, n.useState)({}),
        [J, V] = (0, n.useState)(),
        N = e?.standardSignAndSendTransaction?.account,
        _ = !!e?.standardSignAndSendTransaction?.signOnly,
        q = !!e?.standardSignAndSendTransaction?.isSponsored,
        W = N?.imported
          ? (0, r.h)(y).find((e) => e.address === N.address)
          : (0, r.g)(y),
        { solPrice: H, isSolPriceLoading: Z } = (0, s.u)({ enabled: g }),
        G = (0, n.useMemo)(() => {
          if (!C) return;
          let e = C.spender,
            t = (0, b.g)(C.fee),
            n = (0, b.g)(L.value, 3, !0),
            r = C.instructions.filter((e) =>
              [
                "sol-transfer",
                "spl-transfer",
                "raydium-swap-base-input",
                "raydium-swap-base-output",
                "jupiter-swap-shared-accounts-route",
                "jupiter-swap-exact-out-route",
              ].includes(e.type),
            ),
            i = r.at(0);
          return !i || r.length > 1
            ? { fee: t, spender: e, balance: n }
            : "sol-transfer" === i.type
              ? { fee: t, spender: e, balance: n, total: (0, b.g)(i.value) }
              : "spl-transfer" === i.type
                ? {
                    fee: t,
                    spender: e,
                    balance: n,
                    total: `${(0, a.e)({ amount: i.value, decimals: i.token.decimals })} ${i.token.symbol}`,
                  }
                : "raydium-swap-base-input" === i.type &&
                    i.tokenIn &&
                    i.tokenOut
                  ? {
                      fee: t,
                      spender: e,
                      balance: n,
                      swap: `${(0, a.e)({ amount: i.amountIn, decimals: i.tokenIn.decimals })} ${i.tokenIn.symbol} → ${(0, a.e)({ amount: i.minimumAmountOut, decimals: i.tokenOut.decimals })} ${i.tokenOut.symbol}`,
                    }
                  : "raydium-swap-base-output" === i.type &&
                      i.tokenIn &&
                      i.tokenOut
                    ? {
                        fee: t,
                        spender: e,
                        balance: n,
                        swap: `${(0, a.e)({ amount: i.maxAmountIn, decimals: i.tokenIn.decimals })} ${i.tokenIn.symbol} → ${(0, a.e)({ amount: i.amountOut, decimals: i.tokenOut.decimals })} ${i.tokenOut.symbol}`,
                      }
                    : "jupiter-swap-shared-accounts-route" === i.type &&
                        i.tokenIn &&
                        i.tokenOut
                      ? {
                          fee: t,
                          spender: e,
                          balance: n,
                          swap: `${(0, a.e)({ amount: i.inAmount, decimals: i.tokenIn.decimals })} ${i.tokenIn.symbol} → ${(0, a.e)({ amount: i.quotedOutAmount, decimals: i.tokenOut.decimals })} ${i.tokenOut.symbol}`,
                        }
                      : "jupiter-swap-exact-out-route" === i.type &&
                          i.tokenIn &&
                          i.tokenOut
                        ? {
                            fee: t,
                            spender: e,
                            balance: n,
                            swap: `${(0, a.e)({ amount: i.quotedInAmount, decimals: i.tokenIn.decimals })} ${i.tokenIn.symbol} → ${(0, a.e)({ amount: i.outAmount, decimals: i.tokenOut.decimals })} ${i.tokenOut.symbol}`,
                          }
                        : { fee: t, spender: e, balance: n };
        }, [C, N?.address, L]),
        Y = (0, n.useMemo)(() => {
          let e;
          if (!C || !g || !H || Z) return;
          function t(...e) {
            return (0, T.g)(
              e.reduce((e, t) => e + t, 0n),
              H ?? 0,
            );
          }
          N?.address === C.spender && (e = t(C.fee));
          let n = t(L.value),
            r = C.instructions
              .filter(
                (e) => "sol-transfer" === e.type || "spl-transfer" === e.type,
              )
              .at(0);
          return !r || C.instructions.length > 1
            ? { fee: e, balance: n }
            : "sol-transfer" === r.type
              ? {
                  fee: e,
                  balance: n,
                  total: t(r.value, N?.address === C.spender ? C.fee : 0n),
                }
              : "spl-transfer" === r.type
                ? {
                    fee: e,
                    balance: n,
                    total: `${(0, a.e)({ amount: r.value, decimals: r.token.decimals })} ${r.token.symbol}`,
                  }
                : { fee: e, balance: n };
        }, [C, g, H, Z, N?.address, L]);
      if (
        ((0, n.useEffect)(() => {
          !(async function () {
            if (x && p)
              try {
                F(void 0);
                let e = await D({
                  tx: x,
                  solanaClient: w,
                  privyClient: p,
                  checkFunds: !_ && !q,
                });
                P(e);
              } catch (e) {
                (console.error("Failed to prepare transaction", e), F(e));
              }
          })();
        }, [x, w, p, _]),
        (0, n.useEffect)(() => {
          (async function () {
            if (!N) return;
            B({ value: L.value, isLoading: !0 });
            let { value: e } = await w.rpc
              .getBalance(N.address, { commitment: "confirmed" })
              .send();
            B({ value: e ?? 0n, isLoading: !1 });
          })().catch(console.error);
        }, [C]),
        !x || !e?.standardSignAndSendTransaction || !N)
      ) {
        let n = Error("Invalid transaction request");
        return (0, t.jsx)(c.ErrorScreenView, {
          error: n,
          allowlistConfig: h.allowlistConfig,
          onRetry: () => {
            (e?.standardSignAndSendTransaction?.onFailure(n),
              m({ shouldCallAuthOnSuccess: !1 }));
          },
        });
      }
      let Q = () => {
        if (!z)
          return (
            M.signature || M.signedTransaction
              ? e?.standardSignAndSendTransaction?.onSuccess({
                  signature: M.signature,
                  signedTransaction: M.signedTransaction,
                })
              : e?.standardSignAndSendTransaction?.onFailure(
                  J ??
                    $ ??
                    Error(
                      "User exited the modal before submitting the transaction",
                    ),
                ),
            m({ shouldCallAuthOnSuccess: !1 })
          );
      };
      l.current = Q;
      let K = e.standardSignAndSendTransaction?.uiOptions?.transactionInfo
          ?.contractInfo?.imgUrl
          ? (0, t.jsx)("img", {
              src: e.standardSignAndSendTransaction.uiOptions.transactionInfo
                .contractInfo.imgUrl,
              alt: e.standardSignAndSendTransaction.uiOptions.transactionInfo
                .contractInfo.imgAltText,
            })
          : null,
        X = !!(e.funding && e.funding.supportedOptions.length > 0),
        ee = !C?.hasFunds && X && !q;
      if (M.signature || M.signedTransaction) {
        let n = C?.instructions.filter(
            (e) => "sol-transfer" === e.type || "spl-transfer" === e.type,
          ),
          a = 1 === n?.length ? n?.at(0) : void 0;
        return (0, t.jsx)(E, {
          fees: M.fees ?? 0n,
          onClose: Q,
          transactionInfo:
            e.standardSignAndSendTransaction?.uiOptions.transactionInfo,
          solPrice: H,
          receiptHeader:
            e.standardSignAndSendTransaction?.uiOptions.successHeader,
          receiptDescription:
            e.standardSignAndSendTransaction?.uiOptions.successDescription,
          chain: w.chain,
          signOnly: _,
          instruction:
            "sol-transfer" === a?.type
              ? { to: a.toAccount, amount: a.value }
              : { to: a?.toAccount || a?.toAta, total: G?.total },
        });
      }
      return J
        ? (0, t.jsx)(v.T, {
            transactionError: J,
            chainId: w.chain,
            onClose: Q,
            chainType: "solana",
            onRetry: async () => {
              V(void 0);
              let { value: e } = await w.rpc.getLatestBlockhash().send();
              I(
                (0, k.f)(
                  (0, S.B)().decode((0, O.w)(x)),
                  (e) => (0, S.$)(e),
                  (t) => (0, S.l)(e, t),
                  (e) => (0, A.O)(e),
                  (e) => new Uint8Array((0, A.H)().encode(e)),
                ),
              );
            },
          })
        : (0, t.jsx)(v.a, {
            img: K,
            title:
              e.standardSignAndSendTransaction?.uiOptions?.transactionInfo
                ?.title || "Confirm transaction",
            subtitle:
              e.standardSignAndSendTransaction?.uiOptions?.description ||
              `${h.name} wants your permission to approve the following transaction.`,
            cta: ee
              ? "Add funds"
              : e.standardSignAndSendTransaction?.uiOptions?.buttonText ||
                "Approve",
            instructions: C?.instructions ?? [],
            network:
              "solana:mainnet" == w.chain
                ? "Solana"
                : w.chain.replace("solana:", ""),
            blockExplorerUrl: w.blockExplorerUrl,
            total: g ? Y?.total : G?.total,
            fee: g ? Y?.fee : G?.fee,
            balance: g ? Y?.balance : G?.balance,
            swap: G?.swap,
            transactingWalletAddress: N.address,
            disabled: !C?.hasFunds && !X,
            isSubmitting: z,
            isPreparing: !C || L.isLoading,
            isTokenPriceLoading: g && Z,
            isMissingFunds: !C?.hasFunds,
            submitError: J ?? void 0,
            isSponsored: !!e.standardSignAndSendTransaction?.isSponsored,
            parseError: $,
            onClick: ee
              ? async () => {
                  if (!N) return;
                  if (!X) throw Error("Funding wallet is not enabled");
                  let t = "FundingMethodSelectionScreen";
                  (d({
                    ...e,
                    funding: { ...e.funding, methodScreen: t },
                    solanaFundingData: e?.solanaFundingData,
                  }),
                    u(t));
                }
              : async () => {
                  try {
                    if ((U(!0), z || !N || !f || !y || !W)) return;
                    let t = await e.standardSignAndSendTransaction.onConfirm(x);
                    if ("signature" in t) {
                      let e = await (async function ({
                        solanaClient: e,
                        signature: t,
                      }) {
                        let n = (0, j.E)().decode(t),
                          a = await e.rpc
                            .getTransaction(n, {
                              maxSupportedTransactionVersion: 0,
                              commitment: "confirmed",
                              encoding: "base64",
                            })
                            .send()
                            .catch(() => null);
                        return a ? { fee: a.meta?.fee ?? 0n } : null;
                      })({ solanaClient: w, signature: t.signature });
                      return void R({ ...t, fees: e?.fee });
                    }
                    R(t);
                  } catch (e) {
                    (console.warn({ transaction: x, error: e }), V(e));
                  } finally {
                    U(!1);
                  }
                },
            onClose: Q,
          });
    },
  };
  e.s(["StandardSignAndSendTransactionScreen", 0, _, "default", 0, _], 625460);
};
