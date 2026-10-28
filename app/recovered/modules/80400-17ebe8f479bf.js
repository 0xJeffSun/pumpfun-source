// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  let t;
  var n,
    r,
    i = e.i(895453),
    o = e.i(645912),
    s = e.i(433710);
  function u() {}
  function a(e, t, n) {
    if ("object" != typeof e || null === e) return JSON.stringify(e);
    let r = l(Object.prototype),
      i = l(Array.prototype),
      o = l(Object.getPrototypeOf(e)),
      s = l(e);
    try {
      return JSON.stringify(e, t, n);
    } catch (e) {
      return "<error: unable to serialize object>";
    } finally {
      (r(), i(), o(), s());
    }
  }
  function l(e) {
    let t = e.toJSON;
    return t
      ? (delete e.toJSON,
        () => {
          e.toJSON = t;
        })
      : u;
  }
  (e.s(
    [
      "z",
      0,
      u,
      "N",
      0,
      function (e, t, n) {
        let r,
          i,
          o = !n || void 0 === n.leading || n.leading,
          u = !n || void 0 === n.trailing || n.trailing,
          a = !1;
        return {
          throttled: (...n) => {
            if (a) {
              r = n;
              return;
            }
            (o ? e(...n) : (r = n),
              (a = !0),
              (i = (0, s.Q)(() => {
                (u && r && e(...r), (a = !1), (r = void 0));
              }, t)));
          },
          cancel: () => {
            ((0, s.z)(i), (a = !1), (r = void 0));
          },
        };
      },
    ],
    163981,
  ),
    e.s(["T", 0, l, "x", 0, a], 91623));
  let c = 220 * o.A;
  function d(e, t = c) {
    let n = l(Object.prototype),
      r = l(Array.prototype),
      i = [],
      o = new WeakMap(),
      s = f(e, "$", void 0, i, o),
      u = JSON.stringify(s),
      a = u ? u.length : 0;
    if (a > t) return void p(t, "discarded", e);
    for (; i.length > 0 && a < t; ) {
      let n = i.shift(),
        r = 0;
      if (Array.isArray(n.source))
        for (let s = 0; s < n.source.length; s++) {
          let u = f(n.source[s], n.path, s, i, o);
          if (
            (void 0 !== u ? (a += JSON.stringify(u).length) : (a += 4),
            (a += r),
            (r = 1),
            a > t)
          ) {
            p(t, "truncated", e);
            break;
          }
          n.target[s] = u;
        }
      else
        for (let s in n.source)
          if (Object.prototype.hasOwnProperty.call(n.source, s)) {
            let u = f(n.source[s], n.path, s, i, o);
            if (
              (void 0 !== u &&
                ((a += JSON.stringify(u).length + r + s.length + 3), (r = 1)),
              a > t)
            ) {
              p(t, "truncated", e);
              break;
            }
            n.target[s] = u;
          }
    }
    return (n(), r(), s);
  }
  function f(e, t, n, r, i) {
    let o = (function (e) {
      if (e && "function" == typeof e.toJSON)
        try {
          return e.toJSON();
        } catch (e) {}
      return e;
    })(e);
    if (!o || "object" != typeof o) {
      var s;
      return "bigint" == typeof (s = o)
        ? `[BigInt] ${s.toString()}`
        : "function" == typeof s
          ? `[Function] ${s.name || "unknown"}`
          : "symbol" == typeof s
            ? `[Symbol] ${s.description || s.toString()}`
            : s;
    }
    let u = (function e(t) {
      try {
        if (t instanceof Event) {
          var n;
          return {
            type: (n = t).type,
            isTrusted: n.isTrusted,
            currentTarget: n.currentTarget ? e(n.currentTarget) : null,
            target: n.target ? e(n.target) : null,
          };
        }
        if (t instanceof RegExp) return `[RegExp] ${t.toString()}`;
        let r = Object.prototype.toString.call(t).match(/\[object (.*)\]/);
        if (r && r[1]) return `[${r[1]}]`;
      } catch (e) {}
      return "[Unserializable]";
    })(o);
    if ("[Object]" !== u && "[Array]" !== u && "[Error]" !== u) return u;
    if (i.has(e)) return `[Reference seen at ${i.get(e)}]`;
    let a = void 0 !== n ? `${t}.${n}` : t,
      l = Array.isArray(o) ? [] : {};
    return (i.set(e, a), r.push({ source: o, target: l, path: a }), l);
  }
  function p(e, t, n) {
    i.s.warn(
      `The data provided has been ${t} as it is over the limit of ${e} characters:`,
      n,
    );
  }
  function g(e) {
    var n, r;
    let i = [],
      o = k(e, "stack"),
      s = String(e);
    if (
      (o && o.startsWith(s) && (o = o.slice(s.length)),
      o &&
        o.split("\n").forEach((e) => {
          let t =
            (function (e) {
              let t = v.exec(e);
              if (!t) return;
              let n = t[2] && 0 === t[2].indexOf("native"),
                r = t[2] && 0 === t[2].indexOf("eval"),
                i = h.exec(t[2]);
              return (
                r && i && ((t[2] = i[1]), (t[3] = i[2]), (t[4] = i[3])),
                {
                  args: n ? [t[2]] : [],
                  column: t[4] ? +t[4] : void 0,
                  func: t[1] || "?",
                  line: t[3] ? +t[3] : void 0,
                  url: n ? void 0 : t[2],
                }
              );
            })(e) ||
            (function (e) {
              let t = b.exec(e);
              if (t)
                return {
                  args: [],
                  column: t[3] ? +t[3] : void 0,
                  func: "?",
                  line: t[2] ? +t[2] : void 0,
                  url: t[1],
                };
            })(e) ||
            (function (e) {
              let t = S.exec(e);
              if (t)
                return {
                  args: [],
                  column: t[4] ? +t[4] : void 0,
                  func: t[1] || "?",
                  line: +t[3],
                  url: t[2],
                };
            })(e) ||
            (function (e) {
              let t = w.exec(e);
              if (!t) return;
              let n = t[3] && t[3].indexOf(" > eval") > -1,
                r = _.exec(t[3]);
              return (
                n && r && ((t[3] = r[1]), (t[4] = r[2]), (t[5] = void 0)),
                {
                  args: t[2] ? t[2].split(",") : [],
                  column: t[5] ? +t[5] : void 0,
                  func: t[1] || "?",
                  line: t[4] ? +t[4] : void 0,
                  url: t[3],
                }
              );
            })(e);
          t && (!t.func && t.line && (t.func = "?"), i.push(t));
        }),
      i.length > 0 &&
        (function () {
          if (void 0 !== t) return t;
          let [e, n] = [
            class extends Error {
              constructor() {
                (super(), (this.name = "Error"));
              }
            },
            Error,
          ].map((e) => new e());
          return (t = O(Object.getPrototypeOf(e)) && n.stack !== e.stack);
        })() &&
        e instanceof Error)
    ) {
      let t = [],
        o = e;
      for (; (o = Object.getPrototypeOf(o)) && O(o); ) {
        let e = (null == (n = o.constructor) ? void 0 : n.name) || "?";
        t.push(e);
      }
      for (
        let e = t.length - 1;
        e >= 0 && (null == (r = i[0]) ? void 0 : r.func) === t[e];
        e--
      )
        i.shift();
    }
    return { message: k(e, "message"), name: k(e, "name"), stack: i };
  }
  e.s(["f", 0, d], 709549);
  let y =
      "((?:file|https?|blob|chrome-extension|electron|native|eval|webpack|snippet|<anonymous>|\\w+\\.|\\/).*?)",
    m = "(?::(\\d+))",
    v = RegExp(`^\\s*at (.*?) ?\\(${y}${m}?${m}?\\)?\\s*$`, "i"),
    h = RegExp(`\\((\\S*)${m}${m}\\)`),
    b = RegExp(`^\\s*at ?${y}${m}?${m}??\\s*$`, "i"),
    S =
      /^\s*at (?:((?:\[object object\])?.+) )?\(?((?:file|ms-appx|https?|webpack|blob):.*?):(\d+)(?::(\d+))?\)?\s*$/i,
    w =
      /^\s*(.*?)(?:\((.*?)\))?(?:(?:(?:^|@)((?:file|https?|blob|chrome|webpack|resource|capacitor|\[native).*?|[^@]*bundle|\[wasm code\])(?::(\d+))?(?::(\d+))?)|@)\s*$/i,
    _ = /(\S+) line (\d+)(?: > eval line \d+)* > eval/i;
  function k(e, t) {
    if ("object" != typeof e || !e || !(t in e)) return;
    let n = e[t];
    return "string" == typeof n ? n : void 0;
  }
  let E =
    /^(?:[Uu]ncaught (?:exception: )?)?(?:((?:Eval|Internal|Range|Reference|Syntax|Type|URI|)Error): )?([\s\S]*)$/;
  function O(e) {
    return String(e.constructor).startsWith("class ");
  }
  e.s(
    [
      "E",
      0,
      g,
      "c",
      0,
      function (e, t, n, r) {
        var i;
        let o, s;
        if (void 0 === t) return;
        let { name: u, message: a } =
          ((i = e),
          "[object String]" === {}.toString.call(i) && ([, o, s] = E.exec(i)),
          { name: o, message: s });
        return { name: u, message: a, stack: [{ url: t, column: r, line: n }] };
      },
    ],
    305918,
  );
  var x = e.i(194672);
  function C(e) {
    let t = T(e);
    return (
      e.stack.forEach((e) => {
        let n = "?" === e.func ? "<anonymous>" : e.func,
          r = e.args && e.args.length > 0 ? `(${e.args.join(", ")})` : "",
          i = e.line ? `:${e.line}` : "",
          o = e.line && e.column ? `:${e.column}` : "";
        t += `
  at ${n}${r} @ ${e.url}${i}${o}`;
      }),
      t
    );
  }
  function T(e) {
    return `${e.name || "Error"}: ${e.message}`;
  }
  e.s(
    [
      "c",
      0,
      function (e) {
        let t,
          n = Error(e);
        return (
          (n.name = "HandlingStack"),
          (0, x.G)(() => {
            let e = g(n);
            ((e.stack = e.stack.slice(2)), (t = C(e)));
          }),
          t
        );
      },
      "t",
      0,
      T,
      "n",
      0,
      C,
    ],
    750671,
  );
  let R = "No stack, consider using an instance of Error";
  function A(e) {
    return (
      e instanceof Error ||
      "[object Error]" === Object.prototype.toString.call(e)
    );
  }
  function $(e, t) {
    return Object.keys(e).some((n) => e[n] === t);
  }
  (e.s(
    [
      "Z",
      0,
      R,
      "K",
      0,
      function ({
        stackTrace: e,
        originalError: t,
        handlingStack: n,
        componentStack: r,
        startClocks: i,
        nonErrorPrefix: o,
        useFallbackStack: s = !0,
        source: u,
        handling: l,
      }) {
        var c, f, p, y, m;
        let v = A(t);
        return (
          !e && v && (e = g(t)),
          {
            startClocks: i,
            source: u,
            handling: l,
            handlingStack: n,
            componentStack: r,
            originalError: t,
            type: e ? e.name : void 0,
            message:
              ((c = e),
              (f = v),
              (p = o),
              (y = t),
              (null == c ? void 0 : c.message) && (null == c ? void 0 : c.name)
                ? c.message
                : f
                  ? "Empty message"
                  : `${p} ${a(d(y))}`),
            stack: e ? C(e) : s ? R : void 0,
            causes: v
              ? (function (e, t) {
                  let n = e,
                    r = [];
                  for (; A(null == n ? void 0 : n.cause) && r.length < 10; ) {
                    let e = g(n.cause);
                    (r.push({
                      message: n.cause.message,
                      source: t,
                      type: null == e ? void 0 : e.name,
                      stack: e && C(e),
                    }),
                      (n = n.cause));
                  }
                  return r.length ? r : void 0;
                })(t, u)
              : void 0,
            fingerprint:
              A((m = t)) && "dd_fingerprint" in m
                ? String(m.dd_fingerprint)
                : void 0,
            context: (function (e) {
              if (null !== e && "object" == typeof e && "dd_context" in e)
                return e.dd_context;
            })(t),
          }
        );
      },
      "x",
      0,
      function (e) {
        var t;
        return null == (t = /@ (.+)/.exec(e)) ? void 0 : t[1];
      },
      "b",
      0,
      A,
    ],
    80400,
  ),
    e.s(
      [
        "n",
        0,
        function (e) {
          return 0 === Object.keys(e).length;
        },
        "A",
        0,
        function (e, t) {
          let n = {};
          for (let r of Object.keys(e)) n[r] = t(e[r]);
          return n;
        },
        "d",
        0,
        $,
        "P",
        0,
        function (e) {
          return { ...e };
        },
      ],
      70296,
    ),
    ((n = r || (r = {})).TRACK_INTAKE_REQUESTS = "track_intake_requests"),
    (n.USE_TREE_WALKER_FOR_ACTION_NAME = "use_tree_walker_for_action_name"),
    (n.FEATURE_OPERATION_VITAL = "feature_operation_vital"),
    (n.SHORT_SESSION_INVESTIGATION = "short_session_investigation"));
  let P = new Set();
  function I(e, t) {
    var n;
    let r = t ? `${e}:${t}` : e;
    return (
      (r.length > 200 ||
        ((n = r),
        (function () {
          try {
            return (RegExp("[\\p{Ll}]", "u"), !0);
          } catch (e) {
            return !1;
          }
        })() && RegExp("[^\\p{Ll}\\p{Lo}0-9_:./-]", "u").test(n))) &&
        i.s.warn(
          `Tag ${r} doesn't meet tag requirements and will be sanitized. ${i.Z} ${i.e}/getting_started/tagging/#defining-tags`,
        ),
      N(r)
    );
  }
  function N(e) {
    return e.replace(/,/g, "_");
  }
  (e.s(
    [
      "J",
      0,
      r,
      "Y",
      0,
      function () {
        return P;
      },
      "N",
      0,
      function (e) {
        Array.isArray(e) &&
          e
            .filter((e) => $(r, e))
            .forEach((e) => {
              P.add(e);
            });
      },
      "M",
      0,
      function (e) {
        return P.has(e);
      },
    ],
    333575,
  ),
    e.s(
      [
        "A",
        0,
        I,
        "z",
        0,
        function (e) {
          let {
              env: t,
              service: n,
              version: r,
              datacenter: i,
              sdkVersion: o,
              variant: s,
            } = e,
            u = [I("sdk_version", null != o ? o : "6.22.0")];
          return (
            t && u.push(I("env", t)),
            n && u.push(I("service", n)),
            r && u.push(I("version", r)),
            i && u.push(I("datacenter", i)),
            s && u.push(I("variant", s)),
            u
          );
        },
        "Y",
        0,
        N,
      ],
      760474,
    ),
    e.s(
      [
        "H",
        0,
        "datadoghq.eu",
        "Y",
        0,
        "dd0g-gov.com",
        "f",
        0,
        "datad0g.com",
        "Z",
        0,
        "datadoghq.com",
        "d",
        0,
        "ddog-gov.com",
        "a",
        0,
        ["ddsource", "dd-api-key", "dd-request-id"],
        "I",
        0,
        "pci.browser-intake-datadoghq.com",
      ],
      303509,
    ));
};
