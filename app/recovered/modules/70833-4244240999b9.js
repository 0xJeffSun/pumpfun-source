// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  "use strict";
  (e.s(["F", () => es, "o", () => ec, "a", () => ed, "L", () => ef], 505339),
    e.s(["x", () => r, "c", () => eo, "d", () => eu], 424776),
    e.i(548127));
  var t,
    n,
    r,
    u = e.i(445242),
    o = e.i(959719),
    i = e.i(424509),
    a = e.i(352386),
    c = e.i(518664),
    l = e.i(742542);
  e.i(457417);
  var s = e.i(340907),
    f = e.i(232215),
    d = e.i(824425),
    m = e.i(17186),
    g = e.i(512619),
    p = e.i(973926);
  let A = (0, l.struct)([(0, p.f)("lockCpi")]).span,
    b = (0, l.struct)([(0, l.u8)("state")]).span;
  var T = e.i(971370);
  function h([e, t]) {
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
  var C = class extends Error {
    cause = this.cause;
    context;
    constructor(...[e, t]) {
      let n, r;
      if (t) {
        let { cause: e, ...u } = t;
        (e && (r = { cause: e }), Object.keys(u).length > 0 && (n = u));
      }
      (super(
        (function (e, t = {}) {
          {
            let n = `Solana error #${e}; Decode this error by running \`npx @solana/errors decode -- ${e}`;
            return (
              Object.keys(t).length &&
                (n += ` '${btoa(Object.entries(t).map(h).join("&"))}'`),
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
  function S(e, t) {
    return "fixedSize" in t ? t.fixedSize : t.getSizeFromValue(e);
  }
  function w(e) {
    return Object.freeze({
      ...e,
      encode: (t) => {
        let n = new Uint8Array(S(t, e));
        return (e.write(t, n, 0), n);
      },
    });
  }
  function y(e) {
    return Object.freeze({ ...e, decode: (t, n = 0) => e.read(t, n)[0] });
  }
  function z(e) {
    return "fixedSize" in e && "number" == typeof e.fixedSize;
  }
  function k(e, t) {
    if (z(e) !== z(t)) throw new C(8078004);
    if (z(e) && z(t) && e.fixedSize !== t.fixedSize)
      throw new C(8078005, {
        decoderFixedSize: t.fixedSize,
        encoderFixedSize: e.fixedSize,
      });
    if (!z(e) && !z(t) && e.maxSize !== t.maxSize)
      throw new C(8078006, {
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
  function M(e, t, n, r = 0) {
    let u = n.length - r;
    if (u < t)
      throw new C(8078001, {
        bytesLength: u,
        codecDescription: e,
        expected: t,
      });
  }
  function P(e, t) {
    return k(
      w({
        fixedSize: t,
        write: (n, r, u) => {
          let o = e.encode(n),
            i = o.length > t ? o.slice(0, t) : o;
          return (r.set(i, u), u + t);
        },
      }),
      y({
        fixedSize: t,
        read: (n, r) => {
          let u, o;
          (M("fixCodecSize", t, n, r),
            (r > 0 || n.length > t) && (n = n.slice(r, r + t)),
            z(e) &&
              ((u = n),
              (o = e.fixedSize),
              (n = ((e, t) => {
                if (e.length >= t) return e;
                let n = new Uint8Array(t).fill(0);
                return (n.set(e), n);
              })(u.length <= o ? u : u.slice(0, o), o))));
          let [i] = e.read(n, 0);
          return [i, r + t];
        },
      }),
    );
  }
  var x =
    (((t = x || {})[(t.Little = 0)] = "Little"), (t[(t.Big = 1)] = "Big"), t);
  function v(e) {
    return e?.endian !== 1;
  }
  var I = (e = {}) =>
    k(
      ((e = {}) => {
        var t;
        return w({
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
                  throw new C(8078011, {
                    codecDescription: e,
                    max: n,
                    min: t,
                    value: r,
                  });
              })(t.name, t.range[0], t.range[1], e);
            let u = new ArrayBuffer(t.size);
            return (
              t.set(new DataView(u), e, v(t.config)),
              n.set(new Uint8Array(u), r),
              r + t.size
            );
          },
        });
      })(e),
      ((e = {}) => {
        var t;
        return y({
          fixedSize: (t = {
            config: e,
            get: (e, t) => e.getBigUint64(0, t),
            name: "u64",
            size: 8,
          }).size,
          read(e, n = 0) {
            var r, u, o;
            let i, a;
            (!(function (e, t, n = 0) {
              if (t.length - n <= 0)
                throw new C(8078e3, { codecDescription: e });
            })(t.name, e, n),
              M(t.name, t.size, e, n));
            let c = new DataView(
              ((r = e),
              (u = n),
              (o = t.size),
              (i = r.byteOffset + (u ?? 0)),
              (a = o ?? r.byteLength),
              r.buffer.slice(i, i + a)),
            );
            return [t.get(c, v(t.config)), n + t.size];
          },
        });
      })(e),
    );
  function B(e) {
    return e.reduce((e, t) => (null === e || null === t ? null : e + t), 0);
  }
  function F(e) {
    return z(e) ? e.fixedSize : null;
  }
  function U(e) {
    return z(e) ? e.fixedSize : (e.maxSize ?? null);
  }
  function G() {
    return k(
      w({
        getSizeFromValue: (e) => e.length,
        write: (e, t, n) => (t.set(e, n), n + e.length),
      }),
      y({
        read: (e, t) => {
          let n = e.slice(t);
          return [n, t + n.length];
        },
      }),
    );
  }
  function N(e) {
    let t, n, r, u, o, i;
    return k(
      ((n = B((t = e.map(([, e]) => e)).map(F))),
      (r = B(t.map(U)) ?? void 0),
      w({
        ...(null === n
          ? {
              getSizeFromValue: (t) =>
                e.map(([e, n]) => S(t[e], n)).reduce((e, t) => e + t, 0),
              maxSize: r,
            }
          : { fixedSize: n }),
        write: (t, n, r) => (
          e.forEach(([e, u]) => {
            r = u.write(t[e], n, r);
          }),
          r
        ),
      })),
      ((o = B((u = e.map(([, e]) => e)).map(F))),
      (i = B(u.map(U)) ?? void 0),
      y({
        ...(null === o ? { maxSize: i } : { fixedSize: o }),
        read: (t, n) => {
          let r = {};
          return (
            e.forEach(([e, u]) => {
              let [o, i] = u.read(t, n);
              ((n = i), (r[e] = o));
            }),
            [r, n]
          );
        },
      })),
    );
  }
  let E = N([
      ["updateAuthority", P(G(), 32)],
      ["mint", P(G(), 32)],
      ["size", I()],
      ["maxSize", I()],
    ]).fixedSize,
    H = N([
      ["mint", P(G(), 32)],
      ["group", P(G(), 32)],
      ["memberNumber", I()],
    ]).fixedSize,
    q = (0, l.struct)([(0, s.f)("authority"), (0, s.f)("memberAddress")]).span,
    O = (0, l.struct)([(0, s.f)("authority"), (0, s.f)("groupAddress")]).span,
    R = (0, l.struct)([]).span,
    D = (0, l.struct)([
      (0, s.f)("rateAuthority"),
      (0, l.ns64)("initializationTimestamp"),
      (0, l.s16)("preUpdateAverageRate"),
      (0, l.ns64)("lastUpdateTimestamp"),
      (0, l.s16)("currentRate"),
    ]).span,
    j = (0, l.struct)([(0, p.f)("requireIncomingTransferMemos")]).span,
    L = (0, l.struct)([
      (0, s.f)("authority"),
      (0, s.f)("metadataAddress"),
    ]).span,
    $ = (0, l.struct)([(0, s.f)("closeAuthority")]).span,
    V = (0, l.struct)([]),
    K = V.span,
    Q = V.span,
    _ = (0, l.struct)([(0, s.f)("authority"), (0, p.f)("paused")]).span,
    W = (0, l.struct)([]).span,
    J = (0, l.struct)([(0, s.f)("delegate")]).span,
    X = (0, l.struct)([
      (0, s.f)("authority"),
      (0, l.f64)("multiplier"),
      (0, f.H)("newMultiplierEffectiveTimestamp"),
      (0, l.f64)("newMultiplier"),
    ]).span,
    Y = (0, l.struct)([(0, s.f)("authority"), (0, s.f)("programId")]).span,
    Z = (0, l.struct)([(0, p.f)("transferring")]).span,
    ee = (0, l.struct)([
      (0, l.u8)("discriminator"),
      (0, l.blob)(32, "addressConfig"),
      (0, p.f)("isSigner"),
      (0, p.f)("isWritable"),
    ]),
    et = (0, l.struct)([
      (0, l.u32)("count"),
      (0, l.seq)(ee, (0, l.greedy)(ee.span), "extraAccounts"),
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
  function eu(e, t) {
    let n = 0;
    for (; en(n) <= t.length; ) {
      let r = t.readUInt16LE(n),
        u = t.readUInt16LE(n + 2),
        o = en(n);
      if (r == e) return t.slice(o, o + u);
      n = o + u;
    }
    return null;
  }
  function eo(e) {
    return (function (e, t, n = {}) {
      if (0 === e.length && 0 === Object.keys(n).length) return t;
      {
        let t =
          d.C +
          g.h +
          e
            .filter((t, n) => n === e.indexOf(t))
            .map((e) =>
              en(
                (function (e) {
                  switch (e) {
                    case r.Uninitialized:
                      return 0;
                    case r.TransferFeeConfig:
                      return ec;
                    case r.TransferFeeAmount:
                      return es;
                    case r.MintCloseAuthority:
                      return $;
                    case r.ConfidentialTransferMint:
                      return 65;
                    case r.ConfidentialTransferAccount:
                      return 295;
                    case r.CpiGuard:
                      return A;
                    case r.DefaultAccountState:
                      return b;
                    case r.ImmutableOwner:
                      return R;
                    case r.MemoTransfer:
                      return j;
                    case r.MetadataPointer:
                      return L;
                    case r.NonTransferable:
                      return K;
                    case r.InterestBearingConfig:
                      return D;
                    case r.PermanentDelegate:
                      return J;
                    case r.NonTransferableAccount:
                      return Q;
                    case r.TransferHook:
                      return Y;
                    case r.TransferHookAccount:
                      return Z;
                    case r.GroupPointer:
                      return O;
                    case r.GroupMemberPointer:
                      return q;
                    case r.TokenGroup:
                      return E;
                    case r.TokenGroupMember:
                      return H;
                    case r.ScaledUiAmountConfig:
                      return X;
                    case r.PausableConfig:
                      return _;
                    case r.PausableAccount:
                      return W;
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
          let u = e.readUInt16LE(n + 2);
          n += en(u);
        }
        return t;
      })(e.tlvData).map(er),
      d.C,
    );
  }
  function ei(e) {
    return (0, l.struct)(
      [
        (0, f.H)("epoch"),
        (0, f.H)("maximumFee"),
        (0, l.u16)("transferFeeBasisPoints"),
      ],
      e,
    );
  }
  ((0, l.struct)([
    (0, f.H)("instructionDiscriminator"),
    (0, l.u32)("length"),
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
  let ea = (0, l.struct)([
      (0, s.f)("transferFeeConfigAuthority"),
      (0, s.f)("withdrawWithheldAuthority"),
      (0, f.H)("withheldAmount"),
      ei("olderTransferFee"),
      ei("newerTransferFee"),
    ]),
    ec = ea.span,
    el = (0, l.struct)([(0, f.H)("withheldAmount")]),
    es = el.span;
  function ef(e) {
    let t = eu(r.TransferFeeConfig, e.tlvData);
    return null !== t ? ea.decode(t) : null;
  }
  function ed(e) {
    let t = eu(r.TransferFeeAmount, e.tlvData);
    return null !== t ? el.decode(t) : null;
  }
  var em = e.i(575281);
  let eg = (e, t) => {
    if (!t) return null;
    let { owner: n } = t;
    if (n.equals(o.z)) return 0;
    if (!n.equals(o.S)) return null;
    try {
      let n = "string" == typeof e ? new T.PublicKey(e) : e,
        r = (0, em.g)(n, t, o.S),
        u = ef(r);
      if (null === u) return 0;
      let i = Number(u.newerTransferFee.transferFeeBasisPoints);
      return Number.isFinite(i) && i >= 0 ? i : null;
    } catch {
      return null;
    }
  };
  e.s(["f", 0, eg], 70596);
  var ep = e.i(51954),
    eA = e.i(728141),
    eb = e.i(361317),
    eT = e.i(605587),
    eh = e.i(655397),
    eC = e.i(449597);
  let eS = (e) => {
      if (e && (0, eC.i)(e))
        try {
          return new T.PublicKey(e);
        } catch {
          return;
        }
    },
    ew = (e) => new Promise((t) => setTimeout(t, e)),
    ey = async (e, t, n) => {
      let r = eS(t);
      if (r)
        for (let t = 0; t < 3 && !(t > 0 && (await ew(300 * t), n())); t++)
          try {
            let t = (await e.getAccountInfo(r))?.owner.toBase58();
            if (t) return t;
          } catch {}
    },
    ez = (e, t, n, r, c) => {
      let l,
        s,
        f,
        d,
        m,
        g = (0, u.c)(23);
      g[0] !== e?.tokenProgram
        ? ((l = e?.tokenProgram?.toBase58() ?? o.z.toBase58()),
          (g[0] = e?.tokenProgram),
          (g[1] = l))
        : (l = g[1]);
      let p = l;
      (g[2] !== p || g[3] !== n
        ? ((s = n ?? p ?? o.z.toBase58()), (g[2] = p), (g[3] = n), (g[4] = s))
        : (s = g[4]),
        ((e, t, n, r) => {
          let u = (0, ep.f)((e) => e.setCoinMint),
            o = (0, ep.f)((e) => e.touchLease),
            { heartbeatMs: i } = (0, ep.f)((e) => e.leaseGcConfig),
            c = (0, ep.f)((e) => e.connection),
            l = (0, a.useRef)(null),
            s = (0, a.useRef)(null),
            f = (0, a.useRef)(null);
          (0, a.useEffect)(() => {
            let a;
            if (!c || !e || (0, eT.N)({ mint: e })) {
              l.current = null;
              return;
            }
            let d = !1;
            try {
              a = new T.PublicKey(e);
            } catch {
              return;
            }
            let m = eS(n);
            return (
              (async () => {
                let g,
                  p,
                  A = null;
                try {
                  let [e, t, n] = await c.getMultipleAccountsInfo([
                    a,
                    (0, eA.G)(a),
                    ...(m ? [m] : []),
                  ]);
                  if (((A = e), (p = n?.owner.toBase58()), t)) {
                    let e = (0, eb.i)(
                      (e) => eA.A.decodeBondingCurveNullable(e),
                      t,
                    );
                    e && (g = (0, eh.k)(e.quoteMint).toBase58());
                  }
                } catch {}
                if (d) return;
                let b = g ?? n,
                  T =
                    (b === m?.toBase58() ? p : void 0) ??
                    (await ey(c, b, () => d));
                if (d) return;
                let h = u(e, A ? A.owner.toBase58() : t, b, r, T);
                if (!h) return;
                let { release: C, token: S } = h;
                ((f.current = C),
                  (l.current = S),
                  (s.current = setInterval(() => {
                    l.current && o(l.current);
                  }, i)));
              })(),
              () => {
                ((d = !0),
                  s.current && (clearInterval(s.current), (s.current = null)),
                  (l.current = null),
                  f.current && (f.current(), (f.current = null)));
              }
            );
          }, [e, t, n, r, u, o, i, c]);
        })(t, s, r, c),
        e?.associatedUserAccountInfo);
      let A = e?.associatedUserAccountInfo?.decodedAccount;
      g[5] !== A?.amount
        ? ((f = new i.default(A?.amount?.toString() || 0)),
          (g[5] = A?.amount),
          (g[6] = f))
        : (f = g[6]);
      let b = f,
        h = e?.mintAccount?.accountInfo;
      g[7] !== t || g[8] !== h
        ? ((d = eg(t, h)), (g[7] = t), (g[8] = h), (g[9] = d))
        : (d = g[9]);
      let C = d,
        S = e?.bondingCurveAccountInfo ?? null,
        w = e?.bondingCurve ?? null,
        y = e?.poolAccountInfo ?? null,
        z = e?.pool ?? null,
        k = e?.mintAccount?.decodedAccount ?? null,
        M = e?.poolBaseTokenAccount?.decodedAccount ?? null,
        P = e?.poolQuoteTokenAccount?.decodedAccount ?? null,
        x = e?.associatedUserAccountInfo?.accountInfo ?? null,
        v = e?.quoteTokenProgram ?? null,
        I = !!e?.mintAccount;
      return (
        g[10] !== b ||
        g[11] !== P ||
        g[12] !== x ||
        g[13] !== v ||
        g[14] !== I ||
        g[15] !== S ||
        g[16] !== w ||
        g[17] !== y ||
        g[18] !== z ||
        g[19] !== k ||
        g[20] !== M ||
        g[21] !== C
          ? ((m = {
              bondingCurveAccountInfo: S,
              bondingCurve: w,
              poolAccountInfo: y,
              pool: z,
              mintAccount: k,
              poolBaseTokenAccount: M,
              poolQuoteTokenAccount: P,
              associatedUserAccountInfo: x,
              tokenBalance: b,
              quoteTokenProgram: v,
              transferFeeBps: C,
              isHydrated: I,
            }),
            (g[10] = b),
            (g[11] = P),
            (g[12] = x),
            (g[13] = v),
            (g[14] = I),
            (g[15] = S),
            (g[16] = w),
            (g[17] = y),
            (g[18] = z),
            (g[19] = k),
            (g[20] = M),
            (g[21] = C),
            (g[22] = m))
          : (m = g[22]),
        m
      );
    };
  function ek(e) {
    return e.global;
  }
  function eM(e, t) {
    if (!t) return "";
    let n = e.coinsByMint[t];
    if (!n) return "";
    let r = n.bondingCurve,
      u = n.pool,
      o = n.poolBaseTokenAccount?.decodedAccount,
      i = n.poolQuoteTokenAccount?.decodedAccount,
      a = n.raydium,
      c = n.mintAccount?.decodedAccount,
      l = e.global?.global?.decodedAccount,
      s = e.global?.globalConfig?.decodedAccount;
    return [
      r?.complete ?? "",
      r?.virtualQuoteReserves?.toString() ?? "",
      r?.virtualTokenReserves?.toString() ?? "",
      u ? "pool" : "",
      o?.amount?.toString() ?? "",
      i?.amount?.toString() ?? "",
      a?.poolKeys ? "ray" : "",
      a?.baseVaultAccount?.decodedAccount?.amount?.toString() ?? "",
      a?.quoteVaultAccount?.decodedAccount?.amount?.toString() ?? "",
      c?.supply?.toString() ?? "",
      l ? "g" : "",
      s ? "gc" : "",
    ].join("_");
  }
  (e.s(
    [
      "G",
      0,
      (e, t, n, r) => {
        let o,
          i = (0, u.c)(2);
        return (
          i[0] !== e
            ? ((o = (t) => t.coinsByMint[e]), (i[0] = e), (i[1] = o))
            : (o = i[1]),
          ez((0, ep.f)(o), e, t, n, r)
        );
      },
      "$",
      0,
      (e) => {
        let t,
          n = (0, u.c)(2);
        return (
          n[0] !== e
            ? ((t = (t) => t.tokenBalanceByMint[e]), (n[0] = e), (n[1] = t))
            : (t = n[1]),
          (0, ep.f)(t)
        );
      },
      "g",
      0,
      (e, t, n, r) => {
        let u = (0, a.useCallback)((t) => t.coinsByMint[e], [e]);
        return ez((0, c.f)(ep.f, u), e, t, n, r);
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
            t = (0, u.c)(5),
            n = (0, ep.f)(ek),
            r = n.global?.decodedAccount ?? null,
            o = n.globalConfig?.decodedAccount ?? null,
            i = n.feeConfig?.decodedAccount ?? null,
            a = n.ammFeeConfig?.decodedAccount ?? null;
          return (
            t[0] !== r || t[1] !== o || t[2] !== i || t[3] !== a
              ? ((e = {
                  global: r,
                  globalConfig: o,
                  feeConfig: i,
                  ammFeeConfig: a,
                }),
                (t[0] = r),
                (t[1] = o),
                (t[2] = i),
                (t[3] = a),
                (t[4] = e))
              : (e = t[4]),
            e
          );
        },
      ],
      36629,
    ),
    e.s(["f", 0, eM], 732757));
  let eP = (e) => (!Number.isFinite(e) || e <= 0 ? 0 : Math.min(e, 1e15));
  function ex(e) {
    return e.connection;
  }
  function ev(e) {
    return e.leaseGcConfig;
  }
  function eI(e) {
    return e.touchLease;
  }
  function eB(e) {
    return e.setCoinRaydiumPool;
  }
  (e.s(
    [
      "f",
      0,
      function ({ isBuySelected: e, coin: t, slippagePercentage: n }) {
        let [r, u] = (0, a.useState)(0),
          [o, i] = (0, a.useState)(0),
          [c, l] = (0, a.useState)(!0),
          [s, f] = (0, a.useState)(null),
          [d, m] = (0, a.useState)(null),
          g = (0, a.useRef)(null),
          [p, A] = (0, a.useState)(!1),
          [b, T] = (0, a.useState)(null),
          [h, C] = (0, a.useState)(null),
          S = (0, a.useRef)(0),
          w = (0, ep.f)((e) => e.getQuote),
          y = t?.mint,
          z = (0, ep.f)((e) => eM(e, y)),
          k = (0, a.useRef)(z);
        ((0, a.useEffect)(() => {
          l(e);
        }, [e]),
          (0, a.useEffect)(() => {
            if (s) {
              let e = setTimeout(() => {
                f(null);
              }, 500);
              return () => clearTimeout(e);
            }
          }, [s]));
        let M = (0, a.useCallback)((e, t) => {
            ((g.current = t?.inputAtomicAmount ?? null), u(eP(e)), m("amount"));
          }, []),
          P = (0, a.useCallback)(() => {
            g.current = null;
          }, []),
          x = (0, a.useCallback)((e) => {
            ((g.current = null), i(eP(e)), m("solAmount"));
          }, []);
        return (
          (0, a.useEffect)(() => {
            if (!t) return;
            let a = k.current !== z;
            (a && (k.current = z),
              (d || a) &&
                ((async () => {
                  let l = { run: null },
                    s = () => ((l.run = ++S.current), T(null), A(!0), l.run),
                    m = () => {
                      ((S.current += 1), A(!1), T(null), C(null));
                    };
                  try {
                    if (e) {
                      if (c && ("solAmount" === d || a)) {
                        if (o <= 0) {
                          (u(0), m());
                          return;
                        }
                        let e = s(),
                          r = await w({
                            direction: "buy",
                            uiAmount: o,
                            slippagePercentage: n,
                            mint: t.mint,
                            coin: t,
                          });
                        if (S.current !== e) return;
                        if ((C(r?.priceImpactPercent ?? null), r?.quote)) {
                          let e = Number(r.quote.amount) / 1e6;
                          u(e);
                        }
                      } else if (!c && "amount" === d) {
                        if (r <= 0) {
                          (i(0), m());
                          return;
                        }
                        let e = s(),
                          u = await w({
                            direction: "buy",
                            uiAmount: r,
                            inputAtomicAmount: g.current ?? void 0,
                            slippagePercentage: n,
                            mint: t.mint,
                            coin: t,
                            inputSide: "token",
                          });
                        if (S.current !== e) return;
                        if ((C(u?.priceImpactPercent ?? null), u?.quote)) {
                          let e = (0, eh.k)((0, eh.H)(t)),
                            n = (0, eh.N)(e, t.quote_decimals);
                          if (void 0 === n) return;
                          let r = Number(u.quote.amount) / 10 ** n;
                          (o < r ? f("up") : o > r && f("down"), i(r));
                        }
                      }
                    } else if ("amount" === d || a) {
                      if (r <= 0) {
                        (i(0), m());
                        return;
                      }
                      let e = s(),
                        u = await w({
                          direction: "sell",
                          uiAmount: r,
                          inputAtomicAmount: g.current ?? void 0,
                          slippagePercentage: n,
                          mint: t.mint,
                          coin: t,
                        });
                      if (S.current !== e) return;
                      if ((C(u?.priceImpactPercent ?? null), u?.quote)) {
                        let e = (0, eh.k)((0, eh.H)(t)),
                          n = (0, eh.N)(e, t.quote_decimals);
                        if (void 0 === n) return;
                        let r = Number(u.quote.amount) / 10 ** n;
                        (o < r ? f("up") : o > r && f("down"), i(r));
                      }
                    }
                  } catch (e) {
                    (console.error("[useQuoteState] Error computing quote:", e),
                      null !== l.run &&
                        S.current === l.run &&
                        (T(e instanceof Error ? e.message : String(e)),
                        C(null)));
                  } finally {
                    null !== l.run && S.current === l.run && A(!1);
                  }
                })(),
                d && m(null)));
          }, [r, o, e, c, d, t, n, w, z]),
          (0, a.useMemo)(
            () => ({
              amount: r,
              setAmount: M,
              clearAmountInputAtomic: P,
              solAmount: o,
              setSolAmount: x,
              nativeSelected: c,
              setNativeSelected: l,
              inputSolValueArrow: s,
              setInputSolValueArrow: f,
              isQuoting: p,
              quoteError: b,
              priceImpactPercent: h,
            }),
            [r, M, P, o, x, c, s, p, b, h],
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
            o = (0, u.c)(8),
            i = (0, ep.f)(eB),
            c = (0, ep.f)(eI),
            { heartbeatMs: l } = (0, ep.f)(ev),
            s = (0, ep.f)(ex),
            f = (0, a.useRef)(null),
            d = (0, a.useRef)(null),
            m = (0, a.useRef)(null);
          (o[0] !== s ||
          o[1] !== l ||
          o[2] !== t ||
          o[3] !== e ||
          o[4] !== i ||
          o[5] !== c
            ? ((n = () => {
                if (!s || !e || !t) return;
                let n = i(e, t);
                if (!n) return;
                let { release: r, token: u } = n;
                return (
                  (d.current = r),
                  (f.current = u),
                  (m.current = setInterval(() => {
                    f.current && c(f.current);
                  }, l)),
                  () => {
                    (m.current &&
                      (clearInterval(m.current), (m.current = null)),
                      (f.current = null),
                      d.current && (d.current(), (d.current = null)));
                  }
                );
              }),
              (r = [e, t, i, c, l, s]),
              (o[0] = s),
              (o[1] = l),
              (o[2] = t),
              (o[3] = e),
              (o[4] = i),
              (o[5] = c),
              (o[6] = n),
              (o[7] = r))
            : ((n = o[6]), (r = o[7])),
            (0, a.useEffect)(n, r));
        },
      ],
      688208,
    ),
    e.i(102824),
    e.s([], 70833));
};
