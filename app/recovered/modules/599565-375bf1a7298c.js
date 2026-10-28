// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  "use strict";
  let t;
  var i,
    r,
    n = e.i(598854),
    a = e.i(408162);
  let o = {
      get: function () {
        let e = this._zod;
        return (
          e.message ??
            (e.message = JSON.stringify(e.def, a.jsonStringifyReplacer, 2)),
          e.message
        );
      },
      set: function (e) {
        this._zod.message = e;
      },
      enumerable: !0,
      configurable: !0,
    },
    u = { value: void 0, enumerable: !1 },
    s = { value: void 0, enumerable: !1 },
    l = new WeakSet([Object.prototype, Error.prototype]),
    d = (e, t) => {
      ((e.name = "$ZodError"),
        (u.value = e._zod),
        Object.defineProperty(e, "_zod", u),
        (s.value = t),
        Object.defineProperty(e, "issues", s),
        (u.value = void 0),
        (s.value = void 0),
        Object.defineProperty(e, "message", o));
      let i = Object.getPrototypeOf(e);
      l.has(i) ||
        (l.add(i),
        Object.defineProperty(i, "toString", {
          configurable: !0,
          enumerable: !1,
          get() {
            let e = () => this.message;
            return (
              Object.defineProperty(this, "toString", {
                value: e,
                configurable: !0,
                writable: !0,
              }),
              e
            );
          },
          set(e) {
            Object.defineProperty(this, "toString", {
              value: e,
              configurable: !0,
              writable: !0,
            });
          },
        }));
    },
    c = (0, n.$constructor)("$ZodError", d),
    m = (0, n.$constructor)("$ZodError", d, void 0, { Parent: Error });
  function f(e, t = (e) => e.message) {
    let i = {},
      r = [];
    for (let o of e.issues)
      if (o.path.length > 0) {
        var n, a;
        ((n = o.path[0]),
        (a = () => []),
        !Object.prototype.hasOwnProperty.call(i, n) &&
          ("__proto__" === n
            ? Object.defineProperty(i, n, {
                value: a(),
                writable: !0,
                enumerable: !0,
                configurable: !0,
              })
            : (i[n] = a())),
        i[n]).push(t(o));
      } else r.push(t(o));
    return { formErrors: r, fieldErrors: i };
  }
  function p(e, t = (e) => e.message) {
    let i = { _errors: [] },
      r = (e, n = []) => {
        for (let a of e.issues)
          if ("invalid_union" === a.code && a.errors.length)
            a.errors.map((e) => r({ issues: e }, [...n, ...a.path]));
          else if ("invalid_key" === a.code)
            r({ issues: a.issues }, [...n, ...a.path]);
          else if ("invalid_element" === a.code)
            r({ issues: a.issues }, [...n, ...a.path]);
          else {
            let e = [...n, ...a.path];
            if (0 === e.length) i._errors.push(t(a));
            else {
              let r = i,
                n = 0;
              for (; n < e.length; ) {
                let i = e[n],
                  o = n === e.length - 1;
                if ("_errors" === i) {
                  (o && r._errors.push(t(a)), n++);
                  continue;
                }
                Object.prototype.hasOwnProperty.call(r, i) ||
                  Object.defineProperty(r, i, {
                    value: { _errors: [] },
                    enumerable: !0,
                    writable: !0,
                    configurable: !0,
                  });
                let u = r[i];
                (o && u._errors.push(t(a)), (r = u), n++);
              }
            }
          }
      };
    return (r(e), i);
  }
  function v(e, t = (e) => e.message) {
    let i = { errors: [] },
      r = (e, n = []) => {
        var a;
        for (let o of e.issues)
          if ("invalid_union" === o.code && o.errors.length)
            o.errors.map((e) => r({ issues: e }, [...n, ...o.path]));
          else if ("invalid_key" === o.code)
            r({ issues: o.issues }, [...n, ...o.path]);
          else if ("invalid_element" === o.code)
            r({ issues: o.issues }, [...n, ...o.path]);
          else {
            let e = [...n, ...o.path];
            if (0 === e.length) {
              i.errors.push(t(o));
              continue;
            }
            let r = i,
              u = 0;
            for (; u < e.length; ) {
              let i = e[u],
                n = u === e.length - 1;
              ("string" == typeof i
                ? (r.properties ?? (r.properties = {}),
                  Object.prototype.hasOwnProperty.call(r.properties, i) ||
                    Object.defineProperty(r.properties, i, {
                      value: { errors: [] },
                      enumerable: !0,
                      writable: !0,
                      configurable: !0,
                    }),
                  (r = r.properties[i]))
                : (r.items ?? (r.items = []),
                  (a = r.items)[i] ?? (a[i] = { errors: [] }),
                  (r = r.items[i])),
                n && r.errors.push(t(o)),
                u++);
            }
          }
      };
    return (r(e), i);
  }
  function g(e) {
    let t = [];
    for (let i of e.map((e) => ("object" == typeof e ? e.key : e)))
      "number" == typeof i
        ? t.push(`[${i}]`)
        : "symbol" == typeof i
          ? t.push(`[${JSON.stringify(String(i))}]`)
          : /[^\w$]/.test(i)
            ? t.push(`[${JSON.stringify(i)}]`)
            : (t.length && t.push("."), t.push(i));
    return t.join("");
  }
  function $(e) {
    let t = [];
    for (let i of [...e.issues].sort(
      (e, t) => (e.path ?? []).length - (t.path ?? []).length,
    ))
      (t.push(`✖ ${i.message}`),
        i.path?.length && t.push(`  → at ${g(i.path)}`));
    return t.join("\n");
  }
  function h(e, t) {
    return { callee: t?.callee ?? e, Err: t?.Err };
  }
  e.s(
    [
      "$ZodError",
      0,
      c,
      "$ZodRealError",
      0,
      m,
      "flattenError",
      0,
      f,
      "formatError",
      0,
      p,
      "prettifyError",
      0,
      $,
      "toDotPath",
      0,
      g,
      "treeifyError",
      0,
      v,
    ],
    562016,
  );
  let y = (e) => {
      let t = (i, r, o, u) => {
        let s = o ? { ...o, async: !1 } : { async: !1 },
          l = i._zod.run({ value: r, issues: [] }, s);
        if (l instanceof Promise) throw new n.$ZodAsyncError();
        if (l.issues.length) {
          let i = new (u?.Err ?? e)(
            l.issues.map((e) => a.finalizeIssue(e, s, n.config())),
          );
          throw (a.captureStackTrace(i, u?.callee ?? t), i);
        }
        return l.value;
      };
      return t;
    },
    _ = y(m),
    b = (e) => {
      let t = async (i, r, o, u) => {
        let s = o ? { ...o, async: !0 } : { async: !0 },
          l = i._zod.run({ value: r, issues: [] }, s);
        if ((l instanceof Promise && (l = await l), l.issues.length)) {
          let i = new (u?.Err ?? e)(
            l.issues.map((e) => a.finalizeIssue(e, s, n.config())),
          );
          throw (a.captureStackTrace(i, u?.callee ?? t), i);
        }
        return l.value;
      };
      return t;
    },
    x = b(m),
    k = (e) => (t, i, r) => {
      let o = r ? { ...r, async: !1 } : { async: !1 },
        u = t._zod.run({ value: i, issues: [] }, o);
      if (u instanceof Promise) throw new n.$ZodAsyncError();
      return u.issues.length
        ? {
            success: !1,
            error: new (e ?? c)(
              u.issues.map((e) => a.finalizeIssue(e, o, n.config())),
            ),
          }
        : { success: !0, data: u.value };
    },
    I = k(m),
    w = (e) => async (t, i, r) => {
      let o = r ? { ...r, async: !0 } : { async: !0 },
        u = t._zod.run({ value: i, issues: [] }, o);
      return (
        u instanceof Promise && (u = await u),
        u.issues.length
          ? {
              success: !1,
              error: new e(
                u.issues.map((e) => a.finalizeIssue(e, o, n.config())),
              ),
            }
          : { success: !0, data: u.value }
      );
    },
    z = w(m),
    S = Symbol.for("zod.compile.invalid"),
    U = Symbol.for("zod.compile.fallback"),
    j = (e, t, i) => {
      let r = e._zod.bag.validator;
      return (
        (void 0 !== r && r(t) !== S) ||
        (function (e, t, i) {
          let r,
            a = i ? { ...i, async: !1 } : { async: !1 },
            o = e._zod.bag.fallbackRun;
          if (
            (o
              ? ((a[U] = !0), (r = o({ value: t, issues: [] }, a)))
              : (r = e._zod.run({ value: t, issues: [] }, a)),
            r instanceof Promise)
          )
            throw new n.$ZodAsyncError();
          return 0 === r.issues.length;
        })(e, t, i)
      );
    },
    D = async (e, t, i) => {
      let r = i ? { ...i, async: !0 } : { async: !0 },
        n = e._zod.run({ value: t, issues: [] }, r);
      return (n instanceof Promise && (n = await n), 0 === n.issues.length);
    },
    O = (e) => {
      let t = y(e),
        i = (e, r, n, a) =>
          t(
            e,
            r,
            n ? { ...n, direction: "backward" } : { direction: "backward" },
            h(i, a),
          );
      return i;
    },
    Z = O(m),
    P = (e) => {
      let t = y(e),
        i = (e, r, n, a) => t(e, r, n, h(i, a));
      return i;
    },
    N = P(m),
    A = (e) => {
      let t = b(e),
        i = async (e, r, n, a) => {
          let o = n
            ? { ...n, direction: "backward" }
            : { direction: "backward" };
          return await t(e, r, o, h(i, a));
        };
      return i;
    },
    T = A(m),
    E = (e) => {
      let t = b(e),
        i = async (e, r, n, a) => await t(e, r, n, h(i, a));
      return i;
    },
    L = E(m),
    C = (e) => (t, i, r) => {
      let n = r ? { ...r, direction: "backward" } : { direction: "backward" };
      return k(e)(t, i, n);
    },
    V = C(m),
    R = (e) => (t, i, r) => k(e)(t, i, r),
    J = R(m),
    M = (e) => async (t, i, r) => {
      let n = r ? { ...r, direction: "backward" } : { direction: "backward" };
      return w(e)(t, i, n);
    },
    F = M(m),
    W = (e) => async (t, i, r) => w(e)(t, i, r),
    K = W(m);
  (e.s(
    [
      "_decode",
      0,
      P,
      "_decodeAsync",
      0,
      E,
      "_encode",
      0,
      O,
      "_encodeAsync",
      0,
      A,
      "_parse",
      0,
      y,
      "_parseAsync",
      0,
      b,
      "_safeDecode",
      0,
      R,
      "_safeDecodeAsync",
      0,
      W,
      "_safeEncode",
      0,
      C,
      "_safeEncodeAsync",
      0,
      M,
      "_safeParse",
      0,
      k,
      "_safeParseAsync",
      0,
      w,
      "decode",
      0,
      N,
      "decodeAsync",
      0,
      L,
      "encode",
      0,
      Z,
      "encodeAsync",
      0,
      T,
      "parse",
      0,
      _,
      "parseAsync",
      0,
      x,
      "safeDecode",
      0,
      J,
      "safeDecodeAsync",
      0,
      K,
      "safeEncode",
      0,
      V,
      "safeEncodeAsync",
      0,
      F,
      "safeParse",
      0,
      I,
      "safeParseAsync",
      0,
      z,
      "validate",
      0,
      j,
      "validateAsync",
      0,
      D,
    ],
    575635,
  ),
    e.i(575635),
    e.i(562016));
  let G = /^[cC][0-9a-z]{6,}$/,
    B = /^[0-9a-z]+$/,
    X = /^[0-7][0-9A-HJKMNP-TV-Za-hjkmnp-tv-z]{25}$/,
    q = /^[0-9a-vA-V]{20}$/,
    H = /^[A-Za-z0-9]{27}$/,
    Y = /^[a-zA-Z0-9_-]{21}$/;
  function Q(e) {
    return RegExp(`^[a-zA-Z0-9_-]{${e}}$`);
  }
  let ee =
      /^P(?:(\d+W)|(?!.*W)(?=\d|T\d)(\d+Y)?(\d+M)?(\d+D)?(T(?=\d)(\d+H)?(\d+M)?(\d+([.,]\d+)?S)?)?)$/,
    et =
      /^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12})$/,
    ei = (e) =>
      e
        ? RegExp(
            `^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-${e}[0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12})$`,
          )
        : /^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000|ffffffff-ffff-ffff-ffff-ffffffffffff)$/,
    er = ei(4),
    en = ei(6),
    ea = ei(7),
    eo =
      /^(?!\.)(?!.*\.\.)([A-Za-z0-9_'+\-\.]*)[A-Za-z0-9_+-]@([A-Za-z0-9][A-Za-z0-9\-]*\.)+[A-Za-z]{2,}$/,
    eu = /^[^\s@"]{1,64}@[^\s@]{1,255}$/u;
  function es() {
    return RegExp("^[\\p{Extended_Pictographic}\\p{Emoji_Component}]+$", "u");
  }
  let el =
      /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])$/,
    ed =
      /^(([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:))$/,
    ec = (e) => {
      let t = a.escapeRegex(e ?? ":");
      return RegExp(
        `^(?:[0-9A-F]{2}${t}){5}[0-9A-F]{2}$|^(?:[0-9a-f]{2}${t}){5}[0-9a-f]{2}$`,
      );
    },
    em =
      /^((25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\/([0-9]|[1-2][0-9]|3[0-2])$/,
    ef =
      /^(([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:))\/(12[0-8]|1[01][0-9]|[1-9]?[0-9])$/,
    ep =
      /^$|^(?:[0-9a-zA-Z+/]{4})*(?:(?:[0-9a-zA-Z+/]{2}==)|(?:[0-9a-zA-Z+/]{3}=))?$/,
    ev = /^[A-Za-z0-9_-]*$/,
    eg = /^https?$/,
    e$ = /^\+[1-9]\d{6,14}$/,
    eh = /^\d(?:[ -]?\d){11,18}$/,
    ey =
      "(?:(?:\\d\\d[2468][048]|\\d\\d[13579][26]|\\d\\d0[48]|[02468][048]00|[13579][26]00)-02-29|\\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\\d|30)|(?:02)-(?:0[1-9]|1\\d|2[0-8])))",
    e_ = RegExp(`^${ey}$`);
  function eb(e) {
    let t = "(?:[01]\\d|2[0-3]):[0-5]\\d";
    return "number" == typeof e.precision
      ? -1 === e.precision
        ? `${t}`
        : 0 === e.precision
          ? `${t}:[0-5]\\d`
          : `${t}:[0-5]\\d\\.\\d{${e.precision}}`
      : e.seconds
        ? `${t}:[0-5]\\d(?:\\.\\d+)?`
        : `${t}(?::[0-5]\\d(?:\\.\\d+)?)?`;
  }
  function ex(e) {
    return RegExp(`^${eb(e)}$`);
  }
  function ek(e) {
    let t = ["Z"];
    e.offset && t.push("([+-](?:[01]\\d|2[0-3]):[0-5]\\d)");
    let i = `${eb({ precision: e.precision, seconds: !0 })}(?:${t.join("|")})`,
      r = e.local ? `${i}|${eb({ precision: e.precision })}` : i;
    return RegExp(`^${ey}T(?:${r})$`);
  }
  let eI = (e) => {
      let t = e
        ? `[\\s\\S]{${e?.minimum ?? 0},${e?.maximum ?? ""}}`
        : "[\\s\\S]*";
      return RegExp(`^${t}$`);
    },
    ew = /^-?\d+n?$/,
    ez = /^-?\d+$/,
    eS = /^-?\d+(?:\.\d+)?$/,
    eU = /^(?:true|false)$/i,
    ej = /^null$/i,
    eD = /^undefined$/i,
    eO = /^[^A-Z]*$/,
    eZ = /^[^a-z]*$/;
  function eP(e, t) {
    return RegExp(`^[A-Za-z0-9+/]{${e}}${t}$`);
  }
  function eN(e) {
    return RegExp(`^[A-Za-z0-9_-]{${e}}$`);
  }
  let eA = eP(22, "=="),
    eT = eN(22),
    eE = eP(27, "="),
    eL = eN(27),
    eC = eP(43, "="),
    eV = eN(43),
    eR = eP(64, ""),
    eJ = eN(64),
    eM = eP(86, "=="),
    eF = eN(86);
  e.s(
    [
      "base64",
      0,
      ep,
      "base64url",
      0,
      ev,
      "bigint",
      0,
      ew,
      "boolean",
      0,
      eU,
      "browserEmail",
      0,
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
      "cidrv4",
      0,
      em,
      "cidrv6",
      0,
      ef,
      "creditCard",
      0,
      eh,
      "cuid",
      0,
      G,
      "cuid2",
      0,
      B,
      "date",
      0,
      e_,
      "datetime",
      0,
      ek,
      "domain",
      0,
      /^(?=.{1,253}$)([a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,63}$/,
      "duration",
      0,
      ee,
      "e164",
      0,
      e$,
      "email",
      0,
      eo,
      "emoji",
      0,
      es,
      "extendedDuration",
      0,
      /^[-+]?P(?!$)(?:(?:[-+]?\d+Y)|(?:[-+]?\d+[.,]\d+Y$))?(?:(?:[-+]?\d+M)|(?:[-+]?\d+[.,]\d+M$))?(?:(?:[-+]?\d+W)|(?:[-+]?\d+[.,]\d+W$))?(?:(?:[-+]?\d+D)|(?:[-+]?\d+[.,]\d+D$))?(?:T(?=[\d+-])(?:(?:[-+]?\d+H)|(?:[-+]?\d+[.,]\d+H$))?(?:(?:[-+]?\d+M)|(?:[-+]?\d+[.,]\d+M$))?(?:[-+]?\d+(?:[.,]\d+)?S)?)??$/,
      "guid",
      0,
      et,
      "hex",
      0,
      /^[0-9a-fA-F]*$/,
      "hostname",
      0,
      /^(?=.{1,253}\.?$)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[-0-9a-zA-Z]{0,61}[0-9a-zA-Z])?)*\.?$/,
      "html5Email",
      0,
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
      "httpProtocol",
      0,
      eg,
      "idnEmail",
      0,
      eu,
      "integer",
      0,
      ez,
      "ipv4",
      0,
      el,
      "ipv6",
      0,
      ed,
      "ksuid",
      0,
      H,
      "lowercase",
      0,
      eO,
      "mac",
      0,
      ec,
      "md5_base64",
      0,
      eA,
      "md5_base64url",
      0,
      eT,
      "md5_hex",
      0,
      /^[0-9a-fA-F]{32}$/,
      "nanoid",
      0,
      Y,
      "nanoidOfLength",
      0,
      Q,
      "null",
      0,
      ej,
      "number",
      0,
      eS,
      "rfc5322Email",
      0,
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "sha1_base64",
      0,
      eE,
      "sha1_base64url",
      0,
      eL,
      "sha1_hex",
      0,
      /^[0-9a-fA-F]{40}$/,
      "sha256_base64",
      0,
      eC,
      "sha256_base64url",
      0,
      eV,
      "sha256_hex",
      0,
      /^[0-9a-fA-F]{64}$/,
      "sha384_base64",
      0,
      eR,
      "sha384_base64url",
      0,
      eJ,
      "sha384_hex",
      0,
      /^[0-9a-fA-F]{96}$/,
      "sha512_base64",
      0,
      eM,
      "sha512_base64url",
      0,
      eF,
      "sha512_hex",
      0,
      /^[0-9a-fA-F]{128}$/,
      "string",
      0,
      eI,
      "time",
      0,
      ex,
      "ulid",
      0,
      X,
      "undefined",
      0,
      eD,
      "unicodeEmail",
      0,
      eu,
      "uppercase",
      0,
      eZ,
      "uuid",
      0,
      ei,
      "uuid4",
      0,
      er,
      "uuid6",
      0,
      en,
      "uuid7",
      0,
      ea,
      "xid",
      0,
      q,
    ],
    136853,
  );
  let eW = n.$constructor("$ZodCheck", (e, t) => {
      var i;
      (e._zod ?? (e._zod = {}),
        (e._zod.def = t),
        (i = e._zod).onattach ?? (i.onattach = []));
    }),
    eK = (e) => {
      let t = e.value;
      return !a.nullish(t) && void 0 !== t.size;
    },
    eG = (e) => {
      let t = e.value;
      return !a.nullish(t) && void 0 !== t.length;
    },
    eB = { number: "number", bigint: "bigint", object: "date" },
    eX = n.$constructor("$ZodCheckLessThan", (e, t) => {
      eW.init(e, t);
      let i = eB[typeof t.value];
      (e._zod.onattach.push((e) => {
        let i = e._zod.bag,
          r = (t.inclusive ? i.maximum : i.exclusiveMaximum) ?? 1 / 0;
        t.value < r &&
          (t.inclusive
            ? (i.maximum = t.value)
            : (i.exclusiveMaximum = t.value));
      }),
        (e._zod.check = (r) => {
          (t.inclusive ? r.value <= t.value : r.value < t.value) ||
            r.issues.push({
              origin: eB[typeof r.value] ?? i,
              code: "too_big",
              maximum: "object" == typeof t.value ? t.value.getTime() : t.value,
              input: r.value,
              inclusive: t.inclusive,
              inst: e,
              continue: !t.abort,
            });
        }));
    }),
    eq = n.$constructor("$ZodCheckGreaterThan", (e, t) => {
      eW.init(e, t);
      let i = eB[typeof t.value];
      (e._zod.onattach.push((e) => {
        let i = e._zod.bag,
          r = (t.inclusive ? i.minimum : i.exclusiveMinimum) ?? -1 / 0;
        t.value > r &&
          (t.inclusive
            ? (i.minimum = t.value)
            : (i.exclusiveMinimum = t.value));
      }),
        (e._zod.check = (r) => {
          (t.inclusive ? r.value >= t.value : r.value > t.value) ||
            r.issues.push({
              origin: eB[typeof r.value] ?? i,
              code: "too_small",
              minimum: "object" == typeof t.value ? t.value.getTime() : t.value,
              input: r.value,
              inclusive: t.inclusive,
              inst: e,
              continue: !t.abort,
            });
        }));
    }),
    eH = n.$constructor("$ZodCheckMultipleOf", (e, t) => {
      (eW.init(e, t),
        e._zod.onattach.push((e) => {
          var i;
          (i = e._zod.bag).multipleOf ?? (i.multipleOf = t.value);
        }),
        (e._zod.check = (i) => {
          if (typeof i.value != typeof t.value)
            throw Error("Cannot mix number and bigint in multiple_of check.");
          ("bigint" == typeof i.value
            ? t.value !== BigInt(0) && i.value % t.value === BigInt(0)
            : 0 === a.floatSafeRemainder(i.value, t.value)) ||
            i.issues.push({
              origin: typeof i.value,
              code: "not_multiple_of",
              divisor: t.value,
              input: i.value,
              inst: e,
              continue: !t.abort,
            });
        }));
    }),
    eY = n.$constructor("$ZodCheckNumberFormat", (e, t) => {
      (eW.init(e, t), (t.format = t.format || "float64"));
      let i = t.format?.includes("int"),
        r = i ? "int" : "number",
        [n, o] = a.NUMBER_FORMAT_RANGES[t.format];
      (e._zod.onattach.push((e) => {
        let r = e._zod.bag;
        ((r.format = t.format),
          (r.minimum = n),
          (r.maximum = o),
          i && (r.pattern = ez));
      }),
        (e._zod.check = (a) => {
          let u = a.value;
          if (i) {
            if (!Number.isInteger(u))
              return void a.issues.push({
                expected: r,
                format: t.format,
                code: "invalid_type",
                continue: !1,
                input: u,
                inst: e,
              });
            if (!Number.isSafeInteger(u))
              return void (u > 0
                ? a.issues.push({
                    input: u,
                    code: "too_big",
                    maximum: Number.MAX_SAFE_INTEGER,
                    note: "Integers must be within the safe integer range.",
                    inst: e,
                    origin: r,
                    inclusive: !0,
                    continue: !t.abort,
                  })
                : a.issues.push({
                    input: u,
                    code: "too_small",
                    minimum: Number.MIN_SAFE_INTEGER,
                    note: "Integers must be within the safe integer range.",
                    inst: e,
                    origin: r,
                    inclusive: !0,
                    continue: !t.abort,
                  }));
          }
          (u < n &&
            a.issues.push({
              origin: "number",
              input: u,
              code: "too_small",
              minimum: n,
              inclusive: !0,
              inst: e,
              continue: !t.abort,
            }),
            u > o &&
              a.issues.push({
                origin: "number",
                input: u,
                code: "too_big",
                maximum: o,
                inclusive: !0,
                inst: e,
                continue: !t.abort,
              }));
        }));
    }),
    eQ = n.$constructor("$ZodCheckBigIntFormat", (e, t) => {
      eW.init(e, t);
      let [i, r] = a.BIGINT_FORMAT_RANGES[t.format];
      (e._zod.onattach.push((e) => {
        let n = e._zod.bag;
        ((n.format = t.format), (n.minimum = i), (n.maximum = r));
      }),
        (e._zod.check = (n) => {
          let a = n.value;
          (a < i &&
            n.issues.push({
              origin: "bigint",
              input: a,
              code: "too_small",
              minimum: i,
              inclusive: !0,
              inst: e,
              continue: !t.abort,
            }),
            a > r &&
              n.issues.push({
                origin: "bigint",
                input: a,
                code: "too_big",
                maximum: r,
                inclusive: !0,
                inst: e,
                continue: !t.abort,
              }));
        }));
    }),
    e0 = n.$constructor("$ZodCheckMaxSize", (e, t) => {
      var i;
      (eW.init(e, t),
        (i = e._zod.def).when ?? (i.when = eK),
        e._zod.onattach.push((e) => {
          let i = e._zod.bag.maximum ?? 1 / 0;
          t.maximum < i && (e._zod.bag.maximum = t.maximum);
        }),
        (e._zod.check = (i) => {
          let r = i.value;
          r.size <= t.maximum ||
            i.issues.push({
              origin: a.getSizableOrigin(r),
              code: "too_big",
              maximum: t.maximum,
              inclusive: !0,
              input: r,
              inst: e,
              continue: !t.abort,
            });
        }));
    }),
    e4 = n.$constructor("$ZodCheckMinSize", (e, t) => {
      var i;
      (eW.init(e, t),
        (i = e._zod.def).when ?? (i.when = eK),
        e._zod.onattach.push((e) => {
          let i = e._zod.bag.minimum ?? -1 / 0;
          t.minimum > i && (e._zod.bag.minimum = t.minimum);
        }),
        (e._zod.check = (i) => {
          let r = i.value;
          r.size >= t.minimum ||
            i.issues.push({
              origin: a.getSizableOrigin(r),
              code: "too_small",
              minimum: t.minimum,
              inclusive: !0,
              input: r,
              inst: e,
              continue: !t.abort,
            });
        }));
    }),
    e6 = n.$constructor("$ZodCheckSizeEquals", (e, t) => {
      var i;
      (eW.init(e, t),
        (i = e._zod.def).when ?? (i.when = eK),
        e._zod.onattach.push((e) => {
          let i = e._zod.bag;
          ((i.minimum = t.size), (i.maximum = t.size), (i.size = t.size));
        }),
        (e._zod.check = (i) => {
          let r = i.value,
            n = r.size;
          if (n === t.size) return;
          let o = n > t.size;
          i.issues.push({
            origin: a.getSizableOrigin(r),
            ...(o
              ? { code: "too_big", maximum: t.size }
              : { code: "too_small", minimum: t.size }),
            inclusive: !0,
            exact: !0,
            input: i.value,
            inst: e,
            continue: !t.abort,
          });
        }));
    }),
    e1 = n.$constructor("$ZodCheckMaxLength", (e, t) => {
      var i;
      (eW.init(e, t),
        (i = e._zod.def).when ?? (i.when = eG),
        e._zod.onattach.push((e) => {
          let i = e._zod.bag.maximum ?? 1 / 0;
          t.maximum < i && (e._zod.bag.maximum = t.maximum);
        }),
        (e._zod.check = (i) => {
          let r = i.value,
            n = r.length;
          if (
            ("string" == typeof r && n > t.maximum
              ? a.codePointLength(r)
              : n) <= t.maximum
          )
            return;
          let o = a.getLengthableOrigin(r);
          i.issues.push({
            origin: o,
            code: "too_big",
            maximum: t.maximum,
            inclusive: !0,
            input: r,
            inst: e,
            continue: !t.abort,
          });
        }));
    }),
    e2 = n.$constructor("$ZodCheckMinLength", (e, t) => {
      var i;
      (eW.init(e, t),
        (i = e._zod.def).when ?? (i.when = eG),
        e._zod.onattach.push((e) => {
          let i = e._zod.bag.minimum ?? -1 / 0;
          t.minimum > i && (e._zod.bag.minimum = t.minimum);
        }),
        (e._zod.check = (i) => {
          let r = i.value,
            n = r.length;
          if (
            ("string" == typeof r && n >= t.minimum && n < 2 * t.minimum
              ? a.codePointLength(r)
              : n) >= t.minimum
          )
            return;
          let o = a.getLengthableOrigin(r);
          i.issues.push({
            origin: o,
            code: "too_small",
            minimum: t.minimum,
            inclusive: !0,
            input: r,
            inst: e,
            continue: !t.abort,
          });
        }));
    }),
    e9 = n.$constructor("$ZodCheckLengthEquals", (e, t) => {
      var i;
      (eW.init(e, t),
        (i = e._zod.def).when ?? (i.when = eG),
        e._zod.onattach.push((e) => {
          let i = e._zod.bag;
          ((i.minimum = t.length),
            (i.maximum = t.length),
            (i.length = t.length));
        }),
        (e._zod.check = (i) => {
          let r = i.value,
            n = r.length,
            o =
              "string" == typeof r && n >= t.length && n <= 2 * t.length
                ? a.codePointLength(r)
                : n;
          if (o === t.length) return;
          let u = a.getLengthableOrigin(r),
            s = o > t.length;
          i.issues.push({
            origin: u,
            ...(s
              ? { code: "too_big", maximum: t.length }
              : { code: "too_small", minimum: t.length }),
            inclusive: !0,
            exact: !0,
            input: i.value,
            inst: e,
            continue: !t.abort,
          });
        }));
    }),
    e7 = n.$constructor("$ZodCheckStringFormat", (e, t) => {
      var i, r;
      (eW.init(e, t),
        e._zod.onattach.push((e) => {
          let i = e._zod.bag;
          ((i.format = t.format),
            t.pattern &&
              (i.patterns ?? (i.patterns = new Set()),
              i.patterns.add(t.pattern)));
        }),
        t.pattern
          ? ((i = e._zod).check ??
            (i.check = (i) => {
              ((t.pattern.lastIndex = 0),
                t.pattern.test(i.value) ||
                  i.issues.push({
                    origin: "string",
                    code: "invalid_format",
                    format: t.format,
                    input: i.value,
                    ...(t.pattern ? { pattern: t.pattern.toString() } : {}),
                    inst: e,
                    continue: !t.abort,
                  }));
            }))
          : ((r = e._zod).check ?? (r.check = () => {})));
    }),
    e3 = n.$constructor("$ZodCheckRegex", (e, t) => {
      (e7.init(e, t),
        (e._zod.check = (i) => {
          ((t.pattern.lastIndex = 0),
            t.pattern.test(i.value) ||
              i.issues.push({
                origin: "string",
                code: "invalid_format",
                format: "regex",
                input: i.value,
                pattern: t.pattern.toString(),
                inst: e,
                continue: !t.abort,
              }));
        }));
    }),
    e5 = n.$constructor("$ZodCheckLowerCase", (e, t) => {
      (t.pattern ?? (t.pattern = eO), e7.init(e, t));
    }),
    e8 = n.$constructor("$ZodCheckUpperCase", (e, t) => {
      (t.pattern ?? (t.pattern = eZ), e7.init(e, t));
    }),
    te = n.$constructor("$ZodCheckIncludes", (e, t) => {
      eW.init(e, t);
      let i = a.escapeRegex(t.includes),
        r = new RegExp(
          "number" == typeof t.position ? `^.{${t.position},}${i}` : i,
        );
      ((t.pattern = r),
        e._zod.onattach.push((e) => {
          let t = e._zod.bag;
          (t.patterns ?? (t.patterns = new Set()), t.patterns.add(r));
        }),
        (e._zod.check = (i) => {
          i.value.includes(t.includes, t.position) ||
            i.issues.push({
              origin: "string",
              code: "invalid_format",
              format: "includes",
              includes: t.includes,
              input: i.value,
              inst: e,
              continue: !t.abort,
            });
        }));
    }),
    tt = n.$constructor("$ZodCheckStartsWith", (e, t) => {
      eW.init(e, t);
      let i = RegExp(`^${a.escapeRegex(t.prefix)}.*`);
      (t.pattern ?? (t.pattern = i),
        e._zod.onattach.push((e) => {
          let t = e._zod.bag;
          (t.patterns ?? (t.patterns = new Set()), t.patterns.add(i));
        }),
        (e._zod.check = (i) => {
          i.value.startsWith(t.prefix) ||
            i.issues.push({
              origin: "string",
              code: "invalid_format",
              format: "starts_with",
              prefix: t.prefix,
              input: i.value,
              inst: e,
              continue: !t.abort,
            });
        }));
    }),
    ti = n.$constructor("$ZodCheckEndsWith", (e, t) => {
      eW.init(e, t);
      let i = RegExp(`.*${a.escapeRegex(t.suffix)}$`);
      (t.pattern ?? (t.pattern = i),
        e._zod.onattach.push((e) => {
          let t = e._zod.bag;
          (t.patterns ?? (t.patterns = new Set()), t.patterns.add(i));
        }),
        (e._zod.check = (i) => {
          i.value.endsWith(t.suffix) ||
            i.issues.push({
              origin: "string",
              code: "invalid_format",
              format: "ends_with",
              suffix: t.suffix,
              input: i.value,
              inst: e,
              continue: !t.abort,
            });
        }));
    });
  function tr(e, t, i) {
    e.issues.length && t.issues.push(...a.prefixIssues(i, e.issues));
  }
  let tn = n.$constructor("$ZodCheckProperty", (e, t) => {
      (eW.init(e, t),
        (e._zod.check = (e) => {
          let i = t.schema._zod.run(
            { value: e.value[t.property], issues: [] },
            {},
          );
          if (i instanceof Promise) return i.then((i) => tr(i, e, t.property));
          tr(i, e, t.property);
        }));
    }),
    ta = n.$constructor("$ZodCheckMimeType", (e, t) => {
      eW.init(e, t);
      let i = new Set(t.mime);
      (e._zod.onattach.push((e) => {
        e._zod.bag.mime = t.mime;
      }),
        (e._zod.check = (r) => {
          i.has(r.value.type) ||
            r.issues.push({
              code: "invalid_value",
              values: t.mime,
              input: r.value.type,
              inst: e,
              continue: !t.abort,
            });
        }));
    }),
    to = n.$constructor("$ZodCheckOverwrite", (e, t) => {
      (eW.init(e, t),
        (e._zod.check = (e) => {
          e.value = t.tx(e.value);
        }));
    });
  e.s(
    [
      "$ZodCheck",
      0,
      eW,
      "$ZodCheckBigIntFormat",
      0,
      eQ,
      "$ZodCheckEndsWith",
      0,
      ti,
      "$ZodCheckGreaterThan",
      0,
      eq,
      "$ZodCheckIncludes",
      0,
      te,
      "$ZodCheckLengthEquals",
      0,
      e9,
      "$ZodCheckLessThan",
      0,
      eX,
      "$ZodCheckLowerCase",
      0,
      e5,
      "$ZodCheckMaxLength",
      0,
      e1,
      "$ZodCheckMaxSize",
      0,
      e0,
      "$ZodCheckMimeType",
      0,
      ta,
      "$ZodCheckMinLength",
      0,
      e2,
      "$ZodCheckMinSize",
      0,
      e4,
      "$ZodCheckMultipleOf",
      0,
      eH,
      "$ZodCheckNumberFormat",
      0,
      eY,
      "$ZodCheckOverwrite",
      0,
      to,
      "$ZodCheckProperty",
      0,
      tn,
      "$ZodCheckRegex",
      0,
      e3,
      "$ZodCheckSizeEquals",
      0,
      e6,
      "$ZodCheckStartsWith",
      0,
      tt,
      "$ZodCheckStringFormat",
      0,
      e7,
      "$ZodCheckUpperCase",
      0,
      e8,
    ],
    723968,
  );
  class tu {
    constructor(e = [], t = {}) {
      ((this.content = []),
        (this.indent = 0),
        (this.args = e),
        (this.closed = t));
    }
    indented(e) {
      ((this.indent += 1), e(this), (this.indent -= 1));
    }
    write(e) {
      if ("function" == typeof e) {
        (e(this, { execution: "sync" }), e(this, { execution: "async" }));
        return;
      }
      let t = e.split("\n").filter((e) => e),
        i = Math.min(...t.map((e) => e.length - e.trimStart().length));
      for (let e of t
        .map((e) => e.slice(i))
        .map((e) => " ".repeat(2 * this.indent) + e))
        this.content.push(e);
    }
    compile() {
      let e = Function,
        t = this?.content ?? [""];
      return new e(
        ...Object.keys(this.closed),
        `return function (${this.args.join(", ")}) {
${t.join("\n")}
};`,
      )(...Object.values(this.closed));
    }
  }
  e.s(["Doc", 0, tu], 941834);
  let ts = { major: 4, minor: 5, patch: 4 };
  e.s(["version", 0, ts], 129407);
  let tl = n.$constructor(
      "$ZodType",
      (e, t) => {
        var i;
        (e ?? (e = {}),
          (e._zod.def = t),
          (e._zod.bag = e._zod.bag || {}),
          (e._zod.version = ts));
        let r = e._zod.def.checks,
          o = e._zod.traits.has("$ZodCheck")
            ? [e, ...(r ?? [])]
            : r?.length
              ? [...r]
              : [];
        for (let t of o) for (let i of t._zod.onattach) i(e);
        if (0 === o.length)
          ((i = e._zod).deferred ?? (i.deferred = []),
            e._zod.deferred?.push(() => {
              e._zod.run = e._zod.parse;
            }));
        else {
          let t = (t, i, r) => {
              let o;
              if (t.memo) return t;
              let u = a.aborted(t);
              for (let s of i) {
                if (s._zod.def.when) {
                  if (a.explicitlyAborted(t) || !s._zod.def.when(t)) continue;
                } else if (u) continue;
                let i = t.issues.length,
                  l = s._zod.check(t);
                if (l instanceof Promise && r?.async === !1)
                  throw new n.$ZodAsyncError();
                if (o || l instanceof Promise)
                  o = (o ?? Promise.resolve()).then(async () => {
                    (await l,
                      t.issues.length !== i &&
                        (a.attachSchema(t.issues, i, e),
                        u || (u = a.aborted(t, i))));
                  });
                else {
                  if (t.issues.length === i) continue;
                  (a.attachSchema(t.issues, i, e), u || (u = a.aborted(t, i)));
                }
              }
              return o ? o.then(() => t) : t;
            },
            i = (i, r, u) => {
              if (a.aborted(i)) return ((i.aborted = !0), i);
              let s = t(r, o, u);
              if (s instanceof Promise) {
                if (!1 === u.async) throw new n.$ZodAsyncError();
                return s.then((t) => e._zod.parse(t, u));
              }
              return e._zod.parse(s, u);
            };
          e._zod.run = (r, a) => {
            if (a.skipChecks) return e._zod.parse(r, a);
            if ("backward" === a.direction) {
              let t = e._zod.parse(
                { value: r.value, issues: [] },
                { ...a, skipChecks: !0 },
              );
              return t instanceof Promise
                ? t.then((e) => i(e, r, a))
                : i(t, r, a);
            }
            let u = e._zod.parse(r, a);
            if (u instanceof Promise) {
              if (!1 === a.async) throw new n.$ZodAsyncError();
              return u.then((e) => t(e, o, a));
            }
            return t(u, o, a);
          };
        }
      },
      {
        get "~standard"() {
          return a.hide(this, "~standard", tc(this));
        },
        set "~standard"(e) {
          a.own(this, "~standard", e);
        },
      },
    ),
    td = (e) => (e.success ? { value: e.data } : { issues: e.error?.issues });
  function tc(e) {
    return {
      validate: (t) => {
        try {
          return td(I(e, t));
        } catch (i) {
          return z(e, t).then(td);
        }
      },
      vendor: "zod",
      version: 1,
    };
  }
  let tm = n.$constructor("$ZodString", (e, t) => {
      (tl.init(e, t),
        (e._zod.pattern =
          [...(e?._zod.bag?.patterns ?? [])].pop() ?? eI(e._zod.bag)),
        (e._zod.parse = (i, r) => {
          if (t.coerce)
            try {
              i.value = String(i.value);
            } catch (e) {}
          return (
            "string" == typeof i.value ||
              i.issues.push({
                expected: "string",
                code: "invalid_type",
                input: i.value,
                inst: e,
              }),
            i
          );
        }));
    }),
    tf = n.$constructor("$ZodStringFormat", (e, t) => {
      (e7.init(e, t), tm.init(e, t));
    }),
    tp = n.$constructor("$ZodGUID", (e, t) => {
      (t.pattern ?? (t.pattern = et), tf.init(e, t));
    }),
    tv = n.$constructor("$ZodUUID", (e, t) => {
      if (t.version) {
        let e = { v1: 1, v2: 2, v3: 3, v4: 4, v5: 5, v6: 6, v7: 7, v8: 8 }[
          t.version
        ];
        if (void 0 === e) throw Error(`Invalid UUID version: "${t.version}"`);
        t.pattern ?? (t.pattern = ei(e));
      } else t.pattern ?? (t.pattern = ei());
      tf.init(e, t);
    }),
    tg = n.$constructor("$ZodEmail", (e, t) => {
      (t.pattern ?? (t.pattern = eo), tf.init(e, t));
    });
  function t$(e, t) {
    if (
      !t.normalize &&
      t.protocol?.source === eg.source &&
      !/^https?:\/\//i.test(e)
    )
      return 1;
    try {
      return new URL(e);
    } catch {
      return 2;
    }
  }
  let th = /[\t\n\r]/g;
  function ty(e) {
    return e.replace(th, "");
  }
  function t_(e, t) {
    return ((t.lastIndex = 0), t.test(e.hostname));
  }
  function tb(e, t) {
    return (
      (t.lastIndex = 0),
      t.test(e.protocol.endsWith(":") ? e.protocol.slice(0, -1) : e.protocol)
    );
  }
  let tx = n.$constructor("$ZodURL", (e, t) => {
      (tf.init(e, t),
        (e._zod.check = (i) => {
          try {
            let r = i.value.trim(),
              n = t$(r, t);
            if (1 === n)
              return void i.issues.push({
                code: "invalid_format",
                format: "url",
                note: "Invalid URL format",
                input: i.value,
                inst: e,
                continue: !t.abort,
              });
            if (2 === n)
              return void i.issues.push({
                code: "invalid_format",
                format: "url",
                input: i.value,
                inst: e,
                continue: !t.abort,
              });
            (t.hostname &&
              !t_(n, t.hostname) &&
              i.issues.push({
                code: "invalid_format",
                format: "url",
                note: "Invalid hostname",
                pattern: t.hostname.source,
                input: i.value,
                inst: e,
                continue: !t.abort,
              }),
              t.protocol &&
                !tb(n, t.protocol) &&
                i.issues.push({
                  code: "invalid_format",
                  format: "url",
                  note: "Invalid protocol",
                  pattern: t.protocol.source,
                  input: i.value,
                  inst: e,
                  continue: !t.abort,
                }),
              (i.value = t.normalize ? n.href : ty(r)));
            return;
          } catch (r) {
            i.issues.push({
              code: "invalid_format",
              format: "url",
              input: i.value,
              inst: e,
              continue: !t.abort,
            });
          }
        }));
    }),
    tk = n.$constructor("$ZodEmoji", (e, t) => {
      (t.pattern ?? (t.pattern = es()), tf.init(e, t));
    }),
    tI = n.$constructor("$ZodNanoID", (e, t) => {
      if (void 0 !== t.length && (!Number.isInteger(t.length) || t.length < 1))
        throw Error(`Invalid nanoid length: ${t.length}`);
      (t.pattern ?? (t.pattern = void 0 === t.length ? Y : Q(t.length)),
        tf.init(e, t));
    }),
    tw = n.$constructor("$ZodCUID", (e, t) => {
      (t.pattern ?? (t.pattern = G), tf.init(e, t));
    }),
    tz = n.$constructor("$ZodCUID2", (e, t) => {
      (t.pattern ?? (t.pattern = B), tf.init(e, t));
    }),
    tS = n.$constructor("$ZodULID", (e, t) => {
      (t.pattern ?? (t.pattern = X), tf.init(e, t));
    }),
    tU = n.$constructor("$ZodXID", (e, t) => {
      (t.pattern ?? (t.pattern = q), tf.init(e, t));
    }),
    tj = n.$constructor("$ZodKSUID", (e, t) => {
      (t.pattern ?? (t.pattern = H), tf.init(e, t));
    }),
    tD = n.$constructor("$ZodISODateTime", (e, t) => {
      (t.pattern ?? (t.pattern = ek(t)),
        tf.init(e, t),
        (t.local || -1 === t.precision) &&
          ((e._zod.bag.laxFormat = !0),
          e._zod.onattach.push((e) => {
            e._zod.bag.laxFormat = !0;
          })));
    }),
    tO = n.$constructor("$ZodISODate", (e, t) => {
      (t.pattern ?? (t.pattern = e_), tf.init(e, t));
    }),
    tZ = n.$constructor("$ZodISOTime", (e, t) => {
      (t.pattern ?? (t.pattern = ex(t)), tf.init(e, t));
    }),
    tP = n.$constructor("$ZodISODuration", (e, t) => {
      (t.pattern ?? (t.pattern = ee), tf.init(e, t));
    }),
    tN = n.$constructor("$ZodIPv4", (e, t) => {
      (t.pattern ?? (t.pattern = el),
        tf.init(e, t),
        (e._zod.bag.format = "ipv4"));
    }),
    tA = /^[0-9a-fA-F:.]+$/;
  function tT(e) {
    if (!tA.test(e)) return !1;
    try {
      return (new URL(`http://[${e}]`), !0);
    } catch {
      return !1;
    }
  }
  let tE = n.$constructor("$ZodIPv6", (e, t) => {
      (t.pattern ?? (t.pattern = ed),
        tf.init(e, t),
        (e._zod.bag.format = "ipv6"),
        (e._zod.check = (i) => {
          tT(i.value) ||
            i.issues.push({
              code: "invalid_format",
              format: "ipv6",
              input: i.value,
              inst: e,
              continue: !t.abort,
            });
        }));
    }),
    tL = n.$constructor("$ZodMAC", (e, t) => {
      (t.pattern ?? (t.pattern = ec(t.delimiter)),
        tf.init(e, t),
        (e._zod.bag.format = "mac"));
    }),
    tC = n.$constructor("$ZodCIDRv4", (e, t) => {
      (t.pattern ?? (t.pattern = em), tf.init(e, t));
    });
  function tV(e) {
    let t = e.split("/");
    if (2 !== t.length) return !1;
    let [i, r] = t;
    if (!r) return !1;
    let n = Number(r);
    return `${n}` === r && !(n < 0) && !(n > 128) && tT(i);
  }
  let tR = n.$constructor("$ZodCIDRv6", (e, t) => {
    (t.pattern ?? (t.pattern = ef),
      tf.init(e, t),
      (e._zod.check = (i) => {
        tV(i.value) ||
          i.issues.push({
            code: "invalid_format",
            format: "cidrv6",
            input: i.value,
            inst: e,
            continue: !t.abort,
          });
      }));
  });
  function tJ(e) {
    if ("" === e) return !0;
    if (/\s/.test(e) || e.length % 4 != 0) return !1;
    try {
      return (atob(e), !0);
    } catch {
      return !1;
    }
  }
  let tM = n.$constructor("$ZodBase64", (e, t) => {
    (t.pattern ?? (t.pattern = ep),
      tf.init(e, t),
      (e._zod.bag.contentEncoding = "base64"),
      (e._zod.check = (i) => {
        tJ(i.value) ||
          i.issues.push({
            code: "invalid_format",
            format: "base64",
            input: i.value,
            inst: e,
            continue: !t.abort,
          });
      }));
  });
  function tF(e) {
    if (!ev.test(e)) return !1;
    let t = e.replace(/[-_]/g, (e) => ("-" === e ? "+" : "/"));
    return tJ(t.padEnd(4 * Math.ceil(t.length / 4), "="));
  }
  let tW = n.$constructor("$ZodBase64URL", (e, t) => {
      (t.pattern ?? (t.pattern = ev),
        tf.init(e, t),
        (e._zod.bag.contentEncoding = "base64url"),
        (e._zod.check = (i) => {
          tF(i.value) ||
            i.issues.push({
              code: "invalid_format",
              format: "base64url",
              input: i.value,
              inst: e,
              continue: !t.abort,
            });
        }));
    }),
    tK = n.$constructor("$ZodE164", (e, t) => {
      (t.pattern ?? (t.pattern = e$), tf.init(e, t));
    }),
    tG = /[- ]/g;
  function tB(e) {
    return (
      !!eh.test(e) &&
      (function (e) {
        let t = e.length,
          i = 1,
          r = 0;
        for (; t; ) {
          let n = +e[--t];
          ((i ^= 1), (r += i ? [0, 2, 4, 6, 8, 1, 3, 5, 7, 9][n] : n));
        }
        return r % 10 == 0;
      })(e.replace(tG, ""))
    );
  }
  let tX = n.$constructor("$ZodCreditCard", (e, t) => {
    (t.pattern ?? (t.pattern = eh),
      tf.init(e, t),
      (e._zod.check = (i) => {
        tB(i.value) ||
          i.issues.push({
            code: "invalid_format",
            format: "credit_card",
            input: i.value,
            inst: e,
            continue: !t.abort,
          });
      }));
  });
  function tq(e, t = null) {
    try {
      let i = e.split(".");
      if (3 !== i.length) return !1;
      let [r] = i;
      if (!r) return !1;
      let n = JSON.parse(atob(r));
      if (
        ("typ" in n && n?.typ !== "JWT") ||
        !n.alg ||
        (t && (!("alg" in n) || n.alg !== t))
      )
        return !1;
      return !0;
    } catch {
      return !1;
    }
  }
  let tH = n.$constructor("$ZodJWT", (e, t) => {
      (tf.init(e, t),
        (e._zod.check = (i) => {
          tq(i.value, t.alg) ||
            i.issues.push({
              code: "invalid_format",
              format: "jwt",
              input: i.value,
              inst: e,
              continue: !t.abort,
            });
        }));
    }),
    tY = n.$constructor("$ZodCustomStringFormat", (e, t) => {
      (tf.init(e, t),
        (e._zod.check = (i) => {
          t.fn(i.value) ||
            i.issues.push({
              code: "invalid_format",
              format: t.format,
              input: i.value,
              inst: e,
              continue: !t.abort,
            });
        }));
    }),
    tQ = n.$constructor("$ZodNumber", (e, t) => {
      (tl.init(e, t),
        (e._zod.pattern = e._zod.bag.pattern ?? eS),
        (e._zod.parse = (i, r) => {
          if (t.coerce)
            try {
              i.value = Number(i.value);
            } catch (e) {}
          let n = i.value;
          if ("number" == typeof n && !Number.isNaN(n) && Number.isFinite(n))
            return i;
          let a =
            "number" == typeof n
              ? Number.isNaN(n)
                ? "NaN"
                : Number.isFinite(n)
                  ? void 0
                  : String(n)
              : void 0;
          return (
            i.issues.push({
              expected: "number",
              code: "invalid_type",
              input: n,
              inst: e,
              ...(a ? { received: a } : {}),
            }),
            i
          );
        }));
    }),
    t0 = n.$constructor("$ZodNumberFormat", (e, t) => {
      (eY.init(e, t), tQ.init(e, t));
    }),
    t4 = n.$constructor("$ZodBoolean", (e, t) => {
      (tl.init(e, t),
        (e._zod.pattern = eU),
        (e._zod.parse = (i, r) => {
          if (t.coerce)
            try {
              i.value = !!i.value;
            } catch (e) {}
          let n = i.value;
          return (
            "boolean" == typeof n ||
              i.issues.push({
                expected: "boolean",
                code: "invalid_type",
                input: n,
                inst: e,
              }),
            i
          );
        }));
    }),
    t6 = n.$constructor("$ZodBigInt", (e, t) => {
      (tl.init(e, t),
        (e._zod.pattern = ew),
        (e._zod.parse = (i, r) => {
          if (t.coerce)
            try {
              i.value = BigInt(i.value);
            } catch (e) {}
          return (
            "bigint" == typeof i.value ||
              i.issues.push({
                expected: "bigint",
                code: "invalid_type",
                input: i.value,
                inst: e,
              }),
            i
          );
        }));
    }),
    t1 = n.$constructor("$ZodBigIntFormat", (e, t) => {
      (eQ.init(e, t), t6.init(e, t));
    }),
    t2 = n.$constructor("$ZodSymbol", (e, t) => {
      (tl.init(e, t),
        (e._zod.parse = (t, i) => {
          let r = t.value;
          return (
            "symbol" == typeof r ||
              t.issues.push({
                expected: "symbol",
                code: "invalid_type",
                input: r,
                inst: e,
              }),
            t
          );
        }));
    }),
    t9 = n.$constructor("$ZodUndefined", (e, t) => {
      (tl.init(e, t),
        (e._zod.pattern = eD),
        (e._zod.values = new Set([void 0])),
        (e._zod.parse = (t, i) => {
          let r = t.value;
          return (
            void 0 === r ||
              t.issues.push({
                expected: "undefined",
                code: "invalid_type",
                input: r,
                inst: e,
              }),
            t
          );
        }));
    }),
    t7 = n.$constructor("$ZodNull", (e, t) => {
      (tl.init(e, t),
        (e._zod.pattern = ej),
        (e._zod.values = new Set([null])),
        (e._zod.parse = (t, i) => {
          let r = t.value;
          return (
            null === r ||
              t.issues.push({
                expected: "null",
                code: "invalid_type",
                input: r,
                inst: e,
              }),
            t
          );
        }));
    }),
    t3 = n.$constructor("$ZodAny", (e, t) => {
      (tl.init(e, t), (e._zod.parse = (e) => e));
    }),
    t5 = n.$constructor("$ZodUnknown", (e, t) => {
      (tl.init(e, t), (e._zod.parse = (e) => e));
    }),
    t8 = n.$constructor("$ZodNever", (e, t) => {
      (tl.init(e, t),
        (e._zod.parse = (t, i) => (
          t.issues.push({
            expected: "never",
            code: "invalid_type",
            input: t.value,
            inst: e,
          }),
          t
        )));
    }),
    ie = n.$constructor("$ZodVoid", (e, t) => {
      (tl.init(e, t),
        (e._zod.parse = (t, i) => {
          let r = t.value;
          return (
            void 0 === r ||
              t.issues.push({
                expected: "void",
                code: "invalid_type",
                input: r,
                inst: e,
              }),
            t
          );
        }));
    }),
    it = n.$constructor("$ZodDate", (e, t) => {
      (tl.init(e, t),
        (e._zod.parse = (i, r) => {
          if (t.coerce)
            try {
              i.value = new Date(i.value);
            } catch (e) {}
          let n = i.value,
            a = n instanceof Date;
          return (
            (a && !Number.isNaN(n.getTime())) ||
              i.issues.push({
                expected: "date",
                code: "invalid_type",
                input: n,
                ...(a ? { received: "Invalid Date" } : {}),
                inst: e,
              }),
            i
          );
        }));
    });
  function ii(e, t, i) {
    (e.issues.length && t.issues.push(...a.prefixIssues(i, e.issues)),
      (t.value[i] = e.value));
  }
  let ir = n.$constructor("$ZodArray", (e, t) => {
    tl.init(e, t);
    let i = n.globalConfig.memoizer;
    (i?.attach(e),
      (e._zod.parse = (r, n) => {
        let a = r.value;
        if (!Array.isArray(a))
          return (
            r.issues.push({
              expected: "array",
              code: "invalid_type",
              input: a,
              inst: e,
            }),
            r
          );
        r.value = i ? i.alloc(e, r, Array(a.length), n) : Array(a.length);
        let o = [];
        for (let e = 0; e < a.length; e++) {
          let i = a[e],
            u = t.element._zod.run({ value: i, issues: [] }, n);
          u instanceof Promise
            ? o.push(u.then((t) => ii(t, r, e)))
            : ii(u, r, e);
        }
        return o.length ? Promise.all(o).then(() => r) : r;
      }));
  });
  function ia(e, t, i, r, n, o) {
    let u = i in r,
      s = "optional" === o;
    if (u || !s || "optional" !== n) {
      if (e.issues.length) {
        if (void 0 !== n && s && !u) return;
        t.issues.push(...a.prefixIssues(i, e.issues));
      }
      if (!u && void 0 === n) {
        e.issues.length ||
          t.issues.push({
            code: "invalid_type",
            expected: "nonoptional",
            input: void 0,
            path: [i],
          });
        return;
      }
      void 0 === e.value ? u && (t.value[i] = void 0) : (t.value[i] = e.value);
    }
  }
  let io = [];
  function iu(e) {
    let t = Object.keys(e.shape),
      i = Object.getOwnPropertySymbols(e.shape),
      r = i.length ? i : io,
      n = r.length ? [...t, ...r] : t;
    for (let t of n)
      if (!e.shape?.[t]?._zod?.traits?.has("$ZodType"))
        throw Error(
          `Invalid element at key "${String(t)}": expected a Zod schema`,
        );
    let o = a.optionalKeys(e.shape);
    return {
      ...e,
      allKeys: n,
      symbolKeys: r,
      keySet: new Set(t),
      numKeys: t.length,
      optionalKeys: new Set(o),
    };
  }
  function is(e, t, i, r, n, a) {
    let o = [],
      u = n.keySet,
      s = n.catchall._zod,
      l = s.def.type,
      d = s.optin,
      c = s.optout;
    for (let n in t) {
      if (u.has(n)) continue;
      if ("__proto__" === n) {
        "never" === l && o.push(n);
        continue;
      }
      if ("never" === l) {
        o.push(n);
        continue;
      }
      let a = s.run({ value: t[n], issues: [] }, r);
      a instanceof Promise
        ? e.push(a.then((e) => ia(e, i, n, t, d, c)))
        : ia(a, i, n, t, d, c);
    }
    return (o.length &&
      i.issues.push({
        code: "unrecognized_keys",
        keys: o,
        input: t,
        inst: a,
        continue: !0,
      }),
    e.length)
      ? Promise.all(e).then(() => i)
      : i;
  }
  let il = new WeakMap(),
    id = n.$constructor("$ZodObject", (e, t) => {
      let i;
      tl.init(e, t);
      let r = Object.getOwnPropertyDescriptor(t, "shape");
      if (!r?.get) {
        let e = t.shape;
        (il.set(t, e),
          Object.defineProperty(t, "shape", {
            get: () => {
              let i = { ...e };
              return (
                Object.defineProperty(t, "shape", { value: i }),
                il.set(t, i),
                i
              );
            },
          }));
      }
      let o = a.cached(() => iu(t));
      a.defineLazyInternal(e, "propValues", (e) => {
        let t = e.def.shape,
          i = {};
        for (let e in t) {
          let r = t[e]._zod;
          if (r.values) {
            for (let t of (Object.prototype.hasOwnProperty.call(i, e) ||
              a.assignProp(i, e, new Set()),
            r.values))
              i[e].add(t);
            void 0 !== r.optin && i[e].add(void 0);
          }
        }
        return i;
      });
      let u = a.isObject,
        s = t.catchall,
        l = n.globalConfig.memoizer;
      (l?.attach(e),
        (e._zod.parse = (t, r) => {
          i ?? (i = o.value);
          let n = t.value;
          if (!u(n))
            return (
              t.issues.push({
                expected: "object",
                code: "invalid_type",
                input: n,
                inst: e,
              }),
              t
            );
          t.value = l ? l.alloc(e, t, {}, r) : {};
          let a = [],
            d = i.shape;
          for (let e of i.allKeys) {
            if ("__proto__" === e) continue;
            let i = d[e],
              o = i._zod.optin,
              u = i._zod.optout,
              s = i._zod.run({ value: n[e], issues: [] }, r);
            s instanceof Promise
              ? a.push(s.then((i) => ia(i, t, e, n, o, u)))
              : ia(s, t, e, n, o, u);
          }
          return s
            ? is(a, n, t, r, o.value, e)
            : a.length
              ? Promise.all(a).then(() => t)
              : t;
        }));
    }),
    ic = n.$constructor("$ZodObjectJIT", (e, t) => {
      let i, r;
      id.init(e, t);
      let o = e._zod.parse,
        u = a.cached(() => iu(t)),
        s = n.globalConfig.memoizer,
        l = a.isObject,
        d = !n.globalConfig.jitless,
        c = a.allowsEval,
        m = d && c.value,
        f = t.catchall;
      e._zod.parse = (n, c) => {
        r ?? (r = u.value);
        let p = n.value;
        return l(p)
          ? d && m && c?.async === !1 && !0 !== c.jitless
            ? (i ||
                (i = ((t) => {
                  let i = u.value,
                    r = i.symbolKeys,
                    n = new tu(["payload", "ctx"], {
                      shape: t,
                      inst: e,
                      memo: s,
                      syms: r,
                    }),
                    o = (e) =>
                      `shape[${e}]._zod.run({ value: input[${e}], issues: [] }, ctx)`,
                    l = (e, t) => `
          for (let i = 0; i < ${e}.issues.length; i++) {
            const iss = ${e}.issues[i];
            iss.path = iss.path ? [${t}, ...iss.path] : [${t}];
            payload.issues.push(iss);
          }`;
                  n.write("const input = payload.value;");
                  let d = Object.create(null),
                    c = 0;
                  for (let e of i.allKeys) d[e] = `key_${c++}`;
                  for (let e of (n.write(
                    s
                      ? "const newResult = memo.alloc(inst, payload, {}, ctx);"
                      : "const newResult = {};",
                  ),
                  i.allKeys)) {
                    if ("__proto__" === e) continue;
                    let i = d[e],
                      u =
                        "symbol" == typeof e
                          ? `syms[${r.indexOf(e)}]`
                          : a.esc(e),
                      s = `${u} in input`,
                      c = t[e],
                      m = c?._zod?.optin,
                      f = void 0 !== m,
                      p = c?._zod?.optout === "optional";
                    if ((n.write(`const ${i} = ${o(u)};`), f && p)) {
                      let e =
                        "optional" === m
                          ? `${i}_present`
                          : `${i}.value !== undefined || ${i}_present`;
                      n.write(`
        const ${i}_present = ${s};
        if (!${i}.issues.length || ${i}_present) {
          if (${i}.issues.length) {${l(i, u)}
          }

          if (${e}) {
            newResult[${u}] = ${i}.value;
          }
        }

      `);
                    } else
                      f
                        ? n.write(`
        if (${i}.issues.length) {${l(i, u)}
        }
        
        if (${i}.value === undefined) {
          if (${s}) {
            newResult[${u}] = undefined;
          }
        } else {
          newResult[${u}] = ${i}.value;
        }

      `)
                        : n.write(`
        const ${i}_present = ${s};
        if (${i}.issues.length) {${l(i, u)}
        }
        if (!${i}_present && !${i}.issues.length) {
          payload.issues.push({
            code: "invalid_type",
            expected: "nonoptional",
            input: undefined,
            path: [${u}]
          });
        }

        if (${i}_present) {
          newResult[${u}] = ${i}.value;
        }

      `);
                  }
                  return (
                    n.write("payload.value = newResult;"),
                    n.write("return payload;"),
                    n.compile()
                  );
                })(t.shape)),
              (n = i(n, c)),
              f)
              ? is([], p, n, c, r, e)
              : n
            : o(n, c)
          : (n.issues.push({
              expected: "object",
              code: "invalid_type",
              input: p,
              inst: e,
            }),
            n);
      };
    });
  function im(e, t, i, r) {
    for (let i of e) if (0 === i.issues.length) return ((t.value = i.value), t);
    let o = e.filter((e) => !a.aborted(e));
    return 1 === o.length
      ? ((t.value = o[0].value), o[0])
      : (t.issues.push({
          code: "invalid_union",
          input: t.value,
          inst: i,
          errors: e.map((e) =>
            e.issues.map((e) => a.finalizeIssue(e, r, n.config())),
          ),
        }),
        t);
  }
  let ip = n.$constructor("$ZodUnion", (e, t) => {
    (tl.init(e, t),
      a.defineLazyInternal(e, "optin", (e) =>
        e.def.options.some((e) => "defaulted" === e._zod.optin)
          ? "defaulted"
          : e.def.options.some((e) => void 0 !== e._zod.optin)
            ? "optional"
            : void 0,
      ),
      a.defineLazyInternal(e, "optout", (e) =>
        e.def.options.some((e) => "optional" === e._zod.optout)
          ? "optional"
          : void 0,
      ),
      a.defineLazyInternal(e, "values", (e) => {
        if (e.def.options.every((e) => e._zod.values))
          return new Set(
            e.def.options.flatMap((e) => Array.from(e._zod.values)),
          );
      }),
      a.defineLazyInternal(e, "pattern", (e) => {
        if (e.def.options.every((e) => e._zod.pattern)) {
          let t = e.def.options.map((e) => e._zod.pattern);
          return RegExp(
            `^(${t.map((e) => a.cleanRegex(e.source)).join("|")})$`,
          );
        }
      }));
    let i = 1 === t.options.length ? t.options[0]._zod.run : null;
    e._zod.parse = (r, n) => {
      if (i) return i(r, n);
      let a = !1,
        o = [];
      for (let e of t.options) {
        let t = e._zod.run({ value: r.value, issues: [] }, n);
        if (t instanceof Promise) (o.push(t), (a = !0));
        else {
          if (0 === t.issues.length) return t;
          o.push(t);
        }
      }
      return a ? Promise.all(o).then((t) => im(t, r, e, n)) : im(o, r, e, n);
    };
  });
  function iv(e, t, i, r) {
    let o = [];
    for (let t = 0; t < e.length; t++) 0 === e[t].issues.length && o.push(t);
    return (
      1 === o.length
        ? (t.value = e[o[0]].value)
        : 0 === o.length
          ? t.issues.push({
              code: "invalid_union",
              input: t.value,
              inst: i,
              errors: e.map((e) =>
                e.issues.map((e) => a.finalizeIssue(e, r, n.config())),
              ),
            })
          : t.issues.push({
              code: "invalid_union",
              input: t.value,
              inst: i,
              errors: [],
              inclusive: !1,
              matches: o,
            }),
      t
    );
  }
  let ig = n.$constructor("$ZodXor", (e, t) => {
    (ip.init(e, t), (t.inclusive = !1));
    let i = 1 === t.options.length ? t.options[0]._zod.run : null;
    e._zod.parse = (r, n) => {
      if (i) return i(r, n);
      let a = !1,
        o = [];
      for (let e of t.options) {
        let t = e._zod.run({ value: r.value, issues: [] }, n);
        t instanceof Promise ? (o.push(t), (a = !0)) : o.push(t);
      }
      return a ? Promise.all(o).then((t) => iv(t, r, e, n)) : iv(o, r, e, n);
    };
  });
  function i$(e, t) {
    let i = e._zod,
      r = i.bag.optionsMap;
    if (!r) {
      r = new Map();
      let { options: e, discriminator: t } = i.def;
      for (let i of e)
        for (let e of i._zod.propValues?.[t] ?? []) r.has(e) || r.set(e, i);
      i.bag.optionsMap = r;
    }
    return r.get(t);
  }
  let ih = n.$constructor("$ZodDiscriminatedUnion", (e, t) => {
      ((t.inclusive = !1), ip.init(e, t));
      let i = e._zod.parse;
      (a.defineLazyInternal(e, "propValues", (e) => {
        let t = {};
        for (let i of e.def.options) {
          let r = i._zod.propValues;
          if (!r || 0 === Object.keys(r).length)
            throw Error(
              `Invalid discriminated union option at index "${e.def.options.indexOf(i)}"`,
            );
          for (let [e, i] of Object.entries(r))
            for (let r of (Object.prototype.hasOwnProperty.call(t, e) ||
              a.assignProp(t, e, new Set()),
            i))
              t[e].add(r);
        }
        return t;
      }),
        t.options.forEach((e, i) => {
          let r = il.get(e._zod.def);
          if (r && !Object.prototype.hasOwnProperty.call(r, t.discriminator))
            throw Error(`Invalid discriminated union option at index "${i}"`);
        }));
      let r = a.cached(() => {
        let e = t.options,
          i = new Map();
        for (let r of e) {
          let e = r._zod.propValues?.[t.discriminator];
          if (!e || 0 === e.size)
            throw Error(
              `Invalid discriminated union option at index "${t.options.indexOf(r)}"`,
            );
          for (let t of e) {
            if (i.has(t))
              throw Error(`Duplicate discriminator value "${String(t)}"`);
            i.set(t, r);
          }
        }
        return i;
      });
      e._zod.parse = (n, o) => {
        let u = n.value;
        if (!a.isObject(u))
          return (
            n.issues.push({
              code: "invalid_type",
              expected: "object",
              input: u,
              inst: e,
            }),
            n
          );
        let s = r.value.get(u?.[t.discriminator]);
        return s
          ? s._zod.run(n, o)
          : t.unionFallback || "backward" === o.direction
            ? i(n, o)
            : (n.issues.push({
                code: "invalid_union",
                errors: [],
                note: "No matching discriminator",
                discriminator: t.discriminator,
                options: Array.from(r.value.keys()),
                input: u,
                path: [t.discriminator],
                inst: e,
              }),
              n);
      };
    }),
    iy = n.$constructor("$ZodIntersection", (e, t) => {
      (tl.init(e, t),
        (e._zod.parse = (e, i) => {
          let r = e.value,
            n = t.left._zod.run({ value: r, issues: [] }, i),
            a = t.right._zod.run({ value: r, issues: [] }, i);
          return n instanceof Promise || a instanceof Promise
            ? Promise.all([n, a]).then(([t, i]) => ib(e, t, i))
            : ib(e, n, a);
        }));
    });
  function i_(e, t) {
    if (e === t || (e instanceof Date && t instanceof Date && +e == +t))
      return { valid: !0, data: e };
    if (a.isPlainObject(e) && a.isPlainObject(t)) {
      let i = Object.keys(t),
        r = Object.keys(e).filter((e) => -1 !== i.indexOf(e)),
        n = { ...e, ...t };
      for (let i of (Object.prototype.hasOwnProperty.call(n, "__proto__") &&
        delete n.__proto__,
      r)) {
        if ("__proto__" === i) continue;
        let r = i_(e[i], t[i]);
        if (!r.valid)
          return { valid: !1, mergeErrorPath: [i, ...r.mergeErrorPath] };
        n[i] = r.data;
      }
      return { valid: !0, data: n };
    }
    if (Array.isArray(e) && Array.isArray(t)) {
      if (e.length !== t.length) return { valid: !1, mergeErrorPath: [] };
      let i = [];
      for (let r = 0; r < e.length; r++) {
        let n = i_(e[r], t[r]);
        if (!n.valid)
          return { valid: !1, mergeErrorPath: [r, ...n.mergeErrorPath] };
        i.push(n.data);
      }
      return { valid: !0, data: i };
    }
    return { valid: !1, mergeErrorPath: [] };
  }
  function ib(e, t, i) {
    let r,
      n = new Map(),
      o = new Map(),
      u = (e, t) => {
        let i;
        if ("unrecognized_keys" !== e.code || e.path?.length)
          if (
            "invalid_key" !== e.code ||
            "record" !== e.origin ||
            e.path?.length !== 1
          )
            return !1;
          else {
            let t = String(e.path[0]);
            (o.has(t) || o.set(t, e), (i = [t]));
          }
        else (r ?? (r = e), (i = e.keys));
        for (let e of i) (n.has(e) || n.set(e, {}), (n.get(e)[t] = !0));
        return !0;
      };
    for (let i of t.issues) u(i, "l") || e.issues.push(i);
    for (let t of i.issues) u(t, "r") || e.issues.push(t);
    let s = [...n].filter(([, e]) => e.l && e.r).map(([e]) => e);
    if (s.length) {
      let t = r ? s.filter((e) => r.keys.includes(e)) : [];
      for (let i of (t.length && e.issues.push({ ...r, keys: t }), s))
        !t.includes(i) && o.has(i) && e.issues.push(o.get(i));
    }
    let l = i_(t.value, i.value);
    if (!l.valid) {
      if (a.aborted(e)) return e;
      throw Error(
        `Unmergable intersection. Error path: ${JSON.stringify(l.mergeErrorPath)}`,
      );
    }
    return ((e.value = l.data), e);
  }
  let ix = n.$constructor("$ZodTuple", (e, t) => {
    tl.init(e, t);
    let i = t.items,
      r = n.globalConfig.memoizer;
    (r?.attach(e),
      (e._zod.parse = (n, a) => {
        let o = n.value;
        if (!Array.isArray(o))
          return (
            n.issues.push({
              input: o,
              inst: e,
              expected: "tuple",
              code: "invalid_type",
            }),
            n
          );
        n.value = r ? r.alloc(e, n, [], a) : [];
        let u = [],
          s = ik(i, "optin"),
          l = ik(i, "optout");
        if (!t.rest) {
          if (o.length < s)
            return (
              n.issues.push({
                code: "too_small",
                minimum: s,
                inclusive: !0,
                input: o,
                inst: e,
                origin: "array",
              }),
              n
            );
          o.length > i.length &&
            n.issues.push({
              code: "too_big",
              maximum: i.length,
              inclusive: !0,
              input: o,
              inst: e,
              origin: "array",
            });
        }
        let d = Array(i.length);
        for (let e = 0; e < i.length; e++) {
          let t = i[e]._zod.run({ value: o[e], issues: [] }, a);
          t instanceof Promise
            ? u.push(
                t.then((t) => {
                  d[e] = t;
                }),
              )
            : (d[e] = t);
        }
        if (t.rest) {
          let e = i.length - 1;
          for (let r of o.slice(i.length)) {
            e++;
            let i = t.rest._zod.run({ value: r, issues: [] }, a);
            i instanceof Promise
              ? u.push(i.then((t) => iI(t, n, e)))
              : iI(i, n, e);
          }
        }
        return u.length
          ? Promise.all(u).then(() => iw(d, n, i, o, l))
          : iw(d, n, i, o, l);
      }));
  });
  function ik(e, t) {
    for (let i = e.length - 1; i >= 0; i--)
      if (
        !("optin" === t
          ? void 0 !== e[i]._zod.optin
          : "optional" === e[i]._zod.optout)
      )
        return i + 1;
    return 0;
  }
  function iI(e, t, i) {
    (e.issues.length && t.issues.push(...a.prefixIssues(i, e.issues)),
      (t.value[i] = e.value));
  }
  function iw(e, t, i, r, n) {
    for (let o = 0; o < i.length; o++) {
      let u = e[o],
        s = o < r.length;
      if (!s && o >= n && "optional" === i[o]._zod.optin) {
        t.value.length = o;
        break;
      }
      if (u.issues.length) {
        if (!s && o >= n) {
          t.value.length = o;
          break;
        }
        t.issues.push(...a.prefixIssues(o, u.issues));
      }
      t.value[o] = u.value;
    }
    for (let e = t.value.length - 1; e >= r.length; e--)
      if ("optional" === i[e]._zod.optout && void 0 === t.value[e])
        t.value.length = e;
      else break;
    return t;
  }
  let iz = n.$constructor("$ZodRecord", (e, t) => {
      tl.init(e, t);
      let i = n.globalConfig.memoizer;
      (i?.attach(e),
        (e._zod.parse = (r, o) => {
          let u = r.value;
          if (!a.isPlainObject(u))
            return (
              r.issues.push({
                expected: "record",
                code: "invalid_type",
                input: u,
                inst: e,
              }),
              r
            );
          let s = [],
            l = t.keyType._zod.values;
          if (l && !t.partial) {
            let d;
            r.value = i ? i.alloc(e, r, {}, o) : {};
            let c = new Set();
            for (let i of l)
              if (
                "string" == typeof i ||
                "number" == typeof i ||
                "symbol" == typeof i
              ) {
                if (
                  (c.add("number" == typeof i ? i.toString() : i),
                  "__proto__" === i)
                )
                  continue;
                let l = t.keyType._zod.run({ value: i, issues: [] }, o);
                if (l instanceof Promise)
                  throw Error(
                    "Async schemas not supported in object keys currently",
                  );
                if (l.issues.length) {
                  r.issues.push({
                    code: "invalid_key",
                    origin: "record",
                    issues: l.issues.map((e) =>
                      a.finalizeIssue(e, o, n.config()),
                    ),
                    input: i,
                    path: [i],
                    inst: e,
                  });
                  continue;
                }
                let d = l.value;
                if ("__proto__" === d) continue;
                let m = t.valueType._zod.run({ value: u[i], issues: [] }, o);
                m instanceof Promise
                  ? s.push(
                      m.then((e) => {
                        (e.issues.length &&
                          r.issues.push(...a.prefixIssues(i, e.issues)),
                          (r.value[d] = e.value));
                      }),
                    )
                  : (m.issues.length &&
                      r.issues.push(...a.prefixIssues(i, m.issues)),
                    (r.value[d] = m.value));
              }
            for (let e in u)
              if (!c.has(e))
                if ("loose" === t.mode) {
                  if ("__proto__" === e) continue;
                  r.value[e] = u[e];
                } else (d = d ?? []).push(e);
            d &&
              d.length > 0 &&
              r.issues.push({
                code: "unrecognized_keys",
                input: u,
                inst: e,
                keys: d,
                continue: !0,
              });
          } else {
            let d;
            for (let c of ((r.value = i ? i.alloc(e, r, {}, o) : {}),
            Reflect.ownKeys(u))) {
              if (
                "__proto__" === c ||
                !Object.prototype.propertyIsEnumerable.call(u, c)
              )
                continue;
              let i = t.keyType._zod.run({ value: c, issues: [] }, o);
              if (i instanceof Promise)
                throw Error(
                  "Async schemas not supported in object keys currently",
                );
              if ("string" == typeof c && eS.test(c) && i.issues.length) {
                let e = t.keyType._zod.run({ value: Number(c), issues: [] }, o);
                if (e instanceof Promise)
                  throw Error(
                    "Async schemas not supported in object keys currently",
                  );
                0 === e.issues.length && (i = e);
              }
              if (i.issues.length) {
                "loose" === t.mode
                  ? (r.value[c] = u[c])
                  : l
                    ? (d = d ?? []).push(c)
                    : r.issues.push({
                        code: "invalid_key",
                        origin: "record",
                        issues: i.issues.map((e) =>
                          a.finalizeIssue(e, o, n.config()),
                        ),
                        input: c,
                        path: [c],
                        inst: e,
                      });
                continue;
              }
              let m = i.value;
              if ("__proto__" === m) continue;
              let f = t.valueType._zod.run({ value: u[c], issues: [] }, o);
              f instanceof Promise
                ? s.push(
                    f.then((e) => {
                      (e.issues.length &&
                        r.issues.push(...a.prefixIssues(c, e.issues)),
                        (r.value[m] = e.value));
                    }),
                  )
                : (f.issues.length &&
                    r.issues.push(...a.prefixIssues(c, f.issues)),
                  (r.value[m] = f.value));
            }
            d &&
              d.length > 0 &&
              r.issues.push({
                code: "unrecognized_keys",
                input: u,
                inst: e,
                keys: d,
                continue: !0,
              });
          }
          return s.length ? Promise.all(s).then(() => r) : r;
        }));
    }),
    iS = n.$constructor("$ZodMap", (e, t) => {
      tl.init(e, t);
      let i = n.globalConfig.memoizer;
      (i?.attach(e),
        (e._zod.parse = (r, n) => {
          let a = r.value;
          if (!(a instanceof Map))
            return (
              r.issues.push({
                expected: "map",
                code: "invalid_type",
                input: a,
                inst: e,
              }),
              r
            );
          let o = [];
          for (let [u, s] of ((r.value = i
            ? i.alloc(e, r, new Map(), n)
            : new Map()),
          a)) {
            let i = t.keyType._zod.run({ value: u, issues: [] }, n),
              l = t.valueType._zod.run({ value: s, issues: [] }, n);
            i instanceof Promise || l instanceof Promise
              ? o.push(
                  Promise.all([i, l]).then(([t, i]) => {
                    iU(t, i, r, u, a, e, n);
                  }),
                )
              : iU(i, l, r, u, a, e, n);
          }
          return o.length ? Promise.all(o).then(() => r) : r;
        }));
    });
  function iU(e, t, i, r, o, u, s) {
    (e.issues.length &&
      (a.propertyKeyTypes.has(typeof r)
        ? i.issues.push(...a.prefixIssues(r, e.issues))
        : i.issues.push({
            code: "invalid_key",
            origin: "map",
            input: o,
            inst: u,
            issues: e.issues.map((e) => a.finalizeIssue(e, s, n.config())),
          })),
      t.issues.length &&
        (a.propertyKeyTypes.has(typeof r)
          ? i.issues.push(...a.prefixIssues(r, t.issues))
          : i.issues.push({
              origin: "map",
              code: "invalid_element",
              input: o,
              inst: u,
              key: r,
              issues: t.issues.map((e) => a.finalizeIssue(e, s, n.config())),
            })),
      i.value.set(e.value, t.value));
  }
  let ij = n.$constructor("$ZodSet", (e, t) => {
    tl.init(e, t);
    let i = n.globalConfig.memoizer;
    (i?.attach(e),
      (e._zod.parse = (r, n) => {
        let a = r.value;
        if (!(a instanceof Set))
          return (
            r.issues.push({
              input: a,
              inst: e,
              expected: "set",
              code: "invalid_type",
            }),
            r
          );
        let o = [];
        for (let u of ((r.value = i ? i.alloc(e, r, new Set(), n) : new Set()),
        a)) {
          let e = t.valueType._zod.run({ value: u, issues: [] }, n);
          e instanceof Promise ? o.push(e.then((e) => iD(e, r))) : iD(e, r);
        }
        return o.length ? Promise.all(o).then(() => r) : r;
      }));
  });
  function iD(e, t) {
    (e.issues.length && t.issues.push(...e.issues), t.value.add(e.value));
  }
  let iO = n.$constructor("$ZodEnum", (e, t) => {
      tl.init(e, t);
      let i = a.getEnumValues(t.entries),
        r = new Set(i);
      e._zod.values = r;
      let n = i.filter((e) => a.propertyKeyTypes.has(typeof e));
      ((e._zod.pattern = new RegExp(
        n.length
          ? `^(${n.map((e) => a.escapeRegex(e.toString())).join("|")})$`
          : "^[^\\s\\S]$",
      )),
        (e._zod.parse = (t, n) => {
          let a = t.value;
          return (
            r.has(a) ||
              t.issues.push({
                code: "invalid_value",
                values: i,
                input: a,
                inst: e,
              }),
            t
          );
        }));
    }),
    iZ = n.$constructor("$ZodLiteral", (e, t) => {
      tl.init(e, t);
      let i = new Set(t.values);
      ((e._zod.values = i),
        (e._zod.pattern = new RegExp(
          t.values.length
            ? `^(${t.values.map((e) => ("string" == typeof e ? a.escapeRegex(e) : e ? a.escapeRegex(e.toString()) : String(e))).join("|")})$`
            : "^[^\\s\\S]$",
        )),
        (e._zod.parse = (r, n) => {
          let a = r.value;
          return (
            i.has(a) ||
              r.issues.push({
                code: "invalid_value",
                values: t.values,
                input: a,
                inst: e,
              }),
            r
          );
        }));
    }),
    iP = n.$constructor("$ZodFile", (e, t) => {
      (tl.init(e, t),
        (e._zod.parse = (t, i) => {
          let r = t.value;
          return (
            r instanceof File ||
              t.issues.push({
                expected: "file",
                code: "invalid_type",
                input: r,
                inst: e,
              }),
            t
          );
        }));
    }),
    iN = n.$constructor("$ZodTransform", (e, t) => {
      (tl.init(e, t),
        (e._zod.optin = "optional"),
        n.globalConfig.memoizer?.guard(e),
        (e._zod.parse = (i, r) => {
          if ("backward" === r.direction)
            throw new n.$ZodEncodeError(e.constructor.name);
          let a = t.transform(i.value, i);
          if (r.async)
            return (a instanceof Promise ? a : Promise.resolve(a)).then(
              (e) => ((i.value = e), i),
            );
          if (a instanceof Promise) throw new n.$ZodAsyncError();
          return ((i.value = a), i);
        }));
    });
  function iA(e, t) {
    return ((e.value = t.issues.length ? void 0 : t.value), e);
  }
  let iT = n.$constructor("$ZodOptional", (e, t) => {
      (tl.init(e, t),
        a.defineLazyInternal(e, "optin", (e) =>
          "defaulted" === e.def.innerType._zod.optin ? "defaulted" : "optional",
        ),
        (e._zod.optout = "optional"),
        a.defineLazyInternal(e, "values", (e) => {
          let t = e.def.innerType._zod.values;
          return t ? new Set([...t, void 0]) : void 0;
        }),
        a.defineLazyInternal(e, "pattern", (e) => {
          let t = e.def.innerType._zod.pattern;
          return t ? RegExp(`^(${a.cleanRegex(t.source)})?$`) : void 0;
        }),
        (e._zod.parse = (e, i) => {
          if (void 0 === e.value) {
            if ("defaulted" !== t.innerType._zod.optin) return e;
            let r = t.innerType._zod.run({ value: e.value, issues: [] }, i);
            return r instanceof Promise ? r.then((t) => iA(e, t)) : iA(e, r);
          }
          return t.innerType._zod.run(e, i);
        }));
    }),
    iE = n.$constructor("$ZodExactOptional", (e, t) => {
      (iT.init(e, t),
        a.defineLazyInternal(e, "values", (e) => e.def.innerType._zod.values),
        a.defineLazyInternal(e, "pattern", (e) => e.def.innerType._zod.pattern),
        (e._zod.parse = (e, i) => t.innerType._zod.run(e, i)));
    }),
    iL = n.$constructor("$ZodNullable", (e, t) => {
      (tl.init(e, t),
        a.defineLazyInternal(e, "optin", (e) => e.def.innerType._zod.optin),
        a.defineLazyInternal(e, "optout", (e) => e.def.innerType._zod.optout),
        a.defineLazyInternal(e, "pattern", (e) => {
          let t = e.def.innerType._zod.pattern;
          return t ? RegExp(`^(${a.cleanRegex(t.source)}|null)$`) : void 0;
        }),
        a.defineLazyInternal(e, "values", (e) =>
          e.def.innerType._zod.values
            ? new Set([...e.def.innerType._zod.values, null])
            : void 0,
        ),
        (e._zod.parse = (e, i) =>
          null === e.value ? e : t.innerType._zod.run(e, i)));
    }),
    iC = n.$constructor("$ZodDefault", (e, t) => {
      (tl.init(e, t),
        (e._zod.optin = "defaulted"),
        a.defineLazyInternal(e, "values", (e) => e.def.innerType._zod.values),
        (e._zod.parse = (e, i) => {
          if ("backward" === i.direction) return t.innerType._zod.run(e, i);
          if (void 0 === e.value) return ((e.value = t.defaultValue), e);
          let r = t.innerType._zod.run(e, i);
          return r instanceof Promise ? r.then((e) => iV(e, t)) : iV(r, t);
        }));
    });
  function iV(e, t) {
    return (void 0 === e.value && (e.value = t.defaultValue), e);
  }
  let iR = n.$constructor("$ZodPrefault", (e, t) => {
      (tl.init(e, t),
        (e._zod.optin = "defaulted"),
        a.defineLazyInternal(e, "values", (e) => e.def.innerType._zod.values),
        (e._zod.parse = (e, i) => (
          "backward" === i.direction ||
            (void 0 === e.value && (e.value = t.defaultValue)),
          t.innerType._zod.run(e, i)
        )));
    }),
    iJ = n.$constructor("$ZodNonOptional", (e, t) => {
      (tl.init(e, t),
        a.defineLazyInternal(e, "values", (e) => {
          let t = e.def.innerType._zod.values;
          return t ? new Set([...t].filter((e) => void 0 !== e)) : void 0;
        }),
        (e._zod.parse = (i, r) => {
          let n = t.innerType._zod.run(i, r);
          return n instanceof Promise ? n.then((t) => iM(t, e)) : iM(n, e);
        }));
    });
  function iM(e, t) {
    return (
      e.issues.length ||
        void 0 !== e.value ||
        e.issues.push({
          code: "invalid_type",
          expected: "nonoptional",
          input: e.value,
          inst: t,
        }),
      e
    );
  }
  let iF = n.$constructor("$ZodSuccess", (e, t) => {
    (tl.init(e, t),
      (e._zod.parse = (e, i) => {
        if ("backward" === i.direction)
          throw new n.$ZodEncodeError("ZodSuccess");
        let r = t.innerType._zod.run(e, i);
        return r instanceof Promise
          ? r.then((t) => ((e.value = 0 === t.issues.length), e))
          : ((e.value = 0 === r.issues.length), e);
      }));
  });
  function iW(e, t, i, r) {
    return (
      t.issues.length
        ? (e.value = i.catchValue({
            ...t,
            value: e.value,
            error: {
              issues: t.issues.map((e) => a.finalizeIssue(e, r, n.config())),
            },
            input: e.value,
          }))
        : ((e.value = t.value), t.memo && (e.memo = !0)),
      e
    );
  }
  let iK = n.$constructor("$ZodCatch", (e, t) => {
      (tl.init(e, t),
        a.defineLazyInternal(e, "optin", (e) =>
          "defaulted" === e.def.innerType._zod.optin ? "defaulted" : "optional",
        ),
        a.defineLazyInternal(e, "optout", (e) => e.def.innerType._zod.optout),
        a.defineLazyInternal(e, "values", (e) => e.def.innerType._zod.values),
        (e._zod.parse = (e, i) => {
          if ("backward" === i.direction) return t.innerType._zod.run(e, i);
          let r = t.innerType._zod.run({ value: e.value, issues: [] }, i);
          return r instanceof Promise
            ? r.then((r) => iW(e, r, t, i))
            : iW(e, r, t, i);
        }));
    }),
    iG = n.$constructor("$ZodNaN", (e, t) => {
      (tl.init(e, t),
        (e._zod.parse = (t, i) => (
          ("number" == typeof t.value && Number.isNaN(t.value)) ||
            t.issues.push({
              input: t.value,
              inst: e,
              expected: "nan",
              code: "invalid_type",
            }),
          t
        )));
    }),
    iB = n.$constructor("$ZodPipe", (e, t) => {
      (tl.init(e, t),
        a.defineLazyInternal(e, "values", (e) => e.def.in._zod.values),
        a.defineLazyInternal(e, "optin", (e) => e.def.in._zod.optin),
        a.defineLazyInternal(e, "optout", (e) => e.def.out._zod.optout),
        a.defineLazyInternal(e, "propValues", (e) => e.def.in._zod.propValues),
        (e._zod.parse = (e, i) => {
          if ("backward" === i.direction) {
            let r = t.out._zod.run(e, i);
            return r instanceof Promise
              ? r.then((e) => iX(e, t.in, i))
              : iX(r, t.in, i);
          }
          let r = t.in._zod.run(e, i);
          return r instanceof Promise
            ? r.then((e) => iX(e, t.out, i))
            : iX(r, t.out, i);
        }));
    });
  function iX(e, t, i) {
    return e.issues.some((e) => "unrecognized_keys" !== e.code)
      ? ((e.aborted = !0), e)
      : t._zod.run({ value: e.value, issues: e.issues }, i);
  }
  let iq = n.$constructor("$ZodCodec", (e, t) => {
    (tl.init(e, t),
      a.defineLazyInternal(e, "values", (e) => e.def.in._zod.values),
      a.defineLazyInternal(e, "optin", (e) => e.def.in._zod.optin),
      a.defineLazyInternal(e, "optout", (e) => e.def.out._zod.optout),
      a.defineLazyInternal(e, "propValues", (e) => e.def.in._zod.propValues),
      (e._zod.parse = (e, i) => {
        if ("forward" === (i.direction || "forward")) {
          let r = t.in._zod.run(e, i);
          return r instanceof Promise
            ? r.then((e) => iH(e, t, i))
            : iH(r, t, i);
        }
        {
          let r = t.out._zod.run(e, i);
          return r instanceof Promise
            ? r.then((e) => iH(e, t, i))
            : iH(r, t, i);
        }
      }));
  });
  function iH(e, t, i) {
    if (e.issues.length) return ((e.aborted = !0), e);
    if ("forward" === (i.direction || "forward")) {
      let r = t.transform(e.value, e);
      return r instanceof Promise
        ? r.then((r) => iY(e, r, t.out, i))
        : iY(e, r, t.out, i);
    }
    {
      let r = t.reverseTransform(e.value, e);
      return r instanceof Promise
        ? r.then((r) => iY(e, r, t.in, i))
        : iY(e, r, t.in, i);
    }
  }
  function iY(e, t, i, r) {
    return e.issues.length
      ? ((e.aborted = !0), e)
      : i._zod.run({ value: t, issues: e.issues }, r);
  }
  let iQ = n.$constructor("$ZodPreprocess", (e, t) => {
      iB.init(e, t);
    }),
    i0 = n.$constructor("$ZodReadonly", (e, t) => {
      (tl.init(e, t),
        a.defineLazyInternal(
          e,
          "propValues",
          (e) => e.def.innerType._zod.propValues,
        ),
        a.defineLazyInternal(e, "values", (e) => e.def.innerType._zod.values),
        a.defineLazyInternal(e, "optin", (e) => e.def.innerType?._zod?.optin),
        a.defineLazyInternal(e, "optout", (e) => e.def.innerType?._zod?.optout),
        (e._zod.parse = (e, i) => {
          if ("backward" === i.direction) return t.innerType._zod.run(e, i);
          let r = t.innerType._zod.run(e, i);
          return r instanceof Promise ? r.then(i4) : i4(r);
        }));
    });
  function i4(e) {
    return (e.memo || (e.value = Object.freeze(e.value)), e);
  }
  let i6 = n.$constructor("$ZodTemplateLiteral", (e, t) => {
      tl.init(e, t);
      let i = [];
      for (let e of t.parts)
        if ("object" == typeof e && null !== e) {
          if (!e._zod.pattern)
            throw Error(
              `Invalid template literal part, no pattern found: ${[...e._zod.traits].shift()}`,
            );
          let t =
            e._zod.pattern instanceof RegExp
              ? e._zod.pattern.source
              : e._zod.pattern;
          if (!t)
            throw Error(`Invalid template literal part: ${e._zod.traits}`);
          let r = +!!t.startsWith("^"),
            n = t.endsWith("$") ? t.length - 1 : t.length;
          i.push(t.slice(r, n));
        } else if (null === e || a.primitiveTypes.has(typeof e))
          i.push(a.escapeRegex(`${e}`));
        else throw Error(`Invalid template literal part: ${e}`);
      ((e._zod.pattern = RegExp(`^${i.join("")}$`)),
        (e._zod.parse = (i, r) => (
          "string" != typeof i.value
            ? i.issues.push({
                input: i.value,
                inst: e,
                expected: "string",
                code: "invalid_type",
              })
            : ((e._zod.pattern.lastIndex = 0),
              e._zod.pattern.test(i.value) ||
                i.issues.push({
                  input: i.value,
                  inst: e,
                  code: "invalid_format",
                  format: t.format ?? "template_literal",
                  pattern: e._zod.pattern.source,
                })),
          i
        )));
    }),
    i1 = n.$constructor(
      "$ZodFunction",
      (e, t) => (
        tl.init(e, t),
        Object.defineProperty(e, "_def", { value: t }),
        (e._zod.def = t),
        (e.implement = (t) => {
          if ("function" != typeof t)
            throw Error("implement() must be called with a function");
          return Object.defineProperty(
            function (...i) {
              let r = Reflect.apply(
                t,
                this,
                e._def.input ? _(e._def.input, i) : i,
              );
              return e._def.output ? _(e._def.output, r) : r;
            },
            "_zod",
            { value: e._zod, enumerable: !1 },
          );
        }),
        (e.implementAsync = (t) => {
          if ("function" != typeof t)
            throw Error("implementAsync() must be called with a function");
          return Object.defineProperty(
            async function (...i) {
              let r = e._def.input ? await x(e._def.input, i) : i,
                n = await Reflect.apply(t, this, r);
              return e._def.output ? await x(e._def.output, n) : n;
            },
            "_zod",
            { value: e._zod, enumerable: !1 },
          );
        }),
        (e._zod.parse = (t, i) => (
          "function" != typeof t.value
            ? t.issues.push({
                code: "invalid_type",
                expected: "function",
                input: t.value,
                inst: e,
              })
            : e._def.output && "promise" === e._def.output._zod.def.type
              ? (t.value = e.implementAsync(t.value))
              : (t.value = e.implement(t.value)),
          t
        )),
        (e.input = (...t) => {
          let i = e.constructor;
          return new i(
            Array.isArray(t[0])
              ? {
                  type: "function",
                  input: new ix({ type: "tuple", items: t[0], rest: t[1] }),
                  output: e._def.output,
                }
              : { type: "function", input: t[0], output: e._def.output },
          );
        }),
        (e.output = (t) =>
          new e.constructor({
            type: "function",
            input: e._def.input,
            output: t,
          })),
        e
      ),
    ),
    i2 = n.$constructor("$ZodPromise", (e, t) => {
      (tl.init(e, t),
        (e._zod.parse = (e, i) =>
          Promise.resolve(e.value).then((e) =>
            t.innerType._zod.run({ value: e, issues: [] }, i),
          )));
    }),
    i9 = n.$constructor("$ZodLazy", (e, t) => {
      (tl.init(e, t),
        a.defineLazy(
          e._zod,
          "innerType",
          () => (
            t._cachedInner || (t._cachedInner = t.getter()),
            t._cachedInner
          ),
        ),
        a.defineLazyInternal(e, "pattern", (e) => e.innerType?._zod?.pattern),
        a.defineLazyInternal(
          e,
          "propValues",
          (e) => e.innerType?._zod?.propValues,
        ),
        a.defineLazyInternal(
          e,
          "optin",
          (e) => e.innerType?._zod?.optin ?? void 0,
        ),
        a.defineLazyInternal(
          e,
          "optout",
          (e) => e.innerType?._zod?.optout ?? void 0,
        ),
        (e._zod.parse = (t, i) => e._zod.innerType._zod.run(t, i)));
    }),
    i7 = n.$constructor("$ZodCustom", (e, t) => {
      (eW.init(e, t),
        tl.init(e, t),
        (e._zod.parse = (e, t) => e),
        (e._zod.check = (i) => {
          let r = i.value,
            n = t.fn(r);
          if (n instanceof Promise) return n.then((t) => i3(t, i, r, e));
          i3(n, i, r, e);
        }));
    });
  function i3(e, t, i, r) {
    if (!e) {
      let e = {
        code: "custom",
        input: i,
        inst: r,
        path: [...(r._zod.def.path ?? [])],
        continue: !r._zod.def.abort,
      };
      (r._zod.def.params && (e.params = r._zod.def.params),
        t.issues.push(a.issue(e)));
    }
  }
  (e.s(
    [
      "$ZodAny",
      0,
      t3,
      "$ZodArray",
      0,
      ir,
      "$ZodBase64",
      0,
      tM,
      "$ZodBase64URL",
      0,
      tW,
      "$ZodBigInt",
      0,
      t6,
      "$ZodBigIntFormat",
      0,
      t1,
      "$ZodBoolean",
      0,
      t4,
      "$ZodCIDRv4",
      0,
      tC,
      "$ZodCIDRv6",
      0,
      tR,
      "$ZodCUID",
      0,
      tw,
      "$ZodCUID2",
      0,
      tz,
      "$ZodCatch",
      0,
      iK,
      "$ZodCodec",
      0,
      iq,
      "$ZodCreditCard",
      0,
      tX,
      "$ZodCustom",
      0,
      i7,
      "$ZodCustomStringFormat",
      0,
      tY,
      "$ZodDate",
      0,
      it,
      "$ZodDefault",
      0,
      iC,
      "$ZodDiscriminatedUnion",
      0,
      ih,
      "$ZodE164",
      0,
      tK,
      "$ZodEmail",
      0,
      tg,
      "$ZodEmoji",
      0,
      tk,
      "$ZodEnum",
      0,
      iO,
      "$ZodExactOptional",
      0,
      iE,
      "$ZodFile",
      0,
      iP,
      "$ZodFunction",
      0,
      i1,
      "$ZodGUID",
      0,
      tp,
      "$ZodIPv4",
      0,
      tN,
      "$ZodIPv6",
      0,
      tE,
      "$ZodISODate",
      0,
      tO,
      "$ZodISODateTime",
      0,
      tD,
      "$ZodISODuration",
      0,
      tP,
      "$ZodISOTime",
      0,
      tZ,
      "$ZodIntersection",
      0,
      iy,
      "$ZodJWT",
      0,
      tH,
      "$ZodKSUID",
      0,
      tj,
      "$ZodLazy",
      0,
      i9,
      "$ZodLiteral",
      0,
      iZ,
      "$ZodMAC",
      0,
      tL,
      "$ZodMap",
      0,
      iS,
      "$ZodNaN",
      0,
      iG,
      "$ZodNanoID",
      0,
      tI,
      "$ZodNever",
      0,
      t8,
      "$ZodNonOptional",
      0,
      iJ,
      "$ZodNull",
      0,
      t7,
      "$ZodNullable",
      0,
      iL,
      "$ZodNumber",
      0,
      tQ,
      "$ZodNumberFormat",
      0,
      t0,
      "$ZodObject",
      0,
      id,
      "$ZodObjectJIT",
      0,
      ic,
      "$ZodOptional",
      0,
      iT,
      "$ZodPipe",
      0,
      iB,
      "$ZodPrefault",
      0,
      iR,
      "$ZodPreprocess",
      0,
      iQ,
      "$ZodPromise",
      0,
      i2,
      "$ZodReadonly",
      0,
      i0,
      "$ZodRecord",
      0,
      iz,
      "$ZodSet",
      0,
      ij,
      "$ZodString",
      0,
      tm,
      "$ZodStringFormat",
      0,
      tf,
      "$ZodSuccess",
      0,
      iF,
      "$ZodSymbol",
      0,
      t2,
      "$ZodTemplateLiteral",
      0,
      i6,
      "$ZodTransform",
      0,
      iN,
      "$ZodTuple",
      0,
      ix,
      "$ZodType",
      0,
      tl,
      "$ZodULID",
      0,
      tS,
      "$ZodURL",
      0,
      tx,
      "$ZodUUID",
      0,
      tv,
      "$ZodUndefined",
      0,
      t9,
      "$ZodUnion",
      0,
      ip,
      "$ZodUnknown",
      0,
      t5,
      "$ZodVoid",
      0,
      ie,
      "$ZodXID",
      0,
      tU,
      "$ZodXor",
      0,
      ig,
      "URL_BAD_FORMAT",
      0,
      1,
      "URL_UNPARSEABLE",
      0,
      2,
      "clone",
      () => a.clone,
      "getDiscriminatedOption",
      0,
      i$,
      "isValidBase64",
      0,
      tJ,
      "isValidBase64URL",
      0,
      tF,
      "isValidCIDRv6",
      0,
      tV,
      "isValidCreditCard",
      0,
      tB,
      "isValidIPv6",
      0,
      tT,
      "isValidJWT",
      0,
      tq,
      "mergeValues",
      0,
      i_,
      "parseURLObject",
      0,
      t$,
      "standardProps",
      0,
      tc,
      "stripTabAndNewline",
      0,
      ty,
      "urlHostnameOk",
      0,
      t_,
      "urlProtocolOk",
      0,
      tb,
    ],
    169478,
  ),
    e.i(169478));
  class i5 extends Error {
    constructor() {
      (super("Cannot parse a reference cycle that closes through a transform"),
        (this.name = "ZodCyclicError"));
    }
  }
  let i8 = "~memo",
    re = [];
  function rt(e) {
    return e.map((e) => (e.path ? { ...e, path: e.path.slice() } : { ...e }));
  }
  let ri = new WeakMap();
  function rr(e, t) {
    let i = ri.get(e);
    if (void 0 !== i) return i;
    if (t.has(e)) return !0;
    t.add(e);
    let r = !1,
      n = (e) => {
        !r && e?._zod && rr(e, t) && (r = !0);
      },
      a = e._zod.def;
    switch (a.type) {
      case "object":
        for (let e of Reflect.ownKeys(a.shape)) n(a.shape[e]);
        n(a.catchall);
        break;
      case "array":
        n(a.element);
        break;
      case "tuple":
        for (let e of a.items) n(e);
        n(a.rest);
        break;
      case "record":
      case "map":
        (n(a.keyType), n(a.valueType));
        break;
      case "set":
        n(a.valueType);
        break;
      case "union":
        for (let e of a.options) n(e);
        break;
      case "intersection":
        (n(a.left), n(a.right));
        break;
      case "optional":
      case "nullable":
      case "default":
      case "prefault":
      case "catch":
      case "readonly":
      case "nonoptional":
      case "promise":
      case "success":
        n(a.innerType);
        break;
      case "pipe":
        (n(a.in), n(a.out));
        break;
      case "function":
        (n(a.input), n(a.output));
        break;
      case "lazy":
        n(e._zod.innerType);
        break;
      case "template_literal":
      case "string":
      case "number":
      case "int":
      case "boolean":
      case "bigint":
      case "symbol":
      case "undefined":
      case "null":
      case "void":
      case "never":
      case "any":
      case "unknown":
      case "date":
      case "nan":
      case "enum":
      case "literal":
      case "file":
      case "transform":
      case "custom":
        break;
      default:
        for (let e in a) {
          let t = Object.getOwnPropertyDescriptor(a, e);
          if (!t || t.get) continue;
          let i = t.value;
          if (i && "object" == typeof i) {
            if (i._zod) n(i);
            else if (Array.isArray(i)) for (let e of i) n(e);
          }
        }
    }
    return (t.delete(e), ri.set(e, r), r);
  }
  function rn(e) {
    return rr(e, new Set());
  }
  let ra = [],
    ro = {
      alloc(e, i, r) {
        let n = t;
        if (!n) return r;
        t = void 0;
        let a = { value: r, issues: null };
        return (n.set(i.value, a), ra.push(a), r);
      },
      guard(e) {
        var t;
        ((t = e._zod).deferred ?? (t.deferred = []),
          e._zod.deferred.push(() => {
            let t = e._zod.parse,
              i = (e, i) => {
                if ("backward" !== i.direction && rs(i, e.value))
                  throw new i5();
                return t(e, i);
              };
            ((e._zod.parse = i), e._zod.run === t && (e._zod.run = i));
          }));
      },
      attach(e) {
        var i;
        let r, n, a;
        ((i = e._zod).deferred ?? (i.deferred = []),
          e._zod.deferred.push(() => {
            let i = e._zod.parse,
              o = (u, s) => {
                let l;
                if (void 0 === r && !(r = rr(e, new Set())))
                  return (
                    (e._zod.parse = i),
                    e._zod.run === o && (e._zod.run = i),
                    i(u, s)
                  );
                let d = u.value;
                if (null === d || "object" != typeof d) return i(u, s);
                let c = s[i8];
                if (
                  (c ||
                    ((c = { buckets: new Map(), backEdges: void 0 }),
                    (s[i8] = c)),
                  n === s)
                )
                  l = a;
                else {
                  var m;
                  let t;
                  ((t = (m = c).buckets.get(e)) ||
                    ((t = new Map()), m.buckets.set(e, t)),
                    (l = t),
                    (n = s),
                    (a = l));
                }
                let f = l.get(d);
                if (f)
                  return (
                    (u.value = f.value),
                    f.issues
                      ? f.issues.length && u.issues.push(...rt(f.issues))
                      : ((u.memo = !0),
                        c.backEdges ?? (c.backEdges = new Set()),
                        c.backEdges.add(f.value)),
                    u
                  );
                t = l;
                let p = ra.length,
                  v = i(u, s);
                t = void 0;
                let g = ra.length > p ? ra.pop() : void 0;
                return v instanceof Promise
                  ? v.then(
                      (e) => (
                        g && (g.issues = e.issues.length ? rt(e.issues) : re),
                        e
                      ),
                    )
                  : (g && (g.issues = v.issues.length ? rt(v.issues) : re), v);
              };
            ((e._zod.parse = o), e._zod.run === i && (e._zod.run = o));
          }));
      },
    };
  function ru() {
    return ro;
  }
  function rs(e, t) {
    let i = e[i8]?.backEdges;
    return void 0 !== i && null !== t && "object" == typeof t && i.has(t);
  }
  (e.s(
    [
      "$ZodCyclicError",
      0,
      i5,
      "isBackEdge",
      0,
      rs,
      "isRecursiveSchema",
      0,
      rn,
      "memoizer",
      0,
      ru,
    ],
    419077,
  ),
    e.i(419077),
    e.i(723968),
    e.i(129407));
  var rl = e.i(408162),
    rd = e.i(136853);
  function rc(e, t, i, r) {
    let n = Math.abs(e),
      a = n % 10,
      o = n % 100;
    return o >= 11 && o <= 19 ? r : 1 === a ? t : a >= 2 && a <= 4 ? i : r;
  }
  function rm() {
    return {
      localeError: (() => {
        let e = {
            string: { unit: "characters", verb: "to have" },
            file: { unit: "bytes", verb: "to have" },
            array: { unit: "items", verb: "to have" },
            set: { unit: "items", verb: "to have" },
            map: { unit: "entries", verb: "to have" },
          },
          t = {
            regex: "input",
            email: "email address",
            url: "URL",
            emoji: "emoji",
            uuid: "UUID",
            uuidv4: "UUIDv4",
            uuidv6: "UUIDv6",
            nanoid: "nanoid",
            guid: "GUID",
            cuid: "cuid",
            cuid2: "cuid2",
            ulid: "ULID",
            xid: "XID",
            ksuid: "KSUID",
            datetime: "ISO datetime",
            date: "ISO date",
            time: "ISO time",
            duration: "ISO duration",
            ipv4: "IPv4 address",
            ipv6: "IPv6 address",
            mac: "MAC address",
            cidrv4: "IPv4 range",
            cidrv6: "IPv6 range",
            base64: "base64-encoded string",
            base64url: "base64url-encoded string",
            json_string: "JSON string",
            e164: "E.164 number",
            credit_card: "credit card number",
            jwt: "JWT",
            template_literal: "input",
          },
          i = { nan: "NaN" };
        function r(e, t) {
          return "number" !== e || "number" != typeof t || Number.isFinite(t)
            ? (i[e] ?? e)
            : String(t);
        }
        return (i) => {
          switch (i.code) {
            case "invalid_type": {
              let e = r(i.expected),
                t = r(a.parsedType(i.input), i.input);
              return `Invalid input: expected ${e}, received ${t}`;
            }
            case "invalid_value":
              if (1 === i.values.length)
                return `Invalid input: expected ${a.stringifyPrimitive(i.values[0])}`;
              return `Invalid option: expected one of ${a.joinValues(i.values, "|")}`;
            case "too_big": {
              let t = i.exact ? "exactly " : i.inclusive ? "<=" : "<",
                r = e[i.origin] ?? null;
              if (r)
                return `Too big: expected ${i.origin ?? "value"} to have ${t}${i.maximum.toString()} ${r.unit ?? "elements"}`;
              return `Too big: expected ${i.origin ?? "value"} to be ${t}${i.maximum.toString()}`;
            }
            case "too_small": {
              let t = i.exact ? "exactly " : i.inclusive ? ">=" : ">",
                r = e[i.origin] ?? null;
              if (r)
                return `Too small: expected ${i.origin} to have ${t}${i.minimum.toString()} ${r.unit}`;
              return `Too small: expected ${i.origin} to be ${t}${i.minimum.toString()}`;
            }
            case "invalid_format":
              if ("starts_with" === i.format)
                return `Invalid string: must start with "${i.prefix}"`;
              if ("ends_with" === i.format)
                return `Invalid string: must end with "${i.suffix}"`;
              if ("includes" === i.format)
                return `Invalid string: must include "${i.includes}"`;
              if ("regex" === i.format)
                return `Invalid string: must match pattern ${i.pattern}`;
              return `Invalid ${t[i.format] ?? i.format}`;
            case "not_multiple_of":
              return `Invalid number: must be a multiple of ${i.divisor}`;
            case "unrecognized_keys":
              return `Unrecognized key${i.keys.length > 1 ? "s" : ""}: ${a.joinValues(i.keys, ", ")}`;
            case "invalid_key":
              return `Invalid key in ${i.origin}`;
            case "invalid_union":
              if (
                i.options &&
                Array.isArray(i.options) &&
                i.options.length > 0
              ) {
                let e = i.options.map((e) => `'${e}'`).join(" | ");
                return `Invalid discriminator value. Expected ${e}`;
              }
              if (!1 === i.inclusive)
                return "Invalid input: more than one option matched";
              return "Invalid input";
            case "invalid_element":
              return `Invalid value in ${i.origin}`;
            default:
              return "Invalid input";
          }
        };
      })(),
    };
  }
  function rf(e, t, i) {
    return 1 === Math.abs(e) ? t : i;
  }
  function rp(e) {
    if (!e) return "";
    let t = e[e.length - 1];
    return e + (["ա", "ե", "ը", "ի", "ո", "ու", "օ"].includes(t) ? "ն" : "ը");
  }
  function rv() {
    let e, t, i;
    return {
      localeError:
        ((e = {
          string: { unit: "តួអក្សរ", verb: "គួរមាន" },
          file: { unit: "បៃ", verb: "គួរមាន" },
          array: { unit: "ធាតុ", verb: "គួរមាន" },
          set: { unit: "ធាតុ", verb: "គួរមាន" },
          map: { unit: "ធាតុ", verb: "គួរមាន" },
        }),
        (t = {
          regex: "ទិន្នន័យបញ្ចូល",
          email: "អាសយដ្ឋានអ៊ីមែល",
          url: "URL",
          emoji: "សញ្ញាអារម្មណ៍",
          uuid: "UUID",
          uuidv4: "UUIDv4",
          uuidv6: "UUIDv6",
          nanoid: "nanoid",
          guid: "GUID",
          cuid: "cuid",
          cuid2: "cuid2",
          ulid: "ULID",
          xid: "XID",
          ksuid: "KSUID",
          datetime: "កាលបរិច្ឆេទ និងម៉ោង ISO",
          date: "កាលបរិច្ឆេទ ISO",
          time: "ម៉ោង ISO",
          duration: "រយៈពេល ISO",
          ipv4: "អាសយដ្ឋាន IPv4",
          ipv6: "អាសយដ្ឋាន IPv6",
          mac: "អាសយដ្ឋាន MAC",
          cidrv4: "ដែនអាសយដ្ឋាន IPv4",
          cidrv6: "ដែនអាសយដ្ឋាន IPv6",
          base64: "ខ្សែអក្សរអ៊ិកូដ base64",
          base64url: "ខ្សែអក្សរអ៊ិកូដ base64url",
          json_string: "ខ្សែអក្សរ JSON",
          e164: "លេខ E.164",
          credit_card: "លេខប័ណ្ណឥណទាន",
          jwt: "JWT",
          template_literal: "ទិន្នន័យបញ្ចូល",
        }),
        (i = {
          nan: "NaN",
          number: "លេខ",
          array: "អារេ (Array)",
          null: "គ្មានតម្លៃ (null)",
        }),
        (r) => {
          switch (r.code) {
            case "invalid_type": {
              let e = i[r.expected] ?? r.expected,
                t = a.parsedType(r.input),
                n = i[t] ?? t;
              if (/^[A-Z]/.test(r.expected))
                return `ទិន្នន័យបញ្ចូលមិនត្រឹមត្រូវ៖ ត្រូវការ instanceof ${r.expected} ប៉ុន្តែទទួលបាន ${n}`;
              return `ទិន្នន័យបញ្ចូលមិនត្រឹមត្រូវ៖ ត្រូវការ ${e} ប៉ុន្តែទទួលបាន ${n}`;
            }
            case "invalid_value":
              if (1 === r.values.length)
                return `ទិន្នន័យបញ្ចូលមិនត្រឹមត្រូវ៖ ត្រូវការ ${a.stringifyPrimitive(r.values[0])}`;
              return `ជម្រើសមិនត្រឹមត្រូវ៖ ត្រូវជាមួយក្នុងចំណោម ${a.joinValues(r.values, "|")}`;
            case "too_big": {
              let t = r.inclusive ? "<=" : "<",
                i = e[r.origin] ?? null;
              if (i)
                return `ធំពេក៖ ត្រូវការ ${r.origin ?? "តម្លៃ"} ${t} ${r.maximum.toString()} ${i.unit ?? "ធាតុ"}`;
              return `ធំពេក៖ ត្រូវការ ${r.origin ?? "តម្លៃ"} ${t} ${r.maximum.toString()}`;
            }
            case "too_small": {
              let t = r.inclusive ? ">=" : ">",
                i = e[r.origin] ?? null;
              if (i)
                return `តូចពេក៖ ត្រូវការ ${r.origin} ${t} ${r.minimum.toString()} ${i.unit}`;
              return `តូចពេក៖ ត្រូវការ ${r.origin} ${t} ${r.minimum.toString()}`;
            }
            case "invalid_format":
              if ("starts_with" === r.format)
                return `ខ្សែអក្សរមិនត្រឹមត្រូវ៖ ត្រូវចាប់ផ្តើមដោយ "${r.prefix}"`;
              if ("ends_with" === r.format)
                return `ខ្សែអក្សរមិនត្រឹមត្រូវ៖ ត្រូវបញ្ចប់ដោយ "${r.suffix}"`;
              if ("includes" === r.format)
                return `ខ្សែអក្សរមិនត្រឹមត្រូវ៖ ត្រូវមាន "${r.includes}"`;
              if ("regex" === r.format)
                return `ខ្សែអក្សរមិនត្រឹមត្រូវ៖ ត្រូវតែផ្គូផ្គងនឹងទម្រង់ដែលបានកំណត់ ${r.pattern}`;
              return `មិនត្រឹមត្រូវ៖ ${t[r.format] ?? r.format}`;
            case "not_multiple_of":
              return `លេខមិនត្រឹមត្រូវ៖ ត្រូវតែជាពហុគុណនៃ ${r.divisor}`;
            case "unrecognized_keys":
              return `រកឃើញសោមិនស្គាល់៖ ${a.joinValues(r.keys, ", ")}`;
            case "invalid_key":
              return `សោមិនត្រឹមត្រូវនៅក្នុង ${r.origin}`;
            case "invalid_union":
            default:
              return "ទិន្នន័យមិនត្រឹមត្រូវ";
            case "invalid_element":
              return `ទិន្នន័យមិនត្រឹមត្រូវនៅក្នុង ${r.origin}`;
          }
        }),
    };
  }
  let rg = (e) => e.charAt(0).toUpperCase() + e.slice(1);
  function r$(e) {
    let t = Math.abs(e),
      i = t % 10,
      r = t % 100;
    return (r >= 11 && r <= 19) || 0 === i ? "many" : 1 === i ? "one" : "few";
  }
  function rh(e, t, i, r) {
    let n = Math.abs(e),
      a = n % 10,
      o = n % 100;
    return o >= 11 && o <= 19 ? r : 1 === a ? t : a >= 2 && a <= 4 ? i : r;
  }
  function ry() {
    let e, t, i;
    return {
      localeError:
        ((e = {
          string: { unit: "символів", verb: "матиме" },
          file: { unit: "байтів", verb: "матиме" },
          array: { unit: "елементів", verb: "матиме" },
          set: { unit: "елементів", verb: "матиме" },
          map: { unit: "елементів", verb: "матиме" },
        }),
        (t = {
          regex: "вхідні дані",
          email: "адреса електронної пошти",
          url: "URL",
          emoji: "емодзі",
          uuid: "UUID",
          uuidv4: "UUIDv4",
          uuidv6: "UUIDv6",
          nanoid: "nanoid",
          guid: "GUID",
          cuid: "cuid",
          cuid2: "cuid2",
          ulid: "ULID",
          xid: "XID",
          ksuid: "KSUID",
          datetime: "дата та час ISO",
          date: "дата ISO",
          time: "час ISO",
          duration: "тривалість ISO",
          ipv4: "адреса IPv4",
          ipv6: "адреса IPv6",
          mac: "адреса MAC",
          cidrv4: "діапазон IPv4",
          cidrv6: "діапазон IPv6",
          base64: "рядок у кодуванні base64",
          base64url: "рядок у кодуванні base64url",
          json_string: "рядок JSON",
          e164: "номер E.164",
          credit_card: "номер кредитної картки",
          jwt: "JWT",
          template_literal: "вхідні дані",
        }),
        (i = { nan: "NaN", number: "число", array: "масив" }),
        (r) => {
          switch (r.code) {
            case "invalid_type": {
              let e = i[r.expected] ?? r.expected,
                t = a.parsedType(r.input),
                n = i[t] ?? t;
              if (/^[A-Z]/.test(r.expected))
                return `Неправильні вхідні дані: очікується instanceof ${r.expected}, отримано ${n}`;
              return `Неправильні вхідні дані: очікується ${e}, отримано ${n}`;
            }
            case "invalid_value":
              if (1 === r.values.length)
                return `Неправильні вхідні дані: очікується ${a.stringifyPrimitive(r.values[0])}`;
              return `Неправильна опція: очікується одне з ${a.joinValues(r.values, "|")}`;
            case "too_big": {
              let t = r.inclusive ? "<=" : "<",
                i = e[r.origin] ?? null;
              if (i)
                return `Занадто велике: очікується, що ${r.origin ?? "значення"} ${i.verb} ${t}${r.maximum.toString()} ${i.unit ?? "елементів"}`;
              return `Занадто велике: очікується, що ${r.origin ?? "значення"} буде ${t}${r.maximum.toString()}`;
            }
            case "too_small": {
              let t = r.inclusive ? ">=" : ">",
                i = e[r.origin] ?? null;
              if (i)
                return `Занадто мале: очікується, що ${r.origin} ${i.verb} ${t}${r.minimum.toString()} ${i.unit}`;
              return `Занадто мале: очікується, що ${r.origin} буде ${t}${r.minimum.toString()}`;
            }
            case "invalid_format":
              if ("starts_with" === r.format)
                return `Неправильний рядок: повинен починатися з "${r.prefix}"`;
              if ("ends_with" === r.format)
                return `Неправильний рядок: повинен закінчуватися на "${r.suffix}"`;
              if ("includes" === r.format)
                return `Неправильний рядок: повинен містити "${r.includes}"`;
              if ("regex" === r.format)
                return `Неправильний рядок: повинен відповідати шаблону ${r.pattern}`;
              return `Неправильний ${t[r.format] ?? r.format}`;
            case "not_multiple_of":
              return `Неправильне число: повинно бути кратним ${r.divisor}`;
            case "unrecognized_keys":
              return `Нерозпізнаний ключ${r.keys.length > 1 ? "і" : ""}: ${a.joinValues(r.keys, ", ")}`;
            case "invalid_key":
              return `Неправильний ключ у ${r.origin}`;
            case "invalid_union":
            default:
              return "Неправильні вхідні дані";
            case "invalid_element":
              return `Неправильне значення у ${r.origin}`;
          }
        }),
    };
  }
  e.s(
    [
      "ar",
      0,
      function () {
        let e, t, i;
        return {
          localeError:
            ((e = {
              string: { unit: "حرف", verb: "أن يحوي" },
              file: { unit: "بايت", verb: "أن يحوي" },
              array: { unit: "عنصر", verb: "أن يحوي" },
              set: { unit: "عنصر", verb: "أن يحوي" },
              map: { unit: "عنصر", verb: "أن يحوي" },
            }),
            (t = {
              regex: "مدخل",
              email: "بريد إلكتروني",
              url: "رابط",
              emoji: "إيموجي",
              uuid: "UUID",
              uuidv4: "UUIDv4",
              uuidv6: "UUIDv6",
              nanoid: "nanoid",
              guid: "GUID",
              cuid: "cuid",
              cuid2: "cuid2",
              ulid: "ULID",
              xid: "XID",
              ksuid: "KSUID",
              datetime: "تاريخ ووقت بمعيار ISO",
              date: "تاريخ بمعيار ISO",
              time: "وقت بمعيار ISO",
              duration: "مدة بمعيار ISO",
              ipv4: "عنوان IPv4",
              ipv6: "عنوان IPv6",
              mac: "عنوان MAC",
              cidrv4: "مدى عناوين بصيغة IPv4",
              cidrv6: "مدى عناوين بصيغة IPv6",
              base64: "نَص بترميز base64-encoded",
              base64url: "نَص بترميز base64url-encoded",
              json_string: "نَص على هيئة JSON",
              e164: "رقم هاتف بمعيار E.164",
              credit_card: "رقم بطاقة الائتمان",
              jwt: "JWT",
              template_literal: "مدخل",
            }),
            (i = { nan: "NaN" }),
            (r) => {
              switch (r.code) {
                case "invalid_type": {
                  let e = i[r.expected] ?? r.expected,
                    t = a.parsedType(r.input),
                    n = i[t] ?? t;
                  if (/^[A-Z]/.test(r.expected))
                    return `مدخلات غير مقبولة: يفترض إدخال instanceof ${r.expected}، ولكن تم إدخال ${n}`;
                  return `مدخلات غير مقبولة: يفترض إدخال ${e}، ولكن تم إدخال ${n}`;
                }
                case "invalid_value":
                  if (1 === r.values.length)
                    return `مدخلات غير مقبولة: يفترض إدخال ${a.stringifyPrimitive(r.values[0])}`;
                  return `اختيار غير مقبول: يتوقع انتقاء أحد هذه الخيارات: ${a.joinValues(r.values, "|")}`;
                case "too_big": {
                  let t = r.inclusive ? "<=" : "<",
                    i = e[r.origin] ?? null;
                  if (i)
                    return ` أكبر من اللازم: يفترض أن تكون ${r.origin ?? "القيمة"} ${t} ${r.maximum.toString()} ${i.unit ?? "عنصر"}`;
                  return `أكبر من اللازم: يفترض أن تكون ${r.origin ?? "القيمة"} ${t} ${r.maximum.toString()}`;
                }
                case "too_small": {
                  let t = r.inclusive ? ">=" : ">",
                    i = e[r.origin] ?? null;
                  if (i)
                    return `أصغر من اللازم: يفترض لـ ${r.origin} أن يكون ${t} ${r.minimum.toString()} ${i.unit}`;
                  return `أصغر من اللازم: يفترض لـ ${r.origin} أن يكون ${t} ${r.minimum.toString()}`;
                }
                case "invalid_format":
                  if ("starts_with" === r.format)
                    return `نَص غير مقبول: يجب أن يبدأ بـ "${r.prefix}"`;
                  if ("ends_with" === r.format)
                    return `نَص غير مقبول: يجب أن ينتهي بـ "${r.suffix}"`;
                  if ("includes" === r.format)
                    return `نَص غير مقبول: يجب أن يتضمَّن "${r.includes}"`;
                  if ("regex" === r.format)
                    return `نَص غير مقبول: يجب أن يطابق النمط ${r.pattern}`;
                  return `${t[r.format] ?? r.format} غير مقبول`;
                case "not_multiple_of":
                  return `رقم غير مقبول: يجب أن يكون من مضاعفات ${r.divisor}`;
                case "unrecognized_keys":
                  return `معرف${r.keys.length > 1 ? "ات" : ""} غريب${r.keys.length > 1 ? "ة" : ""}: ${a.joinValues(r.keys, "، ")}`;
                case "invalid_key":
                  return `معرف غير مقبول في ${r.origin}`;
                case "invalid_union":
                default:
                  return "مدخل غير مقبول";
                case "invalid_element":
                  return `مدخل غير مقبول في ${r.origin}`;
              }
            }),
        };
      },
      "az",
      0,
      function () {
        let e, t, i;
        return {
          localeError:
            ((e = {
              string: { unit: "simvol", verb: "olmalıdır" },
              file: { unit: "bayt", verb: "olmalıdır" },
              array: { unit: "element", verb: "olmalıdır" },
              set: { unit: "element", verb: "olmalıdır" },
              map: { unit: "element", verb: "olmalıdır" },
            }),
            (t = {
              regex: "input",
              email: "email address",
              url: "URL",
              emoji: "emoji",
              uuid: "UUID",
              uuidv4: "UUIDv4",
              uuidv6: "UUIDv6",
              nanoid: "nanoid",
              guid: "GUID",
              cuid: "cuid",
              cuid2: "cuid2",
              ulid: "ULID",
              xid: "XID",
              ksuid: "KSUID",
              datetime: "ISO datetime",
              date: "ISO date",
              time: "ISO time",
              duration: "ISO duration",
              ipv4: "IPv4 address",
              ipv6: "IPv6 address",
              mac: "MAC address",
              cidrv4: "IPv4 range",
              cidrv6: "IPv6 range",
              base64: "base64-encoded string",
              base64url: "base64url-encoded string",
              json_string: "JSON string",
              e164: "E.164 number",
              credit_card: "kredit kartı nömrəsi",
              jwt: "JWT",
              template_literal: "input",
            }),
            (i = { nan: "NaN" }),
            (r) => {
              switch (r.code) {
                case "invalid_type": {
                  let e = i[r.expected] ?? r.expected,
                    t = a.parsedType(r.input),
                    n = i[t] ?? t;
                  if (/^[A-Z]/.test(r.expected))
                    return `Yanlış dəyər: g\xf6zlənilən instanceof ${r.expected}, daxil olan ${n}`;
                  return `Yanlış dəyər: g\xf6zlənilən ${e}, daxil olan ${n}`;
                }
                case "invalid_value":
                  if (1 === r.values.length)
                    return `Yanlış dəyər: g\xf6zlənilən ${a.stringifyPrimitive(r.values[0])}`;
                  return `Yanlış se\xe7im: aşağıdakılardan biri olmalıdır: ${a.joinValues(r.values, "|")}`;
                case "too_big": {
                  let t = r.inclusive ? "<=" : "<",
                    i = e[r.origin] ?? null;
                  if (i)
                    return `\xc7ox b\xf6y\xfck: g\xf6zlənilən ${r.origin ?? "dəyər"} ${t}${r.maximum.toString()} ${i.unit ?? "element"}`;
                  return `\xc7ox b\xf6y\xfck: g\xf6zlənilən ${r.origin ?? "dəyər"} ${t}${r.maximum.toString()}`;
                }
                case "too_small": {
                  let t = r.inclusive ? ">=" : ">",
                    i = e[r.origin] ?? null;
                  if (i)
                    return `\xc7ox ki\xe7ik: g\xf6zlənilən ${r.origin} ${t}${r.minimum.toString()} ${i.unit}`;
                  return `\xc7ox ki\xe7ik: g\xf6zlənilən ${r.origin} ${t}${r.minimum.toString()}`;
                }
                case "invalid_format":
                  if ("starts_with" === r.format)
                    return `Yanlış mətn: "${r.prefix}" ilə başlamalıdır`;
                  if ("ends_with" === r.format)
                    return `Yanlış mətn: "${r.suffix}" ilə bitməlidir`;
                  if ("includes" === r.format)
                    return `Yanlış mətn: "${r.includes}" daxil olmalıdır`;
                  if ("regex" === r.format)
                    return `Yanlış mətn: ${r.pattern} şablonuna uyğun olmalıdır`;
                  return `Yanlış ${t[r.format] ?? r.format}`;
                case "not_multiple_of":
                  return `Yanlış ədəd: ${r.divisor} ilə b\xf6l\xfcnə bilən olmalıdır`;
                case "unrecognized_keys":
                  return `Tanınmayan a\xe7ar${r.keys.length > 1 ? "lar" : ""}: ${a.joinValues(r.keys, ", ")}`;
                case "invalid_key":
                  return `${r.origin} daxilində yanlış a\xe7ar`;
                case "invalid_union":
                default:
                  return "Yanlış dəyər";
                case "invalid_element":
                  return `${r.origin} daxilində yanlış dəyər`;
              }
            }),
        };
      },
      "be",
      0,
      function () {
        let e, t, i;
        return {
          localeError:
            ((e = {
              string: {
                unit: { one: "сімвал", few: "сімвалы", many: "сімвалаў" },
                verb: "мець",
              },
              array: {
                unit: { one: "элемент", few: "элементы", many: "элементаў" },
                verb: "мець",
              },
              set: {
                unit: { one: "элемент", few: "элементы", many: "элементаў" },
                verb: "мець",
              },
              map: {
                unit: { one: "элемент", few: "элементы", many: "элементаў" },
                verb: "мець",
              },
              file: {
                unit: { one: "байт", few: "байты", many: "байтаў" },
                verb: "мець",
              },
            }),
            (t = {
              regex: "увод",
              email: "email адрас",
              url: "URL",
              emoji: "эмодзі",
              uuid: "UUID",
              uuidv4: "UUIDv4",
              uuidv6: "UUIDv6",
              nanoid: "nanoid",
              guid: "GUID",
              cuid: "cuid",
              cuid2: "cuid2",
              ulid: "ULID",
              xid: "XID",
              ksuid: "KSUID",
              datetime: "ISO дата і час",
              date: "ISO дата",
              time: "ISO час",
              duration: "ISO працягласць",
              ipv4: "IPv4 адрас",
              ipv6: "IPv6 адрас",
              mac: "MAC адрас",
              cidrv4: "IPv4 дыяпазон",
              cidrv6: "IPv6 дыяпазон",
              base64: "радок у фармаце base64",
              base64url: "радок у фармаце base64url",
              json_string: "JSON радок",
              e164: "нумар E.164",
              credit_card: "нумар крэдытнай карты",
              jwt: "JWT",
              template_literal: "увод",
            }),
            (i = { nan: "NaN", number: "лік", array: "масіў" }),
            (r) => {
              switch (r.code) {
                case "invalid_type": {
                  let e = i[r.expected] ?? r.expected,
                    t = a.parsedType(r.input),
                    n = i[t] ?? t;
                  if (/^[A-Z]/.test(r.expected))
                    return `Няправільны ўвод: чакаўся instanceof ${r.expected}, атрымана ${n}`;
                  return `Няправільны ўвод: чакаўся ${e}, атрымана ${n}`;
                }
                case "invalid_value":
                  if (1 === r.values.length)
                    return `Няправільны ўвод: чакалася ${a.stringifyPrimitive(r.values[0])}`;
                  return `Няправільны варыянт: чакаўся адзін з ${a.joinValues(r.values, "|")}`;
                case "too_big": {
                  let t = r.inclusive ? "<=" : "<",
                    i = e[r.origin] ?? null;
                  if (i) {
                    let e = rc(
                      Number(r.maximum),
                      i.unit.one,
                      i.unit.few,
                      i.unit.many,
                    );
                    return `Занадта вялікі: чакалася, што ${r.origin ?? "значэнне"} павінна ${i.verb} ${t}${r.maximum.toString()} ${e}`;
                  }
                  return `Занадта вялікі: чакалася, што ${r.origin ?? "значэнне"} павінна быць ${t}${r.maximum.toString()}`;
                }
                case "too_small": {
                  let t = r.inclusive ? ">=" : ">",
                    i = e[r.origin] ?? null;
                  if (i) {
                    let e = rc(
                      Number(r.minimum),
                      i.unit.one,
                      i.unit.few,
                      i.unit.many,
                    );
                    return `Занадта малы: чакалася, што ${r.origin} павінна ${i.verb} ${t}${r.minimum.toString()} ${e}`;
                  }
                  return `Занадта малы: чакалася, што ${r.origin} павінна быць ${t}${r.minimum.toString()}`;
                }
                case "invalid_format":
                  if ("starts_with" === r.format)
                    return `Няправільны радок: павінен пачынацца з "${r.prefix}"`;
                  if ("ends_with" === r.format)
                    return `Няправільны радок: павінен заканчвацца на "${r.suffix}"`;
                  if ("includes" === r.format)
                    return `Няправільны радок: павінен змяшчаць "${r.includes}"`;
                  if ("regex" === r.format)
                    return `Няправільны радок: павінен адпавядаць шаблону ${r.pattern}`;
                  return `Няправільны ${t[r.format] ?? r.format}`;
                case "not_multiple_of":
                  return `Няправільны лік: павінен быць кратным ${r.divisor}`;
                case "unrecognized_keys":
                  return `Нераспазнаны ${r.keys.length > 1 ? "ключы" : "ключ"}: ${a.joinValues(r.keys, ", ")}`;
                case "invalid_key":
                  return `Няправільны ключ у ${r.origin}`;
                case "invalid_union":
                default:
                  return "Няправільны ўвод";
                case "invalid_element":
                  return `Няправільнае значэнне ў ${r.origin}`;
              }
            }),
        };
      },
      "bg",
      0,
      function () {
        let e, t, i;
        return {
          localeError:
            ((e = {
              string: { unit: "символа", verb: "да съдържа" },
              file: { unit: "байта", verb: "да съдържа" },
              array: { unit: "елемента", verb: "да съдържа" },
              set: { unit: "елемента", verb: "да съдържа" },
              map: { unit: "елемента", verb: "да съдържа" },
            }),
            (t = {
              regex: "вход",
              email: "имейл адрес",
              url: "URL",
              emoji: "емоджи",
              uuid: "UUID",
              uuidv4: "UUIDv4",
              uuidv6: "UUIDv6",
              nanoid: "nanoid",
              guid: "GUID",
              cuid: "cuid",
              cuid2: "cuid2",
              ulid: "ULID",
              xid: "XID",
              ksuid: "KSUID",
              datetime: "ISO време",
              date: "ISO дата",
              time: "ISO време",
              duration: "ISO продължителност",
              ipv4: "IPv4 адрес",
              ipv6: "IPv6 адрес",
              mac: "MAC адрес",
              cidrv4: "IPv4 диапазон",
              cidrv6: "IPv6 диапазон",
              base64: "base64-кодиран низ",
              base64url: "base64url-кодиран низ",
              json_string: "JSON низ",
              e164: "E.164 номер",
              credit_card: "номер на кредитна карта",
              jwt: "JWT",
              template_literal: "вход",
            }),
            (i = { nan: "NaN", number: "число", array: "масив" }),
            (r) => {
              switch (r.code) {
                case "invalid_type": {
                  let e = i[r.expected] ?? r.expected,
                    t = a.parsedType(r.input),
                    n = i[t] ?? t;
                  if (/^[A-Z]/.test(r.expected))
                    return `Невалиден вход: очакван instanceof ${r.expected}, получен ${n}`;
                  return `Невалиден вход: очакван ${e}, получен ${n}`;
                }
                case "invalid_value":
                  if (1 === r.values.length)
                    return `Невалиден вход: очакван ${a.stringifyPrimitive(r.values[0])}`;
                  return `Невалидна опция: очаквано едно от ${a.joinValues(r.values, "|")}`;
                case "too_big": {
                  let t = r.inclusive ? "<=" : "<",
                    i = e[r.origin] ?? null;
                  if (i)
                    return `Твърде голямо: очаква се ${r.origin ?? "стойност"} да съдържа ${t}${r.maximum.toString()} ${i.unit ?? "елемента"}`;
                  return `Твърде голямо: очаква се ${r.origin ?? "стойност"} да бъде ${t}${r.maximum.toString()}`;
                }
                case "too_small": {
                  let t = r.inclusive ? ">=" : ">",
                    i = e[r.origin] ?? null;
                  if (i)
                    return `Твърде малко: очаква се ${r.origin} да съдържа ${t}${r.minimum.toString()} ${i.unit}`;
                  return `Твърде малко: очаква се ${r.origin} да бъде ${t}${r.minimum.toString()}`;
                }
                case "invalid_format": {
                  if ("starts_with" === r.format)
                    return `Невалиден низ: трябва да започва с "${r.prefix}"`;
                  if ("ends_with" === r.format)
                    return `Невалиден низ: трябва да завършва с "${r.suffix}"`;
                  if ("includes" === r.format)
                    return `Невалиден низ: трябва да включва "${r.includes}"`;
                  if ("regex" === r.format)
                    return `Невалиден низ: трябва да съвпада с ${r.pattern}`;
                  let e = "Невалиден";
                  return (
                    "emoji" === r.format && (e = "Невалидно"),
                    "datetime" === r.format && (e = "Невалидно"),
                    "date" === r.format && (e = "Невалидна"),
                    "time" === r.format && (e = "Невалидно"),
                    "duration" === r.format && (e = "Невалидна"),
                    `${e} ${t[r.format] ?? r.format}`
                  );
                }
                case "not_multiple_of":
                  return `Невалидно число: трябва да бъде кратно на ${r.divisor}`;
                case "unrecognized_keys":
                  return `Неразпознат${r.keys.length > 1 ? "и" : ""} ключ${r.keys.length > 1 ? "ове" : ""}: ${a.joinValues(r.keys, ", ")}`;
                case "invalid_key":
                  return `Невалиден ключ в ${r.origin}`;
                case "invalid_union":
                default:
                  return "Невалиден вход";
                case "invalid_element":
                  return `Невалидна стойност в ${r.origin}`;
              }
            }),
        };
      },
      "bn",
      0,
      function () {
        let e, t, i;
        return {
          localeError:
            ((e = {
              string: { unit: "অক্ষর", verb: "থাকতে হবে" },
              file: { unit: "বাইট", verb: "থাকতে হবে" },
              array: { unit: "আইটেম", verb: "থাকতে হবে" },
              set: { unit: "আইটেম", verb: "থাকতে হবে" },
              map: { unit: "এন্ট্রি", verb: "থাকতে হবে" },
            }),
            (t = {
              regex: "ইনপুট",
              email: "ইমেইল ঠিকানা",
              url: "URL",
              emoji: "ইমোজি",
              uuid: "UUID",
              uuidv4: "UUIDv4",
              uuidv6: "UUIDv6",
              nanoid: "nanoid",
              guid: "GUID",
              cuid: "cuid",
              cuid2: "cuid2",
              ulid: "ULID",
              xid: "XID",
              ksuid: "KSUID",
              datetime: "ISO তারিখ ও সময়",
              date: "ISO তারিখ",
              time: "ISO সময়",
              duration: "ISO সময়কাল",
              ipv4: "IPv4 ঠিকানা",
              ipv6: "IPv6 ঠিকানা",
              mac: "MAC ঠিকানা",
              cidrv4: "IPv4 রেঞ্জ",
              cidrv6: "IPv6 রেঞ্জ",
              base64: "base64-এনকোডেড স্ট্রিং",
              base64url: "base64url-এনকোডেড স্ট্রিং",
              json_string: "JSON স্ট্রিং",
              e164: "E.164 নম্বর",
              credit_card: "ক্রেডিট কার্ড নম্বর",
              jwt: "JWT",
              template_literal: "ইনপুট",
            }),
            (i = { nan: "NaN" }),
            (r) => {
              switch (r.code) {
                case "invalid_type": {
                  let e = i[r.expected] ?? r.expected,
                    t = a.parsedType(r.input),
                    n = i[t] ?? t;
                  return `অবৈধ ইনপুট: প্রত্যাশিত ${e}, প্রাপ্ত ${n}`;
                }
                case "invalid_value":
                  if (1 === r.values.length)
                    return `অবৈধ ইনপুট: প্রত্যাশিত ${a.stringifyPrimitive(r.values[0])}`;
                  return `অবৈধ অপশন: ${a.joinValues(r.values, " | ")} এর মধ্যে একটি প্রত্যাশিত`;
                case "too_big": {
                  let t = r.inclusive ? "<=" : "<",
                    i = e[r.origin] ?? null;
                  if (i)
                    return `অনেক বড়: ${r.origin ?? "মান"} ${t}${r.maximum.toString()} ${i.unit ?? "এলিমেন্ট"} হতে হবে`;
                  return `অনেক বড়: ${r.origin ?? "মান"} ${t}${r.maximum.toString()} হতে হবে`;
                }
                case "too_small": {
                  let t = r.inclusive ? ">=" : ">",
                    i = e[r.origin] ?? null;
                  if (i)
                    return `অনেক ছোট: ${r.origin} ${t}${r.minimum.toString()} ${i.unit} হতে হবে`;
                  return `অনেক ছোট: ${r.origin} ${t}${r.minimum.toString()} হতে হবে`;
                }
                case "invalid_format":
                  if ("starts_with" === r.format)
                    return `অবৈধ স্ট্রিং: "${r.prefix}" দিয়ে শুরু হতে হবে`;
                  if ("ends_with" === r.format)
                    return `অবৈধ স্ট্রিং: "${r.suffix}" দিয়ে শেষ হতে হবে`;
                  if ("includes" === r.format)
                    return `অবৈধ স্ট্রিং: "${r.includes}" অন্তর্ভুক্ত থাকতে হবে`;
                  if ("regex" === r.format)
                    return `অবৈধ স্ট্রিং: ${r.pattern} প্যাটার্ন মিলতে হবে`;
                  return `অবৈধ ${t[r.format] ?? r.format}`;
                case "not_multiple_of":
                  return `অবৈধ নম্বর: ${r.divisor} এর গুণিতক হতে হবে`;
                case "unrecognized_keys":
                  return `অচেনা কী${r.keys.length > 1 ? "গুলো" : ""}: ${a.joinValues(r.keys, ", ")}`;
                case "invalid_key":
                  return `${r.origin} এ অবৈধ কী`;
                case "invalid_union":
                  if (
                    r.options &&
                    Array.isArray(r.options) &&
                    r.options.length > 0
                  ) {
                    let e = r.options.map((e) => `'${e}'`).join(" | ");
                    return `অবৈধ ডিসক্রিমিনেটর মান। প্রত্যাশিত ${e}`;
                  }
                  return "অবৈধ ইনপুট";
                case "invalid_element":
                  return `${r.origin} এ অবৈধ মান`;
                default:
                  return "অবৈধ ইনপুট";
              }
            }),
        };
      },
      "ca",
      0,
      function () {
        let e, t, i;
        return {
          localeError:
            ((e = {
              string: { unit: "caràcters", verb: "contenir" },
              file: { unit: "bytes", verb: "contenir" },
              array: { unit: "elements", verb: "contenir" },
              set: { unit: "elements", verb: "contenir" },
              map: { unit: "elements", verb: "contenir" },
            }),
            (t = {
              regex: "entrada",
              email: "adreça electrònica",
              url: "URL",
              emoji: "emoji",
              uuid: "UUID",
              uuidv4: "UUIDv4",
              uuidv6: "UUIDv6",
              nanoid: "nanoid",
              guid: "GUID",
              cuid: "cuid",
              cuid2: "cuid2",
              ulid: "ULID",
              xid: "XID",
              ksuid: "KSUID",
              datetime: "data i hora ISO",
              date: "data ISO",
              time: "hora ISO",
              duration: "durada ISO",
              ipv4: "adreça IPv4",
              ipv6: "adreça IPv6",
              mac: "adreça MAC",
              cidrv4: "rang IPv4",
              cidrv6: "rang IPv6",
              base64: "cadena codificada en base64",
              base64url: "cadena codificada en base64url",
              json_string: "cadena JSON",
              e164: "número E.164",
              credit_card: "número de targeta de crèdit",
              jwt: "JWT",
              template_literal: "entrada",
            }),
            (i = { nan: "NaN" }),
            (r) => {
              switch (r.code) {
                case "invalid_type": {
                  let e = i[r.expected] ?? r.expected,
                    t = a.parsedType(r.input),
                    n = i[t] ?? t;
                  if (/^[A-Z]/.test(r.expected))
                    return `Tipus inv\xe0lid: s'esperava instanceof ${r.expected}, s'ha rebut ${n}`;
                  return `Tipus inv\xe0lid: s'esperava ${e}, s'ha rebut ${n}`;
                }
                case "invalid_value":
                  if (1 === r.values.length)
                    return `Valor inv\xe0lid: s'esperava ${a.stringifyPrimitive(r.values[0])}`;
                  return `Opci\xf3 inv\xe0lida: s'esperava una de ${a.joinValues(r.values, " o ")}`;
                case "too_big": {
                  let t = r.inclusive ? "com a màxim" : "menys de",
                    i = e[r.origin] ?? null;
                  if (i)
                    return `Massa gran: s'esperava que ${r.origin ?? "el valor"} contingu\xe9s ${t} ${r.maximum.toString()} ${i.unit ?? "elements"}`;
                  return `Massa gran: s'esperava que ${r.origin ?? "el valor"} fos ${t} ${r.maximum.toString()}`;
                }
                case "too_small": {
                  let t = r.inclusive ? "com a mínim" : "més de",
                    i = e[r.origin] ?? null;
                  if (i)
                    return `Massa petit: s'esperava que ${r.origin} contingu\xe9s ${t} ${r.minimum.toString()} ${i.unit}`;
                  return `Massa petit: s'esperava que ${r.origin} fos ${t} ${r.minimum.toString()}`;
                }
                case "invalid_format":
                  if ("starts_with" === r.format)
                    return `Format inv\xe0lid: ha de comen\xe7ar amb "${r.prefix}"`;
                  if ("ends_with" === r.format)
                    return `Format inv\xe0lid: ha d'acabar amb "${r.suffix}"`;
                  if ("includes" === r.format)
                    return `Format inv\xe0lid: ha d'incloure "${r.includes}"`;
                  if ("regex" === r.format)
                    return `Format inv\xe0lid: ha de coincidir amb el patr\xf3 ${r.pattern}`;
                  return `Format inv\xe0lid per a ${t[r.format] ?? r.format}`;
                case "not_multiple_of":
                  return `N\xfamero inv\xe0lid: ha de ser m\xfaltiple de ${r.divisor}`;
                case "unrecognized_keys":
                  return `Clau${r.keys.length > 1 ? "s" : ""} no reconeguda${r.keys.length > 1 ? "s" : ""}: ${a.joinValues(r.keys, ", ")}`;
                case "invalid_key":
                  return `Clau inv\xe0lida a ${r.origin}`;
                case "invalid_union":
                default:
                  return "Entrada invàlida";
                case "invalid_element":
                  return `Element inv\xe0lid a ${r.origin}`;
              }
            }),
        };
      },
      "ckb",
      0,
      function () {
        let e, t, i;
        return {
          localeError:
            ((e = {
              string: { unit: "پیت", verb: "بێت" },
              file: { unit: "بایت", verb: "بێت" },
              array: { unit: "دانە", verb: "بێت" },
              set: { unit: "دانە", verb: "بێت" },
              map: { unit: "دانە", verb: "بێت" },
            }),
            (t = {
              regex: "regex",
              email: "ئیمەیڵ",
              url: "بەستەر (URL)",
              emoji: "ئیمۆجی",
              uuid: "UUID",
              uuidv4: "UUIDv4",
              uuidv6: "UUIDv6",
              nanoid: "nanoid",
              guid: "GUID",
              cuid: "cuid",
              cuid2: "cuid2",
              ulid: "ULID",
              xid: "XID",
              ksuid: "KSUID",
              datetime: "ڕێکەوت و کات",
              date: "ڕێکەوت",
              time: "کات",
              duration: "ماوە",
              ipv4: "ناونیشانی IPv4",
              ipv6: "ناونیشانی IPv6",
              mac: "ناونیشانی MAC",
              cidrv4: "مەودای IPv4",
              cidrv6: "مەودای IPv6",
              base64: "دەقی base64",
              base64url: "دەقی base64url",
              json_string: "دەقی JSON",
              e164: "ژمارەی E.164",
              credit_card: "ژمارەی کارتی کرێدیت",
              jwt: "JWT",
              template_literal: "تێکردە",
            }),
            (i = {
              nan: "NaN",
              string: "نووسین",
              number: "ژمارە",
              boolean: "boolean",
              array: "array",
              object: "object",
              date: "ڕێکەوت",
              integer: "ژمارە",
              float: "ژمارە",
              null: "null",
              undefined: "undefined",
              function: "function",
              symbol: "symbol",
              unknown: "unknown",
              promise: "promise",
              void: "void",
              never: "never",
              map: "map",
              set: "set",
            }),
            (r) => {
              switch (r.code) {
                case "invalid_type": {
                  let e = i[r.expected] ?? r.expected,
                    t = a.parsedType(r.input),
                    n = i[t] ?? t,
                    o = ["ا", "و", "ۆ", "وو", "ە", "ی", "ێ"].some((e) =>
                      n.endsWith(e),
                    )
                      ? "یە"
                      : "ە",
                    u = /^[a-zA-Z]+$/.test(n);
                  if ("null" === t || "undefined" === t) return "داواکراوە";
                  return `چاوەڕوانکراوە ${e} بێت، بەڵام ${n}${u ? "" : o}`;
                }
                case "invalid_value":
                  if (1 === r.values.length)
                    return `بەهاکە نادرووستە: چاوەڕوانکراوە ${a.stringifyPrimitive(r.values[0])} بێت`;
                  return `هەڵبژاردەی نادروست: چاوەڕوانکراوە یەکێک بێت لە ${a.joinValues(r.values, "|")}`;
                case "too_big": {
                  let t = e[r.origin] ?? null;
                  if (t)
                    return `پێویستە بە لایەنی زۆرەوە ${r.maximum.toString()} ${t.unit} ${t.verb}`;
                  return `پێویستە بە لایەنی زۆرەوە ${r.maximum.toString()} بێت`;
                }
                case "too_small": {
                  let t = e[r.origin] ?? null;
                  if (t)
                    return `پێویستە بە لایەنی کەمەوە ${r.minimum.toString()} ${t.unit} ${t.verb}`;
                  return `پێویستە بە لایەنی کەمەوە ${r.minimum.toString()} بێت`;
                }
                case "invalid_format":
                  if ("starts_with" === r.format)
                    return `دەقی نادروست: پێویستە دەستپێبکات بە "${r.prefix}"`;
                  if ("ends_with" === r.format)
                    return `دەقی نادروست: پێویستە کۆتاییبێت بە "${r.suffix}"`;
                  if ("includes" === r.format)
                    return `دەقی نادروست: پێویستە "${r.includes}" لەخۆبگرێت`;
                  if ("regex" === r.format)
                    return `دەقی نادروست: پێویستە لەگەڵ پاتێرنی ${r.pattern} بگونجێت`;
                  return `بەهای ${t[r.format] ?? r.format} نادروستە`;
                case "not_multiple_of":
                  return `ژمارەی نادروست: دەبێت چەند هێندە بێت بۆ ${r.divisor}`;
                case "unrecognized_keys":
                  return `کلیلی نەناسراو: ${a.joinValues(r.keys, ", ")}`;
                case "invalid_key":
                  return `کلیلی نادروست لە ${r.origin}`;
                case "invalid_union":
                  if (
                    r.options &&
                    Array.isArray(r.options) &&
                    r.options.length > 0
                  ) {
                    let e = r.options.map((e) => `'${e}'`).join(" | ");
                    return `بەهای نەناسراو هەیە. بەهای چاوەڕوانکراو: ${e}`;
                  }
                  return "یەکگرتنی نادروست";
                case "invalid_element":
                  return `${r.origin} بەهاکە نادروستە`;
                default:
                  return "تێکردەی نادروست";
              }
            }),
        };
      },
      "cs",
      0,
      function () {
        let e, t, i;
        return {
          localeError:
            ((e = {
              string: { unit: "znaků", verb: "mít" },
              file: { unit: "bajtů", verb: "mít" },
              array: { unit: "prvků", verb: "mít" },
              set: { unit: "prvků", verb: "mít" },
              map: { unit: "prvků", verb: "mít" },
            }),
            (t = {
              regex: "regulární výraz",
              email: "e-mailová adresa",
              url: "URL",
              emoji: "emoji",
              uuid: "UUID",
              uuidv4: "UUIDv4",
              uuidv6: "UUIDv6",
              nanoid: "nanoid",
              guid: "GUID",
              cuid: "cuid",
              cuid2: "cuid2",
              ulid: "ULID",
              xid: "XID",
              ksuid: "KSUID",
              datetime: "datum a čas ve formátu ISO",
              date: "datum ve formátu ISO",
              time: "čas ve formátu ISO",
              duration: "doba trvání ISO",
              ipv4: "IPv4 adresa",
              ipv6: "IPv6 adresa",
              mac: "MAC adresa",
              cidrv4: "rozsah IPv4",
              cidrv6: "rozsah IPv6",
              base64: "řetězec zakódovaný ve formátu base64",
              base64url: "řetězec zakódovaný ve formátu base64url",
              json_string: "řetězec ve formátu JSON",
              e164: "číslo E.164",
              credit_card: "číslo kreditní karty",
              jwt: "JWT",
              template_literal: "vstup",
            }),
            (i = {
              nan: "NaN",
              number: "číslo",
              string: "řetězec",
              function: "funkce",
              array: "pole",
            }),
            (r) => {
              switch (r.code) {
                case "invalid_type": {
                  let e = i[r.expected] ?? r.expected,
                    t = a.parsedType(r.input),
                    n = i[t] ?? t;
                  if (/^[A-Z]/.test(r.expected))
                    return `Neplatn\xfd vstup: oček\xe1v\xe1no instanceof ${r.expected}, obdrženo ${n}`;
                  return `Neplatn\xfd vstup: oček\xe1v\xe1no ${e}, obdrženo ${n}`;
                }
                case "invalid_value":
                  if (1 === r.values.length)
                    return `Neplatn\xfd vstup: oček\xe1v\xe1no ${a.stringifyPrimitive(r.values[0])}`;
                  return `Neplatn\xe1 možnost: oček\xe1v\xe1na jedna z hodnot ${a.joinValues(r.values, "|")}`;
                case "too_big": {
                  let t = r.inclusive ? "<=" : "<",
                    i = e[r.origin] ?? null;
                  if (i)
                    return `Hodnota je př\xedliš velk\xe1: ${r.origin ?? "hodnota"} mus\xed m\xedt ${t}${r.maximum.toString()} ${i.unit ?? "prvků"}`;
                  return `Hodnota je př\xedliš velk\xe1: ${r.origin ?? "hodnota"} mus\xed b\xfdt ${t}${r.maximum.toString()}`;
                }
                case "too_small": {
                  let t = r.inclusive ? ">=" : ">",
                    i = e[r.origin] ?? null;
                  if (i)
                    return `Hodnota je př\xedliš mal\xe1: ${r.origin ?? "hodnota"} mus\xed m\xedt ${t}${r.minimum.toString()} ${i.unit ?? "prvků"}`;
                  return `Hodnota je př\xedliš mal\xe1: ${r.origin ?? "hodnota"} mus\xed b\xfdt ${t}${r.minimum.toString()}`;
                }
                case "invalid_format":
                  if ("starts_with" === r.format)
                    return `Neplatn\xfd řetězec: mus\xed zač\xednat na "${r.prefix}"`;
                  if ("ends_with" === r.format)
                    return `Neplatn\xfd řetězec: mus\xed končit na "${r.suffix}"`;
                  if ("includes" === r.format)
                    return `Neplatn\xfd řetězec: mus\xed obsahovat "${r.includes}"`;
                  if ("regex" === r.format)
                    return `Neplatn\xfd řetězec: mus\xed odpov\xeddat vzoru ${r.pattern}`;
                  return `Neplatn\xfd form\xe1t ${t[r.format] ?? r.format}`;
                case "not_multiple_of":
                  return `Neplatn\xe9 č\xedslo: mus\xed b\xfdt n\xe1sobkem ${r.divisor}`;
                case "unrecognized_keys":
                  return `Nezn\xe1m\xe9 kl\xedče: ${a.joinValues(r.keys, ", ")}`;
                case "invalid_key":
                  return `Neplatn\xfd kl\xedč v ${r.origin}`;
                case "invalid_union":
                default:
                  return "Neplatný vstup";
                case "invalid_element":
                  return `Neplatn\xe1 hodnota v ${r.origin}`;
              }
            }),
        };
      },
      "da",
      0,
      function () {
        let e, t, i;
        return {
          localeError:
            ((e = {
              string: { unit: "tegn", verb: "havde" },
              file: { unit: "bytes", verb: "havde" },
              array: { unit: "elementer", verb: "indeholdt" },
              set: { unit: "elementer", verb: "indeholdt" },
              map: { unit: "elementer", verb: "indeholdt" },
            }),
            (t = {
              regex: "input",
              email: "e-mailadresse",
              url: "URL",
              emoji: "emoji",
              uuid: "UUID",
              uuidv4: "UUIDv4",
              uuidv6: "UUIDv6",
              nanoid: "nanoid",
              guid: "GUID",
              cuid: "cuid",
              cuid2: "cuid2",
              ulid: "ULID",
              xid: "XID",
              ksuid: "KSUID",
              datetime: "ISO dato- og klokkeslæt",
              date: "ISO-dato",
              time: "ISO-klokkeslæt",
              duration: "ISO-varighed",
              ipv4: "IPv4-adresse",
              ipv6: "IPv6-adresse",
              mac: "MAC-adresse",
              cidrv4: "IPv4-spektrum",
              cidrv6: "IPv6-spektrum",
              base64: "base64-kodet streng",
              base64url: "base64url-kodet streng",
              json_string: "JSON-streng",
              e164: "E.164-nummer",
              credit_card: "kreditkortnummer",
              jwt: "JWT",
              template_literal: "input",
            }),
            (i = {
              nan: "NaN",
              string: "streng",
              number: "tal",
              boolean: "boolean",
              array: "liste",
              object: "objekt",
              set: "sæt",
              file: "fil",
            }),
            (r) => {
              switch (r.code) {
                case "invalid_type": {
                  let e = i[r.expected] ?? r.expected,
                    t = a.parsedType(r.input),
                    n = i[t] ?? t;
                  if (/^[A-Z]/.test(r.expected))
                    return `Ugyldigt input: forventede instanceof ${r.expected}, fik ${n}`;
                  return `Ugyldigt input: forventede ${e}, fik ${n}`;
                }
                case "invalid_value":
                  if (1 === r.values.length)
                    return `Ugyldig v\xe6rdi: forventede ${a.stringifyPrimitive(r.values[0])}`;
                  return `Ugyldigt valg: forventede en af f\xf8lgende ${a.joinValues(r.values, "|")}`;
                case "too_big": {
                  let t = r.inclusive ? "<=" : "<",
                    n = e[r.origin] ?? null,
                    a = i[r.origin] ?? r.origin;
                  if (n)
                    return `For stor: forventede ${a ?? "value"} ${n.verb} ${t} ${r.maximum.toString()} ${n.unit ?? "elementer"}`;
                  return `For stor: forventede ${a ?? "value"} havde ${t} ${r.maximum.toString()}`;
                }
                case "too_small": {
                  let t = r.inclusive ? ">=" : ">",
                    n = e[r.origin] ?? null,
                    a = i[r.origin] ?? r.origin;
                  if (n)
                    return `For lille: forventede ${a} ${n.verb} ${t} ${r.minimum.toString()} ${n.unit}`;
                  return `For lille: forventede ${a} havde ${t} ${r.minimum.toString()}`;
                }
                case "invalid_format":
                  if ("starts_with" === r.format)
                    return `Ugyldig streng: skal starte med "${r.prefix}"`;
                  if ("ends_with" === r.format)
                    return `Ugyldig streng: skal ende med "${r.suffix}"`;
                  if ("includes" === r.format)
                    return `Ugyldig streng: skal indeholde "${r.includes}"`;
                  if ("regex" === r.format)
                    return `Ugyldig streng: skal matche m\xf8nsteret ${r.pattern}`;
                  return `Ugyldig ${t[r.format] ?? r.format}`;
                case "not_multiple_of":
                  return `Ugyldigt tal: skal v\xe6re deleligt med ${r.divisor}`;
                case "unrecognized_keys":
                  return `${r.keys.length > 1 ? "Ukendte nøgler" : "Ukendt nøgle"}: ${a.joinValues(r.keys, ", ")}`;
                case "invalid_key":
                  return `Ugyldig n\xf8gle i ${r.origin}`;
                case "invalid_union":
                  return "Ugyldigt input: matcher ingen af de tilladte typer";
                case "invalid_element":
                  return `Ugyldig v\xe6rdi i ${r.origin}`;
                default:
                  return "Ugyldigt input";
              }
            }),
        };
      },
      "de",
      0,
      function () {
        let e, t, i;
        return {
          localeError:
            ((e = {
              string: { unit: "Zeichen", verb: "zu haben" },
              file: { unit: "Bytes", verb: "zu haben" },
              array: { unit: "Elemente", verb: "zu haben" },
              set: { unit: "Elemente", verb: "zu haben" },
              map: { unit: "Elemente", verb: "zu haben" },
            }),
            (t = {
              regex: "Eingabe",
              email: "E-Mail-Adresse",
              url: "URL",
              emoji: "Emoji",
              uuid: "UUID",
              uuidv4: "UUIDv4",
              uuidv6: "UUIDv6",
              nanoid: "nanoid",
              guid: "GUID",
              cuid: "cuid",
              cuid2: "cuid2",
              ulid: "ULID",
              xid: "XID",
              ksuid: "KSUID",
              datetime: "ISO-Datum und -Uhrzeit",
              date: "ISO-Datum",
              time: "ISO-Uhrzeit",
              duration: "ISO-Dauer",
              ipv4: "IPv4-Adresse",
              ipv6: "IPv6-Adresse",
              mac: "MAC-Adresse",
              cidrv4: "IPv4-Bereich",
              cidrv6: "IPv6-Bereich",
              base64: "Base64-codierter String",
              base64url: "Base64-URL-codierter String",
              json_string: "JSON-String",
              e164: "E.164-Nummer",
              credit_card: "Kreditkartennummer",
              jwt: "JWT",
              template_literal: "Eingabe",
            }),
            (i = { nan: "NaN", number: "Zahl", array: "Array" }),
            (r) => {
              switch (r.code) {
                case "invalid_type": {
                  let e = i[r.expected] ?? r.expected,
                    t = a.parsedType(r.input),
                    n = i[t] ?? t;
                  if (/^[A-Z]/.test(r.expected))
                    return `Ung\xfcltige Eingabe: erwartet instanceof ${r.expected}, erhalten ${n}`;
                  return `Ung\xfcltige Eingabe: erwartet ${e}, erhalten ${n}`;
                }
                case "invalid_value":
                  if (1 === r.values.length)
                    return `Ung\xfcltige Eingabe: erwartet ${a.stringifyPrimitive(r.values[0])}`;
                  return `Ung\xfcltige Option: erwartet eine von ${a.joinValues(r.values, "|")}`;
                case "too_big": {
                  let t = r.inclusive ? "<=" : "<",
                    i = e[r.origin] ?? null;
                  if (i)
                    return `Zu gro\xdf: erwartet, dass ${r.origin ?? "Wert"} ${t}${r.maximum.toString()} ${i.unit ?? "Elemente"} hat`;
                  return `Zu gro\xdf: erwartet, dass ${r.origin ?? "Wert"} ${t}${r.maximum.toString()} ist`;
                }
                case "too_small": {
                  let t = r.inclusive ? ">=" : ">",
                    i = e[r.origin] ?? null;
                  if (i)
                    return `Zu klein: erwartet, dass ${r.origin} ${t}${r.minimum.toString()} ${i.unit} hat`;
                  return `Zu klein: erwartet, dass ${r.origin} ${t}${r.minimum.toString()} ist`;
                }
                case "invalid_format":
                  if ("starts_with" === r.format)
                    return `Ung\xfcltiger String: muss mit "${r.prefix}" beginnen`;
                  if ("ends_with" === r.format)
                    return `Ung\xfcltiger String: muss mit "${r.suffix}" enden`;
                  if ("includes" === r.format)
                    return `Ung\xfcltiger String: muss "${r.includes}" enthalten`;
                  if ("regex" === r.format)
                    return `Ung\xfcltiger String: muss dem Muster ${r.pattern} entsprechen`;
                  return `Ung\xfcltig: ${t[r.format] ?? r.format}`;
                case "not_multiple_of":
                  return `Ung\xfcltige Zahl: muss ein Vielfaches von ${r.divisor} sein`;
                case "unrecognized_keys":
                  return `${r.keys.length > 1 ? "Unbekannte Schlüssel" : "Unbekannter Schlüssel"}: ${a.joinValues(r.keys, ", ")}`;
                case "invalid_key":
                  return `Ung\xfcltiger Schl\xfcssel in ${r.origin}`;
                case "invalid_union":
                default:
                  return "Ungültige Eingabe";
                case "invalid_element":
                  return `Ung\xfcltiger Wert in ${r.origin}`;
              }
            }),
        };
      },
      "el",
      0,
      function () {
        let e, t, i;
        return {
          localeError:
            ((e = {
              string: { unit: "χαρακτήρες", verb: "να έχει" },
              file: { unit: "bytes", verb: "να έχει" },
              array: { unit: "στοιχεία", verb: "να έχει" },
              set: { unit: "στοιχεία", verb: "να έχει" },
              map: { unit: "καταχωρήσεις", verb: "να έχει" },
            }),
            (t = {
              regex: "είσοδος",
              email: "διεύθυνση email",
              url: "URL",
              emoji: "emoji",
              uuid: "UUID",
              uuidv4: "UUIDv4",
              uuidv6: "UUIDv6",
              nanoid: "nanoid",
              guid: "GUID",
              cuid: "cuid",
              cuid2: "cuid2",
              ulid: "ULID",
              xid: "XID",
              ksuid: "KSUID",
              datetime: "ISO ημερομηνία και ώρα",
              date: "ISO ημερομηνία",
              time: "ISO ώρα",
              duration: "ISO διάρκεια",
              ipv4: "διεύθυνση IPv4",
              ipv6: "διεύθυνση IPv6",
              mac: "διεύθυνση MAC",
              cidrv4: "εύρος IPv4",
              cidrv6: "εύρος IPv6",
              base64: "συμβολοσειρά κωδικοποιημένη σε base64",
              base64url: "συμβολοσειρά κωδικοποιημένη σε base64url",
              json_string: "συμβολοσειρά JSON",
              e164: "αριθμός E.164",
              credit_card: "αριθμός πιστωτικής κάρτας",
              jwt: "JWT",
              template_literal: "είσοδος",
            }),
            (i = { nan: "NaN" }),
            (r) => {
              switch (r.code) {
                case "invalid_type": {
                  let e = i[r.expected] ?? r.expected,
                    t = a.parsedType(r.input),
                    n = i[t] ?? t;
                  if (
                    "string" == typeof r.expected &&
                    /^[A-Z]/.test(r.expected)
                  )
                    return `Μη έγκυρη είσοδος: αναμενόταν instanceof ${r.expected}, λήφθηκε ${n}`;
                  return `Μη έγκυρη είσοδος: αναμενόταν ${e}, λήφθηκε ${n}`;
                }
                case "invalid_value":
                  if (1 === r.values.length)
                    return `Μη έγκυρη είσοδος: αναμενόταν ${a.stringifyPrimitive(r.values[0])}`;
                  return `Μη έγκυρη επιλογή: αναμενόταν ένα από ${a.joinValues(r.values, "|")}`;
                case "too_big": {
                  let t = r.inclusive ? "<=" : "<",
                    i = e[r.origin] ?? null;
                  if (i)
                    return `Πολύ μεγάλο: αναμενόταν ${r.origin ?? "τιμή"} να έχει ${t}${r.maximum.toString()} ${i.unit ?? "στοιχεία"}`;
                  return `Πολύ μεγάλο: αναμενόταν ${r.origin ?? "τιμή"} να είναι ${t}${r.maximum.toString()}`;
                }
                case "too_small": {
                  let t = r.inclusive ? ">=" : ">",
                    i = e[r.origin] ?? null;
                  if (i)
                    return `Πολύ μικρό: αναμενόταν ${r.origin} να έχει ${t}${r.minimum.toString()} ${i.unit}`;
                  return `Πολύ μικρό: αναμενόταν ${r.origin} να είναι ${t}${r.minimum.toString()}`;
                }
                case "invalid_format":
                  if ("starts_with" === r.format)
                    return `Μη έγκυρη συμβολοσειρά: πρέπει να ξεκινά με "${r.prefix}"`;
                  if ("ends_with" === r.format)
                    return `Μη έγκυρη συμβολοσειρά: πρέπει να τελειώνει με "${r.suffix}"`;
                  if ("includes" === r.format)
                    return `Μη έγκυρη συμβολοσειρά: πρέπει να περιέχει "${r.includes}"`;
                  if ("regex" === r.format)
                    return `Μη έγκυρη συμβολοσειρά: πρέπει να ταιριάζει με το μοτίβο ${r.pattern}`;
                  return `Μη έγκυρο: ${t[r.format] ?? r.format}`;
                case "not_multiple_of":
                  return `Μη έγκυρος αριθμός: πρέπει να είναι πολλαπλάσιο του ${r.divisor}`;
                case "unrecognized_keys":
                  return `Άγνωστ${r.keys.length > 1 ? "α" : "ο"} κλειδ${r.keys.length > 1 ? "ιά" : "ί"}: ${a.joinValues(r.keys, ", ")}`;
                case "invalid_key":
                  return `Μη έγκυρο κλειδί στο ${r.origin}`;
                case "invalid_union":
                default:
                  return "Μη έγκυρη είσοδος";
                case "invalid_element":
                  return `Μη έγκυρη τιμή στο ${r.origin}`;
              }
            }),
        };
      },
      "en",
      0,
      rm,
      "eo",
      0,
      function () {
        let e, t, i;
        return {
          localeError:
            ((e = {
              string: { unit: "karaktrojn", verb: "havi" },
              file: { unit: "bajtojn", verb: "havi" },
              array: { unit: "elementojn", verb: "havi" },
              set: { unit: "elementojn", verb: "havi" },
              map: { unit: "elementojn", verb: "havi" },
            }),
            (t = {
              regex: "enigo",
              email: "retadreso",
              url: "URL",
              emoji: "emoĝio",
              uuid: "UUID",
              uuidv4: "UUIDv4",
              uuidv6: "UUIDv6",
              nanoid: "nanoid",
              guid: "GUID",
              cuid: "cuid",
              cuid2: "cuid2",
              ulid: "ULID",
              xid: "XID",
              ksuid: "KSUID",
              datetime: "ISO-datotempo",
              date: "ISO-dato",
              time: "ISO-tempo",
              duration: "ISO-daŭro",
              ipv4: "IPv4-adreso",
              ipv6: "IPv6-adreso",
              mac: "MAC-adreso",
              cidrv4: "IPv4-rango",
              cidrv6: "IPv6-rango",
              base64: "64-ume kodita karaktraro",
              base64url: "URL-64-ume kodita karaktraro",
              json_string: "JSON-karaktraro",
              e164: "E.164-nombro",
              credit_card: "kreditkarta numero",
              jwt: "JWT",
              template_literal: "enigo",
            }),
            (i = {
              nan: "NaN",
              number: "nombro",
              array: "tabelo",
              null: "senvalora",
            }),
            (r) => {
              switch (r.code) {
                case "invalid_type": {
                  let e = i[r.expected] ?? r.expected,
                    t = a.parsedType(r.input),
                    n = i[t] ?? t;
                  if (/^[A-Z]/.test(r.expected))
                    return `Nevalida enigo: atendiĝis instanceof ${r.expected}, riceviĝis ${n}`;
                  return `Nevalida enigo: atendiĝis ${e}, riceviĝis ${n}`;
                }
                case "invalid_value":
                  if (1 === r.values.length)
                    return `Nevalida enigo: atendiĝis ${a.stringifyPrimitive(r.values[0])}`;
                  return `Nevalida opcio: atendiĝis unu el ${a.joinValues(r.values, "|")}`;
                case "too_big": {
                  let t = r.inclusive ? "<=" : "<",
                    i = e[r.origin] ?? null;
                  if (i)
                    return `Tro granda: atendiĝis ke ${r.origin ?? "valoro"} havu ${t}${r.maximum.toString()} ${i.unit ?? "elementojn"}`;
                  return `Tro granda: atendiĝis ke ${r.origin ?? "valoro"} havu ${t}${r.maximum.toString()}`;
                }
                case "too_small": {
                  let t = r.inclusive ? ">=" : ">",
                    i = e[r.origin] ?? null;
                  if (i)
                    return `Tro malgranda: atendiĝis ke ${r.origin} havu ${t}${r.minimum.toString()} ${i.unit}`;
                  return `Tro malgranda: atendiĝis ke ${r.origin} estu ${t}${r.minimum.toString()}`;
                }
                case "invalid_format":
                  if ("starts_with" === r.format)
                    return `Nevalida karaktraro: devas komenciĝi per "${r.prefix}"`;
                  if ("ends_with" === r.format)
                    return `Nevalida karaktraro: devas finiĝi per "${r.suffix}"`;
                  if ("includes" === r.format)
                    return `Nevalida karaktraro: devas inkluzivi "${r.includes}"`;
                  if ("regex" === r.format)
                    return `Nevalida karaktraro: devas kongrui kun la modelo ${r.pattern}`;
                  return `Nevalida ${t[r.format] ?? r.format}`;
                case "not_multiple_of":
                  return `Nevalida nombro: devas esti oblo de ${r.divisor}`;
                case "unrecognized_keys":
                  return `Nekonata${r.keys.length > 1 ? "j" : ""} ŝlosilo${r.keys.length > 1 ? "j" : ""}: ${a.joinValues(r.keys, ", ")}`;
                case "invalid_key":
                  return `Nevalida ŝlosilo en ${r.origin}`;
                case "invalid_union":
                default:
                  return "Nevalida enigo";
                case "invalid_element":
                  return `Nevalida valoro en ${r.origin}`;
              }
            }),
        };
      },
      "es",
      0,
      function () {
        let e, t, i;
        return {
          localeError:
            ((e = {
              string: { unit: "caracteres", verb: "tener" },
              file: { unit: "bytes", verb: "tener" },
              array: { unit: "elementos", verb: "tener" },
              set: { unit: "elementos", verb: "tener" },
            }),
            (t = {
              regex: "entrada",
              email: "dirección de correo electrónico",
              url: "URL",
              emoji: "emoji",
              uuid: "UUID",
              uuidv4: "UUIDv4",
              uuidv6: "UUIDv6",
              nanoid: "nanoid",
              guid: "GUID",
              cuid: "cuid",
              cuid2: "cuid2",
              ulid: "ULID",
              xid: "XID",
              ksuid: "KSUID",
              datetime: "fecha y hora ISO",
              date: "fecha ISO",
              time: "hora ISO",
              duration: "duración ISO",
              ipv4: "dirección IPv4",
              ipv6: "dirección IPv6",
              mac: "dirección MAC",
              cidrv4: "rango IPv4",
              cidrv6: "rango IPv6",
              base64: "cadena codificada en base64",
              base64url: "URL codificada en base64",
              json_string: "cadena JSON",
              e164: "número E.164",
              credit_card: "número de tarjeta de crédito",
              jwt: "JWT",
              template_literal: "entrada",
            }),
            (i = {
              nan: "NaN",
              string: "texto",
              number: "número",
              boolean: "booleano",
              array: "arreglo",
              object: "objeto",
              set: "conjunto",
              file: "archivo",
              date: "fecha",
              bigint: "número grande",
              symbol: "símbolo",
              undefined: "indefinido",
              null: "nulo",
              function: "función",
              map: "mapa",
              record: "registro",
              tuple: "tupla",
              enum: "enumeración",
              union: "unión",
              literal: "literal",
              promise: "promesa",
              void: "vacío",
              never: "nunca",
              unknown: "desconocido",
              any: "cualquiera",
            }),
            (r) => {
              switch (r.code) {
                case "invalid_type": {
                  let e = i[r.expected] ?? r.expected,
                    t = a.parsedType(r.input),
                    n = i[t] ?? t;
                  if (/^[A-Z]/.test(r.expected))
                    return `Entrada inv\xe1lida: se esperaba instanceof ${r.expected}, recibido ${n}`;
                  return `Entrada inv\xe1lida: se esperaba ${e}, recibido ${n}`;
                }
                case "invalid_value":
                  if (1 === r.values.length)
                    return `Entrada inv\xe1lida: se esperaba ${a.stringifyPrimitive(r.values[0])}`;
                  return `Opci\xf3n inv\xe1lida: se esperaba una de ${a.joinValues(r.values, "|")}`;
                case "too_big": {
                  let t = r.inclusive ? "<=" : "<",
                    n = e[r.origin] ?? null,
                    a = i[r.origin] ?? r.origin;
                  if (n)
                    return `Demasiado grande: se esperaba que ${a ?? "valor"} tuviera ${t}${r.maximum.toString()} ${n.unit ?? "elementos"}`;
                  return `Demasiado grande: se esperaba que ${a ?? "valor"} fuera ${t}${r.maximum.toString()}`;
                }
                case "too_small": {
                  let t = r.inclusive ? ">=" : ">",
                    n = e[r.origin] ?? null,
                    a = i[r.origin] ?? r.origin;
                  if (n)
                    return `Demasiado peque\xf1o: se esperaba que ${a} tuviera ${t}${r.minimum.toString()} ${n.unit}`;
                  return `Demasiado peque\xf1o: se esperaba que ${a} fuera ${t}${r.minimum.toString()}`;
                }
                case "invalid_format":
                  if ("starts_with" === r.format)
                    return `Cadena inv\xe1lida: debe comenzar con "${r.prefix}"`;
                  if ("ends_with" === r.format)
                    return `Cadena inv\xe1lida: debe terminar en "${r.suffix}"`;
                  if ("includes" === r.format)
                    return `Cadena inv\xe1lida: debe incluir "${r.includes}"`;
                  if ("regex" === r.format)
                    return `Cadena inv\xe1lida: debe coincidir con el patr\xf3n ${r.pattern}`;
                  return `Inv\xe1lido ${t[r.format] ?? r.format}`;
                case "not_multiple_of":
                  return `N\xfamero inv\xe1lido: debe ser m\xfaltiplo de ${r.divisor}`;
                case "unrecognized_keys":
                  return `Llave${r.keys.length > 1 ? "s" : ""} desconocida${r.keys.length > 1 ? "s" : ""}: ${a.joinValues(r.keys, ", ")}`;
                case "invalid_key":
                  return `Llave inv\xe1lida en ${i[r.origin] ?? r.origin}`;
                case "invalid_union":
                default:
                  return "Entrada inválida";
                case "invalid_element":
                  return `Valor inv\xe1lido en ${i[r.origin] ?? r.origin}`;
              }
            }),
        };
      },
      "fa",
      0,
      function () {
        let e, t, i;
        return {
          localeError:
            ((e = {
              string: { unit: "کاراکتر", verb: "داشته باشد" },
              file: { unit: "بایت", verb: "داشته باشد" },
              array: { unit: "آیتم", verb: "داشته باشد" },
              set: { unit: "آیتم", verb: "داشته باشد" },
              map: { unit: "آیتم", verb: "داشته باشد" },
            }),
            (t = {
              regex: "ورودی",
              email: "آدرس ایمیل",
              url: "URL",
              emoji: "ایموجی",
              uuid: "UUID",
              uuidv4: "UUIDv4",
              uuidv6: "UUIDv6",
              nanoid: "nanoid",
              guid: "GUID",
              cuid: "cuid",
              cuid2: "cuid2",
              ulid: "ULID",
              xid: "XID",
              ksuid: "KSUID",
              datetime: "تاریخ و زمان ایزو",
              date: "تاریخ ایزو",
              time: "زمان ایزو",
              duration: "مدت زمان ایزو",
              ipv4: "IPv4 آدرس",
              ipv6: "IPv6 آدرس",
              mac: "MAC آدرس",
              cidrv4: "IPv4 دامنه",
              cidrv6: "IPv6 دامنه",
              base64: "base64-encoded رشته",
              base64url: "base64url-encoded رشته",
              json_string: "JSON رشته",
              e164: "E.164 عدد",
              credit_card: "شماره کارت اعتباری",
              jwt: "JWT",
              template_literal: "ورودی",
            }),
            (i = { nan: "NaN", number: "عدد", array: "آرایه" }),
            (r) => {
              switch (r.code) {
                case "invalid_type": {
                  let e = i[r.expected] ?? r.expected,
                    t = a.parsedType(r.input),
                    n = i[t] ?? t;
                  if (/^[A-Z]/.test(r.expected))
                    return `ورودی نامعتبر: می‌بایست instanceof ${r.expected} می‌بود، ${n} دریافت شد`;
                  return `ورودی نامعتبر: می‌بایست ${e} می‌بود، ${n} دریافت شد`;
                }
                case "invalid_value":
                  if (1 === r.values.length)
                    return `ورودی نامعتبر: می‌بایست ${a.stringifyPrimitive(r.values[0])} می‌بود`;
                  return `گزینه نامعتبر: می‌بایست یکی از ${a.joinValues(r.values, "|")} می‌بود`;
                case "too_big": {
                  let t = r.inclusive ? "<=" : "<",
                    i = e[r.origin] ?? null;
                  if (i)
                    return `خیلی بزرگ: ${r.origin ?? "مقدار"} باید ${t}${r.maximum.toString()} ${i.unit ?? "عنصر"} باشد`;
                  return `خیلی بزرگ: ${r.origin ?? "مقدار"} باید ${t}${r.maximum.toString()} باشد`;
                }
                case "too_small": {
                  let t = r.inclusive ? ">=" : ">",
                    i = e[r.origin] ?? null;
                  if (i)
                    return `خیلی کوچک: ${r.origin} باید ${t}${r.minimum.toString()} ${i.unit} باشد`;
                  return `خیلی کوچک: ${r.origin} باید ${t}${r.minimum.toString()} باشد`;
                }
                case "invalid_format":
                  if ("starts_with" === r.format)
                    return `رشته نامعتبر: باید با "${r.prefix}" شروع شود`;
                  if ("ends_with" === r.format)
                    return `رشته نامعتبر: باید با "${r.suffix}" تمام شود`;
                  if ("includes" === r.format)
                    return `رشته نامعتبر: باید شامل "${r.includes}" باشد`;
                  if ("regex" === r.format)
                    return `رشته نامعتبر: باید با الگوی ${r.pattern} مطابقت داشته باشد`;
                  return `${t[r.format] ?? r.format} نامعتبر`;
                case "not_multiple_of":
                  return `عدد نامعتبر: باید مضرب ${r.divisor} باشد`;
                case "unrecognized_keys":
                  return `کلید${r.keys.length > 1 ? "های" : ""} ناشناس: ${a.joinValues(r.keys, ", ")}`;
                case "invalid_key":
                  return `کلید ناشناس در ${r.origin}`;
                case "invalid_union":
                default:
                  return "ورودی نامعتبر";
                case "invalid_element":
                  return `مقدار نامعتبر در ${r.origin}`;
              }
            }),
        };
      },
      "fi",
      0,
      function () {
        let e, t, i;
        return {
          localeError:
            ((e = {
              string: { unit: "merkkiä", subject: "merkkijonon" },
              file: { unit: "tavua", subject: "tiedoston" },
              array: { unit: "alkiota", subject: "listan" },
              set: { unit: "alkiota", subject: "joukon" },
              map: { unit: "alkiota", subject: "kuvauksen" },
              number: { unit: "", subject: "luvun" },
              bigint: { unit: "", subject: "suuren kokonaisluvun" },
              int: { unit: "", subject: "kokonaisluvun" },
              date: { unit: "", subject: "päivämäärän" },
            }),
            (t = {
              regex: "säännöllinen lauseke",
              email: "sähköpostiosoite",
              url: "URL-osoite",
              emoji: "emoji",
              uuid: "UUID",
              uuidv4: "UUIDv4",
              uuidv6: "UUIDv6",
              nanoid: "nanoid",
              guid: "GUID",
              cuid: "cuid",
              cuid2: "cuid2",
              ulid: "ULID",
              xid: "XID",
              ksuid: "KSUID",
              datetime: "ISO-aikaleima",
              date: "ISO-päivämäärä",
              time: "ISO-aika",
              duration: "ISO-kesto",
              ipv4: "IPv4-osoite",
              ipv6: "IPv6-osoite",
              mac: "MAC-osoite",
              cidrv4: "IPv4-alue",
              cidrv6: "IPv6-alue",
              base64: "base64-koodattu merkkijono",
              base64url: "base64url-koodattu merkkijono",
              json_string: "JSON-merkkijono",
              e164: "E.164-luku",
              credit_card: "luottokortin numero",
              jwt: "JWT",
              template_literal: "templaattimerkkijono",
            }),
            (i = { nan: "NaN" }),
            (r) => {
              switch (r.code) {
                case "invalid_type": {
                  let e = i[r.expected] ?? r.expected,
                    t = a.parsedType(r.input),
                    n = i[t] ?? t;
                  if (/^[A-Z]/.test(r.expected))
                    return `Virheellinen tyyppi: odotettiin instanceof ${r.expected}, oli ${n}`;
                  return `Virheellinen tyyppi: odotettiin ${e}, oli ${n}`;
                }
                case "invalid_value":
                  if (1 === r.values.length)
                    return `Virheellinen sy\xf6te: t\xe4ytyy olla ${a.stringifyPrimitive(r.values[0])}`;
                  return `Virheellinen valinta: t\xe4ytyy olla yksi seuraavista: ${a.joinValues(r.values, "|")}`;
                case "too_big": {
                  let t = r.inclusive ? "<=" : "<",
                    i = e[r.origin] ?? null;
                  if (i)
                    return `Liian suuri: ${i.subject} t\xe4ytyy olla ${t}${r.maximum.toString()} ${i.unit}`.trim();
                  return `Liian suuri: arvon t\xe4ytyy olla ${t}${r.maximum.toString()}`;
                }
                case "too_small": {
                  let t = r.inclusive ? ">=" : ">",
                    i = e[r.origin] ?? null;
                  if (i)
                    return `Liian pieni: ${i.subject} t\xe4ytyy olla ${t}${r.minimum.toString()} ${i.unit}`.trim();
                  return `Liian pieni: arvon t\xe4ytyy olla ${t}${r.minimum.toString()}`;
                }
                case "invalid_format":
                  if ("starts_with" === r.format)
                    return `Virheellinen sy\xf6te: t\xe4ytyy alkaa "${r.prefix}"`;
                  if ("ends_with" === r.format)
                    return `Virheellinen sy\xf6te: t\xe4ytyy loppua "${r.suffix}"`;
                  if ("includes" === r.format)
                    return `Virheellinen sy\xf6te: t\xe4ytyy sis\xe4lt\xe4\xe4 "${r.includes}"`;
                  if ("regex" === r.format)
                    return `Virheellinen sy\xf6te: t\xe4ytyy vastata s\xe4\xe4nn\xf6llist\xe4 lauseketta ${r.pattern}`;
                  return `Virheellinen ${t[r.format] ?? r.format}`;
                case "not_multiple_of":
                  return `Virheellinen luku: t\xe4ytyy olla luvun ${r.divisor} monikerta`;
                case "unrecognized_keys":
                  return `${r.keys.length > 1 ? "Tuntemattomat avaimet" : "Tuntematon avain"}: ${a.joinValues(r.keys, ", ")}`;
                case "invalid_key":
                  return "Virheellinen avain tietueessa";
                case "invalid_union":
                  return "Virheellinen unioni";
                case "invalid_element":
                  return "Virheellinen arvo joukossa";
                default:
                  return "Virheellinen syöte";
              }
            }),
        };
      },
      "fr",
      0,
      function () {
        let e, t, i;
        return {
          localeError:
            ((e = {
              string: { unit: "caractères", verb: "avoir" },
              file: { unit: "octets", verb: "avoir" },
              array: { unit: "éléments", verb: "avoir" },
              set: { unit: "éléments", verb: "avoir" },
            }),
            (t = {
              regex: "expression régulière",
              email: "adresse e-mail",
              url: "URL",
              emoji: "emoji",
              uuid: "UUID",
              uuidv4: "UUIDv4",
              uuidv6: "UUIDv6",
              nanoid: "nanoid",
              guid: "GUID",
              cuid: "cuid",
              cuid2: "cuid2",
              ulid: "ULID",
              xid: "XID",
              ksuid: "KSUID",
              datetime: "date et heure ISO",
              date: "date ISO",
              time: "heure ISO",
              duration: "durée ISO",
              ipv4: "adresse IPv4",
              ipv6: "adresse IPv6",
              mac: "adresse MAC",
              cidrv4: "plage IPv4",
              cidrv6: "plage IPv6",
              base64: "chaîne de caractères encodée en base64",
              base64url: "chaîne de caractères encodée en base64url",
              json_string: "chaîne de caractères JSON",
              e164: "numéro au format E.164",
              credit_card: "numéro de carte de crédit",
              jwt: "JWT",
              template_literal: "entrée",
            }),
            (i = {
              string: "chaîne de caractères",
              number: "nombre",
              int: "entier",
              boolean: "booléen",
              bigint: "grand entier",
              symbol: "symbole",
              undefined: "indéfini",
              null: "null",
              never: "jamais",
              void: "vide",
              date: "date",
              array: "tableau",
              object: "objet",
              tuple: "tuple",
              record: "record",
              map: "map",
              set: "ensemble",
              file: "fichier",
              nonoptional: "non optionnel",
              nan: "NaN",
              function: "fonction",
            }),
            (r) => {
              switch (r.code) {
                case "invalid_type": {
                  let e = i[r.expected] ?? r.expected,
                    t = a.parsedType(r.input),
                    n = i[t] ?? t;
                  if (/^[A-Z]/.test(r.expected))
                    return `Entr\xe9e invalide : instance de ${r.expected} attendu, ${n} re\xe7u`;
                  return `Entr\xe9e invalide : ${e} attendu, ${n} re\xe7u`;
                }
                case "invalid_value":
                  if (1 === r.values.length)
                    return `Entr\xe9e invalide : ${a.stringifyPrimitive(r.values[0])} attendu`;
                  return `Option invalide : une valeur parmi ${a.joinValues(r.values, "|")} attendue`;
                case "too_big": {
                  let t = r.inclusive ? "<=" : "<",
                    n = e[r.origin] ?? null;
                  if (n)
                    return `Trop grand : ${i[r.origin] ?? "valeur"} doit ${n.verb} ${t}${r.maximum.toString()} ${n.unit ?? "élément(s)"}`;
                  return `Trop grand : ${i[r.origin] ?? "valeur"} doit \xeatre ${t}${r.maximum.toString()}`;
                }
                case "too_small": {
                  let t = r.inclusive ? ">=" : ">",
                    n = e[r.origin] ?? null;
                  if (n)
                    return `Trop petit : ${i[r.origin] ?? "valeur"} doit ${n.verb} ${t}${r.minimum.toString()} ${n.unit}`;
                  return `Trop petit : ${i[r.origin] ?? "valeur"} doit \xeatre ${t}${r.minimum.toString()}`;
                }
                case "invalid_format":
                  if ("starts_with" === r.format)
                    return `Cha\xeene de caract\xe8res invalide : doit commencer par "${r.prefix}"`;
                  if ("ends_with" === r.format)
                    return `Cha\xeene de caract\xe8res invalide : doit se terminer par "${r.suffix}"`;
                  if ("includes" === r.format)
                    return `Cha\xeene de caract\xe8res invalide : doit inclure "${r.includes}"`;
                  if ("regex" === r.format)
                    return `Cha\xeene de caract\xe8res invalide : doit correspondre au motif ${r.pattern}`;
                  return `${t[r.format] ?? r.format} invalide`;
                case "not_multiple_of":
                  return `Nombre invalide : doit \xeatre un multiple de ${r.divisor}`;
                case "unrecognized_keys":
                  return `Cl\xe9${r.keys.length > 1 ? "s" : ""} non reconnue${r.keys.length > 1 ? "s" : ""} : ${a.joinValues(r.keys, ", ")}`;
                case "invalid_key":
                  return `Cl\xe9 invalide dans ${r.origin}`;
                case "invalid_union":
                default:
                  return "Entrée invalide";
                case "invalid_element":
                  return `Valeur invalide dans ${r.origin}`;
              }
            }),
        };
      },
      "frCA",
      0,
      function () {
        let e, t, i;
        return {
          localeError:
            ((e = {
              string: { unit: "caractères", verb: "avoir" },
              file: { unit: "octets", verb: "avoir" },
              array: { unit: "éléments", verb: "avoir" },
              set: { unit: "éléments", verb: "avoir" },
              map: { unit: "éléments", verb: "avoir" },
            }),
            (t = {
              regex: "entrée",
              email: "adresse courriel",
              url: "URL",
              emoji: "emoji",
              uuid: "UUID",
              uuidv4: "UUIDv4",
              uuidv6: "UUIDv6",
              nanoid: "nanoid",
              guid: "GUID",
              cuid: "cuid",
              cuid2: "cuid2",
              ulid: "ULID",
              xid: "XID",
              ksuid: "KSUID",
              datetime: "date-heure ISO",
              date: "date ISO",
              time: "heure ISO",
              duration: "durée ISO",
              ipv4: "adresse IPv4",
              ipv6: "adresse IPv6",
              mac: "adresse MAC",
              cidrv4: "plage IPv4",
              cidrv6: "plage IPv6",
              base64: "chaîne encodée en base64",
              base64url: "chaîne encodée en base64url",
              json_string: "chaîne JSON",
              e164: "numéro E.164",
              credit_card: "numéro de carte de crédit",
              jwt: "JWT",
              template_literal: "entrée",
            }),
            (i = { nan: "NaN" }),
            (r) => {
              switch (r.code) {
                case "invalid_type": {
                  let e = i[r.expected] ?? r.expected,
                    t = a.parsedType(r.input),
                    n = i[t] ?? t;
                  if (/^[A-Z]/.test(r.expected))
                    return `Entr\xe9e invalide : attendu instanceof ${r.expected}, re\xe7u ${n}`;
                  return `Entr\xe9e invalide : attendu ${e}, re\xe7u ${n}`;
                }
                case "invalid_value":
                  if (1 === r.values.length)
                    return `Entr\xe9e invalide : attendu ${a.stringifyPrimitive(r.values[0])}`;
                  return `Option invalide : attendu l'une des valeurs suivantes ${a.joinValues(r.values, "|")}`;
                case "too_big": {
                  let t = r.inclusive ? "≤" : "<",
                    i = e[r.origin] ?? null;
                  if (i)
                    return `Trop grand : attendu que ${r.origin ?? "la valeur"} ait ${t}${r.maximum.toString()} ${i.unit}`;
                  return `Trop grand : attendu que ${r.origin ?? "la valeur"} soit ${t}${r.maximum.toString()}`;
                }
                case "too_small": {
                  let t = r.inclusive ? "≥" : ">",
                    i = e[r.origin] ?? null;
                  if (i)
                    return `Trop petit : attendu que ${r.origin} ait ${t}${r.minimum.toString()} ${i.unit}`;
                  return `Trop petit : attendu que ${r.origin} soit ${t}${r.minimum.toString()}`;
                }
                case "invalid_format":
                  if ("starts_with" === r.format)
                    return `Cha\xeene invalide : doit commencer par "${r.prefix}"`;
                  if ("ends_with" === r.format)
                    return `Cha\xeene invalide : doit se terminer par "${r.suffix}"`;
                  if ("includes" === r.format)
                    return `Cha\xeene invalide : doit inclure "${r.includes}"`;
                  if ("regex" === r.format)
                    return `Cha\xeene invalide : doit correspondre au motif ${r.pattern}`;
                  return `${t[r.format] ?? r.format} invalide`;
                case "not_multiple_of":
                  return `Nombre invalide : doit \xeatre un multiple de ${r.divisor}`;
                case "unrecognized_keys":
                  return `Cl\xe9${r.keys.length > 1 ? "s" : ""} non reconnue${r.keys.length > 1 ? "s" : ""} : ${a.joinValues(r.keys, ", ")}`;
                case "invalid_key":
                  return `Cl\xe9 invalide dans ${r.origin}`;
                case "invalid_union":
                default:
                  return "Entrée invalide";
                case "invalid_element":
                  return `Valeur invalide dans ${r.origin}`;
              }
            }),
        };
      },
      "gu",
      0,
      function () {
        let e, t, i;
        return {
          localeError:
            ((e = {
              string: { unit: "અક્ષર", verb: "હોવા જોઈએ" },
              file: { unit: "બાયટ", verb: "હોવા જોઈએ" },
              array: { unit: "આઇટમ", verb: "હોવા જોઈએ" },
              set: { unit: "આઇટમ", verb: "હોવા જોઈએ" },
              map: { unit: "એન્ટ્રી", verb: "હોવા જોઈએ" },
            }),
            (t = {
              regex: "ઇનપુટ",
              email: "ઈમેઇલ એડ્રેસ",
              url: "URL",
              emoji: "ઇમોજી",
              uuid: "UUID",
              uuidv4: "UUIDv4",
              uuidv6: "UUIDv6",
              nanoid: "nanoid",
              guid: "GUID",
              cuid: "cuid",
              cuid2: "cuid2",
              ulid: "ULID",
              xid: "XID",
              ksuid: "KSUID",
              datetime: "ISO તારીખ અને સમય",
              date: "ISO તારીખ",
              time: "ISO સમય",
              duration: "ISO અવધિ",
              ipv4: "IPv4 એડ્રેસ",
              ipv6: "IPv6 એડ્રેસ",
              mac: "MAC એડ્રેસ",
              cidrv4: "IPv4 શ્રેણી",
              cidrv6: "IPv6 શ્રેણી",
              base64: "base64-એન્કોડેડ સ્ટ્રિંગ",
              base64url: "base64url-એન્કોડેડ સ્ટ્રિંગ",
              json_string: "JSON સ્ટ્રિંગ",
              e164: "E.164 નંબર",
              credit_card: "ક્રેડિટ કાર્ડ નંબર",
              jwt: "JWT",
              template_literal: "ઇનપુટ",
            }),
            (i = { nan: "NaN" }),
            (r) => {
              switch (r.code) {
                case "invalid_type": {
                  let e = i[r.expected] ?? r.expected,
                    t = a.parsedType(r.input),
                    n = i[t] ?? t;
                  return `અમાન્ય ઇનપુટ: અપેક્ષિત ${e}, પ્રાપ્ત ${n}`;
                }
                case "invalid_value":
                  if (1 === r.values.length)
                    return `અમાન્ય ઇનપુટ: અપેક્ષિત ${a.stringifyPrimitive(r.values[0])}`;
                  return `અમાન્ય વિકલ્પ: ${a.joinValues(r.values, " | ")} માધ્યમથી એક અપેક્ષિત`;
                case "too_big": {
                  let t = r.inclusive ? "<=" : "<",
                    i = e[r.origin] ?? null;
                  if (i)
                    return `ખૂબ મોટું: ${r.origin ?? "મૂલ્ય"} ${t}${r.maximum.toString()} ${i.unit ?? "એલિમેન્ટ"} હોવા જોઈએ`;
                  return `ખૂબ મોટું: ${r.origin ?? "મૂલ્ય"} ${t}${r.maximum.toString()} હોવું જોઈએ`;
                }
                case "too_small": {
                  let t = r.inclusive ? ">=" : ">",
                    i = e[r.origin] ?? null;
                  if (i)
                    return `ખૂબ નાનું: ${r.origin} ${t}${r.minimum.toString()} ${i.unit} હોવા જોઈએ`;
                  return `ખૂબ નાનું: ${r.origin} ${t}${r.minimum.toString()} હોવું જોઈએ`;
                }
                case "invalid_format":
                  if ("starts_with" === r.format)
                    return `અમાન્ય સ્ટ્રિંગ: "${r.prefix}" થી શરૂ થવું જોઈએ`;
                  if ("ends_with" === r.format)
                    return `અમાન્ય સ્ટ્રિંગ: "${r.suffix}" પર સમાપ્ત થવું જોઈએ`;
                  if ("includes" === r.format)
                    return `અમાન્ય સ્ટ્રિંગ: "${r.includes}" શામેલ હોવું જોઈએ`;
                  if ("regex" === r.format)
                    return `અમાન્ય સ્ટ્રિંગ: પેટર્ન ${r.pattern} સાથે મેળ ખાવું જોઈએ`;
                  return `અમાન્ય ${t[r.format] ?? r.format}`;
                case "not_multiple_of":
                  return `અમાન્ય નંબર: ${r.divisor} નો ગુણાંક હોવો જોઈએ`;
                case "unrecognized_keys":
                  return `ઓળખી શકાતા નહીં તે કી${r.keys.length > 1 ? "ઓ" : ""}: ${a.joinValues(r.keys, ", ")}`;
                case "invalid_key":
                  return `${r.origin} માં અમાન્ય કી`;
                case "invalid_union":
                  if (
                    r.options &&
                    Array.isArray(r.options) &&
                    r.options.length > 0
                  ) {
                    let e = r.options.map((e) => `'${e}'`).join(" | ");
                    return `અમાન્ય ડિસ્ક્રિમિનેટર મૂલ્ય. અપેક્ષિત ${e}`;
                  }
                  return "અમાન્ય ઇનપુટ";
                case "invalid_element":
                  return `${r.origin} માં અમાન્ય મૂલ્ય`;
                default:
                  return "અમાન્ય ઇનપુટ";
              }
            }),
        };
      },
      "he",
      0,
      function () {
        let e, t, i, r, n, o, u, s, l;
        return {
          localeError:
            ((e = {
              string: { label: "מחרוזת", gender: "f" },
              number: { label: "מספר", gender: "m" },
              boolean: { label: "ערך בוליאני", gender: "m" },
              bigint: { label: "BigInt", gender: "m" },
              date: { label: "תאריך", gender: "m" },
              array: { label: "מערך", gender: "m" },
              object: { label: "אובייקט", gender: "m" },
              null: { label: "ערך ריק (null)", gender: "m" },
              undefined: { label: "ערך לא מוגדר (undefined)", gender: "m" },
              symbol: { label: "סימבול (Symbol)", gender: "m" },
              function: { label: "פונקציה", gender: "f" },
              map: { label: "מפה (Map)", gender: "f" },
              set: { label: "קבוצה (Set)", gender: "f" },
              file: { label: "קובץ", gender: "m" },
              promise: { label: "Promise", gender: "m" },
              NaN: { label: "NaN", gender: "m" },
              unknown: { label: "ערך לא ידוע", gender: "m" },
              value: { label: "ערך", gender: "m" },
            }),
            (t = {
              string: { unit: "תווים", shortLabel: "קצר", longLabel: "ארוך" },
              file: { unit: "בייטים", shortLabel: "קטן", longLabel: "גדול" },
              array: { unit: "פריטים", shortLabel: "קטן", longLabel: "גדול" },
              set: { unit: "פריטים", shortLabel: "קטן", longLabel: "גדול" },
              number: { unit: "", shortLabel: "קטן", longLabel: "גדול" },
            }),
            (i = (t) => (t ? e[t] : void 0)),
            (r = (t) => {
              let r = i(t);
              return r ? r.label : (t ?? e.unknown.label);
            }),
            (n = (e) => `ה${r(e)}`),
            (o = (e) => {
              let t = i(e);
              return "f" === (t?.gender ?? "m") ? "צריכה להיות" : "צריך להיות";
            }),
            (u = (e) => (e ? (t[e] ?? null) : null)),
            (s = {
              regex: { label: "קלט", gender: "m" },
              email: { label: "כתובת אימייל", gender: "f" },
              url: { label: "כתובת רשת", gender: "f" },
              emoji: { label: "אימוג'י", gender: "m" },
              uuid: { label: "UUID", gender: "m" },
              uuidv4: { label: "UUIDv4", gender: "m" },
              uuidv6: { label: "UUIDv6", gender: "m" },
              nanoid: { label: "nanoid", gender: "m" },
              guid: { label: "GUID", gender: "m" },
              cuid: { label: "cuid", gender: "m" },
              cuid2: { label: "cuid2", gender: "m" },
              ulid: { label: "ULID", gender: "m" },
              xid: { label: "XID", gender: "m" },
              ksuid: { label: "KSUID", gender: "m" },
              datetime: { label: "תאריך וזמן ISO", gender: "m" },
              date: { label: "תאריך ISO", gender: "m" },
              time: { label: "זמן ISO", gender: "m" },
              duration: { label: "משך זמן ISO", gender: "m" },
              ipv4: { label: "כתובת IPv4", gender: "f" },
              ipv6: { label: "כתובת IPv6", gender: "f" },
              mac: { label: "כתובת MAC", gender: "f" },
              cidrv4: { label: "טווח IPv4", gender: "m" },
              cidrv6: { label: "טווח IPv6", gender: "m" },
              base64: { label: "מחרוזת בבסיס 64", gender: "f" },
              base64url: { label: "מחרוזת בבסיס 64 לכתובות רשת", gender: "f" },
              json_string: { label: "מחרוזת JSON", gender: "f" },
              e164: { label: "מספר E.164", gender: "m" },
              credit_card: { label: "מספר כרטיס אשראי", gender: "m" },
              jwt: { label: "JWT", gender: "m" },
              template_literal: { label: "קלט", gender: "m" },
              ends_with: { label: "קלט", gender: "m" },
              includes: { label: "קלט", gender: "m" },
              lowercase: { label: "קלט", gender: "m" },
              starts_with: { label: "קלט", gender: "m" },
              uppercase: { label: "קלט", gender: "m" },
            }),
            (l = { nan: "NaN" }),
            (t) => {
              switch (t.code) {
                case "invalid_type": {
                  let i = t.expected,
                    n = l[i ?? ""] ?? r(i),
                    o = a.parsedType(t.input),
                    u = l[o] ?? e[o]?.label ?? o;
                  if (/^[A-Z]/.test(t.expected))
                    return `קלט לא תקין: צריך להיות instanceof ${t.expected}, התקבל ${u}`;
                  return `קלט לא תקין: צריך להיות ${n}, התקבל ${u}`;
                }
                case "invalid_value": {
                  if (1 === t.values.length)
                    return `ערך לא תקין: הערך חייב להיות ${a.stringifyPrimitive(t.values[0])}`;
                  let e = t.values.map((e) => a.stringifyPrimitive(e));
                  if (2 === t.values.length)
                    return `ערך לא תקין: האפשרויות המתאימות הן ${e[0]} או ${e[1]}`;
                  let i = e[e.length - 1],
                    r = e.slice(0, -1).join(", ");
                  return `ערך לא תקין: האפשרויות המתאימות הן ${r} או ${i}`;
                }
                case "too_big": {
                  let e = u(t.origin),
                    i = n(t.origin ?? "value");
                  if ("string" === t.origin)
                    return `${e?.longLabel ?? "ארוך"} מדי: ${i} צריכה להכיל ${t.maximum.toString()} ${e?.unit ?? ""} ${t.inclusive ? "או פחות" : "לכל היותר"}`.trim();
                  if ("number" === t.origin) {
                    let e = t.inclusive
                      ? `קטן או שווה ל-${t.maximum}`
                      : `קטן מ-${t.maximum}`;
                    return `גדול מדי: ${i} צריך להיות ${e}`;
                  }
                  if ("array" === t.origin || "set" === t.origin) {
                    let r = "set" === t.origin ? "צריכה" : "צריך",
                      n = t.inclusive
                        ? `${t.maximum} ${e?.unit ?? ""} או פחות`
                        : `פחות מ-${t.maximum} ${e?.unit ?? ""}`;
                    return `גדול מדי: ${i} ${r} להכיל ${n}`.trim();
                  }
                  let r = t.inclusive ? "<=" : "<",
                    a = o(t.origin ?? "value");
                  if (e?.unit)
                    return `${e.longLabel} מדי: ${i} ${a} ${r}${t.maximum.toString()} ${e.unit}`;
                  return `${e?.longLabel ?? "גדול"} מדי: ${i} ${a} ${r}${t.maximum.toString()}`;
                }
                case "too_small": {
                  let e = u(t.origin),
                    i = n(t.origin ?? "value");
                  if ("string" === t.origin)
                    return `${e?.shortLabel ?? "קצר"} מדי: ${i} צריכה להכיל ${t.minimum.toString()} ${e?.unit ?? ""} ${t.inclusive ? "או יותר" : "לפחות"}`.trim();
                  if ("number" === t.origin) {
                    let e = t.inclusive
                      ? `גדול או שווה ל-${t.minimum}`
                      : `גדול מ-${t.minimum}`;
                    return `קטן מדי: ${i} צריך להיות ${e}`;
                  }
                  if ("array" === t.origin || "set" === t.origin) {
                    let r = "set" === t.origin ? "צריכה" : "צריך";
                    if (1 === t.minimum && t.inclusive) {
                      let e = (t.origin, "לפחות פריט אחד");
                      return `קטן מדי: ${i} ${r} להכיל ${e}`;
                    }
                    let n = t.inclusive
                      ? `${t.minimum} ${e?.unit ?? ""} או יותר`
                      : `יותר מ-${t.minimum} ${e?.unit ?? ""}`;
                    return `קטן מדי: ${i} ${r} להכיל ${n}`.trim();
                  }
                  let r = t.inclusive ? ">=" : ">",
                    a = o(t.origin ?? "value");
                  if (e?.unit)
                    return `${e.shortLabel} מדי: ${i} ${a} ${r}${t.minimum.toString()} ${e.unit}`;
                  return `${e?.shortLabel ?? "קטן"} מדי: ${i} ${a} ${r}${t.minimum.toString()}`;
                }
                case "invalid_format": {
                  if ("starts_with" === t.format)
                    return `המחרוזת חייבת להתחיל ב "${t.prefix}"`;
                  if ("ends_with" === t.format)
                    return `המחרוזת חייבת להסתיים ב "${t.suffix}"`;
                  if ("includes" === t.format)
                    return `המחרוזת חייבת לכלול "${t.includes}"`;
                  if ("regex" === t.format)
                    return `המחרוזת חייבת להתאים לתבנית ${t.pattern}`;
                  let e = s[t.format],
                    i = e?.label ?? t.format,
                    r = e?.gender ?? "m";
                  return `${i} לא ${"f" === r ? "תקינה" : "תקין"}`;
                }
                case "not_multiple_of":
                  return `מספר לא תקין: חייב להיות מכפלה של ${t.divisor}`;
                case "unrecognized_keys":
                  return `מפתח${t.keys.length > 1 ? "ות" : ""} לא מזוה${t.keys.length > 1 ? "ים" : "ה"}: ${a.joinValues(t.keys, ", ")}`;
                case "invalid_key":
                  return "שדה לא תקין באובייקט";
                case "invalid_union":
                default:
                  return "קלט לא תקין";
                case "invalid_element": {
                  let e = n(t.origin ?? "array");
                  return `ערך לא תקין ב${e}`;
                }
              }
            }),
        };
      },
      "hi",
      0,
      function () {
        let e, t, i;
        return {
          localeError:
            ((e = {
              string: { unit: "अक्षर", verb: "रखने के लिए" },
              file: { unit: "बाइट्स", verb: "रखने के लिए" },
              array: { unit: "तत्व", verb: "रखने के लिए" },
              set: { unit: "तत्व", verb: "रखने के लिए" },
              map: { unit: "प्रविष्टियाँ", verb: "रखने के लिए" },
            }),
            (t = {
              regex: "इनपुट",
              email: "ईमेल पता",
              url: "URL",
              emoji: "इमोजी",
              uuid: "UUID",
              uuidv4: "UUIDv4",
              uuidv6: "UUIDv6",
              nanoid: "nanoid",
              guid: "GUID",
              cuid: "cuid",
              cuid2: "cuid2",
              ulid: "ULID",
              xid: "XID",
              ksuid: "KSUID",
              datetime: "ISO तिथि और समय",
              date: "ISO तिथि",
              time: "ISO समय",
              duration: "ISO अवधि",
              ipv4: "IPv4 पता",
              ipv6: "IPv6 पता",
              mac: "MAC पता",
              cidrv4: "IPv4 श्रेणी",
              cidrv6: "IPv6 श्रेणी",
              base64: "Base64-एन्कोडेड स्ट्रिंग",
              base64url: "Base64URL-एन्कोडेड स्ट्रिंग",
              json_string: "JSON स्ट्रिंग",
              e164: "E.164 संख्या",
              credit_card: "क्रेडिट कार्ड संख्या",
              jwt: "JWT",
              template_literal: "इनपुट",
            }),
            (i = { nan: "NaN" }),
            (r) => {
              switch (r.code) {
                case "invalid_type": {
                  let e = i[r.expected] ?? r.expected,
                    t = a.parsedType(r.input),
                    n = i[t] ?? t;
                  return `अमान्य इनपुट: अपेक्षित ${e}, प्राप्त ${n}`;
                }
                case "invalid_value":
                  if (1 === r.values.length)
                    return `अमान्य इनपुट: अपेक्षित ${a.stringifyPrimitive(r.values[0])}`;
                  return `अमान्य विकल्प: अपेक्षित मानों में से एक ${a.joinValues(r.values, "|")}`;
                case "too_big": {
                  let t = r.inclusive ? "<=" : "<",
                    i = e[r.origin] ?? null;
                  if (i)
                    return `बहुत बड़ा: अपेक्षित था कि ${r.origin ?? "मान"} में ${t}${r.maximum} ${i.unit} हों`;
                  return `बहुत बड़ा: अपेक्षित था कि ${r.origin ?? "मान"} ${t}${r.maximum} हो`;
                }
                case "too_small": {
                  let t = r.inclusive ? ">=" : ">",
                    i = e[r.origin] ?? null;
                  if (i)
                    return `बहुत छोटा: अपेक्षित था कि ${r.origin} में ${t}${r.minimum} ${i.unit} हों`;
                  return `बहुत छोटा: अपेक्षित था कि ${r.origin} ${t}${r.minimum} हो`;
                }
                case "invalid_format":
                  if ("starts_with" === r.format)
                    return `अमान्य स्ट्रिंग: "${r.prefix}" से शुरू होना चाहिए`;
                  if ("ends_with" === r.format)
                    return `अमान्य स्ट्रिंग: "${r.suffix}" पर समाप्त होना चाहिए`;
                  if ("includes" === r.format)
                    return `अमान्य स्ट्रिंग: इसमें "${r.includes}" शामिल होना चाहिए`;
                  if ("regex" === r.format)
                    return `अमान्य स्ट्रिंग: पैटर्न ${r.pattern} से मेल खाना चाहिए`;
                  return `अमान्य ${t[r.format] ?? r.format}`;
                case "not_multiple_of":
                  return `अमान्य संख्या: यह ${r.divisor} का गुणज होना चाहिए`;
                case "unrecognized_keys":
                  return `अपरिचित कुंजी${r.keys.length > 1 ? "याँ" : ""}: ${a.joinValues(r.keys, ", ")}`;
                case "invalid_key":
                  return `अमान्य कुंजी: ${r.origin} में`;
                case "invalid_union":
                  if (
                    r.options &&
                    Array.isArray(r.options) &&
                    r.options.length > 0
                  ) {
                    let e = r.options.map((e) => `'${e}'`).join(" | ");
                    return `अमान्य डिस्क्रिमिनेटर मान: अपेक्षित ${e}`;
                  }
                  return "अमान्य इनपुट";
                case "invalid_element":
                  return `अमान्य मान: ${r.origin} में`;
                default:
                  return "अमान्य इनपुट";
              }
            }),
        };
      },
      "hr",
      0,
      function () {
        let e, t, i;
        return {
          localeError:
            ((e = {
              string: { unit: "znakova", verb: "imati" },
              file: { unit: "bajtova", verb: "imati" },
              array: { unit: "stavki", verb: "imati" },
              set: { unit: "stavki", verb: "imati" },
            }),
            (t = {
              regex: "unos",
              email: "email adresa",
              url: "URL",
              emoji: "emoji",
              uuid: "UUID",
              uuidv4: "UUIDv4",
              uuidv6: "UUIDv6",
              nanoid: "nanoid",
              guid: "GUID",
              cuid: "cuid",
              cuid2: "cuid2",
              ulid: "ULID",
              xid: "XID",
              ksuid: "KSUID",
              datetime: "ISO datum i vrijeme",
              date: "ISO datum",
              time: "ISO vrijeme",
              duration: "ISO trajanje",
              ipv4: "IPv4 adresa",
              ipv6: "IPv6 adresa",
              mac: "MAC adresa",
              cidrv4: "IPv4 raspon",
              cidrv6: "IPv6 raspon",
              base64: "base64 kodirani tekst",
              base64url: "base64url kodirani tekst",
              json_string: "JSON tekst",
              e164: "E.164 broj",
              credit_card: "broj kreditne kartice",
              jwt: "JWT",
              template_literal: "unos",
            }),
            (i = {
              nan: "NaN",
              string: "tekst",
              number: "broj",
              boolean: "boolean",
              array: "niz",
              object: "objekt",
              set: "skup",
              file: "datoteka",
              date: "datum",
              bigint: "bigint",
              symbol: "simbol",
              undefined: "undefined",
              null: "null",
              function: "funkcija",
              map: "mapa",
            }),
            (r) => {
              switch (r.code) {
                case "invalid_type": {
                  let e = i[r.expected] ?? r.expected,
                    t = a.parsedType(r.input),
                    n = i[t] ?? t;
                  if (/^[A-Z]/.test(r.expected))
                    return `Neispravan unos: očekuje se instanceof ${r.expected}, a primljeno je ${n}`;
                  return `Neispravan unos: očekuje se ${e}, a primljeno je ${n}`;
                }
                case "invalid_value":
                  if (1 === r.values.length)
                    return `Neispravna vrijednost: očekivano ${a.stringifyPrimitive(r.values[0])}`;
                  return `Neispravna opcija: očekivano jedno od ${a.joinValues(r.values, "|")}`;
                case "too_big": {
                  let t = r.inclusive ? "<=" : "<",
                    n = e[r.origin] ?? null,
                    a = i[r.origin] ?? r.origin;
                  if (n)
                    return `Preveliko: očekivano da ${a ?? "vrijednost"} ima ${t}${r.maximum.toString()} ${n.unit ?? "elemenata"}`;
                  return `Preveliko: očekivano da ${a ?? "vrijednost"} bude ${t}${r.maximum.toString()}`;
                }
                case "too_small": {
                  let t = r.inclusive ? ">=" : ">",
                    n = e[r.origin] ?? null,
                    a = i[r.origin] ?? r.origin;
                  if (n)
                    return `Premalo: očekivano da ${a} ima ${t}${r.minimum.toString()} ${n.unit}`;
                  return `Premalo: očekivano da ${a} bude ${t}${r.minimum.toString()}`;
                }
                case "invalid_format":
                  if ("starts_with" === r.format)
                    return `Neispravan tekst: mora započinjati s "${r.prefix}"`;
                  if ("ends_with" === r.format)
                    return `Neispravan tekst: mora završavati s "${r.suffix}"`;
                  if ("includes" === r.format)
                    return `Neispravan tekst: mora sadržavati "${r.includes}"`;
                  if ("regex" === r.format)
                    return `Neispravan tekst: mora odgovarati uzorku ${r.pattern}`;
                  return `Neispravna ${t[r.format] ?? r.format}`;
                case "not_multiple_of":
                  return `Neispravan broj: mora biti višekratnik od ${r.divisor}`;
                case "unrecognized_keys":
                  return `Neprepoznat${r.keys.length > 1 ? "i ključevi" : " ključ"}: ${a.joinValues(r.keys, ", ")}`;
                case "invalid_key":
                  return `Neispravan ključ u ${i[r.origin] ?? r.origin}`;
                case "invalid_union":
                default:
                  return "Neispravan unos";
                case "invalid_element":
                  return `Neispravna vrijednost u ${i[r.origin] ?? r.origin}`;
              }
            }),
        };
      },
      "hu",
      0,
      function () {
        let e, t, i;
        return {
          localeError:
            ((e = {
              string: { unit: "karakter", verb: "legyen" },
              file: { unit: "byte", verb: "legyen" },
              array: { unit: "elem", verb: "legyen" },
              set: { unit: "elem", verb: "legyen" },
              map: { unit: "elem", verb: "legyen" },
            }),
            (t = {
              regex: "bemenet",
              email: "email cím",
              url: "URL",
              emoji: "emoji",
              uuid: "UUID",
              uuidv4: "UUIDv4",
              uuidv6: "UUIDv6",
              nanoid: "nanoid",
              guid: "GUID",
              cuid: "cuid",
              cuid2: "cuid2",
              ulid: "ULID",
              xid: "XID",
              ksuid: "KSUID",
              datetime: "ISO időbélyeg",
              date: "ISO dátum",
              time: "ISO idő",
              duration: "ISO időintervallum",
              ipv4: "IPv4 cím",
              ipv6: "IPv6 cím",
              mac: "MAC cím",
              cidrv4: "IPv4 tartomány",
              cidrv6: "IPv6 tartomány",
              base64: "base64-kódolt string",
              base64url: "base64url-kódolt string",
              json_string: "JSON string",
              e164: "E.164 szám",
              credit_card: "hitelkártyaszám",
              jwt: "JWT",
              template_literal: "bemenet",
            }),
            (i = { nan: "NaN", number: "szám", array: "tömb" }),
            (r) => {
              switch (r.code) {
                case "invalid_type": {
                  let e = i[r.expected] ?? r.expected,
                    t = a.parsedType(r.input),
                    n = i[t] ?? t;
                  if (/^[A-Z]/.test(r.expected))
                    return `\xc9rv\xe9nytelen bemenet: a v\xe1rt \xe9rt\xe9k instanceof ${r.expected}, a kapott \xe9rt\xe9k ${n}`;
                  return `\xc9rv\xe9nytelen bemenet: a v\xe1rt \xe9rt\xe9k ${e}, a kapott \xe9rt\xe9k ${n}`;
                }
                case "invalid_value":
                  if (1 === r.values.length)
                    return `\xc9rv\xe9nytelen bemenet: a v\xe1rt \xe9rt\xe9k ${a.stringifyPrimitive(r.values[0])}`;
                  return `\xc9rv\xe9nytelen opci\xf3: valamelyik \xe9rt\xe9k v\xe1rt ${a.joinValues(r.values, "|")}`;
                case "too_big": {
                  let t = r.inclusive ? "<=" : "<",
                    i = e[r.origin] ?? null;
                  if (i)
                    return `T\xfal nagy: ${r.origin ?? "érték"} m\xe9rete t\xfal nagy ${t}${r.maximum.toString()} ${i.unit ?? "elem"}`;
                  return `T\xfal nagy: a bemeneti \xe9rt\xe9k ${r.origin ?? "érték"} t\xfal nagy: ${t}${r.maximum.toString()}`;
                }
                case "too_small": {
                  let t = r.inclusive ? ">=" : ">",
                    i = e[r.origin] ?? null;
                  if (i)
                    return `T\xfal kicsi: a bemeneti \xe9rt\xe9k ${r.origin} m\xe9rete t\xfal kicsi ${t}${r.minimum.toString()} ${i.unit}`;
                  return `T\xfal kicsi: a bemeneti \xe9rt\xe9k ${r.origin} t\xfal kicsi ${t}${r.minimum.toString()}`;
                }
                case "invalid_format":
                  if ("starts_with" === r.format)
                    return `\xc9rv\xe9nytelen string: "${r.prefix}" \xe9rt\xe9kkel kell kezdődnie`;
                  if ("ends_with" === r.format)
                    return `\xc9rv\xe9nytelen string: "${r.suffix}" \xe9rt\xe9kkel kell v\xe9gződnie`;
                  if ("includes" === r.format)
                    return `\xc9rv\xe9nytelen string: "${r.includes}" \xe9rt\xe9ket kell tartalmaznia`;
                  if ("regex" === r.format)
                    return `\xc9rv\xe9nytelen string: ${r.pattern} mint\xe1nak kell megfelelnie`;
                  return `\xc9rv\xe9nytelen ${t[r.format] ?? r.format}`;
                case "not_multiple_of":
                  return `\xc9rv\xe9nytelen sz\xe1m: ${r.divisor} t\xf6bbsz\xf6r\xf6s\xe9nek kell lennie`;
                case "unrecognized_keys":
                  return `Ismeretlen kulcs${r.keys.length > 1 ? "s" : ""}: ${a.joinValues(r.keys, ", ")}`;
                case "invalid_key":
                  return `\xc9rv\xe9nytelen kulcs ${r.origin}`;
                case "invalid_union":
                default:
                  return "Érvénytelen bemenet";
                case "invalid_element":
                  return `\xc9rv\xe9nytelen \xe9rt\xe9k: ${r.origin}`;
              }
            }),
        };
      },
      "hy",
      0,
      function () {
        let e, t, i;
        return {
          localeError:
            ((e = {
              string: {
                unit: { one: "նշան", many: "նշաններ" },
                verb: "ունենալ",
              },
              file: { unit: { one: "բայթ", many: "բայթեր" }, verb: "ունենալ" },
              array: { unit: { one: "տարր", many: "տարրեր" }, verb: "ունենալ" },
              set: { unit: { one: "տարր", many: "տարրեր" }, verb: "ունենալ" },
              map: { unit: { one: "տարր", many: "տարրեր" }, verb: "ունենալ" },
            }),
            (t = {
              regex: "մուտք",
              email: "էլ. հասցե",
              url: "URL",
              emoji: "էմոջի",
              uuid: "UUID",
              uuidv4: "UUIDv4",
              uuidv6: "UUIDv6",
              nanoid: "nanoid",
              guid: "GUID",
              cuid: "cuid",
              cuid2: "cuid2",
              ulid: "ULID",
              xid: "XID",
              ksuid: "KSUID",
              datetime: "ISO ամսաթիվ և ժամ",
              date: "ISO ամսաթիվ",
              time: "ISO ժամ",
              duration: "ISO տևողություն",
              ipv4: "IPv4 հասցե",
              ipv6: "IPv6 հասցե",
              mac: "MAC հասցե",
              cidrv4: "IPv4 միջակայք",
              cidrv6: "IPv6 միջակայք",
              base64: "base64 ձևաչափով տող",
              base64url: "base64url ձևաչափով տող",
              json_string: "JSON տող",
              e164: "E.164 համար",
              credit_card: "կրեդիտ քարտի համար",
              jwt: "JWT",
              template_literal: "մուտք",
            }),
            (i = { nan: "NaN", number: "թիվ", array: "զանգված" }),
            (r) => {
              switch (r.code) {
                case "invalid_type": {
                  let e = i[r.expected] ?? r.expected,
                    t = a.parsedType(r.input),
                    n = i[t] ?? t;
                  if (/^[A-Z]/.test(r.expected))
                    return `Սխալ մուտքագրում․ սպասվում էր instanceof ${r.expected}, ստացվել է ${n}`;
                  return `Սխալ մուտքագրում․ սպասվում էր ${e}, ստացվել է ${n}`;
                }
                case "invalid_value":
                  if (1 === r.values.length)
                    return `Սխալ մուտքագրում․ սպասվում էր ${a.stringifyPrimitive(r.values[1])}`;
                  return `Սխալ տարբերակ․ սպասվում էր հետևյալներից մեկը՝ ${a.joinValues(r.values, "|")}`;
                case "too_big": {
                  let t = r.inclusive ? "<=" : "<",
                    i = e[r.origin] ?? null;
                  if (i) {
                    let e = rf(Number(r.maximum), i.unit.one, i.unit.many);
                    return `Չափազանց մեծ արժեք․ սպասվում է, որ ${rp(r.origin ?? "արժեք")} կունենա ${t}${r.maximum.toString()} ${e}`;
                  }
                  return `Չափազանց մեծ արժեք․ սպասվում է, որ ${rp(r.origin ?? "արժեք")} լինի ${t}${r.maximum.toString()}`;
                }
                case "too_small": {
                  let t = r.inclusive ? ">=" : ">",
                    i = e[r.origin] ?? null;
                  if (i) {
                    let e = rf(Number(r.minimum), i.unit.one, i.unit.many);
                    return `Չափազանց փոքր արժեք․ սպասվում է, որ ${rp(r.origin)} կունենա ${t}${r.minimum.toString()} ${e}`;
                  }
                  return `Չափազանց փոքր արժեք․ սպասվում է, որ ${rp(r.origin)} լինի ${t}${r.minimum.toString()}`;
                }
                case "invalid_format":
                  if ("starts_with" === r.format)
                    return `Սխալ տող․ պետք է սկսվի "${r.prefix}"-ով`;
                  if ("ends_with" === r.format)
                    return `Սխալ տող․ պետք է ավարտվի "${r.suffix}"-ով`;
                  if ("includes" === r.format)
                    return `Սխալ տող․ պետք է պարունակի "${r.includes}"`;
                  if ("regex" === r.format)
                    return `Սխալ տող․ պետք է համապատասխանի ${r.pattern} ձևաչափին`;
                  return `Սխալ ${t[r.format] ?? r.format}`;
                case "not_multiple_of":
                  return `Սխալ թիվ․ պետք է բազմապատիկ լինի ${r.divisor}-ի`;
                case "unrecognized_keys":
                  return `Չճանաչված բանալի${r.keys.length > 1 ? "ներ" : ""}. ${a.joinValues(r.keys, ", ")}`;
                case "invalid_key":
                  return `Սխալ բանալի ${rp(r.origin)}-ում`;
                case "invalid_union":
                default:
                  return "Սխալ մուտքագրում";
                case "invalid_element":
                  return `Սխալ արժեք ${rp(r.origin)}-ում`;
              }
            }),
        };
      },
      "id",
      0,
      function () {
        let e, t, i;
        return {
          localeError:
            ((e = {
              string: { unit: "karakter", verb: "memiliki" },
              file: { unit: "byte", verb: "memiliki" },
              array: { unit: "item", verb: "memiliki" },
              set: { unit: "item", verb: "memiliki" },
              map: { unit: "item", verb: "memiliki" },
            }),
            (t = {
              regex: "input",
              email: "alamat email",
              url: "URL",
              emoji: "emoji",
              uuid: "UUID",
              uuidv4: "UUIDv4",
              uuidv6: "UUIDv6",
              nanoid: "nanoid",
              guid: "GUID",
              cuid: "cuid",
              cuid2: "cuid2",
              ulid: "ULID",
              xid: "XID",
              ksuid: "KSUID",
              datetime: "tanggal dan waktu format ISO",
              date: "tanggal format ISO",
              time: "jam format ISO",
              duration: "durasi format ISO",
              ipv4: "alamat IPv4",
              ipv6: "alamat IPv6",
              mac: "alamat MAC",
              cidrv4: "rentang alamat IPv4",
              cidrv6: "rentang alamat IPv6",
              base64: "string dengan enkode base64",
              base64url: "string dengan enkode base64url",
              json_string: "string JSON",
              e164: "angka E.164",
              credit_card: "nomor kartu kredit",
              jwt: "JWT",
              template_literal: "input",
            }),
            (i = { nan: "NaN" }),
            (r) => {
              switch (r.code) {
                case "invalid_type": {
                  let e = i[r.expected] ?? r.expected,
                    t = a.parsedType(r.input),
                    n = i[t] ?? t;
                  if (/^[A-Z]/.test(r.expected))
                    return `Input tidak valid: diharapkan instanceof ${r.expected}, diterima ${n}`;
                  return `Input tidak valid: diharapkan ${e}, diterima ${n}`;
                }
                case "invalid_value":
                  if (1 === r.values.length)
                    return `Input tidak valid: diharapkan ${a.stringifyPrimitive(r.values[0])}`;
                  return `Pilihan tidak valid: diharapkan salah satu dari ${a.joinValues(r.values, "|")}`;
                case "too_big": {
                  let t = r.inclusive ? "<=" : "<",
                    i = e[r.origin] ?? null;
                  if (i)
                    return `Terlalu besar: diharapkan ${r.origin ?? "value"} memiliki ${t}${r.maximum.toString()} ${i.unit ?? "elemen"}`;
                  return `Terlalu besar: diharapkan ${r.origin ?? "value"} menjadi ${t}${r.maximum.toString()}`;
                }
                case "too_small": {
                  let t = r.inclusive ? ">=" : ">",
                    i = e[r.origin] ?? null;
                  if (i)
                    return `Terlalu kecil: diharapkan ${r.origin} memiliki ${t}${r.minimum.toString()} ${i.unit}`;
                  return `Terlalu kecil: diharapkan ${r.origin} menjadi ${t}${r.minimum.toString()}`;
                }
                case "invalid_format":
                  if ("starts_with" === r.format)
                    return `String tidak valid: harus dimulai dengan "${r.prefix}"`;
                  if ("ends_with" === r.format)
                    return `String tidak valid: harus berakhir dengan "${r.suffix}"`;
                  if ("includes" === r.format)
                    return `String tidak valid: harus menyertakan "${r.includes}"`;
                  if ("regex" === r.format)
                    return `String tidak valid: harus sesuai pola ${r.pattern}`;
                  return `${t[r.format] ?? r.format} tidak valid`;
                case "not_multiple_of":
                  return `Angka tidak valid: harus kelipatan dari ${r.divisor}`;
                case "unrecognized_keys":
                  return `Kunci tidak dikenali ${r.keys.length > 1 ? "s" : ""}: ${a.joinValues(r.keys, ", ")}`;
                case "invalid_key":
                  return `Kunci tidak valid di ${r.origin}`;
                case "invalid_union":
                default:
                  return "Input tidak valid";
                case "invalid_element":
                  return `Nilai tidak valid di ${r.origin}`;
              }
            }),
        };
      },
      "is",
      0,
      function () {
        let e, t, i;
        return {
          localeError:
            ((e = {
              string: { unit: "stafi", verb: "að hafa" },
              file: { unit: "bæti", verb: "að hafa" },
              array: { unit: "hluti", verb: "að hafa" },
              set: { unit: "hluti", verb: "að hafa" },
              map: { unit: "hluti", verb: "að hafa" },
            }),
            (t = {
              regex: "gildi",
              email: "netfang",
              url: "vefslóð",
              emoji: "emoji",
              uuid: "UUID",
              uuidv4: "UUIDv4",
              uuidv6: "UUIDv6",
              nanoid: "nanoid",
              guid: "GUID",
              cuid: "cuid",
              cuid2: "cuid2",
              ulid: "ULID",
              xid: "XID",
              ksuid: "KSUID",
              datetime: "ISO dagsetning og tími",
              date: "ISO dagsetning",
              time: "ISO tími",
              duration: "ISO tímalengd",
              ipv4: "IPv4 address",
              ipv6: "IPv6 address",
              mac: "MAC address",
              cidrv4: "IPv4 range",
              cidrv6: "IPv6 range",
              base64: "base64-encoded strengur",
              base64url: "base64url-encoded strengur",
              json_string: "JSON strengur",
              e164: "E.164 tölugildi",
              credit_card: "kreditkortanúmer",
              jwt: "JWT",
              template_literal: "gildi",
            }),
            (i = { nan: "NaN", number: "númer", array: "fylki" }),
            (r) => {
              switch (r.code) {
                case "invalid_type": {
                  let e = i[r.expected] ?? r.expected,
                    t = a.parsedType(r.input),
                    n = i[t] ?? t;
                  if (/^[A-Z]/.test(r.expected))
                    return `Rangt gildi: \xde\xfa sl\xf3st inn ${n} \xfear sem \xe1 a\xf0 vera instanceof ${r.expected}`;
                  return `Rangt gildi: \xde\xfa sl\xf3st inn ${n} \xfear sem \xe1 a\xf0 vera ${e}`;
                }
                case "invalid_value":
                  if (1 === r.values.length)
                    return `Rangt gildi: gert r\xe1\xf0 fyrir ${a.stringifyPrimitive(r.values[0])}`;
                  return `\xd3gilt val: m\xe1 vera eitt af eftirfarandi ${a.joinValues(r.values, "|")}`;
                case "too_big": {
                  let t = r.inclusive ? "<=" : "<",
                    i = e[r.origin] ?? null;
                  if (i)
                    return `Of st\xf3rt: gert er r\xe1\xf0 fyrir a\xf0 ${r.origin ?? "gildi"} hafi ${t}${r.maximum.toString()} ${i.unit ?? "hluti"}`;
                  return `Of st\xf3rt: gert er r\xe1\xf0 fyrir a\xf0 ${r.origin ?? "gildi"} s\xe9 ${t}${r.maximum.toString()}`;
                }
                case "too_small": {
                  let t = r.inclusive ? ">=" : ">",
                    i = e[r.origin] ?? null;
                  if (i)
                    return `Of l\xedti\xf0: gert er r\xe1\xf0 fyrir a\xf0 ${r.origin} hafi ${t}${r.minimum.toString()} ${i.unit}`;
                  return `Of l\xedti\xf0: gert er r\xe1\xf0 fyrir a\xf0 ${r.origin} s\xe9 ${t}${r.minimum.toString()}`;
                }
                case "invalid_format":
                  if ("starts_with" === r.format)
                    return `\xd3gildur strengur: ver\xf0ur a\xf0 byrja \xe1 "${r.prefix}"`;
                  if ("ends_with" === r.format)
                    return `\xd3gildur strengur: ver\xf0ur a\xf0 enda \xe1 "${r.suffix}"`;
                  if ("includes" === r.format)
                    return `\xd3gildur strengur: ver\xf0ur a\xf0 innihalda "${r.includes}"`;
                  if ("regex" === r.format)
                    return `\xd3gildur strengur: ver\xf0ur a\xf0 fylgja mynstri ${r.pattern}`;
                  return `Rangt ${t[r.format] ?? r.format}`;
                case "not_multiple_of":
                  return `R\xf6ng tala: ver\xf0ur a\xf0 vera margfeldi af ${r.divisor}`;
                case "unrecognized_keys":
                  return `\xd3\xfeekkt ${r.keys.length > 1 ? "ir lyklar" : "ur lykill"}: ${a.joinValues(r.keys, ", ")}`;
                case "invalid_key":
                  return `Rangur lykill \xed ${r.origin}`;
                case "invalid_union":
                default:
                  return "Rangt gildi";
                case "invalid_element":
                  return `Rangt gildi \xed ${r.origin}`;
              }
            }),
        };
      },
      "it",
      0,
      function () {
        let e, t, i;
        return {
          localeError:
            ((e = {
              string: { unit: "caratteri", verb: "avere" },
              file: { unit: "byte", verb: "avere" },
              array: { unit: "elementi", verb: "avere" },
              set: { unit: "elementi", verb: "avere" },
              map: { unit: "elementi", verb: "avere" },
            }),
            (t = {
              regex: "input",
              email: "indirizzo email",
              url: "URL",
              emoji: "emoji",
              uuid: "UUID",
              uuidv4: "UUIDv4",
              uuidv6: "UUIDv6",
              nanoid: "nanoid",
              guid: "GUID",
              cuid: "cuid",
              cuid2: "cuid2",
              ulid: "ULID",
              xid: "XID",
              ksuid: "KSUID",
              datetime: "data e ora ISO",
              date: "data ISO",
              time: "ora ISO",
              duration: "durata ISO",
              ipv4: "indirizzo IPv4",
              ipv6: "indirizzo IPv6",
              mac: "indirizzo MAC",
              cidrv4: "intervallo IPv4",
              cidrv6: "intervallo IPv6",
              base64: "stringa codificata in base64",
              base64url: "URL codificata in base64",
              json_string: "stringa JSON",
              e164: "numero E.164",
              credit_card: "numero di carta di credito",
              jwt: "JWT",
              template_literal: "input",
            }),
            (i = { nan: "NaN", number: "numero", array: "vettore" }),
            (r) => {
              switch (r.code) {
                case "invalid_type": {
                  let e = i[r.expected] ?? r.expected,
                    t = a.parsedType(r.input),
                    n = i[t] ?? t;
                  if (/^[A-Z]/.test(r.expected))
                    return `Input non valido: atteso instanceof ${r.expected}, ricevuto ${n}`;
                  return `Input non valido: atteso ${e}, ricevuto ${n}`;
                }
                case "invalid_value":
                  if (1 === r.values.length)
                    return `Input non valido: atteso ${a.stringifyPrimitive(r.values[0])}`;
                  return `Opzione non valida: atteso uno tra ${a.joinValues(r.values, "|")}`;
                case "too_big": {
                  let t = r.inclusive ? "<=" : "<",
                    i = e[r.origin] ?? null;
                  if (i)
                    return `Troppo grande: ${r.origin ?? "valore"} deve avere ${t}${r.maximum.toString()} ${i.unit ?? "elementi"}`;
                  return `Troppo grande: ${r.origin ?? "valore"} deve essere ${t}${r.maximum.toString()}`;
                }
                case "too_small": {
                  let t = r.inclusive ? ">=" : ">",
                    i = e[r.origin] ?? null;
                  if (i)
                    return `Troppo piccolo: ${r.origin} deve avere ${t}${r.minimum.toString()} ${i.unit}`;
                  return `Troppo piccolo: ${r.origin} deve essere ${t}${r.minimum.toString()}`;
                }
                case "invalid_format":
                  if ("starts_with" === r.format)
                    return `Stringa non valida: deve iniziare con "${r.prefix}"`;
                  if ("ends_with" === r.format)
                    return `Stringa non valida: deve terminare con "${r.suffix}"`;
                  if ("includes" === r.format)
                    return `Stringa non valida: deve includere "${r.includes}"`;
                  if ("regex" === r.format)
                    return `Stringa non valida: deve corrispondere al pattern ${r.pattern}`;
                  return `Input non valido: ${t[r.format] ?? r.format}`;
                case "not_multiple_of":
                  return `Numero non valido: deve essere un multiplo di ${r.divisor}`;
                case "unrecognized_keys":
                  return `Chiav${r.keys.length > 1 ? "i" : "e"} non riconosciut${r.keys.length > 1 ? "e" : "a"}: ${a.joinValues(r.keys, ", ")}`;
                case "invalid_key":
                  return `Chiave non valida in ${r.origin}`;
                case "invalid_union":
                default:
                  return "Input non valido";
                case "invalid_element":
                  return `Valore non valido in ${r.origin}`;
              }
            }),
        };
      },
      "ja",
      0,
      function () {
        let e, t, i;
        return {
          localeError:
            ((e = {
              string: { unit: "文字", verb: "である" },
              file: { unit: "バイト", verb: "である" },
              array: { unit: "要素", verb: "である" },
              set: { unit: "要素", verb: "である" },
              map: { unit: "要素", verb: "である" },
            }),
            (t = {
              regex: "入力値",
              email: "メールアドレス",
              url: "URL",
              emoji: "絵文字",
              uuid: "UUID",
              uuidv4: "UUIDv4",
              uuidv6: "UUIDv6",
              nanoid: "nanoid",
              guid: "GUID",
              cuid: "cuid",
              cuid2: "cuid2",
              ulid: "ULID",
              xid: "XID",
              ksuid: "KSUID",
              datetime: "ISO日時",
              date: "ISO日付",
              time: "ISO時刻",
              duration: "ISO期間",
              ipv4: "IPv4アドレス",
              ipv6: "IPv6アドレス",
              mac: "MACアドレス",
              cidrv4: "IPv4範囲",
              cidrv6: "IPv6範囲",
              base64: "base64エンコード文字列",
              base64url: "base64urlエンコード文字列",
              json_string: "JSON文字列",
              e164: "E.164番号",
              credit_card: "クレジットカード番号",
              jwt: "JWT",
              template_literal: "入力値",
            }),
            (i = { nan: "NaN", number: "数値", array: "配列" }),
            (r) => {
              switch (r.code) {
                case "invalid_type": {
                  let e = i[r.expected] ?? r.expected,
                    t = a.parsedType(r.input),
                    n = i[t] ?? t;
                  if (/^[A-Z]/.test(r.expected))
                    return `無効な入力: instanceof ${r.expected}が期待されましたが、${n}が入力されました`;
                  return `無効な入力: ${e}が期待されましたが、${n}が入力されました`;
                }
                case "invalid_value":
                  if (1 === r.values.length)
                    return `無効な入力: ${a.stringifyPrimitive(r.values[0])}が期待されました`;
                  return `無効な選択: ${a.joinValues(r.values, "、")}のいずれかである必要があります`;
                case "too_big": {
                  let t = r.inclusive ? "以下である" : "より小さい",
                    i = e[r.origin] ?? null;
                  if (i)
                    return `大きすぎる値: ${r.origin ?? "値"}は${r.maximum.toString()}${i.unit ?? "要素"}${t}必要があります`;
                  return `大きすぎる値: ${r.origin ?? "値"}は${r.maximum.toString()}${t}必要があります`;
                }
                case "too_small": {
                  let t = r.inclusive ? "以上である" : "より大きい",
                    i = e[r.origin] ?? null;
                  if (i)
                    return `小さすぎる値: ${r.origin}は${r.minimum.toString()}${i.unit}${t}必要があります`;
                  return `小さすぎる値: ${r.origin}は${r.minimum.toString()}${t}必要があります`;
                }
                case "invalid_format":
                  if ("starts_with" === r.format)
                    return `無効な文字列: "${r.prefix}"で始まる必要があります`;
                  if ("ends_with" === r.format)
                    return `無効な文字列: "${r.suffix}"で終わる必要があります`;
                  if ("includes" === r.format)
                    return `無効な文字列: "${r.includes}"を含む必要があります`;
                  if ("regex" === r.format)
                    return `無効な文字列: パターン${r.pattern}に一致する必要があります`;
                  return `無効な${t[r.format] ?? r.format}`;
                case "not_multiple_of":
                  return `無効な数値: ${r.divisor}の倍数である必要があります`;
                case "unrecognized_keys":
                  return `認識されていないキー${r.keys.length > 1 ? "群" : ""}: ${a.joinValues(r.keys, "、")}`;
                case "invalid_key":
                  return `${r.origin}内の無効なキー`;
                case "invalid_union":
                default:
                  return "無効な入力";
                case "invalid_element":
                  return `${r.origin}内の無効な値`;
              }
            }),
        };
      },
      "ka",
      0,
      function () {
        let e, t, i;
        return {
          localeError:
            ((e = {
              string: { unit: "სიმბოლო", verb: "უნდა შეიცავდეს" },
              file: { unit: "ბაიტი", verb: "უნდა შეიცავდეს" },
              array: { unit: "ელემენტი", verb: "უნდა შეიცავდეს" },
              set: { unit: "ელემენტი", verb: "უნდა შეიცავდეს" },
              map: { unit: "ელემენტი", verb: "უნდა შეიცავდეს" },
            }),
            (t = {
              regex: "შეყვანა",
              email: "ელ-ფოსტის მისამართი",
              url: "URL",
              emoji: "ემოჯი",
              uuid: "UUID",
              uuidv4: "UUIDv4",
              uuidv6: "UUIDv6",
              nanoid: "nanoid",
              guid: "GUID",
              cuid: "cuid",
              cuid2: "cuid2",
              ulid: "ULID",
              xid: "XID",
              ksuid: "KSUID",
              datetime: "თარიღი-დრო",
              date: "თარიღი",
              time: "დრო",
              duration: "ხანგრძლივობა",
              ipv4: "IPv4 მისამართი",
              ipv6: "IPv6 მისამართი",
              mac: "MAC მისამართი",
              cidrv4: "IPv4 დიაპაზონი",
              cidrv6: "IPv6 დიაპაზონი",
              base64: "base64-კოდირებული ველი",
              base64url: "base64url-კოდირებული ველი",
              json_string: "JSON ველი",
              e164: "E.164 ნომერი",
              credit_card: "საკრედიტო ბარათის ნომერი",
              jwt: "JWT",
              template_literal: "შეყვანა",
            }),
            (i = {
              nan: "NaN",
              number: "რიცხვი",
              string: "ველი",
              boolean: "ბულეანი",
              function: "ფუნქცია",
              array: "მასივი",
            }),
            (r) => {
              switch (r.code) {
                case "invalid_type": {
                  let e = i[r.expected] ?? r.expected,
                    t = a.parsedType(r.input),
                    n = i[t] ?? t;
                  if (/^[A-Z]/.test(r.expected))
                    return `არასწორი შეყვანა: მოსალოდნელი instanceof ${r.expected}, მიღებული ${n}`;
                  return `არასწორი შეყვანა: მოსალოდნელი ${e}, მიღებული ${n}`;
                }
                case "invalid_value":
                  if (1 === r.values.length)
                    return `არასწორი შეყვანა: მოსალოდნელი ${a.stringifyPrimitive(r.values[0])}`;
                  return `არასწორი ვარიანტი: მოსალოდნელია ერთ-ერთი ${a.joinValues(r.values, "|")}-დან`;
                case "too_big": {
                  let t = r.inclusive ? "<=" : "<",
                    i = e[r.origin] ?? null;
                  if (i)
                    return `ზედმეტად დიდი: მოსალოდნელი ${r.origin ?? "მნიშვნელობა"} ${i.verb} ${t}${r.maximum.toString()} ${i.unit}`;
                  return `ზედმეტად დიდი: მოსალოდნელი ${r.origin ?? "მნიშვნელობა"} იყოს ${t}${r.maximum.toString()}`;
                }
                case "too_small": {
                  let t = r.inclusive ? ">=" : ">",
                    i = e[r.origin] ?? null;
                  if (i)
                    return `ზედმეტად პატარა: მოსალოდნელი ${r.origin} ${i.verb} ${t}${r.minimum.toString()} ${i.unit}`;
                  return `ზედმეტად პატარა: მოსალოდნელი ${r.origin} იყოს ${t}${r.minimum.toString()}`;
                }
                case "invalid_format":
                  if ("starts_with" === r.format)
                    return `არასწორი ველი: უნდა იწყებოდეს "${r.prefix}"-ით`;
                  if ("ends_with" === r.format)
                    return `არასწორი ველი: უნდა მთავრდებოდეს "${r.suffix}"-ით`;
                  if ("includes" === r.format)
                    return `არასწორი ველი: უნდა შეიცავდეს "${r.includes}"-ს`;
                  if ("regex" === r.format)
                    return `არასწორი ველი: უნდა შეესაბამებოდეს შაბლონს ${r.pattern}`;
                  return `არასწორი ${t[r.format] ?? r.format}`;
                case "not_multiple_of":
                  return `არასწორი რიცხვი: უნდა იყოს ${r.divisor}-ის ჯერადი`;
                case "unrecognized_keys":
                  return `უცნობი გასაღებ${r.keys.length > 1 ? "ები" : "ი"}: ${a.joinValues(r.keys, ", ")}`;
                case "invalid_key":
                  return `არასწორი გასაღები ${r.origin}-ში`;
                case "invalid_union":
                default:
                  return "არასწორი შეყვანა";
                case "invalid_element":
                  return `არასწორი მნიშვნელობა ${r.origin}-ში`;
              }
            }),
        };
      },
      "kh",
      0,
      function () {
        return rv();
      },
      "km",
      0,
      rv,
      "kn",
      0,
      function () {
        let e, t, i;
        return {
          localeError:
            ((e = {
              string: { unit: "ಅಕ್ಷರಗಳು", verb: "ಹೊಂದಲು" },
              file: { unit: "ಬೈಟ್‌ಗಳು", verb: "ಹೊಂದಲು" },
              array: { unit: "ವಸ್ತುಗಳು", verb: "ಹೊಂದಲು" },
              set: { unit: "ವಸ್ತುಗಳು", verb: "ಹೊಂದಲು" },
              map: { unit: "entries", verb: "ಹೊಂದಲು" },
            }),
            (t = {
              regex: "ಇನ್ಪುಟ್",
              email: "email ವಿಳಾಸ",
              url: "URL",
              emoji: "emoji",
              uuid: "UUID",
              uuidv4: "UUIDv4",
              uuidv6: "UUIDv6",
              nanoid: "nanoid",
              guid: "GUID",
              cuid: "cuid",
              cuid2: "cuid2",
              ulid: "ULID",
              xid: "XID",
              ksuid: "KSUID",
              datetime: "ISO ದಿನಾಂಕದ ಸಮಯ",
              date: "ISO ದಿನಾಂಕ",
              time: "ISO ಸಮಯ",
              duration: "ISO ಅವಧಿ",
              ipv4: "IPv4 ವಿಳಾಸ",
              ipv6: "IPv6 ವಿಳಾಸ",
              mac: "MAC ವಿಳಾಸ",
              cidrv4: "IPv4 ವ್ಯಾಪ್ತಿಯ",
              cidrv6: "IPv6 ವ್ಯಾಪ್ತಿಯ",
              base64: "base64-encodedಸ್ಟ್ರಿಂಗ್",
              base64url: "base64url-encodedಸ್ಟ್ರಿಂಗ್",
              json_string: "JSONಸ್ಟ್ರಿಂಗ್",
              e164: "E.164 ಸಂಖ್ಯೆ",
              credit_card: "ಕ್ರೆಡಿಟ್ ಕಾರ್ಡ್ ಸಂಖ್ಯೆ",
              jwt: "JWT",
              template_literal: "ಇನ್ಪುಟ್",
            }),
            (i = { nan: "NaN" }),
            (r) => {
              switch (r.code) {
                case "invalid_type": {
                  let e = i[r.expected] ?? r.expected,
                    t = a.parsedType(r.input),
                    n = i[t] ?? t;
                  return `ಅಮಾನ್ಯ ಇನ್‌ಪುಟ್: ನಿರೀಕ್ಷಿಸಲಾಗಿದೆ ${e}, ಸ್ವೀಕರಿಸಿದನು ${n}`;
                }
                case "invalid_value":
                  if (1 === r.values.length)
                    return `ಅಮಾನ್ಯ ಇನ್‌ಪುಟ್: ನಿರೀಕ್ಷಿಸಲಾಗಿದೆ ${a.stringifyPrimitive(r.values[0])}`;
                  return `ಅಮಾನ್ಯ ಆಯ್ಕೆ: ಇವುಗಳಲ್ಲಿ ಒಂದನ್ನು ನಿರೀಕ್ಷಿಸಲಾಗಿದೆ ${a.joinValues(r.values, "|")}`;
                case "too_big": {
                  let t = r.inclusive ? "<=" : "<",
                    i = e[r.origin] ?? null;
                  if (i)
                    return `ತುಂಬಾ ದೊಡ್ಡದು: ನಿರೀಕ್ಷಿಸಲಾಗಿದೆ ${r.origin ?? "value"} ಹೊಂದಲು ${t}${r.maximum.toString()} ${i.unit ?? "ಅಂಶಗಳು"}`;
                  return `ತುಂಬಾ ದೊಡ್ಡದು: ನಿರೀಕ್ಷಿಸಲಾಗಿದೆ ${r.origin ?? "value"} ಎಂದು ${t}${r.maximum.toString()}`;
                }
                case "too_small": {
                  let t = r.inclusive ? ">=" : ">",
                    i = e[r.origin] ?? null;
                  if (i)
                    return `ತುಂಬಾ ಚಿಕ್ಕದು: ನಿರೀಕ್ಷಿಸಲಾಗಿದೆ ${r.origin} ಹೊಂದಲು ${t}${r.minimum.toString()} ${i.unit}`;
                  return `ತುಂಬಾ ಚಿಕ್ಕದು: ನಿರೀಕ್ಷಿಸಲಾಗಿದೆ ${r.origin} ಎಂದು ${t}${r.minimum.toString()}`;
                }
                case "invalid_format":
                  if ("starts_with" === r.format)
                    return `ಅಮಾನ್ಯವಾದ ಸ್ಟ್ರಿಂಗ್: ಇದರೊಂದಿಗೆ ಪ್ರಾರಂಭಿಸಬೇಕು "${r.prefix}"`;
                  if ("ends_with" === r.format)
                    return `ಅಮಾನ್ಯವಾದ ಸ್ಟ್ರಿಂಗ್: ಇದರೊಂದಿಗೆ ಕೊನೆಗೊಳ್ಳಬೇಕು "${r.suffix}"`;
                  if ("includes" === r.format)
                    return `ಅಮಾನ್ಯ ಸ್ಟ್ರಿಂಗ್: ಒಳಗೊಂಡಿರಬೇಕು "${r.includes}"`;
                  if ("regex" === r.format)
                    return `ಅಮಾನ್ಯವಾದ ಸ್ಟ್ರಿಂಗ್: ಮಾದರಿಗೆ ಹೊಂದಿಕೆಯಾಗಬೇಕು ${r.pattern}`;
                  return `ಅಮಾನ್ಯ ${t[r.format] ?? r.format}`;
                case "not_multiple_of":
                  return `ಅಮಾನ್ಯ ಸಂಖ್ಯೆ: ಬಹುಸಂಖ್ಯೆಯಾಗಿರಬೇಕು ${r.divisor}`;
                case "unrecognized_keys":
                  return `ಗುರುತಿಸಲಾಗದ ಕೀ ${r.keys.length > 1 ? "s" : ""}: ${a.joinValues(r.keys, ", ")}`;
                case "invalid_key":
                  return `ಅಮಾನ್ಯವಾದ ಕೀ ಇನ್ ${r.origin}`;
                case "invalid_union":
                  if (
                    r.options &&
                    Array.isArray(r.options) &&
                    r.options.length > 0
                  ) {
                    let e = r.options.map((e) => `'${e}'`).join(" | ");
                    return `ಅಮಾನ್ಯ ತಾರತಮ್ಯ ಮೌಲ್ಯ. ನಿರೀಕ್ಷಿಸಲಾಗಿದೆ ${e}`;
                  }
                  return "ಅಮಾನ್ಯ ಇನ್‌ಪುಟ್";
                case "invalid_element":
                  return `ರಲ್ಲಿ ಅಮಾನ್ಯ ಮೌಲ್ಯ ${r.origin}`;
                default:
                  return "ಅಮಾನ್ಯ ಇನ್‌ಪುಟ್";
              }
            }),
        };
      },
      "ko",
      0,
      function () {
        let e, t, i;
        return {
          localeError:
            ((e = {
              string: { unit: "문자", verb: "to have" },
              file: { unit: "바이트", verb: "to have" },
              array: { unit: "개", verb: "to have" },
              set: { unit: "개", verb: "to have" },
              map: { unit: "개", verb: "to have" },
            }),
            (t = {
              regex: "입력",
              email: "이메일 주소",
              url: "URL",
              emoji: "이모지",
              uuid: "UUID",
              uuidv4: "UUIDv4",
              uuidv6: "UUIDv6",
              nanoid: "nanoid",
              guid: "GUID",
              cuid: "cuid",
              cuid2: "cuid2",
              ulid: "ULID",
              xid: "XID",
              ksuid: "KSUID",
              datetime: "ISO 날짜시간",
              date: "ISO 날짜",
              time: "ISO 시간",
              duration: "ISO 기간",
              ipv4: "IPv4 주소",
              ipv6: "IPv6 주소",
              mac: "MAC 주소",
              cidrv4: "IPv4 범위",
              cidrv6: "IPv6 범위",
              base64: "base64 인코딩 문자열",
              base64url: "base64url 인코딩 문자열",
              json_string: "JSON 문자열",
              e164: "E.164 번호",
              credit_card: "신용카드 번호",
              jwt: "JWT",
              template_literal: "입력",
            }),
            (i = { nan: "NaN" }),
            (r) => {
              switch (r.code) {
                case "invalid_type": {
                  let e = i[r.expected] ?? r.expected,
                    t = a.parsedType(r.input),
                    n = i[t] ?? t;
                  if (/^[A-Z]/.test(r.expected))
                    return `잘못된 입력: 예상 타입은 instanceof ${r.expected}, 받은 타입은 ${n}입니다`;
                  return `잘못된 입력: 예상 타입은 ${e}, 받은 타입은 ${n}입니다`;
                }
                case "invalid_value":
                  if (1 === r.values.length)
                    return `잘못된 입력: 값은 ${a.stringifyPrimitive(r.values[0])} 이어야 합니다`;
                  return `잘못된 옵션: ${a.joinValues(r.values, "또는 ")} 중 하나여야 합니다`;
                case "too_big": {
                  let t = r.inclusive ? "이하" : "미만",
                    i = "미만" === t ? "이어야 합니다" : "여야 합니다",
                    n = e[r.origin] ?? null,
                    a = n?.unit ?? "요소";
                  if (n)
                    return `${r.origin ?? "값"}이 너무 큽니다: ${r.maximum.toString()}${a} ${t}${i}`;
                  return `${r.origin ?? "값"}이 너무 큽니다: ${r.maximum.toString()} ${t}${i}`;
                }
                case "too_small": {
                  let t = r.inclusive ? "이상" : "초과",
                    i = "이상" === t ? "이어야 합니다" : "여야 합니다",
                    n = e[r.origin] ?? null,
                    a = n?.unit ?? "요소";
                  if (n)
                    return `${r.origin ?? "값"}이 너무 작습니다: ${r.minimum.toString()}${a} ${t}${i}`;
                  return `${r.origin ?? "값"}이 너무 작습니다: ${r.minimum.toString()} ${t}${i}`;
                }
                case "invalid_format":
                  if ("starts_with" === r.format)
                    return `잘못된 문자열: "${r.prefix}"(으)로 시작해야 합니다`;
                  if ("ends_with" === r.format)
                    return `잘못된 문자열: "${r.suffix}"(으)로 끝나야 합니다`;
                  if ("includes" === r.format)
                    return `잘못된 문자열: "${r.includes}"을(를) 포함해야 합니다`;
                  if ("regex" === r.format)
                    return `잘못된 문자열: 정규식 ${r.pattern} 패턴과 일치해야 합니다`;
                  return `잘못된 ${t[r.format] ?? r.format}`;
                case "not_multiple_of":
                  return `잘못된 숫자: ${r.divisor}의 배수여야 합니다`;
                case "unrecognized_keys":
                  return `인식할 수 없는 키: ${a.joinValues(r.keys, ", ")}`;
                case "invalid_key":
                  return `잘못된 키: ${r.origin}`;
                case "invalid_union":
                default:
                  return "잘못된 입력";
                case "invalid_element":
                  return `잘못된 값: ${r.origin}`;
              }
            }),
        };
      },
      "lt",
      0,
      function () {
        return {
          localeError: (() => {
            let e = {
              string: {
                unit: { one: "simbolis", few: "simboliai", many: "simbolių" },
                verb: {
                  smaller: {
                    inclusive: "turi būti ne ilgesnė kaip",
                    notInclusive: "turi būti trumpesnė kaip",
                  },
                  bigger: {
                    inclusive: "turi būti ne trumpesnė kaip",
                    notInclusive: "turi būti ilgesnė kaip",
                  },
                },
              },
              file: {
                unit: { one: "baitas", few: "baitai", many: "baitų" },
                verb: {
                  smaller: {
                    inclusive: "turi būti ne didesnis kaip",
                    notInclusive: "turi būti mažesnis kaip",
                  },
                  bigger: {
                    inclusive: "turi būti ne mažesnis kaip",
                    notInclusive: "turi būti didesnis kaip",
                  },
                },
              },
              array: {
                unit: { one: "elementą", few: "elementus", many: "elementų" },
                verb: {
                  smaller: {
                    inclusive: "turi turėti ne daugiau kaip",
                    notInclusive: "turi turėti mažiau kaip",
                  },
                  bigger: {
                    inclusive: "turi turėti ne mažiau kaip",
                    notInclusive: "turi turėti daugiau kaip",
                  },
                },
              },
              set: {
                unit: { one: "elementą", few: "elementus", many: "elementų" },
                verb: {
                  smaller: {
                    inclusive: "turi turėti ne daugiau kaip",
                    notInclusive: "turi turėti mažiau kaip",
                  },
                  bigger: {
                    inclusive: "turi turėti ne mažiau kaip",
                    notInclusive: "turi turėti daugiau kaip",
                  },
                },
              },
            };
            function t(t, i, r, n) {
              let a = e[t] ?? null;
              return null === a
                ? a
                : {
                    unit: a.unit[i],
                    verb: a.verb[n][r ? "inclusive" : "notInclusive"],
                  };
            }
            let i = {
                regex: "įvestis",
                email: "el. pašto adresas",
                url: "URL",
                emoji: "jaustukas",
                uuid: "UUID",
                uuidv4: "UUIDv4",
                uuidv6: "UUIDv6",
                nanoid: "nanoid",
                guid: "GUID",
                cuid: "cuid",
                cuid2: "cuid2",
                ulid: "ULID",
                xid: "XID",
                ksuid: "KSUID",
                datetime: "ISO data ir laikas",
                date: "ISO data",
                time: "ISO laikas",
                duration: "ISO trukmė",
                ipv4: "IPv4 adresas",
                ipv6: "IPv6 adresas",
                mac: "MAC adresas",
                cidrv4: "IPv4 tinklo prefiksas (CIDR)",
                cidrv6: "IPv6 tinklo prefiksas (CIDR)",
                base64: "base64 užkoduota eilutė",
                base64url: "base64url užkoduota eilutė",
                json_string: "JSON eilutė",
                e164: "E.164 numeris",
                credit_card: "kredito kortelės numeris",
                jwt: "JWT",
                template_literal: "įvestis",
              },
              r = {
                nan: "NaN",
                number: "skaičius",
                bigint: "sveikasis skaičius",
                string: "eilutė",
                boolean: "loginė reikšmė",
                undefined: "neapibrėžta reikšmė",
                function: "funkcija",
                symbol: "simbolis",
                array: "masyvas",
                object: "objektas",
                null: "nulinė reikšmė",
              };
            return (e) => {
              switch (e.code) {
                case "invalid_type": {
                  let t = r[e.expected] ?? e.expected,
                    i = a.parsedType(e.input),
                    n = r[i] ?? i;
                  if (/^[A-Z]/.test(e.expected))
                    return `Gautas tipas ${n}, o tikėtasi - instanceof ${e.expected}`;
                  return `Gautas tipas ${n}, o tikėtasi - ${t}`;
                }
                case "invalid_value":
                  if (1 === e.values.length)
                    return `Privalo būti ${a.stringifyPrimitive(e.values[0])}`;
                  return `Privalo būti vienas iš ${a.joinValues(e.values, "|")} pasirinkimų`;
                case "too_big": {
                  let i = r[e.origin] ?? e.origin,
                    n = t(
                      e.origin,
                      r$(Number(e.maximum)),
                      e.inclusive ?? !1,
                      "smaller",
                    );
                  if (n?.verb)
                    return `${rg(i ?? e.origin ?? "reikšmė")} ${n.verb} ${e.maximum.toString()} ${n.unit ?? "elementų"}`;
                  let a = e.inclusive ? "ne didesnis kaip" : "mažesnis kaip";
                  return `${rg(i ?? e.origin ?? "reikšmė")} turi būti ${a} ${e.maximum.toString()} ${n?.unit}`;
                }
                case "too_small": {
                  let i = r[e.origin] ?? e.origin,
                    n = t(
                      e.origin,
                      r$(Number(e.minimum)),
                      e.inclusive ?? !1,
                      "bigger",
                    );
                  if (n?.verb)
                    return `${rg(i ?? e.origin ?? "reikšmė")} ${n.verb} ${e.minimum.toString()} ${n.unit ?? "elementų"}`;
                  let a = e.inclusive ? "ne mažesnis kaip" : "didesnis kaip";
                  return `${rg(i ?? e.origin ?? "reikšmė")} turi būti ${a} ${e.minimum.toString()} ${n?.unit}`;
                }
                case "invalid_format":
                  if ("starts_with" === e.format)
                    return `Eilutė privalo prasidėti "${e.prefix}"`;
                  if ("ends_with" === e.format)
                    return `Eilutė privalo pasibaigti "${e.suffix}"`;
                  if ("includes" === e.format)
                    return `Eilutė privalo įtraukti "${e.includes}"`;
                  if ("regex" === e.format)
                    return `Eilutė privalo atitikti ${e.pattern}`;
                  return `Neteisingas ${i[e.format] ?? e.format}`;
                case "not_multiple_of":
                  return `Skaičius privalo būti ${e.divisor} kartotinis.`;
                case "unrecognized_keys":
                  return `Neatpažint${e.keys.length > 1 ? "i" : "as"} rakt${e.keys.length > 1 ? "ai" : "as"}: ${a.joinValues(e.keys, ", ")}`;
                case "invalid_key":
                  return "Rastas klaidingas raktas";
                case "invalid_union":
                default:
                  return "Klaidinga įvestis";
                case "invalid_element": {
                  let t = r[e.origin] ?? e.origin;
                  return `${rg(t ?? e.origin ?? "reikšmė")} turi klaidingą įvestį`;
                }
              }
            };
          })(),
        };
      },
      "mk",
      0,
      function () {
        let e, t, i;
        return {
          localeError:
            ((e = {
              string: { unit: "знаци", verb: "да имаат" },
              file: { unit: "бајти", verb: "да имаат" },
              array: { unit: "ставки", verb: "да имаат" },
              set: { unit: "ставки", verb: "да имаат" },
              map: { unit: "ставки", verb: "да имаат" },
            }),
            (t = {
              regex: "внес",
              email: "адреса на е-пошта",
              url: "URL",
              emoji: "емоџи",
              uuid: "UUID",
              uuidv4: "UUIDv4",
              uuidv6: "UUIDv6",
              nanoid: "nanoid",
              guid: "GUID",
              cuid: "cuid",
              cuid2: "cuid2",
              ulid: "ULID",
              xid: "XID",
              ksuid: "KSUID",
              datetime: "ISO датум и време",
              date: "ISO датум",
              time: "ISO време",
              duration: "ISO времетраење",
              ipv4: "IPv4 адреса",
              ipv6: "IPv6 адреса",
              mac: "MAC адреса",
              cidrv4: "IPv4 опсег",
              cidrv6: "IPv6 опсег",
              base64: "base64-енкодирана низа",
              base64url: "base64url-енкодирана низа",
              json_string: "JSON низа",
              e164: "E.164 број",
              credit_card: "број на кредитна картичка",
              jwt: "JWT",
              template_literal: "внес",
            }),
            (i = { nan: "NaN", number: "број", array: "низа" }),
            (r) => {
              switch (r.code) {
                case "invalid_type": {
                  let e = i[r.expected] ?? r.expected,
                    t = a.parsedType(r.input),
                    n = i[t] ?? t;
                  if (/^[A-Z]/.test(r.expected))
                    return `Грешен внес: се очекува instanceof ${r.expected}, примено ${n}`;
                  return `Грешен внес: се очекува ${e}, примено ${n}`;
                }
                case "invalid_value":
                  if (1 === r.values.length)
                    return `Invalid input: expected ${a.stringifyPrimitive(r.values[0])}`;
                  return `Грешана опција: се очекува една ${a.joinValues(r.values, "|")}`;
                case "too_big": {
                  let t = r.inclusive ? "<=" : "<",
                    i = e[r.origin] ?? null;
                  if (i)
                    return `Премногу голем: се очекува ${r.origin ?? "вредноста"} да има ${t}${r.maximum.toString()} ${i.unit ?? "елементи"}`;
                  return `Премногу голем: се очекува ${r.origin ?? "вредноста"} да биде ${t}${r.maximum.toString()}`;
                }
                case "too_small": {
                  let t = r.inclusive ? ">=" : ">",
                    i = e[r.origin] ?? null;
                  if (i)
                    return `Премногу мал: се очекува ${r.origin} да има ${t}${r.minimum.toString()} ${i.unit}`;
                  return `Премногу мал: се очекува ${r.origin} да биде ${t}${r.minimum.toString()}`;
                }
                case "invalid_format":
                  if ("starts_with" === r.format)
                    return `Неважечка низа: мора да започнува со "${r.prefix}"`;
                  if ("ends_with" === r.format)
                    return `Неважечка низа: мора да завршува со "${r.suffix}"`;
                  if ("includes" === r.format)
                    return `Неважечка низа: мора да вклучува "${r.includes}"`;
                  if ("regex" === r.format)
                    return `Неважечка низа: мора да одгоара на патернот ${r.pattern}`;
                  return `Invalid ${t[r.format] ?? r.format}`;
                case "not_multiple_of":
                  return `Грешен број: мора да биде делив со ${r.divisor}`;
                case "unrecognized_keys":
                  return `${r.keys.length > 1 ? "Непрепознаени клучеви" : "Непрепознаен клуч"}: ${a.joinValues(r.keys, ", ")}`;
                case "invalid_key":
                  return `Грешен клуч во ${r.origin}`;
                case "invalid_union":
                default:
                  return "Грешен внес";
                case "invalid_element":
                  return `Грешна вредност во ${r.origin}`;
              }
            }),
        };
      },
      "ms",
      0,
      function () {
        let e, t, i;
        return {
          localeError:
            ((e = {
              string: { unit: "aksara", verb: "mempunyai" },
              file: { unit: "bait", verb: "mempunyai" },
              array: { unit: "elemen", verb: "mempunyai" },
              set: { unit: "elemen", verb: "mempunyai" },
              map: { unit: "elemen", verb: "mempunyai" },
            }),
            (t = {
              regex: "input",
              email: "alamat e-mel",
              url: "URL",
              emoji: "emoji",
              uuid: "UUID",
              uuidv4: "UUIDv4",
              uuidv6: "UUIDv6",
              nanoid: "nanoid",
              guid: "GUID",
              cuid: "cuid",
              cuid2: "cuid2",
              ulid: "ULID",
              xid: "XID",
              ksuid: "KSUID",
              datetime: "tarikh masa ISO",
              date: "tarikh ISO",
              time: "masa ISO",
              duration: "tempoh ISO",
              ipv4: "alamat IPv4",
              ipv6: "alamat IPv6",
              mac: "alamat MAC",
              cidrv4: "julat IPv4",
              cidrv6: "julat IPv6",
              base64: "string dikodkan base64",
              base64url: "string dikodkan base64url",
              json_string: "string JSON",
              e164: "nombor E.164",
              credit_card: "nombor kad kredit",
              jwt: "JWT",
              template_literal: "input",
            }),
            (i = { nan: "NaN", number: "nombor" }),
            (r) => {
              switch (r.code) {
                case "invalid_type": {
                  let e = i[r.expected] ?? r.expected,
                    t = a.parsedType(r.input),
                    n = i[t] ?? t;
                  if (/^[A-Z]/.test(r.expected))
                    return `Input tidak sah: dijangka instanceof ${r.expected}, diterima ${n}`;
                  return `Input tidak sah: dijangka ${e}, diterima ${n}`;
                }
                case "invalid_value":
                  if (1 === r.values.length)
                    return `Input tidak sah: dijangka ${a.stringifyPrimitive(r.values[0])}`;
                  return `Pilihan tidak sah: dijangka salah satu daripada ${a.joinValues(r.values, "|")}`;
                case "too_big": {
                  let t = r.inclusive ? "<=" : "<",
                    i = e[r.origin] ?? null;
                  if (i)
                    return `Terlalu besar: dijangka ${r.origin ?? "nilai"} ${i.verb} ${t}${r.maximum.toString()} ${i.unit ?? "elemen"}`;
                  return `Terlalu besar: dijangka ${r.origin ?? "nilai"} adalah ${t}${r.maximum.toString()}`;
                }
                case "too_small": {
                  let t = r.inclusive ? ">=" : ">",
                    i = e[r.origin] ?? null;
                  if (i)
                    return `Terlalu kecil: dijangka ${r.origin} ${i.verb} ${t}${r.minimum.toString()} ${i.unit}`;
                  return `Terlalu kecil: dijangka ${r.origin} adalah ${t}${r.minimum.toString()}`;
                }
                case "invalid_format":
                  if ("starts_with" === r.format)
                    return `String tidak sah: mesti bermula dengan "${r.prefix}"`;
                  if ("ends_with" === r.format)
                    return `String tidak sah: mesti berakhir dengan "${r.suffix}"`;
                  if ("includes" === r.format)
                    return `String tidak sah: mesti mengandungi "${r.includes}"`;
                  if ("regex" === r.format)
                    return `String tidak sah: mesti sepadan dengan corak ${r.pattern}`;
                  return `${t[r.format] ?? r.format} tidak sah`;
                case "not_multiple_of":
                  return `Nombor tidak sah: perlu gandaan ${r.divisor}`;
                case "unrecognized_keys":
                  return `Kunci tidak dikenali: ${a.joinValues(r.keys, ", ")}`;
                case "invalid_key":
                  return `Kunci tidak sah dalam ${r.origin}`;
                case "invalid_union":
                default:
                  return "Input tidak sah";
                case "invalid_element":
                  return `Nilai tidak sah dalam ${r.origin}`;
              }
            }),
        };
      },
      "ne",
      0,
      function () {
        let e, t, i;
        return {
          localeError:
            ((e = {
              string: { unit: "अक्षर", verb: "हुनुपर्छ" },
              file: { unit: "बाइट", verb: "हुनुपर्छ" },
              array: { unit: "तत्व", verb: "हुनुपर्छ" },
              set: { unit: "तत्व", verb: "हुनुपर्छ" },
              map: { unit: "प्रविष्टि", verb: "हुनुपर्छ" },
            }),
            (t = {
              regex: "इनपुट",
              email: "इमेल ठेगाना",
              url: "URL",
              emoji: "इमोजी",
              uuid: "UUID",
              uuidv4: "UUIDv4",
              uuidv6: "UUIDv6",
              nanoid: "nanoid",
              guid: "GUID",
              cuid: "cuid",
              cuid2: "cuid2",
              ulid: "ULID",
              xid: "XID",
              ksuid: "KSUID",
              datetime: "ISO मिति र समय",
              date: "ISO मिति",
              time: "ISO समय",
              duration: "ISO अवधि",
              ipv4: "IPv4 ठेगाना",
              ipv6: "IPv6 ठेगाना",
              mac: "MAC ठेगाना",
              cidrv4: "IPv4 दायरा",
              cidrv6: "IPv6 दायरा",
              base64: "base64-इन्कोड गरिएको स्ट्रिङ",
              base64url: "base64url-इन्कोड गरिएको स्ट्रिङ",
              json_string: "JSON स्ट्रिङ",
              e164: "E.164 नम्बर",
              credit_card: "क्रेडिट कार्ड नम्बर",
              jwt: "JWT",
              template_literal: "इनपुट",
            }),
            (i = { nan: "NaN" }),
            (r) => {
              switch (r.code) {
                case "invalid_type": {
                  let e = i[r.expected] ?? r.expected,
                    t = a.parsedType(r.input),
                    n = i[t] ?? t;
                  return `अमान्य इनपुट: अपेक्षित ${e}, प्राप्त ${n}`;
                }
                case "invalid_value":
                  if (1 === r.values.length)
                    return `अमान्य इनपुट: अपेक्षित ${a.stringifyPrimitive(r.values[0])}`;
                  return `अमान्य विकल्प: अपेक्षित मानहरू मध्ये एक ${a.joinValues(r.values, "|")}`;
                case "too_big": {
                  let t = r.inclusive ? "<=" : "<",
                    i = e[r.origin] ?? null;
                  if (i)
                    return `धेरै ठूलो: ${r.origin ?? "मान"} मा ${t}${r.maximum.toString()} ${i.unit} ${i.verb}`;
                  return `धेरै ठूलो: ${r.origin ?? "मान"} ${t}${r.maximum.toString()} हुनुपर्छ`;
                }
                case "too_small": {
                  let t = r.inclusive ? ">=" : ">",
                    i = e[r.origin] ?? null;
                  if (i)
                    return `धेरै सानो: ${r.origin} मा ${t}${r.minimum.toString()} ${i.unit} ${i.verb}`;
                  return `धेरै सानो: ${r.origin} ${t}${r.minimum.toString()} हुनुपर्छ`;
                }
                case "invalid_format":
                  if ("starts_with" === r.format)
                    return `अमान्य स्ट्रिङ: "${r.prefix}" बाट सुरु हुनुपर्छ`;
                  if ("ends_with" === r.format)
                    return `अमान्य स्ट्रिङ: "${r.suffix}" मा समाप्त हुनुपर्छ`;
                  if ("includes" === r.format)
                    return `अमान्य स्ट्रिङ: "${r.includes}" समावेश हुनुपर्छ`;
                  if ("regex" === r.format)
                    return `अमान्य स्ट्रिङ: ढाँचा ${r.pattern} सँग मेल खानुपर्छ`;
                  return `अमान्य ${t[r.format] ?? r.format}`;
                case "not_multiple_of":
                  return `अमान्य संख्या: ${r.divisor} को गुणज हुनुपर्छ`;
                case "unrecognized_keys":
                  return `अपरिचित कुञ्जी${r.keys.length > 1 ? "हरू" : ""}: ${a.joinValues(r.keys, ", ")}`;
                case "invalid_key":
                  return `अमान्य कुञ्जी: ${r.origin} मा`;
                case "invalid_union":
                  if (
                    r.options &&
                    Array.isArray(r.options) &&
                    r.options.length > 0
                  ) {
                    let e = r.options.map((e) => `'${e}'`).join(" | ");
                    return `अमान्य डिस्क्रिमिनेटर मान: अपेक्षित ${e}`;
                  }
                  return "अमान्य इनपुट";
                case "invalid_element":
                  return `अमान्य मान: ${r.origin} मा`;
                default:
                  return "अमान्य इनपुट";
              }
            }),
        };
      },
      "nl",
      0,
      function () {
        let e, t, i;
        return {
          localeError:
            ((e = {
              string: { unit: "tekens", verb: "heeft" },
              file: { unit: "bytes", verb: "heeft" },
              array: { unit: "elementen", verb: "heeft" },
              set: { unit: "elementen", verb: "heeft" },
              map: { unit: "elementen", verb: "heeft" },
            }),
            (t = {
              regex: "invoer",
              email: "emailadres",
              url: "URL",
              emoji: "emoji",
              uuid: "UUID",
              uuidv4: "UUIDv4",
              uuidv6: "UUIDv6",
              nanoid: "nanoid",
              guid: "GUID",
              cuid: "cuid",
              cuid2: "cuid2",
              ulid: "ULID",
              xid: "XID",
              ksuid: "KSUID",
              datetime: "ISO datum en tijd",
              date: "ISO datum",
              time: "ISO tijd",
              duration: "ISO duur",
              ipv4: "IPv4-adres",
              ipv6: "IPv6-adres",
              mac: "MAC-adres",
              cidrv4: "IPv4-bereik",
              cidrv6: "IPv6-bereik",
              base64: "base64-gecodeerde tekst",
              base64url: "base64 URL-gecodeerde tekst",
              json_string: "JSON string",
              e164: "E.164-nummer",
              credit_card: "creditcardnummer",
              jwt: "JWT",
              template_literal: "invoer",
            }),
            (i = { nan: "NaN", number: "getal" }),
            (r) => {
              switch (r.code) {
                case "invalid_type": {
                  let e = i[r.expected] ?? r.expected,
                    t = a.parsedType(r.input),
                    n = i[t] ?? t;
                  if (/^[A-Z]/.test(r.expected))
                    return `Ongeldige invoer: verwacht instanceof ${r.expected}, ontving ${n}`;
                  return `Ongeldige invoer: verwacht ${e}, ontving ${n}`;
                }
                case "invalid_value":
                  if (1 === r.values.length)
                    return `Ongeldige invoer: verwacht ${a.stringifyPrimitive(r.values[0])}`;
                  return `Ongeldige optie: verwacht \xe9\xe9n van ${a.joinValues(r.values, "|")}`;
                case "too_big": {
                  let t = r.inclusive ? "<=" : "<",
                    i = e[r.origin] ?? null,
                    n =
                      "date" === r.origin
                        ? "laat"
                        : "string" === r.origin
                          ? "lang"
                          : "groot";
                  if (i)
                    return `Te ${n}: verwacht dat ${r.origin ?? "waarde"} ${t}${r.maximum.toString()} ${i.unit ?? "elementen"} ${i.verb}`;
                  return `Te ${n}: verwacht dat ${r.origin ?? "waarde"} ${t}${r.maximum.toString()} is`;
                }
                case "too_small": {
                  let t = r.inclusive ? ">=" : ">",
                    i = e[r.origin] ?? null,
                    n =
                      "date" === r.origin
                        ? "vroeg"
                        : "string" === r.origin
                          ? "kort"
                          : "klein";
                  if (i)
                    return `Te ${n}: verwacht dat ${r.origin} ${t}${r.minimum.toString()} ${i.unit} ${i.verb}`;
                  return `Te ${n}: verwacht dat ${r.origin} ${t}${r.minimum.toString()} is`;
                }
                case "invalid_format":
                  if ("starts_with" === r.format)
                    return `Ongeldige tekst: moet met "${r.prefix}" beginnen`;
                  if ("ends_with" === r.format)
                    return `Ongeldige tekst: moet op "${r.suffix}" eindigen`;
                  if ("includes" === r.format)
                    return `Ongeldige tekst: moet "${r.includes}" bevatten`;
                  if ("regex" === r.format)
                    return `Ongeldige tekst: moet overeenkomen met patroon ${r.pattern}`;
                  return `Ongeldig: ${t[r.format] ?? r.format}`;
                case "not_multiple_of":
                  return `Ongeldig getal: moet een veelvoud van ${r.divisor} zijn`;
                case "unrecognized_keys":
                  return `Onbekende key${r.keys.length > 1 ? "s" : ""}: ${a.joinValues(r.keys, ", ")}`;
                case "invalid_key":
                  return `Ongeldige key in ${r.origin}`;
                case "invalid_union":
                default:
                  return "Ongeldige invoer";
                case "invalid_element":
                  return `Ongeldige waarde in ${r.origin}`;
              }
            }),
        };
      },
      "nn",
      0,
      function () {
        let e, t, i;
        return {
          localeError:
            ((e = {
              string: { unit: "teikn", verb: "å ha" },
              file: { unit: "bytes", verb: "å ha" },
              array: { unit: "element", verb: "å innehalde" },
              set: { unit: "element", verb: "å innehalde" },
              map: { unit: "element", verb: "å innehalde" },
            }),
            (t = {
              regex: "input",
              email: "e-postadresse",
              url: "URL",
              emoji: "emoji",
              uuid: "UUID",
              uuidv4: "UUIDv4",
              uuidv6: "UUIDv6",
              nanoid: "nanoid",
              guid: "GUID",
              cuid: "cuid",
              cuid2: "cuid2",
              ulid: "ULID",
              xid: "XID",
              ksuid: "KSUID",
              datetime: "ISO dato- og klokkeslett",
              date: "ISO-dato",
              time: "ISO-klokkeslett",
              duration: "ISO-varigheit",
              ipv4: "IPv4-adresse",
              ipv6: "IPv6-adresse",
              mac: "MAC-adresse",
              cidrv4: "IPv4-spekter",
              cidrv6: "IPv6-spekter",
              base64: "base64-enkoda streng",
              base64url: "base64url-enkoda streng",
              json_string: "JSON-streng",
              e164: "E.164-nummer",
              credit_card: "kredittkortnummer",
              jwt: "JWT",
              template_literal: "input",
            }),
            (i = { nan: "NaN", number: "tal", array: "liste" }),
            (r) => {
              switch (r.code) {
                case "invalid_type": {
                  let e = i[r.expected] ?? r.expected,
                    t = a.parsedType(r.input),
                    n = i[t] ?? t;
                  if (/^[A-Z]/.test(r.expected))
                    return `Ugyldig input: forventa instanceof ${r.expected}, fekk ${n}`;
                  return `Ugyldig input: forventa ${e}, fekk ${n}`;
                }
                case "invalid_value":
                  if (1 === r.values.length)
                    return `Ugyldig verdi: forventa ${a.stringifyPrimitive(r.values[0])}`;
                  return `Ugyldig val: forventa eitt av ${a.joinValues(r.values, "|")}`;
                case "too_big": {
                  let t = r.inclusive ? "<=" : "<",
                    i = e[r.origin] ?? null;
                  if (i)
                    return `For stor(t): forventa ${r.origin ?? "value"} til \xe5 ha ${t}${r.maximum.toString()} ${i.unit ?? "element"}`;
                  return `For stor(t): forventa ${r.origin ?? "value"} til \xe5 ha ${t}${r.maximum.toString()}`;
                }
                case "too_small": {
                  let t = r.inclusive ? ">=" : ">",
                    i = e[r.origin] ?? null;
                  if (i)
                    return `For lite(n): forventa ${r.origin} til \xe5 ha ${t}${r.minimum.toString()} ${i.unit}`;
                  return `For lite(n): forventa ${r.origin} til \xe5 ha ${t}${r.minimum.toString()}`;
                }
                case "invalid_format":
                  if ("starts_with" === r.format)
                    return `Ugyldig streng: m\xe5 starte med "${r.prefix}"`;
                  if ("ends_with" === r.format)
                    return `Ugyldig streng: m\xe5 slutte med "${r.suffix}"`;
                  if ("includes" === r.format)
                    return `Ugyldig streng: m\xe5 innehalde "${r.includes}"`;
                  if ("regex" === r.format)
                    return `Ugyldig streng: m\xe5 matche m\xf8nsteret ${r.pattern}`;
                  return `Ugyldig ${t[r.format] ?? r.format}`;
                case "not_multiple_of":
                  return `Ugyldig tal: m\xe5 vere eit multiplum av ${r.divisor}`;
                case "unrecognized_keys":
                  return `${r.keys.length > 1 ? "Ukjende nøklar" : "Ukjend nøkkel"}: ${a.joinValues(r.keys, ", ")}`;
                case "invalid_key":
                  return `Ugyldig n\xf8kkel i ${r.origin}`;
                case "invalid_union":
                default:
                  return "Ugyldig input";
                case "invalid_element":
                  return `Ugyldig verdi i ${r.origin}`;
              }
            }),
        };
      },
      "no",
      0,
      function () {
        let e, t, i;
        return {
          localeError:
            ((e = {
              string: { unit: "tegn", verb: "å ha" },
              file: { unit: "bytes", verb: "å ha" },
              array: { unit: "elementer", verb: "å inneholde" },
              set: { unit: "elementer", verb: "å inneholde" },
              map: { unit: "elementer", verb: "å inneholde" },
            }),
            (t = {
              regex: "input",
              email: "e-postadresse",
              url: "URL",
              emoji: "emoji",
              uuid: "UUID",
              uuidv4: "UUIDv4",
              uuidv6: "UUIDv6",
              nanoid: "nanoid",
              guid: "GUID",
              cuid: "cuid",
              cuid2: "cuid2",
              ulid: "ULID",
              xid: "XID",
              ksuid: "KSUID",
              datetime: "ISO dato- og klokkeslett",
              date: "ISO-dato",
              time: "ISO-klokkeslett",
              duration: "ISO-varighet",
              ipv4: "IPv4-adresse",
              ipv6: "IPv6-adresse",
              mac: "MAC-adresse",
              cidrv4: "IPv4-spekter",
              cidrv6: "IPv6-spekter",
              base64: "base64-enkodet streng",
              base64url: "base64url-enkodet streng",
              json_string: "JSON-streng",
              e164: "E.164-nummer",
              credit_card: "kredittkortnummer",
              jwt: "JWT",
              template_literal: "input",
            }),
            (i = { nan: "NaN", number: "tall", array: "liste" }),
            (r) => {
              switch (r.code) {
                case "invalid_type": {
                  let e = i[r.expected] ?? r.expected,
                    t = a.parsedType(r.input),
                    n = i[t] ?? t;
                  if (/^[A-Z]/.test(r.expected))
                    return `Ugyldig input: forventet instanceof ${r.expected}, fikk ${n}`;
                  return `Ugyldig input: forventet ${e}, fikk ${n}`;
                }
                case "invalid_value":
                  if (1 === r.values.length)
                    return `Ugyldig verdi: forventet ${a.stringifyPrimitive(r.values[0])}`;
                  return `Ugyldig valg: forventet en av ${a.joinValues(r.values, "|")}`;
                case "too_big": {
                  let t = r.inclusive ? "<=" : "<",
                    i = e[r.origin] ?? null;
                  if (i)
                    return `For stor(t): forventet ${r.origin ?? "value"} til \xe5 ha ${t}${r.maximum.toString()} ${i.unit ?? "elementer"}`;
                  return `For stor(t): forventet ${r.origin ?? "value"} til \xe5 ha ${t}${r.maximum.toString()}`;
                }
                case "too_small": {
                  let t = r.inclusive ? ">=" : ">",
                    i = e[r.origin] ?? null;
                  if (i)
                    return `For lite(n): forventet ${r.origin} til \xe5 ha ${t}${r.minimum.toString()} ${i.unit}`;
                  return `For lite(n): forventet ${r.origin} til \xe5 ha ${t}${r.minimum.toString()}`;
                }
                case "invalid_format":
                  if ("starts_with" === r.format)
                    return `Ugyldig streng: m\xe5 starte med "${r.prefix}"`;
                  if ("ends_with" === r.format)
                    return `Ugyldig streng: m\xe5 ende med "${r.suffix}"`;
                  if ("includes" === r.format)
                    return `Ugyldig streng: m\xe5 inneholde "${r.includes}"`;
                  if ("regex" === r.format)
                    return `Ugyldig streng: m\xe5 matche m\xf8nsteret ${r.pattern}`;
                  return `Ugyldig ${t[r.format] ?? r.format}`;
                case "not_multiple_of":
                  return `Ugyldig tall: m\xe5 v\xe6re et multiplum av ${r.divisor}`;
                case "unrecognized_keys":
                  return `${r.keys.length > 1 ? "Ukjente nøkler" : "Ukjent nøkkel"}: ${a.joinValues(r.keys, ", ")}`;
                case "invalid_key":
                  return `Ugyldig n\xf8kkel i ${r.origin}`;
                case "invalid_union":
                default:
                  return "Ugyldig input";
                case "invalid_element":
                  return `Ugyldig verdi i ${r.origin}`;
              }
            }),
        };
      },
      "ota",
      0,
      function () {
        let e, t, i;
        return {
          localeError:
            ((e = {
              string: { unit: "harf", verb: "olmalıdır" },
              file: { unit: "bayt", verb: "olmalıdır" },
              array: { unit: "unsur", verb: "olmalıdır" },
              set: { unit: "unsur", verb: "olmalıdır" },
              map: { unit: "unsur", verb: "olmalıdır" },
            }),
            (t = {
              regex: "giren",
              email: "epostagâh",
              url: "URL",
              emoji: "emoji",
              uuid: "UUID",
              uuidv4: "UUIDv4",
              uuidv6: "UUIDv6",
              nanoid: "nanoid",
              guid: "GUID",
              cuid: "cuid",
              cuid2: "cuid2",
              ulid: "ULID",
              xid: "XID",
              ksuid: "KSUID",
              datetime: "ISO hengâmı",
              date: "ISO tarihi",
              time: "ISO zamanı",
              duration: "ISO müddeti",
              ipv4: "IPv4 nişânı",
              ipv6: "IPv6 nişânı",
              mac: "MAC nişânı",
              cidrv4: "IPv4 menzili",
              cidrv6: "IPv6 menzili",
              base64: "base64-şifreli metin",
              base64url: "base64url-şifreli metin",
              json_string: "JSON metin",
              e164: "E.164 sayısı",
              credit_card: "i'tibâr kartı numarası",
              jwt: "JWT",
              template_literal: "giren",
            }),
            (i = { nan: "NaN", number: "numara", array: "saf", null: "gayb" }),
            (r) => {
              switch (r.code) {
                case "invalid_type": {
                  let e = i[r.expected] ?? r.expected,
                    t = a.parsedType(r.input),
                    n = i[t] ?? t;
                  if (/^[A-Z]/.test(r.expected))
                    return `F\xe2sit giren: umulan instanceof ${r.expected}, alınan ${n}`;
                  return `F\xe2sit giren: umulan ${e}, alınan ${n}`;
                }
                case "invalid_value":
                  if (1 === r.values.length)
                    return `F\xe2sit giren: umulan ${a.stringifyPrimitive(r.values[0])}`;
                  return `F\xe2sit tercih: m\xfbteberler ${a.joinValues(r.values, "|")}`;
                case "too_big": {
                  let t = r.inclusive ? "<=" : "<",
                    i = e[r.origin] ?? null;
                  if (i)
                    return `Fazla b\xfcy\xfck: ${r.origin ?? "value"}, ${t}${r.maximum.toString()} ${i.unit ?? "elements"} sahip olmalıydı.`;
                  return `Fazla b\xfcy\xfck: ${r.origin ?? "value"}, ${t}${r.maximum.toString()} olmalıydı.`;
                }
                case "too_small": {
                  let t = r.inclusive ? ">=" : ">",
                    i = e[r.origin] ?? null;
                  if (i)
                    return `Fazla k\xfc\xe7\xfck: ${r.origin}, ${t}${r.minimum.toString()} ${i.unit} sahip olmalıydı.`;
                  return `Fazla k\xfc\xe7\xfck: ${r.origin}, ${t}${r.minimum.toString()} olmalıydı.`;
                }
                case "invalid_format":
                  if ("starts_with" === r.format)
                    return `F\xe2sit metin: "${r.prefix}" ile başlamalı.`;
                  if ("ends_with" === r.format)
                    return `F\xe2sit metin: "${r.suffix}" ile bitmeli.`;
                  if ("includes" === r.format)
                    return `F\xe2sit metin: "${r.includes}" ihtiv\xe2 etmeli.`;
                  if ("regex" === r.format)
                    return `F\xe2sit metin: ${r.pattern} nakşına uymalı.`;
                  return `F\xe2sit ${t[r.format] ?? r.format}`;
                case "not_multiple_of":
                  return `F\xe2sit sayı: ${r.divisor} katı olmalıydı.`;
                case "unrecognized_keys":
                  return `Tanınmayan anahtar ${r.keys.length > 1 ? "s" : ""}: ${a.joinValues(r.keys, ", ")}`;
                case "invalid_key":
                  return `${r.origin} i\xe7in tanınmayan anahtar var.`;
                case "invalid_union":
                  return "Giren tanınamadı.";
                case "invalid_element":
                  return `${r.origin} i\xe7in tanınmayan kıymet var.`;
                default:
                  return "Kıymet tanınamadı.";
              }
            }),
        };
      },
      "pl",
      0,
      function () {
        let e, t, i;
        return {
          localeError:
            ((e = {
              string: { unit: "znaków", verb: "mieć" },
              file: { unit: "bajtów", verb: "mieć" },
              array: { unit: "elementów", verb: "mieć" },
              set: { unit: "elementów", verb: "mieć" },
              map: { unit: "elementów", verb: "mieć" },
            }),
            (t = {
              regex: "wyrażenie",
              email: "adres email",
              url: "URL",
              emoji: "emoji",
              uuid: "UUID",
              uuidv4: "UUIDv4",
              uuidv6: "UUIDv6",
              nanoid: "nanoid",
              guid: "GUID",
              cuid: "cuid",
              cuid2: "cuid2",
              ulid: "ULID",
              xid: "XID",
              ksuid: "KSUID",
              datetime: "data i godzina w formacie ISO",
              date: "data w formacie ISO",
              time: "godzina w formacie ISO",
              duration: "czas trwania ISO",
              ipv4: "adres IPv4",
              ipv6: "adres IPv6",
              mac: "adres MAC",
              cidrv4: "zakres IPv4",
              cidrv6: "zakres IPv6",
              base64: "ciąg znaków zakodowany w formacie base64",
              base64url: "ciąg znaków zakodowany w formacie base64url",
              json_string: "ciąg znaków w formacie JSON",
              e164: "liczba E.164",
              credit_card: "numer karty kredytowej",
              jwt: "JWT",
              template_literal: "wejście",
            }),
            (i = { nan: "NaN", number: "liczba", array: "tablica" }),
            (r) => {
              switch (r.code) {
                case "invalid_type": {
                  let e = i[r.expected] ?? r.expected,
                    t = a.parsedType(r.input),
                    n = i[t] ?? t;
                  if (/^[A-Z]/.test(r.expected))
                    return `Nieprawidłowe dane wejściowe: oczekiwano instanceof ${r.expected}, otrzymano ${n}`;
                  return `Nieprawidłowe dane wejściowe: oczekiwano ${e}, otrzymano ${n}`;
                }
                case "invalid_value":
                  if (1 === r.values.length)
                    return `Nieprawidłowe dane wejściowe: oczekiwano ${a.stringifyPrimitive(r.values[0])}`;
                  return `Nieprawidłowa opcja: oczekiwano jednej z wartości ${a.joinValues(r.values, "|")}`;
                case "too_big": {
                  let t = r.inclusive ? "<=" : "<",
                    i = e[r.origin] ?? null;
                  if (i)
                    return `Za duża wartość: oczekiwano, że ${r.origin ?? "wartość"} będzie mieć ${t}${r.maximum.toString()} ${i.unit ?? "elementów"}`;
                  return `Zbyt duż(y/a/e): oczekiwano, że ${r.origin ?? "wartość"} będzie wynosić ${t}${r.maximum.toString()}`;
                }
                case "too_small": {
                  let t = r.inclusive ? ">=" : ">",
                    i = e[r.origin] ?? null;
                  if (i)
                    return `Za mała wartość: oczekiwano, że ${r.origin ?? "wartość"} będzie mieć ${t}${r.minimum.toString()} ${i.unit ?? "elementów"}`;
                  return `Zbyt mał(y/a/e): oczekiwano, że ${r.origin ?? "wartość"} będzie wynosić ${t}${r.minimum.toString()}`;
                }
                case "invalid_format":
                  if ("starts_with" === r.format)
                    return `Nieprawidłowy ciąg znak\xf3w: musi zaczynać się od "${r.prefix}"`;
                  if ("ends_with" === r.format)
                    return `Nieprawidłowy ciąg znak\xf3w: musi kończyć się na "${r.suffix}"`;
                  if ("includes" === r.format)
                    return `Nieprawidłowy ciąg znak\xf3w: musi zawierać "${r.includes}"`;
                  if ("regex" === r.format)
                    return `Nieprawidłowy ciąg znak\xf3w: musi odpowiadać wzorcowi ${r.pattern}`;
                  return `Nieprawidłow(y/a/e) ${t[r.format] ?? r.format}`;
                case "not_multiple_of":
                  return `Nieprawidłowa liczba: musi być wielokrotnością ${r.divisor}`;
                case "unrecognized_keys":
                  return `Nierozpoznane klucze${r.keys.length > 1 ? "s" : ""}: ${a.joinValues(r.keys, ", ")}`;
                case "invalid_key":
                  return `Nieprawidłowy klucz w ${r.origin}`;
                case "invalid_union":
                default:
                  return "Nieprawidłowe dane wejściowe";
                case "invalid_element":
                  return `Nieprawidłowa wartość w ${r.origin}`;
              }
            }),
        };
      },
      "ps",
      0,
      function () {
        let e, t, i;
        return {
          localeError:
            ((e = {
              string: { unit: "توکي", verb: "ولري" },
              file: { unit: "بایټس", verb: "ولري" },
              array: { unit: "توکي", verb: "ولري" },
              set: { unit: "توکي", verb: "ولري" },
              map: { unit: "توکي", verb: "ولري" },
            }),
            (t = {
              regex: "ورودي",
              email: "بریښنالیک",
              url: "یو آر ال",
              emoji: "ایموجي",
              uuid: "UUID",
              uuidv4: "UUIDv4",
              uuidv6: "UUIDv6",
              nanoid: "nanoid",
              guid: "GUID",
              cuid: "cuid",
              cuid2: "cuid2",
              ulid: "ULID",
              xid: "XID",
              ksuid: "KSUID",
              datetime: "نیټه او وخت",
              date: "نېټه",
              time: "وخت",
              duration: "موده",
              ipv4: "د IPv4 پته",
              ipv6: "د IPv6 پته",
              mac: "د MAC پته",
              cidrv4: "د IPv4 ساحه",
              cidrv6: "د IPv6 ساحه",
              base64: "base64-encoded متن",
              base64url: "base64url-encoded متن",
              json_string: "JSON متن",
              e164: "د E.164 شمېره",
              credit_card: "د کریډیټ کارت شمیره",
              jwt: "JWT",
              template_literal: "ورودي",
            }),
            (i = { nan: "NaN", number: "عدد", array: "ارې" }),
            (r) => {
              switch (r.code) {
                case "invalid_type": {
                  let e = i[r.expected] ?? r.expected,
                    t = a.parsedType(r.input),
                    n = i[t] ?? t;
                  if (/^[A-Z]/.test(r.expected))
                    return `ناسم ورودي: باید instanceof ${r.expected} وای, مګر ${n} ترلاسه شو`;
                  return `ناسم ورودي: باید ${e} وای, مګر ${n} ترلاسه شو`;
                }
                case "invalid_value":
                  if (1 === r.values.length)
                    return `ناسم ورودي: باید ${a.stringifyPrimitive(r.values[0])} وای`;
                  return `ناسم انتخاب: باید یو له ${a.joinValues(r.values, "|")} څخه وای`;
                case "too_big": {
                  let t = r.inclusive ? "<=" : "<",
                    i = e[r.origin] ?? null;
                  if (i)
                    return `ډیر لوی: ${r.origin ?? "ارزښت"} باید ${t}${r.maximum.toString()} ${i.unit ?? "عنصرونه"} ولري`;
                  return `ډیر لوی: ${r.origin ?? "ارزښت"} باید ${t}${r.maximum.toString()} وي`;
                }
                case "too_small": {
                  let t = r.inclusive ? ">=" : ">",
                    i = e[r.origin] ?? null;
                  if (i)
                    return `ډیر کوچنی: ${r.origin} باید ${t}${r.minimum.toString()} ${i.unit} ولري`;
                  return `ډیر کوچنی: ${r.origin} باید ${t}${r.minimum.toString()} وي`;
                }
                case "invalid_format":
                  if ("starts_with" === r.format)
                    return `ناسم متن: باید د "${r.prefix}" سره پیل شي`;
                  if ("ends_with" === r.format)
                    return `ناسم متن: باید د "${r.suffix}" سره پای ته ورسيږي`;
                  if ("includes" === r.format)
                    return `ناسم متن: باید "${r.includes}" ولري`;
                  if ("regex" === r.format)
                    return `ناسم متن: باید د ${r.pattern} سره مطابقت ولري`;
                  return `${t[r.format] ?? r.format} ناسم دی`;
                case "not_multiple_of":
                  return `ناسم عدد: باید د ${r.divisor} مضرب وي`;
                case "unrecognized_keys":
                  return `ناسم ${r.keys.length > 1 ? "کلیډونه" : "کلیډ"}: ${a.joinValues(r.keys, ", ")}`;
                case "invalid_key":
                  return `ناسم کلیډ په ${r.origin} کې`;
                case "invalid_union":
                default:
                  return "ناسمه ورودي";
                case "invalid_element":
                  return `ناسم عنصر په ${r.origin} کې`;
              }
            }),
        };
      },
      "pt",
      0,
      function () {
        return {
          localeError: (() => {
            let e = {
                string: { unit: "caracteres" },
                file: { unit: "bytes" },
                array: { unit: "elementos" },
                set: { unit: "elementos" },
                map: { unit: "entradas" },
              },
              t = {
                regex: "a entrada",
                email: "o endereço de e-mail",
                url: "o URL",
                emoji: "o emoji",
                uuid: "o UUID",
                uuidv4: "o UUIDv4",
                uuidv6: "o UUIDv6",
                nanoid: "o nanoid",
                guid: "o GUID",
                cuid: "o cuid",
                cuid2: "o cuid2",
                ulid: "o ULID",
                xid: "o XID",
                ksuid: "o KSUID",
                datetime: "a data e hora ISO",
                date: "a data ISO",
                time: "a hora ISO",
                duration: "a duração ISO",
                ipv4: "o endereço IPv4",
                ipv6: "o endereço IPv6",
                mac: "o endereço MAC",
                cidrv4: "o intervalo de endereços IPv4",
                cidrv6: "o intervalo de endereços IPv6",
                base64: "o texto codificado em base64",
                base64url: "o texto codificado em base64url",
                json_string: "o texto JSON",
                e164: "o número E.164",
                credit_card: "o número de cartão de crédito",
                jwt: "o JWT",
                template_literal: "a entrada",
              },
              i = { definite: "o", indefinite: "um" },
              r = { definite: "a", indefinite: "uma" },
              n = {
                string: { name: "texto", articles: i },
                number: { name: "número", articles: i },
                int: { name: "número inteiro", articles: i },
                boolean: { name: "valor booleano", articles: i },
                bigint: { name: "número bigint", articles: i },
                symbol: { name: "símbolo", articles: i },
                undefined: { name: 'valor "undefined"', articles: i },
                null: { name: 'valor "nulo"', articles: i },
                never: { name: 'valor "never"', articles: i },
                void: { name: 'valor "void"', articles: i },
                date: { name: "data", articles: r },
                array: { name: "vetor", articles: i },
                object: { name: "objeto", articles: i },
                tuple: { name: "tuplo", articles: i },
                record: { name: "registo", articles: i },
                map: { name: "mapa", articles: i },
                set: { name: "conjunto", articles: i },
                file: { name: "ficheiro", articles: i },
                nonoptional: { name: "valor não opcional", articles: i },
                nan: { name: 'valor "NaN"', articles: i },
                function: { name: "função", articles: r },
              };
            function o(e, t) {
              let r = n[e] ?? { name: `valor "${e}"`, articles: i };
              return `${r.articles[t]} ${r.name}`;
            }
            return (i) => {
              switch (i.code) {
                case "invalid_type": {
                  let e = o(i.expected, "indefinite"),
                    t = o(a.parsedType(i.input), "indefinite");
                  return `Entrada inv\xe1lida: esperava ${e}, recebeu ${t}`;
                }
                case "invalid_value":
                  if (1 === i.values.length)
                    return `Entrada inv\xe1lida: esperava ${a.stringifyPrimitive(i.values[0])}`;
                  return `Op\xe7\xe3o inv\xe1lida: esperava uma das seguintes op\xe7\xf5es: ${a.joinValues(i.values, "|")}`;
                case "too_big": {
                  let t = i.inclusive ? "<=" : "<",
                    r = e[i.origin] ?? null;
                  if (r)
                    return `Demasiado grande: esperava que ${o(i.origin, "definite")} tivesse ${t} ${i.maximum.toString()} ${r.unit ?? "elementos"}`;
                  return `Demasiado grande: esperava que ${o(i.origin, "definite")} fosse ${t} ${i.maximum.toString()}`;
                }
                case "too_small": {
                  let t = i.inclusive ? ">=" : ">",
                    r = e[i.origin] ?? null;
                  if (r)
                    return `Demasiado pequeno: esperava que ${o(i.origin, "definite")} tivesse ${t} ${i.minimum.toString()} ${r.unit ?? "elementos"}`;
                  return `Demasiado pequeno: esperava que ${o(i.origin, "definite")} fosse ${t} ${i.minimum.toString()}`;
                }
                case "invalid_format":
                  if ("starts_with" === i.format)
                    return `Texto inv\xe1lido: deve come\xe7ar por "${i.prefix}"`;
                  if ("ends_with" === i.format)
                    return `Texto inv\xe1lido: deve terminar em "${i.suffix}"`;
                  if ("includes" === i.format)
                    return `Texto inv\xe1lido: deve incluir "${i.includes}"`;
                  if ("regex" === i.format)
                    return `Texto inv\xe1lido: deve corresponder ao padr\xe3o ${i.pattern}`;
                  return `Formato d${t[i.format] ?? i.format} inv\xe1lido`;
                case "not_multiple_of":
                  return `N\xfamero inv\xe1lido: deve ser m\xfaltiplo de ${i.divisor}`;
                case "unrecognized_keys": {
                  let e = i.keys.length > 1 ? "s" : "";
                  return `Chave${e} inv\xe1lida${e}: ${a.joinValues(i.keys, ", ")}`;
                }
                case "invalid_key":
                case "invalid_element":
                  return `Entrada inv\xe1lida n${o(i.origin, "definite")}`;
                case "invalid_union":
                  if (
                    i.options &&
                    Array.isArray(i.options) &&
                    i.options.length > 0
                  ) {
                    let e = i.options.map((e) => `'${e}'`).join(" | ");
                    return `Valor de discrimina\xe7\xe3o inv\xe1lido. Esperava ${e}`;
                  }
                  return "Entrada inválida";
                default:
                  return "Entrada inválida";
              }
            };
          })(),
        };
      },
      "ptBR",
      0,
      function () {
        return {
          localeError: (() => {
            let e = {
                string: { unit: "caracteres" },
                file: { unit: "bytes" },
                array: { unit: "elementos" },
                set: { unit: "elementos" },
                map: { unit: "entradas" },
              },
              t = {
                regex: "a entrada",
                email: "o endereço de e-mail",
                url: "o URL",
                emoji: "o emoji",
                uuid: "o UUID",
                uuidv4: "o UUIDv4",
                uuidv6: "o UUIDv6",
                nanoid: "o nanoid",
                guid: "o GUID",
                cuid: "o cuid",
                cuid2: "o cuid2",
                ulid: "o ULID",
                xid: "o XID",
                ksuid: "o KSUID",
                datetime: "a data e hora ISO",
                date: "a data ISO",
                time: "a hora ISO",
                duration: "a duração ISO",
                ipv4: "o endereço IPv4",
                ipv6: "o endereço IPv6",
                mac: "o endereço MAC",
                cidrv4: "a faixa de endereços IPv4",
                cidrv6: "a faixa de endereços IPv6",
                base64: "o texto codificado em base64",
                base64url: "o texto codificado em base64url",
                json_string: "o texto JSON",
                e164: "o número E.164",
                credit_card: "o número de cartão de crédito",
                jwt: "o JWT",
                template_literal: "a entrada",
              },
              i = { definite: "o", indefinite: "um" },
              r = { definite: "a", indefinite: "uma" },
              n = {
                string: { name: "texto", articles: i },
                number: { name: "número", articles: i },
                int: { name: "número inteiro", articles: i },
                boolean: { name: "valor booleano", articles: i },
                bigint: { name: "número bigint", articles: i },
                symbol: { name: "símbolo", articles: i },
                undefined: { name: 'valor "undefined"', articles: i },
                null: { name: 'valor "nulo"', articles: i },
                never: { name: 'valor "never"', articles: i },
                void: { name: 'valor "void"', articles: i },
                date: { name: "data", articles: r },
                array: { name: "vetor", articles: i },
                object: { name: "objeto", articles: i },
                tuple: { name: "tupla", articles: r },
                record: { name: "registro", articles: i },
                map: { name: "mapa", articles: i },
                set: { name: "conjunto", articles: i },
                file: { name: "arquivo", articles: i },
                nonoptional: { name: "valor não opcional", articles: i },
                nan: { name: 'valor "NaN"', articles: i },
                function: { name: "função", articles: r },
              };
            function o(e, t) {
              let r = n[e] ?? { name: `valor "${e}"`, articles: i };
              return `${r.articles[t]} ${r.name}`;
            }
            return (i) => {
              switch (i.code) {
                case "invalid_type": {
                  let e = o(i.expected, "indefinite"),
                    t = o(a.parsedType(i.input), "indefinite");
                  return `Entrada inv\xe1lida: esperava ${e}, recebeu ${t}`;
                }
                case "invalid_value":
                  if (1 === i.values.length)
                    return `Entrada inv\xe1lida: esperava ${a.stringifyPrimitive(i.values[0])}`;
                  return `Op\xe7\xe3o inv\xe1lida: esperava uma das seguintes op\xe7\xf5es: ${a.joinValues(i.values, "|")}`;
                case "too_big": {
                  let t = i.inclusive ? "<=" : "<",
                    r = e[i.origin] ?? null;
                  if (r)
                    return `Grande demais: esperava que ${o(i.origin, "definite")} tivesse ${t} ${i.maximum.toString()} ${r.unit ?? "elementos"}`;
                  return `Grande demais: esperava que ${o(i.origin, "definite")} fosse ${t} ${i.maximum.toString()}`;
                }
                case "too_small": {
                  let t = i.inclusive ? ">=" : ">",
                    r = e[i.origin] ?? null;
                  if (r)
                    return `Pequeno demais: esperava que ${o(i.origin, "definite")} tivesse ${t} ${i.minimum.toString()} ${r.unit ?? "elementos"}`;
                  return `Pequeno demais: esperava que ${o(i.origin, "definite")} fosse ${t} ${i.minimum.toString()}`;
                }
                case "invalid_format":
                  if ("starts_with" === i.format)
                    return `Texto inv\xe1lido: deve come\xe7ar com "${i.prefix}"`;
                  if ("ends_with" === i.format)
                    return `Texto inv\xe1lido: deve terminar com "${i.suffix}"`;
                  if ("includes" === i.format)
                    return `Texto inv\xe1lido: deve incluir "${i.includes}"`;
                  if ("regex" === i.format)
                    return `Texto inv\xe1lido: deve corresponder ao padr\xe3o ${i.pattern}`;
                  return `Formato d${t[i.format] ?? i.format} inv\xe1lido`;
                case "not_multiple_of":
                  return `N\xfamero inv\xe1lido: deve ser m\xfaltiplo de ${i.divisor}`;
                case "unrecognized_keys": {
                  let e = i.keys.length > 1 ? "s" : "";
                  return `Chave${e} inv\xe1lida${e}: ${a.joinValues(i.keys, ", ")}`;
                }
                case "invalid_key":
                case "invalid_element":
                  return `Entrada inv\xe1lida n${o(i.origin, "definite")}`;
                case "invalid_union":
                  if (
                    i.options &&
                    Array.isArray(i.options) &&
                    i.options.length > 0
                  ) {
                    let e = i.options.map((e) => `'${e}'`).join(" | ");
                    return `Valor de discrimina\xe7\xe3o inv\xe1lido. Esperava ${e}`;
                  }
                  return "Entrada inválida";
                default:
                  return "Entrada inválida";
              }
            };
          })(),
        };
      },
      "ro",
      0,
      function () {
        let e, t, i;
        return {
          localeError:
            ((e = {
              string: { unit: "caractere", verb: "să aibă" },
              file: { unit: "octeți", verb: "să aibă" },
              array: { unit: "elemente", verb: "să aibă" },
              set: { unit: "elemente", verb: "să aibă" },
              map: { unit: "intrări", verb: "să aibă" },
            }),
            (t = {
              regex: "intrare",
              email: "adresă de email",
              url: "URL",
              emoji: "emoji",
              uuid: "UUID",
              uuidv4: "UUIDv4",
              uuidv6: "UUIDv6",
              nanoid: "nanoid",
              guid: "GUID",
              cuid: "cuid",
              cuid2: "cuid2",
              ulid: "ULID",
              xid: "XID",
              ksuid: "KSUID",
              datetime: "dată și oră ISO",
              date: "dată ISO",
              time: "oră ISO",
              duration: "durată ISO",
              ipv4: "adresă IPv4",
              ipv6: "adresă IPv6",
              mac: "adresă MAC",
              cidrv4: "interval IPv4",
              cidrv6: "interval IPv6",
              base64: "șir codat base64",
              base64url: "șir codat base64url",
              json_string: "șir JSON",
              e164: "număr E.164",
              credit_card: "număr de card de credit",
              jwt: "JWT",
              template_literal: "intrare",
            }),
            (i = {
              nan: "NaN",
              string: "șir",
              number: "număr",
              boolean: "boolean",
              function: "funcție",
              array: "matrice",
              object: "obiect",
              undefined: "nedefinit",
              symbol: "simbol",
              bigint: "număr mare",
              void: "void",
              never: "never",
              map: "hartă",
              set: "set",
            }),
            (r) => {
              switch (r.code) {
                case "invalid_type": {
                  let e = i[r.expected] ?? r.expected,
                    t = a.parsedType(r.input),
                    n = i[t] ?? t;
                  return `Intrare invalidă: așteptat ${e}, primit ${n}`;
                }
                case "invalid_value":
                  if (1 === r.values.length)
                    return `Intrare invalidă: așteptat ${a.stringifyPrimitive(r.values[0])}`;
                  return `Opțiune invalidă: așteptat una dintre ${a.joinValues(r.values, "|")}`;
                case "too_big": {
                  let t = r.inclusive ? "<=" : "<",
                    i = e[r.origin] ?? null;
                  if (i)
                    return `Prea mare: așteptat ca ${r.origin ?? "valoarea"} ${i.verb} ${t}${r.maximum.toString()} ${i.unit ?? "elemente"}`;
                  return `Prea mare: așteptat ca ${r.origin ?? "valoarea"} să fie ${t}${r.maximum.toString()}`;
                }
                case "too_small": {
                  let t = r.inclusive ? ">=" : ">",
                    i = e[r.origin] ?? null;
                  if (i)
                    return `Prea mic: așteptat ca ${r.origin} ${i.verb} ${t}${r.minimum.toString()} ${i.unit}`;
                  return `Prea mic: așteptat ca ${r.origin} să fie ${t}${r.minimum.toString()}`;
                }
                case "invalid_format":
                  if ("starts_with" === r.format)
                    return `Șir invalid: trebuie să \xeenceapă cu "${r.prefix}"`;
                  if ("ends_with" === r.format)
                    return `Șir invalid: trebuie să se termine cu "${r.suffix}"`;
                  if ("includes" === r.format)
                    return `Șir invalid: trebuie să includă "${r.includes}"`;
                  if ("regex" === r.format)
                    return `Șir invalid: trebuie să se potrivească cu modelul ${r.pattern}`;
                  return `Format invalid: ${t[r.format] ?? r.format}`;
                case "not_multiple_of":
                  return `Număr invalid: trebuie să fie multiplu de ${r.divisor}`;
                case "unrecognized_keys":
                  return `Chei nerecunoscute: ${a.joinValues(r.keys, ", ")}`;
                case "invalid_key":
                  return `Cheie invalidă \xeen ${r.origin}`;
                case "invalid_union":
                default:
                  return "Intrare invalidă";
                case "invalid_element":
                  return `Valoare invalidă \xeen ${r.origin}`;
              }
            }),
        };
      },
      "ru",
      0,
      function () {
        let e, t, i;
        return {
          localeError:
            ((e = {
              string: {
                unit: { one: "символ", few: "символа", many: "символов" },
                verb: "иметь",
              },
              file: {
                unit: { one: "байт", few: "байта", many: "байт" },
                verb: "иметь",
              },
              array: {
                unit: { one: "элемент", few: "элемента", many: "элементов" },
                verb: "иметь",
              },
              set: {
                unit: { one: "элемент", few: "элемента", many: "элементов" },
                verb: "иметь",
              },
              map: {
                unit: { one: "элемент", few: "элемента", many: "элементов" },
                verb: "иметь",
              },
            }),
            (t = {
              regex: "ввод",
              email: "email адрес",
              url: "URL",
              emoji: "эмодзи",
              uuid: "UUID",
              uuidv4: "UUIDv4",
              uuidv6: "UUIDv6",
              nanoid: "nanoid",
              guid: "GUID",
              cuid: "cuid",
              cuid2: "cuid2",
              ulid: "ULID",
              xid: "XID",
              ksuid: "KSUID",
              datetime: "ISO дата и время",
              date: "ISO дата",
              time: "ISO время",
              duration: "ISO длительность",
              ipv4: "IPv4 адрес",
              ipv6: "IPv6 адрес",
              mac: "MAC адрес",
              cidrv4: "IPv4 диапазон",
              cidrv6: "IPv6 диапазон",
              base64: "строка в формате base64",
              base64url: "строка в формате base64url",
              json_string: "JSON строка",
              e164: "номер E.164",
              credit_card: "номер кредитной карты",
              jwt: "JWT",
              template_literal: "ввод",
            }),
            (i = { nan: "NaN", number: "число", array: "массив" }),
            (r) => {
              switch (r.code) {
                case "invalid_type": {
                  let e = i[r.expected] ?? r.expected,
                    t = a.parsedType(r.input),
                    n = i[t] ?? t;
                  if (/^[A-Z]/.test(r.expected))
                    return `Неверный ввод: ожидалось instanceof ${r.expected}, получено ${n}`;
                  return `Неверный ввод: ожидалось ${e}, получено ${n}`;
                }
                case "invalid_value":
                  if (1 === r.values.length)
                    return `Неверный ввод: ожидалось ${a.stringifyPrimitive(r.values[0])}`;
                  return `Неверный вариант: ожидалось одно из ${a.joinValues(r.values, "|")}`;
                case "too_big": {
                  let t = r.inclusive ? "<=" : "<",
                    i = e[r.origin] ?? null;
                  if (i) {
                    let e = rh(
                      Number(r.maximum),
                      i.unit.one,
                      i.unit.few,
                      i.unit.many,
                    );
                    return `Слишком большое значение: ожидалось, что ${r.origin ?? "значение"} будет иметь ${t}${r.maximum.toString()} ${e}`;
                  }
                  return `Слишком большое значение: ожидалось, что ${r.origin ?? "значение"} будет ${t}${r.maximum.toString()}`;
                }
                case "too_small": {
                  let t = r.inclusive ? ">=" : ">",
                    i = e[r.origin] ?? null;
                  if (i) {
                    let e = rh(
                      Number(r.minimum),
                      i.unit.one,
                      i.unit.few,
                      i.unit.many,
                    );
                    return `Слишком маленькое значение: ожидалось, что ${r.origin} будет иметь ${t}${r.minimum.toString()} ${e}`;
                  }
                  return `Слишком маленькое значение: ожидалось, что ${r.origin} будет ${t}${r.minimum.toString()}`;
                }
                case "invalid_format":
                  if ("starts_with" === r.format)
                    return `Неверная строка: должна начинаться с "${r.prefix}"`;
                  if ("ends_with" === r.format)
                    return `Неверная строка: должна заканчиваться на "${r.suffix}"`;
                  if ("includes" === r.format)
                    return `Неверная строка: должна содержать "${r.includes}"`;
                  if ("regex" === r.format)
                    return `Неверная строка: должна соответствовать шаблону ${r.pattern}`;
                  return `Неверный ${t[r.format] ?? r.format}`;
                case "not_multiple_of":
                  return `Неверное число: должно быть кратным ${r.divisor}`;
                case "unrecognized_keys":
                  return `Нераспознанн${r.keys.length > 1 ? "ые" : "ый"} ключ${r.keys.length > 1 ? "и" : ""}: ${a.joinValues(r.keys, ", ")}`;
                case "invalid_key":
                  return `Неверный ключ в ${r.origin}`;
                case "invalid_union":
                default:
                  return "Неверные входные данные";
                case "invalid_element":
                  return `Неверное значение в ${r.origin}`;
              }
            }),
        };
      },
      "sk",
      0,
      function () {
        let e, t, i;
        return {
          localeError:
            ((e = {
              string: { unit: "znakov", verb: "mať" },
              file: { unit: "bajtov", verb: "mať" },
              array: { unit: "prvkov", verb: "mať" },
              set: { unit: "prvkov", verb: "mať" },
              map: { unit: "položiek", verb: "mať" },
            }),
            (t = {
              regex: "regulárny výraz",
              email: "e-mailová adresa",
              url: "URL",
              emoji: "emoji",
              uuid: "UUID",
              uuidv4: "UUIDv4",
              uuidv6: "UUIDv6",
              nanoid: "nanoid",
              guid: "GUID",
              cuid: "cuid",
              cuid2: "cuid2",
              ulid: "ULID",
              xid: "XID",
              ksuid: "KSUID",
              datetime: "dátum a čas vo formáte ISO",
              date: "dátum vo formáte ISO",
              time: "čas vo formáte ISO",
              duration: "doba trvania ISO",
              ipv4: "IPv4 adresa",
              ipv6: "IPv6 adresa",
              mac: "MAC adresa",
              cidrv4: "rozsah IPv4",
              cidrv6: "rozsah IPv6",
              base64: "reťazec zakódovaný vo formáte base64",
              base64url: "reťazec zakódovaný vo formáte base64url",
              json_string: "reťazec vo formáte JSON",
              e164: "číslo E.164",
              credit_card: "číslo kreditnej karty",
              jwt: "JWT",
              template_literal: "vstup",
            }),
            (i = {
              nan: "NaN",
              number: "číslo",
              string: "reťazec",
              function: "funkcia",
              array: "pole",
            }),
            (r) => {
              switch (r.code) {
                case "invalid_type": {
                  let e = i[r.expected] ?? r.expected,
                    t = a.parsedType(r.input),
                    n = i[t] ?? t;
                  if (/^[A-Z]/.test(r.expected))
                    return `Neplatn\xfd vstup: očak\xe1van\xe9 instanceof ${r.expected}, obdržan\xe9 ${n}`;
                  return `Neplatn\xfd vstup: očak\xe1van\xe9 ${e}, obdržan\xe9 ${n}`;
                }
                case "invalid_value":
                  if (1 === r.values.length)
                    return `Neplatn\xfd vstup: očak\xe1van\xe9 ${a.stringifyPrimitive(r.values[0])}`;
                  return `Neplatn\xfd vstup: očak\xe1van\xe1 jedna z hodn\xf4t ${a.joinValues(r.values, "|")}`;
                case "too_big": {
                  let t = r.inclusive ? "<=" : "<",
                    i = e[r.origin] ?? null;
                  if (i)
                    return `Hodnota je pr\xedliš veľk\xe1: ${r.origin ?? "hodnota"} mus\xed mať ${t}${r.maximum.toString()} ${i.unit ?? "prvkov"}`;
                  return `Hodnota je pr\xedliš veľk\xe1: ${r.origin ?? "hodnota"} mus\xed byť ${t}${r.maximum.toString()}`;
                }
                case "too_small": {
                  let t = r.inclusive ? ">=" : ">",
                    i = e[r.origin] ?? null;
                  if (i)
                    return `Hodnota je pr\xedliš mal\xe1: ${r.origin ?? "hodnota"} mus\xed mať ${t}${r.minimum.toString()} ${i.unit ?? "prvkov"}`;
                  return `Hodnota je pr\xedliš mal\xe1: ${r.origin ?? "hodnota"} mus\xed byť ${t}${r.minimum.toString()}`;
                }
                case "invalid_format":
                  if ("starts_with" === r.format)
                    return `Neplatn\xfd reťazec: mus\xed zač\xednať na "${r.prefix}"`;
                  if ("ends_with" === r.format)
                    return `Neplatn\xfd reťazec: mus\xed končiť na "${r.suffix}"`;
                  if ("includes" === r.format)
                    return `Neplatn\xfd reťazec: mus\xed obsahovať "${r.includes}"`;
                  if ("regex" === r.format)
                    return `Neplatn\xfd reťazec: mus\xed zodpovedať vzoru ${r.pattern}`;
                  return `Neplatn\xfd form\xe1t ${t[r.format] ?? r.format}`;
                case "not_multiple_of":
                  return `Neplatn\xe9 č\xedslo: mus\xed byť n\xe1sobkom ${r.divisor}`;
                case "unrecognized_keys":
                  return `Nezn\xe1me kl\xfače: ${a.joinValues(r.keys, ", ")}`;
                case "invalid_key":
                  return `Neplatn\xfd kl\xfač v ${r.origin}`;
                case "invalid_union":
                default:
                  return "Neplatný vstup";
                case "invalid_element":
                  return `Neplatn\xe1 hodnota v ${r.origin}`;
              }
            }),
        };
      },
      "sl",
      0,
      function () {
        let e, t, i;
        return {
          localeError:
            ((e = {
              string: { unit: "znakov", verb: "imeti" },
              file: { unit: "bajtov", verb: "imeti" },
              array: { unit: "elementov", verb: "imeti" },
              set: { unit: "elementov", verb: "imeti" },
              map: { unit: "elementov", verb: "imeti" },
            }),
            (t = {
              regex: "vnos",
              email: "e-poštni naslov",
              url: "URL",
              emoji: "emoji",
              uuid: "UUID",
              uuidv4: "UUIDv4",
              uuidv6: "UUIDv6",
              nanoid: "nanoid",
              guid: "GUID",
              cuid: "cuid",
              cuid2: "cuid2",
              ulid: "ULID",
              xid: "XID",
              ksuid: "KSUID",
              datetime: "ISO datum in čas",
              date: "ISO datum",
              time: "ISO čas",
              duration: "ISO trajanje",
              ipv4: "IPv4 naslov",
              ipv6: "IPv6 naslov",
              mac: "MAC naslov",
              cidrv4: "obseg IPv4",
              cidrv6: "obseg IPv6",
              base64: "base64 kodiran niz",
              base64url: "base64url kodiran niz",
              json_string: "JSON niz",
              e164: "E.164 številka",
              credit_card: "številka kreditne kartice",
              jwt: "JWT",
              template_literal: "vnos",
            }),
            (i = { nan: "NaN", number: "število", array: "tabela" }),
            (r) => {
              switch (r.code) {
                case "invalid_type": {
                  let e = i[r.expected] ?? r.expected,
                    t = a.parsedType(r.input),
                    n = i[t] ?? t;
                  if (/^[A-Z]/.test(r.expected))
                    return `Neveljaven vnos: pričakovano instanceof ${r.expected}, prejeto ${n}`;
                  return `Neveljaven vnos: pričakovano ${e}, prejeto ${n}`;
                }
                case "invalid_value":
                  if (1 === r.values.length)
                    return `Neveljaven vnos: pričakovano ${a.stringifyPrimitive(r.values[0])}`;
                  return `Neveljavna možnost: pričakovano eno izmed ${a.joinValues(r.values, "|")}`;
                case "too_big": {
                  let t = r.inclusive ? "<=" : "<",
                    i = e[r.origin] ?? null;
                  if (i)
                    return `Preveliko: pričakovano, da bo ${r.origin ?? "vrednost"} imelo ${t}${r.maximum.toString()} ${i.unit ?? "elementov"}`;
                  return `Preveliko: pričakovano, da bo ${r.origin ?? "vrednost"} ${t}${r.maximum.toString()}`;
                }
                case "too_small": {
                  let t = r.inclusive ? ">=" : ">",
                    i = e[r.origin] ?? null;
                  if (i)
                    return `Premajhno: pričakovano, da bo ${r.origin} imelo ${t}${r.minimum.toString()} ${i.unit}`;
                  return `Premajhno: pričakovano, da bo ${r.origin} ${t}${r.minimum.toString()}`;
                }
                case "invalid_format":
                  if ("starts_with" === r.format)
                    return `Neveljaven niz: mora se začeti z "${r.prefix}"`;
                  if ("ends_with" === r.format)
                    return `Neveljaven niz: mora se končati z "${r.suffix}"`;
                  if ("includes" === r.format)
                    return `Neveljaven niz: mora vsebovati "${r.includes}"`;
                  if ("regex" === r.format)
                    return `Neveljaven niz: mora ustrezati vzorcu ${r.pattern}`;
                  return `Neveljaven ${t[r.format] ?? r.format}`;
                case "not_multiple_of":
                  return `Neveljavno število: mora biti večkratnik ${r.divisor}`;
                case "unrecognized_keys":
                  return `Neprepoznan${r.keys.length > 1 ? "i ključi" : " ključ"}: ${a.joinValues(r.keys, ", ")}`;
                case "invalid_key":
                  return `Neveljaven ključ v ${r.origin}`;
                case "invalid_union":
                default:
                  return "Neveljaven vnos";
                case "invalid_element":
                  return `Neveljavna vrednost v ${r.origin}`;
              }
            }),
        };
      },
      "sv",
      0,
      function () {
        let e, t, i;
        return {
          localeError:
            ((e = {
              string: { unit: "tecken", verb: "att ha" },
              file: { unit: "bytes", verb: "att ha" },
              array: { unit: "objekt", verb: "att innehålla" },
              set: { unit: "objekt", verb: "att innehålla" },
              map: { unit: "objekt", verb: "att innehålla" },
            }),
            (t = {
              regex: "reguljärt uttryck",
              email: "e-postadress",
              url: "URL",
              emoji: "emoji",
              uuid: "UUID",
              uuidv4: "UUIDv4",
              uuidv6: "UUIDv6",
              nanoid: "nanoid",
              guid: "GUID",
              cuid: "cuid",
              cuid2: "cuid2",
              ulid: "ULID",
              xid: "XID",
              ksuid: "KSUID",
              datetime: "ISO-datum och tid",
              date: "ISO-datum",
              time: "ISO-tid",
              duration: "ISO-varaktighet",
              ipv4: "IPv4-adress",
              ipv6: "IPv6-adress",
              mac: "MAC-adress",
              cidrv4: "IPv4-spektrum",
              cidrv6: "IPv6-spektrum",
              base64: "base64-kodad sträng",
              base64url: "base64url-kodad sträng",
              json_string: "JSON-sträng",
              e164: "E.164-nummer",
              credit_card: "kreditkortsnummer",
              jwt: "JWT",
              template_literal: "mall-literal",
            }),
            (i = { nan: "NaN", number: "antal", array: "lista" }),
            (r) => {
              switch (r.code) {
                case "invalid_type": {
                  let e = i[r.expected] ?? r.expected,
                    t = a.parsedType(r.input),
                    n = i[t] ?? t;
                  if (/^[A-Z]/.test(r.expected))
                    return `Ogiltig inmatning: f\xf6rv\xe4ntat instanceof ${r.expected}, fick ${n}`;
                  return `Ogiltig inmatning: f\xf6rv\xe4ntat ${e}, fick ${n}`;
                }
                case "invalid_value":
                  if (1 === r.values.length)
                    return `Ogiltig inmatning: f\xf6rv\xe4ntat ${a.stringifyPrimitive(r.values[0])}`;
                  return `Ogiltigt val: f\xf6rv\xe4ntade en av ${a.joinValues(r.values, "|")}`;
                case "too_big": {
                  let t = r.inclusive ? "<=" : "<",
                    i = e[r.origin] ?? null;
                  if (i)
                    return `F\xf6r stor(t): f\xf6rv\xe4ntade ${r.origin ?? "värdet"} att ha ${t}${r.maximum.toString()} ${i.unit ?? "element"}`;
                  return `F\xf6r stor(t): f\xf6rv\xe4ntat ${r.origin ?? "värdet"} att ha ${t}${r.maximum.toString()}`;
                }
                case "too_small": {
                  let t = r.inclusive ? ">=" : ">",
                    i = e[r.origin] ?? null;
                  if (i)
                    return `F\xf6r lite(t): f\xf6rv\xe4ntade ${r.origin ?? "värdet"} att ha ${t}${r.minimum.toString()} ${i.unit}`;
                  return `F\xf6r lite(t): f\xf6rv\xe4ntade ${r.origin ?? "värdet"} att ha ${t}${r.minimum.toString()}`;
                }
                case "invalid_format":
                  if ("starts_with" === r.format)
                    return `Ogiltig str\xe4ng: m\xe5ste b\xf6rja med "${r.prefix}"`;
                  if ("ends_with" === r.format)
                    return `Ogiltig str\xe4ng: m\xe5ste sluta med "${r.suffix}"`;
                  if ("includes" === r.format)
                    return `Ogiltig str\xe4ng: m\xe5ste inneh\xe5lla "${r.includes}"`;
                  if ("regex" === r.format)
                    return `Ogiltig str\xe4ng: m\xe5ste matcha m\xf6nstret "${r.pattern}"`;
                  return `Ogiltig(t) ${t[r.format] ?? r.format}`;
                case "not_multiple_of":
                  return `Ogiltigt tal: m\xe5ste vara en multipel av ${r.divisor}`;
                case "unrecognized_keys":
                  return `${r.keys.length > 1 ? "Okända nycklar" : "Okänd nyckel"}: ${a.joinValues(r.keys, ", ")}`;
                case "invalid_key":
                  return `Ogiltig nyckel i ${r.origin ?? "värdet"}`;
                case "invalid_union":
                default:
                  return "Ogiltig input";
                case "invalid_element":
                  return `Ogiltigt v\xe4rde i ${r.origin ?? "värdet"}`;
              }
            }),
        };
      },
      "ta",
      0,
      function () {
        let e, t, i;
        return {
          localeError:
            ((e = {
              string: { unit: "எழுத்துக்கள்", verb: "கொண்டிருக்க வேண்டும்" },
              file: { unit: "பைட்டுகள்", verb: "கொண்டிருக்க வேண்டும்" },
              array: { unit: "உறுப்புகள்", verb: "கொண்டிருக்க வேண்டும்" },
              set: { unit: "உறுப்புகள்", verb: "கொண்டிருக்க வேண்டும்" },
              map: { unit: "உறுப்புகள்", verb: "கொண்டிருக்க வேண்டும்" },
            }),
            (t = {
              regex: "உள்ளீடு",
              email: "மின்னஞ்சல் முகவரி",
              url: "URL",
              emoji: "emoji",
              uuid: "UUID",
              uuidv4: "UUIDv4",
              uuidv6: "UUIDv6",
              nanoid: "nanoid",
              guid: "GUID",
              cuid: "cuid",
              cuid2: "cuid2",
              ulid: "ULID",
              xid: "XID",
              ksuid: "KSUID",
              datetime: "ISO தேதி நேரம்",
              date: "ISO தேதி",
              time: "ISO நேரம்",
              duration: "ISO கால அளவு",
              ipv4: "IPv4 முகவரி",
              ipv6: "IPv6 முகவரி",
              mac: "MAC முகவரி",
              cidrv4: "IPv4 வரம்பு",
              cidrv6: "IPv6 வரம்பு",
              base64: "base64-encoded சரம்",
              base64url: "base64url-encoded சரம்",
              json_string: "JSON சரம்",
              e164: "E.164 எண்",
              credit_card: "கடன் அட்டை எண்",
              jwt: "JWT",
              template_literal: "input",
            }),
            (i = { nan: "NaN", number: "எண்", array: "அணி", null: "வெறுமை" }),
            (r) => {
              switch (r.code) {
                case "invalid_type": {
                  let e = i[r.expected] ?? r.expected,
                    t = a.parsedType(r.input),
                    n = i[t] ?? t;
                  if (/^[A-Z]/.test(r.expected))
                    return `தவறான உள்ளீடு: எதிர்பார்க்கப்பட்டது instanceof ${r.expected}, பெறப்பட்டது ${n}`;
                  return `தவறான உள்ளீடு: எதிர்பார்க்கப்பட்டது ${e}, பெறப்பட்டது ${n}`;
                }
                case "invalid_value":
                  if (1 === r.values.length)
                    return `தவறான உள்ளீடு: எதிர்பார்க்கப்பட்டது ${a.stringifyPrimitive(r.values[0])}`;
                  return `தவறான விருப்பம்: எதிர்பார்க்கப்பட்டது ${a.joinValues(r.values, "|")} இல் ஒன்று`;
                case "too_big": {
                  let t = r.inclusive ? "<=" : "<",
                    i = e[r.origin] ?? null;
                  if (i)
                    return `மிக பெரியது: எதிர்பார்க்கப்பட்டது ${r.origin ?? "மதிப்பு"} ${t}${r.maximum.toString()} ${i.unit ?? "உறுப்புகள்"} ஆக இருக்க வேண்டும்`;
                  return `மிக பெரியது: எதிர்பார்க்கப்பட்டது ${r.origin ?? "மதிப்பு"} ${t}${r.maximum.toString()} ஆக இருக்க வேண்டும்`;
                }
                case "too_small": {
                  let t = r.inclusive ? ">=" : ">",
                    i = e[r.origin] ?? null;
                  if (i)
                    return `மிகச் சிறியது: எதிர்பார்க்கப்பட்டது ${r.origin} ${t}${r.minimum.toString()} ${i.unit} ஆக இருக்க வேண்டும்`;
                  return `மிகச் சிறியது: எதிர்பார்க்கப்பட்டது ${r.origin} ${t}${r.minimum.toString()} ஆக இருக்க வேண்டும்`;
                }
                case "invalid_format":
                  if ("starts_with" === r.format)
                    return `தவறான சரம்: "${r.prefix}" இல் தொடங்க வேண்டும்`;
                  if ("ends_with" === r.format)
                    return `தவறான சரம்: "${r.suffix}" இல் முடிவடைய வேண்டும்`;
                  if ("includes" === r.format)
                    return `தவறான சரம்: "${r.includes}" ஐ உள்ளடக்க வேண்டும்`;
                  if ("regex" === r.format)
                    return `தவறான சரம்: ${r.pattern} முறைபாட்டுடன் பொருந்த வேண்டும்`;
                  return `தவறான ${t[r.format] ?? r.format}`;
                case "not_multiple_of":
                  return `தவறான எண்: ${r.divisor} இன் பலமாக இருக்க வேண்டும்`;
                case "unrecognized_keys":
                  return `அடையாளம் தெரியாத விசை${r.keys.length > 1 ? "கள்" : ""}: ${a.joinValues(r.keys, ", ")}`;
                case "invalid_key":
                  return `${r.origin} இல் தவறான விசை`;
                case "invalid_union":
                default:
                  return "தவறான உள்ளீடு";
                case "invalid_element":
                  return `${r.origin} இல் தவறான மதிப்பு`;
              }
            }),
        };
      },
      "th",
      0,
      function () {
        let e, t, i;
        return {
          localeError:
            ((e = {
              string: { unit: "ตัวอักษร", verb: "ควรมี" },
              file: { unit: "ไบต์", verb: "ควรมี" },
              array: { unit: "รายการ", verb: "ควรมี" },
              set: { unit: "รายการ", verb: "ควรมี" },
              map: { unit: "รายการ", verb: "ควรมี" },
            }),
            (t = {
              regex: "ข้อมูลที่ป้อน",
              email: "ที่อยู่อีเมล",
              url: "URL",
              emoji: "อิโมจิ",
              uuid: "UUID",
              uuidv4: "UUIDv4",
              uuidv6: "UUIDv6",
              nanoid: "nanoid",
              guid: "GUID",
              cuid: "cuid",
              cuid2: "cuid2",
              ulid: "ULID",
              xid: "XID",
              ksuid: "KSUID",
              datetime: "วันที่เวลาแบบ ISO",
              date: "วันที่แบบ ISO",
              time: "เวลาแบบ ISO",
              duration: "ช่วงเวลาแบบ ISO",
              ipv4: "ที่อยู่ IPv4",
              ipv6: "ที่อยู่ IPv6",
              mac: "ที่อยู่ MAC",
              cidrv4: "ช่วง IP แบบ IPv4",
              cidrv6: "ช่วง IP แบบ IPv6",
              base64: "ข้อความแบบ Base64",
              base64url: "ข้อความแบบ Base64 สำหรับ URL",
              json_string: "ข้อความแบบ JSON",
              e164: "เบอร์โทรศัพท์ระหว่างประเทศ (E.164)",
              credit_card: "หมายเลขบัตรเครดิต",
              jwt: "โทเคน JWT",
              template_literal: "ข้อมูลที่ป้อน",
            }),
            (i = {
              nan: "NaN",
              number: "ตัวเลข",
              array: "อาร์เรย์ (Array)",
              null: "ไม่มีค่า (null)",
            }),
            (r) => {
              switch (r.code) {
                case "invalid_type": {
                  let e = i[r.expected] ?? r.expected,
                    t = a.parsedType(r.input),
                    n = i[t] ?? t;
                  if (/^[A-Z]/.test(r.expected))
                    return `ประเภทข้อมูลไม่ถูกต้อง: ควรเป็น instanceof ${r.expected} แต่ได้รับ ${n}`;
                  return `ประเภทข้อมูลไม่ถูกต้อง: ควรเป็น ${e} แต่ได้รับ ${n}`;
                }
                case "invalid_value":
                  if (1 === r.values.length)
                    return `ค่าไม่ถูกต้อง: ควรเป็น ${a.stringifyPrimitive(r.values[0])}`;
                  return `ตัวเลือกไม่ถูกต้อง: ควรเป็นหนึ่งใน ${a.joinValues(r.values, "|")}`;
                case "too_big": {
                  let t = r.inclusive ? "ไม่เกิน" : "น้อยกว่า",
                    i = e[r.origin] ?? null;
                  if (i)
                    return `เกินกำหนด: ${r.origin ?? "ค่า"} ควรมี${t} ${r.maximum.toString()} ${i.unit ?? "รายการ"}`;
                  return `เกินกำหนด: ${r.origin ?? "ค่า"} ควรมี${t} ${r.maximum.toString()}`;
                }
                case "too_small": {
                  let t = r.inclusive ? "อย่างน้อย" : "มากกว่า",
                    i = e[r.origin] ?? null;
                  if (i)
                    return `น้อยกว่ากำหนด: ${r.origin} ควรมี${t} ${r.minimum.toString()} ${i.unit}`;
                  return `น้อยกว่ากำหนด: ${r.origin} ควรมี${t} ${r.minimum.toString()}`;
                }
                case "invalid_format":
                  if ("starts_with" === r.format)
                    return `รูปแบบไม่ถูกต้อง: ข้อความต้องขึ้นต้นด้วย "${r.prefix}"`;
                  if ("ends_with" === r.format)
                    return `รูปแบบไม่ถูกต้อง: ข้อความต้องลงท้ายด้วย "${r.suffix}"`;
                  if ("includes" === r.format)
                    return `รูปแบบไม่ถูกต้อง: ข้อความต้องมี "${r.includes}" อยู่ในข้อความ`;
                  if ("regex" === r.format)
                    return `รูปแบบไม่ถูกต้อง: ต้องตรงกับรูปแบบที่กำหนด ${r.pattern}`;
                  return `รูปแบบไม่ถูกต้อง: ${t[r.format] ?? r.format}`;
                case "not_multiple_of":
                  return `ตัวเลขไม่ถูกต้อง: ต้องเป็นจำนวนที่หารด้วย ${r.divisor} ได้ลงตัว`;
                case "unrecognized_keys":
                  return `พบคีย์ที่ไม่รู้จัก: ${a.joinValues(r.keys, ", ")}`;
                case "invalid_key":
                  return `คีย์ไม่ถูกต้องใน ${r.origin}`;
                case "invalid_union":
                  return "ข้อมูลไม่ถูกต้อง: ไม่ตรงกับรูปแบบยูเนียนที่กำหนดไว้";
                case "invalid_element":
                  return `ข้อมูลไม่ถูกต้องใน ${r.origin}`;
                default:
                  return "ข้อมูลไม่ถูกต้อง";
              }
            }),
        };
      },
      "tk",
      0,
      function () {
        let e, t, i;
        return {
          localeError:
            ((e = {
              string: { unit: "simwol", verb: "bolmaly" },
              file: { unit: "baýt", verb: "bolmaly" },
              array: { unit: "elementler", verb: "bolmaly" },
              set: { unit: "elementler", verb: "bolmaly" },
              map: { unit: "elementler", verb: "bolmaly" },
            }),
            (t = {
              regex: "giriş",
              email: "e-poçta salgysy",
              url: "URL",
              emoji: "emoji",
              uuid: "UUID",
              uuidv4: "UUIDv4",
              uuidv6: "UUIDv6",
              nanoid: "nanoid",
              guid: "GUID",
              cuid: "cuid",
              cuid2: "cuid2",
              ulid: "ULID",
              xid: "XID",
              ksuid: "KSUID",
              datetime: "ISO sene we wagt",
              date: "ISO sene",
              time: "ISO wagt",
              duration: "ISO wagt aralygy",
              ipv4: "IPv4 salgysy",
              ipv6: "IPv6 salgysy",
              mac: "MAC salgysy",
              cidrv4: "IPv4 aralygy",
              cidrv6: "IPv6 aralygy",
              base64: "base64 bilen şifrlenen setir",
              base64url: "base64url bilen şifrlenen setir",
              json_string: "JSON setiri",
              e164: "E.164 nomeri",
              credit_card: "kredit kartynyň nomeri",
              jwt: "JWT",
              template_literal: "şablon",
            }),
            (i = { nan: "NaN" }),
            (r) => {
              switch (r.code) {
                case "invalid_type": {
                  let e = i[r.expected] ?? r.expected,
                    t = a.parsedType(r.input),
                    n = i[t] ?? t;
                  return `N\xe4dogry baha: garaşylan ${e} \xfderine ${n} alyndy`;
                }
                case "invalid_value":
                  if (1 === r.values.length)
                    return `N\xe4dogry baha: ${a.stringifyPrimitive(r.values[0])} bolmaly`;
                  return `N\xe4dogry sa\xfdlaw: aşakdakylardan biri bolmaly: ${a.joinValues(r.values, "|")}`;
                case "too_big": {
                  let t = r.inclusive ? "<=" : "<",
                    i = e[r.origin] ?? null;
                  if (i)
                    return `Has uly: garaşyl\xfdan ${r.origin ?? "baha"} ${t} ${r.maximum.toString()} ${i.unit ?? "element"}`;
                  return `Has uly: garaşyl\xfdan ${r.origin ?? "baha"} ${t} ${r.maximum.toString()}`;
                }
                case "too_small": {
                  let t = r.inclusive ? ">=" : ">",
                    i = e[r.origin] ?? null;
                  if (i)
                    return `Has ki\xe7i: garaşyl\xfdan ${r.origin} ${t} ${r.minimum.toString()} ${i.unit}`;
                  return `Has ki\xe7i: garaşyl\xfdan ${r.origin} ${t} ${r.minimum.toString()}`;
                }
                case "invalid_format":
                  if ("starts_with" === r.format)
                    return `N\xe4dogry setir: "${r.prefix}" bilen başlamaly`;
                  if ("ends_with" === r.format)
                    return `N\xe4dogry setir: "${r.suffix}" bilen gutarmaly`;
                  if ("includes" === r.format)
                    return `N\xe4dogry setir: "${r.includes}" saklamaly`;
                  if ("regex" === r.format)
                    return `N\xe4dogry setir: ${r.pattern} nusga la\xfdyk bolmaly`;
                  return `N\xe4dogry ${t[r.format] ?? r.format}`;
                case "not_multiple_of":
                  return `N\xe4dogry san: ${r.divisor} bilen galyndysyz b\xf6l\xfcnmeli`;
                case "unrecognized_keys":
                  return `Tanalma\xfdan a\xe7ar${r.keys.length > 1 ? "lar" : ""}: ${a.joinValues(r.keys, ", ")}`;
                case "invalid_key":
                  return `${r.origin} i\xe7inde n\xe4dogry a\xe7ar`;
                case "invalid_union":
                default:
                  return "Nädogry baha";
                case "invalid_element":
                  return `${r.origin} i\xe7inde n\xe4dogry baha`;
              }
            }),
        };
      },
      "tr",
      0,
      function () {
        let e, t, i;
        return {
          localeError:
            ((e = {
              string: { unit: "karakter", verb: "olmalı" },
              file: { unit: "bayt", verb: "olmalı" },
              array: { unit: "öğe", verb: "olmalı" },
              set: { unit: "öğe", verb: "olmalı" },
              map: { unit: "öğe", verb: "olmalı" },
            }),
            (t = {
              regex: "girdi",
              email: "e-posta adresi",
              url: "URL",
              emoji: "emoji",
              uuid: "UUID",
              uuidv4: "UUIDv4",
              uuidv6: "UUIDv6",
              nanoid: "nanoid",
              guid: "GUID",
              cuid: "cuid",
              cuid2: "cuid2",
              ulid: "ULID",
              xid: "XID",
              ksuid: "KSUID",
              datetime: "ISO tarih ve saat",
              date: "ISO tarih",
              time: "ISO saat",
              duration: "ISO süre",
              ipv4: "IPv4 adresi",
              ipv6: "IPv6 adresi",
              mac: "MAC adresi",
              cidrv4: "IPv4 aralığı",
              cidrv6: "IPv6 aralığı",
              base64: "base64 ile şifrelenmiş metin",
              base64url: "base64url ile şifrelenmiş metin",
              json_string: "JSON dizesi",
              e164: "E.164 sayısı",
              credit_card: "kredi kartı numarası",
              jwt: "JWT",
              template_literal: "Şablon dizesi",
            }),
            (i = { nan: "NaN" }),
            (r) => {
              switch (r.code) {
                case "invalid_type": {
                  let e = i[r.expected] ?? r.expected,
                    t = a.parsedType(r.input),
                    n = i[t] ?? t;
                  if (/^[A-Z]/.test(r.expected))
                    return `Ge\xe7ersiz değer: beklenen instanceof ${r.expected}, alınan ${n}`;
                  return `Ge\xe7ersiz değer: beklenen ${e}, alınan ${n}`;
                }
                case "invalid_value":
                  if (1 === r.values.length)
                    return `Ge\xe7ersiz değer: beklenen ${a.stringifyPrimitive(r.values[0])}`;
                  return `Ge\xe7ersiz se\xe7enek: aşağıdakilerden biri olmalı: ${a.joinValues(r.values, "|")}`;
                case "too_big": {
                  let t = r.inclusive ? "<=" : "<",
                    i = e[r.origin] ?? null;
                  if (i)
                    return `\xc7ok b\xfcy\xfck: beklenen ${r.origin ?? "değer"} ${t}${r.maximum.toString()} ${i.unit ?? "öğe"}`;
                  return `\xc7ok b\xfcy\xfck: beklenen ${r.origin ?? "değer"} ${t}${r.maximum.toString()}`;
                }
                case "too_small": {
                  let t = r.inclusive ? ">=" : ">",
                    i = e[r.origin] ?? null;
                  if (i)
                    return `\xc7ok k\xfc\xe7\xfck: beklenen ${r.origin} ${t}${r.minimum.toString()} ${i.unit}`;
                  return `\xc7ok k\xfc\xe7\xfck: beklenen ${r.origin} ${t}${r.minimum.toString()}`;
                }
                case "invalid_format":
                  if ("starts_with" === r.format)
                    return `Ge\xe7ersiz metin: "${r.prefix}" ile başlamalı`;
                  if ("ends_with" === r.format)
                    return `Ge\xe7ersiz metin: "${r.suffix}" ile bitmeli`;
                  if ("includes" === r.format)
                    return `Ge\xe7ersiz metin: "${r.includes}" i\xe7ermeli`;
                  if ("regex" === r.format)
                    return `Ge\xe7ersiz metin: ${r.pattern} desenine uymalı`;
                  return `Ge\xe7ersiz ${t[r.format] ?? r.format}`;
                case "not_multiple_of":
                  return `Ge\xe7ersiz sayı: ${r.divisor} ile tam b\xf6l\xfcnebilmeli`;
                case "unrecognized_keys":
                  return `Tanınmayan anahtar${r.keys.length > 1 ? "lar" : ""}: ${a.joinValues(r.keys, ", ")}`;
                case "invalid_key":
                  return `${r.origin} i\xe7inde ge\xe7ersiz anahtar`;
                case "invalid_union":
                default:
                  return "Geçersiz değer";
                case "invalid_element":
                  return `${r.origin} i\xe7inde ge\xe7ersiz değer`;
              }
            }),
        };
      },
      "ua",
      0,
      function () {
        return ry();
      },
      "uk",
      0,
      ry,
      "ur",
      0,
      function () {
        let e, t, i;
        return {
          localeError:
            ((e = {
              string: { unit: "حروف", verb: "ہونا" },
              file: { unit: "بائٹس", verb: "ہونا" },
              array: { unit: "آئٹمز", verb: "ہونا" },
              set: { unit: "آئٹمز", verb: "ہونا" },
              map: { unit: "آئٹمز", verb: "ہونا" },
            }),
            (t = {
              regex: "ان پٹ",
              email: "ای میل ایڈریس",
              url: "یو آر ایل",
              emoji: "ایموجی",
              uuid: "یو یو آئی ڈی",
              uuidv4: "یو یو آئی ڈی وی 4",
              uuidv6: "یو یو آئی ڈی وی 6",
              nanoid: "نینو آئی ڈی",
              guid: "جی یو آئی ڈی",
              cuid: "سی یو آئی ڈی",
              cuid2: "سی یو آئی ڈی 2",
              ulid: "یو ایل آئی ڈی",
              xid: "ایکس آئی ڈی",
              ksuid: "کے ایس یو آئی ڈی",
              datetime: "آئی ایس او ڈیٹ ٹائم",
              date: "آئی ایس او تاریخ",
              time: "آئی ایس او وقت",
              duration: "آئی ایس او مدت",
              ipv4: "آئی پی وی 4 ایڈریس",
              ipv6: "آئی پی وی 6 ایڈریس",
              mac: "ایم اے سی ایڈریس",
              cidrv4: "آئی پی وی 4 رینج",
              cidrv6: "آئی پی وی 6 رینج",
              base64: "بیس 64 ان کوڈڈ سٹرنگ",
              base64url: "بیس 64 یو آر ایل ان کوڈڈ سٹرنگ",
              json_string: "جے ایس او این سٹرنگ",
              e164: "ای 164 نمبر",
              credit_card: "کریڈٹ کارڈ نمبر",
              jwt: "جے ڈبلیو ٹی",
              template_literal: "ان پٹ",
            }),
            (i = { nan: "NaN", number: "نمبر", array: "آرے", null: "نل" }),
            (r) => {
              switch (r.code) {
                case "invalid_type": {
                  let e = i[r.expected] ?? r.expected,
                    t = a.parsedType(r.input),
                    n = i[t] ?? t;
                  if (/^[A-Z]/.test(r.expected))
                    return `غلط ان پٹ: instanceof ${r.expected} متوقع تھا، ${n} موصول ہوا`;
                  return `غلط ان پٹ: ${e} متوقع تھا، ${n} موصول ہوا`;
                }
                case "invalid_value":
                  if (1 === r.values.length)
                    return `غلط ان پٹ: ${a.stringifyPrimitive(r.values[0])} متوقع تھا`;
                  return `غلط آپشن: ${a.joinValues(r.values, "|")} میں سے ایک متوقع تھا`;
                case "too_big": {
                  let t = r.inclusive ? "<=" : "<",
                    i = e[r.origin] ?? null;
                  if (i)
                    return `بہت بڑا: ${r.origin ?? "ویلیو"} کے ${t}${r.maximum.toString()} ${i.unit ?? "عناصر"} ہونے متوقع تھے`;
                  return `بہت بڑا: ${r.origin ?? "ویلیو"} کا ${t}${r.maximum.toString()} ہونا متوقع تھا`;
                }
                case "too_small": {
                  let t = r.inclusive ? ">=" : ">",
                    i = e[r.origin] ?? null;
                  if (i)
                    return `بہت چھوٹا: ${r.origin} کے ${t}${r.minimum.toString()} ${i.unit} ہونے متوقع تھے`;
                  return `بہت چھوٹا: ${r.origin} کا ${t}${r.minimum.toString()} ہونا متوقع تھا`;
                }
                case "invalid_format":
                  if ("starts_with" === r.format)
                    return `غلط سٹرنگ: "${r.prefix}" سے شروع ہونا چاہیے`;
                  if ("ends_with" === r.format)
                    return `غلط سٹرنگ: "${r.suffix}" پر ختم ہونا چاہیے`;
                  if ("includes" === r.format)
                    return `غلط سٹرنگ: "${r.includes}" شامل ہونا چاہیے`;
                  if ("regex" === r.format)
                    return `غلط سٹرنگ: پیٹرن ${r.pattern} سے میچ ہونا چاہیے`;
                  return `غلط ${t[r.format] ?? r.format}`;
                case "not_multiple_of":
                  return `غلط نمبر: ${r.divisor} کا مضاعف ہونا چاہیے`;
                case "unrecognized_keys":
                  return `غیر تسلیم شدہ کی${r.keys.length > 1 ? "ز" : ""}: ${a.joinValues(r.keys, "، ")}`;
                case "invalid_key":
                  return `${r.origin} میں غلط کی`;
                case "invalid_union":
                default:
                  return "غلط ان پٹ";
                case "invalid_element":
                  return `${r.origin} میں غلط ویلیو`;
              }
            }),
        };
      },
      "uz",
      0,
      function () {
        let e, t, i;
        return {
          localeError:
            ((e = {
              string: { unit: "belgi", verb: "bo‘lishi kerak" },
              file: { unit: "bayt", verb: "bo‘lishi kerak" },
              array: { unit: "element", verb: "bo‘lishi kerak" },
              set: { unit: "element", verb: "bo‘lishi kerak" },
              map: { unit: "yozuv", verb: "bo‘lishi kerak" },
            }),
            (t = {
              regex: "kirish",
              email: "elektron pochta manzili",
              url: "URL",
              emoji: "emoji",
              uuid: "UUID",
              uuidv4: "UUIDv4",
              uuidv6: "UUIDv6",
              nanoid: "nanoid",
              guid: "GUID",
              cuid: "cuid",
              cuid2: "cuid2",
              ulid: "ULID",
              xid: "XID",
              ksuid: "KSUID",
              datetime: "ISO sana va vaqti",
              date: "ISO sana",
              time: "ISO vaqt",
              duration: "ISO davomiylik",
              ipv4: "IPv4 manzil",
              ipv6: "IPv6 manzil",
              mac: "MAC manzil",
              cidrv4: "IPv4 diapazon",
              cidrv6: "IPv6 diapazon",
              base64: "base64 kodlangan satr",
              base64url: "base64url kodlangan satr",
              json_string: "JSON satr",
              e164: "E.164 raqam",
              credit_card: "kredit karta raqami",
              jwt: "JWT",
              template_literal: "kirish",
            }),
            (i = { nan: "NaN", number: "raqam", array: "massiv" }),
            (r) => {
              switch (r.code) {
                case "invalid_type": {
                  let e = i[r.expected] ?? r.expected,
                    t = a.parsedType(r.input),
                    n = i[t] ?? t;
                  if (/^[A-Z]/.test(r.expected))
                    return `Noto‘g‘ri kirish: kutilgan instanceof ${r.expected}, qabul qilingan ${n}`;
                  return `Noto‘g‘ri kirish: kutilgan ${e}, qabul qilingan ${n}`;
                }
                case "invalid_value":
                  if (1 === r.values.length)
                    return `Noto‘g‘ri kirish: kutilgan ${a.stringifyPrimitive(r.values[0])}`;
                  return `Noto‘g‘ri variant: quyidagilardan biri kutilgan ${a.joinValues(r.values, "|")}`;
                case "too_big": {
                  let t = r.inclusive ? "<=" : "<",
                    i = e[r.origin] ?? null;
                  if (i)
                    return `Juda katta: kutilgan ${r.origin ?? "qiymat"} ${t}${r.maximum.toString()} ${i.unit} ${i.verb}`;
                  return `Juda katta: kutilgan ${r.origin ?? "qiymat"} ${t}${r.maximum.toString()}`;
                }
                case "too_small": {
                  let t = r.inclusive ? ">=" : ">",
                    i = e[r.origin] ?? null;
                  if (i)
                    return `Juda kichik: kutilgan ${r.origin} ${t}${r.minimum.toString()} ${i.unit} ${i.verb}`;
                  return `Juda kichik: kutilgan ${r.origin} ${t}${r.minimum.toString()}`;
                }
                case "invalid_format":
                  if ("starts_with" === r.format)
                    return `Noto‘g‘ri satr: "${r.prefix}" bilan boshlanishi kerak`;
                  if ("ends_with" === r.format)
                    return `Noto‘g‘ri satr: "${r.suffix}" bilan tugashi kerak`;
                  if ("includes" === r.format)
                    return `Noto‘g‘ri satr: "${r.includes}" ni o‘z ichiga olishi kerak`;
                  if ("regex" === r.format)
                    return `Noto‘g‘ri satr: ${r.pattern} shabloniga mos kelishi kerak`;
                  return `Noto‘g‘ri ${t[r.format] ?? r.format}`;
                case "not_multiple_of":
                  return `Noto‘g‘ri raqam: ${r.divisor} ning karralisi bo‘lishi kerak`;
                case "unrecognized_keys":
                  return `Noma’lum kalit${r.keys.length > 1 ? "lar" : ""}: ${a.joinValues(r.keys, ", ")}`;
                case "invalid_key":
                  return `${r.origin} dagi kalit noto‘g‘ri`;
                case "invalid_union":
                default:
                  return "Noto‘g‘ri kirish";
                case "invalid_element":
                  return `${r.origin} da noto‘g‘ri qiymat`;
              }
            }),
        };
      },
      "vi",
      0,
      function () {
        let e, t, i;
        return {
          localeError:
            ((e = {
              string: { unit: "ký tự", verb: "có" },
              file: { unit: "byte", verb: "có" },
              array: { unit: "phần tử", verb: "có" },
              set: { unit: "phần tử", verb: "có" },
              map: { unit: "phần tử", verb: "có" },
            }),
            (t = {
              regex: "đầu vào",
              email: "địa chỉ email",
              url: "URL",
              emoji: "emoji",
              uuid: "UUID",
              uuidv4: "UUIDv4",
              uuidv6: "UUIDv6",
              nanoid: "nanoid",
              guid: "GUID",
              cuid: "cuid",
              cuid2: "cuid2",
              ulid: "ULID",
              xid: "XID",
              ksuid: "KSUID",
              datetime: "ngày giờ ISO",
              date: "ngày ISO",
              time: "giờ ISO",
              duration: "khoảng thời gian ISO",
              ipv4: "địa chỉ IPv4",
              ipv6: "địa chỉ IPv6",
              mac: "địa chỉ MAC",
              cidrv4: "dải IPv4",
              cidrv6: "dải IPv6",
              base64: "chuỗi mã hóa base64",
              base64url: "chuỗi mã hóa base64url",
              json_string: "chuỗi JSON",
              e164: "số E.164",
              credit_card: "số thẻ tín dụng",
              jwt: "JWT",
              template_literal: "đầu vào",
            }),
            (i = { nan: "NaN", number: "số", array: "mảng" }),
            (r) => {
              switch (r.code) {
                case "invalid_type": {
                  let e = i[r.expected] ?? r.expected,
                    t = a.parsedType(r.input),
                    n = i[t] ?? t;
                  if (/^[A-Z]/.test(r.expected))
                    return `Đầu v\xe0o kh\xf4ng hợp lệ: mong đợi instanceof ${r.expected}, nhận được ${n}`;
                  return `Đầu v\xe0o kh\xf4ng hợp lệ: mong đợi ${e}, nhận được ${n}`;
                }
                case "invalid_value":
                  if (1 === r.values.length)
                    return `Đầu v\xe0o kh\xf4ng hợp lệ: mong đợi ${a.stringifyPrimitive(r.values[0])}`;
                  return `T\xf9y chọn kh\xf4ng hợp lệ: mong đợi một trong c\xe1c gi\xe1 trị ${a.joinValues(r.values, "|")}`;
                case "too_big": {
                  let t = r.inclusive ? "<=" : "<",
                    i = e[r.origin] ?? null;
                  if (i)
                    return `Qu\xe1 lớn: mong đợi ${r.origin ?? "giá trị"} ${i.verb} ${t}${r.maximum.toString()} ${i.unit ?? "phần tử"}`;
                  return `Qu\xe1 lớn: mong đợi ${r.origin ?? "giá trị"} ${t}${r.maximum.toString()}`;
                }
                case "too_small": {
                  let t = r.inclusive ? ">=" : ">",
                    i = e[r.origin] ?? null;
                  if (i)
                    return `Qu\xe1 nhỏ: mong đợi ${r.origin} ${i.verb} ${t}${r.minimum.toString()} ${i.unit}`;
                  return `Qu\xe1 nhỏ: mong đợi ${r.origin} ${t}${r.minimum.toString()}`;
                }
                case "invalid_format":
                  if ("starts_with" === r.format)
                    return `Chuỗi kh\xf4ng hợp lệ: phải bắt đầu bằng "${r.prefix}"`;
                  if ("ends_with" === r.format)
                    return `Chuỗi kh\xf4ng hợp lệ: phải kết th\xfac bằng "${r.suffix}"`;
                  if ("includes" === r.format)
                    return `Chuỗi kh\xf4ng hợp lệ: phải bao gồm "${r.includes}"`;
                  if ("regex" === r.format)
                    return `Chuỗi kh\xf4ng hợp lệ: phải khớp với mẫu ${r.pattern}`;
                  return `${t[r.format] ?? r.format} kh\xf4ng hợp lệ`;
                case "not_multiple_of":
                  return `Số kh\xf4ng hợp lệ: phải l\xe0 bội số của ${r.divisor}`;
                case "unrecognized_keys":
                  return `Kh\xf3a kh\xf4ng được nhận dạng: ${a.joinValues(r.keys, ", ")}`;
                case "invalid_key":
                  return `Kh\xf3a kh\xf4ng hợp lệ trong ${r.origin}`;
                case "invalid_union":
                default:
                  return "Đầu vào không hợp lệ";
                case "invalid_element":
                  return `Gi\xe1 trị kh\xf4ng hợp lệ trong ${r.origin}`;
              }
            }),
        };
      },
      "yo",
      0,
      function () {
        let e, t, i;
        return {
          localeError:
            ((e = {
              string: { unit: "àmi", verb: "ní" },
              file: { unit: "bytes", verb: "ní" },
              array: { unit: "nkan", verb: "ní" },
              set: { unit: "nkan", verb: "ní" },
              map: { unit: "nkan", verb: "ní" },
            }),
            (t = {
              regex: "ẹ̀rọ ìbáwọlé",
              email: "àdírẹ́sì ìmẹ́lì",
              url: "URL",
              emoji: "emoji",
              uuid: "UUID",
              uuidv4: "UUIDv4",
              uuidv6: "UUIDv6",
              nanoid: "nanoid",
              guid: "GUID",
              cuid: "cuid",
              cuid2: "cuid2",
              ulid: "ULID",
              xid: "XID",
              ksuid: "KSUID",
              datetime: "àkókò ISO",
              date: "ọjọ́ ISO",
              time: "àkókò ISO",
              duration: "àkókò tó pé ISO",
              ipv4: "àdírẹ́sì IPv4",
              ipv6: "àdírẹ́sì IPv6",
              mac: "àdírẹ́sì MAC",
              cidrv4: "àgbègbè IPv4",
              cidrv6: "àgbègbè IPv6",
              base64: "ọ̀rọ̀ tí a kọ́ ní base64",
              base64url: "ọ̀rọ̀ base64url",
              json_string: "ọ̀rọ̀ JSON",
              e164: "nọ́mbà E.164",
              credit_card: "nọmba kaadi gbese",
              jwt: "JWT",
              template_literal: "ẹ̀rọ ìbáwọlé",
            }),
            (i = { nan: "NaN", number: "nọ́mbà", array: "akopọ" }),
            (r) => {
              switch (r.code) {
                case "invalid_type": {
                  let e = i[r.expected] ?? r.expected,
                    t = a.parsedType(r.input),
                    n = i[t] ?? t;
                  if (/^[A-Z]/.test(r.expected))
                    return `\xccb\xe1wọl\xe9 aṣ\xecṣe: a n\xed l\xe1ti fi instanceof ${r.expected}, \xe0mọ̀ a r\xed ${n}`;
                  return `\xccb\xe1wọl\xe9 aṣ\xecṣe: a n\xed l\xe1ti fi ${e}, \xe0mọ̀ a r\xed ${n}`;
                }
                case "invalid_value":
                  if (1 === r.values.length)
                    return `\xccb\xe1wọl\xe9 aṣ\xecṣe: a n\xed l\xe1ti fi ${a.stringifyPrimitive(r.values[0])}`;
                  return `\xc0ṣ\xe0y\xe0n aṣ\xecṣe: yan ọ̀kan l\xe1ra ${a.joinValues(r.values, "|")}`;
                case "too_big": {
                  let t = r.inclusive ? "<=" : "<",
                    i = e[r.origin] ?? null;
                  if (i)
                    return `T\xf3 pọ̀ j\xf9: a n\xed l\xe1ti jẹ́ p\xe9 ${r.origin ?? "iye"} ${i.verb} ${t}${r.maximum} ${i.unit}`;
                  return `T\xf3 pọ̀ j\xf9: a n\xed l\xe1ti jẹ́ ${t}${r.maximum}`;
                }
                case "too_small": {
                  let t = r.inclusive ? ">=" : ">",
                    i = e[r.origin] ?? null;
                  if (i)
                    return `K\xe9r\xe9 ju: a n\xed l\xe1ti jẹ́ p\xe9 ${r.origin} ${i.verb} ${t}${r.minimum} ${i.unit}`;
                  return `K\xe9r\xe9 ju: a n\xed l\xe1ti jẹ́ ${t}${r.minimum}`;
                }
                case "invalid_format":
                  if ("starts_with" === r.format)
                    return `Ọ̀rọ̀ aṣ\xecṣe: gbọ́dọ̀ bẹ̀rẹ̀ pẹ̀l\xfa "${r.prefix}"`;
                  if ("ends_with" === r.format)
                    return `Ọ̀rọ̀ aṣ\xecṣe: gbọ́dọ̀ par\xed pẹ̀l\xfa "${r.suffix}"`;
                  if ("includes" === r.format)
                    return `Ọ̀rọ̀ aṣ\xecṣe: gbọ́dọ̀ n\xed "${r.includes}"`;
                  if ("regex" === r.format)
                    return `Ọ̀rọ̀ aṣ\xecṣe: gbọ́dọ̀ b\xe1 \xe0pẹẹrẹ mu ${r.pattern}`;
                  return `Aṣ\xecṣe: ${t[r.format] ?? r.format}`;
                case "not_multiple_of":
                  return `Nọ́mb\xe0 aṣ\xecṣe: gbọ́dọ̀ jẹ́ \xe8y\xe0 p\xedp\xedn ti ${r.divisor}`;
                case "unrecognized_keys":
                  return `Bọt\xecn\xec \xe0\xecmọ̀: ${a.joinValues(r.keys, ", ")}`;
                case "invalid_key":
                  return `Bọt\xecn\xec aṣ\xecṣe n\xedn\xfa ${r.origin}`;
                case "invalid_union":
                default:
                  return "Ìbáwọlé aṣìṣe";
                case "invalid_element":
                  return `Iye aṣ\xecṣe n\xedn\xfa ${r.origin}`;
              }
            }),
        };
      },
      "zhCN",
      0,
      function () {
        let e, t, i;
        return {
          localeError:
            ((e = {
              string: { unit: "字符", verb: "包含" },
              file: { unit: "字节", verb: "包含" },
              array: { unit: "项", verb: "包含" },
              set: { unit: "项", verb: "包含" },
              map: { unit: "项", verb: "包含" },
            }),
            (t = {
              regex: "输入",
              email: "电子邮件",
              url: "URL",
              emoji: "表情符号",
              uuid: "UUID",
              uuidv4: "UUIDv4",
              uuidv6: "UUIDv6",
              nanoid: "nanoid",
              guid: "GUID",
              cuid: "cuid",
              cuid2: "cuid2",
              ulid: "ULID",
              xid: "XID",
              ksuid: "KSUID",
              datetime: "ISO日期时间",
              date: "ISO日期",
              time: "ISO时间",
              duration: "ISO时长",
              ipv4: "IPv4地址",
              ipv6: "IPv6地址",
              mac: "MAC地址",
              cidrv4: "IPv4网段",
              cidrv6: "IPv6网段",
              base64: "base64编码字符串",
              base64url: "base64url编码字符串",
              json_string: "JSON字符串",
              e164: "E.164号码",
              credit_card: "信用卡号",
              jwt: "JWT",
              template_literal: "输入",
            }),
            (i = {
              nan: "NaN",
              number: "数字",
              array: "数组",
              null: "空值(null)",
            }),
            (r) => {
              switch (r.code) {
                case "invalid_type": {
                  let e = i[r.expected] ?? r.expected,
                    t = a.parsedType(r.input),
                    n = i[t] ?? t;
                  if (/^[A-Z]/.test(r.expected))
                    return `无效输入：期望 instanceof ${r.expected}，实际接收 ${n}`;
                  return `无效输入：期望 ${e}，实际接收 ${n}`;
                }
                case "invalid_value":
                  if (1 === r.values.length)
                    return `无效输入：期望 ${a.stringifyPrimitive(r.values[0])}`;
                  return `无效选项：期望以下之一 ${a.joinValues(r.values, "|")}`;
                case "too_big": {
                  let t = r.inclusive ? "<=" : "<",
                    i = e[r.origin] ?? null;
                  if (i)
                    return `数值过大：期望 ${r.origin ?? "值"} ${t}${r.maximum.toString()} ${i.unit ?? "个元素"}`;
                  return `数值过大：期望 ${r.origin ?? "值"} ${t}${r.maximum.toString()}`;
                }
                case "too_small": {
                  let t = r.inclusive ? ">=" : ">",
                    i = e[r.origin] ?? null;
                  if (i)
                    return `数值过小：期望 ${r.origin} ${t}${r.minimum.toString()} ${i.unit}`;
                  return `数值过小：期望 ${r.origin} ${t}${r.minimum.toString()}`;
                }
                case "invalid_format":
                  if ("starts_with" === r.format)
                    return `无效字符串：必须以 "${r.prefix}" 开头`;
                  if ("ends_with" === r.format)
                    return `无效字符串：必须以 "${r.suffix}" 结尾`;
                  if ("includes" === r.format)
                    return `无效字符串：必须包含 "${r.includes}"`;
                  if ("regex" === r.format)
                    return `无效字符串：必须满足正则表达式 ${r.pattern}`;
                  return `无效${t[r.format] ?? r.format}`;
                case "not_multiple_of":
                  return `无效数字：必须是 ${r.divisor} 的倍数`;
                case "unrecognized_keys":
                  return `出现未知的键(key): ${a.joinValues(r.keys, ", ")}`;
                case "invalid_key":
                  return `${r.origin} 中的键(key)无效`;
                case "invalid_union":
                default:
                  return "无效输入";
                case "invalid_element":
                  return `${r.origin} 中包含无效值(value)`;
              }
            }),
        };
      },
      "zhTW",
      0,
      function () {
        let e, t, i;
        return {
          localeError:
            ((e = {
              string: { unit: "字元", verb: "擁有" },
              file: { unit: "位元組", verb: "擁有" },
              array: { unit: "項目", verb: "擁有" },
              set: { unit: "項目", verb: "擁有" },
              map: { unit: "項目", verb: "擁有" },
            }),
            (t = {
              regex: "輸入",
              email: "郵件地址",
              url: "URL",
              emoji: "emoji",
              uuid: "UUID",
              uuidv4: "UUIDv4",
              uuidv6: "UUIDv6",
              nanoid: "nanoid",
              guid: "GUID",
              cuid: "cuid",
              cuid2: "cuid2",
              ulid: "ULID",
              xid: "XID",
              ksuid: "KSUID",
              datetime: "ISO 日期時間",
              date: "ISO 日期",
              time: "ISO 時間",
              duration: "ISO 期間",
              ipv4: "IPv4 位址",
              ipv6: "IPv6 位址",
              mac: "MAC 位址",
              cidrv4: "IPv4 範圍",
              cidrv6: "IPv6 範圍",
              base64: "base64 編碼字串",
              base64url: "base64url 編碼字串",
              json_string: "JSON 字串",
              e164: "E.164 數值",
              credit_card: "信用卡號",
              jwt: "JWT",
              template_literal: "輸入",
            }),
            (i = { nan: "NaN" }),
            (r) => {
              switch (r.code) {
                case "invalid_type": {
                  let e = i[r.expected] ?? r.expected,
                    t = a.parsedType(r.input),
                    n = i[t] ?? t;
                  if (/^[A-Z]/.test(r.expected))
                    return `無效的輸入值：預期為 instanceof ${r.expected}，但收到 ${n}`;
                  return `無效的輸入值：預期為 ${e}，但收到 ${n}`;
                }
                case "invalid_value":
                  if (1 === r.values.length)
                    return `無效的輸入值：預期為 ${a.stringifyPrimitive(r.values[0])}`;
                  return `無效的選項：預期為以下其中之一 ${a.joinValues(r.values, "|")}`;
                case "too_big": {
                  let t = r.inclusive ? "<=" : "<",
                    i = e[r.origin] ?? null;
                  if (i)
                    return `數值過大：預期 ${r.origin ?? "值"} 應為 ${t}${r.maximum.toString()} ${i.unit ?? "個元素"}`;
                  return `數值過大：預期 ${r.origin ?? "值"} 應為 ${t}${r.maximum.toString()}`;
                }
                case "too_small": {
                  let t = r.inclusive ? ">=" : ">",
                    i = e[r.origin] ?? null;
                  if (i)
                    return `數值過小：預期 ${r.origin} 應為 ${t}${r.minimum.toString()} ${i.unit}`;
                  return `數值過小：預期 ${r.origin} 應為 ${t}${r.minimum.toString()}`;
                }
                case "invalid_format":
                  if ("starts_with" === r.format)
                    return `無效的字串：必須以 "${r.prefix}" 開頭`;
                  if ("ends_with" === r.format)
                    return `無效的字串：必須以 "${r.suffix}" 結尾`;
                  if ("includes" === r.format)
                    return `無效的字串：必須包含 "${r.includes}"`;
                  if ("regex" === r.format)
                    return `無效的字串：必須符合格式 ${r.pattern}`;
                  return `無效的 ${t[r.format] ?? r.format}`;
                case "not_multiple_of":
                  return `無效的數字：必須為 ${r.divisor} 的倍數`;
                case "unrecognized_keys":
                  return `無法識別的鍵值${r.keys.length > 1 ? "們" : ""}：${a.joinValues(r.keys, "、")}`;
                case "invalid_key":
                  return `${r.origin} 中有無效的鍵值`;
                case "invalid_union":
                default:
                  return "無效的輸入值";
                case "invalid_element":
                  return `${r.origin} 中有無效的值`;
              }
            }),
        };
      },
    ],
    866561,
  );
  var r_ = e.i(866561);
  let rb = Symbol("ZodOutput"),
    rx = Symbol("ZodInput");
  class rk {
    constructor() {
      ((this._map = new WeakMap()), (this._idmap = new Map()));
    }
    add(e, ...t) {
      let i = t[0];
      return (
        this._map.set(e, i),
        i && "object" == typeof i && "id" in i && this._idmap.set(i.id, e),
        this
      );
    }
    clear() {
      return ((this._map = new WeakMap()), (this._idmap = new Map()), this);
    }
    remove(e) {
      let t = this._map.get(e);
      return (
        t && "object" == typeof t && "id" in t && this._idmap.delete(t.id),
        this._map.delete(e),
        this
      );
    }
    get(e) {
      let t = e._zod.parent;
      if (t) {
        let i = { ...(this.get(t) ?? {}) };
        delete i.id;
        let r = { ...i, ...this._map.get(e) };
        return Object.keys(r).length ? r : void 0;
      }
      return this._map.get(e);
    }
    has(e) {
      return this._map.has(e);
    }
  }
  function rI() {
    return new rk();
  }
  (i = globalThis).__zod_globalRegistry ?? (i.__zod_globalRegistry = rI());
  let rw = globalThis.__zod_globalRegistry;
  (e.s(
    [
      "$ZodRegistry",
      0,
      rk,
      "$input",
      0,
      rx,
      "$output",
      0,
      rb,
      "globalRegistry",
      0,
      rw,
      "registry",
      0,
      rI,
    ],
    219392,
  ),
    e.i(219392),
    e.i(941834));
  let rz = Symbol.for("zod.compile.invalid"),
    rS = Symbol.for("zod.compile.fallback");
  class rU extends Error {
    constructor(
      e = "z.compile does not support async refinements, transforms, or checks",
    ) {
      (super(e), (this.name = "ZodCompileAsyncError"));
    }
  }
  class rj extends Error {
    constructor(e, t = !0) {
      (super(
        `z.compile does not support ${e}; this schema must use the runtime parser`,
      ),
        (this.name = "ZodCompileUnsupportedError"),
        (this.islandable = t));
    }
  }
  function rD(e, t) {
    try {
      let t = rO(e),
        i = a.clone(e),
        r = e._zod.run,
        n = r.__originalRun ?? r,
        o = (e, i) => {
          if (
            i?.async ||
            i?.direction === "backward" ||
            i?.skipChecks ||
            i?.[rS] ||
            (i && rs(i, e.value))
          )
            return n(e, i);
          let r = t(e.value);
          return r !== rz ? ((e.value = r), e) : (i && (i[rS] = !0), n(e, i));
        };
      return (
        (o.__originalRun = n),
        (i._zod.bag.fallbackRun = n),
        (i._zod.bag.validator = (function (e, t) {
          try {
            return rO(e, { assertOnly: !0 });
          } catch {
            return t;
          }
        })(e, t)),
        (i._zod.run = o),
        r.__originalRun ||
          (function (e, t, i) {
            if ("function" == typeof t.safeParse) {
              let r = t.safeParse;
              e.safeParse = (e, t) => {
                let n = i(e);
                return n !== rz ? { success: !0, data: n } : r(e, t);
              };
            }
            if ("function" == typeof t.parse) {
              let r = t.parse;
              e.parse = (e, t) => {
                let n = i(e);
                return n !== rz ? n : r(e, t);
              };
            }
          })(i, e, t),
        i
      );
    } catch (i) {
      if (t?.strict) throw i;
      return e;
    }
  }
  function rO(e, t) {
    let i,
      r = !0;
    try {
      r = rn(e);
    } catch {}
    if (r) throw new rj("a schema whose subtree contains a reference cycle");
    let n = { constants: new Map(), constantCounter: 0, varCounter: 0 },
      a = new tu(["input"]),
      o = rW(a, n, e, "input", !t?.assertOnly);
    a.write(null === o ? "return true;" : `return ${o};`);
    let u = ["INVALID", ...n.constants.keys()],
      s = [rz, ...n.constants.values()],
      l = a.content.join("\n"),
      d = t?.debug
        ? u.length > 0
          ? `// Constants: ${u.join(", ")}
${l}`
          : l
        : "",
      c = Function,
      m = `return (input) => {
${l}
}`;
    try {
      i = new c(...u, m)(...s);
    } catch (e) {
      throw new rj(
        `this schema (generated code failed to evaluate: ${e.message})`,
      );
    }
    return (t?.debug && (i.code = d), i);
  }
  function rZ(e, t) {
    for (let [i, r] of e.constants) if (r === t) return i;
    let i = `c${e.constantCounter++}`;
    return (e.constants.set(i, t), i);
  }
  function rP(e) {
    return `v${e.varCounter++}`;
  }
  function rN(e, t) {
    let i = e._zod.run({ value: t, issues: [] }, {});
    return i && "function" == typeof i.then
      ? rz
      : 0 === i.issues.length
        ? i.value
        : rz;
  }
  function rA(e, t, i, r, n = !0) {
    let a = e.content.length,
      o = t.constants.size,
      u = t.constantCounter,
      s = t.varCounter;
    try {
      return rW(e, t, i, r, n);
    } catch (v) {
      var l, d, c, m;
      let n, f, p;
      if (!(v instanceof rj) || !v.islandable) throw v;
      if (((e.content.length = a), t.constants.size > o))
        for (let e of Array.from(t.constants.keys()).slice(o))
          t.constants.delete(e);
      return (
        (t.constantCounter = u),
        (t.varCounter = s),
        (l = e),
        (d = t),
        (c = i),
        (m = r),
        (n = rZ(d, c)),
        (f = rZ(d, rN)),
        (p = rP(d)),
        l.write(`const ${p} = ${f}(${n}, ${m});`),
        l.write(`if (${p} === INVALID) return INVALID;`),
        p
      );
    }
  }
  let rT = new Set([
    "max_size",
    "min_size",
    "size_equals",
    "max_length",
    "min_length",
    "length_equals",
  ]);
  function rE(e, t, i, r) {
    let n = rZ(t, a.codePointLength),
      o = rP(t);
    return (
      e.write(
        `const ${o} = typeof ${i} === "string" && ${r} ? ${n}(${i}) : ${i}.length;`,
      ),
      o
    );
  }
  function rL(e, t) {
    if ("number" != typeof e || !Number.isFinite(e))
      throw new rj(`${t} bound of type ${typeof e}`);
    return `${e}`;
  }
  function rC(e, t) {
    if ("bigint" == typeof t) return `${t}n`;
    if ("number" == typeof t) {
      if (Number.isNaN(t)) throw new rj("comparison check with NaN bound");
      return `${t}`;
    }
    if (t instanceof Date) {
      if (Number.isNaN(t.getTime()))
        throw new rj("comparison check with Invalid Date bound");
      return rZ(e, t);
    }
    throw new rj(`comparison check bound of type ${typeof t}`);
  }
  function rV(e, t, i) {
    let r = t.format;
    switch (r) {
      case "safeint":
        e.write(`if (!Number.isSafeInteger(${i})) return INVALID;`);
        break;
      case "int32":
        e.write(
          `if (!Number.isInteger(${i}) || ${i} < -2147483648 || ${i} > 2147483647) return INVALID;`,
        );
        break;
      case "uint32":
        e.write(
          `if (!Number.isInteger(${i}) || ${i} < 0 || ${i} > 4294967295) return INVALID;`,
        );
        break;
      case "float32":
        e.write(
          `if (!Number.isFinite(${i}) || ${i} < -3.4028234663852886e38 || ${i} > 3.4028234663852886e38) return INVALID;`,
        );
        break;
      case "float64":
        e.write(`if (!Number.isFinite(${i})) return INVALID;`);
        break;
      default:
        throw new rj(`number format ${r}`);
    }
  }
  function rR() {
    throw new n.$ZodAsyncError();
  }
  function rJ(e) {
    this.issues.push(e);
  }
  let rM = new Set([
    "cidrv4",
    "cuid",
    "cuid2",
    "date",
    "datetime",
    "duration",
    "e164",
    "email",
    "emoji",
    "ends_with",
    "guid",
    "includes",
    "ipv4",
    "ksuid",
    "lowercase",
    "mac",
    "nanoid",
    "regex",
    "starts_with",
    "time",
    "ulid",
    "uppercase",
    "uuid",
    "xid",
  ]);
  function rF(e, t, i, r) {
    let n = i.format;
    if ("base64" === n) {
      let i = rZ(t, tJ);
      return (e.write(`if (!${i}(${r})) return INVALID;`), r);
    }
    if ("base64url" === n) {
      let i = rZ(t, tF);
      return (e.write(`if (!${i}(${r})) return INVALID;`), r);
    }
    if ("jwt" === n) {
      let n = rZ(t, tq),
        a = rZ(t, i.alg ?? null);
      return (e.write(`if (!${n}(${r}, ${a})) return INVALID;`), r);
    }
    if ("ipv6" === n) {
      let i = rZ(t, tT);
      return (e.write(`if (!${i}(${r})) return INVALID;`), r);
    }
    if ("cidrv6" === n) {
      let i = rZ(t, tV);
      return (e.write(`if (!${i}(${r})) return INVALID;`), r);
    }
    if ("credit_card" === n) {
      let i = rZ(t, tB);
      return (e.write(`if (!${i}(${r})) return INVALID;`), r);
    }
    if (
      "url" === n ||
      "httpurl" === n ||
      i.normalize ||
      void 0 !== i.hostname ||
      void 0 !== i.protocol
    ) {
      let n = rZ(t, t$),
        a = rZ(t, i),
        o = rP(t),
        u = rP(t);
      if (
        (e.write(`const ${o} = ${r}.trim();`),
        e.write(`const ${u} = ${n}(${o}, ${a});`),
        e.write(`if (typeof ${u} === "number") return INVALID;`),
        void 0 !== i.hostname)
      ) {
        let i = rZ(t, t_);
        e.write(`if (!${i}(${u}, ${a}.hostname)) return INVALID;`);
      }
      if (void 0 !== i.protocol) {
        let i = rZ(t, tb);
        e.write(`if (!${i}(${u}, ${a}.protocol)) return INVALID;`);
      }
      let s = rP(t),
        l = i.normalize ? `${u}.href` : `${rZ(t, ty)}(${o})`;
      return (e.write(`const ${s} = ${l};`), s);
    }
    let o = i.fn;
    if (o) {
      if (rq(o)) throw new rj(`async string format ${n}`);
      let i = rZ(t, o);
      return (e.write(`if (!${i}(${r})) return INVALID;`), r);
    }
    if (rM.has(n) && i.pattern) {
      let n = rZ(t, i.pattern);
      return (
        e.write(`${n}.lastIndex = 0;`),
        e.write(`if (!${n}.test(${r})) return INVALID;`),
        r
      );
    }
    let u = i.format;
    switch (u) {
      case "regex":
        throw new rj("regex format without a pattern");
      case "lowercase":
        e.write(`if (${r} !== ${r}.toLowerCase()) return INVALID;`);
        break;
      case "uppercase":
        e.write(`if (${r} !== ${r}.toUpperCase()) return INVALID;`);
        break;
      case "includes":
        e.write(`if (!${r}.includes(${a.esc(i.includes)})) return INVALID;`);
        break;
      case "starts_with": {
        let t = i.prefix;
        e.write(
          `if (${r}.slice(0, ${t.length}) !== ${a.esc(t)}) return INVALID;`,
        );
        break;
      }
      case "ends_with": {
        let t = i.suffix;
        e.write(
          `if (${r}.slice(-${t.length}) !== ${a.esc(t)}) return INVALID;`,
        );
        break;
      }
      default:
        throw new rj(`string format ${u}`);
    }
    return r;
  }
  function rW(e, t, i, r, n = !0) {
    var o,
      u,
      s,
      l,
      d,
      c,
      m,
      f,
      p,
      v,
      g,
      $,
      h,
      y,
      _,
      b,
      x,
      k,
      I,
      w,
      z,
      S,
      U,
      j,
      D,
      O,
      Z,
      P,
      N,
      A,
      T,
      E,
      L,
      C,
      V,
      R,
      J,
      M,
      F,
      W,
      K,
      G,
      B;
    let X,
      q = i._zod.def,
      H = q.type;
    if (q.coerce) throw new rj(`coercion (z.coerce.${H}())`);
    let Y = n || !!q.checks?.length;
    switch (H) {
      case "string":
        let Q;
        ((o = e),
          (u = t),
          (s = i),
          (l = r),
          o.write(`if (typeof ${l} !== "string") return INVALID;`),
          (X = void 0 === (Q = s._zod.def).format ? l : rF(o, u, Q, l)));
        break;
      case "number":
        let ee;
        ((d = e),
          (c = i),
          (m = r),
          d.write(
            `if (typeof ${m} !== "number" || !Number.isFinite(${m})) return INVALID;`,
          ),
          "number_format" === (ee = c._zod.def).check &&
            ee.format &&
            rV(d, { format: ee.format }, m),
          (X = m));
        break;
      case "boolean":
        ((f = e),
          (p = r),
          f.write(`if (typeof ${p} !== "boolean") return INVALID;`),
          (X = p));
        break;
      case "bigint":
        X = (function (e, t, i) {
          e.write(`if (typeof ${i} !== "bigint") return INVALID;`);
          let r = t._zod.def;
          if (r.format)
            switch (r.format) {
              case "int64":
                e.write(
                  `if (${i} < -9223372036854775808n || ${i} > 9223372036854775807n) return INVALID;`,
                );
                break;
              case "uint64":
                e.write(
                  `if (${i} < 0n || ${i} > 18446744073709551615n) return INVALID;`,
                );
            }
          return i;
        })(e, i, r);
        break;
      case "symbol":
        ((v = e),
          (g = r),
          v.write(`if (typeof ${g} !== "symbol") return INVALID;`),
          (X = g));
        break;
      case "undefined":
        (($ = e),
          (h = r),
          $.write(`if (${h} !== undefined) return INVALID;`),
          (X = h));
        break;
      case "null":
        ((y = e),
          (_ = r),
          y.write(`if (${_} !== null) return INVALID;`),
          (X = _));
        break;
      case "any":
      case "unknown":
        X = r;
        break;
      case "never":
        (e.write("return INVALID;"), (X = r));
        break;
      case "void":
        ((b = e),
          (x = r),
          b.write(`if (${x} !== undefined) return INVALID;`),
          (X = x));
        break;
      case "nan":
        ((k = e),
          (I = r),
          k.write(
            `if (typeof ${I} !== "number" || !Number.isNaN(${I})) return INVALID;`,
          ),
          (X = I));
        break;
      case "date":
        ((w = e),
          (z = r),
          w.write(
            `if (!(${z} instanceof Date) || Number.isNaN(${z}.getTime())) return INVALID;`,
          ),
          (X = z));
        break;
      case "object":
        X = (function (e, t, i, r, n = !0) {
          let o = i._zod.def;
          e.write(
            `if (typeof ${r} !== "object" || ${r} === null || Array.isArray(${r})) return INVALID;`,
          );
          let u = o.shape,
            s = Object.keys(u),
            l = Object.getOwnPropertySymbols(u),
            d = l.length ? [...s, ...l] : s,
            c = (e) => ("symbol" == typeof e ? rZ(t, e) : a.esc(e));
          if (s.includes("__proto__"))
            throw new rj('object shape key "__proto__"');
          let m = new Map();
          for (let i of d) {
            let a = u[i],
              o = c(i),
              s = rP(t);
            if (
              (e.write(`const ${s} = ${r}[${o}];`), void 0 !== a._zod.optin)
            ) {
              let n = rP(t);
              (e.write(`let ${n} = (() => {`),
                e.indented((e) => {
                  let i = rA(e, t, a, s);
                  e.write(`return ${i};`);
                }),
                e.write("})();"),
                "optional" === a._zod.optout
                  ? (e.write(`if (${n} === INVALID) {`),
                    e.indented((e) => {
                      (e.write(`if (${o} in ${r}) return INVALID;`),
                        e.write(`${n} = undefined;`));
                    }),
                    e.write("}"))
                  : e.write(`if (${n} === INVALID) return INVALID;`),
                m.set(i, n));
            } else {
              var f;
              void 0 === (f = a)._zod.optin &&
                (function e(t) {
                  if (t._zod.def.coerce) return !0;
                  let i = t._zod.def;
                  switch (i.type) {
                    case "any":
                    case "unknown":
                    case "undefined":
                    case "void":
                    case "default":
                    case "prefault":
                    case "transform":
                    case "custom":
                    case "lazy":
                    case "catch":
                    default:
                      return !0;
                    case "string":
                    case "number":
                    case "boolean":
                    case "bigint":
                    case "symbol":
                    case "null":
                    case "never":
                    case "nan":
                    case "date":
                    case "object":
                    case "array":
                    case "tuple":
                    case "record":
                    case "map":
                    case "set":
                    case "file":
                    case "template_literal":
                      return !1;
                    case "nonoptional":
                      return !!i.innerType && e(i.innerType);
                    case "literal":
                      return !!i.values?.includes(void 0);
                    case "enum":
                      return !!t._zod.values?.has(void 0);
                    case "optional":
                    case "nullable":
                    case "readonly":
                    case "success":
                      return !i.innerType || e(i.innerType);
                    case "union":
                      return !i.options || i.options.some(e);
                    case "intersection":
                      if (!i.left || !i.right) return !0;
                      return e(i.left) && e(i.right);
                    case "pipe":
                      return !i.in || e(i.in);
                  }
                })(f) &&
                e.write(`if (!(${o} in ${r})) return INVALID;`);
              let u = rA(e, t, a, s, n);
              null !== u && m.set(i, u);
            }
          }
          let p = o.catchall,
            v = "none";
          if (p) {
            let t = p._zod.def.type;
            if ("never" === t) {
              let t = s.map((e) => `k !== ${a.esc(e)}`).join(" && ") || "true";
              (e.write(`for (const k in ${r}) {`),
                e.indented((e) => {
                  e.write(`if (${t}) return INVALID;`);
                }),
                e.write("}"));
            } else
              v =
                ("unknown" !== t && "any" !== t) || p._zod.def.checks?.length
                  ? "schema"
                  : "passthrough";
          }
          let g = rP(t),
            $ = d.some((e) => rG(u[e]) || rK(u[e]));
          if (!n) {
            if ("schema" === v) {
              let i = s.length > 0 ? rZ(t, new Set(s)) : null;
              (e.write(`for (const k in ${r}) {`),
                e.indented((e) => {
                  (e.write('if (k === "__proto__") continue;'),
                    i && e.write(`if (${i}.has(k)) continue;`));
                  let n = rP(t);
                  (e.write(`const ${n} = ${r}[k];`), rA(e, t, p, n, !1));
                }),
                e.write("}"));
            }
            return null;
          }
          if ($)
            for (let t of (e.write(`const ${g} = {};`), d)) {
              let i = c(t),
                n = m.get(t);
              rK(u[t])
                ? e.write(`if (${i} in ${r}) ${g}[${i}] = ${n};`)
                : rG(u[t])
                  ? e.write(
                      `if (${n} !== undefined || ${i} in ${r}) ${g}[${i}] = ${n};`,
                    )
                  : e.write(`${g}[${i}] = ${n};`);
            }
          else {
            let t = d
              .map(
                (e) =>
                  `${"symbol" == typeof e ? `[${c(e)}]` : a.esc(e)}: ${m.get(e)}`,
              )
              .join(", ");
            e.write(`const ${g} = { ${t} };`);
          }
          if ("none" !== v) {
            let i = s.length > 0 ? rZ(t, new Set(s)) : null;
            (e.write(`for (const k in ${r}) {`),
              e.indented((e) => {
                if (
                  (e.write('if (k === "__proto__") continue;'),
                  i && e.write(`if (${i}.has(k)) continue;`),
                  "passthrough" === v)
                )
                  e.write(`${g}[k] = ${r}[k];`);
                else {
                  let i = rP(t);
                  e.write(`const ${i} = ${r}[k];`);
                  let n = rA(e, t, p, i);
                  e.write(`${g}[k] = ${n};`);
                }
              }),
              e.write("}"));
          }
          return g;
        })(e, t, i, r, Y);
        break;
      case "optional":
        X = (function (e, t, i, r, n = !0) {
          var a;
          let o = i._zod.def;
          if (((a = i), a._zod.traits?.has("$ZodExactOptional") === !0))
            return rW(e, t, o.innerType, r, n);
          if ("defaulted" === o.innerType._zod.optin) {
            let i = rP(t),
              n = rP(t);
            return (
              e.write(`let ${i};`),
              e.write(`if (${r} === undefined) {`),
              e.indented((e) => {
                (e.write(`const ${n} = (() => {`),
                  e.indented((e) => {
                    let i = rW(e, t, o.innerType, r);
                    e.write(`return ${i};`);
                  }),
                  e.write("})();"),
                  e.write(`if (${n} !== INVALID) ${i} = ${n};`));
              }),
              e.write("} else {"),
              e.indented((e) => {
                let n = rW(e, t, o.innerType, r);
                e.write(`${i} = ${n};`);
              }),
              e.write("}"),
              i
            );
          }
          let u = n ? rP(t) : null;
          return (
            u && e.write(`let ${u};`),
            e.write(`if (${r} !== undefined) {`),
            e.indented((e) => {
              let i = rW(e, t, o.innerType, r, n);
              u && null !== i && e.write(`${u} = ${i};`);
            }),
            e.write("}"),
            u
          );
        })(e, t, i, r, Y);
        break;
      case "nullable":
        X = (function (e, t, i, r, n = !0) {
          let a = i._zod.def,
            o = n ? rP(t) : null;
          return (
            o && e.write(`let ${o} = null;`),
            e.write(`if (${r} !== null) {`),
            e.indented((e) => {
              let i = rW(e, t, a.innerType, r, n);
              o && null !== i && e.write(`${o} = ${i};`);
            }),
            e.write("}"),
            o
          );
        })(e, t, i, r, Y);
        break;
      case "array":
        X = (function (e, t, i, r, n = !0) {
          let a = i._zod.def;
          e.write(`if (!Array.isArray(${r})) return INVALID;`);
          let o = n ? rP(t) : null,
            u = rP(t),
            s = rP(t);
          return (
            o && e.write(`const ${o} = new Array(${r}.length);`),
            e.write(`for (let ${u} = 0; ${u} < ${r}.length; ${u}++) {`),
            e.indented((e) => {
              e.write(`const ${s} = ${r}[${u}];`);
              let i = rA(e, t, a.element, s, n);
              o && null !== i && e.write(`${o}[${u}] = ${i};`);
            }),
            e.write("}"),
            o
          );
        })(e, t, i, r, Y);
        break;
      case "literal":
        X = (function (e, t, i, r) {
          let n = i._zod.def.values;
          if (1 !== n.length) {
            let i = rZ(t, new Set(n));
            return (e.write(`if (!${i}.has(${r})) return INVALID;`), r);
          }
          let o = n[0];
          if ("number" == typeof o && Number.isNaN(o)) {
            let i = rZ(t, new Set(n));
            return (e.write(`if (!${i}.has(${r})) return INVALID;`), r);
          }
          if ("string" == typeof o)
            e.write(`if (${r} !== ${a.esc(o)}) return INVALID;`);
          else if ("number" == typeof o || "boolean" == typeof o)
            e.write(`if (${r} !== ${o}) return INVALID;`);
          else if (null === o) e.write(`if (${r} !== null) return INVALID;`);
          else if (void 0 === o)
            e.write(`if (${r} !== undefined) return INVALID;`);
          else if ("bigint" == typeof o)
            e.write(`if (${r} !== ${o}n) return INVALID;`);
          else throw new rj(`literal type ${typeof o}`);
          return r;
        })(e, t, i, r);
        break;
      case "enum":
        X = (function (e, t, i, r) {
          let n = i._zod.values;
          if (!n) throw new rj("enum schema without enumerated values");
          let a = rZ(t, n);
          return (e.write(`if (!${a}.has(${r})) return INVALID;`), r);
        })(e, t, i, r);
        break;
      case "readonly": {
        let n = rB(e, t, i, r),
          a = rP(t);
        (e.write(`const ${a} = Object.freeze(${n});`), (X = a));
        break;
      }
      case "success":
        (rB(e, t, i, r), (X = "true"));
        break;
      case "default":
      case "prefault":
        X = (function (e, t, i, r) {
          let n = i._zod.def,
            o = Object.getOwnPropertyDescriptor(i._zod.def, "defaultValue")
              ? () => i._zod.def.defaultValue
              : void 0;
          if ("prefault" === i._zod.def.type) {
            if (!o) return rW(e, t, n.innerType, r);
            let i = rZ(t, o),
              a = rP(t);
            return (
              e.write(`let ${a} = ${r};`),
              e.write(`if (${r} === undefined) ${a} = ${i}();`),
              rW(e, t, n.innerType, a)
            );
          }
          let u = rP(t);
          if (o) {
            let i = rZ(t, o),
              s = rZ(t, a.shallowClone);
            (e.write(`let ${u};`),
              e.write(`if (${r} === undefined) {`),
              e.indented((e) => {
                e.write(`${u} = ${s}(${i}());`);
              }),
              e.write("} else {"),
              e.indented((e) => {
                let a = rW(e, t, n.innerType, r);
                e.write(`${u} = ${a} === undefined ? ${s}(${i}()) : ${a};`);
              }),
              e.write("}"));
          } else
            (e.write(`let ${u};`),
              e.write(`if (${r} !== undefined) {`),
              e.indented((e) => {
                let i = rW(e, t, n.innerType, r);
                e.write(`${u} = ${i};`);
              }),
              e.write("}"));
          return u;
        })(e, t, i, r);
        break;
      case "nonoptional":
        let et, ei;
        ((S = e),
          (U = t),
          (j = i),
          (D = r),
          (et = rW(S, U, j._zod.def.innerType, D)),
          (ei = rP(U)),
          S.write(`const ${ei} = ${et};`),
          S.write(`if (${ei} === undefined) return INVALID;`),
          (X = ei));
        break;
      case "tuple":
        X = (function (e, t, i, r) {
          let n = i._zod.def,
            a = n.items,
            o = n.rest;
          e.write(`if (!Array.isArray(${r})) return INVALID;`);
          let u = rX(a, "optin"),
            s = rX(a, "optout");
          o
            ? e.write(`if (${r}.length < ${u}) return INVALID;`)
            : e.write(
                `if (${r}.length < ${u} || ${r}.length > ${a.length}) return INVALID;`,
              );
          let l = rP(t);
          e.write(`const ${l} = [];`);
          for (let i = 0; i < a.length; i++) {
            let n = a[i];
            if (i >= s)
              (e.write(`if (${l}.length === ${i}) {`),
                e.indented((e) => {
                  (e.write(`if (${i} < ${r}.length) {`),
                    e.indented((e) => {
                      let a = rP(t);
                      e.write(`const ${a} = ${r}[${i}];`);
                      let o = rA(e, t, n, a);
                      e.write(`${l}[${i}] = ${o};`);
                    }),
                    e.write("} else {"),
                    e.indented((e) => {
                      if (rK(n)) return void e.write(`${l}.length = ${i};`);
                      let r = rP(t),
                        a = rP(t);
                      (e.write(`const ${r} = undefined;`),
                        e.write(`const ${a} = (() => {`),
                        e.indented((e) => {
                          let i = rA(e, t, n, r);
                          e.write(`return ${i};`);
                        }),
                        e.write("})();"),
                        e.write(
                          `if (${a} === INVALID || ${a} === undefined) ${l}.length = ${i};`,
                        ),
                        e.write(`else ${l}[${i}] = ${a};`));
                    }),
                    e.write("}"));
                }),
                e.write("}"));
            else {
              let a = rP(t);
              e.write(`const ${a} = ${r}[${i}];`);
              let o = rA(e, t, n, a);
              e.write(`${l}[${i}] = ${o};`);
            }
          }
          if (o) {
            let i = rP(t),
              n = rP(t);
            (e.write(
              `for (let ${i} = ${a.length}; ${i} < ${r}.length; ${i}++) {`,
            ),
              e.indented((e) => {
                e.write(`const ${n} = ${r}[${i}];`);
                let a = rA(e, t, o, n);
                e.write(`${l}[${i}] = ${a};`);
              }),
              e.write("}"));
          }
          return l;
        })(e, t, i, r);
        break;
      case "union":
        X = (function (e, t, i, r) {
          let n = i._zod.def,
            o = n.options;
          if (n.discriminator)
            return (function (e, t, i, r) {
              if (i.unionFallback)
                throw new rj("discriminated union with unionFallback");
              if (0 === i.options.length)
                return (e.write("return INVALID;"), r);
              let n = rP(t),
                o = rP(t);
              (e.write(`const ${n} = ${r}?.[${a.esc(i.discriminator)}];`),
                e.write(`let ${o};`));
              let u = !0,
                s = new Set();
              for (let l of i.options) {
                let d = l._zod.propValues?.[i.discriminator];
                if (!d || 0 === d.size)
                  throw new rj(
                    "discriminated union option without static discriminator values",
                  );
                for (let e of d) {
                  if (s.has(e))
                    throw new rj(`duplicate discriminator value ${String(e)}`);
                  s.add(e);
                }
                let c = Array.from(d, (e) =>
                    (function (e, t, i) {
                      if ("string" == typeof i) return `${t} === ${a.esc(i)}`;
                      if ("number" == typeof i)
                        return Number.isNaN(i)
                          ? `Number.isNaN(${t})`
                          : `${t} === ${i}`;
                      if ("boolean" == typeof i) return `${t} === ${i}`;
                      if (null === i) return `${t} === null`;
                      if (void 0 === i) return `${t} === undefined`;
                      if ("bigint" == typeof i) return `${t} === ${i}n`;
                      if ("symbol" == typeof i) {
                        let r = rZ(e, i);
                        return `${t} === ${r}`;
                      }
                      throw new rj(`literal discriminator value ${String(i)}`);
                    })(t, n, e),
                  ),
                  m = u ? "if" : "else if";
                (e.write(`${m} (${c.join(" || ")}) {`),
                  e.indented((e) => {
                    let i = rW(e, t, l, r);
                    e.write(`${o} = ${i};`);
                  }),
                  e.write("}"),
                  (u = !1));
              }
              return (e.write("else { return INVALID; }"), o);
            })(e, t, n, r);
          if (!1 === n.inclusive) throw new rj("exclusive unions (z.xor)");
          if (0 === o.length) return (e.write("return INVALID;"), r);
          if (1 === o.length) return rW(e, t, o[0], r);
          if (
            o.every(
              (e) =>
                "literal" === e._zod.def.type && !e._zod.def.checks?.length,
            )
          ) {
            let i = rZ(t, new Set(o.flatMap((e) => e._zod.def.values)));
            return (e.write(`if (!${i}.has(${r})) return INVALID;`), r);
          }
          let u = rP(t);
          e.write(`let ${u};`);
          for (let i = 0; i < o.length; i++) {
            let n = o[i];
            (0 === i
              ? e.write(`${u} = (() => {`)
              : e.write(`if (${u} === INVALID) ${u} = (() => {`),
              e.indented((e) => {
                let i = rW(e, t, n, r);
                e.write(`return ${i};`);
              }),
              e.write("})();"));
          }
          return (e.write(`if (${u} === INVALID) return INVALID;`), u);
        })(e, t, i, r);
        break;
      case "intersection":
        let er, en, ea, eo, eu;
        ((O = e),
          (Z = t),
          (P = i),
          (N = r),
          (en = rA(O, Z, (er = P._zod.def).left, N)),
          (ea = rA(O, Z, er.right, N)),
          (eo = rZ(Z, i_)),
          (eu = rP(Z)),
          O.write(`const ${eu} = ${eo}(${en}, ${ea});`),
          O.write(`if (!${eu}.valid) return INVALID;`),
          (X = `${eu}.data`));
        break;
      case "record":
        X = (function (e, t, i, r) {
          let n = i._zod.def,
            o = rZ(t, a.isPlainObject);
          e.write(`if (!${o}(${r})) return INVALID;`);
          let u = rP(t),
            s = rP(t),
            l = rP(t);
          e.write(`const ${u} = {};`);
          let d = n.partial ? void 0 : n.keyType._zod.values;
          if (d) {
            let i = [];
            for (let o of d) {
              var c, m;
              if (
                "string" != typeof o &&
                "number" != typeof o &&
                "symbol" != typeof o
              )
                throw new rj(`record key value ${String(o)}`);
              let s = "number" == typeof o ? o.toString() : o;
              if ("__proto__" === s) throw new rj('record key "__proto__"');
              i.push(s);
              let l = rZ(t, o),
                d = rW(e, t, n.keyType, l),
                f = rP(t);
              e.write(
                `const ${f} = ${r}[${((c = t), "string" == typeof (m = s) ? a.esc(m) : rZ(c, m))}];`,
              );
              let p = rA(e, t, n.valueType, f);
              e.write(`${u}[${d}] = ${p};`);
            }
            let o = rZ(t, new Set(i));
            return (
              e.write(`for (const ${s} in ${r}) {`),
              e.indented((e) => {
                (e.write(`if (${o}.has(${s})) continue;`),
                  "loose" === n.mode
                    ? e.write(
                        `if (${s} !== "__proto__") ${u}[${s}] = ${r}[${s}];`,
                      )
                    : e.write("return INVALID;"));
              }),
              e.write("}"),
              u
            );
          }
          let f = n.keyType._zod.def;
          if (
            !(
              "string" === f.type &&
              void 0 === f.format &&
              !f.coerce &&
              (f.checks?.length ?? 0) === 0
            )
          ) {
            let i = "loose" === n.mode,
              a = rZ(t, rO(n.keyType)),
              o = rZ(t, eS),
              l = rZ(t, Object.prototype.propertyIsEnumerable),
              d = rP(t);
            return (
              e.write(`for (const ${s} of Reflect.ownKeys(${r})) {`),
              e.indented((e) => {
                (e.write(`if (${s} === "__proto__") continue;`),
                  e.write(`if (!${l}.call(${r}, ${s})) continue;`),
                  e.write(`let ${d} = ${a}(${s});`),
                  e.write(
                    `if (${d} === INVALID && typeof ${s} === "string" && ${o}.test(${s})) ${d} = ${a}(Number(${s}));`,
                  ),
                  i
                    ? e.write(
                        `if (${d} === INVALID) { ${u}[${s}] = ${r}[${s}]; continue; }`,
                      )
                    : e.write(`if (${d} === INVALID) return INVALID;`),
                  e.write(`if (${d} === "__proto__") continue;`));
                let c = rP(t);
                e.write(`const ${c} = ${r}[${s}];`);
                let m = rA(e, t, n.valueType, c);
                e.write(`${u}[${d}] = ${m};`);
              }),
              e.write("}"),
              u
            );
          }
          let p = rZ(t, Object.prototype.propertyIsEnumerable);
          return (
            e.write(`for (const ${s} of Reflect.ownKeys(${r})) {`),
            e.indented((e) => {
              (e.write(`if (${s} === "__proto__") continue;`),
                e.write(`if (!${p}.call(${r}, ${s})) continue;`),
                e.write(`if (typeof ${s} !== "string") return INVALID;`),
                e.write(`const ${l} = ${r}[${s}];`));
              let i = rA(e, t, n.valueType, l);
              e.write(`${u}[${s}] = ${i};`);
            }),
            e.write("}"),
            u
          );
        })(e, t, i, r);
        break;
      case "map":
        let es, el, ed, ec;
        ((A = e),
          (T = t),
          (E = i),
          (L = r),
          (es = E._zod.def),
          A.write(`if (!(${L} instanceof Map)) return INVALID;`),
          (el = rP(T)),
          (ed = rP(T)),
          (ec = rP(T)),
          A.write(`const ${el} = new Map();`),
          A.write(`for (const [${ed}, ${ec}] of ${L}) {`),
          A.indented((e) => {
            let t = rW(e, T, es.keyType, ed),
              i = rW(e, T, es.valueType, ec);
            e.write(`${el}.set(${t}, ${i});`);
          }),
          A.write("}"),
          (X = el));
        break;
      case "set":
        let em, ef, ep;
        ((C = e),
          (V = t),
          (R = i),
          (J = r),
          (em = R._zod.def),
          C.write(`if (!(${J} instanceof Set)) return INVALID;`),
          (ef = rP(V)),
          (ep = rP(V)),
          C.write(`const ${ef} = new Set();`),
          C.write(`for (const ${ep} of ${J}) {`),
          C.indented((e) => {
            let t = rW(e, V, em.valueType, ep);
            e.write(`${ef}.add(${t});`);
          }),
          C.write("}"),
          (X = ef));
        break;
      case "file":
        ((M = e),
          (F = r),
          M.write(`if (!(${F} instanceof File)) return INVALID;`),
          (X = F));
        break;
      case "template_literal":
        X = (function (e, t, i, r) {
          e.write(`if (typeof ${r} !== "string") return INVALID;`);
          let n = i._zod.pattern;
          if (n) {
            let i = rZ(t, n);
            (e.write(`${i}.lastIndex = 0;`),
              e.write(`if (!${i}.test(${r})) return INVALID;`));
          }
          return r;
        })(e, t, i, r);
        break;
      case "lazy":
        let ev, eg, e$;
        ((W = e),
          (K = t),
          (G = i),
          (B = r),
          (ev = rZ(K, G._zod.def.getter)),
          (eg = rZ(K, { parser: null })),
          W.write(`if (!${eg}.parser) {`),
          W.indented((e) => {
            (e.write(`const inner = ${ev}();`),
              e.write(`${eg}.parser = function(input) {`),
              e.indented((e) => {
                (e.write(
                  "const result = inner._zod.run({ value: input, issues: [] }, {});",
                ),
                  e.write(
                    "return result.issues.length === 0 ? result.value : INVALID;",
                  ));
              }),
              e.write("};"));
          }),
          W.write("}"),
          (e$ = rP(K)),
          W.write(`const ${e$} = ${eg}.parser(${B});`),
          W.write(`if (${e$} === INVALID) return INVALID;`),
          (X = e$));
        break;
      case "pipe":
        X = (function (e, t, i, r) {
          let n = i._zod.def,
            a = rW(e, t, n.in, r);
          if (!n.transform) return rW(e, t, n.out, a);
          {
            if (rq(n.transform))
              throw new rU(
                "z.compile: async transforms in pipes are not supported",
              );
            let i = n.transform,
              r = rZ(t, (e) => {
                let t = { value: e, issues: [], addIssue: rJ },
                  r = i(e, t);
                return r instanceof Promise
                  ? rz
                  : 0 === t.issues.length
                    ? r
                    : rz;
              }),
              o = rP(t);
            return (
              e.write(`const ${o} = ${r}(${a});`),
              e.write(`if (${o} === INVALID) return INVALID;`),
              rW(e, t, n.out, o)
            );
          }
        })(e, t, i, r);
        break;
      case "custom":
        X = (function (e, t, i, r) {
          let n = i._zod.def;
          if (n.fn) {
            if (rq(n.fn))
              throw new rU(
                "z.compile: async custom predicates are not supported",
              );
            let i = rZ(t, n.fn),
              a = rZ(t, rR),
              o = rP(t);
            (e.write(`const ${o} = ${i}(${r});`),
              e.write(`if (${o} instanceof Promise) ${a}();`),
              e.write(`if (!${o}) return INVALID;`));
          } else throw new rj("custom schema without a predicate function");
          return r;
        })(e, t, i, r);
        break;
      case "transform":
        X = (function (e, t, i, r) {
          let n = i._zod.def;
          if (n.transform) {
            if (rq(n.transform))
              throw new rU("z.compile: async transforms are not supported");
            let i = n.transform,
              a = rZ(t, (e) => {
                let t = { value: e, issues: [], addIssue: rJ },
                  r = i(e, t);
                return r instanceof Promise
                  ? rz
                  : 0 === t.issues.length
                    ? r
                    : rz;
              }),
              o = rP(t);
            return (
              e.write(`const ${o} = ${a}(${r});`),
              e.write(`if (${o} === INVALID) return INVALID;`),
              o
            );
          }
          return r;
        })(e, t, i, r);
        break;
      case "catch":
        X = (function (e, t, i, r) {
          let n = i._zod.def;
          if (!n.catchValue[a.CONSTANT_CATCH])
            throw new rj(
              "catch with a callback (only a constant catch value compiles)",
              !1,
            );
          let o = rP(t);
          (e.write(`let ${o} = (() => {`),
            e.indented((e) => {
              let i = rA(e, t, n.innerType, r);
              e.write(`return ${i};`);
            }),
            e.write("})();"));
          let u = rZ(t, n.innerType),
            s = rZ(t, n.catchValue),
            l = rZ(t, rH);
          return (
            e.write(`if (${o} === INVALID) {`),
            e.indented((e) => {
              (e.write(`${o} = ${l}(${u}, ${s}, ${r});`),
                e.write(`if (${o} === INVALID) return INVALID;`));
            }),
            e.write("}"),
            o
          );
        })(e, t, i, r);
        break;
      default:
        throw new rj(`schema type ${H}`);
    }
    return null === X
      ? null
      : (function (e, t, i, r) {
          let n = i._zod.def.checks;
          if (!n || 0 === n.length) return r;
          let o = r;
          for (let i of n) {
            let r = i._zod.def;
            if (r.when && !rT.has(r.check))
              throw new rj('check with a custom "when" condition');
            switch (r.check) {
              case "greater_than":
                !(function (e, t, i, r) {
                  let n = i.inclusive ? "<" : "<=";
                  e.write(`if (${r} ${n} ${rC(t, i.value)}) return INVALID;`);
                })(e, t, r, o);
                break;
              case "less_than":
                !(function (e, t, i, r) {
                  let n = i.inclusive ? ">" : ">=";
                  e.write(`if (${r} ${n} ${rC(t, i.value)}) return INVALID;`);
                })(e, t, r, o);
                break;
              case "multiple_of":
                !(function (e, t, i, r) {
                  if ("bigint" == typeof i.value) {
                    if (i.value === BigInt(0))
                      throw new rj("multiple_of check with a zero divisor");
                    e.write(`if (${r} % ${i.value}n !== 0n) return INVALID;`);
                  } else {
                    let n = rZ(t, a.floatSafeRemainder);
                    e.write(
                      `if (${n}(${r}, ${rL(i.value, "multiple_of")}) !== 0) return INVALID;`,
                    );
                  }
                })(e, t, r, o);
                break;
              case "number_format":
                rV(e, r, o);
                break;
              case "min_length": {
                let i = rL(r.minimum, "min_length"),
                  n = rE(
                    e,
                    t,
                    o,
                    `${o}.length >= ${i} && ${o}.length < ${2 * r.minimum}`,
                  );
                e.write(`if (${n} < ${i}) return INVALID;`);
                break;
              }
              case "max_length": {
                let i = rL(r.maximum, "max_length"),
                  n = rE(e, t, o, `${o}.length > ${i}`);
                e.write(`if (${n} > ${i}) return INVALID;`);
                break;
              }
              case "length_equals": {
                let i = rL(r.length, "length_equals"),
                  n = rE(
                    e,
                    t,
                    o,
                    `${o}.length >= ${i} && ${o}.length <= ${2 * r.length}`,
                  );
                e.write(`if (${n} !== ${i}) return INVALID;`);
                break;
              }
              case "min_size":
                e.write(
                  `if (${o}.size < ${rL(r.minimum, "min_size")}) return INVALID;`,
                );
                break;
              case "max_size":
                e.write(
                  `if (${o}.size > ${rL(r.maximum, "max_size")}) return INVALID;`,
                );
                break;
              case "size_equals":
                e.write(
                  `if (${o}.size !== ${rL(r.size, "size_equals")}) return INVALID;`,
                );
                break;
              case "string_format":
                o = rF(e, t, r, o);
                break;
              case "custom":
                o = (function (e, t, i, r) {
                  let n = i._zod.def;
                  if (n.fn) {
                    if (rq(n.fn))
                      throw new rU(
                        "z.compile: async .refine() predicates are not supported",
                      );
                    let i = rZ(t, n.fn),
                      a = rZ(t, rR),
                      o = rP(t);
                    return (
                      e.write(`const ${o} = ${i}(${r});`),
                      e.write(`if (${o} instanceof Promise) ${a}();`),
                      e.write(`if (!${o}) return INVALID;`),
                      r
                    );
                  }
                  if (i._zod.check) {
                    if (rq(i._zod.check))
                      throw new rU(
                        "z.compile: async .superRefine() / check functions are not supported",
                      );
                    let n = i._zod.check,
                      a = rZ(t, (e) => {
                        let t = { value: e, issues: [], addIssue: rJ };
                        return (
                          n(t) instanceof Promise && rR(),
                          0 === t.issues.length ? t.value : rz
                        );
                      }),
                      o = rP(t);
                    return (
                      e.write(`const ${o} = ${a}(${r});`),
                      e.write(`if (${o} === INVALID) return INVALID;`),
                      o
                    );
                  }
                  throw new rj(
                    "custom check without a predicate or check function",
                  );
                })(e, t, i, o);
                break;
              case "bigint_format":
                !(function (e, t, i) {
                  let r = t.format;
                  if (r)
                    switch (r) {
                      case "int64":
                        e.write(
                          `if (${i} < -9223372036854775808n || ${i} > 9223372036854775807n) return INVALID;`,
                        );
                        break;
                      case "uint64":
                        e.write(
                          `if (${i} < 0n || ${i} > 18446744073709551615n) return INVALID;`,
                        );
                        break;
                      default:
                        throw new rj(`bigint format ${r}`);
                    }
                })(e, r, o);
                break;
              case "mime_type":
                !(function (e, t, i, r) {
                  let n = i.mime;
                  if (n && n.length > 0) {
                    let i = rZ(t, new Set(n));
                    e.write(`if (!${i}.has(${r}.type)) return INVALID;`);
                  }
                })(e, t, r, o);
                break;
              case "property":
                !(function (e, t, i, r) {
                  let n = `${r}[${JSON.stringify(i.property)}]`;
                  rW(e, t, i.schema, n);
                })(e, t, r, o);
                break;
              case "overwrite": {
                let r = rP(t);
                ((function (e, t, i, r, n) {
                  let a = i._zod.def.tx;
                  if (!a)
                    throw new rj(
                      "overwrite check without a transform function",
                    );
                  if (rq(a))
                    throw new rU(
                      "z.compile: async overwrite transforms are not supported",
                    );
                  let o = rZ(t, a);
                  e.write(`const ${n} = ${o}(${r});`);
                })(e, t, i, o, r),
                  (o = r));
                break;
              }
              default:
                throw new rj(`check type ${r.check}`);
            }
          }
          return o;
        })(e, t, i, X);
  }
  function rK(e) {
    return "optional" === e._zod.optin && "optional" === e._zod.optout;
  }
  function rG(e) {
    let t = e._zod.def;
    switch (t.type) {
      case "string":
      case "number":
      case "boolean":
      case "bigint":
      case "symbol":
      case "null":
      case "nan":
      case "date":
      case "object":
      case "array":
      case "tuple":
      case "record":
      case "map":
      case "set":
      case "file":
      case "template_literal":
      case "never":
      case "success":
        return !1;
      case "literal":
        return !!t.values?.includes(void 0);
      case "enum":
        return !!e._zod.values?.has(void 0);
      case "optional":
      default:
        return !0;
      case "nullable":
      case "readonly":
      case "nonoptional":
        return !t.innerType || rG(t.innerType);
      case "union":
        return !t.options || t.options.some(rG);
      case "intersection":
        return !t.left || !t.right || rG(t.left) || rG(t.right);
      case "pipe":
        return !t.out || rG(t.out);
    }
  }
  function rB(e, t, i, r) {
    return rW(e, t, i._zod.def.innerType, r);
  }
  function rX(e, t) {
    for (let i = e.length - 1; i >= 0; i--)
      if (
        !("optin" === t
          ? void 0 !== e[i]._zod.optin
          : "optional" === e[i]._zod.optout)
      )
        return i + 1;
    return 0;
  }
  function rq(e) {
    return (
      "function" == typeof e &&
      ("AsyncFunction" === e.constructor.name ||
        "AsyncFunction" === e[Symbol.toStringTag])
    );
  }
  function rH(e, t, i) {
    let r = e._zod.run({ value: i, issues: [] }, {});
    return r && "function" == typeof r.then
      ? rz
      : 0 === r.issues.length
        ? r.value
        : t();
  }
  function rY(e, t) {
    return new e({ type: "string", ...a.normalizeParams(t) });
  }
  function rQ(e, t) {
    return new e({ type: "string", coerce: !0, ...a.normalizeParams(t) });
  }
  function r0(e, t) {
    return new e({
      type: "string",
      format: "email",
      check: "string_format",
      abort: !1,
      ...a.normalizeParams(t),
    });
  }
  function r4(e, t) {
    return new e({
      type: "string",
      format: "guid",
      check: "string_format",
      abort: !1,
      ...a.normalizeParams(t),
    });
  }
  function r6(e, t) {
    return new e({
      type: "string",
      format: "uuid",
      check: "string_format",
      abort: !1,
      ...a.normalizeParams(t),
    });
  }
  function r1(e, t) {
    return new e({
      type: "string",
      format: "uuid",
      check: "string_format",
      abort: !1,
      version: "v4",
      ...a.normalizeParams(t),
    });
  }
  function r2(e, t) {
    return new e({
      type: "string",
      format: "uuid",
      check: "string_format",
      abort: !1,
      version: "v6",
      ...a.normalizeParams(t),
    });
  }
  function r9(e, t) {
    return new e({
      type: "string",
      format: "uuid",
      check: "string_format",
      abort: !1,
      version: "v7",
      ...a.normalizeParams(t),
    });
  }
  function r7(e, t) {
    return new e({
      type: "string",
      format: "url",
      check: "string_format",
      abort: !1,
      ...a.normalizeParams(t),
    });
  }
  function r3(e, t) {
    return new e({
      type: "string",
      format: "emoji",
      check: "string_format",
      abort: !1,
      ...a.normalizeParams(t),
    });
  }
  function r5(e, t) {
    return new e({
      type: "string",
      format: "nanoid",
      check: "string_format",
      abort: !1,
      ...a.normalizeParams(t),
    });
  }
  function r8(e, t) {
    return new e({
      type: "string",
      format: "cuid",
      check: "string_format",
      abort: !1,
      ...a.normalizeParams(t),
    });
  }
  function ne(e, t) {
    return new e({
      type: "string",
      format: "cuid2",
      check: "string_format",
      abort: !1,
      ...a.normalizeParams(t),
    });
  }
  function nt(e, t) {
    return new e({
      type: "string",
      format: "ulid",
      check: "string_format",
      abort: !1,
      ...a.normalizeParams(t),
    });
  }
  function ni(e, t) {
    return new e({
      type: "string",
      format: "xid",
      check: "string_format",
      abort: !1,
      ...a.normalizeParams(t),
    });
  }
  function nr(e, t) {
    return new e({
      type: "string",
      format: "ksuid",
      check: "string_format",
      abort: !1,
      ...a.normalizeParams(t),
    });
  }
  function nn(e, t) {
    return new e({
      type: "string",
      format: "ipv4",
      check: "string_format",
      abort: !1,
      ...a.normalizeParams(t),
    });
  }
  function na(e, t) {
    return new e({
      type: "string",
      format: "ipv6",
      check: "string_format",
      abort: !1,
      ...a.normalizeParams(t),
    });
  }
  function no(e, t) {
    return new e({
      type: "string",
      format: "mac",
      check: "string_format",
      abort: !1,
      ...a.normalizeParams(t),
    });
  }
  function nu(e, t) {
    return new e({
      type: "string",
      format: "cidrv4",
      check: "string_format",
      abort: !1,
      ...a.normalizeParams(t),
    });
  }
  function ns(e, t) {
    return new e({
      type: "string",
      format: "cidrv6",
      check: "string_format",
      abort: !1,
      ...a.normalizeParams(t),
    });
  }
  function nl(e, t) {
    return new e({
      type: "string",
      format: "base64",
      check: "string_format",
      abort: !1,
      ...a.normalizeParams(t),
    });
  }
  function nd(e, t) {
    return new e({
      type: "string",
      format: "base64url",
      check: "string_format",
      abort: !1,
      ...a.normalizeParams(t),
    });
  }
  function nc(e, t) {
    return new e({
      type: "string",
      format: "e164",
      check: "string_format",
      abort: !1,
      ...a.normalizeParams(t),
    });
  }
  function nm(e, t) {
    return new e({
      type: "string",
      format: "credit_card",
      check: "string_format",
      abort: !1,
      ...a.normalizeParams(t),
    });
  }
  function nf(e, t) {
    return new e({
      type: "string",
      format: "jwt",
      check: "string_format",
      abort: !1,
      ...a.normalizeParams(t),
    });
  }
  (e.s(
    [
      "INVALID",
      0,
      rz,
      "ZodCompileAsyncError",
      0,
      rU,
      "ZodCompileUnsupportedError",
      0,
      rj,
      "compile",
      0,
      rD,
      "compileFn",
      0,
      rO,
    ],
    766645,
  ),
    e.i(766645));
  let np = { Any: null, Minute: -1, Second: 0, Millisecond: 3, Microsecond: 6 };
  function nv(e, t) {
    return new e({
      type: "string",
      format: "datetime",
      check: "string_format",
      offset: !1,
      local: !1,
      precision: null,
      ...a.normalizeParams(t),
    });
  }
  function ng(e, t) {
    return new e({
      type: "string",
      format: "date",
      check: "string_format",
      ...a.normalizeParams(t),
    });
  }
  function n$(e, t) {
    return new e({
      type: "string",
      format: "time",
      check: "string_format",
      precision: null,
      ...a.normalizeParams(t),
    });
  }
  function nh(e, t) {
    return new e({
      type: "string",
      format: "duration",
      check: "string_format",
      ...a.normalizeParams(t),
    });
  }
  function ny(e, t) {
    return new e({ type: "number", checks: [], ...a.normalizeParams(t) });
  }
  function n_(e, t) {
    return new e({
      type: "number",
      coerce: !0,
      checks: [],
      ...a.normalizeParams(t),
    });
  }
  function nb(e, t) {
    return new e({
      type: "number",
      check: "number_format",
      abort: !1,
      format: "safeint",
      ...a.normalizeParams(t),
    });
  }
  function nx(e, t) {
    return new e({
      type: "number",
      check: "number_format",
      abort: !1,
      format: "float32",
      ...a.normalizeParams(t),
    });
  }
  function nk(e, t) {
    return new e({
      type: "number",
      check: "number_format",
      abort: !1,
      format: "float64",
      ...a.normalizeParams(t),
    });
  }
  function nI(e, t) {
    return new e({
      type: "number",
      check: "number_format",
      abort: !1,
      format: "int32",
      ...a.normalizeParams(t),
    });
  }
  function nw(e, t) {
    return new e({
      type: "number",
      check: "number_format",
      abort: !1,
      format: "uint32",
      ...a.normalizeParams(t),
    });
  }
  function nz(e, t) {
    return new e({ type: "boolean", ...a.normalizeParams(t) });
  }
  function nS(e, t) {
    return new e({ type: "boolean", coerce: !0, ...a.normalizeParams(t) });
  }
  function nU(e, t) {
    return new e({ type: "bigint", ...a.normalizeParams(t) });
  }
  function nj(e, t) {
    return new e({ type: "bigint", coerce: !0, ...a.normalizeParams(t) });
  }
  function nD(e, t) {
    return new e({
      type: "bigint",
      check: "bigint_format",
      abort: !1,
      format: "int64",
      ...a.normalizeParams(t),
    });
  }
  function nO(e, t) {
    return new e({
      type: "bigint",
      check: "bigint_format",
      abort: !1,
      format: "uint64",
      ...a.normalizeParams(t),
    });
  }
  function nZ(e, t) {
    return new e({ type: "symbol", ...a.normalizeParams(t) });
  }
  function nP(e, t) {
    return new e({ type: "undefined", ...a.normalizeParams(t) });
  }
  function nN(e, t) {
    return new e({ type: "null", ...a.normalizeParams(t) });
  }
  function nA(e) {
    return new e({ type: "any" });
  }
  function nT(e) {
    return new e({ type: "unknown" });
  }
  function nE(e, t) {
    return new e({ type: "never", ...a.normalizeParams(t) });
  }
  function nL(e, t) {
    return new e({ type: "void", ...a.normalizeParams(t) });
  }
  function nC(e, t) {
    return new e({ type: "date", ...a.normalizeParams(t) });
  }
  function nV(e, t) {
    return new e({ type: "date", coerce: !0, ...a.normalizeParams(t) });
  }
  function nR(e, t) {
    return new e({ type: "nan", ...a.normalizeParams(t) });
  }
  function nJ(e, t) {
    return new eX({
      check: "less_than",
      ...a.normalizeParams(t),
      value: e,
      inclusive: !1,
    });
  }
  function nM(e, t) {
    return new eX({
      check: "less_than",
      ...a.normalizeParams(t),
      value: e,
      inclusive: !0,
    });
  }
  function nF(e, t) {
    return new eq({
      check: "greater_than",
      ...a.normalizeParams(t),
      value: e,
      inclusive: !1,
    });
  }
  function nW(e, t) {
    return new eq({
      check: "greater_than",
      ...a.normalizeParams(t),
      value: e,
      inclusive: !0,
    });
  }
  function nK(e) {
    return nF(0, e);
  }
  function nG(e) {
    return nJ(0, e);
  }
  function nB(e) {
    return nM(0, e);
  }
  function nX(e) {
    return nW(0, e);
  }
  function nq(e, t) {
    return new eH({ check: "multiple_of", ...a.normalizeParams(t), value: e });
  }
  function nH(e, t) {
    return new e0({ check: "max_size", ...a.normalizeParams(t), maximum: e });
  }
  function nY(e, t) {
    return new e4({ check: "min_size", ...a.normalizeParams(t), minimum: e });
  }
  function nQ(e, t) {
    return new e6({ check: "size_equals", ...a.normalizeParams(t), size: e });
  }
  function n0(e, t) {
    return new e1({ check: "max_length", ...a.normalizeParams(t), maximum: e });
  }
  function n4(e, t) {
    return new e2({ check: "min_length", ...a.normalizeParams(t), minimum: e });
  }
  function n6(e, t) {
    return new e9({
      check: "length_equals",
      ...a.normalizeParams(t),
      length: e,
    });
  }
  function n1(e, t) {
    return new e3({
      check: "string_format",
      format: "regex",
      ...a.normalizeParams(t),
      pattern: e,
    });
  }
  function n2(e) {
    return new e5({
      check: "string_format",
      format: "lowercase",
      ...a.normalizeParams(e),
    });
  }
  function n9(e) {
    return new e8({
      check: "string_format",
      format: "uppercase",
      ...a.normalizeParams(e),
    });
  }
  function n7(e, t) {
    return new te({
      check: "string_format",
      format: "includes",
      ...a.normalizeParams(t),
      includes: e,
    });
  }
  function n3(e, t) {
    return new tt({
      check: "string_format",
      format: "starts_with",
      ...a.normalizeParams(t),
      prefix: e,
    });
  }
  function n5(e, t) {
    return new ti({
      check: "string_format",
      format: "ends_with",
      ...a.normalizeParams(t),
      suffix: e,
    });
  }
  function n8(e, t, i) {
    return new tn({
      check: "property",
      property: e,
      schema: t,
      ...a.normalizeParams(i),
    });
  }
  function ae(e) {
    return Object.entries(e).map(
      ([e, t]) => new tn({ check: "property", property: e, schema: t }),
    );
  }
  function at(e, t) {
    return new ta({ check: "mime_type", mime: e, ...a.normalizeParams(t) });
  }
  function ai(e) {
    return new to({ check: "overwrite", tx: e });
  }
  function ar(e) {
    return ai((t) => t.normalize(e));
  }
  function an() {
    return ai((e) => e.trim());
  }
  function aa() {
    return ai((e) => e.toLowerCase());
  }
  function ao() {
    return ai((e) => e.toUpperCase());
  }
  function au() {
    return ai((e) => a.slugify(e));
  }
  function as(e, t, i) {
    return new e({ type: "array", element: t, ...a.normalizeParams(i) });
  }
  function al(e, t, i) {
    return new e({ type: "union", options: t, ...a.normalizeParams(i) });
  }
  function ad(e, t, i) {
    return new e({
      type: "union",
      options: t,
      inclusive: !1,
      ...a.normalizeParams(i),
    });
  }
  function ac(e, t, i, r) {
    return new e({
      type: "union",
      options: i,
      discriminator: t,
      ...a.normalizeParams(r),
    });
  }
  function am(e, t, i) {
    return new e({ type: "intersection", left: t, right: i });
  }
  function af(e, t, i, r) {
    let n = i instanceof tl,
      o = n ? r : i;
    return new e({
      type: "tuple",
      items: t,
      rest: n ? i : null,
      ...a.normalizeParams(o),
    });
  }
  function ap(e, t, i, r) {
    return new e({
      type: "record",
      keyType: t,
      valueType: i,
      ...a.normalizeParams(r),
    });
  }
  function av(e, t, i, r) {
    return new e({
      type: "map",
      keyType: t,
      valueType: i,
      ...a.normalizeParams(r),
    });
  }
  function ag(e, t, i) {
    return new e({ type: "set", valueType: t, ...a.normalizeParams(i) });
  }
  function a$(e, t, i) {
    return new e({
      type: "enum",
      entries: Array.isArray(t) ? Object.fromEntries(t.map((e) => [e, e])) : t,
      ...a.normalizeParams(i),
    });
  }
  function ah(e, t, i) {
    return new e({ type: "enum", entries: t, ...a.normalizeParams(i) });
  }
  function ay(e, t, i) {
    return new e({
      type: "literal",
      values: Array.isArray(t) ? t : [t],
      ...a.normalizeParams(i),
    });
  }
  function a_(e, t) {
    return new e({ type: "file", ...a.normalizeParams(t) });
  }
  function ab(e, t) {
    return new e({ type: "transform", transform: t });
  }
  function ax(e, t) {
    return new e({ type: "optional", innerType: t });
  }
  function ak(e, t) {
    return new e({ type: "nullable", innerType: t });
  }
  function aI(e, t, i) {
    return new e({
      type: "default",
      innerType: t,
      get defaultValue() {
        return "function" == typeof i ? i() : a.shallowClone(i);
      },
    });
  }
  function aw(e, t, i) {
    return new e({
      type: "nonoptional",
      innerType: t,
      ...a.normalizeParams(i),
    });
  }
  function az(e, t) {
    return new e({ type: "success", innerType: t });
  }
  function aS(e, t, i) {
    return new e({
      type: "catch",
      innerType: t,
      catchValue: "function" == typeof i ? i : a.constantCatch(i),
    });
  }
  function aU(e, t, i) {
    return new e({ type: "pipe", in: t, out: i });
  }
  function aj(e, t) {
    return new e({ type: "readonly", innerType: t });
  }
  function aD(e, t, i) {
    return new e({
      type: "template_literal",
      parts: t,
      ...a.normalizeParams(i),
    });
  }
  function aO(e, t) {
    return new e({ type: "lazy", getter: t });
  }
  function aZ(e, t) {
    return new e({ type: "promise", innerType: t });
  }
  function aP(e, t, i) {
    let r = a.normalizeParams(i);
    return (
      r.abort ?? (r.abort = !0),
      new e({ type: "custom", check: "custom", fn: t, ...r })
    );
  }
  function aN(e, t, i) {
    return new e({
      type: "custom",
      check: "custom",
      fn: t,
      ...a.normalizeParams(i),
    });
  }
  function aA(e, t) {
    let i = aT(
      (t) => (
        (t.addIssue = (e) => {
          "string" == typeof e
            ? t.issues.push(a.issue(e, t.value, i._zod.def))
            : (e.fatal && (e.continue = !1),
              e.code ?? (e.code = "custom"),
              "input" in e || (e.input = t.value),
              e.inst ?? (e.inst = i),
              e.continue ?? (e.continue = !i._zod.def.abort),
              t.issues.push(a.issue(e)));
        }),
        e(t.value, t)
      ),
      t,
    );
    return i;
  }
  function aT(e, t) {
    let i = new eW({ check: "custom", ...a.normalizeParams(t) });
    return ((i._zod.check = e), i);
  }
  function aE(e) {
    let t = new eW({ check: "describe" });
    return (
      (t._zod.onattach = [
        (t) => {
          let i = rw.get(t) ?? {};
          rw.add(t, { ...i, description: e });
        },
      ]),
      (t._zod.check = () => {}),
      t
    );
  }
  function aL(e) {
    let t = new eW({ check: "meta" });
    return (
      (t._zod.onattach = [
        (t) => {
          let i = rw.get(t) ?? {};
          rw.add(t, { ...i, ...e });
        },
      ]),
      (t._zod.check = () => {}),
      t
    );
  }
  function aC(e, t) {
    let i = a.normalizeParams(t),
      r = i.truthy ?? ["true", "1", "yes", "on", "y", "enabled"],
      n = i.falsy ?? ["false", "0", "no", "off", "n", "disabled"];
    "sensitive" !== i.case &&
      ((r = r.map((e) => ("string" == typeof e ? e.toLowerCase() : e))),
      (n = n.map((e) => ("string" == typeof e ? e.toLowerCase() : e))));
    let o = new Set(r),
      u = new Set(n),
      s = e.Codec ?? iq,
      l = e.Boolean ?? t4,
      d = new s({
        type: "pipe",
        in: new (e.String ?? tm)({ type: "string", error: i.error }),
        out: new l({ type: "boolean", error: i.error }),
        transform: (e, t) => {
          let r = e;
          return (
            "sensitive" !== i.case && (r = r.toLowerCase()),
            !!o.has(r) ||
              (!u.has(r) &&
                (t.issues.push({
                  code: "invalid_value",
                  expected: "stringbool",
                  values: [...o, ...u],
                  input: t.value,
                  inst: d,
                  continue: !1,
                }),
                {}))
          );
        },
        reverseTransform: (e, t) =>
          !0 === e ? r[0] || "true" : n[0] || "false",
        error: i.error,
      });
    return (
      (d._zod.bag.truthy = r),
      (d._zod.bag.falsy = n),
      (d._zod.bag.case = i.case ?? "insensitive"),
      d
    );
  }
  function aV(e, t, i, r = {}) {
    let n = {
      check: "string_format",
      type: "string",
      format: t,
      fn: "function" == typeof i ? i : (e) => i.test(e),
      ...a.normalizeParams(r),
    };
    return (i instanceof RegExp && (n.pattern = i), new e(n));
  }
  function aR(e, ...t) {
    for (let i of t)
      for (let t of Reflect.ownKeys(i))
        Object.prototype.propertyIsEnumerable.call(i, t) &&
          (0, a.assignProp)(e, t, i[t]);
    return e;
  }
  function aJ(e) {
    let t = e?.target ?? "draft-2020-12";
    return (
      "draft-4" === t && (t = "draft-04"),
      "draft-7" === t && (t = "draft-07"),
      {
        processors: e.processors ?? {},
        metadataRegistry: e?.metadata ?? rw,
        target: t,
        unrepresentable: e?.unrepresentable ?? "throw",
        override: e?.override ?? (() => {}),
        io: e?.io ?? "output",
        counter: 0,
        seen: new Map(),
        sharedDefsExtractedFor: void 0,
        sharedEmitDoneFor: void 0,
        cycles: e?.cycles ?? "ref",
        reused: e?.reused ?? "inline",
        intersections: [],
        deferred: [],
        external: e?.external ?? void 0,
      }
    );
  }
  function aM(e, t, i, r, n) {
    let a =
      "function" == typeof t.unrepresentable
        ? t.unrepresentable({ zodSchema: e, path: r.path, message: n })
        : t.unrepresentable;
    if ("any" === a) return !1;
    if (void 0 === a || "throw" === a) throw Error(n);
    return (Object.assign(i, a), !0);
  }
  function aF(e, t, i = { path: [], schemaPath: [] }) {
    var r;
    let n = e._zod.def,
      a = t.seen.get(e);
    if (a)
      return (
        a.count++,
        i.schemaPath.includes(e) && (a.cycle = i.path),
        a.schema
      );
    let o = { schema: {}, count: 1, cycle: void 0, path: i.path };
    (t.seen.set(e, o),
      (t.sharedDefsExtractedFor = void 0),
      (t.sharedEmitDoneFor = void 0));
    let u = e._zod.toJSONSchema?.();
    if (u) o.schema = u;
    else {
      let r = { ...i, schemaPath: [...i.schemaPath, e], path: i.path };
      if (e._zod.processJSONSchema) e._zod.processJSONSchema(t, o.schema, r);
      else {
        let i = o.schema,
          a = t.processors[n.type];
        if (!a)
          throw Error(
            `[toJSONSchema]: Non-representable type encountered: ${n.type}`,
          );
        a(e, t, i, r);
      }
      let a = e._zod.parent;
      a && (o.ref || (o.ref = a), aF(a, t, r), (t.seen.get(a).isParent = !0));
    }
    let s = t.metadataRegistry.get(e);
    return (
      s && aR(o.schema, s),
      "input" === t.io &&
        (function e(t, i) {
          let r = i ?? { seen: new Set() };
          if (r.seen.has(t)) return !1;
          r.seen.add(t);
          let n = t._zod.def;
          if ("transform" === n.type) return !0;
          if ("array" === n.type) return e(n.element, r);
          if ("set" === n.type) return e(n.valueType, r);
          if ("lazy" === n.type) return e(n.getter(), r);
          if (
            "promise" === n.type ||
            "optional" === n.type ||
            "nonoptional" === n.type ||
            "nullable" === n.type ||
            "readonly" === n.type ||
            "default" === n.type ||
            "prefault" === n.type ||
            "catch" === n.type
          )
            return e(n.innerType, r);
          if ("intersection" === n.type) return e(n.left, r) || e(n.right, r);
          if ("record" === n.type || "map" === n.type)
            return e(n.keyType, r) || e(n.valueType, r);
          if ("pipe" === n.type)
            return (
              !!t._zod.traits.has("$ZodCodec") || e(n.in, r) || e(n.out, r)
            );
          if ("object" === n.type) {
            for (let t in n.shape) if (e(n.shape[t], r)) return !0;
            return !1;
          }
          if ("union" === n.type) {
            for (let t of n.options) if (e(t, r)) return !0;
            return !1;
          }
          if ("tuple" === n.type) {
            for (let t of n.items) if (e(t, r)) return !0;
            if (n.rest && e(n.rest, r)) return !0;
          }
          return !1;
        })(e) &&
        (delete o.schema.examples, delete o.schema.default),
      "input" === t.io &&
        "_prefault" in o.schema &&
        ((r = o.schema).default ?? (r.default = o.schema._prefault)),
      delete o.schema._prefault,
      t.seen.get(e).schema
    );
  }
  function aW(e) {
    return e.replace(/~/g, "~0").replace(/\//g, "~1");
  }
  function aK(e, t) {
    let i = e.seen.get(t);
    if (!i) throw Error("Unprocessed schema. This is a bug in Zod.");
    if (e.external && e.sharedDefsExtractedFor === e.external) return;
    let r = new Map();
    for (let t of e.seen.entries()) {
      let i = e.metadataRegistry.get(t[0])?.id;
      if (i) {
        let e = r.get(i);
        if (e && e !== t[0])
          throw Error(
            `Duplicate schema id "${i}" detected during JSON Schema conversion. Two different schemas cannot share the same id when converted together.`,
          );
        r.set(i, t[0]);
      }
    }
    let n = (t) => {
      if (t[1].schema.$ref) return;
      let r = t[1],
        { ref: n, defId: a } = ((t) => {
          let r = "draft-2020-12" === e.target ? "$defs" : "definitions";
          if (e.external) {
            let i = e.external.registry.get(t[0])?.id,
              n = e.external.uri ?? ((e) => e);
            if (i) return { ref: n(i) };
            let a = t[1].defId ?? t[1].schema.id ?? `schema${e.counter++}`;
            return (
              (t[1].defId = a),
              { defId: a, ref: `${n("__shared")}#/${r}/${aW(a)}` }
            );
          }
          let n = `#/${r}/`;
          if (t[1] === i && !t[1].schema.id) return { ref: "#" };
          let a = t[1].schema.id ?? `__schema${e.counter++}`;
          return { defId: a, ref: n + aW(a) };
        })(t);
      ((r.def = { ...r.schema }), a && (r.defId = a));
      let o = r.schema;
      for (let e in o) delete o[e];
      o.$ref = n;
    };
    if ("throw" === e.cycles)
      for (let t of e.seen.entries()) {
        let e = t[1];
        if (e.cycle)
          throw Error(`Cycle detected: #/${e.cycle?.join("/")}/<root>

Set the \`cycles\` parameter to \`"ref"\` to resolve cyclical schemas with defs.`);
      }
    for (let i of e.seen.entries()) {
      let r = i[1];
      if (t === i[0]) {
        n(i);
        continue;
      }
      if (e.external) {
        let r = e.external.registry.get(i[0])?.id;
        if (t !== i[0] && r) {
          n(i);
          continue;
        }
      }
      if (
        e.metadataRegistry.get(i[0])?.id ||
        r.cycle ||
        (r.count > 1 && "ref" === e.reused)
      ) {
        n(i);
        continue;
      }
    }
    e.external && (e.sharedDefsExtractedFor = e.external);
  }
  (e.s(
    [
      "TimePrecision",
      0,
      np,
      "_any",
      0,
      nA,
      "_array",
      0,
      as,
      "_base64",
      0,
      nl,
      "_base64url",
      0,
      nd,
      "_bigint",
      0,
      nU,
      "_boolean",
      0,
      nz,
      "_catch",
      0,
      aS,
      "_check",
      0,
      aT,
      "_cidrv4",
      0,
      nu,
      "_cidrv6",
      0,
      ns,
      "_coercedBigint",
      0,
      nj,
      "_coercedBoolean",
      0,
      nS,
      "_coercedDate",
      0,
      nV,
      "_coercedNumber",
      0,
      n_,
      "_coercedString",
      0,
      rQ,
      "_creditCard",
      0,
      nm,
      "_cuid",
      0,
      r8,
      "_cuid2",
      0,
      ne,
      "_custom",
      0,
      aP,
      "_date",
      0,
      nC,
      "_default",
      0,
      aI,
      "_discriminatedUnion",
      0,
      ac,
      "_e164",
      0,
      nc,
      "_email",
      0,
      r0,
      "_emoji",
      0,
      r3,
      "_endsWith",
      0,
      n5,
      "_enum",
      0,
      a$,
      "_file",
      0,
      a_,
      "_float32",
      0,
      nx,
      "_float64",
      0,
      nk,
      "_gt",
      0,
      nF,
      "_gte",
      0,
      nW,
      "_guid",
      0,
      r4,
      "_includes",
      0,
      n7,
      "_int",
      0,
      nb,
      "_int32",
      0,
      nI,
      "_int64",
      0,
      nD,
      "_intersection",
      0,
      am,
      "_ipv4",
      0,
      nn,
      "_ipv6",
      0,
      na,
      "_isoDate",
      0,
      ng,
      "_isoDateTime",
      0,
      nv,
      "_isoDuration",
      0,
      nh,
      "_isoTime",
      0,
      n$,
      "_jwt",
      0,
      nf,
      "_ksuid",
      0,
      nr,
      "_lazy",
      0,
      aO,
      "_length",
      0,
      n6,
      "_literal",
      0,
      ay,
      "_lowercase",
      0,
      n2,
      "_lt",
      0,
      nJ,
      "_lte",
      0,
      nM,
      "_mac",
      0,
      no,
      "_map",
      0,
      av,
      "_max",
      0,
      nM,
      "_maxLength",
      0,
      n0,
      "_maxSize",
      0,
      nH,
      "_mime",
      0,
      at,
      "_min",
      0,
      nW,
      "_minLength",
      0,
      n4,
      "_minSize",
      0,
      nY,
      "_multipleOf",
      0,
      nq,
      "_nan",
      0,
      nR,
      "_nanoid",
      0,
      r5,
      "_nativeEnum",
      0,
      ah,
      "_negative",
      0,
      nG,
      "_never",
      0,
      nE,
      "_nonnegative",
      0,
      nX,
      "_nonoptional",
      0,
      aw,
      "_nonpositive",
      0,
      nB,
      "_normalize",
      0,
      ar,
      "_null",
      0,
      nN,
      "_nullable",
      0,
      ak,
      "_number",
      0,
      ny,
      "_optional",
      0,
      ax,
      "_overwrite",
      0,
      ai,
      "_pipe",
      0,
      aU,
      "_positive",
      0,
      nK,
      "_promise",
      0,
      aZ,
      "_properties",
      0,
      ae,
      "_property",
      0,
      n8,
      "_readonly",
      0,
      aj,
      "_record",
      0,
      ap,
      "_refine",
      0,
      aN,
      "_regex",
      0,
      n1,
      "_set",
      0,
      ag,
      "_size",
      0,
      nQ,
      "_slugify",
      0,
      au,
      "_startsWith",
      0,
      n3,
      "_string",
      0,
      rY,
      "_stringFormat",
      0,
      aV,
      "_stringbool",
      0,
      aC,
      "_success",
      0,
      az,
      "_superRefine",
      0,
      aA,
      "_symbol",
      0,
      nZ,
      "_templateLiteral",
      0,
      aD,
      "_toLowerCase",
      0,
      aa,
      "_toUpperCase",
      0,
      ao,
      "_transform",
      0,
      ab,
      "_trim",
      0,
      an,
      "_tuple",
      0,
      af,
      "_uint32",
      0,
      nw,
      "_uint64",
      0,
      nO,
      "_ulid",
      0,
      nt,
      "_undefined",
      0,
      nP,
      "_union",
      0,
      al,
      "_unknown",
      0,
      nT,
      "_uppercase",
      0,
      n9,
      "_url",
      0,
      r7,
      "_uuid",
      0,
      r6,
      "_uuidv4",
      0,
      r1,
      "_uuidv6",
      0,
      r2,
      "_uuidv7",
      0,
      r9,
      "_void",
      0,
      nL,
      "_xid",
      0,
      ni,
      "_xor",
      0,
      ad,
      "describe",
      0,
      aE,
      "meta",
      0,
      aL,
    ],
    605400,
  ),
    e.i(605400));
  let aG = new Set(["type", "properties", "required", "additionalProperties"]),
    aB = ["oneOf", "anyOf"];
  function aX(e) {
    let t = e.additionalProperties;
    return void 0 === t || !1 === t || "object" != typeof t || null === t
      ? null
      : Object.keys(t).length
        ? t
        : null;
  }
  function aq(e) {
    let t = [];
    for (let i of e) {
      if ("object" != typeof i || "object" !== i.type) return null;
      for (let e in i) if (!aG.has(e)) return null;
      t.push(i);
    }
    let i = {},
      r = new Set();
    for (let e of t) {
      for (let r in e.properties) {
        if (Object.prototype.hasOwnProperty.call(i, r)) continue;
        let e = [];
        for (let i of t) {
          let t = i.properties?.[r] ?? aX(i);
          null != t &&
            (e.some((e) => JSON.stringify(e) === JSON.stringify(t)) ||
              e.push(t));
        }
        let n = 1 === e.length ? e[0] : (aq(e) ?? { allOf: e });
        (0, a.assignProp)(i, r, n);
      }
      for (let t of e.required ?? []) r.add(t);
    }
    let n = { type: "object", properties: i };
    if (
      (r.size && (n.required = [...r]),
      t.every((e) => !1 === e.additionalProperties))
    )
      n.additionalProperties = !1;
    else {
      let e = [];
      for (let i of t) {
        let t = aX(i);
        t &&
          !e.some((e) => JSON.stringify(e) === JSON.stringify(t)) &&
          e.push(t);
      }
      1 === e.length
        ? (n.additionalProperties = e[0])
        : e.length > 1 && (n.additionalProperties = { allOf: e });
    }
    return n;
  }
  function aH(e, t) {
    let i = e.seen.get(t);
    if (!i) throw Error("Unprocessed schema. This is a bug in Zod.");
    let r = (t) => {
      let i = e.seen.get(t);
      if (null === i.ref) return;
      let n = i.def ?? i.schema,
        a = { ...n },
        o = i.ref;
      if (((i.ref = null), o)) {
        r(o);
        let i = e.seen.get(o),
          u = i.schema;
        if (
          (u.$ref &&
          ("draft-07" === e.target ||
            "draft-04" === e.target ||
            "openapi-3.0" === e.target)
            ? ((n.allOf = n.allOf ?? []), n.allOf.push(u))
            : aR(n, u),
          aR(n, a),
          t._zod.parent === o)
        )
          for (let e in n)
            "$ref" !== e && "allOf" !== e && (e in a || delete n[e]);
        if (u.$ref && i.def)
          for (let e in n)
            "$ref" !== e &&
              "allOf" !== e &&
              e in i.def &&
              JSON.stringify(n[e]) === JSON.stringify(i.def[e]) &&
              delete n[e];
      }
      let u = t._zod.parent;
      if (u && u !== o) {
        r(u);
        let t = e.seen.get(u);
        if (t?.schema.$ref && ((n.$ref = t.schema.$ref), t.def))
          for (let e in n)
            "$ref" !== e &&
              "allOf" !== e &&
              e in t.def &&
              JSON.stringify(n[e]) === JSON.stringify(t.def[e]) &&
              delete n[e];
      }
      e.override({ zodSchema: t, jsonSchema: n, path: i.path ?? [] });
    };
    if (!e.external || e.sharedEmitDoneFor !== e.external) {
      for (let t of [...e.seen.entries()].reverse()) r(t[0]);
      if ("openapi-3.0" !== e.target)
        for (let t of e.seen.entries())
          !(function e(t) {
            let i = t.anyOf;
            if (!Array.isArray(i) || 0 === i.length || void 0 !== t.type)
              return;
            let r = [];
            for (let t of i) {
              if (!t || "object" != typeof t) return;
              e(t);
              let i = Object.keys(t);
              if (1 !== i.length || "type" !== i[0]) return;
              let n = t.type;
              for (let e of Array.isArray(n) ? n : [n]) {
                if ("string" != typeof e) return;
                r.includes(e) || r.push(e);
              }
            }
            (delete t.anyOf, (t.type = 1 === r.length ? r[0] : r));
          })(t[1].def ?? t[1].schema);
      for (let t of e.deferred) t();
      if (e.intersections.length) {
        let t = new Map();
        for (let i of e.seen.values())
          for (let e of [i.schema, i.def]) {
            let i = e?.allOf;
            if (!Array.isArray(i)) continue;
            let r = t.get(i);
            r ? r.push(e) : t.set(i, [e]);
          }
        for (let i of e.intersections)
          for (let e of t.get(i) ?? [])
            !(function (e) {
              let t = e.allOf;
              if (!Array.isArray(t) || t.length < 2) return;
              for (let t of aG) if (t in e) return;
              let i = t.filter((e) => aB.some((t) => Array.isArray(e[t]))),
                r = null;
              if (i.length) {
                let e = i[0],
                  n = aB.find((t) => Array.isArray(e[t]));
                if (1 !== Object.keys(e).length) return;
                let a = t.filter((t) => t !== e),
                  o = e[n].map((e) => aq([...a, e]));
                if (o.some((e) => !e)) return;
                r = { [n]: o };
              } else r = aq(t);
              r && (delete e.allOf, aR(e, r));
            })(e);
      }
    }
    let n = {};
    if (
      ("draft-2020-12" === e.target
        ? (n.$schema = "https://json-schema.org/draft/2020-12/schema")
        : "draft-07" === e.target
          ? (n.$schema = "http://json-schema.org/draft-07/schema#")
          : "draft-04" === e.target
            ? (n.$schema = "http://json-schema.org/draft-04/schema#")
            : e.target,
      e.external?.uri)
    ) {
      let i = e.external.registry.get(t)?.id;
      if (!i) throw Error("Schema is missing an `id` property");
      n.$id = e.external.uri(i);
    }
    aR(n, i.defId ? i.schema : (i.def ?? i.schema));
    let o = e.metadataRegistry.get(t)?.id;
    void 0 !== o && n.id === o && delete n.id;
    let u = e.external?.defs ?? {};
    if (!e.external || e.sharedEmitDoneFor !== e.external)
      for (let t of e.seen.entries()) {
        let e = t[1];
        e.def &&
          e.defId &&
          (e.def.id === e.defId && delete e.def.id,
          (0, a.assignProp)(u, e.defId, e.def));
      }
    (e.external && (e.sharedEmitDoneFor = e.external),
      e.external ||
        (Object.keys(u).length > 0 &&
          ("draft-2020-12" === e.target
            ? (n.$defs = u)
            : (n.definitions = u))));
    try {
      let i = JSON.parse(JSON.stringify(n));
      return (
        Object.defineProperty(i, "~standard", {
          value: {
            ...t["~standard"],
            jsonSchema: {
              input: aQ(t, "input", e.processors),
              output: aQ(t, "output", e.processors),
            },
          },
          enumerable: !1,
          writable: !1,
        }),
        i
      );
    } catch (e) {
      throw Error("Error converting schema to JSON.");
    }
  }
  let aY =
      (e, t = {}) =>
      (i) => {
        let r = aJ({ ...i, processors: t });
        return (aF(e, r), aK(r, e), aH(r, e));
      },
    aQ =
      (e, t, i = {}) =>
      (r) => {
        let { libraryOptions: n, target: a } = r ?? {},
          o = aJ({ ...(n ?? {}), target: a, io: t, processors: i });
        return (aF(e, o), aK(o, e), aH(o, e));
      };
  (e.s(
    [
      "createStandardJSONSchemaMethod",
      0,
      aQ,
      "createToJSONSchemaMethod",
      0,
      aY,
      "extractDefs",
      0,
      aK,
      "finalize",
      0,
      aH,
      "handleUnrepresentable",
      0,
      aM,
      "initializeContext",
      0,
      aJ,
      "process",
      0,
      aF,
    ],
    460714,
  ),
    e.i(460714));
  let a0 = {
      guid: "uuid",
      url: "uri",
      datetime: "date-time",
      json_string: "json-string",
      regex: "",
    },
    a4 = (e, t, i, r) => {
      i.type = "string";
      let {
        minimum: n,
        maximum: a,
        format: o,
        patterns: u,
        contentEncoding: s,
        laxFormat: l,
      } = e._zod.bag;
      if (
        ("number" == typeof n && (i.minLength = n),
        "number" == typeof a && (i.maxLength = a),
        o &&
          ((i.format = a0[o] ?? o),
          "" === i.format && delete i.format,
          ("time" === o || l) && delete i.format),
        s && (i.contentEncoding = s),
        u && u.size > 0)
      ) {
        let e = [...u];
        1 === e.length
          ? (i.pattern = e[0].source)
          : e.length > 1 &&
            (i.allOf = [
              ...e.map((e) => ({
                ...("draft-07" === t.target ||
                "draft-04" === t.target ||
                "openapi-3.0" === t.target
                  ? { type: "string" }
                  : {}),
                pattern: e.source,
              })),
            ]);
      }
    },
    a6 = (e, t, i, r) => {
      let {
        minimum: n,
        maximum: a,
        format: o,
        multipleOf: u,
        exclusiveMaximum: s,
        exclusiveMinimum: l,
      } = e._zod.bag;
      "string" == typeof o && o.includes("int")
        ? (i.type = "integer")
        : (i.type = "number");
      let d = "number" == typeof l && l >= (n ?? -1 / 0),
        c = "number" == typeof s && s <= (a ?? 1 / 0),
        m = "draft-04" === t.target || "openapi-3.0" === t.target;
      (d
        ? m
          ? ((i.minimum = l), (i.exclusiveMinimum = !0))
          : (i.exclusiveMinimum = l)
        : "number" == typeof n && (i.minimum = n),
        c
          ? m
            ? ((i.maximum = s), (i.exclusiveMaximum = !0))
            : (i.exclusiveMaximum = s)
          : "number" == typeof a && (i.maximum = a),
        "number" == typeof u &&
          (Number.isFinite(u) && 0 !== u
            ? (i.multipleOf = Math.abs(u))
            : aM(
                e,
                t,
                i,
                r,
                `A multipleOf divisor of ${u} cannot be represented in JSON Schema`,
              )));
    },
    a1 = (e, t, i, r) => {
      i.type = "boolean";
    },
    a2 = (e, t, i, r) => {
      aM(e, t, i, r, "BigInt cannot be represented in JSON Schema");
    },
    a9 = (e, t, i, r) => {
      aM(e, t, i, r, "Symbols cannot be represented in JSON Schema");
    },
    a7 = (e, t, i, r) => {
      "openapi-3.0" === t.target
        ? ((i.type = "string"), (i.nullable = !0), (i.enum = [null]))
        : (i.type = "null");
    },
    a3 = (e, t, i, r) => {
      aM(e, t, i, r, "Undefined cannot be represented in JSON Schema");
    },
    a5 = (e, t, i, r) => {
      aM(e, t, i, r, "Void cannot be represented in JSON Schema");
    },
    a8 = (e, t, i, r) => {
      i.not = {};
    },
    oe = (e, t, i, r) => {},
    ot = (e, t, i, r) => {},
    oi = (e, t, i, r) => {
      aM(e, t, i, r, "Date cannot be represented in JSON Schema");
    },
    or = (e, t, i, r) => {
      let n = e._zod.def,
        o = (0, a.getEnumValues)(n.entries);
      if (0 === o.length) {
        i.not = {};
        return;
      }
      (o.every((e) => "number" == typeof e) && (i.type = "number"),
        o.every((e) => "string" == typeof e) && (i.type = "string"),
        (i.enum = o));
    },
    on = (e, t, i, r) => {
      let n = e._zod.def;
      if (0 === n.values.length) {
        i.not = {};
        return;
      }
      let a = [];
      for (let o of n.values)
        if (void 0 === o) {
          if (
            aM(
              e,
              t,
              i,
              r,
              "Literal `undefined` cannot be represented in JSON Schema",
            )
          )
            return;
        } else if ("bigint" == typeof o) {
          if (
            aM(
              e,
              t,
              i,
              r,
              "BigInt literals cannot be represented in JSON Schema",
            )
          )
            return;
          a.push(Number(o));
        } else a.push(o);
      if (0 === a.length);
      else if (1 === a.length) {
        let e = a[0];
        ((i.type = null === e ? "null" : typeof e),
          "draft-04" === t.target || "openapi-3.0" === t.target
            ? (i.enum = [e])
            : (i.const = e));
      } else
        (a.every((e) => "number" == typeof e) && (i.type = "number"),
          a.every((e) => "string" == typeof e) && (i.type = "string"),
          a.every((e) => "boolean" == typeof e) && (i.type = "boolean"),
          a.every((e) => null === e) && (i.type = "null"),
          (i.enum = a));
    },
    oa = (e, t, i, r) => {
      aM(e, t, i, r, "NaN cannot be represented in JSON Schema");
    },
    oo = (e, t, i, r) => {
      let n = e._zod.pattern;
      if (!n) throw Error("Pattern not found in template literal");
      ((i.type = "string"), (i.pattern = n.source));
    },
    ou = (e, t, i, r) => {
      let n = { type: "string", format: "binary", contentEncoding: "binary" },
        { minimum: a, maximum: o, mime: u } = e._zod.bag;
      (void 0 !== a && (n.minLength = a),
        void 0 !== o && (n.maxLength = o),
        u
          ? 1 === u.length
            ? ((n.contentMediaType = u[0]), Object.assign(i, n))
            : (Object.assign(i, n),
              (i.anyOf = u.map((e) => ({ contentMediaType: e }))))
          : Object.assign(i, n));
    },
    os = (e, t, i, r) => {
      i.type = "boolean";
    },
    ol = (e, t, i, r) => {
      aM(e, t, i, r, "Custom types cannot be represented in JSON Schema");
    },
    od = (e, t, i, r) => {
      aM(e, t, i, r, "Function types cannot be represented in JSON Schema");
    },
    oc = (e, t, i, r) => {
      aM(e, t, i, r, "Transforms cannot be represented in JSON Schema");
    },
    om = (e, t, i, r) => {
      aM(e, t, i, r, "Map cannot be represented in JSON Schema");
    },
    of = (e, t, i, r) => {
      aM(e, t, i, r, "Set cannot be represented in JSON Schema");
    },
    op = (e, t, i, r) => {
      let n = e._zod.def,
        { minimum: a, maximum: o } = e._zod.bag;
      ("number" == typeof a && (i.minItems = a),
        "number" == typeof o && (i.maxItems = o),
        (i.type = "array"),
        (i.items = aF(n.element, t, { ...r, path: [...r.path, "items"] })));
    };
  function ov(e) {
    let t = e._zod.def;
    return "pipe" === t.type && t.in._zod.traits.has("$ZodTransform")
      ? ov(t.out)
      : "catch" === t.type
        ? ov(t.innerType)
        : e._zod.optin;
  }
  let og = (e, t, i, r) => {
      let n = e._zod.def,
        o = n.shape;
      if (
        Object.getOwnPropertySymbols(o).length &&
        aM(e, t, i, r, "Symbol keys cannot be represented in JSON Schema")
      )
        return;
      for (let e in ((i.type = "object"), (i.properties = {}), o))
        (0, a.assignProp)(
          i.properties,
          e,
          aF(o[e], t, { ...r, path: [...r.path, "properties", e] }),
        );
      let u = new Set(
        [...new Set(Object.keys(o))].filter((e) => {
          let i = n.shape[e];
          return "input" === t.io ? void 0 === ov(i) : void 0 === i._zod.optout;
        }),
      );
      (u.size > 0 && (i.required = Array.from(u)),
        n.catchall?._zod.def.type === "never"
          ? (i.additionalProperties = !1)
          : n.catchall
            ? n.catchall &&
              (i.additionalProperties = aF(n.catchall, t, {
                ...r,
                path: [...r.path, "additionalProperties"],
              }))
            : "output" === t.io && (i.additionalProperties = !1));
    },
    o$ = (e, t, i, r) => {
      let n = e._zod.def,
        a = !1 === n.inclusive,
        o = n.options.map((e, i) =>
          aF(e, t, { ...r, path: [...r.path, a ? "oneOf" : "anyOf", i] }),
        );
      a ? (i.oneOf = o) : (i.anyOf = o);
    },
    oh = (e, t, i, r) => {
      let n = e._zod.def,
        a = aF(n.left, t, { ...r, path: [...r.path, "allOf", 0] }),
        o = aF(n.right, t, { ...r, path: [...r.path, "allOf", 1] }),
        u = (e) => "allOf" in e && 1 === Object.keys(e).length,
        s = [...(u(a) ? a.allOf : [a]), ...(u(o) ? o.allOf : [o])];
      ((i.allOf = s), t.intersections.push(s));
    },
    oy = (e, t, i, r) => {
      let n = e._zod.def;
      i.type = "array";
      let a = "draft-2020-12" === t.target ? "prefixItems" : "items",
        o =
          "draft-2020-12" === t.target || "openapi-3.0" === t.target
            ? "items"
            : "additionalItems",
        u = n.items.map((e, i) => aF(e, t, { ...r, path: [...r.path, a, i] })),
        s = n.rest
          ? aF(n.rest, t, {
              ...r,
              path: [
                ...r.path,
                o,
                ...("openapi-3.0" === t.target ? [n.items.length] : []),
              ],
            })
          : null,
        l = n.items.length;
      for (; l > 0; ) {
        let e = n.items[l - 1];
        if (
          !("input" === t.io ? void 0 !== ov(e) : "optional" === e._zod.optout)
        )
          break;
        l--;
      }
      let d = n.items.length,
        c = !n.rest;
      ("draft-2020-12" === t.target
        ? ((i.prefixItems = u), c ? (i.items = !1) : s && (i.items = s))
        : "openapi-3.0" === t.target
          ? ((i.items = { anyOf: u }), s && i.items.anyOf.push(s))
          : ((i.items = u),
            c ? (i.additionalItems = !1) : s && (i.additionalItems = s)),
        l > 0 && (i.minItems = l),
        c && (i.maxItems = d));
      let { minimum: m, maximum: f } = e._zod.bag;
      ("number" == typeof m && (i.minItems = m),
        "number" == typeof f && (i.maxItems = f));
    },
    o_ = new WeakMap(),
    ob = (e, t, i, r) => {
      let n = e._zod.def;
      i.type = "object";
      let o = n.keyType,
        u = o._zod.bag,
        s = u?.patterns;
      if ("loose" === n.mode && s && s.size > 0) {
        let e = aF(n.valueType, t, {
          ...r,
          path: [...r.path, "patternProperties", "*"],
        });
        for (let t of ((i.patternProperties = {}), s))
          (0, a.assignProp)(i.patternProperties, t.source, e);
      } else {
        if ("draft-07" === t.target || "draft-2020-12" === t.target) {
          i.propertyNames = aF(n.keyType, t, {
            ...r,
            path: [...r.path, "propertyNames"],
          });
          let a = o_.get(t);
          (a ||
            ((a = []),
            o_.set(t, a),
            t.deferred.push(() =>
              (function (e) {
                let t = new Map();
                for (let i of e.seen.values())
                  i.def && !t.has(i.schema) && t.set(i.schema, i);
                let i = new Map();
                for (let r of o_.get(e) ?? []) {
                  let n = e.seen.get(r),
                    a = (n?.def ?? n?.schema)?.propertyNames;
                  if (!a || !0 === a || i.has(a)) continue;
                  let o = (function e(t, i, r) {
                    if (i.$ref) {
                      if (r.has(i)) return i;
                      r.add(i);
                      let n = t.get(i)?.def;
                      if (!n) return i;
                      let a = e(t, n, r);
                      return a === n ? i : a;
                    }
                    for (let n of ["anyOf", "oneOf"]) {
                      let a = i[n];
                      if (!Array.isArray(a)) continue;
                      let o = a.map((i) => e(t, i, r));
                      o.some((e, t) => e !== a[t]) && (i = { ...i, [n]: o });
                    }
                    let n = Array.isArray(i.type) ? i.type : [i.type],
                      a =
                        !n.includes("string") &&
                        n.some((e) => "number" === e || "integer" === e),
                      o = i.enum ?? (void 0 !== i.const ? [i.const] : void 0);
                    if (!a && !o?.some((e) => "number" == typeof e)) return i;
                    let {
                      minimum: u,
                      maximum: s,
                      exclusiveMinimum: l,
                      exclusiveMaximum: d,
                      multipleOf: c,
                      format: m,
                      id: f,
                      ...p
                    } = i;
                    return (
                      p.enum
                        ? (p.enum = p.enum.map((e) =>
                            "number" == typeof e ? String(e) : e,
                          ))
                        : "number" == typeof p.const &&
                          (p.const = String(p.const)),
                      a &&
                        ((p.type = "string"),
                        o ||
                          (p.pattern = (
                            n.includes("number") ? eS : ez
                          ).source)),
                      p
                    );
                  })(t, a, new Set());
                  o !== a && i.set(a, o);
                }
                if (i.size)
                  for (let t of e.seen.values())
                    for (let e of [t.schema, t.def]) {
                      let t = e && i.get(e.propertyNames);
                      t && (e.propertyNames = t);
                    }
              })(t),
            )),
            a.push(e));
        }
        i.additionalProperties = aF(n.valueType, t, {
          ...r,
          path: [...r.path, "additionalProperties"],
        });
      }
      let l = o._zod.values,
        d = "input" === t.io && void 0 !== ov(n.valueType);
      if (l && !n.partial && !d) {
        let e = [...l].filter(
          (e) => "string" == typeof e || "number" == typeof e,
        );
        e.length > 0 && (i.required = e.map(String));
      }
    },
    ox = (e, t, i, r) => {
      let n = e._zod.def,
        a = aF(n.innerType, t, r),
        o = t.seen.get(e);
      "openapi-3.0" === t.target
        ? ((o.ref = n.innerType), (i.nullable = !0))
        : (i.anyOf = [a, { type: "null" }]);
    },
    ok = (e, t, i, r) => {
      let n = e._zod.def;
      (aF(n.innerType, t, r), (t.seen.get(e).ref = n.innerType));
    },
    oI = Symbol();
  function ow(e, t, i, r, n) {
    let a = !1,
      o = JSON.stringify(e, (e, t) =>
        "bigint" != typeof t ? t : ((a = !0), null),
      );
    return a
      ? (aM(t, i, r, n, "BigInt defaults cannot be represented in JSON Schema"),
        oI)
      : JSON.parse(o);
  }
  let oz = (e, t, i, r) => {
      let n = e._zod.def;
      (aF(n.innerType, t, r), (t.seen.get(e).ref = n.innerType));
      let a = ow(n.defaultValue, e, t, i, r);
      a !== oI && (i.default = a);
    },
    oS = (e, t, i, r) => {
      let n = e._zod.def;
      if (
        (aF(n.innerType, t, r),
        (t.seen.get(e).ref = n.innerType),
        "input" !== t.io)
      )
        return;
      let a = ow(n.defaultValue, e, t, i, r);
      a !== oI && (i._prefault = a);
    },
    oU = (e, t, i, r) => {
      let n,
        a = e._zod.def;
      (aF(a.innerType, t, r), (t.seen.get(e).ref = a.innerType));
      try {
        n = a.catchValue(void 0);
      } catch {
        aM(e, t, i, r, "Dynamic catch values are not supported in JSON Schema");
        return;
      }
      i.default = n;
    },
    oj = (e, t, i, r) => {
      let n = e._zod.def,
        a = n.in._zod.traits.has("$ZodTransform"),
        o = "input" === t.io ? (a ? n.out : n.in) : n.out;
      (aF(o, t, r), (t.seen.get(e).ref = o));
    },
    oD = (e, t, i, r) => {
      let n = e._zod.def;
      (aF(n.innerType, t, r),
        (t.seen.get(e).ref = n.innerType),
        (i.readOnly = !0));
    },
    oO = (e, t, i, r) => {
      let n = e._zod.def;
      (aF(n.innerType, t, r), (t.seen.get(e).ref = n.innerType));
    },
    oZ = (e, t, i, r) => {
      let n = e._zod.def;
      (aF(n.innerType, t, r), (t.seen.get(e).ref = n.innerType));
    },
    oP = (e, t, i, r) => {
      let n = e._zod.innerType;
      (aF(n, t, r), (t.seen.get(e).ref = n));
    },
    oN = {
      string: a4,
      number: a6,
      boolean: a1,
      bigint: a2,
      symbol: a9,
      null: a7,
      undefined: a3,
      void: a5,
      never: a8,
      any: oe,
      unknown: ot,
      date: oi,
      enum: or,
      literal: on,
      nan: oa,
      template_literal: oo,
      file: ou,
      success: os,
      custom: ol,
      function: od,
      transform: oc,
      map: om,
      set: of,
      array: op,
      object: og,
      union: o$,
      intersection: oh,
      tuple: oy,
      record: ob,
      nullable: ox,
      nonoptional: ok,
      default: oz,
      prefault: oS,
      catch: oU,
      pipe: oj,
      readonly: oD,
      promise: oO,
      optional: oZ,
      lazy: oP,
    };
  function oA(e, t) {
    if ("_idmap" in e) {
      let i = aJ({ ...t, processors: oN }),
        r = {};
      for (let t of e._idmap.entries()) {
        let [e, r] = t;
        aF(r, i);
      }
      let n = {};
      for (let o of ((i.external = { registry: e, uri: t?.uri, defs: r }),
      e._idmap.entries())) {
        let [e, t] = o;
        (aK(i, t), (0, a.assignProp)(n, e, aH(i, t)));
      }
      return (
        Object.keys(r).length > 0 &&
          (n.__shared = {
            ["draft-2020-12" === i.target ? "$defs" : "definitions"]: r,
          }),
        { schemas: n }
      );
    }
    let i = aJ({ ...t, processors: oN });
    return (aF(e, i), aK(i, e), aH(i, e));
  }
  e.s([], 608191);
  var oT = e.i(608191);
  e.s(
    [
      "$ZodAny",
      0,
      t3,
      "$ZodArray",
      0,
      ir,
      "$ZodAsyncError",
      () => n.$ZodAsyncError,
      "$ZodBase64",
      0,
      tM,
      "$ZodBase64URL",
      0,
      tW,
      "$ZodBigInt",
      0,
      t6,
      "$ZodBigIntFormat",
      0,
      t1,
      "$ZodBoolean",
      0,
      t4,
      "$ZodCIDRv4",
      0,
      tC,
      "$ZodCIDRv6",
      0,
      tR,
      "$ZodCUID",
      0,
      tw,
      "$ZodCUID2",
      0,
      tz,
      "$ZodCatch",
      0,
      iK,
      "$ZodCheck",
      0,
      eW,
      "$ZodCheckBigIntFormat",
      0,
      eQ,
      "$ZodCheckEndsWith",
      0,
      ti,
      "$ZodCheckGreaterThan",
      0,
      eq,
      "$ZodCheckIncludes",
      0,
      te,
      "$ZodCheckLengthEquals",
      0,
      e9,
      "$ZodCheckLessThan",
      0,
      eX,
      "$ZodCheckLowerCase",
      0,
      e5,
      "$ZodCheckMaxLength",
      0,
      e1,
      "$ZodCheckMaxSize",
      0,
      e0,
      "$ZodCheckMimeType",
      0,
      ta,
      "$ZodCheckMinLength",
      0,
      e2,
      "$ZodCheckMinSize",
      0,
      e4,
      "$ZodCheckMultipleOf",
      0,
      eH,
      "$ZodCheckNumberFormat",
      0,
      eY,
      "$ZodCheckOverwrite",
      0,
      to,
      "$ZodCheckProperty",
      0,
      tn,
      "$ZodCheckRegex",
      0,
      e3,
      "$ZodCheckSizeEquals",
      0,
      e6,
      "$ZodCheckStartsWith",
      0,
      tt,
      "$ZodCheckStringFormat",
      0,
      e7,
      "$ZodCheckUpperCase",
      0,
      e8,
      "$ZodCodec",
      0,
      iq,
      "$ZodCreditCard",
      0,
      tX,
      "$ZodCustom",
      0,
      i7,
      "$ZodCustomStringFormat",
      0,
      tY,
      "$ZodCyclicError",
      0,
      i5,
      "$ZodDate",
      0,
      it,
      "$ZodDefault",
      0,
      iC,
      "$ZodDiscriminatedUnion",
      0,
      ih,
      "$ZodE164",
      0,
      tK,
      "$ZodEmail",
      0,
      tg,
      "$ZodEmoji",
      0,
      tk,
      "$ZodEncodeError",
      () => n.$ZodEncodeError,
      "$ZodEnum",
      0,
      iO,
      "$ZodError",
      0,
      c,
      "$ZodExactOptional",
      0,
      iE,
      "$ZodFile",
      0,
      iP,
      "$ZodFunction",
      0,
      i1,
      "$ZodGUID",
      0,
      tp,
      "$ZodIPv4",
      0,
      tN,
      "$ZodIPv6",
      0,
      tE,
      "$ZodISODate",
      0,
      tO,
      "$ZodISODateTime",
      0,
      tD,
      "$ZodISODuration",
      0,
      tP,
      "$ZodISOTime",
      0,
      tZ,
      "$ZodIntersection",
      0,
      iy,
      "$ZodJWT",
      0,
      tH,
      "$ZodKSUID",
      0,
      tj,
      "$ZodLazy",
      0,
      i9,
      "$ZodLiteral",
      0,
      iZ,
      "$ZodMAC",
      0,
      tL,
      "$ZodMap",
      0,
      iS,
      "$ZodNaN",
      0,
      iG,
      "$ZodNanoID",
      0,
      tI,
      "$ZodNever",
      0,
      t8,
      "$ZodNonOptional",
      0,
      iJ,
      "$ZodNull",
      0,
      t7,
      "$ZodNullable",
      0,
      iL,
      "$ZodNumber",
      0,
      tQ,
      "$ZodNumberFormat",
      0,
      t0,
      "$ZodObject",
      0,
      id,
      "$ZodObjectJIT",
      0,
      ic,
      "$ZodOptional",
      0,
      iT,
      "$ZodPipe",
      0,
      iB,
      "$ZodPrefault",
      0,
      iR,
      "$ZodPreprocess",
      0,
      iQ,
      "$ZodPromise",
      0,
      i2,
      "$ZodReadonly",
      0,
      i0,
      "$ZodRealError",
      0,
      m,
      "$ZodRecord",
      0,
      iz,
      "$ZodRegistry",
      0,
      rk,
      "$ZodSet",
      0,
      ij,
      "$ZodString",
      0,
      tm,
      "$ZodStringFormat",
      0,
      tf,
      "$ZodSuccess",
      0,
      iF,
      "$ZodSymbol",
      0,
      t2,
      "$ZodTemplateLiteral",
      0,
      i6,
      "$ZodTransform",
      0,
      iN,
      "$ZodTuple",
      0,
      ix,
      "$ZodType",
      0,
      tl,
      "$ZodULID",
      0,
      tS,
      "$ZodURL",
      0,
      tx,
      "$ZodUUID",
      0,
      tv,
      "$ZodUndefined",
      0,
      t9,
      "$ZodUnion",
      0,
      ip,
      "$ZodUnknown",
      0,
      t5,
      "$ZodVoid",
      0,
      ie,
      "$ZodXID",
      0,
      tU,
      "$ZodXor",
      0,
      ig,
      "$brand",
      () => n.$brand,
      "$constructor",
      () => n.$constructor,
      "$input",
      0,
      rx,
      "$output",
      0,
      rb,
      "Doc",
      0,
      tu,
      "INVALID",
      0,
      rz,
      "JSONSchema",
      0,
      oT,
      "JSONSchemaGenerator",
      0,
      class {
        get metadataRegistry() {
          return this.ctx.metadataRegistry;
        }
        get target() {
          return this.ctx.target;
        }
        get unrepresentable() {
          return this.ctx.unrepresentable;
        }
        get override() {
          return this.ctx.override;
        }
        get io() {
          return this.ctx.io;
        }
        get counter() {
          return this.ctx.counter;
        }
        set counter(e) {
          this.ctx.counter = e;
        }
        get seen() {
          return this.ctx.seen;
        }
        constructor(e) {
          let t = e?.target ?? "draft-2020-12";
          ("draft-4" === t && (t = "draft-04"),
            "draft-7" === t && (t = "draft-07"),
            (this.ctx = aJ({
              processors: oN,
              target: t,
              ...(e?.metadata && { metadata: e.metadata }),
              ...(e?.unrepresentable && { unrepresentable: e.unrepresentable }),
              ...(e?.override && { override: e.override }),
              ...(e?.io && { io: e.io }),
            })));
        }
        process(e, t = { path: [], schemaPath: [] }) {
          return aF(e, this.ctx, t);
        }
        emit(e, t) {
          (t &&
            (t.cycles && (this.ctx.cycles = t.cycles),
            t.reused && (this.ctx.reused = t.reused),
            t.external && (this.ctx.external = t.external)),
            (this.ctx.sharedDefsExtractedFor = void 0),
            (this.ctx.sharedEmitDoneFor = void 0),
            aK(this.ctx, e));
          let { "~standard": i, ...r } = aH(this.ctx, e);
          return r;
        }
      },
      "NEVER",
      () => n.NEVER,
      "TimePrecision",
      0,
      np,
      "URL_BAD_FORMAT",
      0,
      1,
      "URL_UNPARSEABLE",
      0,
      2,
      "ZodCompileAsyncError",
      0,
      rU,
      "ZodCompileUnsupportedError",
      0,
      rj,
      "_any",
      0,
      nA,
      "_array",
      0,
      as,
      "_base64",
      0,
      nl,
      "_base64url",
      0,
      nd,
      "_bigint",
      0,
      nU,
      "_boolean",
      0,
      nz,
      "_catch",
      0,
      aS,
      "_check",
      0,
      aT,
      "_cidrv4",
      0,
      nu,
      "_cidrv6",
      0,
      ns,
      "_coercedBigint",
      0,
      nj,
      "_coercedBoolean",
      0,
      nS,
      "_coercedDate",
      0,
      nV,
      "_coercedNumber",
      0,
      n_,
      "_coercedString",
      0,
      rQ,
      "_creditCard",
      0,
      nm,
      "_cuid",
      0,
      r8,
      "_cuid2",
      0,
      ne,
      "_custom",
      0,
      aP,
      "_date",
      0,
      nC,
      "_decode",
      0,
      P,
      "_decodeAsync",
      0,
      E,
      "_default",
      0,
      aI,
      "_discriminatedUnion",
      0,
      ac,
      "_e164",
      0,
      nc,
      "_email",
      0,
      r0,
      "_emoji",
      0,
      r3,
      "_encode",
      0,
      O,
      "_encodeAsync",
      0,
      A,
      "_endsWith",
      0,
      n5,
      "_enum",
      0,
      a$,
      "_file",
      0,
      a_,
      "_float32",
      0,
      nx,
      "_float64",
      0,
      nk,
      "_gt",
      0,
      nF,
      "_gte",
      0,
      nW,
      "_guid",
      0,
      r4,
      "_includes",
      0,
      n7,
      "_int",
      0,
      nb,
      "_int32",
      0,
      nI,
      "_int64",
      0,
      nD,
      "_intersection",
      0,
      am,
      "_ipv4",
      0,
      nn,
      "_ipv6",
      0,
      na,
      "_isoDate",
      0,
      ng,
      "_isoDateTime",
      0,
      nv,
      "_isoDuration",
      0,
      nh,
      "_isoTime",
      0,
      n$,
      "_jwt",
      0,
      nf,
      "_ksuid",
      0,
      nr,
      "_lazy",
      0,
      aO,
      "_length",
      0,
      n6,
      "_literal",
      0,
      ay,
      "_lowercase",
      0,
      n2,
      "_lt",
      0,
      nJ,
      "_lte",
      0,
      nM,
      "_mac",
      0,
      no,
      "_map",
      0,
      av,
      "_max",
      0,
      nM,
      "_maxLength",
      0,
      n0,
      "_maxSize",
      0,
      nH,
      "_mime",
      0,
      at,
      "_min",
      0,
      nW,
      "_minLength",
      0,
      n4,
      "_minSize",
      0,
      nY,
      "_multipleOf",
      0,
      nq,
      "_nan",
      0,
      nR,
      "_nanoid",
      0,
      r5,
      "_nativeEnum",
      0,
      ah,
      "_negative",
      0,
      nG,
      "_never",
      0,
      nE,
      "_nonnegative",
      0,
      nX,
      "_nonoptional",
      0,
      aw,
      "_nonpositive",
      0,
      nB,
      "_normalize",
      0,
      ar,
      "_null",
      0,
      nN,
      "_nullable",
      0,
      ak,
      "_number",
      0,
      ny,
      "_optional",
      0,
      ax,
      "_overwrite",
      0,
      ai,
      "_parse",
      0,
      y,
      "_parseAsync",
      0,
      b,
      "_pipe",
      0,
      aU,
      "_positive",
      0,
      nK,
      "_promise",
      0,
      aZ,
      "_properties",
      0,
      ae,
      "_property",
      0,
      n8,
      "_readonly",
      0,
      aj,
      "_record",
      0,
      ap,
      "_refine",
      0,
      aN,
      "_regex",
      0,
      n1,
      "_safeDecode",
      0,
      R,
      "_safeDecodeAsync",
      0,
      W,
      "_safeEncode",
      0,
      C,
      "_safeEncodeAsync",
      0,
      M,
      "_safeParse",
      0,
      k,
      "_safeParseAsync",
      0,
      w,
      "_set",
      0,
      ag,
      "_size",
      0,
      nQ,
      "_slugify",
      0,
      au,
      "_startsWith",
      0,
      n3,
      "_string",
      0,
      rY,
      "_stringFormat",
      0,
      aV,
      "_stringbool",
      0,
      aC,
      "_success",
      0,
      az,
      "_superRefine",
      0,
      aA,
      "_symbol",
      0,
      nZ,
      "_templateLiteral",
      0,
      aD,
      "_toLowerCase",
      0,
      aa,
      "_toUpperCase",
      0,
      ao,
      "_transform",
      0,
      ab,
      "_trim",
      0,
      an,
      "_tuple",
      0,
      af,
      "_uint32",
      0,
      nw,
      "_uint64",
      0,
      nO,
      "_ulid",
      0,
      nt,
      "_undefined",
      0,
      nP,
      "_union",
      0,
      al,
      "_unknown",
      0,
      nT,
      "_uppercase",
      0,
      n9,
      "_url",
      0,
      r7,
      "_uuid",
      0,
      r6,
      "_uuidv4",
      0,
      r1,
      "_uuidv6",
      0,
      r2,
      "_uuidv7",
      0,
      r9,
      "_void",
      0,
      nL,
      "_xid",
      0,
      ni,
      "_xor",
      0,
      ad,
      "clone",
      () => a.clone,
      "compile",
      0,
      rD,
      "compileFn",
      0,
      rO,
      "config",
      () => n.config,
      "createStandardJSONSchemaMethod",
      0,
      aQ,
      "createToJSONSchemaMethod",
      0,
      aY,
      "decode",
      0,
      N,
      "decodeAsync",
      0,
      L,
      "describe",
      0,
      aE,
      "encode",
      0,
      Z,
      "encodeAsync",
      0,
      T,
      "extractDefs",
      0,
      aK,
      "finalize",
      0,
      aH,
      "flattenError",
      0,
      f,
      "formatError",
      0,
      p,
      "getDiscriminatedOption",
      0,
      i$,
      "globalConfig",
      () => n.globalConfig,
      "globalRegistry",
      0,
      rw,
      "handleUnrepresentable",
      0,
      aM,
      "initializeContext",
      0,
      aJ,
      "isBackEdge",
      0,
      rs,
      "isRecursiveSchema",
      0,
      rn,
      "isValidBase64",
      0,
      tJ,
      "isValidBase64URL",
      0,
      tF,
      "isValidCIDRv6",
      0,
      tV,
      "isValidCreditCard",
      0,
      tB,
      "isValidIPv6",
      0,
      tT,
      "isValidJWT",
      0,
      tq,
      "locales",
      0,
      r_,
      "memoizer",
      0,
      ru,
      "mergeValues",
      0,
      i_,
      "meta",
      0,
      aL,
      "parse",
      0,
      _,
      "parseAsync",
      0,
      x,
      "parseURLObject",
      0,
      t$,
      "prettifyError",
      0,
      $,
      "process",
      0,
      aF,
      "regexes",
      0,
      rd,
      "registry",
      0,
      rI,
      "safeDecode",
      0,
      J,
      "safeDecodeAsync",
      0,
      K,
      "safeEncode",
      0,
      V,
      "safeEncodeAsync",
      0,
      F,
      "safeParse",
      0,
      I,
      "safeParseAsync",
      0,
      z,
      "standardProps",
      0,
      tc,
      "stripTabAndNewline",
      0,
      ty,
      "toDotPath",
      0,
      g,
      "toJSONSchema",
      0,
      oA,
      "toZod",
      () => rl.toZod,
      "treeifyError",
      0,
      v,
      "urlHostnameOk",
      0,
      t_,
      "urlProtocolOk",
      0,
      tb,
      "util",
      0,
      rl,
      "validate",
      0,
      j,
      "validateAsync",
      0,
      D,
      "version",
      0,
      ts,
    ],
    472661,
  );
  var oE = e.i(472661),
    oL = rd,
    oC = a;
  let oV = new WeakSet([Object.prototype, Error.prototype]);
  function oR(e, t, i) {
    Object.defineProperty(e, t, {
      configurable: !0,
      enumerable: !1,
      get() {
        let e = i(this);
        return (
          Object.defineProperty(this, t, {
            value: e,
            configurable: !0,
            writable: !0,
          }),
          e
        );
      },
      set(e) {
        Object.defineProperty(this, t, {
          value: e,
          configurable: !0,
          writable: !0,
        });
      },
    });
  }
  let oJ = (e, t) => {
      (c.init(e, t), (e.name = "ZodError"));
      let i = Object.getPrototypeOf(e);
      oV.has(i) ||
        (oV.add(i),
        oR(i, "format", (e) => (t) => p(e, t)),
        oR(i, "flatten", (e) => (t) => f(e, t)),
        oR(i, "addIssue", (e) => (t) => {
          (e.issues.push(t),
            (e.message = JSON.stringify(e.issues, a.jsonStringifyReplacer, 2)));
        }),
        oR(i, "addIssues", (e) => (t) => {
          (e.issues.push(...t),
            (e.message = JSON.stringify(e.issues, a.jsonStringifyReplacer, 2)));
        }),
        Object.defineProperty(i, "isEmpty", {
          configurable: !0,
          enumerable: !1,
          get() {
            return 0 === this.issues.length;
          },
        }));
    },
    oM = n.$constructor("ZodError", oJ),
    oF = n.$constructor("ZodError", oJ, void 0, { Parent: Error });
  e.s(["ZodError", 0, oM, "ZodRealError", 0, oF], 418587);
  let oW = y(oF),
    oK = b(oF),
    oG = k(oF),
    oB = w(oF),
    oX = O(oF),
    oq = P(oF),
    oH = A(oF),
    oY = E(oF),
    oQ = C(oF),
    o0 = R(oF),
    o4 = M(oF),
    o6 = W(oF);
  function o1() {
    n.globalConfig.memoizer || n.config({ memoizer: ru() });
  }
  let o2 = n.$constructor(
      "ZodType",
      (e, t) => (
        n.globalConfig.localeError || n.config(rm()),
        tl.init(e, t),
        (e.def = t),
        (e.type = t.type),
        e
      ),
      {
        check(...e) {
          let t = this.def;
          return this.clone(
            a.mergeDefs(t, {
              checks: [
                ...(t.checks ?? []),
                ...e.map((e) =>
                  "function" == typeof e
                    ? {
                        _zod: {
                          check: e,
                          def: { check: "custom" },
                          onattach: [],
                        },
                      }
                    : e,
                ),
              ],
            }),
            { parent: !0 },
          );
        },
        with(...e) {
          return this.check(...e);
        },
        clone(e, t) {
          return a.clone(this, e, t);
        },
        brand() {
          return this;
        },
        register(e, t) {
          return (e.add(this, t), this);
        },
        refine(e, t) {
          return this.check(lj(e, t));
        },
        superRefine(e, t) {
          return this.check(lD(e, t));
        },
        overwrite(e) {
          return this.check(ai(e));
        },
        optional() {
          return s6(this);
        },
        exactOptional() {
          return s2(this);
        },
        nullable() {
          return s7(this);
        },
        nullish() {
          return s6(s7(this));
        },
        nonoptional(e) {
          return lr(this, e);
        },
        array() {
          return sx(this);
        },
        or(e) {
          return sj([this, e]);
        },
        and(e) {
          return sA(this, e);
        },
        transform(e) {
          return lc(this, s0(e));
        },
        default(e) {
          return s8(this, e);
        },
        prefault(e) {
          return lt(this, e);
        },
        catch(e) {
          return lu(this, e);
        },
        pipe(e) {
          return lc(this, e);
        },
        readonly() {
          return l$(this);
        },
        describe(e) {
          let t = this.clone();
          return (rw.add(t, { description: e }), t);
        },
        meta(...e) {
          if (0 === e.length) return rw.get(this);
          let t = this.clone();
          return (rw.add(t, e[0]), t);
        },
        isOptional() {
          return this.safeParse(void 0).success;
        },
        isNullable() {
          return this.safeParse(null).success;
        },
        apply(e, ...t) {
          return 0 === t.length ? e(this) : e(this, ...t);
        },
        get "~standard"() {
          return a.hide(this, "~standard", {
            ...tc(this),
            jsonSchema: {
              input: aQ(this, "input"),
              output: aQ(this, "output"),
            },
          });
        },
        set "~standard"(e) {
          a.own(this, "~standard", e);
        },
        parse: function e(t, i) {
          return oW(this, t, i, { callee: e });
        },
        parseAsync: async function e(t, i) {
          return await oK(this, t, i, { callee: e });
        },
        safeParse(e, t) {
          return oG(this, e, t);
        },
        async safeParseAsync(e, t) {
          return oB(this, e, t);
        },
        get spa() {
          return this?.safeParseAsync;
        },
        set spa(e) {
          a.own(this, "spa", e);
        },
        encode: function e(t, i) {
          return oX(this, t, i, { callee: e });
        },
        decode: function e(t, i) {
          return oq(this, t, i, { callee: e });
        },
        encodeAsync: async function e(t, i) {
          return await oH(this, t, i, { callee: e });
        },
        decodeAsync: async function e(t, i) {
          return await oY(this, t, i, { callee: e });
        },
        safeEncode(e, t) {
          return oQ(this, e, t);
        },
        safeDecode(e, t) {
          return o0(this, e, t);
        },
        async safeEncodeAsync(e, t) {
          return o4(this, e, t);
        },
        async safeDecodeAsync(e, t) {
          return o6(this, e, t);
        },
        toJSONSchema(e) {
          return aY(this, {})(e);
        },
        get description() {
          return rw.get(this)?.description;
        },
        get _def() {
          return this._zod.def;
        },
      },
    ),
    o9 = n.$constructor(
      "_ZodString",
      (e, t) => {
        (tm.init(e, t),
          o2.init(e, t),
          (e._zod.processJSONSchema = (t, i, r) => a4(e, t, i, r)));
        let i = e._zod.bag;
        ((e.format = i.format ?? null),
          (e.minLength = i.minimum ?? null),
          (e.maxLength = i.maximum ?? null));
      },
      {
        regex(...e) {
          return this.check(n1(...e));
        },
        includes(...e) {
          return this.check(n7(...e));
        },
        startsWith(...e) {
          return this.check(n3(...e));
        },
        endsWith(...e) {
          return this.check(n5(...e));
        },
        min(...e) {
          return this.check(n4(...e));
        },
        max(...e) {
          return this.check(n0(...e));
        },
        length(...e) {
          return this.check(n6(...e));
        },
        nonempty(...e) {
          return this.check(n4(1, ...e));
        },
        lowercase(e) {
          return this.check(n2(e));
        },
        uppercase(e) {
          return this.check(n9(e));
        },
        trim() {
          return this.check(an());
        },
        normalize(...e) {
          return this.check(ar(...e));
        },
        toLowerCase() {
          return this.check(aa());
        },
        toUpperCase() {
          return this.check(ao());
        },
        slugify() {
          return this.check(au());
        },
      },
    ),
    o7 = n.$constructor(
      "ZodString",
      (e, t) => {
        (tm.init(e, t), o9.init(e, t));
      },
      {
        email(e) {
          return this.check(r0(ur, e));
        },
        url(e) {
          return this.check(r7(um, e));
        },
        jwt(e) {
          return this.check(nf(uG, e));
        },
        emoji(e) {
          return this.check(r3(uv, e));
        },
        guid(e) {
          return this.check(r4(ua, e));
        },
        uuid(e) {
          return this.check(r6(uu, e));
        },
        uuidv4(e) {
          return this.check(r1(uu, e));
        },
        uuidv6(e) {
          return this.check(r2(uu, e));
        },
        uuidv7(e) {
          return this.check(r9(uu, e));
        },
        nanoid(e) {
          return this.check(r5(u$, e));
        },
        cuid(e) {
          return this.check(r8(uy, e));
        },
        cuid2(e) {
          return this.check(ne(ub, e));
        },
        ulid(e) {
          return this.check(nt(uk, e));
        },
        base64(e) {
          return this.check(nl(uC, e));
        },
        base64url(e) {
          return this.check(nd(uR, e));
        },
        xid(e) {
          return this.check(ni(uw, e));
        },
        ksuid(e) {
          return this.check(nr(uS, e));
        },
        ipv4(e) {
          return this.check(nn(uj, e));
        },
        ipv6(e) {
          return this.check(na(uP, e));
        },
        cidrv4(e) {
          return this.check(nu(uA, e));
        },
        cidrv6(e) {
          return this.check(ns(uE, e));
        },
        e164(e) {
          return this.check(nc(uM, e));
        },
        datetime(e) {
          return this.check(nv(o8, e));
        },
        date(e) {
          return this.check(ng(ue, e));
        },
        time(e) {
          return this.check(n$(ut, e));
        },
        duration(e) {
          return this.check(nh(ui, e));
        },
      },
    );
  function o3(e) {
    return rY(o7, e);
  }
  let o5 = n.$constructor("ZodStringFormat", (e, t) => {
      (tf.init(e, t), o9.init(e, t));
    }),
    o8 = n.$constructor("ZodISODateTime", (e, t) => {
      (tD.init(e, t), o5.init(e, t));
    }),
    ue = n.$constructor("ZodISODate", (e, t) => {
      (tO.init(e, t), o5.init(e, t));
    }),
    ut = n.$constructor("ZodISOTime", (e, t) => {
      (tZ.init(e, t), o5.init(e, t));
    }),
    ui = n.$constructor("ZodISODuration", (e, t) => {
      (tP.init(e, t), o5.init(e, t));
    }),
    ur = n.$constructor("ZodEmail", (e, t) => {
      (tg.init(e, t), o5.init(e, t));
    });
  function un(e) {
    return r0(ur, e);
  }
  let ua = n.$constructor("ZodGUID", (e, t) => {
    (tp.init(e, t), o5.init(e, t));
  });
  function uo(e) {
    return r4(ua, e);
  }
  let uu = n.$constructor("ZodUUID", (e, t) => {
    (tv.init(e, t), o5.init(e, t));
  });
  function us(e) {
    return r6(uu, e);
  }
  function ul(e) {
    return r1(uu, e);
  }
  function ud(e) {
    return r2(uu, e);
  }
  function uc(e) {
    return r9(uu, e);
  }
  let um = n.$constructor("ZodURL", (e, t) => {
    (tx.init(e, t), o5.init(e, t));
  });
  function uf(e) {
    return r7(um, e);
  }
  function up(e) {
    return r7(um, {
      protocol: oL.httpProtocol,
      hostname: oL.domain,
      ...a.normalizeParams(e),
    });
  }
  let uv = n.$constructor("ZodEmoji", (e, t) => {
    (tk.init(e, t), o5.init(e, t));
  });
  function ug(e) {
    return r3(uv, e);
  }
  let u$ = n.$constructor("ZodNanoID", (e, t) => {
    (tI.init(e, t), o5.init(e, t));
  });
  function uh(e) {
    return r5(u$, e);
  }
  let uy = n.$constructor("ZodCUID", (e, t) => {
    (tw.init(e, t), o5.init(e, t));
  });
  function u_(e) {
    return r8(uy, e);
  }
  let ub = n.$constructor("ZodCUID2", (e, t) => {
    (tz.init(e, t), o5.init(e, t));
  });
  function ux(e) {
    return ne(ub, e);
  }
  let uk = n.$constructor("ZodULID", (e, t) => {
    (tS.init(e, t), o5.init(e, t));
  });
  function uI(e) {
    return nt(uk, e);
  }
  let uw = n.$constructor("ZodXID", (e, t) => {
    (tU.init(e, t), o5.init(e, t));
  });
  function uz(e) {
    return ni(uw, e);
  }
  let uS = n.$constructor("ZodKSUID", (e, t) => {
    (tj.init(e, t), o5.init(e, t));
  });
  function uU(e) {
    return nr(uS, e);
  }
  let uj = n.$constructor("ZodIPv4", (e, t) => {
    (tN.init(e, t), o5.init(e, t));
  });
  function uD(e) {
    return nn(uj, e);
  }
  let uO = n.$constructor("ZodMAC", (e, t) => {
    (tL.init(e, t), o5.init(e, t));
  });
  function uZ(e) {
    return no(uO, e);
  }
  let uP = n.$constructor("ZodIPv6", (e, t) => {
    (tE.init(e, t), o5.init(e, t));
  });
  function uN(e) {
    return na(uP, e);
  }
  let uA = n.$constructor("ZodCIDRv4", (e, t) => {
    (tC.init(e, t), o5.init(e, t));
  });
  function uT(e) {
    return nu(uA, e);
  }
  let uE = n.$constructor("ZodCIDRv6", (e, t) => {
    (tR.init(e, t), o5.init(e, t));
  });
  function uL(e) {
    return ns(uE, e);
  }
  let uC = n.$constructor("ZodBase64", (e, t) => {
    (tM.init(e, t), o5.init(e, t));
  });
  function uV(e) {
    return nl(uC, e);
  }
  let uR = n.$constructor("ZodBase64URL", (e, t) => {
    (tW.init(e, t), o5.init(e, t));
  });
  function uJ(e) {
    return nd(uR, e);
  }
  let uM = n.$constructor("ZodE164", (e, t) => {
    (tK.init(e, t), o5.init(e, t));
  });
  function uF(e) {
    return nc(uM, e);
  }
  let uW = n.$constructor("ZodCreditCard", (e, t) => {
    (tX.init(e, t), o5.init(e, t));
  });
  function uK(e) {
    return nm(uW, e);
  }
  let uG = n.$constructor("ZodJWT", (e, t) => {
    (tH.init(e, t), o5.init(e, t));
  });
  function uB(e) {
    return nf(uG, e);
  }
  let uX = n.$constructor("ZodCustomStringFormat", (e, t) => {
    (tY.init(e, t), o5.init(e, t));
  });
  function uq(e, t, i = {}) {
    return aV(uX, e, t, i);
  }
  function uH(e) {
    return aV(uX, "hostname", oL.hostname, e);
  }
  function uY(e) {
    return aV(uX, "hex", oL.hex, e);
  }
  function uQ(e, t) {
    let i = t?.enc ?? "hex",
      r = `${e}_${i}`,
      n = oL[r];
    if (!n) throw Error(`Unrecognized hash format: ${r}`);
    return aV(uX, r, n, t);
  }
  let u0 = n.$constructor(
    "ZodNumber",
    (e, t) => {
      (tQ.init(e, t),
        o2.init(e, t),
        (e._zod.processJSONSchema = (t, i, r) => a6(e, t, i, r)));
      let i = e._zod.bag;
      ((e.minValue =
        Math.max(i.minimum ?? -1 / 0, i.exclusiveMinimum ?? -1 / 0) ?? null),
        (e.maxValue =
          Math.min(i.maximum ?? 1 / 0, i.exclusiveMaximum ?? 1 / 0) ?? null),
        (e.isInt =
          (i.format ?? "").includes("int") ||
          Number.isSafeInteger(i.multipleOf ?? 0.5)),
        (e.isFinite = !0),
        (e.format = i.format ?? null));
    },
    {
      gt(e, t) {
        return this.check(nF(e, t));
      },
      gte(e, t) {
        return this.check(nW(e, t));
      },
      min(e, t) {
        return this.check(nW(e, t));
      },
      lt(e, t) {
        return this.check(nJ(e, t));
      },
      lte(e, t) {
        return this.check(nM(e, t));
      },
      max(e, t) {
        return this.check(nM(e, t));
      },
      int(e) {
        return this.check(u1(e));
      },
      safe(e) {
        return this.check(u1(e));
      },
      positive(e) {
        return this.check(nF(0, e));
      },
      nonnegative(e) {
        return this.check(nW(0, e));
      },
      negative(e) {
        return this.check(nJ(0, e));
      },
      nonpositive(e) {
        return this.check(nM(0, e));
      },
      multipleOf(e, t) {
        return this.check(nq(e, t));
      },
      step(e, t) {
        return this.check(nq(e, t));
      },
      finite() {
        return this;
      },
    },
  );
  function u4(e) {
    return ny(u0, e);
  }
  let u6 = n.$constructor("ZodNumberFormat", (e, t) => {
    (t0.init(e, t), u0.init(e, t));
  });
  function u1(e) {
    return nb(u6, e);
  }
  function u2(e) {
    return nx(u6, e);
  }
  function u9(e) {
    return nk(u6, e);
  }
  function u7(e) {
    return nI(u6, e);
  }
  function u3(e) {
    return nw(u6, e);
  }
  let u5 = n.$constructor("ZodBoolean", (e, t) => {
    (t4.init(e, t),
      o2.init(e, t),
      (e._zod.processJSONSchema = (t, i, r) => a1(e, t, i, r)));
  });
  function u8(e) {
    return nz(u5, e);
  }
  let se = n.$constructor(
    "ZodBigInt",
    (e, t) => {
      (t6.init(e, t),
        o2.init(e, t),
        (e._zod.processJSONSchema = (t, i, r) => a2(e, t, i, r)));
      let i = e._zod.bag;
      ((e.minValue = i.minimum ?? null),
        (e.maxValue = i.maximum ?? null),
        (e.format = i.format ?? null));
    },
    {
      gte(e, t) {
        return this.check(nW(e, t));
      },
      min(e, t) {
        return this.check(nW(e, t));
      },
      gt(e, t) {
        return this.check(nF(e, t));
      },
      lt(e, t) {
        return this.check(nJ(e, t));
      },
      lte(e, t) {
        return this.check(nM(e, t));
      },
      max(e, t) {
        return this.check(nM(e, t));
      },
      positive(e) {
        return this.check(nF(BigInt(0), e));
      },
      negative(e) {
        return this.check(nJ(BigInt(0), e));
      },
      nonpositive(e) {
        return this.check(nM(BigInt(0), e));
      },
      nonnegative(e) {
        return this.check(nW(BigInt(0), e));
      },
      multipleOf(e, t) {
        return this.check(nq(e, t));
      },
    },
  );
  function st(e) {
    return nU(se, e);
  }
  let si = n.$constructor("ZodBigIntFormat", (e, t) => {
    (t1.init(e, t), se.init(e, t));
  });
  function sr(e) {
    return nD(si, e);
  }
  function sn(e) {
    return nO(si, e);
  }
  let sa = n.$constructor("ZodSymbol", (e, t) => {
    (t2.init(e, t),
      o2.init(e, t),
      (e._zod.processJSONSchema = (t, i, r) => a9(e, t, i, r)));
  });
  function so(e) {
    return nZ(sa, e);
  }
  let su = n.$constructor("ZodUndefined", (e, t) => {
    (t9.init(e, t),
      o2.init(e, t),
      (e._zod.processJSONSchema = (t, i, r) => a3(e, t, i, r)));
  });
  function ss(e) {
    return nP(su, e);
  }
  let sl = n.$constructor("ZodNull", (e, t) => {
    (t7.init(e, t),
      o2.init(e, t),
      (e._zod.processJSONSchema = (t, i, r) => a7(e, t, i, r)));
  });
  function sd(e) {
    return nN(sl, e);
  }
  let sc = n.$constructor("ZodAny", (e, t) => {
    (t3.init(e, t),
      o2.init(e, t),
      (e._zod.processJSONSchema = (t, i, r) => oe(e, t, i, r)));
  });
  function sm() {
    return nA(sc);
  }
  let sf = n.$constructor("ZodUnknown", (e, t) => {
    (t5.init(e, t),
      o2.init(e, t),
      (e._zod.processJSONSchema = (t, i, r) => ot(e, t, i, r)));
  });
  function sp() {
    return nT(sf);
  }
  let sv = n.$constructor("ZodNever", (e, t) => {
    (t8.init(e, t),
      o2.init(e, t),
      (e._zod.processJSONSchema = (t, i, r) => a8(e, t, i, r)));
  });
  function sg(e) {
    return nE(sv, e);
  }
  let s$ = n.$constructor("ZodVoid", (e, t) => {
    (ie.init(e, t),
      o2.init(e, t),
      (e._zod.processJSONSchema = (t, i, r) => a5(e, t, i, r)));
  });
  function sh(e) {
    return nL(s$, e);
  }
  let sy = n.$constructor("ZodDate", (e, t) => {
    (it.init(e, t),
      o2.init(e, t),
      (e._zod.processJSONSchema = (t, i, r) => oi(e, t, i, r)),
      (e.min = (t, i) => e.check(nW(t, i))),
      (e.max = (t, i) => e.check(nM(t, i))));
    let i = e._zod.bag;
    ((e.minDate = i.minimum ? new Date(i.minimum) : null),
      (e.maxDate = i.maximum ? new Date(i.maximum) : null));
  });
  function s_(e) {
    return nC(sy, e);
  }
  let sb = n.$constructor(
    "ZodArray",
    (e, t) => {
      (o1(),
        ir.init(e, t),
        o2.init(e, t),
        (e._zod.processJSONSchema = (t, i, r) => op(e, t, i, r)),
        (e.element = t.element));
    },
    {
      min(e, t) {
        return this.check(n4(e, t));
      },
      nonempty(e) {
        return this.check(n4(1, e));
      },
      max(e, t) {
        return this.check(n0(e, t));
      },
      length(e, t) {
        return this.check(n6(e, t));
      },
      unwrap() {
        return this.element;
      },
    },
  );
  function sx(e, t) {
    return as(sb, e, t);
  }
  function sk(e) {
    return sG(Object.keys(e._zod.def.shape));
  }
  let sI = n.$constructor(
    "ZodObject",
    (e, t) => {
      (o1(),
        ic.init(e, t),
        o2.init(e, t),
        (e._zod.processJSONSchema = (t, i, r) => og(e, t, i, r)),
        a.installLazyProp(e, "shape", (e) => e._zod.def.shape, !1));
    },
    {
      keyof() {
        return sG(Object.keys(this._zod.def.shape));
      },
      catchall(e) {
        return this.clone({ ...this._zod.def, catchall: e });
      },
      passthrough() {
        return this.clone({ ...this._zod.def, catchall: sp() });
      },
      loose() {
        return this.clone({ ...this._zod.def, catchall: sp() });
      },
      strict() {
        return this.clone({ ...this._zod.def, catchall: sg() });
      },
      strip() {
        return this.clone({ ...this._zod.def, catchall: void 0 });
      },
      extend(e) {
        return a.extend(this, e);
      },
      safeExtend(e) {
        return a.safeExtend(this, e);
      },
      merge(e) {
        return a.merge(this, e);
      },
      pick(e) {
        return a.pick(this, e);
      },
      omit(e) {
        return a.omit(this, e);
      },
      partial(...e) {
        return a.partial(s4, this, e[0]);
      },
      exactPartial(...e) {
        return a.partial(s1, this, e[0], "exactPartial");
      },
      required(...e) {
        return a.required(li, this, e[0]);
      },
    },
  );
  function sw(e, t) {
    return new sI({ type: "object", shape: e ?? {}, ...a.normalizeParams(t) });
  }
  function sz(e, t) {
    return new sI({
      type: "object",
      shape: e,
      catchall: sg(),
      ...a.normalizeParams(t),
    });
  }
  function sS(e, t) {
    return new sI({
      type: "object",
      shape: e,
      catchall: sp(),
      ...a.normalizeParams(t),
    });
  }
  let sU = n.$constructor("ZodUnion", (e, t) => {
    (ip.init(e, t),
      o2.init(e, t),
      (e._zod.processJSONSchema = (t, i, r) => o$(e, t, i, r)),
      (e.options = t.options));
  });
  function sj(e, t) {
    return new sU({ type: "union", options: e, ...a.normalizeParams(t) });
  }
  let sD = n.$constructor("ZodXor", (e, t) => {
    (sU.init(e, t),
      ig.init(e, t),
      (e._zod.processJSONSchema = (t, i, r) => o$(e, t, i, r)),
      (e.options = t.options));
  });
  function sO(e, t) {
    return new sD({
      type: "union",
      options: e,
      inclusive: !1,
      ...a.normalizeParams(t),
    });
  }
  let sZ = n.$constructor("ZodDiscriminatedUnion", (e, t) => {
    (sU.init(e, t), ih.init(e, t));
  });
  function sP(e, t, i) {
    return new sZ({
      type: "union",
      options: t,
      discriminator: e,
      ...a.normalizeParams(i),
    });
  }
  let sN = n.$constructor("ZodIntersection", (e, t) => {
    (iy.init(e, t),
      o2.init(e, t),
      (e._zod.processJSONSchema = (t, i, r) => oh(e, t, i, r)));
  });
  function sA(e, t) {
    return new sN({ type: "intersection", left: e, right: t });
  }
  let sT = n.$constructor(
    "ZodTuple",
    (e, t) => {
      (o1(),
        ix.init(e, t),
        o2.init(e, t),
        (e._zod.processJSONSchema = (t, i, r) => oy(e, t, i, r)));
    },
    {
      rest(e) {
        return this.clone({ ...this._zod.def, rest: e });
      },
      partial() {
        let e = this._zod.def;
        if (e.checks?.length)
          throw Error(
            ".partial() cannot be used on tuple schemas containing refinements",
          );
        return this.clone({
          ...e,
          items: e.items.map((e) => new s4({ type: "optional", innerType: e })),
        });
      },
    },
  );
  function sE(e, t, i) {
    let r = t instanceof tl,
      n = r ? i : t;
    return new sT({
      type: "tuple",
      items: e,
      rest: r ? t : null,
      ...a.normalizeParams(n),
    });
  }
  let sL = n.$constructor("ZodRecord", (e, t) => {
    (o1(),
      iz.init(e, t),
      o2.init(e, t),
      (e._zod.processJSONSchema = (t, i, r) => ob(e, t, i, r)),
      (e.keyType = t.keyType),
      (e.valueType = t.valueType));
  });
  function sC(e, t, i) {
    return new sL(
      t && t._zod
        ? { type: "record", keyType: e, valueType: t, ...a.normalizeParams(i) }
        : {
            type: "record",
            keyType: o3(),
            valueType: e,
            ...a.normalizeParams(t),
          },
    );
  }
  function sV(e, t, i) {
    return new sL({
      type: "record",
      keyType: e,
      valueType: t,
      ...a.normalizeParams(i),
      partial: !0,
    });
  }
  function sR(e, t, i) {
    return new sL({
      type: "record",
      keyType: e,
      valueType: t,
      mode: "loose",
      ...a.normalizeParams(i),
    });
  }
  let sJ = n.$constructor("ZodMap", (e, t) => {
    (o1(),
      iS.init(e, t),
      o2.init(e, t),
      (e._zod.processJSONSchema = (t, i, r) => om(e, t, i, r)),
      (e.keyType = t.keyType),
      (e.valueType = t.valueType),
      (e.min = (...t) => e.check(nY(...t))),
      (e.nonempty = (t) => e.check(nY(1, t))),
      (e.max = (...t) => e.check(nH(...t))),
      (e.size = (...t) => e.check(nQ(...t))));
  });
  function sM(e, t, i) {
    return new sJ({
      type: "map",
      keyType: e,
      valueType: t,
      ...a.normalizeParams(i),
    });
  }
  let sF = n.$constructor("ZodSet", (e, t) => {
    (o1(),
      ij.init(e, t),
      o2.init(e, t),
      (e._zod.processJSONSchema = (t, i, r) => of(e, t, i, r)),
      (e.min = (...t) => e.check(nY(...t))),
      (e.nonempty = (t) => e.check(nY(1, t))),
      (e.max = (...t) => e.check(nH(...t))),
      (e.size = (...t) => e.check(nQ(...t))));
  });
  function sW(e, t) {
    return new sF({ type: "set", valueType: e, ...a.normalizeParams(t) });
  }
  let sK = n.$constructor("ZodEnum", (e, t) => {
    (iO.init(e, t),
      o2.init(e, t),
      (e._zod.processJSONSchema = (t, i, r) => or(e, t, i, r)),
      (e.enum = t.entries),
      (e.options = Object.values(t.entries)));
    let i = new Set(Object.keys(t.entries));
    ((e.extract = (e, r) => {
      let n = {};
      for (let r of e)
        if (i.has(r)) n[r] = t.entries[r];
        else throw Error(`Key ${r} not found in enum`);
      return new sK({ ...t, checks: [], ...a.normalizeParams(r), entries: n });
    }),
      (e.exclude = (e, r) => {
        let n = { ...t.entries };
        for (let t of e)
          if (i.has(t)) delete n[t];
          else throw Error(`Key ${t} not found in enum`);
        return new sK({
          ...t,
          checks: [],
          ...a.normalizeParams(r),
          entries: n,
        });
      }));
  });
  function sG(e, t) {
    return new sK({
      type: "enum",
      entries: Array.isArray(e) ? Object.fromEntries(e.map((e) => [e, e])) : e,
      ...a.normalizeParams(t),
    });
  }
  function sB(e, t) {
    return new sK({ type: "enum", entries: e, ...a.normalizeParams(t) });
  }
  let sX = n.$constructor("ZodLiteral", (e, t) => {
    (iZ.init(e, t),
      o2.init(e, t),
      (e._zod.processJSONSchema = (t, i, r) => on(e, t, i, r)),
      (e.values = new Set(t.values)),
      Object.defineProperty(e, "value", {
        get() {
          if (t.values.length > 1)
            throw Error(
              "This schema contains multiple valid literal values. Use `.values` instead.",
            );
          return t.values[0];
        },
      }));
  });
  function sq(e, t) {
    return new sX({
      type: "literal",
      values: Array.isArray(e) ? e : [e],
      ...a.normalizeParams(t),
    });
  }
  let sH = n.$constructor("ZodFile", (e, t) => {
    (iP.init(e, t),
      o2.init(e, t),
      (e._zod.processJSONSchema = (t, i, r) => ou(e, t, i, r)),
      (e.min = (t, i) => e.check(nY(t, i))),
      (e.max = (t, i) => e.check(nH(t, i))),
      (e.mime = (t, i) => e.check(at(Array.isArray(t) ? t : [t], i))));
  });
  function sY(e) {
    return a_(sH, e);
  }
  let sQ = n.$constructor("ZodTransform", (e, t) => {
    (o1(),
      iN.init(e, t),
      o2.init(e, t),
      (e._zod.processJSONSchema = (t, i, r) => oc(e, t, i, r)),
      (e._zod.parse = (i, r) => {
        if ("backward" === r.direction)
          throw new n.$ZodEncodeError(e.constructor.name);
        i.addIssue = (r) => {
          "string" == typeof r
            ? i.issues.push(a.issue(r, i.value, t))
            : (r.fatal && (r.continue = !1),
              r.code ?? (r.code = "custom"),
              "input" in r || (r.input = i.value),
              r.inst ?? (r.inst = e),
              i.issues.push(a.issue(r)));
        };
        let o = t.transform(i.value, i);
        return o instanceof Promise
          ? o.then((e) => ((i.value = e), i))
          : ((i.value = o), i);
      }));
  });
  function s0(e) {
    return new sQ({ type: "transform", transform: e });
  }
  let s4 = n.$constructor("ZodOptional", (e, t) => {
    (iT.init(e, t),
      o2.init(e, t),
      (e._zod.processJSONSchema = (t, i, r) => oZ(e, t, i, r)),
      (e.unwrap = () => e._zod.def.innerType));
  });
  function s6(e) {
    return new s4({ type: "optional", innerType: e });
  }
  let s1 = n.$constructor("ZodExactOptional", (e, t) => {
    (iE.init(e, t),
      o2.init(e, t),
      (e._zod.processJSONSchema = (t, i, r) => oZ(e, t, i, r)),
      (e.unwrap = () => e._zod.def.innerType));
  });
  function s2(e) {
    return new s1({ type: "optional", innerType: e });
  }
  let s9 = n.$constructor("ZodNullable", (e, t) => {
    (iL.init(e, t),
      o2.init(e, t),
      (e._zod.processJSONSchema = (t, i, r) => ox(e, t, i, r)),
      (e.unwrap = () => e._zod.def.innerType));
  });
  function s7(e) {
    return new s9({ type: "nullable", innerType: e });
  }
  function s3(e) {
    return s6(s7(e));
  }
  let s5 = n.$constructor("ZodDefault", (e, t) => {
    (iC.init(e, t),
      o2.init(e, t),
      (e._zod.processJSONSchema = (t, i, r) => oz(e, t, i, r)),
      (e.unwrap = () => e._zod.def.innerType),
      (e.removeDefault = e.unwrap));
  });
  function s8(e, t) {
    return new s5({
      type: "default",
      innerType: e,
      get defaultValue() {
        return "function" == typeof t ? t() : a.shallowClone(t);
      },
    });
  }
  let le = n.$constructor("ZodPrefault", (e, t) => {
    (iR.init(e, t),
      o2.init(e, t),
      (e._zod.processJSONSchema = (t, i, r) => oS(e, t, i, r)),
      (e.unwrap = () => e._zod.def.innerType));
  });
  function lt(e, t) {
    return new le({
      type: "prefault",
      innerType: e,
      get defaultValue() {
        return "function" == typeof t ? t() : a.shallowClone(t);
      },
    });
  }
  let li = n.$constructor("ZodNonOptional", (e, t) => {
    (iJ.init(e, t),
      o2.init(e, t),
      (e._zod.processJSONSchema = (t, i, r) => ok(e, t, i, r)),
      (e.unwrap = () => e._zod.def.innerType));
  });
  function lr(e, t) {
    return new li({
      type: "nonoptional",
      innerType: e,
      ...a.normalizeParams(t),
    });
  }
  let ln = n.$constructor("ZodSuccess", (e, t) => {
    (iF.init(e, t),
      o2.init(e, t),
      (e._zod.processJSONSchema = (t, i, r) => os(e, t, i, r)),
      (e.unwrap = () => e._zod.def.innerType));
  });
  function la(e) {
    return new ln({ type: "success", innerType: e });
  }
  let lo = n.$constructor("ZodCatch", (e, t) => {
    (iK.init(e, t),
      o2.init(e, t),
      (e._zod.processJSONSchema = (t, i, r) => oU(e, t, i, r)),
      (e.unwrap = () => e._zod.def.innerType),
      (e.removeCatch = e.unwrap));
  });
  function lu(e, t) {
    return new lo({
      type: "catch",
      innerType: e,
      catchValue: "function" == typeof t ? t : oC.constantCatch(t),
    });
  }
  let ls = n.$constructor("ZodNaN", (e, t) => {
    (iG.init(e, t),
      o2.init(e, t),
      (e._zod.processJSONSchema = (t, i, r) => oa(e, t, i, r)));
  });
  function ll(e) {
    return nR(ls, e);
  }
  let ld = n.$constructor("ZodPipe", (e, t) => {
    (iB.init(e, t),
      o2.init(e, t),
      (e._zod.processJSONSchema = (t, i, r) => oj(e, t, i, r)),
      (e.in = t.in),
      (e.out = t.out));
  });
  function lc(e, t) {
    return new ld({ type: "pipe", in: e, out: t });
  }
  let lm = n.$constructor("ZodCodec", (e, t) => {
    (ld.init(e, t), iq.init(e, t));
  });
  function lf(e, t, i) {
    return new lm({
      type: "pipe",
      in: e,
      out: t,
      transform: i.decode,
      reverseTransform: i.encode,
    });
  }
  function lp(e) {
    let t = e._zod.def;
    return new lm({
      type: "pipe",
      in: t.out,
      out: t.in,
      transform: t.reverseTransform,
      reverseTransform: t.transform,
    });
  }
  let lv = n.$constructor("ZodPreprocess", (e, t) => {
      (ld.init(e, t), iQ.init(e, t));
    }),
    lg = n.$constructor("ZodReadonly", (e, t) => {
      (i0.init(e, t),
        o2.init(e, t),
        (e._zod.processJSONSchema = (t, i, r) => oD(e, t, i, r)),
        (e.unwrap = () => e._zod.def.innerType));
    });
  function l$(e) {
    return new lg({ type: "readonly", innerType: e });
  }
  let lh = n.$constructor("ZodTemplateLiteral", (e, t) => {
    (i6.init(e, t),
      o2.init(e, t),
      (e._zod.processJSONSchema = (t, i, r) => oo(e, t, i, r)));
  });
  function ly(e, t) {
    return new lh({
      type: "template_literal",
      parts: e,
      ...a.normalizeParams(t),
    });
  }
  let l_ = n.$constructor("ZodLazy", (e, t) => {
    (i9.init(e, t),
      o2.init(e, t),
      (e._zod.processJSONSchema = (t, i, r) => oP(e, t, i, r)),
      (e.unwrap = () => e._zod.def.getter()));
  });
  function lb(e) {
    return new l_({ type: "lazy", getter: e });
  }
  let lx = n.$constructor("ZodPromise", (e, t) => {
    (i2.init(e, t),
      o2.init(e, t),
      (e._zod.processJSONSchema = (t, i, r) => oO(e, t, i, r)),
      (e.unwrap = () => e._zod.def.innerType));
  });
  function lk(e) {
    return new lx({ type: "promise", innerType: e });
  }
  let lI = n.$constructor("ZodFunction", (e, t) => {
    (i1.init(e, t),
      o2.init(e, t),
      (e._zod.processJSONSchema = (t, i, r) => od(e, t, i, r)));
  });
  function lw(e) {
    return new lI({
      type: "function",
      input: Array.isArray(e?.input) ? sE(e?.input) : (e?.input ?? sx(sp())),
      output: e?.output ?? sp(),
    });
  }
  let lz = n.$constructor("ZodCustom", (e, t) => {
    (i7.init(e, t),
      o2.init(e, t),
      (e._zod.processJSONSchema = (t, i, r) => ol(e, t, i, r)));
  });
  function lS(e) {
    let t = new eW({ check: "custom" });
    return ((t._zod.check = e), t);
  }
  function lU(e, t) {
    return aP(lz, e ?? (() => !0), t);
  }
  function lj(e, t = {}) {
    return aN(lz, e, t);
  }
  function lD(e, t) {
    return aA(e, t);
  }
  function lO(e, t = {}) {
    let i = new lz({
      type: "custom",
      check: "custom",
      fn: (t) => t instanceof e,
      abort: !0,
      ...a.normalizeParams(t),
    });
    return (
      (i._zod.bag.Class = e),
      (i._zod.check = (t) => {
        t.value instanceof e ||
          t.issues.push({
            code: "invalid_type",
            expected: e.name,
            input: t.value,
            inst: i,
            path: [...(i._zod.def.path ?? [])],
          });
      }),
      i
    );
  }
  let lZ = (...e) => aC({ Codec: lm, Boolean: u5, String: o7 }, ...e);
  function lP(e) {
    let t = lb(() => sj([o3(e), u4(), u8(), sd(), sx(t), sC(o3(), t)]));
    return t;
  }
  function lN(e, t) {
    return new lv({ type: "pipe", in: s0(e), out: t });
  }
  e.s(
    [
      "ZodAny",
      0,
      sc,
      "ZodArray",
      0,
      sb,
      "ZodBase64",
      0,
      uC,
      "ZodBase64URL",
      0,
      uR,
      "ZodBigInt",
      0,
      se,
      "ZodBigIntFormat",
      0,
      si,
      "ZodBoolean",
      0,
      u5,
      "ZodCIDRv4",
      0,
      uA,
      "ZodCIDRv6",
      0,
      uE,
      "ZodCUID",
      0,
      uy,
      "ZodCUID2",
      0,
      ub,
      "ZodCatch",
      0,
      lo,
      "ZodCodec",
      0,
      lm,
      "ZodCreditCard",
      0,
      uW,
      "ZodCustom",
      0,
      lz,
      "ZodCustomStringFormat",
      0,
      uX,
      "ZodDate",
      0,
      sy,
      "ZodDefault",
      0,
      s5,
      "ZodDiscriminatedUnion",
      0,
      sZ,
      "ZodE164",
      0,
      uM,
      "ZodEmail",
      0,
      ur,
      "ZodEmoji",
      0,
      uv,
      "ZodEnum",
      0,
      sK,
      "ZodExactOptional",
      0,
      s1,
      "ZodFile",
      0,
      sH,
      "ZodFunction",
      0,
      lI,
      "ZodGUID",
      0,
      ua,
      "ZodIPv4",
      0,
      uj,
      "ZodIPv6",
      0,
      uP,
      "ZodISODate",
      0,
      ue,
      "ZodISODateTime",
      0,
      o8,
      "ZodISODuration",
      0,
      ui,
      "ZodISOTime",
      0,
      ut,
      "ZodIntersection",
      0,
      sN,
      "ZodJWT",
      0,
      uG,
      "ZodKSUID",
      0,
      uS,
      "ZodLazy",
      0,
      l_,
      "ZodLiteral",
      0,
      sX,
      "ZodMAC",
      0,
      uO,
      "ZodMap",
      0,
      sJ,
      "ZodNaN",
      0,
      ls,
      "ZodNanoID",
      0,
      u$,
      "ZodNever",
      0,
      sv,
      "ZodNonOptional",
      0,
      li,
      "ZodNull",
      0,
      sl,
      "ZodNullable",
      0,
      s9,
      "ZodNumber",
      0,
      u0,
      "ZodNumberFormat",
      0,
      u6,
      "ZodObject",
      0,
      sI,
      "ZodOptional",
      0,
      s4,
      "ZodPipe",
      0,
      ld,
      "ZodPrefault",
      0,
      le,
      "ZodPreprocess",
      0,
      lv,
      "ZodPromise",
      0,
      lx,
      "ZodReadonly",
      0,
      lg,
      "ZodRecord",
      0,
      sL,
      "ZodSet",
      0,
      sF,
      "ZodString",
      0,
      o7,
      "ZodStringFormat",
      0,
      o5,
      "ZodSuccess",
      0,
      ln,
      "ZodSymbol",
      0,
      sa,
      "ZodTemplateLiteral",
      0,
      lh,
      "ZodTransform",
      0,
      sQ,
      "ZodTuple",
      0,
      sT,
      "ZodType",
      0,
      o2,
      "ZodULID",
      0,
      uk,
      "ZodURL",
      0,
      um,
      "ZodUUID",
      0,
      uu,
      "ZodUndefined",
      0,
      su,
      "ZodUnion",
      0,
      sU,
      "ZodUnknown",
      0,
      sf,
      "ZodVoid",
      0,
      s$,
      "ZodXID",
      0,
      uw,
      "ZodXor",
      0,
      sD,
      "_ZodString",
      0,
      o9,
      "_default",
      0,
      s8,
      "_function",
      0,
      lw,
      "any",
      0,
      sm,
      "array",
      0,
      sx,
      "base64",
      0,
      uV,
      "base64url",
      0,
      uJ,
      "bigint",
      0,
      st,
      "boolean",
      0,
      u8,
      "catch",
      0,
      lu,
      "check",
      0,
      lS,
      "cidrv4",
      0,
      uT,
      "cidrv6",
      0,
      uL,
      "codec",
      0,
      lf,
      "creditCard",
      0,
      uK,
      "cuid",
      0,
      u_,
      "cuid2",
      0,
      ux,
      "custom",
      0,
      lU,
      "date",
      0,
      s_,
      "describe",
      0,
      aE,
      "discriminatedUnion",
      0,
      sP,
      "e164",
      0,
      uF,
      "email",
      0,
      un,
      "emoji",
      0,
      ug,
      "enum",
      0,
      sG,
      "exactOptional",
      0,
      s2,
      "file",
      0,
      sY,
      "float32",
      0,
      u2,
      "float64",
      0,
      u9,
      "function",
      0,
      lw,
      "guid",
      0,
      uo,
      "hash",
      0,
      uQ,
      "hex",
      0,
      uY,
      "hostname",
      0,
      uH,
      "httpUrl",
      0,
      up,
      "instanceof",
      0,
      lO,
      "int",
      0,
      u1,
      "int32",
      0,
      u7,
      "int64",
      0,
      sr,
      "intersection",
      0,
      sA,
      "invertCodec",
      0,
      lp,
      "ipv4",
      0,
      uD,
      "ipv6",
      0,
      uN,
      "json",
      0,
      lP,
      "jwt",
      0,
      uB,
      "keyof",
      0,
      sk,
      "ksuid",
      0,
      uU,
      "lazy",
      0,
      lb,
      "literal",
      0,
      sq,
      "looseObject",
      0,
      sS,
      "looseRecord",
      0,
      sR,
      "mac",
      0,
      uZ,
      "map",
      0,
      sM,
      "meta",
      0,
      aL,
      "nan",
      0,
      ll,
      "nanoid",
      0,
      uh,
      "nativeEnum",
      0,
      sB,
      "never",
      0,
      sg,
      "nonoptional",
      0,
      lr,
      "null",
      0,
      sd,
      "nullable",
      0,
      s7,
      "nullish",
      0,
      s3,
      "number",
      0,
      u4,
      "object",
      0,
      sw,
      "optional",
      0,
      s6,
      "partialRecord",
      0,
      sV,
      "pipe",
      0,
      lc,
      "prefault",
      0,
      lt,
      "preprocess",
      0,
      lN,
      "promise",
      0,
      lk,
      "readonly",
      0,
      l$,
      "record",
      0,
      sC,
      "refine",
      0,
      lj,
      "set",
      0,
      sW,
      "strictObject",
      0,
      sz,
      "string",
      0,
      o3,
      "stringFormat",
      0,
      uq,
      "stringbool",
      0,
      lZ,
      "success",
      0,
      la,
      "superRefine",
      0,
      lD,
      "symbol",
      0,
      so,
      "templateLiteral",
      0,
      ly,
      "transform",
      0,
      s0,
      "tuple",
      0,
      sE,
      "uint32",
      0,
      u3,
      "uint64",
      0,
      sn,
      "ulid",
      0,
      uI,
      "undefined",
      0,
      ss,
      "union",
      0,
      sj,
      "unknown",
      0,
      sp,
      "url",
      0,
      uf,
      "uuid",
      0,
      us,
      "uuidv4",
      0,
      ul,
      "uuidv6",
      0,
      ud,
      "uuidv7",
      0,
      uc,
      "void",
      0,
      sh,
      "xid",
      0,
      uz,
      "xor",
      0,
      sO,
    ],
    622754,
  );
  var lA = e.i(622754);
  e.s(
    [
      "endsWith",
      0,
      n5,
      "gt",
      0,
      nF,
      "gte",
      0,
      nW,
      "includes",
      0,
      n7,
      "length",
      0,
      n6,
      "lowercase",
      0,
      n2,
      "lt",
      0,
      nJ,
      "lte",
      0,
      nM,
      "maxLength",
      0,
      n0,
      "maxSize",
      0,
      nH,
      "mime",
      0,
      at,
      "minLength",
      0,
      n4,
      "minSize",
      0,
      nY,
      "multipleOf",
      0,
      nq,
      "negative",
      0,
      nG,
      "nonnegative",
      0,
      nX,
      "nonpositive",
      0,
      nB,
      "normalize",
      0,
      ar,
      "overwrite",
      0,
      ai,
      "positive",
      0,
      nK,
      "properties",
      0,
      ae,
      "property",
      0,
      n8,
      "regex",
      0,
      n1,
      "size",
      0,
      nQ,
      "slugify",
      0,
      au,
      "startsWith",
      0,
      n3,
      "toLowerCase",
      0,
      aa,
      "toUpperCase",
      0,
      ao,
      "trim",
      0,
      an,
      "uppercase",
      0,
      n9,
    ],
    929904,
  );
  var lT = e.i(929904);
  (e.i(418587),
    e.s(
      [
        "decode",
        0,
        oq,
        "decodeAsync",
        0,
        oY,
        "encode",
        0,
        oX,
        "encodeAsync",
        0,
        oH,
        "parse",
        0,
        oW,
        "parseAsync",
        0,
        oK,
        "safeDecode",
        0,
        o0,
        "safeDecodeAsync",
        0,
        o6,
        "safeEncode",
        0,
        oQ,
        "safeEncodeAsync",
        0,
        o4,
        "safeParse",
        0,
        oG,
        "safeParseAsync",
        0,
        oB,
        "validate",
        0,
        j,
        "validateAsync",
        0,
        D,
      ],
      462798,
    ),
    e.i(462798));
  let lE = {
    invalid_type: "invalid_type",
    too_big: "too_big",
    too_small: "too_small",
    invalid_format: "invalid_format",
    not_multiple_of: "not_multiple_of",
    unrecognized_keys: "unrecognized_keys",
    invalid_union: "invalid_union",
    invalid_key: "invalid_key",
    invalid_element: "invalid_element",
    invalid_value: "invalid_value",
    custom: "custom",
  };
  function lL(e) {
    n.config({ customError: e });
  }
  function lC() {
    return n.config().customError;
  }
  (r || (r = {}),
    e.s(
      [
        "$brand",
        () => n.$brand,
        "ZodFirstPartyTypeKind",
        0,
        r,
        "ZodIssueCode",
        0,
        lE,
        "config",
        () => n.config,
        "getErrorMap",
        0,
        lC,
        "setErrorMap",
        0,
        lL,
      ],
      357080,
    ),
    e.i(357080));
  var oL = rd,
    oC = a;
  e.s(
    [
      "ZodISODate",
      0,
      ue,
      "ZodISODateTime",
      0,
      o8,
      "ZodISODuration",
      0,
      ui,
      "ZodISOTime",
      0,
      ut,
      "date",
      0,
      function (e) {
        return ng(ue, e);
      },
      "datetime",
      0,
      function (e) {
        return nv(o8, e);
      },
      "duration",
      0,
      function (e) {
        return nh(ui, e);
      },
      "time",
      0,
      function (e) {
        return n$(ut, e);
      },
    ],
    508497,
  );
  var lV = e.i(508497);
  let lR = { ...lA, ...lT, iso: lV },
    lJ = new Set([
      "$schema",
      "$ref",
      "$defs",
      "definitions",
      "$id",
      "id",
      "$comment",
      "$anchor",
      "$vocabulary",
      "$dynamicRef",
      "$dynamicAnchor",
      "type",
      "enum",
      "const",
      "anyOf",
      "oneOf",
      "allOf",
      "not",
      "properties",
      "required",
      "additionalProperties",
      "patternProperties",
      "propertyNames",
      "minProperties",
      "maxProperties",
      "items",
      "prefixItems",
      "additionalItems",
      "minItems",
      "maxItems",
      "uniqueItems",
      "contains",
      "minContains",
      "maxContains",
      "minLength",
      "maxLength",
      "pattern",
      "format",
      "minimum",
      "maximum",
      "exclusiveMinimum",
      "exclusiveMaximum",
      "multipleOf",
      "description",
      "default",
      "contentEncoding",
      "contentMediaType",
      "contentSchema",
      "unevaluatedItems",
      "unevaluatedProperties",
      "if",
      "then",
      "else",
      "dependentSchemas",
      "dependentRequired",
      "nullable",
      "readOnly",
    ]);
  function lM(e, t) {
    return e.map((e, i) => (i < t ? e : e.optional()));
  }
  function lF(e, t) {
    if (!1 !== e) return void 0 === e || !0 === e ? lR.any() : lK(e, t);
  }
  let lW =
    /^(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|[+-](?:[01]\d|2[0-3]):[0-5]\d)$/;
  function lK(e, t) {
    if ("boolean" == typeof e) return e ? lR.any() : lR.never();
    let i = (function e(t, i) {
        let r;
        if (void 0 !== t.not) {
          if ("object" == typeof t.not && 0 === Object.keys(t.not).length)
            return lR.never();
          throw Error(
            "not is not supported in Zod (except { not: {} } for never)",
          );
        }
        if (void 0 !== t.unevaluatedItems)
          throw Error("unevaluatedItems is not supported");
        if (void 0 !== t.unevaluatedProperties)
          throw Error("unevaluatedProperties is not supported");
        if (void 0 !== t.if || void 0 !== t.then || void 0 !== t.else)
          throw Error("Conditional schemas (if/then/else) are not supported");
        if (void 0 !== t.dependentSchemas || void 0 !== t.dependentRequired)
          throw Error(
            "dependentSchemas and dependentRequired are not supported",
          );
        if (t.$ref) {
          let e = t.$ref;
          if (i.refs.has(e)) return i.refs.get(e);
          if (i.processing.has(e))
            return lR.lazy(() => {
              if (!i.refs.has(e))
                throw Error(`Circular reference not resolved: ${e}`);
              return i.refs.get(e);
            });
          i.processing.add(e);
          let r = lK(
            (function (e, t) {
              if (!e.startsWith("#"))
                throw Error(
                  "External $ref is not supported, only local refs (#/...) are allowed",
                );
              let i = e.slice(1).split("/").filter(Boolean);
              if (0 === i.length) return t.rootSchema;
              let r = "draft-2020-12" === t.version ? "$defs" : "definitions";
              if (i[0] === r) {
                let r =
                  void 0 === i[1]
                    ? void 0
                    : i[1].replace(/~1/g, "/").replace(/~0/g, "~");
                if (!r || !t.defs[r]) throw Error(`Reference not found: ${e}`);
                return t.defs[r];
              }
              throw Error(`Reference not found: ${e}`);
            })(e, i),
            i,
          );
          return (i.refs.set(e, r), i.processing.delete(e), r);
        }
        if (void 0 !== t.enum) {
          let e = t.enum;
          if (
            "openapi-3.0" === i.version &&
            !0 === t.nullable &&
            1 === e.length &&
            null === e[0]
          )
            return lR.null();
          if (0 === e.length) return lR.never();
          if (1 === e.length) return lR.literal(e[0]);
          if (e.every((e) => "string" == typeof e)) return lR.enum(e);
          let r = e.map((e) => lR.literal(e));
          return r.length < 2 ? r[0] : lR.union([r[0], r[1], ...r.slice(2)]);
        }
        if (void 0 !== t.const) return lR.literal(t.const);
        let n = t.type;
        if (Array.isArray(n)) {
          let r = n.map((r) => e({ ...t, type: r }, i));
          return 0 === r.length
            ? lR.never()
            : 1 === r.length
              ? r[0]
              : lR.union(r);
        }
        if (!n) return lR.any();
        switch (n) {
          case "string": {
            let e = lR.string();
            if (t.format) {
              let i = t.format;
              "email" === i
                ? (e = e.check(lR.email()))
                : "uri" === i || "uri-reference" === i
                  ? (e = e.check(lR.url()))
                  : "uuid" === i || "guid" === i
                    ? (e = e.check(lR.uuid()))
                    : "date-time" === i
                      ? (e = e.check(lR.iso.datetime({ offset: !0 })))
                      : "date" === i
                        ? (e = e.check(lR.iso.date()))
                        : "time" === i
                          ? (e = e.check(lR.regex(lW)))
                          : "duration" === i
                            ? (e = e.check(lR.iso.duration()))
                            : "hostname" === i
                              ? (e = e.check(lR.hostname()))
                              : "ipv4" === i
                                ? (e = e.check(lR.ipv4()))
                                : "ipv6" === i
                                  ? (e = e.check(lR.ipv6()))
                                  : "mac" === i
                                    ? (e = e.check(lR.mac()))
                                    : "cidr" === i
                                      ? (e = e.check(lR.cidrv4()))
                                      : "cidr-v6" === i
                                        ? (e = e.check(lR.cidrv6()))
                                        : "base64" === i
                                          ? (e = e.check(lR.base64()))
                                          : "base64url" === i
                                            ? (e = e.check(lR.base64url()))
                                            : "e164" === i
                                              ? (e = e.check(lR.e164()))
                                              : "credit_card" === i
                                                ? (e = e.check(lR.creditCard()))
                                                : "jwt" === i
                                                  ? (e = e.check(lR.jwt()))
                                                  : "emoji" === i
                                                    ? (e = e.check(lR.emoji()))
                                                    : "nanoid" === i
                                                      ? (e = e.check(
                                                          lR.nanoid(),
                                                        ))
                                                      : "cuid" === i
                                                        ? (e = e.check(
                                                            lR.cuid(),
                                                          ))
                                                        : "cuid2" === i
                                                          ? (e = e.check(
                                                              lR.cuid2(),
                                                            ))
                                                          : "ulid" === i
                                                            ? (e = e.check(
                                                                lR.ulid(),
                                                              ))
                                                            : "xid" === i
                                                              ? (e = e.check(
                                                                  lR.xid(),
                                                                ))
                                                              : "ksuid" === i &&
                                                                (e = e.check(
                                                                  lR.ksuid(),
                                                                ));
            }
            ("number" == typeof t.minLength && (e = e.min(t.minLength)),
              "number" == typeof t.maxLength && (e = e.max(t.maxLength)),
              t.pattern && (e = e.regex(new RegExp(t.pattern))),
              (r = e));
            break;
          }
          case "number":
          case "integer": {
            let e = "integer" === n ? lR.number().int() : lR.number();
            ("number" == typeof t.minimum &&
              !0 !== t.exclusiveMinimum &&
              (e = e.min(t.minimum)),
              "number" == typeof t.maximum &&
                !0 !== t.exclusiveMaximum &&
                (e = e.max(t.maximum)),
              "number" == typeof t.exclusiveMinimum
                ? (e = e.gt(t.exclusiveMinimum))
                : !0 === t.exclusiveMinimum &&
                  "number" == typeof t.minimum &&
                  (e = e.gt(t.minimum)),
              "number" == typeof t.exclusiveMaximum
                ? (e = e.lt(t.exclusiveMaximum))
                : !0 === t.exclusiveMaximum &&
                  "number" == typeof t.maximum &&
                  (e = e.lt(t.maximum)),
              "number" == typeof t.multipleOf &&
                (e = e.multipleOf(t.multipleOf)),
              (r = e));
            break;
          }
          case "boolean":
            r = lR.boolean();
            break;
          case "null":
            r = lR.null();
            break;
          case "object": {
            let e = {},
              n = t.properties || {},
              s = new Set(t.required || []),
              l =
                "object" == typeof t.additionalProperties
                  ? lK(t.additionalProperties, i)
                  : void 0;
            for (let [t, r] of Object.entries(n)) {
              let n = lK(r, i);
              (0, a.assignProp)(e, t, s.has(t) ? n : n.optional());
            }
            if (t.patternProperties) {
              let n = t.patternProperties,
                o = Object.keys(n),
                u = [];
              for (let e of o) {
                let t = lK(n[e], i),
                  r = lR.string().regex(new RegExp(e));
                u.push(lR.looseRecord(r, t));
              }
              let s = [];
              if (
                (Object.keys(e).length > 0 &&
                  s.push(lR.object(e).passthrough()),
                s.push(...u),
                0 === s.length)
              )
                r = lR.object({}).passthrough();
              else if (1 === s.length) r = s[0];
              else {
                let e = lR.intersection(s[0], s[1]);
                for (let t = 2; t < s.length; t++) e = lR.intersection(e, s[t]);
                r = e;
              }
              if (!1 === t.additionalProperties) {
                let t = Object.keys(e),
                  i = o.map((e) => new RegExp(e)),
                  n = r;
                r = r.check((e) => {
                  if (!(0, a.isPlainObject)(e.value)) return;
                  let r = [];
                  for (let n of Object.keys(e.value))
                    !t.includes(n) && (i.some((e) => e.test(n)) || r.push(n));
                  r.length &&
                    e.issues.push({
                      code: "unrecognized_keys",
                      keys: r,
                      input: e.value,
                      inst: n,
                    });
                });
              }
            } else {
              let i = lR.object(e);
              r =
                !1 === t.additionalProperties
                  ? i.strict()
                  : l
                    ? i.catchall(l)
                    : i.passthrough();
            }
            if (void 0 !== t.propertyNames && !0 !== t.propertyNames) {
              var o, u;
              let e =
                "object" == typeof t.propertyNames &&
                void 0 === t.propertyNames.type
                  ? { type: "string", ...t.propertyNames }
                  : t.propertyNames;
              ((o = r),
                (u = lK(e, i)),
                (r = lR
                  .transform((e) => e)
                  .check((e) => {
                    let t = e.value;
                    if (
                      !("object" != typeof t || null === t || Array.isArray(t))
                    )
                      for (let i of Object.getOwnPropertyNames(t)) {
                        let t = u.safeParse(i);
                        t.success ||
                          e.issues.push({
                            code: "invalid_key",
                            origin: "record",
                            issues: t.error.issues,
                            input: i,
                            path: [i],
                            continue: !0,
                          });
                      }
                  })
                  .pipe(o)));
            }
            break;
          }
          case "array": {
            let e = t.prefixItems,
              n = t.items;
            if (e && Array.isArray(e)) {
              let a = "number" == typeof t.minItems ? t.minItems : 0,
                o = lM(
                  e.map((e) => lK(e, i)),
                  a,
                ),
                u = Array.isArray(n) ? void 0 : lF(n, i),
                s = lR.tuple(o);
              ((r = u ? s.rest(u) : s),
                "number" == typeof t.minItems &&
                  (r = r.check(lR.minLength(t.minItems))),
                "number" == typeof t.maxItems &&
                  (r = r.check(lR.maxLength(t.maxItems))));
            } else if (Array.isArray(n)) {
              let e = "number" == typeof t.minItems ? t.minItems : 0,
                a = lM(
                  n.map((e) => lK(e, i)),
                  e,
                ),
                o = lF(t.additionalItems, i),
                u = lR.tuple(a);
              ((r = o ? u.rest(o) : u),
                "number" == typeof t.minItems &&
                  (r = r.check(lR.minLength(t.minItems))),
                "number" == typeof t.maxItems &&
                  (r = r.check(lR.maxLength(t.maxItems))));
            } else if (void 0 !== n) {
              let e = lK(n, i),
                a = lR.array(e);
              ("number" == typeof t.minItems && (a = a.min(t.minItems)),
                "number" == typeof t.maxItems && (a = a.max(t.maxItems)),
                (r = a));
            } else r = lR.array(lR.any());
            break;
          }
          default:
            throw Error(`Unsupported type: ${n}`);
        }
        return r;
      })(e, t),
      r = e.type || void 0 !== e.enum || void 0 !== e.const;
    if (e.anyOf && Array.isArray(e.anyOf)) {
      let n = e.anyOf.map((e) => lK(e, t)),
        a = lR.union(n);
      i = r ? lR.intersection(i, a) : a;
    }
    if (e.oneOf && Array.isArray(e.oneOf)) {
      let n = e.oneOf.map((e) => lK(e, t)),
        a = lR.xor(n);
      i = r ? lR.intersection(i, a) : a;
    }
    if (e.allOf && Array.isArray(e.allOf))
      if (0 === e.allOf.length) i = r ? i : lR.any();
      else {
        let n = r ? i : lK(e.allOf[0], t),
          a = +!r;
        for (let i = a; i < e.allOf.length; i++)
          n = lR.intersection(n, lK(e.allOf[i], t));
        i = n;
      }
    (!0 === e.nullable && "openapi-3.0" === t.version && (i = lR.nullable(i)),
      !0 === e.readOnly && (i = lR.readonly(i)),
      void 0 !== e.default && (i = i.default(e.default)));
    let n = {};
    for (let t of [
      "$id",
      "id",
      "$comment",
      "$anchor",
      "$vocabulary",
      "$dynamicRef",
      "$dynamicAnchor",
    ])
      t in e && (n[t] = e[t]);
    for (let t of ["contentEncoding", "contentMediaType", "contentSchema"])
      t in e && (n[t] = e[t]);
    for (let t of (void 0 !== e.propertyNames &&
      "object" === e.type &&
      void 0 === e.$ref &&
      (n.propertyNames = e.propertyNames),
    Object.keys(e)))
      lJ.has(t) || (0, a.assignProp)(n, t, e[t]);
    return (
      Object.keys(n).length > 0 && t.registry.add(i, n),
      e.description && (i = i.describe(e.description)),
      i
    );
  }
  let lG = Symbol("z.visit/resolving");
  function lB(e, t) {
    let i =
        "function" == typeof t
          ? t
          : (e, i) => {
              let r = t[e._zod.def.type];
              return r ? r(e, i) : e;
            },
      r = new Map();
    return (function e(t) {
      let n = r.get(t);
      if (n === lG) return new i9({ type: "lazy", getter: () => r.get(t) });
      if (void 0 !== n) return n;
      r.set(t, lG);
      let o = (function (t) {
          let i = t._zod.def;
          switch (i.type) {
            case "object": {
              let r = i.shape,
                n = Object.keys(r),
                o = !1,
                u = {};
              for (let t of n) {
                let i = e(r[t]);
                (i !== r[t] && (o = !0), (u[t] = i));
              }
              let s = i.catchall;
              return (
                i.catchall && (s = e(i.catchall)) !== i.catchall && (o = !0),
                o ? (0, a.clone)(t, { ...i, shape: u, catchall: s }) : t
              );
            }
            case "array": {
              let r = e(i.element);
              return r === i.element
                ? t
                : (0, a.clone)(t, { ...i, element: r });
            }
            case "tuple": {
              let r = i.items,
                n = !1,
                o = [];
              for (let t of r) {
                let i = e(t);
                (i !== t && (n = !0), o.push(i));
              }
              let u = i.rest;
              return (
                i.rest && (u = e(i.rest)) !== i.rest && (n = !0),
                n ? (0, a.clone)(t, { ...i, items: o, rest: u }) : t
              );
            }
            case "record":
            case "map": {
              let r = e(i.keyType),
                n = e(i.valueType);
              return r === i.keyType && n === i.valueType
                ? t
                : (0, a.clone)(t, { ...i, keyType: r, valueType: n });
            }
            case "set": {
              let r = e(i.valueType);
              return r === i.valueType
                ? t
                : (0, a.clone)(t, { ...i, valueType: r });
            }
            case "union": {
              let r = i.options,
                n = !1,
                o = [];
              for (let t of r) {
                let i = e(t);
                (i !== t && (n = !0), o.push(i));
              }
              return n ? (0, a.clone)(t, { ...i, options: o }) : t;
            }
            case "intersection": {
              let r = e(i.left),
                n = e(i.right);
              return r === i.left && n === i.right
                ? t
                : (0, a.clone)(t, { ...i, left: r, right: n });
            }
            case "optional":
            case "nullable":
            case "default":
            case "prefault":
            case "catch":
            case "readonly":
            case "nonoptional":
            case "promise":
            case "success": {
              let r = e(i.innerType);
              return r === i.innerType
                ? t
                : (0, a.clone)(t, { ...i, innerType: r });
            }
            case "pipe": {
              let r = e(i.in),
                n = e(i.out);
              return r === i.in && n === i.out
                ? t
                : (0, a.clone)(t, { ...i, in: r, out: n });
            }
            case "function": {
              let r = e(i.input),
                n = e(i.output);
              return r === i.input && n === i.output
                ? t
                : (0, a.clone)(t, { ...i, input: r, output: n });
            }
            case "lazy": {
              let r = i.getter,
                { _cachedInner: n, ...o } = i;
              return (0, a.clone)(t, { ...o, getter: () => e(r()) });
            }
            default:
              return t;
          }
        })(t),
        u = i(o, o !== t);
      return (r.set(t, u), u);
    })(e);
  }
  function lX(e) {
    return (function (e, t) {
      if (!t?.length) return e;
      let i = e._zod.def;
      return (0, a.clone)(
        e,
        (0, a.mergeDefs)(i, { checks: [...(i.checks ?? []), ...t] }),
        { parent: !0 },
      );
    })(e.out, e.checks);
  }
  e.s(
    [
      "bigint",
      0,
      function (e) {
        return nj(se, e);
      },
      "boolean",
      0,
      function (e) {
        return nS(u5, e);
      },
      "date",
      0,
      function (e) {
        return nV(sy, e);
      },
      "number",
      0,
      function (e) {
        return n_(u0, e);
      },
      "string",
      0,
      function (e) {
        return rQ(o7, e);
      },
    ],
    782193,
  );
  var lq = e.i(782193);
  e.s(
    [
      "$brand",
      () => n.$brand,
      "$input",
      0,
      rx,
      "$output",
      0,
      rb,
      "NEVER",
      () => n.NEVER,
      "TimePrecision",
      0,
      np,
      "ZodAny",
      0,
      sc,
      "ZodArray",
      0,
      sb,
      "ZodBase64",
      0,
      uC,
      "ZodBase64URL",
      0,
      uR,
      "ZodBigInt",
      0,
      se,
      "ZodBigIntFormat",
      0,
      si,
      "ZodBoolean",
      0,
      u5,
      "ZodCIDRv4",
      0,
      uA,
      "ZodCIDRv6",
      0,
      uE,
      "ZodCUID",
      0,
      uy,
      "ZodCUID2",
      0,
      ub,
      "ZodCatch",
      0,
      lo,
      "ZodCodec",
      0,
      lm,
      "ZodCompileAsyncError",
      0,
      rU,
      "ZodCompileUnsupportedError",
      0,
      rj,
      "ZodCreditCard",
      0,
      uW,
      "ZodCustom",
      0,
      lz,
      "ZodCustomStringFormat",
      0,
      uX,
      "ZodDate",
      0,
      sy,
      "ZodDefault",
      0,
      s5,
      "ZodDiscriminatedUnion",
      0,
      sZ,
      "ZodE164",
      0,
      uM,
      "ZodEmail",
      0,
      ur,
      "ZodEmoji",
      0,
      uv,
      "ZodEnum",
      0,
      sK,
      "ZodError",
      0,
      oM,
      "ZodExactOptional",
      0,
      s1,
      "ZodFile",
      0,
      sH,
      "ZodFirstPartyTypeKind",
      0,
      r,
      "ZodFunction",
      0,
      lI,
      "ZodGUID",
      0,
      ua,
      "ZodIPv4",
      0,
      uj,
      "ZodIPv6",
      0,
      uP,
      "ZodISODate",
      0,
      ue,
      "ZodISODateTime",
      0,
      o8,
      "ZodISODuration",
      0,
      ui,
      "ZodISOTime",
      0,
      ut,
      "ZodIntersection",
      0,
      sN,
      "ZodIssueCode",
      0,
      lE,
      "ZodJWT",
      0,
      uG,
      "ZodKSUID",
      0,
      uS,
      "ZodLazy",
      0,
      l_,
      "ZodLiteral",
      0,
      sX,
      "ZodMAC",
      0,
      uO,
      "ZodMap",
      0,
      sJ,
      "ZodNaN",
      0,
      ls,
      "ZodNanoID",
      0,
      u$,
      "ZodNever",
      0,
      sv,
      "ZodNonOptional",
      0,
      li,
      "ZodNull",
      0,
      sl,
      "ZodNullable",
      0,
      s9,
      "ZodNumber",
      0,
      u0,
      "ZodNumberFormat",
      0,
      u6,
      "ZodObject",
      0,
      sI,
      "ZodOptional",
      0,
      s4,
      "ZodPipe",
      0,
      ld,
      "ZodPrefault",
      0,
      le,
      "ZodPreprocess",
      0,
      lv,
      "ZodPromise",
      0,
      lx,
      "ZodReadonly",
      0,
      lg,
      "ZodRealError",
      0,
      oF,
      "ZodRecord",
      0,
      sL,
      "ZodSet",
      0,
      sF,
      "ZodString",
      0,
      o7,
      "ZodStringFormat",
      0,
      o5,
      "ZodSuccess",
      0,
      ln,
      "ZodSymbol",
      0,
      sa,
      "ZodTemplateLiteral",
      0,
      lh,
      "ZodTransform",
      0,
      sQ,
      "ZodTuple",
      0,
      sT,
      "ZodType",
      0,
      o2,
      "ZodULID",
      0,
      uk,
      "ZodURL",
      0,
      um,
      "ZodUUID",
      0,
      uu,
      "ZodUndefined",
      0,
      su,
      "ZodUnion",
      0,
      sU,
      "ZodUnknown",
      0,
      sf,
      "ZodVoid",
      0,
      s$,
      "ZodXID",
      0,
      uw,
      "ZodXor",
      0,
      sD,
      "_ZodString",
      0,
      o9,
      "_default",
      0,
      s8,
      "_function",
      0,
      lw,
      "any",
      0,
      sm,
      "array",
      0,
      sx,
      "base64",
      0,
      uV,
      "base64url",
      0,
      uJ,
      "bigint",
      0,
      st,
      "boolean",
      0,
      u8,
      "catch",
      0,
      lu,
      "check",
      0,
      lS,
      "cidrv4",
      0,
      uT,
      "cidrv6",
      0,
      uL,
      "clone",
      () => a.clone,
      "codec",
      0,
      lf,
      "coerce",
      0,
      lq,
      "compile",
      0,
      rD,
      "config",
      () => n.config,
      "core",
      0,
      oE,
      "creditCard",
      0,
      uK,
      "cuid",
      0,
      u_,
      "cuid2",
      0,
      ux,
      "custom",
      0,
      lU,
      "date",
      0,
      s_,
      "decode",
      0,
      oq,
      "decodeAsync",
      0,
      oY,
      "deepPartial",
      0,
      function (e) {
        return lB(e, {
          object: (e) => e.partial(),
          union: (e) => {
            let t = e._zod.def;
            return void 0 === t.discriminator ? e : sj(t.options);
          },
        });
      },
      "describe",
      0,
      aE,
      "discriminatedUnion",
      0,
      sP,
      "e164",
      0,
      uF,
      "email",
      0,
      un,
      "emoji",
      0,
      ug,
      "encode",
      0,
      oX,
      "encodeAsync",
      0,
      oH,
      "endsWith",
      0,
      n5,
      "enum",
      0,
      sG,
      "exactOptional",
      0,
      s2,
      "file",
      0,
      sY,
      "flattenError",
      0,
      f,
      "float32",
      0,
      u2,
      "float64",
      0,
      u9,
      "formatError",
      0,
      p,
      "fromJSONSchema",
      0,
      function (e, t) {
        var i, r;
        let n, a;
        if ("boolean" == typeof e) return e ? lR.any() : lR.never();
        try {
          n = JSON.parse(JSON.stringify(e));
        } catch {
          throw Error(
            "fromJSONSchema input is not valid JSON (possibly cyclic); use $defs/$ref for recursive schemas",
          );
        }
        let o = {
          version:
            ((i = n),
            (r = t?.defaultTarget),
            "https://json-schema.org/draft/2020-12/schema" === (a = i.$schema)
              ? "draft-2020-12"
              : "http://json-schema.org/draft-07/schema#" === a
                ? "draft-7"
                : "http://json-schema.org/draft-04/schema#" === a
                  ? "draft-4"
                  : (r ?? "draft-2020-12")),
          defs: n.$defs || n.definitions || {},
          refs: new Map(),
          processing: new Set(),
          rootSchema: n,
          registry: t?.registry ?? rw,
        };
        return lK(n, o);
      },
      "function",
      0,
      lw,
      "getDiscriminatedOption",
      0,
      i$,
      "getErrorMap",
      0,
      lC,
      "globalRegistry",
      0,
      rw,
      "gt",
      0,
      nF,
      "gte",
      0,
      nW,
      "guid",
      0,
      uo,
      "hash",
      0,
      uQ,
      "hex",
      0,
      uY,
      "hostname",
      0,
      uH,
      "httpUrl",
      0,
      up,
      "includes",
      0,
      n7,
      "input",
      0,
      function (e) {
        return lB(e, {
          pipe: (e) => {
            var t;
            return (t = e._zod.def).in._zod.traits.has("$ZodTransform")
              ? lX(t)
              : t.in;
          },
          default: (e, t) => (t ? s6(e._zod.def.innerType) : e),
          catch: (e, t) => (t ? e._zod.def.innerType : e),
        });
      },
      "instanceof",
      0,
      lO,
      "int",
      0,
      u1,
      "int32",
      0,
      u7,
      "int64",
      0,
      sr,
      "intersection",
      0,
      sA,
      "invertCodec",
      0,
      lp,
      "ipv4",
      0,
      uD,
      "ipv6",
      0,
      uN,
      "iso",
      0,
      lV,
      "json",
      0,
      lP,
      "jwt",
      0,
      uB,
      "keyof",
      0,
      sk,
      "ksuid",
      0,
      uU,
      "lazy",
      0,
      lb,
      "length",
      0,
      n6,
      "literal",
      0,
      sq,
      "locales",
      0,
      r_,
      "looseObject",
      0,
      sS,
      "looseRecord",
      0,
      sR,
      "lowercase",
      0,
      n2,
      "lt",
      0,
      nJ,
      "lte",
      0,
      nM,
      "mac",
      0,
      uZ,
      "map",
      0,
      sM,
      "maxLength",
      0,
      n0,
      "maxSize",
      0,
      nH,
      "memoizer",
      0,
      ru,
      "meta",
      0,
      aL,
      "mime",
      0,
      at,
      "minLength",
      0,
      n4,
      "minSize",
      0,
      nY,
      "multipleOf",
      0,
      nq,
      "nan",
      0,
      ll,
      "nanoid",
      0,
      uh,
      "nativeEnum",
      0,
      sB,
      "negative",
      0,
      nG,
      "never",
      0,
      sg,
      "nonnegative",
      0,
      nX,
      "nonoptional",
      0,
      lr,
      "nonpositive",
      0,
      nB,
      "normalize",
      0,
      ar,
      "null",
      0,
      sd,
      "nullable",
      0,
      s7,
      "nullish",
      0,
      s3,
      "number",
      0,
      u4,
      "object",
      0,
      sw,
      "optional",
      0,
      s6,
      "output",
      0,
      function (e) {
        return lB(e, {
          pipe: (e) => lX(e._zod.def),
          prefault: (e, t) => (t ? e._zod.def.innerType : e),
        });
      },
      "overwrite",
      0,
      ai,
      "parse",
      0,
      oW,
      "parseAsync",
      0,
      oK,
      "partialRecord",
      0,
      sV,
      "pipe",
      0,
      lc,
      "positive",
      0,
      nK,
      "prefault",
      0,
      lt,
      "preprocess",
      0,
      lN,
      "prettifyError",
      0,
      $,
      "promise",
      0,
      lk,
      "properties",
      0,
      ae,
      "property",
      0,
      n8,
      "readonly",
      0,
      l$,
      "record",
      0,
      sC,
      "refine",
      0,
      lj,
      "regex",
      0,
      n1,
      "regexes",
      () => oL,
      "registry",
      0,
      rI,
      "safeDecode",
      0,
      o0,
      "safeDecodeAsync",
      0,
      o6,
      "safeEncode",
      0,
      oQ,
      "safeEncodeAsync",
      0,
      o4,
      "safeParse",
      0,
      oG,
      "safeParseAsync",
      0,
      oB,
      "set",
      0,
      sW,
      "setErrorMap",
      0,
      lL,
      "size",
      0,
      nQ,
      "slugify",
      0,
      au,
      "startsWith",
      0,
      n3,
      "strictObject",
      0,
      sz,
      "string",
      0,
      o3,
      "stringFormat",
      0,
      uq,
      "stringbool",
      0,
      lZ,
      "success",
      0,
      la,
      "superRefine",
      0,
      lD,
      "symbol",
      0,
      so,
      "templateLiteral",
      0,
      ly,
      "toJSONSchema",
      0,
      oA,
      "toLowerCase",
      0,
      aa,
      "toUpperCase",
      0,
      ao,
      "toZod",
      () => a.toZod,
      "transform",
      0,
      s0,
      "treeifyError",
      0,
      v,
      "trim",
      0,
      an,
      "tuple",
      0,
      sE,
      "uint32",
      0,
      u3,
      "uint64",
      0,
      sn,
      "ulid",
      0,
      uI,
      "undefined",
      0,
      ss,
      "union",
      0,
      sj,
      "unknown",
      0,
      sp,
      "uppercase",
      0,
      n9,
      "url",
      0,
      uf,
      "util",
      () => oC,
      "uuid",
      0,
      us,
      "uuidv4",
      0,
      ul,
      "uuidv6",
      0,
      ud,
      "uuidv7",
      0,
      uc,
      "validate",
      0,
      j,
      "validateAsync",
      0,
      D,
      "void",
      0,
      sh,
      "xid",
      0,
      uz,
      "xor",
      0,
      sO,
    ],
    599565,
  );
};
