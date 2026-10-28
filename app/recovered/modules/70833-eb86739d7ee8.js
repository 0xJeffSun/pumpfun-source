// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  (e.s(["F", () => es, "o", () => el, "a", () => ed, "L", () => ef], 505339),
    e.s(["x", () => r, "c", () => ei, "d", () => eo], 424776),
    e.i(548127));
  var t,
    n,
    r,
    o = e.i(445242),
    i = e.i(959719),
    u = e.i(424509),
    a = e.i(352386),
    l = e.i(518664),
    c = e.i(742542);
  e.i(457417);
  var s = e.i(340907),
    f = e.i(232215),
    d = e.i(824425),
    m = e.i(17186),
    h = e.i(512619),
    g = e.i(973926);
  let p = (0, c.struct)([(0, g.f)("lockCpi")]).span,
    b = (0, c.struct)([(0, c.u8)("state")]).span;
  var A = e.i(971370);
  function y([e, t]) {
    return `${e}=${(function e(t) {
      return Array.isArray(t)
        ? "%5B" + t.map(e).join("%2C%20") + "%5D"
        : "bigint" == typeof t
          ? `${t}n`
          : encodeURIComponent(
              String(
                null != t && null === Object.getPrototypeOf(t) ? { ...t } : t,
              ),
            );
    })(t)}`;
  }
  var v = class extends Error {
    cause = this.cause;
    context;
    constructor(...[e, t]) {
      let n, r;
      if (t) {
        let { cause: e, ...o } = t;
        (e && (r = { cause: e }), Object.keys(o).length > 0 && (n = o));
      }
      (super(
        (function (e, t = {}) {
          {
            let n = `Solana error #${e}; Decode this error by running \`npx @solana/errors decode -- ${e}`;
            return (
              Object.keys(t).length &&
                (n += ` '${btoa(Object.entries(t).map(y).join("&"))}'`),
              `${n}\``
            );
          }
        })(e, n),
        r,
      ),
        (this.context = { __code: e, ...n }),
        (this.name = "SolanaError"));
    }
  };
  function w(e, t) {
    return "fixedSize" in t ? t.fixedSize : t.getSizeFromValue(e);
  }
  function B(e) {
    return Object.freeze({
      ...e,
      encode: (t) => {
        let n = new Uint8Array(w(t, e));
        return (e.write(t, n, 0), n);
      },
    });
  }
  function k(e) {
    return Object.freeze({ ...e, decode: (t, n = 0) => e.read(t, n)[0] });
  }
  function S(e) {
    return "fixedSize" in e && "number" == typeof e.fixedSize;
  }
  function T(e, t) {
    if (S(e) !== S(t)) throw new v(8078004);
    if (S(e) && S(t) && e.fixedSize !== t.fixedSize)
      throw new v(8078005, {
        decoderFixedSize: t.fixedSize,
        encoderFixedSize: e.fixedSize,
      });
    if (!S(e) && !S(t) && e.maxSize !== t.maxSize)
      throw new v(8078006, {
        decoderMaxSize: t.maxSize,
        encoderMaxSize: e.maxSize,
      });
    return {
      ...t,
      ...e,
      decode: t.decode,
      encode: e.encode,
      read: t.read,
      write: e.write,
    };
  }
  function C(e, t, n, r = 0) {
    let o = n.length - r;
    if (o < t)
      throw new v(8078001, {
        bytesLength: o,
        codecDescription: e,
        expected: t,
      });
  }
  function I(e, t) {
    return T(
      B({
        fixedSize: t,
        write: (n, r, o) => {
          let i = e.encode(n),
            u = i.length > t ? i.slice(0, t) : i;
          return (r.set(u, o), o + t);
        },
      }),
      k({
        fixedSize: t,
        read: (n, r) => {
          let o, i;
          (C("fixCodecSize", t, n, r),
            (r > 0 || n.length > t) && (n = n.slice(r, r + t)),
            S(e) &&
              ((o = n),
              (i = e.fixedSize),
              (n = ((e, t) => {
                if (e.length >= t) return e;
                let n = new Uint8Array(t).fill(0);
                return (n.set(e), n);
              })(o.length <= i ? o : o.slice(0, i), i))));
          let [u] = e.read(n, 0);
          return [u, r + t];
        },
      }),
    );
  }
  var x =
    (((t = x || {})[(t.Little = 0)] = "Little"), (t[(t.Big = 1)] = "Big"), t);
  function z(e) {
    return e?.endian !== 1;
  }
  var P = (e = {}) =>
    T(
      ((e = {}) => {
        var t;
        return B({
          fixedSize: (t = {
            config: e,
            name: "u64",
            range: [0n, BigInt("0xffffffffffffffff")],
            set: (e, t, n) => e.setBigUint64(0, BigInt(t), n),
            size: 8,
          }).size,
          write(e, n, r) {
            t.range &&
              (function (e, t, n, r) {
                if (r < t || r > n)
                  throw new v(8078011, {
                    codecDescription: e,
                    max: n,
                    min: t,
                    value: r,
                  });
              })(t.name, t.range[0], t.range[1], e);
            let o = new ArrayBuffer(t.size);
            return (
              t.set(new DataView(o), e, z(t.config)),
              n.set(new Uint8Array(o), r),
              r + t.size
            );
          },
        });
      })(e),
      ((e = {}) => {
        var t;
        return k({
          fixedSize: (t = {
            config: e,
            get: (e, t) => e.getBigUint64(0, t),
            name: "u64",
            size: 8,
          }).size,
          read(e, n = 0) {
            var r, o, i;
            let u, a;
            (!(function (e, t, n = 0) {
              if (t.length - n <= 0)
                throw new v(8078e3, { codecDescription: e });
            })(t.name, e, n),
              C(t.name, t.size, e, n));
            let l = new DataView(
              ((r = e),
              (o = n),
              (i = t.size),
              (u = r.byteOffset + (o ?? 0)),
              (a = i ?? r.byteLength),
              r.buffer.slice(u, u + a)),
            );
            return [t.get(l, z(t.config)), n + t.size];
          },
        });
      })(e),
    );
  function E(e) {
    return e.reduce((e, t) => (null === e || null === t ? null : e + t), 0);
  }
  function M(e) {
    return S(e) ? e.fixedSize : null;
  }
  function F(e) {
    return S(e) ? e.fixedSize : (e.maxSize ?? null);
  }
  function N() {
    return T(
      B({
        getSizeFromValue: (e) => e.length,
        write: (e, t, n) => (t.set(e, n), n + e.length),
      }),
      k({
        read: (e, t) => {
          let n = e.slice(t);
          return [n, t + n.length];
        },
      }),
    );
  }
  function _(e) {
    let t, n, r, o, i, u;
    return T(
      ((n = E((t = e.map(([, e]) => e)).map(M))),
      (r = E(t.map(F)) ?? void 0),
      B({
        ...(null === n
          ? {
              getSizeFromValue: (t) =>
                e.map(([e, n]) => w(t[e], n)).reduce((e, t) => e + t, 0),
              maxSize: r,
            }
          : { fixedSize: n }),
        write: (t, n, r) => (
          e.forEach(([e, o]) => {
            r = o.write(t[e], n, r);
          }),
          r
        ),
      })),
      ((i = E((o = e.map(([, e]) => e)).map(M))),
      (u = E(o.map(F)) ?? void 0),
      k({
        ...(null === i ? { maxSize: u } : { fixedSize: i }),
        read: (t, n) => {
          let r = {};
          return (
            e.forEach(([e, o]) => {
              let [i, u] = o.read(t, n);
              ((n = u), (r[e] = i));
            }),
            [r, n]
          );
        },
      })),
    );
  }
  let O = _([
      ["updateAuthority", I(N(), 32)],
      ["mint", I(N(), 32)],
      ["size", P()],
      ["maxSize", P()],
    ]).fixedSize,
    U = _([
      ["mint", I(N(), 32)],
      ["group", I(N(), 32)],
      ["memberNumber", P()],
    ]).fixedSize,
    L = (0, c.struct)([(0, s.f)("authority"), (0, s.f)("memberAddress")]).span,
    $ = (0, c.struct)([(0, s.f)("authority"), (0, s.f)("groupAddress")]).span,
    q = (0, c.struct)([]).span,
    D = (0, c.struct)([
      (0, s.f)("rateAuthority"),
      (0, c.ns64)("initializationTimestamp"),
      (0, c.s16)("preUpdateAverageRate"),
      (0, c.ns64)("lastUpdateTimestamp"),
      (0, c.s16)("currentRate"),
    ]).span,
    G = (0, c.struct)([(0, g.f)("requireIncomingTransferMemos")]).span,
    H = (0, c.struct)([
      (0, s.f)("authority"),
      (0, s.f)("metadataAddress"),
    ]).span,
    R = (0, c.struct)([(0, s.f)("closeAuthority")]).span,
    j = (0, c.struct)([]),
    K = j.span,
    V = j.span,
    W = (0, c.struct)([(0, s.f)("authority"), (0, g.f)("paused")]).span,
    Q = (0, c.struct)([]).span,
    X = (0, c.struct)([(0, s.f)("delegate")]).span,
    J = (0, c.struct)([
      (0, s.f)("authority"),
      (0, c.f64)("multiplier"),
      (0, f.H)("newMultiplierEffectiveTimestamp"),
      (0, c.f64)("newMultiplier"),
    ]).span,
    Z = (0, c.struct)([(0, s.f)("authority"), (0, s.f)("programId")]).span,
    Y = (0, c.struct)([(0, g.f)("transferring")]).span,
    ee = (0, c.struct)([
      (0, c.u8)("discriminator"),
      (0, c.blob)(32, "addressConfig"),
      (0, g.f)("isSigner"),
      (0, g.f)("isWritable"),
    ]),
    et = (0, c.struct)([
      (0, c.u32)("count"),
      (0, c.seq)(ee, (0, c.greedy)(ee.span), "extraAccounts"),
    ]);
  function en(e) {
    return e + 2 + 2;
  }
  function er(e) {
    switch (e) {
      case r.TransferFeeConfig:
        return r.TransferFeeAmount;
      case r.ConfidentialTransferMint:
        return r.ConfidentialTransferAccount;
      case r.NonTransferable:
        return r.NonTransferableAccount;
      case r.TransferHook:
        return r.TransferHookAccount;
      case r.PausableConfig:
        return r.PausableAccount;
      case r.TransferFeeAmount:
      case r.ConfidentialTransferAccount:
      case r.CpiGuard:
      case r.DefaultAccountState:
      case r.ImmutableOwner:
      case r.MemoTransfer:
      case r.MintCloseAuthority:
      case r.MetadataPointer:
      case r.TokenMetadata:
      case r.Uninitialized:
      case r.InterestBearingConfig:
      case r.PermanentDelegate:
      case r.NonTransferableAccount:
      case r.TransferHookAccount:
      case r.GroupPointer:
      case r.GroupMemberPointer:
      case r.TokenGroup:
      case r.TokenGroupMember:
      case r.ScaledUiAmountConfig:
      case r.PausableAccount:
        return r.Uninitialized;
    }
  }
  function eo(e, t) {
    let n = 0;
    for (; en(n) <= t.length; ) {
      let r = t.readUInt16LE(n),
        o = t.readUInt16LE(n + 2),
        i = en(n);
      if (r == e) return t.slice(i, i + o);
      n = i + o;
    }
    return null;
  }
  function ei(e) {
    return (function (e, t, n = {}) {
      if (0 === e.length && 0 === Object.keys(n).length) return t;
      {
        let t =
          d.C +
          h.h +
          e
            .filter((t, n) => n === e.indexOf(t))
            .map((e) =>
              en(
                (function (e) {
                  switch (e) {
                    case r.Uninitialized:
                      return 0;
                    case r.TransferFeeConfig:
                      return el;
                    case r.TransferFeeAmount:
                      return es;
                    case r.MintCloseAuthority:
                      return R;
                    case r.ConfidentialTransferMint:
                      return 65;
                    case r.ConfidentialTransferAccount:
                      return 295;
                    case r.CpiGuard:
                      return p;
                    case r.DefaultAccountState:
                      return b;
                    case r.ImmutableOwner:
                      return q;
                    case r.MemoTransfer:
                      return G;
                    case r.MetadataPointer:
                      return H;
                    case r.NonTransferable:
                      return K;
                    case r.InterestBearingConfig:
                      return D;
                    case r.PermanentDelegate:
                      return X;
                    case r.NonTransferableAccount:
                      return V;
                    case r.TransferHook:
                      return Z;
                    case r.TransferHookAccount:
                      return Y;
                    case r.GroupPointer:
                      return $;
                    case r.GroupMemberPointer:
                      return L;
                    case r.TokenGroup:
                      return O;
                    case r.TokenGroupMember:
                      return U;
                    case r.ScaledUiAmountConfig:
                      return J;
                    case r.PausableConfig:
                      return W;
                    case r.PausableAccount:
                      return Q;
                    case r.TokenMetadata:
                      throw Error(
                        `Cannot get type length for variable extension type: ${e}`,
                      );
                    default:
                      throw Error(`Unknown extension type: ${e}`);
                  }
                })(e),
              ),
            )
            .reduce((e, t) => e + t, 0) +
          Object.entries(n)
            .map(([e, t]) => {
              if (Number(e) !== r.TokenMetadata)
                throw Error(`Extension ${e} is not variable length`);
              return en(t);
            })
            .reduce((e, t) => e + t, 0);
        return t === m.f ? t + 2 : t;
      }
    })(
      (function (e) {
        let t = [],
          n = 0;
        for (; n < e.length; ) {
          let r = e.readUInt16LE(n);
          t.push(r);
          let o = e.readUInt16LE(n + 2);
          n += en(o);
        }
        return t;
      })(e.tlvData).map(er),
      d.C,
    );
  }
  function eu(e) {
    return (0, c.struct)(
      [
        (0, f.H)("epoch"),
        (0, f.H)("maximumFee"),
        (0, c.u16)("transferFeeBasisPoints"),
      ],
      e,
    );
  }
  ((0, c.struct)([
    (0, f.H)("instructionDiscriminator"),
    (0, c.u32)("length"),
    et.replicate("extraAccountsList"),
  ]),
    ((n = r || (r = {}))[(n.Uninitialized = 0)] = "Uninitialized"),
    (n[(n.TransferFeeConfig = 1)] = "TransferFeeConfig"),
    (n[(n.TransferFeeAmount = 2)] = "TransferFeeAmount"),
    (n[(n.MintCloseAuthority = 3)] = "MintCloseAuthority"),
    (n[(n.ConfidentialTransferMint = 4)] = "ConfidentialTransferMint"),
    (n[(n.ConfidentialTransferAccount = 5)] = "ConfidentialTransferAccount"),
    (n[(n.DefaultAccountState = 6)] = "DefaultAccountState"),
    (n[(n.ImmutableOwner = 7)] = "ImmutableOwner"),
    (n[(n.MemoTransfer = 8)] = "MemoTransfer"),
    (n[(n.NonTransferable = 9)] = "NonTransferable"),
    (n[(n.InterestBearingConfig = 10)] = "InterestBearingConfig"),
    (n[(n.CpiGuard = 11)] = "CpiGuard"),
    (n[(n.PermanentDelegate = 12)] = "PermanentDelegate"),
    (n[(n.NonTransferableAccount = 13)] = "NonTransferableAccount"),
    (n[(n.TransferHook = 14)] = "TransferHook"),
    (n[(n.TransferHookAccount = 15)] = "TransferHookAccount"),
    (n[(n.MetadataPointer = 18)] = "MetadataPointer"),
    (n[(n.TokenMetadata = 19)] = "TokenMetadata"),
    (n[(n.GroupPointer = 20)] = "GroupPointer"),
    (n[(n.TokenGroup = 21)] = "TokenGroup"),
    (n[(n.GroupMemberPointer = 22)] = "GroupMemberPointer"),
    (n[(n.TokenGroupMember = 23)] = "TokenGroupMember"),
    (n[(n.ScaledUiAmountConfig = 25)] = "ScaledUiAmountConfig"),
    (n[(n.PausableConfig = 26)] = "PausableConfig"),
    (n[(n.PausableAccount = 27)] = "PausableAccount"),
    BigInt(1e4));
  let ea = (0, c.struct)([
      (0, s.f)("transferFeeConfigAuthority"),
      (0, s.f)("withdrawWithheldAuthority"),
      (0, f.H)("withheldAmount"),
      eu("olderTransferFee"),
      eu("newerTransferFee"),
    ]),
    el = ea.span,
    ec = (0, c.struct)([(0, f.H)("withheldAmount")]),
    es = ec.span;
  function ef(e) {
    let t = eo(r.TransferFeeConfig, e.tlvData);
    return null !== t ? ea.decode(t) : null;
  }
  function ed(e) {
    let t = eo(r.TransferFeeAmount, e.tlvData);
    return null !== t ? ec.decode(t) : null;
  }
  var em = e.i(575281);
  let eh = (e, t) => {
    if (!t) return null;
    let { owner: n } = t;
    if (n.equals(i.z)) return 0;
    if (!n.equals(i.S)) return null;
    try {
      let n = "string" == typeof e ? new A.PublicKey(e) : e,
        r = (0, em.g)(n, t, i.S),
        o = ef(r);
      if (null === o) return 0;
      let u = Number(o.newerTransferFee.transferFeeBasisPoints);
      return Number.isFinite(u) && u >= 0 ? u : null;
    } catch {
      return null;
    }
  };
  e.s(["f", 0, eh], 70596);
  var eg = e.i(51954),
    ep = e.i(728141),
    eb = e.i(361317),
    eA = e.i(605587),
    ey = e.i(655397),
    ev = e.i(449597);
  let ew = (e) => {
      if (e && (0, ev.i)(e))
        try {
          return new A.PublicKey(e);
        } catch {
          return;
        }
    },
    eB = (e) => new Promise((t) => setTimeout(t, e)),
    ek = async (e, t, n) => {
      let r = ew(t);
      if (r)
        for (let t = 0; t < 3 && !(t > 0 && (await eB(300 * t), n())); t++)
          try {
            let t = (await e.getAccountInfo(r))?.owner.toBase58();
            if (t) return t;
          } catch {}
    },
    eS = (e, t, n, r, l) => {
      let c,
        s,
        f,
        d,
        m,
        h = (0, o.c)(23);
      h[0] !== e?.tokenProgram
        ? ((c = e?.tokenProgram?.toBase58() ?? i.z.toBase58()),
          (h[0] = e?.tokenProgram),
          (h[1] = c))
        : (c = h[1]);
      let g = c;
      (h[2] !== g || h[3] !== n
        ? ((s = n ?? g ?? i.z.toBase58()), (h[2] = g), (h[3] = n), (h[4] = s))
        : (s = h[4]),
        ((e, t, n, r) => {
          let o = (0, eg.f)((e) => e.setCoinMint),
            i = (0, eg.f)((e) => e.touchLease),
            { heartbeatMs: u } = (0, eg.f)((e) => e.leaseGcConfig),
            l = (0, eg.f)((e) => e.connection),
            c = (0, a.useRef)(null),
            s = (0, a.useRef)(null),
            f = (0, a.useRef)(null);
          (0, a.useEffect)(() => {
            let a;
            if (!l || !e || (0, eA.N)({ mint: e })) {
              c.current = null;
              return;
            }
            let d = !1;
            try {
              a = new A.PublicKey(e);
            } catch {
              return;
            }
            let m = ew(n);
            return (
              (async () => {
                let h,
                  g,
                  p = null;
                try {
                  let [e, t, n] = await l.getMultipleAccountsInfo([
                    a,
                    (0, ep.G)(a),
                    ...(m ? [m] : []),
                  ]);
                  if (((p = e), (g = n?.owner.toBase58()), t)) {
                    let e = (0, eb.i)(
                      (e) => ep.A.decodeBondingCurveNullable(e),
                      t,
                    );
                    e && (h = (0, ey.k)(e.quoteMint).toBase58());
                  }
                } catch {}
                if (d) return;
                let b = h ?? n,
                  A =
                    (b === m?.toBase58() ? g : void 0) ??
                    (await ek(l, b, () => d));
                if (d) return;
                let y = o(e, p ? p.owner.toBase58() : t, b, r, A);
                if (!y) return;
                let { release: v, token: w } = y;
                ((f.current = v),
                  (c.current = w),
                  (s.current = setInterval(() => {
                    c.current && i(c.current);
                  }, u)));
              })(),
              () => {
                ((d = !0),
                  s.current && (clearInterval(s.current), (s.current = null)),
                  (c.current = null),
                  f.current && (f.current(), (f.current = null)));
              }
            );
          }, [e, t, n, r, o, i, u, l]);
        })(t, s, r, l),
        e?.associatedUserAccountInfo);
      let p = e?.associatedUserAccountInfo?.decodedAccount;
      h[5] !== p?.amount
        ? ((f = new u.default(p?.amount?.toString() || 0)),
          (h[5] = p?.amount),
          (h[6] = f))
        : (f = h[6]);
      let b = f,
        y = e?.mintAccount?.accountInfo;
      h[7] !== t || h[8] !== y
        ? ((d = eh(t, y)), (h[7] = t), (h[8] = y), (h[9] = d))
        : (d = h[9]);
      let v = d,
        w = e?.bondingCurveAccountInfo ?? null,
        B = e?.bondingCurve ?? null,
        k = e?.poolAccountInfo ?? null,
        S = e?.pool ?? null,
        T = e?.mintAccount?.decodedAccount ?? null,
        C = e?.poolBaseTokenAccount?.decodedAccount ?? null,
        I = e?.poolQuoteTokenAccount?.decodedAccount ?? null,
        x = e?.associatedUserAccountInfo?.accountInfo ?? null,
        z = e?.quoteTokenProgram ?? null,
        P = !!e?.mintAccount;
      return (
        h[10] !== b ||
        h[11] !== I ||
        h[12] !== x ||
        h[13] !== z ||
        h[14] !== P ||
        h[15] !== w ||
        h[16] !== B ||
        h[17] !== k ||
        h[18] !== S ||
        h[19] !== T ||
        h[20] !== C ||
        h[21] !== v
          ? ((m = {
              bondingCurveAccountInfo: w,
              bondingCurve: B,
              poolAccountInfo: k,
              pool: S,
              mintAccount: T,
              poolBaseTokenAccount: C,
              poolQuoteTokenAccount: I,
              associatedUserAccountInfo: x,
              tokenBalance: b,
              quoteTokenProgram: z,
              transferFeeBps: v,
              isHydrated: P,
            }),
            (h[10] = b),
            (h[11] = I),
            (h[12] = x),
            (h[13] = z),
            (h[14] = P),
            (h[15] = w),
            (h[16] = B),
            (h[17] = k),
            (h[18] = S),
            (h[19] = T),
            (h[20] = C),
            (h[21] = v),
            (h[22] = m))
          : (m = h[22]),
        m
      );
    };
  function eT(e) {
    return e.global;
  }
  function eC(e, t) {
    if (!t) return "";
    let n = e.coinsByMint[t];
    if (!n) return "";
    let r = n.bondingCurve,
      o = n.pool,
      i = n.poolBaseTokenAccount?.decodedAccount,
      u = n.poolQuoteTokenAccount?.decodedAccount,
      a = n.raydium,
      l = n.mintAccount?.decodedAccount,
      c = e.global?.global?.decodedAccount,
      s = e.global?.globalConfig?.decodedAccount;
    return [
      r?.complete ?? "",
      r?.virtualQuoteReserves?.toString() ?? "",
      r?.virtualTokenReserves?.toString() ?? "",
      o ? "pool" : "",
      i?.amount?.toString() ?? "",
      u?.amount?.toString() ?? "",
      a?.poolKeys ? "ray" : "",
      a?.baseVaultAccount?.decodedAccount?.amount?.toString() ?? "",
      a?.quoteVaultAccount?.decodedAccount?.amount?.toString() ?? "",
      l?.supply?.toString() ?? "",
      c ? "g" : "",
      s ? "gc" : "",
    ].join("_");
  }
  (e.s(
    [
      "G",
      0,
      (e, t, n, r) => {
        let i,
          u = (0, o.c)(2);
        return (
          u[0] !== e
            ? ((i = (t) => t.coinsByMint[e]), (u[0] = e), (u[1] = i))
            : (i = u[1]),
          eS((0, eg.f)(i), e, t, n, r)
        );
      },
      "$",
      0,
      (e) => {
        let t,
          n = (0, o.c)(2);
        return (
          n[0] !== e
            ? ((t = (t) => t.tokenBalanceByMint[e]), (n[0] = e), (n[1] = t))
            : (t = n[1]),
          (0, eg.f)(t)
        );
      },
      "g",
      0,
      (e, t, n, r) => {
        let o = (0, a.useCallback)((t) => t.coinsByMint[e], [e]);
        return eS((0, l.f)(eg.f, o), e, t, n, r);
      },
    ],
    328242,
  ),
    e.i(66961),
    e.s(
      [
        "f",
        0,
        () => {
          let e,
            t = (0, o.c)(5),
            n = (0, eg.f)(eT),
            r = n.global?.decodedAccount ?? null,
            i = n.globalConfig?.decodedAccount ?? null,
            u = n.feeConfig?.decodedAccount ?? null,
            a = n.ammFeeConfig?.decodedAccount ?? null;
          return (
            t[0] !== r || t[1] !== i || t[2] !== u || t[3] !== a
              ? ((e = {
                  global: r,
                  globalConfig: i,
                  feeConfig: u,
                  ammFeeConfig: a,
                }),
                (t[0] = r),
                (t[1] = i),
                (t[2] = u),
                (t[3] = a),
                (t[4] = e))
              : (e = t[4]),
            e
          );
        },
      ],
      36629,
    ),
    e.s(["f", 0, eC], 732757));
  let eI = (e) => (!Number.isFinite(e) || e <= 0 ? 0 : Math.min(e, 1e15));
  function ex(e) {
    return e.connection;
  }
  function ez(e) {
    return e.leaseGcConfig;
  }
  function eP(e) {
    return e.touchLease;
  }
  function eE(e) {
    return e.setCoinRaydiumPool;
  }
  (e.s(
    [
      "f",
      0,
      function ({ isBuySelected: e, coin: t, slippagePercentage: n }) {
        let [r, o] = (0, a.useState)(0),
          [i, u] = (0, a.useState)(0),
          [l, c] = (0, a.useState)(!0),
          [s, f] = (0, a.useState)(null),
          [d, m] = (0, a.useState)(null),
          h = (0, a.useRef)(null),
          [g, p] = (0, a.useState)(!1),
          [b, A] = (0, a.useState)(null),
          [y, v] = (0, a.useState)(null),
          w = (0, a.useRef)(0),
          B = (0, eg.f)((e) => e.getQuote),
          k = t?.mint,
          S = (0, eg.f)((e) => eC(e, k)),
          T = (0, a.useRef)(S);
        ((0, a.useEffect)(() => {
          c(e);
        }, [e]),
          (0, a.useEffect)(() => {
            if (s) {
              let e = setTimeout(() => {
                f(null);
              }, 500);
              return () => clearTimeout(e);
            }
          }, [s]));
        let C = (0, a.useCallback)((e, t) => {
            ((h.current = t?.inputAtomicAmount ?? null), o(eI(e)), m("amount"));
          }, []),
          I = (0, a.useCallback)(() => {
            h.current = null;
          }, []),
          x = (0, a.useCallback)((e) => {
            ((h.current = null), u(eI(e)), m("solAmount"));
          }, []);
        return (
          (0, a.useEffect)(() => {
            if (!t) return;
            let a = T.current !== S;
            (a && (T.current = S),
              (d || a) &&
                ((async () => {
                  let c = { run: null },
                    s = () => ((c.run = ++w.current), A(null), p(!0), c.run),
                    m = () => {
                      ((w.current += 1), p(!1), A(null), v(null));
                    };
                  try {
                    if (e) {
                      if (l && ("solAmount" === d || a)) {
                        if (i <= 0) {
                          (o(0), m());
                          return;
                        }
                        let e = s(),
                          r = await B({
                            direction: "buy",
                            uiAmount: i,
                            slippagePercentage: n,
                            mint: t.mint,
                            coin: t,
                          });
                        if (w.current !== e) return;
                        if ((v(r?.priceImpactPercent ?? null), r?.quote)) {
                          let e = Number(r.quote.amount) / 1e6;
                          o(e);
                        }
                      } else if (!l && "amount" === d) {
                        if (r <= 0) {
                          (u(0), m());
                          return;
                        }
                        let e = s(),
                          o = await B({
                            direction: "buy",
                            uiAmount: r,
                            inputAtomicAmount: h.current ?? void 0,
                            slippagePercentage: n,
                            mint: t.mint,
                            coin: t,
                            inputSide: "token",
                          });
                        if (w.current !== e) return;
                        if ((v(o?.priceImpactPercent ?? null), o?.quote)) {
                          let e = (0, ey.k)((0, ey.H)(t)),
                            n = (0, ey.N)(e, t.quote_decimals);
                          if (void 0 === n) return;
                          let r = Number(o.quote.amount) / 10 ** n;
                          (i < r ? f("up") : i > r && f("down"), u(r));
                        }
                      }
                    } else if ("amount" === d || a) {
                      if (r <= 0) {
                        (u(0), m());
                        return;
                      }
                      let e = s(),
                        o = await B({
                          direction: "sell",
                          uiAmount: r,
                          inputAtomicAmount: h.current ?? void 0,
                          slippagePercentage: n,
                          mint: t.mint,
                          coin: t,
                        });
                      if (w.current !== e) return;
                      if ((v(o?.priceImpactPercent ?? null), o?.quote)) {
                        let e = (0, ey.k)((0, ey.H)(t)),
                          n = (0, ey.N)(e, t.quote_decimals);
                        if (void 0 === n) return;
                        let r = Number(o.quote.amount) / 10 ** n;
                        (i < r ? f("up") : i > r && f("down"), u(r));
                      }
                    }
                  } catch (e) {
                    (console.error("[useQuoteState] Error computing quote:", e),
                      null !== c.run &&
                        w.current === c.run &&
                        (A(e instanceof Error ? e.message : String(e)),
                        v(null)));
                  } finally {
                    null !== c.run && w.current === c.run && p(!1);
                  }
                })(),
                d && m(null)));
          }, [r, i, e, l, d, t, n, B, S]),
          (0, a.useMemo)(
            () => ({
              amount: r,
              setAmount: C,
              clearAmountInputAtomic: I,
              solAmount: i,
              setSolAmount: x,
              nativeSelected: l,
              setNativeSelected: c,
              inputSolValueArrow: s,
              setInputSolValueArrow: f,
              isQuoting: g,
              quoteError: b,
              priceImpactPercent: y,
            }),
            [r, C, I, i, x, l, s, g, b, y],
          )
        );
      },
    ],
    840585,
  ),
    e.s(
      [
        "f",
        0,
        function (e, t) {
          let n,
            r,
            i = (0, o.c)(8),
            u = (0, eg.f)(eE),
            l = (0, eg.f)(eP),
            { heartbeatMs: c } = (0, eg.f)(ez),
            s = (0, eg.f)(ex),
            f = (0, a.useRef)(null),
            d = (0, a.useRef)(null),
            m = (0, a.useRef)(null);
          (i[0] !== s ||
          i[1] !== c ||
          i[2] !== t ||
          i[3] !== e ||
          i[4] !== u ||
          i[5] !== l
            ? ((n = () => {
                if (!s || !e || !t) return;
                let n = u(e, t);
                if (!n) return;
                let { release: r, token: o } = n;
                return (
                  (d.current = r),
                  (f.current = o),
                  (m.current = setInterval(() => {
                    f.current && l(f.current);
                  }, c)),
                  () => {
                    (m.current &&
                      (clearInterval(m.current), (m.current = null)),
                      (f.current = null),
                      d.current && (d.current(), (d.current = null)));
                  }
                );
              }),
              (r = [e, t, u, l, c, s]),
              (i[0] = s),
              (i[1] = c),
              (i[2] = t),
              (i[3] = e),
              (i[4] = u),
              (i[5] = l),
              (i[6] = n),
              (i[7] = r))
            : ((n = i[6]), (r = i[7])),
            (0, a.useEffect)(n, r));
        },
      ],
      688208,
    ),
    e.i(102824),
    e.s([], 70833));
};
