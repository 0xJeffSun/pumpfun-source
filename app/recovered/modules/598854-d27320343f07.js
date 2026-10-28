// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t;
  let r;
  function n(e) {
    return e;
  }
  function o(e) {
    return e;
  }
  function i() {
    return (e) => e;
  }
  function a(e) {}
  function l(e) {
    throw Error("Unexpected value in exhaustive check");
  }
  function u(e) {}
  function s(e) {
    let t = Object.values(e).filter((e) => "number" == typeof e);
    return Object.entries(e)
      .filter(([e, r]) => -1 === t.indexOf(+e))
      .map(([e, t]) => t);
  }
  function c(e, t = "|") {
    return e.map((e) => L(e)).join(t);
  }
  function f(e, t) {
    return "bigint" == typeof t ? t.toString() : t;
  }
  function d(e) {
    return {
      get value() {
        {
          let t = e();
          return (Object.defineProperty(this, "value", { value: t }), t);
        }
      },
    };
  }
  function p(e) {
    return null == e;
  }
  function y(e) {
    let t = +!!e.startsWith("^"),
      r = e.endsWith("$") ? e.length - 1 : e.length;
    return e.slice(t, r);
  }
  function h(e, t) {
    let r = e / t,
      n = Math.round(r),
      o = 4 * Number.EPSILON * Math.max(Math.abs(r), 1);
    return Math.abs(r - n) < o ? 0 : r - n;
  }
  (e.s(
    [
      "$ZodAsyncError",
      () => eT,
      "$ZodEncodeError",
      () => ez,
      "$brand",
      () => eR,
      "$constructor",
      () => eM,
      "NEVER",
      () => eE,
      "config",
      () => eC,
      "globalConfig",
      () => eN,
    ],
    598854,
  ),
    e.s(
      [
        "BIGINT_FORMAT_RANGES",
        () => $,
        "CONSTANT_CATCH",
        () => eP,
        "Class",
        () => eb,
        "NUMBER_FORMAT_RANGES",
        () => H,
        "aborted",
        () => X,
        "allowsEval",
        () => M,
        "assert",
        () => u,
        "assertEqual",
        () => n,
        "assertIs",
        () => a,
        "assertNever",
        () => l,
        "assertNotEqual",
        () => o,
        "assignProp",
        () => m,
        "attachSchema",
        () => et,
        "base64ToUint8Array",
        () => ec,
        "base64urlToUint8Array",
        () => ed,
        "cached",
        () => d,
        "captureStackTrace",
        () => A,
        "cleanEnum",
        () => es,
        "cleanRegex",
        () => y,
        "clone",
        () => I,
        "cloneDef",
        () => j,
        "codePointLength",
        () => ei,
        "constantCatch",
        () => ew,
        "createTransparentProxy",
        () => D,
        "defineLazy",
        () => g,
        "defineLazyInternal",
        () => ex,
        "esc",
        () => w,
        "escapeRegex",
        () => k,
        "explicitlyAborted",
        () => J,
        "extend",
        () => W,
        "finalizeIssue",
        () => er,
        "floatSafeRemainder",
        () => h,
        "getElementAtPath",
        () => x,
        "getEnumValues",
        () => s,
        "getLengthableOrigin",
        () => ea,
        "getParsedType",
        () => N,
        "getSizableOrigin",
        () => en,
        "hexToUint8Array",
        () => ey,
        "hide",
        () => em,
        "installLazyProp",
        () => ev,
        "isObject",
        () => S,
        "isPlainObject",
        () => R,
        "issue",
        () => eu,
        "joinValues",
        () => c,
        "jsonStringifyReplacer",
        () => f,
        "members",
        () => eg,
        "merge",
        () => Z,
        "mergeDefs",
        () => O,
        "normalizeParams",
        () => B,
        "nullish",
        () => p,
        "numKeys",
        () => z,
        "objectClone",
        () => _,
        "omit",
        () => Y,
        "optionalKeys",
        () => F,
        "own",
        () => e_,
        "parsedType",
        () => el,
        "partial",
        () => q,
        "pick",
        () => K,
        "prefixIssues",
        () => Q,
        "primitiveTypes",
        () => U,
        "promiseAllObject",
        () => v,
        "propertyKeyTypes",
        () => C,
        "randomString",
        () => P,
        "required",
        () => G,
        "safeExtend",
        () => V,
        "shallowClone",
        () => T,
        "slugify",
        () => E,
        "stringifyPrimitive",
        () => L,
        "toZod",
        () => i,
        "uint8ArrayToBase64",
        () => ef,
        "uint8ArrayToBase64url",
        () => ep,
        "uint8ArrayToHex",
        () => eh,
        "unwrapMessage",
        () => ee,
      ],
      408162,
    ));
  let b = Symbol("evaluating");
  function g(e, t, r) {
    let n;
    Object.defineProperty(e, t, {
      get() {
        if (n !== b) return (void 0 === n && ((n = b), (n = r())), n);
      },
      set(r) {
        Object.defineProperty(e, t, { value: r });
      },
      configurable: !0,
    });
  }
  function _(e) {
    return Object.create(
      Object.getPrototypeOf(e),
      Object.getOwnPropertyDescriptors(e),
    );
  }
  function m(e, t, r) {
    Object.defineProperty(e, t, {
      value: r,
      writable: !0,
      enumerable: !0,
      configurable: !0,
    });
  }
  function O(...e) {
    let t = {};
    for (let r of e) Object.assign(t, Object.getOwnPropertyDescriptors(r));
    return Object.defineProperties({}, t);
  }
  function j(e) {
    return O(e._zod.def);
  }
  function x(e, t) {
    return t ? t.reduce((e, t) => e?.[t], e) : e;
  }
  function v(e) {
    let t = Object.keys(e);
    return Promise.all(t.map((t) => e[t])).then((e) => {
      let r = {};
      for (let n = 0; n < t.length; n++) r[t[n]] = e[n];
      return r;
    });
  }
  function P(e = 10) {
    let t = "abcdefghijklmnopqrstuvwxyz",
      r = "";
    for (let n = 0; n < e; n++) r += t[Math.floor(Math.random() * t.length)];
    return r;
  }
  function w(e) {
    return JSON.stringify(e);
  }
  function E(e) {
    return e
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-")
      .replace(/^-+|-+$/g, "");
  }
  let A = "captureStackTrace" in Error ? Error.captureStackTrace : (...e) => {};
  function S(e) {
    return "object" == typeof e && null !== e && !Array.isArray(e);
  }
  let M = d(() => {
    if (
      eN.jitless ||
      ("u" > typeof navigator && navigator?.userAgent?.includes("Cloudflare"))
    )
      return !1;
    try {
      return (Function(""), !0);
    } catch (e) {
      return !1;
    }
  });
  function R(e) {
    if (!1 === S(e)) return !1;
    let t = e.constructor;
    if (void 0 === t || "function" != typeof t) return !0;
    let r = t.prototype;
    return (
      !1 !== S(r) &&
      !1 !== Object.prototype.hasOwnProperty.call(r, "isPrototypeOf")
    );
  }
  function T(e) {
    return R(e)
      ? { ...e }
      : Array.isArray(e)
        ? [...e]
        : e instanceof Map
          ? new Map(e)
          : e instanceof Set
            ? new Set(e)
            : e;
  }
  function z(e) {
    let t = 0;
    for (let r in e) Object.prototype.hasOwnProperty.call(e, r) && t++;
    return t;
  }
  let N = (e) => {
      let t = typeof e;
      switch (t) {
        case "undefined":
          return "undefined";
        case "string":
          return "string";
        case "number":
          return Number.isNaN(e) ? "nan" : "number";
        case "boolean":
          return "boolean";
        case "function":
          return "function";
        case "bigint":
          return "bigint";
        case "symbol":
          return "symbol";
        case "object":
          if (Array.isArray(e)) return "array";
          if (null === e) return "null";
          if (
            e.then &&
            "function" == typeof e.then &&
            e.catch &&
            "function" == typeof e.catch
          )
            return "promise";
          if ("u" > typeof Map && e instanceof Map) return "map";
          if ("u" > typeof Set && e instanceof Set) return "set";
          if ("u" > typeof Date && e instanceof Date) return "date";
          if ("u" > typeof File && e instanceof File) return "file";
          return "object";
        default:
          throw Error(`Unknown data type: ${t}`);
      }
    },
    C = new Set(["string", "number", "symbol"]),
    U = new Set([
      "string",
      "number",
      "bigint",
      "boolean",
      "symbol",
      "undefined",
    ]);
  function k(e) {
    return e.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  }
  function I(e, t, r) {
    let n = new e._zod.constr(t ?? e._zod.def);
    return ((!t || r?.parent) && (n._zod.parent = e), n);
  }
  function B(e) {
    if (!e) return {};
    if ("string" == typeof e) return { error: () => e };
    if (e?.message !== void 0) {
      if (e?.error !== void 0)
        throw Error("Cannot specify both `message` and `error` params");
      e.error = e.message;
    }
    return (delete e.message, "string" == typeof e.error)
      ? { ...e, error: () => e.error }
      : e;
  }
  function D(e) {
    let t;
    return new Proxy(
      {},
      {
        get: (r, n, o) => (t ?? (t = e()), Reflect.get(t, n, o)),
        set: (r, n, o, i) => (t ?? (t = e()), Reflect.set(t, n, o, i)),
        has: (r, n) => (t ?? (t = e()), Reflect.has(t, n)),
        deleteProperty: (r, n) => (
          t ?? (t = e()),
          Reflect.deleteProperty(t, n)
        ),
        ownKeys: (r) => (t ?? (t = e()), Reflect.ownKeys(t)),
        getOwnPropertyDescriptor: (r, n) => (
          t ?? (t = e()),
          Reflect.getOwnPropertyDescriptor(t, n)
        ),
        defineProperty: (r, n, o) => (
          t ?? (t = e()),
          Reflect.defineProperty(t, n, o)
        ),
      },
    );
  }
  function L(e) {
    return "bigint" == typeof e
      ? e.toString() + "n"
      : "string" == typeof e
        ? `"${e}"`
        : `${e}`;
  }
  function F(e) {
    return Object.keys(e).filter(
      (t) => void 0 !== e[t]._zod.optin && "optional" === e[t]._zod.optout,
    );
  }
  let H = {
      safeint: [Number.MIN_SAFE_INTEGER, Number.MAX_SAFE_INTEGER],
      int32: [-0x80000000, 0x7fffffff],
      uint32: [0, 0xffffffff],
      float32: [-34028234663852886e22, 34028234663852886e22],
      float64: [-Number.MAX_VALUE, Number.MAX_VALUE],
    },
    $ = {
      int64: [BigInt("-9223372036854775808"), BigInt("9223372036854775807")],
      uint64: [BigInt(0), BigInt("18446744073709551615")],
    };
  function K(e, t) {
    let r = e._zod.def,
      n = r.checks;
    if (n && n.length > 0)
      throw Error(
        ".pick() cannot be used on object schemas containing refinements",
      );
    let o = O(e._zod.def, {
      get shape() {
        let e = {};
        for (let n of Reflect.ownKeys(t)) {
          if (!Object.prototype.hasOwnProperty.call(r.shape, n))
            throw Error(`Unrecognized key: "${String(n)}"`);
          t[n] && m(e, n, r.shape[n]);
        }
        return (m(this, "shape", e), e);
      },
      checks: [],
    });
    return I(e, o);
  }
  function Y(e, t) {
    let r = e._zod.def,
      n = r.checks;
    if (n && n.length > 0)
      throw Error(
        ".omit() cannot be used on object schemas containing refinements",
      );
    let o = O(e._zod.def, {
      get shape() {
        let n = { ...e._zod.def.shape };
        for (let e of Reflect.ownKeys(t)) {
          if (!Object.prototype.hasOwnProperty.call(r.shape, e))
            throw Error(`Unrecognized key: "${String(e)}"`);
          t[e] && delete n[e];
        }
        return (m(this, "shape", n), n);
      },
      checks: [],
    });
    return I(e, o);
  }
  function W(e, t) {
    if (!R(t)) throw Error("Invalid input to extend: expected a plain object");
    let r = e._zod.def.checks;
    if (r && r.length > 0) {
      let r = e._zod.def.shape;
      for (let e of Reflect.ownKeys(t))
        if (void 0 !== Object.getOwnPropertyDescriptor(r, e))
          throw Error(
            "Cannot overwrite keys on object schemas containing refinements. Use `.safeExtend()` instead.",
          );
    }
    let n = O(e._zod.def, {
      get shape() {
        let r = { ...e._zod.def.shape, ...t };
        return (m(this, "shape", r), r);
      },
    });
    return I(e, n);
  }
  function V(e, t) {
    if (!R(t))
      throw Error("Invalid input to safeExtend: expected a plain object");
    let r = O(e._zod.def, {
      get shape() {
        let r = { ...e._zod.def.shape, ...t };
        return (m(this, "shape", r), r);
      },
    });
    return I(e, r);
  }
  function Z(e, t) {
    if (!t?._zod?.def)
      throw Error(
        "Invalid input to merge: expected an object schema. To merge a plain shape, use `.extend()`.",
      );
    if (e._zod.def.checks?.length)
      throw Error(
        ".merge() cannot be used on object schemas containing refinements. Use .safeExtend() instead.",
      );
    let r = O(e._zod.def, {
      get shape() {
        let r = { ...e._zod.def.shape, ...t._zod.def.shape };
        return (m(this, "shape", r), r);
      },
      get catchall() {
        return t._zod.def.catchall;
      },
      checks: t._zod.def.checks ?? [],
    });
    return I(e, r);
  }
  function q(e, t, r, n = "partial") {
    let o = t._zod.def.checks;
    if (o && o.length > 0)
      throw Error(
        `.${n}() cannot be used on object schemas containing refinements`,
      );
    let i = O(t._zod.def, {
      get shape() {
        let n = t._zod.def.shape,
          o = { ...n };
        if (r)
          for (let t of Reflect.ownKeys(r)) {
            if (!Object.prototype.hasOwnProperty.call(n, t))
              throw Error(`Unrecognized key: "${String(t)}"`);
            r[t] &&
              (o[t] = e ? new e({ type: "optional", innerType: n[t] }) : n[t]);
          }
        else
          for (let t of Reflect.ownKeys(n))
            o[t] = e ? new e({ type: "optional", innerType: n[t] }) : n[t];
        return (m(this, "shape", o), o);
      },
      checks: [],
    });
    return I(t, i);
  }
  function G(e, t, r) {
    let n = O(t._zod.def, {
      get shape() {
        let n = t._zod.def.shape,
          o = { ...n };
        if (r)
          for (let t of Reflect.ownKeys(r)) {
            if (!Object.prototype.hasOwnProperty.call(o, t))
              throw Error(`Unrecognized key: "${String(t)}"`);
            r[t] && (o[t] = new e({ type: "nonoptional", innerType: n[t] }));
          }
        else
          for (let t of Reflect.ownKeys(n))
            o[t] = new e({ type: "nonoptional", innerType: n[t] });
        return (m(this, "shape", o), o);
      },
    });
    return I(t, n);
  }
  function X(e, t = 0) {
    if (!0 === e.aborted) return !0;
    for (let r = t; r < e.issues.length; r++)
      if (e.issues[r]?.continue !== !0) return !0;
    return !1;
  }
  function J(e, t = 0) {
    if (!0 === e.aborted) return !0;
    for (let r = t; r < e.issues.length; r++)
      if (e.issues[r]?.continue === !1) return !0;
    return !1;
  }
  function Q(e, t) {
    return t.map((t) => (t.path ?? (t.path = []), t.path.unshift(e), t));
  }
  function ee(e) {
    return "string" == typeof e ? e : e?.message;
  }
  function et(e, t, r) {
    var n;
    for (let o = t; o < e.length; o++) (n = e[o]).schema ?? (n.schema = r);
  }
  function er(e, t, r) {
    let n = e.inst?._zod?.traits;
    n?.has("$ZodType") &&
      (n.has("$ZodCheck")
        ? (e.schema ?? (e.schema = e.inst))
        : (e.schema = e.inst));
    let o = e.schema !== e.inst ? e.schema?._zod.def?.error : void 0,
      i = e.message
        ? e.message
        : (ee(e.inst?._zod.def?.error?.(e)) ??
          ee(o?.(e)) ??
          ee(t?.error?.(e)) ??
          ee(r.customError?.(e)) ??
          ee(r.localeError?.(e)) ??
          "Invalid input"),
      { inst: a, schema: l, continue: u, input: s, ...c } = e;
    return (
      c.path ?? (c.path = []),
      (c.message = i),
      t?.reportInput && (c.input = s),
      c
    );
  }
  function en(e) {
    return e instanceof Set
      ? "set"
      : e instanceof Map
        ? "map"
        : e instanceof File
          ? "file"
          : "unknown";
  }
  let eo = /[\uD800-\uDBFF]/;
  function ei(e) {
    let t = e.length;
    if (!eo.test(e)) return t;
    let r = t;
    for (let n = 0; n < t - 1; n++)
      (64512 & e.charCodeAt(n)) == 55296 &&
        (64512 & e.charCodeAt(n + 1)) == 56320 &&
        (r--, n++);
    return r;
  }
  function ea(e) {
    return Array.isArray(e)
      ? "array"
      : "string" == typeof e
        ? "string"
        : "unknown";
  }
  function el(e) {
    let t = typeof e;
    switch (t) {
      case "number":
        return Number.isNaN(e) ? "nan" : "number";
      case "object":
        if (null === e) return "null";
        if (Array.isArray(e)) return "array";
        if (
          e &&
          Object.getPrototypeOf(e) !== Object.prototype &&
          "constructor" in e &&
          e.constructor
        )
          return e.constructor.name;
    }
    return t;
  }
  function eu(...e) {
    let [t, r, n] = e;
    return "string" == typeof t
      ? { message: t, code: "custom", input: r, inst: n }
      : { ...t };
  }
  function es(e) {
    return Object.entries(e)
      .filter(([e, t]) => Number.isNaN(Number.parseInt(e, 10)))
      .map((e) => e[1]);
  }
  function ec(e) {
    let t = atob(e),
      r = new Uint8Array(t.length);
    for (let e = 0; e < t.length; e++) r[e] = t.charCodeAt(e);
    return r;
  }
  function ef(e) {
    let t = "";
    for (let r = 0; r < e.length; r++) t += String.fromCharCode(e[r]);
    return btoa(t);
  }
  function ed(e) {
    let t = e.replace(/-/g, "+").replace(/_/g, "/"),
      r = "=".repeat((4 - (t.length % 4)) % 4);
    return ec(t + r);
  }
  function ep(e) {
    return ef(e).replace(/\+/g, "-").replace(/\//g, "_").replace(/=/g, "");
  }
  function ey(e) {
    let t = e.replace(/^0x/, "");
    if (t.length % 2 != 0) throw Error("Invalid hex string length");
    let r = new Uint8Array(t.length / 2);
    for (let e = 0; e < t.length; e += 2)
      r[e / 2] = Number.parseInt(t.slice(e, e + 2), 16);
    return r;
  }
  function eh(e) {
    return Array.from(e)
      .map((e) => e.toString(16).padStart(2, "0"))
      .join("");
  }
  class eb {
    constructor(...e) {}
  }
  function eg(e, t) {
    for (let r in t) {
      let n = Object.getOwnPropertyDescriptor(t, r);
      n.get
        ? Object.defineProperty(e, r, { ...n, enumerable: !1 })
        : (function (e, t, r) {
            Object.defineProperty(e, t, {
              configurable: !0,
              get() {
                return this == null ? r : e_(this, t, r.bind(this));
              },
              set(e) {
                e_(this, t, e);
              },
            });
          })(e, r, n.value);
    }
  }
  function e_(e, t, r, n = !0) {
    return (
      Object.defineProperty(e, t, {
        configurable: !0,
        writable: !0,
        enumerable: n,
        value: r,
      }),
      r
    );
  }
  function em(e, t, r) {
    return e_(e, t, r, !1);
  }
  let eO = !1,
    ej = {
      configurable: !0,
      get() {
        eO = !0;
      },
    };
  function ex(e, t, n) {
    let o = Object.getPrototypeOf(e._zod);
    if (t in o && r !== e._zod) {
      r = void 0;
      return;
    }
    ((r = e._zod),
      Object.defineProperty(o, t, {
        configurable: !0,
        get() {
          Object.defineProperty(this, t, ej);
          let e = eO;
          eO = !1;
          try {
            let r = n(this);
            return (
              eO
                ? delete this[t]
                : Object.defineProperty(this, t, {
                    configurable: !0,
                    writable: !0,
                    value: r,
                  }),
              (eO = eO || e),
              r
            );
          } catch (r) {
            throw (delete this[t], (eO = eO || e), r);
          }
        },
        set(e) {
          Object.defineProperty(this, t, {
            configurable: !0,
            writable: !0,
            value: e,
          });
        },
      }));
  }
  function ev(e, t, r, n) {
    let o,
      i = t in (o = Object.getPrototypeOf(e)) ? void 0 : o;
    i &&
      Object.defineProperty(i, t, {
        configurable: !0,
        get() {
          let e = {
            configurable: !0,
            writable: !0,
            enumerable: n,
            value: void 0,
          };
          return (
            Object.defineProperty(this, t, e),
            (e.value = r(this)),
            Object.defineProperty(this, t, e),
            e.value
          );
        },
        set(e) {
          Object.defineProperty(this, t, {
            configurable: !0,
            writable: !0,
            enumerable: n,
            value: e,
          });
        },
      });
  }
  let eP = "~constantCatch";
  function ew(e) {
    let t = () => e;
    return ((t[eP] = !0), t);
  }
  let eE = Object.freeze({ status: "aborted" }),
    eA = { value: void 0, enumerable: !1 },
    eS = "captureStackTrace" in Error ? Error : null;
  function eM(e, t, r, n) {
    function o(e) {
      ((this.def = e), (this.constr = s), (this.traits = new Set()));
    }
    o.prototype = {};
    let i = r && new WeakSet();
    function a(n, a) {
      if (!n._zod) {
        eA.value = new o(a);
        try {
          Object.defineProperty(n, "_zod", eA);
        } finally {
          eA.value = void 0;
        }
      }
      if (n._zod.traits.has(e)) return;
      if ((n._zod.traits.add(e), t(n, a), i)) {
        let e = Object.getPrototypeOf(n),
          t = n._zod.constr.prototype,
          o = e;
        for (; o && o !== t; ) o = Object.getPrototypeOf(o);
        let a = o ?? e;
        i.has(a) || (i.add(a), eg(a, r));
      }
      let l = s.prototype;
      for (let e in l)
        Object.prototype.hasOwnProperty.call(l, e) &&
          (e in n || (n[e] = l[e].bind(n)));
    }
    let l = n?.Parent ?? Object;
    class u extends l {}
    function s(e) {
      let t = n?.Parent
        ? (function (e) {
            let t = eS;
            if (t) {
              let r = t.stackTraceLimit;
              if ("number" == typeof r) {
                try {
                  t.stackTraceLimit = 0;
                } catch {
                  return ((eS = null), new e());
                }
                try {
                  return new e();
                } finally {
                  t.stackTraceLimit = r;
                }
              }
            }
            return new e();
          })(u)
        : this;
      a(t, e);
      let r = t._zod.deferred;
      if (r) {
        for (let e of r) e();
        t._zod.deferred = void 0;
      }
      let o = globalThis.__zod_globalConfig?.postProcessor;
      return (o && o(t), t);
    }
    return (
      Object.defineProperty(u, "name", { value: e }),
      Object.defineProperty(s, "init", { value: a }),
      Object.defineProperty(s, Symbol.hasInstance, {
        value: (t) =>
          (!!n?.Parent && t instanceof n.Parent) || t?._zod?.traits?.has(e),
      }),
      Object.defineProperty(s, "name", { value: e }),
      s
    );
  }
  let eR = Symbol("zod_brand");
  class eT extends Error {
    constructor() {
      super(
        "Encountered Promise during synchronous parse. Use .parseAsync() instead.",
      );
    }
  }
  class ez extends Error {
    constructor(e) {
      (super(`Encountered unidirectional transform during encode: ${e}`),
        (this.name = "ZodEncodeError"));
    }
  }
  (t = globalThis).__zod_globalConfig ?? (t.__zod_globalConfig = {});
  let eN = globalThis.__zod_globalConfig;
  function eC(e) {
    return (e && Object.assign(eN, e), eN);
  }
};
