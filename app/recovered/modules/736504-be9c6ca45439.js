// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  "use strict";
  function t([e, n]) {
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
    })(n)}`;
  }
  var n,
    r = class extends Error {
      cause = this.cause;
      context;
      constructor(...[e, n]) {
        let r, i;
        (n &&
          Object.entries(Object.getOwnPropertyDescriptors(n)).forEach(
            ([t, n]) => {
              "cause" === t
                ? (i = { cause: n.value })
                : (void 0 === r && (r = { __code: e }),
                  Object.defineProperty(r, t, n));
            },
          ),
          super(
            (function (e, n = {}) {
              {
                let r = `Solana error #${e}; Decode this error by running \`npx @solana/errors decode -- ${e}`;
                return (
                  Object.keys(n).length &&
                    (r += ` '${btoa(Object.entries(n).map(t).join("&"))}'`),
                  `${r}\``
                );
              }
            })(e, r),
            i,
          ),
          (this.context = Object.freeze(void 0 === r ? { __code: e } : r)),
          (this.name = "SolanaError"));
      }
    };
  function i(...e) {
    "captureStackTrace" in Error &&
      "function" == typeof Error.captureStackTrace &&
      Error.captureStackTrace(...e);
  }
  function o(
    {
      errorCodeBaseOffset: e,
      getErrorContext: t,
      orderedErrorNames: n,
      rpcEnumError: f,
    },
    a,
  ) {
    let c, u;
    "string" == typeof f ? (c = f) : ((c = Object.keys(f)[0]), (u = f[c]));
    let s = e + n.indexOf(c),
      d = t(s, c, u),
      l = new r(s, d);
    return (i(l, a), l);
  }
  var f = [
      "GenericError",
      "InvalidArgument",
      "InvalidInstructionData",
      "InvalidAccountData",
      "AccountDataTooSmall",
      "InsufficientFunds",
      "IncorrectProgramId",
      "MissingRequiredSignature",
      "AccountAlreadyInitialized",
      "UninitializedAccount",
      "UnbalancedInstruction",
      "ModifiedProgramId",
      "ExternalAccountLamportSpend",
      "ExternalAccountDataModified",
      "ReadonlyLamportChange",
      "ReadonlyDataModified",
      "DuplicateAccountIndex",
      "ExecutableModified",
      "RentEpochModified",
      "NotEnoughAccountKeys",
      "AccountDataSizeChanged",
      "AccountNotExecutable",
      "AccountBorrowFailed",
      "AccountBorrowOutstanding",
      "DuplicateAccountOutOfSync",
      "Custom",
      "InvalidError",
      "ExecutableDataModified",
      "ExecutableLamportChange",
      "ExecutableAccountNotRentExempt",
      "UnsupportedProgramId",
      "CallDepth",
      "MissingAccount",
      "ReentrancyNotAllowed",
      "MaxSeedLengthExceeded",
      "InvalidSeeds",
      "InvalidRealloc",
      "ComputationalBudgetExceeded",
      "PrivilegeEscalation",
      "ProgramEnvironmentSetupFailure",
      "ProgramFailedToComplete",
      "ProgramFailedToCompile",
      "Immutable",
      "IncorrectAuthority",
      "BorshIoError",
      "AccountNotRentExempt",
      "InvalidAccountOwner",
      "ArithmeticOverflow",
      "UnsupportedSysvar",
      "IllegalOwner",
      "MaxAccountsDataAllocationsExceeded",
      "MaxAccountsExceeded",
      "MaxInstructionTraceLengthExceeded",
      "BuiltinProgramsMustConsumeComputeUnits",
    ],
    a = [
      "AccountInUse",
      "AccountLoadedTwice",
      "AccountNotFound",
      "ProgramAccountNotFound",
      "InsufficientFundsForFee",
      "InvalidAccountForFee",
      "AlreadyProcessed",
      "BlockhashNotFound",
      "CallChainTooDeep",
      "MissingSignatureForFee",
      "InvalidAccountIndex",
      "SignatureFailure",
      "InvalidProgramForExecution",
      "SanitizeFailure",
      "ClusterMaintenance",
      "AccountBorrowOutstanding",
      "WouldExceedMaxBlockCostLimit",
      "UnsupportedVersion",
      "InvalidWritableAccount",
      "WouldExceedMaxAccountCostLimit",
      "WouldExceedAccountDataBlockLimit",
      "TooManyAccountLocks",
      "AddressLookupTableNotFound",
      "InvalidAddressLookupTableOwner",
      "InvalidAddressLookupTableData",
      "InvalidAddressLookupTableIndex",
      "InvalidRentPayingAccount",
      "WouldExceedMaxVoteCostLimit",
      "WouldExceedAccountDataTotalLimit",
      "DuplicateInstruction",
      "InsufficientFundsForRent",
      "MaxLoadedAccountsDataSizeExceeded",
      "InvalidLoadedAccountsDataSizeLimit",
      "ResanitizationNeeded",
      "ProgramExecutionTemporarilyRestricted",
      "UnbalancedTransaction",
    ];
  function c(e, t) {
    return e.length === t.length && e.every((e, n) => e === t[n]);
  }
  function u(e, t) {
    return "fixedSize" in t ? t.fixedSize : t.getSizeFromValue(e);
  }
  function s(e) {
    return Object.freeze({
      ...e,
      encode: (t) => {
        let n = new Uint8Array(u(t, e));
        return (e.write(t, n, 0), n);
      },
    });
  }
  function d(e) {
    return Object.freeze({ ...e, decode: (t, n = 0) => e.read(t, n)[0] });
  }
  function l(e) {
    return "fixedSize" in e && "number" == typeof e.fixedSize;
  }
  function g(e, t) {
    if (l(e) !== l(t)) throw new r(8078004);
    if (l(e) && l(t) && e.fixedSize !== t.fixedSize)
      throw new r(8078005, {
        decoderFixedSize: t.fixedSize,
        encoderFixedSize: e.fixedSize,
      });
    if (!l(e) && !l(t) && e.maxSize !== t.maxSize)
      throw new r(8078006, {
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
  function m(e, t, n = 0) {
    if (t.length - n <= 0) throw new r(8078e3, { codecDescription: e });
  }
  function x(e, t, n, i = 0) {
    let o = n.length - i;
    if (o < t)
      throw new r(8078001, {
        bytesLength: o,
        codecDescription: e,
        expected: t,
      });
  }
  function z(e, t, n) {
    if (t < 0 || t > n)
      throw new r(8078014, { bytesLength: n, codecDescription: e, offset: t });
  }
  function p(e, t, n) {
    let r,
      i = e.byteOffset + (t ?? 0),
      o = n ?? e.byteLength;
    return (
      "u" < typeof SharedArrayBuffer
        ? (r = e.buffer)
        : e.buffer instanceof SharedArrayBuffer
          ? new Uint8Array((r = new ArrayBuffer(e.length))).set(
              new Uint8Array(e),
            )
          : (r = e.buffer),
      (0 === i || i === -e.byteLength) && o === e.byteLength
        ? r
        : r.slice(i, i + o)
    );
  }
  function S(e, t) {
    return d({
      ...e,
      read: (n, r) => {
        let i = (e) => b(e, n.length),
          o = t.preOffset
            ? t.preOffset({ bytes: n, preOffset: r, wrapBytes: i })
            : r;
        z("offsetDecoder", o, n.length);
        let [f, a] = e.read(n, o),
          c = t.postOffset
            ? t.postOffset({
                bytes: n,
                newPreOffset: o,
                postOffset: a,
                preOffset: r,
                wrapBytes: i,
              })
            : a;
        return (z("offsetDecoder", c, n.length), [f, c]);
      },
    });
  }
  function b(e, t) {
    return 0 === t ? 0 : ((e % t) + t) % t;
  }
  function h(e, t, n, i) {
    if (i < t || i > n)
      throw new r(8078011, { codecDescription: e, max: n, min: t, value: i });
  }
  (e.s(
    [
      "GN",
      0,
      323e4,
      "p2",
      0,
      3230004,
      "F_",
      0,
      3230003,
      "GU",
      0,
      3230002,
      "sJ",
      0,
      0x1ecdbe1,
      "_5",
      0,
      2800009,
      "C0",
      0,
      28e5,
      "$U",
      0,
      2800003,
      "Wh",
      0,
      2800011,
      "EY",
      0,
      2800008,
      "wC",
      0,
      2800004,
      "TQ",
      0,
      2800006,
      "FQ",
      0,
      2800007,
      "PX",
      0,
      2800005,
      "VK",
      0,
      2800010,
      "Tg",
      0,
      2800001,
      "Oe",
      0,
      4,
      "gO",
      0,
      8078e3,
      "c2",
      0,
      8078022,
      "pT",
      0,
      8078020,
      "hk",
      0,
      8078005,
      "Dm",
      0,
      8078006,
      "e4",
      0,
      8078004,
      "Ts",
      0,
      8078008,
      "w8",
      0,
      8078023,
      "x4",
      0,
      8078002,
      "ET",
      0,
      8078013,
      "bP",
      0,
      8078003,
      "Fv",
      0,
      8078001,
      "$0",
      0,
      8078018,
      "aU",
      0,
      8078009,
      "HW",
      0,
      8078010,
      "_G",
      0,
      8078015,
      "HO",
      0,
      8078007,
      "Pp",
      0,
      8078012,
      "EM",
      0,
      8078016,
      "XG",
      0,
      8078011,
      "P3",
      0,
      8078014,
      "VZ",
      0,
      8078021,
      "fZ",
      0,
      8078017,
      "rz",
      0,
      3611e3,
      "ZX",
      0,
      4615026,
      "EV",
      0,
      7618002,
      "yN",
      0,
      7618009,
      "wf",
      0,
      7618005,
      "Hk",
      0,
      7618003,
      "Lb",
      0,
      7618e3,
      "ke",
      0,
      7618001,
      "yg",
      0,
      7618004,
      "Lq",
      0,
      7618006,
      "W3",
      0,
      7618007,
      "a_",
      0,
      7618008,
      "fq",
      0,
      4128e3,
      "fj",
      0,
      4128001,
      "de",
      0,
      4128002,
      "oD",
      0,
      5,
      "OE",
      0,
      9900004,
      "tT",
      0,
      9900005,
      "mg",
      0,
      9900006,
      "X0",
      0,
      9900001,
      "pX",
      0,
      99e5,
      "Zd",
      0,
      9900003,
      "No",
      0,
      3704e3,
      "Sh",
      0,
      3704001,
      "dK",
      0,
      3704002,
      "MQ",
      0,
      3704004,
      "s9",
      0,
      3704003,
      "SY",
      0,
      6,
      "_B",
      0,
      7,
      "Cq",
      0,
      8,
      "w9",
      0,
      5607013,
      "mR",
      0,
      5607002,
      "u",
      0,
      5607012,
      "NH",
      0,
      5607003,
      "O_",
      0,
      5607e3,
      "Fo",
      0,
      5607007,
      "vM",
      0,
      5607008,
      "WJ",
      0,
      5607009,
      "py",
      0,
      5607010,
      "y7",
      0,
      5607005,
      "U2",
      0,
      5607004,
      "DB",
      0,
      5607001,
      "E9",
      0,
      5607015,
      "U0",
      0,
      5607016,
      "om",
      0,
      5607011,
      "ay",
      0,
      5607017,
      "t",
      0,
      5607014,
      "hf",
      0,
      5607006,
      "tN",
      0,
      819e4,
      "QP",
      0,
      8190002,
      "GA",
      0,
      8190003,
      "oF",
      0,
      8190004,
      "fB",
      0,
      8190001,
      "po",
      0,
      8100003,
      "Fq",
      0,
      81e5,
      "Hc",
      0,
      8100002,
      "OP",
      0,
      8100001,
      "Zx",
      0,
      5508e3,
      "iU",
      0,
      5508001,
      "h_",
      0,
      5508003,
      "Wr",
      0,
      5508004,
      "sL",
      0,
      5508002,
      "sM",
      0,
      5508006,
      "yo",
      0,
      5508007,
      "Sw",
      0,
      5508008,
      "Vx",
      0,
      5508005,
      "VB",
      0,
      5508009,
      "pB",
      0,
      5508010,
      "bQ",
      0,
      3610007,
      "za",
      0,
      3610001,
      "S4",
      0,
      361e4,
      "t1",
      0,
      3610002,
      "Es",
      0,
      3610003,
      "YK",
      0,
      3610004,
      "X_",
      0,
      3610005,
      "RV",
      0,
      3610006,
      "pf",
      0,
      9,
      "xK",
      0,
      5663015,
      "nA",
      0,
      5663016,
      "Ka",
      0,
      5663020,
      "pv",
      0,
      5663002,
      "go",
      0,
      5663003,
      "r8",
      0,
      5663005,
      "jw",
      0,
      5663006,
      "qD",
      0,
      5663008,
      "rY",
      0,
      5663007,
      "yV",
      0,
      5663018,
      "Wp",
      0,
      5663019,
      "f_",
      0,
      5663012,
      "C4",
      0,
      5663e3,
      "Eq",
      0,
      5663001,
      "Vy",
      0,
      5663017,
      "QN",
      0,
      5663022,
      "zm",
      0,
      5663009,
      "oq",
      0,
      5663021,
      "sI",
      0,
      5663004,
      "Py",
      0,
      r,
      "Mq",
      0,
      function e(t) {
        var n;
        let c;
        if (
          "object" == typeof (n = t) &&
          null !== n &&
          "code" in n &&
          "message" in n &&
          ("number" == typeof n.code || "bigint" == typeof n.code) &&
          "string" == typeof n.message
        ) {
          let { code: e, data: n, message: i } = t,
            u = Number(e);
          if (-32002 === u) {
            let { err: e, ...t } = n,
              i = e
                ? {
                    cause: (function e(t) {
                      return "object" == typeof t && "InstructionError" in t
                        ? (function e(t, n) {
                            let r = Number(t);
                            return o(
                              {
                                errorCodeBaseOffset: 4615001,
                                getErrorContext: (e, t, n) =>
                                  4615e3 === e
                                    ? {
                                        errorName: t,
                                        index: r,
                                        ...(void 0 !== n
                                          ? { instructionErrorContext: n }
                                          : null),
                                      }
                                    : 4615026 === e
                                      ? { code: Number(n), index: r }
                                      : { index: r },
                                orderedErrorNames: f,
                                rpcEnumError: n,
                              },
                              e,
                            );
                          })(...t.InstructionError)
                        : o(
                            {
                              errorCodeBaseOffset: 7050001,
                              getErrorContext: (e, t, n) =>
                                705e4 === e
                                  ? {
                                      errorName: t,
                                      ...(void 0 !== n
                                        ? { transactionErrorContext: n }
                                        : null),
                                    }
                                  : 7050030 === e
                                    ? { index: Number(n) }
                                    : 7050031 === e || 7050035 === e
                                      ? {
                                          accountIndex: Number(n.account_index),
                                        }
                                      : void 0,
                              orderedErrorNames: a,
                              rpcEnumError: t,
                            },
                            e,
                          );
                    })(e),
                  }
                : null;
            c = new r(-32002, { ...t, ...i });
          } else {
            let e;
            switch (u) {
              case -32603:
              case -32602:
              case -32600:
              case -32601:
              case -32700:
              case -32012:
              case -32001:
              case -32004:
              case -32014:
              case -32010:
              case -32009:
              case -32007:
              case -32006:
              case -32015:
                e = { __serverMessage: i };
                break;
              default:
                "object" != typeof n || Array.isArray(n) || (e = n);
            }
            c = new r(u, e);
          }
        } else {
          let e =
            "object" == typeof t &&
            null !== t &&
            "message" in t &&
            "string" == typeof t.message
              ? t.message
              : "Malformed JSON-RPC error with no message attribute";
          c = new r(10, { error: t, message: e });
        }
        return (i(c, e), c);
      },
      "js",
      0,
      function (e, t) {
        return (
          e instanceof Error &&
          "SolanaError" === e.name &&
          (void 0 === t || e.context.__code === t)
        );
      },
      "dj",
      0,
      i,
    ],
    806805,
  ),
    e.s(
      [
        "T",
        0,
        function (e, t) {
          let n = (n, r) => {
            let [i, o] = t.read(n, r),
              f = Number(i);
            return (
              ((r = o) > 0 || n.length > f) && (n = n.slice(r, r + f)),
              x("addDecoderSizePrefix", f, n),
              [e.decode(n), r + f]
            );
          };
          if (l(t) && l(e))
            return d({ ...e, fixedSize: t.fixedSize + e.fixedSize, read: n });
          let r = l(t) ? t.fixedSize : (t.maxSize ?? null),
            i = l(e) ? e.fixedSize : (e.maxSize ?? null),
            o = null !== r && null !== i ? r + i : null;
          return d({ ...e, ...(null !== o ? { maxSize: o } : {}), read: n });
        },
        "b",
        0,
        function (e, t) {
          let n = (n, r, i) => {
            let o = e.encode(n);
            return ((i = t.write(o.length, r, i)), r.set(o, i), i + o.length);
          };
          if (l(t) && l(e))
            return s({ ...e, fixedSize: t.fixedSize + e.fixedSize, write: n });
          let r = l(t) ? t.fixedSize : (t.maxSize ?? null),
            i = l(e) ? e.fixedSize : (e.maxSize ?? null),
            o = null !== r && null !== i ? r + i : null;
          return s({
            ...e,
            ...(null !== o ? { maxSize: o } : {}),
            getSizeFromValue: (n) => {
              let r = u(n, e);
              return u(r, t) + r;
            },
            write: n,
          });
        },
        "n",
        0,
        x,
        "X",
        0,
        m,
        "m",
        0,
        function (e) {
          if (!l(e)) throw new r(8078002);
        },
        "p",
        0,
        c,
        "g",
        0,
        g,
        "j",
        0,
        function (e, t, n) {
          return c(
            0 === n && e.length === t.length ? e : e.slice(n, n + t.length),
            t,
          );
        },
        "i",
        0,
        d,
        "F",
        0,
        s,
        "K",
        0,
        function (e, t) {
          return d({
            fixedSize: t,
            read: (n, r) => {
              let i, o;
              (x("fixCodecSize", t, n, r),
                (r > 0 || n.length > t) && (n = n.slice(r, r + t)),
                l(e) &&
                  ((i = n),
                  (o = e.fixedSize),
                  (n = (function (e, t) {
                    if (e.length >= t) return e;
                    let n = new Uint8Array(t).fill(0);
                    return (n.set(e), n);
                  })(i.length <= o ? i : i.slice(0, o), o))));
              let [f] = e.read(n, 0);
              return [f, r + t];
            },
          });
        },
        "w",
        0,
        function (e, t) {
          return s({
            fixedSize: t,
            write: (n, r, i) => {
              let o = e.encode(n),
                f = o.length > t ? o.slice(0, t) : o;
              return (r.set(f, i), i + t);
            },
          });
        },
        "N",
        0,
        u,
        "Z",
        0,
        l,
        "q",
        0,
        S,
        "k",
        0,
        function (e, t) {
          var n, i;
          return (
            (n = (function (e, t) {
              if (l(e)) {
                let n = t(e.fixedSize);
                if (n < 0)
                  throw new r(8078013, {
                    bytesLength: n,
                    codecDescription: "resizeEncoder",
                  });
                return s({ ...e, fixedSize: n });
              }
              return s({
                ...e,
                getSizeFromValue: (n) => {
                  let i = t(e.getSizeFromValue(n));
                  if (i < 0)
                    throw new r(8078013, {
                      bytesLength: i,
                      codecDescription: "resizeEncoder",
                    });
                  return i;
                },
              });
            })(e, (e) => e + t)),
            (i = { preOffset: ({ preOffset: e }) => e + t }),
            s({
              ...n,
              write: (e, t, r) => {
                let o = (e) => b(e, t.length),
                  f = i.preOffset
                    ? i.preOffset({ bytes: t, preOffset: r, wrapBytes: o })
                    : r;
                z("offsetEncoder", f, t.length);
                let a = n.write(e, t, f),
                  c = i.postOffset
                    ? i.postOffset({
                        bytes: t,
                        newPreOffset: f,
                        postOffset: a,
                        preOffset: r,
                        wrapBytes: o,
                      })
                    : a;
                return (z("offsetEncoder", c, t.length), c);
              },
            })
          );
        },
        "z",
        0,
        function (e, t) {
          return S(
            (function (e, t) {
              if (l(e)) {
                let n = t(e.fixedSize);
                if (n < 0)
                  throw new r(8078013, {
                    bytesLength: n,
                    codecDescription: "resizeDecoder",
                  });
                return d({ ...e, fixedSize: n });
              }
              return e;
            })(e, (e) => e + t),
            { postOffset: ({ postOffset: e }) => e + t },
          );
        },
        "G",
        0,
        p,
        "l",
        0,
        function (e, t) {
          return d({
            ...e,
            read: (n, r) => {
              let [i, o] = e.read(n, r);
              return [t(i, n, r), o];
            },
          });
        },
        "P",
        0,
        function (e, t) {
          return s({
            ...(!l(e)
              ? { ...e, getSizeFromValue: (n) => e.getSizeFromValue(t(n)) }
              : e),
            write: (n, r, i) => e.write(t(n), r, i),
          });
        },
      ],
      360982,
    ));
  var w =
    (((n = w || {})[(n.Little = 0)] = "Little"), (n[(n.Big = 1)] = "Big"), n);
  function y(e) {
    return e?.endian !== 1;
  }
  function A(e) {
    return s({
      fixedSize: e.size,
      write(t, n, r) {
        e.range && h(e.name, e.range[0], e.range[1], t);
        let i = new ArrayBuffer(e.size);
        return (
          e.set(new DataView(i), t, y(e.config)),
          n.set(new Uint8Array(i), r),
          r + e.size
        );
      },
    });
  }
  function E(e) {
    return d({
      fixedSize: e.size,
      read(t, n = 0) {
        (m(e.name, t, n), x(e.name, e.size, t, n));
        let r = new DataView(p(t, n, e.size));
        return [e.get(r, y(e.config)), n + e.size];
      },
    });
  }
  var I = (e = {}) =>
      A({
        config: e,
        name: "u64",
        range: [0n, BigInt("0xffffffffffffffff")],
        set: (e, t, n) => e.setBigUint64(0, BigInt(t), n),
        size: 8,
      }),
    O = (e = {}) =>
      E({
        config: e,
        get: (e, t) => e.getBigUint64(0, t),
        name: "u64",
        size: 8,
      });
  e.s(
    [
      "W",
      0,
      (e = {}) =>
        E({
          config: e,
          get: (e, t) => e.getFloat64(0, t),
          name: "f64",
          size: 8,
        }),
      "M",
      0,
      (e = {}) =>
        A({
          config: e,
          name: "f64",
          set: (e, t, n) => e.setFloat64(0, Number(t), n),
          size: 8,
        }),
      "R",
      0,
      (e = {}) =>
        E({ config: e, get: (e, t) => e.getInt16(0, t), name: "i16", size: 2 }),
      "u",
      0,
      (e = {}) =>
        A({
          config: e,
          name: "i16",
          range: [-Number("0x7fff") - 1, Number("0x7fff")],
          set: (e, t, n) => e.setInt16(0, Number(t), n),
          size: 2,
        }),
      "b",
      0,
      (e = {}) =>
        E({
          config: e,
          get: (e, t) => e.getBigInt64(0, t),
          name: "i64",
          size: 8,
        }),
      "_",
      0,
      (e = {}) =>
        A({
          config: e,
          name: "i64",
          range: [
            -BigInt("0x7fffffffffffffff") - 1n,
            BigInt("0x7fffffffffffffff"),
          ],
          set: (e, t, n) => e.setBigInt64(0, BigInt(t), n),
          size: 8,
        }),
      "i",
      0,
      () => E({ get: (e) => e.getInt8(0), name: "i8", size: 1 }),
      "$",
      0,
      () =>
        A({
          name: "i8",
          range: [-Number("0x7f") - 1, Number("0x7f")],
          set: (e, t) => e.setInt8(0, Number(t)),
          size: 1,
        }),
      "S",
      0,
      () =>
        d({
          maxSize: 3,
          read: (e, t) => {
            let n = 0,
              r = 0;
            for (; ++r; ) {
              let i = r - 1,
                o = e[t + i];
              if (((n |= (127 & o) << (7 * i)), (128 & o) == 0)) break;
            }
            return [n, t + r];
          },
        }),
      "t",
      0,
      () =>
        s({
          getSizeFromValue: (e) => (e <= 127 ? 1 : e <= 16383 ? 2 : 3),
          maxSize: 3,
          write: (e, t, n) => {
            h("shortU16", 0, 65535, e);
            let r = [0];
            for (let t = 0; ; t += 1) {
              let n = Number(e) >> (7 * t);
              if (0 === n) break;
              let i = 127 & n;
              ((r[t] = i), t > 0 && (r[t - 1] |= 128));
            }
            return (t.set(r, n), n + r.length);
          },
        }),
      "T",
      0,
      (e = {}) =>
        E({
          config: e,
          get: (e, t) => {
            let n = 8 * !!t,
              r = 8 * !t;
            return (e.getBigUint64(n, t) << 64n) + e.getBigUint64(r, t);
          },
          name: "u128",
          size: 16,
        }),
      "y",
      0,
      (e = {}) =>
        A({
          config: e,
          name: "u128",
          range: [0n, BigInt("0xffffffffffffffffffffffffffffffff")],
          set: (e, t, n) => {
            let r = 8 * !!n,
              i = 8 * !n;
            (e.setBigUint64(r, BigInt(t) >> 64n, n),
              e.setBigUint64(i, 0xffffffffffffffffn & BigInt(t), n));
          },
          size: 16,
        }),
      "C",
      0,
      (e = {}) =>
        E({
          config: e,
          get: (e, t) => e.getUint16(0, t),
          name: "u16",
          size: 2,
        }),
      "K",
      0,
      (e = {}) =>
        A({
          config: e,
          name: "u16",
          range: [0, Number("0xffff")],
          set: (e, t, n) => e.setUint16(0, Number(t), n),
          size: 2,
        }),
      "o",
      0,
      (e = {}) =>
        E({
          config: e,
          get: (e, t) => e.getUint32(0, t),
          name: "u32",
          size: 4,
        }),
      "H",
      0,
      (e = {}) =>
        A({
          config: e,
          name: "u32",
          range: [0, Number("0xffffffff")],
          set: (e, t, n) => e.setUint32(0, Number(t), n),
          size: 4,
        }),
      "w",
      0,
      (e = {}) => g(I(e), O(e)),
      "X",
      0,
      O,
      "f",
      0,
      I,
      "n",
      0,
      () => E({ get: (e) => e.getUint8(0), name: "u8", size: 1 }),
      "c",
      0,
      () =>
        A({
          name: "u8",
          range: [0, Number("0xff")],
          set: (e, t) => e.setUint8(0, Number(t)),
          size: 1,
        }),
    ],
    736504,
  );
};
