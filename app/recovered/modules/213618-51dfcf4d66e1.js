// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(t) => {
  t.i(149502);
  var e = "u" < typeof window || "Deno" in globalThis;
  function r(t, e) {
    return (e?.queryKeyHashFn || a)(t);
  }
  function a(t) {
    return JSON.stringify(t, (t, e) =>
      o(e)
        ? Object.keys(e)
            .sort()
            .reduce((t, r) => ((t[r] = e[r]), t), {})
        : e,
    );
  }
  function s(t, e) {
    return (
      t === e ||
      (typeof t == typeof e &&
        !!t &&
        !!e &&
        "object" == typeof t &&
        "object" == typeof e &&
        !Object.keys(e).some((r) => !s(t[r], e[r])))
    );
  }
  function n(t, e) {
    if (t === e) return t;
    let r = i(t) && i(e);
    if (r || (o(t) && o(e))) {
      let a = r ? t : Object.keys(t),
        s = a.length,
        i = r ? e : Object.keys(e),
        o = i.length,
        l = r ? [] : {},
        u = 0;
      for (let s = 0; s < o; s++) {
        let o = r ? s : i[s];
        ((!r && a.includes(o)) || r) && void 0 === t[o] && void 0 === e[o]
          ? ((l[o] = void 0), u++)
          : ((l[o] = n(t[o], e[o])), l[o] === t[o] && void 0 !== t[o] && u++);
      }
      return s === o && u === s ? t : l;
    }
    return e;
  }
  function i(t) {
    return Array.isArray(t) && t.length === Object.keys(t).length;
  }
  function o(t) {
    if (!l(t)) return !1;
    let e = t.constructor;
    if (void 0 === e) return !0;
    let r = e.prototype;
    return (
      !!l(r) &&
      !!r.hasOwnProperty("isPrototypeOf") &&
      Object.getPrototypeOf(t) === Object.prototype
    );
  }
  function l(t) {
    return "[object Object]" === Object.prototype.toString.call(t);
  }
  var u = Symbol();
  t.s([
    "E",
    0,
    function (t, e, r = 0) {
      let a = [...t, e];
      return r && a.length > r ? a.slice(1) : a;
    },
    "R",
    0,
    function (t, e, r = 0) {
      let a = [e, ...t];
      return r && a.length > r ? a.slice(0, -1) : a;
    },
    "W",
    0,
    function (t, e) {
      return !t.queryFn && e?.initialPromise
        ? () => e.initialPromise
        : t.queryFn && t.queryFn !== u
          ? t.queryFn
          : () => Promise.reject(Error(`Missing queryFn: '${t.queryHash}'`));
    },
    "b",
    0,
    function (t, e) {
      return "function" == typeof t ? t(e) : t;
    },
    "q",
    0,
    a,
    "J",
    0,
    r,
    "l",
    0,
    e,
    "u",
    0,
    function (t) {
      return "number" == typeof t && t >= 0 && 1 / 0 !== t;
    },
    "y",
    0,
    function (t) {
      return t;
    },
    "L",
    0,
    function (t, e) {
      let { exact: r, status: n, predicate: i, mutationKey: o } = t;
      if (o) {
        if (!e.options.mutationKey) return !1;
        if (r) {
          if (a(e.options.mutationKey) !== a(o)) return !1;
        } else if (!s(e.options.mutationKey, o)) return !1;
      }
      return (!n || e.state.status === n) && (!i || !!i(e));
    },
    "N",
    0,
    function (t, e) {
      let {
        type: a = "all",
        exact: n,
        fetchStatus: i,
        predicate: o,
        queryKey: l,
        stale: u,
      } = t;
      if (l) {
        if (n) {
          if (e.queryHash !== r(l, e.options)) return !1;
        } else if (!s(e.queryKey, l)) return !1;
      }
      if ("all" !== a) {
        let t = e.isActive();
        if (("active" === a && !t) || ("inactive" === a && t)) return !1;
      }
      return (
        ("boolean" != typeof u || e.isStale() === u) &&
        (!i || i === e.state.fetchStatus) &&
        (!o || !!o(e))
      );
    },
    "z",
    0,
    function () {},
    "P",
    0,
    s,
    "M",
    0,
    function (t, e, r) {
      return "function" == typeof r.structuralSharing
        ? r.structuralSharing(t, e)
        : !1 !== r.structuralSharing
          ? n(t, e)
          : e;
    },
    "B",
    0,
    n,
    "O",
    0,
    function (t, e) {
      return "function" == typeof t ? t(e) : t;
    },
    "H",
    0,
    function (t, e) {
      return "function" == typeof t ? t(e) : t;
    },
    "U",
    0,
    function (t, e) {
      if (!e || Object.keys(t).length !== Object.keys(e).length) return !1;
      for (let r in t) if (t[r] !== e[r]) return !1;
      return !0;
    },
    "V",
    0,
    u,
    "s",
    0,
    function (t) {
      return new Promise((e) => {
        setTimeout(e, t);
      });
    },
    "C",
    0,
    function (t, e) {
      return Math.max(t + (e || 0) - Date.now(), 0);
    },
  ]);
};
